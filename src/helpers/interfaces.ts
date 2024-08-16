import { Request } from "express";

export interface IReqUser extends Request {
  user: {
    role: string;
    id: string;
  };
}

export interface IPaginationQuery {
  page: number;
  limit: number;
  search?: string;
  sort?: string;
  startDate?: string;
  endDate?: string;
}

export interface IEventPaginationQuery extends IPaginationQuery {
  name: string;
  city: number;
  isPublished: string;
  isFeatured: string;
  categories: string;
  isOnline?: boolean;
  isTicketExist?: boolean;
}

export interface IOrderPaginationQuery extends IPaginationQuery {
  status: string;
  orderId?: string;
}

export interface IBannerPaginationQuery extends IPaginationQuery {
  isShow?: boolean;
}

export interface ITicketPaginationQuery extends IPaginationQuery {
  events: string;
}

export type TVoucher = {
  qrCodeString: string;
  isPrinted?: boolean;
};

export interface IOrderItem {
  ticket: string;
  quantity: number;
  price: number;
  name: string;
  orderId?: string;
  vouchers?: TVoucher[];
}
