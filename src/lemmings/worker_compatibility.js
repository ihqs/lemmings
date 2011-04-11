/**
 * Fake lemmings workers for the gerontology service

 * @package     lemmings
 * @subpackage  worker
 *
 * @author      Antoine Berranger <antoine@ihqs.net>
 */

/**
 * Prototype constructor
 *  - add "lemmings.messages" behaviour to this new object
 */
lemmings.worker = function()
{
    lemmings.lib.addBehaviour(this, lemmings.messages);
}

/**
 * @var Object  _loaded_scripts Enumeration of loaded scripts
 */
lemmings.worker._loaded_scripts = {};

/**
 * Import every scripts passed as arguments.
 * You can add as many arguments as you want to.
 *
 * @param   string  script  Uri of the script we want to load.
 */
lemmings.worker.prototype.importScripts = function()
{
    lemmings.pending = true;
    var uris = lemmings.lib.enumToArray(arguments);

    for(key in uris)
    {
        var src = uris[key];
        if(lemmings.worker._loaded_scripts[src]) { continue; }

        lemmings.lib.importScript(src, lemmings.unstash);
        lemmings.worker._loaded_scripts[src] = true;
    }
}
