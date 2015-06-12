(function(jQuery){
	var s = this; this.url = this.data = null

	this.ping = function(){
		jQuery.getJSON(s.url,s.data,function(r){
			// No updates
			if ( r === false || r === null || r.nothing ) {
				s.fireEvent('nothing', [s]);
				s.pong();
			}
			else {
				s.fireEvent('pong',[r,s]);
				s.pong();
			}
		});
	};

	this.pong = function(){
		// Fire event
		s.fireEvent('pung');

		// Run another pulse
		s.ping();
	};

	this.e = {};

	this.addEvent = function(type, fn){
		s.e[type] = this.e[type] || [];
		s.e[type][this.e[type].length] = fn;
		return s;
	};

	this.fireEvent = function(type, args){
		if (!s.e||!s.e[type]) return;
		jQuery.each(this.e[type],function(i,fn){
			if(jQuery.isFunction(fn))
				fn.apply(null, args);
		});
		return s;
	};

	jQuery.realtimeajax = function(url,data,fn){
		if(jQuery.isFunction(data)){fn=data;data=null}
		s.url=url;s.data=data;
		if(fn){s.addEvent('pong',fn);s.ping()}
		return s;
	};
})(jQuery);
