import InputText from "../InputText";

export default function PreviewInputText() {
  return (
    <div id="input-text">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <InputText name="name" title="Title" />
      </div>
    </div>
  );
}
