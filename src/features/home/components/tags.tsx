import { Tag } from '../../../shared/components/tag';

const popularTags = [
  'Gaming',
  'Retro Tech',
  'Alien',
  'Toys',
  'Arcade',
  'Vintage Electronics',
] as const;

type TrendingTagsProps = {
  selectedTag: string;
  onSelectTag: (tag: string) => void;
};

export function TrendingTags({ selectedTag, onSelectTag }: TrendingTagsProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
      <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Popular Tags
      </span>
      {popularTags.map((tag) => (
        <Tag
          key={tag}
          aria-pressed={selectedTag === tag}
          onClick={() => onSelectTag(selectedTag === tag ? '' : tag)}
          className={
            selectedTag === tag
              ? 'bg-primary text-white border-primary hover:bg-primary/90'
              : undefined
          }
        >
          {tag}
        </Tag>
      ))}
    </div>
  );
}
