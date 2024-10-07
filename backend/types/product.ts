import {Model, Document} from "mongoose"

export interface Product {
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReview: number;
}

export interface Review {
  user: string;
  name: string;
  rating: string;
  comment: string;
}

interface ProductInDatabase extends Product {
  user: string;
  reviews: Review[]
}

export interface ProductDocument extends ProductInDatabase, Document {}

export interface ProductModel extends Model<ProductDocument> {}