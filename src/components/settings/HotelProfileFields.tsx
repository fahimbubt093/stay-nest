import type { HotelProfile } from "@/src/components/settings/settings-data";

type HotelProfileFieldsProps = {
  profile: HotelProfile;
  onChange: (profile: HotelProfile) => void;
};

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function HotelProfileFields({
  profile,
  onChange,
}: HotelProfileFieldsProps) {
  return (
    <section
      aria-labelledby="hotel-profile-heading"
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <h2
          className="text-lg font-semibold text-slate-900"
          id="hotel-profile-heading"
        >
          Hotel Information
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Update your hotel&apos;s public contact details.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="settings-hotel-name"
          >
            Hotel Name
          </label>
          <input
            autoComplete="organization"
            className={fieldClassName}
            id="settings-hotel-name"
            onChange={(event) =>
              onChange({ ...profile, hotelName: event.target.value })
            }
            required
            value={profile.hotelName}
          />
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="settings-phone"
          >
            Phone
          </label>
          <input
            autoComplete="tel"
            className={fieldClassName}
            id="settings-phone"
            onChange={(event) =>
              onChange({ ...profile, phone: event.target.value })
            }
            required
            type="tel"
            value={profile.phone}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="settings-address"
          >
            Address
          </label>
          <textarea
            className={`${fieldClassName} h-24 resize-y py-3`}
            id="settings-address"
            onChange={(event) =>
              onChange({ ...profile, address: event.target.value })
            }
            required
            value={profile.address}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="settings-email"
          >
            Email
          </label>
          <input
            autoComplete="email"
            className={fieldClassName}
            id="settings-email"
            onChange={(event) =>
              onChange({ ...profile, email: event.target.value })
            }
            required
            type="email"
            value={profile.email}
          />
        </div>
      </div>
    </section>
  );
}
