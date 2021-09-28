import { useState } from 'react';

export default function useInput(initialValue) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  return { inputValue, setInputValue, handleInputValue };
}
