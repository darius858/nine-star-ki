import React, { useMemo, useState, useEffect } from "react";

// ====== BRAND SETTINGS (logo + kleuren) ======
const DEFAULT_LOGO = "/logo.png?v=4"; // zorg dat public/logo.png bestaat
const BRAND = {
  name: "Feng Shui Nederland",
  colors: {
    primary: "#ff6342", // vuur
    water:   "#84b9db", // water
    wood:    "#72955d", // hout
    earth:   "#bc8163", // aarde
    metal:   "#737373", // metaal
    base:    "#fbf2f0", // zachte achtergrond
  },
};

function hexToRgb(hex){
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if(!m) return {r:0,g:0,b:0};
  return { r: parseInt(m[1],16), g: parseInt(m[2],16), b: parseInt(m[3],16) };
}
function contrastOn(hex){
  const {r,g,b}=hexToRgb(hex);
  const L = 0.2126*r + 0.7152*g + 0.0722*b;
  return L > 160 ? "#0f172a" : "#ffffff";
}

// ===== Ingebouwde DATA (uit jouw Excel) =====
const DATA = {"year_to_star": {"1901":9,"1902":8,"1903":7,"1904":6,"1905":5,"1906":4,"1907":3,"1908":2,"1909":1,"1910":9,"1911":8,"1912":7,"1913":6,"1914":5,"1915":4,"1916":3,"1917":2,"1918":1,"1919":9,"1920":8,"1921":7,"1922":6,"1923":5,"1924":4,"1925":3,"1926":2,"1927":1,"1928":9,"1929":8,"1930":7,"1931":6,"1932":5,"1933":4,"1934":3,"1935":2,"1936":1,"1937":9,"1938":8,"1939":7,"1940":6,"1941":5,"1942":4,"1943":3,"1944":2,"1945":1,"1946":9,"1947":8,"1948":7,"1949":6,"1950":5,"1951":4,"1952":3,"1953":2,"1954":1,"1955":9,"1956":8,"1957":7,"1958":6,"1959":5,"1960":4,"1961":3,"1962":2,"1963":1,"1964":9,"1965":8,"1966":7,"1967":6,"1968":5,"1969":4,"1970":3,"1971":2,"1972":1,"1973":9,"1974":8,"1975":7,"1976":6,"1977":5,"1978":4,"1979":3,"1980":2,"1981":1,"1982":9,"1983":8,"1984":7,"1985":6,"1986":5,"1987":4,"1988":3,"1989":2,"1990":1,"1991":9,"1992":8,"1993":7,"1994":6,"1995":5,"1996":4,"1997":3,"1998":2,"1999":1,"2000":9,"2001":8,"2002":7,"2003":6,"2004":5,"2005":4,"2006":3,"2007":2,"2008":1,"2009":9,"2010":8,"2011":7,"2012":6,"2013":5,"2014":4,"2015":3,"2016":2,"2017":1,"2018":9,"2019":8,"2020":7,"2021":6,"2022":5,"2023":4,"2024":3,"2025":2,"2026":1,"2027":9,"2028":8,"2029":7,"2030":6,"2031":5,"2032":4,"2033":3,"2034":2,"2035":1,"2036":9,"2037":8,"2038":7,"2039":6,"2040":5,"2041":4,"2042":3,"2043":2,"2044":1,"2045":9,"2046":8,"2047":7,"2048":6,"2049":5,"2050":4,"2051":3,"2052":2,"2053":1},"month_ranges":[{"label":"4 feb - 5 mrt","start":{"month":2,"day":4},"end":{"month":3,"day":5},"sequences":{"9":[9,5,9],"8":[8,2,2],"7":[7,8,4],"6":[6,5,6],"5":[5,2,8],"4":[4,8,1],"3":[3,5,3],"2":[2,2,5],"1":[1,7,8]}},{"label":"6 mrt - 5 april","start":{"month":3,"day":6},"end":{"month":4,"day":5},"sequences":{"9":[9,4,1],"8":[8,1,3],"7":[7,7,5],"6":[6,4,7],"5":[5,1,9],"4":[4,7,2],"3":[3,4,4],"2":[2,1,6],"1":[1,7,8]}},{"label":"6 april - 5 mei","start":{"month":4,"day":6},"end":{"month":5,"day":5},"sequences":{"9":[9,3,2],"8":[8,9,4],"7":[7,6,6],"6":[6,3,8],"5":[5,9,1],"4":[4,6,3],"3":[3,3,5],"2":[2,9,7],"1":[1,6,9]}},{"label":"6 mei - 5 juni","start":{"month":5,"day":6},"end":{"month":6,"day":5},"sequences":{"9":[9,2,3],"8":[8,8,5],"7":[7,5,7],"6":[6,2,9],"5":[5,8,2],"4":[4,5,4],"3":[3,2,6],"2":[2,8,8],"1":[1,5,1]}},{"label":"6 juni - 7 juli","start":{"month":6,"day":6},"end":{"month":7,"day":7},"sequences":{"9":[9,1,4],"8":[8,7,6],"7":[7,4,8],"6":[6,1,1],"5":[5,7,3],"4":[4,4,5],"3":[3,1,7],"2":[2,7,9],"1":[1,4,2]}},{"label":"8 juli - 7 aug","start":{"month":7,"day":8},"end":{"month":8,"day":7},"sequences":{"9":[9,9,5],"8":[8,6,7],"7":[7,3,9],"6":[6,9,2],"5":[5,6,4],"4":[4,3,6],"3":[3,9,8],"2":[2,6,1],"1":[1,3,3]}},{"label":"8 aug - 7 sept","start":{"month":8,"day":8},"end":{"month":9,"day":7},"sequences":{"9":[9,8,6],"8":[8,5,8],"7":[7,2,1],"6":[6,8,3],"5":[5,5,5],"4":[4,2,7],"3":[3,8,9],"2":[2,5,2],"1":[1,2,4]}},{"label":"8 sept - 8 okt","start":{"month":9,"day":8},"end":{"month":10,"day":8},"sequences":{"9":[9,7,7],"8":[8,4,9],"7":[7,1,9],"6":[6,7,4],"5":[5,4,6],"4":[4,1,8],"3":[3,7,1],"2":[2,4,3],"1":[1,1,5]}},{"label":"9 okt - 7 nov","start":{"month":10,"day":9},"end":{"month":11,"day":7},"sequences":{"9":[9,6,8],"8":[8,3,1],"7":[7,9,3],"6":[6,6,5],"5":[5,3,7],"4":[4,9,9],"3":[3,6,2],"2":[2,3,4],"1":[1,9,6]}},{"label":"8 nov - 7 dec","start":{"month":11,"day":8},"end":{"month":12,"day":7},"sequences":{"9":[9,5,9],"8":[8,2,2],"7":[7,8,4],"6":[6,5,6],"5":[5,2,8],"4":[4,8,1],"3":[3,5,3],"2":[2,2,5],"1":[1,8,7]}},{"label":"8 dec - 5 jan","start":{"month":12,"day":8},"end":{"month":1,"day":5},"sequences":{"9":[9,4,1],"8":[8,1,3],"7":[7,7,5],"6":[6,4,7],"5":[5,1,9],"4":[4,7,2],"3":[3,4,4],"2":[2,1,6],"1":[1,7,8]}},{"label":"6 jan - 3 feb","start":{"month":1,"day":6},"end":{"month":2,"day":3},"sequences":{"9":[9,3,2],"8":[8,9,4],"7":[7,6,6],"6":[6,3,8],"5":[5,9,1],"4":[4,6,3],"3":[3,3,5],"2":[2,9,7],"1":[1,6,9]}}]};

