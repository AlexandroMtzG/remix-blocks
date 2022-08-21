import { useRef, useEffect, useState } from "react";
import { ActionFunction, json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";
import InputText from "~/components/ui/input/InputText";
import ErrorModal, { RefErrorModal } from "~/components/ui/modals/ErrorModal";
import SuccessModal, { RefSuccessModal } from "~/components/ui/modals/SuccessModal";
import UploadDocuments from "~/components/ui/uploaders/UploadDocument";
var postmark = require("postmark");

type LoaderData = {
  title: string;
  postmarkServerToken: string;
};
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    title: "Send email with Postmark template | RemixBlocks",
    postmarkServerToken: process.env.POSTMARK_SERVER_TOKEN?.toString() ?? "",
  };
  return json(data);
};

type ActionData = { success?: string; error?: string };
const success = (data: ActionData) => json(data, { status: 200 });
const badRequest = (data: ActionData) => json(data, { status: 400 });
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const POSTMARK_SERVER_TOKEN = form.get("postmark-server-token"); // process.env.POSTMARK_SERVER_TOKEN;
  const POSTMARK_TEMPLATE_ALIAS = form.get("postmark-template-alias");

  const email = form.get("email");
  const attachments: AttachmentDto[] = form.getAll("attachments[]").map((f: any) => {
    const media: MediaDto = JSON.parse(f);
    return {
      Name: media.name,
      Content: media.file.split(",")[1],
      ContentType: media.type,
    };
  });

  try {
    const client = new postmark.ServerClient(POSTMARK_SERVER_TOKEN);
    await client.sendEmailWithTemplate({
      From: process.env.POSTMARK_FROM_EMAIL ?? "hello@saasrock.com",
      To: email,
      TemplateAlias: POSTMARK_TEMPLATE_ALIAS,
      TemplateModel: {
        product_name: process.env.APP_NAME ?? "RemixBlocks",
        support_email: process.env.SUPPORT_EMAIL ?? "alex.martinez@absys.com.mx",
        sender_name: process.env.APP_NAME ?? "Alex from RemixBlocks",
        company_name: process.env.COMPANY_NAME ?? "SaasRock",
        company_address: process.env.COMPANY_ADDRESS ?? "Aurora 447B, Chapalita, Jalisco, Mexico",
      },
      Attachments: attachments,
    });
  } catch (e: any) {
    return badRequest({ error: e.message });
  }

  return success({ success: "Sent!" });
};

export const meta: MetaFunction = ({ data }) => ({
  title: data?.title,
});

interface AttachmentDto {
  Name: string;
  Content: string;
  ContentType: string;
}

interface MediaDto {
  title: string;
  name: string;
  file: string;
  type: string;
}

export default function Example() {
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData();
  const transition = useTransition();
  const state: "idle" | "success" | "error" | "submitting" = transition.submission
    ? "submitting"
    : actionData?.subscription
    ? "success"
    : actionData?.error
    ? "error"
    : "idle";

  const inputRef = useRef<HTMLInputElement>(null);
  const mounted = useRef<boolean>(false);
  const successModal = useRef<RefSuccessModal>(null);
  const errorModal = useRef<RefErrorModal>(null);

  const [postmarkServerToken, setPostmarkServerToken] = useState(data.postmarkServerToken);
  const [postmarkTemplateAlias, setPostmarkTemplateAlias] = useState("welcome");
  const [attachments, setAttachments] = useState<MediaDto[]>([]);

  useEffect(() => {
    if (actionData?.error) {
      errorModal.current?.show(actionData.error);
    }
    if (actionData?.success) {
      successModal.current?.show("Email sent", actionData.success);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  useEffect(() => {
    if (state === "error") {
      inputRef.current?.focus();
    }

    if (state === "idle" && mounted.current) {
      inputRef.current?.select();
    }

    mounted.current = true;
  }, [state]);

  function onDroppedFiles(e: { file: File; base64: any }[]) {
    const newAttachments: MediaDto[] = [...attachments];
    e.forEach(({ file, base64 }) => {
      newAttachments.push({
        title: file.name.split(".").slice(0, -1).join("."),
        file: base64,
        name: file.name,
        type: file.type,
      });
    });
    setAttachments(newAttachments);
  }

  return (
    <Form method="post" className="space-y-3">
      {/* TODO: DELETE SET UP LINES - START */}
      <InputText
        name="postmark-server-token"
        title="Postmark Server Token (we don't store this)"
        value={postmarkServerToken}
        setValue={setPostmarkServerToken}
        required
        hint={
          <a className="underline italic text-theme-500 hover:text-theme-600" href="https://account.postmarkapp.com/servers" target="_blank" rel="noreferrer">
            Get token
          </a>
        }
      />
      <InputText
        name="postmark-template-alias"
        title="Postmark Template Alias"
        value={postmarkTemplateAlias}
        setValue={setPostmarkTemplateAlias}
        required
        hint={
          <div className="italic">
            <a className="underline text-theme-500 hover:text-theme-600" href="https://account.postmarkapp.com/servers" target="_blank" rel="noreferrer">
              Get alias
            </a>
          </div>
        }
      />
      {/* TODO: DELETE SET UP LINES - END */}

      <InputText type="email" name="email" title="Email" required className="sm:col-span-2" />
      <div>
        <label className="flex justify-between space-x-2 text-xs font-medium text-gray-600 truncate mb-1">Attachments</label>
        {attachments.length === 0 ? (
          <UploadDocuments onDroppedFiles={onDroppedFiles} />
        ) : (
          <div>
            {attachments.map((attachment) => {
              return (
                <div key={attachment.name} className="w-full bg-white border border-dashed border-gray-300 py-1 px-2 text-sm">
                  {attachment.name}
                </div>
              );
            })}
          </div>
        )}
        {attachments.map((item, idx) => {
          return <input key={idx} type="hidden" name="attachments[]" value={JSON.stringify(item)} />;
        })}
      </div>

      <div className="flex items-baseline justify-end space-x-2">
        <ButtonPrimary type="submit" disabled={state === "submitting"}>
          Send
        </ButtonPrimary>
      </div>

      <ErrorModal ref={errorModal} />
      <SuccessModal ref={successModal} />
    </Form>
  );
}
