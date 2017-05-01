// ==UserScript==
// @name        Hide completed buildings
// @namespace   https://github.com/EricMoIr/GuerrasTribales/GreaseMonkey
// @include     /screen=main/
// @version     1
// @grant       none
// ==/UserScript==

function createElements(){
  var div = document.createElement("div");
  var check = document.createElement("input");
  check.id = "myToggle";
  check.setAttribute("type", "checkbox");
  var god = toggleCompleted.toString();
  check.setAttribute("onchange", god.substring(god.indexOf("{")+1, god.lastIndexOf("}")));
  var span = document.createElement("span");
  span.textContent = "Hide completed buildings";
  div.appendChild(check);
  div.appendChild(span);content_value
  document.getElementById("content_value").insertBefore(div, document.getElementById("building_wrapper"));
}

function toggleCompleted(){
  if(document.getElementById("myToggle").checked){
    [].forEach.call(document.getElementsByClassName("inactive center"), function(toHide){
      var parent = toHide.parentNode;
      parent.setAttribute("class", "hiddenBuildings");
      parent.hidden = true;
    });
  }
  else{
    [].forEach.call(document.getElementsByClassName("hiddenBuildings"), function(toShow){
      console.log(toShow);
      toShow.hidden = false;
    });
  }
}

createElements();