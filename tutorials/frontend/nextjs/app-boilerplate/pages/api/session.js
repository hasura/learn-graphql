import fetch from 'isomorphic-unfetch';

import auth0 from '../../lib/auth0';

export default async function session(req, res) {
  try {
    const { accessToken } = await auth0.getAccessToken(req, res, {
    });
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message
    });
  }
}