import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getAnnouncements } from "@/lib/api/announcements";

export default async function AnnouncementsPage() {
  const response = await getAnnouncements();
  const announcements = response.data;

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-xl font-bold text-base-content mb-4">Announcements</h1>

      {announcements.length === 0 ? (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body text-center py-12">
            <p className="text-base-content/60">No announcements available.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {announcements.map((announcement) => {
            const formattedDate = new Date(announcement.published_at).toLocaleDateString(
              "en-SG",
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              }
            );

            return (
              <Link
                key={announcement.id}
                href={`/announcements/${announcement.slug}`}
                className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="card-body p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-base-content line-clamp-2">
                        {announcement.title}
                      </h2>
                      {announcement.description && (
                        <div className="prose prose-sm text-base-content/60 mt-1 line-clamp-2 [&>*]:m-0">
                          <ReactMarkdown>{announcement.description}</ReactMarkdown>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-base-content/50 mt-2">
                        <Calendar size={12} />
                        <span className="text-xs">{formattedDate}</span>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-base-content/40 flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
