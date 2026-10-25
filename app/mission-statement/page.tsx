import CustomPage from "@/components/CustomPage";
import { site } from "@/lib/data";
import { metaFor } from "@/lib/metadata";

export const metadata = metaFor("/mission-statement");

export default function MissionStatementPage() {
  const page = site.pages["mission-statement"];
  return <CustomPage title={page.title} html={page.html} />;
}
