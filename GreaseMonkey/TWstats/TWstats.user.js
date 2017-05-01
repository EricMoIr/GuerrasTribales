// ==UserScript==
// @name        TWstats
// @namespace   https://github.com/EricMoIr/GuerrasTribales/GreaseMonkey
// @include     /screen=info_ally/
// @include     /screen=info_player/
// @version     1
// @grant       none
// ==/UserScript==
function isAllyPage(){
  return /info_ally/.test(window.location.href);
}
function addTWSLink(){
  var id = window.location.href.match(/id=(.*)(?=&|$)/)[1];
  var page;
  var target = document.getElementById("content_value").children[0];
  if(isAllyPage()){
    page = "tribe";
  }
  else{
    page = "player";
  }
  var img = document.createElement("img");
  img.setAttribute("src", "http://i.imgur.com/l3suSqp.jpg");
  var server = game_data.market;
  var world = game_data.world;
  var anchor = document.createElement("a");
  var url = "http://"+server+".twstats.com/"+world+
      "/index.php?page="+page+
      "&id="+id;
  anchor.setAttribute("href", url);
  anchor.append(img);
  var text = document.createTextNode("TWstats");
  anchor.append(text);
  target.append(document.createTextNode("  "));
  target.append(anchor);
}
addTWSLink();