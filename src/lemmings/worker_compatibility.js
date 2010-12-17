
lemmings.worker = function()
{
	lemmings.lib.addBehaviour(this, lemmings.messages);	
}

lemmings.worker._loaded_scripts = {};

lemmings.worker.prototype.importScripts = function()
{
	lemmings.pending = true;
	var uris = lemmings.lib.enumToArray(arguments);
	
	for(key in uris)
	{
		var src = uris[key];
		if(lemmings.worker._loaded_scripts[src]) { continue; }
		
		lemmings.lib.importScript(src, lemmings.unstash);
		lemmings.worker._loaded_scripts[src] = true;
	}
}
