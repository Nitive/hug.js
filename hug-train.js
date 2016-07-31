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

var createHug = function () {
  var hug = document.createElement('img')
  hug.src = 'hug.gif'
  return hug
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

var disappearElement = function (time, element) {
  animate(time, function (passed) {
    setCSS({ opacity: 1 - passed }, element)
  })
  setTimeout(function () {
    element.remove()
  }, time)
}


var HUG_SIDE = 44


var main = function () {
  var hugs = document.createElement('div')

  var addHug = function (coords) {
    var hug = createHug()
    setCSS({
      position: 'fixed',
      top: coords.y + 'px',
      left: coords.x + 'px'
    }, hug)
    hugs.appendChild(hug)
    disappearElement(1500, hug)
  }

  var move = debounce(1, function (event) {
    addHug({
      x: event.clientX - (HUG_SIDE / 2),
      y: event.clientY - (HUG_SIDE / 2)
    })
  })

  $('body').appendChild(hugs)
  $('html').addEventListener('mousemove', move)
}


main()
