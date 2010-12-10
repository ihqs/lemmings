lemmings = {
	protocol: (typeof(document.protocol) !== "undefined") ? document.protocol : 'http://',
	url: document.domain,
	path: '/src/lemmings',
	log: false,
	launchedLemmings: 0
}

lemmings.importScripts = function()
{
	for(var i = 0; i < arguments.length; i++)
	{	
	    var tag = document.createElement("script");
	    with(tag)
	    {
	    	type = "text/javascript";
	    	src	 = this.path + '/' + arguments[i] + '.js';
	    }
	    
	    document.body.appendChild(tag);
	}
}

lemmings.importScripts('exceptions', 'lib', 'messages', 'master');
lemmings.worker = Worker;