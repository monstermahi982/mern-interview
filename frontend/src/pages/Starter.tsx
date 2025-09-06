import React from "react";
import Layout from "../layout/layout";

const Starter = () => {
  return (
    <Layout>
      <h3>Let's get you started!</h3>
      <h3>Choose content goal:</h3>
      <div>
        <label>Select Content Type</label>
        <input type="radio" name="Blog" id="" />
        <input type="radio" name="Instagram catpion" id="" />
        <input type="radio" name="Email" id="" />
        <input type="radio" name="Product Description" id="" />
      </div>
      <div>
        <h4>Input Prompt Details</h4>
        <div>
          <label htmlFor="Topic"></label>
        <input type="text" placeholder="Enter Topic name" />
        </div>
        <div>
          <label htmlFor="Keywords"></label>
          <input type="text" />
        </div>
      </div>
      <div>
        <label>Pick Tone</label>
        <select name="" id="">
          <option value="friendly"></option>
          <option value="proffersional"></option>
          <option value="why"></option>
        </select>
      </div>
       <div>
        <label>Choose Langauge</label>
        <select name="" id="">
          <option value="English"></option>
          <option value="Hindi"></option>
          <option value="Marathi"></option>
        </select>
      </div>
    </Layout>
  );
};

export default Starter;
