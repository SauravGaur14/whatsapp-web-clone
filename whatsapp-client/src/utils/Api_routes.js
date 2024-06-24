export const HOST = "http://localhost:3000";

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGE_ROUTE = `${HOST}/api/message`;

export const LOGIN_USER_ROUTE = `${AUTH_ROUTE}/login-user`;
export const ONBOARDUSER_ROUTE = `${AUTH_ROUTE}/onboard-user`;
export const GET_ALL_CONTACTS = `${AUTH_ROUTE}/get-contacts`;

export const SEND_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/send-message`;
export const GET_MESSAGES_ROUTE = `${MESSAGE_ROUTE}/get-messages`;
export const SEND_IMAGE_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/send-image-message`;
export const SEND_AUDIO_MESSAGE_ROUTE = `${MESSAGE_ROUTE}/send-audio-message`;
export const GET_CONTACTS_WITH_MESSAGES = `${MESSAGE_ROUTE}/get-contacts-with-messages`;
