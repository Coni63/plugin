// ==UserScript==
// @name           DO conversion
// @author         Coni
// @description    Supprime les puissances
// @include        http://game.desert-operations.*/world*/*.*
// @exclude        http://game.desert-operations.*/world*/battleReport.*
// @version        2.00
// @grant none
//
// ==/UserScript==

function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
} 

function DelPoint(Nombre) {
	var	End = Nombre.replace(/\./g,'');
	End = parseInt(End);
	return End;
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

var balise=document.getElementsByClassName("tooltipExtention showTooltipDefault");
for(i=0, c=balise.length; i<c; i++){
balise[i].innerHTML=Convert(DelPoint(balise[i].title));
}