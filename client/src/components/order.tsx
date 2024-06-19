"use client";

import { useEffect, useState } from "react";
import { OrderType } from "@/api/order.types";

const Order = ({ order }: { order: OrderType }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimeLeft = () => {
      const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime();
      setTimeLeft(`${Math.round(msLeft / 1000)} sec`)
    };

    updateTimeLeft();
    
    const timerId = setInterval(updateTimeLeft, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [order]);

  const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime();
  return (
    <div>
      <h1>Order</h1>
      <div>Order ID: {order.id}</div>
      <div>Order Version: {order.version}</div>
      <div>Order Status: {order.status}</div>
      <div>User ID: {order.userId}</div>
      <div>Expires in: {timeLeft} sec</div>
      <div>Ticket ID: {order.ticket.id}</div>
      <div>Ticket Price: {order.ticket.price}</div>
    </div>
    );
};
 
export { Order };