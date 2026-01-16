import { User, Calendar } from "lucide-react";

interface AnnouncementMetaProps {
  author: {
    name: string;
    avatar?: string;
  };
  publishedDate: string;
}

export function AnnouncementMeta({ author, publishedDate }: AnnouncementMetaProps) {
  const formattedDate = new Date(publishedDate).toLocaleDateString("en-SG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex items-center gap-4 py-3 border-b border-base-300">
      <div className="flex items-center gap-2">
        <div className="avatar placeholder">
          <div className="bg-primary text-primary-content rounded-full w-8">
            <User size={16} />
          </div>
        </div>
        <span className="text-sm font-medium text-base-content">{author.name}</span>
      </div>
      <div className="flex items-center gap-1 text-base-content/60">
        <Calendar size={14} />
        <span className="text-xs">{formattedDate}</span>
      </div>
    </div>
  );
}
