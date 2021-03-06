﻿// ==UserScript==
// @name           DO_commerce_Bot
// @author         Coni
// @description    Ajout d'un bot pour le commerce
// @include        http://game.desert-operations.fr/world1/uebersicht.php
// @include        http://game.desert-operations.fr/world1/handel.php*
// @version        4.00
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_commerce_bot.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_commerce_bot.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_commerce_bot.user.js
// @require		   https://sites.google.com/site/coni63do/plugin/fonctions.js
// @require		   https://sites.google.com/site/coni63do/plugin/unite.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==
 
function BuyMax(unite, somme, maximum_dispo, taux){
	var Qte_buyable = somme/(Unites_Stats[unite][0] * taux);
	var Qte = Math.min(Tronque(Qte_buyable, 5), maximum_dispo);
	return lisibilite_nombre(new Big(Qte).str());
}

function SwitchRadio(){
	var radios = document.getElementsByName('modeBoost');
		radios[1].disabled = true;
		radios[0].disabled = true;
		radios[2].disabled = true;
	document.getElementById('Type').disabled = true;
	document.getElementById('Nom_du_joueur').disabled = true;
	document.getElementById('List_Unit').disabled = true;
	document.getElementById('Liste_ress').disabled = true;
	document.getElementById('Txt_mini').disabled = true;
	document.getElementById('Txt_maxi').disabled = true;
}

