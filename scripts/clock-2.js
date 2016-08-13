// clock-2.js - authored by Kevin Lufkin

// clock hand box-shadow dynamic styling added/authored by Robert T. Stewart

// clock-2 javascript is defined as an inclosed self executing function, so that
// users can only have access to the logic wished to be exposed, and keeps the global
// variable scope uncluttered. In this case init() is the only function exposed. This is done by
// returning an object containing the init function.

let clock = (function(){
  // Variables to hold the elements for the numbered clock
  // let elHours, elMinutes, elSeconds;
  // Variables to hold the elements for clock hands.
  let secondsContainer, minutesContainer, hoursContainer;
  let secondHand, minuteHand, hourHand;
  let hourHandDegrees, minuteHandDegrees, secondHandDegrees;

  // initializes the clock - calling all necessary function in order for it to run
  function init(){
    _cacheDom();
    initializeClock();
    // Calls setTime() every second on a continuous loop, allowing the clock time and hand
    // positions to update every second.
    window.setInterval(function(){setTime()}, 1000);
  }

  // caches all the neccesary DOM elements so calls to the DOM only have to be made once
  function _cacheDom() {
    // Grabs elements to set.
    // elHours = document.querySelector('.hours');
    // elMinutes = document.querySelector('.minutes');
    // elSeconds = document.querySelector('.seconds');

    // second hand element container
    secondsContainer = document.querySelector('.secondsContainer');
    // minute hand element container
    minutesContainer = document.querySelector('.minutesContainer');
    // hour hand element container
    hoursContainer = document.querySelector('.hoursContainer');

    // second hand element
    secondHand = document.querySelector('.secondHand');
    // minute hand element
    minuteHand = document.querySelector('.minuteHand');
    // hour hand element
    hourHand = document.querySelector('.hourHand');
  }

  /* set box-shadow of hour hand according to its orientation */
  function setShadow(whichHand, handDegrees) {
    var degreeToRadian = Math.PI/180;
    var sinAngle = Math.sin(degreeToRadian*handDegrees); /* will equal 0 at 12 o'clock */
    var cosAngle = Math.cos(degreeToRadian*handDegrees); /* will equal 1 at 12 o'clock */
    switch(whichHand) {
      case hourHand:
            // hourHand.setAttribute('style',
            //   'box-shadow: -0.18rem 0 0.45rem 0 rgba(170, 159, 142, 0.25) inset, 0 -0.125rem 0.25rem 0 rgba(244, 239, 227, 0.9) inset, '+0.3*sinAngle+'rem '+0.3*cosAngle+'rem 0.3rem 0 rgba(141, 132, 117, 0.8)');
            hourHand.setAttribute('style',
             'box-shadow: '+ -0.25*sinAngle+'rem 0 0.45rem 0 rgba(170, 159, 142, 0.5) inset, '+ 0.25*sinAngle+'rem 0 0.45rem 0 rgba(244, 239, 227, 0.9) inset, 0 '+ -0.1*sinAngle+'rem 0.25rem 0 rgba(244, 239, 227, 0.9) inset, '+0.3*sinAngle+'rem '+0.3*cosAngle+'rem 0.3rem 0 rgba(141, 132, 117, 0.7)');
          break;
      case minuteHand:
            // minuteHand.setAttribute('style',
            //  'box-shadow: -0.18rem 0 0.45rem 0 rgba(170, 159, 142, 0.25) inset, 0 -0.125rem 0.25rem 0 rgba(244, 239, 227, 0.9) inset, '+sinAngle+'rem '+cosAngle+'rem 0.35rem 0 rgba(141, 132, 117, 0.7)');
            minuteHand.setAttribute('style',
             'box-shadow: '+ -0.25*sinAngle+'rem 0 0.45rem 0 rgba(170, 159, 142, 0.5) inset, '+ 0.25*sinAngle+'rem 0 0.45rem 0 rgba(244, 239, 227, 0.9) inset, 0 '+ -0.1*sinAngle+'rem 0.25rem 0 rgba(244, 239, 227, 0.9) inset, '+0.35*sinAngle+'rem '+0.35*cosAngle+'rem 0.35rem 0 rgba(141, 132, 117, 0.7)');
          break;
      case secondHand:
            // secondHand.setAttribute('style',
            //   'box-shadow: -0.09rem 0 0.1rem 0 rgba(230, 64, 79, 0.85) inset, 0 -0.0625rem 0.125rem 0 rgba(244, 239, 227, 0.9) inset,'+sinAngle+'rem '+cosAngle+'rem 0.25rem 0 rgba(141, 132, 117, 0.9)');
            // secondHand.setAttribute('style',
            //   'box-shadow: -0.1rem 0 0.1rem 0 rgba(230, 64, 79, 0.85) inset, 0 -0.0625rem 0.125rem 0 rgba(244, 239, 227, 0.9) inset,'+0.25*sinAngle+'rem '+0.25*cosAngle+'rem 0.25rem 0 rgba(141, 132, 117, 0.9)');
            secondHand.setAttribute('style',
              'box-shadow: '+ -0.1*sinAngle+'rem 0 0.1rem 0 rgba(230, 64, 79, 0.85) inset, 0 '+ -0.0625*sinAngle+'rem 0.125rem 0 rgba(244, 239, 227, 0.9) inset,'+0.25*sinAngle+'rem '+0.25*cosAngle+'rem 0.25rem 0 rgba(141, 132, 117, 0.9)');
          break;
    }
    return;
  }

  // Sets the initial time and positions of the clock hands.
  function initializeClock() {
    //Grab current time
    let now = new Date();

    // initial time setting
    // elHours.innerHTML = now.getHours();
    // elMinutes.innerHTML = now.getMinutes();
    // elSeconds.innerHTML = now.getSeconds();

    // initial second hand setting
    secondHandDegrees = 6 * now.getSeconds();
    secondsContainer.setAttribute('style', 'transform: rotate('+secondHandDegrees+'deg)');
    /* set box-shadow of second hand according to its orientation */
    setShadow(secondHand, secondHandDegrees);

    // initial Minute hand setting
    minuteHandDegrees = 6 * now.getMinutes();
    minutesContainer.setAttribute('style', 'transform: rotate('+minuteHandDegrees+'deg)');
    /* set box-shadow of minute hand according to its orientation */
    setShadow(minuteHand, minuteHandDegrees);

    // initial hour hand setting
    hourHandDegrees = 30 * (now.getHours() + now.getMinutes()/60);
    hoursContainer.setAttribute('style', 'transform: rotate('+hourHandDegrees+'deg)');
    /* set box-shadow of hour hand according to its orientation */
    setShadow(hourHand, hourHandDegrees);
  }

  // Updates the time and position of the clock hands
  function setTime(){
    //Get time at this very moment
    let now = new Date();
    // If minutes is at zero, set current hour
    if(now.getMinutes() === 0) {
      // elHours.innerHTML = now.getHours();
    }
    // If seconds is at zero, set current minute and hour hand position
    if(now.getSeconds() === 0){
      // elMinutes.innerHTML = now.getMinutes();
      // set minute hand position
      minuteHandDegrees = 6 * now.getMinutes();
      // minutesContainer.setAttribute('style', 'transform: rotate('+6 * now.getMinutes()+'deg)');
      minutesContainer.setAttribute('style', 'transform: rotate('+minuteHandDegrees+'deg)');
      /* set box-shadow of minute hand according to its orientation */
      setShadow(minuteHand, minuteHandDegrees);

      // set hour hand position
      hourHandDegrees = 30 * (now.getHours() + now.getMinutes()/60);
      // hoursContainer.setAttribute('style', 'transform: rotate('+30 * (now.getHours() + now.getMinutes()/60)+'deg)');
      hoursContainer.setAttribute('style', 'transform: rotate('+hourHandDegrees+'deg)');
      /* set box-shadow of hour hand according to its orientation */
      setShadow(hourHand, hourHandDegrees);
    }
    // Set seconds
    // elSeconds.innerHTML = now.getSeconds();
    // set second hand position
    secondHandDegrees = 6 * now.getSeconds();
    // secondsContainer.setAttribute('style', 'transform: rotate('+6 * now.getSeconds()+'deg)');
    secondsContainer.setAttribute('style', 'transform: rotate('+secondHandDegrees+'deg)');
    /* set box-shadow of second hand according to its orientation */
    setShadow(secondHand, secondHandDegrees);
  }

  // returns an object containing a property with the initialization function.
  return {
    init: init
  }
})();
// call the init() function to start running the clock
clock.init();