'use client';
import React from 'react';
import { Circle, ArrowUpCircle, CheckCircle2, CatIcon } from 'lucide-react';
import type { Task, TaskStatus } from '../types/task';

interface StatusTabsProps {
  tasks: Task[];
  currentStatus: TaskStatus;
  setCurrentStatus: (status: TaskStatus) => void;
  counts: { open: number, in_progress: number, closed: number };
}

const tabs: { id: TaskStatus; name: string }[] = [
  { id: 'open', name: 'Open' },
  { id: 'in_progress', name: 'In Progress' },
  { id: 'closed', name: 'Closed' },
];

export default function StatusTabs({ tasks, currentStatus, setCurrentStatus, counts }: StatusTabsProps) {
  return (
    <div className="border-gray-200 border-b">
      <nav className="flex space-x-8 -mb-px" aria-label="Tabs">
        {tabs.map(({ id, name }) => (
          <button
            key={id}
            onClick={() => setCurrentStatus(id)}
            className={`
              group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
              ${currentStatus === id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {id === 'open' && <Circle className="mr-2 w-5 h-5" />}
            {id === 'in_progress' && <ArrowUpCircle className="mr-2 w-5 h-5" />}
            {id === 'closed' && <CheckCircle2 className="mr-2 w-5 h-5" />}
            <span>{name}</span>
            <span className="bg-gray-100 ml-2 px-2.5 py-0.5 rounded-full text-gray-600 text-xs">
              {counts[id]}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}