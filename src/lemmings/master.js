lemmings.master = function()
{
	this.date_start = null;
	this.date_end 	= null;
}

lemmings.master.launchedLemmingsCounter = null;

lemmings.master.prototype.init = function(lemming_name, lemming_data)
{
	this.output			= document.getElementById('lemming_outputs');
	this.date_start 	= new Date();
	
	if(lemming_name) { this.lemming_name = lemming_name; }
	if(lemming_data) { this.lemming_data = lemming_data; }
}

lemmings.master.prototype.setLemmingName = function(lemming_name)
{
	this.lemming_name	= lemming_name;
}

lemmings.master.prototype.setLemmingName = function(lemming_data)
{
	this.lemming_data	= lemming_data;
}

lemmings.master.prototype.run = function(lemming_name, data)
{
	this.init(lemming_name, data);
	
	// sanity checker
	if(data.length > 16) 
	{
		this.log('Impossible to launch lemmings : you can only launch a maximum of 16 lemmings');
		return;
	}
	
	// iterate on data to launch the right number of lemmings from the cliff
	for(var key in data) 
	{
		var item_data = data[key];
		try 
		{
			// TODO : clean path : add them in options / configuration ?
			var worker = new lemmings.worker('src/lemmings/worker.js');
			worker.postMessage('http://lemmings.localhost/' + lemming_name + '?alea=' + Math.random());
			worker.postMessage('Data:' + item_data);
			
			var closure = lemmings.lib.closure(this, this.doStoreResult);
			worker.onmessage = closure;
		}
		
		catch(e)
		{
			this.log(e.message);
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
			this.log("worker no." + key + " launched");
		}
	}
}

lemmings.master.prototype.doStoreResult = function(event)
{
	var data = event.data;
	this.log('Message received : ' + data);
	
	if(data.substr(0, 5) == "json:")
	{
		data = lemmings.lib.parseJSON(data.substr(5));
	}
	else if(data.substr(0, 4) == "xml:")
	{
		data = lemmings.lib.parseXML(data.substr(4));
	}
		
	if(typeof(this.storeResult) == "function")
	{
		this.storeResult(data);
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

lemmings.master.prototype.log = function(message)
{
	var log_container = document.getElementById('log');
	if(log_container == null) { return ; }
	
	log_container.textContent += message + "\n";
}