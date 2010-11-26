
this.process = function() 
{
	var p = 0;
	
	for(var i = 1 ; i <= parseInt(this.data) ; i++)
	{
		var x = Math.random();
		var y = Math.random();
	    if((Math.pow(x, 2) + Math.pow(y, 2)) < 1) { p++; }
	}
	  
	this.postJSONMessage({value: p});
	this.close();
}