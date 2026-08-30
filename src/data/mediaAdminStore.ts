import { AdminMedia, AdminMediaUsageItem, MediaType } from '../types/admin';
import { initialAdminMedia } from './mediaAdminDummyData';
import { getStoredArticles } from './newsAdminStore';
import { getStoredVideos } from './videoAdminStore';
import { generateUrlVariations, formatBytes as formatBytesHelper } from '../utils/imageOptimizer';

const STORAGE_KEY = 'batutv_admin_media_store';

/**
 * Format bytes to readable string (e.g., "842 KB", "1.45 MB")
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  return formatBytesHelper(bytes, decimals);
}

/**
 * Format dimensions (e.g. "1920 × 1080 px")
 */
export function formatDimensions(w: number, h: number): string {
  if (!w || !h || w === 0 || h === 0) return '-';
  return `${w} × ${h} px`;
}

/**
 * Get aspect ratio label
 */
export function getAspectRatioLabel(w: number, h: number, mediaType: MediaType = 'image'): string {
  if (mediaType === 'document') return 'Dokumen';
  if (!w || !h || w === 0 || h === 0) return 'Tidak diketahui';

  const ratio = w / h;
  if (Math.abs(ratio - 16 / 9) < 0.05) return '16:9 (Lansekap)';
  if (Math.abs(ratio - 4 / 3) < 0.05) return '4:3 (Lansekap)';
  if (Math.abs(ratio - 3 / 2) < 0.05) return '3:2 (Lansekap)';
  if (Math.abs(ratio - 1) < 0.05) return '1:1 (Persegi)';
  if (Math.abs(ratio - 9 / 16) < 0.05) return '9:16 (Vertikal)';
  if (Math.abs(ratio - 3 / 4) < 0.05) return '3:4 (Potret)';
  if (ratio > 1) return 'Lansekap';
  if (ratio < 1) return 'Potret';
  return 'Persegi';
}

/**
 * Format date in Indonesian
 */
export function formatMediaDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '-';
  }
}

/**
 * Helper to calculate live usages of a media item from news articles & videos stores
 */
export function calculateMediaUsage(media: AdminMedia): {
  count: number;
  newsCount: number;
  videoCount: number;
  items: AdminMediaUsageItem[];
} {
  const articles = getStoredArticles();
  const videos = getStoredVideos();
  const usageItems: AdminMediaUsageItem[] = [];

  const mediaUrl = (media.url || '').toLowerCase().trim();
  const mediaFilename = (media.filename || '').toLowerCase().trim();
  const mediaId = media.id;

  // 1. Check in News Articles
  articles.forEach((art) => {
    const artImg = (art.featuredImage || '').toLowerCase().trim();
    const artContent = (art.content || '').toLowerCase();

    // Check featured image match
    const isFeaturedMatched =
      (mediaUrl && artImg.includes(mediaUrl.split('?')[0])) ||
      (artImg && mediaUrl.includes(artImg.split('?')[0])) ||
      (art.id && media.usedIn?.some((u) => u.id === art.id && u.field?.includes('Featured')));

    if (isFeaturedMatched) {
      usageItems.push({
        id: art.id,
        title: art.title,
        type: 'news',
        slug: art.slug,
        field: 'Featured Image Berita',
      });
    }

    // Check in-article content body (inserted via Naskah Editor)
    const isContentMatched =
      (mediaId && artContent.includes(`data-media-id="${mediaId.toLowerCase()}"`)) ||
      (mediaUrl && artContent.includes(mediaUrl.split('?')[0])) ||
      (mediaFilename && artContent.includes(mediaFilename));

    if (isContentMatched && !usageItems.some((u) => u.id === art.id && u.field?.includes('Naskah'))) {
      usageItems.push({
        id: `${art.id}-content`,
        title: art.title,
        type: 'news',
        slug: art.slug,
        field: 'Naskah Berita (Foto Sisipan)',
      });
    }
  });

  // 2. Check in Video items
  videos.forEach((vid) => {
    const vidCustomThumb = (vid.customThumbnail || '').toLowerCase().trim();
    const isMatched =
      (mediaId && vid.thumbnailMediaId === mediaId) ||
      (mediaUrl && vidCustomThumb.includes(mediaUrl.split('?')[0])) ||
      (vidCustomThumb && mediaUrl.includes(vidCustomThumb.split('?')[0])) ||
      (vid.id && media.usedIn?.some((u) => u.id === vid.id));

    if (isMatched && !usageItems.some((ex) => ex.id === vid.id)) {
      usageItems.push({
        id: vid.id,
        title: vid.title,
        type: 'video',
        slug: vid.slug,
        field: 'Custom Thumbnail Video',
      });
    }
  });

  // 3. Also retain any existing non-news/video usages from dummy data (e.g. banners or logos)
  if (media.usedIn) {
    media.usedIn.forEach((u) => {
      if (!usageItems.some((ex) => ex.id === u.id)) {
        usageItems.push(u);
      }
    });
  }

  const newsCount = usageItems.filter((i) => i.type === 'news').length;
  const videoCount = usageItems.filter((i) => i.type === 'video').length;

  return {
    count: usageItems.length,
    newsCount,
    videoCount,
    items: usageItems,
  };
}

