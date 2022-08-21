import { useEffect, useRef, useState } from "react";
import { ActionFunction, json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";
import InputNumber from "~/components/ui/input/InputNumber";
import InputText from "~/components/ui/input/InputText";
import ErrorModal, { RefErrorModal } from "~/components/ui/modals/ErrorModal";
import SuccessModal, { RefSuccessModal } from "~/components/ui/modals/SuccessModal";
import Stripe from "stripe";

type LoaderData = {
  title: string;
  stripeSectretKey: string;
};
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    title: "Create pricing plans with Stripe | RemixBlocks",
    stripeSectretKey: process.env.STRIPE_SK?.toString() ?? "",
  };
  return json(data);
};

type ActionData = {
  success?: string;
  error?: string;
  stripeProduct?: Stripe.Product;
  stripeProducts?: Stripe.ApiList<Stripe.Product>;
};
const success = (data: ActionData) => json(data, { status: 200 });
const badRequest = (data: ActionData) => json(data, { status: 400 });
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const STRIPE_SK = form.get("stripe-secret-key")?.toString() ?? ""; // process.env.STRIPE_SK;

  const name = form.get("name")?.toString() ?? "";
  const description = form.get("description")?.toString() ?? "";
  const priceMonthly = Number(form.get("price-monthly"));
  const priceYearly = Number(form.get("price-yearly"));

  if (!name) {
    return badRequest({ error: "Name is required" });
  }

  if (priceMonthly < 0 || priceYearly < 0) {
    return badRequest({ error: "Prices must be greater than 0" });
  }

  try {
    const stripe = new Stripe(STRIPE_SK, {
      apiVersion: "2020-08-27",
    });
    const stripeProduct = await stripe.products
      .create({
        name,
        description,
      })
      .catch(() => {
        return undefined;
      });
    await stripe.prices.create({
      product: stripeProduct?.id,
      unit_amount: priceMonthly,
      currency: "usd",
    });
    await stripe.prices.create({
      product: stripeProduct?.id,
      unit_amount: priceYearly,
      currency: "usd",
    });

    const stripeProducts = await stripe.products.list();
    return success({
      success: "Product created with ID: " + stripeProduct?.id,
      stripeProducts,
      stripeProduct,
    });
  } catch (e: any) {
    return badRequest({ error: e.message });
  }
};

export const meta: MetaFunction = ({ data }) => ({
  title: data?.title,
});

export default function Example() {
  const data = useLoaderData<LoaderData>();
  const actionData = useActionData<ActionData>();
  const transition = useTransition();

  const successModal = useRef<RefSuccessModal>(null);
  const errorModal = useRef<RefErrorModal>(null);

  const [stripeSectretKey, setStripeSectretKey] = useState(data.stripeSectretKey);

  useEffect(() => {
    if (actionData?.error) {
      errorModal.current?.show(actionData.error);
    }
    if (actionData?.success) {
      successModal.current?.show("Stripe product created", actionData.success);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <Form method="post" className="space-y-3">
      {/* TODO: DELETE SET UP LINES - START */}
      <InputText
        name="stripe-secret-key"
        title="Stripe secret key (we don't store this)"
        value={stripeSectretKey}
        setValue={setStripeSectretKey}
        required
        autoComplete="off"
        hint={
          <a className="underline text-theme-500 hover:text-theme-600" href="https://dashboard.stripe.com/test/developers" target="_blank" rel="noreferrer">
            Get secret key
          </a>
        }
      />
      {/* TODO: DELETE SET UP LINES - END */}

      <InputText name="name" title="Plan name" value="Basic" required />
      <InputText name="description" title="Description" value="My basic plan" required />
      <div className="flex space-x-2">
        <InputNumber name="price-monthly" title="Monthly price" value={10} required className="w-1/2" />
        <InputNumber name="price-yearly" title="Yearly price" value={100} required className="w-1/2" />
      </div>

      <div className="flex justify-between space-x-2">
        <div>
          {actionData?.stripeProduct && (
            <a
              className="underline hover:text-theme-500 cursor-pointer"
              href={`https://dashboard.stripe.com/test/products/${actionData?.stripeProduct.id}`}
              target="_blank"
              rel="noreferrer"
            >
              View product: {actionData?.stripeProduct.id}
            </a>
          )}
        </div>
        <ButtonPrimary type="submit" disabled={transition.state === "submitting"}>
          Create
        </ButtonPrimary>
      </div>

      <ErrorModal ref={errorModal} />
      <SuccessModal ref={successModal} />
    </Form>
  );
}
