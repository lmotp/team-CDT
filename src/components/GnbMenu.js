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

  const listItems = [
    { value: 'notice list items', items: ['1', '2', '3', '4'] },
    { value: 'community list item', items: ['5', '6', '7', '8'] },
    { value: 'recommend list item', items: ['a', 'b', 'c', 'd'] },
    { value: 'video list item', items: ['e', 'f', 'g', 'h'] },
    { value: 'management list item', items: ['i', 'j', 'k', 'l'] },
  ];
  const menuList = listItems.map((item, index) => {
    return (
      <>
        {item.items.map((smallItem) => {
          return (
            <li className="list-item" key={index}>
              <a href="/" aria-label={item.value}>
                {smallItem}
              </a>
            </li>
          );
        })}
      </>
    );
  });
  const menuTitle = ['Notice', 'Community', 'Recommend', 'Video', 'Management'];
  const menu = menuTitle.map((item, index) => {
    return (
      <li key={index} className="gnb-menu-item-chevron-down" onClick={handleChevron}>
        <a href="/" className="gnb-menu-item" aria-label="목록리스트">
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
        <h2 className="visually-hidden">메뉴</h2>
        <ul className="gnb-menu-list">{menu}</ul>
      </nav>
    </>
  );
}