// ===== Hulpfuncties =====
function isBeforeNineKiNewYear(d){ const y=d.getFullYear(); const b=new Date(y,1,4); return d<b; }
function inRangeMD(m,d,start,end){
  const a=m*100+d, s=start.month*100+start.day, e=end.month*100+end.day; // <-- correct
  if(s<=e) return a>=s && a<=e;
  return (a>=s)||(a<=e);
}
function monthRangeIndex(date){
  const m=date.getMonth()+1, d=date.getDate();
  for(let i=0;i<DATA.month_ranges.length;i++){
    const r=DATA.month_ranges[i];
    if(inRangeMD(m,d,r.start,r.end)) return i;
  }
  return -1;
}
function yearStarFromDataset(date){
  const y0=date.getFullYear();
  const useY=isBeforeNineKiNewYear(date)?y0-1:y0;
  const tbl=DATA.year_to_star[String(useY)];
  if(tbl) return {useYear:useY, star:tbl};
  return {useYear:useY, star:null};
}
function sequenceFromDataset(date){
  const ys=yearStarFromDataset(date).star;
  const i=monthRangeIndex(date);
  if(i<0||ys==null) return null;
  const row=DATA.month_ranges[i];
  const seq=row.sequences[String(ys)];
  if(!seq||seq.length!==3) return null;
  return {year:seq[0], month:seq[1], day:seq[2], monthLabel:row.label};
}

