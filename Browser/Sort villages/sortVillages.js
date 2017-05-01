javascript:
function sort(origin, villages){
	var distances = [[]];
	var arrVillages = villages.split(" ");
	for(i=0; i<arrVillages.length; i++){
		distances.push([getDistance(origin, arrVillages[i]), arrVillages[i]]);
	}
	sortAux(distances);
	return getSortedVillages(distances);
}
function getDistance(origin, village){
	var coords1 = origin.split("|");
	var coords2 = village.split("|");
	return Math.sqrt( Math.pow(parseInt(coords1[0])-parseInt(coords2[0]), 2) + Math.pow(parseInt(coords1[1])-parseInt(coords2[1]), 2) );
}
function sortAux(distances){
	for(var i=0; i<distances.length-1; i++){
		for(var j=i+1; j<distances.length; j++){
			if(distances[i][0] > distances[j][0]){
				var aux = distances[i];
				distances[i] = distances[j];
				distances[j] = aux;
			}
		}
	}
	return distances;
}
function getSortedVillages(distances){
	var villages = [];
	for(var i=1; i<distances.length; i++){
		villages.push(distances[i][1]);
	}
	return villages;
}
function createUI(){
	var father = document.getElementById("SkyScraperAdCell");
	var container = document.createElement("div");
	container.id = "myContainer";
	var myVillageTxt = document.createElement("input");
	myVillageTxt.id = "myVillage";
	var otherVillagesTxt = document.createElement("input");
	otherVillagesTxt.id = "otherVillages";
	var confirmBtn = document.createElement("input");
	confirmBtn.type = "button";
	confirmBtn.id = "confirm";
	confirmBtn.setAttribute("onclick", "printSortedVillages()");
	confirmBtn.value = "Sort villages";
	container.appendChild(myVillageTxt);
	container.appendChild(otherVillagesTxt);
	container.appendChild(confirmBtn);
	father.appendChild(container);
}
function printSortedVillages(){
	var result = document.getElementById("result");
	if(result == null){
		var container = document.getElementById("myContainer");
		result = document.createElement("textarea");
		result.id = "result";
		container.appendChild(result);
	}
	var myVillage = document.getElementById("myVillage").value;
	var otherVillages = document.getElementById("otherVillages").value;
	result.innerHTML = sort(myVillage, otherVillages).join(" ");
}
createUI();