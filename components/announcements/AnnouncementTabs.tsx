"use client";

import { useState } from "react";
import type { AnnouncementTab } from "@/types";
import { Markdown } from "@/components/ui/Markdown";

interface AnnouncementTabsProps {
  tabs: AnnouncementTab[];
}

export function AnnouncementTabs({ tabs }: AnnouncementTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  if (tabs.length === 0) {
    return null;
  }

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
      <Markdown content={activeContent} className="mt-4 text-base-content" />
    </div>
  );
}
