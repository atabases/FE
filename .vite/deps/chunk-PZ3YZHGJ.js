import {
  __esm,
  __export
} from "./chunk-V4OQ3NZ2.js";

// node_modules/d3-ease/src/linear.js
function linear(t) {
  return +t;
}
var init_linear = __esm({
  "node_modules/d3-ease/src/linear.js"() {
  }
});

// node_modules/d3-ease/src/quad.js
function quadIn(t) {
  return t * t;
}
function quadOut(t) {
  return t * (2 - t);
}
function quadInOut(t) {
  return ((t *= 2) <= 1 ? t * t : --t * (2 - t) + 1) / 2;
}
var init_quad = __esm({
  "node_modules/d3-ease/src/quad.js"() {
  }
});

// node_modules/d3-ease/src/cubic.js
function cubicIn(t) {
  return t * t * t;
}
function cubicOut(t) {
  return --t * t * t + 1;
}
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var init_cubic = __esm({
  "node_modules/d3-ease/src/cubic.js"() {
  }
});

// node_modules/d3-ease/src/poly.js
var exponent, polyIn, polyOut, polyInOut;
var init_poly = __esm({
  "node_modules/d3-ease/src/poly.js"() {
    exponent = 3;
    polyIn = function custom(e) {
      e = +e;
      function polyIn2(t) {
        return Math.pow(t, e);
      }
      polyIn2.exponent = custom;
      return polyIn2;
    }(exponent);
    polyOut = function custom2(e) {
      e = +e;
      function polyOut2(t) {
        return 1 - Math.pow(1 - t, e);
      }
      polyOut2.exponent = custom2;
      return polyOut2;
    }(exponent);
    polyInOut = function custom3(e) {
      e = +e;
      function polyInOut2(t) {
        return ((t *= 2) <= 1 ? Math.pow(t, e) : 2 - Math.pow(2 - t, e)) / 2;
      }
      polyInOut2.exponent = custom3;
      return polyInOut2;
    }(exponent);
  }
});

// node_modules/d3-ease/src/sin.js
function sinIn(t) {
  return +t === 1 ? 1 : 1 - Math.cos(t * halfPi);
}
function sinOut(t) {
  return Math.sin(t * halfPi);
}
function sinInOut(t) {
  return (1 - Math.cos(pi * t)) / 2;
}
var pi, halfPi;
var init_sin = __esm({
  "node_modules/d3-ease/src/sin.js"() {
    pi = Math.PI;
    halfPi = pi / 2;
  }
});

// node_modules/d3-ease/src/math.js
function tpmt(x) {
  return (Math.pow(2, -10 * x) - 9765625e-10) * 1.0009775171065494;
}
var init_math = __esm({
  "node_modules/d3-ease/src/math.js"() {
  }
});

// node_modules/d3-ease/src/exp.js
function expIn(t) {
  return tpmt(1 - +t);
}
function expOut(t) {
  return 1 - tpmt(t);
}
function expInOut(t) {
  return ((t *= 2) <= 1 ? tpmt(1 - t) : 2 - tpmt(t - 1)) / 2;
}
var init_exp = __esm({
  "node_modules/d3-ease/src/exp.js"() {
    init_math();
  }
});

// node_modules/d3-ease/src/circle.js
function circleIn(t) {
  return 1 - Math.sqrt(1 - t * t);
}
function circleOut(t) {
  return Math.sqrt(1 - --t * t);
}
function circleInOut(t) {
  return ((t *= 2) <= 1 ? 1 - Math.sqrt(1 - t * t) : Math.sqrt(1 - (t -= 2) * t) + 1) / 2;
}
var init_circle = __esm({
  "node_modules/d3-ease/src/circle.js"() {
  }
});

// node_modules/d3-ease/src/bounce.js
function bounceIn(t) {
  return 1 - bounceOut(1 - t);
}
function bounceOut(t) {
  return (t = +t) < b1 ? b0 * t * t : t < b3 ? b0 * (t -= b2) * t + b4 : t < b6 ? b0 * (t -= b5) * t + b7 : b0 * (t -= b8) * t + b9;
}
function bounceInOut(t) {
  return ((t *= 2) <= 1 ? 1 - bounceOut(1 - t) : bounceOut(t - 1) + 1) / 2;
}
var b1, b2, b3, b4, b5, b6, b7, b8, b9, b0;
var init_bounce = __esm({
  "node_modules/d3-ease/src/bounce.js"() {
    b1 = 4 / 11;
    b2 = 6 / 11;
    b3 = 8 / 11;
    b4 = 3 / 4;
    b5 = 9 / 11;
    b6 = 10 / 11;
    b7 = 15 / 16;
    b8 = 21 / 22;
    b9 = 63 / 64;
    b0 = 1 / b1 / b1;
  }
});

// node_modules/d3-ease/src/back.js
var overshoot, backIn, backOut, backInOut;
var init_back = __esm({
  "node_modules/d3-ease/src/back.js"() {
    overshoot = 1.70158;
    backIn = function custom4(s) {
      s = +s;
      function backIn2(t) {
        return (t = +t) * t * (s * (t - 1) + t);
      }
      backIn2.overshoot = custom4;
      return backIn2;
    }(overshoot);
    backOut = function custom5(s) {
      s = +s;
      function backOut2(t) {
        return --t * t * ((t + 1) * s + t) + 1;
      }
      backOut2.overshoot = custom5;
      return backOut2;
    }(overshoot);
    backInOut = function custom6(s) {
      s = +s;
      function backInOut2(t) {
        return ((t *= 2) < 1 ? t * t * ((s + 1) * t - s) : (t -= 2) * t * ((s + 1) * t + s) + 2) / 2;
      }
      backInOut2.overshoot = custom6;
      return backInOut2;
    }(overshoot);
  }
});

