// ==UserScript==
// @name           DO_Bot_Commerce
// @author         Coni
// @description    Ajout d'un bot pour le commerce
// @include        http://game.desert-operations.fr/world*/uebersicht.php
// @include        http://game.desert-operations.fr/world*/handel.php*
// @version        1.20
// @require	   bignumber.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant		   GM_openInTab
// ==/UserScript==
 
var Unites_Stats = new Array();
var Unit_Name = new Array(); 

Unites_Stats['Or'] = new Array('1000');
Unites_Stats['Pétrole'] = new Array('500');
Unites_Stats['Munitions'] = new Array('7');
Unites_Stats['Fantassin'] = new Array(120,0, 'Kerosene', 	1, 	1,1,1, 'infanterie', false); 
Unites_Stats['Antichar'] = new Array(1150,0, 'Kerosene', 	12, 	9,10,12, 'infanterie', true);
Unites_Stats['Paras'] = new Array(400,0, 'Kerosene', 	8, 	5,7,6, 'infanterie', true); 
Unites_Stats['Commando de marine'] = new Array(2200,1, 'Diesel', 	18, 	17,20,15, 'infanterie', true);
Unites_Stats['AMX-13 DCA'] = new Array(18000,4, 'Diesel', 	50, 	20,60,120, 'terrestre', true);
Unites_Stats['AMX-30'] = new Array(35000,5, 'Diesel', 	55, 	30,180,160, 'terrestre', true);
Unites_Stats['Lance-missile mobile'] = new Array(65000,8, 'Diesel', 	80, 	40,600,200, 'terrestre', true);
Unites_Stats['Artillerie automotrice PzH2000'] = new Array(55000,			6, 'Diesel', 	60, 	35,350,325, 'terrestre', true);
Unites_Stats['Leclerc 2'] = new Array(100000,		12, 'Diesel', 	100, 	75,1250,700, 'terrestre', true);
Unites_Stats['M1A2 Abrams'] = new Array(70000,		8, 'Diesel', 	80, 	55,750,600, 'terrestre', true);
Unites_Stats['T-90'] = new Array(85000,			10, 'Diesel', 	85, 	60,800,950, 'terrestre', true);
Unites_Stats['Mil MI-24 Hind'] = new Array(75000,			8, 'Kerosene', 	50, 	22,600,400, 'helicoptere', true);
Unites_Stats['AH-64 Apache'] = new Array(60000,			6, 'Kerosene', 	45, 	18,400,350, 'helicoptere', true);
Unites_Stats['A-10 Thunderbolt'] = new Array(110000,		13, 'Kerosene', 	80, 	45,1100,950, 'avion', true);
Unites_Stats['Eurofighter Typhoon'] = new Array(85000,			11, 'Kerosene', 	60, 	35,400,800, 'avion', true);
Unites_Stats['F22 Raptor'] = new Array(90000,			11, 'Kerosene', 	70, 	35,800,500, 'avion', true);
Unites_Stats['F117A Nighthawk'] = new Array(120000,		14, 'Kerosene', 	100, 	50,1250,1400, 'avion', true);
Unites_Stats['Rockwell B1'] = new Array(250000,		20, 'Kerosene', 	200, 	60,2200,1500, 'avion', true);
Unites_Stats['Northrop B2 Spirit'] = new Array(2000000,		30, 'Kerosene', 	255, 	80,4000,2000, 'avion', true);
Unites_Stats['Destroyer Type 333'] = new Array(70000,			9, 'Diesel', 	100, 	30,200,50, 'navale', true);
Unites_Stats['Frégate de 2nd rang'] = new Array(500000,		18, 'Diesel', 	150, 	60,1250,900, 'navale', true);
Unites_Stats['Corvette K130'] = new Array(350000,		12, 'Diesel', 	140, 	50,650,900, 'navale', true);
Unites_Stats['Porte-avions nucléaire'] = new Array(1500000,		25, 'Kerosene', 	220, 	90,3500,2000, 'navale', true);
Unites_Stats['Sous-marin d\'attaque'] = new Array(800000,		20, 'Diesel', 	180, 	80,1600,1600, 'sous-marin', true);
Unites_Stats['Sous-marin lanceur d\'engins'] = new Array(1000000,		20, 'Diesel', 	200, 	80,2500,1500, 'sous-marin', true);
Unites_Stats['Champ de barbelés'] = new Array(20000,			0, 'Kerosene', 	0, 	0,0,100, 'defense', true); 
Unites_Stats['Bunker'] = new Array(40000,			0, 'Kerosene', 	0, 	0,0,200, 'defense', true); 
Unites_Stats['Champ de mines'] = new Array(250000,		0, 'Kerosene', 	0, 	0,0,1000, 'defense', true); 
Unites_Stats['Batterie de Patriots'] = new Array(150000,		0, 'Kerosene', 	0, 	0,0,600, 'defense', true); 
Unites_Stats['Mines sous-marines'] = new Array(100000,		0, 'Kerosene', 	0, 	0,0,300, 'defense', true); 
Unites_Stats['Batterie de DCA'] = new Array(100000,		0, 'Kerosene', 	0, 	0,0,400, 'defense', true); 
Unites_Stats['Batterie côtière'] = new Array(200000,		0, 'Kerosene', 	0, 	0,0,900, 'defense', true); 
Unites_Stats['Eurocopter Tigre'] = new Array(80000,			8, 'Kerosene', 	50, 	30,500,700, 'helicoptere', true);
Unites_Stats['T-95 Black Eagle'] = new Array(170000,		10, 'Diesel', 	100, 	100,1600,1900, 'terrestre', true);
Unites_Stats['B-52 Stratofortress'] = new Array(4000000,		50, 'Kerosene', 	255, 	140,8000,4000, 'avion', true);
Unites_Stats['Frégate de 1er rang'] = new Array(1000000,		25, 'Diesel', 	200, 	120,2400,1800, 'navale', true);
Unites_Stats['Destructeur de mines'] = new Array(45000,			6, 'Diesel', 	60, 	35,250,250, 'terrestre', true);
Unites_Stats['Mil MI-28 Havoc'] = new Array(70000,			7, 'Kerosene', 	45, 	18,550,650, 'helicoptere', true);
Unites_Stats['Leopard 3'] = new Array(150000,		3, 'Diesel', 	100, 	40,1800,1800, 'terrestre', true);
Unites_Stats['Grey Ghost'] = new Array(85000,		4, 'Kerosene', 70, 20,1000,250, 'avion', true);
Unites_Stats['Porte-avions Charles de Gaulle'] = new Array(2000000,		40, 'Kerosene', 250, 90,4000,5000, 'navale', true);
Unites_Stats['Houbei Class Missile Boat'] = new Array(650000,		19, 'Diesel', 160, 60,1700,750, 'navale', true);
Unites_Stats['Croiseur IOWA Classe B'] = new Array(1100000,		15, 'Diesel', 200, 100,2800,2000, 'navale', true);
Unites_Stats['J16 \"Red Eagle\"'] = new Array(90000,		8, 'Kerosene', 60, 30,700,650, 'avion', true);
Unites_Stats['Embraer EMB 314 Super Tucano'] = new Array(150000,		12, 'Kerosene', 70, 15,900,1700, 'avion', true);
Unites_Stats['MBT 3000'] = new Array(65000,		7, 'Diesel', 80, 50,800,600, 'terrestre', true);
 
