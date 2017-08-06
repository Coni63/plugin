// ==UserScript==
// @name           DO RE Info
// @author         Shaltar - Looki Corporation :)
// @description    Ajoute une petite fenêtre comportant des informations relatives aux espionnages...
// @include        http://static.*.desert-operations.com/world*/sb/*
// @version        1.00
//	
// ==/UserScript==

var Add = document.getElementsByTagName('table')[0];
var Temporaire = document.getElementsByTagName('td');
var Type = document.getElementsByTagName('h1');
var Unites_Stats = new Array();
var Unites_Nom = new Array();
var Qte = new Array();
var Argent_Unites = 0;
var Entretien = 0;
var IndiceJavaScript = 0;

Unites_Stats['Fantassin'] = new Array(120,0, 'Kérosène', 	1, 	1); 
Unites_Stats['Antichar'] = new Array(1150,0, 'Kérosène', 	12, 	9);
Unites_Stats['Paras'] = new Array(400,0, 'Kérosène', 	8, 	5); 
Unites_Stats['Commando de marine'] = new Array(2200,1, 'Diesel', 	18, 	17);
Unites_Stats['AMX-13 DCA'] = new Array(18000,4, 'Diesel', 	50, 	20);
Unites_Stats['AMX-30'] = new Array(35000,5, 'Diesel', 	55, 	30);
Unites_Stats['Lance-missile mobile'] = new Array(65000,8, 'Diesel', 	80, 	40);
Unites_Stats['Artillerie automotrice PzH2000'] = new Array(55000,			6, 'Diesel', 	60, 	35);
Unites_Stats['Leclerc 2'] = new Array(100000,		12, 'Diesel', 	100, 	75);
Unites_Stats['M1 Abrams'] = new Array(70.000,		8, 'Diesel', 	80, 	55);
Unites_Stats['T-90'] = new Array(85000,			10, 'Diesel', 	85, 	60);
Unites_Stats['Mil MI-24 Hind'] = new Array(75000,			8, 'Kérosène', 	50, 	22);
Unites_Stats['AH-64 Apache'] = new Array(60000,			6, 'Kérosène', 	45, 	18);
Unites_Stats['A-10 Thunderbolt'] = new Array(110000,		13, 'Kérosène', 	80, 	45);
Unites_Stats['Eurofighter Typhoon'] = new Array(85000,			11, 'Kérosène', 	60, 	35);
Unites_Stats['F22 Raptor'] = new Array(90000,			11, 'Kérosène', 	70, 	35);
Unites_Stats['F117A Nighthawk'] = new Array(120000,		14, 'Kérosène', 	100, 	50);
Unites_Stats['Rockwell B1'] = new Array(250000,		20, 'Kérosène', 	200, 	60);
Unites_Stats['Northrop B2 Spirit'] = new Array(2000000,		30, 'Kérosène', 	255, 	80);
Unites_Stats['Destroyer'] = new Array(70000,			9, 'Diesel', 	100, 	30);
Unites_Stats['Frégate de 2nd rang'] = new Array(500000,		18, 'Diesel', 	150, 	60);
Unites_Stats['Corvette'] = new Array(350000,		12, 'Diesel', 	140, 	50);
Unites_Stats['Porte-avions nucléaire'] = new Array(1500000,		25, 'Kérosène', 	220, 	90);
Unites_Stats['Sous-marin d attaque'] = new Array(800000,		20, 'Diesel', 	180, 	80);
Unites_Stats['Sous-marin lanceur d engins'] = new Array(1000000,		20, 'Diesel', 	200, 	80);
Unites_Stats['Champs de barbelés'] = new Array(20000,			0, 'Kérosène', 	0, 	0); 
Unites_Stats['Bunker'] = new Array(40000,			0, 'Kérosène', 	0, 	0); 
Unites_Stats['Champs de mines'] = new Array(250000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Batterie de Patriot'] = new Array(150000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Mines sous-marines'] = new Array(100000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Batteries de DCA'] = new Array(100000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Batteries côtières'] = new Array(200000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Eurocopter Tigre'] = new Array(80000,			8, 'Kérosène', 	50, 	30);
Unites_Stats['T-95 Black Eagle'] = new Array(170000,		10, 'Diesel', 	100, 	100);
Unites_Stats['B-52 Stratofortress'] = new Array(4000000,		50, 'Kérosène', 	255, 	140);
Unites_Stats['Frégate de 1er rang'] = new Array(1000000,		25, 'Diesel', 	200, 	120);
Unites_Stats['Destructeur de mines'] = new Array(45000,			6, 'Diesel', 	60, 	35);
Unites_Stats['Mil MI-28 Havoc'] = new Array(70000,			7, 'Kérosène', 	45, 	18);
Unites_Stats['Leopard 3'] = new Array(150000,		3, 'Diesel', 	100, 	40);
Unites_Stats['Grey Ghost'] = new Array(85000,		4, 'Kérosène', 70, 20);
Unites_Stats['Charles-de-Gaulle'] = new Array(2000000,		40, 'Kérosène', 250, 90);


function DelPoint(Nombre) {
	var	End = Nombre.replace(/\./g,'');
	End=parseInt(End);
	return End;
} 

function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
} 

