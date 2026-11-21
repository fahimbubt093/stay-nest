import type {
  CurrencyCode,
  SystemPreferences as SystemPreferencesType,
  TimeZone,
} from "@/src/components/settings/settings-data";

type SystemPreferencesProps = {
  preferences: SystemPreferencesType;
  onChange: (preferences: SystemPreferencesType) => void;
};

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const currencyOptions: CurrencyCode[] = ["USD", "BDT"];
const timeZoneOptions: TimeZone[] = ["Asia/Dhaka", "UTC"];

export function SystemPreferences({
  preferences,
  onChange,
}: SystemPreferencesProps) {
  return (
    <section
      aria-labelledby="system-preferences-heading"
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <h2
          className="text-lg font-semibold text-slate-900"
          id="system-preferences-heading"
        >
          System Preferences
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Choose defaults for how information is displayed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="settings-currency"
          >
            Default Currency
          </label>
          <select
            className={fieldClassName}
            id="settings-currency"
            onChange={(event) => {
              const currency = currencyOptions.find(
                (option) => option === event.target.value,
              );
              if (currency) {
                onChange({ ...preferences, currency });
              }
            }}
            value={preferences.currency}
          >
            <option value="USD">USD - US Dollar</option>
            <option value="BDT">BDT - Bangladeshi Taka</option>
          </select>
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="settings-time-zone"
          >
            Time Zone
          </label>
          <select
            className={fieldClassName}
            id="settings-time-zone"
            onChange={(event) => {
              const timeZone = timeZoneOptions.find(
                (option) => option === event.target.value,
              );
              if (timeZone) {
                onChange({ ...preferences, timeZone });
              }
            }}
            value={preferences.timeZone}
          >
            <option value="Asia/Dhaka">Asia/Dhaka</option>
            <option value="UTC">UTC</option>
          </select>
        </div>

        <label className="flex min-h-14 items-center justify-between gap-4 rounded-xl border border-slate-200 px-4 sm:col-span-2">
          <span>
            <span className="block text-sm font-medium text-slate-800">
              Email Notifications
            </span>
            <span className="mt-0.5 block text-xs text-slate-500">
              Receive updates about bookings and payments.
            </span>
          </span>
          <input
            checked={preferences.emailNotifications}
            className="h-4 w-4 accent-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onChange={(event) =>
              onChange({
                ...preferences,
                emailNotifications: event.target.checked,
              })
            }
            type="checkbox"
          />
        </label>
      </div>
    </section>
  );
}
