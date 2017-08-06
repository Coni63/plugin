// ==UserScript==
// @name           DO RE Info
// @author         Shaltar - Looki Corporation :)
// @description    Ajoute une petite fenêtre comportant des informations relatives aux espionnages...
// @include        http://game.desert-operations.*/world*/spionageReport*
// @version        3.00
// @grant         GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
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
var Unit_Fight = new Array();
var Unit_Name = new Array();
var Unit_Display = new Array();

Unites_Stats['Fantassin'] = new Array(120,0, 'Kerosene', 	1, 	1,1,1, 'infanterie'); 
Unites_Stats['Antichar'] = new Array(1150,0, 'Kerosene', 	12, 	9,10,12, 'infanterie');
Unites_Stats['Paras'] = new Array(400,0, 'Kerosene', 	8, 	5,7,6, 'infanterie'); 
Unites_Stats['Commando de marine'] = new Array(2200,1, 'Diesel', 	18, 	17,20,15, 'infanterie');
Unites_Stats['AMX-13 DCA'] = new Array(18000,4, 'Diesel', 	50, 	20,60,120, 'terrestre');
Unites_Stats['AMX-30'] = new Array(35000,5, 'Diesel', 	55, 	30,180,160, 'terrestre');
Unites_Stats['Lance-missile mobile'] = new Array(65000,8, 'Diesel', 	80, 	40,600,200, 'terrestre');
Unites_Stats['Artillerie automotrice PzH2000'] = new Array(55000,			6, 'Diesel', 	60, 	35,350,325, 'terrestre');
Unites_Stats['Leclerc 2'] = new Array(100000,		12, 'Diesel', 	100, 	75,1250,700, 'terrestre');
Unites_Stats['M1A2 Abrams'] = new Array(70000,		8, 'Diesel', 	80, 	55,750,600, 'terrestre');
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
Unites_Stats['Champ de barbelés'] = new Array(20000,			0, 'Kerosene', 	0, 	0,0,100, 'defense'); 
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

