"use client";

import { OrderType } from "@/api/order.types";
import { UserType } from "@/api/user.types";
import { OrderCounter } from "@/components/order-counter";

const Order = ({ order, user }: { order: OrderType, user: UserType }) => {
  return (
    <div>
      <h1>Order</h1>
      <div>Order ID: {order.id}</div>
      <div>Order Version: {order.version}</div>
      <div>Order Status: {order.status}</div>
      <div>User ID: {order.userId}</div>
      <div>Ticket ID: {order.ticket.id}</div>
      <div>Ticket Price: {order.ticket.price}</div>
      <OrderCounter order={order} user={user} />
    </div>
    );
};
 
export { Order };