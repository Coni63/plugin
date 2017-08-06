// ==UserScript==
// @name           DO_Commerce_link
// @author         Coni
// @description    Lien direct au commerce du joueur
// @include        http://game.desert-operations.*/world*/postfach.php
// @version        1.00
//
// ==/UserScript==

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

var loc=document.getElementsByClassName('ancUserDetail openUserDetails');
var posi = document.getElementsByClassName('inboxMailActions');
var Name = new Array();
var url = new Array();

for(i=0;i<loc.length;i++){
	Name[i] = loc[i].textContent;

	url[i] = "http://game.desert-operations.fr/world1/handel.php?mode=1&username="+Name[i]+"&username_partly=1&search_user=Chercher";
	
	var spang = document.createElement('span');
		spang.className='inboxIconBorder';
	
	var lien = document.createElement('a');
		lien.href = url[i];
		lien.setAttribute("target", "_blank");
		
	var image = document.createElement('img');
		image.className="icon";
		image.src="images/classic/icons/lorry.png";	
	
	posi[i+1].getElementsByTagName('span')[2].remove();
	
	posi[i+1].appendChild(spang);
	spang.appendChild(lien);
	lien.appendChild(image);
}