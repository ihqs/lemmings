var total_data = 0;
var result = 0;
var item_per_worker = 100000;

var master = new lemmings.master();
master.storeResult = function(data)
{
	this.outputResult(4 * parseInt(data.value) / item_per_worker);
	
	total_data += parseInt(data.value);
	document.getElementById('global_result').textContent = (4 * total_data) / (6 * item_per_worker);
	
	var now = new Date();
	document.getElementById('elapsed').textContent = now.getTime() - master.date_start.getTime();
	result++;
}

master.run('demos/pi/worker.js', [item_per_worker,item_per_worker,item_per_worker,item_per_worker,item_per_worker,item_per_worker]);