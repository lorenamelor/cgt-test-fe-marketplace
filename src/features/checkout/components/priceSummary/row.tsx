type RowProps = {
  label: string;
  value: string;
};

export function Row({ label, value }: RowProps) {
  return (
    <div className="flex justify-between">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-medium text-slate-900">{value}</dd>
    </div>
  );
}
