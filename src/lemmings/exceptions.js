lemmings.exception =
{
	emptyParameter: function(parameter)
	{
		return "[Empty Parameter Exception] You have to specify the '" + parameter + "' parameter";
	},

	wrongParameter: function(parameter, type, given)
	{
		return "[Wrong Parameter Exception] Parameter '" + parameter + "' must be an instance of '" + type + "' - " + typeof(given) + " given";
	},
	
	messageFormat: function()
	{
		return "[Message Format Exception] Message is not well formatted";
	},
	
	tooMuchWorker: function()
	{
		return "[Too Much Worker Exception] Impossible to launch lemmings : you can only launch a maximum of 16 lemmings";
	}
}