function CreationElem(){
	
	var newButton = document.createElement('input');
		newButton.type='button';
		newButton.style.display='none';
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
		newButton2.style.display='none';
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
		
	var newButton3 = document.createElement('input');
		newButton3.type='button';
		newButton3.style.display='none';
		newButton3.id='Start2';
			if(Start2==false){
				newButton3.value = "Start";
			}else if(Start2==true){
				newButton3.value = "Stop";
			}
		newButton3.onclick = function(){
			if(Start2==true){
				GM_setValue('Start2', false);
				GM_setValue('Timer', true);
				window.location.href='http://game.desert-operations.fr/world1/handel.php?mode=4';
			} else {
				GM_setValue('Start2', true);
				location.reload() ; 
			}
		};

	document.getElementById('col3').appendChild(newButton);
	document.getElementById('col3').appendChild(newButton2);
	document.getElementById('col3').appendChild(newButton3);
	
	var My_Div2 = document.createElement('div');
		My_Div2.id='Liste_Nom';
		My_Div2.style.display='none';
	document.getElementById('col3').appendChild(My_Div2);

	var newlabel = document.createElement("Label");
		newlabel.setAttribute("for",'Nom_du_joueur');
		newlabel.innerHTML = "Nom du joueur :";
	My_Div2.appendChild(newlabel);

	var Nom_du_joueur = document.createElement('input');
		Nom_du_joueur.type = "text";
		Nom_du_joueur.id='Nom_du_joueur';
		Nom_du_joueur.value=Joueur;
		Nom_du_joueur.style.width="150px";
		Nom_du_joueur.onkeyup = function(){GM_setValue('Joueur', this.value);}
	My_Div2.appendChild(Nom_du_joueur);

	var My_Div3 = document.createElement('div');
		My_Div3.id = 'Liste_des_Unite';
		My_Div3.style.display='none';
	document.getElementById('col3').appendChild(My_Div3);

	var newlabel2 = document.createElement("Label");
		newlabel2.setAttribute("for",'List_Unit');
		newlabel2.innerHTML = "Nom de l\'unité :";
	My_Div3.appendChild(newlabel2);
		
	var List_Unit = document.createElement('select');
		List_Unit.style.width="160px";
		List_Unit.id='List_Unit';
		List_Unit.onchange=function(){
			GM_setValue('Unite', this.options[this.selectedIndex].value);
		}

	var options=new Array();

	for(var i =1 ; i< Unit_Name.length ; i++){
		options[i] = document.createElement('option');
		options[i].value = Unit_Name[i];
		options[i].innerHTML = Unit_Name[i];
		List_Unit.appendChild(options[i]);
	}
	options[Unite.getId()].selected="selected";
	My_Div3.appendChild(List_Unit);

	var List_Ress = document.createElement('select');
		List_Ress.id='Liste_ress';
		List_Ress.style.display='none';
		List_Ress.innerHTML = '<option value="r_3">Pétrole</option><option value="r_4">Munition</option><option value="r_2">Or</option>';
		List_Ress.onchange=function(){
			var temp = document.getElementById('Liste_ress').options[document.getElementById('Liste_ress').selectedIndex].value;
			GM_setValue('Ress', temp);
		}
	document.getElementById('col3').appendChild(List_Ress);
	
	var list_opt=List_Ress.getElementsByTagName('option');
		for (var i=0;i<list_opt.length;i++){
			if (list_opt[i].value == ressource){list_opt[i].selected="selected";}
		}

	var My_Div4 = document.createElement('div');
		My_Div4.id='Ress_mini'
		My_Div4.style.display='none';
	document.getElementById('col3').appendChild(My_Div4);

	var newlabel3 = document.createElement("Label");
		newlabel3.setAttribute("for",'Txt_mini');
		newlabel3.innerHTML = "Qte Mini :";
	My_Div4.appendChild(newlabel3);
		
	var Txt_mini = document.createElement('input');
		Txt_mini.type = "text";
		Txt_mini.id='Txt_mini';
		Txt_mini.value=Val_mini;
		Txt_mini.onkeyup = function(){
			Txt_mini.value=lisibilite_nombre(Txt_mini.value.replace(/[^0-9]/gi,''));
			GM_setValue('Val_mini', this.value);
			document.getElementById('My_convert1').innerHTML = ' ( '+Convert(parseInt(Txt_mini.value.replace(/[^0-9]/gi,'')))+ ' )';
		}	
	My_Div4.appendChild(Txt_mini);

	var newlabel5 = document.createElement("Label");
		newlabel5.setAttribute("for",'Txt_mini');
		newlabel5.id='My_convert1';
		newlabel5.innerHTML = ' ( '+Convert(parseInt(Val_mini.replace(/[^0-9]/gi,'')))+ ' )';
	My_Div4.appendChild(newlabel5);

	var My_Div5 = document.createElement('div');
		My_Div5.id='Ress_maxi'
		My_Div5.style.display='none';
	document.getElementById('col3').appendChild(My_Div5);
	
	var newlabel4 = document.createElement("Label");
		newlabel4.setAttribute("for",'Txt_maxi');
		newlabel4.innerHTML = "Qte Maxi :";
	My_Div5.appendChild(newlabel4);
		
	var Txt_maxi = document.createElement('input');
		Txt_maxi.type = "text";
		Txt_maxi.id='Txt_maxi';
		Txt_maxi.value=Val_maxi;
		Txt_maxi.onkeyup = function(){
			Txt_maxi.value=lisibilite_nombre(Txt_maxi.value.replace(/[^0-9]/gi,''));
			GM_setValue('Val_maxi', this.value);
			document.getElementById('My_convert2').innerHTML = ' ( '+Convert(parseInt(Txt_maxi.value.replace(/[^0-9]/gi,'')))+ ' )';
		}
	My_Div5.appendChild(Txt_maxi);
	
	var newlabel6 = document.createElement("Label");
		newlabel6.setAttribute("for",'Txt_maxi');
		newlabel6.id='My_convert2';
		newlabel6.innerHTML = ' ( '+Convert(parseInt(Val_maxi.replace(/[^0-9]/gi,'')))+ ' )';
	My_Div5.appendChild(newlabel6);
	

}

