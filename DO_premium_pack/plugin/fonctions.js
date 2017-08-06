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

function DelPoint(Nombre) {
	var	End = Nombre.replace(/\./g,'');
	End = parseInt(End);
	return End;
} 

String.prototype.getId=function(){
	for(i=1;i<Unit_Name.length+1;i++){
		if (Unit_Name[i]==this){return i;}
	}
}

function Tronque(x, n){
	var s = x.toString().length;
	var a = s-n;
	var decalage = Math.pow(10, a);
	x /= decalage;
	x = Math.floor(x);
	x *= decalage;
	return x;
}

function GetUnit(Arg){
	if (Arg.match('Or'))							{P='Or';} 
	if (Arg.match('Pétrole'))						{P='Pétrole';} 
	if (Arg.match('Munitions'))						{P='Munitions';} 
	if (Arg.match('Fantassin'))						{P='Fantassin';} 
	if (Arg.match('Paras'))							{P='Paras';} 
	if (Arg.match('Antichar'))						{P='Antichar';} 
	if (Arg.match('Commando de marine'))			{P='Commando de marine';} 
	if (Arg.match('AMX-13 DCA'))					{P='AMX-13 DCA';} 
	if (Arg.match('AMX-30'))						{P='AMX-30';} 
	if (Arg.match('Destructeur de mines'))			{P='Destructeur de mines';} 
	if (Arg.match('Artillerie automotrice PzH2000')){P='Artillerie automotrice PzH2000';} 
	if (Arg.match('Lance-missile mobile'))			{P='Lance-missile mobile';} 
	if (Arg.match('M1A2 Abrams'))					{P='M1A2 Abrams';} 
	if (Arg.match('MBT 3000'))						{P='MBT 3000';} 
	if (Arg.match('T-90'))							{P='T-90';} 
	if (Arg.match('Leclerc 2'))						{P='Leclerc 2';} 
	if (Arg.match('Leopard 3'))						{P='Leopard 3';} 
	if (Arg.match('T-95 Black Eagle'))				{P='T-95 Black Eagle';} 
	if (Arg.match('AH-64 Apache'))					{P='AH-64 Apache';} 
	if (Arg.match('Mil MI-28 Havoc'))				{P='Mil MI-28 Havoc';} 
	if (Arg.match('Mil MI-24 Hind'))				{P='Mil MI-24 Hind';} 
	if (Arg.match('Eurocopter Tigre'))				{P='Eurocopter Tigre';} 
	if (Arg.match('Eurofighter Typhoon'))			{P='Eurofighter Typhoon';} 
	if (Arg.match('F22 Raptor'))					{P='F22 Raptor';} 
	if (Arg.match('J16 \"Red Eagle\"'))				{P='J16 \"Red Eagle\"';} 
	if (Arg.match('A-10 Thunderbolt'))				{P='A-10 Thunderbolt';} 
	if (Arg.match('F117A Nighthawk'))				{P='F117A Nighthawk';} 
	if (Arg.match('Rockwell B1'))					{P='Rockwell B1';} 
	if (Arg.match('Northrop B2 Spirit'))			{P='Northrop B2 Spirit';} 
	if (Arg.match('Embraer EMB 314 Super Tucano'))	{P='Embraer EMB 314 Super Tucano';} 
	if (Arg.match('Grey Ghost'))					{P='Grey Ghost';} 
	if (Arg.match('B-52 Stratofortress'))			{P='B-52 Stratofortress';} 
	if (Arg.match('Corvette K130'))					{P='Corvette K130';} 
	if (Arg.match('Destroyer Type 333'))			{P='Destroyer Type 333';} 
	if (Arg.match('Frégate de 2nd rang'))			{P='Frégate de 2nd rang';} 
	if (Arg.match('Houbei Class Missile Boat'))		{P='Houbei Class Missile Boat';} 
	if (Arg.match('Sous-marin d\'attaque'))			{P='Sous-marin d\'attaque';} 
	if (Arg.match('Sous-marin lanceur d\'engins'))	{P='Sous-marin lanceur d\'engins';} 
	if (Arg.match('Porte-avions nucléaire'))		{P='Porte-avions nucléaire';} 
	if (Arg.match('Porte-avions Charles de Gaulle')){P='Porte-avions Charles de Gaulle';} 
	if (Arg.match('Frégate de 1er rang'))			{P='Frégate de 1er rang';} 
	if (Arg.match('Croiseur IOWA Classe B'))		{P='Croiseur IOWA Classe B';} 
	return P;
}

