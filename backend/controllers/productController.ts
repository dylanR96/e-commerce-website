import asyncHandler from "express-async-handler";
import { Product } from "../models";
import { Response, Request } from "../types";

const getProduct = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword? {
    name: {
      $regex: req.query.keyword,
      $options: "i",
    } as any,
  } : {}

  const count = await Product.countDocuments({ ...keyword})
  const products = await Product.find({ ...keyword})
  .limit(pageSize)
  .skip(pageSize * (page - 1))

  res.json({products, page, pages: Math.ceil(count / pageSize)})
});


export {getProduct}