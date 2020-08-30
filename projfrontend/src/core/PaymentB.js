import React,{useState,useEffect} from "react"
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { getmeToken, processPayment } from "./helper/paymentHelperB";
import {createOrder} from "./helper/orderHelper";

import {Link} from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";
const PaymentB=({products,setReload= f=>f, reload=undefined})=>{

    const [info,setInfo]=useState({
        loading:false,
        success:false,
        clientToken: null,
        error:"",
        instance:{}
    });
    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token;
    const onPurchase = ()=>{
        setInfo({loading:true})
        let nonce;
        let getNonce = info.instance
           .requestPaymentMethod()
           .then(data=>{
               nonce = data.nonce
               const paymentData = {
                   paymentMethodNonce: nonce,
                   amount : getAmount()
               };
               processPayment(userId,token,paymentData)
               .then(response=>{
                   setInfo({...info,success:true,loading:false});
                   console.log("Payment Succes")
                   //TODO:
                const orderData = {
                    products:products,
                    transaction_id:response.transaction.id,
                    amount:response.transaction.amount
                }

                   cartEmpty(()=>{
                       console.log("Did we got a crash?");
                   })
                   setReload(!reload);
               })
               .catch(err=>{
                   console.log("Payment Error",err);
                   setInfo({
                       loading:false,
                       success:false
                       
                   })

               })
           })
           

    }
    const getToken =(userId,token)=>{
      
      getmeToken(userId,token).then(info=>{
          if(!info){
              setInfo({
                  ...info,
                  error:true
              })
          }
          else{
               
              setInfo({clientToken:info.clientToken});
              console.log("Information...",info);
          }
      })
    }
    const showbtndropin = ()=>{
        
        return(
          <div>
              {info.clientToken !== null && products.length>0?
              (
               <div>
                 <DropIn
                   options={{ authorization:info.clientToken}}
                   onInstance = {instance=>(info.instance = instance)}
                 />
                 <button className="btn btn-block btn-info" onClick={onPurchase}>Buy</button>
                </div>
              ):(
                <h3>
                    Please login or add something to cart
                </h3>
              )
              }
          </div>

        );
    }
    useEffect(()=>{
      getToken(userId,token)
    }, []);
    
    

    const getAmount=()=>{
        let amount=0;
        products.map(p=>{
            amount+=p.price;
        })
        return amount;
    }

    return (
        <div>
         <h3>Your bill is {getAmount()}</h3>
         {showbtndropin()}
         
        </div>
    );
}

export default PaymentB;