//clickthroughURL_1 has webtrend parameters

var flash_map = new Array();
//expires when

function isValidObject(_obj){
 return _obj || false;
}

//this function calls RPT_Click in Reporting.js
//and then clickthrough (above)
function map_flash_click(flashFile,objectName,opensInNewWindow,customFunctionName)
{
	var flashFile_qs = flashFile.split("?");
	if(flashFile_qs.length>0){
	 flashFile = flashFile_qs[0];
	}
	var objectName_suffix = ("_" + objectName) || "";
	objectName = objectName || "";
	opensInNewWindow = opensInNewWindow || false;
	customFunctionName = customFunctionName || "";
	
	var static_flash_Object = flash_map[flashFile + objectName_suffix];
	static_flash_Object = static_flash_Object || flash_map[flashFile];
	static_flash_Object = static_flash_Object || "";
	
	var flash_URL = "";
	if(static_flash_Object._URL){
		if(static_flash_Object._URL!=""){
		 flash_URL = (static_flash_Object._URL);
		 if(opensInNewWindow){
		  flash_URL = "javascript: var new_win = window.open('" + flash_URL + "','','width=800, height=600, resizable=yes, menubar=yes, toolbar=yes, scrollbars=yes');";
		  //flash_URL = "javascript: popUp('" + flash_URL + "');";
		 }
		}
	} else {
	 //flash_URL = (clickthroughURL_1[flashFile]);
	 flash_URL = (flash_map[flashFile]);
	}
	var isCustomCall = static_flash_Object._CUSTOM_CALL || false;
	if(isValidObject(flash_URL)){
		if(isCustomCall){
		 eval(static_flash_Object._CUSTOM_CALL+"('" + flash_URL + "')");
		 clickthrough(flashFile);
		} else {
		 RPT_Click(flash_URL);
	     clickthrough(flashFile);
		}
	} else {
	 //ERROR
	}
}

function firstImpression(flashFile){
  var _impression_URL = "";
  if(isValidObject(flash_map[flashFile + "_impression"])){
   _impression_URL = flash_map[flashFile + "_impression"]._URL;
  }
  //_impression_URL = _impression_URL || clickthroughURL_1[flashFile];
  if(isValidObject(_impression_URL)){
   RPT_Impression(_impression_URL);
  } else {
   //ERROR
  }
}