Unit_Name[1]='Fantassin';
Unit_Name[2]='Paras';
Unit_Name[3]='Antichar';
Unit_Name[4]='Commando de marine';
Unit_Name[5]='AMX-13 DCA';
Unit_Name[6]='AMX-30';
Unit_Name[7]='Destructeur de mines';
Unit_Name[8]='Artillerie automotrice PzH2000';
Unit_Name[9]='Lance-missile mobile';
Unit_Name[10]='M1A2 Abrams';
Unit_Name[11]='MBT 3000';
Unit_Name[12]='T-90';
Unit_Name[13]='Leclerc 2';
Unit_Name[14]='Leopard 3';
Unit_Name[15]='T-95 Black Eagle';
Unit_Name[16]='AH-64 Apache';
Unit_Name[17]='Mil MI-28 Havoc';
Unit_Name[18]='Mil MI-24 Hind';
Unit_Name[19]='Eurocopter Tigre';
Unit_Name[20]='Eurofighter Typhoon';
Unit_Name[21]='F22 Raptor';
Unit_Name[22]='J16 "Red Eagle"';
Unit_Name[23]='A-10 Thunderbolt';
Unit_Name[24]='F117A Nighthawk';
Unit_Name[25]='Rockwell B1';
Unit_Name[26]='Northrop B2 Spirit';
Unit_Name[27]='Embraer EMB 314 Super Tucano';
Unit_Name[28]='Grey Ghost';
Unit_Name[29]='B-52 Stratofortress';
Unit_Name[30]='Corvette K130';
Unit_Name[31]='Destroyer Type 333';
Unit_Name[32]='Frégate de 2nd rang';
Unit_Name[33]='Houbei Class Missile Boat';
Unit_Name[34]='Sous-marin d\'attaque';
Unit_Name[35]='Sous-marin lanceur d\'engins';
Unit_Name[36]='Porte-avions nucléaire';
Unit_Name[37]='Porte-avions Charles de Gaulle';
Unit_Name[38]='Frégate de 1er rang';
Unit_Name[39]='Croiseur IOWA Classe B';
Unit_Name[40]='Champ de barbelés';
Unit_Name[41]='Bunker';
Unit_Name[42]='Champ de mines';
Unit_Name[43]='Mines sous-marines';
Unit_Name[44]='Batterie de DCA';
Unit_Name[45]='Batterie de Patriots';
Unit_Name[46]='Batterie côtière'

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
} 

