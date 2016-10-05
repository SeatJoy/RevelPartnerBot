/*
 * UX-chat
 *
 * Author: Adrian Zumbrunnen
 *
 * I’m working on making this open source. In the meantime, don’t rip it off please.
 * Unless you really want to… Because I can’t stop you. No one can. Not even your parents…
 * Because we’re all grown ups now…  🤗 👏
 *
 * You wanna know more? [Yes] | [No]
 */
"use strict";

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var _createClass = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
            }
        }
        return function(t, n, i) {
            return n && e(t.prototype, n), i && e(t, i), t
        }
    }(),
    co = function() {
        return {
            getItem: function(e) {
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
            },
            setItem: function(e, t, n, i, s, r) {
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
                return document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + a + (s ? "; domain=" + s : "") + (i ? "; path=" + i : "") + (r ? "; secure" : ""), !0
            },
            removeItem: function(e, t, n) {
                return !(!e || !this.hasItem(e)) && (document.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (n ? "; domain=" + n : "") + (t ? "; path=" + t : ""), !0)
            },
            hasItem: function(e) {
                return new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
            },
            keys: function() {
                for (var e = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), t = 0; t < e.length; t++) e[t] = decodeURIComponent(e[t]);
                return e
            }
        }
    }(),
    Uxchat = function() {
        function e() {
            _classCallCheck(this, e), this.chat = new Chat(c, {
                targetNode: ".uxchat",
                authors: a
            }), this.listEl = document.querySelector(".cui__list"), this.effectsEl = document.querySelector(".effects"), this.fishometerCount = document.querySelector(".fishometer__count"), this.fishometer = document.querySelector(".fishometer"), this.chat.registerBubbleType("link", LinkBubble), this.chat.registerBubbleType("embed", EmbedBubble), this.chat.registerBubbleType("audio", AudioBubble), this.chat.on("respond", this.handleResponse.bind(this)), this.fishometer.addEventListener("click", this.clickFish.bind(this)), this.preloadEffect(), this.chat.say(c[0])
        }
        return _createClass(e, [{
            key: "clickFish",
            value: function() {
                this.seenFish || (this.chat.addMessageSet({
                    path: "fishometer",
                    messages: [{
                        author: "uxbear",
                        type: "text",
                        text: "This is the fishometer. It increases with your experience, by sharing great content and picking the right answers. 🤗"
                    }, {
                        author: "uxbear",
                        type: "text",
                        text: "You can use those fishes later to wake me up when I’m sleeping. But don’t worry… you will know when you need them. 🐟"
                    }]
                }), this.chat.say("fishometer")), this.seenFish = !0
            }
        }, {
            key: "preloadEffect",
            value: function() {
                this.preloadEl = new Image, this.preloadEl.src = "/wp-content/themes/uxchat/img/1.gif"
            }
        }, {
            key: "playEffect",
            value: function() {
                var e = this;
                new Image;
                this.effectsEl.firstChild.src = this.preloadEl.src, this.effectsEl.classList.add("effects--run"), setTimeout(function() {
                    return e.effectsEl.classList.remove("effects--run")
                }, 12e3), setTimeout(function() {
                    return e.effectsEl.firstChild.removeAttribute("src")
                }, 12300)
            }
        }, {
            key: "countUp",
            value: function(e) {
                for (var t = this, n = 0; n < e; n++) setTimeout(function() {
                    t.fishometerCount.innerHTML = ~~t.fishometerCount.innerHTML + 1
                }, 1750 + n * n * n)
            }
        }, {
            key: "createReward",
            value: function(e) {
                var t = !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1],
                    n = document.createElement("li");
                n.className = "fish";
                var i = document.createElement("div");
                i.className = "fish__bubble", i.innerHTML = "+" + e + " fishes earned!", n.appendChild(i), this.listEl.insertBefore(n, this.listEl.lastChild), window.getComputedStyle(i).opacity, i.classList.add("fish__bubble--animate"), this.countUp(e), t && this.playEffect()
            }
        }, {
            key: "handleResponse",
            value: function(e) {
                var t = this,
                    n = e.path.match(/^[0-9]*/);
                if (e.currentPath && e.currentPath.match(/^[0-9]*$/)) {
                    var i = co.getItem("uxr") || "";
                    co.setItem("uxr", i + "_p" + e.currentPath)
                }
                if ("submitArticle" === e.path) return jQuery.post("/wp-admin/admin-ajax.php", {
                    action: "uxchat_submit",
                    message: e.value
                });
                if (e.currentPath) return jQuery.post("/wp-admin/admin-ajax.php", {
                    action: "uxchat_ping",
                    post_id: e.currentPath.match(/([a-z]|[0-9])*/)[0],
                    path: e.path
                }).done(function(e) {
                    e.length && e.match(/^[0-9]*$/).length > 0 && t.createReward(e, !0)
                });
                if (e.value) {
                    if (!n.length) return;
                    return jQuery.post("/wp-admin/admin-ajax.php", {
                        action: "uxchat_comment",
                        post_id: n[0],
                        message: e.value
                    })
                }
            }
        }]), e
    }();
new Uxchat;