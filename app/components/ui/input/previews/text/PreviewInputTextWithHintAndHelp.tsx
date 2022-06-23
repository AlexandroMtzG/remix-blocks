import InputText from "~/components/ui/input/InputText";

export default function PreviewInputTextWithHint() {
  return (
    <div id="input-text-with-hint-and-help">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <InputText name="name" title="Title" hint={<span className="text-red-500">Hint text</span>} />
      </div>
    </div>
  );
}
