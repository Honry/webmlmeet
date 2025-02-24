(function() {
    /*

     Copyright The Closure Library Authors.
     SPDX-License-Identifier: Apache-2.0
    */
    'use strict';

    function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var p = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype) return a;
        a[b] = c.value;
        return a
    };

    function ba(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c
        }
        throw Error("Cannot find global object");
    }
    var r = ba(this);

    function t(a, b) {
        if (b) a: {
            var c = r;a = a.split(".");
            for (var d = 0; d < a.length - 1; d++) {
                var f = a[d];
                if (!(f in c)) break a;
                c = c[f]
            }
            a = a[a.length - 1];d = c[a];b = b(d);b != d && null != b && p(c, a, {
                configurable: !0,
                writable: !0,
                value: b
            })
        }
    }
    t("Symbol", function(a) {
        function b(g) {
            if (this instanceof b) throw new TypeError("Symbol is not a constructor");
            return new c(d + (g || "") + "_" + f++, g)
        }

        function c(g, e) {
            this.g = g;
            p(this, "description", {
                configurable: !0,
                writable: !0,
                value: e
            })
        }
        if (a) return a;
        c.prototype.toString = function() {
            return this.g
        };
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_",
            f = 0;
        return b
    });
    t("Symbol.iterator", function(a) {
        if (a) return a;
        a = Symbol("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = r[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && p(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ca(aa(this))
                }
            })
        }
        return a
    });

    function ca(a) {
        a = {
            next: a
        };
        a[Symbol.iterator] = function() {
            return this
        };
        return a
    }

    function v(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        return b ? b.call(a) : {
            next: aa(a)
        }
    }

    function w(a) {
        if (!(a instanceof Array)) {
            a = v(a);
            for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
            a = c
        }
        return a
    }
    var da = "function" == typeof Object.create ? Object.create : function(a) {
            function b() {}
            b.prototype = a;
            return new b
        },
        x;
    if ("function" == typeof Object.setPrototypeOf) x = Object.setPrototypeOf;
    else {
        var y;
        a: {
            var ea = {
                    a: !0
                },
                fa = {};
            try {
                fa.__proto__ = ea;
                y = fa.a;
                break a
            } catch (a) {}
            y = !1
        }
        x = y ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var z = x;

    function B() {
        this.j = !1;
        this.h = null;
        this.l = void 0;
        this.g = 1;
        this.o = 0;
        this.i = null
    }

    function C(a) {
        if (a.j) throw new TypeError("Generator is already running");
        a.j = !0
    }
    B.prototype.m = function(a) {
        this.l = a
    };

    function D(a, b) {
        a.i = {
            L: b,
            M: !0
        };
        a.g = a.o
    }
    B.prototype.return = function(a) {
        this.i = {
            return: a
        };
        this.g = this.o
    };

    function F(a, b, c) {
        a.g = c;
        return {
            value: b
        }
    }

    function ha(a) {
        this.g = new B;
        this.h = a
    }

    function ia(a, b) {
        C(a.g);
        var c = a.g.h;
        if (c) return G(a, "return" in c ? c["return"] : function(d) {
            return {
                value: d,
                done: !0
            }
        }, b, a.g.return);
        a.g.return(b);
        return H(a)
    }

    function G(a, b, c, d) {
        try {
            var f = b.call(a.g.h, c);
            if (!(f instanceof Object)) throw new TypeError("Iterator result " + f + " is not an object");
            if (!f.done) return a.g.j = !1, f;
            var g = f.value
        } catch (e) {
            return a.g.h = null, D(a.g, e), H(a)
        }
        a.g.h = null;
        d.call(a.g, g);
        return H(a)
    }

    function H(a) {
        for (; a.g.g;) try {
            var b = a.h(a.g);
            if (b) return a.g.j = !1, {
                value: b.value,
                done: !1
            }
        } catch (c) {
            a.g.l = void 0, D(a.g, c)
        }
        a.g.j = !1;
        if (a.g.i) {
            b = a.g.i;
            a.g.i = null;
            if (b.M) throw b.L;
            return {
                value: b.return,
                done: !0
            }
        }
        return {
            value: void 0,
            done: !0
        }
    }

    function ja(a) {
        this.next = function(b) {
            C(a.g);
            a.g.h ? b = G(a, a.g.h.next, b, a.g.m) : (a.g.m(b), b = H(a));
            return b
        };
        this.throw = function(b) {
            C(a.g);
            a.g.h ? b = G(a, a.g.h["throw"], b, a.g.m) : (D(a.g, b), b = H(a));
            return b
        };
        this.return = function(b) {
            return ia(a, b)
        };
        this[Symbol.iterator] = function() {
            return this
        }
    }

    function I(a, b) {
        b = new ja(new ha(b));
        z && a.prototype && z(b, a.prototype);
        return b
    }
    var ka = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var f in d) Object.prototype.hasOwnProperty.call(d, f) && (a[f] = d[f])
        }
        return a
    };
    t("Object.assign", function(a) {
        return a || ka
    });
    t("Promise", function(a) {
        function b(e) {
            this.h = 0;
            this.i = void 0;
            this.g = [];
            this.o = !1;
            var h = this.j();
            try {
                e(h.resolve, h.reject)
            } catch (k) {
                h.reject(k)
            }
        }

        function c() {
            this.g = null
        }

        function d(e) {
            return e instanceof b ? e : new b(function(h) {
                h(e)
            })
        }
        if (a) return a;
        c.prototype.h = function(e) {
            if (null == this.g) {
                this.g = [];
                var h = this;
                this.i(function() {
                    h.l()
                })
            }
            this.g.push(e)
        };
        var f = r.setTimeout;
        c.prototype.i = function(e) {
            f(e, 0)
        };
        c.prototype.l = function() {
            for (; this.g && this.g.length;) {
                var e = this.g;
                this.g = [];
                for (var h = 0; h < e.length; ++h) {
                    var k =
                        e[h];
                    e[h] = null;
                    try {
                        k()
                    } catch (l) {
                        this.j(l)
                    }
                }
            }
            this.g = null
        };
        c.prototype.j = function(e) {
            this.i(function() {
                throw e;
            })
        };
        b.prototype.j = function() {
            function e(l) {
                return function(n) {
                    k || (k = !0, l.call(h, n))
                }
            }
            var h = this,
                k = !1;
            return {
                resolve: e(this.G),
                reject: e(this.l)
            }
        };
        b.prototype.G = function(e) {
            if (e === this) this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (e instanceof b) this.I(e);
            else {
                a: switch (typeof e) {
                    case "object":
                        var h = null != e;
                        break a;
                    case "function":
                        h = !0;
                        break a;
                    default:
                        h = !1
                }
                h ? this.F(e) : this.m(e)
            }
        };
        b.prototype.F = function(e) {
            var h = void 0;
            try {
                h = e.then
            } catch (k) {
                this.l(k);
                return
            }
            "function" == typeof h ? this.J(h, e) : this.m(e)
        };
        b.prototype.l = function(e) {
            this.u(2, e)
        };
        b.prototype.m = function(e) {
            this.u(1, e)
        };
        b.prototype.u = function(e, h) {
            if (0 != this.h) throw Error("Cannot settle(" + e + ", " + h + "): Promise already settled in state" + this.h);
            this.h = e;
            this.i = h;
            2 === this.h && this.H();
            this.A()
        };
        b.prototype.H = function() {
            var e = this;
            f(function() {
                if (e.D()) {
                    var h = r.console;
                    "undefined" !== typeof h && h.error(e.i)
                }
            }, 1)
        };
        b.prototype.D =
            function() {
                if (this.o) return !1;
                var e = r.CustomEvent,
                    h = r.Event,
                    k = r.dispatchEvent;
                if ("undefined" === typeof k) return !0;
                "function" === typeof e ? e = new e("unhandledrejection", {
                    cancelable: !0
                }) : "function" === typeof h ? e = new h("unhandledrejection", {
                    cancelable: !0
                }) : (e = r.document.createEvent("CustomEvent"), e.initCustomEvent("unhandledrejection", !1, !0, e));
                e.promise = this;
                e.reason = this.i;
                return k(e)
            };
        b.prototype.A = function() {
            if (null != this.g) {
                for (var e = 0; e < this.g.length; ++e) g.h(this.g[e]);
                this.g = null
            }
        };
        var g = new c;
        b.prototype.I =
            function(e) {
                var h = this.j();
                e.v(h.resolve, h.reject)
            };
        b.prototype.J = function(e, h) {
            var k = this.j();
            try {
                e.call(h, k.resolve, k.reject)
            } catch (l) {
                k.reject(l)
            }
        };
        b.prototype.then = function(e, h) {
            function k(m, q) {
                return "function" == typeof m ? function(E) {
                    try {
                        l(m(E))
                    } catch (A) {
                        n(A)
                    }
                } : q
            }
            var l, n, u = new b(function(m, q) {
                l = m;
                n = q
            });
            this.v(k(e, l), k(h, n));
            return u
        };
        b.prototype.catch = function(e) {
            return this.then(void 0, e)
        };
        b.prototype.v = function(e, h) {
            function k() {
                switch (l.h) {
                    case 1:
                        e(l.i);
                        break;
                    case 2:
                        h(l.i);
                        break;
                    default:
                        throw Error("Unexpected state: " +
                            l.h);
                }
            }
            var l = this;
            null == this.g ? g.h(k) : this.g.push(k);
            this.o = !0
        };
        b.resolve = d;
        b.reject = function(e) {
            return new b(function(h, k) {
                k(e)
            })
        };
        b.race = function(e) {
            return new b(function(h, k) {
                for (var l = v(e), n = l.next(); !n.done; n = l.next()) d(n.value).v(h, k)
            })
        };
        b.all = function(e) {
            var h = v(e),
                k = h.next();
            return k.done ? d([]) : new b(function(l, n) {
                function u(E) {
                    return function(A) {
                        m[E] = A;
                        q--;
                        0 == q && l(m)
                    }
                }
                var m = [],
                    q = 0;
                do m.push(void 0), q++, d(k.value).v(u(m.length - 1), n), k = h.next(); while (!k.done)
            })
        };
        return b
    });
    t("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(h) {
                return h
            };
            var f = [],
                g = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
            if ("function" == typeof g) {
                b = g.call(b);
                for (var e = 0; !(g = b.next()).done;) f.push(c.call(d, g.value, e++))
            } else
                for (g = b.length, e = 0; e < g; e++) f.push(c.call(d, b[e], e));
            return f
        }
    });
    t("Array.prototype.fill", function(a) {
        return a ? a : function(b, c, d) {
            var f = this.length || 0;
            0 > c && (c = Math.max(0, f + c));
            if (null == d || d > f) d = f;
            d = Number(d);
            0 > d && (d = Math.max(0, f + d));
            for (c = Number(c || 0); c < d; c++) this[c] = b;
            return this
        }
    });

    function J(a) {
        return a ? a : Array.prototype.fill
    }
    t("Int8Array.prototype.fill", J);
    t("Uint8Array.prototype.fill", J);
    t("Uint8ClampedArray.prototype.fill", J);
    t("Int16Array.prototype.fill", J);
    t("Uint16Array.prototype.fill", J);
    t("Int32Array.prototype.fill", J);
    t("Uint32Array.prototype.fill", J);
    t("Float32Array.prototype.fill", J);
    t("Float64Array.prototype.fill", J);

    function la(a, b) {
        a instanceof String && (a += "");
        var c = 0,
            d = !1,
            f = {
                next: function() {
                    if (!d && c < a.length) {
                        var g = c++;
                        return {
                            value: b(g, a[g]),
                            done: !1
                        }
                    }
                    d = !0;
                    return {
                        done: !0,
                        value: void 0
                    }
                }
            };
        f[Symbol.iterator] = function() {
            return f
        };
        return f
    }
    t("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return la(this, function(b) {
                return b
            })
        }
    });
    t("Object.values", function(a) {
        return a ? a : function(b) {
            var c = [],
                d;
            for (d in b) Object.prototype.hasOwnProperty.call(b, d) && c.push(b[d]);
            return c
        }
    });
    var ma = this || self;

    function K(a, b) {
        a = a.split(".");
        var c = ma;
        a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift());) a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    };

    function L(a, b) {
        var c = void 0;
        return new(c || (c = Promise))(function(d, f) {
            function g(k) {
                try {
                    h(b.next(k))
                } catch (l) {
                    f(l)
                }
            }

            function e(k) {
                try {
                    h(b["throw"](k))
                } catch (l) {
                    f(l)
                }
            }

            function h(k) {
                k.done ? d(k.value) : (new c(function(l) {
                    l(k.value)
                })).then(g, e)
            }
            h((b = b.apply(a, void 0)).next())
        })
    };
    var na = {};

    function M(a, b) {
        if (b !== na) throw Error("Bad secret");
        this.g = a
    }

    function N() {}
    M.prototype = da(N.prototype);
    M.prototype.constructor = M;
    if (z) z(M, N);
    else
        for (var O in N)
            if ("prototype" != O)
                if (Object.defineProperties) {
                    var oa = Object.getOwnPropertyDescriptor(N, O);
                    oa && Object.defineProperty(M, O, oa)
                } else M[O] = N[O];
    M.prototype.toString = function() {
        return this.g
    };

    function P(a, b, c) {
        a = document.createElement(a);
        b && a.classList.add(b);
        if (c)
            for (b = v(c), c = b.next(); !c.done; c = b.next()) a.appendChild(c.value);
        return a
    }

    function Q(a, b) {
        return P("div", a, b)
    }

    function R(a, b) {
        return P("span", a, b)
    }

    function S(a) {
        var b = P("img", "", void 0);
        b.src = a || "";
        return b
    };

    function pa(a, b) {
        var c = this;
        this.g = a;
        this.i = {};
        var d, f = Q("dropdown-wrapper", [d = Q("dropdown", [Q("dropdown-trigger", [this.h = R(), Q("arrow")]), this.options = Q("dropdown-options")])]);
        f.onclick = function() {
            a.C && a.C();
            d.classList.toggle("open");
            d.g = function() {
                a.B && a.B()
            }
        };
        for (var g = {}, e = v(a.options), h = e.next(); !h.done; g = {
                s: g.s
            }, h = e.next()) g.s = h.value, h = void 0, this.options.appendChild(h = R("dropdown-option")), this.i[g.s.value] = h, h.textContent = g.s.name, g.s.prefix && h.prepend(g.s.prefix), h.setAttribute("data-value",
            g.s.value), h.onclick = function(k) {
            return function() {
                T(c, k.s.value)
            }
        }(g);
        window.addEventListener("click", function(k) {
            d.contains(k.target) || d.classList.remove("open")
        });
        b.appendChild(f)
    }

    function T(a, b) {
        for (var c = v(a.g.options), d = c.next(); !d.done; d = c.next()) {
            d = d.value;
            var f = a.i[d.value];
            if (d.value === b && !f.classList.contains("selected")) return (b = a.options.querySelector(".selected")) && b.classList.remove("selected"), f.classList.add("selected"), a.h.textContent = f.textContent, a.g.onclick(d), !0
        }
        return !1
    }

    function qa(a, b) {
        var c = a.options.querySelector(".selected");
        c && (c.classList.remove("selected"), a.h.textContent = void 0 === b ? "" : b)
    };

    function U(a) {
        this.g = a
    }
    U.prototype.create = function(a, b, c) {
        var d = this,
            f = c.appendChild(document.createElement("div"));
        f.classList.add("control-panel-entry");
        f.classList.add("control-panel-slider");
        c = f.appendChild(document.createElement("span"));
        c.classList.add("label");
        c.textContent = this.g.title;
        c = new pa({
            options: this.g.options.map(function(g) {
                return Object.assign(Object.assign({}, g), {
                    data: null
                })
            }),
            C: function() {
                f.style.zIndex = "1000"
            },
            onclick: function(g) {
                b[d.g.field] = g.value;
                a();
                if (d.g.onselectionchanged) d.g.onselectionchanged(g)
            },
            B: function() {
                f.style.zIndex =
                    "100"
            }
        }, f);
        0 < this.g.options.length && T(c, this.g.options[0].value)
    };
    U.prototype.update = function() {};

    function V() {
        this.i = this.counter = 0;
        this.g = Array.from({
            length: 10
        }).fill(0)
    }
    V.prototype.create = function(a, b, c) {
        // b = c.appendChild(document.createElement("div"));
        // b.classList.add("control-panel-entry");
        // b.classList.add("control-panel-fps");
        // a = b.appendChild(document.createElement("canvas"));
        // this.h = b.appendChild(document.createElement("div"));
        // this.h.classList.add("fps-text");
        // c = b.appendChild(document.createElement("div"));
        // c.classList.add("fps-30");
        // c.textContent = "30";
        // b = b.appendChild(document.createElement("div"));
        // b.classList.add("fps-60");
        // b.textContent = "60";
        // a.width = 100;
        // a.height = 100;
        // this.j = a.getContext("2d");
        ra(this, 0)
    };
    V.prototype.update = function() {};
    V.prototype.tick = function() {
        var a = Math.floor(performance.now() / 1E3);
        1 <= a - this.i && (ra(this, this.counter), this.i = a, this.counter = 0);
        ++this.counter
    };

    var divfps

    document.addEventListener('DOMContentLoaded', function(){
        divfps = document.querySelector("#fps")
    }, false)

    function ra(a, b) {
        if(divfps) {
            divfps.innerHTML = b.toFixed(0);
        }
    }

    // function ra(a, b) {
    //     a.g.shift();
    //     a.g.push(b);
    //     var c = a.j;
    //     c.fillStyle = "green";
    //     c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    //     for (var d = 0; 10 > d; ++d) {
    //         var f = Math.min(100, Math.max(0, a.g[d]));
    //         c.fillRect(10 * d + 1, 100 - f + 1, 8, f)
    //     }
    //     c.setLineDash([2, 2]);
    //     c.strokeStyle = "#a0a0a0a0";
    //     c.lineWidth = 2;
    //     c.beginPath();
    //     c.moveTo(0, 30);
    //     c.lineTo(100, 30);
    //     c.stroke();
    //     c.beginPath();
    //     c.moveTo(0, 60);
    //     c.lineTo(100, 60);
    //     c.stroke();
    //     a.h.textContent = b.toFixed(0) + " fps"
    // };

    function W(a) {
        this.g = a
    }
    W.prototype.create = function(a, b, c) {
        var d = this;
        this.options = b;
        b = this.g;
        c = c.appendChild(document.createElement("div"));
        c.classList.add("control-panel-entry");
        c.classList.add("control-panel-slider");
        var f = c.appendChild(document.createElement("span"));
        f.classList.add("label");
        (this.h = c.appendChild(document.createElement("span"))).classList.add("callout");
        var g = this.i = c.appendChild(document.createElement("input"));
        g.classList.add("value");
        g.type = "range";
        b.range ? (g.min = "" + b.range[0], g.max = "" + b.range[1],
            g.step = void 0 === b.step ? "any" : "" + b.step) : b.discrete && (g.min = "0", g.max = "" + (Object.keys(b.discrete).length - 1), g.step = "1");
        g.oninput = function() {
            sa(d, Number(g.value))
        };
        g.onchange = function() {
            var e = Number(g.value);
            d.g.discrete && (e = Object.keys(d.g.discrete)[e], Array.isArray(d.g.discrete) && (e = Number(e)));
            d.options[d.g.field] = e;
            a()
        };
        f.textContent = b.title
    };
    W.prototype.update = function() {
        var a = this.options[this.g.field];
        a = this.g.discrete && !Array.isArray(this.g.discrete) ? Object.keys(this.g.discrete).indexOf(a) : a;
        this.i.value = "" + a;
        sa(this, a)
    };

    function sa(a, b) {
        b = a.g.discrete ? Object.values(a.g.discrete)[b] : b;
        a.h.textContent = "" + b
    };
    var ta = {
            facingMode: "user",
            width: 640,
            height: 480
        },
        ua = {
            allowVideo: !0,
            allowImage: !0,
            examples: {
                videos: [],
                images: []
            }
        };

    function X(a) {
        return "https://fonts.gstatic.com/s/i/googlematerialicons/" + a + "/v8/white-24dp/1x/gm_" + a + "_white_24dp.png"
    }

    function Y(a) {
        this.l = [];
        this.A = 0;
        this.j = !1;
        this.g = Object.assign(Object.assign({}, ua), a);
        this.g.cameraOptions = Object.assign(Object.assign({}, this.g.cameraOptions || {}), ta)
    }

    function va(a) {
        return L(a, function c() {
            var d, f, g, e, h;
            return I(c, function(k) {
                if (1 == k.g) return F(k, navigator.mediaDevices.getUserMedia({
                    video: !0
                }), 2);
                if (3 != k.g) return F(k, navigator.mediaDevices.enumerateDevices(), 3);
                d = k.l;
                f = [];
                g = v(d);
                for (e = g.next(); !e.done; e = g.next()) h = e.value, "" !== h.label && "videoinput" === h.kind && f.push({
                    label: h.label,
                    deviceId: h.deviceId
                });
                return k.return(f)
            })
        })
    }

    function Z(a) {
        window.requestAnimationFrame(function() {
            a.tick()
        })
    }
    Y.prototype.tick = function() {
        var a = this,
            b = null;
        this.j && (this.video.paused || this.video.currentTime === this.A || (this.m || (wa(this, this.video.currentTime / this.video.duration), this.i.time.textContent = xa(this.video.currentTime)), this.A = this.video.currentTime, b = this.g.onFrame ? this.g.onFrame(this.video, {
            width: this.video.videoWidth,
            height: this.video.videoHeight
        }) : null), b ? b.then(function() {
            Z(a)
        }) : Z(this))
    };

    function ya(a, b) {
        a.video.srcObject = b;
        a.video.onloadedmetadata = function() {
            a.video.play();
            a.j = !0;
            Z(a)
        }
    }

    function za(a) {
        return L(a, function c() {
            var d = this,
                f, g, e, h;
            return I(c, function(k) {
                d.i.parent.style.display = "none";
                d.j = !1;
                if (d.m) {
                    f = d.m.getTracks();
                    g = v(f);
                    for (e = g.next(); !e.done; e = g.next()) h = e.value, h.stop();
                    d.m = void 0
                }
                k.g = 0
            })
        })
    }

    function Aa(a) {
        return L(a, function c() {
            var d = this,
                f, g, e, h;
            return I(c, function(k) {
                if (1 == k.g) return f = d, F(k, va(d), 2);
                g = k.l.map(function(l) {
                    return {
                        label: l.label,
                        type: "webcam",
                        N: l,
                        start: function() {
                            return Ba(f, l)
                        }
                    }
                });
                e = d.g.examples.videos.map(function(l) {
                    return {
                        label: l.name,
                        type: "video",
                        video: f.video,
                        start: function() {
                            Ca(f, l.src)
                        }
                    }
                });
                h = d.g.examples.images.map(function(l) {
                    return {
                        label: l.name,
                        type: "image",
                        image: f.h,
                        start: function() {
                            Da(f, l.src)
                        }
                    }
                });
                return k.return([].concat(w(g), w(e), w(h)))
            })
        })
    }

    function Ea(a, b) {
        return L(a, function d() {
            var f = this;
            return I(d, function(g) {
                1 == g.g ? g = F(g, za(f), 2) : 3 != g.g ? f.g.onSourceChanged ? g = F(g, f.g.onSourceChanged(b.label, b.type), 3) : (g.g = 3, g = void 0) : g = F(g, b.start(), 0);
                return g
            })
        })
    }

    function Fa(a, b) {
        return L(a, function d() {
            var f = this;
            return I(d, function(g) {
                f.g && f.g.onFrame ? g = F(g, f.g.onFrame(b, {
                    width: b.naturalWidth,
                    height: b.naturalHeight
                }), 0) : (g.g = 0, g = void 0);
                return g
            })
        })
    }

    function Ga(a) {
        return L(a, function c() {
            var d = this;
            return I(c, function(f) {
                if (1 == f.g) {
                    if (!d.g || !d.g.onFrame) {
                        f.g = 0;
                        return
                    }
                    d.i.parent.style.display = "flex";
                    wa(d, 0);
                    return F(f, d.video.play(), 3)
                }
                d.D();
                d.j = !0;
                Z(d);
                f.g = 0
            })
        })
    }

    function Ba(a, b) {
        return L(a, function d() {
            var f = this,
                g, e;
            return I(d, function(h) {
                g = f;
                e = Object.assign({
                    video: {
                        deviceId: b.deviceId
                    }
                }, f.g.cameraOptions ? {
                    facingMode: f.g.cameraOptions.facingMode,
                    width: f.g.cameraOptions.width,
                    height: f.g.cameraOptions.height
                } : {});
                return h.return(navigator.mediaDevices.getUserMedia(e).then(function(k) {
                    g.m = k;
                    ya(g, k)
                }).catch(function(k) {
                    console.error("Failed to acquire camera feed: " + k);
                    alert("Failed to acquire camera feed: " + k);
                    throw k;
                }))
            })
        })
    }

    function Ha(a, b) {
        a.o = new pa({
            options: a.l.map(function(c) {
                var d = void 0;
                "image" === c.type ? d = S("https://fonts.gstatic.com/s/i/googlematerialicons/image/v12/gm_grey-24dp/1x/gm_image_gm_grey_24dp.png") : "video" === c.type && (d = S("https://fonts.gstatic.com/s/i/googlematerialicons/videocam/v12/gm_grey-24dp/1x/gm_videocam_gm_grey_24dp.png"));
                return {
                    name: c.label,
                    value: c.label,
                    data: c,
                    prefix: d
                }
            }),
            onclick: function(c) {
                a.i.parent.style.display = "none";
                c.data.start()
            },
            C: function() {
                a.u.style.zIndex = "2000"
            },
            B: function() {
                a.u.style.zIndex =
                    "100"
            }
        }, b)
    }

    function Ia(a, b) {
        var c = b.appendChild(document.createElement("input"));
        c.type = "file";
        c.style.display = "none";
        b.appendChild(R("file-selection", [b = Q("", [S(X("file_upload"))])]));
        b.onclick = function() {
            c.click()
        };
        c.onchange = function() {
            return L(a, function f() {
                var g, e, h, k, l = this;
                return I(f, function(n) {
                    if ((g = c.files) && 0 < g.length) {
                        e = g[0].type.toLowerCase();
                        h = e.substring(0, e.indexOf("/"));
                        var u = g[0];
                        var m = u.type.match(/^([^;]+)(?:;\w+=(?:\w+|"[\w;,= ]+"))*$/i);
                        if (2 !== (null === m || void 0 === m ? void 0 : m.length) || !(/^image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)$/i.test(m[1]) ||
                                /^video\/(?:mpeg|mp4|ogg|webm|x-matroska|quicktime|x-ms-wmv)$/i.test(m[1]) || /^audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)$/i.test(m[1]))) throw Error("unsafe blob MIME type: " + u.type);
                        if (URL && URL.createObjectURL) u = new M(URL.createObjectURL(u), na);
                        else throw Error("cannot find createObjectURL");
                        k = u.toString();
                        "image" === h ? (qa(l.o, g[0].name), Da(l, k)) : "video" === h && Ca(l, k)
                    }
                    n.g = 0
                })
            })
        }
    }

    function Da(a, b) {
        a.h.onload = function() {
            return L(a, function d() {
                var f = this,
                    g;
                return I(d, function(e) {
                    g = f;
                    f.g.onFrame ? e = F(e, Ea(f, {
                        label: "file",
                        type: "image",
                        image: f.h,
                        start: function() {
                            return L(g, function k() {
                                var l = this;
                                return I(k, function(n) {
                                    return F(n, Fa(l, l.h), 0)
                                })
                            })
                        }
                    }), 0) : (e.g = 0, e = void 0);
                    return e
                })
            })
        };
        a.h.src = b
    }

    function Ca(a, b) {
        a.video.onloadedmetadata = function() {
            return L(a, function d() {
                var f = this,
                    g;
                return I(d, function(e) {
                    g = f;
                    f.video.loop = !0;
                    f.g.onFrame ? e = F(e, Ea(f, {
                        label: "file",
                        type: "video",
                        video: f.video,
                        start: function() {
                            return Ga(g)
                        }
                    }), 0) : (e.g = 0, e = void 0);
                    return e
                })
            })
        };
        a.video.srcObject = null;
        a.video.src = b
    }
    Y.prototype.create = function(a, b, c) {
        var d = this,
            f = this.u = c.appendChild(document.createElement("div"));
        f.classList.add("control-panel-entry");
        f.classList.add("control-panel-source-picker");
        var g = Q("source-selection");
        f.append(g);
        Aa(this).then(function(e) {
            d.l = e;
            Ha(d, g);
            Ia(d, g);
            e = g.appendChild(document.createElement("div"));
            e.classList.add("inputs");
            d.video = e.appendChild(document.createElement("video"));
            d.video.setAttribute("crossorigin", "anonymous");
            d.video.setAttribute("playsinline", "true");
            d.h = e.appendChild(document.createElement("img"));
            d.h.setAttribute("crossorigin", "anonymous");
            Ja(d, f);
            0 < d.l.length && (e = d.l[0], T(d.o, e.label) || qa(d.o), e.start())
        })
    };

    function Ja(a, b) {
        var c = X("pause"),
            d = X("play_arrow"),
            f, g, e, h;
        b.append(e = Q("video-controls", [h = S(c), g = Q("video-track"), f = Q("video-slider-ball"), b = R("video-time")]));
        a.i = {
            parent: e,
            K: f,
            track: g,
            time: b
        };
        b.textContent = "00:00";
        f.style.display = "inline-block";
        f.onmousedown = function(k) {
            function l() {
                k.preventDefault();
                document.removeEventListener("mousemove", n);
                u || a.video.play();
                document.removeEventListener("mouseup", l)
            }

            function n(m) {
                k.preventDefault();
                var q = e.getBoundingClientRect(),
                    E = f.getBoundingClientRect(),
                    A = g.getBoundingClientRect();
                m = m.clientX - q.left - E.width / 2;
                q = A.left - q.left;
                m < q ? m = q : m > q + A.width && (m = q + A.width);
                f.style.left = m + "px";
                a.video.currentTime = (m - q) / A.width * a.video.duration
            }
            k.preventDefault();
            var u = a.video.paused;
            a.video.pause();
            document.addEventListener("mousemove", n);
            document.addEventListener("mouseup", l)
        };
        h.onclick = function() {
            a.video.paused ? (a.video.play(), h.src = c) : (a.video.pause(), h.src = d)
        };
        a.D = function() {
            a.video.paused && (h.src = d);
            h.src = c
        }
    }

    function wa(a, b) {
        var c = a.i.K,
            d = a.i.track.getBoundingClientRect();
        a = a.i.parent.getBoundingClientRect();
        c.style.left = d.left - a.left + d.width * b + "px"
    }

    function xa(a) {
        var b = Math.floor(a % 60).toString();
        b = 1 === b.length ? "0" + b : b;
        a = Math.floor(a / 60).toString();
        a = 1 === a.length ? "0" + a : a;
        return a + ":" + b
    }
    Y.prototype.update = function() {
        if (this.h && !this.j && this.g.onFrame) this.g.onFrame(this.h, {
            width: this.h.naturalWidth,
            height: this.h.naturalHeight
        })
    };

    function Ka(a) {
        this.g = a
    }
    Ka.prototype.create = function(a, b, c) {
        a = c.appendChild(document.createElement("div"));
        a.classList.add("control-panel-entry");
        a.classList.add("control-panel-text");
        a.textContent = this.g.title
    };
    Ka.prototype.update = function() {};

    function La(a) {
        this.h = a
    }
    La.prototype.create = function(a, b, c) {
        var d = this;
        this.i = a;
        this.options = b;
        this.g = c.appendChild(document.createElement("div"));
        this.g.classList.add("control-panel-entry");
        this.g.classList.add("control-panel-toggle");
        this.g.onclick = function() {
            d.options[d.h.field] = !d.options[d.h.field];
            d.i()
        };
        a = this.g.appendChild(document.createElement("span"));
        a.classList.add("label");
        this.value = this.g.appendChild(document.createElement("span"));
        this.value.classList.add("value");
        a.textContent = this.h.title
    };
    La.prototype.update = function() {
        this.options[this.h.field] ? (this.value.textContent = "Yes", this.g.classList.add("yes"), this.g.classList.remove("no")) : (this.value.textContent = "No", this.g.classList.add("no"), this.g.classList.remove("yes"))
    };

    function Ma(a, b) {
        this.parent = a;
        this.options = b;
        this.g = [];
        this.h = this.parent.appendChild(document.createElement("div"));
        this.h.classList.add("control-panel")
    }
    Ma.prototype.add = function(a) {
        var b = this;
        a = v(a);
        for (var c = a.next(); !c.done; c = a.next()) c = c.value, this.g.push(c), c.create(function() {
            Na(b)
        }, this.options, this.h);
        Na(this);
        return this
    };
    Ma.prototype.on = function(a) {
        this.i = a;
        Na(this);
        return this
    };

    function Na(a) {
        for (var b = v(a.g), c = b.next(); !c.done; c = b.next()) c.value.update();
        a.i && a.i(a.options)
    }
    K("ControlPanel", Ma);
    K("Slider", W);
    K("StaticText", Ka);
    K("Toggle", La);
    K("SourcePicker", Y);
    K("FPS", V);
    K("DropDownControl", U);
}).call(this);