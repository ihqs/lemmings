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
	// TODO : transform XML to json
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

lemmings.lib.toJSON = function(object)
{
	// TODO : upgrade this function
	var string = '{';
	for(var key in object)
	{
		string += '"' + key + '": "' + object[key] + '",';
	}
	
	string = string.substr(0, string.length - 1) + '}';
	return string;
}

lemmings.lib.extend = function(object, classToAdd)
{
	if(!object) 	{ throw 'Empty parameter : "object"'; }
	if(!classToAdd)	{ throw 'Empty parameter : "classToAdd"'; }
	
	if(typeof(classToAdd) == "string")
	{
		classToAdd = eval('(' + classToAdd + ')');
	}
	
	var classPrototype = classToAdd.prototype;
	if(!classPrototype) { throw 'Class has no prototype'; }
	for(var property in classPrototype) 
	{
		object[property] = classPrototype[property];
	}
	
	object.self = object;
}