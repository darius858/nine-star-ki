import React from "react";

const ELEMENTEN = [
  { naam: "Water", kleur: "#84b9db", uitleg: "Water staat binnen Nine Star Ki voor diepgang, aanpassingsvermogen en het vermogen om mee te bewegen." },
  { naam: "Hout", kleur: "#72955d", uitleg: "Hout staat voor groei, ontwikkeling, initiatief en beweging." },
  { naam: "Vuur", kleur: "#ff6342", uitleg: "Vuur staat voor zichtbaarheid, inspiratie, enthousiasme en expressie." },
  { naam: "Aarde", kleur: "#bc8163", uitleg: "Aarde staat voor stabiliteit, zorg, verbinding en het vinden van een midden." },
  { naam: "Metaal", kleur: "#737373", uitleg: "Metaal staat voor helderheid, structuur, kwaliteit en het maken van keuzes." },
];

const ENERGIEEN = [
  { getal: 1, element: "Water", kleur: "#84b9db", kern: "Diepgang, intuïtie en flexibiliteit", aandacht: "Bij spanning kan deze energie zich terugtrekken of blijven twijfelen." },
  { getal: 2, element: "Aarde", kleur: "#bc8163", kern: "Zorgzaamheid, betrouwbaarheid en samenwerken", aandacht: "De zorg voor anderen kan ten koste gaan van de eigen behoeften." },
  { getal: 3, element: "Hout", kleur: "#72955d", kern: "Initiatief, groei en nieuwe mogelijkheden", aandacht: "Ongeduld en te snel handelen kunnen voor onrust zorgen." },
  { getal: 4, element: "Hout", kleur: "#72955d", kern: "Communicatie, verbinding en aanpassingsvermogen", aandacht: "Te veel rekening houden met anderen kan keuzes lastig maken." },
  { getal: 5, element: "Aarde", kleur: "#bc8163", kern: "Centrum, verantwoordelijkheid en verandering", aandacht: "De neiging om alles te willen regelen kan zwaar worden." },
  { getal: 6, element: "Metaal", kleur: "#737373", kern: "Structuur, duidelijkheid en verantwoordelijkheid", aandacht: "Hoge eisen kunnen omslaan in strengheid of starheid." },
  { getal: 7, element: "Metaal", kleur: "#737373", kern: "Plezier, contact en expressie", aandacht: "Het zoeken naar lichtheid kan moeilijke onderwerpen naar de achtergrond duwen." },
  { getal: 8, element: "Aarde", kleur: "#bc8163", kern: "Volharding, bezinning en stevigheid", aandacht: "Vasthouden aan het vertrouwde kan verandering vertragen." },
  { getal: 9, element: "Vuur", kleur: "#ff6342", kern: "Inspiratie, zichtbaarheid en enthousiasme", aandacht: "Veel prikkels of een hoog tempo kunnen tot onrust leiden." },
];

function UitlegOnderdeel({ titel, kinderen, open = false }) {
  return (
    <details
      open={open || undefined}
      className="group rounded-xl border border-slate-200 bg-white"
    >
      <summary className="cursor-pointer list-item px-4 py-4 text-base font-semibold text-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
        {titel}
      </summary>
      <div className="border-t border-slate-100 px-4 pb-5 pt-4 text-sm leading-7 text-slate-700">
        {kinderen}
      </div>
    </details>
  );
}

export default function NineStarKiGuide() {
  return (
    <section
      aria-labelledby="ninekiguide-heading"
      className="mt-8 rounded-2xl bg-white p-5 shadow-sm ring-1 md:p-6"
      style={{ borderColor: "#fbf2f0" }}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "#737373" }}>
        Gratis uitleg
      </p>
      <h2 id="ninekiguide-heading" className="mb-2 text-xl font-semibold" style={{ color: "#ff6342" }}>
        Leer meer over Nine Star Ki
      </h2>
      <p className="mb-5 text-sm leading-7 text-slate-600">
        Je hebt je drie getallen berekend. Wat vertellen die over de manier waarop deze
        traditionele methode naar energie en persoonlijke ontwikkeling kijkt?
        Ontdek hieronder de basis. Alle uitleg is gratis.
      </p>

      <div className="space-y-3">
        <UitlegOnderdeel titel="Wat is Nine Star Ki?" open>
          <p>
            Nine Star Ki is een traditionele methode die je geboortedatum koppelt aan
            negen energieën en de vijf elementen. Je kunt de uitkomst gebruiken als
            aanleiding om na te denken over je kwaliteiten, reacties en gewoonten.
          </p>
          <p className="mt-3">
            Nine Star Ki beschrijft symbolische patronen. Het is geen wetenschappelijke
            persoonlijkheidstest en je getallen bepalen niet wie je bent of wat je zult meemaken.
          </p>
        </UitlegOnderdeel>

        <UitlegOnderdeel titel="Wat betekenen de drie getallen?">
          <p className="mb-3">In deze calculator lees je jouw reeks van links naar rechts:</p>
          <dl className="space-y-3">
            <div>
              <dt className="font-semibold text-slate-900">1. Je Energie</dt>
              <dd>De basisenergie: kwaliteiten en thema's die binnen Nine Star Ki centraal staan in jouw persoonlijke profiel.</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">2. Je Emotie</dt>
              <dd>De gevoelskant: hoe je volgens deze interpretatie met ervaringen en emotionele behoeften omgaat.</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">3. Je Actie</dt>
              <dd>De handelingskant: hoe je jouw energie laat zien wanneer je iets doet of op situaties reageert.</dd>
            </div>
          </dl>
          <p className="mt-3">
            De drie getallen vormen samen één geheel. Een getal is nooit op zichzelf
            een oordeel over iemands karakter.
          </p>
        </UitlegOnderdeel>

        <UitlegOnderdeel titel="De vijf elementen">
          <p className="mb-4">
            Water, Hout, Vuur, Aarde en Metaal vormen de basis van veel
            Nine Star Ki-interpretaties. Elk element vertegenwoordigt bepaalde
            kwaliteiten. De elementen beïnvloeden elkaar binnen de traditionele leer.
          </p>
          <div className="space-y-3">
            {ELEMENTEN.map((item) => (
              <div key={item.naam} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: item.kleur }}
                />
                <p><strong className="text-slate-900">{item.naam}:</strong> {item.uitleg}</p>
              </div>
            ))}
          </div>
        </UitlegOnderdeel>

        <UitlegOnderdeel titel="Ontdek de negen energieën">
          <p className="mb-4">
            Kies een getal om de algemene kenmerken te bekijken. Herken je iets?
            Zie het als een uitnodiging tot zelfonderzoek, niet als een vaststaand etiket.
          </p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {ENERGIEEN.map((item) => (
              <details key={item.getal} className="rounded-xl border border-slate-200 bg-slate-50">
                <summary className="flex cursor-pointer list-item items-center gap-3 px-3 py-3 font-medium text-slate-900">
                  <span
                    className="mr-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-base font-bold"
                    style={{ backgroundColor: item.kleur, color: "#ffffff" }}
                  >
                    {item.getal}
                  </span>
                  {item.getal} · {item.element}
                </summary>
                <div className="border-t border-slate-200 px-3 pb-4 pt-3">
                  <p><strong>Kwaliteiten:</strong> {item.kern}.</p>
                  <p className="mt-2"><strong>Aandachtspunt:</strong> {item.aandacht}</p>
                </div>
              </details>
            ))}
          </div>
        </UitlegOnderdeel>
      </div>
    </section>
  );
}
