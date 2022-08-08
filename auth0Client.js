import { Auth0Client } from '@auth0/auth0-spa-js';
export default new Auth0Client({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin,
    audience: import.meta.env.VITE_AUDIENCE
});