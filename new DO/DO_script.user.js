// ==UserScript==
// @name           DO_script v.4
// @author         Coni
// @description    Un plugin pour les gouverner tous
// @include        http://game.desert-operations.fr/*
// @include 	   http://www.desert-operations.fr/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require		   http://dorercbdd.esy.es/script/new/bignumber.js
// @require 	   https://gist.github.com/raw/2625891/waitForKeyElements.js
// @require		   http://dorercbdd.esy.es/script/new/dhtmlxmessage.js
// @resource       My_CSSnotif  http://dorercbdd.esy.es/script/new/dhtmlxmessage_dhx_skyblue.css
// @resource       My_CSS  http://dorercbdd.esy.es/script/new/Style_DO.css
// @resource       My_CSS2   http://dorercbdd.esy.es/script/new/StyleBDD.css
// @downloadURL    http://dorercbdd.esy.es/script/new/DO_script.user.js
// @installURL 	   http://dorercbdd.esy.es/script/new/DO_script.user.js
// @updateURL	   http://dorercbdd.esy.es/script/new/DO_script.user.js
// @version        5.0
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue
// @grant          GM_setValue
// @grant    	   GM_deleteValue
// @grant		   GM_getResourceText
// @grant    	   GM_addStyle
// @grant  		   unsafeWindow
// ==/UserScript==

//this.$ = this.jQuery = jQuery.noConflict(true);

function TronquerBigInt(n){
	if(n.length % 3==0){
		var a = 4;
	}else{
		var a = n.length % 3 + 1;
	}
	var reg = new RegExp('[0-9]{'+a+'}','g');
	var res = reg.exec(n);
	var res2 = n.substring(a,n.length).replace(/[0-9]/g,'0');
	return res+res2;
}

function Convertir(nombre, mode){

var modeC =['', '',' k',' m',' M',' b',' B',' C',' kC',' mC',' MC',' bC',' BC',' C²',' kC²',' mC²',' MC²',' bC²',' BC²',' C<sup>3</sup>',' kC<sup>3</sup>',' mC<sup>3</sup>',' MC<sup>3</sup>',' bC<sup>3</sup>',' BC<sup>3</sup>',' C<sup>4</sup>',' kC<sup>4</sup>',' mC<sup>4</sup>',' MC<sup>4</sup>',' bC<sup>4</sup>',' BC<sup>4</sup>',' C<sup>5</sup>',' kC<sup>5</sup>',' mC<sup>5</sup>',' MC<sup>5</sup>',' bC<sup>5</sup>',' BC<sup>5</sup>'];
var classique = ['', '',' mil.',' Mil.',' Md.',' bl.',' Bd.',' tl.',' Td.',' ql.',' Qd.',' qil.',' Qid.',' sl.',' Sd.',' spl.',' Spd.',' ol.',' Od.',' nl.',' Nd.',' dl.',' Dd.',' vl.',' Vd.',' ttl.'];

	var nb = nombre.split(',');
	var Power = nb.length-1;
	if(nb.length>=3){
		if( mode == 0){
			nombre = (nb[0]+','+nb[1]);
			nombre+= modeC[Power+1];
		} else if (mode == 1){
			nombre = (nb[0]+'.'+nb[1]);
			nombre+=' * 10<sup>'+(Power-1)*3+'</sup>';
		}else if(mode == 2){
			nombre = (nb[0]+'.'+nb[1]);
			nombre+= classique[Power];
		}
	} else if (nb.length>=2){
		nombre=nb[0]+'.'+nb[1];
	} else{
		nombre=nb[0]
	}
	
	return nombre;
}

function Create_Aff(nb, mode_mis){
	var span = document.createElement('span');
		nb = (nb+'').replace(/[^0-9]/gi,'');
		span.className='tooltipExtention showTooltipDefault';
		span.title = lisibilite_nombre(nb);
		span.data = lisibilite_nombre(nb);
		span.innerHTML = Convertir(span.title , mode_mis);
	
	return span.outerHTML;
}

function lisibilite_nombre(nbr){
		var nombre = ''+nbr;
		var retour = '';
		var count=0;
		for(var i=nombre.length-1 ; i>=0 ; i--)
		{
			if(count!=0 && count % 3 == 0)
				retour = nombre[i]+','+retour ;
			else
				retour = nombre[i]+retour ;
			count++;
		}
		return retour;
}

var nmbDgt=7,valMax=Math.pow(10,7),valLim=43;// pour ajouter des doubles produits dans sqt
String.prototype.toDgt=function(){var s=this;while(s.length<nmbDgt) s='0'+s;return s}
 
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

function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
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

var Unites_Stats = new Array();
var Bat_Stats = new Array();

Unites_Stats['Satellite espion']= new Array(5000000,10000,45000,15000);
Unites_Stats['Drone']= new Array(1000000,6000,7500,2500);
Unites_Stats['Avion de reconnaissance']= new Array(1400000,20000,24000,8000);
Unites_Stats['Agent']= new Array(300000, 5000, 3000, 1000);


Unites_Stats['Or'] = new Array('1000');
Unites_Stats['Pétrole'] = new Array('500');
Unites_Stats['Munitions'] = new Array('7');
Unites_Stats['Kérosène'] = new Array('10003');
Unites_Stats['Diésel'] = new Array('5002');
Unites_Stats['Argent'] = new Array('1');

