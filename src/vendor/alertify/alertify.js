/*! alertifyjs - v1.13.1 - Mohammad Younes <Mohammad@alertifyjs.com> (http://alertifyjs.com) */
!(function (a) {
    "use strict";
    function b(a, b) {
        a.className += " " + b;
    }
    function c(a, b) {
        for (
            var c = a.className.split(" "), d = b.split(" "), e = 0;
            e < d.length;
            e += 1
        ) {
            var f = c.indexOf(d[e]);
            f > -1 && c.splice(f, 1);
        }
        a.className = c.join(" ");
    }
    function d() {
        return "rtl" === a.getComputedStyle(document.body).direction;
    }
    function e() {
        return (
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop
        );
    }
    function f() {
        return (
            (document.documentElement && document.documentElement.scrollLeft) ||
            document.body.scrollLeft
        );
    }
    function g(a) {
        for (; a.lastChild;) a.removeChild(a.lastChild);
    }
    function h(a) {
        if (null === a) return a;
        var b;
        if (Array.isArray(a)) {
            b = [];
            for (var c = 0; c < a.length; c += 1) b.push(h(a[c]));
            return b;
        }
        if (a instanceof Date) return new Date(a.getTime());
        if (a instanceof RegExp)
            return (
                (b = new RegExp(a.source)),
                (b.global = a.global),
                (b.ignoreCase = a.ignoreCase),
                (b.multiline = a.multiline),
                (b.lastIndex = a.lastIndex),
                b
            );
        if ("object" == typeof a) {
            b = {};
            for (var d in a) a.hasOwnProperty(d) && (b[d] = h(a[d]));
            return b;
        }
        return a;
    }
    function i(a, b) {
        if (a.elements) {
            var c = a.elements.root;
            c.parentNode.removeChild(c),
                delete a.elements,
                (a.settings = h(a.__settings)),
                (a.__init = b),
                delete a.__internal;
        }
    }
    function j(a, b) {
        return function () {
            if (arguments.length > 0) {
                for (var c = [], d = 0; d < arguments.length; d += 1)
                    c.push(arguments[d]);
                return c.push(a), b.apply(a, c);
            }
            return b.apply(a, [null, a]);
        };
    }
    function k(a, b) {
        return { index: a, button: b, cancel: !1 };
    }
    function l(a, b) {
        if ("function" == typeof b.get(a)) return b.get(a).call(b);
    }
    function m() {
        function a(a, b) {
            for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
            return a;
        }
        function b(a) {
            var b = d[a].dialog;
            return b && "function" == typeof b.__init && b.__init(b), b;
        }
        function c(b, c, e, f) {
            var g = { dialog: null, factory: c };
            return (
                void 0 !== f &&
                (g.factory = function () {
                    return a(new d[f].factory(), new c());
                }),
                e || (g.dialog = a(new g.factory(), w)),
                (d[b] = g)
            );
        }
        var d = {};
        return {
            defaults: p,
            dialog: function (d, e, f, g) {
                if ("function" != typeof e) return b(d);
                if (this.hasOwnProperty(d))
                    throw new Error("alertify.dialog: name already exists");
                var h = c(d, e, f, g);
                this[d] = f
                    ? function () {
                        if (0 === arguments.length) return h.dialog;
                        var b = a(new h.factory(), w);
                        return (
                            b && "function" == typeof b.__init && b.__init(b),
                            b.main.apply(b, arguments),
                            b.show.apply(b)
                        );
                    }
                    : function () {
                        if (
                            (h.dialog &&
                                "function" == typeof h.dialog.__init &&
                                h.dialog.__init(h.dialog),
                                0 === arguments.length)
                        )
                            return h.dialog;
                        var a = h.dialog;
                        return a.main.apply(h.dialog, arguments), a.show.apply(h.dialog);
                    };
            },
            closeAll: function (a) {
                for (var b = q.slice(0), c = 0; c < b.length; c += 1) {
                    var d = b[c];
                    (void 0 !== a && a === d) || d.close();
                }
            },
            setting: function (a, c, d) {
                if ("notifier" === a) return x.setting(c, d);
                var e = b(a);
                return e ? e.setting(c, d) : void 0;
            },
            set: function (a, b, c) {
                return this.setting(a, b, c);
            },
            get: function (a, b) {
                return this.setting(a, b);
            },
            notify: function (a, b, c, d) {
                //return x.create(b, d).push(a, c);
                return x.create(null, c).push(`
                    <div class="jmg-alert">
                        <svg class="dark" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.68408 14.3682C6.76888 14.3682 5.90699 14.1927 5.09842 13.8417C4.29428 13.4952 3.58345 13.0154 2.96591 12.4023C2.35281 11.7847 1.87077 11.0739 1.5198 10.2697C1.17327 9.46117 1 8.59928 1 7.68408C1 6.76888 1.17327 5.90921 1.5198 5.10508C1.87077 4.2965 2.35281 3.58567 2.96591 2.97257C3.579 2.35503 4.28762 1.873 5.09175 1.52646C5.90033 1.17549 6.76222 1 7.67742 1C8.59262 1 9.45451 1.17549 10.2631 1.52646C11.0717 1.873 11.7825 2.35503 12.3956 2.97257C13.0087 3.58567 13.4907 4.2965 13.8417 5.10508C14.1927 5.90921 14.3682 6.76888 14.3682 7.68408C14.3682 8.59928 14.1927 9.46117 13.8417 10.2697C13.4907 11.0739 13.0087 11.7847 12.3956 12.4023C11.7825 13.0154 11.0717 13.4952 10.2631 13.8417C9.45895 14.1927 8.59928 14.3682 7.68408 14.3682ZM7.68408 13.5085C8.48822 13.5085 9.24126 13.3574 9.94321 13.0553C10.6496 12.7532 11.2694 12.3356 11.8025 11.8025C12.3401 11.2694 12.7577 10.6518 13.0553 9.94987C13.3574 9.24348 13.5085 8.48822 13.5085 7.68408C13.5085 6.87995 13.3574 6.12691 13.0553 5.42496C12.7532 4.71856 12.3356 4.0988 11.8025 3.56567C11.2694 3.0281 10.6496 2.61049 9.94321 2.31283C9.24126 2.01072 8.48599 1.85967 7.67742 1.85967C6.87328 1.85967 6.11802 2.01072 5.41163 2.31283C4.70968 2.61049 4.09214 3.0281 3.55901 3.56567C3.03033 4.0988 2.61493 4.71856 2.31283 5.42496C2.01516 6.12691 1.86633 6.87995 1.86633 7.68408C1.86633 8.48822 2.01516 9.24348 2.31283 9.94987C2.61493 10.6518 3.03255 11.2694 3.56567 11.8025C4.0988 12.3356 4.71634 12.7532 5.41829 13.0553C6.12024 13.3574 6.87551 13.5085 7.68408 13.5085ZM6.49121 11.3493C6.38458 11.3493 6.29351 11.316 6.21798 11.2494C6.1469 11.1783 6.11136 11.0917 6.11136 10.9895C6.11136 10.8828 6.1469 10.794 6.21798 10.7229C6.29351 10.6518 6.38458 10.6163 6.49121 10.6163H7.45084V7.15762H6.57784C6.46678 7.15762 6.3757 7.12208 6.30462 7.05099C6.23353 6.97991 6.19799 6.89328 6.19799 6.79109C6.19799 6.68891 6.23353 6.60228 6.30462 6.53119C6.3757 6.46011 6.46678 6.42457 6.57784 6.42457H7.85735C7.98619 6.42457 8.08615 6.46678 8.15723 6.55119C8.22832 6.63116 8.26386 6.74 8.26386 6.87773V10.6163H9.21682C9.32789 10.6163 9.41897 10.6518 9.49005 10.7229C9.56113 10.794 9.59668 10.8828 9.59668 10.9895C9.59668 11.0917 9.56113 11.1783 9.49005 11.2494C9.41897 11.316 9.32789 11.3493 9.21682 11.3493H6.49121ZM7.6441 5.19838C7.44418 5.19838 7.27313 5.12951 7.13096 4.99179C6.9888 4.84962 6.91771 4.67858 6.91771 4.47866C6.91771 4.27429 6.9888 4.10102 7.13096 3.95886C7.27313 3.81669 7.44418 3.74561 7.6441 3.74561C7.84846 3.74561 8.01951 3.81669 8.15723 3.95886C8.2994 4.10102 8.37048 4.27429 8.37048 4.47866C8.37048 4.67858 8.2994 4.84962 8.15723 4.99179C8.01951 5.12951 7.84846 5.19838 7.6441 5.19838Z" fill="black"/></svg>
                        <p>${a}</p>
                    </div>
                `);
            },
            message: function (a, b, c) {
                return x.create(null, c).push(a, b);
            },
            success: function (a, b, c) {
                //return x.create("success", c).push(a, b);
                return x.create("success", c).push(`
                    <div class="jmg-alert">
                        <svg width="19" height="20" viewBox = "0 0 19 20" fill = "none" xmlns = "http://www.w3.org/2000/svg"><path d="M9.36719 17.8281C5.01562 17.8281 1.39844 14.2109 1.39844 9.85938C1.39844 5.5 5.00781 1.89062 9.35938 1.89062C13.7188 1.89062 17.3359 5.5 17.3359 9.85938C17.3359 14.2109 13.7266 17.8281 9.36719 17.8281ZM8.49219 13.6797C8.75781 13.6797 8.98438 13.5547 9.14844 13.2969L12.8203 7.51562C12.9141 7.35156 13.0156 7.17188 13.0156 7C13.0156 6.63281 12.6953 6.39844 12.3516 6.39844C12.1484 6.39844 11.9453 6.52344 11.7969 6.75781L8.46094 12.1172L6.875 10.0703C6.67969 9.8125 6.50781 9.74219 6.28125 9.74219C5.92969 9.74219 5.65625 10.0312 5.65625 10.3828C5.65625 10.5625 5.72656 10.7344 5.84375 10.8906L7.80469 13.2969C8.00781 13.5703 8.22656 13.6797 8.49219 13.6797Z" fill="#00AA00" /></svg >
                        <p>${a}</p>
                    </div>
                `);
            },
            error: function (a, b, c) {
                //return x.create("error", c).push(a, b);
                return x.create("error", c).push(`
                    <div class="jmg-alert">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.61681 2.61684C2.73501 2.49863 2.87855 2.43953 3.04741 2.43953C3.21628 2.43953 3.3577 2.49652 3.47169 2.6105L7.75243 6.89124L12.0268 2.61683C12.1408 2.50285 12.2801 2.44375 12.4448 2.43953C12.6136 2.43953 12.7572 2.49863 12.8754 2.61684C12.9936 2.73504 13.0527 2.87858 13.0527 3.04744C13.0527 3.21631 12.9957 3.35773 12.8817 3.47172L8.60731 7.74612L12.8754 12.0142C12.9936 12.1324 13.0527 12.2759 13.0527 12.4448C13.0527 12.6137 12.9936 12.7572 12.8754 12.8754C12.7572 12.9936 12.6136 13.0527 12.4448 13.0527C12.2801 13.0485 12.1387 12.9873 12.0205 12.8691L7.75243 8.601L3.47169 12.8817C3.3577 12.9957 3.21628 13.0527 3.04741 13.0527C2.87855 13.0527 2.73501 12.9936 2.61681 12.8754C2.4986 12.7572 2.4395 12.6137 2.4395 12.4448C2.44372 12.2802 2.50282 12.1408 2.61681 12.0269L6.89755 7.74612L2.61681 3.46538C2.50282 3.3514 2.44372 3.21209 2.4395 3.04744C2.4395 2.87858 2.4986 2.73504 2.61681 2.61684Z" fill="black"/></svg>
                        <p>${a}</p>
                    </div>
                `);
            },
            warning: function (a, b, c) {
                //return x.create("warning", c).push(a, b);
                return x.create("warning", c).push(`
                    <div class="jmg-alert">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.89088 15.7818C6.87891 15.7818 5.92588 15.5877 5.0318 15.1996C4.14263 14.8165 3.35663 14.2859 2.67379 13.608C1.99586 12.9251 1.46285 12.1391 1.07476 11.25C0.691588 10.3559 0.5 9.40286 0.5 8.39088C0.5 7.37891 0.691588 6.42833 1.07476 5.53917C1.46285 4.64509 1.99586 3.85909 2.67379 3.18116C3.35172 2.49832 4.13526 1.96531 5.02443 1.58213C5.91851 1.19404 6.87154 1 7.88352 1C8.89549 1 9.84852 1.19404 10.7426 1.58213C11.6367 1.96531 12.4227 2.49832 13.1006 3.18116C13.7785 3.85909 14.3115 4.64509 14.6996 5.53917C15.0877 6.42833 15.2818 7.37891 15.2818 8.39088C15.2818 9.40286 15.0877 10.3559 14.6996 11.25C14.3115 12.1391 13.7785 12.9251 13.1006 13.608C12.4227 14.2859 11.6367 14.8165 10.7426 15.1996C9.85344 15.5877 8.90286 15.7818 7.89088 15.7818ZM7.89088 14.8312C8.78005 14.8312 9.61272 14.6642 10.3889 14.3301C11.17 13.9961 11.8553 13.5343 12.4448 12.9448C13.0392 12.3553 13.501 11.6724 13.8301 10.8963C14.1642 10.1152 14.3312 9.28005 14.3312 8.39088C14.3312 7.50172 14.1642 6.66905 13.8301 5.89287C13.4961 5.11178 13.0343 4.42648 12.4448 3.83698C11.8553 3.24256 11.17 2.78079 10.3889 2.45165C9.61272 2.1176 8.77759 1.95057 7.88352 1.95057C6.99435 1.95057 6.15922 2.1176 5.37813 2.45165C4.60195 2.78079 3.91911 3.24256 3.32961 3.83698C2.74502 4.42648 2.2857 5.11178 1.95165 5.89287C1.62251 6.66905 1.45794 7.50172 1.45794 8.39088C1.45794 9.28005 1.62251 10.1152 1.95165 10.8963C2.2857 11.6724 2.74748 12.3553 3.33698 12.9448C3.92648 13.5343 4.60932 13.9961 5.3855 14.3301C6.16168 14.6642 6.99681 14.8312 7.89088 14.8312ZM7.88352 9.7099C7.58385 9.7099 7.43156 9.55024 7.42665 9.23092L7.34559 5.28863C7.34068 5.13634 7.38735 5.01107 7.4856 4.91282C7.58385 4.81457 7.71403 4.76545 7.87615 4.76545C8.03335 4.76545 8.16353 4.81703 8.26669 4.92019C8.36985 5.01844 8.41898 5.14125 8.41407 5.28863L8.32564 9.23092C8.32073 9.55024 8.17335 9.7099 7.88352 9.7099ZM7.88352 11.9942C7.69193 11.9942 7.52981 11.9279 7.39718 11.7953C7.26454 11.6626 7.19822 11.5079 7.19822 11.331C7.19822 11.1444 7.26454 10.9872 7.39718 10.8594C7.52981 10.7317 7.69193 10.6678 7.88352 10.6678C8.07019 10.6678 8.22985 10.7317 8.36249 10.8594C8.49512 10.9872 8.56144 11.1444 8.56144 11.331C8.56144 11.5128 8.49267 11.67 8.35512 11.8026C8.22248 11.9304 8.06528 11.9942 7.88352 11.9942Z" fill="black"/></svg>
                        <p>${a}</p>
                    </div>
                `);
            },
            dismissAll: function () {
                x.dismissAll();
            },
        };
    }
    var n = ":not(:disabled):not(.ajs-reset)",
        o = { ENTER: 13, ESC: 27, F1: 112, F12: 123, LEFT: 37, RIGHT: 39, TAB: 9 },
        p = {
            autoReset: !0,
            basic: !1,
            closable: !0,
            closableByDimmer: !0,
            invokeOnCloseOff: !1,
            frameless: !1,
            defaultFocusOff: !1,
            maintainFocus: !0,
            maximizable: !0,
            modal: !0,
            movable: !0,
            moveBounded: !1,
            overflow: !0,
            padding: !0,
            pinnable: !0,
            pinned: !0,
            preventBodyShift: !1,
            resizable: !0,
            startMaximized: !1,
            transition: "pulse",
            transitionOff: !1,
            tabbable: [
                "button",
                "[href]",
                "input",
                "select",
                "textarea",
                '[tabindex]:not([tabindex^="-"])' + n,
            ].join(n + ","),
            notifier: {
                delay: 5,
                position: "bottom-right",
                closeButton: !1,
                classes: {
                    base: "alertify-notifier",
                    prefix: "ajs-",
                    message: "ajs-message",
                    top: "ajs-top",
                    right: "ajs-right",
                    bottom: "ajs-bottom",
                    left: "ajs-left",
                    center: "ajs-center",
                    visible: "ajs-visible",
                    hidden: "ajs-hidden",
                    close: "ajs-close",
                },
            },
            glossary: {
                title: "AlertifyJS",
                ok: "OK",
                cancel: "Cancel",
                acccpt: "Accept",
                deny: "Deny",
                confirm: "Confirm",
                decline: "Decline",
                close: "Close",
                maximize: "Maximize",
                restore: "Restore",
            },
            theme: { input: "ajs-input", ok: "ajs-ok", cancel: "ajs-cancel" },
            hooks: { preinit: function () { }, postinit: function () { } },
        },
        q = [],
        r = !1;
    try {
        var s = Object.defineProperty({}, "passive", {
            get: function () {
                r = !0;
            },
        });
        a.addEventListener("test", s, s), a.removeEventListener("test", s, s);
    } catch (z) { }
    var t = function (a, b, c, d, e) {
        a.addEventListener(b, c, r ? { capture: d, passive: e } : !0 === d);
    },
        u = function (a, b, c, d, e) {
            a.removeEventListener(b, c, r ? { capture: d, passive: e } : !0 === d);
        },
        v = (function () {
            var a,
                b,
                c = !1,
                d = {
                    animation: "animationend",
                    OAnimation: "oAnimationEnd oanimationend",
                    msAnimation: "MSAnimationEnd",
                    MozAnimation: "animationend",
                    WebkitAnimation: "webkitAnimationEnd",
                };
            for (a in d)
                if (void 0 !== document.documentElement.style[a]) {
                    (b = d[a]), (c = !0);
                    break;
                }
            return { type: b, supported: c };
        })(),
        w = (function () {
            function m(a) {
                if (!a.__internal) {
                    y.defaults.hooks.preinit(a),
                        delete a.__init,
                        a.__settings || (a.__settings = h(a.settings));
                    var c;
                    "function" == typeof a.setup
                        ? ((c = a.setup()),
                            (c.options = c.options || {}),
                            (c.focus = c.focus || {}))
                        : (c = {
                            buttons: [],
                            focus: { element: null, select: !1 },
                            options: {},
                        }),
                        "object" != typeof a.hooks && (a.hooks = {});
                    var d = [];
                    if (Array.isArray(c.buttons))
                        for (var e = 0; e < c.buttons.length; e += 1) {
                            var f = c.buttons[e],
                                g = {};
                            for (var i in f) f.hasOwnProperty(i) && (g[i] = f[i]);
                            d.push(g);
                        }
                    var k = (a.__internal = {
                        isOpen: !1,
                        activeElement: document.body,
                        timerIn: void 0,
                        timerOut: void 0,
                        buttons: d,
                        focus: c.focus,
                        options: {
                            title: void 0,
                            modal: void 0,
                            basic: void 0,
                            frameless: void 0,
                            defaultFocusOff: void 0,
                            pinned: void 0,
                            movable: void 0,
                            moveBounded: void 0,
                            resizable: void 0,
                            autoReset: void 0,
                            closable: void 0,
                            closableByDimmer: void 0,
                            invokeOnCloseOff: void 0,
                            maximizable: void 0,
                            startMaximized: void 0,
                            pinnable: void 0,
                            transition: void 0,
                            transitionOff: void 0,
                            padding: void 0,
                            overflow: void 0,
                            onshow: void 0,
                            onclosing: void 0,
                            onclose: void 0,
                            onfocus: void 0,
                            onmove: void 0,
                            onmoved: void 0,
                            onresize: void 0,
                            onresized: void 0,
                            onmaximize: void 0,
                            onmaximized: void 0,
                            onrestore: void 0,
                            onrestored: void 0,
                        },
                        resetHandler: void 0,
                        beginMoveHandler: void 0,
                        beginResizeHandler: void 0,
                        bringToFrontHandler: void 0,
                        modalClickHandler: void 0,
                        buttonsClickHandler: void 0,
                        commandsClickHandler: void 0,
                        transitionInHandler: void 0,
                        transitionOutHandler: void 0,
                        destroy: void 0,
                    }),
                        l = {};
                    (l.root = document.createElement("div")),
                        (l.root.style.display = "none"),
                        (l.root.className = Ha.base + " " + Ha.hidden + " "),
                        (l.root.innerHTML = Ga.dimmer + Ga.modal),
                        (l.dimmer = l.root.firstChild),
                        (l.modal = l.root.lastChild),
                        (l.modal.innerHTML = Ga.dialog),
                        (l.dialog = l.modal.firstChild),
                        (l.dialog.innerHTML =
                            Ga.reset +
                            Ga.commands +
                            Ga.header +
                            Ga.body +
                            Ga.footer +
                            Ga.resizeHandle +
                            Ga.reset),
                        (l.reset = []),
                        l.reset.push(l.dialog.firstChild),
                        l.reset.push(l.dialog.lastChild),
                        (l.commands = {}),
                        (l.commands.container = l.reset[0].nextSibling),
                        (l.commands.pin = l.commands.container.firstChild),
                        (l.commands.maximize = l.commands.pin.nextSibling),
                        (l.commands.close = l.commands.maximize.nextSibling),
                        (l.header = l.commands.container.nextSibling),
                        (l.body = l.header.nextSibling),
                        (l.body.innerHTML = Ga.content),
                        (l.content = l.body.firstChild),
                        (l.footer = l.body.nextSibling),
                        (l.footer.innerHTML = Ga.buttons.auxiliary + Ga.buttons.primary),
                        (l.resizeHandle = l.footer.nextSibling),
                        (l.buttons = {}),
                        (l.buttons.auxiliary = l.footer.firstChild),
                        (l.buttons.primary = l.buttons.auxiliary.nextSibling),
                        (l.buttons.primary.innerHTML = Ga.button),
                        (l.buttonTemplate = l.buttons.primary.firstChild),
                        l.buttons.primary.removeChild(l.buttonTemplate);
                    for (var m = 0; m < a.__internal.buttons.length; m += 1) {
                        var n = a.__internal.buttons[m];
                        Ca.indexOf(n.key) < 0 && Ca.push(n.key),
                            (n.element = l.buttonTemplate.cloneNode()),
                            (n.element.innerHTML = n.text),
                            "string" == typeof n.className &&
                            "" !== n.className &&
                            b(n.element, n.className);
                        for (var o in n.attrs)
                            "className" !== o &&
                                n.attrs.hasOwnProperty(o) &&
                                n.element.setAttribute(o, n.attrs[o]);
                        "auxiliary" === n.scope
                            ? l.buttons.auxiliary.appendChild(n.element)
                            : l.buttons.primary.appendChild(n.element);
                    }
                    (a.elements = l),
                        (k.resetHandler = j(a, Z)),
                        (k.beginMoveHandler = j(a, ea)),
                        (k.beginResizeHandler = j(a, ka)),
                        (k.bringToFrontHandler = j(a, D)),
                        (k.modalClickHandler = j(a, T)),
                        (k.buttonsClickHandler = j(a, V)),
                        (k.commandsClickHandler = j(a, H)),
                        (k.transitionInHandler = j(a, aa)),
                        (k.transitionOutHandler = j(a, ba));
                    for (var p in k.options)
                        void 0 !== c.options[p]
                            ? a.set(p, c.options[p])
                            : y.defaults.hasOwnProperty(p)
                                ? a.set(p, y.defaults[p])
                                : "title" === p && a.set(p, y.defaults.glossary[p]);
                    "function" == typeof a.build && a.build(),
                        y.defaults.hooks.postinit(a);
                }
                document.body.appendChild(a.elements.root);
            }
            function n() {
                (Aa = f()), (Ba = e());
            }
            function r() {
                a.scrollTo(Aa, Ba);
            }
            function s() {
                for (var a = 0, d = 0; d < q.length; d += 1) {
                    var e = q[d];
                    (e.isModal() || e.isMaximized()) && (a += 1);
                }
                0 === a && document.body.className.indexOf(Ha.noOverflow) >= 0
                    ? (c(document.body, Ha.noOverflow), w(!1))
                    : a > 0 &&
                    document.body.className.indexOf(Ha.noOverflow) < 0 &&
                    (w(!0), b(document.body, Ha.noOverflow));
            }
            function w(d) {
                y.defaults.preventBodyShift &&
                    (d &&
                        document.documentElement.scrollHeight >
                        document.documentElement.clientHeight
                        ? ((Ja = Ba),
                            (Ia = a.getComputedStyle(document.body).top),
                            b(document.body, Ha.fixed),
                            (document.body.style.top = -Ba + "px"))
                        : d ||
                        ((Ba = Ja),
                            (document.body.style.top = Ia),
                            c(document.body, Ha.fixed),
                            r()));
            }
            function x(a, d, e) {
                "string" == typeof e && c(a.elements.root, Ha.prefix + e),
                    b(a.elements.root, Ha.prefix + d),
                    (Da = a.elements.root.offsetWidth);
            }
            function z(a) {
                a.get("transitionOff")
                    ? b(a.elements.root, Ha.noTransition)
                    : c(a.elements.root, Ha.noTransition);
            }
            function A(a) {
                a.get("modal")
                    ? (c(a.elements.root, Ha.modeless), a.isOpen() && (ta(a), P(a), s()))
                    : (b(a.elements.root, Ha.modeless), a.isOpen() && (sa(a), P(a), s()));
            }
            function B(a) {
                a.get("basic")
                    ? b(a.elements.root, Ha.basic)
                    : c(a.elements.root, Ha.basic);
            }
            function C(a) {
                a.get("frameless")
                    ? b(a.elements.root, Ha.frameless)
                    : c(a.elements.root, Ha.frameless);
            }
            function D(a, b) {
                for (var c = q.indexOf(b), d = c + 1; d < q.length; d += 1)
                    if (q[d].isModal()) return;
                return (
                    document.body.lastChild !== b.elements.root &&
                    (document.body.appendChild(b.elements.root),
                        q.splice(q.indexOf(b), 1),
                        q.push(b),
                        Y(b)),
                    !1
                );
            }
            function E(a, d, e, f) {
                switch (d) {
                    case "title":
                        a.setHeader(f);
                        break;
                    case "modal":
                        A(a);
                        break;
                    case "basic":
                        B(a);
                        break;
                    case "frameless":
                        C(a);
                        break;
                    case "pinned":
                        Q(a);
                        break;
                    case "closable":
                        S(a);
                        break;
                    case "maximizable":
                        R(a);
                        break;
                    case "pinnable":
                        M(a);
                        break;
                    case "movable":
                        ia(a);
                        break;
                    case "resizable":
                        oa(a);
                        break;
                    case "padding":
                        f
                            ? c(a.elements.root, Ha.noPadding)
                            : a.elements.root.className.indexOf(Ha.noPadding) < 0 &&
                            b(a.elements.root, Ha.noPadding);
                        break;
                    case "overflow":
                        f
                            ? c(a.elements.root, Ha.noOverflow)
                            : a.elements.root.className.indexOf(Ha.noOverflow) < 0 &&
                            b(a.elements.root, Ha.noOverflow);
                        break;
                    case "transition":
                        x(a, f, e);
                        break;
                    case "transitionOff":
                        z(a);
                }
                "function" == typeof a.hooks.onupdate &&
                    a.hooks.onupdate.call(a, d, e, f);
            }
            function F(a, b, c, d, e) {
                var f = { op: void 0, items: [] };
                if (void 0 === e && "string" == typeof d)
                    (f.op = "get"),
                        b.hasOwnProperty(d)
                            ? ((f.found = !0), (f.value = b[d]))
                            : ((f.found = !1), (f.value = void 0));
                else {
                    var g;
                    if (((f.op = "set"), "object" == typeof d)) {
                        var h = d;
                        for (var i in h)
                            b.hasOwnProperty(i)
                                ? (b[i] !== h[i] &&
                                    ((g = b[i]), (b[i] = h[i]), c.call(a, i, g, h[i])),
                                    f.items.push({ key: i, value: h[i], found: !0 }))
                                : f.items.push({ key: i, value: h[i], found: !1 });
                    } else {
                        if ("string" != typeof d)
                            throw new Error("args must be a string or object");
                        b.hasOwnProperty(d)
                            ? (b[d] !== e && ((g = b[d]), (b[d] = e), c.call(a, d, g, e)),
                                f.items.push({ key: d, value: e, found: !0 }))
                            : f.items.push({ key: d, value: e, found: !1 });
                    }
                }
                return f;
            }
            function G(a) {
                var b;
                U(a, function (c) {
                    return (b =
                        !0 !== a.get("invokeOnCloseOff") && !0 === c.invokeOnClose);
                }),
                    !b && a.isOpen() && a.close();
            }
            function H(a, b) {
                switch (a.srcElement || a.target) {
                    case b.elements.commands.pin:
                        b.isPinned() ? J(b) : I(b);
                        break;
                    case b.elements.commands.maximize:
                        b.isMaximized() ? L(b) : K(b);
                        break;
                    case b.elements.commands.close:
                        G(b);
                }
                return !1;
            }
            function I(a) {
                a.set("pinned", !0);
            }
            function J(a) {
                a.set("pinned", !1);
            }
            function K(a) {
                l("onmaximize", a),
                    b(a.elements.root, Ha.maximized),
                    a.isOpen() && s(),
                    l("onmaximized", a);
            }
            function L(a) {
                l("onrestore", a),
                    c(a.elements.root, Ha.maximized),
                    a.isOpen() && s(),
                    l("onrestored", a);
            }
            function M(a) {
                a.get("pinnable")
                    ? b(a.elements.root, Ha.pinnable)
                    : c(a.elements.root, Ha.pinnable);
            }
            function N(a) {
                var b = f();
                (a.elements.modal.style.marginTop = e() + "px"),
                    (a.elements.modal.style.marginLeft = b + "px"),
                    (a.elements.modal.style.marginRight = -b + "px");
            }
            function O(a) {
                var b = parseInt(a.elements.modal.style.marginTop, 10),
                    c = parseInt(a.elements.modal.style.marginLeft, 10);
                if (
                    ((a.elements.modal.style.marginTop = ""),
                        (a.elements.modal.style.marginLeft = ""),
                        (a.elements.modal.style.marginRight = ""),
                        a.isOpen())
                ) {
                    var d = 0,
                        g = 0;
                    "" !== a.elements.dialog.style.top &&
                        (d = parseInt(a.elements.dialog.style.top, 10)),
                        (a.elements.dialog.style.top = d + (b - e()) + "px"),
                        "" !== a.elements.dialog.style.left &&
                        (g = parseInt(a.elements.dialog.style.left, 10)),
                        (a.elements.dialog.style.left = g + (c - f()) + "px");
                }
            }
            function P(a) {
                a.get("modal") || a.get("pinned") ? O(a) : N(a);
            }
            function Q(a) {
                a.get("pinned")
                    ? (c(a.elements.root, Ha.unpinned), a.isOpen() && O(a))
                    : (b(a.elements.root, Ha.unpinned),
                        a.isOpen() && !a.isModal() && N(a));
            }
            function R(a) {
                a.get("maximizable")
                    ? b(a.elements.root, Ha.maximizable)
                    : c(a.elements.root, Ha.maximizable);
            }
            function S(a) {
                a.get("closable")
                    ? (b(a.elements.root, Ha.closable), ya(a))
                    : (c(a.elements.root, Ha.closable), za(a));
            }
            function T(a, b) {
                if (a.timeStamp - La > 200 && (La = a.timeStamp) && !Ka) {
                    var c = a.srcElement || a.target;
                    !0 === b.get("closableByDimmer") && c === b.elements.modal && G(b);
                }
                Ka = !1;
            }
            function U(a, b) {
                if (Date.now() - Ma > 200 && (Ma = Date.now()))
                    for (var c = 0; c < a.__internal.buttons.length; c += 1) {
                        var d = a.__internal.buttons[c];
                        if (!d.element.disabled && b(d)) {
                            var e = k(c, d);
                            "function" == typeof a.callback && a.callback.apply(a, [e]),
                                !1 === e.cancel && a.close();
                            break;
                        }
                    }
            }
            function V(a, b) {
                var c = a.srcElement || a.target;
                U(b, function (a) {
                    return a.element === c && (Na = !0);
                });
            }
            function W(a) {
                if (Na) return void (Na = !1);
                var b = q[q.length - 1],
                    c = a.keyCode;
                return 0 === b.__internal.buttons.length &&
                    c === o.ESC &&
                    !0 === b.get("closable")
                    ? (G(b), !1)
                    : Ca.indexOf(c) > -1
                        ? (U(b, function (a) {
                            return a.key === c;
                        }),
                            !1)
                        : void 0;
            }
            function X(a) {
                var b = q[q.length - 1],
                    c = a.keyCode;
                if (c === o.LEFT || c === o.RIGHT) {
                    for (var d = b.__internal.buttons, e = 0; e < d.length; e += 1)
                        if (document.activeElement === d[e].element)
                            switch (c) {
                                case o.LEFT:
                                    return void d[(e || d.length) - 1].element.focus();
                                case o.RIGHT:
                                    return void d[(e + 1) % d.length].element.focus();
                            }
                } else if (c < o.F12 + 1 && c > o.F1 - 1 && Ca.indexOf(c) > -1)
                    return (
                        a.preventDefault(),
                        a.stopPropagation(),
                        U(b, function (a) {
                            return a.key === c;
                        }),
                        !1
                    );
            }
            function Y(a, b) {
                if (b) b.focus();
                else {
                    var c = a.__internal.focus,
                        d = c.element;
                    switch (typeof c.element) {
                        case "number":
                            a.__internal.buttons.length > c.element &&
                                (d =
                                    !0 === a.get("basic")
                                        ? a.elements.reset[0]
                                        : a.__internal.buttons[c.element].element);
                            break;
                        case "string":
                            d = a.elements.body.querySelector(c.element);
                            break;
                        case "function":
                            d = c.element.call(a);
                    }
                    (!0 !== a.get("defaultFocusOff") &&
                        ((void 0 !== d && null !== d) ||
                            0 !== a.__internal.buttons.length)) ||
                        (d = a.elements.reset[0]),
                        d && d.focus && (d.focus(), c.select && d.select && d.select());
                }
            }
            function Z(a, b) {
                if (!b)
                    for (var c = q.length - 1; c > -1; c -= 1)
                        if (q[c].isModal()) {
                            b = q[c];
                            break;
                        }
                if (b && b.isModal()) {
                    var d,
                        e = b.elements.reset[0],
                        f = b.elements.reset[1],
                        g = a.relatedTarget,
                        h = b.elements.root.contains(g),
                        i = a.srcElement || a.target;
                    if ((i === e && !h) || (i === f && g === e)) return;
                    i === f || i === document.body
                        ? (d = e)
                        : i === e && g === f
                            ? (d = $(b))
                            : i === e && h && (d = $(b, !0)),
                        Y(b, d);
                }
            }
            function $(a, b) {
                var c = [].slice.call(a.elements.dialog.querySelectorAll(p.tabbable));
                b && c.reverse();
                for (var d = 0; d < c.length; d += 1) {
                    var e = c[d];
                    if (
                        e.offsetParent ||
                        e.offsetWidth ||
                        e.offsetHeight ||
                        e.getClientRects().length
                    )
                        return e;
                }
            }
            function _(a) {
                var b = q[q.length - 1];
                b && a.shiftKey && a.keyCode === o.TAB && b.elements.reset[1].focus();
            }
            function aa(a, b) {
                clearTimeout(b.__internal.timerIn),
                    Y(b),
                    (Na = !1),
                    l("onfocus", b),
                    u(b.elements.dialog, v.type, b.__internal.transitionInHandler),
                    c(b.elements.root, Ha.animationIn);
            }
            function ba(a, b) {
                clearTimeout(b.__internal.timerOut),
                    u(b.elements.dialog, v.type, b.__internal.transitionOutHandler),
                    ha(b),
                    na(b),
                    b.isMaximized() && !b.get("startMaximized") && L(b),
                    "function" == typeof b.__internal.destroy &&
                    b.__internal.destroy.apply(b);
            }
            function ca(a, b) {
                var c = a[Ra] - Pa,
                    d = a[Sa] - Qa;
                Ua && (d -= document.body.scrollTop),
                    (b.style.left = c + "px"),
                    (b.style.top = d + "px");
            }
            function da(a, b) {
                var c = a[Ra] - Pa,
                    d = a[Sa] - Qa;
                Ua && (d -= document.body.scrollTop),
                    (b.style.left = Math.min(Ta.maxLeft, Math.max(Ta.minLeft, c)) + "px"),
                    (b.style.top = Ua
                        ? Math.min(Ta.maxTop, Math.max(Ta.minTop, d)) + "px"
                        : Math.max(Ta.minTop, d) + "px");
            }
            function ea(a, c) {
                if (null === Wa && !c.isMaximized() && c.get("movable")) {
                    var d,
                        e = 0,
                        f = 0;
                    if (
                        ("touchstart" === a.type
                            ? (a.preventDefault(),
                                (d = a.targetTouches[0]),
                                (Ra = "clientX"),
                                (Sa = "clientY"))
                            : 0 === a.button && (d = a),
                            d)
                    ) {
                        var g = c.elements.dialog;
                        if (
                            (b(g, Ha.capture),
                                g.style.left && (e = parseInt(g.style.left, 10)),
                                g.style.top && (f = parseInt(g.style.top, 10)),
                                (Pa = d[Ra] - e),
                                (Qa = d[Sa] - f),
                                c.isModal()
                                    ? (Qa += c.elements.modal.scrollTop)
                                    : c.isPinned() && (Qa -= document.body.scrollTop),
                                c.get("moveBounded"))
                        ) {
                            var h = g,
                                i = -e,
                                j = -f;
                            do {
                                (i += h.offsetLeft), (j += h.offsetTop);
                            } while ((h = h.offsetParent));
                            (Ta = {
                                maxLeft: i,
                                minLeft: -i,
                                maxTop:
                                    document.documentElement.clientHeight - g.clientHeight - j,
                                minTop: -j,
                            }),
                                (Va = da);
                        } else (Ta = null), (Va = ca);
                        return (
                            l("onmove", c),
                            (Ua = !c.isModal() && c.isPinned()),
                            (Oa = c),
                            Va(d, g),
                            b(document.body, Ha.noSelection),
                            !1
                        );
                    }
                }
            }
            function fa(a) {
                if (Oa) {
                    var b;
                    "touchmove" === a.type
                        ? (a.preventDefault(), (b = a.targetTouches[0]))
                        : 0 === a.button && (b = a),
                        b && Va(b, Oa.elements.dialog);
                }
            }
            function ga() {
                if (Oa) {
                    var a = Oa;
                    (Oa = Ta = null),
                        c(document.body, Ha.noSelection),
                        c(a.elements.dialog, Ha.capture),
                        l("onmoved", a);
                }
            }
            function ha(a) {
                Oa = null;
                var b = a.elements.dialog;
                b.style.left = b.style.top = "";
            }
            function ia(a) {
                a.get("movable")
                    ? (b(a.elements.root, Ha.movable), a.isOpen() && ua(a))
                    : (ha(a), c(a.elements.root, Ha.movable), a.isOpen() && va(a));
            }
            function ja(a, b, c) {
                var e = b,
                    f = 0,
                    g = 0;
                do {
                    (f += e.offsetLeft), (g += e.offsetTop);
                } while ((e = e.offsetParent));
                var h, i;
                !0 === c
                    ? ((h = a.pageX), (i = a.pageY))
                    : ((h = a.clientX), (i = a.clientY));
                var j = d();
                if (
                    (j &&
                        ((h = document.body.offsetWidth - h),
                            isNaN(Xa) || (f = document.body.offsetWidth - f - b.offsetWidth)),
                        (b.style.height = i - g + $a + "px"),
                        (b.style.width = h - f + $a + "px"),
                        !isNaN(Xa))
                ) {
                    var k = 0.5 * Math.abs(b.offsetWidth - Ya);
                    j && (k *= -1),
                        b.offsetWidth > Ya
                            ? (b.style.left = Xa + k + "px")
                            : b.offsetWidth >= Za && (b.style.left = Xa - k + "px");
                }
            }
            function ka(a, c) {
                if (!c.isMaximized()) {
                    var d;
                    if (
                        ("touchstart" === a.type
                            ? (a.preventDefault(), (d = a.targetTouches[0]))
                            : 0 === a.button && (d = a),
                            d)
                    ) {
                        l("onresize", c),
                            (Wa = c),
                            ($a = c.elements.resizeHandle.offsetHeight / 2);
                        var e = c.elements.dialog;
                        return (
                            b(e, Ha.capture),
                            (Xa = parseInt(e.style.left, 10)),
                            (e.style.height = e.offsetHeight + "px"),
                            (e.style.minHeight =
                                c.elements.header.offsetHeight +
                                c.elements.footer.offsetHeight +
                                "px"),
                            (e.style.width = (Ya = e.offsetWidth) + "px"),
                            "none" !== e.style.maxWidth &&
                            (e.style.minWidth = (Za = e.offsetWidth) + "px"),
                            (e.style.maxWidth = "none"),
                            b(document.body, Ha.noSelection),
                            !1
                        );
                    }
                }
            }
            function la(a) {
                if (Wa) {
                    var b;
                    "touchmove" === a.type
                        ? (a.preventDefault(), (b = a.targetTouches[0]))
                        : 0 === a.button && (b = a),
                        b &&
                        ja(b, Wa.elements.dialog, !Wa.get("modal") && !Wa.get("pinned"));
                }
            }
            function ma() {
                if (Wa) {
                    var a = Wa;
                    (Wa = null),
                        c(document.body, Ha.noSelection),
                        c(a.elements.dialog, Ha.capture),
                        (Ka = !0),
                        l("onresized", a);
                }
            }
            function na(a) {
                Wa = null;
                var b = a.elements.dialog;
                "none" === b.style.maxWidth &&
                    ((b.style.maxWidth =
                        b.style.minWidth =
                        b.style.width =
                        b.style.height =
                        b.style.minHeight =
                        b.style.left =
                        ""),
                        (Xa = Number.Nan),
                        (Ya = Za = $a = 0));
            }
            function oa(a) {
                a.get("resizable")
                    ? (b(a.elements.root, Ha.resizable), a.isOpen() && wa(a))
                    : (na(a), c(a.elements.root, Ha.resizable), a.isOpen() && xa(a));
            }
            function pa() {
                for (var a = 0; a < q.length; a += 1) {
                    var b = q[a];
                    b.get("autoReset") && (ha(b), na(b));
                }
            }
            function qa(b) {
                1 === q.length &&
                    (t(a, "resize", pa),
                        t(document.body, "keyup", W),
                        t(document.body, "keydown", X),
                        t(document.body, "focus", Z),
                        t(document.documentElement, "mousemove", fa),
                        t(document.documentElement, "touchmove", fa, !1, !1),
                        t(document.documentElement, "mouseup", ga),
                        t(document.documentElement, "touchend", ga),
                        t(document.documentElement, "mousemove", la),
                        t(document.documentElement, "touchmove", la, !1, !1),
                        t(document.documentElement, "mouseup", ma),
                        t(document.documentElement, "touchend", ma)),
                    t(
                        b.elements.commands.container,
                        "click",
                        b.__internal.commandsClickHandler
                    ),
                    t(b.elements.footer, "click", b.__internal.buttonsClickHandler),
                    t(b.elements.reset[0], "focusin", b.__internal.resetHandler),
                    t(b.elements.reset[0], "keydown", _),
                    t(b.elements.reset[1], "focusin", b.__internal.resetHandler),
                    (Na = !0),
                    t(b.elements.dialog, v.type, b.__internal.transitionInHandler),
                    b.get("modal") || sa(b),
                    b.get("resizable") && wa(b),
                    b.get("movable") && ua(b);
            }
            function ra(b) {
                1 === q.length &&
                    (u(a, "resize", pa),
                        u(document.body, "keyup", W),
                        u(document.body, "keydown", X),
                        u(document.body, "focus", Z),
                        u(document.documentElement, "mousemove", fa),
                        u(document.documentElement, "mouseup", ga),
                        u(document.documentElement, "mousemove", la),
                        u(document.documentElement, "mouseup", ma)),
                    u(
                        b.elements.commands.container,
                        "click",
                        b.__internal.commandsClickHandler
                    ),
                    u(b.elements.footer, "click", b.__internal.buttonsClickHandler),
                    u(b.elements.reset[0], "focusin", b.__internal.resetHandler),
                    u(b.elements.reset[0], "keydown", _),
                    u(b.elements.reset[1], "focusin", b.__internal.resetHandler),
                    t(b.elements.dialog, v.type, b.__internal.transitionOutHandler),
                    b.get("modal") || ta(b),
                    b.get("movable") && va(b),
                    b.get("resizable") && xa(b);
            }
            function sa(a) {
                t(a.elements.dialog, "focus", a.__internal.bringToFrontHandler, !0);
            }
            function ta(a) {
                u(a.elements.dialog, "focus", a.__internal.bringToFrontHandler, !0);
            }
            function ua(a) {
                t(a.elements.header, "mousedown", a.__internal.beginMoveHandler),
                    t(
                        a.elements.header,
                        "touchstart",
                        a.__internal.beginMoveHandler,
                        !1,
                        !1
                    );
            }
            function va(a) {
                u(a.elements.header, "mousedown", a.__internal.beginMoveHandler),
                    u(
                        a.elements.header,
                        "touchstart",
                        a.__internal.beginMoveHandler,
                        !1,
                        !1
                    );
            }
            function wa(a) {
                t(
                    a.elements.resizeHandle,
                    "mousedown",
                    a.__internal.beginResizeHandler
                ),
                    t(
                        a.elements.resizeHandle,
                        "touchstart",
                        a.__internal.beginResizeHandler,
                        !1,
                        !1
                    );
            }
            function xa(a) {
                u(
                    a.elements.resizeHandle,
                    "mousedown",
                    a.__internal.beginResizeHandler
                ),
                    u(
                        a.elements.resizeHandle,
                        "touchstart",
                        a.__internal.beginResizeHandler,
                        !1,
                        !1
                    );
            }
            function ya(a) {
                t(a.elements.modal, "click", a.__internal.modalClickHandler);
            }
            function za(a) {
                u(a.elements.modal, "click", a.__internal.modalClickHandler);
            }
            var Aa,
                Ba,
                Ca = [],
                Da = null,
                Ea = !1,
                Fa =
                    a.navigator.userAgent.indexOf("Safari") > -1 &&
                    a.navigator.userAgent.indexOf("Chrome") < 0,
                Ga = {
                    dimmer: '<div class="ajs-dimmer"></div>',
                    modal: '<div class="ajs-modal" tabindex="0"></div>',
                    dialog: '<div class="ajs-dialog" tabindex="0"></div>',
                    reset: '<button class="ajs-reset"></button>',
                    commands:
                        '<div class="ajs-commands"><button class="ajs-pin"></button><button class="ajs-maximize"></button><button class="ajs-close"></button></div>',
                    header: '<div class="ajs-header"></div>',
                    body: '<div class="ajs-body"></div>',
                    content: '<div class="ajs-content"></div>',
                    footer: '<div class="ajs-footer"></div>',
                    buttons: {
                        primary: '<div class="ajs-primary ajs-buttons"></div>',
                        auxiliary: '<div class="ajs-auxiliary ajs-buttons"></div>',
                    },
                    button: '<button class="ajs-button"></button>',
                    resizeHandle: '<div class="ajs-handle"></div>',
                },
                Ha = {
                    animationIn: "ajs-in",
                    animationOut: "ajs-out",
                    base: "alertify",
                    basic: "ajs-basic",
                    capture: "ajs-capture",
                    closable: "ajs-closable",
                    fixed: "ajs-fixed",
                    frameless: "ajs-frameless",
                    hidden: "ajs-hidden",
                    maximize: "ajs-maximize",
                    maximized: "ajs-maximized",
                    maximizable: "ajs-maximizable",
                    modeless: "ajs-modeless",
                    movable: "ajs-movable",
                    noSelection: "ajs-no-selection",
                    noOverflow: "ajs-no-overflow",
                    noPadding: "ajs-no-padding",
                    pin: "ajs-pin",
                    pinnable: "ajs-pinnable",
                    prefix: "ajs-",
                    resizable: "ajs-resizable",
                    restore: "ajs-restore",
                    shake: "ajs-shake",
                    unpinned: "ajs-unpinned",
                    noTransition: "ajs-no-transition",
                },
                Ia = "",
                Ja = 0,
                Ka = !1,
                La = 0,
                Ma = 0,
                Na = !1,
                Oa = null,
                Pa = 0,
                Qa = 0,
                Ra = "pageX",
                Sa = "pageY",
                Ta = null,
                Ua = !1,
                Va = null,
                Wa = null,
                Xa = Number.Nan,
                Ya = 0,
                Za = 0,
                $a = 0;
            return {
                __init: m,
                isOpen: function () {
                    return this.__internal.isOpen;
                },
                isModal: function () {
                    return this.elements.root.className.indexOf(Ha.modeless) < 0;
                },
                isMaximized: function () {
                    return this.elements.root.className.indexOf(Ha.maximized) > -1;
                },
                isPinned: function () {
                    return this.elements.root.className.indexOf(Ha.unpinned) < 0;
                },
                maximize: function () {
                    return this.isMaximized() || K(this), this;
                },
                restore: function () {
                    return this.isMaximized() && L(this), this;
                },
                pin: function () {
                    return this.isPinned() || I(this), this;
                },
                unpin: function () {
                    return this.isPinned() && J(this), this;
                },
                bringToFront: function () {
                    return D(null, this), this;
                },
                moveTo: function (a, b) {
                    if (!isNaN(a) && !isNaN(b)) {
                        l("onmove", this);
                        var c = this.elements.dialog,
                            e = c,
                            f = 0,
                            g = 0;
                        c.style.left && (f -= parseInt(c.style.left, 10)),
                            c.style.top && (g -= parseInt(c.style.top, 10));
                        do {
                            (f += e.offsetLeft), (g += e.offsetTop);
                        } while ((e = e.offsetParent));
                        var h = a - f,
                            i = b - g;
                        d() && (h *= -1),
                            (c.style.left = h + "px"),
                            (c.style.top = i + "px"),
                            l("onmoved", this);
                    }
                    return this;
                },
                resizeTo: function (a, b) {
                    var c = parseFloat(a),
                        d = parseFloat(b),
                        e = /(\d*\.\d+|\d+)%/;
                    if (!isNaN(c) && !isNaN(d) && !0 === this.get("resizable")) {
                        l("onresize", this),
                            ("" + a).match(e) &&
                            (c = (c / 100) * document.documentElement.clientWidth),
                            ("" + b).match(e) &&
                            (d = (d / 100) * document.documentElement.clientHeight);
                        var f = this.elements.dialog;
                        "none" !== f.style.maxWidth &&
                            (f.style.minWidth = (Za = f.offsetWidth) + "px"),
                            (f.style.maxWidth = "none"),
                            (f.style.minHeight =
                                this.elements.header.offsetHeight +
                                this.elements.footer.offsetHeight +
                                "px"),
                            (f.style.width = c + "px"),
                            (f.style.height = d + "px"),
                            l("onresized", this);
                    }
                    return this;
                },
                setting: function (a, b) {
                    var c = this,
                        d = F(
                            this,
                            this.__internal.options,
                            function (a, b, d) {
                                E(c, a, b, d);
                            },
                            a,
                            b
                        );
                    if ("get" === d.op)
                        return d.found
                            ? d.value
                            : void 0 !== this.settings
                                ? F(
                                    this,
                                    this.settings,
                                    this.settingUpdated || function () { },
                                    a,
                                    b
                                ).value
                                : void 0;
                    if ("set" === d.op) {
                        if (d.items.length > 0)
                            for (
                                var e = this.settingUpdated || function () { }, f = 0;
                                f < d.items.length;
                                f += 1
                            ) {
                                var g = d.items[f];
                                g.found ||
                                    void 0 === this.settings ||
                                    F(this, this.settings, e, g.key, g.value);
                            }
                        return this;
                    }
                },
                set: function (a, b) {
                    return this.setting(a, b), this;
                },
                get: function (a) {
                    return this.setting(a);
                },
                setHeader: function (b) {
                    return (
                        "string" == typeof b
                            ? (g(this.elements.header), (this.elements.header.innerHTML = b))
                            : b instanceof a.HTMLElement &&
                            this.elements.header.firstChild !== b &&
                            (g(this.elements.header), this.elements.header.appendChild(b)),
                        this
                    );
                },
                setContent: function (b) {
                    return (
                        "string" == typeof b
                            ? (g(this.elements.content),
                                (this.elements.content.innerHTML = b))
                            : b instanceof a.HTMLElement &&
                            this.elements.content.firstChild !== b &&
                            (g(this.elements.content),
                                this.elements.content.appendChild(b)),
                        this
                    );
                },
                showModal: function (a) {
                    return this.show(!0, a);
                },
                show: function (a, d) {
                    if ((m(this), this.__internal.isOpen)) {
                        ha(this), na(this), b(this.elements.dialog, Ha.shake);
                        var e = this;
                        setTimeout(function () {
                            c(e.elements.dialog, Ha.shake);
                        }, 200);
                    } else {
                        if (
                            ((this.__internal.isOpen = !0),
                                q.push(this),
                                y.defaults.maintainFocus &&
                                (this.__internal.activeElement = document.activeElement),
                                document.body.hasAttribute("tabindex") ||
                                document.body.setAttribute("tabindex", (Ea = "0")),
                                "function" == typeof this.prepare && this.prepare(),
                                qa(this),
                                void 0 !== a && this.set("modal", a),
                                n(),
                                s(),
                                "string" == typeof d &&
                                "" !== d &&
                                ((this.__internal.className = d), b(this.elements.root, d)),
                                this.get("startMaximized")
                                    ? this.maximize()
                                    : this.isMaximized() && L(this),
                                P(this),
                                this.elements.root.removeAttribute("style"),
                                c(this.elements.root, Ha.animationOut),
                                b(this.elements.root, Ha.animationIn),
                                clearTimeout(this.__internal.timerIn),
                                (this.__internal.timerIn = setTimeout(
                                    this.__internal.transitionInHandler,
                                    v.supported ? 1e3 : 100
                                )),
                                Fa)
                        ) {
                            var f = this.elements.root;
                            (f.style.display = "none"),
                                setTimeout(function () {
                                    f.style.display = "block";
                                }, 0);
                        }
                        (Da = this.elements.root.offsetWidth),
                            c(this.elements.root, Ha.hidden),
                            r(),
                            "function" == typeof this.hooks.onshow &&
                            this.hooks.onshow.call(this),
                            l("onshow", this);
                    }
                    return this;
                },
                close: function () {
                    return (
                        this.__internal.isOpen &&
                        !1 !== l("onclosing", this) &&
                        (ra(this),
                            c(this.elements.root, Ha.animationIn),
                            b(this.elements.root, Ha.animationOut),
                            clearTimeout(this.__internal.timerOut),
                            (this.__internal.timerOut = setTimeout(
                                this.__internal.transitionOutHandler,
                                v.supported ? 1e3 : 100
                            )),
                            b(this.elements.root, Ha.hidden),
                            (Da = this.elements.modal.offsetWidth),
                            y.defaults.maintainFocus &&
                            this.__internal.activeElement &&
                            (this.__internal.activeElement.focus(),
                                (this.__internal.activeElement = null)),
                            void 0 !== this.__internal.className &&
                            "" !== this.__internal.className &&
                            c(this.elements.root, this.__internal.className),
                            "function" == typeof this.hooks.onclose &&
                            this.hooks.onclose.call(this),
                            l("onclose", this),
                            q.splice(q.indexOf(this), 1),
                            (this.__internal.isOpen = !1),
                            s()),
                        q.length || "0" !== Ea || document.body.removeAttribute("tabindex"),
                        this
                    );
                },
                closeOthers: function () {
                    return y.closeAll(this), this;
                },
                destroy: function () {
                    return (
                        this.__internal &&
                        (this.__internal.isOpen
                            ? ((this.__internal.destroy = function () {
                                i(this, m);
                            }),
                                this.close())
                            : this.__internal.destroy || i(this, m)),
                        this
                    );
                },
            };
        })(),
        x = (function () {
            function d(a) {
                if (!a.__internal) {
                    (a.__internal = {
                        position: y.defaults.notifier.position,
                        delay: y.defaults.notifier.delay,
                    }),
                        (l = document.createElement("DIV"));
                    ("transitionOff" in p.notifier
                        ? p.notifier.transitionOff
                        : p.transitionOff) && (o = n.base + " ajs-no-transition"),
                        h(a);
                }
                l.parentNode !== document.body && document.body.appendChild(l);
            }
            function e(a) {
                (a.__internal.pushed = !0), m.push(a);
            }
            function f(a) {
                m.splice(m.indexOf(a), 1), (a.__internal.pushed = !1);
            }
            function h(a) {
                switch (((l.className = o), a.__internal.position)) {
                    case "top-right":
                        b(l, n.top + " " + n.right);
                        break;
                    case "top-left":
                        b(l, n.top + " " + n.left);
                        break;
                    case "top-center":
                        b(l, n.top + " " + n.center);
                        break;
                    case "bottom-left":
                        b(l, n.bottom + " " + n.left);
                        break;
                    case "bottom-center":
                        b(l, n.bottom + " " + n.center);
                        break;
                    default:
                    case "bottom-right":
                        b(l, n.bottom + " " + n.right);
                }
            }
            function i(d, h) {
                function i(a, b) {
                    (b.__internal.closeButton &&
                        "true" !== a.target.getAttribute("data-close")) ||
                        b.dismiss(!0);
                }
                function m(a, b) {
                    u(b.element, v.type, m), l.removeChild(b.element);
                }
                function o(a) {
                    return (
                        a.__internal ||
                        ((a.__internal = {
                            pushed: !1,
                            delay: void 0,
                            timer: void 0,
                            clickHandler: void 0,
                            transitionEndHandler: void 0,
                            transitionTimeout: void 0,
                        }),
                            (a.__internal.clickHandler = j(a, i)),
                            (a.__internal.transitionEndHandler = j(a, m))),
                        a
                    );
                }
                function p(a) {
                    clearTimeout(a.__internal.timer),
                        clearTimeout(a.__internal.transitionTimeout);
                }
                return o({
                    element: d,
                    push: function (a, c) {
                        if (!this.__internal.pushed) {
                            e(this), p(this);
                            var d, f;
                            switch (arguments.length) {
                                case 0:
                                    f = this.__internal.delay;
                                    break;
                                case 1:
                                    "number" == typeof a
                                        ? (f = a)
                                        : ((d = a), (f = this.__internal.delay));
                                    break;
                                case 2:
                                    (d = a), (f = c);
                            }
                            return (
                                (this.__internal.closeButton = y.defaults.notifier.closeButton),
                                void 0 !== d && this.setContent(d),
                                x.__internal.position.indexOf("top") < 0
                                    ? l.appendChild(this.element)
                                    : l.insertBefore(this.element, l.firstChild),
                                (k = this.element.offsetWidth),
                                b(this.element, n.visible),
                                t(this.element, "click", this.__internal.clickHandler),
                                this.delay(f)
                            );
                        }
                        return this;
                    },
                    ondismiss: function () { },
                    callback: h,
                    dismiss: function (a) {
                        return (
                            this.__internal.pushed &&
                            (p(this),
                                ("function" == typeof this.ondismiss &&
                                    !1 === this.ondismiss.call(this)) ||
                                (u(this.element, "click", this.__internal.clickHandler),
                                    void 0 !== this.element &&
                                    this.element.parentNode === l &&
                                    ((this.__internal.transitionTimeout = setTimeout(
                                        this.__internal.transitionEndHandler,
                                        v.supported ? 1e3 : 100
                                    )),
                                        c(this.element, n.visible),
                                        "function" == typeof this.callback &&
                                        this.callback.call(this, a)),
                                    f(this))),
                            this
                        );
                    },
                    delay: function (a) {
                        if (
                            (p(this),
                                (this.__internal.delay =
                                    void 0 === a || isNaN(+a) ? x.__internal.delay : +a),
                                this.__internal.delay > 0)
                        ) {
                            var b = this;
                            this.__internal.timer = setTimeout(function () {
                                b.dismiss();
                            }, 1e3 * this.__internal.delay);
                        }
                        return this;
                    },
                    setContent: function (c) {
                        if (
                            ("string" == typeof c
                                ? (g(this.element), (this.element.innerHTML = c))
                                : c instanceof a.HTMLElement &&
                                this.element.firstChild !== c &&
                                (g(this.element), this.element.appendChild(c)),
                                this.__internal.closeButton)
                        ) {
                            var d = document.createElement("span");
                            b(d, n.close),
                                d.setAttribute("data-close", !0),
                                this.element.appendChild(d);
                        }
                        return this;
                    },
                    dismissOthers: function () {
                        return x.dismissAll(this), this;
                    },
                });
            }
            var k,
                l,
                m = [],
                n = p.notifier.classes,
                o = n.base;
            return {
                setting: function (a, b) {
                    if ((d(this), void 0 === b)) return this.__internal[a];
                    switch (a) {
                        case "position":
                            (this.__internal.position = b), h(this);
                            break;
                        case "delay":
                            this.__internal.delay = b;
                    }
                    return this;
                },
                set: function (a, b) {
                    return this.setting(a, b), this;
                },
                get: function (a) {
                    return this.setting(a);
                },
                create: function (a, b) {
                    d(this);
                    var c = document.createElement("div");
                    return (
                        (c.className =
                            n.message +
                            ("string" == typeof a && "" !== a ? " " + n.prefix + a : "")),
                        i(c, b)
                    );
                },
                dismissAll: function (a) {
                    for (var b = m.slice(0), c = 0; c < b.length; c += 1) {
                        var d = b[c];
                        (void 0 !== a && a === d) || d.dismiss();
                    }
                },
            };
        })(),
        y = new m();
    y.dialog("alert", function () {
        return {
            main: function (a, b, c) {
                var d, e, f;
                switch (arguments.length) {
                    case 1:
                        e = a;
                        break;
                    case 2:
                        "function" == typeof b ? ((e = a), (f = b)) : ((d = a), (e = b));
                        break;
                    case 3:
                        (d = a), (e = b), (f = c);
                }
                return (
                    this.set("title", d),
                    this.set("message", e),
                    this.set("onok", f),
                    this
                );
            },
            setup: function () {
                return {
                    buttons: [
                        {
                            text: y.defaults.glossary.ok,
                            key: o.ESC,
                            invokeOnClose: !0,
                            className: y.defaults.theme.ok,
                        },
                    ],
                    focus: { element: 0, select: !1 },
                    options: { maximizable: !1, resizable: !1 },
                };
            },
            build: function () { },
            prepare: function () { },
            setMessage: function (a) {
                this.setContent(a);
            },
            settings: { message: void 0, onok: void 0, label: void 0 },
            settingUpdated: function (a, b, c) {
                switch (a) {
                    case "message":
                        this.setMessage(c);
                        break;
                    case "label":
                        this.__internal.buttons[0].element &&
                            (this.__internal.buttons[0].element.innerHTML = c);
                }
            },
            callback: function (a) {
                if ("function" == typeof this.get("onok")) {
                    var b = this.get("onok").call(this, a);
                    void 0 !== b && (a.cancel = !b);
                }
            },
        };
    }),
        y.dialog("confirm", function () {
            function a(a) {
                null !== c.timer &&
                    (clearInterval(c.timer),
                        (c.timer = null),
                        (a.__internal.buttons[c.index].element.innerHTML = c.text));
            }
            function b(b, d, e) {
                a(b),
                    (c.duration = e),
                    (c.index = d),
                    (c.text = b.__internal.buttons[d].element.innerHTML),
                    (c.timer = setInterval(j(b, c.task), 1e3)),
                    c.task(null, b);
            }
            var c = {
                timer: null,
                index: null,
                text: null,
                duration: null,
                task: function (b, d) {
                    if (d.isOpen()) {
                        if (
                            ((d.__internal.buttons[c.index].element.innerHTML =
                                c.text + " (&#8207;" + c.duration + "&#8207;) "),
                                (c.duration -= 1),
                                -1 === c.duration)
                        ) {
                            a(d);
                            var e = d.__internal.buttons[c.index],
                                f = k(c.index, e);
                            "function" == typeof d.callback && d.callback.apply(d, [f]),
                                !1 !== f.close && d.close();
                        }
                    } else a(d);
                },
            };
            return {
                main: function (a, b, c, d) {
                    var e, f, g, h;
                    switch (arguments.length) {
                        case 1:
                            f = a;
                            break;
                        case 2:
                            (f = a), (g = b);
                            break;
                        case 3:
                            (f = a), (g = b), (h = c);
                            break;
                        case 4:
                            (e = a), (f = b), (g = c), (h = d);
                    }
                    return (
                        this.set("title", e),
                        this.set("message", f),
                        this.set("onok", g),
                        this.set("oncancel", h),
                        this
                    );
                },
                setup: function () {
                    return {
                        buttons: [
                            {
                                text: y.defaults.glossary.ok,
                                key: o.ENTER,
                                className: y.defaults.theme.ok,
                            },
                            {
                                text: y.defaults.glossary.cancel,
                                key: o.ESC,
                                invokeOnClose: !0,
                                className: y.defaults.theme.cancel,
                            },
                        ],
                        focus: { element: 0, select: !1 },
                        options: { maximizable: !1, resizable: !1 },
                    };
                },
                build: function () { },
                prepare: function () { },
                setMessage: function (a) {
                    this.setContent(a);
                },
                settings: {
                    message: null,
                    labels: null,
                    onok: null,
                    oncancel: null,
                    defaultFocus: null,
                    reverseButtons: null,
                },
                settingUpdated: function (a, b, c) {
                    switch (a) {
                        case "message":
                            this.setMessage(c);
                            break;
                        case "labels":
                            "ok" in c &&
                                this.__internal.buttons[0].element &&
                                ((this.__internal.buttons[0].text = c.ok),
                                    (this.__internal.buttons[0].element.innerHTML = c.ok)),
                                "cancel" in c &&
                                this.__internal.buttons[1].element &&
                                ((this.__internal.buttons[1].text = c.cancel),
                                    (this.__internal.buttons[1].element.innerHTML = c.cancel));
                            break;
                        case "reverseButtons":
                            !0 === c
                                ? this.elements.buttons.primary.appendChild(
                                    this.__internal.buttons[0].element
                                )
                                : this.elements.buttons.primary.appendChild(
                                    this.__internal.buttons[1].element
                                );
                            break;
                        case "defaultFocus":
                            this.__internal.focus.element = "ok" === c ? 0 : 1;
                    }
                },
                callback: function (b) {
                    a(this);
                    var c;
                    switch (b.index) {
                        case 0:
                            "function" == typeof this.get("onok") &&
                                void 0 !== (c = this.get("onok").call(this, b)) &&
                                (b.cancel = !c);
                            break;
                        case 1:
                            "function" == typeof this.get("oncancel") &&
                                void 0 !== (c = this.get("oncancel").call(this, b)) &&
                                (b.cancel = !c);
                    }
                },
                autoOk: function (a) {
                    return b(this, 0, a), this;
                },
                autoCancel: function (a) {
                    return b(this, 1, a), this;
                },
            };
        }),
        y.dialog("prompt", function () {
            var b = document.createElement("INPUT"),
                c = document.createElement("P");
            return {
                main: function (a, b, c, d, e) {
                    var f, g, h, i, j;
                    switch (arguments.length) {
                        case 1:
                            g = a;
                            break;
                        case 2:
                            (g = a), (h = b);
                            break;
                        case 3:
                            (g = a), (h = b), (i = c);
                            break;
                        case 4:
                            (g = a), (h = b), (i = c), (j = d);
                            break;
                        case 5:
                            (f = a), (g = b), (h = c), (i = d), (j = e);
                    }
                    return (
                        this.set("title", f),
                        this.set("message", g),
                        this.set("value", h),
                        this.set("onok", i),
                        this.set("oncancel", j),
                        this
                    );
                },
                setup: function () {
                    return {
                        buttons: [
                            {
                                text: y.defaults.glossary.ok,
                                key: o.ENTER,
                                className: y.defaults.theme.ok,
                            },
                            {
                                text: y.defaults.glossary.cancel,
                                key: o.ESC,
                                invokeOnClose: !0,
                                className: y.defaults.theme.cancel,
                            },
                        ],
                        focus: { element: b, select: !0 },
                        options: { maximizable: !1, resizable: !1 },
                    };
                },
                build: function () {
                    (b.className = y.defaults.theme.input),
                        b.setAttribute("type", "text"),
                        (b.value = this.get("value")),
                        this.elements.content.appendChild(c),
                        this.elements.content.appendChild(b);
                },
                prepare: function () { },
                setMessage: function (b) {
                    "string" == typeof b
                        ? (g(c), (c.innerHTML = b))
                        : b instanceof a.HTMLElement &&
                        c.firstChild !== b &&
                        (g(c), c.appendChild(b));
                },
                settings: {
                    message: void 0,
                    labels: void 0,
                    onok: void 0,
                    oncancel: void 0,
                    value: "",
                    type: "text",
                    reverseButtons: void 0,
                },
                settingUpdated: function (a, c, d) {
                    switch (a) {
                        case "message":
                            this.setMessage(d);
                            break;
                        case "value":
                            b.value = d;
                            break;
                        case "type":
                            switch (d) {
                                case "text":
                                case "color":
                                case "date":
                                case "datetime-local":
                                case "email":
                                case "month":
                                case "number":
                                case "password":
                                case "search":
                                case "tel":
                                case "time":
                                case "week":
                                    b.type = d;
                                    break;
                                default:
                                    b.type = "text";
                            }
                            break;
                        case "labels":
                            d.ok &&
                                this.__internal.buttons[0].element &&
                                (this.__internal.buttons[0].element.innerHTML = d.ok),
                                d.cancel &&
                                this.__internal.buttons[1].element &&
                                (this.__internal.buttons[1].element.innerHTML = d.cancel);
                            break;
                        case "reverseButtons":
                            !0 === d
                                ? this.elements.buttons.primary.appendChild(
                                    this.__internal.buttons[0].element
                                )
                                : this.elements.buttons.primary.appendChild(
                                    this.__internal.buttons[1].element
                                );
                    }
                },
                callback: function (a) {
                    var c;
                    switch (a.index) {
                        case 0:
                            (this.settings.value = b.value),
                                "function" == typeof this.get("onok") &&
                                void 0 !==
                                (c = this.get("onok").call(this, a, this.settings.value)) &&
                                (a.cancel = !c);
                            break;
                        case 1:
                            "function" == typeof this.get("oncancel") &&
                                void 0 !== (c = this.get("oncancel").call(this, a)) &&
                                (a.cancel = !c),
                                a.cancel || (b.value = this.settings.value);
                    }
                },
            };
        }),
        "object" == typeof module && "object" == typeof module.exports
            ? (module.exports = y)
            : "function" == typeof define && define.amd
                ? define([], function () {
                    return y;
                })
                : a.alertify || (a.alertify = y);
})("undefined" != typeof window ? window : this);
