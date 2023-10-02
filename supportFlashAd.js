// Required for Plug-in Detection
// Major version of Flash required
var requiredMajorVersion = 5; //5
// Minor version of Flash required
var requiredMinorVersion = 0;
// Minor version of Flash required
var requiredRevision = 0;
// the version of javascript supported
var jsVersion = 1.0;

// Specific to Our Solution
var clickthroughURL = new Array();
//clickthroughURL_1 has webtrend parameters
var clickthroughURL_1 = new Array();
var weblink = new Array();
var flashCount = 0;
var flashChecked = false;

function clickthrough(flashFile)
{
	var u = clickthroughURL[flashFile];
	var rCms = /popunder=cms/;
	var rChase = /popunder=chase/;
	var popUnderUrl = "";
	if (u.search(rChase) >= 0) { 
		popUnderUrl = "https://resources.chase.com/MyAccounts.aspx";
	}
	if (u.search(rCms) >= 0) { 
		popUnderUrl = "https://resources.cardmemberservices.com/MyAccounts.aspx"; 
	}
	
	if (popUnderUrl != "") {
		window.location = popUnderUrl;
		window.open(clickthroughURL[flashFile],'','width=800, height=600, resizable=yes, menubar=yes, toolbar=yes, scrollbars=yes');
	} else {
	  window.location = clickthroughURL[flashFile];  
	}
	
	/*
	//this if else block does the same thing in both sections... 
	//commenting it out 
	if (weblink[flashFile]){
		// open weblinking pop-up
		//***********NEED TO CHANGE**********
		if (popUnderUrl != "") {
			window.location = popUnderUrl;
			window.open(clickthroughURL[flashFile],'','width=800, height=600, resizable=yes, menubar=yes, toolbar=yes, scrollbars=yes');
		} else {
		  window.location = clickthroughURL[flashFile];  
		}
	}	else {
	  if (popUnderUrl != "") {
		 window.location = popUnderUrl;
		 window.open(clickthroughURL[flashFile],'','width=800, height=600, resizable=yes, menubar=yes, toolbar=yes, scrollbars=yes');
		} else {
		 window.location = clickthroughURL[flashFile];  
		}
	}
	*/
}

//this function calls RPT_Click in Reporting.js
//and then clickthrough (above)
function clickthrough_1(flashFile)
{
	if(clickthroughURL_1[flashFile].indexOf("window.open")!=-1){
	 var my_str = clickthroughURL_1[flashFile];
	 my_str = my_str.substring(my_str.indexOf("'")+1);
	 my_str = my_str.substring(0,my_str.indexOf("'"));
	 window.open(my_str,"","width=800, height=600, resizable=yes, menubar=yes, toolbar=yes, scrollbars=yes, location=yes");
	}
	//if(url.indexOf("javascript")==0){eval(decodeURI(url));}
	RPT_Click(clickthroughURL_1[flashFile]);
	if(clickthroughURL_1[flashFile].indexOf("javascript")!=-1){
    	goToMyAccounts();
    }
	//clickthrough(flashFile);
}

function firstImpression(flashFile)
{
	RPT_Impression(clickthroughURL_1[flashFile]);
}

//Flash Player Version Detection - Rev 1.6
//Detect Client Browser type
//Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE  = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion()
{
	var version;
	var axo;
	var e;

	// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

	try {
		// version will be set for 7.X or greater players
		axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
		version = axo.GetVariable("$version");
	} catch (e) {
	}

	if (!version)
	{
		try {
			// version will be set for 6.X players only
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
			
			// installed player is some revision of 6.0
			// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
			// so we have to be careful. 
			
			// default to the first public version
			version = "WIN 6,0,21,0";

			// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
			axo.AllowScriptAccess = "always";

			// safe to call for 6.0r47 or greater
			version = axo.GetVariable("$version");

		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 4.X or 5.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 3.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
			version = "WIN 3,0,18,0";
		} catch (e) {
		}
	}

	if (!version)
	{
		try {
			// version will be set for 2.X player
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			version = "WIN 2,0,0,11";
		} catch (e) {
			version = -1;
		}
	}
	
	return version;
}

//JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer(){
	// NS/Opera version >= 3 check for Flash plugin in plugin array
	var flashVer = -1;
	
	if (navigator.plugins != null && navigator.plugins.length > 0) {
		if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
			var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
			var descArray = flashDescription.split(" ");
			var tempArrayMajor = descArray[2].split(".");			
			var versionMajor = tempArrayMajor[0];
			var versionMinor = tempArrayMajor[1];
			var versionRevision = descArray[3];
			if (versionRevision == "") {
				versionRevision = descArray[4];
			}
			if (versionRevision[0] == "d") {
				versionRevision = versionRevision.substring(1);
			} else if (versionRevision[0] == "r") {
				versionRevision = versionRevision.substring(1);
				if (versionRevision.indexOf("d") > 0) {
					versionRevision = versionRevision.substring(0, versionRevision.indexOf("d"));
				}
			}
			var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
		}
	}
	// MSN/WebTV 2.6 supports Flash 4
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
	// WebTV 2.5 supports Flash 3
	else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
	// older WebTV supports Flash 2
	else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
	else if ( isIE && isWin && !isOpera ) {
		flashVer = ControlVersion();
	}	
	return flashVer;
}

//When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision)
{
	versionStr = GetSwfVer();
	if (versionStr == -1 ) {
		return false;
	} else if (versionStr != 0) {
		if(isIE && isWin && !isOpera) {
			// Given "WIN 2,0,0,11"
			tempArray         = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
			tempString        = tempArray[1];			// "2,0,0,11"
			versionArray      = tempString.split(",");	// ['2', '0', '0', '11']
		} else {
			versionArray      = versionStr.split(".");
		}
		var versionMajor      = versionArray[0];
		var versionMinor      = versionArray[1];
		var versionRevision   = versionArray[2];

     	// is the major.revision >= requested major.revision AND the minor version >= requested minor
		if (versionMajor > parseFloat(reqMajorVer)) {
			return true;
		} else if (versionMajor == parseFloat(reqMajorVer)) {
			if (versionMinor > parseFloat(reqMinorVer))
				return true;
			else if (versionMinor == parseFloat(reqMinorVer)) {
				if (versionRevision >= parseFloat(reqRevision))
					return true;
			}
		}
		return false;
	}
}

function AC_AddExtension(src, ext)
{
if (src.indexOf('?') != -1)
 return src.replace(/\?/, ext+'?');
else
 return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) 
{ 
 var str = '';
 if (isIE && isWin && !isOpera)
 {
		str += '<object ';
		for (var i in objAttrs)
			str += i + '="' + objAttrs[i] + '" ';
		for (var i in params)
			str += '><param name="' + i + '" value="' + params[i] + '" /> ';
		str += '></object>';
 } else {
		str += '<embed ';
		for (var i in embedAttrs)
			str += i + '="' + embedAttrs[i] + '" ';
		str += '> </embed>';
 }

 document.write(str);
}

function AC_FL_RunContent(){
var ret = 
 AC_GetArgs
 (  arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
  , "application/x-shockwave-flash"
 );
AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType){
var ret = new Object();
ret.embedAttrs = new Object();
ret.params = new Object();
ret.objAttrs = new Object();
for (var i=0; i < args.length; i=i+2){
 var currArg = args[i].toLowerCase();    

 switch (currArg){	
   case "classid":
     break;
   case "pluginspage":
     ret.embedAttrs[args[i]] = args[i+1];
     break;
   case "src":
   case "movie":	
     args[i+1] = AC_AddExtension(args[i+1], ext);
     ret.embedAttrs["src"] = args[i+1];
     ret.params[srcParamName] = args[i+1];
     break;
   case "onafterupdate":
   case "onbeforeupdate":
   case "onblur":
   case "oncellchange":
   case "onclick":
   case "ondblClick":
   case "ondrag":
   case "ondragend":
   case "ondragenter":
   case "ondragleave":
   case "ondragover":
   case "ondrop":
   case "onfinish":
   case "onfocus":
   case "onhelp":
   case "onmousedown":
   case "onmouseup":
   case "onmouseover":
   case "onmousemove":
   case "onmouseout":
   case "onkeypress":
   case "onkeydown":
   case "onkeyup":
   case "onload":
   case "onlosecapture":
   case "onpropertychange":
   case "onreadystatechange":
   case "onrowsdelete":
   case "onrowenter":
   case "onrowexit":
   case "onrowsinserted":
   case "onstart":
   case "onscroll":
   case "onbeforeeditfocus":
   case "onactivate":
   case "onbeforedeactivate":
   case "ondeactivate":
   case "type":
   case "codebase":
     ret.objAttrs[args[i]] = args[i+1];
     break;
   case "id":
   case "width":
   case "height":
   case "align":
   case "vspace": 
   case "hspace":
   case "class":
   case "title":
   case "accesskey":
   case "name":
   case "tabindex":
     ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i+1];
     break;
   default:
     ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i+1];
 }
}
ret.objAttrs["classid"] = classid;
if (mimeType) ret.embedAttrs["type"] = mimeType;
return ret;
}

