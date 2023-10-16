import { Location } from '../../interface/FlowType';

export interface Section {
  style: 'collection' | 'normal' | 'with-background' | 'list-service' | 'image-gallery' | 'image-gallery-caption';
  title: string;
  isDisplay: boolean;
  content: Content[];
}

export type ContactListType = {
  label: string;
  value: string;
};

export type ImageContent = {
  file: {
    url: string;
  };
  caption: string;
  alt?: string;
  style?: string;
};

export type ButtonContent = {
  text: string;
  url?: string; // Navigate location
};

export type ListContent = {
  style: 'unordered' | 'ordered' | 'asterisk';
  items: string[];
};

export type ParagraphContent = {
  text: string;
};

export type HeaderContent = {
  text: string;
  withBacground?: boolean;
  level: 1 | 2 | 3 | 4 | 5;
};

export type Content = {
  type: 'image' | 'list' | 'paragraph' | 'header' | 'button' | 'contact-list';
  data: ImageContent | ListContent | ParagraphContent | HeaderContent | JSX.Element | ContactListType;
};

export interface PostCommonProps {
  title: string;
  isDisplay?: boolean;
  id?: string;
  imgClassName?: string;
  createDate: string;
  content: Content[];
  button?: Location[];
  style?: 'with-background';
  isUpdate?: boolean;
}
