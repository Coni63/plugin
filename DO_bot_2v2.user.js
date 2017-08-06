// ==UserScript==
// @name           DO_bot_2
// @author         Coni
// @description    Ajout d'un bot pour le commerce
// @include        http://game.desert-operations.fr/world*/*
// @version        1.00
// @updateURL		https://sites.google.com/site/userconiscript/plugin/DO_bot_2.user.js
// @downloadURL		https://sites.google.com/site/userconiscript/plugin/DO_bot_2.user.js
// @installURL		https://sites.google.com/site/userconiscript/plugin/DO_bot_2.user.js
// @require		   https://sites.google.com/site/userconiscript/plugin/fonctions.js
// @require		   https://sites.google.com/site/userconiscript/plugin/unite.js
// @require		   https://sites.google.com/site/userconiscript/plugin/bignumber.js
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

function AddEventRadio(){
	
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
	
	document.getElementById('LS 0').onclick = function(){Do_actions(this.id);};
	document.getElementById('LS 1').onclick = function(){Do_actions(this.id);};
	document.getElementById('LS 2').onclick = function(){Do_actions(this.id);};
	document.getElementById('SS 0').onclick = function(){Do_actions(this.id);};
	document.getElementById('SS 1').onclick = function(){Do_actions(this.id);};
	document.getElementById('SS 2').onclick = function(){Do_actions(this.id);};
	
	document.getElementById('LS 0').title = GM_getValue('Slot0', '');
	document.getElementById('LS 1').title = GM_getValue('Slot1', '');
	document.getElementById('LS 2').title = GM_getValue('Slot2', '');
	document.getElementById('SS 0').title = '';
	document.getElementById('SS 1').title = '';
	document.getElementById('SS 2').title = '';
}

