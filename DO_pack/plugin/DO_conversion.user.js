// ==UserScript==
// @name           DO_Conv_ultimate
// @author         Coni
// @description    Version améliorée du Do_conversion
// @include        http://game.desert-operations.*/world*/*.*
// @exclude        http://game.desert-operations.*/world*/battleReport.*
// @exclude        http://game.desert-operations.*/world*/spionageReport*
// @require		   fonctions.js
// @version        3.00
// @grant       GM_getValue
// @grant       GM_setValue
//
// ==/UserScript==

function MyScript(aff_mode){
var balise=document.getElementsByClassName("tooltipExtention showTooltipDefault");
	for(i=0, c=balise.length; i<c; i++){
		if ( aff_mode == 1 ){
			balise[i].innerHTML=Convert(DelPoint(balise[i].title));
		} else {
			balise[i].innerHTML=Convert2(DelPoint(balise[i].title));
		}
	}
}

function toggle_type(elem){
	if(elem.checked){
		type_conversion = 2;
		GM_setValue('type_of_aff', type_conversion);
		document.getElementById('type_aff').innerHTML = "Mode Puissance activé";
		MyScript(type_conversion);
	} else {
		type_conversion = 1;
		GM_setValue('type_of_aff', type_conversion);
		document.getElementById('type_aff').innerHTML = "Mode Crésus activé";
		MyScript(type_conversion);
	}
}

//on lis le type sauvegardé
var type_conversion = GM_getValue('type_of_aff', 1);//type_conversion);

//on execute la conversion
MyScript(type_conversion);

//création d'un div global et des bouton / checkbox / text
var div_info = document.createElement('div');
	div_info.style.cssText = 'position:relative;top:10px;left:10px;width:80px;';

	document.getElementById('infopanel_inner').appendChild(div_info);

var choice=document.createElement('input');
	choice.type="checkbox";
	choice.name="type_conv";
	choice.id='type_conv';
	choice.onclick = function(){toggle_type(this);};
	
var texte_choice=document.createElement("div");
texte_choice.id='type_aff';
texte_choice.innerHTML="Mode Crésus activé";
texte_choice.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';

var newButton = document.createElement('input');
	newButton.type='button';
	newButton.value = "Convertir";
	newButton.id='btn_launch_conv';
	newButton.onclick = function(){MyScript(type_conversion);};
	newButton.style.cssText = 'position:relative;top:-41px;left:150px;width:80px;';

div_info.appendChild(choice);
div_info.appendChild(texte_choice);
div_info.appendChild(newButton);

//en fonction de l'état mémorisé on affiche la case cohé et le bon texte
if (type_conversion==1){
	document.getElementById('type_aff').innerHTML = "Mode Crésus activé";
	choice.checked=false;
}else{
	document.getElementById('type_aff').innerHTML = "Mode Puissance activé";
	choice.checked=true;
}

