lemmings.messages = {}
lemmings.messages.prototype = {
	ACTION_MESSAGE:	"Message",
	ACTION_IMPORT: 	"Import",
	ACTION_PROCESS: "Process",
	ACTION_LOG:		"Log",

	ACTION_ADD_BEHAVIOUR: 	"AddBehaviour",
	ACTION_DEL_BEHAVIOUR: 	"RemoveBehaviour",
}

lemmings.messages.prototype.log = function(message)
{
	this.postAction(this.ACTION_LOG, { message : message });
}

lemmings.messages.prototype.postAction = function(action, object, worker)
{
	if(typeof(object) !== "object") { object = {} }
	
	object.action = action;
	this.doPostMessage(object, worker);
}

lemmings.messages.prototype.postData = function(variable, message, worker)
{
	object = { 
		variable : variable,
		message : message
	};
	this.doPostMessage(object, worker);
}

lemmings.messages.prototype.postDataToAll = function(variable, data, worker)
{
	if(!this.workers || !this.workers.length || this.workers.length == 0)
	{
		return ;
	}
	
	if (!data
	|| (typeof(data) != "array" && typeof(data) != "object"))
	{
		var single_data = data;
		data = new Array();
		
		for(var i = 0; i < this.workers.length; i++)
		{
			data[i] = single_data;
		}
	}
	
	for(var key in this.workers)
	{
		this.postData(variable, data, this.workers[key]);
	}
}

lemmings.messages.prototype.postActionToAll = function(action, data)
{
	if(!this.workers || !this.workers.length || this.workers.length == 0)
	{
		return ;
	}
	
	if (!data
	|| (typeof(data) != "array" && typeof(data) != "object"))
	{
		var single_data = data;
		data = new Array();
		
		for(var i = 0; i < this.workers.length; i++)
		{
			data[i] = single_data;
		}
	}
	
	for(var key in this.workers)
	{
		this.postAction(action, data[key], this.workers[key]);
	}
}

lemmings.messages.prototype.doPostMessage = function(message, worker)
{
	if(worker)  { worker.postMessage(message); }
	else		{ postMessage(message); }
}

lemmings.messages.prototype.onmessage = function(event)
{
	var data = event.data;
	if(data.message && data.variable)
	{
		this[data.variable] = data.message;
	}
	
	if(data.action)
	{
		var method = data.action;
		
		var processed_method = 'on' + method + 'Message';
		if(typeof(this[processed_method]) == "function")
		{
			this[processed_method](data);
		}
	}
}
	