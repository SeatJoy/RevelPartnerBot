var requirejs, require, define;
! function(global) {
    function isFunction(e) {
        return "[object Function]" === ostring.call(e)
    }

    function isArray(e) {
        return "[object Array]" === ostring.call(e)
    }

    function each(e, t) {
        if (e) {
            var n;
            for (n = 0; n < e.length && (!e[n] || !t(e[n], n, e)); n += 1);
        }
    }

    function eachReverse(e, t) {
        if (e) {
            var n;
            for (n = e.length - 1; n > -1 && (!e[n] || !t(e[n], n, e)); n -= 1);
        }
    }

    function hasProp(e, t) {
        return hasOwn.call(e, t)
    }

    function getOwn(e, t) {
        return hasProp(e, t) && e[t]
    }

    function eachProp(e, t) {
        var n;
        for (n in e)
            if (hasProp(e, n) && t(e[n], n)) break
    }

    function mixin(e, t, n, i) {
        return t && eachProp(t, function(t, r) {
            (n || !hasProp(e, r)) && (!i || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[r] = t : (e[r] || (e[r] = {}), mixin(e[r], t, n, i)))
        }), e
    }

    function bind(e, t) {
        return function() {
            return t.apply(e, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(e) {
        throw e
    }

    function getGlobal(e) {
        if (!e) return e;
        var t = global;
        return each(e.split("."), function(e) {
            t = t[e]
        }), t
    }

    function makeError(e, t, n, i) {
        var r = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
        return r.requireType = e, r.requireModules = i, n && (r.originalError = n), r
    }

    function newContext(e) {
        function t(e) {
            var t, n;
            for (t = 0; t < e.length; t++)
                if (n = e[t], "." === n) e.splice(t, 1), t -= 1;
                else if (".." === n) {
                if (0 === t || 1 == t && ".." === e[2] || ".." === e[t - 1]) continue;
                t > 0 && (e.splice(t - 1, 2), t -= 2)
            }
        }

        function n(e, n, i) {
            var r, o, a, s, u, c, l, f, h, d, p, g, m = n && n.split("/"),
                v = T.map,
                y = v && v["*"];
            if (e && (e = e.split("/"), l = e.length - 1, T.nodeIdCompat && jsSuffixRegExp.test(e[l]) && (e[l] = e[l].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && m && (g = m.slice(0, m.length - 1), e = g.concat(e)), t(e), e = e.join("/")), i && v && (m || y)) {
                a = e.split("/");
                e: for (s = a.length; s > 0; s -= 1) {
                    if (c = a.slice(0, s).join("/"), m)
                        for (u = m.length; u > 0; u -= 1)
                            if (o = getOwn(v, m.slice(0, u).join("/")), o && (o = getOwn(o, c))) {
                                f = o, h = s;
                                break e
                            }!d && y && getOwn(y, c) && (d = getOwn(y, c), p = s)
                }!f && d && (f = d, h = p), f && (a.splice(0, h, f), e = a.join("/"))
            }
            return r = getOwn(T.pkgs, e), r ? r : e
        }

        function i(e) {
            isBrowser && each(scripts(), function(t) {
                return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === x.contextName ? (t.parentNode.removeChild(t), !0) : void 0
            })
        }

        function r(e) {
            var t = getOwn(T.paths, e);
            return t && isArray(t) && t.length > 1 ? (t.shift(), x.require.undef(e), x.makeRequire(null, {
                skipMap: !0
            })([e]), !0) : void 0
        }

        function o(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function a(e, t, i, r) {
            var a, s, u, c, l = null,
                f = t ? t.name : null,
                h = e,
                d = !0,
                p = "";
            return e || (d = !1, e = "_@r" + (q += 1)), c = o(e), l = c[0], e = c[1], l && (l = n(l, f, r), s = getOwn(j, l)), e && (l ? p = s && s.normalize ? s.normalize(e, function(e) {
                return n(e, f, r)
            }) : -1 === e.indexOf("!") ? n(e, f, r) : e : (p = n(e, f, r), c = o(p), l = c[0], p = c[1], i = !0, a = x.nameToUrl(p))), u = !l || s || i ? "" : "_unnormalized" + (O += 1), {
                prefix: l,
                name: p,
                parentMap: t,
                unnormalized: !!u,
                url: a,
                originalName: h,
                isDefine: d,
                id: (l ? l + "!" + p : p) + u
            }
        }

        function s(e) {
            var t = e.id,
                n = getOwn(C, t);
            return n || (n = C[t] = new x.Module(e)), n
        }

        function u(e, t, n) {
            var i = e.id,
                r = getOwn(C, i);
            !hasProp(j, i) || r && !r.defineEmitComplete ? (r = s(e), r.error && "error" === t ? n(r.error) : r.on(t, n)) : "defined" === t && n(j[i])
        }

        function c(e, t) {
            var n = e.requireModules,
                i = !1;
            t ? t(e) : (each(n, function(t) {
                var n = getOwn(C, t);
                n && (n.error = e, n.events.error && (i = !0, n.emit("error", e)))
            }), i || req.onError(e))
        }

        function l() {
            globalDefQueue.length && (apsp.apply(A, [A.length, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function f(e) {
            delete C[e], delete E[e]
        }

        function h(e, t, n) {
            var i = e.map.id;
            e.error ? e.emit("error", e.error) : (t[i] = !0, each(e.depMaps, function(i, r) {
                var o = i.id,
                    a = getOwn(C, o);
                !a || e.depMatched[r] || n[o] || (getOwn(t, o) ? (e.defineDep(r, j[o]), e.check()) : h(a, t, n))
            }), n[i] = !0)
        }

        function d() {
            var e, t, n = 1e3 * T.waitSeconds,
                o = n && x.startTime + n < (new Date).getTime(),
                a = [],
                s = [],
                u = !1,
                l = !0;
            if (!y) {
                if (y = !0, eachProp(E, function(e) {
                        var n = e.map,
                            c = n.id;
                        if (e.enabled && (n.isDefine || s.push(e), !e.error))
                            if (!e.inited && o) r(c) ? (t = !0, u = !0) : (a.push(c), i(c));
                            else if (!e.inited && e.fetched && n.isDefine && (u = !0, !n.prefix)) return l = !1
                    }), o && a.length) return e = makeError("timeout", "Load timeout for modules: " + a, null, a), e.contextName = x.contextName, c(e);
                l && each(s, function(e) {
                    h(e, {}, {})
                }), o && !t || !u || !isBrowser && !isWebWorker || k || (k = setTimeout(function() {
                    k = 0, d()
                }, 50)), y = !1
            }
        }

        function p(e) {
            hasProp(j, e[0]) || s(a(e[0], null, !0)).init(e[1], e[2])
        }

        function g(e, t, n, i) {
            e.detachEvent && !isOpera ? i && e.detachEvent(i, t) : e.removeEventListener(n, t, !1)
        }

        function m(e) {
            var t = e.currentTarget || e.srcElement;
            return g(t, x.onScriptLoad, "load", "onreadystatechange"), g(t, x.onScriptError, "error"), {
                node: t,
                id: t && t.getAttribute("data-requiremodule")
            }
        }

        function v() {
            var e;
            for (l(); A.length;) {
                if (e = A.shift(), null === e[0]) return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                p(e)
            }
        }
        var y, b, x, w, k, T = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            C = {},
            E = {},
            S = {},
            A = [],
            j = {},
            _ = {},
            N = {},
            q = 1,
            O = 1;
        return w = {
            require: function(e) {
                return e.require ? e.require : e.require = x.makeRequire(e.map)
            },
            exports: function(e) {
                return e.usingExports = !0, e.map.isDefine ? e.exports ? j[e.map.id] = e.exports : e.exports = j[e.map.id] = {} : void 0
            },
            module: function(e) {
                return e.module ? e.module : e.module = {
                    id: e.map.id,
                    uri: e.map.url,
                    config: function() {
                        return getOwn(T.config, e.map.id) || {}
                    },
                    exports: e.exports || (e.exports = {})
                }
            }
        }, b = function(e) {
            this.events = getOwn(S, e.id) || {}, this.map = e, this.shim = getOwn(T.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, b.prototype = {
            init: function(e, t, n, i) {
                i = i || {}, this.inited || (this.factory = t, n ? this.on("error", n) : this.events.error && (n = bind(this, function(e) {
                    this.emit("error", e)
                })), this.depMaps = e && e.slice(0), this.errback = n, this.inited = !0, this.ignore = i.ignore, i.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(e, t) {
                this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, x.startTime = (new Date).getTime();
                    var e = this.map;
                    return this.shim ? void x.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return e.prefix ? this.callPlugin() : this.load()
                    })) : e.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function() {
                var e = this.map.url;
                _[e] || (_[e] = !0, x.load(this.map.id, e))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var e, t, n = this.map.id,
                        i = this.depExports,
                        r = this.exports,
                        o = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(o)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        r = x.execCb(n, o, i, r)
                                    } catch (a) {
                                        e = a
                                    } else r = x.execCb(n, o, i, r);
                                    if (this.map.isDefine && void 0 === r && (t = this.module, t ? r = t.exports : this.usingExports && (r = this.exports)), e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", c(this.error = e)
                                } else r = o;
                                this.exports = r, this.map.isDefine && !this.ignore && (j[n] = r, req.onResourceLoad && req.onResourceLoad(x, this.map, this.depMaps)), f(n), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else this.fetch()
                }
            },
            callPlugin: function() {
                var e = this.map,
                    t = e.id,
                    i = a(e.prefix);
                this.depMaps.push(i), u(i, "defined", bind(this, function(i) {
                    var r, o, l, h = getOwn(N, this.map.id),
                        d = this.map.name,
                        p = this.map.parentMap ? this.map.parentMap.name : null,
                        g = x.makeRequire(e.parentMap, {
                            enableBuildCallback: !0
                        });
                    return this.map.unnormalized ? (i.normalize && (d = i.normalize(d, function(e) {
                        return n(e, p, !0)
                    }) || ""), o = a(e.prefix + "!" + d, this.map.parentMap), u(o, "defined", bind(this, function(e) {
                        this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        })
                    })), l = getOwn(C, o.id), void(l && (this.depMaps.push(o), this.events.error && l.on("error", bind(this, function(e) {
                        this.emit("error", e)
                    })), l.enable()))) : h ? (this.map.url = x.nameToUrl(h), void this.load()) : (r = bind(this, function(e) {
                        this.init([], function() {
                            return e
                        }, null, {
                            enabled: !0
                        })
                    }), r.error = bind(this, function(e) {
                        this.inited = !0, this.error = e, e.requireModules = [t], eachProp(C, function(e) {
                            0 === e.map.id.indexOf(t + "_unnormalized") && f(e.map.id)
                        }), c(e)
                    }), r.fromText = bind(this, function(n, i) {
                        var o = e.name,
                            u = a(o),
                            l = useInteractive;
                        i && (n = i), l && (useInteractive = !1), s(u), hasProp(T.config, t) && (T.config[o] = T.config[t]);
                        try {
                            req.exec(n)
                        } catch (f) {
                            return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + f, f, [t]))
                        }
                        l && (useInteractive = !0), this.depMaps.push(u), x.completeLoad(o), g([o], r)
                    }), void i.load(e.name, g, r, T))
                })), x.enable(i, this), this.pluginMaps[i.id] = i
            },
            enable: function() {
                E[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
                    var n, i, r;
                    if ("string" == typeof e) {
                        if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, r = getOwn(w, e.id)) return void(this.depExports[t] = r(this));
                        this.depCount += 1, u(e, "defined", bind(this, function(e) {
                            this.defineDep(t, e), this.check()
                        })), this.errback && u(e, "error", bind(this, this.errback))
                    }
                    n = e.id, i = C[n], hasProp(w, n) || !i || i.enabled || x.enable(e, this)
                })), eachProp(this.pluginMaps, bind(this, function(e) {
                    var t = getOwn(C, e.id);
                    t && !t.enabled && x.enable(e, this)
                })), this.enabling = !1, this.check()
            },
            on: function(e, t) {
                var n = this.events[e];
                n || (n = this.events[e] = []), n.push(t)
            },
            emit: function(e, t) {
                each(this.events[e], function(e) {
                    e(t)
                }), "error" === e && delete this.events[e]
            }
        }, x = {
            config: T,
            contextName: e,
            registry: C,
            defined: j,
            urlFetched: _,
            defQueue: A,
            Module: b,
            makeModuleMap: a,
            nextTick: req.nextTick,
            onError: c,
            configure: function(e) {
                e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
                var t = T.shim,
                    n = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(e, function(e, t) {
                    n[t] ? (T[t] || (T[t] = {}), mixin(T[t], e, !0, !0)) : T[t] = e
                }), e.bundles && eachProp(e.bundles, function(e, t) {
                    each(e, function(e) {
                        e !== t && (N[e] = t)
                    })
                }), e.shim && (eachProp(e.shim, function(e, n) {
                    isArray(e) && (e = {
                        deps: e
                    }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = x.makeShimExports(e)), t[n] = e
                }), T.shim = t), e.packages && each(e.packages, function(e) {
                    var t, n;
                    e = "string" == typeof e ? {
                        name: e
                    } : e, n = e.name, t = e.location, t && (T.paths[n] = e.location), T.pkgs[n] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(C, function(e, t) {
                    e.inited || e.map.unnormalized || (e.map = a(t))
                }), (e.deps || e.callback) && x.require(e.deps || [], e.callback)
            },
            makeShimExports: function(e) {
                function t() {
                    var t;
                    return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                }
                return t
            },
            makeRequire: function(t, r) {
                function o(n, i, u) {
                    var l, f, h;
                    return r.enableBuildCallback && i && isFunction(i) && (i.__requireJsBuild = !0), "string" == typeof n ? isFunction(i) ? c(makeError("requireargs", "Invalid require call"), u) : t && hasProp(w, n) ? w[n](C[t.id]) : req.get ? req.get(x, n, t, o) : (f = a(n, t, !1, !0), l = f.id, hasProp(j, l) ? j[l] : c(makeError("notloaded", 'Module name "' + l + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (v(), x.nextTick(function() {
                        v(), h = s(a(null, t)), h.skipMap = r.skipMap, h.init(n, i, u, {
                            enabled: !0
                        }), d()
                    }), o)
                }
                return r = r || {}, mixin(o, {
                    isBrowser: isBrowser,
                    toUrl: function(e) {
                        var i, r = e.lastIndexOf("."),
                            o = e.split("/")[0],
                            a = "." === o || ".." === o;
                        return -1 !== r && (!a || r > 1) && (i = e.substring(r, e.length), e = e.substring(0, r)), x.nameToUrl(n(e, t && t.id, !0), i, !0)
                    },
                    defined: function(e) {
                        return hasProp(j, a(e, t, !1, !0).id)
                    },
                    specified: function(e) {
                        return e = a(e, t, !1, !0).id, hasProp(j, e) || hasProp(C, e)
                    }
                }), t || (o.undef = function(e) {
                    l();
                    var n = a(e, t, !0),
                        r = getOwn(C, e);
                    i(e), delete j[e], delete _[n.url], delete S[e], eachReverse(A, function(t, n) {
                        t[0] === e && A.splice(n, 1)
                    }), r && (r.events.defined && (S[e] = r.events), f(e))
                }), o
            },
            enable: function(e) {
                var t = getOwn(C, e.id);
                t && s(e).enable()
            },
            completeLoad: function(e) {
                var t, n, i, o = getOwn(T.shim, e) || {},
                    a = o.exports;
                for (l(); A.length;) {
                    if (n = A.shift(), null === n[0]) {
                        if (n[0] = e, t) break;
                        t = !0
                    } else n[0] === e && (t = !0);
                    p(n)
                }
                if (i = getOwn(C, e), !t && !hasProp(j, e) && i && !i.inited) {
                    if (!(!T.enforceDefine || a && getGlobal(a))) return r(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
                    p([e, o.deps || [], o.exportsFn])
                }
                d()
            },
            nameToUrl: function(e, t, n) {
                var i, r, o, a, s, u, c, l = getOwn(T.pkgs, e);
                if (l && (e = l), c = getOwn(N, e)) return x.nameToUrl(c, t, n);
                if (req.jsExtRegExp.test(e)) s = e + (t || "");
                else {
                    for (i = T.paths, r = e.split("/"), o = r.length; o > 0; o -= 1)
                        if (a = r.slice(0, o).join("/"), u = getOwn(i, a)) {
                            isArray(u) && (u = u[0]), r.splice(0, o, u);
                            break
                        }
                    s = r.join("/"), s += t || (/^data\:|\?/.test(s) || n ? "" : ".js"), s = ("/" === s.charAt(0) || s.match(/^[\w\+\.\-]+:/) ? "" : T.baseUrl) + s
                }
                return T.urlArgs ? s + ((-1 === s.indexOf("?") ? "?" : "&") + T.urlArgs) : s
            },
            load: function(e, t) {
                req.load(x, e, t)
            },
            execCb: function(e, t, n, i) {
                return t.apply(i, n)
            },
            onScriptLoad: function(e) {
                if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                    interactiveScript = null;
                    var t = m(e);
                    x.completeLoad(t.id)
                }
            },
            onScriptError: function(e) {
                var t = m(e);
                return r(t.id) ? void 0 : c(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
            }
        }, x.require = x.makeRequire(), x
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(e) {
            return "interactive" === e.readyState ? interactiveScript = e : void 0
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.15",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(e, t, n, i) {
            var r, o, a = defContextName;
            return isArray(e) || "string" == typeof e || (o = e, isArray(t) ? (e = t, t = n, n = i) : e = []), o && o.context && (a = o.context), r = getOwn(contexts, a), r || (r = contexts[a] = req.s.newContext(a)), o && r.configure(o), r.require(e, t, n)
        }, req.config = function(e) {
            return req(e)
        }, req.nextTick = "undefined" != typeof setTimeout ? function(e) {
            setTimeout(e, 4)
        } : function(e) {
            e()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
            req[e] = function() {
                var t = contexts[defContextName];
                return t.require[e].apply(t, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(e, t, n) {
            var i = e.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return i.type = e.scriptType || "text/javascript", i.charset = "utf-8", i.async = !0, i
        }, req.load = function(e, t, n) {
            var i, r = e && e.config || {};
            if (isBrowser) return i = req.createNode(r, t, n), i.setAttribute("data-requirecontext", e.contextName), i.setAttribute("data-requiremodule", t), !i.attachEvent || i.attachEvent.toString && i.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (i.addEventListener("load", e.onScriptLoad, !1), i.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, i.attachEvent("onreadystatechange", e.onScriptLoad)), i.src = n, currentlyAddingScript = i, baseElement ? head.insertBefore(i, baseElement) : head.appendChild(i), currentlyAddingScript = null, i;
            if (isWebWorker) try {
                importScripts(n), e.completeLoad(t)
            } catch (o) {
                e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + n, o, [t]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
            return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
        }), define = function(e, t, n) {
            var i, r;
            "string" != typeof e && (n = t, t = e, e = null), isArray(t) || (n = t, t = null), !t && isFunction(n) && (t = [], n.length && (n.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(e, n) {
                t.push(n)
            }), t = (1 === n.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (i = currentlyAddingScript || getInteractiveScript(), i && (e || (e = i.getAttribute("data-requiremodule")), r = contexts[i.getAttribute("data-requirecontext")])), (r ? r.defQueue : globalDefQueue).push([e, t, n])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function(text) {
            return eval(text)
        }, req(cfg)
    }
}(this), define("requireLib", function() {}),
    function() {
        var e = this,
            t = e._,
            n = {},
            i = Array.prototype,
            r = Object.prototype,
            o = Function.prototype,
            a = i.push,
            s = i.slice,
            u = i.concat,
            c = r.toString,
            l = r.hasOwnProperty,
            f = i.forEach,
            h = i.map,
            d = i.reduce,
            p = i.reduceRight,
            g = i.filter,
            m = i.every,
            v = i.some,
            y = i.indexOf,
            b = i.lastIndexOf,
            x = Array.isArray,
            w = Object.keys,
            k = o.bind,
            T = function(e) {
                return e instanceof T ? e : this instanceof T ? void(this._wrapped = e) : new T(e)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = T), exports._ = T) : e._ = T, T.VERSION = "1.5.2";
        var C = T.each = T.forEach = function(e, t, i) {
            if (null != e)
                if (f && e.forEach === f) e.forEach(t, i);
                else if (e.length === +e.length) {
                for (var r = 0, o = e.length; o > r; r++)
                    if (t.call(i, e[r], r, e) === n) return
            } else
                for (var a = T.keys(e), r = 0, o = a.length; o > r; r++)
                    if (t.call(i, e[a[r]], a[r], e) === n) return
        };
        T.map = T.collect = function(e, t, n) {
            var i = [];
            return null == e ? i : h && e.map === h ? e.map(t, n) : (C(e, function(e, r, o) {
                i.push(t.call(n, e, r, o))
            }), i)
        };
        var E = "Reduce of empty array with no initial value";
        T.reduce = T.foldl = T.inject = function(e, t, n, i) {
            var r = arguments.length > 2;
            if (null == e && (e = []), d && e.reduce === d) return i && (t = T.bind(t, i)), r ? e.reduce(t, n) : e.reduce(t);
            if (C(e, function(e, o, a) {
                    r ? n = t.call(i, n, e, o, a) : (n = e, r = !0)
                }), !r) throw new TypeError(E);
            return n
        }, T.reduceRight = T.foldr = function(e, t, n, i) {
            var r = arguments.length > 2;
            if (null == e && (e = []), p && e.reduceRight === p) return i && (t = T.bind(t, i)), r ? e.reduceRight(t, n) : e.reduceRight(t);
            var o = e.length;
            if (o !== +o) {
                var a = T.keys(e);
                o = a.length
            }
            if (C(e, function(s, u, c) {
                    u = a ? a[--o] : --o, r ? n = t.call(i, n, e[u], u, c) : (n = e[u], r = !0)
                }), !r) throw new TypeError(E);
            return n
        }, T.find = T.detect = function(e, t, n) {
            var i;
            return S(e, function(e, r, o) {
                return t.call(n, e, r, o) ? (i = e, !0) : void 0
            }), i
        }, T.filter = T.select = function(e, t, n) {
            var i = [];
            return null == e ? i : g && e.filter === g ? e.filter(t, n) : (C(e, function(e, r, o) {
                t.call(n, e, r, o) && i.push(e)
            }), i)
        }, T.reject = function(e, t, n) {
            return T.filter(e, function(e, i, r) {
                return !t.call(n, e, i, r)
            }, n)
        }, T.every = T.all = function(e, t, i) {
            t || (t = T.identity);
            var r = !0;
            return null == e ? r : m && e.every === m ? e.every(t, i) : (C(e, function(e, o, a) {
                return (r = r && t.call(i, e, o, a)) ? void 0 : n
            }), !!r)
        };
        var S = T.some = T.any = function(e, t, i) {
            t || (t = T.identity);
            var r = !1;
            return null == e ? r : v && e.some === v ? e.some(t, i) : (C(e, function(e, o, a) {
                return r || (r = t.call(i, e, o, a)) ? n : void 0
            }), !!r)
        };
        T.contains = T.include = function(e, t) {
            return null == e ? !1 : y && e.indexOf === y ? -1 != e.indexOf(t) : S(e, function(e) {
                return e === t
            })
        }, T.invoke = function(e, t) {
            var n = s.call(arguments, 2),
                i = T.isFunction(t);
            return T.map(e, function(e) {
                return (i ? t : e[t]).apply(e, n)
            })
        }, T.pluck = function(e, t) {
            return T.map(e, function(e) {
                return e[t]
            })
        }, T.where = function(e, t, n) {
            return T.isEmpty(t) ? n ? void 0 : [] : T[n ? "find" : "filter"](e, function(e) {
                for (var n in t)
                    if (t[n] !== e[n]) return !1;
                return !0
            })
        }, T.findWhere = function(e, t) {
            return T.where(e, t, !0)
        }, T.max = function(e, t, n) {
            if (!t && T.isArray(e) && e[0] === +e[0] && 65535 > e.length) return Math.max.apply(Math, e);
            if (!t && T.isEmpty(e)) return -1 / 0;
            var i = {
                computed: -1 / 0,
                value: -1 / 0
            };
            return C(e, function(e, r, o) {
                var a = t ? t.call(n, e, r, o) : e;
                a > i.computed && (i = {
                    value: e,
                    computed: a
                })
            }), i.value
        }, T.min = function(e, t, n) {
            if (!t && T.isArray(e) && e[0] === +e[0] && 65535 > e.length) return Math.min.apply(Math, e);
            if (!t && T.isEmpty(e)) return 1 / 0;
            var i = {
                computed: 1 / 0,
                value: 1 / 0
            };
            return C(e, function(e, r, o) {
                var a = t ? t.call(n, e, r, o) : e;
                i.computed > a && (i = {
                    value: e,
                    computed: a
                })
            }), i.value
        }, T.shuffle = function(e) {
            var t, n = 0,
                i = [];
            return C(e, function(e) {
                t = T.random(n++), i[n - 1] = i[t], i[t] = e
            }), i
        }, T.sample = function(e, t, n) {
            return 2 > arguments.length || n ? e[T.random(e.length - 1)] : T.shuffle(e).slice(0, Math.max(0, t))
        };
        var A = function(e) {
            return T.isFunction(e) ? e : function(t) {
                return t[e]
            }
        };
        T.sortBy = function(e, t, n) {
            var i = A(t);
            return T.pluck(T.map(e, function(e, t, r) {
                return {
                    value: e,
                    index: t,
                    criteria: i.call(n, e, t, r)
                }
            }).sort(function(e, t) {
                var n = e.criteria,
                    i = t.criteria;
                if (n !== i) {
                    if (n > i || void 0 === n) return 1;
                    if (i > n || void 0 === i) return -1
                }
                return e.index - t.index
            }), "value")
        };
        var j = function(e) {
            return function(t, n, i) {
                var r = {},
                    o = null == n ? T.identity : A(n);
                return C(t, function(n, a) {
                    var s = o.call(i, n, a, t);
                    e(r, s, n)
                }), r
            }
        };
        T.groupBy = j(function(e, t, n) {
            (T.has(e, t) ? e[t] : e[t] = []).push(n)
        }), T.indexBy = j(function(e, t, n) {
            e[t] = n
        }), T.countBy = j(function(e, t) {
            T.has(e, t) ? e[t]++ : e[t] = 1
        }), T.sortedIndex = function(e, t, n, i) {
            n = null == n ? T.identity : A(n);
            for (var r = n.call(i, t), o = 0, a = e.length; a > o;) {
                var s = o + a >>> 1;
                r > n.call(i, e[s]) ? o = s + 1 : a = s
            }
            return o
        }, T.toArray = function(e) {
            return e ? T.isArray(e) ? s.call(e) : e.length === +e.length ? T.map(e, T.identity) : T.values(e) : []
        }, T.size = function(e) {
            return null == e ? 0 : e.length === +e.length ? e.length : T.keys(e).length
        }, T.first = T.head = T.take = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[0] : s.call(e, 0, t)
        }, T.initial = function(e, t, n) {
            return s.call(e, 0, e.length - (null == t || n ? 1 : t))
        }, T.last = function(e, t, n) {
            return null == e ? void 0 : null == t || n ? e[e.length - 1] : s.call(e, Math.max(e.length - t, 0))
        }, T.rest = T.tail = T.drop = function(e, t, n) {
            return s.call(e, null == t || n ? 1 : t)
        }, T.compact = function(e) {
            return T.filter(e, T.identity)
        };
        var _ = function(e, t, n) {
            return t && T.every(e, T.isArray) ? u.apply(n, e) : (C(e, function(e) {
                T.isArray(e) || T.isArguments(e) ? t ? a.apply(n, e) : _(e, t, n) : n.push(e)
            }), n)
        };
        T.flatten = function(e, t) {
            return _(e, t, [])
        }, T.without = function(e) {
            return T.difference(e, s.call(arguments, 1))
        }, T.uniq = T.unique = function(e, t, n, i) {
            T.isFunction(t) && (i = n, n = t, t = !1);
            var r = n ? T.map(e, n, i) : e,
                o = [],
                a = [];
            return C(r, function(n, i) {
                (t ? i && a[a.length - 1] === n : T.contains(a, n)) || (a.push(n), o.push(e[i]))
            }), o
        }, T.union = function() {
            return T.uniq(T.flatten(arguments, !0))
        }, T.intersection = function(e) {
            var t = s.call(arguments, 1);
            return T.filter(T.uniq(e), function(e) {
                return T.every(t, function(t) {
                    return T.indexOf(t, e) >= 0
                })
            })
        }, T.difference = function(e) {
            var t = u.apply(i, s.call(arguments, 1));
            return T.filter(e, function(e) {
                return !T.contains(t, e)
            })
        }, T.zip = function() {
            for (var e = T.max(T.pluck(arguments, "length").concat(0)), t = Array(e), n = 0; e > n; n++) t[n] = T.pluck(arguments, "" + n);
            return t
        }, T.object = function(e, t) {
            if (null == e) return {};
            for (var n = {}, i = 0, r = e.length; r > i; i++) t ? n[e[i]] = t[i] : n[e[i][0]] = e[i][1];
            return n
        }, T.indexOf = function(e, t, n) {
            if (null == e) return -1;
            var i = 0,
                r = e.length;
            if (n) {
                if ("number" != typeof n) return i = T.sortedIndex(e, t), e[i] === t ? i : -1;
                i = 0 > n ? Math.max(0, r + n) : n
            }
            if (y && e.indexOf === y) return e.indexOf(t, n);
            for (; r > i; i++)
                if (e[i] === t) return i;
            return -1
        }, T.lastIndexOf = function(e, t, n) {
            if (null == e) return -1;
            var i = null != n;
            if (b && e.lastIndexOf === b) return i ? e.lastIndexOf(t, n) : e.lastIndexOf(t);
            for (var r = i ? n : e.length; r--;)
                if (e[r] === t) return r;
            return -1
        }, T.range = function(e, t, n) {
            1 >= arguments.length && (t = e || 0, e = 0), n = arguments[2] || 1;
            for (var i = Math.max(Math.ceil((t - e) / n), 0), r = 0, o = Array(i); i > r;) o[r++] = e, e += n;
            return o
        };
        var N = function() {};
        T.bind = function(e, t) {
            var n, i;
            if (k && e.bind === k) return k.apply(e, s.call(arguments, 1));
            if (!T.isFunction(e)) throw new TypeError;
            return n = s.call(arguments, 2), i = function() {
                if (!(this instanceof i)) return e.apply(t, n.concat(s.call(arguments)));
                N.prototype = e.prototype;
                var r = new N;
                N.prototype = null;
                var o = e.apply(r, n.concat(s.call(arguments)));
                return Object(o) === o ? o : r
            }
        }, T.partial = function(e) {
            var t = s.call(arguments, 1);
            return function() {
                return e.apply(this, t.concat(s.call(arguments)))
            }
        }, T.bindAll = function(e) {
            var t = s.call(arguments, 1);
            if (0 === t.length) throw Error("bindAll must be passed function names");
            return C(t, function(t) {
                e[t] = T.bind(e[t], e)
            }), e
        }, T.memoize = function(e, t) {
            var n = {};
            return t || (t = T.identity),
                function() {
                    var i = t.apply(this, arguments);
                    return T.has(n, i) ? n[i] : n[i] = e.apply(this, arguments)
                }
        }, T.delay = function(e, t) {
            var n = s.call(arguments, 2);
            return setTimeout(function() {
                return e.apply(null, n)
            }, t)
        }, T.defer = function(e) {
            return T.delay.apply(T, [e, 1].concat(s.call(arguments, 1)))
        }, T.throttle = function(e, t, n) {
            var i, r, o, a = null,
                s = 0;
            n || (n = {});
            var u = function() {
                s = n.leading === !1 ? 0 : new Date, a = null, o = e.apply(i, r)
            };
            return function() {
                var c = new Date;
                s || n.leading !== !1 || (s = c);
                var l = t - (c - s);
                return i = this, r = arguments, 0 >= l ? (clearTimeout(a), a = null, s = c, o = e.apply(i, r)) : a || n.trailing === !1 || (a = setTimeout(u, l)), o
            }
        }, T.debounce = function(e, t, n) {
            var i, r, o, a, s;
            return function() {
                o = this, r = arguments, a = new Date;
                var u = function() {
                        var c = new Date - a;
                        t > c ? i = setTimeout(u, t - c) : (i = null, n || (s = e.apply(o, r)))
                    },
                    c = n && !i;
                return i || (i = setTimeout(u, t)), c && (s = e.apply(o, r)), s
            }
        }, T.once = function(e) {
            var t, n = !1;
            return function() {
                return n ? t : (n = !0, t = e.apply(this, arguments), e = null, t)
            }
        }, T.wrap = function(e, t) {
            return function() {
                var n = [e];
                return a.apply(n, arguments), t.apply(this, n)
            }
        }, T.compose = function() {
            var e = arguments;
            return function() {
                for (var t = arguments, n = e.length - 1; n >= 0; n--) t = [e[n].apply(this, t)];
                return t[0]
            }
        }, T.after = function(e, t) {
            return function() {
                return 1 > --e ? t.apply(this, arguments) : void 0
            }
        }, T.keys = w || function(e) {
            if (e !== Object(e)) throw new TypeError("Invalid object");
            var t = [];
            for (var n in e) T.has(e, n) && t.push(n);
            return t
        }, T.values = function(e) {
            for (var t = T.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++) i[r] = e[t[r]];
            return i
        }, T.pairs = function(e) {
            for (var t = T.keys(e), n = t.length, i = Array(n), r = 0; n > r; r++) i[r] = [t[r], e[t[r]]];
            return i
        }, T.invert = function(e) {
            for (var t = {}, n = T.keys(e), i = 0, r = n.length; r > i; i++) t[e[n[i]]] = n[i];
            return t
        }, T.functions = T.methods = function(e) {
            var t = [];
            for (var n in e) T.isFunction(e[n]) && t.push(n);
            return t.sort()
        }, T.extend = function(e) {
            return C(s.call(arguments, 1), function(t) {
                if (t)
                    for (var n in t) e[n] = t[n]
            }), e
        }, T.pick = function(e) {
            var t = {},
                n = u.apply(i, s.call(arguments, 1));
            return C(n, function(n) {
                n in e && (t[n] = e[n])
            }), t
        }, T.omit = function(e) {
            var t = {},
                n = u.apply(i, s.call(arguments, 1));
            for (var r in e) T.contains(n, r) || (t[r] = e[r]);
            return t
        }, T.defaults = function(e) {
            return C(s.call(arguments, 1), function(t) {
                if (t)
                    for (var n in t) void 0 === e[n] && (e[n] = t[n])
            }), e
        }, T.clone = function(e) {
            return T.isObject(e) ? T.isArray(e) ? e.slice() : T.extend({}, e) : e
        }, T.tap = function(e, t) {
            return t(e), e
        };
        var q = function(e, t, n, i) {
            if (e === t) return 0 !== e || 1 / e == 1 / t;
            if (null == e || null == t) return e === t;
            e instanceof T && (e = e._wrapped), t instanceof T && (t = t._wrapped);
            var r = c.call(e);
            if (r != c.call(t)) return !1;
            switch (r) {
                case "[object String]":
                    return e == t + "";
                case "[object Number]":
                    return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
                case "[object Date]":
                case "[object Boolean]":
                    return +e == +t;
                case "[object RegExp]":
                    return e.source == t.source && e.global == t.global && e.multiline == t.multiline && e.ignoreCase == t.ignoreCase
            }
            if ("object" != typeof e || "object" != typeof t) return !1;
            for (var o = n.length; o--;)
                if (n[o] == e) return i[o] == t;
            var a = e.constructor,
                s = t.constructor;
            if (a !== s && !(T.isFunction(a) && a instanceof a && T.isFunction(s) && s instanceof s)) return !1;
            n.push(e), i.push(t);
            var u = 0,
                l = !0;
            if ("[object Array]" == r) {
                if (u = e.length, l = u == t.length)
                    for (; u-- && (l = q(e[u], t[u], n, i)););
            } else {
                for (var f in e)
                    if (T.has(e, f) && (u++, !(l = T.has(t, f) && q(e[f], t[f], n, i)))) break;
                if (l) {
                    for (f in t)
                        if (T.has(t, f) && !u--) break;
                    l = !u
                }
            }
            return n.pop(), i.pop(), l
        };
        T.isEqual = function(e, t) {
            return q(e, t, [], [])
        }, T.isEmpty = function(e) {
            if (null == e) return !0;
            if (T.isArray(e) || T.isString(e)) return 0 === e.length;
            for (var t in e)
                if (T.has(e, t)) return !1;
            return !0
        }, T.isElement = function(e) {
            return !(!e || 1 !== e.nodeType)
        }, T.isArray = x || function(e) {
            return "[object Array]" == c.call(e)
        }, T.isObject = function(e) {
            return e === Object(e)
        }, C(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(e) {
            T["is" + e] = function(t) {
                return c.call(t) == "[object " + e + "]"
            }
        }), T.isArguments(arguments) || (T.isArguments = function(e) {
            return !(!e || !T.has(e, "callee"))
        }), "function" != typeof /./ && (T.isFunction = function(e) {
            return "function" == typeof e
        }), T.isFinite = function(e) {
            return isFinite(e) && !isNaN(parseFloat(e))
        }, T.isNaN = function(e) {
            return T.isNumber(e) && e != +e
        }, T.isBoolean = function(e) {
            return e === !0 || e === !1 || "[object Boolean]" == c.call(e)
        }, T.isNull = function(e) {
            return null === e
        }, T.isUndefined = function(e) {
            return void 0 === e
        }, T.has = function(e, t) {
            return l.call(e, t)
        }, T.noConflict = function() {
            return e._ = t, this
        }, T.identity = function(e) {
            return e
        }, T.times = function(e, t, n) {
            for (var i = Array(Math.max(0, e)), r = 0; e > r; r++) i[r] = t.call(n, r);
            return i
        }, T.random = function(e, t) {
            return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
        };
        var O = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;"
            }
        };
        O.unescape = T.invert(O.escape);
        var D = {
            escape: RegExp("[" + T.keys(O.escape).join("") + "]", "g"),
            unescape: RegExp("(" + T.keys(O.unescape).join("|") + ")", "g")
        };
        T.each(["escape", "unescape"], function(e) {
            T[e] = function(t) {
                return null == t ? "" : ("" + t).replace(D[e], function(t) {
                    return O[e][t]
                })
            }
        }), T.result = function(e, t) {
            if (null != e) {
                var n = e[t];
                return T.isFunction(n) ? n.call(e) : n
            }
        }, T.mixin = function(e) {
            C(T.functions(e), function(t) {
                var n = T[t] = e[t];
                T.prototype[t] = function() {
                    var e = [this._wrapped];
                    return a.apply(e, arguments), H.call(this, n.apply(T, e))
                }
            })
        };
        var I = 0;
        T.uniqueId = function(e) {
            var t = ++I + "";
            return e ? e + t : t
        }, T.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var M = /(.)^/,
            $ = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "   ": "t",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        T.template = function(e, t, n) {
            var i;
            n = T.defaults({}, n, T.templateSettings);
            var r = RegExp([(n.escape || M).source, (n.interpolate || M).source, (n.evaluate || M).source].join("|") + "|$", "g"),
                o = 0,
                a = "__p+='";
            e.replace(r, function(t, n, i, r, s) {
                return a += e.slice(o, s).replace(L, function(e) {
                    return "\\" + $[e]
                }), n && (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'"), i && (a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'"), r && (a += "';\n" + r + "\n__p+='"), o = s + t.length, t
            }), a += "';\n", n.variable || (a = "with(obj||{}){\n" + a + "}\n"), a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + a + "return __p;\n";
            try {
                i = Function(n.variable || "obj", "_", a)
            } catch (s) {
                throw s.source = a, s
            }
            if (t) return i(t, T);
            var u = function(e) {
                return i.call(this, e, T)
            };
            return u.source = "function(" + (n.variable || "obj") + "){\n" + a + "}", u
        }, T.chain = function(e) {
            return T(e).chain()
        };
        var H = function(e) {
            return this._chain ? T(e).chain() : e
        };
        T.mixin(T), C(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
            var t = i[e];
            T.prototype[e] = function() {
                var n = this._wrapped;
                return t.apply(n, arguments), "shift" != e && "splice" != e || 0 !== n.length || delete n[0], H.call(this, n)
            }
        }), C(["concat", "join", "slice"], function(e) {
            var t = i[e];
            T.prototype[e] = function() {
                return H.call(this, t.apply(this._wrapped, arguments))
            }
        }), T.extend(T.prototype, {
            chain: function() {
                return this._chain = !0, this
            },
            value: function() {
                return this._wrapped
            }
        }), "function" == typeof define && define.amd && define("underscore", [], function() {
            return T
        })
    }.call(this), ! function(e, t) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document) throw new Error("jQuery requires a window with a document");
            return t(e)
        } : t(e)
    }("undefined" != typeof window ? window : this, function(e, t) {
        function n(e) {
            var t = e.length,
                n = Z.type(e);
            return "function" === n || Z.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
        }

        function i(e, t, n) {
            if (Z.isFunction(t)) return Z.grep(e, function(e, i) {
                return !!t.call(e, i, e) !== n
            });
            if (t.nodeType) return Z.grep(e, function(e) {
                return e === t !== n
            });
            if ("string" == typeof t) {
                if (se.test(t)) return Z.filter(t, e, n);
                t = Z.filter(t, e)
            }
            return Z.grep(e, function(e) {
                return X.call(t, e) >= 0 !== n
            })
        }

        function r(e, t) {
            for (;
                (e = e[t]) && 1 !== e.nodeType;);
            return e
        }

        function o(e) {
            var t = pe[e] = {};
            return Z.each(e.match(de) || [], function(e, n) {
                t[n] = !0
            }), t
        }

        function a() {
            J.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), Z.ready()
        }

        function s() {
            Object.defineProperty(this.cache = {}, 0, {
                get: function() {
                    return {}
                }
            }), this.expando = Z.expando + s.uid++
        }

        function u(e, t, n) {
            var i;
            if (void 0 === n && 1 === e.nodeType)
                if (i = "data-" + t.replace(xe, "-$1").toLowerCase(), n = e.getAttribute(i), "string" == typeof n) {
                    try {
                        n = "true" === n ? !0 : "false" === n ? !1 : "null" === n ? null : +n + "" === n ? +n : be.test(n) ? Z.parseJSON(n) : n
                    } catch (r) {}
                    ye.set(e, t, n)
                } else n = void 0;
            return n
        }

        function c() {
            return !0
        }

        function l() {
            return !1
        }

        function f() {
            try {
                return J.activeElement
            } catch (e) {}
        }

        function h(e, t) {
            return Z.nodeName(e, "table") && Z.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
        }

        function d(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
        }

        function p(e) {
            var t = $e.exec(e.type);
            return t ? e.type = t[1] : e.removeAttribute("type"), e
        }

        function g(e, t) {
            for (var n = 0, i = e.length; i > n; n++) ve.set(e[n], "globalEval", !t || ve.get(t[n], "globalEval"))
        }

        function m(e, t) {
            var n, i, r, o, a, s, u, c;
            if (1 === t.nodeType) {
                if (ve.hasData(e) && (o = ve.access(e), a = ve.set(t, o), c = o.events)) {
                    delete a.handle, a.events = {};
                    for (r in c)
                        for (n = 0, i = c[r].length; i > n; n++) Z.event.add(t, r, c[r][n])
                }
                ye.hasData(e) && (s = ye.access(e), u = Z.extend({}, s), ye.set(t, u))
            }
        }

        function v(e, t) {
            var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
            return void 0 === t || t && Z.nodeName(e, t) ? Z.merge([e], n) : n
        }

        function y(e, t) {
            var n = t.nodeName.toLowerCase();
            "input" === n && Ce.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }

        function b(t, n) {
            var i, r = Z(n.createElement(t)).appendTo(n.body),
                o = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(r[0])) ? i.display : Z.css(r[0], "display");
            return r.detach(), o
        }

        function x(e) {
            var t = J,
                n = Fe[e];
            return n || (n = b(e, t), "none" !== n && n || (Re = (Re || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), t = Re[0].contentDocument, t.write(), t.close(), n = b(e, t), Re.detach()), Fe[e] = n), n
        }

        function w(e, t, n) {
            var i, r, o, a, s = e.style;
            return n = n || ze(e), n && (a = n.getPropertyValue(t) || n[t]), n && ("" !== a || Z.contains(e.ownerDocument, e) || (a = Z.style(e, t)), Be.test(a) && Pe.test(t) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o)), void 0 !== a ? a + "" : a
        }

        function k(e, t) {
            return {
                get: function() {
                    return e() ? void delete this.get : (this.get = t).apply(this, arguments)
                }
            }
        }

        function T(e, t) {
            if (t in e) return t;
            for (var n = t[0].toUpperCase() + t.slice(1), i = t, r = Ve.length; r--;)
                if (t = Ve[r] + n, t in e) return t;
            return i
        }

        function C(e, t, n) {
            var i = Ue.exec(t);
            return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t
        }

        function E(e, t, n, i, r) {
            for (var o = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += Z.css(e, n + ke[o], !0, r)), i ? ("content" === n && (a -= Z.css(e, "padding" + ke[o], !0, r)), "margin" !== n && (a -= Z.css(e, "border" + ke[o] + "Width", !0, r))) : (a += Z.css(e, "padding" + ke[o], !0, r), "padding" !== n && (a += Z.css(e, "border" + ke[o] + "Width", !0, r)));
            return a
        }

        function S(e, t, n) {
            var i = !0,
                r = "width" === t ? e.offsetWidth : e.offsetHeight,
                o = ze(e),
                a = "border-box" === Z.css(e, "boxSizing", !1, o);
            if (0 >= r || null == r) {
                if (r = w(e, t, o), (0 > r || null == r) && (r = e.style[t]), Be.test(r)) return r;
                i = a && (Q.boxSizingReliable() || r === e.style[t]), r = parseFloat(r) || 0
            }
            return r + E(e, t, n || (a ? "border" : "content"), i, o) + "px"
        }

        function A(e, t) {
            for (var n, i, r, o = [], a = 0, s = e.length; s > a; a++) i = e[a], i.style && (o[a] = ve.get(i, "olddisplay"), n = i.style.display, t ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && Te(i) && (o[a] = ve.access(i, "olddisplay", x(i.nodeName)))) : (r = Te(i), "none" === n && r || ve.set(i, "olddisplay", r ? n : Z.css(i, "display"))));
            for (a = 0; s > a; a++) i = e[a], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[a] || "" : "none"));
            return e
        }

        function j(e, t, n, i, r) {
            return new j.prototype.init(e, t, n, i, r)
        }

        function _() {
            return setTimeout(function() {
                Qe = void 0
            }), Qe = Z.now()
        }

        function N(e, t) {
            var n, i = 0,
                r = {
                    height: e
                };
            for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = ke[i], r["margin" + n] = r["padding" + n] = e;
            return t && (r.opacity = r.width = e), r
        }

        function q(e, t, n) {
            for (var i, r = (nt[t] || []).concat(nt["*"]), o = 0, a = r.length; a > o; o++)
                if (i = r[o].call(n, t, e)) return i
        }

        function O(e, t, n) {
            var i, r, o, a, s, u, c, l, f = this,
                h = {},
                d = e.style,
                p = e.nodeType && Te(e),
                g = ve.get(e, "fxshow");
            n.queue || (s = Z._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
                s.unqueued || u()
            }), s.unqueued++, f.always(function() {
                f.always(function() {
                    s.unqueued--, Z.queue(e, "fx").length || s.empty.fire()
                })
            })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], c = Z.css(e, "display"), l = "none" === c ? ve.get(e, "olddisplay") || x(e.nodeName) : c, "inline" === l && "none" === Z.css(e, "float") && (d.display = "inline-block")), n.overflow && (d.overflow = "hidden", f.always(function() {
                d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
            }));
            for (i in t)
                if (r = t[i], Ke.exec(r)) {
                    if (delete t[i], o = o || "toggle" === r, r === (p ? "hide" : "show")) {
                        if ("show" !== r || !g || void 0 === g[i]) continue;
                        p = !0
                    }
                    h[i] = g && g[i] || Z.style(e, i)
                } else c = void 0;
            if (Z.isEmptyObject(h)) "inline" === ("none" === c ? x(e.nodeName) : c) && (d.display = c);
            else {
                g ? "hidden" in g && (p = g.hidden) : g = ve.access(e, "fxshow", {}), o && (g.hidden = !p), p ? Z(e).show() : f.done(function() {
                    Z(e).hide()
                }), f.done(function() {
                    var t;
                    ve.remove(e, "fxshow");
                    for (t in h) Z.style(e, t, h[t])
                });
                for (i in h) a = q(p ? g[i] : 0, i, f), i in g || (g[i] = a.start, p && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function D(e, t) {
            var n, i, r, o, a;
            for (n in e)
                if (i = Z.camelCase(n), r = t[i], o = e[n], Z.isArray(o) && (r = o[1], o = e[n] = o[0]), n !== i && (e[i] = o, delete e[n]), a = Z.cssHooks[i], a && "expand" in a) {
                    o = a.expand(o), delete e[i];
                    for (n in o) n in e || (e[n] = o[n], t[n] = r)
                } else t[i] = r
        }

        function I(e, t, n) {
            var i, r, o = 0,
                a = tt.length,
                s = Z.Deferred().always(function() {
                    delete u.elem
                }),
                u = function() {
                    if (r) return !1;
                    for (var t = Qe || _(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, o = 1 - i, a = 0, u = c.tweens.length; u > a; a++) c.tweens[a].run(o);
                    return s.notifyWith(e, [c, o, n]), 1 > o && u ? n : (s.resolveWith(e, [c]), !1)
                },
                c = s.promise({
                    elem: e,
                    props: Z.extend({}, t),
                    opts: Z.extend(!0, {
                        specialEasing: {}
                    }, n),
                    originalProperties: t,
                    originalOptions: n,
                    startTime: Qe || _(),
                    duration: n.duration,
                    tweens: [],
                    createTween: function(t, n) {
                        var i = Z.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                        return c.tweens.push(i), i
                    },
                    stop: function(t) {
                        var n = 0,
                            i = t ? c.tweens.length : 0;
                        if (r) return this;
                        for (r = !0; i > n; n++) c.tweens[n].run(1);
                        return t ? s.resolveWith(e, [c, t]) : s.rejectWith(e, [c, t]), this
                    }
                }),
                l = c.props;
            for (D(l, c.opts.specialEasing); a > o; o++)
                if (i = tt[o].call(c, e, l, c.opts)) return i;
            return Z.map(l, q, c), Z.isFunction(c.opts.start) && c.opts.start.call(e, c), Z.fx.timer(Z.extend(u, {
                elem: e,
                anim: c,
                queue: c.opts.queue
            })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }

        function M(e) {
            return function(t, n) {
                "string" != typeof t && (n = t, t = "*");
                var i, r = 0,
                    o = t.toLowerCase().match(de) || [];
                if (Z.isFunction(n))
                    for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n)
            }
        }

        function $(e, t, n, i) {
            function r(s) {
                var u;
                return o[s] = !0, Z.each(e[s] || [], function(e, s) {
                    var c = s(t, n, i);
                    return "string" != typeof c || a || o[c] ? a ? !(u = c) : void 0 : (t.dataTypes.unshift(c), r(c), !1)
                }), u
            }
            var o = {},
                a = e === bt;
            return r(t.dataTypes[0]) || !o["*"] && r("*")
        }

        function L(e, t) {
            var n, i, r = Z.ajaxSettings.flatOptions || {};
            for (n in t) void 0 !== t[n] && ((r[n] ? e : i || (i = {}))[n] = t[n]);
            return i && Z.extend(!0, e, i), e
        }

        function H(e, t, n) {
            for (var i, r, o, a, s = e.contents, u = e.dataTypes;
                "*" === u[0];) u.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
            if (i)
                for (r in s)
                    if (s[r] && s[r].test(i)) {
                        u.unshift(r);
                        break
                    }
            if (u[0] in n) o = u[0];
            else {
                for (r in n) {
                    if (!u[0] || e.converters[r + " " + u[0]]) {
                        o = r;
                        break
                    }
                    a || (a = r)
                }
                o = o || a
            }
            return o ? (o !== u[0] && u.unshift(o), n[o]) : void 0
        }

        function R(e, t, n, i) {
            var r, o, a, s, u, c = {},
                l = e.dataTypes.slice();
            if (l[1])
                for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
            for (o = l.shift(); o;)
                if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = l.shift())
                    if ("*" === o) o = u;
                    else if ("*" !== u && u !== o) {
                if (a = c[u + " " + o] || c["* " + o], !a)
                    for (r in c)
                        if (s = r.split(" "), s[1] === o && (a = c[u + " " + s[0]] || c["* " + s[0]])) {
                            a === !0 ? a = c[r] : c[r] !== !0 && (o = s[0], l.unshift(s[1]));
                            break
                        }
                if (a !== !0)
                    if (a && e["throws"]) t = a(t);
                    else try {
                        t = a(t)
                    } catch (f) {
                        return {
                            state: "parsererror",
                            error: a ? f : "No conversion from " + u + " to " + o
                        }
                    }
            }
            return {
                state: "success",
                data: t
            }
        }

        function F(e, t, n, i) {
            var r;
            if (Z.isArray(t)) Z.each(t, function(t, r) {
                n || Ct.test(e) ? i(e, r) : F(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, i)
            });
            else if (n || "object" !== Z.type(t)) i(e, t);
            else
                for (r in t) F(e + "[" + r + "]", t[r], n, i)
        }

        function P(e) {
            return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
        }
        var B = [],
            z = B.slice,
            W = B.concat,
            U = B.push,
            X = B.indexOf,
            Y = {},
            G = Y.toString,
            V = Y.hasOwnProperty,
            Q = {},
            J = e.document,
            K = "2.1.3",
            Z = function(e, t) {
                return new Z.fn.init(e, t)
            },
            ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            te = /^-ms-/,
            ne = /-([\da-z])/gi,
            ie = function(e, t) {
                return t.toUpperCase()
            };
        Z.fn = Z.prototype = {
            jquery: K,
            constructor: Z,
            selector: "",
            length: 0,
            toArray: function() {
                return z.call(this)
            },
            get: function(e) {
                return null != e ? 0 > e ? this[e + this.length] : this[e] : z.call(this)
            },
            pushStack: function(e) {
                var t = Z.merge(this.constructor(), e);
                return t.prevObject = this, t.context = this.context, t
            },
            each: function(e, t) {
                return Z.each(this, e, t)
            },
            map: function(e) {
                return this.pushStack(Z.map(this, function(t, n) {
                    return e.call(t, n, t)
                }))
            },
            slice: function() {
                return this.pushStack(z.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            eq: function(e) {
                var t = this.length,
                    n = +e + (0 > e ? t : 0);
                return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor(null)
            },
            push: U,
            sort: B.sort,
            splice: B.splice
        }, Z.extend = Z.fn.extend = function() {
            var e, t, n, i, r, o, a = arguments[0] || {},
                s = 1,
                u = arguments.length,
                c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || Z.isFunction(a) || (a = {}), s === u && (a = this, s--); u > s; s++)
                if (null != (e = arguments[s]))
                    for (t in e) n = a[t], i = e[t], a !== i && (c && i && (Z.isPlainObject(i) || (r = Z.isArray(i))) ? (r ? (r = !1, o = n && Z.isArray(n) ? n : []) : o = n && Z.isPlainObject(n) ? n : {}, a[t] = Z.extend(c, o, i)) : void 0 !== i && (a[t] = i));
            return a
        }, Z.extend({
            expando: "jQuery" + (K + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isFunction: function(e) {
                return "function" === Z.type(e)
            },
            isArray: Array.isArray,
            isWindow: function(e) {
                return null != e && e === e.window
            },
            isNumeric: function(e) {
                return !Z.isArray(e) && e - parseFloat(e) + 1 >= 0
            },
            isPlainObject: function(e) {
                return "object" !== Z.type(e) || e.nodeType || Z.isWindow(e) ? !1 : e.constructor && !V.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e) return !1;
                return !0
            },
            type: function(e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? Y[G.call(e)] || "object" : typeof e
            },
            globalEval: function(e) {
                var t, n = eval;
                e = Z.trim(e), e && (1 === e.indexOf("use strict") ? (t = J.createElement("script"), t.text = e, J.head.appendChild(t).parentNode.removeChild(t)) : n(e))
            },
            camelCase: function(e) {
                return e.replace(te, "ms-").replace(ne, ie)
            },
            nodeName: function(e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function(e, t, i) {
                var r, o = 0,
                    a = e.length,
                    s = n(e);
                if (i) {
                    if (s)
                        for (; a > o && (r = t.apply(e[o], i), r !== !1); o++);
                    else
                        for (o in e)
                            if (r = t.apply(e[o], i), r === !1) break
                } else if (s)
                    for (; a > o && (r = t.call(e[o], o, e[o]), r !== !1); o++);
                else
                    for (o in e)
                        if (r = t.call(e[o], o, e[o]), r === !1) break; return e
            },
            trim: function(e) {
                return null == e ? "" : (e + "").replace(ee, "")
            },
            makeArray: function(e, t) {
                var i = t || [];
                return null != e && (n(Object(e)) ? Z.merge(i, "string" == typeof e ? [e] : e) : U.call(i, e)), i
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : X.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, i = 0, r = e.length; n > i; i++) e[r++] = t[i];
                return e.length = r, e
            },
            grep: function(e, t, n) {
                for (var i, r = [], o = 0, a = e.length, s = !n; a > o; o++) i = !t(e[o], o), i !== s && r.push(e[o]);
                return r
            },
            map: function(e, t, i) {
                var r, o = 0,
                    a = e.length,
                    s = n(e),
                    u = [];
                if (s)
                    for (; a > o; o++) r = t(e[o], o, i), null != r && u.push(r);
                else
                    for (o in e) r = t(e[o], o, i), null != r && u.push(r);
                return W.apply([], u)
            },
            guid: 1,
            proxy: function(e, t) {
                var n, i, r;
                return "string" == typeof t && (n = e[t], t = e, e = n), Z.isFunction(e) ? (i = z.call(arguments, 2), r = function() {
                    return e.apply(t || this, i.concat(z.call(arguments)))
                }, r.guid = e.guid = e.guid || Z.guid++, r) : void 0
            },
            now: Date.now,
            support: Q
        }), Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
            Y["[object " + t + "]"] = t.toLowerCase()
        });
        var re = function(e) {
            function t(e, t, n, i) {
                var r, o, a, s, u, c, f, d, p, g;
                if ((t ? t.ownerDocument || t : F) !== O && q(t), t = t || O, n = n || [], s = t.nodeType, "string" != typeof e || !e || 1 !== s && 9 !== s && 11 !== s) return n;
                if (!i && I) {
                    if (11 !== s && (r = ye.exec(e)))
                        if (a = r[1]) {
                            if (9 === s) {
                                if (o = t.getElementById(a), !o || !o.parentNode) return n;
                                if (o.id === a) return n.push(o), n
                            } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && H(t, o) && o.id === a) return n.push(o), n
                        } else {
                            if (r[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                            if ((a = r[3]) && w.getElementsByClassName) return K.apply(n, t.getElementsByClassName(a)), n
                        }
                    if (w.qsa && (!M || !M.test(e))) {
                        if (d = f = R, p = t, g = 1 !== s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                            for (c = E(e), (f = t.getAttribute("id")) ? d = f.replace(xe, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", u = c.length; u--;) c[u] = d + h(c[u]);
                            p = be.test(e) && l(t.parentNode) || t, g = c.join(",")
                        }
                        if (g) try {
                            return K.apply(n, p.querySelectorAll(g)), n
                        } catch (m) {} finally {
                            f || t.removeAttribute("id")
                        }
                    }
                }
                return A(e.replace(ue, "$1"), t, n, i)
            }

            function n() {
                function e(n, i) {
                    return t.push(n + " ") > k.cacheLength && delete e[t.shift()], e[n + " "] = i
                }
                var t = [];
                return e
            }

            function i(e) {
                return e[R] = !0, e
            }

            function r(e) {
                var t = O.createElement("div");
                try {
                    return !!e(t)
                } catch (n) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t), t = null
                }
            }

            function o(e, t) {
                for (var n = e.split("|"), i = e.length; i--;) k.attrHandle[n[i]] = t
            }

            function a(e, t) {
                var n = t && e,
                    i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Y) - (~e.sourceIndex || Y);
                if (i) return i;
                if (n)
                    for (; n = n.nextSibling;)
                        if (n === t) return -1;
                return e ? 1 : -1
            }

            function s(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return "input" === n && t.type === e
                }
            }

            function u(e) {
                return function(t) {
                    var n = t.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && t.type === e
                }
            }

            function c(e) {
                return i(function(t) {
                    return t = +t, i(function(n, i) {
                        for (var r, o = e([], n.length, t), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                    })
                })
            }

            function l(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }

            function f() {}

            function h(e) {
                for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
                return i
            }

            function d(e, t, n) {
                var i = t.dir,
                    r = n && "parentNode" === i,
                    o = B++;
                return t.first ? function(t, n, o) {
                    for (; t = t[i];)
                        if (1 === t.nodeType || r) return e(t, n, o)
                } : function(t, n, a) {
                    var s, u, c = [P, o];
                    if (a) {
                        for (; t = t[i];)
                            if ((1 === t.nodeType || r) && e(t, n, a)) return !0
                    } else
                        for (; t = t[i];)
                            if (1 === t.nodeType || r) {
                                if (u = t[R] || (t[R] = {}), (s = u[i]) && s[0] === P && s[1] === o) return c[2] = s[2];
                                if (u[i] = c, c[2] = e(t, n, a)) return !0
                            }
                }
            }

            function p(e) {
                return e.length > 1 ? function(t, n, i) {
                    for (var r = e.length; r--;)
                        if (!e[r](t, n, i)) return !1;
                    return !0
                } : e[0]
            }

            function g(e, n, i) {
                for (var r = 0, o = n.length; o > r; r++) t(e, n[r], i);
                return i
            }

            function m(e, t, n, i, r) {
                for (var o, a = [], s = 0, u = e.length, c = null != t; u > s; s++)(o = e[s]) && (!n || n(o, i, r)) && (a.push(o), c && t.push(s));
                return a
            }

            function v(e, t, n, r, o, a) {
                return r && !r[R] && (r = v(r)), o && !o[R] && (o = v(o, a)), i(function(i, a, s, u) {
                    var c, l, f, h = [],
                        d = [],
                        p = a.length,
                        v = i || g(t || "*", s.nodeType ? [s] : s, []),
                        y = !e || !i && t ? v : m(v, h, e, s, u),
                        b = n ? o || (i ? e : p || r) ? [] : a : y;
                    if (n && n(y, b, s, u), r)
                        for (c = m(b, d), r(c, [], s, u), l = c.length; l--;)(f = c[l]) && (b[d[l]] = !(y[d[l]] = f));
                    if (i) {
                        if (o || e) {
                            if (o) {
                                for (c = [], l = b.length; l--;)(f = b[l]) && c.push(y[l] = f);
                                o(null, b = [], c, u)
                            }
                            for (l = b.length; l--;)(f = b[l]) && (c = o ? ee(i, f) : h[l]) > -1 && (i[c] = !(a[c] = f))
                        }
                    } else b = m(b === a ? b.splice(p, b.length) : b), o ? o(null, a, b, u) : K.apply(a, b)
                })
            }

            function y(e) {
                for (var t, n, i, r = e.length, o = k.relative[e[0].type], a = o || k.relative[" "], s = o ? 1 : 0, u = d(function(e) {
                        return e === t
                    }, a, !0), c = d(function(e) {
                        return ee(t, e) > -1
                    }, a, !0), l = [function(e, n, i) {
                        var r = !o && (i || n !== j) || ((t = n).nodeType ? u(e, n, i) : c(e, n, i));
                        return t = null, r
                    }]; r > s; s++)
                    if (n = k.relative[e[s].type]) l = [d(p(l), n)];
                    else {
                        if (n = k.filter[e[s].type].apply(null, e[s].matches), n[R]) {
                            for (i = ++s; r > i && !k.relative[e[i].type]; i++);
                            return v(s > 1 && p(l), s > 1 && h(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace(ue, "$1"), n, i > s && y(e.slice(s, i)), r > i && y(e = e.slice(i)), r > i && h(e))
                        }
                        l.push(n)
                    }
                return p(l)
            }

            function b(e, n) {
                var r = n.length > 0,
                    o = e.length > 0,
                    a = function(i, a, s, u, c) {
                        var l, f, h, d = 0,
                            p = "0",
                            g = i && [],
                            v = [],
                            y = j,
                            b = i || o && k.find.TAG("*", c),
                            x = P += null == y ? 1 : Math.random() || .1,
                            w = b.length;
                        for (c && (j = a !== O && a); p !== w && null != (l = b[p]); p++) {
                            if (o && l) {
                                for (f = 0; h = e[f++];)
                                    if (h(l, a, s)) {
                                        u.push(l);
                                        break
                                    }
                                c && (P = x)
                            }
                            r && ((l = !h && l) && d--, i && g.push(l))
                        }
                        if (d += p, r && p !== d) {
                            for (f = 0; h = n[f++];) h(g, v, a, s);
                            if (i) {
                                if (d > 0)
                                    for (; p--;) g[p] || v[p] || (v[p] = Q.call(u));
                                v = m(v)
                            }
                            K.apply(u, v), c && !i && v.length > 0 && d + n.length > 1 && t.uniqueSort(u)
                        }
                        return c && (P = x, j = y), g
                    };
                return r ? i(a) : a
            }
            var x, w, k, T, C, E, S, A, j, _, N, q, O, D, I, M, $, L, H, R = "sizzle" + 1 * new Date,
                F = e.document,
                P = 0,
                B = 0,
                z = n(),
                W = n(),
                U = n(),
                X = function(e, t) {
                    return e === t && (N = !0), 0
                },
                Y = 1 << 31,
                G = {}.hasOwnProperty,
                V = [],
                Q = V.pop,
                J = V.push,
                K = V.push,
                Z = V.slice,
                ee = function(e, t) {
                    for (var n = 0, i = e.length; i > n; n++)
                        if (e[n] === t) return n;
                    return -1
                },
                te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                ne = "[\\x20\\t\\r\\n\\f]",
                ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                re = ie.replace("w", "w#"),
                oe = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]",
                ae = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + oe + ")*)|.*)\\)|)",
                se = new RegExp(ne + "+", "g"),
                ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
                ce = new RegExp("^" + ne + "*," + ne + "*"),
                le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
                fe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
                he = new RegExp(ae),
                de = new RegExp("^" + re + "$"),
                pe = {
                    ID: new RegExp("^#(" + ie + ")"),
                    CLASS: new RegExp("^\\.(" + ie + ")"),
                    TAG: new RegExp("^(" + ie.replace("w", "w*") + ")"),
                    ATTR: new RegExp("^" + oe),
                    PSEUDO: new RegExp("^" + ae),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + te + ")$", "i"),
                    needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
                },
                ge = /^(?:input|select|textarea|button)$/i,
                me = /^h\d$/i,
                ve = /^[^{]+\{\s*\[native \w/,
                ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                be = /[+~]/,
                xe = /'|\\/g,
                we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
                ke = function(e, t, n) {
                    var i = "0x" + t - 65536;
                    return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320)
                },
                Te = function() {
                    q()
                };
            try {
                K.apply(V = Z.call(F.childNodes), F.childNodes), V[F.childNodes.length].nodeType
            } catch (Ce) {
                K = {
                    apply: V.length ? function(e, t) {
                        J.apply(e, Z.call(t))
                    } : function(e, t) {
                        for (var n = e.length, i = 0; e[n++] = t[i++];);
                        e.length = n - 1
                    }
                }
            }
            w = t.support = {}, C = t.isXML = function(e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return t ? "HTML" !== t.nodeName : !1
            }, q = t.setDocument = function(e) {
                var t, n, i = e ? e.ownerDocument || e : F;
                return i !== O && 9 === i.nodeType && i.documentElement ? (O = i, D = i.documentElement, n = i.defaultView, n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)), I = !C(i), w.attributes = r(function(e) {
                    return e.className = "i", !e.getAttribute("className")
                }), w.getElementsByTagName = r(function(e) {
                    return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length
                }), w.getElementsByClassName = ve.test(i.getElementsByClassName), w.getById = r(function(e) {
                    return D.appendChild(e).id = R, !i.getElementsByName || !i.getElementsByName(R).length
                }), w.getById ? (k.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && I) {
                        var n = t.getElementById(e);
                        return n && n.parentNode ? [n] : []
                    }
                }, k.filter.ID = function(e) {
                    var t = e.replace(we, ke);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }) : (delete k.find.ID, k.filter.ID = function(e) {
                    var t = e.replace(we, ke);
                    return function(e) {
                        var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return n && n.value === t
                    }
                }), k.find.TAG = w.getElementsByTagName ? function(e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
                } : function(e, t) {
                    var n, i = [],
                        r = 0,
                        o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return o
                }, k.find.CLASS = w.getElementsByClassName && function(e, t) {
                    return I ? t.getElementsByClassName(e) : void 0
                }, $ = [], M = [], (w.qsa = ve.test(i.querySelectorAll)) && (r(function(e) {
                    D.appendChild(e).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && M.push("[*^$]=" + ne + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || M.push("\\[" + ne + "*(?:value|" + te + ")"), e.querySelectorAll("[id~=" + R + "-]").length || M.push("~="), e.querySelectorAll(":checked").length || M.push(":checked"), e.querySelectorAll("a#" + R + "+*").length || M.push(".#.+[+~]")
                }), r(function(e) {
                    var t = i.createElement("input");
                    t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && M.push("name" + ne + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), M.push(",.*:")
                })), (w.matchesSelector = ve.test(L = D.matches || D.webkitMatchesSelector || D.mozMatchesSelector || D.oMatchesSelector || D.msMatchesSelector)) && r(function(e) {
                    w.disconnectedMatch = L.call(e, "div"), L.call(e, "[s!='']:x"), $.push("!=", ae)
                }), M = M.length && new RegExp(M.join("|")), $ = $.length && new RegExp($.join("|")), t = ve.test(D.compareDocumentPosition), H = t || ve.test(D.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e,
                        i = t && t.parentNode;
                    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)))
                } : function(e, t) {
                    if (t)
                        for (; t = t.parentNode;)
                            if (t === e) return !0;
                    return !1
                }, X = t ? function(e, t) {
                    if (e === t) return N = !0, 0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n ? n : (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === i || e.ownerDocument === F && H(F, e) ? -1 : t === i || t.ownerDocument === F && H(F, t) ? 1 : _ ? ee(_, e) - ee(_, t) : 0 : 4 & n ? -1 : 1)
                } : function(e, t) {
                    if (e === t) return N = !0, 0;
                    var n, r = 0,
                        o = e.parentNode,
                        s = t.parentNode,
                        u = [e],
                        c = [t];
                    if (!o || !s) return e === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : _ ? ee(_, e) - ee(_, t) : 0;
                    if (o === s) return a(e, t);
                    for (n = e; n = n.parentNode;) u.unshift(n);
                    for (n = t; n = n.parentNode;) c.unshift(n);
                    for (; u[r] === c[r];) r++;
                    return r ? a(u[r], c[r]) : u[r] === F ? -1 : c[r] === F ? 1 : 0
                }, i) : O
            }, t.matches = function(e, n) {
                return t(e, null, null, n)
            }, t.matchesSelector = function(e, n) {
                if ((e.ownerDocument || e) !== O && q(e), n = n.replace(fe, "='$1']"), !(!w.matchesSelector || !I || $ && $.test(n) || M && M.test(n))) try {
                    var i = L.call(e, n);
                    if (i || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) return i
                } catch (r) {}
                return t(n, O, null, [e]).length > 0
            }, t.contains = function(e, t) {
                return (e.ownerDocument || e) !== O && q(e), H(e, t)
            }, t.attr = function(e, t) {
                (e.ownerDocument || e) !== O && q(e);
                var n = k.attrHandle[t.toLowerCase()],
                    i = n && G.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !I) : void 0;
                return void 0 !== i ? i : w.attributes || !I ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }, t.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }, t.uniqueSort = function(e) {
                var t, n = [],
                    i = 0,
                    r = 0;
                if (N = !w.detectDuplicates, _ = !w.sortStable && e.slice(0), e.sort(X), N) {
                    for (; t = e[r++];) t === e[r] && (i = n.push(r));
                    for (; i--;) e.splice(n[i], 1)
                }
                return _ = null, e
            }, T = t.getText = function(e) {
                var t, n = "",
                    i = 0,
                    r = e.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += T(e)
                    } else if (3 === r || 4 === r) return e.nodeValue
                } else
                    for (; t = e[i++];) n += T(t);
                return n
            }, k = t.selectors = {
                cacheLength: 50,
                createPseudo: i,
                match: pe,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(we, ke), e[3] = (e[3] || e[4] || e[5] || "").replace(we, ke), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]), e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && he.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(we, ke).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        } : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = z[e + " "];
                        return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && z(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(e, n, i) {
                        return function(r) {
                            var o = t.attr(r, e);
                            return null == o ? "!=" === n : n ? (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(i) > -1 : "|=" === n ? o === i || o.slice(0, i.length + 1) === i + "-" : !1) : !0
                        }
                    },
                    CHILD: function(e, t, n, i, r) {
                        var o = "nth" !== e.slice(0, 3),
                            a = "last" !== e.slice(-4),
                            s = "of-type" === t;
                        return 1 === i && 0 === r ? function(e) {
                            return !!e.parentNode
                        } : function(t, n, u) {
                            var c, l, f, h, d, p, g = o !== a ? "nextSibling" : "previousSibling",
                                m = t.parentNode,
                                v = s && t.nodeName.toLowerCase(),
                                y = !u && !s;
                            if (m) {
                                if (o) {
                                    for (; g;) {
                                        for (f = t; f = f[g];)
                                            if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                        p = g = "only" === e && !p && "nextSibling"
                                    }
                                    return !0
                                }
                                if (p = [a ? m.firstChild : m.lastChild], a && y) {
                                    for (l = m[R] || (m[R] = {}), c = l[e] || [], d = c[0] === P && c[1], h = c[0] === P && c[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (h = d = 0) || p.pop();)
                                        if (1 === f.nodeType && ++h && f === t) {
                                            l[e] = [P, d, h];
                                            break
                                        }
                                } else if (y && (c = (t[R] || (t[R] = {}))[e]) && c[0] === P) h = c[1];
                                else
                                    for (;
                                        (f = ++d && f && f[g] || (h = d = 0) || p.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++h || (y && ((f[R] || (f[R] = {}))[e] = [P, h]), f !== t)););
                                return h -= r, h === i || h % i === 0 && h / i >= 0
                            }
                        }
                    },
                    PSEUDO: function(e, n) {
                        var r, o = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return o[R] ? o(n) : o.length > 1 ? (r = [e, e, "", n], k.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, t) {
                            for (var i, r = o(e, n), a = r.length; a--;) i = ee(e, r[a]), e[i] = !(t[i] = r[a])
                        }) : function(e) {
                            return o(e, 0, r)
                        }) : o
                    }
                },
                pseudos: {
                    not: i(function(e) {
                        var t = [],
                            n = [],
                            r = S(e.replace(ue, "$1"));
                        return r[R] ? i(function(e, t, n, i) {
                            for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                        }) : function(e, i, o) {
                            return t[0] = e, r(t, null, o, n), t[0] = null, !n.pop()
                        }
                    }),
                    has: i(function(e) {
                        return function(n) {
                            return t(e, n).length > 0
                        }
                    }),
                    contains: i(function(e) {
                        return e = e.replace(we, ke),
                            function(t) {
                                return (t.textContent || t.innerText || T(t)).indexOf(e) > -1
                            }
                    }),
                    lang: i(function(e) {
                        return de.test(e || "") || t.error("unsupported lang: " + e), e = e.replace(we, ke).toLowerCase(),
                            function(t) {
                                var n;
                                do
                                    if (n = I ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }),
                    target: function(t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function(e) {
                        return e === D
                    },
                    focus: function(e) {
                        return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function(e) {
                        return e.disabled === !1
                    },
                    disabled: function(e) {
                        return e.disabled === !0
                    },
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !k.pseudos.empty(e)
                    },
                    header: function(e) {
                        return me.test(e.nodeName)
                    },
                    input: function(e) {
                        return ge.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: c(function() {
                        return [0]
                    }),
                    last: c(function(e, t) {
                        return [t - 1]
                    }),
                    eq: c(function(e, t, n) {
                        return [0 > n ? n + t : n]
                    }),
                    even: c(function(e, t) {
                        for (var n = 0; t > n; n += 2) e.push(n);
                        return e
                    }),
                    odd: c(function(e, t) {
                        for (var n = 1; t > n; n += 2) e.push(n);
                        return e
                    }),
                    lt: c(function(e, t, n) {
                        for (var i = 0 > n ? n + t : n; --i >= 0;) e.push(i);
                        return e
                    }),
                    gt: c(function(e, t, n) {
                        for (var i = 0 > n ? n + t : n; ++i < t;) e.push(i);
                        return e
                    })
                }
            }, k.pseudos.nth = k.pseudos.eq;
            for (x in {
                    radio: !0,
                    checkbox: !0,
                    file: !0,
                    password: !0,
                    image: !0
                }) k.pseudos[x] = s(x);
            for (x in {
                    submit: !0,
                    reset: !0
                }) k.pseudos[x] = u(x);
            return f.prototype = k.filters = k.pseudos, k.setFilters = new f, E = t.tokenize = function(e, n) {
                var i, r, o, a, s, u, c, l = W[e + " "];
                if (l) return n ? 0 : l.slice(0);
                for (s = e, u = [], c = k.preFilter; s;) {
                    (!i || (r = ce.exec(s))) && (r && (s = s.slice(r[0].length) || s), u.push(o = [])), i = !1, (r = le.exec(s)) && (i = r.shift(), o.push({
                        value: i,
                        type: r[0].replace(ue, " ")
                    }), s = s.slice(i.length));
                    for (a in k.filter) !(r = pe[a].exec(s)) || c[a] && !(r = c[a](r)) || (i = r.shift(), o.push({
                        value: i,
                        type: a,
                        matches: r
                    }), s = s.slice(i.length));
                    if (!i) break
                }
                return n ? s.length : s ? t.error(e) : W(e, u).slice(0)
            }, S = t.compile = function(e, t) {
                var n, i = [],
                    r = [],
                    o = U[e + " "];
                if (!o) {
                    for (t || (t = E(e)), n = t.length; n--;) o = y(t[n]), o[R] ? i.push(o) : r.push(o);
                    o = U(e, b(r, i)), o.selector = e
                }
                return o
            }, A = t.select = function(e, t, n, i) {
                var r, o, a, s, u, c = "function" == typeof e && e,
                    f = !i && E(e = c.selector || e);
                if (n = n || [], 1 === f.length) {
                    if (o = f[0] = f[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && I && k.relative[o[1].type]) {
                        if (t = (k.find.ID(a.matches[0].replace(we, ke), t) || [])[0], !t) return n;
                        c && (t = t.parentNode), e = e.slice(o.shift().value.length)
                    }
                    for (r = pe.needsContext.test(e) ? 0 : o.length; r-- && (a = o[r], !k.relative[s = a.type]);)
                        if ((u = k.find[s]) && (i = u(a.matches[0].replace(we, ke), be.test(o[0].type) && l(t.parentNode) || t))) {
                            if (o.splice(r, 1), e = i.length && h(o), !e) return K.apply(n, i), n;
                            break
                        }
                }
                return (c || S(e, f))(i, t, !I, n, be.test(e) && l(t.parentNode) || t), n
            }, w.sortStable = R.split("").sort(X).join("") === R, w.detectDuplicates = !!N, q(), w.sortDetached = r(function(e) {
                return 1 & e.compareDocumentPosition(O.createElement("div"))
            }), r(function(e) {
                return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function(e, t, n) {
                return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }), w.attributes && r(function(e) {
                return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }) || o("value", function(e, t, n) {
                return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
            }), r(function(e) {
                return null == e.getAttribute("disabled")
            }) || o(te, function(e, t, n) {
                var i;
                return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null
            }), t
        }(e);
        Z.find = re, Z.expr = re.selectors, Z.expr[":"] = Z.expr.pseudos, Z.unique = re.uniqueSort, Z.text = re.getText, Z.isXMLDoc = re.isXML, Z.contains = re.contains;
        var oe = Z.expr.match.needsContext,
            ae = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            se = /^.[^:#\[\.,]*$/;
        Z.filter = function(e, t, n) {
            var i = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? Z.find.matchesSelector(i, e) ? [i] : [] : Z.find.matches(e, Z.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }, Z.fn.extend({
            find: function(e) {
                var t, n = this.length,
                    i = [],
                    r = this;
                if ("string" != typeof e) return this.pushStack(Z(e).filter(function() {
                    for (t = 0; n > t; t++)
                        if (Z.contains(r[t], this)) return !0
                }));
                for (t = 0; n > t; t++) Z.find(e, r[t], i);
                return i = this.pushStack(n > 1 ? Z.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
            },
            filter: function(e) {
                return this.pushStack(i(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(i(this, e || [], !0))
            },
            is: function(e) {
                return !!i(this, "string" == typeof e && oe.test(e) ? Z(e) : e || [], !1).length
            }
        });
        var ue, ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            le = Z.fn.init = function(e, t) {
                var n, i;
                if (!e) return this;
                if ("string" == typeof e) {
                    if (n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ce.exec(e), !n || !n[1] && t) return !t || t.jquery ? (t || ue).find(e) : this.constructor(t).find(e);
                    if (n[1]) {
                        if (t = t instanceof Z ? t[0] : t, Z.merge(this, Z.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : J, !0)), ae.test(n[1]) && Z.isPlainObject(t))
                            for (n in t) Z.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                        return this
                    }
                    return i = J.getElementById(n[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = J, this.selector = e,
                        this
                }
                return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : Z.isFunction(e) ? "undefined" != typeof ue.ready ? ue.ready(e) : e(Z) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), Z.makeArray(e, this))
            };
        le.prototype = Z.fn, ue = Z(J);
        var fe = /^(?:parents|prev(?:Until|All))/,
            he = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        Z.extend({
            dir: function(e, t, n) {
                for (var i = [], r = void 0 !== n;
                    (e = e[t]) && 9 !== e.nodeType;)
                    if (1 === e.nodeType) {
                        if (r && Z(e).is(n)) break;
                        i.push(e)
                    }
                return i
            },
            sibling: function(e, t) {
                for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
                return n
            }
        }), Z.fn.extend({
            has: function(e) {
                var t = Z(e, this),
                    n = t.length;
                return this.filter(function() {
                    for (var e = 0; n > e; e++)
                        if (Z.contains(this, t[e])) return !0
                })
            },
            closest: function(e, t) {
                for (var n, i = 0, r = this.length, o = [], a = oe.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; r > i; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && Z.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
                return this.pushStack(o.length > 1 ? Z.unique(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? X.call(Z(e), this[0]) : X.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(Z.unique(Z.merge(this.get(), Z(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }), Z.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return Z.dir(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return Z.dir(e, "parentNode", n)
            },
            next: function(e) {
                return r(e, "nextSibling")
            },
            prev: function(e) {
                return r(e, "previousSibling")
            },
            nextAll: function(e) {
                return Z.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return Z.dir(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return Z.dir(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return Z.dir(e, "previousSibling", n)
            },
            siblings: function(e) {
                return Z.sibling((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return Z.sibling(e.firstChild)
            },
            contents: function(e) {
                return e.contentDocument || Z.merge([], e.childNodes)
            }
        }, function(e, t) {
            Z.fn[e] = function(n, i) {
                var r = Z.map(this, t, n);
                return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (r = Z.filter(i, r)), this.length > 1 && (he[e] || Z.unique(r), fe.test(e) && r.reverse()), this.pushStack(r)
            }
        });
        var de = /\S+/g,
            pe = {};
        Z.Callbacks = function(e) {
            e = "string" == typeof e ? pe[e] || o(e) : Z.extend({}, e);
            var t, n, i, r, a, s, u = [],
                c = !e.once && [],
                l = function(o) {
                    for (t = e.memory && o, n = !0, s = r || 0, r = 0, a = u.length, i = !0; u && a > s; s++)
                        if (u[s].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
                            t = !1;
                            break
                        }
                    i = !1, u && (c ? c.length && l(c.shift()) : t ? u = [] : f.disable())
                },
                f = {
                    add: function() {
                        if (u) {
                            var n = u.length;
                            ! function o(t) {
                                Z.each(t, function(t, n) {
                                    var i = Z.type(n);
                                    "function" === i ? e.unique && f.has(n) || u.push(n) : n && n.length && "string" !== i && o(n)
                                })
                            }(arguments), i ? a = u.length : t && (r = n, l(t))
                        }
                        return this
                    },
                    remove: function() {
                        return u && Z.each(arguments, function(e, t) {
                            for (var n;
                                (n = Z.inArray(t, u, n)) > -1;) u.splice(n, 1), i && (a >= n && a--, s >= n && s--)
                        }), this
                    },
                    has: function(e) {
                        return e ? Z.inArray(e, u) > -1 : !(!u || !u.length)
                    },
                    empty: function() {
                        return u = [], a = 0, this
                    },
                    disable: function() {
                        return u = c = t = void 0, this
                    },
                    disabled: function() {
                        return !u
                    },
                    lock: function() {
                        return c = void 0, t || f.disable(), this
                    },
                    locked: function() {
                        return !c
                    },
                    fireWith: function(e, t) {
                        return !u || n && !c || (t = t || [], t = [e, t.slice ? t.slice() : t], i ? c.push(t) : l(t)), this
                    },
                    fire: function() {
                        return f.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!n
                    }
                };
            return f
        }, Z.extend({
            Deferred: function(e) {
                var t = [
                        ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", Z.Callbacks("memory")]
                    ],
                    n = "pending",
                    i = {
                        state: function() {
                            return n
                        },
                        always: function() {
                            return r.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var e = arguments;
                            return Z.Deferred(function(n) {
                                Z.each(t, function(t, o) {
                                    var a = Z.isFunction(e[t]) && e[t];
                                    r[o[1]](function() {
                                        var e = a && a.apply(this, arguments);
                                        e && Z.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments)
                                    })
                                }), e = null
                            }).promise()
                        },
                        promise: function(e) {
                            return null != e ? Z.extend(e, i) : i
                        }
                    },
                    r = {};
                return i.pipe = i.then, Z.each(t, function(e, o) {
                    var a = o[2],
                        s = o[3];
                    i[o[1]] = a.add, s && a.add(function() {
                        n = s
                    }, t[1 ^ e][2].disable, t[2][2].lock), r[o[0]] = function() {
                        return r[o[0] + "With"](this === r ? i : this, arguments), this
                    }, r[o[0] + "With"] = a.fireWith
                }), i.promise(r), e && e.call(r, r), r
            },
            when: function(e) {
                var t, n, i, r = 0,
                    o = z.call(arguments),
                    a = o.length,
                    s = 1 !== a || e && Z.isFunction(e.promise) ? a : 0,
                    u = 1 === s ? e : Z.Deferred(),
                    c = function(e, n, i) {
                        return function(r) {
                            n[e] = this, i[e] = arguments.length > 1 ? z.call(arguments) : r, i === t ? u.notifyWith(n, i) : --s || u.resolveWith(n, i)
                        }
                    };
                if (a > 1)
                    for (t = new Array(a), n = new Array(a), i = new Array(a); a > r; r++) o[r] && Z.isFunction(o[r].promise) ? o[r].promise().done(c(r, i, o)).fail(u.reject).progress(c(r, n, t)) : --s;
                return s || u.resolveWith(i, o), u.promise()
            }
        });
        var ge;
        Z.fn.ready = function(e) {
            return Z.ready.promise().done(e), this
        }, Z.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function(e) {
                e ? Z.readyWait++ : Z.ready(!0)
            },
            ready: function(e) {
                (e === !0 ? --Z.readyWait : Z.isReady) || (Z.isReady = !0, e !== !0 && --Z.readyWait > 0 || (ge.resolveWith(J, [Z]), Z.fn.triggerHandler && (Z(J).triggerHandler("ready"), Z(J).off("ready"))))
            }
        }), Z.ready.promise = function(t) {
            return ge || (ge = Z.Deferred(), "complete" === J.readyState ? setTimeout(Z.ready) : (J.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), ge.promise(t)
        }, Z.ready.promise();
        var me = Z.access = function(e, t, n, i, r, o, a) {
            var s = 0,
                u = e.length,
                c = null == n;
            if ("object" === Z.type(n)) {
                r = !0;
                for (s in n) Z.access(e, t, s, n[s], !0, o, a)
            } else if (void 0 !== i && (r = !0, Z.isFunction(i) || (a = !0), c && (a ? (t.call(e, i), t = null) : (c = t, t = function(e, t, n) {
                    return c.call(Z(e), n)
                })), t))
                for (; u > s; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
            return r ? e : c ? t.call(e) : u ? t(e[0], n) : o
        };
        Z.acceptData = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        }, s.uid = 1, s.accepts = Z.acceptData, s.prototype = {
            key: function(e) {
                if (!s.accepts(e)) return 0;
                var t = {},
                    n = e[this.expando];
                if (!n) {
                    n = s.uid++;
                    try {
                        t[this.expando] = {
                            value: n
                        }, Object.defineProperties(e, t)
                    } catch (i) {
                        t[this.expando] = n, Z.extend(e, t)
                    }
                }
                return this.cache[n] || (this.cache[n] = {}), n
            },
            set: function(e, t, n) {
                var i, r = this.key(e),
                    o = this.cache[r];
                if ("string" == typeof t) o[t] = n;
                else if (Z.isEmptyObject(o)) Z.extend(this.cache[r], t);
                else
                    for (i in t) o[i] = t[i];
                return o
            },
            get: function(e, t) {
                var n = this.cache[this.key(e)];
                return void 0 === t ? n : n[t]
            },
            access: function(e, t, n) {
                var i;
                return void 0 === t || t && "string" == typeof t && void 0 === n ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, Z.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t)
            },
            remove: function(e, t) {
                var n, i, r, o = this.key(e),
                    a = this.cache[o];
                if (void 0 === t) this.cache[o] = {};
                else {
                    Z.isArray(t) ? i = t.concat(t.map(Z.camelCase)) : (r = Z.camelCase(t), t in a ? i = [t, r] : (i = r, i = i in a ? [i] : i.match(de) || [])), n = i.length;
                    for (; n--;) delete a[i[n]]
                }
            },
            hasData: function(e) {
                return !Z.isEmptyObject(this.cache[e[this.expando]] || {})
            },
            discard: function(e) {
                e[this.expando] && delete this.cache[e[this.expando]]
            }
        };
        var ve = new s,
            ye = new s,
            be = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
            xe = /([A-Z])/g;
        Z.extend({
            hasData: function(e) {
                return ye.hasData(e) || ve.hasData(e)
            },
            data: function(e, t, n) {
                return ye.access(e, t, n)
            },
            removeData: function(e, t) {
                ye.remove(e, t)
            },
            _data: function(e, t, n) {
                return ve.access(e, t, n)
            },
            _removeData: function(e, t) {
                ve.remove(e, t)
            }
        }), Z.fn.extend({
            data: function(e, t) {
                var n, i, r, o = this[0],
                    a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (r = ye.get(o), 1 === o.nodeType && !ve.get(o, "hasDataAttrs"))) {
                        for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = Z.camelCase(i.slice(5)), u(o, i, r[i])));
                        ve.set(o, "hasDataAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof e ? this.each(function() {
                    ye.set(this, e)
                }) : me(this, function(t) {
                    var n, i = Z.camelCase(e);
                    if (o && void 0 === t) {
                        if (n = ye.get(o, e), void 0 !== n) return n;
                        if (n = ye.get(o, i), void 0 !== n) return n;
                        if (n = u(o, i, void 0), void 0 !== n) return n
                    } else this.each(function() {
                        var n = ye.get(this, i);
                        ye.set(this, i, t), -1 !== e.indexOf("-") && void 0 !== n && ye.set(this, e, t)
                    })
                }, null, t, arguments.length > 1, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    ye.remove(this, e)
                })
            }
        }), Z.extend({
            queue: function(e, t, n) {
                var i;
                return e ? (t = (t || "fx") + "queue", i = ve.get(e, t), n && (!i || Z.isArray(n) ? i = ve.access(e, t, Z.makeArray(n)) : i.push(n)), i || []) : void 0
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = Z.queue(e, t),
                    i = n.length,
                    r = n.shift(),
                    o = Z._queueHooks(e, t),
                    a = function() {
                        Z.dequeue(e, t)
                    };
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === t && n.unshift("inprogress"), delete o.stop, r.call(e, a, o)), !i && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return ve.get(e, n) || ve.access(e, n, {
                    empty: Z.Callbacks("once memory").add(function() {
                        ve.remove(e, [t + "queue", n])
                    })
                })
            }
        }), Z.fn.extend({
            queue: function(e, t) {
                var n = 2;
                return "string" != typeof e && (t = e, e = "fx", n--), arguments.length < n ? Z.queue(this[0], e) : void 0 === t ? this : this.each(function() {
                    var n = Z.queue(this, e, t);
                    Z._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Z.dequeue(this, e)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    Z.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, i = 1,
                    r = Z.Deferred(),
                    o = this,
                    a = this.length,
                    s = function() {
                        --i || r.resolveWith(o, [o])
                    };
                for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; a--;) n = ve.get(o[a], e + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
                return s(), r.promise(t)
            }
        });
        var we = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            ke = ["Top", "Right", "Bottom", "Left"],
            Te = function(e, t) {
                return e = t || e, "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e)
            },
            Ce = /^(?:checkbox|radio)$/i;
        ! function() {
            var e = J.createDocumentFragment(),
                t = e.appendChild(J.createElement("div")),
                n = J.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), Q.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", Q.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
        }();
        var Ee = "undefined";
        Q.focusinBubbles = "onfocusin" in e;
        var Se = /^key/,
            Ae = /^(?:mouse|pointer|contextmenu)|click/,
            je = /^(?:focusinfocus|focusoutblur)$/,
            _e = /^([^.]*)(?:\.(.+)|)$/;
        Z.event = {
            global: {},
            add: function(e, t, n, i, r) {
                var o, a, s, u, c, l, f, h, d, p, g, m = ve.get(e);
                if (m)
                    for (n.handler && (o = n, n = o.handler, r = o.selector), n.guid || (n.guid = Z.guid++), (u = m.events) || (u = m.events = {}), (a = m.handle) || (a = m.handle = function(t) {
                            return typeof Z !== Ee && Z.event.triggered !== t.type ? Z.event.dispatch.apply(e, arguments) : void 0
                        }), t = (t || "").match(de) || [""], c = t.length; c--;) s = _e.exec(t[c]) || [], d = g = s[1], p = (s[2] || "").split(".").sort(), d && (f = Z.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, f = Z.event.special[d] || {}, l = Z.extend({
                        type: d,
                        origType: g,
                        data: i,
                        handler: n,
                        guid: n.guid,
                        selector: r,
                        needsContext: r && Z.expr.match.needsContext.test(r),
                        namespace: p.join(".")
                    }, o), (h = u[d]) || (h = u[d] = [], h.delegateCount = 0, f.setup && f.setup.call(e, i, p, a) !== !1 || e.addEventListener && e.addEventListener(d, a, !1)), f.add && (f.add.call(e, l), l.handler.guid || (l.handler.guid = n.guid)), r ? h.splice(h.delegateCount++, 0, l) : h.push(l), Z.event.global[d] = !0)
            },
            remove: function(e, t, n, i, r) {
                var o, a, s, u, c, l, f, h, d, p, g, m = ve.hasData(e) && ve.get(e);
                if (m && (u = m.events)) {
                    for (t = (t || "").match(de) || [""], c = t.length; c--;)
                        if (s = _e.exec(t[c]) || [], d = g = s[1], p = (s[2] || "").split(".").sort(), d) {
                            for (f = Z.event.special[d] || {}, d = (i ? f.delegateType : f.bindType) || d, h = u[d] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = h.length; o--;) l = h[o], !r && g !== l.origType || n && n.guid !== l.guid || s && !s.test(l.namespace) || i && i !== l.selector && ("**" !== i || !l.selector) || (h.splice(o, 1), l.selector && h.delegateCount--, f.remove && f.remove.call(e, l));
                            a && !h.length && (f.teardown && f.teardown.call(e, p, m.handle) !== !1 || Z.removeEvent(e, d, m.handle), delete u[d])
                        } else
                            for (d in u) Z.event.remove(e, d + t[c], n, i, !0);
                    Z.isEmptyObject(u) && (delete m.handle, ve.remove(e, "events"))
                }
            },
            trigger: function(t, n, i, r) {
                var o, a, s, u, c, l, f, h = [i || J],
                    d = V.call(t, "type") ? t.type : t,
                    p = V.call(t, "namespace") ? t.namespace.split(".") : [];
                if (a = s = i = i || J, 3 !== i.nodeType && 8 !== i.nodeType && !je.test(d + Z.event.triggered) && (d.indexOf(".") >= 0 && (p = d.split("."), d = p.shift(), p.sort()), c = d.indexOf(":") < 0 && "on" + d, t = t[Z.expando] ? t : new Z.Event(d, "object" == typeof t && t), t.isTrigger = r ? 2 : 3, t.namespace = p.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = i), n = null == n ? [t] : Z.makeArray(n, [t]), f = Z.event.special[d] || {}, r || !f.trigger || f.trigger.apply(i, n) !== !1)) {
                    if (!r && !f.noBubble && !Z.isWindow(i)) {
                        for (u = f.delegateType || d, je.test(u + d) || (a = a.parentNode); a; a = a.parentNode) h.push(a), s = a;
                        s === (i.ownerDocument || J) && h.push(s.defaultView || s.parentWindow || e)
                    }
                    for (o = 0;
                        (a = h[o++]) && !t.isPropagationStopped();) t.type = o > 1 ? u : f.bindType || d, l = (ve.get(a, "events") || {})[t.type] && ve.get(a, "handle"), l && l.apply(a, n), l = c && a[c], l && l.apply && Z.acceptData(a) && (t.result = l.apply(a, n), t.result === !1 && t.preventDefault());
                    return t.type = d, r || t.isDefaultPrevented() || f._default && f._default.apply(h.pop(), n) !== !1 || !Z.acceptData(i) || c && Z.isFunction(i[d]) && !Z.isWindow(i) && (s = i[c], s && (i[c] = null), Z.event.triggered = d, i[d](), Z.event.triggered = void 0, s && (i[c] = s)), t.result
                }
            },
            dispatch: function(e) {
                e = Z.event.fix(e);
                var t, n, i, r, o, a = [],
                    s = z.call(arguments),
                    u = (ve.get(this, "events") || {})[e.type] || [],
                    c = Z.event.special[e.type] || {};
                if (s[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                    for (a = Z.event.handlers.call(this, e, u), t = 0;
                        (r = a[t++]) && !e.isPropagationStopped();)
                        for (e.currentTarget = r.elem, n = 0;
                            (o = r.handlers[n++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, i = ((Z.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, e), e.result
                }
            },
            handlers: function(e, t) {
                var n, i, r, o, a = [],
                    s = t.delegateCount,
                    u = e.target;
                if (s && u.nodeType && (!e.button || "click" !== e.type))
                    for (; u !== this; u = u.parentNode || this)
                        if (u.disabled !== !0 || "click" !== e.type) {
                            for (i = [], n = 0; s > n; n++) o = t[n], r = o.selector + " ", void 0 === i[r] && (i[r] = o.needsContext ? Z(r, this).index(u) >= 0 : Z.find(r, this, null, [u]).length), i[r] && i.push(o);
                            i.length && a.push({
                                elem: u,
                                handlers: i
                            })
                        }
                return s < t.length && a.push({
                    elem: this,
                    handlers: t.slice(s)
                }), a
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(e, t) {
                    return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(e, t) {
                    var n, i, r, o = t.button;
                    return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || J, i = n.documentElement, r = n.body, e.pageX = t.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), e.pageY = t.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), e
                }
            },
            fix: function(e) {
                if (e[Z.expando]) return e;
                var t, n, i, r = e.type,
                    o = e,
                    a = this.fixHooks[r];
                for (a || (this.fixHooks[r] = a = Ae.test(r) ? this.mouseHooks : Se.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new Z.Event(o), t = i.length; t--;) n = i[t], e[n] = o[n];
                return e.target || (e.target = J), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, o) : e
            },
            special: {
                load: {
                    noBubble: !0
                },
                focus: {
                    trigger: function() {
                        return this !== f() && this.focus ? (this.focus(), !1) : void 0
                    },
                    delegateType: "focusin"
                },
                blur: {
                    trigger: function() {
                        return this === f() && this.blur ? (this.blur(), !1) : void 0
                    },
                    delegateType: "focusout"
                },
                click: {
                    trigger: function() {
                        return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), !1) : void 0
                    },
                    _default: function(e) {
                        return Z.nodeName(e.target, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            },
            simulate: function(e, t, n, i) {
                var r = Z.extend(new Z.Event, n, {
                    type: e,
                    isSimulated: !0,
                    originalEvent: {}
                });
                i ? Z.event.trigger(r, null, t) : Z.event.dispatch.call(t, r), r.isDefaultPrevented() && n.preventDefault()
            }
        }, Z.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1)
        }, Z.Event = function(e, t) {
            return this instanceof Z.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? c : l) : this.type = e, t && Z.extend(this, t), this.timeStamp = e && e.timeStamp || Z.now(), void(this[Z.expando] = !0)) : new Z.Event(e, t)
        }, Z.Event.prototype = {
            isDefaultPrevented: l,
            isPropagationStopped: l,
            isImmediatePropagationStopped: l,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = c, e && e.preventDefault && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = c, e && e.stopPropagation && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = c, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
            }
        }, Z.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, t) {
            Z.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function(e) {
                    var n, i = this,
                        r = e.relatedTarget,
                        o = e.handleObj;
                    return (!r || r !== i && !Z.contains(i, r)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
                }
            }
        }), Q.focusinBubbles || Z.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            var n = function(e) {
                Z.event.simulate(t, e.target, Z.event.fix(e), !0)
            };
            Z.event.special[t] = {
                setup: function() {
                    var i = this.ownerDocument || this,
                        r = ve.access(i, t);
                    r || i.addEventListener(e, n, !0), ve.access(i, t, (r || 0) + 1)
                },
                teardown: function() {
                    var i = this.ownerDocument || this,
                        r = ve.access(i, t) - 1;
                    r ? ve.access(i, t, r) : (i.removeEventListener(e, n, !0), ve.remove(i, t))
                }
            }
        }), Z.fn.extend({
            on: function(e, t, n, i, r) {
                var o, a;
                if ("object" == typeof e) {
                    "string" != typeof t && (n = n || t, t = void 0);
                    for (a in e) this.on(a, t, n, e[a], r);
                    return this
                }
                if (null == n && null == i ? (i = t, n = t = void 0) : null == i && ("string" == typeof t ? (i = n, n = void 0) : (i = n, n = t, t = void 0)), i === !1) i = l;
                else if (!i) return this;
                return 1 === r && (o = i, i = function(e) {
                    return Z().off(e), o.apply(this, arguments)
                }, i.guid = o.guid || (o.guid = Z.guid++)), this.each(function() {
                    Z.event.add(this, e, i, n, t)
                })
            },
            one: function(e, t, n, i) {
                return this.on(e, t, n, i, 1)
            },
            off: function(e, t, n) {
                var i, r;
                if (e && e.preventDefault && e.handleObj) return i = e.handleObj, Z(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (r in e) this.off(r, t, e[r]);
                    return this
                }
                return (t === !1 || "function" == typeof t) && (n = t, t = void 0), n === !1 && (n = l), this.each(function() {
                    Z.event.remove(this, e, n, t)
                })
            },
            trigger: function(e, t) {
                return this.each(function() {
                    Z.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                return n ? Z.event.trigger(e, t, n, !0) : void 0
            }
        });
        var Ne = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            qe = /<([\w:]+)/,
            Oe = /<|&#?\w+;/,
            De = /<(?:script|style|link)/i,
            Ie = /checked\s*(?:[^=]|=\s*.checked.)/i,
            Me = /^$|\/(?:java|ecma)script/i,
            $e = /^true\/(.*)/,
            Le = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            He = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        He.optgroup = He.option, He.tbody = He.tfoot = He.colgroup = He.caption = He.thead, He.th = He.td, Z.extend({
            clone: function(e, t, n) {
                var i, r, o, a, s = e.cloneNode(!0),
                    u = Z.contains(e.ownerDocument, e);
                if (!(Q.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || Z.isXMLDoc(e)))
                    for (a = v(s), o = v(e), i = 0, r = o.length; r > i; i++) y(o[i], a[i]);
                if (t)
                    if (n)
                        for (o = o || v(e), a = a || v(s), i = 0, r = o.length; r > i; i++) m(o[i], a[i]);
                    else m(e, s);
                return a = v(s, "script"), a.length > 0 && g(a, !u && v(e, "script")), s
            },
            buildFragment: function(e, t, n, i) {
                for (var r, o, a, s, u, c, l = t.createDocumentFragment(), f = [], h = 0, d = e.length; d > h; h++)
                    if (r = e[h], r || 0 === r)
                        if ("object" === Z.type(r)) Z.merge(f, r.nodeType ? [r] : r);
                        else if (Oe.test(r)) {
                    for (o = o || l.appendChild(t.createElement("div")), a = (qe.exec(r) || ["", ""])[1].toLowerCase(), s = He[a] || He._default, o.innerHTML = s[1] + r.replace(Ne, "<$1></$2>") + s[2], c = s[0]; c--;) o = o.lastChild;
                    Z.merge(f, o.childNodes), o = l.firstChild, o.textContent = ""
                } else f.push(t.createTextNode(r));
                for (l.textContent = "", h = 0; r = f[h++];)
                    if ((!i || -1 === Z.inArray(r, i)) && (u = Z.contains(r.ownerDocument, r), o = v(l.appendChild(r), "script"), u && g(o), n))
                        for (c = 0; r = o[c++];) Me.test(r.type || "") && n.push(r);
                return l
            },
            cleanData: function(e) {
                for (var t, n, i, r, o = Z.event.special, a = 0; void 0 !== (n = e[a]); a++) {
                    if (Z.acceptData(n) && (r = n[ve.expando], r && (t = ve.cache[r]))) {
                        if (t.events)
                            for (i in t.events) o[i] ? Z.event.remove(n, i) : Z.removeEvent(n, i, t.handle);
                        ve.cache[r] && delete ve.cache[r]
                    }
                    delete ye.cache[n[ye.expando]]
                }
            }
        }), Z.fn.extend({
            text: function(e) {
                return me(this, function(e) {
                    return void 0 === e ? Z.text(this) : this.empty().each(function() {
                        (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = h(this, e);
                        t.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = h(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            remove: function(e, t) {
                for (var n, i = e ? Z.filter(e, this) : this, r = 0; null != (n = i[r]); r++) t || 1 !== n.nodeType || Z.cleanData(v(n)), n.parentNode && (t && Z.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n));
                return this
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Z.cleanData(v(e, !1)), e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                    return Z.clone(this, e, t)
                })
            },
            html: function(e) {
                return me(this, function(e) {
                    var t = this[0] || {},
                        n = 0,
                        i = this.length;
                    if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                    if ("string" == typeof e && !De.test(e) && !He[(qe.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = e.replace(Ne, "<$1></$2>");
                        try {
                            for (; i > n; n++) t = this[n] || {}, 1 === t.nodeType && (Z.cleanData(v(t, !1)), t.innerHTML = e);
                            t = 0
                        } catch (r) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var e = arguments[0];
                return this.domManip(arguments, function(t) {
                    e = this.parentNode, Z.cleanData(v(this)), e && e.replaceChild(t, this)
                }), e && (e.length || e.nodeType) ? this : this.remove()
            },
            detach: function(e) {
                return this.remove(e, !0)
            },
            domManip: function(e, t) {
                e = W.apply([], e);
                var n, i, r, o, a, s, u = 0,
                    c = this.length,
                    l = this,
                    f = c - 1,
                    h = e[0],
                    g = Z.isFunction(h);
                if (g || c > 1 && "string" == typeof h && !Q.checkClone && Ie.test(h)) return this.each(function(n) {
                    var i = l.eq(n);
                    g && (e[0] = h.call(this, n, i.html())), i.domManip(e, t)
                });
                if (c && (n = Z.buildFragment(e, this[0].ownerDocument, !1, this), i = n.firstChild, 1 === n.childNodes.length && (n = i), i)) {
                    for (r = Z.map(v(n, "script"), d), o = r.length; c > u; u++) a = n, u !== f && (a = Z.clone(a, !0, !0), o && Z.merge(r, v(a, "script"))), t.call(this[u], a, u);
                    if (o)
                        for (s = r[r.length - 1].ownerDocument, Z.map(r, p), u = 0; o > u; u++) a = r[u], Me.test(a.type || "") && !ve.access(a, "globalEval") && Z.contains(s, a) && (a.src ? Z._evalUrl && Z._evalUrl(a.src) : Z.globalEval(a.textContent.replace(Le, "")))
                }
                return this
            }
        }), Z.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, t) {
            Z.fn[e] = function(e) {
                for (var n, i = [], r = Z(e), o = r.length - 1, a = 0; o >= a; a++) n = a === o ? this : this.clone(!0), Z(r[a])[t](n), U.apply(i, n.get());
                return this.pushStack(i)
            }
        });
        var Re, Fe = {},
            Pe = /^margin/,
            Be = new RegExp("^(" + we + ")(?!px)[a-z%]+$", "i"),
            ze = function(t) {
                return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null)
            };
        ! function() {
            function t() {
                a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", a.innerHTML = "", r.appendChild(o);
                var t = e.getComputedStyle(a, null);
                n = "1%" !== t.top, i = "4px" === t.width, r.removeChild(o)
            }
            var n, i, r = J.documentElement,
                o = J.createElement("div"),
                a = J.createElement("div");
            a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", Q.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", o.appendChild(a), e.getComputedStyle && Z.extend(Q, {
                pixelPosition: function() {
                    return t(), n
                },
                boxSizingReliable: function() {
                    return null == i && t(), i
                },
                reliableMarginRight: function() {
                    var t, n = a.appendChild(J.createElement("div"));
                    return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", a.style.width = "1px", r.appendChild(o), t = !parseFloat(e.getComputedStyle(n, null).marginRight), r.removeChild(o), a.removeChild(n), t
                }
            }))
        }(), Z.swap = function(e, t, n, i) {
            var r, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            r = n.apply(e, i || []);
            for (o in t) e.style[o] = a[o];
            return r
        };
        var We = /^(none|table(?!-c[ea]).+)/,
            Ue = new RegExp("^(" + we + ")(.*)$", "i"),
            Xe = new RegExp("^([+-])=(" + we + ")", "i"),
            Ye = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            Ge = {
                letterSpacing: "0",
                fontWeight: "400"
            },
            Ve = ["Webkit", "O", "Moz", "ms"];
        Z.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = w(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": "cssFloat"
            },
            style: function(e, t, n, i) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var r, o, a, s = Z.camelCase(t),
                        u = e.style;
                    return t = Z.cssProps[s] || (Z.cssProps[s] = T(u, s)), a = Z.cssHooks[t] || Z.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (r = a.get(e, !1, i)) ? r : u[t] : (o = typeof n, "string" === o && (r = Xe.exec(n)) && (n = (r[1] + 1) * r[2] + parseFloat(Z.css(e, t)), o = "number"), void(null != n && n === n && ("number" !== o || Z.cssNumber[s] || (n += "px"), Q.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, i)) || (u[t] = n))))
                }
            },
            css: function(e, t, n, i) {
                var r, o, a, s = Z.camelCase(t);
                return t = Z.cssProps[s] || (Z.cssProps[s] = T(e.style, s)), a = Z.cssHooks[t] || Z.cssHooks[s], a && "get" in a && (r = a.get(e, !0, n)), void 0 === r && (r = w(e, t, i)), "normal" === r && t in Ge && (r = Ge[t]), "" === n || n ? (o = parseFloat(r), n === !0 || Z.isNumeric(o) ? o || 0 : r) : r
            }
        }), Z.each(["height", "width"], function(e, t) {
            Z.cssHooks[t] = {
                get: function(e, n, i) {
                    return n ? We.test(Z.css(e, "display")) && 0 === e.offsetWidth ? Z.swap(e, Ye, function() {
                        return S(e, t, i)
                    }) : S(e, t, i) : void 0
                },
                set: function(e, n, i) {
                    var r = i && ze(e);
                    return C(e, n, i ? E(e, t, i, "border-box" === Z.css(e, "boxSizing", !1, r), r) : 0)
                }
            }
        }), Z.cssHooks.marginRight = k(Q.reliableMarginRight, function(e, t) {
            return t ? Z.swap(e, {
                display: "inline-block"
            }, w, [e, "marginRight"]) : void 0
        }), Z.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(e, t) {
            Z.cssHooks[e + t] = {
                expand: function(n) {
                    for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) r[e + ke[i] + t] = o[i] || o[i - 2] || o[0];
                    return r
                }
            }, Pe.test(e) || (Z.cssHooks[e + t].set = C)
        }), Z.fn.extend({
            css: function(e, t) {
                return me(this, function(e, t, n) {
                    var i, r, o = {},
                        a = 0;
                    if (Z.isArray(t)) {
                        for (i = ze(e), r = t.length; r > a; a++) o[t[a]] = Z.css(e, t[a], !1, i);
                        return o
                    }
                    return void 0 !== n ? Z.style(e, t, n) : Z.css(e, t)
                }, e, t, arguments.length > 1)
            },
            show: function() {
                return A(this, !0)
            },
            hide: function() {
                return A(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    Te(this) ? Z(this).show() : Z(this).hide()
                })
            }
        }), Z.Tween = j, j.prototype = {
            constructor: j,
            init: function(e, t, n, i, r, o) {
                this.elem = e, this.prop = n, this.easing = r || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (Z.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = j.propHooks[this.prop];
                return e && e.get ? e.get(this) : j.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = j.propHooks[this.prop];
                return this.pos = t = this.options.duration ? Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : j.propHooks._default.set(this), this
            }
        }, j.prototype.init.prototype = j.prototype, j.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = Z.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
                },
                set: function(e) {
                    Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
                }
            }
        }, j.propHooks.scrollTop = j.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        }, Z.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            }
        }, Z.fx = j.prototype.init, Z.fx.step = {};
        var Qe, Je, Ke = /^(?:toggle|show|hide)$/,
            Ze = new RegExp("^(?:([+-])=|)(" + we + ")([a-z%]*)$", "i"),
            et = /queueHooks$/,
            tt = [O],
            nt = {
                "*": [function(e, t) {
                    var n = this.createTween(e, t),
                        i = n.cur(),
                        r = Ze.exec(t),
                        o = r && r[3] || (Z.cssNumber[e] ? "" : "px"),
                        a = (Z.cssNumber[e] || "px" !== o && +i) && Ze.exec(Z.css(n.elem, e)),
                        s = 1,
                        u = 20;
                    if (a && a[3] !== o) {
                        o = o || a[3], r = r || [], a = +i || 1;
                        do s = s || ".5", a /= s, Z.style(n.elem, e, a + o); while (s !== (s = n.cur() / i) && 1 !== s && --u)
                    }
                    return r && (a = n.start = +a || +i || 0, n.unit = o, n.end = r[1] ? a + (r[1] + 1) * r[2] : +r[2]), n
                }]
            };
        Z.Animation = Z.extend(I, {
                tweener: function(e, t) {
                    Z.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
                    for (var n, i = 0, r = e.length; r > i; i++) n = e[i], nt[n] = nt[n] || [], nt[n].unshift(t)
                },
                prefilter: function(e, t) {
                    t ? tt.unshift(e) : tt.push(e)
                }
            }), Z.speed = function(e, t, n) {
                var i = e && "object" == typeof e ? Z.extend({}, e) : {
                    complete: n || !n && t || Z.isFunction(e) && e,
                    duration: e,
                    easing: n && t || t && !Z.isFunction(t) && t
                };
                return i.duration = Z.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in Z.fx.speeds ? Z.fx.speeds[i.duration] : Z.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
                    Z.isFunction(i.old) && i.old.call(this), i.queue && Z.dequeue(this, i.queue)
                }, i
            }, Z.fn.extend({
                fadeTo: function(e, t, n, i) {
                    return this.filter(Te).css("opacity", 0).show().end().animate({
                        opacity: t
                    }, e, n, i)
                },
                animate: function(e, t, n, i) {
                    var r = Z.isEmptyObject(e),
                        o = Z.speed(t, n, i),
                        a = function() {
                            var t = I(this, Z.extend({}, e), o);
                            (r || ve.get(this, "finish")) && t.stop(!0)
                        };
                    return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
                },
                stop: function(e, t, n) {
                    var i = function(e) {
                        var t = e.stop;
                        delete e.stop, t(n)
                    };
                    return "string" != typeof e && (n = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                        var t = !0,
                            r = null != e && e + "queueHooks",
                            o = Z.timers,
                            a = ve.get(this);
                        if (r) a[r] && a[r].stop && i(a[r]);
                        else
                            for (r in a) a[r] && a[r].stop && et.test(r) && i(a[r]);
                        for (r = o.length; r--;) o[r].elem !== this || null != e && o[r].queue !== e || (o[r].anim.stop(n), t = !1, o.splice(r, 1));
                        (t || !n) && Z.dequeue(this, e)
                    })
                },
                finish: function(e) {
                    return e !== !1 && (e = e || "fx"), this.each(function() {
                        var t, n = ve.get(this),
                            i = n[e + "queue"],
                            r = n[e + "queueHooks"],
                            o = Z.timers,
                            a = i ? i.length : 0;
                        for (n.finish = !0, Z.queue(this, e, []), r && r.stop && r.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                        for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                        delete n.finish
                    })
                }
            }), Z.each(["toggle", "show", "hide"], function(e, t) {
                var n = Z.fn[t];
                Z.fn[t] = function(e, i, r) {
                    return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(N(t, !0), e, i, r)
                }
            }), Z.each({
                slideDown: N("show"),
                slideUp: N("hide"),
                slideToggle: N("toggle"),
                fadeIn: {
                    opacity: "show"
                },
                fadeOut: {
                    opacity: "hide"
                },
                fadeToggle: {
                    opacity: "toggle"
                }
            }, function(e, t) {
                Z.fn[e] = function(e, n, i) {
                    return this.animate(t, e, n, i)
                }
            }), Z.timers = [], Z.fx.tick = function() {
                var e, t = 0,
                    n = Z.timers;
                for (Qe = Z.now(); t < n.length; t++) e = n[t], e() || n[t] !== e || n.splice(t--, 1);
                n.length || Z.fx.stop(), Qe = void 0
            }, Z.fx.timer = function(e) {
                Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop()
            }, Z.fx.interval = 13, Z.fx.start = function() {
                Je || (Je = setInterval(Z.fx.tick, Z.fx.interval))
            }, Z.fx.stop = function() {
                clearInterval(Je), Je = null
            }, Z.fx.speeds = {
                slow: 600,
                fast: 200,
                _default: 400
            }, Z.fn.delay = function(e, t) {
                return e = Z.fx ? Z.fx.speeds[e] || e : e, t = t || "fx",
                    this.queue(t, function(t, n) {
                        var i = setTimeout(t, e);
                        n.stop = function() {
                            clearTimeout(i)
                        }
                    })
            },
            function() {
                var e = J.createElement("input"),
                    t = J.createElement("select"),
                    n = t.appendChild(J.createElement("option"));
                e.type = "checkbox", Q.checkOn = "" !== e.value, Q.optSelected = n.selected, t.disabled = !0, Q.optDisabled = !n.disabled, e = J.createElement("input"), e.value = "t", e.type = "radio", Q.radioValue = "t" === e.value
            }();
        var it, rt, ot = Z.expr.attrHandle;
        Z.fn.extend({
            attr: function(e, t) {
                return me(this, Z.attr, e, t, arguments.length > 1)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    Z.removeAttr(this, e)
                })
            }
        }), Z.extend({
            attr: function(e, t, n) {
                var i, r, o = e.nodeType;
                return e && 3 !== o && 8 !== o && 2 !== o ? typeof e.getAttribute === Ee ? Z.prop(e, t, n) : (1 === o && Z.isXMLDoc(e) || (t = t.toLowerCase(), i = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? rt : it)), void 0 === n ? i && "get" in i && null !== (r = i.get(e, t)) ? r : (r = Z.find.attr(e, t), null == r ? void 0 : r) : null !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : void Z.removeAttr(e, t)) : void 0
            },
            removeAttr: function(e, t) {
                var n, i, r = 0,
                    o = t && t.match(de);
                if (o && 1 === e.nodeType)
                    for (; n = o[r++];) i = Z.propFix[n] || n, Z.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!Q.radioValue && "radio" === t && Z.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t
                        }
                    }
                }
            }
        }), rt = {
            set: function(e, t, n) {
                return t === !1 ? Z.removeAttr(e, n) : e.setAttribute(n, n), n
            }
        }, Z.each(Z.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var n = ot[t] || Z.find.attr;
            ot[t] = function(e, t, i) {
                var r, o;
                return i || (o = ot[t], ot[t] = r, r = null != n(e, t, i) ? t.toLowerCase() : null, ot[t] = o), r
            }
        });
        var at = /^(?:input|select|textarea|button)$/i;
        Z.fn.extend({
            prop: function(e, t) {
                return me(this, Z.prop, e, t, arguments.length > 1)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[Z.propFix[e] || e]
                })
            }
        }), Z.extend({
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(e, t, n) {
                var i, r, o, a = e.nodeType;
                return e && 3 !== a && 8 !== a && 2 !== a ? (o = 1 !== a || !Z.isXMLDoc(e), o && (t = Z.propFix[t] || t, r = Z.propHooks[t]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(e, n, t)) ? i : e[t] = n : r && "get" in r && null !== (i = r.get(e, t)) ? i : e[t]) : void 0
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        return e.hasAttribute("tabindex") || at.test(e.nodeName) || e.href ? e.tabIndex : -1
                    }
                }
            }
        }), Q.optSelected || (Z.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex, null
            }
        }), Z.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            Z.propFix[this.toLowerCase()] = this
        });
        var st = /[\t\r\n\f]/g;
        Z.fn.extend({
            addClass: function(e) {
                var t, n, i, r, o, a, s = "string" == typeof e && e,
                    u = 0,
                    c = this.length;
                if (Z.isFunction(e)) return this.each(function(t) {
                    Z(this).addClass(e.call(this, t, this.className))
                });
                if (s)
                    for (t = (e || "").match(de) || []; c > u; u++)
                        if (n = this[u], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : " ")) {
                            for (o = 0; r = t[o++];) i.indexOf(" " + r + " ") < 0 && (i += r + " ");
                            a = Z.trim(i), n.className !== a && (n.className = a)
                        }
                return this
            },
            removeClass: function(e) {
                var t, n, i, r, o, a, s = 0 === arguments.length || "string" == typeof e && e,
                    u = 0,
                    c = this.length;
                if (Z.isFunction(e)) return this.each(function(t) {
                    Z(this).removeClass(e.call(this, t, this.className))
                });
                if (s)
                    for (t = (e || "").match(de) || []; c > u; u++)
                        if (n = this[u], i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : "")) {
                            for (o = 0; r = t[o++];)
                                for (; i.indexOf(" " + r + " ") >= 0;) i = i.replace(" " + r + " ", " ");
                            a = e ? Z.trim(i) : "", n.className !== a && (n.className = a)
                        }
                return this
            },
            toggleClass: function(e, t) {
                var n = typeof e;
                return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : this.each(Z.isFunction(e) ? function(n) {
                    Z(this).toggleClass(e.call(this, n, this.className, t), t)
                } : function() {
                    if ("string" === n)
                        for (var t, i = 0, r = Z(this), o = e.match(de) || []; t = o[i++];) r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                    else(n === Ee || "boolean" === n) && (this.className && ve.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ve.get(this, "__className__") || "")
                })
            },
            hasClass: function(e) {
                for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++)
                    if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(st, " ").indexOf(t) >= 0) return !0;
                return !1
            }
        });
        var ut = /\r/g;
        Z.fn.extend({
            val: function(e) {
                var t, n, i, r = this[0];
                return arguments.length ? (i = Z.isFunction(e), this.each(function(n) {
                    var r;
                    1 === this.nodeType && (r = i ? e.call(this, n, Z(this).val()) : e, null == r ? r = "" : "number" == typeof r ? r += "" : Z.isArray(r) && (r = Z.map(r, function(e) {
                        return null == e ? "" : e + ""
                    })), t = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, r, "value") || (this.value = r))
                })) : r ? (t = Z.valHooks[r.type] || Z.valHooks[r.nodeName.toLowerCase()], t && "get" in t && void 0 !== (n = t.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(ut, "") : null == n ? "" : n)) : void 0
            }
        }), Z.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = Z.find.attr(e, "value");
                        return null != t ? t : Z.trim(Z.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        for (var t, n, i = e.options, r = e.selectedIndex, o = "select-one" === e.type || 0 > r, a = o ? null : [], s = o ? r + 1 : i.length, u = 0 > r ? s : o ? r : 0; s > u; u++)
                            if (n = i[u], !(!n.selected && u !== r || (Q.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && Z.nodeName(n.parentNode, "optgroup"))) {
                                if (t = Z(n).val(), o) return t;
                                a.push(t)
                            }
                        return a
                    },
                    set: function(e, t) {
                        for (var n, i, r = e.options, o = Z.makeArray(t), a = r.length; a--;) i = r[a], (i.selected = Z.inArray(i.value, o) >= 0) && (n = !0);
                        return n || (e.selectedIndex = -1), o
                    }
                }
            }
        }), Z.each(["radio", "checkbox"], function() {
            Z.valHooks[this] = {
                set: function(e, t) {
                    return Z.isArray(t) ? e.checked = Z.inArray(Z(e).val(), t) >= 0 : void 0
                }
            }, Q.checkOn || (Z.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            })
        }), Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
            Z.fn[t] = function(e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }), Z.fn.extend({
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            },
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, i) {
                return this.on(t, e, n, i)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        });
        var ct = Z.now(),
            lt = /\?/;
        Z.parseJSON = function(e) {
            return JSON.parse(e + "")
        }, Z.parseXML = function(e) {
            var t, n;
            if (!e || "string" != typeof e) return null;
            try {
                n = new DOMParser, t = n.parseFromString(e, "text/xml")
            } catch (i) {
                t = void 0
            }
            return (!t || t.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + e), t
        };
        var ft = /#.*$/,
            ht = /([?&])_=[^&]*/,
            dt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            pt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            gt = /^(?:GET|HEAD)$/,
            mt = /^\/\//,
            vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
            yt = {},
            bt = {},
            xt = "*/".concat("*"),
            wt = e.location.href,
            kt = vt.exec(wt.toLowerCase()) || [];
        Z.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: wt,
                type: "GET",
                isLocal: pt.test(kt[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": xt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": Z.parseJSON,
                    "text xml": Z.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? L(L(e, Z.ajaxSettings), t) : L(Z.ajaxSettings, e)
            },
            ajaxPrefilter: M(yt),
            ajaxTransport: M(bt),
            ajax: function(e, t) {
                function n(e, t, n, a) {
                    var u, l, v, y, x, k = t;
                    2 !== b && (b = 2, s && clearTimeout(s), i = void 0, o = a || "", w.readyState = e > 0 ? 4 : 0, u = e >= 200 && 300 > e || 304 === e, n && (y = H(f, w, n)), y = R(f, y, w, u), u ? (f.ifModified && (x = w.getResponseHeader("Last-Modified"), x && (Z.lastModified[r] = x), x = w.getResponseHeader("etag"), x && (Z.etag[r] = x)), 204 === e || "HEAD" === f.type ? k = "nocontent" : 304 === e ? k = "notmodified" : (k = y.state, l = y.data, v = y.error, u = !v)) : (v = k, (e || !k) && (k = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (t || k) + "", u ? p.resolveWith(h, [l, k, w]) : p.rejectWith(h, [w, k, v]), w.statusCode(m), m = void 0, c && d.trigger(u ? "ajaxSuccess" : "ajaxError", [w, f, u ? l : v]), g.fireWith(h, [w, k]), c && (d.trigger("ajaxComplete", [w, f]), --Z.active || Z.event.trigger("ajaxStop")))
                }
                "object" == typeof e && (t = e, e = void 0), t = t || {};
                var i, r, o, a, s, u, c, l, f = Z.ajaxSetup({}, t),
                    h = f.context || f,
                    d = f.context && (h.nodeType || h.jquery) ? Z(h) : Z.event,
                    p = Z.Deferred(),
                    g = Z.Callbacks("once memory"),
                    m = f.statusCode || {},
                    v = {},
                    y = {},
                    b = 0,
                    x = "canceled",
                    w = {
                        readyState: 0,
                        getResponseHeader: function(e) {
                            var t;
                            if (2 === b) {
                                if (!a)
                                    for (a = {}; t = dt.exec(o);) a[t[1].toLowerCase()] = t[2];
                                t = a[e.toLowerCase()]
                            }
                            return null == t ? null : t
                        },
                        getAllResponseHeaders: function() {
                            return 2 === b ? o : null
                        },
                        setRequestHeader: function(e, t) {
                            var n = e.toLowerCase();
                            return b || (e = y[n] = y[n] || e, v[e] = t), this
                        },
                        overrideMimeType: function(e) {
                            return b || (f.mimeType = e), this
                        },
                        statusCode: function(e) {
                            var t;
                            if (e)
                                if (2 > b)
                                    for (t in e) m[t] = [m[t], e[t]];
                                else w.always(e[w.status]);
                            return this
                        },
                        abort: function(e) {
                            var t = e || x;
                            return i && i.abort(t), n(0, t), this
                        }
                    };
                if (p.promise(w).complete = g.add, w.success = w.done, w.error = w.fail, f.url = ((e || f.url || wt) + "").replace(ft, "").replace(mt, kt[1] + "//"), f.type = t.method || t.type || f.method || f.type, f.dataTypes = Z.trim(f.dataType || "*").toLowerCase().match(de) || [""], null == f.crossDomain && (u = vt.exec(f.url.toLowerCase()), f.crossDomain = !(!u || u[1] === kt[1] && u[2] === kt[2] && (u[3] || ("http:" === u[1] ? "80" : "443")) === (kt[3] || ("http:" === kt[1] ? "80" : "443")))), f.data && f.processData && "string" != typeof f.data && (f.data = Z.param(f.data, f.traditional)), $(yt, f, t, w), 2 === b) return w;
                c = Z.event && f.global, c && 0 === Z.active++ && Z.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !gt.test(f.type), r = f.url, f.hasContent || (f.data && (r = f.url += (lt.test(r) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = ht.test(r) ? r.replace(ht, "$1_=" + ct++) : r + (lt.test(r) ? "&" : "?") + "_=" + ct++)), f.ifModified && (Z.lastModified[r] && w.setRequestHeader("If-Modified-Since", Z.lastModified[r]), Z.etag[r] && w.setRequestHeader("If-None-Match", Z.etag[r])), (f.data && f.hasContent && f.contentType !== !1 || t.contentType) && w.setRequestHeader("Content-Type", f.contentType), w.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + xt + "; q=0.01" : "") : f.accepts["*"]);
                for (l in f.headers) w.setRequestHeader(l, f.headers[l]);
                if (f.beforeSend && (f.beforeSend.call(h, w, f) === !1 || 2 === b)) return w.abort();
                x = "abort";
                for (l in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) w[l](f[l]);
                if (i = $(bt, f, t, w)) {
                    w.readyState = 1, c && d.trigger("ajaxSend", [w, f]), f.async && f.timeout > 0 && (s = setTimeout(function() {
                        w.abort("timeout")
                    }, f.timeout));
                    try {
                        b = 1, i.send(v, n)
                    } catch (k) {
                        if (!(2 > b)) throw k;
                        n(-1, k)
                    }
                } else n(-1, "No Transport");
                return w
            },
            getJSON: function(e, t, n) {
                return Z.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return Z.get(e, void 0, t, "script")
            }
        }), Z.each(["get", "post"], function(e, t) {
            Z[t] = function(e, n, i, r) {
                return Z.isFunction(n) && (r = r || i, i = n, n = void 0), Z.ajax({
                    url: e,
                    type: t,
                    dataType: r,
                    data: n,
                    success: i
                })
            }
        }), Z._evalUrl = function(e) {
            return Z.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }, Z.fn.extend({
            wrapAll: function(e) {
                var t;
                return Z.isFunction(e) ? this.each(function(t) {
                    Z(this).wrapAll(e.call(this, t))
                }) : (this[0] && (t = Z(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                    return e
                }).append(this)), this)
            },
            wrapInner: function(e) {
                return this.each(Z.isFunction(e) ? function(t) {
                    Z(this).wrapInner(e.call(this, t))
                } : function() {
                    var t = Z(this),
                        n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                })
            },
            wrap: function(e) {
                var t = Z.isFunction(e);
                return this.each(function(n) {
                    Z(this).wrapAll(t ? e.call(this, n) : e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes)
                }).end()
            }
        }), Z.expr.filters.hidden = function(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0
        }, Z.expr.filters.visible = function(e) {
            return !Z.expr.filters.hidden(e)
        };
        var Tt = /%20/g,
            Ct = /\[\]$/,
            Et = /\r?\n/g,
            St = /^(?:submit|button|image|reset|file)$/i,
            At = /^(?:input|select|textarea|keygen)/i;
        Z.param = function(e, t) {
            var n, i = [],
                r = function(e, t) {
                    t = Z.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
                };
            if (void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || e.jquery && !Z.isPlainObject(e)) Z.each(e, function() {
                r(this.name, this.value)
            });
            else
                for (n in e) F(n, e[n], t, r);
            return i.join("&").replace(Tt, "+")
        }, Z.fn.extend({
            serialize: function() {
                return Z.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = Z.prop(this, "elements");
                    return e ? Z.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !Z(this).is(":disabled") && At.test(this.nodeName) && !St.test(e) && (this.checked || !Ce.test(e))
                }).map(function(e, t) {
                    var n = Z(this).val();
                    return null == n ? null : Z.isArray(n) ? Z.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Et, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(Et, "\r\n")
                    }
                }).get()
            }
        }), Z.ajaxSettings.xhr = function() {
            try {
                return new XMLHttpRequest
            } catch (e) {}
        };
        var jt = 0,
            _t = {},
            Nt = {
                0: 200,
                1223: 204
            },
            qt = Z.ajaxSettings.xhr();
        e.attachEvent && e.attachEvent("onunload", function() {
            for (var e in _t) _t[e]()
        }), Q.cors = !!qt && "withCredentials" in qt, Q.ajax = qt = !!qt, Z.ajaxTransport(function(e) {
            var t;
            return Q.cors || qt && !e.crossDomain ? {
                send: function(n, i) {
                    var r, o = e.xhr(),
                        a = ++jt;
                    if (o.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)
                        for (r in e.xhrFields) o[r] = e.xhrFields[r];
                    e.mimeType && o.overrideMimeType && o.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (r in n) o.setRequestHeader(r, n[r]);
                    t = function(e) {
                        return function() {
                            t && (delete _t[a], t = o.onload = o.onerror = null, "abort" === e ? o.abort() : "error" === e ? i(o.status, o.statusText) : i(Nt[o.status] || o.status, o.statusText, "string" == typeof o.responseText ? {
                                text: o.responseText
                            } : void 0, o.getAllResponseHeaders()))
                        }
                    }, o.onload = t(), o.onerror = t("error"), t = _t[a] = t("abort");
                    try {
                        o.send(e.hasContent && e.data || null)
                    } catch (s) {
                        if (t) throw s
                    }
                },
                abort: function() {
                    t && t()
                }
            } : void 0
        }), Z.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(e) {
                    return Z.globalEval(e), e
                }
            }
        }), Z.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
        }), Z.ajaxTransport("script", function(e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function(i, r) {
                        t = Z("<script>").prop({
                            async: !0,
                            charset: e.scriptCharset,
                            src: e.url
                        }).on("load error", n = function(e) {
                            t.remove(), n = null, e && r("error" === e.type ? 404 : 200, e.type)
                        }), J.head.appendChild(t[0])
                    },
                    abort: function() {
                        n && n()
                    }
                }
            }
        });
        var Ot = [],
            Dt = /(=)\?(?=&|$)|\?\?/;
        Z.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Ot.pop() || Z.expando + "_" + ct++;
                return this[e] = !0, e
            }
        }), Z.ajaxPrefilter("json jsonp", function(t, n, i) {
            var r, o, a, s = t.jsonp !== !1 && (Dt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Dt.test(t.data) && "data");
            return s || "jsonp" === t.dataTypes[0] ? (r = t.jsonpCallback = Z.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(Dt, "$1" + r) : t.jsonp !== !1 && (t.url += (lt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r), t.converters["script json"] = function() {
                return a || Z.error(r + " was not called"), a[0]
            }, t.dataTypes[0] = "json", o = e[r], e[r] = function() {
                a = arguments
            }, i.always(function() {
                e[r] = o, t[r] && (t.jsonpCallback = n.jsonpCallback, Ot.push(r)), a && Z.isFunction(o) && o(a[0]), a = o = void 0
            }), "script") : void 0
        }), Z.parseHTML = function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || J;
            var i = ae.exec(e),
                r = !n && [];
            return i ? [t.createElement(i[1])] : (i = Z.buildFragment([e], t, r), r && r.length && Z(r).remove(), Z.merge([], i.childNodes))
        };
        var It = Z.fn.load;
        Z.fn.load = function(e, t, n) {
            if ("string" != typeof e && It) return It.apply(this, arguments);
            var i, r, o, a = this,
                s = e.indexOf(" ");
            return s >= 0 && (i = Z.trim(e.slice(s)), e = e.slice(0, s)), Z.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (r = "POST"), a.length > 0 && Z.ajax({
                url: e,
                type: r,
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments, a.html(i ? Z("<div>").append(Z.parseHTML(e)).find(i) : e)
            }).complete(n && function(e, t) {
                a.each(n, o || [e.responseText, t, e])
            }), this
        }, Z.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            Z.fn[t] = function(e) {
                return this.on(t, e)
            }
        }), Z.expr.filters.animated = function(e) {
            return Z.grep(Z.timers, function(t) {
                return e === t.elem
            }).length
        };
        var Mt = e.document.documentElement;
        Z.offset = {
            setOffset: function(e, t, n) {
                var i, r, o, a, s, u, c, l = Z.css(e, "position"),
                    f = Z(e),
                    h = {};
                "static" === l && (e.style.position = "relative"), s = f.offset(), o = Z.css(e, "top"), u = Z.css(e, "left"), c = ("absolute" === l || "fixed" === l) && (o + u).indexOf("auto") > -1, c ? (i = f.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(u) || 0), Z.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (h.top = t.top - s.top + a), null != t.left && (h.left = t.left - s.left + r), "using" in t ? t.using.call(e, h) : f.css(h)
            }
        }, Z.fn.extend({
            offset: function(e) {
                if (arguments.length) return void 0 === e ? this : this.each(function(t) {
                    Z.offset.setOffset(this, e, t)
                });
                var t, n, i = this[0],
                    r = {
                        top: 0,
                        left: 0
                    },
                    o = i && i.ownerDocument;
                return o ? (t = o.documentElement, Z.contains(t, i) ? (typeof i.getBoundingClientRect !== Ee && (r = i.getBoundingClientRect()), n = P(o), {
                    top: r.top + n.pageYOffset - t.clientTop,
                    left: r.left + n.pageXOffset - t.clientLeft
                }) : r) : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, n = this[0],
                        i = {
                            top: 0,
                            left: 0
                        };
                    return "fixed" === Z.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), Z.nodeName(e[0], "html") || (i = e.offset()), i.top += Z.css(e[0], "borderTopWidth", !0), i.left += Z.css(e[0], "borderLeftWidth", !0)), {
                        top: t.top - i.top - Z.css(n, "marginTop", !0),
                        left: t.left - i.left - Z.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var e = this.offsetParent || Mt; e && !Z.nodeName(e, "html") && "static" === Z.css(e, "position");) e = e.offsetParent;
                    return e || Mt
                })
            }
        }), Z.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, n) {
            var i = "pageYOffset" === n;
            Z.fn[t] = function(r) {
                return me(this, function(t, r, o) {
                    var a = P(t);
                    return void 0 === o ? a ? a[n] : t[r] : void(a ? a.scrollTo(i ? e.pageXOffset : o, i ? o : e.pageYOffset) : t[r] = o)
                }, t, r, arguments.length, null)
            }
        }), Z.each(["top", "left"], function(e, t) {
            Z.cssHooks[t] = k(Q.pixelPosition, function(e, n) {
                return n ? (n = w(e, t), Be.test(n) ? Z(e).position()[t] + "px" : n) : void 0
            })
        }), Z.each({
            Height: "height",
            Width: "width"
        }, function(e, t) {
            Z.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, function(n, i) {
                Z.fn[i] = function(i, r) {
                    var o = arguments.length && (n || "boolean" != typeof i),
                        a = n || (i === !0 || r === !0 ? "margin" : "border");
                    return me(this, function(t, n, i) {
                        var r;
                        return Z.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (r = t.documentElement, Math.max(t.body["scroll" + e], r["scroll" + e], t.body["offset" + e], r["offset" + e], r["client" + e])) : void 0 === i ? Z.css(t, n, a) : Z.style(t, n, i, a)
                    }, t, o ? i : void 0, o, null)
                }
            })
        }), Z.fn.size = function() {
            return this.length
        }, Z.fn.andSelf = Z.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
            return Z
        });
        var $t = e.jQuery,
            Lt = e.$;
        return Z.noConflict = function(t) {
            return e.$ === Z && (e.$ = Lt), t && e.jQuery === Z && (e.jQuery = $t), Z
        }, typeof t === Ee && (e.jQuery = e.$ = Z), Z
    }),
    function(e, t) {
        "undefined" != typeof exports ? t(e, exports, require("underscore")) : "function" == typeof define && define.amd ? define("backbone", ["underscore", "jquery", "exports"], function(n, i, r) {
            e.Backbone = t(e, r, n, i)
        }) : e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$)
    }(this, function(e, t, n, i) {
        var r = e.Backbone,
            o = [],
            a = (o.push, o.slice);
        o.splice;
        t.VERSION = "1.1.0", t.$ = i, t.noConflict = function() {
            return e.Backbone = r, this
        }, t.emulateHTTP = !1, t.emulateJSON = !1;
        var s = t.Events = {
                on: function(e, t, n) {
                    if (!c(this, "on", e, [t, n]) || !t) return this;
                    this._events || (this._events = {});
                    var i = this._events[e] || (this._events[e] = []);
                    return i.push({
                        callback: t,
                        context: n,
                        ctx: n || this
                    }), this
                },
                once: function(e, t, i) {
                    if (!c(this, "once", e, [t, i]) || !t) return this;
                    var r = this,
                        o = n.once(function() {
                            r.off(e, o), t.apply(this, arguments)
                        });
                    return o._callback = t, this.on(e, o, i)
                },
                off: function(e, t, i) {
                    var r, o, a, s, u, l, f, h;
                    if (!this._events || !c(this, "off", e, [t, i])) return this;
                    if (!e && !t && !i) return this._events = {}, this;
                    for (s = e ? [e] : n.keys(this._events), u = 0, l = s.length; l > u; u++)
                        if (e = s[u], a = this._events[e]) {
                            if (this._events[e] = r = [], t || i)
                                for (f = 0, h = a.length; h > f; f++) o = a[f], (t && t !== o.callback && t !== o.callback._callback || i && i !== o.context) && r.push(o);
                            r.length || delete this._events[e]
                        }
                    return this
                },
                trigger: function(e) {
                    if (!this._events) return this;
                    var t = a.call(arguments, 1);
                    if (!c(this, "trigger", e, t)) return this;
                    var n = this._events[e],
                        i = this._events.all;
                    return n && l(n, t), i && l(i, arguments), this
                },
                stopListening: function(e, t, i) {
                    var r = this._listeningTo;
                    if (!r) return this;
                    var o = !t && !i;
                    i || "object" != typeof t || (i = this), e && ((r = {})[e._listenId] = e);
                    for (var a in r) e = r[a], e.off(t, i, this), (o || n.isEmpty(e._events)) && delete this._listeningTo[a];
                    return this
                }
            },
            u = /\s+/,
            c = function(e, t, n, i) {
                if (!n) return !0;
                if ("object" == typeof n) {
                    for (var r in n) e[t].apply(e, [r, n[r]].concat(i));
                    return !1
                }
                if (u.test(n)) {
                    for (var o = n.split(u), a = 0, s = o.length; s > a; a++) e[t].apply(e, [o[a]].concat(i));
                    return !1
                }
                return !0
            },
            l = function(e, t) {
                var n, i = -1,
                    r = e.length,
                    o = t[0],
                    a = t[1],
                    s = t[2];
                switch (t.length) {
                    case 0:
                        for (; ++i < r;)(n = e[i]).callback.call(n.ctx);
                        return;
                    case 1:
                        for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o);
                        return;
                    case 2:
                        for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o, a);
                        return;
                    case 3:
                        for (; ++i < r;)(n = e[i]).callback.call(n.ctx, o, a, s);
                        return;
                    default:
                        for (; ++i < r;)(n = e[i]).callback.apply(n.ctx, t)
                }
            },
            f = {
                listenTo: "on",
                listenToOnce: "once"
            };
        n.each(f, function(e, t) {
            s[t] = function(t, i, r) {
                var o = this._listeningTo || (this._listeningTo = {}),
                    a = t._listenId || (t._listenId = n.uniqueId("l"));
                return o[a] = t, r || "object" != typeof i || (r = this), t[e](i, r, this), this
            }
        }), s.bind = s.on, s.unbind = s.off, n.extend(t, s);
        var h = t.Model = function(e, t) {
            var i = e || {};
            t || (t = {}), this.cid = n.uniqueId("c"), this.attributes = {}, t.collection && (this.collection = t.collection), t.parse && (i = this.parse(i, t) || {}), i = n.defaults({}, i, n.result(this, "defaults")), this.set(i, t), this.changed = {}, this.initialize.apply(this, arguments)
        };
        n.extend(h.prototype, s, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            initialize: function() {},
            toJSON: function(e) {
                return n.clone(this.attributes)
            },
            sync: function() {
                return t.sync.apply(this, arguments)
            },
            get: function(e) {
                return this.attributes[e]
            },
            escape: function(e) {
                return n.escape(this.get(e))
            },
            has: function(e) {
                return null != this.get(e)
            },
            set: function(e, t, i) {
                var r, o, a, s, u, c, l, f;
                if (null == e) return this;
                if ("object" == typeof e ? (o = e, i = t) : (o = {})[e] = t, i || (i = {}), !this._validate(o, i)) return !1;
                a = i.unset, u = i.silent, s = [], c = this._changing, this._changing = !0, c || (this._previousAttributes = n.clone(this.attributes), this.changed = {}), f = this.attributes, l = this._previousAttributes, this.idAttribute in o && (this.id = o[this.idAttribute]);
                for (r in o) t = o[r], n.isEqual(f[r], t) || s.push(r), n.isEqual(l[r], t) ? delete this.changed[r] : this.changed[r] = t, a ? delete f[r] : f[r] = t;
                if (!u) {
                    s.length && (this._pending = !0);
                    for (var h = 0, d = s.length; d > h; h++) this.trigger("change:" + s[h], this, f[s[h]], i)
                }
                if (c) return this;
                if (!u)
                    for (; this._pending;) this._pending = !1, this.trigger("change", this, i);
                return this._pending = !1, this._changing = !1, this
            },
            unset: function(e, t) {
                return this.set(e, void 0, n.extend({}, t, {
                    unset: !0
                }))
            },
            clear: function(e) {
                var t = {};
                for (var i in this.attributes) t[i] = void 0;
                return this.set(t, n.extend({}, e, {
                    unset: !0
                }))
            },
            hasChanged: function(e) {
                return null == e ? !n.isEmpty(this.changed) : n.has(this.changed, e)
            },
            changedAttributes: function(e) {
                if (!e) return this.hasChanged() ? n.clone(this.changed) : !1;
                var t, i = !1,
                    r = this._changing ? this._previousAttributes : this.attributes;
                for (var o in e) n.isEqual(r[o], t = e[o]) || ((i || (i = {}))[o] = t);
                return i
            },
            previous: function(e) {
                return null != e && this._previousAttributes ? this._previousAttributes[e] : null
            },
            previousAttributes: function() {
                return n.clone(this._previousAttributes)
            },
            fetch: function(e) {
                e = e ? n.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
                var t = this,
                    i = e.success;
                return e.success = function(n) {
                    return t.set(t.parse(n, e), e) ? (i && i(t, n, e), void t.trigger("sync", t, n, e)) : !1
                }, L(this, e), this.sync("read", this, e)
            },
            save: function(e, t, i) {
                var r, o, a, s = this.attributes;
                if (null == e || "object" == typeof e ? (r = e, i = t) : (r = {})[e] = t, i = n.extend({
                        validate: !0
                    }, i), r && !i.wait) {
                    if (!this.set(r, i)) return !1
                } else if (!this._validate(r, i)) return !1;
                r && i.wait && (this.attributes = n.extend({}, s, r)), void 0 === i.parse && (i.parse = !0);
                var u = this,
                    c = i.success;
                return i.success = function(e) {
                    u.attributes = s;
                    var t = u.parse(e, i);
                    return i.wait && (t = n.extend(r || {}, t)), n.isObject(t) && !u.set(t, i) ? !1 : (c && c(u, e, i), void u.trigger("sync", u, e, i))
                }, L(this, i), o = this.isNew() ? "create" : i.patch ? "patch" : "update", "patch" === o && (i.attrs = r), a = this.sync(o, this, i), r && i.wait && (this.attributes = s), a
            },
            destroy: function(e) {
                e = e ? n.clone(e) : {};
                var t = this,
                    i = e.success,
                    r = function() {
                        t.trigger("destroy", t, t.collection, e)
                    };
                if (e.success = function(n) {
                        (e.wait || t.isNew()) && r(), i && i(t, n, e), t.isNew() || t.trigger("sync", t, n, e)
                    }, this.isNew()) return e.success(), !1;
                L(this, e);
                var o = this.sync("delete", this, e);
                return e.wait || r(), o
            },
            url: function() {
                var e = n.result(this, "urlRoot") || n.result(this.collection, "url") || $();
                return this.isNew() ? e : e + ("/" === e.charAt(e.length - 1) ? "" : "/") + encodeURIComponent(this.id)
            },
            parse: function(e, t) {
                return e
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return null == this.id
            },
            isValid: function(e) {
                return this._validate({}, n.extend(e || {}, {
                    validate: !0
                }))
            },
            _validate: function(e, t) {
                if (!t.validate || !this.validate) return !0;
                e = n.extend({}, this.attributes, e);
                var i = this.validationError = this.validate(e, t) || null;
                return i ? (this.trigger("invalid", this, i, n.extend(t, {
                    validationError: i
                })), !1) : !0
            }
        });
        var d = ["keys", "values", "pairs", "invert", "pick", "omit"];
        n.each(d, function(e) {
            h.prototype[e] = function() {
                var t = a.call(arguments);
                return t.unshift(this.attributes), n[e].apply(n, t)
            }
        });
        var p = t.Collection = function(e, t) {
                t || (t = {}), t.model && (this.model = t.model), void 0 !== t.comparator && (this.comparator = t.comparator), this._reset(), this.initialize.apply(this, arguments), e && this.reset(e, n.extend({
                    silent: !0
                }, t))
            },
            g = {
                add: !0,
                remove: !0,
                merge: !0
            },
            m = {
                add: !0,
                remove: !1
            };
        n.extend(p.prototype, s, {
            model: h,
            initialize: function() {},
            toJSON: function(e) {
                return this.map(function(t) {
                    return t.toJSON(e)
                })
            },
            sync: function() {
                return t.sync.apply(this, arguments)
            },
            add: function(e, t) {
                return this.set(e, n.extend({
                    merge: !1
                }, t, m))
            },
            remove: function(e, t) {
                var i = !n.isArray(e);
                e = i ? [e] : n.clone(e), t || (t = {});
                var r, o, a, s;
                for (r = 0, o = e.length; o > r; r++) s = e[r] = this.get(e[r]), s && (delete this._byId[s.id], delete this._byId[s.cid], a = this.indexOf(s), this.models.splice(a, 1), this.length--, t.silent || (t.index = a, s.trigger("remove", s, this, t)), this._removeReference(s));
                return i ? e[0] : e
            },
            set: function(e, t) {
                t = n.defaults({}, t, g), t.parse && (e = this.parse(e, t));
                var i = !n.isArray(e);
                e = i ? e ? [e] : [] : n.clone(e);
                var r, o, a, s, u, c, l, f = t.at,
                    d = this.model,
                    p = this.comparator && null == f && t.sort !== !1,
                    m = n.isString(this.comparator) ? this.comparator : null,
                    v = [],
                    y = [],
                    b = {},
                    x = t.add,
                    w = t.merge,
                    k = t.remove,
                    T = !p && x && k ? [] : !1;
                for (r = 0, o = e.length; o > r; r++) {
                    if (u = e[r], a = u instanceof h ? s = u : u[d.prototype.idAttribute], c = this.get(a)) k && (b[c.cid] = !0), w && (u = u === s ? s.attributes : u, t.parse && (u = c.parse(u, t)), c.set(u, t), p && !l && c.hasChanged(m) && (l = !0)), e[r] = c;
                    else if (x) {
                        if (s = e[r] = this._prepareModel(u, t), !s) continue;
                        v.push(s), s.on("all", this._onModelEvent, this), this._byId[s.cid] = s, null != s.id && (this._byId[s.id] = s)
                    }
                    T && T.push(c || s)
                }
                if (k) {
                    for (r = 0, o = this.length; o > r; ++r) b[(s = this.models[r]).cid] || y.push(s);
                    y.length && this.remove(y, t)
                }
                if (v.length || T && T.length)
                    if (p && (l = !0), this.length += v.length, null != f)
                        for (r = 0, o = v.length; o > r; r++) this.models.splice(f + r, 0, v[r]);
                    else {
                        T && (this.models.length = 0);
                        var C = T || v;
                        for (r = 0, o = C.length; o > r; r++) this.models.push(C[r])
                    }
                if (l && this.sort({
                        silent: !0
                    }), !t.silent) {
                    for (r = 0, o = v.length; o > r; r++)(s = v[r]).trigger("add", s, this, t);
                    (l || T && T.length) && this.trigger("sort", this, t)
                }
                return i ? e[0] : e
            },
            reset: function(e, t) {
                t || (t = {});
                for (var i = 0, r = this.models.length; r > i; i++) this._removeReference(this.models[i]);
                return t.previousModels = this.models, this._reset(), e = this.add(e, n.extend({
                    silent: !0
                }, t)), t.silent || this.trigger("reset", this, t), e
            },
            push: function(e, t) {
                return this.add(e, n.extend({
                    at: this.length
                }, t))
            },
            pop: function(e) {
                var t = this.at(this.length - 1);
                return this.remove(t, e), t
            },
            unshift: function(e, t) {
                return this.add(e, n.extend({
                    at: 0
                }, t))
            },
            shift: function(e) {
                var t = this.at(0);
                return this.remove(t, e), t
            },
            slice: function() {
                return a.apply(this.models, arguments)
            },
            get: function(e) {
                return null != e ? this._byId[e.id] || this._byId[e.cid] || this._byId[e] : void 0
            },
            at: function(e) {
                return this.models[e]
            },
            where: function(e, t) {
                return n.isEmpty(e) ? t ? void 0 : [] : this[t ? "find" : "filter"](function(t) {
                    for (var n in e)
                        if (e[n] !== t.get(n)) return !1;
                    return !0
                })
            },
            findWhere: function(e) {
                return this.where(e, !0)
            },
            sort: function(e) {
                if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
                return e || (e = {}), n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) : this.models.sort(n.bind(this.comparator, this)), e.silent || this.trigger("sort", this, e), this
            },
            pluck: function(e) {
                return n.invoke(this.models, "get", e)
            },
            fetch: function(e) {
                e = e ? n.clone(e) : {}, void 0 === e.parse && (e.parse = !0);
                var t = e.success,
                    i = this;
                return e.success = function(n) {
                    var r = e.reset ? "reset" : "set";
                    i[r](n, e), t && t(i, n, e), i.trigger("sync", i, n, e)
                }, L(this, e), this.sync("read", this, e)
            },
            create: function(e, t) {
                if (t = t ? n.clone(t) : {}, !(e = this._prepareModel(e, t))) return !1;
                t.wait || this.add(e, t);
                var i = this,
                    r = t.success;
                return t.success = function(e, t, n) {
                    n.wait && i.add(e, n), r && r(e, t, n)
                }, e.save(null, t), e
            },
            parse: function(e, t) {
                return e
            },
            clone: function() {
                return new this.constructor(this.models)
            },
            _reset: function() {
                this.length = 0, this.models = [], this._byId = {}
            },
            _prepareModel: function(e, t) {
                if (e instanceof h) return e.collection || (e.collection = this), e;
                t = t ? n.clone(t) : {}, t.collection = this;
                var i = new this.model(e, t);
                return i.validationError ? (this.trigger("invalid", this, i.validationError, t), !1) : i
            },
            _removeReference: function(e) {
                this === e.collection && delete e.collection, e.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(e, t, n, i) {
                ("add" !== e && "remove" !== e || n === this) && ("destroy" === e && this.remove(t, i), t && e === "change:" + t.idAttribute && (delete this._byId[t.previous(t.idAttribute)], null != t.id && (this._byId[t.id] = t)), this.trigger.apply(this, arguments))
            }
        });
        var v = ["forEach", "each", "map", "collect", "reduce", "foldl", "inject", "reduceRight", "foldr", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "toArray", "size", "first", "head", "take", "initial", "rest", "tail", "drop", "last", "without", "difference", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "chain"];
        n.each(v, function(e) {
            p.prototype[e] = function() {
                var t = a.call(arguments);
                return t.unshift(this.models), n[e].apply(n, t)
            }
        });
        var y = ["groupBy", "countBy", "sortBy"];
        n.each(y, function(e) {
            p.prototype[e] = function(t, i) {
                var r = n.isFunction(t) ? t : function(e) {
                    return e.get(t)
                };
                return n[e](this.models, r, i)
            }
        });
        var b = t.View = function(e) {
                this.cid = n.uniqueId("view"), e || (e = {}), n.extend(this, n.pick(e, w)), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents()
            },
            x = /^(\S+)\s*(.*)$/,
            w = ["model", "collection", "el", "id", "attributes", "className", "tagName", "events"];
        n.extend(b.prototype, s, {
            tagName: "div",
            $: function(e) {
                return this.$el.find(e)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                return this.$el.remove(), this.stopListening(), this
            },
            setElement: function(e, n) {
                return this.$el && this.undelegateEvents(), this.$el = e instanceof t.$ ? e : t.$(e), this.el = this.$el[0], n !== !1 && this.delegateEvents(), this
            },
            delegateEvents: function(e) {
                if (!e && !(e = n.result(this, "events"))) return this;
                this.undelegateEvents();
                for (var t in e) {
                    var i = e[t];
                    if (n.isFunction(i) || (i = this[e[t]]), i) {
                        var r = t.match(x),
                            o = r[1],
                            a = r[2];
                        i = n.bind(i, this), o += ".delegateEvents" + this.cid, "" === a ? this.$el.on(o, i) : this.$el.on(o, a, i)
                    }
                }
                return this
            },
            undelegateEvents: function() {
                return this.$el.off(".delegateEvents" + this.cid), this
            },
            _ensureElement: function() {
                if (this.el) this.setElement(n.result(this, "el"), !1);
                else {
                    var e = n.extend({}, n.result(this, "attributes"));
                    this.id && (e.id = n.result(this, "id")), this.className && (e["class"] = n.result(this, "className"));
                    var i = t.$("<" + n.result(this, "tagName") + ">").attr(e);
                    this.setElement(i, !1)
                }
            }
        }), t.sync = function(e, i, r) {
            var o = T[e];
            n.defaults(r || (r = {}), {
                emulateHTTP: t.emulateHTTP,
                emulateJSON: t.emulateJSON
            });
            var a = {
                type: o,
                dataType: "json"
            };
            if (r.url || (a.url = n.result(i, "url") || $()), null != r.data || !i || "create" !== e && "update" !== e && "patch" !== e || (a.contentType = "application/json", a.data = JSON.stringify(r.attrs || i.toJSON(r))), r.emulateJSON && (a.contentType = "application/x-www-form-urlencoded", a.data = a.data ? {
                    model: a.data
                } : {}), r.emulateHTTP && ("PUT" === o || "DELETE" === o || "PATCH" === o)) {
                a.type = "POST", r.emulateJSON && (a.data._method = o);
                var s = r.beforeSend;
                r.beforeSend = function(e) {
                    return e.setRequestHeader("X-HTTP-Method-Override", o), s ? s.apply(this, arguments) : void 0
                }
            }
            "GET" === a.type || r.emulateJSON || (a.processData = !1), "PATCH" === a.type && k && (a.xhr = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            });
            var u = r.xhr = t.ajax(n.extend(a, r));
            return i.trigger("request", i, u, r), u
        };
        var k = !("undefined" == typeof window || !window.ActiveXObject || window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent),
            T = {
                create: "POST",
                update: "PUT",
                patch: "PATCH",
                "delete": "DELETE",
                read: "GET"
            };
        t.ajax = function() {
            return t.$.ajax.apply(t.$, arguments)
        };
        var C = t.Router = function(e) {
                e || (e = {}), e.routes && (this.routes = e.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
            },
            E = /\((.*?)\)/g,
            S = /(\(\?)?:\w+/g,
            A = /\*\w+/g,
            j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        n.extend(C.prototype, s, {
            initialize: function() {},
            route: function(e, i, r) {
                n.isRegExp(e) || (e = this._routeToRegExp(e)), n.isFunction(i) && (r = i, i = ""), r || (r = this[i]);
                var o = this;
                return t.history.route(e, function(n) {
                    var a = o._extractParameters(e, n);
                    r && r.apply(o, a), o.trigger.apply(o, ["route:" + i].concat(a)), o.trigger("route", i, a), t.history.trigger("route", o, i, a)
                }), this
            },
            navigate: function(e, n) {
                return t.history.navigate(e, n), this
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = n.result(this, "routes");
                    for (var e, t = n.keys(this.routes); null != (e = t.pop());) this.route(e, this.routes[e])
                }
            },
            _routeToRegExp: function(e) {
                return e = e.replace(j, "\\$&").replace(E, "(?:$1)?").replace(S, function(e, t) {
                    return t ? e : "([^/]+)"
                }).replace(A, "(.*?)"), new RegExp("^" + e + "$")
            },
            _extractParameters: function(e, t) {
                var i = e.exec(t).slice(1);
                return n.map(i, function(e) {
                    return e ? decodeURIComponent(e) : null
                })
            }
        });
        var _ = t.History = function() {
                this.handlers = [], n.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
            },
            N = /^[#\/]|\s+$/g,
            q = /^\/+|\/+$/g,
            O = /msie [\w.]+/,
            D = /\/$/,
            I = /[?#].*$/;
        _.started = !1, n.extend(_.prototype, s, {
            interval: 50,
            getHash: function(e) {
                var t = (e || this).location.href.match(/#(.*)$/);
                return t ? t[1] : ""
            },
            getFragment: function(e, t) {
                if (null == e)
                    if (this._hasPushState || !this._wantsHashChange || t) {
                        e = this.location.pathname;
                        var n = this.root.replace(D, "");
                        e.indexOf(n) || (e = e.slice(n.length))
                    } else e = this.getHash();
                return e.replace(N, "")
            },
            start: function(e) {
                if (_.started) throw new Error("Backbone.history has already been started");
                _.started = !0, this.options = n.extend({
                    root: "/"
                }, this.options, e), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var i = this.getFragment(),
                    r = document.documentMode,
                    o = O.exec(navigator.userAgent.toLowerCase()) && (!r || 7 >= r);
                this.root = ("/" + this.root + "/").replace(q, "/"), o && this._wantsHashChange && (this.iframe = t.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(i)), this._hasPushState ? t.$(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !o ? t.$(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = i;
                var a = this.location,
                    s = a.pathname.replace(/[^\/]$/, "$&/") === this.root;
                if (this._wantsHashChange && this._wantsPushState) {
                    if (!this._hasPushState && !s) return this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0;
                    this._hasPushState && s && a.hash && (this.fragment = this.getHash().replace(N, ""), this.history.replaceState({}, document.title, this.root + this.fragment + a.search))
                }
                return this.options.silent ? void 0 : this.loadUrl()
            },
            stop: function() {
                t.$(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), _.started = !1
            },
            route: function(e, t) {
                this.handlers.unshift({
                    route: e,
                    callback: t
                })
            },
            checkUrl: function(e) {
                var t = this.getFragment();
                return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))), t === this.fragment ? !1 : (this.iframe && this.navigate(t), void this.loadUrl())
            },
            loadUrl: function(e) {
                return e = this.fragment = this.getFragment(e), n.any(this.handlers, function(t) {
                    return t.route.test(e) ? (t.callback(e), !0) : void 0
                })
            },
            navigate: function(e, t) {
                if (!_.started) return !1;
                t && t !== !0 || (t = {
                    trigger: !!t
                });
                var n = this.root + (e = this.getFragment(e || ""));
                if (e = e.replace(I, ""), this.fragment !== e) {
                    if (this.fragment = e, "" === e && "/" !== n && (n = n.slice(0, -1)), this._hasPushState) this.history[t.replace ? "replaceState" : "pushState"]({}, document.title, n);
                    else {
                        if (!this._wantsHashChange) return this.location.assign(n);
                        this._updateHash(this.location, e, t.replace), this.iframe && e !== this.getFragment(this.getHash(this.iframe)) && (t.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, e, t.replace))
                    }
                    return t.trigger ? this.loadUrl(e) : void 0
                }
            },
            _updateHash: function(e, t, n) {
                if (n) {
                    var i = e.href.replace(/(javascript:|#).*$/, "");
                    e.replace(i + "#" + t)
                } else e.hash = "#" + t
            }
        }), t.history = new _;
        var M = function(e, t) {
            var i, r = this;
            i = e && n.has(e, "constructor") ? e.constructor : function() {
                return r.apply(this, arguments)
            }, n.extend(i, r, t);
            var o = function() {
                this.constructor = i
            };
            return o.prototype = r.prototype, i.prototype = new o, e && n.extend(i.prototype, e), i.__super__ = r.prototype, i
        };
        h.extend = p.extend = C.extend = b.extend = _.extend = M;
        var $ = function() {
                throw new Error('A "url" property or function must be specified')
            },
            L = function(e, t) {
                var n = t.error;
                t.error = function(i) {
                    n && n(e, i, t), e.trigger("error", e, i, t)
                }
            };
        return t
    }), define("router", ["backbone"], function(e) {
        var t = e.Router.extend({
            initialize: function() {
                App.States.firstRun = !0, this.initUrls()
            },
            initUrls: function() {
                $("a[class*=js-action]").click(function(e) {
                    e.preventDefault(), window.App.Routers.Main.navigate($(this).attr("href"), !0)
                })
            },
            routes: {
                "": "intro",
                "blog/:query/": "article"
            },
            intro: function() {
                $("html").addClass("disable-overflow"), this.initUrls(), App.Views.Main.removeAllLoaders(), App.States.firstRun ? App.States.firstRun = !1 : App.Views.Main.slideRight()
            },
            article: function(e) {
                $("html").addClass("disable-overflow"), App.Views.Main.runBackgroundCheck(), App.States.firstRun ? App.Views.Main.fetchList() : App.Views.Main.openArticle(e)
            }
        });
        return t
    }), ! function(e, t) {
        "function" == typeof define && define.amd ? define("plugins/background-check", t) : e.BackgroundCheck = t(e)
    }(this, function() {
        "use strict";

        function e(e) {
            if (void 0 === e || void 0 === e.targets) throw "Missing attributes";
            D.debug = i(e.debug, !1), D.debugOverlay = i(e.debugOverlay, !1), D.targets = a(e.targets), D.images = a(e.images || "img", !0), D.changeParent = i(e.changeParent, !1), D.threshold = i(e.threshold, 50), D.minComplexity = i(e.minComplexity, 30), D.minOverlap = i(e.minOverlap, 50), D.windowEvents = i(e.windowEvents, !0), D.maxDuration = i(e.maxDuration, 500), D.mask = i(e.mask, {
                r: 0,
                g: 255,
                b: 0
            }), D.classes = i(e.classes, {
                dark: "background--dark",
                light: "background--light",
                complex: "background--complex"
            }), void 0 === A && (s(), A && (j.style.position = "fixed", j.style.top = "0px", j.style.left = "0px", j.style.width = "100%", j.style.height = "100%", window.addEventListener(O, T.bind(null, function() {
                l(), k()
            })), window.addEventListener("scroll", T.bind(null, k)), l(), k()))
        }

        function t() {
            A = null, j = null, _ = null, D = {}, N && clearTimeout(N)
        }

        function n(e) {
            E("debug") && console.log(e)
        }

        function i(e, t) {
            return r(e, typeof t), void 0 === e ? t : e
        }

        function r(e, t) {
            if (void 0 !== e && typeof e !== t) throw "Incorrect attribute type"
        }

        function o(e) {
            for (var t, i, r = [], o = 0; o < e.length; o++)
                if (t = e[o], r.push(t), "IMG" !== t.tagName) {
                    if (i = window.getComputedStyle(t).backgroundImage, i.split(/,url|, url/).length > 1) throw "Multiple backgrounds are not supported";
                    if (!i || "none" === i) throw "Element is not an <img> but does not have a background-image";
                    r[o] = {
                        img: new Image,
                        el: r[o]
                    }, i = i.slice(4, -1), i = i.replace(/"/g, ""), r[o].img.src = i, n("CSS Image - " + i)
                }
            return r
        }

        function a(e, t) {
            var n = e;
            if ("string" == typeof e ? n = document.querySelectorAll(e) : e && 1 === e.nodeType && (n = [e]), !n || 0 === n.length || void 0 === n.length) throw "Elements not found";
            return t && (n = o(n)), n = Array.prototype.slice.call(n)
        }

        function s() {
            j = document.createElement("canvas"), j && j.getContext ? (_ = j.getContext("2d"), A = !0) : A = !1, u()
        }

        function u() {
            E("debugOverlay") ? (j.style.opacity = .5, j.style.pointerEvents = "none", document.body.appendChild(j)) : j.parentNode && j.parentNode.removeChild(j)
        }

        function c(e) {
            var i = (new Date).getTime() - e;
            n("Duration: " + i + "ms"), i > E("maxDuration") && (console.log("BackgroundCheck - Killed"), m(), t())
        }

        function l() {
            q = {
                left: 0,
                top: 0,
                right: document.body.clientWidth,
                bottom: window.innerHeight
            }, j.width = document.body.clientWidth, j.height = window.innerHeight
        }

        function f(e, t, n) {
            var i, r;
            return -1 !== e.indexOf("px") ? i = parseFloat(e) : -1 !== e.indexOf("%") ? (i = parseFloat(e), r = i / 100, i = r * t, n && (i -= n * r)) : i = t, i
        }

        function h(e) {
            var t = window.getComputedStyle(e.el);
            e.el.style.backgroundRepeat = "no-repeat", e.el.style.backgroundOrigin = "padding-box";
            var n = t.backgroundSize.split(" "),
                i = n[0],
                r = void 0 === n[1] ? "auto" : n[1],
                o = e.el.clientWidth / e.el.clientHeight,
                a = e.img.naturalWidth / e.img.naturalHeight;
            "cover" === i ? o >= a ? (i = "100%", r = "auto") : (i = "auto", n[0] = "auto", r = "100%") : "contain" === i && (1 / a > 1 / o ? (i = "auto", n[0] = "auto", r = "100%") : (i = "100%", r = "auto")), i = "auto" === i ? e.img.naturalWidth : f(i, e.el.clientWidth), r = "auto" === r ? i / e.img.naturalWidth * e.img.naturalHeight : f(r, e.el.clientHeight), "auto" === n[0] && "auto" !== n[1] && (i = r / e.img.naturalHeight * e.img.naturalWidth);
            var s = t.backgroundPosition;
            "top" === s ? s = "50% 0%" : "left" === s ? s = "0% 50%" : "right" === s ? s = "100% 50%" : "bottom" === s ? s = "50% 100%" : "center" === s && (s = "50% 50%"), s = s.split(" ");
            var u, c;
            return 4 === s.length ? (u = s[1], c = s[3]) : (u = s[0], c = s[1]), c = c || "50%", u = f(u, e.el.clientWidth, i), c = f(c, e.el.clientHeight, r), 4 === s.length && ("right" === s[0] && (u = e.el.clientWidth - e.img.naturalWidth - u), "bottom" === s[2] && (c = e.el.clientHeight - e.img.naturalHeight - c)), u += e.el.getBoundingClientRect().left, c += e.el.getBoundingClientRect().top, {
                left: Math.floor(u),
                right: Math.floor(u + i),
                top: Math.floor(c),
                bottom: Math.floor(c + r),
                width: Math.floor(i),
                height: Math.floor(r)
            }
        }

        function d(e) {
            var t, n, i;
            if (e.nodeType) {
                var r = e.getBoundingClientRect();
                t = {
                    left: r.left,
                    right: r.right,
                    top: r.top,
                    bottom: r.bottom,
                    width: r.width,
                    height: r.height
                }, i = e.parentNode, n = e
            } else t = h(e), i = e.el, n = e.img;
            i = i.getBoundingClientRect(), t.imageTop = 0, t.imageLeft = 0, t.imageWidth = n.naturalWidth, t.imageHeight = n.naturalHeight;
            var o, a = t.imageHeight / t.height;
            return t.top < i.top && (o = i.top - t.top, t.imageTop = a * o, t.imageHeight -= a * o, t.top += o, t.height -= o), t.left < i.left && (o = i.left - t.left, t.imageLeft += a * o, t.imageWidth -= a * o, t.width -= o, t.left += o), t.bottom > i.bottom && (o = t.bottom - i.bottom, t.imageHeight -= a * o, t.height -= o), t.right > i.right && (o = t.right - i.right, t.imageWidth -= a * o, t.width -= o), t.imageTop = Math.floor(t.imageTop), t.imageLeft = Math.floor(t.imageLeft), t.imageHeight = Math.floor(t.imageHeight), t.imageWidth = Math.floor(t.imageWidth), t
        }

        function p(e) {
            var t = d(e);
            e = e.nodeType ? e : e.img, t.imageWidth > 0 && t.imageHeight > 0 && t.width > 0 && t.height > 0 ? _.drawImage(e, t.imageLeft, t.imageTop, t.imageWidth, t.imageHeight, t.left, t.top, t.width, t.height) : n("Skipping image - " + e.src + " - area too small")
        }

        function g(e, t, n) {
            var i = e.className;
            switch (n) {
                case "add":
                    i += " " + t;
                    break;
                case "remove":
                    var r = new RegExp("(?:^|\\s)" + t + "(?!\\S)", "g");
                    i = i.replace(r, "")
            }
            e.className = i.trim()
        }

        function m(e) {
            for (var t, n = e ? [e] : E("targets"), i = 0; i < n.length; i++) t = n[i], t = E("changeParent") ? t.parentNode : t, g(t, E("classes").light, "remove"), g(t, E("classes").dark, "remove"), g(t, E("classes").complex, "remove")
        }

        function v(e) {
            var t, i, r, o, a = e.getBoundingClientRect(),
                s = 0,
                u = 0,
                c = 0,
                l = 0,
                f = E("mask");
            if (a.width > 0 && a.height > 0) {
                m(e), e = E("changeParent") ? e.parentNode : e, i = _.getImageData(a.left, a.top, a.width, a.height).data;
                for (var h = 0; h < i.length; h += 4) i[h] === f.r && i[h + 1] === f.g && i[h + 2] === f.b ? l++ : (s++, t = .2126 * i[h] + .7152 * i[h + 1] + .0722 * i[h + 2], r = t - c, u += r * r, c += r / s);
                l <= i.length / 4 * (1 - E("minOverlap") / 100) && (o = Math.sqrt(u / s) / 255, c /= 255, n("Target: " + e.className + " lum: " + c + " var: " + o), g(e, c <= E("threshold") / 100 ? E("classes").dark : E("classes").light, "add"), o > E("minComplexity") / 100 && g(e, E("classes").complex, "add"))
            }
        }

        function y(e, t) {
            return e = (e.nodeType ? e : e.el).getBoundingClientRect(), t = t === q ? t : (t.nodeType ? t : t.el).getBoundingClientRect(), !(e.right < t.left || e.left > t.right || e.top > t.bottom || e.bottom < t.top)
        }

        function b(e) {
            for (var t, n = (new Date).getTime(), i = e && ("IMG" === e.tagName || e.img) ? "image" : "targets", r = e ? !1 : !0, o = E("targets").length, a = 0; o > a; a++) t = E("targets")[a], y(t, q) && ("targets" !== i || e && e !== t ? "image" === i && y(t, e) && v(t) : (r = !0, v(t)));
            if ("targets" === i && !r) throw e + " is not a target";
            c(n)
        }

        function x(e) {
            var t = function(e) {
                    var t = 0;
                    return "static" !== window.getComputedStyle(e).position && (t = parseInt(window.getComputedStyle(e).zIndex, 10) || 0, t >= 0 && t++), t
                },
                n = e.parentNode,
                i = n ? t(n) : 0,
                r = t(e);
            return 1e5 * i + r
        }

        function w(e) {
            var t = !1;
            return e.sort(function(e, n) {
                e = e.nodeType ? e : e.el, n = n.nodeType ? n : n.el;
                var i = e.compareDocumentPosition(n),
                    r = 0;
                return e = x(e), n = x(n), e > n && (t = !0), e === n && 2 === i ? r = 1 : e === n && 4 === i && (r = -1), r || e - n
            }), n("Sorted: " + t), t && n(e), t
        }

        function k(e, t, i) {
            if (A) {
                var r = E("mask");
                n("--- BackgroundCheck ---"), n("onLoad event: " + (i && i.src)), t !== !0 && (_.clearRect(0, 0, j.width, j.height), _.fillStyle = "rgb(" + r.r + ", " + r.g + ", " + r.b + ")", _.fillRect(0, 0, j.width, j.height));
                for (var o, a, s = i ? [i] : E("images"), u = w(s), c = !1, l = 0; l < s.length; l++) o = s[l], y(o, q) && (a = o.nodeType ? o : o.img, 0 === a.naturalWidth ? (c = !0, n("Loading... " + o.src), a.removeEventListener("load", k), u ? a.addEventListener("load", k.bind(null, null, !1, null)) : a.addEventListener("load", k.bind(null, e, !0, o))) : (n("Drawing: " + o.src), p(o)));
                i || c ? i && b(i) : b(e)
            }
        }

        function T(e) {
            E("windowEvents") === !0 && (N && clearTimeout(N), N = setTimeout(e, 200))
        }

        function C(e, t) {
            if (void 0 === D[e]) throw "Unknown property - " + e;
            if (void 0 === t) throw "Missing value for " + e;
            if ("targets" === e || "images" === e) try {
                t = a("images" !== e || t ? t : "img", "images" === e ? !0 : !1)
            } catch (n) {
                throw t = [], n
            } else r(t, typeof D[e]);
            m(), D[e] = t, k(), "debugOverlay" === e && u()
        }

        function E(e) {
            if (void 0 === D[e]) throw "Unknown property - " + e;
            return D[e]
        }

        function S() {
            for (var e, t = E("images"), n = [], i = 0; i < t.length; i++) e = d(t[i]), n.push(e);
            return n
        }
        var A, j, _, N, q, O = void 0 !== window.orientation ? "orientationchange" : "resize",
            D = {};
        return {
            init: e,
            destroy: t,
            refresh: k,
            set: C,
            get: E,
            getImageData: S
        }
    }), define("plugins/autogrow", ["jquery"], function(e) {
        ! function(e) {
            e.fn.autogrow = function(t) {
                function n(n) {
                    var i, r = e(this),
                        o = r.innerHeight(),
                        a = this.scrollHeight,
                        s = r.data("autogrow-start-height") || 0;
                    if (a > o) this.scrollTop = 0, t.animate ? r.stop().animate({
                        height: a
                    }, t.speed) : r.innerHeight(a);
                    else if (!n || 8 == n.which || 46 == n.which || n.ctrlKey && 88 == n.which)
                        if (o > s) {
                            i = r.clone().addClass(t.cloneClass).css({
                                position: "absolute",
                                zIndex: -10,
                                height: ""
                            }).val(r.val()), r.after(i);
                            do a = i[0].scrollHeight - 1, i.innerHeight(a); while (a === i[0].scrollHeight);
                            a++, i.remove(), r.focus(), s > a && (a = s), o > a && t.animate ? r.stop().animate({
                                height: a
                            }, t.speed) : r.innerHeight(a)
                        } else r.innerHeight(s)
                }
                var i = e(this).css({
                        overflow: "hidden",
                        resize: "none"
                    }),
                    r = i.selector,
                    o = {
                        context: e(document),
                        animate: !0,
                        speed: 200,
                        fixMinHeight: !0,
                        cloneClass: "autogrowclone",
                        onInitialize: !1
                    };
                return t = e.isPlainObject(t) ? t : {
                    context: t ? t : e(document)
                }, t = e.extend({}, o, t), i.each(function(i, r) {
                    var o, a;
                    r = e(r), r.is(":visible") || parseInt(r.css("height"), 10) > 0 ? o = parseInt(r.css("height"), 10) || r.innerHeight() : (a = r.clone().addClass(t.cloneClass).val(r.val()).css({
                        position: "absolute",
                        visibility: "hidden",
                        display: "block"
                    }), e("body").append(a), o = a.innerHeight(), a.remove()), t.fixMinHeight && r.data("autogrow-start-height", o), r.css("height", o), t.onInitialize && r.length && n.call(r[0])
                }), t.context.on("keyup paste", r, n), i
            }
        }(e)
    }), define("cookie", [], function() {
        var e = function() {
            return {
                getItem: function(e) {
                    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
                },
                setItem: function(e, t, n, i, r, o) {
                    if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
                    var a = "";
                    if (n) switch (n.constructor) {
                        case Number:
                            a = n === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + n;
                            break;
                        case String:
                            a = "; expires=" + n;
                            break;
                        case Date:
                            a = "; expires=" + n.toUTCString()
                    }
                    return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + a + (r ? "; domain=" + r : "") + (i ? "; path=" + i : "") + (o ? "; secure" : ""), !0
                },
                removeItem: function(e, t, n) {
                    return e && this.hasItem(e) ? (document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (n ? "; domain=" + n : "") + (t ? "; path=" + t : ""), !0) : !1
                },
                hasItem: function(e) {
                    return new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
                },
                keys: function() {
                    for (var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), t = 0; t < e.length; t++) e[t] = decodeURIComponent(e[t]);
                    return e
                }
            }
        };
        return e()
    }), define("conversation", [], function() {
        var prices=3;
//         var xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function() {
//         var status;
//         var data;
//         // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
//         if (xhr.readyState == 4) { // `DONE`
//             status = xhr.status;
//             if (status == 200) {
//                 data = JSON.parse(xhr.responseText);
//                 prices=data.fuel;
//             } else {
//                 errorHandler && errorHandler(status);
//             }
//         }
//     };

// xhr.open("GET", "https://e03e1b8e.ngrok.io/retrieve/order", false);
// xhr.send();

        var e = function(e) {
            return {
                greeting: e.hasSeenChat ? [e.welcomeBackGreeting, "How can I help you today?", "By the way, You have 45 shell points.", "45 shell points=20¢ off per gallon",'<img src="http://i.giphy.com/10UeedrT5MIfPG.gif"/>',"Wanna use your points?",{
                    type: "choose",
                    answers: [{
                        text: "Yeah ✔",
                        path: "fuel_options"
                    }, {
                        text: "No 🚫",
                        path: "main_menu"
                    }]
                }] : ["Hi there!", "I'm your Shell bot ⛽🤖.", "How can I help you today?", {
                    type: "choose",
                    answers: [{
                        text: "fuel ⛽",
                        path: "fuel_options"
                    }, {
                        text: "snacks 🍪",
                        path: "snack_options"
                    }, {
                        text: "restroom 🚻",
                        path: "restroom_options"
                    }]
                }],
                main_menu:["Sure.", "How can I help you today?", {
                    type: "choose",
                    answers: [{
                        text: "fuel ⛽",
                        path: "fuel_options"
                    }, {
                        text: "snacks 🍪",
                        path: "snack_options"
                    }, {
                        text: "restroom 🚻",
                        path: "restroom_options"
                    }]
                }],
                restroom_options: ["Happy to help you","Heres the code for the restroom","0000" ,{
                    type: "choose",
                    answers: [{
                        text: "fuel ⛽",
                        path: "fuel_options"
                    }, {
                        text: "snacks 🍪",
                        path: "snack_options"
                    }]
                }],
                fuel_options: ["Please select following options:",'Confirm and <a href="#dialog">Dialog only</a>', {
                    type: "choose",
                    answers: [{
                        text: "Regular $3/g",
                        path: "regular"
                    }, {
                        text: "Premium $3.2/g",
                        path: "regular"
                    },{
                        text: "Premium Plus $3.4/g",
                        path: "regular"
                    },{
                        text: "Diesel $2.7/g",
                        path: "regular"
                    }]
                }],
                regular: ["Please enter total gallons",{
                    type: "write",
                    name: "amount",
                    path: "confirm"
                }],
                regular_gallons: ["Please confirm total amount",prices,{
                    type: "choose",
                    answers: [{
                        text: "confirm and pay",
                        path: "bye-scroll"
                    },{
                        text: "go back",
                        path: "fuel_options"
                    }
                    ]
                }],
                snack_options: ["Please select following options:", {
                    type: "choose",
                    answers: [{
                        text: "Chips $1",
                        path: "chips_select"
                    }, {
                        text: "Beef Jerkey $2",
                        path: "jerkey_select"
                    },{
                        text: "Soda $1",
                        path: "soda_select"
                    },{
                        text: "Candies $1",
                        path: "candy_select"
                    },{
                        text: "Coffee $2",
                        path: "coffee_select"
                    }]
                }],
                chips_select: ["Select a brand:", {
                    type: "choose",
                    answers: [{
                        text: "Lays",
                        path: "select"
                    }, {
                        text: "Cheetos",
                        path: "select"
                    }]
                }],
                coffee_select: ["Select the type of coffee:", {
                    type: "choose",
                    answers: [{
                        text: "Cappuccino",
                        path: "select"
                    }, {
                        text: "Nescafe Dark Coffee",
                        path: "select"
                    }]
                }],
                candy_select: ["Select the type of candies:", {
                    type: "choose",
                    answers: [{
                        text: "Snickers",
                        path: "select"
                    }, {
                        text: "Toublourone",
                        path: "select"
                    },{
                        text: "ghiradelli squares",
                        path: "select"
                    },{
                        text: "M&M",
                        path: "select"
                    }]
                }],
                jerkey_select: ["Select a brand:", {
                    type: "choose",
                    answers: [{
                        text: "Beef Jerkey",
                        path: "select"
                    }, {
                        text: "Turkey Jurkey",
                        path: "select"
                    }]
                }],
                soda_select: ["Select a brand:", {
                    type: "choose",
                    answers: [{
                        text: "Pepsi",
                        path: "select"
                    }, {
                        text: "Coke",
                        path: "select"
                    },{
                        text: "7UP",
                        path: "select"
                    },{
                        text: "Dew",
                        path: "select"
                    },{
                        text: "Diet Coke",
                        path: "select"
                    },{
                        text: "Diet Pepsi",
                        path: "select"
                    }]
                }],
                select: ["Please enter quanity",{
                    type: "write",
                    name: "Enter total amount in $",
                    path: "confirm"
                }],
                confirm: ["Please confirm total amount", prices,{
                    type: "choose",
                    answers: [{
                        // text: "confirm and pay",
                        text:'Confirm and <a href="st.html">pay with card</a>',
                        path: "bye-scroll"
                    }]
                }],
                "bye-scroll": ["Alright! It was great talking to you! Gotta run! Enjoy!", "Abracadabra!",'<img src="https://media1.giphy.com/media/vtVpHbnPi9TLa/200.gif"/>'],
                "companies-realwork": ["Hah! Good one.", "Writing and speaking is part of my job. It gives me a broader perspective and helps me solve problems.👀🙇", "Speaking of writing, you can drop me a line and I'll get back to you. Otherwise, I'll let you browse my website for a little.", {
                    type: "choose",
                    answers: [{
                        text: "Let's talk!",
                        path: "contact"
                    }, {
                        text: "I'll browse a little...",
                        path: "bye-scroll"
                    }]
                }],
                companies: ["Here are some of the companies I've worked with, both on staff with iA and as an independent freelancer", "- Google<br>- iA<br>- Hinderling Volkart<br>- Red Bull<br>- The Guardian<br>", {
                    type: "choose",
                    answers: [{
                        text: "Cool. What did you do for them?",
                        path: "portfolio"
                    }]
                }],
                portfolio: ["I'm happy to talk about it over coffee. What do you think?", {
                    type: "choose",
                    answers: [{
                        text: "Cool! ☕️",
                        path: "contact-coffee"
                    }, {
                        text: "Nah... 😑",
                        path: "portfolio-nah"
                    }]
                }],
                "portfolio-nah": ["Alright... I understand. Coffee is not for everyone. How about tea then?", {
                    type: "choose",
                    answers: [{
                        text: "Ok, sure!",
                        path: "contact"
                    }, {
                        text: "Nah... 😒",
                        path: "portfolio-nah-nah"
                    }]
                }],
                "portfolio-nah-nah": ["Seems like we don't have so much in common. That's ok! Working with different individuals can be so enriching.", "I suggest you drop me a line and I promise to get back to you asap! Cool?", {
                    type: "choose",
                    answers: [{
                        text: "Ok, sure!",
                        path: "contact"
                    }, {
                        text: "Nah... 😒!!",
                        path: "hard-to-convince"
                    }]
                }],
                "hard-to-convince": ["Hmm... good chat! Maybe a little more about me... I like traveling and long walks on the beach.", "Speaking of beaches... I just came back from speaking Tel-Aviv. There was a great conference there.", '<iframe border=0 frameborder=0 height=250 width=550 src="http://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Fuxsalon%2Fstatus%2F722550897377677312"></iframe>', "Mike Monteiro ended up fighting a robot on stage! 😬 Are you perhaps UX field too?", {
                    type: "choose",
                    answers: [{
                        text: "Yes...",
                        path: "uidesigner-yes"
                    }, {
                        text: "No!",
                        path: "uidesigner-no"
                    }]
                }],
                contact: ["Great! I'm looking forward to it!", "Let me know what's on your mind and I'll get back to you asap!", {
                    type: "write",
                    path: "contact-thanks",
                    name: "message"
                }],
                "contact-coffee": ["Great! Nothing beats UX and coffee!", "What specifically did you want to discuss?", {
                    type: "write",
                    path: "contact-thanks",
                    name: "message"
                }],
                "contact-thanks": ["I'm intrigued! Thanks! I just need your email so I can get back to you!", {
                    type: "write",
                    name: "email"
                }],
                "contact-verify-email": ["That's one beautiful email address! I'll get back to you as soon as possible.", 'Meanwhile, you can check my website or go to <a href="http://www.google.com">Google.com</a> and try pressing the "I feel lucky" button. It might be your lucky day!', "Talk to you soon! Get ready to be scrolled! 🏃💨"],
                "contact-verify-email-failed": ["Your email reminds me of the poop emoji. Something doesn't feel quite right here... 💩", "Shall we try again? ;)", {
                    type: "choose",
                    answers: [{
                        text: "Yes, here it is...!",
                        path: "contact-verify-email-write-again"
                    }, {
                        text: "No!",
                        path: "contact-no-email"
                    }]
                }],
                "contact-verify-email-write-again": [{
                    type: "write",
                    name: "email"
                }],
                "contact-no-email": ["It's cool. I totally get it. Sometimes, sharing an email address can be a daunting thing to do.", "I unfortunately have to run now though. Make sure you come back, and we'll have another chat! :)", "See you in a bit! 👍🤗"],
                write: ["Yes! I strongly believe that writing helps me be a better designer. You can check out some of my most popular articles! 👓", '- <a target="_blank" href="https://medium.com/swlh/the-illusion-of-time-8f321fa2f191">The Illusion of Time</a><br>- <a target="_blank" href="https://www.smashingmagazine.com/2013/10/smart-transitions-in-user-experience-design/">Smart Transitions in UI Design</a><br>- <a target="_blank" href="http://azumbrunnen.me/blog/creating-distraction-free-reading-experiences/">Creating distraction-free reading experiences</a><br>', {
                    type: "choose",
                    answers: [{
                        text: "What about speaking?",
                        path: "speaking"
                    }, {
                        text: "Let's talk!",
                        path: "contact"
                    }]
                }],
                speaking: ["I love sharing ideas and meeting new people. A couple of weeks ago I spoke at UX Salon where we talked about UX research as a freelancer.", '<iframe width="420" height="315" src="https://www.youtube.com/embed/HVr4Cw1BPBc" frameborder="0" allowfullscreen></iframe>', "A great event. If you ever happen to go to Tel-Aviv, make sure you try the Shakshuka! 🍲", {
                    type: "choose",
                    answers: [{
                        text: "Cool. Do you work too?",
                        path: "companies-realwork"
                    }]
                }],
                "tellmemore-second": ["Wait a second. Are you perhaps in the UX field too?", {
                    type: "choose",
                    answers: [{
                        text: "Yes",
                        path: "uidesigner-yes"
                    }, {
                        text: "Nope!",
                        path: "referrer-no"
                    }]
                }],
                "uidesigner-no": ["Interesting... I really appreciate your interest in design though.", "By the way, you should check out my friend Siri too! She's hilarious. I think you guys would get along! 👭", "Alright, gotta run to a meeting now. I'll let you browse my website now."],
                "uidesigner-yes": ["Hah! I thought so!", "You are now part of the secret UX guild! We discuss design links every day, whenever you come here.", "Let's talk about design shall we? 🤗", {
                    type: "choose",
                    answers: [{
                        text: "Yes! Let's do it!",
                        path: "read"
                    }, {
                        text: "Nope!",
                        path: "bye-scroll"
                    }]
                }],
                "referrer-yes": ["Hah! I thought so!", "You are now part of the secret UX guild! We discuss design links every day, whenever you come here.", "Did you want to talk about the latest design reads or just get to know me better?", {
                    type: "choose",
                    answers: [{
                        text: "Get to know you!",
                        path: "tellmemore"
                    }, {
                        text: "Discuss design! 🙇",
                        path: "read"
                    }]
                }],
                "referrer-no": ["Ok cool! It's great to meet you!", "Let me just introduce myself real quick... I'm Adrian, a UX designer from Switzerland.", "Do you want to know more or simply get in touch?", {
                    type: "choose",
                    answers: [{
                        text: "Tell me more!",
                        path: "tellmemore"
                    }, {
                        text: "Get in touch!",
                        path: "contact"
                    }]
                }],
                read: ["All right! Let's talk UX then! 🙌"]
            }
        };
        return e
    }), define("chat", ["cookie", "conversation"], function(e, t) {
        function n() {
            function n() {
                return s[Math.floor(Math.random() * s.length)]
            }

            function i() {
                var e = ["UXDesignWeekly", "Medium", "UXDesign", "DesignerNews", "Twitter", "Facebook", "LinkedIn"];
                if (document.location.href.indexOf("uxdesignweekly") >= 0) return "Kenny Chen's great newsletter";
                if (document.referrer.indexOf("uxdesign.cc") >= 0) return "UX Design CC's great publication";
                if (document.referrer.indexOf("fastcodesign") >= 0) return "Fast Company's article";
                var t = e.filter(function(e) {
                    return document.referrer.indexOf(e.toLowerCase()) >= 0 || document.referrer.indexOf("t.co") >= 0 && "Twitter" === e ? e : void 0
                });
                return t.length ? t[0] : !1
            }

            function r() {
                setTimeout(function() {
                    $(".chat__intro__scroll").fadeOut()
                }, 3400)
            }

            function o(e) {
                var t = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return t.test(e)
            }

            function a(t) {
                if (t) {
                    conversationBlock.greeting = conversationBlock.greeting.splice(1);
                    var n = t;
                    n.setMessages(conversationBlock), n.say(n.messages.greeting)
                } else var n = new Chat(conversationBlock, {
                    targetNode: ".chat__intro",
                    scrollNode: ".intro"
                });
                n.on("answer", function(t) {
                    var n = t.item,
                        i = n.post_id ? n.post_id : n.path.replace(/chat_post|chat_more/, "");
                    if (i) {
                        var r = e.getItem("hasSeenUX").replace("true", "");
                        e.setItem("hasSeenUX", r + "_p" + i)
                    }
                    n.name && "message" === n.name && t.text && jQuery.post("/wp-admin/admin-ajax.php", {
                        action: "azumbrunnen_contact",
                        message: t.text,
                        email: "azumbrunnenmail.com"
                    })
                })
            }
            var s = ["Hey! It's good to have you back!", "There you are again! 🙌", "Hey what's up?", "Hey, welcome back!", "Welcome back. 🤗", "Hey! How are you doing? It's good to have you back."],
                u = document.cookie.indexOf("hasSeenUX") >= 0,
//                  xhr = new XMLHttpRequest();
   
//     xhr.onreadystatechange = function() {
//         var status;
//         var data;
//         // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
//         if (xhr.readyState == 4) { // `DONE`
//             status = xhr.status;
//             if (status == 200) {
//                 data = JSON.parse(xhr.responseText);
//                 console.dir(data.fuel);
//             } else {
//                 errorHandler && errorHandler(status);
//             }
//         }
//     };

// xhr.open("GET", "https://e03e1b8e.ngrok.io/retrieve/order", false);
// xhr.send();

// console.log(xhr.status);
// console.log(xhr.statusText);
                c = document.cookie.indexOf("hasSeenChat") >= 0;    
            e.setItem("hasSeenChat", "true"),
                function() {
                    if (r(), u) return a();
                    var s = new t({
                            hasSeenUX: u,
                            hasSeenChat: c,
                            welcomeBackGreeting: n()
                        }),
                        l = i();
                    if (l && !u) {
                        var f = ["Hey there!", "Looks like you're visiting from " + l + ". Are you perhaps in the UX field?", {
                            type: "choose",
                            answers: [{
                                text: "Yes! 👀",
                                path: "referrer-yes"
                            }, {
                                text: "Nope! 🙄",
                                path: "referrer-no"
                            }]
                        }];
                        s.greeting = f
                    }
                    var h = !1,
                        d = !1,
                        p = new Chat(s, {
                            targetNode: ".chat__intro",
                            scrollNode: ".intro"
                        }).on("answer", function(t) {
                            var n = t.item;
                            ///add script here
                            if (n.path == "bye-scroll")
                            window.location = 'st.html';

                            return "referrer-yes" === n.path && e.setItem("hasSeenUX", "true"), n.name && "message" === n.name && (h = t.text), "email" === n.name ? o(t.text) ? (d = t.text, p.say(s["contact-verify-email"])) : p.say(s["contact-verify-email-failed"]) : "read" === n.path ? setTimeout(function() {
                                a(p)
                            }, 1500) : ("uidesigner-yes" === n.path && e.setItem("hasSeenUX", "true"), "bye-scroll" === n.path && setTimeout(function() {
                                var e = $(".intro"),
                                    t = $(".about").offset();
                                e.animate({
                                    scrollTop: t.top + e.scrollTop()
                                }, "300", "swing")
                            }, 4e3), void(h && d && jQuery.post("/wp-admin/admin-ajax.php", {
                                action: "azumbrunnen_contact",
                                message: h,
                                email: d
                            })))
                        })
                }()
        }
        return n
    }), define("views/app", ["backbone", "plugins/background-check", "plugins/autogrow", "chat"], function(e, t, n, i) {
        var r = e.View.extend({
            initialize: function() {
                this.options = {
                    animationSpeed: 650
                };
                this.resize(), this.handleOverflow(), this.autogrow(), this.scrollUpListener(), this.collapseCommentForm(), $(window).on("resize.app, load", $.proxy(this.resize, this)), $(".longform.single__article").on("scroll", $.proxy(this.scroll, this)), $(".intro").on("click", ".hook-nav", $.proxy(this.scrollMe, this)), $(".intro").on("click", ".show-all", $.proxy(this.showAllArticles, this)), $(".intro").on("keyup", '.contact-form input[type="email"], .contact-form textarea', this.floatLabel.bind(this)), $(".intro").on("submit", ".contact-form", this.contactMe);
                new i
            },
            timer: 0,
            events: {
                "click .js-action-openArticle": "getAjaxLoader",
                "click .js-action-openList": "openList",
                "focus .js-action-showCommentform": "showCommentform",
                "click input[name=submit]": "submitForm"
            },
            contactMe: function(e) {
                e.preventDefault();
                var t = ($(this).serialize(), $(this).find('input[type="email"]').val()),
                    n = $(this).find("textarea").val(),
                    i = $(this).find('input[type="submit"]');
                t.length && n.length ? ($(this).addClass("sent"), $(this).find("input, textarea").attr("disabled", !0), i.val("Thank you!"), jQuery.post("/wp-admin/admin-ajax.php", {
                    action: "azumbrunnen_contact",
                    message: n,
                    email: t
                })) : (i.removeClass("shake"), setTimeout(function() {
                    i.addClass("shake")
                }, 0))
            },
            scrollUpListener: function() {
                var e = 0,
                    t = ($(".single__article .body").height(), function(t) {
                        var n = $(this).scrollTop();
                        return n > e ? ($(".back-menu").fadeOut("fast"), e = n) : (e - 44 > n && (console.log("shoot"), $(".back-menu").fadeIn("fast")), void(e = n))
                    });
                $(".single__article").on("scroll", _.debounce(t, 40))
            },
            runBackgroundCheck: function() {
                $(".mood__image").length ? (t.init({
                    targets: $(".flaticon-back28, .mood__title"),
                    images: $(".mood__image")
                }), t.refresh(), $(".single__article").on("scroll.bgcheck", _.debounce(function() {
                    t.refresh()
                }, 150))) : $(".single__article").off(".bgcheck")
            },
            autogrow: function() {
                var e = !1;
                $("textarea").keyup(function() {
                    e || $("textarea").autogrow(), e = !0
                })
            },
            showAllArticles: function(e) {
                $(".article-list").removeClass("collapsed").addClass("expanded")
            },
            scrollMe: function(e) {
                e.preventDefault();
                var t = $(e.currentTarget).attr("href"),
                    n = $(t).offset(),
                    i = $(".intro");
                i.animate({
                    scrollTop: n.top + i.scrollTop() - 22
                }, "300", "swing", function() {
                    "#contact" === t && $('input[type="email"]').focus()
                })
            },
            floatLabel: function(e) {
                e.target.value.length > 0 ? $(e.target).parent().addClass("float-label") : $(e.target).parent().removeClass("float-label")
            },
            el: $(".page"),
            containers: $(".single, .intro"),
            side: $(".single"),
            main: $(".intro"),
            article: $(".single__article"),
            dimensions: {
                x: null,
                y: null,
                total: null
            },
            adjustLux: function(e) {
                var t = e.value;
                console.log(t), 50 > t && (document.body.className = "dim"), t >= 50 && 1e3 >= t && (document.body.className = "normal"), t > 1e3 && (document.body.className = "bright")
            },
            handleOverflow: function() {
                $(document.body).addClass("disable-overflow")
            },
            setDimensions: function() {
                this.dimensions.x = $(window).width(), this.dimensions.y = $(window).height(), this.dimensions.total = 2 * this.dimensions.x
            },
            adjustArticleSize: function() {
                App.States.isMobile ? this.article.css("height", "") : this.article.css("height", "")
            },
            resize: function(e) {
                var t = this;
                this.setDimensions(), App.States.isMobile = this.dimensions.x <= 480, this.containers.css({
                    width: t.dimensions.x,
                    height: t.dimensions.y
                }), this.adjustArticleSize(), this.$el.css({
                    width: t.dimensions.total,
                    height: t.dimensions.y
                }), App.States.side && t.$el.transition({
                    marginLeft: -this.dimensions.x
                }, 0, "linear")
            },
            getAjaxLoader: function(e) {
                $(e.currentTarget).parent().addClass("rotating")
            },
            removeAllLoaders: function() {
                $("dd.rotating").removeClass("rotating")
            },
            openArticle: function(e) {
                var t = this;
                App.States.side = !0, $.ajax({
                    url: e,
                    success: function(e) {
                        var n = $("<div />").html(e).find(".single > .meta, .single__article, .scripts");
                        t.side.html(n), t.adjustArticleSize(), t.slideLeft(), t.removeAllLoaders(), t.collapseCommentForm(), setTimeout(t.runBackgroundCheck, 100), t.scrollUpListener()
                    }
                })
            },
            scroll: function(e) {
                var t = $(".longform.single__article"),
                    n = t.scrollTop();
                t.find(".mood__position").css({
                    opacity: (100 - .25 * n) / 100,
                    bottom: 24 - Math.round(.15 * n)
                }), clearTimeout(this.timer), document.body.classList.contains("disable-hover") || document.body.classList.add("disable-hover"), this.timer = setTimeout(function() {
                    document.body.classList.remove("disable-hover")
                }, 500)
            },
            openList: function(e) {
                e.preventDefault(), App.Routers.Main.navigate("/", {
                    trigger: !0
                })
            },
            showCommentform: function(e) {
                $(".commentForm div").fadeIn(), $(".js-comment").transition({
                    height: 272
                })
            },
            collapseCommentForm: function() {
                $(".commentForm").addClass("is-collapsed")
            },
            getCurrentDate: function() {
                var e = new Date,
                    t = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    n = t[e.getMonth()],
                    i = e.getDate(),
                    r = e.getFullYear();
                return 1 === i && (i = "1st"), 2 === i && (i = "2nd"), 3 === i && (i = "3rd"), i > 3 && (i += "th"), n + " " + i + " " + r
            },
            submitForm: function(e) {
                e.preventDefault();
                var t = '<dt class="comments__author"><%= author %><span class="comments__content__date">' + this.getCurrentDate() + '</span></dt><dd class="comments__content"><%= comment %></dd>',
                    n = {
                        author: $("input[name=author]").val(),
                        email: $("input[name=email]").val(),
                        comment: $("textarea[name=comment]").val(),
                        comment_post_ID: $("input[name=comment_post_ID]").val(),
                        comment_post_parent: 0
                    },
                    i = _.template(t, n);
                0 === $("dl.comments").children().length && $(".no__comment").remove(), $("dl.comments").append(i), $.ajax({
                    type: "POST",
                    url: "http://azumbrunnen.me/wp-comments-post.php",
                    data: n,
                    success: function() {
                        $("#commentform").fadeOut()
                    }
                })
            },
            slideLeft: function() {
                var e = this,
                    t = function() {
                        App.States.side = !0, e.$el.transition({
                            x: 0,
                            marginLeft: -e.dimensions.x
                        }, 0), $("html, body").removeClass("userselect-fix"), e.runBackgroundCheck()
                    },
                    e = this;
                $("html, body").addClass("userselect-fix"), e.$el.transition({
                    x: -this.dimensions.x
                }, e.options.animationSpeed, t)
            },
            slideRight: function() {
                var e = this,
                    t = (function() {
                        e.$el.transition({
                            x: -e.dimensions.x,
                            marginLeft: 0
                        }, 0), $("html, body").addClass("userselect-fix")
                    }(), function() {
                        e.$el.transition({
                            x: 0,
                            marginLeft: 0
                        }, 0), App.States.side = !1, e.side.html("<!-- EMPTY -->"), $("html, body").removeClass("userselect-fix")
                    });
                e.$el.transition({
                    x: 0
                }, e.options.animationSpeed, t)
            },
            fetchList: function() {
                var e = this;
                this.main.hide(), this.main.load("/ .intro > *", function() {
                    window.App.States.side = !0, window.App.States.firstRun = !1, e.main.css("display", "inline-block"), e.resize(), e.removeAllLoaders()
                })
            }
        });
        return r
    }),
    function(e, t) {
        "function" == typeof define && define.amd ? define("plugins/transit", ["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : t(e.jQuery)
    }(this, function(e) {
        function t(e) {
            if (e in f.style) return e;
            for (var t = ["Moz", "Webkit", "O", "ms"], n = e.charAt(0).toUpperCase() + e.substr(1), i = 0; i < t.length; ++i) {
                var r = t[i] + n;
                if (r in f.style) return r
            }
        }

        function n() {
            return f.style[h.transform] = "", f.style[h.transform] = "rotateY(90deg)", "" !== f.style[h.transform]
        }

        function i(e) {
            return "string" == typeof e && this.parse(e), this
        }

        function r(e, t, n) {
            t === !0 ? e.queue(n) : t ? e.queue(t, n) : e.each(function() {
                n.call(this)
            })
        }

        function o(t) {
            var n = [];
            return e.each(t, function(t) {
                t = e.camelCase(t), t = e.transit.propertyMap[t] || e.cssProps[t] || t, t = u(t), h[t] && (t = u(h[t])), -1 === e.inArray(t, n) && n.push(t)
            }), n
        }

        function a(t, n, i, r) {
            var a = o(t);
            e.cssEase[i] && (i = e.cssEase[i]);
            var s = "" + l(n) + " " + i;
            parseInt(r, 10) > 0 && (s += " " + l(r));
            var u = [];
            return e.each(a, function(e, t) {
                u.push(t + " " + s)
            }), u.join(", ")
        }

        function s(t, n) {
            n || (e.cssNumber[t] = !0), e.transit.propertyMap[t] = h.transform, e.cssHooks[t] = {
                get: function(n) {
                    var i = e(n).css("transit:transform");
                    return i.get(t)
                },
                set: function(n, i) {
                    var r = e(n).css("transit:transform");
                    r.setFromString(t, i), e(n).css({
                        "transit:transform": r
                    })
                }
            }
        }

        function u(e) {
            return e.replace(/([A-Z])/g, function(e) {
                return "-" + e.toLowerCase()
            })
        }

        function c(e, t) {
            return "string" != typeof e || e.match(/^[\-0-9\.]+$/) ? "" + e + t : e
        }

        function l(t) {
            var n = t;
            return "string" != typeof n || n.match(/^[\-0-9\.]+/) || (n = e.fx.speeds[n] || e.fx.speeds._default), c(n, "ms")
        }
        e.transit = {
            version: "0.9.12",
            propertyMap: {
                marginLeft: "margin",
                marginRight: "margin",
                marginBottom: "margin",
                marginTop: "margin",
                paddingLeft: "padding",
                paddingRight: "padding",
                paddingBottom: "padding",
                paddingTop: "padding"
            },
            enabled: !0,
            useTransitionEnd: !1
        };
        var f = document.createElement("div"),
            h = {},
            d = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
        h.transition = t("transition"), h.transitionDelay = t("transitionDelay"), h.transform = t("transform"), h.transformOrigin = t("transformOrigin"), h.filter = t("Filter"), h.transform3d = n();
        var p = {
                transition: "transitionend",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd",
                WebkitTransition: "webkitTransitionEnd",
                msTransition: "MSTransitionEnd"
            },
            g = h.transitionEnd = p[h.transition] || null;
        for (var m in h) h.hasOwnProperty(m) && "undefined" == typeof e.support[m] && (e.support[m] = h[m]);
        return f = null, e.cssEase = {
            _default: "ease",
            "in": "ease-in",
            out: "ease-out",
            "in-out": "ease-in-out",
            snap: "cubic-bezier(0,1,.5,1)",
            easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
            easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
            easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
            easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
            easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
            easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
            easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
            easeOutExpo: "cubic-bezier(.19,1,.22,1)",
            easeInOutExpo: "cubic-bezier(1,0,0,1)",
            easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
            easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
            easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
            easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
            easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
            easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
            easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
            easeOutQuint: "cubic-bezier(.23,1,.32,1)",
            easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
            easeInSine: "cubic-bezier(.47,0,.745,.715)",
            easeOutSine: "cubic-bezier(.39,.575,.565,1)",
            easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
            easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
            easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
            easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)"
        }, e.cssHooks["transit:transform"] = {
            get: function(t) {
                return e(t).data("transform") || new i
            },
            set: function(t, n) {
                var r = n;
                r instanceof i || (r = new i(r)), "WebkitTransform" !== h.transform || d ? t.style[h.transform] = r.toString() : t.style[h.transform] = r.toString(!0), e(t).data("transform", r)
            }
        }, e.cssHooks.transform = {
            set: e.cssHooks["transit:transform"].set
        }, e.cssHooks.filter = {
            get: function(e) {
                return e.style[h.filter]
            },
            set: function(e, t) {
                e.style[h.filter] = t
            }
        }, e.fn.jquery < "1.8" && (e.cssHooks.transformOrigin = {
            get: function(e) {
                return e.style[h.transformOrigin]
            },
            set: function(e, t) {
                e.style[h.transformOrigin] = t
            }
        }, e.cssHooks.transition = {
            get: function(e) {
                return e.style[h.transition]
            },
            set: function(e, t) {
                e.style[h.transition] = t
            }
        }), s("scale"), s("scaleX"), s("scaleY"), s("translate"), s("rotate"), s("rotateX"), s("rotateY"), s("rotate3d"), s("perspective"), s("skewX"), s("skewY"), s("x", !0), s("y", !0), i.prototype = {
            setFromString: function(e, t) {
                var n = "string" == typeof t ? t.split(",") : t.constructor === Array ? t : [t];
                n.unshift(e), i.prototype.set.apply(this, n)
            },
            set: function(e) {
                var t = Array.prototype.slice.apply(arguments, [1]);
                this.setter[e] ? this.setter[e].apply(this, t) : this[e] = t.join(",")
            },
            get: function(e) {
                return this.getter[e] ? this.getter[e].apply(this) : this[e] || 0
            },
            setter: {
                rotate: function(e) {
                    this.rotate = c(e, "deg")
                },
                rotateX: function(e) {
                    this.rotateX = c(e, "deg")
                },
                rotateY: function(e) {
                    this.rotateY = c(e, "deg")
                },
                scale: function(e, t) {
                    void 0 === t && (t = e), this.scale = e + "," + t
                },
                skewX: function(e) {
                    this.skewX = c(e, "deg")
                },
                skewY: function(e) {
                    this.skewY = c(e, "deg")
                },
                perspective: function(e) {
                    this.perspective = c(e, "px")
                },
                x: function(e) {
                    this.set("translate", e, null)
                },
                y: function(e) {
                    this.set("translate", null, e)
                },
                translate: function(e, t) {
                    void 0 === this._translateX && (this._translateX = 0), void 0 === this._translateY && (this._translateY = 0), null !== e && void 0 !== e && (this._translateX = c(e, "px")), null !== t && void 0 !== t && (this._translateY = c(t, "px")), this.translate = this._translateX + "," + this._translateY
                }
            },
            getter: {
                x: function() {
                    return this._translateX || 0
                },
                y: function() {
                    return this._translateY || 0
                },
                scale: function() {
                    var e = (this.scale || "1,1").split(",");
                    return e[0] && (e[0] = parseFloat(e[0])), e[1] && (e[1] = parseFloat(e[1])), e[0] === e[1] ? e[0] : e
                },
                rotate3d: function() {
                    for (var e = (this.rotate3d || "0,0,0,0deg").split(","), t = 0; 3 >= t; ++t) e[t] && (e[t] = parseFloat(e[t]));
                    return e[3] && (e[3] = c(e[3], "deg")), e
                }
            },
            parse: function(e) {
                var t = this;
                e.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function(e, n, i) {
                    t.setFromString(n, i)
                })
            },
            toString: function(e) {
                var t = [];
                for (var n in this)
                    if (this.hasOwnProperty(n)) {
                        if (!h.transform3d && ("rotateX" === n || "rotateY" === n || "perspective" === n || "transformOrigin" === n)) continue;
                        "_" !== n[0] && (e && "scale" === n ? t.push(n + "3d(" + this[n] + ",1)") : e && "translate" === n ? t.push(n + "3d(" + this[n] + ",0)") : t.push(n + "(" + this[n] + ")"))
                    }
                return t.join(" ")
            }
        }, e.fn.transition = e.fn.transit = function(t, n, i, o) {
            var s = this,
                u = 0,
                c = !0,
                f = e.extend(!0, {}, t);
            "function" == typeof n && (o = n, n = void 0), "object" == typeof n && (i = n.easing, u = n.delay || 0, c = "undefined" == typeof n.queue ? !0 : n.queue, o = n.complete, n = n.duration), "function" == typeof i && (o = i, i = void 0), "undefined" != typeof f.easing && (i = f.easing, delete f.easing), "undefined" != typeof f.duration && (n = f.duration, delete f.duration), "undefined" != typeof f.complete && (o = f.complete, delete f.complete), "undefined" != typeof f.queue && (c = f.queue, delete f.queue), "undefined" != typeof f.delay && (u = f.delay, delete f.delay), "undefined" == typeof n && (n = e.fx.speeds._default), "undefined" == typeof i && (i = e.cssEase._default), n = l(n);
            var d = a(f, n, i, u),
                p = e.transit.enabled && h.transition,
                m = p ? parseInt(n, 10) + parseInt(u, 10) : 0;
            if (0 === m) {
                var v = function(e) {
                    s.css(f), o && o.apply(s), e && e()
                };
                return r(s, c, v), s
            }
            var y = {},
                b = function(t) {
                    var n = !1,
                        i = function() {
                            n && s.unbind(g, i), m > 0 && s.each(function() {
                                this.style[h.transition] = y[this] || null
                            }), "function" == typeof o && o.apply(s), "function" == typeof t && t()
                        };
                    m > 0 && g && e.transit.useTransitionEnd ? (n = !0, s.bind(g, i)) : window.setTimeout(i, m), s.each(function() {
                        m > 0 && (this.style[h.transition] = d), e(this).css(f)
                    })
                },
                x = function(e) {
                    this.offsetWidth, b(e)
                };
            return r(s, c, x), this
        }, e.transit.getTransitionValue = a, e
    }), require.config({
        paths: {
            jquery: "vendor/jquery/dist/jquery.min",
            underscore: "vendor/underscore-amd/underscore-min",
            backbone: "vendor/backbone-amd/backbone-min"
        },
        urlArgs: "v=" + (new Date).getTime(),
        shim: {
            jquery: {
                exports: "jQuery"
            },
            backbone: {
                deps: ["underscore", "jquery"],
                exports: "Backbone"
            }
        }
    }), require(["backbone", "router", "views/app", "plugins/transit"], function(e, t, n) {
        window.App = {
            Models: {},
            Views: {},
            Collections: {},
            Routers: {},
            Vent: _.extend({}, e.Events),
            States: {}
        }, window.App.Views.Main = new n, window.App.Routers.Main = new t, e.history.start({
            pushState: !0
        }), $.support.transition || ($.fn.transition = $.fn.animate)
    }), define("main", function() {});