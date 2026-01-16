interface ProfileInfoItem {
  label: string;
  value: string | undefined;
}

interface ProfileInfoCardProps {
  title: string;
  items: ProfileInfoItem[];
}

export function ProfileInfoCard({ title, items }: ProfileInfoCardProps) {
  const filteredItems = items.filter((item) => item.value);

  if (filteredItems.length === 0) return null;

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-medium text-base-content/60 uppercase tracking-wide">
        {title}
      </h2>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-0">
          <ul className="divide-y divide-base-200">
            {filteredItems.map((item, index) => (
              <li key={index} className="p-4">
                <p className="text-xs text-base-content/60 mb-1">{item.label}</p>
                <p className="text-base-content">{item.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
