// ==UserScript==
// @name           DO boost
// @author         Coni
// @description    Prevision des boosts
// @include        http://game.desert-operations.*/world*/uebersicht.php*
// @version        2.00
// ==/UserScript==

function DelPoint(Nombre){
	var	End = Nombre.replace(/\./g,'');
	End = parseInt(End);
	return End;
} 

function rewrite(Nombre){
var val=Nombre.toString();
var power=val.substr(val.length-2);
var valeur=val.substr(0,16);
var valeur2=valeur.replace(/\./g,'');
for (i = 16; i < parseInt(power)+2; i++){
str1="0";
valeur2=valeur2.concat(str1);
}
return valeur2;
}

function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
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
var valeurselectionnee = newList.options[newList.selectedIndex].value;
var qte_full=argent*100/(parseFloat(valeurselectionnee)*parseFloat(taux_buy.value));
if(qte_full.toString().match('e')){qte_full=rewrite(qte_full);}
var qte_buyable = Convert(qte_full);

var gain = Convert(argent * (parseFloat(taux_sell.value)/parseFloat(taux_buy.value)-1));
document.getElementById('la4').innerHTML = qte_buyable +' (' + qte_full + ') ';
document.getElementById('la5').innerHTML = gain;
}

function vente(){
var or = DelPoint(document.getElementById('resourcebar_gold_label').getElementsByTagName('span')[0].title);
var pet = DelPoint(document.getElementById('resourcebar_oil_label').getElementsByTagName('span')[0].title);
var muni = DelPoint(document.getElementById('resourcebar_ammunition_label').getElementsByTagName('span')[0].title);
var somme_ress=or*1000+pet*500+muni*7;
document.getElementById('la4').innerHTML = "???";
document.getElementById('la5').innerHTML=Convert(somme_ress);
}

var posi_argent = document.getElementById('resourcebar_money_label');
var argent = DelPoint(posi_argent.getElementsByTagName('span')[0].title);

var posi = document.getElementsByClassName('infopanel last');
posi[0].firstChild.firstChild.innerHTML = 'Boost POWAAA !!!';

var posi_btn = posi[0].firstChild.nextSibling;
posi_btn.innerHTML='';

var taux_buy = document.createElement("input");
                taux_buy.type = "text";
				taux_buy.value = 85;
				taux_buy.id='t_buy';
				taux_buy.size='2';
				
var taux_sell = document.createElement("input");
                taux_sell.type = "text";
				taux_sell.value = 95;
				taux_sell.id='t_sell';
				taux_sell.size='2';
				
var newButton = document.createElement("input");
                newButton.type = "button";
				newButton.value = "calcul";
				newButton.id='btn';
				newButton.onclick = function(){calcul();};
				
var newButton2 = document.createElement("input");
                newButton2.type = "button";
				newButton2.value = "vente ressources";
				newButton2.id='btn_ress';
				newButton2.onclick = function(){vente();};

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

posi_btn.innerHTML='<div id=\'la\'>'+'Taux Achat : '+'</div>'
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
+ '</div>'

var posi_buy = document.getElementById('la');
posi_buy.appendChild(taux_buy);

var posi_sell = document.getElementById('la2');
posi_sell.appendChild(taux_sell);

var posi_list = document.getElementById('la3');
posi_list.appendChild(newList);
posi_list.appendChild(newButton);
posi_list.appendChild(newButton2);