// Kleur bepalen obv getal (element → merk-kleur)
function colorFor(n){
  let bg = BRAND.colors.earth;
  if(n===9) bg = BRAND.colors.primary;
  else if(n===1) bg = BRAND.colors.water;
  else if(n===3||n===4) bg = BRAND.colors.wood;
  else if(n===6||n===7) bg = BRAND.colors.metal;
  return bg;
}

// ===== UI helpers =====
const TEXT = {
  1: { core: "Je energie is stromend en onderzoekend; je zoekt steeds de diepere laag.", emotion: "Emotioneel heb je rust en vertrouwen nodig.", action: "In actie beweeg je flexibel mee en verbind je mensen." },
  2: { core: "Je energie is stabiliserend en dienstbaar; je brengt rust en gronding.", emotion: "Emotioneel zoek je zekerheid en nabijheid.", action: "In actie ondersteun je, breng je orde en maak je het samen." },
  3: { core: "Je energie is initiërend en direct; je start en doorbreekt stilstand.", emotion: "Emotioneel wil je groei; stagnatie frustreert.", action: "In actie begin je snel, experimenteer je en duw je door obstakels." },
  4: { core: "Je energie is verbindend en flexibel; je schakelt tussen mensen en ideeën.", emotion: "Emotioneel zoek je harmonie en beweging.", action: "In actie communiceer je, stem je af en breng je partijen bij elkaar." },
  5: { core: "Je energie is centreren en ordenend; je pakt van nature de regie.", emotion: "Emotioneel wil je balans en grip.", action: "In actie organiseer je, neem je verantwoordelijkheid en houd je het midden." },
  6: { core: "Je energie is gefocust en verantwoordelijk; je bewaakt kwaliteit.", emotion: "Emotioneel heb je helderheid en respect nodig.", action: "In actie structureer je, stel je kaders en voer je consequent uit." },
  7: { core: "Je energie is charmant en waarderend; je brengt licht en plezier.", emotion: "Emotioneel zoek je contact en erkenning.", action: "In actie verbind je, creëer je aantrekkingskracht en maak je het licht." },
  8: { core: "Je energie is standvastig en transformerend; je gaat de diepte in.", emotion: "Emotioneel heb je veiligheid en begrenzing nodig.", action: "In actie volhard je, verdiep je en zet je blijvende verandering neer." },
  9: { core: "Je energie is zichtbaar en inspirerend; je zet dingen in beweging.", emotion: "Emotioneel leef je op van passie en betekenis.", action: "In actie versnel je, maak je zichtbaar en enthousiasmeer je anderen." },
};
function flowSummary(y, m, d){
  const Y = TEXT[y] || {}, M = TEXT[m] || {}, D = TEXT[d] || {};
  const s1 = Y.core || "Je energie zet je in op jouw manier.";
  const s2 = (M.emotion ? M.emotion + " " : "") + (D.action || "Je komt in actie op een eigen, herkenbare manier.");
  return s1 + " " + s2;
}

function StarBadge({ n }){
  const bg = colorFor(n);
  const fg = contrastOn(bg);
  return (
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl shadow-sm" style={{ backgroundColor: bg, color: fg }}>
      <span className="text-2xl font-bold leading-none">{n}</span>
    </div>
  );
}

