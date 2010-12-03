lemmings = {}	

importScripts('lib.js');
importScripts('messages.js');
lemmings.lib.extend(this, lemmings.messages);

this.is_worker = true;

this.onerror = function(e)
{
	this.postMessage({ action: "Log", message: '[' + e.filename + ':' + e.lineno + '] ' + e.message });
}

this.onImportMessage = function(data)
{
	importScripts(data.url);
}

this.onExtendMessage = function(data)
{
	lemmings.lib.extend(this, data.classToAdd);
}

this.onDataMessage = function(data)
{
	this.process();
}