Unites_Stats['Fantassin'] = new Array(120,0, 'Kerosene', 	1, 	1,1,1, 'infanterie', false); 
Unites_Stats['Paras'] = new Array(400,0, 'Kerosene', 	8, 	5,7,6, 'infanterie', true); 
Unites_Stats['Antichar'] = new Array(1150,0, 'Kerosene', 	12, 	9,10,12, 'infanterie', true);
Unites_Stats['Commando de marine'] = new Array(2200,1, 'Diesel', 	18, 	17,20,15, 'infanterie', true);
Unites_Stats['AMX-13 DCA'] = new Array(18000,4, 'Diesel', 	50, 	20,60,120, 'terrestre', true);
Unites_Stats['ZSU-23-4 Schilka'] = new Array(18000,4, 'Diesel', 	50, 	20,60,120, 'terrestre', true);
Unites_Stats['AMX-30'] = new Array(35000,5, 'Diesel', 	55, 	30,180,160, 'terrestre', true);
Unites_Stats['Destructeur de mines'] = new Array(45000,			6, 'Diesel', 	60, 	35,250,250, 'terrestre', true);
Unites_Stats['Artillerie automotrice PzH2000'] = new Array(55000,6, 'Diesel', 	60, 	35,350,325, 'terrestre', true);
Unites_Stats['Obusier 2S19 Msta-S'] = new Array(55000,			6, 'Diesel', 	60, 	35,350,325, 'terrestre', true);
Unites_Stats['Lance-missile mobile'] = new Array(65000,8, 'Diesel', 80, 40,600,200, 'terrestre', true);
Unites_Stats['Lance-roquettes multiple BM-30 / 9A52'] = new Array(65000,8, 'Diesel', 80, 40,600,200, 'terrestre', true);
Unites_Stats['M1A2 Abrams'] = new Array(70000,		8, 'Diesel', 	80, 	55,750,600, 'terrestre', true);
Unites_Stats['T-80'] = new Array(70000,		8, 'Diesel', 	80, 	55,750,600, 'terrestre', true);
Unites_Stats['MBT 3000'] = new Array(65000,		7, 'Diesel', 80, 50,800,600, 'terrestre', true);
Unites_Stats['T-90'] = new Array(85000,			10, 'Diesel', 	85, 	60,800,950, 'terrestre', true);
Unites_Stats['Leclerc 2'] = new Array(100000,		12, 'Diesel', 	100, 	75,1250,700, 'terrestre', true);
Unites_Stats['Leopard 3'] = new Array(150000,		3, 'Diesel', 	100, 	40,1800,1800, 'terrestre', true);
Unites_Stats['T-95 Black Eagle'] = new Array(170000,		10, 'Diesel', 	100, 	100,1600,1900, 'terrestre', true);
Unites_Stats['AH-64 Apache'] = new Array(60000,			6, 'Kerosene', 	45, 	18,400,350, 'helicoptere', true);
Unites_Stats['Mil MI-28 Havoc'] = new Array(70000,			7, 'Kerosene', 	45, 	18,550,650, 'helicoptere', true);
Unites_Stats['Mil MI-24 Hind'] = new Array(75000,			8, 'Kerosene', 	50, 	22,600,400, 'helicoptere', true);
Unites_Stats['Eurocopter Tigre'] = new Array(80000,			8, 'Kerosene', 	50, 	30,500,700, 'helicoptere', true);
Unites_Stats['Kamov Ka-50'] = new Array(80000,			8, 'Kerosene', 	50, 	30,500,700, 'helicoptere', true);
Unites_Stats['Eurofighter Typhoon'] = new Array(85000,			11, 'Kerosene', 	60, 	35,400,800, 'avion', true);
Unites_Stats['Soukhoï Su-27'] = new Array(85000,			11, 'Kerosene', 	60, 	35,400,800, 'avion', true);
Unites_Stats['F22 Raptor'] = new Array(90000,			11, 'Kerosene', 	70, 	35,800,500, 'avion', true);
Unites_Stats['MiG 144'] = new Array(90000,			11, 'Kerosene', 	70, 	35,800,500, 'avion', true);
Unites_Stats['J16 \"Red Eagle\"'] = new Array(90000,		8, 'Kerosene', 60, 30,700,650, 'avion', true);
Unites_Stats['A-10 Thunderbolt'] = new Array(110000,		13, 'Kerosene', 	80, 	45,1100,950, 'avion', true);
Unites_Stats['Soukhoï Su-25'] = new Array(110000,		13, 'Kerosene', 	80, 	45,1100,950, 'avion', true);
Unites_Stats['F117A Nighthawk'] = new Array(120000,		14, 'Kerosene', 	100, 	50,1250,1400, 'avion', true);
Unites_Stats['Tupolev Tu-22'] = new Array(120000,		14, 'Kerosene', 	100, 	50,1250,1400, 'avion', true);
Unites_Stats['Rockwell B1'] = new Array(250000,		20, 'Kerosene', 	200, 	60,2200,1500, 'avion', true);
Unites_Stats['Northrop B2 Spirit'] = new Array(2000000,		30, 'Kerosene', 	255, 	80,4000,2000, 'avion', true);
Unites_Stats['Tupolev Tu-160'] = new Array(2000000,		30, 'Kerosene', 	255, 	80,4000,2000, 'avion', true);
Unites_Stats['Embraer EMB 314 Super Tucano'] = new Array(150000,		12, 'Kerosene', 70, 15,900,1700, 'avion', true);
Unites_Stats['Grey Ghost'] = new Array(85000,		4, 'Kerosene', 70, 20,1000,250, 'avion', true);
Unites_Stats['B-52 Stratofortress'] = new Array(4000000,		50, 'Kerosene', 	255, 	140,8000,4000, 'avion', true);
Unites_Stats['Tupolev Tu-95'] = new Array(4000000,		50, 'Kerosene', 	255, 	140,8000,4000, 'avion', true);
Unites_Stats['Corvette K130'] = new Array(350000,		12, 'Diesel', 	140, 	50,650,900, 'navale', true);
Unites_Stats['Corvette Classe Steregoutchi'] = new Array(350000, 12, 'Diesel', 	140, 	50,650,900, 'navale', true);
Unites_Stats['Destroyer Type 333'] = new Array(70000,			9, 'Diesel', 	100, 	30,200,50, 'navale', true);
Unites_Stats['Mouilleur de mines P-254'] = new Array(70000,			9, 'Diesel', 	100, 	30,200,50, 'navale', true);
Unites_Stats['Frégate de 2nd rang'] = new Array(500000,		18, 'Diesel', 	150, 	60,1250,900, 'navale', true);
Unites_Stats['Croiseur Kirov'] = new Array(500000,		18, 'Diesel', 	150, 	60,1250,900, 'navale', true);
Unites_Stats['Houbei Class Missile Boat'] = new Array(650000,		19, 'Diesel', 160, 60,1700,750, 'navale', true);
Unites_Stats["Sous-marin d\'attaque"] = new Array(800000,		20, 'Diesel', 	180, 	80,1600,1600, 'sous-marin', true);
Unites_Stats["Sous-marin B-585 St. Petersbourg"] = new Array(800000,		20, 'Diesel', 	180, 	80,1600,1600, 'sous-marin', true);
Unites_Stats["Sous-marin lanceur d\'engins"] = new Array(1000000,		20, 'Diesel', 	200, 	80,2500,1500, 'sous-marin', true);
Unites_Stats['Porte-avions nucléaire'] = new Array(1500000,		25, 'Kerosene', 	220, 	90,3500,2000, 'navale', true);
Unites_Stats['Porte Avion classe Kiev'] = new Array(1500000,		25, 'Kerosene', 	220, 	90,3500,2000, 'navale', true);
Unites_Stats['Porte-avions Charles de Gaulle'] = new Array(2000000,	40, 'Kerosene', 250, 90,4000,5000, 'navale', true);
Unites_Stats['SS Amiral Kouznetsov'] = new Array(2000000,	40, 'Kerosene', 250, 90,4000,5000, 'navale', true);
Unites_Stats['Frégate de 1er rang'] = new Array(1000000,		25, 'Diesel', 	200, 	120,2400,1800, 'navale', true);
Unites_Stats['SS Amiral Nakhmov'] = new Array(1000000,		25, 'Diesel', 	200, 	120,2400,1800, 'navale', true);
Unites_Stats['Croiseur IOWA Classe B'] = new Array(1100000,		15, 'Diesel', 200, 100,2800,2000, 'navale', true);

