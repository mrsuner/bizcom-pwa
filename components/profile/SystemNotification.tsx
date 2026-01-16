"use client";

import Link from "next/link";
import { AlertTriangle, Info, CheckCircle, ChevronRight } from "lucide-react";
import type { SystemNotification as SystemNotificationType } from "@/types";

interface SystemNotificationProps {
  notifications: SystemNotificationType[];
}

const iconMap = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
};

const colorMap = {
  warning: "text-warning",
  info: "text-info",
  success: "text-success",
};

const bgMap = {
  warning: "bg-warning/10",
  info: "bg-info/10",
  success: "bg-success/10",
};

export function SystemNotification({ notifications }: SystemNotificationProps) {
  if (notifications.length === 0) return null;

  return (
    <div className="space-y-2">
      {notifications.map((notification) => {
        const Icon = iconMap[notification.type];
        const colorClass = colorMap[notification.type];
        const bgClass = bgMap[notification.type];

        const content = (
          <div
            className={`card ${bgClass} border-0`}
          >
            <div className="card-body p-4 flex-row items-center gap-3">
              <Icon size={20} className={colorClass} />
              <p className="flex-1 text-sm text-base-content">
                {notification.message}
              </p>
              {notification.action && (
                <ChevronRight size={16} className="text-base-content/40" />
              )}
            </div>
          </div>
        );

        if (notification.action) {
          return (
            <Link
              key={notification.id}
              href={notification.action.href}
              className="block"
            >
              {content}
            </Link>
          );
        }

        return <div key={notification.id}>{content}</div>;
      })}
    </div>
  );
}
