lemmings.url = 'http://lemmings.localhost';

var master = new lemmings.master();
master.doOnMessage = function(data)
{
	nb_workers_closed++;
	this.outputResult(4 * parseInt(data.value) / item_per_worker);
	
	total_data += parseInt(data.value);
	document.getElementById('global_result').textContent = (4 * total_data) / (nb_workers_closed * item_per_worker);
	
	var now = new Date();
	document.getElementById('elapsed').textContent = now.getTime() - master.date_start.getTime();
	result++;
}

var total_data = 0;
var result = 0;
var items_per_worker = 1000000;
var nb_workers = 8;
var nb_workers_closed = 0;

var data = [];
for(var i = 0; i < nb_workers; i++) { data[i] = items_per_worker; }
master.init('demos/pi/worker.js', data);
master.run();