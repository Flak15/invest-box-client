export interface Iauth {
  username: string,
  password: string
}

export interface IportfolioItem {
  _id: string,
  symbol: string,
  value: number,
  totalValue: number,
  shortName: string,
  currency: string
}