function display(a){
	if (a == 1){		
		document.getElementById('Start').style.display='block';
		document.getElementById('Type').style.display='none';
		document.getElementById('Start2').style.display='none';
		document.getElementById('Liste_Nom').style.display='block';
		document.getElementById('Liste_des_Unite').style.display='block';
		document.getElementById('Liste_ress').style.display='none';
		document.getElementById('Ress_mini').style.display='none';
		document.getElementById('Ress_maxi').style.display='none';	
	}	
	if (a == 2){
		document.getElementById('Start').style.display='inline';
		document.getElementById('Type').style.display='inline';
		document.getElementById('Start2').style.display='none';
		document.getElementById('Liste_Nom').style.display='block';
		document.getElementById('Liste_des_Unite').style.display='block';
		document.getElementById('Liste_ress').style.display='none';
		document.getElementById('Ress_mini').style.display='none';
		document.getElementById('Ress_maxi').style.display='none';	
	}
	if (a == 3){
		document.getElementById('Start').style.display='none';
		document.getElementById('Type').style.display='none';
		document.getElementById('Start2').style.display='inline';
		document.getElementById('Liste_Nom').style.display='none';
		document.getElementById('Liste_des_Unite').style.display='none';
		document.getElementById('Liste_ress').style.display='inline';
		document.getElementById('Ress_mini').style.display='block';
		document.getElementById('Ress_maxi').style.display='block';
	}
}

function Add_affichage(){

	var My_Div = document.createElement('div');
		My_Div.id='Content';
	document.getElementsByClassName('blockFoot')[0].appendChild(My_Div);

	var tableau  = document.createElement('table');
		tableau.width = "100%";
		tableau.innerHTML = '<tr>'
								+'<td id="col1">'
								+'</td>'
								+'<td id="col3">'
								+'</td>'
							+'</tr>';
			
	document.getElementById('Content').appendChild(tableau);

	var zone_radio = document.createElement('div');
		zone_radio.innerHTML = 	'<input type="radio" value="boosteur" name="modeBoost">Vous êtes boosteur</input></br>'
								+'<input type="radio" value="booster" name="modeBoost">Vous êtes boosté (s\'pèce de pauvre :))</input></br>'
								+'<input type="radio" value="ressources" name="modeBoost">Vous voulez des ressources</input>';

	document.getElementById('col1').appendChild(zone_radio);	
		
	CreationElem();
		
var radios = document.getElementsByName('modeBoost');
	if (radios[0].value==Mode){
		radios[0].checked = true;
		display(1);
	}else if (radios[1].value==Mode){
		radios[1].checked = true;
		display(2);
	}else if (radios[2].value==Mode){
		radios[2].checked = true;
		display(3);
	}
	
	radios[0].onclick=function(){
		GM_setValue('Mode', 'boosteur');
		display(1);
	};
	radios[1].onclick=function(){
		GM_setValue('Mode', 'booster');
		display(2);	
	};
	radios[2].onclick=function(){
		GM_setValue('Mode', 'ressources');
		display(3);
	};
					
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

function CliqueBuy(a,b,c, index){
	b-=c; //on retire la qté HT a ce que l'on veut en tout
	var val_temp = lisibilite_nombre(new Big(b).str());
	GM_setValue('Val_maxi', val_temp); // on la save pour le prochain achat
	if ( b<=a){GM_setValue('Start', false);} // si le max vaut le min ou moins on stop le plugin
	GM_setValue('Timer' , false);
	var formulaire_temp = document.getElementsByTagName('form');
	formulaire_temp[index].firstChild.lastChild.firstChild.click(); // on clique pour HT
	alert('ok');
}

function Buy(produit, min, max){
	
	var URL ='http://game.desert-operations.fr/world1/handel.php?mode=1&object_id='+produit+'&goods_partly=1&search_goods=Chercher';
	if(URL!=window.location.href){ //sin on est pas sur la page du joueur
		window.location.href = URL; // on redirige
	}
	if(URL==window.location.href){
		var min = parseInt(min.replace(/[^0-9]/gi,''));
		var max = parseInt(max.replace(/[^0-9]/gi,''));
		var formulaire = document.getElementsByTagName('form'); // on recup tous les formulaire
		for(var i = 0; i<formulaire.length;i++){
			if(formulaire[i].className=='tradeBuyOffer' && formulaire[i].id!='countdownCount'){ // s'il correspond à une vente
				var Qte=formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[0].title;
				var Qte = parseInt(Qte.replace(/[^0-9]/gi,''));
					if(Qte>=min && Qte<=max && formulaire[i].getElementsByClassName('formColumn column20 ltr alignCenter')[0]== null){ // si on est dans les bonnes qté et pas en lot
						CliqueBuy(min, max, Qte, i);
					}
					if(Qte>=min && formulaire[i].getElementsByClassName('formColumn column20 ltr alignCenter')[0]!= null){ // si supérieur au min et en lot
						var max_possible = parseInt(formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].max.replace(/[^0-9]/gi,''));
							if(Math.min(max_possible , max)==max_possible){
								var temp2 = formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].max;
								var temp2num = max_possible;
							}else{ 
								var temp2 =lisibilite_nombre(max);
								var temp2num = max;
							}
						formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].value = temp2;
						CliqueBuy(min, max, temp2num, i);
					}
			}
		}
		setTimeout(function(){location.reload();}, LongTime);
	}
}

