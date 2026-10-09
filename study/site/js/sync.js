/* Progress sync with the Pages Function at /api/progress (Cloudflare D1 behind Cloudflare Access).
   localStorage is the offline cache. Merge rule: for each item the newer lastSeen wins;
   skills/learned/mocks come from whichever copy was updated last, and learned lessons are unioned.
   If the API is missing (opened as a file, or before deploy) the site keeps working on this device only. */
(function () {
  "use strict";
  var dirty = {}, metaDirty = false, busy = false;
  function merge(local, remote) {
    var out = Object.assign({}, local);
    out.items = Object.assign({}, local.items);
    Object.keys(remote.items || {}).forEach(function (k) {
      var r = remote.items[k], l = out.items[k];
      if (!l || (r.lastSeen || 0) > (l.lastSeen || 0)) out.items[k] = r;
    });
    var m = remote.meta || {};
    if ((m.updated || 0) > (local.updated || 0)) ["skills", "mocks", "celebrated", "byDay", "sessions", "log", "seenNote"].forEach(function (k) { if (m[k] !== undefined) out[k] = m[k]; });
    out.learned = Object.assign({}, m.learned || {}, local.learned || {});
    return out;
  }
  function meta(S) { return { skills: S.skills, learned: S.learned, mocks: S.mocks, celebrated: S.celebrated, byDay: S.byDay, sessions: S.sessions, log: S.log.slice(-50), seenNote: S.seenNote, updated: S.updated }; }
  var Sync = {
    online: false, merge: merge,
    mark: function (ids) { ids.forEach(function (id) { dirty[id] = 1; }); metaDirty = true; },
    start: function () {
      if (location.protocol === "file:") return;
      fetch("/api/progress", { credentials: "same-origin", headers: { accept: "application/json" } }).then(function (r) { if (!r.ok) throw r.status; return r.json(); }).then(function (remote) {
        Sync.online = true;
        var S = window.App.state(), merged = merge(S, remote);
        Object.keys(S.items).forEach(function (k) { var r = (remote.items || {})[k]; if (!r || (S.items[k].lastSeen || 0) > (r.lastSeen || 0)) dirty[k] = 1; });
        merged.lang = S.lang; merged.theme = S.theme;
        window.App.setState(merged); Sync.flush();
      }).catch(function () { Sync.online = false; });
      document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") Sync.flush(true); });
    },
    flush: function (beacon) {
      if (!Sync.online || busy) return;
      var ids = Object.keys(dirty); if (!ids.length && !metaDirty) return;
      var S = window.App.state(), body = JSON.stringify({ items: ids.reduce(function (o, k) { if (S.items[k]) o[k] = S.items[k]; return o; }, {}), meta: meta(S) });
      dirty = {}; metaDirty = false;
      if (beacon && navigator.sendBeacon) { navigator.sendBeacon("/api/progress", new Blob([body], { type: "application/json" })); return; }
      busy = true;
      fetch("/api/progress", { method: "PUT", credentials: "same-origin", headers: { "content-type": "application/json" }, body: body })
        .then(function (r) { if (!r.ok) throw r.status; }).catch(function () { ids.forEach(function (k) { dirty[k] = 1; }); metaDirty = true; })
        .then(function () { busy = false; });
    }
  };
  if (typeof module !== "undefined" && module.exports) module.exports = Sync; else window.Sync = Sync;
})();
