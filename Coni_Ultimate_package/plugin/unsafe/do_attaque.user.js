// ==UserScript==
// @name           DO attaque
// @author         Coni
// @description    remplissage plus rapide des armees
// @include        http://game.desert-operations.fr/world1/militaer.php
// @version        3.00
// ==/UserScript==

var nombre= document.getElementsByClassName('adjNumInput input');
var nb_unites = document.getElementsByClassName('adjNumInput input').length;
var langArray = new Array();
var newList = new Array();
var option = new Array(); 
var newButton = new Array();
var newButton2 = new Array();

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

function calcul(a) {
var valeur = parseFloat(nombre[a].value);
var puissance = parseInt(newList[a].value);
total = valeur * Math.pow(10,puissance);
nombre[a].value = lisibilite_nombre(new Big(total).str());
}

function max(b){
nombre[b].value=lisibilite_nombre(nombre[b].getAttribute('max'));
}

for (j=0, k=nb_unites; j<k; j++){	

langArray[j] = [
    {value: "3", text: "millier(s)"},
    {value: "6", text: "million(s)"},
	{value: "9", text: "milliard(s)"},
	{value: "12", text: "billion(s)"},
	{value: "15", text: "Billiard(s)"},
	{value: "18", text: "Cresus"},
	{value: "21", text: "kCresus"},
	{value: "24", text: "mCresus"},
	{value: "27", text: "MCresus"},
	{value: "30", text: "bCresus"},
	{value: "33", text: "BCresus"}
];

newList[j]= document.createElement('select');

option[j]=new Array();

for (var i=0, il = langArray[j].length; i < il; i ++) {
	option[j][i] = document.createElement('option');
    option[j][i].value = langArray[j][i].value;
    option[j][i].text = langArray[j][i].text;
    newList[j].appendChild(option[j][i]);
}

option[j][3].selected="selected";

newButton[j] = document.createElement("input");
                newButton[j].type = "button";
				newButton[j].value = "calcul";
				newButton[j].id=j;
				newButton[j].onclick = function(){
					calcul(this.id);
					return false;
				};
                
newButton2[j] = document.createElement("input");
                newButton2[j].type = "button";
				newButton2[j].value = "max";
				newButton2[j].id=j;
				newButton2[j].onclick = function(){
					max(this.id);
					return false;
				};
nombre[j].parentNode.insertBefore(newButton2[j], nombre[j].nextSibling);			
nombre[j].parentNode.insertBefore(newButton[j], nombre[j].nextSibling);
nombre[j].parentNode.insertBefore(newList[j], nombre[j].nextSibling);
}