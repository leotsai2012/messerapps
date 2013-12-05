var rad = function(x) {return x*Math.PI/180;}  ;


var distHaversine = function(p1, p2) {
	var R = 6371; 
	var dLat  = rad(p2.lat() - p1.lat());
	var dLong = rad(p2.lng() - p1.lng());

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) * Math.sin(dLong/2) * Math.sin(dLong/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;

	return d.toFixed(3);
} ;

var distance_calc= function(a,b) {
	return 999 ;
} ;

var isEven = function(value) {
	return value%2 === 0 ; } ;



	/* variables of for local storage */


	var currentproduct = null ;
	var currentbarcode = null ;
	var Basket = [] ;

	var setteststatus = function() {
		require(["dojo/dom"], function(dom) {  localStorage.setItem("status", dom.byId("testtest").checked) ;}) ;
	} ;
	
	/* object definition */


var DeliveryAddress = function(result , organisation) {
		this.VKORG = organisation ;
		this.address = result.street + " " + result.housenum + " " + result.postcode + " " + result.city;
		this.street = result.street ;
		this.housenum = result.housenum ;
		this.postcode = result.postcode ;
		this.city = result.city ;
		this.name = result.name1 + result.name2 ;
		this.shipTo = result.shipTo ;
		this.coordinates = { "x" : 0 , "y" : 0};
		this.found = false ;
		this.calculated = false ;
		this.distance = 0 ;
	} ;



var calculateDistance= function(delivery) {
	delivery.distance = distance_calc({"lat": lat , "lng" : longi},
				{"lat": delivery.coordinates.x , "lng" : delivery.coordinates.y});
	delivery.calculated = true ;
	return delivery ;
	};
	
var getcoordinates = function(deliveryaddress) {
	
		 require(["dojo/request/xhr"],function(xhr) {
			 
				xhr("https://maps.googleapis.com/maps/api/geocode/json" + "?address=" + deliveryaddress.address.replace(/ /g,"%20") + "&sensor=true" ,
					{ timeout: 10000,
					method : 'GET',
					headers : {"X-Requested-With":null},
					handleAs : "json" }).then( function(result) { 
											deliveryaddress = completeCoordinates(result,deliveryaddress) ;}, function(result) { }) ;
			}) ;
		return deliveryaddress ;
			
		 };

var completeCoordinates= function(result,deliveryaddress) {
	
	
	if (result.status === "OK")
	{		
		deliveryaddress.coordinates.x = result.results[0].geometry.location.lat ;
		deliveryaddress.coordinates.y = result.results[0].geometry.location.lng ;
		deliveryaddress.found = true ; }
	return deliveryaddress ;

};



var Product = function(result) { 
		this.productname = result.productname ;
		this.materialnumber = result.materialnumber ;
		this.materialname = result.materialname ;
		this.composition = result.composition ;
		this.application = result.application ;
		this.explanatory = result.explanatory ;
		this.qty = 1 ;
	} ;

	Product.prototype.addProduct = function() {

		if (exist_in_basket(this.materialnumber) === -1) {
			Basket.push(this) ;
		

		}
		else {
			Basket[exist_in_basket(this.materialnumber)].qty += 1 ;
		


		}
		writebasket() ;
} ;

Product.prototype.removeProduct = function() {

		var i = exist_in_basket(this.materialnumber);

		if (i === -1) { 
				
		}
		else {
			if (Basket[i].qty === 1) {
				for (var j=i;j<Basket.length-1;i++) {
					Basket[j] = Basket[j+1];

				}
				Basket.pop() ;

				writebasket() ;
			}
			else {
				Basket[i].qty -= 1 ;
				writebasket() ;
			}
		}
	} ;




var exist_in_basket = function(materialnumber) {

		for (var i=0 ; i< Basket.length ; i++) {
			if (Basket[i].materialnumber === materialnumber) { return i ;}
		}
		return -1 ;
	};

var addproduct2 = function(i) {
		Basket[i].addProduct() ;

	};

var addproduct = function() {
		currentproduct.addProduct() ;
		show_popup_message(gettext("Added to basket") );
	} ;



var removeproduct = function(i) {
		Basket[i].removeProduct() ;

	} ;


var SessionUser = null ;

