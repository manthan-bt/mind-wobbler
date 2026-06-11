export default {
  async email(message, env, ctx) {
    const incomingAddress = message.to.toLowerCase();
    const fromAddress = message.from;
    const subjectLine = message.headers.get("subject") || "(No Subject)";

    // Determine the routed destination based on incoming alias
    let destinationAddress = "mindwobblerstudios@gmail.com";
    if (incomingAddress.includes("manthan@mindwobbler.com")) {
      destinationAddress = "manthan.bt@gmail.com";
    } else if (
      incomingAddress.includes("info@mindwobbler.com") ||
      incomingAddress.includes("career@mindwobbler.com")
    ) {
      destinationAddress = "mindwobblerstudios@gmail.com";
    }

    // 1. Forward the original email directly (retains all original headers, rich HTML, and attachments)
    await message.forward(destinationAddress);

    // 2. Try to send a styled routing receipt / notification if the SEND_EMAIL binding exists
    if (env.SEND_EMAIL) {
      const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Routed - Mind Wobbler</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #000000;
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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
    .footer {
      margin-top: 60px;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #cccccc;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="tag">MIND WOBBLER ENGINE</span>
      <div class="headline">EMAIL ROUTED<br/>SUCCESSFULLY</div>
    </div>
    
    <div class="data-grid">
      <div class="data-row">
        <div class="label">Sender</div>
        <div class="value">${fromAddress}</div>
      </div>
      <div class="data-row">
        <div class="label">Incoming Alias</div>
        <div class="value" style="text-transform: lowercase;">${incomingAddress}</div>
      </div>
      <div class="data-row">
        <div class="label">Routed Destination</div>
        <div class="value" style="text-transform: lowercase;">${destinationAddress}</div>
      </div>
      <div class="data-row">
        <div class="label">Subject</div>
        <div class="value">${subjectLine}</div>
      </div>
    </div>

    <div style="font-size: 12px; line-height: 1.6; color: #555555; background-color: #f9f9f9; padding: 25px; border-left: 4px solid #000000; margin-top: 20px;">
      <strong>System Notice:</strong> The original email message has been forwarded to <strong>${destinationAddress}</strong>. You should see it in your inbox shortly with all original headers, styling, and attachments preserved.
    </div>

    <div class="footer">
      Automated via Mind Wobbler Engine &bull; Bengaluru, India
    </div>
  </div>
</body>
</html>
`;

      try {
        await env.SEND_EMAIL.send({
          from: "routing-alert@mindwobbler.com",
          to: destinationAddress,
          subject: `[ROUTED] ${subjectLine}`,
          html: emailTemplate,
        });
      } catch (err) {
        console.error("Failed to send routing notification:", err);
      }
    }
  }
};
