import { useState, useEffect, useRef } from "react"
import { Star } from "lucide-react"

function Testimonials() {

  const data = [
    { id: 1, text: "MyHygiene transformed my home completely.", color: "bg-blue-200" },
    { id: 2, text: "Top-notch service. I felt like royalty!", color: "bg-green-200" },
    { id: 3, text: "Fast and reliable. Highly recommend!", color: "bg-yellow-200" },
    { id: 4, text: "My office has never looked this clean.", color: "bg-purple-200" },
    { id: 5, text: "Absolutely worth every penny.", color: "bg-pink-200" },
    { id: 6, text: "They exceeded my expectations!", color: "bg-orange-200" },
    { id: 7, text: "Very professional staff.", color: "bg-cyan-200" },
    { id: 8, text: "My apartment smells amazing!", color: "bg-lime-200" },
    { id: 9, text: "Quick and detailed cleaning.", color: "bg-rose-200" },
    { id: 10, text: "Best cleaning service ever.", color: "bg-indigo-200" },
  ]

  const [items, setItems] = useState(data)
  const [isSliding, setIsSliding] = useState(false)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const containerRef = useRef()

  // AUTO SLIDE
  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {

      setActive(0)

      setTimeout(() => {
        setIsSliding(true)
      }, 800)

      setTimeout(() => {
        setItems(prev => {
          const first = prev[0]
          return [...prev.slice(1), first]
        })
        setIsSliding(false)
        setActive(-1)
      }, 1500)

    }, 4000)

    return () => clearInterval(interval)
  }, [paused])

  // DRAG / SWIPE
  let isDown = false
  let startX
  let scrollLeft

  const handleMouseDown = (e) => {
    isDown = true
    startX = e.pageX - containerRef.current.offsetLeft
    scrollLeft = containerRef.current.scrollLeft
    setPaused(true)
  }

  const handleMouseLeave = () => {
    isDown = false
    setPaused(false)
  }

  const handleMouseUp = () => {
    isDown = false
    setPaused(false)
  }

  const handleMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto scrollbar-hide"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >

      <div
        className={`flex gap-4 w-max transition-transform duration-700 ${
          isSliding ? "-translate-x-[240px]" : ""
        }`}
      >
        {items.map((item, index) => (
          <Card
            key={item.id}
            data={item}
            isFlipped={index === active}
          />
        ))}
      </div>

    </div>
  )
}


function Card({ data, isFlipped }) {

  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="w-full md:w-[220px] h-[220px] shrink-0 perspective cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${
          isFlipped || hovered ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* FRONT */}
        <div
          className={`absolute w-full h-full ${data.color} flex items-center justify-center rounded-xl`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src="/photos/Logo3.png" className="w-44" />
        </div>

        {/* BACK */}
        <div
          className="absolute w-full h-full bg-white flex flex-col items-center justify-center p-3 rounded-xl"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden"
          }}
        >
          <div className="flex mb-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>

          <p className="text-sm text-center">{data.text}</p>
        </div>

      </div>
    </div>
  )
}

export default Testimonials





function Dd(e, t) {
    for (var n = 0; n < t.length; n++) {
        const r = t[n];
        if (typeof r != "string" && !Array.isArray(r)) {
            for (const l in r)
                if (l !== "default" && !(l in e)) {
                    const o = Object.getOwnPropertyDescriptor(r, l);
                    o && Object.defineProperty(e, l, o.get ? o : {
                        enumerable: !0,
                        get: () => r[l]
                    })
                }
        }
    }
    return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
    }))
}
(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]'))
        r(l);
    new MutationObserver(l => {
        for (const o of l)
            if (o.type === "childList")
                for (const i of o.addedNodes)
                    i.tagName === "LINK" && i.rel === "modulepreload" && r(i)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(l) {
        const o = {};
        return l.integrity && (o.integrity = l.integrity),
        l.referrerPolicy && (o.referrerPolicy = l.referrerPolicy),
        l.crossOrigin === "use-credentials" ? o.credentials = "include" : l.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin",
        o
    }
    function r(l) {
        if (l.ep)
            return;
        l.ep = !0;
        const o = n(l);
        fetch(l.href, o)
    }
}
)();
const Zl = new Map
  , Es = new Map
  , wr = new Set
  , kr = new Set;
let Ns = new WeakMap;
function Hd(e) {
    let t = e.__REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t === void 0) {
        let o = 0;
        e.__REACT_DEVTOOLS_GLOBAL_HOOK__ = t = {
            renderers: new Map,
            supportsFiber: !0,
            inject: i => o++,
            onScheduleFiberRoot: (i, s, a) => {}
            ,
            onCommitFiberRoot: (i, s, a, c) => {}
            ,
            onCommitFiberUnmount() {}
        }
    }
    if (t.isDisabled) {
        console.warn("Something has shimmed the React DevTools global hook (__REACT_DEVTOOLS_GLOBAL_HOOK__). Fast Refresh is not compatible with this shim and will be disabled.");
        return
    }
    const n = t.inject;
    t.inject = function(o) {
        const i = n.apply(this, arguments);
        return typeof o.scheduleRefresh == "function" && typeof o.setRefreshHandler == "function" && Zl.set(i, o),
        i
    }
    ,
    t.renderers.forEach( (o, i) => {
        typeof o.scheduleRefresh == "function" && typeof o.setRefreshHandler == "function" && Zl.set(i, o)
    }
    );
    const r = t.onCommitFiberRoot
      , l = t.onScheduleFiberRoot || ( () => {}
    );
    t.onScheduleFiberRoot = function(o, i, s) {
        return kr.delete(i),
        Ns !== null && Ns.set(i, s),
        l.apply(this, arguments)
    }
    ,
    t.onCommitFiberRoot = function(o, i, s, a) {
        const c = Zl.get(o);
        if (c !== void 0) {
            Es.set(i, c);
            const m = i.current
              , h = m.alternate;
            if (h !== null) {
                const v = h.memoizedState != null && h.memoizedState.element != null && wr.has(i)
                  , y = m.memoizedState != null && m.memoizedState.element != null;
                !v && y ? (wr.add(i),
                kr.delete(i)) : v && y || (v && !y ? (wr.delete(i),
                a ? kr.add(i) : Es.delete(i)) : !v && !y && a && kr.add(i))
            } else
                wr.add(i)
        }
        return r.apply(this, arguments)
    }
}
window.__registerBeforePerformReactRefresh = e => {}
;
Hd(window);
window.$RefreshReg$ = () => {}
;
window.$RefreshSig$ = () => e => e;
const $d = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")()
  , Cs = __DEFINES__;
Object.keys(Cs).forEach(e => {
    const t = e.split(".");
    let n = $d;
    for (let r = 0; r < t.length; r++) {
        const l = t[r];
        r === t.length - 1 ? n[l] = Cs[e] : n = n[l] || (n[l] = {})
    }
}
);
class Ad {
    constructor(t) {
        this.connection = t,
        this.queue = []
    }
    send(t) {
        this.queue.push(t),
        this.flush()
    }
    flush() {
        this.connection.isReady() && (this.queue.forEach(t => this.connection.send(t)),
        this.queue = [])
    }
}
class Bd {
    constructor(t, n, r) {
        this.logger = t,
        this.importUpdatedModule = r,
        this.hotModulesMap = new Map,
        this.disposeMap = new Map,
        this.pruneMap = new Map,
        this.dataMap = new Map,
        this.customListenersMap = new Map,
        this.ctxToListenersMap = new Map,
        this.updateQueue = [],
        this.pendingUpdateQueue = !1,
        this.messenger = new Ad(n)
    }
    async notifyListeners(t, n) {
        const r = this.customListenersMap.get(t);
        r && await Promise.allSettled(r.map(l => l(n)))
    }
    clear() {
        this.hotModulesMap.clear(),
        this.disposeMap.clear(),
        this.pruneMap.clear(),
        this.dataMap.clear(),
        this.customListenersMap.clear(),
        this.ctxToListenersMap.clear()
    }
    async prunePaths(t) {
        await Promise.all(t.map(n => {
            const r = this.disposeMap.get(n);
            if (r)
                return r(this.dataMap.get(n))
        }
        )),
        t.forEach(n => {
            const r = this.pruneMap.get(n);
            r && r(this.dataMap.get(n))
        }
        )
    }
    warnFailedUpdate(t, n) {
        t.message.includes("fetch") || this.logger.error(t),
        this.logger.error(`[hmr] Failed to reload ${n}. This could be due to syntax errors or importing non-existent modules. (see errors above)`)
    }
    async queueUpdate(t) {
        if (this.updateQueue.push(this.fetchUpdate(t)),
        !this.pendingUpdateQueue) {
            this.pendingUpdateQueue = !0,
            await Promise.resolve(),
            this.pendingUpdateQueue = !1;
            const n = [...this.updateQueue];
            this.updateQueue = [],
            (await Promise.all(n)).forEach(r => r && r())
        }
    }
    async fetchUpdate(t) {
        const {path: n, acceptedPath: r} = t
          , l = this.hotModulesMap.get(n);
        if (!l)
            return;
        let o;
        const i = n === r
          , s = l.callbacks.filter( ({deps: a}) => a.includes(r));
        if (i || s.length > 0) {
            const a = this.disposeMap.get(r);
            a && await a(this.dataMap.get(r));
            try {
                o = await this.importUpdatedModule(t)
            } catch (c) {
                this.warnFailedUpdate(c, r)
            }
        }
        return () => {
            for (const {deps: c, fn: m} of s)
                m(c.map(h => h === r ? o : void 0));
            const a = i ? n : `${r} via ${n}`;
            this.logger.debug(`[vite] hot updated: ${a}`)
        }
    }
}
const Vd = __HMR_CONFIG_NAME__
  , Wd = __BASE__ || "/";
function se(e, t={}, ...n) {
    const r = document.createElement(e);
    for (const [l,o] of Object.entries(t))
        r.setAttribute(l, o);
    return r.append(...n),
    r
}
const bd = `
:host {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  --monospace: 'SFMono-Regular', Consolas,
  'Liberation Mono', Menlo, Courier, monospace;
  --red: #ff5555;
  --yellow: #e2aa53;
  --purple: #cfa4ff;
  --cyan: #2dd9da;
  --dim: #c9c9c9;

  --window-background: #181818;
  --window-color: #d8d8d8;
}

.backdrop {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin: 0;
  background: rgba(0, 0, 0, 0.66);
}

.window {
  font-family: var(--monospace);
  line-height: 1.5;
  max-width: 80vw;
  color: var(--window-color);
  box-sizing: border-box;
  margin: 30px auto;
  padding: 2.5vh 4vw;
  position: relative;
  background: var(--window-background);
  border-radius: 6px 6px 8px 8px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  overflow: hidden;
  border-top: 8px solid var(--red);
  direction: ltr;
  text-align: left;
}

pre {
  font-family: var(--monospace);
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 1em;
  overflow-x: scroll;
  scrollbar-width: none;
}

pre::-webkit-scrollbar {
  display: none;
}

pre.frame::-webkit-scrollbar {
  display: block;
  height: 5px;
}

pre.frame::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 5px;
}

pre.frame {
  scrollbar-width: thin;
}

.message {
  line-height: 1.3;
  font-weight: 600;
  white-space: pre-wrap;
}

.message-body {
  color: var(--red);
}

.plugin {
  color: var(--purple);
}

.file {
  color: var(--cyan);
  margin-bottom: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.frame {
  color: var(--yellow);
}

.stack {
  font-size: 13px;
  color: var(--dim);
}

.tip {
  font-size: 13px;
  color: #999;
  border-top: 1px dotted #999;
  padding-top: 13px;
  line-height: 1.8;
}

code {
  font-size: 13px;
  font-family: var(--monospace);
  color: var(--yellow);
}

.file-link {
  text-decoration: underline;
  cursor: pointer;
}

kbd {
  line-height: 1.5;
  font-family: ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: rgb(38, 40, 44);
  color: rgb(166, 167, 171);
  padding: 0.15rem 0.3rem;
  border-radius: 0.25rem;
  border-width: 0.0625rem 0.0625rem 0.1875rem;
  border-style: solid;
  border-color: rgb(54, 57, 64);
  border-image: initial;
}
`
  , Qd = () => se("div", {
    class: "backdrop",
    part: "backdrop"
}, se("div", {
    class: "window",
    part: "window"
}, se("pre", {
    class: "message",
    part: "message"
}, se("span", {
    class: "plugin",
    part: "plugin"
}), se("span", {
    class: "message-body",
    part: "message-body"
})), se("pre", {
    class: "file",
    part: "file"
}), se("pre", {
    class: "frame",
    part: "frame"
}), se("pre", {
    class: "stack",
    part: "stack"
}), se("div", {
    class: "tip",
    part: "tip"
}, "Click outside, press ", se("kbd", {}, "Esc"), " key, or fix the code to dismiss.", se("br"), "You can also disable this overlay by setting ", se("code", {
    part: "config-option-name"
}, "server.hmr.overlay"), " to ", se("code", {
    part: "config-option-value"
}, "false"), " in ", se("code", {
    part: "config-file-name"
}, Vd), ".")), se("style", {}, bd))
  , _s = /(?:[a-zA-Z]:\\|\/).*?:\d+:\d+/g
  , Jl = /^(?:>?\s*\d+\s+\|.*|\s+\|\s*\^.*)\r?\n/gm
  , {HTMLElement: Kd=class {
}
} = globalThis;
class lu extends Kd {
    constructor(t, n=!0) {
        var i;
        super(),
        this.root = this.attachShadow({
            mode: "open"
        }),
        this.root.appendChild(Qd()),
        Jl.lastIndex = 0;
        const r = t.frame && Jl.test(t.frame)
          , l = r ? t.message.replace(Jl, "") : t.message;
        t.plugin && this.text(".plugin", `[plugin:${t.plugin}] `),
        this.text(".message-body", l.trim());
        const [o] = (((i = t.loc) == null ? void 0 : i.file) || t.id || "unknown file").split("?");
        t.loc ? this.text(".file", `${o}:${t.loc.line}:${t.loc.column}`, n) : t.id && this.text(".file", o),
        r && this.text(".frame", t.frame.trim()),
        this.text(".stack", t.stack, n),
        this.root.querySelector(".window").addEventListener("click", s => {
            s.stopPropagation()
        }
        ),
        this.addEventListener("click", () => {
            this.close()
        }
        ),
        this.closeOnEsc = s => {
            (s.key === "Escape" || s.code === "Escape") && this.close()
        }
        ,
        document.addEventListener("keydown", this.closeOnEsc)
    }
    text(t, n, r=!1) {
        const l = this.root.querySelector(t);
        if (!r)
            l.textContent = n;
        else {
            let o = 0, i;
            for (_s.lastIndex = 0; i = _s.exec(n); ) {
                const {0: s, index: a} = i;
                if (a != null) {
                    const c = n.slice(o, a);
                    l.appendChild(document.createTextNode(c));
                    const m = document.createElement("a");
                    m.textContent = s,
                    m.className = "file-link",
                    m.onclick = () => {
                        fetch(new URL(`${Wd}__open-in-editor?file=${encodeURIComponent(s)}`,import.meta.url))
                    }
                    ,
                    l.appendChild(m),
                    o += c.length + s.length
                }
            }
        }
    }
    close() {
        var t;
        (t = this.parentNode) == null || t.removeChild(this),
        document.removeEventListener("keydown", this.closeOnEsc)
    }
}
const el = "vite-error-overlay"
  , {customElements: ql} = globalThis;
ql && !ql.get(el) && ql.define(el, lu);
console.debug("[vite] connecting...");
const Po = new URL(import.meta.url)
  , Gd = __SERVER_HOST__
  , Ps = __HMR_PROTOCOL__ || (Po.protocol === "https:" ? "wss" : "ws")
  , ou = __HMR_PORT__
  , Ls = `${__HMR_HOSTNAME__ || Po.hostname}:${ou || Po.port}${__HMR_BASE__}`
  , Rs = __HMR_DIRECT_TARGET__
  , Lo = __BASE__ || "/"
  , Yd = __WS_TOKEN__;
let Ge;
try {
    let e;
    ou || (e = () => {
        Ge = Ms(Ps, Rs, () => {
            const t = new URL(import.meta.url)
              , n = t.host + t.pathname.replace(/@vite\/client$/, "");
            console.error(`[vite] failed to connect to websocket.
your current setup:
  (browser) ${n} <--[HTTP]--> ${Gd} (server)
  (browser) ${Ls} <--[WebSocket (failing)]--> ${Rs} (server)
Check out your Vite / network configuration and https://vite.dev/config/server-options.html#server-hmr .`)
        }
        ),
        Ge.addEventListener("open", () => {
            console.info("[vite] Direct websocket connection fallback. Check out https://vite.dev/config/server-options.html#server-hmr to remove the previous connection error.")
        }
        , {
            once: !0
        })
    }
    ),
    Ge = Ms(Ps, Ls, e)
} catch (e) {
    console.error(`[vite] failed to connect to websocket (${e}). `)
}
function Ms(e, t, n) {
    const r = new WebSocket(`${e}://${t}?token=${Yd}`,"vite-hmr");
    let l = !1;
    return r.addEventListener("open", () => {
        l = !0,
        nt("vite:ws:connect", {
            webSocket: r
        })
    }
    , {
        once: !0
    }),
    r.addEventListener("message", async ({data: o}) => {
        Zd(JSON.parse(o))
    }
    ),
    r.addEventListener("close", async ({wasClean: o}) => {
        if (!o) {
            if (!l && n) {
                n();
                return
            }
            nt("vite:ws:disconnect", {
                webSocket: r
            }),
            Ar && (console.log("[vite] server connection lost. Polling for restart..."),
            await ef(e, t),
            location.reload())
        }
    }
    ),
    r
}
function zs(e) {
    const t = new URL(e,"http://vite.dev");
    return t.searchParams.delete("direct"),
    t.pathname + t.search
}
let Ts = !0;
const Os = new WeakSet
  , Xd = e => {
    let t;
    return () => {
        t && (clearTimeout(t),
        t = null),
        t = setTimeout( () => {
            location.reload()
        }
        , e)
    }
}
  , Ro = Xd(50)
  , $r = new Bd(console,{
    isReady: () => Ge && Ge.readyState === 1,
    send: e => Ge.send(e)
},async function({acceptedPath: t, timestamp: n, explicitImportRequired: r, isWithinCircularImport: l}) {
    const [o,i] = t.split("?")
      , s = import(Lo + o.slice(1) + `?${r ? "import&" : ""}t=${n}${i ? `&${i}` : ""}`);
    return l && s.catch( () => {
        console.info(`[hmr] ${t} failed to apply HMR as it's within a circular import. Reloading page to reset the execution order. To debug and break the circular import, you can run \`vite --debug hmr\` to log the circular dependency path if a file change triggered it.`),
        Ro()
    }
    ),
    await s
}
);
async function Zd(e) {
    switch (e.type) {
    case "connected":
        console.debug("[vite] connected."),
        $r.messenger.flush(),
        setInterval( () => {
            Ge.readyState === Ge.OPEN && Ge.send('{"type":"ping"}')
        }
        , __HMR_TIMEOUT__);
        break;
    case "update":
        if (nt("vite:beforeUpdate", e),
        Ar)
            if (Ts && qd()) {
                location.reload();
                return
            } else
                Is && iu(),
                Ts = !1;
        await Promise.all(e.updates.map(async t => {
            if (t.type === "js-update")
                return $r.queueUpdate(t);
            const {path: n, timestamp: r} = t
              , l = zs(n)
              , o = Array.from(document.querySelectorAll("link")).find(s => !Os.has(s) && zs(s.href).includes(l));
            if (!o)
                return;
            const i = `${Lo}${l.slice(1)}${l.includes("?") ? "&" : "?"}t=${r}`;
            return new Promise(s => {
                const a = o.cloneNode();
                a.href = new URL(i,o.href).href;
                const c = () => {
                    o.remove(),
                    console.debug(`[vite] css hot updated: ${l}`),
                    s()
                }
                ;
                a.addEventListener("load", c),
                a.addEventListener("error", c),
                Os.add(o),
                o.after(a)
            }
            )
        }
        )),
        nt("vite:afterUpdate", e);
        break;
    case "custom":
        {
            nt(e.event, e.data);
            break
        }
    case "full-reload":
        if (nt("vite:beforeFullReload", e),
        Ar)
            if (e.path && e.path.endsWith(".html")) {
                const t = decodeURI(location.pathname)
                  , n = Lo + e.path.slice(1);
                (t === n || e.path === "/index.html" || t.endsWith("/") && t + "index.html" === n) && Ro();
                return
            } else
                Ro();
        break;
    case "prune":
        nt("vite:beforePrune", e),
        await $r.prunePaths(e.paths);
        break;
    case "error":
        {
            if (nt("vite:error", e),
            Ar) {
                const t = e.err;
                Is ? Jd(t) : console.error(`[vite] Internal Server Error
${t.message}
${t.stack}`)
            }
            break
        }
    default:
        return e
    }
}
function nt(e, t) {
    $r.notifyListeners(e, t)
}
const Is = __HMR_ENABLE_OVERLAY__
  , Ar = "document"in globalThis;
function Jd(e) {
    iu(),
    document.body.appendChild(new lu(e))
}
function iu() {
    document.querySelectorAll(el).forEach(e => e.close())
}
function qd() {
    return document.querySelectorAll(el).length
}
async function ef(e, t, n=1e3) {
    const r = e === "wss" ? "https" : "http"
      , l = async () => {
        try {
            return await fetch(`${r}://${t}`, {
                mode: "no-cors",
                headers: {
                    Accept: "text/x-vite-ping"
                }
            }),
            !0
        } catch {}
        return !1
    }
    ;
    if (!await l())
        for (await Fs(n); ; )
            if (document.visibilityState === "visible") {
                if (await l())
                    break;
                await Fs(n)
            } else
                await tf()
}
function Fs(e) {
    return new Promise(t => setTimeout(t, e))
}
function tf() {
    return new Promise(e => {
        const t = async () => {
            document.visibilityState === "visible" && (e(),
            document.removeEventListener("visibilitychange", t))
        }
        ;
        document.addEventListener("visibilitychange", t)
    }
    )
}
const nf = new Map;
"document"in globalThis && document.querySelectorAll("style[data-vite-dev-id]").forEach(e => {
    nf.set(e.getAttribute("data-vite-dev-id"), e)
}
);
var ru;
"document"in globalThis && ((ru = document.querySelector("meta[property=csp-nonce]")) == null || ru.nonce);
function rf(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var su = {
    exports: {}
}
  , Ll = {}
  , au = {
    exports: {}
}
  , T = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dr = Symbol.for("react.element")
  , lf = Symbol.for("react.portal")
  , of = Symbol.for("react.fragment")
  , sf = Symbol.for("react.strict_mode")
  , af = Symbol.for("react.profiler")
  , uf = Symbol.for("react.provider")
  , cf = Symbol.for("react.context")
  , df = Symbol.for("react.forward_ref")
  , ff = Symbol.for("react.suspense")
  , pf = Symbol.for("react.memo")
  , hf = Symbol.for("react.lazy")
  , Us = Symbol.iterator;
function mf(e) {
    return e === null || typeof e != "object" ? null : (e = Us && e[Us] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var uu = {
    isMounted: function() {
        return !1
    },
    enqueueForceUpdate: function() {},
    enqueueReplaceState: function() {},
    enqueueSetState: function() {}
}
  , cu = Object.assign
  , du = {};
function yn(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = du,
    this.updater = n || uu
}
yn.prototype.isReactComponent = {};
yn.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
}
;
yn.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
}
;
function fu() {}
fu.prototype = yn.prototype;
function _i(e, t, n) {
    this.props = e,
    this.context = t,
    this.refs = du,
    this.updater = n || uu
}
var Pi = _i.prototype = new fu;
Pi.constructor = _i;
cu(Pi, yn.prototype);
Pi.isPureReactComponent = !0;
var Ds = Array.isArray
  , pu = Object.prototype.hasOwnProperty
  , Li = {
    current: null
}
  , hu = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function mu(e, t, n) {
    var r, l = {}, o = null, i = null;
    if (t != null)
        for (r in t.ref !== void 0 && (i = t.ref),
        t.key !== void 0 && (o = "" + t.key),
        t)
            pu.call(t, r) && !hu.hasOwnProperty(r) && (l[r] = t[r]);
    var s = arguments.length - 2;
    if (s === 1)
        l.children = n;
    else if (1 < s) {
        for (var a = Array(s), c = 0; c < s; c++)
            a[c] = arguments[c + 2];
        l.children = a
    }
    if (e && e.defaultProps)
        for (r in s = e.defaultProps,
        s)
            l[r] === void 0 && (l[r] = s[r]);
    return {
        $$typeof: dr,
        type: e,
        key: o,
        ref: i,
        props: l,
        _owner: Li.current
    }
}
function vf(e, t) {
    return {
        $$typeof: dr,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}
function Ri(e) {
    return typeof e == "object" && e !== null && e.$$typeof === dr
}
function gf(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var Hs = /\/+/g;
function eo(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? gf("" + e.key) : t.toString(36)
}
function Br(e, t, n, r, l) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var i = !1;
    if (e === null)
        i = !0;
    else
        switch (o) {
        case "string":
        case "number":
            i = !0;
            break;
        case "object":
            switch (e.$$typeof) {
            case dr:
            case lf:
                i = !0
            }
        }
    if (i)
        return i = e,
        l = l(i),
        e = r === "" ? "." + eo(i, 0) : r,
        Ds(l) ? (n = "",
        e != null && (n = e.replace(Hs, "$&/") + "/"),
        Br(l, t, n, "", function(c) {
            return c
        })) : l != null && (Ri(l) && (l = vf(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Hs, "$&/") + "/") + e)),
        t.push(l)),
        1;
    if (i = 0,
    r = r === "" ? "." : r + ":",
    Ds(e))
        for (var s = 0; s < e.length; s++) {
            o = e[s];
            var a = r + eo(o, s);
            i += Br(o, t, n, a, l)
        }
    else if (a = mf(e),
    typeof a == "function")
        for (e = a.call(e),
        s = 0; !(o = e.next()).done; )
            o = o.value,
            a = r + eo(o, s++),
            i += Br(o, t, n, a, l);
    else if (o === "object")
        throw t = String(e),
        Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return i
}
function Sr(e, t, n) {
    if (e == null)
        return e;
    var r = []
      , l = 0;
    return Br(e, r, "", "", function(o) {
        return t.call(n, o, l++)
    }),
    r
}
function yf(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(),
        t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1,
            e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2,
            e._result = n)
        }),
        e._status === -1 && (e._status = 0,
        e._result = t)
    }
    if (e._status === 1)
        return e._result.default;
    throw e._result
}
var de = {
    current: null
}
  , Vr = {
    transition: null
}
  , xf = {
    ReactCurrentDispatcher: de,
    ReactCurrentBatchConfig: Vr,
    ReactCurrentOwner: Li
};
function vu() {
    throw Error("act(...) is not supported in production builds of React.")
}
T.Children = {
    map: Sr,
    forEach: function(e, t, n) {
        Sr(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return Sr(e, function() {
            t++
        }),
        t
    },
    toArray: function(e) {
        return Sr(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!Ri(e))
            throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
T.Component = yn;
T.Fragment = of;
T.Profiler = af;
T.PureComponent = _i;
T.StrictMode = sf;
T.Suspense = ff;
T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xf;
T.act = vu;
T.cloneElement = function(e, t, n) {
    if (e == null)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = cu({}, e.props)
      , l = e.key
      , o = e.ref
      , i = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (o = t.ref,
        i = Li.current),
        t.key !== void 0 && (l = "" + t.key),
        e.type && e.type.defaultProps)
            var s = e.type.defaultProps;
        for (a in t)
            pu.call(t, a) && !hu.hasOwnProperty(a) && (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a])
    }
    var a = arguments.length - 2;
    if (a === 1)
        r.children = n;
    else if (1 < a) {
        s = Array(a);
        for (var c = 0; c < a; c++)
            s[c] = arguments[c + 2];
        r.children = s
    }
    return {
        $$typeof: dr,
        type: e.type,
        key: l,
        ref: o,
        props: r,
        _owner: i
    }
}
;
T.createContext = function(e) {
    return e = {
        $$typeof: cf,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    },
    e.Provider = {
        $$typeof: uf,
        _context: e
    },
    e.Consumer = e
}
;
T.createElement = mu;
T.createFactory = function(e) {
    var t = mu.bind(null, e);
    return t.type = e,
    t
}
;
T.createRef = function() {
    return {
        current: null
    }
}
;
T.forwardRef = function(e) {
    return {
        $$typeof: df,
        render: e
    }
}
;
T.isValidElement = Ri;
T.lazy = function(e) {
    return {
        $$typeof: hf,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: yf
    }
}
;
T.memo = function(e, t) {
    return {
        $$typeof: pf,
        type: e,
        compare: t === void 0 ? null : t
    }
}
;
T.startTransition = function(e) {
    var t = Vr.transition;
    Vr.transition = {};
    try {
        e()
    } finally {
        Vr.transition = t
    }
}
;
T.unstable_act = vu;
T.useCallback = function(e, t) {
    return de.current.useCallback(e, t)
}
;
T.useContext = function(e) {
    return de.current.useContext(e)
}
;
T.useDebugValue = function() {}
;
T.useDeferredValue = function(e) {
    return de.current.useDeferredValue(e)
}
;
T.useEffect = function(e, t) {
    return de.current.useEffect(e, t)
}
;
T.useId = function() {
    return de.current.useId()
}
;
T.useImperativeHandle = function(e, t, n) {
    return de.current.useImperativeHandle(e, t, n)
}
;
T.useInsertionEffect = function(e, t) {
    return de.current.useInsertionEffect(e, t)
}
;
T.useLayoutEffect = function(e, t) {
    return de.current.useLayoutEffect(e, t)
}
;
T.useMemo = function(e, t) {
    return de.current.useMemo(e, t)
}
;
T.useReducer = function(e, t, n) {
    return de.current.useReducer(e, t, n)
}
;
T.useRef = function(e) {
    return de.current.useRef(e)
}
;
T.useState = function(e) {
    return de.current.useState(e)
}
;
T.useSyncExternalStore = function(e, t, n) {
    return de.current.useSyncExternalStore(e, t, n)
}
;
T.useTransition = function() {
    return de.current.useTransition()
}
;
T.version = "18.3.1";
au.exports = T;
var k = au.exports;
const ct = rf(k)
  , wf = Dd({
    __proto__: null,
    default: ct
}, [k]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kf = k
  , Sf = Symbol.for("react.element")
  , jf = Symbol.for("react.fragment")
  , Ef = Object.prototype.hasOwnProperty
  , Nf = kf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
  , Cf = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
};
function gu(e, t, n) {
    var r, l = {}, o = null, i = null;
    n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
    for (r in t)
        Ef.call(t, r) && !Cf.hasOwnProperty(r) && (l[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps,
        t)
            l[r] === void 0 && (l[r] = t[r]);
    return {
        $$typeof: Sf,
        type: e,
        key: o,
        ref: i,
        props: l,
        _owner: Nf.current
    }
}
Ll.Fragment = jf;
Ll.jsx = gu;
Ll.jsxs = gu;
su.exports = Ll;
var u = su.exports
  , yu = {
    exports: {}
}
  , je = {}
  , xu = {
    exports: {}
}
  , wu = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(C, R) {
        var z = C.length;
        C.push(R);
        e: for (; 0 < z; ) {
            var Q = z - 1 >>> 1
              , Z = C[Q];
            if (0 < l(Z, R))
                C[Q] = R,
                C[z] = Z,
                z = Q;
            else
                break e
        }
    }
    function n(C) {
        return C.length === 0 ? null : C[0]
    }
    function r(C) {
        if (C.length === 0)
            return null;
        var R = C[0]
          , z = C.pop();
        if (z !== R) {
            C[0] = z;
            e: for (var Q = 0, Z = C.length, yr = Z >>> 1; Q < yr; ) {
                var Ct = 2 * (Q + 1) - 1
                  , Xl = C[Ct]
                  , _t = Ct + 1
                  , xr = C[_t];
                if (0 > l(Xl, z))
                    _t < Z && 0 > l(xr, Xl) ? (C[Q] = xr,
                    C[_t] = z,
                    Q = _t) : (C[Q] = Xl,
                    C[Ct] = z,
                    Q = Ct);
                else if (_t < Z && 0 > l(xr, z))
                    C[Q] = xr,
                    C[_t] = z,
                    Q = _t;
                else
                    break e
            }
        }
        return R
    }
    function l(C, R) {
        var z = C.sortIndex - R.sortIndex;
        return z !== 0 ? z : C.id - R.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var o = performance;
        e.unstable_now = function() {
            return o.now()
        }
    } else {
        var i = Date
          , s = i.now();
        e.unstable_now = function() {
            return i.now() - s
        }
    }
    var a = []
      , c = []
      , m = 1
      , h = null
      , v = 3
      , y = !1
      , x = !1
      , w = !1
      , E = typeof setTimeout == "function" ? setTimeout : null
      , p = typeof clearTimeout == "function" ? clearTimeout : null
      , d = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function f(C) {
        for (var R = n(c); R !== null; ) {
            if (R.callback === null)
                r(c);
            else if (R.startTime <= C)
                r(c),
                R.sortIndex = R.expirationTime,
                t(a, R);
            else
                break;
            R = n(c)
        }
    }
    function g(C) {
        if (w = !1,
        f(C),
        !x)
            if (n(a) !== null)
                x = !0,
                Gl(j);
            else {
                var R = n(c);
                R !== null && Yl(g, R.startTime - C)
            }
    }
    function j(C, R) {
        x = !1,
        w && (w = !1,
        p(L),
        L = -1),
        y = !0;
        var z = v;
        try {
            for (f(R),
            h = n(a); h !== null && (!(h.expirationTime > R) || C && !ye()); ) {
                var Q = h.callback;
                if (typeof Q == "function") {
                    h.callback = null,
                    v = h.priorityLevel;
                    var Z = Q(h.expirationTime <= R);
                    R = e.unstable_now(),
                    typeof Z == "function" ? h.callback = Z : h === n(a) && r(a),
                    f(R)
                } else
                    r(a);
                h = n(a)
            }
            if (h !== null)
                var yr = !0;
            else {
                var Ct = n(c);
                Ct !== null && Yl(g, Ct.startTime - R),
                yr = !1
            }
            return yr
        } finally {
            h = null,
            v = z,
            y = !1
        }
    }
    var _ = !1
      , P = null
      , L = -1
      , $ = 5
      , M = -1;
    function ye() {
        return !(e.unstable_now() - M < $)
    }
    function jn() {
        if (P !== null) {
            var C = e.unstable_now();
            M = C;
            var R = !0;
            try {
                R = P(!0, C)
            } finally {
                R ? En() : (_ = !1,
                P = null)
            }
        } else
            _ = !1
    }
    var En;
    if (typeof d == "function")
        En = function() {
            d(jn)
        }
        ;
    else if (typeof MessageChannel < "u") {
        var js = new MessageChannel
          , Ud = js.port2;
        js.port1.onmessage = jn,
        En = function() {
            Ud.postMessage(null)
        }
    } else
        En = function() {
            E(jn, 0)
        }
        ;
    function Gl(C) {
        P = C,
        _ || (_ = !0,
        En())
    }
    function Yl(C, R) {
        L = E(function() {
            C(e.unstable_now())
        }, R)
    }
    e.unstable_IdlePriority = 5,
    e.unstable_ImmediatePriority = 1,
    e.unstable_LowPriority = 4,
    e.unstable_NormalPriority = 3,
    e.unstable_Profiling = null,
    e.unstable_UserBlockingPriority = 2,
    e.unstable_cancelCallback = function(C) {
        C.callback = null
    }
    ,
    e.unstable_continueExecution = function() {
        x || y || (x = !0,
        Gl(j))
    }
    ,
    e.unstable_forceFrameRate = function(C) {
        0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : $ = 0 < C ? Math.floor(1e3 / C) : 5
    }
    ,
    e.unstable_getCurrentPriorityLevel = function() {
        return v
    }
    ,
    e.unstable_getFirstCallbackNode = function() {
        return n(a)
    }
    ,
    e.unstable_next = function(C) {
        switch (v) {
        case 1:
        case 2:
        case 3:
            var R = 3;
            break;
        default:
            R = v
        }
        var z = v;
        v = R;
        try {
            return C()
        } finally {
            v = z
        }
    }
    ,
    e.unstable_pauseExecution = function() {}
    ,
    e.unstable_requestPaint = function() {}
    ,
    e.unstable_runWithPriority = function(C, R) {
        switch (C) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            break;
        default:
            C = 3
        }
        var z = v;
        v = C;
        try {
            return R()
        } finally {
            v = z
        }
    }
    ,
    e.unstable_scheduleCallback = function(C, R, z) {
        var Q = e.unstable_now();
        switch (typeof z == "object" && z !== null ? (z = z.delay,
        z = typeof z == "number" && 0 < z ? Q + z : Q) : z = Q,
        C) {
        case 1:
            var Z = -1;
            break;
        case 2:
            Z = 250;
            break;
        case 5:
            Z = 1073741823;
            break;
        case 4:
            Z = 1e4;
            break;
        default:
            Z = 5e3
        }
        return Z = z + Z,
        C = {
            id: m++,
            callback: R,
            priorityLevel: C,
            startTime: z,
            expirationTime: Z,
            sortIndex: -1
        },
        z > Q ? (C.sortIndex = z,
        t(c, C),
        n(a) === null && C === n(c) && (w ? (p(L),
        L = -1) : w = !0,
        Yl(g, z - Q))) : (C.sortIndex = Z,
        t(a, C),
        x || y || (x = !0,
        Gl(j))),
        C
    }
    ,
    e.unstable_shouldYield = ye,
    e.unstable_wrapCallback = function(C) {
        var R = v;
        return function() {
            var z = v;
            v = R;
            try {
                return C.apply(this, arguments)
            } finally {
                v = z
            }
        }
    }
}
)(wu);
xu.exports = wu;
var _f = xu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pf = k
  , Se = _f;
