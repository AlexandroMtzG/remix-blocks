import InputNumber from "~/components/ui/input/InputNumber";

export default function PreviewInputNumber() {
  return (
    <div id="input-number">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <InputNumber name="name" title="Title" />
      </div>
    </div>
  );
}