const elementMap = {
  1:{eigenschappen:["intuïtief, empathisch","flexibel, aanpasbaar","diepgang, onderzoekend"]},
  2:{eigenschappen:["zorgzaam, dienstbaar","betrouwbaar, praktisch","ritme, stabiliteit"]},
  3:{eigenschappen:["initiatief, pionierend","direct, assertief","groeikracht, creativiteit"]},
  4:{eigenschappen:["sociaal, verbindend","aanpasbaar, diplomatiek","leren, communicatie"]},
  5:{eigenschappen:["centrum, ordenend","magnetisch, invloedrijk","structuur, verantwoordelijkheid"]},
  6:{eigenschappen:["leiding, focus","discipline, strategie","kwaliteit, rechtlijnig"]},
  7:{eigenschappen:["charme, plezier","relaties, netwerken","fijnzinnig, esthetisch"]},
  8:{eigenschappen:["gronding, toewijding","uithouding, volharding","transformatie, bezinning"]},
  9:{eigenschappen:["zichtbaarheid, expressie","inspiratie, enthousiasme","snel, intuïtieve beslissingen"]},
};
function Properties({ n }){
  const data=elementMap[n]||{eigenschappen:[]};
  return (
    <ul className="list-disc pl-5 space-y-1 text-sm">
      {(data.eigenschappen||[]).map((e,i)=>(<li key={i}>{e}</li>))}
    </ul>
  );
}

// ===== UI =====
export default function NineStarKiApp(){
  const [value,setValue] = useState("1990-08-15");
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO);

  // optioneel: logo uit localStorage oppakken
  useEffect(()=>{
    try {
      const v = localStorage.getItem('fsn_logo_data_uri');
      if(v) setLogoUrl(v);
    } catch(e){}
  },[]);

  const result=useMemo(()=>{
    const d=value?new Date(value+"T12:00:00"):null;
    if(!d||isNaN(d.getTime())) return null;
    const seq=sequenceFromDataset(d);
    if(!seq) return {date:d, info:null};
    return {date:d, info:{yearStar:seq.year, monthStar:seq.month, dayStar:seq.day, monthLabel:seq.monthLabel}};
  },[value]);

  const headerBg = 'linear-gradient(90deg, ' + BRAND.colors.base + ', #ffffff)';

  return (
    <div className="min-h-screen text-slate-900" style={{background:'linear-gradient(180deg, ' + BRAND.colors.base + ' 0%, #ffffff 60%)'}}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-8 rounded-2xl shadow-sm ring-1" style={{background:headerBg, borderColor:BRAND.colors.base}}>
          <div className="flex items-center gap-4 p-5">
            <div
              className="p-2 rounded-md ring-1 ring-slate-200 bg-slate-50"
              style={{
                backgroundImage:
                  'linear-gradient(45deg, rgba(148,163,184,.25) 25%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 50%, rgba(148,163,184,.25) 50%, rgba(148,163,184,.25) 75%, rgba(0,0,0,0) 75%, rgba(0,0,0,0))',
                backgroundSize: '8px 8px'
              }}
            >
              <img
                src={logoUrl}
                alt="Feng Shui Nederland"
                className="w-16 h-16 object-contain"
                onError={() => {
                  if (logoUrl !== "/icons/icon-192.png?v=4") setLogoUrl("/icons/icon-192.png?v=4");
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight" style={{color:BRAND.colors.primary}}>{BRAND.name}</h1>
              <p className="text-slate-600">Feng Shui Nederland - DE Nine Star Ki calculator</p>
            </div>
          </div>
          <div style={{height:4, backgroundColor:BRAND.colors.primary, borderBottomLeftRadius:16, borderBottomRightRadius:16}} />
        </header>

        <div className="bg-white rounded-2xl shadow-sm ring-1 p-5 mb-8" style={{borderColor:BRAND.colors.base}}>
          <label className="block text-sm font-medium" style={{color:BRAND.colors.metal}}>Geboortedatum</label>
          <input type="date" className="mt-2 w-full rounded-xl border px-3 py-2 focus:outline-none"
            style={{borderColor:BRAND.colors.base}} value={value} onChange={(e)=>setValue(e.target.value)} />
        </div>

        {result && result.info ? (
          <main className="space-y-6">
            <section className="bg-white rounded-2xl shadow-sm ring-1 p-6" style={{borderColor:BRAND.colors.base}}>
              <h2 className="text-xl font-semibold mb-4" style={{color:BRAND.colors.primary}}>Jouw Nine Star Ki</h2>
              <div className="text-sm mb-4" style={{color:BRAND.colors.metal}}>
                Reeks: <span className="font-semibold" style={{color:BRAND.colors.primary}}>{result.info.yearStar} – {result.info.monthStar} – {result.info.dayStar}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Je Energie" n={result.info.yearStar} />
                <Card title="Je Emotie" n={result.info.monthStar} />
                <Card title="Je Actie" n={result.info.dayStar} />
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-sm ring-1 p-6" style={{bo

