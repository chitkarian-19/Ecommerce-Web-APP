var braintree = require("braintree");

var gateway = braintree.connect({
    environment:braintree.Environment.Sandbox,
    merchantId: "smf9wjpy2fct9n79",
    publicKey:"6frjfzwd4zh4t9pt",
    privateKey:"4905a74cf9b4024cc87d25e168ee215e"
});


exports.getToken = (req,res)=>{
    
    gateway.clientToken.generate({
        
    }, function(err,response){
         if(err){
             res.status(500).send(err)
         }
         else{
             res.send(response)
         }
    });
}
exports.processPayment = (req,res)=>{
    
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount:amountFromTheClient,
        paymentMethodNonce:nonceFromTheClient,
        
        option:{
            submitForSettlement:true
        }
     },function(err,result){
          if(err){
              console.log(err);
              res.status(500).json({
                  error:err
              })
          }
          else{
              res.json(result);
          }
    });
};