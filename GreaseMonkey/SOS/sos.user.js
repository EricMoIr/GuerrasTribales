// ==UserScript==
// @name        SOS
// @namespace   https://github.com/EricMoIr/GuerrasTribales/GreaseMonkey
// @include     /screen=overview/
// @version     1
// @grant       none
// ==/UserScript==

function sos(){
	var trs = $(".no_ignored_command");
	var villageId = getCurrentVillage();
	var incomingId = $(trs[0]).find(".quickedit")[0].getAttribute("data-id");
	for(var i=0; i<trs.length; i++){
		$(".quickedit-label")[i].innerHTML+="<a href='https://es42.guerrastribales.es/game.php?screen=reqdef&village_id="+villageId+"&id="+incomingId+"'>SOS</a>";
	}
}
function getCurrentVillage(){
    var idBegining = window.location.href.indexOf("village=") + 8;
    var idEnd = window.location.href.indexOf("&");
    return parseInt(window.location.href.substring(idBegining, idEnd));
}
sos();