Unit_Fight[1]=new Array(1,1,2,1,-1,-1,0,0,-1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,-1,-1,-1,-1,-1,0,-1,-1,0,0,0,0,-1,-1,-1,0,0,-1,-1,-1,0,-1,0,-1);
Unit_Fight[2]=new Array(1,1,2,1,-1,-1,0,0,-1,-1,-1,-1,-1,-1,-1,1,-1,-1,-1,0,0,0,-1,-1,-1,-1,-1,0,-1,-1,0,0,0,0,-1,-1,-1,0,0,1,-1,-1,0,-1,0,-1);
Unit_Fight[3]=new Array(-1,-1,0,-1,1,1,2,1,1,1,1,1,1,1,-1,1,1,1,-1,0,0,0,-1,-1,-1,-1,-1,0,-1,-1,0,0,0,0,-1,-1,-1,0,0,1,1,-1,0,-1,0,-1);
Unit_Fight[4]=new Array(1,1,2,1,-1,-1,2,-1,-1,-1,-1,-1,-1,-1,-1,1,1,-1,-1,0,0,0,-1,-1,-1,-1,-1,0,-1,-1,0,0,0,0,-1,-1,-1,0,0,1,1,-1,0,-1,0,1);
Unit_Fight[5]=new Array(2,2,1,2,1,1,0,-1,1,-1,-1,-1,-1,-1,-1,2,2,1,1,2,0,0,1,1,1,-1,2,2,1,-1,0,0,0,0,-1,1,1,0,-1,2,0,-1,0,-1,0,0);
Unit_Fight[6]=new Array(2,2,1,2,1,1,2,-1,2,1,1,-1,-1,-1,-1,0,-1,-1,-1,0,0,0,-1,-1,-1,-1,-1,0,-1,-1,0,0,0,0,-1,-1,-1,0,0,2,1,-1,0,0,0,0);
Unit_Fight[7]=new Array(0,0,-1,-1,0,-1,0,-1,0,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,0,0,0,-1,-1,-1,-1,-1,0,-1,-1,0,0,0,0,-1,-1,-1,0,0,1,0,2,0,0,0,0);
Unit_Fight[8]=new Array(0,0,1,2,2,2,2,1,1,-1,-1,-1,1,1,1,0,-1,-1,-1,0,0,0,-1,-1,-1,-1,-1,0,-1,-1,0,2,2,0,-1,1,1,0,0,2,1,-1,0,1,0,0);
Unit_Fight[9]=new Array(2,2,1,2,1,-1,0,1,1,-1,-1,-1,-1,-1,-1,0,1,1,-1,0,0,0,-1,-1,-1,-1,-1,0,-1,-1,0,0,0,0,-1,1,1,0,-1,2,1,2,0,0,2,1);
Unit_Fight[10]=new Array(0,2,1,2,2,1,2,2,2,1,1,1,-1,1,-1,0,0,-1,-1,0,0,0,-1,-1,-1,-1,-1,0,-1,0,0,0,0,0,-1,-1,-1,0,0,2,2,-1,0,1,0,1);
Unit_Fight[11]=new Array(0,2,1,2,2,1,2,2,2,1,1,1,-1,1,-1,0,0,-1,-1,0,0,0,-1,-1,-1,-1,0,0,-1,0,0,0,0,0,-1,-1,-1,0,0,2,2,-1,0,1,0,1);
Unit_Fight[12]=new Array(2,2,1,2,2,2,2,2,2,1,1,1,1,1,1,0,0,0,-1,0,0,0,-1,0,-1,-1,-1,0,-1,-1,0,0,0,0,-1,-1,-1,0,-1,2,2,-1,0,1,2,0);
Unit_Fight[13]=new Array(2,2,1,2,2,2,2,1,2,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,-1,-1,-1,0,-1,0,0,0,0,0,-1,-1,-1,0,-1,2,2,1,0,1,2,1);
Unit_Fight[14]=new Array(2,2,1,2,2,2,2,1,2,1,1,1,1,1,1,0,-1,-1,0,0,0,0,-1,0,-1,-1,0,0,-1,0,0,0,0,0,-1,-1,-1,0,-1,2,2,1,0,2,2,2);
Unit_Fight[15]=new Array(2,2,2,2,2,2,2,1,2,2,2,1,1,1,1,0,-1,0,-1,0,0,0,0,0,-1,-1,0,0,0,0,0,0,0,0,-1,-1,-1,0,-1,2,2,1,0,2,2,1);
Unit_Fight[16]=new Array(2,1,1,1,-1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,-1,-1,-1,0,0,0,0,-1,0,0,0,0,-1,-1,0,0,-1,-1,0,-1,2,0,0,0,-1,-1,0);
Unit_Fight[17]=new Array(2,2,1,1,-1,2,2,2,1,0,0,0,0,2,2,1,1,0,-1,-1,-1,-1,0,0,0,0,-1,-1,2,0,0,1,1,0,0,1,-1,0,-1,2,2,0,0,-1,-1,0);
Unit_Fight[18]=new Array(2,2,1,2,1,2,2,2,1,2,2,0,0,2,0,0,0,0,1,-1,-1,-1,0,0,0,0,1,0,0,2,0,1,1,0,0,-1,-1,0,-1,2,2,0,0,1,1,0);
Unit_Fight[19]=new Array(2,2,2,2,1,2,2,2,2,2,2,2,0,0,2,1,2,1,1,-1,-1,-1,-1,0,0,0,1,0,0,0,0,-1,-1,0,-1,-1,-1,1,0,2,2,0,0,1,1,1);
Unit_Fight[20]=new Array(0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,2,2,2,2,1,1,1,2,2,2,0,1,-1,2,0,0,1,1,0,0,-1,-1,-1,0,0,0,0,0,-1,-1,0);
Unit_Fight[21]=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,1,1,1,2,2,2,2,1,1,2,0,0,-1,-1,0,0,1,1,-1,0,0,0,0,0,0,-1,0);
Unit_Fight[22]=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,1,1,1,2,2,2,2,0,1,2,0,0,-1,-1,0,0,1,1,-1,0,0,0,0,0,0,-1,0);
Unit_Fight[23]=new Array(2,2,2,2,1,2,2,2,2,2,2,2,0,2,0,0,0,0,2,-1,-1,-1,0,0,0,0,-1,-1,0,0,0,1,1,0,0,-1,0,1,0,2,2,0,0,1,1,2);
Unit_Fight[24]=new Array(2,2,2,2,1,2,2,2,2,2,2,0,0,0,0,0,0,0,0,-1,-1,-1,0,0,0,0,-1,-1,0,2,0,-1,-1,0,0,1,1,1,0,2,2,0,0,2,1,0);
Unit_Fight[25]=new Array(2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,0,0,0,0,-1,-1,-1,0,0,0,0,0,-1,0,2,2,1,1,0,0,1,-1,1,2,2,2,2,0,2,1,1);
Unit_Fight[26]=new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,-1,-1,0,0,0,0,0,0,0,2,2,1,1,2,2,2,1,2,2,2,0,2,2,2,1,2);
Unit_Fight[27]=new Array(2,2,2,2,-1,2,2,2,2,2,0,2,2,0,0,2,2,1,1,1,1,0,2,2,0,0,1,-1,0,0,2,1,0,0,0,-1,-1,-1,0,0,0,0,0,0,0,0);
Unit_Fight[28]=new Array(0,0,0,0,-1,0,0,0,0,0,0,0,0,0,0,0,2,0,0,2,1,1,2,2,2,0,2,1,2,0,0,1,1,0,0,2,1,-1,1,0,0,0,0,1,1,0);
Unit_Fight[29]=new Array(2,2,2,2,1,2,2,2,2,2,2,2,2,2,0,0,-1,0,0,-1,-1,-1,0,0,0,0,0,-1,0,2,2,2,2,0,2,1,0,1,2,2,2,2,2,2,2,2);
Unit_Fight[30]=new Array(2,2,2,2,2,2,2,2,2,0,0,2,0,0,0,0,0,-1,0,0,0,0,0,-1,-1,-1,0,0,-1,1,2,1,1,-1,0,-1,-1,2,1,2,2,2,-1,0,0,-1);
Unit_Fight[31]=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,0,-1,-1,0,-1,-1,-1,0,0,0,-1,-1,0,0,0,2,0,0,0);
Unit_Fight[32]=new Array(0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,2,1,1,2,1,2,2,1,2,1,1,1,1,-1,1,2,1,1,1,2,1,-1,1,1,0,0,0,1,0,0,1);
Unit_Fight[33]=new Array(0,0,0,0,0,0,0,-1,0,0,0,0,0,0,0,2,1,1,2,1,2,2,1,2,1,1,0,1,-1,1,2,1,1,1,2,1,-1,1,1,0,0,0,1,0,0,1);
Unit_Fight[34]=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,2,2,1,1,1,2,1,2,1,2,0,0,0,1,0,0,0);
Unit_Fight[35]=new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,2,0,0,0,0,0,0,-1,0,0,-1,0,0,-1,-1,-1,0,0,0,-1,2,2,2,2,-1,0,2,0);
Unit_Fight[36]=new Array(2,2,2,2,1,2,2,1,1,2,2,2,2,2,2,2,1,2,2,2,1,1,2,1,1,-1,2,-1,1,2,0,1,1,1,0,1,1,1,1,2,2,0,1,1,1,1);
Unit_Fight[37]=new Array(2,2,2,2,1,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,1,1,0,1,2,1,2,1,0,2,0,2,2,-1,0,1,1,1,1,0,0,0,1,1,1,1);
Unit_Fight[38]=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,2,2,1,1,1,-1,2,2,1,-1,2,1,1,1,2,1,1,1,1,0,0,0,1,0,0,1);
Unit_Fight[39]=new Array(0,0,0,0,2,0,0,0,2,0,0,2,2,2,2,2,2,2,0,0,0,0,0,0,-1,-1,0,1,-1,1,2,1,1,-1,-1,1,1,1,0,0,2,2,-1,2,2,1);
Unit_Fight[40]=new Array(2,1,1,1,-1,-1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,-1,-1,-1,-1,0,0,-1,-1,0,0,0,0,-1,-1,0,0,0,0,0,0,0,0,0,0);
Unit_Fight[41]=new Array(2,2,1,1,0,1,0,1,1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,0,0,0,-1,-1,-1,0,0,0,-1,-1,0,0,0,0,-1,-1,0,0,-1,0,0,0,0,0,0,0);
Unit_Fight[42]=new Array(2,2,2,2,2,2,-1,2,-1,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0,-1,-1,0,0,-1,-1,0,0,0,0,-1,0,0,0,-1,0,0,0,0,0,0,0);
Unit_Fight[43]=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,0,0,-1,2,-1,1,1,1,2,1,1,1,2,0,0,0,0,0,0,0);
Unit_Fight[44]=new Array(2,2,2,2,2,0,0,1,0,1,1,1,1,-1,-1,2,2,1,1,2,0,0,1,-1,-1,-1,0,1,-1,0,0,0,0,0,0,1,1,0,-1,0,0,0,0,0,0,0);
Unit_Fight[45]=new Array(0,0,0,0,0,0,0,0,-1,0,0,-1,-1,-1,-1,2,2,1,1,2,2,2,1,1,1,1,0,1,-1,0,0,0,0,0,-1,1,1,0,-1,0,0,0,0,0,0,0);
Unit_Fight[46]=new Array(2,2,2,1,0,0,0,0,1,1,1,0,1,-1,1,0,0,0,1,0,0,0,-1,0,1,-1,0,0,-1,2,0,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0);

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
Unit_Name[46]='Batterie côtière';

Unit_Display['Fantassin'] = true;
Unit_Display['Antichar'] = true;
Unit_Display['Paras'] = true;
Unit_Display['Commando de marine'] = true;
Unit_Display['AMX-13 DCA'] = true;
Unit_Display['AMX-30'] = true;
Unit_Display['Lance-missile mobile'] = true;
Unit_Display['Artillerie automotrice PzH2000'] = true;
Unit_Display['Leclerc 2'] = true;
Unit_Display['M1A2 Abrams'] = true;
Unit_Display['T-90'] = true;
Unit_Display['Mil MI-24 Hind'] = true;
Unit_Display['AH-64 Apache'] = true;
Unit_Display['A-10 Thunderbolt'] = true;
Unit_Display['Eurofighter Typhoon'] = true;
Unit_Display['F22 Raptor'] = true;
Unit_Display['F117A Nighthawk'] = true;
Unit_Display['Rockwell B1'] = true;
Unit_Display['Northrop B2 Spirit'] = true;
Unit_Display['Destroyer Type 333'] = true;
Unit_Display['Frégate de 2nd rang'] = true;
Unit_Display['Corvette K130'] = true;
Unit_Display['Porte-avions nucléaire'] = true;
Unit_Display['Sous-marin d\'attaque'] = true;
Unit_Display['Sous-marin lanceur d\'engins'] = true;
Unit_Display['Champ de barbelés'] = true;
Unit_Display['Bunker'] = true;
Unit_Display['Champ de mines'] = true;
Unit_Display['Batterie de Patriots'] = true;
Unit_Display['Mines sous-marines'] = true;
Unit_Display['Batterie de DCA'] = true;
Unit_Display['Batterie côtière'] = true;
Unit_Display['Eurocopter Tigre'] = true;
Unit_Display['T-95 Black Eagle'] = true;
Unit_Display['B-52 Stratofortress'] = true;
Unit_Display['Frégate de 1er rang'] = true;
Unit_Display['Destructeur de mines'] = true;
Unit_Display['Mil MI-28 Havoc'] = true;
Unit_Display['Leopard 3'] = true;
Unit_Display['Grey Ghost'] = true;
Unit_Display['Porte-avions Charles de Gaulle'] = true;
Unit_Display['Houbei Class Missile Boat'] = true;
Unit_Display['Croiseur IOWA Classe B'] = true;
Unit_Display['J16 \"Red Eagle\"'] = true;
Unit_Display['Embraer EMB 314 Super Tucano'] = true;
Unit_Display['MBT 3000'] = true;

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

