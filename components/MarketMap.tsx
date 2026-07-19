"use client";

import { useMemo, useState } from "react";
import type { Taxonomy } from "@/data/types";

const SPACE_COLORS = [
"border-rose-300 bg-rose-50",
"border-amber-300 bg-amber-50",
"border-emerald-300 bg-emerald-50",
"border-sky-300 bg-sky-50",
"border-violet-300 bg-violet-50",
"border-fuchsia-300 bg-fuchsia-50",
"border-teal-300 bg-teal-50",
"border-orange-300 bg-orange-50",
];

export default function MarketMap({ taxonomy }: { taxonomy: Taxonomy }) {
const [query, setQuery] = useState("");
const [openSpaceId, setOpenSpaceId] = useState<string | null>(taxonomy.spaces[0]?.id ?? null);

const filteredSpaces = useMemo(() => {
const q = query.trim().toLowerCase();
if (!q) return taxonomy.spaces;
return taxonomy.spaces.map((space) => {
const spaceMatches = space.name.toLowerCase().includes(q);
const matchingSub = space.subSpaces.filter((s) => s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q));
if (spaceMatches) return space;
if (matchingSub.length) return { ...space, subSpaces: matchingSub };
return null;
}).filter((s): s is NonNullable<typeof s> => Boolean(s));
}, [query, taxonomy.spaces]);

const totalSpaces = taxonomy.spaces.length;
const totalSubSpaces = taxonomy.spaces.reduce((acc, s) => acc + s.subSpaces.length, 0);

return (
<div className="mx-auto max-w-6xl px-6 py-12">
<header className="mb-10"><p className="text-sm font-medium uppercase tracking-widest text-neutral-500">Market Map</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">{taxonomy.meta.title}</h1><p className="mt-3 max-w-2xl text-neutral-600">{taxonomy.meta.description}</p><div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-neutral-500"><span className="rounded-full border border-neutral-300 px-3 py-1">{totalSpaces} spaces</span><span className="rounded-full border border-neutral-300 px-3 py-1">{totalSubSpaces} sub-spaces</span><span className="rounded-full border border-neutral-300 px-3 py-1">Last updated {taxonomy.meta.lastUpdated}</span></div></header>
<div className="mb-8"><input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search spaces or sub-spaces..." className="w-full max-w-md rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-neutral-500" /></div>
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">{filteredSpaces.map((space, idx) => { const isOpen = openSpaceId === space.id || Boolean(query.trim()); const color = SPACE_COLORS[idx % SPACE_COLORS.length]; return (<div key={space.id} className={`rounded-2xl border-2 ${color} p-5 transition-shadow hover:shadow-md`}><button onClick={() => setOpenSpaceId(openSpaceId === space.id ? null : space.id)} className="w-full text-left"><div className="flex items-start justify-between gap-2"><h2 className="text-lg font-semibold text-neutral-900">{space.name}</h2><span className="mt-1 shrink-0 rounded-full bg-white/70 px-2 py-0.5 text-xs font-medium text-neutral-600">{space.subSpaces.length}</span></div><p className="mt-1.5 text-sm text-neutral-600">{space.summary}</p></button>{isOpen && (<ul className="mt-4 space-y-2 border-t border-neutral-900/10 pt-4">{space.subSpaces.map((sub) => (<li key={sub.id} className="rounded-lg bg-white/60 p-3 text-sm"><p className="font-medium text-neutral-900">{sub.name}</p><p className="mt-0.5 text-neutral-600">{sub.summary}</p>{sub.companies && sub.companies.length > 0 && (<p className="mt-1.5 text-xs text-neutral-500">{sub.companies.length} companies tracked</p>)}</li>))}</ul>)}</div>); })}</div>{filteredSpaces.length === 0 && (<p className="mt-10 text-center text-neutral-500">No spaces or sub-spaces match &ldquo;{query}&rdquo;.</p>)}<footer className="mt-16 border-t border-neutral-200 pt-6 text-xs text-neutral-400">Structure-first view: spaces and sub-spaces. Companies and key problems will be layered in next.</footer></div>);
}
