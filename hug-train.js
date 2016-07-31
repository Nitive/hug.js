var $ = function (selector) {
  return document.querySelector(selector)
}

var debounce = function (delay, cb) {
  var prev = 0
  return function () {
    var now = Date.now()
    if (now > prev + delay) {
      prev = now
      cb.apply(null, arguments)
    }
  }
}

var setCSS = function (styles, element) {
  Object.keys(styles).forEach(function (rule) {
    element.style[rule] = styles[rule] // eslint-disable-line no-param-reassign
  })
}

var animate = function (time, timingFunction) {
  var start = Date.now()

  var animateHelper = function () {
    var now = Date.now()
    if (now > start + time) return
    var passed = now - start
    timingFunction(passed / time)
    requestAnimationFrame(animateHelper)
  }

  animateHelper()
}

