lemmings = {}	

importScripts('exceptions.js');
importScripts('lib.js');
importScripts('messages.js');
lemmings.lib.addBehaviour(this, lemmings.messages);

this.is_worker = true;

this.onerror = function(e)
{
	this.postMessage({ action: "Log", message: '[' + e.filename + ':' + e.lineno + '] ' + e.message });
}

this.onImportMessage = function(data)
{
	importScripts(data.url);
}

this.onAddBehaviourMessage = function(data)
{
	if(data.url) 		{ importScripts(data.url); }
	if(data.behaviour) 	{ lemmings.lib.addBehaviour(this, data.behaviour); }
}

this.onRemoveBehaviourMessage = function(data)
{
	if(data.url) 		{ importScripts(data.url); }
	if(data.behaviour) 	{ lemmings.lib.removeBehaviour(this, data.behaviour); }
}
