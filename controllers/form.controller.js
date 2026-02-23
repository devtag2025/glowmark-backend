import { emailService } from "./../services/email.service.js";
import Contact from "./../models/contact.controller.js";
import Boost from "./../models/boost.controller.js";

export const handleContactForm = async (req, res) => {
  try {
    const data = req.body;

    const contact = new Contact({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      message: data.message,
    });

    await contact.save();

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

    const boost = new Boost({
      firstname: data.firstname,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
      website: data.website,
      message: data.message,
    });

    await boost.save();

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