function S(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var ku = new Set
  , Qn = {};
function $t(e, t) {
    cn(e, t),
    cn(e + "Capture", t)
}
function cn(e, t) {
    for (Qn[e] = t,
    e = 0; e < t.length; e++)
        ku.add(t[e])
}
var Xe = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u")
  , Mo = Object.prototype.hasOwnProperty
  , Lf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/
  , $s = {}
  , As = {};
function Rf(e) {
    return Mo.call(As, e) ? !0 : Mo.call($s, e) ? !1 : Lf.test(e) ? As[e] = !0 : ($s[e] = !0,
    !1)
}
function Mf(e, t, n, r) {
    if (n !== null && n.type === 0)
        return !1;
    switch (typeof t) {
    case "function":
    case "symbol":
        return !0;
    case "boolean":
        return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5),
        e !== "data-" && e !== "aria-");
    default:
        return !1
    }
}
function zf(e, t, n, r) {
    if (t === null || typeof t > "u" || Mf(e, t, n, r))
        return !0;
    if (r)
        return !1;
    if (n !== null)
        switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
        }
    return !1
}
function fe(e, t, n, r, l, o, i) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4,
    this.attributeName = r,
    this.attributeNamespace = l,
    this.mustUseProperty = n,
    this.propertyName = e,
    this.type = t,
    this.sanitizeURL = o,
    this.removeEmptyString = i
}
var ne = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    ne[e] = new fe(e,0,!1,e,null,!1,!1)
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
    var t = e[0];
    ne[t] = new fe(t,1,!1,e[1],null,!1,!1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    ne[e] = new fe(e,2,!1,e.toLowerCase(),null,!1,!1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    ne[e] = new fe(e,2,!1,e,null,!1,!1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    ne[e] = new fe(e,3,!1,e.toLowerCase(),null,!1,!1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    ne[e] = new fe(e,3,!0,e,null,!1,!1)
});
["capture", "download"].forEach(function(e) {
    ne[e] = new fe(e,4,!1,e,null,!1,!1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    ne[e] = new fe(e,6,!1,e,null,!1,!1)
});
["rowSpan", "start"].forEach(function(e) {
    ne[e] = new fe(e,5,!1,e.toLowerCase(),null,!1,!1)
});
var Mi = /[\-:]([a-z])/g;
function zi(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(Mi, zi);
    ne[t] = new fe(t,1,!1,e,null,!1,!1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(Mi, zi);
    ne[t] = new fe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(Mi, zi);
    ne[t] = new fe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    ne[e] = new fe(e,1,!1,e.toLowerCase(),null,!1,!1)
});
ne.xlinkHref = new fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);
["src", "href", "action", "formAction"].forEach(function(e) {
    ne[e] = new fe(e,1,!1,e.toLowerCase(),null,!0,!0)
});
function Ti(e, t, n, r) {
    var l = ne.hasOwnProperty(t) ? ne[t] : null;
    (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (zf(t, n, l, r) && (n = null),
    r || l === null ? Rf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName,
    r = l.attributeNamespace,
    n === null ? e.removeAttribute(t) : (l = l.type,
    n = l === 3 || l === 4 && n === !0 ? "" : "" + n,
    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var et = Pf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  , jr = Symbol.for("react.element")
  , bt = Symbol.for("react.portal")
  , Qt = Symbol.for("react.fragment")
  , Oi = Symbol.for("react.strict_mode")
  , zo = Symbol.for("react.profiler")
  , Su = Symbol.for("react.provider")
  , ju = Symbol.for("react.context")
  , Ii = Symbol.for("react.forward_ref")
  , To = Symbol.for("react.suspense")
  , Oo = Symbol.for("react.suspense_list")
  , Fi = Symbol.for("react.memo")
  , rt = Symbol.for("react.lazy")
  , Eu = Symbol.for("react.offscreen")
  , Bs = Symbol.iterator;
function Nn(e) {
    return e === null || typeof e != "object" ? null : (e = Bs && e[Bs] || e["@@iterator"],
    typeof e == "function" ? e : null)
}
var V = Object.assign, to;
function Tn(e) {
    if (to === void 0)
        try {
            throw Error()
        } catch (n) {
            var t = n.stack.trim().match(/\n( *(at )?)/);
            to = t && t[1] || ""
        }
    return `
` + to + e
}
var no = !1;
function ro(e, t) {
    if (!e || no)
        return "";
    no = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                throw Error()
            }
            ,
            Object.defineProperty(t.prototype, "props", {
                set: function() {
                    throw Error()
                }
            }),
            typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (c) {
                    var r = c
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (c) {
                    r = c
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (c) {
                r = c
            }
            e()
        }
    } catch (c) {
        if (c && r && typeof c.stack == "string") {
            for (var l = c.stack.split(`
`), o = r.stack.split(`
`), i = l.length - 1, s = o.length - 1; 1 <= i && 0 <= s && l[i] !== o[s]; )
                s--;
            for (; 1 <= i && 0 <= s; i--,
            s--)
                if (l[i] !== o[s]) {
                    if (i !== 1 || s !== 1)
                        do
                            if (i--,
                            s--,
                            0 > s || l[i] !== o[s]) {
                                var a = `
` + l[i].replace(" at new ", " at ");
                                return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)),
                                a
                            }
                        while (1 <= i && 0 <= s);
                    break
                }
        }
    } finally {
        no = !1,
        Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? Tn(e) : ""
}
function Tf(e) {
    switch (e.tag) {
    case 5:
        return Tn(e.type);
    case 16:
        return Tn("Lazy");
    case 13:
        return Tn("Suspense");
    case 19:
        return Tn("SuspenseList");
    case 0:
    case 2:
    case 15:
        return e = ro(e.type, !1),
        e;
    case 11:
        return e = ro(e.type.render, !1),
        e;
    case 1:
        return e = ro(e.type, !0),
        e;
    default:
        return ""
    }
}
function Io(e) {
    if (e == null)
        return null;
    if (typeof e == "function")
        return e.displayName || e.name || null;
    if (typeof e == "string")
        return e;
    switch (e) {
    case Qt:
        return "Fragment";
    case bt:
        return "Portal";
    case zo:
        return "Profiler";
    case Oi:
        return "StrictMode";
    case To:
        return "Suspense";
    case Oo:
        return "SuspenseList"
    }
    if (typeof e == "object")
        switch (e.$$typeof) {
        case ju:
            return (e.displayName || "Context") + ".Consumer";
        case Su:
            return (e._context.displayName || "Context") + ".Provider";
        case Ii:
            var t = e.render;
            return e = e.displayName,
            e || (e = t.displayName || t.name || "",
            e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"),
            e;
        case Fi:
            return t = e.displayName || null,
            t !== null ? t : Io(e.type) || "Memo";
        case rt:
            t = e._payload,
            e = e._init;
            try {
                return Io(e(t))
            } catch {}
        }
    return null
}
function Of(e) {
    var t = e.type;
    switch (e.tag) {
    case 24:
        return "Cache";
    case 9:
        return (t.displayName || "Context") + ".Consumer";
    case 10:
        return (t._context.displayName || "Context") + ".Provider";
    case 18:
        return "DehydratedFragment";
    case 11:
        return e = t.render,
        e = e.displayName || e.name || "",
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
        return "Fragment";
    case 5:
        return t;
    case 4:
        return "Portal";
    case 3:
        return "Root";
    case 6:
        return "Text";
    case 16:
        return Io(t);
    case 8:
        return t === Oi ? "StrictMode" : "Mode";
    case 22:
        return "Offscreen";
    case 12:
        return "Profiler";
    case 21:
        return "Scope";
    case 13:
        return "Suspense";
    case 19:
        return "SuspenseList";
    case 25:
        return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
        if (typeof t == "function")
            return t.displayName || t.name || null;
        if (typeof t == "string")
            return t
    }
    return null
}
function wt(e) {
    switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
        return e;
    case "object":
        return e;
    default:
        return ""
    }
}
function Nu(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}
function If(e) {
    var t = Nu(e) ? "checked" : "value"
      , n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t)
      , r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var l = n.get
          , o = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return l.call(this)
            },
            set: function(i) {
                r = "" + i,
                o.call(this, i)
            }
        }),
        Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }),
        {
            getValue: function() {
                return r
            },
            setValue: function(i) {
                r = "" + i
            },
            stopTracking: function() {
                e._valueTracker = null,
                delete e[t]
            }
        }
    }
}
function Er(e) {
    e._valueTracker || (e._valueTracker = If(e))
}
function Cu(e) {
    if (!e)
        return !1;
    var t = e._valueTracker;
    if (!t)
        return !0;
    var n = t.getValue()
      , r = "";
    return e && (r = Nu(e) ? e.checked ? "true" : "false" : e.value),
    e = r,
    e !== n ? (t.setValue(e),
    !0) : !1
}
function tl(e) {
    if (e = e || (typeof document < "u" ? document : void 0),
    typeof e > "u")
        return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}
function Fo(e, t) {
    var n = t.checked;
    return V({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}
function Vs(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue
      , r = t.checked != null ? t.checked : t.defaultChecked;
    n = wt(t.value != null ? t.value : n),
    e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}
function _u(e, t) {
    t = t.checked,
    t != null && Ti(e, "checked", t, !1)
}
function Uo(e, t) {
    _u(e, t);
    var n = wt(t.value)
      , r = t.type;
    if (n != null)
        r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? Do(e, t.type, n) : t.hasOwnProperty("defaultValue") && Do(e, t.type, wt(t.defaultValue)),
    t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}
function Ws(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null))
            return;
        t = "" + e._wrapperState.initialValue,
        n || t === e.value || (e.value = t),
        e.defaultValue = t
    }
    n = e.name,
    n !== "" && (e.name = ""),
    e.defaultChecked = !!e._wrapperState.initialChecked,
    n !== "" && (e.name = n)
}
function Do(e, t, n) {
    (t !== "number" || tl(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var On = Array.isArray;
function rn(e, t, n, r) {
    if (e = e.options,
    t) {
        t = {};
        for (var l = 0; l < n.length; l++)
            t["$" + n[l]] = !0;
        for (n = 0; n < e.length; n++)
            l = t.hasOwnProperty("$" + e[n].value),
            e[n].selected !== l && (e[n].selected = l),
            l && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + wt(n),
        t = null,
        l = 0; l < e.length; l++) {
            if (e[l].value === n) {
                e[l].selected = !0,
                r && (e[l].defaultSelected = !0);
                return
            }
            t !== null || e[l].disabled || (t = e[l])
        }
        t !== null && (t.selected = !0)
    }
}
function Ho(e, t) {
    if (t.dangerouslySetInnerHTML != null)
        throw Error(S(91));
    return V({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}
function bs(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children,
        t = t.defaultValue,
        n != null) {
            if (t != null)
                throw Error(S(92));
            if (On(n)) {
                if (1 < n.length)
                    throw Error(S(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""),
        n = t
    }
    e._wrapperState = {
        initialValue: wt(n)
    }
}
function Pu(e, t) {
    var n = wt(t.value)
      , r = wt(t.defaultValue);
    n != null && (n = "" + n,
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r)
}
function Qs(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}
function Lu(e) {
    switch (e) {
    case "svg":
        return "http://www.w3.org/2000/svg";
    case "math":
        return "http://www.w3.org/1998/Math/MathML";
    default:
        return "http://www.w3.org/1999/xhtml"
    }
}
function $o(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? Lu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var Nr, Ru = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, l)
        })
    }
    : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML"in e)
        e.innerHTML = t;
    else {
        for (Nr = Nr || document.createElement("div"),
        Nr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
        t = Nr.firstChild; e.firstChild; )
            e.removeChild(e.firstChild);
        for (; t.firstChild; )
            e.appendChild(t.firstChild)
    }
});
function Kn(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var Un = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
}
  , Ff = ["Webkit", "ms", "Moz", "O"];
Object.keys(Un).forEach(function(e) {
    Ff.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1),
        Un[t] = Un[e]
    })
});
function Mu(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Un.hasOwnProperty(e) && Un[e] ? ("" + t).trim() : t + "px"
}
function zu(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0
              , l = Mu(n, t[n], r);
            n === "float" && (n = "cssFloat"),
            r ? e.setProperty(n, l) : e[n] = l
        }
}
var Uf = V({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});
function Ao(e, t) {
    if (t) {
        if (Uf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
            throw Error(S(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null)
                throw Error(S(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html"in t.dangerouslySetInnerHTML))
                throw Error(S(61))
        }
        if (t.style != null && typeof t.style != "object")
            throw Error(S(62))
    }
}
function Bo(e, t) {
    if (e.indexOf("-") === -1)
        return typeof t.is == "string";
    switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
        return !1;
    default:
        return !0
    }
}
var Vo = null;
function Ui(e) {
    return e = e.target || e.srcElement || window,
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
}
var Wo = null
  , ln = null
  , on = null;
function Ks(e) {
    if (e = hr(e)) {
        if (typeof Wo != "function")
            throw Error(S(280));
        var t = e.stateNode;
        t && (t = Ol(t),
        Wo(e.stateNode, e.type, t))
    }
}
function Tu(e) {
    ln ? on ? on.push(e) : on = [e] : ln = e
}
function Ou() {
    if (ln) {
        var e = ln
          , t = on;
        if (on = ln = null,
        Ks(e),
        t)
            for (e = 0; e < t.length; e++)
                Ks(t[e])
    }
}
function Iu(e, t) {
    return e(t)
}
function Fu() {}
var lo = !1;
function Uu(e, t, n) {
    if (lo)
        return e(t, n);
    lo = !0;
    try {
        return Iu(e, t, n)
    } finally {
        lo = !1,
        (ln !== null || on !== null) && (Fu(),
        Ou())
    }
}
function Gn(e, t) {
    var n = e.stateNode;
    if (n === null)
        return null;
    var r = Ol(n);
    if (r === null)
        return null;
    n = r[t];
    e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
        (r = !r.disabled) || (e = e.type,
        r = !(e === "button" || e === "input" || e === "select" || e === "textarea")),
        e = !r;
        break e;
    default:
        e = !1
    }
    if (e)
        return null;
    if (n && typeof n != "function")
        throw Error(S(231, t, typeof n));
    return n
}
var bo = !1;
if (Xe)
    try {
        var Cn = {};
        Object.defineProperty(Cn, "passive", {
            get: function() {
                bo = !0
            }
        }),
        window.addEventListener("test", Cn, Cn),
        window.removeEventListener("test", Cn, Cn)
    } catch {
        bo = !1
    }
function Df(e, t, n, r, l, o, i, s, a) {
    var c = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, c)
    } catch (m) {
        this.onError(m)
    }
}
var Dn = !1
  , nl = null
  , rl = !1
  , Qo = null
  , Hf = {
    onError: function(e) {
        Dn = !0,
        nl = e
    }
};
function $f(e, t, n, r, l, o, i, s, a) {
    Dn = !1,
    nl = null,
    Df.apply(Hf, arguments)
}
function Af(e, t, n, r, l, o, i, s, a) {
    if ($f.apply(this, arguments),
    Dn) {
        if (Dn) {
            var c = nl;
            Dn = !1,
            nl = null
        } else
            throw Error(S(198));
        rl || (rl = !0,
        Qo = c)
    }
}
function At(e) {
    var t = e
      , n = e;
    if (e.alternate)
        for (; t.return; )
            t = t.return;
    else {
        e = t;
        do
            t = e,
            t.flags & 4098 && (n = t.return),
            e = t.return;
        while (e)
    }
    return t.tag === 3 ? n : null
}
function Du(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate,
        e !== null && (t = e.memoizedState)),
        t !== null)
            return t.dehydrated
    }
    return null
}
function Gs(e) {
    if (At(e) !== e)
        throw Error(S(188))
}
function Bf(e) {
    var t = e.alternate;
    if (!t) {
        if (t = At(e),
        t === null)
            throw Error(S(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t; ; ) {
        var l = n.return;
        if (l === null)
            break;
        var o = l.alternate;
        if (o === null) {
            if (r = l.return,
            r !== null) {
                n = r;
                continue
            }
            break
        }
        if (l.child === o.child) {
            for (o = l.child; o; ) {
                if (o === n)
                    return Gs(l),
                    e;
                if (o === r)
                    return Gs(l),
                    t;
                o = o.sibling
            }
            throw Error(S(188))
        }
        if (n.return !== r.return)
            n = l,
            r = o;
        else {
            for (var i = !1, s = l.child; s; ) {
                if (s === n) {
                    i = !0,
                    n = l,
                    r = o;
                    break
                }
                if (s === r) {
                    i = !0,
                    r = l,
                    n = o;
                    break
                }
                s = s.sibling
            }
            if (!i) {
                for (s = o.child; s; ) {
                    if (s === n) {
                        i = !0,
                        n = o,
                        r = l;
                        break
                    }
                    if (s === r) {
                        i = !0,
                        r = o,
                        n = l;
                        break
                    }
                    s = s.sibling
                }
                if (!i)
                    throw Error(S(189))
            }
        }
        if (n.alternate !== r)
            throw Error(S(190))
    }
    if (n.tag !== 3)
        throw Error(S(188));
    return n.stateNode.current === n ? e : t
}
function Hu(e) {
    return e = Bf(e),
    e !== null ? $u(e) : null
}
function $u(e) {
    if (e.tag === 5 || e.tag === 6)
        return e;
    for (e = e.child; e !== null; ) {
        var t = $u(e);
        if (t !== null)
            return t;
        e = e.sibling
    }
    return null
}
var Au = Se.unstable_scheduleCallback
  , Ys = Se.unstable_cancelCallback
  , Vf = Se.unstable_shouldYield
  , Wf = Se.unstable_requestPaint
  , K = Se.unstable_now
  , bf = Se.unstable_getCurrentPriorityLevel
  , Di = Se.unstable_ImmediatePriority
  , Bu = Se.unstable_UserBlockingPriority
  , ll = Se.unstable_NormalPriority
  , Qf = Se.unstable_LowPriority
  , Vu = Se.unstable_IdlePriority
  , Rl = null
  , Ae = null;
function Kf(e) {
    if (Ae && typeof Ae.onCommitFiberRoot == "function")
        try {
            Ae.onCommitFiberRoot(Rl, e, void 0, (e.current.flags & 128) === 128)
        } catch {}
}
var Ie = Math.clz32 ? Math.clz32 : Xf
  , Gf = Math.log
  , Yf = Math.LN2;
function Xf(e) {
    return e >>>= 0,
    e === 0 ? 32 : 31 - (Gf(e) / Yf | 0) | 0
}
var Cr = 64
  , _r = 4194304;
function In(e) {
    switch (e & -e) {
    case 1:
        return 1;
    case 2:
        return 2;
    case 4:
        return 4;
    case 8:
        return 8;
    case 16:
        return 16;
    case 32:
        return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return e & 130023424;
    case 134217728:
        return 134217728;
    case 268435456:
        return 268435456;
    case 536870912:
        return 536870912;
    case 1073741824:
        return 1073741824;
    default:
        return e
    }
}
function ol(e, t) {
    var n = e.pendingLanes;
    if (n === 0)
        return 0;
    var r = 0
      , l = e.suspendedLanes
      , o = e.pingedLanes
      , i = n & 268435455;
    if (i !== 0) {
        var s = i & ~l;
        s !== 0 ? r = In(s) : (o &= i,
        o !== 0 && (r = In(o)))
    } else
        i = n & ~l,
        i !== 0 ? r = In(i) : o !== 0 && (r = In(o));
    if (r === 0)
        return 0;
    if (t !== 0 && t !== r && !(t & l) && (l = r & -r,
    o = t & -t,
    l >= o || l === 16 && (o & 4194240) !== 0))
        return t;
    if (r & 4 && (r |= n & 16),
    t = e.entangledLanes,
    t !== 0)
        for (e = e.entanglements,
        t &= r; 0 < t; )
            n = 31 - Ie(t),
            l = 1 << n,
            r |= e[n],
            t &= ~l;
    return r
}
function Zf(e, t) {
    switch (e) {
    case 1:
    case 2:
    case 4:
        return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
        return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
        return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
        return -1;
    default:
        return -1
    }
}
function Jf(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
        var i = 31 - Ie(o)
          , s = 1 << i
          , a = l[i];
        a === -1 ? (!(s & n) || s & r) && (l[i] = Zf(s, t)) : a <= t && (e.expiredLanes |= s),
        o &= ~s
    }
}
function Ko(e) {
    return e = e.pendingLanes & -1073741825,
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}
function Wu() {
    var e = Cr;
    return Cr <<= 1,
    !(Cr & 4194240) && (Cr = 64),
    e
}
function oo(e) {
    for (var t = [], n = 0; 31 > n; n++)
        t.push(e);
    return t
}
function fr(e, t, n) {
    e.pendingLanes |= t,
    t !== 536870912 && (e.suspendedLanes = 0,
    e.pingedLanes = 0),
    e = e.eventTimes,
    t = 31 - Ie(t),
    e[t] = n
}
function qf(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t,
    e.suspendedLanes = 0,
    e.pingedLanes = 0,
    e.expiredLanes &= t,
    e.mutableReadLanes &= t,
    e.entangledLanes &= t,
    t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n; ) {
        var l = 31 - Ie(n)
          , o = 1 << l;
        t[l] = 0,
        r[l] = -1,
        e[l] = -1,
        n &= ~o
    }
}
function Hi(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
        var r = 31 - Ie(n)
          , l = 1 << r;
        l & t | e[r] & t && (e[r] |= t),
        n &= ~l
    }
}
var I = 0;
function bu(e) {
    return e &= -e,
    1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var Qu, $i, Ku, Gu, Yu, Go = !1, Pr = [], dt = null, ft = null, pt = null, Yn = new Map, Xn = new Map, ot = [], ep = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Xs(e, t) {
    switch (e) {
    case "focusin":
    case "focusout":
        dt = null;
        break;
    case "dragenter":
    case "dragleave":
        ft = null;
        break;
    case "mouseover":
    case "mouseout":
        pt = null;
        break;
    case "pointerover":
    case "pointerout":
        Yn.delete(t.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        Xn.delete(t.pointerId)
    }
}
function _n(e, t, n, r, l, o) {
    return e === null || e.nativeEvent !== o ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [l]
    },
    t !== null && (t = hr(t),
    t !== null && $i(t)),
    e) : (e.eventSystemFlags |= r,
    t = e.targetContainers,
    l !== null && t.indexOf(l) === -1 && t.push(l),
    e)
}
function tp(e, t, n, r, l) {
    switch (t) {
    case "focusin":
        return dt = _n(dt, e, t, n, r, l),
        !0;
    case "dragenter":
        return ft = _n(ft, e, t, n, r, l),
        !0;
    case "mouseover":
        return pt = _n(pt, e, t, n, r, l),
        !0;
    case "pointerover":
        var o = l.pointerId;
        return Yn.set(o, _n(Yn.get(o) || null, e, t, n, r, l)),
        !0;
    case "gotpointercapture":
        return o = l.pointerId,
        Xn.set(o, _n(Xn.get(o) || null, e, t, n, r, l)),
        !0
    }
    return !1
}
function Xu(e) {
    var t = Rt(e.target);
    if (t !== null) {
        var n = At(t);
        if (n !== null) {
            if (t = n.tag,
            t === 13) {
                if (t = Du(n),
                t !== null) {
                    e.blockedOn = t,
                    Yu(e.priority, function() {
                        Ku(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}
function Wr(e) {
    if (e.blockedOn !== null)
        return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Yo(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type,n);
            Vo = r,
            n.target.dispatchEvent(r),
            Vo = null
        } else
            return t = hr(n),
            t !== null && $i(t),
            e.blockedOn = n,
            !1;
        t.shift()
    }
    return !0
}
function Zs(e, t, n) {
    Wr(e) && n.delete(t)
}
function np() {
    Go = !1,
    dt !== null && Wr(dt) && (dt = null),
    ft !== null && Wr(ft) && (ft = null),
    pt !== null && Wr(pt) && (pt = null),
    Yn.forEach(Zs),
    Xn.forEach(Zs)
}
function Pn(e, t) {
    e.blockedOn === t && (e.blockedOn = null,
    Go || (Go = !0,
    Se.unstable_scheduleCallback(Se.unstable_NormalPriority, np)))
}
function Zn(e) {
    function t(l) {
        return Pn(l, e)
    }
    if (0 < Pr.length) {
        Pn(Pr[0], e);
        for (var n = 1; n < Pr.length; n++) {
            var r = Pr[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (dt !== null && Pn(dt, e),
    ft !== null && Pn(ft, e),
    pt !== null && Pn(pt, e),
    Yn.forEach(t),
    Xn.forEach(t),
    n = 0; n < ot.length; n++)
        r = ot[n],
        r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < ot.length && (n = ot[0],
    n.blockedOn === null); )
        Xu(n),
        n.blockedOn === null && ot.shift()
}
var sn = et.ReactCurrentBatchConfig
  , il = !0;
function rp(e, t, n, r) {
    var l = I
      , o = sn.transition;
    sn.transition = null;
    try {
        I = 1,
        Ai(e, t, n, r)
    } finally {
        I = l,
        sn.transition = o
    }
}
function lp(e, t, n, r) {
    var l = I
      , o = sn.transition;
    sn.transition = null;
    try {
        I = 4,
        Ai(e, t, n, r)
    } finally {
        I = l,
        sn.transition = o
    }
}
function Ai(e, t, n, r) {
    if (il) {
        var l = Yo(e, t, n, r);
        if (l === null)
            vo(e, t, r, sl, n),
            Xs(e, r);
        else if (tp(l, e, t, n, r))
            r.stopPropagation();
        else if (Xs(e, r),
        t & 4 && -1 < ep.indexOf(e)) {
            for (; l !== null; ) {
                var o = hr(l);
                if (o !== null && Qu(o),
                o = Yo(e, t, n, r),
                o === null && vo(e, t, r, sl, n),
                o === l)
                    break;
                l = o
            }
            l !== null && r.stopPropagation()
        } else
            vo(e, t, r, null, n)
    }
}
var sl = null;
function Yo(e, t, n, r) {
    if (sl = null,
    e = Ui(r),
    e = Rt(e),
    e !== null)
        if (t = At(e),
        t === null)
            e = null;
        else if (n = t.tag,
        n === 13) {
            if (e = Du(t),
            e !== null)
                return e;
            e = null
        } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
                return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null
        } else
            t !== e && (e = null);
    return sl = e,
    null
}
function Zu(e) {
    switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
        return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
        return 4;
    case "message":
        switch (bf()) {
        case Di:
            return 1;
        case Bu:
            return 4;
        case ll:
        case Qf:
            return 16;
        case Vu:
            return 536870912;
        default:
            return 16
        }
    default:
        return 16
    }
}
var st = null
  , Bi = null
  , br = null;
function Ju() {
    if (br)
        return br;
    var e, t = Bi, n = t.length, r, l = "value"in st ? st.value : st.textContent, o = l.length;
    for (e = 0; e < n && t[e] === l[e]; e++)
        ;
    var i = n - e;
    for (r = 1; r <= i && t[n - r] === l[o - r]; r++)
        ;
    return br = l.slice(e, 1 < r ? 1 - r : void 0)
}
function Qr(e) {
    var t = e.keyCode;
    return "charCode"in e ? (e = e.charCode,
    e === 0 && t === 13 && (e = 13)) : e = t,
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
}
function Lr() {
    return !0
}
function Js() {
    return !1
}
function Ee(e) {
    function t(n, r, l, o, i) {
        this._reactName = n,
        this._targetInst = l,
        this.type = r,
        this.nativeEvent = o,
        this.target = i,
        this.currentTarget = null;
        for (var s in e)
            e.hasOwnProperty(s) && (n = e[s],
            this[s] = n ? n(o) : o[s]);
        return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Lr : Js,
        this.isPropagationStopped = Js,
        this
    }
    return V(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1),
            this.isDefaultPrevented = Lr)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
            this.isPropagationStopped = Lr)
        },
        persist: function() {},
        isPersistent: Lr
    }),
    t
}
var xn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
        return e.timeStamp || Date.now()
    },
    defaultPrevented: 0,
    isTrusted: 0
}, Vi = Ee(xn), pr = V({}, xn, {
    view: 0,
    detail: 0
}), op = Ee(pr), io, so, Ln, Ml = V({}, pr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Wi,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
    },
    movementX: function(e) {
        return "movementX"in e ? e.movementX : (e !== Ln && (Ln && e.type === "mousemove" ? (io = e.screenX - Ln.screenX,
        so = e.screenY - Ln.screenY) : so = io = 0,
        Ln = e),
        io)
    },
    movementY: function(e) {
        return "movementY"in e ? e.movementY : so
    }
}), qs = Ee(Ml), ip = V({}, Ml, {
    dataTransfer: 0
}), sp = Ee(ip), ap = V({}, pr, {
    relatedTarget: 0
}), ao = Ee(ap), up = V({}, xn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
}), cp = Ee(up), dp = V({}, xn, {
    clipboardData: function(e) {
        return "clipboardData"in e ? e.clipboardData : window.clipboardData
    }
}), fp = Ee(dp), pp = V({}, xn, {
    data: 0
}), ea = Ee(pp), hp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
}, mp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
}, vp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};
function gp(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = vp[e]) ? !!t[e] : !1
}
function Wi() {
    return gp
}
var yp = V({}, pr, {
    key: function(e) {
        if (e.key) {
            var t = hp[e.key] || e.key;
            if (t !== "Unidentified")
                return t
        }
        return e.type === "keypress" ? (e = Qr(e),
        e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? mp[e.keyCode] || "Unidentified" : ""
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Wi,
    charCode: function(e) {
        return e.type === "keypress" ? Qr(e) : 0
    },
    keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    },
    which: function(e) {
        return e.type === "keypress" ? Qr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
    }
})
  , xp = Ee(yp)
  , wp = V({}, Ml, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
})
  , ta = Ee(wp)
  , kp = V({}, pr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Wi
})
  , Sp = Ee(kp)
  , jp = V({}, xn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
})
  , Ep = Ee(jp)
  , Np = V({}, Ml, {
    deltaX: function(e) {
        return "deltaX"in e ? e.deltaX : "wheelDeltaX"in e ? -e.wheelDeltaX : 0
    },
    deltaY: function(e) {
        return "deltaY"in e ? e.deltaY : "wheelDeltaY"in e ? -e.wheelDeltaY : "wheelDelta"in e ? -e.wheelDelta : 0
    },
    deltaZ: 0,
    deltaMode: 0
})
  , Cp = Ee(Np)
  , _p = [9, 13, 27, 32]
  , bi = Xe && "CompositionEvent"in window
  , Hn = null;
Xe && "documentMode"in document && (Hn = document.documentMode);
var Pp = Xe && "TextEvent"in window && !Hn
  , qu = Xe && (!bi || Hn && 8 < Hn && 11 >= Hn)
  , na = " "
  , ra = !1;
function ec(e, t) {
    switch (e) {
    case "keyup":
        return _p.indexOf(t.keyCode) !== -1;
    case "keydown":
        return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
        return !0;
    default:
        return !1
    }
}
function tc(e) {
    return e = e.detail,
    typeof e == "object" && "data"in e ? e.data : null
}
var Kt = !1;
function Lp(e, t) {
    switch (e) {
    case "compositionend":
        return tc(t);
    case "keypress":
        return t.which !== 32 ? null : (ra = !0,
        na);
    case "textInput":
        return e = t.data,
        e === na && ra ? null : e;
    default:
        return null
    }
}
function Rp(e, t) {
    if (Kt)
        return e === "compositionend" || !bi && ec(e, t) ? (e = Ju(),
        br = Bi = st = null,
        Kt = !1,
        e) : null;
    switch (e) {
    case "paste":
        return null;
    case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
                return t.char;
            if (t.which)
                return String.fromCharCode(t.which)
        }
        return null;
    case "compositionend":
        return qu && t.locale !== "ko" ? null : t.data;
    default:
        return null
    }
}
var Mp = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};
function la(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Mp[e.type] : t === "textarea"
}
function nc(e, t, n, r) {
    Tu(r),
    t = al(t, "onChange"),
    0 < t.length && (n = new Vi("onChange","change",null,n,r),
    e.push({
        event: n,
        listeners: t
    }))
}
var $n = null
  , Jn = null;
function zp(e) {
    pc(e, 0)
}
function zl(e) {
    var t = Xt(e);
    if (Cu(t))
        return e
}
function Tp(e, t) {
    if (e === "change")
        return t
}
var rc = !1;
if (Xe) {
    var uo;
    if (Xe) {
        var co = "oninput"in document;
        if (!co) {
            var oa = document.createElement("div");
            oa.setAttribute("oninput", "return;"),
            co = typeof oa.oninput == "function"
        }
        uo = co
    } else
        uo = !1;
    rc = uo && (!document.documentMode || 9 < document.documentMode)
}
function ia() {
    $n && ($n.detachEvent("onpropertychange", lc),
    Jn = $n = null)
}
function lc(e) {
    if (e.propertyName === "value" && zl(Jn)) {
        var t = [];
        nc(t, Jn, e, Ui(e)),
        Uu(zp, t)
    }
}
function Op(e, t, n) {
    e === "focusin" ? (ia(),
    $n = t,
    Jn = n,
    $n.attachEvent("onpropertychange", lc)) : e === "focusout" && ia()
}
function Ip(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return zl(Jn)
}
function Fp(e, t) {
    if (e === "click")
        return zl(t)
}
function Up(e, t) {
    if (e === "input" || e === "change")
        return zl(t)
}
function Dp(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var Ue = typeof Object.is == "function" ? Object.is : Dp;
function qn(e, t) {
    if (Ue(e, t))
        return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
    var n = Object.keys(e)
      , r = Object.keys(t);
    if (n.length !== r.length)
        return !1;
    for (r = 0; r < n.length; r++) {
        var l = n[r];
        if (!Mo.call(t, l) || !Ue(e[l], t[l]))
            return !1
    }
    return !0
}
function sa(e) {
    for (; e && e.firstChild; )
        e = e.firstChild;
    return e
}
function aa(e, t) {
    var n = sa(e);
    e = 0;
    for (var r; n; ) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length,
            e <= t && r >= t)
                return {
                    node: n,
                    offset: t - e
                };
            e = r
        }
        e: {
            for (; n; ) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = sa(n)
    }
}
function oc(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? oc(e, t.parentNode) : "contains"in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}
function ic() {
    for (var e = window, t = tl(); t instanceof e.HTMLIFrameElement; ) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n)
            e = t.contentWindow;
        else
            break;
        t = tl(e.document)
    }
    return t
}
function Qi(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}
function Hp(e) {
    var t = ic()
      , n = e.focusedElem
      , r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && oc(n.ownerDocument.documentElement, n)) {
        if (r !== null && Qi(n)) {
            if (t = r.start,
            e = r.end,
            e === void 0 && (e = t),
            "selectionStart"in n)
                n.selectionStart = t,
                n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window,
            e.getSelection) {
                e = e.getSelection();
                var l = n.textContent.length
                  , o = Math.min(r.start, l);
                r = r.end === void 0 ? o : Math.min(r.end, l),
                !e.extend && o > r && (l = r,
                r = o,
                o = l),
                l = aa(n, o);
                var i = aa(n, r);
                l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(),
                t.setStart(l.node, l.offset),
                e.removeAllRanges(),
                o > r ? (e.addRange(t),
                e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset),
                e.addRange(t)))
            }
        }
        for (t = [],
        e = n; e = e.parentNode; )
            e.nodeType === 1 && t.push({
                element: e,
                left: e.scrollLeft,
                top: e.scrollTop
            });
        for (typeof n.focus == "function" && n.focus(),
        n = 0; n < t.length; n++)
            e = t[n],
            e.element.scrollLeft = e.left,
            e.element.scrollTop = e.top
    }
}
var $p = Xe && "documentMode"in document && 11 >= document.documentMode
  , Gt = null
  , Xo = null
  , An = null
  , Zo = !1;
