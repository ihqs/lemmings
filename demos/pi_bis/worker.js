this.onProcessMessage = function(data) 
{
	var n 	= 1 * data.start_value;
	var end	= n + 10000;
	
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