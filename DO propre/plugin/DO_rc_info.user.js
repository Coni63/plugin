// ==UserScript==
// @name           DO RC Info
// @author         Coni
// @description    Ajoute une petite fenêtre comportant des informations relatives au combat : depenses, ratio...
// @include        http://game.desert-operations.*/world*/battleReport.*
// @version        2.00
// @grant          none
// @require		   jscharts.js
// ==/UserScript==

var Add = document.getElementsByClassName("battleReportProtocol")[0];
var Unites_Attaquant_Nom = new Array();
var Unites_Attaquant_Debut = new Array();
var Unites_Attaquant_Fin = new Array();
var Unites_Attaquant_Detruit = new Array();
var Unites_Defenseur_Nom = new Array();
var Unites_Defenseur_Debut = new Array();
var Unites_Defenseur_Fin = new Array();
var Unites_Defenseur_Detruit = new Array();
var Bat_Nom= new Array();
var Bat_Debut= new Array();
var Bat_fin= new Array();
var Bat_perdu= new Array();
var puissance_att_inf=0;
var puissance_att_terrestre=0;
var puissance_att_avion=0;
var puissance_att_heli=0;
var puissance_att_navale=0;
var puissance_att_sm=0;
var puissance_att_deffixe=0;
var puissance_def_inf=0;
var puissance_def_terrestre=0;
var puissance_def_avion=0;
var puissance_def_heli=0;
var puissance_def_navale=0;
var puissance_def_sm=0;
var puissance_def_deffixe=0;
var Unites_Stats = new Array();
var Bat_Stats = new Array();
var tableau = document.getElementsByTagName('tbody');
var Temporaire_att = tableau[0].getElementsByTagName('tr');
var Temporaire_def = tableau[1].getElementsByTagName('tr');
var Temporaire_bat = tableau[2].getElementsByTagName('tr');
var Argent_Unites_Defenseur = 0;
var Argent_Unites_Attaquant=0;
var Perte_Argent_Unites_Attaquant = 0;
var Perte_Argent_Unites_Defenseur = 0;
var Perte_Munition_Attaquant = 0;
var Perte_Diesel_Attaquant = 0;
var Perte_Kerosene_Attaquant = 0;
var Ratio = '';
var Ratio2 = '';
var Entretien_av =0;
var Entretien_ap =0;
var Entretien2_av =0;
var Entretien2_ap =0;
var pts_perdus=new Array();
var pts_perdus_total=0;

