/* eslint-disable no-unused-vars */
import { JSX, ReactNode } from 'react';

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}

export type IconType = (_props: IconBaseProps) => JSX.Element;

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  image?: string;
  balance?: string;
}

export interface ILayoutProps {
  children?: ReactNode;
  showAdd?: boolean;
  title?: string;
}

export interface IMovie {
  poster?: string;
  title: string;
  id?: string;
  publishingYear?: string;
}

export interface ICustomError {
  data: {
    message: string;
  },
  status: number;
}
