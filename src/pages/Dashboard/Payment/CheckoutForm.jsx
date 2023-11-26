import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import useCart from "../../../hooks/useCart";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({member}) => {
   
    const stripe = useStripe();
    const elements = useElements();
    const {user}= useAuth()
    const [transactionId,setTransactionId] = useState()
    const [errormsg,setError] = useState()
    const axiosSecure  = useAxiosSecure()
    const [clientSecret,setClientSecret] =useState('')

    const [cart,refetch] = useCart()

    let  totalPrice = 0.0

    if(member!=null || member!==undefined) {
      totalPrice = member.price
    }else{
      totalPrice = cart.reduce((total,item)=>total+item.price,0)
    }

    


    useEffect(()=>{
       if(totalPrice>0){
        axiosSecure.post('/create-payment-intent',{
            price:totalPrice
        })
        .then(res=>{
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
       }
    },[axiosSecure,totalPrice])
   
    const handleSubmit = async (event) => {
        event.preventDefault();

       if(!stripe ||!elements){
        return
       }
       
       const card = elements.getElement(CardElement);

       if(card==null){
        return
       }
    

       const  {error,paymentMethod} = await stripe.createPaymentMethod({
             type : 'card',
             card
       })

       if(error) {
        console.log(error);
        setError(error.message);
       }
       else{
        console.log(paymentMethod)
        setError('')
       }
        // confirm payment
        const {paymentIntent,error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                email: user?.email || 'anonymous@anonymous.',
                name: user?.displayName || 'anonymous',
               
                  
                },
              },
            },
          );

          if(confirmError) {
            console.log('confrimation error',confirmError)
          }else{
            console.log('payment Intent',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                setTransactionId(paymentIntent.id)

                const payment = {
                    email: user?.email,
                    membership: member?.memberShipType? member.memberShipType: 'bronze',
                    price : totalPrice,
                    transactionId: paymentIntent.id,
                    data: new Date(),
                    cartIds: cart.map(item=>item._id),
                    menuItemIds: cart.map(item=>item.menuId)
                }

                const res = await axiosSecure.post('/payments',payment);
               console.log(res.data.paymentResult.insertedId)
                if(res.data?.paymentResult?.insertedId  ){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successfull",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
                refetch();
                console.log("payment",res.data);
            }
          }
      
    }

    return (
        <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-sm " type="submit" disabled={!stripe ||!clientSecret}>
        Pay
      </button>
      <p className="text-red-500">{errormsg}</p>
      {
        transactionId && <p>Your Transaction ID : {transactionId}</p>
      }
    </form> 
    );
};

export default CheckoutForm;