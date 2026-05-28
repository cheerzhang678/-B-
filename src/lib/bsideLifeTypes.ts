export type Direction = "random" | "hottest" | "dream";

export interface BsideLifeRequest {
  year: number;
  score: number;
  actualMajor: string;
  direction: Direction;
  dreamMajor?: string;
}

export interface TimelineNode {
  year: number;
  yearsAfter: number;
  aSide: {
    title: string;
    description: string;
  };
  bSide: {
    title: string;
    description: string;
  };
}

export interface DestinyFootnote {
  sense: string;
  detail: string;
}

export interface BsideLifeResponse {
  bsideMajor: string;
  timeline: TimelineNode[];
  destinyFootnote: DestinyFootnote;
}

export type PageState = "input" | "direction" | "generating" | "result" | "sharing";
