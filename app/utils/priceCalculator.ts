export const PRICE_PER_VISITOR = 100;

export function calculateTotal(visitorCount: number): number {
  if (!visitorCount || visitorCount < 1) return 0;
  return visitorCount * PRICE_PER_VISITOR;
}
