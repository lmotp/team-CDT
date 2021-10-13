import React from 'react';

import './../../styles/layouts/info.css';

export default function ArticleInfo(props) {
  console.log(props.name);
  return (
    <div className="info">
      <span className="title">
        <i class="fas fa-volume-up speaker"></i>
        {props.name}
      </span>
      <span className="date">{props.date}</span>
      <span className="counter-eye">
        <i class="far fa-eye eye"></i>
        {props.eye}
      </span>
      <span className="counter-like">
        <i class="far fa-heart heart"></i>
        {props.heart}
      </span>
    </div>
  );
}
