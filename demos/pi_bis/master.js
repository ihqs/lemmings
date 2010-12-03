lemmings.url = 'http://lemmings.localhost';

var master = new lemmings.master();
master.onResultMessage = function(data) 
{ 
	this.outputResult(data.dp);
	
	total += parseFloat(data.dp);
	document.getElementById('global_result').textContent = Math.sqrt(6 * total);

	var now = new Date();
	document.getElementById('elapsed').textContent = now.getTime() - master.date_start.getTime();
	
	this.log('worker closed');
	this.terminate();
}

var total = 0;
var nb_workers = 4;
var items_per_worker = 10000;

var data = [];
for(var i = 0; i < nb_workers; i++) { data[i] = { start_value: i * items_per_worker }; }
master.init('demos/pi_bis/worker.js', data);
master.run();