function display(a){
	if (a == 1){
		document.getElementById('col3').innerHTML='';
		var Str1= document.createElement('div');
			Str1.innerHTML = '<input id="Start" type="button" value="Start" />'
							+'<table>'
								+'<tr>'
									+'<td>Load :</td>'
									+'<td><input id="LS 0" type="button" value="Slot 0" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
									+'<td><input id="LS 1" type="button" value="Slot 1" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
									+'<td><input id="LS 2" type="button" value="Slot 2" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
								+'</tr>'
								+'<tr>'
									+'<td>Save :</td>'
									+'<td><input id="SS 0" type="button" value="Slot 0" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
									+'<td><input id="SS 1" type="button" value="Slot 1" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
									+'<td><input id="SS 2" type="button" value="Slot 2" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
								+'</tr>'
							+'</table>'
							+'<label for="Nom_du_joueur">Nom du joueur :</label><input style="width: 150px;" id="Nom_du_joueur" type="text"></br>'
							+'<label for="List_Unit">Nom de l\'unité :</label><select id="List_Unit" style="width: 160px;"><option value="Fantassin">Fantassin</option><option value="Paras">Paras</option><option value="Antichar">Antichar</option><option value="Commando de marine">Commando de marine</option><option value="AMX-13 DCA">AMX-13 DCA</option><option value="AMX-30">AMX-30</option><option value="Destructeur de mines">Destructeur de mines</option><option value="Artillerie automotrice PzH2000">Artillerie automotrice PzH2000</option><option value="Lance-missile mobile">Lance-missile mobile</option><option value="M1A2 Abrams">M1A2 Abrams</option><option value="MBT 3000">MBT 3000</option><option value="T-90">T-90</option><option value="Leclerc 2">Leclerc 2</option><option value="Leopard 3">Leopard 3</option><option value="T-95 Black Eagle">T-95 Black Eagle</option><option value="AH-64 Apache">AH-64 Apache</option><option value="Mil MI-28 Havoc">Mil MI-28 Havoc</option><option value="Mil MI-24 Hind">Mil MI-24 Hind</option><option value="Eurocopter Tigre">Eurocopter Tigre</option><option value="Eurofighter Typhoon">Eurofighter Typhoon</option><option value="F22 Raptor">F22 Raptor</option><option value="J16 &quot;Red Eagle&quot;">J16 "Red Eagle"</option><option value="A-10 Thunderbolt">A-10 Thunderbolt</option><option value="F117A Nighthawk">F117A Nighthawk</option><option value="Rockwell B1">Rockwell B1</option><option value="Northrop B2 Spirit">Northrop B2 Spirit</option><option value="Embraer EMB 314 Super Tucano">Embraer EMB 314 Super Tucano</option><option value="Grey Ghost">Grey Ghost</option><option value="B-52 Stratofortress">B-52 Stratofortress</option><option value="Corvette K130">Corvette K130</option><option value="Destroyer Type 333">Destroyer Type 333</option><option value="Frégate de 2nd rang">Frégate de 2nd rang</option><option value="Houbei Class Missile Boat">Houbei Class Missile Boat</option><option value="Sous-marin d\'attaque">Sous-marin d\'attaque</option><option value="Sous-marin lanceur d\'engins">Sous-marin lanceur d\'engins</option><option value="Porte-avions nucléaire">Porte-avions nucléaire</option><option value="Porte-avions Charles de Gaulle">Porte-avions Charles de Gaulle</option><option value="Frégate de 1er rang">Frégate de 1er rang</option><option value="Croiseur IOWA Classe B">Croiseur IOWA Classe B</option><option value="Champ de barbelés">Champ de barbelés</option><option value="Bunker">Bunker</option><option value="Champ de mines">Champ de mines</option><option value="Mines sous-marines">Mines sous-marines</option><option value="Batterie de DCA">Batterie de DCA</option><option value="Batterie de Patriots">Batterie de Patriots</option><option value="Batterie côtière">Batterie côtière</option></select></br>';
		
			document.getElementById('col3').appendChild(Str1);
			
		if(Start==false){
			document.getElementById('Start').value = "Start";
		}else if(Start==true){
			document.getElementById('Start').value = "Stop";
		}
		
		document.getElementById('Start').onclick = function(){
			if(Start==true){
				GM_setValue('Start', false);
				location.reload() ; 
			} else {
				GM_setValue('Start', true);
				location.reload() ; 
			}
		};
		
		document.getElementById('Nom_du_joueur').value=Joueur;
		
		document.getElementById('Nom_du_joueur').onchange = function(){GM_setValue('Joueur', this.value);}
		
		document.getElementById('List_Unit').onchange=function(){
			GM_setValue('Unite', this.options[this.selectedIndex].index);
		}
		
		document.getElementById('List_Unit').options[Unite].selected="selected";
		
	}	
	if (a == 2){
		document.getElementById('col3').innerHTML='';
		var Str2= document.createElement('div');
			Str2.innerHTML = '<input id="Start" type="button" value="Start" />'
							+'<input id="Type" type="button" value="1 fois"/>'
							+'<select id="En_cours">'
								+'<option value="0">Acheter</option>'
								+'<option value="2">Attente des unités</option>'
								+'<option value="3">Vendre</option>'
								+'<option value="4">Attente $</option>'
							+'</select>'
							+'<input id="Reprendre" type="button" value="Reprendre" />'
							+'<table>'
								+'<tr>'
									+'<td>Load :</td>'
									+'<td><input id="LS 0" type="button" value="Slot 0" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
									+'<td><input id="LS 1" type="button" value="Slot 1" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
									+'<td><input id="LS 2" type="button" value="Slot 2" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
								+'</tr>'
								+'<tr>'
									+'<td>Save :</td>'
									+'<td><input id="SS 0" type="button" value="Slot 0" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
									+'<td><input id="SS 1" type="button" value="Slot 1" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
									+'<td><input id="SS 2" type="button" value="Slot 2" style="height: 20px; font-size: 10px; padding-top: 0px;" /></td>'
								+'</tr>'
							+'</table>'
							+'<label for="percent_HB">Pourcentage de hors-banque utilisé :</label><input size="4" id="percent_HB" type="text" title="max : 99.99%"><label for="percent_HB"> %</label></br>'
							+'<label for="interne">Vente en interne ? :</label><input id="interne" type="checkbox"/></br>'
							+'<label for="Nom_du_joueur">Nom du joueur :</label><input style="width: 150px;" id="Nom_du_joueur" type="text"></br>'
							+'<label for="List_Unit">Nom de l\'unité :</label><select id="List_Unit" style="width: 160px;"><option value="Fantassin">Fantassin</option><option value="Paras">Paras</option><option value="Antichar">Antichar</option><option value="Commando de marine">Commando de marine</option><option value="AMX-13 DCA">AMX-13 DCA</option><option value="AMX-30">AMX-30</option><option value="Destructeur de mines">Destructeur de mines</option><option value="Artillerie automotrice PzH2000">Artillerie automotrice PzH2000</option><option value="Lance-missile mobile">Lance-missile mobile</option><option value="M1A2 Abrams">M1A2 Abrams</option><option value="MBT 3000">MBT 3000</option><option value="T-90">T-90</option><option value="Leclerc 2">Leclerc 2</option><option value="Leopard 3">Leopard 3</option><option value="T-95 Black Eagle">T-95 Black Eagle</option><option value="AH-64 Apache">AH-64 Apache</option><option value="Mil MI-28 Havoc">Mil MI-28 Havoc</option><option value="Mil MI-24 Hind">Mil MI-24 Hind</option><option value="Eurocopter Tigre">Eurocopter Tigre</option><option value="Eurofighter Typhoon">Eurofighter Typhoon</option><option value="F22 Raptor">F22 Raptor</option><option value="J16 &quot;Red Eagle&quot;">J16 "Red Eagle"</option><option value="A-10 Thunderbolt">A-10 Thunderbolt</option><option value="F117A Nighthawk">F117A Nighthawk</option><option value="Rockwell B1">Rockwell B1</option><option value="Northrop B2 Spirit">Northrop B2 Spirit</option><option value="Embraer EMB 314 Super Tucano">Embraer EMB 314 Super Tucano</option><option value="Grey Ghost">Grey Ghost</option><option value="B-52 Stratofortress">B-52 Stratofortress</option><option value="Corvette K130">Corvette K130</option><option value="Destroyer Type 333">Destroyer Type 333</option><option value="Frégate de 2nd rang">Frégate de 2nd rang</option><option value="Houbei Class Missile Boat">Houbei Class Missile Boat</option><option value="Sous-marin d\'attaque">Sous-marin d\'attaque</option><option value="Sous-marin lanceur d\'engins">Sous-marin lanceur d\'engins</option><option value="Porte-avions nucléaire">Porte-avions nucléaire</option><option value="Porte-avions Charles de Gaulle">Porte-avions Charles de Gaulle</option><option value="Frégate de 1er rang">Frégate de 1er rang</option><option value="Croiseur IOWA Classe B">Croiseur IOWA Classe B</option><option value="Champ de barbelés">Champ de barbelés</option><option value="Bunker">Bunker</option><option value="Champ de mines">Champ de mines</option><option value="Mines sous-marines">Mines sous-marines</option><option value="Batterie de DCA">Batterie de DCA</option><option value="Batterie de Patriots">Batterie de Patriots</option><option value="Batterie côtière">Batterie côtière</option></select></br>';
		
			document.getElementById('col3').appendChild(Str2);
			
		if(Start==false){
			document.getElementById('Start').value = "Start";
		}else if(Start==true){
			document.getElementById('Start').value = "Stop";
		}
		
		if(Type==false){
			document.getElementById('Type').value = "1 fois";
		}else if(Type==true){
			document.getElementById('Type').value = "En boucle";
		}
		
		if (vente_interne==true){
			document.getElementById('interne').checked=true;
		}
		
		document.getElementById('Start').onclick = function(){
			if(Start==true){
				GM_setValue('Start', false);
				location.reload() ; 
			} else {
				GM_setValue('Etat', 0);
				GM_setValue('Start', true);
				location.reload() ; 
			}
		};
		
		document.getElementById('Type').onclick = function(){
			if(Type==true){
				GM_setValue('Type', false);
				location.reload() ; 
			} else {
				GM_setValue('Type', true);
				location.reload() ; 
			}
		};
		
		document.getElementById('Reprendre').onclick = function(){
			var etat_temp = document.getElementById('En_cours').options[document.getElementById('En_cours').selectedIndex].value;
			GM_setValue('Start', true);
			GM_setValue('Etat', etat_temp);
			location.reload() ; 
		};
		
		document.getElementById('percent_HB').value = pourcentage_pris;

		document.getElementById('percent_HB').onchange=function(){GM_setValue('percent_HB', this.value);};
		
		document.getElementById('interne').onclick=function(){
			if (vente_interne==true){
				GM_setValue('interne', false);
				document.getElementById('interne').checked=false;
			} else {
				GM_setValue('interne', true);
				document.getElementById('interne').checked=true;
			}
		}
		
		document.getElementById('Nom_du_joueur').value=Joueur;
		
		document.getElementById('Nom_du_joueur').onchange = function(){GM_setValue('Joueur', this.value);};

		document.getElementById('List_Unit').onchange=function(){GM_setValue('Unite', this.options[this.selectedIndex].index);};
		
		document.getElementById('List_Unit').options[Unite].selected="selected";
	}
	if (a == 3){
		document.getElementById('col3').innerHTML='';
		var Str3= document.createElement('div');
			Str3.innerHTML = '<input value="Start" id="Start" type="button" />'
							 +'<select id="Liste_ress">'
								 +'<option value="r_3">Pétrole</option>'
								 +'<option value="r_4">Munition</option>'
								 +'<option value="r_2">Or</option>'
							 +'</select></br>'
							+'<label for="Txt_mini">Qte Mini :</label><input id="Txt_mini" type="text"><label id="My_convert1" for="Txt_mini"></label></br>'
							+'<label for="Txt_maxi">Qte Maxi :</label><input id="Txt_maxi" type="text"><label id="My_convert2" for="Txt_maxi"></label></br>';
		
		document.getElementById('col3').appendChild(Str3);
			
		if(Start==false){
			document.getElementById('Start').value = "Start";
		}else if(Start==true){
			document.getElementById('Start').value = "Stop";
		}
		
		document.getElementById('Start').onclick = function(){
			if(Start==true){
				GM_setValue('Start', false);
				GM_setValue('Timer', true);
				window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=4'; 
			} else {
				GM_setValue('Start', true);
				location.reload() ; 
			}
		};
		
		document.getElementById('Liste_ress').onchange=function(){
			GM_setValue('Ress', this.options[this.selectedIndex].index);
		}

		document.getElementById('Liste_ress').options[ressource].selected="selected";

		document.getElementById('Txt_mini').value=Val_mini;
		
		document.getElementById('Txt_mini').onkeyup = function(){
			this.value=lisibilite_nombre(this.value.replace(/[^0-9]/gi,''));
			GM_setValue('Val_mini', this.value);
			document.getElementById('My_convert1').innerHTML = ' ( '+Create_Aff(this.value.replace(/[^0-9]/gi,''),0)+ ' )';
		}	

		document.getElementById('My_convert1').innerHTML = ' ( '+Create_Aff(Val_mini.replace(/[^0-9]/gi,''),0)+ ' )';

		document.getElementById('Txt_maxi').value=Val_maxi;
		
		document.getElementById('Txt_maxi').onkeyup = function(){
			this.value=lisibilite_nombre(this.value.replace(/[^0-9]/gi,''));
			GM_setValue('Val_maxi', this.value);
			document.getElementById('My_convert2').innerHTML = ' ( '+Create_Aff(Txt_maxi.value.replace(/[^0-9]/gi,''),0)+ ' )';
		}

		document.getElementById('My_convert2').innerHTML = ' ( '+Create_Aff(Val_maxi.replace(/[^0-9]/gi,''),0)+ ' )';
		
	}
}

