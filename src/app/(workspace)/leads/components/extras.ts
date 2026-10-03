export interface LeadListItem {
  id: string;
  name: string;
  company: string;
  source: string;
  industry: string;
  nextFollowUp: string | null;
  createdAt: string;
}

export interface LeadsResponse {
  items: LeadListItem[];
  page: number;
  totalPages: number;
}

const LIMIT = 20;

const SAMPLE: LeadListItem[] = Array.from({ length: 27 }, (_, i) => {
  const people = [
    ["Amanda Wright", "Amanda Residence", "Instagram", "Hospitality"],
    ["Tunde Bakare", "Bakare & Co", "LinkedIn", "Legal"],
    ["Sofia Marin", "Marin Studio", "Referrals", "Interior design"],
    ["James Okafor", "Okafor Logistics", "Cold email", "Logistics"],
    ["Priya Nair", "Bloom Skincare", "X", "Beauty"],
    ["Lucas Meyer", "Northpeak", "Freelance platforms", "SaaS"],
    ["Chiamaka Eze", "Eze Bakes", "Networking", "Food & beverage"],
    ["Daniel Reyes", "", "Other", "Fitness"],
    ["Hannah Cole", "Cole Realty", "Instagram", "Real estate"],
  ];
  const [name, company, source, industry] = people[i % people.length] as [
    string,
    string,
    string,
    string,
  ];
  const created = new Date(2026, 8, 30 - i);
  const follow = i % 3 === 2 ? null : new Date(2026, 9, 3 + (i % 9));
  return {
    id: String(i + 1),
    name:
      i < people.length
        ? name
        : `${name.split(" ")[0]} ${["Adams", "Bello", "Chen"][i % 3]}`,
    company,
    source,
    industry,
    nextFollowUp: follow ? follow.toISOString() : null,
    createdAt: created.toISOString(),
  };
});

/** Placeholder for GET /leads?search=&source=&page=&limit=20 — swap in the real API here. */
async function fetchLeads(params: {
  page: number;
  search: string;
  source: string;
}): Promise<LeadsResponse> {
  await new Promise((r) => setTimeout(r, 400));
  const q = params.search.trim().toLowerCase();
  const src = params.source.trim().toLowerCase();

  const filtered = SAMPLE.filter((l) => {
    const matchesSearch =
      !q ||
      [l.name, l.company, l.source, l.industry].some((v) =>
        v.toLowerCase().includes(q),
      );
    const matchesSource = !src || l.source.toLowerCase() === src;
    return matchesSearch && matchesSource;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / LIMIT));
  const page = Math.min(params.page, totalPages);
  return {
    items: filtered.slice((page - 1) * LIMIT, page * LIMIT),
    page,
    totalPages,
  };
}

export const btnPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-blue-600 bg-blue-600 px-4 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:border-blue-500 hover:bg-blue-500 active:bg-blue-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 motion-reduce:transition-none";
export const btnGhost =
  "inline-flex min-h-10 items-center justify-center rounded-md border border-gray-200 px-3 text-sm font-medium text-gray-600 transition-colors duration-150 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:bg-gray-900 dark:hover:text-gray-100 motion-reduce:transition-none";
