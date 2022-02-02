document.addEventListener("DOMContentLoaded", function(event) {
	var circles = [
	  {name : 'container', colorStart: '#FFEA82', colorEnd: '#ED6A5A', procents: '1.0'},
	  {name : 'container2', colorStart: '#FFEA82', colorEnd: '#9634eb', procents: '0.7'},
	  {name : 'container3', colorStart: '#FFEA82', colorEnd: '#10e698', procents: '0.2'},
	  {name : 'container4', colorStart: '#FFEA82', colorEnd: '#1086e6', procents: '0.4'},
	];

	circles.forEach(
	  function circle(object) {
	    var name = object.name;
	    //console.log(name);
	    name = new ProgressBar.Circle('#' + name + '', {
	      color: '#FFEA82',
	      trailColor: '#eee',
	      trailWidth: 5,
	      duration: 1400,
	      easing: 'bounce',
	      strokeWidth: 6,
	      from: {color: object.colorStart, a:0},
	      to: {color: object.colorEnd, a:1},
	      // Set default step function for all animate calls
	      step: function(state, circle) {
	        circle.path.setAttribute('stroke' , state.color);
	      }
	    });

	    name.animate(object.procents);

	  }
	);


	var lines = [
		{name : 'line', color: '#328da8', procents: '1.0'},
		{name : 'line2', color: '#86e610', procents: '.5'},
		{name : 'line3', color: '#e69e10', procents: '.7'},
		{name : 'line4', color: '#1010e6', procents: '.3'},
	];


	lines.forEach(
	  function circle(object) {
	  	var name = object.name;
		name = new ProgressBar.Line('#' + name + '', {
		  strokeWidth: 4,
		  easing: 'easeInOut',
		  duration: 1400,
		  color: object.color,
		  trailColor: '#eee',
		  trailWidth: 4,
		  svgStyle: {width: '100%', height: '100%'},
		  text: {
		    style: {
		      // Text color.
		      // Default: same as stroke color (options.color)
		      color: '#999',
		      position: 'absolute',
		      right: '0',
		      top: '-20px',
		      padding: 0,
		      margin: 0,
		      transform: null
		    },
		    autoStyleContainer: false
		  },
		  step: (state, bar) => {
		    bar.setText(Math.round(bar.value() * 10) + '/10');
		  }
		});

		name.animate(object.procents);  // Number from 0.0 to 1.0

	});


	var languages = [
		{name : 'language1', color: '#10e63e', procents: '.9'},
		{name : 'language2', color: '#e68610', procents: '.5'},
		{name : 'language3', color: '#e69e10', procents: '.7'},
		{name : 'language4', color: '#1010e6', procents: '.3'},
	];


	languages.forEach(
	  function circle(object) {
	  	var name = object.name;
		name = new ProgressBar.Line('#' + name + '', {
		  strokeWidth: 4,
		  easing: 'easeInOut',
		  duration: 1400,
		  color: object.color,
		  trailColor: '#eee',
		  trailWidth: 4,
		  svgStyle: {width: '100%', height: '100%'},
		  text: {
		    style: {
		      // Text color.
		      // Default: same as stroke color (options.color)
		      color: '#999',
		      position: 'absolute',
		      right: '0',
		      top: '-21px',
		      padding: 0,
		      margin: 0,
		      transform: null
		    },
		    autoStyleContainer: false
		  },
		  step: (state, bar) => {
		    bar.setText(Math.round(bar.value() * 100) + ' %');
		  }
		});

		name.animate(object.procents);  // Number from 0.0 to 1.0

	});

});



