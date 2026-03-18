import { Tag } from '../../../shared/components/tag';

const popularTags = [
  'Gaming',
  'Retro Tech',
  'Sneakers',
  'Toys',
  'Arcade',
  'Vintage Electronics',
] as const;

export function TrendingTags() {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Popular Tags
      </span>
      {popularTags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );
}
