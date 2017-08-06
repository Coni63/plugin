// ==UserScript==
// @name           DO_all_in_one
// @author         Coni
// @description    Un plugin pour les gouverner tous
// @include        http://game.desert-operations.fr/*
// @include 		http://www.desert-operations.fr/*
// @updateURL		https://sites.google.com/site/userconiscript/plugin/DO_all_in_one.user.js
// @downloadURL		https://sites.google.com/site/userconiscript/plugin/DO_all_in_one.user.js
// @installURL		https://sites.google.com/site/userconiscript/plugin/DO_all_in_one.user.js
// @require		   https://sites.google.com/site/userconiscript/plugin/fonctions.js
// @require		   https://sites.google.com/site/userconiscript/plugin/bignumber.js
// @require		   https://sites.google.com/site/userconiscript/plugin/md5.js
// @require		   https://sites.google.com/site/userconiscript/plugin/unite.js
// @require		   https://sites.google.com/site/userconiscript/plugin/dhtmlxmessage.js
// @resource       My_CSSnotif  https://sites.google.com/site/userconiscript/plugin/dhtmlxmessage_dhx_skyblue.css
// @resource logo  https://sites.google.com/site/userconiscript/plugin/alerte.png
// @resource       My_CSS  https://sites.google.com/site/userconiscript/plugin/Style_DO.css
// @version        1.90
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// @grant    	   GM_deleteValue
// @grant          GM_setClipboard
// @grant		   GM_getResourceURL
// @grant		   GM_getResourceText
// @grant    	   GM_addStyle
// ==/UserScript==

var cssTxt  = GM_getResourceText ("My_CSS");
GM_addStyle(cssTxt);

var cssTxt2  = GM_getResourceText ("My_CSSnotif");
GM_addStyle(cssTxt2);

function parseAJAX_ResponseHTML(respObject){
	var parser      = new DOMParser ();
	var responseDoc = parser.parseFromString (respObject.responseText, "text/html");
	return responseDoc;
}

function List_RERC(){

	var RC_debut = GM_getValue('Debut_RC',4228747);
	var RC_fin = GM_getValue('Fin_RC',4228748);
	var RE_debut = GM_getValue('Debut_RE',2916364);
	var RE_fin = GM_getValue('Fin_RE',2916365);
	
	var posi = document.getElementById('content_main');
	var elem_before = document.getElementById('IndicatorsLeft');
	var mon_div= document.createElement('div');
		mon_div.className='block';
		mon_div.innerHTML = '<h1 class="blockHead">Lister RC <a href="http://www.md5online.fr/decrypter-md5.html" target="_blank">-Decrypter MD5-</a> <a href="http://www.md5online.fr/crypter-md5.html" target="_blank">-Crypter MD5-</a></h1>'
							+'<div class="openblock">'
								+'<table>'
									+'<td style="width:350px; text-align:center;">'
										+'<label for="start_rc">RC début n°</label>'
										+'<input type="text" id="start_rc" value="'+RC_debut+'" size="7" /></br>'
										+'<label for="end_rc">RC fin n°</label>'
										+'<input type="text" id="end_rc" value="'+RC_fin+'" size="7" /></br>'
										+'<input type="button" value = "Générer les RC" id="launch_listing_rc"/>'
									+'</td>'
									+'<td style="width:350px; text-align:center;">'
										+'<label for="start_re">RE début n°</label>'
										+'<input type="text" id="start_re" value="'+RE_debut+'" size="7" /></br>'
										+'<label for="end_re">RE fin n°</label>'
										+'<input type="text" id="end_re" value="'+RE_fin+'" size="7" /></br>'
										+'<input type="button" value = "Générer les RE" id="launch_listing_re"/>'
									+'</td>'
								+'</table>'
									+'<div>'
										//+'<div class="floatLeft widthNearHalf">'
											+'<table id="moreBattleReportsContainer" class="standard">'
												+'<caption>Rapport Générés</caption>'
												+'<tbody id="result_rc">'
													+'<tr>'
														+'<th class="ltr col1">ID Rapport</th>'
														+'<th class="ltr col2">Attaquant</th>'
														+'<th class="ltr col2">Défenseur</th>'
														+'<th class="ltr col3">Date</th>'
														+'<th class="ltr col1">Lien</th>'
													+'</tr>'
												+'</tbody>'
											+'</table>'
										/*+'</div>'
										+'<div class="floatRight widthHalf">'
											+'<table id="moreSpioReportsContainer" class="standard">'
												+'<caption>Rapport d\'espionnage</caption>'
												+'<tbody id="result_re">'
													+'<tr>'
														+'<th class="ltr">id RE</th>'
														+'<th class="ltr">Joueur</th>'
														+'<th class="ltr">Type</th>'
														+'<th class="ltr">Date</th>'
														+'<th class="ltr">Lien</th>'
													+'</tr>'
												+'</tbody>'
											+'</table>'
										+'</div>'*/
									+'</div>'
							+'</div>'
							+'<div class="blockFoot"></div>';
	
	posi.insertBefore(mon_div,elem_before);
	
	function addline(nume, A, D, Da, L, Id_col){
		var ligne = document.createElement('tr');
			ligne.innerHTML = '<td class="col1">'+nume+'</td>'
							+'<td class="col2">'+A+'</td>'
							+'<td class="col2">'+D+'</td>'
							+'<td class="col3">'+Da+'</td>'
							+'<td class="col1"><a href="'+L+'" target="_blank"><img src="images/classic/icons/report.png"/></a></td>';
										
			document.getElementById(Id_col).appendChild(ligne);
	
	}
	
	function AddClass(Id_col){
		var numligne = document.getElementById(Id_col).getElementsByTagName('tr');
			for (var j = 1 ; j< numligne.length ; j++){
				if (j%2 ==1){
					numligne[j].className='odd';
				} else {
					numligne[j].className='even';
				}
			}
	}
	
	function RequestRc(numero, url_lien){
					GM_xmlhttpRequest({
							  method: "GET",
							  url: url_lien,
							  onload: function(response){ 
									parseAJAX_ResponseHTML(response);
									var res = document.createElement('div');
										res.innerHTML = response.responseText;
									
									var texte = res.getElementsByClassName('battleReport')[0].childNodes[2].innerHTML;
									var att = texte.split('&nbsp;')[1].split('<br>')[0];
									var def = texte.split('&nbsp;')[2].split('<br>')[0];
									var date =texte.split('&nbsp;')[3].split('<br>')[0];
									
									addline(numero, att, def, date, response.finalUrl, 'result_rc');
									AddClass('result_rc');
							  }
				});
	
	}
	
	function RequestRe(numero, url_lien){
				GM_xmlhttpRequest({
				  method: "GET",
				  url: url_lien,
				  onload: function(response){ 
					var res = document.createElement('div');
						res.innerHTML = response.responseText;
					var texte = res.getElementsByClassName('spionageReport')[0].childNodes[2].innerHTML;
					var Joueur = texte.split('&nbsp;')[2].split('<br>')[0];
					var date =texte.split('&nbsp;')[1].split('<br>')[0];
					if(res.getElementsByClassName('spionageReport')[1].innerHTML=='Rapport d\'espionnage - Défense'){
						var Type='Défense';
					} else if (res.getElementsByClassName('spionageReport')[1].innerHTML=='Rapport d\'espionnage - Unités'){
						var Type='Unités';
					} else if(res.getElementsByClassName('spionageReport')[1].innerHTML=='Rapport d\'espionnage - Ressources'){
						var Type='Ressources';
					}
					
					addline(numero, Joueur, Type, date, response.finalUrl, 'result_rc');
					AddClass('result_rc');
					}
				});
	}
	
	document.getElementById('launch_listing_rc').onclick=function(){
	
		document.getElementById('result_rc').innerHTML ='<tr>'
															+'<th class="ltr col1">ID RC</th>'
															+'<th class="ltr col2">Attaquant</th>'
															+'<th class="ltr col2">Défenseur</th>'
															+'<th class="ltr col3">Date</th>'
															+'<th class="ltr col1">Lien</th>'
														+'</tr>';
		
		var debut = parseInt(document.getElementById('start_rc').value);
		var fin = parseInt(document.getElementById('end_rc').value);
		if ( fin >= debut ){
			for (var i=debut; i<fin+1; i++){
				var num = ''+i;
				var code = hex_md5(num);
				var lien = "http://game.desert-operations.fr/"+World+"/battleReport.php?code="+code+"";
				RequestRc(num, lien);
			}
		} else {
			alert('Pas bon');
		}
	}
	
	document.getElementById('launch_listing_re').onclick=function(){
	
		document.getElementById('result_rc').innerHTML ='<tr>'
															+'<th class="ltr col1">ID RE</th>'
															+'<th class="ltr col2">Joueur</th>'
															+'<th class="ltr col2">Type</th>'
															+'<th class="ltr col3">Date</th>'
															+'<th class="ltr col1">Lien</th>'
														+'</tr>';
		
		var debut = parseInt(document.getElementById('start_re').value);
		var fin = parseInt(document.getElementById('end_re').value);
		if ( fin >= debut ){
			for (var i=debut; i<fin+1; i++){
				
				var num = ''+i;
				var code = hex_md5(num);
				var lien = 'http://game.desert-operations.fr/'+World+'/spionageReport.php?code='+code;
				RequestRe(num, lien);
			}
		} else {
			alert('Pas bon');
		}
		
	}

	document.getElementById('start_rc').onchange = function(){GM_setValue('Debut_RC',this.value);}
	document.getElementById('end_rc').onchange = function(){GM_setValue('Fin_RC',this.value);}
	document.getElementById('start_re').onchange = function(){GM_setValue('Debut_RE',this.value);}
	document.getElementById('end_re').onchange = function(){GM_setValue('Fin_RE',this.value);}
}

function DO_MeP_army(){
	
	function findElements(name){
        var elArray = [];
        var tmp = document.getElementsByTagName("*");
        var regex = new RegExp( name + "\[[0-9]+\]");
        for ( var i = 0; i < tmp.length; i++ ) {

            if ( regex.test(tmp[i].name) ) {
                elArray.push(tmp[i]);
            }
        }
        return elArray;
    }
	
	function Generate_Tableau(id, nom, de, a, nb, id2, nom2, de2, a2, nb2, id3, nom3, de3, a3, nb3){
		var tab = document.createElement('div');
			tab.className='block';
			tab.innerHTML = '<h1 class="blockHead">Réorganisation #2 (BETA)</h1>'
								+'<div class="openblock">'
									+'<form method="post" action="militaer.php">'
										+'<div class="milTableContainer">'
											+'<table class="milTable" dir="ltr">'
												+'<tbody id="tab_rear">'
													+'<tr class="color1">'
														+'<th style="width:100px">Unité</th>'
														+'<th style="width:50px">Origine</th>'
														+'<th style="width:60px">Destination</th>'
														+'<th style="width:50px">Stock</th>'
														+'<th style="width:343px">Quantité</th>'
													+'</tr>'
												+'</tbody>'
											+'</table>'
										+'</div>'
									+'</form>'
								+'</div>'
								+'<div class="blockFoot">'
								+'</div>';
								
		document.getElementById('lightboxContent').appendChild(tab);
		
		for(var i = 0; i<id.length ; i++){
			var ligne = document.createElement('tr');
				ligne.innerHTML='<td class="alignLeft">'
									+ nom[i].value
									+ id[i].outerHTML
									+ nom[i].outerHTML
									+ id2[i].outerHTML
									+ nom2[i].outerHTML
									+ id3[i].outerHTML
									+ nom3[i].outerHTML
								+'</td>'
								+'<td class="milCell">'
									+ de[i].value
									+ de[i].outerHTML
									+ de2[i].outerHTML
									+ de3[i].outerHTML
								+'</td>'
								+'<td>'
									+ a[i].outerHTML
									+ a2[i].outerHTML
									+ a3[i].outerHTML
								+'</td>'
								+'<td class="milCell">'
									+Create_Aff(nb[i].getAttribute('max'),type_conversion)
								+'</td>'
								+'<td>'
									+'<div>'
											+ nb[i].outerHTML 
											+'<label for="'+nb[i].id+'" id="label_'+nb[i].id+'" style="position:relative; right:15px; display:inline-block; width:68px;"></label>'//
											+'<input class="tronque" id="tiers'+i+'" type="button" value="1/3" />'
											+'<input class="tronque" id="demi'+i+'" type="button" value="1/2" />'
											+'<input class="tronque" id="max'+i+'" type="button" value="Max" />'
									+'</div>'
									+'<div>'
											+ nb2[i].outerHTML 
											+'<label for="'+nb2[i].id+'" id="label_'+nb2[i].id+'" style="position:relative; right:15px; display:inline-block; width:68px;"></label>'//
											+'<input class="tronque" id="tiers'+(l+i)+'" type="button" value="1/3" />'
											+'<input class="tronque" id="demi'+(l+i)+'" type="button" value="1/2" />'
											+'<input class="tronque" id="max'+(l+i)+'" type="button" value="Max" />'
									+'</div>'
									+'<div>'
											+ nb3[i].outerHTML 
											+'<label for="'+nb3[i].id+'" id="label_'+nb3[i].id+'" style="position:relative; right:15px; display:inline-block; width:68px;"></label>'//
											+'<input class="tronque" id="tiers'+(2*l+i)+'" type="button" value="1/3" />'
											+'<input class="tronque" id="demi'+(2*l+i)+'" type="button" value="1/2" />'
											+'<input class="tronque" id="max'+(2*l+i)+'" type="button" value="Max" />'
									+'</div>'
								+'</td>';					
			document.getElementById('tab_rear').appendChild(ligne);
		}
		
		var btn_reorga = document.createElement('tr');
			btn_reorga.innerHTML='<th class="milCell" colspan="5">'
									+'<input class="input" type="submit" value="Réorganiser" name="switchfleet"></input>'
								+'</th>';		
		document.getElementById('tab_rear').appendChild(btn_reorga);
		
	}
	
	function portion(N, O, b){
		var Qte = document.getElementsByName(N)[O].max;
		return lisibilite_nombre(n(Qte).divide(b));
	}
	
	var id_unit = findElements('einheit');
	var nom_unit = findElements('einheitentyp');
	var from_unit = findElements('from');
	var to_unit = findElements('to');
	var qte_unit = findElements('anz');
	var l = id_unit.length;

	var id_unit1 = new Array();
	var nom_unit1 = new Array();
	var from_unit1 = new Array();
	var to_unit1 = new Array();
	var qte_unit1 = new Array();
	
	var id_unit2 = new Array();
	var nom_unit2 = new Array();
	var from_unit2 = new Array();
	var to_unit2 = new Array();
	var qte_unit2 = new Array();
	
	var id_unit3 = new Array();
	var nom_unit3 = new Array();
	var from_unit3 = new Array();
	var to_unit3 = new Array();
	var qte_unit3 = new Array();
	
	var id_unit4 = new Array();
	var nom_unit4 = new Array();
	var from_unit4 = new Array();
	var to_unit4 = new Array();
	var qte_unit4 = new Array();
	
	
	for (var i = 0 ; i < l ; i++){
	
		id_unit1.push(id_unit[i].cloneNode(true));
		
		nom_unit1.push(nom_unit[i].cloneNode(true));
		
		from_unit1.push(from_unit[i].cloneNode(true));
		
		to_unit1.push(to_unit[i].cloneNode(true));
		
		qte_unit1.push(qte_unit[i].cloneNode(true));
		qte_unit1[i].id+='L1';
	
		id_unit2.push(id_unit[i].cloneNode(true));
		id_unit2[i].name='einheit['+(l+i)+']';
		
		nom_unit2.push(nom_unit[i].cloneNode(true));
		nom_unit2[i].name='einheitentyp['+(l+i)+']';
		
		from_unit2.push(from_unit[i].cloneNode(true));
		from_unit2[i].name='from['+(l+i)+']';
		
		to_unit2.push(to_unit[i].cloneNode(true));
		to_unit2[i].name='to['+(l+i)+']';
		to_unit2[i].id='to'+(l+i);
		to_unit2[i].className='Select1';
		//to_unit2[i].selectedIndex=1;
		
		qte_unit2.push(qte_unit[i].cloneNode(true));
		qte_unit2[i].name='anz['+(l+i)+']';
		qte_unit2[i].id+='L2';
		
		id_unit3.push(id_unit[i].cloneNode(true));
		id_unit3[i].name='einheit['+(2*l+i)+']';
		
		nom_unit3.push(nom_unit[i].cloneNode(true));
		nom_unit3[i].name='einheitentyp['+(2*l+i)+']';
		
		from_unit3.push(from_unit[i].cloneNode(true));
		from_unit3[i].name='from['+(2*l+i)+']';
		
		to_unit3.push(to_unit[i].cloneNode(true));
		to_unit3[i].name='to['+(2*l+i)+']';
		to_unit3[i].id='to'+(2*l+i);
		to_unit3[i].className='Select2';
		//to_unit3[i].selectedIndex=2;
				
		qte_unit3.push(qte_unit[i].cloneNode(true));
		qte_unit3[i].name='anz['+(2*l+i)+']';
		qte_unit3[i].id+='L3';
		
	}
	
		Generate_Tableau(id_unit1, nom_unit1, from_unit1, to_unit1, qte_unit1, id_unit2, nom_unit2, from_unit2, to_unit2, qte_unit2, id_unit3, nom_unit3, from_unit3, to_unit3, qte_unit3);
		
		var select1 = document.getElementsByClassName('Select1');
		var select2 = document.getElementsByClassName('Select2');
		
		for (var i = 0 ; i < select1.length ; i++){
			select1[i].selectedIndex=1;
			select2[i].selectedIndex=2;
		}
		
		var Btn_Event = document.getElementsByClassName('tronque');

		for (var j = 0 ; j < Btn_Event.length ; j++){
			//Btn_Event[j].style.cssText="";
			Btn_Event[j].onclick = function(){
				var type = this.id.replace(/[0-9]+/,'');
				var num = this.id.replace(/[^0-9]+/,'');
				var name= 'anz['+num+']';
				if(num<l){var offset = 1;} else {var offset = 0;} // a cause du form précédent
				var elem = document.getElementsByName(name)[offset];
				if ( type == 'tiers'){
					elem.value = portion(name, offset, 3);
					document.getElementById('label_'+elem.id).innerHTML = Create_Aff(elem.value.replace(/[^0-9]+/gi,''),type_conversion);
				} else if ( type == 'demi'){
					elem.value = portion(name, offset, 2);
					document.getElementById('label_'+elem.id).innerHTML = Create_Aff(elem.value.replace(/[^0-9]+/gi,''),type_conversion);
				} else if ( type == 'max'){
					elem.value = portion(name, offset, 1);
					document.getElementById('label_'+elem.id).innerHTML = Create_Aff(elem.value.replace(/[^0-9]+/gi,''),type_conversion);
				}
			}
		}
		
		var Text_aera = document.getElementsByClassName('adjNumInput input');

		for (var j = 0 ; j < Text_aera.length ; j++){
			Text_aera[j].size = 6;
			Text_aera[j].onkeyup = function(){
				document.getElementById('label_'+this.id).innerHTML = Create_Aff(this.value.replace(/[^0-9]+/gi,''),type_conversion);
			}
		}
}

