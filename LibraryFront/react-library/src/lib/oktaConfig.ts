export const oktaConfig = {
    clientId: '0oa7yu7ujfUbDb59Y5d7',
    issuer: 'https://dev-95608205.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
}
