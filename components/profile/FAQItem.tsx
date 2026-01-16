"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { FAQ } from "@/types";

interface FAQItemProps {
  faq: FAQ;
}

export function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card bg-base-100 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-start gap-3 text-left"
      >
        {isOpen ? (
          <ChevronDown size={20} className="text-primary flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronRight size={20} className="text-base-content/40 flex-shrink-0 mt-0.5" />
        )}
        <span className="font-medium text-base-content">{faq.question}</span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pl-11">
          <p className="text-base-content/70 text-sm leading-relaxed">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
}
