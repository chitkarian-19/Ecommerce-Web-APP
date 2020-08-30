import React from "react"
export const addItemToCart =(item,next)=>{
   let cart=[]
   if(typeof window !== undefined){
       if(localStorage.getItem("cart")){
           cart=JSON.parse(localStorage.getItem("cart"))
       }
       cart.push({
           ...item,
           count:1
       })
       localStorage.setItem("cart",JSON.stringify(cart))
       next();
   }
}

export const loadCart = ()=>{
    
    if(typeof window !== undefined){
        let cart=[];
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
            return cart;
        }
    }
}

export const removeItemFromCart = (productId)=>{
    let cart=[];
    if(typeof window !==undefined){
        if(localStorage.getItem("cart")){
            cart=JSON.parse(localStorage.getItem("cart"))
        }
        console.log(cart.length);
        cart.map((product,i)=>{
           if(product._id===productId){
               cart.splice(i,1);
               console.log("removed successfully");
           }
           
        }
        );
        console.log(cart.length);
        return JSON.parse(localStorage.getItem("cart"))
            
    }
}