Unites_Stats['Champ de barbelés'] = new Array(20000,			0, 'Kerosene', 	0, 	0,0,100, 'defense', true); 
Unites_Stats['Bunker'] = new Array(40000,			0, 'Kerosene', 	0, 	0,0,200, 'defense', true); 
Unites_Stats['Champ de mines'] = new Array(250000,		0, 'Kerosene', 	0, 	0,0,1000, 'defense', true); 
Unites_Stats['Mines sous-marines'] = new Array(100000,		0, 'Kerosene', 	0, 	0,0,300, 'defense', true); 
Unites_Stats['Batterie de DCA'] = new Array(100000,		0, 'Kerosene', 	0, 	0,0,400, 'defense', true); 
Unites_Stats['Batterie de Patriots'] = new Array(150000,		0, 'Kerosene', 	0, 	0,0,600, 'defense', true); 
Unites_Stats['Grizzly 17 Sol-Air'] = new Array(150000,		0, 'Kerosene', 	0, 	0,0,600, 'defense', true); 
Unites_Stats['Batterie côtière'] = new Array(200000,		0, 'Kerosene', 	0, 	0,0,900, 'defense', true); 

Bat_Stats['Habitations'] = 225;
Bat_Stats['Zones commerciales'] = 310;
Bat_Stats['Usines'] = 1000;
Bat_Stats['Mines'] = 80;
Bat_Stats['Raffineries'] = 125;
Bat_Stats['Usines de munitions'] = 300;

var cssTxt  = GM_getResourceText ("My_CSS");
GM_addStyle(cssTxt);

var cssTxt2  = GM_getResourceText ("My_CSSnotif");
GM_addStyle(cssTxt2);

var cssTxt3  = GM_getResourceText ("My_CSS2");
GM_addStyle(cssTxt3);

function parseAJAX_ResponseHTML(respObject){
	var parser      = new DOMParser();
	var responseDoc = parser.parseFromString(respObject.responseText, "text/html");
	return responseDoc;
}

function Labelize(){
	$(".adjNumInput").each(function(){
		$span = Create_Aff($(this).val(), type_conversion);
		$(this).parent().parent().append($span);
		$(this).keyup(function(e){
			e.preventDefault( );
			$(this).parent().parent().find('.tooltipExtention').remove();
			$span = Create_Aff($(this).val(), type_conversion);
			$(this).parent().parent().append($span);
		});	
	});
}

function DO_conversion(){
	$(".tooltipExtention").each(function(){
		$(this).html(Convertir($(this).attr("data"),type_conversion));
	});
}

function DO_change_link(){
	try {
		$('#menu_island_view').attr('href', 'militaer.php');
		$('#menu_island_view').attr('title', 'Armées');
		$('#menu_island_view').attr("target", "_blank");
	} catch(err) {alert(err.message);}
	try {
		$('#menu_world_map').attr('href','handel.php');
		$('#menu_world_map').attr('title','Commerce');
		$('#menu_world_map').attr("target", "_blank");
	} catch(err) {alert(err.message);}
}

function DO_commerce_link(){
	$(".ancUserDetail").each(function(){
		
		$url = "http://game.desert-operations.fr/"+World+"/handel.php?mode=1&username="+$(this).text()+"&username_partly=1&search_user=Chercher";
						
		$link = $('<a>',{
			href: $url,
			target:"_blank"
		}).appendTo($(this).parent());
		
		$image = $('<img>',{
			className: 'icon',
			src: "images/classic/icons/lorry.png"
		}).appendTo($link);		
		
		
	});
}

function DO_commerce_color(){
	$('.colorAlliancePrice').each(function(){
		$(this).parent().parent().css({"font-weight":"bold", "border":"1px solid", "color":"#AFA"});
		$(this).parent().parent().addClass('interne');
		$(this).removeAttr("class");
	});
	
	var tempA, tempB;
	
	$('.tradeEstimateTooltip').each(function(index){
		var heure = $(this).children(':eq(0)').text();
		var end_time = new Date();
			end_time.setDate(heure.substr(0,2));
			end_time.setMonth(heure.substr(3,2));
			end_time.setHours(heure.substr(9,2));
			end_time.setMinutes(heure.substr(12,2));
			end_time.setSeconds(0);
			end_time.setMilliseconds(0);
		
		if(index==0){
			tempA=end_time.valueOf();
		}
		if(end_time.valueOf()==tempA){
			$(this).children(':eq(0)').addClass('tempA');
		}
		if(end_time.valueOf()!=tempA){
			tempB=end_time.valueOf();
			$(this).children(':eq(0)').addClass('tempB');
		}
	});

	if (tempA<tempB){
		$('.tempA').each(function(){
			$(this).parent().parent().children(':last').children(":eq(0)").css({"border":"1px solid", "color":"yellow"});
		});
	} else {
		$('.tempB').each(function(){
			$(this).parent().parent().children(':last').children(":eq(0)").css({"border":"1px solid", "color":"yellow"});
		});
	}
}

function DO_commerce_lots(){
	$('.adjNumInput').each(function(){//tradeSearchSplittedCount
		$(this).val($(this).attr("max")); 
	});
}

