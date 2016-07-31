;(function () { // eslint-disable-line no-extra-semi
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

  var random = function (start, end) {
    return (Math.random() * (end - start)) + start
  }

  var randomAngle = function () {
    return 360 * Math.random()
  }

  var HUG_SIDE = 44


  /**
   * hugGenerator
   * @param hugsConatiner: HtmlElement element to add hugs
   * @return function to stop creating hugs
   */
  var hugGenerator = function (hugsContainer) {
    var addHug = function (coords) {
      var hug = createHug()
      setCSS({
        position: 'fixed',
        top: coords.y + 'px',
        left: coords.x + 'px'
      }, hug)

      hugsContainer.appendChild(hug)

      // random data for hug
      var disapperTime = 3000 * Math.random()
      var angle = randomAngle()
      var startRotate = randomAngle()
      var turnsCount = 2 * Math.random()
      var endRotate = randomAngle() + (360 * turnsCount)
      var startSize = random(0.5, 0.7)
      var endSize = random(0.9, 1.5)

      animate(disapperTime, function (passedProcent) {
        var passed = passedProcent * 100
        var x = passed * Math.cos(angle)
        var y = passed * Math.sin(angle)
        var rotate = startRotate + ((endRotate - startRotate) * passedProcent)
        var scale = startSize + ((endSize - startSize) * passedProcent)

        setCSS({
          transform: [
            'translate3d(' + x + 'px, ' + y + 'px, 0)',
            'rotate(' + rotate + 'deg)',
            'scale(' + scale + ')'
          ].join('')
        }, hug)
      })
      disappearElement(disapperTime, hug)
    }

    var move = debounce(10, function (event) {
      addHug({
        x: event.clientX - (HUG_SIDE / 2),
        y: event.clientY - (HUG_SIDE / 2)
      })
    })

    var $html = $('html')
    $html.addEventListener('mousemove', move)

    return function stop() {
      $html.removeEventListener('mousemove', move)
    }
  }

  window.hug = {
    generator: hugGenerator
  }
}()); // eslint-disable-line semi

// Example usage:
// var hugs = document.createElement('div')
// document.body.appendChild(hugs)
// hug.generator(hugs)
