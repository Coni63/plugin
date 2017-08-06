// ==UserScript==
// @name           DO_Re_type
// @author         Coni
// @description    Modifie et améliore quelques affichages
// @include        http://game.desert-operations.*/world*/alliancereports.php
// @version        4.22
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_re_type.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_re_type.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_re_type.user.js
// @grant          GM_xmlhttpRequest
// ==/UserScript==

function check_type(){

	var ligne_re=document.getElementsByName('spy');
	var urlre = new Array();

	var colonne_re = document.getElementById('moreSpioReportsContainer').firstChild.nextSibling.firstChild.lastChild;
		colonne_re.innerHTML = 'type';

	function faire_requete(lien, num){

			GM_xmlhttpRequest({
						  method: "GET",
						  url: lien,
						  synchronous:true,
						  onload: function(response) {
							if (response.responseText.match("Unités")){
								ligne_re[num].getElementsByTagName('td')[4].innerHTML ='Unités';
							} else if (response.responseText.match("Défense")){
								ligne_re[num].getElementsByTagName('td')[4].innerHTML ='Défenses';
							} else {
								ligne_re[num].getElementsByTagName('td')[4].innerHTML ='Ressources';
							}
						  }
			});	

	}
		
		for (i = 0 ; i < ligne_re.length ; i++){
			urlre[i] = ligne_re[i].getElementsByTagName('td')[3].firstChild.href;
			faire_requete(urlre[i],i)
		}
}

var newButton = document.createElement("input");
    newButton.type = "button";
	newButton.value = "Afficher les type de RE";
	newButton.onclick = function(){check_type();};
	
	document.getElementsByTagName('caption')[1].appendChild(newButton);