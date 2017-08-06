// ==UserScript==
// @name           DO Continents
// @author         Coni
// @description    Affiche dans l'alli les continents
// @include        http://game.desert-operations.*/world*/allianceoverview.php
// @version        1.00
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_continents.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_continents.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_continents.user.js
// @grant		   none
// ==/UserScript==

var Continent = new Array();

Continent['InSoMniaK']='5';
Continent['BELGIUMBULL']='5';
Continent['oxxo87100']='3';
Continent['FEDEX22']='1';
Continent['Toxique46']='1';
Continent['Eagle-Claw']='1';
Continent['el_kador']='3';
Continent['le_PaRaSiTe']='1';
Continent['le_MiNi_PaRaSiTe']='1';
Continent['the dead man_vdv']='6';
Continent['Anonymous']='1';

var Lieu = document.getElementById('userInfoData').firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.lastChild.innerHTML.substr(0,1);
var Mon_Nom = document.getElementById('userInfoData').firstChild.firstChild.firstChild.lastChild.innerHTML;
var player_line = document.getElementById('allianceOverviewMemberTable').getElementsByClassName('showContactDetails');


for (i = 0 ; i<player_line.length ; i++){
	var Nom = player_line[i].getElementsByClassName('ancUserDetail openUserDetails')[0].innerHTML.replace(/<\/?[^<]+>/g,'').trim();
	if(Continent[Nom]==Lieu && Nom != Mon_Nom){
		player_line[i].lastChild.innerHTML += '<img alt="plus près" src="images/classic/icons/tick.png"></img>';
	}
}


	
