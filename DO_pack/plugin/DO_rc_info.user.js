// ==UserScript==
// @name           DO RC Info
// @author         Coni
// @description    Ajoute une petite fenêtre comportant des informations relatives au combat : depenses, ratio...
// @include        http://game.desert-operations.*/world*/battleReport.*
// @version        3.11
// @require		   jscharts.js
// @require		   unite.js
// @require		   fonctions.js
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// @grant    	   GM_deleteValue
// ==/UserScript==

var tableau = document.getElementsByTagName('tbody');
var Temporaire_att = tableau[0].getElementsByTagName('tr');
var Temporaire_def = tableau[1].getElementsByTagName('tr');
var Temporaire_bat = tableau[2].getElementsByTagName('tr');

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
var pts_perdus=new Array();
var pts_perdus_total=0;

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

var Unit_selectionnable = new Array();
var armee = new Array();

var total = 0;
var count=0;
var indicejavascript1=0;

var id_min_cout_troupe = 0;
var	id_min_cout_envoi =0;
var id_min_conso = 0;							
var id_min_perte_troupe =0;
var id_min_perte_total =0;

var min_cout_troupe = 1e+100;
var min_cout_troupe2 = 1e+100;
var min_cout_envoi = 1e+100;
var min_conso = 1e+100;
var min_perte_troupe = 1e+100;
var min_perte_total = 1e+100;

Number.prototype.toShortString=function(){
	return (''+this).replace(/([\d\.]+)(?=e)/,function(a,b){return (+b).toFixed(2)})
}

Number.prototype.toFormat=function(){
return Math.floor(this/60000) +' min '+ Math.floor(this/1000)%60 +' s ' + this%1000 +' ms ';
}

String.prototype.toShortName=function(){
	if(this=='Diesel'){
		return 'diesel';
	} else {
		return 'kéro';
	}
}

function price(qte,type){
if(type=='kéro'){return qte*10003;} else {return qte*5002;}
}

function opposant(Nom_unitee,Qte){
	var indice=0;
	var possibilite=new Array();
	var numero = Nom_unitee.getId();
		for(i=1;i<47;i++){//pour chaque unité qui peuvent lui faire opposition
			if(Unit_Fight[numero][i]=='-1' && Unites_Stats[Unit_Name[i]][7]!='defense' && Unit_Display[Unit_Name[i]]==true){ // fleche verte
				var necessaire=Math.ceil(Qte*Unites_Stats[Nom_unitee][6]/Unites_Stats[Unit_Name[i]][5]);
				var perdu = 0;
				var cout_achat = necessaire * Unites_Stats[Unit_Name[i]][0];
				var cout_perdu = 0;
				var conso = necessaire*Unites_Stats[Unit_Name[i]][1];
				var type_pet=Unites_Stats[Unit_Name[i]][2].toShortName();
				var cout_pet=price(conso,type_pet);
				possibilite[indice]=[Unit_Name[i],necessaire, perdu, cout_achat, cout_perdu, conso, type_pet, cout_pet];//on stocke dans un tableau
				indice++; 
			} else if (Unit_Fight[numero][i]=='1'&& Unites_Stats[Unit_Name[i]][7]!='defense' && Unit_Display[Unit_Name[i]]==true){ //si combat egalitaire
				var necessaire=Math.ceil(Qte*Unites_Stats[Nom_unitee][6]/Unites_Stats[Unit_Name[i]][5]);
				var perdu = necessaire;
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
	unit_concernee.innerHTML='</br>Pour contrer les '+Convert(qte)+' de '+nom;
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
	ligne.innerHTML='<td>'+tab[k][0]+'</td><td>'+Convert(tab[k][1])+'</td><td>'+Convert(tab[k][2])+'</td><td>'+Convert(tab[k][3])+'</td><td>'+Convert(tab[k][4])+'</td><td>'+Convert(tab[k][5])+' '+tab[k][6]+'</td><td>'+Convert(tab[k][7])+'</td>';
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

/*function NTB_commerce(){

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
				Qte=DelPoint(armee_123.getElementsByClassName('alignRight')[li].getElementsByTagName('span')[0].title);
				Stock[Nom]+=Qte;
			}
			
			var reserve = dom_army.getElementsByClassName('milTableContainer')[2].getElementsByTagName('tr');
			
			for (li2=3;li2<reserve.length-2;li2++){
				Nom=reserve[li2].getElementsByClassName('alignLeft')[0].firstChild.innerHTML;
				Qte=DelPoint(reserve[li2].getElementsByClassName('milCell')[0].getElementsByTagName('span')[0].title);
				Stock[Nom]+=Qte;
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

}*/
	
function load_pref(){
	for (i=1;i<47;i++){
		Unit_Display[Unit_Name[i]]=GM_getValue('pref'+Unit_Name[i], true);//Unit_Display[Unit_Name[i]]);
		if(Unit_Display[Unit_Name[i]]==true){
			Unit_selectionnable.push(Unit_Name[i]);
		}
	}
}

function read_RC(){
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
}

function Convert_RC(){
for (i = 1, c = Temporaire_att.length ; i < c; i++){
Temporaire_att[i].firstChild.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_att[i].firstChild.nextSibling.getElementsByTagName('span')[0].title));
Temporaire_att[i].firstChild.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_att[i].firstChild.nextSibling.nextSibling.getElementsByTagName('span')[0].title));
Temporaire_att[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_att[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('span')[0].title));
}

for (i = 1, c = Temporaire_def.length ; i < c; i++){
Temporaire_def[i].firstChild.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_def[i].firstChild.nextSibling.getElementsByTagName('span')[0].title));
Temporaire_def[i].firstChild.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_def[i].firstChild.nextSibling.nextSibling.getElementsByTagName('span')[0].title));
Temporaire_def[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_def[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('span')[0].title));
}

for (i = 1, c = Temporaire_bat.length ; i < c; i++){
Temporaire_bat[i].firstChild.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_bat[i].firstChild.nextSibling.getElementsByTagName('span')[0].title));
Temporaire_bat[i].firstChild.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_bat[i].firstChild.nextSibling.nextSibling.getElementsByTagName('span')[0].title));
Temporaire_bat[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.innerHTML=Convert(DelPoint(Temporaire_bat[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('span')[0].title));
}
}

