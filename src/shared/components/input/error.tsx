type InputErrorProps = {
  hasError: boolean;
  errorId?: string;
  message?: string;
};

export function InputError({ hasError, errorId, message }: InputErrorProps) {
  if (!hasError || !errorId || !message) return null;
  return (
    <p id={errorId} className="mt-1.5 text-xs text-red-600" role="alert">
      {message}
    </p>
  );
}
