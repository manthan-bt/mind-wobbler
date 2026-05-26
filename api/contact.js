import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Load environment variables for local testing
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `METHOD ${req.method} NOT ALLOWED` });
  }

  const { name, email, inquiryType, message, honey } = req.body;

  // Honeypot field for spam prevention
  if (honey) {
    console.log('[SPAM DETECTED] Honeypot field was filled.');
    return res.status(200).json({ success: true, message: 'INQUIRY TRANSMITTED.' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'NAME, EMAIL, AND MESSAGE ARE REQUIRED.' });
  }

  // Retrieve SMTP credentials from environment
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM_NAME || 'MIND WOBBLER';
  const smtpTo = process.env.SMTP_TO || smtpUser;

  if (!smtpUser || !smtpPass) {
    console.error('[CONFIG ERROR] SMTP_USER or SMTP_PASS is missing in environment.');
    return res.status(500).json({ message: 'EMAIL SERVER IS NOT FULLY CONFIGURED.' });
  }

  // Resolve logo assets and prepare attachments
  const attachments = [];
  let logoHtml = '<div class="logo-text">M I N D &nbsp; W O B B L E R</div>';
  let adminLogoHtml = '<div class="logo-text">M I N D &nbsp; W O B B L E R</div>';

  const logoPath = path.join(__dirname, '../public/mind-wobbler-logo.png');
  const iconPath = path.join(__dirname, '../public/mind-wobbler-icon.png');

  if (fs.existsSync(logoPath)) {
    attachments.push({
      filename: 'mind-wobbler-logo.png',
      path: logoPath,
      cid: 'mw_logo'
    });
    logoHtml = `<img src="cid:mw_logo" alt="MIND WOBBLER" style="height: 36px; width: auto; border: 0; display: block; margin: 0 auto;" />`;
    adminLogoHtml = `<img src="cid:mw_logo" alt="MIND WOBBLER" style="height: 28px; width: auto; border: 0; display: inline-block; vertical-align: middle;" />`;
  } else if (fs.existsSync(iconPath)) {
    attachments.push({
      filename: 'mind-wobbler-icon.png',
      path: iconPath,
      cid: 'mw_icon'
    });
    logoHtml = `
      <div style="text-align: center;">
        <img src="cid:mw_icon" alt="M" style="height: 24px; width: auto; border: 0; display: inline-block; vertical-align: middle; margin-right: 12px;" />
        <span style="font-size: 16px; font-weight: 900; letter-spacing: 0.3em; color: #000000; vertical-align: middle; font-family: 'Montserrat', sans-serif;">MIND WOBBLER</span>
      </div>
    `;
    adminLogoHtml = `
      <div>
        <img src="cid:mw_icon" alt="M" style="height: 20px; width: auto; border: 0; display: inline-block; vertical-align: middle; margin-right: 10px;" />
        <span style="font-size: 14px; font-weight: 900; letter-spacing: 0.3em; color: #000000; vertical-align: middle; font-family: 'Montserrat', sans-serif;">MIND WOBBLER</span>
      </div>
    `;
  }

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Client confirmation HTML (High contrast: White Header, Dark Body, Montserrat font)
  const clientHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Received</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #000000;
      color: #ffffff;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    .wrapper {
      width: 100%;
      background-color: #000000;
      padding: 60px 20px;
    }
    .content-table {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      border: 1px solid #222222;
      background-color: #0a0a0a;
    }
    .header-cell {
      padding: 35px 40px;
      text-align: center;
      background-color: #ffffff;
      border-bottom: 1px solid #222222;
    }
    .logo-text {
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 0.4em;
      color: #000000;
      margin: 0;
      display: inline-block;
      font-family: 'Montserrat', sans-serif;
    }
    .body-cell {
      padding: 50px 40px;
    }
    .title {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 0.1em;
      margin-bottom: 24px;
      color: #ffffff;
      line-height: 1.4;
    }
    .intro-text {
      font-size: 12px;
      line-height: 1.8;
      letter-spacing: 0.15em;
      color: #a0a0a0;
      margin-bottom: 40px;
    }
    .summary-title {
      font-size: 10px;
      font-weight: 900;
      letter-spacing: 0.35em;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 24px;
      border-bottom: 1px solid #222222;
      padding-bottom: 8px;
    }
    .detail-row {
      margin-bottom: 24px;
    }
    .detail-label {
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.3em;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 8px;
    }
    .detail-value {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #ffffff;
    }
    .message-box {
      background-color: #111111;
      border-left: 2px solid #ffffff;
      padding: 24px;
      margin-top: 10px;
      border-top: 1px solid rgba(255,255,255,0.03);
      border-right: 1px solid rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(255,255,255,0.03);
    }
    .message-text {
      font-size: 13px;
      line-height: 1.8;
      letter-spacing: 0.08em;
      color: #ffffff;
      white-space: pre-wrap;
      text-transform: none;
    }
    .footer-cell {
      padding: 40px;
      border-top: 1px solid #222222;
      text-align: center;
    }
    .social-links {
      margin-bottom: 24px;
    }
    .social-link {
      color: #ffffff;
      text-decoration: none;
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.25em;
      margin: 0 14px;
      display: inline-block;
    }
    .copyright {
      font-size: 9px;
      color: rgba(255, 255, 255, 0.3);
      letter-spacing: 0.2em;
    }
    @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 20px 10px;
      }
      .body-cell {
        padding: 30px 20px;
      }
      .header-cell {
        padding: 25px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="content-table" align="center">
      <tr>
        <td class="header-cell">
          ${logoHtml}
        </td>
      </tr>
      <tr>
        <td class="body-cell">
          <div class="title">THANK YOU FOR GETTING IN TOUCH</div>
          <div class="intro-text">
            WE HAVE RECEIVED YOUR ENQUIRY. WE WILL CONTACT YOU AS SOON AS POSSIBLE.
          </div>
          
          <div class="summary-title">MESSAGE DETAILS</div>
          
          <div class="detail-row">
            <div class="detail-label">NAME</div>
            <div class="detail-value">${name.toUpperCase()}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">INQUIRY TYPE</div>
            <div class="detail-value">${(inquiryType || 'GENERAL INQUIRY').toUpperCase()}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">MESSAGE</div>
            <div class="message-box">
              <div class="message-text">${message}</div>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="footer-cell">
          <div class="social-links">
            <a href="https://www.instagram.com/mind_wobbler" class="social-link">INSTAGRAM</a>
            <a href="https://www.linkedin.com/in/manthan-bt-268610295/" class="social-link">LINKEDIN</a>
            <a href="https://www.behance.net/mind_wobbler" class="social-link">BEHANCE</a>
            <a href="https://www.youtube.com/@mind_wobbler" class="social-link">YOUTUBE</a>
          </div>
          <div class="copyright">MIND WOBBLER &copy; 2026. ALL RIGHTS RESERVED.</div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
  `;

  // Admin notification HTML (Sleek dark panel with white actions)
  const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Alert</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #000000;
      color: #ffffff;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      text-transform: uppercase;
      -webkit-font-smoothing: antialiased;
    }
    table {
      border-collapse: collapse;
    }
    .wrapper {
      width: 100%;
      background-color: #000000;
      padding: 60px 20px;
    }
    .content-table {
      max-width: 600px;
      width: 100%;
      margin: 0 auto;
      border: 1px solid #222222;
      background-color: #0a0a0a;
    }
    .header-cell {
      padding: 30px 40px;
      background-color: #ffffff;
      border-bottom: 1px solid #222222;
      text-align: left;
    }
    .logo-text {
      font-size: 16px;
      font-weight: 900;
      letter-spacing: 0.4em;
      color: #000000;
      margin: 0;
      display: inline-block;
      vertical-align: middle;
      font-family: 'Montserrat', sans-serif;
    }
    .system-badge {
      background-color: #000000;
      color: #ffffff;
      font-size: 8px;
      font-weight: 900;
      letter-spacing: 0.25em;
      padding: 5px 10px;
      vertical-align: middle;
      margin-left: 15px;
      display: inline-block;
    }
    .body-cell {
      padding: 50px 40px;
    }
    .title {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 0.1em;
      margin-bottom: 30px;
      color: #ffffff;
      line-height: 1.4;
    }
    .detail-row {
      margin-bottom: 24px;
    }
    .detail-label {
      font-size: 9px;
      font-weight: 900;
      letter-spacing: 0.3em;
      color: rgba(255, 255, 255, 0.4);
      margin-bottom: 8px;
    }
    .detail-value {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #ffffff;
    }
    .message-box {
      background-color: #111111;
      border-left: 2px solid #ffffff;
      padding: 24px;
      margin-top: 10px;
      border-top: 1px solid rgba(255,255,255,0.03);
      border-right: 1px solid rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(255,255,255,0.03);
    }
    .message-text {
      font-size: 13px;
      line-height: 1.8;
      letter-spacing: 0.08em;
      color: #ffffff;
      white-space: pre-wrap;
      text-transform: none;
    }
    .cta-container {
      margin-top: 45px;
      text-align: center;
    }
    .btn {
      background-color: #ffffff;
      color: #000000;
      text-decoration: none;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.35em;
      padding: 20px 40px;
      display: inline-block;
      border: 1px solid #ffffff;
    }
    .footer-cell {
      padding: 30px;
      border-top: 1px solid #222222;
      text-align: center;
    }
    .system-info {
      font-size: 8px;
      color: rgba(255, 255, 255, 0.3);
      letter-spacing: 0.15em;
    }
    @media only screen and (max-width: 600px) {
      .wrapper {
        padding: 20px 10px;
      }
      .body-cell {
        padding: 30px 20px;
      }
      .header-cell {
        padding: 25px 20px;
        text-align: center;
      }
      .system-badge {
        margin-top: 10px;
        margin-left: 0;
        display: block;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="content-table" align="center">
      <tr>
        <td class="header-cell">
          <table width="100%">
            <tr>
              <td>
                ${adminLogoHtml}
              </td>
              <td align="right" style="text-align: right;">
                <div class="system-badge">SYSTEM</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td class="body-cell">
          <div class="title">NEW INQUIRY RECEIVED</div>
          
          <div class="detail-row">
            <div class="detail-label">NAME</div>
            <div class="detail-value">${name.toUpperCase()}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">EMAIL</div>
            <div class="detail-value" style="text-transform: none;">
              <a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a>
            </div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">INQUIRY TYPE</div>
            <div class="detail-value">${(inquiryType || 'GENERAL INQUIRY').toUpperCase()}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">MESSAGE</div>
            <div class="message-box">
              <div class="message-text">${message}</div>
            </div>
          </div>
          
          <div class="cta-container">
            <a href="mailto:${email}?subject=RE:%20Inquiry%20with%20Mind%20Wobbler" class="btn">REPLY TO CLIENT</a>
          </div>
        </td>
      </tr>
      <tr>
        <td class="footer-cell">
          <div class="system-info">AUTOMATED SYSTEM NOTIFICATION &bull; MIND WOBBLER STUDIOS ENGINE</div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
  `;

  try {
    // 1. Send Alert Email to Admin
    await transporter.sendMail({
      from: `"${smtpFrom} Alert" <${smtpUser}>`,
      replyTo: email,
      to: smtpTo,
      subject: `[MIND WOBBLER] NEW INQUIRY: ${inquiryType || 'GENERAL INQUIRY'} - FROM ${name.toUpperCase()}`,
      html: adminHtml,
      attachments: attachments
    });

    // 2. Send Receipt Confirmation to Client
    await transporter.sendMail({
      from: `"${smtpFrom}" <${smtpUser}>`,
      to: email,
      subject: `INQUIRY RECEIVED — MIND WOBBLER`,
      html: clientHtml,
      attachments: attachments
    });

    return res.status(200).json({ success: true, message: 'INQUIRY SENT.' });
  } catch (error) {
    console.error('[SMTP ERROR] Failed to send emails:', error);
    return res.status(500).json({ 
      message: 'FAILED TO SEND INQUIRY. PLEASE TRY AGAIN LATER.', 
      error: error.message 
    });
  }
}
