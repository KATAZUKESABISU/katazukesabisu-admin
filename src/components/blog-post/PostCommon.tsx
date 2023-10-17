import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { HeaderContent, ImageContent, ListContent, ParagraphContent, PostCommonProps } from './type';
import { fDateTime } from '../../utils/formatTime';

import './style.css';
import InputComponent from '../custom-input/InputComponent';
import { useFormContext } from 'react-hook-form';

const PostCommon = ({
  title,
  createDate,
  content,
  id,
  imgClassName,
  button,
  style,
  isDisplay = true,
  isUpdate = false,
}: PostCommonProps): JSX.Element => {
  const [image, setImage] = useState<ImageContent>();
  const [isImgOnly, setIsImgOnly] = useState(false);
  const { watch } = useFormContext();

  const renderListItem = (listData: ListContent) => {
    const { style, items } = listData;
    let className = '';
    switch (style) {
      case 'ordered':
        className = 'list-decimal p-[5px]';
        break;
      case 'asterisk':
        className = 'list-asterisk p-[5px]';
        break;
      case 'unordered':
      default:
        className = 'list-disc p-[5px]';
    }

    return (
      <ul className="pl-[2em]">
        {items.map((item, index) =>
          !isUpdate ? (
            <li className={className} key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ) : (
            <InputComponent
              key={item + index}
              id={`${id}-content-list-${index}`}
              name={`${id}-content-list-${index}`}
              defaultValue={item}
            />
          )
        )}
      </ul>
    );
  };

  const renderHeaderItem = (data: HeaderContent): JSX.Element => {
    let className = '';

    if (data.withBacground) {
      className += 'with-background';
    }

    if (title) {
      className += ' !pt-0';
    }

    switch (data.level) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      default:
        return !isUpdate ? (
          <h4 className={className}>{watch(`${id}-content-header`) || data.text}</h4>
        ) : (
          <InputComponent id={`${id}-content-header`} name={`${id}-content-header`} defaultValue={data.text} />
        );
    }
  };

  const containerClass = useMemo(() => {
    const image = content?.find((item) => item.type === 'image');

    if (!image) {
      return `post-container ${style}`;
    }

    if (content?.every((item) => item.type === 'image')) {
      setIsImgOnly(true);
      setImage(image.data as ImageContent);
      return;
    }

    setImage(image.data as ImageContent);
    return `post-container --with-img ${style}`;
  }, [content, style]);

  if (isDisplay === false) {
    return <></>;
  }

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
        {!isImgOnly && (
          <div className="w-full">
            {content?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.type === 'list' && renderListItem(item.data as ListContent)}
                  {item.type === 'paragraph' &&
                    (!isUpdate ? (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: watch(`${id}-content-paragraph-${index}`) || (item.data as ParagraphContent).text,
                        }}
                      />
                    ) : (
                      <InputComponent
                        id={`${id}-content-paragraph-${index}`}
                        name={`${id}-content-paragraph-${index}`}
                        defaultValue={(item.data as ParagraphContent).text}
                      />
                    ))}
                  {item.type === 'header' && renderHeaderItem(item.data as HeaderContent)}
                  {item.type === 'button' && (item.data as JSX.Element)}
                </React.Fragment>
              );
            })}
            {button &&
              button.map((btn, index) => (
                <React.Fragment key={index}>
                  {!isUpdate ? (
                    <Link className="btn --red w-[100%] md:w-[300px] mx-auto lg:m-0 !mt-[16px]" to={btn.location}>
                      {watch(`${id}-content-button-${index}`) || btn.innerText}
                    </Link>
                  ) : (
                    <InputComponent
                      id={`${id}-content-button-${index}`}
                      name={`${id}-content-button-${index}`}
                      defaultValue={btn.innerText}
                    />
                  )}
                </React.Fragment>
              ))}
          </div>
        )}

        {image && (
          <div className={imgClassName}>
            <img src={image.file.url} alt={image.alt || ''} />
          </div>
        )}
      </div>
      {createDate && (
        <p className="text-right mt-[16px] lg:mt-[40px]">{fDateTime(new Date(createDate), 'yyyy年MM月dd日 HH:mm')}</p>
      )}
    </React.Fragment>
  );
};

export default PostCommon;
