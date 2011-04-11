/**
 * Some *very* useful methods for our lemmings framework
 *
 * @todo        Explode those methods in proper "classes". It's is actually just "commodity" methods that we will refactor later.
 *
 * @package     lemmings
 * @subpackage  lib
 *
 * @author      Antoine Berranger <antoine@ihqs.net>
 */
lemmings.lib = {}

/**
 * Making a closure that applies an object to a method and nests old and new arguments to it
 * It's quite the same as the $.proxy method from jQuery, but it manages arguments.
 *
 * @param   Object      object  The object on which we will apply the method
 * @param   function    method  The method you wanna add to the stack
 *
 * @return  function    The closure created.
 */
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

/**
 * Transforming an enumeration to an array
 *
 * @param   Object  iterable    An iterable object
 * @return  Array               The object transformed into an array
 */
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

/**
 * Add behaviours to an object.
 * It takes an object's prototype and attach every method in that prototype on the object
 *
 * @param   Object  object          The object we want to extend
 * @param   mixed   behaviourToAdd  The object on which we'll take prototype to apply to previous argument.
 *                                  If this argument is a string, then it'll be evaluated.
 *
 * @throws  lemmings.exception      Wrong parameter
 */
lemmings.lib.addBehaviour = function(object, behaviourToAdd)
{
    if(!object)         { throw new lemmings.exception.emptyParameter("object"); }
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

/**
 * Remove behaviours off an object.
 * It takes an object's prototype and detach every method in that prototype on the object
 *
 * @param   Object  object              The object we want to extend
 * @param   mixed   behaviourToRemove   The object on which we'll take prototype t.
 *                                      If this argument is a string, then it'll be evaluated.
 *
 * @throws  lemmings.exception          Wrong parameter
 */
lemmings.lib.removeBehaviour = function(object, behaviourToRemove)
{
    if(!object)         { throw new lemmings.exception.emptyParameter("object"); }
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

/** @var int    Number of imported scripts. Used to build unique ids on scripts */
lemmings.lib.importedScripts = 0;

/**
 * Importing new scripts
 *
 * @param   string      uri
 * @param   function    callback
 */
lemmings.lib.importScript = function(uri, callback)
{
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

/**
 * Decides whether user's browser is compatible with web worker
 *
 * @return  boolean     Is it ?
 */
lemmings.lib.isWorkerCompatible = function()
{
    return (typeof(Worker) !== "undefined");
}