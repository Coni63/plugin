// ==UserScript==
// @name           DO_ressource
// @author         Coni
// @description    Achete des ressources automatiquement
// @include        http://*.desert-operations.*/world*/handel.php*
// @require		fonctions.js
// @require		unite.js
// @grant          GM_getValue
// @grant          GM_setValue
// @version        1.01
// ==/UserScript==

function Add_affichage(){

if(!document.getElementById('Content')){

	var My_Div = document.createElement('div');
		My_Div.id='Content';
	document.getElementsByClassName('blockFoot')[0].appendChild(My_Div);
	
	var tableau  = document.createElement('table');
		tableau.width = "100%";
		tableau.innerHTML =  '<tr>'
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
			window.location.href='http://game.desert-operations.fr/world1/handel.php?mode=4';
		} else {
			GM_setValue('Start', true);
			 location.reload() ; 
		}
	};

var Ma_Liste = document.createElement('select');
	Ma_Liste.id='Ress';
	Ma_Liste.innerHTML = '<option value="r_3">Pétrole</option><option value="r_4">Munition</option><option value="r_2">Or</option>';
	Ma_Liste.onchange=function(){
		var temp = document.getElementById('Ress').options[document.getElementById('Ress').selectedIndex].value;
		GM_setValue('Ress', temp);
	}
	
	var list_opt=Ma_Liste.getElementsByTagName('option');
	for (var i=0;i<list_opt.length;i++){
		if (list_opt[i].value == ressource){list_opt[i].selected="selected"}
	}
	
document.getElementById('col3').appendChild(newButton);
document.getElementById('col3').appendChild(Ma_Liste);

var My_Div2 = document.createElement('div');
document.getElementById('col3').appendChild(My_Div2);

var My_text = document.createElement('div');
	My_text.innerHTML='Qte Mini';

var My_convert1=document.createElement("div");
	My_convert1.style.cssText = 'position:relative;top:-24px;left:125px;width:50px;';
	My_convert1.innerHTML = Convert(parseInt(Val_mini.replace(/[^0-9]/gi,'')));
	
var Txt_mini = document.createElement('input');
	Txt_mini.type = "text";
	Txt_mini.style.width = "100px";
	Txt_mini.id='Txt_mini';
	Txt_mini.value=Val_mini;
	Txt_mini.onkeyup = function(){
		GM_setValue('Val_mini', this.value);
		Txt_mini.value=lisibilite_nombre(Txt_mini.value.replace(/[^0-9]/gi,''));
		My_convert1.innerHTML = Convert(parseInt(Txt_mini.value.replace(/[^0-9]/gi,'')));
	}

My_Div2.appendChild(My_text);
My_Div2.appendChild(Txt_mini);
My_Div2.appendChild(My_convert1);

var My_Div3 = document.createElement('div');
document.getElementById('col3').appendChild(My_Div3);

var My_text2 = document.createElement('div');
	My_text2.innerHTML='Qte totale voulue :';
	
var My_convert2=document.createElement("div");
	My_convert2.style.cssText = 'position:relative;top:-24px;left:125px;width:50px;';
	My_convert2.innerHTML = Convert(parseInt(Val_maxi.replace(/[^0-9]/gi,'')));
	
var Txt_maxi = document.createElement('input');
	Txt_maxi.type = "text";
	Txt_maxi.style.width = "100px";
	Txt_maxi.id='Txt_maxi';
	Txt_maxi.value=Val_maxi;
	Txt_maxi.onkeyup = function(){
		GM_setValue('Val_maxi', this.value);
		Txt_maxi.value=lisibilite_nombre(Txt_maxi.value.replace(/[^0-9]/gi,''));
		My_convert2.innerHTML = Convert(parseInt(Txt_maxi.value.replace(/[^0-9]/gi,'')));
	}

My_Div3.appendChild(My_text2);
My_Div3.appendChild(Txt_maxi);
My_Div3.appendChild(My_convert2);
}

function CliqueBuy(a,b,c, index){
	b-=c; //on retire la qté HT a ce que l'on veut en tout
	GM_setValue('Val_maxi', lisibilite_nombre(b)); // on la save pour le prochain achat
	if ( b<=a){GM_setValue('Start', false);} // si le max vaut le min ou moins on stop le plugin
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
		var min = parseInt(min.replace(/[^0-9]/gi,''));
		var max = parseInt(max.replace(/[^0-9]/gi,''));
		var formulaire = document.getElementsByTagName('form'); // on recup tous les formulaire
		for(var i = 0; i<formulaire.length;i++){
			if(formulaire[i].className=='tradeBuyOffer' && formulaire[i].id!='countdownCount'){ // s'il correspond à une vente
				var Qte=formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[0].title;
				var Qte = parseInt(Qte.replace(/[^0-9]/gi,''));
					if(Qte>=min && Qte<=max && formulaire[i].getElementsByClassName('formColumn column20 ltr alignCenter')[0]== null){ // si on est dans les bonnes qté et pas en lot
						CliqueBuy(min, max, Qte, i);
					}
					if(Qte>=min && formulaire[i].getElementsByClassName('formColumn column20 ltr alignCenter')[0]!= null){ // si supérieur au min et en lot
						var max_possible = parseInt(formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].max.replace(/[^0-9]/gi,''));
							if(Math.min(max_possible , max)==max_possible){
								var temp2 = formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].max;
								var temp2num = max_possible;
							}else{ 
								var temp2 =lisibilite_nombre(max);
								var temp2num = max;
							}
						formulaire[i].getElementsByClassName('adjNumInput tradeSearchSplittedCount')[0].value = temp2;
						CliqueBuy(min, max, temp2num, i);
					}
			}
		}
		setTimeout(function(){location.reload();}, LongTime);
	}
}

var Val_maxi = GM_getValue('Val_maxi', '1.000.000.000.000.000.000');
var Val_mini = GM_getValue('Val_mini', '10.000.000.000.000.000.000');
var ressource = GM_getValue('Ress', 'r_3');
var Start = GM_getValue('Start', false);
var Timer = GM_getValue('Timer', false);
var LongTime = Math.floor((Math.random()*30000)+30000); // entre 30s et 1min

Add_affichage();

if (Start == true && Timer == true){
	Buy(ressource, Val_mini, Val_maxi);
} else if (Start == true && Timer == false){
	setTimeout(function(){
		GM_setValue('Timer', true);
		window.location.href='http://game.desert-operations.fr/world1/handel.php?mode=1&object_id='+ressource+'&goods_partly=1&search_goods=Chercher';
	} , LongTime);
}