(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = n(s);
    fetch(s.href, i);
  }
})();
var Yd = { exports: {} },
  xo = {},
  Xd = { exports: {} },
  V = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ws = Symbol.for("react.element"),
  Kp = Symbol.for("react.portal"),
  qp = Symbol.for("react.fragment"),
  Gp = Symbol.for("react.strict_mode"),
  Jp = Symbol.for("react.profiler"),
  Qp = Symbol.for("react.provider"),
  Yp = Symbol.for("react.context"),
  Xp = Symbol.for("react.forward_ref"),
  Zp = Symbol.for("react.suspense"),
  eg = Symbol.for("react.memo"),
  tg = Symbol.for("react.lazy"),
  Ku = Symbol.iterator;
function ng(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = (Ku && t[Ku]) || t["@@iterator"]),
      typeof t == "function" ? t : null);
}
var Zd = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  eh = Object.assign,
  th = {};
function Mr(t, e, n) {
  ((this.props = t),
    (this.context = e),
    (this.refs = th),
    (this.updater = n || Zd));
}
Mr.prototype.isReactComponent = {};
Mr.prototype.setState = function (t, e) {
  if (typeof t != "object" && typeof t != "function" && t != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables.",
    );
  this.updater.enqueueSetState(this, t, e, "setState");
};
Mr.prototype.forceUpdate = function (t) {
  this.updater.enqueueForceUpdate(this, t, "forceUpdate");
};
function nh() {}
nh.prototype = Mr.prototype;
function ql(t, e, n) {
  ((this.props = t),
    (this.context = e),
    (this.refs = th),
    (this.updater = n || Zd));
}
var Gl = (ql.prototype = new nh());
Gl.constructor = ql;
eh(Gl, Mr.prototype);
Gl.isPureReactComponent = !0;
var qu = Array.isArray,
  rh = Object.prototype.hasOwnProperty,
  Jl = { current: null },
  sh = { key: !0, ref: !0, __self: !0, __source: !0 };
function ih(t, e, n) {
  var r,
    s = {},
    i = null,
    o = null;
  if (e != null)
    for (r in (e.ref !== void 0 && (o = e.ref),
    e.key !== void 0 && (i = "" + e.key),
    e))
      rh.call(e, r) && !sh.hasOwnProperty(r) && (s[r] = e[r]);
  var a = arguments.length - 2;
  if (a === 1) s.children = n;
  else if (1 < a) {
    for (var l = Array(a), u = 0; u < a; u++) l[u] = arguments[u + 2];
    s.children = l;
  }
  if (t && t.defaultProps)
    for (r in ((a = t.defaultProps), a)) s[r] === void 0 && (s[r] = a[r]);
  return {
    $$typeof: Ws,
    type: t,
    key: i,
    ref: o,
    props: s,
    _owner: Jl.current,
  };
}
function rg(t, e) {
  return {
    $$typeof: Ws,
    type: t.type,
    key: e,
    ref: t.ref,
    props: t.props,
    _owner: t._owner,
  };
}
function Ql(t) {
  return typeof t == "object" && t !== null && t.$$typeof === Ws;
}
function sg(t) {
  var e = { "=": "=0", ":": "=2" };
  return (
    "$" +
    t.replace(/[=:]/g, function (n) {
      return e[n];
    })
  );
}
var Gu = /\/+/g;
function Qo(t, e) {
  return typeof t == "object" && t !== null && t.key != null
    ? sg("" + t.key)
    : e.toString(36);
}
function Ni(t, e, n, r, s) {
  var i = typeof t;
  (i === "undefined" || i === "boolean") && (t = null);
  var o = !1;
  if (t === null) o = !0;
  else
    switch (i) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (t.$$typeof) {
          case Ws:
          case Kp:
            o = !0;
        }
    }
  if (o)
    return (
      (o = t),
      (s = s(o)),
      (t = r === "" ? "." + Qo(o, 0) : r),
      qu(s)
        ? ((n = ""),
          t != null && (n = t.replace(Gu, "$&/") + "/"),
          Ni(s, e, n, "", function (u) {
            return u;
          }))
        : s != null &&
          (Ql(s) &&
            (s = rg(
              s,
              n +
                (!s.key || (o && o.key === s.key)
                  ? ""
                  : ("" + s.key).replace(Gu, "$&/") + "/") +
                t,
            )),
          e.push(s)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), qu(t)))
    for (var a = 0; a < t.length; a++) {
      i = t[a];
      var l = r + Qo(i, a);
      o += Ni(i, e, n, l, s);
    }
  else if (((l = ng(t)), typeof l == "function"))
    for (t = l.call(t), a = 0; !(i = t.next()).done;)
      ((i = i.value), (l = r + Qo(i, a++)), (o += Ni(i, e, n, l, s)));
  else if (i === "object")
    throw (
      (e = String(t)),
      Error(
        "Objects are not valid as a React child (found: " +
          (e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e) +
          "). If you meant to render a collection of children, use an array instead.",
      )
    );
  return o;
}
function ri(t, e, n) {
  if (t == null) return t;
  var r = [],
    s = 0;
  return (
    Ni(t, r, "", "", function (i) {
      return e.call(n, i, s++);
    }),
    r
  );
}
function ig(t) {
  if (t._status === -1) {
    var e = t._result;
    ((e = e()),
      e.then(
        function (n) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 1), (t._result = n));
        },
        function (n) {
          (t._status === 0 || t._status === -1) &&
            ((t._status = 2), (t._result = n));
        },
      ),
      t._status === -1 && ((t._status = 0), (t._result = e)));
  }
  if (t._status === 1) return t._result.default;
  throw t._result;
}
var We = { current: null },
  ji = { transition: null },
  og = {
    ReactCurrentDispatcher: We,
    ReactCurrentBatchConfig: ji,
    ReactCurrentOwner: Jl,
  };
function oh() {
  throw Error("act(...) is not supported in production builds of React.");
}
V.Children = {
  map: ri,
  forEach: function (t, e, n) {
    ri(
      t,
      function () {
        e.apply(this, arguments);
      },
      n,
    );
  },
  count: function (t) {
    var e = 0;
    return (
      ri(t, function () {
        e++;
      }),
      e
    );
  },
  toArray: function (t) {
    return (
      ri(t, function (e) {
        return e;
      }) || []
    );
  },
  only: function (t) {
    if (!Ql(t))
      throw Error(
        "React.Children.only expected to receive a single React element child.",
      );
    return t;
  },
};
V.Component = Mr;
V.Fragment = qp;
V.Profiler = Jp;
V.PureComponent = ql;
V.StrictMode = Gp;
V.Suspense = Zp;
V.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = og;
V.act = oh;
V.cloneElement = function (t, e, n) {
  if (t == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        t +
        ".",
    );
  var r = eh({}, t.props),
    s = t.key,
    i = t.ref,
    o = t._owner;
  if (e != null) {
    if (
      (e.ref !== void 0 && ((i = e.ref), (o = Jl.current)),
      e.key !== void 0 && (s = "" + e.key),
      t.type && t.type.defaultProps)
    )
      var a = t.type.defaultProps;
    for (l in e)
      rh.call(e, l) &&
        !sh.hasOwnProperty(l) &&
        (r[l] = e[l] === void 0 && a !== void 0 ? a[l] : e[l]);
  }
  var l = arguments.length - 2;
  if (l === 1) r.children = n;
  else if (1 < l) {
    a = Array(l);
    for (var u = 0; u < l; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return { $$typeof: Ws, type: t.type, key: s, ref: i, props: r, _owner: o };
};
V.createContext = function (t) {
  return (
    (t = {
      $$typeof: Yp,
      _currentValue: t,
      _currentValue2: t,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (t.Provider = { $$typeof: Qp, _context: t }),
    (t.Consumer = t)
  );
};
V.createElement = ih;
V.createFactory = function (t) {
  var e = ih.bind(null, t);
  return ((e.type = t), e);
};
V.createRef = function () {
  return { current: null };
};
V.forwardRef = function (t) {
  return { $$typeof: Xp, render: t };
};
V.isValidElement = Ql;
V.lazy = function (t) {
  return { $$typeof: tg, _payload: { _status: -1, _result: t }, _init: ig };
};
V.memo = function (t, e) {
  return { $$typeof: eg, type: t, compare: e === void 0 ? null : e };
};
V.startTransition = function (t) {
  var e = ji.transition;
  ji.transition = {};
  try {
    t();
  } finally {
    ji.transition = e;
  }
};
V.unstable_act = oh;
V.useCallback = function (t, e) {
  return We.current.useCallback(t, e);
};
V.useContext = function (t) {
  return We.current.useContext(t);
};
V.useDebugValue = function () {};
V.useDeferredValue = function (t) {
  return We.current.useDeferredValue(t);
};
V.useEffect = function (t, e) {
  return We.current.useEffect(t, e);
};
V.useId = function () {
  return We.current.useId();
};
V.useImperativeHandle = function (t, e, n) {
  return We.current.useImperativeHandle(t, e, n);
};
V.useInsertionEffect = function (t, e) {
  return We.current.useInsertionEffect(t, e);
};
V.useLayoutEffect = function (t, e) {
  return We.current.useLayoutEffect(t, e);
};
V.useMemo = function (t, e) {
  return We.current.useMemo(t, e);
};
V.useReducer = function (t, e, n) {
  return We.current.useReducer(t, e, n);
};
V.useRef = function (t) {
  return We.current.useRef(t);
};
V.useState = function (t) {
  return We.current.useState(t);
};
V.useSyncExternalStore = function (t, e, n) {
  return We.current.useSyncExternalStore(t, e, n);
};
V.useTransition = function () {
  return We.current.useTransition();
};
V.version = "18.3.1";
Xd.exports = V;
var _ = Xd.exports;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var ag = _,
  lg = Symbol.for("react.element"),
  ug = Symbol.for("react.fragment"),
  cg = Object.prototype.hasOwnProperty,
  dg = ag.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  hg = { key: !0, ref: !0, __self: !0, __source: !0 };
function ah(t, e, n) {
  var r,
    s = {},
    i = null,
    o = null;
  (n !== void 0 && (i = "" + n),
    e.key !== void 0 && (i = "" + e.key),
    e.ref !== void 0 && (o = e.ref));
  for (r in e) cg.call(e, r) && !hg.hasOwnProperty(r) && (s[r] = e[r]);
  if (t && t.defaultProps)
    for (r in ((e = t.defaultProps), e)) s[r] === void 0 && (s[r] = e[r]);
  return {
    $$typeof: lg,
    type: t,
    key: i,
    ref: o,
    props: s,
    _owner: dg.current,
  };
}
xo.Fragment = ug;
xo.jsx = ah;
xo.jsxs = ah;
Yd.exports = xo;
var w = Yd.exports,
  lh = { exports: {} },
  at = {},
  uh = { exports: {} },
  ch = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (t) {
  function e(N, O) {
    var D = N.length;
    N.push(O);
    e: for (; 0 < D;) {
      var W = (D - 1) >>> 1,
        Q = N[W];
      if (0 < s(Q, O)) ((N[W] = O), (N[D] = Q), (D = W));
      else break e;
    }
  }
  function n(N) {
    return N.length === 0 ? null : N[0];
  }
  function r(N) {
    if (N.length === 0) return null;
    var O = N[0],
      D = N.pop();
    if (D !== O) {
      N[0] = D;
      e: for (var W = 0, Q = N.length, qe = Q >>> 1; W < qe;) {
        var ut = 2 * (W + 1) - 1,
          Z = N[ut],
          ve = ut + 1,
          wt = N[ve];
        if (0 > s(Z, D))
          ve < Q && 0 > s(wt, Z)
            ? ((N[W] = wt), (N[ve] = D), (W = ve))
            : ((N[W] = Z), (N[ut] = D), (W = ut));
        else if (ve < Q && 0 > s(wt, D)) ((N[W] = wt), (N[ve] = D), (W = ve));
        else break e;
      }
    }
    return O;
  }
  function s(N, O) {
    var D = N.sortIndex - O.sortIndex;
    return D !== 0 ? D : N.id - O.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    t.unstable_now = function () {
      return i.now();
    };
  } else {
    var o = Date,
      a = o.now();
    t.unstable_now = function () {
      return o.now() - a;
    };
  }
  var l = [],
    u = [],
    d = 1,
    c = null,
    h = 3,
    g = !1,
    y = !1,
    v = !1,
    k = typeof setTimeout == "function" ? setTimeout : null,
    p = typeof clearTimeout == "function" ? clearTimeout : null,
    f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(N) {
    for (var O = n(u); O !== null;) {
      if (O.callback === null) r(u);
      else if (O.startTime <= N)
        (r(u), (O.sortIndex = O.expirationTime), e(l, O));
      else break;
      O = n(u);
    }
  }
  function S(N) {
    if (((v = !1), m(N), !y))
      if (n(l) !== null) ((y = !0), vt(C));
      else {
        var O = n(u);
        O !== null && be(S, O.startTime - N);
      }
  }
  function C(N, O) {
    ((y = !1), v && ((v = !1), p(x), (x = -1)), (g = !0));
    var D = h;
    try {
      for (
        m(O), c = n(l);
        c !== null && (!(c.expirationTime > O) || (N && !I()));
      ) {
        var W = c.callback;
        if (typeof W == "function") {
          ((c.callback = null), (h = c.priorityLevel));
          var Q = W(c.expirationTime <= O);
          ((O = t.unstable_now()),
            typeof Q == "function" ? (c.callback = Q) : c === n(l) && r(l),
            m(O));
        } else r(l);
        c = n(l);
      }
      if (c !== null) var qe = !0;
      else {
        var ut = n(u);
        (ut !== null && be(S, ut.startTime - O), (qe = !1));
      }
      return qe;
    } finally {
      ((c = null), (h = D), (g = !1));
    }
  }
  var E = !1,
    T = null,
    x = -1,
    M = 5,
    P = -1;
  function I() {
    return !(t.unstable_now() - P < M);
  }
  function K() {
    if (T !== null) {
      var N = t.unstable_now();
      P = N;
      var O = !0;
      try {
        O = T(!0, N);
      } finally {
        O ? G() : ((E = !1), (T = null));
      }
    } else E = !1;
  }
  var G;
  if (typeof f == "function")
    G = function () {
      f(K);
    };
  else if (typeof MessageChannel < "u") {
    var le = new MessageChannel(),
      an = le.port2;
    ((le.port1.onmessage = K),
      (G = function () {
        an.postMessage(null);
      }));
  } else
    G = function () {
      k(K, 0);
    };
  function vt(N) {
    ((T = N), E || ((E = !0), G()));
  }
  function be(N, O) {
    x = k(function () {
      N(t.unstable_now());
    }, O);
  }
  ((t.unstable_IdlePriority = 5),
    (t.unstable_ImmediatePriority = 1),
    (t.unstable_LowPriority = 4),
    (t.unstable_NormalPriority = 3),
    (t.unstable_Profiling = null),
    (t.unstable_UserBlockingPriority = 2),
    (t.unstable_cancelCallback = function (N) {
      N.callback = null;
    }),
    (t.unstable_continueExecution = function () {
      y || g || ((y = !0), vt(C));
    }),
    (t.unstable_forceFrameRate = function (N) {
      0 > N || 125 < N || (M = 0 < N ? Math.floor(1e3 / N) : 5);
    }),
    (t.unstable_getCurrentPriorityLevel = function () {
      return h;
    }),
    (t.unstable_getFirstCallbackNode = function () {
      return n(l);
    }),
    (t.unstable_next = function (N) {
      switch (h) {
        case 1:
        case 2:
        case 3:
          var O = 3;
          break;
        default:
          O = h;
      }
      var D = h;
      h = O;
      try {
        return N();
      } finally {
        h = D;
      }
    }),
    (t.unstable_pauseExecution = function () {}),
    (t.unstable_requestPaint = function () {}),
    (t.unstable_runWithPriority = function (N, O) {
      switch (N) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          N = 3;
      }
      var D = h;
      h = N;
      try {
        return O();
      } finally {
        h = D;
      }
    }),
    (t.unstable_scheduleCallback = function (N, O, D) {
      var W = t.unstable_now();
      switch (
        (typeof D == "object" && D !== null
          ? ((D = D.delay), (D = typeof D == "number" && 0 < D ? W + D : W))
          : (D = W),
        N)
      ) {
        case 1:
          var Q = -1;
          break;
        case 2:
          Q = 250;
          break;
        case 5:
          Q = 1073741823;
          break;
        case 4:
          Q = 1e4;
          break;
        default:
          Q = 5e3;
      }
      return (
        (Q = D + Q),
        (N = {
          id: d++,
          callback: O,
          priorityLevel: N,
          startTime: D,
          expirationTime: Q,
          sortIndex: -1,
        }),
        D > W
          ? ((N.sortIndex = D),
            e(u, N),
            n(l) === null &&
              N === n(u) &&
              (v ? (p(x), (x = -1)) : (v = !0), be(S, D - W)))
          : ((N.sortIndex = Q), e(l, N), y || g || ((y = !0), vt(C))),
        N
      );
    }),
    (t.unstable_shouldYield = I),
    (t.unstable_wrapCallback = function (N) {
      var O = h;
      return function () {
        var D = h;
        h = O;
        try {
          return N.apply(this, arguments);
        } finally {
          h = D;
        }
      };
    }));
})(ch);
uh.exports = ch;
var fg = uh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var pg = _,
  ot = fg;
function R(t) {
  for (
    var e = "https://reactjs.org/docs/error-decoder.html?invariant=" + t, n = 1;
    n < arguments.length;
    n++
  )
    e += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    t +
    "; visit " +
    e +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var dh = new Set(),
  vs = {};
function Jn(t, e) {
  (Pr(t, e), Pr(t + "Capture", e));
}
function Pr(t, e) {
  for (vs[t] = e, t = 0; t < e.length; t++) dh.add(e[t]);
}
var tn = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Ua = Object.prototype.hasOwnProperty,
  gg =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Ju = {},
  Qu = {};
function mg(t) {
  return Ua.call(Qu, t)
    ? !0
    : Ua.call(Ju, t)
      ? !1
      : gg.test(t)
        ? (Qu[t] = !0)
        : ((Ju[t] = !0), !1);
}
function yg(t, e, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof e) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
          ? !n.acceptsBooleans
          : ((t = t.toLowerCase().slice(0, 5)), t !== "data-" && t !== "aria-");
    default:
      return !1;
  }
}
function vg(t, e, n, r) {
  if (e === null || typeof e > "u" || yg(t, e, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !e;
      case 4:
        return e === !1;
      case 5:
        return isNaN(e);
      case 6:
        return isNaN(e) || 1 > e;
    }
  return !1;
}
function Ke(t, e, n, r, s, i, o) {
  ((this.acceptsBooleans = e === 2 || e === 3 || e === 4),
    (this.attributeName = r),
    (this.attributeNamespace = s),
    (this.mustUseProperty = n),
    (this.propertyName = t),
    (this.type = e),
    (this.sanitizeURL = i),
    (this.removeEmptyString = o));
}
var $e = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (t) {
    $e[t] = new Ke(t, 0, !1, t, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (t) {
  var e = t[0];
  $e[e] = new Ke(e, 1, !1, t[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (t) {
  $e[t] = new Ke(t, 2, !1, t.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (t) {
  $e[t] = new Ke(t, 2, !1, t, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (t) {
    $e[t] = new Ke(t, 3, !1, t.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (t) {
  $e[t] = new Ke(t, 3, !0, t, null, !1, !1);
});
["capture", "download"].forEach(function (t) {
  $e[t] = new Ke(t, 4, !1, t, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (t) {
  $e[t] = new Ke(t, 6, !1, t, null, !1, !1);
});
["rowSpan", "start"].forEach(function (t) {
  $e[t] = new Ke(t, 5, !1, t.toLowerCase(), null, !1, !1);
});
var Yl = /[\-:]([a-z])/g;
function Xl(t) {
  return t[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (t) {
    var e = t.replace(Yl, Xl);
    $e[e] = new Ke(e, 1, !1, t, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (t) {
    var e = t.replace(Yl, Xl);
    $e[e] = new Ke(e, 1, !1, t, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (t) {
  var e = t.replace(Yl, Xl);
  $e[e] = new Ke(e, 1, !1, t, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (t) {
  $e[t] = new Ke(t, 1, !1, t.toLowerCase(), null, !1, !1);
});
$e.xlinkHref = new Ke(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1,
);
["src", "href", "action", "formAction"].forEach(function (t) {
  $e[t] = new Ke(t, 1, !1, t.toLowerCase(), null, !0, !0);
});
function Zl(t, e, n, r) {
  var s = $e.hasOwnProperty(e) ? $e[e] : null;
  (s !== null
    ? s.type !== 0
    : r ||
      !(2 < e.length) ||
      (e[0] !== "o" && e[0] !== "O") ||
      (e[1] !== "n" && e[1] !== "N")) &&
    (vg(e, n, s, r) && (n = null),
    r || s === null
      ? mg(e) && (n === null ? t.removeAttribute(e) : t.setAttribute(e, "" + n))
      : s.mustUseProperty
        ? (t[s.propertyName] = n === null ? (s.type === 3 ? !1 : "") : n)
        : ((e = s.attributeName),
          (r = s.attributeNamespace),
          n === null
            ? t.removeAttribute(e)
            : ((s = s.type),
              (n = s === 3 || (s === 4 && n === !0) ? "" : "" + n),
              r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n))));
}
var on = pg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  si = Symbol.for("react.element"),
  ur = Symbol.for("react.portal"),
  cr = Symbol.for("react.fragment"),
  eu = Symbol.for("react.strict_mode"),
  Ma = Symbol.for("react.profiler"),
  hh = Symbol.for("react.provider"),
  fh = Symbol.for("react.context"),
  tu = Symbol.for("react.forward_ref"),
  Ba = Symbol.for("react.suspense"),
  Fa = Symbol.for("react.suspense_list"),
  nu = Symbol.for("react.memo"),
  cn = Symbol.for("react.lazy"),
  ph = Symbol.for("react.offscreen"),
  Yu = Symbol.iterator;
function Hr(t) {
  return t === null || typeof t != "object"
    ? null
    : ((t = (Yu && t[Yu]) || t["@@iterator"]),
      typeof t == "function" ? t : null);
}
var de = Object.assign,
  Yo;
function Zr(t) {
  if (Yo === void 0)
    try {
      throw Error();
    } catch (n) {
      var e = n.stack.trim().match(/\n( *(at )?)/);
      Yo = (e && e[1]) || "";
    }
  return (
    `
` +
    Yo +
    t
  );
}
var Xo = !1;
function Zo(t, e) {
  if (!t || Xo) return "";
  Xo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (e)
      if (
        ((e = function () {
          throw Error();
        }),
        Object.defineProperty(e.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(e, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(t, [], e);
      } else {
        try {
          e.call();
        } catch (u) {
          r = u;
        }
        t.call(e.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      t();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var s = u.stack.split(`
`),
          i = r.stack.split(`
`),
          o = s.length - 1,
          a = i.length - 1;
        1 <= o && 0 <= a && s[o] !== i[a];
      )
        a--;
      for (; 1 <= o && 0 <= a; o--, a--)
        if (s[o] !== i[a]) {
          if (o !== 1 || a !== 1)
            do
              if ((o--, a--, 0 > a || s[o] !== i[a])) {
                var l =
                  `
` + s[o].replace(" at new ", " at ");
                return (
                  t.displayName &&
                    l.includes("<anonymous>") &&
                    (l = l.replace("<anonymous>", t.displayName)),
                  l
                );
              }
            while (1 <= o && 0 <= a);
          break;
        }
    }
  } finally {
    ((Xo = !1), (Error.prepareStackTrace = n));
  }
  return (t = t ? t.displayName || t.name : "") ? Zr(t) : "";
}
function wg(t) {
  switch (t.tag) {
    case 5:
      return Zr(t.type);
    case 16:
      return Zr("Lazy");
    case 13:
      return Zr("Suspense");
    case 19:
      return Zr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return ((t = Zo(t.type, !1)), t);
    case 11:
      return ((t = Zo(t.type.render, !1)), t);
    case 1:
      return ((t = Zo(t.type, !0)), t);
    default:
      return "";
  }
}
function za(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
    case cr:
      return "Fragment";
    case ur:
      return "Portal";
    case Ma:
      return "Profiler";
    case eu:
      return "StrictMode";
    case Ba:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if (typeof t == "object")
    switch (t.$$typeof) {
      case fh:
        return (t.displayName || "Context") + ".Consumer";
      case hh:
        return (t._context.displayName || "Context") + ".Provider";
      case tu:
        var e = t.render;
        return (
          (t = t.displayName),
          t ||
            ((t = e.displayName || e.name || ""),
            (t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")),
          t
        );
      case nu:
        return (
          (e = t.displayName || null),
          e !== null ? e : za(t.type) || "Memo"
        );
      case cn:
        ((e = t._payload), (t = t._init));
        try {
          return za(t(e));
        } catch {}
    }
  return null;
}
function _g(t) {
  var e = t.type;
  switch (t.tag) {
    case 24:
      return "Cache";
    case 9:
      return (e.displayName || "Context") + ".Consumer";
    case 10:
      return (e._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (t = e.render),
        (t = t.displayName || t.name || ""),
        e.displayName || (t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return e;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return za(e);
    case 8:
      return e === eu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof e == "function") return e.displayName || e.name || null;
      if (typeof e == "string") return e;
  }
  return null;
}
function Cn(t) {
  switch (typeof t) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return t;
    case "object":
      return t;
    default:
      return "";
  }
}
function gh(t) {
  var e = t.type;
  return (
    (t = t.nodeName) &&
    t.toLowerCase() === "input" &&
    (e === "checkbox" || e === "radio")
  );
}
function kg(t) {
  var e = gh(t) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(t.constructor.prototype, e),
    r = "" + t[e];
  if (
    !t.hasOwnProperty(e) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var s = n.get,
      i = n.set;
    return (
      Object.defineProperty(t, e, {
        configurable: !0,
        get: function () {
          return s.call(this);
        },
        set: function (o) {
          ((r = "" + o), i.call(this, o));
        },
      }),
      Object.defineProperty(t, e, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          ((t._valueTracker = null), delete t[e]);
        },
      }
    );
  }
}
function ii(t) {
  t._valueTracker || (t._valueTracker = kg(t));
}
function mh(t) {
  if (!t) return !1;
  var e = t._valueTracker;
  if (!e) return !0;
  var n = e.getValue(),
    r = "";
  return (
    t && (r = gh(t) ? (t.checked ? "true" : "false") : t.value),
    (t = r),
    t !== n ? (e.setValue(t), !0) : !1
  );
}
function qi(t) {
  if (((t = t || (typeof document < "u" ? document : void 0)), typeof t > "u"))
    return null;
  try {
    return t.activeElement || t.body;
  } catch {
    return t.body;
  }
}
function Ha(t, e) {
  var n = e.checked;
  return de({}, e, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? t._wrapperState.initialChecked,
  });
}
function Xu(t, e) {
  var n = e.defaultValue == null ? "" : e.defaultValue,
    r = e.checked != null ? e.checked : e.defaultChecked;
  ((n = Cn(e.value != null ? e.value : n)),
    (t._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        e.type === "checkbox" || e.type === "radio"
          ? e.checked != null
          : e.value != null,
    }));
}
function yh(t, e) {
  ((e = e.checked), e != null && Zl(t, "checked", e, !1));
}
function Va(t, e) {
  yh(t, e);
  var n = Cn(e.value),
    r = e.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && t.value === "") || t.value != n) && (t.value = "" + n)
      : t.value !== "" + n && (t.value = "" + n);
  else if (r === "submit" || r === "reset") {
    t.removeAttribute("value");
    return;
  }
  (e.hasOwnProperty("value")
    ? Wa(t, e.type, n)
    : e.hasOwnProperty("defaultValue") && Wa(t, e.type, Cn(e.defaultValue)),
    e.checked == null &&
      e.defaultChecked != null &&
      (t.defaultChecked = !!e.defaultChecked));
}
function Zu(t, e, n) {
  if (e.hasOwnProperty("value") || e.hasOwnProperty("defaultValue")) {
    var r = e.type;
    if (!(
      (r !== "submit" && r !== "reset") ||
      (e.value !== void 0 && e.value !== null)
    ))
      return;
    ((e = "" + t._wrapperState.initialValue),
      n || e === t.value || (t.value = e),
      (t.defaultValue = e));
  }
  ((n = t.name),
    n !== "" && (t.name = ""),
    (t.defaultChecked = !!t._wrapperState.initialChecked),
    n !== "" && (t.name = n));
}
function Wa(t, e, n) {
  (e !== "number" || qi(t.ownerDocument) !== t) &&
    (n == null
      ? (t.defaultValue = "" + t._wrapperState.initialValue)
      : t.defaultValue !== "" + n && (t.defaultValue = "" + n));
}
var es = Array.isArray;
function Sr(t, e, n, r) {
  if (((t = t.options), e)) {
    e = {};
    for (var s = 0; s < n.length; s++) e["$" + n[s]] = !0;
    for (n = 0; n < t.length; n++)
      ((s = e.hasOwnProperty("$" + t[n].value)),
        t[n].selected !== s && (t[n].selected = s),
        s && r && (t[n].defaultSelected = !0));
  } else {
    for (n = "" + Cn(n), e = null, s = 0; s < t.length; s++) {
      if (t[s].value === n) {
        ((t[s].selected = !0), r && (t[s].defaultSelected = !0));
        return;
      }
      e !== null || t[s].disabled || (e = t[s]);
    }
    e !== null && (e.selected = !0);
  }
}
function Ka(t, e) {
  if (e.dangerouslySetInnerHTML != null) throw Error(R(91));
  return de({}, e, {
    value: void 0,
    defaultValue: void 0,
    children: "" + t._wrapperState.initialValue,
  });
}
function ec(t, e) {
  var n = e.value;
  if (n == null) {
    if (((n = e.children), (e = e.defaultValue), n != null)) {
      if (e != null) throw Error(R(92));
      if (es(n)) {
        if (1 < n.length) throw Error(R(93));
        n = n[0];
      }
      e = n;
    }
    (e == null && (e = ""), (n = e));
  }
  t._wrapperState = { initialValue: Cn(n) };
}
function vh(t, e) {
  var n = Cn(e.value),
    r = Cn(e.defaultValue);
  (n != null &&
    ((n = "" + n),
    n !== t.value && (t.value = n),
    e.defaultValue == null && t.defaultValue !== n && (t.defaultValue = n)),
    r != null && (t.defaultValue = "" + r));
}
function tc(t) {
  var e = t.textContent;
  e === t._wrapperState.initialValue && e !== "" && e !== null && (t.value = e);
}
function wh(t) {
  switch (t) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function qa(t, e) {
  return t == null || t === "http://www.w3.org/1999/xhtml"
    ? wh(e)
    : t === "http://www.w3.org/2000/svg" && e === "foreignObject"
      ? "http://www.w3.org/1999/xhtml"
      : t;
}
var oi,
  _h = (function (t) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (e, n, r, s) {
          MSApp.execUnsafeLocalFunction(function () {
            return t(e, n, r, s);
          });
        }
      : t;
  })(function (t, e) {
    if (t.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in t)
      t.innerHTML = e;
    else {
      for (
        oi = oi || document.createElement("div"),
          oi.innerHTML = "<svg>" + e.valueOf().toString() + "</svg>",
          e = oi.firstChild;
        t.firstChild;
      )
        t.removeChild(t.firstChild);
      for (; e.firstChild;) t.appendChild(e.firstChild);
    }
  });
function ws(t, e) {
  if (e) {
    var n = t.firstChild;
    if (n && n === t.lastChild && n.nodeType === 3) {
      n.nodeValue = e;
      return;
    }
  }
  t.textContent = e;
}
var as = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Sg = ["Webkit", "ms", "Moz", "O"];
Object.keys(as).forEach(function (t) {
  Sg.forEach(function (e) {
    ((e = e + t.charAt(0).toUpperCase() + t.substring(1)), (as[e] = as[t]));
  });
});
function kh(t, e, n) {
  return e == null || typeof e == "boolean" || e === ""
    ? ""
    : n || typeof e != "number" || e === 0 || (as.hasOwnProperty(t) && as[t])
      ? ("" + e).trim()
      : e + "px";
}
function Sh(t, e) {
  t = t.style;
  for (var n in e)
    if (e.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        s = kh(n, e[n], r);
      (n === "float" && (n = "cssFloat"), r ? t.setProperty(n, s) : (t[n] = s));
    }
}
var Eg = de(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  },
);
function Ga(t, e) {
  if (e) {
    if (Eg[t] && (e.children != null || e.dangerouslySetInnerHTML != null))
      throw Error(R(137, t));
    if (e.dangerouslySetInnerHTML != null) {
      if (e.children != null) throw Error(R(60));
      if (
        typeof e.dangerouslySetInnerHTML != "object" ||
        !("__html" in e.dangerouslySetInnerHTML)
      )
        throw Error(R(61));
    }
    if (e.style != null && typeof e.style != "object") throw Error(R(62));
  }
}
function Ja(t, e) {
  if (t.indexOf("-") === -1) return typeof e.is == "string";
  switch (t) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Qa = null;
function ru(t) {
  return (
    (t = t.target || t.srcElement || window),
    t.correspondingUseElement && (t = t.correspondingUseElement),
    t.nodeType === 3 ? t.parentNode : t
  );
}
var Ya = null,
  Er = null,
  br = null;
function nc(t) {
  if ((t = Gs(t))) {
    if (typeof Ya != "function") throw Error(R(280));
    var e = t.stateNode;
    e && ((e = jo(e)), Ya(t.stateNode, t.type, e));
  }
}
function Eh(t) {
  Er ? (br ? br.push(t) : (br = [t])) : (Er = t);
}
function bh() {
  if (Er) {
    var t = Er,
      e = br;
    if (((br = Er = null), nc(t), e)) for (t = 0; t < e.length; t++) nc(e[t]);
  }
}
function Th(t, e) {
  return t(e);
}
function Ch() {}
var ea = !1;
function Rh(t, e, n) {
  if (ea) return t(e, n);
  ea = !0;
  try {
    return Th(t, e, n);
  } finally {
    ((ea = !1), (Er !== null || br !== null) && (Ch(), bh()));
  }
}
function _s(t, e) {
  var n = t.stateNode;
  if (n === null) return null;
  var r = jo(n);
  if (r === null) return null;
  n = r[e];
  e: switch (e) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      ((r = !r.disabled) ||
        ((t = t.type),
        (r = !(
          t === "button" ||
          t === "input" ||
          t === "select" ||
          t === "textarea"
        ))),
        (t = !r));
      break e;
    default:
      t = !1;
  }
  if (t) return null;
  if (n && typeof n != "function") throw Error(R(231, e, typeof n));
  return n;
}
var Xa = !1;
if (tn)
  try {
    var Vr = {};
    (Object.defineProperty(Vr, "passive", {
      get: function () {
        Xa = !0;
      },
    }),
      window.addEventListener("test", Vr, Vr),
      window.removeEventListener("test", Vr, Vr));
  } catch {
    Xa = !1;
  }
function bg(t, e, n, r, s, i, o, a, l) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    e.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var ls = !1,
  Gi = null,
  Ji = !1,
  Za = null,
  Tg = {
    onError: function (t) {
      ((ls = !0), (Gi = t));
    },
  };
function Cg(t, e, n, r, s, i, o, a, l) {
  ((ls = !1), (Gi = null), bg.apply(Tg, arguments));
}
function Rg(t, e, n, r, s, i, o, a, l) {
  if ((Cg.apply(this, arguments), ls)) {
    if (ls) {
      var u = Gi;
      ((ls = !1), (Gi = null));
    } else throw Error(R(198));
    Ji || ((Ji = !0), (Za = u));
  }
}
function Qn(t) {
  var e = t,
    n = t;
  if (t.alternate) for (; e.return;) e = e.return;
  else {
    t = e;
    do ((e = t), e.flags & 4098 && (n = e.return), (t = e.return));
    while (t);
  }
  return e.tag === 3 ? n : null;
}
function xh(t) {
  if (t.tag === 13) {
    var e = t.memoizedState;
    if (
      (e === null && ((t = t.alternate), t !== null && (e = t.memoizedState)),
      e !== null)
    )
      return e.dehydrated;
  }
  return null;
}
function rc(t) {
  if (Qn(t) !== t) throw Error(R(188));
}
function xg(t) {
  var e = t.alternate;
  if (!e) {
    if (((e = Qn(t)), e === null)) throw Error(R(188));
    return e !== t ? null : t;
  }
  for (var n = t, r = e; ;) {
    var s = n.return;
    if (s === null) break;
    var i = s.alternate;
    if (i === null) {
      if (((r = s.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (s.child === i.child) {
      for (i = s.child; i;) {
        if (i === n) return (rc(s), t);
        if (i === r) return (rc(s), e);
        i = i.sibling;
      }
      throw Error(R(188));
    }
    if (n.return !== r.return) ((n = s), (r = i));
    else {
      for (var o = !1, a = s.child; a;) {
        if (a === n) {
          ((o = !0), (n = s), (r = i));
          break;
        }
        if (a === r) {
          ((o = !0), (r = s), (n = i));
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = i.child; a;) {
          if (a === n) {
            ((o = !0), (n = i), (r = s));
            break;
          }
          if (a === r) {
            ((o = !0), (r = i), (n = s));
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(R(189));
      }
    }
    if (n.alternate !== r) throw Error(R(190));
  }
  if (n.tag !== 3) throw Error(R(188));
  return n.stateNode.current === n ? t : e;
}
function Ah(t) {
  return ((t = xg(t)), t !== null ? Oh(t) : null);
}
function Oh(t) {
  if (t.tag === 5 || t.tag === 6) return t;
  for (t = t.child; t !== null;) {
    var e = Oh(t);
    if (e !== null) return e;
    t = t.sibling;
  }
  return null;
}
var Ph = ot.unstable_scheduleCallback,
  sc = ot.unstable_cancelCallback,
  Ag = ot.unstable_shouldYield,
  Og = ot.unstable_requestPaint,
  ye = ot.unstable_now,
  Pg = ot.unstable_getCurrentPriorityLevel,
  su = ot.unstable_ImmediatePriority,
  Nh = ot.unstable_UserBlockingPriority,
  Qi = ot.unstable_NormalPriority,
  Ng = ot.unstable_LowPriority,
  jh = ot.unstable_IdlePriority,
  Ao = null,
  Mt = null;
function jg(t) {
  if (Mt && typeof Mt.onCommitFiberRoot == "function")
    try {
      Mt.onCommitFiberRoot(Ao, t, void 0, (t.current.flags & 128) === 128);
    } catch {}
}
var Ot = Math.clz32 ? Math.clz32 : $g,
  Ig = Math.log,
  Lg = Math.LN2;
function $g(t) {
  return ((t >>>= 0), t === 0 ? 32 : (31 - ((Ig(t) / Lg) | 0)) | 0);
}
var ai = 64,
  li = 4194304;
function ts(t) {
  switch (t & -t) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return t & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return t;
  }
}
function Yi(t, e) {
  var n = t.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    s = t.suspendedLanes,
    i = t.pingedLanes,
    o = n & 268435455;
  if (o !== 0) {
    var a = o & ~s;
    a !== 0 ? (r = ts(a)) : ((i &= o), i !== 0 && (r = ts(i)));
  } else ((o = n & ~s), o !== 0 ? (r = ts(o)) : i !== 0 && (r = ts(i)));
  if (r === 0) return 0;
  if (
    e !== 0 &&
    e !== r &&
    !(e & s) &&
    ((s = r & -r), (i = e & -e), s >= i || (s === 16 && (i & 4194240) !== 0))
  )
    return e;
  if ((r & 4 && (r |= n & 16), (e = t.entangledLanes), e !== 0))
    for (t = t.entanglements, e &= r; 0 < e;)
      ((n = 31 - Ot(e)), (s = 1 << n), (r |= t[n]), (e &= ~s));
  return r;
}
function Dg(t, e) {
  switch (t) {
    case 1:
    case 2:
    case 4:
      return e + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Ug(t, e) {
  for (
    var n = t.suspendedLanes,
      r = t.pingedLanes,
      s = t.expirationTimes,
      i = t.pendingLanes;
    0 < i;
  ) {
    var o = 31 - Ot(i),
      a = 1 << o,
      l = s[o];
    (l === -1
      ? (!(a & n) || a & r) && (s[o] = Dg(a, e))
      : l <= e && (t.expiredLanes |= a),
      (i &= ~a));
  }
}
function el(t) {
  return (
    (t = t.pendingLanes & -1073741825),
    t !== 0 ? t : t & 1073741824 ? 1073741824 : 0
  );
}
function Ih() {
  var t = ai;
  return ((ai <<= 1), !(ai & 4194240) && (ai = 64), t);
}
function ta(t) {
  for (var e = [], n = 0; 31 > n; n++) e.push(t);
  return e;
}
function Ks(t, e, n) {
  ((t.pendingLanes |= e),
    e !== 536870912 && ((t.suspendedLanes = 0), (t.pingedLanes = 0)),
    (t = t.eventTimes),
    (e = 31 - Ot(e)),
    (t[e] = n));
}
function Mg(t, e) {
  var n = t.pendingLanes & ~e;
  ((t.pendingLanes = e),
    (t.suspendedLanes = 0),
    (t.pingedLanes = 0),
    (t.expiredLanes &= e),
    (t.mutableReadLanes &= e),
    (t.entangledLanes &= e),
    (e = t.entanglements));
  var r = t.eventTimes;
  for (t = t.expirationTimes; 0 < n;) {
    var s = 31 - Ot(n),
      i = 1 << s;
    ((e[s] = 0), (r[s] = -1), (t[s] = -1), (n &= ~i));
  }
}
function iu(t, e) {
  var n = (t.entangledLanes |= e);
  for (t = t.entanglements; n;) {
    var r = 31 - Ot(n),
      s = 1 << r;
    ((s & e) | (t[r] & e) && (t[r] |= e), (n &= ~s));
  }
}
var X = 0;
function Lh(t) {
  return (
    (t &= -t),
    1 < t ? (4 < t ? (t & 268435455 ? 16 : 536870912) : 4) : 1
  );
}
var $h,
  ou,
  Dh,
  Uh,
  Mh,
  tl = !1,
  ui = [],
  vn = null,
  wn = null,
  _n = null,
  ks = new Map(),
  Ss = new Map(),
  hn = [],
  Bg =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " ",
    );
function ic(t, e) {
  switch (t) {
    case "focusin":
    case "focusout":
      vn = null;
      break;
    case "dragenter":
    case "dragleave":
      wn = null;
      break;
    case "mouseover":
    case "mouseout":
      _n = null;
      break;
    case "pointerover":
    case "pointerout":
      ks.delete(e.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ss.delete(e.pointerId);
  }
}
function Wr(t, e, n, r, s, i) {
  return t === null || t.nativeEvent !== i
    ? ((t = {
        blockedOn: e,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [s],
      }),
      e !== null && ((e = Gs(e)), e !== null && ou(e)),
      t)
    : ((t.eventSystemFlags |= r),
      (e = t.targetContainers),
      s !== null && e.indexOf(s) === -1 && e.push(s),
      t);
}
function Fg(t, e, n, r, s) {
  switch (e) {
    case "focusin":
      return ((vn = Wr(vn, t, e, n, r, s)), !0);
    case "dragenter":
      return ((wn = Wr(wn, t, e, n, r, s)), !0);
    case "mouseover":
      return ((_n = Wr(_n, t, e, n, r, s)), !0);
    case "pointerover":
      var i = s.pointerId;
      return (ks.set(i, Wr(ks.get(i) || null, t, e, n, r, s)), !0);
    case "gotpointercapture":
      return (
        (i = s.pointerId),
        Ss.set(i, Wr(Ss.get(i) || null, t, e, n, r, s)),
        !0
      );
  }
  return !1;
}
function Bh(t) {
  var e = Dn(t.target);
  if (e !== null) {
    var n = Qn(e);
    if (n !== null) {
      if (((e = n.tag), e === 13)) {
        if (((e = xh(n)), e !== null)) {
          ((t.blockedOn = e),
            Mh(t.priority, function () {
              Dh(n);
            }));
          return;
        }
      } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  t.blockedOn = null;
}
function Ii(t) {
  if (t.blockedOn !== null) return !1;
  for (var e = t.targetContainers; 0 < e.length;) {
    var n = nl(t.domEventName, t.eventSystemFlags, e[0], t.nativeEvent);
    if (n === null) {
      n = t.nativeEvent;
      var r = new n.constructor(n.type, n);
      ((Qa = r), n.target.dispatchEvent(r), (Qa = null));
    } else return ((e = Gs(n)), e !== null && ou(e), (t.blockedOn = n), !1);
    e.shift();
  }
  return !0;
}
function oc(t, e, n) {
  Ii(t) && n.delete(e);
}
function zg() {
  ((tl = !1),
    vn !== null && Ii(vn) && (vn = null),
    wn !== null && Ii(wn) && (wn = null),
    _n !== null && Ii(_n) && (_n = null),
    ks.forEach(oc),
    Ss.forEach(oc));
}
function Kr(t, e) {
  t.blockedOn === e &&
    ((t.blockedOn = null),
    tl ||
      ((tl = !0),
      ot.unstable_scheduleCallback(ot.unstable_NormalPriority, zg)));
}
function Es(t) {
  function e(s) {
    return Kr(s, t);
  }
  if (0 < ui.length) {
    Kr(ui[0], t);
    for (var n = 1; n < ui.length; n++) {
      var r = ui[n];
      r.blockedOn === t && (r.blockedOn = null);
    }
  }
  for (
    vn !== null && Kr(vn, t),
      wn !== null && Kr(wn, t),
      _n !== null && Kr(_n, t),
      ks.forEach(e),
      Ss.forEach(e),
      n = 0;
    n < hn.length;
    n++
  )
    ((r = hn[n]), r.blockedOn === t && (r.blockedOn = null));
  for (; 0 < hn.length && ((n = hn[0]), n.blockedOn === null);)
    (Bh(n), n.blockedOn === null && hn.shift());
}
var Tr = on.ReactCurrentBatchConfig,
  Xi = !0;
function Hg(t, e, n, r) {
  var s = X,
    i = Tr.transition;
  Tr.transition = null;
  try {
    ((X = 1), au(t, e, n, r));
  } finally {
    ((X = s), (Tr.transition = i));
  }
}
function Vg(t, e, n, r) {
  var s = X,
    i = Tr.transition;
  Tr.transition = null;
  try {
    ((X = 4), au(t, e, n, r));
  } finally {
    ((X = s), (Tr.transition = i));
  }
}
function au(t, e, n, r) {
  if (Xi) {
    var s = nl(t, e, n, r);
    if (s === null) (da(t, e, r, Zi, n), ic(t, r));
    else if (Fg(s, t, e, n, r)) r.stopPropagation();
    else if ((ic(t, r), e & 4 && -1 < Bg.indexOf(t))) {
      for (; s !== null;) {
        var i = Gs(s);
        if (
          (i !== null && $h(i),
          (i = nl(t, e, n, r)),
          i === null && da(t, e, r, Zi, n),
          i === s)
        )
          break;
        s = i;
      }
      s !== null && r.stopPropagation();
    } else da(t, e, r, null, n);
  }
}
var Zi = null;
function nl(t, e, n, r) {
  if (((Zi = null), (t = ru(r)), (t = Dn(t)), t !== null))
    if (((e = Qn(t)), e === null)) t = null;
    else if (((n = e.tag), n === 13)) {
      if (((t = xh(e)), t !== null)) return t;
      t = null;
    } else if (n === 3) {
      if (e.stateNode.current.memoizedState.isDehydrated)
        return e.tag === 3 ? e.stateNode.containerInfo : null;
      t = null;
    } else e !== t && (t = null);
  return ((Zi = t), null);
}
function Fh(t) {
  switch (t) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Pg()) {
        case su:
          return 1;
        case Nh:
          return 4;
        case Qi:
        case Ng:
          return 16;
        case jh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var mn = null,
  lu = null,
  Li = null;
function zh() {
  if (Li) return Li;
  var t,
    e = lu,
    n = e.length,
    r,
    s = "value" in mn ? mn.value : mn.textContent,
    i = s.length;
  for (t = 0; t < n && e[t] === s[t]; t++);
  var o = n - t;
  for (r = 1; r <= o && e[n - r] === s[i - r]; r++);
  return (Li = s.slice(t, 1 < r ? 1 - r : void 0));
}
function $i(t) {
  var e = t.keyCode;
  return (
    "charCode" in t
      ? ((t = t.charCode), t === 0 && e === 13 && (t = 13))
      : (t = e),
    t === 10 && (t = 13),
    32 <= t || t === 13 ? t : 0
  );
}
function ci() {
  return !0;
}
function ac() {
  return !1;
}
function lt(t) {
  function e(n, r, s, i, o) {
    ((this._reactName = n),
      (this._targetInst = s),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = o),
      (this.currentTarget = null));
    for (var a in t)
      t.hasOwnProperty(a) && ((n = t[a]), (this[a] = n ? n(i) : i[a]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? ci
        : ac),
      (this.isPropagationStopped = ac),
      this
    );
  }
  return (
    de(e.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = ci));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = ci));
      },
      persist: function () {},
      isPersistent: ci,
    }),
    e
  );
}
var Br = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  uu = lt(Br),
  qs = de({}, Br, { view: 0, detail: 0 }),
  Wg = lt(qs),
  na,
  ra,
  qr,
  Oo = de({}, qs, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: cu,
    button: 0,
    buttons: 0,
    relatedTarget: function (t) {
      return t.relatedTarget === void 0
        ? t.fromElement === t.srcElement
          ? t.toElement
          : t.fromElement
        : t.relatedTarget;
    },
    movementX: function (t) {
      return "movementX" in t
        ? t.movementX
        : (t !== qr &&
            (qr && t.type === "mousemove"
              ? ((na = t.screenX - qr.screenX), (ra = t.screenY - qr.screenY))
              : (ra = na = 0),
            (qr = t)),
          na);
    },
    movementY: function (t) {
      return "movementY" in t ? t.movementY : ra;
    },
  }),
  lc = lt(Oo),
  Kg = de({}, Oo, { dataTransfer: 0 }),
  qg = lt(Kg),
  Gg = de({}, qs, { relatedTarget: 0 }),
  sa = lt(Gg),
  Jg = de({}, Br, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Qg = lt(Jg),
  Yg = de({}, Br, {
    clipboardData: function (t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    },
  }),
  Xg = lt(Yg),
  Zg = de({}, Br, { data: 0 }),
  uc = lt(Zg),
  em = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  tm = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  nm = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function rm(t) {
  var e = this.nativeEvent;
  return e.getModifierState ? e.getModifierState(t) : (t = nm[t]) ? !!e[t] : !1;
}
function cu() {
  return rm;
}
var sm = de({}, qs, {
    key: function (t) {
      if (t.key) {
        var e = em[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress"
        ? ((t = $i(t)), t === 13 ? "Enter" : String.fromCharCode(t))
        : t.type === "keydown" || t.type === "keyup"
          ? tm[t.keyCode] || "Unidentified"
          : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: cu,
    charCode: function (t) {
      return t.type === "keypress" ? $i(t) : 0;
    },
    keyCode: function (t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function (t) {
      return t.type === "keypress"
        ? $i(t)
        : t.type === "keydown" || t.type === "keyup"
          ? t.keyCode
          : 0;
    },
  }),
  im = lt(sm),
  om = de({}, Oo, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  cc = lt(om),
  am = de({}, qs, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: cu,
  }),
  lm = lt(am),
  um = de({}, Br, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  cm = lt(um),
  dm = de({}, Oo, {
    deltaX: function (t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function (t) {
      return "deltaY" in t
        ? t.deltaY
        : "wheelDeltaY" in t
          ? -t.wheelDeltaY
          : "wheelDelta" in t
            ? -t.wheelDelta
            : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  hm = lt(dm),
  fm = [9, 13, 27, 32],
  du = tn && "CompositionEvent" in window,
  us = null;
tn && "documentMode" in document && (us = document.documentMode);
var pm = tn && "TextEvent" in window && !us,
  Hh = tn && (!du || (us && 8 < us && 11 >= us)),
  dc = " ",
  hc = !1;
function Vh(t, e) {
  switch (t) {
    case "keyup":
      return fm.indexOf(e.keyCode) !== -1;
    case "keydown":
      return e.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Wh(t) {
  return ((t = t.detail), typeof t == "object" && "data" in t ? t.data : null);
}
var dr = !1;
function gm(t, e) {
  switch (t) {
    case "compositionend":
      return Wh(e);
    case "keypress":
      return e.which !== 32 ? null : ((hc = !0), dc);
    case "textInput":
      return ((t = e.data), t === dc && hc ? null : t);
    default:
      return null;
  }
}
function mm(t, e) {
  if (dr)
    return t === "compositionend" || (!du && Vh(t, e))
      ? ((t = zh()), (Li = lu = mn = null), (dr = !1), t)
      : null;
  switch (t) {
    case "paste":
      return null;
    case "keypress":
      if (!(e.ctrlKey || e.altKey || e.metaKey) || (e.ctrlKey && e.altKey)) {
        if (e.char && 1 < e.char.length) return e.char;
        if (e.which) return String.fromCharCode(e.which);
      }
      return null;
    case "compositionend":
      return Hh && e.locale !== "ko" ? null : e.data;
    default:
      return null;
  }
}
var ym = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function fc(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return e === "input" ? !!ym[t.type] : e === "textarea";
}
function Kh(t, e, n, r) {
  (Eh(r),
    (e = eo(e, "onChange")),
    0 < e.length &&
      ((n = new uu("onChange", "change", null, n, r)),
      t.push({ event: n, listeners: e })));
}
var cs = null,
  bs = null;
function vm(t) {
  rf(t, 0);
}
function Po(t) {
  var e = pr(t);
  if (mh(e)) return t;
}
function wm(t, e) {
  if (t === "change") return e;
}
var qh = !1;
if (tn) {
  var ia;
  if (tn) {
    var oa = "oninput" in document;
    if (!oa) {
      var pc = document.createElement("div");
      (pc.setAttribute("oninput", "return;"),
        (oa = typeof pc.oninput == "function"));
    }
    ia = oa;
  } else ia = !1;
  qh = ia && (!document.documentMode || 9 < document.documentMode);
}
function gc() {
  cs && (cs.detachEvent("onpropertychange", Gh), (bs = cs = null));
}
function Gh(t) {
  if (t.propertyName === "value" && Po(bs)) {
    var e = [];
    (Kh(e, bs, t, ru(t)), Rh(vm, e));
  }
}
function _m(t, e, n) {
  t === "focusin"
    ? (gc(), (cs = e), (bs = n), cs.attachEvent("onpropertychange", Gh))
    : t === "focusout" && gc();
}
function km(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown")
    return Po(bs);
}
function Sm(t, e) {
  if (t === "click") return Po(e);
}
function Em(t, e) {
  if (t === "input" || t === "change") return Po(e);
}
function bm(t, e) {
  return (t === e && (t !== 0 || 1 / t === 1 / e)) || (t !== t && e !== e);
}
var Nt = typeof Object.is == "function" ? Object.is : bm;
function Ts(t, e) {
  if (Nt(t, e)) return !0;
  if (typeof t != "object" || t === null || typeof e != "object" || e === null)
    return !1;
  var n = Object.keys(t),
    r = Object.keys(e);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var s = n[r];
    if (!Ua.call(e, s) || !Nt(t[s], e[s])) return !1;
  }
  return !0;
}
function mc(t) {
  for (; t && t.firstChild;) t = t.firstChild;
  return t;
}
function yc(t, e) {
  var n = mc(t);
  t = 0;
  for (var r; n;) {
    if (n.nodeType === 3) {
      if (((r = t + n.textContent.length), t <= e && r >= e))
        return { node: n, offset: e - t };
      t = r;
    }
    e: {
      for (; n;) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = mc(n);
  }
}
function Jh(t, e) {
  return t && e
    ? t === e
      ? !0
      : t && t.nodeType === 3
        ? !1
        : e && e.nodeType === 3
          ? Jh(t, e.parentNode)
          : "contains" in t
            ? t.contains(e)
            : t.compareDocumentPosition
              ? !!(t.compareDocumentPosition(e) & 16)
              : !1
    : !1;
}
function Qh() {
  for (var t = window, e = qi(); e instanceof t.HTMLIFrameElement;) {
    try {
      var n = typeof e.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) t = e.contentWindow;
    else break;
    e = qi(t.document);
  }
  return e;
}
function hu(t) {
  var e = t && t.nodeName && t.nodeName.toLowerCase();
  return (
    e &&
    ((e === "input" &&
      (t.type === "text" ||
        t.type === "search" ||
        t.type === "tel" ||
        t.type === "url" ||
        t.type === "password")) ||
      e === "textarea" ||
      t.contentEditable === "true")
  );
}
function Tm(t) {
  var e = Qh(),
    n = t.focusedElem,
    r = t.selectionRange;
  if (
    e !== n &&
    n &&
    n.ownerDocument &&
    Jh(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && hu(n)) {
      if (
        ((e = r.start),
        (t = r.end),
        t === void 0 && (t = e),
        "selectionStart" in n)
      )
        ((n.selectionStart = e),
          (n.selectionEnd = Math.min(t, n.value.length)));
      else if (
        ((t = ((e = n.ownerDocument || document) && e.defaultView) || window),
        t.getSelection)
      ) {
        t = t.getSelection();
        var s = n.textContent.length,
          i = Math.min(r.start, s);
        ((r = r.end === void 0 ? i : Math.min(r.end, s)),
          !t.extend && i > r && ((s = r), (r = i), (i = s)),
          (s = yc(n, i)));
        var o = yc(n, r);
        s &&
          o &&
          (t.rangeCount !== 1 ||
            t.anchorNode !== s.node ||
            t.anchorOffset !== s.offset ||
            t.focusNode !== o.node ||
            t.focusOffset !== o.offset) &&
          ((e = e.createRange()),
          e.setStart(s.node, s.offset),
          t.removeAllRanges(),
          i > r
            ? (t.addRange(e), t.extend(o.node, o.offset))
            : (e.setEnd(o.node, o.offset), t.addRange(e)));
      }
    }
    for (e = [], t = n; (t = t.parentNode);)
      t.nodeType === 1 &&
        e.push({ element: t, left: t.scrollLeft, top: t.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < e.length; n++)
      ((t = e[n]),
        (t.element.scrollLeft = t.left),
        (t.element.scrollTop = t.top));
  }
}
var Cm = tn && "documentMode" in document && 11 >= document.documentMode,
  hr = null,
  rl = null,
  ds = null,
  sl = !1;
function vc(t, e, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  sl ||
    hr == null ||
    hr !== qi(r) ||
    ((r = hr),
    "selectionStart" in r && hu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (ds && Ts(ds, r)) ||
      ((ds = r),
      (r = eo(rl, "onSelect")),
      0 < r.length &&
        ((e = new uu("onSelect", "select", null, e, n)),
        t.push({ event: e, listeners: r }),
        (e.target = hr))));
}
function di(t, e) {
  var n = {};
  return (
    (n[t.toLowerCase()] = e.toLowerCase()),
    (n["Webkit" + t] = "webkit" + e),
    (n["Moz" + t] = "moz" + e),
    n
  );
}
var fr = {
    animationend: di("Animation", "AnimationEnd"),
    animationiteration: di("Animation", "AnimationIteration"),
    animationstart: di("Animation", "AnimationStart"),
    transitionend: di("Transition", "TransitionEnd"),
  },
  aa = {},
  Yh = {};
tn &&
  ((Yh = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete fr.animationend.animation,
    delete fr.animationiteration.animation,
    delete fr.animationstart.animation),
  "TransitionEvent" in window || delete fr.transitionend.transition);
function No(t) {
  if (aa[t]) return aa[t];
  if (!fr[t]) return t;
  var e = fr[t],
    n;
  for (n in e) if (e.hasOwnProperty(n) && n in Yh) return (aa[t] = e[n]);
  return t;
}
var Xh = No("animationend"),
  Zh = No("animationiteration"),
  ef = No("animationstart"),
  tf = No("transitionend"),
  nf = new Map(),
  wc =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " ",
    );
function xn(t, e) {
  (nf.set(t, e), Jn(e, [t]));
}
for (var la = 0; la < wc.length; la++) {
  var ua = wc[la],
    Rm = ua.toLowerCase(),
    xm = ua[0].toUpperCase() + ua.slice(1);
  xn(Rm, "on" + xm);
}
xn(Xh, "onAnimationEnd");
xn(Zh, "onAnimationIteration");
xn(ef, "onAnimationStart");
xn("dblclick", "onDoubleClick");
xn("focusin", "onFocus");
xn("focusout", "onBlur");
xn(tf, "onTransitionEnd");
Pr("onMouseEnter", ["mouseout", "mouseover"]);
Pr("onMouseLeave", ["mouseout", "mouseover"]);
Pr("onPointerEnter", ["pointerout", "pointerover"]);
Pr("onPointerLeave", ["pointerout", "pointerover"]);
Jn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(
    " ",
  ),
);
Jn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " ",
  ),
);
Jn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Jn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" "),
);
Jn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" "),
);
Jn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
);
var ns =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " ",
    ),
  Am = new Set("cancel close invalid load scroll toggle".split(" ").concat(ns));
function _c(t, e, n) {
  var r = t.type || "unknown-event";
  ((t.currentTarget = n), Rg(r, e, void 0, t), (t.currentTarget = null));
}
function rf(t, e) {
  e = (e & 4) !== 0;
  for (var n = 0; n < t.length; n++) {
    var r = t[n],
      s = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (e)
        for (var o = r.length - 1; 0 <= o; o--) {
          var a = r[o],
            l = a.instance,
            u = a.currentTarget;
          if (((a = a.listener), l !== i && s.isPropagationStopped())) break e;
          (_c(s, a, u), (i = l));
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((a = r[o]),
            (l = a.instance),
            (u = a.currentTarget),
            (a = a.listener),
            l !== i && s.isPropagationStopped())
          )
            break e;
          (_c(s, a, u), (i = l));
        }
    }
  }
  if (Ji) throw ((t = Za), (Ji = !1), (Za = null), t);
}
function se(t, e) {
  var n = e[ul];
  n === void 0 && (n = e[ul] = new Set());
  var r = t + "__bubble";
  n.has(r) || (sf(e, t, 2, !1), n.add(r));
}
function ca(t, e, n) {
  var r = 0;
  (e && (r |= 4), sf(n, t, r, e));
}
var hi = "_reactListening" + Math.random().toString(36).slice(2);
function Cs(t) {
  if (!t[hi]) {
    ((t[hi] = !0),
      dh.forEach(function (n) {
        n !== "selectionchange" && (Am.has(n) || ca(n, !1, t), ca(n, !0, t));
      }));
    var e = t.nodeType === 9 ? t : t.ownerDocument;
    e === null || e[hi] || ((e[hi] = !0), ca("selectionchange", !1, e));
  }
}
function sf(t, e, n, r) {
  switch (Fh(e)) {
    case 1:
      var s = Hg;
      break;
    case 4:
      s = Vg;
      break;
    default:
      s = au;
  }
  ((n = s.bind(null, e, n, t)),
    (s = void 0),
    !Xa ||
      (e !== "touchstart" && e !== "touchmove" && e !== "wheel") ||
      (s = !0),
    r
      ? s !== void 0
        ? t.addEventListener(e, n, { capture: !0, passive: s })
        : t.addEventListener(e, n, !0)
      : s !== void 0
        ? t.addEventListener(e, n, { passive: s })
        : t.addEventListener(e, n, !1));
}
function da(t, e, n, r, s) {
  var i = r;
  if (!(e & 1) && !(e & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var a = r.stateNode.containerInfo;
        if (a === s || (a.nodeType === 8 && a.parentNode === s)) break;
        if (o === 4)
          for (o = r.return; o !== null;) {
            var l = o.tag;
            if (
              (l === 3 || l === 4) &&
              ((l = o.stateNode.containerInfo),
              l === s || (l.nodeType === 8 && l.parentNode === s))
            )
              return;
            o = o.return;
          }
        for (; a !== null;) {
          if (((o = Dn(a)), o === null)) return;
          if (((l = o.tag), l === 5 || l === 6)) {
            r = i = o;
            continue e;
          }
          a = a.parentNode;
        }
      }
      r = r.return;
    }
  Rh(function () {
    var u = i,
      d = ru(n),
      c = [];
    e: {
      var h = nf.get(t);
      if (h !== void 0) {
        var g = uu,
          y = t;
        switch (t) {
          case "keypress":
            if ($i(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = im;
            break;
          case "focusin":
            ((y = "focus"), (g = sa));
            break;
          case "focusout":
            ((y = "blur"), (g = sa));
            break;
          case "beforeblur":
          case "afterblur":
            g = sa;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = lc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = qg;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = lm;
            break;
          case Xh:
          case Zh:
          case ef:
            g = Qg;
            break;
          case tf:
            g = cm;
            break;
          case "scroll":
            g = Wg;
            break;
          case "wheel":
            g = hm;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Xg;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = cc;
        }
        var v = (e & 4) !== 0,
          k = !v && t === "scroll",
          p = v ? (h !== null ? h + "Capture" : null) : h;
        v = [];
        for (var f = u, m; f !== null;) {
          m = f;
          var S = m.stateNode;
          if (
            (m.tag === 5 &&
              S !== null &&
              ((m = S),
              p !== null && ((S = _s(f, p)), S != null && v.push(Rs(f, S, m)))),
            k)
          )
            break;
          f = f.return;
        }
        0 < v.length &&
          ((h = new g(h, y, null, n, d)), c.push({ event: h, listeners: v }));
      }
    }
    if (!(e & 7)) {
      e: {
        if (
          ((h = t === "mouseover" || t === "pointerover"),
          (g = t === "mouseout" || t === "pointerout"),
          h &&
            n !== Qa &&
            (y = n.relatedTarget || n.fromElement) &&
            (Dn(y) || y[nn]))
        )
          break e;
        if (
          (g || h) &&
          ((h =
            d.window === d
              ? d
              : (h = d.ownerDocument)
                ? h.defaultView || h.parentWindow
                : window),
          g
            ? ((y = n.relatedTarget || n.toElement),
              (g = u),
              (y = y ? Dn(y) : null),
              y !== null &&
                ((k = Qn(y)), y !== k || (y.tag !== 5 && y.tag !== 6)) &&
                (y = null))
            : ((g = null), (y = u)),
          g !== y)
        ) {
          if (
            ((v = lc),
            (S = "onMouseLeave"),
            (p = "onMouseEnter"),
            (f = "mouse"),
            (t === "pointerout" || t === "pointerover") &&
              ((v = cc),
              (S = "onPointerLeave"),
              (p = "onPointerEnter"),
              (f = "pointer")),
            (k = g == null ? h : pr(g)),
            (m = y == null ? h : pr(y)),
            (h = new v(S, f + "leave", g, n, d)),
            (h.target = k),
            (h.relatedTarget = m),
            (S = null),
            Dn(d) === u &&
              ((v = new v(p, f + "enter", y, n, d)),
              (v.target = m),
              (v.relatedTarget = k),
              (S = v)),
            (k = S),
            g && y)
          )
            t: {
              for (v = g, p = y, f = 0, m = v; m; m = nr(m)) f++;
              for (m = 0, S = p; S; S = nr(S)) m++;
              for (; 0 < f - m;) ((v = nr(v)), f--);
              for (; 0 < m - f;) ((p = nr(p)), m--);
              for (; f--;) {
                if (v === p || (p !== null && v === p.alternate)) break t;
                ((v = nr(v)), (p = nr(p)));
              }
              v = null;
            }
          else v = null;
          (g !== null && kc(c, h, g, v, !1),
            y !== null && k !== null && kc(c, k, y, v, !0));
        }
      }
      e: {
        if (
          ((h = u ? pr(u) : window),
          (g = h.nodeName && h.nodeName.toLowerCase()),
          g === "select" || (g === "input" && h.type === "file"))
        )
          var C = wm;
        else if (fc(h))
          if (qh) C = Em;
          else {
            C = km;
            var E = _m;
          }
        else
          (g = h.nodeName) &&
            g.toLowerCase() === "input" &&
            (h.type === "checkbox" || h.type === "radio") &&
            (C = Sm);
        if (C && (C = C(t, u))) {
          Kh(c, C, n, d);
          break e;
        }
        (E && E(t, h, u),
          t === "focusout" &&
            (E = h._wrapperState) &&
            E.controlled &&
            h.type === "number" &&
            Wa(h, "number", h.value));
      }
      switch (((E = u ? pr(u) : window), t)) {
        case "focusin":
          (fc(E) || E.contentEditable === "true") &&
            ((hr = E), (rl = u), (ds = null));
          break;
        case "focusout":
          ds = rl = hr = null;
          break;
        case "mousedown":
          sl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ((sl = !1), vc(c, n, d));
          break;
        case "selectionchange":
          if (Cm) break;
        case "keydown":
        case "keyup":
          vc(c, n, d);
      }
      var T;
      if (du)
        e: {
          switch (t) {
            case "compositionstart":
              var x = "onCompositionStart";
              break e;
            case "compositionend":
              x = "onCompositionEnd";
              break e;
            case "compositionupdate":
              x = "onCompositionUpdate";
              break e;
          }
          x = void 0;
        }
      else
        dr
          ? Vh(t, n) && (x = "onCompositionEnd")
          : t === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
      (x &&
        (Hh &&
          n.locale !== "ko" &&
          (dr || x !== "onCompositionStart"
            ? x === "onCompositionEnd" && dr && (T = zh())
            : ((mn = d),
              (lu = "value" in mn ? mn.value : mn.textContent),
              (dr = !0))),
        (E = eo(u, x)),
        0 < E.length &&
          ((x = new uc(x, t, null, n, d)),
          c.push({ event: x, listeners: E }),
          T ? (x.data = T) : ((T = Wh(n)), T !== null && (x.data = T)))),
        (T = pm ? gm(t, n) : mm(t, n)) &&
          ((u = eo(u, "onBeforeInput")),
          0 < u.length &&
            ((d = new uc("onBeforeInput", "beforeinput", null, n, d)),
            c.push({ event: d, listeners: u }),
            (d.data = T))));
    }
    rf(c, e);
  });
}
function Rs(t, e, n) {
  return { instance: t, listener: e, currentTarget: n };
}
function eo(t, e) {
  for (var n = e + "Capture", r = []; t !== null;) {
    var s = t,
      i = s.stateNode;
    (s.tag === 5 &&
      i !== null &&
      ((s = i),
      (i = _s(t, n)),
      i != null && r.unshift(Rs(t, i, s)),
      (i = _s(t, e)),
      i != null && r.push(Rs(t, i, s))),
      (t = t.return));
  }
  return r;
}
function nr(t) {
  if (t === null) return null;
  do t = t.return;
  while (t && t.tag !== 5);
  return t || null;
}
function kc(t, e, n, r, s) {
  for (var i = e._reactName, o = []; n !== null && n !== r;) {
    var a = n,
      l = a.alternate,
      u = a.stateNode;
    if (l !== null && l === r) break;
    (a.tag === 5 &&
      u !== null &&
      ((a = u),
      s
        ? ((l = _s(n, i)), l != null && o.unshift(Rs(n, l, a)))
        : s || ((l = _s(n, i)), l != null && o.push(Rs(n, l, a)))),
      (n = n.return));
  }
  o.length !== 0 && t.push({ event: e, listeners: o });
}
var Om = /\r\n?/g,
  Pm = /\u0000|\uFFFD/g;
function Sc(t) {
  return (typeof t == "string" ? t : "" + t)
    .replace(
      Om,
      `
`,
    )
    .replace(Pm, "");
}
function fi(t, e, n) {
  if (((e = Sc(e)), Sc(t) !== e && n)) throw Error(R(425));
}
function to() {}
var il = null,
  ol = null;
function al(t, e) {
  return (
    t === "textarea" ||
    t === "noscript" ||
    typeof e.children == "string" ||
    typeof e.children == "number" ||
    (typeof e.dangerouslySetInnerHTML == "object" &&
      e.dangerouslySetInnerHTML !== null &&
      e.dangerouslySetInnerHTML.__html != null)
  );
}
var ll = typeof setTimeout == "function" ? setTimeout : void 0,
  Nm = typeof clearTimeout == "function" ? clearTimeout : void 0,
  Ec = typeof Promise == "function" ? Promise : void 0,
  jm =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof Ec < "u"
        ? function (t) {
            return Ec.resolve(null).then(t).catch(Im);
          }
        : ll;
function Im(t) {
  setTimeout(function () {
    throw t;
  });
}
function ha(t, e) {
  var n = e,
    r = 0;
  do {
    var s = n.nextSibling;
    if ((t.removeChild(n), s && s.nodeType === 8))
      if (((n = s.data), n === "/$")) {
        if (r === 0) {
          (t.removeChild(s), Es(e));
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = s;
  } while (n);
  Es(e);
}
function kn(t) {
  for (; t != null; t = t.nextSibling) {
    var e = t.nodeType;
    if (e === 1 || e === 3) break;
    if (e === 8) {
      if (((e = t.data), e === "$" || e === "$!" || e === "$?")) break;
      if (e === "/$") return null;
    }
  }
  return t;
}
function bc(t) {
  t = t.previousSibling;
  for (var e = 0; t;) {
    if (t.nodeType === 8) {
      var n = t.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (e === 0) return t;
        e--;
      } else n === "/$" && e++;
    }
    t = t.previousSibling;
  }
  return null;
}
var Fr = Math.random().toString(36).slice(2),
  Dt = "__reactFiber$" + Fr,
  xs = "__reactProps$" + Fr,
  nn = "__reactContainer$" + Fr,
  ul = "__reactEvents$" + Fr,
  Lm = "__reactListeners$" + Fr,
  $m = "__reactHandles$" + Fr;
function Dn(t) {
  var e = t[Dt];
  if (e) return e;
  for (var n = t.parentNode; n;) {
    if ((e = n[nn] || n[Dt])) {
      if (
        ((n = e.alternate),
        e.child !== null || (n !== null && n.child !== null))
      )
        for (t = bc(t); t !== null;) {
          if ((n = t[Dt])) return n;
          t = bc(t);
        }
      return e;
    }
    ((t = n), (n = t.parentNode));
  }
  return null;
}
function Gs(t) {
  return (
    (t = t[Dt] || t[nn]),
    !t || (t.tag !== 5 && t.tag !== 6 && t.tag !== 13 && t.tag !== 3) ? null : t
  );
}
function pr(t) {
  if (t.tag === 5 || t.tag === 6) return t.stateNode;
  throw Error(R(33));
}
function jo(t) {
  return t[xs] || null;
}
var cl = [],
  gr = -1;
function An(t) {
  return { current: t };
}
function oe(t) {
  0 > gr || ((t.current = cl[gr]), (cl[gr] = null), gr--);
}
function ne(t, e) {
  (gr++, (cl[gr] = t.current), (t.current = e));
}
var Rn = {},
  ze = An(Rn),
  Xe = An(!1),
  Vn = Rn;
function Nr(t, e) {
  var n = t.type.contextTypes;
  if (!n) return Rn;
  var r = t.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === e)
    return r.__reactInternalMemoizedMaskedChildContext;
  var s = {},
    i;
  for (i in n) s[i] = e[i];
  return (
    r &&
      ((t = t.stateNode),
      (t.__reactInternalMemoizedUnmaskedChildContext = e),
      (t.__reactInternalMemoizedMaskedChildContext = s)),
    s
  );
}
function Ze(t) {
  return ((t = t.childContextTypes), t != null);
}
function no() {
  (oe(Xe), oe(ze));
}
function Tc(t, e, n) {
  if (ze.current !== Rn) throw Error(R(168));
  (ne(ze, e), ne(Xe, n));
}
function of(t, e, n) {
  var r = t.stateNode;
  if (((e = e.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var s in r) if (!(s in e)) throw Error(R(108, _g(t) || "Unknown", s));
  return de({}, n, r);
}
function ro(t) {
  return (
    (t =
      ((t = t.stateNode) && t.__reactInternalMemoizedMergedChildContext) || Rn),
    (Vn = ze.current),
    ne(ze, t),
    ne(Xe, Xe.current),
    !0
  );
}
function Cc(t, e, n) {
  var r = t.stateNode;
  if (!r) throw Error(R(169));
  (n
    ? ((t = of(t, e, Vn)),
      (r.__reactInternalMemoizedMergedChildContext = t),
      oe(Xe),
      oe(ze),
      ne(ze, t))
    : oe(Xe),
    ne(Xe, n));
}
var Qt = null,
  Io = !1,
  fa = !1;
function af(t) {
  Qt === null ? (Qt = [t]) : Qt.push(t);
}
function Dm(t) {
  ((Io = !0), af(t));
}
function On() {
  if (!fa && Qt !== null) {
    fa = !0;
    var t = 0,
      e = X;
    try {
      var n = Qt;
      for (X = 1; t < n.length; t++) {
        var r = n[t];
        do r = r(!0);
        while (r !== null);
      }
      ((Qt = null), (Io = !1));
    } catch (s) {
      throw (Qt !== null && (Qt = Qt.slice(t + 1)), Ph(su, On), s);
    } finally {
      ((X = e), (fa = !1));
    }
  }
  return null;
}
var mr = [],
  yr = 0,
  so = null,
  io = 0,
  ht = [],
  ft = 0,
  Wn = null,
  Xt = 1,
  Zt = "";
function Nn(t, e) {
  ((mr[yr++] = io), (mr[yr++] = so), (so = t), (io = e));
}
function lf(t, e, n) {
  ((ht[ft++] = Xt), (ht[ft++] = Zt), (ht[ft++] = Wn), (Wn = t));
  var r = Xt;
  t = Zt;
  var s = 32 - Ot(r) - 1;
  ((r &= ~(1 << s)), (n += 1));
  var i = 32 - Ot(e) + s;
  if (30 < i) {
    var o = s - (s % 5);
    ((i = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (s -= o),
      (Xt = (1 << (32 - Ot(e) + s)) | (n << s) | r),
      (Zt = i + t));
  } else ((Xt = (1 << i) | (n << s) | r), (Zt = t));
}
function fu(t) {
  t.return !== null && (Nn(t, 1), lf(t, 1, 0));
}
function pu(t) {
  for (; t === so;)
    ((so = mr[--yr]), (mr[yr] = null), (io = mr[--yr]), (mr[yr] = null));
  for (; t === Wn;)
    ((Wn = ht[--ft]),
      (ht[ft] = null),
      (Zt = ht[--ft]),
      (ht[ft] = null),
      (Xt = ht[--ft]),
      (ht[ft] = null));
}
var it = null,
  st = null,
  ae = !1,
  Rt = null;
function uf(t, e) {
  var n = pt(5, null, null, 0);
  ((n.elementType = "DELETED"),
    (n.stateNode = e),
    (n.return = t),
    (e = t.deletions),
    e === null ? ((t.deletions = [n]), (t.flags |= 16)) : e.push(n));
}
function Rc(t, e) {
  switch (t.tag) {
    case 5:
      var n = t.type;
      return (
        (e =
          e.nodeType !== 1 || n.toLowerCase() !== e.nodeName.toLowerCase()
            ? null
            : e),
        e !== null
          ? ((t.stateNode = e), (it = t), (st = kn(e.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (e = t.pendingProps === "" || e.nodeType !== 3 ? null : e),
        e !== null ? ((t.stateNode = e), (it = t), (st = null), !0) : !1
      );
    case 13:
      return (
        (e = e.nodeType !== 8 ? null : e),
        e !== null
          ? ((n = Wn !== null ? { id: Xt, overflow: Zt } : null),
            (t.memoizedState = {
              dehydrated: e,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = pt(18, null, null, 0)),
            (n.stateNode = e),
            (n.return = t),
            (t.child = n),
            (it = t),
            (st = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function dl(t) {
  return (t.mode & 1) !== 0 && (t.flags & 128) === 0;
}
function hl(t) {
  if (ae) {
    var e = st;
    if (e) {
      var n = e;
      if (!Rc(t, e)) {
        if (dl(t)) throw Error(R(418));
        e = kn(n.nextSibling);
        var r = it;
        e && Rc(t, e)
          ? uf(r, n)
          : ((t.flags = (t.flags & -4097) | 2), (ae = !1), (it = t));
      }
    } else {
      if (dl(t)) throw Error(R(418));
      ((t.flags = (t.flags & -4097) | 2), (ae = !1), (it = t));
    }
  }
}
function xc(t) {
  for (t = t.return; t !== null && t.tag !== 5 && t.tag !== 3 && t.tag !== 13;)
    t = t.return;
  it = t;
}
function pi(t) {
  if (t !== it) return !1;
  if (!ae) return (xc(t), (ae = !0), !1);
  var e;
  if (
    ((e = t.tag !== 3) &&
      !(e = t.tag !== 5) &&
      ((e = t.type),
      (e = e !== "head" && e !== "body" && !al(t.type, t.memoizedProps))),
    e && (e = st))
  ) {
    if (dl(t)) throw (cf(), Error(R(418)));
    for (; e;) (uf(t, e), (e = kn(e.nextSibling)));
  }
  if ((xc(t), t.tag === 13)) {
    if (((t = t.memoizedState), (t = t !== null ? t.dehydrated : null), !t))
      throw Error(R(317));
    e: {
      for (t = t.nextSibling, e = 0; t;) {
        if (t.nodeType === 8) {
          var n = t.data;
          if (n === "/$") {
            if (e === 0) {
              st = kn(t.nextSibling);
              break e;
            }
            e--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || e++;
        }
        t = t.nextSibling;
      }
      st = null;
    }
  } else st = it ? kn(t.stateNode.nextSibling) : null;
  return !0;
}
function cf() {
  for (var t = st; t;) t = kn(t.nextSibling);
}
function jr() {
  ((st = it = null), (ae = !1));
}
function gu(t) {
  Rt === null ? (Rt = [t]) : Rt.push(t);
}
var Um = on.ReactCurrentBatchConfig;
function Gr(t, e, n) {
  if (
    ((t = n.ref), t !== null && typeof t != "function" && typeof t != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(R(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(R(147, t));
      var s = r,
        i = "" + t;
      return e !== null &&
        e.ref !== null &&
        typeof e.ref == "function" &&
        e.ref._stringRef === i
        ? e.ref
        : ((e = function (o) {
            var a = s.refs;
            o === null ? delete a[i] : (a[i] = o);
          }),
          (e._stringRef = i),
          e);
    }
    if (typeof t != "string") throw Error(R(284));
    if (!n._owner) throw Error(R(290, t));
  }
  return t;
}
function gi(t, e) {
  throw (
    (t = Object.prototype.toString.call(e)),
    Error(
      R(
        31,
        t === "[object Object]"
          ? "object with keys {" + Object.keys(e).join(", ") + "}"
          : t,
      ),
    )
  );
}
function Ac(t) {
  var e = t._init;
  return e(t._payload);
}
function df(t) {
  function e(p, f) {
    if (t) {
      var m = p.deletions;
      m === null ? ((p.deletions = [f]), (p.flags |= 16)) : m.push(f);
    }
  }
  function n(p, f) {
    if (!t) return null;
    for (; f !== null;) (e(p, f), (f = f.sibling));
    return null;
  }
  function r(p, f) {
    for (p = new Map(); f !== null;)
      (f.key !== null ? p.set(f.key, f) : p.set(f.index, f), (f = f.sibling));
    return p;
  }
  function s(p, f) {
    return ((p = Tn(p, f)), (p.index = 0), (p.sibling = null), p);
  }
  function i(p, f, m) {
    return (
      (p.index = m),
      t
        ? ((m = p.alternate),
          m !== null
            ? ((m = m.index), m < f ? ((p.flags |= 2), f) : m)
            : ((p.flags |= 2), f))
        : ((p.flags |= 1048576), f)
    );
  }
  function o(p) {
    return (t && p.alternate === null && (p.flags |= 2), p);
  }
  function a(p, f, m, S) {
    return f === null || f.tag !== 6
      ? ((f = _a(m, p.mode, S)), (f.return = p), f)
      : ((f = s(f, m)), (f.return = p), f);
  }
  function l(p, f, m, S) {
    var C = m.type;
    return C === cr
      ? d(p, f, m.props.children, S, m.key)
      : f !== null &&
          (f.elementType === C ||
            (typeof C == "object" &&
              C !== null &&
              C.$$typeof === cn &&
              Ac(C) === f.type))
        ? ((S = s(f, m.props)), (S.ref = Gr(p, f, m)), (S.return = p), S)
        : ((S = Hi(m.type, m.key, m.props, null, p.mode, S)),
          (S.ref = Gr(p, f, m)),
          (S.return = p),
          S);
  }
  function u(p, f, m, S) {
    return f === null ||
      f.tag !== 4 ||
      f.stateNode.containerInfo !== m.containerInfo ||
      f.stateNode.implementation !== m.implementation
      ? ((f = ka(m, p.mode, S)), (f.return = p), f)
      : ((f = s(f, m.children || [])), (f.return = p), f);
  }
  function d(p, f, m, S, C) {
    return f === null || f.tag !== 7
      ? ((f = Hn(m, p.mode, S, C)), (f.return = p), f)
      : ((f = s(f, m)), (f.return = p), f);
  }
  function c(p, f, m) {
    if ((typeof f == "string" && f !== "") || typeof f == "number")
      return ((f = _a("" + f, p.mode, m)), (f.return = p), f);
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case si:
          return (
            (m = Hi(f.type, f.key, f.props, null, p.mode, m)),
            (m.ref = Gr(p, null, f)),
            (m.return = p),
            m
          );
        case ur:
          return ((f = ka(f, p.mode, m)), (f.return = p), f);
        case cn:
          var S = f._init;
          return c(p, S(f._payload), m);
      }
      if (es(f) || Hr(f))
        return ((f = Hn(f, p.mode, m, null)), (f.return = p), f);
      gi(p, f);
    }
    return null;
  }
  function h(p, f, m, S) {
    var C = f !== null ? f.key : null;
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return C !== null ? null : a(p, f, "" + m, S);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case si:
          return m.key === C ? l(p, f, m, S) : null;
        case ur:
          return m.key === C ? u(p, f, m, S) : null;
        case cn:
          return ((C = m._init), h(p, f, C(m._payload), S));
      }
      if (es(m) || Hr(m)) return C !== null ? null : d(p, f, m, S, null);
      gi(p, m);
    }
    return null;
  }
  function g(p, f, m, S, C) {
    if ((typeof S == "string" && S !== "") || typeof S == "number")
      return ((p = p.get(m) || null), a(f, p, "" + S, C));
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case si:
          return (
            (p = p.get(S.key === null ? m : S.key) || null),
            l(f, p, S, C)
          );
        case ur:
          return (
            (p = p.get(S.key === null ? m : S.key) || null),
            u(f, p, S, C)
          );
        case cn:
          var E = S._init;
          return g(p, f, m, E(S._payload), C);
      }
      if (es(S) || Hr(S)) return ((p = p.get(m) || null), d(f, p, S, C, null));
      gi(f, S);
    }
    return null;
  }
  function y(p, f, m, S) {
    for (
      var C = null, E = null, T = f, x = (f = 0), M = null;
      T !== null && x < m.length;
      x++
    ) {
      T.index > x ? ((M = T), (T = null)) : (M = T.sibling);
      var P = h(p, T, m[x], S);
      if (P === null) {
        T === null && (T = M);
        break;
      }
      (t && T && P.alternate === null && e(p, T),
        (f = i(P, f, x)),
        E === null ? (C = P) : (E.sibling = P),
        (E = P),
        (T = M));
    }
    if (x === m.length) return (n(p, T), ae && Nn(p, x), C);
    if (T === null) {
      for (; x < m.length; x++)
        ((T = c(p, m[x], S)),
          T !== null &&
            ((f = i(T, f, x)),
            E === null ? (C = T) : (E.sibling = T),
            (E = T)));
      return (ae && Nn(p, x), C);
    }
    for (T = r(p, T); x < m.length; x++)
      ((M = g(T, p, x, m[x], S)),
        M !== null &&
          (t && M.alternate !== null && T.delete(M.key === null ? x : M.key),
          (f = i(M, f, x)),
          E === null ? (C = M) : (E.sibling = M),
          (E = M)));
    return (
      t &&
        T.forEach(function (I) {
          return e(p, I);
        }),
      ae && Nn(p, x),
      C
    );
  }
  function v(p, f, m, S) {
    var C = Hr(m);
    if (typeof C != "function") throw Error(R(150));
    if (((m = C.call(m)), m == null)) throw Error(R(151));
    for (
      var E = (C = null), T = f, x = (f = 0), M = null, P = m.next();
      T !== null && !P.done;
      x++, P = m.next()
    ) {
      T.index > x ? ((M = T), (T = null)) : (M = T.sibling);
      var I = h(p, T, P.value, S);
      if (I === null) {
        T === null && (T = M);
        break;
      }
      (t && T && I.alternate === null && e(p, T),
        (f = i(I, f, x)),
        E === null ? (C = I) : (E.sibling = I),
        (E = I),
        (T = M));
    }
    if (P.done) return (n(p, T), ae && Nn(p, x), C);
    if (T === null) {
      for (; !P.done; x++, P = m.next())
        ((P = c(p, P.value, S)),
          P !== null &&
            ((f = i(P, f, x)),
            E === null ? (C = P) : (E.sibling = P),
            (E = P)));
      return (ae && Nn(p, x), C);
    }
    for (T = r(p, T); !P.done; x++, P = m.next())
      ((P = g(T, p, x, P.value, S)),
        P !== null &&
          (t && P.alternate !== null && T.delete(P.key === null ? x : P.key),
          (f = i(P, f, x)),
          E === null ? (C = P) : (E.sibling = P),
          (E = P)));
    return (
      t &&
        T.forEach(function (K) {
          return e(p, K);
        }),
      ae && Nn(p, x),
      C
    );
  }
  function k(p, f, m, S) {
    if (
      (typeof m == "object" &&
        m !== null &&
        m.type === cr &&
        m.key === null &&
        (m = m.props.children),
      typeof m == "object" && m !== null)
    ) {
      switch (m.$$typeof) {
        case si:
          e: {
            for (var C = m.key, E = f; E !== null;) {
              if (E.key === C) {
                if (((C = m.type), C === cr)) {
                  if (E.tag === 7) {
                    (n(p, E.sibling),
                      (f = s(E, m.props.children)),
                      (f.return = p),
                      (p = f));
                    break e;
                  }
                } else if (
                  E.elementType === C ||
                  (typeof C == "object" &&
                    C !== null &&
                    C.$$typeof === cn &&
                    Ac(C) === E.type)
                ) {
                  (n(p, E.sibling),
                    (f = s(E, m.props)),
                    (f.ref = Gr(p, E, m)),
                    (f.return = p),
                    (p = f));
                  break e;
                }
                n(p, E);
                break;
              } else e(p, E);
              E = E.sibling;
            }
            m.type === cr
              ? ((f = Hn(m.props.children, p.mode, S, m.key)),
                (f.return = p),
                (p = f))
              : ((S = Hi(m.type, m.key, m.props, null, p.mode, S)),
                (S.ref = Gr(p, f, m)),
                (S.return = p),
                (p = S));
          }
          return o(p);
        case ur:
          e: {
            for (E = m.key; f !== null;) {
              if (f.key === E)
                if (
                  f.tag === 4 &&
                  f.stateNode.containerInfo === m.containerInfo &&
                  f.stateNode.implementation === m.implementation
                ) {
                  (n(p, f.sibling),
                    (f = s(f, m.children || [])),
                    (f.return = p),
                    (p = f));
                  break e;
                } else {
                  n(p, f);
                  break;
                }
              else e(p, f);
              f = f.sibling;
            }
            ((f = ka(m, p.mode, S)), (f.return = p), (p = f));
          }
          return o(p);
        case cn:
          return ((E = m._init), k(p, f, E(m._payload), S));
      }
      if (es(m)) return y(p, f, m, S);
      if (Hr(m)) return v(p, f, m, S);
      gi(p, m);
    }
    return (typeof m == "string" && m !== "") || typeof m == "number"
      ? ((m = "" + m),
        f !== null && f.tag === 6
          ? (n(p, f.sibling), (f = s(f, m)), (f.return = p), (p = f))
          : (n(p, f), (f = _a(m, p.mode, S)), (f.return = p), (p = f)),
        o(p))
      : n(p, f);
  }
  return k;
}
var Ir = df(!0),
  hf = df(!1),
  oo = An(null),
  ao = null,
  vr = null,
  mu = null;
function yu() {
  mu = vr = ao = null;
}
function vu(t) {
  var e = oo.current;
  (oe(oo), (t._currentValue = e));
}
function fl(t, e, n) {
  for (; t !== null;) {
    var r = t.alternate;
    if (
      ((t.childLanes & e) !== e
        ? ((t.childLanes |= e), r !== null && (r.childLanes |= e))
        : r !== null && (r.childLanes & e) !== e && (r.childLanes |= e),
      t === n)
    )
      break;
    t = t.return;
  }
}
function Cr(t, e) {
  ((ao = t),
    (mu = vr = null),
    (t = t.dependencies),
    t !== null &&
      t.firstContext !== null &&
      (t.lanes & e && (Ye = !0), (t.firstContext = null)));
}
function mt(t) {
  var e = t._currentValue;
  if (mu !== t)
    if (((t = { context: t, memoizedValue: e, next: null }), vr === null)) {
      if (ao === null) throw Error(R(308));
      ((vr = t), (ao.dependencies = { lanes: 0, firstContext: t }));
    } else vr = vr.next = t;
  return e;
}
var Un = null;
function wu(t) {
  Un === null ? (Un = [t]) : Un.push(t);
}
function ff(t, e, n, r) {
  var s = e.interleaved;
  return (
    s === null ? ((n.next = n), wu(e)) : ((n.next = s.next), (s.next = n)),
    (e.interleaved = n),
    rn(t, r)
  );
}
function rn(t, e) {
  t.lanes |= e;
  var n = t.alternate;
  for (n !== null && (n.lanes |= e), n = t, t = t.return; t !== null;)
    ((t.childLanes |= e),
      (n = t.alternate),
      n !== null && (n.childLanes |= e),
      (n = t),
      (t = t.return));
  return n.tag === 3 ? n.stateNode : null;
}
var dn = !1;
function _u(t) {
  t.updateQueue = {
    baseState: t.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function pf(t, e) {
  ((t = t.updateQueue),
    e.updateQueue === t &&
      (e.updateQueue = {
        baseState: t.baseState,
        firstBaseUpdate: t.firstBaseUpdate,
        lastBaseUpdate: t.lastBaseUpdate,
        shared: t.shared,
        effects: t.effects,
      }));
}
function en(t, e) {
  return {
    eventTime: t,
    lane: e,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Sn(t, e, n) {
  var r = t.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), q & 2)) {
    var s = r.pending;
    return (
      s === null ? (e.next = e) : ((e.next = s.next), (s.next = e)),
      (r.pending = e),
      rn(t, n)
    );
  }
  return (
    (s = r.interleaved),
    s === null ? ((e.next = e), wu(r)) : ((e.next = s.next), (s.next = e)),
    (r.interleaved = e),
    rn(t, n)
  );
}
function Di(t, e, n) {
  if (
    ((e = e.updateQueue), e !== null && ((e = e.shared), (n & 4194240) !== 0))
  ) {
    var r = e.lanes;
    ((r &= t.pendingLanes), (n |= r), (e.lanes = n), iu(t, n));
  }
}
function Oc(t, e) {
  var n = t.updateQueue,
    r = t.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var s = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var o = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        (i === null ? (s = i = o) : (i = i.next = o), (n = n.next));
      } while (n !== null);
      i === null ? (s = i = e) : (i = i.next = e);
    } else s = i = e;
    ((n = {
      baseState: r.baseState,
      firstBaseUpdate: s,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (t.updateQueue = n));
    return;
  }
  ((t = n.lastBaseUpdate),
    t === null ? (n.firstBaseUpdate = e) : (t.next = e),
    (n.lastBaseUpdate = e));
}
function lo(t, e, n, r) {
  var s = t.updateQueue;
  dn = !1;
  var i = s.firstBaseUpdate,
    o = s.lastBaseUpdate,
    a = s.shared.pending;
  if (a !== null) {
    s.shared.pending = null;
    var l = a,
      u = l.next;
    ((l.next = null), o === null ? (i = u) : (o.next = u), (o = l));
    var d = t.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (a = d.lastBaseUpdate),
      a !== o &&
        (a === null ? (d.firstBaseUpdate = u) : (a.next = u),
        (d.lastBaseUpdate = l)));
  }
  if (i !== null) {
    var c = s.baseState;
    ((o = 0), (d = u = l = null), (a = i));
    do {
      var h = a.lane,
        g = a.eventTime;
      if ((r & h) === h) {
        d !== null &&
          (d = d.next =
            {
              eventTime: g,
              lane: 0,
              tag: a.tag,
              payload: a.payload,
              callback: a.callback,
              next: null,
            });
        e: {
          var y = t,
            v = a;
          switch (((h = e), (g = n), v.tag)) {
            case 1:
              if (((y = v.payload), typeof y == "function")) {
                c = y.call(g, c, h);
                break e;
              }
              c = y;
              break e;
            case 3:
              y.flags = (y.flags & -65537) | 128;
            case 0:
              if (
                ((y = v.payload),
                (h = typeof y == "function" ? y.call(g, c, h) : y),
                h == null)
              )
                break e;
              c = de({}, c, h);
              break e;
            case 2:
              dn = !0;
          }
        }
        a.callback !== null &&
          a.lane !== 0 &&
          ((t.flags |= 64),
          (h = s.effects),
          h === null ? (s.effects = [a]) : h.push(a));
      } else
        ((g = {
          eventTime: g,
          lane: h,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null,
        }),
          d === null ? ((u = d = g), (l = c)) : (d = d.next = g),
          (o |= h));
      if (((a = a.next), a === null)) {
        if (((a = s.shared.pending), a === null)) break;
        ((h = a),
          (a = h.next),
          (h.next = null),
          (s.lastBaseUpdate = h),
          (s.shared.pending = null));
      }
    } while (!0);
    if (
      (d === null && (l = c),
      (s.baseState = l),
      (s.firstBaseUpdate = u),
      (s.lastBaseUpdate = d),
      (e = s.shared.interleaved),
      e !== null)
    ) {
      s = e;
      do ((o |= s.lane), (s = s.next));
      while (s !== e);
    } else i === null && (s.shared.lanes = 0);
    ((qn |= o), (t.lanes = o), (t.memoizedState = c));
  }
}
function Pc(t, e, n) {
  if (((t = e.effects), (e.effects = null), t !== null))
    for (e = 0; e < t.length; e++) {
      var r = t[e],
        s = r.callback;
      if (s !== null) {
        if (((r.callback = null), (r = n), typeof s != "function"))
          throw Error(R(191, s));
        s.call(r);
      }
    }
}
var Js = {},
  Bt = An(Js),
  As = An(Js),
  Os = An(Js);
function Mn(t) {
  if (t === Js) throw Error(R(174));
  return t;
}
function ku(t, e) {
  switch ((ne(Os, e), ne(As, t), ne(Bt, Js), (t = e.nodeType), t)) {
    case 9:
    case 11:
      e = (e = e.documentElement) ? e.namespaceURI : qa(null, "");
      break;
    default:
      ((t = t === 8 ? e.parentNode : e),
        (e = t.namespaceURI || null),
        (t = t.tagName),
        (e = qa(e, t)));
  }
  (oe(Bt), ne(Bt, e));
}
function Lr() {
  (oe(Bt), oe(As), oe(Os));
}
function gf(t) {
  Mn(Os.current);
  var e = Mn(Bt.current),
    n = qa(e, t.type);
  e !== n && (ne(As, t), ne(Bt, n));
}
function Su(t) {
  As.current === t && (oe(Bt), oe(As));
}
var ue = An(0);
function uo(t) {
  for (var e = t; e !== null;) {
    if (e.tag === 13) {
      var n = e.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return e;
    } else if (e.tag === 19 && e.memoizedProps.revealOrder !== void 0) {
      if (e.flags & 128) return e;
    } else if (e.child !== null) {
      ((e.child.return = e), (e = e.child));
      continue;
    }
    if (e === t) break;
    for (; e.sibling === null;) {
      if (e.return === null || e.return === t) return null;
      e = e.return;
    }
    ((e.sibling.return = e.return), (e = e.sibling));
  }
  return null;
}
var pa = [];
function Eu() {
  for (var t = 0; t < pa.length; t++)
    pa[t]._workInProgressVersionPrimary = null;
  pa.length = 0;
}
var Ui = on.ReactCurrentDispatcher,
  ga = on.ReactCurrentBatchConfig,
  Kn = 0,
  ce = null,
  Se = null,
  xe = null,
  co = !1,
  hs = !1,
  Ps = 0,
  Mm = 0;
function Ue() {
  throw Error(R(321));
}
function bu(t, e) {
  if (e === null) return !1;
  for (var n = 0; n < e.length && n < t.length; n++)
    if (!Nt(t[n], e[n])) return !1;
  return !0;
}
function Tu(t, e, n, r, s, i) {
  if (
    ((Kn = i),
    (ce = e),
    (e.memoizedState = null),
    (e.updateQueue = null),
    (e.lanes = 0),
    (Ui.current = t === null || t.memoizedState === null ? Hm : Vm),
    (t = n(r, s)),
    hs)
  ) {
    i = 0;
    do {
      if (((hs = !1), (Ps = 0), 25 <= i)) throw Error(R(301));
      ((i += 1),
        (xe = Se = null),
        (e.updateQueue = null),
        (Ui.current = Wm),
        (t = n(r, s)));
    } while (hs);
  }
  if (
    ((Ui.current = ho),
    (e = Se !== null && Se.next !== null),
    (Kn = 0),
    (xe = Se = ce = null),
    (co = !1),
    e)
  )
    throw Error(R(300));
  return t;
}
function Cu() {
  var t = Ps !== 0;
  return ((Ps = 0), t);
}
function It() {
  var t = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return (xe === null ? (ce.memoizedState = xe = t) : (xe = xe.next = t), xe);
}
function yt() {
  if (Se === null) {
    var t = ce.alternate;
    t = t !== null ? t.memoizedState : null;
  } else t = Se.next;
  var e = xe === null ? ce.memoizedState : xe.next;
  if (e !== null) ((xe = e), (Se = t));
  else {
    if (t === null) throw Error(R(310));
    ((Se = t),
      (t = {
        memoizedState: Se.memoizedState,
        baseState: Se.baseState,
        baseQueue: Se.baseQueue,
        queue: Se.queue,
        next: null,
      }),
      xe === null ? (ce.memoizedState = xe = t) : (xe = xe.next = t));
  }
  return xe;
}
function Ns(t, e) {
  return typeof e == "function" ? e(t) : e;
}
function ma(t) {
  var e = yt(),
    n = e.queue;
  if (n === null) throw Error(R(311));
  n.lastRenderedReducer = t;
  var r = Se,
    s = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (s !== null) {
      var o = s.next;
      ((s.next = i.next), (i.next = o));
    }
    ((r.baseQueue = s = i), (n.pending = null));
  }
  if (s !== null) {
    ((i = s.next), (r = r.baseState));
    var a = (o = null),
      l = null,
      u = i;
    do {
      var d = u.lane;
      if ((Kn & d) === d)
        (l !== null &&
          (l = l.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : t(r, u.action)));
      else {
        var c = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        (l === null ? ((a = l = c), (o = r)) : (l = l.next = c),
          (ce.lanes |= d),
          (qn |= d));
      }
      u = u.next;
    } while (u !== null && u !== i);
    (l === null ? (o = r) : (l.next = a),
      Nt(r, e.memoizedState) || (Ye = !0),
      (e.memoizedState = r),
      (e.baseState = o),
      (e.baseQueue = l),
      (n.lastRenderedState = r));
  }
  if (((t = n.interleaved), t !== null)) {
    s = t;
    do ((i = s.lane), (ce.lanes |= i), (qn |= i), (s = s.next));
    while (s !== t);
  } else s === null && (n.lanes = 0);
  return [e.memoizedState, n.dispatch];
}
function ya(t) {
  var e = yt(),
    n = e.queue;
  if (n === null) throw Error(R(311));
  n.lastRenderedReducer = t;
  var r = n.dispatch,
    s = n.pending,
    i = e.memoizedState;
  if (s !== null) {
    n.pending = null;
    var o = (s = s.next);
    do ((i = t(i, o.action)), (o = o.next));
    while (o !== s);
    (Nt(i, e.memoizedState) || (Ye = !0),
      (e.memoizedState = i),
      e.baseQueue === null && (e.baseState = i),
      (n.lastRenderedState = i));
  }
  return [i, r];
}
function mf() {}
function yf(t, e) {
  var n = ce,
    r = yt(),
    s = e(),
    i = !Nt(r.memoizedState, s);
  if (
    (i && ((r.memoizedState = s), (Ye = !0)),
    (r = r.queue),
    Ru(_f.bind(null, n, r, t), [t]),
    r.getSnapshot !== e || i || (xe !== null && xe.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      js(9, wf.bind(null, n, r, s, e), void 0, null),
      Oe === null)
    )
      throw Error(R(349));
    Kn & 30 || vf(n, e, s);
  }
  return s;
}
function vf(t, e, n) {
  ((t.flags |= 16384),
    (t = { getSnapshot: e, value: n }),
    (e = ce.updateQueue),
    e === null
      ? ((e = { lastEffect: null, stores: null }),
        (ce.updateQueue = e),
        (e.stores = [t]))
      : ((n = e.stores), n === null ? (e.stores = [t]) : n.push(t)));
}
function wf(t, e, n, r) {
  ((e.value = n), (e.getSnapshot = r), kf(e) && Sf(t));
}
function _f(t, e, n) {
  return n(function () {
    kf(e) && Sf(t);
  });
}
function kf(t) {
  var e = t.getSnapshot;
  t = t.value;
  try {
    var n = e();
    return !Nt(t, n);
  } catch {
    return !0;
  }
}
function Sf(t) {
  var e = rn(t, 1);
  e !== null && Pt(e, t, 1, -1);
}
function Nc(t) {
  var e = It();
  return (
    typeof t == "function" && (t = t()),
    (e.memoizedState = e.baseState = t),
    (t = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ns,
      lastRenderedState: t,
    }),
    (e.queue = t),
    (t = t.dispatch = zm.bind(null, ce, t)),
    [e.memoizedState, t]
  );
}
function js(t, e, n, r) {
  return (
    (t = { tag: t, create: e, destroy: n, deps: r, next: null }),
    (e = ce.updateQueue),
    e === null
      ? ((e = { lastEffect: null, stores: null }),
        (ce.updateQueue = e),
        (e.lastEffect = t.next = t))
      : ((n = e.lastEffect),
        n === null
          ? (e.lastEffect = t.next = t)
          : ((r = n.next), (n.next = t), (t.next = r), (e.lastEffect = t))),
    t
  );
}
function Ef() {
  return yt().memoizedState;
}
function Mi(t, e, n, r) {
  var s = It();
  ((ce.flags |= t),
    (s.memoizedState = js(1 | e, n, void 0, r === void 0 ? null : r)));
}
function Lo(t, e, n, r) {
  var s = yt();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (Se !== null) {
    var o = Se.memoizedState;
    if (((i = o.destroy), r !== null && bu(r, o.deps))) {
      s.memoizedState = js(e, n, i, r);
      return;
    }
  }
  ((ce.flags |= t), (s.memoizedState = js(1 | e, n, i, r)));
}
function jc(t, e) {
  return Mi(8390656, 8, t, e);
}
function Ru(t, e) {
  return Lo(2048, 8, t, e);
}
function bf(t, e) {
  return Lo(4, 2, t, e);
}
function Tf(t, e) {
  return Lo(4, 4, t, e);
}
function Cf(t, e) {
  if (typeof e == "function")
    return (
      (t = t()),
      e(t),
      function () {
        e(null);
      }
    );
  if (e != null)
    return (
      (t = t()),
      (e.current = t),
      function () {
        e.current = null;
      }
    );
}
function Rf(t, e, n) {
  return (
    (n = n != null ? n.concat([t]) : null),
    Lo(4, 4, Cf.bind(null, e, t), n)
  );
}
function xu() {}
function xf(t, e) {
  var n = yt();
  e = e === void 0 ? null : e;
  var r = n.memoizedState;
  return r !== null && e !== null && bu(e, r[1])
    ? r[0]
    : ((n.memoizedState = [t, e]), t);
}
function Af(t, e) {
  var n = yt();
  e = e === void 0 ? null : e;
  var r = n.memoizedState;
  return r !== null && e !== null && bu(e, r[1])
    ? r[0]
    : ((t = t()), (n.memoizedState = [t, e]), t);
}
function Of(t, e, n) {
  return Kn & 21
    ? (Nt(n, e) || ((n = Ih()), (ce.lanes |= n), (qn |= n), (t.baseState = !0)),
      e)
    : (t.baseState && ((t.baseState = !1), (Ye = !0)), (t.memoizedState = n));
}
function Bm(t, e) {
  var n = X;
  ((X = n !== 0 && 4 > n ? n : 4), t(!0));
  var r = ga.transition;
  ga.transition = {};
  try {
    (t(!1), e());
  } finally {
    ((X = n), (ga.transition = r));
  }
}
function Pf() {
  return yt().memoizedState;
}
function Fm(t, e, n) {
  var r = bn(t);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Nf(t))
  )
    jf(e, n);
  else if (((n = ff(t, e, n, r)), n !== null)) {
    var s = Ve();
    (Pt(n, t, r, s), If(n, e, r));
  }
}
function zm(t, e, n) {
  var r = bn(t),
    s = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Nf(t)) jf(e, s);
  else {
    var i = t.alternate;
    if (
      t.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = e.lastRenderedReducer), i !== null)
    )
      try {
        var o = e.lastRenderedState,
          a = i(o, n);
        if (((s.hasEagerState = !0), (s.eagerState = a), Nt(a, o))) {
          var l = e.interleaved;
          (l === null
            ? ((s.next = s), wu(e))
            : ((s.next = l.next), (l.next = s)),
            (e.interleaved = s));
          return;
        }
      } catch {
      } finally {
      }
    ((n = ff(t, e, s, r)),
      n !== null && ((s = Ve()), Pt(n, t, r, s), If(n, e, r)));
  }
}
function Nf(t) {
  var e = t.alternate;
  return t === ce || (e !== null && e === ce);
}
function jf(t, e) {
  hs = co = !0;
  var n = t.pending;
  (n === null ? (e.next = e) : ((e.next = n.next), (n.next = e)),
    (t.pending = e));
}
function If(t, e, n) {
  if (n & 4194240) {
    var r = e.lanes;
    ((r &= t.pendingLanes), (n |= r), (e.lanes = n), iu(t, n));
  }
}
var ho = {
    readContext: mt,
    useCallback: Ue,
    useContext: Ue,
    useEffect: Ue,
    useImperativeHandle: Ue,
    useInsertionEffect: Ue,
    useLayoutEffect: Ue,
    useMemo: Ue,
    useReducer: Ue,
    useRef: Ue,
    useState: Ue,
    useDebugValue: Ue,
    useDeferredValue: Ue,
    useTransition: Ue,
    useMutableSource: Ue,
    useSyncExternalStore: Ue,
    useId: Ue,
    unstable_isNewReconciler: !1,
  },
  Hm = {
    readContext: mt,
    useCallback: function (t, e) {
      return ((It().memoizedState = [t, e === void 0 ? null : e]), t);
    },
    useContext: mt,
    useEffect: jc,
    useImperativeHandle: function (t, e, n) {
      return (
        (n = n != null ? n.concat([t]) : null),
        Mi(4194308, 4, Cf.bind(null, e, t), n)
      );
    },
    useLayoutEffect: function (t, e) {
      return Mi(4194308, 4, t, e);
    },
    useInsertionEffect: function (t, e) {
      return Mi(4, 2, t, e);
    },
    useMemo: function (t, e) {
      var n = It();
      return (
        (e = e === void 0 ? null : e),
        (t = t()),
        (n.memoizedState = [t, e]),
        t
      );
    },
    useReducer: function (t, e, n) {
      var r = It();
      return (
        (e = n !== void 0 ? n(e) : e),
        (r.memoizedState = r.baseState = e),
        (t = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: t,
          lastRenderedState: e,
        }),
        (r.queue = t),
        (t = t.dispatch = Fm.bind(null, ce, t)),
        [r.memoizedState, t]
      );
    },
    useRef: function (t) {
      var e = It();
      return ((t = { current: t }), (e.memoizedState = t));
    },
    useState: Nc,
    useDebugValue: xu,
    useDeferredValue: function (t) {
      return (It().memoizedState = t);
    },
    useTransition: function () {
      var t = Nc(!1),
        e = t[0];
      return ((t = Bm.bind(null, t[1])), (It().memoizedState = t), [e, t]);
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (t, e, n) {
      var r = ce,
        s = It();
      if (ae) {
        if (n === void 0) throw Error(R(407));
        n = n();
      } else {
        if (((n = e()), Oe === null)) throw Error(R(349));
        Kn & 30 || vf(r, e, n);
      }
      s.memoizedState = n;
      var i = { value: n, getSnapshot: e };
      return (
        (s.queue = i),
        jc(_f.bind(null, r, i, t), [t]),
        (r.flags |= 2048),
        js(9, wf.bind(null, r, i, n, e), void 0, null),
        n
      );
    },
    useId: function () {
      var t = It(),
        e = Oe.identifierPrefix;
      if (ae) {
        var n = Zt,
          r = Xt;
        ((n = (r & ~(1 << (32 - Ot(r) - 1))).toString(32) + n),
          (e = ":" + e + "R" + n),
          (n = Ps++),
          0 < n && (e += "H" + n.toString(32)),
          (e += ":"));
      } else ((n = Mm++), (e = ":" + e + "r" + n.toString(32) + ":"));
      return (t.memoizedState = e);
    },
    unstable_isNewReconciler: !1,
  },
  Vm = {
    readContext: mt,
    useCallback: xf,
    useContext: mt,
    useEffect: Ru,
    useImperativeHandle: Rf,
    useInsertionEffect: bf,
    useLayoutEffect: Tf,
    useMemo: Af,
    useReducer: ma,
    useRef: Ef,
    useState: function () {
      return ma(Ns);
    },
    useDebugValue: xu,
    useDeferredValue: function (t) {
      var e = yt();
      return Of(e, Se.memoizedState, t);
    },
    useTransition: function () {
      var t = ma(Ns)[0],
        e = yt().memoizedState;
      return [t, e];
    },
    useMutableSource: mf,
    useSyncExternalStore: yf,
    useId: Pf,
    unstable_isNewReconciler: !1,
  },
  Wm = {
    readContext: mt,
    useCallback: xf,
    useContext: mt,
    useEffect: Ru,
    useImperativeHandle: Rf,
    useInsertionEffect: bf,
    useLayoutEffect: Tf,
    useMemo: Af,
    useReducer: ya,
    useRef: Ef,
    useState: function () {
      return ya(Ns);
    },
    useDebugValue: xu,
    useDeferredValue: function (t) {
      var e = yt();
      return Se === null ? (e.memoizedState = t) : Of(e, Se.memoizedState, t);
    },
    useTransition: function () {
      var t = ya(Ns)[0],
        e = yt().memoizedState;
      return [t, e];
    },
    useMutableSource: mf,
    useSyncExternalStore: yf,
    useId: Pf,
    unstable_isNewReconciler: !1,
  };
function bt(t, e) {
  if (t && t.defaultProps) {
    ((e = de({}, e)), (t = t.defaultProps));
    for (var n in t) e[n] === void 0 && (e[n] = t[n]);
    return e;
  }
  return e;
}
function pl(t, e, n, r) {
  ((e = t.memoizedState),
    (n = n(r, e)),
    (n = n == null ? e : de({}, e, n)),
    (t.memoizedState = n),
    t.lanes === 0 && (t.updateQueue.baseState = n));
}
var $o = {
  isMounted: function (t) {
    return (t = t._reactInternals) ? Qn(t) === t : !1;
  },
  enqueueSetState: function (t, e, n) {
    t = t._reactInternals;
    var r = Ve(),
      s = bn(t),
      i = en(r, s);
    ((i.payload = e),
      n != null && (i.callback = n),
      (e = Sn(t, i, s)),
      e !== null && (Pt(e, t, s, r), Di(e, t, s)));
  },
  enqueueReplaceState: function (t, e, n) {
    t = t._reactInternals;
    var r = Ve(),
      s = bn(t),
      i = en(r, s);
    ((i.tag = 1),
      (i.payload = e),
      n != null && (i.callback = n),
      (e = Sn(t, i, s)),
      e !== null && (Pt(e, t, s, r), Di(e, t, s)));
  },
  enqueueForceUpdate: function (t, e) {
    t = t._reactInternals;
    var n = Ve(),
      r = bn(t),
      s = en(n, r);
    ((s.tag = 2),
      e != null && (s.callback = e),
      (e = Sn(t, s, r)),
      e !== null && (Pt(e, t, r, n), Di(e, t, r)));
  },
};
function Ic(t, e, n, r, s, i, o) {
  return (
    (t = t.stateNode),
    typeof t.shouldComponentUpdate == "function"
      ? t.shouldComponentUpdate(r, i, o)
      : e.prototype && e.prototype.isPureReactComponent
        ? !Ts(n, r) || !Ts(s, i)
        : !0
  );
}
function Lf(t, e, n) {
  var r = !1,
    s = Rn,
    i = e.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = mt(i))
      : ((s = Ze(e) ? Vn : ze.current),
        (r = e.contextTypes),
        (i = (r = r != null) ? Nr(t, s) : Rn)),
    (e = new e(n, i)),
    (t.memoizedState = e.state !== null && e.state !== void 0 ? e.state : null),
    (e.updater = $o),
    (t.stateNode = e),
    (e._reactInternals = t),
    r &&
      ((t = t.stateNode),
      (t.__reactInternalMemoizedUnmaskedChildContext = s),
      (t.__reactInternalMemoizedMaskedChildContext = i)),
    e
  );
}
function Lc(t, e, n, r) {
  ((t = e.state),
    typeof e.componentWillReceiveProps == "function" &&
      e.componentWillReceiveProps(n, r),
    typeof e.UNSAFE_componentWillReceiveProps == "function" &&
      e.UNSAFE_componentWillReceiveProps(n, r),
    e.state !== t && $o.enqueueReplaceState(e, e.state, null));
}
function gl(t, e, n, r) {
  var s = t.stateNode;
  ((s.props = n), (s.state = t.memoizedState), (s.refs = {}), _u(t));
  var i = e.contextType;
  (typeof i == "object" && i !== null
    ? (s.context = mt(i))
    : ((i = Ze(e) ? Vn : ze.current), (s.context = Nr(t, i))),
    (s.state = t.memoizedState),
    (i = e.getDerivedStateFromProps),
    typeof i == "function" && (pl(t, e, i, n), (s.state = t.memoizedState)),
    typeof e.getDerivedStateFromProps == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function" ||
      (typeof s.UNSAFE_componentWillMount != "function" &&
        typeof s.componentWillMount != "function") ||
      ((e = s.state),
      typeof s.componentWillMount == "function" && s.componentWillMount(),
      typeof s.UNSAFE_componentWillMount == "function" &&
        s.UNSAFE_componentWillMount(),
      e !== s.state && $o.enqueueReplaceState(s, s.state, null),
      lo(t, n, s, r),
      (s.state = t.memoizedState)),
    typeof s.componentDidMount == "function" && (t.flags |= 4194308));
}
function $r(t, e) {
  try {
    var n = "",
      r = e;
    do ((n += wg(r)), (r = r.return));
    while (r);
    var s = n;
  } catch (i) {
    s =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: t, source: e, stack: s, digest: null };
}
function va(t, e, n) {
  return { value: t, source: null, stack: n ?? null, digest: e ?? null };
}
function ml(t, e) {
  try {
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Km = typeof WeakMap == "function" ? WeakMap : Map;
function $f(t, e, n) {
  ((n = en(-1, n)), (n.tag = 3), (n.payload = { element: null }));
  var r = e.value;
  return (
    (n.callback = function () {
      (po || ((po = !0), (Cl = r)), ml(t, e));
    }),
    n
  );
}
function Df(t, e, n) {
  ((n = en(-1, n)), (n.tag = 3));
  var r = t.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var s = e.value;
    ((n.payload = function () {
      return r(s);
    }),
      (n.callback = function () {
        ml(t, e);
      }));
  }
  var i = t.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        (ml(t, e),
          typeof r != "function" &&
            (En === null ? (En = new Set([this])) : En.add(this)));
        var o = e.stack;
        this.componentDidCatch(e.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    n
  );
}
function $c(t, e, n) {
  var r = t.pingCache;
  if (r === null) {
    r = t.pingCache = new Km();
    var s = new Set();
    r.set(e, s);
  } else ((s = r.get(e)), s === void 0 && ((s = new Set()), r.set(e, s)));
  s.has(n) || (s.add(n), (t = oy.bind(null, t, e, n)), e.then(t, t));
}
function Dc(t) {
  do {
    var e;
    if (
      ((e = t.tag === 13) &&
        ((e = t.memoizedState), (e = e !== null ? e.dehydrated !== null : !0)),
      e)
    )
      return t;
    t = t.return;
  } while (t !== null);
  return null;
}
function Uc(t, e, n, r, s) {
  return t.mode & 1
    ? ((t.flags |= 65536), (t.lanes = s), t)
    : (t === e
        ? (t.flags |= 65536)
        : ((t.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((e = en(-1, 1)), (e.tag = 2), Sn(n, e, 1))),
          (n.lanes |= 1)),
      t);
}
var qm = on.ReactCurrentOwner,
  Ye = !1;
function He(t, e, n, r) {
  e.child = t === null ? hf(e, null, n, r) : Ir(e, t.child, n, r);
}
function Mc(t, e, n, r, s) {
  n = n.render;
  var i = e.ref;
  return (
    Cr(e, s),
    (r = Tu(t, e, n, r, i, s)),
    (n = Cu()),
    t !== null && !Ye
      ? ((e.updateQueue = t.updateQueue),
        (e.flags &= -2053),
        (t.lanes &= ~s),
        sn(t, e, s))
      : (ae && n && fu(e), (e.flags |= 1), He(t, e, r, s), e.child)
  );
}
function Bc(t, e, n, r, s) {
  if (t === null) {
    var i = n.type;
    return typeof i == "function" &&
      !$u(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((e.tag = 15), (e.type = i), Uf(t, e, i, r, s))
      : ((t = Hi(n.type, null, r, e, e.mode, s)),
        (t.ref = e.ref),
        (t.return = e),
        (e.child = t));
  }
  if (((i = t.child), !(t.lanes & s))) {
    var o = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Ts), n(o, r) && t.ref === e.ref)
    )
      return sn(t, e, s);
  }
  return (
    (e.flags |= 1),
    (t = Tn(i, r)),
    (t.ref = e.ref),
    (t.return = e),
    (e.child = t)
  );
}
function Uf(t, e, n, r, s) {
  if (t !== null) {
    var i = t.memoizedProps;
    if (Ts(i, r) && t.ref === e.ref)
      if (((Ye = !1), (e.pendingProps = r = i), (t.lanes & s) !== 0))
        t.flags & 131072 && (Ye = !0);
      else return ((e.lanes = t.lanes), sn(t, e, s));
  }
  return yl(t, e, n, r, s);
}
function Mf(t, e, n) {
  var r = e.pendingProps,
    s = r.children,
    i = t !== null ? t.memoizedState : null;
  if (r.mode === "hidden")
    if (!(e.mode & 1))
      ((e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        ne(_r, nt),
        (nt |= n));
    else {
      if (!(n & 1073741824))
        return (
          (t = i !== null ? i.baseLanes | n : n),
          (e.lanes = e.childLanes = 1073741824),
          (e.memoizedState = {
            baseLanes: t,
            cachePool: null,
            transitions: null,
          }),
          (e.updateQueue = null),
          ne(_r, nt),
          (nt |= t),
          null
        );
      ((e.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        ne(_r, nt),
        (nt |= r));
    }
  else
    (i !== null ? ((r = i.baseLanes | n), (e.memoizedState = null)) : (r = n),
      ne(_r, nt),
      (nt |= r));
  return (He(t, e, s, n), e.child);
}
function Bf(t, e) {
  var n = e.ref;
  ((t === null && n !== null) || (t !== null && t.ref !== n)) &&
    ((e.flags |= 512), (e.flags |= 2097152));
}
function yl(t, e, n, r, s) {
  var i = Ze(n) ? Vn : ze.current;
  return (
    (i = Nr(e, i)),
    Cr(e, s),
    (n = Tu(t, e, n, r, i, s)),
    (r = Cu()),
    t !== null && !Ye
      ? ((e.updateQueue = t.updateQueue),
        (e.flags &= -2053),
        (t.lanes &= ~s),
        sn(t, e, s))
      : (ae && r && fu(e), (e.flags |= 1), He(t, e, n, s), e.child)
  );
}
function Fc(t, e, n, r, s) {
  if (Ze(n)) {
    var i = !0;
    ro(e);
  } else i = !1;
  if ((Cr(e, s), e.stateNode === null))
    (Bi(t, e), Lf(e, n, r), gl(e, n, r, s), (r = !0));
  else if (t === null) {
    var o = e.stateNode,
      a = e.memoizedProps;
    o.props = a;
    var l = o.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = mt(u))
      : ((u = Ze(n) ? Vn : ze.current), (u = Nr(e, u)));
    var d = n.getDerivedStateFromProps,
      c =
        typeof d == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    (c ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== r || l !== u) && Lc(e, o, r, u)),
      (dn = !1));
    var h = e.memoizedState;
    ((o.state = h),
      lo(e, r, o, s),
      (l = e.memoizedState),
      a !== r || h !== l || Xe.current || dn
        ? (typeof d == "function" && (pl(e, n, d, r), (l = e.memoizedState)),
          (a = dn || Ic(e, n, a, r, h, l, u))
            ? (c ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (e.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (e.flags |= 4194308),
              (e.memoizedProps = r),
              (e.memoizedState = l)),
          (o.props = r),
          (o.state = l),
          (o.context = u),
          (r = a))
        : (typeof o.componentDidMount == "function" && (e.flags |= 4194308),
          (r = !1)));
  } else {
    ((o = e.stateNode),
      pf(t, e),
      (a = e.memoizedProps),
      (u = e.type === e.elementType ? a : bt(e.type, a)),
      (o.props = u),
      (c = e.pendingProps),
      (h = o.context),
      (l = n.contextType),
      typeof l == "object" && l !== null
        ? (l = mt(l))
        : ((l = Ze(n) ? Vn : ze.current), (l = Nr(e, l))));
    var g = n.getDerivedStateFromProps;
    ((d =
      typeof g == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((a !== c || h !== l) && Lc(e, o, r, l)),
      (dn = !1),
      (h = e.memoizedState),
      (o.state = h),
      lo(e, r, o, s));
    var y = e.memoizedState;
    a !== c || h !== y || Xe.current || dn
      ? (typeof g == "function" && (pl(e, n, g, r), (y = e.memoizedState)),
        (u = dn || Ic(e, n, u, r, h, y, l) || !1)
          ? (d ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, y, l),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, y, l)),
            typeof o.componentDidUpdate == "function" && (e.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (a === t.memoizedProps && h === t.memoizedState) ||
              (e.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (a === t.memoizedProps && h === t.memoizedState) ||
              (e.flags |= 1024),
            (e.memoizedProps = r),
            (e.memoizedState = y)),
        (o.props = r),
        (o.state = y),
        (o.context = l),
        (r = u))
      : (typeof o.componentDidUpdate != "function" ||
          (a === t.memoizedProps && h === t.memoizedState) ||
          (e.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (a === t.memoizedProps && h === t.memoizedState) ||
          (e.flags |= 1024),
        (r = !1));
  }
  return vl(t, e, n, r, i, s);
}
function vl(t, e, n, r, s, i) {
  Bf(t, e);
  var o = (e.flags & 128) !== 0;
  if (!r && !o) return (s && Cc(e, n, !1), sn(t, e, i));
  ((r = e.stateNode), (qm.current = e));
  var a =
    o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (e.flags |= 1),
    t !== null && o
      ? ((e.child = Ir(e, t.child, null, i)), (e.child = Ir(e, null, a, i)))
      : He(t, e, a, i),
    (e.memoizedState = r.state),
    s && Cc(e, n, !0),
    e.child
  );
}
function Ff(t) {
  var e = t.stateNode;
  (e.pendingContext
    ? Tc(t, e.pendingContext, e.pendingContext !== e.context)
    : e.context && Tc(t, e.context, !1),
    ku(t, e.containerInfo));
}
function zc(t, e, n, r, s) {
  return (jr(), gu(s), (e.flags |= 256), He(t, e, n, r), e.child);
}
var wl = { dehydrated: null, treeContext: null, retryLane: 0 };
function _l(t) {
  return { baseLanes: t, cachePool: null, transitions: null };
}
function zf(t, e, n) {
  var r = e.pendingProps,
    s = ue.current,
    i = !1,
    o = (e.flags & 128) !== 0,
    a;
  if (
    ((a = o) ||
      (a = t !== null && t.memoizedState === null ? !1 : (s & 2) !== 0),
    a
      ? ((i = !0), (e.flags &= -129))
      : (t === null || t.memoizedState !== null) && (s |= 1),
    ne(ue, s & 1),
    t === null)
  )
    return (
      hl(e),
      (t = e.memoizedState),
      t !== null && ((t = t.dehydrated), t !== null)
        ? (e.mode & 1
            ? t.data === "$!"
              ? (e.lanes = 8)
              : (e.lanes = 1073741824)
            : (e.lanes = 1),
          null)
        : ((o = r.children),
          (t = r.fallback),
          i
            ? ((r = e.mode),
              (i = e.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = o))
                : (i = Mo(o, r, 0, null)),
              (t = Hn(t, r, n, null)),
              (i.return = e),
              (t.return = e),
              (i.sibling = t),
              (e.child = i),
              (e.child.memoizedState = _l(n)),
              (e.memoizedState = wl),
              t)
            : Au(e, o))
    );
  if (((s = t.memoizedState), s !== null && ((a = s.dehydrated), a !== null)))
    return Gm(t, e, o, r, a, s, n);
  if (i) {
    ((i = r.fallback), (o = e.mode), (s = t.child), (a = s.sibling));
    var l = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && e.child !== s
        ? ((r = e.child),
          (r.childLanes = 0),
          (r.pendingProps = l),
          (e.deletions = null))
        : ((r = Tn(s, l)), (r.subtreeFlags = s.subtreeFlags & 14680064)),
      a !== null ? (i = Tn(a, i)) : ((i = Hn(i, o, n, null)), (i.flags |= 2)),
      (i.return = e),
      (r.return = e),
      (r.sibling = i),
      (e.child = r),
      (r = i),
      (i = e.child),
      (o = t.child.memoizedState),
      (o =
        o === null
          ? _l(n)
          : {
              baseLanes: o.baseLanes | n,
              cachePool: null,
              transitions: o.transitions,
            }),
      (i.memoizedState = o),
      (i.childLanes = t.childLanes & ~n),
      (e.memoizedState = wl),
      r
    );
  }
  return (
    (i = t.child),
    (t = i.sibling),
    (r = Tn(i, { mode: "visible", children: r.children })),
    !(e.mode & 1) && (r.lanes = n),
    (r.return = e),
    (r.sibling = null),
    t !== null &&
      ((n = e.deletions),
      n === null ? ((e.deletions = [t]), (e.flags |= 16)) : n.push(t)),
    (e.child = r),
    (e.memoizedState = null),
    r
  );
}
function Au(t, e) {
  return (
    (e = Mo({ mode: "visible", children: e }, t.mode, 0, null)),
    (e.return = t),
    (t.child = e)
  );
}
function mi(t, e, n, r) {
  return (
    r !== null && gu(r),
    Ir(e, t.child, null, n),
    (t = Au(e, e.pendingProps.children)),
    (t.flags |= 2),
    (e.memoizedState = null),
    t
  );
}
function Gm(t, e, n, r, s, i, o) {
  if (n)
    return e.flags & 256
      ? ((e.flags &= -257), (r = va(Error(R(422)))), mi(t, e, o, r))
      : e.memoizedState !== null
        ? ((e.child = t.child), (e.flags |= 128), null)
        : ((i = r.fallback),
          (s = e.mode),
          (r = Mo({ mode: "visible", children: r.children }, s, 0, null)),
          (i = Hn(i, s, o, null)),
          (i.flags |= 2),
          (r.return = e),
          (i.return = e),
          (r.sibling = i),
          (e.child = r),
          e.mode & 1 && Ir(e, t.child, null, o),
          (e.child.memoizedState = _l(o)),
          (e.memoizedState = wl),
          i);
  if (!(e.mode & 1)) return mi(t, e, o, null);
  if (s.data === "$!") {
    if (((r = s.nextSibling && s.nextSibling.dataset), r)) var a = r.dgst;
    return (
      (r = a),
      (i = Error(R(419))),
      (r = va(i, r, void 0)),
      mi(t, e, o, r)
    );
  }
  if (((a = (o & t.childLanes) !== 0), Ye || a)) {
    if (((r = Oe), r !== null)) {
      switch (o & -o) {
        case 4:
          s = 2;
          break;
        case 16:
          s = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          s = 32;
          break;
        case 536870912:
          s = 268435456;
          break;
        default:
          s = 0;
      }
      ((s = s & (r.suspendedLanes | o) ? 0 : s),
        s !== 0 &&
          s !== i.retryLane &&
          ((i.retryLane = s), rn(t, s), Pt(r, t, s, -1)));
    }
    return (Lu(), (r = va(Error(R(421)))), mi(t, e, o, r));
  }
  return s.data === "$?"
    ? ((e.flags |= 128),
      (e.child = t.child),
      (e = ay.bind(null, t)),
      (s._reactRetry = e),
      null)
    : ((t = i.treeContext),
      (st = kn(s.nextSibling)),
      (it = e),
      (ae = !0),
      (Rt = null),
      t !== null &&
        ((ht[ft++] = Xt),
        (ht[ft++] = Zt),
        (ht[ft++] = Wn),
        (Xt = t.id),
        (Zt = t.overflow),
        (Wn = e)),
      (e = Au(e, r.children)),
      (e.flags |= 4096),
      e);
}
function Hc(t, e, n) {
  t.lanes |= e;
  var r = t.alternate;
  (r !== null && (r.lanes |= e), fl(t.return, e, n));
}
function wa(t, e, n, r, s) {
  var i = t.memoizedState;
  i === null
    ? (t.memoizedState = {
        isBackwards: e,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: s,
      })
    : ((i.isBackwards = e),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = s));
}
function Hf(t, e, n) {
  var r = e.pendingProps,
    s = r.revealOrder,
    i = r.tail;
  if ((He(t, e, r.children, n), (r = ue.current), r & 2))
    ((r = (r & 1) | 2), (e.flags |= 128));
  else {
    if (t !== null && t.flags & 128)
      e: for (t = e.child; t !== null;) {
        if (t.tag === 13) t.memoizedState !== null && Hc(t, n, e);
        else if (t.tag === 19) Hc(t, n, e);
        else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break e;
        for (; t.sibling === null;) {
          if (t.return === null || t.return === e) break e;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    r &= 1;
  }
  if ((ne(ue, r), !(e.mode & 1))) e.memoizedState = null;
  else
    switch (s) {
      case "forwards":
        for (n = e.child, s = null; n !== null;)
          ((t = n.alternate),
            t !== null && uo(t) === null && (s = n),
            (n = n.sibling));
        ((n = s),
          n === null
            ? ((s = e.child), (e.child = null))
            : ((s = n.sibling), (n.sibling = null)),
          wa(e, !1, s, n, i));
        break;
      case "backwards":
        for (n = null, s = e.child, e.child = null; s !== null;) {
          if (((t = s.alternate), t !== null && uo(t) === null)) {
            e.child = s;
            break;
          }
          ((t = s.sibling), (s.sibling = n), (n = s), (s = t));
        }
        wa(e, !0, n, null, i);
        break;
      case "together":
        wa(e, !1, null, null, void 0);
        break;
      default:
        e.memoizedState = null;
    }
  return e.child;
}
function Bi(t, e) {
  !(e.mode & 1) &&
    t !== null &&
    ((t.alternate = null), (e.alternate = null), (e.flags |= 2));
}
function sn(t, e, n) {
  if (
    (t !== null && (e.dependencies = t.dependencies),
    (qn |= e.lanes),
    !(n & e.childLanes))
  )
    return null;
  if (t !== null && e.child !== t.child) throw Error(R(153));
  if (e.child !== null) {
    for (
      t = e.child, n = Tn(t, t.pendingProps), e.child = n, n.return = e;
      t.sibling !== null;
    )
      ((t = t.sibling),
        (n = n.sibling = Tn(t, t.pendingProps)),
        (n.return = e));
    n.sibling = null;
  }
  return e.child;
}
function Jm(t, e, n) {
  switch (e.tag) {
    case 3:
      (Ff(e), jr());
      break;
    case 5:
      gf(e);
      break;
    case 1:
      Ze(e.type) && ro(e);
      break;
    case 4:
      ku(e, e.stateNode.containerInfo);
      break;
    case 10:
      var r = e.type._context,
        s = e.memoizedProps.value;
      (ne(oo, r._currentValue), (r._currentValue = s));
      break;
    case 13:
      if (((r = e.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (ne(ue, ue.current & 1), (e.flags |= 128), null)
          : n & e.child.childLanes
            ? zf(t, e, n)
            : (ne(ue, ue.current & 1),
              (t = sn(t, e, n)),
              t !== null ? t.sibling : null);
      ne(ue, ue.current & 1);
      break;
    case 19:
      if (((r = (n & e.childLanes) !== 0), t.flags & 128)) {
        if (r) return Hf(t, e, n);
        e.flags |= 128;
      }
      if (
        ((s = e.memoizedState),
        s !== null &&
          ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
        ne(ue, ue.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return ((e.lanes = 0), Mf(t, e, n));
  }
  return sn(t, e, n);
}
var Vf, kl, Wf, Kf;
Vf = function (t, e) {
  for (var n = e.child; n !== null;) {
    if (n.tag === 5 || n.tag === 6) t.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      ((n.child.return = n), (n = n.child));
      continue;
    }
    if (n === e) break;
    for (; n.sibling === null;) {
      if (n.return === null || n.return === e) return;
      n = n.return;
    }
    ((n.sibling.return = n.return), (n = n.sibling));
  }
};
kl = function () {};
Wf = function (t, e, n, r) {
  var s = t.memoizedProps;
  if (s !== r) {
    ((t = e.stateNode), Mn(Bt.current));
    var i = null;
    switch (n) {
      case "input":
        ((s = Ha(t, s)), (r = Ha(t, r)), (i = []));
        break;
      case "select":
        ((s = de({}, s, { value: void 0 })),
          (r = de({}, r, { value: void 0 })),
          (i = []));
        break;
      case "textarea":
        ((s = Ka(t, s)), (r = Ka(t, r)), (i = []));
        break;
      default:
        typeof s.onClick != "function" &&
          typeof r.onClick == "function" &&
          (t.onclick = to);
    }
    Ga(n, r);
    var o;
    n = null;
    for (u in s)
      if (!r.hasOwnProperty(u) && s.hasOwnProperty(u) && s[u] != null)
        if (u === "style") {
          var a = s[u];
          for (o in a) a.hasOwnProperty(o) && (n || (n = {}), (n[o] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            (vs.hasOwnProperty(u)
              ? i || (i = [])
              : (i = i || []).push(u, null));
    for (u in r) {
      var l = r[u];
      if (
        ((a = s != null ? s[u] : void 0),
        r.hasOwnProperty(u) && l !== a && (l != null || a != null))
      )
        if (u === "style")
          if (a) {
            for (o in a)
              !a.hasOwnProperty(o) ||
                (l && l.hasOwnProperty(o)) ||
                (n || (n = {}), (n[o] = ""));
            for (o in l)
              l.hasOwnProperty(o) &&
                a[o] !== l[o] &&
                (n || (n = {}), (n[o] = l[o]));
          } else (n || (i || (i = []), i.push(u, n)), (n = l));
        else
          u === "dangerouslySetInnerHTML"
            ? ((l = l ? l.__html : void 0),
              (a = a ? a.__html : void 0),
              l != null && a !== l && (i = i || []).push(u, l))
            : u === "children"
              ? (typeof l != "string" && typeof l != "number") ||
                (i = i || []).push(u, "" + l)
              : u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                (vs.hasOwnProperty(u)
                  ? (l != null && u === "onScroll" && se("scroll", t),
                    i || a === l || (i = []))
                  : (i = i || []).push(u, l));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (e.updateQueue = u) && (e.flags |= 4);
  }
};
Kf = function (t, e, n, r) {
  n !== r && (e.flags |= 4);
};
function Jr(t, e) {
  if (!ae)
    switch (t.tailMode) {
      case "hidden":
        e = t.tail;
        for (var n = null; e !== null;)
          (e.alternate !== null && (n = e), (e = e.sibling));
        n === null ? (t.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = t.tail;
        for (var r = null; n !== null;)
          (n.alternate !== null && (r = n), (n = n.sibling));
        r === null
          ? e || t.tail === null
            ? (t.tail = null)
            : (t.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Me(t) {
  var e = t.alternate !== null && t.alternate.child === t.child,
    n = 0,
    r = 0;
  if (e)
    for (var s = t.child; s !== null;)
      ((n |= s.lanes | s.childLanes),
        (r |= s.subtreeFlags & 14680064),
        (r |= s.flags & 14680064),
        (s.return = t),
        (s = s.sibling));
  else
    for (s = t.child; s !== null;)
      ((n |= s.lanes | s.childLanes),
        (r |= s.subtreeFlags),
        (r |= s.flags),
        (s.return = t),
        (s = s.sibling));
  return ((t.subtreeFlags |= r), (t.childLanes = n), e);
}
function Qm(t, e, n) {
  var r = e.pendingProps;
  switch ((pu(e), e.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return (Me(e), null);
    case 1:
      return (Ze(e.type) && no(), Me(e), null);
    case 3:
      return (
        (r = e.stateNode),
        Lr(),
        oe(Xe),
        oe(ze),
        Eu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (t === null || t.child === null) &&
          (pi(e)
            ? (e.flags |= 4)
            : t === null ||
              (t.memoizedState.isDehydrated && !(e.flags & 256)) ||
              ((e.flags |= 1024), Rt !== null && (Al(Rt), (Rt = null)))),
        kl(t, e),
        Me(e),
        null
      );
    case 5:
      Su(e);
      var s = Mn(Os.current);
      if (((n = e.type), t !== null && e.stateNode != null))
        (Wf(t, e, n, r, s),
          t.ref !== e.ref && ((e.flags |= 512), (e.flags |= 2097152)));
      else {
        if (!r) {
          if (e.stateNode === null) throw Error(R(166));
          return (Me(e), null);
        }
        if (((t = Mn(Bt.current)), pi(e))) {
          ((r = e.stateNode), (n = e.type));
          var i = e.memoizedProps;
          switch (((r[Dt] = e), (r[xs] = i), (t = (e.mode & 1) !== 0), n)) {
            case "dialog":
              (se("cancel", r), se("close", r));
              break;
            case "iframe":
            case "object":
            case "embed":
              se("load", r);
              break;
            case "video":
            case "audio":
              for (s = 0; s < ns.length; s++) se(ns[s], r);
              break;
            case "source":
              se("error", r);
              break;
            case "img":
            case "image":
            case "link":
              (se("error", r), se("load", r));
              break;
            case "details":
              se("toggle", r);
              break;
            case "input":
              (Xu(r, i), se("invalid", r));
              break;
            case "select":
              ((r._wrapperState = { wasMultiple: !!i.multiple }),
                se("invalid", r));
              break;
            case "textarea":
              (ec(r, i), se("invalid", r));
          }
          (Ga(n, i), (s = null));
          for (var o in i)
            if (i.hasOwnProperty(o)) {
              var a = i[o];
              o === "children"
                ? typeof a == "string"
                  ? r.textContent !== a &&
                    (i.suppressHydrationWarning !== !0 &&
                      fi(r.textContent, a, t),
                    (s = ["children", a]))
                  : typeof a == "number" &&
                    r.textContent !== "" + a &&
                    (i.suppressHydrationWarning !== !0 &&
                      fi(r.textContent, a, t),
                    (s = ["children", "" + a]))
                : vs.hasOwnProperty(o) &&
                  a != null &&
                  o === "onScroll" &&
                  se("scroll", r);
            }
          switch (n) {
            case "input":
              (ii(r), Zu(r, i, !0));
              break;
            case "textarea":
              (ii(r), tc(r));
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = to);
          }
          ((r = s), (e.updateQueue = r), r !== null && (e.flags |= 4));
        } else {
          ((o = s.nodeType === 9 ? s : s.ownerDocument),
            t === "http://www.w3.org/1999/xhtml" && (t = wh(n)),
            t === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((t = o.createElement("div")),
                  (t.innerHTML = "<script><\/script>"),
                  (t = t.removeChild(t.firstChild)))
                : typeof r.is == "string"
                  ? (t = o.createElement(n, { is: r.is }))
                  : ((t = o.createElement(n)),
                    n === "select" &&
                      ((o = t),
                      r.multiple
                        ? (o.multiple = !0)
                        : r.size && (o.size = r.size)))
              : (t = o.createElementNS(t, n)),
            (t[Dt] = e),
            (t[xs] = r),
            Vf(t, e, !1, !1),
            (e.stateNode = t));
          e: {
            switch (((o = Ja(n, r)), n)) {
              case "dialog":
                (se("cancel", t), se("close", t), (s = r));
                break;
              case "iframe":
              case "object":
              case "embed":
                (se("load", t), (s = r));
                break;
              case "video":
              case "audio":
                for (s = 0; s < ns.length; s++) se(ns[s], t);
                s = r;
                break;
              case "source":
                (se("error", t), (s = r));
                break;
              case "img":
              case "image":
              case "link":
                (se("error", t), se("load", t), (s = r));
                break;
              case "details":
                (se("toggle", t), (s = r));
                break;
              case "input":
                (Xu(t, r), (s = Ha(t, r)), se("invalid", t));
                break;
              case "option":
                s = r;
                break;
              case "select":
                ((t._wrapperState = { wasMultiple: !!r.multiple }),
                  (s = de({}, r, { value: void 0 })),
                  se("invalid", t));
                break;
              case "textarea":
                (ec(t, r), (s = Ka(t, r)), se("invalid", t));
                break;
              default:
                s = r;
            }
            (Ga(n, s), (a = s));
            for (i in a)
              if (a.hasOwnProperty(i)) {
                var l = a[i];
                i === "style"
                  ? Sh(t, l)
                  : i === "dangerouslySetInnerHTML"
                    ? ((l = l ? l.__html : void 0), l != null && _h(t, l))
                    : i === "children"
                      ? typeof l == "string"
                        ? (n !== "textarea" || l !== "") && ws(t, l)
                        : typeof l == "number" && ws(t, "" + l)
                      : i !== "suppressContentEditableWarning" &&
                        i !== "suppressHydrationWarning" &&
                        i !== "autoFocus" &&
                        (vs.hasOwnProperty(i)
                          ? l != null && i === "onScroll" && se("scroll", t)
                          : l != null && Zl(t, i, l, o));
              }
            switch (n) {
              case "input":
                (ii(t), Zu(t, r, !1));
                break;
              case "textarea":
                (ii(t), tc(t));
                break;
              case "option":
                r.value != null && t.setAttribute("value", "" + Cn(r.value));
                break;
              case "select":
                ((t.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Sr(t, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Sr(t, !!r.multiple, r.defaultValue, !0));
                break;
              default:
                typeof s.onClick == "function" && (t.onclick = to);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (e.flags |= 4);
        }
        e.ref !== null && ((e.flags |= 512), (e.flags |= 2097152));
      }
      return (Me(e), null);
    case 6:
      if (t && e.stateNode != null) Kf(t, e, t.memoizedProps, r);
      else {
        if (typeof r != "string" && e.stateNode === null) throw Error(R(166));
        if (((n = Mn(Os.current)), Mn(Bt.current), pi(e))) {
          if (
            ((r = e.stateNode),
            (n = e.memoizedProps),
            (r[Dt] = e),
            (i = r.nodeValue !== n) && ((t = it), t !== null))
          )
            switch (t.tag) {
              case 3:
                fi(r.nodeValue, n, (t.mode & 1) !== 0);
                break;
              case 5:
                t.memoizedProps.suppressHydrationWarning !== !0 &&
                  fi(r.nodeValue, n, (t.mode & 1) !== 0);
            }
          i && (e.flags |= 4);
        } else
          ((r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Dt] = e),
            (e.stateNode = r));
      }
      return (Me(e), null);
    case 13:
      if (
        (oe(ue),
        (r = e.memoizedState),
        t === null ||
          (t.memoizedState !== null && t.memoizedState.dehydrated !== null))
      ) {
        if (ae && st !== null && e.mode & 1 && !(e.flags & 128))
          (cf(), jr(), (e.flags |= 98560), (i = !1));
        else if (((i = pi(e)), r !== null && r.dehydrated !== null)) {
          if (t === null) {
            if (!i) throw Error(R(318));
            if (
              ((i = e.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(R(317));
            i[Dt] = e;
          } else
            (jr(),
              !(e.flags & 128) && (e.memoizedState = null),
              (e.flags |= 4));
          (Me(e), (i = !1));
        } else (Rt !== null && (Al(Rt), (Rt = null)), (i = !0));
        if (!i) return e.flags & 65536 ? e : null;
      }
      return e.flags & 128
        ? ((e.lanes = n), e)
        : ((r = r !== null),
          r !== (t !== null && t.memoizedState !== null) &&
            r &&
            ((e.child.flags |= 8192),
            e.mode & 1 &&
              (t === null || ue.current & 1 ? Ee === 0 && (Ee = 3) : Lu())),
          e.updateQueue !== null && (e.flags |= 4),
          Me(e),
          null);
    case 4:
      return (
        Lr(),
        kl(t, e),
        t === null && Cs(e.stateNode.containerInfo),
        Me(e),
        null
      );
    case 10:
      return (vu(e.type._context), Me(e), null);
    case 17:
      return (Ze(e.type) && no(), Me(e), null);
    case 19:
      if ((oe(ue), (i = e.memoizedState), i === null)) return (Me(e), null);
      if (((r = (e.flags & 128) !== 0), (o = i.rendering), o === null))
        if (r) Jr(i, !1);
        else {
          if (Ee !== 0 || (t !== null && t.flags & 128))
            for (t = e.child; t !== null;) {
              if (((o = uo(t)), o !== null)) {
                for (
                  e.flags |= 128,
                    Jr(i, !1),
                    r = o.updateQueue,
                    r !== null && ((e.updateQueue = r), (e.flags |= 4)),
                    e.subtreeFlags = 0,
                    r = n,
                    n = e.child;
                  n !== null;
                )
                  ((i = n),
                    (t = r),
                    (i.flags &= 14680066),
                    (o = i.alternate),
                    o === null
                      ? ((i.childLanes = 0),
                        (i.lanes = t),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = o.childLanes),
                        (i.lanes = o.lanes),
                        (i.child = o.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = o.memoizedProps),
                        (i.memoizedState = o.memoizedState),
                        (i.updateQueue = o.updateQueue),
                        (i.type = o.type),
                        (t = o.dependencies),
                        (i.dependencies =
                          t === null
                            ? null
                            : {
                                lanes: t.lanes,
                                firstContext: t.firstContext,
                              })),
                    (n = n.sibling));
                return (ne(ue, (ue.current & 1) | 2), e.child);
              }
              t = t.sibling;
            }
          i.tail !== null &&
            ye() > Dr &&
            ((e.flags |= 128), (r = !0), Jr(i, !1), (e.lanes = 4194304));
        }
      else {
        if (!r)
          if (((t = uo(o)), t !== null)) {
            if (
              ((e.flags |= 128),
              (r = !0),
              (n = t.updateQueue),
              n !== null && ((e.updateQueue = n), (e.flags |= 4)),
              Jr(i, !0),
              i.tail === null && i.tailMode === "hidden" && !o.alternate && !ae)
            )
              return (Me(e), null);
          } else
            2 * ye() - i.renderingStartTime > Dr &&
              n !== 1073741824 &&
              ((e.flags |= 128), (r = !0), Jr(i, !1), (e.lanes = 4194304));
        i.isBackwards
          ? ((o.sibling = e.child), (e.child = o))
          : ((n = i.last),
            n !== null ? (n.sibling = o) : (e.child = o),
            (i.last = o));
      }
      return i.tail !== null
        ? ((e = i.tail),
          (i.rendering = e),
          (i.tail = e.sibling),
          (i.renderingStartTime = ye()),
          (e.sibling = null),
          (n = ue.current),
          ne(ue, r ? (n & 1) | 2 : n & 1),
          e)
        : (Me(e), null);
    case 22:
    case 23:
      return (
        Iu(),
        (r = e.memoizedState !== null),
        t !== null && (t.memoizedState !== null) !== r && (e.flags |= 8192),
        r && e.mode & 1
          ? nt & 1073741824 && (Me(e), e.subtreeFlags & 6 && (e.flags |= 8192))
          : Me(e),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(R(156, e.tag));
}
function Ym(t, e) {
  switch ((pu(e), e.tag)) {
    case 1:
      return (
        Ze(e.type) && no(),
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 3:
      return (
        Lr(),
        oe(Xe),
        oe(ze),
        Eu(),
        (t = e.flags),
        t & 65536 && !(t & 128) ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 5:
      return (Su(e), null);
    case 13:
      if (
        (oe(ue), (t = e.memoizedState), t !== null && t.dehydrated !== null)
      ) {
        if (e.alternate === null) throw Error(R(340));
        jr();
      }
      return (
        (t = e.flags),
        t & 65536 ? ((e.flags = (t & -65537) | 128), e) : null
      );
    case 19:
      return (oe(ue), null);
    case 4:
      return (Lr(), null);
    case 10:
      return (vu(e.type._context), null);
    case 22:
    case 23:
      return (Iu(), null);
    case 24:
      return null;
    default:
      return null;
  }
}
var yi = !1,
  Fe = !1,
  Xm = typeof WeakSet == "function" ? WeakSet : Set,
  $ = null;
function wr(t, e) {
  var n = t.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ge(t, e, r);
      }
    else n.current = null;
}
function Sl(t, e, n) {
  try {
    n();
  } catch (r) {
    ge(t, e, r);
  }
}
var Vc = !1;
function Zm(t, e) {
  if (((il = Xi), (t = Qh()), hu(t))) {
    if ("selectionStart" in t)
      var n = { start: t.selectionStart, end: t.selectionEnd };
    else
      e: {
        n = ((n = t.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var s = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            (n.nodeType, i.nodeType);
          } catch {
            n = null;
            break e;
          }
          var o = 0,
            a = -1,
            l = -1,
            u = 0,
            d = 0,
            c = t,
            h = null;
          t: for (;;) {
            for (
              var g;
              c !== n || (s !== 0 && c.nodeType !== 3) || (a = o + s),
                c !== i || (r !== 0 && c.nodeType !== 3) || (l = o + r),
                c.nodeType === 3 && (o += c.nodeValue.length),
                (g = c.firstChild) !== null;
            )
              ((h = c), (c = g));
            for (;;) {
              if (c === t) break t;
              if (
                (h === n && ++u === s && (a = o),
                h === i && ++d === r && (l = o),
                (g = c.nextSibling) !== null)
              )
                break;
              ((c = h), (h = c.parentNode));
            }
            c = g;
          }
          n = a === -1 || l === -1 ? null : { start: a, end: l };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ol = { focusedElem: t, selectionRange: n }, Xi = !1, $ = e; $ !== null;)
    if (((e = $), (t = e.child), (e.subtreeFlags & 1028) !== 0 && t !== null))
      ((t.return = e), ($ = t));
    else
      for (; $ !== null;) {
        e = $;
        try {
          var y = e.alternate;
          if (e.flags & 1024)
            switch (e.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (y !== null) {
                  var v = y.memoizedProps,
                    k = y.memoizedState,
                    p = e.stateNode,
                    f = p.getSnapshotBeforeUpdate(
                      e.elementType === e.type ? v : bt(e.type, v),
                      k,
                    );
                  p.__reactInternalSnapshotBeforeUpdate = f;
                }
                break;
              case 3:
                var m = e.stateNode.containerInfo;
                m.nodeType === 1
                  ? (m.textContent = "")
                  : m.nodeType === 9 &&
                    m.documentElement &&
                    m.removeChild(m.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(R(163));
            }
        } catch (S) {
          ge(e, e.return, S);
        }
        if (((t = e.sibling), t !== null)) {
          ((t.return = e.return), ($ = t));
          break;
        }
        $ = e.return;
      }
  return ((y = Vc), (Vc = !1), y);
}
function fs(t, e, n) {
  var r = e.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var s = (r = r.next);
    do {
      if ((s.tag & t) === t) {
        var i = s.destroy;
        ((s.destroy = void 0), i !== void 0 && Sl(e, n, i));
      }
      s = s.next;
    } while (s !== r);
  }
}
function Do(t, e) {
  if (
    ((e = e.updateQueue), (e = e !== null ? e.lastEffect : null), e !== null)
  ) {
    var n = (e = e.next);
    do {
      if ((n.tag & t) === t) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== e);
  }
}
function El(t) {
  var e = t.ref;
  if (e !== null) {
    var n = t.stateNode;
    switch (t.tag) {
      case 5:
        t = n;
        break;
      default:
        t = n;
    }
    typeof e == "function" ? e(t) : (e.current = t);
  }
}
function qf(t) {
  var e = t.alternate;
  (e !== null && ((t.alternate = null), qf(e)),
    (t.child = null),
    (t.deletions = null),
    (t.sibling = null),
    t.tag === 5 &&
      ((e = t.stateNode),
      e !== null &&
        (delete e[Dt], delete e[xs], delete e[ul], delete e[Lm], delete e[$m])),
    (t.stateNode = null),
    (t.return = null),
    (t.dependencies = null),
    (t.memoizedProps = null),
    (t.memoizedState = null),
    (t.pendingProps = null),
    (t.stateNode = null),
    (t.updateQueue = null));
}
function Gf(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 4;
}
function Wc(t) {
  e: for (;;) {
    for (; t.sibling === null;) {
      if (t.return === null || Gf(t.return)) return null;
      t = t.return;
    }
    for (
      t.sibling.return = t.return, t = t.sibling;
      t.tag !== 5 && t.tag !== 6 && t.tag !== 18;
    ) {
      if (t.flags & 2 || t.child === null || t.tag === 4) continue e;
      ((t.child.return = t), (t = t.child));
    }
    if (!(t.flags & 2)) return t.stateNode;
  }
}
function bl(t, e, n) {
  var r = t.tag;
  if (r === 5 || r === 6)
    ((t = t.stateNode),
      e
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(t, e)
          : n.insertBefore(t, e)
        : (n.nodeType === 8
            ? ((e = n.parentNode), e.insertBefore(t, n))
            : ((e = n), e.appendChild(t)),
          (n = n._reactRootContainer),
          n != null || e.onclick !== null || (e.onclick = to)));
  else if (r !== 4 && ((t = t.child), t !== null))
    for (bl(t, e, n), t = t.sibling; t !== null;)
      (bl(t, e, n), (t = t.sibling));
}
function Tl(t, e, n) {
  var r = t.tag;
  if (r === 5 || r === 6)
    ((t = t.stateNode), e ? n.insertBefore(t, e) : n.appendChild(t));
  else if (r !== 4 && ((t = t.child), t !== null))
    for (Tl(t, e, n), t = t.sibling; t !== null;)
      (Tl(t, e, n), (t = t.sibling));
}
var je = null,
  Ct = !1;
function un(t, e, n) {
  for (n = n.child; n !== null;) (Jf(t, e, n), (n = n.sibling));
}
function Jf(t, e, n) {
  if (Mt && typeof Mt.onCommitFiberUnmount == "function")
    try {
      Mt.onCommitFiberUnmount(Ao, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Fe || wr(n, e);
    case 6:
      var r = je,
        s = Ct;
      ((je = null),
        un(t, e, n),
        (je = r),
        (Ct = s),
        je !== null &&
          (Ct
            ? ((t = je),
              (n = n.stateNode),
              t.nodeType === 8 ? t.parentNode.removeChild(n) : t.removeChild(n))
            : je.removeChild(n.stateNode)));
      break;
    case 18:
      je !== null &&
        (Ct
          ? ((t = je),
            (n = n.stateNode),
            t.nodeType === 8
              ? ha(t.parentNode, n)
              : t.nodeType === 1 && ha(t, n),
            Es(t))
          : ha(je, n.stateNode));
      break;
    case 4:
      ((r = je),
        (s = Ct),
        (je = n.stateNode.containerInfo),
        (Ct = !0),
        un(t, e, n),
        (je = r),
        (Ct = s));
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Fe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        s = r = r.next;
        do {
          var i = s,
            o = i.destroy;
          ((i = i.tag),
            o !== void 0 && (i & 2 || i & 4) && Sl(n, e, o),
            (s = s.next));
        } while (s !== r);
      }
      un(t, e, n);
      break;
    case 1:
      if (
        !Fe &&
        (wr(n, e),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          ((r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount());
        } catch (a) {
          ge(n, e, a);
        }
      un(t, e, n);
      break;
    case 21:
      un(t, e, n);
      break;
    case 22:
      n.mode & 1
        ? ((Fe = (r = Fe) || n.memoizedState !== null), un(t, e, n), (Fe = r))
        : un(t, e, n);
      break;
    default:
      un(t, e, n);
  }
}
function Kc(t) {
  var e = t.updateQueue;
  if (e !== null) {
    t.updateQueue = null;
    var n = t.stateNode;
    (n === null && (n = t.stateNode = new Xm()),
      e.forEach(function (r) {
        var s = ly.bind(null, t, r);
        n.has(r) || (n.add(r), r.then(s, s));
      }));
  }
}
function kt(t, e) {
  var n = e.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var s = n[r];
      try {
        var i = t,
          o = e,
          a = o;
        e: for (; a !== null;) {
          switch (a.tag) {
            case 5:
              ((je = a.stateNode), (Ct = !1));
              break e;
            case 3:
              ((je = a.stateNode.containerInfo), (Ct = !0));
              break e;
            case 4:
              ((je = a.stateNode.containerInfo), (Ct = !0));
              break e;
          }
          a = a.return;
        }
        if (je === null) throw Error(R(160));
        (Jf(i, o, s), (je = null), (Ct = !1));
        var l = s.alternate;
        (l !== null && (l.return = null), (s.return = null));
      } catch (u) {
        ge(s, e, u);
      }
    }
  if (e.subtreeFlags & 12854)
    for (e = e.child; e !== null;) (Qf(e, t), (e = e.sibling));
}
function Qf(t, e) {
  var n = t.alternate,
    r = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((kt(e, t), jt(t), r & 4)) {
        try {
          (fs(3, t, t.return), Do(3, t));
        } catch (v) {
          ge(t, t.return, v);
        }
        try {
          fs(5, t, t.return);
        } catch (v) {
          ge(t, t.return, v);
        }
      }
      break;
    case 1:
      (kt(e, t), jt(t), r & 512 && n !== null && wr(n, n.return));
      break;
    case 5:
      if (
        (kt(e, t),
        jt(t),
        r & 512 && n !== null && wr(n, n.return),
        t.flags & 32)
      ) {
        var s = t.stateNode;
        try {
          ws(s, "");
        } catch (v) {
          ge(t, t.return, v);
        }
      }
      if (r & 4 && ((s = t.stateNode), s != null)) {
        var i = t.memoizedProps,
          o = n !== null ? n.memoizedProps : i,
          a = t.type,
          l = t.updateQueue;
        if (((t.updateQueue = null), l !== null))
          try {
            (a === "input" && i.type === "radio" && i.name != null && yh(s, i),
              Ja(a, o));
            var u = Ja(a, i);
            for (o = 0; o < l.length; o += 2) {
              var d = l[o],
                c = l[o + 1];
              d === "style"
                ? Sh(s, c)
                : d === "dangerouslySetInnerHTML"
                  ? _h(s, c)
                  : d === "children"
                    ? ws(s, c)
                    : Zl(s, d, c, u);
            }
            switch (a) {
              case "input":
                Va(s, i);
                break;
              case "textarea":
                vh(s, i);
                break;
              case "select":
                var h = s._wrapperState.wasMultiple;
                s._wrapperState.wasMultiple = !!i.multiple;
                var g = i.value;
                g != null
                  ? Sr(s, !!i.multiple, g, !1)
                  : h !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Sr(s, !!i.multiple, i.defaultValue, !0)
                      : Sr(s, !!i.multiple, i.multiple ? [] : "", !1));
            }
            s[xs] = i;
          } catch (v) {
            ge(t, t.return, v);
          }
      }
      break;
    case 6:
      if ((kt(e, t), jt(t), r & 4)) {
        if (t.stateNode === null) throw Error(R(162));
        ((s = t.stateNode), (i = t.memoizedProps));
        try {
          s.nodeValue = i;
        } catch (v) {
          ge(t, t.return, v);
        }
      }
      break;
    case 3:
      if (
        (kt(e, t), jt(t), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Es(e.containerInfo);
        } catch (v) {
          ge(t, t.return, v);
        }
      break;
    case 4:
      (kt(e, t), jt(t));
      break;
    case 13:
      (kt(e, t),
        jt(t),
        (s = t.child),
        s.flags & 8192 &&
          ((i = s.memoizedState !== null),
          (s.stateNode.isHidden = i),
          !i ||
            (s.alternate !== null && s.alternate.memoizedState !== null) ||
            (Nu = ye())),
        r & 4 && Kc(t));
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        t.mode & 1 ? ((Fe = (u = Fe) || d), kt(e, t), (Fe = u)) : kt(e, t),
        jt(t),
        r & 8192)
      ) {
        if (
          ((u = t.memoizedState !== null),
          (t.stateNode.isHidden = u) && !d && t.mode & 1)
        )
          for ($ = t, d = t.child; d !== null;) {
            for (c = $ = d; $ !== null;) {
              switch (((h = $), (g = h.child), h.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  fs(4, h, h.return);
                  break;
                case 1:
                  wr(h, h.return);
                  var y = h.stateNode;
                  if (typeof y.componentWillUnmount == "function") {
                    ((r = h), (n = h.return));
                    try {
                      ((e = r),
                        (y.props = e.memoizedProps),
                        (y.state = e.memoizedState),
                        y.componentWillUnmount());
                    } catch (v) {
                      ge(r, n, v);
                    }
                  }
                  break;
                case 5:
                  wr(h, h.return);
                  break;
                case 22:
                  if (h.memoizedState !== null) {
                    Gc(c);
                    continue;
                  }
              }
              g !== null ? ((g.return = h), ($ = g)) : Gc(c);
            }
            d = d.sibling;
          }
        e: for (d = null, c = t; ;) {
          if (c.tag === 5) {
            if (d === null) {
              d = c;
              try {
                ((s = c.stateNode),
                  u
                    ? ((i = s.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((a = c.stateNode),
                      (l = c.memoizedProps.style),
                      (o =
                        l != null && l.hasOwnProperty("display")
                          ? l.display
                          : null),
                      (a.style.display = kh("display", o))));
              } catch (v) {
                ge(t, t.return, v);
              }
            }
          } else if (c.tag === 6) {
            if (d === null)
              try {
                c.stateNode.nodeValue = u ? "" : c.memoizedProps;
              } catch (v) {
                ge(t, t.return, v);
              }
          } else if (
            ((c.tag !== 22 && c.tag !== 23) ||
              c.memoizedState === null ||
              c === t) &&
            c.child !== null
          ) {
            ((c.child.return = c), (c = c.child));
            continue;
          }
          if (c === t) break e;
          for (; c.sibling === null;) {
            if (c.return === null || c.return === t) break e;
            (d === c && (d = null), (c = c.return));
          }
          (d === c && (d = null),
            (c.sibling.return = c.return),
            (c = c.sibling));
        }
      }
      break;
    case 19:
      (kt(e, t), jt(t), r & 4 && Kc(t));
      break;
    case 21:
      break;
    default:
      (kt(e, t), jt(t));
  }
}
function jt(t) {
  var e = t.flags;
  if (e & 2) {
    try {
      e: {
        for (var n = t.return; n !== null;) {
          if (Gf(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(R(160));
      }
      switch (r.tag) {
        case 5:
          var s = r.stateNode;
          r.flags & 32 && (ws(s, ""), (r.flags &= -33));
          var i = Wc(t);
          Tl(t, i, s);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            a = Wc(t);
          bl(t, a, o);
          break;
        default:
          throw Error(R(161));
      }
    } catch (l) {
      ge(t, t.return, l);
    }
    t.flags &= -3;
  }
  e & 4096 && (t.flags &= -4097);
}
function ey(t, e, n) {
  (($ = t), Yf(t));
}
function Yf(t, e, n) {
  for (var r = (t.mode & 1) !== 0; $ !== null;) {
    var s = $,
      i = s.child;
    if (s.tag === 22 && r) {
      var o = s.memoizedState !== null || yi;
      if (!o) {
        var a = s.alternate,
          l = (a !== null && a.memoizedState !== null) || Fe;
        a = yi;
        var u = Fe;
        if (((yi = o), (Fe = l) && !u))
          for ($ = s; $ !== null;)
            ((o = $),
              (l = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Jc(s)
                : l !== null
                  ? ((l.return = o), ($ = l))
                  : Jc(s));
        for (; i !== null;) (($ = i), Yf(i), (i = i.sibling));
        (($ = s), (yi = a), (Fe = u));
      }
      qc(t);
    } else
      s.subtreeFlags & 8772 && i !== null ? ((i.return = s), ($ = i)) : qc(t);
  }
}
function qc(t) {
  for (; $ !== null;) {
    var e = $;
    if (e.flags & 8772) {
      var n = e.alternate;
      try {
        if (e.flags & 8772)
          switch (e.tag) {
            case 0:
            case 11:
            case 15:
              Fe || Do(5, e);
              break;
            case 1:
              var r = e.stateNode;
              if (e.flags & 4 && !Fe)
                if (n === null) r.componentDidMount();
                else {
                  var s =
                    e.elementType === e.type
                      ? n.memoizedProps
                      : bt(e.type, n.memoizedProps);
                  r.componentDidUpdate(
                    s,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate,
                  );
                }
              var i = e.updateQueue;
              i !== null && Pc(e, i, r);
              break;
            case 3:
              var o = e.updateQueue;
              if (o !== null) {
                if (((n = null), e.child !== null))
                  switch (e.child.tag) {
                    case 5:
                      n = e.child.stateNode;
                      break;
                    case 1:
                      n = e.child.stateNode;
                  }
                Pc(e, o, n);
              }
              break;
            case 5:
              var a = e.stateNode;
              if (n === null && e.flags & 4) {
                n = a;
                var l = e.memoizedProps;
                switch (e.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    l.autoFocus && n.focus();
                    break;
                  case "img":
                    l.src && (n.src = l.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (e.memoizedState === null) {
                var u = e.alternate;
                if (u !== null) {
                  var d = u.memoizedState;
                  if (d !== null) {
                    var c = d.dehydrated;
                    c !== null && Es(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(R(163));
          }
        Fe || (e.flags & 512 && El(e));
      } catch (h) {
        ge(e, e.return, h);
      }
    }
    if (e === t) {
      $ = null;
      break;
    }
    if (((n = e.sibling), n !== null)) {
      ((n.return = e.return), ($ = n));
      break;
    }
    $ = e.return;
  }
}
function Gc(t) {
  for (; $ !== null;) {
    var e = $;
    if (e === t) {
      $ = null;
      break;
    }
    var n = e.sibling;
    if (n !== null) {
      ((n.return = e.return), ($ = n));
      break;
    }
    $ = e.return;
  }
}
function Jc(t) {
  for (; $ !== null;) {
    var e = $;
    try {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          var n = e.return;
          try {
            Do(4, e);
          } catch (l) {
            ge(e, n, l);
          }
          break;
        case 1:
          var r = e.stateNode;
          if (typeof r.componentDidMount == "function") {
            var s = e.return;
            try {
              r.componentDidMount();
            } catch (l) {
              ge(e, s, l);
            }
          }
          var i = e.return;
          try {
            El(e);
          } catch (l) {
            ge(e, i, l);
          }
          break;
        case 5:
          var o = e.return;
          try {
            El(e);
          } catch (l) {
            ge(e, o, l);
          }
      }
    } catch (l) {
      ge(e, e.return, l);
    }
    if (e === t) {
      $ = null;
      break;
    }
    var a = e.sibling;
    if (a !== null) {
      ((a.return = e.return), ($ = a));
      break;
    }
    $ = e.return;
  }
}
var ty = Math.ceil,
  fo = on.ReactCurrentDispatcher,
  Ou = on.ReactCurrentOwner,
  gt = on.ReactCurrentBatchConfig,
  q = 0,
  Oe = null,
  _e = null,
  Le = 0,
  nt = 0,
  _r = An(0),
  Ee = 0,
  Is = null,
  qn = 0,
  Uo = 0,
  Pu = 0,
  ps = null,
  Je = null,
  Nu = 0,
  Dr = 1 / 0,
  Wt = null,
  po = !1,
  Cl = null,
  En = null,
  vi = !1,
  yn = null,
  go = 0,
  gs = 0,
  Rl = null,
  Fi = -1,
  zi = 0;
function Ve() {
  return q & 6 ? ye() : Fi !== -1 ? Fi : (Fi = ye());
}
function bn(t) {
  return t.mode & 1
    ? q & 2 && Le !== 0
      ? Le & -Le
      : Um.transition !== null
        ? (zi === 0 && (zi = Ih()), zi)
        : ((t = X),
          t !== 0 || ((t = window.event), (t = t === void 0 ? 16 : Fh(t.type))),
          t)
    : 1;
}
function Pt(t, e, n, r) {
  if (50 < gs) throw ((gs = 0), (Rl = null), Error(R(185)));
  (Ks(t, n, r),
    (!(q & 2) || t !== Oe) &&
      (t === Oe && (!(q & 2) && (Uo |= n), Ee === 4 && fn(t, Le)),
      et(t, r),
      n === 1 && q === 0 && !(e.mode & 1) && ((Dr = ye() + 500), Io && On())));
}
function et(t, e) {
  var n = t.callbackNode;
  Ug(t, e);
  var r = Yi(t, t === Oe ? Le : 0);
  if (r === 0)
    (n !== null && sc(n), (t.callbackNode = null), (t.callbackPriority = 0));
  else if (((e = r & -r), t.callbackPriority !== e)) {
    if ((n != null && sc(n), e === 1))
      (t.tag === 0 ? Dm(Qc.bind(null, t)) : af(Qc.bind(null, t)),
        jm(function () {
          !(q & 6) && On();
        }),
        (n = null));
    else {
      switch (Lh(r)) {
        case 1:
          n = su;
          break;
        case 4:
          n = Nh;
          break;
        case 16:
          n = Qi;
          break;
        case 536870912:
          n = jh;
          break;
        default:
          n = Qi;
      }
      n = ip(n, Xf.bind(null, t));
    }
    ((t.callbackPriority = e), (t.callbackNode = n));
  }
}
function Xf(t, e) {
  if (((Fi = -1), (zi = 0), q & 6)) throw Error(R(327));
  var n = t.callbackNode;
  if (Rr() && t.callbackNode !== n) return null;
  var r = Yi(t, t === Oe ? Le : 0);
  if (r === 0) return null;
  if (r & 30 || r & t.expiredLanes || e) e = mo(t, r);
  else {
    e = r;
    var s = q;
    q |= 2;
    var i = ep();
    (Oe !== t || Le !== e) && ((Wt = null), (Dr = ye() + 500), zn(t, e));
    do
      try {
        sy();
        break;
      } catch (a) {
        Zf(t, a);
      }
    while (!0);
    (yu(),
      (fo.current = i),
      (q = s),
      _e !== null ? (e = 0) : ((Oe = null), (Le = 0), (e = Ee)));
  }
  if (e !== 0) {
    if (
      (e === 2 && ((s = el(t)), s !== 0 && ((r = s), (e = xl(t, s)))), e === 1)
    )
      throw ((n = Is), zn(t, 0), fn(t, r), et(t, ye()), n);
    if (e === 6) fn(t, r);
    else {
      if (
        ((s = t.current.alternate),
        !(r & 30) &&
          !ny(s) &&
          ((e = mo(t, r)),
          e === 2 && ((i = el(t)), i !== 0 && ((r = i), (e = xl(t, i)))),
          e === 1))
      )
        throw ((n = Is), zn(t, 0), fn(t, r), et(t, ye()), n);
      switch (((t.finishedWork = s), (t.finishedLanes = r), e)) {
        case 0:
        case 1:
          throw Error(R(345));
        case 2:
          jn(t, Je, Wt);
          break;
        case 3:
          if (
            (fn(t, r), (r & 130023424) === r && ((e = Nu + 500 - ye()), 10 < e))
          ) {
            if (Yi(t, 0) !== 0) break;
            if (((s = t.suspendedLanes), (s & r) !== r)) {
              (Ve(), (t.pingedLanes |= t.suspendedLanes & s));
              break;
            }
            t.timeoutHandle = ll(jn.bind(null, t, Je, Wt), e);
            break;
          }
          jn(t, Je, Wt);
          break;
        case 4:
          if ((fn(t, r), (r & 4194240) === r)) break;
          for (e = t.eventTimes, s = -1; 0 < r;) {
            var o = 31 - Ot(r);
            ((i = 1 << o), (o = e[o]), o > s && (s = o), (r &= ~i));
          }
          if (
            ((r = s),
            (r = ye() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                  ? 480
                  : 1080 > r
                    ? 1080
                    : 1920 > r
                      ? 1920
                      : 3e3 > r
                        ? 3e3
                        : 4320 > r
                          ? 4320
                          : 1960 * ty(r / 1960)) - r),
            10 < r)
          ) {
            t.timeoutHandle = ll(jn.bind(null, t, Je, Wt), r);
            break;
          }
          jn(t, Je, Wt);
          break;
        case 5:
          jn(t, Je, Wt);
          break;
        default:
          throw Error(R(329));
      }
    }
  }
  return (et(t, ye()), t.callbackNode === n ? Xf.bind(null, t) : null);
}
function xl(t, e) {
  var n = ps;
  return (
    t.current.memoizedState.isDehydrated && (zn(t, e).flags |= 256),
    (t = mo(t, e)),
    t !== 2 && ((e = Je), (Je = n), e !== null && Al(e)),
    t
  );
}
function Al(t) {
  Je === null ? (Je = t) : Je.push.apply(Je, t);
}
function ny(t) {
  for (var e = t; ;) {
    if (e.flags & 16384) {
      var n = e.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var s = n[r],
            i = s.getSnapshot;
          s = s.value;
          try {
            if (!Nt(i(), s)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = e.child), e.subtreeFlags & 16384 && n !== null))
      ((n.return = e), (e = n));
    else {
      if (e === t) break;
      for (; e.sibling === null;) {
        if (e.return === null || e.return === t) return !0;
        e = e.return;
      }
      ((e.sibling.return = e.return), (e = e.sibling));
    }
  }
  return !0;
}
function fn(t, e) {
  for (
    e &= ~Pu,
      e &= ~Uo,
      t.suspendedLanes |= e,
      t.pingedLanes &= ~e,
      t = t.expirationTimes;
    0 < e;
  ) {
    var n = 31 - Ot(e),
      r = 1 << n;
    ((t[n] = -1), (e &= ~r));
  }
}
function Qc(t) {
  if (q & 6) throw Error(R(327));
  Rr();
  var e = Yi(t, 0);
  if (!(e & 1)) return (et(t, ye()), null);
  var n = mo(t, e);
  if (t.tag !== 0 && n === 2) {
    var r = el(t);
    r !== 0 && ((e = r), (n = xl(t, r)));
  }
  if (n === 1) throw ((n = Is), zn(t, 0), fn(t, e), et(t, ye()), n);
  if (n === 6) throw Error(R(345));
  return (
    (t.finishedWork = t.current.alternate),
    (t.finishedLanes = e),
    jn(t, Je, Wt),
    et(t, ye()),
    null
  );
}
function ju(t, e) {
  var n = q;
  q |= 1;
  try {
    return t(e);
  } finally {
    ((q = n), q === 0 && ((Dr = ye() + 500), Io && On()));
  }
}
function Gn(t) {
  yn !== null && yn.tag === 0 && !(q & 6) && Rr();
  var e = q;
  q |= 1;
  var n = gt.transition,
    r = X;
  try {
    if (((gt.transition = null), (X = 1), t)) return t();
  } finally {
    ((X = r), (gt.transition = n), (q = e), !(q & 6) && On());
  }
}
function Iu() {
  ((nt = _r.current), oe(_r));
}
function zn(t, e) {
  ((t.finishedWork = null), (t.finishedLanes = 0));
  var n = t.timeoutHandle;
  if ((n !== -1 && ((t.timeoutHandle = -1), Nm(n)), _e !== null))
    for (n = _e.return; n !== null;) {
      var r = n;
      switch ((pu(r), r.tag)) {
        case 1:
          ((r = r.type.childContextTypes), r != null && no());
          break;
        case 3:
          (Lr(), oe(Xe), oe(ze), Eu());
          break;
        case 5:
          Su(r);
          break;
        case 4:
          Lr();
          break;
        case 13:
          oe(ue);
          break;
        case 19:
          oe(ue);
          break;
        case 10:
          vu(r.type._context);
          break;
        case 22:
        case 23:
          Iu();
      }
      n = n.return;
    }
  if (
    ((Oe = t),
    (_e = t = Tn(t.current, null)),
    (Le = nt = e),
    (Ee = 0),
    (Is = null),
    (Pu = Uo = qn = 0),
    (Je = ps = null),
    Un !== null)
  ) {
    for (e = 0; e < Un.length; e++)
      if (((n = Un[e]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var s = r.next,
          i = n.pending;
        if (i !== null) {
          var o = i.next;
          ((i.next = s), (r.next = o));
        }
        n.pending = r;
      }
    Un = null;
  }
  return t;
}
function Zf(t, e) {
  do {
    var n = _e;
    try {
      if ((yu(), (Ui.current = ho), co)) {
        for (var r = ce.memoizedState; r !== null;) {
          var s = r.queue;
          (s !== null && (s.pending = null), (r = r.next));
        }
        co = !1;
      }
      if (
        ((Kn = 0),
        (xe = Se = ce = null),
        (hs = !1),
        (Ps = 0),
        (Ou.current = null),
        n === null || n.return === null)
      ) {
        ((Ee = 1), (Is = e), (_e = null));
        break;
      }
      e: {
        var i = t,
          o = n.return,
          a = n,
          l = e;
        if (
          ((e = Le),
          (a.flags |= 32768),
          l !== null && typeof l == "object" && typeof l.then == "function")
        ) {
          var u = l,
            d = a,
            c = d.tag;
          if (!(d.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var h = d.alternate;
            h
              ? ((d.updateQueue = h.updateQueue),
                (d.memoizedState = h.memoizedState),
                (d.lanes = h.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var g = Dc(o);
          if (g !== null) {
            ((g.flags &= -257),
              Uc(g, o, a, i, e),
              g.mode & 1 && $c(i, u, e),
              (e = g),
              (l = u));
            var y = e.updateQueue;
            if (y === null) {
              var v = new Set();
              (v.add(l), (e.updateQueue = v));
            } else y.add(l);
            break e;
          } else {
            if (!(e & 1)) {
              ($c(i, u, e), Lu());
              break e;
            }
            l = Error(R(426));
          }
        } else if (ae && a.mode & 1) {
          var k = Dc(o);
          if (k !== null) {
            (!(k.flags & 65536) && (k.flags |= 256),
              Uc(k, o, a, i, e),
              gu($r(l, a)));
            break e;
          }
        }
        ((i = l = $r(l, a)),
          Ee !== 4 && (Ee = 2),
          ps === null ? (ps = [i]) : ps.push(i),
          (i = o));
        do {
          switch (i.tag) {
            case 3:
              ((i.flags |= 65536), (e &= -e), (i.lanes |= e));
              var p = $f(i, l, e);
              Oc(i, p);
              break e;
            case 1:
              a = l;
              var f = i.type,
                m = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof f.getDerivedStateFromError == "function" ||
                  (m !== null &&
                    typeof m.componentDidCatch == "function" &&
                    (En === null || !En.has(m))))
              ) {
                ((i.flags |= 65536), (e &= -e), (i.lanes |= e));
                var S = Df(i, a, e);
                Oc(i, S);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      np(n);
    } catch (C) {
      ((e = C), _e === n && n !== null && (_e = n = n.return));
      continue;
    }
    break;
  } while (!0);
}
function ep() {
  var t = fo.current;
  return ((fo.current = ho), t === null ? ho : t);
}
function Lu() {
  ((Ee === 0 || Ee === 3 || Ee === 2) && (Ee = 4),
    Oe === null || (!(qn & 268435455) && !(Uo & 268435455)) || fn(Oe, Le));
}
function mo(t, e) {
  var n = q;
  q |= 2;
  var r = ep();
  (Oe !== t || Le !== e) && ((Wt = null), zn(t, e));
  do
    try {
      ry();
      break;
    } catch (s) {
      Zf(t, s);
    }
  while (!0);
  if ((yu(), (q = n), (fo.current = r), _e !== null)) throw Error(R(261));
  return ((Oe = null), (Le = 0), Ee);
}
function ry() {
  for (; _e !== null;) tp(_e);
}
function sy() {
  for (; _e !== null && !Ag();) tp(_e);
}
function tp(t) {
  var e = sp(t.alternate, t, nt);
  ((t.memoizedProps = t.pendingProps),
    e === null ? np(t) : (_e = e),
    (Ou.current = null));
}
function np(t) {
  var e = t;
  do {
    var n = e.alternate;
    if (((t = e.return), e.flags & 32768)) {
      if (((n = Ym(n, e)), n !== null)) {
        ((n.flags &= 32767), (_e = n));
        return;
      }
      if (t !== null)
        ((t.flags |= 32768), (t.subtreeFlags = 0), (t.deletions = null));
      else {
        ((Ee = 6), (_e = null));
        return;
      }
    } else if (((n = Qm(n, e, nt)), n !== null)) {
      _e = n;
      return;
    }
    if (((e = e.sibling), e !== null)) {
      _e = e;
      return;
    }
    _e = e = t;
  } while (e !== null);
  Ee === 0 && (Ee = 5);
}
function jn(t, e, n) {
  var r = X,
    s = gt.transition;
  try {
    ((gt.transition = null), (X = 1), iy(t, e, n, r));
  } finally {
    ((gt.transition = s), (X = r));
  }
  return null;
}
function iy(t, e, n, r) {
  do Rr();
  while (yn !== null);
  if (q & 6) throw Error(R(327));
  n = t.finishedWork;
  var s = t.finishedLanes;
  if (n === null) return null;
  if (((t.finishedWork = null), (t.finishedLanes = 0), n === t.current))
    throw Error(R(177));
  ((t.callbackNode = null), (t.callbackPriority = 0));
  var i = n.lanes | n.childLanes;
  if (
    (Mg(t, i),
    t === Oe && ((_e = Oe = null), (Le = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      vi ||
      ((vi = !0),
      ip(Qi, function () {
        return (Rr(), null);
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    ((i = gt.transition), (gt.transition = null));
    var o = X;
    X = 1;
    var a = q;
    ((q |= 4),
      (Ou.current = null),
      Zm(t, n),
      Qf(n, t),
      Tm(ol),
      (Xi = !!il),
      (ol = il = null),
      (t.current = n),
      ey(n),
      Og(),
      (q = a),
      (X = o),
      (gt.transition = i));
  } else t.current = n;
  if (
    (vi && ((vi = !1), (yn = t), (go = s)),
    (i = t.pendingLanes),
    i === 0 && (En = null),
    jg(n.stateNode),
    et(t, ye()),
    e !== null)
  )
    for (r = t.onRecoverableError, n = 0; n < e.length; n++)
      ((s = e[n]), r(s.value, { componentStack: s.stack, digest: s.digest }));
  if (po) throw ((po = !1), (t = Cl), (Cl = null), t);
  return (
    go & 1 && t.tag !== 0 && Rr(),
    (i = t.pendingLanes),
    i & 1 ? (t === Rl ? gs++ : ((gs = 0), (Rl = t))) : (gs = 0),
    On(),
    null
  );
}
function Rr() {
  if (yn !== null) {
    var t = Lh(go),
      e = gt.transition,
      n = X;
    try {
      if (((gt.transition = null), (X = 16 > t ? 16 : t), yn === null))
        var r = !1;
      else {
        if (((t = yn), (yn = null), (go = 0), q & 6)) throw Error(R(331));
        var s = q;
        for (q |= 4, $ = t.current; $ !== null;) {
          var i = $,
            o = i.child;
          if ($.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var l = 0; l < a.length; l++) {
                var u = a[l];
                for ($ = u; $ !== null;) {
                  var d = $;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      fs(8, d, i);
                  }
                  var c = d.child;
                  if (c !== null) ((c.return = d), ($ = c));
                  else
                    for (; $ !== null;) {
                      d = $;
                      var h = d.sibling,
                        g = d.return;
                      if ((qf(d), d === u)) {
                        $ = null;
                        break;
                      }
                      if (h !== null) {
                        ((h.return = g), ($ = h));
                        break;
                      }
                      $ = g;
                    }
                }
              }
              var y = i.alternate;
              if (y !== null) {
                var v = y.child;
                if (v !== null) {
                  y.child = null;
                  do {
                    var k = v.sibling;
                    ((v.sibling = null), (v = k));
                  } while (v !== null);
                }
              }
              $ = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) ((o.return = i), ($ = o));
          else
            e: for (; $ !== null;) {
              if (((i = $), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    fs(9, i, i.return);
                }
              var p = i.sibling;
              if (p !== null) {
                ((p.return = i.return), ($ = p));
                break e;
              }
              $ = i.return;
            }
        }
        var f = t.current;
        for ($ = f; $ !== null;) {
          o = $;
          var m = o.child;
          if (o.subtreeFlags & 2064 && m !== null) ((m.return = o), ($ = m));
          else
            e: for (o = f; $ !== null;) {
              if (((a = $), a.flags & 2048))
                try {
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Do(9, a);
                  }
                } catch (C) {
                  ge(a, a.return, C);
                }
              if (a === o) {
                $ = null;
                break e;
              }
              var S = a.sibling;
              if (S !== null) {
                ((S.return = a.return), ($ = S));
                break e;
              }
              $ = a.return;
            }
        }
        if (
          ((q = s), On(), Mt && typeof Mt.onPostCommitFiberRoot == "function")
        )
          try {
            Mt.onPostCommitFiberRoot(Ao, t);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      ((X = n), (gt.transition = e));
    }
  }
  return !1;
}
function Yc(t, e, n) {
  ((e = $r(n, e)),
    (e = $f(t, e, 1)),
    (t = Sn(t, e, 1)),
    (e = Ve()),
    t !== null && (Ks(t, 1, e), et(t, e)));
}
function ge(t, e, n) {
  if (t.tag === 3) Yc(t, t, n);
  else
    for (; e !== null;) {
      if (e.tag === 3) {
        Yc(e, t, n);
        break;
      } else if (e.tag === 1) {
        var r = e.stateNode;
        if (
          typeof e.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (En === null || !En.has(r)))
        ) {
          ((t = $r(n, t)),
            (t = Df(e, t, 1)),
            (e = Sn(e, t, 1)),
            (t = Ve()),
            e !== null && (Ks(e, 1, t), et(e, t)));
          break;
        }
      }
      e = e.return;
    }
}
function oy(t, e, n) {
  var r = t.pingCache;
  (r !== null && r.delete(e),
    (e = Ve()),
    (t.pingedLanes |= t.suspendedLanes & n),
    Oe === t &&
      (Le & n) === n &&
      (Ee === 4 || (Ee === 3 && (Le & 130023424) === Le && 500 > ye() - Nu)
        ? zn(t, 0)
        : (Pu |= n)),
    et(t, e));
}
function rp(t, e) {
  e === 0 &&
    (t.mode & 1
      ? ((e = li), (li <<= 1), !(li & 130023424) && (li = 4194304))
      : (e = 1));
  var n = Ve();
  ((t = rn(t, e)), t !== null && (Ks(t, e, n), et(t, n)));
}
function ay(t) {
  var e = t.memoizedState,
    n = 0;
  (e !== null && (n = e.retryLane), rp(t, n));
}
function ly(t, e) {
  var n = 0;
  switch (t.tag) {
    case 13:
      var r = t.stateNode,
        s = t.memoizedState;
      s !== null && (n = s.retryLane);
      break;
    case 19:
      r = t.stateNode;
      break;
    default:
      throw Error(R(314));
  }
  (r !== null && r.delete(e), rp(t, n));
}
var sp;
sp = function (t, e, n) {
  if (t !== null)
    if (t.memoizedProps !== e.pendingProps || Xe.current) Ye = !0;
    else {
      if (!(t.lanes & n) && !(e.flags & 128)) return ((Ye = !1), Jm(t, e, n));
      Ye = !!(t.flags & 131072);
    }
  else ((Ye = !1), ae && e.flags & 1048576 && lf(e, io, e.index));
  switch (((e.lanes = 0), e.tag)) {
    case 2:
      var r = e.type;
      (Bi(t, e), (t = e.pendingProps));
      var s = Nr(e, ze.current);
      (Cr(e, n), (s = Tu(null, e, r, t, s, n)));
      var i = Cu();
      return (
        (e.flags |= 1),
        typeof s == "object" &&
        s !== null &&
        typeof s.render == "function" &&
        s.$$typeof === void 0
          ? ((e.tag = 1),
            (e.memoizedState = null),
            (e.updateQueue = null),
            Ze(r) ? ((i = !0), ro(e)) : (i = !1),
            (e.memoizedState =
              s.state !== null && s.state !== void 0 ? s.state : null),
            _u(e),
            (s.updater = $o),
            (e.stateNode = s),
            (s._reactInternals = e),
            gl(e, r, t, n),
            (e = vl(null, e, r, !0, i, n)))
          : ((e.tag = 0), ae && i && fu(e), He(null, e, s, n), (e = e.child)),
        e
      );
    case 16:
      r = e.elementType;
      e: {
        switch (
          (Bi(t, e),
          (t = e.pendingProps),
          (s = r._init),
          (r = s(r._payload)),
          (e.type = r),
          (s = e.tag = cy(r)),
          (t = bt(r, t)),
          s)
        ) {
          case 0:
            e = yl(null, e, r, t, n);
            break e;
          case 1:
            e = Fc(null, e, r, t, n);
            break e;
          case 11:
            e = Mc(null, e, r, t, n);
            break e;
          case 14:
            e = Bc(null, e, r, bt(r.type, t), n);
            break e;
        }
        throw Error(R(306, r, ""));
      }
      return e;
    case 0:
      return (
        (r = e.type),
        (s = e.pendingProps),
        (s = e.elementType === r ? s : bt(r, s)),
        yl(t, e, r, s, n)
      );
    case 1:
      return (
        (r = e.type),
        (s = e.pendingProps),
        (s = e.elementType === r ? s : bt(r, s)),
        Fc(t, e, r, s, n)
      );
    case 3:
      e: {
        if ((Ff(e), t === null)) throw Error(R(387));
        ((r = e.pendingProps),
          (i = e.memoizedState),
          (s = i.element),
          pf(t, e),
          lo(e, r, null, n));
        var o = e.memoizedState;
        if (((r = o.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (e.updateQueue.baseState = i),
            (e.memoizedState = i),
            e.flags & 256)
          ) {
            ((s = $r(Error(R(423)), e)), (e = zc(t, e, r, n, s)));
            break e;
          } else if (r !== s) {
            ((s = $r(Error(R(424)), e)), (e = zc(t, e, r, n, s)));
            break e;
          } else
            for (
              st = kn(e.stateNode.containerInfo.firstChild),
                it = e,
                ae = !0,
                Rt = null,
                n = hf(e, null, r, n),
                e.child = n;
              n;
            )
              ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
        else {
          if ((jr(), r === s)) {
            e = sn(t, e, n);
            break e;
          }
          He(t, e, r, n);
        }
        e = e.child;
      }
      return e;
    case 5:
      return (
        gf(e),
        t === null && hl(e),
        (r = e.type),
        (s = e.pendingProps),
        (i = t !== null ? t.memoizedProps : null),
        (o = s.children),
        al(r, s) ? (o = null) : i !== null && al(r, i) && (e.flags |= 32),
        Bf(t, e),
        He(t, e, o, n),
        e.child
      );
    case 6:
      return (t === null && hl(e), null);
    case 13:
      return zf(t, e, n);
    case 4:
      return (
        ku(e, e.stateNode.containerInfo),
        (r = e.pendingProps),
        t === null ? (e.child = Ir(e, null, r, n)) : He(t, e, r, n),
        e.child
      );
    case 11:
      return (
        (r = e.type),
        (s = e.pendingProps),
        (s = e.elementType === r ? s : bt(r, s)),
        Mc(t, e, r, s, n)
      );
    case 7:
      return (He(t, e, e.pendingProps, n), e.child);
    case 8:
      return (He(t, e, e.pendingProps.children, n), e.child);
    case 12:
      return (He(t, e, e.pendingProps.children, n), e.child);
    case 10:
      e: {
        if (
          ((r = e.type._context),
          (s = e.pendingProps),
          (i = e.memoizedProps),
          (o = s.value),
          ne(oo, r._currentValue),
          (r._currentValue = o),
          i !== null)
        )
          if (Nt(i.value, o)) {
            if (i.children === s.children && !Xe.current) {
              e = sn(t, e, n);
              break e;
            }
          } else
            for (i = e.child, i !== null && (i.return = e); i !== null;) {
              var a = i.dependencies;
              if (a !== null) {
                o = i.child;
                for (var l = a.firstContext; l !== null;) {
                  if (l.context === r) {
                    if (i.tag === 1) {
                      ((l = en(-1, n & -n)), (l.tag = 2));
                      var u = i.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var d = u.pending;
                        (d === null
                          ? (l.next = l)
                          : ((l.next = d.next), (d.next = l)),
                          (u.pending = l));
                      }
                    }
                    ((i.lanes |= n),
                      (l = i.alternate),
                      l !== null && (l.lanes |= n),
                      fl(i.return, n, e),
                      (a.lanes |= n));
                    break;
                  }
                  l = l.next;
                }
              } else if (i.tag === 10) o = i.type === e.type ? null : i.child;
              else if (i.tag === 18) {
                if (((o = i.return), o === null)) throw Error(R(341));
                ((o.lanes |= n),
                  (a = o.alternate),
                  a !== null && (a.lanes |= n),
                  fl(o, n, e),
                  (o = i.sibling));
              } else o = i.child;
              if (o !== null) o.return = i;
              else
                for (o = i; o !== null;) {
                  if (o === e) {
                    o = null;
                    break;
                  }
                  if (((i = o.sibling), i !== null)) {
                    ((i.return = o.return), (o = i));
                    break;
                  }
                  o = o.return;
                }
              i = o;
            }
        (He(t, e, s.children, n), (e = e.child));
      }
      return e;
    case 9:
      return (
        (s = e.type),
        (r = e.pendingProps.children),
        Cr(e, n),
        (s = mt(s)),
        (r = r(s)),
        (e.flags |= 1),
        He(t, e, r, n),
        e.child
      );
    case 14:
      return (
        (r = e.type),
        (s = bt(r, e.pendingProps)),
        (s = bt(r.type, s)),
        Bc(t, e, r, s, n)
      );
    case 15:
      return Uf(t, e, e.type, e.pendingProps, n);
    case 17:
      return (
        (r = e.type),
        (s = e.pendingProps),
        (s = e.elementType === r ? s : bt(r, s)),
        Bi(t, e),
        (e.tag = 1),
        Ze(r) ? ((t = !0), ro(e)) : (t = !1),
        Cr(e, n),
        Lf(e, r, s),
        gl(e, r, s, n),
        vl(null, e, r, !0, t, n)
      );
    case 19:
      return Hf(t, e, n);
    case 22:
      return Mf(t, e, n);
  }
  throw Error(R(156, e.tag));
};
function ip(t, e) {
  return Ph(t, e);
}
function uy(t, e, n, r) {
  ((this.tag = t),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = e),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null));
}
function pt(t, e, n, r) {
  return new uy(t, e, n, r);
}
function $u(t) {
  return ((t = t.prototype), !(!t || !t.isReactComponent));
}
function cy(t) {
  if (typeof t == "function") return $u(t) ? 1 : 0;
  if (t != null) {
    if (((t = t.$$typeof), t === tu)) return 11;
    if (t === nu) return 14;
  }
  return 2;
}
function Tn(t, e) {
  var n = t.alternate;
  return (
    n === null
      ? ((n = pt(t.tag, e, t.key, t.mode)),
        (n.elementType = t.elementType),
        (n.type = t.type),
        (n.stateNode = t.stateNode),
        (n.alternate = t),
        (t.alternate = n))
      : ((n.pendingProps = e),
        (n.type = t.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = t.flags & 14680064),
    (n.childLanes = t.childLanes),
    (n.lanes = t.lanes),
    (n.child = t.child),
    (n.memoizedProps = t.memoizedProps),
    (n.memoizedState = t.memoizedState),
    (n.updateQueue = t.updateQueue),
    (e = t.dependencies),
    (n.dependencies =
      e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }),
    (n.sibling = t.sibling),
    (n.index = t.index),
    (n.ref = t.ref),
    n
  );
}
function Hi(t, e, n, r, s, i) {
  var o = 2;
  if (((r = t), typeof t == "function")) $u(t) && (o = 1);
  else if (typeof t == "string") o = 5;
  else
    e: switch (t) {
      case cr:
        return Hn(n.children, s, i, e);
      case eu:
        ((o = 8), (s |= 8));
        break;
      case Ma:
        return (
          (t = pt(12, n, e, s | 2)),
          (t.elementType = Ma),
          (t.lanes = i),
          t
        );
      case Ba:
        return ((t = pt(13, n, e, s)), (t.elementType = Ba), (t.lanes = i), t);
      case Fa:
        return ((t = pt(19, n, e, s)), (t.elementType = Fa), (t.lanes = i), t);
      case ph:
        return Mo(n, s, i, e);
      default:
        if (typeof t == "object" && t !== null)
          switch (t.$$typeof) {
            case hh:
              o = 10;
              break e;
            case fh:
              o = 9;
              break e;
            case tu:
              o = 11;
              break e;
            case nu:
              o = 14;
              break e;
            case cn:
              ((o = 16), (r = null));
              break e;
          }
        throw Error(R(130, t == null ? t : typeof t, ""));
    }
  return (
    (e = pt(o, n, e, s)),
    (e.elementType = t),
    (e.type = r),
    (e.lanes = i),
    e
  );
}
function Hn(t, e, n, r) {
  return ((t = pt(7, t, r, e)), (t.lanes = n), t);
}
function Mo(t, e, n, r) {
  return (
    (t = pt(22, t, r, e)),
    (t.elementType = ph),
    (t.lanes = n),
    (t.stateNode = { isHidden: !1 }),
    t
  );
}
function _a(t, e, n) {
  return ((t = pt(6, t, null, e)), (t.lanes = n), t);
}
function ka(t, e, n) {
  return (
    (e = pt(4, t.children !== null ? t.children : [], t.key, e)),
    (e.lanes = n),
    (e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation,
    }),
    e
  );
}
function dy(t, e, n, r, s) {
  ((this.tag = e),
    (this.containerInfo = t),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = ta(0)),
    (this.expirationTimes = ta(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = ta(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = s),
    (this.mutableSourceEagerHydrationData = null));
}
function Du(t, e, n, r, s, i, o, a, l) {
  return (
    (t = new dy(t, e, n, a, l)),
    e === 1 ? ((e = 1), i === !0 && (e |= 8)) : (e = 0),
    (i = pt(3, null, null, e)),
    (t.current = i),
    (i.stateNode = t),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    _u(i),
    t
  );
}
function hy(t, e, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: ur,
    key: r == null ? null : "" + r,
    children: t,
    containerInfo: e,
    implementation: n,
  };
}
function op(t) {
  if (!t) return Rn;
  t = t._reactInternals;
  e: {
    if (Qn(t) !== t || t.tag !== 1) throw Error(R(170));
    var e = t;
    do {
      switch (e.tag) {
        case 3:
          e = e.stateNode.context;
          break e;
        case 1:
          if (Ze(e.type)) {
            e = e.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      e = e.return;
    } while (e !== null);
    throw Error(R(171));
  }
  if (t.tag === 1) {
    var n = t.type;
    if (Ze(n)) return of(t, n, e);
  }
  return e;
}
function ap(t, e, n, r, s, i, o, a, l) {
  return (
    (t = Du(n, r, !0, t, s, i, o, a, l)),
    (t.context = op(null)),
    (n = t.current),
    (r = Ve()),
    (s = bn(n)),
    (i = en(r, s)),
    (i.callback = e ?? null),
    Sn(n, i, s),
    (t.current.lanes = s),
    Ks(t, s, r),
    et(t, r),
    t
  );
}
function Bo(t, e, n, r) {
  var s = e.current,
    i = Ve(),
    o = bn(s);
  return (
    (n = op(n)),
    e.context === null ? (e.context = n) : (e.pendingContext = n),
    (e = en(i, o)),
    (e.payload = { element: t }),
    (r = r === void 0 ? null : r),
    r !== null && (e.callback = r),
    (t = Sn(s, e, o)),
    t !== null && (Pt(t, s, o, i), Di(t, s, o)),
    o
  );
}
function yo(t) {
  if (((t = t.current), !t.child)) return null;
  switch (t.child.tag) {
    case 5:
      return t.child.stateNode;
    default:
      return t.child.stateNode;
  }
}
function Xc(t, e) {
  if (((t = t.memoizedState), t !== null && t.dehydrated !== null)) {
    var n = t.retryLane;
    t.retryLane = n !== 0 && n < e ? n : e;
  }
}
function Uu(t, e) {
  (Xc(t, e), (t = t.alternate) && Xc(t, e));
}
function fy() {
  return null;
}
var lp = typeof reportError == "function" ? reportError : function (t) {};
function Mu(t) {
  this._internalRoot = t;
}
Fo.prototype.render = Mu.prototype.render = function (t) {
  var e = this._internalRoot;
  if (e === null) throw Error(R(409));
  Bo(t, e, null, null);
};
Fo.prototype.unmount = Mu.prototype.unmount = function () {
  var t = this._internalRoot;
  if (t !== null) {
    this._internalRoot = null;
    var e = t.containerInfo;
    (Gn(function () {
      Bo(null, t, null, null);
    }),
      (e[nn] = null));
  }
};
function Fo(t) {
  this._internalRoot = t;
}
Fo.prototype.unstable_scheduleHydration = function (t) {
  if (t) {
    var e = Uh();
    t = { blockedOn: null, target: t, priority: e };
    for (var n = 0; n < hn.length && e !== 0 && e < hn[n].priority; n++);
    (hn.splice(n, 0, t), n === 0 && Bh(t));
  }
};
function Bu(t) {
  return !(!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11));
}
function zo(t) {
  return !(
    !t ||
    (t.nodeType !== 1 &&
      t.nodeType !== 9 &&
      t.nodeType !== 11 &&
      (t.nodeType !== 8 || t.nodeValue !== " react-mount-point-unstable "))
  );
}
function Zc() {}
function py(t, e, n, r, s) {
  if (s) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var u = yo(o);
        i.call(u);
      };
    }
    var o = ap(e, r, t, 0, null, !1, !1, "", Zc);
    return (
      (t._reactRootContainer = o),
      (t[nn] = o.current),
      Cs(t.nodeType === 8 ? t.parentNode : t),
      Gn(),
      o
    );
  }
  for (; (s = t.lastChild);) t.removeChild(s);
  if (typeof r == "function") {
    var a = r;
    r = function () {
      var u = yo(l);
      a.call(u);
    };
  }
  var l = Du(t, 0, !1, null, null, !1, !1, "", Zc);
  return (
    (t._reactRootContainer = l),
    (t[nn] = l.current),
    Cs(t.nodeType === 8 ? t.parentNode : t),
    Gn(function () {
      Bo(e, l, n, r);
    }),
    l
  );
}
function Ho(t, e, n, r, s) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof s == "function") {
      var a = s;
      s = function () {
        var l = yo(o);
        a.call(l);
      };
    }
    Bo(e, o, t, s);
  } else o = py(n, e, t, s, r);
  return yo(o);
}
$h = function (t) {
  switch (t.tag) {
    case 3:
      var e = t.stateNode;
      if (e.current.memoizedState.isDehydrated) {
        var n = ts(e.pendingLanes);
        n !== 0 &&
          (iu(e, n | 1), et(e, ye()), !(q & 6) && ((Dr = ye() + 500), On()));
      }
      break;
    case 13:
      (Gn(function () {
        var r = rn(t, 1);
        if (r !== null) {
          var s = Ve();
          Pt(r, t, 1, s);
        }
      }),
        Uu(t, 1));
  }
};
ou = function (t) {
  if (t.tag === 13) {
    var e = rn(t, 134217728);
    if (e !== null) {
      var n = Ve();
      Pt(e, t, 134217728, n);
    }
    Uu(t, 134217728);
  }
};
Dh = function (t) {
  if (t.tag === 13) {
    var e = bn(t),
      n = rn(t, e);
    if (n !== null) {
      var r = Ve();
      Pt(n, t, e, r);
    }
    Uu(t, e);
  }
};
Uh = function () {
  return X;
};
Mh = function (t, e) {
  var n = X;
  try {
    return ((X = t), e());
  } finally {
    X = n;
  }
};
Ya = function (t, e, n) {
  switch (e) {
    case "input":
      if ((Va(t, n), (e = n.name), n.type === "radio" && e != null)) {
        for (n = t; n.parentNode;) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + e) + '][type="radio"]',
          ),
            e = 0;
          e < n.length;
          e++
        ) {
          var r = n[e];
          if (r !== t && r.form === t.form) {
            var s = jo(r);
            if (!s) throw Error(R(90));
            (mh(r), Va(r, s));
          }
        }
      }
      break;
    case "textarea":
      vh(t, n);
      break;
    case "select":
      ((e = n.value), e != null && Sr(t, !!n.multiple, e, !1));
  }
};
Th = ju;
Ch = Gn;
var gy = { usingClientEntryPoint: !1, Events: [Gs, pr, jo, Eh, bh, ju] },
  Qr = {
    findFiberByHostInstance: Dn,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  my = {
    bundleType: Qr.bundleType,
    version: Qr.version,
    rendererPackageName: Qr.rendererPackageName,
    rendererConfig: Qr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: on.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (t) {
      return ((t = Ah(t)), t === null ? null : t.stateNode);
    },
    findFiberByHostInstance: Qr.findFiberByHostInstance || fy,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var wi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wi.isDisabled && wi.supportsFiber)
    try {
      ((Ao = wi.inject(my)), (Mt = wi));
    } catch {}
}
at.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = gy;
at.createPortal = function (t, e) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Bu(e)) throw Error(R(200));
  return hy(t, e, null, n);
};
at.createRoot = function (t, e) {
  if (!Bu(t)) throw Error(R(299));
  var n = !1,
    r = "",
    s = lp;
  return (
    e != null &&
      (e.unstable_strictMode === !0 && (n = !0),
      e.identifierPrefix !== void 0 && (r = e.identifierPrefix),
      e.onRecoverableError !== void 0 && (s = e.onRecoverableError)),
    (e = Du(t, 1, !1, null, null, n, !1, r, s)),
    (t[nn] = e.current),
    Cs(t.nodeType === 8 ? t.parentNode : t),
    new Mu(e)
  );
};
at.findDOMNode = function (t) {
  if (t == null) return null;
  if (t.nodeType === 1) return t;
  var e = t._reactInternals;
  if (e === void 0)
    throw typeof t.render == "function"
      ? Error(R(188))
      : ((t = Object.keys(t).join(",")), Error(R(268, t)));
  return ((t = Ah(e)), (t = t === null ? null : t.stateNode), t);
};
at.flushSync = function (t) {
  return Gn(t);
};
at.hydrate = function (t, e, n) {
  if (!zo(e)) throw Error(R(200));
  return Ho(null, t, e, !0, n);
};
at.hydrateRoot = function (t, e, n) {
  if (!Bu(t)) throw Error(R(405));
  var r = (n != null && n.hydratedSources) || null,
    s = !1,
    i = "",
    o = lp;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (s = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (o = n.onRecoverableError)),
    (e = ap(e, null, t, 1, n ?? null, s, !1, i, o)),
    (t[nn] = e.current),
    Cs(t),
    r)
  )
    for (t = 0; t < r.length; t++)
      ((n = r[t]),
        (s = n._getVersion),
        (s = s(n._source)),
        e.mutableSourceEagerHydrationData == null
          ? (e.mutableSourceEagerHydrationData = [n, s])
          : e.mutableSourceEagerHydrationData.push(n, s));
  return new Fo(e);
};
at.render = function (t, e, n) {
  if (!zo(e)) throw Error(R(200));
  return Ho(null, t, e, !1, n);
};
at.unmountComponentAtNode = function (t) {
  if (!zo(t)) throw Error(R(40));
  return t._reactRootContainer
    ? (Gn(function () {
        Ho(null, null, t, !1, function () {
          ((t._reactRootContainer = null), (t[nn] = null));
        });
      }),
      !0)
    : !1;
};
at.unstable_batchedUpdates = ju;
at.unstable_renderSubtreeIntoContainer = function (t, e, n, r) {
  if (!zo(n)) throw Error(R(200));
  if (t == null || t._reactInternals === void 0) throw Error(R(38));
  return Ho(t, e, n, !1, r);
};
at.version = "18.3.1-next-f1338f8080-20240426";
function up() {
  if (!(
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
  ))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(up);
    } catch {}
}
(up(), (lh.exports = at));
var yy = lh.exports,
  cp,
  ed = yy;
((cp = ed.createRoot), ed.hydrateRoot);
function vy(t) {
  const e = t.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    n = e.match(/^(.*?)(:)(.*)$/);
  return n ? { before: n[1], after: n[3] } : { before: e, after: "" };
}
function wy() {
  const [t, e] = _.useState(() => new Date());
  _.useEffect(() => {
    let i;
    const o = () => {
      const a = new Date();
      (e(a), (i = setTimeout(o, 1e3 - a.getMilliseconds())));
    };
    return (
      (i = setTimeout(o, 1e3 - new Date().getMilliseconds())),
      () => clearTimeout(i)
    );
  }, []);
  const { before: n, after: r } = vy(t),
    s = t.getSeconds() % 2 === 0;
  return w.jsxs("time", {
    className: "clock",
    dateTime: t.toISOString(),
    "aria-label": `Current time ${n}:${r}`,
    children: [
      w.jsx("span", { className: "clock__digits", children: n }),
      w.jsx("span", {
        className: `clock__colon${s ? " is-on" : ""}`,
        "aria-hidden": "true",
        children: ":",
      }),
      w.jsx("span", { className: "clock__digits", children: r }),
    ],
  });
}
const tt = { viewBox: "0 0 24 24", "aria-hidden": !0, focusable: !1 },
  _y = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "currentColor",
        d: "M8 5.14v13.72a1 1 0 0 0 1.53.85l10.8-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z",
      }),
    }),
  ky = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "currentColor",
        d: "M7 4h3.5v16H7zM13.5 4H17v16h-3.5z",
      }),
    }),
  Sy = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "currentColor",
        d: "M7 5.5a1 1 0 0 1 2 0v5.19l8.4-5.34A1 1 0 0 1 19 6.2v11.6a1 1 0 0 1-1.6.85L9 13.31V18.5a1 1 0 0 1-2 0Z",
      }),
    }),
  Ey = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "currentColor",
        d: "M17 5.5a1 1 0 0 0-2 0v5.19L6.6 5.35A1 1 0 0 0 5 6.2v11.6a1 1 0 0 0 1.6.85L15 13.31V18.5a1 1 0 0 0 2 0Z",
      }),
    }),
  by = (t) =>
    w.jsxs("svg", {
      ...tt,
      ...t,
      children: [
        w.jsx("path", {
          fill: "currentColor",
          d: "M4 9.5h3.2L12 5.4a.8.8 0 0 1 1.3.6v12a.8.8 0 0 1-1.3.6L7.2 14.5H4a.8.8 0 0 1-.8-.8v-3.4a.8.8 0 0 1 .8-.8Z",
        }),
        w.jsx("path", {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.9",
          strokeLinecap: "round",
          d: "M16.4 9.3a3.7 3.7 0 0 1 0 5.4M19 6.8a7.3 7.3 0 0 1 0 10.4",
        }),
      ],
    }),
  Ty = (t) =>
    w.jsxs("svg", {
      ...tt,
      ...t,
      children: [
        w.jsx("path", {
          fill: "currentColor",
          d: "M4 9.5h3.2L12 5.4a.8.8 0 0 1 1.3.6v12a.8.8 0 0 1-1.3.6L7.2 14.5H4a.8.8 0 0 1-.8-.8v-3.4a.8.8 0 0 1 .8-.8Z",
        }),
        w.jsx("path", {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          d: "m16.5 9.5 5 5M21.5 9.5l-5 5",
        }),
      ],
    }),
  Cy = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "currentColor",
        d: "M20 3.5v11.9a3.3 3.3 0 1 1-2-3V8.2l-7 1.6v8.1a3.3 3.3 0 1 1-2-3V6.6Z",
      }),
    }),
  dp =
    "M12 20.4c-.3 0-.6-.1-.8-.3l-6.3-5.8A5.4 5.4 0 0 1 12 6.7a5.4 5.4 0 0 1 7.1 7.6l-6.3 5.8c-.2.2-.5.3-.8.3Z",
  Ry = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.8",
        strokeLinejoin: "round",
        d: dp,
      }),
    }),
  xy = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", { fill: "currentColor", d: dp }),
    }),
  Ay = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.9",
        strokeLinecap: "round",
        d: "M12 3.8a8.2 8.2 0 1 0 0 16.4 8.2 8.2 0 0 0 0-16.4ZM6.2 6.2l11.6 11.6",
      }),
    }),
  Oy = (t) =>
    w.jsxs("svg", {
      ...tt,
      ...t,
      children: [
        w.jsx("path", {
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.9",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M9.3 9a2.8 2.8 0 1 1 3.5 2.7c-.5.2-.8.6-.8 1.1v.9",
        }),
        w.jsx("circle", {
          cx: "12",
          cy: "17.2",
          r: "1.15",
          fill: "currentColor",
        }),
      ],
    }),
  Py = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.9",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M19.5 11.2a7.5 7.5 0 0 0-13.2-3.7M4.5 12.8a7.5 7.5 0 0 0 13.2 3.7M6 4v3.8h3.8M18 20v-3.8h-3.8",
      }),
    }),
  Ny = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        d: "m6.5 6.5 11 11M17.5 6.5l-11 11",
      }),
    }),
  jy = (t) =>
    w.jsx("svg", {
      ...tt,
      ...t,
      children: w.jsx("path", {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.9",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M13.5 5.5H18.5V10.5M18.5 5.5 11 13M16 14.2v3.3a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h3.3",
      }),
    }),
  ie = {
    STATIONS: [
      {
        name: "Monsoon & Tea",
        freq: "98.3",
        playlist: "RDCLAK5uy_nlKphX00YtBNjlGZcmPifGNAPXUSjezNM",
      },
      {
        name: "Refreshing",
        freq: "93.5",
        playlist: "PL0Z67tlyTaWphlJ8dod2fSFGmBlUW_KJJ",
      },
      {
        name: "Baati-Chokha",
        freq: "91.1",
        playlist: "RDCLAK5uy_n7VIYx-oWOJQanlpBG6GRyLZxpWYMltB8",
      },
      {
        name: "Bangers",
        freq: "101.7",
        playlist: "PL-xfXH-OeuD-9SorMGuNPpPO1ubj7j8Qb",
      },
      {
        name: "Patiala",
        freq: "108.7",
        playlist: "PLO7-VO1D0_6NYoMAN0XncJu4tvibirSmN",
      },
      {
        name: "Mehfil",
        freq: "104.8",
        playlist: "PLTu1dSkMBtEy_WyGwvW8xUR-udmlJzsiU",
      },
      {
        name: "80's",
        freq: "80.5",
        playlist: "PL4IG-Xsx8-1IZuQDgBDGA1RBO1DPaT8iX",
      },
      {
        name: "90's",
        freq: "90.9",
        playlist: "PLbN4o30dcPIs3OgCS4F1GKrDg_soMJdjt",
      },
      {
        name: "Favourite",
        freq: "95.8",
        playlist: "PL4IG-Xsx8-1KqvAE_EZttzypx0iUzM4sO",
      },
    ],
    PLAYLIST_IDS: [],
    SHOW_TUNER: !0,
    TUNE_STATIC: !0,
    TUNE_IN_MIDSONG: !1,
    SITE_NAME: "Vibe Room",
    TAGLINE: "90s & 2000s Bollywood, on loop.",
    START_SHUFFLED: !0,
    DEFAULT_VOLUME: 70,
    BACKGROUND_KEEPALIVE: !0,
    IDLE_HIDE_SECONDS: 20,
    COVER_COLOR_BLEED: !0,
    SHOW_PRESENCE_COUNTER: !0,
    PRESENCE_ROOM: "vibe-room-fm",
    ENABLE_ROOMS: !0,
    ROOM_SYNC_SECONDS: 5,
    REACTIONS: ["❤️", "🔥", "💃", "😂","😭","💔"],
  },
  Iy = "https://nqfqfxwaiqkmdwwtxcwd.supabase.co",
  Ly = "sb_publishable_WxTUHQb5IQFFyus7ZJyXMQ_0_t_QuaO",
  $y = Symbol.for("@supabase/supabase-js.traceContextExtractor");
function Dy() {
  return globalThis[$y];
}
function Vo(t, e) {
  var n = {};
  for (var r in t)
    Object.prototype.hasOwnProperty.call(t, r) &&
      e.indexOf(r) < 0 &&
      (n[r] = t[r]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, r = Object.getOwnPropertySymbols(t); s < r.length; s++)
      e.indexOf(r[s]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(t, r[s]) &&
        (n[r[s]] = t[r[s]]);
  return n;
}
function Uy(t, e, n, r) {
  function s(i) {
    return i instanceof n
      ? i
      : new n(function (o) {
          o(i);
        });
  }
  return new (n || (n = Promise))(function (i, o) {
    function a(d) {
      try {
        u(r.next(d));
      } catch (c) {
        o(c);
      }
    }
    function l(d) {
      try {
        u(r.throw(d));
      } catch (c) {
        o(c);
      }
    }
    function u(d) {
      d.done ? i(d.value) : s(d.value).then(a, l);
    }
    u((r = r.apply(t, e || [])).next());
  });
}
const My = (t) => (t ? (...e) => t(...e) : (...e) => fetch(...e));
class Fu extends Error {
  constructor(e, n = "FunctionsError", r) {
    (super(e), (this.name = n), (this.context = r));
  }
  toJSON() {
    return { name: this.name, message: this.message, context: this.context };
  }
}
class By extends Fu {
  constructor(e) {
    super(
      "Failed to send a request to the Edge Function",
      "FunctionsFetchError",
      e,
    );
  }
}
class td extends Fu {
  constructor(e) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
  }
}
class nd extends Fu {
  constructor(e) {
    super(
      "Edge Function returned a non-2xx status code",
      "FunctionsHttpError",
      e,
    );
  }
}
var Ol;
(function (t) {
  ((t.Any = "any"),
    (t.ApNortheast1 = "ap-northeast-1"),
    (t.ApNortheast2 = "ap-northeast-2"),
    (t.ApSouth1 = "ap-south-1"),
    (t.ApSoutheast1 = "ap-southeast-1"),
    (t.ApSoutheast2 = "ap-southeast-2"),
    (t.CaCentral1 = "ca-central-1"),
    (t.EuCentral1 = "eu-central-1"),
    (t.EuWest1 = "eu-west-1"),
    (t.EuWest2 = "eu-west-2"),
    (t.EuWest3 = "eu-west-3"),
    (t.SaEast1 = "sa-east-1"),
    (t.UsEast1 = "us-east-1"),
    (t.UsWest1 = "us-west-1"),
    (t.UsWest2 = "us-west-2"));
})(Ol || (Ol = {}));
class Fy {
  constructor(e, { headers: n = {}, customFetch: r, region: s = Ol.Any } = {}) {
    ((this.url = e),
      (this.headers = n),
      (this.region = s),
      (this.fetch = My(r)));
  }
  setAuth(e) {
    this.headers.Authorization = `Bearer ${e}`;
  }
  invoke(e) {
    return Uy(this, arguments, void 0, function* (n, r = {}) {
      var s, i;
      let o, a, l;
      try {
        const { headers: u, method: d, body: c, signal: h, timeout: g } = r;
        let y = {},
          { region: v } = r;
        v || (v = this.region);
        const k = new URL(`${this.url}/${n}`);
        v &&
          v !== "any" &&
          ((y["x-region"] = v), k.searchParams.set("forceFunctionRegion", v));
        let p;
        const f =
          !!u && Object.keys(u).some((x) => x.toLowerCase() === "content-type");
        c && !f
          ? (typeof Blob < "u" && c instanceof Blob) || c instanceof ArrayBuffer
            ? ((y["Content-Type"] = "application/octet-stream"), (p = c))
            : typeof c == "string"
              ? ((y["Content-Type"] = "text/plain"), (p = c))
              : typeof FormData < "u" && c instanceof FormData
                ? (p = c)
                : ((y["Content-Type"] = "application/json"),
                  (p = JSON.stringify(c)))
          : c &&
              typeof c != "string" &&
              !(typeof Blob < "u" && c instanceof Blob) &&
              !(c instanceof ArrayBuffer) &&
              !(typeof FormData < "u" && c instanceof FormData)
            ? (p = JSON.stringify(c))
            : (p = c);
        let m = h;
        g &&
          ((a = new AbortController()),
          (o = setTimeout(() => a.abort(), g)),
          h
            ? ((m = a.signal),
              (l = () => a.abort()),
              h.addEventListener("abort", l))
            : (m = a.signal));
        const S = yield this.fetch(k.toString(), {
            method: d || "POST",
            headers: Object.assign(
              Object.assign(Object.assign({}, y), this.headers),
              u,
            ),
            body: p,
            signal: m,
          }).catch((x) => {
            throw new By(x);
          }),
          C = S.headers.get("x-relay-error");
        if (C && C === "true") throw new td(S);
        if (!S.ok) throw new nd(S);
        let E = (
            (s = S.headers.get("Content-Type")) !== null && s !== void 0
              ? s
              : "text/plain"
          )
            .split(";")[0]
            .trim()
            .toLowerCase(),
          T;
        return (
          E === "application/json"
            ? (T = yield S.json())
            : E === "application/octet-stream" || E === "application/pdf"
              ? (T = yield S.blob())
              : E === "text/event-stream"
                ? (T = S)
                : E === "multipart/form-data"
                  ? (T = yield S.formData())
                  : (T = yield S.text()),
          { data: T, error: null, response: S }
        );
      } catch (u) {
        return {
          data: null,
          error: u,
          response: u instanceof nd || u instanceof td ? u.context : void 0,
        };
      } finally {
        (o && clearTimeout(o),
          l &&
            ((i = r.signal) === null ||
              i === void 0 ||
              i.removeEventListener("abort", l)));
      }
    });
  }
}
const hp = 3,
  rd = (t) => Math.min(1e3 * 2 ** t, 3e4),
  zy = [520, 503],
  fp = ["GET", "HEAD", "OPTIONS"];
var Sa = class extends Error {
  constructor(t) {
    (super(t.message),
      (this.name = "PostgrestError"),
      (this.details = t.details),
      (this.hint = t.hint),
      (this.code = t.code));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      details: this.details,
      hint: this.hint,
      code: this.code,
    };
  }
};
function Ls(t) {
  "@babel/helpers - typeof";
  return (
    (Ls =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    Ls(t)
  );
}
function Hy(t, e) {
  if (Ls(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e);
    if (Ls(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Vy(t) {
  var e = Hy(t, "string");
  return Ls(e) == "symbol" ? e : e + "";
}
function Wy(t, e, n) {
  return (
    (e = Vy(e)) in t
      ? Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = n),
    t
  );
}
function sd(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    (e &&
      (r = r.filter(function (s) {
        return Object.getOwnPropertyDescriptor(t, s).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function kr(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? sd(Object(n), !0).forEach(function (r) {
          Wy(t, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : sd(Object(n)).forEach(function (r) {
            Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return t;
}
function id(t, e) {
  return new Promise((n) => {
    if (e != null && e.aborted) {
      n();
      return;
    }
    const r = setTimeout(() => {
      (e == null || e.removeEventListener("abort", s), n());
    }, t);
    function s() {
      (clearTimeout(r), n());
    }
    e == null || e.addEventListener("abort", s);
  });
}
function Ky(t, e, n, r) {
  return !(!r || n >= hp || !fp.includes(t) || !zy.includes(e));
}
var qy = class {
    constructor(t) {
      var e, n, r, s, i;
      ((this.shouldThrowOnError = !1),
        (this.retryEnabled = !0),
        (this.method = t.method),
        (this.url = t.url),
        (this.headers = new Headers(t.headers)),
        (this.schema = t.schema),
        (this.body = t.body),
        (this.shouldThrowOnError =
          (e = t.shouldThrowOnError) !== null && e !== void 0 ? e : !1),
        (this.signal = t.signal),
        (this.isMaybeSingle =
          (n = t.isMaybeSingle) !== null && n !== void 0 ? n : !1),
        (this.shouldStripNulls =
          (r = t.shouldStripNulls) !== null && r !== void 0 ? r : !1),
        (this.urlLengthLimit =
          (s = t.urlLengthLimit) !== null && s !== void 0 ? s : 8e3),
        (this.retryEnabled = (i = t.retry) !== null && i !== void 0 ? i : !0),
        t.fetch ? (this.fetch = t.fetch) : (this.fetch = fetch));
    }
    throwOnError() {
      return ((this.shouldThrowOnError = !0), this);
    }
    stripNulls() {
      if (this.headers.get("Accept") === "text/csv")
        throw new Error("stripNulls() cannot be used with csv()");
      return ((this.shouldStripNulls = !0), this);
    }
    setHeader(t, e) {
      return (
        (this.headers = new Headers(this.headers)),
        this.headers.set(t, e),
        this
      );
    }
    retry(t) {
      return ((this.retryEnabled = t), this);
    }
    then(t, e) {
      var n = this;
      if (
        (this.schema === void 0 ||
          (["GET", "HEAD"].includes(this.method)
            ? this.headers.set("Accept-Profile", this.schema)
            : this.headers.set("Content-Profile", this.schema)),
        this.method !== "GET" &&
          this.method !== "HEAD" &&
          this.headers.set("Content-Type", "application/json"),
        this.shouldStripNulls)
      ) {
        const o = this.headers.get("Accept");
        o === "application/vnd.pgrst.object+json"
          ? this.headers.set(
              "Accept",
              "application/vnd.pgrst.object+json;nulls=stripped",
            )
          : (!o || o === "application/json") &&
            this.headers.set(
              "Accept",
              "application/vnd.pgrst.array+json;nulls=stripped",
            );
      }
      const r = this.fetch;
      let i = (async () => {
        let o = 0;
        for (;;) {
          const u = {};
          (n.headers.forEach((c, h) => {
            u[h] = c;
          }),
            o > 0 && (u["X-Retry-Count"] = String(o)));
          let d;
          try {
            d = await r(n.url.toString(), {
              method: n.method,
              headers: u,
              body: JSON.stringify(n.body, (c, h) =>
                typeof h == "bigint" ? h.toString() : h,
              ),
              signal: n.signal,
            });
          } catch (c) {
            if (
              (c == null ? void 0 : c.name) === "AbortError" ||
              (c == null ? void 0 : c.code) === "ABORT_ERR" ||
              !fp.includes(n.method)
            )
              throw c;
            if (n.retryEnabled && o < hp) {
              const h = rd(o);
              (o++, await id(h, n.signal));
              continue;
            }
            throw c;
          }
          if (Ky(n.method, d.status, o, n.retryEnabled)) {
            var a, l;
            const c =
                (a =
                  (l = d.headers) === null || l === void 0
                    ? void 0
                    : l.get("Retry-After")) !== null && a !== void 0
                  ? a
                  : null,
              h = c !== null ? Math.max(0, parseInt(c, 10) || 0) * 1e3 : rd(o);
            (await d.text(), o++, await id(h, n.signal));
            continue;
          }
          return await n.processResponse(d);
        }
      })();
      return (
        this.shouldThrowOnError ||
          (i = i.catch((o) => {
            var a;
            let l = "",
              u = "",
              d = "";
            const c = o == null ? void 0 : o.cause;
            if (c) {
              var h, g, y, v;
              const f =
                  (h = c == null ? void 0 : c.message) !== null && h !== void 0
                    ? h
                    : "",
                m =
                  (g = c == null ? void 0 : c.code) !== null && g !== void 0
                    ? g
                    : "";
              ((l = `${(y = o == null ? void 0 : o.name) !== null && y !== void 0 ? y : "FetchError"}: ${o == null ? void 0 : o.message}`),
                (l += `

Caused by: ${(v = c == null ? void 0 : c.name) !== null && v !== void 0 ? v : "Error"}: ${f}`),
                m && (l += ` (${m})`),
                c != null &&
                  c.stack &&
                  (l += `
${c.stack}`));
            } else {
              var k;
              l =
                (k = o == null ? void 0 : o.stack) !== null && k !== void 0
                  ? k
                  : "";
            }
            const p = this.url.toString().length;
            return (
              (o == null ? void 0 : o.name) === "AbortError" ||
              (o == null ? void 0 : o.code) === "ABORT_ERR"
                ? ((d = ""),
                  (u = "Request was aborted (timeout or manual cancellation)"),
                  p > this.urlLengthLimit &&
                    (u += `. Note: Your request URL is ${p} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`))
                : ((c == null ? void 0 : c.name) === "HeadersOverflowError" ||
                    (c == null ? void 0 : c.code) ===
                      "UND_ERR_HEADERS_OVERFLOW") &&
                  ((d = ""),
                  (u = "HTTP headers exceeded server limits (typically 16KB)"),
                  p > this.urlLengthLimit &&
                    (u += `. Your request URL is ${p} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),
              {
                success: !1,
                error: {
                  message: `${(a = o == null ? void 0 : o.name) !== null && a !== void 0 ? a : "FetchError"}: ${o == null ? void 0 : o.message}`,
                  details: l,
                  hint: u,
                  code: d,
                },
                data: null,
                count: null,
                status: 0,
                statusText: "",
              }
            );
          })),
        i.then(t, e)
      );
    }
    async processResponse(t) {
      var e = this;
      let n = null,
        r = null,
        s = null,
        i = t.status,
        o = t.statusText;
      if (t.ok) {
        var a, l;
        if (e.method !== "HEAD") {
          var u;
          const g = await t.text();
          if (g !== "")
            if (e.headers.get("Accept") === "text/csv") r = g;
            else if (
              e.headers.get("Accept") &&
              !((u = e.headers.get("Accept")) === null || u === void 0) &&
              u.includes("application/vnd.pgrst.plan+text")
            )
              r = g;
            else
              try {
                r = JSON.parse(g);
              } catch {
                if (((n = { message: g }), (r = null), e.shouldThrowOnError))
                  throw new Sa({ message: g, details: "", hint: "", code: "" });
              }
        }
        const c =
            (a = e.headers.get("Prefer")) === null || a === void 0
              ? void 0
              : a.match(/count=(exact|planned|estimated)/),
          h =
            (l = t.headers.get("content-range")) === null || l === void 0
              ? void 0
              : l.split("/");
        if (
          (c && h && h.length > 1 && (s = parseInt(h[1])),
          e.isMaybeSingle && Array.isArray(r))
        )
          if (r.length > 1) {
            if (
              ((n = {
                code: "PGRST116",
                details: `Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                hint: null,
                message:
                  "JSON object requested, multiple (or no) rows returned",
              }),
              (r = null),
              (s = null),
              (i = 406),
              (o = "Not Acceptable"),
              e.shouldThrowOnError)
            ) {
              var d;
              throw new Sa(
                kr(
                  kr({}, n),
                  {},
                  { hint: (d = n.hint) !== null && d !== void 0 ? d : "" },
                ),
              );
            }
          } else r.length === 1 ? (r = r[0]) : (r = null);
      } else {
        const c = await t.text();
        try {
          ((n = JSON.parse(c)),
            Array.isArray(n) &&
              t.status === 404 &&
              ((r = []), (n = null), (i = 200), (o = "OK")));
        } catch {
          t.status === 404 && c === ""
            ? ((i = 204), (o = "No Content"))
            : (n = { message: c });
        }
        if (n && e.shouldThrowOnError) throw new Sa(n);
      }
      return {
        success: n === null,
        error: n,
        data: r,
        count: s,
        status: i,
        statusText: o,
      };
    }
    returns() {
      return this;
    }
    overrideTypes() {
      return this;
    }
  },
  Gy = class extends qy {
    throwOnError() {
      return super.throwOnError();
    }
    select(t) {
      let e = !1;
      const n = (t ?? "*")
        .split("")
        .map((r) => (/\s/.test(r) && !e ? "" : (r === '"' && (e = !e), r)))
        .join("");
      return (
        this.url.searchParams.set("select", n),
        this.headers.append("Prefer", "return=representation"),
        this
      );
    }
    order(
      t,
      {
        ascending: e = !0,
        nullsFirst: n,
        foreignTable: r,
        referencedTable: s = r,
      } = {},
    ) {
      const i = s ? `${s}.order` : "order",
        o = this.url.searchParams.get(i);
      return (
        this.url.searchParams.set(
          i,
          `${o ? `${o},` : ""}${t}.${e ? "asc" : "desc"}${n === void 0 ? "" : n ? ".nullsfirst" : ".nullslast"}`,
        ),
        this
      );
    }
    limit(t, { foreignTable: e, referencedTable: n = e } = {}) {
      const r = typeof n > "u" ? "limit" : `${n}.limit`;
      return (this.url.searchParams.set(r, `${t}`), this);
    }
    range(t, e, { foreignTable: n, referencedTable: r = n } = {}) {
      const s = typeof r > "u" ? "offset" : `${r}.offset`,
        i = typeof r > "u" ? "limit" : `${r}.limit`;
      return (
        this.url.searchParams.set(s, `${t}`),
        this.url.searchParams.set(i, `${e - t + 1}`),
        this
      );
    }
    abortSignal(t) {
      return ((this.signal = t), this);
    }
    single() {
      return (
        this.headers.set("Accept", "application/vnd.pgrst.object+json"),
        this
      );
    }
    maybeSingle() {
      return ((this.isMaybeSingle = !0), this);
    }
    csv() {
      return (this.headers.set("Accept", "text/csv"), this);
    }
    geojson() {
      return (this.headers.set("Accept", "application/geo+json"), this);
    }
    explain({
      analyze: t = !1,
      verbose: e = !1,
      settings: n = !1,
      buffers: r = !1,
      wal: s = !1,
      format: i = "text",
    } = {}) {
      var o;
      const a = [
          t ? "analyze" : null,
          e ? "verbose" : null,
          n ? "settings" : null,
          r ? "buffers" : null,
          s ? "wal" : null,
        ]
          .filter(Boolean)
          .join("|"),
        l =
          (o = this.headers.get("Accept")) !== null && o !== void 0
            ? o
            : "application/json";
      return (
        this.headers.set(
          "Accept",
          `application/vnd.pgrst.plan+${i}; for="${l}"; options=${a};`,
        ),
        i === "json" ? this : this
      );
    }
    rollback() {
      return (this.headers.append("Prefer", "tx=rollback"), this);
    }
    returns() {
      return this;
    }
    maxAffected(t) {
      return (
        this.headers.append("Prefer", "handling=strict"),
        this.headers.append("Prefer", `max-affected=${t}`),
        this
      );
    }
  };
const od = new RegExp("[,()]");
var ar = class extends Gy {
    throwOnError() {
      return super.throwOnError();
    }
    eq(t, e) {
      return (this.url.searchParams.append(t, `eq.${e}`), this);
    }
    neq(t, e) {
      return (this.url.searchParams.append(t, `neq.${e}`), this);
    }
    gt(t, e) {
      return (this.url.searchParams.append(t, `gt.${e}`), this);
    }
    gte(t, e) {
      return (this.url.searchParams.append(t, `gte.${e}`), this);
    }
    lt(t, e) {
      return (this.url.searchParams.append(t, `lt.${e}`), this);
    }
    lte(t, e) {
      return (this.url.searchParams.append(t, `lte.${e}`), this);
    }
    like(t, e) {
      return (this.url.searchParams.append(t, `like.${e}`), this);
    }
    likeAllOf(t, e) {
      return (
        this.url.searchParams.append(t, `like(all).{${e.join(",")}}`),
        this
      );
    }
    likeAnyOf(t, e) {
      return (
        this.url.searchParams.append(t, `like(any).{${e.join(",")}}`),
        this
      );
    }
    ilike(t, e) {
      return (this.url.searchParams.append(t, `ilike.${e}`), this);
    }
    ilikeAllOf(t, e) {
      return (
        this.url.searchParams.append(t, `ilike(all).{${e.join(",")}}`),
        this
      );
    }
    ilikeAnyOf(t, e) {
      return (
        this.url.searchParams.append(t, `ilike(any).{${e.join(",")}}`),
        this
      );
    }
    regexMatch(t, e) {
      return (this.url.searchParams.append(t, `match.${e}`), this);
    }
    regexIMatch(t, e) {
      return (this.url.searchParams.append(t, `imatch.${e}`), this);
    }
    is(t, e) {
      return (this.url.searchParams.append(t, `is.${e}`), this);
    }
    isDistinct(t, e) {
      return (this.url.searchParams.append(t, `isdistinct.${e}`), this);
    }
    in(t, e) {
      const n = Array.from(new Set(e))
        .map((r) => (typeof r == "string" && od.test(r) ? `"${r}"` : `${r}`))
        .join(",");
      return (this.url.searchParams.append(t, `in.(${n})`), this);
    }
    notIn(t, e) {
      const n = Array.from(new Set(e))
        .map((r) => (typeof r == "string" && od.test(r) ? `"${r}"` : `${r}`))
        .join(",");
      return (this.url.searchParams.append(t, `not.in.(${n})`), this);
    }
    contains(t, e) {
      return (
        typeof e == "string"
          ? this.url.searchParams.append(t, `cs.${e}`)
          : Array.isArray(e)
            ? this.url.searchParams.append(t, `cs.{${e.join(",")}}`)
            : this.url.searchParams.append(t, `cs.${JSON.stringify(e)}`),
        this
      );
    }
    containedBy(t, e) {
      return (
        typeof e == "string"
          ? this.url.searchParams.append(t, `cd.${e}`)
          : Array.isArray(e)
            ? this.url.searchParams.append(t, `cd.{${e.join(",")}}`)
            : this.url.searchParams.append(t, `cd.${JSON.stringify(e)}`),
        this
      );
    }
    rangeGt(t, e) {
      return (this.url.searchParams.append(t, `sr.${e}`), this);
    }
    rangeGte(t, e) {
      return (this.url.searchParams.append(t, `nxl.${e}`), this);
    }
    rangeLt(t, e) {
      return (this.url.searchParams.append(t, `sl.${e}`), this);
    }
    rangeLte(t, e) {
      return (this.url.searchParams.append(t, `nxr.${e}`), this);
    }
    rangeAdjacent(t, e) {
      return (this.url.searchParams.append(t, `adj.${e}`), this);
    }
    overlaps(t, e) {
      return (
        typeof e == "string"
          ? this.url.searchParams.append(t, `ov.${e}`)
          : this.url.searchParams.append(t, `ov.{${e.join(",")}}`),
        this
      );
    }
    textSearch(t, e, { config: n, type: r } = {}) {
      let s = "";
      r === "plain"
        ? (s = "pl")
        : r === "phrase"
          ? (s = "ph")
          : r === "websearch" && (s = "w");
      const i = n === void 0 ? "" : `(${n})`;
      return (this.url.searchParams.append(t, `${s}fts${i}.${e}`), this);
    }
    match(t) {
      return (
        Object.entries(t)
          .filter(([e, n]) => n !== void 0)
          .forEach(([e, n]) => {
            this.url.searchParams.append(e, `eq.${n}`);
          }),
        this
      );
    }
    not(t, e, n) {
      return (this.url.searchParams.append(t, `not.${e}.${n}`), this);
    }
    or(t, { foreignTable: e, referencedTable: n = e } = {}) {
      const r = n ? `${n}.or` : "or";
      return (this.url.searchParams.append(r, `(${t})`), this);
    }
    filter(t, e, n) {
      return (this.url.searchParams.append(t, `${e}.${n}`), this);
    }
  },
  Jy = class {
    constructor(
      t,
      {
        headers: e = {},
        schema: n,
        fetch: r,
        urlLengthLimit: s = 8e3,
        retry: i,
      },
    ) {
      ((this.url = t),
        (this.headers = new Headers(e)),
        (this.schema = n),
        (this.fetch = r),
        (this.urlLengthLimit = s),
        (this.retry = i));
    }
    cloneRequestState() {
      return {
        url: new URL(this.url.toString()),
        headers: new Headers(this.headers),
      };
    }
    select(t, e) {
      const { head: n = !1, count: r } = e ?? {},
        s = n ? "HEAD" : "GET";
      let i = !1;
      const o = (t ?? "*")
          .split("")
          .map((u) => (/\s/.test(u) && !i ? "" : (u === '"' && (i = !i), u)))
          .join(""),
        { url: a, headers: l } = this.cloneRequestState();
      return (
        a.searchParams.set("select", o),
        r && l.append("Prefer", `count=${r}`),
        new ar({
          method: s,
          url: a,
          headers: l,
          schema: this.schema,
          fetch: this.fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
    insert(t, { count: e, defaultToNull: n = !0 } = {}) {
      var r;
      const s = "POST",
        { url: i, headers: o } = this.cloneRequestState();
      if (
        (e && o.append("Prefer", `count=${e}`),
        n || o.append("Prefer", "missing=default"),
        Array.isArray(t))
      ) {
        const a = t.reduce((l, u) => l.concat(Object.keys(u)), []);
        if (a.length > 0) {
          const l = [...new Set(a)].map((u) => `"${u}"`);
          i.searchParams.set("columns", l.join(","));
        }
      }
      return new ar({
        method: s,
        url: i,
        headers: o,
        schema: this.schema,
        body: t,
        fetch: (r = this.fetch) !== null && r !== void 0 ? r : fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      });
    }
    upsert(
      t,
      {
        onConflict: e,
        ignoreDuplicates: n = !1,
        count: r,
        defaultToNull: s = !0,
      } = {},
    ) {
      var i;
      const o = "POST",
        { url: a, headers: l } = this.cloneRequestState();
      if (
        (l.append("Prefer", `resolution=${n ? "ignore" : "merge"}-duplicates`),
        e !== void 0 && a.searchParams.set("on_conflict", e),
        r && l.append("Prefer", `count=${r}`),
        s || l.append("Prefer", "missing=default"),
        Array.isArray(t))
      ) {
        const u = t.reduce((d, c) => d.concat(Object.keys(c)), []);
        if (u.length > 0) {
          const d = [...new Set(u)].map((c) => `"${c}"`);
          a.searchParams.set("columns", d.join(","));
        }
      }
      return new ar({
        method: o,
        url: a,
        headers: l,
        schema: this.schema,
        body: t,
        fetch: (i = this.fetch) !== null && i !== void 0 ? i : fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      });
    }
    update(t, { count: e } = {}) {
      var n;
      const r = "PATCH",
        { url: s, headers: i } = this.cloneRequestState();
      return (
        e && i.append("Prefer", `count=${e}`),
        new ar({
          method: r,
          url: s,
          headers: i,
          schema: this.schema,
          body: t,
          fetch: (n = this.fetch) !== null && n !== void 0 ? n : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
    delete({ count: t } = {}) {
      var e;
      const n = "DELETE",
        { url: r, headers: s } = this.cloneRequestState();
      return (
        t && s.append("Prefer", `count=${t}`),
        new ar({
          method: n,
          url: r,
          headers: s,
          schema: this.schema,
          fetch: (e = this.fetch) !== null && e !== void 0 ? e : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
  },
  Qy = class pp {
    constructor(
      e,
      {
        headers: n = {},
        schema: r,
        fetch: s,
        timeout: i,
        urlLengthLimit: o = 8e3,
        retry: a,
      } = {},
    ) {
      ((this.url = e),
        (this.headers = new Headers(n)),
        (this.schemaName = r),
        (this.urlLengthLimit = o));
      const l = s ?? globalThis.fetch;
      (i !== void 0 && i > 0
        ? (this.fetch = (u, d) => {
            const c = new AbortController(),
              h = setTimeout(() => c.abort(), i),
              g = d == null ? void 0 : d.signal;
            if (g) {
              if (g.aborted) return (clearTimeout(h), l(u, d));
              const y = () => {
                (clearTimeout(h), c.abort());
              };
              return (
                g.addEventListener("abort", y, { once: !0 }),
                l(u, kr(kr({}, d), {}, { signal: c.signal })).finally(() => {
                  (clearTimeout(h), g.removeEventListener("abort", y));
                })
              );
            }
            return l(u, kr(kr({}, d), {}, { signal: c.signal })).finally(() =>
              clearTimeout(h),
            );
          })
        : (this.fetch = l),
        (this.retry = a));
    }
    from(e) {
      if (!e || typeof e != "string" || e.trim() === "")
        throw new Error(
          "Invalid relation name: relation must be a non-empty string.",
        );
      return new Jy(new URL(`${this.url}/${e}`), {
        headers: new Headers(this.headers),
        schema: this.schemaName,
        fetch: this.fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      });
    }
    schema(e) {
      return new pp(this.url, {
        headers: this.headers,
        schema: e,
        fetch: this.fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      });
    }
    rpc(e, n = {}, { head: r = !1, get: s = !1, count: i } = {}) {
      var o;
      let a;
      const l = new URL(`${this.url}/rpc/${e}`);
      let u;
      const d = (g) =>
          g !== null &&
          typeof g == "object" &&
          (!Array.isArray(g) || g.some(d)),
        c = r && Object.values(n).some(d);
      c
        ? ((a = "POST"), (u = n))
        : r || s
          ? ((a = r ? "HEAD" : "GET"),
            Object.entries(n)
              .filter(([g, y]) => y !== void 0)
              .map(([g, y]) => [
                g,
                Array.isArray(y) ? `{${y.join(",")}}` : `${y}`,
              ])
              .forEach(([g, y]) => {
                l.searchParams.append(g, y);
              }))
          : ((a = "POST"), (u = n));
      const h = new Headers(this.headers);
      return (
        c
          ? h.set("Prefer", i ? `count=${i},return=minimal` : "return=minimal")
          : i && h.set("Prefer", `count=${i}`),
        new ar({
          method: a,
          url: l,
          headers: h,
          schema: this.schemaName,
          body: u,
          fetch: (o = this.fetch) !== null && o !== void 0 ? o : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
  };
class Yy {
  constructor() {}
  static detectEnvironment() {
    var e;
    if (typeof WebSocket < "u")
      return { type: "native", wsConstructor: WebSocket };
    const n = globalThis;
    if (typeof globalThis < "u" && typeof n.WebSocket < "u")
      return { type: "native", wsConstructor: n.WebSocket };
    const r = typeof global < "u" ? global : void 0;
    if (r && typeof r.WebSocket < "u")
      return { type: "native", wsConstructor: r.WebSocket };
    if (
      typeof globalThis < "u" &&
      typeof n.WebSocketPair < "u" &&
      typeof globalThis.WebSocket > "u"
    )
      return {
        type: "cloudflare",
        error:
          "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
        workaround:
          "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.",
      };
    if (
      (typeof globalThis < "u" && n.EdgeRuntime) ||
      (typeof navigator < "u" &&
        !((e = navigator.userAgent) === null || e === void 0) &&
        e.includes("Vercel-Edge"))
    )
      return {
        type: "unsupported",
        error:
          "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
        workaround:
          "Use serverless functions or a different deployment target for WebSocket functionality.",
      };
    const s = globalThis.process;
    if (s) {
      const i = s.versions;
      if (i && i.node)
        return {
          type: "unsupported",
          error: "Node.js detected but native WebSocket not found.",
          workaround:
            "Ensure you are running Node.js 22+ or provide a WebSocket implementation via the transport option.",
        };
    }
    return {
      type: "unsupported",
      error: "Unknown JavaScript runtime without WebSocket support.",
      workaround:
        "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.",
    };
  }
  static getWebSocketConstructor() {
    const e = this.detectEnvironment();
    if (e.wsConstructor) return e.wsConstructor;
    let n = e.error || "WebSocket not supported in this environment.";
    throw (
      e.workaround &&
        (n += `

Suggested solution: ${e.workaround}`),
      new Error(n)
    );
  }
  static isWebSocketSupported() {
    try {
      return this.detectEnvironment().type === "native";
    } catch {
      return !1;
    }
  }
}
const Xy = "2.112.3",
  Zy = `realtime-js/${Xy}`,
  ev = "1.0.0",
  gp = "2.0.0",
  tv = gp,
  nv = 1e4,
  rv = 100,
  pn = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving",
  },
  mp = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    leave: "phx_leave",
    access_token: "access_token",
  },
  Pl = { connecting: "connecting", closing: "closing", closed: "closed" };
class sv {
  constructor(e) {
    ((this.HEADER_LENGTH = 1),
      (this.USER_BROADCAST_PUSH_META_LENGTH = 6),
      (this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }),
      (this.BINARY_ENCODING = 0),
      (this.JSON_ENCODING = 1),
      (this.BROADCAST_EVENT = "broadcast"),
      (this.allowedMetadataKeys = []),
      (this.allowedMetadataKeys = e ?? []));
  }
  encode(e, n) {
    if (
      e.event === this.BROADCAST_EVENT &&
      !(e.payload instanceof ArrayBuffer) &&
      typeof e.payload.event == "string"
    )
      return n(this._binaryEncodeUserBroadcastPush(e));
    let r = [e.join_ref, e.ref, e.topic, e.event, e.payload];
    return n(JSON.stringify(r));
  }
  _binaryEncodeUserBroadcastPush(e) {
    var n;
    return this._isArrayBuffer(
      (n = e.payload) === null || n === void 0 ? void 0 : n.payload,
    )
      ? this._encodeBinaryUserBroadcastPush(e)
      : this._encodeJsonUserBroadcastPush(e);
  }
  _encodeBinaryUserBroadcastPush(e) {
    var n, r;
    const s =
      (r = (n = e.payload) === null || n === void 0 ? void 0 : n.payload) !==
        null && r !== void 0
        ? r
        : new ArrayBuffer(0);
    return this._encodeUserBroadcastPush(e, this.BINARY_ENCODING, s);
  }
  _encodeJsonUserBroadcastPush(e) {
    var n, r;
    const s =
        (r = (n = e.payload) === null || n === void 0 ? void 0 : n.payload) !==
          null && r !== void 0
          ? r
          : {},
      o = new TextEncoder().encode(JSON.stringify(s)).buffer;
    return this._encodeUserBroadcastPush(e, this.JSON_ENCODING, o);
  }
  _encodeUserBroadcastPush(e, n, r) {
    var s, i;
    const o = new TextEncoder(),
      a = o.encode(e.topic),
      l = o.encode((s = e.ref) !== null && s !== void 0 ? s : ""),
      u = o.encode((i = e.join_ref) !== null && i !== void 0 ? i : ""),
      d = o.encode(e.payload.event),
      c = this.allowedMetadataKeys
        ? this._pick(e.payload, this.allowedMetadataKeys)
        : {},
      h = o.encode(Object.keys(c).length === 0 ? "" : JSON.stringify(c));
    if (u.length > 255)
      throw new Error(`joinRef length ${u.length} exceeds maximum of 255`);
    if (l.length > 255)
      throw new Error(`ref length ${l.length} exceeds maximum of 255`);
    if (a.length > 255)
      throw new Error(`topic length ${a.length} exceeds maximum of 255`);
    if (d.length > 255)
      throw new Error(`userEvent length ${d.length} exceeds maximum of 255`);
    if (h.length > 255)
      throw new Error(`metadata length ${h.length} exceeds maximum of 255`);
    const g =
        this.USER_BROADCAST_PUSH_META_LENGTH +
        u.length +
        l.length +
        a.length +
        d.length +
        h.length,
      y = new ArrayBuffer(this.HEADER_LENGTH + g),
      v = new DataView(y),
      k = new Uint8Array(y);
    let p = 0;
    (v.setUint8(p++, this.KINDS.userBroadcastPush),
      v.setUint8(p++, u.length),
      v.setUint8(p++, l.length),
      v.setUint8(p++, a.length),
      v.setUint8(p++, d.length),
      v.setUint8(p++, h.length),
      v.setUint8(p++, n),
      k.set(u, p),
      (p += u.length),
      k.set(l, p),
      (p += l.length),
      k.set(a, p),
      (p += a.length),
      k.set(d, p),
      (p += d.length),
      k.set(h, p),
      (p += h.length));
    var f = new Uint8Array(y.byteLength + r.byteLength);
    return (
      f.set(new Uint8Array(y), 0),
      f.set(new Uint8Array(r), y.byteLength),
      f.buffer
    );
  }
  decode(e, n) {
    if (this._isArrayBuffer(e)) {
      let r = this._binaryDecode(e);
      return n(r);
    }
    if (typeof e == "string") {
      const r = JSON.parse(e),
        [s, i, o, a, l] = r;
      return n({ join_ref: s, ref: i, topic: o, event: a, payload: l });
    }
    return n({});
  }
  _binaryDecode(e) {
    const n = new DataView(e),
      r = n.getUint8(0),
      s = new TextDecoder();
    switch (r) {
      case this.KINDS.userBroadcast:
        return this._decodeUserBroadcast(e, n, s);
    }
  }
  _decodeUserBroadcast(e, n, r) {
    const s = n.getUint8(1),
      i = n.getUint8(2),
      o = n.getUint8(3),
      a = n.getUint8(4);
    let l = this.HEADER_LENGTH + 4;
    const u = r.decode(e.slice(l, l + s));
    l = l + s;
    const d = r.decode(e.slice(l, l + i));
    l = l + i;
    const c = r.decode(e.slice(l, l + o));
    l = l + o;
    const h = e.slice(l, e.byteLength),
      g = a === this.JSON_ENCODING ? JSON.parse(r.decode(h)) : h,
      y = { type: this.BROADCAST_EVENT, event: d, payload: g };
    return (
      o > 0 && (y.meta = JSON.parse(c)),
      {
        join_ref: null,
        ref: null,
        topic: u,
        event: this.BROADCAST_EVENT,
        payload: y,
      }
    );
  }
  _isArrayBuffer(e) {
    var n;
    return (
      e instanceof ArrayBuffer ||
      ((n = e == null ? void 0 : e.constructor) === null || n === void 0
        ? void 0
        : n.name) === "ArrayBuffer"
    );
  }
  _pick(e, n) {
    return !e || typeof e != "object"
      ? {}
      : Object.fromEntries(Object.entries(e).filter(([r]) => n.includes(r)));
  }
}
var te;
(function (t) {
  ((t.abstime = "abstime"),
    (t.bool = "bool"),
    (t.date = "date"),
    (t.daterange = "daterange"),
    (t.float4 = "float4"),
    (t.float8 = "float8"),
    (t.int2 = "int2"),
    (t.int4 = "int4"),
    (t.int4range = "int4range"),
    (t.int8 = "int8"),
    (t.int8range = "int8range"),
    (t.json = "json"),
    (t.jsonb = "jsonb"),
    (t.money = "money"),
    (t.numeric = "numeric"),
    (t.oid = "oid"),
    (t.reltime = "reltime"),
    (t.text = "text"),
    (t.time = "time"),
    (t.timestamp = "timestamp"),
    (t.timestamptz = "timestamptz"),
    (t.timetz = "timetz"),
    (t.tsrange = "tsrange"),
    (t.tstzrange = "tstzrange"));
})(te || (te = {}));
const ad = (t, e, n = {}) => {
    var r;
    const s = (r = n.skipTypes) !== null && r !== void 0 ? r : [];
    return e
      ? Object.keys(e).reduce((i, o) => ((i[o] = iv(o, t, e, s)), i), {})
      : {};
  },
  iv = (t, e, n, r) => {
    const s = e.find((a) => a.name === t),
      i = s == null ? void 0 : s.type,
      o = n[t];
    return i && !r.includes(i) ? yp(i, o) : Nl(o);
  },
  yp = (t, e) => {
    if (t.charAt(0) === "_") {
      const n = t.slice(1, t.length);
      return uv(e, n);
    }
    switch (t) {
      case te.bool:
        return ov(e);
      case te.float4:
      case te.float8:
      case te.int2:
      case te.int4:
      case te.int8:
      case te.numeric:
      case te.oid:
        return av(e);
      case te.json:
      case te.jsonb:
        return lv(e);
      case te.timestamp:
        return cv(e);
      case te.abstime:
      case te.date:
      case te.daterange:
      case te.int4range:
      case te.int8range:
      case te.money:
      case te.reltime:
      case te.text:
      case te.time:
      case te.timestamptz:
      case te.timetz:
      case te.tsrange:
      case te.tstzrange:
        return Nl(e);
      default:
        return Nl(e);
    }
  },
  Nl = (t) => t,
  ov = (t) => {
    switch (t) {
      case "t":
        return !0;
      case "f":
        return !1;
      default:
        return t;
    }
  },
  av = (t) => {
    if (typeof t == "string") {
      const e = parseFloat(t);
      if (!Number.isNaN(e)) return e;
    }
    return t;
  },
  lv = (t) => {
    if (typeof t == "string")
      try {
        return JSON.parse(t);
      } catch {
        return t;
      }
    return t;
  },
  uv = (t, e) => {
    if (typeof t != "string") return t;
    const n = t.length - 1,
      r = t[n];
    if (t[0] === "{" && r === "}") {
      let i;
      const o = t.slice(1, n);
      try {
        i = JSON.parse("[" + o + "]");
      } catch {
        i = o ? o.split(",") : [];
      }
      return i.map((a) => yp(e, a));
    }
    return t;
  },
  cv = (t) => (typeof t == "string" ? t.replace(" ", "T") : t),
  vp = (t) => {
    const e = new URL(t);
    return (
      (e.protocol = e.protocol.replace(/^ws/i, "http")),
      (e.pathname = e.pathname
        .replace(/\/+$/, "")
        .replace(/\/socket\/websocket$/i, "")
        .replace(/\/socket$/i, "")
        .replace(/\/websocket$/i, "")),
      e.pathname === "" || e.pathname === "/"
        ? (e.pathname = "/api/broadcast")
        : (e.pathname = e.pathname + "/api/broadcast"),
      e.href
    );
  };
var xr = (t) =>
    typeof t == "function"
      ? t
      : function () {
          return t;
        },
  dv = typeof self < "u" ? self : null,
  lr = typeof window < "u" ? window : null,
  Lt = dv || lr || globalThis,
  hv = "2.0.0",
  fv = 1e4,
  pv = 1e3,
  gv = 100,
  $t = { connecting: 0, open: 1, closing: 2, closed: 3 },
  Ge = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving",
  },
  Kt = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave",
  },
  jl = { longpoll: "longpoll", websocket: "websocket" },
  mv = { complete: 4 },
  Il = "base64url.bearer.phx.",
  _i = class {
    constructor(t, e, n, r) {
      ((this.channel = t),
        (this.event = e),
        (this.payload =
          n ||
          function () {
            return {};
          }),
        (this.receivedResp = null),
        (this.timeout = r),
        (this.timeoutTimer = null),
        (this.recHooks = []),
        (this.sent = !1),
        (this.ref = void 0));
    }
    resend(t) {
      ((this.timeout = t), this.reset(), this.send());
    }
    send() {
      this.hasReceived("timeout") ||
        (this.startTimeout(),
        (this.sent = !0),
        this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload(),
          ref: this.ref,
          join_ref: this.channel.joinRef(),
        }));
    }
    receive(t, e) {
      return (
        this.hasReceived(t) && e(this.receivedResp.response),
        this.recHooks.push({ status: t, callback: e }),
        this
      );
    }
    reset() {
      (this.cancelRefEvent(),
        (this.ref = null),
        (this.refEvent = null),
        (this.receivedResp = null),
        (this.sent = !1));
    }
    destroy() {
      (this.cancelRefEvent(), this.cancelTimeout());
    }
    matchReceive({ status: t, response: e, _ref: n }) {
      this.recHooks.filter((r) => r.status === t).forEach((r) => r.callback(e));
    }
    cancelRefEvent() {
      this.refEvent && this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      (clearTimeout(this.timeoutTimer), (this.timeoutTimer = null));
    }
    startTimeout() {
      (this.timeoutTimer && this.cancelTimeout(),
        (this.ref = this.channel.socket.makeRef()),
        (this.refEvent = this.channel.replyEventName(this.ref)),
        this.channel.on(this.refEvent, (t) => {
          (this.cancelRefEvent(),
            this.cancelTimeout(),
            (this.receivedResp = t),
            this.matchReceive(t));
        }),
        (this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {});
        }, this.timeout)));
    }
    hasReceived(t) {
      return this.receivedResp && this.receivedResp.status === t;
    }
    trigger(t, e) {
      this.channel.trigger(this.refEvent, { status: t, response: e });
    }
  },
  wp = class {
    constructor(t, e) {
      ((this.callback = t),
        (this.timerCalc = e),
        (this.timer = void 0),
        (this.tries = 0));
    }
    reset() {
      ((this.tries = 0), clearTimeout(this.timer));
    }
    scheduleTimeout() {
      (clearTimeout(this.timer),
        (this.timer = setTimeout(
          () => {
            ((this.tries = this.tries + 1), this.callback());
          },
          this.timerCalc(this.tries + 1),
        )));
    }
  },
  yv = class {
    constructor(t, e, n) {
      ((this.state = Ge.closed),
        (this.topic = t),
        (this.params = xr(e || {})),
        (this.socket = n),
        (this.bindings = []),
        (this.bindingRef = 0),
        (this.timeout = this.socket.timeout),
        (this.joinedOnce = !1),
        (this.joinPush = new _i(this, Kt.join, this.params, this.timeout)),
        (this.pushBuffer = []),
        (this.stateChangeRefs = []),
        (this.rejoinTimer = new wp(() => {
          this.socket.isConnected() && this.rejoin();
        }, this.socket.rejoinAfterMs)),
        this.stateChangeRefs.push(
          this.socket.onError(() => this.rejoinTimer.reset()),
        ),
        this.stateChangeRefs.push(
          this.socket.onOpen(() => {
            (this.rejoinTimer.reset(), this.isErrored() && this.rejoin());
          }),
        ),
        this.joinPush.receive("ok", () => {
          ((this.state = Ge.joined),
            this.rejoinTimer.reset(),
            this.pushBuffer.forEach((r) => r.send()),
            (this.pushBuffer = []));
        }),
        this.joinPush.receive("error", (r) => {
          ((this.state = Ge.errored),
            this.socket.hasLogger() &&
              this.socket.log("channel", `error ${this.topic}`, r),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.onClose(() => {
          (this.rejoinTimer.reset(),
            this.socket.hasLogger() &&
              this.socket.log("channel", `close ${this.topic}`),
            (this.state = Ge.closed),
            this.socket.remove(this));
        }),
        this.onError((r) => {
          (this.socket.hasLogger() &&
            this.socket.log("channel", `error ${this.topic}`, r),
            this.isJoining() && this.joinPush.reset(),
            (this.state = Ge.errored),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.joinPush.receive("timeout", () => {
          (this.socket.hasLogger() &&
            this.socket.log(
              "channel",
              `timeout ${this.topic}`,
              this.joinPush.timeout,
            ),
            new _i(this, Kt.leave, xr({}), this.timeout).send(),
            (this.state = Ge.errored),
            this.joinPush.reset(),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.on(Kt.reply, (r, s) => {
          this.trigger(this.replyEventName(s), r);
        }));
    }
    join(t = this.timeout) {
      if (this.joinedOnce)
        throw new Error(
          "tried to join multiple times. 'join' can only be called a single time per channel instance",
        );
      return (
        (this.timeout = t),
        (this.joinedOnce = !0),
        this.rejoin(),
        this.joinPush
      );
    }
    teardown() {
      (this.pushBuffer.forEach((t) => t.destroy()),
        (this.pushBuffer = []),
        this.rejoinTimer.reset(),
        this.joinPush.destroy(),
        (this.state = Ge.closed),
        (this.bindings = []));
    }
    onClose(t) {
      this.on(Kt.close, t);
    }
    onError(t) {
      return this.on(Kt.error, (e) => t(e));
    }
    on(t, e) {
      let n = this.bindingRef++;
      return (this.bindings.push({ event: t, ref: n, callback: e }), n);
    }
    off(t, e) {
      this.bindings = this.bindings.filter(
        (n) => !(n.event === t && (typeof e > "u" || e === n.ref)),
      );
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(t, e, n = this.timeout) {
      if (((e = e || {}), !this.joinedOnce))
        throw new Error(
          `tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`,
        );
      let r = new _i(
        this,
        t,
        function () {
          return e;
        },
        n,
      );
      return (
        this.canPush() ? r.send() : (r.startTimeout(), this.pushBuffer.push(r)),
        r
      );
    }
    leave(t = this.timeout) {
      (this.rejoinTimer.reset(),
        this.joinPush.cancelTimeout(),
        (this.state = Ge.leaving));
      let e = () => {
          (this.socket.hasLogger() &&
            this.socket.log("channel", `leave ${this.topic}`),
            this.trigger(Kt.close, "leave"));
        },
        n = new _i(this, Kt.leave, xr({}), t);
      return (
        n.receive("ok", () => e()).receive("timeout", () => e()),
        n.send(),
        this.canPush() || n.trigger("ok", {}),
        n
      );
    }
    onMessage(t, e, n) {
      return e;
    }
    filterBindings(t, e, n) {
      return !0;
    }
    isMember(t, e, n, r) {
      return this.topic !== t
        ? !1
        : r && r !== this.joinRef()
          ? (this.socket.hasLogger() &&
              this.socket.log("channel", "dropping outdated message", {
                topic: t,
                event: e,
                payload: n,
                joinRef: r,
              }),
            !1)
          : !0;
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(t = this.timeout) {
      this.isLeaving() ||
        (this.socket.leaveOpenTopic(this.topic),
        (this.state = Ge.joining),
        this.joinPush.resend(t));
    }
    trigger(t, e, n, r) {
      let s = this.onMessage(t, e, n, r);
      if (e && !s)
        throw new Error(
          "channel onMessage callbacks must return the payload, modified or unmodified",
        );
      let i = this.bindings.filter(
        (o) => o.event === t && this.filterBindings(o, e, n),
      );
      for (let o = 0; o < i.length; o++)
        i[o].callback(s, n, r || this.joinRef());
    }
    replyEventName(t) {
      return `chan_reply_${t}`;
    }
    isClosed() {
      return this.state === Ge.closed;
    }
    isErrored() {
      return this.state === Ge.errored;
    }
    isJoined() {
      return this.state === Ge.joined;
    }
    isJoining() {
      return this.state === Ge.joining;
    }
    isLeaving() {
      return this.state === Ge.leaving;
    }
  },
  vo = class {
    static request(t, e, n, r, s, i, o) {
      if (Lt.XDomainRequest) {
        let a = new Lt.XDomainRequest();
        return this.xdomainRequest(a, t, e, r, s, i, o);
      } else if (Lt.XMLHttpRequest) {
        let a = new Lt.XMLHttpRequest();
        return this.xhrRequest(a, t, e, n, r, s, i, o);
      } else {
        if (Lt.fetch && Lt.AbortController)
          return this.fetchRequest(t, e, n, r, s, i, o);
        throw new Error("No suitable XMLHttpRequest implementation found");
      }
    }
    static fetchRequest(t, e, n, r, s, i, o) {
      let a = { method: t, headers: n, body: r },
        l = null;
      return (
        s &&
          ((l = new AbortController()),
          setTimeout(() => l.abort(), s),
          (a.signal = l.signal)),
        Lt.fetch(e, a)
          .then((u) => u.text())
          .then((u) => this.parseJSON(u))
          .then((u) => o && o(u))
          .catch((u) => {
            u.name === "AbortError" && i ? i() : o && o(null);
          }),
        l
      );
    }
    static xdomainRequest(t, e, n, r, s, i, o) {
      return (
        (t.timeout = s),
        t.open(e, n),
        (t.onload = () => {
          let a = this.parseJSON(t.responseText);
          o && o(a);
        }),
        i && (t.ontimeout = i),
        (t.onprogress = () => {}),
        t.send(r),
        t
      );
    }
    static xhrRequest(t, e, n, r, s, i, o, a) {
      (t.open(e, n, !0), (t.timeout = i));
      for (let [l, u] of Object.entries(r)) t.setRequestHeader(l, u);
      return (
        (t.onerror = () => a && a(null)),
        (t.onreadystatechange = () => {
          if (t.readyState === mv.complete && a) {
            let l = this.parseJSON(t.responseText);
            a(l);
          }
        }),
        o && (t.ontimeout = o),
        t.send(s),
        t
      );
    }
    static parseJSON(t) {
      if (!t || t === "") return null;
      try {
        return JSON.parse(t);
      } catch {
        return null;
      }
    }
    static serialize(t, e) {
      let n = [];
      for (var r in t) {
        if (!Object.prototype.hasOwnProperty.call(t, r)) continue;
        let s = e ? `${e}[${r}]` : r,
          i = t[r];
        typeof i == "object"
          ? n.push(this.serialize(i, s))
          : n.push(encodeURIComponent(s) + "=" + encodeURIComponent(i));
      }
      return n.join("&");
    }
    static appendParams(t, e) {
      if (Object.keys(e).length === 0) return t;
      let n = t.match(/\?/) ? "&" : "?";
      return `${t}${n}${this.serialize(e)}`;
    }
  },
  vv = (t) => {
    let e = "",
      n = new Uint8Array(t),
      r = n.byteLength;
    for (let s = 0; s < r; s++) e += String.fromCharCode(n[s]);
    return btoa(e);
  },
  rr = class {
    constructor(t, e) {
      (e &&
        e.length === 2 &&
        e[1].startsWith(Il) &&
        (this.authToken = atob(e[1].slice(Il.length))),
        (this.endPoint = null),
        (this.token = null),
        (this.skipHeartbeat = !0),
        (this.reqs = new Set()),
        (this.awaitingBatchAck = !1),
        (this.currentBatch = null),
        (this.currentBatchTimer = null),
        (this.batchBuffer = []),
        (this.onopen = function () {}),
        (this.onerror = function () {}),
        (this.onmessage = function () {}),
        (this.onclose = function () {}),
        (this.pollEndpoint = this.normalizeEndpoint(t)),
        (this.readyState = $t.connecting),
        setTimeout(() => this.poll(), 0));
    }
    normalizeEndpoint(t) {
      return t
        .replace("ws://", "http://")
        .replace("wss://", "https://")
        .replace(new RegExp("(.*)/" + jl.websocket), "$1/" + jl.longpoll);
    }
    endpointURL() {
      return vo.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(t, e, n) {
      (this.close(t, e, n), (this.readyState = $t.connecting));
    }
    ontimeout() {
      (this.onerror("timeout"), this.closeAndRetry(1005, "timeout", !1));
    }
    isActive() {
      return this.readyState === $t.open || this.readyState === $t.connecting;
    }
    poll() {
      const t = { Accept: "application/json" };
      (this.authToken && (t["X-Phoenix-AuthToken"] = this.authToken),
        this.ajax(
          "GET",
          t,
          null,
          () => this.ontimeout(),
          (e) => {
            if (e) {
              var { status: n, token: r, messages: s } = e;
              if (n === 410 && this.token !== null) {
                (this.onerror(410),
                  this.closeAndRetry(3410, "session_gone", !1));
                return;
              }
              this.token = r;
            } else n = 0;
            switch (n) {
              case 200:
                (s.forEach((i) => {
                  setTimeout(() => this.onmessage({ data: i }), 0);
                }),
                  this.poll());
                break;
              case 204:
                this.poll();
                break;
              case 410:
                ((this.readyState = $t.open), this.onopen({}), this.poll());
                break;
              case 403:
                (this.onerror(403), this.close(1008, "forbidden", !1));
                break;
              case 0:
              case 500:
                (this.onerror(500),
                  this.closeAndRetry(1011, "internal server error", 500));
                break;
              default:
                throw new Error(`unhandled poll status ${n}`);
            }
          },
        ));
    }
    send(t) {
      (typeof t != "string" && (t = vv(t)),
        this.currentBatch
          ? this.currentBatch.push(t)
          : this.awaitingBatchAck
            ? this.batchBuffer.push(t)
            : ((this.currentBatch = [t]),
              (this.currentBatchTimer = setTimeout(() => {
                (this.batchSend(this.currentBatch), (this.currentBatch = null));
              }, 0))));
    }
    batchSend(t, e = 0) {
      this.awaitingBatchAck = !0;
      const n = e + gv,
        r = t.slice(e, n);
      this.ajax(
        "POST",
        { "Content-Type": "application/x-ndjson" },
        r.join(`
`),
        () => this.onerror("timeout"),
        (s) => {
          !s || s.status !== 200
            ? ((this.awaitingBatchAck = !1),
              this.onerror(s && s.status),
              this.closeAndRetry(1011, "internal server error", !1))
            : n < t.length
              ? this.batchSend(t, n)
              : this.batchBuffer.length > 0
                ? (this.batchSend(this.batchBuffer), (this.batchBuffer = []))
                : (this.awaitingBatchAck = !1);
        },
      );
    }
    close(t, e, n) {
      for (let s of this.reqs) s.abort();
      this.readyState = $t.closed;
      let r = Object.assign(
        { code: 1e3, reason: void 0, wasClean: !0 },
        { code: t, reason: e, wasClean: n },
      );
      ((this.batchBuffer = []),
        clearTimeout(this.currentBatchTimer),
        (this.currentBatchTimer = null),
        typeof CloseEvent < "u"
          ? this.onclose(new CloseEvent("close", r))
          : this.onclose(r));
    }
    ajax(t, e, n, r, s) {
      let i,
        o = () => {
          (this.reqs.delete(i), r());
        };
      ((i = vo.request(t, this.endpointURL(), e, n, this.timeout, o, (a) => {
        (this.reqs.delete(i), this.isActive() && s(a));
      })),
        this.reqs.add(i));
    }
  },
  wv = class rs {
    constructor(e, n = {}) {
      let r = n.events || { state: "presence_state", diff: "presence_diff" };
      ((this.state = Object.create(null)),
        (this.pendingDiffs = []),
        (this.channel = e),
        (this.joinRef = null),
        (this.caller = {
          onJoin: function () {},
          onLeave: function () {},
          onSync: function () {},
        }),
        this.channel.on(r.state, (s) => {
          let { onJoin: i, onLeave: o, onSync: a } = this.caller;
          ((this.joinRef = this.channel.joinRef()),
            (this.state = rs.syncState(this.state, s, i, o)),
            this.pendingDiffs.forEach((l) => {
              this.state = rs.syncDiff(this.state, l, i, o);
            }),
            (this.pendingDiffs = []),
            a());
        }),
        this.channel.on(r.diff, (s) => {
          let { onJoin: i, onLeave: o, onSync: a } = this.caller;
          this.inPendingSyncState()
            ? this.pendingDiffs.push(s)
            : ((this.state = rs.syncDiff(this.state, s, i, o)), a());
        }));
    }
    onJoin(e) {
      this.caller.onJoin = e;
    }
    onLeave(e) {
      this.caller.onLeave = e;
    }
    onSync(e) {
      this.caller.onSync = e;
    }
    list(e) {
      return rs.list(this.state, e);
    }
    inPendingSyncState() {
      return !this.joinRef || this.joinRef !== this.channel.joinRef();
    }
    static syncState(e, n, r, s) {
      let i = this.toNullProtoObj(this.clone(e));
      n = this.toNullProtoObj(n);
      let o = Object.create(null),
        a = Object.create(null);
      return (
        this.map(i, (l, u) => {
          n[l] || (a[l] = u);
        }),
        this.map(n, (l, u) => {
          let d = i[l];
          if (d) {
            let c = u.metas.map((v) => v.phx_ref),
              h = d.metas.map((v) => v.phx_ref),
              g = u.metas.filter((v) => h.indexOf(v.phx_ref) < 0),
              y = d.metas.filter((v) => c.indexOf(v.phx_ref) < 0);
            (g.length > 0 && ((o[l] = u), (o[l].metas = g)),
              y.length > 0 && ((a[l] = this.clone(d)), (a[l].metas = y)));
          } else o[l] = u;
        }),
        this.syncDiff(i, { joins: o, leaves: a }, r, s)
      );
    }
    static syncDiff(e, n, r, s) {
      e = this.toNullProtoObj(e);
      let { joins: i, leaves: o } = this.clone(n);
      return (
        r || (r = function () {}),
        s || (s = function () {}),
        this.map(i, (a, l) => {
          let u = e[a];
          if (((e[a] = this.clone(l)), u)) {
            let d = e[a].metas.map((h) => h.phx_ref),
              c = u.metas.filter((h) => d.indexOf(h.phx_ref) < 0);
            e[a].metas.unshift(...c);
          }
          r(a, u, l);
        }),
        this.map(o, (a, l) => {
          let u = e[a];
          if (!u) return;
          let d = l.metas.map((c) => c.phx_ref);
          ((u.metas = u.metas.filter((c) => d.indexOf(c.phx_ref) < 0)),
            s(a, u, l),
            u.metas.length === 0 && delete e[a]);
        }),
        e
      );
    }
    static list(e, n) {
      return (
        n ||
          (n = function (r, s) {
            return s;
          }),
        this.map(e, (r, s) => n(r, s))
      );
    }
    static map(e, n) {
      return Object.getOwnPropertyNames(e).map((r) => n(r, e[r]));
    }
    static toNullProtoObj(e) {
      if (Object.getPrototypeOf(e) === null) return e;
      let n = Object.create(null);
      return (
        Object.getOwnPropertyNames(e).forEach((r) => {
          n[r] = e[r];
        }),
        n
      );
    }
    static clone(e) {
      return JSON.parse(JSON.stringify(e));
    }
  },
  ki = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(t, e) {
      if (t.payload.constructor === ArrayBuffer) return e(this.binaryEncode(t));
      {
        let n = [t.join_ref, t.ref, t.topic, t.event, t.payload];
        return e(JSON.stringify(n));
      }
    },
    decode(t, e) {
      if (t.constructor === ArrayBuffer) return e(this.binaryDecode(t));
      {
        let [n, r, s, i, o] = JSON.parse(t);
        return e({ join_ref: n, ref: r, topic: s, event: i, payload: o });
      }
    },
    binaryEncode(t) {
      let { join_ref: e, ref: n, event: r, topic: s, payload: i } = t,
        o = new TextEncoder(),
        a = o.encode(e),
        l = o.encode(n),
        u = o.encode(s),
        d = o.encode(r);
      (this.assertFieldSize(a.byteLength, "join_ref"),
        this.assertFieldSize(l.byteLength, "ref"),
        this.assertFieldSize(u.byteLength, "topic"),
        this.assertFieldSize(d.byteLength, "event"));
      let c =
          this.META_LENGTH +
          a.byteLength +
          l.byteLength +
          u.byteLength +
          d.byteLength,
        h = new ArrayBuffer(this.HEADER_LENGTH + c),
        g = new Uint8Array(h),
        y = new DataView(h),
        v = 0;
      (y.setUint8(v++, this.KINDS.push),
        y.setUint8(v++, a.byteLength),
        y.setUint8(v++, l.byteLength),
        y.setUint8(v++, u.byteLength),
        y.setUint8(v++, d.byteLength),
        g.set(a, v),
        (v += a.byteLength),
        g.set(l, v),
        (v += l.byteLength),
        g.set(u, v),
        (v += u.byteLength),
        g.set(d, v),
        (v += d.byteLength));
      var k = new Uint8Array(h.byteLength + i.byteLength);
      return (k.set(g, 0), k.set(new Uint8Array(i), h.byteLength), k.buffer);
    },
    assertFieldSize(t, e) {
      if (t > 255)
        throw new Error(
          `unable to convert ${e} to binary: must be less than or equal to 255 bytes, but is ${t} bytes`,
        );
    },
    binaryDecode(t) {
      let e = new DataView(t),
        n = e.getUint8(0),
        r = new TextDecoder();
      switch (n) {
        case this.KINDS.push:
          return this.decodePush(t, e, r);
        case this.KINDS.reply:
          return this.decodeReply(t, e, r);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(t, e, r);
      }
    },
    decodePush(t, e, n) {
      let r = e.getUint8(1),
        s = e.getUint8(2),
        i = e.getUint8(3),
        o = this.HEADER_LENGTH + this.META_LENGTH - 1,
        a = n.decode(t.slice(o, o + r));
      o = o + r;
      let l = n.decode(t.slice(o, o + s));
      o = o + s;
      let u = n.decode(t.slice(o, o + i));
      o = o + i;
      let d = t.slice(o, t.byteLength);
      return { join_ref: a, ref: null, topic: l, event: u, payload: d };
    },
    decodeReply(t, e, n) {
      let r = e.getUint8(1),
        s = e.getUint8(2),
        i = e.getUint8(3),
        o = e.getUint8(4),
        a = this.HEADER_LENGTH + this.META_LENGTH,
        l = n.decode(t.slice(a, a + r));
      a = a + r;
      let u = n.decode(t.slice(a, a + s));
      a = a + s;
      let d = n.decode(t.slice(a, a + i));
      a = a + i;
      let c = n.decode(t.slice(a, a + o));
      a = a + o;
      let h = t.slice(a, t.byteLength),
        g = { status: c, response: h };
      return { join_ref: l, ref: u, topic: d, event: Kt.reply, payload: g };
    },
    decodeBroadcast(t, e, n) {
      let r = e.getUint8(1),
        s = e.getUint8(2),
        i = this.HEADER_LENGTH + 2,
        o = n.decode(t.slice(i, i + r));
      i = i + r;
      let a = n.decode(t.slice(i, i + s));
      i = i + s;
      let l = t.slice(i, t.byteLength);
      return { join_ref: null, ref: null, topic: o, event: a, payload: l };
    },
  },
  _v = class {
    constructor(t, e = {}) {
      ((this.stateChangeCallbacks = {
        open: [],
        close: [],
        error: [],
        message: [],
      }),
        (this.channels = []),
        (this.sendBuffer = []),
        (this.ref = 0),
        (this.fallbackRef = null),
        (this.timeout = e.timeout || fv),
        (this.transport = e.transport || Lt.WebSocket || rr),
        (this.conn = void 0),
        (this.primaryPassedHealthCheck = !1),
        (this.longPollFallbackMs = e.longPollFallbackMs),
        (this.fallbackTimer = null));
      let n = null;
      try {
        n = Lt && Lt.sessionStorage;
      } catch {}
      ((this.sessionStore = e.sessionStorage || n),
        (this.establishedConnections = 0),
        (this.defaultEncoder = ki.encode.bind(ki)),
        (this.defaultDecoder = ki.decode.bind(ki)),
        (this.closeWasClean = !0),
        (this.disconnecting = !1),
        (this.binaryType = e.binaryType || "arraybuffer"),
        (this.connectClock = 1),
        (this.pageHidden = !1),
        (this.encode = void 0),
        (this.decode = void 0),
        this.transport !== rr
          ? ((this.encode = e.encode || this.defaultEncoder),
            (this.decode = e.decode || this.defaultDecoder))
          : ((this.encode = this.defaultEncoder),
            (this.decode = this.defaultDecoder)));
      let r = null;
      (lr &&
        lr.addEventListener &&
        (lr.addEventListener("pagehide", (s) => {
          this.conn && (this.disconnect(), (r = this.connectClock));
        }),
        lr.addEventListener("pageshow", (s) => {
          r === this.connectClock && ((r = null), this.connect());
        }),
        lr.addEventListener("visibilitychange", () => {
          document.visibilityState === "hidden"
            ? (this.pageHidden = !0)
            : ((this.pageHidden = !1),
              !this.isConnected() &&
                !this.closeWasClean &&
                this.teardown(() => this.connect()));
        })),
        (this.heartbeatIntervalMs = e.heartbeatIntervalMs || 3e4),
        (this.autoSendHeartbeat = e.autoSendHeartbeat ?? !0),
        (this.heartbeatCallback = e.heartbeatCallback ?? (() => {})),
        (this.rejoinAfterMs = (s) =>
          e.rejoinAfterMs ? e.rejoinAfterMs(s) : [1e3, 2e3, 5e3][s - 1] || 1e4),
        (this.reconnectAfterMs = (s) =>
          e.reconnectAfterMs
            ? e.reconnectAfterMs(s)
            : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][s - 1] || 5e3),
        (this.logger = e.logger || null),
        !this.logger && e.debug && (this.logger = (s, i, o) => {}),
        (this.longpollerTimeout = e.longpollerTimeout || 2e4),
        (this.params = xr(e.params || {})),
        (this.endPoint = `${t}/${jl.websocket}`),
        (this.vsn = e.vsn || hv),
        (this.heartbeatTimeoutTimer = null),
        (this.heartbeatTimer = null),
        (this.heartbeatSentAt = null),
        (this.pendingHeartbeatRef = null),
        (this.reconnectTimer = new wp(() => {
          if (this.pageHidden) {
            (this.log("Not reconnecting as page is hidden!"), this.teardown());
            return;
          }
          this.teardown(async () => {
            (e.beforeReconnect && (await e.beforeReconnect()), this.connect());
          });
        }, this.reconnectAfterMs)),
        (this.authToken = e.authToken && xr(e.authToken)));
    }
    getLongPollTransport() {
      return rr;
    }
    replaceTransport(t) {
      (this.connectClock++,
        (this.closeWasClean = !0),
        clearTimeout(this.fallbackTimer),
        this.reconnectTimer.reset(),
        this.conn && (this.conn.close(), (this.conn = null)),
        (this.transport = t));
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let t = vo.appendParams(vo.appendParams(this.endPoint, this.params()), {
        vsn: this.vsn,
      });
      return t.charAt(0) !== "/"
        ? t
        : t.charAt(1) === "/"
          ? `${this.protocol()}:${t}`
          : `${this.protocol()}://${location.host}${t}`;
    }
    disconnect(t, e, n) {
      (this.connectClock++,
        (this.disconnecting = !0),
        (this.closeWasClean = !0),
        clearTimeout(this.fallbackTimer),
        this.reconnectTimer.reset(),
        this.teardown(
          () => {
            ((this.disconnecting = !1), t && t());
          },
          e,
          n,
        ));
    }
    connect(t) {
      (t && (this.params = xr(t)),
        !(this.conn && !this.disconnecting) &&
          (this.longPollFallbackMs && this.transport !== rr
            ? this.connectWithFallback(rr, this.longPollFallbackMs)
            : this.transportConnect()));
    }
    log(t, e, n) {
      this.logger && this.logger(t, e, n);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(t) {
      let e = this.makeRef();
      return (this.stateChangeCallbacks.open.push([e, t]), e);
    }
    onClose(t) {
      let e = this.makeRef();
      return (this.stateChangeCallbacks.close.push([e, t]), e);
    }
    onError(t) {
      let e = this.makeRef();
      return (this.stateChangeCallbacks.error.push([e, t]), e);
    }
    onMessage(t) {
      let e = this.makeRef();
      return (this.stateChangeCallbacks.message.push([e, t]), e);
    }
    onHeartbeat(t) {
      this.heartbeatCallback = t;
    }
    ping(t) {
      if (!this.isConnected()) return !1;
      let e = this.makeRef(),
        n = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: e });
      let r = this.onMessage((s) => {
        s.ref === e && (this.off([r]), t(Date.now() - n));
      });
      return !0;
    }
    transportName(t) {
      switch (t) {
        case rr:
          return "LongPoll";
        default:
          return t.name;
      }
    }
    transportConnect() {
      (this.connectClock++, (this.closeWasClean = !1));
      let t;
      (this.authToken &&
        (t = ["phoenix", `${Il}${btoa(this.authToken()).replace(/=/g, "")}`]),
        (this.conn = new this.transport(this.endPointURL(), t)),
        (this.conn.binaryType = this.binaryType),
        (this.conn.timeout = this.longpollerTimeout),
        (this.conn.onopen = () => this.onConnOpen()),
        (this.conn.onerror = (e) => this.onConnError(e)),
        (this.conn.onmessage = (e) => this.onConnMessage(e)),
        (this.conn.onclose = (e) => this.onConnClose(e)));
    }
    getSession(t) {
      return this.sessionStore && this.sessionStore.getItem(t);
    }
    storeSession(t, e) {
      this.sessionStore && this.sessionStore.setItem(t, e);
    }
    connectWithFallback(t, e = 2500) {
      clearTimeout(this.fallbackTimer);
      let n = !1,
        r = !0,
        s,
        i,
        o = this.transportName(t),
        a = (l) => {
          (this.log("transport", `falling back to ${o}...`, l),
            this.off([s, i]),
            (r = !1),
            this.replaceTransport(t),
            this.transportConnect());
        };
      if (this.getSession(`phx:fallback:${o}`)) return a("memorized");
      ((this.fallbackTimer = setTimeout(a, e)),
        (i = this.onError((l) => {
          (this.log("transport", "error", l),
            r && !n && (clearTimeout(this.fallbackTimer), a(l)));
        })),
        this.fallbackRef && this.off([this.fallbackRef]),
        (this.fallbackRef = this.onOpen(() => {
          if (((n = !0), !r)) {
            let l = this.transportName(t);
            return (
              this.primaryPassedHealthCheck ||
                this.storeSession(`phx:fallback:${l}`, "true"),
              this.log("transport", `established ${l} fallback`)
            );
          }
          (clearTimeout(this.fallbackTimer),
            (this.fallbackTimer = setTimeout(a, e)),
            this.ping((l) => {
              (this.log("transport", "connected to primary after", l),
                (this.primaryPassedHealthCheck = !0),
                clearTimeout(this.fallbackTimer));
            }));
        })),
        this.transportConnect());
    }
    clearHeartbeats() {
      (clearTimeout(this.heartbeatTimer),
        clearTimeout(this.heartbeatTimeoutTimer));
    }
    onConnOpen() {
      (this.hasLogger() &&
        this.log("transport", `connected to ${this.endPointURL()}`),
        (this.closeWasClean = !1),
        (this.disconnecting = !1),
        this.establishedConnections++,
        this.flushSendBuffer(),
        this.reconnectTimer.reset(),
        this.autoSendHeartbeat && this.resetHeartbeat(),
        this.triggerStateCallbacks("open"));
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        ((this.pendingHeartbeatRef = null),
          (this.heartbeatSentAt = null),
          this.hasLogger() &&
            this.log(
              "transport",
              "heartbeat timeout. Attempting to re-establish connection",
            ));
        try {
          this.heartbeatCallback("timeout");
        } catch (t) {
          this.log("error", "error in heartbeat callback", t);
        }
        (this.triggerChanError(new Error("heartbeat timeout")),
          (this.closeWasClean = !1),
          this.teardown(
            () => this.reconnectTimer.scheduleTimeout(),
            pv,
            "heartbeat timeout",
          ));
      }
    }
    resetHeartbeat() {
      (this.conn && this.conn.skipHeartbeat) ||
        ((this.pendingHeartbeatRef = null),
        this.clearHeartbeats(),
        (this.heartbeatTimer = setTimeout(
          () => this.sendHeartbeat(),
          this.heartbeatIntervalMs,
        )));
    }
    teardown(t, e, n) {
      if (!this.conn) return t && t();
      const r = this.conn;
      this.waitForBufferDone(r, () => {
        (e ? r.close(e, n || "") : r.close(),
          this.waitForSocketClosed(r, () => {
            (this.conn === r &&
              ((this.conn.onopen = function () {}),
              (this.conn.onerror = function () {}),
              (this.conn.onmessage = function () {}),
              (this.conn.onclose = function () {}),
              (this.conn = null)),
              t && t());
          }));
      });
    }
    waitForBufferDone(t, e, n = 1) {
      if (n === 5 || !t.bufferedAmount) {
        e();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(t, e, n + 1);
      }, 150 * n);
    }
    waitForSocketClosed(t, e, n = 1) {
      if (n === 5 || t.readyState === $t.closed) {
        e();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(t, e, n + 1);
      }, 150 * n);
    }
    onConnClose(t) {
      (this.conn && (this.conn.onclose = () => {}),
        this.hasLogger() && this.log("transport", "close", t),
        this.triggerChanError(t),
        this.clearHeartbeats(),
        this.closeWasClean || this.reconnectTimer.scheduleTimeout(),
        this.triggerStateCallbacks("close", t));
    }
    onConnError(t) {
      this.hasLogger() && this.log("transport", "error", t);
      let e = this.transport,
        n = this.establishedConnections;
      (this.triggerStateCallbacks("error", t, e, n),
        (e === this.transport || n > 0) && this.triggerChanError(t));
    }
    triggerChanError(t) {
      this.channels.forEach((e) => {
        e.isErrored() ||
          e.isLeaving() ||
          e.isClosed() ||
          e.trigger(Kt.error, t);
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case $t.connecting:
          return "connecting";
        case $t.open:
          return "open";
        case $t.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(t) {
      (this.off(t.stateChangeRefs),
        (this.channels = this.channels.filter((e) => e !== t)));
    }
    off(t) {
      for (let e in this.stateChangeCallbacks)
        this.stateChangeCallbacks[e] = this.stateChangeCallbacks[e].filter(
          ([n]) => t.indexOf(n) === -1,
        );
    }
    channel(t, e = {}) {
      let n = new yv(t, e, this);
      return (this.channels.push(n), n);
    }
    push(t) {
      if (this.hasLogger()) {
        let { topic: e, event: n, payload: r, ref: s, join_ref: i } = t;
        this.log("push", `${e} ${n} (${i}, ${s})`, r);
      }
      this.isConnected()
        ? this.encode(t, (e) => this.conn.send(e))
        : this.sendBuffer.push(() => this.encode(t, (e) => this.conn.send(e)));
    }
    makeRef() {
      let t = this.ref + 1;
      return (
        t === this.ref ? (this.ref = 0) : (this.ref = t),
        this.ref.toString()
      );
    }
    sendHeartbeat() {
      if (!this.isConnected()) {
        try {
          this.heartbeatCallback("disconnected");
        } catch (t) {
          this.log("error", "error in heartbeat callback", t);
        }
        return;
      }
      if (this.pendingHeartbeatRef) {
        this.heartbeatTimeout();
        return;
      }
      ((this.pendingHeartbeatRef = this.makeRef()),
        (this.heartbeatSentAt = Date.now()),
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef,
        }));
      try {
        this.heartbeatCallback("sent");
      } catch (t) {
        this.log("error", "error in heartbeat callback", t);
      }
      this.heartbeatTimeoutTimer = setTimeout(
        () => this.heartbeatTimeout(),
        this.heartbeatIntervalMs,
      );
    }
    flushSendBuffer() {
      this.isConnected() &&
        this.sendBuffer.length > 0 &&
        (this.sendBuffer.forEach((t) => t()), (this.sendBuffer = []));
    }
    onConnMessage(t) {
      this.decode(t.data, (e) => {
        let { topic: n, event: r, payload: s, ref: i, join_ref: o } = e;
        if (i && i === this.pendingHeartbeatRef) {
          const a = this.heartbeatSentAt
            ? Date.now() - this.heartbeatSentAt
            : void 0;
          this.clearHeartbeats();
          try {
            this.heartbeatCallback(s.status === "ok" ? "ok" : "error", a);
          } catch (l) {
            this.log("error", "error in heartbeat callback", l);
          }
          ((this.pendingHeartbeatRef = null),
            (this.heartbeatSentAt = null),
            this.autoSendHeartbeat &&
              (this.heartbeatTimer = setTimeout(
                () => this.sendHeartbeat(),
                this.heartbeatIntervalMs,
              )));
        }
        this.hasLogger() &&
          this.log(
            "receive",
            `${s.status || ""} ${n} ${r} ${(i && "(" + i + ")") || ""}`.trim(),
            s,
          );
        for (let a = 0; a < this.channels.length; a++) {
          const l = this.channels[a];
          l.isMember(n, r, s, o) && l.trigger(r, s, i, o);
        }
        this.triggerStateCallbacks("message", e);
      });
    }
    triggerStateCallbacks(t, ...e) {
      try {
        this.stateChangeCallbacks[t].forEach(([n, r]) => {
          try {
            r(...e);
          } catch (s) {
            this.log("error", `error in ${t} callback`, s);
          }
        });
      } catch (n) {
        this.log("error", `error triggering ${t} callbacks`, n);
      }
    }
    leaveOpenTopic(t) {
      let e = this.channels.find(
        (n) => n.topic === t && (n.isJoined() || n.isJoining()),
      );
      e &&
        (this.hasLogger() &&
          this.log("transport", `leaving duplicate topic "${t}"`),
        e.leave());
    }
  };
class ms {
  constructor(e, n) {
    const r = Sv(n);
    ((this.presence = new wv(e.getChannel(), r)),
      this.presence.onJoin((s, i, o) => {
        const a = ms.onJoinPayload(s, i, o);
        e.getChannel().trigger("presence", a);
      }),
      this.presence.onLeave((s, i, o) => {
        const a = ms.onLeavePayload(s, i, o);
        e.getChannel().trigger("presence", a);
      }),
      this.presence.onSync(() => {
        e.getChannel().trigger("presence", { event: "sync" });
      }));
  }
  get state() {
    return ms.transformState(this.presence.state);
  }
  static transformState(e) {
    return (
      (e = kv(e)),
      Object.getOwnPropertyNames(e).reduce((n, r) => {
        const s = e[r];
        return ((n[r] = Vi(s)), n);
      }, {})
    );
  }
  static onJoinPayload(e, n, r) {
    const s = ld(n),
      i = Vi(r);
    return { event: "join", key: e, currentPresences: s, newPresences: i };
  }
  static onLeavePayload(e, n, r) {
    const s = ld(n),
      i = Vi(r);
    return { event: "leave", key: e, currentPresences: s, leftPresences: i };
  }
}
function Vi(t) {
  return t.metas.map((e) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = Object.defineProperties({}, n);
    return (
      (r.presence_ref = r.phx_ref),
      delete r.phx_ref,
      delete r.phx_ref_prev,
      r
    );
  });
}
function kv(t) {
  return JSON.parse(JSON.stringify(t));
}
function Sv(t) {
  return (t == null ? void 0 : t.events) && { events: t.events };
}
function ld(t) {
  return t != null && t.metas ? Vi(t) : [];
}
var ud;
(function (t) {
  ((t.SYNC = "sync"), (t.JOIN = "join"), (t.LEAVE = "leave"));
})(ud || (ud = {}));
class Ev {
  get state() {
    return this.presenceAdapter.state;
  }
  constructor(e, n) {
    ((this.channel = e),
      (this.presenceAdapter = new ms(this.channel.channelAdapter, n)));
  }
}
function bv(t) {
  if (t instanceof Error) return t;
  if (typeof t == "string") return new Error(t);
  if (t && typeof t == "object") {
    const e = t;
    if (typeof e.code == "number") {
      const n = typeof e.reason == "string" && e.reason ? ` (${e.reason})` : "";
      return new Error(`socket closed: ${e.code}${n}`, { cause: t });
    }
    return new Error("channel error: transport failure", { cause: t });
  }
  return new Error("channel error: connection lost");
}
class Tv {
  constructor(e, n, r) {
    const s = Cv(r);
    ((this.channel = e.getSocket().channel(n, s)), (this.socket = e));
  }
  get state() {
    return this.channel.state;
  }
  set state(e) {
    this.channel.state = e;
  }
  get joinedOnce() {
    return this.channel.joinedOnce;
  }
  get joinPush() {
    return this.channel.joinPush;
  }
  get rejoinTimer() {
    return this.channel.rejoinTimer;
  }
  on(e, n) {
    return this.channel.on(e, n);
  }
  off(e, n) {
    this.channel.off(e, n);
  }
  subscribe(e) {
    return this.channel.join(e);
  }
  unsubscribe(e) {
    return this.channel.leave(e);
  }
  teardown() {
    this.channel.teardown();
  }
  onClose(e) {
    this.channel.onClose(e);
  }
  onError(e) {
    return this.channel.onError(e);
  }
  push(e, n, r) {
    let s;
    try {
      s = this.channel.push(e, n, r);
    } catch {
      throw new Error(
        `tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`,
      );
    }
    if (this.channel.pushBuffer.length > rv) {
      const i = this.channel.pushBuffer.shift();
      (i.cancelTimeout(),
        this.socket.log(
          "channel",
          `discarded push due to buffer overflow: ${i.event}`,
          i.payload(),
        ));
    }
    return s;
  }
  updateJoinPayload(e) {
    const n = this.channel.joinPush.payload();
    this.channel.joinPush.payload = () =>
      Object.assign(Object.assign({}, n), e);
  }
  canPush() {
    return this.socket.isConnected() && this.state === pn.joined;
  }
  isJoined() {
    return this.state === pn.joined;
  }
  isJoining() {
    return this.state === pn.joining;
  }
  isClosed() {
    return this.state === pn.closed;
  }
  isLeaving() {
    return this.state === pn.leaving;
  }
  updateFilterBindings(e) {
    this.channel.filterBindings = e;
  }
  updatePayloadTransform(e) {
    this.channel.onMessage = e;
  }
  getChannel() {
    return this.channel;
  }
}
function Cv(t) {
  return {
    config: Object.assign(
      {
        broadcast: { ack: !1, self: !1 },
        presence: { key: "", enabled: !1 },
        private: !1,
      },
      t.config,
    ),
  };
}
const Rv = /[,()"\\]/,
  xv = (t) => Rv.test(t) || t !== t.trim(),
  Av = (t) => `"${t.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`,
  cd = (t) => {
    const e = t === null ? "null" : String(t);
    return xv(e) ? Av(e) : e;
  },
  Ov = (t) => (t === null ? "null" : String(t)),
  Pv = (t, e) => {
    if (t === "in") {
      const n = Array.isArray(e) ? e : [e];
      if (n.length === 0)
        throw new Error("Realtime `in` filter requires at least one value.");
      return `in.(${Array.from(new Set(n))
        .map((s) => cd(s))
        .join(",")})`;
    }
    return t === "is" ? `is.${Ov(e)}` : `${t}.${cd(e)}`;
  };
class Nv {
  constructor() {
    this.filters = [];
  }
  add(e, n, r, s = !1) {
    const i = s ? "not." : "";
    return (this.filters.push(`${e}=${i}${Pv(n, r)}`), this);
  }
  eq(e, n) {
    return this.add(e, "eq", n);
  }
  neq(e, n) {
    return this.add(e, "neq", n);
  }
  gt(e, n) {
    return this.add(e, "gt", n);
  }
  gte(e, n) {
    return this.add(e, "gte", n);
  }
  lt(e, n) {
    return this.add(e, "lt", n);
  }
  lte(e, n) {
    return this.add(e, "lte", n);
  }
  in(e, n) {
    return this.add(e, "in", n);
  }
  like(e, n) {
    return this.add(e, "like", n);
  }
  ilike(e, n) {
    return this.add(e, "ilike", n);
  }
  match(e, n) {
    return this.add(e, "match", n);
  }
  imatch(e, n) {
    return this.add(e, "imatch", n);
  }
  is(e, n) {
    return this.add(e, "is", n);
  }
  isDistinct(e, n) {
    return this.add(e, "isdistinct", n);
  }
  not(e, n, r) {
    return this.add(e, n, r, !0);
  }
  build() {
    return this.filters.join(",");
  }
  toString() {
    return this.build();
  }
}
var dd;
(function (t) {
  ((t.ALL = "*"),
    (t.INSERT = "INSERT"),
    (t.UPDATE = "UPDATE"),
    (t.DELETE = "DELETE"));
})(dd || (dd = {}));
var Ln;
(function (t) {
  ((t.BROADCAST = "broadcast"),
    (t.PRESENCE = "presence"),
    (t.POSTGRES_CHANGES = "postgres_changes"),
    (t.SYSTEM = "system"));
})(Ln || (Ln = {}));
var qt;
(function (t) {
  ((t.SUBSCRIBED = "SUBSCRIBED"),
    (t.TIMED_OUT = "TIMED_OUT"),
    (t.CLOSED = "CLOSED"),
    (t.CHANNEL_ERROR = "CHANNEL_ERROR"));
})(qt || (qt = {}));
class Gt {
  get state() {
    return this.channelAdapter.state;
  }
  set state(e) {
    this.channelAdapter.state = e;
  }
  get joinedOnce() {
    return this.channelAdapter.joinedOnce;
  }
  get timeout() {
    return this.socket.timeout;
  }
  get joinPush() {
    return this.channelAdapter.joinPush;
  }
  get rejoinTimer() {
    return this.channelAdapter.rejoinTimer;
  }
  constructor(e, n = { config: {} }, r) {
    var s, i;
    if (
      ((this.topic = e),
      (this.params = n),
      (this.socket = r),
      (this.bindings = {}),
      (this.subTopic = e.replace(/^realtime:/i, "")),
      (this.params.config = Object.assign(
        {
          broadcast: { ack: !1, self: !1 },
          presence: { key: "", enabled: !1 },
          private: !1,
        },
        n.config,
      )),
      (this.channelAdapter = new Tv(this.socket.socketAdapter, e, this.params)),
      (this.presence = new Ev(this)),
      this._onClose(() => {
        this.socket._remove(this);
      }),
      this._updateFilterTransform(),
      (this.broadcastEndpointURL = vp(this.socket.socketAdapter.endPointURL())),
      (this.private = this.params.config.private || !1),
      !this.private &&
        !(
          (i =
            (s = this.params.config) === null || s === void 0
              ? void 0
              : s.broadcast) === null || i === void 0
        ) &&
        i.replay)
    )
      throw new Error(
        `tried to use replay on public channel '${this.topic}'. It must be a private channel.`,
      );
  }
  subscribe(e, n = this.timeout) {
    var r, s, i;
    if (
      (this.socket.isConnected() || this.socket.connect(),
      this.channelAdapter.isClosed())
    ) {
      const {
          config: { broadcast: o, presence: a, private: l },
        } = this.params,
        u =
          (s =
            (r = this.bindings.postgres_changes) === null || r === void 0
              ? void 0
              : r.map((g) => g.filter)) !== null && s !== void 0
            ? s
            : [],
        d =
          (!!this.bindings[Ln.PRESENCE] &&
            this.bindings[Ln.PRESENCE].length > 0) ||
          ((i = this.params.config.presence) === null || i === void 0
            ? void 0
            : i.enabled) === !0,
        c = {},
        h = {
          broadcast: o,
          presence: Object.assign(Object.assign({}, a), { enabled: d }),
          postgres_changes: u,
          private: l,
        };
      (this.socket.accessTokenValue &&
        (c.access_token = this.socket.accessTokenValue),
        this._onError((g) => {
          e == null || e(qt.CHANNEL_ERROR, bv(g));
        }),
        this._onClose(() => (e == null ? void 0 : e(qt.CLOSED))),
        this.updateJoinPayload(Object.assign({ config: h }, c)),
        this._updateFilterMessage(),
        this.channelAdapter
          .subscribe(n)
          .receive("ok", async ({ postgres_changes: g }) => {
            if (
              (this.socket._isManualToken() || this.socket.setAuth(),
              g === void 0)
            ) {
              e == null || e(qt.SUBSCRIBED);
              return;
            }
            this._updatePostgresBindings(g, e);
          })
          .receive("error", (g) => {
            this.state = pn.errored;
            const y = Object.values(g).join(", ") || "error";
            e == null || e(qt.CHANNEL_ERROR, new Error(y, { cause: g }));
          })
          .receive("timeout", () => {
            e == null || e(qt.TIMED_OUT);
          }));
    }
    return this;
  }
  _updatePostgresBindings(e, n) {
    var r;
    const s = this.bindings.postgres_changes,
      i = (r = s == null ? void 0 : s.length) !== null && r !== void 0 ? r : 0,
      o = [];
    for (let a = 0; a < i; a++) {
      const l = s[a],
        {
          filter: { event: u, schema: d, table: c, filter: h },
        } = l,
        g = e && e[a];
      if (
        g &&
        g.event === u &&
        Gt.isFilterValueEqual(g.schema, d) &&
        Gt.isFilterValueEqual(g.table, c) &&
        Gt.isFilterValueEqual(g.filter, h)
      )
        o.push(Object.assign(Object.assign({}, l), { id: g.id }));
      else {
        (this.unsubscribe(),
          (this.state = pn.errored),
          n == null ||
            n(
              qt.CHANNEL_ERROR,
              new Error(
                "mismatch between server and client bindings for postgres changes",
              ),
            ));
        return;
      }
    }
    ((this.bindings.postgres_changes = o),
      this.state != pn.errored && n && n(qt.SUBSCRIBED));
  }
  presenceState() {
    return this.presence.state;
  }
  async track(e, n = {}) {
    return await this.send({ type: "presence", event: "track", payload: e }, n);
  }
  async untrack(e = {}) {
    return await this.send({ type: "presence", event: "untrack" }, e);
  }
  on(e, n, r) {
    const s = this.channelAdapter.isJoined() || this.channelAdapter.isJoining(),
      i = e === Ln.PRESENCE || e === Ln.POSTGRES_CHANGES;
    if (s && i)
      throw (
        this.socket.log(
          "channel",
          `cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`,
        ),
        new Error(
          `cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`,
        )
      );
    return this._on(e, n, r);
  }
  async httpSend(e, n, r = {}) {
    var s;
    if (n == null)
      return Promise.reject(new Error("Payload is required for httpSend()"));
    const i = n instanceof ArrayBuffer || ArrayBuffer.isView(n),
      o = {
        apikey: this.socket.apiKey ? this.socket.apiKey : "",
        "Content-Type": i ? "application/octet-stream" : "application/json",
      };
    this.socket.accessTokenValue &&
      (o.Authorization = `Bearer ${this.socket.accessTokenValue}`);
    const a = new URL(this.broadcastEndpointURL);
    ((a.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`),
      this.private && a.searchParams.set("private", "true"));
    const l = { method: "POST", headers: o, body: i ? n : JSON.stringify(n) },
      u = await this._fetchWithTimeout(
        a.toString(),
        l,
        (s = r.timeout) !== null && s !== void 0 ? s : this.timeout,
      );
    if (u.status === 202) return { success: !0 };
    if (u.status === 404)
      return Promise.reject(
        new Error(
          "httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md",
        ),
      );
    let d = u.statusText;
    try {
      const c = await u.json();
      d = c.error || c.message || d;
    } catch {}
    return Promise.reject(new Error(d));
  }
  async send(e, n = {}) {
    var r, s;
    if (!this.channelAdapter.canPush() && e.type === "broadcast") {
      const { event: i, payload: o } = e,
        a = {
          apikey: this.socket.apiKey ? this.socket.apiKey : "",
          "Content-Type": "application/json",
        };
      this.socket.accessTokenValue &&
        (a.Authorization = `Bearer ${this.socket.accessTokenValue}`);
      const l = {
        method: "POST",
        headers: a,
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event: i,
              payload: o,
              private: this.private,
            },
          ],
        }),
      };
      try {
        const u = await this._fetchWithTimeout(
          this.broadcastEndpointURL,
          l,
          (r = n.timeout) !== null && r !== void 0 ? r : this.timeout,
        );
        return (
          await ((s = u.body) === null || s === void 0 ? void 0 : s.cancel()),
          u.ok ? "ok" : "error"
        );
      } catch (u) {
        return u instanceof Error && u.name === "AbortError"
          ? "timed out"
          : "error";
      }
    } else
      return new Promise((i) => {
        var o, a, l;
        const u = this.channelAdapter.push(
          e.type,
          e,
          n.timeout || this.timeout,
        );
        (e.type === "broadcast" &&
          !(
            !(
              (l =
                (a =
                  (o = this.params) === null || o === void 0
                    ? void 0
                    : o.config) === null || a === void 0
                  ? void 0
                  : a.broadcast) === null || l === void 0
            ) && l.ack
          ) &&
          i("ok"),
          u.receive("ok", () => i("ok")),
          u.receive("error", () => i("error")),
          u.receive("timeout", () => i("timed out")));
      });
  }
  updateJoinPayload(e) {
    this.channelAdapter.updateJoinPayload(e);
  }
  async unsubscribe(e = this.timeout) {
    return new Promise((n) => {
      this.channelAdapter
        .unsubscribe(e)
        .receive("ok", () => n("ok"))
        .receive("timeout", () => n("timed out"))
        .receive("error", () => n("error"));
    });
  }
  teardown() {
    this.channelAdapter.teardown();
  }
  async _fetchWithTimeout(e, n, r) {
    const s = new AbortController(),
      i = setTimeout(() => s.abort(), r),
      o = await this.socket.fetch(
        e,
        Object.assign(Object.assign({}, n), { signal: s.signal }),
      );
    return (clearTimeout(i), o);
  }
  _on(e, n, r) {
    var s;
    const i = e.toLocaleLowerCase(),
      o = n == null ? void 0 : n.filter;
    if (
      ((o instanceof Nv ||
        (typeof o == "object" && o !== null && typeof o.build == "function")) &&
        (n = Object.assign(Object.assign({}, n), { filter: o.build() })),
      i === Ln.POSTGRES_CHANGES &&
        ((s = this.bindings[i]) === null || s === void 0
          ? void 0
          : s.find((d) => Gt.isSamePostgresFilter(d.filter, n))))
    )
      return (
        this.socket.log(
          "error",
          `duplicate \`postgres_changes\` binding for ${this.topic} ignored`,
          n,
        ),
        this
      );
    const a = this.channelAdapter.on(e, r),
      l = { type: i, filter: n, callback: r, ref: a };
    return (
      this.bindings[i] ? this.bindings[i].push(l) : (this.bindings[i] = [l]),
      this._updateFilterMessage(),
      this
    );
  }
  _onClose(e) {
    this.channelAdapter.onClose(e);
  }
  _onError(e) {
    this.channelAdapter.onError(e);
  }
  _updateFilterMessage() {
    this.channelAdapter.updateFilterBindings((e, n, r) => {
      var s, i, o, a, l, u, d;
      const c = e.event.toLocaleLowerCase();
      if (this._notThisChannelEvent(c, r)) return !1;
      const h =
        (s = this.bindings[c]) === null || s === void 0
          ? void 0
          : s.find((g) => g.ref === e.ref);
      if (!h) return !0;
      if (["broadcast", "presence", "postgres_changes"].includes(c))
        if ("id" in h) {
          const g = h.id,
            y = (i = h.filter) === null || i === void 0 ? void 0 : i.event;
          return (
            g &&
            ((o = n.ids) === null || o === void 0 ? void 0 : o.includes(g)) &&
            (y === "*" ||
              (y == null ? void 0 : y.toLocaleLowerCase()) ===
                ((a = n.data) === null || a === void 0
                  ? void 0
                  : a.type.toLocaleLowerCase()))
          );
        } else {
          const g =
            (u =
              (l = h == null ? void 0 : h.filter) === null || l === void 0
                ? void 0
                : l.event) === null || u === void 0
              ? void 0
              : u.toLocaleLowerCase();
          return (
            g === "*" ||
            g ===
              ((d = n == null ? void 0 : n.event) === null || d === void 0
                ? void 0
                : d.toLocaleLowerCase())
          );
        }
      else return h.type.toLocaleLowerCase() === c;
    });
  }
  _notThisChannelEvent(e, n) {
    const { close: r, error: s, leave: i, join: o } = mp;
    return n && [r, s, i, o].includes(e) && n !== this.joinPush.ref;
  }
  _updateFilterTransform() {
    this.channelAdapter.updatePayloadTransform((e, n, r) => {
      if (typeof n == "object" && "ids" in n) {
        const s = n.data,
          { schema: i, table: o, commit_timestamp: a, type: l, errors: u } = s;
        return Object.assign(
          Object.assign(
            {},
            {
              schema: i,
              table: o,
              commit_timestamp: a,
              eventType: l,
              new: {},
              old: {},
              errors: u,
            },
          ),
          this._getPayloadRecords(s),
        );
      }
      return n;
    });
  }
  copyBindings(e) {
    if (this.joinedOnce)
      throw new Error("cannot copy bindings into joined channel");
    for (const n in e.bindings)
      for (const r of e.bindings[n]) this._on(r.type, r.filter, r.callback);
  }
  static isFilterValueEqual(e, n) {
    return (e ?? void 0) === (n ?? void 0);
  }
  static isSamePostgresFilter(e, n) {
    var r, s, i, o;
    const a =
        (s =
          (r = e == null ? void 0 : e.select) === null || r === void 0
            ? void 0
            : r.join()) !== null && s !== void 0
          ? s
          : void 0,
      l =
        (o =
          (i = n == null ? void 0 : n.select) === null || i === void 0
            ? void 0
            : i.join()) !== null && o !== void 0
          ? o
          : void 0;
    return (
      (e == null ? void 0 : e.event) === (n == null ? void 0 : n.event) &&
      Gt.isFilterValueEqual(
        e == null ? void 0 : e.schema,
        n == null ? void 0 : n.schema,
      ) &&
      Gt.isFilterValueEqual(
        e == null ? void 0 : e.table,
        n == null ? void 0 : n.table,
      ) &&
      Gt.isFilterValueEqual(
        e == null ? void 0 : e.filter,
        n == null ? void 0 : n.filter,
      ) &&
      a === l
    );
  }
  _getPayloadRecords(e) {
    const n = { new: {}, old: {} };
    return (
      (e.type === "INSERT" || e.type === "UPDATE") &&
        (n.new = ad(e.columns, e.record)),
      (e.type === "UPDATE" || e.type === "DELETE") &&
        (n.old = ad(e.columns, e.old_record)),
      n
    );
  }
}
class jv {
  constructor(e, n) {
    this.socket = new _v(e, n);
  }
  get timeout() {
    return this.socket.timeout;
  }
  get endPoint() {
    return this.socket.endPoint;
  }
  get transport() {
    return this.socket.transport;
  }
  get heartbeatIntervalMs() {
    return this.socket.heartbeatIntervalMs;
  }
  get heartbeatCallback() {
    return this.socket.heartbeatCallback;
  }
  set heartbeatCallback(e) {
    this.socket.heartbeatCallback = e;
  }
  get heartbeatTimer() {
    return this.socket.heartbeatTimer;
  }
  get pendingHeartbeatRef() {
    return this.socket.pendingHeartbeatRef;
  }
  get reconnectTimer() {
    return this.socket.reconnectTimer;
  }
  get vsn() {
    return this.socket.vsn;
  }
  get encode() {
    return this.socket.encode;
  }
  get decode() {
    return this.socket.decode;
  }
  get reconnectAfterMs() {
    return this.socket.reconnectAfterMs;
  }
  get sendBuffer() {
    return this.socket.sendBuffer;
  }
  get stateChangeCallbacks() {
    return this.socket.stateChangeCallbacks;
  }
  connect() {
    this.socket.connect();
  }
  disconnect(e, n, r, s = 1e4) {
    return new Promise((i) => {
      (setTimeout(() => i("timeout"), s),
        this.socket.disconnect(
          () => {
            (e(), i("ok"));
          },
          n,
          r,
        ));
    });
  }
  push(e) {
    this.socket.push(e);
  }
  log(e, n, r) {
    this.socket.log(e, n, r);
  }
  makeRef() {
    return this.socket.makeRef();
  }
  onOpen(e) {
    this.socket.onOpen(e);
  }
  onClose(e) {
    this.socket.onClose(e);
  }
  onError(e) {
    this.socket.onError(e);
  }
  onMessage(e) {
    this.socket.onMessage(e);
  }
  isConnected() {
    return this.socket.isConnected();
  }
  isConnecting() {
    return this.socket.connectionState() == Pl.connecting;
  }
  isDisconnecting() {
    return this.socket.connectionState() == Pl.closing;
  }
  connectionState() {
    return this.socket.connectionState();
  }
  endPointURL() {
    return this.socket.endPointURL();
  }
  sendHeartbeat() {
    this.socket.sendHeartbeat();
  }
  getSocket() {
    return this.socket;
  }
}
const hd = { HEARTBEAT_INTERVAL: 25e3 },
  Iv = [1e3, 2e3, 5e3, 1e4],
  Lv = 1e4;
function $v() {
  const t = new Map();
  return {
    get length() {
      return t.size;
    },
    clear() {
      t.clear();
    },
    getItem(e) {
      return t.has(e) ? t.get(e) : null;
    },
    key(e) {
      var n;
      return (n = Array.from(t.keys())[e]) !== null && n !== void 0 ? n : null;
    },
    removeItem(e) {
      t.delete(e);
    },
    setItem(e, n) {
      t.set(e, String(n));
    },
  };
}
function Dv() {
  try {
    if (typeof globalThis < "u" && globalThis.sessionStorage)
      return globalThis.sessionStorage;
  } catch {}
  return $v();
}
const Uv = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class Mv {
  get endPoint() {
    return this.socketAdapter.endPoint;
  }
  get timeout() {
    return this.socketAdapter.timeout;
  }
  get transport() {
    return this.socketAdapter.transport;
  }
  get heartbeatCallback() {
    return this.socketAdapter.heartbeatCallback;
  }
  get heartbeatIntervalMs() {
    return this.socketAdapter.heartbeatIntervalMs;
  }
  get heartbeatTimer() {
    return this.worker
      ? this._workerHeartbeatTimer
      : this.socketAdapter.heartbeatTimer;
  }
  get pendingHeartbeatRef() {
    return this.worker
      ? this._pendingWorkerHeartbeatRef
      : this.socketAdapter.pendingHeartbeatRef;
  }
  get reconnectTimer() {
    return this.socketAdapter.reconnectTimer;
  }
  get vsn() {
    return this.socketAdapter.vsn;
  }
  get encode() {
    return this.socketAdapter.encode;
  }
  get decode() {
    return this.socketAdapter.decode;
  }
  get reconnectAfterMs() {
    return this.socketAdapter.reconnectAfterMs;
  }
  get sendBuffer() {
    return this.socketAdapter.sendBuffer;
  }
  get stateChangeCallbacks() {
    return this.socketAdapter.stateChangeCallbacks;
  }
  constructor(e, n) {
    var r;
    if (
      ((this.channels = new Array()),
      (this.accessTokenValue = null),
      (this.accessToken = null),
      (this.apiKey = null),
      (this.httpEndpoint = ""),
      (this.headers = {}),
      (this.params = {}),
      (this.ref = 0),
      (this.serializer = new sv()),
      (this._manuallySetToken = !1),
      (this._authPromise = null),
      (this._authGeneration = 0),
      (this._workerHeartbeatTimer = void 0),
      (this._pendingWorkerHeartbeatRef = null),
      (this._pendingDisconnectTimer = null),
      (this._disconnectOnEmptyChannelsAfterMs = 0),
      (this._resolveFetch = (i) =>
        i ? (...o) => i(...o) : (...o) => fetch(...o)),
      !(
        !((r = n == null ? void 0 : n.params) === null || r === void 0) &&
        r.apikey
      ))
    )
      throw new Error("API key is required to connect to Realtime");
    this.apiKey = n.params.apikey;
    const s = this._initializeOptions(n);
    ((this.socketAdapter = new jv(e, s)),
      (this.httpEndpoint = vp(e)),
      (this.fetch = this._resolveFetch(n == null ? void 0 : n.fetch)));
  }
  connect() {
    if (!(
      this.isConnecting() ||
      this.isDisconnecting() ||
      this.isConnected()
    )) {
      (this.accessToken && !this._authPromise && this._setAuthSafely("connect"),
        this._setupConnectionHandlers());
      try {
        this.socketAdapter.connect();
      } catch (e) {
        const n = e.message;
        throw new Error(`WebSocket not available: ${n}`);
      }
      this._handleNodeJsRaceCondition();
    }
  }
  endpointURL() {
    return this.socketAdapter.endPointURL();
  }
  async disconnect(e, n) {
    return (
      this._cancelPendingDisconnect(),
      this.isDisconnecting()
        ? "ok"
        : await this.socketAdapter.disconnect(
            () => {
              (clearInterval(this._workerHeartbeatTimer),
                this._terminateWorker());
            },
            e,
            n,
          )
    );
  }
  getChannels() {
    return this.channels;
  }
  async removeChannel(e) {
    const n = await e.unsubscribe();
    return (n === "ok" && e.teardown(), n);
  }
  async removeAllChannels() {
    const e = this.channels.map(async (r) => {
        const s = await r.unsubscribe();
        return (r.teardown(), s);
      }),
      n = await Promise.all(e);
    return (await this.disconnect(), n);
  }
  log(e, n, r) {
    this.socketAdapter.log(e, n, r);
  }
  connectionState() {
    return this.socketAdapter.connectionState() || Pl.closed;
  }
  isConnected() {
    return this.socketAdapter.isConnected();
  }
  isConnecting() {
    return this.socketAdapter.isConnecting();
  }
  isDisconnecting() {
    return this.socketAdapter.isDisconnecting();
  }
  channel(e, n = { config: {} }) {
    const r = `realtime:${e}`,
      s = this.getChannels().find((i) => i.topic === r);
    if (s) return s;
    {
      const i = new Gt(`realtime:${e}`, n, this);
      return (this._cancelPendingDisconnect(), this.channels.push(i), i);
    }
  }
  push(e) {
    this.socketAdapter.push(e);
  }
  async setAuth(e = null) {
    const n = ++this._authGeneration,
      r = this._performAuth(e, n);
    n === this._authGeneration && (this._authPromise = r);
    try {
      await r;
    } finally {
      this._authPromise === r && (this._authPromise = null);
    }
  }
  _isManualToken() {
    return this._manuallySetToken;
  }
  async sendHeartbeat() {
    this.socketAdapter.sendHeartbeat();
  }
  onHeartbeat(e) {
    this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(e);
  }
  _makeRef() {
    return this.socketAdapter.makeRef();
  }
  _remove(e) {
    ((this.channels = this.channels.filter((n) => n.topic !== e.topic)),
      this.channels.length === 0 &&
        (this.log("transport", "no channels remaining, scheduling disconnect"),
        this._schedulePendingDisconnect()));
  }
  _schedulePendingDisconnect() {
    if (
      (this._cancelPendingDisconnect(),
      this._disconnectOnEmptyChannelsAfterMs === 0)
    ) {
      (this.log("transport", "disconnecting immediately - no channels"),
        this.disconnect());
      return;
    }
    ((this._pendingDisconnectTimer = setTimeout(() => {
      ((this._pendingDisconnectTimer = null),
        this.channels.length === 0 &&
          (this.log(
            "transport",
            "deferred disconnect fired - no channels, disconnecting",
          ),
          this.disconnect()));
    }, this._disconnectOnEmptyChannelsAfterMs)),
      this.log(
        "transport",
        `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`,
      ));
  }
  _cancelPendingDisconnect() {
    this._pendingDisconnectTimer !== null &&
      (this.log(
        "transport",
        "pending disconnect cancelled - channel activity detected",
      ),
      clearTimeout(this._pendingDisconnectTimer),
      (this._pendingDisconnectTimer = null));
  }
  async _performAuth(e, n) {
    let r,
      s = !1;
    if (e) ((r = e), (s = !0));
    else if (this.accessToken)
      try {
        r = await this.accessToken();
      } catch (i) {
        (this.log("error", "Error fetching access token from callback", i),
          (r = this.accessTokenValue));
      }
    else r = this.accessTokenValue;
    n === this._authGeneration &&
      (this.accessToken
        ? (this._manuallySetToken = !1)
        : s && (this._manuallySetToken = !0),
      this.accessTokenValue != r &&
        ((this.accessTokenValue = r),
        this.channels.forEach((i) => {
          const o = { access_token: r, version: Zy };
          (i.updateJoinPayload(o),
            i.joinedOnce &&
              i.channelAdapter.isJoined() &&
              i.channelAdapter.push(mp.access_token, { access_token: r }));
        })));
  }
  async _waitForAuthIfNeeded() {
    this._authPromise && (await this._authPromise);
  }
  _setAuthSafely(e = "general") {
    this._isManualToken() ||
      this.setAuth().catch((n) => {
        this.log("error", `Error setting auth in ${e}`, n);
      });
  }
  _setupConnectionHandlers() {
    (this.socketAdapter.onOpen(() => {
      ((
        this._authPromise ||
        (this.accessToken && !this.accessTokenValue
          ? this.setAuth()
          : Promise.resolve())
      ).catch((n) => {
        this.log("error", "error waiting for auth on connect", n);
      }),
        this.worker && !this.workerRef && this._startWorkerHeartbeat());
    }),
      this.socketAdapter.onClose(() => {
        this.worker && this.workerRef && this._terminateWorker();
      }),
      this.socketAdapter.onMessage((e) => {
        e.ref &&
          e.ref === this._pendingWorkerHeartbeatRef &&
          (this._pendingWorkerHeartbeatRef = null);
      }));
  }
  _handleNodeJsRaceCondition() {
    this.socketAdapter.isConnected() &&
      this.socketAdapter.getSocket().onConnOpen();
  }
  _wrapHeartbeatCallback(e) {
    return (n, r) => {
      n !== "disconnected" &&
        (n == "sent" && this._setAuthSafely(), e && e(n, r));
    };
  }
  _startWorkerHeartbeat() {
    this.workerUrl
      ? this.log("worker", `starting worker for from ${this.workerUrl}`)
      : this.log("worker", "starting default worker");
    const e = this._workerObjectUrl(this.workerUrl);
    ((this.workerRef = new Worker(e)),
      (this.workerRef.onerror = (n) => {
        (this.log("worker", "worker error", n.message),
          this._terminateWorker(),
          this.disconnect());
      }),
      (this.workerRef.onmessage = (n) => {
        n.data.event === "keepAlive" && this.sendHeartbeat();
      }),
      this.workerRef.postMessage({
        event: "start",
        interval: this.heartbeatIntervalMs,
      }));
  }
  _terminateWorker() {
    this.workerRef &&
      (this.log("worker", "terminating worker"),
      this.workerRef.terminate(),
      (this.workerRef = void 0));
  }
  _workerObjectUrl(e) {
    let n;
    if (e) n = e;
    else {
      const r = new Blob([Uv], { type: "application/javascript" });
      n = URL.createObjectURL(r);
    }
    return n;
  }
  _initializeOptions(e) {
    var n, r, s, i, o, a, l, u, d, c, h, g;
    ((this.worker =
      (n = e == null ? void 0 : e.worker) !== null && n !== void 0 ? n : !1),
      (this.accessToken =
        (r = e == null ? void 0 : e.accessToken) !== null && r !== void 0
          ? r
          : null));
    const y = {};
    ((y.timeout =
      (s = e == null ? void 0 : e.timeout) !== null && s !== void 0 ? s : nv),
      (y.heartbeatIntervalMs =
        (i = e == null ? void 0 : e.heartbeatIntervalMs) !== null &&
        i !== void 0
          ? i
          : hd.HEARTBEAT_INTERVAL),
      (this._disconnectOnEmptyChannelsAfterMs =
        (o = e == null ? void 0 : e.disconnectOnEmptyChannelsAfterMs) !==
          null && o !== void 0
          ? o
          : 2 *
            ((a = e == null ? void 0 : e.heartbeatIntervalMs) !== null &&
            a !== void 0
              ? a
              : hd.HEARTBEAT_INTERVAL)),
      (y.transport =
        (l = e == null ? void 0 : e.transport) !== null && l !== void 0
          ? l
          : Yy.getWebSocketConstructor()),
      (y.params = e == null ? void 0 : e.params),
      (y.logger = e == null ? void 0 : e.logger),
      (y.heartbeatCallback = this._wrapHeartbeatCallback(
        e == null ? void 0 : e.heartbeatCallback,
      )),
      (y.sessionStorage =
        (u = e == null ? void 0 : e.sessionStorage) !== null && u !== void 0
          ? u
          : Dv()),
      (y.reconnectAfterMs =
        (d = e == null ? void 0 : e.reconnectAfterMs) !== null && d !== void 0
          ? d
          : (f) => Iv[f - 1] || Lv));
    let v, k;
    const p =
      (c = e == null ? void 0 : e.vsn) !== null && c !== void 0 ? c : tv;
    switch (p) {
      case ev:
        ((v = (f, m) => m(JSON.stringify(f))),
          (k = (f, m) => m(JSON.parse(f))));
        break;
      case gp:
        ((v = this.serializer.encode.bind(this.serializer)),
          (k = this.serializer.decode.bind(this.serializer)));
        break;
      default:
        throw new Error(`Unsupported serializer version: ${y.vsn}`);
    }
    if (
      ((y.vsn = p),
      (y.encode =
        (h = e == null ? void 0 : e.encode) !== null && h !== void 0 ? h : v),
      (y.decode =
        (g = e == null ? void 0 : e.decode) !== null && g !== void 0 ? g : k),
      (y.beforeReconnect = this._reconnectAuth.bind(this)),
      ((e != null && e.logLevel) || (e != null && e.log_level)) &&
        ((this.logLevel = e.logLevel || e.log_level),
        (y.params = Object.assign(Object.assign({}, y.params), {
          log_level: this.logLevel,
        }))),
      this.worker)
    ) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      ((this.workerUrl = e == null ? void 0 : e.workerUrl),
        (y.autoSendHeartbeat = !this.worker));
    }
    return y;
  }
  async _reconnectAuth() {
    (await this._waitForAuthIfNeeded(), this.isConnected() || this.connect());
  }
}
var $s = class extends Error {
  constructor(t, e) {
    var n;
    (super(t),
      (this.name = "IcebergError"),
      (this.status = e.status),
      (this.icebergType = e.icebergType),
      (this.icebergCode = e.icebergCode),
      (this.details = e.details),
      (this.isCommitStateUnknown =
        e.icebergType === "CommitStateUnknownException" ||
        ([500, 502, 504].includes(e.status) &&
          ((n = e.icebergType) == null ? void 0 : n.includes("CommitState")) ===
            !0)));
  }
  isNotFound() {
    return this.status === 404;
  }
  isConflict() {
    return this.status === 409;
  }
  isAuthenticationTimeout() {
    return this.status === 419;
  }
};
function Bv(t, e, n) {
  const r = new URL(e, t);
  if (n)
    for (const [s, i] of Object.entries(n))
      i !== void 0 && r.searchParams.set(s, i);
  return r.toString();
}
async function Fv(t) {
  return !t || t.type === "none"
    ? {}
    : t.type === "bearer"
      ? { Authorization: `Bearer ${t.token}` }
      : t.type === "header"
        ? { [t.name]: t.value }
        : t.type === "custom"
          ? await t.getHeaders()
          : {};
}
function zv(t) {
  const e = t.fetchImpl ?? globalThis.fetch;
  return {
    async request({ method: n, path: r, query: s, body: i, headers: o }) {
      const a = Bv(t.baseUrl, r, s),
        l = await Fv(t.auth),
        u = await e(a, {
          method: n,
          headers: {
            ...(i ? { "Content-Type": "application/json" } : {}),
            ...l,
            ...o,
          },
          body: i ? JSON.stringify(i) : void 0,
        }),
        d = await u.text(),
        c = (u.headers.get("content-type") || "").includes("application/json"),
        h = c && d ? JSON.parse(d) : d;
      if (!u.ok) {
        const g = c ? h : void 0,
          y = g == null ? void 0 : g.error;
        throw new $s(
          (y == null ? void 0 : y.message) ??
            `Request failed with status ${u.status}`,
          {
            status: u.status,
            icebergType: y == null ? void 0 : y.type,
            icebergCode: y == null ? void 0 : y.code,
            details: g,
          },
        );
      }
      return { status: u.status, headers: u.headers, data: h };
    },
  };
}
function Si(t) {
  return t.join("");
}
var Hv = class {
  constructor(t, e = "") {
    ((this.client = t), (this.prefix = e));
  }
  async listNamespaces(t) {
    const e = t ? { parent: Si(t.namespace) } : void 0;
    return (
      await this.client.request({
        method: "GET",
        path: `${this.prefix}/namespaces`,
        query: e,
      })
    ).data.namespaces.map((r) => ({ namespace: r }));
  }
  async createNamespace(t, e) {
    const n = {
      namespace: t.namespace,
      properties: e == null ? void 0 : e.properties,
    };
    return (
      await this.client.request({
        method: "POST",
        path: `${this.prefix}/namespaces`,
        body: n,
      })
    ).data;
  }
  async dropNamespace(t) {
    await this.client.request({
      method: "DELETE",
      path: `${this.prefix}/namespaces/${Si(t.namespace)}`,
    });
  }
  async loadNamespaceMetadata(t) {
    return {
      properties: (
        await this.client.request({
          method: "GET",
          path: `${this.prefix}/namespaces/${Si(t.namespace)}`,
        })
      ).data.properties,
    };
  }
  async namespaceExists(t) {
    try {
      return (
        await this.client.request({
          method: "HEAD",
          path: `${this.prefix}/namespaces/${Si(t.namespace)}`,
        }),
        !0
      );
    } catch (e) {
      if (e instanceof $s && e.status === 404) return !1;
      throw e;
    }
  }
  async createNamespaceIfNotExists(t, e) {
    try {
      return await this.createNamespace(t, e);
    } catch (n) {
      if (n instanceof $s && n.status === 409) return;
      throw n;
    }
  }
};
function sr(t) {
  return t.join("");
}
var Vv = class {
    constructor(t, e = "", n) {
      ((this.client = t), (this.prefix = e), (this.accessDelegation = n));
    }
    async listTables(t) {
      return (
        await this.client.request({
          method: "GET",
          path: `${this.prefix}/namespaces/${sr(t.namespace)}/tables`,
        })
      ).data.identifiers;
    }
    async createTable(t, e) {
      const n = {};
      return (
        this.accessDelegation &&
          (n["X-Iceberg-Access-Delegation"] = this.accessDelegation),
        (
          await this.client.request({
            method: "POST",
            path: `${this.prefix}/namespaces/${sr(t.namespace)}/tables`,
            body: e,
            headers: n,
          })
        ).data.metadata
      );
    }
    async updateTable(t, e) {
      const n = await this.client.request({
        method: "POST",
        path: `${this.prefix}/namespaces/${sr(t.namespace)}/tables/${t.name}`,
        body: e,
      });
      return {
        "metadata-location": n.data["metadata-location"],
        metadata: n.data.metadata,
      };
    }
    async dropTable(t, e) {
      await this.client.request({
        method: "DELETE",
        path: `${this.prefix}/namespaces/${sr(t.namespace)}/tables/${t.name}`,
        query: { purgeRequested: String((e == null ? void 0 : e.purge) ?? !1) },
      });
    }
    async loadTable(t) {
      const e = {};
      return (
        this.accessDelegation &&
          (e["X-Iceberg-Access-Delegation"] = this.accessDelegation),
        (
          await this.client.request({
            method: "GET",
            path: `${this.prefix}/namespaces/${sr(t.namespace)}/tables/${t.name}`,
            headers: e,
          })
        ).data.metadata
      );
    }
    async tableExists(t) {
      const e = {};
      this.accessDelegation &&
        (e["X-Iceberg-Access-Delegation"] = this.accessDelegation);
      try {
        return (
          await this.client.request({
            method: "HEAD",
            path: `${this.prefix}/namespaces/${sr(t.namespace)}/tables/${t.name}`,
            headers: e,
          }),
          !0
        );
      } catch (n) {
        if (n instanceof $s && n.status === 404) return !1;
        throw n;
      }
    }
    async createTableIfNotExists(t, e) {
      try {
        return await this.createTable(t, e);
      } catch (n) {
        if (n instanceof $s && n.status === 409)
          return await this.loadTable({ namespace: t.namespace, name: e.name });
        throw n;
      }
    }
  },
  Wv = class {
    constructor(t) {
      var r;
      let e = "v1";
      t.catalogName && (e += `/${t.catalogName}`);
      const n = t.baseUrl.endsWith("/") ? t.baseUrl : `${t.baseUrl}/`;
      ((this.client = zv({ baseUrl: n, auth: t.auth, fetchImpl: t.fetch })),
        (this.accessDelegation =
          (r = t.accessDelegation) == null ? void 0 : r.join(",")),
        (this.namespaceOps = new Hv(this.client, e)),
        (this.tableOps = new Vv(this.client, e, this.accessDelegation)));
    }
    async listNamespaces(t) {
      return this.namespaceOps.listNamespaces(t);
    }
    async createNamespace(t, e) {
      return this.namespaceOps.createNamespace(t, e);
    }
    async dropNamespace(t) {
      await this.namespaceOps.dropNamespace(t);
    }
    async loadNamespaceMetadata(t) {
      return this.namespaceOps.loadNamespaceMetadata(t);
    }
    async listTables(t) {
      return this.tableOps.listTables(t);
    }
    async createTable(t, e) {
      return this.tableOps.createTable(t, e);
    }
    async updateTable(t, e) {
      return this.tableOps.updateTable(t, e);
    }
    async dropTable(t, e) {
      await this.tableOps.dropTable(t, e);
    }
    async loadTable(t) {
      return this.tableOps.loadTable(t);
    }
    async namespaceExists(t) {
      return this.namespaceOps.namespaceExists(t);
    }
    async tableExists(t) {
      return this.tableOps.tableExists(t);
    }
    async createNamespaceIfNotExists(t, e) {
      return this.namespaceOps.createNamespaceIfNotExists(t, e);
    }
    async createTableIfNotExists(t, e) {
      return this.tableOps.createTableIfNotExists(t, e);
    }
  };
function Ds(t) {
  "@babel/helpers - typeof";
  return (
    (Ds =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    Ds(t)
  );
}
function Kv(t, e) {
  if (Ds(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e);
    if (Ds(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function qv(t) {
  var e = Kv(t, "string");
  return Ds(e) == "symbol" ? e : e + "";
}
function Gv(t, e, n) {
  return (
    (e = qv(e)) in t
      ? Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = n),
    t
  );
}
function fd(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    (e &&
      (r = r.filter(function (s) {
        return Object.getOwnPropertyDescriptor(t, s).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function z(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? fd(Object(n), !0).forEach(function (r) {
          Gv(t, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : fd(Object(n)).forEach(function (r) {
            Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return t;
}
var Wo = class extends Error {
  constructor(t, e = "storage", n, r) {
    (super(t),
      (this.__isStorageError = !0),
      (this.namespace = e),
      (this.name = e === "vectors" ? "StorageVectorsError" : "StorageError"),
      (this.status = n),
      (this.statusCode = r));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
};
function Ko(t) {
  return typeof t == "object" && t !== null && "__isStorageError" in t;
}
var Ll = class extends Wo {
    constructor(t, e, n, r = "storage", s) {
      (super(t, r, e, n),
        (this.name =
          r === "vectors" ? "StorageVectorsApiError" : "StorageApiError"),
        (this.status = e),
        (this.statusCode = n),
        (this.code = s));
    }
    toJSON() {
      return z(z({}, super.toJSON()), {}, { code: this.code });
    }
  },
  _p = class extends Wo {
    constructor(t, e, n = "storage") {
      (super(t, n),
        (this.name =
          n === "vectors"
            ? "StorageVectorsUnknownError"
            : "StorageUnknownError"),
        (this.originalError = e));
    }
  };
function wo(t, e, n) {
  const r = z({}, t),
    s = e.toLowerCase();
  for (const i of Object.keys(r)) i.toLowerCase() === s && delete r[i];
  return ((r[s] = n), r);
}
function Jv(t) {
  const e = {};
  for (const [n, r] of Object.entries(t)) e[n.toLowerCase()] = r;
  return e;
}
const Qv = (t) => (t ? (...e) => t(...e) : (...e) => fetch(...e)),
  Yv = (t) => {
    if (typeof t != "object" || t === null) return !1;
    const e = Object.getPrototypeOf(t);
    return (
      (e === null ||
        e === Object.prototype ||
        Object.getPrototypeOf(e) === null) &&
      !(Symbol.toStringTag in t) &&
      !(Symbol.iterator in t)
    );
  },
  $l = (t) => {
    if (Array.isArray(t)) return t.map((n) => $l(n));
    if (typeof t == "function" || t !== Object(t)) return t;
    const e = {};
    return (
      Object.entries(t).forEach(([n, r]) => {
        const s = n.replace(/([-_][a-z])/gi, (i) =>
          i.toUpperCase().replace(/[-_]/g, ""),
        );
        e[s] = $l(r);
      }),
      e
    );
  },
  Xv = (t) =>
    !t ||
    typeof t != "string" ||
    t.length === 0 ||
    t.length > 100 ||
    t.trim() !== t ||
    t.includes("/") ||
    t.includes("\\")
      ? !1
      : /^[\w!.\*'() &$@=;:+,?-]+$/.test(t),
  kp = (t) => t.split("/").map(encodeURIComponent).join("/"),
  pd = (t) => {
    if (typeof t == "object" && t !== null) {
      const e = t;
      if (typeof e.msg == "string") return e.msg;
      if (typeof e.message == "string") return e.message;
      if (typeof e.error_description == "string") return e.error_description;
      if (typeof e.error == "string") return e.error;
      if (typeof e.error == "object" && e.error !== null) {
        const n = e.error;
        if (typeof n.message == "string") return n.message;
      }
    }
    return JSON.stringify(t);
  },
  Zv = async (t, e, n, r) => {
    if (
      t !== null &&
      typeof t == "object" &&
      "json" in t &&
      typeof t.json == "function"
    ) {
      const s = t;
      let i = parseInt(String(s.status), 10);
      (Number.isFinite(i) || (i = 500),
        s
          .json()
          .then((o) => {
            const a =
              (o == null ? void 0 : o.statusCode) ||
              (o == null ? void 0 : o.code) ||
              i + "";
            e(new Ll(pd(o), i, a, r, o == null ? void 0 : o.code));
          })
          .catch(() => {
            const o = i + "";
            e(new Ll(s.statusText || `HTTP ${i} error`, i, o, r));
          }));
    } else e(new _p(pd(t), t, r));
  },
  e0 = (t, e, n, r) => {
    const s = { method: t, headers: (e == null ? void 0 : e.headers) || {} };
    if (t === "GET" || t === "HEAD" || !r) return z(z({}, s), n);
    if (Yv(r)) {
      var i;
      const o = (e == null ? void 0 : e.headers) || {};
      let a;
      for (const [l, u] of Object.entries(o))
        l.toLowerCase() === "content-type" && (a = u);
      ((s.headers = wo(
        o,
        "Content-Type",
        (i = a) !== null && i !== void 0 ? i : "application/json",
      )),
        (s.body = JSON.stringify(r)));
    } else s.body = r;
    return (e != null && e.duplex && (s.duplex = e.duplex), z(z({}, s), n));
  };
async function Yr(t, e, n, r, s, i, o) {
  return new Promise((a, l) => {
    t(n, e0(e, r, s, i))
      .then((u) => {
        if (!u.ok) throw u;
        if (r != null && r.noResolveJson) return u;
        if (o === "vectors") {
          const d = u.headers.get("content-type");
          if (u.headers.get("content-length") === "0" || u.status === 204)
            return {};
          if (!d || !d.includes("application/json")) return {};
        }
        return u.json();
      })
      .then((u) => a(u))
      .catch((u) => Zv(u, l, r, o));
  });
}
function Sp(t = "storage") {
  return {
    get: async (e, n, r, s) => Yr(e, "GET", n, r, s, void 0, t),
    post: async (e, n, r, s, i) => Yr(e, "POST", n, s, i, r, t),
    put: async (e, n, r, s, i) => Yr(e, "PUT", n, s, i, r, t),
    head: async (e, n, r, s) =>
      Yr(e, "HEAD", n, z(z({}, r), {}, { noResolveJson: !0 }), s, void 0, t),
    remove: async (e, n, r, s, i) => Yr(e, "DELETE", n, s, i, r, t),
  };
}
const t0 = Sp("storage"),
  { get: Us, post: Tt, put: Dl, head: n0, remove: Ms } = t0,
  rt = Sp("vectors");
var zr = class {
  constructor(t, e = {}, n, r = "storage") {
    ((this.shouldThrowOnError = !1),
      (this.url = t),
      (this.headers = Jv(e)),
      (this.fetch = Qv(n)),
      (this.namespace = r));
  }
  throwOnError() {
    return ((this.shouldThrowOnError = !0), this);
  }
  setHeader(t, e) {
    return ((this.headers = wo(this.headers, t, e)), this);
  }
  async handleOperation(t) {
    var e = this;
    try {
      return { data: await t(), error: null };
    } catch (n) {
      if (e.shouldThrowOnError) throw n;
      if (Ko(n)) return { data: null, error: n };
      throw n;
    }
  }
};
let Ep;
Ep = Symbol.toStringTag;
var r0 = class {
  constructor(t, e) {
    ((this.downloadFn = t),
      (this.shouldThrowOnError = e),
      (this[Ep] = "StreamDownloadBuilder"),
      (this.promise = null));
  }
  then(t, e) {
    return this.getPromise().then(t, e);
  }
  catch(t) {
    return this.getPromise().catch(t);
  }
  finally(t) {
    return this.getPromise().finally(t);
  }
  getPromise() {
    return (this.promise || (this.promise = this.execute()), this.promise);
  }
  async execute() {
    var t = this;
    try {
      return { data: (await t.downloadFn()).body, error: null };
    } catch (e) {
      if (t.shouldThrowOnError) throw e;
      if (Ko(e)) return { data: null, error: e };
      throw e;
    }
  }
};
let bp;
bp = Symbol.toStringTag;
var s0 = class {
  constructor(t, e) {
    ((this.downloadFn = t),
      (this.shouldThrowOnError = e),
      (this[bp] = "BlobDownloadBuilder"),
      (this.promise = null));
  }
  asStream() {
    return new r0(this.downloadFn, this.shouldThrowOnError);
  }
  then(t, e) {
    return this.getPromise().then(t, e);
  }
  catch(t) {
    return this.getPromise().catch(t);
  }
  finally(t) {
    return this.getPromise().finally(t);
  }
  getPromise() {
    return (this.promise || (this.promise = this.execute()), this.promise);
  }
  async execute() {
    var t = this;
    try {
      return { data: await (await t.downloadFn()).blob(), error: null };
    } catch (e) {
      if (t.shouldThrowOnError) throw e;
      if (Ko(e)) return { data: null, error: e };
      throw e;
    }
  }
};
const Ea = { limit: 100, offset: 0, sortBy: { column: "name", order: "asc" } },
  gd = {
    cacheControl: "3600",
    contentType: "text/plain;charset=UTF-8",
    upsert: !1,
  };
var i0 = class extends zr {
  constructor(t, e = {}, n, r) {
    (super(t, e, r, "storage"), (this.bucketId = n));
  }
  async uploadOrUpdate(t, e, n, r) {
    var s = this;
    return s.handleOperation(async () => {
      let i;
      const o = z(z({}, gd), r);
      let a = z(
        z({}, s.headers),
        t === "POST" && { "x-upsert": String(o.upsert) },
      );
      const l = o.metadata;
      if (
        (typeof Blob < "u" && n instanceof Blob
          ? ((i = new FormData()),
            i.append("cacheControl", o.cacheControl),
            l && i.append("metadata", s.encodeMetadata(l)),
            i.append("", n))
          : typeof FormData < "u" && n instanceof FormData
            ? ((i = n),
              i.has("cacheControl") || i.append("cacheControl", o.cacheControl),
              l &&
                !i.has("metadata") &&
                i.append("metadata", s.encodeMetadata(l)))
            : ((i = n),
              (a["cache-control"] = `max-age=${o.cacheControl}`),
              (a["content-type"] = o.contentType),
              l && (a["x-metadata"] = s.toBase64(s.encodeMetadata(l))),
              ((typeof ReadableStream < "u" && i instanceof ReadableStream) ||
                (i &&
                  typeof i == "object" &&
                  "pipe" in i &&
                  typeof i.pipe == "function")) &&
                !o.duplex &&
                (o.duplex = "half")),
        r != null && r.headers)
      )
        for (const [h, g] of Object.entries(r.headers)) a = wo(a, h, g);
      const u = s._removeEmptyFolders(e),
        d = s._getFinalPath(u),
        c = await (t == "PUT" ? Dl : Tt)(
          s.fetch,
          `${s.url}/object/${d}`,
          i,
          z({ headers: a }, o != null && o.duplex ? { duplex: o.duplex } : {}),
        );
      return { path: u, id: c.Id, fullPath: c.Key };
    });
  }
  async upload(t, e, n) {
    return this.uploadOrUpdate("POST", t, e, n);
  }
  async uploadToSignedUrl(t, e, n, r) {
    var s = this;
    const i = s._removeEmptyFolders(t),
      o = s._getFinalPath(i),
      a = new URL(s.url + `/object/upload/sign/${o}`);
    return (
      a.searchParams.set("token", e),
      s.handleOperation(async () => {
        let l;
        const u = z(z({}, gd), r);
        let d = z(z({}, s.headers), { "x-upsert": String(u.upsert) });
        const c = u.metadata;
        if (
          (typeof Blob < "u" && n instanceof Blob
            ? ((l = new FormData()),
              l.append("cacheControl", u.cacheControl),
              c && l.append("metadata", s.encodeMetadata(c)),
              l.append("", n))
            : typeof FormData < "u" && n instanceof FormData
              ? ((l = n),
                l.has("cacheControl") ||
                  l.append("cacheControl", u.cacheControl),
                c &&
                  !l.has("metadata") &&
                  l.append("metadata", s.encodeMetadata(c)))
              : ((l = n),
                (d["cache-control"] = `max-age=${u.cacheControl}`),
                (d["content-type"] = u.contentType),
                c && (d["x-metadata"] = s.toBase64(s.encodeMetadata(c))),
                ((typeof ReadableStream < "u" && l instanceof ReadableStream) ||
                  (l &&
                    typeof l == "object" &&
                    "pipe" in l &&
                    typeof l.pipe == "function")) &&
                  !u.duplex &&
                  (u.duplex = "half")),
          r != null && r.headers)
        )
          for (const [h, g] of Object.entries(r.headers)) d = wo(d, h, g);
        return {
          path: i,
          fullPath: (
            await Dl(
              s.fetch,
              a.toString(),
              l,
              z(
                { headers: d },
                u != null && u.duplex ? { duplex: u.duplex } : {},
              ),
            )
          ).Key,
        };
      })
    );
  }
  async createSignedUploadUrl(t, e) {
    var n = this;
    return n.handleOperation(async () => {
      let r = n._getFinalPath(t);
      const s = z({}, n.headers);
      e != null && e.upsert && (s["x-upsert"] = "true");
      const i = await Tt(
          n.fetch,
          `${n.url}/object/upload/sign/${r}`,
          {},
          { headers: s },
        ),
        o = new URL(n.url + i.url),
        a = o.searchParams.get("token");
      if (!a) throw new Wo("No token returned by API");
      return { signedUrl: o.toString(), path: t, token: a };
    });
  }
  async update(t, e, n) {
    return this.uploadOrUpdate("PUT", t, e, n);
  }
  async move(t, e, n) {
    var r = this;
    return r.handleOperation(
      async () =>
        await Tt(
          r.fetch,
          `${r.url}/object/move`,
          {
            bucketId: r.bucketId,
            sourceKey: t,
            destinationKey: e,
            destinationBucket: n == null ? void 0 : n.destinationBucket,
          },
          { headers: r.headers },
        ),
    );
  }
  async copy(t, e, n) {
    var r = this;
    return r.handleOperation(async () => ({
      path: (
        await Tt(
          r.fetch,
          `${r.url}/object/copy`,
          {
            bucketId: r.bucketId,
            sourceKey: t,
            destinationKey: e,
            destinationBucket: n == null ? void 0 : n.destinationBucket,
          },
          { headers: r.headers },
        )
      ).Key,
    }));
  }
  async createSignedUrl(t, e, n) {
    var r = this;
    return r.handleOperation(async () => {
      let s = r._getFinalPath(t);
      const i =
        typeof (n == null ? void 0 : n.transform) == "object" &&
        n.transform !== null &&
        Object.keys(n.transform).length > 0;
      let o = await Tt(
        r.fetch,
        `${r.url}/object/sign/${s}`,
        z({ expiresIn: e }, i ? { transform: n.transform } : {}),
        { headers: r.headers },
      );
      const a = new URLSearchParams();
      (n != null &&
        n.download &&
        a.set("download", n.download === !0 ? "" : n.download),
        (n == null ? void 0 : n.cacheNonce) != null &&
          a.set("cacheNonce", String(n.cacheNonce)));
      const l = a.toString();
      return {
        signedUrl: encodeURI(`${r.url}${o.signedURL}${l ? `&${l}` : ""}`),
      };
    });
  }
  async createSignedUrls(t, e, n) {
    var r = this;
    return r.handleOperation(async () => {
      const s = await Tt(
          r.fetch,
          `${r.url}/object/sign/${r.bucketId}`,
          { expiresIn: e, paths: t },
          { headers: r.headers },
        ),
        i = new URLSearchParams();
      (n != null &&
        n.download &&
        i.set("download", n.download === !0 ? "" : n.download),
        (n == null ? void 0 : n.cacheNonce) != null &&
          i.set("cacheNonce", String(n.cacheNonce)));
      const o = i.toString();
      return s.map((a) =>
        z(
          z({}, a),
          {},
          {
            signedUrl: a.signedURL
              ? encodeURI(`${r.url}${a.signedURL}${o ? `&${o}` : ""}`)
              : null,
          },
        ),
      );
    });
  }
  download(t, e, n) {
    const r =
        typeof (e == null ? void 0 : e.transform) == "object" &&
        e.transform !== null &&
        Object.keys(e.transform).length > 0
          ? "render/image/authenticated"
          : "object",
      s = new URLSearchParams();
    (e != null && e.transform && this.applyTransformOptsToQuery(s, e.transform),
      (e == null ? void 0 : e.cacheNonce) != null &&
        s.set("cacheNonce", String(e.cacheNonce)));
    const i = s.toString(),
      o = this._getFinalPath(t),
      a = () =>
        Us(
          this.fetch,
          `${this.url}/${r}/${o}${i ? `?${i}` : ""}`,
          { headers: this.headers, noResolveJson: !0 },
          n,
        );
    return new s0(a, this.shouldThrowOnError);
  }
  async info(t) {
    var e = this;
    const n = e._getFinalPath(t);
    return e.handleOperation(async () =>
      $l(
        await Us(e.fetch, `${e.url}/object/info/${n}`, { headers: e.headers }),
      ),
    );
  }
  async exists(t) {
    var e = this;
    const n = e._getFinalPath(t);
    try {
      return (
        await n0(e.fetch, `${e.url}/object/${n}`, { headers: e.headers }),
        { data: !0, error: null }
      );
    } catch (s) {
      if (e.shouldThrowOnError) throw s;
      if (Ko(s)) {
        var r;
        const i =
          s instanceof Ll
            ? s.status
            : s instanceof _p
              ? (r = s.originalError) === null || r === void 0
                ? void 0
                : r.status
              : void 0;
        if (i !== void 0 && [400, 404].includes(i))
          return { data: !1, error: s };
      }
      throw s;
    }
  }
  getPublicUrl(t, e) {
    const n = this._getFinalPath(t),
      r = new URLSearchParams();
    (e != null &&
      e.download &&
      r.set("download", e.download === !0 ? "" : e.download),
      e != null &&
        e.transform &&
        this.applyTransformOptsToQuery(r, e.transform),
      (e == null ? void 0 : e.cacheNonce) != null &&
        r.set("cacheNonce", String(e.cacheNonce)));
    const s = r.toString(),
      i =
        typeof (e == null ? void 0 : e.transform) == "object" &&
        e.transform !== null &&
        Object.keys(e.transform).length > 0
          ? "render/image"
          : "object";
    return {
      data: {
        publicUrl:
          encodeURI(`${this.url}/${i}/public/${n}`) + (s ? `?${s}` : ""),
      },
    };
  }
  async remove(t) {
    var e = this;
    return e.handleOperation(
      async () =>
        await Ms(
          e.fetch,
          `${e.url}/object/${e.bucketId}`,
          { prefixes: t },
          { headers: e.headers },
        ),
    );
  }
  async purgeCache(t, e, n) {
    var r = this;
    return r.handleOperation(async () => {
      const s = kp(r._getFinalPath(t)),
        i = new URLSearchParams();
      e != null && e.transformations && i.set("transformations", "true");
      const o = i.toString();
      return await Ms(
        r.fetch,
        `${r.url}/cdn/${s}${o ? `?${o}` : ""}`,
        {},
        { headers: r.headers },
        n,
      );
    });
  }
  async list(t, e, n) {
    var r = this;
    return r.handleOperation(async () => {
      const s =
          e != null && e.sortBy ? z(z({}, Ea.sortBy), e.sortBy) : Ea.sortBy,
        i = z(z(z({}, Ea), e), {}, { sortBy: s, prefix: t || "" });
      return await Tt(
        r.fetch,
        `${r.url}/object/list/${r.bucketId}`,
        i,
        { headers: r.headers },
        n,
      );
    });
  }
  async listV2(t, e) {
    var n = this;
    return n.handleOperation(async () => {
      const r = z({}, t);
      return await Tt(
        n.fetch,
        `${n.url}/object/list-v2/${n.bucketId}`,
        r,
        { headers: n.headers },
        e,
      );
    });
  }
  encodeMetadata(t) {
    return JSON.stringify(t);
  }
  toBase64(t) {
    return typeof Buffer < "u" ? Buffer.from(t).toString("base64") : btoa(t);
  }
  _getFinalPath(t) {
    return `${this.bucketId}/${t.replace(/^\/+/, "")}`;
  }
  _removeEmptyFolders(t) {
    return t.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  applyTransformOptsToQuery(t, e) {
    return (
      e.width && t.set("width", e.width.toString()),
      e.height && t.set("height", e.height.toString()),
      e.resize && t.set("resize", e.resize),
      e.format && t.set("format", e.format),
      e.quality && t.set("quality", e.quality.toString()),
      t
    );
  }
};
const o0 = "2.112.3",
  Qs = { "X-Client-Info": `storage-js/${o0}` };
var a0 = class extends zr {
    constructor(t, e = {}, n, r) {
      const s = new URL(t);
      r != null &&
        r.useNewHostname &&
        /supabase\.(co|in|red)$/.test(s.hostname) &&
        !s.hostname.includes("storage.supabase.") &&
        (s.hostname = s.hostname.replace("supabase.", "storage.supabase."));
      const i = s.href.replace(/\/$/, ""),
        o = z(z({}, Qs), e);
      super(i, o, n, "storage");
    }
    async listBuckets(t) {
      var e = this;
      return e.handleOperation(async () => {
        const n = e.listBucketOptionsToQueryString(t);
        return await Us(e.fetch, `${e.url}/bucket${n}`, { headers: e.headers });
      });
    }
    async getBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await Us(e.fetch, `${e.url}/bucket/${t}`, { headers: e.headers }),
      );
    }
    async createBucket(t, e = { public: !1 }) {
      var n = this;
      return n.handleOperation(
        async () =>
          await Tt(
            n.fetch,
            `${n.url}/bucket`,
            {
              id: t,
              name: t,
              type: e.type,
              public: e.public,
              file_size_limit: e.fileSizeLimit,
              allowed_mime_types: e.allowedMimeTypes,
            },
            { headers: n.headers },
          ),
      );
    }
    async updateBucket(t, e) {
      var n = this;
      return n.handleOperation(
        async () =>
          await Dl(
            n.fetch,
            `${n.url}/bucket/${t}`,
            {
              id: t,
              name: t,
              public: e.public,
              file_size_limit: e.fileSizeLimit,
              allowed_mime_types: e.allowedMimeTypes,
            },
            { headers: n.headers },
          ),
      );
    }
    async emptyBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await Tt(
            e.fetch,
            `${e.url}/bucket/${t}/empty`,
            {},
            { headers: e.headers },
          ),
      );
    }
    async deleteBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await Ms(e.fetch, `${e.url}/bucket/${t}`, {}, { headers: e.headers }),
      );
    }
    async purgeBucketCache(t, e, n) {
      var r = this;
      return r.handleOperation(async () => {
        const s = new URLSearchParams();
        e != null && e.transformations && s.set("transformations", "true");
        const i = s.toString();
        return await Ms(
          r.fetch,
          `${r.url}/cdn/${kp(t)}${i ? `?${i}` : ""}`,
          {},
          { headers: r.headers },
          n,
        );
      });
    }
    listBucketOptionsToQueryString(t) {
      const e = {};
      return (
        t &&
          ("limit" in t && (e.limit = String(t.limit)),
          "offset" in t && (e.offset = String(t.offset)),
          t.search && (e.search = t.search),
          t.sortColumn && (e.sortColumn = t.sortColumn),
          t.sortOrder && (e.sortOrder = t.sortOrder)),
        Object.keys(e).length > 0 ? "?" + new URLSearchParams(e).toString() : ""
      );
    }
  },
  l0 = class extends zr {
    constructor(t, e = {}, n) {
      const r = t.replace(/\/$/, ""),
        s = z(z({}, Qs), e);
      super(r, s, n, "storage");
    }
    async createBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await Tt(
            e.fetch,
            `${e.url}/bucket`,
            { name: t },
            { headers: e.headers },
          ),
      );
    }
    async listBuckets(t) {
      var e = this;
      return e.handleOperation(async () => {
        const n = new URLSearchParams();
        ((t == null ? void 0 : t.limit) !== void 0 &&
          n.set("limit", t.limit.toString()),
          (t == null ? void 0 : t.offset) !== void 0 &&
            n.set("offset", t.offset.toString()),
          t != null && t.sortColumn && n.set("sortColumn", t.sortColumn),
          t != null && t.sortOrder && n.set("sortOrder", t.sortOrder),
          t != null && t.search && n.set("search", t.search));
        const r = n.toString(),
          s = r ? `${e.url}/bucket?${r}` : `${e.url}/bucket`;
        return await Us(e.fetch, s, { headers: e.headers });
      });
    }
    async deleteBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await Ms(e.fetch, `${e.url}/bucket/${t}`, {}, { headers: e.headers }),
      );
    }
    from(t) {
      var e = this;
      if (!Xv(t))
        throw new Wo(
          "Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.",
        );
      const n = new Wv({
          baseUrl: this.url,
          catalogName: t,
          auth: { type: "custom", getHeaders: async () => e.headers },
          fetch: this.fetch,
        }),
        r = this.shouldThrowOnError;
      return new Proxy(n, {
        get(s, i) {
          const o = s[i];
          return typeof o != "function"
            ? o
            : async (...a) => {
                try {
                  return { data: await o.apply(s, a), error: null };
                } catch (l) {
                  if (r) throw l;
                  return { data: null, error: l };
                }
              };
        },
      });
    }
  },
  u0 = class extends zr {
    constructor(t, e = {}, n) {
      const r = t.replace(/\/$/, ""),
        s = z(z({}, Qs), {}, { "Content-Type": "application/json" }, e);
      super(r, s, n, "vectors");
    }
    async createIndex(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          (await rt.post(e.fetch, `${e.url}/CreateIndex`, t, {
            headers: e.headers,
          })) || {},
      );
    }
    async getIndex(t, e) {
      var n = this;
      return n.handleOperation(
        async () =>
          await rt.post(
            n.fetch,
            `${n.url}/GetIndex`,
            { vectorBucketName: t, indexName: e },
            { headers: n.headers },
          ),
      );
    }
    async listIndexes(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await rt.post(e.fetch, `${e.url}/ListIndexes`, t, {
            headers: e.headers,
          }),
      );
    }
    async deleteIndex(t, e) {
      var n = this;
      return n.handleOperation(
        async () =>
          (await rt.post(
            n.fetch,
            `${n.url}/DeleteIndex`,
            { vectorBucketName: t, indexName: e },
            { headers: n.headers },
          )) || {},
      );
    }
  },
  c0 = class extends zr {
    constructor(t, e = {}, n) {
      const r = t.replace(/\/$/, ""),
        s = z(z({}, Qs), {}, { "Content-Type": "application/json" }, e);
      super(r, s, n, "vectors");
    }
    async putVectors(t) {
      var e = this;
      if (t.vectors.length < 1 || t.vectors.length > 500)
        throw new Error("Vector batch size must be between 1 and 500 items");
      return e.handleOperation(
        async () =>
          (await rt.post(e.fetch, `${e.url}/PutVectors`, t, {
            headers: e.headers,
          })) || {},
      );
    }
    async getVectors(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await rt.post(e.fetch, `${e.url}/GetVectors`, t, {
            headers: e.headers,
          }),
      );
    }
    async listVectors(t) {
      var e = this;
      if (t.segmentCount !== void 0) {
        if (t.segmentCount < 1 || t.segmentCount > 16)
          throw new Error("segmentCount must be between 1 and 16");
        if (
          t.segmentIndex !== void 0 &&
          (t.segmentIndex < 0 || t.segmentIndex >= t.segmentCount)
        )
          throw new Error(
            `segmentIndex must be between 0 and ${t.segmentCount - 1}`,
          );
      }
      return e.handleOperation(
        async () =>
          await rt.post(e.fetch, `${e.url}/ListVectors`, t, {
            headers: e.headers,
          }),
      );
    }
    async queryVectors(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await rt.post(e.fetch, `${e.url}/QueryVectors`, t, {
            headers: e.headers,
          }),
      );
    }
    async deleteVectors(t) {
      var e = this;
      if (t.keys.length < 1 || t.keys.length > 500)
        throw new Error("Keys batch size must be between 1 and 500 items");
      return e.handleOperation(
        async () =>
          (await rt.post(e.fetch, `${e.url}/DeleteVectors`, t, {
            headers: e.headers,
          })) || {},
      );
    }
  },
  d0 = class extends zr {
    constructor(t, e = {}, n) {
      const r = t.replace(/\/$/, ""),
        s = z(z({}, Qs), {}, { "Content-Type": "application/json" }, e);
      super(r, s, n, "vectors");
    }
    async createBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          (await rt.post(
            e.fetch,
            `${e.url}/CreateVectorBucket`,
            { vectorBucketName: t },
            { headers: e.headers },
          )) || {},
      );
    }
    async getBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await rt.post(
            e.fetch,
            `${e.url}/GetVectorBucket`,
            { vectorBucketName: t },
            { headers: e.headers },
          ),
      );
    }
    async listBuckets(t = {}) {
      var e = this;
      return e.handleOperation(
        async () =>
          await rt.post(e.fetch, `${e.url}/ListVectorBuckets`, t, {
            headers: e.headers,
          }),
      );
    }
    async deleteBucket(t) {
      var e = this;
      return e.handleOperation(
        async () =>
          (await rt.post(
            e.fetch,
            `${e.url}/DeleteVectorBucket`,
            { vectorBucketName: t },
            { headers: e.headers },
          )) || {},
      );
    }
  },
  h0 = class extends d0 {
    constructor(t, e = {}) {
      super(t, e.headers || {}, e.fetch);
    }
    from(t) {
      return new f0(this.url, this.headers, t, this.fetch);
    }
    async createBucket(t) {
      var e = () => super.createBucket,
        n = this;
      return e().call(n, t);
    }
    async getBucket(t) {
      var e = () => super.getBucket,
        n = this;
      return e().call(n, t);
    }
    async listBuckets(t = {}) {
      var e = () => super.listBuckets,
        n = this;
      return e().call(n, t);
    }
    async deleteBucket(t) {
      var e = () => super.deleteBucket,
        n = this;
      return e().call(n, t);
    }
  },
  f0 = class extends u0 {
    constructor(t, e, n, r) {
      (super(t, e, r), (this.vectorBucketName = n));
    }
    async createIndex(t) {
      var e = () => super.createIndex,
        n = this;
      return e().call(
        n,
        z(z({}, t), {}, { vectorBucketName: n.vectorBucketName }),
      );
    }
    async listIndexes(t = {}) {
      var e = () => super.listIndexes,
        n = this;
      return e().call(
        n,
        z(z({}, t), {}, { vectorBucketName: n.vectorBucketName }),
      );
    }
    async getIndex(t) {
      var e = () => super.getIndex,
        n = this;
      return e().call(n, n.vectorBucketName, t);
    }
    async deleteIndex(t) {
      var e = () => super.deleteIndex,
        n = this;
      return e().call(n, n.vectorBucketName, t);
    }
    index(t) {
      return new p0(
        this.url,
        this.headers,
        this.vectorBucketName,
        t,
        this.fetch,
      );
    }
  },
  p0 = class extends c0 {
    constructor(t, e, n, r, s) {
      (super(t, e, s), (this.vectorBucketName = n), (this.indexName = r));
    }
    async putVectors(t) {
      var e = () => super.putVectors,
        n = this;
      return e().call(
        n,
        z(
          z({}, t),
          {},
          { vectorBucketName: n.vectorBucketName, indexName: n.indexName },
        ),
      );
    }
    async getVectors(t) {
      var e = () => super.getVectors,
        n = this;
      return e().call(
        n,
        z(
          z({}, t),
          {},
          { vectorBucketName: n.vectorBucketName, indexName: n.indexName },
        ),
      );
    }
    async listVectors(t = {}) {
      var e = () => super.listVectors,
        n = this;
      return e().call(
        n,
        z(
          z({}, t),
          {},
          { vectorBucketName: n.vectorBucketName, indexName: n.indexName },
        ),
      );
    }
    async queryVectors(t) {
      var e = () => super.queryVectors,
        n = this;
      return e().call(
        n,
        z(
          z({}, t),
          {},
          { vectorBucketName: n.vectorBucketName, indexName: n.indexName },
        ),
      );
    }
    async deleteVectors(t) {
      var e = () => super.deleteVectors,
        n = this;
      return e().call(
        n,
        z(
          z({}, t),
          {},
          { vectorBucketName: n.vectorBucketName, indexName: n.indexName },
        ),
      );
    }
  },
  g0 = class extends a0 {
    constructor(t, e = {}, n, r) {
      super(t, e, n, r);
    }
    from(t) {
      return new i0(this.url, this.headers, t, this.fetch);
    }
    get vectors() {
      return new h0(this.url + "/vector", {
        headers: this.headers,
        fetch: this.fetch,
      });
    }
    get analytics() {
      return new l0(this.url + "/iceberg", this.headers, this.fetch);
    }
  };
const Tp = "2.112.3",
  Jt = 30 * 1e3,
  ss = 3,
  ba = ss * Jt,
  m0 = 2 * Jt,
  y0 = "http://localhost:9999",
  v0 = "supabase.auth.token",
  w0 = { "X-Client-Info": `gotrue-js/${Tp}` },
  Ul = "X-Supabase-Api-Version",
  Cp = {
    "2024-01-01": {
      timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
      name: "2024-01-01",
    },
  },
  _0 = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,
  Bn = "sb_flow_id",
  k0 = 5,
  S0 = 10 * 60 * 1e3;
class Bs extends Error {
  constructor(e, n, r) {
    (super(e),
      (this.__isAuthError = !0),
      (this.name = "AuthError"),
      (this.status = n),
      (this.code = r));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
    };
  }
}
function j(t) {
  return typeof t == "object" && t !== null && "__isAuthError" in t;
}
class E0 extends Bs {
  constructor(e, n, r) {
    (super(e, n, r),
      (this.name = "AuthApiError"),
      (this.status = n),
      (this.code = r));
  }
}
function md(t) {
  return j(t) && t.name === "AuthApiError";
}
class xt extends Bs {
  constructor(e, n) {
    (super(e), (this.name = "AuthUnknownError"), (this.originalError = n));
  }
}
class Ft extends Bs {
  constructor(e, n, r, s) {
    (super(e, r, s), (this.name = n), (this.status = r));
  }
}
class Re extends Ft {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
function Ei(t) {
  return j(t) && t.name === "AuthSessionMissingError";
}
class ir extends Ft {
  constructor() {
    super(
      "Auth session or user missing",
      "AuthInvalidTokenResponseError",
      500,
      void 0,
    );
  }
}
class bi extends Ft {
  constructor(e) {
    super(e, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class Ti extends Ft {
  constructor(e, n = null) {
    (super(e, "AuthImplicitGrantRedirectError", 500, void 0),
      (this.details = null),
      (this.details = n));
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), {
      details: this.details,
    });
  }
}
function b0(t) {
  return j(t) && t.name === "AuthImplicitGrantRedirectError";
}
class yd extends Ft {
  constructor(e, n = null) {
    (super(e, "AuthPKCEGrantCodeExchangeError", 500, void 0),
      (this.details = null),
      (this.details = n));
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), {
      details: this.details,
    });
  }
}
class T0 extends Ft {
  constructor() {
    super(
      "PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.",
      "AuthPKCECodeVerifierMissingError",
      400,
      "pkce_code_verifier_not_found",
    );
  }
}
class Wi extends Ft {
  constructor(e, n) {
    super(e, "AuthRetryableFetchError", n, void 0);
  }
}
function Ci(t) {
  return j(t) && t.name === "AuthRetryableFetchError";
}
class vd extends Ft {
  constructor(
    e = "Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)",
  ) {
    super(e, "AuthRefreshDiscardedError", 409, void 0);
  }
}
function C0(t) {
  return j(t) && t.name === "AuthRefreshDiscardedError";
}
class wd extends Ft {
  constructor(e, n, r) {
    (super(e, "AuthWeakPasswordError", n, "weak_password"), (this.reasons = r));
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), {
      reasons: this.reasons,
    });
  }
}
class _o extends Ft {
  constructor(e) {
    super(e, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
}
const ko =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(
      "",
    ),
  _d = ` 	
\r=`.split(""),
  R0 = (() => {
    const t = new Array(128);
    for (let e = 0; e < t.length; e += 1) t[e] = -1;
    for (let e = 0; e < _d.length; e += 1) t[_d[e].charCodeAt(0)] = -2;
    for (let e = 0; e < ko.length; e += 1) t[ko[e].charCodeAt(0)] = e;
    return t;
  })();
function kd(t, e, n) {
  if (t !== null)
    for (e.queue = (e.queue << 8) | t, e.queuedBits += 8; e.queuedBits >= 6;) {
      const r = (e.queue >> (e.queuedBits - 6)) & 63;
      (n(ko[r]), (e.queuedBits -= 6));
    }
  else if (e.queuedBits > 0)
    for (
      e.queue = e.queue << (6 - e.queuedBits), e.queuedBits = 6;
      e.queuedBits >= 6;
    ) {
      const r = (e.queue >> (e.queuedBits - 6)) & 63;
      (n(ko[r]), (e.queuedBits -= 6));
    }
}
function Rp(t, e, n) {
  const r = R0[t];
  if (r > -1)
    for (e.queue = (e.queue << 6) | r, e.queuedBits += 6; e.queuedBits >= 8;)
      (n((e.queue >> (e.queuedBits - 8)) & 255), (e.queuedBits -= 8));
  else {
    if (r === -2) return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`);
  }
}
function Sd(t) {
  const e = [],
    n = (o) => {
      e.push(String.fromCodePoint(o));
    },
    r = { utf8seq: 0, codepoint: 0 },
    s = { queue: 0, queuedBits: 0 },
    i = (o) => {
      O0(o, r, n);
    };
  for (let o = 0; o < t.length; o += 1) Rp(t.charCodeAt(o), s, i);
  return e.join("");
}
function x0(t, e) {
  if (t <= 127) {
    e(t);
    return;
  } else if (t <= 2047) {
    (e(192 | (t >> 6)), e(128 | (t & 63)));
    return;
  } else if (t <= 65535) {
    (e(224 | (t >> 12)), e(128 | ((t >> 6) & 63)), e(128 | (t & 63)));
    return;
  } else if (t <= 1114111) {
    (e(240 | (t >> 18)),
      e(128 | ((t >> 12) & 63)),
      e(128 | ((t >> 6) & 63)),
      e(128 | (t & 63)));
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`);
}
function A0(t, e) {
  for (let n = 0; n < t.length; n += 1) {
    let r = t.charCodeAt(n);
    if (r > 55295 && r <= 56319) {
      const s = ((r - 55296) * 1024) & 65535;
      ((r = (((t.charCodeAt(n + 1) - 56320) & 65535) | s) + 65536), (n += 1));
    }
    x0(r, e);
  }
}
function O0(t, e, n) {
  if (e.utf8seq === 0) {
    if (t <= 127) {
      n(t);
      return;
    }
    for (let r = 1; r < 6; r += 1)
      if (!((t >> (7 - r)) & 1)) {
        e.utf8seq = r;
        break;
      }
    if (e.utf8seq === 2) e.codepoint = t & 31;
    else if (e.utf8seq === 3) e.codepoint = t & 15;
    else if (e.utf8seq === 4) e.codepoint = t & 7;
    else throw new Error("Invalid UTF-8 sequence");
    e.utf8seq -= 1;
  } else if (e.utf8seq > 0) {
    if (t <= 127) throw new Error("Invalid UTF-8 sequence");
    ((e.codepoint = (e.codepoint << 6) | (t & 63)),
      (e.utf8seq -= 1),
      e.utf8seq === 0 && n(e.codepoint));
  }
}
function Ar(t) {
  const e = [],
    n = { queue: 0, queuedBits: 0 },
    r = (s) => {
      e.push(s);
    };
  for (let s = 0; s < t.length; s += 1) Rp(t.charCodeAt(s), n, r);
  return new Uint8Array(e);
}
function P0(t) {
  const e = [];
  return (A0(t, (n) => e.push(n)), new Uint8Array(e));
}
function Fn(t) {
  const e = [],
    n = { queue: 0, queuedBits: 0 },
    r = (s) => {
      e.push(s);
    };
  return (t.forEach((s) => kd(s, n, r)), kd(null, n, r), e.join(""));
}
function N0(t) {
  return Math.round(Date.now() / 1e3) + t;
}
function j0() {
  return Symbol("auth-callback");
}
const Ne = () => typeof window < "u" && typeof document < "u",
  Pn = { tested: !1, writable: !1 },
  xp = () => {
    if (!Ne()) return !1;
    try {
      if (typeof globalThis.localStorage != "object") return !1;
    } catch {
      return !1;
    }
    if (Pn.tested) return Pn.writable;
    const t = `lswt-${Math.random()}${Math.random()}`;
    try {
      (globalThis.localStorage.setItem(t, t),
        globalThis.localStorage.removeItem(t),
        (Pn.tested = !0),
        (Pn.writable = !0));
    } catch {
      ((Pn.tested = !0), (Pn.writable = !1));
    }
    return Pn.writable;
  };
function Ed(t) {
  const e = {},
    n = new URL(t);
  if (n.hash && n.hash[0] === "#")
    try {
      new URLSearchParams(n.hash.substring(1)).forEach((s, i) => {
        e[i] = s;
      });
    } catch {}
  return (
    n.searchParams.forEach((r, s) => {
      e[s] = r;
    }),
    e
  );
}
const Ap = (t) => (t ? (...e) => t(...e) : (...e) => fetch(...e)),
  I0 = (t) =>
    typeof t == "object" &&
    t !== null &&
    "status" in t &&
    "ok" in t &&
    "json" in t &&
    typeof t.json == "function",
  Yt = async (t, e, n) => {
    await t.setItem(e, JSON.stringify(n));
  },
  Be = async (t, e) => {
    const n = await t.getItem(e);
    if (!n) return null;
    try {
      return JSON.parse(n);
    } catch {
      return null;
    }
  },
  Qe = async (t, e) => {
    await t.removeItem(e);
  };
class qo {
  constructor() {
    this.promise = new qo.promiseConstructor((e, n) => {
      ((this.resolve = e), (this.reject = n));
    });
  }
}
qo.promiseConstructor = Promise;
function Ri(t) {
  const e = t.split(".");
  if (e.length !== 3) throw new _o("Invalid JWT structure");
  for (let r = 0; r < e.length; r++)
    if (!_0.test(e[r])) throw new _o("JWT not in base64url format");
  return {
    header: JSON.parse(Sd(e[0])),
    payload: JSON.parse(Sd(e[1])),
    signature: Ar(e[2]),
    raw: { header: e[0], payload: e[1] },
  };
}
async function L0(t) {
  return await new Promise((e) => {
    setTimeout(() => e(null), t);
  });
}
function $0(t, e) {
  return new Promise((r, s) => {
    (async () => {
      for (let i = 0; i < 1 / 0; i++)
        try {
          const o = await t(i);
          if (!e(i, null, o)) {
            r(o);
            return;
          }
        } catch (o) {
          if (!e(i, o)) {
            s(o);
            return;
          }
        }
    })();
  });
}
function Op(t) {
  return ("0" + t.toString(16)).substr(-2);
}
function D0() {
  const e = new Uint32Array(56);
  if (typeof crypto > "u") {
    const n =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",
      r = n.length;
    let s = "";
    for (let i = 0; i < 56; i++) s += n.charAt(Math.floor(Math.random() * r));
    return s;
  }
  return (crypto.getRandomValues(e), Array.from(e, Op).join(""));
}
async function U0(t) {
  const n = new TextEncoder().encode(t),
    r = await crypto.subtle.digest("SHA-256", n),
    s = new Uint8Array(r);
  return Array.from(s)
    .map((i) => String.fromCharCode(i))
    .join("");
}
async function M0(t) {
  if (!(
    typeof crypto < "u" &&
    typeof crypto.subtle < "u" &&
    typeof TextEncoder < "u"
  ))
    return t;
  const n = await U0(t);
  return btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
const B0 = /^[a-zA-Z0-9_-]{8,64}$/;
function Ki(t) {
  return typeof t == "string" && B0.test(t) ? t : null;
}
function F0() {
  if (typeof crypto < "u" && typeof crypto.getRandomValues == "function") {
    const e = new Uint8Array(16);
    return (crypto.getRandomValues(e), Array.from(e, Op).join(""));
  }
  let t = "";
  for (let e = 0; e < 32; e++) t += Math.floor(Math.random() * 16).toString(16);
  return t;
}
const Ur = (t, e) => `${t}-flow-${e}-code-verifier`,
  Fs = (t) => `${t}-flows-code-verifier`;
async function zu(t, e) {
  const n = await Be(t, Fs(e));
  return Array.isArray(n) ? n.filter((r) => Ki(r) !== null) : [];
}
async function z0(t, e, n, r, s) {
  await Yt(t, Ur(e, n), r);
  const i = (await zu(t, e)).filter((o) => o !== n);
  for (i.push(n); i.length > k0;) {
    const o = i.shift();
    (await Qe(t, Ur(e, o)), s == null || s(o));
  }
  (await Yt(t, Fs(e), i), await Yt(t, `${e}-code-verifier`, r));
}
async function H0(t, e, n) {
  if (n) {
    const s = await Be(t, Ur(e, n));
    return { verifier: typeof s == "string" ? s : null, flowId: n };
  }
  const r = await Be(t, `${e}-code-verifier`);
  return { verifier: typeof r == "string" ? r : null, flowId: null };
}
async function St(t, e, n) {
  const r = `${e}-code-verifier`;
  if (!n) {
    await Qe(t, r);
    return;
  }
  const s = Ur(e, n),
    i = await Be(t, s);
  await Qe(t, s);
  const o = await zu(t, e),
    a = o.filter((l) => l !== n);
  (a.length !== o.length &&
    (a.length > 0 ? await Yt(t, Fs(e), a) : await Qe(t, Fs(e))),
    i != null && i === (await Be(t, r)) && (await Qe(t, r)));
}
async function V0(t, e) {
  const n = await zu(t, e);
  for (const r of n) await Qe(t, Ur(e, r));
  (await Qe(t, Fs(e)), await Qe(t, `${e}-code-verifier`));
}
function W0(t, e) {
  const n = t.indexOf("#");
  let r = n === -1 ? t : t.slice(0, n);
  const s = n === -1 ? "" : t.slice(n),
    i = r.indexOf("?");
  if (i !== -1) {
    const a = r.slice(0, i),
      l = r
        .slice(i + 1)
        .split("&")
        .filter((u) => u !== "" && u !== Bn && !u.startsWith(`${Bn}=`));
    r = l.length > 0 ? `${a}?${l.join("&")}` : a;
  }
  const o = r.includes("?") ? "&" : "?";
  return `${r}${o}${Bn}=${encodeURIComponent(e)}${s}`;
}
async function K0(t, e, n = !1, r) {
  const s = D0();
  let i = s;
  n && (i += "/recovery");
  const o = F0();
  await z0(t, e, o, i, r);
  const a = await M0(s);
  return [a, s === a ? "plain" : "s256", o];
}
const q0 = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function G0(t) {
  const e = t.headers.get(Ul);
  if (!e || !e.match(q0)) return null;
  try {
    return new Date(`${e}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function J0(t) {
  if (!t) throw new Error("Missing exp claim");
  const e = Math.floor(Date.now() / 1e3);
  if (t <= e) throw new Error("JWT has expired");
}
function Q0(t) {
  switch (t) {
    case "RS256":
      return { name: "RSASSA-PKCS1-v1_5", hash: { name: "SHA-256" } };
    case "ES256":
      return { name: "ECDSA", namedCurve: "P-256", hash: { name: "SHA-256" } };
    default:
      throw new Error("Invalid alg claim");
  }
}
const Y0 = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function Vt(t) {
  if (!Y0.test(t))
    throw new Error(
      "@supabase/auth-js: Expected parameter to be UUID but is not",
    );
}
function Et(t) {
  if (!t.passkey)
    throw new Error(
      "@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).",
    );
}
function Ta() {
  const t = {};
  return new Proxy(t, {
    get: (e, n) => {
      if (n === "__isUserNotAvailableProxy") return !0;
      if (typeof n == "symbol") {
        const r = n.toString();
        if (
          r === "Symbol(Symbol.toPrimitive)" ||
          r === "Symbol(Symbol.toStringTag)" ||
          r === "Symbol(util.inspect.custom)"
        )
          return;
      }
      throw new Error(
        `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${n}" property of the session object is not supported. Please use getUser() instead.`,
      );
    },
    set: (e, n) => {
      throw new Error(
        `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`,
      );
    },
    deleteProperty: (e, n) => {
      throw new Error(
        `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${n}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`,
      );
    },
  });
}
function X0(t, e) {
  return new Proxy(t, {
    get: (n, r, s) => {
      if (r === "__isInsecureUserWarningProxy") return !0;
      if (typeof r == "symbol") {
        const i = r.toString();
        if (
          i === "Symbol(Symbol.toPrimitive)" ||
          i === "Symbol(Symbol.toStringTag)" ||
          i === "Symbol(util.inspect.custom)" ||
          i === "Symbol(nodejs.util.inspect.custom)"
        )
          return Reflect.get(n, r, s);
      }
      return (
        !e.value && typeof r == "string" && (e.value = !0),
        Reflect.get(n, r, s)
      );
    },
  });
}
function bd(t) {
  return JSON.parse(JSON.stringify(t));
}
const In = (t) => {
    if (typeof t == "object" && t !== null) {
      const e = t;
      if (typeof e.msg == "string") return e.msg;
      if (typeof e.message == "string") return e.message;
      if (typeof e.error_description == "string") return e.error_description;
      if (typeof e.error == "string") return e.error;
    }
    return JSON.stringify(t);
  },
  Td = [
    500, 501, 502, 503, 504, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529,
    530,
  ];
async function Cd(t) {
  var e;
  if (!I0(t)) throw new Wi(In(t), 0);
  let n;
  try {
    n = await t.json();
  } catch (i) {
    throw Td.includes(t.status)
      ? new Wi(t.statusText || `HTTP ${t.status}`, t.status)
      : new xt(In(i), i);
  }
  if (Td.includes(t.status)) throw new Wi(In(n), t.status);
  let r;
  const s = G0(t);
  if (
    (s &&
    s.getTime() >= Cp["2024-01-01"].timestamp &&
    typeof n == "object" &&
    n &&
    typeof n.code == "string"
      ? (r = n.code)
      : typeof n == "object" &&
        n &&
        typeof n.error_code == "string" &&
        (r = n.error_code),
    r)
  ) {
    if (r === "weak_password")
      throw new wd(
        In(n),
        t.status,
        ((e = n.weak_password) === null || e === void 0 ? void 0 : e.reasons) ||
          [],
      );
    if (r === "session_not_found") throw new Re();
  } else if (
    typeof n == "object" &&
    n &&
    typeof n.weak_password == "object" &&
    n.weak_password &&
    Array.isArray(n.weak_password.reasons) &&
    n.weak_password.reasons.length &&
    n.weak_password.reasons.reduce((i, o) => i && typeof o == "string", !0)
  )
    throw new wd(In(n), t.status, n.weak_password.reasons);
  throw new E0(In(n), t.status || 500, r);
}
const Z0 = (t, e, n, r) => {
  const s = { method: t, headers: (e == null ? void 0 : e.headers) || {} };
  return t === "GET"
    ? s
    : ((s.headers = Object.assign(
        { "Content-Type": "application/json;charset=UTF-8" },
        e == null ? void 0 : e.headers,
      )),
      (s.body = JSON.stringify(r)),
      Object.assign(Object.assign({}, s), n));
};
async function U(t, e, n, r) {
  var s;
  const i = Object.assign({}, r == null ? void 0 : r.headers);
  (i[Ul] || (i[Ul] = Cp["2024-01-01"].name),
    r != null && r.jwt && (i.Authorization = `Bearer ${r.jwt}`));
  const o =
    (s = r == null ? void 0 : r.query) !== null && s !== void 0 ? s : {};
  r != null && r.redirectTo && (o.redirect_to = r.redirectTo);
  const a = Object.keys(o).length
      ? "?" + new URLSearchParams(o).toString()
      : "",
    l = await ew(
      t,
      e,
      n + a,
      { headers: i, noResolveJson: r == null ? void 0 : r.noResolveJson },
      {},
      r == null ? void 0 : r.body,
    );
  return r != null && r.xform
    ? r == null
      ? void 0
      : r.xform(l)
    : { data: Object.assign({}, l), error: null };
}
async function ew(t, e, n, r, s, i) {
  const o = Z0(e, r, s, i);
  let a;
  try {
    a = await t(n, Object.assign({}, o));
  } catch (l) {
    throw new Wi(In(l), 0);
  }
  if ((a.ok || (await Cd(a)), r != null && r.noResolveJson)) return a;
  try {
    return await a.json();
  } catch (l) {
    await Cd(l);
  }
}
function dt(t) {
  var e;
  let n = null;
  rw(t) &&
    ((n = Object.assign({}, t)),
    t.expires_at || (n.expires_at = N0(t.expires_in)));
  const r =
    (e = t.user) !== null && e !== void 0
      ? e
      : typeof (t == null ? void 0 : t.id) == "string"
        ? t
        : null;
  return { data: { session: n, user: r }, error: null };
}
function Rd(t) {
  const e = dt(t);
  return (
    !e.error &&
      t.weak_password &&
      typeof t.weak_password == "object" &&
      Array.isArray(t.weak_password.reasons) &&
      t.weak_password.reasons.length &&
      t.weak_password.message &&
      typeof t.weak_password.message == "string" &&
      t.weak_password.reasons.reduce((n, r) => n && typeof r == "string", !0) &&
      (e.data.weak_password = t.weak_password),
    e
  );
}
function gn(t) {
  var e;
  return {
    data: { user: (e = t.user) !== null && e !== void 0 ? e : t },
    error: null,
  };
}
function tw(t) {
  return { data: t, error: null };
}
function nw(t) {
  const {
      action_link: e,
      email_otp: n,
      hashed_token: r,
      redirect_to: s,
      verification_type: i,
    } = t,
    o = Vo(t, [
      "action_link",
      "email_otp",
      "hashed_token",
      "redirect_to",
      "verification_type",
    ]),
    a = {
      action_link: e,
      email_otp: n,
      hashed_token: r,
      redirect_to: s,
      verification_type: i,
    },
    l = Object.assign({}, o);
  return { data: { properties: a, user: l }, error: null };
}
function xd(t) {
  return t;
}
function rw(t) {
  return !!t.access_token && !!t.refresh_token && !!t.expires_in;
}
const Ca = ["global", "local", "others"];
class sw {
  constructor({ url: e = "", headers: n = {}, fetch: r, experimental: s }) {
    ((this.url = e),
      (this.headers = n),
      (this.fetch = Ap(r)),
      (this.experimental = s ?? {}),
      (this.mfa = {
        listFactors: this._listFactors.bind(this),
        deleteFactor: this._deleteFactor.bind(this),
      }),
      (this.oauth = {
        listClients: this._listOAuthClients.bind(this),
        createClient: this._createOAuthClient.bind(this),
        getClient: this._getOAuthClient.bind(this),
        updateClient: this._updateOAuthClient.bind(this),
        deleteClient: this._deleteOAuthClient.bind(this),
        regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this),
      }),
      (this.customProviders = {
        listProviders: this._listCustomProviders.bind(this),
        createProvider: this._createCustomProvider.bind(this),
        getProvider: this._getCustomProvider.bind(this),
        updateProvider: this._updateCustomProvider.bind(this),
        deleteProvider: this._deleteCustomProvider.bind(this),
      }),
      (this.passkey = {
        listPasskeys: this._adminListPasskeys.bind(this),
        deletePasskey: this._adminDeletePasskey.bind(this),
      }));
  }
  async signOut(e, n = Ca[0]) {
    if (Ca.indexOf(n) < 0)
      throw new Error(
        `@supabase/auth-js: Parameter scope must be one of ${Ca.join(", ")}`,
      );
    try {
      return (
        await U(this.fetch, "POST", `${this.url}/logout?scope=${n}`, {
          headers: this.headers,
          jwt: e,
          noResolveJson: !0,
        }),
        { data: null, error: null }
      );
    } catch (r) {
      if (j(r)) return { data: null, error: r };
      throw r;
    }
  }
  async inviteUserByEmail(e, n = {}) {
    try {
      return await U(this.fetch, "POST", `${this.url}/invite`, {
        body: { email: e, data: n.data },
        headers: this.headers,
        redirectTo: n.redirectTo,
        xform: gn,
      });
    } catch (r) {
      if (j(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async generateLink(e) {
    try {
      const { options: n } = e,
        r = Vo(e, ["options"]),
        s = Object.assign(Object.assign({}, r), n);
      return (
        "newEmail" in r &&
          ((s.new_email = r == null ? void 0 : r.newEmail), delete s.newEmail),
        await U(this.fetch, "POST", `${this.url}/admin/generate_link`, {
          body: s,
          headers: this.headers,
          xform: nw,
          redirectTo: n == null ? void 0 : n.redirectTo,
        })
      );
    } catch (n) {
      if (j(n)) return { data: { properties: null, user: null }, error: n };
      throw n;
    }
  }
  async createUser(e) {
    try {
      return await U(this.fetch, "POST", `${this.url}/admin/users`, {
        body: e,
        headers: this.headers,
        xform: gn,
      });
    } catch (n) {
      if (j(n)) return { data: { user: null }, error: n };
      throw n;
    }
  }
  async listUsers(e) {
    var n, r, s, i, o, a, l;
    try {
      const u = { nextPage: null, lastPage: 0, total: 0 },
        d = await U(this.fetch, "GET", `${this.url}/admin/users`, {
          headers: this.headers,
          noResolveJson: !0,
          query: {
            page:
              (r =
                (n = e == null ? void 0 : e.page) === null || n === void 0
                  ? void 0
                  : n.toString()) !== null && r !== void 0
                ? r
                : "",
            per_page:
              (i =
                (s = e == null ? void 0 : e.perPage) === null || s === void 0
                  ? void 0
                  : s.toString()) !== null && i !== void 0
                ? i
                : "",
          },
          xform: xd,
        });
      if (d.error) throw d.error;
      const c = await d.json(),
        h =
          (o = d.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0,
        g =
          (l =
            (a = d.headers.get("link")) === null || a === void 0
              ? void 0
              : a.split(",")) !== null && l !== void 0
            ? l
            : [];
      return (
        g.length > 0 &&
          (g.forEach((y) => {
            const v = parseInt(y.split(";")[0].split("=")[1].substring(0, 1)),
              k = JSON.parse(y.split(";")[1].split("=")[1]);
            u[`${k}Page`] = v;
          }),
          (u.total = parseInt(h))),
        { data: Object.assign(Object.assign({}, c), u), error: null }
      );
    } catch (u) {
      if (j(u)) return { data: { users: [] }, error: u };
      throw u;
    }
  }
  async getUserById(e) {
    Vt(e);
    try {
      return await U(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        xform: gn,
      });
    } catch (n) {
      if (j(n)) return { data: { user: null }, error: n };
      throw n;
    }
  }
  async updateUserById(e, n) {
    Vt(e);
    try {
      return await U(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
        body: n,
        headers: this.headers,
        xform: gn,
      });
    } catch (r) {
      if (j(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async deleteUser(e, n = !1) {
    Vt(e);
    try {
      return await U(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        body: { should_soft_delete: n },
        xform: gn,
      });
    } catch (r) {
      if (j(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async _listFactors(e) {
    Vt(e.userId);
    try {
      const { data: n, error: r } = await U(
        this.fetch,
        "GET",
        `${this.url}/admin/users/${e.userId}/factors`,
        {
          headers: this.headers,
          xform: (s) => ({ data: { factors: s }, error: null }),
        },
      );
      return { data: n, error: r };
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _deleteFactor(e) {
    (Vt(e.userId), Vt(e.id));
    try {
      return {
        data: await U(
          this.fetch,
          "DELETE",
          `${this.url}/admin/users/${e.userId}/factors/${e.id}`,
          { headers: this.headers },
        ),
        error: null,
      };
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _listOAuthClients(e) {
    var n, r, s, i, o, a, l;
    try {
      const u = { nextPage: null, lastPage: 0, total: 0 },
        d = await U(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
          headers: this.headers,
          noResolveJson: !0,
          query: {
            page:
              (r =
                (n = e == null ? void 0 : e.page) === null || n === void 0
                  ? void 0
                  : n.toString()) !== null && r !== void 0
                ? r
                : "",
            per_page:
              (i =
                (s = e == null ? void 0 : e.perPage) === null || s === void 0
                  ? void 0
                  : s.toString()) !== null && i !== void 0
                ? i
                : "",
          },
          xform: xd,
        });
      if (d.error) throw d.error;
      const c = await d.json(),
        h =
          (o = d.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0,
        g =
          (l =
            (a = d.headers.get("link")) === null || a === void 0
              ? void 0
              : a.split(",")) !== null && l !== void 0
            ? l
            : [];
      return (
        g.length > 0 &&
          (g.forEach((y) => {
            const v = parseInt(y.split(";")[0].split("=")[1].substring(0, 1)),
              k = JSON.parse(y.split(";")[1].split("=")[1]);
            u[`${k}Page`] = v;
          }),
          (u.total = parseInt(h))),
        { data: Object.assign(Object.assign({}, c), u), error: null }
      );
    } catch (u) {
      if (j(u)) return { data: { clients: [] }, error: u };
      throw u;
    }
  }
  async _createOAuthClient(e) {
    try {
      return await U(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
        body: e,
        headers: this.headers,
        xform: (n) => ({ data: n, error: null }),
      });
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _getOAuthClient(e) {
    try {
      return await U(
        this.fetch,
        "GET",
        `${this.url}/admin/oauth/clients/${e}`,
        { headers: this.headers, xform: (n) => ({ data: n, error: null }) },
      );
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _updateOAuthClient(e, n) {
    try {
      return await U(
        this.fetch,
        "PUT",
        `${this.url}/admin/oauth/clients/${e}`,
        {
          body: n,
          headers: this.headers,
          xform: (r) => ({ data: r, error: null }),
        },
      );
    } catch (r) {
      if (j(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _deleteOAuthClient(e) {
    try {
      return (
        await U(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e}`, {
          headers: this.headers,
          noResolveJson: !0,
        }),
        { data: null, error: null }
      );
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _regenerateOAuthClientSecret(e) {
    try {
      return await U(
        this.fetch,
        "POST",
        `${this.url}/admin/oauth/clients/${e}/regenerate_secret`,
        { headers: this.headers, xform: (n) => ({ data: n, error: null }) },
      );
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _listCustomProviders(e) {
    try {
      const n = {};
      return (
        e != null && e.type && (n.type = e.type),
        await U(this.fetch, "GET", `${this.url}/admin/custom-providers`, {
          headers: this.headers,
          query: n,
          xform: (r) => {
            var s;
            return {
              data: {
                providers:
                  (s = r == null ? void 0 : r.providers) !== null &&
                  s !== void 0
                    ? s
                    : [],
              },
              error: null,
            };
          },
        })
      );
    } catch (n) {
      if (j(n)) return { data: { providers: [] }, error: n };
      throw n;
    }
  }
  async _createCustomProvider(e) {
    try {
      return await U(this.fetch, "POST", `${this.url}/admin/custom-providers`, {
        body: e,
        headers: this.headers,
        xform: (n) => ({ data: n, error: null }),
      });
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _getCustomProvider(e) {
    try {
      return await U(
        this.fetch,
        "GET",
        `${this.url}/admin/custom-providers/${e}`,
        { headers: this.headers, xform: (n) => ({ data: n, error: null }) },
      );
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _updateCustomProvider(e, n) {
    try {
      return await U(
        this.fetch,
        "PUT",
        `${this.url}/admin/custom-providers/${e}`,
        {
          body: n,
          headers: this.headers,
          xform: (r) => ({ data: r, error: null }),
        },
      );
    } catch (r) {
      if (j(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _deleteCustomProvider(e) {
    try {
      return (
        await U(
          this.fetch,
          "DELETE",
          `${this.url}/admin/custom-providers/${e}`,
          { headers: this.headers, noResolveJson: !0 },
        ),
        { data: null, error: null }
      );
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _adminListPasskeys(e) {
    (Et(this.experimental), Vt(e.userId));
    try {
      return await U(
        this.fetch,
        "GET",
        `${this.url}/admin/users/${e.userId}/passkeys`,
        { headers: this.headers, xform: (n) => ({ data: n, error: null }) },
      );
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
  async _adminDeletePasskey(e) {
    (Et(this.experimental), Vt(e.userId), Vt(e.passkeyId));
    try {
      return (
        await U(
          this.fetch,
          "DELETE",
          `${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,
          { headers: this.headers, noResolveJson: !0 },
        ),
        { data: null, error: null }
      );
    } catch (n) {
      if (j(n)) return { data: null, error: n };
      throw n;
    }
  }
}
function Ad(t = {}) {
  return {
    getItem: (e) => t[e] || null,
    setItem: (e, n) => {
      t[e] = n;
    },
    removeItem: (e) => {
      delete t[e];
    },
  };
}
globalThis &&
  xp() &&
  globalThis.localStorage &&
  globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");
class iw extends Error {
  constructor(e) {
    (super(e), (this.isAcquireTimeout = !0));
  }
}
function ow() {
  if (typeof globalThis != "object")
    try {
      (Object.defineProperty(Object.prototype, "__magic__", {
        get: function () {
          return this;
        },
        configurable: !0,
      }),
        (__magic__.globalThis = __magic__),
        delete Object.prototype.__magic__);
    } catch {
      typeof self < "u" && (self.globalThis = self);
    }
}
function Pp(t) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(t))
    throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);
  return t.toLowerCase();
}
function aw(t) {
  return parseInt(t, 16);
}
function lw(t) {
  const e = new TextEncoder().encode(t);
  return "0x" + Array.from(e, (r) => r.toString(16).padStart(2, "0")).join("");
}
function uw(t) {
  var e;
  const {
    chainId: n,
    domain: r,
    expirationTime: s,
    issuedAt: i = new Date(),
    nonce: o,
    notBefore: a,
    requestId: l,
    resources: u,
    scheme: d,
    uri: c,
    version: h,
  } = t;
  {
    if (!Number.isInteger(n))
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${n}`,
      );
    if (!r)
      throw new Error(
        '@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.',
      );
    if (o && o.length < 8)
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`,
      );
    if (!c)
      throw new Error(
        '@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.',
      );
    if (h !== "1")
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`,
      );
    if (
      !((e = t.statement) === null || e === void 0) &&
      e.includes(`
`)
    )
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`,
      );
  }
  const g = Pp(t.address),
    y = d ? `${d}://${r}` : r,
    v = t.statement
      ? `${t.statement}
`
      : "",
    k = `${y} wants you to sign in with your Ethereum account:
${g}

${v}`;
  let p = `URI: ${c}
Version: ${h}
Chain ID: ${n}${
    o
      ? `
Nonce: ${o}`
      : ""
  }
Issued At: ${i.toISOString()}`;
  if (
    (s &&
      (p += `
Expiration Time: ${s.toISOString()}`),
    a &&
      (p += `
Not Before: ${a.toISOString()}`),
    l &&
      (p += `
Request ID: ${l}`),
    u)
  ) {
    let f = `
Resources:`;
    for (const m of u) {
      if (!m || typeof m != "string")
        throw new Error(
          `@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${m}`,
        );
      f += `
- ${m}`;
    }
    p += f;
  }
  return `${k}
${p}`;
}
class we extends Error {
  constructor({ message: e, code: n, cause: r, name: s }) {
    var i;
    (super(e, { cause: r }),
      (this.__isWebAuthnError = !0),
      (this.name =
        (i = s ?? (r instanceof Error ? r.name : void 0)) !== null &&
        i !== void 0
          ? i
          : "Unknown Error"),
      (this.code = n));
  }
  toJSON() {
    return { name: this.name, message: this.message, code: this.code };
  }
}
class So extends we {
  constructor(e, n) {
    (super({
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: n,
      message: e,
    }),
      (this.name = "WebAuthnUnknownError"),
      (this.originalError = n));
  }
}
function cw({ error: t, options: e }) {
  var n, r, s;
  const { publicKey: i } = e;
  if (!i) throw Error("options was missing required publicKey property");
  if (t.name === "AbortError") {
    if (e.signal instanceof AbortSignal)
      return new we({
        message: "Registration ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: t,
      });
  } else if (t.name === "ConstraintError") {
    if (
      ((n = i.authenticatorSelection) === null || n === void 0
        ? void 0
        : n.requireResidentKey) === !0
    )
      return new we({
        message:
          "Discoverable credentials were required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
        cause: t,
      });
    if (
      e.mediation === "conditional" &&
      ((r = i.authenticatorSelection) === null || r === void 0
        ? void 0
        : r.userVerification) === "required"
    )
      return new we({
        message:
          "User verification was required during automatic registration but it could not be performed",
        code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
        cause: t,
      });
    if (
      ((s = i.authenticatorSelection) === null || s === void 0
        ? void 0
        : s.userVerification) === "required"
    )
      return new we({
        message:
          "User verification was required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
        cause: t,
      });
  } else {
    if (t.name === "InvalidStateError")
      return new we({
        message: "The authenticator was previously registered",
        code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
        cause: t,
      });
    if (t.name === "NotAllowedError")
      return new we({
        message: t.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: t,
      });
    if (t.name === "NotSupportedError")
      return i.pubKeyCredParams.filter((a) => a.type === "public-key")
        .length === 0
        ? new we({
            message: 'No entry in pubKeyCredParams was of type "public-key"',
            code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
            cause: t,
          })
        : new we({
            message:
              "No available authenticator supported any of the specified pubKeyCredParams algorithms",
            code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
            cause: t,
          });
    if (t.name === "SecurityError") {
      const o = window.location.hostname;
      if (Np(o)) {
        if (i.rp.id !== o)
          return new we({
            message: `The RP ID "${i.rp.id}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: t,
          });
      } else
        return new we({
          message: `${window.location.hostname} is an invalid domain`,
          code: "ERROR_INVALID_DOMAIN",
          cause: t,
        });
    } else if (t.name === "TypeError") {
      if (i.user.id.byteLength < 1 || i.user.id.byteLength > 64)
        return new we({
          message: "User ID was not between 1 and 64 characters",
          code: "ERROR_INVALID_USER_ID_LENGTH",
          cause: t,
        });
    } else if (t.name === "UnknownError")
      return new we({
        message:
          "The authenticator was unable to process the specified options, or could not create a new credential",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: t,
      });
  }
  return new we({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: t,
  });
}
function dw({ error: t, options: e }) {
  const { publicKey: n } = e;
  if (!n) throw Error("options was missing required publicKey property");
  if (t.name === "AbortError") {
    if (e.signal instanceof AbortSignal)
      return new we({
        message: "Authentication ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: t,
      });
  } else {
    if (t.name === "NotAllowedError")
      return new we({
        message: t.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: t,
      });
    if (t.name === "SecurityError") {
      const r = window.location.hostname;
      if (Np(r)) {
        if (n.rpId !== r)
          return new we({
            message: `The RP ID "${n.rpId}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: t,
          });
      } else
        return new we({
          message: `${window.location.hostname} is an invalid domain`,
          code: "ERROR_INVALID_DOMAIN",
          cause: t,
        });
    } else if (t.name === "UnknownError")
      return new we({
        message:
          "The authenticator was unable to process the specified options, or could not create a new assertion signature",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: t,
      });
  }
  return new we({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: t,
  });
}
class hw {
  createNewAbortSignal() {
    if (this.controller) {
      const n = new Error("Cancelling existing WebAuthn API call for new one");
      ((n.name = "AbortError"), this.controller.abort(n));
    }
    const e = new AbortController();
    return ((this.controller = e), e.signal);
  }
  cancelCeremony() {
    if (this.controller) {
      const e = new Error("Manually cancelling existing WebAuthn API call");
      ((e.name = "AbortError"),
        this.controller.abort(e),
        (this.controller = void 0));
    }
  }
}
const Ml = new hw();
function Od(t) {
  if (!t) throw new Error("Credential creation options are required");
  if (
    typeof PublicKeyCredential < "u" &&
    "parseCreationOptionsFromJSON" in PublicKeyCredential &&
    typeof PublicKeyCredential.parseCreationOptionsFromJSON == "function"
  )
    return PublicKeyCredential.parseCreationOptionsFromJSON(t);
  const { challenge: e, user: n, excludeCredentials: r } = t,
    s = Vo(t, ["challenge", "user", "excludeCredentials"]),
    i = Ar(e).buffer,
    o = Object.assign(Object.assign({}, n), { id: Ar(n.id).buffer }),
    a = Object.assign(Object.assign({}, s), { challenge: i, user: o });
  if (r && r.length > 0) {
    a.excludeCredentials = new Array(r.length);
    for (let l = 0; l < r.length; l++) {
      const u = r[l];
      a.excludeCredentials[l] = Object.assign(Object.assign({}, u), {
        id: Ar(u.id).buffer,
        type: u.type || "public-key",
        transports: u.transports,
      });
    }
  }
  return a;
}
function Pd(t) {
  if (!t) throw new Error("Credential request options are required");
  if (
    typeof PublicKeyCredential < "u" &&
    "parseRequestOptionsFromJSON" in PublicKeyCredential &&
    typeof PublicKeyCredential.parseRequestOptionsFromJSON == "function"
  )
    return PublicKeyCredential.parseRequestOptionsFromJSON(t);
  const { challenge: e, allowCredentials: n } = t,
    r = Vo(t, ["challenge", "allowCredentials"]),
    s = Ar(e).buffer,
    i = Object.assign(Object.assign({}, r), { challenge: s });
  if (n && n.length > 0) {
    i.allowCredentials = new Array(n.length);
    for (let o = 0; o < n.length; o++) {
      const a = n[o];
      i.allowCredentials[o] = Object.assign(Object.assign({}, a), {
        id: Ar(a.id).buffer,
        type: a.type || "public-key",
        transports: a.transports,
      });
    }
  }
  return i;
}
function Nd(t) {
  var e;
  if ("toJSON" in t && typeof t.toJSON == "function") return t.toJSON();
  const n = t;
  return {
    id: t.id,
    rawId: t.id,
    response: {
      attestationObject: Fn(new Uint8Array(t.response.attestationObject)),
      clientDataJSON: Fn(new Uint8Array(t.response.clientDataJSON)),
    },
    type: "public-key",
    clientExtensionResults: t.getClientExtensionResults(),
    authenticatorAttachment:
      (e = n.authenticatorAttachment) !== null && e !== void 0 ? e : void 0,
  };
}
function jd(t) {
  var e;
  if ("toJSON" in t && typeof t.toJSON == "function") return t.toJSON();
  const n = t,
    r = t.getClientExtensionResults(),
    s = t.response;
  return {
    id: t.id,
    rawId: t.id,
    response: {
      authenticatorData: Fn(new Uint8Array(s.authenticatorData)),
      clientDataJSON: Fn(new Uint8Array(s.clientDataJSON)),
      signature: Fn(new Uint8Array(s.signature)),
      userHandle: s.userHandle ? Fn(new Uint8Array(s.userHandle)) : void 0,
    },
    type: "public-key",
    clientExtensionResults: r,
    authenticatorAttachment:
      (e = n.authenticatorAttachment) !== null && e !== void 0 ? e : void 0,
  };
}
function Np(t) {
  return t === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t);
}
function Eo() {
  var t, e;
  return !!(
    Ne() &&
    "PublicKeyCredential" in window &&
    window.PublicKeyCredential &&
    "credentials" in navigator &&
    typeof ((t = navigator == null ? void 0 : navigator.credentials) === null ||
    t === void 0
      ? void 0
      : t.create) == "function" &&
    typeof ((e = navigator == null ? void 0 : navigator.credentials) === null ||
    e === void 0
      ? void 0
      : e.get) == "function"
  );
}
async function jp(t) {
  try {
    const e = await navigator.credentials.create(t);
    return e
      ? e instanceof PublicKeyCredential
        ? { data: e, error: null }
        : {
            data: null,
            error: new So("Browser returned unexpected credential type", e),
          }
      : { data: null, error: new So("Empty credential response", e) };
  } catch (e) {
    return { data: null, error: cw({ error: e, options: t }) };
  }
}
async function Ip(t) {
  try {
    const e = await navigator.credentials.get(t);
    return e
      ? e instanceof PublicKeyCredential
        ? { data: e, error: null }
        : {
            data: null,
            error: new So("Browser returned unexpected credential type", e),
          }
      : { data: null, error: new So("Empty credential response", e) };
  } catch (e) {
    return { data: null, error: dw({ error: e, options: t }) };
  }
}
const fw = {
    hints: ["security-key"],
    authenticatorSelection: {
      authenticatorAttachment: "cross-platform",
      requireResidentKey: !1,
      userVerification: "preferred",
      residentKey: "discouraged",
    },
    attestation: "direct",
  },
  pw = {
    userVerification: "preferred",
    hints: ["security-key"],
    attestation: "direct",
  };
function bo(...t) {
  const e = (s) => s !== null && typeof s == "object" && !Array.isArray(s),
    n = (s) => s instanceof ArrayBuffer || ArrayBuffer.isView(s),
    r = {};
  for (const s of t)
    if (s)
      for (const i in s) {
        const o = s[i];
        if (o !== void 0)
          if (Array.isArray(o)) r[i] = o;
          else if (n(o)) r[i] = o;
          else if (e(o)) {
            const a = r[i];
            e(a) ? (r[i] = bo(a, o)) : (r[i] = bo(o));
          } else r[i] = o;
      }
  return r;
}
function gw(t, e) {
  return bo(fw, t, e || {});
}
function mw(t, e) {
  return bo(pw, t, e || {});
}
class yw {
  constructor(e) {
    ((this.client = e),
      (this.enroll = this._enroll.bind(this)),
      (this.challenge = this._challenge.bind(this)),
      (this.verify = this._verify.bind(this)),
      (this.authenticate = this._authenticate.bind(this)),
      (this.register = this._register.bind(this)));
  }
  async _enroll(e) {
    return this.client.mfa.enroll(
      Object.assign(Object.assign({}, e), { factorType: "webauthn" }),
    );
  }
  async _challenge(
    { factorId: e, webauthn: n, friendlyName: r, signal: s },
    i,
  ) {
    var o;
    try {
      const { data: a, error: l } = await this.client.mfa.challenge({
        factorId: e,
        webauthn: n,
      });
      if (!a) return { data: null, error: l };
      const u = s ?? Ml.createNewAbortSignal();
      if (a.webauthn.type === "create") {
        const { user: d } = a.webauthn.credential_options.publicKey;
        if (!d.name) {
          const c = r;
          if (c) d.name = `${d.id}:${c}`;
          else {
            const g = (await this.client.getUser()).data.user,
              y =
                ((o = g == null ? void 0 : g.user_metadata) === null ||
                o === void 0
                  ? void 0
                  : o.name) ||
                (g == null ? void 0 : g.email) ||
                (g == null ? void 0 : g.id) ||
                "User";
            d.name = `${d.id}:${y}`;
          }
        }
        d.displayName || (d.displayName = d.name);
      }
      switch (a.webauthn.type) {
        case "create": {
          const d = gw(
              a.webauthn.credential_options.publicKey,
              i == null ? void 0 : i.create,
            ),
            { data: c, error: h } = await jp({ publicKey: d, signal: u });
          return c
            ? {
                data: {
                  factorId: e,
                  challengeId: a.id,
                  webauthn: { type: a.webauthn.type, credential_response: c },
                },
                error: null,
              }
            : { data: null, error: h };
        }
        case "request": {
          const d = mw(
              a.webauthn.credential_options.publicKey,
              i == null ? void 0 : i.request,
            ),
            { data: c, error: h } = await Ip(
              Object.assign(Object.assign({}, a.webauthn.credential_options), {
                publicKey: d,
                signal: u,
              }),
            );
          return c
            ? {
                data: {
                  factorId: e,
                  challengeId: a.id,
                  webauthn: { type: a.webauthn.type, credential_response: c },
                },
                error: null,
              }
            : { data: null, error: h };
        }
      }
    } catch (a) {
      return j(a)
        ? { data: null, error: a }
        : { data: null, error: new xt("Unexpected error in challenge", a) };
    }
  }
  async _verify({ challengeId: e, factorId: n, webauthn: r }) {
    return this.client.mfa.verify({ factorId: n, challengeId: e, webauthn: r });
  }
  async _authenticate(
    {
      factorId: e,
      webauthn: {
        rpId: n = typeof window < "u" ? window.location.hostname : void 0,
        rpOrigins: r = typeof window < "u" ? [window.location.origin] : void 0,
        signal: s,
      } = {},
    },
    i,
  ) {
    if (!n)
      return {
        data: null,
        error: new Bs("rpId is required for WebAuthn authentication"),
      };
    try {
      if (!Eo())
        return {
          data: null,
          error: new xt("Browser does not support WebAuthn", null),
        };
      const { data: o, error: a } = await this.challenge(
        { factorId: e, webauthn: { rpId: n, rpOrigins: r }, signal: s },
        { request: i },
      );
      if (!o) return { data: null, error: a };
      const { webauthn: l } = o;
      return this._verify({
        factorId: e,
        challengeId: o.challengeId,
        webauthn: {
          type: l.type,
          rpId: n,
          rpOrigins: r,
          credential_response: l.credential_response,
        },
      });
    } catch (o) {
      return j(o)
        ? { data: null, error: o }
        : { data: null, error: new xt("Unexpected error in authenticate", o) };
    }
  }
  async _register(
    {
      friendlyName: e,
      webauthn: {
        rpId: n = typeof window < "u" ? window.location.hostname : void 0,
        rpOrigins: r = typeof window < "u" ? [window.location.origin] : void 0,
        signal: s,
      } = {},
    },
    i,
  ) {
    if (!n)
      return {
        data: null,
        error: new Bs("rpId is required for WebAuthn registration"),
      };
    try {
      if (!Eo())
        return {
          data: null,
          error: new xt("Browser does not support WebAuthn", null),
        };
      const { data: o, error: a } = await this._enroll({ friendlyName: e });
      if (!o)
        return (
          await this.client.mfa
            .listFactors()
            .then((d) => {
              var c;
              return (c = d.data) === null || c === void 0
                ? void 0
                : c.all.find(
                    (h) =>
                      h.factor_type === "webauthn" &&
                      h.friendly_name === e &&
                      h.status !== "unverified",
                  );
            })
            .then((d) =>
              d
                ? this.client.mfa.unenroll({
                    factorId: d == null ? void 0 : d.id,
                  })
                : void 0,
            ),
          { data: null, error: a }
        );
      const { data: l, error: u } = await this._challenge(
        {
          factorId: o.id,
          friendlyName: o.friendly_name,
          webauthn: { rpId: n, rpOrigins: r },
          signal: s,
        },
        { create: i },
      );
      return l
        ? this._verify({
            factorId: o.id,
            challengeId: l.challengeId,
            webauthn: {
              rpId: n,
              rpOrigins: r,
              type: l.webauthn.type,
              credential_response: l.webauthn.credential_response,
            },
          })
        : { data: null, error: u };
    } catch (o) {
      return j(o)
        ? { data: null, error: o }
        : { data: null, error: new xt("Unexpected error in register", o) };
    }
  }
}
ow();
const vw = {
    url: y0,
    storageKey: v0,
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    headers: w0,
    flowType: "implicit",
    debug: !1,
    hasCustomAuthorizationHeader: !1,
    throwOnError: !1,
    lockAcquireTimeout: 5e3,
    skipAutoInitialize: !1,
    experimental: {},
  },
  or = {};
class zs {
  get jwks() {
    var e, n;
    return (n =
      (e = or[this.storageKey]) === null || e === void 0 ? void 0 : e.jwks) !==
      null && n !== void 0
      ? n
      : { keys: [] };
  }
  set jwks(e) {
    or[this.storageKey] = Object.assign(
      Object.assign({}, or[this.storageKey]),
      { jwks: e },
    );
  }
  get jwks_cached_at() {
    var e, n;
    return (n =
      (e = or[this.storageKey]) === null || e === void 0
        ? void 0
        : e.cachedAt) !== null && n !== void 0
      ? n
      : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(e) {
    or[this.storageKey] = Object.assign(
      Object.assign({}, or[this.storageKey]),
      { cachedAt: e },
    );
  }
  constructor(e) {
    var n, r, s;
    ((this.userStorage = null),
      (this.memoryStorage = null),
      (this.stateChangeEmitters = new Map()),
      (this.autoRefreshTicker = null),
      (this.autoRefreshTickTimeout = null),
      (this.visibilityChangedCallback = null),
      (this.refreshingDeferred = null),
      (this.lastRefreshFailure = null),
      (this._sessionRemovalEpoch = 0),
      (this.initializePromise = null),
      (this._pendingInitNotifications = null),
      (this.detectSessionInUrl = !0),
      (this.hasCustomAuthorizationHeader = !1),
      (this.suppressGetSessionWarning = !1),
      (this.lock = null),
      (this.lockAcquired = !1),
      (this.pendingInLock = []),
      (this.broadcastChannel = null),
      (this.logger = console.log));
    const i = Object.assign(Object.assign({}, vw), e);
    if (
      ((this.storageKey = i.storageKey),
      (this.instanceID =
        (n = zs.nextInstanceID[this.storageKey]) !== null && n !== void 0
          ? n
          : 0),
      (zs.nextInstanceID[this.storageKey] = this.instanceID + 1),
      (this.logDebugMessages = !!i.debug),
      typeof i.debug == "function" && (this.logger = i.debug),
      this.instanceID > 0 && Ne())
    ) {
      const o = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
      this.logDebugMessages;
    }
    if (
      ((this.persistSession = i.persistSession),
      (this.autoRefreshToken = i.autoRefreshToken),
      (this.experimental =
        (r = i.experimental) !== null && r !== void 0 ? r : {}),
      (this.admin = new sw({
        url: i.url,
        headers: i.headers,
        fetch: i.fetch,
        experimental: this.experimental,
      })),
      (this.url = i.url),
      (this.headers = i.headers),
      (this.fetch = Ap(i.fetch)),
      (this.detectSessionInUrl = i.detectSessionInUrl),
      (this.flowType = i.flowType),
      (this.hasCustomAuthorizationHeader = i.hasCustomAuthorizationHeader),
      (this.throwOnError = i.throwOnError),
      (this.lockAcquireTimeout = i.lockAcquireTimeout),
      i.lock != null && (this.lock = i.lock),
      this.jwks ||
        ((this.jwks = { keys: [] }),
        (this.jwks_cached_at = Number.MIN_SAFE_INTEGER)),
      (this.mfa = {
        verify: this._verify.bind(this),
        enroll: this._enroll.bind(this),
        unenroll: this._unenroll.bind(this),
        challenge: this._challenge.bind(this),
        listFactors: this._listFactors.bind(this),
        challengeAndVerify: this._challengeAndVerify.bind(this),
        getAuthenticatorAssuranceLevel:
          this._getAuthenticatorAssuranceLevel.bind(this),
        webauthn: new yw(this),
      }),
      (this.oauth = {
        getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
        approveAuthorization: this._approveAuthorization.bind(this),
        denyAuthorization: this._denyAuthorization.bind(this),
        listGrants: this._listOAuthGrants.bind(this),
        revokeGrant: this._revokeOAuthGrant.bind(this),
      }),
      (this.passkey = {
        startRegistration: this._startPasskeyRegistration.bind(this),
        verifyRegistration: this._verifyPasskeyRegistration.bind(this),
        startAuthentication: this._startPasskeyAuthentication.bind(this),
        verifyAuthentication: this._verifyPasskeyAuthentication.bind(this),
        list: this._listPasskeys.bind(this),
        update: this._updatePasskey.bind(this),
        delete: this._deletePasskey.bind(this),
      }),
      this.persistSession
        ? (i.storage
            ? (this.storage = i.storage)
            : xp()
              ? (this.storage = globalThis.localStorage)
              : ((this.memoryStorage = {}),
                (this.storage = Ad(this.memoryStorage))),
          i.userStorage && (this.userStorage = i.userStorage))
        : ((this.memoryStorage = {}), (this.storage = Ad(this.memoryStorage))),
      Ne() &&
        globalThis.BroadcastChannel &&
        this.persistSession &&
        this.storageKey)
    ) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(
          this.storageKey,
        );
      } catch {}
      (s = this.broadcastChannel) === null ||
        s === void 0 ||
        s.addEventListener("message", async (o) => {
          (this._debug(
            "received broadcast notification from other tab or client",
            o,
          ),
            (o.data.event === "TOKEN_REFRESHED" ||
              o.data.event === "SIGNED_IN") &&
              (this.lastRefreshFailure = null));
          try {
            await this._notifyAllSubscribers(o.data.event, o.data.session, !1);
          } catch (a) {
            this._debug("#broadcastChannel", "error", a);
          }
        });
    }
    i.skipAutoInitialize ||
      this.initialize().catch((o) => {
        this._debug("#initialize()", "error", o);
      });
  }
  isThrowOnErrorEnabled() {
    return this.throwOnError;
  }
  _returnResult(e) {
    if (this.throwOnError && e && e.error) throw e.error;
    return e;
  }
  _logPrefix() {
    return `GoTrueClient@${this.storageKey}:${this.instanceID} (${Tp}) ${new Date().toISOString()}`;
  }
  _debug(...e) {
    return (
      this.logDebugMessages && this.logger(this._logPrefix(), ...e),
      this
    );
  }
  async initialize() {
    var e;
    if (this.initializePromise) return await this.initializePromise;
    ((this._pendingInitNotifications = []),
      (this.initializePromise = (async () =>
        this.lock != null
          ? await this._acquireLock(
              this.lockAcquireTimeout,
              async () => await this._initialize(),
            )
          : await this._initialize())()));
    const n = await this.initializePromise,
      r =
        (e = this._pendingInitNotifications) !== null && e !== void 0 ? e : [];
    this._pendingInitNotifications = null;
    for (const s of r)
      await this._notifyAllSubscribers(s.event, s.session, s.broadcast);
    return n;
  }
  async _initialize() {
    var e;
    try {
      let n = {},
        r = "none";
      if (
        (Ne() &&
          ((n = Ed(window.location.href)),
          this._isImplicitGrantCallback(n)
            ? (r = "implicit")
            : (await this._isPKCECallback(n)) && (r = "pkce")),
        Ne() && this.detectSessionInUrl && r !== "none")
      ) {
        const { data: s, error: i } = await this._getSessionFromURL(n, r);
        if (i) {
          if (
            (this._debug(
              "#_initialize()",
              "error detecting session from URL",
              i,
            ),
            b0(i))
          ) {
            const l =
              (e = i.details) === null || e === void 0 ? void 0 : e.code;
            if (
              l === "identity_already_exists" ||
              l === "identity_not_found" ||
              l === "single_identity_not_deletable"
            )
              return { error: i };
          }
          return { error: i };
        }
        const { session: o, redirectType: a } = s;
        return (
          this._debug(
            "#_initialize()",
            "detected session in URL",
            o,
            "redirect type",
            a,
          ),
          await this._saveSession(o),
          setTimeout(async () => {
            a === "recovery"
              ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", o)
              : await this._notifyAllSubscribers("SIGNED_IN", o);
          }, 0),
          { error: null }
        );
      }
      return (await this._recoverAndRefresh(), { error: null });
    } catch (n) {
      return j(n)
        ? this._returnResult({ error: n })
        : this._returnResult({
            error: new xt("Unexpected error during initialization", n),
          });
    } finally {
      (await this._handleVisibilityChange(),
        this._debug("#_initialize()", "end"));
    }
  }
  async signInAnonymously(e) {
    var n, r, s;
    try {
      const i = await U(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            data:
              (r =
                (n = e == null ? void 0 : e.options) === null || n === void 0
                  ? void 0
                  : n.data) !== null && r !== void 0
                ? r
                : {},
            gotrue_meta_security: {
              captcha_token:
                (s = e == null ? void 0 : e.options) === null || s === void 0
                  ? void 0
                  : s.captchaToken,
            },
          },
          xform: dt,
        }),
        { data: o, error: a } = i;
      if (a || !o)
        return this._returnResult({
          data: { user: null, session: null },
          error: a,
        });
      const l = o.session,
        u = o.user;
      return (
        o.session &&
          (await this._saveSession(o.session),
          await this._notifyAllSubscribers("SIGNED_IN", l)),
        this._returnResult({ data: { user: u, session: l }, error: null })
      );
    } catch (i) {
      if (j(i))
        return this._returnResult({
          data: { user: null, session: null },
          error: i,
        });
      throw i;
    }
  }
  async signUp(e) {
    var n, r, s;
    let i = null;
    try {
      let o;
      if ("email" in e) {
        const { email: c, password: h, options: g } = e;
        let y = null,
          v = null;
        (this.flowType === "pkce" &&
          ([y, v, i] = await this._getCodeChallengeAndMethod()),
          (o = await U(this.fetch, "POST", `${this.url}/signup`, {
            headers: this.headers,
            redirectTo: this._maybeAppendFlowIdToRedirect(
              g == null ? void 0 : g.emailRedirectTo,
              i,
            ),
            body: {
              email: c,
              password: h,
              data:
                (n = g == null ? void 0 : g.data) !== null && n !== void 0
                  ? n
                  : {},
              gotrue_meta_security: {
                captcha_token: g == null ? void 0 : g.captchaToken,
              },
              code_challenge: y,
              code_challenge_method: v,
            },
            xform: dt,
          })));
      } else if ("phone" in e) {
        const { phone: c, password: h, options: g } = e;
        o = await U(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: c,
            password: h,
            data:
              (r = g == null ? void 0 : g.data) !== null && r !== void 0
                ? r
                : {},
            channel:
              (s = g == null ? void 0 : g.channel) !== null && s !== void 0
                ? s
                : "sms",
            gotrue_meta_security: {
              captcha_token: g == null ? void 0 : g.captchaToken,
            },
          },
          xform: dt,
        });
      } else
        throw new bi(
          "You must provide either an email or phone number and a password",
        );
      const { data: a, error: l } = o;
      if (l || !a)
        return (
          await St(this.storage, this.storageKey, i),
          this._returnResult({ data: { user: null, session: null }, error: l })
        );
      const u = a.session,
        d = a.user;
      return (
        a.session &&
          (await this._saveSession(a.session),
          await this._notifyAllSubscribers("SIGNED_IN", u)),
        this._returnResult({ data: { user: d, session: u }, error: null })
      );
    } catch (o) {
      if ((await St(this.storage, this.storageKey, i), j(o)))
        return this._returnResult({
          data: { user: null, session: null },
          error: o,
        });
      throw o;
    }
  }
  async signInWithPassword(e) {
    try {
      let n;
      if ("email" in e) {
        const { email: i, password: o, options: a } = e;
        n = await U(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=password`,
          {
            headers: this.headers,
            body: {
              email: i,
              password: o,
              gotrue_meta_security: {
                captcha_token: a == null ? void 0 : a.captchaToken,
              },
            },
            xform: Rd,
          },
        );
      } else if ("phone" in e) {
        const { phone: i, password: o, options: a } = e;
        n = await U(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=password`,
          {
            headers: this.headers,
            body: {
              phone: i,
              password: o,
              gotrue_meta_security: {
                captcha_token: a == null ? void 0 : a.captchaToken,
              },
            },
            xform: Rd,
          },
        );
      } else
        throw new bi(
          "You must provide either an email or phone number and a password",
        );
      const { data: r, error: s } = n;
      if (s)
        return this._returnResult({
          data: { user: null, session: null },
          error: s,
        });
      if (!r || !r.session || !r.user) {
        const i = new ir();
        return this._returnResult({
          data: { user: null, session: null },
          error: i,
        });
      }
      return (
        r.session &&
          (await this._saveSession(r.session),
          await this._notifyAllSubscribers("SIGNED_IN", r.session)),
        this._returnResult({
          data: Object.assign(
            { user: r.user, session: r.session },
            r.weak_password ? { weakPassword: r.weak_password } : null,
          ),
          error: s,
        })
      );
    } catch (n) {
      if (j(n))
        return this._returnResult({
          data: { user: null, session: null },
          error: n,
        });
      throw n;
    }
  }
  async signInWithOAuth(e) {
    var n, r, s, i;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo:
        (n = e.options) === null || n === void 0 ? void 0 : n.redirectTo,
      scopes: (r = e.options) === null || r === void 0 ? void 0 : r.scopes,
      queryParams:
        (s = e.options) === null || s === void 0 ? void 0 : s.queryParams,
      skipBrowserRedirect:
        (i = e.options) === null || i === void 0
          ? void 0
          : i.skipBrowserRedirect,
    });
  }
  async exchangeCodeForSession(e, n) {
    return (
      await this.initializePromise,
      this.lock != null
        ? this._acquireLock(this.lockAcquireTimeout, async () =>
            this._exchangeCodeForSession(e, n),
          )
        : this._exchangeCodeForSession(e, n)
    );
  }
  async signInWithWeb3(e) {
    const { chain: n } = e;
    switch (n) {
      case "ethereum":
        return await this.signInWithEthereum(e);
      case "solana":
        return await this.signInWithSolana(e);
      default:
        throw new Error(`@supabase/auth-js: Unsupported chain "${n}"`);
    }
  }
  async signInWithEthereum(e) {
    var n, r, s, i, o, a, l, u, d, c, h;
    let g, y;
    if ("message" in e) ((g = e.message), (y = e.signature));
    else {
      const { chain: v, wallet: k, statement: p, options: f } = e;
      let m;
      if (Ne())
        if (typeof k == "object") m = k;
        else {
          const M = window;
          if (
            "ethereum" in M &&
            typeof M.ethereum == "object" &&
            "request" in M.ethereum &&
            typeof M.ethereum.request == "function"
          )
            m = M.ethereum;
          else
            throw new Error(
              "@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.",
            );
        }
      else {
        if (typeof k != "object" || !(f != null && f.url))
          throw new Error(
            "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
          );
        m = k;
      }
      const S = new URL(
          (n = f == null ? void 0 : f.url) !== null && n !== void 0
            ? n
            : window.location.href,
        ),
        C = await m
          .request({ method: "eth_requestAccounts" })
          .then((M) => M)
          .catch(() => {
            throw new Error(
              "@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid",
            );
          });
      if (!C || C.length === 0)
        throw new Error(
          "@supabase/auth-js: No accounts available. Please ensure the wallet is connected.",
        );
      const E = Pp(C[0]);
      let T =
        (r = f == null ? void 0 : f.signInWithEthereum) === null || r === void 0
          ? void 0
          : r.chainId;
      if (!T) {
        const M = await m.request({ method: "eth_chainId" });
        T = aw(M);
      }
      const x = {
        domain: S.host,
        address: E,
        statement: p,
        uri: S.href,
        version: "1",
        chainId: T,
        nonce:
          (s = f == null ? void 0 : f.signInWithEthereum) === null ||
          s === void 0
            ? void 0
            : s.nonce,
        issuedAt:
          (o =
            (i = f == null ? void 0 : f.signInWithEthereum) === null ||
            i === void 0
              ? void 0
              : i.issuedAt) !== null && o !== void 0
            ? o
            : new Date(),
        expirationTime:
          (a = f == null ? void 0 : f.signInWithEthereum) === null ||
          a === void 0
            ? void 0
            : a.expirationTime,
        notBefore:
          (l = f == null ? void 0 : f.signInWithEthereum) === null ||
          l === void 0
            ? void 0
            : l.notBefore,
        requestId:
          (u = f == null ? void 0 : f.signInWithEthereum) === null ||
          u === void 0
            ? void 0
            : u.requestId,
        resources:
          (d = f == null ? void 0 : f.signInWithEthereum) === null ||
          d === void 0
            ? void 0
            : d.resources,
      };
      ((g = uw(x)),
        (y = await m.request({ method: "personal_sign", params: [lw(g), E] })));
    }
    try {
      const { data: v, error: k } = await U(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=web3`,
        {
          headers: this.headers,
          body: Object.assign(
            { chain: "ethereum", message: g, signature: y },
            !((c = e.options) === null || c === void 0) && c.captchaToken
              ? {
                  gotrue_meta_security: {
                    captcha_token:
                      (h = e.options) === null || h === void 0
                        ? void 0
                        : h.captchaToken,
                  },
                }
              : null,
          ),
          xform: dt,
        },
      );
      if (k) throw k;
      if (!v || !v.session || !v.user) {
        const p = new ir();
        return this._returnResult({
          data: { user: null, session: null },
          error: p,
        });
      }
      return (
        v.session &&
          (await this._saveSession(v.session),
          await this._notifyAllSubscribers("SIGNED_IN", v.session)),
        this._returnResult({ data: Object.assign({}, v), error: k })
      );
    } catch (v) {
      if (j(v))
        return this._returnResult({
          data: { user: null, session: null },
          error: v,
        });
      throw v;
    }
  }
  async signInWithSolana(e) {
    var n, r, s, i, o, a, l, u, d, c, h, g;
    let y, v;
    if ("message" in e) ((y = e.message), (v = e.signature));
    else {
      const { chain: k, wallet: p, statement: f, options: m } = e;
      let S;
      if (Ne())
        if (typeof p == "object") S = p;
        else {
          const E = window;
          if (
            "solana" in E &&
            typeof E.solana == "object" &&
            (("signIn" in E.solana && typeof E.solana.signIn == "function") ||
              ("signMessage" in E.solana &&
                typeof E.solana.signMessage == "function"))
          )
            S = E.solana;
          else
            throw new Error(
              "@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.",
            );
        }
      else {
        if (typeof p != "object" || !(m != null && m.url))
          throw new Error(
            "@supabase/auth-js: Both wallet and url must be specified in non-browser environments.",
          );
        S = p;
      }
      const C = new URL(
        (n = m == null ? void 0 : m.url) !== null && n !== void 0
          ? n
          : window.location.href,
      );
      if ("signIn" in S && S.signIn) {
        const E = await S.signIn(
          Object.assign(
            Object.assign(
              Object.assign(
                { issuedAt: new Date().toISOString() },
                m == null ? void 0 : m.signInWithSolana,
              ),
              { version: "1", domain: C.host, uri: C.href },
            ),
            f ? { statement: f } : null,
          ),
        );
        let T;
        if (Array.isArray(E) && E[0] && typeof E[0] == "object") T = E[0];
        else if (
          E &&
          typeof E == "object" &&
          "signedMessage" in E &&
          "signature" in E
        )
          T = E;
        else
          throw new Error(
            "@supabase/auth-js: Wallet method signIn() returned unrecognized value",
          );
        if (
          "signedMessage" in T &&
          "signature" in T &&
          (typeof T.signedMessage == "string" ||
            T.signedMessage instanceof Uint8Array) &&
          T.signature instanceof Uint8Array
        )
          ((y =
            typeof T.signedMessage == "string"
              ? T.signedMessage
              : new TextDecoder().decode(T.signedMessage)),
            (v = T.signature));
        else
          throw new Error(
            "@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields",
          );
      } else {
        if (
          !("signMessage" in S) ||
          typeof S.signMessage != "function" ||
          !("publicKey" in S) ||
          typeof S != "object" ||
          !S.publicKey ||
          !("toBase58" in S.publicKey) ||
          typeof S.publicKey.toBase58 != "function"
        )
          throw new Error(
            "@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API",
          );
        y = [
          `${C.host} wants you to sign in with your Solana account:`,
          S.publicKey.toBase58(),
          ...(f ? ["", f, ""] : [""]),
          "Version: 1",
          `URI: ${C.href}`,
          `Issued At: ${(s = (r = m == null ? void 0 : m.signInWithSolana) === null || r === void 0 ? void 0 : r.issuedAt) !== null && s !== void 0 ? s : new Date().toISOString()}`,
          ...(!(
            (i = m == null ? void 0 : m.signInWithSolana) === null ||
            i === void 0
          ) && i.notBefore
            ? [`Not Before: ${m.signInWithSolana.notBefore}`]
            : []),
          ...(!(
            (o = m == null ? void 0 : m.signInWithSolana) === null ||
            o === void 0
          ) && o.expirationTime
            ? [`Expiration Time: ${m.signInWithSolana.expirationTime}`]
            : []),
          ...(!(
            (a = m == null ? void 0 : m.signInWithSolana) === null ||
            a === void 0
          ) && a.chainId
            ? [`Chain ID: ${m.signInWithSolana.chainId}`]
            : []),
          ...(!(
            (l = m == null ? void 0 : m.signInWithSolana) === null ||
            l === void 0
          ) && l.nonce
            ? [`Nonce: ${m.signInWithSolana.nonce}`]
            : []),
          ...(!(
            (u = m == null ? void 0 : m.signInWithSolana) === null ||
            u === void 0
          ) && u.requestId
            ? [`Request ID: ${m.signInWithSolana.requestId}`]
            : []),
          ...(!(
            (c =
              (d = m == null ? void 0 : m.signInWithSolana) === null ||
              d === void 0
                ? void 0
                : d.resources) === null || c === void 0
          ) && c.length
            ? [
                "Resources",
                ...m.signInWithSolana.resources.map((T) => `- ${T}`),
              ]
            : []),
        ].join(`
`);
        const E = await S.signMessage(new TextEncoder().encode(y), "utf8");
        if (!E || !(E instanceof Uint8Array))
          throw new Error(
            "@supabase/auth-js: Wallet signMessage() API returned an recognized value",
          );
        v = E;
      }
    }
    try {
      const { data: k, error: p } = await U(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=web3`,
        {
          headers: this.headers,
          body: Object.assign(
            { chain: "solana", message: y, signature: Fn(v) },
            !((h = e.options) === null || h === void 0) && h.captchaToken
              ? {
                  gotrue_meta_security: {
                    captcha_token:
                      (g = e.options) === null || g === void 0
                        ? void 0
                        : g.captchaToken,
                  },
                }
              : null,
          ),
          xform: dt,
        },
      );
      if (p) throw p;
      if (!k || !k.session || !k.user) {
        const f = new ir();
        return this._returnResult({
          data: { user: null, session: null },
          error: f,
        });
      }
      return (
        k.session &&
          (await this._saveSession(k.session),
          await this._notifyAllSubscribers("SIGNED_IN", k.session)),
        this._returnResult({ data: Object.assign({}, k), error: p })
      );
    } catch (k) {
      if (j(k))
        return this._returnResult({
          data: { user: null, session: null },
          error: k,
        });
      throw k;
    }
  }
  async _exchangeCodeForSession(e, n) {
    const r = (n == null ? void 0 : n.flowId) != null,
      s = r
        ? Ki(n == null ? void 0 : n.flowId)
        : Ne()
          ? Ki(Ed(window.location.href)[Bn])
          : null;
    r &&
      !s &&
      this._debug(
        "#_exchangeCodeForSession()",
        "provided flowId is not a valid flow id",
        n == null ? void 0 : n.flowId,
      );
    const { verifier: i, flowId: o } =
        r && !s
          ? { verifier: null, flowId: null }
          : await H0(this.storage, this.storageKey, s),
      [a, l] = (i ?? "").split("/");
    try {
      if (!a && this.flowType === "pkce") throw new T0();
      const { data: u, error: d } = await U(
        this.fetch,
        "POST",
        `${this.url}/token?grant_type=pkce`,
        {
          headers: this.headers,
          body: { auth_code: e, code_verifier: a },
          xform: dt,
        },
      );
      if ((await St(this.storage, this.storageKey, o), d)) throw d;
      if (!u || !u.session || !u.user) {
        const c = new ir();
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error: c,
        });
      }
      return (
        u.session &&
          (await this._saveSession(u.session),
          await this._notifyAllSubscribers(
            l === "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN",
            u.session,
          )),
        this._returnResult({
          data: Object.assign(Object.assign({}, u), {
            redirectType: l ?? null,
          }),
          error: d,
        })
      );
    } catch (u) {
      if ((await St(this.storage, this.storageKey, o), j(u)))
        return this._returnResult({
          data: { user: null, session: null, redirectType: null },
          error: u,
        });
      throw u;
    }
  }
  async signInWithIdToken(e) {
    try {
      const {
          options: n,
          provider: r,
          token: s,
          access_token: i,
          nonce: o,
        } = e,
        a = await U(
          this.fetch,
          "POST",
          `${this.url}/token?grant_type=id_token`,
          {
            headers: this.headers,
            body: {
              provider: r,
              id_token: s,
              access_token: i,
              nonce: o,
              gotrue_meta_security: {
                captcha_token: n == null ? void 0 : n.captchaToken,
              },
            },
            xform: dt,
          },
        ),
        { data: l, error: u } = a;
      if (u)
        return this._returnResult({
          data: { user: null, session: null },
          error: u,
        });
      if (!l || !l.session || !l.user) {
        const d = new ir();
        return this._returnResult({
          data: { user: null, session: null },
          error: d,
        });
      }
      return (
        l.session &&
          (await this._saveSession(l.session),
          await this._notifyAllSubscribers("SIGNED_IN", l.session)),
        this._returnResult({ data: l, error: u })
      );
    } catch (n) {
      if (j(n))
        return this._returnResult({
          data: { user: null, session: null },
          error: n,
        });
      throw n;
    }
  }
  async signInWithOtp(e) {
    var n, r, s, i, o;
    let a = null;
    try {
      if ("email" in e) {
        const { email: l, options: u } = e;
        let d = null,
          c = null;
        this.flowType === "pkce" &&
          ([d, c, a] = await this._getCodeChallengeAndMethod());
        const { error: h } = await U(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email: l,
            data:
              (n = u == null ? void 0 : u.data) !== null && n !== void 0
                ? n
                : {},
            create_user:
              (r = u == null ? void 0 : u.shouldCreateUser) !== null &&
              r !== void 0
                ? r
                : !0,
            gotrue_meta_security: {
              captcha_token: u == null ? void 0 : u.captchaToken,
            },
            code_challenge: d,
            code_challenge_method: c,
          },
          redirectTo: this._maybeAppendFlowIdToRedirect(
            u == null ? void 0 : u.emailRedirectTo,
            a,
          ),
        });
        return this._returnResult({
          data: { user: null, session: null },
          error: h,
        });
      }
      if ("phone" in e) {
        const { phone: l, options: u } = e,
          { data: d, error: c } = await U(
            this.fetch,
            "POST",
            `${this.url}/otp`,
            {
              headers: this.headers,
              body: {
                phone: l,
                data:
                  (s = u == null ? void 0 : u.data) !== null && s !== void 0
                    ? s
                    : {},
                create_user:
                  (i = u == null ? void 0 : u.shouldCreateUser) !== null &&
                  i !== void 0
                    ? i
                    : !0,
                gotrue_meta_security: {
                  captcha_token: u == null ? void 0 : u.captchaToken,
                },
                channel:
                  (o = u == null ? void 0 : u.channel) !== null && o !== void 0
                    ? o
                    : "sms",
              },
            },
          );
        return this._returnResult({
          data: {
            user: null,
            session: null,
            messageId: d == null ? void 0 : d.message_id,
          },
          error: c,
        });
      }
      throw new bi("You must provide either an email or phone number.");
    } catch (l) {
      if ((await St(this.storage, this.storageKey, a), j(l)))
        return this._returnResult({
          data: { user: null, session: null },
          error: l,
        });
      throw l;
    }
  }
  async verifyOtp(e) {
    var n, r;
    try {
      let s, i;
      "options" in e &&
        ((s = (n = e.options) === null || n === void 0 ? void 0 : n.redirectTo),
        (i =
          (r = e.options) === null || r === void 0 ? void 0 : r.captchaToken));
      const { data: o, error: a } = await U(
        this.fetch,
        "POST",
        `${this.url}/verify`,
        {
          headers: this.headers,
          body: Object.assign(Object.assign({}, e), {
            gotrue_meta_security: { captcha_token: i },
          }),
          redirectTo: s,
          xform: dt,
        },
      );
      if (a) throw a;
      if (!o) throw new Error("An error occurred on token verification.");
      const l = o.session,
        u = o.user;
      return (
        l != null &&
          l.access_token &&
          (await this._saveSession(l),
          await this._notifyAllSubscribers(
            e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN",
            l,
          )),
        this._returnResult({ data: { user: u, session: l }, error: null })
      );
    } catch (s) {
      if (j(s))
        return this._returnResult({
          data: { user: null, session: null },
          error: s,
        });
      throw s;
    }
  }
  async signInWithSSO(e) {
    var n, r, s, i;
    let o = null;
    try {
      let a = null,
        l = null;
      this.flowType === "pkce" &&
        ([a, l, o] = await this._getCodeChallengeAndMethod());
      const u = await U(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(
                Object.assign(
                  {},
                  "providerId" in e ? { provider_id: e.providerId } : null,
                ),
                "domain" in e ? { domain: e.domain } : null,
              ),
              {
                redirect_to: this._maybeAppendFlowIdToRedirect(
                  (n = e.options) === null || n === void 0
                    ? void 0
                    : n.redirectTo,
                  o,
                ),
              },
            ),
            !((r = e == null ? void 0 : e.options) === null || r === void 0) &&
              r.captchaToken
              ? {
                  gotrue_meta_security: {
                    captcha_token: e.options.captchaToken,
                  },
                }
              : null,
          ),
          {
            skip_http_redirect: !0,
            code_challenge: a,
            code_challenge_method: l,
          },
        ),
        headers: this.headers,
        xform: tw,
      });
      return (
        !((s = u.data) === null || s === void 0) &&
          s.url &&
          Ne() &&
          !(
            !((i = e.options) === null || i === void 0) && i.skipBrowserRedirect
          ) &&
          window.location.assign(u.data.url),
        this._returnResult(u)
      );
    } catch (a) {
      if ((await St(this.storage, this.storageKey, o), j(a)))
        return this._returnResult({ data: null, error: a });
      throw a;
    }
  }
  async reauthenticate() {
    return (
      await this.initializePromise,
      this.lock != null
        ? await this._acquireLock(
            this.lockAcquireTimeout,
            async () => await this._reauthenticate(),
          )
        : await this._reauthenticate()
    );
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: n },
          error: r,
        } = e;
        if (r) throw r;
        if (!n) throw new Re();
        const { error: s } = await U(
          this.fetch,
          "GET",
          `${this.url}/reauthenticate`,
          { headers: this.headers, jwt: n.access_token },
        );
        return this._returnResult({
          data: { user: null, session: null },
          error: s,
        });
      });
    } catch (e) {
      if (j(e))
        return this._returnResult({
          data: { user: null, session: null },
          error: e,
        });
      throw e;
    }
  }
  async resend(e) {
    let n = null;
    try {
      const r = `${this.url}/resend`;
      if ("email" in e) {
        const { email: s, type: i, options: o } = e;
        let a = null,
          l = null;
        this.flowType === "pkce" &&
          ([a, l, n] = await this._getCodeChallengeAndMethod());
        const { error: u } = await U(this.fetch, "POST", r, {
          headers: this.headers,
          body: {
            email: s,
            type: i,
            gotrue_meta_security: {
              captcha_token: o == null ? void 0 : o.captchaToken,
            },
            code_challenge: a,
            code_challenge_method: l,
          },
          redirectTo: this._maybeAppendFlowIdToRedirect(
            o == null ? void 0 : o.emailRedirectTo,
            n,
          ),
        });
        return (
          u && (await St(this.storage, this.storageKey, n)),
          this._returnResult({ data: { user: null, session: null }, error: u })
        );
      } else if ("phone" in e) {
        const { phone: s, type: i, options: o } = e,
          { data: a, error: l } = await U(this.fetch, "POST", r, {
            headers: this.headers,
            body: {
              phone: s,
              type: i,
              gotrue_meta_security: {
                captcha_token: o == null ? void 0 : o.captchaToken,
              },
            },
          });
        return this._returnResult({
          data: {
            user: null,
            session: null,
            messageId: a == null ? void 0 : a.message_id,
          },
          error: l,
        });
      }
      throw new bi(
        "You must provide either an email or phone number and a type",
      );
    } catch (r) {
      if ((await St(this.storage, this.storageKey, n), j(r)))
        return this._returnResult({
          data: { user: null, session: null },
          error: r,
        });
      throw r;
    }
  }
  async getSession() {
    return (
      await this.initializePromise,
      this.lock != null
        ? await this._acquireLock(this.lockAcquireTimeout, async () =>
            this._useSession(async (e) => e),
          )
        : await this._useSession(async (e) => e)
    );
  }
  async _acquireLock(e, n) {
    this._debug("#_acquireLock", "begin", e);
    try {
      if (this.lockAcquired) {
        const r = this.pendingInLock.length
            ? this.pendingInLock[this.pendingInLock.length - 1]
            : Promise.resolve(),
          s = (async () => (await r, await n()))();
        return (
          this.pendingInLock.push(
            (async () => {
              try {
                await s;
              } catch {}
            })(),
          ),
          s
        );
      }
      return await this.lock(`lock:${this.storageKey}`, e, async () => {
        this._debug(
          "#_acquireLock",
          "lock acquired for storage key",
          this.storageKey,
        );
        try {
          this.lockAcquired = !0;
          const r = n();
          for (
            this.pendingInLock.push(
              (async () => {
                try {
                  await r;
                } catch {}
              })(),
            ),
              await r;
            this.pendingInLock.length;
          ) {
            const s = [...this.pendingInLock];
            (await Promise.all(s), this.pendingInLock.splice(0, s.length));
          }
          return await r;
        } finally {
          (this._debug(
            "#_acquireLock",
            "lock released for storage key",
            this.storageKey,
          ),
            (this.lockAcquired = !1));
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  async _useSession(e) {
    this._debug("#_useSession", "begin");
    try {
      const n = await this.__loadSession();
      return await e(n);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  async __loadSession() {
    (this._debug("#__loadSession()", "begin"),
      this.lock != null &&
        !this.lockAcquired &&
        this._debug(
          "#__loadSession()",
          "used outside of an acquired lock!",
          new Error().stack,
        ));
    try {
      let e = null;
      const n = await Be(this.storage, this.storageKey);
      if (
        (this._debug("#getSession()", "session from storage", n),
        n !== null &&
          (this._isValidSession(n)
            ? (e = n)
            : (this._debug(
                "#getSession()",
                "session from storage is not valid",
              ),
              await this._removeSession())),
        !e)
      )
        return { data: { session: null }, error: null };
      const r = e.expires_at ? e.expires_at * 1e3 - Date.now() < ba : !1;
      if (
        (this._debug(
          "#__loadSession()",
          `session has${r ? "" : " not"} expired`,
          "expires_at",
          e.expires_at,
        ),
        !r)
      ) {
        if (this.userStorage) {
          const o = await Be(this.userStorage, this.storageKey + "-user");
          o != null && o.user ? (e.user = o.user) : (e.user = Ta());
        }
        if (
          this.storage.isServer &&
          e.user &&
          !e.user.__isUserNotAvailableProxy
        ) {
          const o = { value: this.suppressGetSessionWarning };
          ((e.user = X0(e.user, o)),
            o.value && (this.suppressGetSessionWarning = !0));
        }
        return { data: { session: e }, error: null };
      }
      const { data: s, error: i } = await this._callRefreshToken(
        e.refresh_token,
      );
      if (i) {
        if (!!(e.expires_at && e.expires_at * 1e3 > Date.now())) {
          const a = await Be(this.storage, this.storageKey);
          if (a && a.refresh_token === e.refresh_token)
            return this._returnResult({ data: { session: e }, error: null });
        }
        return this._returnResult({ data: { session: null }, error: i });
      }
      return this._returnResult({ data: { session: s }, error: null });
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  async getUser(e) {
    if (e) return await this._getUser(e);
    await this.initializePromise;
    let n;
    return (
      this.lock != null
        ? (n = await this._acquireLock(
            this.lockAcquireTimeout,
            async () => await this._getUser(),
          ))
        : (n = await this._getUser()),
      n.data.user && (this.suppressGetSessionWarning = !0),
      n
    );
  }
  async _getUser(e) {
    try {
      return e
        ? await U(this.fetch, "GET", `${this.url}/user`, {
            headers: this.headers,
            jwt: e,
            xform: gn,
          })
        : await this._useSession(async (n) => {
            var r, s, i;
            const { data: o, error: a } = n;
            if (a) throw a;
            return !(
              !((r = o.session) === null || r === void 0) && r.access_token
            ) && !this.hasCustomAuthorizationHeader
              ? { data: { user: null }, error: new Re() }
              : await U(this.fetch, "GET", `${this.url}/user`, {
                  headers: this.headers,
                  jwt:
                    (i =
                      (s = o.session) === null || s === void 0
                        ? void 0
                        : s.access_token) !== null && i !== void 0
                      ? i
                      : void 0,
                  xform: gn,
                });
          });
    } catch (n) {
      if (j(n))
        return (
          Ei(n) && (await this._removeSession()),
          this._returnResult({ data: { user: null }, error: n })
        );
      throw n;
    }
  }
  async updateUser(e, n = {}) {
    return (
      await this.initializePromise,
      this.lock != null
        ? await this._acquireLock(
            this.lockAcquireTimeout,
            async () => await this._updateUser(e, n),
          )
        : await this._updateUser(e, n)
    );
  }
  async _updateUser(e, n = {}) {
    let r = null;
    try {
      return await this._useSession(async (s) => {
        const { data: i, error: o } = s;
        if (o) throw o;
        if (!i.session) throw new Re();
        const a = i.session;
        let l = null,
          u = null;
        this.flowType === "pkce" &&
          e.email != null &&
          ([l, u, r] = await this._getCodeChallengeAndMethod());
        const { data: d, error: c } = await U(
          this.fetch,
          "PUT",
          `${this.url}/user`,
          {
            headers: this.headers,
            redirectTo: this._maybeAppendFlowIdToRedirect(
              n == null ? void 0 : n.emailRedirectTo,
              r,
            ),
            body: Object.assign(Object.assign({}, e), {
              code_challenge: l,
              code_challenge_method: u,
            }),
            jwt: a.access_token,
            xform: gn,
          },
        );
        if (c) throw c;
        return (
          (a.user = d.user),
          await this._saveSession(a),
          await this._notifyAllSubscribers("USER_UPDATED", a),
          this._returnResult({ data: { user: a.user }, error: null })
        );
      });
    } catch (s) {
      if ((await St(this.storage, this.storageKey, r), j(s)))
        return this._returnResult({ data: { user: null }, error: s });
      throw s;
    }
  }
  async setSession(e) {
    return (
      await this.initializePromise,
      this.lock != null
        ? await this._acquireLock(
            this.lockAcquireTimeout,
            async () => await this._setSession(e),
          )
        : await this._setSession(e)
    );
  }
  async _setSession(e) {
    try {
      if (!e.access_token || !e.refresh_token) throw new Re();
      const n = Date.now() / 1e3;
      let r = n,
        s = !0,
        i = null;
      const { payload: o } = Ri(e.access_token);
      if ((o.exp && ((r = o.exp), (s = r <= n)), s)) {
        const { data: a, error: l } = await this._callRefreshToken(
          e.refresh_token,
        );
        if (l)
          return this._returnResult({
            data: { user: null, session: null },
            error: l,
          });
        if (!a) return { data: { user: null, session: null }, error: null };
        i = a;
      } else {
        const { data: a, error: l } = await this._getUser(e.access_token);
        if (l)
          return this._returnResult({
            data: { user: null, session: null },
            error: l,
          });
        ((i = {
          access_token: e.access_token,
          refresh_token: e.refresh_token,
          user: a.user,
          token_type: "bearer",
          expires_in: r - n,
          expires_at: r,
        }),
          await this._saveSession(i),
          await this._notifyAllSubscribers("SIGNED_IN", i));
      }
      return this._returnResult({
        data: { user: i.user, session: i },
        error: null,
      });
    } catch (n) {
      if (j(n))
        return this._returnResult({
          data: { session: null, user: null },
          error: n,
        });
      throw n;
    }
  }
  async refreshSession(e) {
    return (
      await this.initializePromise,
      this.lock != null
        ? await this._acquireLock(
            this.lockAcquireTimeout,
            async () => await this._refreshSession(e),
          )
        : await this._refreshSession(e)
    );
  }
  async _refreshSession(e) {
    try {
      return await this._useSession(async (n) => {
        var r;
        if (!e) {
          const { data: o, error: a } = n;
          if (a) throw a;
          e = (r = o.session) !== null && r !== void 0 ? r : void 0;
        }
        if (!(e != null && e.refresh_token)) throw new Re();
        const { data: s, error: i } = await this._callRefreshToken(
          e.refresh_token,
        );
        return i
          ? this._returnResult({
              data: { user: null, session: null },
              error: i,
            })
          : s
            ? this._returnResult({
                data: { user: s.user, session: s },
                error: null,
              })
            : this._returnResult({
                data: { user: null, session: null },
                error: null,
              });
      });
    } catch (n) {
      if (j(n))
        return this._returnResult({
          data: { user: null, session: null },
          error: n,
        });
      throw n;
    }
  }
  async _getSessionFromURL(e, n) {
    var r;
    try {
      if (!Ne()) throw new Ti("No browser detected.");
      if (e.error || e.error_description || e.error_code)
        throw new Ti(
          e.error_description ||
            "Error in URL with unspecified error_description",
          {
            error: e.error || "unspecified_error",
            code: e.error_code || "unspecified_code",
          },
        );
      switch (n) {
        case "implicit":
          if (this.flowType === "pkce")
            throw new yd("Not a valid PKCE flow url.");
          break;
        case "pkce":
          if (this.flowType === "implicit")
            throw new Ti("Not a valid implicit grant flow url.");
          break;
        default:
      }
      if (n === "pkce") {
        if (
          (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !e.code)
        )
          throw new yd("No code detected.");
        const { data: m, error: S } = await this._exchangeCodeForSession(
          e.code,
          { flowId: e[Bn] },
        );
        if (S) throw S;
        const C = new URL(window.location.href);
        return (
          C.searchParams.delete("code"),
          C.searchParams.delete(Bn),
          window.history.replaceState(window.history.state, "", C.toString()),
          {
            data: {
              session: m.session,
              redirectType:
                (r = m.redirectType) !== null && r !== void 0 ? r : null,
            },
            error: null,
          }
        );
      }
      const {
        provider_token: s,
        provider_refresh_token: i,
        access_token: o,
        refresh_token: a,
        expires_in: l,
        expires_at: u,
        token_type: d,
      } = e;
      if (!o || !l || !a || !d) throw new Ti("No session defined in URL");
      const c = Math.round(Date.now() / 1e3),
        h = parseInt(l);
      let g = c + h;
      (u && (g = parseInt(u)), (g - c) * 1e3 <= Jt);
      const v = g - h;
      c - v >= 120 || c - v < 0;
      const { data: k, error: p } = await this._getUser(o);
      if (p) throw p;
      const f = {
        provider_token: s,
        provider_refresh_token: i,
        access_token: o,
        expires_in: h,
        expires_at: g,
        refresh_token: a,
        token_type: d,
        user: k.user,
      };
      return (
        (window.location.hash = ""),
        this._debug("#_getSessionFromURL()", "clearing window.location.hash"),
        this._returnResult({
          data: { session: f, redirectType: e.type },
          error: null,
        })
      );
    } catch (s) {
      if (j(s))
        return this._returnResult({
          data: { session: null, redirectType: null },
          error: s,
        });
      throw s;
    }
  }
  _isImplicitGrantCallback(e) {
    return typeof this.detectSessionInUrl == "function"
      ? this.detectSessionInUrl(new URL(window.location.href), e)
      : !!(e.access_token || e.error || e.error_description || e.error_code);
  }
  async _isPKCECallback(e) {
    if (!e.code) return !1;
    const n = Ki(e[Bn]);
    return n && (await Be(this.storage, Ur(this.storageKey, n)))
      ? !0
      : !!(await Be(this.storage, `${this.storageKey}-code-verifier`));
  }
  async signOut(e = { scope: "global" }) {
    return (
      await this.initializePromise,
      this.lock != null
        ? await this._acquireLock(
            this.lockAcquireTimeout,
            async () => await this._signOut(e),
          )
        : await this._signOut(e)
    );
  }
  async _signOut({ scope: e } = { scope: "global" }) {
    return await this._useSession(async (n) => {
      var r;
      const s = async () => {
          await this._removeSession();
        },
        { data: i, error: o } = n;
      if (o && !Ei(o)) return this._returnResult({ error: o });
      const a =
        (r = i.session) === null || r === void 0 ? void 0 : r.access_token;
      if (a) {
        const { error: l } = await this.admin.signOut(a, e);
        if (
          l &&
          !(
            (md(l) &&
              (l.status === 404 || l.status === 401 || l.status === 403)) ||
            Ei(l)
          )
        )
          return (
            e !== "others" && (await s()),
            this._returnResult({ error: l })
          );
      }
      return (
        e !== "others" && (await s()),
        this._returnResult({ error: null })
      );
    });
  }
  onAuthStateChange(e) {
    const n = j0(),
      r = {
        id: n,
        callback: e,
        unsubscribe: () => {
          (this._debug(
            "#unsubscribe()",
            "state change callback with id removed",
            n,
          ),
            this.stateChangeEmitters.delete(n));
        },
      };
    return (
      this._debug("#onAuthStateChange()", "registered callback with id", n),
      this.stateChangeEmitters.set(n, r),
      (async () => (
        await this.initializePromise,
        this.lock != null
          ? await this._acquireLock(this.lockAcquireTimeout, async () => {
              this._emitInitialSession(n);
            })
          : await this._emitInitialSession(n)
      ))(),
      { data: { subscription: r } }
    );
  }
  async _emitInitialSession(e) {
    return await this._useSession(async (n) => {
      var r, s;
      try {
        const {
          data: { session: i },
          error: o,
        } = n;
        if (o) throw o;
        (await ((r = this.stateChangeEmitters.get(e)) === null || r === void 0
          ? void 0
          : r.callback("INITIAL_SESSION", i)),
          this._debug("INITIAL_SESSION", "callback id", e, "session", i));
      } catch (i) {
        (await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0
          ? void 0
          : s.callback("INITIAL_SESSION", null)),
          this._debug("INITIAL_SESSION", "callback id", e, "error", i),
          Ei(i) ||
            Ci(i) ||
            (md(i) &&
              (i.code === "refresh_token_not_found" ||
                i.code === "refresh_token_already_used" ||
                i.code)));
      }
    });
  }
  async resetPasswordForEmail(e, n = {}) {
    let r = null,
      s = null,
      i = null;
    this.flowType === "pkce" &&
      ([r, s, i] = await this._getCodeChallengeAndMethod(!0));
    try {
      return await U(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: e,
          code_challenge: r,
          code_challenge_method: s,
          gotrue_meta_security: { captcha_token: n.captchaToken },
        },
        headers: this.headers,
        redirectTo: this._maybeAppendFlowIdToRedirect(n.redirectTo, i),
      });
    } catch (o) {
      if ((await St(this.storage, this.storageKey, i), j(o)))
        return this._returnResult({ data: null, error: o });
      throw o;
    }
  }
  async getUserIdentities() {
    var e;
    try {
      const { data: n, error: r } = await this.getUser();
      if (r) throw r;
      return this._returnResult({
        data: {
          identities: (e = n.user.identities) !== null && e !== void 0 ? e : [],
        },
        error: null,
      });
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async linkIdentity(e) {
    return "token" in e
      ? this.linkIdentityIdToken(e)
      : this.linkIdentityOAuth(e);
  }
  async linkIdentityOAuth(e) {
    var n;
    let r = null;
    try {
      const { data: s, error: i } = await this._useSession(async (o) => {
        var a, l, u, d, c;
        const { data: h, error: g } = o;
        if (g) throw g;
        const { url: y, flowId: v } = await this._getUrlForProvider(
          `${this.url}/user/identities/authorize`,
          e.provider,
          {
            redirectTo:
              (a = e.options) === null || a === void 0 ? void 0 : a.redirectTo,
            scopes:
              (l = e.options) === null || l === void 0 ? void 0 : l.scopes,
            queryParams:
              (u = e.options) === null || u === void 0 ? void 0 : u.queryParams,
            skipBrowserRedirect: !0,
          },
        );
        return (
          (r = v),
          await U(this.fetch, "GET", y, {
            headers: this.headers,
            jwt:
              (c =
                (d = h.session) === null || d === void 0
                  ? void 0
                  : d.access_token) !== null && c !== void 0
                ? c
                : void 0,
          })
        );
      });
      if (i) throw i;
      return (
        Ne() &&
          !(
            !((n = e.options) === null || n === void 0) && n.skipBrowserRedirect
          ) &&
          window.location.assign(s == null ? void 0 : s.url),
        this._returnResult({
          data: {
            provider: e.provider,
            url: s == null ? void 0 : s.url,
            flowId: r,
          },
          error: null,
        })
      );
    } catch (s) {
      if (j(s))
        return this._returnResult({
          data: { provider: e.provider, url: null, flowId: r },
          error: s,
        });
      throw s;
    }
  }
  async linkIdentityIdToken(e) {
    return await this._useSession(async (n) => {
      var r;
      try {
        const {
          error: s,
          data: { session: i },
        } = n;
        if (s) throw s;
        const {
            options: o,
            provider: a,
            token: l,
            access_token: u,
            nonce: d,
          } = e,
          c = await U(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=id_token`,
            {
              headers: this.headers,
              jwt:
                (r = i == null ? void 0 : i.access_token) !== null &&
                r !== void 0
                  ? r
                  : void 0,
              body: {
                provider: a,
                id_token: l,
                access_token: u,
                nonce: d,
                link_identity: !0,
                gotrue_meta_security: {
                  captcha_token: o == null ? void 0 : o.captchaToken,
                },
              },
              xform: dt,
            },
          ),
          { data: h, error: g } = c;
        return g
          ? this._returnResult({
              data: { user: null, session: null },
              error: g,
            })
          : !h || !h.session || !h.user
            ? this._returnResult({
                data: { user: null, session: null },
                error: new ir(),
              })
            : (h.session &&
                (await this._saveSession(h.session),
                await this._notifyAllSubscribers("USER_UPDATED", h.session)),
              this._returnResult({ data: h, error: g }));
      } catch (s) {
        if ((await St(this.storage, this.storageKey, null), j(s)))
          return this._returnResult({
            data: { user: null, session: null },
            error: s,
          });
        throw s;
      }
    });
  }
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (n) => {
        var r, s;
        const { data: i, error: o } = n;
        if (o) throw o;
        return await U(
          this.fetch,
          "DELETE",
          `${this.url}/user/identities/${e.identity_id}`,
          {
            headers: this.headers,
            jwt:
              (s =
                (r = i.session) === null || r === void 0
                  ? void 0
                  : r.access_token) !== null && s !== void 0
                ? s
                : void 0,
          },
        );
      });
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _refreshAccessToken(e) {
    const n = "#_refreshAccessToken()";
    this._debug(n, "begin");
    try {
      const r = Date.now();
      return await $0(
        async (s) => (
          s > 0 && (await L0(200 * Math.pow(2, s - 1))),
          this._debug(n, "refreshing attempt", s),
          await U(
            this.fetch,
            "POST",
            `${this.url}/token?grant_type=refresh_token`,
            { body: { refresh_token: e }, headers: this.headers, xform: dt },
          )
        ),
        (s, i) => {
          const o = 200 * Math.pow(2, s);
          return i && Ci(i) && Date.now() + o - r < Jt;
        },
      );
    } catch (r) {
      if ((this._debug(n, "error", r), j(r)))
        return this._returnResult({
          data: { session: null, user: null },
          error: r,
        });
      throw r;
    } finally {
      this._debug(n, "end");
    }
  }
  _isValidSession(e) {
    return (
      typeof e == "object" &&
      e !== null &&
      "access_token" in e &&
      "refresh_token" in e &&
      "expires_at" in e
    );
  }
  async _handleProviderSignIn(e, n) {
    const { url: r, flowId: s } = await this._getUrlForProvider(
      `${this.url}/authorize`,
      e,
      {
        redirectTo: n.redirectTo,
        scopes: n.scopes,
        queryParams: n.queryParams,
      },
    );
    return (
      this._debug(
        "#_handleProviderSignIn()",
        "provider",
        e,
        "options",
        n,
        "url",
        r,
      ),
      Ne() && !n.skipBrowserRedirect && window.location.assign(r),
      { data: { provider: e, url: r, flowId: s }, error: null }
    );
  }
  async _recoverAndRefresh() {
    var e, n;
    const r = "#_recoverAndRefresh()";
    this._debug(r, "begin");
    try {
      const s = await Be(this.storage, this.storageKey);
      if (s && this.userStorage) {
        let o = await Be(this.userStorage, this.storageKey + "-user");
        (!this.storage.isServer &&
          Object.is(this.storage, this.userStorage) &&
          !o &&
          ((o = { user: s.user }),
          await Yt(this.userStorage, this.storageKey + "-user", o)),
          (s.user =
            (e = o == null ? void 0 : o.user) !== null && e !== void 0
              ? e
              : Ta()));
      } else if (s && !s.user && !s.user) {
        const o = await Be(this.storage, this.storageKey + "-user");
        o && o != null && o.user
          ? ((s.user = o.user),
            await Qe(this.storage, this.storageKey + "-user"),
            await Yt(this.storage, this.storageKey, s))
          : (s.user = Ta());
      }
      if (
        (this._debug(r, "session from storage", s), !this._isValidSession(s))
      ) {
        (this._debug(r, "session is not valid"),
          s !== null && (await this._removeSession()));
        return;
      }
      const i =
        ((n = s.expires_at) !== null && n !== void 0 ? n : 1 / 0) * 1e3 -
          Date.now() <
        ba;
      if (
        (this._debug(
          r,
          `session has${i ? "" : " not"} expired with margin of ${ba}s`,
        ),
        i)
      ) {
        if (this.autoRefreshToken && s.refresh_token) {
          const { error: o } = await this._callRefreshToken(s.refresh_token);
          o &&
            (C0(o)
              ? this._debug(r, "refresh discarded by commit guard", o)
              : this._debug(r, "refresh failed", o));
        }
      } else if (s.user && s.user.__isUserNotAvailableProxy === !0)
        try {
          const { data: o, error: a } = await this._getUser(s.access_token);
          !a && o != null && o.user
            ? ((s.user = o.user),
              await this._saveSession(s),
              await this._notifyAllSubscribers("SIGNED_IN", s))
            : this._debug(
                r,
                "could not get user data, skipping SIGNED_IN notification",
              );
        } catch (o) {
          this._debug(
            r,
            "error getting user data, skipping SIGNED_IN notification",
            o,
          );
        }
      else await this._notifyAllSubscribers("SIGNED_IN", s);
    } catch (s) {
      (this._debug(r, "error", s), Ci(s));
      return;
    } finally {
      this._debug(r, "end");
    }
  }
  async _callRefreshToken(e) {
    var n, r;
    if (!e) throw new Re();
    if (this.refreshingDeferred) return this.refreshingDeferred.promise;
    if (
      this.lastRefreshFailure &&
      this.lastRefreshFailure.refreshToken === e &&
      Date.now() < this.lastRefreshFailure.expiresAt
    )
      return (
        this._debug(
          "#_callRefreshToken()",
          "returning cached failure (cooldown active)",
        ),
        this.lastRefreshFailure.result
      );
    const s = "#_callRefreshToken()";
    this._debug(s, "begin");
    try {
      this.refreshingDeferred = new qo();
      const i = await Be(this.storage, this.storageKey),
        { data: o, error: a } = await this._refreshAccessToken(e);
      if (a) throw a;
      if (!o.session) throw new Re();
      const l = await Be(this.storage, this.storageKey);
      if (i !== null && (l === null || l.refresh_token !== i.refresh_token)) {
        this._debug(
          s,
          "commit guard: storage changed since refresh started, discarding rotated tokens",
          { startedWith: "present", nowHolds: l ? "replaced" : "cleared" },
        );
        const h = { data: null, error: new vd() };
        return (this.refreshingDeferred.resolve(h), h);
      }
      const d = this._sessionRemovalEpoch;
      if (
        (await this._saveSession(o.session), this._sessionRemovalEpoch !== d)
      ) {
        (this._debug(
          s,
          "commit guard (post-save): _removeSession ran during _saveSession, undoing write",
        ),
          await Qe(this.storage, this.storageKey),
          this.userStorage &&
            (await Qe(this.userStorage, this.storageKey + "-user")));
        const h = { data: null, error: new vd() };
        return (this.refreshingDeferred.resolve(h), h);
      }
      await this._notifyAllSubscribers("TOKEN_REFRESHED", o.session);
      const c = { data: o.session, error: null };
      return (
        (this.lastRefreshFailure = null),
        this.refreshingDeferred.resolve(c),
        c
      );
    } catch (i) {
      if ((this._debug(s, "error", i), j(i))) {
        const o = { data: null, error: i };
        if (!Ci(i)) {
          const a = await Be(this.storage, this.storageKey);
          !!(a != null && a.expires_at && a.expires_at * 1e3 > Date.now())
            ? this._debug(
                s,
                "proactive refresh failed, access token still valid — preserving session",
              )
            : await this._removeSession();
        }
        return (
          (this.lastRefreshFailure = {
            refreshToken: e,
            result: o,
            expiresAt: Date.now() + m0,
          }),
          (n = this.refreshingDeferred) === null ||
            n === void 0 ||
            n.resolve(o),
          o
        );
      }
      throw (
        (r = this.refreshingDeferred) === null || r === void 0 || r.reject(i),
        i
      );
    } finally {
      ((this.refreshingDeferred = null), this._debug(s, "end"));
    }
  }
  async _notifyAllSubscribers(e, n, r = !0) {
    if (this._pendingInitNotifications !== null && r) {
      this._pendingInitNotifications.push({
        event: e,
        session: n,
        broadcast: r,
      });
      return;
    }
    const s = `#_notifyAllSubscribers(${e})`;
    this._debug(s, "begin", n, `broadcast = ${r}`);
    try {
      this.broadcastChannel &&
        r &&
        this.broadcastChannel.postMessage({ event: e, session: n });
      const i = [],
        o = Array.from(this.stateChangeEmitters.values()).map(async (a) => {
          try {
            await a.callback(e, n);
          } catch (l) {
            i.push(l);
          }
        });
      if ((await Promise.all(o), i.length > 0)) {
        for (let a = 0; a < i.length; a += 1);
        throw i[0];
      }
    } finally {
      this._debug(s, "end");
    }
  }
  async _saveSession(e) {
    (this._debug("#_saveSession()", e), (this.suppressGetSessionWarning = !0));
    const n = Object.assign({}, e),
      r = n.user && n.user.__isUserNotAvailableProxy === !0;
    if (this.userStorage) {
      !r &&
        n.user &&
        (await Yt(this.userStorage, this.storageKey + "-user", {
          user: n.user,
        }));
      const s = Object.assign({}, n);
      delete s.user;
      const i = bd(s);
      await Yt(this.storage, this.storageKey, i);
    } else {
      const s = bd(n);
      await Yt(this.storage, this.storageKey, s);
    }
  }
  async _removeSession() {
    ((this._sessionRemovalEpoch += 1),
      this._debug("#_removeSession()"),
      (this.lastRefreshFailure = null),
      (this.suppressGetSessionWarning = !1),
      await Qe(this.storage, this.storageKey),
      await V0(this.storage, this.storageKey),
      await Qe(this.storage, this.storageKey + "-user"),
      this.userStorage &&
        (await Qe(this.userStorage, this.storageKey + "-user")),
      await this._notifyAllSubscribers("SIGNED_OUT", null));
  }
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const e = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e &&
        Ne() &&
        window != null &&
        window.removeEventListener &&
        window.removeEventListener("visibilitychange", e);
    } catch {}
  }
  async _startAutoRefresh() {
    (await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()"));
    const e = setInterval(() => this._autoRefreshTokenTick(), Jt);
    ((this.autoRefreshTicker = e),
      e && typeof e == "object" && typeof e.unref == "function"
        ? e.unref()
        : typeof Deno < "u" &&
          typeof Deno.unrefTimer == "function" &&
          Deno.unrefTimer(e));
    const n = setTimeout(async () => {
      (await this.initializePromise, await this._autoRefreshTokenTick());
    }, 0);
    ((this.autoRefreshTickTimeout = n),
      n && typeof n == "object" && typeof n.unref == "function"
        ? n.unref()
        : typeof Deno < "u" &&
          typeof Deno.unrefTimer == "function" &&
          Deno.unrefTimer(n));
  }
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const e = this.autoRefreshTicker;
    ((this.autoRefreshTicker = null), e && clearInterval(e));
    const n = this.autoRefreshTickTimeout;
    ((this.autoRefreshTickTimeout = null), n && clearTimeout(n));
  }
  async startAutoRefresh() {
    (this._removeVisibilityChangedCallback(), await this._startAutoRefresh());
  }
  async stopAutoRefresh() {
    (this._removeVisibilityChangedCallback(), await this._stopAutoRefresh());
  }
  async dispose() {
    var e;
    (this._removeVisibilityChangedCallback(),
      await this._stopAutoRefresh(),
      (e = this.broadcastChannel) === null || e === void 0 || e.close(),
      (this.broadcastChannel = null),
      this.stateChangeEmitters.clear());
  }
  async _autoRefreshTokenTick() {
    if ((this._debug("#_autoRefreshTokenTick()", "begin"), this.lock != null)) {
      try {
        await this._acquireLock(0, async () => {
          try {
            const e = Date.now();
            try {
              return await this._useSession(async (n) => {
                const {
                  data: { session: r },
                } = n;
                if (!r || !r.refresh_token || !r.expires_at) {
                  this._debug("#_autoRefreshTokenTick()", "no session");
                  return;
                }
                const s = Math.floor((r.expires_at * 1e3 - e) / Jt);
                (this._debug(
                  "#_autoRefreshTokenTick()",
                  `access token expires in ${s} ticks, a tick lasts ${Jt}ms, refresh threshold is ${ss} ticks`,
                ),
                  s <= ss && (await this._callRefreshToken(r.refresh_token)));
              });
            } catch {}
          } finally {
            this._debug("#_autoRefreshTokenTick()", "end");
          }
        });
      } catch (e) {
        if (e instanceof iw)
          this._debug("auto refresh token tick lock not available");
        else throw e;
      }
      return;
    }
    if (this.refreshingDeferred !== null) {
      this._debug(
        "#_autoRefreshTokenTick()",
        "refresh already in flight, skipping",
      );
      return;
    }
    try {
      const e = Date.now();
      try {
        await this._useSession(async (n) => {
          const {
            data: { session: r },
          } = n;
          if (!r || !r.refresh_token || !r.expires_at) {
            this._debug("#_autoRefreshTokenTick()", "no session");
            return;
          }
          const s = Math.floor((r.expires_at * 1e3 - e) / Jt);
          (this._debug(
            "#_autoRefreshTokenTick()",
            `access token expires in ${s} ticks, a tick lasts ${Jt}ms, refresh threshold is ${ss} ticks`,
          ),
            s <= ss && (await this._callRefreshToken(r.refresh_token)));
        });
      } catch {}
    } finally {
      this._debug("#_autoRefreshTokenTick()", "end");
    }
  }
  async _handleVisibilityChange() {
    if (
      (this._debug("#_handleVisibilityChange()"),
      !Ne() || !(window != null && window.addEventListener))
    )
      return (this.autoRefreshToken && this.startAutoRefresh(), !1);
    try {
      ((this.visibilityChangedCallback = async () => {
        try {
          await this._onVisibilityChanged(!1);
        } catch (e) {
          this._debug("#visibilityChangedCallback", "error", e);
        }
      }),
        window == null ||
          window.addEventListener(
            "visibilitychange",
            this.visibilityChangedCallback,
          ),
        await this._onVisibilityChanged(!0));
    } catch {}
  }
  async _onVisibilityChanged(e) {
    const n = `#_onVisibilityChanged(${e})`;
    if (
      (this._debug(n, "visibilityState", document.visibilityState),
      document.visibilityState === "visible")
    ) {
      if ((this.autoRefreshToken && this._startAutoRefresh(), !e))
        if ((await this.initializePromise, this.lock != null))
          await this._acquireLock(this.lockAcquireTimeout, async () => {
            if (document.visibilityState !== "visible") {
              this._debug(
                n,
                "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting",
              );
              return;
            }
            await this._recoverAndRefresh();
          });
        else {
          if (document.visibilityState !== "visible") {
            this._debug(
              n,
              "visibilityState is no longer visible, skipping recovery",
            );
            return;
          }
          await this._recoverAndRefresh();
        }
    } else
      document.visibilityState === "hidden" &&
        this.autoRefreshToken &&
        this._stopAutoRefresh();
  }
  async _getUrlForProvider(e, n, r) {
    let s = r == null ? void 0 : r.redirectTo,
      i = null,
      o = null,
      a = null;
    this.flowType === "pkce" &&
      (([i, o, a] = await this._getCodeChallengeAndMethod()),
      (s = this._maybeAppendFlowIdToRedirect(s, a)));
    const l = [`provider=${encodeURIComponent(n)}`];
    if (
      (s && l.push(`redirect_to=${encodeURIComponent(s)}`),
      r != null && r.scopes && l.push(`scopes=${encodeURIComponent(r.scopes)}`),
      i != null && o != null)
    ) {
      const u = new URLSearchParams({
        code_challenge: `${encodeURIComponent(i)}`,
        code_challenge_method: `${encodeURIComponent(o)}`,
      });
      l.push(u.toString());
    }
    if (r != null && r.queryParams) {
      const u = new URLSearchParams(r.queryParams);
      l.push(u.toString());
    }
    return (
      r != null &&
        r.skipBrowserRedirect &&
        l.push(`skip_http_redirect=${r.skipBrowserRedirect}`),
      { url: `${e}?${l.join("&")}`, flowId: a }
    );
  }
  _maybeAppendFlowIdToRedirect(e, n) {
    return !e || !n || !this.experimental.appendPkceFlowIdToRedirects
      ? (e ?? void 0)
      : W0(e, n);
  }
  async _getCodeChallengeAndMethod(e = !1) {
    return K0(this.storage, this.storageKey, e, (n) =>
      this._debug(
        "#_getCodeChallengeAndMethod()",
        "evicted oldest pending PKCE verifier slot",
        n,
      ),
    );
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (n) => {
        var r;
        const { data: s, error: i } = n;
        return i
          ? this._returnResult({ data: null, error: i })
          : await U(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
              headers: this.headers,
              jwt:
                (r = s == null ? void 0 : s.session) === null || r === void 0
                  ? void 0
                  : r.access_token,
            });
      });
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _enroll(e) {
    try {
      return await this._useSession(async (n) => {
        var r, s;
        const { data: i, error: o } = n;
        if (o) return this._returnResult({ data: null, error: o });
        const a = Object.assign(
            { friendly_name: e.friendlyName, factor_type: e.factorType },
            e.factorType === "phone"
              ? { phone: e.phone }
              : e.factorType === "totp"
                ? { issuer: e.issuer }
                : {},
          ),
          { data: l, error: u } = await U(
            this.fetch,
            "POST",
            `${this.url}/factors`,
            {
              body: a,
              headers: this.headers,
              jwt:
                (r = i == null ? void 0 : i.session) === null || r === void 0
                  ? void 0
                  : r.access_token,
            },
          );
        return u
          ? this._returnResult({ data: null, error: u })
          : (e.factorType === "totp" &&
              l.type === "totp" &&
              !((s = l == null ? void 0 : l.totp) === null || s === void 0) &&
              s.qr_code &&
              (l.totp.qr_code = `data:image/svg+xml;utf-8,${l.totp.qr_code}`),
            this._returnResult({ data: l, error: null }));
      });
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _verify(e) {
    const n = async () => {
      try {
        return await this._useSession(async (r) => {
          var s;
          const { data: i, error: o } = r;
          if (o) return this._returnResult({ data: null, error: o });
          const a = Object.assign(
              { challenge_id: e.challengeId },
              "webauthn" in e
                ? {
                    webauthn: Object.assign(Object.assign({}, e.webauthn), {
                      credential_response:
                        e.webauthn.type === "create"
                          ? Nd(e.webauthn.credential_response)
                          : jd(e.webauthn.credential_response),
                    }),
                  }
                : { code: e.code },
            ),
            { data: l, error: u } = await U(
              this.fetch,
              "POST",
              `${this.url}/factors/${e.factorId}/verify`,
              {
                body: a,
                headers: this.headers,
                jwt:
                  (s = i == null ? void 0 : i.session) === null || s === void 0
                    ? void 0
                    : s.access_token,
              },
            );
          return u
            ? this._returnResult({ data: null, error: u })
            : (await this._saveSession(
                Object.assign(
                  { expires_at: Math.round(Date.now() / 1e3) + l.expires_in },
                  l,
                ),
              ),
              await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", l),
              this._returnResult({ data: l, error: u }));
        });
      } catch (r) {
        if (j(r)) return this._returnResult({ data: null, error: r });
        throw r;
      }
    };
    return this.lock != null
      ? this._acquireLock(this.lockAcquireTimeout, n)
      : n();
  }
  async _challenge(e) {
    const n = async () => {
      try {
        return await this._useSession(async (r) => {
          var s;
          const { data: i, error: o } = r;
          if (o) return this._returnResult({ data: null, error: o });
          const a = await U(
            this.fetch,
            "POST",
            `${this.url}/factors/${e.factorId}/challenge`,
            {
              body: e,
              headers: this.headers,
              jwt:
                (s = i == null ? void 0 : i.session) === null || s === void 0
                  ? void 0
                  : s.access_token,
            },
          );
          if (a.error) return a;
          const { data: l } = a;
          if (l.type !== "webauthn") return { data: l, error: null };
          switch (l.webauthn.type) {
            case "create":
              return {
                data: Object.assign(Object.assign({}, l), {
                  webauthn: Object.assign(Object.assign({}, l.webauthn), {
                    credential_options: Object.assign(
                      Object.assign({}, l.webauthn.credential_options),
                      {
                        publicKey: Od(l.webauthn.credential_options.publicKey),
                      },
                    ),
                  }),
                }),
                error: null,
              };
            case "request":
              return {
                data: Object.assign(Object.assign({}, l), {
                  webauthn: Object.assign(Object.assign({}, l.webauthn), {
                    credential_options: Object.assign(
                      Object.assign({}, l.webauthn.credential_options),
                      {
                        publicKey: Pd(l.webauthn.credential_options.publicKey),
                      },
                    ),
                  }),
                }),
                error: null,
              };
          }
        });
      } catch (r) {
        if (j(r)) return this._returnResult({ data: null, error: r });
        throw r;
      }
    };
    return this.lock != null
      ? this._acquireLock(this.lockAcquireTimeout, n)
      : n();
  }
  async _challengeAndVerify(e) {
    const { data: n, error: r } = await this._challenge({
      factorId: e.factorId,
    });
    return r
      ? this._returnResult({ data: null, error: r })
      : await this._verify({
          factorId: e.factorId,
          challengeId: n.id,
          code: e.code,
        });
  }
  async _listFactors() {
    var e;
    const {
      data: { user: n },
      error: r,
    } = await this.getUser();
    if (r) return { data: null, error: r };
    const s = { all: [], phone: [], totp: [], webauthn: [] };
    for (const i of (e = n == null ? void 0 : n.factors) !== null &&
    e !== void 0
      ? e
      : [])
      (s.all.push(i), i.status === "verified" && s[i.factor_type].push(i));
    return { data: s, error: null };
  }
  async _getAuthenticatorAssuranceLevel(e) {
    var n, r, s, i;
    if (e)
      try {
        const { payload: g } = Ri(e);
        let y = null;
        g.aal && (y = g.aal);
        let v = y;
        const {
          data: { user: k },
          error: p,
        } = await this.getUser(e);
        if (p) return this._returnResult({ data: null, error: p });
        ((r =
          (n = k == null ? void 0 : k.factors) === null || n === void 0
            ? void 0
            : n.filter((S) => S.status === "verified")) !== null && r !== void 0
          ? r
          : []
        ).length > 0 && (v = "aal2");
        const m = g.amr || [];
        return {
          data: {
            currentLevel: y,
            nextLevel: v,
            currentAuthenticationMethods: m,
          },
          error: null,
        };
      } catch (g) {
        if (j(g)) return this._returnResult({ data: null, error: g });
        throw g;
      }
    const {
      data: { session: o },
      error: a,
    } = await this.getSession();
    if (a) return this._returnResult({ data: null, error: a });
    if (!o)
      return {
        data: {
          currentLevel: null,
          nextLevel: null,
          currentAuthenticationMethods: [],
        },
        error: null,
      };
    const { payload: l } = Ri(o.access_token);
    let u = null;
    l.aal && (u = l.aal);
    let d = u;
    ((i =
      (s = o.user.factors) === null || s === void 0
        ? void 0
        : s.filter((g) => g.status === "verified")) !== null && i !== void 0
      ? i
      : []
    ).length > 0 && (d = "aal2");
    const h = l.amr || [];
    return {
      data: { currentLevel: u, nextLevel: d, currentAuthenticationMethods: h },
      error: null,
    };
  }
  async _getAuthorizationDetails(e) {
    try {
      return await this._useSession(async (n) => {
        const {
          data: { session: r },
          error: s,
        } = n;
        return s
          ? this._returnResult({ data: null, error: s })
          : r
            ? await U(
                this.fetch,
                "GET",
                `${this.url}/oauth/authorizations/${e}`,
                {
                  headers: this.headers,
                  jwt: r.access_token,
                  xform: (i) => ({ data: i, error: null }),
                },
              )
            : this._returnResult({ data: null, error: new Re() });
      });
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _approveAuthorization(e, n) {
    try {
      return await this._useSession(async (r) => {
        const {
          data: { session: s },
          error: i,
        } = r;
        if (i) return this._returnResult({ data: null, error: i });
        if (!s) return this._returnResult({ data: null, error: new Re() });
        const o = await U(
          this.fetch,
          "POST",
          `${this.url}/oauth/authorizations/${e}/consent`,
          {
            headers: this.headers,
            jwt: s.access_token,
            body: { action: "approve" },
            xform: (a) => ({ data: a, error: null }),
          },
        );
        return (
          o.data &&
            o.data.redirect_url &&
            Ne() &&
            !(n != null && n.skipBrowserRedirect) &&
            window.location.assign(o.data.redirect_url),
          o
        );
      });
    } catch (r) {
      if (j(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _denyAuthorization(e, n) {
    try {
      return await this._useSession(async (r) => {
        const {
          data: { session: s },
          error: i,
        } = r;
        if (i) return this._returnResult({ data: null, error: i });
        if (!s) return this._returnResult({ data: null, error: new Re() });
        const o = await U(
          this.fetch,
          "POST",
          `${this.url}/oauth/authorizations/${e}/consent`,
          {
            headers: this.headers,
            jwt: s.access_token,
            body: { action: "deny" },
            xform: (a) => ({ data: a, error: null }),
          },
        );
        return (
          o.data &&
            o.data.redirect_url &&
            Ne() &&
            !(n != null && n.skipBrowserRedirect) &&
            window.location.assign(o.data.redirect_url),
          o
        );
      });
    } catch (r) {
      if (j(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _listOAuthGrants() {
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: n },
          error: r,
        } = e;
        return r
          ? this._returnResult({ data: null, error: r })
          : n
            ? await U(this.fetch, "GET", `${this.url}/user/oauth/grants`, {
                headers: this.headers,
                jwt: n.access_token,
                xform: (s) => ({ data: s, error: null }),
              })
            : this._returnResult({ data: null, error: new Re() });
      });
    } catch (e) {
      if (j(e)) return this._returnResult({ data: null, error: e });
      throw e;
    }
  }
  async _revokeOAuthGrant(e) {
    try {
      return await this._useSession(async (n) => {
        const {
          data: { session: r },
          error: s,
        } = n;
        return s
          ? this._returnResult({ data: null, error: s })
          : r
            ? (await U(this.fetch, "DELETE", `${this.url}/user/oauth/grants`, {
                headers: this.headers,
                jwt: r.access_token,
                query: { client_id: e.clientId },
                noResolveJson: !0,
              }),
              { data: {}, error: null })
            : this._returnResult({ data: null, error: new Re() });
      });
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async fetchJwk(e, n = { keys: [] }) {
    let r = n.keys.find((a) => a.kid === e);
    if (r) return r;
    const s = Date.now();
    if (
      ((r = this.jwks.keys.find((a) => a.kid === e)),
      r && this.jwks_cached_at + S0 > s)
    )
      return r;
    const { data: i, error: o } = await U(
      this.fetch,
      "GET",
      `${this.url}/.well-known/jwks.json`,
      { headers: this.headers },
    );
    if (o) throw o;
    return !i.keys ||
      i.keys.length === 0 ||
      ((this.jwks = i),
      (this.jwks_cached_at = s),
      (r = i.keys.find((a) => a.kid === e)),
      !r)
      ? null
      : r;
  }
  async getClaims(e, n = {}) {
    try {
      let r = e;
      if (!r) {
        const { data: g, error: y } = await this.getSession();
        if (y || !g.session)
          return this._returnResult({ data: null, error: y });
        r = g.session.access_token;
      }
      const {
        header: s,
        payload: i,
        signature: o,
        raw: { header: a, payload: l },
      } = Ri(r);
      if (!(n != null && n.allowExpired))
        try {
          J0(i.exp);
        } catch (g) {
          throw new _o(
            g instanceof Error ? g.message : "JWT validation failed",
          );
        }
      const u =
        !s.alg ||
        s.alg.startsWith("HS") ||
        !s.kid ||
        !("crypto" in globalThis && "subtle" in globalThis.crypto)
          ? null
          : await this.fetchJwk(
              s.kid,
              n != null && n.keys
                ? { keys: n.keys }
                : n == null
                  ? void 0
                  : n.jwks,
            );
      if (!u) {
        const { error: g } = await this.getUser(r);
        if (g) throw g;
        return { data: { claims: i, header: s, signature: o }, error: null };
      }
      const d = Q0(s.alg),
        c = await crypto.subtle.importKey("jwk", u, d, !0, ["verify"]);
      if (!(await crypto.subtle.verify(d, c, o, P0(`${a}.${l}`))))
        throw new _o("Invalid JWT signature");
      return { data: { claims: i, header: s, signature: o }, error: null };
    } catch (r) {
      if (j(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async signInWithPasskey(e) {
    var n, r, s;
    Et(this.experimental);
    try {
      if (!Eo())
        return this._returnResult({
          data: null,
          error: new xt("Browser does not support WebAuthn", null),
        });
      const { data: i, error: o } = await this._startPasskeyAuthentication({
        options: {
          captchaToken:
            (n = e == null ? void 0 : e.options) === null || n === void 0
              ? void 0
              : n.captchaToken,
        },
      });
      if (o || !i) return this._returnResult({ data: null, error: o });
      const a = Pd(i.options),
        l =
          (s =
            (r = e == null ? void 0 : e.options) === null || r === void 0
              ? void 0
              : r.signal) !== null && s !== void 0
            ? s
            : Ml.createNewAbortSignal(),
        { data: u, error: d } = await Ip({ publicKey: a, signal: l });
      if (d || !u)
        return this._returnResult({
          data: null,
          error: d ?? new xt("WebAuthn ceremony failed", null),
        });
      const c = jd(u);
      return this._verifyPasskeyAuthentication({
        challengeId: i.challenge_id,
        credential: c,
      });
    } catch (i) {
      if (j(i)) return this._returnResult({ data: null, error: i });
      throw i;
    }
  }
  async registerPasskey(e) {
    var n, r;
    Et(this.experimental);
    try {
      if (!Eo())
        return this._returnResult({
          data: null,
          error: new xt("Browser does not support WebAuthn", null),
        });
      const { data: s, error: i } = await this._startPasskeyRegistration();
      if (i || !s) return this._returnResult({ data: null, error: i });
      const o = Od(s.options),
        a =
          (r =
            (n = e == null ? void 0 : e.options) === null || n === void 0
              ? void 0
              : n.signal) !== null && r !== void 0
            ? r
            : Ml.createNewAbortSignal(),
        { data: l, error: u } = await jp({ publicKey: o, signal: a });
      if (u || !l)
        return this._returnResult({
          data: null,
          error: u ?? new xt("WebAuthn ceremony failed", null),
        });
      const d = Nd(l);
      return this._verifyPasskeyRegistration({
        challengeId: s.challenge_id,
        credential: d,
      });
    } catch (s) {
      if (j(s)) return this._returnResult({ data: null, error: s });
      throw s;
    }
  }
  async _startPasskeyRegistration() {
    Et(this.experimental);
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: n },
          error: r,
        } = e;
        if (r) return this._returnResult({ data: null, error: r });
        if (!n) return this._returnResult({ data: null, error: new Re() });
        const { data: s, error: i } = await U(
          this.fetch,
          "POST",
          `${this.url}/passkeys/registration/options`,
          { headers: this.headers, jwt: n.access_token, body: {} },
        );
        return i
          ? this._returnResult({ data: null, error: i })
          : this._returnResult({ data: s, error: null });
      });
    } catch (e) {
      if (j(e)) return this._returnResult({ data: null, error: e });
      throw e;
    }
  }
  async _verifyPasskeyRegistration(e) {
    Et(this.experimental);
    try {
      return await this._useSession(async (n) => {
        const {
          data: { session: r },
          error: s,
        } = n;
        if (s) return this._returnResult({ data: null, error: s });
        if (!r) return this._returnResult({ data: null, error: new Re() });
        const { data: i, error: o } = await U(
          this.fetch,
          "POST",
          `${this.url}/passkeys/registration/verify`,
          {
            headers: this.headers,
            jwt: r.access_token,
            body: { challenge_id: e.challengeId, credential: e.credential },
          },
        );
        return o
          ? this._returnResult({ data: null, error: o })
          : this._returnResult({ data: i, error: null });
      });
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _startPasskeyAuthentication(e) {
    var n;
    Et(this.experimental);
    try {
      const { data: r, error: s } = await U(
        this.fetch,
        "POST",
        `${this.url}/passkeys/authentication/options`,
        {
          headers: this.headers,
          body: {
            gotrue_meta_security: {
              captcha_token:
                (n = e == null ? void 0 : e.options) === null || n === void 0
                  ? void 0
                  : n.captchaToken,
            },
          },
        },
      );
      return s
        ? this._returnResult({ data: null, error: s })
        : this._returnResult({ data: r, error: null });
    } catch (r) {
      if (j(r)) return this._returnResult({ data: null, error: r });
      throw r;
    }
  }
  async _verifyPasskeyAuthentication(e) {
    Et(this.experimental);
    try {
      const { data: n, error: r } = await U(
        this.fetch,
        "POST",
        `${this.url}/passkeys/authentication/verify`,
        {
          headers: this.headers,
          body: { challenge_id: e.challengeId, credential: e.credential },
          xform: dt,
        },
      );
      return r
        ? this._returnResult({ data: null, error: r })
        : (n.session &&
            (await this._saveSession(n.session),
            await this._notifyAllSubscribers("SIGNED_IN", n.session)),
          this._returnResult({ data: n, error: null }));
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _listPasskeys() {
    Et(this.experimental);
    try {
      return await this._useSession(async (e) => {
        const {
          data: { session: n },
          error: r,
        } = e;
        if (r) return this._returnResult({ data: null, error: r });
        if (!n) return this._returnResult({ data: null, error: new Re() });
        const { data: s, error: i } = await U(
          this.fetch,
          "GET",
          `${this.url}/passkeys`,
          {
            headers: this.headers,
            jwt: n.access_token,
            xform: (o) => ({ data: o, error: null }),
          },
        );
        return i
          ? this._returnResult({ data: null, error: i })
          : this._returnResult({ data: s, error: null });
      });
    } catch (e) {
      if (j(e)) return this._returnResult({ data: null, error: e });
      throw e;
    }
  }
  async _updatePasskey(e) {
    Et(this.experimental);
    try {
      return await this._useSession(async (n) => {
        const {
          data: { session: r },
          error: s,
        } = n;
        if (s) return this._returnResult({ data: null, error: s });
        if (!r) return this._returnResult({ data: null, error: new Re() });
        const { data: i, error: o } = await U(
          this.fetch,
          "PATCH",
          `${this.url}/passkeys/${e.passkeyId}`,
          {
            headers: this.headers,
            jwt: r.access_token,
            body: { friendly_name: e.friendlyName },
          },
        );
        return o
          ? this._returnResult({ data: null, error: o })
          : this._returnResult({ data: i, error: null });
      });
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
  async _deletePasskey(e) {
    Et(this.experimental);
    try {
      return await this._useSession(async (n) => {
        const {
          data: { session: r },
          error: s,
        } = n;
        if (s) return this._returnResult({ data: null, error: s });
        if (!r) return this._returnResult({ data: null, error: new Re() });
        const { error: i } = await U(
          this.fetch,
          "DELETE",
          `${this.url}/passkeys/${e.passkeyId}`,
          { headers: this.headers, jwt: r.access_token, noResolveJson: !0 },
        );
        return i
          ? this._returnResult({ data: null, error: i })
          : this._returnResult({ data: null, error: null });
      });
    } catch (n) {
      if (j(n)) return this._returnResult({ data: null, error: n });
      throw n;
    }
  }
}
zs.nextInstanceID = {};
const ww = zs,
  _w = "2.112.3";
let is = "",
  To;
if (typeof Deno < "u") {
  var Ra;
  ((is = "deno"),
    (To = (Ra = Deno.version) === null || Ra === void 0 ? void 0 : Ra.deno));
} else if (typeof document < "u") is = "web";
else if (typeof navigator < "u" && navigator.product === "ReactNative")
  is = "react-native";
else {
  var xa;
  is = "node";
  const t = globalThis.process;
  To =
    t == null || (xa = t.version) === null || xa === void 0
      ? void 0
      : xa.replace(/^v/, "");
}
const Lp = [`runtime=${is}`];
To && Lp.push(`runtime-version=${To}`);
const kw = { "X-Client-Info": `supabase-js/${_w}; ${Lp.join("; ")}` },
  Sw = { headers: kw },
  Ew = { schema: "public" },
  bw = {
    autoRefreshToken: !0,
    persistSession: !0,
    detectSessionInUrl: !0,
    flowType: "implicit",
  },
  Tw = {},
  Cw = { enabled: !1, respectSamplingDecision: !0 };
function Rw(t) {
  if (!t || typeof t != "string") return null;
  const e = t.split("-");
  if (e.length !== 4) return null;
  const [n, r, s, i] = e;
  if (n.length !== 2 || r.length !== 32 || s.length !== 16 || i.length !== 2)
    return null;
  const o = /^[0-9a-f]+$/i;
  return !o.test(n) ||
    !o.test(r) ||
    !o.test(s) ||
    !o.test(i) ||
    r === "00000000000000000000000000000000" ||
    s === "0000000000000000"
    ? null
    : {
        version: n,
        traceId: r,
        parentId: s,
        traceFlags: i,
        isSampled: (parseInt(i, 16) & 1) === 1,
      };
}
function xw(t, e) {
  if (!t || !e || e.length === 0) return !1;
  let n;
  if (t instanceof URL) n = t;
  else
    try {
      n = new URL(t);
    } catch {
      return !1;
    }
  for (const r of e)
    try {
      if (typeof r == "string") {
        if (Aw(n.hostname, r)) return !0;
      } else if (r instanceof RegExp) {
        if (r.test(n.hostname)) return !0;
      } else if (typeof r == "function" && r(n)) return !0;
    } catch {
      continue;
    }
  return !1;
}
function Aw(t, e) {
  if (e === t) return !0;
  if (e.startsWith("*.")) {
    const n = e.slice(2);
    if (t.endsWith(n) && (t === n || t.endsWith("." + n))) return !0;
  }
  return !1;
}
function Ow(t) {
  const e = [];
  try {
    const n = new URL(t);
    e.push(n.hostname);
  } catch {}
  return (
    e.push("*.supabase.co", "*.supabase.in"),
    e.push("localhost", "127.0.0.1", "[::1]"),
    e
  );
}
function Hs(t) {
  "@babel/helpers - typeof";
  return (
    (Hs =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          }),
    Hs(t)
  );
}
function Pw(t, e) {
  if (Hs(t) != "object" || !t) return t;
  var n = t[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(t, e);
    if (Hs(r) != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(t);
}
function Nw(t) {
  var e = Pw(t, "string");
  return Hs(e) == "symbol" ? e : e + "";
}
function jw(t, e, n) {
  return (
    (e = Nw(e)) in t
      ? Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = n),
    t
  );
}
function Id(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(t);
    (e &&
      (r = r.filter(function (s) {
        return Object.getOwnPropertyDescriptor(t, s).enumerable;
      })),
      n.push.apply(n, r));
  }
  return n;
}
function pe(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? Id(Object(n), !0).forEach(function (r) {
          jw(t, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : Id(Object(n)).forEach(function (r) {
            Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(n, r));
          });
  }
  return t;
}
const Iw = (t) => (t ? (...e) => t(...e) : (...e) => fetch(...e)),
  Lw = () => Headers,
  $p = (t) => t.startsWith("sb_publishable_") || t.startsWith("sb_secret_"),
  $w = "sb_temp_",
  Ld = new Set(),
  Dw = (t) => {
    var e, n;
    if (!t.startsWith("sb_") || $p(t) || t.startsWith($w)) return;
    const r =
      (e =
        (n = t.match(/^sb_[a-zA-Z0-9]+_/)) === null || n === void 0
          ? void 0
          : n[0]) !== null && e !== void 0
        ? e
        : "unknown";
    Ld.has(r) || Ld.add(r);
  },
  $d = (t, e, n, r, s, i) => {
    const o = Iw(r),
      a = Lw(),
      l = (s == null ? void 0 : s.enabled) === !0,
      u = (s == null ? void 0 : s.respectSamplingDecision) !== !1,
      d = l ? Ow(e) : null,
      c = !(i != null && i.omitApiKeyAsBearer && $p(t));
    return async (h, g) => {
      const y = await n();
      let v = new a(g == null ? void 0 : g.headers);
      if ((v.has("apikey") || v.set("apikey", t), !v.has("Authorization"))) {
        const k = y ?? (c ? t : null);
        k && v.set("Authorization", `Bearer ${k}`);
      }
      if (d) {
        const k = Uw(h, d, u);
        k &&
          (k.traceparent &&
            !v.has("traceparent") &&
            v.set("traceparent", k.traceparent),
          k.tracestate &&
            !v.has("tracestate") &&
            v.set("tracestate", k.tracestate),
          k.baggage && !v.has("baggage") && v.set("baggage", k.baggage));
      }
      return o(h, pe(pe({}, g), {}, { headers: v }));
    };
  };
let Dd = !1,
  Ud = !1;
function Uw(t, e, n) {
  const r = Dy();
  if (!r) return (Dd || (Dd = !0), null);
  if (!xw(typeof t == "string" || t instanceof URL ? t : t.url, e)) return null;
  const s = r();
  if (!s || !s.traceparent) {
    var i;
    if (
      !(s == null || (i = s.carrierKeys) === null || i === void 0) &&
      i.length &&
      !Ud
    ) {
      Ud = !0;
      const o = s.carrierKeys.includes("sentry-trace")
        ? " Sentry detected: set `propagateTraceparent: true` in Sentry.init() to emit it."
        : " Configure your tracing SDK to emit W3C trace context on outgoing requests.";
    }
    return null;
  }
  if (n) {
    const o = Rw(s.traceparent);
    if (o && !o.isSampled) return { traceparent: s.traceparent };
  }
  return s;
}
function Md(t) {
  return typeof t == "boolean" ? { enabled: t } : t;
}
function Mw(t) {
  return t.endsWith("/") ? t : t + "/";
}
function Bw(t, e) {
  var n, r, s, i, o, a;
  const { db: l, auth: u, realtime: d, global: c } = t,
    { db: h, auth: g, realtime: y, global: v } = e,
    k = Md(t.tracePropagation),
    p = Md(e.tracePropagation),
    f = {
      db: pe(pe({}, h), l),
      auth: pe(pe({}, g), u),
      realtime: pe(pe({}, y), d),
      storage: {},
      global: pe(
        pe(pe({}, v), c),
        {},
        {
          headers: pe(
            pe(
              {},
              (n = v == null ? void 0 : v.headers) !== null && n !== void 0
                ? n
                : {},
            ),
            (r = c == null ? void 0 : c.headers) !== null && r !== void 0
              ? r
              : {},
          ),
        },
      ),
      tracePropagation: {
        enabled:
          (s =
            (i = k == null ? void 0 : k.enabled) !== null && i !== void 0
              ? i
              : p == null
                ? void 0
                : p.enabled) !== null && s !== void 0
            ? s
            : !1,
        respectSamplingDecision:
          (o =
            (a = k == null ? void 0 : k.respectSamplingDecision) !== null &&
            a !== void 0
              ? a
              : p == null
                ? void 0
                : p.respectSamplingDecision) !== null && o !== void 0
            ? o
            : !0,
      },
      accessToken: async () => "",
    };
  return (
    t.accessToken ? (f.accessToken = t.accessToken) : delete f.accessToken,
    f
  );
}
function Fw(t) {
  const e = t == null ? void 0 : t.trim();
  if (!e) throw new Error("supabaseUrl is required.");
  if (!e.match(/^https?:\/\//i))
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  try {
    return new URL(Mw(e));
  } catch {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
var zw = class extends ww {
    constructor(t) {
      super(t);
    }
  },
  Hw = class {
    constructor(t, e, n) {
      var r, s;
      ((this.supabaseUrl = t), (this.supabaseKey = e));
      const i = Fw(t);
      if (!e) throw new Error("supabaseKey is required.");
      (Dw(e),
        (this.realtimeUrl = new URL("realtime/v1", i)),
        (this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace(
          "http",
          "ws",
        )),
        (this.authUrl = new URL("auth/v1", i)),
        (this.storageUrl = new URL("storage/v1", i)),
        (this.functionsUrl = new URL("functions/v1", i)));
      const o = `sb-${i.hostname.split(".")[0]}-auth-token`,
        a = {
          db: Ew,
          realtime: Tw,
          auth: pe(pe({}, bw), {}, { storageKey: o }),
          global: Sw,
          tracePropagation: Cw,
        },
        l = Bw(n ?? {}, a);
      if (
        ((this.settings = l),
        (this.storageKey =
          (r = l.auth.storageKey) !== null && r !== void 0 ? r : ""),
        (this.headers =
          (s = l.global.headers) !== null && s !== void 0 ? s : {}),
        l.accessToken)
      )
        ((this.accessToken = l.accessToken),
          (this.auth = new Proxy(
            {},
            {
              get: (d, c) => {
                throw new Error(
                  `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(c)} is not possible`,
                );
              },
            },
          )));
      else {
        var u;
        this.auth = this._initSupabaseAuthClient(
          (u = l.auth) !== null && u !== void 0 ? u : {},
          this.headers,
          l.global.fetch,
        );
      }
      ((this.fetch = $d(
        e,
        t,
        this._getSessionToken.bind(this),
        l.global.fetch,
        l.tracePropagation,
      )),
        (this.functionsFetch = $d(
          e,
          t,
          this._getSessionToken.bind(this),
          l.global.fetch,
          l.tracePropagation,
          { omitApiKeyAsBearer: !0 },
        )),
        (this.realtime = this._initRealtimeClient(
          pe(
            {
              headers: this.headers,
              accessToken: this._getAccessToken.bind(this),
              fetch: this.fetch,
            },
            l.realtime,
          ),
        )),
        this.accessToken &&
          Promise.resolve(this.accessToken())
            .then((d) => this.realtime.setAuth(d))
            .catch((d) => {}),
        (this.rest = new Qy(new URL("rest/v1", i).href, {
          headers: this.headers,
          schema: l.db.schema,
          fetch: this.fetch,
          timeout: l.db.timeout,
          urlLengthLimit: l.db.urlLengthLimit,
          retry: l.db.retry,
        })),
        (this.storage = new g0(
          this.storageUrl.href,
          this.headers,
          this.fetch,
          n == null ? void 0 : n.storage,
        )),
        l.accessToken || this._listenForAuthEvents());
    }
    get functions() {
      return new Fy(this.functionsUrl.href, {
        headers: this.headers,
        customFetch: this.functionsFetch,
      });
    }
    from(t) {
      return this.rest.from(t);
    }
    schema(t) {
      return this.rest.schema(t);
    }
    rpc(t, e = {}, n = { head: !1, get: !1, count: void 0 }) {
      return this.rest.rpc(t, e, n);
    }
    channel(t, e = { config: {} }) {
      return this.realtime.channel(t, e);
    }
    getChannels() {
      return this.realtime.getChannels();
    }
    removeChannel(t) {
      return this.realtime.removeChannel(t);
    }
    removeAllChannels() {
      return this.realtime.removeAllChannels();
    }
    async _getSessionToken() {
      var t = this,
        e,
        n;
      if (t.accessToken) return await t.accessToken();
      const { data: r } = await t.auth.getSession();
      return (e =
        (n = r.session) === null || n === void 0 ? void 0 : n.access_token) !==
        null && e !== void 0
        ? e
        : null;
    }
    async _getAccessToken() {
      var t = this,
        e;
      return (e = await t._getSessionToken()) !== null && e !== void 0
        ? e
        : t.supabaseKey;
    }
    _initSupabaseAuthClient(
      {
        autoRefreshToken: t,
        persistSession: e,
        detectSessionInUrl: n,
        storage: r,
        userStorage: s,
        storageKey: i,
        flowType: o,
        lock: a,
        debug: l,
        throwOnError: u,
        experimental: d,
        lockAcquireTimeout: c,
        skipAutoInitialize: h,
      },
      g,
      y,
    ) {
      const v = {
        Authorization: `Bearer ${this.supabaseKey}`,
        apikey: `${this.supabaseKey}`,
      };
      return new zw({
        url: this.authUrl.href,
        headers: pe(pe({}, v), g),
        storageKey: i,
        autoRefreshToken: t,
        persistSession: e,
        detectSessionInUrl: n,
        storage: r,
        userStorage: s,
        flowType: o,
        lock: a,
        debug: l,
        throwOnError: u,
        experimental: d,
        fetch: y,
        lockAcquireTimeout: c,
        skipAutoInitialize: h,
        hasCustomAuthorizationHeader: Object.keys(this.headers).some(
          (k) => k.toLowerCase() === "authorization",
        ),
      });
    }
    _initRealtimeClient(t) {
      return new Mv(
        this.realtimeUrl.href,
        pe(
          pe({}, t),
          {},
          {
            params: pe(
              pe({}, { apikey: this.supabaseKey }),
              t == null ? void 0 : t.params,
            ),
          },
        ),
      );
    }
    _listenForAuthEvents() {
      return this.auth.onAuthStateChange((t, e) => {
        this._handleTokenChanged(
          t,
          "CLIENT",
          e == null ? void 0 : e.access_token,
        );
      });
    }
    _handleTokenChanged(t, e, n) {
      (t === "TOKEN_REFRESHED" ||
        t === "SIGNED_IN" ||
        t === "INITIAL_SESSION") &&
      this.changedAccessToken !== n
        ? ((this.changedAccessToken = n), this.realtime.setAuth(n))
        : t === "SIGNED_OUT" &&
          (this.realtime.setAuth(),
          e == "STORAGE" && this.auth.signOut(),
          (this.changedAccessToken = void 0));
    }
  };
const Vw = (t, e, n) => new Hw(t, e, n);
function Ww() {
  if (typeof window < "u" || globalThis.Deno !== void 0) return !1;
  const t = globalThis.process;
  if (!t) return !1;
  const e = t.version;
  if (e == null) return !1;
  const n = e.match(/^v(\d+)\./);
  return n ? parseInt(n[1], 10) <= 20 : !1;
}
Ww();
let Aa = null;
function Bl() {
  return window.firebaseRoomClient;
}
let Oa = null;
function Dp() {
  return (
    Oa ||
      (Oa =
        (crypto.randomUUID && crypto.randomUUID()) ||
        `u_${Math.random().toString(36).slice(2)}`),
    Oa
  );
}
function Kw(t) {
  const [e, n] = _.useState(null),
    [r, s] = _.useState("idle");
  return (
    _.useEffect(() => {
      const i = Bl();
      if (!i) {
        s("unconfigured");
        return;
      }
      s("connecting");
      const o = Dp(),
        a = i.channel(ie.PRESENCE_ROOM, { config: { presence: { key: o } } }),
        l = () => {
          const u = a.presenceState();
          n(Object.keys(u).length);
        };
      return (
        a
          .on("presence", { event: "sync" }, l)
          .on("presence", { event: "join" }, l)
          .on("presence", { event: "leave" }, l)
          .subscribe(async (u) => {
            u === "SUBSCRIBED"
              ? (await a.track({ joined_at: new Date().toISOString() }),
                s("live"))
              : (u === "CHANNEL_ERROR" || u === "TIMED_OUT") &&
                (s("error"), n(null));
          }),
        () => {
          try {
            i.removeChannel(a);
          } catch {}
        }
      );
    }, [t]),
    { count: e, status: r }
  );
}
function qw({ onAir: t, onHelp: e }) {
  const { count: n, status: r } = Kw(ie.SHOW_PRESENCE_COUNTER),
    s = r === "live" && typeof n == "number";
  return w.jsxs("header", {
    className: "topbar",
    children: [
      w.jsxs("div", {
        className: "brand",
        children: [
          w.jsx("span", {
            className: `brand__dot${t ? " is-live" : ""}`,
            "aria-hidden": "true",
          }),
          w.jsx("span", { className: "brand__name", children: ie.SITE_NAME }),
        ],
      }),
      w.jsxs("div", {
        className: "topbar__right",
        children: [
          w.jsx(wy, {}),
          s &&
            w.jsxs("div", {
              className: "listeners",
              title: "People online right now",
              children: [
                w.jsx("span", {
                  className: "listeners__pip",
                  "aria-hidden": "true",
                }),
                w.jsx("span", { className: "listeners__num", children: n }),
                w.jsx("span", {
                  className: "listeners__label",
                  children: "online",
                }),
              ],
            }),
          w.jsx("button", {
            type: "button",
            className: "helpbtn",
            onClick: e,
            "aria-label": "Keyboard shortcuts",
            title: "Keyboard shortcuts",
            children: w.jsx(Oy, { className: "helpbtn__glyph" }),
          }),
        ],
      }),
    ],
  });
}
const Bd = ["hqdefault", "mqdefault"];
function Gw({ videoId: t, playing: e }) {
  const [n, r] = _.useState(0),
    [s, i] = _.useState(!1),
    [o, a] = _.useState(!1);
  _.useEffect(() => {
    (r(0), i(!1), a(!1));
  }, [t]);
  const l = t && !o;
  return w.jsxs("div", {
    className: `disc${e ? " is-playing" : ""}`,
    children: [
      w.jsxs("div", {
        className: "disc__spin",
        children: [
          l
            ? w.jsx("img", {
                className: `disc__img${s ? " is-loaded" : ""}`,
                src: `https://img.youtube.com/vi/${t}/${Bd[n]}.jpg`,
                alt: "",
                decoding: "async",
                onLoad: () => i(!0),
                onError: () => {
                  n < Bd.length - 1 ? r((u) => u + 1) : a(!0);
                },
              })
            : w.jsx("div", {
                className: "disc__placeholder",
                children: w.jsx(Cy, { className: "disc__placeholder-icon" }),
              }),
          w.jsx("div", { className: "disc__grooves", "aria-hidden": "true" }),
        ],
      }),
      w.jsx("div", { className: "disc__hole", "aria-hidden": "true" }),
    ],
  });
}
function xi(t) {
  const e = Math.max(0, Math.floor(t || 0)),
    n = Math.floor(e / 3600),
    r = Math.floor((e % 3600) / 60),
    s = String(e % 60).padStart(2, "0");
  return n > 0 ? `${n}:${String(r).padStart(2, "0")}:${s}` : `${r}:${s}`;
}
const Fd = [
    "digitally\\s*restored",
    "with\\s*lyrics",
    "music\\s*video",
    "lyric(?:al)?(?:\\s*video)?",
    "remaster(?:ed)?",
    "full",
    "official",
    "video",
    "audio",
    "songs?",
    "lyrics",
    "hd",
    "hq",
    "4k",
    "8k",
    "1080p?",
    "720p?",
  ].join("|"),
  Hu = `(?:${Fd})(?:\\s*[-–—/,&]?\\s*(?:${Fd}))*`,
  Jw = /\s*[([]\s*([^()[\]]*?)\s*[)\]]/g,
  Qw = new RegExp(`^${Hu}$`, "i"),
  Yw = new RegExp(`(?:\\s*[-–—:,]\\s*|\\s+)${Hu}\\s*$`, "i"),
  Xw = new RegExp(`^${Hu}\\s*[-–—:]\\s*`, "i");
function Up(t) {
  const e = String(t || "").trim();
  if (!e) return "";
  let n = e.split(/[|｜]/)[0].trim();
  (n.length < 3 && (n = e),
    (n = n.replace(Jw, (r, s) => (Qw.test(s) ? " " : r))));
  for (let r = 0; r < 4; r += 1) {
    const s = n.replace(Xw, "").replace(Yw, "");
    if (s === n) break;
    n = s;
  }
  return (
    (n = n
      .replace(/\s{2,}/g, " ")
      .replace(/^[\s"'“”‘’]+/, "")
      .replace(/[\s"'“”‘’,;:\-–—]+$/, "")
      .trim()),
    n.length >= 2 ? n : e
  );
}
function Mp(t) {
  const e = String(t || "").trim();
  return e
    ? e
        .replace(/\s*-\s*topic\s*$/i, "")
        .replace(/\s*vevo\s*$/i, "")
        .replace(/\s*\bofficial\b\s*$/i, "")
        .trim() || e
    : "";
}
function Zw({ current: t, duration: e, onSeek: n, disabled: r }) {
  const s = _.useRef(null),
    [i, o] = _.useState(!1),
    [a, l] = _.useState(0),
    u = e > 0 ? Math.min(1, Math.max(0, t / e)) : 0,
    d = i ? a : u,
    c = i ? a * e : t,
    h = _.useCallback((p) => {
      const f = s.current;
      if (!f) return 0;
      const m = f.getBoundingClientRect();
      return Math.min(1, Math.max(0, (p - m.left) / m.width));
    }, []),
    g = (p) => {
      r ||
        e <= 0 ||
        (p.preventDefault(),
        s.current.setPointerCapture(p.pointerId),
        o(!0),
        l(h(p.clientX)));
    },
    y = (p) => {
      i && l(h(p.clientX));
    },
    v = (p) => {
      if (!i) return;
      const f = h(p.clientX);
      o(!1);
      try {
        s.current.releasePointerCapture(p.pointerId);
      } catch {}
      n(f * e);
    },
    k = (p) => {
      if (r || e <= 0) return;
      let f = null;
      (p.key === "ArrowRight" || p.key === "ArrowUp"
        ? (f = Math.min(e, t + 5))
        : p.key === "ArrowLeft" || p.key === "ArrowDown"
          ? (f = Math.max(0, t - 5))
          : p.key === "Home"
            ? (f = 0)
            : p.key === "End" && (f = Math.max(0, e - 1)),
        f !== null && (p.preventDefault(), p.stopPropagation(), n(f)));
    };
  return (
    _.useEffect(() => {
      if (!i) return;
      const p = () => o(!1);
      return (
        window.addEventListener("pointercancel", p),
        () => window.removeEventListener("pointercancel", p)
      );
    }, [i]),
    w.jsxs("div", {
      className: "progress",
      children: [
        w.jsx("span", {
          className: "progress__time progress__time--now",
          children: xi(c),
        }),
        w.jsx("div", {
          ref: s,
          className: `progress__hit${i ? " is-dragging" : ""}`,
          role: "slider",
          tabIndex: r ? -1 : 0,
          "aria-label": "Seek through track",
          "aria-valuemin": 0,
          "aria-valuemax": Math.floor(e) || 0,
          "aria-valuenow": Math.floor(c) || 0,
          "aria-valuetext": `${xi(c)} of ${xi(e)}`,
          "aria-disabled": r || e <= 0,
          onPointerDown: g,
          onPointerMove: y,
          onPointerUp: v,
          onKeyDown: k,
          children: w.jsxs("div", {
            className: "progress__track",
            children: [
              w.jsx("div", {
                className: "progress__fill",
                style: { width: `${d * 100}%` },
              }),
              w.jsx("div", {
                className: "progress__knob",
                style: { left: `${d * 100}%` },
              }),
            ],
          }),
        }),
        w.jsx("span", {
          className: "progress__time progress__time--total",
          children: xi(e),
        }),
      ],
    })
  );
}
function e_({ player: t, onBlock: e, tuner: n }) {
  const {
      ready: r,
      playing: s,
      buffering: i,
      started: o,
      fatal: a,
      track: l,
      progress: u,
      volume: d,
      muted: c,
      lockedOut: h,
      favourites: g,
      toggleFavourite: y,
      toggle: v,
      next: k,
      prev: p,
      seek: f,
      changeVolume: m,
      toggleMute: S,
    } = t,
    C = !!l.videoId && o;
  let E = ie.SITE_NAME,
    T = ie.TAGLINE,
    x = "";
  a
    ? ((E = a.title), (T = a.detail))
    : r
      ? C && l.title
        ? ((E = Up(l.title)),
          (T = Mp(l.author) || "Unknown artist"),
          (x = l.title))
        : C
          ? ((E = "Loading…"), (T = "reading track details"))
          : (T = "press play to start")
      : ((E = "Tuning in…"), (T = "connecting to the station"));
  const M = !r || !!a,
    P = i && !s,
    I = M || !!h,
    K = C && g.has(l.videoId),
    G = C ? `https://www.youtube.com/watch?v=${l.videoId}` : null;
  return w.jsxs("section", {
    className: "panel",
    "aria-label": "Music player",
    children: [
      n,
      w.jsxs("div", {
        className: "panel__card",
        children: [
          w.jsxs("div", {
            className: "panel__head",
            children: [
              w.jsx(Gw, { videoId: C ? l.videoId : null, playing: s }),
              w.jsxs("div", {
                className: "panel__meta",
                children: [
                  w.jsx("p", {
                    className: "panel__eyebrow",
                    children: C
                      ? w.jsxs(w.Fragment, {
                          children: [
                            w.jsx("span", {
                              className: `dot${s ? " is-live" : ""}`,
                              "aria-hidden": "true",
                            }),
                            "Now playing",
                          ],
                        })
                      : ie.SITE_NAME,
                  }),
                  w.jsx("h2", {
                    className: "panel__title",
                    title: x || E,
                    children: G
                      ? w.jsxs("a", {
                          className: "panel__link",
                          href: G,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          "aria-label": `Open ${E} on YouTube`,
                          children: [
                            E,
                            w.jsx(jy, { className: "panel__linkicon" }),
                          ],
                        })
                      : E,
                  }),
                  w.jsx("p", {
                    className: "panel__artist",
                    title: T,
                    children: T,
                  }),
                ],
              }),
            ],
          }),
          w.jsx(Zw, {
            current: u.current,
            duration: u.duration,
            onSeek: f,
            disabled: I || !C,
          }),
          w.jsxs("div", {
            className: "panel__controls",
            children: [
              w.jsxs("div", {
                className: "panel__side",
                children: [
                  w.jsx("button", {
                    type: "button",
                    className: `iconbtn iconbtn--fav${K ? " is-on" : ""}`,
                    onClick: () => y(l.videoId),
                    disabled: M || !C,
                    "aria-pressed": K,
                    "aria-label": K
                      ? "Remove from favourites"
                      : "Save to favourites",
                    title: K ? "Loved" : "Love this song",
                    children: K
                      ? w.jsx(xy, { className: "iconbtn__glyph" })
                      : w.jsx(Ry, { className: "iconbtn__glyph" }),
                  }),
                  w.jsx("button", {
                    type: "button",
                    className: "iconbtn iconbtn--ban",
                    onClick: e,
                    disabled: M || !C,
                    "aria-label": "Never play this song again",
                    title: "Never play this again",
                    children: w.jsx(Ay, { className: "iconbtn__glyph" }),
                  }),
                ],
              }),
              w.jsxs("div", {
                className: "panel__transport",
                children: [
                  w.jsx("button", {
                    type: "button",
                    className: "iconbtn iconbtn--lg",
                    onClick: p,
                    disabled: I,
                    "aria-label": "Previous track",
                    title: "Previous",
                    children: w.jsx(Sy, { className: "iconbtn__glyph" }),
                  }),
                  w.jsxs("button", {
                    type: "button",
                    className: `playbtn${o ? "" : " is-inviting"}`,
                    onClick: v,
                    disabled: I,
                    "aria-label": s ? "Pause" : "Play",
                    title: s ? "Pause" : "Play",
                    children: [
                      P &&
                        w.jsx("span", {
                          className: "playbtn__spinner",
                          "aria-hidden": "true",
                        }),
                      s
                        ? w.jsx(ky, { className: "playbtn__glyph" })
                        : w.jsx(_y, { className: "playbtn__glyph" }),
                    ],
                  }),
                  w.jsx("button", {
                    type: "button",
                    className: "iconbtn iconbtn--lg",
                    onClick: k,
                    disabled: I,
                    "aria-label": "Next track",
                    title: "Next",
                    children: w.jsx(Ey, { className: "iconbtn__glyph" }),
                  }),
                ],
              }),
              w.jsxs("div", {
                className: "panel__side panel__side--right",
                children: [
                  w.jsx("button", {
                    type: "button",
                    className: "iconbtn",
                    onClick: S,
                    disabled: M,
                    "aria-pressed": c,
                    "aria-label": c ? "Unmute" : "Mute",
                    title: c ? "Unmute" : "Mute",
                    children: c
                      ? w.jsx(Ty, { className: "iconbtn__glyph" })
                      : w.jsx(by, { className: "iconbtn__glyph" }),
                  }),
                  w.jsx("input", {
                    className: "volume",
                    type: "range",
                    min: "0",
                    max: "100",
                    step: "1",
                    value: c ? 0 : d,
                    onChange: (le) => m(Number(le.target.value)),
                    disabled: M,
                    "aria-label": "Volume",
                    style: { "--pct": `${c ? 0 : d}%` },
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const t_ = 1400;
function n_({ videoId: t }) {
  const [e, n] = _.useState([]);
  return (
    _.useEffect(() => {
      if (!t) return;
      n((s) => (s[s.length - 1] === t ? s : [...s, t].slice(-2)));
      const r = setTimeout(() => n((s) => s.slice(-1)), t_);
      return () => clearTimeout(r);
    }, [t]),
    e.length
      ? w.jsx("div", {
          className: "bleed",
          "aria-hidden": "true",
          children: e.map((r) =>
            w.jsx(
              "img",
              {
                className: "bleed__img",
                src: `https://img.youtube.com/vi/${r}/hqdefault.jpg`,
                alt: "",
                decoding: "async",
                loading: "eager",
              },
              r,
            ),
          ),
        })
      : null
  );
}
const Fl = "23456789ABCDEFGHJKMNPQRSTUVWXYZ",
  zl = 6;
function r_() {
  const t = new Uint8Array(zl);
  crypto.getRandomValues(t);
  let e = "";
  for (let n = 0; n < zl; n += 1) e += Fl[t[n] % Fl.length];
  return e;
}
function Co(t) {
  let e = String(t || "")
    .trim()
    .toUpperCase();
  const n = e.indexOf("ROOM=");
  n !== -1 && (e = e.slice(n + 5).split("&")[0]);
  const r = e.replace(/[^A-Z0-9]/g, "");
  return r.length !== zl ? "" : [...r].every((s) => Fl.includes(s)) ? r : "";
}
function s_(t) {
  return `listening-room:${t}`;
}
const Hl = "vibe-room-fm:room";
function i_() {
  try {
    const t = new URL(window.location.href),
      e = t.searchParams.get("room");
    return e
      ? (t.searchParams.delete("room"),
        window.history.replaceState(null, "", t.toString()),
        Co(e))
      : "";
  } catch {
    return "";
  }
}
function Pa(t) {
  try {
    t ? sessionStorage.setItem(Hl, t) : sessionStorage.removeItem(Hl);
  } catch {}
}
function o_() {
  try {
    return Co(sessionStorage.getItem(Hl) || "");
  } catch {
    return "";
  }
}
const Bp = "vibe-room-fm:";
function Ys(t, e) {
  try {
    const n = localStorage.getItem(Bp + t);
    return n === null ? e : JSON.parse(n);
  } catch {
    return e;
  }
}
function Or(t, e) {
  try {
    localStorage.setItem(Bp + t, JSON.stringify(e));
  } catch {}
}
const a_ = [
    "Disco",
    "Masala",
    "Filmi",
    "Chai",
    "Monsoon",
    "Neon",
    "Velvet",
    "Midnight",
    "Golden",
    "Turbo",
    "Bombay",
    "Vibe Room",
    "Cassette",
    "Jhakaas",
    "Bindaas",
    "Dhinchak",
    "Mixtape",
    "Qawwali",
    "Rooftop",
    "Tinsel",
    "Pocket",
    "Highway",
  ],
  l_ = [
    "Dancer",
    "Bandit",
    "Pilot",
    "Nomad",
    "Tiger",
    "Sparrow",
    "Rocket",
    "Dhol",
    "Sitar",
    "Toofan",
    "Junoon",
    "Legend",
    "Comet",
    "Bulbul",
    "Tabla",
    "Jukebox",
    "Cyclone",
    "Maestro",
    "Auto",
    "Firefly",
    "Chaiwala",
    "Cricket",
  ],
  Fp = 18,
  zd = (t) => t[Math.floor(Math.random() * t.length)];
function Vu() {
  return `${zd(a_)} ${zd(l_)}`;
}
function $n(t) {
  return String(t || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, Fp);
}
function Na() {
  return $n(Ys("name", "")) || Vu();
}
function u_(t) {
  const e = $n(t);
  return (e && Or("name", e), e);
}
function c_(t) {
  const e = `${window.location.origin}./`;
  return [
    `Join me on ${ie.SITE_NAME} — we'll be on the same song at the same second.`,
    e,
    `Press "Join one" and enter the key: ${t}`,
  ].join(`
`);
}
function d_({ room: t }) {
  const {
      active: e,
      roomKey: n,
      status: r,
      roster: s,
      members: i,
      selfId: o,
      invite: a,
      isDj: l,
      lockedBy: u,
      lockedOut: d,
      toggleLock: c,
      sendReaction: h,
      create: g,
      join: y,
      leave: v,
    } = t,
    k = (Array.isArray(ie.REACTIONS) ? ie.REACTIONS : []).slice(0, 10),
    [p, f] = _.useState(null),
    [m, S] = _.useState(""),
    [C, E] = _.useState(""),
    [T, x] = _.useState(!1),
    [M, P] = _.useState(!1),
    I = _.useRef(null),
    K = _.useRef(null);
  if (
    (_.useEffect(() => {
      a && !e && (E(a), S(Na()), f("join"));
    }, [a, e]),
    _.useEffect(() => {
      var O, D;
      p &&
        (p === "join" && !C
          ? (O = K.current) == null || O.focus()
          : (D = I.current) == null || D.select());
    }, [p]),
    _.useEffect(() => {
      if (!T) return;
      const O = setTimeout(() => x(!1), 1600);
      return () => clearTimeout(O);
    }, [T]),
    _.useEffect(() => {
      e || P(!1);
    }, [e]),
    r === "unconfigured")
  )
    return null;
  const G = () => {
      (S(Na()), f("create"));
    },
    le = () => {
      (S(Na()), E(""), f("join"));
    },
    an = () => {
      (f(null), E(""));
    },
    vt = (O) => {
      (O.preventDefault(), g(m), f(null));
    },
    be = (O) => {
      O.preventDefault();
      const D = Co(C);
      D && (y(D, m), f(null), E(""));
    },
    N = async () => {
      try {
        (await navigator.clipboard.writeText(c_(n)), x(!0));
      } catch {}
    };
  if (e)
    return w.jsxs(w.Fragment, {
      children: [
        w.jsxs("div", {
          className: "roombar",
          role: "status",
          children: [
            w.jsx("span", {
              className: `roombar__pip${r === "live" ? " is-live" : ""}`,
              "aria-hidden": "true",
            }),
            w.jsx("button", {
              type: "button",
              className: `roombar__key${T ? " is-copied" : ""}`,
              onClick: N,
              title: "Copy an invite to send",
              "aria-label": `Room ${n.split("").join(" ")}. Copy an invite to send.`,
              children: T ? "invite copied" : n,
            }),
            w.jsx("button", {
              type: "button",
              className: `roombar__count${M ? " is-open" : ""}`,
              onClick: () => P((O) => !O),
              disabled: r !== "live",
              "aria-expanded": M,
              title: M ? "Hide who's here" : "See who's here",
              children:
                r === "live"
                  ? `${i} ${i === 1 ? "person" : "people"}`
                  : "connecting…",
            }),
            d
              ? w.jsx("span", {
                  className: "roombar__locked",
                  title: "Someone else is picking the music",
                  children: "DJ mode",
                })
              : w.jsx("button", {
                  type: "button",
                  className: `roombar__lock${l ? " is-on" : ""}`,
                  onClick: c,
                  "aria-pressed": l,
                  title: l
                    ? "Give everyone control again"
                    : "Take control of the music",
                  children: l ? "You're DJ" : "Take aux",
                }),
            w.jsx("button", {
              type: "button",
              className: "roombar__leave",
              onClick: v,
              children: "Leave",
            }),
          ],
        }),
        r === "live" &&
          k.length > 0 &&
          w.jsx("div", {
            className: "reactbar",
            role: "group",
            "aria-label": "React to this song",
            children: k.map((O, D) =>
              w.jsx(
                "button",
                {
                  type: "button",
                  className: "reactbtn",
                  onClick: () => h(O),
                  "aria-label": `React with ${O}`,
                  title: `Send ${O}  ·  key ${D + 1}`,
                  children: w.jsx("span", {
                    "aria-hidden": "true",
                    children: O,
                  }),
                },
                O,
              ),
            ),
          }),
        M &&
          r === "live" &&
          w.jsx("ul", {
            className: "people",
            "aria-label": "Who's in the room",
            children: s.map((O) =>
              w.jsxs(
                "li",
                {
                  className: "people__row",
                  children: [
                    w.jsx("span", {
                      className: "people__name",
                      children: O.name,
                    }),
                    O.id === o &&
                      w.jsx("span", {
                        className: "people__tag",
                        children: "you",
                      }),
                    O.id === u &&
                      w.jsx("span", {
                        className: "people__tag people__tag--dj",
                        children: "DJ",
                      }),
                  ],
                },
                O.id,
              ),
            ),
          }),
      ],
    });
  if (p) {
    const O = p === "join";
    return w.jsxs("form", {
      className: "roombar roombar--form",
      onSubmit: O ? be : vt,
      onKeyDown: (D) => {
        D.key === "Escape" && an();
      },
      children: [
        w.jsxs("div", {
          className: "roombar__field",
          children: [
            w.jsx("span", { className: "roombar__as", children: "as" }),
            w.jsx("input", {
              ref: I,
              className: "roombar__name",
              value: m,
              onChange: (D) => S(D.target.value),
              placeholder: "your name",
              maxLength: Fp,
              size: 12,
              autoComplete: "off",
              spellCheck: "false",
              "aria-label": "The name others in the room will see",
            }),
            w.jsx("button", {
              type: "button",
              className: "roombar__reroll",
              onClick: () => S(Vu()),
              "aria-label": "Pick another name",
              title: "Pick another name",
              children: w.jsx(Py, { className: "roombar__rerollglyph" }),
            }),
          ],
        }),
        O &&
          w.jsx("input", {
            ref: K,
            className: "roombar__input",
            value: C,
            onChange: (D) => E(D.target.value),
            placeholder: "room key",
            maxLength: 40,
            size: 9,
            autoComplete: "off",
            spellCheck: "false",
            "aria-label": "Room key",
          }),
        w.jsxs("div", {
          className: "roombar__actions",
          children: [
            w.jsx("button", {
              type: "submit",
              className: "roombar__go",
              disabled: O && !Co(C),
              children: O ? "Join" : "Start",
            }),
            w.jsx("button", {
              type: "button",
              className: "roombar__leave",
              onClick: an,
              children: "Cancel",
            }),
          ],
        }),
      ],
    });
  }
  return w.jsxs("div", {
    className: "roombar",
    children: [
      w.jsx("button", {
        type: "button",
        className: "roombar__go",
        onClick: G,
        children: "Start a room",
      }),
      w.jsx("button", {
        type: "button",
        className: "roombar__leave",
        onClick: le,
        children: "Join one",
      }),
    ],
  });
}
const h_ = 2800;
function f_({ notice: t }) {
  const [e, n] = _.useState(null);
  return (
    _.useEffect(() => {
      if (!t) return;
      n(t);
      const r = setTimeout(() => n(null), h_);
      return () => clearTimeout(r);
    }, [t]),
    e
      ? w.jsx(
          "p",
          { className: "notice", role: "status", children: e.text },
          e.id,
        )
      : null
  );
}
function ja(t, e = 0) {
  return ((((t + e * 97) * 2654435761) % 4294967296) >>> 0) / 4294967296;
}
function p_({ reactions: t }) {
  if (!t.length) return null;
  const e = t[t.length - 1],
    n = e.mine ? "" : `${e.name} reacted ${e.emoji}`;
  return w.jsxs(w.Fragment, {
    children: [
      w.jsx("p", {
        className: "sr-only",
        role: "status",
        "aria-live": "polite",
        children: n,
      }),
      w.jsx("div", {
        className: "reactions",
        "aria-hidden": "true",
        children: t.map((r) => {
          const s = ja(r.id),
            i = ja(r.id, 1),
            o = ja(r.id, 2);
          return w.jsxs(
            "div",
            {
              className: "reactions__item",
              style: {
                left: `${18 + s * 64}%`,
                "--drift": `${(i - 0.5) * 46}px`,
                "--scale": 0.9 + o * 0.35,
              },
              children: [
                w.jsx("span", {
                  className: "reactions__emoji",
                  children: r.emoji,
                }),
                w.jsx("span", {
                  className: "reactions__who",
                  children: r.mine ? "you" : r.name,
                }),
              ],
            },
            r.id,
          );
        }),
      }),
    ],
  });
}
const g_ = [
  [["space"], "Play / pause"],
  [["←", "→"], "Previous / next track"],
  [["↑", "↓"], "Volume"],
  [["M"], "Mute"],
  [["T"], "Next station on the dial"],
  [["L"], "Love this song"],
  [["X"], "Never play this again"],
  [["1–6"], "React, in a room"],
  [["?"], "This list"],
];
function m_({
  open: t,
  onClose: e,
  loved: n,
  banished: r,
  onClearBanished: s,
}) {
  return t
    ? w.jsx("div", {
        className: "sheet",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Keyboard shortcuts",
        onClick: e,
        children: w.jsxs("div", {
          className: "sheet__card",
          onClick: (i) => i.stopPropagation(),
          children: [
            w.jsxs("div", {
              className: "sheet__head",
              children: [
                w.jsx("h2", {
                  className: "sheet__title",
                  children: "Keyboard",
                }),
                w.jsx("button", {
                  type: "button",
                  className: "iconbtn",
                  onClick: e,
                  "aria-label": "Close",
                  title: "Close",
                  autoFocus: !0,
                  children: w.jsx(Ny, { className: "iconbtn__glyph" }),
                }),
              ],
            }),
            w.jsx("dl", {
              className: "sheet__list",
              children: g_.map(([i, o]) =>
                w.jsxs(
                  "div",
                  {
                    className: "sheet__row",
                    children: [
                      w.jsx("dt", {
                        className: "sheet__keys",
                        children: i.map((a) =>
                          w.jsx("kbd", { className: "key", children: a }, a),
                        ),
                      }),
                      w.jsx("dd", { className: "sheet__label", children: o }),
                    ],
                  },
                  o,
                ),
              ),
            }),
            w.jsx("p", {
              className: "sheet__foot",
              children:
                "The progress bar is drag-seekable, and arrow keys nudge it ±5s while it has focus. The dial takes the arrow keys too, once it has focus — drag it, or tap a station on the strip.",
            }),
            w.jsxs("p", {
              className: "sheet__foot",
              style: { marginTop: "1rem" },
              children: [
                "Connect with me on ",
                w.jsx("a", {
                  href: "https://www.linkedin.com/in/ashish827/",
                  target: "_blank",
                  rel: "noreferrer",
                  style: { color: "inherit", textDecoration: "underline" },
                  children: "LinkedIn",
                }),
                " and ",
                w.jsx("a", {
                  href: "https://www.instagram.com/ashish827",
                  target: "_blank",
                  rel: "noreferrer",
                  style: { color: "inherit", textDecoration: "underline" },
                  children: "Instagram",
                }),
              ],
            }),
            (n > 0 || r > 0) &&
              w.jsxs("div", {
                className: "sheet__station",
                children: [
                  w.jsxs("p", {
                    className: "sheet__foot",
                    children: [
                      n > 0 && `${n} loved`,
                      n > 0 && r > 0 && " · ",
                      r > 0 && `${r} banished`,
                      ", saved in this browser.",
                    ],
                  }),
                  r > 0 &&
                    w.jsx("button", {
                      type: "button",
                      className: "sheet__clear",
                      onClick: s,
                      children: "Un-banish all",
                    }),
                ],
              }),
          ],
        }),
      })
    : null;
}
const zp = 0.16,
  y_ = 2,
  Wu = 0.06;
let me = null,
  Ae = null,
  Ro = null,
  At = null,
  Vs = 0,
  Vl = 1,
  Ut = null;
function v_() {
  if (me) return me;
  const t = window.AudioContext || window.webkitAudioContext;
  if (!t) return null;
  try {
    me = new t();
  } catch {
    me = null;
  }
  return me;
}
function w_(t) {
  const e = Math.floor(t.sampleRate * y_),
    n = t.createBuffer(1, e, t.sampleRate),
    r = n.getChannelData(0);
  for (let s = 0; s < e; s += 1) r[s] = Math.random() * 2 - 1;
  return n;
}
function __(t) {
  if (Ro) return;
  const e = t.createBiquadFilter();
  ((e.type = "bandpass"), (e.frequency.value = 1400), (e.Q.value = 0.55));
  const n = t.createBiquadFilter();
  ((n.type = "highpass"),
    (n.frequency.value = 320),
    (At = t.createGain()),
    (At.gain.value = 0),
    e.connect(n),
    n.connect(At),
    At.connect(t.destination),
    (Ro = { band: e, floor: n, entry: e }));
}
function k_(t, e) {
  const n = Math.max(0, Math.min(100, Number(t) || 0));
  ((Vl = e ? 0 : n / 100),
    At && me && At.gain.setTargetAtTime(Vs * Vl * zp, me.currentTime, Wu));
}
function Hp() {
  const t = v_();
  if (
    t &&
    (Ut && (clearTimeout(Ut), (Ut = null)),
    __(t),
    t.state === "suspended" && t.resume().catch(() => {}),
    !Ae)
  )
    try {
      ((Ae = t.createBufferSource()),
        (Ae.buffer = w_(t)),
        (Ae.loop = !0),
        Ae.connect(Ro.entry),
        Ae.start());
    } catch {
      Ae = null;
    }
}
function Wl(t) {
  ((Vs = Math.max(0, Math.min(1, Number(t) || 0))),
    !(!At || !me) && At.gain.setTargetAtTime(Vs * Vl * zp, me.currentTime, Wu));
}
function Vp() {
  ((Vs = 0),
    !(!me || !At) &&
      (At.gain.setTargetAtTime(0, me.currentTime, Wu),
      Ut && clearTimeout(Ut),
      (Ut = setTimeout(() => {
        var t;
        Ut = null;
        try {
          Ae == null || Ae.stop();
        } catch {}
        try {
          Ae == null || Ae.disconnect();
        } catch {}
        ((Ae = null),
          (t = me == null ? void 0 : me.suspend) == null ||
            t.call(me).catch(() => {}));
      }, 420))));
}
function Kl(t = 260) {
  (Hp(), Wl(0.85), setTimeout(Vp, t));
}
function S_() {
  var t;
  Ut && (clearTimeout(Ut), (Ut = null));
  try {
    Ae == null || Ae.stop();
  } catch {}
  try {
    (t = me == null ? void 0 : me.close) == null || t.call(me);
  } catch {}
  ((me = null), (Ae = null), (Ro = null), (At = null), (Vs = 0));
}
const Xr = 108,
  Ai = (t, e, n) => Math.max(e, Math.min(n, t)),
  E_ = 0.85;
function b_({
  stations: t,
  stationId: e,
  onTune: n,
  duck: r,
  volume: s,
  muted: i,
  disabled: o,
  holdTrack: a,
}) {
  const l = _.useRef(null),
    u = _.useRef(null),
    d = Math.max(
      0,
      t.findIndex((P) => P.id === e),
    ),
    [c, h] = _.useState(d),
    [g, y] = _.useState(!1),
    v = _.useRef(c);
  v.current = c;
  const k = t.length - 1;
  (_.useEffect(() => {
    g || h(d);
  }, [d, g]),
    _.useEffect(() => {
      k_(s, i);
    }, [s, i]),
    _.useEffect(() => S_, []));
  const p = ie.TUNE_STATIC,
    f = _.useCallback(
      (P) => {
        const I = Math.min(1, Math.abs(P - Math.round(P)) * 2);
        (r == null || r(1 - I * E_), Wl(I));
      },
      [r, p],
    ),
    m = _.useCallback(
      (P, I) => {
        var le;
        const K = Ai(P, 0, k);
        (h(K),
          r == null || r(1),
          n((le = t[K]) == null ? void 0 : le.id, !a) && !I ? Kl() : Vp());
      },
      [k, r, n, t, a, p],
    ),
    S = (P) => {
      var I, K;
      if (!(o || k < 1)) {
        try {
          (K = (I = l.current) == null ? void 0 : I.setPointerCapture) ==
            null || K.call(I, P.pointerId);
        } catch {}
        ((u.current = { x: P.clientX, from: v.current, moved: !1 }),
          y(!0),
          Hp(),
          Wl(0));
      }
    },
    C = (P) => {
      const I = u.current;
      if (!I) return;
      const K = P.clientX - I.x;
      Math.abs(K) > 3 && (I.moved = !0);
      const G = Ai(I.from - K / Xr, 0, k);
      (h(G), f(G));
    },
    E = (P) => {
      var le;
      const I = u.current;
      if (!I) return;
      if (((u.current = null), y(!1), I.moved)) {
        m(Math.round(v.current), !0);
        return;
      }
      const K = (le = l.current) == null ? void 0 : le.getBoundingClientRect();
      if (!K) {
        m(Math.round(v.current), !1);
        return;
      }
      const G = (P.clientX - (K.left + K.width / 2)) / Xr;
      m(Math.round(v.current + G), !1);
    },
    T = (P) => {
      var G;
      const I = Ai(Math.round(v.current) + P, 0, k);
      if (I === Math.round(v.current)) return;
      (h(I),
        r == null || r(1),
        n((G = t[I]) == null ? void 0 : G.id, !a) && p && Kl());
    },
    x = (P) => {
      if (o || k < 1) return;
      let I = !0;
      switch (P.key) {
        case "ArrowRight":
          T(1);
          break;
        case "ArrowLeft":
          T(-1);
          break;
        case "Home":
          T(-t.length);
          break;
        case "End":
          T(t.length);
          break;
        default:
          I = !1;
      }
      I && (P.preventDefault(), P.stopPropagation());
    };
  if (t.length < 2) return null;
  const M = t[Math.round(Ai(c, 0, k))] || t[0];
  return w.jsxs("div", {
    className: `tuner${o ? " is-disabled" : ""}`,
    style: { "--slot": `${Xr}px` },
    children: [
      w.jsxs("div", {
        ref: l,
        className: `tuner__band${g ? " is-dragging" : ""}`,
        role: "slider",
        tabIndex: o ? -1 : 0,
        "aria-label": "Station dial",
        "aria-valuemin": 0,
        "aria-valuemax": k,
        "aria-valuenow": Math.round(c),
        "aria-valuetext": `${M.name}${M.freq ? `, ${M.freq} FM` : ""}`,
        "aria-disabled": o || void 0,
        onPointerDown: S,
        onPointerMove: C,
        onPointerUp: E,
        onPointerCancel: E,
        onKeyDown: x,
        title: a
          ? "Tune the dial — in a room it changes what you'd pick next"
          : "Drag to tune",
        children: [
          w.jsx("div", {
            className: "tuner__window",
            "aria-hidden": "true",
            children: w.jsx("div", {
              className: "tuner__strip",
              style: { transform: `translateX(${-(c * Xr + Xr / 2)}px)` },
              children: t.map((P) =>
                w.jsxs(
                  "div",
                  {
                    className: "tuner__stop",
                    children: [
                      w.jsx("span", {
                        className: "tuner__freq",
                        children: P.freq || "··",
                      }),
                      w.jsx("span", {
                        className: "tuner__name",
                        children: P.name,
                      }),
                    ],
                  },
                  P.id,
                ),
              ),
            }),
          }),
          w.jsx("div", { className: "tuner__needle", "aria-hidden": "true" }),
        ],
      }),
      a &&
        w.jsx("p", {
          className: "tuner__hint",
          children: "applies to your next pick",
        }),
    ],
  });
}
let Oi = null;
function T_() {
  return (
    Oi ||
    ((Oi = new Promise((t, e) => {
      if (window.YT && window.YT.Player) return t(window.YT);
      const n = setTimeout(
          () => e(new Error("YouTube API did not load")),
          15e3,
        ),
        r = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        (clearTimeout(n), typeof r == "function" && r(), t(window.YT));
      };
      const s = document.createElement("script");
      ((s.src = "https://www.youtube.com/iframe_api"),
        (s.async = !0),
        (s.onerror = () => {
          (clearTimeout(n), e(new Error("YouTube API blocked")));
        }),
        document.head.appendChild(s));
    })),
    Oi)
  );
}
function C_() {
  const t = window.location.protocol;
  return t === "http:" || t === "https:"
    ? { origin: window.location.origin }
    : {};
}
let Ie = null,
  ys = null;
function R_(t = 1) {
  const n = 8e3 * t,
    r = new ArrayBuffer(44 + n),
    s = new DataView(r),
    i = (o, a) => {
      for (let l = 0; l < a.length; l += 1) s.setUint8(o + l, a.charCodeAt(l));
    };
  return (
    i(0, "RIFF"),
    s.setUint32(4, 36 + n, !0),
    i(8, "WAVE"),
    i(12, "fmt "),
    s.setUint32(16, 16, !0),
    s.setUint16(20, 1, !0),
    s.setUint16(22, 1, !0),
    s.setUint32(24, 8e3, !0),
    s.setUint32(28, 8e3, !0),
    s.setUint16(32, 1, !0),
    s.setUint16(34, 8, !0),
    i(36, "data"),
    s.setUint32(40, n, !0),
    new Uint8Array(r, 44).fill(128),
    URL.createObjectURL(new Blob([r], { type: "audio/wav" }))
  );
}
function Ia() {
  typeof document > "u" ||
    (Ie ||
      ((ys = R_(1)),
      (Ie = document.createElement("audio")),
      (Ie.src = ys),
      (Ie.loop = !0),
      (Ie.volume = 1),
      (Ie.preload = "auto"),
      Ie.setAttribute("aria-hidden", "true"),
      (Ie.style.display = "none"),
      document.body.appendChild(Ie)),
    Ie.play().catch(() => {}));
}
function Wp() {
  try {
    Ie == null || Ie.pause();
  } catch {}
}
function x_() {
  Wp();
  try {
    Ie == null || Ie.remove();
  } catch {}
  (ys && URL.revokeObjectURL(ys), (Ie = null), (ys = null));
}
const Hd = "favourites",
  Vd = "blocked";
function Wd(t) {
  const e = Ys(t, []);
  return new Set(
    Array.isArray(e) ? e.filter((n) => typeof n == "string" && n) : [],
  );
}
function La(t, e) {
  const n = new Set(t);
  return (n.has(e) ? n.delete(e) : n.add(e), n);
}
function A_() {
  const [t, e] = _.useState(() => Wd(Hd)),
    [n, r] = _.useState(() => Wd(Vd));
  (_.useEffect(() => {
    Or(Hd, [...t]);
  }, [t]),
    _.useEffect(() => {
      Or(Vd, [...n]);
    }, [n]));
  const s = _.useCallback((a) => {
      a && (e((l) => La(l, a)), r((l) => (l.has(a) ? La(l, a) : l)));
    }, []),
    i = _.useCallback((a) => {
      a &&
        (r((l) => (l.has(a) ? l : new Set(l).add(a))),
        e((l) => (l.has(a) ? La(l, a) : l)));
    }, []),
    o = _.useCallback(() => r(new Set()), []);
  return {
    favourites: t,
    blocked: n,
    toggleFavourite: s,
    blockTrack: i,
    clearBlocked: o,
  };
}
const O_ = 400,
  P_ = 8,
  Pi = 150,
  N_ = 12e3,
  Kd = 1500,
  os = (t) => Math.max(0, Math.min(100, Math.round(Number(t))));
function j_() {
  const t = Ys("volume", ie.DEFAULT_VOLUME),
    e = os(t);
  return Number.isFinite(e) ? e : ie.DEFAULT_VOLUME;
}
function I_() {
  const t = Ys("station", null);
  return typeof t == "string" && t ? t : null;
}
function $a() { window.appConfig = ie;
  const t = Array.isArray(ie.STATIONS) ? ie.STATIONS : [],
    e = Array.isArray(ie.PLAYLIST_IDS) ? ie.PLAYLIST_IDS : [ie.PLAYLIST_IDS],
    n = t.length ? t : e.map((s) => ({ playlist: s })),
    r = new Set();
  return n
    .map((s) => ({
      playlist:
        typeof (s == null ? void 0 : s.playlist) == "string"
          ? s.playlist.trim()
          : typeof s == "string"
            ? s.trim()
            : "",
      name: (s == null ? void 0 : s.name) || "",
      freq: (s == null ? void 0 : s.freq) || "",
    }))
    .filter((s) => s.playlist)
    .map((s, i) => {
      let o = s.playlist;
      return (
        r.has(o) && (o = `${o}#${i}`),
        r.add(o),
        {
          id: o,
          playlist: s.playlist,
          name: s.name || `Station ${i + 1}`,
          freq: s.freq || "",
          count: null,
        }
      );
    });
}
function L_(t, e, n) {
  return new Promise((r) => {
    const s = new Map(),
      i = [],
      o = new Set();
    let a = 0;
    const l = () => ({ pools: s, merged: i }),
      u = () => {
        var h;
        try {
          return ((h = t.getPlaylist) == null ? void 0 : h.call(t)) || [];
        } catch {
          return [];
        }
      },
      d = () => {
        var h;
        try {
          return ((h = t.getPlaylistId) == null ? void 0 : h.call(t)) || null;
        } catch {
          return null;
        }
      },
      c = () => {
        if (n() || a >= e.length) {
          r(l());
          return;
        }
        const h = e[a],
          g = h.playlist,
          y = a === 0;
        a += 1;
        const v = u().join(",");
        let k = 0,
          p = Kd,
          f = !1;
        const m = () => {
          if (n()) {
            r(l());
            return;
          }
          const S = u(),
            C = d(),
            E = S.length > 0 && (S.join(",") !== v || g === (a > 1 ? e[a-2].playlist : ""));
          if (y ? S.length > 0 : E && (!C || C === g)) {
            const x = [],
              M = new Set();
            (S.forEach((P) => {
              !P ||
                M.has(P) ||
                (M.add(P), x.push(P), o.has(P) || (o.add(P), i.push(P)));
            }),
              s.set(h.id, x),
              c());
            return;
          }
          if (!y && ((p += Pi), p >= Kd)) {
            p = 0;
            try {
              ((window.activePlaylistId = g, console.log("[Station Changed] Playlist ID:", g), t.cuePlaylist({ list: g, listType: "playlist" })), (f = !1));
            } catch {
              if (f) {
                c();
                return;
              }
              f = !0;
            }
          }
          if (((k += Pi), k >= N_)) {
            c();
            return;
          }
          setTimeout(m, Pi);
        };
        setTimeout(m, Pi);
      };
    c();
  });
}
function $_(t) {
  const e = _.useRef(null),
    n = _.useRef(!1),
    r = _.useRef(0),
    s = _.useRef([]),
    i = _.useRef([]),
    o = _.useRef(new Map()),
    a = _.useRef(null),
    l = _.useRef(null),
    [u, d] = _.useState(!1),
    [c, h] = _.useState(!1),
    [g, y] = _.useState(!1),
    [v, k] = _.useState(!1),
    [p, f] = _.useState(null),
    [m, S] = _.useState({ videoId: null, title: "", author: "" }),
    [C, E] = _.useState({ current: 0, duration: 0 }),
    [T, x] = _.useState(j_),
    [M, P] = _.useState(() => Ys("muted", !1) === !0),
    [I, K] = _.useState($a),
    [G, le] = _.useState(() => {
      var H;
      const A = $a(),
        B = I_();
      return B && A.some((F) => F.id === B)
        ? B
        : ((H = A[0]) == null ? void 0 : H.id) || "";
    }),
    {
      favourites: an,
      blocked: vt,
      toggleFavourite: be,
      blockTrack: N,
      clearBlocked: O,
    } = A_(),
    D = _.useRef(T);
  D.current = T;
  const W = _.useRef(M);
  W.current = M;
  const Q = _.useRef(G);
  Q.current = G;
  const qe = _.useRef(1),
    ut = ie.START_SHUFFLED;
  (_.useEffect(() => {
    let A = !1,
      B = null;
    const H = $a();
    if (!H.length) {
      f({
        title: "No station configured",
        detail: "Add an entry to STATIONS in src/config.js.",
      });
      return;
    }
    return (
      T_()
        .then((F) => {
          if (A || !t.current) return;
          const he = document.createElement("div");
          (t.current.appendChild(he),
            (window.ytPlayer = B = new F.Player(he, {
              host: "https://www.youtube-nocookie.com",
              playerVars: {
                listType: "playlist",
                list: H[0].playlist,
                autoplay: 0,
                controls: 0,
                playsinline: 1,
                rel: 0,
                modestbranding: 1,
                iv_load_policy: 3,
                disablekb: 1,
                ...C_(),
              },
              events: {
                onReady: () => {
                  if (!A) {
                    e.current = B;
                    try {
                      (B.setVolume(D.current), W.current && B.mute());
                    } catch {}
                    L_(B, H, () => A).then(({ pools: fe, merged: Ce }) => {
                      if (A) return;
                      (Ce.length && (s.current = Ce), (o.current = fe));
                      const De = H.filter(
                        (ee) => (fe.get(ee.id) || []).length > 0,
                      ).map((ee) => ({ ...ee, count: fe.get(ee.id).length }));
                      (K(De.length ? De : H),
                        De.length &&
                          !De.some((ee) => ee.id === Q.current) &&
                          ((Q.current = De[0].id), le(De[0].id)),
                        d(!0));
                    });
                  }
                },
                onStateChange: (fe) => {
                  var De;
                  if (A) return;
                  const Ce = F.PlayerState;
                  switch (fe.data) {
                    case Ce.PLAYING:
                      ((r.current = 0), h(!0), y(!1));
                      break;
                    case Ce.BUFFERING:
                      y(!0);
                      break;
                    case Ce.PAUSED: if(document.hidden){if(!window.__ytResumeInterval){window.__ytResumeInterval=setInterval(()=>{if(document.hidden&&fe.target.getPlayerState()===2){fe.target.playVideo();}else if(!document.hidden){clearInterval(window.__ytResumeInterval);window.__ytResumeInterval=null;}}, 500);}} (h(!1), y(!1)); break;
                    case Ce.ENDED:
                      (y(!0),
                        a.current
                          ? a.current()
                          : (De = l.current) == null || De.call(l));
                      break;
                  }
                },
                onError: (fe) => {
                  if (!A) {
                    if (((r.current += 1), r.current > P_)) {
                      f({
                        title: "Nothing playable here",
                        detail:
                          "Too many tracks in a row couldn't be embedded.",
                      });
                      return;
                    }
                    setTimeout(() => {
                      var Ce;
                      try {
                        (Ce = l.current) == null || Ce.call(l);
                      } catch {}
                    }, 700);
                  }
                },
              },
            })));
        })
        .catch((F) => {
          A ||
            f({
              title: "Can't reach YouTube",
              detail: F.message || "The player script didn't load.",
            });
        }),
      () => {
        var F;
        A = !0;
        try {
          (F = B == null ? void 0 : B.destroy) == null || F.call(B);
        } catch {}
        (t.current && (t.current.innerHTML = ""), (e.current = null));
      }
    );
  }, [t]),
    _.useEffect(() => {
      if (!u) return;
      const A = () => {
          var he, fe, Ce, De;
          const F = e.current;
          if (F) {
            if (!s.current.length)
              try {
                const ee = (he = F.getPlaylist) == null ? void 0 : he.call(F);
                Array.isArray(ee) && ee.length && (s.current = ee);
              } catch {}
            try {
              const ee =
                  ((fe = F.getCurrentTime) == null ? void 0 : fe.call(F)) || 0,
                Ht = ((Ce = F.getDuration) == null ? void 0 : Ce.call(F)) || 0;
              E((ln) =>
                ln.current === ee && ln.duration === Ht
                  ? ln
                  : { current: ee, duration: Ht },
              );
            } catch {}
            try {
              const ee = (De = F.getVideoData) == null ? void 0 : De.call(F);
              if (ee != null && ee.video_id) {
                const Ht = (ee.title || "").trim(),
                  ln = (ee.author || "").trim();
                S((tr) =>
                  tr.videoId === ee.video_id &&
                  ((tr.title === Ht && tr.author === ln) || (!Ht && tr.title))
                    ? tr
                    : { videoId: ee.video_id, title: Ht, author: ln },
                );
              }
            } catch {}
          }
        },
        B = setInterval(A, O_),
        H = () => {
          document.hidden || A();
        };
      return (
        document.addEventListener("visibilitychange", H),
        window.addEventListener("focus", H),
        () => {
          (clearInterval(B),
            document.removeEventListener("visibilitychange", H),
            window.removeEventListener("focus", H));
        }
      );
    }, [u]),
    _.useEffect(() => x_, []));
  const Z = _.useCallback((A) => {
      const B = e.current;
      if (B)
        try {
          A(B);
        } catch {}
    }, []),
    ve = _.useCallback(
      (A, B = 0, H = !0) => {
        if (!A) return;
        ((n.current = !0), k(!0), Ia());
        const F = i.current;
        (F[F.length - 1] !== A && F.push(A),
          Z((he) =>
            H
              ? he.loadVideoById({ videoId: A, startSeconds: B })
              : he.cueVideoById({ videoId: A, startSeconds: B }),
          ));
      },
      [Z],
    ),
    wt = _.useCallback(() => {
      var A, B, H;
      try {
        return (
          ((H =
            (B = (A = e.current) == null ? void 0 : A.getVideoData) == null
              ? void 0
              : B.call(A)) == null
            ? void 0
            : H.video_id) || null
        );
      } catch {
        return null;
      }
    }, []),
    Xs = _.useCallback(() => {
      const A = o.current.get(Q.current) || [];
      return A.length ? A : s.current;
    }, []),
    zt = _.useCallback(
      (A, B) => {
        if (!A.length) return null;
        const H = A.filter((fe) => !vt.has(fe)),
          F = H.length ? H : A;
        let he = B;
        for (let fe = 0; fe < 8 && he === B; fe += 1)
          he = F[Math.floor(Math.random() * F.length)];
        return he;
      },
      [ut, vt],
    ),
    ct = _.useCallback(() => zt(Xs(), wt()), [zt, Xs, wt]),
    Yn = _.useCallback(() => {
      const A = i.current;
      return A.length < 2 ? null : (A.pop(), A[A.length - 1]);
    }, []),
    Xn = _.useCallback(() => {
      (Ia(),
        Z((A) => {
          if (!n.current) {
            ((n.current = !0), k(!0));
            const B = ct();
            if (B) {
              ve(B, 0, !0);
              return;
            }
          }
          A.playVideo();
        }));
    }, [Z, ve, ct]),
    Zn = _.useCallback(() => {
      (Wp(), Z((A) => A.pauseVideo()));
    }, [Z]),
    Zs = _.useCallback(() => {
      c ? Zn() : Xn();
    }, [c, Xn, Zn]),
    ei = _.useCallback(() => {
      const A = ct();
      if (A) {
        ve(A, 0, !0);
        return;
      }
      ((n.current = !0), k(!0), Ia(), Z((B) => B.nextVideo()));
    }, [Z, ve, ct]),
    Go = _.useCallback(() => {
      const A = Yn();
      if (A) {
        ve(A, 0, !0);
        return;
      }
      const B = ct();
      if (B) {
        ve(B, 0, !0);
        return;
      }
      Z((H) => H.previousVideo());
    }, [Z, ve, ct, Yn]);
  l.current = ei;
  const Jo = _.useCallback((A) => Z((B) => B.seekTo(A, !0)), [Z]),
    b = _.useRef(I);
  b.current = I;
  const L = _.useCallback(() => {
      Z((A) => A.setVolume(os(D.current * qe.current)));
    }, [Z]),
    J = _.useCallback(
      (A) => {
        const B = Math.max(0, Math.min(1, Number(A) || 0)),
          H = Math.round(B * 50) / 50;
        H !== qe.current && ((qe.current = H), L());
      },
      [L],
    ),
    Y = _.useRef(null),
    _t = _.useCallback((A, B) => {
      Y.current && clearInterval(Y.current);
      let H = 0;
      Y.current = setInterval(() => {
        var De, ee, Ht;
        H += 250;
        const F = e.current;
        let he = null,
          fe = 0;
        try {
          ((he =
            ((ee =
              (De = F == null ? void 0 : F.getVideoData) == null
                ? void 0
                : De.call(F)) == null
              ? void 0
              : ee.video_id) || null),
            (fe =
              ((Ht = F == null ? void 0 : F.getDuration) == null
                ? void 0
                : Ht.call(F)) || 0));
        } catch {}
        const Ce = () => {
          (clearInterval(Y.current), (Y.current = null));
        };
        if (he === B && fe > 0) {
          if ((Ce(), A > fe - 45))
            try {
              F.seekTo(Math.max(0, fe * 0.12), !0);
            } catch {}
          return;
        }
        H >= 4e3 && Ce();
      }, 250);
    }, []);
  _.useEffect(
    () => () => {
      Y.current && clearInterval(Y.current);
    },
    [],
  );
  const Pe = _.useCallback(
      (A, B = !0) => {
        if (!A || !b.current.some((Ce) => Ce.id === A)) return !1;
        const H = A !== Q.current;
        if (((Q.current = A), le(A), Or("station", A), !H || !B)) return H;
        const F = o.current.get(A) || [],
          he = zt(F.length ? F : s.current, wt());
        return (he && ve(he, 0, !0), !0);
      },
      [zt, wt, ve, _t],
    ),
    re = _.useCallback(() => {
      var B, H, F, he;
      const A = e.current;
      if (!A) return null;
      try {
        return {
          videoId:
            ((H = (B = A.getVideoData) == null ? void 0 : B.call(A)) == null
              ? void 0
              : H.video_id) || null,
          position: ((F = A.getCurrentTime) == null ? void 0 : F.call(A)) || 0,
          playing:
            ((he = A.getPlayerState) == null ? void 0 : he.call(A)) === 1,
        };
      } catch {
        return null;
      }
    }, []),
    ti = _.useCallback(() => s.current, []),
    ke = _.useCallback((A) => {
      a.current = A || null;
    }, []),
    Te = _.useCallback((A, B) => {
      (Or("volume", A), Or("muted", B));
    }, []),
    er = _.useCallback(
      (A) => {
        const B = os(A);
        x(B);
        const H = B === 0;
        (P(H),
          Te(B, H),
          Z((F) => {
            (F.setVolume(os(B * qe.current)), H ? F.mute() : F.unMute());
          }));
      },
      [Z, Te],
    ),
    ni = _.useCallback(() => {
      Z((A) => {
        if (M) {
          A.unMute();
          const B = T === 0 ? 40 : T;
          (T === 0 && (x(40), A.setVolume(os(40 * qe.current))),
            P(!1),
            Te(B, !1));
        } else (A.mute(), P(!0), Te(T, !0));
      });
    }, [Z, M, T, Te]);
  return {
    ready: u,
    playing: c,
    buffering: g,
    started: v,
    fatal: p,
    track: m,
    progress: C,
    volume: T,
    muted: M,
    toggle: Zs,
    play: Xn,
    pause: Zn,
    next: ei,
    prev: Go,
    seek: Jo,
    changeVolume: er,
    toggleMute: ni,
    loadTrack: ve,
    getSnapshot: re,
    getPlaylist: ti,
    nextTrackId: ct,
    stepBack: Yn,
    setEndedHandler: ke,
    favourites: an,
    blocked: vt,
    toggleFavourite: be,
    blockTrack: N,
    clearBlocked: O,
    stations: I,
    stationId: G,
    tuneTo: Pe,
    duckMusic: J,
  };
}
const qd = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"];
function D_(t, e) {
  const [n, r] = _.useState(!1);
  return (
    _.useEffect(() => {
      if (!t || !e) {
        r(!1);
        return;
      }
      let s;
      const i = () => {
          s = setTimeout(function a() {
            const l = document.activeElement;
            if (
              l &&
              typeof l.closest == "function" &&
              l.closest(".panel, .topbar, .roomstack")
            ) {
              s = setTimeout(a, e);
              return;
            }
            r(!0);
          }, e);
        },
        o = () => {
          (r(!1), clearTimeout(s), i());
        };
      return (
        qd.forEach((a) => window.addEventListener(a, o, { passive: !0 })),
        i(),
        () => {
          (clearTimeout(s),
            qd.forEach((a) => window.removeEventListener(a, o)));
        }
      );
    }, [t, e]),
    n
  );
}
function U_(t) {
  if (!t) return [];
  const e = (n) => `https://img.youtube.com/vi/${t}/${n}.jpg`;
  return [
    { src: e("default"), sizes: "120x90", type: "image/jpeg" },
    { src: e("mqdefault"), sizes: "320x180", type: "image/jpeg" },
    { src: e("hqdefault"), sizes: "480x360", type: "image/jpeg" },
    { src: e("maxresdefault"), sizes: "1280x720", type: "image/jpeg" },
  ];
}
function M_(t) {
  const {
      track: e,
      playing: n,
      progress: r,
      play: s,
      pause: i,
      next: o,
      prev: a,
      seek: l,
    } = t,
    { videoId: u, title: d, author: c } = e,
    { current: h, duration: g } = r;
  (_.useEffect(() => {
    if (
      !(
        !("mediaSession" in navigator) ||
        typeof window.MediaMetadata != "function"
      ) &&
      u
    )
      try {
        navigator.mediaSession.metadata = new window.MediaMetadata({
          title: d || ie.SITE_NAME,
          artist: c || ie.TAGLINE,
          album: ie.SITE_NAME,
          artwork: U_(u),
        });
      } catch {}
  }, [u, d, c]),
    _.useEffect(() => {
      if (!("mediaSession" in navigator)) return;
      const y = {
          play: s,
          pause: i,
          stop: i,
          nexttrack: o,
          previoustrack: a,
          seekbackward: (k) =>
            l(Math.max(0, h - ((k == null ? void 0 : k.seekOffset) || 10))),
          seekforward: (k) =>
            l(h + ((k == null ? void 0 : k.seekOffset) || 10)),
          seekto: (k) => {
            (k == null ? void 0 : k.seekTime) != null && l(k.seekTime);
          },
        },
        v = [];
      return (
        Object.entries(y).forEach(([k, p]) => {
          try {
            (navigator.mediaSession.setActionHandler(k, p), v.push(k));
          } catch {}
        }),
        () => {
          v.forEach((k) => {
            try {
              navigator.mediaSession.setActionHandler(k, null);
            } catch {}
          });
        }
      );
    }, [s, i, o, a, l, h]),
    _.useEffect(() => {
      "mediaSession" in navigator &&
        (navigator.mediaSession.playbackState = n ? "playing" : "paused");
    }, [n]),
    _.useEffect(() => {
      if (
        !(
          !("mediaSession" in navigator) ||
          !navigator.mediaSession.setPositionState
        ) &&
        !(!(g > 0) || h > g)
      )
        try {
          navigator.mediaSession.setPositionState({
            duration: g,
            position: Math.max(0, h),
            playbackRate: 1,
          });
        } catch {}
    }, [h, g]));
}
const Da = "sync",
  B_ = 2,
  F_ = 4e3,
  Gd = 1,
  z_ = 2600,
  Jd = 12,
  H_ = 300,
  Qd = 12;
function V_(t) {
  const [e, n] = _.useState(""),
    [r, s] = _.useState(() => (Bl() ? "off" : "unconfigured")),
    [i, o] = _.useState([]),
    [a, l] = _.useState(!1),
    [u, d] = _.useState(""),
    [c, h] = _.useState(null),
    [g, y] = _.useState(null),
    v = _.useRef(0),
    [k, p] = _.useState([]),
    f = _.useRef(0),
    m = _.useRef(new Set()),
    S = _.useRef(0),
    [C] = _.useState(() => i_() || o_()),
    E = Dp(),
    T = _.useRef(null),
    x = _.useRef(0),
    M = _.useRef(0),
    P = !!e && r !== "off",
    I = _.useRef(t);
  I.current = t;
  const K = _.useRef(!1);
  K.current = a;
  const G = _.useRef("");
  G.current = u;
  const le = _.useRef(null);
  le.current = c;
  const an = P && c === E,
    vt = P && c !== null && c !== E,
    be = _.useCallback((b) => {
      var L;
      (L = T.current) == null ||
        L.send({ type: "broadcast", event: Da, payload: b });
    }, []),
    N = _.useCallback(() => {
      var b, L;
      return (
        ((L = (b = I.current).getSnapshot) == null ? void 0 : L.call(b)) || null
      );
    }, []),
    O = _.useCallback(
      (b) => {
        ((x.current += 1),
          be({
            kind: "control",
            seq: x.current,
            actor: E,
            name: G.current,
            ...b,
          }));
      },
      [be, E],
    ),
    D = _.useCallback(
      (b) =>
        (...L) => {
          const J = le.current;
          (J && J !== E) || b(...L);
        },
      [E],
    ),
    W = _.useCallback((b) => {
      ((v.current += 1), y({ id: v.current, text: b }));
    }, []),
    Q = _.useCallback((b, L, J) => {
      f.current += 1;
      const Y = f.current;
      p((Pe) => {
        const re = [...Pe, { id: Y, emoji: b, name: L, mine: J }];
        return re.length > Jd ? re.slice(re.length - Jd) : re;
      });
      const _t = setTimeout(() => {
        (m.current.delete(_t), p((Pe) => Pe.filter((re) => re.id !== Y)));
      }, z_);
      m.current.add(_t);
    }, []);
  _.useEffect(
    () => () => {
      (m.current.forEach(clearTimeout), m.current.clear());
    },
    [],
  );
  const qe = _.useCallback(
      (b, L) => {
        var Pe;
        const J = I.current,
          Y = (Pe = J.getSnapshot) == null ? void 0 : Pe.call(J);
        if (!Y) return;
        if (!L) {
          const re = $n(b.name) || "Someone";
          b.videoId && b.videoId !== Y.videoId
            ? W(`${re} changed the track`)
            : b.playing && !Y.playing
              ? W(`${re} hit play`)
              : !b.playing && Y.playing
                ? W(`${re} paused`)
                : b.videoId &&
                  Math.abs(b.position - Y.position) > Gd &&
                  W(`${re} jumped ahead`);
        }
        if (b.videoId && b.videoId !== Y.videoId) {
          J.loadTrack(b.videoId, Math.max(0, b.position), b.playing);
          return;
        }
        if (!b.videoId) {
          b.playing && !Y.playing
            ? J.play()
            : !b.playing && Y.playing && J.pause();
          return;
        }
        const _t = Math.abs(b.position - Y.position);
        if (L) {
          const re = Date.now() - M.current > F_;
          _t > B_ &&
            re &&
            ((M.current = Date.now()), J.seek(Math.max(0, b.position)));
        } else
          _t > Gd &&
            ((M.current = Date.now()), J.seek(Math.max(0, b.position)));
        b.playing && !Y.playing
          ? J.play()
          : !b.playing && Y.playing && J.pause();
      },
      [W],
    ),
    ut = _.useCallback(
      (b) => {
        if (!(!b || b.actor === E)) {
          if (b.kind === "hello") {
            if (K.current) {
              const L = N();
              L != null &&
                L.videoId &&
                be({ kind: "beat", seq: x.current, actor: E, ...L });
            }
            return;
          }
          if (b.kind === "react") {
            const L = typeof b.emoji == "string" ? b.emoji.trim() : "";
            if (!L || L.length > Qd) return;
            Q(L, $n(b.name) || "Someone", !1);
            return;
          }
          if (b.kind === "lock") {
            if (b.seq < x.current || (b.seq === x.current && b.actor <= E))
              return;
            x.current = b.seq;
            const L = b.lockedBy ?? null;
            h(L);
            const J = $n(b.name) || "Someone";
            W(L ? `${J} took the aux` : `${J} handed the aux back`);
            return;
          }
          if (b.kind === "control") {
            const L = le.current;
            if (
              (L && b.actor !== L) ||
              b.seq < x.current ||
              (b.seq === x.current && b.actor <= E)
            )
              return;
            ((x.current = b.seq), qe(b, !1));
            return;
          }
          if (b.kind === "beat") {
            if (b.seq < x.current) return;
            (b.lockedBy !== void 0 && h(b.lockedBy), qe(b, !0));
          }
        }
      },
      [qe, W, E, be, N, Q],
    );
  (_.useEffect(() => {
    if (!e) return;
    const b = Bl();
    if (!b) {
      s("unconfigured");
      return;
    }
    s("connecting");
    let L = !1,
      J = new Map();
    const Y = b.channel(s_(e), { config: { presence: { key: E } } });
    T.current = Y;
    const _t = () => {
      const Pe = Y.presenceState(),
        re = Object.entries(Pe).map(([ke, Te]) => {
          var er, ni;
          return {
            id: ke,
            at:
              ((er = Te == null ? void 0 : Te[0]) == null
                ? void 0
                : er.joined_at) || "",
            name:
              $n(
                (ni = Te == null ? void 0 : Te[0]) == null ? void 0 : ni.name,
              ) || "Someone",
          };
        });
      (re.sort((ke, Te) =>
        ke.at === Te.at
          ? ke.id.localeCompare(Te.id)
          : ke.at.localeCompare(Te.at),
      ),
        o(re),
        l(re.length > 0 && re[0].id === E));
      const ti = le.current;
      (ti && !re.some((ke) => ke.id === ti) && h(null),
        L &&
          (re.forEach((ke) => {
            J.has(ke.id) || W(`${ke.name} joined`);
          }),
          J.forEach((ke, Te) => {
            re.some((er) => er.id === Te) || W(`${ke} left`);
          })),
        re.some((ke) => ke.id === E) && (L = !0),
        (J = new Map(re.map((ke) => [ke.id, ke.name]))));
    };
    return (
      Y.on("broadcast", { event: Da }, ({ payload: Pe }) => ut(Pe))
        .on("presence", { event: "sync" }, _t)
        .on("presence", { event: "join" }, _t)
        .on("presence", { event: "leave" }, _t)
        .subscribe(async (Pe) => {
          Pe === "SUBSCRIBED"
            ? (await Y.track({
                joined_at: new Date().toISOString(),
                name: G.current,
              }),
              s("live"),
              Y.send({
                type: "broadcast",
                event: Da,
                payload: { kind: "hello", actor: E },
              }))
            : (Pe === "CHANNEL_ERROR" || Pe === "TIMED_OUT") && s("error");
        }),
      () => {
        try {
          b.removeChannel(Y);
        } catch {}
        ((T.current = null),
          o([]),
          l(!1),
          h(null),
          y(null),
          m.current.forEach(clearTimeout),
          m.current.clear(),
          p([]),
          (x.current = 0));
      }
    );
  }, [e, E, ut, W]),
    _.useEffect(() => {
      if (r !== "live" || !a) return;
      const b = setInterval(() => {
        const L = N();
        L != null &&
          L.videoId &&
          be({
            kind: "beat",
            seq: x.current,
            actor: E,
            lockedBy: le.current,
            ...L,
          });
      }, ie.ROOM_SYNC_SECONDS * 1e3);
      return () => clearInterval(b);
    }, [r, a, be, E, N]));
  const Z = _.useCallback((b) => {
      const L = $n(b) || Vu();
      return (u_(L), d(L), L);
    }, []),
    ve = _.useCallback(
      (b) => {
        const L = r_();
        return (Z(b), I.current.play(), n(L), Pa(L), L);
      },
      [Z],
    ),
    wt = _.useCallback(
      (b, L) => {
        b && (Z(L), I.current.play(), n(b), Pa(b));
      },
      [Z],
    ),
    Xs = _.useCallback(() => {
      (n(""), s("off"), Pa(null));
    }, []),
    zt = _.useCallback(() => {
      I.current.play();
      const b = N();
      O({
        videoId: (b == null ? void 0 : b.videoId) || null,
        position: (b == null ? void 0 : b.position) || 0,
        playing: !0,
      });
    }, [O, N]),
    ct = _.useCallback(() => {
      I.current.pause();
      const b = N();
      O({
        videoId: (b == null ? void 0 : b.videoId) || null,
        position: (b == null ? void 0 : b.position) || 0,
        playing: !1,
      });
    }, [O, N]),
    Yn = _.useCallback(() => {
      var b;
      (b = N()) != null && b.playing ? ct() : zt();
    }, [N, zt, ct]),
    Xn = _.useCallback(() => {
      const b = I.current.nextTrackId();
      if (!b) {
        I.current.next();
        return;
      }
      (I.current.loadTrack(b, 0, !0),
        O({ videoId: b, position: 0, playing: !0 }));
    }, [O]),
    Zn = _.useCallback(() => {
      const b = I.current.stepBack() || I.current.nextTrackId();
      if (!b) {
        I.current.prev();
        return;
      }
      (I.current.loadTrack(b, 0, !0),
        O({ videoId: b, position: 0, playing: !0 }));
    }, [O]),
    Zs = _.useCallback(
      (b) => {
        I.current.seek(b);
        const L = N();
        O({
          videoId: (L == null ? void 0 : L.videoId) || null,
          position: b,
          playing: (L == null ? void 0 : L.playing) ?? !0,
        });
      },
      [O, N],
    );
  _.useEffect(() => {
    const b = I.current;
    if (!P) {
      b.setEndedHandler(null);
      return;
    }
    return (
      b.setEndedHandler(() => {
        const L = le.current;
        if (L ? L !== E : !K.current) return;
        const J = I.current.nextTrackId();
        J &&
          (I.current.loadTrack(J, 0, !0),
          O({ videoId: J, position: 0, playing: !0 }));
      }),
      () => b.setEndedHandler(null)
    );
  }, [P, O, E]);
  const ei = _.useCallback(() => {
      const b = le.current;
      if (b && b !== E) return;
      const L = b === E ? null : E;
      (h(L),
        (x.current += 1),
        be({
          kind: "lock",
          seq: x.current,
          actor: E,
          name: G.current,
          lockedBy: L,
        }));
    }, [be, E]),
    Go = _.useCallback(
      (b) => {
        const L = typeof b == "string" ? b.trim() : "";
        if (!L || L.length > Qd) return;
        const J = Date.now();
        J - S.current < H_ ||
          ((S.current = J),
          Q(L, G.current || "You", !0),
          be({ kind: "react", actor: E, name: G.current, emoji: L }));
      },
      [Q, be, E],
    ),
    Jo = _.useMemo(
      () => ({
        play: D(zt),
        pause: D(ct),
        toggle: D(Yn),
        next: D(Xn),
        prev: D(Zn),
        seek: D(Zs),
      }),
      [D, zt, ct, Yn, Xn, Zn, Zs],
    );
  return {
    active: P,
    roomKey: e,
    status: r,
    roster: i,
    members: i.length,
    name: u,
    selfId: E,
    invite: C,
    isDj: an,
    lockedBy: c,
    lockedOut: vt,
    notice: g,
    reactions: k,
    sendReaction: Go,
    locked: c !== null,
    toggleLock: ei,
    create: ve,
    join: wt,
    leave: Xs,
    actions: Jo,
  };
}
function W_() {
  const t = _.useRef(null),
    e = $_(t),
    n = V_(e),
    [r, s] = _.useState(!1),
    { active: i, sendReaction: o } = n,
    a = n.active ? { ...e, ...n.actions, lockedOut: n.lockedOut } : e;
  M_(a);
  const l = _.useCallback(() => {
      const c = e.track.videoId;
      c && (e.blockTrack(c), n.lockedOut || a.next());
    }, [e, n.lockedOut, a]),
    u = _.useCallback(() => {
      const { stations: c, stationId: h, tuneTo: g } = e;
      if (c.length < 2) return;
      const y = c.findIndex((k) => k.id === h),
        v = c[(y + 1) % c.length];
      g(v.id, !n.active) && ie.TUNE_STATIC && Kl();
    }, [e, n.active]),
    d = D_(e.playing && !r, ie.IDLE_HIDE_SECONDS * 1e3);
  return (
    _.useEffect(
      () => (
        document.body.classList.toggle("is-idle", d),
        () => document.body.classList.remove("is-idle")
      ),
      [d],
    ),
    _.useEffect(() => {
      const c = (h) => {
        var v;
        if (h.metaKey || h.ctrlKey || h.altKey) return;
        const g = h.target,
          y = g == null ? void 0 : g.tagName;
        if (
          !(
            y === "INPUT" ||
            y === "TEXTAREA" ||
            (g != null && g.isContentEditable)
          ) &&
          !(y === "BUTTON" && (h.key === " " || h.key === "Enter"))
        )
          switch (h.key) {
            case " ":
            case "Spacebar":
              (h.preventDefault(), a.toggle());
              break;
            case "ArrowRight":
              (h.preventDefault(), a.next());
              break;
            case "ArrowLeft":
              (h.preventDefault(), a.prev());
              break;
            case "ArrowUp":
              (h.preventDefault(), a.changeVolume(a.volume + 5));
              break;
            case "ArrowDown":
              (h.preventDefault(), a.changeVolume(a.volume - 5));
              break;
            case "m":
            case "M":
              a.toggleMute();
              break;
            case "l":
            case "L":
              a.toggleFavourite(a.track.videoId);
              break;
            case "x":
            case "X":
              l();
              break;
            case "t":
            case "T":
              u();
              break;
            case "?":
              s((k) => !k);
              break;
            case "Escape":
              s(!1);
              break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6": {
              if (!i) break;
              const k =
                (v = ie.REACTIONS) == null ? void 0 : v[Number(h.key) - 1];
              k && o(k);
              break;
            }
          }
      };
      return (
        window.addEventListener("keydown", c),
        () => window.removeEventListener("keydown", c)
      );
    }, [a, l, u, i, o]),
    w.jsxs(w.Fragment, {
      children: [
        w.jsxs("div", {
          className: "scene",
          "aria-hidden": "true",
          children: [
            w.jsx("video", {
              className: "scene__img",
              src: "./assets/bg2.mp4",
              poster: "./assets/poster.png",
              preload: "none",
              autoPlay: !0,
              loop: !0,
              muted: !0,
              playsInline: !0,
              style: { objectFit: "cover" },
            }),
            w.jsx(n_, { videoId: e.track.videoId }),
            w.jsx("div", { className: "scene__warmth" }),
            w.jsx("div", { className: "scene__vignette" }),
            w.jsx("div", { className: "scene__grain" }),
          ],
        }),
        w.jsx("div", {
          className: "player-host",
          children: w.jsx("div", { ref: t }),
        }),
        w.jsx(qw, { onAir: e.playing, onHelp: () => s(!0) }),
        w.jsxs("div", {
          className: "roomstack",
          children: [w.jsx(d_, { room: n }), w.jsx(f_, { notice: n.notice })],
        }),
        w.jsx(p_, { reactions: n.reactions }),
        w.jsx(e_, {
          player: a,
          onBlock: l,
          tuner: w.jsx(b_, {
            stations: e.stations,
            stationId: e.stationId,
            onTune: e.tuneTo,
            duck: e.duckMusic,
            volume: e.volume,
            muted: e.muted,
            disabled: !e.ready || !!e.fatal,
            holdTrack: n.active,
          }),
        }),
        w.jsx(m_, {
          open: r,
          onClose: () => s(!1),
          loved: e.favourites.size,
          banished: e.blocked.size,
          onClearBanished: e.clearBlocked,
        }),
        w.jsx("p", {
          className: "sr-only",
          role: "status",
          "aria-live": "polite",
          children: e.track.title
            ? `Now playing: ${Up(e.track.title)}${e.track.author ? ` by ${Mp(e.track.author)}` : ""}`
            : "",
        }),
      ],
    })
  );
}
cp(document.getElementById("root")).render(w.jsx(W_, {}));
