import { notFound } from "next/navigation";
import { AnnouncementCover } from "@/components/announcements/AnnouncementCover";
import { AnnouncementMeta } from "@/components/announcements/AnnouncementMeta";
import { AnnouncementTabs } from "@/components/announcements/AnnouncementTabs";
import { Markdown } from "@/components/ui/Markdown";
import { getAnnouncementBySlug } from "@/lib/api/announcements";

interface AnnouncementPageProps {
  params: Promise<{ slug: string }>;
}

export default async function AnnouncementPage({ params }: AnnouncementPageProps) {
  const { slug } = await params;
  const response = await getAnnouncementBySlug(slug);

  if (!response) {
    notFound();
  }

  const announcement = response.data;

  // Map API response to component props
  const coverImage = announcement.cover_image;
  const author = {
    name: announcement.author?.name || "BizCom Team",
  };
  const publishedDate = announcement.published_at;
  const tabs = announcement.tabs || [];

  return (
    <div className="max-w-md mx-auto -mx-4 -mt-4">
      <AnnouncementCover image={coverImage} title={announcement.title} />
      <div className="card bg-base-100 -mt-4 relative z-10 rounded-t-2xl shadow-sm">
        <div className="card-body">
          <AnnouncementMeta author={author} publishedDate={publishedDate} />
          {announcement.description && (
            <Markdown
              content={announcement.description}
              className="text-base-content/70 mb-4"
            />
          )}
          <AnnouncementTabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}
