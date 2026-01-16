"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { sortedCountries } from "@/lib/constants/countries";
import type { Country } from "@/types";

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  mode?: "nationality" | "dialCode";
}

export function CountrySelect({
  value,
  onChange,
  placeholder = "Select country",
  error,
  disabled = false,
  mode = "nationality",
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Find selected country
  const selectedCountry = sortedCountries.find((c) =>
    mode === "dialCode" ? c.dialCode === value : c.code === value
  );

  // Filter countries by search
  const filteredCountries = sortedCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.code.toLowerCase().includes(search.toLowerCase()) ||
      country.dialCode.includes(search)
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (country: Country) => {
    onChange(mode === "dialCode" ? country.dialCode : country.code);
    setIsOpen(false);
    setSearch("");
  };

  const displayValue = selectedCountry
    ? mode === "dialCode"
      ? `${selectedCountry.flag} ${selectedCountry.dialCode}`
      : `${selectedCountry.flag} ${selectedCountry.name}`
    : placeholder;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-3 border-2 rounded-lg transition-colors
          ${error ? "border-error" : isOpen ? "border-primary" : "border-gray-300"}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-pointer"}
          focus:outline-none`}
      >
        <span className={selectedCountry ? "text-base-content" : "text-gray-400"}>
          {displayValue}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-hidden">
          {/* Search input */}
          <div className="p-2 border-b border-gray-100">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="w-full pl-9 pr-8 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-primary"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Country list */}
          <div className="overflow-y-auto max-h-52">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors
                    ${selectedCountry?.code === country.code ? "bg-primary/10 text-primary" : ""}`}
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="flex-1">{country.name}</span>
                  {mode === "dialCode" && (
                    <span className="text-gray-500">{country.dialCode}</span>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-gray-500 text-center">No countries found</div>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
}
