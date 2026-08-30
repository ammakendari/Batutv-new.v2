export type NavigationTargetType = 'internal' | 'external';
export type NavigationInternalType = 'kategori' | 'page' | 'custom';

export interface NavigationItem {
  id: string;
  label: string;
  type: NavigationTargetType;
  targetType?: NavigationInternalType;
  targetId?: string;
  url: string;
  slug: string;
  parentId?: string | null;
  sortOrder: number;
  active: boolean;
  openNewTab: boolean;
  icon?: 'home' | 'video' | string;
  createdAt: string;
  updatedAt: string;
}

export interface NavigationItemWithChildren extends NavigationItem {
  children?: NavigationItemWithChildren[];
}

// Backwards compatibility alias
export type NavItemData = NavigationItem;
export type NavItemWithChildren = NavigationItemWithChildren;
