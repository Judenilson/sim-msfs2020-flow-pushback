let action = false;
let stop = false;
let velocity = 5;

scroll((event) => {
  if (event.scroll < 1){
    velocity ++;
  } else {
    velocity --;
  }
  if (velocity < 1){
    velocity = 1;
  }

  info(() => {
     const dom = [
    "<div style='text-align:center;'>",
    "<span style='opacity:0.5;font-size:0.75em;line-height:1.2em;'>SPEED</span>",
    "<br/>",
    "<span style=>" + velocity + "</span>",
    "</div>"
    ];
    return dom.join('');
  });
});

loop_15hz(() => {
	if (action){
		this.$api.variables.set('A:VELOCITY BODY Z', 'number', (velocity/10));
    if (action && stop){
    	velocity -= 0.5;
	    if (velocity <= 0){
	      velocity = 0;
	      action = false;
	    }
	  }
	}
});	

run(() => {
	if (!action) {
		action = true;
		stop = false;
		velocity = 5;
    this.$api.variables.set('K:PARKING_BRAKE_SET', 'bool', 0);
		this.$api.variables.set('A:RUDDER POSITION', 'number', 0);
		state(() => {
		  return 'mdi:lightbulb-on:STOP';
		});
	} else {
	  stop = true;
		state(() => {
	  	return 'mdi:arrow-up-circle';
		});
	}
});

style(() => {
	const state = this.$api.variables.get("A:VELOCITY BODY Z", "number");
	return (state > 0.1 && action) ? 'active' : null;
});