Unites_Stats['Fantassin'] = new Array(120,0, 'Kerosene', 	1, 	1,1,1, 'infanterie'); 
Unites_Stats['Antichar'] = new Array(1150,0, 'Kerosene', 	12, 	9,10,12, 'infanterie');
Unites_Stats['Paras'] = new Array(400,0, 'Kerosene', 	8, 	5,7,6, 'infanterie'); 
Unites_Stats['Commando de marine'] = new Array(2200,1, 'Diesel', 	18, 	17,20,15, 'infanterie');
Unites_Stats['AMX-13 DCA'] = new Array(18000,4, 'Diesel', 	50, 	20,60,120, 'terrestre');
Unites_Stats['AMX-30'] = new Array(35000,5, 'Diesel', 	55, 	30,180,160, 'terrestre');
Unites_Stats['Lance-missile mobile'] = new Array(65000,8, 'Diesel', 	80, 	40,600,200, 'terrestre');
Unites_Stats['Artillerie automotrice PzH2000'] = new Array(55000,			6, 'Diesel', 	60, 	35,350,325, 'terrestre');
Unites_Stats['Leclerc 2'] = new Array(100000,		12, 'Diesel', 	100, 	75,1250,700, 'terrestre');
Unites_Stats['M1A2 Abrams'] = new Array(70.000,		8, 'Diesel', 	80, 	55,750,600, 'terrestre');
Unites_Stats['T-90'] = new Array(85000,			10, 'Diesel', 	85, 	60,800,950, 'terrestre');
Unites_Stats['Mil MI-24 Hind'] = new Array(75000,			8, 'Kerosene', 	50, 	22,600,400, 'helicoptere');
Unites_Stats['AH-64 Apache'] = new Array(60000,			6, 'Kerosene', 	45, 	18,400,350, 'helicoptere');
Unites_Stats['A-10 Thunderbolt'] = new Array(110000,		13, 'Kerosene', 	80, 	45,1100,950, 'avion');
Unites_Stats['Eurofighter Typhoon'] = new Array(85000,			11, 'Kerosene', 	60, 	35,400,800, 'avion');
Unites_Stats['F22 Raptor'] = new Array(90000,			11, 'Kerosene', 	70, 	35,800,500, 'avion');
Unites_Stats['F117A Nighthawk'] = new Array(120000,		14, 'Kerosene', 	100, 	50,1250,1400, 'avion');
Unites_Stats['Rockwell B1'] = new Array(250000,		20, 'Kerosene', 	200, 	60,2200,1500, 'avion');
Unites_Stats['Northrop B2 Spirit'] = new Array(2000000,		30, 'Kerosene', 	255, 	80,4000,2000, 'avion');
Unites_Stats['Destroyer Type 333'] = new Array(70000,			9, 'Diesel', 	100, 	30,200,50, 'navale');
Unites_Stats['Frégate de 2nd rang'] = new Array(500000,		18, 'Diesel', 	150, 	60,1250,900, 'navale');
Unites_Stats['Corvette K130'] = new Array(350000,		12, 'Diesel', 	140, 	50,650,900, 'navale');
Unites_Stats['Porte-avions nucléaire'] = new Array(1500000,		25, 'Kerosene', 	220, 	90,3500,2000, 'navale');
Unites_Stats['Sous-marin d\'attaque'] = new Array(800000,		20, 'Diesel', 	180, 	80,1600,1600, 'sous-marin');
Unites_Stats['Sous-marin lanceur d\'engins'] = new Array(1000000,		20, 'Diesel', 	200, 	80,2500,1500, 'sous-marin');
Unites_Stats['Champs de barbeles'] = new Array(20000,			0, 'Kerosene', 	0, 	0,0,100, 'defense'); 
Unites_Stats['Bunker'] = new Array(40000,			0, 'Kerosene', 	0, 	0,0,200, 'defense'); 
Unites_Stats['Champ de mines'] = new Array(250000,		0, 'Kerosene', 	0, 	0,0,1000, 'defense'); 
Unites_Stats['Batterie de Patriots'] = new Array(150000,		0, 'Kerosene', 	0, 	0,0,600, 'defense'); 
Unites_Stats['Mines sous-marines'] = new Array(100000,		0, 'Kerosene', 	0, 	0,0,300, 'defense'); 
Unites_Stats['Batterie de DCA'] = new Array(100000,		0, 'Kerosene', 	0, 	0,0,400, 'defense'); 
Unites_Stats['Batterie côtière'] = new Array(200000,		0, 'Kerosene', 	0, 	0,0,900, 'defense'); 
Unites_Stats['Eurocopter Tigre'] = new Array(80000,			8, 'Kerosene', 	50, 	30,500,700, 'helicoptere');
Unites_Stats['T-95 Black Eagle'] = new Array(170000,		10, 'Diesel', 	100, 	100,1600,1900, 'terrestre');
Unites_Stats['B-52 Stratofortress'] = new Array(4000000,		50, 'Kerosene', 	255, 	140,8000,4000, 'avion');
Unites_Stats['Frégate de 1er rang'] = new Array(1000000,		25, 'Diesel', 	200, 	120,2400,1800, 'navale');
Unites_Stats['Destructeur de mines'] = new Array(45000,			6, 'Diesel', 	60, 	35,250,250, 'terrestre');
Unites_Stats['Mil MI-28 Havoc'] = new Array(70000,			7, 'Kerosene', 	45, 	18,550,650, 'helicoptere');
Unites_Stats['Leopard 3'] = new Array(150000,		3, 'Diesel', 	100, 	40,1800,1800, 'terrestre');
Unites_Stats['Grey Ghost'] = new Array(85000,		4, 'Kerosene', 70, 20,1000,250, 'avion');
Unites_Stats['Porte-avions Charles de Gaulle'] = new Array(2000000,		40, 'Kerosene', 250, 90,4000,5000, 'navale');
Unites_Stats['Houbei Class Missile Boat'] = new Array(650000,		19, 'Diesel', 160, 60,1700,750, 'navale');
Unites_Stats['Croiseur IOWA Classe B'] = new Array(1100000,		15, 'Diesel', 200, 100,2800,2000, 'navale');
Unites_Stats['J16 \"Red Eagle\"'] = new Array(90000,		8, 'Kerosene', 60, 30,700,650, 'avion');
Unites_Stats['Embraer EMB 314 Super Tucano'] = new Array(150000,		12, 'Kerosene', 70, 15,900,1700, 'avion');
Unites_Stats['MBT 3000'] = new Array(65000,		7, 'Diesel', 80, 50,800,600, 'terrestre');

