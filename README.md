# JavaScript-Animated Analog-styled Clock

This was a collaborative project to build an animated analog clock styled from the following image:

<img src="UI-Clock-Icon-Blue.png" width="400px">

[Bobby Stewart](https://github.com/rtstewart) was charged with authoring the HTML and CSS to emulate the analog clock image above. [Kevin Lufkin](https://github.com/klufkin) was charged with authoring the JavaScript to provide clock movement corresponding to the actual local time.

[view GitHub hosted solution](https://rtstewart.github.io/animated-analog-clock/clock-analog-QA.html)

## Notable HTML/CSS Topics

HTML/CSS Collaborator: Bobby Stewart

### Creating and suitably positioning the clock hands for rotation

The clock hands were created with `<div>` elements. By default, an element's origin, which is what it would rotate about, is at the center, both vertically and horizontally, of the element. In order to rotate the clock hands with a "normal" appearance, it was necessary to translate the hand element and possibly its origin, depending on whether it was to be directly or indirectly rotated - this will be explained below.

A `<div>` element was used for the clock itself to contain all of the clock elements including the hands. With the clock position property set to relative, things could be positioned as desired relative to the clock `<div>`.

Next, in creating a hand with its position property set to absolute, it can then be positioned within the clock `<div>` without any layout interference to, or by, any other element. When given a height value noticeably greater than width, this would create the beginning of a hand in the 12 o'clock position - [view here](https://rtstewart.github.io/animated-analog-clock/clock-hand-steps_01.html). An absolutely-positioned hand is placed at the clock center by using the combination of `top: 50%; left: 50%; transform: translate(-50%, -y%)`. Recall that with `top` and `left`, the provided percent values refer to percent of the parent element height and width respectively. So `top: 50%; left: 50%;` places the left edge of the hand at the clock vertical centerline, and the top edge at the clock horizontal centerline - [view here](https://rtstewart.github.io/animated-analog-clock/clock-hand-steps_02.html).

Now, to translate the hand to a position which emulates 12 o'clock, and with the intended center of rotation at the clock center, we use `transform: translate(-50%, -y%)`. We'll get to the *y* value in a minute. For the `translate` percentage values, they refer to percentage of the element width and height values, *not* the parent. So this relocates the hand by 50% of its width back to the left (negative x value), and *y*% of its height upward (negative y value). If we were to use *100* for *y*, the bottom edge of the hand would lie at the horizontal centerline of the clock `<div>` - [view here with y = 100%](https://rtstewart.github.io/animated-analog-clock/clock-hand-steps_03.html). But since we want to have the hand *not* rotate by the bottom edge, we use some number less than *100* for *y* - whatever suits the design. This will now place the clock hand in the 12 o'clock position with its width-wise center at the vertical centerline of the clock, and the intended rotational "y-coordinate" at *y*% of the hand's height below the top edge of the hand, and this intended center will now coincide with the center of the clock `<div>` - [view here with y = 87.5%](https://rtstewart.github.io/animated-analog-clock/clock-hand-steps_04.html).

If we wanted to rotate the hand element directly, about our intended newly-created rotational point, we will also need to apply `transform-origin: 50% y%;`. This would relocate the origin of the element from the default origin of 50% (of its width), 50% (of its height), i.e., its center both vertically and horizontally, to match our intended point of rotation created as discussed above - [view direct hand rotation here, which requires hand translation each time it is rotated](https://rtstewart.github.io/animated-analog-clock/clock-hand-steps_05.html). As it turns out, the rotation of the hand will be more easily accomplished by placing it in a `<div>` container whose rotational center coincides with the clock, and then rotating that `<div>` as necessary. This is easier because if attempting to rotate the hand directly, the hand element translation will have to be applied each time the hand element is rotated - [view here what happens if element translation is not performed with rotation](https://rtstewart.github.io/animated-analog-clock/clock-hand-steps_06.html).

So to create this hand-containing `<div>`, which has a rotational center that coincides with the clock and does not require translation, we make the containing `<div>` absolutely positioned with `width: 100%; height: 100%;`. This creates a `<div>` the exact size of the clock `<div>` and contained by the clock `<div>`, forcing a coinciding center, which will also size-adjust with the clock if necessary. This is the method used to create, locate, and provide for rotation-ready hands to act on with either CSS animation, or JavaScript - [view rotating the hand-containing `<div>` here](https://rtstewart.github.io/animated-analog-clock/clock-hand-steps_07.html).

### Alternative solution to provide easy-to-rotate clock hands

As an alternate solution to providing "easy" hand rotation, with a bit more calculation, the hands can be placed and their origin transformed in a way that avoids `transform: translation` and therefore the hand can be rotated directly without simultaneous translation - [view here](https://rtstewart.github.io/animated-analog-clock/clock-hand-steps_08.html).

### Dynamic Shadow-casting and highlighting of clock arms

In an attempt to provide a bit more dimension and realism to the clock, I chose to apply what I'll call dynamic shadow-casting and highlighting to the clock hands. If you have the patience to watch the clock hands, you will notice that the shadows cast, and the highlights of the hands, are appropriate for each hand's position assuming the light source comes roughly from directly above - that is as I interpret the provided image that I was to emulate with HTML/CSS (see above analog clock image).

This was accomplished through the JavaScript that also provided the clock movement. I applied the `box-shadow` CSS property to the hands along with the use of `Math.sin()`, and `Math.cos()` to vary the `box-shadow` x and y component values within the JavaScript, clock.js, that my partner Kevin Lufkin wrote to provide the correct time and clock movement. The image below shows a simple rendering of a clock hand at 12 o'clock and then at some arbitrary angle alpha (&alpha;). Refer to that image for the following. If I assumed I wanted a downward cast shadow of length k at 12 o'clock (since I am assuming the light source to be directly above), then the x and y projections of the shadow as the clock hand rotates would be given by x = k &times; sin(&alpha;), and y = k &times; cos(&alpha;). Recall that for `box-shadow` x and y component values, positive x projects to the right, negative x projects to the left, positive y projects downward, negative y projects upward. Since sin(&alpha;), and cos(&alpha;) oscillate between +1 and -1, this also appropriately provides sign changing for the directions of the shadows if the `box-shadow` property is correctly defined.

The same concept was applied to clock hand highlighting to hightlight the hands appropriately according to their orientation relative to the assumed light source.

<img src="clock-hand-shadow-geometry_500x740.jpg" width="400px">

## The JavaScript

JavaScript Collaborator: Kevin Lufkin

In this section we’ll be looking at the code of clock.js to see how I built a functional clock. Continue reading after the code for some extra details and explanation of what I did.

<pre>
// clock javascript is defined as an inclosed self executing function, so that 
// users can only have access to the logic wished to be exposed, and keeps the global 
// variable scope uncluttered. In this case init() is the only function exposed. This is done by
// returning an object containing the init function.

let clock = (function(){
// Variables to hold the elements for the numbered clock
let elHours, elMinutes, elSeconds;
// Variables to hold the elements for clock hands.
let secondHand, minuteHand, hourHand;

// initializes the clock - calling all necessary function in order for it to run
function init(){
  _cacheDom();
  initializeClock();
  // Calls setTime() every second on a continuous loop, allowing the clock time and hand
  // positions to update every second.
  window.setInterval(function(){setTime()}, 1000);
}

// caches all the necessary DOM elements so calls to the DOM only have to be made once
function _cacheDom() {
  // Grabs elements to set.
  elHours = document.querySelector('.hours');
  elMinutes = document.querySelector('.minutes');
  elSeconds = document.querySelector('.seconds');

  // second hand element
  secondHand = document.querySelector('.secondHand');
  // minute hand element
  minuteHand = document.querySelector('.minuteHand');
  // hour hand element
  hourHand = document.querySelector('.hourHand');
}

// Sets the initial time and positions of the clock hands.
function initializeClock() {
  //Grab current time
  let now = new Date();

  // initial time setting
  elHours.innerHTML = now.getHours();
  elMinutes.innerHTML = now.getMinutes();
  elSeconds.innerHTML = now.getSeconds();

  // initial second hand setting
  secondHand.setAttribute('style', 'transform: rotate('+6 * now.getSeconds()+'deg)');
  // initial second hand setting
  minuteHand.setAttribute('style', 'transform: rotate('+6 * now.getMinutes()+'deg)');
  // initial second hand setting
  hourHand.setAttribute('style', 'transform: rotate('+30 * now.getHours()+'deg)');
}

// Updates the time and position of the clock hands
function setTime(){
  //Get time at this very moment
  let now = new Date();
  // If minutes is at zero, set current hour
  if(now.getMinutes() === 0) {
    elHours.innerHTML = now.getHours();
    // set hour hand position
    hourHand.setAttribute('style', 'transform: rotate('+30 * now.getHours()+'deg)');
  }
  // If seconds is at zero, set current minute
  if(now.getSeconds() === 0){
    elMinutes.innerHTML = now.getMinutes();
    // set minute hand position
    minuteHand.setAttribute('style', 'transform: rotate('+6 * now.getMinutes()+'deg)');
  }
  // Set seconds
  elSeconds.innerHTML = now.getSeconds();
  // set second hand position
  secondHand.setAttribute('style', 'transform: rotate('+6 * now.getSeconds()+'deg)');
}

// returns an object containing a property with the initialization function. 
return {
  init: init
}
})();
// call the init() function to start running the clock 
clock.init();
</pre>

### What's going on with your code? (Coding Pattern)

Okay so let's take a peaksy at what's going on here.

So the first thing you might notice is that I'm using these things called let, it is a part of the Ecmascript 2015 specifications, which are updates approved by a group of astute individuals to improve the Javascript language. I'm not going to get into it too much here, but it works more or less like the keyword var except that variables declared with let are limited to the scope of their block, that being the opening and closing brackets {...} in which it resides. var on the other hand defines a variable globally or to an entire function regardless of the block scope it resides in. No need to worry too much about my usage here as you could literally swap all of the lets with var and the code would work exactly the same. If you want some examples on let check out the Mozilla page.

The next thing you may have noticed is that I have all of my code wrapped inside of an anonymous function inside of parentheses. Simplified, it looks like this: (function(){code...})(). This is what is called an immediately invoked function meaning the function is called as soon as it is defined, no need to define it then call it again on another line.

So why am I doing this? What I am attempting to replicate is called a Revealing Module Pattern. This means to encapsulate my code in a way so that it's easily portable and only reveals(gives access) to what I wish the user to see or use. So, by using an immediately invoked function, I can write my code in a way that the user only has access to what the function returns to let clock, which in this case is an object containing a reference to my init() function defined within the immediately invoked function. The init() function (short for initialization) is a function that contains calls to all my other functions needed to run the clock, so simply by calling one function we can get the clock up and running.

The first method you see executed inside of the init() function is _cacheDom(). The purpose of this function is to grab and store all of the DOM elements needed to make our clock run. By doing this we do not have to make repeated calls to the DOM in order to manipulate the time and clock hands, and can instead reference the values we stored upon calling _cacheDom(). This little trick improves our speed and efficiency because accessing a variable is much quicker than querying the DOM, and as an added bonus makes our code neater.

### The Key Piece

If you are familiar with how traditional clocks work they tend to update in real time, meaning you do not have to hit a refresh button to find out the current time. In order to replicate this I needed a way to be able to repeatedly call a function at a set interval of time. In this case I needed to call my setTime() function, which grabs the current time and sets the clock hands to the right angle/position, every second.

I found my solution in the window.setInterval(function, delay) function. This repeatedly calls the given function after the specified delay time has passed. If we look at the init() function again you'll notice that there is a function initializeClock() that is called before window.setInterval(function(){setTime()},1000). If you recall the delay occurs before every function call. This means upon starting the clock there is an entire second where it is not displaying the time. In order to account for this I wrote the function initializeClock() that will set the time right away so that the clock will not appear to be malfunctioning.

```
function init(){
_cacheDom();
initializeClock();
// Calls setTime() every second on a continuous loop, allowing the clock time and hand
// positions to update every second.
window.setInterval(function(){setTime()}, 1000);
}
```

When using window.setInterval() there is a use case that has to be considered where if the code takes more time to run than the delay then the whole timing mechanism is thrown off sync. The code will not be run at the given time delay, but instead be dictated by the execution speed of the code. We do not encounter this problem here thanks to the simplicity of the code, because of this everything is finished well before the end of the one second delay.

### Rotating the Hands

At first glance this may seem to be the most difficult portion to solve for, but with the use of a handy CSS3 property and some simple math it's actually pretty straight forward!

The CSS property we need for the job is know as a CSS Transform using the rotate syntax. I won't be covering transforms here, but what this does is rotate an element on it's origin(center point) by the given number of degrees. You can use various different unit types to indicate how much you wish an element to turn, but in this case I use degrees specified as deg, which works out nicely mathematically speaking.

To calculate the appropriate angle of the hands we need to know:

a) The number of degrees in a circle - 360
b) How many units of a time measurement fit into a circle
seconds - 60
minutes - 60
hours - 12
With this we can calculate the exact angle of each hand at every second, minute, and hour by solving for the number of degrees of the circle that represents a single time measurement.

In our case we get:

seconds - 360/60 = 6deg/sec
minutes - 360/60 = 6deg/minute
hours - 360/12 = 30deg/hour
Now by multiplying each of these values by the current time we will get the angle at which each hand needs to point.

In code what this looks like is setting the style property,transform: rotate(), using setAttribute, to the appropriate angle of rotation, which is the calculation we made above!

```
secondHand.setAttribute('style', 'transform: rotate('+6 * now.getSeconds()+'deg)');
minuteHand.setAttribute('style', 'transform: rotate('+6 * now.getMinutes()+'deg)');
hourHand.setAttribute('style', 'transform: rotate('+30 * now.getHours()+'deg)');
```

That coupled with setInterval() gives us our realtime clock! Pretty cool huh? :smile:  

### Addendum

A second version of the clock JavaScript was written by Kevin Lufkin, after the above code and description, which added hour hand movement updates every minute. Bobby Stewart did some additional refactoring of his portion of that JavaScript which provides the dynamic shadow casting by, and highlighting of, the clock arms. The resulting "version 2" of the JavaScript has now been incorporated into the [GitHub-hosted solution](https://rtstewart.github.io/animated-analog-clock/clock-analog-QA.html).