var User = function() {
		this.username = localStorage.getItem("username") || "";	
		this.email = localStorage.getItem("email") || "";	
		this.sap = localStorage.getItem("sap") || "";	
		this.DID = localStorage.getItem("DID");	
		this.authenticated = this.DID!==null  ;
		this.deliveryAddresses = [] ;
		this.currentShipTo = "";
		this.VKORG = localStorage.getItem("VKORG");

	};


	User.prototype.showUser = function() {

		require(["dojo/dom"], function(dom) {


			dom.byId("name").value = SessionUser.username;
			dom.byId("sap").value = SessionUser.sap ;
			dom.byId("email").value = SessionUser.email;
		
		} )	;

	} ;

	User.prototype.storeLocal = function(a) {

		require(["dojo/dom"], function(dom) {

			localStorage.setItem("username", dom.byId("name").value )  ;
			localStorage.setItem("sap" ,dom.byId("sap").value) ;
			localStorage.setItem("email",dom.byId("email").value );
			localStorage.setItem("DID", DID );	
		} ) ;

		if (a===1)
			{requestauthentication() ;}
	};



	/* integration with Liferay */

function request_authentication(){
	
	showOverlay();

		require(["dijit/registry", "dojo/request/xhr","dojo/dom"], function(registry,xhr,dom){


			
			xhr("http://h2217974.stratoserver.net/liferay/login/", {
				timeout: 10000,  
				data: { 'url' : 'login.mob',
					'callstring' : JSON.stringify({'useremail' : dom.byId("email").value,
					'password' : dom.byId("passwd").value ,
					'customernumber' :  dom.byId("sap").value})    
				},
				method : 'POST',
				handleAs : "json" }).then( authenticate , authenticate_failed);
				} 
		);
	}



function request_deliverydata(){
	
	if (!SessionUser.authenticated) {
	showOverlay(); }


	require([ "dijit/registry", "dojo/request/xhr","dojo/dom"], function(registry,xhr,dom){

		xhr("http://h2217974.stratoserver.net/liferay/login/", {
			timeout: 10000, 
			method : 'POST',
			data: { "url" : "auth.mob", 
				"callstring" : JSON.stringify({'DID' : localStorage.getItem("DID")}) },
			handleAs : "json" }).then( deliverydata , deliverydata_failed);
			} );
} 


function request_barcode(barcode){
	
	showOverlay();


				require([ "dijit/registry", "dojo/request/xhr","dojo/dom"], function(registry,xhr,dom){

					xhr("http://h2217974.stratoserver.net/liferay/login/", {
						timeout: 10000, 
						method : 'POST',
						data: { 'url' : 'material.mob',
							'callstring' :JSON.stringify({
							'DID' : localStorage.getItem("DID"),
							'barcode' : barcode,
							'VKORG' : SessionUser.VKORG

						})},
						handleAs : "json" }).then( requestsapproduct , sapproduct_failed); });
				}  


function submit_order(){

	showOverlay();
	require(["dojo/dom", "dojo/request/xhr"], function(dom,xhr){
		xhr("http://h2217974.stratoserver.net/liferay/login/",
				{ timeout: 10000,
			data: { "url" : "create.mob" , "callstring" : JSON.stringify({
				'DID' : localStorage.getItem("DID"),
				"vkorg": SessionUser.VKORG,
				"shipTo" : SessionUser.currentShipTo,

				"items": extract_portion(Basket)
			})},
			method : 'POST',
			headers : {"X-Requested-With":null},
			handleAs : "json" }).then( order_submitted , order_submitted) ;}
		
	) ;
	
}


var extract_portion= function(basket) {
	
	var simplerbasket = [] ;
	
	for (i=0; i<basket.length; i++)  {	
		simplerbasket.push({"materialnumber" : basket[i].materialnumber , "quantity" : basket[i].qty});
	}
	return simplerbasket ;
	
};


			/* functionality to metadirectory server */


var requestsapproduct = function(sapnumber) {
	if (sapnumber.found) {
	requestproduct("http://show-how.info/liferay/requestproduct/",sapnumber.materialnumber); }
	else {
		jumpto("product0");
		sapproduct_failed() ;
	}
} ;


