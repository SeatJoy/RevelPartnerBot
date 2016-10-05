/*
 * Chat-Bubble modules
 *
 * Author: Adrian Zumbrunnen
 */
"use strict";

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
        }
        return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
        }
    }(),
    Bubble = function() {
        function e(t) {
            return _classCallCheck(this, e), this.config = Object.assign({}, {
                response: !1
            }, t), this
        }
        return _createClass(e, [{
            key: "bindEvents",
            value: function() {}
        }, {
            key: "parseTemplate",
            value: function(e) {
                return "<span>" + e.text + "</span>"
            }
        }, {
            key: "render",
            value: function() {
                var e = document.createElement("div");
                return e.classList.add("cui__bubble"), e.classList.toggle("cui__bubble--response", this.config.response), e.innerHTML = this.parseTemplate(this.config), this.bindEvents(e), e
            }
        }]), e
    }(),
    LinkBubble = function(e) {
        function t() {
            return _classCallCheck(this, t), _possibleConstructorReturn(this, Object.getPrototypeOf(t).apply(this, arguments))
        }
        return _inherits(t, e), _createClass(t, [{
            key: "parseTemplate",
            value: function(e) {
                return '<a class="cui__card" target="_blank" href="' + e.href + '"><img src="' + e.src + '">' + e.title + "</a>"
            }
        }]), t
    }(Bubble),
    EmbedBubble = function(e) {
        function t() {
            return _classCallCheck(this, t), _possibleConstructorReturn(this, Object.getPrototypeOf(t).apply(this, arguments))
        }
        return _inherits(t, e), _createClass(t, [{
            key: "parseTemplate",
            value: function(e) {
                return '<div class="cui__embed">' + e.code + "</div>"
            }
        }]), t
    }(Bubble),
    AudioBubble = function(e) {
        function t() {
            return _classCallCheck(this, t), _possibleConstructorReturn(this, Object.getPrototypeOf(t).apply(this, arguments))
        }
        return _inherits(t, e), _createClass(t, [{
            key: "bindEvents",
            value: function(e) {
                var t = e.querySelector("audio");
                t && ! function() {
                    var n = e.querySelector("path"),
                        r = n.firstChild,
                        i = r.getAttribute("from"),
                        s = r.getAttribute("to");
                    t.previousElementSibling.addEventListener("click", function() {
                        t.paused ? (r.setAttribute("from", s), r.setAttribute("to", i), n.firstChild.beginElement(), t.play()) : (r.setAttribute("from", i), r.setAttribute("to", s), n.firstChild.beginElement(), t.pause())
                    }), t.addEventListener("timeupdate", function() {
                        var e = this.currentTime / this.duration * 100;
                        this.nextElementSibling.style.width = e + "%"
                    })
                }()
            }
        }, {
            key: "parseTemplate",
            value: function(e) {
                return '<div class="cui__audio"><button class="cui__audio__btn"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="2 0 34 34"><defs><path id="playicon" d="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28"><animate begin="indefinite" attributeType="XML" attributeName="d" fill="freeze" from="M9,10 L15,10 15,26 9,26 M18,10 L24,10 24,26 18,26" to="M11,10 L18,13.74 18,22.28 11,26 M18,13.74 L26,18 26,18 18,22.28" dur="0.15s" keySplines=".4 0 1 1"           repeatCount="1"></animate></path></defs><use xlink:href="#playicon"></use></svg>' + e.length + '</button><audio preload="true"><source src="' + e.src + '"></audio><hr class="cui__audio__progress"><div>'
            }
        }]), t
    }(Bubble);