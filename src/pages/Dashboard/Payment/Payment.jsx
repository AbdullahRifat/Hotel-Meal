import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

import img1 from "../../../assets/home/gold.jpg"
import img2 from "../../../assets/home/silver.jpg"
import img3 from "../../../assets/home/plutinum.jpg"




const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => { 
    const {type} = useParams();
    let member = {}
    if(useParams!=undefined){
        const memberShips = [
            {
                memberShipType: 'gold',
                image: img1,
                price: 150
            },
            {
                memberShipType: 'silver',
                image: img2,
                price: 250
            },
            {
                memberShipType: 'plutinum',
                image:img3,
                price: 350
            }
        ]
    
        member = memberShips.find(memberShip=>memberShip.memberShipType===type.toLowerCase())

    }else{
        member= null
    }
    
    
    return (
        <div>
            <SectionTitle heading="Payment" subHeading={member.memberShipType}></SectionTitle>
            <div>
                <div>{}</div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm member={member}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;