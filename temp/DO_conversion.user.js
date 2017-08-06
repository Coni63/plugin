// ==UserScript==
// @name           DO_Conv_ultimate
// @author         Coni
// @description    Version améliorée du Do_conversion
// @include        http://game.desert-operations.*/world*/*.*
// @exclude        http://game.desert-operations.*/world*/battleReport.*
// @exclude        http://game.desert-operations.*/world*/spionageReport*
// @version        4.01
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
			if ( aff_mode == 0 ){
				balise[i].innerHTML=Convert(DelPoint(balise[i].title));
			} else if (aff_mode == 1){
				balise[i].innerHTML=Convert2(DelPoint(balise[i].title));
			}
		}
}

function toggle_type(elem){
	type_conversion = (type_conversion+1)%3;
	GM_setValue('type_of_aff', type_conversion);
	elem.value = Name[type_conversion];
}

function Add_Affichage(){
	var div_info = document.createElement('div');
		div_info.style.cssText = 'position:relative;top:10px;left:10px;width:80px;';
	document.getElementById('infopanel_inner').appendChild(div_info);
	
	var mode=document.createElement('input');
		mode.type='button';
		mode.value = Name[type_conversion];
		mode.onclick = function(){
			toggle_type(this);
			MyScript(type_conversion, 'tooltipExtention showTooltipDefault');
		};
		mode.style.width="80px";
		
	var newButton = document.createElement('input');
		newButton.type='button';
		newButton.value = "Convertir";
		newButton.onclick = function(){
			MyScript(type_conversion, 'tooltipExtention showTooltipDefault');
		};
		newButton.style.cssText = 'position:relative;top:-34px;left:90px;width:80px;';

	div_info.appendChild(mode);
	div_info.appendChild(newButton);
	}
	
var Name = ['Crésus', 'Puissance', 'Aucun'];
var type_conversion = GM_getValue('type_of_aff', 1);

if(window.location.href!='http://game.desert-operations.fr/world1/premium_cash.php?section=ress'){
	
	MyScript(type_conversion, 'tooltipExtention showTooltipDefault'); //avant pour que ca marche partout
	Add_Affichage();
}

if(window.location.href=='http://game.desert-operations.fr/world1/premium_cash.php?section=ress'){
	
	document.getElementById('premiumGraph').style.display = 'block';
	document.getElementById('accountValueNote').innerHTML = 'Lancer la conversion</br>';
	
	var mode=document.createElement('input');
		mode.type='button';
		mode.value = Name[type_conversion];
		mode.onclick = function(){
			toggle_type(this);
			MyScript(type_conversion, 'showTooltipDefault');
		};
		mode.style.width="80px";
			
	var newButton = document.createElement('input');
		newButton.type='button';
		newButton.value = "Convertir";
		newButton.onclick = function(){
			MyScript(type_conversion, 'showTooltipDefault');
		};

	document.getElementById('accountValueNote').appendChild(mode);
	document.getElementById('accountValueNote').appendChild(newButton);
	
	var valeurs = document.getElementById('accountCurrentValues').innerHTML.split('<br>');

	if ( type_conversion == 0 ){
		var Val_actuelle=Convert(DelPoint(valeurs[0]));
		var Moy_actuelle=Convert(DelPoint(valeurs[1]));
	} else if (type_conversion == 1){
		var Val_actuelle=Convert2(DelPoint(valeurs[0]));
		var Moy_actuelle=Convert2(DelPoint(valeurs[1]));
	} 
	
	document.getElementById('accountCurrentValues').innerHTML=Val_actuelle+'<br>'+Moy_actuelle+'<br>'+valeurs[2];
	
}