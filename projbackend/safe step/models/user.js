var mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv = require('uuidv1');


var userSchema = new mongoose.Schema({
    name:{
       type:String,
       reuired: true,
       maxlength: 32,
       trim:true
    },
    last_name: {
        type:String,
        maxlength:32,
        trim:true
    },
    email: {
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        required:true
        
    },
    salt:String,
    role:{
      type:Number,
      default:0  
    },
    purchases:{
        type:Array,
        default:[]
    }
  },
  {timestamps:true}
  );


  userSchema.virtual("password")
     .set(function(password){
          this._password = password
          this.salt = uuidv();
          this.encry_password = this.securePassword(password);
     })
     .get(function(){
         return  this._password
     })

  userSchema.methods ={

    authenticate: function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password
    },

      securePassword: function(plainpassword){
          if(!plainpassword) return "";
           try{
                return crypto.createHmac('sha256', this.salt)
                .update(plainpasword)
                .digest('hex');
           }
           catch(err){
               return "";
           }
      }
  }


  module.exports = mongoose.model("User",userSchema);