Bat_Stats['Habitations'] = 225;
Bat_Stats['Zones commerciales'] = 310;
Bat_Stats['Usines'] = 1000;
Bat_Stats['Mines'] = 80;
Bat_Stats['Raffineries'] = 125;
/*
function log10(val){
  return Math.log(val)/Math.log(10);
}*/

function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
} 

Number.prototype.toShortString=function(){return (''+this).replace(/([\d\.]+)(?=e)/,function(a,b){return (+b).toFixed(2)})}
/*
function simplify(val){
	if(val>Math.pow(10,3)){
		var power=Math.floor(Math.log(val)/Math.log(10));
		var num_full = val/Math.pow(10,power);
		var num_arr=Arrondir(num_full,2);
		return num_arr * Math.pow(10,power);
	} else {
		return val;
	}
}*/

function DelPoint(Nombre) {
	var	End = Nombre.replace(/\./g,'');
	End = parseInt(End);
	return End;
} 

function Convert(Quantite, Type) {
	if (Quantite < Math.pow(10,3)) {
		if (Type == 'Argent') { 
			Quantite += ' $';
		} else if (Type == 'Petrole') {
			Quantite += ' Litres';
		} else if (Type == 'unite') {
			Quantite += '';
		} else {
			Quantite += ' Caisses'; 
		}
	} else if (Quantite < Math.pow(10,6)) {
		Quantite /= Math.pow(10,3);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' k';
	} else if (Quantite < Math.pow(10,9)) {
		Quantite /= Math.pow(10,6);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' m';
	} else if (Quantite < Math.pow(10,12)) {
		Quantite /= Math.pow(10,9);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' M';
	} else if (Quantite < Math.pow(10,15)) {
		Quantite /= Math.pow(10,12);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' b';
	} else if (Quantite < Math.pow(10,18)) {
		Quantite /= Math.pow(10,15);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' B';
	} else if (Quantite < Math.pow(10,21)) {
		Quantite /= Math.pow(10,18);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' C';
	}
	else if (Quantite < Math.pow(10,24)) {
		Quantite /= Math.pow(10,21);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' kC';
	}
	else if (Quantite < Math.pow(10,27)) {
		Quantite /= Math.pow(10,24);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' mC';
	}
	else if (Quantite < Math.pow(10,30)) {
		Quantite /= Math.pow(10,27);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' MC';
	}
	else if (Quantite < Math.pow(10,33)) {
		Quantite /= Math.pow(10,30);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' bC';
	}
	else if (Quantite < Math.pow(10,36)) {
		Quantite /= Math.pow(10,33);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' BC';
	}
	else if (Quantite < Math.pow(10,39)) {
		Quantite /= Math.pow(10,36);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' C²';
	}
	else if (Quantite < Math.pow(10,42)) {
		Quantite /= Math.pow(10,39);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' kC²';
	}
	else if (Quantite < Math.pow(10,45)) {
		Quantite /= Math.pow(10,42);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' mC²';
	}
	return Quantite; 
} 

