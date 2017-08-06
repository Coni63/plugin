// ==UserScript==
// @name           DO_assistance
// @author         Coni
// @description    Améliore le tableau croisé et le tableau des unités
// @include        http://game.desert-operations.*/world*/kt.php
// @include        http://game.desert-operations.*/world*/units.php
// @version        4.00
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_assistance.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_assistance.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_assistance.user.js
// @require		https://sites.google.com/site/coni63do/plugin/fonctions.js
// @require		https://sites.google.com/site/coni63do/plugin/unite.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

var URL_short = 'http://game.desert-operations.fr/world1/';

function AddCheckBox(ID_line, ID_box){
	
	var ChkBx = document.createElement('input');
		ChkBx.type="checkbox";
		ChkBx.id=ID_box;
		ChkBx.name = 'cases';
		ChkBx.onclick =function(){
			if ( this.checked){
				document.getElementById(ID_line).className = 'crossTableHoverActive';
				Chercher_imbattable();
			} else {
				document.getElementById(ID_line).className = '';
				Chercher_imbattable();
			}
		};

	document.getElementById(ID_line).firstChild.lastChild.innerHTML = '';
	document.getElementById(ID_line).firstChild.lastChild.appendChild(ChkBx);
	
	document.getElementById(ID_line).onmouseout = function(){
		if (document.getElementById(ID_box).checked){
			document.getElementById(ID_line).className = 'crossTableHoverActive';
		}
	}

}

function Chercher_imbattable(){

var CheckBx = document.getElementsByName('cases');
var lines = new Array();
var col = new Array();
var unit = new Array();

for (var i = 0; i< CheckBx.length ; i++){
	if (CheckBx[i].checked){
		lines.push(CheckBx[i].id.replace(/[^0-9]/gi,''));
	}
}

for (var j = 1 ; j< 47 ; j++){ // pour chaque colonne
	for (var k = 0 ; k < lines.length ; k++){ // on regarde la fleche de chaque lignes cochées
		var elem = document.getElementById('hover-'+lines[k]+'-'+j).className;
		var vert = 'condition yellow crossTableHoverStatus cross-unit-'+j;
		var jaune = 'condition green crossTableHoverStatus cross-unit-'+j;
		if (elem == jaune || elem == vert){
			col.push(j);
		}
	}
}	

for (var k = 0 ; k< col.length-1 ; k++){
	if (col[k]==col[k+1]){
		col.splice(k,1);
		k--;
	}
} 

for (var l = 1; l < 47; l++){ // pour chaque colonne
	if(col.indexOf(l)=='-1'){ // si on ne trouve pas l'elem
		var Nom_unit = document.getElementById('unit-'+l).firstChild.firstChild.firstChild.innerHTML.split('<');
		unit.push(Nom_unit[0]);
	}
}
	
	document.getElementById('Zone_de_text').innerHTML = 'Unités non détruites : '+unit.join(', ');

}

function Calculer(a,b){

var line2 = document.getElementsByTagName('tr');
	
	for (var i =1 ; i< line2.length ; i++){
		Nom_unites = line2[i].getElementsByTagName('td')[0].innerHTML;
		var result;
		
		if( a == 1 ){
			if( Unites_Stats[Nom_unites][2] == 'Diesel' ){
				result = Unites_Stats[Nom_unites][a]*10/Unites_Stats[Nom_unites][b];
			} else {
				result = Unites_Stats[Nom_unites][a]*20/Unites_Stats[Nom_unites][b];
			}
		}else if ( b == 1 ) {
			if( Unites_Stats[Nom_unites][2] == 'Diesel' ){
				result = Unites_Stats[Nom_unites][a]/(Unites_Stats[Nom_unites][b]*10);
			} else {
				result = Unites_Stats[Nom_unites][a]/(Unites_Stats[Nom_unites][b]*20);
			}
		}else if (a != 1 && b != 1){
			result = Unites_Stats[Nom_unites][a]/Unites_Stats[Nom_unites][b];
		}
		
		line2[i].lastChild.innerHTML = result.toFixed(2);
	}
}

if (window.location.href.substr(URL_short.length,5) == 'units'){

var label1 = document.createElement("Label");
	label1.setAttribute("for",'compar1');
	label1.innerHTML = "Comparer ";
	document.body.appendChild(label1);

var compar1 = document.createElement('select');
	compar1.id = 'compar1';
	compar1.innerHTML = '<option value="0">Prix</option><option value="1">Conso</option><option value="3">Munitions</option><option value="4">Entretien</option><option value="5">Attaque</option><option value="6">Défense</option>';
	compar1.style.display='inline';
	document.body.appendChild(compar1);

var label2 = document.createElement("Label");
	label2.setAttribute("for",'compar2');
	label2.innerHTML = " à ";
	document.body.appendChild(label2);
	
var compar2 = document.createElement('select');
	compar2.id = 'compar1';
	compar2.innerHTML = '<option value="0">Prix</option><option value="1">Conso</option><option value="3">Munitions</option><option value="4">Entretien</option><option value="5">Attaque</option><option value="6">Défense</option>';
	compar2.style.display='inline';
	document.body.appendChild(compar2);

var Btn1 = document.createElement('input');
	Btn1.type = 'button';
	Btn1.value = 'Comparer';
	Btn1.onclick = function(){
	var C1 = compar1.options[compar1.selectedIndex].value;
	var C2 = compar2.options[compar2.selectedIndex].value;
	Calculer(C1, C2);}
	document.body.appendChild(Btn1);
	
function Add_Coll(node, val){	
	var colonne = document.createElement('td');
		colonne.innerHTML = val;
	node.appendChild(colonne);
}
	
var ligne = document.getElementsByTagName('tr');
	Add_Coll(ligne[0], '<strong>Comparatif</strong>');
	for (var i=1; i<ligne.length;i++){
		Add_Coll(ligne[i], '');
	} 
}

if (window.location.href.substr(URL_short.length,5) == 'kt.ph'){

	var Texte = document.createElement('div');
		Texte.id ='Zone_de_text';
		
	document.getElementById('lightboxContent').firstChild.appendChild(Texte);

	for (var i = 1; i < 47; i++){
		var nom_ID = 'unit-'+i;
		var Chk_ID = 'Chk'+i;
		AddCheckBox(nom_ID, Chk_ID);
	}
	
}