function DO_def_fixe(){
	var divG = document.createElement('div');
		divG.className='block';
		divG.innerHTML = '<h1 class="blockHead">Rentabilité defs fixes</h1>'
						+'<div class="openblock">'
							+'<table class="standard">'
								+'<tbody>'
									+'<tr class="even">'
										+'<td class="alignCenter">'
											+'<h3>'
												+'<label for="percent_HB">Pourcentage du Hors-Banque investit : </label>'
												+'<input type="text" id="percent_HB" value="75" size="4"></input>'
												+'<label for="percent_HB">%</label></br>'
												+'<label for="percent_reduction">Pourcentage de reduction des defs : </label>'
												+'<input type="text" id="percent_reduction" value="85" size="4"></input>'
												+'<label for="percent_reduction">%</label></br>'
												+'<label for="factor_event">Facteur de l\'event : </label>'
												+'<input type="text" id="factor_event" value="6" size="4"></input></br>'
												+'<label for="multiply_HB">Nombre de fois son hors banque actuel : </label>'
												+'<input type="text" id="multiply_HB" value="1" size="4"></input></br>'
												+'<input type="button" value="Calculer" id="Calcul"/>'
												+'<div id="result" style="display:none"></div>'
											+'</h3>'
										+'</td>'
									+'</tr>'
								+'</tbody>'
							+'</table>'
						+'</div>'
						+'<div class="blockFoot"></div>';
		
	document.getElementById('premiumGraph').parentNode.appendChild(divG);
	
	document.getElementById('Calcul').onclick=function(){
		GM_xmlhttpRequest({
		method: "GET",
		url: "Webservices/resourcebar.php?json=true",
		onload: function(xhr) {
			var data = xhr.responseText;
			var ress = JSON.parse(data);
			var A = parseInt(ress[4].amount);
			var T = document.getElementById('percent_HB').value;
			var Red = document.getElementById('percent_reduction').value;
			var K = document.getElementById('multiply_HB').value;
			var F = document.getElementById('factor_event').value;
			var VdCAct = parseInt(document.getElementById('accountCurrentValues').firstChild.title.replace(/[^0-9]/gi,''));
			var TR = parseFloat(document.getElementById('accountCurrentValues').innerHTML.split('<br>')[2]);
			
			var VdCPT = VdCAct+A/100*(T*Red/(100-Red));
			var diams = (K*10000*A*T/100)/(VdCPT*6*TR);
			var one_diams = VdCPT * 0.0001 * TR * F;
			
			document.getElementById('result').style.display='block';
			document.getElementById('result').innerHTML='Valeur de compte finale : '+Create_Aff(new Big(VdCPT).str(), type_conversion)+'</br>'
														+'Nombre de diamants à investir : '+Math.floor(diams)+'</br>'
														+'Hors-banque final : '+Create_Aff(new Big(A*K).str(), type_conversion)+'</br>'
														+'Somme à investir en Def : '+Create_Aff(new Big(A*T/100).str(), type_conversion)+'</br>'
														+'Gain par diamant : '+Create_Aff(new Big(one_diams).str(), type_conversion);
			}
		});
	
	}
}

function Pts_War(){
	
	function Calcul_gain(teamA, teamB, tabD, tabK, tabA){
		var K1, K2, D1, D2, A1, A2;
		
		if ( teamA > teamB){
			K1 = 30;
			D1 = 30;
			A1 = 30;
			K2 = 0;
			D2 = 0;
			A2 = 0;
		} else {
			K1 = 0;
			D1 = 0;
			A1 = 0;
			K2 = 30;
			D2 = 30;
			A2 = 30;
		}
		if (tabD[0]==1){D1+=20;}else{D2+=20;}
		if (tabK[0]==1){K1+=20;}else{K2+=20;}
		if (tabA[0]==1){A1+=20;}else{A2+=20;}
		
		var GD1 = n(tabD[1]).multiply(10).multiply(D1).divide(100);
		var GD2 = n(tabD[2]).multiply(10).multiply(D2).divide(100);
		var GK1 = n(tabK[1]).multiply(20).multiply(K1).divide(100);
		var GK2 = n(tabK[2]).multiply(20).multiply(K2).divide(100);
		var GA1 = n(tabA[1]).multiply(A1).divide(100);
		var GA2 = n(tabA[2]).multiply(A2).divide(100);
		var GP1 = n(GD1).plus(GK1);
		var GP2 = n(GD2).plus(GK2);
		
		var Div_result = document.createElement('div');
			Div_result.className = 'formRow color4';
			Div_result.innerHTML = '<div class="formColumn column33 alignCenter">'
								+Create_Aff(GP1, type_conversion)
								+'</div>'
								+'<div class="formColumn column33 alignCenter">'
								+'<strong>Gain Th. Pétrole</strong>'
								+'</div>'
								+'<div class="formColumn column33 alignCenter">'
								+Create_Aff(GP2, type_conversion)
								+'</div>';
		
		var Div_result2 = document.createElement('div');
			Div_result2.className = 'formRow color3';
			Div_result2.innerHTML = '<div class="formColumn column33 alignCenter">'
								+Create_Aff(GA1, type_conversion)
								+'</div>'
								+'<div class="formColumn column33 alignCenter">'
								+'<strong>Gain Th. Munitions</strong>'
								+'</div>'
								+'<div class="formColumn column33 alignCenter">'
								+Create_Aff(GA2, type_conversion)
								+'</div>';
								
		document.getElementById('battleStatisticsContainer').appendChild(Div_result);
		document.getElementById('battleStatisticsContainer').appendChild(Div_result2);
		
	}
	
	function DO_Calcul_pts(){
				var Pts = [0,2,2,1,3,3];
				var R1 = 0;
				var R2=0;
				DO_conversion();
				var tree = document.getElementById('battleStatisticsContainer').childNodes;
				for(var j=1;j<tree.length-3;j++){
					var Val1 = tree[j].firstChild.getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
					var Val2 = tree[j].lastChild.getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
					var max ;
					if (n(Val1).gte(Val2)){
						tree[j].firstChild.innerHTML+=' ('+Pts[j]+' pts)';
						R1+=Pts[j];
						max = [1, Val1, Val2];
					} else {
						tree[j].lastChild.innerHTML+=' ('+Pts[j]+' pts)';
						R2+=Pts[j];
						max = [2, Val1, Val2];
					}
					if ( j == 1){var max_D = max;}
					if ( j == 2){var max_K = max;}
					if ( j == 3){var max_A = max;}
				}
				var Victory1 = parseInt(tree[7].firstChild.innerHTML);
				var Victory2 = parseInt(tree[8].firstChild.innerHTML);
				if (Victory1>=Victory2){
					tree[7].firstChild.innerHTML+=' (10 pts)';
					R1+=10;
				} else {
					tree[7].lastChild.innerHTML+=' (10 pts)';
					R2+=10;
				}
				tree[0].firstChild.innerHTML+='</br>('+R1+' pts)';
				tree[0].lastChild.innerHTML+='</br>('+R2+' pts)';
				
				Calcul_gain(R1, R2, max_D, max_K, max_A);
	}
	
	function Exec_script(){
			var timer = setInterval(function(){
			if(document.getElementById('battleStatisticsContainer')!=null && converti == false){
				DO_conversion();
				DO_Calcul_pts();
				clearInterval(timer);
				converti = true;
			}
			if(document.getElementById('battleStatisticsContainer')==null && converti == true){
				converti=false;
			}
			},500);
	}
	
	var line_war = document.getElementsByClassName('linkLike toggleWar');
	var converti = false;
	for (var i=0;i<line_war.length;i++){ // pour toutes les guerres actives
		line_war[i].onclick = function(){setTimeout(Exec_script,500);};
	}
}

function DO_raffinage(){
	var divG = document.createElement('div');
		divG.className='block';
		divG.innerHTML = '<h1 class="blockHead">Calcul Qtés</h1>'
						+'<div class="openblock">'
							+'<table class="standard">'
								+'<tbody>'
									+'<tr class="even">'
										+'<td class="alignCenter">'
											+'<h3>'
												+'<label for="percent_total">Pourcentage du pétrole Brut : </label>'
												+'<input type="text" id="percent_total" value="100" size="4"></input>'
												+'<label for="percent_total">%</label></br>'
												+'<label for="percent_diesel">Pourcentage du raffinage en Diesel : </label>'
												+'<input type="text" id="percent_diesel" value="33" size="4"></input>'
												+'<label for="percent_diesel">%</label></br>'
												+'<label for="percent_kero">Pourcentage du raffinage en Kero : </label>'
												+'<input type="text" id="percent_kero" value="67" size="4"></input>'
												+'<label for="percent_kero">%</label></br>'
												+'<input type="button" value="Calculer" id="Calcul"/>'
												+'<div id="result" style="display:none"></div>'
											+'</h3>'
										+'</td>'
									+'</tr>'
								+'</tbody>'
							+'</table>'
						+'</div>'
						+'<div class="blockFoot"></div>';
		
	document.getElementById('lightboxContent').appendChild(divG);
	
	document.getElementById('Calcul').onclick=function(){
		GM_xmlhttpRequest({
		method: "GET",
		url: "Webservices/resourcebar.php?json=true",
		onload: function(xhr) {
			var data = xhr.responseText;
			var ress = JSON.parse(data);
			var pet = parseInt(ress[0].amount);
			var kero = parseInt(ress[1].amount);
			var diesel = parseInt(ress[2].amount);
			var Taux = document.getElementById('percent_total').value;
			var Qd = document.getElementById('percent_diesel').value;
			var Qk = document.getElementById('percent_kero').value;
			var A = Arrondir(parseFloat(Qk/Qd),2);
			var diesel_todo = ((pet*Taux/100)+20*(kero-A*diesel))/(20*A+10);
			var kero_todo = A*(diesel_todo+diesel)-kero;
			
			document.getElementById('result').style.display='block';
			document.getElementById('result').innerHTML='Diesel à  fabriquer : ' +Create_Aff(new Big(diesel_todo).str(), type_conversion)
														+'</br>Kero à fabriquer : '+Create_Aff(new Big(kero_todo).str(), type_conversion)
														+'</br>Pétrole pour diesel : '+Create_Aff(new Big(diesel_todo*10).str(), type_conversion)
														+'</br>Pétrole pour kéro : '+Create_Aff(new Big(kero_todo*20).str(), type_conversion);
			}
		});
	
	}
}

function DO_change_link(){
	if(document.getElementById('menu_island_view')!=null){
		document.getElementById('menu_island_view').href='militaer.php';
		document.getElementById('menu_island_view').title='Armées';
		document.getElementById('menu_island_view').setAttribute("target", "_blank");
	}
	if(document.getElementById('menu_world_map')!=null){
		document.getElementById('menu_world_map').href='handel.php';
		document.getElementById('menu_world_map').title='Commerce';
		document.getElementById('menu_world_map').setAttribute("target", "_blank");
	}
}

