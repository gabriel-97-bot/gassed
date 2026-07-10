# Gassed — Sjekkliste før App Store-lansering

Status: forbereder v1.0. Kryss av etter hvert.

---

## 🔴 Kritisk (gjøres rett før hver innsending)

- [ ] **Bygg og synk web-innholdet:** `npm run build && npx cap sync ios`
      → Uten dette pakkes GAMMEL kode (`www/index.html`) inn i appen. Alle nye
      endringer bor i rot-`index.html` og kopieres først hit ved bygg.
- [ ] Åpne i Xcode: `npm run cap:open` og velg **Product → Archive**.
- [ ] Sett **Marketing Version** (f.eks. 1.0) og **Build** (f.eks. 1) i Xcode → target → General.

## 🟡 Teknisk klargjøring (engangs)

- [x] `ITSAppUsesNonExemptEncryption = false` lagt til i Info.plist (unngår export-compliance-spørsmål).
- [x] Aldersgate 18+ med «drikk ansvarlig» finnes ved oppstart.
- [ ] **App-ikon:** bekreft at 1024×1024-ikonet rendrer riktig og IKKE har gjennomsiktighet/alfakanal
      (Apple avviser ikoner med alfa). Fil: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`.
- [ ] Test på **ekte iPhone** (ikke bare simulator):
  - [ ] Alle 5 spill (Gassed-kort, Sannhet/konsekvens, Trivia, Jeopardy, + moduser)
  - [ ] Begge språk (norsk + engelsk)
  - [ ] Portrett og landskap
  - [ ] Sesjonssynk mellom TO fysiske telefoner (vert + tilskuer ser instruksjoner, kort, alt)
  - [ ] Offline: fungerer uten nett (unntatt sesjonsdeling)

## 🟢 App Store Connect (obligatoriske felt)

- [ ] **Aldersgrense:** svar på det nye spørreskjemaet → alkohol-referanser → sett **18+**.
- [ ] **Personvernerklæring-URL:** host `privacy.html` (f.eks. GitHub Pages) og lim inn URL.
      → Husk å bytte ut `DIN_E-POST@eksempel.no` i `privacy.html` med ekte e-post.
- [ ] **Support-URL:** enkel side eller e-post.
- [ ] **App Privacy («nutrition label»):** oppgi at appen ikke samler personopplysninger
      knyttet til identitet. Sesjonsdata (kallenavn + spilltilstand) er anonyme og ikke
      koblet til bruker — deklareres som «Data ikke koblet til deg» / ikke brukt til sporing.
- [ ] **Skjermbilder** i påkrevde størrelser (min. 6,7"/6,9" iPhone). Gjerne app-preview-video.
- [ ] **Beskrivelse, undertittel, nøkkelord:** hentes fra `app_description.txt`.
- [ ] **Kategori:** primær «Spill», sekundær «Underholdning».
- [ ] **Notat til anmelder:** «18+ underholdnings-drikkespill. Aldersgate + ansvarlighets-disclaimer
      i appen. For sesjonssynk: opprett sesjon på én enhet, bli med med koden på en annen.»

## 🎯 Redusere avvisningsrisiko (drikkespill-spesifikt)

- [ ] **Metning (retn. 4.3):** fremhev det unike i beskrivelse + anmelder-notat:
      multi-enhet sesjonssynk + norsk-først innhold (få konkurrenter har dette).
- [ ] **Alkohol (retn. 1.4.3):** gjennomgå «Wild»-innholdet og fjern eventuelle utfordringer med
      fysisk risiko (f.eks. «drikk en hel flaske», «shot på tid»). Ingenting som oppfordrer til
      overdreven/farlig drikking.
- [ ] Bekreft at disclaimer nevner at alkohol ikke er nødvendig (kan byttes med alkoholfri drikk).

## 🚀 Etter godkjenning — lanseringsstrategi

- [ ] Myk lansering i **Norge** først.
- [ ] Få 15–30 ekte anmeldelser fra venner raskt (sosialt bevis = konvertering).
- [ ] TikTok / Instagram Reels: klipp av folk som spiller (viktigste kanal for denne kategorien).
- [ ] Utvid til flere land når appen har traction.

## 💰 Prising (plan)

- **v1.0:** helt gratis, ingen kjøp i appen → maksimer nedlastinger + anmeldelser.
- **v1.1–1.2:** engangs «Premium»-opplåsning (~59–79 kr) for Wild-nivå, ekstra kortstokker,
  flere trivia-kategorier. Vurder å gjøre **sesjonssynk** til premium (differensiator + dekker
  Firebase-kostnad). UNNGÅ ukesabonnement (jf. Picolo-backlash).

---

## Nyttige kommandoer

```bash
npm run build          # kopier index.html → www/index.html
npm run cap:sync       # build + npx cap sync ios
npm run cap:open       # åpne Xcode-prosjektet
```