function BuyTo(pseudo, Nom_unite){
	
	var URL ='http://game.desert-operations.fr/world1/handel.php?mode=1&username='+pseudo+'&username_partly=1&search_user=Chercher';
	if(URL!=window.location.href){ //sin on est pas sur la page du joueur
		window.location.href = URL; // on redirige
	}
	if(URL==window.location.href){
		var suivant = (Numero+1) % Liste_push.length; // on prévoit le nom du prochian joueur

		var formulaire = document.getElementsByTagName('form'); // on recup tous les formulaire
		for(var i = 0; i<formulaire.length;i++){
			if(formulaire[i].className=='tradeBuyOffer' && formulaire[i].id!='countdownCount'){ // s'il correspond à une vente
			var Unite_en_vente = GetUnit(formulaire[i].firstChild.firstChild.innerHTML); // on récupère le nom de l'unité
				if(Unite_en_vente==Nom_unite){ // si l'unité est celle désirée
					//formulaire[i].getElementsByTagName('input')[2].value = formulaire[i].getElementsByTagName('input')[2].max;
					GM_setValue('Numero', suivant); // on save le faite que l'on a HT pour passer au suivant
					formulaire[i].firstChild.lastChild.firstChild.click(); // on clique pour HT
					alert('ok');
				}
			}
		
		}
		GM_setValue('Numero', suivant); // s'il ne vend rien que l'on veut on passe au suivant 
		location.reload(); // on actualise pour reset le plugin
	}
}

var Etat = GM_getValue('Etat', 0); // etat du booster
var Joueur = GM_getValue('Joueur', 'FEDEX22');
var Mode = GM_getValue('Mode', 'boosteur');// boosteur ou boosté
var Liste_push = Joueur.split(',');
var Unite = GM_getValue('Unite', 'F22 Raptor');
var Start = GM_getValue('Start', false);
var Start2 = GM_getValue('Start2', false);
var hors_banque = GM_getValue('Money',0);
var Type = GM_getValue('Type', false); 	// en boucle ou 1 fois
var Numero = GM_getValue('Numero', 0); 	// num du joueur à pusher
var ShortTime = Math.floor((Math.random()*2000)+3000);
var MidTime = Math.floor((Math.random()*30000)+30000); // entre 30s et 1min
var LongTime = Math.floor((Math.random()*90000)+90000);
var Val_maxi = GM_getValue('Val_maxi', '10.000.000.000.000.000.000');
var Val_mini = GM_getValue('Val_mini', '1.000.000.000.000.000.000');
var ressource = GM_getValue('Ress', 'r_3');
var Timer = GM_getValue('Timer', false);

if(window.location.href!='http://game.desert-operations.fr/world1/uebersicht.php'){
Add_affichage();
}

if (Mode == 'booster' && Start == true){
	if(window.location.href!='http://game.desert-operations.fr/world1/uebersicht.php'){
		SwitchRadio();
	}
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
if (Mode == 'boosteur' && Start == true ){
	SwitchRadio();
	var player = Liste_push[Numero].trim();
	setTimeout(function(){BuyTo(player, Unite);}, MidTime);
}
if (Mode == 'ressources' && Start2 == true){
	SwitchRadio();
	if (Timer == true){
		Buy(ressource, Val_mini, Val_maxi);
	} else {
		setTimeout(function(){
			GM_setValue('Timer', true);
			window.location.href='http://game.desert-operations.fr/world1/handel.php?mode=1&object_id='+ressource+'&goods_partly=1&search_goods=Chercher';
		} , MidTime);
	}
}
