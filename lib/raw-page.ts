// The live store serves /refund-policy and /terms-of-service as bare text bodies with
// Content-Type text/html (no header, footer or styling). Mirror that exactly.
export const rawPageResponse = (body: string) =>
  new Response(body, { headers: { "content-type": "text/html; charset=utf-8" } });
