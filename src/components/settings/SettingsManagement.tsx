"use client";

import { useState } from "react";
import { SettingsForm } from "@/components/settings/SettingsForm";
import {
  initialHotelSettings,
  type HotelSettings,
} from "@/components/settings/settings-data";

export function SettingsManagement() {
  const [savedSettings, setSavedSettings] =
    useState<HotelSettings>(initialHotelSettings);
  const [draftSettings, setDraftSettings] =
    useState<HotelSettings>(initialHotelSettings);
  const [hasSaved, setHasSaved] = useState(false);

  function saveSettings() {
    setSavedSettings(draftSettings);
    setHasSaved(true);
  }

  function cancelChanges() {
    setDraftSettings(savedSettings);
    setHasSaved(false);
  }

  return (
    <>
      <header className="mb-8 sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Hotel operations
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Manage your hotel profile and workspace preferences.
        </p>
      </header>

      {hasSaved && (
        <p
          className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
          role="status"
        >
          Settings saved successfully.
        </p>
      )}

      <SettingsForm
        onCancel={cancelChanges}
        onChange={(settings) => {
          setDraftSettings(settings);
          setHasSaved(false);
        }}
        onSave={saveSettings}
        settings={draftSettings}
      />
    </>
  );
}
