export const dynamicQueryEndpoint = (
  params: Record<string, unknown>,
): string => {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();

  return queryString ? `?${queryString}` : "";
};
