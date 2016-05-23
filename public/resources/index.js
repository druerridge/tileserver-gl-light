document.addEventListener("DOMContentLoaded", function() {
	var bright = document.getElementById("vector-bright");
	if(bright) {
		if (!mapboxgl.supported()) {
			var vectorMapContainer = document.getElementById("vector-map");
			vectorMapContainer.innerHTML = 'Your browser does not support Mapbox GL. Either your browser does not support WebGL or it is disabled, please check <a href="https://get.webgl.org/">http://get.webgl.org</a> for more information.'
		} else {
			var vectorMap = new mapboxgl.Map({
			    container: 'vector-map',
			    style: 'styles/bright.json',
			    center: [8.5456, 47.3739],
			    zoom: 11
			}).addControl(new mapboxgl.Navigation());
			vectorMap.scrollZoom.disable();
			window.selectedStyle = 0;
		}
	}

	var basic = document.getElementById("vector-basic");
	var streets = document.getElementById("vector-streets");
	var dark = document.getElementById("vector-dark");
	var light = document.getElementById("vector-light");
	var bright_code = "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset='utf-8'/>\n\t<title>OSM2VectorTiles with Bright style</title>\n\t<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'/>\n\t<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js'></script>\n\t<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet'/>\n\t<style>\n\t\tbody{margin:0; padding:0;}\n\t\t#map{position:absolute; top:0; bottom:0; width:100%;}\n\t</style>\n</head>\n<body>\n\t<div id='map'></div>\n\t<script>\n\t\tvar map = new mapboxgl.Map({\n\t\t\tcontainer: 'map', // container id\n\t\t\tstyle: 'http://localhost:8080/styles/bright.json',\n\t\t\tcenter: [8.5456, 47.3739], // starting position\n\t\t\tzoom: 11 // starting zoom\n\t\t});\n\t</script>\n</body>\n</html>";
	var basic_code = "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset='utf-8'/>\n\t<title>OSM2VectorTiles with Basic style</title>\n\t<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'/>\n\t<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js'></script>\n\t<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet'/>\n\t<style>\n\t\tbody{margin:0; padding:0;}\n\t\t#map{position:absolute; top:0; bottom:0; width:100%;}\n\t</style>\n</head>\n<body>\n\t<div id='map'></div>\n\t<script>\n\t\tvar map = new mapboxgl.Map({\n\t\t\tcontainer: 'map', // container id\n\t\t\tstyle: 'http://localhost:8080/styles/basic.json',\n\t\t\tcenter: [8.5456, 47.3739], // starting position\n\t\t\tzoom: 11 // starting zoom\n\t\t});\n\t</script>\n</body>\n</html>";
	var streets_code = "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset='utf-8'/>\n\t<title>OSM2VectorTiles with Streets style</title>\n\t<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'/>\n\t<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js'></script>\n\t<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet'/>\n\t<style>\n\t\tbody{margin:0; padding:0;}\n\t\t#map{position:absolute; top:0; bottom:0; width:100%;}\n\t</style>\n</head>\n<body>\n\t<div id='map'></div>\n\t<script>\n\t\tvar map = new mapboxgl.Map({\n\t\t\tcontainer: 'map', // container id\n\t\t\tstyle: 'http://localhost:8080/styles/streets.json',\n\t\t\tcenter: [8.5456, 47.3739], // starting position\n\t\t\tzoom: 11 // starting zoom\n\t\t});\n\t</script>\n</body>\n</html>";
	var dark_code = "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset='utf-8'/>\n\t<title>OSM2VectorTiles with Dark style</title>\n\t<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'/>\n\t<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js'></script>\n\t<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet'/>\n\t<style>\n\t\tbody{margin:0; padding:0;}\n\t\t#map{position:absolute; top:0; bottom:0; width:100%;}\n\t</style>\n</head>\n<body>\n\t<div id='map'></div>\n\t<script>\n\t\tvar map = new mapboxgl.Map({\n\t\t\tcontainer: 'map', // container id\n\t\t\tstyle: 'http://localhost:8080/styles/dark.json',\n\t\t\tcenter: [8.5456, 47.3739], // starting position\n\t\t\tzoom: 11 // starting zoom\n\t\t});\n\t</script>\n</body>\n</html>";
	var light_code = "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset='utf-8'/>\n\t<title>OSM2VectorTiles with Light style</title>\n\t<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'/>\n\t<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js'></script>\n\t<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet'/>\n\t<style>\n\t\tbody{margin:0; padding:0;}\n\t\t#map{position:absolute; top:0; bottom:0; width:100%;}\n\t</style>\n</head>\n<body>\n\t<div id='map'></div>\n\t<script>\n\t\tvar map = new mapboxgl.Map({\n\t\t\tcontainer: 'map', // container id\n\t\t\tstyle: 'http://localhost:8080/styles/light.json',\n\t\t\tcenter: [8.5456, 47.3739], // starting position\n\t\t\tzoom: 11 // starting zoom\n\t\t});\n\t</script>\n</body>\n</html>";
	
	var config = {
	  value: bright_code,
	  lineNumbers: true,
	  readOnly: true,
	  mode:  "htmlmixed"
	};
	var myCodeMirror = CodeMirror(document.querySelector("#map-code"), config);

	if(bright && basic && streets && dark && light) {
		var styleUrl = "styles/";
		addOnClickEventListener(bright, vectorMap, styleUrl + "bright.json", myCodeMirror, bright_code);
		addOnClickEventListener(basic, vectorMap, styleUrl + "basic.json", myCodeMirror, basic_code);
		addOnClickEventListener(streets, vectorMap, styleUrl + "streets.json", myCodeMirror, streets_code);
		addOnClickEventListener(dark, vectorMap, styleUrl + "dark.json", myCodeMirror, dark_code);
		addOnClickEventListener(light, vectorMap, styleUrl + "light.json", myCodeMirror, light_code);
	}	


	// instantiate map clipboard
	new Clipboard('.map-clipboard-button', {
	    text: function(trigger) {
	        return myCodeMirror.getDoc().getValue();
	    }
	});
});

function addOnClickEventListener(element, vectorMap, styleUrl, myCodeMirror, codeString) {
	element.onclick = function(e) {
		e.preventDefault();
        e.stopPropagation();
        vectorMap.setStyle(styleUrl);
        myCodeMirror.setValue(codeString);

	}
}

function showCopiedHint() {
	var mapClipboardText = document.querySelector("#map-clipboard-text")
	mapClipboardText.innerText = "Copied to clipboard!";
	setTimeout(function(){
		mapClipboardText.innerText = "Copy example";
	}, 800);
}
