import InputSelector from "~/components/ui/input/InputSelector";

export default function PreviewInputSelector() {
  return (
    <div id="input-selector">
      <div className="bg-white p-6 border-dashed border-gray-300 border not-prose">
        <InputSelector
          name="name"
          title="Title"
          options={[
            {
              name: "Option 1",
              value: "1",
            },
            {
              name: "Option 2",
              value: "2",
            },
          ]}
        />
      </div>
    </div>
  );
}
