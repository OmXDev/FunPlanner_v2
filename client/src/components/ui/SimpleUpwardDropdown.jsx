import { useState } from 'react';
import { Tags, ChevronUp } from 'lucide-react';

const options = ["Follow-up", "High Priority", "General"];

export default function SimpleUpwardDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="relative w-52 ">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 bg-slate-800/50 border border-slate-700/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
      >
        <div className="flex items-center space-x-2">
          <Tags className="w-4 h-4 text-slate-400" />
          <span>{selected}</span>
        </div>
        <ChevronUp className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown opens upward */}
      {open && (
        <ul className="absolute bottom-full mb-2 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setOpen(false);
              }}
              className="px-4 py-2 text-white hover:bg-slate-700 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