/**
 * Retrieve all media from localStorage or fallback to initial dummy data
 */
export function getStoredMedia(): AdminMedia[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    let list: AdminMedia[] = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        list = parsed;
      }
    }
    if (list.length === 0) {
      list = initialAdminMedia;
    }

    // Attach dynamic live usage calculation
    return list.map((item) => {
      const usage = calculateMediaUsage(item);
      return {
        ...item,
        usageCount: usage.count,
        usedIn: usage.items,
      };
    });
  } catch (e) {
    console.warn('Failed to read media from localStorage', e);
    return initialAdminMedia;
  }
}

/**
 * Save media to localStorage
 */
export function saveStoredMedia(mediaList: AdminMedia[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mediaList));
  } catch (e) {
    console.warn('Failed to save media to localStorage', e);
  }
}

/**
 * Get media counts for tabs and statistics
 */
export function getMediaCounts() {
  const mediaList = getStoredMedia();
  return {
    total: mediaList.length,
    images: mediaList.filter((m) => m.mediaType === 'image').length,
    documents: mediaList.filter((m) => m.mediaType === 'document').length,
    used: mediaList.filter((m) => (m.usageCount || 0) > 0).length,
    unused: mediaList.filter((m) => (m.usageCount || 0) === 0).length,
    totalSizeBytes: mediaList.reduce((acc, curr) => acc + (curr.fileSize || 0), 0),
  };
}

/**
 * Get single media by ID
 */
export function getMediaById(id: string): AdminMedia | undefined {
  const list = getStoredMedia();
  return list.find((m) => m.id === id);
}

/**
 * Get single media by Filename
 */
export function getMediaByFilename(filename: string): AdminMedia | undefined {
  const list = getStoredMedia();
  return list.find((m) => m.filename.toLowerCase() === filename.toLowerCase());
}

/**
 * Sanitize filename to lowercase, hyphenated SEO format
 */
export function sanitizeFilename(name: string): string {
  const parts = name.split('.');
  const ext = parts.length > 1 ? parts.pop() : '';
  const base = parts.join('.');

  const cleanBase = base
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return ext ? `${cleanBase || 'media-asset'}.${ext.toLowerCase()}` : cleanBase || 'media-asset';
}

/**
 * Create a new Media item
 */
