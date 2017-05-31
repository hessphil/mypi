'use strict';

class Playable {
	constructor() {
		if (this.constructor === Playable) {
			throw new Error("Can't instantiate abstract class!");
		}
		
		// initialize callback methods
		this.onPlay={}
		this.onEnd={}
		this.onStop={}
		this.onPause={}
		this.onResume={}
		
		this.volume=1
		
		this.isPlaying=false
	}
	
	playProlog()
	{
		// simply call the callbacks
		for(callbackMethod in this.onPlay){
			callbackMethod(this.onPlay[callbackMethod])
		}
	}
	
	playEpilog()
	{
		// simply call the callbacks
		for(callbackMethod in this.onEnd){
			callbackMethod(this.onEnd[callbackMethod])
		}
	}
	
	play()
	{
	}
	
	addOnPlay(callback,args)
	{
		this.onPlay[callback]=args;
	}
	
	addOnPlay(callback,args)
	{
		this.onPlay[callback]=args;
	}
	
	
	stop()
	{
		// simply call the callbacks
		for(callbackMethod in this.onStop){
			callbackMethod(this.onStop[callbackMethod])
		}
	}
	
	addOnStop(callback,args)
	{
		this.onStop[callback]=args;
	}
	
	pause()
	{
		// simply call the callbacks
		for(callbackMethod in this.onPause){
			callbackMethod(this.onPause[callbackMethod])
		}
	}
	
	addOnPause(callback,args)
	{
		this.onPause[callback]=args;
	}
	
	resume()
	{
		// simply call the callbacks
		for(callbackMethod in this.onResume){
			callbackMethod(this.onResume[callbackMethod])
		}
	}
	
	addOnResume(callback,args)
	{
		this.onResume[callback]=args;
	}
	
	getView()
	{
		
	}
	
	setVolume(value)
	{
		this.volume=value
	}
}

module.exports = Playable;