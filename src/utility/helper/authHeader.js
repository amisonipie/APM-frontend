import { env } from "utility/config";

export function authHeader(customToken) {
  // return authorization header with jwt token
  const app_version = env.APP_VERSION;
  const token = !customToken ? localStorage.getItem("token") : customToken;
  if (token) {
    const allowedOrigins = "*";
    const allow_headers = "Referer,Accept,Origin,User-Agent,Content-Type,Authorization";
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json, multipart/form-data",
      "Access-Control-Allow-Origin": allowedOrigins,
      "Access-Control-Allow-Methods": "PUT,GET,POST,DELETE,PATCH",
      "Access-Control-Allow-Headers": allow_headers,
      "WWW-Authenticate": "Basic",
      "Access-Control-Allow-Credentials": true,
      reactversion: app_version,
    };
  }
}
