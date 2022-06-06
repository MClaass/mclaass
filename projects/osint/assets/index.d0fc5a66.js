const Io = function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]'))
        s(r);
    new MutationObserver((r) => {
        for (const o of r)
            if (o.type === "childList")
                for (const i of o.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(r) {
        const o = {};
        return (
            r.integrity && (o.integrity = r.integrity),
            r.referrerpolicy && (o.referrerPolicy = r.referrerpolicy),
            r.crossorigin === "use-credentials"
                ? (o.credentials = "include")
                : r.crossorigin === "anonymous"
                ? (o.credentials = "omit")
                : (o.credentials = "same-origin"),
            o
        );
    }
    function s(r) {
        if (r.ep) return;
        r.ep = !0;
        const o = n(r);
        fetch(r.href, o);
    }
};
Io();
function os(e, t) {
    const n = Object.create(null),
        s = e.split(",");
    for (let r = 0; r < s.length; r++) n[s[r]] = !0;
    return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const So =
        "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    $o = os(So);
function _r(e) {
    return !!e || e === "";
}
function is(e) {
    if (L(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                r = ge(s) ? Fo(s) : is(s);
            if (r) for (const o in r) t[o] = r[o];
        }
        return t;
    } else {
        if (ge(e)) return e;
        if (me(e)) return e;
    }
}
const jo = /;(?![^(]*\))/g,
    Mo = /:(.+)/;
function Fo(e) {
    const t = {};
    return (
        e.split(jo).forEach((n) => {
            if (n) {
                const s = n.split(Mo);
                s.length > 1 && (t[s[0].trim()] = s[1].trim());
            }
        }),
        t
    );
}
function ls(e) {
    let t = "";
    if (ge(e)) t = e;
    else if (L(e))
        for (let n = 0; n < e.length; n++) {
            const s = ls(e[n]);
            s && (t += s + " ");
        }
    else if (me(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}
const te = {},
    xt = [],
    He = () => {},
    No = () => !1,
    Lo = /^on[^a-z]/,
    _n = (e) => Lo.test(e),
    cs = (e) => e.startsWith("onUpdate:"),
    pe = Object.assign,
    as = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    Ho = Object.prototype.hasOwnProperty,
    D = (e, t) => Ho.call(e, t),
    L = Array.isArray,
    Nt = (e) => vn(e) === "[object Map]",
    Bo = (e) => vn(e) === "[object Set]",
    B = (e) => typeof e == "function",
    ge = (e) => typeof e == "string",
    us = (e) => typeof e == "symbol",
    me = (e) => e !== null && typeof e == "object",
    vr = (e) => me(e) && B(e.then) && B(e.catch),
    zo = Object.prototype.toString,
    vn = (e) => zo.call(e),
    Ko = (e) => vn(e).slice(8, -1),
    Uo = (e) => vn(e) === "[object Object]",
    fs = (e) =>
        ge(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    rn = os(
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    bn = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    Do = /-(\w)/g,
    Be = bn((e) => e.replace(Do, (t, n) => (n ? n.toUpperCase() : ""))),
    Wo = /\B([A-Z])/g,
    Ot = bn((e) => e.replace(Wo, "-$1").toLowerCase()),
    yn = bn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    In = bn((e) => (e ? `on${yn(e)}` : "")),
    Dt = (e, t) => !Object.is(e, t),
    Sn = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t);
    },
    fn = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n,
        });
    },
    qo = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let Ts;
const Vo = () =>
    Ts ||
    (Ts =
        typeof globalThis != "undefined"
            ? globalThis
            : typeof self != "undefined"
            ? self
            : typeof window != "undefined"
            ? window
            : typeof global != "undefined"
            ? global
            : {});
let Fe;
class Yo {
    constructor(t = !1) {
        (this.active = !0),
            (this.effects = []),
            (this.cleanups = []),
            !t &&
                Fe &&
                ((this.parent = Fe),
                (this.index = (Fe.scopes || (Fe.scopes = [])).push(this) - 1));
    }
    run(t) {
        if (this.active) {
            const n = Fe;
            try {
                return (Fe = this), t();
            } finally {
                Fe = n;
            }
        }
    }
    on() {
        Fe = this;
    }
    off() {
        Fe = this.parent;
    }
    stop(t) {
        if (this.active) {
            let n, s;
            for (n = 0, s = this.effects.length; n < s; n++)
                this.effects[n].stop();
            for (n = 0, s = this.cleanups.length; n < s; n++)
                this.cleanups[n]();
            if (this.scopes)
                for (n = 0, s = this.scopes.length; n < s; n++)
                    this.scopes[n].stop(!0);
            if (this.parent && !t) {
                const r = this.parent.scopes.pop();
                r &&
                    r !== this &&
                    ((this.parent.scopes[this.index] = r),
                    (r.index = this.index));
            }
            this.active = !1;
        }
    }
}
function Qo(e, t = Fe) {
    t && t.active && t.effects.push(e);
}
const ds = (e) => {
        const t = new Set(e);
        return (t.w = 0), (t.n = 0), t;
    },
    br = (e) => (e.w & it) > 0,
    yr = (e) => (e.n & it) > 0,
    Jo = ({ deps: e }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= it;
    },
    Go = (e) => {
        const { deps: t } = e;
        if (t.length) {
            let n = 0;
            for (let s = 0; s < t.length; s++) {
                const r = t[s];
                br(r) && !yr(r) ? r.delete(e) : (t[n++] = r),
                    (r.w &= ~it),
                    (r.n &= ~it);
            }
            t.length = n;
        }
    },
    Hn = new WeakMap();
let Mt = 0,
    it = 1;
const Bn = 30;
let ke;
const ht = Symbol(""),
    zn = Symbol("");
class hs {
    constructor(t, n = null, s) {
        (this.fn = t),
            (this.scheduler = n),
            (this.active = !0),
            (this.deps = []),
            (this.parent = void 0),
            Qo(this, s);
    }
    run() {
        if (!this.active) return this.fn();
        let t = ke,
            n = st;
        for (; t; ) {
            if (t === this) return;
            t = t.parent;
        }
        try {
            return (
                (this.parent = ke),
                (ke = this),
                (st = !0),
                (it = 1 << ++Mt),
                Mt <= Bn ? Jo(this) : ks(this),
                this.fn()
            );
        } finally {
            Mt <= Bn && Go(this),
                (it = 1 << --Mt),
                (ke = this.parent),
                (st = n),
                (this.parent = void 0),
                this.deferStop && this.stop();
        }
    }
    stop() {
        ke === this
            ? (this.deferStop = !0)
            : this.active &&
              (ks(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function ks(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
    }
}
let st = !0;
const Er = [];
function Tt() {
    Er.push(st), (st = !1);
}
function kt() {
    const e = Er.pop();
    st = e === void 0 ? !0 : e;
}
function xe(e, t, n) {
    if (st && ke) {
        let s = Hn.get(e);
        s || Hn.set(e, (s = new Map()));
        let r = s.get(n);
        r || s.set(n, (r = ds())), wr(r);
    }
}
function wr(e, t) {
    let n = !1;
    Mt <= Bn ? yr(e) || ((e.n |= it), (n = !br(e))) : (n = !e.has(ke)),
        n && (e.add(ke), ke.deps.push(e));
}
function De(e, t, n, s, r, o) {
    const i = Hn.get(e);
    if (!i) return;
    let c = [];
    if (t === "clear") c = [...i.values()];
    else if (n === "length" && L(e))
        i.forEach((l, u) => {
            (u === "length" || u >= s) && c.push(l);
        });
    else
        switch ((n !== void 0 && c.push(i.get(n)), t)) {
            case "add":
                L(e)
                    ? fs(n) && c.push(i.get("length"))
                    : (c.push(i.get(ht)), Nt(e) && c.push(i.get(zn)));
                break;
            case "delete":
                L(e) || (c.push(i.get(ht)), Nt(e) && c.push(i.get(zn)));
                break;
            case "set":
                Nt(e) && c.push(i.get(ht));
                break;
        }
    if (c.length === 1) c[0] && Kn(c[0]);
    else {
        const l = [];
        for (const u of c) u && l.push(...u);
        Kn(ds(l));
    }
}
function Kn(e, t) {
    const n = L(e) ? e : [...e];
    for (const s of n) s.computed && Is(s);
    for (const s of n) s.computed || Is(s);
}
function Is(e, t) {
    (e !== ke || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Xo = os("__proto__,__v_isRef,__isVue"),
    xr = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== "arguments" && e !== "caller")
            .map((e) => Symbol[e])
            .filter(us)
    ),
    Zo = ps(),
    ei = ps(!1, !0),
    ti = ps(!0),
    Ss = ni();
function ni() {
    const e = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...n) {
                const s = V(this);
                for (let o = 0, i = this.length; o < i; o++)
                    xe(s, "get", o + "");
                const r = s[t](...n);
                return r === -1 || r === !1 ? s[t](...n.map(V)) : r;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...n) {
                Tt();
                const s = V(this)[t].apply(this, n);
                return kt(), s;
            };
        }),
        e
    );
}
function ps(e = !1, t = !1) {
    return function (s, r, o) {
        if (r === "__v_isReactive") return !e;
        if (r === "__v_isReadonly") return e;
        if (r === "__v_isShallow") return t;
        if (r === "__v_raw" && o === (e ? (t ? vi : Or) : t ? Pr : Rr).get(s))
            return s;
        const i = L(s);
        if (!e && i && D(Ss, r)) return Reflect.get(Ss, r, o);
        const c = Reflect.get(s, r, o);
        return (us(r) ? xr.has(r) : Xo(r)) || (e || xe(s, "get", r), t)
            ? c
            : fe(c)
            ? i && fs(r)
                ? c
                : c.value
            : me(c)
            ? e
                ? Tr(c)
                : Gt(c)
            : c;
    };
}
const si = Cr(),
    ri = Cr(!0);
function Cr(e = !1) {
    return function (n, s, r, o) {
        let i = n[s];
        if (Wt(i) && fe(i) && !fe(r)) return !1;
        if (
            !e &&
            !Wt(r) &&
            (Un(r) || ((r = V(r)), (i = V(i))), !L(n) && fe(i) && !fe(r))
        )
            return (i.value = r), !0;
        const c = L(n) && fs(s) ? Number(s) < n.length : D(n, s),
            l = Reflect.set(n, s, r, o);
        return (
            n === V(o) &&
                (c ? Dt(r, i) && De(n, "set", s, r) : De(n, "add", s, r)),
            l
        );
    };
}
function oi(e, t) {
    const n = D(e, t);
    e[t];
    const s = Reflect.deleteProperty(e, t);
    return s && n && De(e, "delete", t, void 0), s;
}
function ii(e, t) {
    const n = Reflect.has(e, t);
    return (!us(t) || !xr.has(t)) && xe(e, "has", t), n;
}
function li(e) {
    return xe(e, "iterate", L(e) ? "length" : ht), Reflect.ownKeys(e);
}
const Ar = { get: Zo, set: si, deleteProperty: oi, has: ii, ownKeys: li },
    ci = {
        get: ti,
        set(e, t) {
            return !0;
        },
        deleteProperty(e, t) {
            return !0;
        },
    },
    ai = pe({}, Ar, { get: ei, set: ri }),
    gs = (e) => e,
    En = (e) => Reflect.getPrototypeOf(e);
function Zt(e, t, n = !1, s = !1) {
    e = e.__v_raw;
    const r = V(e),
        o = V(t);
    n || (t !== o && xe(r, "get", t), xe(r, "get", o));
    const { has: i } = En(r),
        c = s ? gs : n ? vs : qt;
    if (i.call(r, t)) return c(e.get(t));
    if (i.call(r, o)) return c(e.get(o));
    e !== r && e.get(t);
}
function en(e, t = !1) {
    const n = this.__v_raw,
        s = V(n),
        r = V(e);
    return (
        t || (e !== r && xe(s, "has", e), xe(s, "has", r)),
        e === r ? n.has(e) : n.has(e) || n.has(r)
    );
}
function tn(e, t = !1) {
    return (
        (e = e.__v_raw),
        !t && xe(V(e), "iterate", ht),
        Reflect.get(e, "size", e)
    );
}
function $s(e) {
    e = V(e);
    const t = V(this);
    return En(t).has.call(t, e) || (t.add(e), De(t, "add", e, e)), this;
}
function js(e, t) {
    t = V(t);
    const n = V(this),
        { has: s, get: r } = En(n);
    let o = s.call(n, e);
    o || ((e = V(e)), (o = s.call(n, e)));
    const i = r.call(n, e);
    return (
        n.set(e, t),
        o ? Dt(t, i) && De(n, "set", e, t) : De(n, "add", e, t),
        this
    );
}
function Ms(e) {
    const t = V(this),
        { has: n, get: s } = En(t);
    let r = n.call(t, e);
    r || ((e = V(e)), (r = n.call(t, e))), s && s.call(t, e);
    const o = t.delete(e);
    return r && De(t, "delete", e, void 0), o;
}
function Fs() {
    const e = V(this),
        t = e.size !== 0,
        n = e.clear();
    return t && De(e, "clear", void 0, void 0), n;
}
function nn(e, t) {
    return function (s, r) {
        const o = this,
            i = o.__v_raw,
            c = V(i),
            l = t ? gs : e ? vs : qt;
        return (
            !e && xe(c, "iterate", ht),
            i.forEach((u, f) => s.call(r, l(u), l(f), o))
        );
    };
}
function sn(e, t, n) {
    return function (...s) {
        const r = this.__v_raw,
            o = V(r),
            i = Nt(o),
            c = e === "entries" || (e === Symbol.iterator && i),
            l = e === "keys" && i,
            u = r[e](...s),
            f = n ? gs : t ? vs : qt;
        return (
            !t && xe(o, "iterate", l ? zn : ht),
            {
                next() {
                    const { value: p, done: h } = u.next();
                    return h
                        ? { value: p, done: h }
                        : { value: c ? [f(p[0]), f(p[1])] : f(p), done: h };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function Je(e) {
    return function (...t) {
        return e === "delete" ? !1 : this;
    };
}
function ui() {
    const e = {
            get(o) {
                return Zt(this, o);
            },
            get size() {
                return tn(this);
            },
            has: en,
            add: $s,
            set: js,
            delete: Ms,
            clear: Fs,
            forEach: nn(!1, !1),
        },
        t = {
            get(o) {
                return Zt(this, o, !1, !0);
            },
            get size() {
                return tn(this);
            },
            has: en,
            add: $s,
            set: js,
            delete: Ms,
            clear: Fs,
            forEach: nn(!1, !0),
        },
        n = {
            get(o) {
                return Zt(this, o, !0);
            },
            get size() {
                return tn(this, !0);
            },
            has(o) {
                return en.call(this, o, !0);
            },
            add: Je("add"),
            set: Je("set"),
            delete: Je("delete"),
            clear: Je("clear"),
            forEach: nn(!0, !1),
        },
        s = {
            get(o) {
                return Zt(this, o, !0, !0);
            },
            get size() {
                return tn(this, !0);
            },
            has(o) {
                return en.call(this, o, !0);
            },
            add: Je("add"),
            set: Je("set"),
            delete: Je("delete"),
            clear: Je("clear"),
            forEach: nn(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
            (e[o] = sn(o, !1, !1)),
                (n[o] = sn(o, !0, !1)),
                (t[o] = sn(o, !1, !0)),
                (s[o] = sn(o, !0, !0));
        }),
        [e, n, t, s]
    );
}
const [fi, di, hi, pi] = ui();
function ms(e, t) {
    const n = t ? (e ? pi : hi) : e ? di : fi;
    return (s, r, o) =>
        r === "__v_isReactive"
            ? !e
            : r === "__v_isReadonly"
            ? e
            : r === "__v_raw"
            ? s
            : Reflect.get(D(n, r) && r in s ? n : s, r, o);
}
const gi = { get: ms(!1, !1) },
    mi = { get: ms(!1, !0) },
    _i = { get: ms(!0, !1) },
    Rr = new WeakMap(),
    Pr = new WeakMap(),
    Or = new WeakMap(),
    vi = new WeakMap();
function bi(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function yi(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : bi(Ko(e));
}
function Gt(e) {
    return Wt(e) ? e : _s(e, !1, Ar, gi, Rr);
}
function Ei(e) {
    return _s(e, !1, ai, mi, Pr);
}
function Tr(e) {
    return _s(e, !0, ci, _i, Or);
}
function _s(e, t, n, s, r) {
    if (!me(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const o = r.get(e);
    if (o) return o;
    const i = yi(e);
    if (i === 0) return e;
    const c = new Proxy(e, i === 2 ? s : n);
    return r.set(e, c), c;
}
function Ct(e) {
    return Wt(e) ? Ct(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Wt(e) {
    return !!(e && e.__v_isReadonly);
}
function Un(e) {
    return !!(e && e.__v_isShallow);
}
function kr(e) {
    return Ct(e) || Wt(e);
}
function V(e) {
    const t = e && e.__v_raw;
    return t ? V(t) : e;
}
function Ir(e) {
    return fn(e, "__v_skip", !0), e;
}
const qt = (e) => (me(e) ? Gt(e) : e),
    vs = (e) => (me(e) ? Tr(e) : e);
function Sr(e) {
    st && ke && ((e = V(e)), wr(e.dep || (e.dep = ds())));
}
function $r(e, t) {
    (e = V(e)), e.dep && Kn(e.dep);
}
function fe(e) {
    return !!(e && e.__v_isRef === !0);
}
function wi(e) {
    return jr(e, !1);
}
function xi(e) {
    return jr(e, !0);
}
function jr(e, t) {
    return fe(e) ? e : new Ci(e, t);
}
class Ci {
    constructor(t, n) {
        (this.__v_isShallow = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = n ? t : V(t)),
            (this._value = n ? t : qt(t));
    }
    get value() {
        return Sr(this), this._value;
    }
    set value(t) {
        (t = this.__v_isShallow ? t : V(t)),
            Dt(t, this._rawValue) &&
                ((this._rawValue = t),
                (this._value = this.__v_isShallow ? t : qt(t)),
                $r(this));
    }
}
function Lt(e) {
    return fe(e) ? e.value : e;
}
const Ai = {
    get: (e, t, n) => Lt(Reflect.get(e, t, n)),
    set: (e, t, n, s) => {
        const r = e[t];
        return fe(r) && !fe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
    },
};
function Mr(e) {
    return Ct(e) ? e : new Proxy(e, Ai);
}
class Ri {
    constructor(t, n, s, r) {
        (this._setter = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._dirty = !0),
            (this.effect = new hs(t, () => {
                this._dirty || ((this._dirty = !0), $r(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !r),
            (this.__v_isReadonly = s);
    }
    get value() {
        const t = V(this);
        return (
            Sr(t),
            (t._dirty || !t._cacheable) &&
                ((t._dirty = !1), (t._value = t.effect.run())),
            t._value
        );
    }
    set value(t) {
        this._setter(t);
    }
}
function Pi(e, t, n = !1) {
    let s, r;
    const o = B(e);
    return (
        o ? ((s = e), (r = He)) : ((s = e.get), (r = e.set)),
        new Ri(s, r, o || !r, n)
    );
}
function rt(e, t, n, s) {
    let r;
    try {
        r = s ? e(...s) : e();
    } catch (o) {
        wn(o, t, n);
    }
    return r;
}
function Pe(e, t, n, s) {
    if (B(e)) {
        const o = rt(e, t, n, s);
        return (
            o &&
                vr(o) &&
                o.catch((i) => {
                    wn(i, t, n);
                }),
            o
        );
    }
    const r = [];
    for (let o = 0; o < e.length; o++) r.push(Pe(e[o], t, n, s));
    return r;
}
function wn(e, t, n, s) {
    if ((t && t.vnode, t)) {
        let r = t.parent;
        const o = t.proxy,
            i = n;
        for (; r; ) {
            const l = r.ec;
            if (l) {
                for (let u = 0; u < l.length; u++)
                    if (l[u](e, o, i) === !1) return;
            }
            r = r.parent;
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            rt(c, null, 10, [e, o, i]);
            return;
        }
    }
    Oi(e);
}
function Oi(e, t, n, s) {
    console.error(e);
}
let dn = !1,
    Dn = !1;
const we = [];
let Ke = 0;
const Ht = [];
let Ft = null,
    bt = 0;
const Bt = [];
let Ze = null,
    yt = 0;
const Fr = Promise.resolve();
let bs = null,
    Wn = null;
function Nr(e) {
    const t = bs || Fr;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ti(e) {
    let t = Ke + 1,
        n = we.length;
    for (; t < n; ) {
        const s = (t + n) >>> 1;
        Vt(we[s]) < e ? (t = s + 1) : (n = s);
    }
    return t;
}
function Lr(e) {
    (!we.length || !we.includes(e, dn && e.allowRecurse ? Ke + 1 : Ke)) &&
        e !== Wn &&
        (e.id == null ? we.push(e) : we.splice(Ti(e.id), 0, e), Hr());
}
function Hr() {
    !dn && !Dn && ((Dn = !0), (bs = Fr.then(Kr)));
}
function ki(e) {
    const t = we.indexOf(e);
    t > Ke && we.splice(t, 1);
}
function Br(e, t, n, s) {
    L(e)
        ? n.push(...e)
        : (!t || !t.includes(e, e.allowRecurse ? s + 1 : s)) && n.push(e),
        Hr();
}
function Ii(e) {
    Br(e, Ft, Ht, bt);
}
function Si(e) {
    Br(e, Ze, Bt, yt);
}
function xn(e, t = null) {
    if (Ht.length) {
        for (
            Wn = t, Ft = [...new Set(Ht)], Ht.length = 0, bt = 0;
            bt < Ft.length;
            bt++
        )
            Ft[bt]();
        (Ft = null), (bt = 0), (Wn = null), xn(e, t);
    }
}
function zr(e) {
    if ((xn(), Bt.length)) {
        const t = [...new Set(Bt)];
        if (((Bt.length = 0), Ze)) {
            Ze.push(...t);
            return;
        }
        for (
            Ze = t, Ze.sort((n, s) => Vt(n) - Vt(s)), yt = 0;
            yt < Ze.length;
            yt++
        )
            Ze[yt]();
        (Ze = null), (yt = 0);
    }
}
const Vt = (e) => (e.id == null ? 1 / 0 : e.id);
function Kr(e) {
    (Dn = !1), (dn = !0), xn(e), we.sort((n, s) => Vt(n) - Vt(s));
    const t = He;
    try {
        for (Ke = 0; Ke < we.length; Ke++) {
            const n = we[Ke];
            n && n.active !== !1 && rt(n, null, 14);
        }
    } finally {
        (Ke = 0),
            (we.length = 0),
            zr(),
            (dn = !1),
            (bs = null),
            (we.length || Ht.length || Bt.length) && Kr(e);
    }
}
function $i(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || te;
    let r = n;
    const o = t.startsWith("update:"),
        i = o && t.slice(7);
    if (i && i in s) {
        const f = `${i === "modelValue" ? "model" : i}Modifiers`,
            { number: p, trim: h } = s[f] || te;
        h && (r = n.map((y) => y.trim())), p && (r = n.map(qo));
    }
    let c,
        l = s[(c = In(t))] || s[(c = In(Be(t)))];
    !l && o && (l = s[(c = In(Ot(t)))]), l && Pe(l, e, 6, r);
    const u = s[c + "Once"];
    if (u) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[c]) return;
        (e.emitted[c] = !0), Pe(u, e, 6, r);
    }
}
function Ur(e, t, n = !1) {
    const s = t.emitsCache,
        r = s.get(e);
    if (r !== void 0) return r;
    const o = e.emits;
    let i = {},
        c = !1;
    if (!B(e)) {
        const l = (u) => {
            const f = Ur(u, t, !0);
            f && ((c = !0), pe(i, f));
        };
        !n && t.mixins.length && t.mixins.forEach(l),
            e.extends && l(e.extends),
            e.mixins && e.mixins.forEach(l);
    }
    return !o && !c
        ? (s.set(e, null), null)
        : (L(o) ? o.forEach((l) => (i[l] = null)) : pe(i, o), s.set(e, i), i);
}
function Cn(e, t) {
    return !e || !_n(t)
        ? !1
        : ((t = t.slice(2).replace(/Once$/, "")),
          D(e, t[0].toLowerCase() + t.slice(1)) || D(e, Ot(t)) || D(e, t));
}
let Ie = null,
    An = null;
function hn(e) {
    const t = Ie;
    return (Ie = e), (An = (e && e.type.__scopeId) || null), t;
}
function Dr(e) {
    An = e;
}
function Wr() {
    An = null;
}
function et(e, t = Ie, n) {
    if (!t || e._n) return e;
    const s = (...r) => {
        s._d && Vs(-1);
        const o = hn(t),
            i = e(...r);
        return hn(o), s._d && Vs(1), i;
    };
    return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function $n(e) {
    const {
        type: t,
        vnode: n,
        proxy: s,
        withProxy: r,
        props: o,
        propsOptions: [i],
        slots: c,
        attrs: l,
        emit: u,
        render: f,
        renderCache: p,
        data: h,
        setupState: y,
        ctx: R,
        inheritAttrs: S,
    } = e;
    let O, P;
    const F = hn(e);
    try {
        if (n.shapeFlag & 4) {
            const q = r || s;
            (O = Ne(f.call(q, q, p, o, y, h, R))), (P = l);
        } else {
            const q = t;
            (O = Ne(
                q.length > 1
                    ? q(o, { attrs: l, slots: c, emit: u })
                    : q(o, null)
            )),
                (P = t.props ? l : ji(l));
        }
    } catch (q) {
        (zt.length = 0), wn(q, e, 1), (O = ie(Ue));
    }
    let U = O;
    if (P && S !== !1) {
        const q = Object.keys(P),
            { shapeFlag: oe } = U;
        q.length &&
            oe & 7 &&
            (i && q.some(cs) && (P = Mi(P, i)), (U = lt(U, P)));
    }
    return (
        n.dirs &&
            ((U = lt(U)), (U.dirs = U.dirs ? U.dirs.concat(n.dirs) : n.dirs)),
        n.transition && (U.transition = n.transition),
        (O = U),
        hn(F),
        O
    );
}
const ji = (e) => {
        let t;
        for (const n in e)
            (n === "class" || n === "style" || _n(n)) &&
                ((t || (t = {}))[n] = e[n]);
        return t;
    },
    Mi = (e, t) => {
        const n = {};
        for (const s in e) (!cs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n;
    };
function Fi(e, t, n) {
    const { props: s, children: r, component: o } = e,
        { props: i, children: c, patchFlag: l } = t,
        u = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
        if (l & 1024) return !0;
        if (l & 16) return s ? Ns(s, i, u) : !!i;
        if (l & 8) {
            const f = t.dynamicProps;
            for (let p = 0; p < f.length; p++) {
                const h = f[p];
                if (i[h] !== s[h] && !Cn(u, h)) return !0;
            }
        }
    } else
        return (r || c) && (!c || !c.$stable)
            ? !0
            : s === i
            ? !1
            : s
            ? i
                ? Ns(s, i, u)
                : !0
            : !!i;
    return !1;
}
function Ns(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let r = 0; r < s.length; r++) {
        const o = s[r];
        if (t[o] !== e[o] && !Cn(n, o)) return !0;
    }
    return !1;
}
function Ni({ vnode: e, parent: t }, n) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Li = (e) => e.__isSuspense;
function Hi(e, t) {
    t && t.pendingBranch
        ? L(e)
            ? t.effects.push(...e)
            : t.effects.push(e)
        : Si(e);
}
function on(e, t) {
    if (ce) {
        let n = ce.provides;
        const s = ce.parent && ce.parent.provides;
        s === n && (n = ce.provides = Object.create(s)), (n[e] = t);
    }
}
function ot(e, t, n = !1) {
    const s = ce || Ie;
    if (s) {
        const r =
            s.parent == null
                ? s.vnode.appContext && s.vnode.appContext.provides
                : s.parent.provides;
        if (r && e in r) return r[e];
        if (arguments.length > 1) return n && B(t) ? t.call(s.proxy) : t;
    }
}
const Ls = {};
function ln(e, t, n) {
    return qr(e, t, n);
}
function qr(
    e,
    t,
    { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = te
) {
    const c = ce;
    let l,
        u = !1,
        f = !1;
    if (
        (fe(e)
            ? ((l = () => e.value), (u = Un(e)))
            : Ct(e)
            ? ((l = () => e), (s = !0))
            : L(e)
            ? ((f = !0),
              (u = e.some((P) => Ct(P) || Un(P))),
              (l = () =>
                  e.map((P) => {
                      if (fe(P)) return P.value;
                      if (Ct(P)) return wt(P);
                      if (B(P)) return rt(P, c, 2);
                  })))
            : B(e)
            ? t
                ? (l = () => rt(e, c, 2))
                : (l = () => {
                      if (!(c && c.isUnmounted))
                          return p && p(), Pe(e, c, 3, [h]);
                  })
            : (l = He),
        t && s)
    ) {
        const P = l;
        l = () => wt(P());
    }
    let p,
        h = (P) => {
            p = O.onStop = () => {
                rt(P, c, 4);
            };
        };
    if (Qt)
        return (
            (h = He), t ? n && Pe(t, c, 3, [l(), f ? [] : void 0, h]) : l(), He
        );
    let y = f ? [] : Ls;
    const R = () => {
        if (!!O.active)
            if (t) {
                const P = O.run();
                (s || u || (f ? P.some((F, U) => Dt(F, y[U])) : Dt(P, y))) &&
                    (p && p(),
                    Pe(t, c, 3, [P, y === Ls ? void 0 : y, h]),
                    (y = P));
            } else O.run();
    };
    R.allowRecurse = !!t;
    let S;
    r === "sync"
        ? (S = R)
        : r === "post"
        ? (S = () => ve(R, c && c.suspense))
        : (S = () => Ii(R));
    const O = new hs(l, S);
    return (
        t
            ? n
                ? R()
                : (y = O.run())
            : r === "post"
            ? ve(O.run.bind(O), c && c.suspense)
            : O.run(),
        () => {
            O.stop(), c && c.scope && as(c.scope.effects, O);
        }
    );
}
function Bi(e, t, n) {
    const s = this.proxy,
        r = ge(e) ? (e.includes(".") ? Vr(s, e) : () => s[e]) : e.bind(s, s);
    let o;
    B(t) ? (o = t) : ((o = t.handler), (n = t));
    const i = ce;
    At(this);
    const c = qr(r, o.bind(s), n);
    return i ? At(i) : pt(), c;
}
function Vr(e, t) {
    const n = t.split(".");
    return () => {
        let s = e;
        for (let r = 0; r < n.length && s; r++) s = s[n[r]];
        return s;
    };
}
function wt(e, t) {
    if (!me(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
    if ((t.add(e), fe(e))) wt(e.value, t);
    else if (L(e)) for (let n = 0; n < e.length; n++) wt(e[n], t);
    else if (Bo(e) || Nt(e))
        e.forEach((n) => {
            wt(n, t);
        });
    else if (Uo(e)) for (const n in e) wt(e[n], t);
    return e;
}
function zi() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map(),
    };
    return (
        Xr(() => {
            e.isMounted = !0;
        }),
        Zr(() => {
            e.isUnmounting = !0;
        }),
        e
    );
}
const Re = [Function, Array],
    Ki = {
        name: "BaseTransition",
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: Re,
            onEnter: Re,
            onAfterEnter: Re,
            onEnterCancelled: Re,
            onBeforeLeave: Re,
            onLeave: Re,
            onAfterLeave: Re,
            onLeaveCancelled: Re,
            onBeforeAppear: Re,
            onAppear: Re,
            onAfterAppear: Re,
            onAppearCancelled: Re,
        },
        setup(e, { slots: t }) {
            const n = Ol(),
                s = zi();
            let r;
            return () => {
                const o = t.default && Qr(t.default(), !0);
                if (!o || !o.length) return;
                let i = o[0];
                if (o.length > 1) {
                    for (const S of o)
                        if (S.type !== Ue) {
                            i = S;
                            break;
                        }
                }
                const c = V(e),
                    { mode: l } = c;
                if (s.isLeaving) return jn(i);
                const u = Hs(i);
                if (!u) return jn(i);
                const f = qn(u, c, s, n);
                Vn(u, f);
                const p = n.subTree,
                    h = p && Hs(p);
                let y = !1;
                const { getTransitionKey: R } = u.type;
                if (R) {
                    const S = R();
                    r === void 0 ? (r = S) : S !== r && ((r = S), (y = !0));
                }
                if (h && h.type !== Ue && (!ft(u, h) || y)) {
                    const S = qn(h, c, s, n);
                    if ((Vn(h, S), l === "out-in"))
                        return (
                            (s.isLeaving = !0),
                            (S.afterLeave = () => {
                                (s.isLeaving = !1), n.update();
                            }),
                            jn(i)
                        );
                    l === "in-out" &&
                        u.type !== Ue &&
                        (S.delayLeave = (O, P, F) => {
                            const U = Yr(s, h);
                            (U[String(h.key)] = h),
                                (O._leaveCb = () => {
                                    P(),
                                        (O._leaveCb = void 0),
                                        delete f.delayedLeave;
                                }),
                                (f.delayedLeave = F);
                        });
                }
                return i;
            };
        },
    },
    Ui = Ki;
function Yr(e, t) {
    const { leavingVNodes: n } = e;
    let s = n.get(t.type);
    return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function qn(e, t, n, s) {
    const {
            appear: r,
            mode: o,
            persisted: i = !1,
            onBeforeEnter: c,
            onEnter: l,
            onAfterEnter: u,
            onEnterCancelled: f,
            onBeforeLeave: p,
            onLeave: h,
            onAfterLeave: y,
            onLeaveCancelled: R,
            onBeforeAppear: S,
            onAppear: O,
            onAfterAppear: P,
            onAppearCancelled: F,
        } = t,
        U = String(e.key),
        q = Yr(n, e),
        oe = (K, ne) => {
            K && Pe(K, s, 9, ne);
        },
        de = (K, ne) => {
            const re = ne[1];
            oe(K, ne),
                L(K)
                    ? K.every((ae) => ae.length <= 1) && re()
                    : K.length <= 1 && re();
        },
        be = {
            mode: o,
            persisted: i,
            beforeEnter(K) {
                let ne = c;
                if (!n.isMounted)
                    if (r) ne = S || c;
                    else return;
                K._leaveCb && K._leaveCb(!0);
                const re = q[U];
                re && ft(e, re) && re.el._leaveCb && re.el._leaveCb(),
                    oe(ne, [K]);
            },
            enter(K) {
                let ne = l,
                    re = u,
                    ae = f;
                if (!n.isMounted)
                    if (r) (ne = O || l), (re = P || u), (ae = F || f);
                    else return;
                let ue = !1;
                const Oe = (K._enterCb = (Qe) => {
                    ue ||
                        ((ue = !0),
                        Qe ? oe(ae, [K]) : oe(re, [K]),
                        be.delayedLeave && be.delayedLeave(),
                        (K._enterCb = void 0));
                });
                ne ? de(ne, [K, Oe]) : Oe();
            },
            leave(K, ne) {
                const re = String(e.key);
                if ((K._enterCb && K._enterCb(!0), n.isUnmounting)) return ne();
                oe(p, [K]);
                let ae = !1;
                const ue = (K._leaveCb = (Oe) => {
                    ae ||
                        ((ae = !0),
                        ne(),
                        Oe ? oe(R, [K]) : oe(y, [K]),
                        (K._leaveCb = void 0),
                        q[re] === e && delete q[re]);
                });
                (q[re] = e), h ? de(h, [K, ue]) : ue();
            },
            clone(K) {
                return qn(K, t, n, s);
            },
        };
    return be;
}
function jn(e) {
    if (Rn(e)) return (e = lt(e)), (e.children = null), e;
}
function Hs(e) {
    return Rn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Vn(e, t) {
    e.shapeFlag & 6 && e.component
        ? Vn(e.component.subTree, t)
        : e.shapeFlag & 128
        ? ((e.ssContent.transition = t.clone(e.ssContent)),
          (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
}
function Qr(e, t = !1, n) {
    let s = [],
        r = 0;
    for (let o = 0; o < e.length; o++) {
        let i = e[o];
        const c =
            n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
        i.type === he
            ? (i.patchFlag & 128 && r++, (s = s.concat(Qr(i.children, t, c))))
            : (t || i.type !== Ue) && s.push(c != null ? lt(i, { key: c }) : i);
    }
    if (r > 1) for (let o = 0; o < s.length; o++) s[o].patchFlag = -2;
    return s;
}
function Jr(e) {
    return B(e) ? { setup: e, name: e.name } : e;
}
const cn = (e) => !!e.type.__asyncLoader,
    Rn = (e) => e.type.__isKeepAlive;
function Di(e, t) {
    Gr(e, "a", t);
}
function Wi(e, t) {
    Gr(e, "da", t);
}
function Gr(e, t, n = ce) {
    const s =
        e.__wdc ||
        (e.__wdc = () => {
            let r = n;
            for (; r; ) {
                if (r.isDeactivated) return;
                r = r.parent;
            }
            return e();
        });
    if ((Pn(t, s, n), n)) {
        let r = n.parent;
        for (; r && r.parent; )
            Rn(r.parent.vnode) && qi(s, t, n, r), (r = r.parent);
    }
}
function qi(e, t, n, s) {
    const r = Pn(t, e, s, !0);
    eo(() => {
        as(s[t], r);
    }, n);
}
function Pn(e, t, n = ce, s = !1) {
    if (n) {
        const r = n[e] || (n[e] = []),
            o =
                t.__weh ||
                (t.__weh = (...i) => {
                    if (n.isUnmounted) return;
                    Tt(), At(n);
                    const c = Pe(t, n, e, i);
                    return pt(), kt(), c;
                });
        return s ? r.unshift(o) : r.push(o), o;
    }
}
const We =
        (e) =>
        (t, n = ce) =>
            (!Qt || e === "sp") && Pn(e, t, n),
    Vi = We("bm"),
    Xr = We("m"),
    Yi = We("bu"),
    Qi = We("u"),
    Zr = We("bum"),
    eo = We("um"),
    Ji = We("sp"),
    Gi = We("rtg"),
    Xi = We("rtc");
function Zi(e, t = ce) {
    Pn("ec", e, t);
}
function ct(e, t, n, s) {
    const r = e.dirs,
        o = t && t.dirs;
    for (let i = 0; i < r.length; i++) {
        const c = r[i];
        o && (c.oldValue = o[i].value);
        let l = c.dir[s];
        l && (Tt(), Pe(l, n, 8, [e.el, c, e, t]), kt());
    }
}
const to = "components";
function no(e, t) {
    return tl(to, e, !0, t) || e;
}
const el = Symbol();
function tl(e, t, n, s = !1) {
    const r = Ie || ce;
    if (r) {
        const o = r.type;
        if (e === to) {
            const c = $l(o);
            if (c && (c === t || c === Be(t) || c === yn(Be(t)))) return o;
        }
        const i = Bs(r[e] || o[e], t) || Bs(r.appContext[e], t);
        return !i && s ? o : i;
    }
}
function Bs(e, t) {
    return e && (e[t] || e[Be(t)] || e[yn(Be(t))]);
}
const Yn = (e) => (e ? (po(e) ? xs(e) || e.proxy : Yn(e.parent)) : null),
    pn = pe(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => Yn(e.parent),
        $root: (e) => Yn(e.root),
        $emit: (e) => e.emit,
        $options: (e) => ro(e),
        $forceUpdate: (e) => e.f || (e.f = () => Lr(e.update)),
        $nextTick: (e) => e.n || (e.n = Nr.bind(e.proxy)),
        $watch: (e) => Bi.bind(e),
    }),
    nl = {
        get({ _: e }, t) {
            const {
                ctx: n,
                setupState: s,
                data: r,
                props: o,
                accessCache: i,
                type: c,
                appContext: l,
            } = e;
            let u;
            if (t[0] !== "$") {
                const y = i[t];
                if (y !== void 0)
                    switch (y) {
                        case 1:
                            return s[t];
                        case 2:
                            return r[t];
                        case 4:
                            return n[t];
                        case 3:
                            return o[t];
                    }
                else {
                    if (s !== te && D(s, t)) return (i[t] = 1), s[t];
                    if (r !== te && D(r, t)) return (i[t] = 2), r[t];
                    if ((u = e.propsOptions[0]) && D(u, t))
                        return (i[t] = 3), o[t];
                    if (n !== te && D(n, t)) return (i[t] = 4), n[t];
                    Qn && (i[t] = 0);
                }
            }
            const f = pn[t];
            let p, h;
            if (f) return t === "$attrs" && xe(e, "get", t), f(e);
            if ((p = c.__cssModules) && (p = p[t])) return p;
            if (n !== te && D(n, t)) return (i[t] = 4), n[t];
            if (((h = l.config.globalProperties), D(h, t))) return h[t];
        },
        set({ _: e }, t, n) {
            const { data: s, setupState: r, ctx: o } = e;
            return r !== te && D(r, t)
                ? ((r[t] = n), !0)
                : s !== te && D(s, t)
                ? ((s[t] = n), !0)
                : D(e.props, t) || (t[0] === "$" && t.slice(1) in e)
                ? !1
                : ((o[t] = n), !0);
        },
        has(
            {
                _: {
                    data: e,
                    setupState: t,
                    accessCache: n,
                    ctx: s,
                    appContext: r,
                    propsOptions: o,
                },
            },
            i
        ) {
            let c;
            return (
                !!n[i] ||
                (e !== te && D(e, i)) ||
                (t !== te && D(t, i)) ||
                ((c = o[0]) && D(c, i)) ||
                D(s, i) ||
                D(pn, i) ||
                D(r.config.globalProperties, i)
            );
        },
        defineProperty(e, t, n) {
            return (
                n.get != null
                    ? (e._.accessCache[t] = 0)
                    : D(n, "value") && this.set(e, t, n.value, null),
                Reflect.defineProperty(e, t, n)
            );
        },
    };
let Qn = !0;
function sl(e) {
    const t = ro(e),
        n = e.proxy,
        s = e.ctx;
    (Qn = !1), t.beforeCreate && zs(t.beforeCreate, e, "bc");
    const {
        data: r,
        computed: o,
        methods: i,
        watch: c,
        provide: l,
        inject: u,
        created: f,
        beforeMount: p,
        mounted: h,
        beforeUpdate: y,
        updated: R,
        activated: S,
        deactivated: O,
        beforeDestroy: P,
        beforeUnmount: F,
        destroyed: U,
        unmounted: q,
        render: oe,
        renderTracked: de,
        renderTriggered: be,
        errorCaptured: K,
        serverPrefetch: ne,
        expose: re,
        inheritAttrs: ae,
        components: ue,
        directives: Oe,
        filters: Qe,
    } = t;
    if ((u && rl(u, s, null, e.appContext.config.unwrapInjectedRef), i))
        for (const Z in i) {
            const Y = i[Z];
            B(Y) && (s[Z] = Y.bind(n));
        }
    if (r) {
        const Z = r.call(n, n);
        me(Z) && (e.data = Gt(Z));
    }
    if (((Qn = !0), o))
        for (const Z in o) {
            const Y = o[Z],
                ye = B(Y) ? Y.bind(n, n) : B(Y.get) ? Y.get.bind(n, n) : He,
                mt = !B(Y) && B(Y.set) ? Y.set.bind(n) : He,
                ze = Le({ get: ye, set: mt });
            Object.defineProperty(s, Z, {
                enumerable: !0,
                configurable: !0,
                get: () => ze.value,
                set: ($e) => (ze.value = $e),
            });
        }
    if (c) for (const Z in c) so(c[Z], s, n, Z);
    if (l) {
        const Z = B(l) ? l.call(n) : l;
        Reflect.ownKeys(Z).forEach((Y) => {
            on(Y, Z[Y]);
        });
    }
    f && zs(f, e, "c");
    function le(Z, Y) {
        L(Y) ? Y.forEach((ye) => Z(ye.bind(n))) : Y && Z(Y.bind(n));
    }
    if (
        (le(Vi, p),
        le(Xr, h),
        le(Yi, y),
        le(Qi, R),
        le(Di, S),
        le(Wi, O),
        le(Zi, K),
        le(Xi, de),
        le(Gi, be),
        le(Zr, F),
        le(eo, q),
        le(Ji, ne),
        L(re))
    )
        if (re.length) {
            const Z = e.exposed || (e.exposed = {});
            re.forEach((Y) => {
                Object.defineProperty(Z, Y, {
                    get: () => n[Y],
                    set: (ye) => (n[Y] = ye),
                });
            });
        } else e.exposed || (e.exposed = {});
    oe && e.render === He && (e.render = oe),
        ae != null && (e.inheritAttrs = ae),
        ue && (e.components = ue),
        Oe && (e.directives = Oe);
}
function rl(e, t, n, s = !1) {
    L(e) && (e = Jn(e));
    for (const r in e) {
        const o = e[r];
        let i;
        me(o)
            ? "default" in o
                ? (i = ot(o.from || r, o.default, !0))
                : (i = ot(o.from || r))
            : (i = ot(o)),
            fe(i) && s
                ? Object.defineProperty(t, r, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => i.value,
                      set: (c) => (i.value = c),
                  })
                : (t[r] = i);
    }
}
function zs(e, t, n) {
    Pe(L(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function so(e, t, n, s) {
    const r = s.includes(".") ? Vr(n, s) : () => n[s];
    if (ge(e)) {
        const o = t[e];
        B(o) && ln(r, o);
    } else if (B(e)) ln(r, e.bind(n));
    else if (me(e))
        if (L(e)) e.forEach((o) => so(o, t, n, s));
        else {
            const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
            B(o) && ln(r, o, e);
        }
}
function ro(e) {
    const t = e.type,
        { mixins: n, extends: s } = t,
        {
            mixins: r,
            optionsCache: o,
            config: { optionMergeStrategies: i },
        } = e.appContext,
        c = o.get(t);
    let l;
    return (
        c
            ? (l = c)
            : !r.length && !n && !s
            ? (l = t)
            : ((l = {}),
              r.length && r.forEach((u) => gn(l, u, i, !0)),
              gn(l, t, i)),
        o.set(t, l),
        l
    );
}
function gn(e, t, n, s = !1) {
    const { mixins: r, extends: o } = t;
    o && gn(e, o, n, !0), r && r.forEach((i) => gn(e, i, n, !0));
    for (const i in t)
        if (!(s && i === "expose")) {
            const c = ol[i] || (n && n[i]);
            e[i] = c ? c(e[i], t[i]) : t[i];
        }
    return e;
}
const ol = {
    data: Ks,
    props: ut,
    emits: ut,
    methods: ut,
    computed: ut,
    beforeCreate: _e,
    created: _e,
    beforeMount: _e,
    mounted: _e,
    beforeUpdate: _e,
    updated: _e,
    beforeDestroy: _e,
    beforeUnmount: _e,
    destroyed: _e,
    unmounted: _e,
    activated: _e,
    deactivated: _e,
    errorCaptured: _e,
    serverPrefetch: _e,
    components: ut,
    directives: ut,
    watch: ll,
    provide: Ks,
    inject: il,
};
function Ks(e, t) {
    return t
        ? e
            ? function () {
                  return pe(
                      B(e) ? e.call(this, this) : e,
                      B(t) ? t.call(this, this) : t
                  );
              }
            : t
        : e;
}
function il(e, t) {
    return ut(Jn(e), Jn(t));
}
function Jn(e) {
    if (L(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function _e(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function ut(e, t) {
    return e ? pe(pe(Object.create(null), e), t) : t;
}
function ll(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = pe(Object.create(null), e);
    for (const s in t) n[s] = _e(e[s], t[s]);
    return n;
}
function cl(e, t, n, s = !1) {
    const r = {},
        o = {};
    fn(o, On, 1), (e.propsDefaults = Object.create(null)), oo(e, t, r, o);
    for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
    n
        ? (e.props = s ? r : Ei(r))
        : e.type.props
        ? (e.props = r)
        : (e.props = o),
        (e.attrs = o);
}
function al(e, t, n, s) {
    const {
            props: r,
            attrs: o,
            vnode: { patchFlag: i },
        } = e,
        c = V(r),
        [l] = e.propsOptions;
    let u = !1;
    if ((s || i > 0) && !(i & 16)) {
        if (i & 8) {
            const f = e.vnode.dynamicProps;
            for (let p = 0; p < f.length; p++) {
                let h = f[p];
                if (Cn(e.emitsOptions, h)) continue;
                const y = t[h];
                if (l)
                    if (D(o, h)) y !== o[h] && ((o[h] = y), (u = !0));
                    else {
                        const R = Be(h);
                        r[R] = Gn(l, c, R, y, e, !1);
                    }
                else y !== o[h] && ((o[h] = y), (u = !0));
            }
        }
    } else {
        oo(e, t, r, o) && (u = !0);
        let f;
        for (const p in c)
            (!t || (!D(t, p) && ((f = Ot(p)) === p || !D(t, f)))) &&
                (l
                    ? n &&
                      (n[p] !== void 0 || n[f] !== void 0) &&
                      (r[p] = Gn(l, c, p, void 0, e, !0))
                    : delete r[p]);
        if (o !== c)
            for (const p in o)
                (!t || (!D(t, p) && !0)) && (delete o[p], (u = !0));
    }
    u && De(e, "set", "$attrs");
}
function oo(e, t, n, s) {
    const [r, o] = e.propsOptions;
    let i = !1,
        c;
    if (t)
        for (let l in t) {
            if (rn(l)) continue;
            const u = t[l];
            let f;
            r && D(r, (f = Be(l)))
                ? !o || !o.includes(f)
                    ? (n[f] = u)
                    : ((c || (c = {}))[f] = u)
                : Cn(e.emitsOptions, l) ||
                  ((!(l in s) || u !== s[l]) && ((s[l] = u), (i = !0)));
        }
    if (o) {
        const l = V(n),
            u = c || te;
        for (let f = 0; f < o.length; f++) {
            const p = o[f];
            n[p] = Gn(r, l, p, u[p], e, !D(u, p));
        }
    }
    return i;
}
function Gn(e, t, n, s, r, o) {
    const i = e[n];
    if (i != null) {
        const c = D(i, "default");
        if (c && s === void 0) {
            const l = i.default;
            if (i.type !== Function && B(l)) {
                const { propsDefaults: u } = r;
                n in u
                    ? (s = u[n])
                    : (At(r), (s = u[n] = l.call(null, t)), pt());
            } else s = l;
        }
        i[0] &&
            (o && !c
                ? (s = !1)
                : i[1] && (s === "" || s === Ot(n)) && (s = !0));
    }
    return s;
}
function io(e, t, n = !1) {
    const s = t.propsCache,
        r = s.get(e);
    if (r) return r;
    const o = e.props,
        i = {},
        c = [];
    let l = !1;
    if (!B(e)) {
        const f = (p) => {
            l = !0;
            const [h, y] = io(p, t, !0);
            pe(i, h), y && c.push(...y);
        };
        !n && t.mixins.length && t.mixins.forEach(f),
            e.extends && f(e.extends),
            e.mixins && e.mixins.forEach(f);
    }
    if (!o && !l) return s.set(e, xt), xt;
    if (L(o))
        for (let f = 0; f < o.length; f++) {
            const p = Be(o[f]);
            Us(p) && (i[p] = te);
        }
    else if (o)
        for (const f in o) {
            const p = Be(f);
            if (Us(p)) {
                const h = o[f],
                    y = (i[p] = L(h) || B(h) ? { type: h } : h);
                if (y) {
                    const R = qs(Boolean, y.type),
                        S = qs(String, y.type);
                    (y[0] = R > -1),
                        (y[1] = S < 0 || R < S),
                        (R > -1 || D(y, "default")) && c.push(p);
                }
            }
        }
    const u = [i, c];
    return s.set(e, u), u;
}
function Us(e) {
    return e[0] !== "$";
}
function Ds(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : "";
}
function Ws(e, t) {
    return Ds(e) === Ds(t);
}
function qs(e, t) {
    return L(t) ? t.findIndex((n) => Ws(n, e)) : B(t) && Ws(t, e) ? 0 : -1;
}
const lo = (e) => e[0] === "_" || e === "$stable",
    ys = (e) => (L(e) ? e.map(Ne) : [Ne(e)]),
    ul = (e, t, n) => {
        if (t._n) return t;
        const s = et((...r) => ys(t(...r)), n);
        return (s._c = !1), s;
    },
    co = (e, t, n) => {
        const s = e._ctx;
        for (const r in e) {
            if (lo(r)) continue;
            const o = e[r];
            if (B(o)) t[r] = ul(r, o, s);
            else if (o != null) {
                const i = ys(o);
                t[r] = () => i;
            }
        }
    },
    ao = (e, t) => {
        const n = ys(t);
        e.slots.default = () => n;
    },
    fl = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? ((e.slots = V(t)), fn(t, "_", n)) : co(t, (e.slots = {}));
        } else (e.slots = {}), t && ao(e, t);
        fn(e.slots, On, 1);
    },
    dl = (e, t, n) => {
        const { vnode: s, slots: r } = e;
        let o = !0,
            i = te;
        if (s.shapeFlag & 32) {
            const c = t._;
            c
                ? n && c === 1
                    ? (o = !1)
                    : (pe(r, t), !n && c === 1 && delete r._)
                : ((o = !t.$stable), co(t, r)),
                (i = t);
        } else t && (ao(e, t), (i = { default: 1 }));
        if (o) for (const c in r) !lo(c) && !(c in i) && delete r[c];
    };
function uo() {
    return {
        app: null,
        config: {
            isNativeTag: No,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let hl = 0;
function pl(e, t) {
    return function (s, r = null) {
        B(s) || (s = Object.assign({}, s)), r != null && !me(r) && (r = null);
        const o = uo(),
            i = new Set();
        let c = !1;
        const l = (o.app = {
            _uid: hl++,
            _component: s,
            _props: r,
            _container: null,
            _context: o,
            _instance: null,
            version: Ml,
            get config() {
                return o.config;
            },
            set config(u) {},
            use(u, ...f) {
                return (
                    i.has(u) ||
                        (u && B(u.install)
                            ? (i.add(u), u.install(l, ...f))
                            : B(u) && (i.add(u), u(l, ...f))),
                    l
                );
            },
            mixin(u) {
                return o.mixins.includes(u) || o.mixins.push(u), l;
            },
            component(u, f) {
                return f ? ((o.components[u] = f), l) : o.components[u];
            },
            directive(u, f) {
                return f ? ((o.directives[u] = f), l) : o.directives[u];
            },
            mount(u, f, p) {
                if (!c) {
                    const h = ie(s, r);
                    return (
                        (h.appContext = o),
                        f && t ? t(h, u) : e(h, u, p),
                        (c = !0),
                        (l._container = u),
                        (u.__vue_app__ = l),
                        xs(h.component) || h.component.proxy
                    );
                }
            },
            unmount() {
                c && (e(null, l._container), delete l._container.__vue_app__);
            },
            provide(u, f) {
                return (o.provides[u] = f), l;
            },
        });
        return l;
    };
}
function Xn(e, t, n, s, r = !1) {
    if (L(e)) {
        e.forEach((h, y) => Xn(h, t && (L(t) ? t[y] : t), n, s, r));
        return;
    }
    if (cn(s) && !r) return;
    const o = s.shapeFlag & 4 ? xs(s.component) || s.component.proxy : s.el,
        i = r ? null : o,
        { i: c, r: l } = e,
        u = t && t.r,
        f = c.refs === te ? (c.refs = {}) : c.refs,
        p = c.setupState;
    if (
        (u != null &&
            u !== l &&
            (ge(u)
                ? ((f[u] = null), D(p, u) && (p[u] = null))
                : fe(u) && (u.value = null)),
        B(l))
    )
        rt(l, c, 12, [i, f]);
    else {
        const h = ge(l),
            y = fe(l);
        if (h || y) {
            const R = () => {
                if (e.f) {
                    const S = h ? f[l] : l.value;
                    r
                        ? L(S) && as(S, o)
                        : L(S)
                        ? S.includes(o) || S.push(o)
                        : h
                        ? ((f[l] = [o]), D(p, l) && (p[l] = f[l]))
                        : ((l.value = [o]), e.k && (f[e.k] = l.value));
                } else
                    h
                        ? ((f[l] = i), D(p, l) && (p[l] = i))
                        : fe(l) && ((l.value = i), e.k && (f[e.k] = i));
            };
            i ? ((R.id = -1), ve(R, n)) : R();
        }
    }
}
const ve = Hi;
function gl(e) {
    return ml(e);
}
function ml(e, t) {
    const n = Vo();
    n.__VUE__ = !0;
    const {
            insert: s,
            remove: r,
            patchProp: o,
            createElement: i,
            createText: c,
            createComment: l,
            setText: u,
            setElementText: f,
            parentNode: p,
            nextSibling: h,
            setScopeId: y = He,
            cloneNode: R,
            insertStaticContent: S,
        } = e,
        O = (
            a,
            d,
            g,
            v = null,
            _ = null,
            w = null,
            A = !1,
            E = null,
            x = !!d.dynamicChildren
        ) => {
            if (a === d) return;
            a && !ft(a, d) && ((v = I(a)), Ae(a, _, w, !0), (a = null)),
                d.patchFlag === -2 && ((x = !1), (d.dynamicChildren = null));
            const { type: b, ref: $, shapeFlag: T } = d;
            switch (b) {
                case Es:
                    P(a, d, g, v);
                    break;
                case Ue:
                    F(a, d, g, v);
                    break;
                case an:
                    a == null && U(d, g, v, A);
                    break;
                case he:
                    Oe(a, d, g, v, _, w, A, E, x);
                    break;
                default:
                    T & 1
                        ? de(a, d, g, v, _, w, A, E, x)
                        : T & 6
                        ? Qe(a, d, g, v, _, w, A, E, x)
                        : (T & 64 || T & 128) &&
                          b.process(a, d, g, v, _, w, A, E, x, ee);
            }
            $ != null && _ && Xn($, a && a.ref, w, d || a, !d);
        },
        P = (a, d, g, v) => {
            if (a == null) s((d.el = c(d.children)), g, v);
            else {
                const _ = (d.el = a.el);
                d.children !== a.children && u(_, d.children);
            }
        },
        F = (a, d, g, v) => {
            a == null ? s((d.el = l(d.children || "")), g, v) : (d.el = a.el);
        },
        U = (a, d, g, v) => {
            [a.el, a.anchor] = S(a.children, d, g, v, a.el, a.anchor);
        },
        q = ({ el: a, anchor: d }, g, v) => {
            let _;
            for (; a && a !== d; ) (_ = h(a)), s(a, g, v), (a = _);
            s(d, g, v);
        },
        oe = ({ el: a, anchor: d }) => {
            let g;
            for (; a && a !== d; ) (g = h(a)), r(a), (a = g);
            r(d);
        },
        de = (a, d, g, v, _, w, A, E, x) => {
            (A = A || d.type === "svg"),
                a == null
                    ? be(d, g, v, _, w, A, E, x)
                    : re(a, d, _, w, A, E, x);
        },
        be = (a, d, g, v, _, w, A, E) => {
            let x, b;
            const {
                type: $,
                props: T,
                shapeFlag: j,
                transition: M,
                patchFlag: W,
                dirs: J,
            } = a;
            if (a.el && R !== void 0 && W === -1) x = a.el = R(a.el);
            else {
                if (
                    ((x = a.el = i(a.type, w, T && T.is, T)),
                    j & 8
                        ? f(x, a.children)
                        : j & 16 &&
                          ne(
                              a.children,
                              x,
                              null,
                              v,
                              _,
                              w && $ !== "foreignObject",
                              A,
                              E
                          ),
                    J && ct(a, null, v, "created"),
                    T)
                ) {
                    for (const se in T)
                        se !== "value" &&
                            !rn(se) &&
                            o(x, se, null, T[se], w, a.children, v, _, C);
                    "value" in T && o(x, "value", null, T.value),
                        (b = T.onVnodeBeforeMount) && Me(b, v, a);
                }
                K(x, a, a.scopeId, A, v);
            }
            J && ct(a, null, v, "beforeMount");
            const G = (!_ || (_ && !_.pendingBranch)) && M && !M.persisted;
            G && M.beforeEnter(x),
                s(x, d, g),
                ((b = T && T.onVnodeMounted) || G || J) &&
                    ve(() => {
                        b && Me(b, v, a),
                            G && M.enter(x),
                            J && ct(a, null, v, "mounted");
                    }, _);
        },
        K = (a, d, g, v, _) => {
            if ((g && y(a, g), v))
                for (let w = 0; w < v.length; w++) y(a, v[w]);
            if (_) {
                let w = _.subTree;
                if (d === w) {
                    const A = _.vnode;
                    K(a, A, A.scopeId, A.slotScopeIds, _.parent);
                }
            }
        },
        ne = (a, d, g, v, _, w, A, E, x = 0) => {
            for (let b = x; b < a.length; b++) {
                const $ = (a[b] = E ? tt(a[b]) : Ne(a[b]));
                O(null, $, d, g, v, _, w, A, E);
            }
        },
        re = (a, d, g, v, _, w, A) => {
            const E = (d.el = a.el);
            let { patchFlag: x, dynamicChildren: b, dirs: $ } = d;
            x |= a.patchFlag & 16;
            const T = a.props || te,
                j = d.props || te;
            let M;
            g && at(g, !1),
                (M = j.onVnodeBeforeUpdate) && Me(M, g, d, a),
                $ && ct(d, a, g, "beforeUpdate"),
                g && at(g, !0);
            const W = _ && d.type !== "foreignObject";
            if (
                (b
                    ? ae(a.dynamicChildren, b, E, g, v, W, w)
                    : A || ye(a, d, E, null, g, v, W, w, !1),
                x > 0)
            ) {
                if (x & 16) ue(E, d, T, j, g, v, _);
                else if (
                    (x & 2 &&
                        T.class !== j.class &&
                        o(E, "class", null, j.class, _),
                    x & 4 && o(E, "style", T.style, j.style, _),
                    x & 8)
                ) {
                    const J = d.dynamicProps;
                    for (let G = 0; G < J.length; G++) {
                        const se = J[G],
                            Te = T[se],
                            _t = j[se];
                        (_t !== Te || se === "value") &&
                            o(E, se, Te, _t, _, a.children, g, v, C);
                    }
                }
                x & 1 && a.children !== d.children && f(E, d.children);
            } else !A && b == null && ue(E, d, T, j, g, v, _);
            ((M = j.onVnodeUpdated) || $) &&
                ve(() => {
                    M && Me(M, g, d, a), $ && ct(d, a, g, "updated");
                }, v);
        },
        ae = (a, d, g, v, _, w, A) => {
            for (let E = 0; E < d.length; E++) {
                const x = a[E],
                    b = d[E],
                    $ =
                        x.el && (x.type === he || !ft(x, b) || x.shapeFlag & 70)
                            ? p(x.el)
                            : g;
                O(x, b, $, null, v, _, w, A, !0);
            }
        },
        ue = (a, d, g, v, _, w, A) => {
            if (g !== v) {
                for (const E in v) {
                    if (rn(E)) continue;
                    const x = v[E],
                        b = g[E];
                    x !== b &&
                        E !== "value" &&
                        o(a, E, b, x, A, d.children, _, w, C);
                }
                if (g !== te)
                    for (const E in g)
                        !rn(E) &&
                            !(E in v) &&
                            o(a, E, g[E], null, A, d.children, _, w, C);
                "value" in v && o(a, "value", g.value, v.value);
            }
        },
        Oe = (a, d, g, v, _, w, A, E, x) => {
            const b = (d.el = a ? a.el : c("")),
                $ = (d.anchor = a ? a.anchor : c(""));
            let { patchFlag: T, dynamicChildren: j, slotScopeIds: M } = d;
            M && (E = E ? E.concat(M) : M),
                a == null
                    ? (s(b, g, v),
                      s($, g, v),
                      ne(d.children, g, $, _, w, A, E, x))
                    : T > 0 && T & 64 && j && a.dynamicChildren
                    ? (ae(a.dynamicChildren, j, g, _, w, A, E),
                      (d.key != null || (_ && d === _.subTree)) && fo(a, d, !0))
                    : ye(a, d, g, $, _, w, A, E, x);
        },
        Qe = (a, d, g, v, _, w, A, E, x) => {
            (d.slotScopeIds = E),
                a == null
                    ? d.shapeFlag & 512
                        ? _.ctx.activate(d, g, v, A, x)
                        : gt(d, g, v, _, w, A, x)
                    : le(a, d, x);
        },
        gt = (a, d, g, v, _, w, A) => {
            const E = (a.component = Pl(a, v, _));
            if ((Rn(a) && (E.ctx.renderer = ee), Tl(E), E.asyncDep)) {
                if ((_ && _.registerDep(E, Z), !a.el)) {
                    const x = (E.subTree = ie(Ue));
                    F(null, x, d, g);
                }
                return;
            }
            Z(E, a, d, g, _, w, A);
        },
        le = (a, d, g) => {
            const v = (d.component = a.component);
            if (Fi(a, d, g))
                if (v.asyncDep && !v.asyncResolved) {
                    Y(v, d, g);
                    return;
                } else (v.next = d), ki(v.update), v.update();
            else (d.el = a.el), (v.vnode = d);
        },
        Z = (a, d, g, v, _, w, A) => {
            const E = () => {
                    if (a.isMounted) {
                        let { next: $, bu: T, u: j, parent: M, vnode: W } = a,
                            J = $,
                            G;
                        at(a, !1),
                            $ ? (($.el = W.el), Y(a, $, A)) : ($ = W),
                            T && Sn(T),
                            (G = $.props && $.props.onVnodeBeforeUpdate) &&
                                Me(G, M, $, W),
                            at(a, !0);
                        const se = $n(a),
                            Te = a.subTree;
                        (a.subTree = se),
                            O(Te, se, p(Te.el), I(Te), a, _, w),
                            ($.el = se.el),
                            J === null && Ni(a, se.el),
                            j && ve(j, _),
                            (G = $.props && $.props.onVnodeUpdated) &&
                                ve(() => Me(G, M, $, W), _);
                    } else {
                        let $;
                        const { el: T, props: j } = d,
                            { bm: M, m: W, parent: J } = a,
                            G = cn(d);
                        if (
                            (at(a, !1),
                            M && Sn(M),
                            !G &&
                                ($ = j && j.onVnodeBeforeMount) &&
                                Me($, J, d),
                            at(a, !0),
                            T && N)
                        ) {
                            const se = () => {
                                (a.subTree = $n(a)),
                                    N(T, a.subTree, a, _, null);
                            };
                            G
                                ? d.type
                                      .__asyncLoader()
                                      .then(() => !a.isUnmounted && se())
                                : se();
                        } else {
                            const se = (a.subTree = $n(a));
                            O(null, se, g, v, a, _, w), (d.el = se.el);
                        }
                        if (
                            (W && ve(W, _), !G && ($ = j && j.onVnodeMounted))
                        ) {
                            const se = d;
                            ve(() => Me($, J, se), _);
                        }
                        (d.shapeFlag & 256 ||
                            (J && cn(J.vnode) && J.vnode.shapeFlag & 256)) &&
                            a.a &&
                            ve(a.a, _),
                            (a.isMounted = !0),
                            (d = g = v = null);
                    }
                },
                x = (a.effect = new hs(E, () => Lr(b), a.scope)),
                b = (a.update = () => x.run());
            (b.id = a.uid), at(a, !0), b();
        },
        Y = (a, d, g) => {
            d.component = a;
            const v = a.vnode.props;
            (a.vnode = d),
                (a.next = null),
                al(a, d.props, v, g),
                dl(a, d.children, g),
                Tt(),
                xn(void 0, a.update),
                kt();
        },
        ye = (a, d, g, v, _, w, A, E, x = !1) => {
            const b = a && a.children,
                $ = a ? a.shapeFlag : 0,
                T = d.children,
                { patchFlag: j, shapeFlag: M } = d;
            if (j > 0) {
                if (j & 128) {
                    ze(b, T, g, v, _, w, A, E, x);
                    return;
                } else if (j & 256) {
                    mt(b, T, g, v, _, w, A, E, x);
                    return;
                }
            }
            M & 8
                ? ($ & 16 && C(b, _, w), T !== b && f(g, T))
                : $ & 16
                ? M & 16
                    ? ze(b, T, g, v, _, w, A, E, x)
                    : C(b, _, w, !0)
                : ($ & 8 && f(g, ""), M & 16 && ne(T, g, v, _, w, A, E, x));
        },
        mt = (a, d, g, v, _, w, A, E, x) => {
            (a = a || xt), (d = d || xt);
            const b = a.length,
                $ = d.length,
                T = Math.min(b, $);
            let j;
            for (j = 0; j < T; j++) {
                const M = (d[j] = x ? tt(d[j]) : Ne(d[j]));
                O(a[j], M, g, null, _, w, A, E, x);
            }
            b > $ ? C(a, _, w, !0, !1, T) : ne(d, g, v, _, w, A, E, x, T);
        },
        ze = (a, d, g, v, _, w, A, E, x) => {
            let b = 0;
            const $ = d.length;
            let T = a.length - 1,
                j = $ - 1;
            for (; b <= T && b <= j; ) {
                const M = a[b],
                    W = (d[b] = x ? tt(d[b]) : Ne(d[b]));
                if (ft(M, W)) O(M, W, g, null, _, w, A, E, x);
                else break;
                b++;
            }
            for (; b <= T && b <= j; ) {
                const M = a[T],
                    W = (d[j] = x ? tt(d[j]) : Ne(d[j]));
                if (ft(M, W)) O(M, W, g, null, _, w, A, E, x);
                else break;
                T--, j--;
            }
            if (b > T) {
                if (b <= j) {
                    const M = j + 1,
                        W = M < $ ? d[M].el : v;
                    for (; b <= j; )
                        O(
                            null,
                            (d[b] = x ? tt(d[b]) : Ne(d[b])),
                            g,
                            W,
                            _,
                            w,
                            A,
                            E,
                            x
                        ),
                            b++;
                }
            } else if (b > j) for (; b <= T; ) Ae(a[b], _, w, !0), b++;
            else {
                const M = b,
                    W = b,
                    J = new Map();
                for (b = W; b <= j; b++) {
                    const Ee = (d[b] = x ? tt(d[b]) : Ne(d[b]));
                    Ee.key != null && J.set(Ee.key, b);
                }
                let G,
                    se = 0;
                const Te = j - W + 1;
                let _t = !1,
                    Rs = 0;
                const $t = new Array(Te);
                for (b = 0; b < Te; b++) $t[b] = 0;
                for (b = M; b <= T; b++) {
                    const Ee = a[b];
                    if (se >= Te) {
                        Ae(Ee, _, w, !0);
                        continue;
                    }
                    let je;
                    if (Ee.key != null) je = J.get(Ee.key);
                    else
                        for (G = W; G <= j; G++)
                            if ($t[G - W] === 0 && ft(Ee, d[G])) {
                                je = G;
                                break;
                            }
                    je === void 0
                        ? Ae(Ee, _, w, !0)
                        : (($t[je - W] = b + 1),
                          je >= Rs ? (Rs = je) : (_t = !0),
                          O(Ee, d[je], g, null, _, w, A, E, x),
                          se++);
                }
                const Ps = _t ? _l($t) : xt;
                for (G = Ps.length - 1, b = Te - 1; b >= 0; b--) {
                    const Ee = W + b,
                        je = d[Ee],
                        Os = Ee + 1 < $ ? d[Ee + 1].el : v;
                    $t[b] === 0
                        ? O(null, je, g, Os, _, w, A, E, x)
                        : _t && (G < 0 || b !== Ps[G] ? $e(je, g, Os, 2) : G--);
                }
            }
        },
        $e = (a, d, g, v, _ = null) => {
            const {
                el: w,
                type: A,
                transition: E,
                children: x,
                shapeFlag: b,
            } = a;
            if (b & 6) {
                $e(a.component.subTree, d, g, v);
                return;
            }
            if (b & 128) {
                a.suspense.move(d, g, v);
                return;
            }
            if (b & 64) {
                A.move(a, d, g, ee);
                return;
            }
            if (A === he) {
                s(w, d, g);
                for (let T = 0; T < x.length; T++) $e(x[T], d, g, v);
                s(a.anchor, d, g);
                return;
            }
            if (A === an) {
                q(a, d, g);
                return;
            }
            if (v !== 2 && b & 1 && E)
                if (v === 0)
                    E.beforeEnter(w), s(w, d, g), ve(() => E.enter(w), _);
                else {
                    const { leave: T, delayLeave: j, afterLeave: M } = E,
                        W = () => s(w, d, g),
                        J = () => {
                            T(w, () => {
                                W(), M && M();
                            });
                        };
                    j ? j(w, W, J) : J();
                }
            else s(w, d, g);
        },
        Ae = (a, d, g, v = !1, _ = !1) => {
            const {
                type: w,
                props: A,
                ref: E,
                children: x,
                dynamicChildren: b,
                shapeFlag: $,
                patchFlag: T,
                dirs: j,
            } = a;
            if ((E != null && Xn(E, null, g, a, !0), $ & 256)) {
                d.ctx.deactivate(a);
                return;
            }
            const M = $ & 1 && j,
                W = !cn(a);
            let J;
            if ((W && (J = A && A.onVnodeBeforeUnmount) && Me(J, d, a), $ & 6))
                k(a.component, g, v);
            else {
                if ($ & 128) {
                    a.suspense.unmount(g, v);
                    return;
                }
                M && ct(a, null, d, "beforeUnmount"),
                    $ & 64
                        ? a.type.remove(a, d, g, _, ee, v)
                        : b && (w !== he || (T > 0 && T & 64))
                        ? C(b, d, g, !1, !0)
                        : ((w === he && T & 384) || (!_ && $ & 16)) &&
                          C(x, d, g),
                    v && kn(a);
            }
            ((W && (J = A && A.onVnodeUnmounted)) || M) &&
                ve(() => {
                    J && Me(J, d, a), M && ct(a, null, d, "unmounted");
                }, g);
        },
        kn = (a) => {
            const { type: d, el: g, anchor: v, transition: _ } = a;
            if (d === he) {
                m(g, v);
                return;
            }
            if (d === an) {
                oe(a);
                return;
            }
            const w = () => {
                r(g), _ && !_.persisted && _.afterLeave && _.afterLeave();
            };
            if (a.shapeFlag & 1 && _ && !_.persisted) {
                const { leave: A, delayLeave: E } = _,
                    x = () => A(g, w);
                E ? E(a.el, w, x) : x();
            } else w();
        },
        m = (a, d) => {
            let g;
            for (; a !== d; ) (g = h(a)), r(a), (a = g);
            r(d);
        },
        k = (a, d, g) => {
            const { bum: v, scope: _, update: w, subTree: A, um: E } = a;
            v && Sn(v),
                _.stop(),
                w && ((w.active = !1), Ae(A, a, d, g)),
                E && ve(E, d),
                ve(() => {
                    a.isUnmounted = !0;
                }, d),
                d &&
                    d.pendingBranch &&
                    !d.isUnmounted &&
                    a.asyncDep &&
                    !a.asyncResolved &&
                    a.suspenseId === d.pendingId &&
                    (d.deps--, d.deps === 0 && d.resolve());
        },
        C = (a, d, g, v = !1, _ = !1, w = 0) => {
            for (let A = w; A < a.length; A++) Ae(a[A], d, g, v, _);
        },
        I = (a) =>
            a.shapeFlag & 6
                ? I(a.component.subTree)
                : a.shapeFlag & 128
                ? a.suspense.next()
                : h(a.anchor || a.el),
        Q = (a, d, g) => {
            a == null
                ? d._vnode && Ae(d._vnode, null, null, !0)
                : O(d._vnode || null, a, d, null, null, null, g),
                zr(),
                (d._vnode = a);
        },
        ee = {
            p: O,
            um: Ae,
            m: $e,
            r: kn,
            mt: gt,
            mc: ne,
            pc: ye,
            pbc: ae,
            n: I,
            o: e,
        };
    let z, N;
    return (
        t && ([z, N] = t(ee)), { render: Q, hydrate: z, createApp: pl(Q, z) }
    );
}
function at({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function fo(e, t, n = !1) {
    const s = e.children,
        r = t.children;
    if (L(s) && L(r))
        for (let o = 0; o < s.length; o++) {
            const i = s[o];
            let c = r[o];
            c.shapeFlag & 1 &&
                !c.dynamicChildren &&
                ((c.patchFlag <= 0 || c.patchFlag === 32) &&
                    ((c = r[o] = tt(r[o])), (c.el = i.el)),
                n || fo(i, c));
        }
}
function _l(e) {
    const t = e.slice(),
        n = [0];
    let s, r, o, i, c;
    const l = e.length;
    for (s = 0; s < l; s++) {
        const u = e[s];
        if (u !== 0) {
            if (((r = n[n.length - 1]), e[r] < u)) {
                (t[s] = r), n.push(s);
                continue;
            }
            for (o = 0, i = n.length - 1; o < i; )
                (c = (o + i) >> 1), e[n[c]] < u ? (o = c + 1) : (i = c);
            u < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
    return n;
}
const vl = (e) => e.__isTeleport,
    he = Symbol(void 0),
    Es = Symbol(void 0),
    Ue = Symbol(void 0),
    an = Symbol(void 0),
    zt = [];
let Se = null;
function qe(e = !1) {
    zt.push((Se = e ? null : []));
}
function bl() {
    zt.pop(), (Se = zt[zt.length - 1] || null);
}
let Yt = 1;
function Vs(e) {
    Yt += e;
}
function yl(e) {
    return (
        (e.dynamicChildren = Yt > 0 ? Se || xt : null),
        bl(),
        Yt > 0 && Se && Se.push(e),
        e
    );
}
function Ve(e, t, n, s, r, o) {
    return yl(H(e, t, n, s, r, o, !0));
}
function Zn(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function ft(e, t) {
    return e.type === t.type && e.key === t.key;
}
const On = "__vInternal",
    ho = ({ key: e }) => (e != null ? e : null),
    un = ({ ref: e, ref_key: t, ref_for: n }) =>
        e != null
            ? ge(e) || fe(e) || B(e)
                ? { i: Ie, r: e, k: t, f: !!n }
                : e
            : null;
function H(
    e,
    t = null,
    n = null,
    s = 0,
    r = null,
    o = e === he ? 0 : 1,
    i = !1,
    c = !1
) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && ho(t),
        ref: t && un(t),
        scopeId: An,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: o,
        patchFlag: s,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
    };
    return (
        c
            ? (ws(l, n), o & 128 && e.normalize(l))
            : n && (l.shapeFlag |= ge(n) ? 8 : 16),
        Yt > 0 &&
            !i &&
            Se &&
            (l.patchFlag > 0 || o & 6) &&
            l.patchFlag !== 32 &&
            Se.push(l),
        l
    );
}
const ie = El;
function El(e, t = null, n = null, s = 0, r = null, o = !1) {
    if (((!e || e === el) && (e = Ue), Zn(e))) {
        const c = lt(e, t, !0);
        return (
            n && ws(c, n),
            Yt > 0 &&
                !o &&
                Se &&
                (c.shapeFlag & 6 ? (Se[Se.indexOf(e)] = c) : Se.push(c)),
            (c.patchFlag |= -2),
            c
        );
    }
    if ((jl(e) && (e = e.__vccOpts), t)) {
        t = wl(t);
        let { class: c, style: l } = t;
        c && !ge(c) && (t.class = ls(c)),
            me(l) && (kr(l) && !L(l) && (l = pe({}, l)), (t.style = is(l)));
    }
    const i = ge(e) ? 1 : Li(e) ? 128 : vl(e) ? 64 : me(e) ? 4 : B(e) ? 2 : 0;
    return H(e, t, n, s, r, i, o, !0);
}
function wl(e) {
    return e ? (kr(e) || On in e ? pe({}, e) : e) : null;
}
function lt(e, t, n = !1) {
    const { props: s, ref: r, patchFlag: o, children: i } = e,
        c = t ? Cl(s || {}, t) : s;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && ho(c),
        ref:
            t && t.ref
                ? n && r
                    ? L(r)
                        ? r.concat(un(t))
                        : [r, un(t)]
                    : un(t)
                : r,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: i,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== he ? (o === -1 ? 16 : o | 16) : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && lt(e.ssContent),
        ssFallback: e.ssFallback && lt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
    };
}
function Ce(e = " ", t = 0) {
    return ie(Es, null, e, t);
}
function xl(e, t) {
    const n = ie(an, null, e);
    return (n.staticCount = t), n;
}
function Ne(e) {
    return e == null || typeof e == "boolean"
        ? ie(Ue)
        : L(e)
        ? ie(he, null, e.slice())
        : typeof e == "object"
        ? tt(e)
        : ie(Es, null, String(e));
}
function tt(e) {
    return e.el === null || e.memo ? e : lt(e);
}
function ws(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t == null) t = null;
    else if (L(t)) n = 16;
    else if (typeof t == "object")
        if (s & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1), ws(e, r()), r._c && (r._d = !0));
            return;
        } else {
            n = 32;
            const r = t._;
            !r && !(On in t)
                ? (t._ctx = Ie)
                : r === 3 &&
                  Ie &&
                  (Ie.slots._ === 1
                      ? (t._ = 1)
                      : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else
        B(t)
            ? ((t = { default: t, _ctx: Ie }), (n = 32))
            : ((t = String(t)), s & 64 ? ((n = 16), (t = [Ce(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function Cl(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === "class")
                t.class !== s.class && (t.class = ls([t.class, s.class]));
            else if (r === "style") t.style = is([t.style, s.style]);
            else if (_n(r)) {
                const o = t[r],
                    i = s[r];
                i &&
                    o !== i &&
                    !(L(o) && o.includes(i)) &&
                    (t[r] = o ? [].concat(o, i) : i);
            } else r !== "" && (t[r] = s[r]);
    }
    return t;
}
function Me(e, t, n, s = null) {
    Pe(e, t, 7, [n, s]);
}
const Al = uo();
let Rl = 0;
function Pl(e, t, n) {
    const s = e.type,
        r = (t ? t.appContext : e.appContext) || Al,
        o = {
            uid: Rl++,
            vnode: e,
            type: s,
            parent: t,
            appContext: r,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Yo(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(r.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: io(s, r),
            emitsOptions: Ur(s, r),
            emit: null,
            emitted: null,
            propsDefaults: te,
            inheritAttrs: s.inheritAttrs,
            ctx: te,
            data: te,
            props: te,
            attrs: te,
            slots: te,
            refs: te,
            setupState: te,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null,
        };
    return (
        (o.ctx = { _: o }),
        (o.root = t ? t.root : o),
        (o.emit = $i.bind(null, o)),
        e.ce && e.ce(o),
        o
    );
}
let ce = null;
const Ol = () => ce || Ie,
    At = (e) => {
        (ce = e), e.scope.on();
    },
    pt = () => {
        ce && ce.scope.off(), (ce = null);
    };
function po(e) {
    return e.vnode.shapeFlag & 4;
}
let Qt = !1;
function Tl(e, t = !1) {
    Qt = t;
    const { props: n, children: s } = e.vnode,
        r = po(e);
    cl(e, n, r, t), fl(e, s);
    const o = r ? kl(e, t) : void 0;
    return (Qt = !1), o;
}
function kl(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = Ir(new Proxy(e.ctx, nl)));
    const { setup: s } = n;
    if (s) {
        const r = (e.setupContext = s.length > 1 ? Sl(e) : null);
        At(e), Tt();
        const o = rt(s, e, 0, [e.props, r]);
        if ((kt(), pt(), vr(o))) {
            if ((o.then(pt, pt), t))
                return o
                    .then((i) => {
                        Ys(e, i, t);
                    })
                    .catch((i) => {
                        wn(i, e, 0);
                    });
            e.asyncDep = o;
        } else Ys(e, o, t);
    } else go(e, t);
}
function Ys(e, t, n) {
    B(t)
        ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
        : me(t) && (e.setupState = Mr(t)),
        go(e, n);
}
let Qs;
function go(e, t, n) {
    const s = e.type;
    if (!e.render) {
        if (!t && Qs && !s.render) {
            const r = s.template;
            if (r) {
                const { isCustomElement: o, compilerOptions: i } =
                        e.appContext.config,
                    { delimiters: c, compilerOptions: l } = s,
                    u = pe(pe({ isCustomElement: o, delimiters: c }, i), l);
                s.render = Qs(r, u);
            }
        }
        e.render = s.render || He;
    }
    At(e), Tt(), sl(e), kt(), pt();
}
function Il(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return xe(e, "get", "$attrs"), t[n];
        },
    });
}
function Sl(e) {
    const t = (s) => {
        e.exposed = s || {};
    };
    let n;
    return {
        get attrs() {
            return n || (n = Il(e));
        },
        slots: e.slots,
        emit: e.emit,
        expose: t,
    };
}
function xs(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(Mr(Ir(e.exposed)), {
                get(t, n) {
                    if (n in t) return t[n];
                    if (n in pn) return pn[n](e);
                },
            }))
        );
}
function $l(e) {
    return (B(e) && e.displayName) || e.name;
}
function jl(e) {
    return B(e) && "__vccOpts" in e;
}
const Le = (e, t) => Pi(e, t, Qt);
function mo(e, t, n) {
    const s = arguments.length;
    return s === 2
        ? me(t) && !L(t)
            ? Zn(t)
                ? ie(e, null, [t])
                : ie(e, t)
            : ie(e, null, t)
        : (s > 3
              ? (n = Array.prototype.slice.call(arguments, 2))
              : s === 3 && Zn(n) && (n = [n]),
          ie(e, t, n));
}
const Ml = "3.2.36",
    Fl = "http://www.w3.org/2000/svg",
    dt = typeof document != "undefined" ? document : null,
    Js = dt && dt.createElement("template"),
    Nl = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, s) => {
            const r = t
                ? dt.createElementNS(Fl, e)
                : dt.createElement(e, n ? { is: n } : void 0);
            return (
                e === "select" &&
                    s &&
                    s.multiple != null &&
                    r.setAttribute("multiple", s.multiple),
                r
            );
        },
        createText: (e) => dt.createTextNode(e),
        createComment: (e) => dt.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => dt.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "");
        },
        cloneNode(e) {
            const t = e.cloneNode(!0);
            return "_value" in e && (t._value = e._value), t;
        },
        insertStaticContent(e, t, n, s, r, o) {
            const i = n ? n.previousSibling : t.lastChild;
            if (r && (r === o || r.nextSibling))
                for (
                    ;
                    t.insertBefore(r.cloneNode(!0), n),
                        !(r === o || !(r = r.nextSibling));

                );
            else {
                Js.innerHTML = s ? `<svg>${e}</svg>` : e;
                const c = Js.content;
                if (s) {
                    const l = c.firstChild;
                    for (; l.firstChild; ) c.appendChild(l.firstChild);
                    c.removeChild(l);
                }
                t.insertBefore(c, n);
            }
            return [
                i ? i.nextSibling : t.firstChild,
                n ? n.previousSibling : t.lastChild,
            ];
        },
    };
function Ll(e, t, n) {
    const s = e._vtc;
    s && (t = (t ? [t, ...s] : [...s]).join(" ")),
        t == null
            ? e.removeAttribute("class")
            : n
            ? e.setAttribute("class", t)
            : (e.className = t);
}
function Hl(e, t, n) {
    const s = e.style,
        r = ge(n);
    if (n && !r) {
        for (const o in n) es(s, o, n[o]);
        if (t && !ge(t)) for (const o in t) n[o] == null && es(s, o, "");
    } else {
        const o = s.display;
        r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
            "_vod" in e && (s.display = o);
    }
}
const Gs = /\s*!important$/;
function es(e, t, n) {
    if (L(n)) n.forEach((s) => es(e, t, s));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
        const s = Bl(e, t);
        Gs.test(n)
            ? e.setProperty(Ot(s), n.replace(Gs, ""), "important")
            : (e[s] = n);
    }
}
const Xs = ["Webkit", "Moz", "ms"],
    Mn = {};
function Bl(e, t) {
    const n = Mn[t];
    if (n) return n;
    let s = Be(t);
    if (s !== "filter" && s in e) return (Mn[t] = s);
    s = yn(s);
    for (let r = 0; r < Xs.length; r++) {
        const o = Xs[r] + s;
        if (o in e) return (Mn[t] = o);
    }
    return t;
}
const Zs = "http://www.w3.org/1999/xlink";
function zl(e, t, n, s, r) {
    if (s && t.startsWith("xlink:"))
        n == null
            ? e.removeAttributeNS(Zs, t.slice(6, t.length))
            : e.setAttributeNS(Zs, t, n);
    else {
        const o = $o(t);
        n == null || (o && !_r(n))
            ? e.removeAttribute(t)
            : e.setAttribute(t, o ? "" : n);
    }
}
function Kl(e, t, n, s, r, o, i) {
    if (t === "innerHTML" || t === "textContent") {
        s && i(s, r, o), (e[t] = n == null ? "" : n);
        return;
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const l = n == null ? "" : n;
        (e.value !== l || e.tagName === "OPTION") && (e.value = l),
            n == null && e.removeAttribute(t);
        return;
    }
    let c = !1;
    if (n === "" || n == null) {
        const l = typeof e[t];
        l === "boolean"
            ? (n = _r(n))
            : n == null && l === "string"
            ? ((n = ""), (c = !0))
            : l === "number" && ((n = 0), (c = !0));
    }
    try {
        e[t] = n;
    } catch {}
    c && e.removeAttribute(t);
}
const [_o, Ul] = (() => {
    let e = Date.now,
        t = !1;
    if (typeof window != "undefined") {
        Date.now() > document.createEvent("Event").timeStamp &&
            (e = performance.now.bind(performance));
        const n = navigator.userAgent.match(/firefox\/(\d+)/i);
        t = !!(n && Number(n[1]) <= 53);
    }
    return [e, t];
})();
let ts = 0;
const Dl = Promise.resolve(),
    Wl = () => {
        ts = 0;
    },
    ql = () => ts || (Dl.then(Wl), (ts = _o()));
function Vl(e, t, n, s) {
    e.addEventListener(t, n, s);
}
function Yl(e, t, n, s) {
    e.removeEventListener(t, n, s);
}
function Ql(e, t, n, s, r = null) {
    const o = e._vei || (e._vei = {}),
        i = o[t];
    if (s && i) i.value = s;
    else {
        const [c, l] = Jl(t);
        if (s) {
            const u = (o[t] = Gl(s, r));
            Vl(e, c, u, l);
        } else i && (Yl(e, c, i, l), (o[t] = void 0));
    }
}
const er = /(?:Once|Passive|Capture)$/;
function Jl(e) {
    let t;
    if (er.test(e)) {
        t = {};
        let n;
        for (; (n = e.match(er)); )
            (e = e.slice(0, e.length - n[0].length)),
                (t[n[0].toLowerCase()] = !0);
    }
    return [Ot(e.slice(2)), t];
}
function Gl(e, t) {
    const n = (s) => {
        const r = s.timeStamp || _o();
        (Ul || r >= n.attached - 1) && Pe(Xl(s, n.value), t, 5, [s]);
    };
    return (n.value = e), (n.attached = ql()), n;
}
function Xl(e, t) {
    if (L(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                n.call(e), (e._stopped = !0);
            }),
            t.map((s) => (r) => !r._stopped && s && s(r))
        );
    } else return t;
}
const tr = /^on[a-z]/,
    Zl = (e, t, n, s, r = !1, o, i, c, l) => {
        t === "class"
            ? Ll(e, s, r)
            : t === "style"
            ? Hl(e, n, s)
            : _n(t)
            ? cs(t) || Ql(e, t, n, s, i)
            : (
                  t[0] === "."
                      ? ((t = t.slice(1)), !0)
                      : t[0] === "^"
                      ? ((t = t.slice(1)), !1)
                      : ec(e, t, s, r)
              )
            ? Kl(e, t, s, o, i, c, l)
            : (t === "true-value"
                  ? (e._trueValue = s)
                  : t === "false-value" && (e._falseValue = s),
              zl(e, t, s, r));
    };
function ec(e, t, n, s) {
    return s
        ? !!(
              t === "innerHTML" ||
              t === "textContent" ||
              (t in e && tr.test(t) && B(n))
          )
        : t === "spellcheck" ||
          t === "draggable" ||
          t === "translate" ||
          t === "form" ||
          (t === "list" && e.tagName === "INPUT") ||
          (t === "type" && e.tagName === "TEXTAREA") ||
          (tr.test(t) && ge(n))
        ? !1
        : t in e;
}
const tc = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
};
Ui.props;
const nc = pe({ patchProp: Zl }, Nl);
let nr;
function sc() {
    return nr || (nr = gl(nc));
}
const rc = (...e) => {
    const t = sc().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (s) => {
            const r = oc(s);
            if (!r) return;
            const o = t._component;
            !B(o) && !o.render && !o.template && (o.template = r.innerHTML),
                (r.innerHTML = "");
            const i = n(r, !1, r instanceof SVGElement);
            return (
                r instanceof Element &&
                    (r.removeAttribute("v-cloak"),
                    r.setAttribute("data-v-app", "")),
                i
            );
        }),
        t
    );
};
function oc(e) {
    return ge(e) ? document.querySelector(e) : e;
}
var Ye = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
};
const ic = {},
    lc = { class: "navigation" },
    cc = Ce("Overzicht"),
    ac = Ce("Opdracht 1"),
    uc = Ce("Opdracht 2"),
    fc = Ce("Opdracht 3"),
    dc = Ce("Opdracht 4"),
    hc = Ce("Opdracht 5"),
    pc = Ce("Opdracht 6");
function gc(e, t) {
    const n = no("router-link");
    return (
        qe(),
        Ve("div", lc, [
            ie(n, { to: { name: "home" } }, { default: et(() => [cc]), _: 1 }),
            ie(n, { to: { name: "1" } }, { default: et(() => [ac]), _: 1 }),
            ie(n, { to: { name: "2" } }, { default: et(() => [uc]), _: 1 }),
            ie(n, { to: { name: "3" } }, { default: et(() => [fc]), _: 1 }),
            ie(n, { to: { name: "4" } }, { default: et(() => [dc]), _: 1 }),
            ie(n, { to: { name: "5" } }, { default: et(() => [hc]), _: 1 }),
            ie(n, { to: { name: "6" } }, { default: et(() => [pc]), _: 1 }),
        ])
    );
}
var mc = Ye(ic, [
    ["render", gc],
    ["__scopeId", "data-v-0268ad3b"],
]);
const _c = {
    name: "App",
    setup(e) {
        return (t, n) => {
            const s = no("router-view");
            return qe(), Ve(he, null, [ie(mc), ie(s)], 64);
        };
    },
};
var vc = "./assets/at5.1165db42.jpg";
const bc = {},
    yc = H("h1", null, "Opdracht 1", -1),
    Ec = H(
        "p",
        null,
        "Het vinden van een dark store is niet altijd even makkelijk. ",
        -1
    ),
    wc = H(
        "p",
        null,
        "Sommigen worden bijvoorbeeld niet getoond op Google maps. Maar dat betekend niet dat je ze met een beetje speurwerk kan vinden. Kijk bijvoorbeeld naar deze foto van een Gorillas vestiging. ",
        -1
    ),
    xc = H(
        "h3",
        { class: "question" },
        "Vraag 1: Kun je het adres vinden van deze Gorillas vestiging?",
        -1
    ),
    Cc = H("img", { src: vc }, null, -1);
function Ac(e, t) {
    return qe(), Ve(he, null, [yc, Ec, wc, xc, Cc], 64);
}
var Rc = Ye(bc, [["render", Ac]]),
    Pc = "./assets/nos.945c3d49.jpg";
const Oc = {},
    Tc = H("h1", null, "Opdracht 2", -1),
    kc = H(
        "p",
        null,
        "Goed bezig met het vinden van de eerste Gorillas vestiging! ",
        -1
    ),
    Ic = H(
        "p",
        null,
        "AT5 is niet de enige die video's heeft gemaakt over dark stores. de NOS heeft ook een video gemaakt over dark stores waar we deze vestiging van FLINK zien. ",
        -1
    ),
    Sc = H(
        "h3",
        { class: "question" },
        "Vraag 1: Wat is het adres van deze Flink vestiging?",
        -1
    ),
    $c = H("img", { src: Pc }, null, -1);
function jc(e, t) {
    return qe(), Ve(he, null, [Tc, kc, Ic, Sc, $c], 64);
}
var Mc = Ye(Oc, [["render", jc]]),
    Fc = "./assets/nos.d32832ff.jpg";
const Nc = {},
    Lc = H("h1", null, "Opdracht 3", -1),
    Hc = H(
        "p",
        null,
        "Ok, vanaf nu gaan we hard de moeilijkheid omhoog schroeven want het is duidelijk dat je er klaar voor bent.",
        -1
    ),
    Bc = H(
        "p",
        null,
        " Denk rustig terug aan de vorige opdracht. Hoe heb je zaken aangepakt en welke informatie heb je gebruikt voor het vinden van het juiste antwoord?",
        -1
    ),
    zc = H(
        "h3",
        { class: "question" },
        "Vraag 1: Van welke dienst is deze vestiging?",
        -1
    ),
    Kc = H(
        "h3",
        { class: "question" },
        "Vraag 2: Wat is het adres van deze vestiging?",
        -1
    ),
    Uc = H("p", null, "Klaar? Hier is de foto: ", -1),
    Dc = H("img", { src: Fc }, null, -1);
function Wc(e, t) {
    return qe(), Ve(he, null, [Lc, Hc, Bc, zc, Kc, Uc, Dc], 64);
}
var qc = Ye(Nc, [["render", Wc]]),
    Vc = "./assets/omroepwest.96e0c3ba.jpg";
const Yc = {},
    Qc = H("h1", null, "Opdracht 4", -1),
    Jc = H(
        "p",
        null,
        "Dus je bent heel goed in het vinden van locatie op basis van een afbeelding, maar kun je er ook eentje vinden alleen op basis van een beschrijving? ",
        -1
    ),
    Gc = H(
        "p",
        null,
        " Onderaan de pagina zie je een citaat uit een artikel van Omroep West, ",
        -1
    ),
    Xc = H(
        "h3",
        { class: "question" },
        "Vraag 1: In welke stad staat deze Flink vestiging?",
        -1
    ),
    Zc = H(
        "h3",
        { class: "question" },
        "Vraag 2: Wie zijn de buren van Shakshuka?",
        -1
    ),
    ea = H(
        "h3",
        { class: "question" },
        "Vraag 3: Wat is het oude uitzicht van het restaurant?",
        -1
    ),
    ta = H("img", { src: Vc, class: "border" }, null, -1);
function na(e, t) {
    return qe(), Ve(he, null, [Qc, Jc, Gc, Xc, Zc, ea, ta], 64);
}
var sa = Ye(Yc, [["render", na]]),
    ra = "./assets/1.e70379a8.jpg",
    oa = "./assets/2.1c883fbf.jpg",
    ia = "./assets/3.f8f113eb.jpg",
    la = "./assets/4.bf5a363f.jpg";
const ca = {},
    aa = xl(
        '<h1 data-v-d5350138>Opdracht 5</h1><p data-v-d5350138>Wauw! OK, tijd voor wat extra informatie.</p><p data-v-d5350138> Sommige foto&#39;s maken het heel lastig om alleen op visuele informatie op te lossen. Bij elke foto die je maakt wordt namelijk niet alleen een afbeelding opgeslagen maar in het bestand wordt ook extra informatie opgeslagen. </p><p data-v-d5350138> Veel social media zoals Twitter en Instagram halen deze informatie er af, maar als je bijvoorbeeld een foto van Telegram opgestuurd krijgt, zit deze data er nog wel in. </p><p data-v-d5350138>Deze extra informatie kun zien door middel van een <a href="https://jimpl.com/" target="_blank" rel="noopener noreferrer" data-v-d5350138>EXIF viewer</a>.</p><p data-v-d5350138>Bij elke foto willen we graag weten:</p><h3 class="question" data-v-d5350138>Vraag 1: Waar is deze foto gemaakt?</h3><h3 class="question" data-v-d5350138>Vraag 2: Wanneer is deze foto gemaakt?</h3><h3 class="question" data-v-d5350138>Vraag 3: Welke apparaat heeft deze foto gemaakt?</h3><div class="img-grid" data-v-d5350138><img src="' +
            ra +
            '" data-v-d5350138><img src="' +
            oa +
            '" data-v-d5350138><img src="' +
            ia +
            '" data-v-d5350138><img src="' +
            la +
            '" data-v-d5350138></div>',
        10
    );
function ua(e, t) {
    return aa;
}
var fa = Ye(ca, [
        ["render", ua],
        ["__scopeId", "data-v-d5350138"],
    ]),
    da = "./assets/tweet.ae9073f9.jpg";
const ha = {},
    Xt = (e) => (Dr("data-v-6809a0c8"), (e = e()), Wr(), e),
    pa = Xt(() => H("h1", null, "Opdracht 6", -1)),
    ga = Xt(() => H("p", null, "Geweldig gedaan!", -1)),
    ma = Xt(() =>
        H(
            "p",
            null,
            [
                Ce(
                    "We hebben helaas geen extra opdrachten meer voor je. Gelukkig zijn OSINT speurtochten populair op Twitter. "
                ),
                H("br"),
                Ce(" Hier is er eentje die je eens zou kunnen proberen."),
            ],
            -1
        )
    ),
    _a = Xt(() =>
        H(
            "p",
            null,
            [
                Ce(
                    "Denk je het te weten, bekijk of je het goed hebt via de oorspronkelijke "
                ),
                H(
                    "a",
                    {
                        href: "https://duckduckgo.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                    },
                    "Tweet"
                ),
            ],
            -1
        )
    ),
    va = Xt(() => H("img", { src: da }, null, -1));
function ba(e, t) {
    return qe(), Ve(he, null, [pa, ga, ma, _a, va], 64);
}
var ya = Ye(ha, [
    ["render", ba],
    ["__scopeId", "data-v-6809a0c8"],
]);
const Ea = {},
    It = (e) => (Dr("data-v-503994a1"), (e = e()), Wr(), e),
    wa = { class: "home" },
    xa = It(() => H("h1", null, "Welkom!", -1)),
    Ca = It(() =>
        H(
            "p",
            null,
            "Super dat je aansluit bij deze open source intelligence workshop over dark stores!",
            -1
        )
    ),
    Aa = It(() =>
        H(
            "p",
            null,
            [
                Ce("Je vind alle opdrachten bovenin de navigatiebalk. "),
                H("br"),
                Ce(" Opdracht 1 staat al klaar voor je."),
            ],
            -1
        )
    ),
    Ra = It(() => H("h2", null, "Heb je een opdracht af? ", -1)),
    Pa = It(() =>
        H(
            "p",
            null,
            "Laat Marieke het antwoord zien van de opdracht waaraan je hebt gewerkt, zij geeft je het wachtwoord waarmee je de volgende opdracht kan openen.",
            -1
        )
    ),
    Oa = It(() => H("p", null, "Succes!", -1)),
    Ta = [xa, Ca, Aa, Ra, Pa, Oa];
function ka(e, t) {
    return qe(), Ve("section", wa, Ta);
}
var Ia = Ye(Ea, [
    ["render", ka],
    ["__scopeId", "data-v-503994a1"],
]);
const Sa = {};
function $a(e, t) {
    return (
        qe(), Ve("p", null, "Helaas, deze pagina kon niet gevonden worden :'(")
    );
}
var ja = Ye(Sa, [["render", $a]]);
/*!
 * vue-router v4.0.15
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const vo =
        typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
    St = (e) => (vo ? Symbol(e) : "_vr_" + e),
    Ma = St("rvlm"),
    sr = St("rvd"),
    Cs = St("r"),
    bo = St("rl"),
    ns = St("rvl"),
    Et = typeof window != "undefined";
function Fa(e) {
    return e.__esModule || (vo && e[Symbol.toStringTag] === "Module");
}
const X = Object.assign;
function Fn(e, t) {
    const n = {};
    for (const s in t) {
        const r = t[s];
        n[s] = Array.isArray(r) ? r.map(e) : e(r);
    }
    return n;
}
const Kt = () => {},
    Na = /\/$/,
    La = (e) => e.replace(Na, "");
function Nn(e, t, n = "/") {
    let s,
        r = {},
        o = "",
        i = "";
    const c = t.indexOf("?"),
        l = t.indexOf("#", c > -1 ? c : 0);
    return (
        c > -1 &&
            ((s = t.slice(0, c)),
            (o = t.slice(c + 1, l > -1 ? l : t.length)),
            (r = e(o))),
        l > -1 && ((s = s || t.slice(0, l)), (i = t.slice(l, t.length))),
        (s = Ka(s != null ? s : t, n)),
        { fullPath: s + (o && "?") + o + i, path: s, query: r, hash: i }
    );
}
function Ha(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "");
}
function rr(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase())
        ? e
        : e.slice(t.length) || "/";
}
function Ba(e, t, n) {
    const s = t.matched.length - 1,
        r = n.matched.length - 1;
    return (
        s > -1 &&
        s === r &&
        Rt(t.matched[s], n.matched[r]) &&
        yo(t.params, n.params) &&
        e(t.query) === e(n.query) &&
        t.hash === n.hash
    );
}
function Rt(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
}
function yo(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!za(e[n], t[n])) return !1;
    return !0;
}
function za(e, t) {
    return Array.isArray(e) ? or(e, t) : Array.isArray(t) ? or(t, e) : e === t;
}
function or(e, t) {
    return Array.isArray(t)
        ? e.length === t.length && e.every((n, s) => n === t[s])
        : e.length === 1 && e[0] === t;
}
function Ka(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"),
        s = e.split("/");
    let r = n.length - 1,
        o,
        i;
    for (o = 0; o < s.length; o++)
        if (((i = s[o]), !(r === 1 || i === ".")))
            if (i === "..") r--;
            else break;
    return (
        n.slice(0, r).join("/") +
        "/" +
        s.slice(o - (o === s.length ? 1 : 0)).join("/")
    );
}
var Jt;
(function (e) {
    (e.pop = "pop"), (e.push = "push");
})(Jt || (Jt = {}));
var Ut;
(function (e) {
    (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(Ut || (Ut = {}));
function Ua(e) {
    if (!e)
        if (Et) {
            const t = document.querySelector("base");
            (e = (t && t.getAttribute("href")) || "/"),
                (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
        } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), La(e);
}
const Da = /^[^#]+#/;
function Wa(e, t) {
    return e.replace(Da, "#") + t;
}
function qa(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
        s = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: s.left - n.left - (t.left || 0),
        top: s.top - n.top - (t.top || 0),
    };
}
const Tn = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Va(e) {
    let t;
    if ("el" in e) {
        const n = e.el,
            s = typeof n == "string" && n.startsWith("#"),
            r =
                typeof n == "string"
                    ? s
                        ? document.getElementById(n.slice(1))
                        : document.querySelector(n)
                    : n;
        if (!r) return;
        t = qa(r, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style
        ? window.scrollTo(t)
        : window.scrollTo(
              t.left != null ? t.left : window.pageXOffset,
              t.top != null ? t.top : window.pageYOffset
          );
}
function ir(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
}
const ss = new Map();
function Ya(e, t) {
    ss.set(e, t);
}
function Qa(e) {
    const t = ss.get(e);
    return ss.delete(e), t;
}
let Ja = () => location.protocol + "//" + location.host;
function Eo(e, t) {
    const { pathname: n, search: s, hash: r } = t,
        o = e.indexOf("#");
    if (o > -1) {
        let c = r.includes(e.slice(o)) ? e.slice(o).length : 1,
            l = r.slice(c);
        return l[0] !== "/" && (l = "/" + l), rr(l, "");
    }
    return rr(n, e) + s + r;
}
function Ga(e, t, n, s) {
    let r = [],
        o = [],
        i = null;
    const c = ({ state: h }) => {
        const y = Eo(e, location),
            R = n.value,
            S = t.value;
        let O = 0;
        if (h) {
            if (((n.value = y), (t.value = h), i && i === R)) {
                i = null;
                return;
            }
            O = S ? h.position - S.position : 0;
        } else s(y);
        r.forEach((P) => {
            P(n.value, R, {
                delta: O,
                type: Jt.pop,
                direction: O ? (O > 0 ? Ut.forward : Ut.back) : Ut.unknown,
            });
        });
    };
    function l() {
        i = n.value;
    }
    function u(h) {
        r.push(h);
        const y = () => {
            const R = r.indexOf(h);
            R > -1 && r.splice(R, 1);
        };
        return o.push(y), y;
    }
    function f() {
        const { history: h } = window;
        !h.state || h.replaceState(X({}, h.state, { scroll: Tn() }), "");
    }
    function p() {
        for (const h of o) h();
        (o = []),
            window.removeEventListener("popstate", c),
            window.removeEventListener("beforeunload", f);
    }
    return (
        window.addEventListener("popstate", c),
        window.addEventListener("beforeunload", f),
        { pauseListeners: l, listen: u, destroy: p }
    );
}
function lr(e, t, n, s = !1, r = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: s,
        position: window.history.length,
        scroll: r ? Tn() : null,
    };
}
function Xa(e) {
    const { history: t, location: n } = window,
        s = { value: Eo(e, n) },
        r = { value: t.state };
    r.value ||
        o(
            s.value,
            {
                back: null,
                current: s.value,
                forward: null,
                position: t.length - 1,
                replaced: !0,
                scroll: null,
            },
            !0
        );
    function o(l, u, f) {
        const p = e.indexOf("#"),
            h =
                p > -1
                    ? (n.host && document.querySelector("base")
                          ? e
                          : e.slice(p)) + l
                    : Ja() + e + l;
        try {
            t[f ? "replaceState" : "pushState"](u, "", h), (r.value = u);
        } catch (y) {
            console.error(y), n[f ? "replace" : "assign"](h);
        }
    }
    function i(l, u) {
        const f = X({}, t.state, lr(r.value.back, l, r.value.forward, !0), u, {
            position: r.value.position,
        });
        o(l, f, !0), (s.value = l);
    }
    function c(l, u) {
        const f = X({}, r.value, t.state, { forward: l, scroll: Tn() });
        o(f.current, f, !0);
        const p = X({}, lr(s.value, l, null), { position: f.position + 1 }, u);
        o(l, p, !1), (s.value = l);
    }
    return { location: s, state: r, push: c, replace: i };
}
function Za(e) {
    e = Ua(e);
    const t = Xa(e),
        n = Ga(e, t.state, t.location, t.replace);
    function s(o, i = !0) {
        i || n.pauseListeners(), history.go(o);
    }
    const r = X(
        { location: "", base: e, go: s, createHref: Wa.bind(null, e) },
        t,
        n
    );
    return (
        Object.defineProperty(r, "location", {
            enumerable: !0,
            get: () => t.location.value,
        }),
        Object.defineProperty(r, "state", {
            enumerable: !0,
            get: () => t.state.value,
        }),
        r
    );
}
function eu(e) {
    return (
        (e = location.host ? e || location.pathname + location.search : ""),
        e.includes("#") || (e += "#"),
        Za(e)
    );
}
function tu(e) {
    return typeof e == "string" || (e && typeof e == "object");
}
function wo(e) {
    return typeof e == "string" || typeof e == "symbol";
}
const Ge = {
        path: "/",
        name: void 0,
        params: {},
        query: {},
        hash: "",
        fullPath: "/",
        matched: [],
        meta: {},
        redirectedFrom: void 0,
    },
    xo = St("nf");
var cr;
(function (e) {
    (e[(e.aborted = 4)] = "aborted"),
        (e[(e.cancelled = 8)] = "cancelled"),
        (e[(e.duplicated = 16)] = "duplicated");
})(cr || (cr = {}));
function Pt(e, t) {
    return X(new Error(), { type: e, [xo]: !0 }, t);
}
function Xe(e, t) {
    return e instanceof Error && xo in e && (t == null || !!(e.type & t));
}
const ar = "[^/]+?",
    nu = { sensitive: !1, strict: !1, start: !0, end: !0 },
    su = /[.+*?^${}()[\]/\\]/g;
function ru(e, t) {
    const n = X({}, nu, t),
        s = [];
    let r = n.start ? "^" : "";
    const o = [];
    for (const u of e) {
        const f = u.length ? [] : [90];
        n.strict && !u.length && (r += "/");
        for (let p = 0; p < u.length; p++) {
            const h = u[p];
            let y = 40 + (n.sensitive ? 0.25 : 0);
            if (h.type === 0)
                p || (r += "/"), (r += h.value.replace(su, "\\$&")), (y += 40);
            else if (h.type === 1) {
                const { value: R, repeatable: S, optional: O, regexp: P } = h;
                o.push({ name: R, repeatable: S, optional: O });
                const F = P || ar;
                if (F !== ar) {
                    y += 10;
                    try {
                        new RegExp(`(${F})`);
                    } catch (q) {
                        throw new Error(
                            `Invalid custom RegExp for param "${R}" (${F}): ` +
                                q.message
                        );
                    }
                }
                let U = S ? `((?:${F})(?:/(?:${F}))*)` : `(${F})`;
                p || (U = O && u.length < 2 ? `(?:/${U})` : "/" + U),
                    O && (U += "?"),
                    (r += U),
                    (y += 20),
                    O && (y += -8),
                    S && (y += -20),
                    F === ".*" && (y += -50);
            }
            f.push(y);
        }
        s.push(f);
    }
    if (n.strict && n.end) {
        const u = s.length - 1;
        s[u][s[u].length - 1] += 0.7000000000000001;
    }
    n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)");
    const i = new RegExp(r, n.sensitive ? "" : "i");
    function c(u) {
        const f = u.match(i),
            p = {};
        if (!f) return null;
        for (let h = 1; h < f.length; h++) {
            const y = f[h] || "",
                R = o[h - 1];
            p[R.name] = y && R.repeatable ? y.split("/") : y;
        }
        return p;
    }
    function l(u) {
        let f = "",
            p = !1;
        for (const h of e) {
            (!p || !f.endsWith("/")) && (f += "/"), (p = !1);
            for (const y of h)
                if (y.type === 0) f += y.value;
                else if (y.type === 1) {
                    const { value: R, repeatable: S, optional: O } = y,
                        P = R in u ? u[R] : "";
                    if (Array.isArray(P) && !S)
                        throw new Error(
                            `Provided param "${R}" is an array but it is not repeatable (* or + modifiers)`
                        );
                    const F = Array.isArray(P) ? P.join("/") : P;
                    if (!F)
                        if (O)
                            h.length < 2 &&
                                e.length > 1 &&
                                (f.endsWith("/")
                                    ? (f = f.slice(0, -1))
                                    : (p = !0));
                        else throw new Error(`Missing required param "${R}"`);
                    f += F;
                }
        }
        return f;
    }
    return { re: i, score: s, keys: o, parse: c, stringify: l };
}
function ou(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const s = t[n] - e[n];
        if (s) return s;
        n++;
    }
    return e.length < t.length
        ? e.length === 1 && e[0] === 40 + 40
            ? -1
            : 1
        : e.length > t.length
        ? t.length === 1 && t[0] === 40 + 40
            ? 1
            : -1
        : 0;
}
function iu(e, t) {
    let n = 0;
    const s = e.score,
        r = t.score;
    for (; n < s.length && n < r.length; ) {
        const o = ou(s[n], r[n]);
        if (o) return o;
        n++;
    }
    return r.length - s.length;
}
const lu = { type: 0, value: "" },
    cu = /[a-zA-Z0-9_]/;
function au(e) {
    if (!e) return [[]];
    if (e === "/") return [[lu]];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
    function t(y) {
        throw new Error(`ERR (${n})/"${u}": ${y}`);
    }
    let n = 0,
        s = n;
    const r = [];
    let o;
    function i() {
        o && r.push(o), (o = []);
    }
    let c = 0,
        l,
        u = "",
        f = "";
    function p() {
        !u ||
            (n === 0
                ? o.push({ type: 0, value: u })
                : n === 1 || n === 2 || n === 3
                ? (o.length > 1 &&
                      (l === "*" || l === "+") &&
                      t(
                          `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
                      ),
                  o.push({
                      type: 1,
                      value: u,
                      regexp: f,
                      repeatable: l === "*" || l === "+",
                      optional: l === "*" || l === "?",
                  }))
                : t("Invalid state to consume buffer"),
            (u = ""));
    }
    function h() {
        u += l;
    }
    for (; c < e.length; ) {
        if (((l = e[c++]), l === "\\" && n !== 2)) {
            (s = n), (n = 4);
            continue;
        }
        switch (n) {
            case 0:
                l === "/" ? (u && p(), i()) : l === ":" ? (p(), (n = 1)) : h();
                break;
            case 4:
                h(), (n = s);
                break;
            case 1:
                l === "("
                    ? (n = 2)
                    : cu.test(l)
                    ? h()
                    : (p(),
                      (n = 0),
                      l !== "*" && l !== "?" && l !== "+" && c--);
                break;
            case 2:
                l === ")"
                    ? f[f.length - 1] == "\\"
                        ? (f = f.slice(0, -1) + l)
                        : (n = 3)
                    : (f += l);
                break;
            case 3:
                p(),
                    (n = 0),
                    l !== "*" && l !== "?" && l !== "+" && c--,
                    (f = "");
                break;
            default:
                t("Unknown state");
                break;
        }
    }
    return (
        n === 2 && t(`Unfinished custom RegExp for param "${u}"`), p(), i(), r
    );
}
function uu(e, t, n) {
    const s = ru(au(e.path), n),
        r = X(s, { record: e, parent: t, children: [], alias: [] });
    return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function fu(e, t) {
    const n = [],
        s = new Map();
    t = fr({ strict: !1, end: !0, sensitive: !1 }, t);
    function r(f) {
        return s.get(f);
    }
    function o(f, p, h) {
        const y = !h,
            R = hu(f);
        R.aliasOf = h && h.record;
        const S = fr(t, f),
            O = [R];
        if ("alias" in f) {
            const U = typeof f.alias == "string" ? [f.alias] : f.alias;
            for (const q of U)
                O.push(
                    X({}, R, {
                        components: h ? h.record.components : R.components,
                        path: q,
                        aliasOf: h ? h.record : R,
                    })
                );
        }
        let P, F;
        for (const U of O) {
            const { path: q } = U;
            if (p && q[0] !== "/") {
                const oe = p.record.path,
                    de = oe[oe.length - 1] === "/" ? "" : "/";
                U.path = p.record.path + (q && de + q);
            }
            if (
                ((P = uu(U, p, S)),
                h
                    ? h.alias.push(P)
                    : ((F = F || P),
                      F !== P && F.alias.push(P),
                      y && f.name && !ur(P) && i(f.name)),
                "children" in R)
            ) {
                const oe = R.children;
                for (let de = 0; de < oe.length; de++)
                    o(oe[de], P, h && h.children[de]);
            }
            (h = h || P), l(P);
        }
        return F
            ? () => {
                  i(F);
              }
            : Kt;
    }
    function i(f) {
        if (wo(f)) {
            const p = s.get(f);
            p &&
                (s.delete(f),
                n.splice(n.indexOf(p), 1),
                p.children.forEach(i),
                p.alias.forEach(i));
        } else {
            const p = n.indexOf(f);
            p > -1 &&
                (n.splice(p, 1),
                f.record.name && s.delete(f.record.name),
                f.children.forEach(i),
                f.alias.forEach(i));
        }
    }
    function c() {
        return n;
    }
    function l(f) {
        let p = 0;
        for (
            ;
            p < n.length &&
            iu(f, n[p]) >= 0 &&
            (f.record.path !== n[p].record.path || !Co(f, n[p]));

        )
            p++;
        n.splice(p, 0, f), f.record.name && !ur(f) && s.set(f.record.name, f);
    }
    function u(f, p) {
        let h,
            y = {},
            R,
            S;
        if ("name" in f && f.name) {
            if (((h = s.get(f.name)), !h)) throw Pt(1, { location: f });
            (S = h.record.name),
                (y = X(
                    du(
                        p.params,
                        h.keys.filter((F) => !F.optional).map((F) => F.name)
                    ),
                    f.params
                )),
                (R = h.stringify(y));
        } else if ("path" in f)
            (R = f.path),
                (h = n.find((F) => F.re.test(R))),
                h && ((y = h.parse(R)), (S = h.record.name));
        else {
            if (
                ((h = p.name
                    ? s.get(p.name)
                    : n.find((F) => F.re.test(p.path))),
                !h)
            )
                throw Pt(1, { location: f, currentLocation: p });
            (S = h.record.name),
                (y = X({}, p.params, f.params)),
                (R = h.stringify(y));
        }
        const O = [];
        let P = h;
        for (; P; ) O.unshift(P.record), (P = P.parent);
        return { name: S, path: R, params: y, matched: O, meta: gu(O) };
    }
    return (
        e.forEach((f) => o(f)),
        {
            addRoute: o,
            resolve: u,
            removeRoute: i,
            getRoutes: c,
            getRecordMatcher: r,
        }
    );
}
function du(e, t) {
    const n = {};
    for (const s of t) s in e && (n[s] = e[s]);
    return n;
}
function hu(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: pu(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set(),
        updateGuards: new Set(),
        enterCallbacks: {},
        components:
            "components" in e ? e.components || {} : { default: e.component },
    };
}
function pu(e) {
    const t = {},
        n = e.props || !1;
    if ("component" in e) t.default = n;
    else for (const s in e.components) t[s] = typeof n == "boolean" ? n : n[s];
    return t;
}
function ur(e) {
    for (; e; ) {
        if (e.record.aliasOf) return !0;
        e = e.parent;
    }
    return !1;
}
function gu(e) {
    return e.reduce((t, n) => X(t, n.meta), {});
}
function fr(e, t) {
    const n = {};
    for (const s in e) n[s] = s in t ? t[s] : e[s];
    return n;
}
function Co(e, t) {
    return t.children.some((n) => n === e || Co(e, n));
}
const Ao = /#/g,
    mu = /&/g,
    _u = /\//g,
    vu = /=/g,
    bu = /\?/g,
    Ro = /\+/g,
    yu = /%5B/g,
    Eu = /%5D/g,
    Po = /%5E/g,
    wu = /%60/g,
    Oo = /%7B/g,
    xu = /%7C/g,
    To = /%7D/g,
    Cu = /%20/g;
function As(e) {
    return encodeURI("" + e)
        .replace(xu, "|")
        .replace(yu, "[")
        .replace(Eu, "]");
}
function Au(e) {
    return As(e).replace(Oo, "{").replace(To, "}").replace(Po, "^");
}
function rs(e) {
    return As(e)
        .replace(Ro, "%2B")
        .replace(Cu, "+")
        .replace(Ao, "%23")
        .replace(mu, "%26")
        .replace(wu, "`")
        .replace(Oo, "{")
        .replace(To, "}")
        .replace(Po, "^");
}
function Ru(e) {
    return rs(e).replace(vu, "%3D");
}
function Pu(e) {
    return As(e).replace(Ao, "%23").replace(bu, "%3F");
}
function Ou(e) {
    return e == null ? "" : Pu(e).replace(_u, "%2F");
}
function mn(e) {
    try {
        return decodeURIComponent("" + e);
    } catch {}
    return "" + e;
}
function Tu(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const s = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let r = 0; r < s.length; ++r) {
        const o = s[r].replace(Ro, " "),
            i = o.indexOf("="),
            c = mn(i < 0 ? o : o.slice(0, i)),
            l = i < 0 ? null : mn(o.slice(i + 1));
        if (c in t) {
            let u = t[c];
            Array.isArray(u) || (u = t[c] = [u]), u.push(l);
        } else t[c] = l;
    }
    return t;
}
function dr(e) {
    let t = "";
    for (let n in e) {
        const s = e[n];
        if (((n = Ru(n)), s == null)) {
            s !== void 0 && (t += (t.length ? "&" : "") + n);
            continue;
        }
        (Array.isArray(s) ? s.map((o) => o && rs(o)) : [s && rs(s)]).forEach(
            (o) => {
                o !== void 0 &&
                    ((t += (t.length ? "&" : "") + n),
                    o != null && (t += "=" + o));
            }
        );
    }
    return t;
}
function ku(e) {
    const t = {};
    for (const n in e) {
        const s = e[n];
        s !== void 0 &&
            (t[n] = Array.isArray(s)
                ? s.map((r) => (r == null ? null : "" + r))
                : s == null
                ? s
                : "" + s);
    }
    return t;
}
function jt() {
    let e = [];
    function t(s) {
        return (
            e.push(s),
            () => {
                const r = e.indexOf(s);
                r > -1 && e.splice(r, 1);
            }
        );
    }
    function n() {
        e = [];
    }
    return { add: t, list: () => e, reset: n };
}
function nt(e, t, n, s, r) {
    const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
    return () =>
        new Promise((i, c) => {
            const l = (p) => {
                    p === !1
                        ? c(Pt(4, { from: n, to: t }))
                        : p instanceof Error
                        ? c(p)
                        : tu(p)
                        ? c(Pt(2, { from: t, to: p }))
                        : (o &&
                              s.enterCallbacks[r] === o &&
                              typeof p == "function" &&
                              o.push(p),
                          i());
                },
                u = e.call(s && s.instances[r], t, n, l);
            let f = Promise.resolve(u);
            e.length < 3 && (f = f.then(l)), f.catch((p) => c(p));
        });
}
function Ln(e, t, n, s) {
    const r = [];
    for (const o of e)
        for (const i in o.components) {
            let c = o.components[i];
            if (!(t !== "beforeRouteEnter" && !o.instances[i]))
                if (Iu(c)) {
                    const u = (c.__vccOpts || c)[t];
                    u && r.push(nt(u, n, s, o, i));
                } else {
                    let l = c();
                    r.push(() =>
                        l.then((u) => {
                            if (!u)
                                return Promise.reject(
                                    new Error(
                                        `Couldn't resolve component "${i}" at "${o.path}"`
                                    )
                                );
                            const f = Fa(u) ? u.default : u;
                            o.components[i] = f;
                            const h = (f.__vccOpts || f)[t];
                            return h && nt(h, n, s, o, i)();
                        })
                    );
                }
        }
    return r;
}
function Iu(e) {
    return (
        typeof e == "object" ||
        "displayName" in e ||
        "props" in e ||
        "__vccOpts" in e
    );
}
function hr(e) {
    const t = ot(Cs),
        n = ot(bo),
        s = Le(() => t.resolve(Lt(e.to))),
        r = Le(() => {
            const { matched: l } = s.value,
                { length: u } = l,
                f = l[u - 1],
                p = n.matched;
            if (!f || !p.length) return -1;
            const h = p.findIndex(Rt.bind(null, f));
            if (h > -1) return h;
            const y = pr(l[u - 2]);
            return u > 1 && pr(f) === y && p[p.length - 1].path !== y
                ? p.findIndex(Rt.bind(null, l[u - 2]))
                : h;
        }),
        o = Le(() => r.value > -1 && Mu(n.params, s.value.params)),
        i = Le(
            () =>
                r.value > -1 &&
                r.value === n.matched.length - 1 &&
                yo(n.params, s.value.params)
        );
    function c(l = {}) {
        return ju(l)
            ? t[Lt(e.replace) ? "replace" : "push"](Lt(e.to)).catch(Kt)
            : Promise.resolve();
    }
    return {
        route: s,
        href: Le(() => s.value.href),
        isActive: o,
        isExactActive: i,
        navigate: c,
    };
}
const Su = Jr({
        name: "RouterLink",
        props: {
            to: { type: [String, Object], required: !0 },
            replace: Boolean,
            activeClass: String,
            exactActiveClass: String,
            custom: Boolean,
            ariaCurrentValue: { type: String, default: "page" },
        },
        useLink: hr,
        setup(e, { slots: t }) {
            const n = Gt(hr(e)),
                { options: s } = ot(Cs),
                r = Le(() => ({
                    [gr(
                        e.activeClass,
                        s.linkActiveClass,
                        "router-link-active"
                    )]: n.isActive,
                    [gr(
                        e.exactActiveClass,
                        s.linkExactActiveClass,
                        "router-link-exact-active"
                    )]: n.isExactActive,
                }));
            return () => {
                const o = t.default && t.default(n);
                return e.custom
                    ? o
                    : mo(
                          "a",
                          {
                              "aria-current": n.isExactActive
                                  ? e.ariaCurrentValue
                                  : null,
                              href: n.href,
                              onClick: n.navigate,
                              class: r.value,
                          },
                          o
                      );
            };
        },
    }),
    $u = Su;
function ju(e) {
    if (
        !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
        !e.defaultPrevented &&
        !(e.button !== void 0 && e.button !== 0)
    ) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t)) return;
        }
        return e.preventDefault && e.preventDefault(), !0;
    }
}
function Mu(e, t) {
    for (const n in t) {
        const s = t[n],
            r = e[n];
        if (typeof s == "string") {
            if (s !== r) return !1;
        } else if (
            !Array.isArray(r) ||
            r.length !== s.length ||
            s.some((o, i) => o !== r[i])
        )
            return !1;
    }
    return !0;
}
function pr(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const gr = (e, t, n) => (e != null ? e : t != null ? t : n),
    Fu = Jr({
        name: "RouterView",
        inheritAttrs: !1,
        props: { name: { type: String, default: "default" }, route: Object },
        compatConfig: { MODE: 3 },
        setup(e, { attrs: t, slots: n }) {
            const s = ot(ns),
                r = Le(() => e.route || s.value),
                o = ot(sr, 0),
                i = Le(() => r.value.matched[o]);
            on(sr, o + 1), on(Ma, i), on(ns, r);
            const c = wi();
            return (
                ln(
                    () => [c.value, i.value, e.name],
                    ([l, u, f], [p, h, y]) => {
                        u &&
                            ((u.instances[f] = l),
                            h &&
                                h !== u &&
                                l &&
                                l === p &&
                                (u.leaveGuards.size ||
                                    (u.leaveGuards = h.leaveGuards),
                                u.updateGuards.size ||
                                    (u.updateGuards = h.updateGuards))),
                            l &&
                                u &&
                                (!h || !Rt(u, h) || !p) &&
                                (u.enterCallbacks[f] || []).forEach((R) =>
                                    R(l)
                                );
                    },
                    { flush: "post" }
                ),
                () => {
                    const l = r.value,
                        u = i.value,
                        f = u && u.components[e.name],
                        p = e.name;
                    if (!f) return mr(n.default, { Component: f, route: l });
                    const h = u.props[e.name],
                        y = h
                            ? h === !0
                                ? l.params
                                : typeof h == "function"
                                ? h(l)
                                : h
                            : null,
                        S = mo(
                            f,
                            X({}, y, t, {
                                onVnodeUnmounted: (O) => {
                                    O.component.isUnmounted &&
                                        (u.instances[p] = null);
                                },
                                ref: c,
                            })
                        );
                    return mr(n.default, { Component: S, route: l }) || S;
                }
            );
        },
    });
function mr(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
}
const Nu = Fu;
function Lu(e) {
    const t = fu(e.routes, e),
        n = e.parseQuery || Tu,
        s = e.stringifyQuery || dr,
        r = e.history,
        o = jt(),
        i = jt(),
        c = jt(),
        l = xi(Ge);
    let u = Ge;
    Et &&
        e.scrollBehavior &&
        "scrollRestoration" in history &&
        (history.scrollRestoration = "manual");
    const f = Fn.bind(null, (m) => "" + m),
        p = Fn.bind(null, Ou),
        h = Fn.bind(null, mn);
    function y(m, k) {
        let C, I;
        return (
            wo(m) ? ((C = t.getRecordMatcher(m)), (I = k)) : (I = m),
            t.addRoute(I, C)
        );
    }
    function R(m) {
        const k = t.getRecordMatcher(m);
        k && t.removeRoute(k);
    }
    function S() {
        return t.getRoutes().map((m) => m.record);
    }
    function O(m) {
        return !!t.getRecordMatcher(m);
    }
    function P(m, k) {
        if (((k = X({}, k || l.value)), typeof m == "string")) {
            const N = Nn(n, m, k.path),
                a = t.resolve({ path: N.path }, k),
                d = r.createHref(N.fullPath);
            return X(N, a, {
                params: h(a.params),
                hash: mn(N.hash),
                redirectedFrom: void 0,
                href: d,
            });
        }
        let C;
        if ("path" in m) C = X({}, m, { path: Nn(n, m.path, k.path).path });
        else {
            const N = X({}, m.params);
            for (const a in N) N[a] == null && delete N[a];
            (C = X({}, m, { params: p(m.params) })), (k.params = p(k.params));
        }
        const I = t.resolve(C, k),
            Q = m.hash || "";
        I.params = f(h(I.params));
        const ee = Ha(s, X({}, m, { hash: Au(Q), path: I.path })),
            z = r.createHref(ee);
        return X(
            {
                fullPath: ee,
                hash: Q,
                query: s === dr ? ku(m.query) : m.query || {},
            },
            I,
            { redirectedFrom: void 0, href: z }
        );
    }
    function F(m) {
        return typeof m == "string" ? Nn(n, m, l.value.path) : X({}, m);
    }
    function U(m, k) {
        if (u !== m) return Pt(8, { from: k, to: m });
    }
    function q(m) {
        return be(m);
    }
    function oe(m) {
        return q(X(F(m), { replace: !0 }));
    }
    function de(m) {
        const k = m.matched[m.matched.length - 1];
        if (k && k.redirect) {
            const { redirect: C } = k;
            let I = typeof C == "function" ? C(m) : C;
            return (
                typeof I == "string" &&
                    ((I =
                        I.includes("?") || I.includes("#")
                            ? (I = F(I))
                            : { path: I }),
                    (I.params = {})),
                X({ query: m.query, hash: m.hash, params: m.params }, I)
            );
        }
    }
    function be(m, k) {
        const C = (u = P(m)),
            I = l.value,
            Q = m.state,
            ee = m.force,
            z = m.replace === !0,
            N = de(C);
        if (N) return be(X(F(N), { state: Q, force: ee, replace: z }), k || C);
        const a = C;
        a.redirectedFrom = k;
        let d;
        return (
            !ee &&
                Ba(s, I, C) &&
                ((d = Pt(16, { to: a, from: I })), mt(I, I, !0, !1)),
            (d ? Promise.resolve(d) : ne(a, I))
                .catch((g) => (Xe(g) ? (Xe(g, 2) ? g : ye(g)) : Z(g, a, I)))
                .then((g) => {
                    if (g) {
                        if (Xe(g, 2))
                            return be(
                                X(F(g.to), { state: Q, force: ee, replace: z }),
                                k || a
                            );
                    } else g = ae(a, I, !0, z, Q);
                    return re(a, I, g), g;
                })
        );
    }
    function K(m, k) {
        const C = U(m, k);
        return C ? Promise.reject(C) : Promise.resolve();
    }
    function ne(m, k) {
        let C;
        const [I, Q, ee] = Hu(m, k);
        C = Ln(I.reverse(), "beforeRouteLeave", m, k);
        for (const N of I)
            N.leaveGuards.forEach((a) => {
                C.push(nt(a, m, k));
            });
        const z = K.bind(null, m, k);
        return (
            C.push(z),
            vt(C)
                .then(() => {
                    C = [];
                    for (const N of o.list()) C.push(nt(N, m, k));
                    return C.push(z), vt(C);
                })
                .then(() => {
                    C = Ln(Q, "beforeRouteUpdate", m, k);
                    for (const N of Q)
                        N.updateGuards.forEach((a) => {
                            C.push(nt(a, m, k));
                        });
                    return C.push(z), vt(C);
                })
                .then(() => {
                    C = [];
                    for (const N of m.matched)
                        if (N.beforeEnter && !k.matched.includes(N))
                            if (Array.isArray(N.beforeEnter))
                                for (const a of N.beforeEnter)
                                    C.push(nt(a, m, k));
                            else C.push(nt(N.beforeEnter, m, k));
                    return C.push(z), vt(C);
                })
                .then(
                    () => (
                        m.matched.forEach((N) => (N.enterCallbacks = {})),
                        (C = Ln(ee, "beforeRouteEnter", m, k)),
                        C.push(z),
                        vt(C)
                    )
                )
                .then(() => {
                    C = [];
                    for (const N of i.list()) C.push(nt(N, m, k));
                    return C.push(z), vt(C);
                })
                .catch((N) => (Xe(N, 8) ? N : Promise.reject(N)))
        );
    }
    function re(m, k, C) {
        for (const I of c.list()) I(m, k, C);
    }
    function ae(m, k, C, I, Q) {
        const ee = U(m, k);
        if (ee) return ee;
        const z = k === Ge,
            N = Et ? history.state : {};
        C &&
            (I || z
                ? r.replace(m.fullPath, X({ scroll: z && N && N.scroll }, Q))
                : r.push(m.fullPath, Q)),
            (l.value = m),
            mt(m, k, C, z),
            ye();
    }
    let ue;
    function Oe() {
        ue ||
            (ue = r.listen((m, k, C) => {
                const I = P(m),
                    Q = de(I);
                if (Q) {
                    be(X(Q, { replace: !0 }), I).catch(Kt);
                    return;
                }
                u = I;
                const ee = l.value;
                Et && Ya(ir(ee.fullPath, C.delta), Tn()),
                    ne(I, ee)
                        .catch((z) =>
                            Xe(z, 12)
                                ? z
                                : Xe(z, 2)
                                ? (be(z.to, I)
                                      .then((N) => {
                                          Xe(N, 20) &&
                                              !C.delta &&
                                              C.type === Jt.pop &&
                                              r.go(-1, !1);
                                      })
                                      .catch(Kt),
                                  Promise.reject())
                                : (C.delta && r.go(-C.delta, !1), Z(z, I, ee))
                        )
                        .then((z) => {
                            (z = z || ae(I, ee, !1)),
                                z &&
                                    (C.delta
                                        ? r.go(-C.delta, !1)
                                        : C.type === Jt.pop &&
                                          Xe(z, 20) &&
                                          r.go(-1, !1)),
                                re(I, ee, z);
                        })
                        .catch(Kt);
            }));
    }
    let Qe = jt(),
        gt = jt(),
        le;
    function Z(m, k, C) {
        ye(m);
        const I = gt.list();
        return (
            I.length ? I.forEach((Q) => Q(m, k, C)) : console.error(m),
            Promise.reject(m)
        );
    }
    function Y() {
        return le && l.value !== Ge
            ? Promise.resolve()
            : new Promise((m, k) => {
                  Qe.add([m, k]);
              });
    }
    function ye(m) {
        return (
            le ||
                ((le = !m),
                Oe(),
                Qe.list().forEach(([k, C]) => (m ? C(m) : k())),
                Qe.reset()),
            m
        );
    }
    function mt(m, k, C, I) {
        const { scrollBehavior: Q } = e;
        if (!Et || !Q) return Promise.resolve();
        const ee =
            (!C && Qa(ir(m.fullPath, 0))) ||
            ((I || !C) && history.state && history.state.scroll) ||
            null;
        return Nr()
            .then(() => Q(m, k, ee))
            .then((z) => z && Va(z))
            .catch((z) => Z(z, m, k));
    }
    const ze = (m) => r.go(m);
    let $e;
    const Ae = new Set();
    return {
        currentRoute: l,
        addRoute: y,
        removeRoute: R,
        hasRoute: O,
        getRoutes: S,
        resolve: P,
        options: e,
        push: q,
        replace: oe,
        go: ze,
        back: () => ze(-1),
        forward: () => ze(1),
        beforeEach: o.add,
        beforeResolve: i.add,
        afterEach: c.add,
        onError: gt.add,
        isReady: Y,
        install(m) {
            const k = this;
            m.component("RouterLink", $u),
                m.component("RouterView", Nu),
                (m.config.globalProperties.$router = k),
                Object.defineProperty(m.config.globalProperties, "$route", {
                    enumerable: !0,
                    get: () => Lt(l),
                }),
                Et &&
                    !$e &&
                    l.value === Ge &&
                    (($e = !0), q(r.location).catch((Q) => {}));
            const C = {};
            for (const Q in Ge) C[Q] = Le(() => l.value[Q]);
            m.provide(Cs, k), m.provide(bo, Gt(C)), m.provide(ns, l);
            const I = m.unmount;
            Ae.add(m),
                (m.unmount = function () {
                    Ae.delete(m),
                        Ae.size < 1 &&
                            ((u = Ge),
                            ue && ue(),
                            (ue = null),
                            (l.value = Ge),
                            ($e = !1),
                            (le = !1)),
                        I();
                });
        },
    };
}
function vt(e) {
    return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function Hu(e, t) {
    const n = [],
        s = [],
        r = [],
        o = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < o; i++) {
        const c = t.matched[i];
        c && (e.matched.find((u) => Rt(u, c)) ? s.push(c) : n.push(c));
        const l = e.matched[i];
        l && (t.matched.find((u) => Rt(u, l)) || r.push(l));
    }
    return [n, s, r];
}
const Bu = [
        { path: "/", name: "home", component: Ia },
        { path: "/opdracht-1", name: "1", component: Rc },
        { path: "/opdracht-2", name: "2", component: Mc },
        { path: "/opdracht-3", name: "3", component: qc },
        { path: "/opdracht-4", name: "4", component: sa },
        { path: "/opdracht-5", name: "5", component: fa },
        { path: "/opdracht-6", name: "6", component: ya },
        { path: "/:catchAll(.*)", component: ja },
    ],
    zu = Lu({ history: eu(), routes: Bu }),
    ko = rc(_c);
ko.use(zu);
ko.mount("#app");
