var _is_outage_message_on = true;
var _outage_message = "We're currently updating our website to maintain the best online experience. Please log on later.";

try{
	if(_is_outage_message_on){
		$(".outage img").attr("alt",_outage_message);
	}
} catch(e){
}