//******************prélèvement des unités *************

for (i = 1, c = Temporaire_att.length ; i < c; i++){
Unites_Attaquant_Nom[i]=Temporaire_att[i].firstChild.innerHTML;
Unites_Attaquant_Debut[i]=DelPoint(Temporaire_att[i].firstChild.nextSibling.getElementsByTagName('span')[0].title);
Unites_Attaquant_Fin[i]=DelPoint(Temporaire_att[i].firstChild.nextSibling.nextSibling.getElementsByTagName('span')[0].title);
Unites_Attaquant_Detruit[i]=DelPoint(Temporaire_att[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('span')[0].title);
}

for (i = 1, c = Temporaire_def.length ; i < c; i++){
Unites_Defenseur_Nom[i]=Temporaire_def[i].firstChild.innerHTML;
Unites_Defenseur_Debut[i]=DelPoint(Temporaire_def[i].firstChild.nextSibling.getElementsByTagName('span')[0].title);
Unites_Defenseur_Fin[i]=DelPoint(Temporaire_def[i].firstChild.nextSibling.nextSibling.getElementsByTagName('span')[0].title);
Unites_Defenseur_Detruit[i]=DelPoint(Temporaire_def[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('span')[0].title);
}

for (i = 1, c = Temporaire_bat.length ; i < c; i++){
Bat_Nom[i]=Temporaire_bat[i].firstChild.innerHTML;
Bat_Debut[i]=DelPoint(Temporaire_bat[i].firstChild.nextSibling.getElementsByTagName('span')[0].title);
Bat_fin[i]=DelPoint(Temporaire_bat[i].firstChild.nextSibling.nextSibling.getElementsByTagName('span')[0].title);
Bat_perdu[i]=DelPoint(Temporaire_bat[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('span')[0].title);
}

//**************mise en page des nombre d'unités**********

for (i = 1, c = Temporaire_att.length ; i < c; i++){
Temporaire_att[i].firstChild.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_att[i].firstChild.nextSibling.getElementsByTagName('span')[0].title), 'unite');
Temporaire_att[i].firstChild.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_att[i].firstChild.nextSibling.nextSibling.getElementsByTagName('span')[0].title), 'unite');
Temporaire_att[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_att[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('span')[0].title), 'unite');
}

for (i = 1, c = Temporaire_def.length ; i < c; i++){
Temporaire_def[i].firstChild.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_def[i].firstChild.nextSibling.getElementsByTagName('span')[0].title), 'unite');
Temporaire_def[i].firstChild.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_def[i].firstChild.nextSibling.nextSibling.getElementsByTagName('span')[0].title), 'unite');
Temporaire_def[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_def[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('span')[0].title), 'unite');
}

for (i = 1, c = Temporaire_bat.length ; i < c; i++){
Temporaire_bat[i].firstChild.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_bat[i].firstChild.nextSibling.getElementsByTagName('span')[0].title), 'unite');
Temporaire_bat[i].firstChild.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_bat[i].firstChild.nextSibling.nextSibling.getElementsByTagName('span')[0].title), 'unite');
Temporaire_bat[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_bat[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('span')[0].title), 'unite');
}

//**************** calcul des résultats *******************