function Add_label_val(){
	
	function LabelShort(nombre, De){
	var newlabel = document.createElement("Label");
		newlabel.setAttribute("for", De);
		newlabel.className='ToShortNumber';
		newlabel.innerHTML = Create_Aff(nombre,type_conversion);
		newlabel.id='label'+De;
	return newlabel;
	}
	
	function Update(elem, nom_id){
		var le_label = LabelShort(elem.value.replace(/[^0-9]/gi,''), nom_id); 
		elem.onkeyup=function(){
			document.getElementById('label'+nom_id).innerHTML = Create_Aff(elem.value.replace(/[^0-9]/gi,''),type_conversion);
			elem.value = lisibilite_nombre(elem.value.replace(/[^0-9]/gi,''));
		}
		return le_label;
	}
	
	if (Path+Search!='handel.php?mode=2' && Path!='userdetails.php' && Path!='bank.php' && Path+Search!='allianceadministration.php?section=finance'){
		var part = document.getElementsByClassName('adjNumInput');
		
		for(i=0, c=part.length ; i<c ;i++){
			if(part[i].id==null){
				var etiquette = Update(part[i], 'input'+i);
				part[i].parentNode.appendChild(etiquette);
			} else {
				var etiquette = Update(part[i], part[i].id);
				part[i].parentNode.appendChild(etiquette);
			}
		}
	}
	if (Path=='userdetails.php'){
		var part=document.getElementById('basePanelSpyForm').getElementsByClassName('input');
		
		for (var i=0; i< part.length;i++){
			var etiquette = Update(part[i], part[i].id);
			part[i].parentNode.insertBefore(etiquette, part[i]);
		}
	}
	if (Path+Search=='handel.php?mode=2'){
		var qte = document.getElementById('tradeOfferAmount');
		var le_label = LabelShort(qte.value.replace(/[^0-9]/gi,''), 'tradeOfferAmount'); 
		var prix = document.getElementById('price_count');
		var le_label2 = LabelShort(prix.value.replace(/[^0-9]/gi,''), 'price_count'); 
		qte.onkeyup=function(){
			document.getElementById('labeltradeOfferAmount').innerHTML = Create_Aff(qte.value.replace(/[^0-9]/gi,''),type_conversion);
			qte.value = lisibilite_nombre(qte.value.replace(/[^0-9]/gi,''));
			setTimeout(function(){
			document.getElementById('labelprice_count').innerHTML = Create_Aff(prix.value.replace(/[^0-9]/gi,''),type_conversion);
			},50);
		}
		qte.parentNode.appendChild(le_label);
		prix.parentNode.appendChild(le_label2);
		
		document.getElementsByClassName('btn_dec ltr')[0].onclick=function(){
			document.getElementById('labeltradeOfferAmount').innerHTML = Create_Aff(qte.value.replace(/[^0-9]/gi,''),type_conversion);
			qte.value = lisibilite_nombre(qte.value.replace(/[^0-9]/gi,''));
			setTimeout(function(){
			document.getElementById('labelprice_count').innerHTML = Create_Aff(prix.value.replace(/[^0-9]/gi,''),type_conversion);
			},50);
		}
		document.getElementsByClassName('btn_inc ltr')[0].onclick=function(){
			document.getElementById('labeltradeOfferAmount').innerHTML = Create_Aff(qte.value.replace(/[^0-9]/gi,''),type_conversion);
			qte.value = lisibilite_nombre(qte.value.replace(/[^0-9]/gi,''));
			setTimeout(function(){
			document.getElementById('labelprice_count').innerHTML = Create_Aff(prix.value.replace(/[^0-9]/gi,''),type_conversion);
			},50);
		}
		
	}
	if (Path+Search=='allianceadministration.php?section=finance'){
		var part = document.getElementById('countResource');
		var le_label = LabelShort(part.value.replace(/[^0-9]/gi,''), 'countResource'); 
		part.onkeyup=function(){
			document.getElementById('labelcountResource').innerHTML = Create_Aff(part.value.replace(/[^0-9]/gi,''),type_conversion);
		}
		part.parentNode.appendChild(le_label);
	}
}

function DO_reco_display(){
	
	var liste_der = document.createElement('div');
		liste_der.className = "infopanel";
		liste_der.innerHTML = '<a class="toggleInfopanelTab up" rel="DO_reco" href="#" id="posi_reco"><strong>DO Reco</strong></a><div id="DO_reco" class="infoTab up ltr" style="display: none;"><input type="checkbox" id="connected"/><label for="connected">Activer/désactiver le maintien de la connection</br></br>Nécessite une actualisation pour la prise en compte des effets</label></div>'
		
	document.getElementById('infopanel_inner').insertBefore(liste_der, document.getElementById('infopanelBoardLink'));
	
	if (hold_co==true){document.getElementById('connected').checked=true;}
	
	document.getElementById('connected').onclick=function(){
		if (hold_co==true){
			GM_setValue('actived', false);
			ChkBx.checked=false;
		} else {
			GM_setValue('actived', true);
			ChkBx.checked=true;
		}
	}
	
}

function DO_info_attaque(){

	var tableau = document.getElementsByTagName('tbody')[0].childNodes;
	var size = tableau.length;

	var ligne = document.createElement('tr');
		ligne.innerHTML ='<td class="alignLeft"><strong>Valeur:</strong></td><td class="alignRight" colspan="2" id="P1"></td><td class="alignLeft"><strong>Valeur:</strong></td><td class="alignRight" colspan="2" id="P2"></td><td class="alignLeft"><strong>Valeur:</strong></td><td class="alignRight" colspan="2" id="P3"></td>';
		
	var ligne2 = document.createElement('tr');
		ligne2.innerHTML ='<td class="alignLeft"><strong>Entretien:</strong></td><td class="alignRight" colspan="2" id="E1"></td><td class="alignLeft"><strong>Entretien:</strong></td><td class="alignRight" colspan="2" id="E2"></td><td class="alignLeft"><strong>Entretien:</strong></td><td class="alignRight" colspan="2" id="E3"></td>';	

	tableau[size-3].parentNode.insertBefore(ligne2, tableau[size-2]);
	tableau[size-3].parentNode.insertBefore(ligne, tableau[size-2]);

	var tableau2 = document.getElementsByTagName('tbody')[1].childNodes;
	var size2 = tableau2.length;

	var ligne3 = document.createElement('tr');
		ligne3.innerHTML ='<td class="alignLeft" colspan="3"><strong>Valeur:</strong></td><td class="alignRight" colspan="6" id="D1"></td>';
		
	tableau2[size2-3].parentNode.insertBefore(ligne3, tableau2[size2-3]);

	var tableau3 = document.getElementsByTagName('tbody')[2].childNodes;
	var size3 = tableau3.length;

	var ligne4 = document.createElement('tr');
		ligne4.innerHTML ='<td class="alignLeft;" colspan="3"><strong>Valeur:</strong></td><td class="alignRight" colspan="6" id="R1">';
		
	var ligne5 = document.createElement('tr');
		ligne5.innerHTML ='<td class="alignLeft;" colspan="3"><strong>Entretien:</strong></td><td class="alignRight" colspan="6" id="R2"></td>';	

	tableau3[size3-3].parentNode.insertBefore(ligne5, tableau3[size3-1]);	
	tableau3[size3-3].parentNode.insertBefore(ligne4, tableau3[size3-1]);

	var form = document.getElementsByTagName('tbody')[4].childNodes;
	
	var entretienR=0;
	var entretien1=0;
	var entretien2=0;
	var entretien3=0;
	var prixR=0;
	var prix1=0;
	var prix2=0;
	var prix3=0;
	
	for (var i=2;i<form.length-1;i++){
		var Nom_unit = form[i].childNodes[0].firstChild.innerHTML;
		var Origine = form[i].childNodes[1].firstChild.value;
		var Qte = form[i].childNodes[3].firstChild.title.replace(/[^0-9]/gi,'');
		if (Origine=='Réserve'){
			entretienR=n(0).plus(Qte).multiply(Unites_Stats[Nom_unit][4]).plus(entretienR);
			prixR=n(0).plus(Qte).multiply(Unites_Stats[Nom_unit][0]).plus(prixR);
		}
		else if (Origine=='Armée 1'){
			entretien1=n(0).plus(Qte).multiply(Unites_Stats[Nom_unit][4]).plus(entretien1);
			prix1=n(0).plus(Qte).multiply(Unites_Stats[Nom_unit][0]).plus(prix1);
		}
		else if (Origine=='Armée 2'){
			entretien2=n(0).plus(Qte).multiply(Unites_Stats[Nom_unit][4]).plus(entretien2);
			prix2=n(0).plus(Qte).multiply(Unites_Stats[Nom_unit][0]).plus(prix2);
		}
		else if (Origine=='Armée 3'){
			entretien3=n(0).plus(Qte).multiply(Unites_Stats[Nom_unit][4]).plus(entretien3);
			prix3=n(0).plus(Qte).multiply(Unites_Stats[Nom_unit][0]).plus(prix3);
		}
	}
	
	document.getElementById('P1').innerHTML = Create_Aff(prix1,type_conversion);
	document.getElementById('P2').innerHTML = Create_Aff(prix2,type_conversion);
	document.getElementById('P3').innerHTML = Create_Aff(prix3,type_conversion);
	document.getElementById('R1').innerHTML = Create_Aff(prixR,type_conversion);
	document.getElementById('E1').innerHTML = Create_Aff(entretien1,type_conversion);
	document.getElementById('E2').innerHTML = Create_Aff(entretien2,type_conversion);
	document.getElementById('E3').innerHTML = Create_Aff(entretien3,type_conversion);
	document.getElementById('R2').innerHTML = Create_Aff(entretienR,type_conversion);	
	
	var prixD = 0;
	var form2 = document.getElementsByTagName('tbody')[1].childNodes;
	
	for (var i=2;i<form2.length-5;i++){
		var Nom_unit = form2[i].childNodes[0].firstChild.innerHTML;
		var Qte = form2[i].childNodes[1].firstChild.title.replace(/[^0-9]/gi,'');
		prixD=n(0).plus(Qte).multiply(Unites_Stats[Nom_unit][0]).plus(prixD);
	}
	
	document.getElementById('D1').innerHTML = Create_Aff(prixD,type_conversion);
}