String.prototype.getId=function(){
	for(i=1;i<Unit_Name.length+1;i++){
		if (Unit_Name[i]==this){return i;}
	}
} 
 
function lisibilite_nombre(nbr){
		var nombre = ''+nbr;
		var retour = '';
		var count=0;
		for(var i=nombre.length-1 ; i>=0 ; i--)
		{
			if(count!=0 && count % 3 == 0)
				retour = nombre[i]+'.'+retour ;
			else
				retour = nombre[i]+retour ;
			count++;
		}
		return retour;
}

function Convertir2(nombre){

var classique = ['', '',' mil.',' Mil.',' Md.',' bl.',' Bd.',' tl.',' Td.',' ql.',' Qd.',' qil.',' Qid.',' sl.',' Sd.',' spl.',' Spd.',' ol.',' Od.',' nl.'];

	var nb = nombre.split('.');
	var Power = nb.length-1;
	
	var fin_nombre = (nb[0]+'.'+nb[1]).replace(/[*a-z]/gi,'');
	fin_nombre+= classique[Power];

	return fin_nombre;
}

function GetUnit(Arg){
	if (Arg.match('Or'))							{P='Or';} 
	if (Arg.match('Pétrole'))						{P='Pétrole';} 
	if (Arg.match('Munitions'))						{P='Munitions';} 
	if (Arg.match('Fantassin'))						{P='Fantassin';} 
	if (Arg.match('Paras'))							{P='Paras';} 
	if (Arg.match('Antichar'))						{P='Antichar';} 
	if (Arg.match('Commando de marine'))			{P='Commando de marine';} 
	if (Arg.match('AMX-13 DCA'))					{P='AMX-13 DCA';} 
	if (Arg.match('AMX-30'))						{P='AMX-30';} 
	if (Arg.match('Destructeur de mines'))			{P='Destructeur de mines';} 
	if (Arg.match('Artillerie automotrice PzH2000')){P='Artillerie automotrice PzH2000';} 
	if (Arg.match('Lance-missile mobile'))			{P='Lance-missile mobile';} 
	if (Arg.match('M1A2 Abrams'))					{P='M1A2 Abrams';} 
	if (Arg.match('MBT 3000'))						{P='MBT 3000';} 
	if (Arg.match('T-90'))							{P='T-90';} 
	if (Arg.match('Leclerc 2'))						{P='Leclerc 2';} 
	if (Arg.match('Leopard 3'))						{P='Leopard 3';} 
	if (Arg.match('T-95 Black Eagle'))				{P='T-95 Black Eagle';} 
	if (Arg.match('AH-64 Apache'))					{P='AH-64 Apache';} 
	if (Arg.match('Mil MI-28 Havoc'))				{P='Mil MI-28 Havoc';} 
	if (Arg.match('Mil MI-24 Hind'))				{P='Mil MI-24 Hind';} 
	if (Arg.match('Eurocopter Tigre'))				{P='Eurocopter Tigre';} 
	if (Arg.match('Eurofighter Typhoon'))			{P='Eurofighter Typhoon';} 
	if (Arg.match('F22 Raptor'))					{P='F22 Raptor';} 
	if (Arg.match('J16 \"Red Eagle\"'))				{P='J16 \"Red Eagle\"';} 
	if (Arg.match('A-10 Thunderbolt'))				{P='A-10 Thunderbolt';} 
	if (Arg.match('F117A Nighthawk'))				{P='F117A Nighthawk';} 
	if (Arg.match('Rockwell B1'))					{P='Rockwell B1';} 
	if (Arg.match('Northrop B2 Spirit'))			{P='Northrop B2 Spirit';} 
	if (Arg.match('Embraer EMB 314 Super Tucano'))	{P='Embraer EMB 314 Super Tucano';} 
	if (Arg.match('Grey Ghost'))					{P='Grey Ghost';} 
	if (Arg.match('B-52 Stratofortress'))			{P='B-52 Stratofortress';} 
	if (Arg.match('Corvette K130'))					{P='Corvette K130';} 
	if (Arg.match('Destroyer Type 333'))			{P='Destroyer Type 333';} 
	if (Arg.match('Frégate de 2nd rang'))			{P='Frégate de 2nd rang';} 
	if (Arg.match('Houbei Class Missile Boat'))		{P='Houbei Class Missile Boat';} 
	if (Arg.match('Sous-marin d\'attaque'))			{P='Sous-marin d\'attaque';} 
	if (Arg.match('Sous-marin lanceur d\'engins'))	{P='Sous-marin lanceur d\'engins';} 
	if (Arg.match('Porte-avions nucléaire'))		{P='Porte-avions nucléaire';} 
	if (Arg.match('Porte-avions Charles de Gaulle')){P='Porte-avions Charles de Gaulle';} 
	if (Arg.match('Frégate de 1er rang'))			{P='Frégate de 1er rang';} 
	if (Arg.match('Croiseur IOWA Classe B'))		{P='Croiseur IOWA Classe B';} 
	return P;
}

