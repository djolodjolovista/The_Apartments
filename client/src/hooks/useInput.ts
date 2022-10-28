import { useState } from "react";

const useInput = <T>(initialValue: T) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: any) => {
    setValue(e.currentTarget.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

export default useInput;
