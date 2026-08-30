import { NavigationItem, NavigationItemWithChildren } from '../types/navigation';

export const INITIAL_NAVIGATION_DATA: NavigationItem[] = [
  {
    id: 'nav-home',
    label: 'HOME',
    type: 'internal',
    targetType: 'custom',
    targetId: 'home',
    url: '/',
    slug: 'home',
    parentId: null,
    sortOrder: 1,
    active: true,
    openNewTab: false,
    icon: 'home',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-news',
    label: 'NEWS',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'nasional',
    url: '/kategori/nasional',
    slug: 'news',
    parentId: null,
    sortOrder: 2,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-nasional',
    label: 'Nasional',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'nasional',
    url: '/kategori/nasional',
    slug: 'nasional',
    parentId: 'nav-news',
    sortOrder: 1,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-internasional',
    label: 'Internasional',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'internasional',
    url: '/kategori/internasional',
    slug: 'internasional',
    parentId: 'nav-news',
    sortOrder: 2,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-opini',
    label: 'Opini',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'opini',
    url: '/kategori/opini',
    slug: 'opini',
    parentId: 'nav-news',
    sortOrder: 3,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-ekonomi',
    label: 'EKONOMI BISNIS',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'ekonomi-bisnis',
    url: '/kategori/ekonomi-bisnis',
    slug: 'ekonomi-bisnis',
    parentId: null,
    sortOrder: 3,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-sub-ekonomi',
    label: 'Ekonomi',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'ekonomi-bisnis',
    url: '/kategori/ekonomi-bisnis',
    slug: 'ekonomi',
    parentId: 'nav-ekonomi',
    sortOrder: 1,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-sub-bisnis',
    label: 'Bisnis',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'bisnis',
    url: '/kategori/bisnis',
    slug: 'bisnis',
    parentId: 'nav-ekonomi',
    sortOrder: 2,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-sub-keuangan',
    label: 'Keuangan',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'keuangan',
    url: '/kategori/keuangan',
    slug: 'keuangan',
    parentId: 'nav-ekonomi',
    sortOrder: 3,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-daerah',
    label: 'DAERAH',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'daerah',
    url: '/kategori/daerah',
    slug: 'daerah',
    parentId: null,
    sortOrder: 4,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-sub-batu',
    label: 'Batu',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'kota-batu',
    url: '/kategori/daerah',
    slug: 'batu',
    parentId: 'nav-daerah',
    sortOrder: 1,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-sub-malang',
    label: 'Malang',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'malang-raya',
    url: '/kategori/malang-raya',
    slug: 'malang',
    parentId: 'nav-daerah',
    sortOrder: 2,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-sub-jatim',
    label: 'Jawa Timur',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'jawa-timur',
    url: '/kategori/jawa-timur',
    slug: 'jawa-timur',
    parentId: 'nav-daerah',
    sortOrder: 3,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-sport',
    label: 'SPORT',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'olahraga',
    url: '/kategori/olahraga',
    slug: 'sport',
    parentId: null,
    sortOrder: 5,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-sub-bola',
    label: 'Sepak Bola',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'sepak-bola',
    url: '/kategori/sepak-bola',
    slug: 'sepak-bola',
    parentId: 'nav-sport',
    sortOrder: 1,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-sub-olahraga',
    label: 'Olahraga',
    type: 'internal',
    targetType: 'kategori',
    targetId: 'olahraga',
    url: '/kategori/olahraga',
    slug: 'olahraga',
    parentId: 'nav-sport',
    sortOrder: 2,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
  {
    id: 'nav-video',
    label: 'VIDEO',
    type: 'internal',
    targetType: 'custom',
    targetId: 'video',
    url: '/video',
    slug: 'video',
    parentId: null,
    sortOrder: 6,
    active: true,
    openNewTab: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-08-28T00:00:00.000Z',
  },
];

const NAVIGATION_STORAGE_KEY = 'batutv_primary_navigation_v4';

/**
 * Dispatch custom event for real-time reactivity across components
 */
function notifyNavigationChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('batutv_navigation_updated'));
  }
}

/**
 * Generate slug helper
 */
