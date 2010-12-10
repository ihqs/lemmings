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
	lemmings.lib.addBehaviour(this, data.classToAdd);
}

this.onRemoveBehaviourMessage = function(data)
{
	lemmings.lib.removeBehaviour(this, data.classToRemove);
}
