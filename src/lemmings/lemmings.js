/**
 * Kernel of lemmings framework
 *
 * @package     lemmings
 *
 * @author      Antoine Berranger <antoine@ihqs.net>
 */
lemmings = {
        /** @var string  protocol   What protocol is currently being used */
	protocol:   'http://',

        /** @var string  url        Base path of your project */
	url:        document.domain,

        /** @var string  path       Path to the lemmings library */
	path:       '/src/lemmings',

        /** @var boolean log        Enabling / Disabling console logs */
	log:        false,

        /** @var boolean compatibility_mode Enabling / Disabling compatibility mode for older browsers */
	compatibility_mode: false,

        /** @var int    lemmingsLimit       Maximum number of lemmings we can launch. It's the maximum number opera browsers will accept */
	lemmingsLimit:		16,

        /** @var int     launchedLemmings   Number of lemmings currently launched */
	launchedLemmings: 	0,

        /** @var boolean pending    Is there workers pending ? */
	pending:    true
}

/**
 * Initialization of lemmings framework
 */
lemmings.init = function()
{
	if(lemmings.lib.isWorkerCompatible())
	{
		this.compatibility_mode = false;
		this.worker = Worker;
		this.pending = false;
		return; 
	}

	this.compatibility_mode = true;
	this.pending = true;
	lemmings.lib.importScript(lemmings.path + '/worker_compatibility.js', lemmings.loadCompatibility);
}

/**
 * Loading libraries for compatibility mode
 */
lemmings.loadCompatibility = function()
{ 
	lemmings.lib.importScript(lemmings.path + '/worker.js');
}

/** @var Array  A stack of operations */
lemmings.stashed = []

/**
 * Adding an operation to our stack
 *
 * @param   Object      object  The object on which we will apply the method
 * @param   function    method  The method you wanna add to the stack
 */
lemmings.stash = function(object, method)
{
	var old_args = lemmings.lib.enumToArray(arguments);
	old_args.shift();
	old_args.shift();
	
	lemmings.stashed.push(function() { return method.apply(object, old_args); });
}

/**
 * Shifting operation stack and
 *
 * @todo    manage errors
 * @todo    shift stack after each operation instead of re-initializating it at the end
 */
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