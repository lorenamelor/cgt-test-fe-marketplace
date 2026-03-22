import { useFormContext } from 'react-hook-form';
import { Input } from '../../../../shared/components/input';
import type { CheckoutFormValues } from '../../types/checkoutFormValues';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ZIP_PATTERN = /^\d{5}(-\d{4})?$/;

export function ShippingForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();

  return (
    <section className="rounded-3xl bg-white px-6 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] md:px-8 md:py-8">
      <h2 className="text-lg font-semibold text-slate-900">Shipping Information</h2>

      <div className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            autoComplete="given-name"
            placeholder="John"
            required
            error={errors.firstName?.message}
            {...register('firstName', { required: 'First name is required' })}
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            autoComplete="family-name"
            placeholder="Doe"
            required
            error={errors.lastName?.message}
            {...register('lastName', { required: 'Last name is required' })}
          />
        </div>

        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          required
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email' },
          })}
        />

        <Input
          id="address"
          label="Address"
          type="text"
          autoComplete="street-address"
          placeholder="123 Main St"
          required
          error={errors.address?.message}
          {...register('address', { required: 'Address is required' })}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="city"
            label="City"
            type="text"
            autoComplete="address-level2"
            placeholder="New York"
            required
            error={errors.city?.message}
            {...register('city', { required: 'City is required' })}
          />
          <Input
            id="zipCode"
            label="Zip Code"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="10001"
            required
            error={errors.zipCode?.message}
            {...register('zipCode', {
              required: 'Zip code is required',
              pattern: { value: ZIP_PATTERN, message: 'Use 5 digits or ZIP+4' },
            })}
          />
        </div>
      </div>
    </section>
  );
}