function DO_vente_max(){
	$('<button/>', {
		text : 'Max',
		click : function(e){ 
			e.preventDefault( );
			var Rel = $('#tradeSaleResourceDropdown option:selected').attr('rel');
			var tableau = JSON.parse(Rel);
						
			var Maxi = tableau.sMaxAmount;
			var PU = parseInt(tableau.iPrice);
			var total = n(Maxi).multiply(PU).multiply(95).divide(100);
			
			$('#tradeOfferAmount').val(lisibilite_nombre(Maxi)); 
			$('#ally_price_count').val(lisibilite_nombre(total));
			$('#tradePublicPrice').val(lisibilite_nombre(total));
			$('#price_count').val(lisibilite_nombre(total));
			
			$('#tradeOfferAmount').parent().parent().find('.tooltipExtention').remove();
			$('#price_count').parent().find('.tooltipExtention').remove();
			$('#tradeOfferAmount').parent().parent().append(Create_Aff(Maxi, type_conversion));
			$('#price_count').parent().append(Create_Aff(total, type_conversion));
		}
	}).appendTo($("#tradeSaleResourceDropdown").parent());
		
	$('#tradeOfferAmount').keyup(function(e){
		e.preventDefault( );
		$('#tradeOfferAmount').parent().parent().find('.tooltipExtention').remove();
		$('#price_count').parent().find('.tooltipExtention').remove();
		$('#tradeOfferAmount').parent().parent().append(Create_Aff($('#tradeOfferAmount').val().replace(/[^0-9]/g,''), type_conversion));
		$('#price_count').parent().append(Create_Aff($('#price_count').val().replace(/[^0-9]/g,''), type_conversion));
	});
	
}

function DO_fiche(){

	var bat = new Array();
		bat['Usines'] = 1000; 
		bat['Usinedemunition'] = 300; 
		bat['Mines'] = 80;
		bat['Raffineries'] = 125;
		bat['Points'] = 1000;
		bat['ZC+hab'] = 310;
		bat['Points'] = 0;
		bat['Pertesmax'] = 1;
	
	var current_Pts =0;
	var QteZC = 0;
	var pts_restant = 0;
	
	$(".head:last").nextUntil(".userImage").each(function(){
		var texte = $(this).text().replace(/[0-9%,]/gi,'');
		var name = $(this).text().replace(/[^A-Za-z]/gi,'');
		var num = $(this).text().replace(/[^0-9%]/gi,'');
		if(name != 'Pertesmax' && name != 'Points'){
			var pts = n(num).multiply(bat[name]);
			current_Pts = n(current_Pts).plus(pts);
			$(this).html('<td>' + texte + '</td><td colspan="2">' + Create_Aff(num, type_conversion) + ' (soit ' + Create_Aff(pts, type_conversion) + ')</td>');//' + Create_Aff(0, type_conversion) + '
		} else if (name == 'Points'){
			bat['Points'] = num;
			$(this).html('<td>'+texte +'</td><td colspan="2">'+ Create_Aff(num, type_conversion)+'</td>');
		}
	});

	pts_restant = n(bat['Points']).minus(current_Pts);
	QteZC = n(bat['Points']).minus(current_Pts).divide(bat['ZC+hab']);

	$('<tr><td>ZC+Hab estimées</td><td colspan="2">'+ Create_Aff(QteZC, type_conversion) + ' (soit ' + Create_Aff(pts_restant+'', type_conversion) +')</td></tr>').insertBefore('.userImage');
	
}