function generate_RC_info(){

var Argent_Unites_Defenseur = 0;
var Argent_Unites_Attaquant=0;
var Perte_Argent_Unites_Attaquant = 0;
var Perte_Argent_Unites_Defenseur = 0;
var Perte_Munition_Attaquant = 0;
var Perte_Diesel_Attaquant = 0;
var Perte_Kerosene_Attaquant = 0;
var Entretien_av =0;
var Entretien_ap =0;
var Entretien2_av =0;
var Entretien2_ap =0;

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


//**************Affichage tableau ***************

var MyDiv= document.createElement('div');
	MyDiv.id='Content';
	
document.getElementById('battleReport').firstChild.appendChild(MyDiv); 

add_result(Argent_Unites_Attaquant, Argent_Unites_Defenseur, Perte_Argent_Unites_Attaquant, Perte_Argent_Unites_Defenseur, Entretien2_av, Entretien2_ap, Entretien_av, Entretien_ap, Perte_Munition_Attaquant,Perte_Diesel_Attaquant, Perte_Kerosene_Attaquant, 'Content');
}

function toggle(elem, nom_id){
	if(elem.checked){
	document.getElementById(nom_id).style.display = 'block';
	} else {
	document.getElementById(nom_id).style.display = 'none';
	}
}

function Add_graph(){
var MyDiv1= document.createElement('div');
	MyDiv1.id='Header1';

document.getElementById('battleReport').firstChild.appendChild(MyDiv1); 

var titre2=document.createElement('h2');
	titre2.className='battleReport tableHeader';
	titre2.innerHTML='Graphiques :';

var btn_graph=document.createElement('input');
	btn_graph.type="checkbox"
	btn_graph.name="afficher les graphs"
	btn_graph.id='chkbx_graph';
	btn_graph.onclick =function(){
		toggle(this, 'Content1');
	};
	
var texte_graph=document.createElement("div");
	texte_graph.innerHTML="Voir les graphiques";
	texte_graph.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';
	
MyDiv1.appendChild(titre2); 
MyDiv1.appendChild(btn_graph);
MyDiv1.appendChild(texte_graph);	

var MyDiv2= document.createElement('div');
	MyDiv2.id='Content1';
	MyDiv2.style.display = 'none';

document.getElementById('battleReport').firstChild.appendChild(MyDiv2); 
	
var barre=document.createElement('div');
	barre.id='graph2';
	barre.innerHTML='Oops ... ca bug !';

var tarte=document.createElement('div');
	tarte.id='graph';
	tarte.innerHTML='Oops ... ca bug !';

MyDiv2.appendChild(barre);
MyDiv2.appendChild(tarte);

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
	myChart.setSize(600,400);
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
}

function Add_list_opponent(){
	var MyDiv3= document.createElement('div');
		MyDiv3.id='Header2';

	document.getElementById('battleReport').firstChild.appendChild(MyDiv3); 

	var titre3=document.createElement('h2');
	titre3.className='battleReport tableHeader';
	titre3.innerHTML='Rapport de Simulation :';

	var btn_see=document.createElement('input');
		btn_see.type="checkbox"
		btn_see.name="afficher le résultat"
		btn_see.id='chkbx';
		btn_see.onclick =function(){
			toggle(this, 'Content2');
		};
		
	var texte=document.createElement("div");
	texte.innerHTML="Voir les unités possibles";
	texte.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';

	MyDiv3.appendChild(titre3);
	MyDiv3.appendChild(btn_see);	
	MyDiv3.appendChild(texte);

	var MyDiv4= document.createElement('div');
		MyDiv4.id='Content2';
		MyDiv4.style.display = 'none';
	document.getElementById('battleReport').firstChild.appendChild(MyDiv4); 

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

	MyDiv4.appendChild(legende)

	//div unique d'affichaque tableau
	var global_layout = document.createElement('div');
		global_layout.id='global_layout';
		
	MyDiv4.appendChild(global_layout);	
	
	//****************Calcul des unités****************

	//ajout de la collone sur les unités du défenseur
	var colonne2 = document.createElement('th');
			colonne2.innerHTML='Info';
			colonne2.id='test';
			Temporaire_def[0].appendChild(colonne2);
			
	var resultat=new Array();
	var test=new Array();

	for (a = 1, c = Temporaire_def.length ; a < c; a++){
		if(Unites_Defenseur_Fin[a]!=0){ //s'il reste des unités

			resultat[a]=opposant(Unites_Defenseur_Nom[a], Unites_Defenseur_Fin[a]); //on cherche les unités et qté necessaire à les battre
			
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
			
			document.getElementById('line'+a).appendChild(oImg);
		}
	}
	
}