var nmbDgt=7,valMax=Math.pow(10,7),valLim=43;// pour ajouter des doubles produits dans sqt
String.prototype.toDgt=function(){var s=this;while(s.length<nmbDgt) s='0'+s;return s}

function price(qte,type){
if(type=='kéro'){return qte*4003;} else {return qte*2002;}
}

function Big(n){
   if (n instanceof Big) {this._s=Boolean(n._s);this._a=n._a.slice();return;}
   n=n?''+n:'0';
    if (/[^\d\s.e+-]/gi.test(n+='')) throw 'Illegal integer !\n'+n;
   n=n.replace(/\s+/g,'');
   if (this._s=(n.charAt(0)=="-")) n=n.substr(1);
   this._a=[];
    var e=0;n.replace(/([^e]+)(e(\+|\-)?([\d]+))/i,function(a,mn,st,sg,ex){var s=1;n=mn;if (!!sg) s=sg=='+'?1:-1;e=s*ex});
   var s=(n=n.split('.'))[0].replace(/^0+/,'')||'0',t=1<n.length?n[1]:'0';
   if (e<0) s=s.substr(0,s.length+e)||'0';
   if (0<e) {t=t+new Array(e).join(0);s=s+t.substr(0,e)}
   var ln=0,d,e,f;
    while (0<(d=s.length)) {e=nmbDgt<d?(d-nmbDgt):0;f=s.substr(e);f=f.replace(/^0+(?!$)/,'');
        this._a[ln++]=+f;s=s.substring(0,e)}
}
 
with({k:Big.prototype}){
    k.str=function(){var s='',o=this,i=o._a.length;
        while (0<i) s+=(''+o._a[--i]).toDgt();
        return (o._s?'-':'')+s.replace(/^0+(?!$)/,'');
    };
    k.toString=function(){
       return this.str().replace(/([\d])(?=((\d{7,7})+)$)/g,"$1 ");
    };
}

Number.prototype.toShortString=function(){return (''+this).replace(/([\d\.]+)(?=e)/,function(a,b){return (+b).toFixed(2)})}

Number.prototype.ifcont=function(continuer){
	if (continuer == false){
		return 0;
	} else {
		return this;
	}
}

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
	for(i=1;i<47;i++){
		if (Unit_Name[i]==this){return i;}
	}
}

String.prototype.toShortName=function(){
	if(this=='Diesel'){
		return 'diesel';
	} else {
		return 'kéro';
	}
}

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
		Quantite += ''; 
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
	}else if (Quantite < Math.pow(10,45)) {
		Quantite /= Math.pow(10,42);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' mC²';
	}else if (Quantite < Math.pow(10,48)) {
		Quantite /= Math.pow(10,45);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' MC²';
	}else if (Quantite < Math.pow(10,51)) {
		Quantite /= Math.pow(10,48);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' bC²';
	}else if (Quantite < Math.pow(10,54)) {
		Quantite /= Math.pow(10,51);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' BC²';
	}else if (Quantite < Math.pow(10,57)) {
		Quantite /= Math.pow(10,54);
		Quantite = Arrondir(Quantite,2);
		Quantite += ' C<sup>3</sup>';
	}
	return Quantite; 
} 

function opposant(Nom_unitee,Qte){
	var indice=0;
	var possibilite=new Array();
	var numero = Nom_unitee.getId();
		for(i=1;i<47;i++){//pour chaque unité qui peuvent lui faire opposition
			if(Unit_Fight[numero][i-1]=='-1' && Unites_Stats[Unit_Name[i]][7]!='defense'&& Unit_Display[Unit_Name[i]]==true){ // fleche verte
				
				var necessaire=Math.ceil(Qte*Unites_Stats[Nom_unitee][6]/Unites_Stats[Unit_Name[i]][5]);
				var perdu = 0;
				var cout_achat = necessaire * Unites_Stats[Unit_Name[i]][0];
				var cout_perdu = 0;
				var conso = necessaire*Unites_Stats[Unit_Name[i]][1];
				var type_pet=Unites_Stats[Unit_Name[i]][2].toShortName();
				var cout_pet=price(conso,type_pet);
				possibilite[indice]=[Unit_Name[i],necessaire, perdu, cout_achat, cout_perdu, conso, type_pet, cout_pet];
				indice++; 
			} else if (Unit_Fight[numero][i-1]=='1'&& Unites_Stats[Unit_Name[i]][7]!='defense'&& Unit_Display[Unit_Name[i]]==true){ //si combat egalitaire
				var necessaire=Math.ceil(Qte*Unites_Stats[Nom_unitee][6]/Unites_Stats[Unit_Name[i]][5]);
				var perdu = Math.ceil(necessaire);
				var cout_achat = necessaire * Unites_Stats[Unit_Name[i]][0];
				var cout_perdu = cout_achat;
				var conso = necessaire*Unites_Stats[Unit_Name[i]][1];
				var type_pet=Unites_Stats[Unit_Name[i]][2].toShortName();
				var cout_pet=price(conso,type_pet);
				possibilite[indice]=[Unit_Name[i],necessaire, perdu, cout_achat, cout_perdu, conso, type_pet, cout_pet];
				indice++;
			}
		}
		
	return possibilite; //on retourne le tableau
}

