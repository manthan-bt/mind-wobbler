import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables for local testing
dotenv.config();


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

  // Logo — served from the public folder (works reliably on Vercel & Cloudflare)
  const SITE_URL = 'https://mindwobbler.com';
  const logoHtml = `<img src="${SITE_URL}/mind-wobbler-logo.png" alt="MIND WOBBLER" style="height: auto; max-height: 52px; width: auto; max-width: 220px; border: 0; display: block; margin: 0 auto;" />`;
  const adminLogoHtml = `<img src="${SITE_URL}/mind-wobbler-logo.png" alt="MIND WOBBLER" style="height: auto; max-height: 36px; width: auto; max-width: 180px; border: 0; display: inline-block; vertical-align: middle;" />`;

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

  // Client confirmation HTML (Refined: White Background, Monochromatic, Professional, MOBILE RESPONSIVE)
  const clientHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inquiry Received</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      color: #000000;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      max-width: 100%;
      height: auto;
    }
    .wrapper {
      width: 100%;
      background-color: #f9f9f9;
      padding: 40px 0;
    }
    .content-table {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #eeeeee;
    }
    .header-cell {
      padding: 40px 20px;
      text-align: center;
    }
    .body-cell {
      padding: 40px 30px 60px;
    }
    .status-tag {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.3em;
      color: #888888;
      text-transform: uppercase;
      margin-bottom: 24px;
      display: block;
    }
    .title {
      font-size: 24px;
      font-weight: 900;
      letter-spacing: -0.02em;
      margin-bottom: 28px;
      color: #000000;
      line-height: 1.1;
      text-transform: uppercase;
    }
    .intro-text {
      font-size: 14px;
      line-height: 1.7;
      color: #555555;
      margin-bottom: 40px;
    }
    .section-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #aaaaaa;
      margin-bottom: 16px;
      text-transform: uppercase;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 8px;
    }
    .detail-item {
      margin-bottom: 28px;
    }
    .detail-label {
      font-size: 10px;
      font-weight: 700;
      color: #888888;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
    .detail-value {
      font-size: 14px;
      font-weight: 600;
      color: #000000;
      text-transform: uppercase;
    }
    .message-text {
      font-size: 14px;
      line-height: 1.7;
      color: #333333;
      white-space: pre-wrap;
      margin-top: 10px;
    }
    .footer-cell {
      padding: 40px 20px;
      background-color: #000000;
      text-align: center;
    }
    .social-link {
      color: #ffffff;
      text-decoration: none;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.2em;
      margin: 0 10px 10px;
      display: inline-block;
      text-transform: uppercase;
    }
    .copyright {
      font-size: 9px;
      color: #555555;
      letter-spacing: 0.1em;
      margin-top: 24px;
      text-transform: uppercase;
    }
    @media only screen and (max-width: 480px) {
      .body-cell { padding: 30px 20px 40px !important; }
      .title { font-size: 20px !important; }
      .intro-text { font-size: 13px !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <table class="content-table" align="center" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td class="header-cell">
          ${logoHtml}
        </td>
      </tr>
      <tr>
        <td class="body-cell">
          <span class="status-tag">Transmission Received</span>
          <div class="title">We've received <br/> your inquiry.</div>
          <div class="intro-text">
            Thank you for reaching out to Mind Wobbler. Our team has received your submission and is currently reviewing the details. You can expect a follow-up from one of our partners within 24 hours.
          </div>
          
          <div class="section-label">Submission Summary</div>
          
          <div class="detail-item">
            <div class="detail-label">Client</div>
            <div class="detail-value">${name}</div>
          </div>
          
          <div class="detail-item">
            <div class="detail-label">Interest</div>
            <div class="detail-value">${inquiryType || 'General Inquiry'}</div>
          </div>
          
          <div class="detail-item" style="margin-bottom: 0;">
            <div class="detail-label">Vision</div>
            <div class="message-text">${message}</div>
          </div>
        </td>
      </tr>
      <tr>
        <td class="footer-cell">
          <div style="margin-bottom: 24px;">
            <a href="https://www.instagram.com/mind_wobbler" class="social-link">Instagram</a>
            <a href="https://www.linkedin.com/in/manthan-bt-268610295/" class="social-link">LinkedIn</a>
            <a href="https://www.behance.net/mind_wobbler" class="social-link">Behance</a>
            <a href="https://www.youtube.com/@mind_wobbler" class="social-link">YouTube</a>
          </div>
          <div style="margin-bottom: 16px;">
            <a href="https://mindwobbler.com/unsubscribe" style="color: #888888; text-decoration: underline; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">Unsubscribe from marketing emails</a>
          </div>
          <div style="margin-bottom: 24px;">
            <span style="color: #555555; font-size: 9px; letter-spacing: 0.05em;">You will still receive a reply to your inquiry — that is a direct response, not marketing.</span>
          </div>
          <div class="copyright">MIND WOBBLER &copy; 2026 &bull; Strategic Creative Direction</div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>
  `;

  // Admin notification HTML (Sleek, whitespace-focused admin report, MOBILE RESPONSIVE)
  const adminHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Opportunity</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #000000;
      font-family: 'Montserrat', sans-serif;
      width: 100% !important;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .header {
      border-bottom: 2px solid #000000;
      padding-bottom: 30px;
      margin-bottom: 40px;
    }
    .tag {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.4em;
      color: #888888;
      text-transform: uppercase;
      margin-bottom: 12px;
      display: block;
    }
    .headline {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.03em;
      text-transform: uppercase;
      line-height: 1.1;
    }
    .data-grid {
      margin-bottom: 40px;
    }
    .data-row {
      margin-bottom: 32px;
    }
    .label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #aaaaaa;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .value {
      font-size: 16px;
      font-weight: 700;
      color: #000000;
      word-break: break-word;
    }
    .message-container {
      background-color: #f9f9f9;
      padding: 25px;
      border-left: 4px solid #000000;
      font-size: 15px;
      line-height: 1.6;
      color: #333333;
    }
    .cta-btn {
      display: inline-block;
      background-color: #000000;
      color: #ffffff;
      text-decoration: none;
      padding: 18px 36px;
      font-size: 11px;
      font-weight: 900;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      margin-top: 40px;
      text-align: center;
    }
    .footer {
      margin-top: 60px;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #cccccc;
      text-transform: uppercase;
    }
    @media only screen and (max-width: 480px) {
      .headline { font-size: 22px !important; }
      .message-container { padding: 20px !important; }
      .cta-btn { width: 100%; box-sizing: border-box; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="tag">System Alert</span>
      <div class="headline">New Project <br/> Opportunity</div>
    </div>
    
    <div class="data-grid">
      <div class="data-row">
        <div class="label">Lead Name</div>
        <div class="value">${name.toUpperCase()}</div>
      </div>
      <div class="data-row">
        <div class="label">Lead Email</div>
        <div class="value" style="text-transform: lowercase;">${email}</div>
      </div>
      <div class="data-row">
        <div class="label">Project Discipline</div>
        <div class="value">${(inquiryType || 'GENERAL INQUIRY').toUpperCase()}</div>
      </div>
      <div class="data-row" style="margin-bottom: 0;">
        <div class="label">Client Vision</div>
        <div class="message-container">${message}</div>
      </div>
    </div>

    <a href="mailto:${email}?subject=RE: Project Inquiry with Mind Wobbler" class="cta-btn">Initiate Response</a>
    
    <div class="footer">
      Automated via Mind Wobbler Engine &bull; Bengaluru, India
    </div>
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
      html: adminHtml
    });

    // 2. Send Receipt Confirmation to Client
    await transporter.sendMail({
      from: `"${smtpFrom}" <${smtpUser}>`,
      to: email,
      subject: `INQUIRY RECEIVED — MIND WOBBLER`,
      html: clientHtml
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
