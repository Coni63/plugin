// ==UserScript==
// @name           DO boost
// @author         Coni
// @description    Prevision des boosts
// @include        http://game.desert-operations.*/world*/*
// @version        4.13
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_boost.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_boost.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_boost.user.js
// @require		   https://sites.google.com/site/coni63do/plugin/fonctions.js
// @require		   https://sites.google.com/site/coni63do/plugin/bignumber.js
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_setClipboard
// ==/UserScript==


function Create_Aff(nb){
	
	var span = document.createElement('span');
		span.className='tooltipExtention showTooltipDefault';
		span.title = lisibilite_nombre(nb);
		span.data = lisibilite_nombre(nb);
		span.innerHTML = Convert(nb);
	
	return span.outerHTML;
}

function calcul(){
	var valeurselectionnee = newList.options[newList.selectedIndex].value; // le prix unitaire
	var somme = document.getElementById('investissement').value.replace(/[^0-9]/gi,''); //la somme à investir
	var Taux = parseFloat(taux_buy.value)*100;
	var qte_full= n(somme).multiply(10000).divide(valeurselectionnee).divide(Taux);
	var Evo = parseInt((parseFloat(taux_sell.value)/parseFloat(taux_buy.value)-1)*10000);
	if(Evo>0){Evo='+'+Evo;}
	var gain = n(0).plus(somme).multiply(Evo).divide(10000);
	
	nB=lisibilite_nombre(qte_full);

	document.getElementById('la4').innerHTML = Create_Aff(qte_full);
	document.getElementById('la4').appendChild(newButton4);
	document.getElementById('la5').innerHTML = Create_Aff(gain)+' soit '+Evo/100+' % de VdC';
}

function vente(){
	var or = document.getElementById('resourcebar_gold_label').getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
	var pet = document.getElementById('resourcebar_oil_label').getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
	var muni = document.getElementById('resourcebar_ammunition_label').getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
	var somme_or =n(or).multiply(1000);
	var somme_pet =n(pet).multiply(500);
	var somme_muni =n(muni).multiply(7);
	var Taux = parseFloat(taux_sell.value)*100
	var somme_ress=n(somme_or).plus(somme_pet).plus(somme_muni).multiply(Taux).divide(10000);
	
	document.getElementById('la4').innerHTML = "???";
	document.getElementById('la5').innerHTML=Create_Aff(somme_ress);
}

function check_taux(){
	GM_xmlhttpRequest({
					  method: "GET",
					  url: "http://game.desert-operations.fr/world1/handel.php",
					  synchronous:true,
					  onload: function(response) {
						var xrh_bank = document.createElement('div');
						xrh_bank.innerHTML=response.responseText;

						var taux_actuel = xrh_bank.getElementsByClassName('block-head-information')[0].innerHTML;
						taux_actuel=taux_actuel.replace(/[^0-9]/gi,'');
						taux_actuel=parseFloat(taux_actuel)/100;
						
						document.getElementById('t_sell').value=taux_actuel;
						GM_setValue('t_sell', taux_actuel);
					  }
	});
}	
	
	var nB;
	
	var taux_vente = GM_getValue('t_sell', 95);
	var taux_achat = GM_getValue('t_buy', 85);
	
	var argent = document.getElementById('resourcebar_money_label').getElementsByTagName('span')[0].title;
	
	var posi = document.getElementsByClassName('infopanel last');
	posi[0].firstChild.firstChild.innerHTML = 'Boost POWAAA !!!';

	var posi_btn = posi[0].firstChild.nextSibling;
	posi_btn.innerHTML=''

	var investissement = document.createElement("input");
					investissement.type = "text";
					investissement.value = argent;
					investissement.id='investissement';
					investissement.size='25';

	var taux_buy = document.createElement("input");
					taux_buy.type = "text";
					taux_buy.value = taux_achat;
					taux_buy.id='t_buy';
					taux_buy.size='2';
					taux_buy.onchange=function(){
					taux_buy.value=taux_buy.value.replace(',','.');
					GM_setValue('t_buy', taux_buy.value);
					};
					
	var taux_sell = document.createElement("input");
					taux_sell.type = "text";
					taux_sell.value = taux_vente;
					taux_sell.id='t_sell';
					taux_sell.size='2';
					taux_sell.onchange=function(){
					taux_sell.value=taux_sell.value.replace(',','.');
					GM_setValue('t_sell', taux_sell.value);
					};
					
	var newButton = document.createElement("input");
					newButton.type = "button";
					newButton.value = "calcul";
					newButton.id='btn';
					newButton.onclick = function(){calcul();};
					
	var newButton2 = document.createElement("input");
					newButton2.type = "button";
					newButton2.value = "vente";
					newButton2.id='btn_ress';
					newButton2.onclick = function(){vente();};
					
	var newButton3 = document.createElement("input");
					newButton3.type = "button";
					newButton3.value = "MAJ Taux";
					newButton3.id='maj_taux';
					newButton3.onclick = function(){check_taux();};
					
	var newButton4 = document.createElement("input");
					newButton4.type = "button";
					newButton4.value = "Copier";
					newButton4.id='CTC';
					newButton4.onclick = function(){GM_setClipboard(nB);};				

	var langArray = [
		{value: 1000, text: "Or"},
		{value: 500, text: "Pétrole"},
		{value: 7, text: "Munitions"},
		{value: 4000000, text:"B52"},
		{value: 2000000, text:"B2"},
		{value: 1500000, text:"Freg 1"},
		{value: 500000, text:"Freg 2"},
		{value: 1500000, text:"PAN"},
	];

	var newList= document.createElement('select');
		newList.id='list';

	var option=new Array();

	for (var i=0, il = langArray.length; i < il; i ++) {
		option[i] = document.createElement('option');
		option[i].value = langArray[i].value;
		option[i].text = langArray[i].text;
		newList.appendChild(option[i]);
	}

	option[0].selected="selected";

	posi_btn.innerHTML='<div id=\'la6\'>'+'Investissement : '+'</div>'
	+ '<div id=\'la\'>'+'Taux Achat : '+'</div>'
	+ '<div id=\'la2\'>'+'Taux Vente : '+'</div>' 
	+ '<div id=\'la3\'>'+'Ressources : ' +'</div>'
	+ '<br/>' 
	+ 'Quantite achetable : '
	+ '<div id=\'la4\'>' 
	+ '???'
	+ '</div>'
	+ '<br/>' 
	+ 'Gain possible : '
	+ '<div id=\'la5\'>'
	+ '???'
	+ '</div>';

	var posi_invest = document.getElementById('la6').appendChild(investissement);
	var posi_buy = document.getElementById('la').appendChild(taux_buy);
	var posi_sell = document.getElementById('la2').appendChild(taux_sell);
	var posi_list = document.getElementById('la3').appendChild(newList);

	document.getElementById('la3').appendChild(newButton);
	document.getElementById('la3').appendChild(newButton2);
	document.getElementById('la3').appendChild(newButton3);