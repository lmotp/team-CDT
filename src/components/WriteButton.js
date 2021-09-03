import React, { useState } from 'react';

export default function WriteButton({ onClick }) {
  return (
    <button type="button" className="write-button" onClick={onClick}>
      <i class="fas fa-pen write-icon"></i>
      <h3>글쓰기</h3>
    </button>
  );
}
