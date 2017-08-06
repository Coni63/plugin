// ==UserScript==
// @name           DO espionnage
// @author         Coni
// @description    Affiche vos capacités de défense contre un espionnage
// @include        http://game.desert-operations.*/world*/produktion.php?mode=3
// @version        3.00
// @grant none
//
// ==/UserScript==


function DelPoint(Nombre) {
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

function Convert(Quantite){
	if (Quantite < Math.pow(10,3)) {
		Quantite += '';
	}else if (Quantite < Math.pow(10,6)) {
		Quantite /= Math.pow(10,3);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' k';
	}else if (Quantite < Math.pow(10,9)) {
		Quantite /= Math.pow(10,6);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' m';
	}else if (Quantite < Math.pow(10,12)) {
		Quantite /= Math.pow(10,9);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' M';
	}else if (Quantite < Math.pow(10,15)) {
		Quantite /= Math.pow(10,12);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' b';
	}else if (Quantite < Math.pow(10,18)) {
		Quantite /= Math.pow(10,15);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' B';
	}else if (Quantite < Math.pow(10,21)) {
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
	}else if (Quantite < Math.pow(10,39)) {
		Quantite /= Math.pow(10,36);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' C²';
	}else if (Quantite < Math.pow(10,42)) {
		Quantite /= Math.pow(10,39);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' kC²';
	}else if (Quantite < Math.pow(10,45)) {
		Quantite /= Math.pow(10,42);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' mC²';
	}else if (Quantite < Math.pow(10,48)) {
		Quantite /= Math.pow(10,45);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' MC²';
	}else if (Quantite < Math.pow(10,51)) {
		Quantite /= Math.pow(10,48);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' bC²';
	}else if (Quantite < Math.pow(10,54)) {
		Quantite /= Math.pow(10,51);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' BC²';
	}else if (Quantite < Math.pow(10,57)) {
		Quantite /= Math.pow(10,54);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' C<sup>3</sup>';
	}
	return Quantite; 
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

var name =new Array('Satellite espion', 'Drone', 'Avion de reconnaissance', 'Agent');
var valeur_att=new Array(45000,7500,24000,3000);
var valeur_def=new Array(15000,2500,8000,1000);
var needor = new Array(10000,6000,20000,5000);
var need_unit_att = new Array();
var need_or_att = new Array();
var def = 0;
var possess = 0;

var posi_tab=document.getElementById('lightboxContent').firstChild.firstChild;

for (i=0;i<4;i++){
possess = DelPoint(document.getElementsByTagName('table')[i].getElementsByClassName('tooltipExtention showTooltipDefault')[3].title);
def +=  possess*valeur_def[i];
}

for (i=0;i<4;i++){
need_unit_att[i]=Math.ceil(def/valeur_att[i]);// 2 pour 100%
need_or_att[i]=need_unit_att[i]*needor[i];
}

var titre = document.createElement('div');
titre.innerHTML = '<div>Unités défendable pour que le défenseur perdent son RE</div>';

posi_tab.appendChild(titre);

var tableau=document.createElement('table');
tableau.className='battleReport';
tableau.style.cssText = 'text-align:center; width:599px;';
tableau.innerHTML='<th>Unité</th><th>Quantité défendable</th><th>Or necessaire</th>';
titre.appendChild(tableau);

for (i=0;i<4;i++){
	var ligne = document.createElement('tr');
	ligne.innerHTML='<td>'
		+ name[i]
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(need_unit_att[i]).str())+'" title="'+lisibilite_nombre(new Big(need_unit_att[i]).str())+'">'
			+ Convert(need_unit_att[i])
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(need_or_att[i]).str())+'" title="'+lisibilite_nombre(new Big(need_or_att[i]).str())+'">'
			+ Convert(need_or_att[i])
		+'</span>'
	+'</td>';

	tableau.appendChild(ligne);
}

var titre2 = document.createElement('div');
titre2.innerHTML = '<div></br>Unités necessaire pour que l\'attaquant ait 100% sur vous</div>';

posi_tab.appendChild(titre2);

var tableau100=document.createElement('table');
tableau100.className='battleReport';
tableau100.style.cssText = 'text-align:center; width:599px;';
tableau100.innerHTML='<th>Unité</th><th>Quantité pour avoir 100%</th><th>Or necessaire pour avoir 100%</th>';
titre2.appendChild(tableau100);

for (i=0;i<4;i++){
	var ligne = document.createElement('tr');
	ligne.innerHTML='<td>'
		+ name[i]
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(2*need_unit_att[i]).str())+'" title="'+lisibilite_nombre(new Big(2*need_unit_att[i]).str())+'">'
			+ Convert(2*need_unit_att[i])
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(2*need_or_att[i]).str())+'" title="'+lisibilite_nombre(new Big(2*need_or_att[i]).str())+'">'
			+ Convert(2*need_or_att[i])
		+'</span>'
	+'</td>';

	tableau100.appendChild(ligne);
}