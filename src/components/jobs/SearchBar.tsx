import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';


interface SearchBarProps {
  onSearch: (query: string, location: string, remoteOnly: boolean) => void;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading = false }) => {
  const [query, setQuery] = useState('React Developer');
  const [location, setLocation] = useState('Remote');
  const [remoteOnly, setRemoteOnly] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location, remoteOnly);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Job Title / Skill Input */}
        <div className="relative md:col-span-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title, skill, or keyword (e.g. React Developer, Data Scientist)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Location Input */}
        <div className="relative md:col-span-4">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, country, or Remote (e.g. Delhi, New York)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Search Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-full min-h-[38px] flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Search Jobs</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Checkbox Row */}
      <div className="flex items-center space-x-6 text-xs text-slate-600 pt-2 border-t border-slate-100">
        <label className="flex items-center space-x-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(e) => setRemoteOnly(e.target.checked)}
            className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
          />
          <span className="font-medium text-slate-700">Remote Jobs Only</span>
        </label>
        <span className="text-slate-300">•</span>
        <span className="text-slate-500 font-mono text-[11px]">Aggregates Adzuna, JSearch, Indeed, LinkedIn & Company feeds</span>
      </div>
    </form>
  );
};