function control_besoin(besoin, reserve, continuer){
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

function controle_perte(besoin, reserve, continuer){
	if (continuer==true){
		return besoin;
	} else {
		return Math.min(reserve, besoin);
	}
}

function delete_last(num){

document.getElementById('div_result_simu').innerHTML='';
document.getElementById('rc_info1').innerHTML='';

document.getElementById('Content3').getElementsByTagName('select')[num-1].remove();
document.getElementById('Content3').getElementsByTagName('p')[num-1].remove();

count--;
}

function add_list(){

count++;

document.getElementById('div_result_simu').innerHTML='';
document.getElementById('rc_info1').innerHTML='';

var soustitre=document.createElement('p');
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

document.getElementById('posi_liste').appendChild(soustitre);
document.getElementById('posi_liste').appendChild(newList);

}

function check_if_need(index_att, index_def, max_def, unit_att, unit_def){
var continuer= false;
	for ( az = index_def;az<max_def;az++){ // pour chaque unités un controle qu'il faudra encore qu'elle se batte avec des unités du défenseur
		if(Unit_Fight[unit_att[index_att][0].getId()][unit_def[az][0].getId()]=='1' || Unit_Fight[unit_att[index_att][0].getId()][unit_def[az][0].getId()]=='2'){
			continuer=true;
		}
	}
return continuer;
}

function Add_DYOA(){
	var MyDiv5= document.createElement('div');
		MyDiv5.id='Header3';

	document.getElementById('battleReport').firstChild.appendChild(MyDiv5); 

	var titre4=document.createElement('h2');
	titre4.className='battleReport tableHeader';
	titre4.innerHTML='Simulateur de combat :';

	var army=document.createElement('input');
		army.type="checkbox";
		army.name="see_unit";
		army.id='see_unit';
		army.onclick =function(){
			toggle(this,'Content3');
			//toggle(this,'right');
		};
		
	var texte_army=document.createElement("div");
	texte_army.innerHTML="Faire son armée";
	texte_army.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';

	MyDiv5.appendChild(titre4);
	MyDiv5.appendChild(army);	
	MyDiv5.appendChild(texte_army);

	var MyDiv6 = document.createElement('div');
		MyDiv6.id='Content3';
		MyDiv6.style.display='none';

	document.getElementById('battleReport').firstChild.appendChild(MyDiv6);

	var newButton = document.createElement("input");
					newButton.type = "button";
					newButton.value = "Ajouter une unité";
					newButton.id='btn_add_unit';
					newButton.onclick = function(){add_list();};

	var newButton2 = document.createElement("input");
					newButton2.type = "button";
					newButton2.value = "Calculer l'armée nécessaire";
					newButton2.id='btn_simu';
					newButton2.onclick = function(){
						var armee_choisi = new Array();
							for ( var i = 0 ; i < document.getElementsByTagName('select').length ; i++){ //pour la liste des unités choisies
								var listing = document.getElementById('liste'+(i+1));
								var name_unit = listing.options[listing.selectedIndex].text;
								armee_choisi.push(name_unit);
							}
							//alert(armee_choisi.join(", "));
							//compute();
							simuler_afficher(armee_choisi, 'div_result_simu', 'rc_info1');
					};
										
	var newButton4 = document.createElement("input");
					newButton4.type = "button";
					newButton4.value = "Supprimer la dernière unité";
					newButton4.id='btn_delete_last';
					newButton4.onclick = function(){delete_last(count);};
	
	var zone_de_liste = document.createElement('div');
		zone_de_liste.id='posi_liste';
					
	MyDiv6.appendChild(newButton);
	MyDiv6.appendChild(newButton4);
	MyDiv6.appendChild(newButton2);
	MyDiv6.appendChild(zone_de_liste);
					
	var div_result_simu =document.createElement('div');
		div_result_simu.id='div_result_simu';		

	MyDiv6.appendChild(div_result_simu);

	var rc_info1 =document.createElement('div');
		rc_info1.id='rc_info1';			

	MyDiv6.appendChild(rc_info1);

	/*var copyright =document.createElement('div');
		copyright.style.fontSize="10px";
		copyright.id="right";
		copyright.style.display = 'none';
		copyright.innerHTML='</br>La Société "Coni le N\'0_0\'b" &#169;, concepteur de cet outil, ne pourra être tenu responsable de toutes pertes découlantes d\'une attaque avec la limite minimum d\'unité. Merci d\'ajouter une petite quantité par sécurité';
		
	document.getElementById('rc_info1').appendChild(copyright);*/
}

function ratio(valA, valB){
	if(valA>valB){
	var ratio = Convert(Arrondir(valA/valB,2))+' : 1';
	} else {
	var ratio = '1 : '+Convert(Arrondir(valB/valA,2));
	}

return ratio;
}

function add_result(Valeur_unit_att_init, Valeur_unit_def_init, Valeur_unit_att_perdu, Valeur_unit_def_perdu, entretien_pre_att, entretien_post_att, entretien_pre_def, entretien_post_def, Qte_muni,diesel_att, kero_att, id_loc){

	var investissement = diesel_att * 5002 + kero_att * 10003 + Qte_muni * 7 + Valeur_unit_att_init;
	var perte_total = diesel_att * 5002 + kero_att * 10003 + Qte_muni * 7 + Valeur_unit_att_perdu;

	var titre5=document.createElement('h2');
	titre5.className='battleReport tableHeader';
	titre5.innerHTML='RC infos :';

	var info_rc2=document.createElement('table');
	info_rc2.style.fontSize="15px";
	info_rc2.style.width="100%";
	info_rc2.className='battleReport';
	info_rc2.innerHTML='<tr>'
			+ '<th colspan="3" style="text-align:center">'
				+'Valeur des unités en $'
			+ '</th>'
		+ '</tr>'
		+ '<tr>'
			+ '<td style="text-align:left; width:33%">' + Convert(Valeur_unit_att_init) + '</td>'
			+ '<td style="text-align:center; width:33%">' + ratio(Valeur_unit_att_init, Valeur_unit_def_init) + '</td>'
			+ '<td style="text-align:right; width:33%">' + Convert(Valeur_unit_def_init) + '</td>'
		+ '</tr>'
		+ '<tr>'
			+ '<th colspan="3" style="text-align:center">'
				+'Valeur des unités perdues'
			+ '</th>'
		+ '</tr>'
		+ '<tr>'
			+ '<td style="text-align:left ; width:33%">' + Convert(Valeur_unit_att_perdu) + '</td>' 
			+ '<td style="text-align:center; width:33%">' + ratio(Valeur_unit_att_perdu, Valeur_unit_def_perdu) + '</td>'
			+ '<td style="text-align:right ; width:33%">' + Convert(Valeur_unit_def_perdu) + '</td>'
		+ '</tr>'
		+ '<tr>'
		+ '<th colspan="3" style="text-align:center">'
			+ 'Entretien avant attaque'
		+ '</th>'
	+ '</tr>'
	+ '<tr>'
		+ '<td style="text-align:left; width:33%">' + Convert(entretien_pre_att)+'/h' + '</td>'
		+ '<td style="text-align:center; width:33%"></td>'
		+ '<td style="text-align:right; width:33%">' + Convert(entretien_pre_def)+'/h' + '</td>'
	+ '</tr>'
	+ '<tr>'
		+ '<th colspan="3" style="text-align:center">'
			+ 'Entretien post-attaque'
		+ '</th>'
	+'</tr>'
	+ '<tr>'
		+ '<td style="text-align:left; width:33%">' + Convert(entretien_post_att)+'/h' + '</td>'
		+ '<td style="text-align:center; width:33%"></td>'
		+ '<td style="text-align:right; width:33%">' + Convert(entretien_post_def)+'/h' + '</td>'
	+ '</tr>'
		+ '<tr>'
			+ '<th colspan="3" style="text-align:center">'
				+'Munitions'
			+ '</th>'
		+ '</tr>'
		+ '<tr>'
			+ '<td colspan="2" style="text-align:left; width:33%">' 
				+'<span class="tooltipExtention showTooltipDefault" title="Cout : '+ Convert(Qte_muni * 7)+'" data="'+Convert(Qte_muni * 7)+'">Munitions : '
					+ Convert(Qte_muni)
				+ '</span>'
			+ '</td>'
			+ '<td style="text-align:right; width:33%"></td>'
		+ '</tr>'
		+ '<tr>'
			+ '<th colspan="3"style="text-align:center">'
				+ 'Petrole'
			+ '</th>'
		+ '</tr>'
		+ '<tr>'
			+ '<td colspan="2" style="text-align:left; width:33%">'
				+'<span class="tooltipExtention showTooltipDefault" title="Cout : '+Convert(diesel_att * 5002)+ ' ( '+ Convert(diesel_att*5002*0.6) + ' avec Vladimir)" data="'+Convert(diesel_att * 5002)+' ( '+ Convert(diesel_att*5002*0.6) + ' avec Vladimir) ">Diesel : ' 
					+ Convert(diesel_att) + ' ( '+ Convert(diesel_att*0.6) + ' avec Vladimir) '
				+ '</span>'
			+ '</td>'
			+ '<td style="text-align:right; width:33%"></td>'
		+ '</tr>'
		+ '<tr>'
			+ '<td colspan="2" style="text-align:left; width:33%">'
				+'<span class="tooltipExtention showTooltipDefault" title="Cout : '+Convert(kero_att * 10003)+ ' ( '+ Convert(kero_att*10003*0.6) + ' avec Vladimir)" data="'+Convert(kero_att * 10003)+' ( '+ Convert(kero_att*10003*0.6) + ' avec Vladimir) ">Kérosène : ' 
					+ Convert(kero_att) + ' ( '+ Convert(kero_att*0.6) + ' avec Vladimir) '
				+ '</span>'
			+ '</td>'
			+ '<td style="text-align:right; width:33%"></td>'
		+ '</tr>'
		+ '<tr>'
			+ '<th colspan="3" style="text-align:center">'
				+ 'Investissement Total:'
			+ '</th>'
		+ '</tr>'
		+ '<tr>'
			+ '<td style="text-align:left; width:33%">' + Convert(investissement) + '</td>'
			+ '<td style="text-align:center; width:33%">'+ratio(investissement , Valeur_unit_def_init)+'</td>'
			+ '<td style="text-align:right; width:33%">' + Convert(Valeur_unit_def_init) + '</td>'
		+ '</tr>'
		+ '<tr>'
			+ '<th colspan="3" style="text-align:center">'
				+ 'Depenses Totales:'
			+ '</th>'
		+ '</tr>'
		+ '<tr>'
			+ '<td style="text-align:left; width:33%">' + Convert(perte_total) + '</td>'
			+ '<td style="text-align:center; width:33%">'+ratio(perte_total, Valeur_unit_def_perdu)+'</td>'
			+ '<td style="text-align:right; width:33%">' + Convert(Valeur_unit_def_perdu) + '</td>'
		+ '</tr>';
		
	document.getElementById(id_loc).appendChild(titre5);
	document.getElementById(id_loc).appendChild(info_rc2);
	}

function resize(size){
	var elemsize=document.getElementsByClassName('battleReport');

	for (i=0;i<elemsize.length;i++){
		elemsize[i].style.width=size;
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
		//GM_setValue('pref'+elem.id, true);
		GM_deleteValue('pref'+elem.id);
	}
}

function load_btn(elem){
	if(Unites_Stats[elem.id][8]==true){
		return "Oui";
	}else if(Unites_Stats[elem.id][8]==false){
		return "Non";
	}
}

function Add_option(){
	var MyDiv7= document.createElement('div');
		MyDiv7.id='Header4';

	document.getElementById('battleReport').firstChild.appendChild(MyDiv7); 

	var titre6=document.createElement('h2');
		titre6.className='battleReport tableHeader';
		titre6.innerHTML='Options du  choix des unités :';

	var listing=document.createElement('input');
		listing.type="checkbox";
		listing.name="see_valide_unit";
		listing.onclick =function(){toggle(this, 'Content4');};
		
	//ajout du texte
	var texte_validation=document.createElement("div");
	texte_validation.innerHTML="Afficher les options";
	texte_validation.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';

	MyDiv7.appendChild(titre6);
	MyDiv7.appendChild(listing);
	MyDiv7.appendChild(texte_validation);

	var list_unite = document.createElement('div');
		list_unite.id='Content4';
		list_unite.style.display='none';
	document.getElementById('battleReport').firstChild.appendChild(list_unite);
	
	var table = document.createElement('table');
	list_unite.appendChild(table);
	
	for (var i=0;i<23;i++){
	
	var ligne = document.createElement('tr');
	table.appendChild(ligne);
	
		for (var j =0; j<2; j++){
			var colonne = document.createElement('td');
				colonne.style.width = "300px";
			ligne.appendChild(colonne);
			
			var nom_valide = document.createElement('div');
				nom_valide.innerHTML =Unit_Name[2*i+j+1];
				nom_valide.style.cssText = 'position:relative;top:-27px;left:50px;width:225px;';
			
			var newButton = document.createElement('input');
				newButton.type='button';
				newButton.id=Unit_Name[2*i+j+1];
					if(Unit_Display[newButton.id]==true){
						newButton.value = "Oui";
					}else if(Unit_Display[newButton.id]==false){
						newButton.value = "Non";
					}
				newButton.onclick = function(){toggleYN(this);};
			
			colonne.appendChild(newButton);
			colonne.appendChild(nom_valide);
			
		}
	}
}

function GetRank(Name, tab_def){
	for(var i=0;i<tab_def.length;i++){
		if (Unit_Fight[Name.getId()][tab_def[i][0].getId()] == '1' || Unit_Fight[Name.getId()][tab_def[i][0].getId()] == '2'){
			var rang = i;
		}
	}
	return rang;
}

function simuler(armee_att, id_armee){
	
	var unit_att=new Array();
	var unit_def=new Array();
	var nb_att=0;
	var nb_def=0;
	
	var Valeur_unit_att_init=0;
	var Valeur_unit_def_init=0;
	var Valeur_unit_att_perdu=0;
	var Valeur_unit_def_perdu=0;
	var entretien_def_av = 0;
	var entretien_def_ap = 0;
	var entretien_att_av = 0;
	var entretien_att_ap = 0;
	var Qte_muni=0;
	var diesel_att=0;
	var kero_att=0;	
	var cout_ress=0;
	var Valeur_total=0;
	var Perte_total=0;
	var victory = true;
	var continuer;
	
	for (var i = 1; i < Temporaire_def.length ; i++){ // pour toutes les unités ennemies 
		if(Unites_Defenseur_Fin[i]!=0){ //s'il reste des unités
			unit_def[nb_def]=new Array(Unites_Defenseur_Nom[i], Unites_Defenseur_Fin[i],Unites_Defenseur_Fin[i],0); // qte init, restante, détruite de unit name du defenseur;
			nb_def++;// comptage du nombre d'unités
		}
	}
	
	for (var j = 0 ; j < armee_att.length ; j++){ //pour la liste des unités choisies
		unit_att[nb_att]=new Array(armee_att[j], 0,0,0); // qte init, perdu, final de unit name;
		nb_att++;// comptage du nombre d'unités
	}
	
	//****************Simulation*****************
	
	for ( var i2 = 0 ; i2 < nb_att ; i2++){ //pour chaque liste des unités choisies
		
		var rank = GetRank(unit_att[i2][0], unit_def);
		
			for (var a2 = 0; a2 < nb_def; a2++){ // on affronte chacunes des unités ennemies
			
			//var continuer=check_if_need(i2,a2, nb_def, unit_att, unit_def);
			if(a2<=rank){continuer=true;} else {continuer=false;}
			
			
				if(unit_def[a2][2]!=0 /*&& continuer==true*/){ //s'il reste des unités et que il faut se battre derrière
					
				var need = Math.ceil(unit_def[a2][1]*Unites_Stats[unit_def[a2][0]][6]/Unites_Stats[unit_att[i2][0]][5]);
				
					if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()]=='1'){ //si combat egualitaire
						
						unit_att[i2][1]+= control_besoin(need, unit_att[i2][2], continuer);// calcul des unité necessaires pour tout le rc
						unit_att[i2][3]+= controle_perte(need, unit_att[i2][2], continuer);// unités perdues
						unit_att[i2][2]= controle_reserve(need, unit_att[i2][2]);// calcul des unités conservées
						
					
						unit_def[a2][3]= unit_def[a2][1]; // unités perdues
						unit_def[a2][2]= 0;// unités restantes
						
					} else if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()]=='2'){ //si fleche verte de l'attaquant sur le défenseur
						
						unit_att[i2][1]+= control_besoin(need, unit_att[i2][2], continuer);// calcul des unité necessaires pour tout le rc
						unit_att[i2][2]= Math.max(need, unit_att[i2][2]);// calcul des unités conservées
						unit_att[i2][3]+=0; // unités perdues
					
						unit_def[a2][3]= unit_def[a2][1]; // unités finales
						unit_def[a2][2]= 0;// unités initiales
						
					}else if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()]=='-1'){ //si fleche rouge de l'attaquant sur le défenseur
						
						unit_att[i2][1]+= control_besoin(need, unit_att[i2][2], continuer);// calcul des unité necessaires pour tout le rc
						unit_att[i2][3]+= controle_perte(need, unit_att[i2][2], continuer);// unités perdues
						unit_att[i2][2]= controle_reserve(need, unit_att[i2][2]);// calcul des unités conservées
						
					}else if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()]=='0'){ //si il n'y a pas de combat
					}	
				}
			}
	}

	//***************Calcul du résultat**********************************
	
	for (a3 = 0; a3 < nb_def; a3++){
		if (unit_def[a3][2]!=0){victory=false;} //si le def a encore des troupes
	}
	
	for (i3 = 0; i3 < nb_att; i3++){ 
		if (unit_att[i3][1]==0){victory=false;} // si on envoi une armée vide -> minimise le nb de troupes a envoyer
	}

	if(victory==true){
	
			for (a3 = 0; a3 < nb_def; a3++){ // on calcul les infos du def

				Valeur_unit_def_init+=unit_def[a3][1]*Unites_Stats[unit_def[a3][0]][0];
				Valeur_unit_def_perdu+=unit_def[a3][3]*Unites_Stats[unit_def[a3][0]][0];

			}
			
			for (i3 = 0; i3 < nb_att; i3++){  // on calcul les info de l'attaquant
						
				Valeur_unit_att_init+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][0];
				Valeur_unit_att_perdu+=unit_att[i3][3]*Unites_Stats[unit_att[i3][0]][0];

				cout_ress+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][3]*7;
					if (Unites_Stats[unit_att[i3][0]][2]=='Diesel'){
						cout_ress+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][1]*5002;
					}else{
						cout_ress+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][1]*10003;
					}
			}
			
			Valeur_total = cout_ress + Valeur_unit_att_init;
			Perte_total = Valeur_unit_att_perdu + cout_ress;
	
			if(Valeur_unit_att_init<min_cout_troupe){
				min_cout_troupe=Valeur_unit_att_init;
				id_min_cout_troupe = id_armee;
			}
			if(cout_ress<min_conso){
				min_conso=cout_ress;
				id_min_conso = id_armee;
			}
			if(min_perte_troupe != 0){
				if(Valeur_unit_att_perdu<min_perte_troupe){
					min_perte_troupe=Valeur_unit_att_perdu;
					id_min_perte_troupe = id_armee;
				}
			} 
			if ( min_perte_troupe==0 && Valeur_unit_att_perdu == 0){
				if(Valeur_unit_att_init<min_cout_troupe2){
					min_cout_troupe2=Valeur_unit_att_init;
					id_min_perte_troupe = id_armee;
				}
			}
			if ( Valeur_total < min_cout_envoi){
				min_cout_envoi=Valeur_total;
				id_min_cout_envoi = id_armee
			}
			if(Perte_total<min_perte_total){
				min_perte_total=Perte_total;
				id_min_perte_total = id_armee;
			}
	}
}

