import sgMail from "@sendgrid/mail";
import { emailConfig } from "../config/email.config";

sgMail.setApiKey(emailConfig.sendgridApiKey);

class EmailService {
  async send(to, subject, html, retries = 0) {
    const maxRetries = emailConfig.settings.maxRetries;
    const retryDelayMs = emailConfig.settings.retryDelay;

    if (!emailConfig.sendgridApiKey) {
      console.error("SendGrid API key missing");
      return;
    }

    const msg = {
      to,

      from: {
        name: emailConfig.from.name,
        email: emailConfig.from.address,
      },

      subject,

      html,
    };

    try {
      const result = await sgMail.send(msg);
      console.log("Email sent to: ", to);
      return result;
    } catch (error) {
      console.error("Email failed: ", error.message);
      if (retries < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs));

        return this.send(to, subject, html, retries + 1);
      }

      throw error;
    }
  }

  async sendContactForm(data) {
    const html = `
      <h2>New Contact Form Submission</h2>

      <p><b>Name:</b> ${data.firstname} ${data.lastname}</p>

      <p><b>Email:</b> ${data.email}</p>

      <p><b>Message:</b></p>

      <p>${data.message}</p>
    `;

    return this.send(
      emailConfig.contactEmail,
      "New Contact Form Submission",
      html,
    );
  }

  async sendBoostForm(data) {
    const html = `
    <h2>New Boost Request</h2>

      <p><b>Name:</b> ${data.firstname} ${data.lastname}</p>

      <p><b>Email:</b> ${data.email}</p>

      <p><b>Phone:</b> ${data.phone}</p>

      <p><b>Website for which we are requesting boost:</b> ${data.website}</p>

      <p><b>Message:</b></p>

      <p>${data.message}</p>
    `;

    return this.send(emailConfig.boostEmail, "New Boost Request", html);
  }
}

export const emailService = new EmailService();
