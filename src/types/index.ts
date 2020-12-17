export interface Iauth {
  username: string;
  password: string;
}

export interface Istate {
  portfolio: IportfolioItem[];
  quotes: Iinstrument[];
}

export interface IportfolioItem {
  _id: string;
  symbol: string;
  value: number;
  totalValue: number;
  priceData: any;
  financialData: any;
  summaryDetail: any;
}

export interface Iinstrument {
  _id: string;
  symbol: string;
  price: number;
  priceData: any;
  financialData: any;
  summaryDetail: any;
}

export type PortfolioState = IportfolioItem[];
