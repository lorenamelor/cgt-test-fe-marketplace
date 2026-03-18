export type StarRatingProps = {
  rating: number;
  reviewCount: number;
};

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  const fullStars = Math.min(5, Math.round(rating));
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }, (_, i) => (
        <span key={`full-${i}`} className="text-amber-400" aria-hidden="true">
          ★
        </span>
      ))}
      {Array.from({ length: emptyStars }, (_, i) => (
        <span key={`empty-${i}`} className="text-slate-300" aria-hidden="true">
          ☆
        </span>
      ))}
      <span className="ml-1 text-sm text-slate-500">({reviewCount})</span>
    </div>
  );
}