function Convert(Quantite) {
	if(Quantite>=0){
		if (Quantite < Math.pow(10,3)) {
			Quantite += '';
		} else if (Quantite < Math.pow(10,6)) {
			Quantite =lisibilite_nombre(Quantite);
		} else if (Quantite < Math.pow(10,9)) {
			Quantite /= Math.pow(10,6);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' m';
		} else if (Quantite < Math.pow(10,12)) {
			Quantite /= Math.pow(10,9);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' M';
		} else if (Quantite < Math.pow(10,15)) {
			Quantite /= Math.pow(10,12);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' b';
		} else if (Quantite < Math.pow(10,18)) {
			Quantite /= Math.pow(10,15);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' B';
		} else if (Quantite < Math.pow(10,21)) {
			Quantite /= Math.pow(10,18);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' C';
		}else if (Quantite < Math.pow(10,24)) {
			Quantite /= Math.pow(10,21);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' kC';
		}else if (Quantite < Math.pow(10,27)) {
			Quantite /= Math.pow(10,24);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' mC';
		}else if (Quantite < Math.pow(10,30)) {
			Quantite /= Math.pow(10,27);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' MC';
		}else if (Quantite < Math.pow(10,33)) {
			Quantite /= Math.pow(10,30);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' bC';
		}else if (Quantite < Math.pow(10,36)) {
			Quantite /= Math.pow(10,33);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' BC';
		}else if (Quantite < Math.pow(10,39)) {
			Quantite /= Math.pow(10,36);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' C²';
		}else if (Quantite < Math.pow(10,42)) {
			Quantite /= Math.pow(10,39);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' kC²';
		}else if (Quantite < Math.pow(10,45)) {
			Quantite /= Math.pow(10,42);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' mC²';
		}else if (Quantite < Math.pow(10,48)) {
			Quantite /= Math.pow(10,45);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' MC²';
		}else if (Quantite < Math.pow(10,51)) {
			Quantite /= Math.pow(10,48);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' bC²';
		}else if (Quantite < Math.pow(10,54)) {
			Quantite /= Math.pow(10,51);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' BC²';
		}else if (Quantite < Math.pow(10,57)) {
			Quantite /= Math.pow(10,54);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' C<sup>3</sup>';
		}
	} else {
		Quantite = Math.abs(Quantite);
		if (Quantite < Math.pow(10,3)) {
			Quantite ='-'+Quantite+'';
		} else if (Quantite < Math.pow(10,6)) {
			Quantite ='-'+lisibilite_nombre(Quantite);
		} else if (Quantite < Math.pow(10,9)) {
			Quantite /= Math.pow(10,6);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' m';
		} else if (Quantite < Math.pow(10,12)) {
			Quantite /= Math.pow(10,9);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' M';
		} else if (Quantite < Math.pow(10,15)) {
			Quantite /= Math.pow(10,12);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' b';
		} else if (Quantite < Math.pow(10,18)) {
			Quantite /= Math.pow(10,15);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' B';
		} else if (Quantite < Math.pow(10,21)) {
			Quantite /= Math.pow(10,18);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' C';
		}else if (Quantite < Math.pow(10,24)) {
			Quantite /= Math.pow(10,21);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' kC';
		}else if (Quantite < Math.pow(10,27)) {
			Quantite /= Math.pow(10,24);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' mC';
		}else if (Quantite < Math.pow(10,30)) {
			Quantite /= Math.pow(10,27);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' MC';
		}else if (Quantite < Math.pow(10,33)) {
			Quantite /= Math.pow(10,30);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' bC';
		}else if (Quantite < Math.pow(10,36)) {
			Quantite /= Math.pow(10,33);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' BC';
		}else if (Quantite < Math.pow(10,39)) {
			Quantite /= Math.pow(10,36);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' C²';
		}else if (Quantite < Math.pow(10,42)) {
			Quantite /= Math.pow(10,39);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' kC²';
		}else if (Quantite < Math.pow(10,45)) {
			Quantite /= Math.pow(10,42);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' mC²';
		}else if (Quantite < Math.pow(10,48)) {
			Quantite /= Math.pow(10,45);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' MC²';
		}else if (Quantite < Math.pow(10,51)) {
			Quantite /= Math.pow(10,48);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' bC²';
		}else if (Quantite < Math.pow(10,54)) {
			Quantite /= Math.pow(10,51);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' BC²';
		}else if (Quantite < Math.pow(10,57)) {
			Quantite /= Math.pow(10,54);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' C<sup>3</sup>';
		}
	}
	return Quantite; 
}

