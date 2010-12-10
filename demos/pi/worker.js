
this.onProcessMessage = function(data) 
{
	var n 	= 1 * data.start_value;
	var end	= 2 * data.end_value;
	
	total = 0;
	while (true) 
	{
	  n += 1;
	  if(n >= end) { break; }
	  
	  total += 1 / Math.pow(n, 2);
	}
	
	this.postAction('Result', {total: total});
	this.close();
}