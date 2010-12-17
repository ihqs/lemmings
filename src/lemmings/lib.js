lemmings.lib = {}
 	
lemmings.lib.closure = function(object, method)
{
	var old_args = lemmings.lib.enumToArray(arguments);
	old_args.shift();
	old_args.shift();
	
	return function() 
	{
		var new_args = lemmings.lib.enumToArray(arguments);
		return method.apply(object, old_args.concat(new_args));
	}
}

lemmings.lib.enumToArray = function(iterable)
{
	if (!iterable) { return []; }
	if (iterable.toArray) 
	{
		return iterable.toArray();
	}
	
	else 
	{
		var results = [];
		for (var i = 0; i < iterable.length; i++) 
		{
			results.push(iterable[i]);
		}
		return results;
	}	
}

lemmings.lib.addBehaviour = function(object, behaviourToAdd)
{
	if(!object) 		{ throw new lemmings.exception.emptyParameter("object"); }
	if(!behaviourToAdd) { throw new lemmings.exception.emptyParameter("behaviourToAdd"); }

	if(typeof(behaviourToAdd) === "string")
	{
		behaviourToAdd = eval('(' + behaviourToAdd + ')');
	}
	
	if(typeof(behaviourToAdd) !== "object"
	&& typeof(behaviourToAdd) !== "function") { throw new lemmings.exception.wrongParameter("behaviourToAdd", "object", behaviourToAdd); }
	
	var classPrototype = behaviourToAdd.prototype;
	if(!classPrototype) { return; }
		
	for(var property in classPrototype) 
	{
		object[property] = classPrototype[property];
	}
	
	object.self = object;
}

lemmings.lib.removeBehaviour = function(object, behaviourToRemove)
{
	if(!object) 		{ throw new lemmings.exception.emptyParameter("object"); }
	if(!behaviourToAdd) { throw new lemmings.exception.emptyParameter("behaviourToRemove"); }

	if(typeof(behaviourToRemove) === "string")
	{
		behaviourToRemove = eval('(' + behaviourToRemove + ')');
	}
	if(typeof(behaviourToRemove) !== "object"
	&& typeof(behaviourToRemove) !== "function") { throw new lemmings.exception.wrongParameter("behaviourToAdd", "object", behaviourToRemove); }
		
	
	var classPrototype = behaviourToRemove.prototype;
	if(!classPrototype) { return; }
		
	for(var property in classPrototype) 
	{
		delete object[property];
	}
}

lemmings.lib.importedScripts = 0;
lemmings.lib.importScript = function(uri, callback)
{
	if(!callback) { callback = function() { ; } }
	
	lemmings.lib.importedScripts++;
	var script_id = "src_" + lemmings.lib.importedScripts;
	
	var script = document.createElement('script');
	with(script)
	{
		id = script_id;
		type = "text/javascript";
		src = uri;
		onload = callback;
	}
	document.body.appendChild(script);
}

lemmings.lib.isWorkerCompatible = function()
{
	return (typeof(Worker) !== "undefined");
}