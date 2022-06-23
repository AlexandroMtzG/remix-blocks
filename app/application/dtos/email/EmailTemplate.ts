export type EmailTemplate = {
  type: "standard" | "layout";
  name: string;
  alias: string;
  subject: string;
  htmlBody: string;
  active: boolean;
  associatedServerId: number;
  templateId: number;
};
