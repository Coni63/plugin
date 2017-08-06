// ==UserScript==
// @name           DO boost
// @author         Coni
// @description    Prevision des boosts
// @include        http://game.desert-operations.*/world*/*
// @version        3.00
// @require		   fonctions.js
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_setClipboard
// ==/UserScript==

	function calcul(){
	taux_buy.value=taux_buy.value.replace(',','.');
	taux_sell.value=taux_sell.value.replace(',','.');
	var valeurselectionnee = newList.options[newList.selectedIndex].value; // le prix unitaire
	var somme = DelPoint(document.getElementById('investissement').value); //la somme à investir
	var qte_full=somme*100/(parseFloat(valeurselectionnee)*parseFloat(taux_buy.value));
	var qte_buyable = Convert(qte_full);
	nB=lisibilite_nombre(new Big(qte_full).str());

	var gain = Convert(somme * (parseFloat(taux_sell.value)/parseFloat(taux_buy.value)-1));
	document.getElementById('la4').innerHTML = qte_buyable;
	document.getElementById('la4').appendChild(newButton4);
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
						taux_actuel=taux_actuel.replace(/[^0-9]/gi,'');
						taux_actuel=parseFloat(taux_actuel)/100;
						
						document.getElementById('t_sell').value=taux_actuel;
						GM_setValue('t_sell', taux_actuel);
					  }
	});
}	
	
	function save(elem){
		GM_setValue(elem.id, elem.value);
	}
	
	function CTC(nombre){
		GM_setClipboard(nombre);
	}
	
	var nB;
	
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
					
	var newButton4 = document.createElement("input");
					newButton4.type = "button";
					newButton4.value = "Copier";
					newButton4.id='CTC';
					newButton4.onclick = function(){CTC(nB);};				

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