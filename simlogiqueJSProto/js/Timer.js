class Timer {
	constructor(tickCall, tps) {
		this._run = false;
		this._time;
		this._tickTime;
		this.tickCall = tickCall;
		this._goalTime = 1000/tps;
	}
	
	set tps(tps) { this._goalTime = 1000/tps; }
	get tps() { return 1000/this._goalTime; }
	get isRunning() { return this._run; }
	
	start() {
		if(this._run)
			return;
		this._time = Date.now();
		this._run = true;
		var _this = this;
		setTimeout(function() {_this._tick();}, 0);
	}
	
	stop() {
		this._run = false;
	}
	
	_tick() {
		if(!this._run)
			return;
		this._tickTime = Date.now() - this._time;
		this._time = Date.now();
		
		this.tickCall(this._tickTime);
	
		var t = Date.now() - this._time;
		var _this = this;
		if(t < this._goalTime)
			setTimeout(function() {_this._tick();}, this._goalTime - t);
		else
			setTimeout(function() {_this._tick();}, 0);
	}
}