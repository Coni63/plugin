// ==UserScript==
//
// @name           DO_safe_attaque
// @author         Coni
// @description    Controle la connexion du/des joueur(s) que vous attaquez
// @include        http://game.desert-operations.*/world*/*.*
// @resource logo http://www.clker.com/cliparts/a/d/7/2/124564065430139454Minduka_Alert.svg.med.png
// @grant          GM_xmlhttpRequest
// @grant		   GM_getResourceURL
// @version        1.00
//	
// ==/UserScript==

var drapeau = false;
var etat_actuel = false;
var actions=document.getElementById('infopanel_tab_actions');
var list_actions=actions.getElementsByClassName('ancUserDetail openUserDetails');
var mec=new Array();

function checker(){
	
	function affichage(etat, maintenant){
					if(etat==true && maintenant==false){
						affiche();
						maintenant=true;
					}
					else if(etat==false && maintenant==true){
						efface();
						maintenant=false;
					}
					else if(etat==true && maintenant==true){
						maintenant=true;
					}
					else if(etat==false && maintenant==true){
						maintenant=false;
					}
				return maintenant;
	}
	
	function efface(){
		document.getElementById('alerte_co').innerHTML='';
		document.getElementById('text_alert').innerHTML='';
	}
	
	function affiche(){
		var texte=document.createElement("div");
		texte.innerHTML="Attention joueur(s) connecté(s)";
		texte.style.cssText = 'position:relative;top:-30px;left:55px;width:250px;';
		texte.id='text_alert';

		var oImg=document.createElement("img");
		oImg.src = GM_getResourceURL("logo");
		oImg.style.cssText = 'width:50px;height:50px;';
		oImg.id='alerte_co';

		document.getElementById('userInfoRank').appendChild(oImg);
		document.getElementById('userInfoRank').appendChild(texte);
	}
	
	for (i=0;i<list_actions.length;i++){
			mec[i]= list_actions[i].href;
				GM_xmlhttpRequest({
				  method: "GET",
				  url: mec[i],
				  synchronous:true,
				  onload: function(response) {
					if(response.responseText.match("Est en ligne")){
						drapeau = true;
						etat_actuel=affichage(drapeau, etat_actuel);
					}else{
						drapeau = false;
						etat_actuel=affichage(drapeau, etat_actuel);
					}
				  }
				});
				

	}
}

checker();
setInterval('checker', 30000);