for (i = 1, c = Unites_Attaquant_Nom.length; i < c; i++) {
	Perte_Argent_Unites_Attaquant += Unites_Attaquant_Detruit[i] * Unites_Stats[Unites_Attaquant_Nom[i]][0];	
} 
for (i = 1, c = Unites_Defenseur_Nom.length; i < c; i++) {
	Perte_Argent_Unites_Defenseur += Unites_Defenseur_Detruit[i] * Unites_Stats[Unites_Defenseur_Nom[i]][0];
} 
for (i = 1, c = Unites_Defenseur_Nom.length; i < c; i++) {
	Argent_Unites_Defenseur += Unites_Defenseur_Debut[i] * Unites_Stats[Unites_Defenseur_Nom[i]][0];
} 
for (i = 1, c = Unites_Attaquant_Nom.length; i < c; i++) {
	Argent_Unites_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][0];
} 
for (i = 1, c = Unites_Defenseur_Nom.length; i < c; i++) {
	Entretien_av += Unites_Defenseur_Debut[i] * Unites_Stats[Unites_Defenseur_Nom[i]][4] * 6;
} 
for (i = 1, c = Unites_Defenseur_Nom.length; i < c; i++) {
	Entretien_ap += Unites_Defenseur_Fin[i] * Unites_Stats[Unites_Defenseur_Nom[i]][4] * 6;
} 
for (i = 1, c = Unites_Attaquant_Nom.length; i < c; i++) { 
	Entretien2_av += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][4] * 6;
} 
for (i = 1, c = Unites_Attaquant_Nom.length; i < c; i++) {
	Entretien2_ap += Unites_Attaquant_Fin[i] * Unites_Stats[Unites_Attaquant_Nom[i]][4] * 6;
} 
for (i = 1, c = Unites_Attaquant_Nom.length; i < c; i++) {
	Perte_Munition_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][3];	
} 
for (i = 1, c = Unites_Attaquant_Nom.length; i < c; i++) {
	if (Unites_Stats[Unites_Attaquant_Nom[i]][2] == 'Diesel') {
		Perte_Diesel_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][1];	
	} else {
		Perte_Kerosene_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][1];	
	}
}

// **************calcul des puissances d'attaque******************

for (i = 1, c = Unites_Attaquant_Nom.length; i < c; i++) {
	
	if(Unites_Stats[Unites_Attaquant_Nom[i]][7] == 'infanterie'){
		puissance_att_inf+=Unites_Stats[Unites_Attaquant_Nom[i]][5]*Unites_Attaquant_Debut[i];
	}else if(Unites_Stats[Unites_Attaquant_Nom[i]][7] == 'terrestre'){
		puissance_att_terrestre+=Unites_Stats[Unites_Attaquant_Nom[i]][5]*Unites_Attaquant_Debut[i];
	}else if(Unites_Stats[Unites_Attaquant_Nom[i]][7] == 'avion'){
		puissance_att_avion+=Unites_Stats[Unites_Attaquant_Nom[i]][5]*Unites_Attaquant_Debut[i];
	}else if(Unites_Stats[Unites_Attaquant_Nom[i]][7] == 'helicoptere'){
		puissance_att_heli+=Unites_Stats[Unites_Attaquant_Nom[i]][5]*Unites_Attaquant_Debut[i];
	}else if(Unites_Stats[Unites_Attaquant_Nom[i]][7] == 'navale'){
		puissance_att_navale+=Unites_Stats[Unites_Attaquant_Nom[i]][5]*Unites_Attaquant_Debut[i];
	}else if(Unites_Stats[Unites_Attaquant_Nom[i]][7] == 'sous-marin'){
		puissance_att_sm+=Unites_Stats[Unites_Attaquant_Nom[i]][5]*Unites_Attaquant_Debut[i];
	}else{
		puissance_att_deffixe+=Unites_Stats[Unites_Attaquant_Nom[i]][5]*Unites_Attaquant_Debut[i];
	}
}
for (i = 1, c = Unites_Defenseur_Nom.length; i < c; i++) {
	if(Unites_Stats[Unites_Defenseur_Nom[i]][7] == 'infanterie'){
		puissance_def_inf+=Unites_Stats[Unites_Defenseur_Nom[i]][6]*Unites_Defenseur_Debut[i];
	}else if(Unites_Stats[Unites_Defenseur_Nom[i]][7] == 'terrestre'){
		puissance_def_terrestre+=Unites_Stats[Unites_Defenseur_Nom[i]][6]*Unites_Defenseur_Debut[i];
	}else if(Unites_Stats[Unites_Defenseur_Nom[i]][7] == 'avion'){
		puissance_def_avion+=Unites_Stats[Unites_Defenseur_Nom[i]][6]*Unites_Defenseur_Debut[i];
	}else if(Unites_Stats[Unites_Defenseur_Nom[i]][7] == 'helicoptere'){
		puissance_def_heli+=Unites_Stats[Unites_Defenseur_Nom[i]][6]*Unites_Defenseur_Debut[i];
	}else if(Unites_Stats[Unites_Defenseur_Nom[i]][7] == 'navale'){
		puissance_def_navale+=Unites_Stats[Unites_Defenseur_Nom[i]][6]*Unites_Defenseur_Debut[i];
	}else if(Unites_Stats[Unites_Defenseur_Nom[i]][7] == 'sous-marin'){
		puissance_def_sm+=Unites_Stats[Unites_Defenseur_Nom[i]][6]*Unites_Defenseur_Debut[i];
	}else{
		puissance_def_deffixe+=Unites_Stats[Unites_Defenseur_Nom[i]][6]*Unites_Defenseur_Debut[i];
	}
}

