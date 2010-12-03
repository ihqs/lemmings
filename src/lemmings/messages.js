lemmings.messages = {}
lemmings.messages.prototype = {
	ACTION_IMPORT: 	"Import",
	ACTION_EXTEND: 	"Extend",
	ACTION_PROCESS: "Process",
	ACTION_LOG:		"Log"
}

lemmings.messages.prototype.log = function(message)
{
	this.postAction(this.ACTION_LOG, { message : message });
}

lemmings.messages.prototype.postAction = function(action, object, worker)
{
	object.action = action;
	this.doPostMessage(object, worker);
}

lemmings.messages.prototype.doPostMessage = function(message, worker)
{
	if(worker)  { worker.postMessage(message); }
	else		{ postMessage(message); }
}

lemmings.messages.prototype.onmessage = function(event)
{
if(typeof(console) != "undefined") { console.log(event.data); }
	
	var data = event.data;
	if(data.message)
	{
		this[data.message] = data;
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
	
	if(!data.message && !data.action)
	{
		this[data] = data;
	}
}
	