function MeP(tab, ref, nom, qte){
//création d'un div par tableau
var layout = document.createElement('div');
	layout.id='Mep_tab'+ref;
//insertion d'un titre de tableau
var unit_concernee = document.createElement('div');
	unit_concernee.innerHTML='</br>Pour contrer les '+Convert(qte,'unite')+' de '+nom;
	unit_concernee.style.cssText = 'font-size:15px;';
//creation du tableau
var tableau2=document.createElement('table');
	tableau2.id='affichage'+ref;
	tableau2.className='battleReport';
	tableau2.style.cssText = 'font-size:10px;'
//mise en place des titre
var titre = document.createElement('tr');
	titre.id='titre';
	titre.style.cssText = 'Text-align:center;';
	titre.innerHTML='<th>Unités</th><th>&nbsp;Qté nécessaire&nbsp;</th><th>&nbsp;Qté perdue&nbsp;</th><th>&nbsp;Prix à l\'achat&nbsp;</th><th>&nbsp;Argent perdu &nbsp;</th><th>&nbsp;Consommation &nbsp;</th><th>&nbsp;Cout en pétrole &nbsp;</th>';

document.getElementById('global_layout').appendChild(layout); //on insère chaque tableau dans le div unique d'affichage
layout.appendChild(unit_concernee); // on insère le titre de chaque tableau
layout.appendChild(tableau2); //on insère un tableau
document.getElementById('affichage'+ref).appendChild(titre); //dans ce tableau on place les titres

for(k=0;k<tab.length;k++){ // pour chaque unité on crée une nouvealle ligne
	var ligne = document.createElement('tr');
	ligne.style.cssText = 'Text-align:right;';
	ligne.innerHTML='<td>'+tab[k][0]+'</td><td>'+Convert(tab[k][1],'unite')+'</td><td>'+Convert(tab[k][2],'unite')+'</td><td>'+Convert(tab[k][3],'Argent')+'</td><td>'+Convert(tab[k][4],'Argent')+'</td><td>'+Convert(tab[k][5],'Petrole')+' '+tab[k][6]+'</td><td>'+Convert(tab[k][7],'Argent')+'</td>';
	document.getElementById('affichage'+ref).appendChild(ligne);//chaque lignes sont insérées dans le tableau
}

//on cherche les minimums
var index_min_pet = 0;
var qte_min_pet=1e+100;
for (l=0;l<tab.length;l++){
	if(tab[l][7]<qte_min_pet && tab[l][7]!=0){
		var index_min_pet = l;
		var qte_min_pet=tab[l][7];
	}
}

var index_achat_min = 0;
var prix_achat_min=1e+100;
for (l=0;l<tab.length;l++){
	if(tab[l][3]<prix_achat_min){
		var index_achat_min = l;
		var prix_achat_min=tab[l][3];
	}
}

var index_perte_min = 0;
var argent_perdu_min=1e+100;
for (l=0;l<tab.length;l++){
		if(tab[l][3]<argent_perdu_min && tab[l][4]==0){
		var index_perte_min = l;
		var argent_perdu_min=tab[l][3];
	}
}


//on colorie selon les minimums
tableau2.getElementsByTagName('tr')[index_min_pet+1].style.color='#FF0000';
tableau2.getElementsByTagName('tr')[index_achat_min+1].style.color='#0000FF';
tableau2.getElementsByTagName('tr')[index_perte_min+1].style.color='#00FF00';

if(index_min_pet==index_achat_min){
tableau2.getElementsByTagName('tr')[index_min_pet+1].style.color='#FF00FF';
}
if(index_min_pet==index_perte_min){
tableau2.getElementsByTagName('tr')[index_min_pet+1].style.color='#FFFF00';
}
if(index_perte_min==index_achat_min){
tableau2.getElementsByTagName('tr')[index_achat_min+1].style.color='#00FFFF';
}
if((index_perte_min==index_achat_min) && (index_achat_min == index_min_pet)){
tableau2.getElementsByTagName('tr')[index_min_pet+1].style.color='#000000';
}

return tableau2.innerHTML; //on renvoi le tableau pour affichage
}

function load_pref(){
	for (i=1;i<47;i++){
		Unit_Display[Unit_Name[i]]=GM_getValue('pref'+Unit_Name[i], true);//Unit_Display[Unit_Name[i]]);
	}
}

load_pref();

if(Type[0].innerHTML=='Rapport d\'espionnage - Défense'){
	for (i = 0, c = Temporaire.length; i < c; i=i+2) {
		Unites_Nom[IndiceJavaScript] = Temporaire[i].innerHTML;
		Qte[IndiceJavaScript] = DelPoint(Temporaire[i+1].innerHTML);
		Temporaire[i+1].innerHTML=Convert(DelPoint(Temporaire[i+1].innerHTML),'argent');
		IndiceJavaScript++;
		}
}else if(Type[0].innerHTML=='Rapport d\'espionnage - Unités'){
	for (i = 0, c = Temporaire.length; i < c; i=i+3) {
		Unites_Nom[IndiceJavaScript] = Temporaire[i].innerHTML;
		Qte[IndiceJavaScript] = DelPoint(Temporaire[i+1].innerHTML);
		Temporaire[i+1].innerHTML=Convert(DelPoint(Temporaire[i+1].innerHTML),'argent');
		IndiceJavaScript++;
		}
}else if(Type[0].innerHTML=='Rapport d\'espionnage - Ressources'){
	for (i = 0, c = Temporaire.length; i < c; i=i+2) {
		Unites_Nom[IndiceJavaScript] = Temporaire[i].innerHTML;
		Qte[IndiceJavaScript] = DelPoint(Temporaire[i+1].innerHTML);
		Temporaire[i+1].innerHTML=Convert(DelPoint(Temporaire[i+1].innerHTML),'argent');
		IndiceJavaScript++;
		}
}

for (i = 0, c = Unites_Nom.length; i < c; i++) {
	Argent_Unites += Qte[i] * Unites_Stats[Unites_Nom[i]][0];
	Entretien += Qte[i] * Unites_Stats[Unites_Nom[i]][4] * 6;
} 

Add.innerHTML +='<table class="battleReport" width="100%">'
	+ '<tr>'
		+ '<th colspan="3">'
			+'<h2 class="battleReport" style="text-align:center">Valeurs défense</h2>'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">Total Unités en $</td>'
		+ '<td style="text-align:right">' + Convert(Argent_Unites, 'Argent') + '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">Entretiens horaire</td>' 
		+ '<td style="text-align:right">' + Convert(Entretien, 'Argent')+ '</td>'
	+ '</tr>'
	+'</table>';

//partie RC SIMU
	
function toggler(elem){
	if(elem.checked){
	document.getElementById('global_layout').style.display = 'block';
	document.getElementById('legende').style.display = 'block';
	} else {
	document.getElementById('global_layout').style.display = 'none';
	document.getElementById('legende').style.display = 'none';
	}
}

//création de la checkbox rc_simu

var titre3=document.createElement('h2');
titre3.className='battleReport tableHeader';
titre3.innerHTML='Rapport de Simulation :';

var btn_see=document.createElement('input');
	btn_see.type="checkbox"
	btn_see.name="afficher le résultat"
	btn_see.id='chkbx';
	btn_see.onclick =function(){toggler(this);};
	
//ajout du texte
var texte=document.createElement("div");
texte.innerHTML="Voir les unités possibles";
texte.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';

document.getElementById('report').firstChild.firstChild.appendChild(titre3);
document.getElementById('report').firstChild.firstChild.appendChild(btn_see);	
document.getElementById('report').firstChild.firstChild.appendChild(texte);

//création de la légende

var legende=document.createElement('table');
legende.style.fontSize="10px";
legende.style.width="100%";
legende.className='battleReport';
legende.innerHTML='<th colspan="2" style="text-align:center">Légende</th>'
+'<tr><td width="20" bgcolor="#FF0000"></td><td>Unité avec consommation minimale (hors infanterie)</td></tr>'
+'<tr><td width="20" bgcolor="#0000FF"></td><td>Unité la moins chère</td></tr>'
+'<tr><td width="20" bgcolor="#00FF00"></td><td>Unité non détruite la moins chère</td></tr>'
+'<tr><td width="20" bgcolor="#FF00FF"></td><td>Unité la moins chère et consommation minimale</td></tr>'
+'<tr><td width="20" bgcolor="#FFFF00"></td><td>Unité non détruite la moins chère et consommation minimale</td></tr>'
+'<tr><td width="20" bgcolor="#00FFFF"></td><td>Unité la moins chère et non détruite</td></tr>'
+'<tr><td width="20" bgcolor="#000000"></td><td>Unité la moins chère, non détruite et consommation minimale</td></tr>';
legende.id='legende';
legende.style.display='none';

document.getElementById('report').firstChild.firstChild.appendChild(legende)

