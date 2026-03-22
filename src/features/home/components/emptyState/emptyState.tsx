type EmptyStateProps = {
  searchTerm: string;
};

export function EmptyState({ searchTerm }: EmptyStateProps) {
  const trimmedSearchTerm = searchTerm.trim();
  const emptyMessage = trimmedSearchTerm
    ? `No products found for "${trimmedSearchTerm}".`
    : 'No products available right now.';

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-10 text-center text-sm text-slate-600">
      {emptyMessage}
    </div>
  );
}
