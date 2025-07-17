export const formatCurrency = (amount: number, currency?: string) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: currency ?? "USD",
  });
};

export const formatDate = ({
  date,
  options: defaultOptions,
}: {
  date: string;
  options?: Intl.DateTimeFormatOptions;
}): string => {
  const options: Intl.DateTimeFormatOptions = defaultOptions ?? {
    dateStyle: "short",
    timeStyle: "short",
  };

  const releaseFormat = new Date(date).toLocaleString("en-US", options);

  return releaseFormat;
};
