import React, {useState,useEffect} from "react"
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({products, 
    setReload =f=>f,
    reload=undefined
    
})=>{
    
     const [data,setData] = useState({
         loading:false,
         success:false,
         error:"",
         address:""
     });
 
      const token = isAuthenticated()&&  isAuthenticated().token;
      const userId =isAuthenticated()&&  isAuthenticated().user._id;

      const getFinalPrice = ()=>{
          let amount =0;
          products.map(p=>{
              
              amount = amount + p.price;
          })
          return amount;
      }
      const makePayment=(token)=>{
        //
        const body ={
            token,
            products
        }
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        }).then(response=>{
            const {status} = response;
            


        }).catch(error=>console.log("Payment frontend error",error));
      };
     const showStripeButton = ()=>{
          return isAuthenticated()?(
             <StripeCheckoutButton
              stripeKey="pk_test_51HGUrVL2rvPYAXSQJvyawbvoMQvJHF5lVytO0Sx7z7vIsmmzBREsPt2xMLAMr9MB35N7DP3rPkcuE6rtshaJLGhJ00qfBLX9V3"
              token={makePayment}
              amount={getFinalPrice()*100}
              name="Buy Tshirts"
              billingAddress
              shippingAddress
             >
            <button className="btn btn-success">Pay with Stripe</button> 
            </StripeCheckoutButton>
         ):(
             <Link to="/signin">
                <button className="btn btn-warning">Signin</button> 
                 </Link>
         );
     }


    return(
       <div>
         <h3 className="text-white">Stripe Checkout Loaded {getFinalPrice()}</h3>
         {showStripeButton()}
        </div>
    );
}

export default StripeCheckout;