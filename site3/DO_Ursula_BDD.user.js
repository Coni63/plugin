// ==UserScript==
// @name           DO_Ursula_BDD
// @author         Coni
// @description    Ajout des RE/RC d'ursula sur les fiches
// @include        http://game.desert-operations.fr/world1/userdetails.php*
// @version        1.10
// @updateURL		https://sites.google.com/site/userconiscript/plugin/DO_Ursula_BDD.user.js
// @downloadURL		https://sites.google.com/site/userconiscript/plugin/DO_Ursula_BDD.user.js
// @installURL		https://sites.google.com/site/userconiscript/plugin/DO_Ursula_BDD.user.js
// @resource       My_CSS   https://sites.google.com/site/userconiscript/plugin/Style_URSULA.css
// @grant          GM_xmlhttpRequest
// @grant  	   		GM_getResourceText
// @grant    	   GM_addStyle
// ==/UserScript==

var cssTxt  = GM_getResourceText ("My_CSS");
GM_addStyle(cssTxt);

function parseAJAX_ResponseHTML(respObject){
	var parser      = new DOMParser();
	var responseDoc = parser.parseFromString(respObject.responseText, "text/html");
	return responseDoc;
}

function LimiterLigne(elem, num){
	var line_length = document.getElementById(elem).rows.length;
	
	while( document.getElementById(elem).rows.length > num+1){
		document.getElementById(elem).deleteRow(-1);
	}
}

function Add_color(){
	var tab = document.getElementById('tab_RE');
	
	for (var i = 1 ; i < tab.rows.length ; i++){
		if(tab.rows[i].cells[4].innerHTML=='Def'){tab.rows[i].cells[4].style.color='red';}
		if(tab.rows[i].cells[4].innerHTML=='Uni'){tab.rows[i].cells[4].style.color='green';}
		if(tab.rows[i].cells[4].innerHTML=='Res'){tab.rows[i].cells[4].style.color='#0080FF';}
	}
}

function Hide_link(id){
	var tab = document.getElementById(id);
	tab.rows[0].cells[0].style.cssText="width:auto;";
	tab.rows[0].cells[1].style.cssText="width:70px;";
	tab.rows[0].cells[2].style.cssText="width:150px;";
	for (var i = 1 ; i < tab.rows.length ; i++){
		tab.rows[i].cells[0].style.cssText="text-align:center;";
		tab.rows[i].cells[0].firstChild.innerHTML='Lien';
	}
}

var nom_joueur = document.getElementById('lightboxContent').firstChild.firstChild.textContent;
var posi = document.getElementsByClassName('blockFoot')[0];
var url_lien = "http://web4.sorohna.net/DoRedisCGI/doExtractReDataCgi.py?user=" + nom_joueur;
var url_lien2 = "http://web4.sorohna.net/DoRedisCGI/doExtractRcDataCgi.py?user=" + nom_joueur;
	
GM_xmlhttpRequest({
	  method: "GET",
	  url: url_lien,
	  onload: function(response){ 
		var div_RE = document.createElement('div');
			div_RE.className='Uscript';
		posi.appendChild(div_RE);	
		
		var responseparser = parseAJAX_ResponseHTML(response);
		div_RE.appendChild(responseparser.firstChild.childNodes[1].childNodes[0]);
		div_RE.firstChild.id='tab_RE';
		LimiterLigne('tab_RE', 15);
		Add_color();
		Hide_link('tab_RE');
	  }
});

GM_xmlhttpRequest({
	  method: "GET",
	  url: url_lien2,
	  onload: function(response){ 
		var div_RC = document.createElement('div');
			div_RC.className='Uscript';
		posi.appendChild(div_RC);
		
		var responseparser = parseAJAX_ResponseHTML(response);
		div_RC.appendChild(responseparser.firstChild.childNodes[1].childNodes[0]);
		div_RC.appendChild(responseparser.firstChild.childNodes[1].childNodes[1]);
		div_RC.firstChild.id='tab_RC1';
		div_RC.lastChild.id='tab_RC2';
		LimiterLigne('tab_RC1', 15);
		LimiterLigne('tab_RC2', 15);
		Hide_link('tab_RC1');
		Hide_link('tab_RC2');
	  }
});