function ua(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Zo || Gt == null || Gt !== tl(r) || (r = Gt,
    "selectionStart"in r && Qi(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(),
    r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }),
    An && qn(An, r) || (An = r,
    r = al(Xo, "onSelect"),
    0 < r.length && (t = new Vi("onSelect","select",null,t,n),
    e.push({
        event: t,
        listeners: r
    }),
    t.target = Gt)))
}
function Rr(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(),
    n["Webkit" + e] = "webkit" + t,
    n["Moz" + e] = "moz" + t,
    n
}
var Yt = {
    animationend: Rr("Animation", "AnimationEnd"),
    animationiteration: Rr("Animation", "AnimationIteration"),
    animationstart: Rr("Animation", "AnimationStart"),
    transitionend: Rr("Transition", "TransitionEnd")
}
  , fo = {}
  , sc = {};
Xe && (sc = document.createElement("div").style,
"AnimationEvent"in window || (delete Yt.animationend.animation,
delete Yt.animationiteration.animation,
delete Yt.animationstart.animation),
"TransitionEvent"in window || delete Yt.transitionend.transition);
function Tl(e) {
    if (fo[e])
        return fo[e];
    if (!Yt[e])
        return e;
    var t = Yt[e], n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in sc)
            return fo[e] = t[n];
    return e
}
var ac = Tl("animationend")
  , uc = Tl("animationiteration")
  , cc = Tl("animationstart")
  , dc = Tl("transitionend")
  , fc = new Map
  , ca = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function St(e, t) {
    fc.set(e, t),
    $t(t, [e])
}
for (var po = 0; po < ca.length; po++) {
    var ho = ca[po]
      , Ap = ho.toLowerCase()
      , Bp = ho[0].toUpperCase() + ho.slice(1);
    St(Ap, "on" + Bp)
}
St(ac, "onAnimationEnd");
St(uc, "onAnimationIteration");
St(cc, "onAnimationStart");
St("dblclick", "onDoubleClick");
St("focusin", "onFocus");
St("focusout", "onBlur");
St(dc, "onTransitionEnd");
cn("onMouseEnter", ["mouseout", "mouseover"]);
cn("onMouseLeave", ["mouseout", "mouseover"]);
cn("onPointerEnter", ["pointerout", "pointerover"]);
cn("onPointerLeave", ["pointerout", "pointerover"]);
$t("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
$t("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
$t("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
$t("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
$t("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
$t("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Fn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ")
  , Vp = new Set("cancel close invalid load scroll toggle".split(" ").concat(Fn));
function da(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n,
    Af(r, t, void 0, e),
    e.currentTarget = null
}
function pc(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n]
          , l = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var i = r.length - 1; 0 <= i; i--) {
                    var s = r[i]
                      , a = s.instance
                      , c = s.currentTarget;
                    if (s = s.listener,
                    a !== o && l.isPropagationStopped())
                        break e;
                    da(l, s, c),
                    o = a
                }
            else
                for (i = 0; i < r.length; i++) {
                    if (s = r[i],
                    a = s.instance,
                    c = s.currentTarget,
                    s = s.listener,
                    a !== o && l.isPropagationStopped())
                        break e;
                    da(l, s, c),
                    o = a
                }
        }
    }
    if (rl)
        throw e = Qo,
        rl = !1,
        Qo = null,
        e
}
function U(e, t) {
    var n = t[ni];
    n === void 0 && (n = t[ni] = new Set);
    var r = e + "__bubble";
    n.has(r) || (hc(t, e, 2, !1),
    n.add(r))
}
function mo(e, t, n) {
    var r = 0;
    t && (r |= 4),
    hc(n, e, r, t)
}
var Mr = "_reactListening" + Math.random().toString(36).slice(2);
function er(e) {
    if (!e[Mr]) {
        e[Mr] = !0,
        ku.forEach(function(n) {
            n !== "selectionchange" && (Vp.has(n) || mo(n, !1, e),
            mo(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Mr] || (t[Mr] = !0,
        mo("selectionchange", !1, t))
    }
}
function hc(e, t, n, r) {
    switch (Zu(t)) {
    case 1:
        var l = rp;
        break;
    case 4:
        l = lp;
        break;
    default:
        l = Ai
    }
    n = l.bind(null, t, n, e),
    l = void 0,
    !bo || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0),
    r ? l !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: l
    }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, {
        passive: l
    }) : e.addEventListener(t, n, !1)
}
function vo(e, t, n, r, l) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null)
        e: for (; ; ) {
            if (r === null)
                return;
            var i = r.tag;
            if (i === 3 || i === 4) {
                var s = r.stateNode.containerInfo;
                if (s === l || s.nodeType === 8 && s.parentNode === l)
                    break;
                if (i === 4)
                    for (i = r.return; i !== null; ) {
                        var a = i.tag;
                        if ((a === 3 || a === 4) && (a = i.stateNode.containerInfo,
                        a === l || a.nodeType === 8 && a.parentNode === l))
                            return;
                        i = i.return
                    }
                for (; s !== null; ) {
                    if (i = Rt(s),
                    i === null)
                        return;
                    if (a = i.tag,
                    a === 5 || a === 6) {
                        r = o = i;
                        continue e
                    }
                    s = s.parentNode
                }
            }
            r = r.return
        }
    Uu(function() {
        var c = o
          , m = Ui(n)
          , h = [];
        e: {
            var v = fc.get(e);
            if (v !== void 0) {
                var y = Vi
                  , x = e;
                switch (e) {
                case "keypress":
                    if (Qr(n) === 0)
                        break e;
                case "keydown":
                case "keyup":
                    y = xp;
                    break;
                case "focusin":
                    x = "focus",
                    y = ao;
                    break;
                case "focusout":
                    x = "blur",
                    y = ao;
                    break;
                case "beforeblur":
                case "afterblur":
                    y = ao;
                    break;
                case "click":
                    if (n.button === 2)
                        break e;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                    y = qs;
                    break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                    y = sp;
                    break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                    y = Sp;
                    break;
                case ac:
                case uc:
                case cc:
                    y = cp;
                    break;
                case dc:
                    y = Ep;
                    break;
                case "scroll":
                    y = op;
                    break;
                case "wheel":
                    y = Cp;
                    break;
                case "copy":
                case "cut":
                case "paste":
                    y = fp;
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                    y = ta
                }
                var w = (t & 4) !== 0
                  , E = !w && e === "scroll"
                  , p = w ? v !== null ? v + "Capture" : null : v;
                w = [];
                for (var d = c, f; d !== null; ) {
                    f = d;
                    var g = f.stateNode;
                    if (f.tag === 5 && g !== null && (f = g,
                    p !== null && (g = Gn(d, p),
                    g != null && w.push(tr(d, g, f)))),
                    E)
                        break;
                    d = d.return
                }
                0 < w.length && (v = new y(v,x,null,n,m),
                h.push({
                    event: v,
                    listeners: w
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (v = e === "mouseover" || e === "pointerover",
                y = e === "mouseout" || e === "pointerout",
                v && n !== Vo && (x = n.relatedTarget || n.fromElement) && (Rt(x) || x[Ze]))
                    break e;
                if ((y || v) && (v = m.window === m ? m : (v = m.ownerDocument) ? v.defaultView || v.parentWindow : window,
                y ? (x = n.relatedTarget || n.toElement,
                y = c,
                x = x ? Rt(x) : null,
                x !== null && (E = At(x),
                x !== E || x.tag !== 5 && x.tag !== 6) && (x = null)) : (y = null,
                x = c),
                y !== x)) {
                    if (w = qs,
                    g = "onMouseLeave",
                    p = "onMouseEnter",
                    d = "mouse",
                    (e === "pointerout" || e === "pointerover") && (w = ta,
                    g = "onPointerLeave",
                    p = "onPointerEnter",
                    d = "pointer"),
                    E = y == null ? v : Xt(y),
                    f = x == null ? v : Xt(x),
                    v = new w(g,d + "leave",y,n,m),
                    v.target = E,
                    v.relatedTarget = f,
                    g = null,
                    Rt(m) === c && (w = new w(p,d + "enter",x,n,m),
                    w.target = f,
                    w.relatedTarget = E,
                    g = w),
                    E = g,
                    y && x)
                        t: {
                            for (w = y,
                            p = x,
                            d = 0,
                            f = w; f; f = Vt(f))
                                d++;
                            for (f = 0,
                            g = p; g; g = Vt(g))
                                f++;
                            for (; 0 < d - f; )
                                w = Vt(w),
                                d--;
                            for (; 0 < f - d; )
                                p = Vt(p),
                                f--;
                            for (; d--; ) {
                                if (w === p || p !== null && w === p.alternate)
                                    break t;
                                w = Vt(w),
                                p = Vt(p)
                            }
                            w = null
                        }
                    else
                        w = null;
                    y !== null && fa(h, v, y, w, !1),
                    x !== null && E !== null && fa(h, E, x, w, !0)
                }
            }
            e: {
                if (v = c ? Xt(c) : window,
                y = v.nodeName && v.nodeName.toLowerCase(),
                y === "select" || y === "input" && v.type === "file")
                    var j = Tp;
                else if (la(v))
                    if (rc)
                        j = Up;
                    else {
                        j = Ip;
                        var _ = Op
                    }
                else
                    (y = v.nodeName) && y.toLowerCase() === "input" && (v.type === "checkbox" || v.type === "radio") && (j = Fp);
                if (j && (j = j(e, c))) {
                    nc(h, j, n, m);
                    break e
                }
                _ && _(e, v, c),
                e === "focusout" && (_ = v._wrapperState) && _.controlled && v.type === "number" && Do(v, "number", v.value)
            }
            switch (_ = c ? Xt(c) : window,
            e) {
            case "focusin":
                (la(_) || _.contentEditable === "true") && (Gt = _,
                Xo = c,
                An = null);
                break;
            case "focusout":
                An = Xo = Gt = null;
                break;
            case "mousedown":
                Zo = !0;
                break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
                Zo = !1,
                ua(h, n, m);
                break;
            case "selectionchange":
                if ($p)
                    break;
            case "keydown":
            case "keyup":
                ua(h, n, m)
            }
            var P;
            if (bi)
                e: {
                    switch (e) {
                    case "compositionstart":
                        var L = "onCompositionStart";
                        break e;
                    case "compositionend":
                        L = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        L = "onCompositionUpdate";
                        break e
                    }
                    L = void 0
                }
            else
                Kt ? ec(e, n) && (L = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (L = "onCompositionStart");
            L && (qu && n.locale !== "ko" && (Kt || L !== "onCompositionStart" ? L === "onCompositionEnd" && Kt && (P = Ju()) : (st = m,
            Bi = "value"in st ? st.value : st.textContent,
            Kt = !0)),
            _ = al(c, L),
            0 < _.length && (L = new ea(L,e,null,n,m),
            h.push({
                event: L,
                listeners: _
            }),
            P ? L.data = P : (P = tc(n),
            P !== null && (L.data = P)))),
            (P = Pp ? Lp(e, n) : Rp(e, n)) && (c = al(c, "onBeforeInput"),
            0 < c.length && (m = new ea("onBeforeInput","beforeinput",null,n,m),
            h.push({
                event: m,
                listeners: c
            }),
            m.data = P))
        }
        pc(h, t)
    })
}
function tr(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}
function al(e, t) {
    for (var n = t + "Capture", r = []; e !== null; ) {
        var l = e
          , o = l.stateNode;
        l.tag === 5 && o !== null && (l = o,
        o = Gn(e, n),
        o != null && r.unshift(tr(e, o, l)),
        o = Gn(e, t),
        o != null && r.push(tr(e, o, l))),
        e = e.return
    }
    return r
}
function Vt(e) {
    if (e === null)
        return null;
    do
        e = e.return;
    while (e && e.tag !== 5);
    return e || null
}
function fa(e, t, n, r, l) {
    for (var o = t._reactName, i = []; n !== null && n !== r; ) {
        var s = n
          , a = s.alternate
          , c = s.stateNode;
        if (a !== null && a === r)
            break;
        s.tag === 5 && c !== null && (s = c,
        l ? (a = Gn(n, o),
        a != null && i.unshift(tr(n, a, s))) : l || (a = Gn(n, o),
        a != null && i.push(tr(n, a, s)))),
        n = n.return
    }
    i.length !== 0 && e.push({
        event: t,
        listeners: i
    })
}
var Wp = /\r\n?/g
  , bp = /\u0000|\uFFFD/g;
function pa(e) {
    return (typeof e == "string" ? e : "" + e).replace(Wp, `
`).replace(bp, "")
}
function zr(e, t, n) {
    if (t = pa(t),
    pa(e) !== t && n)
        throw Error(S(425))
}
function ul() {}
var Jo = null
  , qo = null;
function ei(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var ti = typeof setTimeout == "function" ? setTimeout : void 0
  , Qp = typeof clearTimeout == "function" ? clearTimeout : void 0
  , ha = typeof Promise == "function" ? Promise : void 0
  , Kp = typeof queueMicrotask == "function" ? queueMicrotask : typeof ha < "u" ? function(e) {
    return ha.resolve(null).then(e).catch(Gp)
}
: ti;
function Gp(e) {
    setTimeout(function() {
        throw e
    })
}
function go(e, t) {
    var n = t
      , r = 0;
    do {
        var l = n.nextSibling;
        if (e.removeChild(n),
        l && l.nodeType === 8)
            if (n = l.data,
            n === "/$") {
                if (r === 0) {
                    e.removeChild(l),
                    Zn(t);
                    return
                }
                r--
            } else
                n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = l
    } while (n);
    Zn(t)
}
function ht(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3)
            break;
        if (t === 8) {
            if (t = e.data,
            t === "$" || t === "$!" || t === "$?")
                break;
            if (t === "/$")
                return null
        }
    }
    return e
}
function ma(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0)
                    return e;
                t--
            } else
                n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var wn = Math.random().toString(36).slice(2)
  , $e = "__reactFiber$" + wn
  , nr = "__reactProps$" + wn
  , Ze = "__reactContainer$" + wn
  , ni = "__reactEvents$" + wn
  , Yp = "__reactListeners$" + wn
  , Xp = "__reactHandles$" + wn;
function Rt(e) {
    var t = e[$e];
    if (t)
        return t;
    for (var n = e.parentNode; n; ) {
        if (t = n[Ze] || n[$e]) {
            if (n = t.alternate,
            t.child !== null || n !== null && n.child !== null)
                for (e = ma(e); e !== null; ) {
                    if (n = e[$e])
                        return n;
                    e = ma(e)
                }
            return t
        }
        e = n,
        n = e.parentNode
    }
    return null
}
function hr(e) {
    return e = e[$e] || e[Ze],
    !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}
function Xt(e) {
    if (e.tag === 5 || e.tag === 6)
        return e.stateNode;
    throw Error(S(33))
}
function Ol(e) {
    return e[nr] || null
}
var ri = []
  , Zt = -1;
function jt(e) {
    return {
        current: e
    }
}
function D(e) {
    0 > Zt || (e.current = ri[Zt],
    ri[Zt] = null,
    Zt--)
}
function F(e, t) {
    Zt++,
    ri[Zt] = e.current,
    e.current = t
}
var kt = {}
  , ie = jt(kt)
  , me = jt(!1)
  , It = kt;
function dn(e, t) {
    var n = e.type.contextTypes;
    if (!n)
        return kt;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
    var l = {}, o;
    for (o in n)
        l[o] = t[o];
    return r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = t,
    e.__reactInternalMemoizedMaskedChildContext = l),
    l
}
function ve(e) {
    return e = e.childContextTypes,
    e != null
}
function cl() {
    D(me),
    D(ie)
}
function va(e, t, n) {
    if (ie.current !== kt)
        throw Error(S(168));
    F(ie, t),
    F(me, n)
}
function mc(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes,
    typeof r.getChildContext != "function")
        return n;
    r = r.getChildContext();
    for (var l in r)
        if (!(l in t))
            throw Error(S(108, Of(e) || "Unknown", l));
    return V({}, n, r)
}
function dl(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || kt,
    It = ie.current,
    F(ie, e),
    F(me, me.current),
    !0
}
function ga(e, t, n) {
    var r = e.stateNode;
    if (!r)
        throw Error(S(169));
    n ? (e = mc(e, t, It),
    r.__reactInternalMemoizedMergedChildContext = e,
    D(me),
    D(ie),
    F(ie, e)) : D(me),
    F(me, n)
}
var be = null
  , Il = !1
  , yo = !1;
function vc(e) {
    be === null ? be = [e] : be.push(e)
}
function Zp(e) {
    Il = !0,
    vc(e)
}
function Et() {
    if (!yo && be !== null) {
        yo = !0;
        var e = 0
          , t = I;
        try {
            var n = be;
            for (I = 1; e < n.length; e++) {
                var r = n[e];
                do
                    r = r(!0);
                while (r !== null)
            }
            be = null,
            Il = !1
        } catch (l) {
            throw be !== null && (be = be.slice(e + 1)),
            Au(Di, Et),
            l
        } finally {
            I = t,
            yo = !1
        }
    }
    return null
}
var Jt = []
  , qt = 0
  , fl = null
  , pl = 0
  , Ne = []
  , Ce = 0
  , Ft = null
  , Qe = 1
  , Ke = "";
function Pt(e, t) {
    Jt[qt++] = pl,
    Jt[qt++] = fl,
    fl = e,
    pl = t
}
function gc(e, t, n) {
    Ne[Ce++] = Qe,
    Ne[Ce++] = Ke,
    Ne[Ce++] = Ft,
    Ft = e;
    var r = Qe;
    e = Ke;
    var l = 32 - Ie(r) - 1;
    r &= ~(1 << l),
    n += 1;
    var o = 32 - Ie(t) + l;
    if (30 < o) {
        var i = l - l % 5;
        o = (r & (1 << i) - 1).toString(32),
        r >>= i,
        l -= i,
        Qe = 1 << 32 - Ie(t) + l | n << l | r,
        Ke = o + e
    } else
        Qe = 1 << o | n << l | r,
        Ke = e
}
function Ki(e) {
    e.return !== null && (Pt(e, 1),
    gc(e, 1, 0))
}
function Gi(e) {
    for (; e === fl; )
        fl = Jt[--qt],
        Jt[qt] = null,
        pl = Jt[--qt],
        Jt[qt] = null;
    for (; e === Ft; )
        Ft = Ne[--Ce],
        Ne[Ce] = null,
        Ke = Ne[--Ce],
        Ne[Ce] = null,
        Qe = Ne[--Ce],
        Ne[Ce] = null
}
var ke = null
  , we = null
  , H = !1
  , Oe = null;
function yc(e, t) {
    var n = _e(5, null, null, 0);
    n.elementType = "DELETED",
    n.stateNode = t,
    n.return = e,
    t = e.deletions,
    t === null ? (e.deletions = [n],
    e.flags |= 16) : t.push(n)
}
function ya(e, t) {
    switch (e.tag) {
    case 5:
        var n = e.type;
        return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t,
        t !== null ? (e.stateNode = t,
        ke = e,
        we = ht(t.firstChild),
        !0) : !1;
    case 6:
        return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t,
        t !== null ? (e.stateNode = t,
        ke = e,
        we = null,
        !0) : !1;
    case 13:
        return t = t.nodeType !== 8 ? null : t,
        t !== null ? (n = Ft !== null ? {
            id: Qe,
            overflow: Ke
        } : null,
        e.memoizedState = {
            dehydrated: t,
            treeContext: n,
            retryLane: 1073741824
        },
        n = _e(18, null, null, 0),
        n.stateNode = t,
        n.return = e,
        e.child = n,
        ke = e,
        we = null,
        !0) : !1;
    default:
        return !1
    }
}
function li(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}
function oi(e) {
    if (H) {
        var t = we;
        if (t) {
            var n = t;
            if (!ya(e, t)) {
                if (li(e))
                    throw Error(S(418));
                t = ht(n.nextSibling);
                var r = ke;
                t && ya(e, t) ? yc(r, n) : (e.flags = e.flags & -4097 | 2,
                H = !1,
                ke = e)
            }
        } else {
            if (li(e))
                throw Error(S(418));
            e.flags = e.flags & -4097 | 2,
            H = !1,
            ke = e
        }
    }
}
function xa(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
        e = e.return;
    ke = e
}
function Tr(e) {
    if (e !== ke)
        return !1;
    if (!H)
        return xa(e),
        H = !0,
        !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type,
    t = t !== "head" && t !== "body" && !ei(e.type, e.memoizedProps)),
    t && (t = we)) {
        if (li(e))
            throw xc(),
            Error(S(418));
        for (; t; )
            yc(e, t),
            t = ht(t.nextSibling)
    }
    if (xa(e),
    e.tag === 13) {
        if (e = e.memoizedState,
        e = e !== null ? e.dehydrated : null,
        !e)
            throw Error(S(317));
        e: {
            for (e = e.nextSibling,
            t = 0; e; ) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            we = ht(e.nextSibling);
                            break e
                        }
                        t--
                    } else
                        n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            we = null
        }
    } else
        we = ke ? ht(e.stateNode.nextSibling) : null;
    return !0
}
function xc() {
    for (var e = we; e; )
        e = ht(e.nextSibling)
}
function fn() {
    we = ke = null,
    H = !1
}
function Yi(e) {
    Oe === null ? Oe = [e] : Oe.push(e)
}
var Jp = et.ReactCurrentBatchConfig;
function Rn(e, t, n) {
    if (e = n.ref,
    e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner,
            n) {
                if (n.tag !== 1)
                    throw Error(S(309));
                var r = n.stateNode
            }
            if (!r)
                throw Error(S(147, e));
            var l = r
              , o = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
                var s = l.refs;
                i === null ? delete s[o] : s[o] = i
            }
            ,
            t._stringRef = o,
            t)
        }
        if (typeof e != "string")
            throw Error(S(284));
        if (!n._owner)
            throw Error(S(290, e))
    }
    return e
}
function Or(e, t) {
    throw e = Object.prototype.toString.call(t),
    Error(S(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}
function wa(e) {
    var t = e._init;
    return t(e._payload)
}
function wc(e) {
    function t(p, d) {
        if (e) {
            var f = p.deletions;
            f === null ? (p.deletions = [d],
            p.flags |= 16) : f.push(d)
        }
    }
    function n(p, d) {
        if (!e)
            return null;
        for (; d !== null; )
            t(p, d),
            d = d.sibling;
        return null
    }
    function r(p, d) {
        for (p = new Map; d !== null; )
            d.key !== null ? p.set(d.key, d) : p.set(d.index, d),
            d = d.sibling;
        return p
    }
    function l(p, d) {
        return p = yt(p, d),
        p.index = 0,
        p.sibling = null,
        p
    }
    function o(p, d, f) {
        return p.index = f,
        e ? (f = p.alternate,
        f !== null ? (f = f.index,
        f < d ? (p.flags |= 2,
        d) : f) : (p.flags |= 2,
        d)) : (p.flags |= 1048576,
        d)
    }
    function i(p) {
        return e && p.alternate === null && (p.flags |= 2),
        p
    }
    function s(p, d, f, g) {
        return d === null || d.tag !== 6 ? (d = No(f, p.mode, g),
        d.return = p,
        d) : (d = l(d, f),
        d.return = p,
        d)
    }
    function a(p, d, f, g) {
        var j = f.type;
        return j === Qt ? m(p, d, f.props.children, g, f.key) : d !== null && (d.elementType === j || typeof j == "object" && j !== null && j.$$typeof === rt && wa(j) === d.type) ? (g = l(d, f.props),
        g.ref = Rn(p, d, f),
        g.return = p,
        g) : (g = qr(f.type, f.key, f.props, null, p.mode, g),
        g.ref = Rn(p, d, f),
        g.return = p,
        g)
    }
    function c(p, d, f, g) {
        return d === null || d.tag !== 4 || d.stateNode.containerInfo !== f.containerInfo || d.stateNode.implementation !== f.implementation ? (d = Co(f, p.mode, g),
        d.return = p,
        d) : (d = l(d, f.children || []),
        d.return = p,
        d)
    }
    function m(p, d, f, g, j) {
        return d === null || d.tag !== 7 ? (d = Ot(f, p.mode, g, j),
        d.return = p,
        d) : (d = l(d, f),
        d.return = p,
        d)
    }
    function h(p, d, f) {
        if (typeof d == "string" && d !== "" || typeof d == "number")
            return d = No("" + d, p.mode, f),
            d.return = p,
            d;
        if (typeof d == "object" && d !== null) {
            switch (d.$$typeof) {
            case jr:
                return f = qr(d.type, d.key, d.props, null, p.mode, f),
                f.ref = Rn(p, null, d),
                f.return = p,
                f;
            case bt:
                return d = Co(d, p.mode, f),
                d.return = p,
                d;
            case rt:
                var g = d._init;
                return h(p, g(d._payload), f)
            }
            if (On(d) || Nn(d))
                return d = Ot(d, p.mode, f, null),
                d.return = p,
                d;
            Or(p, d)
        }
        return null
    }
    function v(p, d, f, g) {
        var j = d !== null ? d.key : null;
        if (typeof f == "string" && f !== "" || typeof f == "number")
            return j !== null ? null : s(p, d, "" + f, g);
        if (typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
            case jr:
                return f.key === j ? a(p, d, f, g) : null;
            case bt:
                return f.key === j ? c(p, d, f, g) : null;
            case rt:
                return j = f._init,
                v(p, d, j(f._payload), g)
            }
            if (On(f) || Nn(f))
                return j !== null ? null : m(p, d, f, g, null);
            Or(p, f)
        }
        return null
    }
    function y(p, d, f, g, j) {
        if (typeof g == "string" && g !== "" || typeof g == "number")
            return p = p.get(f) || null,
            s(d, p, "" + g, j);
        if (typeof g == "object" && g !== null) {
            switch (g.$$typeof) {
            case jr:
                return p = p.get(g.key === null ? f : g.key) || null,
                a(d, p, g, j);
            case bt:
                return p = p.get(g.key === null ? f : g.key) || null,
                c(d, p, g, j);
            case rt:
                var _ = g._init;
                return y(p, d, f, _(g._payload), j)
            }
            if (On(g) || Nn(g))
                return p = p.get(f) || null,
                m(d, p, g, j, null);
            Or(d, g)
        }
        return null
    }
    function x(p, d, f, g) {
        for (var j = null, _ = null, P = d, L = d = 0, $ = null; P !== null && L < f.length; L++) {
            P.index > L ? ($ = P,
            P = null) : $ = P.sibling;
            var M = v(p, P, f[L], g);
            if (M === null) {
                P === null && (P = $);
                break
            }
            e && P && M.alternate === null && t(p, P),
            d = o(M, d, L),
            _ === null ? j = M : _.sibling = M,
            _ = M,
            P = $
        }
        if (L === f.length)
            return n(p, P),
            H && Pt(p, L),
            j;
        if (P === null) {
            for (; L < f.length; L++)
                P = h(p, f[L], g),
                P !== null && (d = o(P, d, L),
                _ === null ? j = P : _.sibling = P,
                _ = P);
            return H && Pt(p, L),
            j
        }
        for (P = r(p, P); L < f.length; L++)
            $ = y(P, p, L, f[L], g),
            $ !== null && (e && $.alternate !== null && P.delete($.key === null ? L : $.key),
            d = o($, d, L),
            _ === null ? j = $ : _.sibling = $,
            _ = $);
        return e && P.forEach(function(ye) {
            return t(p, ye)
        }),
        H && Pt(p, L),
        j
    }
    function w(p, d, f, g) {
        var j = Nn(f);
        if (typeof j != "function")
            throw Error(S(150));
        if (f = j.call(f),
        f == null)
            throw Error(S(151));
        for (var _ = j = null, P = d, L = d = 0, $ = null, M = f.next(); P !== null && !M.done; L++,
        M = f.next()) {
            P.index > L ? ($ = P,
            P = null) : $ = P.sibling;
            var ye = v(p, P, M.value, g);
            if (ye === null) {
                P === null && (P = $);
                break
            }
            e && P && ye.alternate === null && t(p, P),
            d = o(ye, d, L),
            _ === null ? j = ye : _.sibling = ye,
            _ = ye,
            P = $
        }
        if (M.done)
            return n(p, P),
            H && Pt(p, L),
            j;
        if (P === null) {
            for (; !M.done; L++,
            M = f.next())
                M = h(p, M.value, g),
                M !== null && (d = o(M, d, L),
                _ === null ? j = M : _.sibling = M,
                _ = M);
            return H && Pt(p, L),
            j
        }
        for (P = r(p, P); !M.done; L++,
        M = f.next())
            M = y(P, p, L, M.value, g),
            M !== null && (e && M.alternate !== null && P.delete(M.key === null ? L : M.key),
            d = o(M, d, L),
            _ === null ? j = M : _.sibling = M,
            _ = M);
        return e && P.forEach(function(jn) {
            return t(p, jn)
        }),
        H && Pt(p, L),
        j
    }
    function E(p, d, f, g) {
        if (typeof f == "object" && f !== null && f.type === Qt && f.key === null && (f = f.props.children),
        typeof f == "object" && f !== null) {
            switch (f.$$typeof) {
            case jr:
                e: {
                    for (var j = f.key, _ = d; _ !== null; ) {
                        if (_.key === j) {
                            if (j = f.type,
                            j === Qt) {
                                if (_.tag === 7) {
                                    n(p, _.sibling),
                                    d = l(_, f.props.children),
                                    d.return = p,
                                    p = d;
                                    break e
                                }
                            } else if (_.elementType === j || typeof j == "object" && j !== null && j.$$typeof === rt && wa(j) === _.type) {
                                n(p, _.sibling),
                                d = l(_, f.props),
                                d.ref = Rn(p, _, f),
                                d.return = p,
                                p = d;
                                break e
                            }
                            n(p, _);
                            break
                        } else
                            t(p, _);
                        _ = _.sibling
                    }
                    f.type === Qt ? (d = Ot(f.props.children, p.mode, g, f.key),
                    d.return = p,
                    p = d) : (g = qr(f.type, f.key, f.props, null, p.mode, g),
                    g.ref = Rn(p, d, f),
                    g.return = p,
                    p = g)
                }
                return i(p);
            case bt:
                e: {
                    for (_ = f.key; d !== null; ) {
                        if (d.key === _)
                            if (d.tag === 4 && d.stateNode.containerInfo === f.containerInfo && d.stateNode.implementation === f.implementation) {
                                n(p, d.sibling),
                                d = l(d, f.children || []),
                                d.return = p,
                                p = d;
                                break e
                            } else {
                                n(p, d);
                                break
                            }
                        else
                            t(p, d);
                        d = d.sibling
                    }
                    d = Co(f, p.mode, g),
                    d.return = p,
                    p = d
                }
                return i(p);
            case rt:
                return _ = f._init,
                E(p, d, _(f._payload), g)
            }
            if (On(f))
                return x(p, d, f, g);
            if (Nn(f))
                return w(p, d, f, g);
            Or(p, f)
        }
        return typeof f == "string" && f !== "" || typeof f == "number" ? (f = "" + f,
        d !== null && d.tag === 6 ? (n(p, d.sibling),
        d = l(d, f),
        d.return = p,
        p = d) : (n(p, d),
        d = No(f, p.mode, g),
        d.return = p,
        p = d),
        i(p)) : n(p, d)
    }
    return E
}
var pn = wc(!0)
  , kc = wc(!1)
  , hl = jt(null)
  , ml = null
  , en = null
  , Xi = null;
function Zi() {
    Xi = en = ml = null
}
function Ji(e) {
    var t = hl.current;
    D(hl),
    e._currentValue = t
}
function ii(e, t, n) {
    for (; e !== null; ) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t,
        r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
        e === n)
            break;
        e = e.return
    }
}
function an(e, t) {
    ml = e,
    Xi = en = null,
    e = e.dependencies,
    e !== null && e.firstContext !== null && (e.lanes & t && (he = !0),
    e.firstContext = null)
}
function Le(e) {
    var t = e._currentValue;
    if (Xi !== e)
        if (e = {
            context: e,
            memoizedValue: t,
            next: null
        },
        en === null) {
            if (ml === null)
                throw Error(S(308));
            en = e,
            ml.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else
            en = en.next = e;
    return t
}
var Mt = null;
function qi(e) {
    Mt === null ? Mt = [e] : Mt.push(e)
}
function Sc(e, t, n, r) {
    var l = t.interleaved;
    return l === null ? (n.next = n,
    qi(t)) : (n.next = l.next,
    l.next = n),
    t.interleaved = n,
    Je(e, r)
}
function Je(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t),
    n = e,
    e = e.return; e !== null; )
        e.childLanes |= t,
        n = e.alternate,
        n !== null && (n.childLanes |= t),
        n = e,
        e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var lt = !1;
function es(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function jc(e, t) {
    e = e.updateQueue,
    t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}
function Ye(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function mt(e, t, n) {
    var r = e.updateQueue;
    if (r === null)
        return null;
    if (r = r.shared,
    O & 2) {
        var l = r.pending;
        return l === null ? t.next = t : (t.next = l.next,
        l.next = t),
        r.pending = t,
        Je(e, n)
    }
    return l = r.interleaved,
    l === null ? (t.next = t,
    qi(r)) : (t.next = l.next,
    l.next = t),
    r.interleaved = t,
    Je(e, n)
}
function Kr(e, t, n) {
    if (t = t.updateQueue,
    t !== null && (t = t.shared,
    (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        Hi(e, n)
    }
}
function ka(e, t) {
    var n = e.updateQueue
      , r = e.alternate;
    if (r !== null && (r = r.updateQueue,
    n === r)) {
        var l = null
          , o = null;
        if (n = n.firstBaseUpdate,
        n !== null) {
            do {
                var i = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                o === null ? l = o = i : o = o.next = i,
                n = n.next
            } while (n !== null);
            o === null ? l = o = t : o = o.next = t
        } else
            l = o = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: l,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects
        },
        e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate,
    e === null ? n.firstBaseUpdate = t : e.next = t,
    n.lastBaseUpdate = t
}
function vl(e, t, n, r) {
    var l = e.updateQueue;
    lt = !1;
    var o = l.firstBaseUpdate
      , i = l.lastBaseUpdate
      , s = l.shared.pending;
    if (s !== null) {
        l.shared.pending = null;
        var a = s
          , c = a.next;
        a.next = null,
        i === null ? o = c : i.next = c,
        i = a;
        var m = e.alternate;
        m !== null && (m = m.updateQueue,
        s = m.lastBaseUpdate,
        s !== i && (s === null ? m.firstBaseUpdate = c : s.next = c,
        m.lastBaseUpdate = a))
    }
    if (o !== null) {
        var h = l.baseState;
        i = 0,
        m = c = a = null,
        s = o;
        do {
            var v = s.lane
              , y = s.eventTime;
            if ((r & v) === v) {
                m !== null && (m = m.next = {
                    eventTime: y,
                    lane: 0,
                    tag: s.tag,
                    payload: s.payload,
                    callback: s.callback,
                    next: null
                });
                e: {
                    var x = e
                      , w = s;
                    switch (v = t,
                    y = n,
                    w.tag) {
                    case 1:
                        if (x = w.payload,
                        typeof x == "function") {
                            h = x.call(y, h, v);
                            break e
                        }
                        h = x;
                        break e;
                    case 3:
                        x.flags = x.flags & -65537 | 128;
                    case 0:
                        if (x = w.payload,
                        v = typeof x == "function" ? x.call(y, h, v) : x,
                        v == null)
                            break e;
                        h = V({}, h, v);
                        break e;
                    case 2:
                        lt = !0
                    }
                }
                s.callback !== null && s.lane !== 0 && (e.flags |= 64,
                v = l.effects,
                v === null ? l.effects = [s] : v.push(s))
            } else
                y = {
                    eventTime: y,
                    lane: v,
                    tag: s.tag,
                    payload: s.payload,
                    callback: s.callback,
                    next: null
                },
                m === null ? (c = m = y,
                a = h) : m = m.next = y,
                i |= v;
            if (s = s.next,
            s === null) {
                if (s = l.shared.pending,
                s === null)
                    break;
                v = s,
                s = v.next,
                v.next = null,
                l.lastBaseUpdate = v,
                l.shared.pending = null
            }
        } while (!0);
        if (m === null && (a = h),
        l.baseState = a,
        l.firstBaseUpdate = c,
        l.lastBaseUpdate = m,
        t = l.shared.interleaved,
        t !== null) {
            l = t;
            do
                i |= l.lane,
                l = l.next;
            while (l !== t)
        } else
            o === null && (l.shared.lanes = 0);
        Dt |= i,
        e.lanes = i,
        e.memoizedState = h
    }
}
function Sa(e, t, n) {
    if (e = t.effects,
    t.effects = null,
    e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t]
              , l = r.callback;
            if (l !== null) {
                if (r.callback = null,
                r = n,
                typeof l != "function")
                    throw Error(S(191, l));
                l.call(r)
            }
        }
}
var mr = {}
  , Be = jt(mr)
  , rr = jt(mr)
  , lr = jt(mr);
function zt(e) {
    if (e === mr)
        throw Error(S(174));
    return e
}
function ts(e, t) {
    switch (F(lr, t),
    F(rr, e),
    F(Be, mr),
    e = t.nodeType,
    e) {
    case 9:
    case 11:
        t = (t = t.documentElement) ? t.namespaceURI : $o(null, "");
        break;
    default:
        e = e === 8 ? t.parentNode : t,
        t = e.namespaceURI || null,
        e = e.tagName,
        t = $o(t, e)
    }
    D(Be),
    F(Be, t)
}
function hn() {
    D(Be),
    D(rr),
    D(lr)
}
function Ec(e) {
    zt(lr.current);
    var t = zt(Be.current)
      , n = $o(t, e.type);
    t !== n && (F(rr, e),
    F(Be, n))
}
function ns(e) {
    rr.current === e && (D(Be),
    D(rr))
}
var A = jt(0);
function gl(e) {
    for (var t = e; t !== null; ) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated,
            n === null || n.data === "$?" || n.data === "$!"))
                return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128)
                return t
        } else if (t.child !== null) {
            t.child.return = t,
            t = t.child;
            continue
        }
        if (t === e)
            break;
        for (; t.sibling === null; ) {
            if (t.return === null || t.return === e)
                return null;
            t = t.return
        }
        t.sibling.return = t.return,
        t = t.sibling
    }
    return null
}
var xo = [];
function rs() {
    for (var e = 0; e < xo.length; e++)
        xo[e]._workInProgressVersionPrimary = null;
    xo.length = 0
}
var Gr = et.ReactCurrentDispatcher
  , wo = et.ReactCurrentBatchConfig
  , Ut = 0
  , B = null
  , Y = null
  , J = null
  , yl = !1
  , Bn = !1
  , or = 0
  , qp = 0;