//div unique d'affichaque tableau
var global_layout = document.createElement('div');
	global_layout.id='global_layout';
	global_layout.style.display='none';
	
document.getElementById('report').firstChild.firstChild.appendChild(global_layout);	

//****************Calcul des unités****************

/*

//ajout de la collone sur les unités du défenseur
var colonne2 = document.createElement('th');
		colonne2.innerHTML='Info';
		colonne2.id='test';
		Temporaire_def[0].appendChild(colonne2);
		
*/
		
var resultat=new Array();
var test=new Array();

for (a = 0, c = Unites_Nom.length ; a < c; a++){
	
		resultat[a]=opposant(Unites_Nom[a], Qte[a]);//on cherche les unités et qté necessaire à les battre
		
		MeP(resultat[a],a,Unites_Nom[a],Qte[a]);
		
		/*
		//on rajoute la colonne à cette ligne
		var colonne = document.createElement('td');
		colonne.id='line'+a;
		Temporaire_def[a].appendChild(colonne);
		
		//on insère le logo de livre
		var oImg=document.createElement("img");
		oImg.src = "images/classic/icons/report.png";
		oImg.style.cssText = 'width:16px;height:16px;';
		oImg.id=a;
		oImg.className='showTooltipDefault';
		oImg.title=MeP(resultat[a],a,Unites_Defenseur_Nom[a],Unites_Defenseur_Fin[a]);
		
		document.getElementById('line'+a).appendChild(oImg);*/
	
}

//***************calcul des troupes necessaires***************

//***********Mise en page*******************

var count=0;

function control_neg(besoin, reserve, continuer){
	if (besoin>reserve && continuer == true){
		return besoin-reserve;
	} else {
		return 0;
	}
}

function controle_reserve(besoin, reserve){
	if (besoin<reserve){
		return reserve-besoin;
	} else {
		return 0;
	}
}

function controle_cons(besoin, reserve){
	if (besoin<reserve){
		return reserve;
	} else {
		return besoin;
	}
}

function controle_perte(besoin, reserve, continuer){
	if (continuer==true){
		return besoin;
	} else {
		return reserve;
	}
}

function clear(){

	document.getElementById('div_result_simu').innerHTML='';//effacage du div global d'affichage
	
	div_result_simu.style.display='none'; //on le cache
	
	//on recréer la mise en page des tableaux pour un affichage lors de compute()
	var titre_att=document.createElement('h2');
	titre_att.className='battleReport tableHeader';
	titre_att.innerHTML='Unités Attaquant :';

	var rc_att=document.createElement('table');
	rc_att.style.fontSize="15px";
	rc_att.style.width="100%";
	rc_att.id='rc_att';
	rc_att.className='battleReport';
	rc_att.innerHTML='<th>Unités</th><th>Quantité</th><th>Restantes</th><th>Anéanties</th>';

	var titre_def=document.createElement('h2');
	titre_def.className='battleReport tableHeader';
	titre_def.innerHTML='Unités Défenseur :';

	var rc_def=document.createElement('table');
	rc_def.style.fontSize="15px";
	rc_def.style.width="100%";
	rc_def.id='rc_def';
	rc_def.className='battleReport';
	rc_def.innerHTML='<th>Unités</th><th>Quantité</th><th>Restantes</th><th>Anéanties</th>';

	div_result_simu.appendChild(titre_att);
	div_result_simu.appendChild(rc_att);	
	div_result_simu.appendChild(titre_def);
	div_result_simu.appendChild(rc_def);
	
}

function delete_last(num){

clear();
document.getElementById('list_global').getElementsByTagName('select')[num-1].remove();
document.getElementById('list_global').getElementsByTagName('p')[num-1].remove();

count--;
}

function add_list(){

count++;

var soustitre=document.createElement('p');
//soustitre.className='battleReport tableHeader';
soustitre.innerHTML='Unité '+count+' :';

var newList= document.createElement('select');
newList.id='liste'+count;

var option=new Array();
var compteur = 0;
for (var i=1, il = Unit_Name.length; i < il; i ++) {
	if(Unit_Display[Unit_Name[i]]==true){
		option[compteur] = document.createElement('option');
		option[compteur].value = i;
		option[compteur].text = Unit_Name[i];
		newList.appendChild(option[compteur]);
		compteur++;
	}
}

option[0].selected="selected";

list_global.appendChild(soustitre);
list_global.appendChild(newList);

}

function check_if_need(index_att, index_def, max_def, unit_att, unit_def){
var continuer= false;
	for ( az = index_def;az<max_def;az++){ // pour chaque unités un controle qu'il faudra encore qu'elle se batte avec des unités du défenseur
		if(Unit_Fight[unit_att[index_att][0].getId()][unit_def[az][0].getId()-1]=='1' || Unit_Fight[unit_att[index_att][0].getId()][unit_def[az][0].getId()-1]=='2'){
			continuer=true;
		}
	}
return continuer;
}

