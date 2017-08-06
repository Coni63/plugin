// ==UserScript==
// @name           DO_bot_2
// @author         Coni
// @description    Ajout d'un bot pour le commerce
// @include        http://game.desert-operations.fr/world*/*
// @include			https://sites.google.com/site/userconiscript/attente
// @version        2.10
// @updateURL		https://sites.google.com/site/userconiscript/plugin/DO_bot_2.user.js
// @downloadURL		https://sites.google.com/site/userconiscript/plugin/DO_bot_2.user.js
// @installURL		https://sites.google.com/site/userconiscript/plugin/DO_bot_2.user.js
// @require		   https://sites.google.com/site/userconiscript/plugin/fonctions.js
// @require		   https://sites.google.com/site/userconiscript/plugin/unite.js
// @require		   https://sites.google.com/site/userconiscript/plugin/bignumber.js
// @require		   https://sites.google.com/site/userconiscript/plugin/dhtmlxmessage.js
// @resource       My_CSS  https://sites.google.com/site/userconiscript/plugin/dhtmlxmessage_dhx_skyblue.css
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getResourceText
// ==/UserScript==

var cssTxt  = GM_getResourceText ("My_CSS");
GM_addStyle(cssTxt);

function parseAJAX_ResponseHTML(respObject){
	var parser      = new DOMParser ();
	var responseDoc = parser.parseFromString (respObject.responseText, "text/html");
	return responseDoc;
}

function TronquerBigInt(n){
	if(n.length % 3==0){
		var a = 6;
	}else{
		var a = n.length % 3 + 3;
	}
	var reg = new RegExp('[0-9]{'+a+'}','g');
	var res = reg.exec(n);
	var res2 = n.substring(a,n.length).replace(/[0-9]/g,'0');
	return res+res2;
}

function Achat_List(JSON_array){
		if(JSON_array.length>=1){
		
			var Json_parsed = JSON.parse(JSON_array[0]);
			var Trade_id = Json_parsed.num_tid;
			var splitted_count_array = Json_parsed.qte;
			var myPhpSessID = window.content.document.cookie.match(/PHPSESSID=[A-Za-z0-9]+/i);
			var urlBuy = "http://game.desert-operations.fr/"+World+"/handel.php";
			var data5   = myPhpSessID + '&tid='+Trade_id+'&splitted_count='+splitted_count_array+'&buy=OK';
		
			GM_xmlhttpRequest({
			  method: "POST",
			  url: urlBuy,
			  data: data5,
			  synchronous:true,
			  headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			  },
			  onload: function(response) {
				JSON_array.shift();
				dhtmlx.message("Achat effectué ! ( "+JSON_array.length+" restant(s) )");
				dhtmlx.message("prochain achat dans 45s");
				setTimeout(function(){Achat_List(JSON_array);},45000);
			  }
			});
		} else {
			dhtmlx.message("Aucune offre... Reload dans "+Math.ceil(LongTime/1000)+"s !");
			setTimeout(function(){location.reload();},LongTime); //reload pour eviter les delais depassé
		}

}

function Boosteur(){
	var objectid=document.getElementById('List_Unit').options[document.getElementById('List_Unit').selectedIndex].getAttribute('rel');
	var URL = 'http://game.desert-operations.fr/'+World+'/handel.php?mode=1&object_id='+objectid+'&goods_partly=1&search_goods=Chercher';
	
	GM_xmlhttpRequest({
    method: "GET",
    url: URL,
    onload: function(xhr) {
		var My_DOM = parseAJAX_ResponseHTML(xhr);
		var form = My_DOM.getElementsByClassName('tradeBuyOffer');
		var tid_array = new Array();
		for (var i = 0 ; i<form.length-1 ; i++){
			var pseudoID = form[i].firstChild.childNodes[3].firstChild.getAttribute('rel');
			if (Liste_push.indexOf(pseudoID) != '-1'){
				var tid = form[i].firstChild.childNodes[2].getElementsByTagName('input')[0].value;
				if (IsSplittedCount(form[i].firstChild)==true){
					qte2 = My_DOM.getElementById('splitted_count-'+tid).max.replace(/[^0-9]+/gi,'');
				}else{
					qte2='';
				}
				var myJSON = new Object();
					myJSON.num_tid = tid;
					myJSON.qte= qte2;
				var myString = JSON.stringify(myJSON);
				tid_array.push(myString);
			}
		}
		dhtmlx.message(tid_array.length+ " offres à acheter");
		Achat_List(tid_array);
	}
	});
}

function getDelay(Heure1, Heure2){

	var T1 = Heure1.split(':');
	var T2 = Heure2.split(':');
	var Debut = new Date();
		Debut.setHours(T1[0]);
		Debut.setMinutes(T1[1]);
		Debut.setSeconds(0);
	var Fin =  new Date();
		Fin.setHours(T2[0]);
		Fin.setMinutes(T2[1]);
		Fin.setSeconds(0);
	var now = new Date();
		now.getHours();
		now.getMinutes();
		now.getSeconds();

	if (Fin<Debut){Fin.setDate(Fin.getDate()+1);}

	var delay = Fin-now;
	
	if(now>Debut && now<Fin){
		setTimeout(function(){location.reload();}, delay);
		return true;
	} else {
		return false;
	}
}

