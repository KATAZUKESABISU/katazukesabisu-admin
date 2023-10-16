export interface Location {
  innerText: string;
  location: string;
  level?: number;
}

// [Block 1] - Summary
export interface SummaryContent {
  title: string;
  content: Location[];
}

// [Block 2] - Collection
export interface CollectionContent {
  title: string;
  id: string;
  content: CollectionItem[];
}

export interface CollectionItem {
  title: string;
  content: string;
  button?: Location[];
}

// [Block 3] - List QA
export interface ListQAContent {
  title: string;
  id: string;
  content: QAItem[];
}

export interface QAItem {
  question: string;
  answer: string;
  button?: Location[];
}
