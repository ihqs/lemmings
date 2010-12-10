
this.onProcessMessage = function() 
{
	var n 	= 1 * this.data.start_value;
	var end	= 2 * this.data.end_value;
	
	total = 0;
	while (true) 
	{
	  n += 1;
	  if(n >= end) { break; }
	  
	  total += 1 / Math.pow(n, 2);
	}
	
	this.postAction('Result', {dp: total});
	this.close();
}