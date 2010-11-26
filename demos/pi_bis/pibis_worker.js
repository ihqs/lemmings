var id = null;

onmessage = function work(event) 
{
	var data = eval("(" + event.data + ")");
	var n = 1 * data.start;
	
	total = 0;
	search: while (true) 
	{
	  n += 1;
	  if(n >= data.start + 25000) { break search; }
	  
	  var r1 = 4 / ((8 * n) + 1 );
	  var r2 = 2 / ((8 * n) + 4 );
	  var r3 = 1 / ((8 * n) + 5 );
	  var r4 = 1 / ((8 * n) + 6 );
	  var r5 = Math.pow((1 / 16), n);
	  var m = (r1 - r2 - r3 - r4) * r5;
	  total += m;
	  
	  postMessage("{id: " + data.id + ", dp: " + total + "}");
	}
	
  close();
}