export function createMedia(
  mediaData: Omit<AdminMedia, 'id' | 'createdAt' | 'updatedAt' | 'usageCount' | 'usedIn'>
): { success: boolean; message: string; media?: AdminMedia } {
  const list = getStoredMedia();

  // Validate URL
  if (!mediaData.url || !mediaData.url.trim()) {
    return { success: false, message: 'URL gambar tidak boleh kosong' };
  }

  // Sanitize filename
  const cleanFilename = sanitizeFilename(mediaData.filename || 'media-foto.jpg');

  // Check unique filename
  const isDuplicate = list.some((m) => m.filename.toLowerCase() === cleanFilename.toLowerCase());
  const finalFilename = isDuplicate
    ? `${cleanFilename.replace(/\.[^/.]+$/, '')}-${Date.now().toString().slice(-4)}.${mediaData.extension || 'jpg'}`
    : cleanFilename;

  const newId = `med-${Date.now().toString().slice(-6)}`;
  const now = new Date().toISOString();

  const newMedia: AdminMedia = {
    id: newId,
    filename: finalFilename,
    originalName: mediaData.originalName || finalFilename,
    mimeType: mediaData.mimeType || 'image/jpeg',
    extension: mediaData.extension || 'jpg',
    mediaType: mediaData.mediaType || 'image',
    width: mediaData.width || 1200,
    height: mediaData.height || 800,
    fileSize: mediaData.fileSize || 450000,
    altText: mediaData.altText || finalFilename.replace(/[-_.]/g, ' '),
    caption: mediaData.caption || '',
    description: mediaData.description || '',
    url: mediaData.url,
    sizes: mediaData.sizes && mediaData.sizes.thumbnail
      ? mediaData.sizes
      : generateUrlVariations(mediaData.url, mediaData.width || 1920, mediaData.height || 1080),
    usageCount: 0,
    usedIn: [],
    createdAt: now,
    updatedAt: now,
  };

  const updatedList = [newMedia, ...list];
  saveStoredMedia(updatedList);

  return {
    success: true,
    message: 'Media berhasil diunggah ke pustaka aset',
    media: newMedia,
  };
}

/**
 * Update media metadata (alt text, caption, description, filename)
 */
export function updateMedia(
  id: string,
  updates: Partial<Pick<AdminMedia, 'filename' | 'altText' | 'caption' | 'description'>>
): { success: boolean; message: string; media?: AdminMedia } {
  const list = getStoredMedia();
  const index = list.findIndex((m) => m.id === id);

  if (index === -1) {
    return { success: false, message: 'Media tidak ditemukan' };
  }

  const existing = list[index];

  // If filename updated, sanitize and check uniqueness
  let updatedFilename = existing.filename;
  if (updates.filename && updates.filename.trim() !== existing.filename) {
    const clean = sanitizeFilename(updates.filename.trim());
    const isDuplicate = list.some((m) => m.id !== id && m.filename.toLowerCase() === clean.toLowerCase());
    if (isDuplicate) {
      return { success: false, message: `Nama file "${clean}" sudah digunakan media lain` };
    }
    updatedFilename = clean;
  }

  const updatedMedia: AdminMedia = {
    ...existing,
    filename: updatedFilename,
    altText: updates.altText !== undefined ? updates.altText : existing.altText,
    caption: updates.caption !== undefined ? updates.caption : existing.caption,
    description: updates.description !== undefined ? updates.description : existing.description,
    updatedAt: new Date().toISOString(),
  };

  list[index] = updatedMedia;
  saveStoredMedia(list);

  return {
    success: true,
    message: 'Metadata media berhasil diperbarui',
    media: updatedMedia,
  };
}

/**
 * Delete media permanently with protection guard
 */
export function deleteMedia(id: string): { success: boolean; message: string; media?: AdminMedia } {
  const list = getStoredMedia();
  const media = list.find((m) => m.id === id);

  if (!media) {
    return { success: false, message: 'Media tidak ditemukan' };
  }

  // Calculate live usage
  const usage = calculateMediaUsage(media);
  if (usage.count > 0) {
    return {
      success: false,
      message: `Media "${media.filename}" sedang digunakan oleh ${usage.count} konten dan tidak boleh dihapus secara permanen.`,
      media: {
        ...media,
        usageCount: usage.count,
        usedIn: usage.items,
      },
    };
  }

  const filtered = list.filter((m) => m.id !== id);
  saveStoredMedia(filtered);

  return {
    success: true,
    message: `Media "${media.filename}" berhasil dihapus permanen`,
    media,
  };
}
