lemmings = {};
lemmings.importScripts = function()
{
	for(var i = 0; i < arguments.length; i++)
	{	
	    var tag = document.createElement("script");
	    with(tag)
	    {
	    	type = "text/javascript";
	    	src	 = 'src/lemmings/' + arguments[i] + '.js';
	    }
	    
	    document.body.appendChild(tag);
	}
}

lemmings.importScripts('lib', 'master', 'worker');
lemmings.worker = Worker;