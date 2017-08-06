// ==UserScript==
// @name           DO_booster
// @author         Coni
// @description    Coté du joueur qui est boosté
// @include        http://game.desert-operations.fr/world1/uebersicht.php
// @include        http://game.desert-operations.fr/world1/handel.php*
// @require		   fonctions.js
// @require		   unite.js
// @grant          GM_getValue
// @grant          GM_setValue
// @version        1.01
// ==/UserScript==
 
function BuyMax(unite, somme, maximum_dispo, taux){
	var Qte_buyable = somme/(Unites_Stats[unite][0] * taux);
	var Qte = Math.min(Tronque(Qte_buyable, 5), maximum_dispo);
	return lisibilite_nombre(new Big(Qte).str());
}

function Add_affichage(){

if(!document.getElementById('Content')){

	var My_Div = document.createElement('div');
		My_Div.id='Content';
	document.getElementsByClassName('blockFoot')[0].appendChild(My_Div);

	var tableau  = document.createElement('table');
		tableau.width = "100%";
		tableau.innerHTML =  '<tr>'
								+'<th style="text-align:center;">'
									+'DO booster'
								+'</th>'
								+'<th style="text-align:center;">'
									+'DO boosteur'
								+'</th>'
								+'<th style="text-align:center;">'
									+'DO ressources'
								+'</th>'
							+'</tr>'
							+'<tr>'
								+'<td id="col1">'
								+'</td>'
								+'<td id="col2">'
								+'</td>'
								+'<td id="col3">'
								+'</td>'
							+'</tr>';
		
	document.getElementById('Content').appendChild(tableau);
	
}

var newButton = document.createElement('input');
	newButton.type='button';
	newButton.id='Start';
		if(Start==false){
			newButton.value = "Start";
		}else if(Start==true){
			newButton.value = "Stop";
		}
	newButton.onclick = function(){
		if(Start==true){
			GM_setValue('Start', false);
			location.reload() ; 
		} else {
			reset();
			GM_setValue('Start', true);
			location.reload() ; 
		}
	};
	
var newButton2 = document.createElement('input');
	newButton2.type='button';
	newButton2.id='Type';
		if(Type==false){
			newButton2.value = "1 fois";
		}else if(Type==true){
			newButton2.value = "En boucle";
		}
	newButton2.onclick = function(){
		if(Type==true){
			GM_setValue('Type', false);
			location.reload() ; 
		} else {
			GM_setValue('Type', true);
			location.reload() ; 
		}
	};
	
document.getElementById('col1').appendChild(newButton);
document.getElementById('col1').appendChild(newButton2);

var My_Div2 = document.createElement('div');
document.getElementById('col1').appendChild(My_Div2);

var My_text = document.createElement('div');
	My_text.innerHTML='Nom du joueur';

var Nom_du_joueur = document.createElement('input');
	Nom_du_joueur.type = "text";
	Nom_du_joueur.id='Nom_du_joueur';
	Nom_du_joueur.value=Joueur;
	Nom_du_joueur.style.width="150px";
	Nom_du_joueur.onkeyup = function(){GM_setValue('Joueur', this.value);}

My_Div2.appendChild(My_text);
My_Div2.appendChild(Nom_du_joueur);

var My_Div3 = document.createElement('div');
document.getElementById('col1').appendChild(My_Div3);

var My_text2 = document.createElement('div');
	My_text2.innerHTML='Nom de l\'unité :';

var Ma_Liste = document.createElement('select');
	Ma_Liste.style.width="160px";
	Ma_Liste.id='ListeElement';
	Ma_Liste.onchange=function(){
		GM_setValue('Unite', this.options[this.selectedIndex].value);
	}

var options=new Array();

for(var i =1 ; i< Unit_Name.length ; i++){
	options[i] = document.createElement('option');
	options[i].value = Unit_Name[i];
	options[i].innerHTML = Unit_Name[i];
	Ma_Liste.appendChild(options[i]);
}

options[Unite.getId()].selected="selected";

My_Div3.appendChild(My_text2);
My_Div3.appendChild(Ma_Liste);
}

function Acheter(pseudo, ressource, money){
	var URL ='http://game.desert-operations.fr/world1/handel.php?mode=1&username='+pseudo+'&username_partly=1&search_user=Chercher';
	if(URL!=window.location.href){ //sin on est pas sur la page du joueur
		window.location.href = URL; // on redirige
	}
	
	if(URL==window.location.href){
		
		var formulaire = document.getElementsByTagName('form'); // on recup tous les formulaire
		for(var i = 0; i<formulaire.length;i++){
			if(formulaire[i].className=='tradeBuyOffer' && formulaire[i].id!='countdownCount'){ // s'il correspond à une vente
			var Unite_en_vente = GetUnit(formulaire[i].firstChild.firstChild.innerHTML); // on récupère le nom de l'unité
									
				if(Unite_en_vente==ressource){ // si l'unité est celle désirée
				
					var prix_normal=Unites_Stats[ressource][0];
					var quantite = DelPoint(formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[0].title);
					var prix  = DelPoint(formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[1].title);
					var Taux_vendeur = prix/(quantite*prix_normal);
					Taux_vendeur = Taux_vendeur.toFixed(3);
					
					var Maxi = formulaire[i].getElementsByTagName('input')[2].max;
					formulaire[i].getElementsByTagName('input')[2].value = BuyMax(ressource, money, Maxi, Taux_vendeur);
	
					GM_setValue('Etat', 2);
					formulaire[i].firstChild.lastChild.firstChild.click(); // on clique pour HT
					alert('ok');
				}
			}
		
		}
	}
}