function re() {
    throw Error(S(321))
}
function ls(e, t) {
    if (t === null)
        return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!Ue(e[n], t[n]))
            return !1;
    return !0
}
function os(e, t, n, r, l, o) {
    if (Ut = o,
    B = t,
    t.memoizedState = null,
    t.updateQueue = null,
    t.lanes = 0,
    Gr.current = e === null || e.memoizedState === null ? rh : lh,
    e = n(r, l),
    Bn) {
        o = 0;
        do {
            if (Bn = !1,
            or = 0,
            25 <= o)
                throw Error(S(301));
            o += 1,
            J = Y = null,
            t.updateQueue = null,
            Gr.current = oh,
            e = n(r, l)
        } while (Bn)
    }
    if (Gr.current = xl,
    t = Y !== null && Y.next !== null,
    Ut = 0,
    J = Y = B = null,
    yl = !1,
    t)
        throw Error(S(300));
    return e
}
function is() {
    var e = or !== 0;
    return or = 0,
    e
}
function He() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return J === null ? B.memoizedState = J = e : J = J.next = e,
    J
}
function Re() {
    if (Y === null) {
        var e = B.alternate;
        e = e !== null ? e.memoizedState : null
    } else
        e = Y.next;
    var t = J === null ? B.memoizedState : J.next;
    if (t !== null)
        J = t,
        Y = e;
    else {
        if (e === null)
            throw Error(S(310));
        Y = e,
        e = {
            memoizedState: Y.memoizedState,
            baseState: Y.baseState,
            baseQueue: Y.baseQueue,
            queue: Y.queue,
            next: null
        },
        J === null ? B.memoizedState = J = e : J = J.next = e
    }
    return J
}
function ir(e, t) {
    return typeof t == "function" ? t(e) : t
}
function ko(e) {
    var t = Re()
      , n = t.queue;
    if (n === null)
        throw Error(S(311));
    n.lastRenderedReducer = e;
    var r = Y
      , l = r.baseQueue
      , o = n.pending;
    if (o !== null) {
        if (l !== null) {
            var i = l.next;
            l.next = o.next,
            o.next = i
        }
        r.baseQueue = l = o,
        n.pending = null
    }
    if (l !== null) {
        o = l.next,
        r = r.baseState;
        var s = i = null
          , a = null
          , c = o;
        do {
            var m = c.lane;
            if ((Ut & m) === m)
                a !== null && (a = a.next = {
                    lane: 0,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                }),
                r = c.hasEagerState ? c.eagerState : e(r, c.action);
            else {
                var h = {
                    lane: m,
                    action: c.action,
                    hasEagerState: c.hasEagerState,
                    eagerState: c.eagerState,
                    next: null
                };
                a === null ? (s = a = h,
                i = r) : a = a.next = h,
                B.lanes |= m,
                Dt |= m
            }
            c = c.next
        } while (c !== null && c !== o);
        a === null ? i = r : a.next = s,
        Ue(r, t.memoizedState) || (he = !0),
        t.memoizedState = r,
        t.baseState = i,
        t.baseQueue = a,
        n.lastRenderedState = r
    }
    if (e = n.interleaved,
    e !== null) {
        l = e;
        do
            o = l.lane,
            B.lanes |= o,
            Dt |= o,
            l = l.next;
        while (l !== e)
    } else
        l === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}
function So(e) {
    var t = Re()
      , n = t.queue;
    if (n === null)
        throw Error(S(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch
      , l = n.pending
      , o = t.memoizedState;
    if (l !== null) {
        n.pending = null;
        var i = l = l.next;
        do
            o = e(o, i.action),
            i = i.next;
        while (i !== l);
        Ue(o, t.memoizedState) || (he = !0),
        t.memoizedState = o,
        t.baseQueue === null && (t.baseState = o),
        n.lastRenderedState = o
    }
    return [o, r]
}
function Nc() {}
function Cc(e, t) {
    var n = B
      , r = Re()
      , l = t()
      , o = !Ue(r.memoizedState, l);
    if (o && (r.memoizedState = l,
    he = !0),
    r = r.queue,
    ss(Lc.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || J !== null && J.memoizedState.tag & 1) {
        if (n.flags |= 2048,
        sr(9, Pc.bind(null, n, r, l, t), void 0, null),
        q === null)
            throw Error(S(349));
        Ut & 30 || _c(n, t, l)
    }
    return l
}
function _c(e, t, n) {
    e.flags |= 16384,
    e = {
        getSnapshot: t,
        value: n
    },
    t = B.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    B.updateQueue = t,
    t.stores = [e]) : (n = t.stores,
    n === null ? t.stores = [e] : n.push(e))
}
function Pc(e, t, n, r) {
    t.value = n,
    t.getSnapshot = r,
    Rc(t) && Mc(e)
}
function Lc(e, t, n) {
    return n(function() {
        Rc(t) && Mc(e)
    })
}
function Rc(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !Ue(e, n)
    } catch {
        return !0
    }
}
function Mc(e) {
    var t = Je(e, 1);
    t !== null && Fe(t, e, 1, -1)
}
function ja(e) {
    var t = He();
    return typeof e == "function" && (e = e()),
    t.memoizedState = t.baseState = e,
    e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ir,
        lastRenderedState: e
    },
    t.queue = e,
    e = e.dispatch = nh.bind(null, B, e),
    [t.memoizedState, e]
}
function sr(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    },
    t = B.updateQueue,
    t === null ? (t = {
        lastEffect: null,
        stores: null
    },
    B.updateQueue = t,
    t.lastEffect = e.next = e) : (n = t.lastEffect,
    n === null ? t.lastEffect = e.next = e : (r = n.next,
    n.next = e,
    e.next = r,
    t.lastEffect = e)),
    e
}
function zc() {
    return Re().memoizedState
}
function Yr(e, t, n, r) {
    var l = He();
    B.flags |= e,
    l.memoizedState = sr(1 | t, n, void 0, r === void 0 ? null : r)
}
function Fl(e, t, n, r) {
    var l = Re();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Y !== null) {
        var i = Y.memoizedState;
        if (o = i.destroy,
        r !== null && ls(r, i.deps)) {
            l.memoizedState = sr(t, n, o, r);
            return
        }
    }
    B.flags |= e,
    l.memoizedState = sr(1 | t, n, o, r)
}
function Ea(e, t) {
    return Yr(8390656, 8, e, t)
}
function ss(e, t) {
    return Fl(2048, 8, e, t)
}
function Tc(e, t) {
    return Fl(4, 2, e, t)
}
function Oc(e, t) {
    return Fl(4, 4, e, t)
}
function Ic(e, t) {
    if (typeof t == "function")
        return e = e(),
        t(e),
        function() {
            t(null)
        }
        ;
    if (t != null)
        return e = e(),
        t.current = e,
        function() {
            t.current = null
        }
}
function Fc(e, t, n) {
    return n = n != null ? n.concat([e]) : null,
    Fl(4, 4, Ic.bind(null, t, e), n)
}
function as() {}
function Uc(e, t) {
    var n = Re();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ls(t, r[1]) ? r[0] : (n.memoizedState = [e, t],
    e)
}
function Dc(e, t) {
    var n = Re();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && ls(t, r[1]) ? r[0] : (e = e(),
    n.memoizedState = [e, t],
    e)
}
function Hc(e, t, n) {
    return Ut & 21 ? (Ue(n, t) || (n = Wu(),
    B.lanes |= n,
    Dt |= n,
    e.baseState = !0),
    t) : (e.baseState && (e.baseState = !1,
    he = !0),
    e.memoizedState = n)
}
function eh(e, t) {
    var n = I;
    I = n !== 0 && 4 > n ? n : 4,
    e(!0);
    var r = wo.transition;
    wo.transition = {};
    try {
        e(!1),
        t()
    } finally {
        I = n,
        wo.transition = r
    }
}
function $c() {
    return Re().memoizedState
}
function th(e, t, n) {
    var r = gt(e);
    if (n = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    },
    Ac(e))
        Bc(t, n);
    else if (n = Sc(e, t, n, r),
    n !== null) {
        var l = ce();
        Fe(n, e, r, l),
        Vc(n, t, r)
    }
}
function nh(e, t, n) {
    var r = gt(e)
      , l = {
        lane: r,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
    };
    if (Ac(e))
        Bc(t, l);
    else {
        var o = e.alternate;
        if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer,
        o !== null))
            try {
                var i = t.lastRenderedState
                  , s = o(i, n);
                if (l.hasEagerState = !0,
                l.eagerState = s,
                Ue(s, i)) {
                    var a = t.interleaved;
                    a === null ? (l.next = l,
                    qi(t)) : (l.next = a.next,
                    a.next = l),
                    t.interleaved = l;
                    return
                }
            } catch {} finally {}
        n = Sc(e, t, l, r),
        n !== null && (l = ce(),
        Fe(n, e, r, l),
        Vc(n, t, r))
    }
}
function Ac(e) {
    var t = e.alternate;
    return e === B || t !== null && t === B
}
function Bc(e, t) {
    Bn = yl = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next,
    n.next = t),
    e.pending = t
}
function Vc(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes,
        n |= r,
        t.lanes = n,
        Hi(e, n)
    }
}
var xl = {
    readContext: Le,
    useCallback: re,
    useContext: re,
    useEffect: re,
    useImperativeHandle: re,
    useInsertionEffect: re,
    useLayoutEffect: re,
    useMemo: re,
    useReducer: re,
    useRef: re,
    useState: re,
    useDebugValue: re,
    useDeferredValue: re,
    useTransition: re,
    useMutableSource: re,
    useSyncExternalStore: re,
    useId: re,
    unstable_isNewReconciler: !1
}
  , rh = {
    readContext: Le,
    useCallback: function(e, t) {
        return He().memoizedState = [e, t === void 0 ? null : t],
        e
    },
    useContext: Le,
    useEffect: Ea,
    useImperativeHandle: function(e, t, n) {
        return n = n != null ? n.concat([e]) : null,
        Yr(4194308, 4, Ic.bind(null, t, e), n)
    },
    useLayoutEffect: function(e, t) {
        return Yr(4194308, 4, e, t)
    },
    useInsertionEffect: function(e, t) {
        return Yr(4, 2, e, t)
    },
    useMemo: function(e, t) {
        var n = He();
        return t = t === void 0 ? null : t,
        e = e(),
        n.memoizedState = [e, t],
        e
    },
    useReducer: function(e, t, n) {
        var r = He();
        return t = n !== void 0 ? n(t) : t,
        r.memoizedState = r.baseState = t,
        e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t
        },
        r.queue = e,
        e = e.dispatch = th.bind(null, B, e),
        [r.memoizedState, e]
    },
    useRef: function(e) {
        var t = He();
        return e = {
            current: e
        },
        t.memoizedState = e
    },
    useState: ja,
    useDebugValue: as,
    useDeferredValue: function(e) {
        return He().memoizedState = e
    },
    useTransition: function() {
        var e = ja(!1)
          , t = e[0];
        return e = eh.bind(null, e[1]),
        He().memoizedState = e,
        [t, e]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(e, t, n) {
        var r = B
          , l = He();
        if (H) {
            if (n === void 0)
                throw Error(S(407));
            n = n()
        } else {
            if (n = t(),
            q === null)
                throw Error(S(349));
            Ut & 30 || _c(r, t, n)
        }
        l.memoizedState = n;
        var o = {
            value: n,
            getSnapshot: t
        };
        return l.queue = o,
        Ea(Lc.bind(null, r, o, e), [e]),
        r.flags |= 2048,
        sr(9, Pc.bind(null, r, o, n, t), void 0, null),
        n
    },
    useId: function() {
        var e = He()
          , t = q.identifierPrefix;
        if (H) {
            var n = Ke
              , r = Qe;
            n = (r & ~(1 << 32 - Ie(r) - 1)).toString(32) + n,
            t = ":" + t + "R" + n,
            n = or++,
            0 < n && (t += "H" + n.toString(32)),
            t += ":"
        } else
            n = qp++,
            t = ":" + t + "r" + n.toString(32) + ":";
        return e.memoizedState = t
    },
    unstable_isNewReconciler: !1
}
  , lh = {
    readContext: Le,
    useCallback: Uc,
    useContext: Le,
    useEffect: ss,
    useImperativeHandle: Fc,
    useInsertionEffect: Tc,
    useLayoutEffect: Oc,
    useMemo: Dc,
    useReducer: ko,
    useRef: zc,
    useState: function() {
        return ko(ir)
    },
    useDebugValue: as,
    useDeferredValue: function(e) {
        var t = Re();
        return Hc(t, Y.memoizedState, e)
    },
    useTransition: function() {
        var e = ko(ir)[0]
          , t = Re().memoizedState;
        return [e, t]
    },
    useMutableSource: Nc,
    useSyncExternalStore: Cc,
    useId: $c,
    unstable_isNewReconciler: !1
}
  , oh = {
    readContext: Le,
    useCallback: Uc,
    useContext: Le,
    useEffect: ss,
    useImperativeHandle: Fc,
    useInsertionEffect: Tc,
    useLayoutEffect: Oc,
    useMemo: Dc,
    useReducer: So,
    useRef: zc,
    useState: function() {
        return So(ir)
    },
    useDebugValue: as,
    useDeferredValue: function(e) {
        var t = Re();
        return Y === null ? t.memoizedState = e : Hc(t, Y.memoizedState, e)
    },
    useTransition: function() {
        var e = So(ir)[0]
          , t = Re().memoizedState;
        return [e, t]
    },
    useMutableSource: Nc,
    useSyncExternalStore: Cc,
    useId: $c,
    unstable_isNewReconciler: !1
};
function ze(e, t) {
    if (e && e.defaultProps) {
        t = V({}, t),
        e = e.defaultProps;
        for (var n in e)
            t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}
function si(e, t, n, r) {
    t = e.memoizedState,
    n = n(r, t),
    n = n == null ? t : V({}, t, n),
    e.memoizedState = n,
    e.lanes === 0 && (e.updateQueue.baseState = n)
}
var Ul = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? At(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = ce()
          , l = gt(e)
          , o = Ye(r, l);
        o.payload = t,
        n != null && (o.callback = n),
        t = mt(e, o, l),
        t !== null && (Fe(t, e, l, r),
        Kr(t, e, l))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = ce()
          , l = gt(e)
          , o = Ye(r, l);
        o.tag = 1,
        o.payload = t,
        n != null && (o.callback = n),
        t = mt(e, o, l),
        t !== null && (Fe(t, e, l, r),
        Kr(t, e, l))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = ce()
          , r = gt(e)
          , l = Ye(n, r);
        l.tag = 2,
        t != null && (l.callback = t),
        t = mt(e, l, r),
        t !== null && (Fe(t, e, r, n),
        Kr(t, e, r))
    }
};
function Na(e, t, n, r, l, o, i) {
    return e = e.stateNode,
    typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !qn(n, r) || !qn(l, o) : !0
}
function Wc(e, t, n) {
    var r = !1
      , l = kt
      , o = t.contextType;
    return typeof o == "object" && o !== null ? o = Le(o) : (l = ve(t) ? It : ie.current,
    r = t.contextTypes,
    o = (r = r != null) ? dn(e, l) : kt),
    t = new t(n,o),
    e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null,
    t.updater = Ul,
    e.stateNode = t,
    t._reactInternals = e,
    r && (e = e.stateNode,
    e.__reactInternalMemoizedUnmaskedChildContext = l,
    e.__reactInternalMemoizedMaskedChildContext = o),
    t
}
function Ca(e, t, n, r) {
    e = t.state,
    typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Ul.enqueueReplaceState(t, t.state, null)
}
function ai(e, t, n, r) {
    var l = e.stateNode;
    l.props = n,
    l.state = e.memoizedState,
    l.refs = {},
    es(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? l.context = Le(o) : (o = ve(t) ? It : ie.current,
    l.context = dn(e, o)),
    l.state = e.memoizedState,
    o = t.getDerivedStateFromProps,
    typeof o == "function" && (si(e, t, o, n),
    l.state = e.memoizedState),
    typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state,
    typeof l.componentWillMount == "function" && l.componentWillMount(),
    typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
    t !== l.state && Ul.enqueueReplaceState(l, l.state, null),
    vl(e, n, l, r),
    l.state = e.memoizedState),
    typeof l.componentDidMount == "function" && (e.flags |= 4194308)
}
function mn(e, t) {
    try {
        var n = ""
          , r = t;
        do
            n += Tf(r),
            r = r.return;
        while (r);
        var l = n
    } catch (o) {
        l = `
Error generating stack: ` + o.message + `
` + o.stack
    }
    return {
        value: e,
        source: t,
        stack: l,
        digest: null
    }
}
function jo(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}
function ui(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var ih = typeof WeakMap == "function" ? WeakMap : Map;
function bc(e, t, n) {
    n = Ye(-1, n),
    n.tag = 3,
    n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        kl || (kl = !0,
        xi = r),
        ui(e, t)
    }
    ,
    n
}
function Qc(e, t, n) {
    n = Ye(-1, n),
    n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var l = t.value;
        n.payload = function() {
            return r(l)
        }
        ,
        n.callback = function() {
            ui(e, t)
        }
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
        ui(e, t),
        typeof r != "function" && (vt === null ? vt = new Set([this]) : vt.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: i !== null ? i : ""
        })
    }
    ),
    n
}
function _a(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new ih;
        var l = new Set;
        r.set(t, l)
    } else
        l = r.get(t),
        l === void 0 && (l = new Set,
        r.set(t, l));
    l.has(n) || (l.add(n),
    e = wh.bind(null, e, t, n),
    t.then(e, e))
}
function Pa(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState,
        t = t !== null ? t.dehydrated !== null : !0),
        t)
            return e;
        e = e.return
    } while (e !== null);
    return null
}
function La(e, t, n, r, l) {
    return e.mode & 1 ? (e.flags |= 65536,
    e.lanes = l,
    e) : (e === t ? e.flags |= 65536 : (e.flags |= 128,
    n.flags |= 131072,
    n.flags &= -52805,
    n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Ye(-1, 1),
    t.tag = 2,
    mt(n, t, 1))),
    n.lanes |= 1),
    e)
}
var sh = et.ReactCurrentOwner
  , he = !1;
function ue(e, t, n, r) {
    t.child = e === null ? kc(t, null, n, r) : pn(t, e.child, n, r)
}
function Ra(e, t, n, r, l) {
    n = n.render;
    var o = t.ref;
    return an(t, l),
    r = os(e, t, n, r, o, l),
    n = is(),
    e !== null && !he ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    qe(e, t, l)) : (H && n && Ki(t),
    t.flags |= 1,
    ue(e, t, r, l),
    t.child)
}
function Ma(e, t, n, r, l) {
    if (e === null) {
        var o = n.type;
        return typeof o == "function" && !vs(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15,
        t.type = o,
        Kc(e, t, o, r, l)) : (e = qr(n.type, null, r, t, t.mode, l),
        e.ref = t.ref,
        e.return = t,
        t.child = e)
    }
    if (o = e.child,
    !(e.lanes & l)) {
        var i = o.memoizedProps;
        if (n = n.compare,
        n = n !== null ? n : qn,
        n(i, r) && e.ref === t.ref)
            return qe(e, t, l)
    }
    return t.flags |= 1,
    e = yt(o, r),
    e.ref = t.ref,
    e.return = t,
    t.child = e
}
function Kc(e, t, n, r, l) {
    if (e !== null) {
        var o = e.memoizedProps;
        if (qn(o, r) && e.ref === t.ref)
            if (he = !1,
            t.pendingProps = r = o,
            (e.lanes & l) !== 0)
                e.flags & 131072 && (he = !0);
            else
                return t.lanes = e.lanes,
                qe(e, t, l)
    }
    return ci(e, t, n, r, l)
}
function Gc(e, t, n) {
    var r = t.pendingProps
      , l = r.children
      , o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1))
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            F(nn, xe),
            xe |= n;
        else {
            if (!(n & 1073741824))
                return e = o !== null ? o.baseLanes | n : n,
                t.lanes = t.childLanes = 1073741824,
                t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null
                },
                t.updateQueue = null,
                F(nn, xe),
                xe |= e,
                null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            },
            r = o !== null ? o.baseLanes : n,
            F(nn, xe),
            xe |= r
        }
    else
        o !== null ? (r = o.baseLanes | n,
        t.memoizedState = null) : r = n,
        F(nn, xe),
        xe |= r;
    return ue(e, t, l, n),
    t.child
}
function Yc(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512,
    t.flags |= 2097152)
}
function ci(e, t, n, r, l) {
    var o = ve(n) ? It : ie.current;
    return o = dn(t, o),
    an(t, l),
    n = os(e, t, n, r, o, l),
    r = is(),
    e !== null && !he ? (t.updateQueue = e.updateQueue,
    t.flags &= -2053,
    e.lanes &= ~l,
    qe(e, t, l)) : (H && r && Ki(t),
    t.flags |= 1,
    ue(e, t, n, l),
    t.child)
}
function za(e, t, n, r, l) {
    if (ve(n)) {
        var o = !0;
        dl(t)
    } else
        o = !1;
    if (an(t, l),
    t.stateNode === null)
        Xr(e, t),
        Wc(t, n, r),
        ai(t, n, r, l),
        r = !0;
    else if (e === null) {
        var i = t.stateNode
          , s = t.memoizedProps;
        i.props = s;
        var a = i.context
          , c = n.contextType;
        typeof c == "object" && c !== null ? c = Le(c) : (c = ve(n) ? It : ie.current,
        c = dn(t, c));
        var m = n.getDerivedStateFromProps
          , h = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function";
        h || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== r || a !== c) && Ca(t, i, r, c),
        lt = !1;
        var v = t.memoizedState;
        i.state = v,
        vl(t, r, i, l),
        a = t.memoizedState,
        s !== r || v !== a || me.current || lt ? (typeof m == "function" && (si(t, n, m, r),
        a = t.memoizedState),
        (s = lt || Na(t, n, s, r, v, a, c)) ? (h || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(),
        typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()),
        typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
        t.memoizedProps = r,
        t.memoizedState = a),
        i.props = r,
        i.state = a,
        i.context = c,
        r = s) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
        r = !1)
    } else {
        i = t.stateNode,
        jc(e, t),
        s = t.memoizedProps,
        c = t.type === t.elementType ? s : ze(t.type, s),
        i.props = c,
        h = t.pendingProps,
        v = i.context,
        a = n.contextType,
        typeof a == "object" && a !== null ? a = Le(a) : (a = ve(n) ? It : ie.current,
        a = dn(t, a));
        var y = n.getDerivedStateFromProps;
        (m = typeof y == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (s !== h || v !== a) && Ca(t, i, r, a),
        lt = !1,
        v = t.memoizedState,
        i.state = v,
        vl(t, r, i, l);
        var x = t.memoizedState;
        s !== h || v !== x || me.current || lt ? (typeof y == "function" && (si(t, n, y, r),
        x = t.memoizedState),
        (c = lt || Na(t, n, c, r, v, x, a) || !1) ? (m || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, x, a),
        typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, x, a)),
        typeof i.componentDidUpdate == "function" && (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024),
        t.memoizedProps = r,
        t.memoizedState = x),
        i.props = r,
        i.state = x,
        i.context = a,
        r = c) : (typeof i.componentDidUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && v === e.memoizedState || (t.flags |= 1024),
        r = !1)
    }
    return di(e, t, n, r, o, l)
}
function di(e, t, n, r, l, o) {
    Yc(e, t);
    var i = (t.flags & 128) !== 0;
    if (!r && !i)
        return l && ga(t, n, !1),
        qe(e, t, o);
    r = t.stateNode,
    sh.current = t;
    var s = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1,
    e !== null && i ? (t.child = pn(t, e.child, null, o),
    t.child = pn(t, null, s, o)) : ue(e, t, s, o),
    t.memoizedState = r.state,
    l && ga(t, n, !0),
    t.child
}
function Xc(e) {
    var t = e.stateNode;
    t.pendingContext ? va(e, t.pendingContext, t.pendingContext !== t.context) : t.context && va(e, t.context, !1),
    ts(e, t.containerInfo)
}
function Ta(e, t, n, r, l) {
    return fn(),
    Yi(l),
    t.flags |= 256,
    ue(e, t, n, r),
    t.child
}
var fi = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};
function pi(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}
function Zc(e, t, n) {
    var r = t.pendingProps, l = A.current, o = !1, i = (t.flags & 128) !== 0, s;
    if ((s = i) || (s = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
    s ? (o = !0,
    t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1),
    F(A, l & 1),
    e === null)
        return oi(t),
        e = t.memoizedState,
        e !== null && (e = e.dehydrated,
        e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1,
        null) : (i = r.children,
        e = r.fallback,
        o ? (r = t.mode,
        o = t.child,
        i = {
            mode: "hidden",
            children: i
        },
        !(r & 1) && o !== null ? (o.childLanes = 0,
        o.pendingProps = i) : o = $l(i, r, 0, null),
        e = Ot(e, r, n, null),
        o.return = t,
        e.return = t,
        o.sibling = e,
        t.child = o,
        t.child.memoizedState = pi(n),
        t.memoizedState = fi,
        e) : us(t, i));
    if (l = e.memoizedState,
    l !== null && (s = l.dehydrated,
    s !== null))
        return ah(e, t, i, r, s, l, n);
    if (o) {
        o = r.fallback,
        i = t.mode,
        l = e.child,
        s = l.sibling;
        var a = {
            mode: "hidden",
            children: r.children
        };
        return !(i & 1) && t.child !== l ? (r = t.child,
        r.childLanes = 0,
        r.pendingProps = a,
        t.deletions = null) : (r = yt(l, a),
        r.subtreeFlags = l.subtreeFlags & 14680064),
        s !== null ? o = yt(s, o) : (o = Ot(o, i, n, null),
        o.flags |= 2),
        o.return = t,
        r.return = t,
        r.sibling = o,
        t.child = r,
        r = o,
        o = t.child,
        i = e.child.memoizedState,
        i = i === null ? pi(n) : {
            baseLanes: i.baseLanes | n,
            cachePool: null,
            transitions: i.transitions
        },
        o.memoizedState = i,
        o.childLanes = e.childLanes & ~n,
        t.memoizedState = fi,
        r
    }
    return o = e.child,
    e = o.sibling,
    r = yt(o, {
        mode: "visible",
        children: r.children
    }),
    !(t.mode & 1) && (r.lanes = n),
    r.return = t,
    r.sibling = null,
    e !== null && (n = t.deletions,
    n === null ? (t.deletions = [e],
    t.flags |= 16) : n.push(e)),
    t.child = r,
    t.memoizedState = null,
    r
}
function us(e, t) {
    return t = $l({
        mode: "visible",
        children: t
    }, e.mode, 0, null),
    t.return = e,
    e.child = t
}
function Ir(e, t, n, r) {
    return r !== null && Yi(r),
    pn(t, e.child, null, n),
    e = us(t, t.pendingProps.children),
    e.flags |= 2,
    t.memoizedState = null,
    e
}
function ah(e, t, n, r, l, o, i) {
    if (n)
        return t.flags & 256 ? (t.flags &= -257,
        r = jo(Error(S(422))),
        Ir(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child,
        t.flags |= 128,
        null) : (o = r.fallback,
        l = t.mode,
        r = $l({
            mode: "visible",
            children: r.children
        }, l, 0, null),
        o = Ot(o, l, i, null),
        o.flags |= 2,
        r.return = t,
        o.return = t,
        r.sibling = o,
        t.child = r,
        t.mode & 1 && pn(t, e.child, null, i),
        t.child.memoizedState = pi(i),
        t.memoizedState = fi,
        o);
    if (!(t.mode & 1))
        return Ir(e, t, i, null);
    if (l.data === "$!") {
        if (r = l.nextSibling && l.nextSibling.dataset,
        r)
            var s = r.dgst;
        return r = s,
        o = Error(S(419)),
        r = jo(o, r, void 0),
        Ir(e, t, i, r)
    }
    if (s = (i & e.childLanes) !== 0,
    he || s) {
        if (r = q,
        r !== null) {
            switch (i & -i) {
            case 4:
                l = 2;
                break;
            case 16:
                l = 8;
                break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
                l = 32;
                break;
            case 536870912:
                l = 268435456;
                break;
            default:
                l = 0
            }
            l = l & (r.suspendedLanes | i) ? 0 : l,
            l !== 0 && l !== o.retryLane && (o.retryLane = l,
            Je(e, l),
            Fe(r, e, l, -1))
        }
        return ms(),
        r = jo(Error(S(421))),
        Ir(e, t, i, r)
    }
    return l.data === "$?" ? (t.flags |= 128,
    t.child = e.child,
    t = kh.bind(null, e),
    l._reactRetry = t,
    null) : (e = o.treeContext,
    we = ht(l.nextSibling),
    ke = t,
    H = !0,
    Oe = null,
    e !== null && (Ne[Ce++] = Qe,
    Ne[Ce++] = Ke,
    Ne[Ce++] = Ft,
    Qe = e.id,
    Ke = e.overflow,
    Ft = t),
    t = us(t, r.children),
    t.flags |= 4096,
    t)
}
function Oa(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t),
    ii(e.return, t, n)
}
function Eo(e, t, n, r, l) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: l
    } : (o.isBackwards = t,
    o.rendering = null,
    o.renderingStartTime = 0,
    o.last = r,
    o.tail = n,
    o.tailMode = l)
}
function Jc(e, t, n) {
    var r = t.pendingProps
      , l = r.revealOrder
      , o = r.tail;
    if (ue(e, t, r.children, n),
    r = A.current,
    r & 2)
        r = r & 1 | 2,
        t.flags |= 128;
    else {
        if (e !== null && e.flags & 128)
            e: for (e = t.child; e !== null; ) {
                if (e.tag === 13)
                    e.memoizedState !== null && Oa(e, n, t);
                else if (e.tag === 19)
                    Oa(e, n, t);
                else if (e.child !== null) {
                    e.child.return = e,
                    e = e.child;
                    continue
                }
                if (e === t)
                    break e;
                for (; e.sibling === null; ) {
                    if (e.return === null || e.return === t)
                        break e;
                    e = e.return
                }
                e.sibling.return = e.return,
                e = e.sibling
            }
        r &= 1
    }
    if (F(A, r),
    !(t.mode & 1))
        t.memoizedState = null;
    else
        switch (l) {
        case "forwards":
            for (n = t.child,
            l = null; n !== null; )
                e = n.alternate,
                e !== null && gl(e) === null && (l = n),
                n = n.sibling;
            n = l,
            n === null ? (l = t.child,
            t.child = null) : (l = n.sibling,
            n.sibling = null),
            Eo(t, !1, l, n, o);
            break;
        case "backwards":
            for (n = null,
            l = t.child,
            t.child = null; l !== null; ) {
                if (e = l.alternate,
                e !== null && gl(e) === null) {
                    t.child = l;
                    break
                }
                e = l.sibling,
                l.sibling = n,
                n = l,
                l = e
            }
            Eo(t, !0, n, null, o);
            break;
        case "together":
            Eo(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
        }
    return t.child
}
function Xr(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null,
    t.alternate = null,
    t.flags |= 2)
}
function qe(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies),
    Dt |= t.lanes,
    !(n & t.childLanes))
        return null;
    if (e !== null && t.child !== e.child)
        throw Error(S(153));
    if (t.child !== null) {
        for (e = t.child,
        n = yt(e, e.pendingProps),
        t.child = n,
        n.return = t; e.sibling !== null; )
            e = e.sibling,
            n = n.sibling = yt(e, e.pendingProps),
            n.return = t;
        n.sibling = null
    }
    return t.child
}
function uh(e, t, n) {
    switch (t.tag) {
    case 3:
        Xc(t),
        fn();
        break;
    case 5:
        Ec(t);
        break;
    case 1:
        ve(t.type) && dl(t);
        break;
    case 4:
        ts(t, t.stateNode.containerInfo);
        break;
    case 10:
        var r = t.type._context
          , l = t.memoizedProps.value;
        F(hl, r._currentValue),
        r._currentValue = l;
        break;
    case 13:
        if (r = t.memoizedState,
        r !== null)
            return r.dehydrated !== null ? (F(A, A.current & 1),
            t.flags |= 128,
            null) : n & t.child.childLanes ? Zc(e, t, n) : (F(A, A.current & 1),
            e = qe(e, t, n),
            e !== null ? e.sibling : null);
        F(A, A.current & 1);
        break;
    case 19:
        if (r = (n & t.childLanes) !== 0,
        e.flags & 128) {
            if (r)
                return Jc(e, t, n);
            t.flags |= 128
        }
        if (l = t.memoizedState,
        l !== null && (l.rendering = null,
        l.tail = null,
        l.lastEffect = null),
        F(A, A.current),
        r)
            break;
        return null;
    case 22:
    case 23:
        return t.lanes = 0,
        Gc(e, t, n)
    }
    return qe(e, t, n)
}
var qc, hi, ed, td;
qc = function(e, t) {
    for (var n = t.child; n !== null; ) {
        if (n.tag === 5 || n.tag === 6)
            e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n,
            n = n.child;
            continue
        }
        if (n === t)
            break;
        for (; n.sibling === null; ) {
            if (n.return === null || n.return === t)
                return;
            n = n.return
        }
        n.sibling.return = n.return,
        n = n.sibling
    }
}
;
hi = function() {}
;
ed = function(e, t, n, r) {
    var l = e.memoizedProps;
    if (l !== r) {
        e = t.stateNode,
        zt(Be.current);
        var o = null;
        switch (n) {
        case "input":
            l = Fo(e, l),
            r = Fo(e, r),
            o = [];
            break;
        case "select":
            l = V({}, l, {
                value: void 0
            }),
            r = V({}, r, {
                value: void 0
            }),
            o = [];
            break;
        case "textarea":
            l = Ho(e, l),
            r = Ho(e, r),
            o = [];
            break;
        default:
            typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ul)
        }
        Ao(n, r);
        var i;
        n = null;
        for (c in l)
            if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null)
                if (c === "style") {
                    var s = l[c];
                    for (i in s)
                        s.hasOwnProperty(i) && (n || (n = {}),
                        n[i] = "")
                } else
                    c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Qn.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
        for (c in r) {
            var a = r[c];
            if (s = l != null ? l[c] : void 0,
            r.hasOwnProperty(c) && a !== s && (a != null || s != null))
                if (c === "style")
                    if (s) {
                        for (i in s)
                            !s.hasOwnProperty(i) || a && a.hasOwnProperty(i) || (n || (n = {}),
                            n[i] = "");
                        for (i in a)
                            a.hasOwnProperty(i) && s[i] !== a[i] && (n || (n = {}),
                            n[i] = a[i])
                    } else
                        n || (o || (o = []),
                        o.push(c, n)),
                        n = a;
                else
                    c === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0,
                    s = s ? s.__html : void 0,
                    a != null && s !== a && (o = o || []).push(c, a)) : c === "children" ? typeof a != "string" && typeof a != "number" || (o = o || []).push(c, "" + a) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Qn.hasOwnProperty(c) ? (a != null && c === "onScroll" && U("scroll", e),
                    o || s === a || (o = [])) : (o = o || []).push(c, a))
        }
        n && (o = o || []).push("style", n);
        var c = o;
        (t.updateQueue = c) && (t.flags |= 4)
    }
}
;
td = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
}
;
function Mn(e, t) {
    if (!H)
        switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null; )
                t.alternate !== null && (n = t),
                t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null; )
                n.alternate !== null && (r = n),
                n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
        }
}
function le(e) {
    var t = e.alternate !== null && e.alternate.child === e.child
      , n = 0
      , r = 0;
    if (t)
        for (var l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags & 14680064,
            r |= l.flags & 14680064,
            l.return = e,
            l = l.sibling;
    else
        for (l = e.child; l !== null; )
            n |= l.lanes | l.childLanes,
            r |= l.subtreeFlags,
            r |= l.flags,
            l.return = e,
            l = l.sibling;
    return e.subtreeFlags |= r,
    e.childLanes = n,
    t
}
function ch(e, t, n) {
    var r = t.pendingProps;
    switch (Gi(t),
    t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
        return le(t),
        null;
    case 1:
        return ve(t.type) && cl(),
        le(t),
        null;
    case 3:
        return r = t.stateNode,
        hn(),
        D(me),
        D(ie),
        rs(),
        r.pendingContext && (r.context = r.pendingContext,
        r.pendingContext = null),
        (e === null || e.child === null) && (Tr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024,
        Oe !== null && (Si(Oe),
        Oe = null))),
        hi(e, t),
        le(t),
        null;
    case 5:
        ns(t);
        var l = zt(lr.current);
        if (n = t.type,
        e !== null && t.stateNode != null)
            ed(e, t, n, r, l),
            e.ref !== t.ref && (t.flags |= 512,
            t.flags |= 2097152);
        else {
            if (!r) {
                if (t.stateNode === null)
                    throw Error(S(166));
                return le(t),
                null
            }
            if (e = zt(Be.current),
            Tr(t)) {
                r = t.stateNode,
                n = t.type;
                var o = t.memoizedProps;
                switch (r[$e] = t,
                r[nr] = o,
                e = (t.mode & 1) !== 0,
                n) {
                case "dialog":
                    U("cancel", r),
                    U("close", r);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    U("load", r);
                    break;
                case "video":
                case "audio":
                    for (l = 0; l < Fn.length; l++)
                        U(Fn[l], r);
                    break;
                case "source":
                    U("error", r);
                    break;
                case "img":
                case "image":
                case "link":
                    U("error", r),
                    U("load", r);
                    break;
                case "details":
                    U("toggle", r);
                    break;
                case "input":
                    Vs(r, o),
                    U("invalid", r);
                    break;
                case "select":
                    r._wrapperState = {
                        wasMultiple: !!o.multiple
                    },
                    U("invalid", r);
                    break;
                case "textarea":
                    bs(r, o),
                    U("invalid", r)
                }
                Ao(n, o),
                l = null;
                for (var i in o)
                    if (o.hasOwnProperty(i)) {
                        var s = o[i];
                        i === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && zr(r.textContent, s, e),
                        l = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && zr(r.textContent, s, e),
                        l = ["children", "" + s]) : Qn.hasOwnProperty(i) && s != null && i === "onScroll" && U("scroll", r)
                    }
                switch (n) {
                case "input":
                    Er(r),
                    Ws(r, o, !0);
                    break;
                case "textarea":
                    Er(r),
                    Qs(r);
                    break;
                case "select":
                case "option":
                    break;
                default:
                    typeof o.onClick == "function" && (r.onclick = ul)
                }
                r = l,
                t.updateQueue = r,
                r !== null && (t.flags |= 4)
            } else {
                i = l.nodeType === 9 ? l : l.ownerDocument,
                e === "http://www.w3.org/1999/xhtml" && (e = Lu(n)),
                e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"),
                e.innerHTML = "<script><\/script>",
                e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, {
                    is: r.is
                }) : (e = i.createElement(n),
                n === "select" && (i = e,
                r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n),
                e[$e] = t,
                e[nr] = r,
                qc(e, t, !1, !1),
                t.stateNode = e;
                e: {
                    switch (i = Bo(n, r),
                    n) {
                    case "dialog":
                        U("cancel", e),
                        U("close", e),
                        l = r;
                        break;
                    case "iframe":
                    case "object":
                    case "embed":
                        U("load", e),
                        l = r;
                        break;
                    case "video":
                    case "audio":
                        for (l = 0; l < Fn.length; l++)
                            U(Fn[l], e);
                        l = r;
                        break;
                    case "source":
                        U("error", e),
                        l = r;
                        break;
                    case "img":
                    case "image":
                    case "link":
                        U("error", e),
                        U("load", e),
                        l = r;
                        break;
                    case "details":
                        U("toggle", e),
                        l = r;
                        break;
                    case "input":
                        Vs(e, r),
                        l = Fo(e, r),
                        U("invalid", e);
                        break;
                    case "option":
                        l = r;
                        break;
                    case "select":
                        e._wrapperState = {
                            wasMultiple: !!r.multiple
                        },
                        l = V({}, r, {
                            value: void 0
                        }),
                        U("invalid", e);
                        break;
                    case "textarea":
                        bs(e, r),
                        l = Ho(e, r),
                        U("invalid", e);
                        break;
                    default:
                        l = r
                    }
                    Ao(n, l),
                    s = l;
                    for (o in s)
                        if (s.hasOwnProperty(o)) {
                            var a = s[o];
                            o === "style" ? zu(e, a) : o === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0,
                            a != null && Ru(e, a)) : o === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && Kn(e, a) : typeof a == "number" && Kn(e, "" + a) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Qn.hasOwnProperty(o) ? a != null && o === "onScroll" && U("scroll", e) : a != null && Ti(e, o, a, i))
                        }
                    switch (n) {
                    case "input":
                        Er(e),
                        Ws(e, r, !1);
                        break;
                    case "textarea":
                        Er(e),
                        Qs(e);
                        break;
                    case "option":
                        r.value != null && e.setAttribute("value", "" + wt(r.value));
                        break;
                    case "select":
                        e.multiple = !!r.multiple,
                        o = r.value,
                        o != null ? rn(e, !!r.multiple, o, !1) : r.defaultValue != null && rn(e, !!r.multiple, r.defaultValue, !0);
                        break;
                    default:
                        typeof l.onClick == "function" && (e.onclick = ul)
                    }
                    switch (n) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        r = !!r.autoFocus;
                        break e;
                    case "img":
                        r = !0;
                        break e;
                    default:
                        r = !1
                    }
                }
                r && (t.flags |= 4)
            }
            t.ref !== null && (t.flags |= 512,
            t.flags |= 2097152)
        }
        return le(t),
        null;
    case 6:
        if (e && t.stateNode != null)
            td(e, t, e.memoizedProps, r);
        else {
            if (typeof r != "string" && t.stateNode === null)
                throw Error(S(166));
            if (n = zt(lr.current),
            zt(Be.current),
            Tr(t)) {
                if (r = t.stateNode,
                n = t.memoizedProps,
                r[$e] = t,
                (o = r.nodeValue !== n) && (e = ke,
                e !== null))
                    switch (e.tag) {
                    case 3:
                        zr(r.nodeValue, n, (e.mode & 1) !== 0);
                        break;
                    case 5:
                        e.memoizedProps.suppressHydrationWarning !== !0 && zr(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                o && (t.flags |= 4)
            } else
                r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r),
                r[$e] = t,
                t.stateNode = r
        }
        return le(t),
        null;
    case 13:
        if (D(A),
        r = t.memoizedState,
        e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (H && we !== null && t.mode & 1 && !(t.flags & 128))
                xc(),
                fn(),
                t.flags |= 98560,
                o = !1;
            else if (o = Tr(t),
            r !== null && r.dehydrated !== null) {
                if (e === null) {
                    if (!o)
                        throw Error(S(318));
                    if (o = t.memoizedState,
                    o = o !== null ? o.dehydrated : null,
                    !o)
                        throw Error(S(317));
                    o[$e] = t
                } else
                    fn(),
                    !(t.flags & 128) && (t.memoizedState = null),
                    t.flags |= 4;
                le(t),
                o = !1
            } else
                Oe !== null && (Si(Oe),
                Oe = null),
                o = !0;
            if (!o)
                return t.flags & 65536 ? t : null
        }
        return t.flags & 128 ? (t.lanes = n,
        t) : (r = r !== null,
        r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192,
        t.mode & 1 && (e === null || A.current & 1 ? X === 0 && (X = 3) : ms())),
        t.updateQueue !== null && (t.flags |= 4),
        le(t),
        null);
    case 4:
        return hn(),
        hi(e, t),
        e === null && er(t.stateNode.containerInfo),
        le(t),
        null;
    case 10:
        return Ji(t.type._context),
        le(t),
        null;
    case 17:
        return ve(t.type) && cl(),
        le(t),
        null;
    case 19:
        if (D(A),
        o = t.memoizedState,
        o === null)
            return le(t),
            null;
        if (r = (t.flags & 128) !== 0,
        i = o.rendering,
        i === null)
            if (r)
                Mn(o, !1);
            else {
                if (X !== 0 || e !== null && e.flags & 128)
                    for (e = t.child; e !== null; ) {
                        if (i = gl(e),
                        i !== null) {
                            for (t.flags |= 128,
                            Mn(o, !1),
                            r = i.updateQueue,
                            r !== null && (t.updateQueue = r,
                            t.flags |= 4),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child; n !== null; )
                                o = n,
                                e = r,
                                o.flags &= 14680066,
                                i = o.alternate,
                                i === null ? (o.childLanes = 0,
                                o.lanes = e,
                                o.child = null,
                                o.subtreeFlags = 0,
                                o.memoizedProps = null,
                                o.memoizedState = null,
                                o.updateQueue = null,
                                o.dependencies = null,
                                o.stateNode = null) : (o.childLanes = i.childLanes,
                                o.lanes = i.lanes,
                                o.child = i.child,
                                o.subtreeFlags = 0,
                                o.deletions = null,
                                o.memoizedProps = i.memoizedProps,
                                o.memoizedState = i.memoizedState,
                                o.updateQueue = i.updateQueue,
                                o.type = i.type,
                                e = i.dependencies,
                                o.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }),
                                n = n.sibling;
                            return F(A, A.current & 1 | 2),
                            t.child
                        }
                        e = e.sibling
                    }
                o.tail !== null && K() > vn && (t.flags |= 128,
                r = !0,
                Mn(o, !1),
                t.lanes = 4194304)
            }
        else {
            if (!r)
                if (e = gl(i),
                e !== null) {
                    if (t.flags |= 128,
                    r = !0,
                    n = e.updateQueue,
                    n !== null && (t.updateQueue = n,
                    t.flags |= 4),
                    Mn(o, !0),
                    o.tail === null && o.tailMode === "hidden" && !i.alternate && !H)
                        return le(t),
                        null
                } else
                    2 * K() - o.renderingStartTime > vn && n !== 1073741824 && (t.flags |= 128,
                    r = !0,
                    Mn(o, !1),
                    t.lanes = 4194304);
            o.isBackwards ? (i.sibling = t.child,
            t.child = i) : (n = o.last,
            n !== null ? n.sibling = i : t.child = i,
            o.last = i)
        }
        return o.tail !== null ? (t = o.tail,
        o.rendering = t,
        o.tail = t.sibling,
        o.renderingStartTime = K(),
        t.sibling = null,
        n = A.current,
        F(A, r ? n & 1 | 2 : n & 1),
        t) : (le(t),
        null);
    case 22:
    case 23:
        return hs(),
        r = t.memoizedState !== null,
        e !== null && e.memoizedState !== null !== r && (t.flags |= 8192),
        r && t.mode & 1 ? xe & 1073741824 && (le(t),
        t.subtreeFlags & 6 && (t.flags |= 8192)) : le(t),
        null;
    case 24:
        return null;
    case 25:
        return null
    }
    throw Error(S(156, t.tag))
}
function dh(e, t) {
    switch (Gi(t),
    t.tag) {
    case 1:
        return ve(t.type) && cl(),
        e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 3:
        return hn(),
        D(me),
        D(ie),
        rs(),
        e = t.flags,
        e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128,
        t) : null;
    case 5:
        return ns(t),
        null;
    case 13:
        if (D(A),
        e = t.memoizedState,
        e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
                throw Error(S(340));
            fn()
        }
        return e = t.flags,
        e & 65536 ? (t.flags = e & -65537 | 128,
        t) : null;
    case 19:
        return D(A),
        null;
    case 4:
        return hn(),
        null;
    case 10:
        return Ji(t.type._context),
        null;
    case 22:
    case 23:
        return hs(),
        null;
    case 24:
        return null;
    default:
        return null
    }
}
var Fr = !1
  , oe = !1
  , fh = typeof WeakSet == "function" ? WeakSet : Set
  , N = null;
