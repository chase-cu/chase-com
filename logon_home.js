var vEditableOptionIndex_A = 0;
var seltext="Enter User Name"
var myarr=null;

var _userId = "";
var _password = "";
var _password_org = "";
var _lob = "";
var _cookieDomain = "";


var _reTryInterval = 1000;
var _maxReTryCount = 5;
var reTryCount=0;
	
function bolInfoIconPopup(aURL)
{
	var newWin = window.open(aURL,"bol","scrollbars=yes,screenX=0,screenY=0,directories=0,height=300,width=500,location=no,menubar=no,resizable=yes,status=no,toolbar=no");
	newWin.focus();
}

function validateAndSubmitFrame() 
{

	reTryCount++;
	var iframe;
	var iframeDoc;
	var iframeForm;
	var siteId = "COL";
	var errorUrl = "https://chaseonline.chase.com";
	document.domain = _cookieDomain.substring(1, _cookieDomain.length);
	//alert(cookie_domain);
	if(_cookieDomain == ".cardmemberservices.com")
	{
		siteId = "CMS";
		errorUrl = "https://online.cardmemberservices.com";
	}
	try
	{
		if (document.all) 
		{
			iframe = document.getElementById("loginframe");
			iframeDoc = iframe.Document;
			iframeForm = iframeDoc.getElementById("login");
		}
		else 
		{
			iframe = window.frames['loginframe'];
			iframeDoc = iframe.document;   
			iframeForm = iframeDoc.login;
		}


		iframeForm.auth_siteId.value = siteId;
		iframeForm.auth_userId.value = _userId;
		iframeForm.auth_passwd.value = _password;
		iframeForm.auth_passwd_org.value = _password_org;
		iframeForm.LOB.value = _lob;
		iframeForm.auth_externalData.value ='LOB='+_lob;
		iframeForm.submit()
	}
	catch(e)
	{
//alert(e.description);
		if(reTryCount >= _maxReTryCount)
		{ 
			/* added for WO 110813  */					
			errorUrl = errorUrl+"/Logon.aspx?error=L009&LOB="+_lob+"&src="+encodeURIComponent(window.location.href);
			/*  end added for WO 110813 */
			window.location.href=errorUrl;
		}
		else
		{
			setTimeout("validateAndSubmitFrame()",_reTryInterval);
		}
		
	}

	return(false);
}
  
function validateandsetcookie(userID, pwd, remember_me, domain, lob)
{

	if(reTryCount == 0)
	{

		if((userID.value.length==0) && (pwd.length==0))
		{
			alert("Error Message LO001:\nPlease enter both your User ID and Password.");
			return false;
		}

		chk1 = uidcheck(userID.value);
		chk2=pwdcheck(pwd);

		if((chk1==0) && (chk2==0))
		{	
			userID.value = userID.value.toLowerCase();
			setRememberMeCookie(remember_me, domain);

			_userId = userID.value.toLowerCase();
			_password = pwd.toLowerCase();
			_password_org = pwd;
			_lob = lob;
			_cookieDomain = domain;

			validateAndSubmitFrame();
		}
	}
	return false;
}


function uidcheck(userId)
{	
//				var selindex=userId.selectedIndex;
//				if(selindex!=-1)
//				{
					
//					var uidval=userId[selindex].text;
					////alert(selitem)
//				}
//	ulen=uidval.length
	ulen=userId.length;
	uidval=userId;
////alert("userId is "+ulen+" chars");
	var flag1=0
	var alphaNumericStr = "abcdefghijklmnopqrstuvwxyz0123456789_"
		
	if(ulen==0)
	{
		alert("Error Message LO001:\nPlease enter both your User ID and Password.");
		return 1;	
	}	
	
	if(!(ulen<=32))
	{
		alert("Error Message LO001:\nThe User ID you entered is not valid. \nYour User ID needs to be less than 32 characters long.")
		return 1;
	}
	
	for (i=0;i<uidval.length;i++)
	{
		if (!(alphaNumericStr.indexOf(uidval.substring(i,i+1).toLowerCase() ) >= 0))
		{	
			flag1=1;
		}
	}

	if(flag1==1)
	{	
		alert("Error Message LO011:\nThe User ID and/or Password you entered is not valid.\nYour User ID and Password must consist only of letters and numbers.");
		return 1;
	}
		
	return 0;	
}


