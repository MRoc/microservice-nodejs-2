"use client";

import { useEffect, useState } from "react";
import { OrderType } from "@/api/order.types";
import StripeCheckout from "react-stripe-checkout";
import { UserType } from "@/api/user.types";
import useRequest from "@/hooks/use-request";

const OrderCounter = ({ order, user }: { order: OrderType, user: UserType }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTimeLeft = () => {
      setTimeLeft(Math.max(new Date(order.expiresAt).getTime() - new Date().getTime(), 0))
    };

    updateTimeLeft();
    
    const timerId = setInterval(updateTimeLeft, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [order]);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id
    },
    onSuccess: (payment) => {
      console.log(payment);
    }
  });

  if (timeLeft <= 0) {
    return <div>{`Order expired`}</div>;
  }
  else {
    return(
      <div>
        <span>Time to pay: {`${Math.round(timeLeft / 1000)} sec`}</span>
        <StripeCheckout
          token={(token) => console.log(token)}
          stripeKey="pk_test_51PT4EcG6W6aWG8PX0N6By6Bigao6eRSYrWPg1ClmcuWiez4FsQDjalwiluxc7xQNz1CuVLDrcbeMrEtKYb9RQnMW000VCKLTbE"
          amount={order.ticket.price * 100}
          email={user.email} />
        {errors}
      </div>);
  }
};
 
export { OrderCounter };