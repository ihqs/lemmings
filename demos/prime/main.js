/********************************************************
 * Main object & configuration
 ********************************************************/
prime = {}	
prime.config = {
	nb_workers: 4,
	items_per_workers: 25000
}

/********************************************************
 * Prime lemmings master
 ********************************************************/
prime.master = function() 
{  
	var url = lemmings.protocol + lemmings.url + '/' + 'demos/prime/worker.js?alea=' + Math.random();
	
	var data = new Array();
	for(var i = 0; i < prime.config.nb_workers; i++) 
	{ 
		data[i] = { 
			start_value: i * prime.config.items_per_workers, 
			end_value: (i * prime.config.items_per_workers) + prime.config.items_per_workers
		}; 
	}
	
	this.createWorkers(data.length, { url: url, behaviour: "prime.worker" });
	this.postActionToAll(this.ACTION_PROCESS, data);	
}

prime.master.prototype = new lemmings.master();
prime.master.prototype.constructor = prime.master;

prime.master.prototype.onResultMessage = function(data) 
{ 
	this.outputResult(data.worker_id, data.prime);
	
	this.total += parseFloat(data.total);
	document.getElementById('global_result').textContent++;

	var now = new Date();
	document.getElementById('elapsed').textContent = now.getTime() - this.date_start.getTime();
}

prime.master.prototype.outputResult = function(id, message)
{
	if(!document.getElementById('output_' + id))
	{
		var item_output = document.createElement('output');
		item_output.id = 'output_' + id;
		document.getElementById('lemming_outputs').appendChild(item_output);
	}
	document.getElementById('output_' + id).textContent = message;
}

new prime.master();