lemmings.master = function()
{
	this.is_master  = true;
	this.date_start = null;
	this.date_end 	= null;
	this.workers	= new Array();
	this.date_start = new Date();
	
	lemmings.lib.addBehaviour(this, lemmings.messages);
}

lemmings.master.prototype.setWorkersBehaviour = function(behaviour)
{
	this.workersBehaviour = behaviour;
}

lemmings.master.prototype.setWorkerUri = function(uri)
{
	this.workersUri = uri;
}

lemmings.master.prototype.createWorker = function(options)
{
	// sanity checker
	if(lemmings.launchedLemmings >= 16) 
	{
		throw new lemmings.exception.tooMuchWorkers();
	}
	
	try 
	{
		var worker = new lemmings.worker(lemmings.protocol + lemmings.url + '/' + lemmings.path + '/worker.js');
		if(options.uri) 		{ this.postAction(this.ACTION_IMPORT, { url: options.uri }, worker) }
		if(options.behaviour)	{ this.postAction(this.ACTION_ADD_BEHAVIOUR, { behaviour: options.behaviour }, worker) }
		
		var closure = lemmings.lib.closure(this, this.onmessage);
		worker.onmessage = closure;
	}
	
	catch(e)
	{
		this.doLog('[' + e.filename + ':' + e.lineno + '] ' + e.message);
	}
	
	finally
	{
		lemmings.launchedLemmings++;
		this.workers.push(worker);
		this.doLog("worker no." + lemmings.launchedLemmings + " launched");
		
		return worker;
	}
}

lemmings.master.prototype.createWorkers = function(nb_workers, options)
{
	for(var i = 0; i < nb_workers; i++)
	{
		this.createWorker(options);
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