function tn(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function")
            try {
                n(null)
            } catch (r) {
                W(e, t, r)
            }
        else
            n.current = null
}
function mi(e, t, n) {
    try {
        n()
    } catch (r) {
        W(e, t, r)
    }
}
var Ia = !1;
function ph(e, t) {
    if (Jo = il,
    e = ic(),
    Qi(e)) {
        if ("selectionStart"in e)
            var n = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        else
            e: {
                n = (n = e.ownerDocument) && n.defaultView || window;
                var r = n.getSelection && n.getSelection();
                if (r && r.rangeCount !== 0) {
                    n = r.anchorNode;
                    var l = r.anchorOffset
                      , o = r.focusNode;
                    r = r.focusOffset;
                    try {
                        n.nodeType,
                        o.nodeType
                    } catch {
                        n = null;
                        break e
                    }
                    var i = 0
                      , s = -1
                      , a = -1
                      , c = 0
                      , m = 0
                      , h = e
                      , v = null;
                    t: for (; ; ) {
                        for (var y; h !== n || l !== 0 && h.nodeType !== 3 || (s = i + l),
                        h !== o || r !== 0 && h.nodeType !== 3 || (a = i + r),
                        h.nodeType === 3 && (i += h.nodeValue.length),
                        (y = h.firstChild) !== null; )
                            v = h,
                            h = y;
                        for (; ; ) {
                            if (h === e)
                                break t;
                            if (v === n && ++c === l && (s = i),
                            v === o && ++m === r && (a = i),
                            (y = h.nextSibling) !== null)
                                break;
                            h = v,
                            v = h.parentNode
                        }
                        h = y
                    }
                    n = s === -1 || a === -1 ? null : {
                        start: s,
                        end: a
                    }
                } else
                    n = null
            }
        n = n || {
            start: 0,
            end: 0
        }
    } else
        n = null;
    for (qo = {
        focusedElem: e,
        selectionRange: n
    },
    il = !1,
    N = t; N !== null; )
        if (t = N,
        e = t.child,
        (t.subtreeFlags & 1028) !== 0 && e !== null)
            e.return = t,
            N = e;
        else
            for (; N !== null; ) {
                t = N;
                try {
                    var x = t.alternate;
                    if (t.flags & 1024)
                        switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (x !== null) {
                                var w = x.memoizedProps
                                  , E = x.memoizedState
                                  , p = t.stateNode
                                  , d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? w : ze(t.type, w), E);
                                p.__reactInternalSnapshotBeforeUpdate = d
                            }
                            break;
                        case 3:
                            var f = t.stateNode.containerInfo;
                            f.nodeType === 1 ? f.textContent = "" : f.nodeType === 9 && f.documentElement && f.removeChild(f.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(S(163))
                        }
                } catch (g) {
                    W(t, t.return, g)
                }
                if (e = t.sibling,
                e !== null) {
                    e.return = t.return,
                    N = e;
                    break
                }
                N = t.return
            }
    return x = Ia,
    Ia = !1,
    x
}
function Vn(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null,
    r !== null) {
        var l = r = r.next;
        do {
            if ((l.tag & e) === e) {
                var o = l.destroy;
                l.destroy = void 0,
                o !== void 0 && mi(t, n, o)
            }
            l = l.next
        } while (l !== r)
    }
}
function Dl(e, t) {
    if (t = t.updateQueue,
    t = t !== null ? t.lastEffect : null,
    t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}
function vi(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
        case 5:
            e = n;
            break;
        default:
            e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}
function nd(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null,
    nd(t)),
    e.child = null,
    e.deletions = null,
    e.sibling = null,
    e.tag === 5 && (t = e.stateNode,
    t !== null && (delete t[$e],
    delete t[nr],
    delete t[ni],
    delete t[Yp],
    delete t[Xp])),
    e.stateNode = null,
    e.return = null,
    e.dependencies = null,
    e.memoizedProps = null,
    e.memoizedState = null,
    e.pendingProps = null,
    e.stateNode = null,
    e.updateQueue = null
}
function rd(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}
function Fa(e) {
    e: for (; ; ) {
        for (; e.sibling === null; ) {
            if (e.return === null || rd(e.return))
                return null;
            e = e.return
        }
        for (e.sibling.return = e.return,
        e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
            if (e.flags & 2 || e.child === null || e.tag === 4)
                continue e;
            e.child.return = e,
            e = e.child
        }
        if (!(e.flags & 2))
            return e.stateNode
    }
}
function gi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode,
        t.insertBefore(e, n)) : (t = n,
        t.appendChild(e)),
        n = n._reactRootContainer,
        n != null || t.onclick !== null || (t.onclick = ul));
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (gi(e, t, n),
        e = e.sibling; e !== null; )
            gi(e, t, n),
            e = e.sibling
}
function yi(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6)
        e = e.stateNode,
        t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child,
    e !== null))
        for (yi(e, t, n),
        e = e.sibling; e !== null; )
            yi(e, t, n),
            e = e.sibling
}
var ee = null
  , Te = !1;
function tt(e, t, n) {
    for (n = n.child; n !== null; )
        ld(e, t, n),
        n = n.sibling
}
function ld(e, t, n) {
    if (Ae && typeof Ae.onCommitFiberUnmount == "function")
        try {
            Ae.onCommitFiberUnmount(Rl, n)
        } catch {}
    switch (n.tag) {
    case 5:
        oe || tn(n, t);
    case 6:
        var r = ee
          , l = Te;
        ee = null,
        tt(e, t, n),
        ee = r,
        Te = l,
        ee !== null && (Te ? (e = ee,
        n = n.stateNode,
        e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ee.removeChild(n.stateNode));
        break;
    case 18:
        ee !== null && (Te ? (e = ee,
        n = n.stateNode,
        e.nodeType === 8 ? go(e.parentNode, n) : e.nodeType === 1 && go(e, n),
        Zn(e)) : go(ee, n.stateNode));
        break;
    case 4:
        r = ee,
        l = Te,
        ee = n.stateNode.containerInfo,
        Te = !0,
        tt(e, t, n),
        ee = r,
        Te = l;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!oe && (r = n.updateQueue,
        r !== null && (r = r.lastEffect,
        r !== null))) {
            l = r = r.next;
            do {
                var o = l
                  , i = o.destroy;
                o = o.tag,
                i !== void 0 && (o & 2 || o & 4) && mi(n, t, i),
                l = l.next
            } while (l !== r)
        }
        tt(e, t, n);
        break;
    case 1:
        if (!oe && (tn(n, t),
        r = n.stateNode,
        typeof r.componentWillUnmount == "function"))
            try {
                r.props = n.memoizedProps,
                r.state = n.memoizedState,
                r.componentWillUnmount()
            } catch (s) {
                W(n, t, s)
            }
        tt(e, t, n);
        break;
    case 21:
        tt(e, t, n);
        break;
    case 22:
        n.mode & 1 ? (oe = (r = oe) || n.memoizedState !== null,
        tt(e, t, n),
        oe = r) : tt(e, t, n);
        break;
    default:
        tt(e, t, n)
    }
}
function Ua(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new fh),
        t.forEach(function(r) {
            var l = Sh.bind(null, e, r);
            n.has(r) || (n.add(r),
            r.then(l, l))
        })
    }
}
function Me(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var l = n[r];
            try {
                var o = e
                  , i = t
                  , s = i;
                e: for (; s !== null; ) {
                    switch (s.tag) {
                    case 5:
                        ee = s.stateNode,
                        Te = !1;
                        break e;
                    case 3:
                        ee = s.stateNode.containerInfo,
                        Te = !0;
                        break e;
                    case 4:
                        ee = s.stateNode.containerInfo,
                        Te = !0;
                        break e
                    }
                    s = s.return
                }
                if (ee === null)
                    throw Error(S(160));
                ld(o, i, l),
                ee = null,
                Te = !1;
                var a = l.alternate;
                a !== null && (a.return = null),
                l.return = null
            } catch (c) {
                W(l, t, c)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null; )
            od(t, e),
            t = t.sibling
}
function od(e, t) {
    var n = e.alternate
      , r = e.flags;
    switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
        if (Me(t, e),
        De(e),
        r & 4) {
            try {
                Vn(3, e, e.return),
                Dl(3, e)
            } catch (w) {
                W(e, e.return, w)
            }
            try {
                Vn(5, e, e.return)
            } catch (w) {
                W(e, e.return, w)
            }
        }
        break;
    case 1:
        Me(t, e),
        De(e),
        r & 512 && n !== null && tn(n, n.return);
        break;
    case 5:
        if (Me(t, e),
        De(e),
        r & 512 && n !== null && tn(n, n.return),
        e.flags & 32) {
            var l = e.stateNode;
            try {
                Kn(l, "")
            } catch (w) {
                W(e, e.return, w)
            }
        }
        if (r & 4 && (l = e.stateNode,
        l != null)) {
            var o = e.memoizedProps
              , i = n !== null ? n.memoizedProps : o
              , s = e.type
              , a = e.updateQueue;
            if (e.updateQueue = null,
            a !== null)
                try {
                    s === "input" && o.type === "radio" && o.name != null && _u(l, o),
                    Bo(s, i);
                    var c = Bo(s, o);
                    for (i = 0; i < a.length; i += 2) {
                        var m = a[i]
                          , h = a[i + 1];
                        m === "style" ? zu(l, h) : m === "dangerouslySetInnerHTML" ? Ru(l, h) : m === "children" ? Kn(l, h) : Ti(l, m, h, c)
                    }
                    switch (s) {
                    case "input":
                        Uo(l, o);
                        break;
                    case "textarea":
                        Pu(l, o);
                        break;
                    case "select":
                        var v = l._wrapperState.wasMultiple;
                        l._wrapperState.wasMultiple = !!o.multiple;
                        var y = o.value;
                        y != null ? rn(l, !!o.multiple, y, !1) : v !== !!o.multiple && (o.defaultValue != null ? rn(l, !!o.multiple, o.defaultValue, !0) : rn(l, !!o.multiple, o.multiple ? [] : "", !1))
                    }
                    l[nr] = o
                } catch (w) {
                    W(e, e.return, w)
                }
        }
        break;
    case 6:
        if (Me(t, e),
        De(e),
        r & 4) {
            if (e.stateNode === null)
                throw Error(S(162));
            l = e.stateNode,
            o = e.memoizedProps;
            try {
                l.nodeValue = o
            } catch (w) {
                W(e, e.return, w)
            }
        }
        break;
    case 3:
        if (Me(t, e),
        De(e),
        r & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
                Zn(t.containerInfo)
            } catch (w) {
                W(e, e.return, w)
            }
        break;
    case 4:
        Me(t, e),
        De(e);
        break;
    case 13:
        Me(t, e),
        De(e),
        l = e.child,
        l.flags & 8192 && (o = l.memoizedState !== null,
        l.stateNode.isHidden = o,
        !o || l.alternate !== null && l.alternate.memoizedState !== null || (fs = K())),
        r & 4 && Ua(e);
        break;
    case 22:
        if (m = n !== null && n.memoizedState !== null,
        e.mode & 1 ? (oe = (c = oe) || m,
        Me(t, e),
        oe = c) : Me(t, e),
        De(e),
        r & 8192) {
            if (c = e.memoizedState !== null,
            (e.stateNode.isHidden = c) && !m && e.mode & 1)
                for (N = e,
                m = e.child; m !== null; ) {
                    for (h = N = m; N !== null; ) {
                        switch (v = N,
                        y = v.child,
                        v.tag) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                            Vn(4, v, v.return);
                            break;
                        case 1:
                            tn(v, v.return);
                            var x = v.stateNode;
                            if (typeof x.componentWillUnmount == "function") {
                                r = v,
                                n = v.return;
                                try {
                                    t = r,
                                    x.props = t.memoizedProps,
                                    x.state = t.memoizedState,
                                    x.componentWillUnmount()
                                } catch (w) {
                                    W(r, n, w)
                                }
                            }
                            break;
                        case 5:
                            tn(v, v.return);
                            break;
                        case 22:
                            if (v.memoizedState !== null) {
                                Ha(h);
                                continue
                            }
                        }
                        y !== null ? (y.return = v,
                        N = y) : Ha(h)
                    }
                    m = m.sibling
                }
            e: for (m = null,
            h = e; ; ) {
                if (h.tag === 5) {
                    if (m === null) {
                        m = h;
                        try {
                            l = h.stateNode,
                            c ? (o = l.style,
                            typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = h.stateNode,
                            a = h.memoizedProps.style,
                            i = a != null && a.hasOwnProperty("display") ? a.display : null,
                            s.style.display = Mu("display", i))
                        } catch (w) {
                            W(e, e.return, w)
                        }
                    }
                } else if (h.tag === 6) {
                    if (m === null)
                        try {
                            h.stateNode.nodeValue = c ? "" : h.memoizedProps
                        } catch (w) {
                            W(e, e.return, w)
                        }
                } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
                    h.child.return = h,
                    h = h.child;
                    continue
                }
                if (h === e)
                    break e;
                for (; h.sibling === null; ) {
                    if (h.return === null || h.return === e)
                        break e;
                    m === h && (m = null),
                    h = h.return
                }
                m === h && (m = null),
                h.sibling.return = h.return,
                h = h.sibling
            }
        }
        break;
    case 19:
        Me(t, e),
        De(e),
        r & 4 && Ua(e);
        break;
    case 21:
        break;
    default:
        Me(t, e),
        De(e)
    }
}
function De(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null; ) {
                    if (rd(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(S(160))
            }
            switch (r.tag) {
            case 5:
                var l = r.stateNode;
                r.flags & 32 && (Kn(l, ""),
                r.flags &= -33);
                var o = Fa(e);
                yi(e, o, l);
                break;
            case 3:
            case 4:
                var i = r.stateNode.containerInfo
                  , s = Fa(e);
                gi(e, s, i);
                break;
            default:
                throw Error(S(161))
            }
        } catch (a) {
            W(e, e.return, a)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}
function hh(e, t, n) {
    N = e,
    id(e)
}
function id(e, t, n) {
    for (var r = (e.mode & 1) !== 0; N !== null; ) {
        var l = N
          , o = l.child;
        if (l.tag === 22 && r) {
            var i = l.memoizedState !== null || Fr;
            if (!i) {
                var s = l.alternate
                  , a = s !== null && s.memoizedState !== null || oe;
                s = Fr;
                var c = oe;
                if (Fr = i,
                (oe = a) && !c)
                    for (N = l; N !== null; )
                        i = N,
                        a = i.child,
                        i.tag === 22 && i.memoizedState !== null ? $a(l) : a !== null ? (a.return = i,
                        N = a) : $a(l);
                for (; o !== null; )
                    N = o,
                    id(o),
                    o = o.sibling;
                N = l,
                Fr = s,
                oe = c
            }
            Da(e)
        } else
            l.subtreeFlags & 8772 && o !== null ? (o.return = l,
            N = o) : Da(e)
    }
}
function Da(e) {
    for (; N !== null; ) {
        var t = N;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772)
                    switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        oe || Dl(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !oe)
                            if (n === null)
                                r.componentDidMount();
                            else {
                                var l = t.elementType === t.type ? n.memoizedProps : ze(t.type, n.memoizedProps);
                                r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            }
                        var o = t.updateQueue;
                        o !== null && Sa(t, o, r);
                        break;
                    case 3:
                        var i = t.updateQueue;
                        if (i !== null) {
                            if (n = null,
                            t.child !== null)
                                switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                                }
                            Sa(t, i, n)
                        }
                        break;
                    case 5:
                        var s = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = s;
                            var a = t.memoizedProps;
                            switch (t.type) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                a.autoFocus && n.focus();
                                break;
                            case "img":
                                a.src && (n.src = a.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var c = t.alternate;
                            if (c !== null) {
                                var m = c.memoizedState;
                                if (m !== null) {
                                    var h = m.dehydrated;
                                    h !== null && Zn(h)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(S(163))
                    }
                oe || t.flags & 512 && vi(t)
            } catch (v) {
                W(t, t.return, v)
            }
        }
        if (t === e) {
            N = null;
            break
        }
        if (n = t.sibling,
        n !== null) {
            n.return = t.return,
            N = n;
            break
        }
        N = t.return
    }
}
function Ha(e) {
    for (; N !== null; ) {
        var t = N;
        if (t === e) {
            N = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return,
            N = n;
            break
        }
        N = t.return
    }
}
function $a(e) {
    for (; N !== null; ) {
        var t = N;
        try {
            switch (t.tag) {
            case 0:
            case 11:
            case 15:
                var n = t.return;
                try {
                    Dl(4, t)
                } catch (a) {
                    W(t, n, a)
                }
                break;
            case 1:
                var r = t.stateNode;
                if (typeof r.componentDidMount == "function") {
                    var l = t.return;
                    try {
                        r.componentDidMount()
                    } catch (a) {
                        W(t, l, a)
                    }
                }
                var o = t.return;
                try {
                    vi(t)
                } catch (a) {
                    W(t, o, a)
                }
                break;
            case 5:
                var i = t.return;
                try {
                    vi(t)
                } catch (a) {
                    W(t, i, a)
                }
            }
        } catch (a) {
            W(t, t.return, a)
        }
        if (t === e) {
            N = null;
            break
        }
        var s = t.sibling;
        if (s !== null) {
            s.return = t.return,
            N = s;
            break
        }
        N = t.return
    }
}
var mh = Math.ceil
  , wl = et.ReactCurrentDispatcher
  , cs = et.ReactCurrentOwner
  , Pe = et.ReactCurrentBatchConfig
  , O = 0
  , q = null
  , G = null
  , te = 0
  , xe = 0
  , nn = jt(0)
  , X = 0
  , ar = null
  , Dt = 0
  , Hl = 0
  , ds = 0
  , Wn = null
  , pe = null
  , fs = 0
  , vn = 1 / 0
  , We = null
  , kl = !1
  , xi = null
  , vt = null
  , Ur = !1
  , at = null
  , Sl = 0
  , bn = 0
  , wi = null
  , Zr = -1
  , Jr = 0;
