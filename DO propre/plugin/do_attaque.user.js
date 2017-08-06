// ==UserScript==
// @name           DO attaque
// @author         Coni
// @description    remplissage plus rapide des armees
// @include        http://game.desert-operations.fr/world1/militaer.php
// @version        2.00
// ==/UserScript==

var nombre= document.getElementsByClassName('adjNumInput input');
var nb_unites = document.getElementsByClassName('adjNumInput input').length;
var langArray = new Array();
var newList = new Array();
var option = new Array(); 
var newButton = new Array();
var newButton2 = new Array();

function calcul(a) {
var valeur = parseFloat(nombre[a].value);
var puissance = parseInt(newList[a].value);
total = valeur * Math.pow(10,puissance);
nombre[a].value = total;
}

function max(b){
nombre[b].value=parseInt(nombre[b].getAttribute('max'));
}

for (j=0, k=nb_unites; j<k; j++){	

langArray[j] = [
    {value: "3", text: "millier(s)"},
    {value: "6", text: "million(s)"},
	{value: "9", text: "milliard(s)"},
	{value: "12", text: "billion(s)"},
	{value: "15", text: "Billiard(s)"},
	{value: "18", text: "Cresus"},
	{value: "21", text: "kCresus"},
	{value: "24", text: "mCresus"}
];

newList[j]= document.createElement('select');

option[j]=new Array();

for (var i=0, il = langArray[j].length; i < il; i ++) {
	option[j][i] = document.createElement('option');
    option[j][i].value = langArray[j][i].value;
    option[j][i].text = langArray[j][i].text;
    newList[j].appendChild(option[j][i]);
}

option[j][3].selected="selected";

newButton[j] = document.createElement("input");
                newButton[j].type = "button";
				newButton[j].value = "calcul";
				newButton[j].id=j;
				newButton[j].onclick = function(){
					calcul(this.id);
					return false;
				};
                
newButton2[j] = document.createElement("input");
                newButton2[j].type = "button";
				newButton2[j].value = "max";
				newButton2[j].id=j;
				newButton2[j].onclick = function(){
					max(this.id);
					return false;
				};
nombre[j].parentNode.insertBefore(newButton2[j], nombre[j].nextSibling);			
nombre[j].parentNode.insertBefore(newButton[j], nombre[j].nextSibling);
nombre[j].parentNode.insertBefore(newList[j], nombre[j].nextSibling);
}