function simuler_afficher(armee_att, loc_rc, loc_info){

	var unit_att=new Array();
	var unit_def=new Array();
	var nb_att=0;
	var nb_def=0;
	
	var Valeur_unit_att_init=0;
	var Valeur_unit_def_init=0;
	var Valeur_unit_att_perdu=0;
	var Valeur_unit_def_perdu=0;
	var entretien_def_av = 0;
	var entretien_def_ap = 0;
	var entretien_att_av = 0;
	var entretien_att_ap = 0;
	var Qte_muni=0;
	var diesel_att=0;
	var kero_att=0;	
	var cout_ress=0;
	var victory = true;
	
	document.getElementById(loc_rc).innerHTML='';
	document.getElementById(loc_info).innerHTML='';
	
	for (var i = 1; i < Temporaire_def.length ; i++){ // pour toutes les unités ennemies ********************************PK -1 ?????????????
		if(Unites_Defenseur_Fin[i]!=0){ //s'il reste des unités
			unit_def[nb_def]=new Array(Unites_Defenseur_Nom[i], Unites_Defenseur_Fin[i],Unites_Defenseur_Fin[i],0); // qte init, restante, détruite de unit name du defenseur;
			nb_def++;// comptage du nombre d'unités
		}
	}
	
	for (var j = 0 ; j < armee_att.length ; j++){ //pour la liste des unités choisies
		unit_att[nb_att]=new Array(armee_att[j], 0,0,0); // qte init, perdu, final de unit name;
		nb_att++;// comptage du nombre d'unités
	}
	
		//****************Simulation*****************
	
	for ( i2 = 0 ; i2 < nb_att ; i2++){ //pour chaque liste des unités choisies
		
		var rank = GetRank(unit_att[i2][0], unit_def);
		
			for (a2 = 0; a2 < nb_def; a2++){ // on affronte chacunes des unités ennemies
			
			//var continuer=check_if_need(i2,a2, nb_def, unit_att, unit_def);
			if(a2<=rank){continuer=true;} else {continuer=false;}
			
				if(unit_def[a2][2]!=0 /*&& continuer==true*/){ //s'il reste des unités et que il faut se battre derrière
					
				var need = Math.ceil(unit_def[a2][1]*Unites_Stats[unit_def[a2][0]][6]/Unites_Stats[unit_att[i2][0]][5]);
				
					if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()]=='1'){ //si combat egualitaire
						
						unit_att[i2][1]+= control_besoin(need, unit_att[i2][2], continuer);// calcul des unité necessaires pour tout le rc
						unit_att[i2][3]+= controle_perte(need, unit_att[i2][2], continuer);// unités perdues
						unit_att[i2][2]= controle_reserve(need, unit_att[i2][2]);// calcul des unités conservées
						
					
						unit_def[a2][3]= unit_def[a2][1]; // unités finales
						unit_def[a2][2]= 0;// unités initiales
						
					}else if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()]=='2'){ //si fleche verte de l'attaquant sur le défenseur
						
						unit_att[i2][1]+= control_besoin(need, unit_att[i2][2], continuer);// calcul des unité necessaires pour tout le rc
						unit_att[i2][2]= Math.max(need, unit_att[i2][2]);// calcul des unités conservées
						unit_att[i2][3]+=0; // unités perdues
					
						unit_def[a2][3]= unit_def[a2][1]; // unités finales
						unit_def[a2][2]= 0;// unités initiales
						
					}else if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()]=='-1'){ //si fleche rouge de l'attaquant sur le défenseur
						
						unit_att[i2][1]+= control_besoin(need, unit_att[i2][2], continuer);// calcul des unité necessaires pour tout le rc
						unit_att[i2][3]+= controle_perte(need, unit_att[i2][2], continuer);// unités perdues
						unit_att[i2][2]= controle_reserve(need, unit_att[i2][2]);// calcul des unités conservées
						
					}else if (Unit_Fight[unit_att[i2][0].getId()][unit_def[a2][0].getId()]=='0'){ //si il n'y a pas de combat
					
					}	
				}
			}
	}

	//***************affichage**********************************
	
	var titre8=document.createElement('h2');
		titre8.className='battleReport tableHeader';
		titre8.innerHTML='Attaquant :';
		titre8.id = 'titre8';
	
	var rc_att=document.createElement('table');
		rc_att.style.fontSize="15px";
		rc_att.style.width="100%";
		rc_att.id='rc_att_ulti';
		rc_att.className='battleReport';
		rc_att.innerHTML='<th>Unités</th><th>Quantité</th><th>Restantes</th><th>Anéanties</th>';		

	document.getElementById(loc_rc).appendChild(titre8);
	document.getElementById(loc_rc).appendChild(rc_att);
	
	var titre9=document.createElement('h2');
		titre9.className='battleReport tableHeader';
		titre9.innerHTML='Defenseur :';
		titre9.id = 'titre9';
		
	var rc_def=document.createElement('table');
		rc_def.style.fontSize="15px";
		rc_def.style.width="100%";
		rc_def.id='rc_def_ulti';
		rc_def.className='battleReport';
		rc_def.innerHTML='<th>Unités</th><th>Quantité</th><th>Restantes</th><th>Anéanties</th>';			
		
	document.getElementById(loc_rc).appendChild(titre9);
	document.getElementById(loc_rc).appendChild(rc_def);
	
	for (a3 = 0; a3 < nb_def; a3++){ 
	var div_td_def=document.createElement('tr')
	div_td_def.innerHTML='<td>'+unit_def[a3][0]+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_def[a3][1]).str())+'" title="'+lisibilite_nombre(new Big(unit_def[a3][1]).str())+'">'
			+ Convert(unit_def[a3][1])
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_def[a3][2]).str())+'" title="'+lisibilite_nombre(new Big(unit_def[a3][2]).str())+'">'
			+ Convert(unit_def[a3][2])
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_def[a3][3]).str())+'" title="'+lisibilite_nombre(new Big(unit_def[a3][3]).str())+'">'
			+ Convert(unit_def[a3][3])
		+'</span>'
	+'</td>';
	
	rc_def.appendChild(div_td_def);
	
	Valeur_unit_def_init+=unit_def[a3][1]*Unites_Stats[unit_def[a3][0]][0];
	Valeur_unit_def_perdu+=unit_def[a3][3]*Unites_Stats[unit_def[a3][0]][0];
	entretien_def_av += unit_def[a3][1]* Unites_Stats[unit_def[a3][0]][4] * 6;
	entretien_def_ap += unit_def[a3][2]* Unites_Stats[unit_def[a3][0]][4] * 6;
	}
	
	for (i3 = 0; i3 < nb_att; i3++){ 
	
	var div_td_att=document.createElement('tr')
	div_td_att.innerHTML='<td>'+unit_att[i3][0]+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_att[i3][1]).str())+'" title="'+lisibilite_nombre(new Big(unit_att[i3][1]).str())+'">'
			+ Convert(unit_att[i3][1])
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_att[i3][2]).str())+'" title="'+lisibilite_nombre(new Big(unit_att[i3][2]).str())+'">'
			+ Convert(unit_att[i3][2])
		+'</span>'
	+'</td>'
	+'<td>'
		+'<span class="tooltipExtention showTooltipDefault" data="'+lisibilite_nombre(new Big(unit_att[i3][3]).str())+'" title="'+lisibilite_nombre(new Big(unit_att[i3][3]).str())+'">'
			+ Convert(unit_att[i3][3])
		+'</span>'
	+'</td>';
	
	rc_att.appendChild(div_td_att);
	
	Valeur_unit_att_init+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][0];
	Valeur_unit_att_perdu+=unit_att[i3][3]*Unites_Stats[unit_att[i3][0]][0];
	entretien_att_av += unit_att[i3][1]* Unites_Stats[unit_att[i3][0]][4] * 6;
	entretien_att_ap += unit_att[i3][2]* Unites_Stats[unit_att[i3][0]][4] * 6;
	Qte_muni+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][3];
		if (Unites_Stats[unit_att[i3][0]][2]=='Diesel'){
			diesel_att+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][1];
		}else{
			kero_att+=unit_att[i3][1]*Unites_Stats[unit_att[i3][0]][1];
		}
	
	}

	add_result(Valeur_unit_att_init, Valeur_unit_def_init, Valeur_unit_att_perdu, Valeur_unit_def_perdu, entretien_att_av, entretien_att_ap, entretien_def_av, entretien_def_ap, Qte_muni,diesel_att, kero_att, loc_info);
}