function Display_attaque_bot(){
	
	var etat = GM_getValue('Etat_att_bot',false);
	
	var liste_der = document.createElement('div');
		liste_der.className = "infopanel";
		liste_der.innerHTML = '<a class="toggleInfopanelTab up" rel="DO_attaque_bot" href="#" id="posi_att_bot"><strong>DO Attaque Bot</strong></a><div id="DO_attaque_bot" class="infoTab up ltr" style="display: none;"></div>'
		
	document.getElementById('infopanel_inner').insertBefore(liste_der, document.getElementById('infopanelBoardLink'));
		
	document.getElementById('posi_att_bot').onclick=function(){
		if ( etat == true ){ 
			etat=false; 
			GM_setValue('Etat_att_bot',false);
		} else {
			etat=true; 
			GM_setValue('Etat_att_bot',true);
		}
	}	
	if(etat == false){
		document.getElementById('posi_att_bot').classeName="toggleInfopanelTab up";
		document.getElementById('DO_attaque_bot').style.display='none';
	}
	if (etat == true){
		document.getElementById('posi_att_bot').classeName="toggleInfopanelTab down";
		document.getElementById('DO_attaque_bot').style.display='block';
	}
		
		function ConvertDate(ms){
			var heure = Math.floor(ms/3600000);
			var minute = Math.floor((ms%3600000)/60000);
			var seconde = Math.floor((ms%60000)/1000);
			if (heure<10){heure='0'+heure;}
			if (minute<10){minute='0'+minute;}
			if (seconde<10){seconde='0'+seconde;}
			document.getElementById('decompte').innerHTML = 'h-'+heure+':'+minute+':'+seconde;
		}

		function Chrono(){
			var time = document.getElementById('timingid').value.split(':');

			var Debut = new Date();
				Debut.setHours(time[0]);
				Debut.setMinutes(time[1]);
				Debut.setSeconds(0);
			var now = new Date();
				now.getHours();
				now.getMinutes();
				now.getSeconds();

			if (Debut<now){Debut.setDate(Debut.getDate()+1);}

			var delay = Debut-now;
			var tempo = delay;
			
			ConvertDate(tempo);
			
			var Mon_timer = setInterval(function(){
				ConvertDate(tempo);
				tempo-=1000;
			},1000);

			setTimeout(function(){
				clearInterval(Mon_timer);
				GM_setValue('Feu', true);
				window.location.href=window.location.href;
			},delay);
		}
		
		function Reset(){
			GM_setValue('Feu', false);
			GM_setValue('Start',false);
			setTimeout(function(){window.location.href=window.location.href;},5000);
		}
		
		var SoA = GM_getValue('SpyOrAttack', 'espionner');
		var Start = GM_getValue('Start', false);
		var timing = GM_getValue('timing', '00:00');
		var Feu = GM_getValue('Feu', false);
		var armee1 = GM_getValue('Armee1', false);
		var armee2 = GM_getValue('Armee2', false);
		var armee3 = GM_getValue('Armee3', false);
		var localisation = document.getElementById('DO_attaque_bot');
		var UserId = GM_getValue('userId', 123456);
		var Qte_sat = GM_getValue('Qte_sat', '100000000000000000000000000');
		var target_spy = GM_getValue('Target_spy', 1);

		var newlabel = document.createElement("Label");
			newlabel.setAttribute("for", 'timingid');
			newlabel.innerHTML = 'Heure lancement : '
		
		var heure = document.createElement("input");
			heure.type = "text";
			heure.value = timing;
			heure.id='timingid';
			heure.size='5';
			heure.style.display = 'inline';
			heure.onchange=function(){GM_setValue('timing', this.value);}
			if (Start==true){heure.disabled=true;}

		var time_txt = document.createElement('div');
			//time_txt.style.display = 'inline';
			time_txt.id='decompte';
			time_txt.innerHTML='h-??:??:??';	
		
		var newlabel2 = document.createElement("Label");
			newlabel2.setAttribute("for", 'urluser');
			newlabel2.innerHTML = 'User Id : '
		
		var userId = document.createElement("input");
			userId.type = "text";
			userId.value = UserId;
			userId.id='urluser';
			userId.size='5';
			//userId.style.display = 'inline';
			userId.onchange=function(){GM_setValue('userId', this.value);}
			if (Start==true){userId.disabled=true;}	
			
		var input_radio = document.createElement('div');
			input_radio.innerHTML = '<input type="radio" value="espionner" name="SpyOrAttack">Espionner</input>'
									+'<input type="radio" value="attaquer" name="SpyOrAttack">Attaquer</input>';
		
		var Display_espio = document.createElement('div');
			Display_espio.id='display_espio';
			Display_espio.innerHTML =  'Qté: <input type="text" name="qte_sat" id="qte_sat" value="'+Qte_sat+'" size="10"><label id="label_qte_sat" for="qte_sat">'+Create_Aff(Qte_sat,type_conversion)+'</label></br>'
									+'Sur :<select id="target">'
									  +'<option value="1">Unité</option>'
									  +'<option value="2">Défense</option>'
									  +'<option value="3">Ressources</option>'
									  +'<option value="4">Les 3</option>'
									+'</select> ';
			
		var Display_att = document.createElement('div');
			Display_att.id='display_att';
			Display_att.innerHTML = '<input type="checkbox" name="choice_army" value="1"> Armée 1<br>'
									+'<input type="checkbox" name="choice_army" value="2"> Armée 2<br>'
									+'<input type="checkbox" name="choice_army" value="3"> Armée 3<br>';
		
		var newButton = document.createElement('input');
			newButton.type='button';
			newButton.style.display = 'block';
			newButton.id='Start';
				if(Start==false){
					newButton.value = "Start";
				}else if(Start==true){
					newButton.value = "Stop";
				}
			newButton.onclick = function(){
				if(Start==true){
					GM_setValue('Start', false);
					GM_setValue('Launch1', false);
					GM_setValue('Launch2', false);
					GM_setValue('Launch3', false);
					GM_setValue('Feu', false);
					window.location.href=window.location.href;
				} else {
					GM_setValue('Start', true);
					window.location.href=window.location.href;
				}
			};
		
		localisation.appendChild(newlabel);	
		localisation.appendChild(heure);	
		localisation.appendChild(time_txt);
		localisation.appendChild(newlabel2);	
		localisation.appendChild(userId);
		localisation.appendChild(input_radio);
		localisation.appendChild(Display_espio);
		localisation.appendChild(Display_att);
		localisation.appendChild(newButton);
		
		var radios = document.getElementsByName('SpyOrAttack');
			if (radios[0].value==SoA){
				radios[0].checked = true;
				Display_espio.style.display='block';
				Display_att.style.display='none';	
			}else if (radios[1].value==SoA){
				radios[1].checked = true;
				Display_espio.style.display='none';
				Display_att.style.display='block';
			}
			
			radios[0].onclick=function(){
				GM_setValue('SpyOrAttack', 'espionner');
				Display_espio.style.display='block';
				Display_att.style.display='none';					
			};
			radios[1].onclick=function(){
				GM_setValue('SpyOrAttack', 'attaquer');
				Display_espio.style.display='none';
				Display_att.style.display='block';				
			};		
		
		document.getElementById('qte_sat').onchange = function(){ 
			Qte_sat = this.value;
			GM_setValue('Qte_sat', this.value);
		}
		
		document.getElementById('qte_sat').onkeyup = function(){ 
			document.getElementById('label_qte_sat').innerHTML = Create_Aff(document.getElementById('qte_sat').value,type_conversion);
		}
		
		document.getElementById('target').options[target_spy-1].selected="selected";
		
		document.getElementById('target').onchange = function(){
			target_spy = this.options[this.selectedIndex].value;
			GM_setValue('Target_spy', target_spy);
		}
		
		if(armee1==true){
			document.getElementsByName('choice_army')[0].checked=true;
		}
		if(armee2==true){
			document.getElementsByName('choice_army')[1].checked=true;
		}
		if(armee3==true){
			document.getElementsByName('choice_army')[2].checked=true;
		}
		
		for (var i = 0 ; i<3 ; i++){
			document.getElementsByName('choice_army')[i].onclick=function(){
				if(this.checked){
					GM_setValue('Armee'+this.value, true);
				} else {
					GM_setValue('Armee'+this.value, false);
				}
			}
		}
		
		if (Start == true && Feu == false){
			Chrono();
		}
		if (Start == true && Feu == true){
		
			if (SoA=='espionner'){
				if (target_spy!=4){
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "Webservices/getPanelContent.php",
					  data: "mode=base-spy-action&victim="+UserId+"&unit=1&amount="+Qte_sat+"&action="+target_spy+"&spyCode=",
					  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
					  onload: function(response){dhtmlx.message("Espionnage envoyé");}
					});
					Reset();
					
				} else {
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "Webservices/getPanelContent.php",
					  data: "mode=base-spy-action&victim="+UserId+"&unit=1&amount="+Qte_sat+"&action=1&spyCode=",
					  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
					  onload: function(response){dhtmlx.message("Espionnage envoyé");}
					});
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "Webservices/getPanelContent.php",
					  data: "mode=base-spy-action&victim="+UserId+"&unit=1&amount="+Qte_sat+"&action=2&spyCode=",
					  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
					  onload: function(response){dhtmlx.message("Espionnage envoyé");}
					});
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "Webservices/getPanelContent.php",
					  data: "mode=base-spy-action&victim="+UserId+"&unit=1&amount="+Qte_sat+"&action=3&spyCode=",
					  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
					  onload: function(response){dhtmlx.message("Espionnage envoyé");}
					});
					Reset();
				}
			}
			if (SoA=='attaquer'){
				if(armee1==true){
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "Webservices/getPanelContent.php",
					  data: "mode=base-attack-launch&victim="+UserId+"&flotte=1&action=1",
					  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
					  onload: function(response){dhtmlx.message("Armée 1 envoyée");}
					});
				}
				if(armee2==true){
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "Webservices/getPanelContent.php",
					  data: "mode=base-attack-launch&victim="+UserId+"&flotte=2&action=1",
					  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
					  onload: function(response){dhtmlx.message("Armée 2 envoyée");}
					});
				}
				if(armee3==true){
					GM_xmlhttpRequest({
					  method: "POST",
					  url: "Webservices/getPanelContent.php",
					  data: "mode=base-attack-launch&victim="+UserId+"&flotte=3&action=1",
					  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
					  onload: function(response){dhtmlx.message("Armée 3 envoyée");}
					});
				}
				Reset();
			}
		}
}

function Display_conversion(){
	var liste_der = document.createElement('div');
		liste_der.className = "infopanel";
		liste_der.innerHTML = '<a class="toggleInfopanelTab up" rel="do_conversion" href="#"><strong>DO Conversion</strong></a><div id="do_conversion" class="infoTab up ltr" style="display: none;"></div>'
		
		document.getElementById('infopanel_inner').insertBefore(liste_der, document.getElementById('infopanelBoardLink'));
		
		function toggle_type(elem){
			type_conversion = (type_conversion+1)%3;
			GM_setValue('type_of_aff', type_conversion);
			elem.value = Name[type_conversion];
		}

		var Name = ['Crésus', 'Puissance', 'Décimal'];
	
		var div_info = document.createElement('div');
			div_info.style.cssText = 'position:relative;top:10px;left:10px;width:80px;';
		document.getElementById('do_conversion').appendChild(div_info);
		
		var modeC=document.createElement('input');
			modeC.type='button';
			modeC.value = Name[type_conversion];
			modeC.onclick = function(){
				toggle_type(this);
				DO_conversion();
			};
			modeC.style.width="80px";
			
		var newButton = document.createElement('input');
			newButton.type='button';
			newButton.value = "Convertir";
			newButton.onclick = function(){
				DO_conversion();
			};
			newButton.style.cssText = 'position:relative;top:-34px;left:90px;width:80px;';

		div_info.appendChild(modeC);
		div_info.appendChild(newButton);
}

function Display_safe_att(){
	
	var liste_der = document.createElement('div');
		liste_der.className = "infopanel";
		liste_der.innerHTML = '<a class="toggleInfopanelTab up" rel="DO_safe_att" href="#" id="posi_safe_att"><strong>DO Safe Attaque</strong></a><div id="DO_safe_att" class="infoTab up ltr" style="display: none;"><input type="checkbox" id="enable_safe_att"/><label for="enable_safe_att">Activer/désactiver safe attaque</br></br>Nécessite une actualisation pour la prise en compte des effets</label></div>'
		
	document.getElementById('infopanel_inner').insertBefore(liste_der, document.getElementById('infopanelBoardLink'));
	
	if (enable_safe_attaque==true){document.getElementById('enable_safe_att').checked=true;}
	
	document.getElementById('enable_safe_att').onclick=function(){
		if (enable_safe_attaque==true){
			GM_setValue('safe_att', false);
		} else {
			GM_setValue('safe_att', true);
		}
	}
	
}

function DO_safe_attaque(){
	var drapeau = false;
	var etat_actuel = false;
	
	function affichage(etat, maintenant){
		if(etat==true && maintenant==false){
			affiche();
			maintenant=true;
		} else if (etat==false && maintenant==true){
			efface();
			maintenant=false;
		} else if (etat==true && maintenant==true){
			maintenant=true;
		} else if (etat==false && maintenant==true){
			maintenant=false;
		}
		return maintenant;
	}
		
	function efface(){		
		document.getElementById('alerte_co').remove();
		document.getElementById('text_alert').remove();
	}
		
	function affiche(){

	var texte=document.createElement("div");
		texte.innerHTML='Attention joueur(s) connecté(s)';
		texte.style.cssText = 'position:relative;top:-30px;left:55px;width:250px;';
		texte.id='text_alert';

	var oImg=document.createElement("img");
		oImg.src = GM_getResourceURL("logo");
		oImg.style.cssText = 'width:50px;height:50px;';
		oImg.id='alerte_co';

		document.getElementById('userInfoRank').appendChild(oImg);
		document.getElementById('userInfoRank').appendChild(texte);
	}
		
	function checker(){	
		if (document.getElementById('infopanel_tab_actions')!=null){ // si cet Id existe
			var actions=document.getElementById('infopanel_tab_actions');
			var list_actions=actions.getElementsByClassName('ancUserDetail openUserDetails');
			var mec=new Array();
				for (i=0;i<list_actions.length;i++){
						mec[i]= list_actions[i].href;
							GM_xmlhttpRequest({
							  method: "GET",
							  url: mec[i],
							  synchronous:true,
							  onload: function(response) {
								if(response.responseText.match("Est en ligne")){
									if(response.responseText.match("Est en ligne")){
										drapeau = true;
										etat_actuel=affichage(drapeau, etat_actuel);
									}else{
										drapeau = false;
										etat_actuel=affichage(drapeau, etat_actuel);
									}
								}
							  }
							});
				}
		}
	}

	checker();
	setInterval('checker', 60000);
}

function DO_continents(){
	var Continent = new Array();

	Continent['InSoMniaK']='5';
	Continent['BELGIUMBULL']='5';
	Continent['oxxo87100']='3';
	Continent['FEDEX22']='1';
	Continent['Toxique46']='1';
	Continent['Eagle-Claw']='1';
	Continent['el_kador']='3';
	Continent['le_PaRaSiTe']='1';
	Continent['le_MiNi_PaRaSiTe']='1';
	Continent['the dead man_vdv']='6';
	Continent['Jasper_Hale']='1';
	Continent['patoche1863']='5'; 	
	Continent['bapte']='1';
	Continent['Provenzano']='5';
	Continent['Colonel_Olrik']='4';
	Continent['Pallasonic']='6';
	Continent['TyReX94']='4'; 	
	Continent['john-fitzgerald_GFX']='2'; 	
	Continent['vidoc']='2'; 	
	Continent['titi750']='4';
	Continent['Wedge']='2'; 	
	Continent['JoMafio_GFX']='1'; 	
	Continent['JEREMY83500']='1'; 	
	Continent['la fée']='4'; 	
	Continent['Phenomene']='3'; 	
	Continent['Gohan17']='1'; 	
	Continent['Priest']='1'; 	
	Continent['thomas44']='3'; 	
	Continent['shuriko']='6'; 	
	Continent['el_dogo']='5'; 	
	Continent['satanas59']='6';
	Continent['Pipoux']='5';

	var Lieu = document.getElementById('userInfoData').firstChild.firstChild.firstChild.nextSibling.nextSibling.nextSibling.lastChild.innerHTML.substr(0,1);
	var Mon_Nom = document.getElementById('userInfoData').firstChild.firstChild.firstChild.lastChild.innerHTML;
	var player_line = document.getElementById('allianceOverviewMemberTable').getElementsByClassName('showContactDetails');

	for (i = 0 ; i<player_line.length ; i++){
		var Nom = player_line[i].getElementsByClassName('ancUserDetail openUserDetails')[0].innerHTML.replace(/<\/?[^<]+>/g,'').trim();
		if(Continent[Nom]==Lieu && Nom != Mon_Nom){
			player_line[i].lastChild.innerHTML += '<img alt="plus près" src="images/classic/icons/tick.png"></img>';
		}
	}
}

function DO_boost(){

function calcul(){
	var taux1 = document.getElementById('t_buy').value;
	var taux2 = document.getElementById('t_sell').value;
	var RegEX = /[0-9][0-9][.][0-9]/;
	var valide1 = RegEX.test(taux1);
	var valide2 = RegEX.test(taux2);
		if(valide1 && valide2){
			var newList = document.getElementById('list');
			var valeurselectionnee = newList.options[newList.selectedIndex].value; 
			var somme = document.getElementById('investissement').value.replace(/[^0-9]/gi,''); //la somme à investir
			var Taux = Math.round(parseFloat(taux1)*100);
			var qte_full= n(0).plus(somme).multiply(10000).divide(valeurselectionnee).divide(Taux);
			var Evo = Math.round((parseFloat(taux2)/parseFloat(taux1)-1)*10000);
			var gain = n(0).plus(somme).multiply(Evo).divide(10000);
			document.getElementById('R1').innerHTML = Create_Aff(qte_full,type_conversion) + '<input type="button" value="Copier" id="CTC"/>';
			document.getElementById('R2').innerHTML = Create_Aff(gain,type_conversion)+' soit '+Evo/100+' % de VdC';
			document.getElementById('CTC').onclick = function(){GM_setClipboard(qte_full);};
		} else if (!valide1 && valide2){
			alert('Le taux d\'achat saisi n\'est pas correct');
		} else if (!valide2 && Valide1){
			alert('Le taux de vente saisi n\'est pas correct');
		} else {
			alert('Les 2 taux ne sont pas correct');
		}
}

function vente(){
	var or = document.getElementById('resourcebar_gold_label').getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
	var pet = document.getElementById('resourcebar_oil_label').getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
	var muni = document.getElementById('resourcebar_ammunition_label').getElementsByTagName('span')[0].title.replace(/[^0-9]/gi,'');
	
	var somme_or =n(or).multiply(1000);
	var somme_pet =n(pet).multiply(500);
	var somme_muni =n(muni).multiply(7);
	var Taux = document.getElementById('t_sell').value*100;
	var somme_ress=n(somme_or).plus(somme_pet).plus(somme_muni).multiply(Taux).divide(10000);
	
	document.getElementById('R1').innerHTML = "???";
	document.getElementById('R2').innerHTML=Create_Aff(somme_ress,type_conversion);
}

function check_taux(){
	GM_xmlhttpRequest({
					  method: "GET",
					  url: "http://game.desert-operations.fr/"+World+"/handel.php",
					  synchronous:true,
					  onload: function(response) {
						var xrh_bank = document.createElement('div');
						xrh_bank.innerHTML=response.responseText;

						var taux_actuel = xrh_bank.getElementsByClassName('block-head-information')[0].innerHTML;
						taux_actuel=taux_actuel.replace(/[^0-9]/gi,'');
						taux_actuel=parseFloat(taux_actuel)/100;
						
						document.getElementById('t_sell').value=taux_actuel;
						GM_setValue('t_sell', taux_actuel);
					  }
	});
}	
	
	var taux_vente = GM_getValue('t_sell', 95);
	var taux_achat = GM_getValue('t_buy', 85);
	var argent = document.getElementById('resourcebar_money_label').getElementsByTagName('span')[0].title;
	
	var posi = document.getElementsByClassName('infopanel last');
	posi[0].firstChild.firstChild.innerHTML = 'DO Boost';
	posi[0].className = 'infopanel';
	
	var posi_btn = document.getElementById('infopanel_tab_noob');
	posi_btn.innerHTML='<div>Investissement : <input id="investissement" type="text" size="25"/></div>'
						+ '<div>Taux Achat : <input id="t_buy" type="text" size="2"/></div>'
						+ '<div>Taux Vente : <input id="t_sell" type="text" size="2"/></div>' 
						+ '<div>Ressources : <select id="list">'
												+'<option value="1000">Or</option>'
												+'<option value="500">Petrole</option>'
												+'<option value="7">Munitions</option>'
												+'<option value="4000000">B52</option>'
												+'<option value="2000000" selected>B2/CDG</option>'
												+'<option value="1500000">Freg1/PAN</option>'
												+'<option value="500000">Freg2</option>'
											+'</select>'
											+'<input id="btn" type="button" value="calcul"/>'
											+'<input id="btn_ress" type="button" value="vente"/>'
											+'<input id="maj_taux" type="button" value="MAJ Taux"/>'
						+'</div>'
						+ '<br/>' 
						+ 'Quantite achetable : '
						+ '<div id="R1">' 
						+ '???'
						+ '</div>'
						+ '<br/>' 
						+ 'Gain possible : '
						+ '<div id="R2">'
						+ '???'
						+ '</div>';

document.getElementById('investissement').value = argent;
document.getElementById('t_buy').value = taux_achat;
document.getElementById('t_buy').onchange=function(){GM_setValue('t_buy', this.value);};
document.getElementById('t_sell').value = taux_vente;											
document.getElementById('t_sell').onchange=function(){GM_setValue('t_sell', this.value);};
document.getElementById('btn').onclick = function(){calcul();};
document.getElementById('btn_ress').onclick = function(){vente();};
document.getElementById('maj_taux').onclick = function(){check_taux();};

}