var requestproduct = function(url,sapnumber){

	require(["dojo/request/xhr","dojo/dom"], function(xhr,dom) {

		xhr(url , {
			timeout: 10000,
			data: { 'number': sapnumber},
			handleAs : "json" ,
			method : 'POST'}).then( function(result) {  

				if (result.result === "ok")
				{

					currentproduct = new Product(result);
					dom.byId("bc").innerHTML = currentproduct.materialnumber;
					dom.byId("seg").innerHTML = result.segment; 
					dom.byId("pd").innerHTML = result.productname;
					dom.byId("norm").innerHTML =result.standard;
					dom.byId("composition").innerHTML = result.composition ;
					dom.byId("application").innerHTML = result.application ;
					dom.byId("emailshow").innerHTML = localStorage.getItem("email");
					dom.byId("ts").innerHTML = result.sheets ;
					dom.byId("qi").innerHTML = result.explanatory ;
					dom.byId("response2").innerHTML = "" ;	
					if (localStorage.getItem("email"))
					{
						dom.byId("textbutton1").innerHTML = gettext("Send");
					}
				}
				else {
					show_popup_message(gettext("Barcode not valid !"));	
				}



			},
			function(err) {
				showpopup('message_internet'); } 


			); }  ) ; 
			jumpto("product0") ;
	hideOverlay() ;  } ;

													/* call back functions  */

	var retrieve_deliveryaddresses = function(user,result) {

		for (var i=0; i < result.organisations.length; i++) {

			organisation = result.organisations[i].organisation ;

			for (var j=0; j < result.organisations[i].shipToParties.length; j++)
			{
				var delivery = new DeliveryAddress(result.organisations[i].shipToParties[j], organisation);
				delivery = getcoordinates(delivery);

				user.deliveryAddresses.push(getcoordinates(delivery)) ;

			}
		} };

		var authenticate = function(result) {
			
			require(["dojo/dom"], function(dom) {
				localStorage.setItem("email",dom.byId("email").value);
				localStorage.setItem("username",dom.byId("name").value);
			}) ;
			deliverydata(result) ;
			hideOverlay() ;
			show_popup_message(gettext("User is authenticated"));
        	jumpto("home");

		} ;


		var deliverydata = function(result) {
			
			SessionUser.sap = result.customernumber ;
			localStorage.setItem("DID", result.DID) ;
			SessionUser.authenticated = true ;
			retrieve_deliveryaddresses(SessionUser,result) ;
	
			build_deliveryelements(SessionUser.deliveryAddresses) ;
		} ;

		var bubblesort = function(delivery) {
			for (var i=0; i<delivery.length; i++) {
				for (var j=0 ; j<delivery.length-1; j++) {
					if (delivery[j].distance > delivery[j+1].distance) {
						var t = delivery[j+1]; 
						delivery[j+1] = delivery[j];
						delivery[j] = t ;
					}
				}

			}
			return delivery ;
		} ;



		var build_deliveryelements = function(delivery) {
			for (var i=0 ; i< delivery.length ; i++) {
				delivery[i] = calculateDistance(delivery[i]);
			}
			delivery = bubblesort(delivery);
	
			writeclosest(delivery);
				
			build_scheme(delivery); 

		} ;

		var writeclosest = function(delivery) {
			writedelivery(delivery,0) ;
		} ;

		var writedelivery = function(delivery,j) {
			require(["dojo/dom"], function(dom) {
				dom.byId("currentshipTo").innerHTML = delivery[j].shipTo;
				dom.byId("streetfinal").innerHTML = delivery[j].street + " " + delivery[j].housenum ;
				dom.byId("cityfinal").innerHTML = delivery[j].postcode + " " + delivery[j].city ;
			}) ;
			localStorage.setItem("VKORG", delivery[j].VKORG) ;
			SessionUser.currentShipTo = delivery[j].shipTo ; 
			SessionUser.VKORG = delivery[j].VKORG; 			
		} ;


		var select_current_pos = function() {
			require(["dojo/dom"],function(dom) {
				dom.byId("currentshipTo").innerHTML = "" ;
				dom.byId("streetfinal").innerHTML = dom.byId("street").value;
				dom.byId("cityfinal").innerHTML = dom.byId("city").value + dom.byId("country").value ;
				jumpto("checkout2");
			}
			) ;
		} ;
		


		var build_scheme= function(delivery) {
			
		 
			require(["dojo/dom","dojo/dom-construct"],
					function(dom, construct) {
					
						var entry = dom.byId("delpoints") ;
						while(entry.hasChildNodes()){
							entry.removeChild(entry.firstChild);}
						
						var counter = delivery.length;
						for(var i = 0; i < counter ; i++){
						
							var el = construct.create("a");
							el.href = "javascript:select_shipTo(" + i.toString() + ");";
							el.innerHTML = delivery[i].address;
							entry.appendChild(el);
				
						}
	

			});
			
			} ;

