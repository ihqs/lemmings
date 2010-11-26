var total_data = 0;
var result = 0;
var item_per_worker = 1000000;
var nb_workers = 8;

var master = new lemmings.master();
master.storeResult = function(data)
{
	this.outputResult(4 * parseInt(data.value) / item_per_worker);
	
	total_data += parseInt(data.value);
	document.getElementById('global_result').textContent = (4 * total_data) / (nb_workers * item_per_worker);
	
	var now = new Date();
	document.getElementById('elapsed').textContent = now.getTime() - master.date_start.getTime();
	result++;
}

var data = [];
for(var i = 0; i < nb_workers; i++) { data[i] = item_per_worker; }
master.run('demos/pi/worker.js', data);