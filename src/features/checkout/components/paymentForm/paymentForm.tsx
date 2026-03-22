import { useFormContext } from 'react-hook-form';
import { Input } from '../../../../shared/components/input';
import type { CheckoutFormValues } from '../../types/checkoutFormValues';

const EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_PATTERN = /^\d{3,4}$/;

function cardDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function PaymentForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <section className="rounded-3xl bg-white px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:px-8 md:py-8">
      <h2 className="text-lg font-semibold text-slate-900">Payment Method</h2>

      <div className="mt-6 space-y-5">
        <Input
          id="cardNumber"
          label="Card Number"
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4242 4242 4242 4242"
          required
          error={errors.cardNumber?.message}
          {...register('cardNumber', {
            required: 'Card number is required',
            validate: (v) => {
              const n = cardDigits(v);
              return (n.length >= 13 && n.length <= 19) || 'Enter a valid card number';
            },
          })}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="expiry"
            label="Expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            required
            error={errors.expiry?.message}
            {...register('expiry', {
              required: 'Expiry is required',
              pattern: { value: EXPIRY_PATTERN, message: 'Use MM/YY' },
            })}
          />
          <Input
            id="cvv"
            label="CVV"
            type="password"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            required
            error={errors.cvv?.message}
            {...register('cvv', {
              required: 'CVV is required',
              pattern: { value: CVV_PATTERN, message: 'CVV must be 3 or 4 digits' },
            })}
          />
        </div>
      </div>
    </section>
  );
}
