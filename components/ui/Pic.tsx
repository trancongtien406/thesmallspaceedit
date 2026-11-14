// <picture> with WebP + JPG fallback. `src` is the path without extension.
export default function Pic({ src, alt, width, height, priority = false, sizes, className }: {
  src: string; alt: string; width: number; height: number; priority?: boolean; sizes?: string; className?: string;
}) {
  return (
    <picture className={className}>
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.jpg`} alt={alt} width={width} height={height} sizes={sizes}
        loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
    </picture>
  );
}
