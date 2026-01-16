import Link from "next/link";
import type { Announcement } from "@/types";

interface AnnouncementBannerProps {
  announcement: Announcement;
}

export function AnnouncementBanner({ announcement }: AnnouncementBannerProps) {
  return (
    <section className="mt-6">
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm font-medium">
                🚗✨ {announcement.title} 🤗
              </p>
              {announcement.description && (
                <p className="text-xs text-base-content/60 mt-1">
                  {announcement.description} 🎉
                </p>
              )}
            </div>
            <span className="text-xs text-base-content/60 ml-2">
              {announcement.date}
            </span>
          </div>
          <div className="card-actions justify-end mt-2">
            <Link
              href={announcement.href}
              className="btn btn-outline btn-primary btn-sm rounded-full"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
