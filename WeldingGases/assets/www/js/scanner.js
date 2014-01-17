
var scanner = cordova.require("cordova/plugin/BarcodeScanner");   

var scanit = function () { 
	scanner.scan( function(result) { currentbarcode = result.text ; 
	requestsapproduct(result.text) ;
	}
     , function(error) {
    		show_popup_message(gettext("Barcode scanning failed - enter manually!"));	
             } 
 ); } ; 
 

 function scan() {
 	
 	 scanit() ;
 	 jumpto("barcode");
 } ;
 	  