export function formatFileSizeDisplay(value: number): string {
  if (value < 1024) {
    return `${value} KB`;
  }
  return `${parseFloat((value / 1024).toFixed(1))} MB`;
}

export function openUrlInNewTab(url: string | undefined, name?: string): void {
  if (!url) {
    console.log(`URL for ${name ?? 'link'} not found`);
    return;
  }
  window.open(url, '_blank')?.focus();
}
