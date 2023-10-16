import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import { Location } from '../../interface/FlowType';

export interface ImageItem {
  src: string;
  alt: string;
  caption: string;
  subTitle?: string;
}

export interface ImageGalleryProps {
  id?: string;
  title: string;
  style?: string;
  isLogo?: boolean;
  button?: Location[];
  content: ImageItem[];
}

const ImageGallery = ({ title, content, id, isLogo = false, style, button }: ImageGalleryProps): JSX.Element => {
  const containerClass = useMemo(() => {
    if (isLogo) {
      return 'image-gallery logo';
    }

    return `image-gallery ${style}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {title && (
        <h2 className="heading --with-background" id={id}>
          <span>{title}</span>
        </h2>
      )}
      <div className={containerClass}>
        {content.map((img, idx) => (
          <figure key={idx} className={!isLogo ? 'max-h-[500px]' : ''}>
            <img
              className={!isLogo ? 'img-map max-h-[500px] h-[230px] object-cover' : ''}
              src={img.src}
              alt={img.alt}
            />
            {img.subTitle && <h4>{img.subTitle}</h4>}
            {img.caption && <figcaption>{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
      {button && button.length && (
        <div className="w-full mt-[16px] flex gap-[16px] justify-center items-center flex-wrap">
          {button.map((btn, index) => (
            <React.Fragment key={index}>
              <Link className="btn --red w-[100%] md:w-fit !mt-0 !px-[36px] flex-grow-0" to={btn.location}>
                {btn.innerText}
              </Link>
            </React.Fragment>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default ImageGallery;
