/********************************************************
 * Main object & configuration
 ********************************************************/
pi = {}	
pi.config = {
	nb_workers: 4,
	items_per_workers: 100000
}

/********************************************************
 * Pi lemmings master
 ********************************************************/
pi.master = function() 
{  
	var url = lemmings.protocol + lemmings.url + '/' + 'demos/pi/worker.js?alea=' + Math.random();
	
	var data = new Array();
	for(var i = 0; i < pi.config.nb_workers; i++) 
	{ 
		data[i] = { 
			start_value: i * pi.config.items_per_workers, 
			end_value: (i * pi.config.items_per_workers) + pi.config.items_per_workers
		}; 
	}
	
	this.createWorkers(data.length, { url: url, behaviour: "pi.worker" });
	this.postActionToAll(this.ACTION_PROCESS, data);	
}

pi.master.prototype = new lemmings.master();
pi.master.prototype.constructor = pi.master;

pi.master.prototype.total = 0;

pi.master.prototype.onResultMessage = function(data) 
{ 
	this.outputResult(data.total);
	
	this.total += parseFloat(data.total);
	document.getElementById('global_result').textContent = Math.sqrt(6 * this.total);

	var now = new Date();
	document.getElementById('elapsed').textContent = now.getTime() - this.date_start.getTime();
}

pi.master.prototype.outputResult = function(message)
{
	var item_output = document.createElement('output');
	item_output.textContent = message;
	document.getElementById('lemming_outputs').appendChild(item_output);	
}

new pi.master();