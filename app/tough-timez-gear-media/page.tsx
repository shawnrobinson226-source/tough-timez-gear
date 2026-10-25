import CustomPage from "@/components/CustomPage";
import { site } from "@/lib/data";
import { metaFor } from "@/lib/metadata";

export const metadata = metaFor("/tough-timez-gear-media");

export default function MediaPage() {
  const page = site.pages["tough-timez-gear-media"];
  return <CustomPage title={page.title} html={page.html} />;
}