function GetValues(){
  var ObjListe = document.getElementById('tradeSaleResourceDropdown');
  var Rel = ObjListe.options[ObjListe.selectedIndex].getAttribute('rel');
  var tableau=Rel.split(",");

  var result = new Array();
  
  var taux_actuel = document.getElementsByClassName('block-head-information')[0].innerHTML;
	taux_actuel=parseInt(taux_actuel.replace(/[^0-9]/gi,''));
	taux_actuel=taux_actuel/10000;
	taux_actuel=taux_actuel.toFixed(3);
  
  result.push(parseInt(tableau[1].replace(/[^0-9]/gi,''))); 
  result.push(parseInt(tableau[0].replace(/[^0-9]/gi,''))); 
  result.push(taux_actuel);
  
  return result;
}

function Vendre(Nom_unite){
	var URL ='http://game.desert-operations.fr/world1/handel.php?mode=2';
	if(URL!=window.location.href){
		window.location.href = URL;
	}
	if(URL==window.location.href){
		var liste_unite = document.getElementById('weaponsGroup').getElementsByTagName('option');
	
		for (var i = 0 ; i < liste_unite.length ; i++){
			if(GetUnit(liste_unite[i].innerHTML)==Nom_unite){
				liste_unite[i].selected="selected";
				document.getElementById('tradeAllianceOnly').click();
		
				var tab_result = GetValues();
				var Maxi = tab_result[0]; // en num
				var PU = tab_result[1]; // en num 
				var Taux = tab_result[2]; // en num arrondi 0.897 par ex
				var total = Math.round(Maxi*Taux*PU); 
				total = new Big(total).str();
				
				document.getElementById('tradeOfferAmount').value=lisibilite_nombre(Maxi); // Qté max mise en page avec les .
				document.getElementById('ally_price_count').value=lisibilite_nombre(total); // prix avec mise en page
				document.getElementById('tradePublicPrice').value=lisibilite_nombre(total);
				document.getElementById('price_count').value=lisibilite_nombre(total);
				
				GM_setValue('Etat', 3);
				setTimeout(function(){document.getElementById('tradeSubmitOfferButton').click();}, ShortTime);
				setTimeout(function(){location.reload();}, LongTime);
			}
		}
		setTimeout(function(){location.reload();}, LongTime);
	}
}

function Recup_hors_banque(){
	var URL ='http://game.desert-operations.fr/world1/uebersicht.php';
	if(URL!=window.location.href){
		window.location.href = URL;
	}
	if(URL==window.location.href){
		var posi_argent = document.getElementById('resourcebar_money_label');
		var argent = DelPoint(posi_argent.getElementsByTagName('span')[0].title);
		GM_setValue('Money', argent);
		GM_setValue('Etat', 1);
		window.location.href = 'http://game.desert-operations.fr/world1/handel.php';
	}
}

function reset(){
	GM_setValue('Etat', 0);
}

function WaitForMoney(){
	var en_cours = false;
	var URL ='http://game.desert-operations.fr/world1/handel.php?mode=3';
	if(URL!=window.location.href){
		window.location.href = URL;
	}
	if(URL==window.location.href){
		var ligne = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		for (var i=1; i<ligne.length; i++){
			ligne[i].firstChild.firstChild.remove();
			var ressource = ligne[i].firstChild.innerHTML.replace("&nbsp;",'');
				if(ressource==Unite){
					en_cours = true;
				}
		}
		if (en_cours == true){
			setTimeout(function(){location.reload();}, LongTime);
		} else {
			if (Type==true){
				GM_setValue('Etat', 0);	
				setTimeout(function(){location.reload();}, ShortTime);
			} else {
				GM_setValue('Start', false);
				setTimeout(function(){location.reload();}, ShortTime);
			}
		}
	}
}

var Etat = GM_getValue('Etat', 0);
var Joueur = GM_getValue('Joueur', 'FEDEX22');
var Liste_push = Joueur.split(',');
var Unite = GM_getValue('Unite', 'F22 Raptor');
var Start = GM_getValue('Start', false);
var hors_banque = GM_getValue('Money',0);
var Type = GM_getValue('Type', false);
var ShortTime = Math.floor((Math.random()*2000)+3000);
var LongTime = Math.floor((Math.random()*90000)+90000);

if(window.location.href!='http://game.desert-operations.fr/world1/uebersicht.php'){
Add_affichage();
}

if (Start == true){
	if (Etat == 0){
		Recup_hors_banque();
	} else if (Etat == 1){
		var player = Liste_push[0].trim();
		Acheter(player, Unite, hors_banque);
	} else if (Etat == 2){
		Vendre(Unite);
	}  else if (Etat == 3){
		WaitForMoney();
	}
}
