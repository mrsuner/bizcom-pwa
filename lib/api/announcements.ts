import type { AnnouncementApi, PaginatedResponse } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export interface AnnouncementApiResponse {
  data: AnnouncementApi;
}

export type AnnouncementsListResponse = PaginatedResponse<AnnouncementApi>;

/**
 * Fetch paginated list of published announcements
 */
export async function getAnnouncements(
  page?: number
): Promise<AnnouncementsListResponse> {
  const url = new URL(`${API_BASE}/announcements`);
  if (page) url.searchParams.set("page", page.toString());

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch announcements");
  }

  return res.json();
}

/**
 * Fetch a single announcement by slug
 */
export async function getAnnouncementBySlug(
  slug: string
): Promise<AnnouncementApiResponse | null> {
  const res = await fetch(`${API_BASE}/announcements/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}