puissance_att_inf=parseFloat(puissance_att_inf.toShortString());
puissance_att_terrestre=parseFloat(puissance_att_terrestre.toShortString());
puissance_att_avion=parseFloat(puissance_att_avion.toShortString());
puissance_att_heli=parseFloat(puissance_att_heli.toShortString());
puissance_att_navale=parseFloat(puissance_att_navale.toShortString());
puissance_att_sm=parseFloat(puissance_att_sm.toShortString());
puissance_att_deffixe=parseFloat(puissance_att_deffixe.toShortString());
puissance_def_inf=parseFloat(puissance_def_inf.toShortString());
puissance_def_terrestre=parseFloat(puissance_def_terrestre.toShortString());
puissance_def_avion=parseFloat(puissance_def_avion.toShortString());
puissance_def_heli=parseFloat(puissance_def_heli.toShortString());
puissance_def_navale=parseFloat(puissance_def_navale.toShortString());
puissance_def_sm=parseFloat(puissance_def_sm.toShortString());
puissance_def_deffixe=parseFloat(puissance_def_deffixe.toShortString());


//**************Calcul des pts perdus*****************

for (i = 1, c = Temporaire_bat.length ; i < c; i++){
	pts_perdus[i]=Bat_perdu[i]*Bat_Stats[Bat_Nom[i]];
	pts_perdus_total+=pts_perdus[i];
}

//*****************calcul du ratio ********************

var Ratio_Attaquant = Perte_Diesel_Attaquant * 7040 + Perte_Kerosene_Attaquant * 14080 + Perte_Munition_Attaquant * 10 + Perte_Argent_Unites_Attaquant;
var Ratio_Defenseur = Perte_Argent_Unites_Defenseur;
if ((Ratio_Attaquant > Ratio_Defenseur) && Ratio_Defenseur != 0) {
	Ratio = Convert(Arrondir(Ratio_Attaquant / Ratio_Defenseur,1),'unite') + ':1';	
} else if ((Ratio_Attaquant < Ratio_Defenseur) && Ratio_Attaquant != 0) {
	Ratio = '1:' +Convert(Arrondir(Ratio_Defenseur / Ratio_Attaquant,1),'unite');	
} else {
	Ratio = '-';
} if ((Perte_Argent_Unites_Attaquant > Perte_Argent_Unites_Defenseur) && Perte_Argent_Unites_Defenseur != 0) {
	Ratio2 = Convert(Arrondir(Perte_Argent_Unites_Attaquant / Perte_Argent_Unites_Defenseur,1), 'unite') + ':1';	
} else if ((Perte_Argent_Unites_Attaquant < Perte_Argent_Unites_Defenseur) && Perte_Argent_Unites_Attaquant != 0) {
	Ratio2 = '1:' + Convert(Arrondir(Perte_Argent_Unites_Defenseur / Perte_Argent_Unites_Attaquant,1),'unite');	
} else {
	Ratio2 = '-';
}

