type ProductDetail = {
  label: string;
  value: string;
};

type SpecsProps = {
  details: ProductDetail[];
};

export function Specs({ details }: SpecsProps) {
  return (
    <div className="mt-8 border-t border-slate-200 pt-8">
      <h3 className="mb-4 font-semibold text-slate-900">Product Details</h3>
      <dl className="space-y-3 text-[0.9375rem]">
        {details.map((detail) => (
          <div key={detail.label} className="flex justify-between gap-4">
            <dt className="text-slate-500">{detail.label}</dt>
            <dd className="font-medium text-slate-900">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
