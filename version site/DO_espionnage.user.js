// ==UserScript==
// @name           DO espionnage
// @author         Coni
// @description    Affiche vos capacités de défense contre un espionnage
// @include        http://game.desert-operations.*/world*/produktion.php?mode=3
// @version        4.22
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_espionnage.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_espionnage.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_espionnage.user.js
// @require		   https://sites.google.com/site/coni63do/plugin/fonctions.js
// @require		   https://sites.google.com/site/coni63do/plugin/bignumber.js
// @grant		   none
// ==/UserScript==

var name =new Array('Satellite espion', 'Drone', 'Avion de reconnaissance', 'Agent');
var valeur_att=new Array(45000,7500,24000,3000);
var valeur_def=new Array(15000,2500,8000,1000);
var needor = new Array(10000,6000,20000,5000);
var need_unit_att = new Array();
var need_or_att = new Array();
var def = 0;
var possess = 0;

var posi_tab=document.getElementById('lightboxContent').firstChild.firstChild;

for (i=0;i<4;i++){
possess = document.getElementsByTagName('table')[i].getElementsByClassName('tooltipExtention showTooltipDefault')[3].title.replace(/[^0-9]/gi,'');
def =  n(0).plus(possess).multiply(valeur_def[i]).plus(def);
}

for (i=0;i<4;i++){
need_unit_att[i]=n(0).plus(def).divide(valeur_att[i]);
need_or_att[i]=n(0).plus(need_unit_att[i]).multiply(needor[i]);
}

var titre = document.createElement('div');
titre.innerHTML = '<div>Unités défendable pour que le défenseur perdent son RE</div>';

posi_tab.appendChild(titre);

var tableau=document.createElement('table');
tableau.className='battleReport';
tableau.style.cssText = 'text-align:center; width:599px;';
tableau.innerHTML='<th>Unité</th><th>Quantité défendable</th><th>Or necessaire</th>';
titre.appendChild(tableau);

for (i=0;i<4;i++){
	var ligne = document.createElement('tr');
	ligne.innerHTML='<td>'
		+ name[i]
	+'</td>'
	+'<td>'
		+ Create_Aff(need_unit_att[i])
	+'</td>'
	+'<td>'
		+ Create_Aff(need_or_att[i])
	+'</td>';

	tableau.appendChild(ligne);
}

var titre2 = document.createElement('div');
titre2.innerHTML = '<div></br>Unités necessaire pour que l\'attaquant ait 100% sur vous</div>';

posi_tab.appendChild(titre2);

var tableau100=document.createElement('table');
tableau100.className='battleReport';
tableau100.style.cssText = 'text-align:center; width:599px;';
tableau100.innerHTML='<th>Unité</th><th>Quantité pour avoir 100%</th><th>Or necessaire pour avoir 100%</th>';
titre2.appendChild(tableau100);

for (i=0;i<4;i++){
	var ligne = document.createElement('tr');
	ligne.innerHTML='<td>'
		+ name[i]
	+'</td>'
	+'<td>'
		+ Create_Aff(n(need_unit_att[i]).multiply(2))
	+'</td>'
	+'<td>'
		+ Create_Aff(n(need_or_att[i]).multiply(2))
	+'</td>';

	tableau100.appendChild(ligne);
}