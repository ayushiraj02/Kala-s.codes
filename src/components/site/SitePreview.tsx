import type { Template } from "@/data/templates";

/** Curated Unsplash photo IDs per industry — hero + 4 gallery shots. */
const PHOTOS: Record<string, { hero: string; gallery: string[] }> = {
  Salon: {
    hero: "1560066984-138dadb4c035",
    gallery: [
      "1522337360788-8b13dee7a37e",
      "1580618672591-eb180b1a973f",
      "1521590832167-7bcbfaa6381f",
      "1595476108010-b4d1f102b1b1",
    ],
  },
  Restaurant: {
    hero: "1414235077428-338989a2e8c0",
    gallery: [
      "1504674900247-0877df9cc836",
      "1533777324565-a040eb52facd",
      "1476224203421-9ac39bcb3327",
      "1559339352-11d035aa65de",
    ],
  },
  Spa: {
    hero: "1544161515-4ab6ce6db874",
    gallery: [
      "1600334089648-17e777008398",
      "1591343006882-b6a30b00b82c",
      "1570172619644-dfd03ed5d881",
      "1540555700478-4be290a9f139",
    ],
  },
  Gym: {
    hero: "1534438327276-14e5300c3a48",
    gallery: [
      "1571019613454-1cb2f99b2d8b",
      "1583454110551-21f2fa2afe61",
      "1549060279-7e168fcee0c2",
      "1576678927484-cc907957088c",
    ],
  },
  Clinic: {
    hero: "1576091160399-112ba8d25d1d",
    gallery: [
      "1559757148-5c350d0d3c56",
      "1579684385127-1ef15d508118",
      "1631217868264-e5b90bb7e133",
      "1551601651-2a5dbbdd4b29",
    ],
  },
  Dentist: {
    hero: "1606811841689-23dfddce3e25",
    gallery: [
      "1588776814546-daab30f310ce",
      "1612349317150-e413f6a5b16d",
      "1609840114035-3c981b782dfe",
      "1606811841689-23dfddce3e25",
    ],
  },
  Hotel: {
    hero: "1455587734955-081b22074882",
    gallery: [
      "1582719478250-c89cae4dc85b",
      "1571896349842-33c89424de2d",
      "1445019980597-93fa8acb246c",
      "1551882547-ff40c63fe2f5",
    ],
  },
  "Real Estate": {
    hero: "1560185127-6ed189bf02f4",
    gallery: [
      "1570129477492-45c003edd2be",
      "1580587771525-78b9dba3b914",
      "1600585154340-be6161a56a0c",
      "1600607687939-ce8a6c25118c",
    ],
  },
  Architecture: {
    hero: "1486325212027-8081e485255e",
    gallery: [
      "1431576901776-e539bd916ba2",
      "1487958449943-2429e8be8625",
      "1600607687939-ce8a6c25118c",
      "1504307651254-35680f356dfd",
    ],
  },
  Construction: {
    hero: "1504307651254-35680f356dfd",
    gallery: [
      "1541888946425-d81bb19240f5",
      "1504307651254-35680f356dfd",
      "1486325212027-8081e485255e",
      "1583608205776-bfd35f0d9f83",
    ],
  },
  Lawyer: {
    hero: "1589829545856-d10d557cf95f",
    gallery: [
      "1521587760785-1c40a27eec0b",
      "1568992687947-868a62a9f521",
      "1436450412741-6b308b7e9e86",
      "1556761175-5973dc0f32e7",
    ],
  },
  Coaching: {
    hero: "1552664730-d307ca884978",
    gallery: [
      "1531482615713-2afd69097998",
      "1522202176988-66273c0fd55e",
      "1507003211169-0a1dd7228f2d",
      "1542744173-8e7e53415bb0",
    ],
  },
  "E-commerce": {
    hero: "1472851294608-062f824d29cc",
    gallery: [
      "1607082348824-0a96f2a4b9da",
      "1556742049-0cfed4f6a45d",
      "1441986300917-64674bd600d8",
      "1523275335684-37898b6baf30",
    ],
  },
  Wedding: {
    hero: "1519741497674-611481863552",
    gallery: [
      "1511285560929-80b456fea0bc",
      "1465495976277-4387d4b0b4c6",
      "1507504031003-b417219a0fde",
      "1520854221256-17451cc331bf",
    ],
  },
};

