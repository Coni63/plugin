// ==UserScript==
// @name           DO boost
// @author         Coni
// @description    Prevision des boosts
// @include        http://game.desert-operations.*/world*/*
// @version        3.00
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

	function DelPoint(Nombre){
		var	End = Nombre.replace(/\./g,'');
		End = parseInt(End);
		return End;
	}

	function Arrondir(x, n) {
		var decalage = Math.pow(10, n);
		x *= decalage;
		x = Math.round(x);
		x /= decalage;
		return x;
	} 

	function lisibilite_nombre(nbr){
			var nombre = ''+nbr;
			var retour = '';
			var count=0;
			for(var i=nombre.length-1 ; i>=0 ; i--)
			{
				if(count!=0 && count % 3 == 0)
					retour = nombre[i]+'.'+retour ;
				else
					retour = nombre[i]+retour ;
				count++;
			}
			return retour;
	}

	var nmbDgt=7,valMax=Math.pow(10,7),valLim=43;// pour ajouter des doubles produits dans sqt
	String.prototype.toDgt=function(){var s=this;while(s.length<nmbDgt) s='0'+s;return s}
	 
	function Big(n){
	   if (n instanceof Big) {this._s=Boolean(n._s);this._a=n._a.slice();return;}
	   n=n?''+n:'0';
		if (/[^\d\s.e+-]/gi.test(n+='')) throw 'Illegal integer !\n'+n;
	   n=n.replace(/\s+/g,'');
	   if (this._s=(n.charAt(0)=="-")) n=n.substr(1);
	   this._a=[];
		var e=0;n.replace(/([^e]+)(e(\+|\-)?([\d]+))/i,function(a,mn,st,sg,ex){var s=1;n=mn;if (!!sg) s=sg=='+'?1:-1;e=s*ex});
	   var s=(n=n.split('.'))[0].replace(/^0+/,'')||'0',t=1<n.length?n[1]:'0';
	   if (e<0) s=s.substr(0,s.length+e)||'0';
	   if (0<e) {t=t+new Array(e).join(0);s=s+t.substr(0,e)}
	   var ln=0,d,e,f;
		while (0<(d=s.length)) {e=nmbDgt<d?(d-nmbDgt):0;f=s.substr(e);f=f.replace(/^0+(?!$)/,'');
			this._a[ln++]=+f;s=s.substring(0,e)}
	}
	 
	with({k:Big.prototype}){
		k.str=function(){var s='',o=this,i=o._a.length;
			while (0<i) s+=(''+o._a[--i]).toDgt();
			return (o._s?'-':'')+s.replace(/^0+(?!$)/,'');
		};
		k.toString=function(){
		   return this.str().replace(/([\d])(?=((\d{7,7})+)$)/g,"$1 ");
		};
	}

	function Convert(Quantite) {
		if (Quantite < Math.pow(10,3)) {
			Quantite += '';
		} else if (Quantite < Math.pow(10,6)) {
			Quantite /= Math.pow(10,3);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' k';
		} else if (Quantite < Math.pow(10,9)) {
			Quantite /= Math.pow(10,6);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' m';
		} else if (Quantite < Math.pow(10,12)) {
			Quantite /= Math.pow(10,9);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' M';
		} else if (Quantite < Math.pow(10,15)) {
			Quantite /= Math.pow(10,12);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' b';
		} else if (Quantite < Math.pow(10,18)) {
			Quantite /= Math.pow(10,15);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' B';
		} else if (Quantite < Math.pow(10,21)) {
			Quantite /= Math.pow(10,18);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' C';
		}else if (Quantite < Math.pow(10,24)) {
			Quantite /= Math.pow(10,21);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' kC';
		}else if (Quantite < Math.pow(10,27)) {
			Quantite /= Math.pow(10,24);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' mC';
		}else if (Quantite < Math.pow(10,30)) {
			Quantite /= Math.pow(10,27);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' MC';
		}else if (Quantite < Math.pow(10,33)) {
			Quantite /= Math.pow(10,30);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' bC';
		}else if (Quantite < Math.pow(10,36)) {
			Quantite /= Math.pow(10,33);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' BC';
		}
		return Quantite; 
	} 

	function calcul(){
	taux_buy.value=taux_buy.value.replace(',','.');
	taux_sell.value=taux_sell.value.replace(',','.');
	var valeurselectionnee = newList.options[newList.selectedIndex].value; // le prix unitaire
	var somme = DelPoint(document.getElementById('investissement').value); //la somme à investir
	var qte_full=somme*100/(parseFloat(valeurselectionnee)*parseFloat(taux_buy.value));
	var nB=new Big(qte_full);
	var qte_buyable = Convert(qte_full);

	var gain = Convert(somme * (parseFloat(taux_sell.value)/parseFloat(taux_buy.value)-1));
	document.getElementById('la4').innerHTML = qte_buyable +' (' + lisibilite_nombre(nB.str()) + ') ';
	document.getElementById('la5').innerHTML = gain;
	}

	function vente(){
	taux_sell.value=taux_sell.value.replace(',','.');
	var or = DelPoint(document.getElementById('resourcebar_gold_label').getElementsByTagName('span')[0].title);
	var pet = DelPoint(document.getElementById('resourcebar_oil_label').getElementsByTagName('span')[0].title);
	var muni = DelPoint(document.getElementById('resourcebar_ammunition_label').getElementsByTagName('span')[0].title);
	var somme_ress=(or*1000+pet*500+muni*7)*parseFloat(taux_sell.value)/100;
	document.getElementById('la4').innerHTML = "???";
	document.getElementById('la5').innerHTML=Convert(somme_ress);
	}

