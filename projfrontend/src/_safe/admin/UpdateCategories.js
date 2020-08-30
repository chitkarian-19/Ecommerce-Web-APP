
import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory, UpdateCategory } from "./helper/adminapicall";

const UpdateCategories = ({match})=>{
   
  return (
    <Base
      title="Update Category here"
      description="Updation Form"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          <p className="text-white">Catgory Updation </p>
        </div>
      </div>
    </Base>
  );
}

export default UpdateCategories
