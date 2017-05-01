function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(d.cookie);
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
    w.content.document.cookie = cname + "=" + cvalue + ";path=/";
}
function farm() {
	clearMessages();
	var c = "591|445";
	var farms = c.split(" ").length;
	var cName = "village";
	if (getCookie(cName) == "") {
		setCookie(cName, 0);
	}
	var remainingVillages = farms - parseInt(getCookie(cName)) - 1;
	writeMessage("Quedan " + remainingVillages + " pueblos", "pueblos");
	var captcha = d.getElementById("bot_check");
	if(captcha != null){
		return "ERROR: Salio el captcha";
	}
	var screen = d.URL.match(/screen=([^&]*)/)[1];
	if (screen !== "place") {
		alert('Este script solo funciona desde la plaza de reuniones. Redireccionando...');
		window.location.replace(d.URL.replace(screen, "place"));
	}
	var troops = {
		spear: 0,
		sword : 0,
		axe : 0,
		spy: 0,
		light: 4,
		heavy: 0,
		ram : 0,
		catapult: 0,
		snob: 0,
		knight: 0
	};
	if(!hasEnoughTroops(troops)){
		return "ERROR: No hay suficientes tropas";
	}
	var a = c.match(/(\d+\|\d+)/g);
	var b = a[getCookie(cName)].split("|");
	d.forms[0].x.value = b[0];
	d.forms[0].y.value = b[1];
	d.forms[0].spear.value = troops.spear;
	d.forms[0].sword.value = troops.sword;
	d.forms[0].axe.value = troops.axe;
	d.forms[0].spy.value = troops.spy;
	d.forms[0].light.value = troops.light;
	d.forms[0].heavy.value = troops.heavy;
	d.forms[0].ram.value = troops.ram;
	d.forms[0].catapult.value = troops.catapult;
	d.forms[0].snob.value = troops.snob;
	d.forms[0].knight.value = troops.knight;
	
	if (remainingVillages == 0) {
		setCookie(cName, 0);
	}
	else{
		setCookie(cName, parseInt(getCookie(cName)) + 1);
	}
	return "ok";
}
function hasEnoughTroops(troops){
	var d = w.content.document;
	for(var unit in troops){
		var currTroopsStr = d.getElementById("units_entry_all_"+unit).innerHTML;
		var currTroops = parseInt(currTroopsStr.substring(1, currTroopsStr.length-1));
		if(troops[unit] > currTroops)
			return false;
	}
	return true;
}
function writeMessage(msg, id){
	var div = d.getElementById(id);
	if(div == null){
		div = d.createElement("h3");
		div.id = id;
		div.className = "msg";
		div.style.color = "red";
		d.getElementsByTagName("h3")[0].append(div);
	}
	else{
		div.innerHTML = ""
	}
	div.innerHTML += msg;
}
function clearMessages(){
	var msgs = d.getElementsByClassName("msg");
	for(var i=0; i<msgs.length; i++){
		msgs[i].outerHTML = "";
	}
}
var w = window.content;
var d = w.content.document;
var ret = farm();
if(ret !== "ok")
	writeMessage(ret, "error");