function RE_type(){
	function check_type(){

		var ligne_re=document.getElementsByName('spy');
		var urlre = new Array();

		var colonne_re = document.getElementById('moreSpioReportsContainer').firstChild.nextSibling.firstChild.lastChild;
			colonne_re.innerHTML = 'type';

		function faire_requete(lien, num){

				GM_xmlhttpRequest({
							  method: "GET",
							  url: lien,
							  synchronous:true,
							  onload: function(response) {
								if (response.responseText.match("Unités")){
									ligne_re[num].getElementsByTagName('td')[4].innerHTML ='Unités';
								} else if (response.responseText.match("Défense")){
									ligne_re[num].getElementsByTagName('td')[4].innerHTML ='Défenses';
								} else {
									ligne_re[num].getElementsByTagName('td')[4].innerHTML ='Ressources';
								}
							  }
				});	

		}
			
			for (i = 0 ; i < ligne_re.length ; i++){
				urlre[i] = ligne_re[i].getElementsByTagName('td')[3].firstChild.href;
				faire_requete(urlre[i],i)
			}
	}

	var newButton = document.createElement("input");
		newButton.type = "button";
		newButton.value = "Afficher les type de RE";
		newButton.onclick = function(){check_type();};
		
		document.getElementsByTagName('caption')[1].appendChild(newButton);
}

function DO_CrossTable(){
	
	function Chercher_imbattable(){

		var CheckBx = document.getElementsByName('cases');
		var lines = new Array();
		var col = new Array();
		var unit = new Array();

		for (var i = 0; i< CheckBx.length ; i++){
			if (CheckBx[i].checked){
				lines.push(CheckBx[i].id.replace(/[^0-9]/gi,''));
			}
		}

		for (var j = 1 ; j< 47 ; j++){ // pour chaque colonne
			for (var k = 0 ; k < lines.length ; k++){ // on regarde la fleche de chaque lignes cochées
				var elem = document.getElementById('hover-'+lines[k]+'-'+j).className;
				var vert = 'condition yellow crossTableHoverStatus cross-unit-'+j;
				var jaune = 'condition green crossTableHoverStatus cross-unit-'+j;
				if (elem == jaune || elem == vert){
					col.push(j);
				}
			}
		}	

		for (var k = 0 ; k< col.length-1 ; k++){
			if (col[k]==col[k+1]){
				col.splice(k,1);
				k--;
			}
		} 

		for (var l = 1; l < 47; l++){ // pour chaque colonne
			if(col.indexOf(l)=='-1'){ // si on ne trouve pas l'elem
				var Nom_unit = document.getElementById('unit-'+l).firstChild.firstChild.firstChild.innerHTML.split('<');
				unit.push(Nom_unit[0]);
			}
		}
			
			document.getElementById('Zone_de_text').innerHTML = 'Unités non détruites : '+unit.join(', ');

	}

	function AddCheckBox(ID_line, ID_box){
	
	var ChkBx = document.createElement('input');
		ChkBx.type="checkbox";
		ChkBx.id=ID_box;
		ChkBx.name = 'cases';
		ChkBx.onclick =function(){
			if ( this.checked){
				document.getElementById(ID_line).className = 'crossTableHoverActive';
				Chercher_imbattable();
			} else {
				document.getElementById(ID_line).className = '';
				Chercher_imbattable();
			}
		};

	document.getElementById(ID_line).firstChild.lastChild.innerHTML = '';
	document.getElementById(ID_line).firstChild.lastChild.appendChild(ChkBx);
	
	document.getElementById(ID_line).onmouseout = function(){
		if (document.getElementById(ID_box).checked){
			document.getElementById(ID_line).className = 'crossTableHoverActive';
		}
	}

	}
	
	var Texte = document.createElement('div');
		Texte.id ='Zone_de_text';
		
	document.getElementById('lightboxContent').firstChild.appendChild(Texte);

	for (var i = 1; i < 47; i++){
		var nom_ID = 'unit-'+i;
		var Chk_ID = 'Chk'+i;
		AddCheckBox(nom_ID, Chk_ID);
	}
}

function DO_UnitTable(){
	
	function Calculer(a,b){

	var line2 = document.getElementsByTagName('tr');
	
	for (var i =1 ; i< line2.length ; i++){
		Nom_unites = line2[i].getElementsByTagName('td')[0].innerHTML;
		var result;
		
		if( a == 1 ){
			if( Unites_Stats[Nom_unites][2] == 'Diesel' ){
				result = Unites_Stats[Nom_unites][a]*10/Unites_Stats[Nom_unites][b];
			} else {
				result = Unites_Stats[Nom_unites][a]*20/Unites_Stats[Nom_unites][b];
			}
		}else if ( b == 1 ) {
			if( Unites_Stats[Nom_unites][2] == 'Diesel' ){
				result = Unites_Stats[Nom_unites][a]/(Unites_Stats[Nom_unites][b]*10);
			} else {
				result = Unites_Stats[Nom_unites][a]/(Unites_Stats[Nom_unites][b]*20);
			}
		}else if (a != 1 && b != 1){
			result = Unites_Stats[Nom_unites][a]/Unites_Stats[Nom_unites][b];
		}
		
		line2[i].lastChild.innerHTML = result.toFixed(2);
	}
}

	var label1 = document.createElement("Label");
		label1.setAttribute("for",'compar1');
		label1.innerHTML = "Comparer ";
		document.body.appendChild(label1);

	var compar1 = document.createElement('select');
		compar1.id = 'compar1';
		compar1.innerHTML = '<option value="0">Prix</option><option value="1">Conso</option><option value="3">Munitions</option><option value="4">Entretien</option><option value="5">Attaque</option><option value="6">Défense</option>';
		compar1.style.display='inline';
		document.body.appendChild(compar1);

	var label2 = document.createElement("Label");
		label2.setAttribute("for",'compar2');
		label2.innerHTML = " à ";
		document.body.appendChild(label2);
		
	var compar2 = document.createElement('select');
		compar2.id = 'compar1';
		compar2.innerHTML = '<option value="0">Prix</option><option value="1">Conso</option><option value="3">Munitions</option><option value="4">Entretien</option><option value="5">Attaque</option><option value="6">Défense</option>';
		compar2.style.display='inline';
		document.body.appendChild(compar2);

	var Btn1 = document.createElement('input');
		Btn1.type = 'button';
		Btn1.value = 'Comparer';
		Btn1.onclick = function(){
		var C1 = compar1.options[compar1.selectedIndex].value;
		var C2 = compar2.options[compar2.selectedIndex].value;
		Calculer(C1, C2);}
		document.body.appendChild(Btn1);
		
	function Add_Coll(node, val){	
		var colonne = document.createElement('td');
			colonne.innerHTML = val;
		node.appendChild(colonne);
	}
		
	var ligne = document.getElementsByTagName('tr');
		Add_Coll(ligne[0], '<strong>Comparatif</strong>');
		for (var i=1; i<ligne.length;i++){
			Add_Coll(ligne[i], '');
		} 
}

function DO_commerce_link(){
	var lien=document.getElementsByClassName('ancUserDetail openUserDetails');
	var Name;
	var url;

	for(i=0;i<lien.length;i++){
		Name = lien[i].innerHTML.replace(/<\/?[^<]+>/g,'');
		url = "http://game.desert-operations.fr/"+World+"/handel.php?mode=1&username="+Name+"&username_partly=1&search_user=Chercher";
		
		var lien_url = document.createElement('a');
			lien_url.href = url;
			lien_url.setAttribute("target", "_blank");
			
		var image = document.createElement('img');
			image.className="icon";
			image.src="images/classic/icons/lorry.png";	
		
		lien[i].parentNode.appendChild(lien_url);
		lien_url.appendChild(image);
	}
}

function DO_defense(){
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
		affichage.innerHTML=Create_Aff(val,type_conversion);
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

function DO_fiche(){
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
		Pts_ZC_HAB=n(Pts_ZC_HAB).plus(Pts_actuel).minus(Pts_Usines).minus(Pts_UDM).minus(Pts_Mines).minus(Pts_Raff).minus(pts_fixe);
		Qte_ZC_HAB=n(Qte_ZC_HAB).plus(Pts_ZC_HAB).divide(300);
		//Pts_ZC_HAB = n(Pts_actuel).subtract(Pts_Usines).subtract(Pts_UDM).subtract(Pts_Mines).subtract(Pts_Raff).subtract(pts_fixe);
		//Qte_ZC_HAB = n(Pts_ZC_HAB).divide(300); //225 et 310
	}

	function Get_lvl(pts){
		var last = pts.toString().substr(pts.length-1,1);
		if(last=='2' || last=='7'){lvl=[29,30]; pts_fixe = '3115374365';}
		if(last=='1' || last=='6'){lvl=[20,28]; pts_fixe = '1216940826';}
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
		Tableau[index_Usines].lastChild.innerHTML = Create_Aff(Qte_Usines,type_conversion) + ' (' + Create_Aff(Pts_Usines,type_conversion) + ' pts)';
		Tableau[index_UDM].lastChild.innerHTML = Create_Aff(Qte_UDM,type_conversion) + ' (' + Create_Aff(Pts_UDM,type_conversion) + ' pts)';
		Tableau[index_Mines].lastChild.innerHTML = Create_Aff(Qte_Mines,type_conversion) + ' (' + Create_Aff(Pts_Mines,type_conversion) + ' pts)';
		Tableau[index_Raff].lastChild.innerHTML = Create_Aff(Qte_Raff,type_conversion) + ' (' + Create_Aff(Pts_Raff,type_conversion) + ' pts)';
	}

	function Add_Line(){
		var ligne_Zc = document.createElement('tr');
			ligne_Zc.innerHTML = '<td>ZC + Hab (estimées) :</td><td colspan="2">' + Create_Aff(Qte_ZC_HAB,type_conversion) + ' (' + Create_Aff(Pts_ZC_HAB,type_conversion) + ' pts)</td>';

		Tableau[index_pts-1].parentNode.insertBefore(ligne_Zc, Tableau[index_pts-1]);
	}

	function Pts_prenables(){

	var Pts_perdables = n(Pts_actuel).minus(pts_fixe).minus(Pts_UDM).multiply(Taux).divide(100);
	Tableau[index_pts+1].lastChild.firstChild.innerHTML+=' ('+Create_Aff(Pts_perdables,type_conversion)+' pts prenables)';

	}
	
	Recup_Val();
	Get_lvl(Pts_actuel);
	Estimate_ZC_HAB();
	ChangeVal();
	Add_Line();
	Pts_prenables();
}

function DO_commerce_color(){
	var formulaire = document.getElementsByClassName('tradeBuyOffer');
			for(var i = 0; i<formulaire.length-1;i++){
				var Unite_en_vente = GetUnit(formulaire[i].firstChild.firstChild.innerHTML); // on récupère le nom de l'unité
				var prix_normal=Unites_Stats[Unite_en_vente][0];
				var quantite = formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[0].title.replace(/[^0-9]/gi,'');
				var prix  = formulaire[i].getElementsByClassName('tooltipExtention showTooltipDefault')[1].title.replace(/[^0-9]/gi,'');
				var PU = parseInt(n(prix).multiply(1000).divide(quantite));
				var Pourcent = PU/(1000*prix_normal);
				var Taux = Arrondir(Pourcent*100,1);
				var Color;
					
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
				}if (Pourcent < 0.85){
					Color = '0000CC';
				}
				formulaire[i].firstChild.style.cssText='color:#'+Color+';';	
				formulaire[i].firstChild.childNodes[1].innerHTML+='('+Taux+'%)';
			}			

	var span = document.getElementsByClassName('colorAlliancePrice');
	
	for (var i = 0 ; i<span.length ; i++){
		var col = span[0].parentNode.parentNode.style.color;
		span[0].parentNode.parentNode.style.cssText += 'font-weight:bold;  border:1px solid '+col+';';
		span[0].parentNode.parentNode.className+= ' interne';
		span[0].removeAttribute("class");
		i--;
	}

}

function DO_commerce_tid(){
	var ligne_vente = document.getElementsByClassName('tradeBuyOffer');
	
	for (var i=0;i<ligne_vente.length-1;i++){
		var numero = document.getElementsByName('tid')[i].value;
		ligne_vente[i].firstChild.lastChild.innerHTML+='<img alt="info" src="images/classic/icons/information.png" title="Offre n°'+numero+'"/>';
	}
}

function DO_commerce_timer(){
	var zoneheure = document.getElementsByClassName('tradeEstimateTooltip');
	for ( var i = 0 ; i < zoneheure.length ; i++){
		var heure = zoneheure[i].firstChild.innerHTML;
		var end_time = new Date();
			end_time.setDate(heure.substr(0,2));
			end_time.setMonth(heure.substr(3,2));
			end_time.setHours(heure.substr(9,2));
			end_time.setMinutes(heure.substr(12,2));
			end_time.setSeconds(0);
			end_time.setMilliseconds(0);
		if(i==0){
			var tempA=end_time.valueOf();
		}
		if(end_time.valueOf()==tempA){
			zoneheure[i].firstChild.className='tempA';
		}
		if(end_time.valueOf()!=tempA){
			var tempB=end_time.valueOf();
			zoneheure[i].firstChild.className='tempB';
		}
	}
	
	if (tempA<tempB){
		var ligne = document.getElementsByClassName('tempA');
		for (var j = 0 ; j<ligne.length ;j++){
			ligne[j].parentNode.parentNode.lastChild.firstChild.style.cssText = 'border:1px solid yellow';
		}
	} else {
		var ligne = document.getElementsByClassName('tempB');
		for (var j = 0 ; j<ligne.length ;j++){
			ligne[j].parentNode.parentNode.lastChild.firstChild.style.cssText = 'border:1px solid yellow';
		}
	}
}

