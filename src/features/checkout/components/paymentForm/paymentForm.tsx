import { Controller, useFormContext } from 'react-hook-form';
import { Input } from '../../../../shared/components/input';
import type { CheckoutFormValues } from '../../types/checkoutFormValues';
import { formatCardNumber, formatCvv, formatExpiry } from '../../helpers/inputMasks';

const EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_PATTERN = /^\d{3,4}$/;

function cardDigits(value: string): string {
  return value.replace(/\D/g, '');
}

export function PaymentForm() {
  const { control } = useFormContext<CheckoutFormValues>();

  return (
    <section className="rounded-3xl bg-white px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:px-8 md:py-8">
      <h2 className="text-lg font-semibold text-slate-900">Payment Method</h2>

      <div className="mt-6 space-y-5">
        <Controller
          name="cardNumber"
          control={control}
          rules={{
            required: 'Card number is required',
            validate: (v) => {
              const n = cardDigits(v);
              return (n.length >= 13 && n.length <= 19) || 'Enter a valid card number';
            },
          }}
          render={({ field, fieldState }) => (
            <Input
              id="cardNumber"
              label="Card Number"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
              required
              error={fieldState.error?.message}
              name={field.name}
              ref={field.ref}
              value={field.value ?? ''}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
            />
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="expiry"
            control={control}
            rules={{
              required: 'Expiry is required',
              pattern: { value: EXPIRY_PATTERN, message: 'Use MM/YY' },
            }}
            render={({ field, fieldState }) => (
              <Input
                id="expiry"
                label="Expiry"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                required
                error={fieldState.error?.message}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ''}
                onBlur={field.onBlur}
                onChange={(e) => field.onChange(formatExpiry(e.target.value))}
              />
            )}
          />
          <Controller
            name="cvv"
            control={control}
            rules={{
              required: 'CVV is required',
              pattern: { value: CVV_PATTERN, message: 'CVV must be 3 or 4 digits' },
            }}
            render={({ field, fieldState }) => (
              <Input
                id="cvv"
                label="CVV"
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                required
                maxLength={4}
                error={fieldState.error?.message}
                name={field.name}
                ref={field.ref}
                value={field.value ?? ''}
                onBlur={field.onBlur}
                onChange={(e) => field.onChange(formatCvv(e.target.value))}
              />
            )}
          />
        </div>
      </div>
    </section>
  );
}
