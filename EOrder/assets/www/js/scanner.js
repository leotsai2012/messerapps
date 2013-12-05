 var scan = function() {
 	
 	 scanit() ;
 	 jumpto("barcode");
 } ;
 


var scanner = cordova.require("cordova/plugin/BarcodeScanner");   



 
 	  
 function scanit() { 
		scanner.scan( function(result) { 
			currentbarcode = result.text ; 
		     request_barcode(currentbarcode) ;
		       },
	     function(error) {
	    		show_popup_message(gettext("Barcode scanning failed - enter manually!"));	
	             } 
	 ) } ; 
	 
