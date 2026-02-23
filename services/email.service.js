import sgMail from "@sendgrid/mail";
import { emailConfig } from "../config/email.config.js";

sgMail.setApiKey(emailConfig.sendgridApiKey);

class EmailService {
  async send(to, subject, html, type, retries = 0) {
    const maxRetries = emailConfig.settings.maxRetries;
    const retryDelayMs = emailConfig.settings.retryDelay;

    if (!emailConfig.sendgridApiKey) {
      console.error("SendGrid API key missing");
      return;
    }

    const fromEmail =
      type === "contact"
        ? emailConfig.from.contact
        : type === "boost"
          ? emailConfig.from.boost
          : emailConfig.from.contact;

    if (!fromEmail) {
      throw new Error("From email not configured");
    }

    const msg = {
      to,
      from: {
        name: emailConfig.from.name,
        email: fromEmail,
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
    <div style="font-family: Arial, sans-serif; margin:0; padding:20px; background-color:#f3f3f3;">

  <div style="
    max-width: 550px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
  ">

    <div style="
      background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #a855f7 100%);
      color: white;
      text-align: center;
      padding: 40px 20px;
    ">
      <h1 style="margin:0; font-size:28px;">Glowmark Agency</h1>
    </div>

    <div style="padding: 30px 20px; text-align: center;">
      <h2 style="color:#333; font-size:24px; margin-bottom:20px;">
        Hello ${data.firstname}!
      </h2>

      <p style="color:#555; font-size:16px; line-height:1.6; margin-bottom:20px;">
        Thank you for contacting Glowmark.<br>
        We have received your message and our team will respond as soon as possible.<br><br>
        We appreciate you reaching out and look forward to assisting you.
      </p>
    </div>

    <div style="
      background-color: #f3f3f3;
      color:#777;
      text-align:center;
      padding: 20px;
      font-size:12px;
    ">
      <p>Glowmark Agency &copy; ${new Date().getFullYear()}</p>
    </div>

  </div>

</div>

    `;

    return this.send(data.email, "Thank you for reaching out", html, "contact");
  }

  async sendBoostForm(data) {
    const html = `  
    <div style="font-family: Arial, sans-serif; margin:0; padding:20px; background-color:#f3f3f3;">

  <div style="max-width: 550px; margin: 0 auto;">

    <div style="
      background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 50%, #a855f7 100%);
      color: white;
      text-align: center;
      padding: 40px 20px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    ">
      <h1 style="margin:0; font-size:28px;">Glowmark Agency</h1>
    </div>

    <div style="padding: 30px 20px; text-align: center; background-color:white;">
      <h2 style="color:#333; font-size:24px; margin-bottom:20px;">
        Hello ${data.firstname}!
      </h2>

      <p style="color:#555; font-size:16px; line-height:1.6; margin-bottom:20px;">
        Thank you for your interest in our Boost services.<br>
        We have received your request and our team will review it shortly.<br>
        You can expect to hear from us very soon with the next steps.<br><br>
        We’re excited to help you grow with Glowmark!
      </p>
    </div>

    <div style="
      background-color: #f3f3f3;
      color:#777;
      text-align:center;
      padding: 20px;
      font-size:12px;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    ">
      <p>Glowmark Agency &copy; ${new Date().getFullYear()}</p>
    </div>

  </div>

</div>

    `;

    return this.send(data.email, "Thank you for your request!", html, "boost");
  }
}

export const emailService = new EmailService();