function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

/** Absolute-fill image helper — photo covers its parent container. */
function CoverPhoto({ id, w = 800, h = 600, alt = "" }: { id: string; w?: number; h?: number; alt?: string }) {
  return (
    <img
      src={unsplash(id, w, h)}
      alt={alt}
      loading="eager"
      decoding="async"
      draggable={false}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center",
        display: "block",
      }}
    />
  );
}

/**
 * A premium, dependency-free rendering of a template's website.
 * Rendered at a fixed design width and scaled by its container, so previews
 * stay razor sharp and cost nothing in network requests.
 */
export function SitePreview({ t, mobile = false }: { t: Template; mobile?: boolean }) {
  const p = t.palette;
  const font = t.serif ? "Instrument Serif, Georgia, serif" : "Work Sans, sans-serif";
  const sans = "Work Sans, system-ui, sans-serif";

  const photos = PHOTOS[t.industry] ?? PHOTOS["Hotel"];

  const accentFaint = `${p.accent}18`;
  const accentMid   = `${p.accent}44`;
  const isDark      = p.bg.startsWith("#1") || p.bg.startsWith("#0");

  /* ═══════════════════════ MOBILE ═══════════════════════ */
  if (mobile) {
    return (
      <div style={{ background: p.bg, color: p.ink, width: "100%", fontFamily: sans }} className="select-none" aria-hidden>

        {/* Nav */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", borderBottom: `1px solid ${p.soft}`,
                      background: `${p.bg}f0`, backdropFilter: "blur(8px)",
                      position: "sticky", top: 0, zIndex: 10 }}>
          <span style={{ fontFamily: font, fontSize: 14 }}>{t.name}</span>
          <span style={{ background: p.accent, color: p.bg, borderRadius: 4,
                          padding: "5px 11px", fontSize: 8, letterSpacing: "0.1em",
                          textTransform: "uppercase" }}>
            {t.nav[t.nav.length - 1]}
          </span>
        </div>

        {/* Hero photo */}
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <CoverPhoto id={photos.hero} w={390} h={400} alt={t.name} />
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0,
                         background: `linear-gradient(to top, ${p.ink}cc 0%, ${p.ink}44 55%, transparent 100%)` }} />
          {/* Copy over photo */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px" }}>
            <p style={{ color: p.accent, fontSize: 7, letterSpacing: "0.26em",
                         textTransform: "uppercase", marginBottom: 5, fontFamily: sans }}>
              {t.hero.eyebrow}
            </p>
            <h2 style={{ fontFamily: font, fontSize: 22, lineHeight: 1.1, color: p.bg, margin: 0 }}>
              {t.hero.title}
            </h2>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <span style={{ background: p.accent, color: p.bg, borderRadius: 4,
                              padding: "7px 13px", fontSize: 8, letterSpacing: "0.08em" }}>
                {t.hero.cta}
              </span>
              <span style={{ border: `1px solid ${p.bg}60`, borderRadius: 4,
                              padding: "7px 10px", fontSize: 8, color: p.bg, opacity: 0.8 }}>
                Learn more
              </span>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                      borderBottom: `1px solid ${p.soft}`, background: isDark ? `${p.soft}18` : `${p.soft}88` }}>
          {[["500+", "Clients"], ["4.9★", "Rating"], ["12yr", "Expertise"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center", padding: "11px 6px" }}>
              <div style={{ fontFamily: font, fontSize: 15, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 7, opacity: 0.5, marginTop: 3, letterSpacing: "0.12em",
                             textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Services list */}
        <div style={{ padding: "14px 16px" }}>
          <p style={{ fontSize: 7, letterSpacing: "0.22em", textTransform: "uppercase",
                       opacity: 0.45, marginBottom: 10 }}>Our Services</p>
          {t.features.map((f, i) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0",
                                   borderBottom: i < t.features.length - 1 ? `1px solid ${p.soft}` : "none" }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, overflow: "hidden",
                             flexShrink: 0, position: "relative" }}>
                <CoverPhoto id={photos.gallery[i % photos.gallery.length]} w={52} h={52} alt={f} />
              </div>
              <span style={{ fontSize: 9, flex: 1 }}>{f}</span>
              <div style={{ width: 14, height: 14, borderRadius: "50%",
                             border: `1px solid ${p.accent}50`, display: "flex",
                             alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: p.accent }} />
              </div>
            </div>
          ))}
        </div>

        {/* Gallery 2×2 */}
        <div style={{ padding: "4px 16px 16px",
                      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {photos.gallery.map((id, i) => (
            <div key={id}
                 style={{ position: "relative", borderRadius: 8, overflow: "hidden",
                           aspectRatio: i % 3 === 0 ? "1/1" : "4/5" }}>
              <CoverPhoto id={id} w={200} h={250} alt="" />
              <div style={{ position: "absolute", inset: 0,
                             background: `linear-gradient(transparent 55%, ${p.ink}44)` }} />
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{ margin: "0 16px 16px", padding: "14px 16px",
                       background: isDark ? `${p.soft}22` : p.soft,
                       borderRadius: 10, borderLeft: `3px solid ${p.accent}` }}>
          <p style={{ fontFamily: font, fontSize: 10, lineHeight: 1.55, opacity: 0.85 }}>
            "{t.tagline}"
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", overflow: "hidden",
                           position: "relative", flexShrink: 0 }}>
              <CoverPhoto id={photos.gallery[1]} w={48} h={48} alt="Client" />
            </div>
            <div>
              <div style={{ fontSize: 8, fontWeight: 600 }}>Priya Mehta</div>
              <div style={{ fontSize: 7, opacity: 0.5 }}>{t.industry} · Verified</div>
            </div>
            <div style={{ marginLeft: "auto", color: p.accent, fontSize: 10 }}>★★★★★</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ background: p.ink, color: p.bg, padding: "18px 16px" }}>
          <span style={{ fontFamily: font, fontSize: 16 }}>{t.name}</span>
          <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
            {t.nav.map((n) => (
              <span key={n} style={{ fontSize: 7, opacity: 0.4, textTransform: "uppercase",
                                      letterSpacing: "0.12em" }}>{n}</span>
            ))}
          </div>
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${p.bg}18`,
                         fontSize: 7, opacity: 0.3 }}>
            © {new Date().getFullYear()} {t.name} — कla's.codes
          </div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════ DESKTOP ═══════════════════════ */
  return (
    <div style={{ background: p.bg, color: p.ink, width: "100%", fontFamily: sans }} className="select-none" aria-hidden>

      {/* ── Nav ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "20px 48px", borderBottom: `1px solid ${p.soft}`,
                    position: "sticky", top: 0, zIndex: 10,
                    background: `${p.bg}f0`, backdropFilter: "blur(10px)" }}>
        <span style={{ fontFamily: font, fontSize: 20, letterSpacing: "-0.01em" }}>{t.name}</span>
        <nav style={{ display: "flex", gap: 32 }}>
          {t.nav.map((n) => (
            <span key={n} style={{ fontSize: 11, textTransform: "uppercase",
                                    letterSpacing: "0.16em", opacity: 0.55 }}>{n}</span>
          ))}
        </nav>
        <span style={{ background: p.accent, color: p.bg, borderRadius: 4,
                        padding: "10px 22px", fontSize: 11, letterSpacing: "0.1em",
                        textTransform: "uppercase" }}>
          {t.hero.cta}
        </span>
      </div>

      {/* ── Hero — split layout with full photo right ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 500 }}>
        {/* Left copy */}
        <div style={{ padding: "64px 48px", display: "flex", flexDirection: "column",
                       justifyContent: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20,
                         background: accentFaint, border: `1px solid ${accentMid}`,
                         borderRadius: 999, padding: "5px 14px", width: "fit-content" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.accent }} />
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em",
                            color: p.accent }}>{t.hero.eyebrow}</span>
          </div>
          <h2 style={{ fontFamily: font, fontSize: 54, lineHeight: 1.04,
                        margin: 0, letterSpacing: "-0.015em" }}>
            {t.hero.title}
          </h2>
          <p style={{ fontSize: 13, opacity: 0.6, marginTop: 18, lineHeight: 1.7, maxWidth: 380 }}>
            {t.hero.sub}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30 }}>
            <span style={{ background: p.accent, color: p.bg, borderRadius: 4,
                            padding: "13px 28px", fontSize: 12 }}>
              {t.hero.cta}
            </span>
            <span style={{ border: `1px solid ${p.ink}25`, borderRadius: 4,
                            padding: "13px 22px", fontSize: 12, opacity: 0.7 }}>
              View work
            </span>
          </div>

          {/* Trust row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 36 }}>
            <div style={{ display: "flex" }}>
              {photos.gallery.map((id, i) => (
                <div key={id} style={{ width: 30, height: 30, borderRadius: "50%",
                                        marginLeft: i > 0 ? -10 : 0, overflow: "hidden",
                                        border: `2px solid ${p.bg}`, position: "relative", flexShrink: 0 }}>
                  <CoverPhoto id={id} w={60} h={60} alt="" />
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, opacity: 0.5 }}>
              <strong style={{ opacity: 0.85 }}>500+</strong> happy clients
            </div>
          </div>
        </div>

        {/* Right — real hero photo */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <CoverPhoto id={photos.hero} w={700} h={560} alt={t.name} />
          {/* Subtle left gradient bleed */}
          <div style={{ position: "absolute", inset: 0,
                         background: `linear-gradient(to right, ${p.bg}55 0%, transparent 35%)` }} />
          {/* Floating rating card */}
          <div style={{ position: "absolute", bottom: 36, left: -28, background: p.bg,
                         borderRadius: 14, padding: "14px 20px",
                         boxShadow: `0 20px 48px ${p.ink}28`, minWidth: 154 }}>
            <div style={{ fontSize: 10, opacity: 0.45, letterSpacing: "0.14em",
                           textTransform: "uppercase", marginBottom: 4 }}>Client rating</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: font, fontSize: 28 }}>4.9</span>
              <span style={{ color: p.accent, fontSize: 13, letterSpacing: 1 }}>★★★★★</span>
            </div>
            <div style={{ fontSize: 10, opacity: 0.35, marginTop: 2 }}>200+ verified reviews</div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)",
                    borderTop: `1px solid ${p.soft}`, borderBottom: `1px solid ${p.soft}`,
                    background: isDark ? `${p.soft}18` : `${p.soft}66` }}>
        {[["500+","Clients"],["4.9★","Rating"],["12yr","Experience"],["98%","Satisfaction"]].map(([v, l], i) => (
          <div key={l} style={{ padding: "22px 28px",
                                  borderLeft: i > 0 ? `1px solid ${p.soft}` : "none" }}>
            <div style={{ fontFamily: font, fontSize: 28, lineHeight: 1 }}>{v}</div>
            <div style={{ fontSize: 10, opacity: 0.45, marginTop: 6, letterSpacing: "0.14em",
                           textTransform: "uppercase" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── Services ── */}
      <div style={{ padding: "60px 48px" }}>
        <div style={{ display: "flex", justifyContent: "space-between",
                       alignItems: "flex-end", marginBottom: 36 }}>
          <div>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.24em",
                         opacity: 0.4, marginBottom: 10 }}>What we offer</p>
            <h3 style={{ fontFamily: font, fontSize: 36, margin: 0, lineHeight: 1.06 }}>
              Crafted with care
            </h3>
          </div>
          <span style={{ fontSize: 11, color: p.accent, letterSpacing: "0.06em",
                          borderBottom: `1px solid ${p.accent}`, paddingBottom: 2 }}>
            View all →
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
          {t.features.map((f, i) => (
            <div key={f} style={{ display: "flex", gap: 16, padding: "20px 22px",
                                   border: `1px solid ${p.soft}`, borderRadius: 12,
                                   background: i === 0 ? accentFaint : "transparent",
                                   alignItems: "flex-start" }}>
              {/* Thumbnail */}
              <div style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden",
                             flexShrink: 0, position: "relative" }}>
                <CoverPhoto id={photos.gallery[i % photos.gallery.length]} w={104} h={104} alt={f} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 5 }}>{f}</div>
                <div style={{ fontSize: 11, opacity: 0.5, lineHeight: 1.5 }}>
                  Premium {f.toLowerCase()} tailored to you.
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Editorial gallery ── */}
      <div style={{ padding: "0 48px 60px" }}>
        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.24em",
                     opacity: 0.4, marginBottom: 22 }}>Portfolio</p>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.9fr 0.9fr",
                      gridTemplateRows: "220px 220px", gap: 12 }}>

          {/* Large left — spans 2 rows */}
          <div style={{ gridRow: "span 2", borderRadius: 16, overflow: "hidden",
                         position: "relative" }}>
            <CoverPhoto id={photos.gallery[0]} w={560} h={460} alt="" />
            <div style={{ position: "absolute", inset: 0,
                           background: `linear-gradient(180deg, transparent 40%, ${p.ink}66)` }} />
            <div style={{ position: "absolute", bottom: 22, left: 22, color: p.bg }}>
              <div style={{ fontSize: 10, opacity: 0.65, textTransform: "uppercase",
                             letterSpacing: "0.12em" }}>{t.industry}</div>
              <div style={{ fontFamily: font, fontSize: 20, marginTop: 4 }}>Signature Work</div>
            </div>
          </div>

          {/* Top middle */}
          <div style={{ borderRadius: 16, overflow: "hidden", position: "relative" }}>
            <CoverPhoto id={photos.gallery[1]} w={360} h={220} alt="" />
            <div style={{ position: "absolute", inset: 0,
                           background: `linear-gradient(180deg, transparent 55%, ${p.ink}50)` }} />
          </div>

          {/* Top right */}
          <div style={{ borderRadius: 16, overflow: "hidden", position: "relative" }}>
            <CoverPhoto id={photos.gallery[2]} w={360} h={220} alt="" />
            <div style={{ position: "absolute", bottom: 14, left: 14 }}>
              <div style={{ background: p.bg, borderRadius: 8, padding: "6px 12px",
                             display: "inline-block" }}>
                <span style={{ fontSize: 10, color: p.accent }}>★ Featured</span>
              </div>
            </div>
          </div>

          {/* Bottom middle */}
          <div style={{ borderRadius: 16, overflow: "hidden", position: "relative" }}>
            <CoverPhoto id={photos.gallery[3]} w={360} h={220} alt="" />
            <div style={{ position: "absolute", inset: 0,
                           background: `linear-gradient(transparent, ${p.ink}44)` }} />
          </div>

          {/* Bottom right — CTA tile */}
          <div style={{ borderRadius: 16, overflow: "hidden", position: "relative",
                         background: `linear-gradient(135deg, ${p.ink} 0%, ${p.ink}ee)`,
                         display: "flex", flexDirection: "column",
                         alignItems: "center", justifyContent: "center", gap: 12, padding: 24 }}>
            <div style={{ fontFamily: font, fontSize: 22, color: p.bg, textAlign: "center",
                           lineHeight: 1.2 }}>
              {t.hero.cta}
            </div>
            <div style={{ background: p.accent, color: p.bg, borderRadius: 8,
                           padding: "10px 22px", fontSize: 11, letterSpacing: "0.06em" }}>
              Get started →
            </div>
          </div>
        </div>
      </div>

      {/* ── Testimonial ── */}
      <div style={{ margin: "0 48px 60px", padding: "44px 52px",
                     background: isDark ? `${p.soft}18` : p.soft,
                     borderRadius: 20, position: "relative", overflow: "hidden",
                     display: "flex", gap: 48, alignItems: "center" }}>
        {/* Photo left */}
        <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden",
                       flexShrink: 0, position: "relative",
                       boxShadow: `0 8px 32px ${p.ink}20` }}>
          <CoverPhoto id={photos.gallery[2]} w={240} h={240} alt="Client" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 48, fontFamily: font, lineHeight: 1, color: p.accent,
                         opacity: 0.3, marginBottom: -10 }}>"</div>
          <p style={{ fontFamily: font, fontSize: 20, lineHeight: 1.55, opacity: 0.85,
                       maxWidth: 620 }}>
            {t.tagline}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 22 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Priya Mehta</div>
              <div style={{ fontSize: 11, opacity: 0.4, marginTop: 2 }}>
                {t.industry} owner · Verified client
              </div>
            </div>
            <div style={{ color: p.accent, fontSize: 15, letterSpacing: 2, marginLeft: "auto" }}>
              ★★★★★
            </div>
          </div>
        </div>
      </div>

      {/* ── Full-bleed CTA banner with background photo ── */}
      <div style={{ margin: "0 48px 60px", borderRadius: 20, overflow: "hidden",
                     position: "relative", minHeight: 200,
                     display: "flex", alignItems: "center" }}>
        <CoverPhoto id={photos.hero} w={1200} h={400} alt="" />
        <div style={{ position: "absolute", inset: 0,
                       background: `linear-gradient(105deg, ${p.ink}dd 0%, ${p.ink}88 100%)` }} />
        <div style={{ position: "relative", padding: "48px 56px",
                       display: "flex", alignItems: "center",
                       justifyContent: "space-between", width: "100%" }}>
          <div style={{ color: p.bg }}>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em",
                         opacity: 0.5, marginBottom: 10 }}>Ready to begin?</p>
            <h3 style={{ fontFamily: font, fontSize: 34, margin: 0, lineHeight: 1.06 }}>
              {t.hero.cta}
            </h3>
            <p style={{ fontSize: 13, opacity: 0.55, marginTop: 10, maxWidth: 380 }}>
              {t.hero.sub}
            </p>
          </div>
          <span style={{ background: p.accent, color: p.bg, borderRadius: 8, flexShrink: 0,
                          padding: "16px 34px", fontSize: 12, letterSpacing: "0.06em" }}>
            Get started →
          </span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ background: p.ink, color: p.bg, padding: "48px 48px 36px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
                       gap: 40, paddingBottom: 36, borderBottom: `1px solid ${p.bg}15` }}>
          <div>
            <div style={{ fontFamily: font, fontSize: 26, marginBottom: 14 }}>{t.name}</div>
            <p style={{ fontSize: 11, opacity: 0.38, lineHeight: 1.75, maxWidth: 220 }}>
              {t.hero.sub}
            </p>
          </div>
          {[t.nav.slice(0, 2), t.nav.slice(2)].map((group, gi) => (
            <div key={gi}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em",
                             opacity: 0.3, marginBottom: 14 }}>Links</div>
              {group.map((n) => (
                <div key={n} style={{ fontSize: 12, opacity: 0.5, marginBottom: 10 }}>{n}</div>
              ))}
            </div>
          ))}
          <div>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.2em",
                           opacity: 0.3, marginBottom: 14 }}>Contact</div>
            <div style={{ fontSize: 11, opacity: 0.45, lineHeight: 1.85 }}>
              hello@{t.name.toLowerCase()}.in<br />
              +91 98765 43210<br />
              Mumbai, India
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between",
                       alignItems: "center", paddingTop: 24 }}>
          <div style={{ fontSize: 10, opacity: 0.28 }}>
            © {new Date().getFullYear()} {t.name} — Built by कla's.codes
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            {["Privacy", "Terms", "Sitemap"].map((l) => (
              <span key={l} style={{ fontSize: 10, opacity: 0.28 }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}