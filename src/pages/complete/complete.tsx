import { useSearchParams } from 'react-router-dom';
import { ReactComponent as CheckCircleIcon } from '../../shared/assets/check-circle.svg';
import { ReactComponent as PackageIcon } from '../../shared/assets/package.svg';
import { ReactComponent as ArrowRightIcon } from '../../shared/assets/arrow-right.svg';
import { Button } from '../../shared/components/button';

export function Complete() {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order') ?? '---';

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="rounded-3xl bg-white p-12 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircleIcon className="h-10 w-10 text-primary" />
        </div>

        <h1 className="mb-2 text-3xl font-semibold text-slate-900">Order Confirmed!</h1>

        <p className="mb-8 text-lg text-slate-500">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <div className="mb-8 rounded-2xl bg-slate-100 p-6">
          <div className="mb-2 flex items-center justify-center gap-3">
            <PackageIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Order Number
            </span>
          </div>
          <p className="text-2xl font-bold tracking-wider text-slate-900">{orderNumber}</p>
        </div>

        <p className="mb-8 text-sm text-slate-500">
          You will receive a confirmation email with your order details and tracking information
          shortly.
        </p>

        <Button to="/" className="w-auto px-10">
          Continue Shopping
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default Complete;
