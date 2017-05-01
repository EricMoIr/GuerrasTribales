function removeNonExistantVillages(villages){
	if(document.URL.indexOf("screen=map") < 0){
		alert("This script can only be ran from the map. Redirecting now...");
		window.location.replace("https://es42.guerrastribales.es/game.php?screen=map");
	}
	var villagesArr = villages.split(" ");
	for(var i=0; i<villagesArr.length; i++){
		var pos = villagesArr[i].split("|");
		if(!TWMap.villages[1e3 * parseInt(pos[0]) + parseInt(pos[1])]){
			villagesArr.splice(i, 1);
			i--;
		}
	}
	return villagesArr.join(" ");;
}