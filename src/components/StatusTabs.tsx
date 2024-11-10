'use client';
import React from 'react';
import { Circle, ArrowUpCircle, CheckCircle2 } from 'lucide-react';
import useTaskStore from '../store/taskStore';
import type { TaskStatus } from '../types/task';

const tabs: { id: TaskStatus; name: string; icon: React.ComponentType }[] = [
  { id: 'open', name: 'Open', icon: Circle },
  { id: 'in-progress', name: 'In Progress', icon: ArrowUpCircle },
  { id: 'closed', name: 'Closed', icon: CheckCircle2 },
];

export default function StatusTabs() {
  const { currentStatus, setCurrentStatus, tasks } = useTaskStore();
  console.log("tasks", tasks);

  return (
    <div className="border-gray-200 border-b">
      <nav className="flex space-x-8 -mb-px" aria-label="Tabs">
        {tabs.map(({ id, name, icon: Icon }) => (
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
            {/* <Icon
              // className={`-ml-0.5 mr-2 h-5 w-5 ${currentStatus === id ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'} `} /> */}
            <span>{name}</span>
            <span className="bg-gray-100 ml-2 px-2.5 py-0.5 rounded-full text-gray-600 text-xs">
              {Array.isArray(tasks) ? tasks?.filter((t) => t.status === id).length : 0}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}