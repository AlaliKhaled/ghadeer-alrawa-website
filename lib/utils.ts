type ClassValue = string | number | false | null | undefined;

/** Tiny classnames joiner (no external deps). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
