import { EmailTemplate } from "../dtos/email/EmailTemplate";
import fs from "fs";
import path from "path";

export default async function emailTemplates(): Promise<EmailTemplate[]> {
  const items: EmailTemplate[] = [];

  const dir = path.join("./", "./app/application/emails");
  const fileNames = fs.readdirSync(dir);
  fileNames.forEach((file) => {
    if (path.parse(file).ext === ".md") {
      const fileName = path.parse(file).name;
      const content = fs.readFileSync(path.join(dir, file), "utf8").split("`");
      const alias = content[1].replace(/(\r\n|\n|\r)/gm, "");
      const subject = content[3].replace(/(\r\n|\n|\r)/gm, "");
      const body = content[5];
      items.push({
        type: alias.startsWith("layout-") ? "layout" : "standard",
        name: fileName,
        alias,
        subject,
        htmlBody: body,
        active: false,
        associatedServerId: -1,
        templateId: -1,
      });
    }
  });
  function cmp(a: any, b: any) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
  }
  return items.sort((x, y) => cmp(x.type, y.type) || cmp(Number(x.name.split("-")[0]), Number(y.name.split("-")[0])));
}
