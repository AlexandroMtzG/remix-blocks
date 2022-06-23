import DateUtils from "~/utils/shared/DateUtils";
import NumberUtils from "~/utils/shared/NumberUtils";
import TableSimple from "./TableSimple";

const items = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    salary: 100,
    birthday: new Date(1990, 1, 1),
  },
  {
    firstName: "Luna",
    lastName: "Davis",
    email: "luna.davis@company.com",
    salary: 100.5,
    birthday: new Date(1990, 12, 31),
  },
];
export default function PreviewTableSimple() {
  return (
    <div id="buttons">
      <div className="bg-white p-6 border-dashed border-gray-300 border not-prose">
        <div className="space-y-2 w-full">
          <TableSimple
            items={items}
            headers={[
              {
                title: "Full name",
                name: "name",
                value: (item) => `${item.firstName} ${item.lastName}`,
              },
              {
                title: "Email",
                name: "email",
                value: (item) => item.email,
              },
              {
                title: "Salary",
                name: "salary",
                className: "text-blue-500",
                value: (item) => item.salary,
                formattedValue: (item) => NumberUtils.decimalFormat(item.salary),
              },
              {
                title: "Birthday",
                name: "birthday",
                className: "text-gray-400",
                value: (item) => item.birthday,
                formattedValue: (item) => DateUtils.dateYMD(item.birthday),
              },
            ]}
            actions={[
              {
                title: "View",
                onClick: (_, item) => alert("Clicked: " + item.firstName),
              },
            ]}
          ></TableSimple>
        </div>
      </div>
    </div>
  );
}
