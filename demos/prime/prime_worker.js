var id = null;

onmessage = function work(event) 
{
	var data = eval("(" + event.data + ")");
	var id = data.id;
	var n = 1 * data.start;
	
	search: while (true) 
	{
	  n += 1;
	  if(n >= data.start+25000) { break search; }
	  for (var i = 2; i <= Math.sqrt(n); i += 1)
	  {
	    if (n % i == 0) continue search;
	  }
	  
	  // found a prime!
	  postMessage("{id: " + id + ", dp: " + n + "}");
	}
	
  close();
}