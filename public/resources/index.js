document.addEventListener("DOMContentLoaded", function() {
	var bright = document.getElementById("vector-bright");
	if(bright) {
		if (!mapboxgl.supported()) {
			var vectorMapContainer = document.getElementById("vector-map");
			vectorMapContainer.innerHTML = 'Your browser does not support Mapbox GL. Either your browser does not support WebGL or it is disabled, please check <a href="https://get.webgl.org/">http://get.webgl.org</a> for more information.'
		} else {
			var vectorMap = new mapboxgl.Map({
			    container: 'vector-map',
			    style: 'styles/bright.json'
			}).addControl(new mapboxgl.Navigation());
			vectorMap.scrollZoom.disable();
		}
	}

	var basic = document.getElementById("vector-basic");

	var styleConfig = {
	  value: getJsonCode("bright"),
	  lineNumbers: true,
	  readOnly: true,
	  mode:  "javascript",
	  json: true
	};
	var jsonCodeMirror = CodeMirror(document.querySelector("#map-style-code"), styleConfig);

	var config = {
	  value: getHtmlCode("bright"),
	  lineNumbers: true,
	  readOnly: true,
	  mode:  "htmlmixed"
	};
	var htmlCodeMirror = CodeMirror(document.querySelector("#map-code"), config);

	if(bright && basic) {
		var styleUrl = "styles/";
		addOnClickEventListener(bright, vectorMap, styleUrl + "bright.json", htmlCodeMirror, getHtmlCode("bright"), jsonCodeMirror, getJsonCode("bright"));
		addOnClickEventListener(basic, vectorMap, styleUrl + "basic.json", htmlCodeMirror, getHtmlCode("basic"), jsonCodeMirror, getJsonCode("basic"));
	}	

	// instantiate map clipboard
	new Clipboard('.map-clipboard-button', {
	    text: function(trigger) {
	        return htmlCodeMirror.getDoc().getValue();
	    }
	});
});

function addOnClickEventListener(element, vectorMap, styleUrl, htmlCodeMirror, htmlCode, jsonCodeMirror, jsonCode) {
	element.onclick = function(e) {
		e.preventDefault();
        e.stopPropagation();
        vectorMap.setStyle(styleUrl);
        htmlCodeMirror.setValue(htmlCode);
        jsonCodeMirror.setValue(jsonCode);
	}
}

function getHtmlCode(name) {
	var href = window.location.href;
	var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
	return "<!DOCTYPE html>\n<html>\n<head>\n\t<meta charset='utf-8'/>\n\t<title>OSM2VectorTiles with " + capitalizedName + " style</title>\n\t<meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no'/>\n\t<script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.js'></script>\n\t<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.18.0/mapbox-gl.css' rel='stylesheet'/>\n\t<style>\n\t\tbody{margin:0; padding:0;}\n\t\t#map{position:absolute; top:0; bottom:0; width:100%;}\n\t</style>\n</head>\n<body>\n\t<div id='map'></div>\n\t<script>\n\t\tvar map = new mapboxgl.Map({\n\t\t\tcontainer: 'map', // container id\n\t\t\tstyle: '" + href + "styles/" + name + ".json'\n\t\t});\n\t</script>\n</body>\n</html>";
}

function getJsonCode(name) {
	var href = window.location.href;
	var capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
	return '{\n\t"version" : 8,\n\t"name" : "' + capitalizedName + '",\n\t"sources" : {\n\t\t"mapbox" : {\n\t\t\t"type" : "vector",\n\t\t\t"tiles" : [\n\t\t\t\t"' + href + "data/osm2vectortiles/{z}/{x}/{y}.pbf" + '"\n\t\t\t],\n\t\t\t"maxzoom": 14\n\t\t\t}\n\t},\n\t"sprite": "' + href + "styles/" + name + "/sprite" + '",\n\t"glyphs": "' + href + "fonts/{fontstack}/{range}.pbf" + '",\n\t"metadata": {...},\n\t"layers": [...]\n}';
}

function showCopiedHint() {
	var mapClipboardText = document.querySelector("#map-clipboard-text");
	mapClipboardText.innerText = "Copied to clipboard!";
	setTimeout(function(){
		mapClipboardText.innerText = "Copy example";
	}, 800);
}
