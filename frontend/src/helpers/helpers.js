export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParam = searchParams.has(key);

  if (value && hasValueInParam) {
    searchParams.set(key, value); // Update
  } else if (value) {
    searchParams.append(key, value); // Create
  } else if (hasValueInParam) {
    searchParams.delete(key); // Delete
  }

  return searchParams;
};