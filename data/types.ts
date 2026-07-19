export type Company = {
  name: string;
  stage?: string;
  tier?: string;
  notes?: string;
  url?: string;
};

export type Problem = {
  title: string;
  description?: string;
};

export type SubSpace = {
  id: string;
  name: string;
  summary: string;
  companies?: Company[];
  problems?: Problem[];
};

export type Space = {
  id: string;
  name: string;
  summary: string;
  subSpaces: SubSpace[];
};

export type Taxonomy = {
  meta: {
    title: string;
    description: string;
    lastUpdated: string;
  };
  spaces: Space[];
};
