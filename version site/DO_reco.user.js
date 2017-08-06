// ==UserScript==
// @name           DO_reco
// @author         Coni
// @description    Vous reconnecte en cas de delai dépassé
// @include        http://*.desert-operations.fr/world1/index.php?show=accessdenied
// @include        http://www.desert-operations.fr/
// @include        http://www.desert-operations.fr/game.html
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_reco.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_reco.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_reco.user.js
// @version        1.20
// ==/UserScript==

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