function DO_RC_INFO(){
	$('#battleOverview').children().last().remove();
		
	var Argent_Unites_Attaquant=0;
	var Reste_Argent_Unites_Attaquant =0;
	var Perte_Argent_Unites_Attaquant = 0;
	var Unites_Attaquant_Debut = 0;
	var Unites_Attaquant_Fin = 0;
	var Unites_Attaquant_Perdu = 0;
	
	var Entretien_Att_av =0;
	var Entretien_Att_ap =0;
	
	var Perte_Munition_Attaquant = 0;
	var Perte_Diesel_Attaquant = 0;
	var Perte_Kerosene_Attaquant = 0;
	
	var Argent_Unites_Defenseur=0;
	var Reste_Argent_Unites_Defenseur =0;
	var Perte_Argent_Unites_Defenseur = 0;
	var Unites_Defenseur_Debut = 0;
	var Unites_Defenseur_Fin = 0;
	var Unites_Defenseur_Perdu = 0;
	
	var Entretien_Def_av =0;
	var Entretien_Def_ap =0;	
	
	$('.battleReport:eq(0) tr').each(function(index){
		if (index > 0) {
			var Unites_Attaquant_Nom = $(this).children('td:eq(0)').text();
			var Unites_Attaquant_Debut = $(this).children('td:eq(1)').children().attr("data").replace(/[^0-9]/g,'');
			var Unites_Attaquant_Fin  = $(this).children('td:eq(2)').children().attr("data").replace(/[^0-9]/g,'');
			var Unites_Attaquant_Perdu  = $(this).children('td:eq(3)').children().attr("data").replace(/[^0-9]/g,'');
						
			Argent_Unites_Attaquant = n(0).plus(Unites_Attaquant_Debut).multiply(Unites_Stats[Unites_Attaquant_Nom][0] ).plus( Argent_Unites_Attaquant );
			Reste_Argent_Unites_Attaquant = n(0).plus(Unites_Attaquant_Fin).multiply(Unites_Stats[Unites_Attaquant_Nom][0] ).plus( Reste_Argent_Unites_Attaquant );
			Perte_Argent_Unites_Attaquant = n(0).plus(Unites_Attaquant_Perdu).multiply(Unites_Stats[Unites_Attaquant_Nom][0] ).plus( Perte_Argent_Unites_Attaquant );
			Entretien_Att_av = n(0).plus( Unites_Attaquant_Debut).multiply(Unites_Stats[Unites_Attaquant_Nom][4]*6).plus( Entretien_Att_av );
			Entretien_Att_ap = n(0).plus( Unites_Attaquant_Fin).multiply(Unites_Stats[Unites_Attaquant_Nom][4]*6).plus( Entretien_Att_ap );
			Perte_Munition_Attaquant = n(0).plus( Unites_Attaquant_Debut ).multiply ( Unites_Stats[Unites_Attaquant_Nom][3] ).plus( Perte_Munition_Attaquant );
				
			if (Unites_Stats[Unites_Attaquant_Nom][2] == 'Diesel') {
				Perte_Diesel_Attaquant = n(0).plus( Unites_Attaquant_Debut ).multiply ( Unites_Stats[Unites_Attaquant_Nom][1] ).plus( Perte_Diesel_Attaquant );
			} else {
				Perte_Kerosene_Attaquant = n(0).plus( Unites_Attaquant_Debut ).multiply ( Unites_Stats[Unites_Attaquant_Nom][1] ).plus( Perte_Kerosene_Attaquant );
			}
		}
	});
	
	$('.battleReport:eq(1) tr').each(function(index){
		if (index > 0) {
			var Unites_Defenseur_Nom = $(this).children('td:eq(0)').text();
			var Unites_Defenseur_Debut = $(this).children('td:eq(1)').children().attr("data").replace(/[^0-9]/g,'');
			var Unites_Defenseur_Fin  = $(this).children('td:eq(2)').children().attr("data").replace(/[^0-9]/g,'');
			var Unites_Defenseur_Perdu  = $(this).children('td:eq(3)').children().attr("data").replace(/[^0-9]/g,'');
			
			Argent_Unites_Defenseur = n(0).plus(Unites_Defenseur_Debut).multiply(Unites_Stats[Unites_Defenseur_Nom][0] ).plus( Argent_Unites_Defenseur );
			Reste_Argent_Unites_Defenseur = n(0).plus(Unites_Defenseur_Fin).multiply(Unites_Stats[Unites_Defenseur_Nom][0] ).plus( Reste_Argent_Unites_Defenseur );
			Perte_Argent_Unites_Defenseur = n(0).plus(Unites_Defenseur_Perdu).multiply(Unites_Stats[Unites_Defenseur_Nom][0] ).plus( Perte_Argent_Unites_Defenseur );
			Entretien_Def_av = n(0).plus( Unites_Defenseur_Debut).multiply(Unites_Stats[Unites_Defenseur_Nom][4]*6).plus( Entretien_Def_av );
			Entretien_Def_ap = n(0).plus( Unites_Defenseur_Fin).multiply(Unites_Stats[Unites_Defenseur_Nom][4]*6).plus( Entretien_Def_ap );
		}
	});
	
	var Pts = 0;
	
	$('.battleReport:eq(2) tr').each(function(index){
		if(index > 0){
			var nom = $(this).children(':first').text();
			var perdu = $(this).children(':last').text().replace(/[^0-9]/g,'');
			Pts = n(perdu).multiply(Bat_Stats[nom]).plus(Pts);
			
			$(this).find('.right').each(function(){;
				$(this).html(Convertir($(this).text(),type_conversion));
			});
		}
	});	
	
	var Cout_muni = n(Perte_Munition_Attaquant).multiply(Unites_Stats['Munitions'][0]);
	var Cout_kero = n(Perte_Kerosene_Attaquant).multiply(Unites_Stats['Kérosène'][0]);
	var Cout_diesel = n(Perte_Diesel_Attaquant).multiply(Unites_Stats['Diésel'][0]);
	
	var Investissement_Att = n(Argent_Unites_Attaquant).plus(Cout_muni).plus(Cout_kero).plus(Cout_diesel);
	var Cout_Total_Att = n(Perte_Argent_Unites_Attaquant).plus(Cout_muni).plus(Cout_kero).plus(Cout_diesel);
	
	$content = '<tr>'
				+ '<th colspan="2" style="text-align:center">'
					+'Valeur des unités en $'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left; width:33%">' + Create_Aff(Argent_Unites_Attaquant, type_conversion) + '</td>'
				+ '<td style="text-align:right; width:33%">' + Create_Aff(Argent_Unites_Defenseur, type_conversion) + '</td>'
			+ '</tr>'
			+ '<tr>'
				+ '<th colspan="2" style="text-align:center">'
					+'Valeur des unités perdues'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left ; width:33%">' + Create_Aff(Perte_Argent_Unites_Attaquant, type_conversion) + '</td>' 
				+ '<td style="text-align:right ; width:33%">' + Create_Aff(Perte_Argent_Unites_Defenseur, type_conversion) + '</td>'
			+ '</tr>'
			+ '<tr>'
			+ '<th colspan="2" style="text-align:center">'
				+ 'Entretien avant attaque'
			+ '</th>'
		+ '</tr>'
		+ '<tr>'
			+ '<td style="text-align:left; width:33%">' + Create_Aff(Entretien_Att_av, type_conversion)+'/h' + '</td>'
			+ '<td style="text-align:right; width:33%">' + Create_Aff(Entretien_Def_av, type_conversion)+'/h' + '</td>'
		+ '</tr>'
		+ '<tr>'
			+ '<th colspan="2" style="text-align:center">'
				+ 'Entretien post-attaque'
			+ '</th>'
		+'</tr>'
		+ '<tr>'
			+ '<td style="text-align:left; width:33%">' + Create_Aff(Entretien_Att_ap, type_conversion)+'/h' + '</td>'
			+ '<td style="text-align:right; width:33%">' + Create_Aff(Entretien_Def_ap, type_conversion)+'/h' + '</td>'
		+ '</tr>'
			+ '<tr>'
				+ '<th colspan="2" style="text-align:center">'
					+'Ressources'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left; width:33%">' 
					+'Munitions : '
					+ Create_Aff(Perte_Munition_Attaquant, type_conversion)
					+' ( soit '
					+ Create_Aff(Cout_muni, type_conversion)
					+' )'
				+ '</td>'
				+ '<td style="text-align:right; width:33%"></td>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left; width:33%">'
					+'Diesel : '
					+ Create_Aff(Perte_Diesel_Attaquant, type_conversion)
					+' ( soit '
					+ Create_Aff(Cout_diesel, type_conversion)
					+' )'
				+ '</td>'
				+ '<td style="text-align:right; width:33%"></td>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left; width:33%">'
					+'Kérosène : '
					+ Create_Aff(Perte_Kerosene_Attaquant, type_conversion)
					+' ( soit '
					+ Create_Aff(Cout_kero, type_conversion)
					+' )'
				+ '</td>'
				+ '<td style="text-align:right; width:33%"></td>'
			+ '</tr>'
			+ '<tr>'
				+ '<th colspan="2" style="text-align:center">'
					+ 'Investissement Total:'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left; width:33%">' + Create_Aff(Investissement_Att, type_conversion) + '</td>'
				+ '<td style="text-align:right; width:33%">' + Create_Aff(Argent_Unites_Defenseur, type_conversion) + '</td>'
			+ '</tr>'
			+ '<tr>'
				+ '<th colspan="2" style="text-align:center">'
					+ 'Depenses Totales:'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td style="text-align:left; width:33%">' + Create_Aff(Cout_Total_Att, type_conversion) + '</td>'
				+ '<td style="text-align:right; width:33%">' + Create_Aff(Perte_Argent_Unites_Defenseur, type_conversion) + '</td>'
			+ '</tr>'			
			+ '<tr>'
				+ '<th colspan="2" style="text-align:center">'
					+ 'Points pris/perdus:'
				+ '</th>'
			+ '</tr>'
			+ '<tr>'
				+ '<td colspan="2" style="text-align:center; width:33%">' + Create_Aff(Pts, type_conversion) + '</td>'
			+ '</tr>';
	
	try {
		$('#battleOverview').children('.battleReportProtocol').remove();
	} catch(e) {
		return false;
	}
	
	$('#battleOverview').append('<div class="battleUnitsHeader"><div class="battleUnitsHeaderIcon front"></div><div class="battleUnitsHeaderLabel"><div class="headlineCenter">RC info :</div></div></div>');
	$('#battleOverview').append('<table class="battleReport"><tbody>'+$content+'</tbody></table>');
}