function check_taux(){
	GM_xmlhttpRequest({
					  method: "GET",
					  url: "http://game.desert-operations.fr/world1/handel.php",
					  synchronous:true,
					  onload: function(response) {
						var xrh_bank = document.createElement('div');
						xrh_bank.innerHTML=response.responseText;

						var taux_actuel = xrh_bank.getElementsByClassName('block-head-information')[0].innerHTML;
						taux_actuel=taux_actuel.replace('Taux d\'échange actuel : ','');
						taux_actuel=taux_actuel.replace('%','');
						taux_actuel=taux_actuel.replace(',','.');
						
						document.getElementById('t_sell').value=taux_actuel;
						GM_setValue('t_sell', taux_actuel);
					  }
	});
}	
	
	function save(elem){
		GM_setValue(elem.id, elem.value);
	}
	
	var taux_vente = GM_getValue('t_sell', 95);
	var taux_achat = GM_getValue('t_buy', 85);//Unit_Display[Unit_Name[i]]);;
	
	var posi_argent = document.getElementById('resourcebar_money_label');
	var argent = DelPoint(posi_argent.getElementsByTagName('span')[0].title);

	var posi = document.getElementsByClassName('infopanel last');
	posi[0].firstChild.firstChild.innerHTML = 'Boost POWAAA !!!';

	var posi_btn = posi[0].firstChild.nextSibling;
	posi_btn.innerHTML=''

	var investissement = document.createElement("input");
					investissement.type = "text";
					investissement.value = lisibilite_nombre(new Big(argent).str());
					investissement.id='investissement';
					investissement.size='25';

	var taux_buy = document.createElement("input");
					taux_buy.type = "text";
					taux_buy.value = taux_achat;
					taux_buy.id='t_buy';
					taux_buy.size='2';
					taux_buy.onchange=function(){save(this);};
					
	var taux_sell = document.createElement("input");
					taux_sell.type = "text";
					taux_sell.value = taux_vente;
					taux_sell.id='t_sell';
					taux_sell.size='2';
					taux_sell.onchange=function(){save(this);};
					
	var newButton = document.createElement("input");
					newButton.type = "button";
					newButton.value = "calcul";
					newButton.id='btn';
					newButton.onclick = function(){calcul();};
					
	var newButton2 = document.createElement("input");
					newButton2.type = "button";
					newButton2.value = "vente";
					newButton2.id='btn_ress';
					newButton2.onclick = function(){vente();};
					
	var newButton3 = document.createElement("input");
					newButton3.type = "button";
					newButton3.value = "MAJ Taux";
					newButton3.id='maj_taux';
					newButton3.onclick = function(){check_taux();};

	var langArray = [
		{value: 1000, text: "Or"},
		{value: 500, text: "Pétrole"},
		{value: 7, text: "Munitions"},
		{value: 4000000, text:"B52"},
		{value: 2000000, text:"B2"},
		{value: 1500000, text:"Freg 1"},
		{value: 500000, text:"Freg 2"},
		{value: 1500000, text:"PAN"},
	];

	var newList= document.createElement('select');
		newList.id='list';

	var option=new Array();

	for (var i=0, il = langArray.length; i < il; i ++) {
		option[i] = document.createElement('option');
		option[i].value = langArray[i].value;
		option[i].text = langArray[i].text;
		newList.appendChild(option[i]);
	}

	option[0].selected="selected";

	var qte_buyable = Convert(argent*100/(parseFloat(newList.value)*parseFloat(taux_buy.value)));

	var gain = Convert(argent * (parseFloat(taux_sell.value)/parseFloat(taux_buy.value)-1));

	posi_btn.innerHTML='<div id=\'la6\'>'+'Investissement : '+'</div>'
	+ '<div id=\'la\'>'+'Taux Achat : '+'</div>'
	+ '<div id=\'la2\'>'+'Taux Vente : '+'</div>' 
	+ '<div id=\'la3\'>'+'Ressources : ' +'</div>'
	+ '<br/>' 
	+ 'Quantite achetable : '
	+ '<div id=\'la4\'>' 
	+ '???'
	+ '</div>'
	+ '<br/>' 
	+ 'Gain possible : '
	+ '<div id=\'la5\'>'
	+ '???'
	+ '</div>';

	var posi_invest = document.getElementById('la6').appendChild(investissement);

	var posi_buy = document.getElementById('la').appendChild(taux_buy);

	var posi_sell = document.getElementById('la2').appendChild(taux_sell);

	var posi_list = document.getElementById('la3').appendChild(newList);

	document.getElementById('la3').appendChild(newButton);
	document.getElementById('la3').appendChild(newButton2);
	document.getElementById('la3').appendChild(newButton3);