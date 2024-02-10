import React from "react";
import { useLocation } from "react-router-dom";
import SuccessComponent from "../../components/SuccessComponent";

type Props = {};

const Success = (props: Props) => {
  const location = useLocation();
  const stripeData = location?.state?.stripeData;
  const tickets = location?.state?.tickets;
  const data = location?.state?.data;
  const ticketData = location?.state?.ticketData;
  
  //console.log(data, ticketData)
  // Calculate the sum of the amounts
  // const calculateTotalAmount = (prices: any) => {
  //   const price = prices?.reduce(
  //     (sum: any, item: any) => Number(sum) + Number(item.price * item.qty || 0),
  //     0
  //   );
  //   return price;
  // };

  // const subtotal = calculateTotalAmount(tickets);
  // const taxPercent = Number(process.env.REACT_APP_TAXPERCENT);
  // const vat = (taxPercent / 100) * subtotal;
  // const totalAmount = subtotal + vat;

  return (
    <SuccessComponent
      stripeData={stripeData}
      tickets={tickets}
      data={data}
      ticketData={ticketData}
    
      // vat={vat}
      // totalAmount={totalAmount}
      // subTotal={subtotal}
    />
  );
};

export default Success;
