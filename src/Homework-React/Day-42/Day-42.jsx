import React, { useState, useEffect } from "react";
import useFormValues from "./useFormValues";

const Form1 = () => {
  const [count, increase] = useFormValues(8);
  return (
    <>
      <button onClick={increase}>Count is {count}</button>
    </>
  );
};

export default Form1;