// node_modules/d3-ease/src/elastic.js
var tau, amplitude, period, elasticIn, elasticOut, elasticInOut;
var init_elastic = __esm({
  "node_modules/d3-ease/src/elastic.js"() {
    init_math();
    tau = 2 * Math.PI;
    amplitude = 1;
    period = 0.3;
    elasticIn = function custom7(a, p) {
      var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
      function elasticIn2(t) {
        return a * tpmt(- --t) * Math.sin((s - t) / p);
      }
      elasticIn2.amplitude = function(a2) {
        return custom7(a2, p * tau);
      };
      elasticIn2.period = function(p2) {
        return custom7(a, p2);
      };
      return elasticIn2;
    }(amplitude, period);
    elasticOut = function custom8(a, p) {
      var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
      function elasticOut2(t) {
        return 1 - a * tpmt(t = +t) * Math.sin((t + s) / p);
      }
      elasticOut2.amplitude = function(a2) {
        return custom8(a2, p * tau);
      };
      elasticOut2.period = function(p2) {
        return custom8(a, p2);
      };
      return elasticOut2;
    }(amplitude, period);
    elasticInOut = function custom9(a, p) {
      var s = Math.asin(1 / (a = Math.max(1, a))) * (p /= tau);
      function elasticInOut2(t) {
        return ((t = t * 2 - 1) < 0 ? a * tpmt(-t) * Math.sin((s - t) / p) : 2 - a * tpmt(t) * Math.sin((s + t) / p)) / 2;
      }
      elasticInOut2.amplitude = function(a2) {
        return custom9(a2, p * tau);
      };
      elasticInOut2.period = function(p2) {
        return custom9(a, p2);
      };
      return elasticInOut2;
    }(amplitude, period);
  }
});

// node_modules/d3-ease/src/index.js
var src_exports = {};
__export(src_exports, {
  easeBack: () => backInOut,
  easeBackIn: () => backIn,
  easeBackInOut: () => backInOut,
  easeBackOut: () => backOut,
  easeBounce: () => bounceOut,
  easeBounceIn: () => bounceIn,
  easeBounceInOut: () => bounceInOut,
  easeBounceOut: () => bounceOut,
  easeCircle: () => circleInOut,
  easeCircleIn: () => circleIn,
  easeCircleInOut: () => circleInOut,
  easeCircleOut: () => circleOut,
  easeCubic: () => cubicInOut,
  easeCubicIn: () => cubicIn,
  easeCubicInOut: () => cubicInOut,
  easeCubicOut: () => cubicOut,
  easeElastic: () => elasticOut,
  easeElasticIn: () => elasticIn,
  easeElasticInOut: () => elasticInOut,
  easeElasticOut: () => elasticOut,
  easeExp: () => expInOut,
  easeExpIn: () => expIn,
  easeExpInOut: () => expInOut,
  easeExpOut: () => expOut,
  easeLinear: () => linear,
  easePoly: () => polyInOut,
  easePolyIn: () => polyIn,
  easePolyInOut: () => polyInOut,
  easePolyOut: () => polyOut,
  easeQuad: () => quadInOut,
  easeQuadIn: () => quadIn,
  easeQuadInOut: () => quadInOut,
  easeQuadOut: () => quadOut,
  easeSin: () => sinInOut,
  easeSinIn: () => sinIn,
  easeSinInOut: () => sinInOut,
  easeSinOut: () => sinOut
});
var init_src = __esm({
  "node_modules/d3-ease/src/index.js"() {
    init_linear();
    init_quad();
    init_cubic();
    init_poly();
    init_sin();
    init_exp();
    init_circle();
    init_bounce();
    init_back();
    init_elastic();
  }
});

// node_modules/d3-timer/src/timer.js
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
var frame, timeout, interval, pokeDelay, taskHead, taskTail, clockLast, clockNow, clockSkew, clock, setFrame;
var init_timer = __esm({
  "node_modules/d3-timer/src/timer.js"() {
    frame = 0;
    timeout = 0;
    interval = 0;
    pokeDelay = 1e3;
    clockLast = 0;
    clockNow = 0;
    clockSkew = 0;
    clock = typeof performance === "object" && performance.now ? performance : Date;
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
      setTimeout(f, 17);
    };
    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this;
          else taskHead = this;
          taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };
  }
});

// node_modules/d3-timer/src/timeout.js
function timeout_default(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
var init_timeout = __esm({
  "node_modules/d3-timer/src/timeout.js"() {
    init_timer();
  }
});

// node_modules/d3-timer/src/interval.js
var init_interval = __esm({
  "node_modules/d3-timer/src/interval.js"() {
    init_timer();
  }
});

// node_modules/d3-timer/src/index.js
var init_src2 = __esm({
  "node_modules/d3-timer/src/index.js"() {
    init_timer();
    init_timeout();
    init_interval();
  }
});

export {
  cubicInOut,
  src_exports,
  init_src,
  now,
  timer,
  timeout_default,
  init_src2
};
//# sourceMappingURL=chunk-PZ3YZHGJ.js.map
