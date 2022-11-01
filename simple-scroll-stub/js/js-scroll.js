console.log("NilBunny")
const scrollElements = document.querySelectorAll(".jsscroll");
//"(el) =>"" means "function(el)"
scrollElements.forEach((el) => {
  if (elementInView(el, .21)) {
    displayScrollElement(el)
  }
}
)
//the throttle part of the code can decrease the amount of listeners, which speeds up the processing speed and loading speed of the animations
window.addEventListener("scroll", throttle (handleScrollAnimation, 100)
)
//display functions
// "el" is short for element
//checks whether element is in viewable area
function elementInView(el, amountInView = 1) {
  const elementTop = el.getBoundingClientRect().top;
  const elementHeight = el.getBoundingClientRect().height;
  return (
    elementTop + elementHeight * amountInView <= document.documentElement.clientHeight && elementTop + elementHeight * amountInView> 0
  )
}
//checks whether element is above the below viewable area
function elementOutOfView(el) {
  const elementTop = el.getBoundingClientRect().top;
  const elementBottom = el.getBoundingClientRect().bottom;
  return (
    elementTop >= document.documentElement.clientHeight || elementBottom < 0
  )
}
//show element
function displayScrollElement(el) {
  el.classList.add("scrolled");
}
//hide element
function hideScrollElement(el) {
  el.classList.remove("scrolled")
}
function handleScrollAnimation() {
  console.log("scrollhandler")
  scrollElements.forEach((el) => {
    if (elementInView(el, .21)) {
      displayScrollElement(el)
    } else if (elementOutOfView(el)) {
      hideScrollElement(el)
    }
  }
  )
}
//UTILITY
// throttle - fn = function to call, wait = interval in ms
function throttle(fn, wait) {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};