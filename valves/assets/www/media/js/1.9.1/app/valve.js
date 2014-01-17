
function requestvalve(product,name,language,message){
	
	showOverlay() ;
	
	 message = message || "no data available";
	 language = language || "en";

	dojo.xhrPost({
	    url: "http://show-how.info/mobile/valves/" + language,
	    timeout: 10000,
	    content: {
	        'product': product,
	        'country': 'all'      	         
	    },
	    handleAs : "json" ,
	    load: function(result) {
	    	hideOverlay();
	    	jumpto("valve");
	        dojo.byId("gasinfo").innerHTML = name ;
	        var startentry = dijit.registry.byId("valveinput") ;
	    	startentry.containerNode.innerHTML ="";
	    	if (result.length!=0) {
			for (var l=0; l< result.length; l++) {
				var countryvalve = new dojox.mobile.RoundRect(); 
				countryvalve.containerNode.innerHTML = '<img src="media/img/icons/flags/png/' + result[l].country.replace(/\s/g, "") + '.png" />' 
													+ '<span class="countrystyle" >' + result[l].country + '</span>'
													+ '<span class="valvestyle" >' + result[l].valve + '</span>';
				startentry.addChild(countryvalve) ; }
	      
	      } 
	
	      else {
	      		var countryvalve = new dojox.mobile.RoundRect(); 
				countryvalve.containerNode.innerHTML =  message ;
				startentry.addChild(countryvalve) ;
	      
	       }
	       }
	});

	}
	
function requestcountry(country,language,message){
	showOverlay();
	
	 message = message || "no data available";
	 language = language || "en";

	dojo.xhrPost({
	    url: "http://show-how.info/mobile/valves/" + language,
	    timeout: 10000,
	    content: {
	        'product': 'all',
	        'country': country	              	         
	    },
	    handleAs : "json" ,
	    load: function(result) {
	    	hideOverlay();
	    	jumpto("country");
	        dojo.byId("countryinfo").innerHTML = '<img src="media/img/icons/flags/png/' + country.replace(/\s/g, "") + '.png" />' 
	        										+ '<span class="countrystyle" >' + country + '</span>';
	        var startentry = dijit.registry.byId("countryinput") ;
	    	startentry.containerNode.innerHTML ="";
	    	if (result.length!=0) {
			for (var l=0; l< result.length; l++) {
				var countryvalve = new dojox.mobile.RoundRect(); 

				countryvalve.containerNode.innerHTML =  result[l].product  + '<span style="float:right;">' + result[l].valve + '</span>' ;
				startentry.addChild(countryvalve) ; 
				} }
			else {	
				var countryvalve = new dojox.mobile.RoundRect(); 
				countryvalve.containerNode.innerHTML =  message ;
				startentry.addChild(countryvalve) ;
			
			
			}
			
	      
	      } 
	});

	}

