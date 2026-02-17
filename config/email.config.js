import dotenv from "dotenv";

dotenv.config();

export const emailConfig = {
  sendgridApiKey: process.env.SENDGRID_API_KEY,

  from: {
    name: process.env.FROM_NAME,
    address: process.env.FROM_EMAIL,
  },

  contactEmail: process.env.EMAIL_CONTACT_INFO,
  boostEmail: process.env.EMAIL_REQUEST_INFO,

  settings: {
    maxRetries: 3,
    retryDelay: 5000,
  },
};