function DO_commerce_lots(){
	var plus = document.getElementsByClassName('btn_dec ltr');
	var moins = document.getElementsByClassName('btn_inc ltr');
	//var colonne = document.getElementsByClassName('inputFleedAssignment');

	for (var i=0;i<plus.length;i++){plus[i].remove(); i--;}
	for (var i=0;i<moins.length;i++){moins[i].remove(); i--;}
	//for (var i=0;i<colonne.length;i++){colonne[i].style.cssText="margin:0px; width:280px;";}
	
	var part = document.getElementsByClassName('adjNumInput tradeSearchSplittedCount');
	
	for(i=0, c=part.length ; i<c ;i++){
		part[i].value = lisibilite_nombre(part[i].max);
		document.getElementById('label'+part[i].id).innerHTML = Create_Aff(part[i].value.replace(/[^0-9]/gi,''),type_conversion);
	}
}

function DO_vente_max(){
	var newButton = document.createElement("input");
		newButton.type = "button";
		newButton.value = "Max";
		newButton.id="put_max";
		newButton.onclick = function(){			
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
								
			var qte = document.getElementById('tradeOfferAmount'); 
			var prix = document.getElementById('price_count');
			document.getElementById('labeltradeOfferAmount').innerHTML = Create_Aff(qte.value.replace(/[^0-9]/gi,''),type_conversion);
			qte.value = lisibilite_nombre(qte.value.replace(/[^0-9]/gi,''));
			setTimeout(function(){
				document.getElementById('labelprice_count').innerHTML = Create_Aff(prix.value.replace(/[^0-9]/gi,''),type_conversion);
			},50);				
		};
						
	document.getElementById('tradeSaleResourceDropdown').parentNode.appendChild(newButton);
}

function DO_espionnage(){
	
	if(window.location.search.split('&')[0]=='?mode=3'){
		var name =new Array('Satellite espion', 'Drone', 'Avion de reconnaissance', 'Agent');
		var valeur_att=new Array(45000,7500,24000,3000);
		var valeur_def=new Array(15000,2500,8000,1000);
		var needor = new Array(10000,6000,20000,5000);
		var def = 0;
		var possess = 0;

		var posi_tab=document.getElementById('lightboxContent').firstChild.firstChild;

		for (i=0;i<4;i++){
		possess = document.getElementsByClassName('unit_description')[i].getElementsByClassName('tooltipExtention showTooltipDefault')[1].title.replace(/[^0-9]/gi,'');
		def =  n(0).plus(possess).multiply(valeur_def[i]).plus(def);
		}

		var need_unit_att=n(0).plus(def).divide(45000);
		var need_or_att=n(0).plus(need_unit_att).multiply(10000);
		var cout_or = n(0).plus(need_or_att).multiply(1000);
		var cout_sat = n(0).plus(need_unit_att).multiply(5000000);
		
		var phrase = document.createElement('div');
			phrase.innerHTML = 'Pour passer votre défense, il faudra à votre attaquant <strong>'+Create_Aff(need_unit_att, type_conversion)+'</strong> de satellites et <strong>'+Create_Aff(need_or_att, type_conversion)+'</strong> d\'or ce qui coute <strong>'+Create_Aff(cout_or, type_conversion)+'</strong> en or et <strong>'+Create_Aff(cout_sat, type_conversion)+'</strong> en sat</br></br>Pour avoir 100% il faut le double au minimum';
		
		posi_tab.appendChild(phrase);
	/*	
		var titre = document.createElement('div');
		titre.innerHTML = '<div>Unités défendable pour que le défenseur perdent son RE</div>';

		posi_tab.appendChild(titre);

		var tableau=document.createElement('table');
		tableau.className='battleReport';
		tableau.style.cssText = 'text-align:center; width:599px;';
		tableau.innerHTML='<th>Unité</th><th>Quantité défendable</th><th>Or necessaire</th>';
		titre.appendChild(tableau);

		for (i=0;i<4;i++){
			var ligne = document.createElement('tr');
			ligne.innerHTML='<td>'
				+ name[i]
			+'</td>'
			+'<td>'
				+ Create_Aff(need_unit_att[i] ,type_conversion)
			+'</td>'
			+'<td>'
				+ Create_Aff(need_or_att[i], type_conversion)
			+'</td>';

			tableau.appendChild(ligne);
		}

		var titre2 = document.createElement('div');
		titre2.innerHTML = '<div></br>Unités necessaire pour que l\'attaquant ait 100% sur vous</div>';

		posi_tab.appendChild(titre2);

		var tableau100=document.createElement('table');
		tableau100.className='battleReport';
		tableau100.style.cssText = 'text-align:center; width:599px;';
		tableau100.innerHTML='<th>Unité</th><th>Quantité pour avoir 100%</th><th>Or necessaire pour avoir 100%</th>';
		titre2.appendChild(tableau100);

		for (i=0;i<4;i++){
			var ligne = document.createElement('tr');
			ligne.innerHTML='<td>'
				+ name[i]
			+'</td>'
			+'<td>'
				+ Create_Aff(n(need_unit_att[i]).multiply(2),type_conversion)
			+'</td>'
			+'<td>'
				+ Create_Aff(n(need_or_att[i]).multiply(2),type_conversion)
			+'</td>';

			tableau100.appendChild(ligne);
		}*/
	}
}

function DO_versement2(){
	
	function get_Values(){
		a = document.getElementById('Id_ally').value;
		var taux = document.getElementById('buildingMap40').title.replace(/[^0-9]/gi,'');
		var json = document.getElementById('buildingMap40').getAttribute('rel');
		var lvl = JSON.parse(json).amount-1;
		var max = n(4).pow(lvl).multiply(100000000);
		Qte_pet = n(0).plus(max).multiply(taux).multiply(3).divide(50000);
		Qte_muni = n(0).plus(max).multiply(taux).multiply(3).divide(700);
	}
	
	var a, Qte_pet, Qte_muni;
	
	var Id_alli = GM_getValue('idally',12345);

	var liste_der = document.createElement('div');
		liste_der.className = "infopanel";
		liste_der.innerHTML = '<a class="toggleInfopanelTab up" rel="DO_versement" href="#" id="posi_versement"><strong>DO Versements</strong></a><div id="DO_versement" class="infoTab up ltr" style="display: none;"><label for="Id_ally">Id de l\'alliance: </label><input type="text" id="Id_ally" size="4" maxlength="5" /></br><input type="button" id="distrib_pet" value="Verser pet"/><input type="button" id="distrib_ammo" value="Verser muni"/></div>'
		
	document.getElementById('infopanel_inner').insertBefore(liste_der, document.getElementById('infopanelBoardLink'));
	
	document.getElementById('distrib_pet').onclick = function(){
		get_Values();
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "Webservices/alliance/administration/cashbox.php",
		  data: "allianceID="+a+"&amount="+Qte_pet+"&selectedResource=1&selectedTarget=3&targetIDs=&description=&type=transaction&cashBoxTypeId=1",
		  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
		  onload: function(response){
			document.getElementById('distrib_pet').value = 'Versé';
		  }
		});
	}
			
	document.getElementById('distrib_ammo').onclick = function(){
		get_Values();
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "Webservices/alliance/administration/cashbox.php",
		  data: "allianceID="+a+"&amount="+Qte_muni+"&selectedResource=4&selectedTarget=3&targetIDs=&description=&type=transaction&cashBoxTypeId=1",
		  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
		  onload: function(response){
			document.getElementById('distrib_ammo').value = 'Versé';
		  }
		});	
	}
	
	document.getElementById('Id_ally').value = Id_alli;
	document.getElementById('Id_ally').onchange = function(){
		GM_setValue('idally',this.value);
	}

}

function DO_versement(){
		var position = document.getElementById('allianceAllocateMoney').parentNode;
		
		var Btn1 = document.createElement('input');
			Btn1.type = 'button';
			Btn1.value = 'Verser pet';
			Btn1.id="distrib_pet";
			Btn1.onclick = function(){
				var json = document.getElementById('allianceAllocateMoney').getAttribute('rel');
				var a = JSON.parse(json).allianceId;
				GM_xmlhttpRequest({
				  method: "POST",
				  url: "Webservices/alliance/administration/cashbox.php",
				  data: "allianceID="+a+"&amount=3000000000000000000000000&selectedResource=1&selectedTarget=3&targetIDs=&description=&type=transaction&cashBoxTypeId=1",
				  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
				  onload: function(response){
					document.getElementById('distrib_pet').value = 'Versé';
				  }
				});
			}
			
		var Btn2 = document.createElement('input');
			Btn2.type = 'button';
			Btn2.value = 'Verser muni';
			Btn2.id="distrib_ammo";
			Btn2.onclick = function(){
				var json = document.getElementById('allianceAllocateMoney').getAttribute('rel');
				var a = JSON.parse(json).allianceId;
				GM_xmlhttpRequest({
				  method: "POST",
				  url: "Webservices/alliance/administration/cashbox.php",
				  data: "allianceID="+a+"&amount=3000000000000000000000000&selectedResource=4&selectedTarget=3&targetIDs=&description=&type=transaction&cashBoxTypeId=1",
				  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
				  onload: function(response){
					document.getElementById('distrib_ammo').value = 'Versé';
				  }
				});				
			}
			
		position.appendChild(Btn1);
		position.appendChild(Btn2);
}

function DO_attaque(){
		//****************redimensionnmenet*******************

		var plus = document.getElementsByClassName('btn_dec ltr');
		var moins = document.getElementsByClassName('btn_inc ltr');

		for (var i=0;i<plus.length;i++){plus[i].remove(); i--;}
		for (var i=0;i<moins.length;i++){moins[i].remove(); i--;}

		Number.prototype.ToWrite=function(){
			return lisibilite_nombre(new Big(this).str());
		}

		function portion(a, b){
			a=parseInt(a.replace(/[^0-9]/gi,''));
			flag[a]=false;
			var Qte = Stock[a].replace(/[^0-9]/gi,'');
			inp_txt[a][0].value=lisibilite_nombre(n(Qte).divide(b));
		}

		function calcul_all(){
			for (var j=0; j<inp_txt.length; j++){
				var valeur = parseFloat(inp_txt[j][0].value);
				if(flag[j]==true && isNaN(valeur)==false){
					var puissance = parseInt(newList[j].value);
					var total = valeur * Math.pow(10,puissance);
					inp_txt[j][0].value = total.ToWrite();
				}
			}
		}

		//***************rc_attaque******************

		var formulaire = document.getElementsByClassName('block')[2].getElementsByTagName('tr');
		var Stock = new Array();
		var inp_txt = new Array();
		var newList = new Array(); 
		var flag = new Array(); 
		var newButton = new Array();
		var newButton2 = new Array();
		var newButton3 = new Array();
		if (type_conversion==1){ //puissance
		var langArray = [
			{value: "0", text: "U"},
			{value: "18", text: "10^15"},
			{value: "21", text: "10^18"},
			{value: "24", text: "10^21"},
			{value: "27", text: "10^24"},
			{value: "30", text: "10^27"},
			{value: "33", text: "10^30"},
			{value: "36", text: "10^33"},
			{value: "39", text: "10^36"},
			{value: "42", text: "10^39"},
			{value: "45", text: "10^42"},
			{value: "48", text: "10^45"},
			{value: "51", text: "10^48"}
		];
		}
		if (type_conversion==2){ //deci
		var langArray = [
			{value: "0", text: "U"},
			{value: "18", text: "Bd."},
			{value: "21", text: "tl."},
			{value: "24", text: "Td."},
			{value: "27", text: "ql."},
			{value: "30", text: "Qd."},
			{value: "33", text: "qil."},
			{value: "36", text: "Qid."},
			{value: "39", text: "sl."},
			{value: "42", text: "Sd."},
			{value: "45", text: "spl."},
			{value: "48", text: "Spd."},
			{value: "51", text: "ol."}
		];
		}
		if (type_conversion==0){ //cresus
		var langArray = [
			{value: "0", text: "U"},
			{value: "18", text: "C"},
			{value: "21", text: "kC"},
			{value: "24", text: "mC"},
			{value: "27", text: "MC"},
			{value: "30", text: "bC"},
			{value: "33", text: "BC"},
			{value: "36", text: "C²"},
			{value: "39", text: "kC²"},
			{value: "42", text: "mC²"},
			{value: "45", text: "MC²"},
			{value: "48", text: "bC²"},
			{value: "51", text: "BC²"}
		];
		}
var classique = ['', '',' mil.',' Mil.',' Md.',' bl.',' Bd.',' tl.',' Td.',' ql.',' Qd.',' qil.',' Qid.',' sl.',' Sd.',' spl.',' Spd.',' ol.',' Od.',' nl.'];

		for(var j = 1 ; j < formulaire.length-1 ; j++){
			Stock[j-1] = formulaire[j].getElementsByClassName('milCell')[1].getElementsByTagName('span')[0].title;
			flag[j-1] = true;
			inp_txt[j-1]= formulaire[j].getElementsByClassName('adjNumInput input');
			inp_txt[j-1][0].id='zone'+(j-1);
			inp_txt[j-1][0].onkeyup=function(){
			var id_form = this.id.replace(/[^0-9]/gi,'');
			flag[id_form]=true;
			};
			newList[j-1]= document.createElement('select');
			
			for (var i=0; i <langArray.length ; i ++) {
				var option = document.createElement('option');
					option.value = langArray[i].value;
					option.text = langArray[i].text;
					if(i==4){option.selected="selected";}
				newList[j-1].appendChild(option);
			}
			
			inp_txt[j-1][0].parentNode.appendChild(newList[j-1]);	

			newButton[j-1] = document.createElement("input");
							newButton[j-1].type = "button";
							newButton[j-1].value = "1/3";
							newButton[j-1].id='tiers'+(j-1);
							newButton[j-1].onclick = function(){
								portion(this.id, 3);
							};
			inp_txt[j-1][0].parentNode.appendChild(newButton[j-1]);	
			
			newButton2[j-1] = document.createElement("input");
							newButton2[j-1].type = "button";
							newButton2[j-1].value = "1/2";
							newButton2[j-1].id='demi'+(j-1);
							newButton2[j-1].onclick = function(){
								portion(this.id, 2);
							};
			inp_txt[j-1][0].parentNode.appendChild(newButton2[j-1]);	
			
			newButton3[j-1] = document.createElement("input");
							newButton3[j-1].type = "button";
							newButton3[j-1].value = "Max";
							newButton3[j-1].id='max'+(j-1);
							newButton3[j-1].onclick = function(){
								portion(this.id, 1);
							};
			inp_txt[j-1][0].parentNode.appendChild(newButton3[j-1]);
		}

		var newButton3 = document.createElement("input");
						newButton3.type = "button";
						newButton3.value = "Réorganiser";
						newButton3.onclick = function(){
							calcul_all(); 
							btn_reorga.click();
						};
						
		var btn_reorga = document.getElementsByClassName('input')[document.getElementsByClassName('input').length-1];
		btn_reorga.style.display ="none";
		btn_reorga.parentNode.insertBefore(newButton3, btn_reorga);
}

