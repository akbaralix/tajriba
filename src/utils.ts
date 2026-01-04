// utils.ts

export const formatTime = (createdAt: string) => {
  if (!createdAt) return "Noma'lum vaqt";

  const created = new Date(createdAt);
  if (isNaN(created.getTime())) return "Noma'lum vaqt";

  const now = new Date();
  const diffMs = now.getTime() - created.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) return `${diffSec}s`;
  if (diffMin < 60) return `${diffMin}m`;
  if (diffHour < 24) return `${diffHour}h`;
  if (diffDay < 7) return `${diffDay}d`;
  return `${diffWeek}w`;
};
