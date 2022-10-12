export interface ICart {
  productID: number;
  productPrice: number;
  productName: string;
  imageUrl: string;
  quantity: number;
  totalPrice: number;
  UserName?: string;
}
