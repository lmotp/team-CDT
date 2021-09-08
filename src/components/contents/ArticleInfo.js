import React from 'react';

import './../../styles/layouts/info.css';

export default function ArticleInfo(props) {
  return (
    <ul className="info">
      <li className="title">
        <i class="fas fa-volume-up speaker"></i>
        SCDT
      </li>
      <li className="date">{props.date}</li>
      <li className="counter-eye">
        <i class="far fa-eye eye"></i>
        {props.eye}
      </li>
      <li className="counter-like">
        <i class="far fa-heart heart"></i>
        {props.like}
      </li>
    </ul>
  );
}
