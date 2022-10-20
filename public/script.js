/*!
 * Copyright (c) 2018 Chris O'Hara <cohara87@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.validator = e());
})(this, function () {
  "use strict";
  function i(t) {
    return (i =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  function u(t, e) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t;
      })(t) ||
      (function (t, e) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) {
          var r = [],
            n = !0,
            i = !1,
            a = void 0;
          try {
            for (
              var o, s = t[Symbol.iterator]();
              !(n = (o = s.next()).done) &&
              (r.push(o.value), !e || r.length !== e);
              n = !0
            );
          } catch (t) {
            (i = !0), (a = t);
          } finally {
            try {
              n || null == s.return || s.return();
            } finally {
              if (i) throw a;
            }
          }
          return r;
        }
      })(t, e) ||
      d(t, e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function r(t) {
    return (
      (function (t) {
        if (Array.isArray(t)) return n(t);
      })(t) ||
      (function (t) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t))
          return Array.from(t);
      })(t) ||
      d(t) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function d(t, e) {
    if (t) {
      if ("string" == typeof t) return n(t, e);
      var r = Object.prototype.toString.call(t).slice(8, -1);
      return "Map" ===
        (r = "Object" === r && t.constructor ? t.constructor.name : r) ||
        "Set" === r
        ? Array.from(t)
        : "Arguments" === r ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
        ? n(t, e)
        : void 0;
    }
  }
  function n(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  function l(t) {
    if (!("string" == typeof t || t instanceof String)) {
      var e = i(t);
      throw (
        (null === t ? (e = "null") : "object" === e && (e = t.constructor.name),
        new TypeError("Expected a string but received a ".concat(e)))
      );
    }
  }
  function a(t) {
    return l(t), (t = Date.parse(t)), isNaN(t) ? null : new Date(t);
  }
  for (
    var t,
      o = {
        "en-US": /^[A-Z]+$/i,
        "az-AZ": /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
        "bg-BG": /^[А-Я]+$/i,
        "cs-CZ": /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
        "da-DK": /^[A-ZÆØÅ]+$/i,
        "de-DE": /^[A-ZÄÖÜß]+$/i,
        "el-GR": /^[Α-ώ]+$/i,
        "es-ES": /^[A-ZÁÉÍÑÓÚÜ]+$/i,
        "fa-IR": /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
        "fi-FI": /^[A-ZÅÄÖ]+$/i,
        "fr-FR": /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
        "it-IT": /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
        "nb-NO": /^[A-ZÆØÅ]+$/i,
        "nl-NL": /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
        "nn-NO": /^[A-ZÆØÅ]+$/i,
        "hu-HU": /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
        "pl-PL": /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
        "pt-PT": /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
        "ru-RU": /^[А-ЯЁ]+$/i,
        "sl-SI": /^[A-ZČĆĐŠŽ]+$/i,
        "sk-SK": /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
        "sr-RS@latin": /^[A-ZČĆŽŠĐ]+$/i,
        "sr-RS": /^[А-ЯЂЈЉЊЋЏ]+$/i,
        "sv-SE": /^[A-ZÅÄÖ]+$/i,
        "th-TH": /^[ก-๐\s]+$/i,
        "tr-TR": /^[A-ZÇĞİıÖŞÜ]+$/i,
        "uk-UA": /^[А-ЩЬЮЯЄIЇҐі]+$/i,
        "vi-VN":
          /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
        "ku-IQ": /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
        ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
        he: /^[א-ת]+$/,
        fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,
        "hi-IN": /^[\u0900-\u0961]+[\u0972-\u097F]*$/i,
      },
      s = {
        "en-US": /^[0-9A-Z]+$/i,
        "az-AZ": /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
        "bg-BG": /^[0-9А-Я]+$/i,
        "cs-CZ": /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
        "da-DK": /^[0-9A-ZÆØÅ]+$/i,
        "de-DE": /^[0-9A-ZÄÖÜß]+$/i,
        "el-GR": /^[0-9Α-ω]+$/i,
        "es-ES": /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
        "fi-FI": /^[0-9A-ZÅÄÖ]+$/i,
        "fr-FR": /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
        "it-IT": /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
        "hu-HU": /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
        "nb-NO": /^[0-9A-ZÆØÅ]+$/i,
        "nl-NL": /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
        "nn-NO": /^[0-9A-ZÆØÅ]+$/i,
        "pl-PL": /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
        "pt-PT": /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
        "ru-RU": /^[0-9А-ЯЁ]+$/i,
        "sl-SI": /^[0-9A-ZČĆĐŠŽ]+$/i,
        "sk-SK": /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
        "sr-RS@latin": /^[0-9A-ZČĆŽŠĐ]+$/i,
        "sr-RS": /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
        "sv-SE": /^[0-9A-ZÅÄÖ]+$/i,
        "th-TH": /^[ก-๙\s]+$/i,
        "tr-TR": /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
        "uk-UA": /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
        "ku-IQ":
          /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
        "vi-VN":
          /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
        ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
        he: /^[0-9א-ת]+$/,
        fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,
        "hi-IN": /^[\u0900-\u0963]+[\u0966-\u097F]*$/i,
      },
      c = { "en-US": ".", ar: "٫" },
      e = ["AU", "GB", "HK", "IN", "NZ", "ZA", "ZM"],
      f = 0;
    f < e.length;
    f++
  )
    (t = "en-".concat(e[f])),
      (o[t] = o["en-US"]),
      (s[t] = s["en-US"]),
      (c[t] = c["en-US"]);
  for (
    var A,
      $ = [
        "AE",
        "BH",
        "DZ",
        "EG",
        "IQ",
        "JO",
        "KW",
        "LB",
        "LY",
        "MA",
        "QM",
        "QA",
        "SA",
        "SD",
        "SY",
        "TN",
        "YE",
      ],
      p = 0;
    p < $.length;
    p++
  )
    (A = "ar-".concat($[p])), (o[A] = o.ar), (s[A] = s.ar), (c[A] = c.ar);
  for (var S, h = ["IR", "AF"], g = 0; g < h.length; g++)
    (S = "fa-".concat(h[g])), (s[S] = s.fa), (c[S] = c.ar);
  for (
    var E = ["ar-EG", "ar-LB", "ar-LY"],
      I = [
        "bg-BG",
        "cs-CZ",
        "da-DK",
        "de-DE",
        "el-GR",
        "en-ZM",
        "es-ES",
        "fr-CA",
        "fr-FR",
        "id-ID",
        "it-IT",
        "ku-IQ",
        "hi-IN",
        "hu-HU",
        "nb-NO",
        "nn-NO",
        "nl-NL",
        "pl-PL",
        "pt-PT",
        "ru-RU",
        "sl-SI",
        "sr-RS@latin",
        "sr-RS",
        "sv-SE",
        "tr-TR",
        "uk-UA",
        "vi-VN",
      ],
      R = 0;
    R < E.length;
    R++
  )
    c[E[R]] = c["en-US"];
  for (var v = 0; v < I.length; v++) c[I[v]] = ",";
  function L(t, e) {
    l(t), (e = e || {});
    var r = new RegExp(
      "^(?:[-+])?(?:[0-9]+)?(?:\\".concat(
        e.locale ? c[e.locale] : ".",
        "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"
      )
    );
    if ("" === t || "." === t || "-" === t || "+" === t) return !1;
    var n = parseFloat(t.replace(",", "."));
    return (
      r.test(t) &&
      (!e.hasOwnProperty("min") || n >= e.min) &&
      (!e.hasOwnProperty("max") || n <= e.max) &&
      (!e.hasOwnProperty("lt") || n < e.lt) &&
      (!e.hasOwnProperty("gt") || n > e.gt)
    );
  }
  (o["fr-CA"] = o["fr-FR"]),
    (s["fr-CA"] = s["fr-FR"]),
    (o["pt-BR"] = o["pt-PT"]),
    (s["pt-BR"] = s["pt-PT"]),
    (c["pt-BR"] = c["pt-PT"]),
    (o["pl-Pl"] = o["pl-PL"]),
    (s["pl-Pl"] = s["pl-PL"]),
    (c["pl-Pl"] = c["pl-PL"]),
    (o["fa-AF"] = o.fa);
  var m = Object.keys(c);
  function Z(t) {
    return L(t) ? parseFloat(t) : NaN;
  }
  function M(t) {
    return (
      "object" === i(t) && null !== t
        ? (t =
            "function" == typeof t.toString ? t.toString() : "[object Object]")
        : (null == t || (isNaN(t) && !t.length)) && (t = ""),
      String(t)
    );
  }
  function B(t, e) {
    var r,
      n = 0 < arguments.length && void 0 !== t ? t : {},
      i = 1 < arguments.length ? e : void 0;
    for (r in i) void 0 === n[r] && (n[r] = i[r]);
    return n;
  }
  var N = { ignoreCase: !1, minOccurrences: 1 };
  function F(t, e) {
    var r;
    l(t);
    (e =
      "object" === i(e) ? ((r = e.min || 0), e.max) : ((r = e), arguments[2])),
      (t = encodeURI(t).split(/%..|./).length - 1);
    return r <= t && (void 0 === e || t <= e);
  }
  var D = {
    require_tld: !0,
    allow_underscores: !1,
    allow_trailing_dot: !1,
    allow_numeric_tld: !1,
    allow_wildcard: !1,
  };
  function C(t, e) {
    l(t),
      (e = B(e, D)).allow_trailing_dot &&
        "." === t[t.length - 1] &&
        (t = t.substring(0, t.length - 1));
    var r = (t =
        !0 === e.allow_wildcard && 0 === t.indexOf("*.")
          ? t.substring(2)
          : t).split("."),
      t = r[r.length - 1];
    if (e.require_tld) {
      if (r.length < 2) return !1;
      if (
        !/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(
          t
        )
      )
        return !1;
      if (/\s/.test(t)) return !1;
    }
    return (
      !(!e.allow_numeric_tld && /^\d+$/.test(t)) &&
      r.every(function (t) {
        return (
          !(63 < t.length) &&
          !!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(t) &&
          !/[\uff01-\uff5e]/.test(t) &&
          !/^-|-$/.test(t) &&
          !(!e.allow_underscores && /_/.test(t))
        );
      })
    );
  }
  var T = "(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])",
    G = "(".concat(T, "[.]){3}").concat(T),
    O = new RegExp("^".concat(G, "$")),
    _ = "(?:[0-9a-fA-F]{1,4})",
    H = new RegExp(
      "^(" +
        "(?:".concat(_, ":){7}(?:").concat(_, "|:)|") +
        "(?:".concat(_, ":){6}(?:").concat(G, "|:").concat(_, "|:)|") +
        "(?:".concat(_, ":){5}(?::").concat(G, "|(:").concat(_, "){1,2}|:)|") +
        "(?:"
          .concat(_, ":){4}(?:(:")
          .concat(_, "){0,1}:")
          .concat(G, "|(:")
          .concat(_, "){1,3}|:)|") +
        "(?:"
          .concat(_, ":){3}(?:(:")
          .concat(_, "){0,2}:")
          .concat(G, "|(:")
          .concat(_, "){1,4}|:)|") +
        "(?:"
          .concat(_, ":){2}(?:(:")
          .concat(_, "){0,3}:")
          .concat(G, "|(:")
          .concat(_, "){1,5}|:)|") +
        "(?:"
          .concat(_, ":){1}(?:(:")
          .concat(_, "){0,4}:")
          .concat(G, "|(:")
          .concat(_, "){1,6}|:)|") +
        "(?::((?::"
          .concat(_, "){0,5}:")
          .concat(G, "|(?::")
          .concat(_, "){1,7}|:))") +
        ")(%[0-9a-zA-Z-.:]{1,})?$"
    );
  function P(t) {
    var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
    return (
      l(t),
      (e = String(e))
        ? "4" === e
          ? !!O.test(t) &&
            t.split(".").sort(function (t, e) {
              return t - e;
            })[3] <= 255
          : "6" === e && !!H.test(t)
        : P(t, 4) || P(t, 6)
    );
  }
  var b = {
      allow_display_name: !1,
      require_display_name: !1,
      allow_utf8_local_part: !0,
      require_tld: !0,
      blacklisted_chars: "",
      ignore_max_length: !1,
      host_blacklist: [],
    },
    U = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i,
    K = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i,
    w = /^[a-z\d]+$/,
    y =
      /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i,
    W =
      /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i,
    Y =
      /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
  var x = {
      protocols: ["http", "https", "ftp"],
      require_tld: !0,
      require_protocol: !1,
      require_host: !0,
      require_port: !1,
      require_valid_protocol: !0,
      allow_underscores: !1,
      allow_trailing_dot: !1,
      allow_protocol_relative_urls: !1,
      allow_fragments: !0,
      allow_query_components: !0,
      validate_length: !0,
    },
    V = /^\[([^\]]+)\](?::([0-9]+))?$/;
  function k(t, e) {
    for (var r, n = 0; n < e.length; n++) {
      var i = e[n];
      if (
        t === i ||
        ((r = i),
        "[object RegExp]" === Object.prototype.toString.call(r) && i.test(t))
      )
        return !0;
    }
    return !1;
  }
  var z = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){4}([0-9a-fA-F]{2})$/,
    X = /^([0-9a-fA-F]){12}$/,
    J = /^([0-9a-fA-F]{4}\.){2}([0-9a-fA-F]{4})$/;
  var j = /^\d{1,3}$/;
  var Q = { format: "YYYY/MM/DD", delimiters: ["/", "-"], strictMode: !1 };
  function q(e, r) {
    if (
      ((r = B("string" == typeof r ? { format: r } : r, Q)),
      "string" == typeof e &&
        /(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi.test(
          r.format
        ))
    ) {
      var t,
        n = r.delimiters.find(function (t) {
          return -1 !== r.format.indexOf(t);
        }),
        i = r.strictMode
          ? n
          : r.delimiters.find(function (t) {
              return -1 !== e.indexOf(t);
            }),
        a = {},
        o = (function (t, e) {
          var r;
          if ("undefined" == typeof Symbol || null == t[Symbol.iterator]) {
            if (
              Array.isArray(t) ||
              (r = d(t)) ||
              (e && t && "number" == typeof t.length)
            ) {
              r && (t = r);
              var n = 0,
                e = function () {};
              return {
                s: e,
                n: function () {
                  return n >= t.length
                    ? { done: !0 }
                    : { done: !1, value: t[n++] };
                },
                e: function (t) {
                  throw t;
                },
                f: e,
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var i,
            a = !0,
            o = !1;
          return {
            s: function () {
              r = t[Symbol.iterator]();
            },
            n: function () {
              var t = r.next();
              return (a = t.done), t;
            },
            e: function (t) {
              (o = !0), (i = t);
            },
            f: function () {
              try {
                a || null == r.return || r.return();
              } finally {
                if (o) throw i;
              }
            },
          };
        })(
          (function (t, e) {
            for (
              var r = [], n = Math.min(t.length, e.length), i = 0;
              i < n;
              i++
            )
              r.push([t[i], e[i]]);
            return r;
          })(e.split(i), r.format.toLowerCase().split(n))
        );
      try {
        for (o.s(); !(t = o.n()).done; ) {
          var s = u(t.value, 2),
            c = s[0],
            l = s[1];
          if (c.length !== l.length) return !1;
          a[l.charAt(0)] = c;
        }
      } catch (t) {
        o.e(t);
      } finally {
        o.f();
      }
      return (
        new Date("".concat(a.m, "/").concat(a.d, "/").concat(a.y)).getDate() ===
        +a.d
      );
    }
    return (
      !r.strictMode &&
      "[object Date]" === Object.prototype.toString.call(e) &&
      isFinite(e)
    );
  }
  var tt = { loose: !1 },
    et = ["true", "false", "1", "0"],
    rt = [].concat(et, ["yes", "no"]);
  var nt =
    /^[A-Za-z]{2,4}([_-]([A-Za-z]{4}|[\d]{3}))?([_-]([A-Za-z]{2}|[\d]{3}))?$/;
  var it = Object.keys(o);
  var at = Object.keys(s),
    ot = /^[0-9]+$/;
  var st = {
    AM: /^[A-Z]{2}\d{7}$/,
    AR: /^[A-Z]{3}\d{6}$/,
    AT: /^[A-Z]\d{7}$/,
    AU: /^[A-Z]\d{7}$/,
    BE: /^[A-Z]{2}\d{6}$/,
    BG: /^\d{9}$/,
    BR: /^[A-Z]{2}\d{6}$/,
    BY: /^[A-Z]{2}\d{7}$/,
    CA: /^[A-Z]{2}\d{6}$/,
    CH: /^[A-Z]\d{7}$/,
    CN: /^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,
    CY: /^[A-Z](\d{6}|\d{8})$/,
    CZ: /^\d{8}$/,
    DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
    DK: /^\d{9}$/,
    DZ: /^\d{9}$/,
    EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
    ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
    FI: /^[A-Z]{2}\d{7}$/,
    FR: /^\d{2}[A-Z]{2}\d{5}$/,
    GB: /^\d{9}$/,
    GR: /^[A-Z]{2}\d{7}$/,
    HR: /^\d{9}$/,
    HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
    IE: /^[A-Z0-9]{2}\d{7}$/,
    IN: /^[A-Z]{1}-?\d{7}$/,
    ID: /^[A-C]\d{7}$/,
    IR: /^[A-Z]\d{8}$/,
    IS: /^(A)\d{7}$/,
    IT: /^[A-Z0-9]{2}\d{7}$/,
    JP: /^[A-Z]{2}\d{7}$/,
    KR: /^[MS]\d{8}$/,
    LT: /^[A-Z0-9]{8}$/,
    LU: /^[A-Z0-9]{8}$/,
    LV: /^[A-Z0-9]{2}\d{7}$/,
    LY: /^[A-Z0-9]{8}$/,
    MT: /^\d{7}$/,
    MZ: /^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,
    MY: /^[AHK]\d{8}$/,
    NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
    PL: /^[A-Z]{2}\d{7}$/,
    PT: /^[A-Z]\d{6}$/,
    RO: /^\d{8,9}$/,
    RU: /^\d{9}$/,
    SE: /^\d{8}$/,
    SL: /^(P)[A-Z]\d{7}$/,
    SK: /^[0-9A-Z]\d{7}$/,
    TR: /^[A-Z]\d{8}$/,
    UA: /^[A-Z]{2}\d{6}$/,
    US: /^\d{9}$/,
  };
  var ct = /^(?:[-+]?(?:0|[1-9][0-9]*))$/,
    lt = /^[-+]?[0-9]+$/;
  function ut(t, e) {
    l(t);
    var r =
        (e = e || {}).hasOwnProperty("allow_leading_zeroes") &&
        !e.allow_leading_zeroes
          ? ct
          : lt,
      n = !e.hasOwnProperty("min") || t >= e.min,
      i = !e.hasOwnProperty("max") || t <= e.max,
      a = !e.hasOwnProperty("lt") || t < e.lt,
      e = !e.hasOwnProperty("gt") || t > e.gt;
    return r.test(t) && n && i && a && e;
  }
  var dt = /^[0-9]{15}$/,
    ft = /^\d{2}-\d{6}-\d{6}-\d{1}$/;
  var At = /^[\x00-\x7F]+$/;
  var $t = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
  var pt = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
  var St = /[^\x00-\x7F]/;
  var ht,
    gt,
    Et =
      ((gt = "i"),
      (ht = (ht = [
        "^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)",
        "(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))",
        "?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$",
      ]).join("")),
      new RegExp(ht, gt));
  var It = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;
  var Rt = { force_decimal: !1, decimal_digits: "1,", locale: "en-US" },
    vt = ["", "-", "+"];
  var Lt = /^(0x|0h)?[0-9A-F]+$/i;
  function mt(t) {
    return l(t), Lt.test(t);
  }
  var Zt = /^(0o)?[0-7]+$/i;
  var Mt = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
  var Bt =
      /^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/,
    Nt =
      /^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/,
    Ft = /^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)/,
    Dt = /^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)/;
  var Ct =
      /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(,(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}(,((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?))?\)$/i,
    Tt =
      /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(\s(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s?(\/\s((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s?)?\)$/i;
  var Gt = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;
  var Ot = {
    AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
    AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
    AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
    AT: /^(AT[0-9]{2})\d{16}$/,
    AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
    BA: /^(BA[0-9]{2})\d{16}$/,
    BE: /^(BE[0-9]{2})\d{12}$/,
    BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
    BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
    BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
    BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
    CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
    CR: /^(CR[0-9]{2})\d{18}$/,
    CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
    CZ: /^(CZ[0-9]{2})\d{20}$/,
    DE: /^(DE[0-9]{2})\d{18}$/,
    DK: /^(DK[0-9]{2})\d{14}$/,
    DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
    EE: /^(EE[0-9]{2})\d{16}$/,
    EG: /^(EG[0-9]{2})\d{25}$/,
    ES: /^(ES[0-9]{2})\d{20}$/,
    FI: /^(FI[0-9]{2})\d{14}$/,
    FO: /^(FO[0-9]{2})\d{14}$/,
    FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
    GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
    GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
    GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
    GL: /^(GL[0-9]{2})\d{14}$/,
    GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
    GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
    HR: /^(HR[0-9]{2})\d{17}$/,
    HU: /^(HU[0-9]{2})\d{24}$/,
    IE: /^(IE[0-9]{2})[A-Z0-9]{4}\d{14}$/,
    IL: /^(IL[0-9]{2})\d{19}$/,
    IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
    IR: /^(IR[0-9]{2})0\d{2}0\d{18}$/,
    IS: /^(IS[0-9]{2})\d{22}$/,
    IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
    JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
    KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
    KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
    LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
    LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
    LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
    LT: /^(LT[0-9]{2})\d{16}$/,
    LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
    LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
    MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
    MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
    ME: /^(ME[0-9]{2})\d{18}$/,
    MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
    MR: /^(MR[0-9]{2})\d{23}$/,
    MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
    MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
    MZ: /^(MZ[0-9]{2})\d{21}$/,
    NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
    NO: /^(NO[0-9]{2})\d{11}$/,
    PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
    PL: /^(PL[0-9]{2})\d{24}$/,
    PS: /^(PS[0-9]{2})[A-Z0-9]{4}\d{21}$/,
    PT: /^(PT[0-9]{2})\d{21}$/,
    QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
    RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
    RS: /^(RS[0-9]{2})\d{18}$/,
    SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
    SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
    SE: /^(SE[0-9]{2})\d{20}$/,
    SI: /^(SI[0-9]{2})\d{15}$/,
    SK: /^(SK[0-9]{2})\d{20}$/,
    SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
    SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
    TL: /^(TL[0-9]{2})\d{19}$/,
    TN: /^(TN[0-9]{2})\d{20}$/,
    TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
    UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
    VA: /^(VA[0-9]{2})\d{18}$/,
    VG: /^(VG[0-9]{2})[A-Z0-9]{4}\d{16}$/,
    XK: /^(XK[0-9]{2})\d{16}$/,
  };
  var _t = Object.keys(Ot),
    Ht = new Set([
      "AD",
      "AE",
      "AF",
      "AG",
      "AI",
      "AL",
      "AM",
      "AO",
      "AQ",
      "AR",
      "AS",
      "AT",
      "AU",
      "AW",
      "AX",
      "AZ",
      "BA",
      "BB",
      "BD",
      "BE",
      "BF",
      "BG",
      "BH",
      "BI",
      "BJ",
      "BL",
      "BM",
      "BN",
      "BO",
      "BQ",
      "BR",
      "BS",
      "BT",
      "BV",
      "BW",
      "BY",
      "BZ",
      "CA",
      "CC",
      "CD",
      "CF",
      "CG",
      "CH",
      "CI",
      "CK",
      "CL",
      "CM",
      "CN",
      "CO",
      "CR",
      "CU",
      "CV",
      "CW",
      "CX",
      "CY",
      "CZ",
      "DE",
      "DJ",
      "DK",
      "DM",
      "DO",
      "DZ",
      "EC",
      "EE",
      "EG",
      "EH",
      "ER",
      "ES",
      "ET",
      "FI",
      "FJ",
      "FK",
      "FM",
      "FO",
      "FR",
      "GA",
      "GB",
      "GD",
      "GE",
      "GF",
      "GG",
      "GH",
      "GI",
      "GL",
      "GM",
      "GN",
      "GP",
      "GQ",
      "GR",
      "GS",
      "GT",
      "GU",
      "GW",
      "GY",
      "HK",
      "HM",
      "HN",
      "HR",
      "HT",
      "HU",
      "ID",
      "IE",
      "IL",
      "IM",
      "IN",
      "IO",
      "IQ",
      "IR",
      "IS",
      "IT",
      "JE",
      "JM",
      "JO",
      "JP",
      "KE",
      "KG",
      "KH",
      "KI",
      "KM",
      "KN",
      "KP",
      "KR",
      "KW",
      "KY",
      "KZ",
      "LA",
      "LB",
      "LC",
      "LI",
      "LK",
      "LR",
      "LS",
      "LT",
      "LU",
      "LV",
      "LY",
      "MA",
      "MC",
      "MD",
      "ME",
      "MF",
      "MG",
      "MH",
      "MK",
      "ML",
      "MM",
      "MN",
      "MO",
      "MP",
      "MQ",
      "MR",
      "MS",
      "MT",
      "MU",
      "MV",
      "MW",
      "MX",
      "MY",
      "MZ",
      "NA",
      "NC",
      "NE",
      "NF",
      "NG",
      "NI",
      "NL",
      "NO",
      "NP",
      "NR",
      "NU",
      "NZ",
      "OM",
      "PA",
      "PE",
      "PF",
      "PG",
      "PH",
      "PK",
      "PL",
      "PM",
      "PN",
      "PR",
      "PS",
      "PT",
      "PW",
      "PY",
      "QA",
      "RE",
      "RO",
      "RS",
      "RU",
      "RW",
      "SA",
      "SB",
      "SC",
      "SD",
      "SE",
      "SG",
      "SH",
      "SI",
      "SJ",
      "SK",
      "SL",
      "SM",
      "SN",
      "SO",
      "SR",
      "SS",
      "ST",
      "SV",
      "SX",
      "SY",
      "SZ",
      "TC",
      "TD",
      "TF",
      "TG",
      "TH",
      "TJ",
      "TK",
      "TL",
      "TM",
      "TN",
      "TO",
      "TR",
      "TT",
      "TV",
      "TW",
      "TZ",
      "UA",
      "UG",
      "UM",
      "US",
      "UY",
      "UZ",
      "VA",
      "VC",
      "VE",
      "VG",
      "VI",
      "VN",
      "VU",
      "WF",
      "WS",
      "YE",
      "YT",
      "ZA",
      "ZM",
      "ZW",
    ]);
  var Pt = Ht,
    bt = /^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;
  var Ut = /^[a-f0-9]{32}$/;
  var Kt = {
    md5: 32,
    md4: 32,
    sha1: 40,
    sha256: 64,
    sha384: 96,
    sha512: 128,
    ripemd128: 32,
    ripemd160: 40,
    tiger128: 32,
    tiger160: 40,
    tiger192: 48,
    crc32: 8,
    crc32b: 8,
  };
  var wt = /[^A-Z0-9+\/=]/i,
    yt = /^[A-Z0-9_\-]*$/i,
    Wt = { urlSafe: !1 };
  function Yt(t, e) {
    l(t), (e = B(e, Wt));
    var r = t.length;
    if (e.urlSafe) return yt.test(t);
    if (r % 4 != 0 || wt.test(t)) return !1;
    e = t.indexOf("=");
    return -1 === e || e === r - 1 || (e === r - 2 && "=" === t[r - 1]);
  }
  var xt = { allow_primitives: !1 };
  var Vt = { ignore_whitespace: !1 };
  var kt = {
    1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  };
  var zt =
    /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14}|^(81[0-9]{14,17}))$/;
  var Xt = {
    PL: function (t) {
      l(t);
      var n = {
        1: 1,
        2: 3,
        3: 7,
        4: 9,
        5: 1,
        6: 3,
        7: 7,
        8: 9,
        9: 1,
        10: 3,
        11: 0,
      };
      if (null != t && 11 === t.length && ut(t, { allow_leading_zeroes: !0 })) {
        var e =
            t
              .split("")
              .slice(0, -1)
              .reduce(function (t, e, r) {
                return t + Number(e) * n[r + 1];
              }, 0) % 10,
          t = Number(t.charAt(t.length - 1));
        if ((0 == e && 0 === t) || t === 10 - e) return !0;
      }
      return !1;
    },
    ES: function (t) {
      l(t);
      var e = { X: 0, Y: 1, Z: 2 },
        r = t.trim().toUpperCase();
      if (!/^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(r)) return !1;
      t = r.slice(0, -1).replace(/[X,Y,Z]/g, function (t) {
        return e[t];
      });
      return r.endsWith(
        [
          "T",
          "R",
          "W",
          "A",
          "G",
          "M",
          "Y",
          "F",
          "P",
          "D",
          "X",
          "B",
          "N",
          "J",
          "Z",
          "S",
          "Q",
          "V",
          "H",
          "L",
          "C",
          "K",
          "E",
        ][t % 23]
      );
    },
    FI: function (t) {
      if ((l(t), 11 !== t.length)) return !1;
      if (!t.match(/^\d{6}[\-A\+]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]{1}$/))
        return !1;
      return (
        "0123456789ABCDEFHJKLMNPRSTUVWXY"[
          (1e3 * parseInt(t.slice(0, 6), 10) + parseInt(t.slice(7, 10), 10)) %
            31
        ] === t.slice(10, 11)
      );
    },
    IN: function (t) {
      var r = [
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
          [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
          [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
          [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
          [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
          [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
          [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
          [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
          [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
        ],
        n = [
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
          [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
          [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
          [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
          [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
          [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
          [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
        ],
        t = t.trim();
      if (!/^[1-9]\d{3}\s?\d{4}\s?\d{4}$/.test(t)) return !1;
      var i = 0;
      return (
        t
          .replace(/\s/g, "")
          .split("")
          .map(Number)
          .reverse()
          .forEach(function (t, e) {
            i = r[i][n[e % 8][t]];
          }),
        0 === i
      );
    },
    IR: function (t) {
      if (!t.match(/^\d{10}$/)) return !1;
      if (
        ((t = "0000".concat(t).substr(t.length - 6)),
        0 === parseInt(t.substr(3, 6), 10))
      )
        return !1;
      for (var e = parseInt(t.substr(9, 1), 10), r = 0, n = 0; n < 9; n++)
        r += parseInt(t.substr(n, 1), 10) * (10 - n);
      return ((r %= 11) < 2 && e === r) || (2 <= r && e === 11 - r);
    },
    IT: function (t) {
      return (
        9 === t.length &&
        "CA00000AA" !== t &&
        -1 < t.search(/C[A-Z][0-9]{5}[A-Z]{2}/i)
      );
    },
    NO: function (t) {
      var e = t.trim();
      if (isNaN(Number(e))) return !1;
      if (11 !== e.length) return !1;
      if ("00000000000" === e) return !1;
      var r = e.split("").map(Number),
        t =
          (11 -
            ((3 * r[0] +
              7 * r[1] +
              6 * r[2] +
              +r[3] +
              8 * r[4] +
              9 * r[5] +
              4 * r[6] +
              5 * r[7] +
              2 * r[8]) %
              11)) %
          11,
        e =
          (11 -
            ((5 * r[0] +
              4 * r[1] +
              3 * r[2] +
              2 * r[3] +
              7 * r[4] +
              6 * r[5] +
              5 * r[6] +
              4 * r[7] +
              3 * r[8] +
              2 * t) %
              11)) %
          11;
      return t === r[9] && e === r[10];
    },
    TH: function (t) {
      if (!t.match(/^[1-8]\d{12}$/)) return !1;
      for (var e = 0, r = 0; r < 12; r++) e += parseInt(t[r], 10) * (13 - r);
      return t[12] === ((11 - (e % 11)) % 10).toString();
    },
    LK: function (t) {
      return (
        !(10 !== t.length || !/^[1-9]\d{8}[vx]$/i.test(t)) ||
        !(12 !== t.length || !/^[1-9]\d{11}$/i.test(t))
      );
    },
    "he-IL": function (t) {
      t = t.trim();
      if (!/^\d{9}$/.test(t)) return !1;
      for (var e, r = t, n = 0, i = 0; i < r.length; i++)
        n += 9 < (e = Number(r[i]) * ((i % 2) + 1)) ? e - 9 : e;
      return n % 10 == 0;
    },
    "ar-LY": function (t) {
      t = t.trim();
      return !!/^(1|2)\d{11}$/.test(t);
    },
    "ar-TN": function (t) {
      t = t.trim();
      return !!/^\d{8}$/.test(t);
    },
    "zh-CN": function (t) {
      function n(t) {
        return r.includes(t);
      }
      function i(t) {
        var e = parseInt(t.substring(0, 4), 10),
          r = parseInt(t.substring(4, 6), 10),
          n = parseInt(t.substring(6), 10);
        return (
          !((t = new Date(e, r - 1, n)) > new Date()) &&
          t.getFullYear() === e &&
          t.getMonth() === r - 1 &&
          t.getDate() === n
        );
      }
      function a(t) {
        return (
          (function (t) {
            for (var e = t.substring(0, 17), r = 0, n = 0; n < 17; n++)
              r += parseInt(e.charAt(n), 10) * parseInt(o[n], 10);
            return s[r % 11];
          })(t) === t.charAt(17).toUpperCase()
        );
      }
      var e,
        r = [
          "11",
          "12",
          "13",
          "14",
          "15",
          "21",
          "22",
          "23",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "50",
          "51",
          "52",
          "53",
          "54",
          "61",
          "62",
          "63",
          "64",
          "65",
          "71",
          "81",
          "82",
          "91",
        ],
        o = [
          "7",
          "9",
          "10",
          "5",
          "8",
          "4",
          "2",
          "1",
          "6",
          "3",
          "7",
          "9",
          "10",
          "5",
          "8",
          "4",
          "2",
        ],
        s = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
      return (
        !!/^\d{15}|(\d{17}(\d|x|X))$/.test((e = t)) &&
        (15 === e.length
          ? function (t) {
              var e =
                /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(
                  t
                );
              if (!e) return !1;
              var r = t.substring(0, 2);
              if (!(e = n(r))) return !1;
              t = "19".concat(t.substring(6, 12));
              return !!(e = i(t));
            }
          : function (t) {
              var e =
                /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(
                  t
                );
              if (!e) return !1;
              var r = t.substring(0, 2);
              if (!(e = n(r))) return !1;
              r = t.substring(6, 14);
              return !!(e = i(r)) && a(t);
            })(e)
      );
    },
    "zh-TW": function (t) {
      var n = {
          A: 10,
          B: 11,
          C: 12,
          D: 13,
          E: 14,
          F: 15,
          G: 16,
          H: 17,
          I: 34,
          J: 18,
          K: 19,
          L: 20,
          M: 21,
          N: 22,
          O: 35,
          P: 23,
          Q: 24,
          R: 25,
          S: 26,
          T: 27,
          U: 28,
          V: 29,
          W: 32,
          X: 30,
          Y: 31,
          Z: 33,
        },
        t = t.trim().toUpperCase();
      return (
        !!/^[A-Z][0-9]{9}$/.test(t) &&
        Array.from(t).reduce(function (t, e, r) {
          if (0 !== r)
            return 9 === r
              ? (10 - (t % 10) - Number(e)) % 10 == 0
              : t + Number(e) * (9 - r);
          e = n[e];
          return (e % 10) * 9 + Math.floor(e / 10);
        }, 0)
      );
    },
  };
  var Jt = 8,
    jt = 14,
    Qt = /^(\d{8}|\d{13}|\d{14})$/;
  function qt(r) {
    var t =
      10 -
      (r
        .slice(0, -1)
        .split("")
        .map(function (t, e) {
          return (
            Number(t) *
            ((t = r.length),
            (e = e),
            t === Jt || t === jt ? (e % 2 == 0 ? 3 : 1) : e % 2 == 0 ? 1 : 3)
          );
        })
        .reduce(function (t, e) {
          return t + e;
        }, 0) %
        10);
    return t < 10 ? t : 0;
  }
  var te = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;
  var ee = /^(?:[0-9]{9}X|[0-9]{10})$/,
    re = /^(?:[0-9]{13})$/,
    ne = [1, 3];
  function ie(t) {
    for (var e = 10, r = 0; r < t.length - 1; r++)
      e =
        (parseInt(t[r], 10) + e) % 10 == 0
          ? 9
          : (((parseInt(t[r], 10) + e) % 10) * 2) % 11;
    return (e = 1 === e ? 0 : 11 - e) === parseInt(t[10], 10);
  }
  function ae(t) {
    for (var e, r = 0, n = !1, i = t.length - 1; 0 <= i; i--)
      (r += n
        ? 9 < (e = 2 * parseInt(t[i], 10))
          ? e
              .toString()
              .split("")
              .map(function (t) {
                return parseInt(t, 10);
              })
              .reduce(function (t, e) {
                return t + e;
              }, 0)
          : e
        : parseInt(t[i], 10)),
        (n = !n);
    return r % 10 == 0;
  }
  function oe(t, e) {
    for (var r = 0, n = 0; n < t.length; n++) r += t[n] * (e - n);
    return r;
  }
  var se = {
    andover: ["10", "12"],
    atlanta: ["60", "67"],
    austin: ["50", "53"],
    brookhaven: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "11",
      "13",
      "14",
      "16",
      "21",
      "22",
      "23",
      "25",
      "34",
      "51",
      "52",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
      "65",
    ],
    cincinnati: ["30", "32", "35", "36", "37", "38", "61"],
    fresno: ["15", "24"],
    internet: ["20", "26", "27", "45", "46", "47"],
    kansas: ["40", "44"],
    memphis: ["94", "95"],
    ogden: ["80", "90"],
    philadelphia: [
      "33",
      "39",
      "41",
      "42",
      "43",
      "46",
      "48",
      "62",
      "63",
      "64",
      "66",
      "68",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77",
      "81",
      "82",
      "83",
      "84",
      "85",
      "86",
      "87",
      "88",
      "91",
      "92",
      "93",
      "98",
      "99",
    ],
    sba: ["31"],
  };
  function ce(t) {
    for (var e = !1, r = !1, n = 0; n < 3; n++)
      if (!e && /[AEIOU]/.test(t[n])) e = !0;
      else if (!r && e && "X" === t[n]) r = !0;
      else if (0 < n) {
        if (e && !r && !/[AEIOU]/.test(t[n])) return;
        if (r && !/X/.test(t[n])) return;
      }
    return 1;
  }
  var le = {
    "bg-BG": /^\d{10}$/,
    "cs-CZ": /^\d{6}\/{0,1}\d{3,4}$/,
    "de-AT": /^\d{9}$/,
    "de-DE": /^[1-9]\d{10}$/,
    "dk-DK": /^\d{6}-{0,1}\d{4}$/,
    "el-CY": /^[09]\d{7}[A-Z]$/,
    "el-GR": /^([0-4]|[7-9])\d{8}$/,
    "en-GB":
      /^\d{10}$|^(?!GB|NK|TN|ZZ)(?![DFIQUV])[A-Z](?![DFIQUVO])[A-Z]\d{6}[ABCD ]$/i,
    "en-IE": /^\d{7}[A-W][A-IW]{0,1}$/i,
    "en-US": /^\d{2}[- ]{0,1}\d{7}$/,
    "es-ES": /^(\d{0,8}|[XYZKLM]\d{7})[A-HJ-NP-TV-Z]$/i,
    "et-EE": /^[1-6]\d{6}(00[1-9]|0[1-9][0-9]|[1-6][0-9]{2}|70[0-9]|710)\d$/,
    "fi-FI": /^\d{6}[-+A]\d{3}[0-9A-FHJ-NPR-Y]$/i,
    "fr-BE": /^\d{11}$/,
    "fr-FR": /^[0-3]\d{12}$|^[0-3]\d\s\d{2}(\s\d{3}){3}$/,
    "fr-LU": /^\d{13}$/,
    "hr-HR": /^\d{11}$/,
    "hu-HU": /^8\d{9}$/,
    "it-IT":
      /^[A-Z]{6}[L-NP-V0-9]{2}[A-EHLMPRST][L-NP-V0-9]{2}[A-ILMZ][L-NP-V0-9]{3}[A-Z]$/i,
    "lv-LV": /^\d{6}-{0,1}\d{5}$/,
    "mt-MT": /^\d{3,7}[APMGLHBZ]$|^([1-8])\1\d{7}$/i,
    "nl-NL": /^\d{9}$/,
    "pl-PL": /^\d{10,11}$/,
    "pt-BR": /(?:^\d{11}$)|(?:^\d{14}$)/,
    "pt-PT": /^\d{9}$/,
    "ro-RO": /^\d{13}$/,
    "sk-SK": /^\d{6}\/{0,1}\d{3,4}$/,
    "sl-SI": /^[1-9]\d{7}$/,
    "sv-SE": /^(\d{6}[-+]{0,1}\d{4}|(18|19|20)\d{6}[-+]{0,1}\d{4})$/,
  };
  (le["lb-LU"] = le["fr-LU"]),
    (le["lt-LT"] = le["et-EE"]),
    (le["nl-BE"] = le["fr-BE"]);
  var ue = {
    "bg-BG": function (t) {
      var e = t.slice(0, 2),
        r = parseInt(t.slice(2, 4), 10),
        e =
          40 < r
            ? ((r -= 40), "20".concat(e))
            : 20 < r
            ? ((r -= 20), "18".concat(e))
            : "19".concat(e);
      if (
        (r < 10 && (r = "0".concat(r)),
        !q(
          "".concat(e, "/").concat(r, "/").concat(t.slice(4, 6)),
          "YYYY/MM/DD"
        ))
      )
        return !1;
      for (
        var n = t.split("").map(function (t) {
            return parseInt(t, 10);
          }),
          i = [2, 4, 8, 5, 10, 9, 7, 3, 6],
          a = 0,
          o = 0;
        o < i.length;
        o++
      )
        a += n[o] * i[o];
      return (a = a % 11 == 10 ? 0 : a % 11) === n[9];
    },
    "cs-CZ": function (t) {
      t = t.replace(/\W/, "");
      var e = parseInt(t.slice(0, 2), 10);
      if (10 === t.length) e = (e < 54 ? "20" : "19").concat(e);
      else {
        if ("000" === t.slice(6)) return !1;
        if (!(e < 54)) return !1;
        e = "19".concat(e);
      }
      3 === e.length && (e = [e.slice(0, 2), "0", e.slice(2)].join(""));
      var r = parseInt(t.slice(2, 4), 10);
      if ((50 < r && (r -= 50), 20 < r)) {
        if (parseInt(e, 10) < 2004) return !1;
        r -= 20;
      }
      if (
        (r < 10 && (r = "0".concat(r)),
        !q(
          "".concat(e, "/").concat(r, "/").concat(t.slice(4, 6)),
          "YYYY/MM/DD"
        ))
      )
        return !1;
      if (10 === t.length && parseInt(t, 10) % 11 != 0) {
        r = parseInt(t.slice(0, 9), 10) % 11;
        if (!(parseInt(e, 10) < 1986 && 10 == r)) return !1;
        if (0 !== parseInt(t.slice(9), 10)) return !1;
      }
      return !0;
    },
    "de-AT": ae,
    "de-DE": function (t) {
      for (
        var e = t.split("").map(function (t) {
            return parseInt(t, 10);
          }),
          r = [],
          n = 0;
        n < e.length - 1;
        n++
      ) {
        r.push("");
        for (var i = 0; i < e.length - 1; i++) e[n] === e[i] && (r[n] += i);
      }
      if (
        2 !==
          (r = r.filter(function (t) {
            return 1 < t.length;
          })).length &&
        3 !== r.length
      )
        return !1;
      if (3 === r[0].length) {
        for (
          var a = r[0].split("").map(function (t) {
              return parseInt(t, 10);
            }),
            o = 0,
            s = 0;
          s < a.length - 1;
          s++
        )
          a[s] + 1 === a[s + 1] && (o += 1);
        if (2 === o) return !1;
      }
      return ie(t);
    },
    "dk-DK": function (t) {
      t = t.replace(/\W/, "");
      var e = parseInt(t.slice(4, 6), 10);
      switch (t.slice(6, 7)) {
        case "0":
        case "1":
        case "2":
        case "3":
          e = "19".concat(e);
          break;
        case "4":
        case "9":
          e = (e < 37 ? "20" : "19").concat(e);
          break;
        default:
          if (e < 37) e = "20".concat(e);
          else {
            if (!(58 < e)) return !1;
            e = "18".concat(e);
          }
      }
      if (
        (3 === e.length && (e = [e.slice(0, 2), "0", e.slice(2)].join("")),
        !q(
          "".concat(e, "/").concat(t.slice(2, 4), "/").concat(t.slice(0, 2)),
          "YYYY/MM/DD"
        ))
      )
        return !1;
      for (
        var r = t.split("").map(function (t) {
            return parseInt(t, 10);
          }),
          n = 0,
          i = 4,
          a = 0;
        a < 9;
        a++
      )
        (n += r[a] * i), 1 === --i && (i = 7);
      return 1 != (n %= 11) && (0 === n ? 0 === r[9] : r[9] === 11 - n);
    },
    "el-CY": function (t) {
      for (
        var e = t
            .slice(0, 8)
            .split("")
            .map(function (t) {
              return parseInt(t, 10);
            }),
          r = 0,
          n = 1;
        n < e.length;
        n += 2
      )
        r += e[n];
      for (var i = 0; i < e.length; i += 2)
        e[i] < 2
          ? (r += 1 - e[i])
          : ((r += 2 * (e[i] - 2) + 5), 4 < e[i] && (r += 2));
      return String.fromCharCode((r % 26) + 65) === t.charAt(8);
    },
    "el-GR": function (t) {
      for (
        var e = t.split("").map(function (t) {
            return parseInt(t, 10);
          }),
          r = 0,
          n = 0;
        n < 8;
        n++
      )
        r += e[n] * Math.pow(2, 8 - n);
      return (r % 11) % 10 === e[8];
    },
    "en-IE": function (t) {
      var e = oe(
        t
          .split("")
          .slice(0, 7)
          .map(function (t) {
            return parseInt(t, 10);
          }),
        8
      );
      return (
        9 === t.length && "W" !== t[8] && (e += 9 * (t[8].charCodeAt(0) - 64)),
        0 === (e %= 23)
          ? "W" === t[7].toUpperCase()
          : t[7].toUpperCase() === String.fromCharCode(64 + e)
      );
    },
    "en-US": function (t) {
      return (
        -1 !==
        (function () {
          var t,
            e = [];
          for (t in se) se.hasOwnProperty(t) && e.push.apply(e, r(se[t]));
          return e;
        })().indexOf(t.substr(0, 2))
      );
    },
    "es-ES": function (t) {
      var e = t.toUpperCase().split("");
      if (isNaN(parseInt(e[0], 10)) && 1 < e.length) {
        var r = 0;
        switch (e[0]) {
          case "Y":
            r = 1;
            break;
          case "Z":
            r = 2;
        }
        e.splice(0, 1, r);
      } else for (; e.length < 9; ) e.unshift(0);
      return (
        (e = e.join("")),
        (t = parseInt(e.slice(0, 8), 10) % 23),
        e[8] ===
          [
            "T",
            "R",
            "W",
            "A",
            "G",
            "M",
            "Y",
            "F",
            "P",
            "D",
            "X",
            "B",
            "N",
            "J",
            "Z",
            "S",
            "Q",
            "V",
            "H",
            "L",
            "C",
            "K",
            "E",
          ][t]
      );
    },
    "et-EE": function (t) {
      var e = t.slice(1, 3);
      switch (t.slice(0, 1)) {
        case "1":
        case "2":
          e = "18".concat(e);
          break;
        case "3":
        case "4":
          e = "19".concat(e);
          break;
        default:
          e = "20".concat(e);
      }
      if (
        !q(
          "".concat(e, "/").concat(t.slice(3, 5), "/").concat(t.slice(5, 7)),
          "YYYY/MM/DD"
        )
      )
        return !1;
      for (
        var r = t.split("").map(function (t) {
            return parseInt(t, 10);
          }),
          n = 0,
          i = 1,
          a = 0;
        a < 10;
        a++
      )
        (n += r[a] * i), 10 === (i += 1) && (i = 1);
      if (n % 11 == 10) {
        for (var n = 0, i = 3, o = 0; o < 10; o++)
          (n += r[o] * i), 10 === (i += 1) && (i = 1);
        if (n % 11 == 10) return 0 === r[10];
      }
      return n % 11 === r[10];
    },
    "fi-FI": function (t) {
      var e = t.slice(4, 6);
      switch (t.slice(6, 7)) {
        case "+":
          e = "18".concat(e);
          break;
        case "-":
          e = "19".concat(e);
          break;
        default:
          e = "20".concat(e);
      }
      if (
        !q(
          "".concat(e, "/").concat(t.slice(2, 4), "/").concat(t.slice(0, 2)),
          "YYYY/MM/DD"
        )
      )
        return !1;
      var r = parseInt(t.slice(0, 6) + t.slice(7, 10), 10) % 31;
      return r < 10
        ? r === parseInt(t.slice(10), 10)
        : [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "H",
            "J",
            "K",
            "L",
            "M",
            "N",
            "P",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
          ][(r -= 10)] === t.slice(10);
    },
    "fr-BE": function (t) {
      if (
        ("00" !== t.slice(2, 4) || "00" !== t.slice(4, 6)) &&
        !q(
          ""
            .concat(t.slice(0, 2), "/")
            .concat(t.slice(2, 4), "/")
            .concat(t.slice(4, 6)),
          "YY/MM/DD"
        )
      )
        return !1;
      var e = 97 - (parseInt(t.slice(0, 9), 10) % 97),
        r = parseInt(t.slice(9, 11), 10);
      return (
        e === r || 97 - (parseInt("2".concat(t.slice(0, 9)), 10) % 97) === r
      );
    },
    "fr-FR": function (t) {
      return (
        (t = t.replace(/\s/g, "")),
        parseInt(t.slice(0, 10), 10) % 511 === parseInt(t.slice(10, 13), 10)
      );
    },
    "fr-LU": function (t) {
      return (
        !!q(
          ""
            .concat(t.slice(0, 4), "/")
            .concat(t.slice(4, 6), "/")
            .concat(t.slice(6, 8)),
          "YYYY/MM/DD"
        ) &&
        !!ae(t.slice(0, 12)) &&
        (function (t) {
          for (
            var e = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
                [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
                [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
                [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
                [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
                [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
                [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
                [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
                [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
              ],
              r = [
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
                [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
                [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
                [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
                [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
                [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
                [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
              ],
              n = t.split("").reverse().join(""),
              i = 0,
              a = 0;
            a < n.length;
            a++
          )
            i = e[i][r[a % 8][parseInt(n[a], 10)]];
          return 0 === i;
        })("".concat(t.slice(0, 11)).concat(t[12]))
      );
    },
    "hr-HR": ie,
    "hu-HU": function (t) {
      for (
        var e = t.split("").map(function (t) {
            return parseInt(t, 10);
          }),
          r = 8,
          n = 1;
        n < 9;
        n++
      )
        r += e[n] * (n + 1);
      return r % 11 === e[9];
    },
    "it-IT": function (t) {
      var e = t.toUpperCase().split("");
      if (!ce(e.slice(0, 3))) return !1;
      if (!ce(e.slice(3, 6))) return !1;
      for (
        var r = {
            L: "0",
            M: "1",
            N: "2",
            P: "3",
            Q: "4",
            R: "5",
            S: "6",
            T: "7",
            U: "8",
            V: "9",
          },
          n = 0,
          i = [6, 7, 9, 10, 12, 13, 14];
        n < i.length;
        n++
      ) {
        var a = i[n];
        e[a] in r && e.splice(a, 1, r[e[a]]);
      }
      var o = {
        A: "01",
        B: "02",
        C: "03",
        D: "04",
        E: "05",
        H: "06",
        L: "07",
        M: "08",
        P: "09",
        R: "10",
        S: "11",
        T: "12",
      }[e[8]];
      if (
        (40 < (t = parseInt(e[9] + e[10], 10)) && (t -= 40),
        t < 10 && (t = "0".concat(t)),
        !q(
          "".concat(e[6]).concat(e[7], "/").concat(o, "/").concat(t),
          "YY/MM/DD"
        ))
      )
        return !1;
      for (var s = 0, c = 1; c < e.length - 1; c += 2) {
        var l = parseInt(e[c], 10);
        s += l = isNaN(l) ? e[c].charCodeAt(0) - 65 : l;
      }
      for (
        var u = {
            A: 1,
            B: 0,
            C: 5,
            D: 7,
            E: 9,
            F: 13,
            G: 15,
            H: 17,
            I: 19,
            J: 21,
            K: 2,
            L: 4,
            M: 18,
            N: 20,
            O: 11,
            P: 3,
            Q: 6,
            R: 8,
            S: 12,
            T: 14,
            U: 16,
            V: 10,
            W: 22,
            X: 25,
            Y: 24,
            Z: 23,
            0: 1,
            1: 0,
          },
          d = 0;
        d < e.length - 1;
        d += 2
      ) {
        var f,
          A = 0;
        e[d] in u
          ? (A = u[e[d]])
          : ((A = 2 * (f = parseInt(e[d], 10)) + 1), 4 < f && (A += 2)),
          (s += A);
      }
      return String.fromCharCode(65 + (s % 26)) === e[15];
    },
    "lv-LV": function (t) {
      var e = (t = t.replace(/\W/, "")).slice(0, 2);
      if ("32" === e) return !0;
      if ("00" !== t.slice(2, 4)) {
        var r = t.slice(4, 6);
        switch (t[6]) {
          case "0":
            r = "18".concat(r);
            break;
          case "1":
            r = "19".concat(r);
            break;
          default:
            r = "20".concat(r);
        }
        if (
          !q(
            "".concat(r, "/").concat(t.slice(2, 4), "/").concat(e),
            "YYYY/MM/DD"
          )
        )
          return !1;
      }
      for (
        var n = 1101, i = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2], a = 0;
        a < t.length - 1;
        a++
      )
        n -= parseInt(t[a], 10) * i[a];
      return parseInt(t[10], 10) === n % 11;
    },
    "mt-MT": function (t) {
      if (9 !== t.length) {
        for (var e = t.toUpperCase().split(""); e.length < 8; ) e.unshift(0);
        switch (t[7]) {
          case "A":
          case "P":
            if (0 === parseInt(e[6], 10)) return !1;
            break;
          default:
            var r = parseInt(e.join("").slice(0, 5), 10);
            if (32e3 < r) return !1;
            if (r === parseInt(e.join("").slice(5, 7), 10)) return !1;
        }
      }
      return !0;
    },
    "nl-NL": function (t) {
      return (
        oe(
          t
            .split("")
            .slice(0, 8)
            .map(function (t) {
              return parseInt(t, 10);
            }),
          9
        ) %
          11 ===
        parseInt(t[8], 10)
      );
    },
    "pl-PL": function (t) {
      if (10 === t.length) {
        for (
          var e = [6, 5, 7, 2, 3, 4, 5, 6, 7], r = 0, n = 0;
          n < e.length;
          n++
        )
          r += parseInt(t[n], 10) * e[n];
        return 10 === (r %= 11) ? !1 : r === parseInt(t[9], 10);
      }
      var i = t.slice(0, 2),
        a = parseInt(t.slice(2, 4), 10);
      if (
        (80 < a
          ? ((i = "18".concat(i)), (a -= 80))
          : 60 < a
          ? ((i = "22".concat(i)), (a -= 60))
          : 40 < a
          ? ((i = "21".concat(i)), (a -= 40))
          : 20 < a
          ? ((i = "20".concat(i)), (a -= 20))
          : (i = "19".concat(i)),
        a < 10 && (a = "0".concat(a)),
        !q(
          "".concat(i, "/").concat(a, "/").concat(t.slice(4, 6)),
          "YYYY/MM/DD"
        ))
      )
        return !1;
      for (var o = 0, s = 1, c = 0; c < t.length - 1; c++)
        (o += (parseInt(t[c], 10) * s) % 10),
          10 < (s += 2) ? (s = 1) : 5 === s && (s += 2);
      return (o = 10 - (o % 10)) === parseInt(t[10], 10);
    },
    "pt-BR": function (t) {
      if (11 === t.length) {
        var e = 0;
        if (
          "11111111111" === t ||
          "22222222222" === t ||
          "33333333333" === t ||
          "44444444444" === t ||
          "55555555555" === t ||
          "66666666666" === t ||
          "77777777777" === t ||
          "88888888888" === t ||
          "99999999999" === t ||
          "00000000000" === t
        )
          return !1;
        for (var r = 1; r <= 9; r++)
          e += parseInt(t.substring(r - 1, r), 10) * (11 - r);
        if (
          (u = 10 === (u = (10 * e) % 11) ? 0 : u) !==
          parseInt(t.substring(9, 10), 10)
        )
          return !1;
        e = 0;
        for (var n = 1; n <= 10; n++)
          e += parseInt(t.substring(n - 1, n), 10) * (12 - n);
        return (u = 10 === (u = (10 * e) % 11) ? 0 : u) !==
          parseInt(t.substring(10, 11), 10)
          ? !1
          : !0;
      }
      if (
        "00000000000000" === t ||
        "11111111111111" === t ||
        "22222222222222" === t ||
        "33333333333333" === t ||
        "44444444444444" === t ||
        "55555555555555" === t ||
        "66666666666666" === t ||
        "77777777777777" === t ||
        "88888888888888" === t ||
        "99999999999999" === t
      )
        return !1;
      for (
        var i = t.length - 2,
          a = t.substring(0, i),
          o = t.substring(i),
          s = 0,
          c = i - 7,
          l = i;
        1 <= l;
        l--
      )
        (s += a.charAt(i - l) * c), --c < 2 && (c = 9);
      var u = s % 11 < 2 ? 0 : 11 - (s % 11);
      if (u !== parseInt(o.charAt(0), 10)) return !1;
      for (
        var a = t.substring(0, (i += 1)), s = 0, c = i - 7, d = i;
        1 <= d;
        d--
      )
        (s += a.charAt(i - d) * c), --c < 2 && (c = 9);
      return (u = s % 11 < 2 ? 0 : 11 - (s % 11)) === parseInt(o.charAt(1), 10);
    },
    "pt-PT": function (t) {
      var e =
        11 -
        (oe(
          t
            .split("")
            .slice(0, 8)
            .map(function (t) {
              return parseInt(t, 10);
            }),
          9
        ) %
          11);
      return 9 < e ? 0 === parseInt(t[8], 10) : e === parseInt(t[8], 10);
    },
    "ro-RO": function (t) {
      if ("9000" === t.slice(0, 4)) return !0;
      var e = t.slice(1, 3);
      switch (t[0]) {
        case "1":
        case "2":
          e = "19".concat(e);
          break;
        case "3":
        case "4":
          e = "18".concat(e);
          break;
        case "5":
        case "6":
          e = "20".concat(e);
      }
      var r = ""
        .concat(e, "/")
        .concat(t.slice(3, 5), "/")
        .concat(t.slice(5, 7));
      if (8 === r.length) {
        if (!q(r, "YY/MM/DD")) return !1;
      } else if (!q(r, "YYYY/MM/DD")) return !1;
      for (
        var n = t.split("").map(function (t) {
            return parseInt(t, 10);
          }),
          i = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9],
          a = 0,
          o = 0;
        o < i.length;
        o++
      )
        a += n[o] * i[o];
      return a % 11 == 10 ? 1 === n[12] : n[12] === a % 11;
    },
    "sk-SK": function (t) {
      if (9 === t.length) {
        if ("000" === (t = t.replace(/\W/, "")).slice(6)) return !1;
        if (53 < (e = parseInt(t.slice(0, 2), 10))) return !1;
        var e = (e < 10 ? "190" : "19").concat(e),
          r = parseInt(t.slice(2, 4), 10);
        if (
          (50 < r && (r -= 50),
          r < 10 && (r = "0".concat(r)),
          !q(
            "".concat(e, "/").concat(r, "/").concat(t.slice(4, 6)),
            "YYYY/MM/DD"
          ))
        )
          return !1;
      }
      return !0;
    },
    "sl-SI": function (t) {
      var e =
        11 -
        (oe(
          t
            .split("")
            .slice(0, 7)
            .map(function (t) {
              return parseInt(t, 10);
            }),
          8
        ) %
          11);
      return 10 == e ? 0 === parseInt(t[7], 10) : e === parseInt(t[7], 10);
    },
    "sv-SE": function (t) {
      var e = t.slice(0),
        r = "",
        n = (e = 11 < t.length ? e.slice(2) : e).slice(2, 4),
        i = parseInt(e.slice(4, 6), 10);
      if (11 < t.length) r = t.slice(0, 4);
      else if (((r = t.slice(0, 2)), 11 === t.length && i < 60)) {
        var a = new Date().getFullYear().toString(),
          e = parseInt(a.slice(0, 2), 10),
          a = parseInt(a, 10);
        if ("-" === t[6])
          r = (
            parseInt("".concat(e).concat(r), 10) > a
              ? "".concat(e - 1)
              : "".concat(e)
          ).concat(r);
        else if (((r = "".concat(e - 1).concat(r)), a - parseInt(r, 10) < 100))
          return !1;
      }
      if (
        (60 < i && (i -= 60),
        i < 10 && (i = "0".concat(i)),
        8 === (i = "".concat(r, "/").concat(n, "/").concat(i)).length)
      ) {
        if (!q(i, "YY/MM/DD")) return !1;
      } else if (!q(i, "YYYY/MM/DD")) return !1;
      return ae(t.replace(/\W/, ""));
    },
  };
  (ue["lb-LU"] = ue["fr-LU"]),
    (ue["lt-LT"] = ue["et-EE"]),
    (ue["nl-BE"] = ue["fr-BE"]);
  var de = /[-\\\/!@#$%\^&\*\(\)\+\=\[\]]+/g,
    fe = { "de-AT": de, "de-DE": /[\/\\]/g, "fr-BE": de };
  fe["nl-BE"] = fe["fr-BE"];
  var Ae = {
    "am-AM": /^(\+?374|0)((10|[9|7][0-9])\d{6}$|[2-4]\d{7}$)/,
    "ar-AE": /^((\+?971)|0)?5[024568]\d{7}$/,
    "ar-BH": /^(\+?973)?(3|6)\d{7}$/,
    "ar-DZ": /^(\+?213|0)(5|6|7)\d{8}$/,
    "ar-LB": /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
    "ar-EG": /^((\+?20)|0)?1[0125]\d{8}$/,
    "ar-IQ": /^(\+?964|0)?7[0-9]\d{8}$/,
    "ar-JO": /^(\+?962|0)?7[789]\d{7}$/,
    "ar-KW": /^(\+?965)[569]\d{7}$/,
    "ar-LY": /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
    "ar-MA": /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
    "ar-OM": /^((\+|00)968)?(9[1-9])\d{6}$/,
    "ar-PS": /^(\+?970|0)5[6|9](\d{7})$/,
    "ar-SA": /^(!?(\+?966)|0)?5\d{8}$/,
    "ar-SY": /^(!?(\+?963)|0)?9\d{8}$/,
    "ar-TN": /^(\+?216)?[2459]\d{7}$/,
    "az-AZ": /^(\+994|0)(5[015]|7[07]|99)\d{7}$/,
    "bs-BA": /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
    "be-BY": /^(\+?375)?(24|25|29|33|44)\d{7}$/,
    "bg-BG": /^(\+?359|0)?8[789]\d{7}$/,
    "bn-BD": /^(\+?880|0)1[13456789][0-9]{8}$/,
    "ca-AD": /^(\+376)?[346]\d{5}$/,
    "cs-CZ": /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
    "da-DK": /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
    "de-DE":
      /^((\+49|0)[1|3])([0|5][0-45-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
    "de-AT": /^(\+43|0)\d{1,4}\d{3,12}$/,
    "de-CH": /^(\+41|0)([1-9])\d{1,9}$/,
    "de-LU": /^(\+352)?((6\d1)\d{6})$/,
    "dv-MV": /^(\+?960)?(7[2-9]|91|9[3-9])\d{7}$/,
    "el-GR": /^(\+?30|0)?(69\d{8})$/,
    "en-AU": /^(\+?61|0)4\d{8}$/,
    "en-BM": /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}))/,
    "en-GB": /^(\+?44|0)7\d{9}$/,
    "en-GG": /^(\+?44|0)1481\d{6}$/,
    "en-GH": /^(\+233|0)(20|50|24|54|27|57|26|56|23|28|55|59)\d{7}$/,
    "en-GY": /^(\+592|0)6\d{6}$/,
    "en-HK": /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
    "en-MO": /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
    "en-IE": /^(\+?353|0)8[356789]\d{7}$/,
    "en-IN": /^(\+?91|0)?[6789]\d{9}$/,
    "en-KE": /^(\+?254|0)(7|1)\d{8}$/,
    "en-KI": /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
    "en-MT": /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
    "en-MU": /^(\+?230|0)?\d{8}$/,
    "en-NA": /^(\+?264|0)(6|8)\d{7}$/,
    "en-NG": /^(\+?234|0)?[789]\d{9}$/,
    "en-NZ": /^(\+?64|0)[28]\d{7,9}$/,
    "en-PK": /^((00|\+)?92|0)3[0-6]\d{8}$/,
    "en-PH": /^(09|\+639)\d{9}$/,
    "en-RW": /^(\+?250|0)?[7]\d{8}$/,
    "en-SG": /^(\+65)?[3689]\d{7}$/,
    "en-SL": /^(\+?232|0)\d{8}$/,
    "en-TZ": /^(\+?255|0)?[67]\d{8}$/,
    "en-UG": /^(\+?256|0)?[7]\d{8}$/,
    "en-US":
      /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
    "en-ZA": /^(\+?27|0)\d{9}$/,
    "en-ZM": /^(\+?26)?09[567]\d{7}$/,
    "en-ZW": /^(\+263)[0-9]{9}$/,
    "en-BW": /^(\+?267)?(7[1-8]{1})\d{6}$/,
    "es-AR": /^\+?549(11|[2368]\d)\d{8}$/,
    "es-BO": /^(\+?591)?(6|7)\d{7}$/,
    "es-CO": /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
    "es-CL": /^(\+?56|0)[2-9]\d{1}\d{7}$/,
    "es-CR": /^(\+506)?[2-8]\d{7}$/,
    "es-CU": /^(\+53|0053)?5\d{7}/,
    "es-DO": /^(\+?1)?8[024]9\d{7}$/,
    "es-HN": /^(\+?504)?[9|8]\d{7}$/,
    "es-EC": /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
    "es-ES": /^(\+?34)?[6|7]\d{8}$/,
    "es-PE": /^(\+?51)?9\d{8}$/,
    "es-MX": /^(\+?52)?(1|01)?\d{10,11}$/,
    "es-PA": /^(\+?507)\d{7,8}$/,
    "es-PY": /^(\+?595|0)9[9876]\d{7}$/,
    "es-SV": /^(\+?503)?[67]\d{7}$/,
    "es-UY": /^(\+598|0)9[1-9][\d]{6}$/,
    "es-VE": /^(\+?58)?(2|4)\d{9}$/,
    "et-EE": /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
    "fa-IR": /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
    "fi-FI": /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
    "fj-FJ": /^(\+?679)?\s?\d{3}\s?\d{4}$/,
    "fo-FO": /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
    "fr-BF": /^(\+226|0)[67]\d{7}$/,
    "fr-CM": /^(\+?237)6[0-9]{8}$/,
    "fr-FR": /^(\+?33|0)[67]\d{8}$/,
    "fr-GF": /^(\+?594|0|00594)[67]\d{8}$/,
    "fr-GP": /^(\+?590|0|00590)[67]\d{8}$/,
    "fr-MQ": /^(\+?596|0|00596)[67]\d{8}$/,
    "fr-PF": /^(\+?689)?8[789]\d{6}$/,
    "fr-RE": /^(\+?262|0|00262)[67]\d{8}$/,
    "he-IL": /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
    "hu-HU": /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
    "id-ID":
      /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
    "it-IT": /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
    "it-SM": /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
    "ja-JP": /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
    "ka-GE": /^(\+?995)?(5|79)\d{7}$/,
    "kk-KZ": /^(\+?7|8)?7\d{9}$/,
    "kl-GL": /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
    "ko-KR": /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
    "lt-LT": /^(\+370|8)\d{8}$/,
    "lv-LV": /^(\+?371)2\d{7}$/,
    "ms-MY":
      /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
    "mz-MZ": /^(\+?258)?8[234567]\d{7}$/,
    "nb-NO": /^(\+?47)?[49]\d{7}$/,
    "ne-NP": /^(\+?977)?9[78]\d{8}$/,
    "nl-BE": /^(\+?32|0)4\d{8}$/,
    "nl-NL": /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
    "nn-NO": /^(\+?47)?[49]\d{7}$/,
    "pl-PL": /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
    "pt-BR":
      /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[2-9]{1}\d{3}\-?\d{4}))$/,
    "pt-PT": /^(\+?351)?9[1236]\d{7}$/,
    "pt-AO": /^(\+244)\d{9}$/,
    "ro-RO": /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
    "ru-RU": /^(\+?7|8)?9\d{9}$/,
    "si-LK": /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
    "sl-SI":
      /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
    "sk-SK": /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
    "sq-AL": /^(\+355|0)6[789]\d{6}$/,
    "sr-RS": /^(\+3816|06)[- \d]{5,9}$/,
    "sv-SE": /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
    "tg-TJ": /^(\+?992)?[5][5]\d{7}$/,
    "th-TH": /^(\+66|66|0)\d{9}$/,
    "tr-TR": /^(\+?90|0)?5\d{9}$/,
    "tk-TM": /^(\+993|993|8)\d{8}$/,
    "uk-UA": /^(\+?38|8)?0\d{9}$/,
    "uz-UZ": /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
    "vi-VN":
      /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
    "zh-CN": /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
    "zh-TW": /^(\+?886\-?|0)?9\d{8}$/,
    "dz-BT": /^(\+?975|0)?(17|16|77|02)\d{6}$/,
  };
  (Ae["en-CA"] = Ae["en-US"]),
    (Ae["fr-CA"] = Ae["en-CA"]),
    (Ae["fr-BE"] = Ae["nl-BE"]),
    (Ae["zh-HK"] = Ae["en-HK"]),
    (Ae["zh-MO"] = Ae["en-MO"]),
    (Ae["ga-IE"] = Ae["en-IE"]),
    (Ae["fr-CH"] = Ae["de-CH"]),
    (Ae["it-CH"] = Ae["fr-CH"]);
  var T = Object.keys(Ae),
    $e = /^(0x)[0-9a-f]{40}$/i;
  var pe = {
    symbol: "$",
    require_symbol: !1,
    allow_space_after_symbol: !1,
    symbol_after_digits: !1,
    allow_negatives: !0,
    parens_for_negatives: !1,
    negative_sign_before_digits: !1,
    negative_sign_after_digits: !1,
    allow_negative_sign_placeholder: !1,
    thousands_separator: ",",
    decimal_separator: ".",
    allow_decimal: !0,
    require_decimal: !1,
    digits_after_decimal: [2],
    allow_space_after_digits: !1,
  };
  var Se = /^(bc1)[a-z0-9]{25,39}$/,
    he = /^(1|3)[A-HJ-NP-Za-km-z1-9]{25,39}$/;
  var ge =
      /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/,
    Ee =
      /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
  var G = /([01][0-9]|2[0-3])/,
    _ = /[0-5][0-9]/,
    de = new RegExp("[-+]".concat(G.source, ":").concat(_.source)),
    de = new RegExp("([zZ]|".concat(de.source, ")")),
    G = new RegExp(
      ""
        .concat(G.source, ":")
        .concat(_.source, ":")
        .concat(/([0-5][0-9]|60)/.source)
        .concat(/(\.[0-9]+)?/.source)
    ),
    _ = new RegExp(
      ""
        .concat(/[0-9]{4}/.source, "-")
        .concat(/(0[1-9]|1[0-2])/.source, "-")
        .concat(/([12]\d|0[1-9]|3[01])/.source)
    ),
    G = new RegExp("".concat(G.source).concat(de.source)),
    Ie = new RegExp("^".concat(_.source, "[ tT]").concat(G.source, "$"));
  var Re = new Set([
    "AFG",
    "ALA",
    "ALB",
    "DZA",
    "ASM",
    "AND",
    "AGO",
    "AIA",
    "ATA",
    "ATG",
    "ARG",
    "ARM",
    "ABW",
    "AUS",
    "AUT",
    "AZE",
    "BHS",
    "BHR",
    "BGD",
    "BRB",
    "BLR",
    "BEL",
    "BLZ",
    "BEN",
    "BMU",
    "BTN",
    "BOL",
    "BES",
    "BIH",
    "BWA",
    "BVT",
    "BRA",
    "IOT",
    "BRN",
    "BGR",
    "BFA",
    "BDI",
    "KHM",
    "CMR",
    "CAN",
    "CPV",
    "CYM",
    "CAF",
    "TCD",
    "CHL",
    "CHN",
    "CXR",
    "CCK",
    "COL",
    "COM",
    "COG",
    "COD",
    "COK",
    "CRI",
    "CIV",
    "HRV",
    "CUB",
    "CUW",
    "CYP",
    "CZE",
    "DNK",
    "DJI",
    "DMA",
    "DOM",
    "ECU",
    "EGY",
    "SLV",
    "GNQ",
    "ERI",
    "EST",
    "ETH",
    "FLK",
    "FRO",
    "FJI",
    "FIN",
    "FRA",
    "GUF",
    "PYF",
    "ATF",
    "GAB",
    "GMB",
    "GEO",
    "DEU",
    "GHA",
    "GIB",
    "GRC",
    "GRL",
    "GRD",
    "GLP",
    "GUM",
    "GTM",
    "GGY",
    "GIN",
    "GNB",
    "GUY",
    "HTI",
    "HMD",
    "VAT",
    "HND",
    "HKG",
    "HUN",
    "ISL",
    "IND",
    "IDN",
    "IRN",
    "IRQ",
    "IRL",
    "IMN",
    "ISR",
    "ITA",
    "JAM",
    "JPN",
    "JEY",
    "JOR",
    "KAZ",
    "KEN",
    "KIR",
    "PRK",
    "KOR",
    "KWT",
    "KGZ",
    "LAO",
    "LVA",
    "LBN",
    "LSO",
    "LBR",
    "LBY",
    "LIE",
    "LTU",
    "LUX",
    "MAC",
    "MKD",
    "MDG",
    "MWI",
    "MYS",
    "MDV",
    "MLI",
    "MLT",
    "MHL",
    "MTQ",
    "MRT",
    "MUS",
    "MYT",
    "MEX",
    "FSM",
    "MDA",
    "MCO",
    "MNG",
    "MNE",
    "MSR",
    "MAR",
    "MOZ",
    "MMR",
    "NAM",
    "NRU",
    "NPL",
    "NLD",
    "NCL",
    "NZL",
    "NIC",
    "NER",
    "NGA",
    "NIU",
    "NFK",
    "MNP",
    "NOR",
    "OMN",
    "PAK",
    "PLW",
    "PSE",
    "PAN",
    "PNG",
    "PRY",
    "PER",
    "PHL",
    "PCN",
    "POL",
    "PRT",
    "PRI",
    "QAT",
    "REU",
    "ROU",
    "RUS",
    "RWA",
    "BLM",
    "SHN",
    "KNA",
    "LCA",
    "MAF",
    "SPM",
    "VCT",
    "WSM",
    "SMR",
    "STP",
    "SAU",
    "SEN",
    "SRB",
    "SYC",
    "SLE",
    "SGP",
    "SXM",
    "SVK",
    "SVN",
    "SLB",
    "SOM",
    "ZAF",
    "SGS",
    "SSD",
    "ESP",
    "LKA",
    "SDN",
    "SUR",
    "SJM",
    "SWZ",
    "SWE",
    "CHE",
    "SYR",
    "TWN",
    "TJK",
    "TZA",
    "THA",
    "TLS",
    "TGO",
    "TKL",
    "TON",
    "TTO",
    "TUN",
    "TUR",
    "TKM",
    "TCA",
    "TUV",
    "UGA",
    "UKR",
    "ARE",
    "GBR",
    "USA",
    "UMI",
    "URY",
    "UZB",
    "VUT",
    "VEN",
    "VNM",
    "VGB",
    "VIR",
    "WLF",
    "ESH",
    "YEM",
    "ZMB",
    "ZWE",
  ]);
  var ve = new Set([
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BOV",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHE",
    "CHF",
    "CHW",
    "CLF",
    "CLP",
    "CNY",
    "COP",
    "COU",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MXV",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SVC",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "USN",
    "UYI",
    "UYU",
    "UYW",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XAG",
    "XAU",
    "XBA",
    "XBB",
    "XBC",
    "XBD",
    "XCD",
    "XDR",
    "XOF",
    "XPD",
    "XPF",
    "XPT",
    "XSU",
    "XTS",
    "XUA",
    "XXX",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL",
  ]);
  var Le = /^[A-Z2-7]+=*$/;
  var me = /^[A-HJ-NP-Za-km-z1-9]*$/;
  var Ze = /^[a-z]+\/[a-z0-9\-\+]+$/i,
    Me = /^[a-z\-]+=[a-z0-9\-]+$/i,
    Be = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;
  var Ne =
    /^magnet:\?xt(?:\.1)?=urn:(?:aich|bitprint|btih|ed2k|ed2khash|kzhash|md5|sha1|tree:tiger):[a-z0-9]{32}(?:[a-z0-9]{8})?($|&)/i;
  var Fe =
      /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+]{1,100}$/i,
    De =
      /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i,
    Ce =
      /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i;
  var Te = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/,
    Ge = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/,
    Oe =
      /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i,
    _e =
      /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i,
    He = { checkDMS: !1 };
  var de = /^\d{4}$/,
    _ = /^\d{5}$/,
    G = /^\d{6}$/,
    Pe = {
      AD: /^AD\d{3}$/,
      AT: de,
      AU: de,
      AZ: /^AZ\d{4}$/,
      BE: de,
      BG: de,
      BR: /^\d{5}-\d{3}$/,
      BY: /2[1-4]{1}\d{4}$/,
      CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
      CH: de,
      CN: /^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
      CZ: /^\d{3}\s?\d{2}$/,
      DE: _,
      DK: de,
      DO: _,
      DZ: _,
      EE: _,
      ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
      FI: _,
      FR: /^\d{2}\s?\d{3}$/,
      GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
      GR: /^\d{3}\s?\d{2}$/,
      HR: /^([1-5]\d{4}$)/,
      HT: /^HT\d{4}$/,
      HU: de,
      ID: _,
      IE: /^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,
      IL: /^(\d{5}|\d{7})$/,
      IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
      IR: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
      IS: /^\d{3}$/,
      IT: _,
      JP: /^\d{3}\-\d{4}$/,
      KE: _,
      KR: /^(\d{5}|\d{6})$/,
      LI: /^(948[5-9]|949[0-7])$/,
      LT: /^LT\-\d{5}$/,
      LU: de,
      LV: /^LV\-\d{4}$/,
      LK: _,
      MX: _,
      MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
      MY: _,
      NL: /^\d{4}\s?[a-z]{2}$/i,
      NO: de,
      NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
      NZ: de,
      PL: /^\d{2}\-\d{3}$/,
      PR: /^00[679]\d{2}([ -]\d{4})?$/,
      PT: /^\d{4}\-\d{3}?$/,
      RO: G,
      RU: G,
      SA: _,
      SE: /^[1-9]\d{2}\s?\d{2}$/,
      SG: G,
      SI: de,
      SK: /^\d{3}\s?\d{2}$/,
      TH: _,
      TN: de,
      TW: /^\d{3}(\d{2})?$/,
      UA: _,
      US: /^\d{5}(-\d{4})?$/,
      ZA: de,
      ZM: _,
    },
    _ = Object.keys(Pe);
  function be(t, e) {
    l(t);
    e = e
      ? new RegExp(
          "^[".concat(e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "]+"),
          "g"
        )
      : /^\s+/g;
    return t.replace(e, "");
  }
  function Ue(t, e) {
    if ((l(t), e)) {
      e = new RegExp(
        "[".concat(e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "]+$"),
        "g"
      );
      return t.replace(e, "");
    }
    for (var r = t.length - 1; /\s/.test(t.charAt(r)); ) --r;
    return t.slice(0, r + 1);
  }
  function Ke(t, e) {
    return l(t), t.replace(new RegExp("[".concat(e, "]+"), "g"), "");
  }
  var we = {
      all_lowercase: !0,
      gmail_lowercase: !0,
      gmail_remove_dots: !0,
      gmail_remove_subaddress: !0,
      gmail_convert_googlemaildotcom: !0,
      outlookdotcom_lowercase: !0,
      outlookdotcom_remove_subaddress: !0,
      yahoo_lowercase: !0,
      yahoo_remove_subaddress: !0,
      yandex_lowercase: !0,
      icloud_lowercase: !0,
      icloud_remove_subaddress: !0,
    },
    ye = ["icloud.com", "me.com"],
    We = [
      "hotmail.at",
      "hotmail.be",
      "hotmail.ca",
      "hotmail.cl",
      "hotmail.co.il",
      "hotmail.co.nz",
      "hotmail.co.th",
      "hotmail.co.uk",
      "hotmail.com",
      "hotmail.com.ar",
      "hotmail.com.au",
      "hotmail.com.br",
      "hotmail.com.gr",
      "hotmail.com.mx",
      "hotmail.com.pe",
      "hotmail.com.tr",
      "hotmail.com.vn",
      "hotmail.cz",
      "hotmail.de",
      "hotmail.dk",
      "hotmail.es",
      "hotmail.fr",
      "hotmail.hu",
      "hotmail.id",
      "hotmail.ie",
      "hotmail.in",
      "hotmail.it",
      "hotmail.jp",
      "hotmail.kr",
      "hotmail.lv",
      "hotmail.my",
      "hotmail.ph",
      "hotmail.pt",
      "hotmail.sa",
      "hotmail.sg",
      "hotmail.sk",
      "live.be",
      "live.co.uk",
      "live.com",
      "live.com.ar",
      "live.com.mx",
      "live.de",
      "live.es",
      "live.eu",
      "live.fr",
      "live.it",
      "live.nl",
      "msn.com",
      "outlook.at",
      "outlook.be",
      "outlook.cl",
      "outlook.co.il",
      "outlook.co.nz",
      "outlook.co.th",
      "outlook.com",
      "outlook.com.ar",
      "outlook.com.au",
      "outlook.com.br",
      "outlook.com.gr",
      "outlook.com.pe",
      "outlook.com.tr",
      "outlook.com.vn",
      "outlook.cz",
      "outlook.de",
      "outlook.dk",
      "outlook.es",
      "outlook.fr",
      "outlook.hu",
      "outlook.id",
      "outlook.ie",
      "outlook.in",
      "outlook.it",
      "outlook.jp",
      "outlook.kr",
      "outlook.lv",
      "outlook.my",
      "outlook.ph",
      "outlook.pt",
      "outlook.sa",
      "outlook.sg",
      "outlook.sk",
      "passport.com",
    ],
    Ye = [
      "rocketmail.com",
      "yahoo.ca",
      "yahoo.co.uk",
      "yahoo.com",
      "yahoo.de",
      "yahoo.fr",
      "yahoo.in",
      "yahoo.it",
      "ymail.com",
    ],
    xe = [
      "yandex.ru",
      "yandex.ua",
      "yandex.kz",
      "yandex.com",
      "yandex.by",
      "ya.ru",
    ];
  function Ve(t) {
    return 1 < t.length ? t : "";
  }
  var ke = /^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/;
  var ze = {
    "cs-CZ": function (t) {
      return /^(([ABCDEFHKIJKLMNPRSTUVXYZ]|[0-9])-?){5,8}$/.test(t);
    },
    "de-DE": function (t) {
      return /^((AW|UL|AK|GA|AÖ|LF|AZ|AM|AS|ZE|AN|AB|A|KG|KH|BA|EW|BZ|HY|KM|BT|HP|B|BC|BI|BO|FN|TT|ÜB|BN|AH|BS|FR|HB|ZZ|BB|BK|BÖ|OC|OK|CW|CE|C|CO|LH|CB|KW|LC|LN|DA|DI|DE|DH|SY|NÖ|DO|DD|DU|DN|D|EI|EA|EE|FI|EM|EL|EN|PF|ED|EF|ER|AU|ZP|E|ES|NT|EU|FL|FO|FT|FF|F|FS|FD|FÜ|GE|G|GI|GF|GS|ZR|GG|GP|GR|NY|ZI|GÖ|GZ|GT|HA|HH|HM|HU|WL|HZ|WR|RN|HK|HD|HN|HS|GK|HE|HF|RZ|HI|HG|HO|HX|IK|IL|IN|J|JL|KL|KA|KS|KF|KE|KI|KT|KO|KN|KR|KC|KU|K|LD|LL|LA|L|OP|LM|LI|LB|LU|LÖ|HL|LG|MD|GN|MZ|MA|ML|MR|MY|AT|DM|MC|NZ|RM|RG|MM|ME|MB|MI|FG|DL|HC|MW|RL|MK|MG|MÜ|WS|MH|M|MS|NU|NB|ND|NM|NK|NW|NR|NI|NF|DZ|EB|OZ|TG|TO|N|OA|GM|OB|CA|EH|FW|OF|OL|OE|OG|BH|LR|OS|AA|GD|OH|KY|NP|WK|PB|PA|PE|PI|PS|P|PM|PR|RA|RV|RE|R|H|SB|WN|RS|RD|RT|BM|NE|GV|RP|SU|GL|RO|GÜ|RH|EG|RW|PN|SK|MQ|RU|SZ|RI|SL|SM|SC|HR|FZ|VS|SW|SN|CR|SE|SI|SO|LP|SG|NH|SP|IZ|ST|BF|TE|HV|OD|SR|S|AC|DW|ZW|TF|TS|TR|TÜ|UM|PZ|TP|UE|UN|UH|MN|KK|VB|V|AE|PL|RC|VG|GW|PW|VR|VK|KB|WA|WT|BE|WM|WE|AP|MO|WW|FB|WZ|WI|WB|JE|WF|WO|W|WÜ|BL|Z|GC)[- ]?[A-Z]{1,2}[- ]?\d{1,4}|(AIC|FDB|ABG|SLN|SAW|KLZ|BUL|ESB|NAB|SUL|WST|ABI|AZE|BTF|KÖT|DKB|FEU|ROT|ALZ|SMÜ|WER|AUR|NOR|DÜW|BRK|HAB|TÖL|WOR|BAD|BAR|BER|BIW|EBS|KEM|MÜB|PEG|BGL|BGD|REI|WIL|BKS|BIR|WAT|BOR|BOH|BOT|BRB|BLK|HHM|NEB|NMB|WSF|LEO|HDL|WMS|WZL|BÜS|CHA|KÖZ|ROD|WÜM|CLP|NEC|COC|ZEL|COE|CUX|DAH|LDS|DEG|DEL|RSL|DLG|DGF|LAN|HEI|MED|DON|KIB|ROK|JÜL|MON|SLE|EBE|EIC|HIG|WBS|BIT|PRÜ|LIB|EMD|WIT|ERH|HÖS|ERZ|ANA|ASZ|MAB|MEK|STL|SZB|FDS|HCH|HOR|WOL|FRG|GRA|WOS|FRI|FFB|GAP|GER|BRL|CLZ|GTH|NOH|HGW|GRZ|LÖB|NOL|WSW|DUD|HMÜ|OHA|KRU|HAL|HAM|HBS|QLB|HVL|NAU|HAS|EBN|GEO|HOH|HDH|ERK|HER|WAN|HEF|ROF|HBN|ALF|HSK|USI|NAI|REH|SAN|KÜN|ÖHR|HOL|WAR|ARN|BRG|GNT|HOG|WOH|KEH|MAI|PAR|RID|ROL|KLE|GEL|KUS|KYF|ART|SDH|LDK|DIL|MAL|VIB|LER|BNA|GHA|GRM|MTL|WUR|LEV|LIF|STE|WEL|LIP|VAI|LUP|HGN|LBZ|LWL|PCH|STB|DAN|MKK|SLÜ|MSP|TBB|MGH|MTK|BIN|MSH|EIL|HET|SGH|BID|MYK|MSE|MST|MÜR|WRN|MEI|GRH|RIE|MZG|MIL|OBB|BED|FLÖ|MOL|FRW|SEE|SRB|AIB|MOS|BCH|ILL|SOB|NMS|NEA|SEF|UFF|NEW|VOH|NDH|TDO|NWM|GDB|GVM|WIS|NOM|EIN|GAN|LAU|HEB|OHV|OSL|SFB|ERB|LOS|BSK|KEL|BSB|MEL|WTL|OAL|FÜS|MOD|OHZ|OPR|BÜR|PAF|PLÖ|CAS|GLA|REG|VIT|ECK|SIM|GOA|EMS|DIZ|GOH|RÜD|SWA|NES|KÖN|MET|LRO|BÜZ|DBR|ROS|TET|HRO|ROW|BRV|HIP|PAN|GRI|SHK|EIS|SRO|SOK|LBS|SCZ|MER|QFT|SLF|SLS|HOM|SLK|ASL|BBG|SBK|SFT|SHG|MGN|MEG|ZIG|SAD|NEN|OVI|SHA|BLB|SIG|SON|SPN|FOR|GUB|SPB|IGB|WND|STD|STA|SDL|OBG|HST|BOG|SHL|PIR|FTL|SEB|SÖM|SÜW|TIR|SAB|TUT|ANG|SDT|LÜN|LSZ|MHL|VEC|VER|VIE|OVL|ANK|OVP|SBG|UEM|UER|WLG|GMN|NVP|RDG|RÜG|DAU|FKB|WAF|WAK|SLZ|WEN|SOG|APD|WUG|GUN|ESW|WIZ|WES|DIN|BRA|BÜD|WHV|HWI|GHC|WTM|WOB|WUN|MAK|SEL|OCH|HOT|WDA)[- ]?(([A-Z][- ]?\d{1,4})|([A-Z]{2}[- ]?\d{1,3})))[- ]?(E|H)?$/.test(
        t
      );
    },
    "de-LI": function (t) {
      return /^FL[- ]?\d{1,5}[UZ]?$/.test(t);
    },
    "fi-FI": function (t) {
      return /^(?=.{4,7})(([A-Z]{1,3}|[0-9]{1,3})[\s-]?([A-Z]{1,3}|[0-9]{1,5}))$/.test(
        t
      );
    },
    "pt-PT": function (t) {
      return /^([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})$/.test(
        t
      );
    },
    "sq-AL": function (t) {
      return /^[A-Z]{2}[- ]?((\d{3}[- ]?(([A-Z]{2})|T))|(R[- ]?\d{3}))$/.test(
        t
      );
    },
    "pt-BR": function (t) {
      return /^[A-Z]{3}[ -]?[0-9][A-Z][0-9]{2}|[A-Z]{3}[ -]?[0-9]{4}$/.test(t);
    },
  };
  var Xe = /^[A-Z]$/,
    Je = /^[a-z]$/,
    je = /^[0-9]$/,
    Qe = /^[-#!$@%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/,
    qe = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: !1,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    };
  function tr(t) {
    var e,
      r,
      n =
        ((e = t),
        (r = {}),
        Array.from(e).forEach(function (t) {
          r[t] ? (r[t] += 1) : (r[t] = 1);
        }),
        r),
      i = {
        length: t.length,
        uniqueChars: Object.keys(n).length,
        uppercaseCount: 0,
        lowercaseCount: 0,
        numberCount: 0,
        symbolCount: 0,
      };
    return (
      Object.keys(n).forEach(function (t) {
        Xe.test(t)
          ? (i.uppercaseCount += n[t])
          : Je.test(t)
          ? (i.lowercaseCount += n[t])
          : je.test(t)
          ? (i.numberCount += n[t])
          : Qe.test(t) && (i.symbolCount += n[t]);
      }),
      i
    );
  }
  var er = {
    GB: /^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/,
    IT: /^(IT)?[0-9]{11}$/,
    NL: /^(NL)?[0-9]{9}B[0-9]{2}$/,
  };
  return {
    version: "13.7.0",
    toDate: a,
    toFloat: Z,
    toInt: function (t, e) {
      return l(t), parseInt(t, e || 10);
    },
    toBoolean: function (t, e) {
      return (
        l(t),
        e
          ? "1" === t || /^true$/i.test(t)
          : "0" !== t && !/^false$/i.test(t) && "" !== t
      );
    },
    equals: function (t, e) {
      return l(t), t === e;
    },
    contains: function (t, e, r) {
      return (
        l(t),
        (r = B(r, N)).ignoreCase
          ? t.toLowerCase().split(M(e).toLowerCase()).length > r.minOccurrences
          : t.split(M(e)).length > r.minOccurrences
      );
    },
    matches: function (t, e, r) {
      return (
        l(t),
        (e =
          "[object RegExp]" !== Object.prototype.toString.call(e)
            ? new RegExp(e, r)
            : e).test(t)
      );
    },
    isEmail: function (t, e) {
      if ((l(t), (e = B(e, b)).require_display_name || e.allow_display_name)) {
        var r = t.match(U);
        if (r) {
          var n = r[1];
          if (
            ((t = t.replace(n, "").replace(/(^<|>$)/g, "")),
            !(function (t) {
              var e = t.replace(/^"(.+)"$/, "$1");
              if (e.trim()) {
                if (/[\.";<>]/.test(e)) {
                  if (e === t) return;
                  if (!(e.split('"').length === e.split('\\"').length)) return;
                }
                return 1;
              }
            })((n = n.endsWith(" ") ? n.substr(0, n.length - 1) : n)))
          )
            return !1;
        } else if (e.require_display_name) return !1;
      }
      if (!e.ignore_max_length && 254 < t.length) return !1;
      if (
        ((r = t.split("@")),
        (n = r.pop()),
        (t = n.toLowerCase()),
        e.host_blacklist.includes(t))
      )
        return !1;
      if (
        ((r = r.join("@")),
        e.domain_specific_validation &&
          ("gmail.com" === t || "googlemail.com" === t))
      ) {
        t = (r = r.toLowerCase()).split("+")[0];
        if (!F(t.replace(/\./g, ""), { min: 6, max: 30 })) return !1;
        for (var i = t.split("."), a = 0; a < i.length; a++)
          if (!w.test(i[a])) return !1;
      }
      if (
        !(
          !1 !== e.ignore_max_length ||
          (F(r, { max: 64 }) && F(n, { max: 254 }))
        )
      )
        return !1;
      if (!C(n, { require_tld: e.require_tld })) {
        if (!e.allow_ip_domain) return !1;
        if (!P(n)) {
          if (!n.startsWith("[") || !n.endsWith("]")) return !1;
          n = n.substr(1, n.length - 2);
          if (0 === n.length || !P(n)) return !1;
        }
      }
      if ('"' === r[0])
        return (
          (r = r.slice(1, r.length - 1)),
          (e.allow_utf8_local_part ? Y : y).test(r)
        );
      for (
        var o = e.allow_utf8_local_part ? W : K, s = r.split("."), c = 0;
        c < s.length;
        c++
      )
        if (!o.test(s[c])) return !1;
      return (
        !e.blacklisted_chars ||
        -1 === r.search(new RegExp("[".concat(e.blacklisted_chars, "]+"), "g"))
      );
    },
    isURL: function (t, e) {
      if ((l(t), !t || /[\s<>]/.test(t))) return !1;
      if (0 === t.indexOf("mailto:")) return !1;
      if ((e = B(e, x)).validate_length && 2083 <= t.length) return !1;
      if (!e.allow_fragments && t.includes("#")) return !1;
      if (!e.allow_query_components && (t.includes("?") || t.includes("&")))
        return !1;
      var r,
        n,
        i = t.split("#");
      if (
        1 <
        (i = (t = (i = (t = i.shift()).split("?")).shift()).split("://")).length
      ) {
        if (
          ((r = i.shift().toLowerCase()),
          e.require_valid_protocol && -1 === e.protocols.indexOf(r))
        )
          return !1;
      } else {
        if (e.require_protocol) return !1;
        if ("//" === t.substr(0, 2)) {
          if (!e.allow_protocol_relative_urls) return !1;
          i[0] = t.substr(2);
        }
      }
      if ("" === (t = i.join("://"))) return !1;
      if ("" === (t = (i = t.split("/")).shift()) && !e.require_host) return !0;
      if (1 < (i = t.split("@")).length) {
        if (e.disallow_auth) return !1;
        if ("" === i[0]) return !1;
        if (0 <= (c = i.shift()).indexOf(":") && 2 < c.split(":").length)
          return !1;
        var a = u(c.split(":"), 2),
          o = a[0],
          s = a[1];
        if ("" === o && "" === s) return !1;
      }
      var c = null,
        a = null;
      if (
        ((s = (o = i.join("@")).match(V))
          ? ((n = ""), (a = s[1]), (c = s[2] || null))
          : ((n = (i = o.split(":")).shift()), i.length && (c = i.join(":"))),
        null !== c && 0 < c.length)
      ) {
        if (((i = parseInt(c, 10)), !/^[0-9]+$/.test(c) || i <= 0 || 65535 < i))
          return !1;
      } else if (e.require_port) return !1;
      return e.host_whitelist
        ? k(n, e.host_whitelist)
        : !!(P(n) || C(n, e) || (a && P(a, 6))) &&
            ((n = n || a), !e.host_blacklist || !k(n, e.host_blacklist));
    },
    isMACAddress: function (t, e) {
      return (
        l(t),
        e && (e.no_colons || e.no_separators)
          ? X.test(t)
          : z.test(t) || J.test(t)
      );
    },
    isIP: P,
    isIPRange: function (t) {
      var e =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
      l(t);
      var r = t.split("/");
      if (2 !== r.length) return !1;
      if (!j.test(r[1])) return !1;
      if (1 < r[1].length && r[1].startsWith("0")) return !1;
      if (!P(r[0], e)) return !1;
      var n = null;
      switch (String(e)) {
        case "4":
          n = 32;
          break;
        case "6":
          n = 128;
          break;
        default:
          n = P(r[0], "6") ? 128 : 32;
      }
      return r[1] <= n && 0 <= r[1];
    },
    isFQDN: C,
    isBoolean: function (t) {
      var e =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : tt;
      return l(t), e.loose ? rt.includes(t.toLowerCase()) : et.includes(t);
    },
    isIBAN: function (t) {
      return (
        l(t),
        (e = (r = (e = t).replace(/[\s\-]+/gi, "").toUpperCase())
          .slice(0, 2)
          .toUpperCase()) in Ot &&
          Ot[e].test(r) &&
          1 ===
            (
              (t = (t = t).replace(/[^A-Z0-9]+/gi, "").toUpperCase()).slice(4) +
              t.slice(0, 4)
            )
              .replace(/[A-Z]/g, function (t) {
                return t.charCodeAt(0) - 55;
              })
              .match(/\d{1,7}/g)
              .reduce(function (t, e) {
                return Number(t + e) % 97;
              }, "")
      );
      var e, r;
    },
    isBIC: function (t) {
      return l(t), !!Pt.has(t.slice(4, 6).toUpperCase()) && bt.test(t);
    },
    isAlpha: function (t) {
      var e =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : "en-US",
        r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
      if ((l(t), (r = r.ignore)))
        if (r instanceof RegExp) t = t.replace(r, "");
        else {
          if ("string" != typeof r)
            throw new Error("ignore should be instance of a String or RegExp");
          t = t.replace(
            new RegExp(
              "[".concat(r.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&"), "]"),
              "g"
            ),
            ""
          );
        }
      if (e in o) return o[e].test(t);
      throw new Error("Invalid locale '".concat(e, "'"));
    },
    isAlphaLocales: it,
    isAlphanumeric: function (t) {
      var e =
          1 < arguments.length && void 0 !== arguments[1]
            ? arguments[1]
            : "en-US",
        r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
      if ((l(t), (r = r.ignore)))
        if (r instanceof RegExp) t = t.replace(r, "");
        else {
          if ("string" != typeof r)
            throw new Error("ignore should be instance of a String or RegExp");
          t = t.replace(
            new RegExp(
              "[".concat(r.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, "\\$&"), "]"),
              "g"
            ),
            ""
          );
        }
      if (e in s) return s[e].test(t);
      throw new Error("Invalid locale '".concat(e, "'"));
    },
    isAlphanumericLocales: at,
    isNumeric: function (t, e) {
      return (
        l(t),
        (e && e.no_symbols
          ? ot
          : new RegExp(
              "^[+-]?([0-9]*[".concat(
                (e || {}).locale ? c[e.locale] : ".",
                "])?[0-9]+$"
              )
            )
        ).test(t)
      );
    },
    isPassportNumber: function (t, e) {
      return (
        l(t),
        (t = t.replace(/\s/g, "").toUpperCase()),
        e.toUpperCase() in st && st[e].test(t)
      );
    },
    isPort: function (t) {
      return ut(t, { min: 0, max: 65535 });
    },
    isLowercase: function (t) {
      return l(t), t === t.toLowerCase();
    },
    isUppercase: function (t) {
      return l(t), t === t.toUpperCase();
    },
    isAscii: function (t) {
      return l(t), At.test(t);
    },
    isFullWidth: function (t) {
      return l(t), $t.test(t);
    },
    isHalfWidth: function (t) {
      return l(t), pt.test(t);
    },
    isVariableWidth: function (t) {
      return l(t), $t.test(t) && pt.test(t);
    },
    isMultibyte: function (t) {
      return l(t), St.test(t);
    },
    isSemVer: function (t) {
      return l(t), Et.test(t);
    },
    isSurrogatePair: function (t) {
      return l(t), It.test(t);
    },
    isInt: ut,
    isIMEI: function (t, e) {
      if ((l(t), !((e = e || {}).allow_hyphens ? ft : dt).test(t))) return !1;
      t = t.replace(/-/g, "");
      for (var r = 0, n = 2, i = 0; i < 14; i++) {
        var a = t.substring(14 - i - 1, 14 - i),
          a = parseInt(a, 10) * n;
        (r += 10 <= a ? (a % 10) + 1 : a), 1 === n ? (n += 1) : --n;
      }
      return (10 - (r % 10)) % 10 === parseInt(t.substring(14, 15), 10);
    },
    isFloat: L,
    isFloatLocales: m,
    isDecimal: function (t, e) {
      if ((l(t), (e = B(e, Rt)).locale in c))
        return (
          (r = vt),
          (n = t.replace(/ /g, "")),
          !r.some(function (t) {
            return n === t;
          }) &&
            ((r = e),
            new RegExp(
              "^[-+]?([0-9]+)?(\\"
                .concat(c[r.locale], "[0-9]{")
                .concat(r.decimal_digits, "})")
                .concat(r.force_decimal ? "" : "?", "$")
            ).test(t))
        );
      var r, n;
      throw new Error("Invalid locale '".concat(e.locale, "'"));
    },
    isHexadecimal: mt,
    isOctal: function (t) {
      return l(t), Zt.test(t);
    },
    isDivisibleBy: function (t, e) {
      return l(t), Z(t) % parseInt(e, 10) == 0;
    },
    isHexColor: function (t) {
      return l(t), Mt.test(t);
    },
    isRgbColor: function (t) {
      var e =
        !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
      return (
        l(t),
        e
          ? Bt.test(t) || Nt.test(t) || Ft.test(t) || Dt.test(t)
          : Bt.test(t) || Nt.test(t)
      );
    },
    isHSL: function (t) {
      return (
        l(t),
        (-1 !==
        (t = t
          .replace(/\s+/g, " ")
          .replace(/\s?(hsla?\(|\)|,)\s?/gi, "$1")).indexOf(",")
          ? Ct
          : Tt
        ).test(t)
      );
    },
    isISRC: function (t) {
      return l(t), Gt.test(t);
    },
    isMD5: function (t) {
      return l(t), Ut.test(t);
    },
    isHash: function (t, e) {
      return l(t), new RegExp("^[a-fA-F0-9]{".concat(Kt[e], "}$")).test(t);
    },
    isJWT: function (t) {
      l(t);
      var e = t.split(".");
      return (
        !(3 < (t = e.length) || t < 2) &&
        e.reduce(function (t, e) {
          return t && Yt(e, { urlSafe: !0 });
        }, !0)
      );
    },
    isJSON: function (t, e) {
      l(t);
      try {
        e = B(e, xt);
        var r = [];
        e.allow_primitives && (r = [null, !1, !0]);
        var n = JSON.parse(t);
        return r.includes(n) || (!!n && "object" === i(n));
      } catch (t) {}
      return !1;
    },
    isEmpty: function (t, e) {
      return (
        l(t), 0 === ((e = B(e, Vt)).ignore_whitespace ? t.trim() : t).length
      );
    },
    isLength: function (t, e) {
      var r;
      l(t);
      var n =
          "object" === i(e)
            ? ((r = e.min || 0), e.max)
            : ((r = e || 0), arguments[2]),
        e = t.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [],
        e = t.length - e.length;
      return r <= e && (void 0 === n || e <= n);
    },
    isLocale: function (t) {
      return l(t), "en_US_POSIX" === t || "ca_ES_VALENCIA" === t || nt.test(t);
    },
    isByteLength: F,
    isUUID: function (t, e) {
      return (
        l(t), !!(e = kt[[void 0, null].includes(e) ? "all" : e]) && e.test(t)
      );
    },
    isMongoId: function (t) {
      return l(t), mt(t) && 24 === t.length;
    },
    isAfter: function (t) {
      var e =
        1 < arguments.length && void 0 !== arguments[1]
          ? arguments[1]
          : String(new Date());
      return l(t), (e = a(e)), !!((t = a(t)) && e && e < t);
    },
    isBefore: function (t) {
      var e =
        1 < arguments.length && void 0 !== arguments[1]
          ? arguments[1]
          : String(new Date());
      return l(t), (e = a(e)), !!((t = a(t)) && e && t < e);
    },
    isIn: function (t, e) {
      if ((l(t), "[object Array]" !== Object.prototype.toString.call(e)))
        return "object" === i(e)
          ? e.hasOwnProperty(t)
          : !(!e || "function" != typeof e.indexOf) && 0 <= e.indexOf(t);
      var r,
        n = [];
      for (r in e) !{}.hasOwnProperty.call(e, r) || (n[r] = M(e[r]));
      return 0 <= n.indexOf(t);
    },
    isCreditCard: function (t) {
      l(t);
      var e = t.replace(/[- ]+/g, "");
      if (!zt.test(e)) return !1;
      for (var r, n, i = 0, a = e.length - 1; 0 <= a; a--)
        (r = e.substring(a, a + 1)),
          (r = parseInt(r, 10)),
          (i += n && 10 <= (r *= 2) ? (r % 10) + 1 : r),
          (n = !n);
      return !(i % 10 != 0 || !e);
    },
    isIdentityCard: function (t, e) {
      if ((l(t), e in Xt)) return Xt[e](t);
      if ("any" !== e) throw new Error("Invalid locale '".concat(e, "'"));
      for (var r in Xt) if (Xt.hasOwnProperty(r)) if ((0, Xt[r])(t)) return !0;
      return !1;
    },
    isEAN: function (t) {
      l(t);
      var e = Number(t.slice(-1));
      return Qt.test(t) && e === qt(t);
    },
    isISIN: function (t) {
      if ((l(t), !te.test(t))) return !1;
      for (var e = !0, r = 0, n = t.length - 2; 0 <= n; n--)
        if ("A" <= t[n] && t[n] <= "Z")
          for (
            var i = t[n].charCodeAt(0) - 55,
              a = 0,
              o = [i % 10, Math.trunc(i / 10)];
            a < o.length;
            a++
          ) {
            var s = o[a];
            (r += e ? (5 <= s ? 1 + 2 * (s - 5) : 2 * s) : s), (e = !e);
          }
        else {
          i = t[n].charCodeAt(0) - "0".charCodeAt(0);
          (r += e ? (5 <= i ? 1 + 2 * (i - 5) : 2 * i) : i), (e = !e);
        }
      var c = 10 * Math.trunc((r + 9) / 10) - r;
      return +t[t.length - 1] == c;
    },
    isISBN: function t(e) {
      var r =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "";
      if ((l(e), !(r = String(r)))) return t(e, 10) || t(e, 13);
      var n,
        i = e.replace(/[\s-]+/g, ""),
        a = 0;
      if ("10" === r) {
        if (!ee.test(i)) return !1;
        for (n = 0; n < 9; n++) a += (n + 1) * i.charAt(n);
        if (
          ("X" === i.charAt(9) ? (a += 100) : (a += 10 * i.charAt(9)),
          a % 11 == 0)
        )
          return !!i;
      } else if ("13" === r) {
        if (!re.test(i)) return !1;
        for (n = 0; n < 12; n++) a += ne[n % 2] * i.charAt(n);
        if (i.charAt(12) - ((10 - (a % 10)) % 10) == 0) return !!i;
      }
      return !1;
    },
    isISSN: function (t) {
      var e =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
      l(t);
      var r = "^\\d{4}-?\\d{3}[\\dX]$",
        r = e.require_hyphen ? r.replace("?", "") : r;
      if (!(r = e.case_sensitive ? new RegExp(r) : new RegExp(r, "i")).test(t))
        return !1;
      for (
        var n = t.replace("-", "").toUpperCase(), i = 0, a = 0;
        a < n.length;
        a++
      ) {
        var o = n[a];
        i += ("X" === o ? 10 : +o) * (8 - a);
      }
      return i % 11 == 0;
    },
    isMobilePhone: function (e, t, r) {
      if ((l(e), r && r.strictMode && !e.startsWith("+"))) return !1;
      if (Array.isArray(t))
        return t.some(function (t) {
          if (Ae.hasOwnProperty(t) && Ae[t].test(e)) return !0;
          return !1;
        });
      if (t in Ae) return Ae[t].test(e);
      if (t && "any" !== t) throw new Error("Invalid locale '".concat(t, "'"));
      for (var n in Ae) if (Ae.hasOwnProperty(n)) if (Ae[n].test(e)) return !0;
      return !1;
    },
    isMobilePhoneLocales: T,
    isPostalCode: function (t, e) {
      if ((l(t), e in Pe)) return Pe[e].test(t);
      if ("any" !== e) throw new Error("Invalid locale '".concat(e, "'"));
      for (var r in Pe) if (Pe.hasOwnProperty(r)) if (Pe[r].test(t)) return !0;
      return !1;
    },
    isPostalCodeLocales: _,
    isEthereumAddress: function (t) {
      return l(t), $e.test(t);
    },
    isCurrency: function (t, e) {
      return (
        l(t),
        (function (t) {
          var r = "\\d{".concat(t.digits_after_decimal[0], "}");
          t.digits_after_decimal.forEach(function (t, e) {
            0 !== e && (r = "".concat(r, "|\\d{").concat(t, "}"));
          });
          var e = "("
              .concat(
                t.symbol.replace(/\W/, function (t) {
                  return "\\".concat(t);
                }),
                ")"
              )
              .concat(t.require_symbol ? "" : "?"),
            n = "[1-9]\\d{0,2}(\\".concat(t.thousands_separator, "\\d{3})*"),
            i = "(".concat(["0", "[1-9]\\d*", n].join("|"), ")?"),
            n = "(\\"
              .concat(t.decimal_separator, "(")
              .concat(r, "))")
              .concat(t.require_decimal ? "" : "?"),
            n = i + (t.allow_decimal || t.require_decimal ? n : "");
          return (
            t.allow_negatives &&
              !t.parens_for_negatives &&
              (t.negative_sign_after_digits
                ? (n += "-?")
                : t.negative_sign_before_digits && (n = "-?" + n)),
            t.allow_negative_sign_placeholder
              ? (n = "( (?!\\-))?".concat(n))
              : t.allow_space_after_symbol
              ? (n = " ?".concat(n))
              : t.allow_space_after_digits && (n += "( (?!$))?"),
            t.symbol_after_digits ? (n += e) : (n = e + n),
            t.allow_negatives &&
              (t.parens_for_negatives
                ? (n = "(\\(".concat(n, "\\)|").concat(n, ")"))
                : t.negative_sign_before_digits ||
                  t.negative_sign_after_digits ||
                  (n = "-?" + n)),
            new RegExp("^(?!-? )(?=.*\\d)".concat(n, "$"))
          );
        })((e = B(e, pe))).test(t)
      );
    },
    isBtcAddress: function (t) {
      return l(t), (t.startsWith("bc1") ? Se : he).test(t);
    },
    isISO8601: function (t) {
      var e =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
      l(t);
      var r = (e.strictSeparator ? Ee : ge).test(t);
      return r && e.strict
        ? (function (t) {
            var e = t.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);
            if (e) {
              var r = Number(e[1]),
                n = Number(e[2]);
              return (r % 4 == 0 && r % 100 != 0) || r % 400 == 0
                ? n <= 366
                : n <= 365;
            }
            var i = t.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number),
              e = i[1],
              r = i[2],
              n = i[3],
              t = r && "0".concat(r).slice(-2),
              i = n && "0".concat(n).slice(-2),
              i = new Date(
                ""
                  .concat(e, "-")
                  .concat(t || "01", "-")
                  .concat(i || "01")
              );
            return (
              !r ||
              !n ||
              (i.getUTCFullYear() === e &&
                i.getUTCMonth() + 1 === r &&
                i.getUTCDate() === n)
            );
          })(t)
        : r;
    },
    isRFC3339: function (t) {
      return l(t), Ie.test(t);
    },
    isISO31661Alpha2: function (t) {
      return l(t), Ht.has(t.toUpperCase());
    },
    isISO31661Alpha3: function (t) {
      return l(t), Re.has(t.toUpperCase());
    },
    isISO4217: function (t) {
      return l(t), ve.has(t.toUpperCase());
    },
    isBase32: function (t) {
      return l(t), !(t.length % 8 != 0 || !Le.test(t));
    },
    isBase58: function (t) {
      return l(t), !!me.test(t);
    },
    isBase64: Yt,
    isDataURI: function (t) {
      l(t);
      var e = t.split(",");
      if (e.length < 2) return !1;
      var r = e.shift().trim().split(";");
      if ("data:" !== (t = r.shift()).substr(0, 5)) return !1;
      if ("" !== (t = t.substr(5)) && !Ze.test(t)) return !1;
      for (var n = 0; n < r.length; n++)
        if (
          (n !== r.length - 1 || "base64" !== r[n].toLowerCase()) &&
          !Me.test(r[n])
        )
          return !1;
      for (var i = 0; i < e.length; i++) if (!Be.test(e[i])) return !1;
      return !0;
    },
    isMagnetURI: function (t) {
      return l(t), Ne.test(t.trim());
    },
    isMimeType: function (t) {
      return l(t), Fe.test(t) || De.test(t) || Ce.test(t);
    },
    isLatLong: function (t, e) {
      return (
        l(t),
        (e = B(e, He)),
        !!t.includes(",") &&
          !(
            ((t = t.split(","))[0].startsWith("(") && !t[1].endsWith(")")) ||
            (t[1].endsWith(")") && !t[0].startsWith("("))
          ) &&
          (e.checkDMS
            ? Oe.test(t[0]) && _e.test(t[1])
            : Te.test(t[0]) && Ge.test(t[1]))
      );
    },
    ltrim: be,
    rtrim: Ue,
    trim: function (t, e) {
      return Ue(be(t, e), e);
    },
    escape: function (t) {
      return (
        l(t),
        t
          .replace(/&/g, "&amp;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#x27;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\//g, "&#x2F;")
          .replace(/\\/g, "&#x5C;")
          .replace(/`/g, "&#96;")
      );
    },
    unescape: function (t) {
      return (
        l(t),
        t
          .replace(/&quot;/g, '"')
          .replace(/&#x27;/g, "'")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&#x2F;/g, "/")
          .replace(/&#x5C;/g, "\\")
          .replace(/&#96;/g, "`")
          .replace(/&amp;/g, "&")
      );
    },
    stripLow: function (t, e) {
      return (
        l(t),
        Ke(t, e ? "\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F" : "\\x00-\\x1F\\x7F")
      );
    },
    whitelist: function (t, e) {
      return l(t), t.replace(new RegExp("[^".concat(e, "]+"), "g"), "");
    },
    blacklist: Ke,
    isWhitelisted: function (t, e) {
      l(t);
      for (var r = t.length - 1; 0 <= r; r--)
        if (-1 === e.indexOf(t[r])) return !1;
      return !0;
    },
    normalizeEmail: function (t, e) {
      e = B(e, we);
      var r = t.split("@"),
        t = r.pop();
      if (
        (((r = [r.join("@"), t])[1] = r[1].toLowerCase()),
        "gmail.com" === r[1] || "googlemail.com" === r[1])
      ) {
        if (
          (e.gmail_remove_subaddress && (r[0] = r[0].split("+")[0]),
          e.gmail_remove_dots && (r[0] = r[0].replace(/\.+/g, Ve)),
          !r[0].length)
        )
          return !1;
        (e.all_lowercase || e.gmail_lowercase) && (r[0] = r[0].toLowerCase()),
          (r[1] = e.gmail_convert_googlemaildotcom ? "gmail.com" : r[1]);
      } else if (0 <= ye.indexOf(r[1])) {
        if (
          (e.icloud_remove_subaddress && (r[0] = r[0].split("+")[0]),
          !r[0].length)
        )
          return !1;
        (e.all_lowercase || e.icloud_lowercase) && (r[0] = r[0].toLowerCase());
      } else if (0 <= We.indexOf(r[1])) {
        if (
          (e.outlookdotcom_remove_subaddress && (r[0] = r[0].split("+")[0]),
          !r[0].length)
        )
          return !1;
        (e.all_lowercase || e.outlookdotcom_lowercase) &&
          (r[0] = r[0].toLowerCase());
      } else if (0 <= Ye.indexOf(r[1])) {
        if (
          (e.yahoo_remove_subaddress &&
            ((t = r[0].split("-")),
            (r[0] = 1 < t.length ? t.slice(0, -1).join("-") : t[0])),
          !r[0].length)
        )
          return !1;
        (e.all_lowercase || e.yahoo_lowercase) && (r[0] = r[0].toLowerCase());
      } else
        0 <= xe.indexOf(r[1])
          ? ((e.all_lowercase || e.yandex_lowercase) &&
              (r[0] = r[0].toLowerCase()),
            (r[1] = "yandex.ru"))
          : e.all_lowercase && (r[0] = r[0].toLowerCase());
      return r.join("@");
    },
    toString: toString,
    isSlug: function (t) {
      return l(t), ke.test(t);
    },
    isStrongPassword: function (t) {
      var e =
        1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
      l(t);
      var r,
        n,
        i = tr(t);
      return (e = B(e || {}, qe)).returnScore
        ? ((r = e),
          (n = 0),
          (n += (t = i).uniqueChars * r.pointsPerUnique),
          (n += (t.length - t.uniqueChars) * r.pointsPerRepeat),
          0 < t.lowercaseCount && (n += r.pointsForContainingLower),
          0 < t.uppercaseCount && (n += r.pointsForContainingUpper),
          0 < t.numberCount && (n += r.pointsForContainingNumber),
          0 < t.symbolCount && (n += r.pointsForContainingSymbol),
          n)
        : i.length >= e.minLength &&
            i.lowercaseCount >= e.minLowercase &&
            i.uppercaseCount >= e.minUppercase &&
            i.numberCount >= e.minNumbers &&
            i.symbolCount >= e.minSymbols;
    },
    isTaxID: function (t) {
      var e =
        1 < arguments.length && void 0 !== arguments[1]
          ? arguments[1]
          : "en-US";
      if ((l(t), (t = t.slice(0)), e in le))
        return (
          e in fe && (t = t.replace(fe[e], "")),
          !!le[e].test(t) && (!(e in ue) || ue[e](t))
        );
      throw new Error("Invalid locale '".concat(e, "'"));
    },
    isDate: q,
    isLicensePlate: function (t, e) {
      if ((l(t), e in ze)) return ze[e](t);
      if ("any" !== e) throw new Error("Invalid locale '".concat(e, "'"));
      for (var r in ze) if ((0, ze[r])(t)) return !0;
      return !1;
    },
    isVAT: function (t, e) {
      if ((l(t), l(e), e in er)) return er[e].test(t);
      throw new Error("Invalid country code: '".concat(e, "'"));
    },
    ibanLocales: _t,
  };
});
