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

