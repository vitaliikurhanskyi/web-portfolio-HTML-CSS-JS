document.addEventListener("DOMContentLoaded", function(event) {

	//scroll

	var isScrolling = false;
	var didItShowLines = false;
	var didItShowLanguages = false;
	var didItShowCircles = false;

	function elmentTarget(selector) {
		var element = document.querySelector(selector);
		return element;
	}

	function showAnimation(element, duration) {

		var top = element.getBoundingClientRect().top;

		var windowBottom = window.pageYOffset + document.documentElement.clientHeight;

		var plusDistanse = windowBottom - duration;

		if(plusDistanse > top ) {
			return true;
		} else {
			return false;
		}
	}

	if(showAnimation(elmentTarget('#progress-circle'), 100) ) {
    	showCircle();
    }

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
	    if(showAnimation(elmentTarget('#line-skills'), 400) && !didItShowLines) {
	    	showLines();
	    }
	    if(showAnimation(elmentTarget('#line-languages'), 600) && !didItShowLanguages) {
	    	showLanguages();
	    }
	    if(showAnimation(elmentTarget('#progress-circle'), 300) && !didItShowCircles) {
	    	showCircle();
	    }

	}

	// Получаем нужный элемент
	var element = document.querySelector('#line-skills');

	var Visible = function (target) {
	  // Все позиции элемента

	  var targetTopOffset = window.pageYOffset + target.getBoundingClientRect().top;

	  var targetPosition = {
	      top: window.pageYOffset + target.getBoundingClientRect().top,
	      left: window.pageXOffset + target.getBoundingClientRect().left,
	      right: window.pageXOffset + target.getBoundingClientRect().right,
	      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
	    },
	    // Получаем позиции окна
	    windowPosition = {
	      top: window.pageYOffset,
	      left: window.pageXOffset,
	      right: window.pageXOffset + document.documentElement.clientWidth,
	      bottom: window.pageYOffset + document.documentElement.clientHeight
	    };

	    //console.log(targetTopOffset);

	  if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
	    targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
	    targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
	    targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
	    // Если элемент полностью видно, то запускаем следующий код
	    //console.clear();
	    //console.log('Вы видите элемент :)');
	  } else {
	    // Если элемент не видно, то запускаем этот код
	    //console.clear();
	  };
	};

	// Запускаем функцию при прокрутке страницы
	window.addEventListener('scroll', function() {
	  Visible (element);
	});

	// А также запустим функцию сразу. А то вдруг, элемент изначально видно
	Visible (element);

	//circles

	function showCircle() {

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

		didItShowCircles = true;

	}

	//lines

	function showLines() {

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
		didItShowLines = true;
	}

	// languages

	function showLanguages() {

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

		didItShowLanguages = true;

	}


});





