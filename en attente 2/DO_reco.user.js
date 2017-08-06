// ==UserScript==
// @name           DO_reco
// @author         Coni
// @description    Vous reconnecte en cas de delai dépassé
// @include        http://*.desert-operations.fr/world1/index.php?show=accessdenied
// @include        http://www.desert-operations.fr/
// @include        http://www.desert-operations.fr/game.html
// @version        1.20
// ==/UserScript==

if (window.location.href=='http://game.desert-operations.fr/world1/index.php?show=accessdenied'){
	window.location.href='http://game.desert-operations.fr/world1/landing.php';
} else if(window.location.href=='http://www.desert-operations.fr/'){
	document.getElementById('_highdigit_loginbox_play').click();
	alert('ok');
} else if (window.location.href=='http://www.desert-operations.fr/game.html'){
	setTimeout(function(){
		window.location.href='http://game.desert-operations.fr/worldselector.php?world=world1';
	}, 2000);
}