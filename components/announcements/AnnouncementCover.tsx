import Image from "next/image";

interface AnnouncementCoverProps {
  image: string;
  title: string;
}

export function AnnouncementCover({ image, title }: AnnouncementCoverProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h1 className="text-xl font-bold text-white">{title}</h1>
      </div>
    </div>
  );
}
