import asyncHandler from "express-async-handler";
import { Order} from "../models/";
import {Request, Response} from "../types/express";

const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;


  if(orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user?._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder)
  }
});

const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if(order){
    res.json(order)
  } else {
    res.status(404);
    throw new Error("Order not found")
  }
});

const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)

  if(order) {
    order.isPaid = true;
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.json(updatedOrder)
  } else {
    res.status(404);
    throw new Error("Order not found")
  }
});

const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.id);

    if(order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder)
    } else {
      res.status(404);
      throw new Error("Order not found")
    }
  }
);

const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  if(!req.user) throw new Error("User Not Found");

  const orders = await Order.find({user: req.user._id});

  if(orders) {
    res.json(orders);
  } else {
    res.status(404)
    throw new Error("Order not found")
  }
})

const getOrders = asyncHandler(async (req: Request, res: Response) => {
  const orders = await Order.find({}).populate("user", "id name");

  if(orders){
    res.json(orders)
  } else {
    res.status(404)
    throw new Error("Orders not found")
  }
});

export {addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered, getMyOrders, getOrders}