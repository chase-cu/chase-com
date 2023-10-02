function popUp(URL)
{
    pipeIndex = URL.indexOf("|");
	pipeIndexPlusOneVal = URL.substring(pipeIndex+1, pipeIndex+2);
    if (pipeIndex == -1){
		var leftOffset=0;
		var topOffset=0;    
		if(screen.width)
		{
			if(screen.width < 800)
			{
				leftOffset=60;
				topOffset=90;
			}
			else
			{
				if(screen.width>=800&&screen.width<1024)
				{
					leftOffset=160;
					topOffset=134;
				}
				else
				{
					if(screen.width>=1024)
					{
						leftOffset=272;
						topOffset=250;
					}
				}
			}
		}
		var winParam = "left=0,top=0,resizable=yes,scrollbars=yes,menubar=yes,location=yes,height="+screen.height+",width="+screen.width;
	}
	else if (pipeIndexPlusOneVal == "|")
	{
		var leftOffset=0;
		var topOffset=0;    
		if(screen.width)
		{
			if(screen.width < 800)
			{
				leftOffset=60;
				topOffset=90;
			}
			else
			{
				if(screen.width>=800&&screen.width<1024)
				{
					leftOffset=160;
					topOffset=134;
				}
				else
				{
					if(screen.width>=1024)
					{
						leftOffset=272;
						topOffset=250;
					}
				}
			}
		}
		var winParam = "left=0,top=0,resizable=yes,scrollbars=yes,menubar=yes,location=yes,height="+screen.height+",width="+screen.width;
	}
	else {
		var winParam = URL.substring(pipeIndex+1, URL.length);
		URL = URL.substring(0, pipeIndex);
	}
    //alert(winParam);
    //var webWin=window.open(URL,"winview",'left='+leftOffset+',top='+topOffset+',screenx='+leftOffset+',screeny='+topOffset+',resizable=yes,scrollbars=yes,menubar=yes,location=yes');
    var webWin=window.open(URL,"winview",winParam);
    webWin.focus();
}

function popUp_ignorePipes(URL)
{
var leftOffset=0;
var topOffset=0;    
if(screen.width)
{
	if(screen.width < 800)
	{
		leftOffset=60;
		topOffset=90;
	}
	else
	{
		if(screen.width>=800&&screen.width<1024)
		{
			leftOffset=160;
			topOffset=134;
		}
		else
		{
			if(screen.width>=1024)
			{
				leftOffset=272;
				topOffset=250;
			}
		}
	}
}
var winParam = "left=0,top=0,resizable=yes,scrollbars=yes,menubar=yes,location=yes,height="+screen.height+",width="+screen.width;
var webWin=window.open(URL,"winview",winParam);

try{
webWin.focus();
} catch(e){
}

}