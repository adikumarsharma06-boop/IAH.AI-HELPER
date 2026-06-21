import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, Plus, Check, X } from "lucide-react";

interface CategoryDropdownProps {
  currentCategory: string;
  existingCategories: string[];
  onSave: (newCategory: string) => void;
  onCancel: () => void;
}

export default function CategoryDropdown({
  currentCategory,
  existingCategories,
  onSave,
  onCancel,
}: CategoryDropdownProps) {
  const [searchQuery, setSearchQuery] = useState(currentCategory || "General");
  const [isOpen, setIsOpen] = useState(true);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clean the and filter the available category suggestions
  const filteredCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    
    // Get unique existing list without empty ones
    const baseList = existingCategories
      .map(c => c.trim())
      .filter((c, index, self) => c && self.indexOf(c) === index);

    if (!query) return baseList;

    return baseList.filter((cat) => cat.toLowerCase().includes(query));
  }, [existingCategories, searchQuery]);

  // Determine if we show a "Create new category" option
  const showCreateOption = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return false;
    
    // Check if there is an exact case-insensitive match already
    const hasExactMatch = existingCategories.some(
      (cat) => cat.trim().toLowerCase() === query.toLowerCase()
    );
    return !hasExactMatch;
  }, [existingCategories, searchQuery]);

  // Adjust highlight index index of the dropdown list
  const totalOptionsCount = filteredCategories.length + (showCreateOption ? 1 : 0);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  // Auto-focus search input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  // Handle outside clicks to cancel/close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onCancel();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  const selectValue = (value: string) => {
    const finalValue = value.trim() || "General";
    onSave(finalValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      onCancel();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % totalOptionsCount);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + totalOptionsCount) % totalOptionsCount);
    } else if (e.key === "Enter") {
      e.preventDefault();
      
      if (totalOptionsCount === 0) {
        selectValue(searchQuery);
        return;
      }

      // Check what is highlighted
      if (highlightedIndex < filteredCategories.length) {
        selectValue(filteredCategories[highlightedIndex]);
      } else if (showCreateOption) {
        selectValue(searchQuery);
      }
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative select-text" 
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-1 bg-slate-800 border border-indigo-400 rounded-md shadow-lg p-0.5 max-w-[210px] sm:max-w-[240px]">
        <input
          ref={inputRef}
          type="text"
          maxLength={24}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search/Type tag..."
          className="bg-transparent text-white font-mono font-medium text-[10px] px-1.5 py-0.5 outline-none w-28 sm:w-36 placeholder:text-slate-500"
        />
        
        <button
          type="button"
          onClick={() => {
            if (highlightedIndex < filteredCategories.length && filteredCategories.length > 0) {
              selectValue(filteredCategories[highlightedIndex]);
            } else {
              selectValue(searchQuery);
            }
          }}
          className="p-0.5 text-emerald-400 hover:text-emerald-300 font-bold hover:bg-slate-700 rounded transition cursor-pointer"
          title="Save category tag"
        >
          <Check className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="p-0.5 text-slate-400 hover:text-red-400 font-bold hover:bg-slate-700 rounded transition cursor-pointer"
          title="Cancel"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-48 sm:w-56 bg-slate-900 border border-slate-750 rounded-lg shadow-2xl z-[1000] p-1 flex flex-col max-h-48 overflow-y-auto scrollbar-thin divide-y divide-slate-800/60 font-sans text-left">
          
          {/* Header indicator */}
          <div className="px-2 py-1 text-[8px] font-mono text-indigo-400 font-bold uppercase tracking-widest tracking-loose select-none flex items-center justify-between">
            <span>Selector suggestions</span>
            <Search className="w-2.5 h-2.5 opacity-60" />
          </div>

          <div className="py-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat, idx) => {
                const isSelected = cat.toLowerCase() === currentCategory.trim().toLowerCase();
                const isHighlighted = idx === highlightedIndex;
                
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => selectValue(cat)}
                    onMouseEnter={() => setHighlightedIndex(idx)}
                    className={`w-full text-left px-2 py-1.5 text-[10px] font-medium font-mono rounded flex items-center justify-between transition cursor-pointer truncate ${
                      isHighlighted 
                        ? "bg-indigo-600 text-white" 
                        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    {isSelected && (
                      <Check className={`w-3 h-3 shrink-0 ml-1.5 ${isHighlighted ? "text-white" : "text-indigo-400"}`} />
                    )}
                  </button>
                );
              })
            ) : (
              !showCreateOption && (
                <div className="px-2 py-2 text-[9px] font-mono text-slate-500 italic select-none">
                  No matching tags found
                </div>
              )
            )}
          </div>

          {showCreateOption && (
            <div className="p-1">
              <button
                type="button"
                onClick={() => selectValue(searchQuery)}
                onMouseEnter={() => setHighlightedIndex(filteredCategories.length)}
                className={`w-full text-left px-2 py-1.5 text-[10px] font-bold font-mono rounded flex items-center gap-1.5 transition cursor-pointer ${
                  highlightedIndex === filteredCategories.length
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-950/40 text-emerald-300 border border-emerald-900/30"
                }`}
              >
                <Plus className="w-3 h-3 shrink-0" />
                <span className="truncate">Create "{searchQuery.trim()}"</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
