export interface ApiHistory {
  localDate: string;
  openPrice: number;
  lowPrice: number;
  highPrice: number;
  closePrice: number;
  accumulatedTradingVolume: number;
}

export interface CiqHistory {
  Date: string;
  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;
  Adj_Close: number;
}
