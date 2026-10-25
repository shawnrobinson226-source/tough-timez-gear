import { site } from "@/lib/data";
import { rawPageResponse } from "@/lib/raw-page";

export const dynamic = "force-static";

// Shipped exactly as live serves it: it starts partway through Section 6 and runs to
// Section 20. Sections 1-6 are an owner decision (docs/TODO-owner-decisions.md).
export function GET() {
  return rawPageResponse(site.pages["terms-of-service"].raw);
}
