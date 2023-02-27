export interface ExchangeRateInterface {
  date: string;
  info: {
    timestamp: number;
    rate: number;
  };
  query: {
    amount: number;
    from: string;
    to: string;
  };
  result: number;
  success: boolean;
}
