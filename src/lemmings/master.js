lemmings.master = function()
{
	this.is_master  = true;
	this.date_start = null;
	this.date_end 	= null;
	this.workers	= new Array();
}

lemmings.master.launchedLemmingsCounter = null;

lemmings.master.prototype.init = function(lemming_name, lemming_data)
{
	this.output			= document.getElementById('lemming_outputs');
	this.date_start 	= new Date();
	
	if(lemming_name) { this.lemming_name = lemming_name; }
	if(lemming_data) { this.lemming_data = lemming_data; }
	
	lemmings.lib.extend(this, lemmings.messages);
}

lemmings.master.prototype.setLemmingName = function(lemming_name)
{
	this.lemming_name	= lemming_name;
}

lemmings.master.prototype.setLemmingData = function(lemming_data)
{
	this.lemming_data	= lemming_data;
}

lemmings.master.prototype.run = function()
{
	// sanity checker
	if(this.lemming_data.length > 16) 
	{
		this.doLog('Impossible to launch lemmings : you can only launch a maximum of 16 lemmings');
		return;
	}
	
	var alea = Math.random();
	
	// iterate on data to launch the right number of lemmings from the cliff
	for(var key in this.lemming_data) 
	{
		var item_data = data[key];
		try 
		{
			var worker = new lemmings.worker(lemmings.path + '/worker.js');
			this.postAction(this.ACTION_IMPORT, { url: lemmings.protocol + lemmings.url + '/' + this.lemming_name + '?alea=' + alea }, worker);
			this.postAction(this.ACTION_PROCESS, item_data, worker);
			
			var closure = lemmings.lib.closure(this, this.onmessage);
			worker.onmessage = closure;
		}
		
		catch(e)
		{
			this.doLog('[' + e.filename + ':' + e.lineno + '] ' + e.message);
		}
		
		finally
		{
			if(this.output != null)
			{
				var item_output = document.createElement('output');
				item_output.id = 'output_' + key;
				this.output.appendChild(item_output);
			}
			
			this.launchedLemmingsCounter++;
			this.workers.push(worker);
			this.doLog("worker no." + key + " launched");
		}
	}
}

lemmings.master.prototype.terminate = function()
{
	for(var key in this.workers)
	{
		this.workers[key].terminate();
	}
}

lemmings.master.prototype.onLogMessage = function(data)
{
	this.doLog(data.message);
}

lemmings.master.prototype.doLog = function(message)
{
	// masters
	var log_container = document.getElementById('log');
	if(lemmings.log && log_container != null) 
	{
		log_container.textContent += message + "\n";
	}
	
	if(typeof(console) != "undefined"
	&& typeof(console.log) == "function")
	{
		console.log(message);
	}
}

lemmings.master.prototype.outputResult = function(message, lemming_id)
{
	if(!lemming_id)
	{
		lemming_id = 0;
		while(
			document.getElementById('output_' + lemming_id) &&
			document.getElementById('output_' + lemming_id).textContent != ""
		) {
			lemming_id++;
		}
	}
	
	var output_container = document.getElementById('output_' + lemming_id);
	if(output_container == null) { return ; }	
	
	output_container.textContent = message; 
}