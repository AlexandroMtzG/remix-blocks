import { FormEvent, useState } from "react";
import { LoaderFunction, json, MetaFunction, ActionFunction } from "remix";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";
import InputText from "~/components/ui/input/InputText";

type LoaderData = {
  title: string;
};
export let loader: LoaderFunction = async ({ request }) => {
  const data: LoaderData = {
    title: "Multiple forms on one route | RemixBlocks",
  };
  return json(data);
};

type ActionData = { action?: string; success?: string; error?: string };
const success = ({ action, success }: ActionData) => json({ action, success }, { status: 200 });
const badRequest = ({ action, error }: ActionData) => json({ action, error }, { status: 400 });
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("action")?.toString();
  const firstName = form.get("first-name")?.toString();
  const lastName = form.get("last-name")?.toString();

  if (!lastName) {
    return badRequest({ action, error: "Last name is required" });
  }

  switch (action) {
    case "<Form>":
    case "handleSubmit":
    case "manualSubmit":
      return success({ action, success: `${firstName} ${lastName}` });
    default: {
      return badRequest({ error: "Invalid action" });
    }
  }
};

export const meta: MetaFunction = ({ data }) => ({
  title: data?.title,
});

export default function Example() {
  const submit = useSubmit();

  const [firstName, setFirstName] = useState("Alex");
  const [lastName, setLastName] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.stopPropagation();
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    submit(formData, {
      method: "post",
    });
  }

  function onSubmit() {
    const formData = new FormData();
    formData.set("action", "manualSubmit");
    formData.set("first-name", firstName);
    formData.set("last-name", lastName);
    submit(formData, {
      method: "post",
    });
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
      <div>
        <h3 className="font-bold">{`<Form...`}</h3>
        <Form method="post" className="space-y-3">
          <input hidden readOnly name="action" value="<Form>" />

          <InputText name="first-name" title="First name" value="John" />
          <InputText name="last-name" title="Last name" value="" />

          <div className="flex justify-between space-x-2">
            <FormResultMessage action="<Form>" />
            <ButtonPrimary type="submit"> Submit</ButtonPrimary>
          </div>
        </Form>
      </div>

      <div>
        <h3 className="font-bold">Handle Submit</h3>
        <Form method="post" className="space-y-3" onSubmit={handleSubmit}>
          <input hidden readOnly name="action" value="handleSubmit" />

          <InputText name="first-name" title="First name" value="Luna" />
          <InputText name="last-name" title="Last name" value="" />

          <div className="flex justify-between space-x-2">
            <FormResultMessage action="handleSubmit" />
            <ButtonPrimary type="submit">Submit</ButtonPrimary>
          </div>
        </Form>
      </div>

      <div>
        <h3 className="font-bold">Manual Submit</h3>
        <div className="space-y-3">
          <InputText name="first-name" title="First name" value={firstName} setValue={setFirstName} />
          <InputText name="last-name" title="Last name" value={lastName} setValue={setLastName} />

          <div className="flex justify-between space-x-2">
            <FormResultMessage action="manualSubmit" />
            <ButtonPrimary onClick={onSubmit}>Submit</ButtonPrimary>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormResultMessage({ action }: { action?: string }) {
  const actionData = useActionData<ActionData>();
  return (
    <div className="truncate">
      {actionData && action === actionData.action && (
        <div>
          <div>
            {actionData.success ? (
              <p className="text-teal-500 text-sm py-2">{actionData.success}</p>
            ) : actionData.error ? (
              <p className="text-red-500 text-sm py-2">{actionData.error}</p>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