//**************Affichage tableau ***************

Add.innerHTML ='<table class="battleReport" width="100%">'
	+ '<tr>'
		+ '<th colspan="2">'
			+'<h2 class="battleReport" style="text-align:center">Pertes Unites en $</h2>'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">' + Convert(Perte_Argent_Unites_Attaquant, 'Argent') + '</td>'
		+ '<td style="text-align:right">' + Convert(Perte_Argent_Unites_Defenseur, 'Argent') + '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2">'
			+ '<h2 class="battleReport" style="text-align:center">Prix Defense en $</h2>'
		+ '</th>'
    + '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">' + Convert(Argent_Unites_Attaquant, 'Argent') + '</td>' 
		+ '<td style="text-align:right">' + Convert(Argent_Unites_Defenseur, 'Argent') + '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2">'
			+ '<h2 class="battleReport" style="text-align:center">Entretien avant attaque</h2>'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">' + Convert(Entretien2_av, 'Argent')+'/h' + '</td>'
		+ '<td style="text-align:right">' + Convert(Entretien_av, 'Argent')+'/h' + '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2" >'
			+ '<h2 class="battleReport" style="text-align:center">Entretien post-attaque</h2>'
		+ '</th>'
	+'</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">' + Convert(Entretien2_ap, 'Argent')+'/h' + '</td>'
		+ '<td style="text-align:right">' + Convert(Entretien_ap, 'Argent')+'/h' + '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2" >'
			+ '<h2 class="battleReport" style="text-align:center">Munitions</h2>'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td>' 
			+'<span class="tooltipExtention showTooltipDefault" title="Cout : '+ Convert(Perte_Munition_Attaquant * 7, 'Argent')+'" data="'+Convert(Perte_Munition_Attaquant * 7, 'Argent')+'">Munitions : '
				+ Convert(Perte_Munition_Attaquant, 'Munition')
			+ '</span>'
		+ '</td>'
		+ '<td></td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2">'
			+ '<h2 class="battleReport" style="text-align:center">Petrole</h2>'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td>'
			+'<span class="tooltipExtention showTooltipDefault" title="Cout : '+Convert(Perte_Diesel_Attaquant * 5000, 'Argent')+ ' ( '+ Convert(Perte_Diesel_Attaquant*3000, 'Petrole') + ' avec Vladimir)" data="'+Convert(Perte_Diesel_Attaquant * 5000, 'Argent')+' ( '+ Convert(Perte_Diesel_Attaquant*3000, 'Petrole') + ' avec Vladimir) ">Diesel : ' 
				+ Convert(Perte_Diesel_Attaquant, 'Petrole') + ' ( '+ Convert(Perte_Diesel_Attaquant*0.6, 'Petrole') + ' avec Vladimir) '
			+ '</span>'
		+ '</td>'
		+ '<td></td>'
	+ '</tr>'
	+ '<tr>'
		+ '<td>'
			+'<span class="tooltipExtention showTooltipDefault" title="Cout : '+Convert(Perte_Kerosene_Attaquant * 10000, 'Argent')+ ' ( '+ Convert(Perte_Kerosene_Attaquant*6000, 'Petrole') + ' avec Vladimir)" data="'+Convert(Perte_Kerosene_Attaquant * 10000, 'Argent')+' ( '+ Convert(Perte_Kerosene_Attaquant*6000, 'Petrole') + ' avec Vladimir) ">Kérosène : ' 
				+ Convert(Perte_Kerosene_Attaquant, 'Petrole') + ' ( '+ Convert(Perte_Kerosene_Attaquant*0.6, 'Petrole') + ' avec Vladimir) '
			+ '</span>'
		+ '</td>'
		+ '<td></td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2" >'
			+ '<h2 class="battleReport" style="text-align:center">Depenses Totales:</h2>'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">' + Convert(Perte_Diesel_Attaquant * 7040 + Perte_Kerosene_Attaquant * 14080 + Perte_Munition_Attaquant * 10 + Perte_Argent_Unites_Attaquant, 'Argent') + '</td>'
		+ '<td style="text-align:right">' + Convert(Perte_Argent_Unites_Defenseur, 'Argent') + '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2" >'
			+ '<h2 class="battleReport" style="text-align:center">Ratios</h2>'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">' + Ratio2 +' hors ressources' + '</td>'
		+ '<td style="text-align:right">' + Ratio +' avec ressources'+ '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2" >'
			+ '<h2 class="battleReport" style="text-align:center">Points perdus</h2>'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td colspan="2" style="text-align:center">' + Convert(pts_perdus_total,'unite') + '</td>'
	+ '</tr>'
	+ '</table>'

