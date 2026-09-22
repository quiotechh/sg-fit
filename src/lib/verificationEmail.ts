const GOLD = "#C9953A"

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

// `expiresInMinutes` is shown to the user so an expired link isn't a surprise.
export function buildVerificationEmail({
  name,
  url,
  expiresInMinutes,
}: {
  name: string
  url: string
  expiresInMinutes: number
}) {
  const firstName = name.split(" ")[0] || "there"
  const safeName = escapeHtml(firstName)
  const safeUrl = escapeHtml(url)

  const html = `
<div style="background:#f4f4f4;padding:32px 16px;font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eeeeee;">
    <tr>
      <td style="background:#09090b;padding:24px;text-align:center;">
        <span style="font-size:20px;font-weight:900;letter-spacing:4px;color:#ffffff;">SG<span style="color:${GOLD};">.</span>FIT</span>
      </td>
    </tr>
    <tr>
      <td style="padding:32px 28px 8px;">
        <p style="margin:0 0 4px;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:${GOLD};">One last step</p>
        <h1 style="margin:0 0 16px;font-size:22px;font-weight:900;color:#09090b;">Verify your email</h1>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#52525b;">Hi ${safeName}, thanks for joining SG Fit. Confirm this is your email address to activate your account.</p>
        <table role="presentation" width="100%" style="margin-bottom:16px;">
          <tr>
            <td align="center" style="background:${GOLD};border-radius:10px;">
              <a href="${safeUrl}" style="display:block;padding:15px 24px;font-size:13px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#09090b;text-decoration:none;">Verify Email</a>
            </td>
          </tr>
        </table>
        <p style="margin:0 0 24px;font-size:12px;line-height:1.6;color:#71717a;text-align:center;">This link expires in ${expiresInMinutes} minutes.</p>
        <table role="presentation" width="100%" style="background:#fafaf9;border:1px solid #eeeeee;border-radius:8px;margin-bottom:24px;">
          <tr>
            <td style="padding:14px 16px;font-size:12px;line-height:1.5;color:#52525b;">
              <strong style="color:#09090b;">Didn't create an account?</strong> You can safely ignore this email — nothing happens unless the button above is clicked.
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:0 28px 28px;">
        <p style="margin:0;font-size:12px;color:#a1a1aa;">— SG Fit</p>
      </td>
    </tr>
  </table>
</div>`.trim()

  const text = `Hi ${firstName},\n\nThanks for joining SG Fit. Confirm this is your email address to activate your account:\n\n${url}\n\nThis link expires in ${expiresInMinutes} minutes.\n\nDidn't create an account? You can safely ignore this email.\n\n— SG Fit`

  return { html, text }
}
