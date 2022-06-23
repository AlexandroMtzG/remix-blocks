import InputDate from "~/components/ui/input/InputDate";

export default function PreviewInputDate() {
  return (
    <div id="input-date">
      <div className="bg-white p-6 border-dashed border-gray-300 border">
        <InputDate name="name" title="Title" />
      </div>
    </div>
  );
}
