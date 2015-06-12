/**
 * Realtime Ajax by Benjamin Hutchins
 * @see http://www.benhutchins.com/project/realtime-ajax
 * @license MIT
 * @warranty None
 */
var RealtimeAjax = new Class({
	Implements: [Options, Events],

	status: 'first',
	options: {
		url: '',
		data: false,
		method: 'get'
	},

	/**
	 * Handle creation
	 */
	initialize: function(options){
		this.setOptions(options);
		window.addEvent('unload', this.cancel);
	},

	/**
	 * function ping
	 * Ping the server for updates
	 */
	ping: function()
	{
		var data = this.options.data; this.canceled = false;
		switch ($type(data)){
			case 'element': data = $(data).toQueryString(); break;
			case 'object': case 'hash': data = Hash.toQueryString(data); break;
		}

		this.request = new Request.JSON({
			url: this.options.url,
			method: this.options.method,
			data: (data?data+'&':'')+'time='+this.time()+'&status='+this.status,
			onFailure: function(){
				this.fireEvent('onFailure');
				this.status= 'failure';
				this.pong();
			}.bind(this),
			onSuccess: function(r){
				// Assume success
				this.status= 'success';

				// No updates
				if ( r === false || r === null || r.nothing ) {
					this.fireEvent('onNothing', [r, this]);
					this.pulsed();
				}

				// Well, there is something
				else {
					this.fireEvent('onPong', [r, this]);
					this.pong();
				}
			}.bind(this)
		});

		this.request.send();
		return this;
	},
	
	/**
	 * function pong
	 * Callver a ping is finished, successful or unsuccessful
	 */
	pong: function(){
		if ( this.canceled ) return;

		// Fire event
		this.fireEvent('onPung');

		// Run another ping
		this.ping();
	},

	/**
	 * function time
	 * @return A proper Unix Timestamp
	 */	
	time: function(){
		return parseInt(new Date().getTime().toString().substring(0, 10));
	},
	
	/**
	 * function cancel
	 * Cancel the active request and stop requesting more
	 */
	cancel: function(){
		this.canceled= true;
		if ( this.request ) this.request.cancel();
		return true;
	}
});

/**
 * Example code:

var ra = new RealtimeAjax({
	url: '/ping',
	onPing: function(r){
		alert(r);
	}
});

 */
