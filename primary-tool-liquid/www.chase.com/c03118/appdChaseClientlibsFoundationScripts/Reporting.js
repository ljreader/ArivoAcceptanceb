var CHASE = CHASE || {};
CHASE.analytics = function (a, b) {
	var c = a.document,
		d = Object.prototype.toString,
		e = String.prototype.toLowerCase,
		f = function () {
			return {
				Enabled: true,
				PageDotPathSet: false,
				Initialized: false,
				DelayTag: false,
				DebugMode: false,
				PageDotParameterMap: {},
				UrlPieces: /http(s|):\/\/([^\/]*)\.([^\.\/]+\.[^\/]+){1}\/.*/,
				Environments: /((q(f|)\d)|(i\d))/,
				EnvNum: /(\d)/,
				LinkClick: /^(a$|span|button|input)/i,
				WTParameter: /^(WT\.|DCS\.)/,
				FormField: /(input|select|button)/i,
				EmptyAds: /^;*$/,
				ScenarioNames: null,
				ScenarioSteps: null,
				ScenarioParams: null,
				PageTitle: "",
				PageUrl: c.location + "",
				PageReferrer: c.referrer,
				PageDotUrl: "https://www.chase.com/online/Home/images/wa01.gif?log=1",
				PageDotDomain: "https://www.chase.com",
				PageDotImagePath: "/online/Home/images/wa01.gif?log=1",
				ScreenResolution: typeof screen === "object" ? screen.width + "x" + screen.height : "NA",
				BrowserSize: "Unknown",
				FlashVersion: function () {
					var b, c;
					if (a.ActiveXObject) {
						for (b = 10; b > 0; b--) {
							try {
								c = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + b);
								return b + ".0"
							} catch (d) {}
						}
					} else if (navigator.plugins && navigator.plugins.length) {
						for (b = 0; b < navigator.plugins.length; b++) {
							if (navigator.plugins[b].name.indexOf("Shockwave Flash") !== -1) {
								return navigator.plugins[b].description.split(" ")[2]
							}
						}
					}
					return "Not enabled"
				}(),
				CacheBuster: (new Date).getTime() + "." + Math.floor(Math.random() * 1e6),
				indexOf: function (a, b) {
					var c = a.length;
					for (var d = 0; d < c; d++) {
						if (a[d] == b) {
							return d
						}
					}
					return -1
				},
				TrackingType: {
					wa_lnk: "1",
					wa_dcdl: "2",
					wa_exlnk: "3",
					4: "4",
					FlashAdImp: "5",
					FlashAdClick: "7",
					wa_fl_n: "6",
					FormField: "8",
					Modal: "9",
					FlashExitLink: "10",
					Tab: "11",
					Hover: "12",
					AdClick: "13"
				},
				Environment: "",
				SegmentGroup: "",
				PersonID: "",
				PageDepth: "",
				MostRecentElementQueue: [],
				ChaseAdParams: {
					"wt.ac": "WT.ad",
					jp_aid: "DCSext.jp_aid",
					"wt.mc_id": "WT.mc_id",
					jp_mep: "DCSext.jp_mep",
					jp_con: "DCSext.jp_con",
					jp_lid: "DCSext.jp_lid",
					jp_aoc: "DCSext.jp_aoc",
					jp_avt: "DCSext.jp_avt",
					"wt.pn_sku": "WT.pn_sku",
					jp_mc: "DCSext.jp_mc"
				},
				ClickedAdId: "",
				ConversionAdId: ""
			}
		}();

	function g(a) {
		return d.call(a) === "[object Function]"
	}

	function h(a) {
		if (typeof a === "boolean") {
			f.DebugMode = a
		}
	}

	function i(a) {
		if (f.Enabled) {
			if (!f.PageDotPathSet) {
				if (a !== b && a.indexOf("http") === 0) {
					var d = /(http(s|):\/\/[^\/]*)(.*)/.f(a);
					f.PageDotDomain = d[1];
					f.PageDotImagePath = d[3]
				} else {
					var e = j(f.PageUrl.toLowerCase());
					if (e !== null) {
						f.PageDotDomain = e;
						f.PageDotImagePath = "/commonui/images/wa01.gif?log=1"
					} else {
						var g = c.getElementsByTagName("script"),
							h = g.length,
							i;
						for (var k = 0; k < h && e === null; k++) {
							if (g[k].getAttribute) {
								if (g[k].getAttribute("src") != null) {
									i = g[k].getAttribute("src").toLowerCase()
								}
							} else {
								i = g[k].src.toLowerCase()
							}
							if (i) {
								if ((i.indexOf("reporting.js") > -1 || i.indexOf("global.js") > -1) && i.indexOf("http") === 0) {
									var l = i.split("//");
									if (l.length >= 2) {
										e = j(i.toLowerCase());
										if (e !== null) {
											f.PageDotDomain = e;
											f.PageDotImagePath = "/commonui/images/wa01.gif?log=1"
										} else {
											if (f.PageUrl.toLowerCase().indexOf("cardmemberservices") > -1) {
												f.PageDotDomain = "https://www.cardmemberservices.com"
											} else {
												f.PageDotDomain = "https://www.chase.com"
											}
										}
									}
								} else {
									if (f.PageUrl.toLowerCase().indexOf("cardmemberservices") > -1) {
										f.PageDotDomain = "https://www.cardmemberservices.com"
									} else {
										f.PageDotDomain = "https://www.chase.com"
									}
								}
							}
						}
					}
				}
				f.PageDotPathSet = true
			}
		}
	}

	function j(a) {
		if (a.indexOf("http") === 0) {
			if (a.indexOf("load-") > -1) {
				return "https://load-chaseonline.chase.com"
			} else if (a.indexOf("espanolqa") > -1 || a.indexOf("espanol.devweb") > -1) {
				k()
			} else {
				var b = f.UrlPieces.exec(a);
				var c = b !== null ? f.Environments.exec(b[2]) : null;
				if (c) {
					var d;
					if (c[2]) {
						d = f.EnvNum.exec(c[2]);
						if (a.indexOf("cardmemberservices") > -1) {
							return "https://onlineq" + d[1] + ".cardmemberservices.com"
						}
						return "https://resourcesq" + d[1] + ".chase.com"
					} else if (c[4]) {
						d = f.EnvNum.exec(c[4]);
						return "https://resourcesi" + d[1] + ".dev.chase.com"
					} else {
						return null
					}
				}
			}
		}
		return null
	}

	function k() {
		if (f.Enabled) {
			var a;
			var b = c.getElementsByTagName("script"),
				d = b.length,
				e;
			for (var g = 0; g < d && a === null; g++) {
				if (b[g].getAttribute) {
					if (b[g].getAttribute("src") != null) {
						e = b[g].getAttribute("src").toLowerCase()
					}
				} else {
					e = b[g].src.toLowerCase()
				}
				if (e) {
					if ((e.indexOf("reporting.js") > -1 || e.indexOf("global.js") > -1) && e.indexOf("http") === 0) {
						var h = e.split("//");
						if (h.length >= 2) {
							a = j(e.toLowerCase());
							if (a !== null) {
								f.PageDotDomain = a;
								f.PageDotImagePath = "/commonui/images/wa01.gif?log=1"
							} else {
								if (f.PageUrl.toLowerCase().indexOf("cardmemberservices") > -1) {
									f.PageDotDomain = "https://www.cardmemberservices.com"
								} else {
									f.PageDotDomain = "https://www.chase.com"
								}
							}
						}
					} else {
						if (f.PageUrl.toLowerCase().indexOf("cardmemberservices") > -1) {
							f.PageDotDomain = "https://www.cardmemberservices.com"
						} else {
							f.PageDotDomain = "https://www.chase.com"
						}
					}
				}
			}
		}
	}

	function l(a) {
		if (f.PageDotParameterMap[a] !== b) {
			return f.PageDotParameterMap[a]
		} else {
			return null
		}
	}

	function m(a, b) {
		if (!a) {
			throw "Need a nodelist to convert"
		}
		var c = [];
		if (!g(b)) {
			b = function (a) {
				return true
			}
		}
		for (var d = 0, e = a.length; d < e; d++) {
			if (b(a[d])) {
				c[c.length] = a[d]
			}
		}
		return c
	}

	function n(a, b, d) {
		if (typeof d !== "object") {
			d = c
		}
		var e = [];
		if (c.getElementsByClassName) {
			e = m(d.getElementsByClassName(a), function (a) {
				return a.nodeName.toLowerCase() == b
			})
		} else {
			e = m(d.getElementsByTagName(b || "a"), function (b) {
				var c = b.className;
				return c && c.indexOf(a) >= 0
			})
		}
		return e
	}

	function o() {
		if (!f.Initialized && f.Enabled) {
			h(false);
			f.PageTitle = c.title;
			u();
			w(true);
			B();
			H();
			bb();
			i();
			f.Initialized = true;
			if (!f.DelayTag) {
				x();
				y()
			} else {
				z();
				E()
			}
		}
	}

	function p() {
		f.Enabled = false
	}

	function q() {
		f.DelayTag = true
	}

	function r() {
		f.DelayTag = false
	}

	function s(a) {}
	var t = new function () {
		return {
			reinitializeAnalytics: function () {
				this.unbind(c.body, "click", N);
				allFormFields = c.getElementsByTagName("input");
				this.unbind(db(allFormFields, "radio;checkbox;submit;image;button"), "click", fb);
				this.unbind(db(allFormFields, "text;password;dropdown;select"), "change", fb);
				this.unbind(c.getElementsByTagName("select"), "change", fb);
				f.Initialized = false;
				o()
			},
			unbind: function (a, b, c) {
				for (var d = 0, e = a.length; d < e; d++) {
					ib(a[d], b, c)
				}
			}
		}
	};

	function u() {
		f.BrowserSize = c.all ? c.body.offsetWidth + "x" + c.body.offsetHeight : a.innerWidth + "x" + a.innerHeight
	}

	function v() {
		if (f.ScenarioParams !== null) {
			L("wa_uri", l("wa_uri") + (f.PageUrl.indexOf("?") === -1 ? "?" : "&") + f.ScenarioParams)
		} else {
			if (f.PageUrl != c.location.toString()) {
				L("wa_uri", c.location.toString())
			}
		}
	}

	function w(a) {
		L("wa_cb", (new Date).getTime() + "." + Math.floor(Math.random() * 1e6), "wa_uri", f.PageUrl, "wa_rf", f.PageReferrer !== "" ? f.PageReferrer : null, "wa_pt", f.PageTitle);
		if (a) {
			L("wa_sr", f.ScreenResolution, "wa_br", f.BrowserSize, "wa_fv", f.FlashVersion, "wa_pgsn", f.ScenarioNames, "wa_pgss", f.ScenarioSteps)
		}
	}

	function x() {
		if (f.PageDotImagePath.indexOf("http") > -1) {
			f.PageDotImagePath = "/online/Home/images/wa01.gif?log=1"
		}
		f.PageDotUrl = f.PageDotDomain + f.PageDotImagePath + (f.PageDotImagePath.indexOf("?") === -1 ? "?" : "");
		v();
		var a;
		for (var b in f.PageDotParameterMap) {
			if (b !== "wa_lnk_i" && b.indexOf("toJSON") === -1) {
				a = l(b);
				f.PageDotUrl += a !== null && !f.EmptyAds.test(a) ? "&" + jb(b) + "=" + jb(a) : ""
			}
		}
		f.PageDotUrl += l("wa_lnk_i") !== null ? "&wa_lnk_i=" + jb(l("wa_lnk_i")) : ""
	}

	function y() {
		if (c.images) {
			pageDot = new Image;
			pageDot.src = f.PageDotUrl
		} else {
			c.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="' + f.PageDotUrl + '">')
		}
		z()
	}

	function z() {
		f.PageDotParameterMap = {};
		f.ScenarioParams = null;
		w(false)
	}

	function A() {
		if (f.Enabled && f.Initialized) {
			x();
			y()
		}
	}

	function B() {
		var a = [],
			d = [],
			e = c.links ? c.links : c.getElementsByTagName("a"),
			f = e.length,
			g;
		for (var h = 0; h < f; h++) {
			g = e[h].getAttribute("href", 2);
			if (g !== b && g.indexOf("?") > 0 && g.match(/(jp_aid|jp_lid)/)) {
				var i = F(g);
				a.push(i["jp_aid"] || "");
				d.push(i["jp_lid"] || "")
			}
		}
		L("wa_aid_i", a.length > 0 ? a.join(";") : null, "wa_lid_i", d.length > 0 ? d.join(";") : null)
	}

	function C(a) {
		L("wa_aid_i", a.length > 0 ? a.join(";") : null);
		A()
	}

	function D(a) {
		L("wa_aid_i", a.length > 0 ? a.join(";") : null, ("wa_tp", f.TrackingType["AdClick"]));
		A();
		R(200)
	}

	function E() {
		H();
		if (l("wa_lnk_i") !== null) {
			A()
		}
	}

	function F(a) {
		var b = {},
			c, d = /\+/g,
			e = /([^&=]+)=?([^&]*)/g,
			f = function (a) {
				return decodeURIComponent(a.replace(d, " "))
			},
			g = a && a.indexOf("?") >= 0 ? a.split("?")[1] : a;
		if (g) {
			while (c = e.exec(g)) b[f(c[1])] = f(c[2])
		}
		return b
	}

	function G(a, b) {
		var c = a.split("?");
		if (c.length >= 2) {
			c.shift();
			var d = c.join("?");
			var e = d.indexOf(b + "=");
			if (e > -1) {
				temp = d.substring(e), tempAmpIndex = temp.indexOf("&"), tempAposIndex = temp.indexOf("'"), tempIndex = temp.length;
				if (tempAposIndex > -1) {
					if (tempAmpIndex > -1) {
						tempIndex = tempAposIndex < tempAmpIndex ? tempAposIndex : tempAmpIndex
					} else {
						tempIndex = tempAposIndex
					}
				} else if (tempAmpIndex > -1) {
					tempIndex = tempAmpIndex
				}
				return temp.substring(b.length + 1, tempIndex)
			}
		}
		return ""
	}

	function H() {
		var a = [],
			b = n("chaseanalytics-opt-link-imp", "a"),
			c = b.length,
			d;
		for (var e = 0; e < c; e++) {
			d = b[e];
			if (d !== null) {
				a.push(J(d))
			}
		}
		L("wa_lnk_i", a.length > 0 ? a.join(";") : null)
	}

	function I(a, b) {
		if (a && a.attributes) {
			var c = a.attributes[b];
			if (c) {
				return c.nodeValue
			}
		}
		return null
	}

	function J(a, b) {
		var c = I(a, "data-pt-name");
		if (c) {
			if (c.indexOf("&amp;") > 0) {
				c = c.replace("&amp;", "and")
			}
			if (c.indexOf("&") > 0) {
				c = c.replace("&", "and")
			}
			return c.substring(0, b || 30)
		} else {
			var d = a.childNodes,
				e = d.length,
				f = a.name || a.title || a.alt || a.id;
			if (e > 0) {
				var g;
				for (var h = 0; h < e; h++) {
					g = d[h];
					if (g.tagName === "IMG") {
						return (g.alt || f).substring(0, b || 30)
					} else if (g.tagName === "SPAN") {
						return (g.innerHTML || f).substring(0, b || 30)
					}
				}
			}
			return (a.innerHTML || f).substring(0, b || 30)
		}
	}

	function K(a) {
		if (f.Enabled) {
			if (a !== b && a !== null) {
				var c = a.length;
				if (c > 0 && c % 2 === 0) {
					for (var d = 0; d < c; d += 2) {
						f.PageDotParameterMap[a[d].replace(f.WTParameter, "wa_")] = a[d + 1]
					}
				}
			}
		}
	}

	function L() {
		var a = arguments.length;
		if (a > 0 && a % 2 === 0) {
			for (var b = 0; b < a; b += 2) {
				if (arguments[b + 1] !== null) {
					f.PageDotParameterMap[arguments[b]] = arguments[b + 1]
				}
			}
		}
	}

	function M(a, c, d) {
		if (f.Enabled) {
			if (d && (d.indexOf("WT.dl=6") > -1 || d.indexOf("wa_tp=6") > -1)) {
				V(a, c)
			} else {
				if (a && a !== "unassigned" && c) {
					var e = a.split(";"),
						g = c.split(";"),
						h = e.length - g.length;
					if (h > 0) {
						for (var i = 0; i < h; i++) {
							c += ";" + g[0]
						}
					}
					f.ScenarioNames = kb(a);
					f.ScenarioSteps = kb(c);
					if (d !== b) {
						f.ScenarioParams = d
					}
				}
			}
		}
	}

	function N(a) {
		if (a && (typeof a.which != "number" || a.which == 1)) {
			var c = S(a, f.LinkClick);
			if (c === b || c === null) {
				return
			}
			var d = c;
			if (d.tagName === "BUTTON" || d.tagName === "INPUT") {
				if (O(d.className, "chaseanalytics-opt-exlnk")) {
					Q(d, "wa_exlnk")
				}
				if (O(d.className, "chaseanalytics-track-link")) {
					Q(d, "wa_lnk", false, 25)
				}
			}
			if (!c.href) {
				d = T(c, function (a) {
					return a.nodeName.toLowerCase() == "a"
				})
			}
			if (d) {
				var e = d.hostname ? d.hostname.split(":")[0] : "",
					g = d.protocol || "";
				var h = d.className;
				if (O(h, "chaseanalytics-opt-doc-dnld")) {
					Q(d, "wa_dcdl")
				} else {
					var i = d.href.toLowerCase();
					if (e.length > 0 || i.indexOf("javascript") > -1 || i.indexOf("mailto:") > -1 || i.indexOf("tel:") > -1) {
						if (O(h, "chaseanalytics-opt-exlnk")) {
							Q(d, "wa_exlnk")
						} else if (O(h, "chaseanalytics-track-link")) {
							Q(d, "wa_lnk", false, 25)
						} else if (O(h, "chaseanalytics-track-modal")) {
							var j = J(d, 60);
							var k, l;
							var m = j.split(",");
							if (m.length >= 2) {
								k = m[0];
								l = m[1]
							} else {
								k = "trackModal";
								l = j
							}
							W(k, l)
						} else if (O(h, "chaseanalytics-opt-link-v2") || typeof _linkTrackingVersion !== "undefined" && _linkTrackingVersion === 2 || typeof d.attributes["pcg"] !== "undefined") {
							Q(d, "wa_lnk", "id,name,title,alt", 25)
						} else {
							lb("Not tracking click event.  Anchor element did not have any matching opt-in css classes")
						}
					} else {
						lb("Not tracking click event.  Anchor is a relative link.  Use page views to track hits, not clicks for on-site traffic.")
					}
				}
			} else {
				lb("Not tracking click event.  Could not find an ancestor anchor element for the clickElement (" + c.nodeName + ")")
			}
		}
	}

	function O(a, b) {
		return a.indexOf(b) > -1
	}

	function P(a) {
		if (a) {
			a = jb(a)
		} else {
			a = "Not Set"
		}
		L("wa_aid_lnk", a, "wa_tp", f.TrackingType["AdClick"]);
		A();
		R(200)
	}

	function Q(a, c, d, e) {
		var g = "Not Set";
		if (typeof d === "string") {
			var h = d.split(","),
				i = h.length,
				j;
			for (var k = 0; k < i && g === "Not Set"; k++) {
				j = a[h[k]];
				if (j !== b && j !== "") {
					g = j
				}
			}
			if (g === "Not Set") {
				return
			}
		} else {
			g = J(a, e || 30)
		}
		if (g.indexOf("&amp;") > 0) {
			g = g.replace("&amp;", "and")
		}
		L(c, g, "wa_tp", f.TrackingType[c]);
		A();
		R(200)
	}

	function R(a) {
		var b = new Date,
			c;
		do {
			c = new Date
		} while (c - b < a)
	}

	function S(a, c) {
		var d = a.target || a.srcElement;
		if (d === b || d === null || d.nodeName.toLowerCase() === "li") {
			return null
		}
		while (d && d.tagName && !d.tagName.toLowerCase().match(c)) {
			d = d.parentElement || d.parentNode
		}
		return d
	}

	function T(a, c) {
		if (!g(c)) {
			throw "matchPredicate is required to know which ancestor element to return"
		}
		if (a === b) {
			throw "element is required to know which ancestor element to return"
		}
		var d = a.parentNode;
		while (d) {
			if (c(d)) {
				return d
			}
			d = d.parentNode
		}
		return null
	}

	function U(a, b) {
		if (f.Enabled) {
			a = encodeURI(a);
			var c = b ? "_i" : "";
			L("wa_aid" + c, G(a, "jp_aid"), "wa_avt" + c, G(a, "jp_avt"), "wa_mc" + c, G(a, "jp_mc") || G(a, "WT.mc_id"), "wa_mep" + c, G(a, "jp_mep"), "wa_aoc" + c, G(a, "jp_aoc"), "wa_con" + c, G(a, "jp_con"), "wa_lid" + c, G(a, "jp_lid"), "wa_prd" + c, G(a, "WT.pn_sku"), "wa_tp", f.TrackingType["FlashAd" + (b ? "Imp" : "Click")]);
			A();
			R(200)
		}
	}

	function V(a, b) {
		L("wa_fl_n", a, "wa_fl_a", b, "wa_tp", f.TrackingType["wa_fl_n"])
	}

	function W(a, b) {
		L("wa_dyn_n", a, "wa_dyn_d", b, "wa_tp", f.TrackingType["Modal"]);
		A()
	}

	function X(a, b) {
		L("wa_tab_n", a, "wa_tab_d", b, "wa_tp", f.TrackingType["Tab"]);
		A()
	}

	function Y(a, b) {
		L("wa_frm_n", a, "wa_frm_s", b, "wa_tp", f.TrackingType["FormField"]);
		A()
	}

	function Z(a, b) {
		L("wa_hov_n", a, "wa_hov_d", b, "wa_tp", f.TrackingType["Hover"]);
		A()
	}

	function $(a) {
		L("wa_lnk", a, "wa_tp", f.TrackingType["wa_lnk"]);
		A()
	}

	function _(a) {
		L("wa_flexlnk", a, "wa_tp", f.TrackingType["FlashExitLink"]);
		A()
	}

	function ab(a) {
		f.Initialized = true;
		if (typeof a !== "object") {
			f.ScenarioNames = "myForm"
		} else {
			f.ScenarioNames = a.id
		}
		bb(a)
	}

	function bb(a) {
		if (a === b) {
			a = c
		}
		if (typeof _suppressLinkTracking !== "undefined" && _suppressLinkTracking) {} else {
			cb(c.body, "click", N)
		}
		if (f.ScenarioNames !== null) {
			cb(a, {
				nodeName: "input",
				type: "radio;checkbox;submit;image;button"
			}, "click", fb);
			cb(a, {
				nodeName: "input",
				type: "text;password;tel;number"
			}, "change", fb);
			cb(a, {
				nodeName: "select"
			}, "change", fb);
			cb(a, {
				nodeName: "button"
			}, "click", fb);
			if (a.addEventListener === b) {
				cb(a, {
					nodeName: "input",
					type: "text;password;tel;number"
				}, "click", eb);
				cb(a, {
					nodeName: "select"
				}, "click", eb)
			}
		} else {
			cb(a, {
				className: "chaseanalytics-track-element",
				nodeName: "input",
				type: "radio;checkbox;submit;image;button"
			}, "click", fb);
			cb(a, {
				className: "chaseanalytics-track-element",
				nodeName: "input",
				type: "text;password;tel;number"
			}, "change", fb);
			cb(a, {
				className: "chaseanalytics-track-element",
				nodeName: "select"
			}, "change", fb);
			cb(a, {
				className: "chaseanalytics-track-option",
				nodeName: "select"
			}, "change", fb);
			cb(a, {
				className: "chaseanalytics-track-element",
				nodeName: "button"
			}, "click", fb);
			if (a.addEventListener === b) {
				cb(a, {
					className: "chaseanalytics-track-element",
					nodeName: "input",
					type: "text;password;tel;number"
				}, "click", eb);
				cb(a, {
					className: "chaseanalytics-track-element",
					nodeName: "select"
				}, "click", eb);
				cb(a, {
					className: "chaseanalytics-track-option",
					nodeName: "select"
				}, "click", eb)
			}
		}
	}

	function cb(c, d, f, h) {
		if (h === b) {
			h = f;
			f = d;
			d = b
		}
		var i = g(h) ? h : a[h];
		if (c !== b && i !== b) {
			hb(c, f, function (c) {
				c = c || a.event;
				if (d) {
					try {
						var f = c.target || c.srcElement,
							g = f.className || "",
							h = e.call(f.nodeName || f.tagName || ""),
							j = e.call(f.type || ""),
							k = d.className !== b ? g.indexOf(d.className) !== -1 : true,
							l = d.nodeName !== b ? d.nodeName.indexOf(h) !== -1 : true,
							m = d.type !== b ? d.type.indexOf(j) !== -1 : true;
						k && l && m && i.call(this, c)
					} catch (n) {}
				} else {
					i.call(this, c)
				}
			})
		}
	}

	function db(a, c) {
		var d = c.split(";"),
			e = d.length,
			f = a.length,
			g = [],
			h, i;
		for (var j = 0; j < f; j++) {
			h = a[j];
			i = h.getAttribute("type");
			for (var k = 0; k < e; k++) {
				if (i !== b && i === d[k]) {
					g.push(h)
				}
			}
		}
		return g
	}

	function eb(a) {
		var c = a.target || a.srcElement,
			d = I(c, "data-pt-name") || c.id || c.name;
		var e = c.type + d;
		if (c.addEventListener === b) {
			cb(c, "change", fb)
		}
	}

	function fb(a) {
		if (a && (typeof a.which != "number" || a.which == 1)) {
			var b = S(a, f.FormField);
			if (b) {
				var c = T(b, function (a) {
					return a.nodeName.toLowerCase() == "form"
				});
				var d = I(c, "data-pt-name") || f.ScenarioSteps || f.PageTitle || "unknown",
					e;
				if (b.tagName.toLowerCase() === "select" && b.className.indexOf("chaseanalytics-track-option") > -1) {
					var g = b.selectedIndex;
					e = b.options[g].getAttribute("data-pt-name") || b.value
				} else {
					e = I(b, "data-pt-name") || b.id || b.name
				}
				if (e) {
					L("wa_frm_n", d, "wa_frm_s", e, "wa_tp", f.TrackingType["FormField"]);
					A()
				} else {
					lb("Not logging form field usage because the element did not have a name.  Tried data-pt-name, the id, and the name attributes.")
				}
			} else {
				lb("Not logging form field usage because could not find the element that triggered the event")
			}
		}
	}

	function gb(b) {
		if (b.length > 0) {
			b = b.toLowerCase();
			if (b === a.location.hostname.toLowerCase()) {
				return false
			}
		}
		return true
	}

	function hb(a, b, c) {
		return a.addEventListener ? a.addEventListener(b, c, false) : a.attachEvent("on" + b, c)
	}

	function ib(a, b, c) {
		return a.removeEventListener ? a.removeEventListener(b, c, false) : a.detachEvent("on" + b, c)
	}
	cb(a, "load", o);

	function jb(a) {
		return encodeURIComponent(a).replace(/[!'()*]/g, escape)
	}

	function kb(a) {
		var b = "> < ' ` ^ [ ] { } \\ | ~".split(" ");
		for (var c = 0, d = b.length; c < d; c++) {
			a = a.split(b[c]).join("")
		}
		return a
	}

	function lb(a) {
		if (f.DebugMode) {
			if (console !== b && console.log) {
				console.log(a)
			} else {
				alert(a)
			}
		}
	}
	var mb = function nb() {
		return {
			findAncestorElement: T,
			nodeListToArray: m,
			getElementsByClassSubstring: n
		}
	};
	a["_Bind"] = cb;
	a["_GetCookie"] = function (a) {
		var b = new RegExp(a + "s*=s*(.*?)(?:;|$)");
		var d = c.cookie.toString();
		var e = d.match(b);
		return e ? unescape(e[1]) : null
	};
	return {
		config: f,
		debugMessage: lb,
		setDebugMode: h,
		setPageDotUrl: i,
		trackCustomVariables: K,
		trackFlashAd: U,
		trackAdImpressions: C,
		trackAsyncAdImpressions: D,
		setScenario: M,
		requestPageDot: A,
		trackModalLoad: W,
		trackHoverLoad: Z,
		trackTabSelect: X,
		trackDualDate: Y,
		trackCustomLink: $,
		trackFlashExitLink: _,
		parseEnvironment: j,
		processAdClick: P,
		reInitialize: s,
		disableReporting: p,
		disablePageLevelReporting: q,
		enablePageLevelReporting: r,
		mapConfigValuesToOmnitureTags: w,
		initLinkFormTracking: ab,
		forUnitTestingOnly: t,
		privateFunctionsForUnitTestingOnly: mb()
	}
}(this);
chase_getElementsByClassName = function (a) {
	if (typeof document.getElementsByClassName === "function") {
		return document.getElementsByClassName(a)
	}
	var b = [];
	var c = document.getElementsByTagName("a");
	for (var d = 0; d < c.length; d++) {
		var e = c[d].className;
		if (e && e.indexOf(a) >= 0) b.push(c[d])
	}
	return b
};
var DebugMode = 0;
var _ScenarioName = null;
var _StepName = null;
var _ScenarioParams = null;
var _SegmentGroup = null;
var _AdCookie = "RPT_Conv";
var _RoutableTestTargetCookie = "RLTTC";
var _SetRoutableLogin = false;
var _Delim = "|CP|";
var RPT_Enabled = true;
var _PageTitle;
var _ValidFlashAdUrls = ["chaseonline.chase.com", "chase.com", "banking.chase.com", "payments.chase.com", "cards.chase.com", "stmts.chase.com", "gwsol.chase.com", "creditcards.chase.com", "ultimaterewards.chase.com", "messagecenter.chase.com", "servicing.chase.com", "ultimaterewardsshop.chase.com", "mobilebanking.chase.com", "m.chase.com", "callcenter.chase.com", "jpmorgan.chase.com", "chasebonus.com", "deposits.chase.com", "chase-feedback.opinionlab.com", "espanol.chase.com", "locator.chase.com", "ultimaterewardsearn.chase.com", "ultimaterewardsct.chase.com", "apply.chase.com", "choosemyreward.chase.com", "applynow.chase.com", "resources.chase.com", "investments.chase.com", "prequalifiedoffers.mychasecreditcards.com", "jpmchase.taleo.net", "ultimaterewardspoints.chase.com", "careersatchase.com", "ccsic.fni-stl.com", "m.creditcards.chase.com", "ultimaterewardslt.chase.com", "chasereferafriend.com", "jpmorganchase.com", "m.urshop.chase.com", "theexplorercard.com", "ultimaterewardstravel.chase.com", "payconnexion.com", "chasehsa.com", "careers.jpmorganchase.com", "chasecheckout.chasepaymentech.com", "jpmorgan.com", "chasefuelrewards.com", "increase.mychasecreditcards.com", "demo.chase.com", "investor.shareholder.com", "calendar.chasebonus.com", "survey.foreseeresults.com", "cobrowse.chase.com", "securetools.leadfusion.com", "madisonsquaregarden.chase.com", "coupon.chaseoffers.com", "paymentnet.jpmorgan.com", "insideaccess.com", "jpmorganfunds.com", "missionmainstreetgrants.com", "privateclient.chase.com", "chasegreatrewards.com", "chasebenefits.com", "careers.jpmorgan.com", "chasefreedomnow.com", "premier.chasegreatrewards.com", "jpmorgansecurities.com", "points.chasesapphiresocial.com", "messagecenter.retireonline.com", "aarpcreditcard.com", "veteranjobsmission.com", "yourchaseblueprint.com", "chasepartnertools.com", "ritzcarltonrewardscard.com", "cms.chasebonus.com", "partners.leadfusion.com", "chasebankmortgages.com", "firstusa.com", "sso.chasehsa.com", "privatebank.jpmorgan.com", "theritzcarltonrewardscard.com", "admin.payconnexion.com", "chaseb2b.com", "getchasesapphire.com", "chaserewards.com", "mortgage1.chase.com", "chasemobilepay.com", "jpmorganchina.com.cn", "smuauth.jpmorganchase.com", "chasejacksonville.com", "tssportal.jpmorgan.com", "chasefinancialwellness.com", "techcareers.jpmorgan.com", "mfasa.chase.com", "smuauth.jpmorgan.com", "smuauth.myimagearchive.com", "chasepay.chase.com", "requestritzcarltoncard.com", "jpmorgan.co.jp", "bloomspot.com", "ebusiness.dealertrack.com", "jpmorgan.ru", "www2.chase.com", "ndr.chasehsa.com", "rewardsplusshopping.com", "secure.opinionlab.com", "smuauth.acctmanagement.com", "chasemyoffers.com", "hyatt.mychasebonus.com", "mychasebonus.com", "appraisers.chaseb2b.com", "smuauth.jpmchase.com", "chasegiving.com", "smuauth.chase.com", "mychasecreditcards.com", "m.jpmorgan.com", "creditcard.chase.com", "juniusrep.com", "chasesapphire.com", "chasecreditcards.com", "insideaccessfromchase.com", "chasecanadainstantcredit.ca", "smuauth.transferagencyonline.com", "chasecharitytoolkit.com", "stage.chasegreatrewards.com", "local.chase.com", "freedomsweeps.chaseonlinesweepstakes.com", "chaseslate.com", "privateclient.jpmorgan.com", "chasecontentui.bankone.net", "merchant.bloomspot.com", "ts.jpmorgan.com", "application.chaseb2b.com", "fbapps.u47.net", "inkfromchase.com", "mymortgage.chase.com", "jpmorganinstitutional.com", "chasecheckout.com", "chasesapphirecard.com", "chaseclaroysimple.com", "ultimaterewardsrc.chase.com", "public.ultimaterewards.com", "ultimaterewardsctt2.chase.com", "cashbackchasedebit.com", "ultimaterewardsctt4.chase.com", "settlementagents.chaseb2b.com", "m.www.chaseb2b.com"];

function RPT_Init(a) {}

function RPT_SetPersonId(a) {}

function RPT_ErrorPage(a) {}

function RPT_ScenarioPage(a, b, c) {
	CHASE.analytics.setScenario(a, b, c)
}
RPT_ScenerioPage = RPT_ScenarioPage;

function RPT_RecordEvent() {
	CHASE.analytics.requestPageDot()
}

function RPT_RecordPageLoadEvent() {
	CHASE.analytics.enablePageLevelReporting();
	CHASE.analytics.mapConfigValuesToOmnitureTags(true);
	CHASE.analytics.requestPageDot()
}

function RPT_Impression(a) {
	CHASE.analytics.trackFlashAd(a, true)
}

function RPT_Click(a) {
	var b;
	for (var c = 0; c <= _ValidFlashAdUrls.length; c++) {
		if (a.search("://" + _ValidFlashAdUrls[c]) > 0) {
			b = true;
			break
		}
	}
	if (b) {
		RPT_ClickNoRedirect(a);
		document.location = a
	}
}

function RPT_ClickNoRedirect(a) {
	CHASE.analytics.trackFlashAd(a, false)
}

function RPT_AddVariables() {
	CHASE.analytics.trackCustomVariables(arguments)
}

function clickthrough(a) {
	var b = document.getElementById(a);
	if (b) {
		RPT_Click(b.href)
	}
}

function AdParam(a, b) {
	this.JpVal = a;
	this.WtVal = b
}
var _AdParams = new Array(new AdParam("wt.ac", "WT.ad"), new AdParam("jp_aid", "DCSext.jp_aid"), new AdParam("wt.mc_id", "WT.mc_id"), new AdParam("jp_mep", "DCSext.jp_mep"), new AdParam("jp_con", "DCSext.jp_con"), new AdParam("jp_lid", "DCSext.jp_lid"), new AdParam("jp_aoc", "DCSext.jp_aoc"), new AdParam("jp_avt", "DCSext.jp_avt"), new AdParam("wt.pn_sku", "WT.pn_sku"), new AdParam("jp_mc", "DCSext.jp_mc"));
_Bind(window, "load", "_Init");

function _Show(a) {
	if (DebugMode === 3 && console && console.log) {
		console.log(a);
		return
	}
	if (DebugMode > 0) {
		alert(a)
	}
}

function _Debug(a) {
	var b = typeof WriteWebTrendsCall != "undefined";
	if (DebugMode > 0 || b) {
		var c = DebugMode == 1 ? "<br/>" : "\n";
		var d = a.split("?");
		var e = a + "\n\n" + "Domain: " + d[0] + c + "Length: " + a.length + c;
		d = d[1].split("&");
		e += "Param Count: " + (d.length - 1) + c;
		d = d.sort(function (a, b) {
			var c = String(a).toUpperCase();
			var d = String(b).toUpperCase();
			if (c > d) return 1;
			if (c < d) return -1;
			return 0
		});
		e += d.join(c);
		if (DebugMode == 1) {
			var f = window.open("");
			f.document.write(e)
		} else {
			_Show(e)
		}
		if (b) {
			WriteWebTrendsCall(d)
		}
	}
}

function InitializeFPC() {}
var _Initialized = false;
var _InitStageCompleted = 0;

function _Init() {}

function _Init2() {}

function _Clear() {}

function _GetTarget(a, b, c) {
	b = b.toUpperCase();
	var d = a.target || a.srcElement;
	if (!c && d.tagName.toUpperCase() != b) {
		return null
	} else {
		while (d.tagName) {
			if (d.tagName.toUpperCase() != b) {
				d = d.parentElement || d.parentNode
			} else {
				return d
			}
		}
	}
	return null
}

function _GetTargetName(a) {
	var b = null;
	if (a) {
		if (a.className.indexOf("chaseanalytics-opt-elem-namefromdata") > -1) {
			b = a.getAttribute("data-pt-name")
		}
		if (!b) {
			if (a.id && a.id.length > 0) {
				b = a.id
			} else if (a.name && a.name.length > 0) {
				b = a.name
			} else if (a.title && a.title.length > 0) {
				b = a.title
			} else if (a.alt && a.alt.length > 0) {
				b = a.alt
			}
		}
	}
	return b
}

function _TrackElement(a) {}

function _OnChange(a) {
	var b = _GetTarget(a, "input", false);
	if (b) {
		var c = b.type.toLowerCase();
		if (c == "button" || c == "image" || c == "submit" || c == "radio" || c == "checkbox") {
			return true
		}
	}
	if (!b) {
		b = _GetTarget(a, "select", false)
	}
	if (!b) {
		b = _GetTarget(a, "textarea", false)
	}
	_TrackElement(b);
	return true
}
var _thirdParyHost, _thirdPartyPath, _isThirdParty = false;

function _ParseThirdPartyUrl(a) {
	var b = a.indexOf("//");
	var c = a.substring(b + 2, a.length);
	b = c.indexOf("/");
	_thirdPartyHost = c.substring(0, b);
	_thirdPartyPath = c.substring(b + 1, c.length);
	_Show("Third Party\n\n" + a + "\n\n" + _thirdPartyHost + "\n\n" + _thirdPartyPath)
}

function _IsTaggedOffSite(a) {
	var b = _GetParmVal("jp_offsite", a);
	if (b) {
		_Show("3rd Party Tagged");
		_isThirdParty = true;
		_ParseThirdPartyUrl(b)
	}
	return _isThirdParty
}

function _IsImpliedOffSite(a) {
	if (a.indexOf("viewad.aspx") != -1) {
		return _isThirdParty
	} else if (a.indexOf("ultimaterewards") != -1) {
		_Show("3rd Pary Ultimate Rewards Implied");
		_isThirdParty = true;
		_ParseThirdPartyUrl(a)
	} else if (a.indexOf(".chase.") == -1 && a.indexOf(".cardmemberservices.") == -1) {
		_Show("3rd Pary Implied");
		_isThirdParty = true;
		_ParseThirdPartyUrl(a)
	}
	return _isThirdParty
}

function _OnClick(a) {}

function _SetConversionInfo(a, b) {}
var _clickedAd;
var _conversionAd;

function _CheckConversion() {}

function _BindAll(a, b, c) {
	if (typeof a != "undefined") {
		for (var d = 0; d < a.length; d++) {
			_Bind(a[d], b, c)
		}
	}
}

function _OnLoadError(a) {
	_Show("_OnLoadError");
	return false
}

function _OnLoad(a) {
	if (gHref.length > 0) {
		window.location = gHref;
		gHref = "";
		return true
	}
}

function _ParamSearch() {
	if (document.links) {
		for (var a = 0; a < document.links.length; a++) {
			_AdSearchUpdateObj(document.links[a])
		}
	}
}

function _AdSearchUpdateObj(a) {
	var b = _AdSearch(a.href, true);
	if (b != a.href) {
		b = b.replace("@", "%40");
		a.href = b;
		_Show("subbing:" + b + " for " + a.href)
	}
}

function _AdSearch(a, b) {}

function _GetParmVal(a, b) {
	a = a.toLowerCase();
	b = b.toLowerCase();
	var c = b.indexOf(a + "=");
	var d = null;
	if (c != -1) {
		var e = c + a.length + 1;
		var f = b.indexOf("&", e);
		d = b.substring(e, f != -1 ? f : b.length);
		if ((f = d.indexOf("'")) > -1) {
			d = d.substring(0, f)
		}
	}
	return d
}
var _Environment;

function _Configure() {}

function ApplyWebTrends(a) {}

function _GetDcsId(a) {}
var _ResolvedDomain;

function _Replace(a, b, c) {
	if (a.match(b)) {
		_ResolvedDomain = a.replace(b, c);
		return true
	}
	return false
}

function _GetDomain(a) {
	return _ResolvedDomain
}

function _IsNumeric(a) {
	var b = "0123456789";
	for (i = 0; i < a.length; i++) {
		if (b.indexOf(a.charAt(i)) == -1) {
			return false
		}
	}
	return true
}

function _SetCookie(a, b) {
	var c = window.location.protocol.indexOf("https:") === 0 ? ";secure" : "";
	document.cookie = a + "=" + escape(b) + ";domain=" + _wt.fpcdom; + ";path=/" + c
}

function PT_BuildLinkImpressionList() {
	var a = "";
	var b = chase_getElementsByClassName("chaseanalytics-opt-link-imp");
	for (var c = 0; c < b.length; c++) {
		a += a !== "" ? ";" + _GetTargetName(b[c]) : _GetTargetName(b[c])
	}
	return a
}

function updatePersonaCookie(a) {
	var b = new PersonalizationCookie;
	b.SetLocale(a + "_us");
	b.Persist()
}
CHASE.TagManager = function () {
	var tagServer = window["tagManagerConfig"] != undefined ? window.tagManagerConfig.tagServer : null,
		env = "prod",
		defaultServer = "https://www.chase.com";
	if (tagServer != null) {
		if (tagServer.indexOf("wwwq") != -1) {
			env = "qa"
		} else if (tagServer.indexOf("wwwi") != -1) {
			env = "ist"
		} else if (tagServer.indexOf("wwwd") != -1) {
			env = "dev"
		} else if (tagServer.indexOf("load") != -1) {
			env = "load"
		} else if (tagServer.indexOf("www.") != -1) {
			env = "prod"
		} else {
			env = "unknown"
		}
	} else {
		tagServer = defaultServer
	}
	var TM = {
		serverUrl: tagServer,
		env: env,
		setServerUrl: function (a) {
			TM.serverUrl = a
		},
		getServerUrl: function () {
			return TM.serverUrl
		},
		getXHRObject: function () {
			var a;
			try {
				a = new XMLHttpRequest;
				return a
			} catch (b) {
				var c = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
				var d = c.length;
				for (var e = 0; e < d; e++) {
					try {
						a = new ActiveXObject(c[e])
					} catch (b) {
						continue
					}
					break
				}
			}
			return a
		},
		requestPixel: function (a) {
			if (document.images) {
				var b = new Image;
				b.src = a
			} else {
				document.write('<IMG ALT="" BORDER="0" NAME="DCSIMG" WIDTH="1" HEIGHT="1" SRC="' + a + '">')
			}
		},
		extend: function (a, b) {
			if (!b) return a;
			if (!a) return b;
			for (var c in b) {
				a[c] = b[c]
			}
			return a
		},
		xmlhttpGet: function (a) {
			var b = TM.getXHRObject();
			b.onreadystatechange = function () {
				if (b.readyState != 4) {
					return
				}
			};
			b.open("GET", a, true);
			b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			b.send()
		},
		processScripts: function (scripts) {
			for (var i = 0; i < scripts.length; i++) {
				var scriptName = "CHASE.TagManager." + scripts[i];
				eval(scriptName)
			}
		},
		attachInteractions: function (a) {
			var b = a.interactions;
			var c, d, e, f, g, h;
			for (var i = 0; i < b.length; i++) {
				c = b[i];
				d = c.attr;
				e = c.attrValue;
				f = c.event;
				f = f.replace("on", "");
				if (d === "id") {
					h = document.getElementById(e);
					if (h.addEventListener) {
						h.addEventListener(f, function () {
							CHASE.TagManager.fireTagsForMapping(a)
						}, false)
					} else if (h.attachEvent) {
						h.attachEvent("on" + f, function () {
							CHASE.TagManager.fireTagsForMapping(a)
						})
					}
				} else if (d === "class") {
					if (document.getElementsByClassName) {
						g = document.getElementsByClassName(e)
					} else {
						g = TM.getElementsByClassName(e)
					}
					for (var j = 0; j < g.length; j++) {
						h = g[j];
						if (h.addEventListener) {
							h.addEventListener(f, function () {
								CHASE.TagManager.fireTagsForMapping(a)
							}, false)
						} else if (h.attachEvent) {
							h.attachEvent("on" + f, function () {
								CHASE.TagManager.fireTagsForMapping(a)
							})
						}
					}
				} else if (d === "linktrackingid") {
					var k;
					var l = document.getElementsByTagName("a");
					for (var m = 0; m < l.length; m++) {
						k = l[m];
						var n = k.getAttribute("data-pt-name");
						if (n === e) {
							if (k.addEventListener) {
								k.addEventListener(f, function () {
									CHASE.TagManager.fireTagsForMapping(a)
								}, false)
							} else if (k.attachEvent) {
								k.attachEvent("on" + f, function () {
									CHASE.TagManager.fireTagsForMapping(a)
								})
							}
						}
					}
				}
			}
		},
		registerTags: function (a) {
			var b;
			var c = a.urls;
			var d = a.scripts;
			if (!TM.urls) {
				TM.urls = []
			}
			if (!TM.scripts) {
				TM.scripts = []
			}
			if (c) {
				for (var e = 0; e < c.length; e++) {
					if (c[e] != null && c[e] != undefined) {
						TM.urls.push(c[e])
					}
				}
			}
			if (d) {
				for (var f = 0; f < d.length; f++) {
					if (d[f] != null && d[f] != undefined) {
						b = TM.replacePlaceholder(d[f], true);
						TM.scripts.push(b)
					}
				}
			}
		},
		fireTagsForMapping: function (a) {
			var b;
			var c = [];
			var d = a.urls;
			var e = a.scripts;
			if (d) {
				for (var f = 0; f < d.length; f++) {
					TM.invokePixelTag(d[f])
				}
			}
			if (e) {
				for (var g = 0; g < e.length; g++) {
					if (e[g] != null && e[g] != undefined) {
						b = TM.replacePlaceholder(e[g], true);
						c.push(b)
					}
				}
				TM.processScripts(c)
			}
		},
		fireTags: function () {
			if (TM.urls) {
				for (var a = 0; a < TM.urls.length; a++) {
					TM.invokePixelTag(TM.urls[a])
				}
			}
			if (TM.scripts) {
				TM.processScripts(TM.scripts)
			}
		},
		setFireOnceCookie: function (a, b) {
			var c = new Date;
			c.setTime(c.getTime() + 30 * 60 * 1e3);
			document.cookie = a + "=" + escape(b) + ("; expires=" + c.toGMTString())
		},
		processTags: function (data, tryCount) {
			if (!CHASE.TagManager.ExtensionsLoaded || typeof PersonalizationCookie != "function") {
				tryCount = tryCount || 0;
				if (tryCount > 10) {
					CHASE.analytics.debugMessage("[Tag manager] Dependencies not loaded after 10 tries. Aborting.");
					return
				}
				CHASE.analytics.debugMessage("[Tag manager] Dependencies not loaded. Retry # " + tryCount);
				setTimeout(function () {
					TM.processTags(data, tryCount + 1)
				}, 200);
				return
			}
			TM.initClientVars(true);
			var scripts = new Array;
			var fireOnceArray = [];
			var fireOnceCookie = _GetCookie("fireOnce");
			if (fireOnceCookie) {
				fireOnceArray = fireOnceCookie.split(",")
			} else {
				fireOnceArray = []
			}
			var fireOnceMappingID;
			var script;
			if (data != null && data.jsonScriptArray != null) {
				for (var k = 0; k < data.jsonScriptArray.length; k++) {
					mappingID = data.jsonScriptArray[k].mappingID;
					var condition = data.jsonScriptArray[k].conditions;
					var conditionResult = false;
					if (condition) {
						try {
							conditionResult = eval(condition)
						} catch (e) {
							conditionResult = false
						}
					} else {
						conditionResult = true
					}
					if (conditionResult) {
						var interactions = data.jsonScriptArray[k].interactions;
						if (interactions) {
							TM.attachInteractions(data.jsonScriptArray[k])
						} else {
							var fireOnceStatus = data.jsonScriptArray[k].fireOnce;
							if (fireOnceStatus) {
								if (TM.indexOf(fireOnceArray, mappingID) == -1) {
									fireOnceArray.push(mappingID);
									TM.registerTags(data.jsonScriptArray[k])
								}
							} else {
								TM.registerTags(data.jsonScriptArray[k])
							}
						}
					}
				}
				fireOnceCookie = fireOnceArray.join(",");
				TM.setFireOnceCookie("fireOnce", fireOnceArray);
				TM.fireTags()
			}
		},
		indexOf: function (a, b) {
			var c = a.length;
			for (var d = 0; d < c; d++) {
				if (a[d] == b) {
					return d
				}
			}
			return -1
		},
		walkTheDOM: function (a, b) {
			b(a);
			a = a.firstChild;
			while (a) {
				TM.walkTheDOM(a, b);
				a = a.nextSibling
			}
		},
		getElementsByClassName: function (a) {
			var b = [];
			TM.walkTheDOM(document.body, function (c) {
				var d, e = c.className,
					f;
				if (e) {
					d = e.split(" ");
					for (f = 0; f < d.length; f++) {
						if (d[f] === a) {
							b.push(c);
							break
						}
					}
				}
			});
			return b
		},
		invokePixelTag: function (a, b) {
			a = TM.replacePlaceholder(a, b);
			TM.requestPixel(a)
		},
		getTags: function () {
			var a;
			if (window.overridePageLocation === undefined) {
				a = encodeURI(document.URL).replace(/%5B/g, "[").replace(/%5D/g, "]")
			} else {
				a = encodeURI(window.overridePageLocation).replace(/%5B/g, "[").replace(/%5D/g, "]")
			}
			var b = TM.getServerUrl() + "/apps/services/tags";
			a = a.split("?")[0];
			a = a.replace("://", "/");
			TM.loadTagScript(b + "/" + a)
		},
		removeSplChars: function (a) {
			if (a) {
				return a.replace(/\<|\>|\&/g, "")
			}
		},
		loadTagScript: function (a) {
			var b = document.createElement("script"),
				c = document.getElementsByTagName("head")[0] || document.documentElement;
			b.src = TM.removeSplChars(a);
			c.appendChild(b)
		},
		initClientVars: function (a) {
			if (!a && TM.clientVars) return;
			var b = function () {
				var a = {
					env: TM.env,
					query: function (a) {
						if (a == "") return {};
						var b = {};
						for (var c = 0; c < a.length; ++c) {
							var d = a[c].split("=");
							if (d.length != 2) continue;
							b[d[0]] = decodeURIComponent(d[1].replace(/\+/g, " "))
						}
						return b
					}(window.location.search.substr(1).split("&")),
					persona: function (a) {
						if (typeof PersonalizationCookie != "function") {
							return {}
						} else {
							var b = new PersonalizationCookie;
							return b.Table
						}
					}(),
					v1st: function (a) {
						var b = /^[a-z0-9]+$/i;
						return b.test(a) ? a : null
					}(_GetCookie("v1st")),
					userAgent: encodeURIComponent(navigator.userAgent),
					referrer: encodeURIComponent(document.referrer),
					random: Math.floor(Math.random() * 9e8) + 1e8,
					pageUrl: encodeURIComponent(document.location)
				};
				return a
			}();
			TM.clientVars = TM.extend(window.jpmcPageVar, b)
		},
		replacePlaceholder: function (source, params) {
			TM.initClientVars(false);
			var clientVars;
			if (params) clientVars = TM.extend(params, TM.clientVars);
			else clientVars = TM.clientVars;
			var regexp = /\{(.+?)\}/g;
			var matches_array = source.match(regexp);
			var toReturn = source;
			if (matches_array) {
				try {
					for (var i = 0; i < matches_array.length; i++) {
						var match = matches_array[i].substring(1, matches_array[i].length - 1);
						var json = "clientVars." + match;
						var replacement = eval(json) || "";
						toReturn = toReturn.replace(matches_array[i], replacement)
					}
				} catch (e) {
					CHASE.analytics.debugMessage("Unable to render json object. " + e)
				}
			}
			return toReturn
		},
		getJSONP: function (a, b) {
			var c = "_" + +new Date,
				d = document.createElement("script"),
				e = document.getElementsByTagName("head")[0] || document.documentElement;
			window[c] = function (a) {
				e.removeChild(d);
				b && b(a)
			};
			d.src = a.replace("callback=?", "callback=" + c);
			e.appendChild(d)
		}
	};
	return TM
}();

function _runPixelTracker() {
	if (window.TagManagerWait) return;
	if (!document.getElementById("pixelTagExtensionScript")) {
		var a = document.createElement("script");
		a.type = "text/javascript";
		a.id = "pixelTagExtensionScript";
		a.src = CHASE.TagManager.getServerUrl() + "/apps/chase/clientlibs/foundation/tagmanagerextensions.js";
		var b = document.getElementsByTagName("head")[0];
		if (b) {
			b.appendChild(a)
		} else {
			document.getElementsByTagName("body")[0].appendChild(a)
		}
	}
	if (!document.getElementById("personalizationScript")) {
		var c = CHASE.TagManager.getServerUrl();
		var d = this.document.location.toString();
		var e = document.createElement("script");
		e.type = "text/javascript";
		e.id = "personalizationScript";
		e.src = c + "/apps/chase/clientlibs/foundation/scripts/Personalization.js";
		var b = document.getElementsByTagName("head")[0];
		if (b) {
			b.appendChild(e)
		} else {
			document.getElementsByTagName("body")[0].appendChild(e)
		}
	}
	CHASE.TagManager.getTags()
}
_Bind(window, "load", "_runPixelTracker");