/**
 * Managing exception in the lemmings framework
 *
 * @package     lemmings
 * @subpackage  exception
 *
 * @author      Antoine Berranger <antoine@ihqs.net>
 */
lemmings.exception =
{
    emptyParameter: function(parameter)
    {
        this.name 	 = "Lemmings Empty Parameter Exception";
        this.message = "You have to specify the '" + parameter + "' parameter";
    },

    wrongParameter: function(parameter, type, given)
    {
        this.name       = "Lemmings Wrong Parameter Exception";
        this.message    = "'" + parameter + "' must be an instance of '" + type + "' - " + typeof(given) + " given";
    },

    messageFormat: function()
    {
        this.name       = "Lemmings Message Format Exception";
        this.message    = "Message is not well formatted";
    },

    tooMuchWorker: function()
    {
        this.name       = "Too Much Workers Exception";
        this.message    = "Impossible to launch lemmings : you can only launch a maximum of 16 lemmings";
    }
}
