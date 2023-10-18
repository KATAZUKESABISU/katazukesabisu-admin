import React from 'react';

import './style.css';

export interface ServiceItem {
  image: string;
  title: string;
  content: string;
}

export interface ImageGalleryProps {
  title: string;
  isDisplay?: boolean;
  content: ServiceItem[];
}

const ListService = ({ title, content }: ImageGalleryProps): JSX.Element => {
  return (
    <React.Fragment>
      {title && (
        <h2 className="heading --with-background">
          <span>{title}</span>
        </h2>
      )}
      <section className="list-service">
        {content.map((item, idx) => (
          <div className="item" key={idx}>
            <img src={item.image} alt={item.title} />
            <div className="w-full">
              <h4 className="with-background !pt-0">{item.title}</h4>
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </section>
    </React.Fragment>
  );
};

export default ListService;
