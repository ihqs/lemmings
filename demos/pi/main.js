/********************************************************
 * Main object & configuration
 ********************************************************/
pi = {}	
pi.config = {
	nb_workers: 4,
	items_per_workers: 10000
}

/********************************************************
 * Pi lemmings master
 ********************************************************/
pi.master = function() 
{  
	for(var i = 0; i < pi.config.nb_workers; i++) 
	{ 
		var data = { 
			start_value: i * pi.config.items_per_workers, 
			end_value: (i * pi.config.items_per_workers) + pi.config.items_per_workers
		}; 
		var worker = this.createWorker();
		this.postAction(this.ACTION_IMPORT, { url: lemmings.protocol + lemmings.url + '/' + 'demos/pi/worker.js?alea=' + Math.random() }, worker)
		this.postData('data', data, worker);
	}
	
	this.launch();	
}

pi.master.prototype = new lemmings.master();
pi.master.prototype.constructor = pi.master;

pi.master.prototype.total = 0;

pi.master.prototype.onResultMessage = function(data) 
{ 
	this.outputResult(data.dp);
	
	this.total += parseFloat(data.dp);
	document.getElementById('global_result').textContent = Math.sqrt(6 * this.total);

	var now = new Date();
	document.getElementById('elapsed').textContent = now.getTime() - this.date_start.getTime();

	
	this.log('worker closed');
	this.terminate();
}

pi.master.prototype.outputResult = function(message)
{
	var item_output = document.createElement('output');
	item_output.textContent = message;
	document.getElementById('lemming_outputs').appendChild(item_output);	
}

/********************************************************
 * Pi lemmings workers
 ********************************************************/
pi.worker = function() { ; }
pi.worker.prototype.onProcessMessage = function() 
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

new pi.master();