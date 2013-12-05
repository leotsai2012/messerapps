
require(["dojox/image/LightboxNano"]);


function parseLocalNum(num)
{
    return ((num+' ').replace(",", "."));
}

function calculatei(gasi) {

	var n = dojo.byId("origin"+gasi);
	if(n){origin=n.value ;}
	gas = gasi ;
	calculate() ;
}

function reversecalculatei(gasi) {

	var n = dojo.byId("result"+gasi);
	if(n){result=n.value ;}
	gas = gasi ;
	reverse_calculate() ;
}

function calculate() {
	
	
	origin = dojo.byId("origin"+gas).value  ;
	var convert = factors[gas][unitfrom][unitto] ; 
	if ((convert != null) && ( convert != 0))
	{
		result = origin*convert ;
	dojo.byId("result"+gas).value = parseLocalNum(result.toFixed(2))  ;
	
			}
		
		else {
			dojo.byId("result"+gas).value = gettext("NC") ;	
			}
	
		}


function reverse_calculate() {
	
	dojo.byId("result"+gas).value = result ;
	var convert = factors[gas][unitfrom][unitto] ; 
	if ((convert != null) && (convert != 0))
	{
			origin = result/convert.toFixed(2) ;
			dojo.byId("origin"+gas).value = parseLocalNum(origin.toFixed(2)) ;
			}
		
		else {
			dojo.byId("origin"+gas).value = gettext("NC") ;	
			}
}

function clickfrom(from,gasi) {
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("from" + units[i] + gasi, "background", "#013c88") ;
	}
	dojo.style("from"+from+gasi, "background", "#E5312B") ;

	unitfrom = from ;
	gas=gasi ;
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("to" + units[i] + gasi, "background", "#c8c8c8") ;
	}
	
	for (var i=1; i < units.length ; i++ ) {
		if ((factors[gas][from][units[i]] == null) & (factors[gas][units[i]][from] == null) )
			{ dojo.style("to"+ units[i] + gasi, "background", "#c8c8c8") ;}
		else {dojo.style("to"+ units[i] + gasi, "background", "#013c88") ;}
	}
	
	dojo.style("to"+unitto+gasi, "background", "#E5312B") ;

	
	calculate() ;
}

function clickto(to,gasi) {
	

		
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("to" + units[i] + gasi, "background", "#c8c8c8") ;
	}
	dojo.style("to"+to + gasi, "background","#E5312B" ) ;

	unitto = to ;
	gas=gasi ;
	
	for (var i=1 ; i < units.length ; i++) {
		dojo.style("to" + units[i] + gasi, "background", "#c8c8c8") ;
	}
	
	for (var i=1; i < units.length ; i++ ) {
		if ((factors[gas][unitfrom][units[i]] == null) & (factors[gas][units[i]][unitfrom] == null) )
			{ dojo.style("to"+ units[i] + gasi, "background", "#c8c8c8") ;}
		else {dojo.style("to"+ units[i] + gasi, "background", "#013c88") ;}
	}
	
	dojo.style("to"+to + gasi, "background","#E5312B" ) ;
	
	calculate() ; 
}

function reset(gasi) {
	
	gas= gasi ;
	unitfrom = units[1] ;
	unitto = units[1] ;
	origin = 1 ;
	result = 0 ;
	clickfrom(unitfrom,gasi) ;
	clickto(unitto,gasi) ;
	calculate() ;
	
}
