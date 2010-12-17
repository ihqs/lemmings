lemmings = {
	protocol: 			'http://',
	url: 				document.domain,
	path: 				'/src/lemmings',
	
	log: 				false,
	compatibility_mode: false,
	pending:			true,
	
	launchedLemmings: 	0,
	lemmingsLimit:		16
}

lemmings.init = function()
{
	if(lemmings.lib.isWorkerCompatible())
	{
		this.compatibility_mode = false;
		this.worker = Worker;
		this.pending = false;
		return; 
	}

console.log('-- your browser is not compatible with web workers');
	this.compatibility_mode = true;
	this.pending = true;
	lemmings.lib.importScript(lemmings.path + '/worker_compatibility.js', lemmings.loadCompatibility);
}

lemmings.loadCompatibility = function()
{ 
	lemmings.lib.importScript(lemmings.path + '/worker.js');
}

lemmings.stashed = []
lemmings.stash = function(object, method)
{
	var old_args = lemmings.lib.enumToArray(arguments);
	old_args.shift();
	old_args.shift();
	
	lemmings.stashed.push(function() { return method.apply(object, old_args); });
}

lemmings.unstash = function()
{
	lemmings.pending = false;
	
	for(var key in lemmings.stashed)
	{
		var func = lemmings.stashed[key];
		func();
	}
	
	lemmings.stashed = [];
}