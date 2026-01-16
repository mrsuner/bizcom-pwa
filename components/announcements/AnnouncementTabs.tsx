"use client";

import { useState } from "react";
import type { AnnouncementTab } from "@/types";

interface AnnouncementTabsProps {
  tabs: AnnouncementTab[];
}

export function AnnouncementTabs({ tabs }: AnnouncementTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content || "";

  return (
    <div className="mt-4">
      <div role="tablist" className="tabs tabs-boxed bg-base-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            className={`tab ${activeTab === tab.id ? "tab-active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="prose prose-sm max-w-none mt-4 text-base-content"
        dangerouslySetInnerHTML={{ __html: activeContent }}
      />
    </div>
  );
}
