/**
 * Defining workers prototype.
 * There is no prototype constructor as we attach those prototype methods to the native Worker prototype.

 * @package     lemmings
 * @subpackage  worker
 *
 * @author      Antoine Berranger <antoine@ihqs.net>
 */

if(typeof(lemmings) === "undefined")        { lemmings = {} }
if(typeof(lemmings.worker) === "undefined") { lemmings.worker = function() { ; } }

/**
 * Managing errors
 *
 * @param   string  e   Error thrown
 */
lemmings.worker.prototype.onerror = function(e)
{
    this.doLog(e);
}

/**
 * Logging for worker = post a message with an action's name "Log"
 *
 * @param   string  message The message we wanna log
 */
lemmings.worker.prototype.doLog = function(message)
{
    this.postMessage({ action: "Log", message: message });
}

/**
 * Behaviour on initialization messages received.
 * It will mainly add behaviours to this worker.
 *
 * @param   Object  data    Data posted along with this action
 */
lemmings.worker.prototype.onInitMessage = function(data)
{
    this.worker_id = data.id;
    this.onAddBehaviourMessage(data);
}

/**
 * Behaviour on import messages received.
 *
 * @param   Object  data    Data posted along with this action
 */
lemmings.worker.prototype.onImportMessage = function(data)
{
    this.importScripts(data.url);
}

/**
 * Behaviour on addBehaviour messages received.
 *
 * @todo    Refactor this method along with "addBehaviour" from lib subpackage.
 *
 * @param   Object  data    Data posted along with this action.
 *                          If data.url is set, then a new script will be imported
 *                          If data.behaviour is set, then a new behaviour will be attached to this worker
 */
lemmings.worker.prototype.onAddBehaviourMessage = function(data)
{
    if(data.url) 		{ this.importScripts(data.url); }
    if(data.behaviour)
    {
        self = this;
        var extend = function() { lemmings.lib.addBehaviour(self, data.behaviour) };
        if(lemmings.pending)
        {
            lemmings.stash(extend);
        }
        else
        {
            extend();
        }
    }
}

/**
 * Behaviour on removeBehaviour messages received.
 *
 * @todo    Refactor this method along with "removeBehaviour" from lib subpackage.
 *
 * @param   Object  data    Data posted along with this action.
 *                          If data.url is set, then a new script will be imported
 *                          If data.behaviour is set, then a new behaviour will be detached to this worker
 */
lemmings.worker.prototype.onRemoveBehaviourMessage = function(data)
{
    if(data.url) 		{ this.importScripts(data.url); }
    if(data.behaviour)
    {
        self = this;
        var extend = function() { lemmings.lib.removeBehaviour(self, data.behaviour) };
        if(lemmings.pending)
        {
            lemmings.stash(extend);
        }
        else
        {
            extend();
        }
    }
}

/**
 * Initialization worker
 */
if(!lemmings.compatibility_mode)
{
    try
    {
        this.importScripts('exceptions.js', 'lib.js', 'messages.js');
        lemmings.lib.addBehaviour(this, lemmings.messages);
        lemmings.lib.addBehaviour(this, lemmings.worker);
    }

    catch(e)
    {
        this.postMessage({ action: "Log", message: e.message });
    }
}
else
{
    lemmings.unstash();
}