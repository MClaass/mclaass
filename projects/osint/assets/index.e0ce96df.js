const Vl = function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
    new MutationObserver((i) => {
        for (const a of i)
            if (a.type === "childList") for (const o of a.addedNodes) o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(i) {
        const a = {};
        return (
            i.integrity && (a.integrity = i.integrity),
            i.referrerpolicy && (a.referrerPolicy = i.referrerpolicy),
            i.crossorigin === "use-credentials"
                ? (a.credentials = "include")
                : i.crossorigin === "anonymous"
                ? (a.credentials = "omit")
                : (a.credentials = "same-origin"),
            a
        );
    }
    function r(i) {
        if (i.ep) return;
        i.ep = !0;
        const a = n(i);
        fetch(i.href, a);
    }
};
Vl();
function Ni(e, t) {
    const n = Object.create(null),
        r = e.split(",");
    for (let i = 0; i < r.length; i++) n[r[i]] = !0;
    return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i];
}
const Wl = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Kl = Ni(Wl);
function Bo(e) {
    return !!e || e === "";
}
function Mi(e) {
    if (B(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                i = he(r) ? Gl(r) : Mi(r);
            if (i) for (const a in i) t[a] = i[a];
        }
        return t;
    } else {
        if (he(e)) return e;
        if (de(e)) return e;
    }
}
const Yl = /;(?![^(]*\))/g,
    ql = /:(.+)/;
function Gl(e) {
    const t = {};
    return (
        e.split(Yl).forEach((n) => {
            if (n) {
                const r = n.split(ql);
                r.length > 1 && (t[r[0].trim()] = r[1].trim());
            }
        }),
        t
    );
}
function ur(e) {
    let t = "";
    if (he(e)) t = e;
    else if (B(e))
        for (let n = 0; n < e.length; n++) {
            const r = ur(e[n]);
            r && (t += r + " ");
        }
    else if (de(e)) for (const n in e) e[n] && (t += n + " ");
    return t.trim();
}
const qr = (e) =>
        he(e) ? e : e == null ? "" : B(e) || (de(e) && (e.toString === Ko || !K(e.toString))) ? JSON.stringify(e, Uo, 2) : String(e),
    Uo = (e, t) =>
        t && t.__v_isRef
            ? Uo(e, t.value)
            : Gt(t)
            ? { [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, i]) => ((n[`${r} =>`] = i), n), {}) }
            : Vo(t)
            ? { [`Set(${t.size})`]: [...t.values()] }
            : de(t) && !B(t) && !Yo(t)
            ? String(t)
            : t,
    oe = {},
    qt = [],
    He = () => {},
    Xl = () => !1,
    Ql = /^on[^a-z]/,
    dr = (e) => Ql.test(e),
    ji = (e) => e.startsWith("onUpdate:"),
    _e = Object.assign,
    Li = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    Jl = Object.prototype.hasOwnProperty,
    q = (e, t) => Jl.call(e, t),
    B = Array.isArray,
    Gt = (e) => pr(e) === "[object Map]",
    Vo = (e) => pr(e) === "[object Set]",
    K = (e) => typeof e == "function",
    he = (e) => typeof e == "string",
    $i = (e) => typeof e == "symbol",
    de = (e) => e !== null && typeof e == "object",
    Wo = (e) => de(e) && K(e.then) && K(e.catch),
    Ko = Object.prototype.toString,
    pr = (e) => Ko.call(e),
    Zl = (e) => pr(e).slice(8, -1),
    Yo = (e) => pr(e) === "[object Object]",
    zi = (e) => he(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    Vn = Ni(
        ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    ),
    mr = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    ec = /-(\w)/g,
    Ze = mr((e) => e.replace(ec, (t, n) => (n ? n.toUpperCase() : ""))),
    tc = /\B([A-Z])/g,
    nn = mr((e) => e.replace(tc, "-$1").toLowerCase()),
    hr = mr((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Nr = mr((e) => (e ? `on${hr(e)}` : "")),
    Cn = (e, t) => !Object.is(e, t),
    Mr = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t);
    },
    Zn = (e, t, n) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
    },
    nc = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let ka;
const rc = () =>
    ka ||
    (ka =
        typeof globalThis != "undefined"
            ? globalThis
            : typeof self != "undefined"
            ? self
            : typeof window != "undefined"
            ? window
            : typeof global != "undefined"
            ? global
            : {});
let Xe;
class ic {
    constructor(t = !1) {
        (this.active = !0),
            (this.effects = []),
            (this.cleanups = []),
            !t && Xe && ((this.parent = Xe), (this.index = (Xe.scopes || (Xe.scopes = [])).push(this) - 1));
    }
    run(t) {
        if (this.active) {
            const n = Xe;
            try {
                return (Xe = this), t();
            } finally {
                Xe = n;
            }
        }
    }
    on() {
        Xe = this;
    }
    off() {
        Xe = this.parent;
    }
    stop(t) {
        if (this.active) {
            let n, r;
            for (n = 0, r = this.effects.length; n < r; n++) this.effects[n].stop();
            for (n = 0, r = this.cleanups.length; n < r; n++) this.cleanups[n]();
            if (this.scopes) for (n = 0, r = this.scopes.length; n < r; n++) this.scopes[n].stop(!0);
            if (this.parent && !t) {
                const i = this.parent.scopes.pop();
                i && i !== this && ((this.parent.scopes[this.index] = i), (i.index = this.index));
            }
            this.active = !1;
        }
    }
}
function ac(e, t = Xe) {
    t && t.active && t.effects.push(e);
}
const Fi = (e) => {
        const t = new Set(e);
        return (t.w = 0), (t.n = 0), t;
    },
    qo = (e) => (e.w & _t) > 0,
    Go = (e) => (e.n & _t) > 0,
    oc = ({ deps: e }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= _t;
    },
    sc = (e) => {
        const { deps: t } = e;
        if (t.length) {
            let n = 0;
            for (let r = 0; r < t.length; r++) {
                const i = t[r];
                qo(i) && !Go(i) ? i.delete(e) : (t[n++] = i), (i.w &= ~_t), (i.n &= ~_t);
            }
            t.length = n;
        }
    },
    Gr = new WeakMap();
let hn = 0,
    _t = 1;
const Xr = 30;
let $e;
const It = Symbol(""),
    Qr = Symbol("");
class Di {
    constructor(t, n = null, r) {
        (this.fn = t), (this.scheduler = n), (this.active = !0), (this.deps = []), (this.parent = void 0), ac(this, r);
    }
    run() {
        if (!this.active) return this.fn();
        let t = $e,
            n = vt;
        for (; t; ) {
            if (t === this) return;
            t = t.parent;
        }
        try {
            return (this.parent = $e), ($e = this), (vt = !0), (_t = 1 << ++hn), hn <= Xr ? oc(this) : Aa(this), this.fn();
        } finally {
            hn <= Xr && sc(this), (_t = 1 << --hn), ($e = this.parent), (vt = n), (this.parent = void 0), this.deferStop && this.stop();
        }
    }
    stop() {
        $e === this ? (this.deferStop = !0) : this.active && (Aa(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function Aa(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e);
        t.length = 0;
    }
}
let vt = !0;
const Xo = [];
function rn() {
    Xo.push(vt), (vt = !1);
}
function an() {
    const e = Xo.pop();
    vt = e === void 0 ? !0 : e;
}
function Pe(e, t, n) {
    if (vt && $e) {
        let r = Gr.get(e);
        r || Gr.set(e, (r = new Map()));
        let i = r.get(n);
        i || r.set(n, (i = Fi())), Qo(i);
    }
}
function Qo(e, t) {
    let n = !1;
    hn <= Xr ? Go(e) || ((e.n |= _t), (n = !qo(e))) : (n = !e.has($e)), n && (e.add($e), $e.deps.push(e));
}
function it(e, t, n, r, i, a) {
    const o = Gr.get(e);
    if (!o) return;
    let s = [];
    if (t === "clear") s = [...o.values()];
    else if (n === "length" && B(e))
        o.forEach((l, f) => {
            (f === "length" || f >= r) && s.push(l);
        });
    else
        switch ((n !== void 0 && s.push(o.get(n)), t)) {
            case "add":
                B(e) ? zi(n) && s.push(o.get("length")) : (s.push(o.get(It)), Gt(e) && s.push(o.get(Qr)));
                break;
            case "delete":
                B(e) || (s.push(o.get(It)), Gt(e) && s.push(o.get(Qr)));
                break;
            case "set":
                Gt(e) && s.push(o.get(It));
                break;
        }
    if (s.length === 1) s[0] && Jr(s[0]);
    else {
        const l = [];
        for (const f of s) f && l.push(...f);
        Jr(Fi(l));
    }
}
function Jr(e, t) {
    const n = B(e) ? e : [...e];
    for (const r of n) r.computed && Ea(r);
    for (const r of n) r.computed || Ea(r);
}
function Ea(e, t) {
    (e !== $e || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const lc = Ni("__proto__,__v_isRef,__isVue"),
    Jo = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== "arguments" && e !== "caller")
            .map((e) => Symbol[e])
            .filter($i)
    ),
    cc = Hi(),
    fc = Hi(!1, !0),
    uc = Hi(!0),
    Ca = dc();
function dc() {
    const e = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...n) {
                const r = Q(this);
                for (let a = 0, o = this.length; a < o; a++) Pe(r, "get", a + "");
                const i = r[t](...n);
                return i === -1 || i === !1 ? r[t](...n.map(Q)) : i;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...n) {
                rn();
                const r = Q(this)[t].apply(this, n);
                return an(), r;
            };
        }),
        e
    );
}
function Hi(e = !1, t = !1) {
    return function (r, i, a) {
        if (i === "__v_isReactive") return !e;
        if (i === "__v_isReadonly") return e;
        if (i === "__v_isShallow") return t;
        if (i === "__v_raw" && a === (e ? (t ? Sc : rs) : t ? ns : ts).get(r)) return r;
        const o = B(r);
        if (!e && o && q(Ca, i)) return Reflect.get(Ca, i, a);
        const s = Reflect.get(r, i, a);
        return ($i(i) ? Jo.has(i) : lc(i)) || (e || Pe(r, "get", i), t)
            ? s
            : ye(s)
            ? o && zi(i)
                ? s
                : s.value
            : de(s)
            ? e
                ? vr(s)
                : on(s)
            : s;
    };
}
const pc = Zo(),
    mc = Zo(!0);
function Zo(e = !1) {
    return function (n, r, i, a) {
        let o = n[r];
        if (On(o) && ye(o) && !ye(i)) return !1;
        if (!e && !On(i) && (Zr(i) || ((i = Q(i)), (o = Q(o))), !B(n) && ye(o) && !ye(i))) return (o.value = i), !0;
        const s = B(n) && zi(r) ? Number(r) < n.length : q(n, r),
            l = Reflect.set(n, r, i, a);
        return n === Q(a) && (s ? Cn(i, o) && it(n, "set", r, i) : it(n, "add", r, i)), l;
    };
}
function hc(e, t) {
    const n = q(e, t);
    e[t];
    const r = Reflect.deleteProperty(e, t);
    return r && n && it(e, "delete", t, void 0), r;
}
function gc(e, t) {
    const n = Reflect.has(e, t);
    return (!$i(t) || !Jo.has(t)) && Pe(e, "has", t), n;
}
function vc(e) {
    return Pe(e, "iterate", B(e) ? "length" : It), Reflect.ownKeys(e);
}
const es = { get: cc, set: pc, deleteProperty: hc, has: gc, ownKeys: vc },
    bc = {
        get: uc,
        set(e, t) {
            return !0;
        },
        deleteProperty(e, t) {
            return !0;
        },
    },
    yc = _e({}, es, { get: fc, set: mc }),
    Bi = (e) => e,
    gr = (e) => Reflect.getPrototypeOf(e);
