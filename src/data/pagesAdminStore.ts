import { AdminPage, PageStatus } from '../types/admin';
import { initialAdminPagesData } from './pagesAdminDummyData';

const PAGES_STORAGE_KEY = 'batutv_admin_pages';

/**
 * Generate a clean, lowercase URL-friendly slug
 */
export function generatePageSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // remove invalid characters
    .trim()
    .replace(/\s+/g, '-') // collapse spaces to hyphens
    .replace(/-+/g, '-'); // collapse multiple hyphens
}

/**
 * Get all stored pages from LocalStorage or fallback to dummy
 */
export function getStoredPages(): AdminPage[] {
  if (typeof window === 'undefined') {
    return initialAdminPagesData;
  }

  try {
    const raw = localStorage.getItem(PAGES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(initialAdminPagesData));
      return initialAdminPagesData;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure essential pages like peta-situs are present
      const hasPetaSitus = parsed.some((p: AdminPage) => p.slug.toLowerCase() === 'peta-situs');
      if (!hasPetaSitus) {
        const petaSitusData = initialAdminPagesData.find((p) => p.slug === 'peta-situs');
        if (petaSitusData) {
          const merged = [...parsed, petaSitusData];
          localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(merged));
          return merged;
        }
      }
      return parsed;
    }
    localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(initialAdminPagesData));
    return initialAdminPagesData;
  } catch (err) {
    console.error('Failed to load admin pages from localStorage:', err);
    return initialAdminPagesData;
  }
}

/**
 * Save pages array to LocalStorage
 */
export function saveStoredPages(pages: AdminPage[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(pages));
  } catch (err) {
    console.error('Failed to save admin pages to localStorage:', err);
  }
}

/**
 * Get only published pages for public rendering and sitemap
 */
export function getPublishedPages(): AdminPage[] {
  const all = getStoredPages();
  return all.filter((p) => p.status === 'published');
}

/**
 * Check if a slug is uniquely available
 */
export function isPageSlugUnique(slug: string, currentId?: string): boolean {
  const clean = slug.toLowerCase().trim().replace(/^\/+|\/+$/g, '');
  if (!clean) return false;
  const all = getStoredPages();
  return !all.some((p) => p.slug.toLowerCase() === clean && p.id !== currentId);
}

/**
 * Generate sitemap items for published pages
 */
export function getPublishedPagesSitemap(): Array<{
  url: string;
  slug: string;
  title: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
  priority: number;
}> {
  const published = getPublishedPages();
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://batutv.com';
  
  return published.map((p) => ({
    url: `${origin}/${p.slug}`,
    slug: p.slug,
    title: p.title,
    lastmod: p.updatedAt || p.createdAt,
    changefreq: p.slug === 'peta-situs' ? 'daily' : 'monthly',
    priority: p.slug === 'tentang-kami' || p.slug === 'peta-situs' ? 0.8 : 0.6,
  }));
}

/**
 * Find page by slug (public view helper)
 */
export function getPageBySlug(slug: string): AdminPage | undefined {
  const all = getStoredPages();
  const cleanSlug = slug.toLowerCase().trim().split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '');
  return all.find((p) => p.slug.toLowerCase() === cleanSlug);
}

/**
 * Find page by ID
 */
export function getPageById(id: string): AdminPage | undefined {
  const all = getStoredPages();
  return all.find((p) => p.id === id);
}

/**
 * Generate a guaranteed unique slug for a page
 */
export function generateUniquePageSlug(title: string, currentId?: string): string {
  const baseSlug = generatePageSlug(title) || 'halaman-informasi';
  const all = getStoredPages();
  
  let candidate = baseSlug;
  let counter = 1;

  while (
    all.some((p) => p.slug.toLowerCase() === candidate.toLowerCase() && p.id !== currentId)
  ) {
    counter++;
    candidate = `${baseSlug}-${counter}`;
  }

  return candidate;
}

/**
 * Create a new page
 */
export function createPage(data: Partial<AdminPage>): AdminPage {
  const all = getStoredPages();
  const now = new Date().toISOString();
  
  const title = data.title?.trim() || 'Halaman Baru';
  const finalSlug = data.slug?.trim()
    ? generatePageSlug(data.slug.trim())
    : generateUniquePageSlug(title);

  // Ensure unique ID
  const newId = `page-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const newPage: AdminPage = {
    id: newId,
    title,
    slug: finalSlug,
    content: data.content || '<p>Tulis konten halaman di sini...</p>',
    excerpt: data.excerpt?.trim() || '',
    status: (data.status as PageStatus) || 'draft',
    seoTitle: data.seoTitle?.trim() || `${title} | BATUTV`,
    metaDescription: data.metaDescription?.trim() || data.excerpt?.trim() || `Informasi resmi mengenai ${title} dari portal berita BatuTV.`,
    featuredImageMediaId: data.featuredImageMediaId,
    featuredImageUrl: data.featuredImageUrl,
    createdAt: now,
    updatedAt: now,
    publishedAt: data.status === 'published' ? now : null,
  };

  const updatedList = [newPage, ...all];
  saveStoredPages(updatedList);
  return newPage;
}

/**
 * Update an existing page
 */
export function updatePage(id: string, updates: Partial<AdminPage>): AdminPage | null {
  const all = getStoredPages();
  const index = all.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const current = all[index];
  const now = new Date().toISOString();

  let finalSlug = current.slug;
  if (updates.slug && updates.slug.trim() !== current.slug) {
    finalSlug = generatePageSlug(updates.slug.trim());
    // ensure unique
    if (all.some((p) => p.id !== id && p.slug.toLowerCase() === finalSlug.toLowerCase())) {
      finalSlug = generateUniquePageSlug(updates.slug.trim(), id);
    }
  } else if (updates.title && updates.title !== current.title && !updates.slug) {
    finalSlug = generateUniquePageSlug(updates.title, id);
  }

  let publishedAt = current.publishedAt;
  if (updates.status === 'published' && current.status !== 'published') {
    publishedAt = now;
  }

  const updatedPage: AdminPage = {
    ...current,
    ...updates,
    slug: finalSlug,
    updatedAt: now,
    publishedAt,
  };

  all[index] = updatedPage;
  saveStoredPages(all);
  return updatedPage;
}

/**
 * Toggle page status (published <-> draft)
 */
export function togglePageStatus(id: string): AdminPage | null {
  const all = getStoredPages();
  const target = all.find((p) => p.id === id);
  if (!target) return null;

  const newStatus: PageStatus = target.status === 'published' ? 'draft' : 'published';
  return updatePage(id, { status: newStatus });
}

/**
 * Delete a page
 */
export function deletePage(id: string): boolean {
  const all = getStoredPages();
  const filtered = all.filter((p) => p.id !== id);
  if (filtered.length === all.length) return false;
  saveStoredPages(filtered);
  return true;
}

/**
 * Get count summary for Dashboard & Sidebar badge
 */
export function getPagesCount(): { total: number; published: number; draft: number } {
  const all = getStoredPages();
  const published = all.filter((p) => p.status === 'published').length;
  return {
    total: all.length,
    published,
    draft: all.length - published,
  };
}

/**
 * Reset to default initial pages
 */
export function resetPagesToDefault(): AdminPage[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(PAGES_STORAGE_KEY, JSON.stringify(initialAdminPagesData));
  }
  return initialAdminPagesData;
}
