
if(typeof(lemmings) === "undefined") 		{ lemmings = {} } 
if(typeof(lemmings.worker) === "undefined") { lemmings.worker = function() { ; } }

lemmings.worker.prototype.onerror = function(e)
{
	this.doLog(e);
}

lemmings.worker.prototype.doLog = function(message)
{
	this.postMessage({ action: "Log", message: message });
}

lemmings.worker.prototype.onInitMessage = function(data)
{
	this.worker_id = data.id;
	this.onAddBehaviourMessage(data);
}

lemmings.worker.prototype.onImportMessage = function(data)
{
	this.importScripts(data.url);
}

lemmings.worker.prototype.onAddBehaviourMessage = function(data)
{
	if(data.url) 		{ this.importScripts(data.url); }
	if(data.behaviour) 
	{ 
		self = this;
		var extend = function() { lemmings.lib.addBehaviour(self, data.behaviour) };
		if(lemmings.pending)
		{
			lemmings.stash(extend);
		}
		else
		{
			extend();
		}
	}
}

lemmings.worker.prototype.onRemoveBehaviourMessage = function(data)
{
	if(data.url) 		{ this.importScripts(data.url); }
	if(data.behaviour) 
	{ 
		self = this;
		var extend = function() { lemmings.lib.removeBehaviour(self, data.behaviour) };
		if(lemmings.pending)
		{
			lemmings.stash(extend);
		}
		else
		{
			extend();
		}
	}
}

if(!lemmings.compatibility_mode)
{
	try
	{
		this.importScripts('exceptions.js', 'lib.js', 'messages.js');
		lemmings.lib.addBehaviour(this, lemmings.messages);
		lemmings.lib.addBehaviour(this, lemmings.worker);
	}
	
	catch(e)
	{
		this.postMessage({ action: "Log", message: e.message });
	}
}
else
{
	lemmings.unstash();	
}