function Generate_List(liste, tab_result){
	var nb_arrangement = new Array();
	var indicejavascript2 = 0;
	var inc1 = 0;
	var inc2 = 0;
	var inc3 = 0;
		for(var i=1; i<5; i++){ // pour le nombre max d'unités dans le simu
			nb_arrangement[i]=Math.pow(liste.length,i)
			total += nb_arrangement[i];
		}
		for( var j = 0 ; j< total; j++){
			tab_result[indicejavascript2]=new Array(); // on génère tous les tableaux
			tab_result[indicejavascript2].push(liste[j % liste.length]);//on liste en boucle les unités possibles
			indicejavascript2++;
		}
		for (var k = nb_arrangement[1]; k<total ; k++ ){
			tab_result[k].push(liste[(inc1) % liste.length]);
			if(k % nb_arrangement[1] == nb_arrangement[1]-1){inc1++;}
		}
		for (var l = (nb_arrangement[1]+nb_arrangement[2]); l<total ; l++ ){
			tab_result[l].push(liste[(inc2) % liste.length]);
			if((l-nb_arrangement[1]) % nb_arrangement[2] == nb_arrangement[2]-1){inc2++;}
		}
		for (var m = (nb_arrangement[1]+nb_arrangement[2]+nb_arrangement[3]); m<total ; m++ ){
			tab_result[m].push(liste[(inc3) % liste.length]);
			if((m-(nb_arrangement[1] + nb_arrangement[2])) % nb_arrangement[3] == nb_arrangement[3]-1){inc3++;}
		}
	return tab_result;
}

