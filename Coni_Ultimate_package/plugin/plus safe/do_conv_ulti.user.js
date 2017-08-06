// ==UserScript==
// @name           DO_Conv_ultimate
// @author         Coni
// @description    Version améliorée du Do_conversion
// @include        http://game.desert-operations.*/world*/*.*
// @exclude        http://game.desert-operations.*/world*/battleReport.*
// @exclude        http://game.desert-operations.*/world*/spionageReport*
// @version        3.00
// @grant       GM_getValue
// @grant       GM_setValue
//
// ==/UserScript==

function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
} 

function DelPoint(Nombre) {
	var	End = Nombre.replace(/\./g,'');
	End = parseInt(End);
	return End;
} 

function Convert(Quantite) {
	if(Quantite>=0){
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
	} else {
		Quantite = Math.abs(Quantite);
		if (Quantite < Math.pow(10,3)) {
			Quantite ='-'+Quantite+'';
		} else if (Quantite < Math.pow(10,6)) {
			Quantite /= Math.pow(10,3);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' k';
		} else if (Quantite < Math.pow(10,9)) {
			Quantite /= Math.pow(10,6);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' m';
		} else if (Quantite < Math.pow(10,12)) {
			Quantite /= Math.pow(10,9);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' M';
		} else if (Quantite < Math.pow(10,15)) {
			Quantite /= Math.pow(10,12);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' b';
		} else if (Quantite < Math.pow(10,18)) {
			Quantite /= Math.pow(10,15);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' B';
		} else if (Quantite < Math.pow(10,21)) {
			Quantite /= Math.pow(10,18);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' C';
		}else if (Quantite < Math.pow(10,24)) {
			Quantite /= Math.pow(10,21);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' kC';
		}else if (Quantite < Math.pow(10,27)) {
			Quantite /= Math.pow(10,24);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' mC';
		}else if (Quantite < Math.pow(10,30)) {
			Quantite /= Math.pow(10,27);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' MC';
		}else if (Quantite < Math.pow(10,33)) {
			Quantite /= Math.pow(10,30);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' bC';
		}else if (Quantite < Math.pow(10,36)) {
			Quantite /= Math.pow(10,33);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' BC';
		}else if (Quantite < Math.pow(10,39)) {
			Quantite /= Math.pow(10,36);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' C²';
		}else if (Quantite < Math.pow(10,42)) {
			Quantite /= Math.pow(10,39);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' kC²';
		}else if (Quantite < Math.pow(10,45)) {
			Quantite /= Math.pow(10,42);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' mC²';
		}else if (Quantite < Math.pow(10,48)) {
			Quantite /= Math.pow(10,45);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' MC²';
		}else if (Quantite < Math.pow(10,51)) {
			Quantite /= Math.pow(10,48);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' bC²';
		}else if (Quantite < Math.pow(10,54)) {
			Quantite /= Math.pow(10,51);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' BC²';
		}else if (Quantite < Math.pow(10,57)) {
			Quantite /= Math.pow(10,54);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' C<sup>3</sup>';
		}
	}
	return Quantite; 
}

