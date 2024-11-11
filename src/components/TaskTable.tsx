'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ArrowUpCircle, Circle, CheckCircle2 } from 'lucide-react';
import { Task, TaskStatus } from '../types/task';

interface TaskTableProps {
  tasks: Task[];
  currentStatus: TaskStatus;
  selectedTaskId: string | null;
  setSelectedTaskId: (id: string | null) => void;
}

const statusIcons = {
  'open': Circle,
  'in_progress': ArrowUpCircle,
  'closed': CheckCircle2,
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

export default function TaskTable({ tasks, currentStatus, selectedTaskId, setSelectedTaskId }: TaskTableProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [visibleTasks, setVisibleTasks] = useState(5);
  const tableRef = useRef<HTMLDivElement>(null);
  const currentTasks = tasks?.filter((task) => task.status === currentStatus) || [];

  const loadMoreTasks = () => {
    setVisibleTasks((prev) => prev + 5);
  };

  // Keyboard navigation handler
  const handleKeyboardNavigation = useCallback((e: KeyboardEvent) => {
    if (!currentTasks.length || selectedTaskId) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(0, prev - 1));
      scrollToSelectedRow(Math.max(0, focusedIndex - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => Math.min(visibleTasks - 1, prev + 1));
      scrollToSelectedRow(Math.min(visibleTasks - 1, focusedIndex + 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedTask = currentTasks[focusedIndex];
      if (selectedTask) {
        setSelectedTaskId(selectedTask.id);
      }
    }
  }, [currentTasks, focusedIndex, setSelectedTaskId, selectedTaskId, visibleTasks]);

  // Scroll selected row into view
  const scrollToSelectedRow = useCallback((index: number) => {
    const rows = tableRef.current?.querySelectorAll('tbody tr');
    if (rows && rows[index]) {
      rows[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, []);

  // Set up keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardNavigation);
    return () => window.removeEventListener('keydown', handleKeyboardNavigation);
  }, [handleKeyboardNavigation]);

  const StatusIcon = statusIcons[currentStatus];

  return (
    <div ref={tableRef} className="overflow-x-auto" tabIndex={0}>
      <table className="divide-y divide-gray-200 min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Priority</th>
            <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Labels</th>
            <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider group">
              <div className="flex items-center space-x-1">
                <span>Created</span>
              </div>
            </th>
            <th className="px-6 py-3 font-medium text-gray-500 text-left text-xs uppercase tracking-wider">Assignee</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentTasks.slice(0, visibleTasks).map((task, index) => (
            <tr
              key={task.id}
              onClick={() => setSelectedTaskId(task.id)}
              className={`cursor-pointer transition-colors ${selectedTaskId === task.id ? 'bg-blue-50' : 'hover:bg-gray-50'} ${focusedIndex === index ? 'bg-gray-50 ring-0' : ''}`}
              tabIndex={focusedIndex === index ? 0 : -1}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityColors[task.priority]}`}>
                  {task.priority}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{task.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusIcon className="w-5 h-5 text-gray-500" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-1">
                  {task.labels.map((label) => (
                    <span
                      key={label.id}
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${label.color}-100 text-${label.color}-800`}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 text-sm whitespace-nowrap">{task.name}</td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                {format(task.dueDate, 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                {format(task.createdAt, 'MMM d, yyyy')}
              </td>
              <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">{task.assignee}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleTasks < currentTasks.length && (
        <div className="flex justify-center mt-4">
          <button onClick={loadMoreTasks} className="bg-blue-500 px-4 py-2 rounded text-white">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}