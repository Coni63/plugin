// ==UserScript==
// @name           classement AM2
// @namespace      Coni
// @description    Ecces rapide au classement
// @include        http://www.airlines-manager.com/company/ranking/*
// @version        1.00
// ==/UserScript==


var posi = document.getElementById('rankingTop').firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.nextSibling.nextSibling;

var langArray=new Array();

for(var k=0 ; k<100; k++){

var l=k*50+1;
var m=(k+1)*50;
langArray[k] = { value : k, text : "de " + l +" à " + m };

}

var newList= document.createElement('select');

var option=new Array();

for (var i=0, il = langArray.length; i < il; i ++) {
	option[i] = document.createElement('option');
    option[i].value = langArray[i].value;
    option[i].text = langArray[i].text;
    newList.appendChild(option[i]);
}

var newButton = document.createElement("input");
                newButton.type = "button";
				newButton.value = "aller";
				newButton.id=1;
				newButton.onclick = function(){
					location.replace('http://www.airlines-manager.com/company/ranking/?page='+newList.value)
				};
				
posi.parentNode.insertBefore(newButton, posi.nextSibling);
posi.parentNode.insertBefore(newList, posi.nextSibling);