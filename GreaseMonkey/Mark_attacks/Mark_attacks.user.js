// ==UserScript==
// @name        Mark attacks
// @namespace   https://github.com/EricMoIr/GuerrasTribales/GreaseMonkey
// @include     /screen=overview/
// @version     1
// @grant       none
// ==/UserScript==
var speedMod;
function markAttacks(){
  var worldSpeed = 0.7;//prompt("Ingrese la velocidad de este mundo (use el punto decimal si necesario", 0);
	var unitSpeed = 1.4;//prompt("Ingrese la velocidad de las unidades en este mundo (use el punto decimal si necesario", 0);
  speedMod = worldSpeed * unitSpeed;
	if(speedMod <= 0){
		alert("La velocidad no puede ser menor a 0. Corra el script de nuevo");
		return;
	}
	if(getCookie("incomings") == ""){
		setCookie("incomings", incomingId + "-" + unit);
	}
	var trs = $(".no_ignored_command");
	var coordsAdded = 0;
	var incomingIds = [];
	var containers = [];
	var remTimes = [];
	var size = 0;
	for(var i=0; i<trs.length; i++){
    var tr = $(trs[i]);
    var cells = tr.find("td");
		var remTime = cells[2].firstChild.innerHTML;
		var incomingId = cells[0].children[0].getAttribute("data-id");
		console.log(cells[0].children[0]);
		console.log(cells[0].children[0].getAttribute("data-id"));
		if(isKnownIncoming(incomingId)){
			console.log("conocido");
			if(isWrittenUnit(incomingId)){
				console.log("escrito");
				break;
			}
			else{
				console.log("no escrito");
				var unit = getKnownUnit(incomingId);
				writeUnit(incomingId, unit, cells[1]);
			}
		}
		else{
			var villageId = getCurrentVillage();
			incomingIds.push(incomingId);
			containers.push(cells[1]);
			remTimes.push(remTime);
      $.get("https://es42.guerrastribales.es/game.php?screen=reqdef&village_id="+villageId+"&id="+incomingId, function(data){
				var coordBBCode = data.match(/Origen:(.*)/)[1];
				var coords = coordBBCode.match(/\[coord\](.*)(\[\/coord\])/)[1];
				var myCoords = game_data.village.coord;
				var distance = getDistance(myCoords, coords);
				var unit = getFastestUnit(distance, remTimes[size]);
				console.log(unit);
				setCookie("incomings", getCookie("incomings") + "+" + incomingIds[size] + "-" + unit);
				writeUnit(incomingIds[size], unit, containers[size]);
				size++;
			});
		}
	}
}
function getCoordsAttacker(lines){
	var line = lines[4];
	return line.substring(7, 14);
}
function getCurrentVillage(){
    var idBegining = window.location.href.indexOf("village=") + 8;
    var idEnd = window.location.href.indexOf("&");
    return parseInt(window.location.href.substring(idBegining, idEnd));
}
function getDistance(origin, village){
	var coords1 = origin.split("|");
	var coords2 = village.split("|");
	return Math.sqrt( Math.pow(parseInt(coords1[0])-parseInt(coords2[0]), 2) + Math.pow(parseInt(coords1[1])-parseInt(coords2[1]), 2) );
}
function isKnownIncoming(incomingId){
	var cookie = getCookie("incomings");
	var incomingsKnown = cookie.split("+");
	for(var i=0; i<incomingsKnown.length; i++){
		var incoming = incomingsKnown[i].split("-");
		var id = parseInt(incoming[0]);
		if(incomingId == id){
			return true;
		}
	}
	return false;
}
function isWrittenUnit(incomingId){
	return document.getElementById(incomingId) != null;
}
function getKnownUnit(incomingId){
	var cookie = getCookie("incomings");
	var incomingsKnown = cookie.split("+");
	for(var i=0; i<incomingsKnown.length; i++){
		var incoming = incomingsKnown[i].split("-");
		var id = parseInt(incoming[0]);
		var unit = incoming[1];
		if(incomingId == id){
			return unit;
		}
	}
	return "Error at getKnownUnit of "+incomingId;
}
function writeUnit(incomingId, unit, cell){
	console.log("<span id="+incomingId+">"+unit+"</span>");
	cell.innerHTML += "<span id="+incomingId+">"+unit+"</span>";
}
function getFastestUnit(distance, remTime){
	var units = [
		{
			name: "spy",
			speed: 9
		},
		{
			name: "lc",
			speed: 10
		},
		{
			name: "hc",
			speed: 11
		},
		{
			name: "spear",
			speed: 18
		},
		{
			name: "sword",
			speed: 22
		},
		{
			name: "ram",
			speed: 30
		},
		{
			name: "noble",
			speed: 35
		}
	];
	var remTimeArr = remTime.split(":");
	var hours = parseInt(remTimeArr[0]);
	var minutes = parseInt(remTimeArr[1]);
	var seconds = parseInt(remTimeArr[2]);
	var totalTimeSeconds = seconds + minutes*60 + hours*3600;
	for(var i=0; i<units.length; i++){
		if(units[i].speed * 60 * distance / speedMod >= totalTimeSeconds){
			return units[i].name;
		}
	}
  return "Unknown";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";path=/";
}
markAttacks();