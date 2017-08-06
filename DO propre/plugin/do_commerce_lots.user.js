// ==UserScript==
// @name           DO Commerce Lots
// @author         Coni
// @description    Supprime les lots dans le commerce
// @include        http://*.desert-operations.*/world*/handel.php*
// @version        2.00
// ==/UserScript==

var part=document.getElementsByTagName('input');
var lot = new Array();
var max = new Array();
var value = new Array();
var indice =0 ;

for(i=0, c=part.length ; i<c ;i++){
if(part[i].type=='text'){
lot[indice]=part[i];
indice++;
}
}

for(j=1, h=lot.length ; j<h ; j++){
max[j] = lot[j].getAttribute('max');
value[j] = lot[j].getAttribute('value');
lot[j].setAttribute('value', max[j]);
}