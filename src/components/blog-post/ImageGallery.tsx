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
  isUpdate?: boolean;
  width?: number;
  isDisplay?: boolean;
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
            <span>{watch(`homePage.${id}.title`) || title}</span>
          ) : (
            <InputComponent id={`homePage.${id}.title`} name={`homePage.${id}.title`} defaultValue={title} />
          )}
        </h2>
      )}
      <div className={containerClass}>
        {content.map((img, index) => (
          <figure key={index} className={!isLogo ? 'max-h-[500px]' : ''}>
            <img
              className={!isLogo ? 'img-map max-h-[500px] h-[230px] object-cover' : ''}
              src={img.src}
              alt={img.alt}
            />
            {img.subTitle &&
              (!isUpdate ? (
                <h4>{watch(`homePage.${id}.content.${index}.subTitle`) || img.subTitle}</h4>
              ) : (
                <InputComponent
                  id={`homePage.${id}.content.${index}.subTitle`}
                  name={`homePage.${id}.content.${index}.subTitle`}
                  defaultValue={img.subTitle}
                  width={width}
                />
              ))}
            {img.caption &&
              (!isUpdate ? (
                <figcaption>{watch(`homePage.${id}.content.${index}.caption`) || img.caption}</figcaption>
              ) : (
                <InputComponent
                  id={`homePage.${id}.content.${index}.caption`}
                  name={`homePage.${id}.content.${index}.caption`}
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
                  {watch(`homePage.${id}.button.${index}.innerText`) || btn.innerText}
                </Link>
              ) : (
                <InputComponent
                  id={`homePage.${id}.button.${index}.innerText`}
                  name={`homePage.${id}.button.${index}.innerText`}
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
