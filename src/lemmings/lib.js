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

lemmings.lib.parseXML = function(string)
{
	if (window.DOMParser)
	{
		var parser = new DOMParser();
		xml = parser.parseFromString(string,"text/xml");
	}

	else
	{
		xml = new ActiveXObject("Microsoft.XMLDOM");
		xml.async = "false";
		xml.loadXML(string); 
	}
	
	return xml; 
}

lemmings.lib.parseJSON = function(string)
{
	var json = eval("(" + string + ")");
	return json; 
}