function Control_Weather(){
	var current_weather = document.getElementById('weatherpanelInfo').firstChild.innerHTML.replace(/<\/?[^<]+>/g,'').trim();
	if(diams==true && (current_weather!='Ensoleillé' || current_weather!='sans nuage')){
		var myPhpSessID = window.content.document.cookie.match(/PHPSESSID=[A-Za-z0-9]+/i);
		var data = myPhpSessID + 'mode=cash&creditweather=1';
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "Webservices/premium_cash.php",
		  data: data,
		  synchronous:true,
		  headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
		  onload: function(response) {
			dhtmlx.message("La météo a été changée !");
		  }
		});	
	}
}

function Disable_Display(){
	var elem = document.getElementsByClassName('TBD');
	for (var i = 0 ; i < elem.length ; i++){
		elem[i].disabled=true;
	}
}

function AddEventRadio(){
	
	function Do_actions(elemid){
		var Type_action = elemid.replace(/[^A-Z]/gi,'');
		var Num_action = elemid.replace(/[^0-9]/gi,''); // remplace tout sauf les chiffre
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
	
	document.getElementById('LS 0').onclick = function(){Do_actions(this.id);};
	document.getElementById('LS 1').onclick = function(){Do_actions(this.id);};
	document.getElementById('LS 2').onclick = function(){Do_actions(this.id);};
	document.getElementById('SS 0').onclick = function(){Do_actions(this.id);};
	document.getElementById('SS 1').onclick = function(){Do_actions(this.id);};
	document.getElementById('SS 2').onclick = function(){Do_actions(this.id);};
	
	document.getElementById('LS 0').title = GM_getValue('Slot0', '');
	document.getElementById('LS 1').title = GM_getValue('Slot1', '');
	document.getElementById('LS 2').title = GM_getValue('Slot2', '');
	
}

Array.prototype.unset = function(val){
	var index = this.indexOf(val)
	if(index > -1){
		this.splice(index,1)
	}
}

function ClearCheckBox(){
	var Chkbox = document.getElementsByClassName('Checklist');
	
	while( Chkbox.length !=0){
		Chkbox[0].remove();
	}
}

function display(a){
	
	if (document.getElementById('Slot_memory')!=null){
		AddEventRadio();
	}
	ClearCheckBox();
	
	if (a == 1){ // boosteur
		document.getElementById('col3').innerHTML='';
		var Str1= document.createElement('div');
			Str1.innerHTML = '<input id="Start" type="button" value="Start" /></br>'
							+'<table id="Slot_memory">'
								+'<tr>'
									+'<td>Load :</td>'
									+'<td><input id="LS 0" type="button" value="Slot 0" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
									+'<td><input id="LS 1" type="button" value="Slot 1" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
									+'<td><input id="LS 2" type="button" value="Slot 2" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
								+'</tr>'
								+'<tr>'
									+'<td>Save :</td>'
									+'<td><input id="SS 0" type="button" value="Slot 0" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
									+'<td><input id="SS 1" type="button" value="Slot 1" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
									+'<td><input id="SS 2" type="button" value="Slot 2" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
								+'</tr>'
							+'</table>'
							+'<label for="Nom_du_joueur">Liste de push :</label><input style="width: 150px; margin: 0px 0px 0px 9px" id="Nom_du_joueur" type="text" class="TBD"/></br>'
							+'<label for="List_Unit">Nom de l\'unité :</label>'
							+'<select id="List_Unit" style="width: 162px;" class="TBD">'
								+'<option value="Leopard 3" rel="w_45">Leopard 3</option>'
								+'<option value="T-95 Black Eagle" rel="w_40">T-95 Black Eagle</option>'
								+'<option value="F22 Raptor" rel="w_17">F22 Raptor</option>'
								+'<option value="J16 &quot;Red Eagle&quot;" rel="w_50">J16 "Red Eagle"</option>'
								+'<option value="Rockwell B1" rel="w_19">Rockwell B1</option>'
								+'<option value="Northrop B2 Spirit" rel="w_20">Northrop B2 Spirit</option>'
								+'<option value="Embraer EMB 314 Super Tucano" rel="w_52">Embraer EMB 314 Super Tucano</option>'
								+'<option value="Grey Ghost" rel="w_46">Grey Ghost</option>'
								+'<option value="B-52 Stratofortress" rel="w_41">B-52 Stratofortress</option>'
								+'<option value="Frégate de 2nd rang" rel="w_22">Frégate de 2nd rang</option>'
								+'<option value="Houbei Class Missile Boat" rel="w_51">Houbei Class Missile Boat</option>'
								+'<option value="Sous-marin d\'attaque" rel="w_26">Sous-marin d\'attaque</option>'
								+'<option value="Sous-marin lanceur d\'engins" rel="w_27">Sous-marin lanceur d\'engins</option>'
								+'<option value="Porte-avions nucléaire" rel="w_25">Porte-avions nucléaire</option>'
								+'<option value="Porte-avions Charles de Gaulle" rel="w_47">Porte-avions Charles de Gaulle</option>'
								+'<option value="Frégate de 1er rang" rel="w_42">Frégate de 1er rang</option>'
								+'<option value="Croiseur IOWA Classe B" rel="w_48">Croiseur IOWA Classe B</option>'
							+'</select></br>';
		
			document.getElementById('col3').appendChild(Str1);
			
		if(Start==false){
			document.getElementById('Start').value = "Start";
			document.getElementById('Start').style="color:green"
		}else if(Start==true){
			document.getElementById('Start').value = "Stop";
			document.getElementById('Start').style="color:yellow"
		}
		
		if(Slot_visible==false){
		document.getElementById('Slot_memory').style.display ='none'; 
		} else {
		document.getElementById('Slot_memory').style.display ='block';
		AddEventRadio();
		}
		
		document.getElementById('Start').onclick = function(){
			if(Start==true){
				GM_setValue('Start', false);
				location.reload() ; 
			} else {
				GM_setValue('Start', true);
				GM_setValue('Timer2', false);
				location.reload() ; 
			}
		};
		
		document.getElementById('Nom_du_joueur').value=Joueur;
		
		document.getElementById('Nom_du_joueur').onchange = function(){GM_setValue('Joueur', this.value);}
		
		document.getElementById('List_Unit').onchange=function(){
			GM_setValue('Unite', this.options[this.selectedIndex].index);
		}
		
		document.getElementById('List_Unit').options[Unite].selected="selected";
		
	}	
	if (a == 2){ // boosté
		document.getElementById('col3').innerHTML='';
		var Str2= document.createElement('div');
			Str2.innerHTML = '<input id="Start" type="button" value="Start" />'
							+'<input id="Type" type="button" value="1 fois" class="TBD"/>'
							+'<select id="En_cours" class="TBD">'
								+'<option value="0">Acheter</option>'
								+'<option value="2">Attente unités</option>'
								+'<option value="3">Vendre</option>'
								+'<option value="5">Attente $</option>'
							+'</select>'
							+'<input id="Reprendre" type="button" value="Reprendre" class="TBD"/></br>'
							+'<table id="Slot_memory">'
								+'<tr>'
									+'<td>Load :</td>'
									+'<td><input id="LS 0" type="button" value="Slot 0" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
									+'<td><input id="LS 1" type="button" value="Slot 1" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
									+'<td><input id="LS 2" type="button" value="Slot 2" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
								+'</tr>'
								+'<tr>'
									+'<td>Save :</td>'
									+'<td><input id="SS 0" type="button" value="Slot 0" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
									+'<td><input id="SS 1" type="button" value="Slot 1" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
									+'<td><input id="SS 2" type="button" value="Slot 2" style="height: 20px; font-size: 10px; padding-top: 0px;" class="TBD"/></td>'
								+'</tr>'
							+'</table>'
							+'<label for="percent_HB">Pourcentage de hors-banque utilisé :</label><input size="4" id="percent_HB" type="text" title="max : 99.99%" class="TBD" /><label for="percent_HB"> %</label></br>'
							+'<label for="interne">Vente en interne ? :</label><input id="interne" type="checkbox" style="margin: 0px 0px 5px 5px" class="TBD"/></br>'
							+'<label for="tronquage">Tronquer la Qté ? :</label><input id="tronquage" type="checkbox" style="margin: 0px 0px 5px 12px" class="TBD"/></br>'
							+'<label for="TID">Trade ID :</label><input style="width: 148px; margin: 0px 0px 0px 34px" id="TID" type="text" class="TBD"/></br>'
							+'<div id="div_push">'
							+'<label for="Nom_du_joueur">Liste de push :</label><input style="width: 148px; margin: 0px 0px 0px 9px" id="Nom_du_joueur" type="text" class="TBD"/></br>'
							+'</div>'
							+'<label for="List_Unit">Nom de l\'unité :</label>'
							+'<select id="List_Unit" style="width: 160px;" class="TBD">'
								+'<option value="Leopard 3" rel="w_45">Leopard 3</option>'
								+'<option value="T-95 Black Eagle" rel="w_40">T-95 Black Eagle</option>'
								+'<option value="F22 Raptor" rel="w_17">F22 Raptor</option>'
								+'<option value="J16 &quot;Red Eagle&quot;" rel="w_50">J16 "Red Eagle"</option>'
								+'<option value="Rockwell B1" rel="w_19">Rockwell B1</option>'
								+'<option value="Northrop B2 Spirit" rel="w_20">Northrop B2 Spirit</option>'
								+'<option value="Embraer EMB 314 Super Tucano" rel="w_52">Embraer EMB 314 Super Tucano</option>'
								+'<option value="Grey Ghost" rel="w_46">Grey Ghost</option>'
								+'<option value="B-52 Stratofortress" rel="w_41">B-52 Stratofortress</option>'
								+'<option value="Frégate de 2nd rang" rel="w_22">Frégate de 2nd rang</option>'
								+'<option value="Houbei Class Missile Boat" rel="w_51">Houbei Class Missile Boat</option>'
								+'<option value="Sous-marin d\'attaque" rel="w_26">Sous-marin d\'attaque</option>'
								+'<option value="Sous-marin lanceur d\'engins" rel="w_27">Sous-marin lanceur d\'engins</option>'
								+'<option value="Porte-avions nucléaire" rel="w_25">Porte-avions nucléaire</option>'
								+'<option value="Porte-avions Charles de Gaulle" rel="w_47">Porte-avions Charles de Gaulle</option>'
								+'<option value="Frégate de 1er rang" rel="w_42">Frégate de 1er rang</option>'
								+'<option value="Croiseur IOWA Classe B" rel="w_48">Croiseur IOWA Classe B</option>'
							+'</select></br>';
		
			document.getElementById('col3').appendChild(Str2);
		
		if(Push_same_time==false){
			document.getElementById('div_push').style.display ='none'; 
		} else {
			document.getElementById('div_push').style.display ='block';
		}
		
		if(Start==false){
			document.getElementById('Start').value = "Start";
			document.getElementById('Start').style="color:green"
		}else if(Start==true){
			document.getElementById('Start').value = "Stop";
			document.getElementById('Start').style="color:yellow"
		}
		
		if(Type==false){
			document.getElementById('Type').value = "1 fois";
		}else if(Type==true){
			document.getElementById('Type').value = "En boucle";
		}
		
		if(vente_interne==true){
			document.getElementById('interne').checked=true;
		}
		
		if(tronque_val==true){
			document.getElementById('tronquage').checked=true;
		}
		
		if(Slot_visible==false){
		document.getElementById('Slot_memory').style.display ='none'; 
		} else {
		document.getElementById('Slot_memory').style.display ='block';
		AddEventRadio();
		}
		
		document.getElementById('Start').onclick = function(){
			if(Start==true){
				GM_setValue('Start', false);
				location.reload() ; 
			} else {
				GM_setValue('Start', true);
				GM_setValue('Etat', 0);
				location.reload() ; 
			}
		};
		
		document.getElementById('Type').onclick = function(){
			if(Type==true){
				GM_setValue('Type', false);
				location.reload() ; 
			} else {
				GM_setValue('Type', true);
				location.reload() ; 
			}
		};
		
		document.getElementById('Reprendre').onclick = function(){
			var etat_temp = document.getElementById('En_cours').options[document.getElementById('En_cours').selectedIndex].value;
			GM_setValue('Start', true);
			GM_setValue('Etat', etat_temp);
			location.reload() ; 
		};
		
		document.getElementById('percent_HB').value = pourcentage_pris;

		document.getElementById('percent_HB').onchange=function(){GM_setValue('percent_HB', this.value);};
		
		document.getElementById('interne').onclick=function(){
			if (vente_interne==true){
				GM_setValue('interne', false);
				document.getElementById('interne').checked=false;
			} else {
				GM_setValue('interne', true);
				document.getElementById('interne').checked=true;
			}
		}
		
		document.getElementById('tronquage').onclick=function(){
			if (tronque_val==true){
				GM_setValue('tronquage', false);
				this.checked=false;
			} else {
				GM_setValue('tronquage', true);
				this.checked=true;
			}
		}
		
		document.getElementById('TID').value=TradeID;
		
		document.getElementById('TID').onchange = function(){GM_setValue('tid', this.value);};

		document.getElementById('List_Unit').onchange=function(){GM_setValue('Unite', this.options[this.selectedIndex].index);};
		
		document.getElementById('List_Unit').options[Unite].selected="selected";
		
		document.getElementById('Nom_du_joueur').value=Joueur;
		
		document.getElementById('Nom_du_joueur').onchange = function(){GM_setValue('Joueur', this.value);}
		
	}
	if (a == 3){ // ressources
		document.getElementById('col3').innerHTML='';
		var Str3= document.createElement('div');
			Str3.innerHTML = '<input value="Start" id="Start" type="button" />'
							 +'<select id="Liste_ress" class="TBD">'
								 +'<option value="r_3">Pétrole</option>'
								 +'<option value="r_4">Munition</option>'
								 +'<option value="r_2">Or</option>'
							 +'</select></br>'
							+'<label for="Txt_mini">Qte Mini :</label><input id="Txt_mini" type="text" style="margin: 0px 0px 0px 5px" class="TBD"/><label id="My_convert1" for="Txt_mini"></label></br>'
							+'<label for="Txt_maxi">Qte Maxi :</label><input id="Txt_maxi" type="text" class="TBD" /><label id="My_convert2" for="Txt_maxi"></label></br>';
		
		document.getElementById('col3').appendChild(Str3);
			
		if(Start==false){
			document.getElementById('Start').value = "Start";
			document.getElementById('Start').style="color:green"
		}else if(Start==true){
			document.getElementById('Start').value = "Stop";
			document.getElementById('Start').style="color:yellow"
		}
		
		document.getElementById('Start').onclick = function(){
			if(Start==true){
				GM_setValue('Start', false);
				window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=4'; 
			} else {
				GM_setValue('Start', true);
				GM_setValue('Timer', false);
				location.reload() ; 
			}
		};
		
		document.getElementById('Liste_ress').onchange=function(){
			GM_setValue('Ress', this.options[this.selectedIndex].index);
		}

		document.getElementById('Liste_ress').options[ressource].selected="selected";

		document.getElementById('Txt_mini').value=Val_mini;
		document.getElementById('My_convert1').innerHTML = ' ( '+Create_Aff(Val_mini.replace(/[^0-9]/gi,''),0)+ ' )';
		
		document.getElementById('Txt_mini').onkeyup = function(){
			this.value=lisibilite_nombre(this.value.replace(/[^0-9]/gi,''));
			GM_setValue('Val_mini', this.value);
			document.getElementById('My_convert1').innerHTML = ' ( '+Create_Aff(this.value.replace(/[^0-9]/gi,''),0)+ ' )';
		}	

		document.getElementById('Txt_maxi').value=Val_maxi;
		document.getElementById('My_convert2').innerHTML = ' ( '+Create_Aff(Val_maxi.replace(/[^0-9]/gi,''),0)+ ' )';
		
		document.getElementById('Txt_maxi').onkeyup = function(){
			this.value=lisibilite_nombre(this.value.replace(/[^0-9]/gi,''));
			GM_setValue('Val_maxi', this.value);
			document.getElementById('My_convert2').innerHTML = ' ( '+Create_Aff(this.value.replace(/[^0-9]/gi,''),0)+ ' )';
		}

		
	}
	if (a == 4){ // checklist
		
		document.getElementById('col3').innerHTML=' <input value="Start" id="Start" type="button" /><font color="red"><b>    Nouveau Mode !! </b></font></br>'
												+ 'Permet d\'acheter automatiquement une liste d\'offres. </br></br>'
												+ '<u>Instruction : </u></br>'
												+ '- Cocher les offres souhaitées (avec ou sans lot) </br>'
												+ '- Cliquer sur start et attendez (Ne plus changer d\'URL) </br></br>'
												+ 'NB : Fonctionne pour les recherches par ressources ou par joueur </br>'
												+ 'NB2 : Attention ! Le script achète tout le lot';
		
		var array_tid = new Array();
		var array_qte = new Array();
		var qte;
		var list_tid = document.getElementsByName('tid');
		
		document.getElementById('Start').style="color:green";

		document.getElementById('Start').onclick = function(){
			if(this.value=='Start'){
				this.value='Stop';
				this.style="color:yellow";
				if (array_tid.length==0){
					dhtmlx.message("Aucune offre cochée.... Arrêt");
					this.value='Start';
					window.location.href=window.location.href; //actualisation pour stopper le script
				} else {
					dhtmlx.message("Achat des "+array_tid.length+" offres en cours ... Patientez");
					Achat_List(array_tid);
				}
			} else {
				this.value='Start';
				this.style="color:green";
				window.location.href=window.location.href; //actualisation pour stopper le script
			}
		};
		
		if(list_tid.length!=0 ){
			for( var i = 0; i<list_tid.length-1;i++){
				if (IsSplittedCount(list_tid[i].parentNode.parentNode)==true){
					qte2 = document.getElementById('splitted_count-'+list_tid[i].value).max.replace(/[^0-9]+/gi,'');
				}else{
					qte2='';
				}
				
				var myJSON = new Object();
					myJSON.num_tid = list_tid[i].value;
					myJSON.qte= qte2;
				var myString = JSON.stringify(myJSON);
				
				var ma_checkbox = document.createElement('input');
					ma_checkbox.type = 'checkbox';
					ma_checkbox.setAttribute('rel',myString);
					ma_checkbox.title = "Offre n° "+list_tid[i].value;
					ma_checkbox.className="Checklist";
					ma_checkbox.onclick=function(){
						if (this.checked==true){
							var numtid = this.getAttribute('rel');
							array_tid.push(numtid);
							dhtmlx.message("Offre ajoutée (total : "+array_tid.length+" )");
						} else {
							var numtid = this.getAttribute('rel');
							array_tid.unset(numtid);
							dhtmlx.message("Offre retirée (total : "+array_tid.length+" )");
						}
					};
					//ma_checkbox.style.cssText="text-align:center;";
				list_tid[i].parentNode.parentNode.lastChild.appendChild(ma_checkbox);
			}
		}else{
			dhtmlx.message("Aucune offre à acheter ici");
		}
	}
}

function Add_affichage(){

	var My_Div = document.createElement('div');
		My_Div.id='Content';
		My_Div.innerHTML = '<table>'
								+'<tr>'
									+'<td id="col1" style="vertical-align:text-top; width:220px">'
										+'<div>'
											+'<input type="radio" value="boosteur" name="modeBoost" class="TBD">Vous êtes boosteur</input></br>'
											+'<input type="radio" value="booster" name="modeBoost" class="TBD">Vous êtes boosté</input></br>'
											+'<input type="radio" value="ressources" name="modeBoost" class="TBD">Vous voulez des ressources</input></br>'
											+'<input type="radio" value="checklist" name="modeBoost" class="TBD">Acheter une liste d\'offre</input>'
										+'</div>'
										+'<div>'
											+'<label for="diamanter">Changer la météo en diams :</label><input id="diamanter" type="checkbox" style="margin: 3px 0px 5px 13px" class="TBD"/>'
										+'</div>'
										+'<div>'
											+'<label for="Aff_slot">Afficher les slots mémoire :</label><input id="Aff_slot" type="checkbox" style="margin: 0px 0px 5px 23px" class="TBD"/>'
										+'</div>'
										+'<div>'
											+'<label for="Aff_push">Pusher lors des attentes :</label><input id="Aff_push" type="checkbox" style="margin: 0px 0px 5px 29px" class="TBD"/>'
										+'</div>'
										+'<div>'
											+'<label for="redirection">Rediriger lors des arrêts :</label><input id="redirection" type="checkbox" style="margin: 0px 0px 5px 35px" class="TBD"/>'
										+'</div>'
										+'<div>'
											+'<label for="heure_debut">Arrêt de : </label><input size="4" id="heure_debut" type="text" class="TBD"/>'
											+'<label for="heure_fin"> à </label><input size="4" id="heure_fin" type="text" class="TBD"/>'
										+'</div>'
									+'</td>'
									+'<td id="col3" style="vertical-align:text-top; ">'
									+'</td>'
								+'</tr>';
							+'</table>'
	document.getElementsByClassName('blockFoot')[0].appendChild(My_Div);

	if (Slot_visible==true){document.getElementById('Aff_slot').checked=true;}
	
	document.getElementById('Aff_slot').onclick=function(){
			if (Slot_visible==true){
				GM_setValue('Slot_V', false);
				this.checked=false;
				Slot_visible = false;
				document.getElementById('Slot_memory').style.display ='none'; 
			} else {
				GM_setValue('Slot_V', true);
				this.checked=true;
				Slot_visible = true;
				document.getElementById('Slot_memory').style.display ='block'; 
			}
	}
	
	if (Push_same_time==true){document.getElementById('Aff_push').checked=true;}
	
	document.getElementById('Aff_push').onclick=function(){
			if (Push_same_time==true){
				GM_setValue('Push_too', false);
				this.checked=false;
				Push_same_time = false;
				document.getElementById('div_push').style.display ='none'; 
			} else {
				GM_setValue('Push_too', true);
				this.checked=true;
				Push_same_time = true;
				document.getElementById('div_push').style.display ='block'; 
			}
	}
	
	if (redirect==true){document.getElementById('redirection').checked=true;}
	
	document.getElementById('redirection').onclick=function(){
			if (redirect==true){
				GM_setValue('rediriger', false);
				this.checked=false;
				redirect = false;
				//alert('Pas encore disponible');
			} else {
				GM_setValue('rediriger', true);
				this.checked=true;
				redirect = true;
				//alert('Pas encore disponible');
			}
	}
	
	if (diams==true){document.getElementById('diamanter').checked=true;}
	
	document.getElementById('diamanter').onclick=function(){
			if (diams==true){
				GM_setValue('diamants', false);
				this.checked=false;
				diams = false;
				alert('Cette fonctionnalité n\'est pas encore disponible');
			} else {
				GM_setValue('diamants', true);
				this.checked=true;
				diams = true;
				alert('Cette fonctionnalité n\'est pas encore disponible');
			}
	}
	
	document.getElementById('heure_debut').value = H1;
	document.getElementById('heure_fin').value = H2;
	document.getElementById('heure_debut').onchange = function(){GM_setValue('time_min',this.value);};
	document.getElementById('heure_fin').onchange = function(){GM_setValue('time_max',this.value);};

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
		}else if (radios[3].value==Mode){
			radios[3].checked = true;
			display(4);
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
		radios[3].onclick=function(){
			GM_setValue('Mode', 'checklist');
			display(4);
		};
}

function IsSplittedCount(elem){
	if (elem.getElementsByClassName('tradeSearchSplittedCount').length != 0){
		return true;
	} else {
		return false;
	}
}

function Buy(produit, min, max){
	
	var URL ='http://game.desert-operations.fr/'+World+'/handel.php?mode=1&object_id='+produit+'&goods_partly=1&search_goods=Chercher';
	if(URL!=window.location.href){ //sin on est pas sur la page du joueur
		window.location.href = URL; // on redirige
	}
	if(URL==window.location.href){
		var min = min.replace(/[^0-9]/gi,'');
		var max = max.replace(/[^0-9]/gi,'');
		var formulaire = document.getElementsByClassName('tradeBuyOffer'); // on recup tous les formulaire
		var flag_find = false;
		var tab_result = new Array();
		
		for(var i = 0; i<formulaire.length-1;i++){
				
				var Qte=formulaire[i].firstChild.firstChild.firstChild.title.replace(/[^0-9]/gi,'');
				var type = IsSplittedCount(formulaire[i]);
				var tid = document.getElementsByName('tid')[i].value;
				var pseudo = formulaire[i].firstChild.childNodes[3].firstChild.textContent;
				
					if(n(Qte).gte(min) && n(Qte).lte(max) && type==false && flag_find==false){ // si on est dans les bonnes qté et pas en lot
						tab_result.push(tid);
						tab_result.push('');
						tab_result.push(Qte);
						tab_result.push(pseudo);
						flag_find=true;
					}
					
					if(n(Qte).gte(min) && type == true && flag_find==false){ // si supérieur au min et en lot
						if(n(max).gte(Qte)){
								var temp2 = Qte;
							}else{ 
								var temp2 = max;
							}
						tab_result.push(tid);
						tab_result.push(temp2);
						tab_result.push(temp2);
						tab_result.push(pseudo);
						flag_find=true;
					}
		}
		
		if (flag_find == true){
			var myPhpSessID = window.content.document.cookie.match(/PHPSESSID=[A-Za-z0-9]+/i);
			var urlBuy = "http://game.desert-operations.fr/"+World+"/handel.php";
			var data5   = myPhpSessID + '&tid='+tab_result[0]+'&splitted_count='+tab_result[1]+'&buy=OK';
				GM_xmlhttpRequest({
				  method: "POST",
				  url: urlBuy,
				  data: data5,
				  synchronous:true,
				  headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				  },
				  onload: function(response) {
					dhtmlx.message("Achat effectué à "+tab_result[3]+" !");
					var restant = n(max).minus(tab_result[2]); //on retire la qté HT a ce que l'on veut en tout
					var val_temp = lisibilite_nombre(restant);
					GM_setValue('Val_maxi', val_temp); // on la save pour le prochain achat
					GM_setValue('Timer' , false);
					if (n(max).lte(min)){GM_setValue('Start', false);} // si le max vaut le min ou moins on stop le plugin
					location.reload();
				  }
				});
		} else {
			setTimeout(function(){location.reload();}, LongTime);
		}
	}
}