function pwdcheck(pwd)
{	
	pspace=0
	plen=pwd.length
	if(plen==0)
	{
		alert("Error Message LO001:\nPlease enter both your User ID and Password.");
		return 1;		
	}
	
		
	else if(plen>32)
	{
		alert("Password needs to be less than 32 characters long.Please re-enter Password");		
		return 1;
	}
	
	return 0;	
}

function setRememberMeCookie(remeber_me, domain)
{
	if(remeber_me==true)
	{
		//document.cookie="_tmprememberme=1; expires=0; path=/; domain="+domain; 
		document.cookie = "_tmprememberme=1;path=/;domain="+domain;
//alert("setting rememberme cookie");
	}
	else
	{
		//document.cookie="_tmprememberme=0; expires=0; path=/; domain="+domain; 
		document.cookie = "_tmprememberme=0;expires=0;path=/;domain="+domain;
	}
}

		
	var remflag1=0
	//var remflag2=0


	if(document.cookie.match("_rememberme"))
	{	
		ckval=readCookie("_rememberme")
//alert("ckval = "+ckval);
		if (ckval==null || ckval.substr(0,1)==";") {ckval="";} // Added Firefox compatibility -- blanked cookies are stored as "[cookiename]=;"
//alert("ckval = "+ckval);
		remflag1=(ckval==null)?0:1;
		myarr = new Array(1);

		var arr=ckval.split("|")

		myarr[0] = arr[0];
//alert("myarr[0]="+myarr[0]);
//		cklen=arr.length
//alert("3) ckval="+ckval);					
//			if(cklen!=0)
//			{
//				myarr = new Array(cklen)
				//myarr[0]=seltext

//				for(i=0;i<cklen;i++)
//				{
//					myarr[i]=arr[i];
//					if(i==19)
//						break;
//				}
								
				
//			}

	}




function showAll(userid,remember_me)
	{		
//alert("in showAll\nmyarr="+myarr+"\nremflag1="+remflag1);		
		chkbox = document.logonform.remember;
		if(myarr!=null && remflag1==1)
		{
//alert("myarr before sort\n"+myarr);		
//			myarr.sort();
//alert("myarr after sort\n"+myarr);			
			//userid.options[0].text=myarr[myarr.length-1]

			userid.value = myarr[0]; //converted from dropdown to single field
			
			for(i=1;i<=myarr.length;i++)
			{
				//userid.options[i] = new Option(myarr[i-1]);
				////alert(userid.options[i]+"options"+i)
				////alert(myarr[i]+"arr"+i)
			}

		chkbox.checked=true;
												
		}	
		else if(myarr==null)
		{
//alert("in myarr null");
			//userid.options[0].text=seltext;
			chkbox.checked=false;
		}

try {
		if(myarr[0]==null || myarr[0]=="")
		{
//alert("in myarr[0] null");
			chkbox.checked=false;
		}
	}
catch(err) {
			chkbox.checked=false;
	}





	}
   
   var vEditableOptionText_A = "--?--";
   //var vEditableOptionText_A = "";
 
   
  
 
   var vPreviousSelectIndex_A = 0;
   // Contains the Previously Selected Index, set to 0 by default
 
   var vSelectIndex_A = 0;
   // Contains the Currently Selected Index, set to 0 by default
 
   var vSelectChange_A = 'MANUAL_CLICK';
   // Indicates whether Change in dropdown selected option
   // was due to a Manual Click
   // or due to System properties of dropdown.
 
   // vSelectChange_A = 'MANUAL_CLICK' indicates that
   // the jump to a non-editable option in the dropdown was due
   // to a Manual click (i.e.,changed on purpose by user).
 
   // vSelectChange_A = 'AUTO_SYSTEM' indicates that
   // the jump to a non-editable option was due to System properties of dropdown
   // (i.e.,user did not change the option in the dropdown;
   // instead an automatic jump happened due to inbuilt
  // dropdown properties of browser on typing of a character )


function readCookie(name) 
{
	var NameOfCookie=name;
	if (document.cookie.length > 0) 
	{ 
//alert(document.cookie);
		begin = document.cookie.indexOf(NameOfCookie+"="); 
//alert("begin="+begin);		
		if (begin != -1) // Note: != means "is not equal to"
		{ 
			begin += NameOfCookie.length+1; 
//alert("begin="+begin);			
			//end = document.cookie.indexOf(";", begin);
			end = document.cookie.lastIndexOf("|");
//alert("end="+end);			
			if (end == -1) end = document.cookie.length;
//alert("end="+end);
				return unescape(document.cookie.substring(begin, end)); 

		} 
	}
	return null; 
}
