import nodemailer from "npm:nodemailer@6.9.16";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// ╔══════════════════════════════════════════════════════════════════╗
// ║  EMAIL INTEGRATION — FILL IN THESE VALUES                         ║
// ║                                                                  ║
// ║  Get these from your email hosting company's SMTP settings       ║
// ║  (GoDaddy, Namecheap, Google Workspace, Microsoft 365, Zoho,     ║
// ║   SiteGround, Bluehost, Hostinger, etc.)                         ║
// ╚══════════════════════════════════════════════════════════════════╝

const SMTP_HOST = "SMTP.NameBrightMail.com";      // e.g. smtp.zoho.com, smtp.gmail.com, smtp.office365.com
const SMTP_PORT = 465;                              // 587 for TLS, or 465 for SSL
const SMTP_SECURE = true;                          // true if port 465, false if port 587
const SMTP_USER = "notification@anytimedriver.com";             // your full email address
const SMTP_PASS = "Not@nyt1m3.KE26";  // your email password (use an App Password if 2FA is on)

const FROM_ADDRESS = '"LUHU IDEAS FORM" <notification@anytimedriver.com>';  // appears as the sender
const TO_ADDRESS = "solutions@luhuideas.com";                   // where you want to receive the notifications

// ────────────────────────────────────────────────────────────────────
// No need to edit anything below this line
// ────────────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const title = String(body?.title ?? "").trim();
    const category = String(body?.category ?? "").trim();
    const description = String(body?.description ?? "").trim();

    if (!name || !email || !title || !description) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const html = `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0f131a; border: 1px solid #1f232c; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #098e64, #14b07b); padding: 24px 32px;">
          <span style="font-size: 20px; font-weight: 700; color: #fff; letter-spacing: -0.02em;">LUHU IDEAS</span>
          <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">New idea submission</p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #aab1bd; font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 8px;">${escapeHtml(category)}</p>
          <h2 style="color: #fff; font-size: 22px; margin: 0 0 20px; font-weight: 600;">${escapeHtml(title)}</h2>
          <p style="color: #d4d8df; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">${escapeHtml(description)}</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="color: #7b8494; font-size: 12px; padding: 6px 0; width: 80px;">Name</td><td style="color: #fff; font-size: 14px;">${escapeHtml(name)}</td></tr>
            <tr><td style="color: #7b8494; font-size: 12px; padding: 6px 0;">Email</td><td style="color: #fff; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #3bc994; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
          </table>
        </div>
      </div>
    `;

    const text = `New LUHU IDEAS submission\n\nCategory: ${category}\nTitle: ${title}\n\n${description}\n\nFrom: ${name} <${email}>`;

    const info = await transporter.sendMail({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `New idea: ${title}`,
      text,
      html,
    });

    return new Response(
      JSON.stringify({ success: true, messageId: info.messageId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});