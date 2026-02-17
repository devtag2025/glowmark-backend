import { emailService } from "./../services/email.service.js";

export const handleContactForm = async (req, res) => {
  try {
    const data = req.body;
    await emailService.sendContactForm(data);

    res.json({
      success: true,
      message: "Contact Form Submitted Successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};

export const handleBoostForm = async (req, res) => {
  try {
    const data = req.body;
    await emailService.sendBoostForm(data);

    res.json({
      success: true,
      message: "Request Boost Form Submitted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
};
