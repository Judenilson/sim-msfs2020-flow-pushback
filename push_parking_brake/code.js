run(() => {
  const parkBrake = this.$api.variables.get('A:BRAKE PARKING POSITION', 'bool');
  this.$api.variables.set('K:PARKING_BRAKE_SET', 'bool', parkBrake ? 0 : 1);    
  info(() => {
     const dom = [
    "<div style='text-align:center;'>",
    "<span style='opacity:0.5;font-size:0.75em;line-height:0.5em;'>PARKING</span>",
    "<br/>",
    "<span style='opacity:0.5;font-size:0.75em;line-height:0.5em;'>BRAKE</span>",
    "<br/>",
    "<span style='opacity:1;font-size:1em;line-height:1.5em;'>"+ (parkBrake ? 'OFF' : 'ON') +"</span>",
    "</div>"
    ];
    return dom.join('');
  });
});

style(() => {
	const state = this.$api.variables.get('A:BRAKE PARKING POSITION', 'bool');
	return state ? 'armed' : null;
});