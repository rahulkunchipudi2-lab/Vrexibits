import { enquiryDelivery } from '../data/site';

/**
 * Emails the enquiry to every address in `enquiryDelivery.recipients`
 * (src/data/site.js) using FormSubmit — no server or account needed.
 *
 * First-time setup: submit the form once on the live site. FormSubmit sends an
 * activation email to the first recipient; click "Activate Form". From then on
 * every enquiry is delivered to all recipients.
 *
 * The published preview builds in demo mode (VITE_DEMO_FORM=true), where
 * sending is simulated because the preview host blocks outside requests.
 */
export default async function submitEnquiry(data) {
  if (data.website) return { ok: true }; // honeypot: silently accept bot submissions

  if (import.meta.env.VITE_DEMO_FORM === 'true') {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true };
  }

  const [to, ...cc] = enquiryDelivery.recipients;
  const target = enquiryDelivery.formsubmitAlias || to;

  const res = await fetch(`https://formsubmit.co/ajax/${target}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      Name: data.name,
      Company: data.company,
      Email: data.email,
      Phone: data.phone || 'Not given',
      'Project type': data.projectType,
      'Budget range': data.budget,
      'Project details': data.message.trim() || 'Not given',
      _subject: `${enquiryDelivery.subject}: ${data.company} (${data.projectType})`,
      _replyto: data.email, // "Reply" in Gmail goes straight to the client
      ...(cc.length ? { _cc: cc.join(',') } : {}),
      _template: 'table',
      _captcha: 'false',
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || String(json.success) !== 'true') {
    throw new Error(json.message || 'The enquiry could not be sent.');
  }
  return { ok: true };
}
