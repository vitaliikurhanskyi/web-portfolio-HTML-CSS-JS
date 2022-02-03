document.addEventListener("DOMContentLoaded", function(event) {

	//scroll

	var isScrolling = false;

	window.addEventListener("scroll", throttleScroll, false);

	function throttleScroll(e) {
	    if (isScrolling == false ) {
	        window.requestAnimationFrame(function() {
	          dealWithScrolling(e);
	          isScrolling = false;
	        });
	    }
	    isScrolling = true;
	}

	function dealWithScrolling(e) {
	    console.log(window.innerHeight);
	}


	//circles

	var circlesItems = document.querySelectorAll('.progress-circle__item');

	var circlesData = [];

	function makeCircles(id, colorStart, colorEnd, procents) {
    return {
			name : id,
			colorStart : colorStart,
			colorEnd : colorEnd,
			procents : procents
	    }
  	};

  	var circlesText = document.querySelectorAll('.progress-circle__text');

  	for (let i = 0; i < circlesItems.length; i++) {
		circlesItems[i].id = 'id-' + i + '';
		var circleId = circlesItems[i].id;
		var colorStart = circlesItems[i].dataset.colorStart;
		var colorEnd = circlesItems[i].dataset.colorEnd;
		var procents = circlesText[i].dataset.procentsText / 100;
		circlesData[i] = makeCircles(circleId, colorStart, colorEnd, procents);
  	}

  	for (let i = 0; i < circlesText.length; i++) {

  		textCounter(circlesText[i], circlesText[i].dataset.procentsText);

	}

	function textCounter(obj, stop) {
		var counter = 0;
		setInterval(() => {
			if(counter == stop){
				clearInterval();
			} else {
				counter += 1;
				obj.innerHTML = counter + '%';
			}

	  	}, 5);
	}

	circlesData.forEach(
	  function circle(object) {
	    var name = object.name;
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

	//lines

	var linesItems = document.querySelectorAll('.line-skills__line');

	var linesData = [];

	function makeLines(id, color, procents) {
    return {
			name : id,
			color : color,
			procents : procents,
	    }
  	};

  	for (let i = 0; i < linesItems.length; i++) {
		linesItems[i].id = 'line-' + i + '';
		var lineId = linesItems[i].id;
		var color = linesItems[i].dataset.color;
		var procents = linesItems[i].dataset.procents;
		linesData[i] = makeLines(lineId, color, procents);
  	}

	linesData.forEach(
	  function lines(object) {
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

	// languages

	var languagesItems = document.querySelectorAll('.line-languages__line');

	var languagesData = [];

	function makeLanguages(id, color, procents) {
    return {
			name : id,
			color : color,
			procents : procents,
	    }
  	};

  	for (let i = 0; i < languagesItems.length; i++) {
		languagesItems[i].id = 'language-' + i + '';
		var lineId = languagesItems[i].id;
		var color = languagesItems[i].dataset.color;
		var procents = languagesItems[i].dataset.procents;
		languagesData[i] = makeLanguages(lineId, color, procents);
  	}

	languagesData.forEach(
	  function languages(object) {
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



