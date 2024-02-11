// @ts-nocheck
import {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
  
} from "react";
import  axios  from "axios";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CountryCode, E164Number } from "libphonenumber-js";


import { NumericFormat } from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { getCurrency, getCurrencyCode } from "../../utils/functions";
import StripeCheckout from "react-stripe-checkout";
import usePost from "../../hooks/usePost";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

type Props = {
 
  tickets: Array<any>;
  ticketData: Array<any>;
  data: any;
  stripeData: any
};

interface ICheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  
  userConsent: boolean;
  [key: string]: string | boolean;
}

interface IBoolean {
  [key: string]: boolean;
}


const SuccessComponent = (props: Props) => {
  console.log(props);
  const { ticketData, stripeData, tickets, data } = props;
  const defaultCountryCode = process.env.REACT_APP_COUNTRYCODE;
  const taxPercent = Number(process.env.REACT_APP_TAXPERCENT);
  const baseUrl = process.env.REACT_APP_BASEURL;
  console.log(ticketData);
  const [tick, setTick]= useState(tickets);
  const [stripe, setStripe] = useState(stripeData);
  const [userData, setUserData] = useState(data);
  const [tickData, setTickData]= useState(ticketData);
  console.log(stripeData);
  const currency= data && getCurrency(data.data);
  const navigate= useNavigate();
  

  
  const currencycode = data && getCurrencyCode(data);
  // const location = useLocation();
  // //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  // const data = location.state.stripeData;
  // const cart = location.state.cart;
  // const currentUser = useSelector((state) => state.user.currentUser);
  // const [orderId, setOrderId] = useState(null);

  // useEffect(() => {
  //   const createOrder = async () => {
  //     try {
  //       const res = await userRequest.post("/orders", {
  //         userId: currentUser._id,
  //         products: cart.products.map((item) => ({
  //           productId: item._id,
  //           quantity: item._quantity,
  //         })),
  //         amount: cart.total,
  //         address: data.billing_details.address,
  //       });
  //       setOrderId(res.data._id);
  //     } catch {}
  //   };
  //   data && createOrder();
  // }, [cart, data, currentUser]);
 //     
 
//  const { data, loading } =  usePost(`/dispense/ticket`, {
//             tickets : tickets,
//             userdata: data,
//             currency: currencycode
//        });

// const { tickdata, loading } =  usePost(`/dispense/ticket`, {
//   tickets : tickets,
//   userdata: data,
//   currency: currencycode
// });

// console.log(tickdata)

const resetState = () => {
  setTick({});
  setStripe({});
  setUserData({});
  setTickData({});
  console.log(tick);
};


  useEffect(() => {
    const MakeRequest = async ()=>{

      try {

 //      const { data, loading } =  usePost(`/stripe/payment`, {
 //       tokenId : stripeToken.id,
 //       amount: totalAmount*100,
 //       currency: currencycode
 //  });



   const res= await axios.post(`${baseUrl}/dispense/internationalticket`, {
    
    myCart : tick,
    userdata: userData,
    stripeData: stripe,
    ticketData: tickData,
  });
   
  toast(res.data.error);
  console.log(res.data);
   if(res.data.error === false){
   
   resetState();
   console.log(tick);
}
 
} catch (error) {
   console.log(error);
   
}
};

tick && stripe && MakeRequest();
}, [tick, stripe])



  return (
    <>
    
    <div style={{ 
        height: "100vh",
       
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white"
    }}>
       
           {stripeData
        ? `The tickets has been purchased successfully. `
        : `Successfull. Your order is being prepared...`}
      <button onClick={() => navigate("/")} style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
          <div style={{width: "700px" }} className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            

            <dl className="aby border-t border-gray-200 px-4 py-6 sm:px-6">
              {tickets.map((item, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <dt className="text-base text-customBlack">{`${item?.qty} * ${item?.name}`}</dt>
                  <dd className="text-base font-medium text-customBlack">
                    <NumericFormat
                      value={Number(item.price * item.qty).toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={`${currency}`}
                    />
                  </dd>
                </div>
              ))}

              <div className="flex items-center justify-between">
                <dt className="text-base text-customBlack">Subtotal</dt>
                <dd className="text-base font-medium text-customBlack">
                  <NumericFormat
                    value={Number(data.subTotal).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={`${currency}`}
                  />
                </dd>
              </div>

           <div className="flex items-center justify-between">
                <dt className="text-base text-customBlack">
                  VAT
                  <span className="ml-2 rounded-lg bg-gray-200 px-2 py-1 text-xs tracking-wide text-gray-600">
                    {taxPercent}%
                  </span>
                </dt>
                            <dd className="text-base font-medium text-customBlack">
                  <NumericFormat
                    value={Number(data.vat).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={`${currency}`}
                  />
                </dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-lg text-customBlack font-bold">Total</dt>
                <dd className="text-base font-bold text-customBlack">
                  <NumericFormat
                    value={Number(data.totalAmount).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={`${currency}`}
                  />
                </dd>
              </div>
            </dl>
            </div>
            </div>
            
  
           
            </>    
);
};


export default SuccessComponent;