function DO_RE_INFO(){
	
	if($('.spionageReport:eq(1)').text()=='Rapport d\'espionnage - Ressources'){
		var Tot = 0;
		$('.rightAlign').each(function(){
			var the_val = $(this).text().replace(/[^0-9,]/g,'');
			var the_val2 = $(this).text().replace(/[^0-9]/g,'');
			var type = $(this).parent().children('td:eq(0)').text();
			$(this).html(Convertir(the_val, type_conversion));
			Tot = n(Unites_Stats[type][0]).multiply(the_val2).plus(Tot);
		});
		
		$('tbody').append('<tr><th>Total :</th><th class="rightAlign">'+Convertir(lisibilite_nombre(Tot), type_conversion)+'</th>');
	} else if ($('.spionageReport:eq(1)').text()=='Rapport d\'espionnage - Construction'){
		$('.rightAlign').each(function(){
			$(this).html(Convertir($(this).text(), type_conversion));
		});
	} else if ($('.spionageReport:eq(1)').text()=='Rapport d\'espionnage - Unités espions'){
		var Val_def = 0;
		var Nb_Sat = 0;
		var Nb_Or = 0;
		var Prix_Sat = 0;
		var Prix_Or = 0;
		var Tot = 0;
		
		$('.rightAlign').each(function(){
			var the_val = $(this).text();
			var the_val2 = $(this).text().replace(/[^0-9]/g,'');
			var unit = $(this).parent().children(':eq(0)').text();
			Val_def = n(the_val2).multiply(Unites_Stats[unit][3]).plus(Val_def);
			$(this).html(Convertir($(this).text(), type_conversion));
		});
		
		Nb_Sat = n(0).plus(Val_def).multiply(2).divide(Unites_Stats['Satellite espion'][2]);
		Nb_Or = n(0).plus(Nb_Sat).multiply(Unites_Stats['Satellite espion'][1]);
		Prix_Sat = n(0).plus(Nb_Sat).multiply(Unites_Stats['Satellite espion'][0]);
		Prix_Or = n(0).plus(Nb_Or).multiply(1000);
		Tot = n(0).plus(Prix_Sat).plus(Prix_Or);

		var $table = '<table>'
						+'<tr>'
						+'<td>Nb de Sat pour 100%</td><td class="rightAlign">'+ Convertir(lisibilite_nombre(Nb_Sat), type_conversion) +'</td>'
						+'<tr>'
						+'<tr>'
						+'<td>Prix des Sats</td><td class="rightAlign">'+ Convertir(lisibilite_nombre(Prix_Sat), type_conversion) +'</td>'
						+'<tr>'
						+'<tr>'
						+'<td>Or necessaire</td><td class="rightAlign">'+ Convertir(lisibilite_nombre(Nb_Or), type_conversion) +'</td>'
						+'<tr>'
						+'<tr>'
						+'<td>Cout en Or</td><td class="rightAlign">'+ Convertir(lisibilite_nombre(Prix_Or), type_conversion) +'</td>'
						+'<tr>'
						+'<tr>'
						+'<td>Cout Total</td><td class="rightAlign">'+ Convertir(lisibilite_nombre(Tot), type_conversion) +'</td>'
						+'<tr>'
					+'</table>';
		
		$('.spionageReport:first').append($table);
	} else if ($('.spionageReport:eq(1)').text()=='Rapport d\'espionnage - Défense'){
		
		var Prix_tot = 0;
		
		$('tr').each(function(index){
			if( index > 0 ){
				var Unit = $(this).children(':eq(0)').text();
				var Qte = $(this).children(':eq(1)').text();
				var Qte2 = $(this).children(':eq(1)').text().replace(/[^0-9]/g,'');
				Prix_tot = n(0).plus(Qte2).multiply(Unites_Stats[Unit][0]).plus(Prix_tot);
				$(this).children(':eq(1)').html(Convertir(Qte,type_conversion));
			}		
		});
		
		var $table = '<table><tr>'
					+'<td>Valeur des defs</td><td class="rightAlign">'+ Convertir(lisibilite_nombre(Prix_tot), type_conversion) +'</td>'
					+'</tr></table>';
		
		$('.spionageReport:first').append($table);
		
	} else if ($('.spionageReport:eq(1)').text()=='Rapport d\'espionnage - Unités' || $('.spionageReport:eq(1)').text()=='Rapport d\'espionnage - Dépôt'){
		
		var Prix_tot = 0;
		var Entretien = 0;
		
		$('tr').each(function(index){
			if( index > 0 ){
				var Unit = $(this).children(':eq(0)').text();
				var Qte = $(this).children(':eq(1)').text();
				var Qte2 = $(this).children(':eq(1)').text().replace(/[^0-9]/g,'');
				Prix_tot = n(0).plus(Qte2).multiply(Unites_Stats[Unit][0]).plus(Prix_tot);
				Entretien = n(0).plus(Qte2).multiply(Unites_Stats[Unit][4]).plus(Entretien);
				$(this).children(':eq(1)').html(Convertir(Qte,type_conversion));
			}		
		});
		
		var $table = '<table>'
				+'<tr>'
				+'<td>Valeur de Troupes</td><td class="rightAlign">'+ Convertir(lisibilite_nombre(Prix_tot), type_conversion) +'</td>'
				+'</tr>'
				+'<tr>'
				+'<td>Entretien de l\'armée</td><td class="rightAlign">'+ Convertir(lisibilite_nombre(Entretien), type_conversion) +'</td>'
				+'</tr>'
			+'</table>';
		
		$('.spionageReport:first').append($table);
		
	} 
}

