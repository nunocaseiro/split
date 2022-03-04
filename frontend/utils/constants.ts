/* eslint-disable prefer-destructuring */
export const UNDEFINED = "UNDEFINED";
export const ERROR_LOADING_DATA = "Error loading data";

export const JWT_EXPIRATION_TIME = Number(process.env.NEXT_PUBLIC_EXPIRATION_TIME);

export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const BACKEND_URL = process.env.BACKEND_URL;
export const SECRET = process.env.SECRET;
export const NEXT_PUBLIC_NEXTAUTH_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL;

export const CLIENTID = process.env.CLIENTID;
export const CLIENTSECRET = process.env.CLIENTSECRET;
export const TENANTID = process.env.TENANTID;
export const NEXT_PUBLIC_ENABLE_AZURE = process.env.NEXT_PUBLIC_ENABLE_AZURE === "true";

export const CURRENT_USER = "currentUser";
export const REFRESH_TOKEN_ERROR = "REFRESH_TOKEN_ERROR";

export const DASHBOARD_PATH = "/dashboard";
export const AUTH_PATH = "/auth";
export const ERROR_500_PAGE = "/500";

export const UPDATE_CARD_POSITION = "UPDATE_CARD_POSITION";
export const ADD_CARD_INTO_CARD_GROUP = "ADD_CARD_INTO_CARD_GROUP";
export const REMOVE_CARD_FROM_CARD_GROUP = "REMOVE_CARD_FROM_CARD_GROUP";
export const ADD_CARD_IN_COLUMN = "ADD_CARD_IN_COLUMN";
