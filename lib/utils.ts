export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]): string {
  return classes
    .flatMap(cls => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null && !Array.isArray(cls)) {
        return Object.keys(cls)
          .filter(key => cls[key])
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}