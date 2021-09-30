import { useState } from 'react';

export default function useFocus(initialValue) {
  const [focus, setFocus] = useState(initialValue);

  const handleFocus = (e) => {
    if (e.target.value.length === 0) {
      setFocus(true);
    }
  };

  return { focus, setFocus, handleFocus };
}
