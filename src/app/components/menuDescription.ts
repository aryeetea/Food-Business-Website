export const getDescriptionItems = (description?: string) =>
  (description ?? '')
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);
