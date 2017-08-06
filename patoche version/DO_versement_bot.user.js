// ==UserScript==
// @name           DO_versement
// @author         Coni
// @description    Permet de verser plus rapidement les ressources
// @include        http://*.desert-operations.*/world*/allianceadministration.php?section=finance
// @version        1.00
// @grant          none
// ==/UserScript==

function Verser(index, Qte){
	document.getElementById('countResource').value = Qte;
	
	var ress=document.getElementById('resourceSelect');
	ress[index].selected="selected";
	
	var destinataire=document.getElementById('checkAllianceFinanceSendTarget');
	destinataire[2].selected="selected";
	
	document.getElementById('allyRecipientInput').setAttribute("disabled", "disabled");
	
	setTimeout(function(){document.getElementById('allianceAllocateMoney').click();}, 1000);
}

document.getElementById('allianceAllocateMoney').style.display = 'none';

var position = document.getElementById('allianceAllocateMoney').parentNode;

var Btn1 = document.createElement('input');
	Btn1.type = 'button';
	Btn1.value = 'Verser pet';
	Btn1.onclick = function(){Verser(2, '13000000000000000000000');}
	
var Btn2 = document.createElement('input');
	Btn2.type = 'button';
	Btn2.value = 'Verser muni';
	Btn2.onclick = function(){Verser(3, '900000000000000000000000');}
	
position.appendChild(Btn1);
position.appendChild(Btn2);

