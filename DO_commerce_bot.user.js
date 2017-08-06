// ==UserScript==
// @name           DO_commerce_Bot
// @author         Coni
// @description    Ajout d'un bot pour le commerce
// @include        http://game.desert-operations.fr/world*/*
// @version        4.61
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_commerce_bot.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_commerce_bot.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_commerce_bot.user.js
// @require		   https://sites.google.com/site/coni63do/plugin/fonctions.js
// @require		   https://sites.google.com/site/coni63do/plugin/unite.js
// @require		   https://sites.google.com/site/coni63do/plugin/bignumber.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==

function getDelay(Heure1, Heure2){

	var T1 = Heure1.split(':');
	var T2 = Heure2.split(':');
	var Debut = new Date();
		Debut.setHours(T1[0]);
		Debut.setMinutes(T1[1]);
		Debut.setSeconds(0);
	var Fin =  new Date();
		Fin.setHours(T2[0]);
		Fin.setMinutes(T2[1]);
		Fin.setSeconds(0);
	var now = new Date();
		now.getHours();
		now.getMinutes();
		now.getSeconds();
	//if (Debut<now){Debut.setDate(Debut.getDate()+1);}
	if (Fin<Debut){Fin.setDate(Fin.getDate()+1);}
	//if (Fin<now){Fin.setDate(Fin.getDate()+1);}
	
	var delay = Fin-now;
	
	if(now>Debut && now<Fin){
		setTimeout(function(){location.reload();}, delay);
		return true;
	} else {
		return false;
	}
}

function Control_Weather(){
	var current_weather = document.getElementById('weatherpanelInfo').firstChild.innerHTML.replace(/<\/?[^<]+>/g,'').trim();
	if(diams==true && (current_weather!='Ensoleillé' || current_weather!='sans nuage')){
		//GM_openInTab('http://game.desert-operations.fr/'+World+'/premium_cash.php?mode=cash&creditweather=1');
		//setTimeout(function(){location.reload();}, 2000);
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "Webservices/premium_cash.php",
		  data: "mode=cash&creditweather=1",
		  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
		  onload: function(response){
			  alert(response.responseText);
			  window.location.href = windows.location.href;
		  }
		});
	}
}

function BuyMax(PU, somme, maximum_dispo, taux){
	var factor = parseInt(parseFloat(document.getElementById('percent_HB').value)*100);
	var Qte_buyable = n(somme).multiply(factor).divide(taux).divide(PU);
	if(n(Qte_buyable).gte(maximum_dispo)){
		return lisibilite_nombre(maximum_dispo);
	} else{
		return lisibilite_nombre(Qte_buyable);
	}
}

function SwitchRadio(){
	var radios = document.getElementsByName('modeBoost');
		radios[1].disabled = true;
		radios[0].disabled = true;
		radios[2].disabled = true;
	document.getElementById('diamanter').disabled = true;
	document.getElementById('heure_debut').disabled = true;
	document.getElementById('heure_fin').disabled = true;
	document.getElementById('Type').disabled = true;
	document.getElementById('Nom_du_joueur').disabled = true;
	document.getElementById('percent_HB').disabled = true;
	document.getElementById('interne').disabled = true;
	document.getElementById('List_Unit').disabled = true;
	document.getElementById('Liste_ress').disabled = true;
	document.getElementById('Txt_mini').disabled = true;
	document.getElementById('Txt_maxi').disabled = true;
	document.getElementById('En_cours').disabled = true;
	document.getElementById('Reprendre').disabled = true;
}

function Do_actions(elemid){
var Type_action = elemid.replace(/[^A-Z]/gi,'');
var Num_action = elemid.replace(/[^0-9]/gi,''); // remplace tout sauf les chiffre
if (Type_action == 'SS'){
	var ValText = document.getElementById('Nom_du_joueur').value;
	var variable = 'Slot' + Num_action;
	GM_setValue(variable, ValText);
}
if (Type_action == 'LS'){
	var variable = 'Slot' + Num_action;
	var ValText = GM_getValue(variable, '');
	document.getElementById('Nom_du_joueur').value = ValText;
	GM_setValue('Joueur', ValText);
}
}

function infobulle(elemid){
	var Type_action = elemid.replace(/[^A-Z]/gi,'');
	var Num_action = elemid.replace(/[^0-9]/gi,'');
	if (Type_action == 'LS'){return GM_getValue('Slot' + Num_action, '');}
	if (Type_action == 'SS'){return '';}
}

