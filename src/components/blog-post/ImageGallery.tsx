import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import { Location } from '../../interface/FlowType';
import InputComponent from '../custom-input/InputComponent';
import { useFormContext } from 'react-hook-form';

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
  isUpdate: boolean;
  width: number;
}

const ImageGallery = ({
  title,
  content,
  id,
  isLogo = false,
  style,
  button,
  isUpdate = false,
  width,
}: ImageGalleryProps): JSX.Element => {
  const { watch } = useFormContext();

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
          {!isUpdate ? (
            <span>{watch(`${id}-content-title`) || title}</span>
          ) : (
            <InputComponent id={`${id}-content-title`} name={`${id}-content-title`} defaultValue={title} />
          )}
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
            {img.subTitle &&
              (!isUpdate ? (
                <h4>{watch(`${id}-content-sub-title-${idx}`) || img.subTitle}</h4>
              ) : (
                <InputComponent
                  id={`${id}-content-sub-title-${idx}`}
                  name={`${id}-content-sub-title-${idx}`}
                  defaultValue={img.subTitle}
                  width={width}
                />
              ))}
            {img.caption &&
              (!isUpdate ? (
                <figcaption>{watch(`${id}-content-caption-${idx}`) || img.caption}</figcaption>
              ) : (
                <InputComponent
                  id={`${id}-content-caption-${idx}`}
                  name={`${id}-content-caption-${idx}`}
                  defaultValue={img.caption}
                  width={width}
                />
              ))}
          </figure>
        ))}
      </div>
      {button && button.length && (
        <div className="w-full mt-[16px] flex gap-[16px] justify-center items-center flex-wrap">
          {button.map((btn, index) => (
            <React.Fragment key={index}>
              {!isUpdate ? (
                <Link className="btn --red w-[100%] md:w-fit !mt-0 !px-[36px] flex-grow-0" to={btn.location}>
                  {watch(`${id}-content-button-${index}`) || btn.innerText}
                </Link>
              ) : (
                <InputComponent
                  id={`${id}-content-button-${index}`}
                  name={`${id}-content-button-${index}`}
                  defaultValue={btn.innerText}
                  width={width}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </React.Fragment>
  );
};

export default ImageGallery;
