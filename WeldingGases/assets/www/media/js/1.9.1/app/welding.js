var username = localStorage.getItem("username");
var token = localStorage.getItem("token");
var sap = localStorage.getItem("sap");
var email = localStorage.getItem("email");
var street = localStorage.getItem("street");
var zip = localStorage.getItem("zip");
var city = localStorage.getItem("city");
var country = localStorage.getItem("country");
var sapnumero = 0 ;

function Product(result)

{
	this.barcode="" ;
	this.empty=false ;
	this.productname = result.productname ;
	this.materialnumber = result.materialnumber ;
	this.materialname = result.materialname ;
	this.composition = result.composition ;
	this.application = result.application ;
	this.explanatory = result.explanatory ;
	this.qty = 1 ;

}

var currentproduct = null ;
var Basket = new Array() ;
var counter = 0 ;

 var isEven = function(value) {
	return value%2 == 0 ; } ;
 
var requestsapproduct = function(sapnumber) {
	requestproduct("http://show-how.info/liferay/requestproduct/",sapnumber);
} ;

var requestmaterial = function(sapnumber) {
	requestproduct("http://show-how.info/liferay/requestmaterial/",sapnumber);
} ;


var requestproduct = function(url,sapnumber){
	showOverlay();
	require(["dojo/request/xhr","dojo/dom"], function(xhr,dom) {
			
			xhr(url , {
		        timeout: 10000,
		        data: {
		        	 'number': sapnumber 	 
		        },
		        handleAs : "json" ,
		        method : 'POST'}).then( function(result) {  

		    	    
		  	      currentproduct = new Product(result);
		  	      currentproduct.barcode = sapnumber ;
		  	      sapnumero = sapnumber ;
		  	 	  dom.byId("bc").innerHTML = currentproduct.barcode;
		  	      dom.byId("seg").innerHTML = gettext(result.segment); 
		  	      dom.byId("pd").innerHTML = result.productname;
		  	      dom.byId("norm").innerHTML =result.standard;
		  	      dom.byId("composition").innerHTML = result.composition ;
		  	      dom.byId("application").innerHTML = result.application ;
		  		  dom.byId("emailshow").innerHTML = localStorage.getItem("email");
		  	      dom.byId("ts").innerHTML = '<img src="media/img/tds.png" /><img src="media/img/tss.png" />';
		  	      dom.byId("qi").innerHTML = result.explanatory ;
		  	      dom.byId("response2").innerHTML = "" ;	
		  
		  	      jumpto("product0") ;

		            },
		              function(err) {
		            	  show_popup_message(gettext("Failed to retrieve productinformation")); 
		            	  jumpto("home");
		            } 
		            
		          		
		          	) }  )  
		          	hideOverlay() ;  }


function send2mail(){
	
   if ((!localStorage.getItem("email")) || (localStorage.getItem("email")=="") ) {
     jumpto("login"); } 
   
   else {
  
  require([ "dojo/request/xhr","dojo/dom"], function(xhr,dom){
  
  xhr("http://show-how.info/store_extras/sendTechurl/",
      {
      timeout: 10000,
      data: {
          'product': sapnumero ,
          'email' : localStorage.getItem("email"),
          'language' : "de",
          'private' : true,         
          'country' : localStorage.getItem("country")        
          
      },
      method : "POST"}
  ).then( function(result) {
	
          if(result == "ok") {

        	  show_popup_message(gettext("Email sent"));
          }
          else {
        	  show_popup_message(gettext("Failed to send to your email address"));
          }
      },
      function(err){ 
    	  show_popup_message(gettext("Failed to send to your email address"));})
   
  })}}
  

function send2mail2(){
	

  
  require([ "dojo/request/xhr","dojo/dom"], function(xhr,dom){
	  
	   if (!isEmail(dom.byId("emailshow2").value)) { 
		 	  show_popup_message(gettext("Not a valid Email adress"));	   
		   }
	   
	   else {
  

  xhr("http://show-how.info/store_extras/sendTechurl/",
      {
      timeout: 10000,
      handleAs : "json" ,
      data: {
          'product': sapnumero ,
          'email' : dom.byId("emailshow2").value,
          'language' : "de",
          'private' : true,         
          'country' : localStorage.getItem("country")        
          
      },
      method : "POST"}
  ).then( function(result) {
          if(result.result == "ok") {
        	  alert(result);
        	  show_popup_message(gettext("Send to ") + dom.byId("emailshow2").value);
          }
          else {
        	  show_popup_message(gettext("Failed to send to the email address"));
          }
      },
      function(err){
    	  show_popup_message(gettext("Failed to send to the email address"));})
   
  }})} ;


var udata = function() {
	
	require(["dojo/dom"],function(dom){

localStorage.setItem("username",username) ;
localStorage.setItem("sap",sap) ;
localStorage.setItem("email", email);

dom.byId("login_response").innerHTML = gettext("user data stored");
dom.byId("haken").innerHTML = "<img src='media/img/haken.png' />";
	})} ;


var updateemail= function() {
		
		require(["dojo/dom"],function(dom){
			if(isEmail(dom.byId("email").value)) {
			localStorage.setItem("email", dom.byId("email").value);
			dom.byId("emailshow").innerHTML = localStorage.getItem("email");
			dom.byId("textbutton1").innerHTML = gettext("Send to my email address");
			jumpto("product0") ;
			}
			else {
				jumpto("product0");
			}
		})

	};



function getuserdata() {
	
require(["dojo/dom"],function(dom){

dom.byId("username").value = localStorage.getItem("username") ;
dom.byId("sap").value = localStorage.getItem("sap") ;
dom.byId("email").value = localStorage.getItem("email");
dom.byId("emailshow").innerHTML = localStorage.getItem("email");
dom.byId("login_response").innerHTML = gettext('stored user data'); })

}	



require(["dojo/dom","dojo/domReady!"], function(dom) {
	

	if (isEmail(localStorage.getItem("email"))) {
	
		dom.byId("textbutton1").innerHTML = gettext("Send");
	}
	else {
		dom.byId("textbutton1").innerHTML = gettext("Enter e-mail");
	
	}
	
}) ;