export function generateNavSlug(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Retrieve all raw navigation items from localStorage or initial dataset
 */
export function getStoredNavItems(): NavigationItem[] {
  if (typeof window === 'undefined') {
    return INITIAL_NAVIGATION_DATA;
  }

  try {
    const raw = localStorage.getItem(NAVIGATION_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(NAVIGATION_STORAGE_KEY, JSON.stringify(INITIAL_NAVIGATION_DATA));
      return INITIAL_NAVIGATION_DATA;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(NAVIGATION_STORAGE_KEY, JSON.stringify(INITIAL_NAVIGATION_DATA));
    return INITIAL_NAVIGATION_DATA;
  } catch (err) {
    console.error('Error reading primary navigation data:', err);
    return INITIAL_NAVIGATION_DATA;
  }
}

/**
 * Save raw navigation items to localStorage and notify listeners
 */
export function saveNavItems(items: NavigationItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(NAVIGATION_STORAGE_KEY, JSON.stringify(items));
    notifyNavigationChanged();
  } catch (err) {
    console.error('Error saving primary navigation data:', err);
  }
}

/**
 * Build 2-level public navigation tree (only active items, sorted by sortOrder)
 */
export function getPublicNavigationTree(): NavigationItemWithChildren[] {
  const allItems = getStoredNavItems();
  const activeItems = allItems.filter((item) => item.active);

  // Parents (Level 1)
  const parents: NavigationItemWithChildren[] = activeItems
    .filter((item) => !item.parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((parent) => ({
      ...parent,
      children: [],
    }));

  // Attach Submenus (Level 2)
  activeItems
    .filter((item) => item.parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .forEach((child) => {
      const parent = parents.find((p) => p.id === child.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push({
          ...child,
          children: [],
        });
      }
    });

  return parents;
}

/**
 * Build full 2-level tree for Dashboard Admin (including active & inactive)
 */
export function getNavigationTreeAdmin(): NavigationItemWithChildren[] {
  const allItems = getStoredNavItems();

  const parents: NavigationItemWithChildren[] = allItems
    .filter((item) => !item.parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((parent) => ({
      ...parent,
      children: [],
    }));

  allItems
    .filter((item) => item.parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .forEach((child) => {
      const parent = parents.find((p) => p.id === child.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push({
          ...child,
          children: [],
        });
      } else {
        // If parent is missing, treat as root item for safety
        parents.push({
          ...child,
          parentId: null,
          children: [],
        });
      }
    });

  return parents;
}

/**
 * Get Navigation Summary Counts for Dashboard Badges
 */
export function getNavigationCounts() {
  const items = getStoredNavItems();
  const parents = items.filter((i) => !i.parentId);
  const children = items.filter((i) => Boolean(i.parentId));
  const active = items.filter((i) => i.active);
  const inactive = items.filter((i) => !i.active);

  return {
    total: items.length,
    active: active.length,
    inactive: inactive.length,
    parents: parents.length,
    children: children.length,
  };
}

/**
 * Add a new navigation item (strictly max 2 levels)
 */
export function addNavigationItem(
  data: Omit<NavigationItem, 'id' | 'createdAt' | 'updatedAt'>
): NavigationItem {
  const items = getStoredNavItems();
  const now = new Date().toISOString();

  // Determine sortOrder if not provided
  let sortOrder = data.sortOrder;
  if (!sortOrder) {
    const siblings = items.filter((i) => i.parentId === (data.parentId || null));
    sortOrder = siblings.length > 0 ? Math.max(...siblings.map((s) => s.sortOrder)) + 1 : 1;
  }

  // Prevent level 3: Ensure parent is a Root item (parentId === null)
  let parentId = data.parentId || null;
  if (parentId) {
    const parentItem = items.find((i) => i.id === parentId);
    if (parentItem && parentItem.parentId) {
      // If target parent is already a submenu, redirect to root or top-level parent
      parentId = parentItem.parentId;
    }
  }

  const newItem: NavigationItem = {
    ...data,
    id: `nav-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    parentId,
    sortOrder,
    slug: data.slug || generateNavSlug(data.label),
    createdAt: now,
    updatedAt: now,
  };

  const updated = [...items, newItem];
  saveNavItems(updated);
  return newItem;
}

/**
 * Update an existing navigation item
 */
export function updateNavigationItem(
  id: string,
  data: Partial<NavigationItem>
): NavigationItem | null {
  const items = getStoredNavItems();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const current = items[index];
  const now = new Date().toISOString();

  // Circular parent check: item cannot be its own parent
  let parentId = data.parentId !== undefined ? data.parentId : current.parentId;
  if (parentId === id) {
    parentId = null;
  }

  // Prevent level 3 check: If target parent is already a child, disallow
  if (parentId) {
    const targetParent = items.find((i) => i.id === parentId);
    if (targetParent && targetParent.parentId) {
      parentId = targetParent.parentId;
    }
  }

  const updatedItem: NavigationItem = {
    ...current,
    ...data,
    parentId,
    slug: data.label ? (data.slug || generateNavSlug(data.label)) : current.slug,
    updatedAt: now,
  };

  items[index] = updatedItem;
  saveNavItems(items);
  return updatedItem;
}

/**
 * Delete a navigation item with strategy for submenus
 * @param id ID of item to delete
 * @param strategy 'cascade' (delete parent + all submenus) | 'promote_to_root' (move submenus to root)
 */
export function deleteNavigationItem(
  id: string,
  strategy: 'cascade' | 'promote_to_root' = 'cascade'
): boolean {
  const items = getStoredNavItems();
  const itemToDelete = items.find((i) => i.id === id);
  if (!itemToDelete) return false;

  const submenus = items.filter((i) => i.parentId === id);

  let updated: NavigationItem[];

  if (submenus.length > 0) {
    if (strategy === 'cascade') {
      // Delete parent and all its submenus
      updated = items.filter((i) => i.id !== id && i.parentId !== id);
    } else {
      // Promote all submenus to Root level
      const maxRootOrder = Math.max(0, ...items.filter((i) => !i.parentId).map((i) => i.sortOrder));
      updated = items
        .filter((i) => i.id !== id)
        .map((i, idx) => {
          if (i.parentId === id) {
            return {
              ...i,
              parentId: null,
              sortOrder: maxRootOrder + idx + 1,
              updatedAt: new Date().toISOString(),
            };
          }
          return i;
        });
    }
  } else {
    // Simple delete of child or empty parent
    updated = items.filter((i) => i.id !== id);
  }

  saveNavItems(updated);
  return true;
}

/**
 * Toggle Active status
 */
export function toggleNavigationItemActive(id: string): boolean {
  const items = getStoredNavItems();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return false;

  items[index].active = !items[index].active;
  items[index].updatedAt = new Date().toISOString();
  saveNavItems(items);
  return true;
}

/**
 * Move item order (Up / Down) within its sibling group
 */
export function moveNavigationItemOrder(id: string, direction: 'up' | 'down'): boolean {
  const items = getStoredNavItems();
  const target = items.find((i) => i.id === id);
  if (!target) return false;

  const siblings = items
    .filter((i) => i.parentId === target.parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const targetIdx = siblings.findIndex((i) => i.id === id);
  if (targetIdx === -1) return false;

  const swapIdx = direction === 'up' ? targetIdx - 1 : targetIdx + 1;
  if (swapIdx < 0 || swapIdx >= siblings.length) return false;

  const otherItem = siblings[swapIdx];

  // Swap sortOrders
  const tempOrder = target.sortOrder;
  target.sortOrder = otherItem.sortOrder;
  otherItem.sortOrder = tempOrder;

  // If sort orders are identical, assign clean indexed orders
  if (target.sortOrder === otherItem.sortOrder) {
    siblings.splice(targetIdx, 1);
    siblings.splice(swapIdx, 0, target);
    siblings.forEach((item, index) => {
      item.sortOrder = index + 1;
    });
  }

  saveNavItems(items);
  return true;
}

/**
 * Move a submenu item to a different Parent
 */
export function moveSubmenuToParent(childId: string, newParentId: string | null): boolean {
  const items = getStoredNavItems();
  const child = items.find((i) => i.id === childId);
  if (!child) return false;

  // Cannot set self as parent
  if (childId === newParentId) return false;

  // Calculate new sort order in the target group
  const targetSiblings = items.filter((i) => i.parentId === (newParentId || null));
  const maxOrder = targetSiblings.length > 0 ? Math.max(...targetSiblings.map((s) => s.sortOrder)) : 0;

  child.parentId = newParentId || null;
  child.sortOrder = maxOrder + 1;
  child.updatedAt = new Date().toISOString();

  saveNavItems(items);
  return true;
}

/**
 * Reorder a whole list of siblings
 */
export function reorderNavItems(orderedIds: string[]): boolean {
  const items = getStoredNavItems();

  orderedIds.forEach((id, index) => {
    const item = items.find((i) => i.id === id);
    if (item) {
      item.sortOrder = index + 1;
      item.updatedAt = new Date().toISOString();
    }
  });

  saveNavItems(items);
  return true;
}

/**
 * Reset navigation back to default sample dataset
 */
export function resetToDefaultNavigation(): NavigationItem[] {
  saveNavItems(INITIAL_NAVIGATION_DATA);
  return INITIAL_NAVIGATION_DATA;
}

/**
 * Check if a URL or slug matches the active state
 */
export function isNavItemActive(
  item: NavigationItemWithChildren | NavigationItem,
  currentPath: string,
  activeSlug: string
): boolean {
  const normPath = (currentPath || '/').toLowerCase().trim();
  const normSlug = (activeSlug || 'home').toLowerCase().trim();
  const itemUrl = (item.url || '').toLowerCase().trim();
  const itemSlug = (item.slug || '').toLowerCase().trim();

  // Exact home match
  if (itemSlug === 'home' || itemUrl === '/') {
    return normPath === '/' && (normSlug === 'home' || normSlug === '');
  }

  // Exact slug match
  if (normSlug && normSlug === itemSlug) {
    return true;
  }

  // Exact path match
  if (itemUrl && normPath === itemUrl) {
    return true;
  }

  // Path starts with category slug, e.g. /kategori/nasional
  if (normPath.startsWith(`/kategori/${itemSlug}`)) {
    return true;
  }

  // Check if any child item is active (for parent active propagation)
  if ('children' in item && item.children && item.children.length > 0) {
    return item.children.some((child) => isNavItemActive(child, currentPath, activeSlug));
  }

  return false;
}
