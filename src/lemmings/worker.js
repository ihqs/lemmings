this.processIncomingMessages = function(event)
{
	var method_delimiter = event.data.indexOf(':');
	var method = event.data.substr(0, method_delimiter);
	var data = event.data.substr(method_delimiter + 1);
	
	this['on' + method + 'Message'](data);
}

this.onDataMessage = function(data)
{
	this.data = data;
	this.process(data);
}

this.onmessage = function(event)
{
	importScripts(event.data);
	this.onmessage = this.processIncomingMessages;
}

this.postJSONMessage = function(object)
{
	// TODO : upgrade this function
	var string = '{';
	for(var key in object)
	{
		string += '"' + key + '": "' + object[key] + '",';
	}
	
	string = string.substr(0, string.length - 1) + '}';
	this.postMessage('json:' + string);
}

this.postXMLMessage = function(message)
{
	this.postMessage('xml:' + message);
}