function EvaluateMoney(){
	GM_xmlhttpRequest({
    method: "GET",
    url: "Webservices/resourcebar.php?json=true",
    onload: function(xhr) {
		var data = xhr.responseText;
		var ress = JSON.parse(data);
		var money = ress[4].amount;
		var objectid=document.getElementById('List_Unit').options[document.getElementById('List_Unit').selectedIndex].getAttribute('rel');
		GM_setValue('Money', money);
		GM_setValue('Etat', 1);
		window.location.href = 'http://game.desert-operations.fr/'+World+'/handel.php?mode=1&object_id='+objectid+'&goods_partly=1&search_goods=Chercher';
	}
	});
}

function AcheterOffre(tid){
	var form = document.getElementsByClassName('tradeBuyOffer');
	var find = false;
	for (var i = 0 ; i < form.length ; i++){
		if(document.getElementsByName('tid')[i].value==tid){
			find = true;
			var Qte_max = form[i].firstChild.childNodes[0].firstChild.title.replace(/[^0-9]/gi,'');
			var Px_max = form[i].firstChild.childNodes[1].firstChild.firstChild.title.replace(/[^0-9]/gi,'');
			var PercentFloat = parseFloat(document.getElementById('percent_HB').value);
			var PercentInt = Math.round(PercentFloat*100);
			var Qte_tot = n(0).plus(hors_banque).multiply(Qte_max).multiply(PercentInt).divide(Px_max).divide(10000);
			if(tronque_val==true){
				var Qte_achetable = TronquerBigInt(''+Qte_tot);
			} else {
				var Qte_achetable = Qte_tot;
			}
			GM_setValue('Qte_prise', ''+Qte_achetable);
			var myPhpSessID = window.content.document.cookie.match(/PHPSESSID=[A-Za-z0-9]+/i);
			var urlBuy = "http://game.desert-operations.fr/"+World+"/handel.php";
			var data5   = myPhpSessID + '&tid='+tid+'&splitted_count='+Qte_achetable+'&buy=OK';
			GM_xmlhttpRequest({
				  method: "POST",
				  url: urlBuy,
				  data: data5,
				  synchronous:true,
				  headers: {"Content-Type": "application/x-www-form-urlencoded"},
				  onload: function(response) {
					GM_setValue('Etat', 2);
					dhtmlx.message("Achat effectué!");
					window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=4';
				  }
			});
		}
	}
	if (find == false){
		dhtmlx.message("Cette offre n'existe plus...");
		GM_setValue('Start', false);
		setTimeout(function(){window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=1'},5000);
	}
}

function WaitForUnit(){
	var en_cours = false;
	var URL ='http://game.desert-operations.fr/'+World+'/handel.php?mode=4';
	
	if(URL!=window.location.href){
		window.location.href = URL;
	}
	
	if(URL==window.location.href){
		var ligne = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		for (var i=1; i<ligne.length; i++){
			var tree = ligne[i].childNodes;
			var noeud = tree[0].cloneNode(true);
				noeud.firstChild.remove();
			var ressource = noeud.textContent.trim();
			var Unit_voulue = document.getElementById('List_Unit').options[document.getElementById('List_Unit').selectedIndex].value;
			var Qte_Offer = ligne[i].firstChild.firstChild.title.replace(/[^0-9]+/gi,'');
				if(ressource==Unit_voulue && Qte_booster == Qte_Offer){ // mmee qte en preuve que c le bon lot
					ligne[i].style.cssText += 'font-weight:bold;  border:1px solid white;';
					en_cours = true;
					var text_date = tree[4].firstChild.innerHTML;
					var end_time = new Date();
						end_time.setDate(text_date.substr(0,2));
						end_time.setMonth(text_date.substr(3,2));
						end_time.setHours(text_date.substr(9,2));
						end_time.setMinutes(text_date.substr(12,2));
					var now = new Date();	
						now.getDate();
						now.setMonth(+now.getMonth()+1);
						now.getHours();
						now.getMinutes();
					var delay = end_time-now;		
					setTimeout(function(){location.reload();}, delay);
				}
		}
		if (en_cours == false){
			GM_setValue('Etat', 3);	
			setTimeout(function(){window.location.href = 'http://game.desert-operations.fr/'+World+'/handel.php?mode=2';}, ShortTime);
		}
	}
}

function SellAll(){
	var liste_unite = document.getElementById('weaponsGroup').getElementsByTagName('option');
		var objectid=document.getElementById('List_Unit').options[document.getElementById('List_Unit').selectedIndex].getAttribute('rel');
		var myPhpSessID = window.content.document.cookie.match(/PHPSESSID=[A-Za-z0-9]+/i);
		for (var i = 0 ; i < liste_unite.length ; i++){
			if(liste_unite[i].value==objectid){
				var data = '?mode=2&object_id='+objectid;
				if(vente_interne==true){
					data +='&tradeType=allianceOnly';
				} else {
					data +='&tradeType=public';
				}
				var Rel = liste_unite[i].getAttribute('rel');
				var tableau = JSON.parse(Rel);
				var taux_actuel = document.getElementsByClassName('block-head-information')[0].innerHTML.replace(/[^0-9]/gi,'');
							
				var Maxi = tableau.sMaxAmount; // en num
				var PU = tableau.iPrice; // en num 
				var Taux = taux_actuel; // en long 8910 pour 89.10%
				var total = n(Maxi).multiply(PU).multiply(Taux).divide(10000);
											
				data+='&ally_price_count='+lisibilite_nombre(total)+'&price_count='+lisibilite_nombre(total)+'&object_count='+lisibilite_nombre(Maxi);
				var urlSell = "http://game.desert-operations.fr/"+World+"/handel.php";
				
				GM_xmlhttpRequest({
				  method: "GET",
				  url: urlSell+data,
				  headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Cookie":myPhpSessID
				  },
				  onload: function(response) {
					GM_setValue('Etat', 5);
					dhtmlx.message("Offre posée!");
					window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=3'
				  }
				});
			}
		}
}

function WaitForMoney(){
	if(Type==false){
		GM_setValue('Start', false);
		window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=3'
	}
	if(Type==true){
		var en_cours = false;
		var URL ='http://game.desert-operations.fr/'+World+'/handel.php?mode=3';
		if(URL!=window.location.href){
			window.location.href = URL;
		}
		if(URL==window.location.href){
			var ligne = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			for (var i=1; i<ligne.length; i++){
				var tree = ligne[i].childNodes;
				var noeud = tree[0].cloneNode(true);
					noeud.firstChild.remove();
				var ressource = noeud.textContent.trim();
				var Unit_voulue = document.getElementById('List_Unit').options[document.getElementById('List_Unit').selectedIndex].value;
					if(ressource==Unit_voulue){
						en_cours = true;
						var text_date = tree[4].firstChild.innerHTML;
						if(text_date !='-'){
							var end_time = new Date();
								end_time.setDate(text_date.substr(0,2));
								end_time.setMonth(text_date.substr(3,2));
								end_time.setHours(text_date.substr(9,2));
								end_time.setMinutes(text_date.substr(12,2));
								//end_time.setSeconds(59);
							var now = new Date();	
								now.getDate();
								now.setMonth(+now.getMonth()+1);
								now.getHours();
								now.getMinutes();
								//now.setSeconds(1);
							var delay = end_time-now;
							setTimeout(function(){location.reload();}, delay);
						} else {
							setTimeout(function(){location.reload();}, LongTime);
						}
					}
			}
			if(en_cours == false){
				GM_setValue('Etat', 0);	
				setTimeout(function(){location.reload();}, ShortTime);
			}
		}
	}
}

var World = window.location.pathname.split('/')[1];
var Path = window.location.pathname.split('/')[2];
var Search = window.location.search;
var Etat = GM_getValue('Etat', 0); // etat du booster
var Joueur = GM_getValue('Joueur', 'ID1, ID2, ...');
var TradeID = GM_getValue('tid', 21040000);
var Mode = GM_getValue('Mode', 'boosteur');// boosteur ou boosté
var Liste_push = Joueur.replace(/[\s]+/g,'').split(',');
var Unite = GM_getValue('Unite', '0');
var Start = GM_getValue('Start', false);
var hors_banque = GM_getValue('Money','0');
var Type = GM_getValue('Type', false); 	// en boucle ou 1 fois
var Numero = GM_getValue('Numero', 0); 	// num du joueur à pusher
var ShortTime = Math.floor((Math.random()*2000)+3000);
var MidTime = Math.floor((Math.random()*10000)+30000); // entre 30s et 50s
var LongTime = Math.floor((Math.random()*90000)+120000);
var Val_maxi = GM_getValue('Val_maxi', '10.000.000.000.000.000.000');
var Val_mini = GM_getValue('Val_mini', '1.000.000.000.000.000.000');
var ressource = GM_getValue('Ress', '0');
var Timer = GM_getValue('Timer', false);
var Timer2 = GM_getValue('Timer2', false);
var pourcentage_pris = GM_getValue('percent_HB', 99.90);
var vente_interne = GM_getValue('interne', true);
var diams = GM_getValue('diamants', false);
var H1 = GM_getValue('time_min','02:40');
var H2 = GM_getValue('time_max','07:00');
var Slot_visible = GM_getValue('Slot_V', true);
var Push_same_time = GM_getValue('Push_too', false);
var Qte_booster = GM_getValue('Qte_prise','0');
var tronque_val = GM_getValue('tronquage', true);
var redirect = GM_getValue('rediriger', false);
var urlRedir='https://sites.google.com/site/userconiscript/attente';

if (window.location.href == urlRedir){
	var suspens = getDelay(H1, H2);
	if (suspens==false){
		window.location.href = 'http://www.desert-operations.fr/game.html';
	}
}

if (Search != '?show=accessdenied' && window.location.href != urlRedir){
	
	var suspens = getDelay(H1, H2);

	if(Path=='handel.php'){
		Add_affichage();
	}
	
	if(Path=='handel.php' && suspens==true){
		document.getElementById('Start').value = "Suspendu";
		document.getElementById('Start').style="color:red";
	}
	
	if (redirect==true && suspens==true && Start==true){
		window.location.href = urlRedir;
	}
	
	if(suspens==false && Start == true && Path!='handel.php'){
		window.location.href='http://game.desert-operations.fr/'+World+'/handel.php';
	} 
	
	if(suspens==false && Start == true && Path=='handel.php'){
		Disable_Display();
		
		if (Mode == 'booster'){
			if (Etat == 0){
				EvaluateMoney();
			} else if (Etat == 1){
				AcheterOffre(TradeID);
			} else if (Etat == 2){
				WaitForUnit();
				if(Push_same_time==true){
					dhtmlx.message("Boosteur activé!");
					Boosteur();
				}
			} else if (Etat == 3){	
				SellAll();
			} else if (Etat == 5){
				WaitForMoney();
				if(Push_same_time==true){
					Boosteur();
					dhtmlx.message("Boosteur activé!");
				}
			}
		}
		
		if (Mode == 'boosteur'){
			Boosteur();
		}
		
		if (Mode == 'ressources'){
			if (Timer == true){
				var objectid = document.getElementById('Liste_ress').options[ressource].value;
				Buy(objectid, Val_mini, Val_maxi);
			} else {
				dhtmlx.message("Prochain achat dans "+Math.ceil(MidTime/1000)+" s");
				setTimeout(function(){
					GM_setValue('Timer', true);
					var objectid = document.getElementById('Liste_ress').options[ressource].value;
					window.location.href='http://game.desert-operations.fr/'+World+'/handel.php?mode=1&object_id='+objectid+'&goods_partly=1&search_goods=Chercher';
				} , MidTime);
			}
		}
		
	}
}
