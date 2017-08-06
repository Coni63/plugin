// ==UserScript==
// @name           DO_reco
// @author         Coni
// @description    Vous reconnecte en cas de delai dépassé
// @include        http://*.desert-operations.fr/world1/index.php?show=accessdenied
// @include        http://www.desert-operations.fr/
// @include        http://www.desert-operations.fr/game.html
// @include        http://game.desert-operations.fr/world1/*
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_reco.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_reco.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_reco.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @version        1.20
// ==/UserScript==

var hold_co = GM_getValue('actived', false);

if (window.location.href=='http://game.desert-operations.fr/world1/index.php?show=accessdenied'){
	setTimeout(function(){
		window.location.href='http://game.desert-operations.fr/world1/landing.php';
	}, 1000);
} else if(window.location.href=='http://www.desert-operations.fr/'){
	if(document.getElementById('_highdigit_loginbox_login_form')!=null){
		setTimeout(function(){
			document.getElementById('_highdigit_keep_connected').checked=true;
			document.getElementById('_highdigit_btn_login').click();
			alert('ok');
		}, 2000);
	}
	setTimeout(function(){
		document.getElementById('_highdigit_loginbox_play').click();
		alert('ok');
	}, 2000);
} else if (window.location.href=='http://www.desert-operations.fr/game.html'){
	setTimeout(function(){
		window.location.href='http://game.desert-operations.fr/worldselector.php?world=world1';
	}, 2000);
}

if (window.location.href.substr(0,40)=='http://game.desert-operations.fr/world1/'){

var div_reco = document.createElement('div');
	div_reco.style.cssText = 'position:relative;left:10px;';
document.getElementById('infopanel_inner').appendChild(div_reco);

var label = document.createElement("Label");
	label.setAttribute("for",'connected');
	label.innerHTML = "Maintenir la connection :";
div_reco.appendChild(label);

var ChkBx = document.createElement('input');
	ChkBx.type = "checkbox";
	ChkBx.id='connected';
	if (hold_co==true){
		ChkBx.checked=true;
	}
	ChkBx.onclick=function(){
		if (hold_co==true){
			GM_setValue('actived', false);
			ChkBx.checked=false;
		} else {
			GM_setValue('actived', true);
			ChkBx.checked=true;
		}
	}
div_reco.appendChild(ChkBx);	
}

 if (hold_co==true){
	setTimeout(function(){location.reload();}, 600000 );
 }