function Create_save_btn(position, nb, Text, Text2, describe){
	var ligne = document.createElement('tr');
		ligne.innerHTML = '<td>'+describe+'</td>';
	document.getElementById('blabla').appendChild(ligne);	
	
	for (var i= 0 ;i<nb;i++){
		var colonne = document.createElement('td');
		ligne.appendChild(colonne);
		
		var span = document.createElement('span');
			span.className='tooltipExtention showTooltipDefault';
			span.title = infobulle(Text+i);
			span.data = infobulle(Text+i);
		
		colonne.appendChild(span);
		
		var newButton = document.createElement('input');
			newButton.type='button';
			newButton.id=Text+i;
			newButton.value = Text2+i;
			newButton.style.cssText = 'height:20px; font-size:10px; padding-top:0px;';
			newButton.onclick = function(){Do_actions(this.id);};
	
		span.appendChild(newButton);
	}
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
				GM_setValue('Etat', 0);
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
				window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=4';
			} else {
				GM_setValue('Start2', true);
				location.reload() ; 
			}
		};

	document.getElementById('col3').appendChild(newButton);
	document.getElementById('col3').appendChild(newButton2);
	document.getElementById('col3').appendChild(newButton3);	
		
	var Reprise = document.createElement('select');
		Reprise.id='En_cours';
		Reprise.style.display='none';
		Reprise.innerHTML = '<option value="0">Acheter</option><option value="2">Attente des unités</option><option value="3">Vendre</option><option value="4">Attente $</option>';

	document.getElementById('col3').appendChild(Reprise);
	
	var newButton4 = document.createElement('input');
		newButton4.type='button';
		newButton4.style.display='none';
		newButton4.id='Reprendre';
		newButton4.value = "Reprendre";
		newButton4.onclick = function(){
			var etat_temp = document.getElementById('En_cours').options[document.getElementById('En_cours').selectedIndex].value;
			GM_setValue('Start', true);
			GM_setValue('Etat', etat_temp);
			location.reload() ; 
		};
	document.getElementById('col3').appendChild(newButton4);
		
	var zone_LS = document.createElement('div');
		zone_LS.id='Load_save';
		zone_LS.innerHTML='<table id=blabla></table>';
		
	document.getElementById('col3').appendChild(zone_LS);
	
	Create_save_btn(zone_LS, 3, 'LS ', 'Slot ', 'Load :');
	Create_save_btn(zone_LS, 3, 'SS ', 'Slot ', 'Save :');
	
	var My_Taux= document.createElement('div');
		My_Taux.id='My_Taux';
		My_Taux.style.display='none';
	document.getElementById('col3').appendChild(My_Taux);

	var label_taux = document.createElement("Label");
		label_taux.setAttribute("for",'percent_HB');
		label_taux.innerHTML = "Pourcentage de hors-banque utilisé :";
	My_Taux.appendChild(label_taux);
	
	var percent_HB = document.createElement('input');
		percent_HB.type = "text";
		percent_HB.value = pourcentage_pris;
		percent_HB.id='percent_HB';
		percent_HB.size='4';
		percent_HB.onchange=function(){
			percent_HB.value=percent_HB.value.replace(',','.');
			GM_setValue('percent_HB', percent_HB.value);
		};
	My_Taux.appendChild(percent_HB);
	
	var label_taux2 = document.createElement("Label");
		label_taux2.setAttribute("for",'percent_HB');
		label_taux2.innerHTML = " % (max : 99.99%)";
	My_Taux.appendChild(label_taux2);
	
	var inter_alli= document.createElement('div');
		inter_alli.id='inter_alli';
		inter_alli.style.display='none';
	document.getElementById('col3').appendChild(inter_alli);

	var label_inter = document.createElement("Label");
		label_inter.setAttribute("for",'interne');
		label_inter.innerHTML = "Vente en interne ? :";
	inter_alli.appendChild(label_inter);
	
	var ChkBx_inter = document.createElement('input');
		ChkBx_inter.type = "checkbox";
		ChkBx_inter.id='interne';
		if (vente_interne==true){
			ChkBx_inter.checked=true;
		}
		ChkBx_inter.onclick=function(){
			if (vente_interne==true){
				GM_setValue('interne', false);
				ChkBx_inter.checked=false;
			} else {
				GM_setValue('interne', true);
				ChkBx_inter.checked=true;
			}
		}
	inter_alli.appendChild(ChkBx_inter);
	
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
		Nom_du_joueur.onchange = function(){GM_setValue('Joueur', this.value);}
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
			document.getElementById('My_convert1').innerHTML = ' ( '+Create_Aff(Txt_mini.value.replace(/[^0-9]/gi,''),0)+ ' )';
		}	
	My_Div4.appendChild(Txt_mini);

	var newlabel5 = document.createElement("Label");
		newlabel5.setAttribute("for",'Txt_mini');
		newlabel5.id='My_convert1';
		newlabel5.innerHTML = ' ( '+Create_Aff(Val_mini.replace(/[^0-9]/gi,''),0)+ ' )';
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
			document.getElementById('My_convert2').innerHTML = ' ( '+Create_Aff(Txt_maxi.value.replace(/[^0-9]/gi,''),0)+ ' )';
		}
	My_Div5.appendChild(Txt_maxi);
	
	var newlabel6 = document.createElement("Label");
		newlabel6.setAttribute("for",'Txt_maxi');
		newlabel6.id='My_convert2';
		newlabel6.innerHTML = ' ( '+Create_Aff(Val_maxi.replace(/[^0-9]/gi,''),0)+ ' )';
	My_Div5.appendChild(newlabel6);
	

}

