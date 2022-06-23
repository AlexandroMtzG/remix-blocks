import { LoaderFunction, json, MetaFunction } from "remix";
import { useLoaderData } from "@remix-run/react";
import TableSimple from "~/components/ui/tables/TableSimple";

interface EmployeeDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

type LoaderData = {
  title: string;
  items: EmployeeDto[];
};
export let loader: LoaderFunction = async () => {
  const items: EmployeeDto[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@company.com",
      phone: "555-555-5555",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Deo",
      email: "jane.deo@company.com",
      phone: "777-777-777",
    },
  ];

  const data: LoaderData = {
    title: "Table | RemixBlocks",
    items,
  };
  return json(data);
};

export const meta: MetaFunction = ({ data }) => ({
  title: data?.title,
});

export default function Example() {
  const data = useLoaderData<LoaderData>();
  return (
    <TableSimple
      items={data.items}
      actions={[
        {
          title: "Click here",
          onClick: (_, i) => alert(`${i.firstName} ${i.lastName}`),
        },
      ]}
      headers={[
        {
          name: "firstName",
          title: "First Name",
          value: (i) => i.firstName,
        },
        {
          name: "lastName",
          title: "Last Name",
          value: (i) => i.lastName,
        },
        {
          name: "email",
          title: "Email",
          value: (i) => i.email,
          className: "w-full",
        },
        {
          name: "phone",
          title: "Phone",
          value: (i) => i.phone,
          breakpoint: "xl",
        },
      ]}
    />
  );
}
