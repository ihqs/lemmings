// settings
var num_workers = 16;
var items_per_worker = 25000;

// start the workers
var result = 0;
var pending_workers = num_workers;

var timer_begin = new Date();
for (var i = 0; i < num_workers; i += 1) 
{
  var output = document.createElement('output');
  output.id = 'output_' + i;
  document.getElementById('outputs').appendChild(output);
  
  var br = document.createElement('br');
  document.getElementById('outputs').appendChild(br);
  
  try 
  {
	  var worker = new Worker('prime_worker.js');
	  worker.postMessage("{id: " + i + ", start: " + (i * items_per_worker) + " }");
	  worker.onmessage = storeResult;
  }
  catch(e)
  {
	  alert('errr');
	  log(e.message);
  }
  finally
  {
	  log("worker no." + i + " launched");
  }
}

// handle the results
function storeResult(event) 
{ 
	var data = eval("(" + event.data + ")");
	document.getElementById('output_' + data.id).textContent = data.dp;
	document.getElementById('nb_prime').textContent++;
	
	var timer_end = new Date();
	document.getElementById('elapsed').textContent = timer_end.getTime() - timer_begin.getTime();
	
}

function log(t)
{
	document.getElementById('log').textContent += t + "\n";
}