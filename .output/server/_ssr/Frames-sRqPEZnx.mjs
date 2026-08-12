import { r as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Frames-sRqPEZnx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* A lightweight, dependency-free rendering of a template's website.
* Rendered at a fixed design width and scaled by its container, so previews
* stay razor sharp and cost nothing in network requests.
*/
function SitePreview({ t, mobile = false }) {
	const p = t.palette;
	const font = t.serif ? "Instrument Serif, Georgia, serif" : "Work Sans, sans-serif";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: p.bg,
			color: p.ink,
			width: "100%"
		},
		className: "select-none",
		"aria-hidden": true,
		"data-tsd-source": "/src/components/site/SitePreview.tsx:13:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { borderBottom: `1px solid ${p.soft}` },
				className: mobile ? "flex items-center justify-between px-4 py-3" : "flex items-center justify-between px-10 py-5",
				"data-tsd-source": "/src/components/site/SitePreview.tsx:19:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { fontFamily: font },
					className: mobile ? "text-sm" : "text-lg",
					"data-tsd-source": "/src/components/site/SitePreview.tsx:23:9",
					children: t.name
				}), mobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex flex-col gap-[3px]",
					"data-tsd-source": "/src/components/site/SitePreview.tsx:27:11",
					children: [
						0,
						1,
						2
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { background: p.ink },
						className: "block h-[1.5px] w-4 opacity-70",
						"data-tsd-source": "/src/components/site/SitePreview.tsx:29:15"
					}, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex items-center gap-7 text-[11px] uppercase tracking-[0.18em] opacity-70",
					"data-tsd-source": "/src/components/site/SitePreview.tsx:33:11",
					children: t.nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"data-tsd-source": "/src/components/site/SitePreview.tsx:35:15",
						children: n
					}, n))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: mobile ? "px-4 py-8" : "px-10 py-16",
				"data-tsd-source": "/src/components/site/SitePreview.tsx:42:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { color: p.accent },
						className: mobile ? "text-[8px] uppercase tracking-[0.24em]" : "text-[10px] uppercase tracking-[0.28em]",
						"data-tsd-source": "/src/components/site/SitePreview.tsx:43:9",
						children: t.hero.eyebrow
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontFamily: font,
							lineHeight: 1.05
						},
						className: mobile ? "mt-2 text-2xl" : "mt-4 text-5xl",
						"data-tsd-source": "/src/components/site/SitePreview.tsx:49:9",
						children: t.hero.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: mobile ? "mt-2 max-w-[90%] text-[10px] opacity-70" : "mt-4 max-w-md text-sm opacity-70",
						"data-tsd-source": "/src/components/site/SitePreview.tsx:55:9",
						children: t.hero.sub
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: {
							background: p.accent,
							color: p.bg
						},
						className: mobile ? "mt-4 inline-block rounded-sm px-3 py-2 text-[9px] tracking-wide" : "mt-7 inline-block rounded-sm px-6 py-3 text-xs tracking-wide",
						"data-tsd-source": "/src/components/site/SitePreview.tsx:58:9",
						children: t.hero.cta
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { background: p.soft },
						className: mobile ? "mt-6 h-28 w-full rounded-sm" : "mt-12 h-64 w-full rounded-sm",
						"data-tsd-source": "/src/components/site/SitePreview.tsx:69:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								background: `linear-gradient(120deg, ${p.accent}22, transparent 60%)`,
								height: "100%"
							},
							"data-tsd-source": "/src/components/site/SitePreview.tsx:73:11"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					borderTop: `1px solid ${p.soft}`,
					borderBottom: `1px solid ${p.soft}`
				},
				className: mobile ? "grid grid-cols-2 gap-3 px-4 py-6" : "grid grid-cols-4 gap-6 px-10 py-10",
				"data-tsd-source": "/src/components/site/SitePreview.tsx:83:7",
				children: t.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"data-tsd-source": "/src/components/site/SitePreview.tsx:88:11",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { background: p.accent },
						className: "h-[2px] w-6",
						"data-tsd-source": "/src/components/site/SitePreview.tsx:89:13"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: mobile ? "mt-2 text-[9px]" : "mt-3 text-xs",
						"data-tsd-source": "/src/components/site/SitePreview.tsx:90:13",
						children: f
					})]
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: mobile ? "grid grid-cols-2 gap-2 px-4 py-6" : "grid grid-cols-3 gap-4 px-10 py-14",
				"data-tsd-source": "/src/components/site/SitePreview.tsx:96:7",
				children: [
					0,
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						background: i % 3 === 1 ? `${p.accent}1f` : p.soft,
						aspectRatio: i % 2 ? "4/5" : "1/1"
					},
					className: "rounded-sm",
					"data-tsd-source": "/src/components/site/SitePreview.tsx:98:11"
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: mobile ? "px-4 py-8 text-center" : "px-10 py-16 text-center",
				"data-tsd-source": "/src/components/site/SitePreview.tsx:110:7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					style: { fontFamily: font },
					className: mobile ? "text-sm" : "text-2xl",
					"data-tsd-source": "/src/components/site/SitePreview.tsx:111:9",
					children: [
						"“",
						t.tagline,
						"”"
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					background: p.ink,
					color: p.bg
				},
				className: mobile ? "px-4 py-6" : "px-10 py-12",
				"data-tsd-source": "/src/components/site/SitePreview.tsx:117:7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: { fontFamily: font },
					className: mobile ? "text-lg" : "text-3xl",
					"data-tsd-source": "/src/components/site/SitePreview.tsx:121:9",
					children: t.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: mobile ? "mt-2 text-[8px] opacity-60" : "mt-3 text-[11px] opacity-60",
					"data-tsd-source": "/src/components/site/SitePreview.tsx:124:9",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" — Built by Kala's.codes"
					]
				})]
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** Renders children at a fixed design width and scales them to fit the container. */
function Scaled({ designWidth, children, className }) {
	const ref = (0, import_react.useRef)(null);
	const [scale, setScale] = (0, import_react.useState)(.3);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const ro = new ResizeObserver((entries) => {
			const w = entries[0]?.contentRect.width ?? el.clientWidth;
			setScale(w / designWidth);
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, [designWidth]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: cn("relative w-full min-w-0 overflow-hidden", className),
		style: { contain: "inline-size" },
		"data-tsd-source": "/src/components/site/Frames.tsx:29:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: designWidth,
				transform: `scale(${scale})`,
				transformOrigin: "top left"
			},
			"data-tsd-source": "/src/components/site/Frames.tsx:34:7",
			children
		})
	});
}
/** Auto-scrolling viewport used for live template previews. */
function AutoScroll({ children, duration = 26, className, paused = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("relative overflow-hidden", className),
		"data-tsd-source": "/src/components/site/Frames.tsx:60:5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "kc-autoscroll",
			style: {
				animationDuration: `${duration}s`,
				animationPlayState: paused ? "paused" : "running"
			},
			"data-tsd-source": "/src/components/site/Frames.tsx:61:7",
			children
		})
	});
}
function BrowserFrame({ url, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]", className),
		"data-tsd-source": "/src/components/site/Frames.tsx:84:5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-border bg-secondary/60 px-3 py-2",
			"data-tsd-source": "/src/components/site/Frames.tsx:90:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex gap-1.5",
				"data-tsd-source": "/src/components/site/Frames.tsx:91:9",
				children: [
					"#e0736a",
					"#e3bd63",
					"#7fbd77"
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-2 w-2 rounded-full",
					style: { background: c },
					"data-tsd-source": "/src/components/site/Frames.tsx:93:13"
				}, c))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ml-2 truncate rounded-full bg-background px-3 py-1 text-[10px] text-muted-foreground",
				"data-tsd-source": "/src/components/site/Frames.tsx:96:9",
				children: url
			})]
		}), children]
	});
}
function PhoneFrame({ children, className, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative rounded-[2.2rem] border border-border bg-ink p-2 shadow-[var(--shadow-lift)]", className),
		"data-tsd-source": "/src/components/site/Frames.tsx:115:5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[1.7rem] bg-background",
			"data-tsd-source": "/src/components/site/Frames.tsx:121:7",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink/90",
				"data-tsd-source": "/src/components/site/Frames.tsx:122:9"
			}), children]
		}), label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-center text-[10px] uppercase tracking-[0.22em] text-porcelain/70",
			"data-tsd-source": "/src/components/site/Frames.tsx:126:9",
			children: label
		}) : null]
	});
}
//#endregion
export { SitePreview as a, Scaled as i, BrowserFrame as n, cn as o, PhoneFrame as r, AutoScroll as t };
