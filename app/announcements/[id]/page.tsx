import { notFound } from "next/navigation";
import { AnnouncementCover } from "@/components/announcements/AnnouncementCover";
import { AnnouncementMeta } from "@/components/announcements/AnnouncementMeta";
import { AnnouncementTabs } from "@/components/announcements/AnnouncementTabs";
import { announcementDetails } from "@/data/mock";

interface AnnouncementPageProps {
  params: Promise<{ id: string }>;
}

export default async function AnnouncementPage({ params }: AnnouncementPageProps) {
  const { id } = await params;
  const announcement = announcementDetails[id];

  if (!announcement) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto -mx-4 -mt-4">
      <AnnouncementCover image={announcement.coverImage} title={announcement.title} />
      <div className="card bg-base-100 -mt-4 relative z-10 rounded-t-2xl shadow-sm">
        <div className="card-body">
          <AnnouncementMeta
            author={announcement.author}
            publishedDate={announcement.publishedDate}
          />
          <AnnouncementTabs tabs={announcement.tabs} />
        </div>
      </div>
    </div>
  );
}