function NTB_commerce(){

var Stock = new Array();
		
		Stock['Fantassin'] = 0;
		Stock['Antichar'] = 0;
		Stock['Paras'] = 0;
		Stock['Commando de marine'] = 0;
		Stock['AMX-13 DCA'] = 0;
		Stock['AMX-30'] = 0;
		Stock['Lance-missile mobile'] = 0;
		Stock['Artillerie automotrice PzH2000'] = 0;
		Stock['Leclerc 2'] = 0;
		Stock['M1A2 Abrams'] = 0;
		Stock['T-90'] = 0;
		Stock['Mil MI-24 Hind'] = 0;
		Stock['AH-64 Apache'] = 0;
		Stock['A-10 Thunderbolt'] = 0;
		Stock['Eurofighter Typhoon'] = 0;
		Stock['F22 Raptor'] = 0;
		Stock['F117A Nighthawk'] = 0;
		Stock['Rockwell B1'] = 0;
		Stock['Northrop B2 Spirit'] = 0;
		Stock['Destroyer Type 333'] = 0;
		Stock['Frégate de 2nd rang'] = 0;
		Stock['Corvette K130'] = 0;
		Stock['Porte-avions nucléaire'] = 0;
		Stock['Sous-marin d\'attaque'] = 0;
		Stock['Sous-marin lanceur d\'engins'] = 0;
		Stock['Champ de barbelés'] = 0;
		Stock['Bunker'] = 0;
		Stock['Champ de mines'] = 0;
		Stock['Batterie de Patriots'] = 0;
		Stock['Mines sous-marines'] = 0;
		Stock['Batterie de DCA'] = 0;
		Stock['Batterie côtière'] = 0;
		Stock['Eurocopter Tigre'] = 0;
		Stock['T-95 Black Eagle'] = 0;
		Stock['B-52 Stratofortress'] = 0;
		Stock['Frégate de 1er rang'] = 0;
		Stock['Destructeur de mines'] = 0;
		Stock['Mil MI-28 Havoc'] = 0;
		Stock['Leopard 3'] = 0;
		Stock['Grey Ghost'] = 0;
		Stock['Porte-avions Charles de Gaulle'] = 0;
		Stock['Houbei Class Missile Boat'] = 0;
		Stock['Croiseur IOWA Classe B'] = 0;
		Stock['J16 \"Red Eagle\"'] = 0;
		Stock['Embraer EMB 314 Super Tucano'] = 0;
		Stock['MBT 3000'] = 0;

var Ref_commerce = new Array();
		
		Ref_commerce['Fantassin'] = 1;
		Ref_commerce['Antichar'] = 2;
		Ref_commerce['Paras'] = 3;
		Ref_commerce['Commando de marine'] = 4;
		Ref_commerce['AMX-13 DCA'] = 5;
		Ref_commerce['AMX-30'] = 6;
		Ref_commerce['Lance-missile mobile'] = 7;
		Ref_commerce['Artillerie automotrice PzH2000'] = 8;
		Ref_commerce['Leclerc 2'] = 9;
		Ref_commerce['M1A2 Abrams'] = 10;
		Ref_commerce['T-90'] = 11;
		Ref_commerce['Mil MI-24 Hind'] = 12;
		Ref_commerce['AH-64 Apache'] = 14;
		Ref_commerce['A-10 Thunderbolt'] = 15;
		Ref_commerce['Eurofighter Typhoon'] = 16;
		Ref_commerce['F22 Raptor'] = 17;
		Ref_commerce['F117A Nighthawk'] = 18;
		Ref_commerce['Rockwell B1'] = 19;
		Ref_commerce['Northrop B2 Spirit'] = 20;
		Ref_commerce['Destroyer Type 333'] = 21;
		Ref_commerce['Frégate de 2nd rang'] = 22;
		Ref_commerce['Corvette K130'] = 23;
		Ref_commerce['Porte-avions nucléaire'] = 25;
		Ref_commerce['Sous-marin d\'attaque'] = 26;
		Ref_commerce['Sous-marin lanceur d\'engins'] = 27;
		Ref_commerce['Eurocopter Tigre'] = 39;
		Ref_commerce['T-95 Black Eagle'] = 40;
		Ref_commerce['B-52 Stratofortress'] = 41;
		Ref_commerce['Frégate de 1er rang'] = 42;
		Ref_commerce['Destructeur de mines'] = 43;
		Ref_commerce['Mil MI-28 Havoc'] = 44;
		Ref_commerce['Leopard 3'] = 45;
		Ref_commerce['Grey Ghost'] = 46;
		Ref_commerce['Porte-avions Charles de Gaulle'] = 47;
		Ref_commerce['Houbei Class Missile Boat'] = 51;
		Ref_commerce['Croiseur IOWA Classe B'] = 48;
		Ref_commerce['J16 \"Red Eagle\"'] = 50;
		Ref_commerce['Embraer EMB 314 Super Tucano'] = 52;
		Ref_commerce['MBT 3000'] = 49;
		
//récup de la page reserve
		
		GM_xmlhttpRequest({
		  method: "GET",
		  synchronous:true,
		  url: 'http://game.desert-operations.fr/world1/militaer.php',
		  onload: function(response){
		  Myscript(response.responseText);
		  }
		});


	function Myscript(text){	
		
	//calcul de la reserve
		var dom_army = document.createElement('div');
		dom_army.id='test';
		dom_army.innerHTML=text;
		
		var armee_123=dom_army.getElementsByClassName('milTableContainer')[0];
		
		for (li = 0; li<armee_123.getElementsByClassName('alignLeft').length-15;li++){
			Nom=armee_123.getElementsByClassName('alignLeft')[li].firstChild.innerHTML;
			Qte2=DelPoint(armee_123.getElementsByClassName('alignRight')[li].getElementsByTagName('span')[0].title);
			Stock[Nom]+=Qte2;
		}
		
		var reserve = dom_army.getElementsByClassName('milTableContainer')[2].getElementsByTagName('tr');
		
		for (li2=3;li2<reserve.length-2;li2++){
			Nom2=reserve[li2].getElementsByClassName('alignLeft')[0].firstChild.innerHTML;
			Qte3=DelPoint(reserve[li2].getElementsByClassName('milCell')[0].getElementsByTagName('span')[0].title);
			Stock[Nom2]+=Qte3;
		}
	
	//récupération du besoin dans le rc simulé
	var Nom2 = new Array();
	var Qte2 = new Array();
	var arme_simu = document.getElementById('rc_att');
	
	for (ik =1;ik<arme_simu.getElementsByTagName('tr').length;ik++){
		Nom2[ik] = arme_simu.getElementsByTagName('tr')[ik].getElementsByTagName('td')[0].innerHTML;
		Qte2[ik] = DelPoint(arme_simu.getElementsByTagName('tr')[ik].getElementsByTagName('span')[0].title);
	}
	
	//mise en place du tableau
	
	var titre_commerce=document.createElement('h2');
	titre_commerce.className='battleReport tableHeader';
	titre_commerce.innerHTML='Récapitulatif des besoins :';

	var recap=document.createElement('table');
	recap.style.fontSize="15px";
	recap.style.width="100%";
	recap.id='recap';
	recap.className='battleReport';
	recap.innerHTML='<th>Unités</th><th>Nécessaire</th><th>En Reserve</th><th>A acheter</th><th>Aller !</th>';
	
	document.getElementById('div_result_simu').appendChild(titre_commerce);
	document.getElementById('div_result_simu').appendChild(recap);
	
		for (ij=1;ij<Nom2.length;ij++){
			
			if ( Qte2[ij]<Stock[Nom2[ij]]){var diff = 0;}else{var diff=Qte2[ij]-Stock[Nom2[ij]];}
		
			var ligne=document.createElement('tr');
			ligne.innerHTML = '<td>'+Nom2[ij]+'</td>'
								+'<td>'
									+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(Qte2[ij]).str())+'" title="'+lisibilite_nombre(new Big(Qte2[ij]).str())+'">'
										//+ Qte2[ij]
										+ Convert(Qte2[ij],'unite')
									+'</span>'
								+'</td>'
								+'<td>'
									+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(Stock[Nom2[ij]]).str())+'" title="'+lisibilite_nombre(new Big(Stock[Nom2[ij]]).str())+'">'
										//+ Stock[Nom2[ij]]
										+ Convert(Stock[Nom2[ij]],'unite')
									+'</span>'
								+'</td>'
								+'<td>'
									+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(diff).str())+'" title="'+lisibilite_nombre(new Big(diff).str())+'">'
										//+ diff
										+ Convert(diff,'unite')
									+'</span></td><td id=btn_comm'+ij+'>'
								+'</td>'
								+'<td id=btn_comm'+ij+'>'
								+'</td>';
			
			recap.appendChild(ligne);
			
			var newButton5 = document.createElement("input");
					newButton5.type = "button";
					newButton5.value = "Acheter";
					newButton5.id=Ref_commerce[Nom2[ij]];
					newButton5.onclick = function(){
					window.open('http://game.desert-operations.fr/world1/handel.php?mode=1&object_id=w_'+this.id+'&goods_partly=1&search_goods=Chercher');
					};
					
			document.getElementById('btn_comm'+ij).appendChild(newButton5);
		}
	
	}
}
	
