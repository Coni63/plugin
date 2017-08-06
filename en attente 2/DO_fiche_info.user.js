// ==UserScript==
// @name           DO fiche Info
// @author         Coni
// @description    Donne des infos sur les fiches des joueurs
// @include        http://*.desert-operations.*/world*/userdetails.php?*
// @include		   http://*.desert-operations.*/world*/flottendetails.php?*
// @version        4.20
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_fiche_info.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_fiche_info.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_fiche_info.user.js
// @require		   https://sites.google.com/site/coni63do/plugin/fonctions.js
// @require		   https://sites.google.com/site/coni63do/plugin/bignumber.js
// @require		   https://sites.google.com/site/coni63do/plugin/unite.js
// @grant		   none
// ==/UserScript==

var URL = 'http://game.desert-operations.fr/world1/flottendetails.php?user=';

if (window.location.href.substr(0, 64) !=  URL){
	var Tableau = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

	var Total = 0;
	var lvl = new Array();
	var pts_fixe = 0; 

	var index_Usines = 0;
	var index_UDM = 0;
	var index_Mines = 0;
	var index_Raff = 0;
	var index_taux = 0;
	var index_pts = 0;

	var Qte_Usines = 0;
	var Qte_UDM = 0;
	var Qte_Mines = 0;
	var Qte_Raff = 0;
	var Qte_ZC_HAB = 0;
	var Taux = 0;
	var Pts_actuel = 0;

	var Pts_Usines = 0;
	var Pts_UDM = 0;
	var Pts_Mines = 0;
	var Pts_Raff = 0;
	var Pts_ZC_HAB = 0;

	function Estimate_ZC_HAB(){
		Pts_Usines = n(Qte_Usines).multiply(1000);
		Pts_UDM = n(Qte_UDM).multiply(300);
		Pts_Mines = n(Qte_Mines).multiply(80);
		Pts_Raff = n(Qte_Raff).multiply(125);
		Pts_ZC_HAB = Pts_actuel - Pts_Usines - Pts_UDM - Pts_Mines - Pts_Raff - pts_fixe;
		Qte_ZC_HAB = Pts_ZC_HAB/300;
		//Pts_ZC_HAB = n(Pts_actuel).subtract(Pts_Usines).subtract(Pts_UDM).subtract(Pts_Mines).subtract(Pts_Raff).subtract(pts_fixe);
		//Qte_ZC_HAB = n(Pts_ZC_HAB).divide(300); //225 et 310
	}

	function Get_lvl(pts){
		var last = pts.toString().substr(pts.length-1,1);
		if(last=='2' || last=='7'){lvl=[29,30]; pts_fixe = '4000000000';}
		if(last=='1' || last=='6'){lvl=[20,28]; pts_fixe = '1000000000';}
		if(last=='5' || last=='0'){lvl=[21,25,26,27];}
		if(last=='4' || last=='9'){lvl=[22,23,24];}
	}

	function Recup_Val(){
		
		for(var i=0;i<Tableau.length-1;i++){
			
			var Nom_Bat = Tableau[i].firstChild.innerHTML.replace(' :','');
			
			if (Nom_Bat=='Usine de munition'){
				Qte_UDM=Tableau[i].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				index_UDM= i;
			}
			
			if(Nom_Bat=='Usines'){
				Qte_Usines=Tableau[i].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				index_Usines= i;
			}
			
			if(Nom_Bat=='Mines'){
				Qte_Mines=Tableau[i].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				index_Mines= i;
			}
			
			if(Nom_Bat=='Raffineries'){
				Qte_Raff=Tableau[i].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				index_Raff= i;
			}

			if (Nom_Bat=='Pertes max.'){
				Taux = Tableau[i].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				index_taux= i;
			}
			
			if (Nom_Bat=='Points'){
				Pts_actuel = Tableau[i].lastChild.firstChild.innerHTML.replace(/[^0-9]/gi,'');
				index_pts = i;
			}
			
		}
		
	}

	function ChangeVal(){
		Tableau[index_pts].lastChild.firstChild.innerHTML +=' ( lvl : '+ lvl.join(' / ') +' )'; 
		Tableau[index_Usines].lastChild.innerHTML = Create_Aff(Qte_Usines) + ' (' + Create_Aff(Pts_Usines) + ' pts)';
		Tableau[index_UDM].lastChild.innerHTML = Create_Aff(Qte_UDM) + ' (' + Create_Aff(Pts_UDM) + ' pts)';
		Tableau[index_Mines].lastChild.innerHTML = Create_Aff(Qte_Mines) + ' (' + Create_Aff(Pts_Mines) + ' pts)';
		Tableau[index_Raff].lastChild.innerHTML = Create_Aff(Qte_Raff) + ' (' + Create_Aff(Pts_Raff) + ' pts)';
	}

	function Add_Line(){
		var ligne_Zc = document.createElement('tr');
			ligne_Zc.innerHTML = '<td>ZC + Hab (estimées) :</td><td colspan="2">' + Create_Aff(Qte_ZC_HAB) + ' (' + Create_Aff(Pts_ZC_HAB) + ' pts)</td>';

		Tableau[index_pts-1].parentNode.insertBefore(ligne_Zc, Tableau[index_pts-1]);
	}

	function Pts_prenables(){

	var Pts_perdables = n(Pts_actuel).minus(pts_fixe).minus(Pts_UDM).multiply(Taux).divide(100);
	Tableau[index_pts+1].lastChild.firstChild.innerHTML+=' ('+Create_Aff(Pts_perdables)+' pts prenables)';

	}

	Recup_Val();
	Get_lvl(Pts_actuel);
	Estimate_ZC_HAB();
	ChangeVal();
	Add_Line();
	Pts_prenables();

} else { // **************************** SECTION DEFENSE **********************


	function CreerAff(val, Texte, node, id_2){

	var mybr = document.createElement('br');
	node.appendChild(mybr)

	var newlabel = document.createElement("Label");
		newlabel.setAttribute("for", id_2);
		newlabel.innerHTML = Texte;
		node.appendChild(newlabel);

	var affichage = document.createElement('span');
		affichage.title = lisibilite_nombre(val);
		affichage.data = lisibilite_nombre(val);
		affichage.id = id_2
		affichage.className ='tooltipExtention showTooltipDefault';
		affichage.innerHTML=Create_Aff(val);
	node.appendChild(affichage);
	}

	var tableau = document.getElementsByTagName('table');
	var armee1 = tableau[1];
	var armee2 = tableau[2];
	var armee3 = tableau[3];
	var reserve = tableau[4];
	var fixe = tableau[5];
	var posi = tableau[0].firstChild.lastChild.getElementsByClassName('alignCenter');

	var Reserve_Nom = reserve.getElementsByClassName('alignLeft widthFourth');
	var Reserve_Qte = reserve.getElementsByClassName('alignLeft widthThird noBreak');

	var Armee1_Nom = armee1.getElementsByClassName('alignLeft widthHalf');
	var Armee1_Qte = armee1.getElementsByClassName('alignRight widthHalf');

	var Armee2_Nom = armee2.getElementsByClassName('alignLeft widthHalf');
	var Armee2_Qte = armee2.getElementsByClassName('alignRight widthHalf');

	var Armee3_Nom = armee3.getElementsByClassName('alignLeft widthHalf');
	var Armee3_Qte = armee3.getElementsByClassName('alignRight widthHalf');

	var Fixe_Nom = fixe.getElementsByClassName('alignLeft widthFourth');
	var Fixe_Qte = fixe.getElementsByClassName('alignLeft widthThird noBreak');

	var Entretien=0;
	var Prix=0;

	for (var i = 0 ; i<Reserve_Nom.length ;i++){

	var Qte = Reserve_Qte[i].firstChild.title.replace(/[^0-9]/gi,'');
	var PU = Unites_Stats[Reserve_Nom[i].innerHTML][0];
	var Support = Unites_Stats[Reserve_Nom[i].innerHTML][4];

	Prix = n(Qte).multiply(PU).plus(Prix);
	Entretien = n(Qte).multiply(Support).plus(Entretien);

	}
	CreerAff(Prix, 'Prix des Unités : ', reserve.firstChild.lastChild.firstChild , 'reserve');
	CreerAff(Entretien, 'Entretien des Unités : ', reserve.firstChild.lastChild.firstChild , 'reserve2');

	Entretien=0;
	Prix=0;

	for (var i = 0 ; i<Armee1_Nom.length ;i++){

	var Qte = Armee1_Qte[i].firstChild.title.replace(/[^0-9]/gi,'');
	var PU = Unites_Stats[Armee1_Nom[i].innerHTML][0];
	var Support = Unites_Stats[Armee1_Nom[i].innerHTML][4];

	Prix = n(Qte).multiply(PU).plus(Prix);
	Entretien = n(Qte).multiply(Support).plus(Entretien);

	}

	CreerAff(Prix, 'Prix des Unités : ', posi[0] , 'armee1');
	CreerAff(Entretien, 'Entretien des Unités : ', posi[0] ,  'armee12');

	Entretien=0;
	Prix=0;

	for (var i = 0 ; i<Armee2_Nom.length ;i++){

	var Qte = Armee2_Qte[i].firstChild.title.replace(/[^0-9]/gi,'');
	var PU = Unites_Stats[Armee2_Nom[i].innerHTML][0];
	var Support = Unites_Stats[Armee2_Nom[i].innerHTML][4];

	Prix = n(Qte).multiply(PU).plus(Prix);
	Entretien = n(Qte).multiply(Support).plus(Entretien);

	}

	CreerAff(Prix, 'Prix des Unités : ', posi[1] , 'armee2');
	CreerAff(Entretien, 'Entretien des Unités : ', posi[1],  'armee22');

	Entretien=0;
	Prix=0;

	for (var i = 0 ; i<Armee3_Nom.length ;i++){

	var Qte = Armee3_Qte[i].firstChild.title.replace(/[^0-9]/gi,'');
	var PU = Unites_Stats[Armee3_Nom[i].innerHTML][0];
	var Support = Unites_Stats[Armee3_Nom[i].innerHTML][4];

	Prix = n(Qte).multiply(PU).plus(Prix);
	Entretien = n(Qte).multiply(Support).plus(Entretien);

	}

	CreerAff(Prix, 'Prix des Unités : ', posi[2],  'armee3');
	CreerAff(Entretien, 'Entretien des Unités : ', posi[2],  'armee32');

	Entretien=0;
	Prix=0;

	for (var i = 0 ; i<Fixe_Nom.length ;i++){

	var Qte = Fixe_Qte[i].firstChild.title.replace(/[^0-9]/gi,'');
	var PU = Unites_Stats[Fixe_Nom[i].innerHTML][0];

	Prix = n(Qte).multiply(PU).plus(Prix);

	}

	CreerAff(Prix, 'Prix des Défenses : ', fixe.firstChild.lastChild.firstChild ,  'Fixe');


}