'use strict';

var x = document.createElement('script');
x.src = 'http://code.responsivevoice.org/responsivevoice.js';
document.getElementsByTagName("head")[0].appendChild(x);

const Playable = require('./playable.js');

class Text extends Playable {
	constructor(text,parameters,voiceType='Deutsch Female') {
		if (this.constructor === Text) {
			throw new Error("Can't instantiate abstract class!");
		}
		
		super();
		this.text = text
		
		responsiveVoice.setDefaultVoice(voiceType);
	}
	
	play()
	{
		this.playProlog()
		parameters={rate: this.rate,volume: this.volume,pitch: this.pitch,onstart: Object.keys(this.onPlay)[0], onend: Object.keys(this.onEnd)[0],onpause: Object.keys(this.onPause)[0],onresume:Object.keys(this.onEnd)[0]}
		responsiveVoice.speak(this.text,parameters);
	}
	
	stop()
	{
		responsiveVoice.cancel();
	}
	
	pause()
	{
		responsiveVoice.pause();
	}
	
	resume()
	{
		responsiveVoice.resume();
	}
	
	getView()
	{
		super.getView();
	}
	
	setVoiceType(voiceType)
	{
		responsiveVoice.setDefaultVoice(voiceType);
	}
	
	setPitch(value)
	{
		this.pitch=value;
	}
	
	setRate(value)
	{
		this.rate=value;
	}
	
	isSupported()
	{
		return responsiveVoice.voiceSupport();
	}
	
}

module.exports = Text;
