lemmings = {
	url: null,
	path: '/src/lemmings',
	log: false
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

lemmings.importScripts('lib', 'messages', 'master');
lemmings.worker = Worker;