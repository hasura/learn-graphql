import { createCookieSessionStorage } from "remix";

// Read more about cookies at MDN https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
// With Firebase hosting your cookie must be named __session https://firebase.google.com/docs/hosting/manage-cache#using_cookies
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      secrets: [process.env.COOKIE_SECRET!],
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      path: "/",
      // Set session expiration to 5 days
      maxAge: 60 * 60 * 24 * 5,
    },
  });

export { getSession, commitSession, destroySession };
