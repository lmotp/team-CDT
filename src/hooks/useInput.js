import { useState } from 'react';

export default function useInput(initialValue, setFocus) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
    if (inputValue !== 0) {
      setFocus(false);
    }
  };

  return { inputValue, setInputValue, handleInputValue };
}
