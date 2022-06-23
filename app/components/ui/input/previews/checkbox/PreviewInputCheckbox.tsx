import InputCheckbox from "~/components/ui/input/InputCheckbox";

export default function PreviewInputCheckbox() {
  return (
    <div id="input-checkbox">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <InputCheckbox name="name" title="Title" />
      </div>
    </div>
  );
}
