// ==UserScript==
// @name           DO_boosteur
// @author         Coni
// @description    Coté du joueur qui boost
// @include        http://*.desert-operations.*/world*/handel.php*
// @version        4.02
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_boosteur.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_boosteur.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_boosteur.user.js
// @require		   https://sites.google.com/site/coni63do/plugin/fonctions.js
// @require		   https://sites.google.com/site/coni63do/plugin/unite.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

function Add_affichage(){

if(!document.getElementById('Content')){

	var My_Div = document.createElement('div');
		My_Div.id='Content';
	document.getElementsByClassName('blockFoot')[0].appendChild(My_Div);
	
	var tableau  = document.createElement('table');
		tableau.width = "100%";
		tableau.innerHTML = '<tr>'
								+'<th style="text-align:center; color:red;" colspan="3">'
									+'>>>>>>>>>>>>>>>   Ne lancer qu\'un plugin en même temps !!!!  <<<<<<<<<<<<'
								+'</th>'
							+'</tr>'
							+'<tr>'
								+'<th style="text-align:center;">'
									+'DO booster'
								+'</th>'
								+'<th style="text-align:center;">'
									+'DO boosteur'
								+'</th>'
								+'<th style="text-align:center;">'
									+'DO ressources'
								+'</th>'
							+'</tr>'
							+'<tr>'
								+'<td id="col1">'
								+'</td>'
								+'<td id="col2">'
								+'</td>'
								+'<td id="col3">'
								+'</td>'
							+'</tr>';
						
	document.getElementById('Content').appendChild(tableau);

}

var newButton = document.createElement('input');
	newButton.type='button';
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
			GM_setValue('Start', true);
			 location.reload() ; 
		}
	};
	
document.getElementById('col2').appendChild(newButton);

var My_Div2 = document.createElement('div');
document.getElementById('col2').appendChild(My_Div2);

var My_text = document.createElement('div');
	My_text.innerHTML='Nom du joueur';

var Nom_du_joueur = document.createElement('input');
	Nom_du_joueur.type = "text";
	Nom_du_joueur.style.width = "150px";
	Nom_du_joueur.id='Nom_du_joueur';
	Nom_du_joueur.value=Joueur;
	Nom_du_joueur.onkeyup = function(){GM_setValue('Joueur', this.value);}

My_Div2.appendChild(My_text);
My_Div2.appendChild(Nom_du_joueur);

var My_Div3 = document.createElement('div');
document.getElementById('col2').appendChild(My_Div3);

var My_text2 = document.createElement('div');
	My_text2.innerHTML='Nom de l\'unité :';

var Ma_Liste = document.createElement('select');
	Ma_Liste.style.width="160px";
	Ma_Liste.id='ListeElement';
	Ma_Liste.onchange=function(){
		GM_setValue('Unite', this.options[this.selectedIndex].value);
	}

var options=new Array();

for(var i =1 ; i< Unit_Name.length ; i++){
	options[i] = document.createElement('option');
	options[i].value = Unit_Name[i];
	options[i].innerHTML = Unit_Name[i];
	Ma_Liste.appendChild(options[i]);
}

options[Unite.getId()].selected="selected";

My_Div3.appendChild(My_text2);
My_Div3.appendChild(Ma_Liste);
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

var Joueur = GM_getValue('Joueur', 'FEDEX22');
var Liste_push = Joueur.split(',');
var Unite = GM_getValue('Unite', 'F22 Raptor');
var Numero = GM_getValue('Numero', 0);
var Start = GM_getValue('Start', false);
var LongTime = Math.floor((Math.random()*30000)+30000); // entre 30s et 1min

Add_affichage();
if (Start == true){
	var player = Liste_push[Numero].trim();
	setTimeout(function(){BuyTo(player, Unite);}, LongTime);
}

/*
function updateTradePrices(){
sTradeOfferAmount=$("#tradeOfferAmount").val().replace(/[^0-9]/g,"");
0<$("#tradePublicPrice").length&&(setNewPrice(!1),$("#price_count").val(sTradeNewPrice));
0<$("#tradeAlliancePrice").length&&(setNewPrice(!0),$("#ally_price_count").val(sTradeNewPrice))
}*/