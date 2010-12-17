if(typeof(prime) === "undefined") { prime = {} }

/********************************************************
 * Prime lemmings workers
 ********************************************************/
prime.worker = function() { ; }
prime.worker.prototype.onProcessMessage = function(data) 
{
	search: for(var i = data.start_value; i < data.end_value; i++) 
	{
	  for (var j = 2; j <= Math.sqrt(i); j += 1)
	  {
	    if (i % j == 0) continue search;
	  }
	  
	  // found a prime!
	  this.postAction('Result', {prime: i});
	}

	this.close();
}