function display(a){
	if (a == 1){		
		document.getElementById('Start').style.display='block';
		document.getElementById('Type').style.display='none';
		document.getElementById('Start2').style.display='none';
		document.getElementById('En_cours').style.display='none';
		document.getElementById('Reprendre').style.display='none';
		document.getElementById('Load_save').style.display='inline';
		document.getElementById('My_Taux').style.display='none';
		document.getElementById('inter_alli').style.display='none';
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
		document.getElementById('En_cours').style.display='inline';
		document.getElementById('Reprendre').style.display='inline';
		document.getElementById('Load_save').style.display='inline';
		document.getElementById('My_Taux').style.display='inline';
		document.getElementById('inter_alli').style.display='block';
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
		document.getElementById('En_cours').style.display='none';
		document.getElementById('Reprendre').style.display='none';
		document.getElementById('Load_save').style.display='none';
		document.getElementById('My_Taux').style.display='none';
		document.getElementById('inter_alli').style.display='none';
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
								+'<input type="radio" value="booster" name="modeBoost">Vous êtes boosté</input></br>'
								+'<input type="radio" value="ressources" name="modeBoost">Vous voulez des ressources</input>';

	document.getElementById('col1').appendChild(zone_radio);

	var zone_diams= document.createElement('div');
		zone_diams.id='zone_diams';
		zone_diams.style.display='block';
	document.getElementById('col1').appendChild(zone_diams);

	var label_diams = document.createElement("Label");
		label_diams.setAttribute("for",'diamanter');
		label_diams.innerHTML = "Changer la météo en diams? :";
	zone_diams.appendChild(label_diams);
	
	var ChkBx_diams = document.createElement('input');
		ChkBx_diams.type = "checkbox";
		ChkBx_diams.id='diamanter';
		if (diams==true){
			ChkBx_diams.checked=true;
		}
		ChkBx_diams.onclick=function(){
			if (diams==true){
				GM_setValue('diamants', false);
				ChkBx_diams.checked=false;
				alert('Cette fonctionnalité n\'est pas encore disponible');
			} else {
				GM_setValue('diamants', true);
				ChkBx_diams.checked=true;
				alert('Cette fonctionnalité n\'est pas encore disponible');
			}
		}
	zone_diams.appendChild(ChkBx_diams);
	
	var horaire = document.createElement('div');
		horaire.innerHTML = '<label for="heure_debut">Arrêt de : </label>'
							+'<input size="3" id="heure_debut" type="text"></input>'
							+'<label for="heure_fin"> à </label>'
							+'<input size="3" id="heure_fin" type="text"></input>';

	document.getElementById('col1').appendChild(horaire);
	
	document.getElementById('heure_debut').value = H1;
	document.getElementById('heure_fin').value = H2;
	document.getElementById('heure_debut').onchange = function(){GM_setValue('time_min',this.value);};
	document.getElementById('heure_fin').onchange = function(){GM_setValue('time_max',this.value);};
	
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
	var URL ='http://game.desert-operations.fr/'+World+'/handel.php?mode=1&username='+pseudo+'&username_partly=1&search_user=Chercher';
	if(URL!=window.location.href){ //si on est pas sur la page du joueur
		window.location.href = URL; // on redirige
	}
	
	if(URL==window.location.href){
		
		var formulaire = document.getElementsByTagName('form'); // on recup tous les formulaire
		for(var i = 0; i<formulaire.length;i++){
			if(formulaire[i].className=='tradeBuyOffer' && formulaire[i].id!='countdownCount'){ // s'il correspond à une vente
			var Unite_en_vente = GetUnit(formulaire[i].firstChild.firstChild.innerHTML); // on récupère le nom de l'unité
									
				if(Unite_en_vente==ressource){ // si l'unité est celle désirée
					var prix_normal=Unites_Stats[ressource][0];
					var quantite = formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[0].title.replace(/[^0-9]/gi,'');
					var prix  = formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[1].title.replace(/[^0-9]/gi,'');
					var Taux_vendeur = n(prix).multiply(10000).divide(prix_normal).divide(quantite);
					var Maxi = formulaire[i].getElementsByTagName('input')[2].max;
					
					formulaire[i].getElementsByTagName('input')[2].value = BuyMax(prix_normal, money, Maxi, Taux_vendeur);
	
					GM_setValue('Etat', 2);
					formulaire[i].firstChild.lastChild.firstChild.click(); // on clique pour HT
					alert('ok');
				}
			}
		}
		alert('Il n\'existe plus cette unité'); //si on a fait tous les formulaire sans succes
		GM_setValue('Start', false); // on stop
		setTimeout(function(){location.reload();}, ShortTime); //on recharge le plugin à 0^^
	}
}

function EvaluerPrix(nombre){
var Power = Math.floor(Math.log(nombre)/Math.LN10);
nombre = Math.round(nombre/Math.pow(10, Power-10));
return nombre *= Math.pow(10, Power-10);
}

function Vendre(Nom_unite){
	var URL ='http://game.desert-operations.fr/'+World+'/handel.php?mode=2';
	if(URL!=window.location.href){
		window.location.href = URL;
	}
	if(URL==window.location.href){
		var liste_unite = document.getElementById('weaponsGroup').getElementsByTagName('option');
	
		for (var i = 0 ; i < liste_unite.length ; i++){
			if(GetUnit(liste_unite[i].innerHTML)==Nom_unite){
				liste_unite[i].selected="selected";
				if(vente_interne==true){
					document.getElementById('tradeAllianceOnly').click();
				}
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
				
				GM_setValue('Etat', 4);
				setTimeout(function(){document.getElementById('tradeSubmitOfferButton').click();}, ShortTime);
				setTimeout(function(){location.reload();}, LongTime);
			}
		}
	}
}

function Recup_hors_banque(){
	/*var URL ='http://game.desert-operations.fr/'+World+'/uebersicht.php';
	if(URL!=window.location.href){
		window.location.href = URL;
	}
	if(URL==window.location.href){
		var argent = document.getElementById('resourcebar_money_label').getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
		GM_setValue('Money', argent);
		GM_setValue('Etat', 1);
		window.location.href = 'http://game.desert-operations.fr/'+World+'/handel.php';
	}*/
	GM_xmlhttpRequest({
    method: "GET",
    url: "Webservices/resourcebar.php?json=true",
    onload: function(xhr) {
		var data = xhr.responseText;
		var ress = JSON.parse(data);
		var money = ress[4].amount;
		GM_setValue('Money', money);
		GM_setValue('Etat', 1);
		window.location.href = 'http://game.desert-operations.fr/'+World+'/handel.php';
	}
	});
}

function WaitForMoney(){
	if(Type==false){
		GM_setValue('Start', false);
		setTimeout(function(){location.reload();}, ShortTime);
	}
	if(Type==true){
		var en_cours = false;
		var URL ='http://game.desert-operations.fr/'+World+'/handel.php?mode=3';
		if(URL!=window.location.href){
			window.location.href = URL;
		}
		if(URL==window.location.href){
			var ligne = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			for (var i=1; i<ligne.length; i++){
				var tree = ligne[i].childNodes;
				var noeud = tree[0].cloneNode(true);
					noeud.firstChild.remove();
				var ressource = noeud.textContent.trim();
					if(ressource==Unite){
						en_cours = true;
						var text_date = tree[4].firstChild.innerHTML;
						if(text_date !='-'){
							var end_time = new Date();
								end_time.setDate(text_date.substr(0,2));
								end_time.setMonth(text_date.substr(3,2));
								end_time.setHours(text_date.substr(9,2));
								end_time.setMinutes(text_date.substr(12,2));
								//end_time.setSeconds(59);
							var now = new Date();	
								now.getDate();
								now.setMonth(+now.getMonth()+1);
								now.getHours();
								now.getMinutes();
								//now.setSeconds(1);
							var delay = end_time-now;
							setTimeout(function(){location.reload();}, delay);
						} else {
							setTimeout(function(){location.reload();}, LongTime);
						}
					}
			}
			if(en_cours == false){
				GM_setValue('Etat', 0);	
				setTimeout(function(){location.reload();}, ShortTime);
			}
		}
	}
}

function WaitForUnit(){
	var en_cours = false;
	var URL ='http://game.desert-operations.fr/'+World+'/handel.php?mode=4';
	if(URL!=window.location.href){
		window.location.href = URL;
	}
	if(URL==window.location.href){
		var ligne = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		for (var i=1; i<ligne.length; i++){
			var tree = ligne[i].childNodes;
			var noeud = tree[0].cloneNode(true);
				noeud.firstChild.remove();
			var ressource = noeud.textContent.trim();
				if(ressource==Unite){
					en_cours = true;
					var text_date = tree[4].firstChild.innerHTML;
					var end_time = new Date();
						end_time.setDate(text_date.substr(0,2));
						end_time.setMonth(text_date.substr(3,2));
						end_time.setHours(text_date.substr(9,2));
						end_time.setMinutes(text_date.substr(12,2));
						//end_time.setSeconds(59);
					var now = new Date();	
						now.getDate();
						now.setMonth(+now.getMonth()+1);
						now.getHours();
						now.getMinutes();
						//now.setSeconds(1);
					var delay = end_time-now;
					setTimeout(function(){location.reload();}, delay);
				}
		}
		if (en_cours == false){
			GM_setValue('Etat', 3);	
			setTimeout(function(){location.reload();}, ShortTime);
		}
	}
}

function CliqueBuy(a,b,c, index){
	var restant = n(b).minus(c); //on retire la qté HT a ce que l'on veut en tout
	var val_temp = lisibilite_nombre(restant);
	GM_setValue('Val_maxi', val_temp); // on la save pour le prochain achat
	if (n(b).lte(a)){GM_setValue('Start', false);} // si le max vaut le min ou moins on stop le plugin
	GM_setValue('Timer' , false);
	var formulaire_temp = document.getElementsByTagName('form');
	formulaire_temp[index].firstChild.lastChild.firstChild.click(); // on clique pour HT
	alert('ok');
}

function Buy(produit, min, max){
	
	var URL ='http://game.desert-operations.fr/'+World+'/handel.php?mode=1&object_id='+produit+'&goods_partly=1&search_goods=Chercher';
	if(URL!=window.location.href){ //sin on est pas sur la page du joueur
		window.location.href = URL; // on redirige
	}
	if(URL==window.location.href){
		var min = min.replace(/[^0-9]/gi,'');
		var max = max.replace(/[^0-9]/gi,'');
		var formulaire = document.getElementsByTagName('form'); // on recup tous les formulaire
		for(var i = 0; i<formulaire.length;i++){
			if(formulaire[i].className=='tradeBuyOffer' && formulaire[i].id!='countdownCount'){ // s'il correspond à une vente
				var Qte=formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[0].title.replace(/[^0-9]/gi,'');
					if(n(Qte).gte(min) && n(Qte).lte(max) && formulaire[i].getElementsByClassName('formColumn column20 ltr alignCenter')[0]== null){ // si on est dans les bonnes qté et pas en lot
						CliqueBuy(min, max, Qte, i);
					}
					if(n(Qte).gte(min) && formulaire[i].getElementsByClassName('formColumn column20 ltr alignCenter')[0]!= null){ // si supérieur au min et en lot
						var max_possible = formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].max.replace(/[^0-9]/gi,'');
							if(n(max).gte(max_possible)){
								var temp2 = max_possible;
							}else{ 
								var temp2 = max;
							}
						formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].value = lisibilite_nombre(temp2);
						CliqueBuy(min, max, temp2, i);
					}
			}
		}
		setTimeout(function(){location.reload();}, LongTime);
	}
}

