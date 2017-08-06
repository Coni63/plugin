// ==UserScript==
// @name           DO_Conv_ultimate
// @author         Coni
// @description    Version améliorée du Do_conversion
// @include        http://game.desert-operations.*/world*/*
// @exclude        http://game.desert-operations.*/world*/battleReport.*
// @exclude        http://game.desert-operations.*/world*/spionageReport*
// @version        4.22
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_conversion.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_conversion.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_conversion.user.js
// @require		   https://sites.google.com/site/coni63do/plugin/fonctions.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

function MyScript(aff_mode, classe){
	var balise=document.getElementsByClassName(classe);
		for(var i=0, c=balise.length; i<c; i++){
			balise[i].innerHTML=Convertir2(balise[i].title, aff_mode);
		}
}

function toggle_type(elem){
	type_conversion = (type_conversion+1)%3;
	GM_setValue('type_of_aff', type_conversion);
	document.getElementById('type_conv_hidden').innerHTML=type_conversion;
	elem.value = Name[type_conversion];
}

function Add_Affichage(){
	var div_info = document.createElement('div');
		div_info.style.cssText = 'position:relative;top:10px;left:10px;width:80px;';
	document.getElementById('infopanel_inner').appendChild(div_info);
	
	var modeC=document.createElement('input');
		modeC.type='button';
		modeC.value = Name[type_conversion];
		modeC.onclick = function(){
			toggle_type(this);
			MyScript(type_conversion, 'tooltipExtention showTooltipDefault');
		};
		modeC.style.width="80px";
		
	var newButton = document.createElement('input');
		newButton.type='button';
		newButton.value = "Convertir";
		newButton.onclick = function(){
			MyScript(type_conversion, 'tooltipExtention showTooltipDefault');
		};
		newButton.style.cssText = 'position:relative;top:-34px;left:90px;width:80px;';

	div_info.appendChild(modeC);
	div_info.appendChild(newButton);
}
	
var Name = ['Crésus', 'Puissance', 'Aucun'];
var type_conversion = GM_getValue('type_of_aff', 1);

var div_hidden = document.createElement('div');
	div_hidden.id='type_conv_hidden';
	div_hidden.style.display = 'none';
	div_hidden.innerHTML=type_conversion;
document.body.appendChild(div_hidden);

if(window.location.href!='http://game.desert-operations.fr/world1/premium_cash.php?section=ress'){
	
	MyScript(type_conversion, 'tooltipExtention showTooltipDefault'); //avant pour que ca marche partout
	Add_Affichage();
}

if(window.location.href=='http://game.desert-operations.fr/world1/premium_cash.php?section=ress'){
	
	document.getElementById('premiumGraph').style.display = 'block';
	document.getElementById('accountValueNote').innerHTML = 'Lancer la conversion</br>';
	
	var modeC=document.createElement('input');
		modeC.type='button';
		modeC.value = Name[type_conversion];
		modeC.onclick = function(){
			toggle_type(this);
			MyScript(type_conversion, 'showTooltipDefault');
		};
		modeC.style.width="80px";
			
	var newButton = document.createElement('input');
		newButton.type='button';
		newButton.value = "Convertir";
		newButton.onclick = function(){
			MyScript(type_conversion, 'showTooltipDefault');
		};

	document.getElementById('accountValueNote').appendChild(modeC);
	document.getElementById('accountValueNote').appendChild(newButton);
	
	var valeurs = document.getElementById('accountCurrentValues').innerHTML.split('<br>');

	var Val_actuelle=Convertir2(valeurs[0], type_conversion);
	var Moy_actuelle=Convertir2(valeurs[1], type_conversion);

	document.getElementById('accountCurrentValues').innerHTML=Val_actuelle+'<br>'+Moy_actuelle+'<br>'+valeurs[2];
	
}