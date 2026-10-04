export const dynamicQueryEndpoint = (
  params: Record<string, unknown>,
): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();

  return queryString ? `?${queryString}` : "";
};