function Convert2(Quantite) {
	if(Quantite>=0){
		if (Quantite < Math.pow(10,3)) {
			Quantite += '';
		} else if (Quantite < Math.pow(10,6)) {
			Quantite /= Math.pow(10,3);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+3+'</sup>';
		} else if (Quantite < Math.pow(10,9)) {
			Quantite /= Math.pow(10,6);
			Quantite = Arrondir(Quantite,2);
			Quantite +=' x10<sup>'+6+'</sup>';
		} else if (Quantite < Math.pow(10,12)) {
			Quantite /= Math.pow(10,9);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+9+'</sup>';
		} else if (Quantite < Math.pow(10,15)) {
			Quantite /= Math.pow(10,12);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+12+'</sup>';
		} else if (Quantite < Math.pow(10,18)) {
			Quantite /= Math.pow(10,15);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+15+'</sup>';
		} else if (Quantite < Math.pow(10,21)) {
			Quantite /= Math.pow(10,18);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+18+'</sup>';
		}else if (Quantite < Math.pow(10,24)) {
			Quantite /= Math.pow(10,21);
			Quantite = Arrondir(Quantite,2);
			Quantite +=' x10<sup>'+21+'</sup>';
		}else if (Quantite < Math.pow(10,27)) {
			Quantite /= Math.pow(10,24);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+24+'</sup>';
		}else if (Quantite < Math.pow(10,30)) {
			Quantite /= Math.pow(10,27);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+27+'</sup>';
		}else if (Quantite < Math.pow(10,33)) {
			Quantite /= Math.pow(10,30);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+30+'</sup>';
		}else if (Quantite < Math.pow(10,36)) {
			Quantite /= Math.pow(10,33);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+33+'</sup>';
		}else if (Quantite < Math.pow(10,39)) {
			Quantite /= Math.pow(10,36);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+36+'</sup>';
		}else if (Quantite < Math.pow(10,42)) {
			Quantite /= Math.pow(10,39);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+39+'</sup>';
		}else if (Quantite < Math.pow(10,45)) {
			Quantite /= Math.pow(10,42);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+42+'</sup>';
		}else if (Quantite < Math.pow(10,48)) {
			Quantite /= Math.pow(10,45);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+45+'</sup>';
		}else if (Quantite < Math.pow(10,51)) {
			Quantite /= Math.pow(10,48);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+48+'</sup>';
		}else if (Quantite < Math.pow(10,54)) {
			Quantite /= Math.pow(10,51);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+51+'</sup>';
		}else if (Quantite < Math.pow(10,57)) {
			Quantite /= Math.pow(10,54);
			Quantite = Arrondir(Quantite,2);
			Quantite += ' x10<sup>'+54+'</sup>';
		}
	} else {
		Quantite = Math.abs(Quantite);
		if (Quantite < Math.pow(10,3)) {
			Quantite ='-'+Quantite+ '';
		} else if (Quantite < Math.pow(10,6)) {
			Quantite /= Math.pow(10,3);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+3+'</sup>';
		} else if (Quantite < Math.pow(10,9)) {
			Quantite /= Math.pow(10,6);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+6+'</sup>';
		} else if (Quantite < Math.pow(10,12)) {
			Quantite /= Math.pow(10,9);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+9+'</sup>';
		} else if (Quantite < Math.pow(10,15)) {
			Quantite /= Math.pow(10,12);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+12+'</sup>';
		} else if (Quantite < Math.pow(10,18)) {
			Quantite /= Math.pow(10,15);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+15+'</sup>';
		} else if (Quantite < Math.pow(10,21)) {
			Quantite /= Math.pow(10,18);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+18+'</sup>';
		}else if (Quantite < Math.pow(10,24)) {
			Quantite /= Math.pow(10,21);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+21+'</sup>';
		}else if (Quantite < Math.pow(10,27)) {
			Quantite /= Math.pow(10,24);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+24+'</sup>';
		}else if (Quantite < Math.pow(10,30)) {
			Quantite /= Math.pow(10,27);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+27+'</sup>';
		}else if (Quantite < Math.pow(10,33)) {
			Quantite /= Math.pow(10,30);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+30+'</sup>';
		}else if (Quantite < Math.pow(10,36)) {
			Quantite /= Math.pow(10,33);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+33+'</sup>';
		}else if (Quantite < Math.pow(10,39)) {
			Quantite /= Math.pow(10,36);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+36+'</sup>';
		}else if (Quantite < Math.pow(10,42)) {
			Quantite /= Math.pow(10,39);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+39+'</sup>';
		}else if (Quantite < Math.pow(10,45)) {
			Quantite /= Math.pow(10,42);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+42+'</sup>';
		}else if (Quantite < Math.pow(10,48)) {
			Quantite /= Math.pow(10,45);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+' x10<sup>'+45+'</sup>';
		}else if (Quantite < Math.pow(10,51)) {
			Quantite /= Math.pow(10,48);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+48+'</sup>';
		}else if (Quantite < Math.pow(10,54)) {
			Quantite /= Math.pow(10,51);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+51+'</sup>';
		}else if (Quantite < Math.pow(10,57)) {
			Quantite /= Math.pow(10,54);
			Quantite = Arrondir(Quantite,2);
			Quantite ='-'+Quantite+ ' x10<sup>'+54+'</sup>';
		}
	}
	return Quantite; 
}