function Create_Aff(nb){

	var span = document.createElement('span');
		span.className='tooltipExtention showTooltipDefault';
		span.title = lisibilite_nombre(nb);
		span.data = lisibilite_nombre(nb);
		
		span.innerHTML = Convertir2(span.title);
	
	return span.outerHTML;
}

function Control_Weather(){
	var current_weather = document.getElementById('weatherpanelInfo').firstChild.innerHTML.replace(/<\/?[^<]+>/g,'').trim();
	if(diams==true && (current_weather!='Ensoleillé' || current_weather!='sans nuage')){
		//GM_openInTab('http://game.desert-operations.fr/world1/premium_cash.php?mode=cash&creditweather=1');
		setTimeout(function(){location.reload();}, 2000);
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
var Num_action = elemid.replace(/[^0-9]/gi,'');
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
		
	var Reprise = document.createElement('select');
		Reprise.id='En_cours';
		Reprise.style.display='none';
		Reprise.innerHTML = '<option value="0">Check HB</option><option value="1">Acheter</option><option value="2">Vendre</option><option value="3">Attente $</option>';

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
			document.getElementById('My_convert1').innerHTML = ' ( '+Create_Aff(Txt_mini.value.replace(/[^0-9]/gi,''))+ ' )';
		}	
	My_Div4.appendChild(Txt_mini);

	var newlabel5 = document.createElement("Label");
		newlabel5.setAttribute("for",'Txt_mini');
		newlabel5.id='My_convert1';
		newlabel5.innerHTML = ' ( '+Create_Aff(Val_mini.replace(/[^0-9]/gi,''))+ ' )';
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
			document.getElementById('My_convert2').innerHTML = ' ( '+Create_Aff(Txt_maxi.value.replace(/[^0-9]/gi,''))+ ' )';
		}
	My_Div5.appendChild(Txt_maxi);
	
	var newlabel6 = document.createElement("Label");
		newlabel6.setAttribute("for",'Txt_maxi');
		newlabel6.id='My_convert2';
		newlabel6.innerHTML = ' ( '+Create_Aff(Val_maxi.replace(/[^0-9]/gi,''))+ ' )';
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
	var URL ='http://game.desert-operations.fr/world1/handel.php?mode=2';
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
		var argent = document.getElementById('resourcebar_money_label').getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
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
	
	var URL ='http://game.desert-operations.fr/world1/handel.php?mode=1&object_id='+produit+'&goods_partly=1&search_goods=Chercher';
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

if(window.location.href.substring(0,50)=='http://game.desert-operations.fr/world1/handel.php'){//si on est sur le comm
Add_affichage();
}

//Control_Weather();

if (Mode == 'booster' && Start == true){
	if(window.location.href.substring(0,50)=='http://game.desert-operations.fr/world1/handel.php'){
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
	if(window.location.href.substring(0,50)!='http://game.desert-operations.fr/world1/handel.php'){
		GM_setValue('Timer2', false);
		window.location.href='http://game.desert-operations.fr/world1/handel.php';
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
			window.location.href='http://game.desert-operations.fr/world1/handel.php?mode=1&username='+player+'&username_partly=1&search_user=Chercher';
		} , MidTime);
	}
}
if (Mode == 'ressources' && Start2 == true){
	if(window.location.href.substring(0,50)!='http://game.desert-operations.fr/world1/handel.php'){
		window.location.href='http://game.desert-operations.fr/world1/handel.php';
	}	
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
