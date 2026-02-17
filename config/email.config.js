import dotenv from "dotenv";

dotenv.config();

export const emailConfig = {
  sendgridApiKey: process.env.SENDGRID_API_KEY,

  from: {
    name: process.env.FROM_NAME,
    contact: process.env.FROM_CONTACT_EMAIL,
    boost: process.env.FROM_REQUEST_EMAIL,
    default: process.env.FROM_EMAIL,
  },

  settings: {
    maxRetries: 3,
    retryDelay: 5000,
  },
};
