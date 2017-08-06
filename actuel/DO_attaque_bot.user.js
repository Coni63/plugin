// ==UserScript==
// @name           DO_attaque_bot
// @author         Coni
// @description    remplissage plus rapide des armees
// @include        http://game.desert-operations.fr/world*/*
// @version        1.01
// @updateURL		https://sites.google.com/site/coni63do/plugin/DO_attaque_bot.user.js
// @downloadURL		https://sites.google.com/site/coni63do/plugin/DO_attaque_bot.user.js
// @installURL		https://sites.google.com/site/coni63do/plugin/DO_attaque_bot.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// ==/UserScript==

var Start = GM_getValue('Start', false);
var World = window.location.pathname.split('/')[1];

if(window.location.pathname.split('/')[2]=='militaer.php'){
	ExecuteScript();
}
if(window.location.pathname.split('/')[2]!='militaer.php' && Start == true){
	window.location.href='http://game.desert-operations.fr/'+World+'/militaer.php';
}

function ExecuteScript(){
		
		var timing = GM_getValue('timing', '00:00');
		var Feu = GM_getValue('Feu', false);
		var Launch1 = GM_getValue('Launch1', false);
		var Launch2 = GM_getValue('Launch2', false);
		var Launch3 = GM_getValue('Launch3', false);
		var tableau = document.getElementsByTagName('tbody')[3].childNodes;
		var Plani = tableau[0].lastChild;

		var heure = document.createElement("input");
			heure.type = "text";
			heure.value = timing;
			heure.id='timing';
			heure.size='5';
			heure.onchange=function(){GM_setValue('timing', this.value);}
			if (Start==true){heure.disabled=true;}

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
					GM_setValue('Launch1', false);
					GM_setValue('Launch2', false);
					GM_setValue('Launch3', false);
					GM_setValue('Feu', false);
					Clear_Coords();
					window.location.href='http://game.desert-operations.fr/'+World+'/militaer.php';
				} else {
					GM_setValue('Start', true);
					window.location.href='http://game.desert-operations.fr/'+World+'/militaer.php';
				}
			};

		var time_txt = document.createElement('div');
			time_txt.id='decompte';
			time_txt.innerHTML='h-??:??:??';

		Plani.appendChild(heure);	
		Plani.appendChild(newButton);
		Plani.appendChild(time_txt);

		var elem = new Array();
		elem.push(document.getElementsByName("kon")[0]);
		elem.push(document.getElementsByName('island')[0]);
		elem.push(document.getElementsByName('base')[0]);
		elem.push(document.getElementsByName('kon')[1]);
		elem.push(document.getElementsByName('island')[1]);
		elem.push(document.getElementsByName('base')[1]);
		elem.push(document.getElementsByName('kon')[2]);
		elem.push(document.getElementsByName('island')[2]);
		elem.push(document.getElementsByName('base')[2]);

		function Save_Coords(){
			for (var i=0;i<elem.length;i++){
				elem[i].id=i;
				elem[i].onkeyup=function(){
					var nom = 'posi'+this.id;
					GM_setValue(nom,this.value);
				}
			}
		}

		function Load_Coords(){
			for (var i=0;i<elem.length;i++){
				elem[i].value=GM_getValue('posi'+i,'');
			}
		}

		function Clear_Coords(){
			for (var i=0;i<elem.length;i++){
				GM_deleteValue('posi'+i);
			}
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
			var time = document.getElementById('timing').value.split(':');

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
				window.location.href='http://game.desert-operations.fr/'+World+'/militaer.php';
			},delay);
		}

		Load_Coords();
		Save_Coords();

		if (Start == true && Feu == false){
			Chrono();
		}
		if (Start == true && Feu == true){
			if (Launch1==false && Launch2==false && Launch3==false){
				GM_setValue('Launch1', true);
				setTimeout(function(){
					document.getElementsByName('commitaction')[0].click();
					alert('ok armée 1');
				},2000);
			}
			if (Launch1== true && Launch2==false && Launch3==false){
				GM_setValue('Launch2', true);
				setTimeout(function(){
					document.getElementsByName('commitaction')[1].click();
					alert('ok armée 2');
				},2000);
			}
			if (Launch1==true && Launch2==true && Launch3==false){
				GM_setValue('Launch3', true);
				setTimeout(function(){
					document.getElementsByName('commitaction')[2].click();
					alert('ok armée 3');
				},2000);
			}
			if (Launch1==true && Launch2==true && Launch3==true){
				GM_setValue('Start', false);
				GM_setValue('Launch1', false);
				GM_setValue('Launch2', false);
				GM_setValue('Launch3', false);
				GM_setValue('Feu', false);
				Clear_Coords();
				window.location.href='http://game.desert-operations.fr/'+World+'/militaer.php';
			}
		}
}