function Display_conversion(){
	
	$('#infopanel_tab_noob').prev().text('Conversion');
			
	function toggle_type(elem){
		type_conversion = (type_conversion+1)%3;
		GM_setValue('type_of_aff', type_conversion);
		elem.value = Name[type_conversion];
	}

	var Name = ['Crésus', 'Puissance', 'Décimal'];
	
	$('#infopanel_tab_noob').html('<div style="position:relative; top:10px; left:10px; width:80px;"></div>');
			
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

	$('#infopanel_tab_noob').children(':eq(0)').append(modeC);
	$('#infopanel_tab_noob').children(':eq(0)').append(newButton);
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
		
	 $('.openblock:eq(1)').next().append(divG);
	
	$('#Calcul').click(function(){
		GM_xmlhttpRequest({
		method: "GET",
		url: "Webservices/resourcebar.php?json=true",
		onload: function(xhr) {
			var data = xhr.responseText;
			var ress = JSON.parse(data);
			var pet = parseInt(ress[0].amount);
			var kero = parseInt(ress[1].amount);
			var diesel = parseInt(ress[2].amount);
			var Taux = $('#percent_total').val();
			var Qd = $('#percent_diesel').val();
			var Qk = $('#percent_kero').val();
			var A = Arrondir(parseFloat(Qk/Qd),2);
			var diesel_todo = ((pet*Taux/100)+20*(kero-A*diesel))/(20*A+10);
			var kero_todo = A*(diesel_todo+diesel)-kero;
			
			$('#result').css({"display":"block"});
			$('#result').html('Diesel à  fabriquer : ' +Create_Aff(new Big(diesel_todo).str(), type_conversion)
														+'</br>Kero à fabriquer : '+Create_Aff(new Big(kero_todo).str(), type_conversion)
														+'</br>Pétrole pour diesel : '+Create_Aff(new Big(diesel_todo*10).str(), type_conversion)
														+'</br>Pétrole pour kéro : '+Create_Aff(new Big(kero_todo*20).str(), type_conversion));
			}
		});
	});
}

