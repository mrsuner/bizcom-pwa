import Link from "next/link";
import type { AnnouncementApi } from "@/types";

interface AnnouncementBannerProps {
  announcements: AnnouncementApi[];
  isLoading?: boolean;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-SG", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function AnnouncementBanner({ announcements, isLoading }: AnnouncementBannerProps) {
  if (isLoading) {
    return (
      <section className="mt-6 space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body p-4">
              <div className="h-4 bg-base-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-base-200 rounded animate-pulse w-1/2 mt-2" />
              <div className="flex justify-end mt-2">
                <div className="h-8 w-24 bg-base-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 space-y-4">
      {announcements.map((announcement) => (
        <div key={announcement.id} className="card bg-base-100 shadow-sm border border-base-300">
          <div className="card-body p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-medium">{announcement.title}</p>
                {announcement.description && (
                  <p className="text-xs text-base-content/60 mt-1">
                    {announcement.description}
                  </p>
                )}
              </div>
              <span className="text-xs text-base-content/60 ml-2">
                {formatDate(announcement.published_at)}
              </span>
            </div>
            <div className="card-actions justify-end mt-2">
              <Link
                href={`/announcements/${announcement.slug}`}
                className="btn btn-outline btn-primary btn-sm rounded-full"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
