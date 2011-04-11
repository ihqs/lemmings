/**
 * Lemmings master.
 * This object will launched web workers and attach proper behaviours.
 * It'll be
 *
 * @package     lemmings
 * @subpackage  messages
 *
 * @author      Antoine Berranger <antoine@ihqs.net>
 */

/**
 * Prototype constructor.
 * Init variables and adds lemmings.message behaviours on itself
 */
lemmings.master = function()
{
    this.is_master  = true;
    this.date_start = null;
    this.date_end 	= null;
    this.workers	= new Array();
    this.date_start = new Date();

    lemmings.init();
    lemmings.lib.addBehaviour(this, lemmings.messages);
}

/**
 * Sets a default worker's behaviour for every behaviour created
 *
 * @param   Object  behaviour   Default behaviour to add to workers
 */
lemmings.master.prototype.setWorkersBehaviour = function(behaviour)
{
    this.workersBehaviour = behaviour;
}

/**
 * Set workers uri
 *
 * @param   string  uri   The uri where we'll find workers
 */
lemmings.master.prototype.setWorkerUri = function(uri)
{
    this.workersUri = uri;
}

/**
 * Creates a new worker if we didn't exceed the limit of lemmings.
 * If an operation is pending, then creation is added to framework's operation stock to be executed as soon as possible.
 *
 * @param   Object  options Enumaration of options to pass to worker's constructor
 * @return  lemmings.worker The worker created
 */
lemmings.master.prototype.createWorker = function(options)
{
    if(lemmings.pending)
    {
        lemmings.stash(this, this.createWorker, options);
        return;
    }

    // sanity checker
    if(lemmings.launchedLemmings >= lemmings.lemmingsLimit)
    {
        throw new lemmings.exception.tooMuchWorkers();
    }

    try
    {
        options.id = lemmings.launchedLemmings + 1;
        var worker = new lemmings.worker(lemmings.protocol + lemmings.url + '/' + lemmings.path + '/worker.js');
        this.postAction(this.ACTION_INIT, options, worker);

        var closure = lemmings.lib.closure(this, this.onmessage);
        worker.onmessage = closure;
    }

    catch(e)
    {
        this.doLog(e);
    }

    finally
    {
        lemmings.launchedLemmings++;
        this.workers.push(worker);
        this.doLog("worker no." + lemmings.launchedLemmings + " launched");

        return worker;
    }
}

/**
 * Creates a specified number of web workers. Yiiiiiiih!
 *
 * @param   int     nb_workers  Number of workers to create
 * @param   Object  options     Enumaration of options to pass to worker's constructor
 */
lemmings.master.prototype.createWorkers = function(nb_workers, options)
{
    for(var i = 0; i < nb_workers; i++)
    {
        this.createWorker(options);
    }
}

/**
 * Terminates program. Sends a termination message to every worker
 */
lemmings.master.prototype.terminate = function()
{
    for(var key in this.workers)
    {
        this.workers[key].terminate();
    }
}

/**
 * Listener for log message.
 *
 * @param   Object  data    Data to log
 */
lemmings.master.prototype.onLogMessage = function(data)
{
    this.doLog(data.message);
}

/**
 * Real logger
 *  - Add message to a log element
 *  - Add message to console log if available
 *
 * @param   string  message Message to log
 */
lemmings.master.prototype.doLog = function(message)
{
    if(message.message) { message = '[' + message.filename + ':' + message.lineno + '] ' + message.message; }

    var log_container = document.getElementById('log');
    if(lemmings.log && log_container != null)
    {
        log_container.textContent += message + "\n";
    }

    if(typeof(console) != "undefined"
    && typeof(console.log) == "function")
    {
        console.log(message);
    }
}