function ce() {
    return O & 6 ? K() : Zr !== -1 ? Zr : Zr = K()
}
function gt(e) {
    return e.mode & 1 ? O & 2 && te !== 0 ? te & -te : Jp.transition !== null ? (Jr === 0 && (Jr = Wu()),
    Jr) : (e = I,
    e !== 0 || (e = window.event,
    e = e === void 0 ? 16 : Zu(e.type)),
    e) : 1
}
function Fe(e, t, n, r) {
    if (50 < bn)
        throw bn = 0,
        wi = null,
        Error(S(185));
    fr(e, n, r),
    (!(O & 2) || e !== q) && (e === q && (!(O & 2) && (Hl |= n),
    X === 4 && it(e, te)),
    ge(e, r),
    n === 1 && O === 0 && !(t.mode & 1) && (vn = K() + 500,
    Il && Et()))
}
function ge(e, t) {
    var n = e.callbackNode;
    Jf(e, t);
    var r = ol(e, e === q ? te : 0);
    if (r === 0)
        n !== null && Ys(n),
        e.callbackNode = null,
        e.callbackPriority = 0;
    else if (t = r & -r,
    e.callbackPriority !== t) {
        if (n != null && Ys(n),
        t === 1)
            e.tag === 0 ? Zp(Aa.bind(null, e)) : vc(Aa.bind(null, e)),
            Kp(function() {
                !(O & 6) && Et()
            }),
            n = null;
        else {
            switch (bu(r)) {
            case 1:
                n = Di;
                break;
            case 4:
                n = Bu;
                break;
            case 16:
                n = ll;
                break;
            case 536870912:
                n = Vu;
                break;
            default:
                n = ll
            }
            n = hd(n, sd.bind(null, e))
        }
        e.callbackPriority = t,
        e.callbackNode = n
    }
}
function sd(e, t) {
    if (Zr = -1,
    Jr = 0,
    O & 6)
        throw Error(S(327));
    var n = e.callbackNode;
    if (un() && e.callbackNode !== n)
        return null;
    var r = ol(e, e === q ? te : 0);
    if (r === 0)
        return null;
    if (r & 30 || r & e.expiredLanes || t)
        t = jl(e, r);
    else {
        t = r;
        var l = O;
        O |= 2;
        var o = ud();
        (q !== e || te !== t) && (We = null,
        vn = K() + 500,
        Tt(e, t));
        do
            try {
                yh();
                break
            } catch (s) {
                ad(e, s)
            }
        while (!0);
        Zi(),
        wl.current = o,
        O = l,
        G !== null ? t = 0 : (q = null,
        te = 0,
        t = X)
    }
    if (t !== 0) {
        if (t === 2 && (l = Ko(e),
        l !== 0 && (r = l,
        t = ki(e, l))),
        t === 1)
            throw n = ar,
            Tt(e, 0),
            it(e, r),
            ge(e, K()),
            n;
        if (t === 6)
            it(e, r);
        else {
            if (l = e.current.alternate,
            !(r & 30) && !vh(l) && (t = jl(e, r),
            t === 2 && (o = Ko(e),
            o !== 0 && (r = o,
            t = ki(e, o))),
            t === 1))
                throw n = ar,
                Tt(e, 0),
                it(e, r),
                ge(e, K()),
                n;
            switch (e.finishedWork = l,
            e.finishedLanes = r,
            t) {
            case 0:
            case 1:
                throw Error(S(345));
            case 2:
                Lt(e, pe, We);
                break;
            case 3:
                if (it(e, r),
                (r & 130023424) === r && (t = fs + 500 - K(),
                10 < t)) {
                    if (ol(e, 0) !== 0)
                        break;
                    if (l = e.suspendedLanes,
                    (l & r) !== r) {
                        ce(),
                        e.pingedLanes |= e.suspendedLanes & l;
                        break
                    }
                    e.timeoutHandle = ti(Lt.bind(null, e, pe, We), t);
                    break
                }
                Lt(e, pe, We);
                break;
            case 4:
                if (it(e, r),
                (r & 4194240) === r)
                    break;
                for (t = e.eventTimes,
                l = -1; 0 < r; ) {
                    var i = 31 - Ie(r);
                    o = 1 << i,
                    i = t[i],
                    i > l && (l = i),
                    r &= ~o
                }
                if (r = l,
                r = K() - r,
                r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * mh(r / 1960)) - r,
                10 < r) {
                    e.timeoutHandle = ti(Lt.bind(null, e, pe, We), r);
                    break
                }
                Lt(e, pe, We);
                break;
            case 5:
                Lt(e, pe, We);
                break;
            default:
                throw Error(S(329))
            }
        }
    }
    return ge(e, K()),
    e.callbackNode === n ? sd.bind(null, e) : null
}
function ki(e, t) {
    var n = Wn;
    return e.current.memoizedState.isDehydrated && (Tt(e, t).flags |= 256),
    e = jl(e, t),
    e !== 2 && (t = pe,
    pe = n,
    t !== null && Si(t)),
    e
}
function Si(e) {
    pe === null ? pe = e : pe.push.apply(pe, e)
}
function vh(e) {
    for (var t = e; ; ) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores,
            n !== null))
                for (var r = 0; r < n.length; r++) {
                    var l = n[r]
                      , o = l.getSnapshot;
                    l = l.value;
                    try {
                        if (!Ue(o(), l))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child,
        t.subtreeFlags & 16384 && n !== null)
            n.return = t,
            t = n;
        else {
            if (t === e)
                break;
            for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                    return !0;
                t = t.return
            }
            t.sibling.return = t.return,
            t = t.sibling
        }
    }
    return !0
}
function it(e, t) {
    for (t &= ~ds,
    t &= ~Hl,
    e.suspendedLanes |= t,
    e.pingedLanes &= ~t,
    e = e.expirationTimes; 0 < t; ) {
        var n = 31 - Ie(t)
          , r = 1 << n;
        e[n] = -1,
        t &= ~r
    }
}
function Aa(e) {
    if (O & 6)
        throw Error(S(327));
    un();
    var t = ol(e, 0);
    if (!(t & 1))
        return ge(e, K()),
        null;
    var n = jl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Ko(e);
        r !== 0 && (t = r,
        n = ki(e, r))
    }
    if (n === 1)
        throw n = ar,
        Tt(e, 0),
        it(e, t),
        ge(e, K()),
        n;
    if (n === 6)
        throw Error(S(345));
    return e.finishedWork = e.current.alternate,
    e.finishedLanes = t,
    Lt(e, pe, We),
    ge(e, K()),
    null
}
function ps(e, t) {
    var n = O;
    O |= 1;
    try {
        return e(t)
    } finally {
        O = n,
        O === 0 && (vn = K() + 500,
        Il && Et())
    }
}
function Ht(e) {
    at !== null && at.tag === 0 && !(O & 6) && un();
    var t = O;
    O |= 1;
    var n = Pe.transition
      , r = I;
    try {
        if (Pe.transition = null,
        I = 1,
        e)
            return e()
    } finally {
        I = r,
        Pe.transition = n,
        O = t,
        !(O & 6) && Et()
    }
}
function hs() {
    xe = nn.current,
    D(nn)
}
function Tt(e, t) {
    e.finishedWork = null,
    e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1,
    Qp(n)),
    G !== null)
        for (n = G.return; n !== null; ) {
            var r = n;
            switch (Gi(r),
            r.tag) {
            case 1:
                r = r.type.childContextTypes,
                r != null && cl();
                break;
            case 3:
                hn(),
                D(me),
                D(ie),
                rs();
                break;
            case 5:
                ns(r);
                break;
            case 4:
                hn();
                break;
            case 13:
                D(A);
                break;
            case 19:
                D(A);
                break;
            case 10:
                Ji(r.type._context);
                break;
            case 22:
            case 23:
                hs()
            }
            n = n.return
        }
    if (q = e,
    G = e = yt(e.current, null),
    te = xe = t,
    X = 0,
    ar = null,
    ds = Hl = Dt = 0,
    pe = Wn = null,
    Mt !== null) {
        for (t = 0; t < Mt.length; t++)
            if (n = Mt[t],
            r = n.interleaved,
            r !== null) {
                n.interleaved = null;
                var l = r.next
                  , o = n.pending;
                if (o !== null) {
                    var i = o.next;
                    o.next = l,
                    r.next = i
                }
                n.pending = r
            }
        Mt = null
    }
    return e
}
function ad(e, t) {
    do {
        var n = G;
        try {
            if (Zi(),
            Gr.current = xl,
            yl) {
                for (var r = B.memoizedState; r !== null; ) {
                    var l = r.queue;
                    l !== null && (l.pending = null),
                    r = r.next
                }
                yl = !1
            }
            if (Ut = 0,
            J = Y = B = null,
            Bn = !1,
            or = 0,
            cs.current = null,
            n === null || n.return === null) {
                X = 1,
                ar = t,
                G = null;
                break
            }
            e: {
                var o = e
                  , i = n.return
                  , s = n
                  , a = t;
                if (t = te,
                s.flags |= 32768,
                a !== null && typeof a == "object" && typeof a.then == "function") {
                    var c = a
                      , m = s
                      , h = m.tag;
                    if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
                        var v = m.alternate;
                        v ? (m.updateQueue = v.updateQueue,
                        m.memoizedState = v.memoizedState,
                        m.lanes = v.lanes) : (m.updateQueue = null,
                        m.memoizedState = null)
                    }
                    var y = Pa(i);
                    if (y !== null) {
                        y.flags &= -257,
                        La(y, i, s, o, t),
                        y.mode & 1 && _a(o, c, t),
                        t = y,
                        a = c;
                        var x = t.updateQueue;
                        if (x === null) {
                            var w = new Set;
                            w.add(a),
                            t.updateQueue = w
                        } else
                            x.add(a);
                        break e
                    } else {
                        if (!(t & 1)) {
                            _a(o, c, t),
                            ms();
                            break e
                        }
                        a = Error(S(426))
                    }
                } else if (H && s.mode & 1) {
                    var E = Pa(i);
                    if (E !== null) {
                        !(E.flags & 65536) && (E.flags |= 256),
                        La(E, i, s, o, t),
                        Yi(mn(a, s));
                        break e
                    }
                }
                o = a = mn(a, s),
                X !== 4 && (X = 2),
                Wn === null ? Wn = [o] : Wn.push(o),
                o = i;
                do {
                    switch (o.tag) {
                    case 3:
                        o.flags |= 65536,
                        t &= -t,
                        o.lanes |= t;
                        var p = bc(o, a, t);
                        ka(o, p);
                        break e;
                    case 1:
                        s = a;
                        var d = o.type
                          , f = o.stateNode;
                        if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (vt === null || !vt.has(f)))) {
                            o.flags |= 65536,
                            t &= -t,
                            o.lanes |= t;
                            var g = Qc(o, s, t);
                            ka(o, g);
                            break e
                        }
                    }
                    o = o.return
                } while (o !== null)
            }
            dd(n)
        } catch (j) {
            t = j,
            G === n && n !== null && (G = n = n.return);
            continue
        }
        break
    } while (!0)
}
function ud() {
    var e = wl.current;
    return wl.current = xl,
    e === null ? xl : e
}
function ms() {
    (X === 0 || X === 3 || X === 2) && (X = 4),
    q === null || !(Dt & 268435455) && !(Hl & 268435455) || it(q, te)
}
function jl(e, t) {
    var n = O;
    O |= 2;
    var r = ud();
    (q !== e || te !== t) && (We = null,
    Tt(e, t));
    do
        try {
            gh();
            break
        } catch (l) {
            ad(e, l)
        }
    while (!0);
    if (Zi(),
    O = n,
    wl.current = r,
    G !== null)
        throw Error(S(261));
    return q = null,
    te = 0,
    X
}
function gh() {
    for (; G !== null; )
        cd(G)
}
function yh() {
    for (; G !== null && !Vf(); )
        cd(G)
}
function cd(e) {
    var t = pd(e.alternate, e, xe);
    e.memoizedProps = e.pendingProps,
    t === null ? dd(e) : G = t,
    cs.current = null
}
function dd(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return,
        t.flags & 32768) {
            if (n = dh(n, t),
            n !== null) {
                n.flags &= 32767,
                G = n;
                return
            }
            if (e !== null)
                e.flags |= 32768,
                e.subtreeFlags = 0,
                e.deletions = null;
            else {
                X = 6,
                G = null;
                return
            }
        } else if (n = ch(n, t, xe),
        n !== null) {
            G = n;
            return
        }
        if (t = t.sibling,
        t !== null) {
            G = t;
            return
        }
        G = t = e
    } while (t !== null);
    X === 0 && (X = 5)
}
function Lt(e, t, n) {
    var r = I
      , l = Pe.transition;
    try {
        Pe.transition = null,
        I = 1,
        xh(e, t, n, r)
    } finally {
        Pe.transition = l,
        I = r
    }
    return null
}
function xh(e, t, n, r) {
    do
        un();
    while (at !== null);
    if (O & 6)
        throw Error(S(327));
    n = e.finishedWork;
    var l = e.finishedLanes;
    if (n === null)
        return null;
    if (e.finishedWork = null,
    e.finishedLanes = 0,
    n === e.current)
        throw Error(S(177));
    e.callbackNode = null,
    e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (qf(e, o),
    e === q && (G = q = null,
    te = 0),
    !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ur || (Ur = !0,
    hd(ll, function() {
        return un(),
        null
    })),
    o = (n.flags & 15990) !== 0,
    n.subtreeFlags & 15990 || o) {
        o = Pe.transition,
        Pe.transition = null;
        var i = I;
        I = 1;
        var s = O;
        O |= 4,
        cs.current = null,
        ph(e, n),
        od(n, e),
        Hp(qo),
        il = !!Jo,
        qo = Jo = null,
        e.current = n,
        hh(n),
        Wf(),
        O = s,
        I = i,
        Pe.transition = o
    } else
        e.current = n;
    if (Ur && (Ur = !1,
    at = e,
    Sl = l),
    o = e.pendingLanes,
    o === 0 && (vt = null),
    Kf(n.stateNode),
    ge(e, K()),
    t !== null)
        for (r = e.onRecoverableError,
        n = 0; n < t.length; n++)
            l = t[n],
            r(l.value, {
                componentStack: l.stack,
                digest: l.digest
            });
    if (kl)
        throw kl = !1,
        e = xi,
        xi = null,
        e;
    return Sl & 1 && e.tag !== 0 && un(),
    o = e.pendingLanes,
    o & 1 ? e === wi ? bn++ : (bn = 0,
    wi = e) : bn = 0,
    Et(),
    null
}
function un() {
    if (at !== null) {
        var e = bu(Sl)
          , t = Pe.transition
          , n = I;
        try {
            if (Pe.transition = null,
            I = 16 > e ? 16 : e,
            at === null)
                var r = !1;
            else {
                if (e = at,
                at = null,
                Sl = 0,
                O & 6)
                    throw Error(S(331));
                var l = O;
                for (O |= 4,
                N = e.current; N !== null; ) {
                    var o = N
                      , i = o.child;
                    if (N.flags & 16) {
                        var s = o.deletions;
                        if (s !== null) {
                            for (var a = 0; a < s.length; a++) {
                                var c = s[a];
                                for (N = c; N !== null; ) {
                                    var m = N;
                                    switch (m.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Vn(8, m, o)
                                    }
                                    var h = m.child;
                                    if (h !== null)
                                        h.return = m,
                                        N = h;
                                    else
                                        for (; N !== null; ) {
                                            m = N;
                                            var v = m.sibling
                                              , y = m.return;
                                            if (nd(m),
                                            m === c) {
                                                N = null;
                                                break
                                            }
                                            if (v !== null) {
                                                v.return = y,
                                                N = v;
                                                break
                                            }
                                            N = y
                                        }
                                }
                            }
                            var x = o.alternate;
                            if (x !== null) {
                                var w = x.child;
                                if (w !== null) {
                                    x.child = null;
                                    do {
                                        var E = w.sibling;
                                        w.sibling = null,
                                        w = E
                                    } while (w !== null)
                                }
                            }
                            N = o
                        }
                    }
                    if (o.subtreeFlags & 2064 && i !== null)
                        i.return = o,
                        N = i;
                    else
                        e: for (; N !== null; ) {
                            if (o = N,
                            o.flags & 2048)
                                switch (o.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Vn(9, o, o.return)
                                }
                            var p = o.sibling;
                            if (p !== null) {
                                p.return = o.return,
                                N = p;
                                break e
                            }
                            N = o.return
                        }
                }
                var d = e.current;
                for (N = d; N !== null; ) {
                    i = N;
                    var f = i.child;
                    if (i.subtreeFlags & 2064 && f !== null)
                        f.return = i,
                        N = f;
                    else
                        e: for (i = d; N !== null; ) {
                            if (s = N,
                            s.flags & 2048)
                                try {
                                    switch (s.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Dl(9, s)
                                    }
                                } catch (j) {
                                    W(s, s.return, j)
                                }
                            if (s === i) {
                                N = null;
                                break e
                            }
                            var g = s.sibling;
                            if (g !== null) {
                                g.return = s.return,
                                N = g;
                                break e
                            }
                            N = s.return
                        }
                }
                if (O = l,
                Et(),
                Ae && typeof Ae.onPostCommitFiberRoot == "function")
                    try {
                        Ae.onPostCommitFiberRoot(Rl, e)
                    } catch {}
                r = !0
            }
            return r
        } finally {
            I = n,
            Pe.transition = t
        }
    }
    return !1
}
function Ba(e, t, n) {
    t = mn(n, t),
    t = bc(e, t, 1),
    e = mt(e, t, 1),
    t = ce(),
    e !== null && (fr(e, 1, t),
    ge(e, t))
}
function W(e, t, n) {
    if (e.tag === 3)
        Ba(e, e, n);
    else
        for (; t !== null; ) {
            if (t.tag === 3) {
                Ba(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (vt === null || !vt.has(r))) {
                    e = mn(n, e),
                    e = Qc(t, e, 1),
                    t = mt(t, e, 1),
                    e = ce(),
                    t !== null && (fr(t, 1, e),
                    ge(t, e));
                    break
                }
            }
            t = t.return
        }
}
function wh(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t),
    t = ce(),
    e.pingedLanes |= e.suspendedLanes & n,
    q === e && (te & n) === n && (X === 4 || X === 3 && (te & 130023424) === te && 500 > K() - fs ? Tt(e, 0) : ds |= n),
    ge(e, t)
}
function fd(e, t) {
    t === 0 && (e.mode & 1 ? (t = _r,
    _r <<= 1,
    !(_r & 130023424) && (_r = 4194304)) : t = 1);
    var n = ce();
    e = Je(e, t),
    e !== null && (fr(e, t, n),
    ge(e, n))
}
function kh(e) {
    var t = e.memoizedState
      , n = 0;
    t !== null && (n = t.retryLane),
    fd(e, n)
}
function Sh(e, t) {
    var n = 0;
    switch (e.tag) {
    case 13:
        var r = e.stateNode
          , l = e.memoizedState;
        l !== null && (n = l.retryLane);
        break;
    case 19:
        r = e.stateNode;
        break;
    default:
        throw Error(S(314))
    }
    r !== null && r.delete(t),
    fd(e, n)
}
var pd;
pd = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || me.current)
            he = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128))
                return he = !1,
                uh(e, t, n);
            he = !!(e.flags & 131072)
        }
    else
        he = !1,
        H && t.flags & 1048576 && gc(t, pl, t.index);
    switch (t.lanes = 0,
    t.tag) {
    case 2:
        var r = t.type;
        Xr(e, t),
        e = t.pendingProps;
        var l = dn(t, ie.current);
        an(t, n),
        l = os(null, t, r, e, l, n);
        var o = is();
        return t.flags |= 1,
        typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1,
        t.memoizedState = null,
        t.updateQueue = null,
        ve(r) ? (o = !0,
        dl(t)) : o = !1,
        t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null,
        es(t),
        l.updater = Ul,
        t.stateNode = l,
        l._reactInternals = t,
        ai(t, r, e, n),
        t = di(null, t, r, !0, o, n)) : (t.tag = 0,
        H && o && Ki(t),
        ue(null, t, l, n),
        t = t.child),
        t;
    case 16:
        r = t.elementType;
        e: {
            switch (Xr(e, t),
            e = t.pendingProps,
            l = r._init,
            r = l(r._payload),
            t.type = r,
            l = t.tag = Eh(r),
            e = ze(r, e),
            l) {
            case 0:
                t = ci(null, t, r, e, n);
                break e;
            case 1:
                t = za(null, t, r, e, n);
                break e;
            case 11:
                t = Ra(null, t, r, e, n);
                break e;
            case 14:
                t = Ma(null, t, r, ze(r.type, e), n);
                break e
            }
            throw Error(S(306, r, ""))
        }
        return t;
    case 0:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : ze(r, l),
        ci(e, t, r, l, n);
    case 1:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : ze(r, l),
        za(e, t, r, l, n);
    case 3:
        e: {
            if (Xc(t),
            e === null)
                throw Error(S(387));
            r = t.pendingProps,
            o = t.memoizedState,
            l = o.element,
            jc(e, t),
            vl(t, r, null, n);
            var i = t.memoizedState;
            if (r = i.element,
            o.isDehydrated)
                if (o = {
                    element: r,
                    isDehydrated: !1,
                    cache: i.cache,
                    pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                    transitions: i.transitions
                },
                t.updateQueue.baseState = o,
                t.memoizedState = o,
                t.flags & 256) {
                    l = mn(Error(S(423)), t),
                    t = Ta(e, t, r, n, l);
                    break e
                } else if (r !== l) {
                    l = mn(Error(S(424)), t),
                    t = Ta(e, t, r, n, l);
                    break e
                } else
                    for (we = ht(t.stateNode.containerInfo.firstChild),
                    ke = t,
                    H = !0,
                    Oe = null,
                    n = kc(t, null, r, n),
                    t.child = n; n; )
                        n.flags = n.flags & -3 | 4096,
                        n = n.sibling;
            else {
                if (fn(),
                r === l) {
                    t = qe(e, t, n);
                    break e
                }
                ue(e, t, r, n)
            }
            t = t.child
        }
        return t;
    case 5:
        return Ec(t),
        e === null && oi(t),
        r = t.type,
        l = t.pendingProps,
        o = e !== null ? e.memoizedProps : null,
        i = l.children,
        ei(r, l) ? i = null : o !== null && ei(r, o) && (t.flags |= 32),
        Yc(e, t),
        ue(e, t, i, n),
        t.child;
    case 6:
        return e === null && oi(t),
        null;
    case 13:
        return Zc(e, t, n);
    case 4:
        return ts(t, t.stateNode.containerInfo),
        r = t.pendingProps,
        e === null ? t.child = pn(t, null, r, n) : ue(e, t, r, n),
        t.child;
    case 11:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : ze(r, l),
        Ra(e, t, r, l, n);
    case 7:
        return ue(e, t, t.pendingProps, n),
        t.child;
    case 8:
        return ue(e, t, t.pendingProps.children, n),
        t.child;
    case 12:
        return ue(e, t, t.pendingProps.children, n),
        t.child;
    case 10:
        e: {
            if (r = t.type._context,
            l = t.pendingProps,
            o = t.memoizedProps,
            i = l.value,
            F(hl, r._currentValue),
            r._currentValue = i,
            o !== null)
                if (Ue(o.value, i)) {
                    if (o.children === l.children && !me.current) {
                        t = qe(e, t, n);
                        break e
                    }
                } else
                    for (o = t.child,
                    o !== null && (o.return = t); o !== null; ) {
                        var s = o.dependencies;
                        if (s !== null) {
                            i = o.child;
                            for (var a = s.firstContext; a !== null; ) {
                                if (a.context === r) {
                                    if (o.tag === 1) {
                                        a = Ye(-1, n & -n),
                                        a.tag = 2;
                                        var c = o.updateQueue;
                                        if (c !== null) {
                                            c = c.shared;
                                            var m = c.pending;
                                            m === null ? a.next = a : (a.next = m.next,
                                            m.next = a),
                                            c.pending = a
                                        }
                                    }
                                    o.lanes |= n,
                                    a = o.alternate,
                                    a !== null && (a.lanes |= n),
                                    ii(o.return, n, t),
                                    s.lanes |= n;
                                    break
                                }
                                a = a.next
                            }
                        } else if (o.tag === 10)
                            i = o.type === t.type ? null : o.child;
                        else if (o.tag === 18) {
                            if (i = o.return,
                            i === null)
                                throw Error(S(341));
                            i.lanes |= n,
                            s = i.alternate,
                            s !== null && (s.lanes |= n),
                            ii(i, n, t),
                            i = o.sibling
                        } else
                            i = o.child;
                        if (i !== null)
                            i.return = o;
                        else
                            for (i = o; i !== null; ) {
                                if (i === t) {
                                    i = null;
                                    break
                                }
                                if (o = i.sibling,
                                o !== null) {
                                    o.return = i.return,
                                    i = o;
                                    break
                                }
                                i = i.return
                            }
                        o = i
                    }
            ue(e, t, l.children, n),
            t = t.child
        }
        return t;
    case 9:
        return l = t.type,
        r = t.pendingProps.children,
        an(t, n),
        l = Le(l),
        r = r(l),
        t.flags |= 1,
        ue(e, t, r, n),
        t.child;
    case 14:
        return r = t.type,
        l = ze(r, t.pendingProps),
        l = ze(r.type, l),
        Ma(e, t, r, l, n);
    case 15:
        return Kc(e, t, t.type, t.pendingProps, n);
    case 17:
        return r = t.type,
        l = t.pendingProps,
        l = t.elementType === r ? l : ze(r, l),
        Xr(e, t),
        t.tag = 1,
        ve(r) ? (e = !0,
        dl(t)) : e = !1,
        an(t, n),
        Wc(t, r, l),
        ai(t, r, l, n),
        di(null, t, r, !0, e, n);
    case 19:
        return Jc(e, t, n);
    case 22:
        return Gc(e, t, n)
    }
    throw Error(S(156, t.tag))
}
;
function hd(e, t) {
    return Au(e, t)
}
function jh(e, t, n, r) {
    this.tag = e,
    this.key = n,
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null,
    this.index = 0,
    this.ref = null,
    this.pendingProps = t,
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null,
    this.mode = r,
    this.subtreeFlags = this.flags = 0,
    this.deletions = null,
    this.childLanes = this.lanes = 0,
    this.alternate = null
}
function _e(e, t, n, r) {
    return new jh(e,t,n,r)
}
function vs(e) {
    return e = e.prototype,
    !(!e || !e.isReactComponent)
}
function Eh(e) {
    if (typeof e == "function")
        return vs(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof,
        e === Ii)
            return 11;
        if (e === Fi)
            return 14
    }
    return 2
}
function yt(e, t) {
    var n = e.alternate;
    return n === null ? (n = _e(e.tag, t, e.key, e.mode),
    n.elementType = e.elementType,
    n.type = e.type,
    n.stateNode = e.stateNode,
    n.alternate = e,
    e.alternate = n) : (n.pendingProps = t,
    n.type = e.type,
    n.flags = 0,
    n.subtreeFlags = 0,
    n.deletions = null),
    n.flags = e.flags & 14680064,
    n.childLanes = e.childLanes,
    n.lanes = e.lanes,
    n.child = e.child,
    n.memoizedProps = e.memoizedProps,
    n.memoizedState = e.memoizedState,
    n.updateQueue = e.updateQueue,
    t = e.dependencies,
    n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    },
    n.sibling = e.sibling,
    n.index = e.index,
    n.ref = e.ref,
    n
}
function qr(e, t, n, r, l, o) {
    var i = 2;
    if (r = e,
    typeof e == "function")
        vs(e) && (i = 1);
    else if (typeof e == "string")
        i = 5;
    else
        e: switch (e) {
        case Qt:
            return Ot(n.children, l, o, t);
        case Oi:
            i = 8,
            l |= 8;
            break;
        case zo:
            return e = _e(12, n, t, l | 2),
            e.elementType = zo,
            e.lanes = o,
            e;
        case To:
            return e = _e(13, n, t, l),
            e.elementType = To,
            e.lanes = o,
            e;
        case Oo:
            return e = _e(19, n, t, l),
            e.elementType = Oo,
            e.lanes = o,
            e;
        case Eu:
            return $l(n, l, o, t);
        default:
            if (typeof e == "object" && e !== null)
                switch (e.$$typeof) {
                case Su:
                    i = 10;
                    break e;
                case ju:
                    i = 9;
                    break e;
                case Ii:
                    i = 11;
                    break e;
                case Fi:
                    i = 14;
                    break e;
                case rt:
                    i = 16,
                    r = null;
                    break e
                }
            throw Error(S(130, e == null ? e : typeof e, ""))
        }
    return t = _e(i, n, t, l),
    t.elementType = e,
    t.type = r,
    t.lanes = o,
    t
}
function Ot(e, t, n, r) {
    return e = _e(7, e, r, t),
    e.lanes = n,
    e
}
function $l(e, t, n, r) {
    return e = _e(22, e, r, t),
    e.elementType = Eu,
    e.lanes = n,
    e.stateNode = {
        isHidden: !1
    },
    e
}
function No(e, t, n) {
    return e = _e(6, e, null, t),
    e.lanes = n,
    e
}
function Co(e, t, n) {
    return t = _e(4, e.children !== null ? e.children : [], e.key, t),
    t.lanes = n,
    t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    },
    t
}
function Nh(e, t, n, r, l) {
    this.tag = t,
    this.containerInfo = e,
    this.finishedWork = this.pingCache = this.current = this.pendingChildren = null,
    this.timeoutHandle = -1,
    this.callbackNode = this.pendingContext = this.context = null,
    this.callbackPriority = 0,
    this.eventTimes = oo(0),
    this.expirationTimes = oo(-1),
    this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0,
    this.entanglements = oo(0),
    this.identifierPrefix = r,
    this.onRecoverableError = l,
    this.mutableSourceEagerHydrationData = null
}
function gs(e, t, n, r, l, o, i, s, a) {
    return e = new Nh(e,t,n,s,a),
    t === 1 ? (t = 1,
    o === !0 && (t |= 8)) : t = 0,
    o = _e(3, null, null, t),
    e.current = o,
    o.stateNode = e,
    o.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    },
    es(o),
    e
}
function Ch(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: bt,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}
function md(e) {
    if (!e)
        return kt;
    e = e._reactInternals;
    e: {
        if (At(e) !== e || e.tag !== 1)
            throw Error(S(170));
        var t = e;
        do {
            switch (t.tag) {
            case 3:
                t = t.stateNode.context;
                break e;
            case 1:
                if (ve(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e
                }
            }
            t = t.return
        } while (t !== null);
        throw Error(S(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (ve(n))
            return mc(e, n, t)
    }
    return t
}
function vd(e, t, n, r, l, o, i, s, a) {
    return e = gs(n, r, !0, e, l, o, i, s, a),
    e.context = md(null),
    n = e.current,
    r = ce(),
    l = gt(n),
    o = Ye(r, l),
    o.callback = t ?? null,
    mt(n, o, l),
    e.current.lanes = l,
    fr(e, l, r),
    ge(e, r),
    e
}
function Al(e, t, n, r) {
    var l = t.current
      , o = ce()
      , i = gt(l);
    return n = md(n),
    t.context === null ? t.context = n : t.pendingContext = n,
    t = Ye(o, i),
    t.payload = {
        element: e
    },
    r = r === void 0 ? null : r,
    r !== null && (t.callback = r),
    e = mt(l, t, i),
    e !== null && (Fe(e, l, i, o),
    Kr(e, l, i)),
    i
}
function El(e) {
    if (e = e.current,
    !e.child)
        return null;
    switch (e.child.tag) {
    case 5:
        return e.child.stateNode;
    default:
        return e.child.stateNode
    }
}
function Va(e, t) {
    if (e = e.memoizedState,
    e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}
function ys(e, t) {
    Va(e, t),
    (e = e.alternate) && Va(e, t)
}
function _h() {
    return null
}
var gd = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
}
;
function xs(e) {
    this._internalRoot = e
}
Bl.prototype.render = xs.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
        throw Error(S(409));
    Al(e, t, null, null)
}
;
Bl.prototype.unmount = xs.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Ht(function() {
            Al(null, e, null, null)
        }),
        t[Ze] = null
    }
}
;
function Bl(e) {
    this._internalRoot = e
}
Bl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = Gu();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < ot.length && t !== 0 && t < ot[n].priority; n++)
            ;
        ot.splice(n, 0, e),
        n === 0 && Xu(e)
    }
}
;
function ws(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}
function Vl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}
function Wa() {}
function Ph(e, t, n, r, l) {
    if (l) {
        if (typeof r == "function") {
            var o = r;
            r = function() {
                var c = El(i);
                o.call(c)
            }
        }
        var i = vd(t, r, e, 0, null, !1, !1, "", Wa);
        return e._reactRootContainer = i,
        e[Ze] = i.current,
        er(e.nodeType === 8 ? e.parentNode : e),
        Ht(),
        i
    }
    for (; l = e.lastChild; )
        e.removeChild(l);
    if (typeof r == "function") {
        var s = r;
        r = function() {
            var c = El(a);
            s.call(c)
        }
    }
    var a = gs(e, 0, !1, null, null, !1, !1, "", Wa);
    return e._reactRootContainer = a,
    e[Ze] = a.current,
    er(e.nodeType === 8 ? e.parentNode : e),
    Ht(function() {
        Al(t, a, n, r)
    }),
    a
}
function Wl(e, t, n, r, l) {
    var o = n._reactRootContainer;
    if (o) {
        var i = o;
        if (typeof l == "function") {
            var s = l;
            l = function() {
                var a = El(i);
                s.call(a)
            }
        }
        Al(t, i, e, l)
    } else
        i = Ph(n, t, e, l, r);
    return El(i)
}
Qu = function(e) {
    switch (e.tag) {
    case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
            var n = In(t.pendingLanes);
            n !== 0 && (Hi(t, n | 1),
            ge(t, K()),
            !(O & 6) && (vn = K() + 500,
            Et()))
        }
        break;
    case 13:
        Ht(function() {
            var r = Je(e, 1);
            if (r !== null) {
                var l = ce();
                Fe(r, e, 1, l)
            }
        }),
        ys(e, 1)
    }
}
;
$i = function(e) {
    if (e.tag === 13) {
        var t = Je(e, 134217728);
        if (t !== null) {
            var n = ce();
            Fe(t, e, 134217728, n)
        }
        ys(e, 134217728)
    }
}
;
Ku = function(e) {
    if (e.tag === 13) {
        var t = gt(e)
          , n = Je(e, t);
        if (n !== null) {
            var r = ce();
            Fe(n, e, t, r)
        }
        ys(e, t)
    }
}
;
Gu = function() {
    return I
}
;
Yu = function(e, t) {
    var n = I;
    try {
        return I = e,
        t()
    } finally {
        I = n
    }
}
;
Wo = function(e, t, n) {
    switch (t) {
    case "input":
        if (Uo(e, n),
        t = n.name,
        n.type === "radio" && t != null) {
            for (n = e; n.parentNode; )
                n = n.parentNode;
            for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'),
            t = 0; t < n.length; t++) {
                var r = n[t];
                if (r !== e && r.form === e.form) {
                    var l = Ol(r);
                    if (!l)
                        throw Error(S(90));
                    Cu(r),
                    Uo(r, l)
                }
            }
        }
        break;
    case "textarea":
        Pu(e, n);
        break;
    case "select":
        t = n.value,
        t != null && rn(e, !!n.multiple, t, !1)
    }
}
;
Iu = ps;
Fu = Ht;
var Lh = {
    usingClientEntryPoint: !1,
    Events: [hr, Xt, Ol, Tu, Ou, ps]
}
  , zn = {
    findFiberByHostInstance: Rt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom"
}
  , Rh = {
    bundleType: zn.bundleType,
    version: zn.version,
    rendererPackageName: zn.rendererPackageName,
    rendererConfig: zn.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: et.ReactCurrentDispatcher,
    findHostInstanceByFiber: function(e) {
        return e = Hu(e),
        e === null ? null : e.stateNode
    },
    findFiberByHostInstance: zn.findFiberByHostInstance || _h,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Dr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Dr.isDisabled && Dr.supportsFiber)
        try {
            Rl = Dr.inject(Rh),
            Ae = Dr
        } catch {}
}
je.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Lh;
je.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ws(t))
        throw Error(S(200));
    return Ch(e, t, null, n)
}
;
je.createRoot = function(e, t) {
    if (!ws(e))
        throw Error(S(299));
    var n = !1
      , r = ""
      , l = gd;
    return t != null && (t.unstable_strictMode === !0 && (n = !0),
    t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
    t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
    t = gs(e, 1, !1, null, null, n, !1, r, l),
    e[Ze] = t.current,
    er(e.nodeType === 8 ? e.parentNode : e),
    new xs(t)
}
;
je.findDOMNode = function(e) {
    if (e == null)
        return null;
    if (e.nodeType === 1)
        return e;
    var t = e._reactInternals;
    if (t === void 0)
        throw typeof e.render == "function" ? Error(S(188)) : (e = Object.keys(e).join(","),
        Error(S(268, e)));
    return e = Hu(t),
    e = e === null ? null : e.stateNode,
    e
}
;
je.flushSync = function(e) {
    return Ht(e)
}
;
je.hydrate = function(e, t, n) {
    if (!Vl(t))
        throw Error(S(200));
    return Wl(null, e, t, !0, n)
}
;
je.hydrateRoot = function(e, t, n) {
    if (!ws(e))
        throw Error(S(405));
    var r = n != null && n.hydratedSources || null
      , l = !1
      , o = ""
      , i = gd;
    if (n != null && (n.unstable_strictMode === !0 && (l = !0),
    n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
    n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    t = vd(t, null, e, 1, n ?? null, l, !1, o, i),
    e[Ze] = t.current,
    er(e),
    r)
        for (e = 0; e < r.length; e++)
            n = r[e],
            l = n._getVersion,
            l = l(n._source),
            t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(n, l);
    return new Bl(t)
}
;
je.render = function(e, t, n) {
    if (!Vl(t))
        throw Error(S(200));
    return Wl(null, e, t, !1, n)
}
;
je.unmountComponentAtNode = function(e) {
    if (!Vl(e))
        throw Error(S(40));
    return e._reactRootContainer ? (Ht(function() {
        Wl(null, null, e, !1, function() {
            e._reactRootContainer = null,
            e[Ze] = null
        })
    }),
    !0) : !1
}
;
je.unstable_batchedUpdates = ps;
je.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!Vl(n))
        throw Error(S(200));
    if (e == null || e._reactInternals === void 0)
        throw Error(S(38));
    return Wl(e, t, n, !1, r)
}
;
je.version = "18.3.1-next-f1338f8080-20240426";
function yd() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
        try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yd)
        } catch (e) {
            console.error(e)
        }
}
yd(),
yu.exports = je;
var Mh = yu.exports, xd, ba = Mh;
xd = ba.createRoot,
ba.hydrateRoot;
/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ur() {
    return ur = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    ur.apply(this, arguments)
}
var ut;
(function(e) {
    e.Pop = "POP",
    e.Push = "PUSH",
    e.Replace = "REPLACE"
}
)(ut || (ut = {}));
const Qa = "popstate";
function zh(e) {
    e === void 0 && (e = {});
    function t(r, l) {
        let {pathname: o, search: i, hash: s} = r.location;
        return ji("", {
            pathname: o,
            search: i,
            hash: s
        }, l.state && l.state.usr || null, l.state && l.state.key || "default")
    }
    function n(r, l) {
        return typeof l == "string" ? l : Nl(l)
    }
    return Oh(t, n, null, e)
}
function b(e, t) {
    if (e === !1 || e === null || typeof e > "u")
        throw new Error(t)
}
function ks(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t)
        } catch {}
    }
}
function Th() {
    return Math.random().toString(36).substr(2, 8)
}
function Ka(e, t) {
    return {
        usr: e.state,
        key: e.key,
        idx: t
    }
}
function ji(e, t, n, r) {
    return n === void 0 && (n = null),
    ur({
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: ""
    }, typeof t == "string" ? kn(t) : t, {
        state: n,
        key: t && t.key || r || Th()
    })
}
function Nl(e) {
    let {pathname: t="/", search: n="", hash: r=""} = e;
    return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r),
    t
}
function kn(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && (t.hash = e.substr(n),
        e = e.substr(0, n));
        let r = e.indexOf("?");
        r >= 0 && (t.search = e.substr(r),
        e = e.substr(0, r)),
        e && (t.pathname = e)
    }
    return t
}
function Oh(e, t, n, r) {
    r === void 0 && (r = {});
    let {window: l=document.defaultView, v5Compat: o=!1} = r
      , i = l.history
      , s = ut.Pop
      , a = null
      , c = m();
    c == null && (c = 0,
    i.replaceState(ur({}, i.state, {
        idx: c
    }), ""));
    function m() {
        return (i.state || {
            idx: null
        }).idx
    }
    function h() {
        s = ut.Pop;
        let E = m()
          , p = E == null ? null : E - c;
        c = E,
        a && a({
            action: s,
            location: w.location,
            delta: p
        })
    }
    function v(E, p) {
        s = ut.Push;
        let d = ji(w.location, E, p);
        c = m() + 1;
        let f = Ka(d, c)
          , g = w.createHref(d);
        try {
            i.pushState(f, "", g)
        } catch (j) {
            if (j instanceof DOMException && j.name === "DataCloneError")
                throw j;
            l.location.assign(g)
        }
        o && a && a({
            action: s,
            location: w.location,
            delta: 1
        })
    }
    function y(E, p) {
        s = ut.Replace;
        let d = ji(w.location, E, p);
        c = m();
        let f = Ka(d, c)
          , g = w.createHref(d);
        i.replaceState(f, "", g),
        o && a && a({
            action: s,
            location: w.location,
            delta: 0
        })
    }
    function x(E) {
        let p = l.location.origin !== "null" ? l.location.origin : l.location.href
          , d = typeof E == "string" ? E : Nl(E);
        return d = d.replace(/ $/, "%20"),
        b(p, "No window.location.(origin|href) available to create URL for href: " + d),
        new URL(d,p)
    }
    let w = {
        get action() {
            return s
        },
        get location() {
            return e(l, i)
        },
        listen(E) {
            if (a)
                throw new Error("A history only accepts one active listener");
            return l.addEventListener(Qa, h),
            a = E,
            () => {
                l.removeEventListener(Qa, h),
                a = null
            }
        },
        createHref(E) {
            return t(l, E)
        },
        createURL: x,
        encodeLocation(E) {
            let p = x(E);
            return {
                pathname: p.pathname,
                search: p.search,
                hash: p.hash
            }
        },
        push: v,
        replace: y,
        go(E) {
            return i.go(E)
        }
    };
    return w
}
var Ga;
(function(e) {
    e.data = "data",
    e.deferred = "deferred",
    e.redirect = "redirect",
    e.error = "error"
}
)(Ga || (Ga = {}));
function Ih(e, t, n) {
    return n === void 0 && (n = "/"),
    Fh(e, t, n)
}
function Fh(e, t, n, r) {
    let l = typeof t == "string" ? kn(t) : t
      , o = gn(l.pathname || "/", n);
    if (o == null)
        return null;
    let i = wd(e);
    Uh(i);
    let s = null;
    for (let a = 0; s == null && a < i.length; ++a) {
        let c = Gh(o);
        s = Qh(i[a], c)
    }
    return s
}
function wd(e, t, n, r) {
    t === void 0 && (t = []),
    n === void 0 && (n = []),
    r === void 0 && (r = "");
    let l = (o, i, s) => {
        let a = {
            relativePath: s === void 0 ? o.path || "" : s,
            caseSensitive: o.caseSensitive === !0,
            childrenIndex: i,
            route: o
        };
        a.relativePath.startsWith("/") && (b(a.relativePath.startsWith(r), 'Absolute route path "' + a.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."),
        a.relativePath = a.relativePath.slice(r.length));
        let c = xt([r, a.relativePath])
          , m = n.concat(a);
        o.children && o.children.length > 0 && (b(o.index !== !0, "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + c + '".')),
        wd(o.children, t, m, c)),
        !(o.path == null && !o.index) && t.push({
            path: c,
            score: Wh(c, o.index),
            routesMeta: m
        })
    }
    ;
    return e.forEach( (o, i) => {
        var s;
        if (o.path === "" || !((s = o.path) != null && s.includes("?")))
            l(o, i);
        else
            for (let a of kd(o.path))
                l(o, i, a)
    }
    ),
    t
}
function kd(e) {
    let t = e.split("/");
    if (t.length === 0)
        return [];
    let[n,...r] = t
      , l = n.endsWith("?")
      , o = n.replace(/\?$/, "");
    if (r.length === 0)
        return l ? [o, ""] : [o];
    let i = kd(r.join("/"))
      , s = [];
    return s.push(...i.map(a => a === "" ? o : [o, a].join("/"))),
    l && s.push(...i),
    s.map(a => e.startsWith("/") && a === "" ? "/" : a)
}
function Uh(e) {
    e.sort( (t, n) => t.score !== n.score ? n.score - t.score : bh(t.routesMeta.map(r => r.childrenIndex), n.routesMeta.map(r => r.childrenIndex)))
}
const Dh = /^:[\w-]+$/
  , Hh = 3
  , $h = 2
  , Ah = 1
  , Bh = 10
  , Vh = -2
  , Ya = e => e === "*";
function Wh(e, t) {
    let n = e.split("/")
      , r = n.length;
    return n.some(Ya) && (r += Vh),
    t && (r += $h),
    n.filter(l => !Ya(l)).reduce( (l, o) => l + (Dh.test(o) ? Hh : o === "" ? Ah : Bh), r)
}
function bh(e, t) {
    return e.length === t.length && e.slice(0, -1).every( (r, l) => r === t[l]) ? e[e.length - 1] - t[t.length - 1] : 0
}
function Qh(e, t, n) {
    let {routesMeta: r} = e
      , l = {}
      , o = "/"
      , i = [];
    for (let s = 0; s < r.length; ++s) {
        let a = r[s]
          , c = s === r.length - 1
          , m = o === "/" ? t : t.slice(o.length) || "/"
          , h = Ei({
            path: a.relativePath,
            caseSensitive: a.caseSensitive,
            end: c
        }, m)
          , v = a.route;
        if (!h)
            return null;
        Object.assign(l, h.params),
        i.push({
            params: l,
            pathname: xt([o, h.pathname]),
            pathnameBase: qh(xt([o, h.pathnameBase])),
            route: v
        }),
        h.pathnameBase !== "/" && (o = xt([o, h.pathnameBase]))
    }
    return i
}
function Ei(e, t) {
    typeof e == "string" && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let[n,r] = Kh(e.path, e.caseSensitive, e.end)
      , l = t.match(n);
    if (!l)
        return null;
    let o = l[0]
      , i = o.replace(/(.)\/+$/, "$1")
      , s = l.slice(1);
    return {
        params: r.reduce( (c, m, h) => {
            let {paramName: v, isOptional: y} = m;
            if (v === "*") {
                let w = s[h] || "";
                i = o.slice(0, o.length - w.length).replace(/(.)\/+$/, "$1")
            }
            const x = s[h];
            return y && !x ? c[v] = void 0 : c[v] = (x || "").replace(/%2F/g, "/"),
            c
        }
        , {}),
        pathname: o,
        pathnameBase: i,
        pattern: e
    }
}
function Kh(e, t, n) {
    t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    ks(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
    let r = []
      , l = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (i, s, a) => (r.push({
        paramName: s,
        isOptional: a != null
    }),
    a ? "/?([^\\/]+)?" : "/([^\\/]+)"));
    return e.endsWith("*") ? (r.push({
        paramName: "*"
    }),
    l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? l += "\\/*$" : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"),
    [new RegExp(l,t ? void 0 : "i"), r]
}
function Gh(e) {
    try {
        return e.split("/").map(t => decodeURIComponent(t).replace(/\//g, "%2F")).join("/")
    } catch (t) {
        return ks(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")),
        e
    }
}
function gn(e, t) {
    if (t === "/")
        return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase()))
        return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length
      , r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/"
}
const Yh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , Xh = e => Yh.test(e);
function Zh(e, t) {
    t === void 0 && (t = "/");
    let {pathname: n, search: r="", hash: l=""} = typeof e == "string" ? kn(e) : e, o;
    if (n)
        if (Xh(n))
            o = n;
        else {
            if (n.includes("//")) {
                let i = n;
                n = n.replace(/\/\/+/g, "/"),
                ks(!1, "Pathnames cannot have embedded double slashes - normalizing " + (i + " -> " + n))
            }
            n.startsWith("/") ? o = Xa(n.substring(1), "/") : o = Xa(n, t)
        }
    else
        o = t;
    return {
        pathname: o,
        search: em(r),
        hash: tm(l)
    }
}
function Xa(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return e.split("/").forEach(l => {
        l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l)
    }
    ),
    n.length > 1 ? n.join("/") : "/"
}
function _o(e, t, n, r) {
    return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.'
}
function Jh(e) {
    return e.filter( (t, n) => n === 0 || t.route.path && t.route.path.length > 0)
}
function Sd(e, t) {
    let n = Jh(e);
    return t ? n.map( (r, l) => l === n.length - 1 ? r.pathname : r.pathnameBase) : n.map(r => r.pathnameBase)
}
function jd(e, t, n, r) {
    r === void 0 && (r = !1);
    let l;
    typeof e == "string" ? l = kn(e) : (l = ur({}, e),
    b(!l.pathname || !l.pathname.includes("?"), _o("?", "pathname", "search", l)),
    b(!l.pathname || !l.pathname.includes("#"), _o("#", "pathname", "hash", l)),
    b(!l.search || !l.search.includes("#"), _o("#", "search", "hash", l)));
    let o = e === "" || l.pathname === "", i = o ? "/" : l.pathname, s;
    if (i == null)
        s = n;
    else {
        let h = t.length - 1;
        if (!r && i.startsWith("..")) {
            let v = i.split("/");
            for (; v[0] === ".."; )
                v.shift(),
                h -= 1;
            l.pathname = v.join("/")
        }
        s = h >= 0 ? t[h] : "/"
    }
    let a = Zh(l, s)
      , c = i && i !== "/" && i.endsWith("/")
      , m = (o || i === ".") && n.endsWith("/");
    return !a.pathname.endsWith("/") && (c || m) && (a.pathname += "/"),
    a
}
const xt = e => e.join("/").replace(/\/\/+/g, "/")
  , qh = e => e.replace(/\/+$/, "").replace(/^\/*/, "/")
  , em = e => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e
  , tm = e => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function nm(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data"in e
}
const Ed = ["post", "put", "patch", "delete"];
new Set(Ed);
const rm = ["get", ...Ed];
new Set(rm);
/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function cr() {
    return cr = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    cr.apply(this, arguments)
}
const bl = k.createContext(null)
  , Nd = k.createContext(null)
  , Nt = k.createContext(null)
  , Ql = k.createContext(null)
  , Bt = k.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
})
  , Cd = k.createContext(null);
function lm(e, t) {
    let {relative: n} = t === void 0 ? {} : t;
    vr() || b(!1);
    let {basename: r, navigator: l} = k.useContext(Nt)
      , {hash: o, pathname: i, search: s} = Kl(e, {
        relative: n
    })
      , a = i;
    return r !== "/" && (a = i === "/" ? r : xt([r, i])),
    l.createHref({
        pathname: a,
        search: s,
        hash: o
    })
}
function vr() {
    return k.useContext(Ql) != null
}
function Sn() {
    return vr() || b(!1),
    k.useContext(Ql).location
}
function _d(e) {
    k.useContext(Nt).static || k.useLayoutEffect(e)
}
function om() {
    let {isDataRoute: e} = k.useContext(Bt);
    return e ? ym() : im()
}
function im() {
    vr() || b(!1);
    let e = k.useContext(bl)
      , {basename: t, future: n, navigator: r} = k.useContext(Nt)
      , {matches: l} = k.useContext(Bt)
      , {pathname: o} = Sn()
      , i = JSON.stringify(Sd(l, n.v7_relativeSplatPath))
      , s = k.useRef(!1);
    return _d( () => {
        s.current = !0
    }
    ),
    k.useCallback(function(c, m) {
        if (m === void 0 && (m = {}),
        !s.current)
            return;
        if (typeof c == "number") {
            r.go(c);
            return
        }
        let h = jd(c, JSON.parse(i), o, m.relative === "path");
        e == null && t !== "/" && (h.pathname = h.pathname === "/" ? t : xt([t, h.pathname])),
        (m.replace ? r.replace : r.push)(h, m.state, m)
    }, [t, r, i, o, e])
}
function Kl(e, t) {
    let {relative: n} = t === void 0 ? {} : t
      , {future: r} = k.useContext(Nt)
      , {matches: l} = k.useContext(Bt)
      , {pathname: o} = Sn()
      , i = JSON.stringify(Sd(l, r.v7_relativeSplatPath));
    return k.useMemo( () => jd(e, JSON.parse(i), o, n === "path"), [e, i, o, n])
}
function sm(e, t) {
    return am(e, t)
}
function am(e, t, n, r) {
    vr() || b(!1);
    let {navigator: l} = k.useContext(Nt)
      , {matches: o} = k.useContext(Bt)
      , i = o[o.length - 1]
      , s = i ? i.params : {};
    i && i.pathname;
    let a = i ? i.pathnameBase : "/";
    i && i.route;
    let c = Sn(), m;
    if (t) {
        var h;
        let E = typeof t == "string" ? kn(t) : t;
        a === "/" || (h = E.pathname) != null && h.startsWith(a) || b(!1),
        m = E
    } else
        m = c;
    let v = m.pathname || "/"
      , y = v;
    if (a !== "/") {
        let E = a.replace(/^\//, "").split("/");
        y = "/" + v.replace(/^\//, "").split("/").slice(E.length).join("/")
    }
    let x = Ih(e, {
        pathname: y
    })
      , w = pm(x && x.map(E => Object.assign({}, E, {
        params: Object.assign({}, s, E.params),
        pathname: xt([a, l.encodeLocation ? l.encodeLocation(E.pathname).pathname : E.pathname]),
        pathnameBase: E.pathnameBase === "/" ? a : xt([a, l.encodeLocation ? l.encodeLocation(E.pathnameBase).pathname : E.pathnameBase])
    })), o, n, r);
    return t && w ? k.createElement(Ql.Provider, {
        value: {
            location: cr({
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default"
            }, m),
            navigationType: ut.Pop
        }
    }, w) : w
}
function um() {
    let e = gm()
      , t = nm(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e)
      , n = e instanceof Error ? e.stack : null
      , l = {
        padding: "0.5rem",
        backgroundColor: "rgba(200,200,200, 0.5)"
    };
    return k.createElement(k.Fragment, null, k.createElement("h2", null, "Unexpected Application Error!"), k.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, t), n ? k.createElement("pre", {
        style: l
    }, n) : null, null)
}
const cm = k.createElement(um, null);
class dm extends k.Component {
    constructor(t) {
        super(t),
        this.state = {
            location: t.location,
            revalidation: t.revalidation,
            error: t.error
        }
    }
    static getDerivedStateFromError(t) {
        return {
            error: t
        }
    }
    static getDerivedStateFromProps(t, n) {
        return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
            error: t.error,
            location: t.location,
            revalidation: t.revalidation
        } : {
            error: t.error !== void 0 ? t.error : n.error,
            location: n.location,
            revalidation: t.revalidation || n.revalidation
        }
    }
    componentDidCatch(t, n) {
        console.error("React Router caught the following error during render", t, n)
    }
    render() {
        return this.state.error !== void 0 ? k.createElement(Bt.Provider, {
            value: this.props.routeContext
        }, k.createElement(Cd.Provider, {
            value: this.state.error,
            children: this.props.component
        })) : this.props.children
    }
}
function fm(e) {
    let {routeContext: t, match: n, children: r} = e
      , l = k.useContext(bl);
    return l && l.static && l.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = n.route.id),
    k.createElement(Bt.Provider, {
        value: t
    }, r)
}
function pm(e, t, n, r) {
    var l;
    if (t === void 0 && (t = []),
    n === void 0 && (n = null),
    r === void 0 && (r = null),
    e == null) {
        var o;
        if (!n)
            return null;
        if (n.errors)
            e = n.matches;
        else if ((o = r) != null && o.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0)
            e = n.matches;
        else
            return null
    }
    let i = e
      , s = (l = n) == null ? void 0 : l.errors;
    if (s != null) {
        let m = i.findIndex(h => h.route.id && (s == null ? void 0 : s[h.route.id]) !== void 0);
        m >= 0 || b(!1),
        i = i.slice(0, Math.min(i.length, m + 1))
    }
    let a = !1
      , c = -1;
    if (n && r && r.v7_partialHydration)
        for (let m = 0; m < i.length; m++) {
            let h = i[m];
            if ((h.route.HydrateFallback || h.route.hydrateFallbackElement) && (c = m),
            h.route.id) {
                let {loaderData: v, errors: y} = n
                  , x = h.route.loader && v[h.route.id] === void 0 && (!y || y[h.route.id] === void 0);
                if (h.route.lazy || x) {
                    a = !0,
                    c >= 0 ? i = i.slice(0, c + 1) : i = [i[0]];
                    break
                }
            }
        }
    return i.reduceRight( (m, h, v) => {
        let y, x = !1, w = null, E = null;
        n && (y = s && h.route.id ? s[h.route.id] : void 0,
        w = h.route.errorElement || cm,
        a && (c < 0 && v === 0 ? (xm("route-fallback"),
        x = !0,
        E = null) : c === v && (x = !0,
        E = h.route.hydrateFallbackElement || null)));
        let p = t.concat(i.slice(0, v + 1))
          , d = () => {
            let f;
            return y ? f = w : x ? f = E : h.route.Component ? f = k.createElement(h.route.Component, null) : h.route.element ? f = h.route.element : f = m,
            k.createElement(fm, {
                match: h,
                routeContext: {
                    outlet: m,
                    matches: p,
                    isDataRoute: n != null
                },
                children: f
            })
        }
        ;
        return n && (h.route.ErrorBoundary || h.route.errorElement || v === 0) ? k.createElement(dm, {
            location: n.location,
            revalidation: n.revalidation,
            component: w,
            error: y,
            children: d(),
            routeContext: {
                outlet: null,
                matches: p,
                isDataRoute: !0
            }
        }) : d()
    }
    , null)
}
var Pd = function(e) {
    return e.UseBlocker = "useBlocker",
    e.UseRevalidator = "useRevalidator",
    e.UseNavigateStable = "useNavigate",
    e
}(Pd || {})
  , Ld = function(e) {
    return e.UseBlocker = "useBlocker",
    e.UseLoaderData = "useLoaderData",
    e.UseActionData = "useActionData",
    e.UseRouteError = "useRouteError",
    e.UseNavigation = "useNavigation",
    e.UseRouteLoaderData = "useRouteLoaderData",
    e.UseMatches = "useMatches",
    e.UseRevalidator = "useRevalidator",
    e.UseNavigateStable = "useNavigate",
    e.UseRouteId = "useRouteId",
    e
}(Ld || {});
function hm(e) {
    let t = k.useContext(bl);
    return t || b(!1),
    t
}
function mm(e) {
    let t = k.useContext(Nd);
    return t || b(!1),
    t
}
function vm(e) {
    let t = k.useContext(Bt);
    return t || b(!1),
    t
}
function Rd(e) {
    let t = vm()
      , n = t.matches[t.matches.length - 1];
    return n.route.id || b(!1),
    n.route.id
}
function gm() {
    var e;
    let t = k.useContext(Cd)
      , n = mm()
      , r = Rd();
    return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r]
}
function ym() {
    let {router: e} = hm(Pd.UseNavigateStable)
      , t = Rd(Ld.UseNavigateStable)
      , n = k.useRef(!1);
    return _d( () => {
        n.current = !0
    }
    ),
    k.useCallback(function(l, o) {
        o === void 0 && (o = {}),
        n.current && (typeof l == "number" ? e.navigate(l) : e.navigate(l, cr({
            fromRouteId: t
        }, o)))
    }, [e, t])
}
const Za = {};
function xm(e, t, n) {
    Za[e] || (Za[e] = !0)
}
function wm(e, t) {
    e == null || e.v7_startTransition,
    e == null || e.v7_relativeSplatPath
}
function Wt(e) {
    b(!1)
}
function km(e) {
    let {basename: t="/", children: n=null, location: r, navigationType: l=ut.Pop, navigator: o, static: i=!1, future: s} = e;
    vr() && b(!1);
    let a = t.replace(/^\/*/, "/")
      , c = k.useMemo( () => ({
        basename: a,
        navigator: o,
        static: i,
        future: cr({
            v7_relativeSplatPath: !1
        }, s)
    }), [a, s, o, i]);
    typeof r == "string" && (r = kn(r));
    let {pathname: m="/", search: h="", hash: v="", state: y=null, key: x="default"} = r
      , w = k.useMemo( () => {
        let E = gn(m, a);
        return E == null ? null : {
            location: {
                pathname: E,
                search: h,
                hash: v,
                state: y,
                key: x
            },
            navigationType: l
        }
    }
    , [a, m, h, v, y, x, l]);
    return w == null ? null : k.createElement(Nt.Provider, {
        value: c
    }, k.createElement(Ql.Provider, {
        children: n,
        value: w
    }))
}
function Sm(e) {
    let {children: t, location: n} = e;
    return sm(Ni(t), n)
}
new Promise( () => {}
);
function Ni(e, t) {
    t === void 0 && (t = []);
    let n = [];
    return k.Children.forEach(e, (r, l) => {
        if (!k.isValidElement(r))
            return;
        let o = [...t, l];
        if (r.type === k.Fragment) {
            n.push.apply(n, Ni(r.props.children, o));
            return
        }
        r.type !== Wt && b(!1),
        !r.props.index || !r.props.children || b(!1);
        let i = {
            id: r.props.id || o.join("-"),
            caseSensitive: r.props.caseSensitive,
            element: r.props.element,
            Component: r.props.Component,
            index: r.props.index,
            path: r.props.path,
            loader: r.props.loader,
            action: r.props.action,
            errorElement: r.props.errorElement,
            ErrorBoundary: r.props.ErrorBoundary,
            hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
            shouldRevalidate: r.props.shouldRevalidate,
            handle: r.props.handle,
            lazy: r.props.lazy
        };
        r.props.children && (i.children = Ni(r.props.children, o)),
        n.push(i)
    }
    ),
    n
}
/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Cl() {
    return Cl = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    Cl.apply(this, arguments)
}
function Md(e, t) {
    if (e == null)
        return {};
    var n = {}, r = Object.keys(e), l, o;
    for (o = 0; o < r.length; o++)
        l = r[o],
        !(t.indexOf(l) >= 0) && (n[l] = e[l]);
    return n
}
function jm(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}
function Em(e, t) {
    return e.button === 0 && (!t || t === "_self") && !jm(e)
}
const Nm = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"]
  , Cm = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"]
  , _m = "6";
try {
    window.__reactRouterVersion = _m
} catch {}
const Pm = k.createContext({
    isTransitioning: !1
})
  , Lm = "startTransition"
  , Ja = wf[Lm];
function Rm(e) {
    let {basename: t, children: n, future: r, window: l} = e
      , o = k.useRef();
    o.current == null && (o.current = zh({
        window: l,
        v5Compat: !0
    }));
    let i = o.current
      , [s,a] = k.useState({
        action: i.action,
        location: i.location
    })
      , {v7_startTransition: c} = r || {}
      , m = k.useCallback(h => {
        c && Ja ? Ja( () => a(h)) : a(h)
    }
    , [a, c]);
    return k.useLayoutEffect( () => i.listen(m), [i, m]),
    k.useEffect( () => wm(r), [r]),
    k.createElement(km, {
        basename: t,
        children: n,
        location: s.location,
        navigationType: s.action,
        navigator: i,
        future: r
    })
}
const Mm = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u"
  , zm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
  , Tm = k.forwardRef(function(t, n) {
    let {onClick: r, relative: l, reloadDocument: o, replace: i, state: s, target: a, to: c, preventScrollReset: m, viewTransition: h} = t, v = Md(t, Nm), {basename: y} = k.useContext(Nt), x, w = !1;
    if (typeof c == "string" && zm.test(c) && (x = c,
    Mm))
        try {
            let f = new URL(window.location.href)
              , g = c.startsWith("//") ? new URL(f.protocol + c) : new URL(c)
              , j = gn(g.pathname, y);
            g.origin === f.origin && j != null ? c = j + g.search + g.hash : w = !0
        } catch {}
    let E = lm(c, {
        relative: l
    })
      , p = Im(c, {
        replace: i,
        state: s,
        target: a,
        preventScrollReset: m,
        relative: l,
        viewTransition: h
    });
    function d(f) {
        r && r(f),
        f.defaultPrevented || p(f)
    }
    return k.createElement("a", Cl({}, v, {
        href: x || E,
        onClick: w || o ? r : d,
        ref: n,
        target: a
    }))
})
  , ae = k.forwardRef(function(t, n) {
    let {"aria-current": r="page", caseSensitive: l=!1, className: o="", end: i=!1, style: s, to: a, viewTransition: c, children: m} = t
      , h = Md(t, Cm)
      , v = Kl(a, {
        relative: h.relative
    })
      , y = Sn()
      , x = k.useContext(Nd)
      , {navigator: w, basename: E} = k.useContext(Nt)
      , p = x != null && Fm(v) && c === !0
      , d = w.encodeLocation ? w.encodeLocation(v).pathname : v.pathname
      , f = y.pathname
      , g = x && x.navigation && x.navigation.location ? x.navigation.location.pathname : null;
    l || (f = f.toLowerCase(),
    g = g ? g.toLowerCase() : null,
    d = d.toLowerCase()),
    g && E && (g = gn(g, E) || g);
    const j = d !== "/" && d.endsWith("/") ? d.length - 1 : d.length;
    let _ = f === d || !i && f.startsWith(d) && f.charAt(j) === "/", P = g != null && (g === d || !i && g.startsWith(d) && g.charAt(d.length) === "/"), L = {
        isActive: _,
        isPending: P,
        isTransitioning: p
    }, $ = _ ? r : void 0, M;
    typeof o == "function" ? M = o(L) : M = [o, _ ? "active" : null, P ? "pending" : null, p ? "transitioning" : null].filter(Boolean).join(" ");
    let ye = typeof s == "function" ? s(L) : s;
    return k.createElement(Tm, Cl({}, h, {
        "aria-current": $,
        className: M,
        ref: n,
        style: ye,
        to: a,
        viewTransition: c
    }), typeof m == "function" ? m(L) : m)
});
var Ci;
(function(e) {
    e.UseScrollRestoration = "useScrollRestoration",
    e.UseSubmit = "useSubmit",
    e.UseSubmitFetcher = "useSubmitFetcher",
    e.UseFetcher = "useFetcher",
    e.useViewTransitionState = "useViewTransitionState"
}
)(Ci || (Ci = {}));
var qa;
(function(e) {
    e.UseFetcher = "useFetcher",
    e.UseFetchers = "useFetchers",
    e.UseScrollRestoration = "useScrollRestoration"
}
)(qa || (qa = {}));
function Om(e) {
    let t = k.useContext(bl);
    return t || b(!1),
    t
}
function Im(e, t) {
    let {target: n, replace: r, state: l, preventScrollReset: o, relative: i, viewTransition: s} = t === void 0 ? {} : t
      , a = om()
      , c = Sn()
      , m = Kl(e, {
        relative: i
    });
    return k.useCallback(h => {
        if (Em(h, n)) {
            h.preventDefault();
            let v = r !== void 0 ? r : Nl(c) === Nl(m);
            a(e, {
                replace: v,
                state: l,
                preventScrollReset: o,
                relative: i,
                viewTransition: s
            })
        }
    }
    , [c, a, m, r, l, n, e, o, i, s])
}
function Fm(e, t) {
    t === void 0 && (t = {});
    let n = k.useContext(Pm);
    n == null && b(!1);
    let {basename: r} = Om(Ci.useViewTransitionState)
      , l = Kl(e, {
        relative: t.relative
    });
    if (!n.isTransitioning)
        return !1;
    let o = gn(n.currentLocation.pathname, r) || n.currentLocation.pathname
      , i = gn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
    return Ei(l.pathname, i) != null || Ei(l.pathname, o) != null
}
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Um = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
  , zd = (...e) => e.filter( (t, n, r) => !!t && r.indexOf(t) === n).join(" ");
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Dm = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hm = k.forwardRef( ({color: e="currentColor", size: t=24, strokeWidth: n=2, absoluteStrokeWidth: r, className: l="", children: o, iconNode: i, ...s}, a) => k.createElement("svg", {
    ref: a,
    ...Dm,
    width: t,
    height: t,
    stroke: e,
    strokeWidth: r ? Number(n) * 24 / Number(t) : n,
    className: zd("lucide", l),
    ...s
}, [...i.map( ([c,m]) => k.createElement(c, m)), ...Array.isArray(o) ? o : [o]]));
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gr = (e, t) => {
    const n = k.forwardRef( ({className: r, ...l}, o) => k.createElement(Hm, {
        ref: o,
        iconNode: t,
        className: zd(`lucide-${Um(e)}`, r),
        ...l
    }));
    return n.displayName = `${e}`,
    n
}
;
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Td = gr("Mail", [["rect", {
    width: "20",
    height: "16",
    x: "2",
    y: "4",
    rx: "2",
    key: "18n3k1"
}], ["path", {
    d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
    key: "1ocrg3"
}]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $m = gr("Menu", [["line", {
    x1: "4",
    x2: "20",
    y1: "12",
    y2: "12",
    key: "1e0a9i"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "6",
    y2: "6",
    key: "1owob3"
}], ["line", {
    x1: "4",
    x2: "20",
    y1: "18",
    y2: "18",
    key: "yk5zj1"
}]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Od = gr("Phone", [["path", {
    d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
    key: "foiqr5"
}]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Am = gr("Star", [["polygon", {
    points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
    key: "8f66p6"
}]]);
/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bm = gr("X", [["path", {
    d: "M18 6 6 18",
    key: "1bl5f8"
}], ["path", {
    d: "m6 6 12 12",
    key: "d8bk6v"
}]]);
function Vm() {
    const [e,t] = k.useState(!1)
      , n = ({isActive: r}) => r ? "text-blue-600 border-b-2 border-blue-600 font-bold" : "text-black hover:text-blue-600 font-bold";
    return k.useEffect( () => {
        document.body.style.overflow = e ? "hidden" : "auto"
    }
    , [e]),
    u.jsxs(u.Fragment, {
        children: [u.jsxs("nav", {
            className: "fixed top-0 left-0 w-full z-50 bg-[#f0b000] px-6 py-4 flex justify-between items-center",
            children: [u.jsx("div", {
                className: "text-white font-bold text-lg cursor-pointer",
                children: u.jsx(ae, {
                    to: "/",
                    children: u.jsx("img", {
                        src: "/photos/Logo3.png",
                        alt: "MyHygiene Logo",
                        width: "130",
                        height: "50"
                    })
                })
            }), u.jsx("button", {
                onClick: () => t(!e),
                className: "text-black md:hidden cursor-pointer focus:outline-none",
                children: e ? u.jsx(Bm, {
                    size: 28
                }) : u.jsx($m, {
                    size: 28
                })
            }), u.jsxs("div", {
                className: "hidden md:flex space-x-6",
                children: [u.jsx(ae, {
                    to: "/",
                    className: n,
                    children: "Home"
                }), u.jsx(ae, {
                    to: "/about",
                    className: n,
                    children: "About Us"
                }), u.jsx(ae, {
                    to: "/services",
                    className: n,
                    children: "Services"
                }), u.jsx(ae, {
                    to: "/contact",
                    className: n,
                    children: "Contact Us"
                }), u.jsx(ae, {
                    to: "/gallery",
                    className: n,
                    children: "Gallery"
                })]
            }), u.jsx("div", {
                className: "hidden md:block",
                children: u.jsx("button", {
                    className: "px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer",
                    children: "Book Now"
                })
            })]
        }), u.jsx("div", {
            className: `fixed left-0 right-0 bottom-0 top-[61px] bg-black/40 backdrop-blur-[1.5px] z-40 transition-opacity duration-300 ${e ? "opacity-100 visible" : "opacity-0 invisible"}`,
            onClick: () => t(!1)
        }), u.jsx("div", {
            className: `fixed right-0 top-[88.8px] h-[calc(100vh-64px)] w-full bg-[#f0b000] z-50 transform transition-transform duration-500 ${e ? "translate-x-0" : "translate-x-full"}`,
            children: u.jsxs("div", {
                className: "flex flex-col justify-between h-full px-6 py-6 pb-20",
                children: [u.jsxs("div", {
                    className: "flex flex-col space-y-6 mt-6",
                    children: [u.jsx(ae, {
                        to: "/",
                        className: n,
                        onClick: () => t(!1),
                        children: "Home"
                    }), u.jsx(ae, {
                        to: "/about",
                        className: n,
                        onClick: () => t(!1),
                        children: "About"
                    }), u.jsx(ae, {
                        to: "/services",
                        className: n,
                        onClick: () => t(!1),
                        children: "Services"
                    }), u.jsx(ae, {
                        to: "/contact",
                        className: n,
                        onClick: () => t(!1),
                        children: "Contact"
                    }), u.jsx(ae, {
                        to: "/gallery",
                        className: n,
                        onClick: () => t(!1),
                        children: "Gallery"
                    })]
                }), u.jsx("button", {
                    className: "shesco-btn px-6 py-3 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-          transparent hover:text-blue-500 cursor-pointer",
                    onClick: () => t(!1),
                    children: "Book Now"
                })]
            })
        }), "    "]
    })
}
var Id = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0
}
  , eu = ct.createContext && ct.createContext(Id)
  , Wm = ["attr", "size", "title"];
function bm(e, t) {
    if (e == null)
        return {};
    var n, r, l = Qm(e, t);
    if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        for (r = 0; r < o.length; r++)
            n = o[r],
            t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (l[n] = e[n])
    }
    return l
}
function Qm(e, t) {
    if (e == null)
        return {};
    var n = {};
    for (var r in e)
        if ({}.hasOwnProperty.call(e, r)) {
            if (t.indexOf(r) !== -1)
                continue;
            n[r] = e[r]
        }
    return n
}
function _l() {
    return _l = Object.assign ? Object.assign.bind() : function(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
                ({}).hasOwnProperty.call(n, r) && (e[r] = n[r])
        }
        return e
    }
    ,
    _l.apply(null, arguments)
}
function tu(e, t) {
    var n = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t && (r = r.filter(function(l) {
            return Object.getOwnPropertyDescriptor(e, l).enumerable
        })),
        n.push.apply(n, r)
    }
    return n
}
function Pl(e) {
    for (var t = 1; t < arguments.length; t++) {
        var n = arguments[t] != null ? arguments[t] : {};
        t % 2 ? tu(Object(n), !0).forEach(function(r) {
            Km(e, r, n[r])
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : tu(Object(n)).forEach(function(r) {
            Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r))
        })
    }
    return e
}
function Km(e, t, n) {
    return (t = Gm(t))in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = n,
    e
}
function Gm(e) {
    var t = Ym(e, "string");
    return typeof t == "symbol" ? t : t + ""
}
function Ym(e, t) {
    if (typeof e != "object" || !e)
        return e;
    var n = e[Symbol.toPrimitive];
    if (n !== void 0) {
        var r = n.call(e, t);
        if (typeof r != "object")
            return r;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return (t === "string" ? String : Number)(e)
}
function Fd(e) {
    return e && e.map( (t, n) => ct.createElement(t.tag, Pl({
        key: n
    }, t.attr), Fd(t.child)))
}
function Ve(e) {
    return t => ct.createElement(Xm, _l({
        attr: Pl({}, e.attr)
    }, t), Fd(e.child))
}
function Xm(e) {
    var t = n => {
        var {attr: r, size: l, title: o} = e, i = bm(e, Wm), s = l || n.size || "1em", a;
        return n.className && (a = n.className),
        e.className && (a = (a ? a + " " : "") + e.className),
        ct.createElement("svg", _l({
            stroke: "currentColor",
            fill: "currentColor",
            strokeWidth: "0"
        }, n.attr, r, i, {
            className: a,
            style: Pl(Pl({
                color: e.color || n.color
            }, n.style), e.style),
            height: s,
            width: s,
            xmlns: "http://www.w3.org/2000/svg"
        }), o && ct.createElement("title", null, o), e.children)
    }
    ;
    return eu !== void 0 ? ct.createElement(eu.Consumer, null, n => t(n)) : t(Id)
}
function Zm(e) {
    return Ve({
        attr: {
            viewBox: "0 0 576 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
            },
            child: []
        }]
    })(e)
}
function Ss(e) {
    return Ve({
        attr: {
            viewBox: "0 0 448 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
            },
            child: []
        }]
    })(e)
}
function Jm(e) {
    return Ve({
        attr: {
            viewBox: "0 0 448 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
            },
            child: []
        }]
    })(e)
}
function qm(e) {
    return Ve({
        attr: {
            viewBox: "0 0 448 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
            },
            child: []
        }]
    })(e)
}
function e0(e) {
    return Ve({
        attr: {
            viewBox: "0 0 448 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
            },
            child: []
        }]
    })(e)
}
function t0(e) {
    return Ve({
        attr: {
            viewBox: "0 0 512 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
            },
            child: []
        }]
    })(e)
}
function n0(e) {
    return Ve({
        attr: {
            viewBox: "0 0 384 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M235.63,160H84.37a64,64,0,0,0-63.74,58.21L.27,442.21A64,64,0,0,0,64,512H256a64,64,0,0,0,63.74-69.79l-20.36-224A64,64,0,0,0,235.63,160ZM160,416c-33.12,0-60-26.33-60-58.75,0-25,35.7-75.47,52-97.27A10,10,0,0,1,168,260c16.33,21.8,52,72.27,52,97.27C220,389.67,193.12,416,160,416ZM379.31,94.06,336,50.74A64,64,0,0,0,290.75,32H224A32,32,0,0,0,192,0H128A32,32,0,0,0,96,32v96H224V96h66.75l43.31,43.31a16,16,0,0,0,22.63,0l22.62-22.62A16,16,0,0,0,379.31,94.06Z"
            },
            child: []
        }]
    })(e)
}
function r0(e) {
    return Ve({
        attr: {
            viewBox: "0 0 576 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
            },
            child: []
        }]
    })(e)
}
function l0(e) {
    return Ve({
        attr: {
            viewBox: "0 0 448 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z"
            },
            child: []
        }]
    })(e)
}
function o0(e) {
    return Ve({
        attr: {
            viewBox: "0 0 640 512"
        },
        child: [{
            tag: "path",
            attr: {
                d: "M256.47 216.77l86.73 109.18s-16.6 102.36-76.57 150.12C206.66 523.85 0 510.19 0 510.19s3.8-23.14 11-55.43l94.62-112.17c3.97-4.7-.87-11.62-6.65-9.5l-60.4 22.09c14.44-41.66 32.72-80.04 54.6-97.47 59.97-47.76 163.3-40.94 163.3-40.94zM636.53 31.03l-19.86-25c-5.49-6.9-15.52-8.05-22.41-2.56l-232.48 177.8-34.14-42.97c-5.09-6.41-15.14-5.21-18.59 2.21l-25.33 54.55 86.73 109.18 58.8-12.45c8-1.69 11.42-11.2 6.34-17.6l-34.09-42.92 232.48-177.8c6.89-5.48 8.04-15.53 2.55-22.44z"
            },
            child: []
        }]
    })(e)
}
function i0() {
    return u.jsxs("footer", {
        className: "bg-gray-900 text-white px-6 py-10",
        children: [u.jsxs("div", {
            className: "max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10",
            children: [u.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [u.jsx("img", {
                    src: "/photos/Logo1.jpeg",
                    alt: "MyHygiene Logo",
                    className: "w-32 rounded"
                }), u.jsx("p", {
                    className: "text-sm text-gray-400",
                    children: "Creating clean, fresh, and healthy living spaces."
                })]
            }), u.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [u.jsx("h2", {
                    className: "text-lg font-semibold",
                    children: "Contact"
                }), u.jsxs("a", {
                    href: "mailto:myhygieneservices@gmail.com",
                    className: "flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition",
                    children: [u.jsx(Td, {
                        size: 18
                    }), "myhygieneservices@gmail.com"]
                }), u.jsxs("a", {
                    href: "tel:08145364748",
                    className: "flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition",
                    children: [u.jsx(Od, {
                        size: 18
                    }), "08145364748"]
                })]
            }), u.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [u.jsx("h2", {
                    className: "text-lg font-semibold",
                    children: "Quick Links"
                }), u.jsx(ae, {
                    to: "/",
                    className: "text-gray-400 hover:text-yellow-400 transition",
                    children: "Home"
                }), u.jsx(ae, {
                    to: "/about",
                    className: "text-gray-400 hover:text-yellow-400 transition",
                    children: "About Us"
                }), u.jsx(ae, {
                    to: "/services",
                    className: "text-gray-400 hover:text-yellow-400 transition",
                    children: "Services"
                }), u.jsx(ae, {
                    to: "/contact",
                    className: "text-gray-400 hover:text-yellow-400 transition",
                    children: "Contact Us"
                })]
            }), u.jsxs("div", {
                className: "flex flex-col gap-3",
                children: [u.jsx("h2", {
                    className: "text-lg font-semibold",
                    children: "Follow Us"
                }), u.jsxs("div", {
                    className: "flex gap-4 flex-wrap",
                    children: [u.jsx("a", {
                        href: "https://www.instagram.com/clean_withmyhygiene",
                        target: "_blank",
                        className: "hover:text-pink-400 transition",
                        children: u.jsx(e0, {})
                    }), u.jsx("a", {
                        href: "https://www.facebook.com/share/1MTfiwciTR/",
                        target: "_blank",
                        className: "hover:text-blue-500 transition",
                        children: u.jsx(t0, {})
                    }), u.jsx("a", {
                        href: "https://www.linkedin.com/in/gladys-oriowha-08ba92356",
                        target: "_blank",
                        className: "hover:text-blue-400 transition",
                        children: u.jsx(qm, {})
                    }), u.jsx("a", {
                        href: "https://www.youtube.com/@Clean_withmyhygiene",
                        target: "_blank",
                        className: "hover:text-red-500 transition",
                        children: u.jsx(Zm, {})
                    }), u.jsx("a", {
                        href: "https://wa.me/2348145364748",
                        target: "_blank",
                        className: "hover:text-green-500 hover:drop-shadow-[0_0_8px_#22c55e] transition duration-300",
                        children: u.jsx(Ss, {})
                    }), u.jsx("a", {
                        href: "https://www.tiktok.com/@clean_withmyhygiene",
                        target: "_blank",
                        className: "hover:text-white transition text-sm border px-2 py-1 rounded",
                        children: u.jsx(Jm, {})
                    })]
                })]
            })]
        }), u.jsxs("div", {
            className: "text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5",
            children: ["© ", new Date().getFullYear(), " MyHygiene. All rights reserved."]
        })]
    })
}
function s0() {
    return u.jsx("a", {
        href: "https://wa.me/2348145364748",
        target: "_blank",
        className: `fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg 
                 hover:scale-110 hover:bg-green-600 transition duration-300 z-50`,
        children: u.jsx(Ss, {
            size: 24
        })
    })
}
function a0({children: e}) {
    return u.jsxs(u.Fragment, {
        children: [u.jsx(Vm, {}), u.jsx("main", {
            className: "pt-[59px] md:pt-[7rem]",
            children: e
        }), u.jsx(i0, {}), u.jsx(s0, {})]
    })
}
function u0() {
    const e = [{
        id: 1,
        text: "MyHygiene transformed my home completely.",
        color: "bg-blue-200"
    }, {
        id: 2,
        text: "Top-notch service. I felt like royalty!",
        color: "bg-green-200"
    }, {
        id: 3,
        text: "Fast and reliable. Highly recommend!",
        color: "bg-yellow-200"
    }, {
        id: 4,
        text: "My office has never looked this clean.",
        color: "bg-purple-200"
    }, {
        id: 5,
        text: "Absolutely worth every penny.",
        color: "bg-pink-200"
    }, {
        id: 6,
        text: "They exceeded my expectations!",
        color: "bg-orange-200"
    }, {
        id: 7,
        text: "Very professional staff.",
        color: "bg-cyan-200"
    }, {
        id: 8,
        text: "My apartment smells amazing!",
        color: "bg-lime-200"
    }, {
        id: 9,
        text: "Quick and detailed cleaning.",
        color: "bg-rose-200"
    }, {
        id: 10,
        text: "Best cleaning service ever.",
        color: "bg-indigo-200"
    }]
      , [t,n] = k.useState(e)
      , [r,l] = k.useState(!1)
      , [o,i] = k.useState(0)
      , [s,a] = k.useState(!1)
      , c = k.useRef();
    k.useEffect( () => {
        if (s)
            return;
        const p = setInterval( () => {
            i(0),
            setTimeout( () => {
                l(!0)
            }
            , 800),
            setTimeout( () => {
                n(d => {
                    const f = d[0];
                    return [...d.slice(1), f]
                }
                ),
                l(!1),
                i(-1)
            }
            , 1500)
        }
        , 4e3);
        return () => clearInterval(p)
    }
    , [s]);
    let m = !1, h, v;
    const y = p => {
        m = !0,
        h = p.pageX - c.current.offsetLeft,
        v = c.current.scrollLeft,
        a(!0)
    }
      , x = () => {
        m = !1,
        a(!1)
    }
      , w = () => {
        m = !1,
        a(!1)
    }
      , E = p => {
        if (!m)
            return;
        p.preventDefault();
        const f = (p.pageX - c.current.offsetLeft - h) * 1.5;
        c.current.scrollLeft = v - f
    }
    ;
    return u.jsx("div", {
        ref: c,
        className: "overflow-x-auto scrollbar-hide",
        onMouseEnter: () => a(!0),
        onMouseLeave: x,
        onMouseDown: y,
        onMouseUp: w,
        onMouseMove: E,
        children: u.jsx("div", {
            className: `flex gap-4 w-max transition-transform duration-700 ${r ? "-translate-x-[240px]" : ""}`,
            children: t.map( (p, d) => u.jsx(c0, {
                data: p,
                isFlipped: d === o
            }, p.id))
        })
    })
}
function c0({data: e, isFlipped: t}) {
    const [n,r] = k.useState(!1);
    return u.jsx("div", {
        className: "w-full md:w-[220px] h-[220px] shrink-0 perspective cursor-pointer",
        onMouseEnter: () => r(!0),
        onMouseLeave: () => r(!1),
        children: u.jsxs("div", {
            className: `relative w-full h-full transition-transform duration-700 ${t || n ? "rotate-y-180" : ""}`,
            style: {
                transformStyle: "preserve-3d"
            },
            children: [u.jsx("div", {
                className: `absolute w-full h-full ${e.color} flex items-center justify-center rounded-xl`,
                style: {
                    backfaceVisibility: "hidden"
                },
                children: u.jsx("img", {
                    src: "/photos/Logo3.png",
                    className: "w-44"
                })
            }), u.jsxs("div", {
                className: "absolute w-full h-full bg-white flex flex-col items-center justify-center p-3 rounded-xl",
                style: {
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden"
                },
                children: [u.jsx("div", {
                    className: "flex mb-10",
                    children: [...Array(5)].map( (l, o) => u.jsx(Am, {
                        size: 16,
                        className: "text-yellow-500 fill-yellow-500"
                    }, o))
                }), u.jsx("p", {
                    className: "text-sm text-center",
                    children: e.text
                })]
            })]
        })
    })
}
function d0() {
    const e = ["/photos/Home2.jpg", "/photos/Home3.jpg", "/photos/Home7.jpg", "/photos/Home13.jpg", "/photos/Home10.jpg", "/photos/Home5.jpg", "/photos/Home8.JPG", "/photos/Home9.jpg", "/photos/Home11.jpg", "/photos/Home14.jpg", "/photos/Home1.jpg", "/photos/Home6.JPG", "/photos/Home4.jpg", "/photos/Home12.jpg"]
      , [t,n] = k.useState(0)
      , r = () => {
        n(o => (o + 1) % e.length)
    }
      , l = () => {
        n(o => (o - 1 + e.length) % e.length)
    }
    ;
    return k.useEffect( () => {
        const o = setInterval( () => {
            r()
        }
        , 4e3);
        return () => clearInterval(o)
    }
    , []),
    u.jsxs("div", {
        className: "home",
        children: [u.jsxs("div", {
            className: "home1",
            children: [u.jsx("video", {
                autoPlay: !0,
                loop: !0,
                muted: !0,
                playsInline: !0,
                className: "video-bg",
                children: u.jsx("source", {
                    src: "/videos/Home-video.mp4",
                    type: "video/mp4"
                })
            }), u.jsx("div", {
                className: "video-overlay"
            }), u.jsxs("div", {
                className: "video-content",
                children: [u.jsx("h1", {
                    className: "text-3xl md:text-5xl font-bold pb-5",
                    children: "Beyond Cleaning"
                }), u.jsx("p", {
                    className: "text-lg md:text-2xl",
                    children: "We Create Healthy Living Spaces"
                }), u.jsx("img", {
                    src: "/photos/Logo4.png",
                    alt: "MyHygiene Logo",
                    width: "200",
                    height: "80"
                })]
            })]
        }), u.jsxs("div", {
            className: "home2 text-black p-10 pb-20 md:pb-0 flex flex-col gap-5 justify-between items-center md:flex-row md:h-[calc(100vh-64px)]",
            children: [u.jsxs("div", {
                children: [u.jsxs("h1", {
                    className: "text-xl md:text-4xl font-[410]",
                    children: [u.jsx("img", {
                        src: "photos/Logo3.png",
                        alt: "MyHygiene Logo",
                        width: "130",
                        height: "50"
                    }), "We provide -"]
                }), " ", u.jsx("br", {}), u.jsxs("p", {
                    className: "text-xl md:text-2xl leading-relaxed",
                    children: ["professional cleaning, ", u.jsx("br", {}), " laundry, & hygiene solutions ", u.jsx("br", {}), " to keep your home & workplace spotless, fresh, & healthy."]
                }), u.jsx("br", {}), u.jsx("br", {}), u.jsx("button", {
                    className: "px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer",
                    children: "Book Now"
                })]
            }), u.jsx("br", {}), u.jsx("div", {
                children: u.jsx("img", {
                    src: "/photos/Home1.jpg",
                    width: 900,
                    alt: "Professional Cleaning",
                    className: "rounded-2xl"
                })
            })]
        }), u.jsxs("div", {
            className: "home3 bg-green-100 p-10 pb-20 md:pb-28 flex flex-col gap-5 md:flex-row items-center md:justify-between md:h-[110vh]",
            children: [u.jsxs("div", {
                children: [u.jsxs("h1", {
                    className: "text-3xl md:text-4xl font-[410] pt-24",
                    children: [u.jsx("img", {
                        src: "photos/Logo3.png",
                        alt: "MyHygiene Logo",
                        width: "130",
                        height: "50"
                    }), "How it works"]
                }), u.jsxs("p", {
                    className: "text-lg md:text-2xl leading-relaxed",
                    children: ["Booking on MyHygiene is simple & straighforward! ", u.jsx("br", {}), "Get started in these four easy steps:"]
                }), " ", u.jsx("br", {}), u.jsx("br", {}), u.jsxs("ol", {
                    className: "list-decimal list-inside space-y-3 marker:text-blue-600 marker:font-bold marker:text-lg md:marker:text-xl",
                    children: [u.jsxs("li", {
                        className: "text-sm md:text-xl",
                        children: [u.jsx("b", {
                            className: "text-blue-600",
                            children: "Select Your Service:"
                        }), " Choose from our range of cleaning, ", u.jsx("br", {}), " laundry, or hygiene services that best suit your needs."]
                    }), u.jsxs("li", {
                        className: "text-sm md:text-xl",
                        children: [u.jsx("b", {
                            className: "text-blue-600",
                            children: "Schedule Your Appointment:"
                        }), " Pick a date and time that works for you, ", u.jsx("br", {}), " and we'll take care of the rest."]
                    }), u.jsxs("li", {
                        className: "text-sm md:text-xl",
                        children: [u.jsx("b", {
                            className: "text-blue-600",
                            children: "Professional Service:"
                        }), " Our trained professionals will arrive on time, ", u.jsx("br", {}), " equipped with the necessary tools to provide top-notch service."]
                    }), u.jsxs("li", {
                        className: "text-sm md:text-xl",
                        children: [u.jsx("b", {
                            className: "text-blue-600",
                            children: "Enjoy a Clean Space:"
                        }), " Sit back and relax while we transform ", u.jsx("br", {}), " your home or workplace into a spotless, fresh, and healthy environment."]
                    })]
                }), u.jsx("br", {}), u.jsx("button", {
                    className: "px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer",
                    children: "Book Now"
                })]
            }), u.jsxs("div", {
                className: "relative w-full md:w-[600px] h-full overflow-hidden rounded-2xl",
                children: [u.jsx("div", {
                    className: "flex h-full transition-transform duration-500",
                    style: {
                        transform: `translateX(-${t * 100}%)`
                    },
                    children: e.map( (o, i) => u.jsx("img", {
                        src: o,
                        alt: "Cleaning",
                        className: "w-full md:h-full object-cover flex-shrink-0"
                    }, i))
                }), u.jsx("button", {
                    onClick: l,
                    className: "absolute left-2 top-1/2 -translate-y-1/2 bg-[#f0b000]/50 text-black text-2xl font-bold px-3 py-1 rounded cursor-pointer",
                    children: "‹"
                }), u.jsx("button", {
                    onClick: r,
                    className: "absolute right-2 top-1/2 -translate-y-1/2 bg-[#f0b000]/50 text-black text-2xl font-bold px-3 py-1 rounded cursor-pointer",
                    children: "›"
                })]
            })]
        }), u.jsxs("div", {
            className: "home4 text-black p-10 flex flex-col items-center gap-22 md:flex-row md:h-[110vh]",
            children: [u.jsx("div", {
                className: "order-2 md:order-1",
                children: u.jsx("img", {
                    src: "/photos/Gladys.jpeg",
                    width: 600,
                    height: 400,
                    alt: "Professional Cleaning",
                    className: "rounded-2xl"
                })
            }), u.jsxs("div", {
                className: "order-1 md:order-2",
                children: [u.jsxs("h1", {
                    className: "text-xl md:text-4xl leading-relaxed font-[410]",
                    children: [u.jsx("img", {
                        src: "/photos/Logo3.png",
                        alt: "MyHygiene Logo",
                        width: "130",
                        height: "50"
                    }), "We are here for you!"]
                }), " ", u.jsx("br", {}), u.jsxs("p", {
                    className: "text-xl md:text-[1.25rem] leading-relaxed",
                    children: ["Monday morning? Saturday afternoon? ", u.jsx("br", {}), "Whatever time works for you, MyHygien is available ", u.jsx("br", {}), " from Mon - Sat! ", u.jsx("br", {}), " Our team can arrive at your home ", u.jsx("br", {}), " from 7am - 4pm daily. ", u.jsx("br", {}), "🎵Oh men, we're active!🎵"]
                }), u.jsx("br", {}), u.jsx("br", {}), u.jsx("button", {
                    className: "px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer",
                    children: "Book Now"
                })]
            })]
        }), u.jsxs("div", {
            className: "home5 text-black bg-[#faf6e8] p-10 flex flex-col items-center gap-16 md:flex-row md:h-[125vh]",
            children: [u.jsxs("div", {
                children: [u.jsxs("h1", {
                    className: "text-xl md:text-4xl leading-relaxed font-[410]",
                    children: [u.jsx("img", {
                        src: "/photos/Logo3.png",
                        alt: "MyHygiene Logo",
                        width: "130",
                        height: "50"
                    }), "Why Choose MyHygiene?"]
                }), u.jsx("p", {
                    className: "text-xl md:text-[1.25rem] leading-relaxed",
                    children: "We make sure the following is true:"
                }), u.jsx("br", {}), u.jsxs("ul", {
                    className: "list-disc list-inside space-y-3 marker:text-blue-600 marker:font-bold marker:text-lg md:marker:text-xl",
                    children: [u.jsxs("li", {
                        className: "text-sm md:text-xl",
                        children: [u.jsx("b", {
                            className: "text-blue-600",
                            children: "Professional and reliable team:"
                        }), u.jsx("br", {}), " Our team is background-checked, trained, ", u.jsx("br", {}), " and dedicated to providing reliable and high-quality service."]
                    }), u.jsxs("li", {
                        className: "text-sm md:text-xl",
                        children: [u.jsx("b", {
                            className: "text-blue-600",
                            children: "Attention to detail:"
                        }), u.jsx("br", {}), " We pay close attention to every aspect ", u.jsx("br", {}), " of the cleaning process to ensure you get the best results."]
                    }), u.jsxs("li", {
                        className: "text-sm md:text-xl",
                        children: [u.jsx("b", {
                            className: "text-blue-600",
                            children: "Customer Satisfaction:"
                        }), u.jsx("br", {}), " We prioritize your satisfaction and strive to exceed ", u.jsx("br", {}), " your expectations with every service."]
                    }), u.jsxs("li", {
                        className: "text-sm md:text-xl",
                        children: [u.jsx("b", {
                            className: "text-blue-600",
                            children: "Customer Convenience:"
                        }), u.jsx("br", {}), " Our easy online booking system and flexible ", u.jsx("br", {}), " scheduling make it simple to get the cleaning services you need, when you need them."]
                    }), u.jsxs("li", {
                        className: "text-sm md:text-xl",
                        children: [u.jsx("b", {
                            className: "text-blue-600",
                            children: "Services:"
                        }), u.jsx("br", {}), " We offer a wide range of cleaning services to meet your needs. ", u.jsx("br", {}), "All-in-one hygiene solution (cleaning, laundry, and products)"]
                    })]
                }), u.jsx("br", {}), u.jsx("button", {
                    className: "px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer",
                    children: "Book Now"
                })]
            }), u.jsx("div", {
                children: u.jsx("img", {
                    src: "/photos/Gladys.jpeg",
                    width: 600,
                    height: 400,
                    alt: "Professional Cleaning",
                    className: "rounded-2xl"
                })
            })]
        }), u.jsxs("div", {
            className: "bg-green-100 p-10 pb-20 md:h-[100vh]",
            children: [u.jsx("div", {
                children: u.jsxs("h1", {
                    className: "text-2xl md:text-4xl font-[410] flex flex-col pt-10 mb-10",
                    children: [u.jsx("img", {
                        src: "photos/Logo3.png",
                        alt: "MyHygiene Logo",
                        width: "130",
                        height: "50"
                    }), "What our customers say about MyHygiene"]
                })
            }), u.jsx("div", {
                className: "mb-20",
                children: u.jsx("button", {
                    className: "shesco-btn px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer",
                    children: "Book Now"
                })
            }), u.jsx(u0, {})]
        })]
    })
}
function f0() {
    return u.jsxs("div", {
        className: "about1 text-black bg-[#fff5ed] pb-20 md:pb-0 flex flex-col gap-5 justify-between items-center mt-7 md:mt-[-26px] pt-10",
        children: [u.jsxs("div", {
            className: "flex items-center flex-col justify-center w-full md:h-[calc(50vh-64px)] text-center",
            children: [u.jsx("h1", {
                className: "text-3xl md:text-5xl font-[410] pb-4 text-center",
                children: " About MyHygiene"
            }), u.jsx("p", {
                className: "text-sm md:text-xl",
                children: "MyHygiene is a platform that connects you with skilled and thoroughly vetted professionals for your cleaning needs."
            }), u.jsx("button", {
                className: "px-6 mt-7 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer",
                children: "Book Now"
            })]
        }), u.jsx("div", {
            className: "p-10 bg-white rounded-2xl",
            children: u.jsx("img", {
                src: "/photos/Team.jpeg",
                width: 1100,
                height: 600,
                alt: "Our Team",
                className: "rounded-2xl"
            })
        }), u.jsxs("div", {
            className: "about2 text-black p-10 flex flex-col gap-14 justify-between items-center md:flex-row",
            children: [u.jsx("div", {
                className: "order-2 md:order-1",
                children: u.jsx("img", {
                    src: "/photos/B&W.jpg",
                    alt: "MyHygiene",
                    width: "550",
                    height: "50",
                    className: "rounded-2xl md:w-[900px] md:h-[500px]"
                })
            }), u.jsxs("div", {
                className: "order-1 md:order-2",
                children: [u.jsxs("h1", {
                    className: "text-xl md:text-4xl pb-2 font-[410]",
                    children: [u.jsx("img", {
                        src: "photos/Logo3.png",
                        alt: "MyHygiene Logo",
                        width: "130",
                        height: "50"
                    }), "Who we are -"]
                }), u.jsxs("p", {
                    className: "text-xs md:text-xl leading-relaxed",
                    children: ["MyHygiene Cleaning & Maintenance Services ", u.jsx("br", {}), " is a trusted cleaning company ", u.jsx("br", {}), " committed to delivering high-quality cleaning,", u.jsx("br", {}), " laundry, and hygiene solutions.", u.jsx("br", {}), u.jsx("br", {}), "Founded in January, 2025, we have quickly established ourselves as a reliable and customer-focused service provider. "]
                })]
            })]
        }), u.jsxs("div", {
            className: "about3 text-black w-[20rem] md:w-[75rem] m-5 md:m-16 p-10 pb-16 bg-[#f4d171] flex flex-col items-center rounded-4xl gap-5",
            children: [u.jsx("h1", {
                className: "text-blue-800 text-xl md:text-3xl font-bold text-center",
                children: "“MyHygiene is refining the experience of service delivery.”"
            }), u.jsx("button", {
                className: "px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer",
                children: "Book Now"
            })]
        }), u.jsxs("div", {
            className: "about4 text-black p-10 flex flex-col gap-5 justify-between items-center md:flex-row",
            children: [u.jsxs("div", {
                children: [u.jsxs("h1", {
                    className: "text-xl md:text-4xl pb-2 font-[410]",
                    children: [u.jsx("img", {
                        src: "photos/Logo3.png",
                        alt: "MyHygiene Logo",
                        width: "130",
                        height: "50"
                    }), "Our Commitment"]
                }), u.jsxs("p", {
                    className: "text-xs md:text-xl leading-relaxed",
                    children: ["We understand that cleanliness ", u.jsx("br", {}), " goes beyond appearance—it affects health, comfort, and productivity. ", u.jsx("br", {}), u.jsx("br", {}), " That’s why we provide reliable and detailed services designed to keep your environment and fabrics fresh, br safe, and spotless. ", u.jsx("br", {}), u.jsx("br", {}), "Our team is professional, dedicated, ", u.jsx("br", {}), " and focused on delivering excellence in every service. ", u.jsx("br", {}), "We don’t just clean—we create healthier living spaces."]
                })]
            }), u.jsx("div", {
                children: u.jsx("img", {
                    src: "/photos/Team1.jpg",
                    alt: "MyHygiene",
                    className: "rounded-2xl w-[300px] h-[250px] md:w-[1300px] md:h-[500px]"
                })
            })]
        }), u.jsxs("div", {
            className: "about3 text-black w-[20rem] md:w-[75rem] m-5 md:m-16 p-10 pb-16 bg-[#f4d171] flex flex-col items-center rounded-4xl gap-5",
            children: [u.jsx("h1", {
                className: "text-blue-800 text-xl md:text-3xl font-bold text-center",
                children: "Location"
            }), u.jsx("p", {
                className: "text-center text-sm md:text-xl leading-relaxed text-blue-800",
                children: "You can find us anywhere within Benin City, Edo State, Nigeria. We hope to meet you soon! "
            }), u.jsx("button", {
                className: "px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer",
                children: "Book Now"
            })]
        })]
    })
}
function p0() {
    return u.jsxs("div", {
        className: "bg-[#faf6e8] min-h-screen px-6 md:px-20 py-16 md:mt-[-1.7rem]",
        children: [u.jsxs("div", {
            className: "text-center max-w-3xl mx-auto",
            children: [u.jsx("h1", {
                className: "text-3xl md:text-5xl font-semibold mb-4",
                children: "Get In Touch With Us ✨"
            }), u.jsx("p", {
                className: "text-gray-600 md:text-lg",
                children: "Choose how you want to reach us — fast, simple, and stress-free."
            })]
        }), u.jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-12",
            children: [u.jsxs("a", {
                href: "tel:08145364748",
                className: "bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105 flex flex-col items-center text-center",
                children: [u.jsx(Od, {
                    size: 30,
                    className: "text-blue-500 mb-3"
                }), u.jsx("h2", {
                    className: "font-bold text-lg",
                    children: "Call Us"
                }), u.jsx("p", {
                    className: "text-gray-500 text-sm",
                    children: "Instant response"
                })]
            }), u.jsxs("a", {
                href: "https://wa.me/2348145364748",
                target: "_blank",
                className: "bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105 flex flex-col items-center text-center",
                children: [u.jsx(Ss, {
                    size: 30,
                    className: "text-green-500 mb-3"
                }), u.jsx("h2", {
                    className: "font-bold text-lg",
                    children: "WhatsApp"
                }), u.jsx("p", {
                    className: "text-gray-500 text-sm",
                    children: "Chat with us directly"
                })]
            }), u.jsxs("a", {
                href: "mailto:myhygieneservices@gmail.com",
                className: "bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105 flex flex-col items-center text-center",
                children: [u.jsx(Td, {
                    size: 30,
                    className: "text-red-500 mb-3"
                }), u.jsx("h2", {
                    className: "font-bold text-lg",
                    children: "Email"
                }), u.jsx("p", {
                    className: "text-gray-500 text-sm",
                    children: "Send detailed requests"
                })]
            })]
        }), u.jsxs("div", {
            className: "mt-16 max-w-5xl mx-auto",
            children: [u.jsx("h2", {
                className: "text-2xl md:text-3xl font-semibold mb-6 text-center",
                children: "What do you need help with?"
            }), u.jsxs("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                children: [u.jsx(Hr, {
                    icon: u.jsx(r0, {}),
                    title: "Home Cleaning?"
                }), u.jsx(Hr, {
                    icon: u.jsx(l0, {}),
                    title: "Office Cleaning?"
                }), u.jsx(Hr, {
                    icon: u.jsx(o0, {}),
                    title: "Deep Cleaning?"
                }), u.jsx(Hr, {
                    icon: u.jsx(n0, {}),
                    title: "Fumigation?"
                })]
            })]
        }), u.jsxs("div", {
            className: "mt-16 text-center bg-white p-8 md:p-12 rounded-2xl shadow-md max-w-3xl mx-auto",
            children: [u.jsx("p", {
                className: "text-lg md:text-xl text-gray-700 mb-6 leading-relaxed",
                children: "Ready to get started? Reach out and book your preferred service with ease using the button below."
            }), u.jsx("a", {
                href: "/booking",
                className: `block w-full md:w-auto px-10 py-4 bg-[#f0b000] text-black text-lg font-semibold 
               rounded-full border-2 border-[#f0b000] transition duration-300 
               hover:bg-transparent hover:text-[#f0b000] hover:scale-105`,
                children: "Book Your Preferences Here"
            })]
        })]
    })
}
function Hr({icon: e, title: t}) {
    return u.jsxs("div", {
        className: `bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center 
                    hover:shadow-xl hover:scale-105 transition cursor-pointer`,
        children: [u.jsx("div", {
            className: "text-2xl text-[#f0b000] mb-2",
            children: e
        }), u.jsx("p", {
            className: "text-sm font-medium",
            children: t
        })]
    })
}
function h0() {
    return u.jsxs("div", {
        className: "services1 mt-7 md:mt-[-1.7rem] px-5 md:px-20 py-10 bg-[#faf6e8]",
        children: [u.jsxs("div", {
            className: "text-center max-w-3xl mx-auto",
            children: [u.jsx("h1", {
                className: "text-3xl md:text-5xl font-semibold mb-4",
                children: "Our Services"
            }), u.jsx("p", {
                className: "text-sm md:text-lg text-gray-700 leading-relaxed",
                children: "We offer a wide range of cleaning and maintenance services to meet your needs. Whether you need regular cleaning, deep cleaning, laundry services, or specialized hygiene solutions, we’ve got you covered."
            })]
        }), u.jsxs("div", {
            className: "mt-12 grid grid-cols-1 md:grid-cols-2 gap-10",
            children: [u.jsxs("div", {
                className: "bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300",
                children: [u.jsx("h2", {
                    className: "text-lg md:text-xl font-bold mb-4 border-b-2 border-[#f0b000] pb-2",
                    children: "Our Services Include"
                }), u.jsxs("ul", {
                    className: "space-y-3 marker:text-[#f0b000] marker:font-bold list-disc list-inside",
                    children: [u.jsx("li", {
                        children: "Residential Cleaning"
                    }), u.jsx("li", {
                        children: "Office Cleaning"
                    }), u.jsx("li", {
                        children: "Deep Cleaning"
                    }), u.jsx("li", {
                        children: "Post-Construction Cleaning"
                    }), u.jsx("li", {
                        children: "Fumigation / Pest Control"
                    }), u.jsx("li", {
                        children: "Laundry Services (washing, drying, ironing)"
                    }), u.jsx("li", {
                        children: "Cleaning Products Sales"
                    }), u.jsx("li", {
                        children: "General Maintenance Cleaning"
                    })]
                })]
            }), u.jsxs("div", {
                className: "bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300",
                children: [u.jsx("h2", {
                    className: "text-lg md:text-xl font-bold mb-4 border-b-2 border-[#f0b000] pb-2",
                    children: "Service Area"
                }), u.jsxs("ul", {
                    className: "space-y-3 marker:text-[#f0b000] marker:font-bold list-disc list-inside",
                    children: [u.jsx("li", {
                        children: "Benin City"
                    }), u.jsx("li", {
                        children: "Edo State"
                    }), u.jsx("li", {
                        children: "Nearby areas (on request)"
                    })]
                })]
            })]
        }), u.jsxs("div", {
            className: "services3 mt-14 bg-white p-6 md:p-10 rounded-2xl shadow-md hover:shadow-xl transition duration-300 max-w-4xl mx-auto",
            children: [u.jsx("h2", {
                className: "text-lg md:text-xl font-bold mb-4 border-b-2 border-[#f0b000] pb-2",
                children: "Cleaning Products"
            }), u.jsx("p", {
                className: "text-sm md:text-lg text-gray-700 mb-4",
                children: "Explore our range of high-quality cleaning products designed for effective and safe cleaning."
            }), u.jsxs("ul", {
                className: "space-y-3 marker:text-[#f0b000] marker:font-bold list-disc list-inside",
                children: [u.jsx("li", {
                    children: "Detergents"
                }), u.jsx("li", {
                    children: "Disinfectants"
                }), u.jsx("li", {
                    children: "Air fresheners"
                }), u.jsx("li", {
                    children: "Cleaning tools"
                })]
            }), u.jsx("div", {
                className: "mt-6",
                children: u.jsx("a", {
                    href: "https://wa.me/2348145364748",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: `inline-block px-6 py-3 bg-[#f0b000] text-black rounded-full border-2 border-[#f0b000] 
                       transition duration-300 hover:bg-transparent hover:text-[#f0b000] hover:scale-105`,
                    children: "Order Now via WhatsApp"
                })
            })]
        })]
    })
}
function m0() {
    const e = ["/photos/Home1.jpg", "/photos/Home2.jpg", "/photos/Home3.jpg", "/photos/Home4.jpg", "/photos/Home5.jpg", "/photos/Home6.jpg"]
      , t = ["/videos/Home-video.mp4", "/videos/Home-video.mp4"]
      , [n,r] = k.useState(!1)
      , [l,o] = k.useState(!1)
      , [i,s] = k.useState(null)
      , [a,c] = k.useState(null)
      , m = k.useRef(0)
      , h = k.useRef(0)
      , v = k.useRef([])
      , y = () => {
        const f = a === "photo" ? e : t;
        s(g => (g + 1) % f.length)
    }
      , x = () => {
        const f = a === "photo" ? e : t;
        s(g => (g - 1 + f.length) % f.length)
    }
      , w = f => {
        m.current = f.changedTouches[0].screenX
    }
      , E = f => {
        h.current = f.changedTouches[0].screenX
    }
      , p = () => {
        m.current - h.current > 50 && y(),
        h.current - m.current > 50 && x()
    }
    ;
    k.useEffect( () => {
        const f = g => {
            i !== null && (g.key === "ArrowRight" && y(),
            g.key === "ArrowLeft" && x(),
            g.key === "Escape" && s(null))
        }
        ;
        return window.addEventListener("keydown", f),
        () => window.removeEventListener("keydown", f)
    }
    , [i, a]);
    const d = f => {
        v.current.forEach( (g, j) => {
            g && j !== f && (g.pause(),
            g.currentTime = 0)
        }
        )
    }
    ;
    return k.useEffect( () => (n || l || i !== null ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto",
    () => {
        document.body.style.overflow = "auto"
    }
    ), [n, l, i]),
    u.jsxs("div", {
        className: "bg-[#faf6e8] min-h-screen px-6 md:px-20 py-16 md:mt-[-1.7rem]",
        children: [u.jsxs("div", {
            className: "text-center mb-12",
            children: [u.jsx("h1", {
                className: "text-3xl md:text-5xl font-semibold mb-4 ",
                children: "Our Work Gallery"
            }), u.jsx("p", {
                className: "text-gray-600 md:text-lg max-w-2xl mx-auto leading-relaxed",
                children: "Step into our world of transformation — where every space tells a story of care, precision, and spotless excellence. From homes to offices, these moments capture the standard we proudly deliver."
            })]
        }), u.jsxs("section", {
            className: "text-center mb-16",
            children: [u.jsx("h2", {
                className: "text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-center w-[300px] m-auto h-8 p-3 bg-[#f0b000] rounded-full",
                children: "- Photos -"
            }), u.jsx("img", {
                src: e[0],
                loading: "lazy",
                onClick: () => {
                    c("photo"),
                    s(0)
                }
                ,
                className: "mx-auto w-full md:w-[500px] h-[300px] object-cover rounded-xl cursor-pointer hover:scale-105 transition"
            }), u.jsx("button", {
                onClick: () => r(!0),
                className: "mt-4 px-6 py-2 bg-[#f0b000] mb-52 rounded-full hover:scale-105 transition cursor-pointer",
                children: "See More Photos"
            })]
        }), u.jsxs("section", {
            className: "text-center",
            children: [u.jsx("h2", {
                className: "text-2xl md:text-3xl font-semibold flex items-center justify-center w-[300px] m-auto h-8 p-3 bg-[#f0b000] rounded-full mb-[-25px] md:mb-5",
                children: "- Videos -"
            }), u.jsx("video", {
                src: t[0],
                controls: !0,
                className: "mx-auto w-full md:w-[500px] h-[300px] rounded-xl"
            }), u.jsx("button", {
                onClick: () => o(!0),
                className: "mt-4 px-6 py-2 bg-[#f0b000] rounded-full hover:scale-105 transition cursor-pointer",
                children: "See More Videos"
            })]
        }), n && u.jsx(nu, {
            onClose: () => r(!1),
            children: u.jsx("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4",
                children: e.map( (f, g) => u.jsx("img", {
                    src: f,
                    loading: "lazy",
                    onClick: () => {
                        c("photo"),
                        s(g)
                    }
                    ,
                    className: "rounded-lg cursor-pointer hover:scale-105 transition"
                }, g))
            })
        }), l && u.jsx(nu, {
            onClose: () => o(!1),
            children: u.jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: t.map( (f, g) => u.jsx("video", {
                    ref: j => v.current[g] = j,
                    src: f,
                    controls: !0,
                    onPlay: () => d(g),
                    className: "rounded-lg"
                }, g))
            })
        }), i !== null && u.jsxs("div", {
            className: "fixed inset-0 bg-black/90 flex items-center justify-center z-50",
            children: [u.jsx("button", {
                onClick: () => s(null),
                className: "absolute top-5 right-6 text-white text-3xl font-bold cursor-pointer",
                children: "✕"
            }), u.jsx("button", {
                onClick: x,
                className: "absolute left-5 text-white text-4xl cursor-pointer",
                children: "‹"
            }), a === "photo" ? u.jsx("img", {
                src: e[i],
                onTouchStart: w,
                onTouchMove: E,
                onTouchEnd: p,
                className: "max-w-[90%] max-h-[90%] rounded-xl"
            }) : u.jsx("video", {
                src: t[i],
                controls: !0,
                autoPlay: !0,
                onTouchStart: w,
                onTouchMove: E,
                onTouchEnd: p,
                className: "max-w-[90%] max-h-[90%] rounded-xl"
            }), u.jsx("button", {
                onClick: y,
                className: "absolute right-5 text-white text-4xl cursor-pointer",
                children: "›"
            })]
        })]
    })
}
function nu({children: e, onClose: t}) {
    return u.jsx("div", {
        className: "fixed inset-0 bg-black/70 flex items-center justify-center z-50",
        children: u.jsxs("div", {
            className: "bg-white rounded-xl max-w-5xl w-full relative p-10",
            children: [u.jsx("button", {
                onClick: t,
                className: "absolute top-2 right-3 text-xl font-bold cursor-pointer",
                children: "✕"
            }), e]
        })
    })
}
function v0() {
    const {pathname: e} = Sn();
    return k.useEffect( () => {
        window.scrollTo(0, 0)
    }
    , [e]),
    null
}
function g0() {
    return u.jsxs(Rm, {
        children: [u.jsx(v0, {}), u.jsx(a0, {
            children: u.jsxs(Sm, {
                children: [u.jsx(Wt, {
                    path: "/",
                    element: u.jsx(d0, {})
                }), u.jsx(Wt, {
                    path: "/about",
                    element: u.jsx(f0, {})
                }), u.jsx(Wt, {
                    path: "/services",
                    element: u.jsx(h0, {})
                }), u.jsx(Wt, {
                    path: "/contact",
                    element: u.jsx(p0, {})
                }), u.jsx(Wt, {
                    path: "/gallery",
                    element: u.jsx(m0, {})
                })]
            })
        })]
    })
}
function y0() {
    return u.jsx(u.Fragment, {
        children: u.jsx(g0, {})
    })
}
xd(document.getElementById("root")).render(u.jsx(k.StrictMode, {
    children: u.jsx(y0, {})
}));
