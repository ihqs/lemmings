/**
 * Managing ingoing and outgoing messages for and from web workers

 * @package     lemmings
 * @subpackage  messages
 *
 * @author      Antoine Berranger <antoine@ihqs.net>
 */

/**
 * Prototype constructor
 */
lemmings.messages = {}

/**
 * Prototype's variables : action codes
 */
lemmings.messages.prototype = {
    ACTION_MESSAGE: "Message",
    ACTION_IMPORT:  "Import",
    ACTION_PROCESS: "Process",
    ACTION_LOG:     "Log",
    ACTION_INIT:    "Init",

    ACTION_ADD_BEHAVIOUR: "AddBehaviour",
    ACTION_DEL_BEHAVIOUR: "RemoveBehaviour"
}

/**
 * Posts a LOG messages.
 *
 * @param   string  message The message to send
 */
lemmings.messages.prototype.log = function(message)
{
    this.postAction(this.ACTION_LOG, { message : message });
}

/**
 * Posts an action message with an object.
 *
 * @param   string                  action  Action's name
 * @param   mixed                   object  The object we'll send
 * @param   null|lemmings.worker    worker  If null, it's a worker to kernel message, otherwise it's a kernel to worker message.
 * 
 * @see     lemmings.doPostMessage
 */
lemmings.messages.prototype.postAction = function(action, object, worker)
{
    if(typeof(object) !== "object") { object = {}; }

    object.action = action;
    this.doPostMessage(object, worker);
}

/**
 * Posts data.
 *
 * @param   string                  variable    The name of the variable to send
 * @param   string                  message     The message we wanna send
 * @param   null|lemmings.worker    worker      If null, it's a worker to master message, otherwise it's a master to worker message.
 *
 * @see     lemmings.doPostMessage
 */
lemmings.messages.prototype.postData = function(variable, message, worker)
{
    object = {
        variable : variable,
        message : message
    };
    this.doPostMessage(object, worker);
}

/**
 * Posts data to every subworkers known
 * Only used when subworkers exists.
 *
 * @param   string  variable  The name of the variable to send
 * @param   mixed  data       The data to attach to this variable
 */
lemmings.messages.prototype.postDataToAll = function(variable, data)
{
    if(!this.workers || !this.workers.length || this.workers.length == 0)
    {
        return ;
    }

    if (!data
    || (typeof(data) != "array" && typeof(data) != "object"))
    {
        var single_data = data;
        data = new Array();

        for(var i = 0; i < this.workers.length; i++)
        {
                data[i] = single_data;
        }
    }

    for(var key in this.workers)
    {
        this.postData(variable, data, this.workers[key]);
    }
}

/**
 * Posts an action message to every subworkers known
 * Only used when subworkers exists.
 *
 * @param   string action   Name of the action to throw to lemmings workers
 * @param   mixed  data     The data to attach to this action
 */
lemmings.messages.prototype.postActionToAll = function(action, data)
{
    if(!this.workers || !this.workers.length || this.workers.length == 0)
    {
        return ;
    }

    if (!data
    || (typeof(data) != "array" && typeof(data) != "object"))
    {
        var single_data = data;
        data = new Array();

        for(var i = 0; i < this.workers.length; i++)
        {
                data[i] = single_data;
        }
    }

    for(var key in this.workers)
    {
        this.postAction(action, data[key], this.workers[key]);
    }
}

/**
 * Do posts a message
 * If worker is null, it's a worker to master message, otherwise it's a master to worker message.
 *
 * @param   string                  message     The message we wanna send
 * @param   null|lemmings.worker    worker      The receiving object
 */
lemmings.messages.prototype.doPostMessage = function(message, worker)
{
    if(this.worker_id) { message.worker_id = this.worker_id; }

    if(lemmings.lib.isWorkerCompatible())
    {
        if(worker)  { worker.postMessage(message); }
        else        { this.postMessage(message); }
    }

    else
    {
        if(worker)  { worker.onmessage({ data: message }); }
        else        { this.onOutgoingMessage({ data: message }); }
    }
}

/**
 * Receiving message.
 * If event.message and event.variable are set, then this.variable will be set to this.message.
 * If event.action is set, then we'll try to launch an 'onACTIONMessage' method.
 *
 * @param   Object  event   An enumeration of data attached to this event
 */
lemmings.messages.prototype.onmessage = function(event)
{
    var data = event.data;
    if(data.message && data.variable)
    {
        this[data.variable] = data.message;
    }

    if(data.action)
    {
        var method = data.action;

        var processed_method = 'on' + method + 'Message';
        if(typeof(this[processed_method]) == "function")
        {
            try
            {
                this[processed_method](data);
            }

            catch(e)
            {
                this.doLog(e);
            }
        }
        else
        {
            console.log(processed_method);
            console.log(typeof(this[processed_method]));
        }
    }
}

/**
 * Conviniency method for devel purposes, logging every message received
 *
 * @param   Object  event   An enumeration of data attached to this event
 */
lemmings.messages.prototype.onOutgoingMessage = function(event)
{
    str = [];
    for(k in event) { str.push(k + ' : ' + event[k])}
    console.log(str);
}
	