lemmings = {
	protocol: (typeof(document.protocol) !== "undefined") ? document.protocol : 'http://',
	url: document.domain,
	path: '/src/lemmings',
	log: false,
	launchedLemmings: 0
}

lemmings.worker = Worker;