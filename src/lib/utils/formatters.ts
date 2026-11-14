export function formatDateToWIB(dateValue: Date | string | number | null | undefined): string {
  if (!dateValue) {
    return '-';
  }

  const parsedDate = typeof dateValue === 'string' || typeof dateValue === 'number' ? new Date(dateValue) : dateValue;
  if (isNaN(parsedDate.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(parsedDate) + ' WIB';
}

export function formatDecimalScore(scoreValue: number | string | null | undefined): string {
  if (scoreValue === null || scoreValue === undefined) {
    return '0.00';
  }
  const numericValue = typeof scoreValue === 'string' ? parseFloat(scoreValue) : scoreValue;
  return numericValue.toFixed(2);
}
