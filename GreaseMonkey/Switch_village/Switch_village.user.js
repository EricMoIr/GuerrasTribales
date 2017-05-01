// ==UserScript==
// @name         Switch village
// @namespace    https://github.com/EricMoIr/GuerrasTribales/GreaseMonkey
// @version      0.1
// @description  Previous/Next village
// @author       Muordar
// @match        https://es42.guerrastribales.es/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
function getCurrentVillage(){
    return game_data.village.id;
}
function getVillageURL(village){
    var idBegining = window.location.href.indexOf("village=") + 8;
    var idEnd = window.location.href.indexOf("&");
    var newUrlBegining = window.location.href.substring(0, idBegining);
    var newUrlEnd = window.location.href.substring(idEnd, window.location.href.length);
    return newUrlBegining + village + newUrlEnd;
}
function nextVillageURL(){
    /*var currVillage = getCurrentVillage();
    if(currVillage.charAt(0) == 'n' || currVillage.charAt(0) == 'p')
        return getVillageURL("n"+(currVillage.substring(1, currVillage.length)));*/
    return getVillageURL("n"+getCurrentVillage());
}
function previousVillageURL(){
    /*var currVillage = getCurrentVillage();
    if(currVillage.charAt(0) == 'n' || currVillage.charAt(0) == 'p')
        return getVillageURL("p"+(currVillage.substring(1, currVillage.length)));*/
    return getVillageURL("p"+getCurrentVillage());
}
var menu = document.getElementById("menu_row2");
var urlRight = nextVillageURL();
var urlLeft = previousVillageURL();
if(urlRight !== "" && urlLeft!== "" ){
    var rightArrow = '<a href='+urlRight+'><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-right-128.png" alt="Next village" height="25" width="25"></a>';
    var leftArrow = '<a href='+urlLeft+'><img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-left-128.png" alt="Previous village" height="25" width="25"></a>';
    menu.innerHTML = leftArrow + rightArrow + menu.innerHTML;
}
})();