function Convert(Quantite, Type) {
	if (Quantite < Math.pow(10,3)) {
		if (Type == 'Argent') { 
			Quantite += ' $';
		} else if (Type == 'Petrole') {
			Quantite += ' Litres';
		} else {
			Quantite += ' Caisses'; }
	} else if (Quantite < Math.pow(10,6)) {
		Quantite /= Math.pow(10,3);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' k';
	} else if (Quantite < Math.pow(10,9)) {
		Quantite /= Math.pow(10,6);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' m';
	} else if (Quantite < Math.pow(10,12)) {
		Quantite /= Math.pow(10,9);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' Md';
	} else if (Quantite < Math.pow(10,15)) {
		Quantite /= Math.pow(10,12);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' b';
	} else if (Quantite < Math.pow(10,18)) {
		Quantite /= Math.pow(10,15);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' B';
	} else if (Quantite < Math.pow(10,21)) {
		Quantite /= Math.pow(10,18);
		Quantite = Arrondir(Quantite,1);
		Quantite += (Type == 'Argent') ? ' Crésus' : ' t';
	}
	else if (Quantite < Math.pow(10,24)) {
		Quantite /= Math.pow(10,18);
		Quantite = Arrondir(Quantite,1);
		Quantite += (Type == 'Argent') ? ' Crésus' : ' t';
	}
	
	return Quantite; 
} 

if(Type[0].innerHTML=='Rapport d\'espionnage - Défense'){
	for (i = 3, c = Temporaire.length; i < c; i=i+2) {
		Unites_Nom[IndiceJavaScript] = Temporaire[i].innerHTML;
		Qte[IndiceJavaScript] = DelPoint(Temporaire[i+1].innerHTML);
		IndiceJavaScript++;
		}
}else {
	for (i = 3, c = Temporaire.length; i < c; i=i+3) {
		Unites_Nom[IndiceJavaScript] = Temporaire[i].innerHTML;
		Qte[IndiceJavaScript] = DelPoint(Temporaire[i+1].innerHTML);
		IndiceJavaScript++;
		}
}

for (i = 0, c = Unites_Nom.length; i < c; i++) {
	Argent_Unites += Qte[i] * Unites_Stats[Unites_Nom[i]][0];
	Entretien += Qte[i] * Unites_Stats[Unites_Nom[i]][4] * 6;
} 

Add.innerHTML +='<table>'
	+ '<tr><th colspan="2">Valeur défense</th></tr>'
	+ '<tr><td><span style="text-align:left">' + 'Total Unités en $' + '</span><span style="text-align:right; float:right;">' + Convert(Argent_Unites, 'Argent') + '</span></td></tr>'
	+ '<tr><td><span style="text-align:left">' + 'Entretiens horaire' +' </span><span style="text-align:right; float:right;">' + Convert(Entretien, 'Argent') + '</span></td></tr>'
	+ '</table>';