function compute(){

	//***************etat initiale des armées **********
	clear();
	div_result_simu.style.display='block';
	
	var unit_att=new Array();
	var unit_def=new Array();
	var nb_att=0;
	var nb_def=0;
	
	var Valeur_unit_att_init=0;
	var Valeur_unit_def_init=0;
	var Valeur_unit_att_perdu=0;
	var Valeur_unit_def_perdu=0;
	var Qte_muni=0;
	var diesel_att=0;
	var kero_att=0;	
	
	
	for (a = 0, c = Unites_Nom.length ; a < c; a++){ // pour toutes les unités ennemies
		unit_def[nb_def]=new Array(Unites_Nom[a], Qte[a], Qte[a], 0); // qte init, restante, détruite de unit name du defenseur;
		nb_def++;// comptage du nombre d'unités
	}
	
	for ( i = 0 ; i < document.getElementsByTagName('select').length ; i++){ //pour la liste des unités choisies
		var listing = document.getElementById('liste'+(i+1));
		var id_unit = listing.options[listing.selectedIndex].value; // on récup le nom et l'id (pour le tableau croisé)
		var name_unit = listing.options[listing.selectedIndex].text;
		
		unit_att[nb_att]=new Array(name_unit, 0,0,0); // qte init, perdu, final de unit name;
		nb_att++;// comptage du nombre d'unités
	}
	
	//****************Simulation*****************
	
	for ( i2 = 0 ; i2 < nb_att ; i2++){ //pour chaque liste des unités choisies
		
			for (a2 = 0; a2 < nb_def; a2++){ // on affronte chacunes des unités ennemies
			
			var continuer=check_if_need(i2,a2, nb_def, unit_att, unit_def);
			
				if(unit_def[a2][2]!=0){ //s'il reste des unités et que il faut se battre derrière
					
				var need = unit_def[a2][1]*Unites_Stats[unit_def[a2][0]][6]/Unites_Stats[unit_att[i2][0]][5];
				
					if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()-1]=='1'){ //si combat egualitaire
						
						unit_att[i2][1]+= control_neg(need, unit_att[i2][2], continuer);// calcul des unité necessaires pour tout le rc
						unit_att[i2][3]+= controle_perte(need, unit_att[i2][2], continuer);// unités perdues
						unit_att[i2][2]= controle_reserve(need, unit_att[i2][2]);// calcul des unités conservées
						
					
						unit_def[a2][3]= unit_def[a2][1]; // unités finales
						unit_def[a2][2]= 0;// unités initiales
						
					}else if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()-1]=='2'){ //si fleche verte de l'attaquant sur le défenseur
						
						unit_att[i2][1]+= control_neg(need, unit_att[i2][2], continuer);// calcul des unité necessaires pour tout le rc
						unit_att[i2][2]= controle_cons(need, unit_att[i2][2]);// calcul des unités conservées
						unit_att[i2][3]+=0; // unités perdues
					
						unit_def[a2][3]= unit_def[a2][1]; // unités finales
						unit_def[a2][2]= 0;// unités initiales
						
					}else if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()-1]=='-1'){ //si fleche rouge de l'attaquant sur le défenseur
						
						unit_att[i2][1]+= control_neg(need, unit_att[i2][2], continuer);// calcul des unité necessaires pour tout le rc
						unit_att[i2][3]+= controle_perte(need, unit_att[i2][2], continuer);// unités perdues
						unit_att[i2][2]= controle_reserve(need, unit_att[i2][2]);// calcul des unités conservées
						
						
						
					}else if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()-1]=='0'){ //si il n'y a pas de combat
					
					}	
				}

			}
	}

	//***************affichage**********************************
	
	for (a3 = 0; a3 < nb_def; a3++){ 
	var div_td_def=document.createElement('tr')
	div_td_def.innerHTML='<td>'+unit_def[a3][0]+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_def[a3][1]).str())+'" title="'+lisibilite_nombre(new Big(unit_def[a3][1]).str())+'">'
			+ Convert(unit_def[a3][1],'unite')
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_def[a3][2]).str())+'" title="'+lisibilite_nombre(new Big(unit_def[a3][2]).str())+'">'
			+ Convert(unit_def[a3][2],'unite')
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_def[a3][3]).str())+'" title="'+lisibilite_nombre(new Big(unit_def[a3][3]).str())+'">'
			+ Convert(unit_def[a3][3],'unite')
		+'</span>'
	+'</td>';
	
	document.getElementById('rc_def').appendChild(div_td_def);
	
	Valeur_unit_def_init+=unit_def[a3][1]*Unites_Stats[unit_def[a3][0]][0];
	Valeur_unit_def_perdu+=unit_def[a3][3]*Unites_Stats[unit_def[a3][0]][0];
	
	}
	
	for (i3 = 0; i3 < nb_att; i3++){ 
	
	var div_td_att=document.createElement('tr')
	div_td_att.innerHTML='<td>'+unit_att[i3][0]+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_att[i3][1]).str())+'" title="'+lisibilite_nombre(new Big(unit_att[i3][1]).str())+'">'
			+ Convert(unit_att[i3][1],'unite')
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_att[i3][2]).str())+'" title="'+lisibilite_nombre(new Big(unit_att[i3][2]).str())+'">'
			+ Convert(unit_att[i3][2],'unite')
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_att[i3][3]).str())+'" title="'+lisibilite_nombre(new Big(unit_att[i3][3]).str())+'">'
			+ Convert(unit_att[i3][3],'unite')
		+'</span>'
	+'</td>';
	
	document.getElementById('rc_att').appendChild(div_td_att);
	
	Valeur_unit_att_init+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][0];
	Valeur_unit_att_perdu+=unit_att[i3][3]*Unites_Stats[unit_att[i3][0]][0];
	Qte_muni+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][3];
		if (Unites_Stats[unit_att[i3][0]][2]=='Diesel'){
			diesel_att+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][1];
		}else{
			kero_att+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][1];
		}
	
	}

	add_result(Valeur_unit_att_init, Valeur_unit_def_init, Valeur_unit_att_perdu, Valeur_unit_def_perdu, Qte_muni,diesel_att, kero_att);
	NTB_commerce();
	

}

function toggle_list(elem){
	if(elem.checked){
	document.getElementById('list_global').style.display = 'block';
	document.getElementById('right').style.display = 'block';
	//document.getElementById('div_result_simu').style.display = 'block';
	} else {
	document.getElementById('list_global').style.display = 'none';
	document.getElementById('right').style.display = 'none';
	document.getElementById('div_result_simu').style.display = 'none';
	}
}

var titre4=document.createElement('h2');
titre4.className='battleReport tableHeader';
titre4.innerHTML='Création armée :';

var army=document.createElement('input');
	army.type="checkbox";
	army.name="see_unit";
	army.id='see_unit';
	army.onclick =function(){toggle_list(this);};
	
//ajout du texte
var texte_army=document.createElement("div");
texte_army.innerHTML="Faire son armée";
texte_army.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';

var list_global = document.createElement('div');
	list_global.id='list_global';
	list_global.style.display='none';

document.getElementById('report').firstChild.firstChild.appendChild(titre4);
document.getElementById('report').firstChild.firstChild.appendChild(army);	
document.getElementById('report').firstChild.firstChild.appendChild(texte_army);
document.getElementById('report').firstChild.firstChild.appendChild(list_global);

var newButton = document.createElement("input");
                newButton.type = "button";
				newButton.value = "Ajouter une unité";
				newButton.id='btn_add_unit';
				newButton.onclick = function(){add_list();};

var newButton2 = document.createElement("input");
                newButton2.type = "button";
				newButton2.value = "Calculer l'armée nécessaire";
				newButton2.id='btn_simu';
				newButton2.onclick = function(){compute();};
				
var newButton3 = document.createElement("input");
                newButton3.type = "button";
				newButton3.value = "Effacer les tableaux";
				newButton3.id='btn_clear';
				newButton3.onclick = function(){/*clear();*/};
				
var newButton4 = document.createElement("input");
                newButton4.type = "button";
				newButton4.value = "Supprimer la dernière unité";
				newButton4.id='btn_delete_last';
				newButton4.onclick = function(){delete_last(count);};



list_global.appendChild(newButton);
list_global.appendChild(newButton4);
list_global.appendChild(newButton2);
//list_global.appendChild(victory_lose);
//list_global.appendChild(newButton3);


var div_result_simu =document.createElement('div');
	div_result_simu.id='div_result_simu';
	div_result_simu.style.display='none';
	
document.getElementById('report').firstChild.firstChild.appendChild(div_result_simu);

