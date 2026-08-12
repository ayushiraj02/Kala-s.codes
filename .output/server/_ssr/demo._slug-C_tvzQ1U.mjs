import { r as __toESM } from "../_runtime.mjs";
import { r as templates } from "./templates-Bdo8-Tm_.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-_k2F9VAr.mjs";
import { a as SitePreview, i as Scaled, o as cn } from "./Frames-sRqPEZnx.mjs";
import { f as Mail, i as Smartphone, l as Monitor, n as Tablet, p as Layers, r as Sparkles, t as Tag, y as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/demo._slug-C_tvzQ1U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var widths = {
	desktop: 1280,
	tablet: 834,
	mobile: 390
};
function Demo() {
	const { template } = Route.useLoaderData();
	const [device, setDevice] = (0, import_react.useState)("desktop");
	const [panel, setPanel] = (0, import_react.useState)(null);
	const related = templates.filter((t) => t.slug !== template.slug).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-secondary/40",
		"data-tsd-source": "/src/routes/demo.$slug.tsx:55:5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#preview",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4",
				"data-tsd-source": "/src/routes/demo.$slug.tsx:56:7",
				children: "Skip to preview"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Demo actions",
				className: "fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-2 rounded-full border border-border bg-card/90 px-3 py-2 shadow-[var(--shadow-lift)] backdrop-blur-xl lg:inset-y-0 lg:left-5 lg:right-auto lg:my-auto lg:h-fit lg:flex-col lg:rounded-2xl lg:px-2 lg:py-3",
				"data-tsd-source": "/src/routes/demo.$slug.tsx:61:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						"aria-label": "Back to Kala's.codes",
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
						"data-tsd-source": "/src/routes/demo.$slug.tsx:65:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {
							className: "h-4 w-4",
							"aria-hidden": true,
							"data-tsd-source": "/src/routes/demo.$slug.tsx:70:11"
						})
					}),
					[
						[
							"features",
							Layers,
							"Features"
						],
						[
							"pricing",
							Tag,
							"Pricing"
						],
						[
							"customize",
							Sparkles,
							"Customize"
						]
					].map(([key, Icon, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": label,
						"aria-pressed": panel === key,
						onClick: () => setPanel((p) => p === key ? null : key),
						className: cn("grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors", panel === key ? "bg-royal text-primary-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"),
						"data-tsd-source": "/src/routes/demo.$slug.tsx:79:11",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "h-4 w-4",
							"aria-hidden": true,
							"data-tsd-source": "/src/routes/demo.$slug.tsx:92:13"
						})
					}, key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						hash: "contact",
						"aria-label": "Contact the studio",
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground",
						style: { background: "var(--gradient-royal)" },
						"data-tsd-source": "/src/routes/demo.$slug.tsx:95:9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							className: "h-4 w-4",
							"aria-hidden": true,
							"data-tsd-source": "/src/routes/demo.$slug.tsx:102:11"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1500px] px-4 pb-28 pt-6 lg:pl-24 lg:pr-8 lg:pb-10",
				"data-tsd-source": "/src/routes/demo.$slug.tsx:106:7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pb-5 sm:flex sm:flex-wrap sm:justify-between",
						"data-tsd-source": "/src/routes/demo.$slug.tsx:107:9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							"data-tsd-source": "/src/routes/demo.$slug.tsx:108:11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
								"data-tsd-source": "/src/routes/demo.$slug.tsx:109:13",
								children: ["Live demo · ", template.industry]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "truncate font-display text-2xl sm:text-3xl",
								"data-tsd-source": "/src/routes/demo.$slug.tsx:112:13",
								children: template.name
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex shrink-0 gap-1 rounded-full border border-border bg-card p-1",
							"data-tsd-source": "/src/routes/demo.$slug.tsx:114:11",
							children: [
								["desktop", Monitor],
								["tablet", Tablet],
								["mobile", Smartphone]
							].map(([d, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setDevice(d),
								"aria-label": `${d} preview`,
								"aria-pressed": device === d,
								className: cn("grid h-9 w-9 place-items-center rounded-full transition-colors", device === d ? "bg-royal text-primary-foreground" : "text-muted-foreground hover:bg-secondary"),
								"data-tsd-source": "/src/routes/demo.$slug.tsx:122:15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "h-4 w-4",
									"aria-hidden": true,
									"data-tsd-source": "/src/routes/demo.$slug.tsx:133:17"
								})
							}, d))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start",
						"data-tsd-source": "/src/routes/demo.$slug.tsx:139:9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							id: "preview",
							"aria-label": `${template.name} preview`,
							className: "mx-auto w-full transition-all duration-700",
							style: {
								maxWidth: device === "desktop" ? "100%" : device === "tablet" ? 860 : 420,
								transitionTimingFunction: "var(--ease-silk)"
							},
							"data-tsd-source": "/src/routes/demo.$slug.tsx:140:11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cn("overflow-hidden border border-border bg-card shadow-[var(--shadow-lift)]", device === "mobile" ? "rounded-[2rem] p-2" : "rounded-xl"),
								"data-tsd-source": "/src/routes/demo.$slug.tsx:149:13",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("max-h-[78vh] overflow-y-auto", device === "mobile" && "rounded-[1.5rem]"),
									"data-tsd-source": "/src/routes/demo.$slug.tsx:155:15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scaled, {
										designWidth: widths[device],
										"data-tsd-source": "/src/routes/demo.$slug.tsx:156:17",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SitePreview, {
											t: template,
											mobile: device === "mobile",
											"data-tsd-source": "/src/routes/demo.$slug.tsx:157:19"
										})
									})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-center text-xs text-muted-foreground",
								"data-tsd-source": "/src/routes/demo.$slug.tsx:161:13",
								children: "Scroll inside the frame — this is the real, responsive layout."
							})]
						}), panel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
							className: "rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] lg:w-80",
							"data-tsd-source": "/src/routes/demo.$slug.tsx:167:13",
							children: [
								panel === "features" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg",
									"data-tsd-source": "/src/routes/demo.$slug.tsx:170:19",
									children: "What's included"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-4 space-y-2.5 text-sm text-muted-foreground",
									"data-tsd-source": "/src/routes/demo.$slug.tsx:171:19",
									children: template.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										"data-tsd-source": "/src/routes/demo.$slug.tsx:173:23",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-2 h-1 w-1 shrink-0 rounded-full bg-royal",
											"aria-hidden": true,
											"data-tsd-source": "/src/routes/demo.$slug.tsx:174:25"
										}), f]
									}, f))
								})] }) : null,
								panel === "pricing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg",
										"data-tsd-source": "/src/routes/demo.$slug.tsx:183:19",
										children: "Pricing"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 font-display text-3xl",
										"data-tsd-source": "/src/routes/demo.$slug.tsx:184:19",
										children: template.price
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										"data-tsd-source": "/src/routes/demo.$slug.tsx:185:19",
										children: "Includes design adaptation, content setup, responsive QA, technical SEO and 90 days of support."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										hash: "quote",
										className: "mt-5 inline-flex rounded-sm px-5 py-3 text-sm text-primary-foreground",
										style: { background: "var(--gradient-royal)" },
										"data-tsd-source": "/src/routes/demo.$slug.tsx:189:19",
										children: "Build a full quote"
									})
								] }) : null,
								panel === "customize" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-lg",
										"data-tsd-source": "/src/routes/demo.$slug.tsx:201:19",
										children: "Make it yours"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-muted-foreground",
										"data-tsd-source": "/src/routes/demo.$slug.tsx:202:19",
										children: "Every template is a starting point. We restyle typography, palette, imagery and section order around your brand — or design from a blank page."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-5 flex gap-2",
										"data-tsd-source": "/src/routes/demo.$slug.tsx:206:19",
										children: Object.values(template.palette).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-8 w-8 rounded-full border border-border",
											style: { background: c },
											"data-tsd-source": "/src/routes/demo.$slug.tsx:208:23"
										}, c))
									})
								] }) : null
							]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						"aria-label": "More templates",
						className: "mt-14",
						"data-tsd-source": "/src/routes/demo.$slug.tsx:221:9",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm uppercase tracking-[0.18em] text-muted-foreground",
							"data-tsd-source": "/src/routes/demo.$slug.tsx:222:11",
							children: "More templates"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
							"data-tsd-source": "/src/routes/demo.$slug.tsx:223:11",
							children: related.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								"data-tsd-source": "/src/routes/demo.$slug.tsx:225:15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/demo/$slug",
									params: { slug: t.slug },
									className: "block rounded-lg border border-border bg-card p-4 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
									"data-tsd-source": "/src/routes/demo.$slug.tsx:226:17",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-base",
										"data-tsd-source": "/src/routes/demo.$slug.tsx:231:19",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
										"data-tsd-source": "/src/routes/demo.$slug.tsx:232:19",
										children: t.industry
									})]
								})
							}, t.slug))
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { Demo as component };
