import { useState } from 'react';

export default function useFocus(initialValue, check) {
  const [focus, setFocus] = useState(initialValue);
  const [test, setTest] = useState(false);

  const handleFocus = (e) => {
    if (e.target.value.length === 0) {
      setFocus(true);
    }
    check();
  };

  return { focus, setFocus, handleFocus, test, setTest, check };
}
