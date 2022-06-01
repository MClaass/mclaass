const Oo = function () {
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
Oo();
function rs(e, t) {
    const n = Object.create(null),
        s = e.split(",");
    for (let r = 0; r < s.length; r++) n[s[r]] = !0;
    return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
const To =
        "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    So = rs(To);
function mr(e) {
    return !!e || e === "";
}
function os(e) {
    if (L(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                r = pe(s) ? Mo(s) : os(s);
            if (r) for (const o in r) t[o] = r[o];
        }
        return t;
    } else {
        if (pe(e)) return e;
        if (ge(e)) return e;
    }
}
const Io = /;(?![^(]*\))/g,
    ko = /:(.+)/;
function Mo(e) {
    const t = {};
    return (
        e.split(Io).forEach((n) => {
            if (n) {
                const s = n.split(ko);
                s.length > 1 && (t[s[0].trim()] = s[1].trim());
            }
        }),
        t
    );
}
function is(e) {
    let t = "";
    if (pe(e)) t = e;
    else if (L(e))
        for (let n = 0; n < e.length; n++) {
            const s = is(e[n]);
            s && (t += s + " ");
        }
    else if (ge(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}
const te = {},
    xt = [],
    Le = () => {},
    $o = () => !1,
    Fo = /^on[^a-z]/,
    mn = (e) => Fo.test(e),
    ls = (e) => e.startsWith("onUpdate:"),
    he = Object.assign,
    cs = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    jo = Object.prototype.hasOwnProperty,
    z = (e, t) => jo.call(e, t),
    L = Array.isArray,
    Nt = (e) => _n(e) === "[object Map]",
    No = (e) => _n(e) === "[object Set]",
    H = (e) => typeof e == "function",
    pe = (e) => typeof e == "string",
    us = (e) => typeof e == "symbol",
    ge = (e) => e !== null && typeof e == "object",
    _r = (e) => ge(e) && H(e.then) && H(e.catch),
    Lo = Object.prototype.toString,
    _n = (e) => Lo.call(e),
    Ho = (e) => _n(e).slice(8, -1),
    Bo = (e) => _n(e) === "[object Object]",
    fs = (e) =>
        pe(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    sn = rs(
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    vn = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    Ko = /-(\w)/g,
    He = vn((e) => e.replace(Ko, (t, n) => (n ? n.toUpperCase() : ""))),
    Uo = /\B([A-Z])/g,
    Ot = vn((e) => e.replace(Uo, "-$1").toLowerCase()),
    bn = vn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Sn = vn((e) => (e ? `on${bn(e)}` : "")),
    Dt = (e, t) => !Object.is(e, t),
    In = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t);
    },
    fn = (e, t, n) => {
        Object.defineProperty(e, t, {
            configurable: !0,
            enumerable: !1,
            value: n,
        });
    },
    zo = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let Os;
const Do = () =>
    Os ||
    (Os =
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
class Wo {
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
function qo(e, t = Fe) {
    t && t.active && t.effects.push(e);
}
const as = (e) => {
        const t = new Set(e);
        return (t.w = 0), (t.n = 0), t;
    },
    vr = (e) => (e.w & nt) > 0,
    br = (e) => (e.n & nt) > 0,
    Vo = ({ deps: e }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= nt;
    },
    Yo = (e) => {
        const { deps: t } = e;
        if (t.length) {
            let n = 0;
            for (let s = 0; s < t.length; s++) {
                const r = t[s];
                vr(r) && !br(r) ? r.delete(e) : (t[n++] = r),
                    (r.w &= ~nt),
                    (r.n &= ~nt);
            }
            t.length = n;
        }
    },
    Ln = new WeakMap();
let Ft = 0,
    nt = 1;
const Hn = 30;
let Te;
const ht = Symbol(""),
    Bn = Symbol("");
class ds {
    constructor(t, n = null, s) {
        (this.fn = t),
            (this.scheduler = n),
            (this.active = !0),
            (this.deps = []),
            (this.parent = void 0),
            qo(this, s);
    }
    run() {
        if (!this.active) return this.fn();
        let t = Te,
            n = Ze;
        for (; t; ) {
            if (t === this) return;
            t = t.parent;
        }
        try {
            return (
                (this.parent = Te),
                (Te = this),
                (Ze = !0),
                (nt = 1 << ++Ft),
                Ft <= Hn ? Vo(this) : Ts(this),
                this.fn()
            );
        } finally {
            Ft <= Hn && Yo(this),
                (nt = 1 << --Ft),
                (Te = this.parent),
                (Ze = n),
                (this.parent = void 0),
                this.deferStop && this.stop();
        }
    }
    stop() {
        Te === this
            ? (this.deferStop = !0)
            : this.active &&
              (Ts(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function Ts(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
    }
}
let Ze = !0;
const yr = [];
function Tt() {
    yr.push(Ze), (Ze = !1);
}
function St() {
    const e = yr.pop();
    Ze = e === void 0 ? !0 : e;
}
function xe(e, t, n) {
    if (Ze && Te) {
        let s = Ln.get(e);
        s || Ln.set(e, (s = new Map()));
        let r = s.get(n);
        r || s.set(n, (r = as())), Er(r);
    }
}
function Er(e, t) {
    let n = !1;
    Ft <= Hn ? br(e) || ((e.n |= nt), (n = !vr(e))) : (n = !e.has(Te)),
        n && (e.add(Te), Te.deps.push(e));
}
function ze(e, t, n, s, r, o) {
    const i = Ln.get(e);
    if (!i) return;
    let c = [];
    if (t === "clear") c = [...i.values()];
    else if (n === "length" && L(e))
        i.forEach((l, f) => {
            (f === "length" || f >= s) && c.push(l);
        });
    else
        switch ((n !== void 0 && c.push(i.get(n)), t)) {
            case "add":
                L(e)
                    ? fs(n) && c.push(i.get("length"))
                    : (c.push(i.get(ht)), Nt(e) && c.push(i.get(Bn)));
                break;
            case "delete":
                L(e) || (c.push(i.get(ht)), Nt(e) && c.push(i.get(Bn)));
                break;
            case "set":
                Nt(e) && c.push(i.get(ht));
                break;
        }
    if (c.length === 1) c[0] && Kn(c[0]);
    else {
        const l = [];
        for (const f of c) f && l.push(...f);
        Kn(as(l));
    }
}
function Kn(e, t) {
    const n = L(e) ? e : [...e];
    for (const s of n) s.computed && Ss(s);
    for (const s of n) s.computed || Ss(s);
}
function Ss(e, t) {
    (e !== Te || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Qo = rs("__proto__,__v_isRef,__isVue"),
    wr = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== "arguments" && e !== "caller")
            .map((e) => Symbol[e])
            .filter(us)
    ),
    Jo = hs(),
    Xo = hs(!1, !0),
    Go = hs(!0),
    Is = Zo();
function Zo() {
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
                return St(), s;
            };
        }),
        e
    );
}
function hs(e = !1, t = !1) {
    return function (s, r, o) {
        if (r === "__v_isReactive") return !e;
        if (r === "__v_isReadonly") return e;
        if (r === "__v_isShallow") return t;
        if (r === "__v_raw" && o === (e ? (t ? gi : Pr) : t ? Rr : Ar).get(s))
            return s;
        const i = L(s);
        if (!e && i && z(Is, r)) return Reflect.get(Is, r, o);
        const c = Reflect.get(s, r, o);
        return (us(r) ? wr.has(r) : Qo(r)) || (e || xe(s, "get", r), t)
            ? c
            : ae(c)
            ? i && fs(r)
                ? c
                : c.value
            : ge(c)
            ? e
                ? Or(c)
                : Xt(c)
            : c;
    };
}
const ei = xr(),
    ti = xr(!0);
function xr(e = !1) {
    return function (n, s, r, o) {
        let i = n[s];
        if (Wt(i) && ae(i) && !ae(r)) return !1;
        if (
            !e &&
            !Wt(r) &&
            (Un(r) || ((r = V(r)), (i = V(i))), !L(n) && ae(i) && !ae(r))
        )
            return (i.value = r), !0;
        const c = L(n) && fs(s) ? Number(s) < n.length : z(n, s),
            l = Reflect.set(n, s, r, o);
        return (
            n === V(o) &&
                (c ? Dt(r, i) && ze(n, "set", s, r) : ze(n, "add", s, r)),
            l
        );
    };
}
function ni(e, t) {
    const n = z(e, t);
    e[t];
    const s = Reflect.deleteProperty(e, t);
    return s && n && ze(e, "delete", t, void 0), s;
}
function si(e, t) {
    const n = Reflect.has(e, t);
    return (!us(t) || !wr.has(t)) && xe(e, "has", t), n;
}
function ri(e) {
    return xe(e, "iterate", L(e) ? "length" : ht), Reflect.ownKeys(e);
}
const Cr = { get: Jo, set: ei, deleteProperty: ni, has: si, ownKeys: ri },
    oi = {
        get: Go,
        set(e, t) {
            return !0;
        },
        deleteProperty(e, t) {
            return !0;
        },
    },
    ii = he({}, Cr, { get: Xo, set: ti }),
    ps = (e) => e,
    yn = (e) => Reflect.getPrototypeOf(e);
function Gt(e, t, n = !1, s = !1) {
    e = e.__v_raw;
    const r = V(e),
        o = V(t);
    n || (t !== o && xe(r, "get", t), xe(r, "get", o));
    const { has: i } = yn(r),
        c = s ? ps : n ? _s : qt;
    if (i.call(r, t)) return c(e.get(t));
    if (i.call(r, o)) return c(e.get(o));
    e !== r && e.get(t);
}
function Zt(e, t = !1) {
    const n = this.__v_raw,
        s = V(n),
        r = V(e);
    return (
        t || (e !== r && xe(s, "has", e), xe(s, "has", r)),
        e === r ? n.has(e) : n.has(e) || n.has(r)
    );
}
function en(e, t = !1) {
    return (
        (e = e.__v_raw),
        !t && xe(V(e), "iterate", ht),
        Reflect.get(e, "size", e)
    );
}
function ks(e) {
    e = V(e);
    const t = V(this);
    return yn(t).has.call(t, e) || (t.add(e), ze(t, "add", e, e)), this;
}
function Ms(e, t) {
    t = V(t);
    const n = V(this),
        { has: s, get: r } = yn(n);
    let o = s.call(n, e);
    o || ((e = V(e)), (o = s.call(n, e)));
    const i = r.call(n, e);
    return (
        n.set(e, t),
        o ? Dt(t, i) && ze(n, "set", e, t) : ze(n, "add", e, t),
        this
    );
}
function $s(e) {
    const t = V(this),
        { has: n, get: s } = yn(t);
    let r = n.call(t, e);
    r || ((e = V(e)), (r = n.call(t, e))), s && s.call(t, e);
    const o = t.delete(e);
    return r && ze(t, "delete", e, void 0), o;
}
function Fs() {
    const e = V(this),
        t = e.size !== 0,
        n = e.clear();
    return t && ze(e, "clear", void 0, void 0), n;
}
function tn(e, t) {
    return function (s, r) {
        const o = this,
            i = o.__v_raw,
            c = V(i),
            l = t ? ps : e ? _s : qt;
        return (
            !e && xe(c, "iterate", ht),
            i.forEach((f, a) => s.call(r, l(f), l(a), o))
        );
    };
}
function nn(e, t, n) {
    return function (...s) {
        const r = this.__v_raw,
            o = V(r),
            i = Nt(o),
            c = e === "entries" || (e === Symbol.iterator && i),
            l = e === "keys" && i,
            f = r[e](...s),
            a = n ? ps : t ? _s : qt;
        return (
            !t && xe(o, "iterate", l ? Bn : ht),
            {
                next() {
                    const { value: p, done: h } = f.next();
                    return h
                        ? { value: p, done: h }
                        : { value: c ? [a(p[0]), a(p[1])] : a(p), done: h };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function Ve(e) {
    return function (...t) {
        return e === "delete" ? !1 : this;
    };
}
function li() {
    const e = {
            get(o) {
                return Gt(this, o);
            },
            get size() {
                return en(this);
            },
            has: Zt,
            add: ks,
            set: Ms,
            delete: $s,
            clear: Fs,
            forEach: tn(!1, !1),
        },
        t = {
            get(o) {
                return Gt(this, o, !1, !0);
            },
            get size() {
                return en(this);
            },
            has: Zt,
            add: ks,
            set: Ms,
            delete: $s,
            clear: Fs,
            forEach: tn(!1, !0),
        },
        n = {
            get(o) {
                return Gt(this, o, !0);
            },
            get size() {
                return en(this, !0);
            },
            has(o) {
                return Zt.call(this, o, !0);
            },
            add: Ve("add"),
            set: Ve("set"),
            delete: Ve("delete"),
            clear: Ve("clear"),
            forEach: tn(!0, !1),
        },
        s = {
            get(o) {
                return Gt(this, o, !0, !0);
            },
            get size() {
                return en(this, !0);
            },
            has(o) {
                return Zt.call(this, o, !0);
            },
            add: Ve("add"),
            set: Ve("set"),
            delete: Ve("delete"),
            clear: Ve("clear"),
            forEach: tn(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
            (e[o] = nn(o, !1, !1)),
                (n[o] = nn(o, !0, !1)),
                (t[o] = nn(o, !1, !0)),
                (s[o] = nn(o, !0, !0));
        }),
        [e, n, t, s]
    );
}
const [ci, ui, fi, ai] = li();
function gs(e, t) {
    const n = t ? (e ? ai : fi) : e ? ui : ci;
    return (s, r, o) =>
        r === "__v_isReactive"
            ? !e
            : r === "__v_isReadonly"
            ? e
            : r === "__v_raw"
            ? s
            : Reflect.get(z(n, r) && r in s ? n : s, r, o);
}
const di = { get: gs(!1, !1) },
    hi = { get: gs(!1, !0) },
    pi = { get: gs(!0, !1) },
    Ar = new WeakMap(),
    Rr = new WeakMap(),
    Pr = new WeakMap(),
    gi = new WeakMap();
function mi(e) {
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
function _i(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : mi(Ho(e));
}
function Xt(e) {
    return Wt(e) ? e : ms(e, !1, Cr, di, Ar);
}
function vi(e) {
    return ms(e, !1, ii, hi, Rr);
}
function Or(e) {
    return ms(e, !0, oi, pi, Pr);
}
function ms(e, t, n, s, r) {
    if (!ge(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const o = r.get(e);
    if (o) return o;
    const i = _i(e);
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
function Tr(e) {
    return Ct(e) || Wt(e);
}
function V(e) {
    const t = e && e.__v_raw;
    return t ? V(t) : e;
}
function Sr(e) {
    return fn(e, "__v_skip", !0), e;
}
const qt = (e) => (ge(e) ? Xt(e) : e),
    _s = (e) => (ge(e) ? Or(e) : e);
function Ir(e) {
    Ze && Te && ((e = V(e)), Er(e.dep || (e.dep = as())));
}
function kr(e, t) {
    (e = V(e)), e.dep && Kn(e.dep);
}
function ae(e) {
    return !!(e && e.__v_isRef === !0);
}
function bi(e) {
    return Mr(e, !1);
}
function yi(e) {
    return Mr(e, !0);
}
function Mr(e, t) {
    return ae(e) ? e : new Ei(e, t);
}
class Ei {
    constructor(t, n) {
        (this.__v_isShallow = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = n ? t : V(t)),
            (this._value = n ? t : qt(t));
    }
    get value() {
        return Ir(this), this._value;
    }
    set value(t) {
        (t = this.__v_isShallow ? t : V(t)),
            Dt(t, this._rawValue) &&
                ((this._rawValue = t),
                (this._value = this.__v_isShallow ? t : qt(t)),
                kr(this));
    }
}
function Lt(e) {
    return ae(e) ? e.value : e;
}
const wi = {
    get: (e, t, n) => Lt(Reflect.get(e, t, n)),
    set: (e, t, n, s) => {
        const r = e[t];
        return ae(r) && !ae(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
    },
};
function $r(e) {
    return Ct(e) ? e : new Proxy(e, wi);
}
class xi {
    constructor(t, n, s, r) {
        (this._setter = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._dirty = !0),
            (this.effect = new ds(t, () => {
                this._dirty || ((this._dirty = !0), kr(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !r),
            (this.__v_isReadonly = s);
    }
    get value() {
        const t = V(this);
        return (
            Ir(t),
            (t._dirty || !t._cacheable) &&
                ((t._dirty = !1), (t._value = t.effect.run())),
            t._value
        );
    }
    set value(t) {
        this._setter(t);
    }
}
function Ci(e, t, n = !1) {
    let s, r;
    const o = H(e);
    return (
        o ? ((s = e), (r = Le)) : ((s = e.get), (r = e.set)),
        new xi(s, r, o || !r, n)
    );
}
function et(e, t, n, s) {
    let r;
    try {
        r = s ? e(...s) : e();
    } catch (o) {
        En(o, t, n);
    }
    return r;
}
function Re(e, t, n, s) {
    if (H(e)) {
        const o = et(e, t, n, s);
        return (
            o &&
                _r(o) &&
                o.catch((i) => {
                    En(i, t, n);
                }),
            o
        );
    }
    const r = [];
    for (let o = 0; o < e.length; o++) r.push(Re(e[o], t, n, s));
    return r;
}
function En(e, t, n, s) {
    if ((t && t.vnode, t)) {
        let r = t.parent;
        const o = t.proxy,
            i = n;
        for (; r; ) {
            const l = r.ec;
            if (l) {
                for (let f = 0; f < l.length; f++)
                    if (l[f](e, o, i) === !1) return;
            }
            r = r.parent;
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            et(c, null, 10, [e, o, i]);
            return;
        }
    }
    Ai(e);
}
function Ai(e, t, n, s) {
    console.error(e);
}
let an = !1,
    zn = !1;
const we = [];
let Ke = 0;
const Ht = [];
let jt = null,
    bt = 0;
const Bt = [];
let Je = null,
    yt = 0;
const Fr = Promise.resolve();
let vs = null,
    Dn = null;
function jr(e) {
    const t = vs || Fr;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ri(e) {
    let t = Ke + 1,
        n = we.length;
    for (; t < n; ) {
        const s = (t + n) >>> 1;
        Vt(we[s]) < e ? (t = s + 1) : (n = s);
    }
    return t;
}
function Nr(e) {
    (!we.length || !we.includes(e, an && e.allowRecurse ? Ke + 1 : Ke)) &&
        e !== Dn &&
        (e.id == null ? we.push(e) : we.splice(Ri(e.id), 0, e), Lr());
}
function Lr() {
    !an && !zn && ((zn = !0), (vs = Fr.then(Kr)));
}
function Pi(e) {
    const t = we.indexOf(e);
    t > Ke && we.splice(t, 1);
}
function Hr(e, t, n, s) {
    L(e)
        ? n.push(...e)
        : (!t || !t.includes(e, e.allowRecurse ? s + 1 : s)) && n.push(e),
        Lr();
}
function Oi(e) {
    Hr(e, jt, Ht, bt);
}
function Ti(e) {
    Hr(e, Je, Bt, yt);
}
function wn(e, t = null) {
    if (Ht.length) {
        for (
            Dn = t, jt = [...new Set(Ht)], Ht.length = 0, bt = 0;
            bt < jt.length;
            bt++
        )
            jt[bt]();
        (jt = null), (bt = 0), (Dn = null), wn(e, t);
    }
}
function Br(e) {
    if ((wn(), Bt.length)) {
        const t = [...new Set(Bt)];
        if (((Bt.length = 0), Je)) {
            Je.push(...t);
            return;
        }
        for (
            Je = t, Je.sort((n, s) => Vt(n) - Vt(s)), yt = 0;
            yt < Je.length;
            yt++
        )
            Je[yt]();
        (Je = null), (yt = 0);
    }
}
const Vt = (e) => (e.id == null ? 1 / 0 : e.id);
function Kr(e) {
    (zn = !1), (an = !0), wn(e), we.sort((n, s) => Vt(n) - Vt(s));
    const t = Le;
    try {
        for (Ke = 0; Ke < we.length; Ke++) {
            const n = we[Ke];
            n && n.active !== !1 && et(n, null, 14);
        }
    } finally {
        (Ke = 0),
            (we.length = 0),
            Br(),
            (an = !1),
            (vs = null),
            (we.length || Ht.length || Bt.length) && Kr(e);
    }
}
function Si(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || te;
    let r = n;
    const o = t.startsWith("update:"),
        i = o && t.slice(7);
    if (i && i in s) {
        const a = `${i === "modelValue" ? "model" : i}Modifiers`,
            { number: p, trim: h } = s[a] || te;
        h && (r = n.map((y) => y.trim())), p && (r = n.map(zo));
    }
    let c,
        l = s[(c = Sn(t))] || s[(c = Sn(He(t)))];
    !l && o && (l = s[(c = Sn(Ot(t)))]), l && Re(l, e, 6, r);
    const f = s[c + "Once"];
    if (f) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[c]) return;
        (e.emitted[c] = !0), Re(f, e, 6, r);
    }
}
function Ur(e, t, n = !1) {
    const s = t.emitsCache,
        r = s.get(e);
    if (r !== void 0) return r;
    const o = e.emits;
    let i = {},
        c = !1;
    if (!H(e)) {
        const l = (f) => {
            const a = Ur(f, t, !0);
            a && ((c = !0), he(i, a));
        };
        !n && t.mixins.length && t.mixins.forEach(l),
            e.extends && l(e.extends),
            e.mixins && e.mixins.forEach(l);
    }
    return !o && !c
        ? (s.set(e, null), null)
        : (L(o) ? o.forEach((l) => (i[l] = null)) : he(i, o), s.set(e, i), i);
}
function xn(e, t) {
    return !e || !mn(t)
        ? !1
        : ((t = t.slice(2).replace(/Once$/, "")),
          z(e, t[0].toLowerCase() + t.slice(1)) || z(e, Ot(t)) || z(e, t));
}
let Se = null,
    Cn = null;
function dn(e) {
    const t = Se;
    return (Se = e), (Cn = (e && e.type.__scopeId) || null), t;
}
function Ii(e) {
    Cn = e;
}
function ki() {
    Cn = null;
}
function ut(e, t = Se, n) {
    if (!t || e._n) return e;
    const s = (...r) => {
        s._d && qs(-1);
        const o = dn(t),
            i = e(...r);
        return dn(o), s._d && qs(1), i;
    };
    return (s._n = !0), (s._c = !0), (s._d = !0), s;
}
function kn(e) {
    const {
        type: t,
        vnode: n,
        proxy: s,
        withProxy: r,
        props: o,
        propsOptions: [i],
        slots: c,
        attrs: l,
        emit: f,
        render: a,
        renderCache: p,
        data: h,
        setupState: y,
        ctx: R,
        inheritAttrs: k,
    } = e;
    let O, P;
    const j = dn(e);
    try {
        if (n.shapeFlag & 4) {
            const W = r || s;
            (O = je(a.call(W, W, p, o, y, h, R))), (P = l);
        } else {
            const W = t;
            (O = je(
                W.length > 1
                    ? W(o, { attrs: l, slots: c, emit: f })
                    : W(o, null)
            )),
                (P = t.props ? l : Mi(l));
        }
    } catch (W) {
        (Kt.length = 0), En(W, e, 1), (O = ie(Ue));
    }
    let U = O;
    if (P && k !== !1) {
        const W = Object.keys(P),
            { shapeFlag: oe } = U;
        W.length &&
            oe & 7 &&
            (i && W.some(ls) && (P = $i(P, i)), (U = st(U, P)));
    }
    return (
        n.dirs &&
            ((U = st(U)), (U.dirs = U.dirs ? U.dirs.concat(n.dirs) : n.dirs)),
        n.transition && (U.transition = n.transition),
        (O = U),
        dn(j),
        O
    );
}
const Mi = (e) => {
        let t;
        for (const n in e)
            (n === "class" || n === "style" || mn(n)) &&
                ((t || (t = {}))[n] = e[n]);
        return t;
    },
    $i = (e, t) => {
        const n = {};
        for (const s in e) (!ls(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n;
    };
function Fi(e, t, n) {
    const { props: s, children: r, component: o } = e,
        { props: i, children: c, patchFlag: l } = t,
        f = o.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
        if (l & 1024) return !0;
        if (l & 16) return s ? js(s, i, f) : !!i;
        if (l & 8) {
            const a = t.dynamicProps;
            for (let p = 0; p < a.length; p++) {
                const h = a[p];
                if (i[h] !== s[h] && !xn(f, h)) return !0;
            }
        }
    } else
        return (r || c) && (!c || !c.$stable)
            ? !0
            : s === i
            ? !1
            : s
            ? i
                ? js(s, i, f)
                : !0
            : !!i;
    return !1;
}
function js(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let r = 0; r < s.length; r++) {
        const o = s[r];
        if (t[o] !== e[o] && !xn(n, o)) return !0;
    }
    return !1;
}
function ji({ vnode: e, parent: t }, n) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Ni = (e) => e.__isSuspense;
function Li(e, t) {
    t && t.pendingBranch
        ? L(e)
            ? t.effects.push(...e)
            : t.effects.push(e)
        : Ti(e);
}
function rn(e, t) {
    if (ce) {
        let n = ce.provides;
        const s = ce.parent && ce.parent.provides;
        s === n && (n = ce.provides = Object.create(s)), (n[e] = t);
    }
}
function tt(e, t, n = !1) {
    const s = ce || Se;
    if (s) {
        const r =
            s.parent == null
                ? s.vnode.appContext && s.vnode.appContext.provides
                : s.parent.provides;
        if (r && e in r) return r[e];
        if (arguments.length > 1) return n && H(t) ? t.call(s.proxy) : t;
    }
}
const Ns = {};
function on(e, t, n) {
    return zr(e, t, n);
}
function zr(
    e,
    t,
    { immediate: n, deep: s, flush: r, onTrack: o, onTrigger: i } = te
) {
    const c = ce;
    let l,
        f = !1,
        a = !1;
    if (
        (ae(e)
            ? ((l = () => e.value), (f = Un(e)))
            : Ct(e)
            ? ((l = () => e), (s = !0))
            : L(e)
            ? ((a = !0),
              (f = e.some((P) => Ct(P) || Un(P))),
              (l = () =>
                  e.map((P) => {
                      if (ae(P)) return P.value;
                      if (Ct(P)) return wt(P);
                      if (H(P)) return et(P, c, 2);
                  })))
            : H(e)
            ? t
                ? (l = () => et(e, c, 2))
                : (l = () => {
                      if (!(c && c.isUnmounted))
                          return p && p(), Re(e, c, 3, [h]);
                  })
            : (l = Le),
        t && s)
    ) {
        const P = l;
        l = () => wt(P());
    }
    let p,
        h = (P) => {
            p = O.onStop = () => {
                et(P, c, 4);
            };
        };
    if (Qt)
        return (
            (h = Le), t ? n && Re(t, c, 3, [l(), a ? [] : void 0, h]) : l(), Le
        );
    let y = a ? [] : Ns;
    const R = () => {
        if (!!O.active)
            if (t) {
                const P = O.run();
                (s || f || (a ? P.some((j, U) => Dt(j, y[U])) : Dt(P, y))) &&
                    (p && p(),
                    Re(t, c, 3, [P, y === Ns ? void 0 : y, h]),
                    (y = P));
            } else O.run();
    };
    R.allowRecurse = !!t;
    let k;
    r === "sync"
        ? (k = R)
        : r === "post"
        ? (k = () => ve(R, c && c.suspense))
        : (k = () => Oi(R));
    const O = new ds(l, k);
    return (
        t
            ? n
                ? R()
                : (y = O.run())
            : r === "post"
            ? ve(O.run.bind(O), c && c.suspense)
            : O.run(),
        () => {
            O.stop(), c && c.scope && cs(c.scope.effects, O);
        }
    );
}
function Hi(e, t, n) {
    const s = this.proxy,
        r = pe(e) ? (e.includes(".") ? Dr(s, e) : () => s[e]) : e.bind(s, s);
    let o;
    H(t) ? (o = t) : ((o = t.handler), (n = t));
    const i = ce;
    At(this);
    const c = zr(r, o.bind(s), n);
    return i ? At(i) : pt(), c;
}
function Dr(e, t) {
    const n = t.split(".");
    return () => {
        let s = e;
        for (let r = 0; r < n.length && s; r++) s = s[n[r]];
        return s;
    };
}
function wt(e, t) {
    if (!ge(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
    if ((t.add(e), ae(e))) wt(e.value, t);
    else if (L(e)) for (let n = 0; n < e.length; n++) wt(e[n], t);
    else if (No(e) || Nt(e))
        e.forEach((n) => {
            wt(n, t);
        });
    else if (Bo(e)) for (const n in e) wt(e[n], t);
    return e;
}
function Bi() {
    const e = {
        isMounted: !1,
        isLeaving: !1,
        isUnmounting: !1,
        leavingVNodes: new Map(),
    };
    return (
        Qr(() => {
            e.isMounted = !0;
        }),
        Jr(() => {
            e.isUnmounting = !0;
        }),
        e
    );
}
const Ae = [Function, Array],
    Ki = {
        name: "BaseTransition",
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: Ae,
            onEnter: Ae,
            onAfterEnter: Ae,
            onEnterCancelled: Ae,
            onBeforeLeave: Ae,
            onLeave: Ae,
            onAfterLeave: Ae,
            onLeaveCancelled: Ae,
            onBeforeAppear: Ae,
            onAppear: Ae,
            onAfterAppear: Ae,
            onAppearCancelled: Ae,
        },
        setup(e, { slots: t }) {
            const n = Pl(),
                s = Bi();
            let r;
            return () => {
                const o = t.default && qr(t.default(), !0);
                if (!o || !o.length) return;
                let i = o[0];
                if (o.length > 1) {
                    for (const k of o)
                        if (k.type !== Ue) {
                            i = k;
                            break;
                        }
                }
                const c = V(e),
                    { mode: l } = c;
                if (s.isLeaving) return Mn(i);
                const f = Ls(i);
                if (!f) return Mn(i);
                const a = Wn(f, c, s, n);
                qn(f, a);
                const p = n.subTree,
                    h = p && Ls(p);
                let y = !1;
                const { getTransitionKey: R } = f.type;
                if (R) {
                    const k = R();
                    r === void 0 ? (r = k) : k !== r && ((r = k), (y = !0));
                }
                if (h && h.type !== Ue && (!at(f, h) || y)) {
                    const k = Wn(h, c, s, n);
                    if ((qn(h, k), l === "out-in"))
                        return (
                            (s.isLeaving = !0),
                            (k.afterLeave = () => {
                                (s.isLeaving = !1), n.update();
                            }),
                            Mn(i)
                        );
                    l === "in-out" &&
                        f.type !== Ue &&
                        (k.delayLeave = (O, P, j) => {
                            const U = Wr(s, h);
                            (U[String(h.key)] = h),
                                (O._leaveCb = () => {
                                    P(),
                                        (O._leaveCb = void 0),
                                        delete a.delayedLeave;
                                }),
                                (a.delayedLeave = j);
                        });
                }
                return i;
            };
        },
    },
    Ui = Ki;
function Wr(e, t) {
    const { leavingVNodes: n } = e;
    let s = n.get(t.type);
    return s || ((s = Object.create(null)), n.set(t.type, s)), s;
}
function Wn(e, t, n, s) {
    const {
            appear: r,
            mode: o,
            persisted: i = !1,
            onBeforeEnter: c,
            onEnter: l,
            onAfterEnter: f,
            onEnterCancelled: a,
            onBeforeLeave: p,
            onLeave: h,
            onAfterLeave: y,
            onLeaveCancelled: R,
            onBeforeAppear: k,
            onAppear: O,
            onAfterAppear: P,
            onAppearCancelled: j,
        } = t,
        U = String(e.key),
        W = Wr(n, e),
        oe = (K, ne) => {
            K && Re(K, s, 9, ne);
        },
        de = (K, ne) => {
            const re = ne[1];
            oe(K, ne),
                L(K)
                    ? K.every((ue) => ue.length <= 1) && re()
                    : K.length <= 1 && re();
        },
        be = {
            mode: o,
            persisted: i,
            beforeEnter(K) {
                let ne = c;
                if (!n.isMounted)
                    if (r) ne = k || c;
                    else return;
                K._leaveCb && K._leaveCb(!0);
                const re = W[U];
                re && at(e, re) && re.el._leaveCb && re.el._leaveCb(),
                    oe(ne, [K]);
            },
            enter(K) {
                let ne = l,
                    re = f,
                    ue = a;
                if (!n.isMounted)
                    if (r) (ne = O || l), (re = P || f), (ue = j || a);
                    else return;
                let fe = !1;
                const Pe = (K._enterCb = (qe) => {
                    fe ||
                        ((fe = !0),
                        qe ? oe(ue, [K]) : oe(re, [K]),
                        be.delayedLeave && be.delayedLeave(),
                        (K._enterCb = void 0));
                });
                ne ? de(ne, [K, Pe]) : Pe();
            },
            leave(K, ne) {
                const re = String(e.key);
                if ((K._enterCb && K._enterCb(!0), n.isUnmounting)) return ne();
                oe(p, [K]);
                let ue = !1;
                const fe = (K._leaveCb = (Pe) => {
                    ue ||
                        ((ue = !0),
                        ne(),
                        Pe ? oe(R, [K]) : oe(y, [K]),
                        (K._leaveCb = void 0),
                        W[re] === e && delete W[re]);
                });
                (W[re] = e), h ? de(h, [K, fe]) : fe();
            },
            clone(K) {
                return Wn(K, t, n, s);
            },
        };
    return be;
}
function Mn(e) {
    if (An(e)) return (e = st(e)), (e.children = null), e;
}
function Ls(e) {
    return An(e) ? (e.children ? e.children[0] : void 0) : e;
}
function qn(e, t) {
    e.shapeFlag & 6 && e.component
        ? qn(e.component.subTree, t)
        : e.shapeFlag & 128
        ? ((e.ssContent.transition = t.clone(e.ssContent)),
          (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
}
function qr(e, t = !1, n) {
    let s = [],
        r = 0;
    for (let o = 0; o < e.length; o++) {
        let i = e[o];
        const c =
            n == null ? i.key : String(n) + String(i.key != null ? i.key : o);
        i.type === _e
            ? (i.patchFlag & 128 && r++, (s = s.concat(qr(i.children, t, c))))
            : (t || i.type !== Ue) && s.push(c != null ? st(i, { key: c }) : i);
    }
    if (r > 1) for (let o = 0; o < s.length; o++) s[o].patchFlag = -2;
    return s;
}
function Vr(e) {
    return H(e) ? { setup: e, name: e.name } : e;
}
const ln = (e) => !!e.type.__asyncLoader,
    An = (e) => e.type.__isKeepAlive;
function zi(e, t) {
    Yr(e, "a", t);
}
function Di(e, t) {
    Yr(e, "da", t);
}
function Yr(e, t, n = ce) {
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
    if ((Rn(t, s, n), n)) {
        let r = n.parent;
        for (; r && r.parent; )
            An(r.parent.vnode) && Wi(s, t, n, r), (r = r.parent);
    }
}
function Wi(e, t, n, s) {
    const r = Rn(t, e, s, !0);
    Xr(() => {
        cs(s[t], r);
    }, n);
}
function Rn(e, t, n = ce, s = !1) {
    if (n) {
        const r = n[e] || (n[e] = []),
            o =
                t.__weh ||
                (t.__weh = (...i) => {
                    if (n.isUnmounted) return;
                    Tt(), At(n);
                    const c = Re(t, n, e, i);
                    return pt(), St(), c;
                });
        return s ? r.unshift(o) : r.push(o), o;
    }
}
const We =
        (e) =>
        (t, n = ce) =>
            (!Qt || e === "sp") && Rn(e, t, n),
    qi = We("bm"),
    Qr = We("m"),
    Vi = We("bu"),
    Yi = We("u"),
    Jr = We("bum"),
    Xr = We("um"),
    Qi = We("sp"),
    Ji = We("rtg"),
    Xi = We("rtc");
function Gi(e, t = ce) {
    Rn("ec", e, t);
}
function lt(e, t, n, s) {
    const r = e.dirs,
        o = t && t.dirs;
    for (let i = 0; i < r.length; i++) {
        const c = r[i];
        o && (c.oldValue = o[i].value);
        let l = c.dir[s];
        l && (Tt(), Re(l, n, 8, [e.el, c, e, t]), St());
    }
}
const Gr = "components";
function Zr(e, t) {
    return el(Gr, e, !0, t) || e;
}
const Zi = Symbol();
function el(e, t, n, s = !1) {
    const r = Se || ce;
    if (r) {
        const o = r.type;
        if (e === Gr) {
            const c = kl(o);
            if (c && (c === t || c === He(t) || c === bn(He(t)))) return o;
        }
        const i = Hs(r[e] || o[e], t) || Hs(r.appContext[e], t);
        return !i && s ? o : i;
    }
}
function Hs(e, t) {
    return e && (e[t] || e[He(t)] || e[bn(He(t))]);
}
const Vn = (e) => (e ? (fo(e) ? ws(e) || e.proxy : Vn(e.parent)) : null),
    hn = he(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => Vn(e.parent),
        $root: (e) => Vn(e.root),
        $emit: (e) => e.emit,
        $options: (e) => to(e),
        $forceUpdate: (e) => e.f || (e.f = () => Nr(e.update)),
        $nextTick: (e) => e.n || (e.n = jr.bind(e.proxy)),
        $watch: (e) => Hi.bind(e),
    }),
    tl = {
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
            let f;
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
                    if (s !== te && z(s, t)) return (i[t] = 1), s[t];
                    if (r !== te && z(r, t)) return (i[t] = 2), r[t];
                    if ((f = e.propsOptions[0]) && z(f, t))
                        return (i[t] = 3), o[t];
                    if (n !== te && z(n, t)) return (i[t] = 4), n[t];
                    Yn && (i[t] = 0);
                }
            }
            const a = hn[t];
            let p, h;
            if (a) return t === "$attrs" && xe(e, "get", t), a(e);
            if ((p = c.__cssModules) && (p = p[t])) return p;
            if (n !== te && z(n, t)) return (i[t] = 4), n[t];
            if (((h = l.config.globalProperties), z(h, t))) return h[t];
        },
        set({ _: e }, t, n) {
            const { data: s, setupState: r, ctx: o } = e;
            return r !== te && z(r, t)
                ? ((r[t] = n), !0)
                : s !== te && z(s, t)
                ? ((s[t] = n), !0)
                : z(e.props, t) || (t[0] === "$" && t.slice(1) in e)
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
                (e !== te && z(e, i)) ||
                (t !== te && z(t, i)) ||
                ((c = o[0]) && z(c, i)) ||
                z(s, i) ||
                z(hn, i) ||
                z(r.config.globalProperties, i)
            );
        },
        defineProperty(e, t, n) {
            return (
                n.get != null
                    ? (e._.accessCache[t] = 0)
                    : z(n, "value") && this.set(e, t, n.value, null),
                Reflect.defineProperty(e, t, n)
            );
        },
    };
let Yn = !0;
function nl(e) {
    const t = to(e),
        n = e.proxy,
        s = e.ctx;
    (Yn = !1), t.beforeCreate && Bs(t.beforeCreate, e, "bc");
    const {
        data: r,
        computed: o,
        methods: i,
        watch: c,
        provide: l,
        inject: f,
        created: a,
        beforeMount: p,
        mounted: h,
        beforeUpdate: y,
        updated: R,
        activated: k,
        deactivated: O,
        beforeDestroy: P,
        beforeUnmount: j,
        destroyed: U,
        unmounted: W,
        render: oe,
        renderTracked: de,
        renderTriggered: be,
        errorCaptured: K,
        serverPrefetch: ne,
        expose: re,
        inheritAttrs: ue,
        components: fe,
        directives: Pe,
        filters: qe,
    } = t;
    if ((f && sl(f, s, null, e.appContext.config.unwrapInjectedRef), i))
        for (const Z in i) {
            const Y = i[Z];
            H(Y) && (s[Z] = Y.bind(n));
        }
    if (r) {
        const Z = r.call(n, n);
        ge(Z) && (e.data = Xt(Z));
    }
    if (((Yn = !0), o))
        for (const Z in o) {
            const Y = o[Z],
                ye = H(Y) ? Y.bind(n, n) : H(Y.get) ? Y.get.bind(n, n) : Le,
                mt = !H(Y) && H(Y.set) ? Y.set.bind(n) : Le,
                Be = Ne({ get: ye, set: mt });
            Object.defineProperty(s, Z, {
                enumerable: !0,
                configurable: !0,
                get: () => Be.value,
                set: (ke) => (Be.value = ke),
            });
        }
    if (c) for (const Z in c) eo(c[Z], s, n, Z);
    if (l) {
        const Z = H(l) ? l.call(n) : l;
        Reflect.ownKeys(Z).forEach((Y) => {
            rn(Y, Z[Y]);
        });
    }
    a && Bs(a, e, "c");
    function le(Z, Y) {
        L(Y) ? Y.forEach((ye) => Z(ye.bind(n))) : Y && Z(Y.bind(n));
    }
    if (
        (le(qi, p),
        le(Qr, h),
        le(Vi, y),
        le(Yi, R),
        le(zi, k),
        le(Di, O),
        le(Gi, K),
        le(Xi, de),
        le(Ji, be),
        le(Jr, j),
        le(Xr, W),
        le(Qi, ne),
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
    oe && e.render === Le && (e.render = oe),
        ue != null && (e.inheritAttrs = ue),
        fe && (e.components = fe),
        Pe && (e.directives = Pe);
}
function sl(e, t, n, s = !1) {
    L(e) && (e = Qn(e));
    for (const r in e) {
        const o = e[r];
        let i;
        ge(o)
            ? "default" in o
                ? (i = tt(o.from || r, o.default, !0))
                : (i = tt(o.from || r))
            : (i = tt(o)),
            ae(i) && s
                ? Object.defineProperty(t, r, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => i.value,
                      set: (c) => (i.value = c),
                  })
                : (t[r] = i);
    }
}
function Bs(e, t, n) {
    Re(L(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function eo(e, t, n, s) {
    const r = s.includes(".") ? Dr(n, s) : () => n[s];
    if (pe(e)) {
        const o = t[e];
        H(o) && on(r, o);
    } else if (H(e)) on(r, e.bind(n));
    else if (ge(e))
        if (L(e)) e.forEach((o) => eo(o, t, n, s));
        else {
            const o = H(e.handler) ? e.handler.bind(n) : t[e.handler];
            H(o) && on(r, o, e);
        }
}
function to(e) {
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
              r.length && r.forEach((f) => pn(l, f, i, !0)),
              pn(l, t, i)),
        o.set(t, l),
        l
    );
}
function pn(e, t, n, s = !1) {
    const { mixins: r, extends: o } = t;
    o && pn(e, o, n, !0), r && r.forEach((i) => pn(e, i, n, !0));
    for (const i in t)
        if (!(s && i === "expose")) {
            const c = rl[i] || (n && n[i]);
            e[i] = c ? c(e[i], t[i]) : t[i];
        }
    return e;
}
const rl = {
    data: Ks,
    props: ft,
    emits: ft,
    methods: ft,
    computed: ft,
    beforeCreate: me,
    created: me,
    beforeMount: me,
    mounted: me,
    beforeUpdate: me,
    updated: me,
    beforeDestroy: me,
    beforeUnmount: me,
    destroyed: me,
    unmounted: me,
    activated: me,
    deactivated: me,
    errorCaptured: me,
    serverPrefetch: me,
    components: ft,
    directives: ft,
    watch: il,
    provide: Ks,
    inject: ol,
};
function Ks(e, t) {
    return t
        ? e
            ? function () {
                  return he(
                      H(e) ? e.call(this, this) : e,
                      H(t) ? t.call(this, this) : t
                  );
              }
            : t
        : e;
}
function ol(e, t) {
    return ft(Qn(e), Qn(t));
}
function Qn(e) {
    if (L(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function me(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function ft(e, t) {
    return e ? he(he(Object.create(null), e), t) : t;
}
function il(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = he(Object.create(null), e);
    for (const s in t) n[s] = me(e[s], t[s]);
    return n;
}
function ll(e, t, n, s = !1) {
    const r = {},
        o = {};
    fn(o, Pn, 1), (e.propsDefaults = Object.create(null)), no(e, t, r, o);
    for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
    n
        ? (e.props = s ? r : vi(r))
        : e.type.props
        ? (e.props = r)
        : (e.props = o),
        (e.attrs = o);
}
function cl(e, t, n, s) {
    const {
            props: r,
            attrs: o,
            vnode: { patchFlag: i },
        } = e,
        c = V(r),
        [l] = e.propsOptions;
    let f = !1;
    if ((s || i > 0) && !(i & 16)) {
        if (i & 8) {
            const a = e.vnode.dynamicProps;
            for (let p = 0; p < a.length; p++) {
                let h = a[p];
                if (xn(e.emitsOptions, h)) continue;
                const y = t[h];
                if (l)
                    if (z(o, h)) y !== o[h] && ((o[h] = y), (f = !0));
                    else {
                        const R = He(h);
                        r[R] = Jn(l, c, R, y, e, !1);
                    }
                else y !== o[h] && ((o[h] = y), (f = !0));
            }
        }
    } else {
        no(e, t, r, o) && (f = !0);
        let a;
        for (const p in c)
            (!t || (!z(t, p) && ((a = Ot(p)) === p || !z(t, a)))) &&
                (l
                    ? n &&
                      (n[p] !== void 0 || n[a] !== void 0) &&
                      (r[p] = Jn(l, c, p, void 0, e, !0))
                    : delete r[p]);
        if (o !== c)
            for (const p in o)
                (!t || (!z(t, p) && !0)) && (delete o[p], (f = !0));
    }
    f && ze(e, "set", "$attrs");
}
function no(e, t, n, s) {
    const [r, o] = e.propsOptions;
    let i = !1,
        c;
    if (t)
        for (let l in t) {
            if (sn(l)) continue;
            const f = t[l];
            let a;
            r && z(r, (a = He(l)))
                ? !o || !o.includes(a)
                    ? (n[a] = f)
                    : ((c || (c = {}))[a] = f)
                : xn(e.emitsOptions, l) ||
                  ((!(l in s) || f !== s[l]) && ((s[l] = f), (i = !0)));
        }
    if (o) {
        const l = V(n),
            f = c || te;
        for (let a = 0; a < o.length; a++) {
            const p = o[a];
            n[p] = Jn(r, l, p, f[p], e, !z(f, p));
        }
    }
    return i;
}
function Jn(e, t, n, s, r, o) {
    const i = e[n];
    if (i != null) {
        const c = z(i, "default");
        if (c && s === void 0) {
            const l = i.default;
            if (i.type !== Function && H(l)) {
                const { propsDefaults: f } = r;
                n in f
                    ? (s = f[n])
                    : (At(r), (s = f[n] = l.call(null, t)), pt());
            } else s = l;
        }
        i[0] &&
            (o && !c
                ? (s = !1)
                : i[1] && (s === "" || s === Ot(n)) && (s = !0));
    }
    return s;
}
function so(e, t, n = !1) {
    const s = t.propsCache,
        r = s.get(e);
    if (r) return r;
    const o = e.props,
        i = {},
        c = [];
    let l = !1;
    if (!H(e)) {
        const a = (p) => {
            l = !0;
            const [h, y] = so(p, t, !0);
            he(i, h), y && c.push(...y);
        };
        !n && t.mixins.length && t.mixins.forEach(a),
            e.extends && a(e.extends),
            e.mixins && e.mixins.forEach(a);
    }
    if (!o && !l) return s.set(e, xt), xt;
    if (L(o))
        for (let a = 0; a < o.length; a++) {
            const p = He(o[a]);
            Us(p) && (i[p] = te);
        }
    else if (o)
        for (const a in o) {
            const p = He(a);
            if (Us(p)) {
                const h = o[a],
                    y = (i[p] = L(h) || H(h) ? { type: h } : h);
                if (y) {
                    const R = Ws(Boolean, y.type),
                        k = Ws(String, y.type);
                    (y[0] = R > -1),
                        (y[1] = k < 0 || R < k),
                        (R > -1 || z(y, "default")) && c.push(p);
                }
            }
        }
    const f = [i, c];
    return s.set(e, f), f;
}
function Us(e) {
    return e[0] !== "$";
}
function zs(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : "";
}
function Ds(e, t) {
    return zs(e) === zs(t);
}
function Ws(e, t) {
    return L(t) ? t.findIndex((n) => Ds(n, e)) : H(t) && Ds(t, e) ? 0 : -1;
}
const ro = (e) => e[0] === "_" || e === "$stable",
    bs = (e) => (L(e) ? e.map(je) : [je(e)]),
    ul = (e, t, n) => {
        if (t._n) return t;
        const s = ut((...r) => bs(t(...r)), n);
        return (s._c = !1), s;
    },
    oo = (e, t, n) => {
        const s = e._ctx;
        for (const r in e) {
            if (ro(r)) continue;
            const o = e[r];
            if (H(o)) t[r] = ul(r, o, s);
            else if (o != null) {
                const i = bs(o);
                t[r] = () => i;
            }
        }
    },
    io = (e, t) => {
        const n = bs(t);
        e.slots.default = () => n;
    },
    fl = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? ((e.slots = V(t)), fn(t, "_", n)) : oo(t, (e.slots = {}));
        } else (e.slots = {}), t && io(e, t);
        fn(e.slots, Pn, 1);
    },
    al = (e, t, n) => {
        const { vnode: s, slots: r } = e;
        let o = !0,
            i = te;
        if (s.shapeFlag & 32) {
            const c = t._;
            c
                ? n && c === 1
                    ? (o = !1)
                    : (he(r, t), !n && c === 1 && delete r._)
                : ((o = !t.$stable), oo(t, r)),
                (i = t);
        } else t && (io(e, t), (i = { default: 1 }));
        if (o) for (const c in r) !ro(c) && !(c in i) && delete r[c];
    };
function lo() {
    return {
        app: null,
        config: {
            isNativeTag: $o,
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
let dl = 0;
function hl(e, t) {
    return function (s, r = null) {
        H(s) || (s = Object.assign({}, s)), r != null && !ge(r) && (r = null);
        const o = lo(),
            i = new Set();
        let c = !1;
        const l = (o.app = {
            _uid: dl++,
            _component: s,
            _props: r,
            _container: null,
            _context: o,
            _instance: null,
            version: $l,
            get config() {
                return o.config;
            },
            set config(f) {},
            use(f, ...a) {
                return (
                    i.has(f) ||
                        (f && H(f.install)
                            ? (i.add(f), f.install(l, ...a))
                            : H(f) && (i.add(f), f(l, ...a))),
                    l
                );
            },
            mixin(f) {
                return o.mixins.includes(f) || o.mixins.push(f), l;
            },
            component(f, a) {
                return a ? ((o.components[f] = a), l) : o.components[f];
            },
            directive(f, a) {
                return a ? ((o.directives[f] = a), l) : o.directives[f];
            },
            mount(f, a, p) {
                if (!c) {
                    const h = ie(s, r);
                    return (
                        (h.appContext = o),
                        a && t ? t(h, f) : e(h, f, p),
                        (c = !0),
                        (l._container = f),
                        (f.__vue_app__ = l),
                        ws(h.component) || h.component.proxy
                    );
                }
            },
            unmount() {
                c && (e(null, l._container), delete l._container.__vue_app__);
            },
            provide(f, a) {
                return (o.provides[f] = a), l;
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
    if (ln(s) && !r) return;
    const o = s.shapeFlag & 4 ? ws(s.component) || s.component.proxy : s.el,
        i = r ? null : o,
        { i: c, r: l } = e,
        f = t && t.r,
        a = c.refs === te ? (c.refs = {}) : c.refs,
        p = c.setupState;
    if (
        (f != null &&
            f !== l &&
            (pe(f)
                ? ((a[f] = null), z(p, f) && (p[f] = null))
                : ae(f) && (f.value = null)),
        H(l))
    )
        et(l, c, 12, [i, a]);
    else {
        const h = pe(l),
            y = ae(l);
        if (h || y) {
            const R = () => {
                if (e.f) {
                    const k = h ? a[l] : l.value;
                    r
                        ? L(k) && cs(k, o)
                        : L(k)
                        ? k.includes(o) || k.push(o)
                        : h
                        ? ((a[l] = [o]), z(p, l) && (p[l] = a[l]))
                        : ((l.value = [o]), e.k && (a[e.k] = l.value));
                } else
                    h
                        ? ((a[l] = i), z(p, l) && (p[l] = i))
                        : ae(l) && ((l.value = i), e.k && (a[e.k] = i));
            };
            i ? ((R.id = -1), ve(R, n)) : R();
        }
    }
}
const ve = Li;
function pl(e) {
    return gl(e);
}
function gl(e, t) {
    const n = Do();
    n.__VUE__ = !0;
    const {
            insert: s,
            remove: r,
            patchProp: o,
            createElement: i,
            createText: c,
            createComment: l,
            setText: f,
            setElementText: a,
            parentNode: p,
            nextSibling: h,
            setScopeId: y = Le,
            cloneNode: R,
            insertStaticContent: k,
        } = e,
        O = (
            u,
            d,
            g,
            v = null,
            _ = null,
            w = null,
            A = !1,
            E = null,
            x = !!d.dynamicChildren
        ) => {
            if (u === d) return;
            u && !at(u, d) && ((v = I(u)), Ce(u, _, w, !0), (u = null)),
                d.patchFlag === -2 && ((x = !1), (d.dynamicChildren = null));
            const { type: b, ref: M, shapeFlag: T } = d;
            switch (b) {
                case ys:
                    P(u, d, g, v);
                    break;
                case Ue:
                    j(u, d, g, v);
                    break;
                case cn:
                    u == null && U(d, g, v, A);
                    break;
                case _e:
                    Pe(u, d, g, v, _, w, A, E, x);
                    break;
                default:
                    T & 1
                        ? de(u, d, g, v, _, w, A, E, x)
                        : T & 6
                        ? qe(u, d, g, v, _, w, A, E, x)
                        : (T & 64 || T & 128) &&
                          b.process(u, d, g, v, _, w, A, E, x, ee);
            }
            M != null && _ && Xn(M, u && u.ref, w, d || u, !d);
        },
        P = (u, d, g, v) => {
            if (u == null) s((d.el = c(d.children)), g, v);
            else {
                const _ = (d.el = u.el);
                d.children !== u.children && f(_, d.children);
            }
        },
        j = (u, d, g, v) => {
            u == null ? s((d.el = l(d.children || "")), g, v) : (d.el = u.el);
        },
        U = (u, d, g, v) => {
            [u.el, u.anchor] = k(u.children, d, g, v, u.el, u.anchor);
        },
        W = ({ el: u, anchor: d }, g, v) => {
            let _;
            for (; u && u !== d; ) (_ = h(u)), s(u, g, v), (u = _);
            s(d, g, v);
        },
        oe = ({ el: u, anchor: d }) => {
            let g;
            for (; u && u !== d; ) (g = h(u)), r(u), (u = g);
            r(d);
        },
        de = (u, d, g, v, _, w, A, E, x) => {
            (A = A || d.type === "svg"),
                u == null
                    ? be(d, g, v, _, w, A, E, x)
                    : re(u, d, _, w, A, E, x);
        },
        be = (u, d, g, v, _, w, A, E) => {
            let x, b;
            const {
                type: M,
                props: T,
                shapeFlag: $,
                transition: F,
                patchFlag: D,
                dirs: J,
            } = u;
            if (u.el && R !== void 0 && D === -1) x = u.el = R(u.el);
            else {
                if (
                    ((x = u.el = i(u.type, w, T && T.is, T)),
                    $ & 8
                        ? a(x, u.children)
                        : $ & 16 &&
                          ne(
                              u.children,
                              x,
                              null,
                              v,
                              _,
                              w && M !== "foreignObject",
                              A,
                              E
                          ),
                    J && lt(u, null, v, "created"),
                    T)
                ) {
                    for (const se in T)
                        se !== "value" &&
                            !sn(se) &&
                            o(x, se, null, T[se], w, u.children, v, _, C);
                    "value" in T && o(x, "value", null, T.value),
                        (b = T.onVnodeBeforeMount) && $e(b, v, u);
                }
                K(x, u, u.scopeId, A, v);
            }
            J && lt(u, null, v, "beforeMount");
            const X = (!_ || (_ && !_.pendingBranch)) && F && !F.persisted;
            X && F.beforeEnter(x),
                s(x, d, g),
                ((b = T && T.onVnodeMounted) || X || J) &&
                    ve(() => {
                        b && $e(b, v, u),
                            X && F.enter(x),
                            J && lt(u, null, v, "mounted");
                    }, _);
        },
        K = (u, d, g, v, _) => {
            if ((g && y(u, g), v))
                for (let w = 0; w < v.length; w++) y(u, v[w]);
            if (_) {
                let w = _.subTree;
                if (d === w) {
                    const A = _.vnode;
                    K(u, A, A.scopeId, A.slotScopeIds, _.parent);
                }
            }
        },
        ne = (u, d, g, v, _, w, A, E, x = 0) => {
            for (let b = x; b < u.length; b++) {
                const M = (u[b] = E ? Xe(u[b]) : je(u[b]));
                O(null, M, d, g, v, _, w, A, E);
            }
        },
        re = (u, d, g, v, _, w, A) => {
            const E = (d.el = u.el);
            let { patchFlag: x, dynamicChildren: b, dirs: M } = d;
            x |= u.patchFlag & 16;
            const T = u.props || te,
                $ = d.props || te;
            let F;
            g && ct(g, !1),
                (F = $.onVnodeBeforeUpdate) && $e(F, g, d, u),
                M && lt(d, u, g, "beforeUpdate"),
                g && ct(g, !0);
            const D = _ && d.type !== "foreignObject";
            if (
                (b
                    ? ue(u.dynamicChildren, b, E, g, v, D, w)
                    : A || ye(u, d, E, null, g, v, D, w, !1),
                x > 0)
            ) {
                if (x & 16) fe(E, d, T, $, g, v, _);
                else if (
                    (x & 2 &&
                        T.class !== $.class &&
                        o(E, "class", null, $.class, _),
                    x & 4 && o(E, "style", T.style, $.style, _),
                    x & 8)
                ) {
                    const J = d.dynamicProps;
                    for (let X = 0; X < J.length; X++) {
                        const se = J[X],
                            Oe = T[se],
                            _t = $[se];
                        (_t !== Oe || se === "value") &&
                            o(E, se, Oe, _t, _, u.children, g, v, C);
                    }
                }
                x & 1 && u.children !== d.children && a(E, d.children);
            } else !A && b == null && fe(E, d, T, $, g, v, _);
            ((F = $.onVnodeUpdated) || M) &&
                ve(() => {
                    F && $e(F, g, d, u), M && lt(d, u, g, "updated");
                }, v);
        },
        ue = (u, d, g, v, _, w, A) => {
            for (let E = 0; E < d.length; E++) {
                const x = u[E],
                    b = d[E],
                    M =
                        x.el && (x.type === _e || !at(x, b) || x.shapeFlag & 70)
                            ? p(x.el)
                            : g;
                O(x, b, M, null, v, _, w, A, !0);
            }
        },
        fe = (u, d, g, v, _, w, A) => {
            if (g !== v) {
                for (const E in v) {
                    if (sn(E)) continue;
                    const x = v[E],
                        b = g[E];
                    x !== b &&
                        E !== "value" &&
                        o(u, E, b, x, A, d.children, _, w, C);
                }
                if (g !== te)
                    for (const E in g)
                        !sn(E) &&
                            !(E in v) &&
                            o(u, E, g[E], null, A, d.children, _, w, C);
                "value" in v && o(u, "value", g.value, v.value);
            }
        },
        Pe = (u, d, g, v, _, w, A, E, x) => {
            const b = (d.el = u ? u.el : c("")),
                M = (d.anchor = u ? u.anchor : c(""));
            let { patchFlag: T, dynamicChildren: $, slotScopeIds: F } = d;
            F && (E = E ? E.concat(F) : F),
                u == null
                    ? (s(b, g, v),
                      s(M, g, v),
                      ne(d.children, g, M, _, w, A, E, x))
                    : T > 0 && T & 64 && $ && u.dynamicChildren
                    ? (ue(u.dynamicChildren, $, g, _, w, A, E),
                      (d.key != null || (_ && d === _.subTree)) && co(u, d, !0))
                    : ye(u, d, g, M, _, w, A, E, x);
        },
        qe = (u, d, g, v, _, w, A, E, x) => {
            (d.slotScopeIds = E),
                u == null
                    ? d.shapeFlag & 512
                        ? _.ctx.activate(d, g, v, A, x)
                        : gt(d, g, v, _, w, A, x)
                    : le(u, d, x);
        },
        gt = (u, d, g, v, _, w, A) => {
            const E = (u.component = Rl(u, v, _));
            if ((An(u) && (E.ctx.renderer = ee), Ol(E), E.asyncDep)) {
                if ((_ && _.registerDep(E, Z), !u.el)) {
                    const x = (E.subTree = ie(Ue));
                    j(null, x, d, g);
                }
                return;
            }
            Z(E, u, d, g, _, w, A);
        },
        le = (u, d, g) => {
            const v = (d.component = u.component);
            if (Fi(u, d, g))
                if (v.asyncDep && !v.asyncResolved) {
                    Y(v, d, g);
                    return;
                } else (v.next = d), Pi(v.update), v.update();
            else (d.el = u.el), (v.vnode = d);
        },
        Z = (u, d, g, v, _, w, A) => {
            const E = () => {
                    if (u.isMounted) {
                        let { next: M, bu: T, u: $, parent: F, vnode: D } = u,
                            J = M,
                            X;
                        ct(u, !1),
                            M ? ((M.el = D.el), Y(u, M, A)) : (M = D),
                            T && In(T),
                            (X = M.props && M.props.onVnodeBeforeUpdate) &&
                                $e(X, F, M, D),
                            ct(u, !0);
                        const se = kn(u),
                            Oe = u.subTree;
                        (u.subTree = se),
                            O(Oe, se, p(Oe.el), I(Oe), u, _, w),
                            (M.el = se.el),
                            J === null && ji(u, se.el),
                            $ && ve($, _),
                            (X = M.props && M.props.onVnodeUpdated) &&
                                ve(() => $e(X, F, M, D), _);
                    } else {
                        let M;
                        const { el: T, props: $ } = d,
                            { bm: F, m: D, parent: J } = u,
                            X = ln(d);
                        if (
                            (ct(u, !1),
                            F && In(F),
                            !X &&
                                (M = $ && $.onVnodeBeforeMount) &&
                                $e(M, J, d),
                            ct(u, !0),
                            T && N)
                        ) {
                            const se = () => {
                                (u.subTree = kn(u)),
                                    N(T, u.subTree, u, _, null);
                            };
                            X
                                ? d.type
                                      .__asyncLoader()
                                      .then(() => !u.isUnmounted && se())
                                : se();
                        } else {
                            const se = (u.subTree = kn(u));
                            O(null, se, g, v, u, _, w), (d.el = se.el);
                        }
                        if (
                            (D && ve(D, _), !X && (M = $ && $.onVnodeMounted))
                        ) {
                            const se = d;
                            ve(() => $e(M, J, se), _);
                        }
                        (d.shapeFlag & 256 ||
                            (J && ln(J.vnode) && J.vnode.shapeFlag & 256)) &&
                            u.a &&
                            ve(u.a, _),
                            (u.isMounted = !0),
                            (d = g = v = null);
                    }
                },
                x = (u.effect = new ds(E, () => Nr(b), u.scope)),
                b = (u.update = () => x.run());
            (b.id = u.uid), ct(u, !0), b();
        },
        Y = (u, d, g) => {
            d.component = u;
            const v = u.vnode.props;
            (u.vnode = d),
                (u.next = null),
                cl(u, d.props, v, g),
                al(u, d.children, g),
                Tt(),
                wn(void 0, u.update),
                St();
        },
        ye = (u, d, g, v, _, w, A, E, x = !1) => {
            const b = u && u.children,
                M = u ? u.shapeFlag : 0,
                T = d.children,
                { patchFlag: $, shapeFlag: F } = d;
            if ($ > 0) {
                if ($ & 128) {
                    Be(b, T, g, v, _, w, A, E, x);
                    return;
                } else if ($ & 256) {
                    mt(b, T, g, v, _, w, A, E, x);
                    return;
                }
            }
            F & 8
                ? (M & 16 && C(b, _, w), T !== b && a(g, T))
                : M & 16
                ? F & 16
                    ? Be(b, T, g, v, _, w, A, E, x)
                    : C(b, _, w, !0)
                : (M & 8 && a(g, ""), F & 16 && ne(T, g, v, _, w, A, E, x));
        },
        mt = (u, d, g, v, _, w, A, E, x) => {
            (u = u || xt), (d = d || xt);
            const b = u.length,
                M = d.length,
                T = Math.min(b, M);
            let $;
            for ($ = 0; $ < T; $++) {
                const F = (d[$] = x ? Xe(d[$]) : je(d[$]));
                O(u[$], F, g, null, _, w, A, E, x);
            }
            b > M ? C(u, _, w, !0, !1, T) : ne(d, g, v, _, w, A, E, x, T);
        },
        Be = (u, d, g, v, _, w, A, E, x) => {
            let b = 0;
            const M = d.length;
            let T = u.length - 1,
                $ = M - 1;
            for (; b <= T && b <= $; ) {
                const F = u[b],
                    D = (d[b] = x ? Xe(d[b]) : je(d[b]));
                if (at(F, D)) O(F, D, g, null, _, w, A, E, x);
                else break;
                b++;
            }
            for (; b <= T && b <= $; ) {
                const F = u[T],
                    D = (d[$] = x ? Xe(d[$]) : je(d[$]));
                if (at(F, D)) O(F, D, g, null, _, w, A, E, x);
                else break;
                T--, $--;
            }
            if (b > T) {
                if (b <= $) {
                    const F = $ + 1,
                        D = F < M ? d[F].el : v;
                    for (; b <= $; )
                        O(
                            null,
                            (d[b] = x ? Xe(d[b]) : je(d[b])),
                            g,
                            D,
                            _,
                            w,
                            A,
                            E,
                            x
                        ),
                            b++;
                }
            } else if (b > $) for (; b <= T; ) Ce(u[b], _, w, !0), b++;
            else {
                const F = b,
                    D = b,
                    J = new Map();
                for (b = D; b <= $; b++) {
                    const Ee = (d[b] = x ? Xe(d[b]) : je(d[b]));
                    Ee.key != null && J.set(Ee.key, b);
                }
                let X,
                    se = 0;
                const Oe = $ - D + 1;
                let _t = !1,
                    As = 0;
                const Mt = new Array(Oe);
                for (b = 0; b < Oe; b++) Mt[b] = 0;
                for (b = F; b <= T; b++) {
                    const Ee = u[b];
                    if (se >= Oe) {
                        Ce(Ee, _, w, !0);
                        continue;
                    }
                    let Me;
                    if (Ee.key != null) Me = J.get(Ee.key);
                    else
                        for (X = D; X <= $; X++)
                            if (Mt[X - D] === 0 && at(Ee, d[X])) {
                                Me = X;
                                break;
                            }
                    Me === void 0
                        ? Ce(Ee, _, w, !0)
                        : ((Mt[Me - D] = b + 1),
                          Me >= As ? (As = Me) : (_t = !0),
                          O(Ee, d[Me], g, null, _, w, A, E, x),
                          se++);
                }
                const Rs = _t ? ml(Mt) : xt;
                for (X = Rs.length - 1, b = Oe - 1; b >= 0; b--) {
                    const Ee = D + b,
                        Me = d[Ee],
                        Ps = Ee + 1 < M ? d[Ee + 1].el : v;
                    Mt[b] === 0
                        ? O(null, Me, g, Ps, _, w, A, E, x)
                        : _t && (X < 0 || b !== Rs[X] ? ke(Me, g, Ps, 2) : X--);
                }
            }
        },
        ke = (u, d, g, v, _ = null) => {
            const {
                el: w,
                type: A,
                transition: E,
                children: x,
                shapeFlag: b,
            } = u;
            if (b & 6) {
                ke(u.component.subTree, d, g, v);
                return;
            }
            if (b & 128) {
                u.suspense.move(d, g, v);
                return;
            }
            if (b & 64) {
                A.move(u, d, g, ee);
                return;
            }
            if (A === _e) {
                s(w, d, g);
                for (let T = 0; T < x.length; T++) ke(x[T], d, g, v);
                s(u.anchor, d, g);
                return;
            }
            if (A === cn) {
                W(u, d, g);
                return;
            }
            if (v !== 2 && b & 1 && E)
                if (v === 0)
                    E.beforeEnter(w), s(w, d, g), ve(() => E.enter(w), _);
                else {
                    const { leave: T, delayLeave: $, afterLeave: F } = E,
                        D = () => s(w, d, g),
                        J = () => {
                            T(w, () => {
                                D(), F && F();
                            });
                        };
                    $ ? $(w, D, J) : J();
                }
            else s(w, d, g);
        },
        Ce = (u, d, g, v = !1, _ = !1) => {
            const {
                type: w,
                props: A,
                ref: E,
                children: x,
                dynamicChildren: b,
                shapeFlag: M,
                patchFlag: T,
                dirs: $,
            } = u;
            if ((E != null && Xn(E, null, g, u, !0), M & 256)) {
                d.ctx.deactivate(u);
                return;
            }
            const F = M & 1 && $,
                D = !ln(u);
            let J;
            if ((D && (J = A && A.onVnodeBeforeUnmount) && $e(J, d, u), M & 6))
                S(u.component, g, v);
            else {
                if (M & 128) {
                    u.suspense.unmount(g, v);
                    return;
                }
                F && lt(u, null, d, "beforeUnmount"),
                    M & 64
                        ? u.type.remove(u, d, g, _, ee, v)
                        : b && (w !== _e || (T > 0 && T & 64))
                        ? C(b, d, g, !1, !0)
                        : ((w === _e && T & 384) || (!_ && M & 16)) &&
                          C(x, d, g),
                    v && Tn(u);
            }
            ((D && (J = A && A.onVnodeUnmounted)) || F) &&
                ve(() => {
                    J && $e(J, d, u), F && lt(u, null, d, "unmounted");
                }, g);
        },
        Tn = (u) => {
            const { type: d, el: g, anchor: v, transition: _ } = u;
            if (d === _e) {
                m(g, v);
                return;
            }
            if (d === cn) {
                oe(u);
                return;
            }
            const w = () => {
                r(g), _ && !_.persisted && _.afterLeave && _.afterLeave();
            };
            if (u.shapeFlag & 1 && _ && !_.persisted) {
                const { leave: A, delayLeave: E } = _,
                    x = () => A(g, w);
                E ? E(u.el, w, x) : x();
            } else w();
        },
        m = (u, d) => {
            let g;
            for (; u !== d; ) (g = h(u)), r(u), (u = g);
            r(d);
        },
        S = (u, d, g) => {
            const { bum: v, scope: _, update: w, subTree: A, um: E } = u;
            v && In(v),
                _.stop(),
                w && ((w.active = !1), Ce(A, u, d, g)),
                E && ve(E, d),
                ve(() => {
                    u.isUnmounted = !0;
                }, d),
                d &&
                    d.pendingBranch &&
                    !d.isUnmounted &&
                    u.asyncDep &&
                    !u.asyncResolved &&
                    u.suspenseId === d.pendingId &&
                    (d.deps--, d.deps === 0 && d.resolve());
        },
        C = (u, d, g, v = !1, _ = !1, w = 0) => {
            for (let A = w; A < u.length; A++) Ce(u[A], d, g, v, _);
        },
        I = (u) =>
            u.shapeFlag & 6
                ? I(u.component.subTree)
                : u.shapeFlag & 128
                ? u.suspense.next()
                : h(u.anchor || u.el),
        Q = (u, d, g) => {
            u == null
                ? d._vnode && Ce(d._vnode, null, null, !0)
                : O(d._vnode || null, u, d, null, null, null, g),
                Br(),
                (d._vnode = u);
        },
        ee = {
            p: O,
            um: Ce,
            m: ke,
            r: Tn,
            mt: gt,
            mc: ne,
            pc: ye,
            pbc: ue,
            n: I,
            o: e,
        };
    let B, N;
    return (
        t && ([B, N] = t(ee)), { render: Q, hydrate: B, createApp: hl(Q, B) }
    );
}
function ct({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function co(e, t, n = !1) {
    const s = e.children,
        r = t.children;
    if (L(s) && L(r))
        for (let o = 0; o < s.length; o++) {
            const i = s[o];
            let c = r[o];
            c.shapeFlag & 1 &&
                !c.dynamicChildren &&
                ((c.patchFlag <= 0 || c.patchFlag === 32) &&
                    ((c = r[o] = Xe(r[o])), (c.el = i.el)),
                n || co(i, c));
        }
}
function ml(e) {
    const t = e.slice(),
        n = [0];
    let s, r, o, i, c;
    const l = e.length;
    for (s = 0; s < l; s++) {
        const f = e[s];
        if (f !== 0) {
            if (((r = n[n.length - 1]), e[r] < f)) {
                (t[s] = r), n.push(s);
                continue;
            }
            for (o = 0, i = n.length - 1; o < i; )
                (c = (o + i) >> 1), e[n[c]] < f ? (o = c + 1) : (i = c);
            f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
        }
    }
    for (o = n.length, i = n[o - 1]; o-- > 0; ) (n[o] = i), (i = t[i]);
    return n;
}
const _l = (e) => e.__isTeleport,
    _e = Symbol(void 0),
    ys = Symbol(void 0),
    Ue = Symbol(void 0),
    cn = Symbol(void 0),
    Kt = [];
let Ie = null;
function rt(e = !1) {
    Kt.push((Ie = e ? null : []));
}
function vl() {
    Kt.pop(), (Ie = Kt[Kt.length - 1] || null);
}
let Yt = 1;
function qs(e) {
    Yt += e;
}
function bl(e) {
    return (
        (e.dynamicChildren = Yt > 0 ? Ie || xt : null),
        vl(),
        Yt > 0 && Ie && Ie.push(e),
        e
    );
}
function ot(e, t, n, s, r, o) {
    return bl(q(e, t, n, s, r, o, !0));
}
function Gn(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function at(e, t) {
    return e.type === t.type && e.key === t.key;
}
const Pn = "__vInternal",
    uo = ({ key: e }) => (e != null ? e : null),
    un = ({ ref: e, ref_key: t, ref_for: n }) =>
        e != null
            ? pe(e) || ae(e) || H(e)
                ? { i: Se, r: e, k: t, f: !!n }
                : e
            : null;
function q(
    e,
    t = null,
    n = null,
    s = 0,
    r = null,
    o = e === _e ? 0 : 1,
    i = !1,
    c = !1
) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && uo(t),
        ref: t && un(t),
        scopeId: Cn,
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
            ? (Es(l, n), o & 128 && e.normalize(l))
            : n && (l.shapeFlag |= pe(n) ? 8 : 16),
        Yt > 0 &&
            !i &&
            Ie &&
            (l.patchFlag > 0 || o & 6) &&
            l.patchFlag !== 32 &&
            Ie.push(l),
        l
    );
}
const ie = yl;
function yl(e, t = null, n = null, s = 0, r = null, o = !1) {
    if (((!e || e === Zi) && (e = Ue), Gn(e))) {
        const c = st(e, t, !0);
        return (
            n && Es(c, n),
            Yt > 0 &&
                !o &&
                Ie &&
                (c.shapeFlag & 6 ? (Ie[Ie.indexOf(e)] = c) : Ie.push(c)),
            (c.patchFlag |= -2),
            c
        );
    }
    if ((Ml(e) && (e = e.__vccOpts), t)) {
        t = El(t);
        let { class: c, style: l } = t;
        c && !pe(c) && (t.class = is(c)),
            ge(l) && (Tr(l) && !L(l) && (l = he({}, l)), (t.style = os(l)));
    }
    const i = pe(e) ? 1 : Ni(e) ? 128 : _l(e) ? 64 : ge(e) ? 4 : H(e) ? 2 : 0;
    return q(e, t, n, s, r, i, o, !0);
}
function El(e) {
    return e ? (Tr(e) || Pn in e ? he({}, e) : e) : null;
}
function st(e, t, n = !1) {
    const { props: s, ref: r, patchFlag: o, children: i } = e,
        c = t ? xl(s || {}, t) : s;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: c,
        key: c && uo(c),
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
        patchFlag: t && e.type !== _e ? (o === -1 ? 16 : o | 16) : o,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && st(e.ssContent),
        ssFallback: e.ssFallback && st(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
    };
}
function De(e = " ", t = 0) {
    return ie(ys, null, e, t);
}
function wl(e, t) {
    const n = ie(cn, null, e);
    return (n.staticCount = t), n;
}
function je(e) {
    return e == null || typeof e == "boolean"
        ? ie(Ue)
        : L(e)
        ? ie(_e, null, e.slice())
        : typeof e == "object"
        ? Xe(e)
        : ie(ys, null, String(e));
}
function Xe(e) {
    return e.el === null || e.memo ? e : st(e);
}
function Es(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t == null) t = null;
    else if (L(t)) n = 16;
    else if (typeof t == "object")
        if (s & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1), Es(e, r()), r._c && (r._d = !0));
            return;
        } else {
            n = 32;
            const r = t._;
            !r && !(Pn in t)
                ? (t._ctx = Se)
                : r === 3 &&
                  Se &&
                  (Se.slots._ === 1
                      ? (t._ = 1)
                      : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else
        H(t)
            ? ((t = { default: t, _ctx: Se }), (n = 32))
            : ((t = String(t)), s & 64 ? ((n = 16), (t = [De(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function xl(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === "class")
                t.class !== s.class && (t.class = is([t.class, s.class]));
            else if (r === "style") t.style = os([t.style, s.style]);
            else if (mn(r)) {
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
function $e(e, t, n, s = null) {
    Re(e, t, 7, [n, s]);
}
const Cl = lo();
let Al = 0;
function Rl(e, t, n) {
    const s = e.type,
        r = (t ? t.appContext : e.appContext) || Cl,
        o = {
            uid: Al++,
            vnode: e,
            type: s,
            parent: t,
            appContext: r,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Wo(!0),
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
            propsOptions: so(s, r),
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
        (o.emit = Si.bind(null, o)),
        e.ce && e.ce(o),
        o
    );
}
let ce = null;
const Pl = () => ce || Se,
    At = (e) => {
        (ce = e), e.scope.on();
    },
    pt = () => {
        ce && ce.scope.off(), (ce = null);
    };
function fo(e) {
    return e.vnode.shapeFlag & 4;
}
let Qt = !1;
function Ol(e, t = !1) {
    Qt = t;
    const { props: n, children: s } = e.vnode,
        r = fo(e);
    ll(e, n, r, t), fl(e, s);
    const o = r ? Tl(e, t) : void 0;
    return (Qt = !1), o;
}
function Tl(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = Sr(new Proxy(e.ctx, tl)));
    const { setup: s } = n;
    if (s) {
        const r = (e.setupContext = s.length > 1 ? Il(e) : null);
        At(e), Tt();
        const o = et(s, e, 0, [e.props, r]);
        if ((St(), pt(), _r(o))) {
            if ((o.then(pt, pt), t))
                return o
                    .then((i) => {
                        Vs(e, i, t);
                    })
                    .catch((i) => {
                        En(i, e, 0);
                    });
            e.asyncDep = o;
        } else Vs(e, o, t);
    } else ao(e, t);
}
function Vs(e, t, n) {
    H(t)
        ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
        : ge(t) && (e.setupState = $r(t)),
        ao(e, n);
}
let Ys;
function ao(e, t, n) {
    const s = e.type;
    if (!e.render) {
        if (!t && Ys && !s.render) {
            const r = s.template;
            if (r) {
                const { isCustomElement: o, compilerOptions: i } =
                        e.appContext.config,
                    { delimiters: c, compilerOptions: l } = s,
                    f = he(he({ isCustomElement: o, delimiters: c }, i), l);
                s.render = Ys(r, f);
            }
        }
        e.render = s.render || Le;
    }
    At(e), Tt(), nl(e), St(), pt();
}
function Sl(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return xe(e, "get", "$attrs"), t[n];
        },
    });
}
function Il(e) {
    const t = (s) => {
        e.exposed = s || {};
    };
    let n;
    return {
        get attrs() {
            return n || (n = Sl(e));
        },
        slots: e.slots,
        emit: e.emit,
        expose: t,
    };
}
function ws(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy($r(Sr(e.exposed)), {
                get(t, n) {
                    if (n in t) return t[n];
                    if (n in hn) return hn[n](e);
                },
            }))
        );
}
function kl(e) {
    return (H(e) && e.displayName) || e.name;
}
function Ml(e) {
    return H(e) && "__vccOpts" in e;
}
const Ne = (e, t) => Ci(e, t, Qt);
function ho(e, t, n) {
    const s = arguments.length;
    return s === 2
        ? ge(t) && !L(t)
            ? Gn(t)
                ? ie(e, null, [t])
                : ie(e, t)
            : ie(e, null, t)
        : (s > 3
              ? (n = Array.prototype.slice.call(arguments, 2))
              : s === 3 && Gn(n) && (n = [n]),
          ie(e, t, n));
}
const $l = "3.2.36",
    Fl = "http://www.w3.org/2000/svg",
    dt = typeof document != "undefined" ? document : null,
    Qs = dt && dt.createElement("template"),
    jl = {
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
                Qs.innerHTML = s ? `<svg>${e}</svg>` : e;
                const c = Qs.content;
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
function Nl(e, t, n) {
    const s = e._vtc;
    s && (t = (t ? [t, ...s] : [...s]).join(" ")),
        t == null
            ? e.removeAttribute("class")
            : n
            ? e.setAttribute("class", t)
            : (e.className = t);
}
function Ll(e, t, n) {
    const s = e.style,
        r = pe(n);
    if (n && !r) {
        for (const o in n) Zn(s, o, n[o]);
        if (t && !pe(t)) for (const o in t) n[o] == null && Zn(s, o, "");
    } else {
        const o = s.display;
        r ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
            "_vod" in e && (s.display = o);
    }
}
const Js = /\s*!important$/;
function Zn(e, t, n) {
    if (L(n)) n.forEach((s) => Zn(e, t, s));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
        const s = Hl(e, t);
        Js.test(n)
            ? e.setProperty(Ot(s), n.replace(Js, ""), "important")
            : (e[s] = n);
    }
}
const Xs = ["Webkit", "Moz", "ms"],
    $n = {};
function Hl(e, t) {
    const n = $n[t];
    if (n) return n;
    let s = He(t);
    if (s !== "filter" && s in e) return ($n[t] = s);
    s = bn(s);
    for (let r = 0; r < Xs.length; r++) {
        const o = Xs[r] + s;
        if (o in e) return ($n[t] = o);
    }
    return t;
}
const Gs = "http://www.w3.org/1999/xlink";
function Bl(e, t, n, s, r) {
    if (s && t.startsWith("xlink:"))
        n == null
            ? e.removeAttributeNS(Gs, t.slice(6, t.length))
            : e.setAttributeNS(Gs, t, n);
    else {
        const o = So(t);
        n == null || (o && !mr(n))
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
            ? (n = mr(n))
            : n == null && l === "string"
            ? ((n = ""), (c = !0))
            : l === "number" && ((n = 0), (c = !0));
    }
    try {
        e[t] = n;
    } catch {}
    c && e.removeAttribute(t);
}
const [po, Ul] = (() => {
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
let es = 0;
const zl = Promise.resolve(),
    Dl = () => {
        es = 0;
    },
    Wl = () => es || (zl.then(Dl), (es = po()));
function ql(e, t, n, s) {
    e.addEventListener(t, n, s);
}
function Vl(e, t, n, s) {
    e.removeEventListener(t, n, s);
}
function Yl(e, t, n, s, r = null) {
    const o = e._vei || (e._vei = {}),
        i = o[t];
    if (s && i) i.value = s;
    else {
        const [c, l] = Ql(t);
        if (s) {
            const f = (o[t] = Jl(s, r));
            ql(e, c, f, l);
        } else i && (Vl(e, c, i, l), (o[t] = void 0));
    }
}
const Zs = /(?:Once|Passive|Capture)$/;
function Ql(e) {
    let t;
    if (Zs.test(e)) {
        t = {};
        let n;
        for (; (n = e.match(Zs)); )
            (e = e.slice(0, e.length - n[0].length)),
                (t[n[0].toLowerCase()] = !0);
    }
    return [Ot(e.slice(2)), t];
}
function Jl(e, t) {
    const n = (s) => {
        const r = s.timeStamp || po();
        (Ul || r >= n.attached - 1) && Re(Xl(s, n.value), t, 5, [s]);
    };
    return (n.value = e), (n.attached = Wl()), n;
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
const er = /^on[a-z]/,
    Gl = (e, t, n, s, r = !1, o, i, c, l) => {
        t === "class"
            ? Nl(e, s, r)
            : t === "style"
            ? Ll(e, n, s)
            : mn(t)
            ? ls(t) || Yl(e, t, n, s, i)
            : (
                  t[0] === "."
                      ? ((t = t.slice(1)), !0)
                      : t[0] === "^"
                      ? ((t = t.slice(1)), !1)
                      : Zl(e, t, s, r)
              )
            ? Kl(e, t, s, o, i, c, l)
            : (t === "true-value"
                  ? (e._trueValue = s)
                  : t === "false-value" && (e._falseValue = s),
              Bl(e, t, s, r));
    };
function Zl(e, t, n, s) {
    return s
        ? !!(
              t === "innerHTML" ||
              t === "textContent" ||
              (t in e && er.test(t) && H(n))
          )
        : t === "spellcheck" ||
          t === "draggable" ||
          t === "translate" ||
          t === "form" ||
          (t === "list" && e.tagName === "INPUT") ||
          (t === "type" && e.tagName === "TEXTAREA") ||
          (er.test(t) && pe(n))
        ? !1
        : t in e;
}
const ec = {
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
const tc = he({ patchProp: Gl }, jl);
let tr;
function nc() {
    return tr || (tr = pl(tc));
}
const sc = (...e) => {
    const t = nc().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (s) => {
            const r = rc(s);
            if (!r) return;
            const o = t._component;
            !H(o) && !o.render && !o.template && (o.template = r.innerHTML),
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
function rc(e) {
    return pe(e) ? document.querySelector(e) : e;
}
var it = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
};
const oc = {},
    ic = { class: "navigation" },
    lc = De("Overzicht"),
    cc = De("Opdracht 1"),
    uc = De("Opdracht 2"),
    fc = De("Opdracht 3"),
    ac = De("Opdracht 4"),
    dc = De("Opdracht 5");
function hc(e, t) {
    const n = Zr("router-link");
    return (
        rt(),
        ot("div", ic, [
            ie(n, { to: { name: "home" } }, { default: ut(() => [lc]), _: 1 }),
            ie(n, { to: { name: "1" } }, { default: ut(() => [cc]), _: 1 }),
            ie(n, { to: { name: "2" } }, { default: ut(() => [uc]), _: 1 }),
            ie(n, { to: { name: "3" } }, { default: ut(() => [fc]), _: 1 }),
            ie(n, { to: { name: "4" } }, { default: ut(() => [ac]), _: 1 }),
            ie(n, { to: { name: "5" } }, { default: ut(() => [dc]), _: 1 }),
        ])
    );
}
var pc = it(oc, [
    ["render", hc],
    ["__scopeId", "data-v-80af9aec"],
]);
const gc = {
    name: "App",
    setup(e) {
        return (t, n) => {
            const s = Zr("router-view");
            return rt(), ot(_e, null, [ie(pc), ie(s)], 64);
        };
    },
};
var mc = "./assets/at5.1165db42.jpg";
const _c = {},
    vc = q("h1", null, "Opdracht 1", -1),
    bc = q(
        "p",
        null,
        "Het vinden van een dark store is niet altijd even makkelijk. ",
        -1
    ),
    yc = q(
        "p",
        null,
        "Sommigen worden bijvoorbeeld niet getoond op Google maps. Maar dat betekend niet dat je ze met een beetje speurwerk kan vinden. Kijk bijvoorbeeld naar deze foto van een Gorillas vestiging. ",
        -1
    ),
    Ec = q("img", { src: mc }, null, -1),
    wc = q(
        "h2",
        { class: "question" },
        "Vraag: Kun je het adres vinden van deze Gorillas?",
        -1
    );
function xc(e, t) {
    return rt(), ot(_e, null, [vc, bc, yc, Ec, wc], 64);
}
var Cc = it(_c, [["render", xc]]),
    Ac = "./assets/nos.945c3d49.jpg";
const Rc = {},
    Pc = q("h1", null, "Opdracht 2", -1),
    Oc = q(
        "p",
        null,
        "Goed bezig met het vinden van de eerste Gorillas vestiging! ",
        -1
    ),
    Tc = q(
        "p",
        null,
        "AT5 is niet de enige die video's heeft gemaakt over dark stores. de NOS heeft ook een video gemaakt over dark stores waar we deze vestiging van FLINK zien. ",
        -1
    ),
    Sc = q("img", { src: Ac }, null, -1),
    Ic = q(
        "h2",
        { class: "question" },
        "Vraag: Wat is het adres van deze Flink vestiging?",
        -1
    );
function kc(e, t) {
    return rt(), ot(_e, null, [Pc, Oc, Tc, Sc, Ic], 64);
}
var Mc = it(Rc, [["render", kc]]),
    $c = "./assets/nos.d32832ff.jpg";
const Fc = {},
    jc = q("h1", null, "Opdracht 3", -1),
    Nc = q(
        "p",
        null,
        "Ok, vanaf nu gaan we hard de moeilijkheid omhoog schroeven want het is duidelijk dat je er klaar voor bent.",
        -1
    ),
    Lc = q(
        "p",
        null,
        " Denk rustig terug aan de vorige opdracht. Hoe heb je zaken aangepakt en welke informatie op het scherm heb je gebruikt voor het vinden van het juiste antwoord?",
        -1
    ),
    Hc = q("p", null, "Klaar? Hier is de foto:", -1),
    Bc = q("img", { src: $c }, null, -1),
    Kc = q(
        "h2",
        { class: "question" },
        "Vraag 1: Van welke dienst is deze vestiging?",
        -1
    ),
    Uc = q(
        "h2",
        { class: "question" },
        "Vraag 2: Wat is het adres van deze vestiging?",
        -1
    );
function zc(e, t) {
    return rt(), ot(_e, null, [jc, Nc, Lc, Hc, Bc, Kc, Uc], 64);
}
var Dc = it(Fc, [["render", zc]]),
    Wc = "./assets/omroepwest.96e0c3ba.jpg";
const qc = {},
    Vc = q("h1", null, "Opdracht 4", -1),
    Yc = q(
        "p",
        null,
        "Dus je bent heel goed in het vinden van locatie op basis van een afbeelding, maar kun je er ook eentje vinden alleen op basis van een beschrijving? ",
        -1
    ),
    Qc = q(
        "p",
        null,
        " Hieronder zie je een citaat uit een artikel van Omroep West: ",
        -1
    ),
    Jc = q("img", { src: Wc, class: "border" }, null, -1),
    Xc = q(
        "h2",
        { class: "question" },
        "Vraag 1: In welke stad staat deze Flink vestiging?",
        -1
    ),
    Gc = q(
        "h2",
        { class: "question" },
        "Vraag 2: Wat is het oude uitzicht van het restaurant?",
        -1
    );
function Zc(e, t) {
    return rt(), ot(_e, null, [Vc, Yc, Qc, Jc, Xc, Gc], 64);
}
var eu = it(qc, [["render", Zc]]);
const tu = {},
    nu = wl(
        '<h1>Opdracht 5</h1><p>Wauw! OK, tijd voor wat extra informatie.</p><p> Sommige foto&#39;s maken het heel lastig om alleen op visuele informatie op te lossen. Bij elke foto die je maakt wordt namelijk niet alleen een afbeelding opgeslagen maar in het bestand wordt ook extra informatie opgeslagen. </p><p>Deze extra informatie kun zien door middel van een <a href="https://jimpl.com/">EXIF viewer</a>.</p><p>Bij elke foto willen we graag weten:</p><img src="https://polinfratechniek.nl/wp-content/uploads/2021/01/cropped-cropped-pol-logo-groot.png" class="border"><h2 class="question">Vraag 1: Waar is deze foto gemaakt?</h2><h2 class="question">Vraag 2: Wanneer is deze foto gemaakt?</h2><h2 class="question">Vraag 3: Welke apparaat heeft deze foto gemaakt?</h2>',
        9
    );
function su(e, t) {
    return nu;
}
var ru = it(tu, [["render", su]]);
const ou = {},
    It = (e) => (Ii("data-v-503994a1"), (e = e()), ki(), e),
    iu = { class: "home" },
    lu = It(() => q("h1", null, "Welkom!", -1)),
    cu = It(() =>
        q(
            "p",
            null,
            "Super dat je aansluit bij deze open source intelligence workshop over dark stores!",
            -1
        )
    ),
    uu = It(() =>
        q(
            "p",
            null,
            [
                De("Je vind alle opdrachten bovenin de navigatiebalk. "),
                q("br"),
                De(" Opdracht 1 staat al klaar voor je."),
            ],
            -1
        )
    ),
    fu = It(() => q("h2", null, "Heb je een opdracht af? ", -1)),
    au = It(() =>
        q(
            "p",
            null,
            "Laat Marieke het antwoord zien van de opdracht waaraan je hebt gewerkt, zij geeft je het wachtwoord waarmee je de volgende opdracht kan openen.",
            -1
        )
    ),
    du = It(() => q("p", null, "Succes!", -1)),
    hu = [lu, cu, uu, fu, au, du];
function pu(e, t) {
    return rt(), ot("section", iu, hu);
}
var gu = it(ou, [
    ["render", pu],
    ["__scopeId", "data-v-503994a1"],
]);
const mu = {};
function _u(e, t) {
    return (
        rt(), ot("p", null, "Helaas, deze pagina kon niet gevonden worden :'(")
    );
}
var vu = it(mu, [["render", _u]]);
/*!
 * vue-router v4.0.15
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const go =
        typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol",
    kt = (e) => (go ? Symbol(e) : "_vr_" + e),
    bu = kt("rvlm"),
    nr = kt("rvd"),
    xs = kt("r"),
    mo = kt("rl"),
    ts = kt("rvl"),
    Et = typeof window != "undefined";
function yu(e) {
    return e.__esModule || (go && e[Symbol.toStringTag] === "Module");
}
const G = Object.assign;
function Fn(e, t) {
    const n = {};
    for (const s in t) {
        const r = t[s];
        n[s] = Array.isArray(r) ? r.map(e) : e(r);
    }
    return n;
}
const Ut = () => {},
    Eu = /\/$/,
    wu = (e) => e.replace(Eu, "");
function jn(e, t, n = "/") {
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
        (s = Ru(s != null ? s : t, n)),
        { fullPath: s + (o && "?") + o + i, path: s, query: r, hash: i }
    );
}
function xu(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "");
}
function sr(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase())
        ? e
        : e.slice(t.length) || "/";
}
function Cu(e, t, n) {
    const s = t.matched.length - 1,
        r = n.matched.length - 1;
    return (
        s > -1 &&
        s === r &&
        Rt(t.matched[s], n.matched[r]) &&
        _o(t.params, n.params) &&
        e(t.query) === e(n.query) &&
        t.hash === n.hash
    );
}
function Rt(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
}
function _o(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!Au(e[n], t[n])) return !1;
    return !0;
}
function Au(e, t) {
    return Array.isArray(e) ? rr(e, t) : Array.isArray(t) ? rr(t, e) : e === t;
}
function rr(e, t) {
    return Array.isArray(t)
        ? e.length === t.length && e.every((n, s) => n === t[s])
        : e.length === 1 && e[0] === t;
}
function Ru(e, t) {
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
var zt;
(function (e) {
    (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(zt || (zt = {}));
function Pu(e) {
    if (!e)
        if (Et) {
            const t = document.querySelector("base");
            (e = (t && t.getAttribute("href")) || "/"),
                (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
        } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), wu(e);
}
const Ou = /^[^#]+#/;
function Tu(e, t) {
    return e.replace(Ou, "#") + t;
}
function Su(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
        s = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: s.left - n.left - (t.left || 0),
        top: s.top - n.top - (t.top || 0),
    };
}
const On = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function Iu(e) {
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
        t = Su(r, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style
        ? window.scrollTo(t)
        : window.scrollTo(
              t.left != null ? t.left : window.pageXOffset,
              t.top != null ? t.top : window.pageYOffset
          );
}
function or(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
}
const ns = new Map();
function ku(e, t) {
    ns.set(e, t);
}
function Mu(e) {
    const t = ns.get(e);
    return ns.delete(e), t;
}
let $u = () => location.protocol + "//" + location.host;
function vo(e, t) {
    const { pathname: n, search: s, hash: r } = t,
        o = e.indexOf("#");
    if (o > -1) {
        let c = r.includes(e.slice(o)) ? e.slice(o).length : 1,
            l = r.slice(c);
        return l[0] !== "/" && (l = "/" + l), sr(l, "");
    }
    return sr(n, e) + s + r;
}
function Fu(e, t, n, s) {
    let r = [],
        o = [],
        i = null;
    const c = ({ state: h }) => {
        const y = vo(e, location),
            R = n.value,
            k = t.value;
        let O = 0;
        if (h) {
            if (((n.value = y), (t.value = h), i && i === R)) {
                i = null;
                return;
            }
            O = k ? h.position - k.position : 0;
        } else s(y);
        r.forEach((P) => {
            P(n.value, R, {
                delta: O,
                type: Jt.pop,
                direction: O ? (O > 0 ? zt.forward : zt.back) : zt.unknown,
            });
        });
    };
    function l() {
        i = n.value;
    }
    function f(h) {
        r.push(h);
        const y = () => {
            const R = r.indexOf(h);
            R > -1 && r.splice(R, 1);
        };
        return o.push(y), y;
    }
    function a() {
        const { history: h } = window;
        !h.state || h.replaceState(G({}, h.state, { scroll: On() }), "");
    }
    function p() {
        for (const h of o) h();
        (o = []),
            window.removeEventListener("popstate", c),
            window.removeEventListener("beforeunload", a);
    }
    return (
        window.addEventListener("popstate", c),
        window.addEventListener("beforeunload", a),
        { pauseListeners: l, listen: f, destroy: p }
    );
}
function ir(e, t, n, s = !1, r = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: s,
        position: window.history.length,
        scroll: r ? On() : null,
    };
}
function ju(e) {
    const { history: t, location: n } = window,
        s = { value: vo(e, n) },
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
    function o(l, f, a) {
        const p = e.indexOf("#"),
            h =
                p > -1
                    ? (n.host && document.querySelector("base")
                          ? e
                          : e.slice(p)) + l
                    : $u() + e + l;
        try {
            t[a ? "replaceState" : "pushState"](f, "", h), (r.value = f);
        } catch (y) {
            console.error(y), n[a ? "replace" : "assign"](h);
        }
    }
    function i(l, f) {
        const a = G({}, t.state, ir(r.value.back, l, r.value.forward, !0), f, {
            position: r.value.position,
        });
        o(l, a, !0), (s.value = l);
    }
    function c(l, f) {
        const a = G({}, r.value, t.state, { forward: l, scroll: On() });
        o(a.current, a, !0);
        const p = G({}, ir(s.value, l, null), { position: a.position + 1 }, f);
        o(l, p, !1), (s.value = l);
    }
    return { location: s, state: r, push: c, replace: i };
}
function Nu(e) {
    e = Pu(e);
    const t = ju(e),
        n = Fu(e, t.state, t.location, t.replace);
    function s(o, i = !0) {
        i || n.pauseListeners(), history.go(o);
    }
    const r = G(
        { location: "", base: e, go: s, createHref: Tu.bind(null, e) },
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
function Lu(e) {
    return (
        (e = location.host ? e || location.pathname + location.search : ""),
        e.includes("#") || (e += "#"),
        Nu(e)
    );
}
function Hu(e) {
    return typeof e == "string" || (e && typeof e == "object");
}
function bo(e) {
    return typeof e == "string" || typeof e == "symbol";
}
const Ye = {
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
    yo = kt("nf");
var lr;
(function (e) {
    (e[(e.aborted = 4)] = "aborted"),
        (e[(e.cancelled = 8)] = "cancelled"),
        (e[(e.duplicated = 16)] = "duplicated");
})(lr || (lr = {}));
function Pt(e, t) {
    return G(new Error(), { type: e, [yo]: !0 }, t);
}
function Qe(e, t) {
    return e instanceof Error && yo in e && (t == null || !!(e.type & t));
}
const cr = "[^/]+?",
    Bu = { sensitive: !1, strict: !1, start: !0, end: !0 },
    Ku = /[.+*?^${}()[\]/\\]/g;
function Uu(e, t) {
    const n = G({}, Bu, t),
        s = [];
    let r = n.start ? "^" : "";
    const o = [];
    for (const f of e) {
        const a = f.length ? [] : [90];
        n.strict && !f.length && (r += "/");
        for (let p = 0; p < f.length; p++) {
            const h = f[p];
            let y = 40 + (n.sensitive ? 0.25 : 0);
            if (h.type === 0)
                p || (r += "/"), (r += h.value.replace(Ku, "\\$&")), (y += 40);
            else if (h.type === 1) {
                const { value: R, repeatable: k, optional: O, regexp: P } = h;
                o.push({ name: R, repeatable: k, optional: O });
                const j = P || cr;
                if (j !== cr) {
                    y += 10;
                    try {
                        new RegExp(`(${j})`);
                    } catch (W) {
                        throw new Error(
                            `Invalid custom RegExp for param "${R}" (${j}): ` +
                                W.message
                        );
                    }
                }
                let U = k ? `((?:${j})(?:/(?:${j}))*)` : `(${j})`;
                p || (U = O && f.length < 2 ? `(?:/${U})` : "/" + U),
                    O && (U += "?"),
                    (r += U),
                    (y += 20),
                    O && (y += -8),
                    k && (y += -20),
                    j === ".*" && (y += -50);
            }
            a.push(y);
        }
        s.push(a);
    }
    if (n.strict && n.end) {
        const f = s.length - 1;
        s[f][s[f].length - 1] += 0.7000000000000001;
    }
    n.strict || (r += "/?"), n.end ? (r += "$") : n.strict && (r += "(?:/|$)");
    const i = new RegExp(r, n.sensitive ? "" : "i");
    function c(f) {
        const a = f.match(i),
            p = {};
        if (!a) return null;
        for (let h = 1; h < a.length; h++) {
            const y = a[h] || "",
                R = o[h - 1];
            p[R.name] = y && R.repeatable ? y.split("/") : y;
        }
        return p;
    }
    function l(f) {
        let a = "",
            p = !1;
        for (const h of e) {
            (!p || !a.endsWith("/")) && (a += "/"), (p = !1);
            for (const y of h)
                if (y.type === 0) a += y.value;
                else if (y.type === 1) {
                    const { value: R, repeatable: k, optional: O } = y,
                        P = R in f ? f[R] : "";
                    if (Array.isArray(P) && !k)
                        throw new Error(
                            `Provided param "${R}" is an array but it is not repeatable (* or + modifiers)`
                        );
                    const j = Array.isArray(P) ? P.join("/") : P;
                    if (!j)
                        if (O)
                            h.length < 2 &&
                                e.length > 1 &&
                                (a.endsWith("/")
                                    ? (a = a.slice(0, -1))
                                    : (p = !0));
                        else throw new Error(`Missing required param "${R}"`);
                    a += j;
                }
        }
        return a;
    }
    return { re: i, score: s, keys: o, parse: c, stringify: l };
}
function zu(e, t) {
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
function Du(e, t) {
    let n = 0;
    const s = e.score,
        r = t.score;
    for (; n < s.length && n < r.length; ) {
        const o = zu(s[n], r[n]);
        if (o) return o;
        n++;
    }
    return r.length - s.length;
}
const Wu = { type: 0, value: "" },
    qu = /[a-zA-Z0-9_]/;
function Vu(e) {
    if (!e) return [[]];
    if (e === "/") return [[Wu]];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
    function t(y) {
        throw new Error(`ERR (${n})/"${f}": ${y}`);
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
        f = "",
        a = "";
    function p() {
        !f ||
            (n === 0
                ? o.push({ type: 0, value: f })
                : n === 1 || n === 2 || n === 3
                ? (o.length > 1 &&
                      (l === "*" || l === "+") &&
                      t(
                          `A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`
                      ),
                  o.push({
                      type: 1,
                      value: f,
                      regexp: a,
                      repeatable: l === "*" || l === "+",
                      optional: l === "*" || l === "?",
                  }))
                : t("Invalid state to consume buffer"),
            (f = ""));
    }
    function h() {
        f += l;
    }
    for (; c < e.length; ) {
        if (((l = e[c++]), l === "\\" && n !== 2)) {
            (s = n), (n = 4);
            continue;
        }
        switch (n) {
            case 0:
                l === "/" ? (f && p(), i()) : l === ":" ? (p(), (n = 1)) : h();
                break;
            case 4:
                h(), (n = s);
                break;
            case 1:
                l === "("
                    ? (n = 2)
                    : qu.test(l)
                    ? h()
                    : (p(),
                      (n = 0),
                      l !== "*" && l !== "?" && l !== "+" && c--);
                break;
            case 2:
                l === ")"
                    ? a[a.length - 1] == "\\"
                        ? (a = a.slice(0, -1) + l)
                        : (n = 3)
                    : (a += l);
                break;
            case 3:
                p(),
                    (n = 0),
                    l !== "*" && l !== "?" && l !== "+" && c--,
                    (a = "");
                break;
            default:
                t("Unknown state");
                break;
        }
    }
    return (
        n === 2 && t(`Unfinished custom RegExp for param "${f}"`), p(), i(), r
    );
}
function Yu(e, t, n) {
    const s = Uu(Vu(e.path), n),
        r = G(s, { record: e, parent: t, children: [], alias: [] });
    return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Qu(e, t) {
    const n = [],
        s = new Map();
    t = fr({ strict: !1, end: !0, sensitive: !1 }, t);
    function r(a) {
        return s.get(a);
    }
    function o(a, p, h) {
        const y = !h,
            R = Xu(a);
        R.aliasOf = h && h.record;
        const k = fr(t, a),
            O = [R];
        if ("alias" in a) {
            const U = typeof a.alias == "string" ? [a.alias] : a.alias;
            for (const W of U)
                O.push(
                    G({}, R, {
                        components: h ? h.record.components : R.components,
                        path: W,
                        aliasOf: h ? h.record : R,
                    })
                );
        }
        let P, j;
        for (const U of O) {
            const { path: W } = U;
            if (p && W[0] !== "/") {
                const oe = p.record.path,
                    de = oe[oe.length - 1] === "/" ? "" : "/";
                U.path = p.record.path + (W && de + W);
            }
            if (
                ((P = Yu(U, p, k)),
                h
                    ? h.alias.push(P)
                    : ((j = j || P),
                      j !== P && j.alias.push(P),
                      y && a.name && !ur(P) && i(a.name)),
                "children" in R)
            ) {
                const oe = R.children;
                for (let de = 0; de < oe.length; de++)
                    o(oe[de], P, h && h.children[de]);
            }
            (h = h || P), l(P);
        }
        return j
            ? () => {
                  i(j);
              }
            : Ut;
    }
    function i(a) {
        if (bo(a)) {
            const p = s.get(a);
            p &&
                (s.delete(a),
                n.splice(n.indexOf(p), 1),
                p.children.forEach(i),
                p.alias.forEach(i));
        } else {
            const p = n.indexOf(a);
            p > -1 &&
                (n.splice(p, 1),
                a.record.name && s.delete(a.record.name),
                a.children.forEach(i),
                a.alias.forEach(i));
        }
    }
    function c() {
        return n;
    }
    function l(a) {
        let p = 0;
        for (
            ;
            p < n.length &&
            Du(a, n[p]) >= 0 &&
            (a.record.path !== n[p].record.path || !Eo(a, n[p]));

        )
            p++;
        n.splice(p, 0, a), a.record.name && !ur(a) && s.set(a.record.name, a);
    }
    function f(a, p) {
        let h,
            y = {},
            R,
            k;
        if ("name" in a && a.name) {
            if (((h = s.get(a.name)), !h)) throw Pt(1, { location: a });
            (k = h.record.name),
                (y = G(
                    Ju(
                        p.params,
                        h.keys.filter((j) => !j.optional).map((j) => j.name)
                    ),
                    a.params
                )),
                (R = h.stringify(y));
        } else if ("path" in a)
            (R = a.path),
                (h = n.find((j) => j.re.test(R))),
                h && ((y = h.parse(R)), (k = h.record.name));
        else {
            if (
                ((h = p.name
                    ? s.get(p.name)
                    : n.find((j) => j.re.test(p.path))),
                !h)
            )
                throw Pt(1, { location: a, currentLocation: p });
            (k = h.record.name),
                (y = G({}, p.params, a.params)),
                (R = h.stringify(y));
        }
        const O = [];
        let P = h;
        for (; P; ) O.unshift(P.record), (P = P.parent);
        return { name: k, path: R, params: y, matched: O, meta: Zu(O) };
    }
    return (
        e.forEach((a) => o(a)),
        {
            addRoute: o,
            resolve: f,
            removeRoute: i,
            getRoutes: c,
            getRecordMatcher: r,
        }
    );
}
function Ju(e, t) {
    const n = {};
    for (const s of t) s in e && (n[s] = e[s]);
    return n;
}
function Xu(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: Gu(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set(),
        updateGuards: new Set(),
        enterCallbacks: {},
        components:
            "components" in e ? e.components || {} : { default: e.component },
    };
}
function Gu(e) {
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
function Zu(e) {
    return e.reduce((t, n) => G(t, n.meta), {});
}
function fr(e, t) {
    const n = {};
    for (const s in e) n[s] = s in t ? t[s] : e[s];
    return n;
}
function Eo(e, t) {
    return t.children.some((n) => n === e || Eo(e, n));
}
const wo = /#/g,
    ef = /&/g,
    tf = /\//g,
    nf = /=/g,
    sf = /\?/g,
    xo = /\+/g,
    rf = /%5B/g,
    of = /%5D/g,
    Co = /%5E/g,
    lf = /%60/g,
    Ao = /%7B/g,
    cf = /%7C/g,
    Ro = /%7D/g,
    uf = /%20/g;
function Cs(e) {
    return encodeURI("" + e)
        .replace(cf, "|")
        .replace(rf, "[")
        .replace(of, "]");
}
function ff(e) {
    return Cs(e).replace(Ao, "{").replace(Ro, "}").replace(Co, "^");
}
function ss(e) {
    return Cs(e)
        .replace(xo, "%2B")
        .replace(uf, "+")
        .replace(wo, "%23")
        .replace(ef, "%26")
        .replace(lf, "`")
        .replace(Ao, "{")
        .replace(Ro, "}")
        .replace(Co, "^");
}
function af(e) {
    return ss(e).replace(nf, "%3D");
}
function df(e) {
    return Cs(e).replace(wo, "%23").replace(sf, "%3F");
}
function hf(e) {
    return e == null ? "" : df(e).replace(tf, "%2F");
}
function gn(e) {
    try {
        return decodeURIComponent("" + e);
    } catch {}
    return "" + e;
}
function pf(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const s = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let r = 0; r < s.length; ++r) {
        const o = s[r].replace(xo, " "),
            i = o.indexOf("="),
            c = gn(i < 0 ? o : o.slice(0, i)),
            l = i < 0 ? null : gn(o.slice(i + 1));
        if (c in t) {
            let f = t[c];
            Array.isArray(f) || (f = t[c] = [f]), f.push(l);
        } else t[c] = l;
    }
    return t;
}
function ar(e) {
    let t = "";
    for (let n in e) {
        const s = e[n];
        if (((n = af(n)), s == null)) {
            s !== void 0 && (t += (t.length ? "&" : "") + n);
            continue;
        }
        (Array.isArray(s) ? s.map((o) => o && ss(o)) : [s && ss(s)]).forEach(
            (o) => {
                o !== void 0 &&
                    ((t += (t.length ? "&" : "") + n),
                    o != null && (t += "=" + o));
            }
        );
    }
    return t;
}
function gf(e) {
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
function $t() {
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
function Ge(e, t, n, s, r) {
    const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
    return () =>
        new Promise((i, c) => {
            const l = (p) => {
                    p === !1
                        ? c(Pt(4, { from: n, to: t }))
                        : p instanceof Error
                        ? c(p)
                        : Hu(p)
                        ? c(Pt(2, { from: t, to: p }))
                        : (o &&
                              s.enterCallbacks[r] === o &&
                              typeof p == "function" &&
                              o.push(p),
                          i());
                },
                f = e.call(s && s.instances[r], t, n, l);
            let a = Promise.resolve(f);
            e.length < 3 && (a = a.then(l)), a.catch((p) => c(p));
        });
}
function Nn(e, t, n, s) {
    const r = [];
    for (const o of e)
        for (const i in o.components) {
            let c = o.components[i];
            if (!(t !== "beforeRouteEnter" && !o.instances[i]))
                if (mf(c)) {
                    const f = (c.__vccOpts || c)[t];
                    f && r.push(Ge(f, n, s, o, i));
                } else {
                    let l = c();
                    r.push(() =>
                        l.then((f) => {
                            if (!f)
                                return Promise.reject(
                                    new Error(
                                        `Couldn't resolve component "${i}" at "${o.path}"`
                                    )
                                );
                            const a = yu(f) ? f.default : f;
                            o.components[i] = a;
                            const h = (a.__vccOpts || a)[t];
                            return h && Ge(h, n, s, o, i)();
                        })
                    );
                }
        }
    return r;
}
function mf(e) {
    return (
        typeof e == "object" ||
        "displayName" in e ||
        "props" in e ||
        "__vccOpts" in e
    );
}
function dr(e) {
    const t = tt(xs),
        n = tt(mo),
        s = Ne(() => t.resolve(Lt(e.to))),
        r = Ne(() => {
            const { matched: l } = s.value,
                { length: f } = l,
                a = l[f - 1],
                p = n.matched;
            if (!a || !p.length) return -1;
            const h = p.findIndex(Rt.bind(null, a));
            if (h > -1) return h;
            const y = hr(l[f - 2]);
            return f > 1 && hr(a) === y && p[p.length - 1].path !== y
                ? p.findIndex(Rt.bind(null, l[f - 2]))
                : h;
        }),
        o = Ne(() => r.value > -1 && yf(n.params, s.value.params)),
        i = Ne(
            () =>
                r.value > -1 &&
                r.value === n.matched.length - 1 &&
                _o(n.params, s.value.params)
        );
    function c(l = {}) {
        return bf(l)
            ? t[Lt(e.replace) ? "replace" : "push"](Lt(e.to)).catch(Ut)
            : Promise.resolve();
    }
    return {
        route: s,
        href: Ne(() => s.value.href),
        isActive: o,
        isExactActive: i,
        navigate: c,
    };
}
const _f = Vr({
        name: "RouterLink",
        props: {
            to: { type: [String, Object], required: !0 },
            replace: Boolean,
            activeClass: String,
            exactActiveClass: String,
            custom: Boolean,
            ariaCurrentValue: { type: String, default: "page" },
        },
        useLink: dr,
        setup(e, { slots: t }) {
            const n = Xt(dr(e)),
                { options: s } = tt(xs),
                r = Ne(() => ({
                    [pr(
                        e.activeClass,
                        s.linkActiveClass,
                        "router-link-active"
                    )]: n.isActive,
                    [pr(
                        e.exactActiveClass,
                        s.linkExactActiveClass,
                        "router-link-exact-active"
                    )]: n.isExactActive,
                }));
            return () => {
                const o = t.default && t.default(n);
                return e.custom
                    ? o
                    : ho(
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
    vf = _f;
function bf(e) {
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
function yf(e, t) {
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
function hr(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const pr = (e, t, n) => (e != null ? e : t != null ? t : n),
    Ef = Vr({
        name: "RouterView",
        inheritAttrs: !1,
        props: { name: { type: String, default: "default" }, route: Object },
        compatConfig: { MODE: 3 },
        setup(e, { attrs: t, slots: n }) {
            const s = tt(ts),
                r = Ne(() => e.route || s.value),
                o = tt(nr, 0),
                i = Ne(() => r.value.matched[o]);
            rn(nr, o + 1), rn(bu, i), rn(ts, r);
            const c = bi();
            return (
                on(
                    () => [c.value, i.value, e.name],
                    ([l, f, a], [p, h, y]) => {
                        f &&
                            ((f.instances[a] = l),
                            h &&
                                h !== f &&
                                l &&
                                l === p &&
                                (f.leaveGuards.size ||
                                    (f.leaveGuards = h.leaveGuards),
                                f.updateGuards.size ||
                                    (f.updateGuards = h.updateGuards))),
                            l &&
                                f &&
                                (!h || !Rt(f, h) || !p) &&
                                (f.enterCallbacks[a] || []).forEach((R) =>
                                    R(l)
                                );
                    },
                    { flush: "post" }
                ),
                () => {
                    const l = r.value,
                        f = i.value,
                        a = f && f.components[e.name],
                        p = e.name;
                    if (!a) return gr(n.default, { Component: a, route: l });
                    const h = f.props[e.name],
                        y = h
                            ? h === !0
                                ? l.params
                                : typeof h == "function"
                                ? h(l)
                                : h
                            : null,
                        k = ho(
                            a,
                            G({}, y, t, {
                                onVnodeUnmounted: (O) => {
                                    O.component.isUnmounted &&
                                        (f.instances[p] = null);
                                },
                                ref: c,
                            })
                        );
                    return gr(n.default, { Component: k, route: l }) || k;
                }
            );
        },
    });
function gr(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
}
const wf = Ef;
function xf(e) {
    const t = Qu(e.routes, e),
        n = e.parseQuery || pf,
        s = e.stringifyQuery || ar,
        r = e.history,
        o = $t(),
        i = $t(),
        c = $t(),
        l = yi(Ye);
    let f = Ye;
    Et &&
        e.scrollBehavior &&
        "scrollRestoration" in history &&
        (history.scrollRestoration = "manual");
    const a = Fn.bind(null, (m) => "" + m),
        p = Fn.bind(null, hf),
        h = Fn.bind(null, gn);
    function y(m, S) {
        let C, I;
        return (
            bo(m) ? ((C = t.getRecordMatcher(m)), (I = S)) : (I = m),
            t.addRoute(I, C)
        );
    }
    function R(m) {
        const S = t.getRecordMatcher(m);
        S && t.removeRoute(S);
    }
    function k() {
        return t.getRoutes().map((m) => m.record);
    }
    function O(m) {
        return !!t.getRecordMatcher(m);
    }
    function P(m, S) {
        if (((S = G({}, S || l.value)), typeof m == "string")) {
            const N = jn(n, m, S.path),
                u = t.resolve({ path: N.path }, S),
                d = r.createHref(N.fullPath);
            return G(N, u, {
                params: h(u.params),
                hash: gn(N.hash),
                redirectedFrom: void 0,
                href: d,
            });
        }
        let C;
        if ("path" in m) C = G({}, m, { path: jn(n, m.path, S.path).path });
        else {
            const N = G({}, m.params);
            for (const u in N) N[u] == null && delete N[u];
            (C = G({}, m, { params: p(m.params) })), (S.params = p(S.params));
        }
        const I = t.resolve(C, S),
            Q = m.hash || "";
        I.params = a(h(I.params));
        const ee = xu(s, G({}, m, { hash: ff(Q), path: I.path })),
            B = r.createHref(ee);
        return G(
            {
                fullPath: ee,
                hash: Q,
                query: s === ar ? gf(m.query) : m.query || {},
            },
            I,
            { redirectedFrom: void 0, href: B }
        );
    }
    function j(m) {
        return typeof m == "string" ? jn(n, m, l.value.path) : G({}, m);
    }
    function U(m, S) {
        if (f !== m) return Pt(8, { from: S, to: m });
    }
    function W(m) {
        return be(m);
    }
    function oe(m) {
        return W(G(j(m), { replace: !0 }));
    }
    function de(m) {
        const S = m.matched[m.matched.length - 1];
        if (S && S.redirect) {
            const { redirect: C } = S;
            let I = typeof C == "function" ? C(m) : C;
            return (
                typeof I == "string" &&
                    ((I =
                        I.includes("?") || I.includes("#")
                            ? (I = j(I))
                            : { path: I }),
                    (I.params = {})),
                G({ query: m.query, hash: m.hash, params: m.params }, I)
            );
        }
    }
    function be(m, S) {
        const C = (f = P(m)),
            I = l.value,
            Q = m.state,
            ee = m.force,
            B = m.replace === !0,
            N = de(C);
        if (N) return be(G(j(N), { state: Q, force: ee, replace: B }), S || C);
        const u = C;
        u.redirectedFrom = S;
        let d;
        return (
            !ee &&
                Cu(s, I, C) &&
                ((d = Pt(16, { to: u, from: I })), mt(I, I, !0, !1)),
            (d ? Promise.resolve(d) : ne(u, I))
                .catch((g) => (Qe(g) ? (Qe(g, 2) ? g : ye(g)) : Z(g, u, I)))
                .then((g) => {
                    if (g) {
                        if (Qe(g, 2))
                            return be(
                                G(j(g.to), { state: Q, force: ee, replace: B }),
                                S || u
                            );
                    } else g = ue(u, I, !0, B, Q);
                    return re(u, I, g), g;
                })
        );
    }
    function K(m, S) {
        const C = U(m, S);
        return C ? Promise.reject(C) : Promise.resolve();
    }
    function ne(m, S) {
        let C;
        const [I, Q, ee] = Cf(m, S);
        C = Nn(I.reverse(), "beforeRouteLeave", m, S);
        for (const N of I)
            N.leaveGuards.forEach((u) => {
                C.push(Ge(u, m, S));
            });
        const B = K.bind(null, m, S);
        return (
            C.push(B),
            vt(C)
                .then(() => {
                    C = [];
                    for (const N of o.list()) C.push(Ge(N, m, S));
                    return C.push(B), vt(C);
                })
                .then(() => {
                    C = Nn(Q, "beforeRouteUpdate", m, S);
                    for (const N of Q)
                        N.updateGuards.forEach((u) => {
                            C.push(Ge(u, m, S));
                        });
                    return C.push(B), vt(C);
                })
                .then(() => {
                    C = [];
                    for (const N of m.matched)
                        if (N.beforeEnter && !S.matched.includes(N))
                            if (Array.isArray(N.beforeEnter))
                                for (const u of N.beforeEnter)
                                    C.push(Ge(u, m, S));
                            else C.push(Ge(N.beforeEnter, m, S));
                    return C.push(B), vt(C);
                })
                .then(
                    () => (
                        m.matched.forEach((N) => (N.enterCallbacks = {})),
                        (C = Nn(ee, "beforeRouteEnter", m, S)),
                        C.push(B),
                        vt(C)
                    )
                )
                .then(() => {
                    C = [];
                    for (const N of i.list()) C.push(Ge(N, m, S));
                    return C.push(B), vt(C);
                })
                .catch((N) => (Qe(N, 8) ? N : Promise.reject(N)))
        );
    }
    function re(m, S, C) {
        for (const I of c.list()) I(m, S, C);
    }
    function ue(m, S, C, I, Q) {
        const ee = U(m, S);
        if (ee) return ee;
        const B = S === Ye,
            N = Et ? history.state : {};
        C &&
            (I || B
                ? r.replace(m.fullPath, G({ scroll: B && N && N.scroll }, Q))
                : r.push(m.fullPath, Q)),
            (l.value = m),
            mt(m, S, C, B),
            ye();
    }
    let fe;
    function Pe() {
        fe ||
            (fe = r.listen((m, S, C) => {
                const I = P(m),
                    Q = de(I);
                if (Q) {
                    be(G(Q, { replace: !0 }), I).catch(Ut);
                    return;
                }
                f = I;
                const ee = l.value;
                Et && ku(or(ee.fullPath, C.delta), On()),
                    ne(I, ee)
                        .catch((B) =>
                            Qe(B, 12)
                                ? B
                                : Qe(B, 2)
                                ? (be(B.to, I)
                                      .then((N) => {
                                          Qe(N, 20) &&
                                              !C.delta &&
                                              C.type === Jt.pop &&
                                              r.go(-1, !1);
                                      })
                                      .catch(Ut),
                                  Promise.reject())
                                : (C.delta && r.go(-C.delta, !1), Z(B, I, ee))
                        )
                        .then((B) => {
                            (B = B || ue(I, ee, !1)),
                                B &&
                                    (C.delta
                                        ? r.go(-C.delta, !1)
                                        : C.type === Jt.pop &&
                                          Qe(B, 20) &&
                                          r.go(-1, !1)),
                                re(I, ee, B);
                        })
                        .catch(Ut);
            }));
    }
    let qe = $t(),
        gt = $t(),
        le;
    function Z(m, S, C) {
        ye(m);
        const I = gt.list();
        return (
            I.length ? I.forEach((Q) => Q(m, S, C)) : console.error(m),
            Promise.reject(m)
        );
    }
    function Y() {
        return le && l.value !== Ye
            ? Promise.resolve()
            : new Promise((m, S) => {
                  qe.add([m, S]);
              });
    }
    function ye(m) {
        return (
            le ||
                ((le = !m),
                Pe(),
                qe.list().forEach(([S, C]) => (m ? C(m) : S())),
                qe.reset()),
            m
        );
    }
    function mt(m, S, C, I) {
        const { scrollBehavior: Q } = e;
        if (!Et || !Q) return Promise.resolve();
        const ee =
            (!C && Mu(or(m.fullPath, 0))) ||
            ((I || !C) && history.state && history.state.scroll) ||
            null;
        return jr()
            .then(() => Q(m, S, ee))
            .then((B) => B && Iu(B))
            .catch((B) => Z(B, m, S));
    }
    const Be = (m) => r.go(m);
    let ke;
    const Ce = new Set();
    return {
        currentRoute: l,
        addRoute: y,
        removeRoute: R,
        hasRoute: O,
        getRoutes: k,
        resolve: P,
        options: e,
        push: W,
        replace: oe,
        go: Be,
        back: () => Be(-1),
        forward: () => Be(1),
        beforeEach: o.add,
        beforeResolve: i.add,
        afterEach: c.add,
        onError: gt.add,
        isReady: Y,
        install(m) {
            const S = this;
            m.component("RouterLink", vf),
                m.component("RouterView", wf),
                (m.config.globalProperties.$router = S),
                Object.defineProperty(m.config.globalProperties, "$route", {
                    enumerable: !0,
                    get: () => Lt(l),
                }),
                Et &&
                    !ke &&
                    l.value === Ye &&
                    ((ke = !0), W(r.location).catch((Q) => {}));
            const C = {};
            for (const Q in Ye) C[Q] = Ne(() => l.value[Q]);
            m.provide(xs, S), m.provide(mo, Xt(C)), m.provide(ts, l);
            const I = m.unmount;
            Ce.add(m),
                (m.unmount = function () {
                    Ce.delete(m),
                        Ce.size < 1 &&
                            ((f = Ye),
                            fe && fe(),
                            (fe = null),
                            (l.value = Ye),
                            (ke = !1),
                            (le = !1)),
                        I();
                });
        },
    };
}
function vt(e) {
    return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function Cf(e, t) {
    const n = [],
        s = [],
        r = [],
        o = Math.max(t.matched.length, e.matched.length);
    for (let i = 0; i < o; i++) {
        const c = t.matched[i];
        c && (e.matched.find((f) => Rt(f, c)) ? s.push(c) : n.push(c));
        const l = e.matched[i];
        l && (t.matched.find((f) => Rt(f, l)) || r.push(l));
    }
    return [n, s, r];
}
const Af = [
        { path: "/", name: "home", component: gu },
        { path: "/opdracht-1", name: "1", component: Cc },
        { path: "/opdracht-2", name: "2", component: Mc },
        { path: "/opdracht-3", name: "3", component: Dc },
        { path: "/opdracht-4", name: "4", component: eu },
        { path: "/opdracht-5", name: "5", component: ru },
        { path: "/:catchAll(.*)", component: vu },
    ],
    Rf = xf({ history: Lu(), routes: Af }),
    Po = sc(gc);
Po.use(Rf);
Po.mount("#app");
