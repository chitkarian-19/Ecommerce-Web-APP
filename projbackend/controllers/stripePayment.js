const stripe = require("Stripe")("sk_test_51HGUrVL2rvPYAXSQCNTi9qxIK1XlUY8Jeg15II6icrhmRsiS7ScibVNvghhxBQVtVbdFMDcP5XSzzRKBQzCjUx3100zCvvtHe7");
const uuid= require("uuid/v4");

exports.makePayment = (req,res)=>{
   //
   const {products, token}=req.body;
   console.log(products,"Array");

   let amount=0;
   products.map(p=>{
       amount+=p.price;
   })
   
   const idempotencyKey = uuid()

   return stripe.customers.create({
       email: token.email,
       source:token.id
   }).then(customer=>{
       stripe.charges.create({
         amount:amount*100,
         currency:'usd',
         customer:customer.id,
         description:"a test account",
         receipt_email:token.email,
         shipping:{
             name:token.card.name,
             address:{
                 line1:token.card.address_line1,
                 line2:token.card.address_line2,
                 city: token.card.address_city,
                 country:token.card.address,
                 postal_code:token.card.address_zip
             }
         }
         

       },{idempotencyKey})
       .then(result=>{
           return res.status(200).json({
              message:"Charged SuccessFully"
           });
       })
       .catch(err=>{
           console.log("Error",err);
       })
   })
};