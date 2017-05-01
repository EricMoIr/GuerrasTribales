// ==UserScript==
// @name        Map size
// @namespace   https://github.com/EricMoIr/GuerrasTribales/GreaseMonkey
// @include     /screen=map/
// @version     1
// @grant       none
// ==/UserScript==
(function(){
    var h2 = document.getElementById("content_value").getElementsByTagName("h2")[0];
    var size = document.createElement("input");
    size.id = "mapSize";
    size.setAttribute("placeholder", "Map size");
    var ok = document.createElement("input");
    ok.setAttribute("type", "button");
    ok.value = "ok";
    ok.setAttribute("onclick", "var size = parseInt(document.getElementById('mapSize').value);  TWMap.resize(size, true);");
    h2.append(size);
    h2.append(ok);
})()
