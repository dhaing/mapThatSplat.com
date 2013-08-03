var map;
var ajaxRequest;
var splatlist;
var splatlayers=[];

function initmap() {
    // set up the map
    map = new L.Map('map');
    
    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © OpenStreetMap contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});		
    
    map.setView(new L.LatLng(52.5, -1.8),9);
    map.addLayer(osm);
    
    ajaxRequest = getXmlHttpObject();
    askForSplats();
}

function getXmlHttpObject() {
    if (window.XMLHttpRequest) { return new XMLHttpRequest(); }
    if (window.ActiveXObject)  { return new ActiveXObject("Microsoft.XMLHTTP"); }
    return null;
}

function askForSplats() {
    var msg = "/mapThatSplat/splats.php";
    ajaxRequest.onreadystatechange = splatsDownloaded;
    ajaxRequest.open('GET', msg, true);
    ajaxRequest.send(null);
}

function splatsDownloaded() {
    // if AJAX returned a list of markers, add them to the map
    if (ajaxRequest.readyState==4) {
	//use the info here that was returned
	if (ajaxRequest.status==200) {
	    splatlist=eval("(" + ajaxRequest.responseText + ")");
	    splatTheSplats(splatlist);
	}
    }
}

function splatTheSplats(splatlist) {
    removeSplats();
    for (i=0;i<splatlist.length;i++) {
	var splatll = new L.LatLng(splatlist[i].lat,splatlist[i].lon, true);
	var splatmark = new L.Marker(splatll);
	splatmark.data=splatlist[i];
	map.addLayer(splatmark);
	splatmark.bindPopup("<h5>"+splatlist[i].name+"</h5><img style='width: 100px' src='"+splatlist[i].img+"'>");
	splatlayers.push(splatmark);
    }
}

function removeSplats() {
    for (i=0;i<splatlayers.length;i++) {
	map.removeLayer(splatlayers[i]);
    }
    splatlayers=[];
}