function Add_affichage(){

	var My_Div = document.createElement('div');
		My_Div.id='Content';
		My_Div.innerHTML = '<table style="width:100%">'
								+'<tr>'
									+'<td id="col1">'
										+'<div>'
											+'<input type="radio" value="boosteur" name="modeBoost">Vous êtes boosteur</input></br>'
											+'<input type="radio" value="booster" name="modeBoost">Vous êtes boosté</input></br>'
											+'<input type="radio" value="ressources" name="modeBoost">Vous voulez des ressources</input>'
										+'</div>'
										+'<div>'
											+'<label for="diamanter">Changer la météo en diams? :</label><input id="diamanter" type="checkbox" />'
										+'</div>'
										+'<div>'
											+'<label for="heure_debut">Arrêt de : </label><input size="4" id="heure_debut" type="text" />'
											+'<label for="heure_fin"> à </label><input size="4" id="heure_fin" type="text" />'
										+'</div>'
									+'</td>'
									+'<td id="col3">'
									+'</td>'
								+'</tr>';
							+'</table>'
	document.getElementsByClassName('blockFoot')[0].appendChild(My_Div);

	if (diams==true){document.getElementById('diamanter').checked=true;}
	document.getElementById('diamanter').onclick=function(){
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
	document.getElementById('heure_debut').value = H1;
	document.getElementById('heure_fin').value = H2;
	document.getElementById('heure_debut').onchange = function(){GM_setValue('time_min',this.value);};
	document.getElementById('heure_fin').onchange = function(){GM_setValue('time_max',this.value);};


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
	
	AddEventRadio();
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
var Unite = GM_getValue('Unite', '0');
var Start = GM_getValue('Start', false);
var hors_banque = GM_getValue('Money','0');
var Type = GM_getValue('Type', false); 	// en boucle ou 1 fois
var Numero = GM_getValue('Numero', 0); 	// num du joueur à pusher
var ShortTime = Math.floor((Math.random()*2000)+3000);
var MidTime = Math.floor((Math.random()*30000)+30000); // entre 30s et 1min
var LongTime = Math.floor((Math.random()*90000)+90000);
var Val_maxi = GM_getValue('Val_maxi', '10.000.000.000.000.000.000');
var Val_mini = GM_getValue('Val_mini', '1.000.000.000.000.000.000');
var ressource = GM_getValue('Ress', '0');
var Timer = GM_getValue('Timer', false);
var Timer2 = GM_getValue('Timer2', false);
var pourcentage_pris = GM_getValue('percent_HB', 99.90);
var vente_interne = GM_getValue('interne', true);
var diams = GM_getValue('diamants', false);
var H1 = GM_getValue('time_min','02:40');
var H2 = GM_getValue('time_max','07:00');

/*
var myPhpSessID = window.content.document.cookie.match(/PHPSESSID=[A-Za-z0-9]+\;/i);
var urlBuy = "http://game.desert-operations.fr/world1/handel.php";
        var data5   = 'PHPSESSID=' + myPhpSessID + '&tid=21036145&splitted_count=&buy=OK';
        var xhr5 = new XMLHttpRequest();
        
        xhr5.onreadystatechange = function() {
            if (xhr5.readyState == 4) {
                if (xhr5.status == 200) {
                    var textDoc5 = xhr5.responseText;
                }
            }
        }

        xhr5.open("POST", urlBuy, true);
        xhr5.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr5.send(data5);*/

if (Search != '?show=accessdenied'){
	var suspens = getDelay(H1, H2);

	if(Path=='handel.php'){
	Add_affichage();
	//SwitchRadio();
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
