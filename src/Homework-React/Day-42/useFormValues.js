import { useState } from "react";

function useFormValues(init) {
  const [count, setCount] = useState(init);
  function increase() {
    setCount(count + 1);
  }
  return [count, increase];
}
export default useFormValues;
