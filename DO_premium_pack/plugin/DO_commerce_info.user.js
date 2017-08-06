// ==UserScript==
// @name           DO Commerce Info
// @author         Coni
// @description    Donne des infos cruciales sur les ressources en vente sur le commerce
// @include        http://*.desert-operations.*/world*/handel.php*
// @require		   unite.js
// @require		   fonctions.js
// @grant		   none
// @version        3.00
// ==/UserScript==

if(window.location.href.substring(0,57)=='http://game.desert-operations.fr/world1/handel.php?mode=1'){

//**************commerce color******************

	var formulaire = document.getElementsByTagName('form'); // on recup tous les formulaire
			for(var i = 0; i<formulaire.length;i++){
				if(formulaire[i].className=='tradeBuyOffer' && formulaire[i].id!='countdownCount'){ // s'il correspond à une vente
					var Unite_en_vente = GetUnit(formulaire[i].firstChild.firstChild.innerHTML); // on récupère le nom de l'unité
					var prix_normal=Unites_Stats[Unite_en_vente][0];
					var quantite = DelPoint(formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[0].title);
					var prix  = DelPoint(formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[1].title);
					var Pourcent = (prix/(quantite*prix_normal)).toFixed(3);
					var Taux = Arrondir(Pourcent*100,2);
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
					}
					formulaire[i].firstChild.style.cssText='color:#'+Color+';';	
					formulaire[i].getElementsByClassName('formColumnTrade column20 ltr')[0].firstChild.innerHTML+='('+Taux+'%)';
				}
			}			

	//*************commerce lots*******************
	var part=document.getElementsByTagName('input');

	for(i=0, c=part.length ; i<c ;i++){
		if(part[i].type=='text'){
			part[i].value = lisibilite_nombre(part[i].max);
		}
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
							document.getElementById('tradeOfferAmount').value=lisibilite_nombre(document.getElementById('tradeOfferAmount').max);
						};
						
	document.getElementById('tradeSaleResourceDropdown').parentNode.appendChild(newButton);

}