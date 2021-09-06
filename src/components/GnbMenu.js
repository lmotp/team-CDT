import React, { useState, useCallback, useRef } from 'react';

export default function GnbMenu() {
  const handleChevron = (e) => {
    e.preventDefault();
    if (e.target.className === 'gnb-menu-item-chevron-down') {
      e.target.className = 'gnb-menu-item-chevron-up';
    } else if (e.target.className === 'gnb-menu-item-chevron-up') {
      e.target.className = 'gnb-menu-item-chevron-down';
    }
  };
  const noticeListItems = ['1', '2', '3', '4'];
  const noticeList = noticeListItems.map((item, index) => {
    return (
      <li className="list-item" key={index}>
        <a href="/">{item}</a>
      </li>
    );
  });
  const communityListItems = ['5', '6', '7', '8'];
  const communityList = communityListItems.map((item, index) => {
    return (
      <li className="list-item" key={index}>
        <a href="/">{item}</a>
      </li>
    );
  });
  const recommendListItems = ['a', 'b', 'c', 'd'];
  const recommendList = recommendListItems.map((item, index) => {
    return (
      <li className="list-item" key={index}>
        <a href="/">{item}</a>
      </li>
    );
  });
  const videoListItems = ['e', 'f', 'g', 'h'];
  const videoList = videoListItems.map((item, index) => {
    return (
      <li className="list-item" key={index}>
        <a href="/">{item}</a>
      </li>
    );
  });
  const managementListItems = ['z', 'x', 'c', 'v'];
  const managementList = managementListItems.map((item, index) => {
    return (
      <li className="list-item" key={index}>
        <a href="/">{item}</a>
      </li>
    );
  });
  const menuList = [noticeList, communityList, recommendList, videoList, managementList];
  const menus = ['Notice', 'Community', 'Recommend', 'Video', 'Management'];
  const menu = menus.map((item, index) => {
    return (
      <li key={index} className="gnb-menu-item-chevron-down" onClick={handleChevron}>
        <a href="/" className="gnb-menu-item">
          <i className={`fas fa-flag ${item}-icon`}></i>
          <span>{item}</span>
          <i className="fas fa-chevron-down chevron"></i>
        </a>
        <ul className="menu-list">{menuList[index]}</ul>
      </li>
    );
  });

  return (
    <>
      <nav className="gnb-menu">
        <ul className="gnb-menu-list">{menu}</ul>
      </nav>
    </>
  );
}