function zn(e, t, n = !1, r = !1) {
    e = e.__v_raw;
    const i = Q(e),
        a = Q(t);
    n || (t !== a && Pe(i, "get", t), Pe(i, "get", a));
    const { has: o } = gr(i),
        s = r ? Bi : n ? Wi : Sn;
    if (o.call(i, t)) return s(e.get(t));
    if (o.call(i, a)) return s(e.get(a));
    e !== i && e.get(t);
}
function Fn(e, t = !1) {
    const n = this.__v_raw,
        r = Q(n),
        i = Q(e);
    return t || (e !== i && Pe(r, "has", e), Pe(r, "has", i)), e === i ? n.has(e) : n.has(e) || n.has(i);
}
function Dn(e, t = !1) {
    return (e = e.__v_raw), !t && Pe(Q(e), "iterate", It), Reflect.get(e, "size", e);
}
function Oa(e) {
    e = Q(e);
    const t = Q(this);
    return gr(t).has.call(t, e) || (t.add(e), it(t, "add", e, e)), this;
}
function Sa(e, t) {
    t = Q(t);
    const n = Q(this),
        { has: r, get: i } = gr(n);
    let a = r.call(n, e);
    a || ((e = Q(e)), (a = r.call(n, e)));
    const o = i.call(n, e);
    return n.set(e, t), a ? Cn(t, o) && it(n, "set", e, t) : it(n, "add", e, t), this;
}
function Pa(e) {
    const t = Q(this),
        { has: n, get: r } = gr(t);
    let i = n.call(t, e);
    i || ((e = Q(e)), (i = n.call(t, e))), r && r.call(t, e);
    const a = t.delete(e);
    return i && it(t, "delete", e, void 0), a;
}
function Ia() {
    const e = Q(this),
        t = e.size !== 0,
        n = e.clear();
    return t && it(e, "clear", void 0, void 0), n;
}
function Hn(e, t) {
    return function (r, i) {
        const a = this,
            o = a.__v_raw,
            s = Q(o),
            l = t ? Bi : e ? Wi : Sn;
        return !e && Pe(s, "iterate", It), o.forEach((f, c) => r.call(i, l(f), l(c), a));
    };
}
function Bn(e, t, n) {
    return function (...r) {
        const i = this.__v_raw,
            a = Q(i),
            o = Gt(a),
            s = e === "entries" || (e === Symbol.iterator && o),
            l = e === "keys" && o,
            f = i[e](...r),
            c = n ? Bi : t ? Wi : Sn;
        return (
            !t && Pe(a, "iterate", l ? Qr : It),
            {
                next() {
                    const { value: u, done: p } = f.next();
                    return p ? { value: u, done: p } : { value: s ? [c(u[0]), c(u[1])] : c(u), done: p };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function ut(e) {
    return function (...t) {
        return e === "delete" ? !1 : this;
    };
}
function _c() {
    const e = {
            get(a) {
                return zn(this, a);
            },
            get size() {
                return Dn(this);
            },
            has: Fn,
            add: Oa,
            set: Sa,
            delete: Pa,
            clear: Ia,
            forEach: Hn(!1, !1),
        },
        t = {
            get(a) {
                return zn(this, a, !1, !0);
            },
            get size() {
                return Dn(this);
            },
            has: Fn,
            add: Oa,
            set: Sa,
            delete: Pa,
            clear: Ia,
            forEach: Hn(!1, !0),
        },
        n = {
            get(a) {
                return zn(this, a, !0);
            },
            get size() {
                return Dn(this, !0);
            },
            has(a) {
                return Fn.call(this, a, !0);
            },
            add: ut("add"),
            set: ut("set"),
            delete: ut("delete"),
            clear: ut("clear"),
            forEach: Hn(!0, !1),
        },
        r = {
            get(a) {
                return zn(this, a, !0, !0);
            },
            get size() {
                return Dn(this, !0);
            },
            has(a) {
                return Fn.call(this, a, !0);
            },
            add: ut("add"),
            set: ut("set"),
            delete: ut("delete"),
            clear: ut("clear"),
            forEach: Hn(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((a) => {
            (e[a] = Bn(a, !1, !1)), (n[a] = Bn(a, !0, !1)), (t[a] = Bn(a, !1, !0)), (r[a] = Bn(a, !0, !0));
        }),
        [e, n, t, r]
    );
}
const [wc, xc, kc, Ac] = _c();
function Ui(e, t) {
    const n = t ? (e ? Ac : kc) : e ? xc : wc;
    return (r, i, a) =>
        i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? r : Reflect.get(q(n, i) && i in r ? n : r, i, a);
}
const Ec = { get: Ui(!1, !1) },
    Cc = { get: Ui(!1, !0) },
    Oc = { get: Ui(!0, !1) },
    ts = new WeakMap(),
    ns = new WeakMap(),
    rs = new WeakMap(),
    Sc = new WeakMap();
function Pc(e) {
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
function Ic(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Pc(Zl(e));
}
function on(e) {
    return On(e) ? e : Vi(e, !1, es, Ec, ts);
}
function Tc(e) {
    return Vi(e, !1, yc, Cc, ns);
}
function vr(e) {
    return Vi(e, !0, bc, Oc, rs);
}
function Vi(e, t, n, r, i) {
    if (!de(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const a = i.get(e);
    if (a) return a;
    const o = Ic(e);
    if (o === 0) return e;
    const s = new Proxy(e, o === 2 ? r : n);
    return i.set(e, s), s;
}
function Xt(e) {
    return On(e) ? Xt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function On(e) {
    return !!(e && e.__v_isReadonly);
}
function Zr(e) {
    return !!(e && e.__v_isShallow);
}
function is(e) {
    return Xt(e) || On(e);
}
function Q(e) {
    const t = e && e.__v_raw;
    return t ? Q(t) : e;
}
function as(e) {
    return Zn(e, "__v_skip", !0), e;
}
const Sn = (e) => (de(e) ? on(e) : e),
    Wi = (e) => (de(e) ? vr(e) : e);
function os(e) {
    vt && $e && ((e = Q(e)), Qo(e.dep || (e.dep = Fi())));
}
function ss(e, t) {
    (e = Q(e)), e.dep && Jr(e.dep);
}
function ye(e) {
    return !!(e && e.__v_isRef === !0);
}
function ei(e) {
    return ls(e, !1);
}
function Rc(e) {
    return ls(e, !0);
}
function ls(e, t) {
    return ye(e) ? e : new Nc(e, t);
}
class Nc {
    constructor(t, n) {
        (this.__v_isShallow = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._rawValue = n ? t : Q(t)),
            (this._value = n ? t : Sn(t));
    }
    get value() {
        return os(this), this._value;
    }
    set value(t) {
        (t = this.__v_isShallow ? t : Q(t)),
            Cn(t, this._rawValue) && ((this._rawValue = t), (this._value = this.__v_isShallow ? t : Sn(t)), ss(this));
    }
}
function Be(e) {
    return ye(e) ? e.value : e;
}
const Mc = {
    get: (e, t, n) => Be(Reflect.get(e, t, n)),
    set: (e, t, n, r) => {
        const i = e[t];
        return ye(i) && !ye(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, r);
    },
};
function cs(e) {
    return Xt(e) ? e : new Proxy(e, Mc);
}
class jc {
    constructor(t, n, r, i) {
        (this._setter = n),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this._dirty = !0),
            (this.effect = new Di(t, () => {
                this._dirty || ((this._dirty = !0), ss(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !i),
            (this.__v_isReadonly = r);
    }
    get value() {
        const t = Q(this);
        return os(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value;
    }
    set value(t) {
        this._setter(t);
    }
}
function Lc(e, t, n = !1) {
    let r, i;
    const a = K(e);
    return a ? ((r = e), (i = He)) : ((r = e.get), (i = e.set)), new jc(r, i, a || !i, n);
}
function bt(e, t, n, r) {
    let i;
    try {
        i = r ? e(...r) : e();
    } catch (a) {
        br(a, t, n);
    }
    return i;
}
function Ne(e, t, n, r) {
    if (K(e)) {
        const a = bt(e, t, n, r);
        return (
            a &&
                Wo(a) &&
                a.catch((o) => {
                    br(o, t, n);
                }),
            a
        );
    }
    const i = [];
    for (let a = 0; a < e.length; a++) i.push(Ne(e[a], t, n, r));
    return i;
}
function br(e, t, n, r = !0) {
    const i = t ? t.vnode : null;
    if (t) {
        let a = t.parent;
        const o = t.proxy,
            s = n;
        for (; a; ) {
            const f = a.ec;
            if (f) {
                for (let c = 0; c < f.length; c++) if (f[c](e, o, s) === !1) return;
            }
            a = a.parent;
        }
        const l = t.appContext.config.errorHandler;
        if (l) {
            bt(l, null, 10, [e, o, s]);
            return;
        }
    }
    $c(e, n, i, r);
}
function $c(e, t, n, r = !0) {
    console.error(e);
}
let er = !1,
    ti = !1;
const Se = [];
let rt = 0;
const yn = [];
let gn = null,
    Bt = 0;
const _n = [];
let mt = null,
    Ut = 0;
const fs = Promise.resolve();
let Ki = null,
    ni = null;
function us(e) {
    const t = Ki || fs;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function zc(e) {
    let t = rt + 1,
        n = Se.length;
    for (; t < n; ) {
        const r = (t + n) >>> 1;
        Pn(Se[r]) < e ? (t = r + 1) : (n = r);
    }
    return t;
}
function ds(e) {
    (!Se.length || !Se.includes(e, er && e.allowRecurse ? rt + 1 : rt)) &&
        e !== ni &&
        (e.id == null ? Se.push(e) : Se.splice(zc(e.id), 0, e), ps());
}
function ps() {
    !er && !ti && ((ti = !0), (Ki = fs.then(gs)));
}
function Fc(e) {
    const t = Se.indexOf(e);
    t > rt && Se.splice(t, 1);
}
function ms(e, t, n, r) {
    B(e) ? n.push(...e) : (!t || !t.includes(e, e.allowRecurse ? r + 1 : r)) && n.push(e), ps();
}
function Dc(e) {
    ms(e, gn, yn, Bt);
}
function Hc(e) {
    ms(e, mt, _n, Ut);
}
function yr(e, t = null) {
    if (yn.length) {
        for (ni = t, gn = [...new Set(yn)], yn.length = 0, Bt = 0; Bt < gn.length; Bt++) gn[Bt]();
        (gn = null), (Bt = 0), (ni = null), yr(e, t);
    }
}
function hs(e) {
    if ((yr(), _n.length)) {
        const t = [...new Set(_n)];
        if (((_n.length = 0), mt)) {
            mt.push(...t);
            return;
        }
        for (mt = t, mt.sort((n, r) => Pn(n) - Pn(r)), Ut = 0; Ut < mt.length; Ut++) mt[Ut]();
        (mt = null), (Ut = 0);
    }
}
const Pn = (e) => (e.id == null ? 1 / 0 : e.id);
function gs(e) {
    (ti = !1), (er = !0), yr(e), Se.sort((n, r) => Pn(n) - Pn(r));
    const t = He;
    try {
        for (rt = 0; rt < Se.length; rt++) {
            const n = Se[rt];
            n && n.active !== !1 && bt(n, null, 14);
        }
    } finally {
        (rt = 0), (Se.length = 0), hs(), (er = !1), (Ki = null), (Se.length || yn.length || _n.length) && gs(e);
    }
}
function Bc(e, t, ...n) {
    if (e.isUnmounted) return;
    const r = e.vnode.props || oe;
    let i = n;
    const a = t.startsWith("update:"),
        o = a && t.slice(7);
    if (o && o in r) {
        const c = `${o === "modelValue" ? "model" : o}Modifiers`,
            { number: u, trim: p } = r[c] || oe;
        p && (i = n.map((h) => h.trim())), u && (i = n.map(nc));
    }
    let s,
        l = r[(s = Nr(t))] || r[(s = Nr(Ze(t)))];
    !l && a && (l = r[(s = Nr(nn(t)))]), l && Ne(l, e, 6, i);
    const f = r[s + "Once"];
    if (f) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[s]) return;
        (e.emitted[s] = !0), Ne(f, e, 6, i);
    }
}
function vs(e, t, n = !1) {
    const r = t.emitsCache,
        i = r.get(e);
    if (i !== void 0) return i;
    const a = e.emits;
    let o = {},
        s = !1;
    if (!K(e)) {
        const l = (f) => {
            const c = vs(f, t, !0);
            c && ((s = !0), _e(o, c));
        };
        !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
    }
    return !a && !s ? (r.set(e, null), null) : (B(a) ? a.forEach((l) => (o[l] = null)) : _e(o, a), r.set(e, o), o);
}
function _r(e, t) {
    return !e || !dr(t) ? !1 : ((t = t.slice(2).replace(/Once$/, "")), q(e, t[0].toLowerCase() + t.slice(1)) || q(e, nn(t)) || q(e, t));
}
let ze = null,
    wr = null;
function tr(e) {
    const t = ze;
    return (ze = e), (wr = (e && e.type.__scopeId) || null), t;
}
function Mn(e) {
    wr = e;
}
function jn() {
    wr = null;
}
function ri(e, t = ze, n) {
    if (!t || e._n) return e;
    const r = (...i) => {
        r._d && Ha(-1);
        const a = tr(t),
            o = e(...i);
        return tr(a), r._d && Ha(1), o;
    };
    return (r._n = !0), (r._c = !0), (r._d = !0), r;
}
function jr(e) {
    const {
        type: t,
        vnode: n,
        proxy: r,
        withProxy: i,
        props: a,
        propsOptions: [o],
        slots: s,
        attrs: l,
        emit: f,
        render: c,
        renderCache: u,
        data: p,
        setupState: h,
        ctx: k,
        inheritAttrs: P,
    } = e;
    let S, v;
    const w = tr(e);
    try {
        if (n.shapeFlag & 4) {
            const D = i || r;
            (S = Qe(c.call(D, D, u, a, h, p, k))), (v = l);
        } else {
            const D = t;
            (S = Qe(D.length > 1 ? D(a, { attrs: l, slots: s, emit: f }) : D(a, null))), (v = t.props ? l : Uc(l));
        }
    } catch (D) {
        (wn.length = 0), br(D, e, 1), (S = be(Ue));
    }
    let R = S;
    if (v && P !== !1) {
        const D = Object.keys(v),
            { shapeFlag: U } = R;
        D.length && U & 7 && (o && D.some(ji) && (v = Vc(v, o)), (R = wt(R, v)));
    }
    return (
        n.dirs && ((R = wt(R)), (R.dirs = R.dirs ? R.dirs.concat(n.dirs) : n.dirs)),
        n.transition && (R.transition = n.transition),
        (S = R),
        tr(w),
        S
    );
}
const Uc = (e) => {
        let t;
        for (const n in e) (n === "class" || n === "style" || dr(n)) && ((t || (t = {}))[n] = e[n]);
        return t;
    },
    Vc = (e, t) => {
        const n = {};
        for (const r in e) (!ji(r) || !(r.slice(9) in t)) && (n[r] = e[r]);
        return n;
    };
function Wc(e, t, n) {
    const { props: r, children: i, component: a } = e,
        { props: o, children: s, patchFlag: l } = t,
        f = a.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && l >= 0) {
        if (l & 1024) return !0;
        if (l & 16) return r ? Ta(r, o, f) : !!o;
        if (l & 8) {
            const c = t.dynamicProps;
            for (let u = 0; u < c.length; u++) {
                const p = c[u];
                if (o[p] !== r[p] && !_r(f, p)) return !0;
            }
        }
    } else return (i || s) && (!s || !s.$stable) ? !0 : r === o ? !1 : r ? (o ? Ta(r, o, f) : !0) : !!o;
    return !1;
}
function Ta(e, t, n) {
    const r = Object.keys(t);
    if (r.length !== Object.keys(e).length) return !0;
    for (let i = 0; i < r.length; i++) {
        const a = r[i];
        if (t[a] !== e[a] && !_r(n, a)) return !0;
    }
    return !1;
}
function Kc({ vnode: e, parent: t }, n) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const Yc = (e) => e.__isSuspense;
function qc(e, t) {
    t && t.pendingBranch ? (B(e) ? t.effects.push(...e) : t.effects.push(e)) : Hc(e);
}
function Wn(e, t) {
    if (pe) {
        let n = pe.provides;
        const r = pe.parent && pe.parent.provides;
        r === n && (n = pe.provides = Object.create(r)), (n[e] = t);
    }
}
function yt(e, t, n = !1) {
    const r = pe || ze;
    if (r) {
        const i = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
        if (i && e in i) return i[e];
        if (arguments.length > 1) return n && K(t) ? t.call(r.proxy) : t;
    }
}
const Ra = {};
function Qt(e, t, n) {
    return bs(e, t, n);
}
function bs(e, t, { immediate: n, deep: r, flush: i, onTrack: a, onTrigger: o } = oe) {
    const s = pe;
    let l,
        f = !1,
        c = !1;
    if (
        (ye(e)
            ? ((l = () => e.value), (f = Zr(e)))
            : Xt(e)
            ? ((l = () => e), (r = !0))
            : B(e)
            ? ((c = !0),
              (f = e.some((v) => Xt(v) || Zr(v))),
              (l = () =>
                  e.map((v) => {
                      if (ye(v)) return v.value;
                      if (Xt(v)) return Wt(v);
                      if (K(v)) return bt(v, s, 2);
                  })))
            : K(e)
            ? t
                ? (l = () => bt(e, s, 2))
                : (l = () => {
                      if (!(s && s.isUnmounted)) return u && u(), Ne(e, s, 3, [p]);
                  })
            : (l = He),
        t && r)
    ) {
        const v = l;
        l = () => Wt(v());
    }
    let u,
        p = (v) => {
            u = S.onStop = () => {
                bt(v, s, 4);
            };
        };
    if (Tn) return (p = He), t ? n && Ne(t, s, 3, [l(), c ? [] : void 0, p]) : l(), He;
    let h = c ? [] : Ra;
    const k = () => {
        if (!!S.active)
            if (t) {
                const v = S.run();
                (r || f || (c ? v.some((w, R) => Cn(w, h[R])) : Cn(v, h))) &&
                    (u && u(), Ne(t, s, 3, [v, h === Ra ? void 0 : h, p]), (h = v));
            } else S.run();
    };
    k.allowRecurse = !!t;
    let P;
    i === "sync" ? (P = k) : i === "post" ? (P = () => ke(k, s && s.suspense)) : (P = () => Dc(k));
    const S = new Di(l, P);
    return (
        t ? (n ? k() : (h = S.run())) : i === "post" ? ke(S.run.bind(S), s && s.suspense) : S.run(),
        () => {
            S.stop(), s && s.scope && Li(s.scope.effects, S);
        }
    );
}
function Gc(e, t, n) {
    const r = this.proxy,
        i = he(e) ? (e.includes(".") ? ys(r, e) : () => r[e]) : e.bind(r, r);
    let a;
    K(t) ? (a = t) : ((a = t.handler), (n = t));
    const o = pe;
    Zt(this);
    const s = bs(i, a.bind(r), n);
    return o ? Zt(o) : Tt(), s;
}
function ys(e, t) {
    const n = t.split(".");
    return () => {
        let r = e;
        for (let i = 0; i < n.length && r; i++) r = r[n[i]];
        return r;
    };
}
function Wt(e, t) {
    if (!de(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
    if ((t.add(e), ye(e))) Wt(e.value, t);
    else if (B(e)) for (let n = 0; n < e.length; n++) Wt(e[n], t);
    else if (Vo(e) || Gt(e))
        e.forEach((n) => {
            Wt(n, t);
        });
    else if (Yo(e)) for (const n in e) Wt(e[n], t);
    return e;
}
function Xc() {
    const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() };
    return (
        Yi(() => {
            e.isMounted = !0;
        }),
        As(() => {
            e.isUnmounting = !0;
        }),
        e
    );
}
const Re = [Function, Array],
    Qc = {
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
            const n = Ds(),
                r = Xc();
            let i;
            return () => {
                const a = t.default && ws(t.default(), !0);
                if (!a || !a.length) return;
                let o = a[0];
                if (a.length > 1) {
                    for (const P of a)
                        if (P.type !== Ue) {
                            o = P;
                            break;
                        }
                }
                const s = Q(e),
                    { mode: l } = s;
                if (r.isLeaving) return Lr(o);
                const f = Na(o);
                if (!f) return Lr(o);
                const c = ii(f, s, r, n);
                ai(f, c);
                const u = n.subTree,
                    p = u && Na(u);
                let h = !1;
                const { getTransitionKey: k } = f.type;
                if (k) {
                    const P = k();
                    i === void 0 ? (i = P) : P !== i && ((i = P), (h = !0));
                }
                if (p && p.type !== Ue && (!Ot(f, p) || h)) {
                    const P = ii(p, s, r, n);
                    if ((ai(p, P), l === "out-in"))
                        return (
                            (r.isLeaving = !0),
                            (P.afterLeave = () => {
                                (r.isLeaving = !1), n.update();
                            }),
                            Lr(o)
                        );
                    l === "in-out" &&
                        f.type !== Ue &&
                        (P.delayLeave = (S, v, w) => {
                            const R = _s(r, p);
                            (R[String(p.key)] = p),
                                (S._leaveCb = () => {
                                    v(), (S._leaveCb = void 0), delete c.delayedLeave;
                                }),
                                (c.delayedLeave = w);
                        });
                }
                return o;
            };
        },
    },
    Jc = Qc;
function _s(e, t) {
    const { leavingVNodes: n } = e;
    let r = n.get(t.type);
    return r || ((r = Object.create(null)), n.set(t.type, r)), r;
}
function ii(e, t, n, r) {
    const {
            appear: i,
            mode: a,
            persisted: o = !1,
            onBeforeEnter: s,
            onEnter: l,
            onAfterEnter: f,
            onEnterCancelled: c,
            onBeforeLeave: u,
            onLeave: p,
            onAfterLeave: h,
            onLeaveCancelled: k,
            onBeforeAppear: P,
            onAppear: S,
            onAfterAppear: v,
            onAppearCancelled: w,
        } = t,
        R = String(e.key),
        D = _s(n, e),
        U = (W, X) => {
            W && Ne(W, r, 9, X);
        },
        ee = (W, X) => {
            const fe = X[1];
            U(W, X), B(W) ? W.every((ge) => ge.length <= 1) && fe() : W.length <= 1 && fe();
        },
        ce = {
            mode: a,
            persisted: o,
            beforeEnter(W) {
                let X = s;
                if (!n.isMounted)
                    if (i) X = P || s;
                    else return;
                W._leaveCb && W._leaveCb(!0);
                const fe = D[R];
                fe && Ot(e, fe) && fe.el._leaveCb && fe.el._leaveCb(), U(X, [W]);
            },
            enter(W) {
                let X = l,
                    fe = f,
                    ge = c;
                if (!n.isMounted)
                    if (i) (X = S || l), (fe = v || f), (ge = w || c);
                    else return;
                let ve = !1;
                const Me = (W._enterCb = (ft) => {
                    ve || ((ve = !0), ft ? U(ge, [W]) : U(fe, [W]), ce.delayedLeave && ce.delayedLeave(), (W._enterCb = void 0));
                });
                X ? ee(X, [W, Me]) : Me();
            },
            leave(W, X) {
                const fe = String(e.key);
                if ((W._enterCb && W._enterCb(!0), n.isUnmounting)) return X();
                U(u, [W]);
                let ge = !1;
                const ve = (W._leaveCb = (Me) => {
                    ge || ((ge = !0), X(), Me ? U(k, [W]) : U(h, [W]), (W._leaveCb = void 0), D[fe] === e && delete D[fe]);
                });
                (D[fe] = e), p ? ee(p, [W, ve]) : ve();
            },
            clone(W) {
                return ii(W, t, n, r);
            },
        };
    return ce;
}
function Lr(e) {
    if (xr(e)) return (e = wt(e)), (e.children = null), e;
}
function Na(e) {
    return xr(e) ? (e.children ? e.children[0] : void 0) : e;
}
function ai(e, t) {
    e.shapeFlag & 6 && e.component
        ? ai(e.component.subTree, t)
        : e.shapeFlag & 128
        ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t);
}
function ws(e, t = !1, n) {
    let r = [],
        i = 0;
    for (let a = 0; a < e.length; a++) {
        let o = e[a];
        const s = n == null ? o.key : String(n) + String(o.key != null ? o.key : a);
        o.type === Le
            ? (o.patchFlag & 128 && i++, (r = r.concat(ws(o.children, t, s))))
            : (t || o.type !== Ue) && r.push(s != null ? wt(o, { key: s }) : o);
    }
    if (i > 1) for (let a = 0; a < r.length; a++) r[a].patchFlag = -2;
    return r;
}
function xs(e) {
    return K(e) ? { setup: e, name: e.name } : e;
}
const Kn = (e) => !!e.type.__asyncLoader,
    xr = (e) => e.type.__isKeepAlive;
function Zc(e, t) {
    ks(e, "a", t);
}
function ef(e, t) {
    ks(e, "da", t);
}
function ks(e, t, n = pe) {
    const r =
        e.__wdc ||
        (e.__wdc = () => {
            let i = n;
            for (; i; ) {
                if (i.isDeactivated) return;
                i = i.parent;
            }
            return e();
        });
    if ((kr(t, r, n), n)) {
        let i = n.parent;
        for (; i && i.parent; ) xr(i.parent.vnode) && tf(r, t, n, i), (i = i.parent);
    }
}
function tf(e, t, n, r) {
    const i = kr(t, e, r, !0);
    Es(() => {
        Li(r[t], i);
    }, n);
}
function kr(e, t, n = pe, r = !1) {
    if (n) {
        const i = n[e] || (n[e] = []),
            a =
                t.__weh ||
                (t.__weh = (...o) => {
                    if (n.isUnmounted) return;
                    rn(), Zt(n);
                    const s = Ne(t, n, e, o);
                    return Tt(), an(), s;
                });
        return r ? i.unshift(a) : i.push(a), a;
    }
}
const lt =
        (e) =>
        (t, n = pe) =>
            (!Tn || e === "sp") && kr(e, t, n),
    nf = lt("bm"),
    Yi = lt("m"),
    rf = lt("bu"),
    af = lt("u"),
    As = lt("bum"),
    Es = lt("um"),
    of = lt("sp"),
    sf = lt("rtg"),
    lf = lt("rtc");
function cf(e, t = pe) {
    kr("ec", e, t);
}
function At(e, t, n, r) {
    const i = e.dirs,
        a = t && t.dirs;
    for (let o = 0; o < i.length; o++) {
        const s = i[o];
        a && (s.oldValue = a[o].value);
        let l = s.dir[r];
        l && (rn(), Ne(l, n, 8, [e.el, s, e, t]), an());
    }
}
const Cs = "components";
function Os(e, t) {
    return uf(Cs, e, !0, t) || e;
}
const ff = Symbol();
function uf(e, t, n = !0, r = !1) {
    const i = ze || pe;
    if (i) {
        const a = i.type;
        if (e === Cs) {
            const s = Hf(a, !1);
            if (s && (s === t || s === Ze(t) || s === hr(Ze(t)))) return a;
        }
        const o = Ma(i[e] || a[e], t) || Ma(i.appContext[e], t);
        return !o && r ? a : o;
    }
}
function Ma(e, t) {
    return e && (e[t] || e[Ze(t)] || e[hr(Ze(t))]);
}
function df(e, t, n, r) {
    let i;
    const a = n && n[r];
    if (B(e) || he(e)) {
        i = new Array(e.length);
        for (let o = 0, s = e.length; o < s; o++) i[o] = t(e[o], o, void 0, a && a[o]);
    } else if (typeof e == "number") {
        i = new Array(e);
        for (let o = 0; o < e; o++) i[o] = t(o + 1, o, void 0, a && a[o]);
    } else if (de(e))
        if (e[Symbol.iterator]) i = Array.from(e, (o, s) => t(o, s, void 0, a && a[s]));
        else {
            const o = Object.keys(e);
            i = new Array(o.length);
            for (let s = 0, l = o.length; s < l; s++) {
                const f = o[s];
                i[s] = t(e[f], f, s, a && a[s]);
            }
        }
    else i = [];
    return n && (n[r] = i), i;
}
const oi = (e) => (e ? (Hs(e) ? Qi(e) || e.proxy : oi(e.parent)) : null),
    nr = _e(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => oi(e.parent),
        $root: (e) => oi(e.root),
        $emit: (e) => e.emit,
        $options: (e) => Ps(e),
        $forceUpdate: (e) => e.f || (e.f = () => ds(e.update)),
        $nextTick: (e) => e.n || (e.n = us.bind(e.proxy)),
        $watch: (e) => Gc.bind(e),
    }),
    pf = {
        get({ _: e }, t) {
            const { ctx: n, setupState: r, data: i, props: a, accessCache: o, type: s, appContext: l } = e;
            let f;
            if (t[0] !== "$") {
                const h = o[t];
                if (h !== void 0)
                    switch (h) {
                        case 1:
                            return r[t];
                        case 2:
                            return i[t];
                        case 4:
                            return n[t];
                        case 3:
                            return a[t];
                    }
                else {
                    if (r !== oe && q(r, t)) return (o[t] = 1), r[t];
                    if (i !== oe && q(i, t)) return (o[t] = 2), i[t];
                    if ((f = e.propsOptions[0]) && q(f, t)) return (o[t] = 3), a[t];
                    if (n !== oe && q(n, t)) return (o[t] = 4), n[t];
                    si && (o[t] = 0);
                }
            }
            const c = nr[t];
            let u, p;
            if (c) return t === "$attrs" && Pe(e, "get", t), c(e);
            if ((u = s.__cssModules) && (u = u[t])) return u;
            if (n !== oe && q(n, t)) return (o[t] = 4), n[t];
            if (((p = l.config.globalProperties), q(p, t))) return p[t];
        },
        set({ _: e }, t, n) {
            const { data: r, setupState: i, ctx: a } = e;
            return i !== oe && q(i, t)
                ? ((i[t] = n), !0)
                : r !== oe && q(r, t)
                ? ((r[t] = n), !0)
                : q(e.props, t) || (t[0] === "$" && t.slice(1) in e)
                ? !1
                : ((a[t] = n), !0);
        },
        has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: i, propsOptions: a } }, o) {
            let s;
            return (
                !!n[o] ||
                (e !== oe && q(e, o)) ||
                (t !== oe && q(t, o)) ||
                ((s = a[0]) && q(s, o)) ||
                q(r, o) ||
                q(nr, o) ||
                q(i.config.globalProperties, o)
            );
        },
        defineProperty(e, t, n) {
            return (
                n.get != null ? (e._.accessCache[t] = 0) : q(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n)
            );
        },
    };
let si = !0;
function mf(e) {
    const t = Ps(e),
        n = e.proxy,
        r = e.ctx;
    (si = !1), t.beforeCreate && ja(t.beforeCreate, e, "bc");
    const {
        data: i,
        computed: a,
        methods: o,
        watch: s,
        provide: l,
        inject: f,
        created: c,
        beforeMount: u,
        mounted: p,
        beforeUpdate: h,
        updated: k,
        activated: P,
        deactivated: S,
        beforeDestroy: v,
        beforeUnmount: w,
        destroyed: R,
        unmounted: D,
        render: U,
        renderTracked: ee,
        renderTriggered: ce,
        errorCaptured: W,
        serverPrefetch: X,
        expose: fe,
        inheritAttrs: ge,
        components: ve,
        directives: Me,
        filters: ft,
    } = t;
    if ((f && hf(f, r, null, e.appContext.config.unwrapInjectedRef), o))
        for (const ie in o) {
            const te = o[ie];
            K(te) && (r[ie] = te.bind(n));
        }
    if (i) {
        const ie = i.call(n, n);
        de(ie) && (e.data = on(ie));
    }
    if (((si = !0), a))
        for (const ie in a) {
            const te = a[ie],
                Ce = K(te) ? te.bind(n, n) : K(te.get) ? te.get.bind(n, n) : He,
                $t = !K(te) && K(te.set) ? te.set.bind(n) : He,
                tt = Ae({ get: Ce, set: $t });
            Object.defineProperty(r, ie, { enumerable: !0, configurable: !0, get: () => tt.value, set: (Ye) => (tt.value = Ye) });
        }
    if (s) for (const ie in s) Ss(s[ie], r, n, ie);
    if (l) {
        const ie = K(l) ? l.call(n) : l;
        Reflect.ownKeys(ie).forEach((te) => {
            Wn(te, ie[te]);
        });
    }
    c && ja(c, e, "c");
    function ue(ie, te) {
        B(te) ? te.forEach((Ce) => ie(Ce.bind(n))) : te && ie(te.bind(n));
    }
    if (
        (ue(nf, u),
        ue(Yi, p),
        ue(rf, h),
        ue(af, k),
        ue(Zc, P),
        ue(ef, S),
        ue(cf, W),
        ue(lf, ee),
        ue(sf, ce),
        ue(As, w),
        ue(Es, D),
        ue(of, X),
        B(fe))
    )
        if (fe.length) {
            const ie = e.exposed || (e.exposed = {});
            fe.forEach((te) => {
                Object.defineProperty(ie, te, { get: () => n[te], set: (Ce) => (n[te] = Ce) });
            });
        } else e.exposed || (e.exposed = {});
    U && e.render === He && (e.render = U), ge != null && (e.inheritAttrs = ge), ve && (e.components = ve), Me && (e.directives = Me);
}
function hf(e, t, n = He, r = !1) {
    B(e) && (e = li(e));
    for (const i in e) {
        const a = e[i];
        let o;
        de(a) ? ("default" in a ? (o = yt(a.from || i, a.default, !0)) : (o = yt(a.from || i))) : (o = yt(a)),
            ye(o) && r
                ? Object.defineProperty(t, i, { enumerable: !0, configurable: !0, get: () => o.value, set: (s) => (o.value = s) })
                : (t[i] = o);
    }
}
function ja(e, t, n) {
    Ne(B(e) ? e.map((r) => r.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Ss(e, t, n, r) {
    const i = r.includes(".") ? ys(n, r) : () => n[r];
    if (he(e)) {
        const a = t[e];
        K(a) && Qt(i, a);
    } else if (K(e)) Qt(i, e.bind(n));
    else if (de(e))
        if (B(e)) e.forEach((a) => Ss(a, t, n, r));
        else {
            const a = K(e.handler) ? e.handler.bind(n) : t[e.handler];
            K(a) && Qt(i, a, e);
        }
}
function Ps(e) {
    const t = e.type,
        { mixins: n, extends: r } = t,
        {
            mixins: i,
            optionsCache: a,
            config: { optionMergeStrategies: o },
        } = e.appContext,
        s = a.get(t);
    let l;
    return (
        s ? (l = s) : !i.length && !n && !r ? (l = t) : ((l = {}), i.length && i.forEach((f) => rr(l, f, o, !0)), rr(l, t, o)),
        a.set(t, l),
        l
    );
}
function rr(e, t, n, r = !1) {
    const { mixins: i, extends: a } = t;
    a && rr(e, a, n, !0), i && i.forEach((o) => rr(e, o, n, !0));
    for (const o in t)
        if (!(r && o === "expose")) {
            const s = gf[o] || (n && n[o]);
            e[o] = s ? s(e[o], t[o]) : t[o];
        }
    return e;
}
const gf = {
    data: La,
    props: Ct,
    emits: Ct,
    methods: Ct,
    computed: Ct,
    beforeCreate: we,
    created: we,
    beforeMount: we,
    mounted: we,
    beforeUpdate: we,
    updated: we,
    beforeDestroy: we,
    beforeUnmount: we,
    destroyed: we,
    unmounted: we,
    activated: we,
    deactivated: we,
    errorCaptured: we,
    serverPrefetch: we,
    components: Ct,
    directives: Ct,
    watch: bf,
    provide: La,
    inject: vf,
};
function La(e, t) {
    return t
        ? e
            ? function () {
                  return _e(K(e) ? e.call(this, this) : e, K(t) ? t.call(this, this) : t);
              }
            : t
        : e;
}
function vf(e, t) {
    return Ct(li(e), li(t));
}
function li(e) {
    if (B(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function we(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function Ct(e, t) {
    return e ? _e(_e(Object.create(null), e), t) : t;
}
function bf(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = _e(Object.create(null), e);
    for (const r in t) n[r] = we(e[r], t[r]);
    return n;
}
function yf(e, t, n, r = !1) {
    const i = {},
        a = {};
    Zn(a, Ar, 1), (e.propsDefaults = Object.create(null)), Is(e, t, i, a);
    for (const o in e.propsOptions[0]) o in i || (i[o] = void 0);
    n ? (e.props = r ? i : Tc(i)) : e.type.props ? (e.props = i) : (e.props = a), (e.attrs = a);
}
function _f(e, t, n, r) {
    const {
            props: i,
            attrs: a,
            vnode: { patchFlag: o },
        } = e,
        s = Q(i),
        [l] = e.propsOptions;
    let f = !1;
    if ((r || o > 0) && !(o & 16)) {
        if (o & 8) {
            const c = e.vnode.dynamicProps;
            for (let u = 0; u < c.length; u++) {
                let p = c[u];
                if (_r(e.emitsOptions, p)) continue;
                const h = t[p];
                if (l)
                    if (q(a, p)) h !== a[p] && ((a[p] = h), (f = !0));
                    else {
                        const k = Ze(p);
                        i[k] = ci(l, s, k, h, e, !1);
                    }
                else h !== a[p] && ((a[p] = h), (f = !0));
            }
        }
    } else {
        Is(e, t, i, a) && (f = !0);
        let c;
        for (const u in s)
            (!t || (!q(t, u) && ((c = nn(u)) === u || !q(t, c)))) &&
                (l ? n && (n[u] !== void 0 || n[c] !== void 0) && (i[u] = ci(l, s, u, void 0, e, !0)) : delete i[u]);
        if (a !== s) for (const u in a) (!t || (!q(t, u) && !0)) && (delete a[u], (f = !0));
    }
    f && it(e, "set", "$attrs");
}
function Is(e, t, n, r) {
    const [i, a] = e.propsOptions;
    let o = !1,
        s;
    if (t)
        for (let l in t) {
            if (Vn(l)) continue;
            const f = t[l];
            let c;
            i && q(i, (c = Ze(l)))
                ? !a || !a.includes(c)
                    ? (n[c] = f)
                    : ((s || (s = {}))[c] = f)
                : _r(e.emitsOptions, l) || ((!(l in r) || f !== r[l]) && ((r[l] = f), (o = !0)));
        }
    if (a) {
        const l = Q(n),
            f = s || oe;
        for (let c = 0; c < a.length; c++) {
            const u = a[c];
            n[u] = ci(i, l, u, f[u], e, !q(f, u));
        }
    }
    return o;
}
function ci(e, t, n, r, i, a) {
    const o = e[n];
    if (o != null) {
        const s = q(o, "default");
        if (s && r === void 0) {
            const l = o.default;
            if (o.type !== Function && K(l)) {
                const { propsDefaults: f } = i;
                n in f ? (r = f[n]) : (Zt(i), (r = f[n] = l.call(null, t)), Tt());
            } else r = l;
        }
        o[0] && (a && !s ? (r = !1) : o[1] && (r === "" || r === nn(n)) && (r = !0));
    }
    return r;
}
function Ts(e, t, n = !1) {
    const r = t.propsCache,
        i = r.get(e);
    if (i) return i;
    const a = e.props,
        o = {},
        s = [];
    let l = !1;
    if (!K(e)) {
        const c = (u) => {
            l = !0;
            const [p, h] = Ts(u, t, !0);
            _e(o, p), h && s.push(...h);
        };
        !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
    }
    if (!a && !l) return r.set(e, qt), qt;
    if (B(a))
        for (let c = 0; c < a.length; c++) {
            const u = Ze(a[c]);
            $a(u) && (o[u] = oe);
        }
    else if (a)
        for (const c in a) {
            const u = Ze(c);
            if ($a(u)) {
                const p = a[c],
                    h = (o[u] = B(p) || K(p) ? { type: p } : p);
                if (h) {
                    const k = Da(Boolean, h.type),
                        P = Da(String, h.type);
                    (h[0] = k > -1), (h[1] = P < 0 || k < P), (k > -1 || q(h, "default")) && s.push(u);
                }
            }
        }
    const f = [o, s];
    return r.set(e, f), f;
}
function $a(e) {
    return e[0] !== "$";
}
function za(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/);
    return t ? t[1] : e === null ? "null" : "";
}
function Fa(e, t) {
    return za(e) === za(t);
}
function Da(e, t) {
    return B(t) ? t.findIndex((n) => Fa(n, e)) : K(t) && Fa(t, e) ? 0 : -1;
}
const Rs = (e) => e[0] === "_" || e === "$stable",
    qi = (e) => (B(e) ? e.map(Qe) : [Qe(e)]),
    wf = (e, t, n) => {
        if (t._n) return t;
        const r = ri((...i) => qi(t(...i)), n);
        return (r._c = !1), r;
    },
    Ns = (e, t, n) => {
        const r = e._ctx;
        for (const i in e) {
            if (Rs(i)) continue;
            const a = e[i];
            if (K(a)) t[i] = wf(i, a, r);
            else if (a != null) {
                const o = qi(a);
                t[i] = () => o;
            }
        }
    },
    Ms = (e, t) => {
        const n = qi(t);
        e.slots.default = () => n;
    },
    xf = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const n = t._;
            n ? ((e.slots = Q(t)), Zn(t, "_", n)) : Ns(t, (e.slots = {}));
        } else (e.slots = {}), t && Ms(e, t);
        Zn(e.slots, Ar, 1);
    },
    kf = (e, t, n) => {
        const { vnode: r, slots: i } = e;
        let a = !0,
            o = oe;
        if (r.shapeFlag & 32) {
            const s = t._;
            s ? (n && s === 1 ? (a = !1) : (_e(i, t), !n && s === 1 && delete i._)) : ((a = !t.$stable), Ns(t, i)), (o = t);
        } else t && (Ms(e, t), (o = { default: 1 }));
        if (a) for (const s in i) !Rs(s) && !(s in o) && delete i[s];
    };
function js() {
    return {
        app: null,
        config: {
            isNativeTag: Xl,
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
let Af = 0;
function Ef(e, t) {
    return function (r, i = null) {
        K(r) || (r = Object.assign({}, r)), i != null && !de(i) && (i = null);
        const a = js(),
            o = new Set();
        let s = !1;
        const l = (a.app = {
            _uid: Af++,
            _component: r,
            _props: i,
            _container: null,
            _context: a,
            _instance: null,
            version: Uf,
            get config() {
                return a.config;
            },
            set config(f) {},
            use(f, ...c) {
                return o.has(f) || (f && K(f.install) ? (o.add(f), f.install(l, ...c)) : K(f) && (o.add(f), f(l, ...c))), l;
            },
            mixin(f) {
                return a.mixins.includes(f) || a.mixins.push(f), l;
            },
            component(f, c) {
                return c ? ((a.components[f] = c), l) : a.components[f];
            },
            directive(f, c) {
                return c ? ((a.directives[f] = c), l) : a.directives[f];
            },
            mount(f, c, u) {
                if (!s) {
                    const p = be(r, i);
                    return (
                        (p.appContext = a),
                        c && t ? t(p, f) : e(p, f, u),
                        (s = !0),
                        (l._container = f),
                        (f.__vue_app__ = l),
                        Qi(p.component) || p.component.proxy
                    );
                }
            },
            unmount() {
                s && (e(null, l._container), delete l._container.__vue_app__);
            },
            provide(f, c) {
                return (a.provides[f] = c), l;
            },
        });
        return l;
    };
}
function fi(e, t, n, r, i = !1) {
    if (B(e)) {
        e.forEach((p, h) => fi(p, t && (B(t) ? t[h] : t), n, r, i));
        return;
    }
    if (Kn(r) && !i) return;
    const a = r.shapeFlag & 4 ? Qi(r.component) || r.component.proxy : r.el,
        o = i ? null : a,
        { i: s, r: l } = e,
        f = t && t.r,
        c = s.refs === oe ? (s.refs = {}) : s.refs,
        u = s.setupState;
    if ((f != null && f !== l && (he(f) ? ((c[f] = null), q(u, f) && (u[f] = null)) : ye(f) && (f.value = null)), K(l)))
        bt(l, s, 12, [o, c]);
    else {
        const p = he(l),
            h = ye(l);
        if (p || h) {
            const k = () => {
                if (e.f) {
                    const P = p ? c[l] : l.value;
                    i
                        ? B(P) && Li(P, a)
                        : B(P)
                        ? P.includes(a) || P.push(a)
                        : p
                        ? ((c[l] = [a]), q(u, l) && (u[l] = c[l]))
                        : ((l.value = [a]), e.k && (c[e.k] = l.value));
                } else p ? ((c[l] = o), q(u, l) && (u[l] = o)) : h && ((l.value = o), e.k && (c[e.k] = o));
            };
            o ? ((k.id = -1), ke(k, n)) : k();
        }
    }
}
const ke = qc;
function Cf(e) {
    return Of(e);
}
function Of(e, t) {
    const n = rc();
    n.__VUE__ = !0;
    const {
            insert: r,
            remove: i,
            patchProp: a,
            createElement: o,
            createText: s,
            createComment: l,
            setText: f,
            setElementText: c,
            parentNode: u,
            nextSibling: p,
            setScopeId: h = He,
            cloneNode: k,
            insertStaticContent: P,
        } = e,
        S = (d, m, g, _ = null, y = null, E = null, I = !1, A = null, C = !!m.dynamicChildren) => {
            if (d === m) return;
            d && !Ot(d, m) && ((_ = j(d)), Te(d, y, E, !0), (d = null)), m.patchFlag === -2 && ((C = !1), (m.dynamicChildren = null));
            const { type: x, ref: $, shapeFlag: N } = m;
            switch (x) {
                case Gi:
                    v(d, m, g, _);
                    break;
                case Ue:
                    w(d, m, g, _);
                    break;
                case Yn:
                    d == null && R(m, g, _, I);
                    break;
                case Le:
                    Me(d, m, g, _, y, E, I, A, C);
                    break;
                default:
                    N & 1
                        ? ee(d, m, g, _, y, E, I, A, C)
                        : N & 6
                        ? ft(d, m, g, _, y, E, I, A, C)
                        : (N & 64 || N & 128) && x.process(d, m, g, _, y, E, I, A, C, ae);
            }
            $ != null && y && fi($, d && d.ref, E, m || d, !m);
        },
        v = (d, m, g, _) => {
            if (d == null) r((m.el = s(m.children)), g, _);
            else {
                const y = (m.el = d.el);
                m.children !== d.children && f(y, m.children);
            }
        },
        w = (d, m, g, _) => {
            d == null ? r((m.el = l(m.children || "")), g, _) : (m.el = d.el);
        },
        R = (d, m, g, _) => {
            [d.el, d.anchor] = P(d.children, m, g, _, d.el, d.anchor);
        },
        D = ({ el: d, anchor: m }, g, _) => {
            let y;
            for (; d && d !== m; ) (y = p(d)), r(d, g, _), (d = y);
            r(m, g, _);
        },
        U = ({ el: d, anchor: m }) => {
            let g;
            for (; d && d !== m; ) (g = p(d)), i(d), (d = g);
            i(m);
        },
        ee = (d, m, g, _, y, E, I, A, C) => {
            (I = I || m.type === "svg"), d == null ? ce(m, g, _, y, E, I, A, C) : fe(d, m, y, E, I, A, C);
        },
        ce = (d, m, g, _, y, E, I, A) => {
            let C, x;
            const { type: $, props: N, shapeFlag: z, transition: H, patchFlag: G, dirs: ne } = d;
            if (d.el && k !== void 0 && G === -1) C = d.el = k(d.el);
            else {
                if (
                    ((C = d.el = o(d.type, E, N && N.is, N)),
                    z & 8 ? c(C, d.children) : z & 16 && X(d.children, C, null, _, y, E && $ !== "foreignObject", I, A),
                    ne && At(d, null, _, "created"),
                    N)
                ) {
                    for (const se in N) se !== "value" && !Vn(se) && a(C, se, null, N[se], E, d.children, _, y, O);
                    "value" in N && a(C, "value", null, N.value), (x = N.onVnodeBeforeMount) && Ge(x, _, d);
                }
                W(C, d, d.scopeId, I, _);
            }
            ne && At(d, null, _, "beforeMount");
            const re = (!y || (y && !y.pendingBranch)) && H && !H.persisted;
            re && H.beforeEnter(C),
                r(C, m, g),
                ((x = N && N.onVnodeMounted) || re || ne) &&
                    ke(() => {
                        x && Ge(x, _, d), re && H.enter(C), ne && At(d, null, _, "mounted");
                    }, y);
        },
        W = (d, m, g, _, y) => {
            if ((g && h(d, g), _)) for (let E = 0; E < _.length; E++) h(d, _[E]);
            if (y) {
                let E = y.subTree;
                if (m === E) {
                    const I = y.vnode;
                    W(d, I, I.scopeId, I.slotScopeIds, y.parent);
                }
            }
        },
        X = (d, m, g, _, y, E, I, A, C = 0) => {
            for (let x = C; x < d.length; x++) {
                const $ = (d[x] = A ? ht(d[x]) : Qe(d[x]));
                S(null, $, m, g, _, y, E, I, A);
            }
        },
        fe = (d, m, g, _, y, E, I) => {
            const A = (m.el = d.el);
            let { patchFlag: C, dynamicChildren: x, dirs: $ } = m;
            C |= d.patchFlag & 16;
            const N = d.props || oe,
                z = m.props || oe;
            let H;
            g && Et(g, !1), (H = z.onVnodeBeforeUpdate) && Ge(H, g, m, d), $ && At(m, d, g, "beforeUpdate"), g && Et(g, !0);
            const G = y && m.type !== "foreignObject";
            if ((x ? ge(d.dynamicChildren, x, A, g, _, G, E) : I || Ce(d, m, A, null, g, _, G, E, !1), C > 0)) {
                if (C & 16) ve(A, m, N, z, g, _, y);
                else if (
                    (C & 2 && N.class !== z.class && a(A, "class", null, z.class, y), C & 4 && a(A, "style", N.style, z.style, y), C & 8)
                ) {
                    const ne = m.dynamicProps;
                    for (let re = 0; re < ne.length; re++) {
                        const se = ne[re],
                            je = N[se],
                            zt = z[se];
                        (zt !== je || se === "value") && a(A, se, je, zt, y, d.children, g, _, O);
                    }
                }
                C & 1 && d.children !== m.children && c(A, m.children);
            } else !I && x == null && ve(A, m, N, z, g, _, y);
            ((H = z.onVnodeUpdated) || $) &&
                ke(() => {
                    H && Ge(H, g, m, d), $ && At(m, d, g, "updated");
                }, _);
        },
        ge = (d, m, g, _, y, E, I) => {
            for (let A = 0; A < m.length; A++) {
                const C = d[A],
                    x = m[A],
                    $ = C.el && (C.type === Le || !Ot(C, x) || C.shapeFlag & 70) ? u(C.el) : g;
                S(C, x, $, null, _, y, E, I, !0);
            }
        },
        ve = (d, m, g, _, y, E, I) => {
            if (g !== _) {
                for (const A in _) {
                    if (Vn(A)) continue;
                    const C = _[A],
                        x = g[A];
                    C !== x && A !== "value" && a(d, A, x, C, I, m.children, y, E, O);
                }
                if (g !== oe) for (const A in g) !Vn(A) && !(A in _) && a(d, A, g[A], null, I, m.children, y, E, O);
                "value" in _ && a(d, "value", g.value, _.value);
            }
        },
        Me = (d, m, g, _, y, E, I, A, C) => {
            const x = (m.el = d ? d.el : s("")),
                $ = (m.anchor = d ? d.anchor : s(""));
            let { patchFlag: N, dynamicChildren: z, slotScopeIds: H } = m;
            H && (A = A ? A.concat(H) : H),
                d == null
                    ? (r(x, g, _), r($, g, _), X(m.children, g, $, y, E, I, A, C))
                    : N > 0 && N & 64 && z && d.dynamicChildren
                    ? (ge(d.dynamicChildren, z, g, y, E, I, A), (m.key != null || (y && m === y.subTree)) && Ls(d, m, !0))
                    : Ce(d, m, g, $, y, E, I, A, C);
        },
        ft = (d, m, g, _, y, E, I, A, C) => {
            (m.slotScopeIds = A), d == null ? (m.shapeFlag & 512 ? y.ctx.activate(m, g, _, I, C) : Lt(m, g, _, y, E, I, C)) : ue(d, m, C);
        },
        Lt = (d, m, g, _, y, E, I) => {
            const A = (d.component = Lf(d, _, y));
            if ((xr(d) && (A.ctx.renderer = ae), $f(A), A.asyncDep)) {
                if ((y && y.registerDep(A, ie), !d.el)) {
                    const C = (A.subTree = be(Ue));
                    w(null, C, m, g);
                }
                return;
            }
            ie(A, d, m, g, y, E, I);
        },
        ue = (d, m, g) => {
            const _ = (m.component = d.component);
            if (Wc(d, m, g))
                if (_.asyncDep && !_.asyncResolved) {
                    te(_, m, g);
                    return;
                } else (_.next = m), Fc(_.update), _.update();
            else (m.el = d.el), (_.vnode = m);
        },
        ie = (d, m, g, _, y, E, I) => {
            const A = () => {
                    if (d.isMounted) {
                        let { next: $, bu: N, u: z, parent: H, vnode: G } = d,
                            ne = $,
                            re;
                        Et(d, !1),
                            $ ? (($.el = G.el), te(d, $, I)) : ($ = G),
                            N && Mr(N),
                            (re = $.props && $.props.onVnodeBeforeUpdate) && Ge(re, H, $, G),
                            Et(d, !0);
                        const se = jr(d),
                            je = d.subTree;
                        (d.subTree = se),
                            S(je, se, u(je.el), j(je), d, y, E),
                            ($.el = se.el),
                            ne === null && Kc(d, se.el),
                            z && ke(z, y),
                            (re = $.props && $.props.onVnodeUpdated) && ke(() => Ge(re, H, $, G), y);
                    } else {
                        let $;
                        const { el: N, props: z } = m,
                            { bm: H, m: G, parent: ne } = d,
                            re = Kn(m);
                        if ((Et(d, !1), H && Mr(H), !re && ($ = z && z.onVnodeBeforeMount) && Ge($, ne, m), Et(d, !0), N && V)) {
                            const se = () => {
                                (d.subTree = jr(d)), V(N, d.subTree, d, y, null);
                            };
                            re ? m.type.__asyncLoader().then(() => !d.isUnmounted && se()) : se();
                        } else {
                            const se = (d.subTree = jr(d));
                            S(null, se, g, _, d, y, E), (m.el = se.el);
                        }
                        if ((G && ke(G, y), !re && ($ = z && z.onVnodeMounted))) {
                            const se = m;
                            ke(() => Ge($, ne, se), y);
                        }
                        (m.shapeFlag & 256 || (ne && Kn(ne.vnode) && ne.vnode.shapeFlag & 256)) && d.a && ke(d.a, y),
                            (d.isMounted = !0),
                            (m = g = _ = null);
                    }
                },
                C = (d.effect = new Di(A, () => ds(x), d.scope)),
                x = (d.update = () => C.run());
            (x.id = d.uid), Et(d, !0), x();
        },
        te = (d, m, g) => {
            m.component = d;
            const _ = d.vnode.props;
            (d.vnode = m), (d.next = null), _f(d, m.props, _, g), kf(d, m.children, g), rn(), yr(void 0, d.update), an();
        },
        Ce = (d, m, g, _, y, E, I, A, C = !1) => {
            const x = d && d.children,
                $ = d ? d.shapeFlag : 0,
                N = m.children,
                { patchFlag: z, shapeFlag: H } = m;
            if (z > 0) {
                if (z & 128) {
                    tt(x, N, g, _, y, E, I, A, C);
                    return;
                } else if (z & 256) {
                    $t(x, N, g, _, y, E, I, A, C);
                    return;
                }
            }
            H & 8
                ? ($ & 16 && O(x, y, E), N !== x && c(g, N))
                : $ & 16
                ? H & 16
                    ? tt(x, N, g, _, y, E, I, A, C)
                    : O(x, y, E, !0)
                : ($ & 8 && c(g, ""), H & 16 && X(N, g, _, y, E, I, A, C));
        },
        $t = (d, m, g, _, y, E, I, A, C) => {
            (d = d || qt), (m = m || qt);
            const x = d.length,
                $ = m.length,
                N = Math.min(x, $);
            let z;
            for (z = 0; z < N; z++) {
                const H = (m[z] = C ? ht(m[z]) : Qe(m[z]));
                S(d[z], H, g, null, y, E, I, A, C);
            }
            x > $ ? O(d, y, E, !0, !1, N) : X(m, g, _, y, E, I, A, C, N);
        },
        tt = (d, m, g, _, y, E, I, A, C) => {
            let x = 0;
            const $ = m.length;
            let N = d.length - 1,
                z = $ - 1;
            for (; x <= N && x <= z; ) {
                const H = d[x],
                    G = (m[x] = C ? ht(m[x]) : Qe(m[x]));
                if (Ot(H, G)) S(H, G, g, null, y, E, I, A, C);
                else break;
                x++;
            }
            for (; x <= N && x <= z; ) {
                const H = d[N],
                    G = (m[z] = C ? ht(m[z]) : Qe(m[z]));
                if (Ot(H, G)) S(H, G, g, null, y, E, I, A, C);
                else break;
                N--, z--;
            }
            if (x > N) {
                if (x <= z) {
                    const H = z + 1,
                        G = H < $ ? m[H].el : _;
                    for (; x <= z; ) S(null, (m[x] = C ? ht(m[x]) : Qe(m[x])), g, G, y, E, I, A, C), x++;
                }
            } else if (x > z) for (; x <= N; ) Te(d[x], y, E, !0), x++;
            else {
                const H = x,
                    G = x,
                    ne = new Map();
                for (x = G; x <= z; x++) {
                    const Oe = (m[x] = C ? ht(m[x]) : Qe(m[x]));
                    Oe.key != null && ne.set(Oe.key, x);
                }
                let re,
                    se = 0;
                const je = z - G + 1;
                let zt = !1,
                    _a = 0;
                const dn = new Array(je);
                for (x = 0; x < je; x++) dn[x] = 0;
                for (x = H; x <= N; x++) {
                    const Oe = d[x];
                    if (se >= je) {
                        Te(Oe, y, E, !0);
                        continue;
                    }
                    let qe;
                    if (Oe.key != null) qe = ne.get(Oe.key);
                    else
                        for (re = G; re <= z; re++)
                            if (dn[re - G] === 0 && Ot(Oe, m[re])) {
                                qe = re;
                                break;
                            }
                    qe === void 0
                        ? Te(Oe, y, E, !0)
                        : ((dn[qe - G] = x + 1), qe >= _a ? (_a = qe) : (zt = !0), S(Oe, m[qe], g, null, y, E, I, A, C), se++);
                }
                const wa = zt ? Sf(dn) : qt;
                for (re = wa.length - 1, x = je - 1; x >= 0; x--) {
                    const Oe = G + x,
                        qe = m[Oe],
                        xa = Oe + 1 < $ ? m[Oe + 1].el : _;
                    dn[x] === 0 ? S(null, qe, g, xa, y, E, I, A, C) : zt && (re < 0 || x !== wa[re] ? Ye(qe, g, xa, 2) : re--);
                }
            }
        },
        Ye = (d, m, g, _, y = null) => {
            const { el: E, type: I, transition: A, children: C, shapeFlag: x } = d;
            if (x & 6) {
                Ye(d.component.subTree, m, g, _);
                return;
            }
            if (x & 128) {
                d.suspense.move(m, g, _);
                return;
            }
            if (x & 64) {
                I.move(d, m, g, ae);
                return;
            }
            if (I === Le) {
                r(E, m, g);
                for (let N = 0; N < C.length; N++) Ye(C[N], m, g, _);
                r(d.anchor, m, g);
                return;
            }
            if (I === Yn) {
                D(d, m, g);
                return;
            }
            if (_ !== 2 && x & 1 && A)
                if (_ === 0) A.beforeEnter(E), r(E, m, g), ke(() => A.enter(E), y);
                else {
                    const { leave: N, delayLeave: z, afterLeave: H } = A,
                        G = () => r(E, m, g),
                        ne = () => {
                            N(E, () => {
                                G(), H && H();
                            });
                        };
                    z ? z(E, G, ne) : ne();
                }
            else r(E, m, g);
        },
        Te = (d, m, g, _ = !1, y = !1) => {
            const { type: E, props: I, ref: A, children: C, dynamicChildren: x, shapeFlag: $, patchFlag: N, dirs: z } = d;
            if ((A != null && fi(A, null, g, d, !0), $ & 256)) {
                m.ctx.deactivate(d);
                return;
            }
            const H = $ & 1 && z,
                G = !Kn(d);
            let ne;
            if ((G && (ne = I && I.onVnodeBeforeUnmount) && Ge(ne, m, d), $ & 6)) M(d.component, g, _);
            else {
                if ($ & 128) {
                    d.suspense.unmount(g, _);
                    return;
                }
                H && At(d, null, m, "beforeUnmount"),
                    $ & 64
                        ? d.type.remove(d, m, g, y, ae, _)
                        : x && (E !== Le || (N > 0 && N & 64))
                        ? O(x, m, g, !1, !0)
                        : ((E === Le && N & 384) || (!y && $ & 16)) && O(C, m, g),
                    _ && un(d);
            }
            ((G && (ne = I && I.onVnodeUnmounted)) || H) &&
                ke(() => {
                    ne && Ge(ne, m, d), H && At(d, null, m, "unmounted");
                }, g);
        },
        un = (d) => {
            const { type: m, el: g, anchor: _, transition: y } = d;
            if (m === Le) {
                b(g, _);
                return;
            }
            if (m === Yn) {
                U(d);
                return;
            }
            const E = () => {
                i(g), y && !y.persisted && y.afterLeave && y.afterLeave();
            };
            if (d.shapeFlag & 1 && y && !y.persisted) {
                const { leave: I, delayLeave: A } = y,
                    C = () => I(g, E);
                A ? A(d.el, E, C) : C();
            } else E();
        },
        b = (d, m) => {
            let g;
            for (; d !== m; ) (g = p(d)), i(d), (d = g);
            i(m);
        },
        M = (d, m, g) => {
            const { bum: _, scope: y, update: E, subTree: I, um: A } = d;
            _ && Mr(_),
                y.stop(),
                E && ((E.active = !1), Te(I, d, m, g)),
                A && ke(A, m),
                ke(() => {
                    d.isUnmounted = !0;
                }, m),
                m &&
                    m.pendingBranch &&
                    !m.isUnmounted &&
                    d.asyncDep &&
                    !d.asyncResolved &&
                    d.suspenseId === m.pendingId &&
                    (m.deps--, m.deps === 0 && m.resolve());
        },
        O = (d, m, g, _ = !1, y = !1, E = 0) => {
            for (let I = E; I < d.length; I++) Te(d[I], m, g, _, y);
        },
        j = (d) => (d.shapeFlag & 6 ? j(d.component.subTree) : d.shapeFlag & 128 ? d.suspense.next() : p(d.anchor || d.el)),
        J = (d, m, g) => {
            d == null ? m._vnode && Te(m._vnode, null, null, !0) : S(m._vnode || null, d, m, null, null, null, g), hs(), (m._vnode = d);
        },
        ae = { p: S, um: Te, m: Ye, r: un, mt: Lt, mc: X, pc: Ce, pbc: ge, n: j, o: e };
    let Y, V;
    return t && ([Y, V] = t(ae)), { render: J, hydrate: Y, createApp: Ef(J, Y) };
}
function Et({ effect: e, update: t }, n) {
    e.allowRecurse = t.allowRecurse = n;
}
function Ls(e, t, n = !1) {
    const r = e.children,
        i = t.children;
    if (B(r) && B(i))
        for (let a = 0; a < r.length; a++) {
            const o = r[a];
            let s = i[a];
            s.shapeFlag & 1 &&
                !s.dynamicChildren &&
                ((s.patchFlag <= 0 || s.patchFlag === 32) && ((s = i[a] = ht(i[a])), (s.el = o.el)), n || Ls(o, s));
        }
}
function Sf(e) {
    const t = e.slice(),
        n = [0];
    let r, i, a, o, s;
    const l = e.length;
    for (r = 0; r < l; r++) {
        const f = e[r];
        if (f !== 0) {
            if (((i = n[n.length - 1]), e[i] < f)) {
                (t[r] = i), n.push(r);
                continue;
            }
            for (a = 0, o = n.length - 1; a < o; ) (s = (a + o) >> 1), e[n[s]] < f ? (a = s + 1) : (o = s);
            f < e[n[a]] && (a > 0 && (t[r] = n[a - 1]), (n[a] = r));
        }
    }
    for (a = n.length, o = n[a - 1]; a-- > 0; ) (n[a] = o), (o = t[o]);
    return n;
}
const Pf = (e) => e.__isTeleport,
    Le = Symbol(void 0),
    Gi = Symbol(void 0),
    Ue = Symbol(void 0),
    Yn = Symbol(void 0),
    wn = [];
let Fe = null;
function me(e = !1) {
    wn.push((Fe = e ? null : []));
}
function If() {
    wn.pop(), (Fe = wn[wn.length - 1] || null);
}
let In = 1;
function Ha(e) {
    In += e;
}
function $s(e) {
    return (e.dynamicChildren = In > 0 ? Fe || qt : null), If(), In > 0 && Fe && Fe.push(e), e;
}
function xe(e, t, n, r, i, a) {
    return $s(L(e, t, n, r, i, a, !0));
}
function ui(e, t, n, r, i) {
    return $s(be(e, t, n, r, i, !0));
}
function di(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function Ot(e, t) {
    return e.type === t.type && e.key === t.key;
}
const Ar = "__vInternal",
    zs = ({ key: e }) => (e != null ? e : null),
    qn = ({ ref: e, ref_key: t, ref_for: n }) => (e != null ? (he(e) || ye(e) || K(e) ? { i: ze, r: e, k: t, f: !!n } : e) : null);
function L(e, t = null, n = null, r = 0, i = null, a = e === Le ? 0 : 1, o = !1, s = !1) {
    const l = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && zs(t),
        ref: t && qn(t),
        scopeId: wr,
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
        shapeFlag: a,
        patchFlag: r,
        dynamicProps: i,
        dynamicChildren: null,
        appContext: null,
    };
    return (
        s ? (Xi(l, n), a & 128 && e.normalize(l)) : n && (l.shapeFlag |= he(n) ? 8 : 16),
        In > 0 && !o && Fe && (l.patchFlag > 0 || a & 6) && l.patchFlag !== 32 && Fe.push(l),
        l
    );
}
const be = Tf;
function Tf(e, t = null, n = null, r = 0, i = null, a = !1) {
    if (((!e || e === ff) && (e = Ue), di(e))) {
        const s = wt(e, t, !0);
        return n && Xi(s, n), In > 0 && !a && Fe && (s.shapeFlag & 6 ? (Fe[Fe.indexOf(e)] = s) : Fe.push(s)), (s.patchFlag |= -2), s;
    }
    if ((Bf(e) && (e = e.__vccOpts), t)) {
        t = Rf(t);
        let { class: s, style: l } = t;
        s && !he(s) && (t.class = ur(s)), de(l) && (is(l) && !B(l) && (l = _e({}, l)), (t.style = Mi(l)));
    }
    const o = he(e) ? 1 : Yc(e) ? 128 : Pf(e) ? 64 : de(e) ? 4 : K(e) ? 2 : 0;
    return L(e, t, n, r, i, o, a, !0);
}
function Rf(e) {
    return e ? (is(e) || Ar in e ? _e({}, e) : e) : null;
}
function wt(e, t, n = !1) {
    const { props: r, ref: i, patchFlag: a, children: o } = e,
        s = t ? Nf(r || {}, t) : r;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: s,
        key: s && zs(s),
        ref: t && t.ref ? (n && i ? (B(i) ? i.concat(qn(t)) : [i, qn(t)]) : qn(t)) : i,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: o,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Le ? (a === -1 ? 16 : a | 16) : a,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && wt(e.ssContent),
        ssFallback: e.ssFallback && wt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
    };
}
function Ve(e = " ", t = 0) {
    return be(Gi, null, e, t);
}
function Fs(e, t) {
    const n = be(Yn, null, e);
    return (n.staticCount = t), n;
}
function pi(e = "", t = !1) {
    return t ? (me(), ui(Ue, null, e)) : be(Ue, null, e);
}
function Qe(e) {
    return e == null || typeof e == "boolean"
        ? be(Ue)
        : B(e)
        ? be(Le, null, e.slice())
        : typeof e == "object"
        ? ht(e)
        : be(Gi, null, String(e));
}
function ht(e) {
    return e.el === null || e.memo ? e : wt(e);
}
function Xi(e, t) {
    let n = 0;
    const { shapeFlag: r } = e;
    if (t == null) t = null;
    else if (B(t)) n = 16;
    else if (typeof t == "object")
        if (r & 65) {
            const i = t.default;
            i && (i._c && (i._d = !1), Xi(e, i()), i._c && (i._d = !0));
            return;
        } else {
            n = 32;
            const i = t._;
            !i && !(Ar in t) ? (t._ctx = ze) : i === 3 && ze && (ze.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else K(t) ? ((t = { default: t, _ctx: ze }), (n = 32)) : ((t = String(t)), r & 64 ? ((n = 16), (t = [Ve(t)])) : (n = 8));
    (e.children = t), (e.shapeFlag |= n);
}
function Nf(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const r = e[n];
        for (const i in r)
            if (i === "class") t.class !== r.class && (t.class = ur([t.class, r.class]));
            else if (i === "style") t.style = Mi([t.style, r.style]);
            else if (dr(i)) {
                const a = t[i],
                    o = r[i];
                o && a !== o && !(B(a) && a.includes(o)) && (t[i] = a ? [].concat(a, o) : o);
            } else i !== "" && (t[i] = r[i]);
    }
    return t;
}
function Ge(e, t, n, r = null) {
    Ne(e, t, 7, [n, r]);
}
const Mf = js();
let jf = 0;
function Lf(e, t, n) {
    const r = e.type,
        i = (t ? t.appContext : e.appContext) || Mf,
        a = {
            uid: jf++,
            vnode: e,
            type: r,
            parent: t,
            appContext: i,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new ic(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(i.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Ts(r, i),
            emitsOptions: vs(r, i),
            emit: null,
            emitted: null,
            propsDefaults: oe,
            inheritAttrs: r.inheritAttrs,
            ctx: oe,
            data: oe,
            props: oe,
            attrs: oe,
            slots: oe,
            refs: oe,
            setupState: oe,
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
    return (a.ctx = { _: a }), (a.root = t ? t.root : a), (a.emit = Bc.bind(null, a)), e.ce && e.ce(a), a;
}
let pe = null;
const Ds = () => pe || ze,
    Zt = (e) => {
        (pe = e), e.scope.on();
    },
    Tt = () => {
        pe && pe.scope.off(), (pe = null);
    };
function Hs(e) {
    return e.vnode.shapeFlag & 4;
}
let Tn = !1;
function $f(e, t = !1) {
    Tn = t;
    const { props: n, children: r } = e.vnode,
        i = Hs(e);
    yf(e, n, i, t), xf(e, r);
    const a = i ? zf(e, t) : void 0;
    return (Tn = !1), a;
}
function zf(e, t) {
    const n = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = as(new Proxy(e.ctx, pf)));
    const { setup: r } = n;
    if (r) {
        const i = (e.setupContext = r.length > 1 ? Df(e) : null);
        Zt(e), rn();
        const a = bt(r, e, 0, [e.props, i]);
        if ((an(), Tt(), Wo(a))) {
            if ((a.then(Tt, Tt), t))
                return a
                    .then((o) => {
                        Ba(e, o, t);
                    })
                    .catch((o) => {
                        br(o, e, 0);
                    });
            e.asyncDep = a;
        } else Ba(e, a, t);
    } else Bs(e, t);
}
function Ba(e, t, n) {
    K(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : de(t) && (e.setupState = cs(t)), Bs(e, n);
}
let Ua;
function Bs(e, t, n) {
    const r = e.type;
    if (!e.render) {
        if (!t && Ua && !r.render) {
            const i = r.template;
            if (i) {
                const { isCustomElement: a, compilerOptions: o } = e.appContext.config,
                    { delimiters: s, compilerOptions: l } = r,
                    f = _e(_e({ isCustomElement: a, delimiters: s }, o), l);
                r.render = Ua(i, f);
            }
        }
        e.render = r.render || He;
    }
    Zt(e), rn(), mf(e), an(), Tt();
}
function Ff(e) {
    return new Proxy(e.attrs, {
        get(t, n) {
            return Pe(e, "get", "$attrs"), t[n];
        },
    });
}
function Df(e) {
    const t = (r) => {
        e.exposed = r || {};
    };
    let n;
    return {
        get attrs() {
            return n || (n = Ff(e));
        },
        slots: e.slots,
        emit: e.emit,
        expose: t,
    };
}
function Qi(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(cs(as(e.exposed)), {
                get(t, n) {
                    if (n in t) return t[n];
                    if (n in nr) return nr[n](e);
                },
            }))
        );
}
function Hf(e, t = !0) {
    return K(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Bf(e) {
    return K(e) && "__vccOpts" in e;
}
const Ae = (e, t) => Lc(e, t, Tn);
function Us(e, t, n) {
    const r = arguments.length;
    return r === 2
        ? de(t) && !B(t)
            ? di(t)
                ? be(e, null, [t])
                : be(e, t)
            : be(e, null, t)
        : (r > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : r === 3 && di(n) && (n = [n]), be(e, t, n));
}
const Uf = "3.2.37",
    Vf = "http://www.w3.org/2000/svg",
    St = typeof document != "undefined" ? document : null,
    Va = St && St.createElement("template"),
    Wf = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, r) => {
            const i = t ? St.createElementNS(Vf, e) : St.createElement(e, n ? { is: n } : void 0);
            return e === "select" && r && r.multiple != null && i.setAttribute("multiple", r.multiple), i;
        },
        createText: (e) => St.createTextNode(e),
        createComment: (e) => St.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => St.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "");
        },
        cloneNode(e) {
            const t = e.cloneNode(!0);
            return "_value" in e && (t._value = e._value), t;
        },
        insertStaticContent(e, t, n, r, i, a) {
            const o = n ? n.previousSibling : t.lastChild;
            if (i && (i === a || i.nextSibling)) for (; t.insertBefore(i.cloneNode(!0), n), !(i === a || !(i = i.nextSibling)); );
            else {
                Va.innerHTML = r ? `<svg>${e}</svg>` : e;
                const s = Va.content;
                if (r) {
                    const l = s.firstChild;
                    for (; l.firstChild; ) s.appendChild(l.firstChild);
                    s.removeChild(l);
                }
                t.insertBefore(s, n);
            }
            return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
        },
    };
function Kf(e, t, n) {
    const r = e._vtc;
    r && (t = (t ? [t, ...r] : [...r]).join(" ")),
        t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : (e.className = t);
}
function Yf(e, t, n) {
    const r = e.style,
        i = he(n);
    if (n && !i) {
        for (const a in n) mi(r, a, n[a]);
        if (t && !he(t)) for (const a in t) n[a] == null && mi(r, a, "");
    } else {
        const a = r.display;
        i ? t !== n && (r.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (r.display = a);
    }
}
const Wa = /\s*!important$/;
function mi(e, t, n) {
    if (B(n)) n.forEach((r) => mi(e, t, r));
    else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
    else {
        const r = qf(e, t);
        Wa.test(n) ? e.setProperty(nn(r), n.replace(Wa, ""), "important") : (e[r] = n);
    }
}
const Ka = ["Webkit", "Moz", "ms"],
    $r = {};
function qf(e, t) {
    const n = $r[t];
    if (n) return n;
    let r = Ze(t);
    if (r !== "filter" && r in e) return ($r[t] = r);
    r = hr(r);
    for (let i = 0; i < Ka.length; i++) {
        const a = Ka[i] + r;
        if (a in e) return ($r[t] = a);
    }
    return t;
}
const Ya = "http://www.w3.org/1999/xlink";
function Gf(e, t, n, r, i) {
    if (r && t.startsWith("xlink:")) n == null ? e.removeAttributeNS(Ya, t.slice(6, t.length)) : e.setAttributeNS(Ya, t, n);
    else {
        const a = Kl(t);
        n == null || (a && !Bo(n)) ? e.removeAttribute(t) : e.setAttribute(t, a ? "" : n);
    }
}
function Xf(e, t, n, r, i, a, o) {
    if (t === "innerHTML" || t === "textContent") {
        r && o(r, i, a), (e[t] = n == null ? "" : n);
        return;
    }
    if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
        e._value = n;
        const l = n == null ? "" : n;
        (e.value !== l || e.tagName === "OPTION") && (e.value = l), n == null && e.removeAttribute(t);
        return;
    }
    let s = !1;
    if (n === "" || n == null) {
        const l = typeof e[t];
        l === "boolean" ? (n = Bo(n)) : n == null && l === "string" ? ((n = ""), (s = !0)) : l === "number" && ((n = 0), (s = !0));
    }
    try {
        e[t] = n;
    } catch {}
    s && e.removeAttribute(t);
}
const [Vs, Qf] = (() => {
    let e = Date.now,
        t = !1;
    if (typeof window != "undefined") {
        Date.now() > document.createEvent("Event").timeStamp && (e = performance.now.bind(performance));
        const n = navigator.userAgent.match(/firefox\/(\d+)/i);
        t = !!(n && Number(n[1]) <= 53);
    }
    return [e, t];
})();
let hi = 0;
const Jf = Promise.resolve(),
    Zf = () => {
        hi = 0;
    },
    eu = () => hi || (Jf.then(Zf), (hi = Vs()));
function tu(e, t, n, r) {
    e.addEventListener(t, n, r);
}
function nu(e, t, n, r) {
    e.removeEventListener(t, n, r);
}
function ru(e, t, n, r, i = null) {
    const a = e._vei || (e._vei = {}),
        o = a[t];
    if (r && o) o.value = r;
    else {
        const [s, l] = iu(t);
        if (r) {
            const f = (a[t] = au(r, i));
            tu(e, s, f, l);
        } else o && (nu(e, s, o, l), (a[t] = void 0));
    }
}
const qa = /(?:Once|Passive|Capture)$/;
function iu(e) {
    let t;
    if (qa.test(e)) {
        t = {};
        let n;
        for (; (n = e.match(qa)); ) (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
    }
    return [nn(e.slice(2)), t];
}
function au(e, t) {
    const n = (r) => {
        const i = r.timeStamp || Vs();
        (Qf || i >= n.attached - 1) && Ne(ou(r, n.value), t, 5, [r]);
    };
    return (n.value = e), (n.attached = eu()), n;
}
function ou(e, t) {
    if (B(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                n.call(e), (e._stopped = !0);
            }),
            t.map((r) => (i) => !i._stopped && r && r(i))
        );
    } else return t;
}
const Ga = /^on[a-z]/,
    su = (e, t, n, r, i = !1, a, o, s, l) => {
        t === "class"
            ? Kf(e, r, i)
            : t === "style"
            ? Yf(e, n, r)
            : dr(t)
            ? ji(t) || ru(e, t, n, r, o)
            : (t[0] === "." ? ((t = t.slice(1)), !0) : t[0] === "^" ? ((t = t.slice(1)), !1) : lu(e, t, r, i))
            ? Xf(e, t, r, a, o, s, l)
            : (t === "true-value" ? (e._trueValue = r) : t === "false-value" && (e._falseValue = r), Gf(e, t, r, i));
    };
function lu(e, t, n, r) {
    return r
        ? !!(t === "innerHTML" || t === "textContent" || (t in e && Ga.test(t) && K(n)))
        : t === "spellcheck" ||
          t === "draggable" ||
          t === "translate" ||
          t === "form" ||
          (t === "list" && e.tagName === "INPUT") ||
          (t === "type" && e.tagName === "TEXTAREA") ||
          (Ga.test(t) && he(n))
        ? !1
        : t in e;
}
const cu = {
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
Jc.props;
const fu = _e({ patchProp: su }, Wf);
let Xa;
function uu() {
    return Xa || (Xa = Cf(fu));
}
const du = (...e) => {
    const t = uu().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (r) => {
            const i = pu(r);
            if (!i) return;
            const a = t._component;
            !K(a) && !a.render && !a.template && (a.template = i.innerHTML), (i.innerHTML = "");
            const o = n(i, !1, i instanceof SVGElement);
            return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), o;
        }),
        t
    );
};
function pu(e) {
    return he(e) ? document.querySelector(e) : e;
}
function Ws(e, t, n, r) {
    return e.length === 3 ? e(t, n, r) : e(t, n ? `${n}/${r}` : r);
}
function mu(e, t, n, r) {
    return n.reduce((i, a) => ((i[a] = Ws(r, e, t, a)), i), {});
}
function hu(e, t, n, r) {
    const i = {};
    for (let a in n) n.hasOwnProperty(a) && (i[a] = Ws(r, e, t, n[a]));
    return i;
}
function gu(e, t) {
    return Ae(() => {
        const n = e.getters[t];
        return typeof n == "object" ? vr(n) : n;
    });
}
function vu(e, t) {
    return function () {
        return e.dispatch.apply(e, [t, ...arguments]);
    };
}
function Ji(e, t, n, r) {
    return n ? (n instanceof Array ? mu(e, t, n, r) : hu(e, t, n, r)) : {};
}
function Zi() {
    var t;
    const e = Ds();
    if (!e) throw new Error('You must use this function within the "setup()" method, or insert the store as first argument.');
    return (t = e.proxy) == null ? void 0 : t.$store;
}
function bu(e, t) {
    return Ae(() => {
        const n = e.state[t];
        return typeof n == "object" ? vr(n) : n;
    });
}
function yu(e, t) {
    let n = e;
    return arguments.length === 1 && ((t = n), (n = Zi())), Ji(n, null, t, bu);
}
function Ks(e, t) {
    let n = e;
    return arguments.length === 1 && ((t = n), (n = Zi())), Ji(n, null, t, gu);
}
function _u(e, t) {
    let n = e;
    return arguments.length === 1 && ((t = n), (n = Zi())), Ji(n, null, t, vu);
}
var et = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [r, i] of t) n[r] = i;
    return n;
};
const ea = (e) => (Mn("data-v-58d68ab0"), (e = e()), jn(), e),
    wu = { class: "navigation" },
    xu = ea(() => L("div", { class: "nav-element" }, [L("i", { class: "fa-solid fa-circle-info fa-2xl" }), L("p", null, "Overzicht")], -1)),
    ku = { key: 0 },
    Au = ea(() => L("i", { class: "fa-solid fa-circle-check fa-2xl" }, null, -1)),
    Eu = [Au],
    Cu = { key: 1 },
    Ou = ea(() => L("i", { class: "fa-solid fa-magnifying-glass fa-2xl" }, null, -1)),
    Su = [Ou],
    Pu = {
        __name: "Navigation",
        setup(e) {
            const { lastCompletedAssignmentCount: t } = Ks(["lastCompletedAssignmentCount"]);
            return (n, r) => {
                const i = Os("router-link");
                return (
                    me(),
                    xe("div", wu, [
                        be(i, { to: { name: "0" } }, { default: ri(() => [xu]), _: 1 }),
                        (me(),
                        xe(
                            Le,
                            null,
                            df(6, (a) =>
                                be(
                                    i,
                                    { to: { name: `${a}` } },
                                    {
                                        default: ri(() => [
                                            L(
                                                "div",
                                                { class: ur(["nav-element assigment", { completed: Be(t) > a }]) },
                                                [
                                                    Be(t) > a ? (me(), xe("div", ku, Eu)) : (me(), xe("div", Cu, Su)),
                                                    L("p", null, "Opdracht " + qr(a), 1),
                                                ],
                                                2
                                            ),
                                        ]),
                                        _: 2,
                                    },
                                    1032,
                                    ["to"]
                                )
                            ),
                            64
                        )),
                    ])
                );
            };
        },
    };
var Iu = et(Pu, [["__scopeId", "data-v-58d68ab0"]]),
    Tu = "./assets/at5.1165db42.jpg";
const Ru = {},
    Nu = { class: "content" },
    Mu = L("h1", null, "Opdracht 1", -1),
    ju = L("p", null, "Het vinden van een dark store is niet altijd even makkelijk. ", -1),
    Lu = L(
        "p",
        null,
        "Sommigen worden bijvoorbeeld niet getoond op Google maps. Maar dat betekend niet dat je ze met een beetje speurwerk kan vinden. Kijk bijvoorbeeld naar deze foto van een Gorillas vestiging. ",
        -1
    ),
    $u = L(
        "div",
        { class: "question-background" },
        [
            L("h3", { class: "question" }, [L("span", null, "Vraag 1: "), Ve(" Kun je het adres vinden van deze Gorillas vestiging?")]),
            L("img", { src: Tu }),
        ],
        -1
    ),
    zu = [Mu, ju, Lu, $u];
function Fu(e, t) {
    return me(), xe("div", Nu, zu);
}
var Du = et(Ru, [["render", Fu]]),
    Hu = "./assets/nos.945c3d49.jpg";
const Bu = {},
    Uu = { class: "content" },
    Vu = L("h1", null, "Opdracht 2", -1),
    Wu = L("p", null, "Goed bezig met het vinden van de eerste Gorillas vestiging! ", -1),
    Ku = L(
        "p",
        null,
        "AT5 is niet de enige die video's heeft gemaakt over dark stores. de NOS heeft ook een video gemaakt over dark stores waar we deze vestiging van FLINK zien. ",
        -1
    ),
    Yu = L(
        "div",
        { class: "question-background" },
        [
            L("h3", { class: "question" }, [L("span", null, " Vraag 1: "), Ve(" Wat is het adres van deze Flink vestiging?")]),
            L("img", { src: Hu }),
        ],
        -1
    ),
    qu = [Vu, Wu, Ku, Yu];
function Gu(e, t) {
    return me(), xe("div", Uu, qu);
}
var Xu = et(Bu, [["render", Gu]]),
    Qu = "./assets/nos.d32832ff.jpg";
const Ju = {},
    Zu = { class: "content" },
    ed = L("h1", null, "Opdracht 3", -1),
    td = L("p", null, "Ok, vanaf nu gaan we hard de moeilijkheid omhoog schroeven want het is duidelijk dat je er klaar voor bent.", -1),
    nd = L(
        "p",
        null,
        " Denk rustig terug aan de vorige opdracht. Hoe heb je zaken aangepakt en welke informatie heb je gebruikt voor het vinden van het juiste antwoord?",
        -1
    ),
    rd = L(
        "div",
        { class: "question-background" },
        [
            L("h3", { class: "question" }, [L("span", null, "Vraag 1: "), Ve(" Van welke dienst is deze vestiging?")]),
            L("h3", { class: "question" }, [L("span", null, "Vraag 2: "), Ve(" Wat is het adres van deze vestiging?")]),
            L("img", { src: Qu }),
        ],
        -1
    ),
    id = [ed, td, nd, rd];
function ad(e, t) {
    return me(), xe("div", Zu, id);
}
var od = et(Ju, [["render", ad]]),
    sd = "./assets/omroepwest.96e0c3ba.jpg";
const ld = {},
    cd = { class: "content" },
    fd = Fs(
        '<h1>Opdracht 4</h1><p>Dus je bent heel goed in het vinden van locatie op basis van een afbeelding, maar kun je er ook eentje vinden alleen op basis van een beschrijving? </p><p> Onderaan de pagina zie je een citaat uit een artikel van Omroep West, beantwoord de vragen met behulp van deze omschrijving. </p><div class="question-background"><h3 class="question"><span>Vraag 1: </span> In welke stad staat deze Flink vestiging?</h3><h3 class="question"><span>Vraag 2: </span> Wie zijn de buren van Shakshuka?</h3><h3 class="question"><span>Vraag 3: </span> Wat is het oude uitzicht van het restaurant?</h3><img src="' +
            sd +
            '" class="border"></div>',
        4
    ),
    ud = [fd];
function dd(e, t) {
    return me(), xe("div", cd, ud);
}
var pd = et(ld, [["render", dd]]),
    md = "./assets/1.e70379a8.jpg",
    hd = "./assets/2.1c883fbf.jpg",
    gd = "./assets/3.f8f113eb.jpg",
    vd = "./assets/4.bf5a363f.jpg";
const bd = {},
    yd = { class: "content" },
    _d = Fs(
        '<h1 data-v-9bcf5136>Opdracht 5</h1><p data-v-9bcf5136>Wauw! OK, tijd voor wat extra informatie.</p><p data-v-9bcf5136> Sommige foto&#39;s maken het heel lastig om alleen op visuele informatie op te lossen. Bij elke foto die je maakt wordt namelijk niet alleen een afbeelding opgeslagen maar in het bestand wordt ook extra informatie opgeslagen. </p><p data-v-9bcf5136> Veel social media zoals Twitter en Instagram halen deze informatie er af, maar als je bijvoorbeeld een foto van Telegram opgestuurd krijgt, zit deze data er nog wel in. </p><p data-v-9bcf5136>Deze extra informatie kun zien door middel van een <a href="https://jimpl.com/" target="_blank" rel="noopener noreferrer" data-v-9bcf5136>EXIF viewer</a>.</p><p data-v-9bcf5136>Bij elke foto willen we graag weten:</p><div class="question-background" data-v-9bcf5136><h3 class="question" data-v-9bcf5136><span data-v-9bcf5136>Vraag 1: </span> Waar is deze foto gemaakt?</h3><h3 class="question" data-v-9bcf5136><span data-v-9bcf5136>Vraag 2:</span> Wanneer is deze foto gemaakt?</h3><h3 class="question" data-v-9bcf5136><span data-v-9bcf5136>Vraag 3:</span> Welke apparaat heeft deze foto gemaakt?</h3><div class="img-grid" data-v-9bcf5136><img src="' +
            md +
            '" data-v-9bcf5136><img src="' +
            hd +
            '" data-v-9bcf5136><img src="' +
            gd +
            '" data-v-9bcf5136><img src="' +
            vd +
            '" data-v-9bcf5136></div></div>',
        7
    ),
    wd = [_d];
function xd(e, t) {
    return me(), xe("div", yd, wd);
}
var kd = et(bd, [
        ["render", xd],
        ["__scopeId", "data-v-9bcf5136"],
    ]),
    Ad = "./assets/tweet.ae9073f9.jpg";
const Ed = {},
    Ln = (e) => (Mn("data-v-0786c6b0"), (e = e()), jn(), e),
    Cd = { class: "content" },
    Od = Ln(() => L("h1", null, "Opdracht 6", -1)),
    Sd = Ln(() => L("p", null, "Geweldig gedaan!", -1)),
    Pd = Ln(() =>
        L(
            "p",
            null,
            [
                Ve("We hebben helaas geen extra opdrachten meer voor je. Gelukkig zijn OSINT speurtochten populair op Twitter. "),
                L("br"),
                Ve(" Hier is er eentje die je eens zou kunnen proberen."),
            ],
            -1
        )
    ),
    Id = Ln(() =>
        L(
            "p",
            null,
            [
                Ve("Denk je het te weten, bekijk of je het goed hebt via de oorspronkelijke "),
                L(
                    "a",
                    { href: "https://twitter.com/henkvaness/status/1527922194059247616", target: "_blank", rel: "noopener noreferrer" },
                    "Tweet"
                ),
            ],
            -1
        )
    ),
    Td = Ln(() => L("div", { class: "question-background" }, [L("img", { src: Ad })], -1)),
    Rd = [Od, Sd, Pd, Id, Td];
function Nd(e, t) {
    return me(), xe("div", Cd, Rd);
}
var Md = et(Ed, [
    ["render", Nd],
    ["__scopeId", "data-v-0786c6b0"],
]);
const jd = {},
    sn = (e) => (Mn("data-v-4307f7e5"), (e = e()), jn(), e),
    Ld = { class: "home" },
    $d = sn(() => L("h1", null, "Welkom!", -1)),
    zd = sn(() => L("p", null, "Super dat je aansluit bij deze open source intelligence workshop over dark stores!", -1)),
    Fd = sn(() =>
        L("p", null, [Ve("Je vind alle opdrachten bovenin de navigatiebalk. "), L("br"), Ve(" Opdracht 1 staat al klaar voor je.")], -1)
    ),
    Dd = sn(() => L("h2", null, "Heb je een opdracht af? ", -1)),
    Hd = sn(() =>
        L(
            "p",
            null,
            "Laat Marieke het antwoord zien van de opdracht waaraan je hebt gewerkt, zij geeft je het wachtwoord waarmee je de volgende opdracht kan openen.",
            -1
        )
    ),
    Bd = sn(() => L("p", null, "Succes!", -1)),
    Ud = [$d, zd, Fd, Dd, Hd, Bd];
function Vd(e, t) {
    return me(), xe("section", Ld, Ud);
}
var Wd = et(jd, [
    ["render", Vd],
    ["__scopeId", "data-v-4307f7e5"],
]);
const Kd = {},
    Yd = (e) => (Mn("data-v-63c2d9de"), (e = e()), jn(), e),
    qd = Yd(() => L("span", null, "Helaas,", -1)),
    Gd = Ve(" deze pagina kon niet gevonden worden :'("),
    Xd = [qd, Gd];
function Qd(e, t) {
    return me(), xe("h1", null, Xd);
}
var Jd = et(Kd, [
    ["render", Qd],
    ["__scopeId", "data-v-63c2d9de"],
]);
/*!
 * vue-router v4.1.5
 * (c) 2022 Eduardo San Martin Morote
 * @license MIT
 */ const Vt = typeof window != "undefined";
function Zd(e) {
    return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const Z = Object.assign;
function zr(e, t) {
    const n = {};
    for (const r in t) {
        const i = t[r];
        n[r] = We(i) ? i.map(e) : e(i);
    }
    return n;
}
const xn = () => {},
    We = Array.isArray,
    ep = /\/$/,
    tp = (e) => e.replace(ep, "");
function Fr(e, t, n = "/") {
    let r,
        i = {},
        a = "",
        o = "";
    const s = t.indexOf("#");
    let l = t.indexOf("?");
    return (
        s < l && s >= 0 && (l = -1),
        l > -1 && ((r = t.slice(0, l)), (a = t.slice(l + 1, s > -1 ? s : t.length)), (i = e(a))),
        s > -1 && ((r = r || t.slice(0, s)), (o = t.slice(s, t.length))),
        (r = ap(r != null ? r : t, n)),
        { fullPath: r + (a && "?") + a + o, path: r, query: i, hash: o }
    );
}
function np(e, t) {
    const n = t.query ? e(t.query) : "";
    return t.path + (n && "?") + n + (t.hash || "");
}
function Qa(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function rp(e, t, n) {
    const r = t.matched.length - 1,
        i = n.matched.length - 1;
    return r > -1 && r === i && en(t.matched[r], n.matched[i]) && Ys(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function en(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
}
function Ys(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!ip(e[n], t[n])) return !1;
    return !0;
}
function ip(e, t) {
    return We(e) ? Ja(e, t) : We(t) ? Ja(t, e) : e === t;
}
function Ja(e, t) {
    return We(t) ? e.length === t.length && e.every((n, r) => n === t[r]) : e.length === 1 && e[0] === t;
}
function ap(e, t) {
    if (e.startsWith("/")) return e;
    if (!e) return t;
    const n = t.split("/"),
        r = e.split("/");
    let i = n.length - 1,
        a,
        o;
    for (a = 0; a < r.length; a++)
        if (((o = r[a]), o !== "."))
            if (o === "..") i > 1 && i--;
            else break;
    return n.slice(0, i).join("/") + "/" + r.slice(a - (a === r.length ? 1 : 0)).join("/");
}
var Rn;
(function (e) {
    (e.pop = "pop"), (e.push = "push");
})(Rn || (Rn = {}));
var kn;
(function (e) {
    (e.back = "back"), (e.forward = "forward"), (e.unknown = "");
})(kn || (kn = {}));
function op(e) {
    if (!e)
        if (Vt) {
            const t = document.querySelector("base");
            (e = (t && t.getAttribute("href")) || "/"), (e = e.replace(/^\w+:\/\/[^\/]+/, ""));
        } else e = "/";
    return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), tp(e);
}
const sp = /^[^#]+#/;
function lp(e, t) {
    return e.replace(sp, "#") + t;
}
function cp(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
        r = e.getBoundingClientRect();
    return { behavior: t.behavior, left: r.left - n.left - (t.left || 0), top: r.top - n.top - (t.top || 0) };
}
const Er = () => ({ left: window.pageXOffset, top: window.pageYOffset });
function fp(e) {
    let t;
    if ("el" in e) {
        const n = e.el,
            r = typeof n == "string" && n.startsWith("#"),
            i = typeof n == "string" ? (r ? document.getElementById(n.slice(1)) : document.querySelector(n)) : n;
        if (!i) return;
        t = cp(i, e);
    } else t = e;
    "scrollBehavior" in document.documentElement.style
        ? window.scrollTo(t)
        : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function Za(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
}
const gi = new Map();
function up(e, t) {
    gi.set(e, t);
}
function dp(e) {
    const t = gi.get(e);
    return gi.delete(e), t;
}
let pp = () => location.protocol + "//" + location.host;
function qs(e, t) {
    const { pathname: n, search: r, hash: i } = t,
        a = e.indexOf("#");
    if (a > -1) {
        let s = i.includes(e.slice(a)) ? e.slice(a).length : 1,
            l = i.slice(s);
        return l[0] !== "/" && (l = "/" + l), Qa(l, "");
    }
    return Qa(n, e) + r + i;
}
function mp(e, t, n, r) {
    let i = [],
        a = [],
        o = null;
    const s = ({ state: p }) => {
        const h = qs(e, location),
            k = n.value,
            P = t.value;
        let S = 0;
        if (p) {
            if (((n.value = h), (t.value = p), o && o === k)) {
                o = null;
                return;
            }
            S = P ? p.position - P.position : 0;
        } else r(h);
        i.forEach((v) => {
            v(n.value, k, { delta: S, type: Rn.pop, direction: S ? (S > 0 ? kn.forward : kn.back) : kn.unknown });
        });
    };
    function l() {
        o = n.value;
    }
    function f(p) {
        i.push(p);
        const h = () => {
            const k = i.indexOf(p);
            k > -1 && i.splice(k, 1);
        };
        return a.push(h), h;
    }
    function c() {
        const { history: p } = window;
        !p.state || p.replaceState(Z({}, p.state, { scroll: Er() }), "");
    }
    function u() {
        for (const p of a) p();
        (a = []), window.removeEventListener("popstate", s), window.removeEventListener("beforeunload", c);
    }
    return window.addEventListener("popstate", s), window.addEventListener("beforeunload", c), { pauseListeners: l, listen: f, destroy: u };
}
function eo(e, t, n, r = !1, i = !1) {
    return { back: e, current: t, forward: n, replaced: r, position: window.history.length, scroll: i ? Er() : null };
}
function hp(e) {
    const { history: t, location: n } = window,
        r = { value: qs(e, n) },
        i = { value: t.state };
    i.value || a(r.value, { back: null, current: r.value, forward: null, position: t.length - 1, replaced: !0, scroll: null }, !0);
    function a(l, f, c) {
        const u = e.indexOf("#"),
            p = u > -1 ? (n.host && document.querySelector("base") ? e : e.slice(u)) + l : pp() + e + l;
        try {
            t[c ? "replaceState" : "pushState"](f, "", p), (i.value = f);
        } catch (h) {
            console.error(h), n[c ? "replace" : "assign"](p);
        }
    }
    function o(l, f) {
        const c = Z({}, t.state, eo(i.value.back, l, i.value.forward, !0), f, { position: i.value.position });
        a(l, c, !0), (r.value = l);
    }
    function s(l, f) {
        const c = Z({}, i.value, t.state, { forward: l, scroll: Er() });
        a(c.current, c, !0);
        const u = Z({}, eo(r.value, l, null), { position: c.position + 1 }, f);
        a(l, u, !1), (r.value = l);
    }
    return { location: r, state: i, push: s, replace: o };
}
function gp(e) {
    e = op(e);
    const t = hp(e),
        n = mp(e, t.state, t.location, t.replace);
    function r(a, o = !0) {
        o || n.pauseListeners(), history.go(a);
    }
    const i = Z({ location: "", base: e, go: r, createHref: lp.bind(null, e) }, t, n);
    return (
        Object.defineProperty(i, "location", { enumerable: !0, get: () => t.location.value }),
        Object.defineProperty(i, "state", { enumerable: !0, get: () => t.state.value }),
        i
    );
}
function vp(e) {
    return (e = location.host ? e || location.pathname + location.search : ""), e.includes("#") || (e += "#"), gp(e);
}
function bp(e) {
    return typeof e == "string" || (e && typeof e == "object");
}
function Gs(e) {
    return typeof e == "string" || typeof e == "symbol";
}
const dt = { path: "/", name: void 0, params: {}, query: {}, hash: "", fullPath: "/", matched: [], meta: {}, redirectedFrom: void 0 },
    Xs = Symbol("");
var to;
(function (e) {
    (e[(e.aborted = 4)] = "aborted"), (e[(e.cancelled = 8)] = "cancelled"), (e[(e.duplicated = 16)] = "duplicated");
})(to || (to = {}));
function tn(e, t) {
    return Z(new Error(), { type: e, [Xs]: !0 }, t);
}
function nt(e, t) {
    return e instanceof Error && Xs in e && (t == null || !!(e.type & t));
}
const no = "[^/]+?",
    yp = { sensitive: !1, strict: !1, start: !0, end: !0 },
    _p = /[.+*?^${}()[\]/\\]/g;
function wp(e, t) {
    const n = Z({}, yp, t),
        r = [];
    let i = n.start ? "^" : "";
    const a = [];
    for (const f of e) {
        const c = f.length ? [] : [90];
        n.strict && !f.length && (i += "/");
        for (let u = 0; u < f.length; u++) {
            const p = f[u];
            let h = 40 + (n.sensitive ? 0.25 : 0);
            if (p.type === 0) u || (i += "/"), (i += p.value.replace(_p, "\\$&")), (h += 40);
            else if (p.type === 1) {
                const { value: k, repeatable: P, optional: S, regexp: v } = p;
                a.push({ name: k, repeatable: P, optional: S });
                const w = v || no;
                if (w !== no) {
                    h += 10;
                    try {
                        new RegExp(`(${w})`);
                    } catch (D) {
                        throw new Error(`Invalid custom RegExp for param "${k}" (${w}): ` + D.message);
                    }
                }
                let R = P ? `((?:${w})(?:/(?:${w}))*)` : `(${w})`;
                u || (R = S && f.length < 2 ? `(?:/${R})` : "/" + R),
                    S && (R += "?"),
                    (i += R),
                    (h += 20),
                    S && (h += -8),
                    P && (h += -20),
                    w === ".*" && (h += -50);
            }
            c.push(h);
        }
        r.push(c);
    }
    if (n.strict && n.end) {
        const f = r.length - 1;
        r[f][r[f].length - 1] += 0.7000000000000001;
    }
    n.strict || (i += "/?"), n.end ? (i += "$") : n.strict && (i += "(?:/|$)");
    const o = new RegExp(i, n.sensitive ? "" : "i");
    function s(f) {
        const c = f.match(o),
            u = {};
        if (!c) return null;
        for (let p = 1; p < c.length; p++) {
            const h = c[p] || "",
                k = a[p - 1];
            u[k.name] = h && k.repeatable ? h.split("/") : h;
        }
        return u;
    }
    function l(f) {
        let c = "",
            u = !1;
        for (const p of e) {
            (!u || !c.endsWith("/")) && (c += "/"), (u = !1);
            for (const h of p)
                if (h.type === 0) c += h.value;
                else if (h.type === 1) {
                    const { value: k, repeatable: P, optional: S } = h,
                        v = k in f ? f[k] : "";
                    if (We(v) && !P) throw new Error(`Provided param "${k}" is an array but it is not repeatable (* or + modifiers)`);
                    const w = We(v) ? v.join("/") : v;
                    if (!w)
                        if (S) p.length < 2 && (c.endsWith("/") ? (c = c.slice(0, -1)) : (u = !0));
                        else throw new Error(`Missing required param "${k}"`);
                    c += w;
                }
        }
        return c || "/";
    }
    return { re: o, score: r, keys: a, parse: s, stringify: l };
}
function xp(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length; ) {
        const r = t[n] - e[n];
        if (r) return r;
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
function kp(e, t) {
    let n = 0;
    const r = e.score,
        i = t.score;
    for (; n < r.length && n < i.length; ) {
        const a = xp(r[n], i[n]);
        if (a) return a;
        n++;
    }
    if (Math.abs(i.length - r.length) === 1) {
        if (ro(r)) return 1;
        if (ro(i)) return -1;
    }
    return i.length - r.length;
}
function ro(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
}
const Ap = { type: 0, value: "" },
    Ep = /[a-zA-Z0-9_]/;
function Cp(e) {
    if (!e) return [[]];
    if (e === "/") return [[Ap]];
    if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
    function t(h) {
        throw new Error(`ERR (${n})/"${f}": ${h}`);
    }
    let n = 0,
        r = n;
    const i = [];
    let a;
    function o() {
        a && i.push(a), (a = []);
    }
    let s = 0,
        l,
        f = "",
        c = "";
    function u() {
        !f ||
            (n === 0
                ? a.push({ type: 0, value: f })
                : n === 1 || n === 2 || n === 3
                ? (a.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`),
                  a.push({ type: 1, value: f, regexp: c, repeatable: l === "*" || l === "+", optional: l === "*" || l === "?" }))
                : t("Invalid state to consume buffer"),
            (f = ""));
    }
    function p() {
        f += l;
    }
    for (; s < e.length; ) {
        if (((l = e[s++]), l === "\\" && n !== 2)) {
            (r = n), (n = 4);
            continue;
        }
        switch (n) {
            case 0:
                l === "/" ? (f && u(), o()) : l === ":" ? (u(), (n = 1)) : p();
                break;
            case 4:
                p(), (n = r);
                break;
            case 1:
                l === "(" ? (n = 2) : Ep.test(l) ? p() : (u(), (n = 0), l !== "*" && l !== "?" && l !== "+" && s--);
                break;
            case 2:
                l === ")" ? (c[c.length - 1] == "\\" ? (c = c.slice(0, -1) + l) : (n = 3)) : (c += l);
                break;
            case 3:
                u(), (n = 0), l !== "*" && l !== "?" && l !== "+" && s--, (c = "");
                break;
            default:
                t("Unknown state");
                break;
        }
    }
    return n === 2 && t(`Unfinished custom RegExp for param "${f}"`), u(), o(), i;
}
function Op(e, t, n) {
    const r = wp(Cp(e.path), n),
        i = Z(r, { record: e, parent: t, children: [], alias: [] });
    return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i;
}
function Sp(e, t) {
    const n = [],
        r = new Map();
    t = oo({ strict: !1, end: !0, sensitive: !1 }, t);
    function i(c) {
        return r.get(c);
    }
    function a(c, u, p) {
        const h = !p,
            k = Pp(c);
        k.aliasOf = p && p.record;
        const P = oo(t, c),
            S = [k];
        if ("alias" in c) {
            const R = typeof c.alias == "string" ? [c.alias] : c.alias;
            for (const D of R) S.push(Z({}, k, { components: p ? p.record.components : k.components, path: D, aliasOf: p ? p.record : k }));
        }
        let v, w;
        for (const R of S) {
            const { path: D } = R;
            if (u && D[0] !== "/") {
                const U = u.record.path,
                    ee = U[U.length - 1] === "/" ? "" : "/";
                R.path = u.record.path + (D && ee + D);
            }
            if (
                ((v = Op(R, u, P)),
                p ? p.alias.push(v) : ((w = w || v), w !== v && w.alias.push(v), h && c.name && !ao(v) && o(c.name)),
                k.children)
            ) {
                const U = k.children;
                for (let ee = 0; ee < U.length; ee++) a(U[ee], v, p && p.children[ee]);
            }
            (p = p || v), l(v);
        }
        return w
            ? () => {
                  o(w);
              }
            : xn;
    }
    function o(c) {
        if (Gs(c)) {
            const u = r.get(c);
            u && (r.delete(c), n.splice(n.indexOf(u), 1), u.children.forEach(o), u.alias.forEach(o));
        } else {
            const u = n.indexOf(c);
            u > -1 && (n.splice(u, 1), c.record.name && r.delete(c.record.name), c.children.forEach(o), c.alias.forEach(o));
        }
    }
    function s() {
        return n;
    }
    function l(c) {
        let u = 0;
        for (; u < n.length && kp(c, n[u]) >= 0 && (c.record.path !== n[u].record.path || !Qs(c, n[u])); ) u++;
        n.splice(u, 0, c), c.record.name && !ao(c) && r.set(c.record.name, c);
    }
    function f(c, u) {
        let p,
            h = {},
            k,
            P;
        if ("name" in c && c.name) {
            if (((p = r.get(c.name)), !p)) throw tn(1, { location: c });
            (P = p.record.name),
                (h = Z(
                    io(
                        u.params,
                        p.keys.filter((w) => !w.optional).map((w) => w.name)
                    ),
                    c.params &&
                        io(
                            c.params,
                            p.keys.map((w) => w.name)
                        )
                )),
                (k = p.stringify(h));
        } else if ("path" in c) (k = c.path), (p = n.find((w) => w.re.test(k))), p && ((h = p.parse(k)), (P = p.record.name));
        else {
            if (((p = u.name ? r.get(u.name) : n.find((w) => w.re.test(u.path))), !p)) throw tn(1, { location: c, currentLocation: u });
            (P = p.record.name), (h = Z({}, u.params, c.params)), (k = p.stringify(h));
        }
        const S = [];
        let v = p;
        for (; v; ) S.unshift(v.record), (v = v.parent);
        return { name: P, path: k, params: h, matched: S, meta: Tp(S) };
    }
    return e.forEach((c) => a(c)), { addRoute: a, resolve: f, removeRoute: o, getRoutes: s, getRecordMatcher: i };
}
function io(e, t) {
    const n = {};
    for (const r of t) r in e && (n[r] = e[r]);
    return n;
}
function Pp(e) {
    return {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: void 0,
        beforeEnter: e.beforeEnter,
        props: Ip(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set(),
        updateGuards: new Set(),
        enterCallbacks: {},
        components: "components" in e ? e.components || null : e.component && { default: e.component },
    };
}
function Ip(e) {
    const t = {},
        n = e.props || !1;
    if ("component" in e) t.default = n;
    else for (const r in e.components) t[r] = typeof n == "boolean" ? n : n[r];
    return t;
}
function ao(e) {
    for (; e; ) {
        if (e.record.aliasOf) return !0;
        e = e.parent;
    }
    return !1;
}
function Tp(e) {
    return e.reduce((t, n) => Z(t, n.meta), {});
}
function oo(e, t) {
    const n = {};
    for (const r in e) n[r] = r in t ? t[r] : e[r];
    return n;
}
function Qs(e, t) {
    return t.children.some((n) => n === e || Qs(e, n));
}
const Js = /#/g,
    Rp = /&/g,
    Np = /\//g,
    Mp = /=/g,
    jp = /\?/g,
    Zs = /\+/g,
    Lp = /%5B/g,
    $p = /%5D/g,
    el = /%5E/g,
    zp = /%60/g,
    tl = /%7B/g,
    Fp = /%7C/g,
    nl = /%7D/g,
    Dp = /%20/g;
function ta(e) {
    return encodeURI("" + e)
        .replace(Fp, "|")
        .replace(Lp, "[")
        .replace($p, "]");
}
function Hp(e) {
    return ta(e).replace(tl, "{").replace(nl, "}").replace(el, "^");
}
function vi(e) {
    return ta(e)
        .replace(Zs, "%2B")
        .replace(Dp, "+")
        .replace(Js, "%23")
        .replace(Rp, "%26")
        .replace(zp, "`")
        .replace(tl, "{")
        .replace(nl, "}")
        .replace(el, "^");
}
function Bp(e) {
    return vi(e).replace(Mp, "%3D");
}
function Up(e) {
    return ta(e).replace(Js, "%23").replace(jp, "%3F");
}
function Vp(e) {
    return e == null ? "" : Up(e).replace(Np, "%2F");
}
function ir(e) {
    try {
        return decodeURIComponent("" + e);
    } catch {}
    return "" + e;
}
function Wp(e) {
    const t = {};
    if (e === "" || e === "?") return t;
    const r = (e[0] === "?" ? e.slice(1) : e).split("&");
    for (let i = 0; i < r.length; ++i) {
        const a = r[i].replace(Zs, " "),
            o = a.indexOf("="),
            s = ir(o < 0 ? a : a.slice(0, o)),
            l = o < 0 ? null : ir(a.slice(o + 1));
        if (s in t) {
            let f = t[s];
            We(f) || (f = t[s] = [f]), f.push(l);
        } else t[s] = l;
    }
    return t;
}
function so(e) {
    let t = "";
    for (let n in e) {
        const r = e[n];
        if (((n = Bp(n)), r == null)) {
            r !== void 0 && (t += (t.length ? "&" : "") + n);
            continue;
        }
        (We(r) ? r.map((a) => a && vi(a)) : [r && vi(r)]).forEach((a) => {
            a !== void 0 && ((t += (t.length ? "&" : "") + n), a != null && (t += "=" + a));
        });
    }
    return t;
}
function Kp(e) {
    const t = {};
    for (const n in e) {
        const r = e[n];
        r !== void 0 && (t[n] = We(r) ? r.map((i) => (i == null ? null : "" + i)) : r == null ? r : "" + r);
    }
    return t;
}
const Yp = Symbol(""),
    lo = Symbol(""),
    na = Symbol(""),
    rl = Symbol(""),
    bi = Symbol("");
function pn() {
    let e = [];
    function t(r) {
        return (
            e.push(r),
            () => {
                const i = e.indexOf(r);
                i > -1 && e.splice(i, 1);
            }
        );
    }
    function n() {
        e = [];
    }
    return { add: t, list: () => e, reset: n };
}
function gt(e, t, n, r, i) {
    const a = r && (r.enterCallbacks[i] = r.enterCallbacks[i] || []);
    return () =>
        new Promise((o, s) => {
            const l = (u) => {
                    u === !1
                        ? s(tn(4, { from: n, to: t }))
                        : u instanceof Error
                        ? s(u)
                        : bp(u)
                        ? s(tn(2, { from: t, to: u }))
                        : (a && r.enterCallbacks[i] === a && typeof u == "function" && a.push(u), o());
                },
                f = e.call(r && r.instances[i], t, n, l);
            let c = Promise.resolve(f);
            e.length < 3 && (c = c.then(l)), c.catch((u) => s(u));
        });
}
function Dr(e, t, n, r) {
    const i = [];
    for (const a of e)
        for (const o in a.components) {
            let s = a.components[o];
            if (!(t !== "beforeRouteEnter" && !a.instances[o]))
                if (qp(s)) {
                    const f = (s.__vccOpts || s)[t];
                    f && i.push(gt(f, n, r, a, o));
                } else {
                    let l = s();
                    i.push(() =>
                        l.then((f) => {
                            if (!f) return Promise.reject(new Error(`Couldn't resolve component "${o}" at "${a.path}"`));
                            const c = Zd(f) ? f.default : f;
                            a.components[o] = c;
                            const p = (c.__vccOpts || c)[t];
                            return p && gt(p, n, r, a, o)();
                        })
                    );
                }
        }
    return i;
}
function qp(e) {
    return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function co(e) {
    const t = yt(na),
        n = yt(rl),
        r = Ae(() => t.resolve(Be(e.to))),
        i = Ae(() => {
            const { matched: l } = r.value,
                { length: f } = l,
                c = l[f - 1],
                u = n.matched;
            if (!c || !u.length) return -1;
            const p = u.findIndex(en.bind(null, c));
            if (p > -1) return p;
            const h = fo(l[f - 2]);
            return f > 1 && fo(c) === h && u[u.length - 1].path !== h ? u.findIndex(en.bind(null, l[f - 2])) : p;
        }),
        a = Ae(() => i.value > -1 && Jp(n.params, r.value.params)),
        o = Ae(() => i.value > -1 && i.value === n.matched.length - 1 && Ys(n.params, r.value.params));
    function s(l = {}) {
        return Qp(l) ? t[Be(e.replace) ? "replace" : "push"](Be(e.to)).catch(xn) : Promise.resolve();
    }
    return { route: r, href: Ae(() => r.value.href), isActive: a, isExactActive: o, navigate: s };
}
const Gp = xs({
        name: "RouterLink",
        compatConfig: { MODE: 3 },
        props: {
            to: { type: [String, Object], required: !0 },
            replace: Boolean,
            activeClass: String,
            exactActiveClass: String,
            custom: Boolean,
            ariaCurrentValue: { type: String, default: "page" },
        },
        useLink: co,
        setup(e, { slots: t }) {
            const n = on(co(e)),
                { options: r } = yt(na),
                i = Ae(() => ({
                    [uo(e.activeClass, r.linkActiveClass, "router-link-active")]: n.isActive,
                    [uo(e.exactActiveClass, r.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive,
                }));
            return () => {
                const a = t.default && t.default(n);
                return e.custom
                    ? a
                    : Us(
                          "a",
                          {
                              "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                              href: n.href,
                              onClick: n.navigate,
                              class: i.value,
                          },
                          a
                      );
            };
        },
    }),
    Xp = Gp;
function Qp(e) {
    if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute("target");
            if (/\b_blank\b/i.test(t)) return;
        }
        return e.preventDefault && e.preventDefault(), !0;
    }
}
function Jp(e, t) {
    for (const n in t) {
        const r = t[n],
            i = e[n];
        if (typeof r == "string") {
            if (r !== i) return !1;
        } else if (!We(i) || i.length !== r.length || r.some((a, o) => a !== i[o])) return !1;
    }
    return !0;
}
function fo(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const uo = (e, t, n) => (e != null ? e : t != null ? t : n),
    Zp = xs({
        name: "RouterView",
        inheritAttrs: !1,
        props: { name: { type: String, default: "default" }, route: Object },
        compatConfig: { MODE: 3 },
        setup(e, { attrs: t, slots: n }) {
            const r = yt(bi),
                i = Ae(() => e.route || r.value),
                a = yt(lo, 0),
                o = Ae(() => {
                    let f = Be(a);
                    const { matched: c } = i.value;
                    let u;
                    for (; (u = c[f]) && !u.components; ) f++;
                    return f;
                }),
                s = Ae(() => i.value.matched[o.value]);
            Wn(
                lo,
                Ae(() => o.value + 1)
            ),
                Wn(Yp, s),
                Wn(bi, i);
            const l = ei();
            return (
                Qt(
                    () => [l.value, s.value, e.name],
                    ([f, c, u], [p, h, k]) => {
                        c &&
                            ((c.instances[u] = f),
                            h &&
                                h !== c &&
                                f &&
                                f === p &&
                                (c.leaveGuards.size || (c.leaveGuards = h.leaveGuards),
                                c.updateGuards.size || (c.updateGuards = h.updateGuards))),
                            f && c && (!h || !en(c, h) || !p) && (c.enterCallbacks[u] || []).forEach((P) => P(f));
                    },
                    { flush: "post" }
                ),
                () => {
                    const f = i.value,
                        c = e.name,
                        u = s.value,
                        p = u && u.components[c];
                    if (!p) return po(n.default, { Component: p, route: f });
                    const h = u.props[c],
                        k = h ? (h === !0 ? f.params : typeof h == "function" ? h(f) : h) : null,
                        S = Us(
                            p,
                            Z({}, k, t, {
                                onVnodeUnmounted: (v) => {
                                    v.component.isUnmounted && (u.instances[c] = null);
                                },
                                ref: l,
                            })
                        );
                    return po(n.default, { Component: S, route: f }) || S;
                }
            );
        },
    });
function po(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
}
const em = Zp;
function tm(e) {
    const t = Sp(e.routes, e),
        n = e.parseQuery || Wp,
        r = e.stringifyQuery || so,
        i = e.history,
        a = pn(),
        o = pn(),
        s = pn(),
        l = Rc(dt);
    let f = dt;
    Vt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
    const c = zr.bind(null, (b) => "" + b),
        u = zr.bind(null, Vp),
        p = zr.bind(null, ir);
    function h(b, M) {
        let O, j;
        return Gs(b) ? ((O = t.getRecordMatcher(b)), (j = M)) : (j = b), t.addRoute(j, O);
    }
    function k(b) {
        const M = t.getRecordMatcher(b);
        M && t.removeRoute(M);
    }
    function P() {
        return t.getRoutes().map((b) => b.record);
    }
    function S(b) {
        return !!t.getRecordMatcher(b);
    }
    function v(b, M) {
        if (((M = Z({}, M || l.value)), typeof b == "string")) {
            const V = Fr(n, b, M.path),
                d = t.resolve({ path: V.path }, M),
                m = i.createHref(V.fullPath);
            return Z(V, d, { params: p(d.params), hash: ir(V.hash), redirectedFrom: void 0, href: m });
        }
        let O;
        if ("path" in b) O = Z({}, b, { path: Fr(n, b.path, M.path).path });
        else {
            const V = Z({}, b.params);
            for (const d in V) V[d] == null && delete V[d];
            (O = Z({}, b, { params: u(b.params) })), (M.params = u(M.params));
        }
        const j = t.resolve(O, M),
            J = b.hash || "";
        j.params = c(p(j.params));
        const ae = np(r, Z({}, b, { hash: Hp(J), path: j.path })),
            Y = i.createHref(ae);
        return Z({ fullPath: ae, hash: J, query: r === so ? Kp(b.query) : b.query || {} }, j, { redirectedFrom: void 0, href: Y });
    }
    function w(b) {
        return typeof b == "string" ? Fr(n, b, l.value.path) : Z({}, b);
    }
    function R(b, M) {
        if (f !== b) return tn(8, { from: M, to: b });
    }
    function D(b) {
        return ce(b);
    }
    function U(b) {
        return D(Z(w(b), { replace: !0 }));
    }
    function ee(b) {
        const M = b.matched[b.matched.length - 1];
        if (M && M.redirect) {
            const { redirect: O } = M;
            let j = typeof O == "function" ? O(b) : O;
            return (
                typeof j == "string" && ((j = j.includes("?") || j.includes("#") ? (j = w(j)) : { path: j }), (j.params = {})),
                Z({ query: b.query, hash: b.hash, params: "path" in j ? {} : b.params }, j)
            );
        }
    }
    function ce(b, M) {
        const O = (f = v(b)),
            j = l.value,
            J = b.state,
            ae = b.force,
            Y = b.replace === !0,
            V = ee(O);
        if (V) return ce(Z(w(V), { state: typeof V == "object" ? Z({}, J, V.state) : J, force: ae, replace: Y }), M || O);
        const d = O;
        d.redirectedFrom = M;
        let m;
        return (
            !ae && rp(r, j, O) && ((m = tn(16, { to: d, from: j })), $t(j, j, !0, !1)),
            (m ? Promise.resolve(m) : X(d, j))
                .catch((g) => (nt(g) ? (nt(g, 2) ? g : Ce(g)) : ie(g, d, j)))
                .then((g) => {
                    if (g) {
                        if (nt(g, 2))
                            return ce(
                                Z({ replace: Y }, w(g.to), { state: typeof g.to == "object" ? Z({}, J, g.to.state) : J, force: ae }),
                                M || d
                            );
                    } else g = ge(d, j, !0, Y, J);
                    return fe(d, j, g), g;
                })
        );
    }
    function W(b, M) {
        const O = R(b, M);
        return O ? Promise.reject(O) : Promise.resolve();
    }
    function X(b, M) {
        let O;
        const [j, J, ae] = nm(b, M);
        O = Dr(j.reverse(), "beforeRouteLeave", b, M);
        for (const V of j)
            V.leaveGuards.forEach((d) => {
                O.push(gt(d, b, M));
            });
        const Y = W.bind(null, b, M);
        return (
            O.push(Y),
            Ft(O)
                .then(() => {
                    O = [];
                    for (const V of a.list()) O.push(gt(V, b, M));
                    return O.push(Y), Ft(O);
                })
                .then(() => {
                    O = Dr(J, "beforeRouteUpdate", b, M);
                    for (const V of J)
                        V.updateGuards.forEach((d) => {
                            O.push(gt(d, b, M));
                        });
                    return O.push(Y), Ft(O);
                })
                .then(() => {
                    O = [];
                    for (const V of b.matched)
                        if (V.beforeEnter && !M.matched.includes(V))
                            if (We(V.beforeEnter)) for (const d of V.beforeEnter) O.push(gt(d, b, M));
                            else O.push(gt(V.beforeEnter, b, M));
                    return O.push(Y), Ft(O);
                })
                .then(() => (b.matched.forEach((V) => (V.enterCallbacks = {})), (O = Dr(ae, "beforeRouteEnter", b, M)), O.push(Y), Ft(O)))
                .then(() => {
                    O = [];
                    for (const V of o.list()) O.push(gt(V, b, M));
                    return O.push(Y), Ft(O);
                })
                .catch((V) => (nt(V, 8) ? V : Promise.reject(V)))
        );
    }
    function fe(b, M, O) {
        for (const j of s.list()) j(b, M, O);
    }
    function ge(b, M, O, j, J) {
        const ae = R(b, M);
        if (ae) return ae;
        const Y = M === dt,
            V = Vt ? history.state : {};
        O && (j || Y ? i.replace(b.fullPath, Z({ scroll: Y && V && V.scroll }, J)) : i.push(b.fullPath, J)),
            (l.value = b),
            $t(b, M, O, Y),
            Ce();
    }
    let ve;
    function Me() {
        ve ||
            (ve = i.listen((b, M, O) => {
                if (!un.listening) return;
                const j = v(b),
                    J = ee(j);
                if (J) {
                    ce(Z(J, { replace: !0 }), j).catch(xn);
                    return;
                }
                f = j;
                const ae = l.value;
                Vt && up(Za(ae.fullPath, O.delta), Er()),
                    X(j, ae)
                        .catch((Y) =>
                            nt(Y, 12)
                                ? Y
                                : nt(Y, 2)
                                ? (ce(Y.to, j)
                                      .then((V) => {
                                          nt(V, 20) && !O.delta && O.type === Rn.pop && i.go(-1, !1);
                                      })
                                      .catch(xn),
                                  Promise.reject())
                                : (O.delta && i.go(-O.delta, !1), ie(Y, j, ae))
                        )
                        .then((Y) => {
                            (Y = Y || ge(j, ae, !1)),
                                Y && (O.delta && !nt(Y, 8) ? i.go(-O.delta, !1) : O.type === Rn.pop && nt(Y, 20) && i.go(-1, !1)),
                                fe(j, ae, Y);
                        })
                        .catch(xn);
            }));
    }
    let ft = pn(),
        Lt = pn(),
        ue;
    function ie(b, M, O) {
        Ce(b);
        const j = Lt.list();
        return j.length ? j.forEach((J) => J(b, M, O)) : console.error(b), Promise.reject(b);
    }
    function te() {
        return ue && l.value !== dt
            ? Promise.resolve()
            : new Promise((b, M) => {
                  ft.add([b, M]);
              });
    }
    function Ce(b) {
        return ue || ((ue = !b), Me(), ft.list().forEach(([M, O]) => (b ? O(b) : M())), ft.reset()), b;
    }
    function $t(b, M, O, j) {
        const { scrollBehavior: J } = e;
        if (!Vt || !J) return Promise.resolve();
        const ae = (!O && dp(Za(b.fullPath, 0))) || ((j || !O) && history.state && history.state.scroll) || null;
        return us()
            .then(() => J(b, M, ae))
            .then((Y) => Y && fp(Y))
            .catch((Y) => ie(Y, b, M));
    }
    const tt = (b) => i.go(b);
    let Ye;
    const Te = new Set(),
        un = {
            currentRoute: l,
            listening: !0,
            addRoute: h,
            removeRoute: k,
            hasRoute: S,
            getRoutes: P,
            resolve: v,
            options: e,
            push: D,
            replace: U,
            go: tt,
            back: () => tt(-1),
            forward: () => tt(1),
            beforeEach: a.add,
            beforeResolve: o.add,
            afterEach: s.add,
            onError: Lt.add,
            isReady: te,
            install(b) {
                const M = this;
                b.component("RouterLink", Xp),
                    b.component("RouterView", em),
                    (b.config.globalProperties.$router = M),
                    Object.defineProperty(b.config.globalProperties, "$route", { enumerable: !0, get: () => Be(l) }),
                    Vt && !Ye && l.value === dt && ((Ye = !0), D(i.location).catch((J) => {}));
                const O = {};
                for (const J in dt) O[J] = Ae(() => l.value[J]);
                b.provide(na, M), b.provide(rl, on(O)), b.provide(bi, l);
                const j = b.unmount;
                Te.add(b),
                    (b.unmount = function () {
                        Te.delete(b), Te.size < 1 && ((f = dt), ve && ve(), (ve = null), (l.value = dt), (Ye = !1), (ue = !1)), j();
                    });
            },
        };
    return un;
}
function Ft(e) {
    return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function nm(e, t) {
    const n = [],
        r = [],
        i = [],
        a = Math.max(t.matched.length, e.matched.length);
    for (let o = 0; o < a; o++) {
        const s = t.matched[o];
        s && (e.matched.find((f) => en(f, s)) ? r.push(s) : n.push(s));
        const l = e.matched[o];
        l && (t.matched.find((f) => en(f, l)) || i.push(l));
    }
    return [n, r, i];
}
function rm() {
    return il().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function il() {
    return typeof navigator != "undefined" && typeof window != "undefined" ? window : typeof global != "undefined" ? global : {};
}
const im = typeof Proxy == "function",
    am = "devtools-plugin:setup",
    om = "plugin:settings:set";
let Dt, yi;
function sm() {
    var e;
    return (
        Dt !== void 0 ||
            (typeof window != "undefined" && window.performance
                ? ((Dt = !0), (yi = window.performance))
                : typeof global != "undefined" && ((e = global.perf_hooks) === null || e === void 0 ? void 0 : e.performance)
                ? ((Dt = !0), (yi = global.perf_hooks.performance))
                : (Dt = !1)),
        Dt
    );
}
function lm() {
    return sm() ? yi.now() : Date.now();
}
class cm {
    constructor(t, n) {
        (this.target = null), (this.targetQueue = []), (this.onQueue = []), (this.plugin = t), (this.hook = n);
        const r = {};
        if (t.settings)
            for (const o in t.settings) {
                const s = t.settings[o];
                r[o] = s.defaultValue;
            }
        const i = `__vue-devtools-plugin-settings__${t.id}`;
        let a = Object.assign({}, r);
        try {
            const o = localStorage.getItem(i),
                s = JSON.parse(o);
            Object.assign(a, s);
        } catch {}
        (this.fallbacks = {
            getSettings() {
                return a;
            },
            setSettings(o) {
                try {
                    localStorage.setItem(i, JSON.stringify(o));
                } catch {}
                a = o;
            },
            now() {
                return lm();
            },
        }),
            n &&
                n.on(om, (o, s) => {
                    o === this.plugin.id && this.fallbacks.setSettings(s);
                }),
            (this.proxiedOn = new Proxy(
                {},
                {
                    get: (o, s) =>
                        this.target
                            ? this.target.on[s]
                            : (...l) => {
                                  this.onQueue.push({ method: s, args: l });
                              },
                }
            )),
            (this.proxiedTarget = new Proxy(
                {},
                {
                    get: (o, s) =>
                        this.target
                            ? this.target[s]
                            : s === "on"
                            ? this.proxiedOn
                            : Object.keys(this.fallbacks).includes(s)
                            ? (...l) => (this.targetQueue.push({ method: s, args: l, resolve: () => {} }), this.fallbacks[s](...l))
                            : (...l) =>
                                  new Promise((f) => {
                                      this.targetQueue.push({ method: s, args: l, resolve: f });
                                  }),
                }
            ));
    }
    async setRealTarget(t) {
        this.target = t;
        for (const n of this.onQueue) this.target.on[n.method](...n.args);
        for (const n of this.targetQueue) n.resolve(await this.target[n.method](...n.args));
    }
}
function fm(e, t) {
    const n = e,
        r = il(),
        i = rm(),
        a = im && n.enableEarlyProxy;
    if (i && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a)) i.emit(am, e, t);
    else {
        const o = a ? new cm(n, i) : null;
        (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({ pluginDescriptor: n, setupFn: t, proxy: o }),
            o && t(o.proxiedTarget);
    }
}
/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */ var um = "store";
function ln(e, t) {
    Object.keys(e).forEach(function (n) {
        return t(e[n], n);
    });
}
function dm(e) {
    return e !== null && typeof e == "object";
}
function pm(e) {
    return e && typeof e.then == "function";
}
function mm(e, t) {
    return function () {
        return e(t);
    };
}
function al(e, t, n) {
    return (
        t.indexOf(e) < 0 && (n && n.prepend ? t.unshift(e) : t.push(e)),
        function () {
            var r = t.indexOf(e);
            r > -1 && t.splice(r, 1);
        }
    );
}
function ol(e, t) {
    (e._actions = Object.create(null)),
        (e._mutations = Object.create(null)),
        (e._wrappedGetters = Object.create(null)),
        (e._modulesNamespaceMap = Object.create(null));
    var n = e.state;
    Cr(e, n, [], e._modules.root, !0), ra(e, n, t);
}
function ra(e, t, n) {
    var r = e._state;
    (e.getters = {}), (e._makeLocalGettersCache = Object.create(null));
    var i = e._wrappedGetters,
        a = {};
    ln(i, function (o, s) {
        (a[s] = mm(o, e)),
            Object.defineProperty(e.getters, s, {
                get: function () {
                    return a[s]();
                },
                enumerable: !0,
            });
    }),
        (e._state = on({ data: t })),
        e.strict && ym(e),
        r &&
            n &&
            e._withCommit(function () {
                r.data = null;
            });
}
function Cr(e, t, n, r, i) {
    var a = !n.length,
        o = e._modules.getNamespace(n);
    if ((r.namespaced && (e._modulesNamespaceMap[o], (e._modulesNamespaceMap[o] = r)), !a && !i)) {
        var s = ia(t, n.slice(0, -1)),
            l = n[n.length - 1];
        e._withCommit(function () {
            s[l] = r.state;
        });
    }
    var f = (r.context = hm(e, o, n));
    r.forEachMutation(function (c, u) {
        var p = o + u;
        gm(e, p, c, f);
    }),
        r.forEachAction(function (c, u) {
            var p = c.root ? u : o + u,
                h = c.handler || c;
            vm(e, p, h, f);
        }),
        r.forEachGetter(function (c, u) {
            var p = o + u;
            bm(e, p, c, f);
        }),
        r.forEachChild(function (c, u) {
            Cr(e, t, n.concat(u), c, i);
        });
}
function hm(e, t, n) {
    var r = t === "",
        i = {
            dispatch: r
                ? e.dispatch
                : function (a, o, s) {
                      var l = ar(a, o, s),
                          f = l.payload,
                          c = l.options,
                          u = l.type;
                      return (!c || !c.root) && (u = t + u), e.dispatch(u, f);
                  },
            commit: r
                ? e.commit
                : function (a, o, s) {
                      var l = ar(a, o, s),
                          f = l.payload,
                          c = l.options,
                          u = l.type;
                      (!c || !c.root) && (u = t + u), e.commit(u, f, c);
                  },
        };
    return (
        Object.defineProperties(i, {
            getters: {
                get: r
                    ? function () {
                          return e.getters;
                      }
                    : function () {
                          return sl(e, t);
                      },
            },
            state: {
                get: function () {
                    return ia(e.state, n);
                },
            },
        }),
        i
    );
}
function sl(e, t) {
    if (!e._makeLocalGettersCache[t]) {
        var n = {},
            r = t.length;
        Object.keys(e.getters).forEach(function (i) {
            if (i.slice(0, r) === t) {
                var a = i.slice(r);
                Object.defineProperty(n, a, {
                    get: function () {
                        return e.getters[i];
                    },
                    enumerable: !0,
                });
            }
        }),
            (e._makeLocalGettersCache[t] = n);
    }
    return e._makeLocalGettersCache[t];
}
function gm(e, t, n, r) {
    var i = e._mutations[t] || (e._mutations[t] = []);
    i.push(function (o) {
        n.call(e, r.state, o);
    });
}
function vm(e, t, n, r) {
    var i = e._actions[t] || (e._actions[t] = []);
    i.push(function (o) {
        var s = n.call(
            e,
            { dispatch: r.dispatch, commit: r.commit, getters: r.getters, state: r.state, rootGetters: e.getters, rootState: e.state },
            o
        );
        return (
            pm(s) || (s = Promise.resolve(s)),
            e._devtoolHook
                ? s.catch(function (l) {
                      throw (e._devtoolHook.emit("vuex:error", l), l);
                  })
                : s
        );
    });
}
function bm(e, t, n, r) {
    e._wrappedGetters[t] ||
        (e._wrappedGetters[t] = function (a) {
            return n(r.state, r.getters, a.state, a.getters);
        });
}
function ym(e) {
    Qt(
        function () {
            return e._state.data;
        },
        function () {},
        { deep: !0, flush: "sync" }
    );
}
function ia(e, t) {
    return t.reduce(function (n, r) {
        return n[r];
    }, e);
}
function ar(e, t, n) {
    return dm(e) && e.type && ((n = t), (t = e), (e = e.type)), { type: e, payload: t, options: n };
}
var _m = "vuex bindings",
    mo = "vuex:mutations",
    Hr = "vuex:actions",
    Ht = "vuex",
    wm = 0;
function xm(e, t) {
    fm(
        {
            id: "org.vuejs.vuex",
            app: e,
            label: "Vuex",
            homepage: "https://next.vuex.vuejs.org/",
            logo: "https://vuejs.org/images/icons/favicon-96x96.png",
            packageName: "vuex",
            componentStateTypes: [_m],
        },
        function (n) {
            n.addTimelineLayer({ id: mo, label: "Vuex Mutations", color: ho }),
                n.addTimelineLayer({ id: Hr, label: "Vuex Actions", color: ho }),
                n.addInspector({ id: Ht, label: "Vuex", icon: "storage", treeFilterPlaceholder: "Filter stores..." }),
                n.on.getInspectorTree(function (r) {
                    if (r.app === e && r.inspectorId === Ht)
                        if (r.filter) {
                            var i = [];
                            ul(i, t._modules.root, r.filter, ""), (r.rootNodes = i);
                        } else r.rootNodes = [fl(t._modules.root, "")];
                }),
                n.on.getInspectorState(function (r) {
                    if (r.app === e && r.inspectorId === Ht) {
                        var i = r.nodeId;
                        sl(t, i), (r.state = Em(Om(t._modules, i), i === "root" ? t.getters : t._makeLocalGettersCache, i));
                    }
                }),
                n.on.editInspectorState(function (r) {
                    if (r.app === e && r.inspectorId === Ht) {
                        var i = r.nodeId,
                            a = r.path;
                        i !== "root" && (a = i.split("/").filter(Boolean).concat(a)),
                            t._withCommit(function () {
                                r.set(t._state.data, a, r.state.value);
                            });
                    }
                }),
                t.subscribe(function (r, i) {
                    var a = {};
                    r.payload && (a.payload = r.payload),
                        (a.state = i),
                        n.notifyComponentUpdate(),
                        n.sendInspectorTree(Ht),
                        n.sendInspectorState(Ht),
                        n.addTimelineEvent({ layerId: mo, event: { time: Date.now(), title: r.type, data: a } });
                }),
                t.subscribeAction({
                    before: function (r, i) {
                        var a = {};
                        r.payload && (a.payload = r.payload),
                            (r._id = wm++),
                            (r._time = Date.now()),
                            (a.state = i),
                            n.addTimelineEvent({
                                layerId: Hr,
                                event: { time: r._time, title: r.type, groupId: r._id, subtitle: "start", data: a },
                            });
                    },
                    after: function (r, i) {
                        var a = {},
                            o = Date.now() - r._time;
                        (a.duration = { _custom: { type: "duration", display: o + "ms", tooltip: "Action duration", value: o } }),
                            r.payload && (a.payload = r.payload),
                            (a.state = i),
                            n.addTimelineEvent({
                                layerId: Hr,
                                event: { time: Date.now(), title: r.type, groupId: r._id, subtitle: "end", data: a },
                            });
                    },
                });
        }
    );
}
var ho = 8702998,
    km = 6710886,
    Am = 16777215,
    ll = { label: "namespaced", textColor: Am, backgroundColor: km };
function cl(e) {
    return e && e !== "root" ? e.split("/").slice(-2, -1)[0] : "Root";
}
function fl(e, t) {
    return {
        id: t || "root",
        label: cl(t),
        tags: e.namespaced ? [ll] : [],
        children: Object.keys(e._children).map(function (n) {
            return fl(e._children[n], t + n + "/");
        }),
    };
}
function ul(e, t, n, r) {
    r.includes(n) &&
        e.push({ id: r || "root", label: r.endsWith("/") ? r.slice(0, r.length - 1) : r || "Root", tags: t.namespaced ? [ll] : [] }),
        Object.keys(t._children).forEach(function (i) {
            ul(e, t._children[i], n, r + i + "/");
        });
}
function Em(e, t, n) {
    t = n === "root" ? t : t[n];
    var r = Object.keys(t),
        i = {
            state: Object.keys(e.state).map(function (o) {
                return { key: o, editable: !0, value: e.state[o] };
            }),
        };
    if (r.length) {
        var a = Cm(t);
        i.getters = Object.keys(a).map(function (o) {
            return {
                key: o.endsWith("/") ? cl(o) : o,
                editable: !1,
                value: _i(function () {
                    return a[o];
                }),
            };
        });
    }
    return i;
}
function Cm(e) {
    var t = {};
    return (
        Object.keys(e).forEach(function (n) {
            var r = n.split("/");
            if (r.length > 1) {
                var i = t,
                    a = r.pop();
                r.forEach(function (o) {
                    i[o] || (i[o] = { _custom: { value: {}, display: o, tooltip: "Module", abstract: !0 } }), (i = i[o]._custom.value);
                }),
                    (i[a] = _i(function () {
                        return e[n];
                    }));
            } else
                t[n] = _i(function () {
                    return e[n];
                });
        }),
        t
    );
}
function Om(e, t) {
    var n = t.split("/").filter(function (r) {
        return r;
    });
    return n.reduce(
        function (r, i, a) {
            var o = r[i];
            if (!o) throw new Error('Missing module "' + i + '" for path "' + t + '".');
            return a === n.length - 1 ? o : o._children;
        },
        t === "root" ? e : e.root._children
    );
}
function _i(e) {
    try {
        return e();
    } catch (t) {
        return t;
    }
}
var Ke = function (t, n) {
        (this.runtime = n), (this._children = Object.create(null)), (this._rawModule = t);
        var r = t.state;
        this.state = (typeof r == "function" ? r() : r) || {};
    },
    dl = { namespaced: { configurable: !0 } };
dl.namespaced.get = function () {
    return !!this._rawModule.namespaced;
};
Ke.prototype.addChild = function (t, n) {
    this._children[t] = n;
};
Ke.prototype.removeChild = function (t) {
    delete this._children[t];
};
Ke.prototype.getChild = function (t) {
    return this._children[t];
};
Ke.prototype.hasChild = function (t) {
    return t in this._children;
};
Ke.prototype.update = function (t) {
    (this._rawModule.namespaced = t.namespaced),
        t.actions && (this._rawModule.actions = t.actions),
        t.mutations && (this._rawModule.mutations = t.mutations),
        t.getters && (this._rawModule.getters = t.getters);
};
Ke.prototype.forEachChild = function (t) {
    ln(this._children, t);
};
Ke.prototype.forEachGetter = function (t) {
    this._rawModule.getters && ln(this._rawModule.getters, t);
};
Ke.prototype.forEachAction = function (t) {
    this._rawModule.actions && ln(this._rawModule.actions, t);
};
Ke.prototype.forEachMutation = function (t) {
    this._rawModule.mutations && ln(this._rawModule.mutations, t);
};
Object.defineProperties(Ke.prototype, dl);
var jt = function (t) {
    this.register([], t, !1);
};
jt.prototype.get = function (t) {
    return t.reduce(function (n, r) {
        return n.getChild(r);
    }, this.root);
};
jt.prototype.getNamespace = function (t) {
    var n = this.root;
    return t.reduce(function (r, i) {
        return (n = n.getChild(i)), r + (n.namespaced ? i + "/" : "");
    }, "");
};
jt.prototype.update = function (t) {
    pl([], this.root, t);
};
jt.prototype.register = function (t, n, r) {
    var i = this;
    r === void 0 && (r = !0);
    var a = new Ke(n, r);
    if (t.length === 0) this.root = a;
    else {
        var o = this.get(t.slice(0, -1));
        o.addChild(t[t.length - 1], a);
    }
    n.modules &&
        ln(n.modules, function (s, l) {
            i.register(t.concat(l), s, r);
        });
};
jt.prototype.unregister = function (t) {
    var n = this.get(t.slice(0, -1)),
        r = t[t.length - 1],
        i = n.getChild(r);
    !i || !i.runtime || n.removeChild(r);
};
jt.prototype.isRegistered = function (t) {
    var n = this.get(t.slice(0, -1)),
        r = t[t.length - 1];
    return n ? n.hasChild(r) : !1;
};
function pl(e, t, n) {
    if ((t.update(n), n.modules))
        for (var r in n.modules) {
            if (!t.getChild(r)) return;
            pl(e.concat(r), t.getChild(r), n.modules[r]);
        }
}
function Sm(e) {
    return new Ee(e);
}
var Ee = function (t) {
        var n = this;
        t === void 0 && (t = {});
        var r = t.plugins;
        r === void 0 && (r = []);
        var i = t.strict;
        i === void 0 && (i = !1);
        var a = t.devtools;
        (this._committing = !1),
            (this._actions = Object.create(null)),
            (this._actionSubscribers = []),
            (this._mutations = Object.create(null)),
            (this._wrappedGetters = Object.create(null)),
            (this._modules = new jt(t)),
            (this._modulesNamespaceMap = Object.create(null)),
            (this._subscribers = []),
            (this._makeLocalGettersCache = Object.create(null)),
            (this._devtools = a);
        var o = this,
            s = this,
            l = s.dispatch,
            f = s.commit;
        (this.dispatch = function (p, h) {
            return l.call(o, p, h);
        }),
            (this.commit = function (p, h, k) {
                return f.call(o, p, h, k);
            }),
            (this.strict = i);
        var c = this._modules.root.state;
        Cr(this, c, [], this._modules.root),
            ra(this, c),
            r.forEach(function (u) {
                return u(n);
            });
    },
    aa = { state: { configurable: !0 } };
Ee.prototype.install = function (t, n) {
    t.provide(n || um, this), (t.config.globalProperties.$store = this);
    var r = this._devtools !== void 0 ? this._devtools : !1;
    r && xm(t, this);
};
aa.state.get = function () {
    return this._state.data;
};
aa.state.set = function (e) {};
Ee.prototype.commit = function (t, n, r) {
    var i = this,
        a = ar(t, n, r),
        o = a.type,
        s = a.payload,
        l = { type: o, payload: s },
        f = this._mutations[o];
    !f ||
        (this._withCommit(function () {
            f.forEach(function (u) {
                u(s);
            });
        }),
        this._subscribers.slice().forEach(function (c) {
            return c(l, i.state);
        }));
};
Ee.prototype.dispatch = function (t, n) {
    var r = this,
        i = ar(t, n),
        a = i.type,
        o = i.payload,
        s = { type: a, payload: o },
        l = this._actions[a];
    if (!!l) {
        try {
            this._actionSubscribers
                .slice()
                .filter(function (c) {
                    return c.before;
                })
                .forEach(function (c) {
                    return c.before(s, r.state);
                });
        } catch {}
        var f =
            l.length > 1
                ? Promise.all(
                      l.map(function (c) {
                          return c(o);
                      })
                  )
                : l[0](o);
        return new Promise(function (c, u) {
            f.then(
                function (p) {
                    try {
                        r._actionSubscribers
                            .filter(function (h) {
                                return h.after;
                            })
                            .forEach(function (h) {
                                return h.after(s, r.state);
                            });
                    } catch {}
                    c(p);
                },
                function (p) {
                    try {
                        r._actionSubscribers
                            .filter(function (h) {
                                return h.error;
                            })
                            .forEach(function (h) {
                                return h.error(s, r.state, p);
                            });
                    } catch {}
                    u(p);
                }
            );
        });
    }
};
Ee.prototype.subscribe = function (t, n) {
    return al(t, this._subscribers, n);
};
Ee.prototype.subscribeAction = function (t, n) {
    var r = typeof t == "function" ? { before: t } : t;
    return al(r, this._actionSubscribers, n);
};
Ee.prototype.watch = function (t, n, r) {
    var i = this;
    return Qt(
        function () {
            return t(i.state, i.getters);
        },
        n,
        Object.assign({}, r)
    );
};
Ee.prototype.replaceState = function (t) {
    var n = this;
    this._withCommit(function () {
        n._state.data = t;
    });
};
Ee.prototype.registerModule = function (t, n, r) {
    r === void 0 && (r = {}),
        typeof t == "string" && (t = [t]),
        this._modules.register(t, n),
        Cr(this, this.state, t, this._modules.get(t), r.preserveState),
        ra(this, this.state);
};
Ee.prototype.unregisterModule = function (t) {
    var n = this;
    typeof t == "string" && (t = [t]),
        this._modules.unregister(t),
        this._withCommit(function () {
            var r = ia(n.state, t.slice(0, -1));
            delete r[t[t.length - 1]];
        }),
        ol(this);
};
Ee.prototype.hasModule = function (t) {
    return typeof t == "string" && (t = [t]), this._modules.isRegistered(t);
};
Ee.prototype.hotUpdate = function (t) {
    this._modules.update(t), ol(this, !0);
};
Ee.prototype._withCommit = function (t) {
    var n = this._committing;
    (this._committing = !0), t(), (this._committing = n);
};
Object.defineProperties(Ee.prototype, aa);
const Rt = Sm({
        state() {
            return { popupIsVisible: !1, lastCompletedAssignment: 0, activeAssignment: 0, navigationVisible: !0 };
        },
        mutations: {
            setPopupVisibility(e, t) {
                e.popupIsVisible = t;
            },
            setLastCompletedAssignment(e, t) {
                (e.lastCompletedAssignment = t), sessionStorage.setItem("lastCompletedAssignment", `${t}`);
            },
            setActiveAssignment(e, t) {
                (e.activeAssignment = t), sessionStorage.setItem("activeAssgnment", `${t}`);
            },
            setNavigationVisibility(e, t) {
                e.navigationVisible = t;
            },
        },
        actions: {
            setPopupVisibility({ commit: e }, t) {
                e("setPopupVisibility", t);
            },
            setLastCompletedAssignment({ commit: e }, t) {
                e("setLastCompletedAssignment", t);
            },
            setActiveAssignment({ commit: e }, t) {
                e("setActiveAssignment", t);
            },
            setNavigationVisibility({ commit: e }, t) {
                e("setNavigationVisibility", t);
            },
        },
        getters: {
            activeAssignmentCount: (e) => {
                const t = sessionStorage.getItem("activeAssignment");
                return t !== null ? parseInt(t) : e.activeAssignment;
            },
            lastCompletedAssignmentCount: (e) => {
                const t = sessionStorage.getItem("lastCompletedAssignment");
                return t !== null ? parseInt(t) : e.lastCompletedAssignment;
            },
            navigationVisible: (e) => e.navigationVisible,
        },
    }),
    Pm = [
        { path: "/", name: "0", component: Wd, beforeEnter: [Br] },
        { path: "/opdracht-1", name: "1", component: Du, beforeEnter: [Br] },
        { path: "/opdracht-2", name: "2", component: Xu, beforeEnter: [mn] },
        { path: "/opdracht-3", name: "3", component: od, beforeEnter: [mn] },
        { path: "/opdracht-4", name: "4", component: pd, beforeEnter: [mn] },
        { path: "/opdracht-5", name: "5", component: kd, beforeEnter: [mn] },
        { path: "/opdracht6", name: "6", component: Md, beforeEnter: [mn] },
        {
            path: "/:catchAll(.*)",
            component: Jd,
            beforeEnter: () => {
                Im(!1), Br();
            },
        },
    ],
    oa = tm({ history: vp(), routes: Pm });
oa.beforeEach((e) => {
    const { name: t } = e;
    if (t === "start") return;
    const { navigationVisible: n } = Rt.getters;
    n || or(!0);
    const r = parseInt(t);
    Rt.dispatch("setActiveAssignment", r);
});
function Br() {
    or(!1), document.body.classList.remove("hide-overflow");
}
function or(e) {
    Rt.dispatch("setPopupVisibility", e),
        e ? document.body.classList.add("hide-overflow") : document.body.classList.remove("hide-overflow");
}
function Im(e) {
    Rt.dispatch("setNavigationVisibility", e);
}
function mn() {
    const { activeAssignmentCount: e, lastCompletedAssignmentCount: t } = Rt.getters;
    if (t == 0 || e > t) return or(!0), !1;
    or(!1);
}
const cn = new Map();
cn.set(2, "flink");
cn.set(3, "gorillas");
cn.set(4, "thuisbezorgd");
cn.set(5, "deliveroo");
cn.set(6, "jumbo");
const Tm = (e) => (Mn("data-v-68b6af79"), (e = e()), jn(), e),
    Rm = { class: "popup-overlay" },
    Nm = { class: "popup" },
    Mm = { class: "popup-heading" },
    jm = { class: "popup-content" },
    Lm = Tm(() =>
        L(
            "p",
            null,
            "Laat aan Marieke het antwoord van de vorige opdracht zien, als dat correct is, krijg je het wachtwoord voor de volgende opdracht.",
            -1
        )
    ),
    $m = { class: "input-validation" },
    zm = { key: 0, class: "error" },
    Fm = {
        __name: "Popup",
        setup(e) {
            const { activeAssignmentCount: t } = Ks(["activeAssignmentCount"]),
                n = ei(""),
                r = ei(null);
            function i() {
                const a = r.value.value.toLowerCase(),
                    o = cn.get(t.value);
                if (a.length === 0 || a !== o) n.value = "Je hebt niet het juiste wachtwoord ingevuld";
                else {
                    n.value = "";
                    const { setLastCompletedAssignment: s } = _u(Rt, ["setLastCompletedAssignment"]);
                    s(t.value), oa.push({ name: `${t.value}` });
                }
            }
            return (
                Yi(() => {
                    r.value.focus();
                }),
                (a, o) => (
                    me(),
                    xe("div", Rm, [
                        L("div", Nm, [
                            L("div", Mm, [L("h3", null, "Wat is het wachtwoord voor opdracht " + qr(Be(t)) + "? ", 1)]),
                            L("div", jm, [
                                Lm,
                                L("div", $m, [
                                    L("input", { ref_key: "password", ref: r, type: "text", class: "password-input" }, null, 512),
                                    L("button", { class: "validate", onClick: i }, "Controleer wachtwoord"),
                                ]),
                                n.value.length > 0 ? (me(), xe("p", zm, qr(n.value), 1)) : pi("", !0),
                            ]),
                        ]),
                    ])
                )
            );
        },
    };
var Dm = et(Fm, [["__scopeId", "data-v-68b6af79"]]);
const Hm = { class: "page-content" },
    Bm = {
        __name: "App",
        setup(e) {
            const { popupIsVisible: t, navigationVisible: n } = yu(["popupIsVisible", "navigationVisible"]);
            return (r, i) => {
                const a = Os("router-view");
                return (
                    me(),
                    xe("div", Hm, [Be(t) ? (me(), ui(Dm, { key: 0 })) : pi("", !0), Be(n) ? (me(), ui(Iu, { key: 1 })) : pi("", !0), be(a)])
                );
            };
        },
    };
/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */ function go(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
            (r = r.filter(function (i) {
                return Object.getOwnPropertyDescriptor(e, i).enumerable;
            })),
            n.push.apply(n, r);
    }
    return n;
}
function T(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2
            ? go(Object(n), !0).forEach(function (r) {
                  Wm(e, r, n[r]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : go(Object(n)).forEach(function (r) {
                  Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
              });
    }
    return e;
}
function sr(e) {
    return (
        (sr =
            typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
                ? function (t) {
                      return typeof t;
                  }
                : function (t) {
                      return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
                  }),
        sr(e)
    );
}
function Um(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function vo(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
    }
}
function Vm(e, t, n) {
    return t && vo(e.prototype, t), n && vo(e, n), Object.defineProperty(e, "prototype", { writable: !1 }), e;
}
function Wm(e, t, n) {
    return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
}
function sa(e, t) {
    return Ym(e) || Gm(e, t) || ml(e, t) || Qm();
}
function Or(e) {
    return Km(e) || qm(e) || ml(e) || Xm();
}
function Km(e) {
    if (Array.isArray(e)) return wi(e);
}
function Ym(e) {
    if (Array.isArray(e)) return e;
}
function qm(e) {
    if ((typeof Symbol != "undefined" && e[Symbol.iterator] != null) || e["@@iterator"] != null) return Array.from(e);
}
function Gm(e, t) {
    var n = e == null ? null : (typeof Symbol != "undefined" && e[Symbol.iterator]) || e["@@iterator"];
    if (n != null) {
        var r = [],
            i = !0,
            a = !1,
            o,
            s;
        try {
            for (n = n.call(e); !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t)); i = !0);
        } catch (l) {
            (a = !0), (s = l);
        } finally {
            try {
                !i && n.return != null && n.return();
            } finally {
                if (a) throw s;
            }
        }
        return r;
    }
}
function ml(e, t) {
    if (!!e) {
        if (typeof e == "string") return wi(e, t);
        var n = Object.prototype.toString.call(e).slice(8, -1);
        if ((n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")) return Array.from(e);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return wi(e, t);
    }
}
function wi(e, t) {
    (t == null || t > e.length) && (t = e.length);
    for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
    return r;
}
function Xm() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Qm() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var bo = function () {},
    la = {},
    hl = {},
    gl = null,
    vl = { mark: bo, measure: bo };
try {
    typeof window != "undefined" && (la = window),
        typeof document != "undefined" && (hl = document),
        typeof MutationObserver != "undefined" && (gl = MutationObserver),
        typeof performance != "undefined" && (vl = performance);
} catch {}
var Jm = la.navigator || {},
    yo = Jm.userAgent,
    _o = yo === void 0 ? "" : yo,
    xt = la,
    le = hl,
    wo = gl,
    Un = vl;
xt.document;
var ct = !!le.documentElement && !!le.head && typeof le.addEventListener == "function" && typeof le.createElement == "function",
    bl = ~_o.indexOf("MSIE") || ~_o.indexOf("Trident/"),
    at = "___FONT_AWESOME___",
    xi = 16,
    yl = "fa",
    _l = "svg-inline--fa",
    Nt = "data-fa-i2svg",
    ki = "data-fa-pseudo-element",
    Zm = "data-fa-pseudo-element-pending",
    ca = "data-prefix",
    fa = "data-icon",
    xo = "fontawesome-i2svg",
    eh = "async",
    th = ["HTML", "HEAD", "STYLE", "SCRIPT"],
    wl = (function () {
        try {
            return !0;
        } catch {
            return !1;
        }
    })(),
    ua = {
        fas: "solid",
        "fa-solid": "solid",
        far: "regular",
        "fa-regular": "regular",
        fal: "light",
        "fa-light": "light",
        fat: "thin",
        "fa-thin": "thin",
        fad: "duotone",
        "fa-duotone": "duotone",
        fab: "brands",
        "fa-brands": "brands",
        fak: "kit",
        "fa-kit": "kit",
        fa: "solid",
    },
    lr = { solid: "fas", regular: "far", light: "fal", thin: "fat", duotone: "fad", brands: "fab", kit: "fak" },
    xl = { fab: "fa-brands", fad: "fa-duotone", fak: "fa-kit", fal: "fa-light", far: "fa-regular", fas: "fa-solid", fat: "fa-thin" },
    nh = {
        "fa-brands": "fab",
        "fa-duotone": "fad",
        "fa-kit": "fak",
        "fa-light": "fal",
        "fa-regular": "far",
        "fa-solid": "fas",
        "fa-thin": "fat",
    },
    rh = /fa[srltdbk\-\ ]/,
    kl = "fa-layers-text",
    ih = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Kit)?.*/i,
    ah = { 900: "fas", 400: "far", normal: "far", 300: "fal", 100: "fat" },
    Al = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    oh = Al.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
    sh = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"],
    Pt = { GROUP: "duotone-group", SWAP_OPACITY: "swap-opacity", PRIMARY: "primary", SECONDARY: "secondary" },
    lh = []
        .concat(Or(Object.keys(lr)), [
            "2xs",
            "xs",
            "sm",
            "lg",
            "xl",
            "2xl",
            "beat",
            "border",
            "fade",
            "beat-fade",
            "bounce",
            "flip-both",
            "flip-horizontal",
            "flip-vertical",
            "flip",
            "fw",
            "inverse",
            "layers-counter",
            "layers-text",
            "layers",
            "li",
            "pull-left",
            "pull-right",
            "pulse",
            "rotate-180",
            "rotate-270",
            "rotate-90",
            "rotate-by",
            "shake",
            "spin-pulse",
            "spin-reverse",
            "spin",
            "stack-1x",
            "stack-2x",
            "stack",
            "ul",
            Pt.GROUP,
            Pt.SWAP_OPACITY,
            Pt.PRIMARY,
            Pt.SECONDARY,
        ])
        .concat(
            Al.map(function (e) {
                return "".concat(e, "x");
            })
        )
        .concat(
            oh.map(function (e) {
                return "w-".concat(e);
            })
        ),
    El = xt.FontAwesomeConfig || {};
function ch(e) {
    var t = le.querySelector("script[" + e + "]");
    if (t) return t.getAttribute(e);
}
function fh(e) {
    return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (le && typeof le.querySelector == "function") {
    var uh = [
        ["data-family-prefix", "familyPrefix"],
        ["data-style-default", "styleDefault"],
        ["data-replacement-class", "replacementClass"],
        ["data-auto-replace-svg", "autoReplaceSvg"],
        ["data-auto-add-css", "autoAddCss"],
        ["data-auto-a11y", "autoA11y"],
        ["data-search-pseudo-elements", "searchPseudoElements"],
        ["data-observe-mutations", "observeMutations"],
        ["data-mutate-approach", "mutateApproach"],
        ["data-keep-original-source", "keepOriginalSource"],
        ["data-measure-performance", "measurePerformance"],
        ["data-show-missing-icons", "showMissingIcons"],
    ];
    uh.forEach(function (e) {
        var t = sa(e, 2),
            n = t[0],
            r = t[1],
            i = fh(ch(n));
        i != null && (El[r] = i);
    });
}
var dh = {
        familyPrefix: yl,
        styleDefault: "solid",
        replacementClass: _l,
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        mutateApproach: "async",
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0,
    },
    An = T(T({}, dh), El);
An.autoReplaceSvg || (An.observeMutations = !1);
var F = {};
Object.keys(An).forEach(function (e) {
    Object.defineProperty(F, e, {
        enumerable: !0,
        set: function (n) {
            (An[e] = n),
                Gn.forEach(function (r) {
                    return r(F);
                });
        },
        get: function () {
            return An[e];
        },
    });
});
xt.FontAwesomeConfig = F;
var Gn = [];
function ph(e) {
    return (
        Gn.push(e),
        function () {
            Gn.splice(Gn.indexOf(e), 1);
        }
    );
}
var pt = xi,
    Je = { size: 16, x: 0, y: 0, rotate: 0, flipX: !1, flipY: !1 };
function mh(e) {
    if (!(!e || !ct)) {
        var t = le.createElement("style");
        t.setAttribute("type", "text/css"), (t.innerHTML = e);
        for (var n = le.head.childNodes, r = null, i = n.length - 1; i > -1; i--) {
            var a = n[i],
                o = (a.tagName || "").toUpperCase();
            ["STYLE", "LINK"].indexOf(o) > -1 && (r = a);
        }
        return le.head.insertBefore(t, r), e;
    }
}
var hh = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Nn() {
    for (var e = 12, t = ""; e-- > 0; ) t += hh[(Math.random() * 62) | 0];
    return t;
}
function fn(e) {
    for (var t = [], n = (e || []).length >>> 0; n--; ) t[n] = e[n];
    return t;
}
function da(e) {
    return e.classList
        ? fn(e.classList)
        : (e.getAttribute("class") || "").split(" ").filter(function (t) {
              return t;
          });
}
function Cl(e) {
    return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function gh(e) {
    return Object.keys(e || {})
        .reduce(function (t, n) {
            return t + "".concat(n, '="').concat(Cl(e[n]), '" ');
        }, "")
        .trim();
}
function Sr(e) {
    return Object.keys(e || {}).reduce(function (t, n) {
        return t + "".concat(n, ": ").concat(e[n].trim(), ";");
    }, "");
}
function pa(e) {
    return e.size !== Je.size || e.x !== Je.x || e.y !== Je.y || e.rotate !== Je.rotate || e.flipX || e.flipY;
}
function vh(e) {
    var t = e.transform,
        n = e.containerWidth,
        r = e.iconWidth,
        i = { transform: "translate(".concat(n / 2, " 256)") },
        a = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "),
        o = "scale(".concat((t.size / 16) * (t.flipX ? -1 : 1), ", ").concat((t.size / 16) * (t.flipY ? -1 : 1), ") "),
        s = "rotate(".concat(t.rotate, " 0 0)"),
        l = { transform: "".concat(a, " ").concat(o, " ").concat(s) },
        f = { transform: "translate(".concat((r / 2) * -1, " -256)") };
    return { outer: i, inner: l, path: f };
}
function bh(e) {
    var t = e.transform,
        n = e.width,
        r = n === void 0 ? xi : n,
        i = e.height,
        a = i === void 0 ? xi : i,
        o = e.startCentered,
        s = o === void 0 ? !1 : o,
        l = "";
    return (
        s && bl
            ? (l += "translate(".concat(t.x / pt - r / 2, "em, ").concat(t.y / pt - a / 2, "em) "))
            : s
            ? (l += "translate(calc(-50% + ".concat(t.x / pt, "em), calc(-50% + ").concat(t.y / pt, "em)) "))
            : (l += "translate(".concat(t.x / pt, "em, ").concat(t.y / pt, "em) ")),
        (l += "scale(".concat((t.size / pt) * (t.flipX ? -1 : 1), ", ").concat((t.size / pt) * (t.flipY ? -1 : 1), ") ")),
        (l += "rotate(".concat(t.rotate, "deg) ")),
        l
    );
}
var yh = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function Ol() {
    var e = yl,
        t = _l,
        n = F.familyPrefix,
        r = F.replacementClass,
        i = yh;
    if (n !== e || r !== t) {
        var a = new RegExp("\\.".concat(e, "\\-"), "g"),
            o = new RegExp("\\--".concat(e, "\\-"), "g"),
            s = new RegExp("\\.".concat(t), "g");
        i = i.replace(a, ".".concat(n, "-")).replace(o, "--".concat(n, "-")).replace(s, ".".concat(r));
    }
    return i;
}
var ko = !1;
function Ur() {
    F.autoAddCss && !ko && (mh(Ol()), (ko = !0));
}
var _h = {
        mixout: function () {
            return { dom: { css: Ol, insertCss: Ur } };
        },
        hooks: function () {
            return {
                beforeDOMElementCreation: function () {
                    Ur();
                },
                beforeI2svg: function () {
                    Ur();
                },
            };
        },
    },
    ot = xt || {};
ot[at] || (ot[at] = {});
ot[at].styles || (ot[at].styles = {});
ot[at].hooks || (ot[at].hooks = {});
ot[at].shims || (ot[at].shims = []);
var De = ot[at],
    Sl = [],
    wh = function e() {
        le.removeEventListener("DOMContentLoaded", e),
            (cr = 1),
            Sl.map(function (t) {
                return t();
            });
    },
    cr = !1;
ct &&
    ((cr = (le.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(le.readyState)),
    cr || le.addEventListener("DOMContentLoaded", wh));
function xh(e) {
    !ct || (cr ? setTimeout(e, 0) : Sl.push(e));
}
function $n(e) {
    var t = e.tag,
        n = e.attributes,
        r = n === void 0 ? {} : n,
        i = e.children,
        a = i === void 0 ? [] : i;
    return typeof e == "string" ? Cl(e) : "<".concat(t, " ").concat(gh(r), ">").concat(a.map($n).join(""), "</").concat(t, ">");
}
function Ao(e, t, n) {
    if (e && e[t] && e[t][n]) return { prefix: t, iconName: n, icon: e[t][n] };
}
var kh = function (t, n) {
        return function (r, i, a, o) {
            return t.call(n, r, i, a, o);
        };
    },
    Vr = function (t, n, r, i) {
        var a = Object.keys(t),
            o = a.length,
            s = i !== void 0 ? kh(n, i) : n,
            l,
            f,
            c;
        for (r === void 0 ? ((l = 1), (c = t[a[0]])) : ((l = 0), (c = r)); l < o; l++) (f = a[l]), (c = s(c, t[f], f, t));
        return c;
    };
function Ah(e) {
    for (var t = [], n = 0, r = e.length; n < r; ) {
        var i = e.charCodeAt(n++);
        if (i >= 55296 && i <= 56319 && n < r) {
            var a = e.charCodeAt(n++);
            (a & 64512) == 56320 ? t.push(((i & 1023) << 10) + (a & 1023) + 65536) : (t.push(i), n--);
        } else t.push(i);
    }
    return t;
}
function Ai(e) {
    var t = Ah(e);
    return t.length === 1 ? t[0].toString(16) : null;
}
function Eh(e, t) {
    var n = e.length,
        r = e.charCodeAt(t),
        i;
    return r >= 55296 && r <= 56319 && n > t + 1 && ((i = e.charCodeAt(t + 1)), i >= 56320 && i <= 57343)
        ? (r - 55296) * 1024 + i - 56320 + 65536
        : r;
}
function Eo(e) {
    return Object.keys(e).reduce(function (t, n) {
        var r = e[n],
            i = !!r.icon;
        return i ? (t[r.iconName] = r.icon) : (t[n] = r), t;
    }, {});
}
function Ei(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
        r = n.skipHooks,
        i = r === void 0 ? !1 : r,
        a = Eo(t);
    typeof De.hooks.addPack == "function" && !i ? De.hooks.addPack(e, Eo(t)) : (De.styles[e] = T(T({}, De.styles[e] || {}), a)),
        e === "fas" && Ei("fa", t);
}
var En = De.styles,
    Ch = De.shims,
    Oh = Object.values(xl),
    ma = null,
    Pl = {},
    Il = {},
    Tl = {},
    Rl = {},
    Nl = {},
    Sh = Object.keys(ua);
function Ph(e) {
    return ~lh.indexOf(e);
}
function Ih(e, t) {
    var n = t.split("-"),
        r = n[0],
        i = n.slice(1).join("-");
    return r === e && i !== "" && !Ph(i) ? i : null;
}
var Ml = function () {
    var t = function (a) {
        return Vr(
            En,
            function (o, s, l) {
                return (o[l] = Vr(s, a, {})), o;
            },
            {}
        );
    };
    (Pl = t(function (i, a, o) {
        if ((a[3] && (i[a[3]] = o), a[2])) {
            var s = a[2].filter(function (l) {
                return typeof l == "number";
            });
            s.forEach(function (l) {
                i[l.toString(16)] = o;
            });
        }
        return i;
    })),
        (Il = t(function (i, a, o) {
            if (((i[o] = o), a[2])) {
                var s = a[2].filter(function (l) {
                    return typeof l == "string";
                });
                s.forEach(function (l) {
                    i[l] = o;
                });
            }
            return i;
        })),
        (Nl = t(function (i, a, o) {
            var s = a[2];
            return (
                (i[o] = o),
                s.forEach(function (l) {
                    i[l] = o;
                }),
                i
            );
        }));
    var n = "far" in En || F.autoFetchSvg,
        r = Vr(
            Ch,
            function (i, a) {
                var o = a[0],
                    s = a[1],
                    l = a[2];
                return (
                    s === "far" && !n && (s = "fas"),
                    typeof o == "string" && (i.names[o] = { prefix: s, iconName: l }),
                    typeof o == "number" && (i.unicodes[o.toString(16)] = { prefix: s, iconName: l }),
                    i
                );
            },
            { names: {}, unicodes: {} }
        );
    (Tl = r.names), (Rl = r.unicodes), (ma = Pr(F.styleDefault));
};
ph(function (e) {
    ma = Pr(e.styleDefault);
});
Ml();
function ha(e, t) {
    return (Pl[e] || {})[t];
}
function Th(e, t) {
    return (Il[e] || {})[t];
}
function Kt(e, t) {
    return (Nl[e] || {})[t];
}
function jl(e) {
    return Tl[e] || { prefix: null, iconName: null };
}
function Rh(e) {
    var t = Rl[e],
        n = ha("fas", e);
    return t || (n ? { prefix: "fas", iconName: n } : null) || { prefix: null, iconName: null };
}
function kt() {
    return ma;
}
var ga = function () {
    return { prefix: null, iconName: null, rest: [] };
};
function Pr(e) {
    var t = ua[e],
        n = lr[e] || lr[t],
        r = e in De.styles ? e : null;
    return n || r || null;
}
function Ir(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        n = t.skipLookups,
        r = n === void 0 ? !1 : n,
        i = null,
        a = e.reduce(function (o, s) {
            var l = Ih(F.familyPrefix, s);
            if (
                (En[s]
                    ? ((s = Oh.includes(s) ? nh[s] : s), (i = s), (o.prefix = s))
                    : Sh.indexOf(s) > -1
                    ? ((i = s), (o.prefix = Pr(s)))
                    : l
                    ? (o.iconName = l)
                    : s !== F.replacementClass && o.rest.push(s),
                !r && o.prefix && o.iconName)
            ) {
                var f = i === "fa" ? jl(o.iconName) : {},
                    c = Kt(o.prefix, o.iconName);
                f.prefix && (i = null),
                    (o.iconName = f.iconName || c || o.iconName),
                    (o.prefix = f.prefix || o.prefix),
                    o.prefix === "far" && !En.far && En.fas && !F.autoFetchSvg && (o.prefix = "fas");
            }
            return o;
        }, ga());
    return (a.prefix === "fa" || i === "fa") && (a.prefix = kt() || "fas"), a;
}
var Nh = (function () {
        function e() {
            Um(this, e), (this.definitions = {});
        }
        return (
            Vm(e, [
                {
                    key: "add",
                    value: function () {
                        for (var n = this, r = arguments.length, i = new Array(r), a = 0; a < r; a++) i[a] = arguments[a];
                        var o = i.reduce(this._pullDefinitions, {});
                        Object.keys(o).forEach(function (s) {
                            (n.definitions[s] = T(T({}, n.definitions[s] || {}), o[s])), Ei(s, o[s]);
                            var l = xl[s];
                            l && Ei(l, o[s]), Ml();
                        });
                    },
                },
                {
                    key: "reset",
                    value: function () {
                        this.definitions = {};
                    },
                },
                {
                    key: "_pullDefinitions",
                    value: function (n, r) {
                        var i = r.prefix && r.iconName && r.icon ? { 0: r } : r;
                        return (
                            Object.keys(i).map(function (a) {
                                var o = i[a],
                                    s = o.prefix,
                                    l = o.iconName,
                                    f = o.icon,
                                    c = f[2];
                                n[s] || (n[s] = {}),
                                    c.length > 0 &&
                                        c.forEach(function (u) {
                                            typeof u == "string" && (n[s][u] = f);
                                        }),
                                    (n[s][l] = f);
                            }),
                            n
                        );
                    },
                },
            ]),
            e
        );
    })(),
    Co = [],
    Yt = {},
    Jt = {},
    Mh = Object.keys(Jt);
function jh(e, t) {
    var n = t.mixoutsTo;
    return (
        (Co = e),
        (Yt = {}),
        Object.keys(Jt).forEach(function (r) {
            Mh.indexOf(r) === -1 && delete Jt[r];
        }),
        Co.forEach(function (r) {
            var i = r.mixout ? r.mixout() : {};
            if (
                (Object.keys(i).forEach(function (o) {
                    typeof i[o] == "function" && (n[o] = i[o]),
                        sr(i[o]) === "object" &&
                            Object.keys(i[o]).forEach(function (s) {
                                n[o] || (n[o] = {}), (n[o][s] = i[o][s]);
                            });
                }),
                r.hooks)
            ) {
                var a = r.hooks();
                Object.keys(a).forEach(function (o) {
                    Yt[o] || (Yt[o] = []), Yt[o].push(a[o]);
                });
            }
            r.provides && r.provides(Jt);
        }),
        n
    );
}
function Ci(e, t) {
    for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
    var a = Yt[e] || [];
    return (
        a.forEach(function (o) {
            t = o.apply(null, [t].concat(r));
        }),
        t
    );
}
function Mt(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
    var i = Yt[e] || [];
    i.forEach(function (a) {
        a.apply(null, n);
    });
}
function st() {
    var e = arguments[0],
        t = Array.prototype.slice.call(arguments, 1);
    return Jt[e] ? Jt[e].apply(null, t) : void 0;
}
function Oi(e) {
    e.prefix === "fa" && (e.prefix = "fas");
    var t = e.iconName,
        n = e.prefix || kt();
    if (!!t) return (t = Kt(n, t) || t), Ao(Ll.definitions, n, t) || Ao(De.styles, n, t);
}
var Ll = new Nh(),
    Lh = function () {
        (F.autoReplaceSvg = !1), (F.observeMutations = !1), Mt("noAuto");
    },
    $h = {
        i2svg: function () {
            var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
            return ct
                ? (Mt("beforeI2svg", t), st("pseudoElements2svg", t), st("i2svg", t))
                : Promise.reject("Operation requires a DOM of some kind.");
        },
        watch: function () {
            var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
                n = t.autoReplaceSvgRoot;
            F.autoReplaceSvg === !1 && (F.autoReplaceSvg = !0),
                (F.observeMutations = !0),
                xh(function () {
                    Fh({ autoReplaceSvgRoot: n }), Mt("watch", t);
                });
        },
    },
    zh = {
        icon: function (t) {
            if (t === null) return null;
            if (sr(t) === "object" && t.prefix && t.iconName) return { prefix: t.prefix, iconName: Kt(t.prefix, t.iconName) || t.iconName };
            if (Array.isArray(t) && t.length === 2) {
                var n = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1],
                    r = Pr(t[0]);
                return { prefix: r, iconName: Kt(r, n) || n };
            }
            if (typeof t == "string" && (t.indexOf("".concat(F.familyPrefix, "-")) > -1 || t.match(rh))) {
                var i = Ir(t.split(" "), { skipLookups: !0 });
                return { prefix: i.prefix || kt(), iconName: Kt(i.prefix, i.iconName) || i.iconName };
            }
            if (typeof t == "string") {
                var a = kt();
                return { prefix: a, iconName: Kt(a, t) || t };
            }
        },
    },
    Ie = { noAuto: Lh, config: F, dom: $h, parse: zh, library: Ll, findIconDefinition: Oi, toHtml: $n },
    Fh = function () {
        var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
            n = t.autoReplaceSvgRoot,
            r = n === void 0 ? le : n;
        (Object.keys(De.styles).length > 0 || F.autoFetchSvg) && ct && F.autoReplaceSvg && Ie.dom.i2svg({ node: r });
    };
function Tr(e, t) {
    return (
        Object.defineProperty(e, "abstract", { get: t }),
        Object.defineProperty(e, "html", {
            get: function () {
                return e.abstract.map(function (r) {
                    return $n(r);
                });
            },
        }),
        Object.defineProperty(e, "node", {
            get: function () {
                if (!!ct) {
                    var r = le.createElement("div");
                    return (r.innerHTML = e.html), r.children;
                }
            },
        }),
        e
    );
}
function Dh(e) {
    var t = e.children,
        n = e.main,
        r = e.mask,
        i = e.attributes,
        a = e.styles,
        o = e.transform;
    if (pa(o) && n.found && !r.found) {
        var s = n.width,
            l = n.height,
            f = { x: s / l / 2, y: 0.5 };
        i.style = Sr(T(T({}, a), {}, { "transform-origin": "".concat(f.x + o.x / 16, "em ").concat(f.y + o.y / 16, "em") }));
    }
    return [{ tag: "svg", attributes: i, children: t }];
}
function Hh(e) {
    var t = e.prefix,
        n = e.iconName,
        r = e.children,
        i = e.attributes,
        a = e.symbol,
        o = a === !0 ? "".concat(t, "-").concat(F.familyPrefix, "-").concat(n) : a;
    return [
        {
            tag: "svg",
            attributes: { style: "display: none;" },
            children: [{ tag: "symbol", attributes: T(T({}, i), {}, { id: o }), children: r }],
        },
    ];
}
function va(e) {
    var t = e.icons,
        n = t.main,
        r = t.mask,
        i = e.prefix,
        a = e.iconName,
        o = e.transform,
        s = e.symbol,
        l = e.title,
        f = e.maskId,
        c = e.titleId,
        u = e.extra,
        p = e.watchable,
        h = p === void 0 ? !1 : p,
        k = r.found ? r : n,
        P = k.width,
        S = k.height,
        v = i === "fak",
        w = [F.replacementClass, a ? "".concat(F.familyPrefix, "-").concat(a) : ""]
            .filter(function (X) {
                return u.classes.indexOf(X) === -1;
            })
            .filter(function (X) {
                return X !== "" || !!X;
            })
            .concat(u.classes)
            .join(" "),
        R = {
            children: [],
            attributes: T(
                T({}, u.attributes),
                {},
                {
                    "data-prefix": i,
                    "data-icon": a,
                    class: w,
                    role: u.attributes.role || "img",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 ".concat(P, " ").concat(S),
                }
            ),
        },
        D = v && !~u.classes.indexOf("fa-fw") ? { width: "".concat((P / S) * 16 * 0.0625, "em") } : {};
    h && (R.attributes[Nt] = ""),
        l &&
            (R.children.push({
                tag: "title",
                attributes: { id: R.attributes["aria-labelledby"] || "title-".concat(c || Nn()) },
                children: [l],
            }),
            delete R.attributes.title);
    var U = T(
            T({}, R),
            {},
            { prefix: i, iconName: a, main: n, mask: r, maskId: f, transform: o, symbol: s, styles: T(T({}, D), u.styles) }
        ),
        ee =
            r.found && n.found
                ? st("generateAbstractMask", U) || { children: [], attributes: {} }
                : st("generateAbstractIcon", U) || { children: [], attributes: {} },
        ce = ee.children,
        W = ee.attributes;
    return (U.children = ce), (U.attributes = W), s ? Hh(U) : Dh(U);
}
function Oo(e) {
    var t = e.content,
        n = e.width,
        r = e.height,
        i = e.transform,
        a = e.title,
        o = e.extra,
        s = e.watchable,
        l = s === void 0 ? !1 : s,
        f = T(T(T({}, o.attributes), a ? { title: a } : {}), {}, { class: o.classes.join(" ") });
    l && (f[Nt] = "");
    var c = T({}, o.styles);
    pa(i) && ((c.transform = bh({ transform: i, startCentered: !0, width: n, height: r })), (c["-webkit-transform"] = c.transform));
    var u = Sr(c);
    u.length > 0 && (f.style = u);
    var p = [];
    return (
        p.push({ tag: "span", attributes: f, children: [t] }),
        a && p.push({ tag: "span", attributes: { class: "sr-only" }, children: [a] }),
        p
    );
}
function Bh(e) {
    var t = e.content,
        n = e.title,
        r = e.extra,
        i = T(T(T({}, r.attributes), n ? { title: n } : {}), {}, { class: r.classes.join(" ") }),
        a = Sr(r.styles);
    a.length > 0 && (i.style = a);
    var o = [];
    return (
        o.push({ tag: "span", attributes: i, children: [t] }),
        n && o.push({ tag: "span", attributes: { class: "sr-only" }, children: [n] }),
        o
    );
}
var Wr = De.styles;
function Si(e) {
    var t = e[0],
        n = e[1],
        r = e.slice(4),
        i = sa(r, 1),
        a = i[0],
        o = null;
    return (
        Array.isArray(a)
            ? (o = {
                  tag: "g",
                  attributes: { class: "".concat(F.familyPrefix, "-").concat(Pt.GROUP) },
                  children: [
                      {
                          tag: "path",
                          attributes: { class: "".concat(F.familyPrefix, "-").concat(Pt.SECONDARY), fill: "currentColor", d: a[0] },
                      },
                      {
                          tag: "path",
                          attributes: { class: "".concat(F.familyPrefix, "-").concat(Pt.PRIMARY), fill: "currentColor", d: a[1] },
                      },
                  ],
              })
            : (o = { tag: "path", attributes: { fill: "currentColor", d: a } }),
        { found: !0, width: t, height: n, icon: o }
    );
}
var Uh = { found: !1, width: 512, height: 512 };
function Vh(e, t) {
    !wl && !F.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function Pi(e, t) {
    var n = t;
    return (
        t === "fa" && F.styleDefault !== null && (t = kt()),
        new Promise(function (r, i) {
            if ((st("missingIconAbstract"), n === "fa")) {
                var a = jl(e) || {};
                (e = a.iconName || e), (t = a.prefix || t);
            }
            if (e && t && Wr[t] && Wr[t][e]) {
                var o = Wr[t][e];
                return r(Si(o));
            }
            Vh(e, t), r(T(T({}, Uh), {}, { icon: F.showMissingIcons && e ? st("missingIconAbstract") || {} : {} }));
        })
    );
}
var So = function () {},
    Ii = F.measurePerformance && Un && Un.mark && Un.measure ? Un : { mark: So, measure: So },
    vn = 'FA "6.1.1"',
    Wh = function (t) {
        return (
            Ii.mark("".concat(vn, " ").concat(t, " begins")),
            function () {
                return $l(t);
            }
        );
    },
    $l = function (t) {
        Ii.mark("".concat(vn, " ").concat(t, " ends")),
            Ii.measure("".concat(vn, " ").concat(t), "".concat(vn, " ").concat(t, " begins"), "".concat(vn, " ").concat(t, " ends"));
    },
    ba = { begin: Wh, end: $l },
    Xn = function () {};
function Po(e) {
    var t = e.getAttribute ? e.getAttribute(Nt) : null;
    return typeof t == "string";
}
function Kh(e) {
    var t = e.getAttribute ? e.getAttribute(ca) : null,
        n = e.getAttribute ? e.getAttribute(fa) : null;
    return t && n;
}
function Yh(e) {
    return e && e.classList && e.classList.contains && e.classList.contains(F.replacementClass);
}
function qh() {
    if (F.autoReplaceSvg === !0) return Qn.replace;
    var e = Qn[F.autoReplaceSvg];
    return e || Qn.replace;
}
function Gh(e) {
    return le.createElementNS("http://www.w3.org/2000/svg", e);
}
function Xh(e) {
    return le.createElement(e);
}
function zl(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
        n = t.ceFn,
        r = n === void 0 ? (e.tag === "svg" ? Gh : Xh) : n;
    if (typeof e == "string") return le.createTextNode(e);
    var i = r(e.tag);
    Object.keys(e.attributes || []).forEach(function (o) {
        i.setAttribute(o, e.attributes[o]);
    });
    var a = e.children || [];
    return (
        a.forEach(function (o) {
            i.appendChild(zl(o, { ceFn: r }));
        }),
        i
    );
}
function Qh(e) {
    var t = " ".concat(e.outerHTML, " ");
    return (t = "".concat(t, "Font Awesome fontawesome.com ")), t;
}
var Qn = {
    replace: function (t) {
        var n = t[0];
        if (n.parentNode)
            if (
                (t[1].forEach(function (i) {
                    n.parentNode.insertBefore(zl(i), n);
                }),
                n.getAttribute(Nt) === null && F.keepOriginalSource)
            ) {
                var r = le.createComment(Qh(n));
                n.parentNode.replaceChild(r, n);
            } else n.remove();
    },
    nest: function (t) {
        var n = t[0],
            r = t[1];
        if (~da(n).indexOf(F.replacementClass)) return Qn.replace(t);
        var i = new RegExp("".concat(F.familyPrefix, "-.*"));
        if ((delete r[0].attributes.id, r[0].attributes.class)) {
            var a = r[0].attributes.class.split(" ").reduce(
                function (s, l) {
                    return l === F.replacementClass || l.match(i) ? s.toSvg.push(l) : s.toNode.push(l), s;
                },
                { toNode: [], toSvg: [] }
            );
            (r[0].attributes.class = a.toSvg.join(" ")),
                a.toNode.length === 0 ? n.removeAttribute("class") : n.setAttribute("class", a.toNode.join(" "));
        }
        var o = r.map(function (s) {
            return $n(s);
        }).join(`
`);
        n.setAttribute(Nt, ""), (n.innerHTML = o);
    },
};
function Io(e) {
    e();
}
function Fl(e, t) {
    var n = typeof t == "function" ? t : Xn;
    if (e.length === 0) n();
    else {
        var r = Io;
        F.mutateApproach === eh && (r = xt.requestAnimationFrame || Io),
            r(function () {
                var i = qh(),
                    a = ba.begin("mutate");
                e.map(i), a(), n();
            });
    }
}
var ya = !1;
function Dl() {
    ya = !0;
}
function Ti() {
    ya = !1;
}
var fr = null;
function To(e) {
    if (!!wo && !!F.observeMutations) {
        var t = e.treeCallback,
            n = t === void 0 ? Xn : t,
            r = e.nodeCallback,
            i = r === void 0 ? Xn : r,
            a = e.pseudoElementsCallback,
            o = a === void 0 ? Xn : a,
            s = e.observeMutationsRoot,
            l = s === void 0 ? le : s;
        (fr = new wo(function (f) {
            if (!ya) {
                var c = kt();
                fn(f).forEach(function (u) {
                    if (
                        (u.type === "childList" &&
                            u.addedNodes.length > 0 &&
                            !Po(u.addedNodes[0]) &&
                            (F.searchPseudoElements && o(u.target), n(u.target)),
                        u.type === "attributes" && u.target.parentNode && F.searchPseudoElements && o(u.target.parentNode),
                        u.type === "attributes" && Po(u.target) && ~sh.indexOf(u.attributeName))
                    )
                        if (u.attributeName === "class" && Kh(u.target)) {
                            var p = Ir(da(u.target)),
                                h = p.prefix,
                                k = p.iconName;
                            u.target.setAttribute(ca, h || c), k && u.target.setAttribute(fa, k);
                        } else Yh(u.target) && i(u.target);
                });
            }
        })),
            ct && fr.observe(l, { childList: !0, attributes: !0, characterData: !0, subtree: !0 });
    }
}
function Jh() {
    !fr || fr.disconnect();
}
function Zh(e) {
    var t = e.getAttribute("style"),
        n = [];
    return (
        t &&
            (n = t.split(";").reduce(function (r, i) {
                var a = i.split(":"),
                    o = a[0],
                    s = a.slice(1);
                return o && s.length > 0 && (r[o] = s.join(":").trim()), r;
            }, {})),
        n
    );
}
function eg(e) {
    var t = e.getAttribute("data-prefix"),
        n = e.getAttribute("data-icon"),
        r = e.innerText !== void 0 ? e.innerText.trim() : "",
        i = Ir(da(e));
    return (
        i.prefix || (i.prefix = kt()),
        t && n && ((i.prefix = t), (i.iconName = n)),
        (i.iconName && i.prefix) || (i.prefix && r.length > 0 && (i.iconName = Th(i.prefix, e.innerText) || ha(i.prefix, Ai(e.innerText)))),
        i
    );
}
function tg(e) {
    var t = fn(e.attributes).reduce(function (i, a) {
            return i.name !== "class" && i.name !== "style" && (i[a.name] = a.value), i;
        }, {}),
        n = e.getAttribute("title"),
        r = e.getAttribute("data-fa-title-id");
    return (
        F.autoA11y &&
            (n
                ? (t["aria-labelledby"] = "".concat(F.replacementClass, "-title-").concat(r || Nn()))
                : ((t["aria-hidden"] = "true"), (t.focusable = "false"))),
        t
    );
}
function ng() {
    return {
        iconName: null,
        title: null,
        titleId: null,
        prefix: null,
        transform: Je,
        symbol: !1,
        mask: { iconName: null, prefix: null, rest: [] },
        maskId: null,
        extra: { classes: [], styles: {}, attributes: {} },
    };
}
function Ro(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : { styleParser: !0 },
        n = eg(e),
        r = n.iconName,
        i = n.prefix,
        a = n.rest,
        o = tg(e),
        s = Ci("parseNodeAttributes", {}, e),
        l = t.styleParser ? Zh(e) : [];
    return T(
        {
            iconName: r,
            title: e.getAttribute("title"),
            titleId: e.getAttribute("data-fa-title-id"),
            prefix: i,
            transform: Je,
            mask: { iconName: null, prefix: null, rest: [] },
            maskId: null,
            symbol: !1,
            extra: { classes: a, styles: l, attributes: o },
        },
        s
    );
}
var rg = De.styles;
function Hl(e) {
    var t = F.autoReplaceSvg === "nest" ? Ro(e, { styleParser: !1 }) : Ro(e);
    return ~t.extra.classes.indexOf(kl) ? st("generateLayersText", e, t) : st("generateSvgReplacementMutation", e, t);
}
function No(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (!ct) return Promise.resolve();
    var n = le.documentElement.classList,
        r = function (u) {
            return n.add("".concat(xo, "-").concat(u));
        },
        i = function (u) {
            return n.remove("".concat(xo, "-").concat(u));
        },
        a = F.autoFetchSvg ? Object.keys(ua) : Object.keys(rg),
        o = [".".concat(kl, ":not([").concat(Nt, "])")]
            .concat(
                a.map(function (c) {
                    return ".".concat(c, ":not([").concat(Nt, "])");
                })
            )
            .join(", ");
    if (o.length === 0) return Promise.resolve();
    var s = [];
    try {
        s = fn(e.querySelectorAll(o));
    } catch {}
    if (s.length > 0) r("pending"), i("complete");
    else return Promise.resolve();
    var l = ba.begin("onTree"),
        f = s.reduce(function (c, u) {
            try {
                var p = Hl(u);
                p && c.push(p);
            } catch (h) {
                wl || (h.name === "MissingIcon" && console.error(h));
            }
            return c;
        }, []);
    return new Promise(function (c, u) {
        Promise.all(f)
            .then(function (p) {
                Fl(p, function () {
                    r("active"), r("complete"), i("pending"), typeof t == "function" && t(), l(), c();
                });
            })
            .catch(function (p) {
                l(), u(p);
            });
    });
}
function ig(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    Hl(e).then(function (n) {
        n && Fl([n], t);
    });
}
function ag(e) {
    return function (t) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            r = (t || {}).icon ? t : Oi(t || {}),
            i = n.mask;
        return i && (i = (i || {}).icon ? i : Oi(i || {})), e(r, T(T({}, n), {}, { mask: i }));
    };
}
var og = function (t) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
            r = n.transform,
            i = r === void 0 ? Je : r,
            a = n.symbol,
            o = a === void 0 ? !1 : a,
            s = n.mask,
            l = s === void 0 ? null : s,
            f = n.maskId,
            c = f === void 0 ? null : f,
            u = n.title,
            p = u === void 0 ? null : u,
            h = n.titleId,
            k = h === void 0 ? null : h,
            P = n.classes,
            S = P === void 0 ? [] : P,
            v = n.attributes,
            w = v === void 0 ? {} : v,
            R = n.styles,
            D = R === void 0 ? {} : R;
        if (!!t) {
            var U = t.prefix,
                ee = t.iconName,
                ce = t.icon;
            return Tr(T({ type: "icon" }, t), function () {
                return (
                    Mt("beforeDOMElementCreation", { iconDefinition: t, params: n }),
                    F.autoA11y &&
                        (p
                            ? (w["aria-labelledby"] = "".concat(F.replacementClass, "-title-").concat(k || Nn()))
                            : ((w["aria-hidden"] = "true"), (w.focusable = "false"))),
                    va({
                        icons: { main: Si(ce), mask: l ? Si(l.icon) : { found: !1, width: null, height: null, icon: {} } },
                        prefix: U,
                        iconName: ee,
                        transform: T(T({}, Je), i),
                        symbol: o,
                        title: p,
                        maskId: c,
                        titleId: k,
                        extra: { attributes: w, styles: D, classes: S },
                    })
                );
            });
        }
    },
    sg = {
        mixout: function () {
            return { icon: ag(og) };
        },
        hooks: function () {
            return {
                mutationObserverCallbacks: function (n) {
                    return (n.treeCallback = No), (n.nodeCallback = ig), n;
                },
            };
        },
        provides: function (t) {
            (t.i2svg = function (n) {
                var r = n.node,
                    i = r === void 0 ? le : r,
                    a = n.callback,
                    o = a === void 0 ? function () {} : a;
                return No(i, o);
            }),
                (t.generateSvgReplacementMutation = function (n, r) {
                    var i = r.iconName,
                        a = r.title,
                        o = r.titleId,
                        s = r.prefix,
                        l = r.transform,
                        f = r.symbol,
                        c = r.mask,
                        u = r.maskId,
                        p = r.extra;
                    return new Promise(function (h, k) {
                        Promise.all([
                            Pi(i, s),
                            c.iconName ? Pi(c.iconName, c.prefix) : Promise.resolve({ found: !1, width: 512, height: 512, icon: {} }),
                        ])
                            .then(function (P) {
                                var S = sa(P, 2),
                                    v = S[0],
                                    w = S[1];
                                h([
                                    n,
                                    va({
                                        icons: { main: v, mask: w },
                                        prefix: s,
                                        iconName: i,
                                        transform: l,
                                        symbol: f,
                                        maskId: u,
                                        title: a,
                                        titleId: o,
                                        extra: p,
                                        watchable: !0,
                                    }),
                                ]);
                            })
                            .catch(k);
                    });
                }),
                (t.generateAbstractIcon = function (n) {
                    var r = n.children,
                        i = n.attributes,
                        a = n.main,
                        o = n.transform,
                        s = n.styles,
                        l = Sr(s);
                    l.length > 0 && (i.style = l);
                    var f;
                    return (
                        pa(o) &&
                            (f = st("generateAbstractTransformGrouping", {
                                main: a,
                                transform: o,
                                containerWidth: a.width,
                                iconWidth: a.width,
                            })),
                        r.push(f || a.icon),
                        { children: r, attributes: i }
                    );
                });
        },
    },
    lg = {
        mixout: function () {
            return {
                layer: function (n) {
                    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
                        i = r.classes,
                        a = i === void 0 ? [] : i;
                    return Tr({ type: "layer" }, function () {
                        Mt("beforeDOMElementCreation", { assembler: n, params: r });
                        var o = [];
                        return (
                            n(function (s) {
                                Array.isArray(s)
                                    ? s.map(function (l) {
                                          o = o.concat(l.abstract);
                                      })
                                    : (o = o.concat(s.abstract));
                            }),
                            [
                                {
                                    tag: "span",
                                    attributes: { class: ["".concat(F.familyPrefix, "-layers")].concat(Or(a)).join(" ") },
                                    children: o,
                                },
                            ]
                        );
                    });
                },
            };
        },
    },
    cg = {
        mixout: function () {
            return {
                counter: function (n) {
                    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
                        i = r.title,
                        a = i === void 0 ? null : i,
                        o = r.classes,
                        s = o === void 0 ? [] : o,
                        l = r.attributes,
                        f = l === void 0 ? {} : l,
                        c = r.styles,
                        u = c === void 0 ? {} : c;
                    return Tr({ type: "counter", content: n }, function () {
                        return (
                            Mt("beforeDOMElementCreation", { content: n, params: r }),
                            Bh({
                                content: n.toString(),
                                title: a,
                                extra: { attributes: f, styles: u, classes: ["".concat(F.familyPrefix, "-layers-counter")].concat(Or(s)) },
                            })
                        );
                    });
                },
            };
        },
    },
    fg = {
        mixout: function () {
            return {
                text: function (n) {
                    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
                        i = r.transform,
                        a = i === void 0 ? Je : i,
                        o = r.title,
                        s = o === void 0 ? null : o,
                        l = r.classes,
                        f = l === void 0 ? [] : l,
                        c = r.attributes,
                        u = c === void 0 ? {} : c,
                        p = r.styles,
                        h = p === void 0 ? {} : p;
                    return Tr({ type: "text", content: n }, function () {
                        return (
                            Mt("beforeDOMElementCreation", { content: n, params: r }),
                            Oo({
                                content: n,
                                transform: T(T({}, Je), a),
                                title: s,
                                extra: { attributes: u, styles: h, classes: ["".concat(F.familyPrefix, "-layers-text")].concat(Or(f)) },
                            })
                        );
                    });
                },
            };
        },
        provides: function (t) {
            t.generateLayersText = function (n, r) {
                var i = r.title,
                    a = r.transform,
                    o = r.extra,
                    s = null,
                    l = null;
                if (bl) {
                    var f = parseInt(getComputedStyle(n).fontSize, 10),
                        c = n.getBoundingClientRect();
                    (s = c.width / f), (l = c.height / f);
                }
                return (
                    F.autoA11y && !i && (o.attributes["aria-hidden"] = "true"),
                    Promise.resolve([n, Oo({ content: n.innerHTML, width: s, height: l, transform: a, title: i, extra: o, watchable: !0 })])
                );
            };
        },
    },
    ug = new RegExp('"', "ug"),
    Mo = [1105920, 1112319];
function dg(e) {
    var t = e.replace(ug, ""),
        n = Eh(t, 0),
        r = n >= Mo[0] && n <= Mo[1],
        i = t.length === 2 ? t[0] === t[1] : !1;
    return { value: Ai(i ? t[0] : t), isSecondary: r || i };
}
function jo(e, t) {
    var n = "".concat(Zm).concat(t.replace(":", "-"));
    return new Promise(function (r, i) {
        if (e.getAttribute(n) !== null) return r();
        var a = fn(e.children),
            o = a.filter(function (ee) {
                return ee.getAttribute(ki) === t;
            })[0],
            s = xt.getComputedStyle(e, t),
            l = s.getPropertyValue("font-family").match(ih),
            f = s.getPropertyValue("font-weight"),
            c = s.getPropertyValue("content");
        if (o && !l) return e.removeChild(o), r();
        if (l && c !== "none" && c !== "") {
            var u = s.getPropertyValue("content"),
                p = ~["Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit"].indexOf(l[2]) ? lr[l[2].toLowerCase()] : ah[f],
                h = dg(u),
                k = h.value,
                P = h.isSecondary,
                S = l[0].startsWith("FontAwesome"),
                v = ha(p, k),
                w = v;
            if (S) {
                var R = Rh(k);
                R.iconName && R.prefix && ((v = R.iconName), (p = R.prefix));
            }
            if (v && !P && (!o || o.getAttribute(ca) !== p || o.getAttribute(fa) !== w)) {
                e.setAttribute(n, w), o && e.removeChild(o);
                var D = ng(),
                    U = D.extra;
                (U.attributes[ki] = t),
                    Pi(v, p)
                        .then(function (ee) {
                            var ce = va(
                                    T(T({}, D), {}, { icons: { main: ee, mask: ga() }, prefix: p, iconName: w, extra: U, watchable: !0 })
                                ),
                                W = le.createElement("svg");
                            t === "::before" ? e.insertBefore(W, e.firstChild) : e.appendChild(W),
                                (W.outerHTML = ce.map(function (X) {
                                    return $n(X);
                                }).join(`
`)),
                                e.removeAttribute(n),
                                r();
                        })
                        .catch(i);
            } else r();
        } else r();
    });
}
function pg(e) {
    return Promise.all([jo(e, "::before"), jo(e, "::after")]);
}
function mg(e) {
    return (
        e.parentNode !== document.head &&
        !~th.indexOf(e.tagName.toUpperCase()) &&
        !e.getAttribute(ki) &&
        (!e.parentNode || e.parentNode.tagName !== "svg")
    );
}
function Lo(e) {
    if (!!ct)
        return new Promise(function (t, n) {
            var r = fn(e.querySelectorAll("*")).filter(mg).map(pg),
                i = ba.begin("searchPseudoElements");
            Dl(),
                Promise.all(r)
                    .then(function () {
                        i(), Ti(), t();
                    })
                    .catch(function () {
                        i(), Ti(), n();
                    });
        });
}
var hg = {
        hooks: function () {
            return {
                mutationObserverCallbacks: function (n) {
                    return (n.pseudoElementsCallback = Lo), n;
                },
            };
        },
        provides: function (t) {
            t.pseudoElements2svg = function (n) {
                var r = n.node,
                    i = r === void 0 ? le : r;
                F.searchPseudoElements && Lo(i);
            };
        },
    },
    $o = !1,
    gg = {
        mixout: function () {
            return {
                dom: {
                    unwatch: function () {
                        Dl(), ($o = !0);
                    },
                },
            };
        },
        hooks: function () {
            return {
                bootstrap: function () {
                    To(Ci("mutationObserverCallbacks", {}));
                },
                noAuto: function () {
                    Jh();
                },
                watch: function (n) {
                    var r = n.observeMutationsRoot;
                    $o ? Ti() : To(Ci("mutationObserverCallbacks", { observeMutationsRoot: r }));
                },
            };
        },
    },
    zo = function (t) {
        var n = { size: 16, x: 0, y: 0, flipX: !1, flipY: !1, rotate: 0 };
        return t
            .toLowerCase()
            .split(" ")
            .reduce(function (r, i) {
                var a = i.toLowerCase().split("-"),
                    o = a[0],
                    s = a.slice(1).join("-");
                if (o && s === "h") return (r.flipX = !0), r;
                if (o && s === "v") return (r.flipY = !0), r;
                if (((s = parseFloat(s)), isNaN(s))) return r;
                switch (o) {
                    case "grow":
                        r.size = r.size + s;
                        break;
                    case "shrink":
                        r.size = r.size - s;
                        break;
                    case "left":
                        r.x = r.x - s;
                        break;
                    case "right":
                        r.x = r.x + s;
                        break;
                    case "up":
                        r.y = r.y - s;
                        break;
                    case "down":
                        r.y = r.y + s;
                        break;
                    case "rotate":
                        r.rotate = r.rotate + s;
                        break;
                }
                return r;
            }, n);
    },
    vg = {
        mixout: function () {
            return {
                parse: {
                    transform: function (n) {
                        return zo(n);
                    },
                },
            };
        },
        hooks: function () {
            return {
                parseNodeAttributes: function (n, r) {
                    var i = r.getAttribute("data-fa-transform");
                    return i && (n.transform = zo(i)), n;
                },
            };
        },
        provides: function (t) {
            t.generateAbstractTransformGrouping = function (n) {
                var r = n.main,
                    i = n.transform,
                    a = n.containerWidth,
                    o = n.iconWidth,
                    s = { transform: "translate(".concat(a / 2, " 256)") },
                    l = "translate(".concat(i.x * 32, ", ").concat(i.y * 32, ") "),
                    f = "scale(".concat((i.size / 16) * (i.flipX ? -1 : 1), ", ").concat((i.size / 16) * (i.flipY ? -1 : 1), ") "),
                    c = "rotate(".concat(i.rotate, " 0 0)"),
                    u = { transform: "".concat(l, " ").concat(f, " ").concat(c) },
                    p = { transform: "translate(".concat((o / 2) * -1, " -256)") },
                    h = { outer: s, inner: u, path: p };
                return {
                    tag: "g",
                    attributes: T({}, h.outer),
                    children: [
                        {
                            tag: "g",
                            attributes: T({}, h.inner),
                            children: [{ tag: r.icon.tag, children: r.icon.children, attributes: T(T({}, r.icon.attributes), h.path) }],
                        },
                    ],
                };
            };
        },
    },
    Kr = { x: 0, y: 0, width: "100%", height: "100%" };
function Fo(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
    return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function bg(e) {
    return e.tag === "g" ? e.children : [e];
}
var yg = {
        hooks: function () {
            return {
                parseNodeAttributes: function (n, r) {
                    var i = r.getAttribute("data-fa-mask"),
                        a = i
                            ? Ir(
                                  i.split(" ").map(function (o) {
                                      return o.trim();
                                  })
                              )
                            : ga();
                    return a.prefix || (a.prefix = kt()), (n.mask = a), (n.maskId = r.getAttribute("data-fa-mask-id")), n;
                },
            };
        },
        provides: function (t) {
            t.generateAbstractMask = function (n) {
                var r = n.children,
                    i = n.attributes,
                    a = n.main,
                    o = n.mask,
                    s = n.maskId,
                    l = n.transform,
                    f = a.width,
                    c = a.icon,
                    u = o.width,
                    p = o.icon,
                    h = vh({ transform: l, containerWidth: u, iconWidth: f }),
                    k = { tag: "rect", attributes: T(T({}, Kr), {}, { fill: "white" }) },
                    P = c.children ? { children: c.children.map(Fo) } : {},
                    S = {
                        tag: "g",
                        attributes: T({}, h.inner),
                        children: [Fo(T({ tag: c.tag, attributes: T(T({}, c.attributes), h.path) }, P))],
                    },
                    v = { tag: "g", attributes: T({}, h.outer), children: [S] },
                    w = "mask-".concat(s || Nn()),
                    R = "clip-".concat(s || Nn()),
                    D = {
                        tag: "mask",
                        attributes: T(T({}, Kr), {}, { id: w, maskUnits: "userSpaceOnUse", maskContentUnits: "userSpaceOnUse" }),
                        children: [k, v],
                    },
                    U = { tag: "defs", children: [{ tag: "clipPath", attributes: { id: R }, children: bg(p) }, D] };
                return (
                    r.push(U, {
                        tag: "rect",
                        attributes: T({ fill: "currentColor", "clip-path": "url(#".concat(R, ")"), mask: "url(#".concat(w, ")") }, Kr),
                    }),
                    { children: r, attributes: i }
                );
            };
        },
    },
    _g = {
        provides: function (t) {
            var n = !1;
            xt.matchMedia && (n = xt.matchMedia("(prefers-reduced-motion: reduce)").matches),
                (t.missingIconAbstract = function () {
                    var r = [],
                        i = { fill: "currentColor" },
                        a = { attributeType: "XML", repeatCount: "indefinite", dur: "2s" };
                    r.push({
                        tag: "path",
                        attributes: T(
                            T({}, i),
                            {},
                            {
                                d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z",
                            }
                        ),
                    });
                    var o = T(T({}, a), {}, { attributeName: "opacity" }),
                        s = { tag: "circle", attributes: T(T({}, i), {}, { cx: "256", cy: "364", r: "28" }), children: [] };
                    return (
                        n ||
                            s.children.push(
                                { tag: "animate", attributes: T(T({}, a), {}, { attributeName: "r", values: "28;14;28;28;14;28;" }) },
                                { tag: "animate", attributes: T(T({}, o), {}, { values: "1;0;1;1;0;1;" }) }
                            ),
                        r.push(s),
                        r.push({
                            tag: "path",
                            attributes: T(
                                T({}, i),
                                {},
                                {
                                    opacity: "1",
                                    d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z",
                                }
                            ),
                            children: n ? [] : [{ tag: "animate", attributes: T(T({}, o), {}, { values: "1;0;0;0;0;1;" }) }],
                        }),
                        n ||
                            r.push({
                                tag: "path",
                                attributes: T(
                                    T({}, i),
                                    {},
                                    {
                                        opacity: "0",
                                        d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z",
                                    }
                                ),
                                children: [{ tag: "animate", attributes: T(T({}, o), {}, { values: "0;0;1;1;0;0;" }) }],
                            }),
                        { tag: "g", attributes: { class: "missing" }, children: r }
                    );
                });
        },
    },
    wg = {
        hooks: function () {
            return {
                parseNodeAttributes: function (n, r) {
                    var i = r.getAttribute("data-fa-symbol"),
                        a = i === null ? !1 : i === "" ? !0 : i;
                    return (n.symbol = a), n;
                },
            };
        },
    },
    xg = [_h, sg, lg, cg, fg, hg, gg, vg, yg, _g, wg];
jh(xg, { mixoutsTo: Ie });
Ie.noAuto;
Ie.config;
var kg = Ie.library,
    Ag = Ie.dom,
    Ri = Ie.parse;
Ie.findIconDefinition;
Ie.toHtml;
var Eg = Ie.icon;
Ie.layer;
Ie.text;
Ie.counter;
var Cg = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
function Og(e, t) {
    return (t = { exports: {} }), e(t, t.exports), t.exports;
}
var Sg = Og(function (e) {
        (function (t) {
            var n = function (v, w, R) {
                    if (!f(w) || u(w) || p(w) || h(w) || l(w)) return w;
                    var D,
                        U = 0,
                        ee = 0;
                    if (c(w)) for (D = [], ee = w.length; U < ee; U++) D.push(n(v, w[U], R));
                    else {
                        D = {};
                        for (var ce in w) Object.prototype.hasOwnProperty.call(w, ce) && (D[v(ce, R)] = n(v, w[ce], R));
                    }
                    return D;
                },
                r = function (v, w) {
                    w = w || {};
                    var R = w.separator || "_",
                        D = w.split || /(?=[A-Z])/;
                    return v.split(D).join(R);
                },
                i = function (v) {
                    return k(v)
                        ? v
                        : ((v = v.replace(/[\-_\s]+(.)?/g, function (w, R) {
                              return R ? R.toUpperCase() : "";
                          })),
                          v.substr(0, 1).toLowerCase() + v.substr(1));
                },
                a = function (v) {
                    var w = i(v);
                    return w.substr(0, 1).toUpperCase() + w.substr(1);
                },
                o = function (v, w) {
                    return r(v, w).toLowerCase();
                },
                s = Object.prototype.toString,
                l = function (v) {
                    return typeof v == "function";
                },
                f = function (v) {
                    return v === Object(v);
                },
                c = function (v) {
                    return s.call(v) == "[object Array]";
                },
                u = function (v) {
                    return s.call(v) == "[object Date]";
                },
                p = function (v) {
                    return s.call(v) == "[object RegExp]";
                },
                h = function (v) {
                    return s.call(v) == "[object Boolean]";
                },
                k = function (v) {
                    return (v = v - 0), v === v;
                },
                P = function (v, w) {
                    var R = w && "process" in w ? w.process : w;
                    return typeof R != "function"
                        ? v
                        : function (D, U) {
                              return R(D, v, U);
                          };
                },
                S = {
                    camelize: i,
                    decamelize: o,
                    pascalize: a,
                    depascalize: o,
                    camelizeKeys: function (v, w) {
                        return n(P(i, w), v);
                    },
                    decamelizeKeys: function (v, w) {
                        return n(P(o, w), v, w);
                    },
                    pascalizeKeys: function (v, w) {
                        return n(P(a, w), v);
                    },
                    depascalizeKeys: function () {
                        return this.decamelizeKeys.apply(this, arguments);
                    },
                };
            e.exports ? (e.exports = S) : (t.humps = S);
        })(Cg);
    }),
    Do =
        typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
            ? function (e) {
                  return typeof e;
              }
            : function (e) {
                  return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
              },
    bn = function (e, t, n) {
        return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
    },
    Jn =
        Object.assign ||
        function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        },
    Pg = function (e, t) {
        var n = {};
        for (var r in e) t.indexOf(r) >= 0 || !Object.prototype.hasOwnProperty.call(e, r) || (n[r] = e[r]);
        return n;
    };
function Ig(e) {
    return e
        .split(";")
        .map(function (t) {
            return t.trim();
        })
        .filter(function (t) {
            return t;
        })
        .reduce(function (t, n) {
            var r = n.indexOf(":"),
                i = Sg.camelize(n.slice(0, r)),
                a = n.slice(r + 1).trim();
            return (t[i] = a), t;
        }, {});
}
function Tg(e) {
    return e.split(/\s+/).reduce(function (t, n) {
        return (t[n] = !0), t;
    }, {});
}
function Rg() {
    for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
    return t.reduce(function (r, i) {
        return Array.isArray(i) ? (r = r.concat(i)) : r.push(i), r;
    }, []);
}
function Bl(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
        r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {},
        i = (t.children || []).map(Bl.bind(null, e)),
        a = Object.keys(t.attributes || {}).reduce(
            function (h, k) {
                var P = t.attributes[k];
                switch (k) {
                    case "class":
                        h.class = Tg(P);
                        break;
                    case "style":
                        h.style = Ig(P);
                        break;
                    default:
                        h.attrs[k] = P;
                }
                return h;
            },
            { class: {}, style: {}, attrs: {} }
        ),
        o = r.class,
        s = o === void 0 ? {} : o,
        l = r.style,
        f = l === void 0 ? {} : l,
        c = r.attrs,
        u = c === void 0 ? {} : c,
        p = Pg(r, ["class", "style", "attrs"]);
    return typeof t == "string"
        ? t
        : e(t.tag, Jn({ class: Rg(a.class, s), style: Jn({}, a.style, f), attrs: Jn({}, a.attrs, u) }, p, { props: n }), i);
}
var Ul = !1;
try {
    Ul = !0;
} catch {}
function Ng() {
    if (!Ul && console && typeof console.error == "function") {
        var e;
        (e = console).error.apply(e, arguments);
    }
}
function Yr(e, t) {
    return (Array.isArray(t) && t.length > 0) || (!Array.isArray(t) && t) ? bn({}, e, t) : {};
}
function Mg(e) {
    var t,
        n =
            ((t = {
                "fa-spin": e.spin,
                "fa-spin-pulse": e.spinPulse,
                "fa-spin-reverse": e.spinReverse,
                "fa-pulse": e.pulse,
                "fa-beat": e.beat,
                "fa-fade": e.fade,
                "fa-flash": e.flash,
                "fa-fw": e.fixedWidth,
                "fa-border": e.border,
                "fa-li": e.listItem,
                "fa-inverse": e.inverse,
                "fa-flip-horizontal": e.flip === "horizontal" || e.flip === "both",
                "fa-flip-vertical": e.flip === "vertical" || e.flip === "both",
            }),
            bn(t, "fa-" + e.size, e.size !== null),
            bn(t, "fa-rotate-" + e.rotation, e.rotation !== null),
            bn(t, "fa-pull-" + e.pull, e.pull !== null),
            bn(t, "fa-swap-opacity", e.swapOpacity),
            t);
    return Object.keys(n)
        .map(function (r) {
            return n[r] ? r : null;
        })
        .filter(function (r) {
            return r;
        });
}
function Ho(e) {
    if (e && (typeof e == "undefined" ? "undefined" : Do(e)) === "object" && e.prefix && e.iconName && e.icon) return e;
    if (Ri.icon) return Ri.icon(e);
    if (e === null) return null;
    if ((typeof e == "undefined" ? "undefined" : Do(e)) === "object" && e.prefix && e.iconName) return e;
    if (Array.isArray(e) && e.length === 2) return { prefix: e[0], iconName: e[1] };
    if (typeof e == "string") return { prefix: "fas", iconName: e };
}
var jg = {
    name: "FontAwesomeIcon",
    functional: !0,
    props: {
        beat: { type: Boolean, default: !1 },
        border: { type: Boolean, default: !1 },
        fade: { type: Boolean, default: !1 },
        fixedWidth: { type: Boolean, default: !1 },
        flash: { type: Boolean, default: !1 },
        flip: {
            type: String,
            default: null,
            validator: function (t) {
                return ["horizontal", "vertical", "both"].indexOf(t) > -1;
            },
        },
        icon: { type: [Object, Array, String], required: !0 },
        mask: { type: [Object, Array, String], default: null },
        listItem: { type: Boolean, default: !1 },
        pull: {
            type: String,
            default: null,
            validator: function (t) {
                return ["right", "left"].indexOf(t) > -1;
            },
        },
        pulse: { type: Boolean, default: !1 },
        rotation: {
            type: [String, Number],
            default: null,
            validator: function (t) {
                return [90, 180, 270].indexOf(parseInt(t, 10)) > -1;
            },
        },
        swapOpacity: { type: Boolean, default: !1 },
        size: {
            type: String,
            default: null,
            validator: function (t) {
                return ["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"].indexOf(t) > -1;
            },
        },
        spin: { type: Boolean, default: !1 },
        spinPulse: { type: Boolean, default: !1 },
        spinReverse: { type: Boolean, default: !1 },
        transform: { type: [String, Object], default: null },
        symbol: { type: [Boolean, String], default: !1 },
        title: { type: String, default: null },
        inverse: { type: Boolean, default: !1 },
    },
    render: function (t, n) {
        var r = n.props,
            i = r.icon,
            a = r.mask,
            o = r.symbol,
            s = r.title,
            l = Ho(i),
            f = Yr("classes", Mg(r)),
            c = Yr("transform", typeof r.transform == "string" ? Ri.transform(r.transform) : r.transform),
            u = Yr("mask", Ho(a)),
            p = Eg(l, Jn({}, f, c, u, { symbol: o, title: s }));
        if (!p) return Ng("Could not find one or more icon(s)", l, u);
        var h = p.abstract,
            k = Bl.bind(null, t);
        return k(h[0], {}, n.data);
    },
};
/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */ var Lg = {
        prefix: "fas",
        iconName: "circle-check",
        icon: [
            512,
            512,
            [61533, "check-circle"],
            "f058",
            "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z",
        ],
    },
    $g = {
        prefix: "fas",
        iconName: "circle-info",
        icon: [
            512,
            512,
            ["info-circle"],
            "f05a",
            "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z",
        ],
    },
    zg = {
        prefix: "fas",
        iconName: "magnifying-glass",
        icon: [
            512,
            512,
            [128269, "search"],
            "f002",
            "M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z",
        ],
    };
Ag.watch();
const Rr = du(Bm);
kg.add(zg, $g, Lg);
Rr.component("font-awesome-icon", jg);
Rr.use(oa);
Rr.use(Rt);
Rr.mount("#app");
