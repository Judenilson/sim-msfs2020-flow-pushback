let action = false;
let stop = false;
let rotate = 0;

scroll((event) => {
  if (event.scroll < 1){
    rotate ++;
  } else {
    rotate --;
  }
  if (rotate < 1){
    rotate = 1;
  }

  info(() => {
     const dom = [
    "<div style='text-align:center;'>",
    "<span style='opacity:0.5;font-size:0.75em;line-height:1.2em;'>SPEED</span>",
    "<br/>",
    "<span style=>" + rotate + "</span>",
    "</div>"
    ];
    return dom.join('');
  });
});

loop_15hz(() => {
  if (action){
    this.$api.variables.set('A:ROTATION VELOCITY BODY Y', 'number', -(rotate/1000));
    if (action && stop){
      rotate -= 1;
      if (rotate <= 0){
        rotate = 0;
        action = false;        
        this.$api.variables.set('A:RUDDER POSITION', 'number', 0);
      }
    }
  }
});

run(() => {
  if (!action) {
    action = true;
    stop = false;
    rotate = 20;
    this.$api.variables.set('K:PARKING_BRAKE_SET', 'bool', 0);
    this.$api.variables.set('A:RUDDER POSITION', 'number', 16383);
    state(() => {
      return 'mdi:lightbulb-on:STOP';
    });
  } else {
    stop = true;
    state(() => {
      return 'mdi:arrow-right-circle';
    });
  }
});

style(() => {
	const state = this.$api.variables.get("A:ROTATION VELOCITY BODY Y", "number");
	return (state < -0.01 && action) ? 'active' : null;
});