var select_shipTo = function(a) {
	
	writedelivery(SessionUser.deliveryAddresses,a) ;
	jumpto("checkout2");
	
	
} ;


var deliverydata_failed = function(result) {
	  hideOverlay() ;
	  jumpto("home");
	show_popup_message(gettext("Delivery data cannot be retrieved"));
} ;

var authenticate_failed = function(result) {
	
	  hideOverlay() ;

	  jumpto("home");

	show_popup_message(gettext("User cannot be authenticated"));

} ;

var sapproduct_failed = function(result) {
	  hideOverlay() ;
	
	show_popup_message(gettext("Product information not found"));
	

} ;

var order_submitted = function(result) {
	  hideOverlay() ;
	
	require(["dojo/dom"],function(dom) {dom.byId("confirmmessage").innerHTML = result.message ; } );
	jumpto("checkout5");
};

var ordersubmit_failed = function(result) {
	  hideOverlay() ;


	show_popup_message(gettext("Order transmission failed"));

} ;


		/*   */

function scan_return1() {
	
	if (!SessionUser.authenticated) {
		show_popup_message(gettext("First register your device !"));	
	}
	
	else {

	require(["dojo/dom"],function(dom) { currentbarcode = dom.byId("bcn").value ;}) ;
	if ((currentbarcode === "") || !currentbarcode) 
	{
		show_popup_message(gettext("Barcode not valid !"));	
	}
	else {

		request_barcode(currentbarcode) ; }
}}



function send2mail(){
	
   if ((!localStorage.getItem("email")) || (localStorage.getItem("email")=="") ) {
     jumpto("login"); } 
   
   else {
  
  require([ "dojo/request/xhr","dojo/dom"], function(xhr,dom){
  
  xhr("http://h2217974.stratoserver.net/store_extras/sendTechurl/",
      {
      timeout: 10000,
      data: {
          'product': currentproduct.materialnumber ,
          'email' : localStorage.getItem("email"),
          'language' : "de",
          'private' : true,         
          'country' : localStorage.getItem("country")        
          
      },
      method : "POST"}
  ).then( function(result) { 
          if(result == "ok") {

        	  show_popup_message(gettext("Sent ! "));
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
  

  xhr("http://h2217974.stratoserver.net/store_extras/sendTechurl/",
      {
      timeout: 10000,
      handleAs : "json" ,
      data: {
          'product': currentproduct.materialnumber ,
          'email' : dom.byId("emailshow2").value,
          'language' : "de",
          'private' : true,         
          'country' : localStorage.getItem("country")        
          
      },
      method : "POST"}
  ).then( function(result) {
          if(result.result == "ok") {

        	  show_popup_message(gettext("Send to ") + dom.byId("emailshow2").value);
          }
          else {
        	  show_popup_message(gettext("Failed to send to the email address"));
          }
      },
      function(err){
    	  show_popup_message(gettext("Failed to send to the email address"));})
   
  }})} ;


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
	}) ;
};


var completeaddress = function(result) {
	

	country = result.country ;
	city = result.city ;
	street = result.street ;
	longi = result.x ;
	lat = result.y ;
	require(["dojo/dom"],function(dom) {
		dom.byId("xpos").value = lat ;
		dom.byId("ypos").value = longi ;
		dom.byId("street").value = street ;
		dom.byId("city").value = city ;			
		dom.byId("country").value = country ;

	}) ;
} ;



function requestcoordinates(){

	require([ "dojo/dom", "dojo/request/xhr"], function(dom,xhr){


		xhr("/liferay/requestaddress/",
				{ timeout: 10000,
			data: {
				'x': longi ,
				'y' : lat      
			},
			method : 'POST',
			handleAs : "json" }).then(  function(result) {
				result.x = longi ;
				result.y = lat ;
				completeaddress(result) ;

			}, function(error) {}) ;}) ;} 


