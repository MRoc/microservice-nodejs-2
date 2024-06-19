export interface OrderType {
  id: string;
  version: number;
  status: string;
  userId: string;
  expiresAt: string;
  ticket: {
    id: string;
    price: number;
  };
}
