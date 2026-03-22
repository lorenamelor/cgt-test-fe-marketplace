type InputLabelProps = {
  htmlFor?: string;
  text?: string;
  required?: boolean;
};

export function InputLabel({ htmlFor, text, required: isRequired }: InputLabelProps) {
  if (!text) return null;
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400"
    >
      {text}
      {isRequired ? (
        <abbr title="required" className="ml-0.5 font-semibold text-slate-500 no-underline">
          *
        </abbr>
      ) : null}
    </label>
  );
}