function masterbasket() {

	if (Basket.length > 0) { 

		jumpto("basket") ; 
		writebasket() ;
	}
	else {
		show_popup_message(gettext("Basket still empty"));
	} }


function writebasket(){

	var Parent = dojo.byId("basketproducts");
	while(Parent.hasChildNodes()){
		Parent.removeChild(Parent.firstChild);}

	var rowCount = Parent.rows.length;
	var row = Parent.insertRow(rowCount);	
	row.style.backgroundColor = "#E9EDF6";


	var cell0 = row.insertCell(0);
	cell3.innerHTML =  gettext("Less") ;


	var cell1 = row.insertCell(1);
	cell1.innerHTML = gettext('Description') ;


	var cell2 = row.insertCell(2);
	cell2.innerHTML = gettext('qty') ;


	var cell4 = row.insertCell(3);
	cell4.innerHTML = gettext("More") ;


	j = 0 ;


	for (var i=0; i < Basket.length; i++) {

		if (Basket[i].qty !==0) {
			j += 1 ;
			var rowCount = Parent.rows.length;
			var row = Parent.insertRow(rowCount);
			if (isEven(j)) {row.style.backgroundColor="#E9EDF6";}

			var cell0 = row.insertCell(0);
			var element2 = dojo.create("a");
			element2.href = "javascript:removeproduct(" + i.toString() + ");";
			element2.innerHTML = '<img src="file://android_asset/www/media/img/minusb.png" />';
			cell0.appendChild(element2);


			var cell1 = row.insertCell(1);
			cell1.innerHTML = Basket[i].materialname;

			var cell2 = row.insertCell(2);
			cell2.innerHTML = Basket[i].qty ;



			var cell4 = row.insertCell(3);
			var element2 = dojo.create("a");
			element2.href = "javascript:addproduct2(" + i.toString() + ");";
			element2.innerHTML = '<img src="file://android_asset/www/media/img/plusb.png" />';
			cell4.appendChild(element2);


		}}


}



function writesummary(){

	if (!SessionUser.authenticated) {
		show_popup_message(gettext("Please authenticate first!"));	
		jumpto("login");
	}

	else {



		var Parent = dojo.byId("summaryorder");
		while(Parent.hasChildNodes()){
			Parent.removeChild(Parent.firstChild);}


		var rowCount = Parent.rows.length;
		var row = Parent.insertRow(rowCount);	
		row.style.backgroundColor = "#E9EDF6";

		var cell0 = row.insertCell(0);
		cell0.innerHTML = gettext('Materialnumber') ;



		var cell1 = row.insertCell(1);
		cell1.innerHTML = gettext('Description') ;


		var cell2 = row.insertCell(2);
		cell2.innerHTML = gettext('qty') ;

       alert("1");

		j = 0 ;


		for (var i=0; i< Basket.length ; i++) {

			if ((Basket[i].qty !==0)) {
				j += 1 ;
				  alert(j);
				var rowCount = Parent.rows.length;
				var row = Parent.insertRow(rowCount);
				if (isEven(j)) {row.style.backgroundColor="#E9EDF6";}

				var cell0 = row.insertCell(0);
				cell0.innerHTML = Basket[i].materialnumber ;
				var cell1 = row.insertCell(1);
				cell1.innerHTML = Basket[i].materialname;
				var cell2 = row.insertCell(2);
				cell2.innerHTML = Basket[i].qty ;

			}}

		require(["dojo/dom"],function(dom) {

			dom.byId("sapid").innerHTML = SessionUser.sap ;
			dom.byId("emailid").innerHTML = localStorage.getItem("email");
			dom.byId("usernameid").innerHTML = localStorage.getItem("username");
		 }) ;

			jumpto("checkout2"); }

}



require(["dojo/domReady!"], function() {
	

	SessionUser = new User() ;
	
	var test = localStorage.getItem("status") ;
	if (test===null) {
		localStorage.setItem("status",false) ;}
	require(["dojo/dom"], function(dom) {
		dom.byId("testtest").checked = localStorage.getItem("status") ;
		setteststatus() ;
		
	})
	
	
	

	

	locate(completeaddress);  

	
	if (SessionUser.authenticated) {

		request_deliverydata();
	}
	
	SessionUser.showUser() ;




}) ;



