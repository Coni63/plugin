// ==UserScript==
// @name           DO attaque
// @author         Coni
// @description    remplissage plus rapide des armees
// @include        http://game.desert-operations.fr/world1/militaer.php*
// @version        4.22
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_attaque.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_attaque.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_attaque.user.js
// @require		   https://sites.google.com/site/coni63do/plugin/fonctions.js
// @require		   https://sites.google.com/site/coni63do/plugin/bignumber.js
// @grant		   none
// ==/UserScript==

//****************redimensionnmenet*******************

var plus = document.getElementsByClassName('btn_dec ltr');
var moins = document.getElementsByClassName('btn_inc ltr');
var colonne = document.getElementsByClassName('inputFleedAssignment');

for (var i=0;i<plus.length;i++){plus[i].remove(); i--;}
for (var i=0;i<moins.length;i++){moins[i].remove(); i--;}
for (var i=0;i<colonne.length;i++){colonne[i].style.cssText="margin:0px; width:280px;";}

Number.prototype.ToWrite=function(){
	return lisibilite_nombre(new Big(this).str());
}

function portion(a, b){
	a=parseInt(a.replace(/[^0-9]/gi,''));
	flag[a]=false;
	var Qte = Stock[a].replace(/[^0-9]/gi,'');
	inp_txt[a][0].value=lisibilite_nombre(n(Qte).divide(b));
}

function calcul_all(){
	for (var j=0; j<inp_txt.length; j++){
		var valeur = parseFloat(inp_txt[j][0].value);
		if(flag[j]==true && isNaN(valeur)==false){
			var puissance = parseInt(newList[j].value);
			var total = valeur * Math.pow(10,puissance);
			inp_txt[j][0].value = total.ToWrite();
		}
	}
}

//***************rc_attaque******************

var formulaire = document.getElementsByClassName('block')[2].getElementsByTagName('tr');
var Stock = new Array();
var inp_txt = new Array();
var newList = new Array(); 
var flag = new Array(); 
var newButton = new Array();
var newButton2 = new Array();
var newButton3 = new Array();
var langArray = [
	{value: "0", text: "U"},
	{value: "12", text: "b"},
	{value: "15", text: "B"},
	{value: "18", text: "C"},
	{value: "21", text: "kC"},
	{value: "24", text: "mC"},
	{value: "27", text: "MC"},
	{value: "30", text: "bC"},
	{value: "33", text: "BC"}
];


for(var j = 1 ; j < formulaire.length-1 ; j++){
	Stock[j-1] = formulaire[j].getElementsByClassName('milCell')[1].getElementsByTagName('span')[0].title;
	flag[j-1] = true;
	inp_txt[j-1]= formulaire[j].getElementsByClassName('adjNumInput input');
	inp_txt[j-1][0].id='zone'+(j-1);
	inp_txt[j-1][0].onkeyup=function(){
	var id_form = this.id.replace(/[^0-9]/gi,'');
	flag[id_form]=true;
	};
	newList[j-1]= document.createElement('select');
	
	for (var i=0; i <langArray.length ; i ++) {
		var option = document.createElement('option');
			option.value = langArray[i].value;
			option.text = langArray[i].text;
			if(i==4){option.selected="selected";}
		newList[j-1].appendChild(option);
	}
	
	inp_txt[j-1][0].parentNode.appendChild(newList[j-1]);	

	newButton[j-1] = document.createElement("input");
					newButton[j-1].type = "button";
					newButton[j-1].value = "1/3";
					newButton[j-1].id='tiers'+(j-1);
					newButton[j-1].onclick = function(){
						portion(this.id, 3);
					};
	inp_txt[j-1][0].parentNode.appendChild(newButton[j-1]);	
	
	newButton2[j-1] = document.createElement("input");
					newButton2[j-1].type = "button";
					newButton2[j-1].value = "1/2";
					newButton2[j-1].id='demi'+(j-1);
					newButton2[j-1].onclick = function(){
						portion(this.id, 2);
					};
	inp_txt[j-1][0].parentNode.appendChild(newButton2[j-1]);	
	
	newButton3[j-1] = document.createElement("input");
					newButton3[j-1].type = "button";
					newButton3[j-1].value = "Max";
					newButton3[j-1].id='max'+(j-1);
					newButton3[j-1].onclick = function(){
						portion(this.id, 1);
					};
	inp_txt[j-1][0].parentNode.appendChild(newButton3[j-1]);
}

var newButton3 = document.createElement("input");
                newButton3.type = "button";
				newButton3.value = "Réorganiser";
				newButton3.onclick = function(){
					calcul_all(); 
					btn_reorga.click();
				};
				
var btn_reorga = document.getElementsByClassName('input')[document.getElementsByClassName('input').length-1];
btn_reorga.style.display ="none";
btn_reorga.parentNode.insertBefore(newButton3, btn_reorga);
