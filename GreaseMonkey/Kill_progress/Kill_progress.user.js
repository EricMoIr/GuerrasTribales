// ==UserScript==
// @name        Kill building progress
// @namespace   https://github.com/EricMoIr/GuerrasTribales/GreaseMonkey
// @include     /screen=main/
// @version     1
// @grant       none
// ==/UserScript==

document.getElementsByClassName("order-progress")[0].outerHTML = "";