function DO_conversion(){
	var balise=document.getElementsByClassName('tooltipExtention showTooltipDefault');
		for(var i=0, c=balise.length; i<c; i++){
			balise[i].innerHTML=Convertir2(balise[i].title, type_conversion);
		}
}

function DO_conversion_premium(){
	var Name = ['Crésus', 'Puissance', 'Décimal'];
		
		function MyScript(aff_mode, classe){
			var balise=document.getElementsByClassName(classe);
				for(var i=0, c=balise.length; i<c; i++){
					balise[i].innerHTML=Convertir2(balise[i].title, aff_mode);
				}
		}

		function toggle_type(elem){
			type_conversion = (type_conversion+1)%3;
			GM_setValue('type_of_aff', type_conversion);
			elem.value = Name[type_conversion];
		}
		
			document.getElementById('premiumGraph').style.display = 'block';
			document.getElementById('accountValueNote').innerHTML = 'Lancer la conversion</br>';
			
			var modeC=document.createElement('input');
				modeC.type='button';
				modeC.value = Name[type_conversion];
				modeC.onclick = function(){
					toggle_type(this);
					MyScript(type_conversion, 'showTooltipDefault');
				};
				modeC.style.width="80px";
					
			var newButton = document.createElement('input');
				newButton.type='button';
				newButton.value = "Convertir";
				newButton.onclick = function(){
					MyScript(type_conversion, 'showTooltipDefault');
				};

			document.getElementById('accountValueNote').appendChild(modeC);
			document.getElementById('accountValueNote').appendChild(newButton);
			
			var valeurs = document.getElementById('accountCurrentValues').innerHTML.split('<br>');

			var Val_actuelle=Create_Aff(valeurs[0].replace(/[^0-9]/gi,''), type_conversion);
			var Moy_actuelle=Create_Aff(valeurs[1].replace(/[^0-9]/gi,''), type_conversion);
			var Facteur = document.getElementById('accountCurrentValues').lastChild.title.replace(/[^0-9.]/gi,'');

			document.getElementById('accountCurrentValues').innerHTML=Val_actuelle+'<br>'+Moy_actuelle+'<br>'+Facteur;
}

