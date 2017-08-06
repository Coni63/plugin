function Convertir2(nombre, mode){

var modeC =['', '',' k',' m',' M',' b',' B',' C',' kC',' mC',' MC',' bC',' BC',' C²',' kC²',' mC²',' MC²',' bC²',' BC²',' C<sup>3</sup>',' kC<sup>3</sup>',' mC<sup>3</sup>',' MC<sup>3</sup>',' bC<sup>3</sup>',' BC<sup>3</sup>'];
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
		span.className='tooltipExtention showTooltipDefault';
		span.title = lisibilite_nombre(nb);
		span.data = lisibilite_nombre(nb);
		span.innerHTML = Convertir2(span.title , mode_mis);
	
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