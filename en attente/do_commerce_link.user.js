// ==UserScript==
// @name           DO_Commerce_link
// @author         Coni
// @description    Lien direct au commerce du joueur
// @include        http://game.desert-operations.*/world*/*
// @version        1.00
//
// ==/UserScript==

var lien=document.getElementsByClassName('ancUserDetail openUserDetails');
var Name = new Array();
var url = new Array();

for(i=0;i<lien.length;i++){
	Name[i] = lien[i].textContent;

	url[i] = "http://game.desert-operations.fr/world1/handel.php?mode=1&username="+Name[i]+"&username_partly=1&search_user=Chercher";
	
	var lien_url = document.createElement('a');
		lien_url.href = url[i];
		lien_url.setAttribute("target", "_blank");
		
	var image = document.createElement('img');
		image.className="icon";
		image.src="images/classic/icons/lorry.png";	
	
	lien[i].parentNode.appendChild(lien_url);
	lien_url.appendChild(image);
}