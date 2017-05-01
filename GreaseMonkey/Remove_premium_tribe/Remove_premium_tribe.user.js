// ==UserScript==
// @name        Remove premium tribe
// @namespace   https://github.com/EricMoIr/GuerrasTribales/GreaseMonkey
// @include     /mode=members/
// @version     1
// @grant       none
// ==/UserScript==
var table = document.getElementsByClassName("vis")[7];
var trs = table.getElementsByTagName("tr");
trs[0].getElementsByTagName("th")[trs[0].getElementsByTagName("th").length-1].innerHTML = "MV";
trs[0].getElementsByTagName("th")[5].outerHTML = "";
for(var i=1; i<trs.length; i++){
	var tr = trs[i];
	tr.getElementsByTagName("td")[5].outerHTML = "";
}