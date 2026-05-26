import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def send_test_emails():
    # SMTP Configuration
    smtp_server = os.getenv('SMTP_HOST', 'smtp.gmail.com')
    smtp_port = int(os.getenv('SMTP_PORT', '465'))
    smtp_user = os.getenv('SMTP_USER')
    smtp_pass = os.getenv('SMTP_PASS')
    target_email = "manthan.bt@gmail.com"

    if not smtp_user or not smtp_pass:
        print("Error: SMTP_USER or SMTP_PASS not found in .env file.")
        return

    # 1. CLIENT TEMPLATE (Confirmation, MOBILE RESPONSIVE)
    client_html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
        body { margin: 0; padding: 0; background-color: #f9f9f9; color: #000000; font-family: 'Montserrat', sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important; }
        .wrapper { width: 100%; background-color: #f9f9f9; padding: 40px 0; }
        .content-table { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eeeeee; }
        .header-cell { padding: 50px 20px 40px; text-align: center; }
        .body-cell { padding: 40px 30px 60px; }
        .status-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.3em; color: #888888; text-transform: uppercase; margin-bottom: 24px; display: block; }
        .title { font-size: 24px; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 28px; color: #000000; line-height: 1.1; text-transform: uppercase; }
        .intro-text { font-size: 14px; line-height: 1.7; color: #555555; margin-bottom: 40px; }
        .section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; color: #aaaaaa; text-transform: uppercase; border-bottom: 1px solid #eeeeee; padding-bottom: 8px; margin-bottom: 16px; }
        .detail-item { margin-bottom: 28px; }
        .detail-label { font-size: 10px; font-weight: 700; color: #888888; margin-bottom: 4px; text-transform: uppercase; }
        .detail-value { font-size: 14px; font-weight: 600; color: #000000; text-transform: uppercase; }
        .footer-cell { padding: 40px 20px; background-color: #000000; text-align: center; }
        .social-link { color: #ffffff; text-decoration: none; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; margin: 0 8px 10px; display: inline-block; text-transform: uppercase; }
        .copyright { font-size: 9px; color: #555555; letter-spacing: 0.1em; margin-top: 24px; text-transform: uppercase; }
        @media only screen and (max-width: 480px) {
          .body-cell { padding: 30px 20px 40px !important; }
          .title { font-size: 20px !important; }
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <table class="content-table" align="center" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td class="header-cell">
              <h1 style="letter-spacing: 0.4em; font-weight: 900; font-size: 18px; margin: 0; color: #000000;">MIND WOBBLER</h1>
              <p style="font-size: 8px; letter-spacing: 0.2em; color: #888888; margin-top: 10px; text-transform: uppercase;">Strategic Creative Direction</p>
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
                <div class="detail-value">Test User</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Interest</div>
                <div class="detail-value">Brand Identity</div>
              </div>
              <div class="detail-item" style="margin-bottom: 0;">
                <div class="detail-label">Vision</div>
                <div style="font-size: 14px; line-height: 1.7; color: #333333; margin-top: 10px;">This is a test message to validate logo inclusion and mobile responsiveness.</div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="footer-cell">
              <div style="margin-bottom: 24px;">
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">LinkedIn</a>
                <a href="#" class="social-link">Behance</a>
                <a href="https://wa.me/918105176785" class="social-link">WhatsApp</a>
              </div>
              <div style="margin-bottom: 24px;">
                <a href="https://mind-wobbler.vercel.app/unsubscribe" style="color: #555555; text-decoration: underline; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">Unsubscribe from updates</a>
              </div>
              <div class="copyright">MIND WOBBLER &copy; 2026 &bull; Strategic Creative Direction</div>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
    """

    # 2. ADMIN TEMPLATE (Notification, MOBILE RESPONSIVE)
    admin_html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
        body { margin: 0; padding: 0; background-color: #ffffff; color: #000000; font-family: 'Montserrat', sans-serif; width: 100% !important; }
        .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 40px 20px; box-sizing: border-box; }
        .header { border-bottom: 2px solid #000000; padding-bottom: 30px; margin-bottom: 40px; }
        .tag { font-size: 10px; font-weight: 700; letter-spacing: 0.4em; color: #888888; text-transform: uppercase; margin-bottom: 12px; display: block; }
        .headline { font-size: 26px; font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase; line-height: 1.1; }
        .data-grid { margin-bottom: 40px; }
        .data-row { margin-bottom: 32px; }
        .label { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; color: #aaaaaa; text-transform: uppercase; margin-bottom: 6px; }
        .value { font-size: 16px; font-weight: 700; color: #000000; word-break: break-word; }
        .message-container { background-color: #f9f9f9; padding: 25px; border-left: 4px solid #000000; font-size: 15px; line-height: 1.6; color: #333333; }
        .cta-btn { display: inline-block; background-color: #000000; color: #ffffff; text-decoration: none; padding: 18px 36px; font-size: 11px; font-weight: 900; letter-spacing: 0.3em; text-transform: uppercase; margin-top: 40px; text-align: center; }
        .footer { margin-top: 60px; font-size: 9px; font-weight: 700; letter-spacing: 0.2em; color: #cccccc; text-transform: uppercase; }
        @media only screen and (max-width: 480px) {
          .headline { font-size: 22px !important; }
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
            <div class="value">TEST USER</div>
          </div>
          <div class="data-row">
            <div class="label">Lead Email</div>
            <div class="value" style="text-transform: lowercase;">test@example.com</div>
          </div>
          <div class="data-row">
            <div class="label">Project Discipline</div>
            <div class="value">BRAND IDENTITY</div>
          </div>
          <div class="data-row" style="margin-bottom: 0;">
            <div class="label">Client Vision</div>
            <div class="message-container">This is a test notification for the admin. Validating mobile responsiveness.</div>
          </div>
        </div>
        <a href="#" class="cta-btn">Initiate Response</a>
        <div class="footer">Automated via Mind Wobbler Engine &bull; Bengaluru, India</div>
      </div>
    </body>
    </html>
    """

    try:
        # Create SMTP session
        server = smtplib.SMTP_SSL(smtp_server, smtp_port)
        server.login(smtp_user, smtp_pass)

        # Send Client Confirmation Test
        msg1 = MIMEMultipart()
        msg1['From'] = f"Mind Wobbler <{smtp_user}>"
        msg1['To'] = target_email
        msg1['Subject'] = "TEST: Client Confirmation Template"
        msg1.attach(MIMEText(client_html, 'html'))
        server.send_message(msg1)
        print("✓ Client Confirmation template sent.")

        # Send Admin Alert Test
        msg2 = MIMEMultipart()
        msg2['From'] = f"MW System <{smtp_user}>"
        msg2['To'] = target_email
        msg2['Subject'] = "TEST: Admin Alert Template"
        msg2.attach(MIMEText(admin_html, 'html'))
        server.send_message(msg2)
        print("✓ Admin Alert template sent.")

        server.quit()
        print(f"\nAll test emails successfully sent to {target_email}")

    except Exception as e:
        print(f"Error sending emails: {e}")

if __name__ == "__main__":
    send_test_emails()