function BuyTo(Nom_unite){
	var formulaire = document.getElementsByTagName('form'); // on recup tous les formulaire
		for(var i = 0; i<formulaire.length;i++){
			if(formulaire[i].className=='tradeBuyOffer' && formulaire[i].id!='countdownCount'){ // s'il correspond à une vente
			var Unite_en_vente = GetUnit(formulaire[i].firstChild.firstChild.innerHTML); // on récupère le nom de l'unité
				if(Unite_en_vente==Nom_unite){ // si l'unité est celle désirée
					if (formulaire[i].getElementsByClassName('formColumn column20 ltr alignCenter')[0]== null){
						GM_setValue('Timer2', false);
						formulaire[i].firstChild.lastChild.firstChild.click(); // on clique pour HT
						alert('ok');
					} else {
						formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].value = formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].max;
						GM_setValue('Timer2', false);
						formulaire[i].firstChild.lastChild.firstChild.click(); // on clique pour HT
						alert('ok');
					}
				}
			}
		
		}
	GM_setValue('Timer2', false);
	location.reload(); // on actualise pour reset le plugin
}

var World = window.location.pathname.split('/')[1];
var Path = window.location.pathname.split('/')[2];
var Search = window.location.search;
var Etat = GM_getValue('Etat', 0); // etat du booster
var Joueur = GM_getValue('Joueur', 'FEDEX22');
var Mode = GM_getValue('Mode', 'boosteur');// boosteur ou boosté
var Liste_push = Joueur.split(',');
var Unite = GM_getValue('Unite', 'F22 Raptor');
var Start = GM_getValue('Start', false);
var Start2 = GM_getValue('Start2', false);
var hors_banque = GM_getValue('Money','0');
var Type = GM_getValue('Type', false); 	// en boucle ou 1 fois
var Numero = GM_getValue('Numero', 0); 	// num du joueur à pusher
var ShortTime = Math.floor((Math.random()*2000)+3000);
var MidTime = Math.floor((Math.random()*30000)+30000); // entre 30s et 1min
var LongTime = Math.floor((Math.random()*90000)+90000);
var Val_maxi = GM_getValue('Val_maxi', '10.000.000.000.000.000.000');
var Val_mini = GM_getValue('Val_mini', '1.000.000.000.000.000.000');
var ressource = GM_getValue('Ress', 'r_3');
var Timer = GM_getValue('Timer', false);
var Timer2 = GM_getValue('Timer2', false);
var pourcentage_pris = GM_getValue('percent_HB', 99.90);
var vente_interne = GM_getValue('interne', true);
var diams = GM_getValue('diamants', false);
var H1 = GM_getValue('time_min','02:40');
var H2 = GM_getValue('time_max','07:00');


