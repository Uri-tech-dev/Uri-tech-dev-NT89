export interface IOrder {
  _id: string;
  items: IOrderItem[];
  totalAmount: number;
  status: string;
  customerId?: string;
  customerType?: string;
  createdAt?: string;
  paidDate?: string;
  billType?: string;
  registerNumber?: string;
  deliveryInfo?: IDeliveryInfo;
}

export interface IOrderItem {
  _id: string;
  productId: string;
  count: number;
  unitPrice: number;
  discountAmount?: number;
  bonusCount?: number;
  productName?: string;
}

export interface IDeliveryInfo {
  address?: string;
  description?: string;
  phone?: string;
  email?: string;
  city?: string;
  district?: string;
  street?: string;
  detail?: string;
  coordinate?: { longitude: number; latitude: number };
  hasSubtraction?: boolean;
  subtraction?: number;
}

export interface ICartItem {
  productId: string;
  count: number;
  unitPrice: number;
  productName?: string;
  productImgUrl?: string;
}