function suppr_doublons(tab){

	for (var i=0; i<tab.length ;i++){//pour tous les elements du tableau
		if(tab[i].length==2){
			if(tab[i][0]==tab[i][1]){
				tab.splice(i,1);
				i--;
			}
		} 
		if(tab[i].length==3){
			if((tab[i][0]==tab[i][1]) || (tab[i][0]==tab[i][2]) || (tab[i][1]==tab[i][2])){
				tab.splice(i,1);
				i--;
			}
		} 
		if (tab[i].length==4){
			if((tab[i][0]==tab[i][1]) || (tab[i][0]==tab[i][2]) || (tab[i][0]==tab[i][3]) || (tab[i][1]==tab[i][2]) || (tab[i][1]==tab[i][3]) || (tab[i][2]==tab[i][3])){
				tab.splice(i,1);
				i--;
			}
		}
	}
	return tab;
}

function optimize(){

	var startTime = new Date().getTime();   
	armee = Generate_List(Unit_selectionnable, armee);
	armee = suppr_doublons(armee);
	
	for (var n = 0 ; n<armee.length ; n++){
		simuler(armee[n], n);
	}
	
	document.getElementById('btn_radio').style.display ='block';
	document.getElementById('btn_display').style.display ='block';
	
	var elapsedTime = new Date().getTime() - startTime;  
	
	document.getElementById('show_result').innerHTML = 'Temps : '+elapsedTime.toFormat()+'</br>Nombre d\'armées simulées : '+armee.length+' sur '+total+' armées possibles</br>Nombre d\'unités possibles : '+Unit_selectionnable.length;
}

