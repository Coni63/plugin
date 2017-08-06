// ==UserScript==
// @name           DO Commerce Info
// @author         Coni
// @description    Donne des infos cruciales sur les ressources en vente sur le commerce
// @include        http://*.desert-operations.*/world*/handel.php*
// @version        4.20
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_commerce_info.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_commerce_info.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_commerce_info.user.js
// @require		   https://sites.google.com/site/coni63do/plugin/unite.js
// @require		   https://sites.google.com/site/coni63do/plugin/fonctions.js
// @require		   https://sites.google.com/site/coni63do/plugin/bignumber.js
// @grant		   none
// ==/UserScript==

if(window.location.href.substring(0,57)=='http://game.desert-operations.fr/world1/handel.php?mode=1'){

//**************commerce color******************

	var formulaire = document.getElementsByTagName('form'); // on recup tous les formulaire
			for(var i = 0; i<formulaire.length;i++){
				if(formulaire[i].className=='tradeBuyOffer' && formulaire[i].id!='countdownCount'){ // s'il correspond à une vente
					var Unite_en_vente = GetUnit(formulaire[i].firstChild.firstChild.innerHTML); // on récupère le nom de l'unité
					var prix_normal=Unites_Stats[Unite_en_vente][0];
					var quantite = formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[0].title.replace(/[^0-9]/gi,'');
					var prix  = formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[1].title.replace(/[^0-9]/gi,'');
					var PU = parseInt(n(prix).multiply(1000).divide(quantite));
					var Pourcent = PU/(1000*prix_normal);
					var Taux = Arrondir(Pourcent*100,1);
					var Color;
					
					if (Pourcent >= 0.94) {
						Color = 'FF0000';
					} if (Pourcent >= 0.93 && Pourcent < 0.94 ) {
						Color = 'FA5858';
					} if (Pourcent >= 0.92 && Pourcent < 0.93 ) {
						Color = 'F5A9A9';
					} if (Pourcent >= 0.91 && Pourcent < 0.92 ) {
						Color = 'F8E0E0';
					} if (Pourcent >= 0.90 && Pourcent < 0.91 ) {
						Color = 'EFEFFB';
					} if (Pourcent >= 0.89 && Pourcent < 0.90 ) {
						Color = 'CEF6CE';
					} if (Pourcent >= 0.88 && Pourcent < 0.89 ) {
						Color = '81F781';
					} if (Pourcent >= 0.87 && Pourcent < 0.88 ) {
						Color = '2EFE2E';
					} if (Pourcent >= 0.86 && Pourcent < 0.87 ) {
						Color = '01DF01';
					}if (Pourcent >= 0.85 && Pourcent < 0.86 ) {
						Color = '088A08';
					}if (Pourcent < 0.85){
						Color = '0000CC';
					}
					formulaire[i].firstChild.style.cssText='color:#'+Color+';';	
					formulaire[i].getElementsByClassName('formColumnTrade column20 ltr')[0].firstChild.innerHTML+='('+Taux+'%)';
				}
			}			

	//*************commerce lots*******************
	
	var plus = document.getElementsByClassName('btn_dec ltr');
	var moins = document.getElementsByClassName('btn_inc ltr');
	//var colonne = document.getElementsByClassName('inputFleedAssignment');

	for (var i=0;i<plus.length;i++){plus[i].remove(); i--;}
	for (var i=0;i<moins.length;i++){moins[i].remove(); i--;}
	//for (var i=0;i<colonne.length;i++){colonne[i].style.cssText="margin:0px; width:280px;";}
	
	function LabelShort(nombre, position, De){
	var newlabel = document.createElement("Label");
		newlabel.setAttribute("for", De);
		newlabel.innerHTML = Create_Aff(nombre);
		newlabel.id='label'+De;
	position.appendChild(newlabel);
	}
	
	function Update(elem, index){
		elem.id=index;
		LabelShort(elem.value.replace(/[^0-9]/gi,''), elem.parentNode, index); 
		elem.onkeyup=function(){
			document.getElementById('label'+index).innerHTML = Create_Aff(elem.value.replace(/[^0-9]/gi,''));
			elem.value = lisibilite_nombre(elem.value.replace(/[^0-9]/gi,''));
		}
	}
	
	var part = document.getElementsByClassName('adjNumInput tradeSearchSplittedCount');
	
	for(i=0, c=part.length ; i<c ;i++){
		part[i].value = lisibilite_nombre(part[i].max);
		Update(part[i], i);
	}
	
	

	//************commerce color inter alli **********************

	var span = document.getElementsByClassName('colorAlliancePrice');
	
	for (var i = 0 ; i<span.length+1 ; i++){
		span[0].parentNode.parentNode.style.cssText += 'font-weight:bold;';
		span[0].removeAttribute("class");
	}
}


//***********Sell max******************

if ( window.location.href=='http://game.desert-operations.fr/world1/handel.php?mode=2'){

	var newButton = document.createElement("input");
						newButton.type = "button";
						newButton.value = "Max";
						newButton.id="put_max";
						newButton.onclick = function(){
							
							var ObjListe = document.getElementById('tradeSaleResourceDropdown');
							var Rel = ObjListe.options[ObjListe.selectedIndex].getAttribute('rel');
							var tableau = JSON.parse(Rel);
							var taux_actuel = document.getElementsByClassName('block-head-information')[0].innerHTML.replace(/[^0-9]/gi,'');
							
							var Maxi = tableau.sMaxAmount; // en num
							var PU = tableau.iPrice; // en num 
							var Taux = taux_actuel; // en long 8910 pour 89.10%
							var total = n(Maxi).multiply(PU).multiply(Taux).divide(10000);
							
							document.getElementById('tradeOfferAmount').value=lisibilite_nombre(Maxi); // Qté max mise en page avec les .
							document.getElementById('ally_price_count').value=lisibilite_nombre(total); // prix avec mise en page
							document.getElementById('tradePublicPrice').value=lisibilite_nombre(total);
							document.getElementById('price_count').value=lisibilite_nombre(total);
						};
						
	document.getElementById('tradeSaleResourceDropdown').parentNode.appendChild(newButton);

}