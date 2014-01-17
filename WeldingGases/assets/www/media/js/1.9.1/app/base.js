require([  "dojo/dom",  
  "dojo/date",
   "dojo/query", 
 "dijit/registry",
 "dojo/parser", 
 "dojox/mobile/compat",
"dojo/_base/connect",
"dojox/mobile",
"dojo/query",
"dijit/Calendar",
"dojox/mobile/Opener",
"dojox/mobile/View",
"dojox/mobile/Slider",
"dojox/mobile/ScrollableView",
"dojox/mobile/TabBar",
"dojox/mobile/TabBarButton",
"dojox/mobile/ToolBarButton",
"dojox/mobile/TextBox",
"dojox/mobile/TextArea",
"dojox/mobile/CheckBox",
"dojox/mobile/Switch",
"dojox/mobile/Button",
"dojox/image/LightboxNano",
"dojox/mobile/RadioButton",
"dojox/mobile/EdgeToEdgeDataList",
"dojo/data/ItemFileReadStore",
"dojox/mobile/ContentPane",
"dojox/mobile/SimpleDialog",
"dojox/mobile/GridLayout",
"dojox/mobile/Pane",
"dojox/mobile/Overlay",
"dojox/mobile/ValuePicker"
]);


var lastview = null ;
var state = false ;

var lat = 0 ;
var longi = 0 ;



require([ "dojo/domReady!"], function(registry,query){

     checkinternet();
    
}); 

var titlestop = function() { require(["dojo/dom-construct"], function(domConstruct){
	  // Destroy a node byId:
	  domConstruct.destroy("titlepage");
	})};

require([ "dojo/_base/connect","dojo/domReady!"], function(connect){connect.subscribe("/dojox/mobile/startView",
       function(view, moveTo, dir, transition, context, method){
         if (!lastview) {
      lastview = view ; titlestop(); }})})

require([ "dojo/_base/connect","dojo/domReady!"], function(connect){connect.subscribe("/dojox/mobile/beforeTransitionIn",
       function(view, moveTo, dir, transition, context, method){
      lastview = view ; })});


      



var jumpto = function(view) {
  
    if (lastview!=null) {
    lastview.performTransition(view,1,"",null);
  }}
   
var showpopup= function(wid) {
  
    require([ "dijit/registry"], function(registry){
    registry.byId(wid).show();
    })
  
  }  

var hidepopup= function(wid) {
	  
    require([ "dijit/registry"], function(registry){
    registry.byId(wid).hide();
    })
  
  }  ;
  
var show_popup_message= function(message) {  
	    require([ "dijit/registry","dojo/dom"], function(registry,dom){
	  
	    dom.byId("generic_text").innerHTML = message ;
	    registry.byId("message_generic").show();
	    })
	  }  ;

var hide_popup_message= function(message) {
		    require([ "dijit/registry"], function(registry){
		    registry.byId("message_generic").hide();
		    })
		  }  ;
  
var showOverlay = function() {
		require(["dijit/registry"], function(registry) {
			registry.byId("spinner").show();
		})
		
	};

var hideOverlay = function() {
		require(["dijit/registry"], function(registry) {
			registry.byId("spinner").hide();
		})
	};


var insertmessage = function(id,message) {
	  require([ "dojo/dom"], function(dom){
		  var location = dom.byId(id);
		  location.innerHTML = message ;
		  
} );
} ;

var blankmessage = function(id) {
		insertmessage(id,"") ;
} ;


var twodecimals = function(a) {
	
	a = a.toString()
	b = ( a).split(".")
	if (b[1]) {
		return b[0] + "," + b[1].substring(0,2) ;
	}
	return a
	
	
}

var isEmail = function(email) { 
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
} ;

var isPhone = function(a) {
	if (a.length === 0) { return false ; }
    var isGoodMatch = a.match(/^\(*[0\+]\d+[1-9 \-\)]{1,15}$/);
    return isGoodMatch
} ;

require(["dojo/domReady!"],function() {

if (window.attachEvent && !window.addEventListener) {
    showpopup("message-ie");
}}) ;
   
function checkinternet(){
     
     require([ "dijit/registry", "dojo/request/xhr"], function(registry,xhr){
    
    xhr("/liferay/ajax_internet/", {
        timeout: 10000,
        data: {
            'parameter': 'passed'
        },
        handleAs : "json" ,
        method : 'POST'}).then( function(result) {  
                   if(result.result == "ok") { state = true ;} 
                else {
                  showpopup('message_internet');}

            },
              function(err) {
          		showpopup('message_internet'); }) }) };


function locate(callback) {
	
  
  require([ "dojo/request/xhr"], function(xhr){

if (navigator.geolocation) 
{
  navigator.geolocation.getCurrentPosition( 
 
    function (position) {  
          lat = position.coords.latitude ;
          longi = position.coords.longitude ; 
          
      	xhr("http://show-how.info/liferay/requestaddress/",
      		    { timeout: 10000,
      		    data: {
      		        'x': lat ,
      		        'y' : longi      
      		    },
      		    method : 'POST',
      		    handleAs : "json" }).then(  function(result) {
      		    	
      		    	result.x = lat ;
      		    	result.y = longi ;
      		  
      				callback(result) ;
      				
      		    }, function(error) {callback(result)}) }) }

    

else {
	
	  xhr("http://show-how.info/analytics/locate/",
		        { timeout: 3000,
		        data: {
		          'lat' : x,
		          'long' : y,
		          'origin' : '{{sitelogo}}' },
		        handleAs : "json" ,
		        method : 'POST'}).then( function(result) {
		        	callback(result);        	
		        }, 
	            function(err){callback(result);}) }


  })} ;
	

      


function submitcontact(){
  
  require([ "dojo/request/xhr","dojo/dom"], function(xhr,dom){
	  
	  
	  if (!isEmail(dom.byId("id_sender").value)) {
		  show_popup_message(gettext("No valid E-Mail address"));
	  }
	  else if (!isPhone(dom.byId("id_tel").value))
		  { show_popup_message(gettext("No valid telephone number")); }
	  
	  else if (dom.byId("id_name").value==="") {
		  { show_popup_message(gettext("Name field is empty")); }
	  }
	  else {
  
  xhr("http://show-how.info/android/submitcontact/",
      {
      timeout: 10000,
      data: {
          'name': dom.byId("id_name").value ,
          'sender' : dom.byId("id_sender").value,
          'subject' : dom.byId("id_subject").value,
          'tel' : dom.byId("id_tel").value,         
          'contents' : dom.byId("id_contents").value,         
          
      },
      method : "POST"}
  ).then( function(result) {
          if(result == "ok") {

              show_popup_message(gettext("E-Mail succesfully transmitted"));
          }
          else {
        	  show_popup_message(gettext("E-Mail  transmittion failed"));
          }
      },
      function(err){
    	  show_popup_message(gettext("E-Mail  transmittion failed"));
      } ) }})} ;
      

  