function Add_simu_opti(){

var selectedValue;

var MyDiv9= document.createElement('div');
	MyDiv9.id='Header5';

document.getElementById('battleReport').firstChild.appendChild(MyDiv9); 

var titre7=document.createElement('h2');
	titre7.className='battleReport tableHeader';
	titre7.innerHTML='Trouver l\'armée optimale :';

var btn_see2=document.createElement('input');
	btn_see2.type="checkbox"
	btn_see2.name="afficher le résultat"
	btn_see2.onclick =function(){toggle(this, 'Content5');};

var texte2=document.createElement("div");
	texte2.innerHTML="Simuler l\'armée optimale";
	texte2.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';

MyDiv9.appendChild(titre7);
MyDiv9.appendChild(btn_see2);	
MyDiv9.appendChild(texte2);	
	
var MyDiv10=document.createElement('div');
	MyDiv10.id='Content5';
	MyDiv10.style.display='none';

document.getElementById('battleReport').firstChild.appendChild(MyDiv10);

var btn_simulate = document.createElement("input");
    btn_simulate.type = "button";
	btn_simulate.value = "Simuler";
	btn_simulate.onclick = function(){
		if (confirm('Ce calcul peut necessiter pas mal de temps de calcul. Voulez-vous continuer?')) {
			optimize();
		}
	};
	
var info_simu=document.createElement("div");
	info_simu.style.cssText = 'position:relative;top:-40px;left:75px;width:400px;height:25px;';
	info_simu.style.fontSize="12px";
	info_simu.id='show_result';	

var zone_de_choix=document.createElement('div');
	zone_de_choix.id='btn_radio';
	zone_de_choix.style.display ='none';
	zone_de_choix.innerHTML='<INPUT type= "radio" name="opti" value="cout_troupe"> Cout des troupes minimal</br>'
							+'<INPUT type= "radio" name="opti" value="cout_envoi"> Cout d\'envoi minimal (troupes + ressources)</br>'
							+'<INPUT type= "radio" name="opti" value="conso"> Conso minimale</br>'
							+'<INPUT type= "radio" name="opti" value="perte_troupe"> Cout des troupes perdues minimal</br>'
							+'<INPUT type= "radio" name="opti" value="perte_mini"> Perte minimale (troupes + ressources)</br></br>';
							

var btn_display = document.createElement("input");
    btn_display.type = "button";
	btn_display.value = "Afficher";
	btn_display.id = 'btn_display';
	btn_display.style.display ='none';
	btn_display.onclick = function(){
		var radios = document.getElementsByName("opti");
			for(var i = 0; i < radios.length; i++) {
				if(radios[i].checked) selectedValue = radios[i].value;   
			}
			if(!selectedValue){
				alert('Cocher un choix');
			}else{
				if(selectedValue=='cout_troupe'){
					simuler_afficher(armee[id_min_cout_troupe], 'rc_ulti', 'rc_info2');
				}
				if(selectedValue=='cout_envoi'){
					simuler_afficher(armee[id_min_cout_envoi], 'rc_ulti', 'rc_info2');
				}
				if(selectedValue=='conso'){
					simuler_afficher(armee[id_min_conso], 'rc_ulti', 'rc_info2');
				}
				if(selectedValue=='perte_troupe'){
					simuler_afficher(armee[id_min_perte_troupe], 'rc_ulti', 'rc_info2');
				}
				if(selectedValue=='perte_mini'){
					simuler_afficher(armee[id_min_perte_total], 'rc_ulti', 'rc_info2');
				}
			}
	};				

var zone_du_rc = document.createElement('div');
	zone_du_rc.id='rc_ulti';	
	
var div_global_info = document.createElement('div');
	div_global_info.id='rc_info2';	
	
	MyDiv10.appendChild(btn_simulate);
	MyDiv10.appendChild(info_simu);	
	MyDiv10.appendChild(zone_de_choix);
	MyDiv10.appendChild(btn_display);	
	MyDiv10.appendChild(zone_du_rc);
	MyDiv10.appendChild(div_global_info);

}

