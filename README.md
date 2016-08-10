# JavaScript-Animated Analog-styled Clock

This was a collaborative project to build an animated analog clock styled from the following image:

<img src="UI-Clock-Icon-Blue.png" width="400px">

[Robert T. Stewart](https://github.com/rtstewart) is charged with authoring the HTML and CSS for the clock. [Kevin Lufkin](https://github.com/klufkin) is charged with authoring the JavaScript to provide clock movement corresponding to the actual local time.

[view GitHub hosted solution](https://rtstewart.github.io/animated-analog-clock/clock-analog-QA.html)

## Notable HTML/CSS Challenges

HTML/CSS Collaborator: Bobby Stewart

### Suitably positioning the clock hands for rotation

The clock hands were created with `<div>` elements. By default, an element's origin, which is what it would rotate about, is at the center both vertically and horizontally of the element. In order to rotate the clock hands with a "normal" appearance, it was necessary to translate the hand element as well as its origin.

A `<div>` element was used for the clock itself to contain all of the clock elements including the hands. With the clock position property set to relative, things could be positioned as desired relative to the clock `<div>`.

Next, in creating a hand with its position property set to absolute, it can then be positioned within the clock `<div>` without any layout interference to, or by, any other element. When given a height value noticeably greater than width, this would create the beginning of a hand in the 12 o'clock position. An absolutely-positioned hand is placed at the clock center by using the combination of `top: 50%; left: 50%; transform: translate(-50%, -x%)`. Recall that with `top` and `left`, provided percent values refer percent of the parent element height and width respectively. So `top: 50%; left: 50%;` places the left edge of the hand at the clock vertical centerline, and the top edge at the clock horizontal centerline. Next, to translate the hand to a position which emulates 12 o'clock, and with the intended center of rotation  at the clock center, we use `transform: translate(-50%, -x%)`. We'll get to the *x* value in a minute. For the `translate` percentage values, they refer to percentage of the element values, *not* the parent. So this relocates the hand by 50% of its width back to the left (negative x value), and *x*% of its height upward (negative y value). If we were to use *100* for *x*, the bottom edge of the hand would lie on top of the horizontal centerline of the clock `<div>`. But since we want to have the hand *not* rotate by the bottom edge, we use some number less than *100* for *x* - whatever suits the design. This will now place the clock hand in the 12 o'clock position with its width-wise center at the vertical centerline of the clock, and the intended rotational "y-coordinate" at *x*% of the hand's height below the top edge of the hand, and this intended center will now coincide with the center of the clock `<div>`. If we wanted to rotate the hand element directly, about our intended newly created rotational point, we will also need to apply `transform-origin: 50% x%;`. This would relocate the origin of the element from the default origin of  50% (of its width), 50% (of its height), i.e., its center both vertically and horzontally, to match our intended point of rotation created as discussed above. As it turns out, the rotation of the hand will be more easily accomplished by placing it in a `<div>` container whose rotational center coincides with the clock, and then rotating that `<div>` as necessary. This is easier because if attempting to rotate the hand directly, the translation will have to be applied each time the hand element is rotated. So to create this hand-containing `<div>`, which has a rotational center that coincides with the clock and does not require translation, we make the containing `<div>` absolutely positioned with `top: 0; bottom: 0; left: 0; right: 0`. This creates a `<div>` the exact size of the clock `<div>` with a coinciding center, which will also size-adjust with the clock if necessary. This is the method used to create, locate, and provide for rotation-ready hands to act on with either CSS animation, or JavaScript.


### Dynamic Shadow-casting and highlighting of clock arms

In order to provide a bit more dimension to the clock, I chose to apply what I'll call dynamic shadow-casting and highlighting to the clock hands. If you have the patience to watch the clock hands, you will notice that the shadows cast, and the highlights of the hands, are appropriate for each hand's position assuming the light source comes roughly from directly above - that is as I interpret the provided image that I was to emulate with HTML/CSS:



This was accomplished through the JavaScript that also provided the clock movement. The `box-shadow` CSS property was applied to the hands with the use of simple `Math.sin()`, and `Math.cos()` within the JavaScript, clock.js, that my partner Kevin Lufkin wrote to provide the correct time and clock movement.

## Notable JavaScript Challenges

JavaScript Collaborator: Kevin Lufkin

### Topic 1

Yada yada

### Topic 1

Yada yada