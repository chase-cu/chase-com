function checkAccessibility(){

	$("a[target=_blank]").each(function(_n){
		var _title = $(this).attr("title");
		_title = _title || "Opens new Window.";
		
		if(_title.toLowerCase().indexOf("new window")==-1){
		 _title = "Opens new Window. " + _title;
		}
		
		$(this).attr("title",_title);
	});

	var HAS_VALID_FLASH_VERSION = false;

	try{
	 HAS_VALID_FLASH_VERSION = DetectFlashVer(7, 7, 7);
	} catch(e){
	 HAS_VALID_FLASH_VERSION = false;
	}

	try{
	if(!HAS_VALID_FLASH_VERSION){
			$(".accessible").next().css("display","none");
	    	$("object[wmode]").css("display","none");
	        $("embed[wmode]").css("display","none");
	        var _t = setTimeout('$("embed[wmode]").css("display","none")',100);
	        $(".accessible").css({"filter": "alpha(opacity=100)", "-khtml-opacity": "1", "-moz-opacity": "1", "opacity": "1", "left": "0", "position": "relative" });
	        $(".accessible img").css({ "filter": "alpha(opacity=100)", "-khtml-opacity": "1", "-moz-opacity": "1", "opacity": "1", "left": "0", "position": "relative" });
	}
	} catch(e){
	}
	}

	checkAccessibility();