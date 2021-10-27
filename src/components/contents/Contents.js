import React, { useEffect } from 'react';

import ContentsHeader from './ContentsHeader';
import ContentsMain from './ContentsMain';
import ContentsFooter from './ContentsFooter';
import Footer from './Footer';

import './../../styles/layouts/contents.css';

export default function Contents() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contents">
      <ContentsHeader></ContentsHeader>
      <ContentsMain></ContentsMain>
      <ContentsFooter></ContentsFooter>
      <Footer></Footer>
    </div>
  );
}
