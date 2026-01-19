import { PageHeader } from "@/components/profile/PageHeader";
import { ProfileInfoCard } from "@/components/profile/ProfileInfoCard";
import { mockUserProfile } from "@/data/mock";

function formatDate(dateString?: string): string | undefined {
  if (!dateString) return undefined;
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatGender(gender?: string): string | undefined {
  if (!gender) return undefined;
  return gender.charAt(0).toUpperCase() + gender.slice(1);
}

export default function ProfileEditPage() {
  const profile = mockUserProfile;

  const personalInfo = [
    { label: "Name", value: `${profile.first_name} ${profile.last_name}` },
    { label: "Email", value: profile.email },
    {
      label: "Phone",
      value: `${profile.phone_dial_code} ${profile.phone_number}`,
    },
    { label: "Gender", value: formatGender(profile.gender) },
    { label: "Date of Birth", value: formatDate(profile.date_of_birth) },
    { label: "Nationality", value: profile.nationality },
  ];

  const identityDocs = [
    { label: "NRIC", value: profile.nric },
    { label: "Passport", value: profile.passport },
    { label: "Passport Expiry", value: formatDate(profile.passport_exp_date) },
  ];

  const addressLines = [
    profile.address_line_1,
    profile.address_line_2,
    profile.address_line_3,
  ].filter(Boolean);

  const addressInfo = addressLines.length > 0
    ? [{ label: "Address", value: addressLines.join("\n") }]
    : [];

  return (
    <div className="max-w-md mx-auto">
      <PageHeader title="Profile" />

      <div className="space-y-6">
        <ProfileInfoCard title="Personal Information" items={personalInfo} />
        <ProfileInfoCard title="Identity Documents" items={identityDocs} />
        {addressInfo.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-base-content/60 uppercase tracking-wide">
              Address
            </h2>
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-4">
                {addressLines.map((line, index) => (
                  <p key={index} className="text-base-content">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
