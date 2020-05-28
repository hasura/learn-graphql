import { initAuth0 } from '@auth0/nextjs-auth0'
import config from './auth0-config'

export default initAuth0({
  audience: config.AUTH0_AUDIENCE,
  clientId: config.AUTH0_CLIENT_ID,
  clientSecret: config.AUTH0_CLIENT_SECRET,
  scope: config.AUTH0_SCOPE,
  domain: config.AUTH0_DOMAIN,
  redirectUri: config.REDIRECT_URI,
  postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: config.SESSION_COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 8,
    storeAccessToken: true,
    storeRefreshToken: true,
    storeIdToken: true,
  },
})