function goToMyAccounts(){
 var _protocol = document.location.protocol;
 var _host = document.location.host;
 var _my_accounts = _protocol + "//" + _host + "/MyAccounts.aspx";
 document.location = _my_accounts;
}

function writeSWF() {
	    var oeTags = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
	    + 'width="' + flashWidth + '" height="' + flashHeight + '">'
	    + '<param name="movie" value="' + flashLocation + '" /><param name="quality" value="high" /><param name="bgcolor" value="#FFFFFF" />'
	    + '<embed src="' + flashLocation + '" quality="high" bgcolor="#FFFFFF" '
	    + 'width="' + flashWidth + '" height="' + flashHeight + '" name="detectiontest" aligh="middle"'
	    + 'play="true"'
	    + 'loop="false"'
	    + 'quality="high"'
	    + 'allowScriptAccess="sameDomain"'
	    + 'type="application/x-shockwave-flash">'
	    + '<\/embed>'
	    + '<\/object>'
		+ '<\/div>';
	    document.write(oeTags);   // embed the Flash Content SWF when all tests are passed
}

//document.write('<scr'+'ipt language="VBScript" type="text/vbscript" src="/content/ecpweb/sso/document/IEdetection.vbs"></scr'+'ipt>');
function addSWFtoDOM() {
	var oeTags = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
	+ 'width="' + flashWidth + '" height="' + flashHeight + '" name="detectiontest" id="interstitial_flash">'
	+ '<param name="movie" value="' + flashLocation + '" /><param name="quality" value="high" /><param name="bgcolor" value="#FFFFFF" />'
	+ '<embed src="' + flashLocation + '" quality="high" bgcolor="#FFFFFF" '
	+ 'width="' + flashWidth + '" height="' + flashHeight + '" name="detectiontest" id="interstitial_flash" aligh="middle"'
	+ ' play="true"'
	+ ' loop="false"'
	+ ' quality="high"'
	+ ' allowScriptAccess="sameDomain"'
	+ ' type="application/x-shockwave-flash">'
	+ '<\/embed>'
	+ '<\/object>';
	document.getElementById("img_fla_div").style.height = flashHeight+"px";
	document.getElementById("img_fla_div").style.width = flashWidth+"px";
	document.getElementById("img_fla_div").innerHTML = oeTags;
}

function addIMGtoDOM() {
	var onclick_action = "";
        if(anchor_target.indexOf("_blank")!=-1){
         onclick_action = "goToMyAccounts();";
        }
        var oeTags = '<a id="interstitital_anchor" href="' + anchor_href + '" title="' + anchor_title + '" target="' + anchor_target + '" onclick="' + onclick_action + '"><img id="interstitital_image" src="' + img_src + '" border="0" alt="' + img_alt + '" width="' + img_width + '" height="' + img_height + '" /></a>';
	document.getElementById("img_fla_div").style.height = img_height+"px";
	document.getElementById("img_fla_div").style.width = img_width+"px";
	document.getElementById("img_fla_div").innerHTML = oeTags;
}


function rejectAction(rej_obj) {
 var _qs = '';
 for(i in rej_obj){
  _qs = (_qs + (i + "=" + rej_obj[i]) + "&"); 
 }
 _qs = _qs.substring(0,_qs.length-1);
 document.location = "ViewSecureAd.aspx?" + _qs;
}

window.onload=function(){
  try{
   if(document.getElementById("accept_link").target=="_blank"){
     document.getElementById("accept_link").onclick = goToMyAccounts;
   }
  } catch(e){
  }
};
