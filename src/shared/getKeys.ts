import { Request } from "express";

export const getBodyKeys = async (event: Request) => {
  if (event.body) return event.body;
  return {};
};
export const getHeaderKeys = async (event: Request) => {
  if (event.headers) return event.headers;
  return {};
};
export const getPathKeys = async (event: Request) => {
  if (event.params) return event.params;
  return {};
};