function Commerce_list(){
		var My_Div = document.createElement('div');
			My_Div.id='listing';
			My_Div.innerHTML = '<input value="Start" id="Start" type="button" />';
		$('.blockFoot:eq(0)').append(My_Div);
		
		function Achat_List(JSON_array, mode){
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
				dhtmlx.message("prochain achat dans 35s");
				if (mode =='1'){
					var allTID = document.getElementsByName('tid');
					for (var i = 0 ; i< allTID.length ; i++){
						if (allTID[i].value == Trade_id){
							allTID[i].parentNode.parentNode.style.cssText="background-color:#CCC";
						}
					}
				}
				setTimeout(function(){Achat_List(JSON_array, mode);},11000);
			  }
			});
		} else {
			dhtmlx.message("Aucune offre... Reload dans 10s !");
			setTimeout(function(){location.reload();},10000); //reload pour eviter les delais depassé
		}

}
		
		function IsSplittedCount(elem){
			if (elem.getElementsByClassName('tradeSearchSplittedCount').length != 0){
				return true;
			} else {
				return false;
			}
		}

		Array.prototype.unset = function(val){
			var index = this.indexOf(val)
			if(index > -1){
				this.splice(index,1)
			}
		}
		
		var array_tid = new Array();
		var array_qte = new Array();
		var qte;
		var list_tid = document.getElementsByName('tid');
		var offres_restantes = document.getElementsByClassName('tradePaginationMaximumPurchases')[0].textContent.trim();
		var regexp = /[0-9]+/;
		offres_restantes=60-parseInt(regexp.exec(offres_restantes));

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
					Achat_List(array_tid, '1');
				}
			} else {
				this.value='Start';
				this.style="color:green";
				window.location.href=window.location.href; //actualisation pour stopper le script
			}
		};
		
		if(list_tid.length!=0 ){ //s'il y a des tid, on crée des checkbox
		
		var Select_all = document.createElement('input'); //checkbox globale
			Select_all.type = 'checkbox';
			Select_all.className="Checklist";
			Select_all.onclick = function(){
				var listechkbx = document.getElementsByClassName('Checklist');
				if (this.checked==true){
					var count = 0 ;
					var min = Math.min(listechkbx.length, offres_restantes+1);
					for (var i = 1 ; i< min; i++){
						if (listechkbx[i].checked==false){
							listechkbx[i].checked = true;
							var numtid = listechkbx[i].getAttribute('rel');
							array_tid.push(numtid);
							count++;
						}
					}
					dhtmlx.message(count + " offres ajoutées");
				} else {
					var uncount = 0 ;
					for (var i = 1 ; i< listechkbx.length ; i++){
						if (listechkbx[i].checked==true){
							listechkbx[i].checked = false;
							var numtid = listechkbx[i].getAttribute('rel');
							array_tid.unset(numtid);
							uncount++;
						}
					}
					dhtmlx.message(uncount + " offres supprimées");
				}
			};
		
		document.getElementById('tradeSearchOfferResults').firstChild.childNodes[1].childNodes[1].lastChild.appendChild(Select_all)
			
			for( var i = 0; i<list_tid.length-1;i++){ // pour chaque offre
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

function DO_CrossTable(){
	
	function Chercher_imbattable(){
			
		var Result = new Array(0);
		
		$('#Zone_de_text').html('Unités non détruites : </br>');
		
		for (var i = 1 ; i < 66 ; i++){ Result.push(false); }
		
		$("[name='cases']").each(function(){
			if ($(this).prop('checked')){
				$(this).parent().children('.showCrossTableToolTip').each(function(index){
					if ($(this).hasClass('forth') || $(this).hasClass('forthBack')){
						Result[index] = true;
					}
				});
			}
		});
		
		$.each(Result, function(index, value){
			if ( value==false ){
				var num = index+1;
				var unit = $("[name='cases'][value='"+ num +"']").next().text().trim();
				$('#Zone_de_text').append(unit+'</br>');
			}
		});
	}
	
	$('#lightboxContent').append('<div id="Zone_de_text"></div>');
	$('.extendedCrossTableItem:first').children(':eq(0)').remove();
	$('.tooltipContent').remove();
	
	$('.extendedCrossTableItem').each(function(index){			
			$input = $('<input />', { type: 'checkbox', value: index+1, name:'cases'})
			
			$input.click(function(){
				if ($(this).prop('checked')){
					$(this).parent().css({"font-weight":"bold", "border":"1px solid", "color":"#AFA"});
					Chercher_imbattable();
				} else {
					$(this).parent().removeAttr("style");
					Chercher_imbattable();
				}
			});
			
			$(this).prepend($input);
	});
	
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

function DO_espionnage(){
		
		var def = 0;
		
		$('.unit_description').each(function(){
			var qte = $(this).children('.tooltipExtention:eq(1)').attr('title').replace(/[^0-9]/g,'');
			var nom = $(this).children('h3').text().trim();
			def =  n(qte).multiply(Unites_Stats[nom][3]).plus(def);
			
		});

		var need_unit_att=n(0).plus(def).divide(45000);
		var need_or_att=n(0).plus(need_unit_att).multiply(10000);
		var cout_or = n(0).plus(need_or_att).multiply(1000);
		var cout_sat = n(0).plus(need_unit_att).multiply(5000000);
		
		var phrase = 'Pour passer votre défense, il faudra à votre attaquant <strong>' 
					+ Create_Aff(need_unit_att, type_conversion)
					+'</strong> de satellites et <strong>'
					+ Create_Aff(need_or_att, type_conversion)
					+'</strong> d\'or ce qui coute <strong>'
					+ Create_Aff(cout_or, type_conversion)
					+'</strong> en or et <strong>'
					+ Create_Aff(cout_sat, type_conversion)
					+'</strong> en sat</br></br>Pour avoir 100% il faut le double au minimum';
		
		$('div .openblock').append(phrase);
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
								
		$('div .openblock:eq(0)').append(tab);
		
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
		var part = n(Qte).divide(b);
		var nb_cut = TronquerBigInt(''+part);
		return lisibilite_nombre(nb_cut);
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
			Btn_Event[j].onclick = function(){
				var type = this.id.replace(/[0-9]+/,'');
				var num = this.id.replace(/[^0-9]+/,'');
				var name= 'anz['+num+']';
				if(num<l){var offset = 1;} else {var offset = 0;}
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

function RERC_info(){
	var nom_joueur = $('#quickbuttonsUserDetails').parent().text();
	var sessid = GM_getValue('sessid', '');

	if(sessid==''){
		GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://game.desert-operations.fr/world1/highscore.php",
		  onload: function(response) {
			var responseparser = parseAJAX_ResponseHTML(response);
			var text = responseparser.getElementsByClassName('selfRow')[0].getElementsByClassName('td3')[0].innerHTML.replace(/<[^>]*>/gi,'');
			GM_setValue('sessid', text);
		  }
		});
	} else {
		GM_xmlhttpRequest({
		  method: "POST",
		  url: "http://dorercbdd.esy.es/player.php",
		  data: "pseudo="+nom_joueur+"&from="+sessid+"&code=pwdscript",
		  headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		  },
		  onload: function(response) {
			var responseparser = parseAJAX_ResponseHTML(response);
			$('div .openblock:eq(0)').append('</br><div class="Uscript" id="ici"><a href="http://dorercbdd.esy.es/index.php" target="_blank">Accéder à la BDD</a></div>');
			document.getElementById('ici').appendChild(responseparser.getElementById('resultTableRe'));
			document.getElementById('ici').appendChild(responseparser.getElementById('resultTableRcDef'));
			document.getElementById('ici').appendChild(responseparser.getElementById('resultTableRcAtt'));
		  }
		});
	}
}

var Search = window.location.search;
var World = window.location.pathname.split('/')[1];
var Path = window.location.pathname.split('/')[2];
var type_conversion = GM_getValue('type_of_aff', 0);


waitForKeyElements ("#resourcebar", DO_conversion);
waitForKeyElements ("#top_menu_list", DO_change_link);
waitForKeyElements ("#infopanel_tab_noob", Display_conversion);


if (Search=='?show=accessdenied' || Search=='?show=nodatabase'){
	setTimeout(function(){
		window.location.href='http://www.desert-operations.fr/';
	}, 1000);
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

if (Search!='?show=accessdenied' && Search!='?show==nodatabase' ){

DO_conversion();
DO_commerce_link();
Labelize();

//if (Path =='premium_cash.php' && Search =='?section=ress'){
//	DO_conversion_premium();
//	DO_def_fixe();
//
if (Path =='kt.php'){
	DO_CrossTable();
}
if (Path=='userdetails.php'){
	DO_fiche();
	RERC_info();
}
if (Path=='flottendetails.php'){
	DO_defense();
}
if (Path=='handel.php' && Search.split('&')[0]=='?mode=1'){
	DO_commerce_color();
	DO_commerce_lots();
	Commerce_list();
}
if (Path=='handel.php' && Search.split('&')[0]=='?mode=2'){
	DO_vente_max();
}
if (Path=='produktion.php' && Search.split('&')[0]=='?mode=3'){
	DO_espionnage();
}
//if (Path=='allianceadministration.php' && Search.split('&')[0]=='?section=finance'){
//	DO_versement();
//}
if (Path=='militaer.php'){
	DO_MeP_army();
	DO_info_attaque();
}
if (Path=='battleReport.php'){
	DO_RC_INFO();
}
if (Path=='spionageReport.php'){
	DO_RE_INFO();
}
if (Path=='rohstoffe.php'){
	DO_raffinage();
}
//if (Path=='alliancewars.php'){
//	Pts_War();
//}
}

