export const IPO_THEME_MAP = {
  INPUT: {
    label: 'Tahap 1: Input Devices',
    stageNumber: '01',
    badge: 'badge-default',
    badgeVariant: 'default' as const,
    accentBg: 'icon-box',
    softCard: 'card-base text-content',
    borderLeft: 'card-interactive',
    icon: 'input',
  },
  PROCESS: {
    label: 'Tahap 2: Processing Unit',
    stageNumber: '02',
    badge: 'badge-accent',
    badgeVariant: 'accent' as const,
    accentBg: 'icon-box',
    softCard: 'card-base text-content',
    borderLeft: 'card-interactive',
    icon: 'memory',
  },
  OUTPUT: {
    label: 'Tahap 3: Output Devices',
    stageNumber: '03',
    badge: 'badge-default',
    badgeVariant: 'default' as const,
    accentBg: 'icon-box',
    softCard: 'card-base text-content',
    borderLeft: 'card-interactive',
    icon: 'output',
  },
  STORAGE_SOFTWARE: {
    label: 'Tahap 4: Software & Storage',
    stageNumber: '04',
    badge: 'badge-default',
    badgeVariant: 'default' as const,
    accentBg: 'icon-box',
    softCard: 'card-base text-content',
    borderLeft: 'card-interactive',
    icon: 'save',
  },
} as const;

export type IPOModuleCategoryKey = keyof typeof IPO_THEME_MAP;
