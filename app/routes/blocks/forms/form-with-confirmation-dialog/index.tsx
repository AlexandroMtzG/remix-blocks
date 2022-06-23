import { FormEvent, useRef, useState } from "react";
import { LoaderFunction, json, ActionFunction, MetaFunction, useActionData, useTransition, useSubmit, Form } from "remix";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";
import InputText from "~/components/ui/input/InputText";
import ConfirmModal, { RefConfirmModal } from "~/components/ui/modals/ConfirmModal";

type LoaderData = {
  title: string;
};
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    title: "Form with confirmation dialog | RemixBlocks",
  };
  return json(data);
};

type ActionData = { success?: string; error?: string };
const success = (data: ActionData) => json(data, { status: 200 });
const badRequest = (data: ActionData) => json(data, { status: 400 });
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const email = form.get("email")?.toString();
  const password = form.get("password")?.toString();

  if (!email || !password) {
    return badRequest({ error: "Email and password are required" });
  }

  if (password.length < 8) {
    return badRequest({ error: "Password must be at least 8 characters" });
  }

  // TODO: Validate email and password, next line is just for demo
  await new Promise((r) => setTimeout(r, 1000));

  return success({
    success: `Form submitted: ${email}`,
  });
};

export const meta: MetaFunction = ({ data }) => ({
  title: data?.title,
});

export default function Example() {
  const actionData = useActionData<ActionData>();
  const transition = useTransition();
  const submit = useSubmit();

  const [formData, setFormData] = useState<FormData>();

  const confirmModal = useRef<RefConfirmModal>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setFormData(formData);
    confirmModal.current?.show("Confirm?", "Yes", "Cancel", "Are you sure?");
  }

  function onConfirmed() {
    if (formData) {
      submit(formData, {
        method: "post",
      });
    }
  }

  return (
    <Form method="post" onSubmit={handleSubmit} className="space-y-3">
      <InputText type="email" name="email" title="Email" required disabled={transition.state === "submitting"} />
      <InputText
        type="password"
        name="password"
        title="Password"
        required
        disabled={transition.state === "submitting"}
        hint={<div className="font-light italic">At least 8 characters</div>}
      />

      <div className="flex justify-between space-x-2">
        <div className="truncate">
          {actionData?.success ? (
            <p className="text-teal-500 text-sm py-2">{actionData.success}</p>
          ) : actionData?.error ? (
            <p className="text-red-500 text-sm py-2">{actionData?.error}</p>
          ) : null}
        </div>
        <ButtonPrimary type="submit" disabled={transition.state === "submitting"}>
          {transition.state === "submitting" ? "Submitting..." : "Submit"}
        </ButtonPrimary>

        <ConfirmModal ref={confirmModal} onYes={onConfirmed} />
      </div>
    </Form>
  );
}