function val(i,j){
	var result=0;
	if (j==0){result = i;}
	else if (j%2==1){
		var temp = j;
		while(temp>0){
			result+=Math.pow(i,(temp+1)/2);
			temp-=2;
		}
	} else {
		var temp = j;
		while(temp>0){
			result+=Math.ceil(sFact(i)/sFact(i-((temp)/2)));
			temp-=2;
		}
	}
	return lisibilite_nombre(result);
}

function sFact(num){
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

function Add_stat_simu(){
	var MyDiv11= document.createElement('div');
		MyDiv11.id='Header6';

	document.getElementById('battleReport').firstChild.appendChild(MyDiv11); 

	var titre10=document.createElement('h2');
	titre10.className='battleReport tableHeader';
	titre10.innerHTML='Information concernant le Simu opti :';

	var army=document.createElement('input');
		army.type="checkbox";
		army.name="see_unit";
		army.id='see_unit';
		army.onclick =function(){
			toggle(this,'Content6');
		};
		
	var texte_army=document.createElement("div");
		texte_army.innerHTML="Voir le tableau";
		texte_army.style.cssText = 'position:relative;top:-16px;left:25px;width:250px;';

	MyDiv11.appendChild(titre10);
	MyDiv11.appendChild(army);	
	MyDiv11.appendChild(texte_army);

	var MyDiv12 = document.createElement('div');
		MyDiv12.id='Content6';
		MyDiv12.style.display='none';

	document.getElementById('battleReport').firstChild.appendChild(MyDiv12);
	
	var texte = document.createElement('div');
		texte.style.fontSize="12px";
		texte.innerHTML='Nb de listes avec doublons : Nombre d\'armée générées avec des doublons (par ex : f22, b1, f22)</br>'
						+'Nb de listes avec doublons : Nombre d\'armées générées une fois la suppression des doublons (c\'est sur ces armées que la simulation aura lieu)</br>'
						+'Nb d\'unités en "Oui" : Nombre d\'unités qui sont réglées en "Oui" dans les options ci-dessus</br>'
						+'X unité(s) : Nombre maximale d\'unités différentes de l\'attaquant générés dans le RC (par ex 3 pour f22, b1, b2)</br></br>'
						+'Il est facile de comprendre que j\'ai (pour l\'instant) limité à 4 le nb d\'unités pour limiter les possibilités. Merci de limiter au plus stricte possibles les unités que vous souhaitez voir paraitre dans les simulation (environ 10-15 pour limiter le temps de calcul)</br></br></br>';
		
	document.getElementById('Content6').appendChild(texte);
	
	var tableau = document.createElement('table');
		tableau.className='battleReport';
		tableau.style.cssText='text-align:center;';
	document.getElementById('Content6').appendChild(tableau);
	
	var entete = document.createElement('tr');
		entete.innerHTML = '<th rowspan="2">Nb d\'unités en "Oui"</th><th colspan = "2">1 unité</th><th colspan = "2">2 unités</th><th colspan = "2">3 unités</th><th colspan = "2">4 unités</th><th colspan = "2">5 unités</th>'
	
	var A = 'Nb de listes avec doublons';
	var B = 'Nb de listes sans doublons';
	
	var entete2 = document.createElement('tr');
		entete2.innerHTML = '<th>'+A+'</th><th>'+B+'</th><th>'+A+'</th><th>'+B+'</th><th>'+A+'</th><th>'+B+'</th><th>'+A+'</th><th>'+B+'</th><th>'+A+'</th><th>'+B+'</th>'
	
	tableau.appendChild(entete);
	tableau.appendChild(entete2);
	
	for(var i=1;i<31;i++){
		var ligne = document.createElement('tr');
		tableau.appendChild(ligne);
		for(var j=0;j<11;j++){
			var colonne = document.createElement('td');
				colonne.innerHTML='<div style="width: 100px;">'+val(i,j)+'</div>';
					if (i==Unit_selectionnable.length && (j==8 || j==7)){
						colonne.style.cssText='font-weight:bold; color:blue; ';
					}
					if (j==0){
						colonne.style.cssText='font-weight:bold;';
					}
			ligne.appendChild(colonne);
		}
	}
}

document.getElementsByClassName("battleReportProtocol")[0].remove();
document.getElementsByTagName('a')[0].remove();

load_pref();
read_RC();
Convert_RC();
generate_RC_info();
//Add_graph();
//Add_list_opponent();
Add_DYOA();
//Add_simu_opti();
//Add_option();
resize("600px");
//Add_stat_simu();