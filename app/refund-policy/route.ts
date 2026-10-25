import { site } from "@/lib/data";
import { rawPageResponse } from "@/lib/raw-page";

export const dynamic = "force-static";

export function GET() {
  return rawPageResponse(site.pages["refund-policy"].raw);
}
