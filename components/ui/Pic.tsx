// <picture> with WebP + JPG fallback when `src` has no extension (legacy "/img/x" → x.webp + x.jpg).
// A `src` with an extension (e.g. a CMS upload "/img/products/x/image.png") renders as a plain <img>.
export const hasExt = (src: string) => /\.[a-z0-9]{2,5}$/i.test(src);
export default function Pic({ src, alt, width, height, priority = false, sizes, className, highFetch = true }: {
  src: string; alt: string; width: number; height: number; priority?: boolean; sizes?: string; className?: string; highFetch?: boolean;
}) {
  const img = <img src={hasExt(src) ? src : `${src}.jpg`} alt={alt} width={width} height={height} sizes={sizes}
    loading={priority ? 'eager' : 'lazy'} fetchPriority={priority && highFetch ? 'high' : undefined} decoding="async" />;
  if (hasExt(src)) return className ? <picture className={className}>{img}</picture> : <picture>{img}</picture>;
  return (
    <picture className={className}>
      <source srcSet={`${src}.webp`} type="image/webp" />
      {img}
    </picture>
  );
}
