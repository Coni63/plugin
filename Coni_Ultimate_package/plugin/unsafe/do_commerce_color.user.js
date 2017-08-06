// ==UserScript==
// @name           DO Commerce Info
// @author         Coni
// @description    Donne des infos cruciales sur les ressources en vente sur le commerce
// @include        http://*.desert-operations.*/world*/handel.php*
// @version        3.00
// ==/UserScript==

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

function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
}

function DelPoint(Nombre) {
	var	End = Nombre.replace(/\./g,'');
	End = parseInt(End);
	return End;
}

function setprix(Arg) {
	if (Arg.match('Or')){P=1000;} 
	if (Arg.match('Pétrole')){P=500;} 
	if (Arg.match('Munitions')){P=7;} 
	if (Arg.match('Fantassin')){P=120;} 
	if (Arg.match('Paras')){P=400;} 
	if (Arg.match('Antichar')){P=1150;} 
	if (Arg.match('Commando de marine')){P=2200;} 
	if (Arg.match('AMX-13 DCA')){P=18000;} 
	if (Arg.match('AMX-30')){P=35000;} 
	if (Arg.match('Destructeur de mines')){P=45000;} 
	if (Arg.match('Artillerie automotrice PzH2000')){P=55000;} 
	if (Arg.match('Lance-missile mobile')){P=65000;} 
	if (Arg.match('M1A2 Abrams')){P=70000;} 
	if (Arg.match('MBT 3000')){P=65000;} 
	if (Arg.match('T-90')){P=85000;} 
	if (Arg.match('Leclerc 2')){P=10000;} 
	if (Arg.match('Leopard 3')){P=150000;} 
	if (Arg.match('T-95 Black Eagle')){P=170000;} 
	if (Arg.match('AH-64 Apache')){P=60000;} 
	if (Arg.match('Mil MI-28 Havoc')){P=70000;} 
	if (Arg.match('Mil MI-24 Hind')){P=75000;} 
	if (Arg.match('Eurocopter Tigre')){P=80000;} 
	if (Arg.match('Eurofighter Typhoon')){P=85000;} 
	if (Arg.match('F22 Raptor')){P=90000;} 
	if (Arg.match('J16 \"Red Eagle\"')){P=90000;} 
	if (Arg.match('A-10 Thunderbolt')){P=110000;} 
	if (Arg.match('F117A Nighthawk')){P=120000;} 
	if (Arg.match('Rockwell B1')){P=250000;} 
	if (Arg.match('Northrop B2 Spirit')){P=2000000;} 
	if (Arg.match('Embraer EMB 314 Super Tucano')){P=150000;} 
	if (Arg.match('Grey Ghost')){P=85000;} 
	if (Arg.match('B-52 Stratofortress')){P=4000000;} 
	if (Arg.match('Corvette K130')){P=350000;} 
	if (Arg.match('Destroyer Type 333')){P=70000;} 
	if (Arg.match('Frégate de 2nd rang')){P=500000;} 
	if (Arg.match('Houbei Class Missile Boat')){P=650000;} 
	if (Arg.match('Sous-marin d\'attaque')){P=800000;} 
	if (Arg.match('Sous-marin lanceur d\'engins')){P=1000000;} 
	if (Arg.match('Porte-avions nucléaire')){P=1500000;} 
	if (Arg.match('Porte-avions Charles de Gaulle')){P=2000000;} 
	if (Arg.match('Frégate de 1er rang')){P=1000000;} 
	if (Arg.match('Croiseur IOWA Classe B')){P=1100000;} 
	if (Arg.match('Champ de barbelés')){P=20000;} 
	if (Arg.match('Bunker')){P=40000;} 
	if (Arg.match('Champ de mines')){P=250000;} 
	if (Arg.match('Mines sous-marines')){P=100000;} 
	if (Arg.match('Batterie de DCA')){P=100000;} 
	if (Arg.match('Batterie de Patriots')){P=150000;} 
	if (Arg.match('Batterie côtière')){P=200000;} 
	return P;
} 

//**************commerce color******************
var unit = document.getElementsByClassName('formColumnTrade column25 ltr');
var prix2 = document.getElementsByClassName('tooltipExtention showTooltipDefault');

for (i = 0, c = unit.length; i < c; i++) {
	var prix_normal=setprix(unit[i].innerHTML);
	var nb_unit = DelPoint(prix2[2*i].title);
	var val = DelPoint(prix2[2*i+1].title);
	var Pourcent = val/(nb_unit * prix_normal);
	var Taux = Arrondir(100 * Pourcent,2);
	
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
			
			unit[i].innerHTML = '<span style="color:#' + Color +  '">'+ unit[i].innerHTML + '</span>';
			prix2[2*i+1].parentNode.innerHTML = '<span style="color:#' + Color +  '">'+ prix2[2*i+1].parentNode.innerHTML + '('+Taux+'%)</span>';
}


//*************commerce lots*******************
var part=document.getElementsByTagName('input');

for(i=0, c=part.length ; i<c ;i++){
	if(part[i].type=='text'){
		part[i].value = lisibilite_nombre(part[i].max);
	}
}

//***********Sell max******************

var newButton = document.createElement("input");
					newButton.type = "button";
					newButton.value = "Max";
					newButton.id="put_max";
					newButton.onclick = function(){
						document.getElementById('tradeOfferAmount').value=lisibilite_nombre(document.getElementById('tradeOfferAmount').max);
					};
					
document.getElementById('tradeSaleResourceDropdown')./*parentNode.*/parentNode.appendChild(newButton);
