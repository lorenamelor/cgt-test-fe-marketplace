type MainImageProps = {
  src: string;
  alt: string;
};

export function MainImage({ src, alt }: MainImageProps) {
  return (
    <div className="mb-4 aspect-[4/3] overflow-hidden rounded-3xl bg-white shadow-[0_22px_45px_rgba(15,23,42,0.08)]">
      <img src={src} alt={alt} className="h-full w-full rounded-3xl object-cover" />
    </div>
  );
}