function Convert2(Quantite) {
	if(Quantite>=0){
		if (Quantite < Math.pow(10,3)) {
			Quantite += '';
		} else if (Quantite < Math.pow(10,6)) {
			Quantite /= Math.pow(10,3);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+3+'</sup>';
		} else if (Quantite < Math.pow(10,9)) {
			Quantite /= Math.pow(10,6);
			Quantite = Arrondir(Quantite,2);
			Quantite +=' x10<sup>'+6+'</sup>';
		} else if (Quantite < Math.pow(10,12)) {
			Quantite /= Math.pow(10,9);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+9+'</sup>';
		} else if (Quantite < Math.pow(10,15)) {
			Quantite /= Math.pow(10,12);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+12+'</sup>';
		} else if (Quantite < Math.pow(10,18)) {
			Quantite /= Math.pow(10,15);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+15+'</sup>';
		} else if (Quantite < Math.pow(10,21)) {
			Quantite /= Math.pow(10,18);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+18+'</sup>';
		}else if (Quantite < Math.pow(10,24)) {
			Quantite /= Math.pow(10,21);
			Quantite = Arrondir(Quantite,2);
			Quantite +=' x10<sup>'+21+'</sup>';
		}else if (Quantite < Math.pow(10,27)) {
			Quantite /= Math.pow(10,24);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+24+'</sup>';
		}else if (Quantite < Math.pow(10,30)) {
			Quantite /= Math.pow(10,27);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+27+'</sup>';
		}else if (Quantite < Math.pow(10,33)) {
			Quantite /= Math.pow(10,30);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+30+'</sup>';
		}else if (Quantite < Math.pow(10,36)) {
			Quantite /= Math.pow(10,33);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+33+'</sup>';
		}else if (Quantite < Math.pow(10,39)) {
			Quantite /= Math.pow(10,36);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+36+'</sup>';
		}else if (Quantite < Math.pow(10,42)) {
			Quantite /= Math.pow(10,39);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+39+'</sup>';
		}else if (Quantite < Math.pow(10,45)) {
			Quantite /= Math.pow(10,42);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+42+'</sup>';
		}else if (Quantite < Math.pow(10,48)) {
			Quantite /= Math.pow(10,45);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+45+'</sup>';
		}else if (Quantite < Math.pow(10,51)) {
			Quantite /= Math.pow(10,48);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+48+'</sup>';
		}else if (Quantite < Math.pow(10,54)) {
			Quantite /= Math.pow(10,51);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+51+'</sup>';
		}else if (Quantite < Math.pow(10,57)) {
			Quantite /= Math.pow(10,54);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+54+'</sup>';
		}
	} else {
		Quantite = Math.abs(Quantite);
		if (Quantite < Math.pow(10,3)) {
			Quantite ='-'+Quantite+ '';
		} else if (Quantite < Math.pow(10,6)) {
			Quantite /= Math.pow(10,3);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+3+'</sup>';
		} else if (Quantite < Math.pow(10,9)) {
			Quantite /= Math.pow(10,6);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+6+'</sup>';
		} else if (Quantite < Math.pow(10,12)) {
			Quantite /= Math.pow(10,9);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+9+'</sup>';
		} else if (Quantite < Math.pow(10,15)) {
			Quantite /= Math.pow(10,12);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+12+'</sup>';
		} else if (Quantite < Math.pow(10,18)) {
			Quantite /= Math.pow(10,15);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+15+'</sup>';
		} else if (Quantite < Math.pow(10,21)) {
			Quantite /= Math.pow(10,18);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+18+'</sup>';
		}else if (Quantite < Math.pow(10,24)) {
			Quantite /= Math.pow(10,21);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+21+'</sup>';
		}else if (Quantite < Math.pow(10,27)) {
			Quantite /= Math.pow(10,24);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+24+'</sup>';
		}else if (Quantite < Math.pow(10,30)) {
			Quantite /= Math.pow(10,27);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+27+'</sup>';
		}else if (Quantite < Math.pow(10,33)) {
			Quantite /= Math.pow(10,30);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+30+'</sup>';
		}else if (Quantite < Math.pow(10,36)) {
			Quantite /= Math.pow(10,33);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+33+'</sup>';
		}else if (Quantite < Math.pow(10,39)) {
			Quantite /= Math.pow(10,36);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+36+'</sup>';
		}else if (Quantite < Math.pow(10,42)) {
			Quantite /= Math.pow(10,39);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+39+'</sup>';
		}else if (Quantite < Math.pow(10,45)) {
			Quantite /= Math.pow(10,42);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+42+'</sup>';
		}else if (Quantite < Math.pow(10,48)) {
			Quantite /= Math.pow(10,45);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+45+'</sup>';
		}else if (Quantite < Math.pow(10,51)) {
			Quantite /= Math.pow(10,48);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+48+'</sup>';
		}else if (Quantite < Math.pow(10,54)) {
			Quantite /= Math.pow(10,51);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+51+'</sup>';
		}else if (Quantite < Math.pow(10,57)) {
			Quantite /= Math.pow(10,54);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+54+'</sup>';
		}
	}
	return Quantite; 
}

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


