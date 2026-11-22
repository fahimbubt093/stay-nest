"use client";

import type { FormEvent } from "react";
import { HotelProfileFields } from "@/components/settings/HotelProfileFields";
import { SystemPreferences } from "@/components/settings/SystemPreferences";
import type { HotelSettings } from "@/components/settings/settings-data";

type SettingsFormProps = {
  settings: HotelSettings;
  onChange: (settings: HotelSettings) => void;
  onSave: () => void;
  onCancel: () => void;
};

export function SettingsForm({
  settings,
  onChange,
  onSave,
  onCancel,
}: SettingsFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <HotelProfileFields
        onChange={(profile) => onChange({ ...settings, profile })}
        profile={settings.profile}
      />
      <SystemPreferences
        onChange={(preferences) =>
          onChange({ ...settings, preferences })
        }
        preferences={settings.preferences}
      />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          className="min-h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
