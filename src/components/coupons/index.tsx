import React from 'react';

import './style.css';
import { HeaderContent } from '../blog-post/type';

interface CouponItem {
  title: string;
  description: string;
  saleAmount: string;
}

export interface CouponProps {
  title: string;
  isDisplay?: boolean;
  id?: string;
  content: {
    heading: HeaderContent;
    coupons: CouponItem[];
  };
}

const Coupons = ({ title, content, id }: CouponProps): JSX.Element => {
  return (
    <React.Fragment>
      {title && (
        <h2 className="heading --with-background" id={id}>
          <span>{title}</span>
        </h2>
      )}
      <div className="coupon-wrapper">
        {content.heading.text && <h4>{content.heading.text}</h4>}
        <div className="grid grid-cols-2">
          {content.coupons.map((item, index) => (
            <React.Fragment key={index}>
              <div>
                <h5>{item.title}</h5>
                <p className="description" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                <p className="sale" dangerouslySetInnerHTML={{ __html: item.saleAmount }}></p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Coupons;
