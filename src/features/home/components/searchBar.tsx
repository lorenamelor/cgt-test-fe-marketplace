import { ReactComponent as SearchIcon } from '../../../shared/assets/search.svg';
import { Button } from '../../../shared/components/button';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <form
      role="search"
      aria-label="Search products"
      className="relative mx-auto flex w-full max-w-[672px] items-stretch"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="relative min-w-0 flex-1">
        <SearchIcon
          aria-hidden
          className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          aria-label="Search products"
          placeholder="Search retro products..."
          className="h-14 w-full rounded-l-[28px] bg-white pl-14 pr-4 text-[0.9375rem] text-slate-700 placeholder:text-slate-400 shadow-[0_18px_40px_rgba(15,23,42,0.08)] outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
      <Button
        type="submit"
        className="h-14 w-auto shrink-0 rounded-l-none rounded-r-[28px] px-8 text-[0.9375rem]"
      >
        Search
      </Button>
    </form>
  );
}
