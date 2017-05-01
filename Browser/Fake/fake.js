function fake() {
	var c = "558|430";
	var limit = 1;
	var w = window.content? window.content : window;
	var d = w.document;

	var screen = d.URL.match(/screen=([^&]*)/)[1];
	if (screen !== "place") {
		alert('Este script solo funciona desde la plaza de reuniones. Redireccionando...');
		window.location.replace(d.URL.replace(screen, "place"));
	}
	else{
	   var a = c.match(/(\d+\|\d+)/g);
	   var b = a[Math.floor(Math.random()*a.length)].split("|");
	   d.forms[0].x.value = b[0];
	   d.forms[0].y.value = b[1];
	   d.forms[0].spear.value = 0;
	   d.forms[0].sword.value = 0;
	   d.forms[0].axe.value = 0;
	   d.forms[0].spy.value = limit > 0 && game_data.village.points / 100 >= 5? Math.ceil(game_data.village.points / 100 - 5)/2 : 0;
	   d.forms[0].light.value = 0;
	   d.forms[0].heavy.value = 0;
	   d.forms[0].ram.value = 1;
	   d.forms[0].catapult.value = 0;
	   d.forms[0].snob.value = 0;
	   d.forms[0].knight.value = 0;
	}
}
fake();