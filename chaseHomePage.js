Page({
	"commands": [
		{
			"selector": "#dhpmarquee,#dhplefttile,#dhprighttile",
			"method": "Spinner"
		},
		{
			"event": "adUpdate adFailover",
			"bindTo": "#dhpmarquee,#dhplefttile,#dhprighttile",
			"selector": "#dhpmarquee,#dhplefttile,#dhprighttile",
			"method": "Spinner",
			"arguments": "hide"
		},
		{
			"event": "adComplete",
			"bindTo": "#dhpmarquee,#dhplefttile,#dhprighttile",
			"method": "checkAccessibility"
		},
		{
			"selector": "#dhpmarquee",
			"method": "DoubleClickAd",
			"arguments": {
				"height": 150,
				"width": 572
			}
		},
		{
			"selector": "#dhplefttile",
			"method": "DoubleClickAd",
			"arguments": {
				"height": 90,
				"width": 155,
				"pid": "t1"
			}
		},
		{
			"selector": "#dhprighttile",
			"method": "DoubleClickAd",
			"arguments": {
				"height": 90,
				"width": 155,
				"pid": "t2"
			}
		},
		{
			"source": "$.tag",
			"method": "DoubleClickAdService",
			"arguments": {
				"selector": "#dhpmarquee,#dhplefttile,#dhprighttile",
				"personaData": "AOC,busc,GUID,fieir,fpeir,pplr,RPC,segment,sieir,tieir,zip,known,segg",
				"locationData": "cell,msc,source",
				"referrerData": "cell,msc",
				"siteName": "chs.home",
				"zoneName": "home"
			}
		},
		{
			"event": "dataUpdate",
			"source": "$.ui",
			"method": "LocalContentService"
		}
	]
});