var titre_att=document.createElement('h2');
titre_att.className='battleReport tableHeader';
titre_att.innerHTML='Unités Attaquant :';

var rc_att=document.createElement('table');
rc_att.style.fontSize="15px";
rc_att.style.width="100%";
rc_att.id='rc_att';
rc_att.className='battleReport';
rc_att.innerHTML='<th>Unités</th><th>Quantité</th><th>Restantes</th><th>Anéanties</th>';

var titre_def=document.createElement('h2');
titre_def.className='battleReport tableHeader';
titre_def.innerHTML='Unités Défenseur :';

var rc_def=document.createElement('table');
rc_def.style.fontSize="15px";
rc_def.style.width="100%";
rc_def.id='rc_def';
rc_def.className='battleReport';
rc_def.innerHTML='<th>Unités</th><th>Quantité</th><th>Restantes</th><th>Anéanties</th>';

div_result_simu.appendChild(titre_att);
div_result_simu.appendChild(rc_att);	
div_result_simu.appendChild(titre_def);
div_result_simu.appendChild(rc_def);

var copyright =document.createElement('div');
	copyright.style.fontSize="10px";
	copyright.id="right";
	copyright.style.display = 'none';
	copyright.innerHTML='</br>La Société "Coni le N\'0_0\'b" &#169;, concepteur de cet outil, ne pourra être tenu responsable de toutes pertes découlantes d\'une attaque avec la limite minimum d\'unité. Merci d\'ajouter une petite quantité par sécurité';
	
document.getElementById('report').firstChild.firstChild.appendChild(copyright);

function add_result(Valeur_unit_att_init, Valeur_unit_def_init, Valeur_unit_att_perdu, Valeur_unit_def_perdu, Qte_muni,diesel_att, kero_att){
var titre5=document.createElement('h2');
titre5.className='battleReport tableHeader';
titre5.innerHTML='RC infos :';

var info_rc2=document.createElement('table');
info_rc2.style.fontSize="15px";
info_rc2.style.width="100%";
info_rc2.className='battleReport';
info_rc2.innerHTML='<tr>'
		+ '<th colspan="2" style="text-align:center">'
			+'Valeur des unités en $'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">' + Convert(Valeur_unit_att_init, 'Argent') + '</td>'
		+ '<td style="text-align:right">' + Convert(Valeur_unit_def_init, 'Argent') + '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2" style="text-align:center">'
			+'Valeur des unités perdues'
		+ '</th>'
    + '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">' + Convert(Valeur_unit_att_perdu, 'Argent') + '</td>' 
		+ '<td style="text-align:right">' + Convert(Valeur_unit_def_perdu, 'Argent') + '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2" style="text-align:center">'
			+'Munitions'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td>' 
			+'<span class="tooltipExtention showTooltipDefault" title="Cout : '+ Convert(Qte_muni * 7, 'Argent')+'" data="'+Convert(Qte_muni * 7, 'Argent')+'">Munitions : '
				+ Convert(Qte_muni, 'Munition')
			+ '</span>'
		+ '</td>'
		+ '<td></td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2"style="text-align:center">'
			+ 'Petrole'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td>'
			+'<span class="tooltipExtention showTooltipDefault" title="Cout : '+Convert(diesel_att * 2002, 'Argent')+ ' ( '+ Convert(diesel_att*2002*0.6, 'Petrole') + ' avec Vladimir)" data="'+Convert(diesel_att * 2002, 'Argent')+' ( '+ Convert(diesel_att*2002*0.6, 'Petrole') + ' avec Vladimir) ">Diesel : ' 
				+ Convert(diesel_att, 'Petrole') + ' ( '+ Convert(diesel_att*0.6, 'Petrole') + ' avec Vladimir) '
			+ '</span>'
		+ '</td>'
		+ '<td></td>'
	+ '</tr>'
	+ '<tr>'
		+ '<td>'
			+'<span class="tooltipExtention showTooltipDefault" title="Cout : '+Convert(kero_att * 4003, 'Argent')+ ' ( '+ Convert(kero_att*4003*0.6, 'Petrole') + ' avec Vladimir)" data="'+Convert(kero_att * 4003, 'Argent')+' ( '+ Convert(kero_att*4003*0.6, 'Petrole') + ' avec Vladimir) ">Kérosène : ' 
				+ Convert(kero_att, 'Petrole') + ' ( '+ Convert(kero_att*0.6, 'Petrole') + ' avec Vladimir) '
			+ '</span>'
		+ '</td>'
		+ '<td></td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="2" style="text-align:center">'
			+ 'Depenses Totales:'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left">' + Convert(diesel_att * 2002 + kero_att * 4003 + Qte_muni * 7 + Valeur_unit_att_perdu, 'Argent') + '</td>'
		+ '<td style="text-align:right">' + Convert(Valeur_unit_def_perdu, 'Argent') + '</td>'
	+ '</tr>';
	
div_result_simu.appendChild(titre5);
div_result_simu.appendChild(info_rc2);
}

//*********************redimensionnement du RC*****************
var elemsize=document.getElementsByClassName('battleReport');

for (i=0;i<elemsize.length;i++){
	elemsize[i].style.width="600px";
}

var elemsize=document.getElementsByClassName('spionageReport');

for (i=0;i<elemsize.length;i++){
	elemsize[i].style.width="600px";
}

//*********************affichage de l'armée en reserve***************

function toggle_valide(elem){
	if(elem.checked){
	document.getElementById('listing_unit').style.display = 'block';
	} else {
	document.getElementById('listing_unit').style.display = 'none';
	}
}

function toggleYN(elem){
	if (elem.value=="Oui"){
		elem.value="Non";
		Unit_Display[elem.id]=false;
		GM_setValue('pref'+elem.id, false);
	}else{
		elem.value="Oui";
		Unit_Display[elem.id]=true;
		GM_setValue('pref'+elem.id, true);
	}
}

function load_btn(elem){
	if(Unites_Stats[elem.id][8]==true){
		return "Oui";
	}else if(Unites_Stats[elem.id][8]==false){
		return "Non";
	}
}

var titre6=document.createElement('h2');
	titre6.className='battleReport tableHeader';
	titre6.innerHTML='Options du  choix des unités :';

var listing=document.createElement('input');
	listing.type="checkbox";
	listing.name="see_valide_unit";
	listing.onclick =function(){toggle_valide(this);};
	
//ajout du texte
var texte_validation=document.createElement("div");
texte_validation.innerHTML="Choix des unités possibles";
texte_validation.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';

var list_unite = document.createElement('div');
	list_unite.id='listing_unit';
	list_unite.style.display='none';
	
document.getElementById('report').firstChild.firstChild.appendChild(titre6);
document.getElementById('report').firstChild.firstChild.appendChild(listing);
document.getElementById('report').firstChild.firstChild.appendChild(texte_validation);
document.getElementById('report').firstChild.firstChild.appendChild(list_unite);

for (i=1;i<47;i++){
	var nom_valide = document.createElement('div');
		nom_valide.innerHTML =Unit_Name[i];
		nom_valide.style.cssText = 'position:relative;top:-27px;left:50px;width:500px;';
	
	var newButton = document.createElement('input');
		newButton.type='button';
		newButton.id=Unit_Name[i];
			if(Unit_Display[newButton.id]==true){
				newButton.value = "Oui";
			}else if(Unit_Display[newButton.id]==false){
				newButton.value = "Non";
			}
		newButton.onclick = function(){toggleYN(this);};
	
	document.getElementById('listing_unit').appendChild(newButton);
	document.getElementById('listing_unit').appendChild(nom_valide);
}