function DO_RC_RE_info(){
	
	var count=0;
	
	Number.prototype.toFormat=function(){
		return Math.floor(this/60000) +' min '+ Math.floor(this/1000)%60 +' s ' + this%1000 +' ms ';
	}

	Number.prototype.toRatio=function(){
		if(this<1000){return this.toPrecision(2);}
		if(this>1000){return Create_Aff(parseInt(this),type_conversion);}
	}
	
	function load_pref(){
		for (i=1;i<47;i++){
			Unit_Display[Unit_Name[i]]=GM_getValue('pref'+Unit_Name[i], true);//Unit_Display[Unit_Name[i]]);
			if(Unit_Display[Unit_Name[i]]==true){
				Unit_selectionnable.push(Unit_Name[i]);
			}
		}
	}
	
	function toggle(elem, nom_id){
	if(elem.checked){
	document.getElementById(nom_id).style.display = 'block';
	} else {
	document.getElementById(nom_id).style.display = 'none';
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

	function Add_DYOA(){
		
		var MyDiv5= document.createElement('div');
			MyDiv5.id='Header3';

		posi_plugin.appendChild(MyDiv5); 

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

		posi_plugin.appendChild(MyDiv6);

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
								simuler_afficher(armee_choisi, 'div_result_simu', 'rc_info1');
						};
											
		var newButton4 = document.createElement("input");
						newButton4.type = "button";
						newButton4.value = "Supprimer la dernière unité";
						newButton4.id='btn_delete_last';
						newButton4.onclick = function(){
							document.getElementById('div_result_simu').innerHTML='';
							document.getElementById('rc_info1').innerHTML='';

							document.getElementById('Content3').getElementsByTagName('select')[count-1].remove();
							document.getElementById('Content3').getElementsByTagName('p')[count-1].remove();

							count--;
						};
		
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
	}

	function ratio(valA, valB){
		valA=parseInt(valA);
		valB=parseInt(valB);
		if(valA>valB){
		var ratio = (valA/valB).toRatio() +' : 1';
		} else {
		var ratio = '1 : '+(valB/valA).toRatio();
		}

	return ratio;
	}

	function add_result(Valeur_unit_att_init, Valeur_unit_def_init, Valeur_unit_att_perdu, Valeur_unit_def_perdu, entretien_pre_att, entretien_post_att, entretien_pre_def, entretien_post_def, Qte_muni,diesel_att, kero_att, id_loc){

		var cout_diesel = n(0).plus(diesel_att).multiply(5002);
		var cout_kero = n(0).plus(kero_att).multiply(10003);
		var cout_muni = n(0).plus(Qte_muni).multiply(7);
		
		var investissement = n(0).plus(cout_diesel).plus(cout_kero).plus(cout_muni).plus(Valeur_unit_att_init);
		var perte_total = n(0).plus(cout_diesel).plus(cout_kero).plus(cout_muni).plus(Valeur_unit_att_perdu);

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
				+ '<td style="text-align:left; width:33%">' + Create_Aff(Valeur_unit_att_init, type_conversion) + '</td>'
				+ '<td style="text-align:center; width:33%">' + ratio(Valeur_unit_att_init, Valeur_unit_def_init) + '</td>'
				+ '<td style="text-align:right; width:33%">' + Create_Aff(Valeur_unit_def_init, type_conversion) + '</td>'
			+ '</tr>'
			+ '<tr>'
				+ '<th colspan="3" style="text-align:center">'
					+'Valeur des unités perdues'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left ; width:33%">' + Create_Aff(Valeur_unit_att_perdu, type_conversion) + '</td>' 
				+ '<td style="text-align:center; width:33%">' + ratio(Valeur_unit_att_perdu, Valeur_unit_def_perdu) + '</td>'
				+ '<td style="text-align:right ; width:33%">' + Create_Aff(Valeur_unit_def_perdu, type_conversion) + '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<th colspan="3" style="text-align:center">'
				+ 'Entretien avant attaque'
			+ '</th>'
		+ '</tr>'
		+ '<tr>'
			+ '<td style="text-align:left; width:33%">' + Create_Aff(entretien_pre_att, type_conversion)+'/h' + '</td>'
			+ '<td style="text-align:center; width:33%"></td>'
			+ '<td style="text-align:right; width:33%">' + Create_Aff(entretien_pre_def, type_conversion)+'/h' + '</td>'
		+ '</tr>'
		+ '<tr>'
			+ '<th colspan="3" style="text-align:center">'
				+ 'Entretien post-attaque'
			+ '</th>'
		+'</tr>'
		+ '<tr>'
			+ '<td style="text-align:left; width:33%">' + Create_Aff(entretien_post_att, type_conversion)+'/h' + '</td>'
			+ '<td style="text-align:center; width:33%"></td>'
			+ '<td style="text-align:right; width:33%">' + Create_Aff(entretien_post_def, type_conversion)+'/h' + '</td>'
		+ '</tr>'
			+ '<tr>'
				+ '<th colspan="3" style="text-align:center">'
					+'Ressources'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td colspan="2" style="text-align:left; width:33%">' 
					+'Munitions : '
					+ Create_Aff(Qte_muni, type_conversion)
					+' ( soit '
					+ Create_Aff(cout_muni, type_conversion)
					+' )'
				+ '</td>'
				+ '<td style="text-align:right; width:33%"></td>'
			+ '</tr>'
			+ '<tr>'
				+ '<td colspan="2" style="text-align:left; width:33%">'
					+'Diesel : '
					+ Create_Aff(diesel_att, type_conversion)
					+' ( soit '
					+ Create_Aff(cout_diesel, type_conversion)
					+' )'
				+ '</td>'
				+ '<td style="text-align:right; width:33%"></td>'
			+ '</tr>'
			+ '<tr>'
				+ '<td colspan="2" style="text-align:left; width:33%">'
					+'Kérosène : '
					+ Create_Aff(kero_att, type_conversion)
					+' ( soit '
					+ Create_Aff(cout_kero, type_conversion)
					+' )'
				+ '</td>'
				+ '<td style="text-align:right; width:33%"></td>'
			+ '</tr>'
			+ '<tr>'
				+ '<th colspan="3" style="text-align:center">'
					+ 'Investissement Total:'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left; width:33%">' + Create_Aff(investissement, type_conversion) + '</td>'
				+ '<td style="text-align:center; width:33%">'+ratio(investissement , Valeur_unit_def_init)+'</td>'
				+ '<td style="text-align:right; width:33%">' + Create_Aff(Valeur_unit_def_init, type_conversion) + '</td>'
			+ '</tr>'
			+ '<tr>'
				+ '<th colspan="3" style="text-align:center">'
					+ 'Depenses Totales:'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left; width:33%">' + Create_Aff(perte_total, type_conversion) + '</td>'
				+ '<td style="text-align:center; width:33%">'+ratio(perte_total, Valeur_unit_def_perdu)+'</td>'
				+ '<td style="text-align:right; width:33%">' + Create_Aff(Valeur_unit_def_perdu, type_conversion) + '</td>'
			+ '</tr>';
			
		document.getElementById(id_loc).appendChild(titre5);
		document.getElementById(id_loc).appendChild(info_rc2);
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

	function Add_option(){
		var MyDiv7= document.createElement('div');
			MyDiv7.id='Header4';

		posi_plugin.appendChild(MyDiv7); 

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
		posi_plugin.appendChild(list_unite);
		
		var table = document.createElement('table');
		list_unite.appendChild(table);
		
		for (var i=0;i<23;i++){
		
		var ligne = document.createElement('tr');
		table.appendChild(ligne);
		
			for (var j =0; j<2; j++){
				var colonne = document.createElement('td');
					colonne.style.width = "300px";
				ligne.appendChild(colonne);
				
				var nom_valide = document.createElement('Label');
					nom_valide.setAttribute("for", Unit_Name[2*i+j+1]);
					nom_valide.innerHTML =Unit_Name[2*i+j+1];
				
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
		
			if (Path =='battleReport.php'){
				for (var i = 1; i < Temporaire_def.length ; i++){ // pour toutes les unités ennemies 
					if(Unites_Defenseur_Fin[i]!=0){ //s'il reste des unités
						unit_def[nb_def]=new Array(Unites_Defenseur_Nom[i], parseInt(Unites_Defenseur_Fin[i]),parseInt(Unites_Defenseur_Fin[i]),0); // qte init, restante, détruite de unit name du defenseur;
						nb_def++;// comptage du nombre d'unités
					}
				}
			}
			if (Path =='spionageReport.php'){
				for (var i = 0; i < Unites_Nom.length ; i++){ // pour toutes les unités ennemies
					if(Qte[i]!=0){ //s'il reste des unités
						unit_def[nb_def]=new Array(Unites_Nom[i], Qte[i],Qte[i],0); // qte init, restante, détruite de unit name du defenseur;
						nb_def++;// comptage du nombre d'unités
					}
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
		var FaceOf = 'att';
		document.getElementById(loc_rc).innerHTML='';
		document.getElementById(loc_info).innerHTML='';
		
		if (FaceOf == 'att'){
			
			if (Path =='battleReport.php'){
				for (var i = 1; i < Temporaire_def.length ; i++){ // pour toutes les unités ennemies 
					if(Unites_Defenseur_Fin[i]!=0){ //s'il reste des unités
						unit_def[nb_def]=new Array(Unites_Defenseur_Nom[i], parseInt(Unites_Defenseur_Fin[i]),parseInt(Unites_Defenseur_Fin[i]),0); // qte init, restante, détruite de unit name du defenseur;
						nb_def++;// comptage du nombre d'unités
					}
				}
			}
			if (Path =='spionageReport.php'){
				for (var i = 0; i < Unites_Nom.length ; i++){ // pour toutes les unités ennemies
					if(Qte[i]!=0){ //s'il reste des unités
						unit_def[nb_def]=new Array(Unites_Nom[i], Qte[i],Qte[i],0); // qte init, restante, détruite de unit name du defenseur;
						nb_def++;// comptage du nombre d'unités
					}
				}
			}
			
			for (var j = 0 ; j < armee_att.length ; j++){ //pour la liste des unités choisies
				unit_att[nb_att]=new Array(armee_att[j], 0,0,0); // qte init, perdu, final de unit name;
				nb_att++;// comptage du nombre d'unités
			}
		
			for ( i2 = 0 ; i2 < nb_att ; i2++){ //pour chaque liste des unités choisies
				
				var rank = GetRank(unit_att[i2][0], unit_def);
				
					for (a2 = 0; a2 < nb_def; a2++){ // on affronte chacunes des unités ennemies
					
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
		}
		
		if (FaceOf == 'def'){
		
			for (var i = 1; i < armee_att.length ; i++){ // pour toutes les unités ennemies 
				unit_def[nb_def]=new Array(armee_att[j], 0,0,0); // qte init, restante, détruite de unit name du defenseur;
				nb_def++;// comptage du nombre d'unités
			}
			
			for (var j = 0 ; j < Temporaire_att.length ; j++){ //pour la liste des unités choisies
				if(parseInt(Unites_Attaquant_Fin[i])!=0){
					unit_att[nb_att]=new Array(Unites_Attaquant_Nom[i], parseInt(Unites_Attaquant_Fin[i]),parseInt(Unites_Attaquant_Fin[i]),0); // qte init, perdu, final de unit name;
					nb_att++;// comptage du nombre d'unités
				}
			}
		
			for ( i2 = 0 ; i2 < nb_att ; i2++){ //pour toutes les unités de l'attaquant
				
				if(unit_att[i2][2]!=0 /*&& continuer==true*/){
				
					for (a2 = 0; a2 < nb_def; a2++){ // on affronte chacunes des unités ennemies choisies
					
						var need = Math.ceil(unit_att[i2][1]*Unites_Stats[unit_att[i2][0]][5]/Unites_Stats[unit_def[a2][0]][6]);
						
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
		var div_td_def=document.createElement('tr');
		
		div_td_def.innerHTML='<td>'+unit_def[a3][0]+'</td>'
		+'<td>'
			+Create_Aff(new Big(unit_def[a3][1]).str(), type_conversion)
		+'</td>'
		+'<td>'
			+Create_Aff(new Big(unit_def[a3][2]).str(), type_conversion)
		+'</td>'
		+'<td>'
			+Create_Aff(new Big(unit_def[a3][3]).str(), type_conversion)
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
			+Create_Aff(new Big(unit_att[i3][1]).str(), type_conversion)
		+'</td>'
		+'<td>'
			+Create_Aff(new Big(unit_att[i3][2]).str(), type_conversion)
		+'</td>'
		+'<td>'
			+Create_Aff(new Big(unit_att[i3][3]).str(), type_conversion)
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
		
		Valeur_unit_att_init=new Big(Valeur_unit_att_init).str();
		Valeur_unit_def_init=new Big(Valeur_unit_def_init).str();
		Valeur_unit_att_perdu=new Big(Valeur_unit_att_perdu).str();
		Valeur_unit_def_perdu=new Big(Valeur_unit_def_perdu).str();
		entretien_att_av=new Big(entretien_att_av).str();
		entretien_att_ap=new Big(entretien_att_ap).str();
		entretien_def_av=new Big(entretien_def_av).str();
		entretien_def_ap=new Big(entretien_def_ap).str();
		Qte_muni=new Big(Qte_muni).str();
		diesel_att=new Big(diesel_att).str();
		kero_att=new Big(kero_att).str();
		
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

	posi_plugin.appendChild(MyDiv9); 

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

	posi_plugin.appendChild(MyDiv10);

	var btn_simulate = document.createElement("input");
		btn_simulate.type = "button";
		btn_simulate.value = "Simuler";
		btn_simulate.onclick = function(){
			if (Unit_selectionnable.length>=15){
				if (confirm(Unit_selectionnable.length+' unités sont selectionnées (soit '+Math.pow(Unit_selectionnable.length,4) +' armées possibles). Cela est supérieur au 15 unités maximums conseillées. Etes-vous sur de vouloir continuer? Si non aller dans les options pour enlever des unités.')) {
					optimize();
				}
			} else {
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

	if (Path =='battleReport.php'){
		var tableau = document.getElementsByTagName('tbody');
		var Temporaire_att = tableau[0].getElementsByTagName('tr');
		var Temporaire_def = tableau[1].getElementsByTagName('tr');
		var Temporaire_bat = tableau[2].getElementsByTagName('tr');

		var posi_plugin = document.getElementById('battleReport').firstChild;

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
		
		function read_RC(){
		
			for (var i = 1 ; i < Temporaire_att.length ; i++){
				Unites_Attaquant_Nom[i] = Temporaire_att[i].firstChild.innerHTML;
				Unites_Attaquant_Debut[i] = Temporaire_att[i].firstChild.nextSibling.firstChild.title.replace(/[^0-9]/gi,'');
				Unites_Attaquant_Fin[i] = Temporaire_att[i].firstChild.nextSibling.nextSibling.firstChild.title.replace(/[^0-9]/gi,'');
				Unites_Attaquant_Detruit[i] = Temporaire_att[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.title.replace(/[^0-9]/gi,'');
			}

			for (var i = 1 ; i < Temporaire_def.length ; i++){
				Unites_Defenseur_Nom[i] = Temporaire_def[i].firstChild.innerHTML;
				Unites_Defenseur_Debut[i] = Temporaire_def[i].firstChild.nextSibling.firstChild.title.replace(/[^0-9]/gi,'');
				Unites_Defenseur_Fin[i] = Temporaire_def[i].firstChild.nextSibling.nextSibling.firstChild.title.replace(/[^0-9]/gi,'');
				Unites_Defenseur_Detruit[i] = Temporaire_def[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.title.replace(/[^0-9]/gi,'');
			}

			for (var i = 1 ; i < Temporaire_bat.length ; i++){
				Bat_Nom[i] = Temporaire_bat[i].firstChild.innerHTML;
				Bat_Debut[i] = Temporaire_bat[i].firstChild.nextSibling.firstChild.title.replace(/[^0-9]/gi,'');
				Bat_fin[i] = Temporaire_bat[i].firstChild.nextSibling.nextSibling.firstChild.title.replace(/[^0-9]/gi,'');
				Bat_perdu[i] = Temporaire_bat[i].firstChild.nextSibling.nextSibling.nextSibling.firstChild.title.replace(/[^0-9]/gi,'');
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
				Perte_Argent_Unites_Attaquant = n(0).plus( Unites_Attaquant_Detruit[i] ).multiply ( Unites_Stats[Unites_Attaquant_Nom[i]][0] ).plus( Perte_Argent_Unites_Attaquant );
				Argent_Unites_Attaquant = n(0).plus( Unites_Attaquant_Debut[i] ).multiply ( Unites_Stats[Unites_Attaquant_Nom[i]][0] ).plus( Argent_Unites_Attaquant );
				Entretien2_av = n(0).plus( Unites_Attaquant_Debut[i] ).multiply ( Unites_Stats[Unites_Attaquant_Nom[i]][4] *6).plus( Entretien2_av );
				Entretien2_ap = n(0).plus( Unites_Attaquant_Fin[i] ).multiply ( Unites_Stats[Unites_Attaquant_Nom[i]][4] *6).plus( Entretien2_ap );
				Perte_Munition_Attaquant = n(0).plus( Unites_Attaquant_Debut[i] ).multiply ( Unites_Stats[Unites_Attaquant_Nom[i]][3] ).plus( Perte_Munition_Attaquant );
				if (Unites_Stats[Unites_Attaquant_Nom[i]][2] == 'Diesel') {
					Perte_Diesel_Attaquant = n(0).plus( Unites_Attaquant_Debut[i] ).multiply ( Unites_Stats[Unites_Attaquant_Nom[i]][1] ).plus( Perte_Diesel_Attaquant );
				} else {
					Perte_Kerosene_Attaquant = n(0).plus( Unites_Attaquant_Debut[i] ).multiply ( Unites_Stats[Unites_Attaquant_Nom[i]][1] ).plus( Perte_Kerosene_Attaquant );
				}
			} 

			for (i = 1, c = Unites_Defenseur_Nom.length; i < c; i++) {
				Perte_Argent_Unites_Defenseur = n(0).plus( Unites_Defenseur_Detruit[i] ).multiply ( Unites_Stats[Unites_Defenseur_Nom[i]][0]).plus( Perte_Argent_Unites_Defenseur );
				Argent_Unites_Defenseur = n(0).plus( Unites_Defenseur_Debut[i] ).multiply ( Unites_Stats[Unites_Defenseur_Nom[i]][0]).plus( Argent_Unites_Defenseur );
				Entretien_av = n(0).plus( Unites_Defenseur_Debut[i] ).multiply ( Unites_Stats[Unites_Defenseur_Nom[i]][4] *6).plus( Entretien_av );
				Entretien_ap = n(0).plus( Unites_Defenseur_Fin[i] ).multiply ( Unites_Stats[Unites_Defenseur_Nom[i]][4] *6).plus( Entretien_ap );
			} 

			var MyDiv= document.createElement('div');
				MyDiv.id='Content';
				
			posi_plugin.appendChild(MyDiv); 

			add_result(Argent_Unites_Attaquant, Argent_Unites_Defenseur, Perte_Argent_Unites_Attaquant, Perte_Argent_Unites_Defenseur, Entretien2_av, Entretien2_ap, Entretien_av, Entretien_ap, Perte_Munition_Attaquant,Perte_Diesel_Attaquant, Perte_Kerosene_Attaquant, 'Content');
		}
	
		document.getElementsByClassName("battleReportProtocol")[0].remove();
		document.getElementsByTagName('a')[0].remove();
		
		DO_conversion();
		load_pref();
		read_RC();
		generate_RC_info();
		Add_DYOA();
		Add_simu_opti();
		Add_option();
		
		
	}
	
	if (Path=='spionageReport.php'){
		
		var Add = document.getElementsByTagName('table')[0];
		var Temporaire = document.getElementsByTagName('td');
		var Type = document.getElementsByTagName('h1');
		var posi_plugin = document.getElementById('report').firstChild.firstChild;
		
		var Unites_Nom = new Array();
		var Qte = new Array();

		var Argent_Unites = 0;
		var Entretien = 0;
		var IndiceJavaScript = 0;

		var Unit_selectionnable = new Array();
		var armee = new Array();

		var total = 0;
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
		
		function generate_RC_info(){
			for (var i = 0, c = Unites_Nom.length; i < c; i++) {
				Argent_Unites += Qte[i] * Unites_Stats[Unites_Nom[i]][0];
				Entretien += Qte[i] * Unites_Stats[Unites_Nom[i]][4] * 6;
			} 
			
			Argent_Unites=new Big(Argent_Unites).str();
			Entretien=new Big(Entretien).str();
			
			Add.innerHTML +='<table class="battleReport" width="100%">'
				+ '<tr>'
					+ '<th colspan="3">'
						+'<h2 class="battleReport" style="text-align:center">Valeurs défense</h2>'
					+ '</th>'
				+ '</tr>'
				+ '<tr>'
					+ '<td style="text-align:left">Total Unités en $</td>'
					+ '<td style="text-align:right">' + Create_Aff(Argent_Unites,type_conversion) + '</td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td style="text-align:left">Entretiens horaire</td>' 
					+ '<td style="text-align:right">' + Create_Aff(Entretien,type_conversion)+ '</td>'
				+ '</tr>'
				+'</table>';
		}
		
		function read_RE(){
			if(Type[0].innerHTML=='Rapport d\'espionnage - Défense'){
				for (i = 0, c = Temporaire.length; i < c; i=i+2) {
					Unites_Nom[IndiceJavaScript] = Temporaire[i].innerHTML;
					Qte[IndiceJavaScript] = DelPoint(Temporaire[i+1].innerHTML);
					Temporaire[i+1].innerHTML=Create_Aff(Temporaire[i+1].innerHTML,type_conversion);
					IndiceJavaScript++;
					}
				
				generate_RC_info();
				Add_DYOA();
				Add_simu_opti();
				Add_option();
			}
			if(Type[0].innerHTML=='Rapport d\'espionnage - Unités'){
				
				for (i = 0, c = Temporaire.length; i < c; i=i+3) {
					Unites_Nom[IndiceJavaScript] = Temporaire[i].innerHTML;
					Qte[IndiceJavaScript] = DelPoint(Temporaire[i+1].innerHTML);
					Temporaire[i+1].innerHTML=Create_Aff(Temporaire[i+1].innerHTML,type_conversion);
					IndiceJavaScript++;
					}
				
				generate_RC_info();
				Add_DYOA();
				Add_simu_opti();
				Add_option();	
			}
			if(Type[0].innerHTML=='Rapport d\'espionnage - Ressources'){
				var tab = document.getElementsByTagName('tbody')[0];
				var line = tab.getElementsByTagName('tr');
				
				var Money = line[1].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				var Gold = line[2].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				var Petrole = line[3].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				var Muni = line[4].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				var Kero = line[5].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				var Diesel = line[6].lastChild.innerHTML.replace(/[^0-9]/gi,'');
				
				var Cout_or=n(Gold).multiply(1000);
				var Cout_muni=n(Muni).multiply(7);
				var Cout_pet=n(Petrole).multiply(500);
				var Cout_kero=n(Kero).multiply(10003);
				var Cout_diesel=n(Diesel).multiply(5002);
				
				var total = n(Money).plus(Cout_or).plus(Cout_muni).plus(Cout_pet).plus(Cout_kero).plus(Cout_diesel);
				
				line[1].lastChild.innerHTML=Create_Aff(Money,type_conversion);
				line[2].lastChild.innerHTML=Create_Aff(Gold,type_conversion);
				line[3].lastChild.innerHTML=Create_Aff(Petrole,type_conversion);
				line[4].lastChild.innerHTML=Create_Aff(Muni,type_conversion);
				line[5].lastChild.innerHTML=Create_Aff(Kero,type_conversion);
				line[6].lastChild.innerHTML=Create_Aff(Diesel,type_conversion);
				
				
				Add.innerHTML +='<table class="battleReport" width="100%">'
				+ '<tr>'
					+ '<th colspan="3">'
						+'<h2 class="battleReport" style="text-align:center">Valeurs du compte</h2>'
					+ '</th>'
				+ '</tr>'
				+ '<tr>'
					+ '<td style="text-align:left">Valeur du compte</td>'
					+ '<td style="text-align:right">' + Create_Aff(total ,type_conversion)+ '</td>'
				+ '</tr>'
				+'</table>';
			}
		}
		
		load_pref();
		read_RE();
		
	}
	
}

if(window.location.href=='http://www.desert-operations.fr/'){
	if(document.getElementById('_highdigit_loginbox_login_form')!=null){
		setTimeout(function(){
			document.getElementById('_highdigit_keep_connected').checked=true;
			document.getElementById('_highdigit_btn_login').click();
		}, 2000);
	}
	setTimeout(function(){
		document.getElementById('_highdigit_loginbox_play').click();
	}, 2000);
}
if (window.location.href=='http://www.desert-operations.fr/game.html'){
	setTimeout(function(){
		window.location.href='http://game.desert-operations.fr/worldselector.php?world=world1';
	}, 2000);
} 

var type_conversion = GM_getValue('type_of_aff', 1);
var World = window.location.pathname.split('/')[1];
var Search = window.location.search;
var Path = window.location.pathname.split('/')[2];
var hold_co = GM_getValue('actived', false);
var enable_safe_attaque = GM_getValue('safe_att', false);			

if (Search!='?show=accessdenied'){

DO_commerce_link();
DO_change_link();

if (Path!='bank.php'){
	Add_label_val();
}
if (document.getElementById('infopanel_inner')!=null){
	DO_boost();
	Display_conversion();
	Display_attaque_bot();
	DO_reco_display();
	Display_safe_att();
	DO_versement2();
	if(enable_safe_attaque==true){
		DO_safe_attaque();
	}
}
if (Path !='battleReport.php' && Path !='spionageReport.php' && Path !='premium_cash.php'){
	DO_conversion();
}
if (Path =='premium_cash.php' && Search =='?section=ress'){
	DO_conversion_premium();
	DO_def_fixe();
}
if (World=='world1' && Path =='allianceoverview.php'){
	DO_continents();
}
if (Path =='alliancereports.php'){
	RE_type();
	//List_RERC();
}
if (Path =='kt.php'){
	DO_CrossTable();
}
if (Path =='units.php'){
	DO_UnitTable();
}
if (Path=='userdetails.php'){
	DO_fiche();
}
if (Path=='flottendetails.php'){
	DO_defense();
}
if (Path=='handel.php' && Search.split('&')[0]=='?mode=1'){
	DO_commerce_color();
	DO_commerce_lots();
	DO_commerce_timer();
	DO_commerce_tid();
}
if (Path=='handel.php' && Search.split('&')[0]=='?mode=2'){
	DO_vente_max();
}
if (Path=='produktion.php'){
	DO_espionnage();
}
if (Path=='allianceadministration.php'){
	DO_versement();
}
if (Path=='militaer.php'){
	DO_MeP_army();
	DO_attaque();
	DO_info_attaque();
}
if (Path=='battleReport.php' || Path=='spionageReport.php'){
	DO_RC_RE_info();
}
if (hold_co==true){
	setTimeout(function(){location.reload();}, 900000 );
 }
if (Path=='rohstoffe.php'){
	DO_raffinage();
}
if (Path=='alliancewars.php'){
	Pts_War();
}
}

if (Search=='?show=accessdenied'){
	setTimeout(function(){
		window.location.href='http://www.desert-operations.fr/';
	}, 1000);
} 