if (Search != '?show=accessdenied'){
	var suspens = getDelay(H1, H2);

	if(Path=='handel.php'){
	Add_affichage();
	}

	if(suspens==false){
		if (Mode == 'booster' && Start == true){
			if(Path=='handel.php'){
				SwitchRadio();
			}
			if (Etat == 0){
				Recup_hors_banque();
			} else if (Etat == 1){
				var player = Liste_push[0].trim();
				Acheter(player, Unite, hors_banque);
			} else if (Etat == 2){
				WaitForUnit();
			} else if (Etat == 3){	
				Vendre(Unite);
			} else if (Etat == 4){
				WaitForMoney();
			}
		}
		if (Mode == 'boosteur' && Start == true ){
			if(Path!='handel.php'){
				GM_setValue('Timer2', false);
				window.location.href='http://game.desert-operations.fr/'+World+'/handel.php';
			}
			SwitchRadio();
			if (Timer2 == true){
				BuyTo(Unite);
			} else {
				setTimeout(function(){
					GM_setValue('Timer2', true);
					var suivant = (Numero+1) % Liste_push.length; // on prévoit le nom du prochian joueur
					GM_setValue('Numero', suivant); // on save le faite que l'on a HT pour passer au suivant
					var player = Liste_push[suivant].trim();
					window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=1&username='+player+'&username_partly=1&search_user=Chercher';
				} , MidTime);
			}
		}
		if (Mode == 'ressources' && Start2 == true){
			if(Path!='handel.php'){
				window.location.href='http://game.desert-operations.fr/'+World+'/handel.php';
			}	
			SwitchRadio();
			if (Timer == true){
				Buy(ressource, Val_mini, Val_maxi);
			} else {
				setTimeout(function(){
					GM_setValue('Timer', true);
					window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=1&object_id='+ressource+'&goods_partly=1&search_goods=Chercher';
				} , MidTime);
			}
		}
	} else {
		if(Path=='handel.php'){
			document.getElementById('Start').value = "Suspendu";
		}
	}
}