//***********Affichage des graphiques******************
+'<div id="graph2">Oops ... ca bug !</div>'
+'<div id="graph">Oops ... ca bug !</div>';

	var myData = new Array(['Navale', puissance_att_navale, puissance_def_navale], ['Aérien', puissance_att_avion + puissance_att_heli, puissance_def_avion + puissance_def_heli], ['Terrestre', puissance_att_terrestre, puissance_def_terrestre], ['Sous-marin', puissance_att_sm, puissance_def_sm], ['Def fixe', puissance_att_deffixe, puissance_def_deffixe], ['Infanterie', puissance_att_inf, puissance_def_inf]);
	var myChart = new JSChart('graph', 'bar');
	myChart.setDataArray(myData);
	myChart.setTitle('Puissance d\'attaque par type d\'unité');
	myChart.setAxisNameX('');
	myChart.setAxisNameY('puissance');
	myChart.setGrid(false);
	myChart.setAxisValuesNumberY(2);
	myChart.setBarColor('#2D6B96', 1);
	myChart.setBarColor('#9CCEF0', 2);
	myChart.setBarValuesDecimals(1);
	myChart.setSize(450,400);
	myChart.setLegendShow(true);
	myChart.setLegendPosition('middle top');
	myChart.setLegendForBar(1, 'attaquant');
	myChart.setLegendForBar(2, 'defenseur');
	myChart.setTitleColor('#FFFFFF');
	myChart.setAxisNameColor('#CECECE');
	myChart.setAxisColor('#B5B5B5');
	myChart.setAxisValuesColor('#CECECE');
	myChart.setBarValuesColor('#CECECE');
	myChart.setTitleFontSize(16);
	myChart.setTitleFontFamily('Arial');
	myChart.draw();
	
	var myData2 = new Array(['Habitations', parseFloat(pts_perdus[1].toShortString())], ['Zones Commerciales', parseFloat(pts_perdus[2].toShortString())], ['Usines', parseFloat(pts_perdus[3].toShortString())], ['Mines', parseFloat(pts_perdus[4].toShortString())], ['Raffineries', parseFloat(pts_perdus[5].toShortString())]);
	var colors = ['#FACC00', '#FB9900', '#FB6600', '#FB4800', '#CB0A0A'];
	var myChart2 = new JSChart('graph2', 'pie');
	myChart2.setDataArray(myData2);
	myChart2.colorizePie(colors);
	myChart2.setTitle('Répartition des pts perdus/pris');
	myChart2.setTitleFontSize(16);
	myChart2.setTitleFontFamily('Arial');
	myChart2.setTitleColor('#FFFFFF');
	myChart2.setPieUnitsColor('#CECECE');
	myChart2.setPieUnitsOffset(0);
	myChart2.setPieValuesOffset(-40);
	myChart2.setPieRadius(100);
	myChart2.draw();	

//*************Suppression du lien*************
	
document.getElementsByTagName('a')[0].innerHTML='';