if(typeof(pi) === "undefined") { pi = {} }

/********************************************************
 * Pi lemmings workers
 ********************************************************/
pi.worker = function() { ; }
pi.worker.prototype.onProcessMessage = function(data) 
{
	var n 	= data.start_value;
	var end	= data.end_value;
	
	total = 0;
	for(var i = n; i < end; i++) 
	{
		if(i == 0) { continue; }
		total += 1 / Math.pow(i, 2);
	}
	
	this.postAction('Result', {total: total});
	this.close();
}