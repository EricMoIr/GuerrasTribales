var win = (window.frames.length > 0) ? window.main : window;
var coords = [];
var outputID = 'villageList';
var encodeID = 'cbBBEncode';
var isEncoded = true;

function fnRefresh() {
    win.$('#' + outputID).html(coords.map(function(e) {
        return isEncoded ? '[coord]' + e + '[\/coord]' : e;
    }).join(isEncoded ? '\n' : ' '));
}
win.$(win.document).ready(function() {
    if (win.$('#' + outputID).length <= 0) {
        if (win.game_data.screen == 'map') {
            var srcHTML = '<div id="coord_picker">' + 
						'<input type="checkbox" id="cbBBEncode" onClick="isEncoded=this.checked;fnRefresh();"' + 
						(isEncoded ? 'checked' : '') + 
						'/>BB-Codes<br/>' + '<textarea id="' + 
						outputID + 
						'" cols="40" rows="10" value="" onFocus="this.select();"/>' + 
						'</div>';
            ele = win.$('#map_big').after(win.$(srcHTML));
            win.TWMap.map._handleClick = function(e) {
				console.log(this.handler.onClick.toString());
                		var pos = this.coordByEvent(e);
				console.log(TWMap.villages[1e3 * pos[0] + pos[1]]);
				if(!TWMap.villages[1e3 * pos[0] + pos[1]])
					return;
                var coord = pos.join("|");
                var ii = coords.indexOf(coord);
                if (ii >= 0) {
                    coords.splice(ii, 1);
                } else {
                    coords.push(coord);
                }
                fnRefresh();
                return false;
            };
        } else {
            alert("Run this script from the Map.\nRedirecting now...");
            self.location = win.game_data.link_base_pure.replace(/screen\=\w*/i, "screen=map");
        }
    }
});
void(0);