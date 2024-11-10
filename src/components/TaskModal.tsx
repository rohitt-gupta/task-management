'use client';
import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import useTaskStore from '../store/taskStore';
import { Task, TaskStatus } from '../types/task';

export default function TaskModal() {
  const { tasks, selectedTaskId, setSelectedTaskId, updateTaskStatus, addComment } = useTaskStore();
  const [newComment, setNewComment] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<TaskStatus | null>(null);

  const task = selectedTaskId ? tasks.find((t: Task) => t.id === selectedTaskId) : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!task) return;

      if (['1', '2', '3'].includes(e.key)) {
        e.preventDefault();
        const statusMap: Record<string, TaskStatus> = {
          '1': 'open',
          '2': 'in-progress',
          '3': 'closed',
        };
        setPendingStatus(statusMap[e.key]);
        setShowConfirmation(true);
      }

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const currentTasks = tasks.filter((t: Task) => t.status === task.status);
        const currentIndex = currentTasks.findIndex((t: Task) => t.id === selectedTaskId);

        if (e.key === "ArrowLeft" && currentIndex > 0) {
          setSelectedTaskId(currentTasks[currentIndex - 1].id);
        } else if (e.key === "ArrowRight" && currentIndex < currentTasks.length - 1) {
          setSelectedTaskId(currentTasks[currentIndex + 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [task, tasks, selectedTaskId, setSelectedTaskId]);

  if (!task) return null;

  const handleStatusChange = (status: TaskStatus) => {
    setPendingStatus(status);
    setShowConfirmation(true);
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      updateTaskStatus(task.id, pendingStatus);
      setShowConfirmation(false);
      setSelectedTaskId(null);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(task.id, newComment);
      setNewComment('');
    }
  };

  return (
    <>
      <Dialog
        open={!!selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
        className="z-10 fixed inset-0 overflow-y-auto"
      >
        <div className="flex justify-center items-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white mx-4 p-6 rounded-lg w-full max-w-3xl">
            <button
              onClick={() => setSelectedTaskId(null)}
              className="top-4 right-4 absolute text-gray-400 hover:text-gray-500"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-2xl text-gray-900">{task.name}</h2>
                  <p className="text-gray-500 text-sm">ID: {task.id}</p>
                </div>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                  className="border-gray-300 focus:ring-opacity-50 shadow-sm focus:border-blue-300 rounded-md focus:ring focus:ring-blue-200"
                >
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900">Description</h3>
                <p className="mt-1 text-gray-600">{task.description}</p>
              </div>

              <div className="gap-4 grid grid-cols-2">
                <div>
                  <h3 className="font-medium text-gray-900">Due Date</h3>
                  <p className="text-gray-600">{format(task.dueDate, 'PPP')}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Created</h3>
                  <p className="text-gray-600">{format(task.createdAt, 'PPP')}</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Comments</h3>
                <div className="space-y-4 mt-2">
                  {task.comments.map((comment: any) => (
                    <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-gray-500">
                          {format(comment.createdAt, 'PPP')}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600">{comment.content}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleCommentSubmit} className="mt-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="border-gray-300 focus:ring-opacity-50 shadow-sm focus:border-blue-300 rounded-md focus:ring focus:ring-blue-200 w-full"
                    rows={3}
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 mt-2 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white focus:outline-none"
                  >
                    Add Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Status Change Confirmation Modal */}
      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        className="z-20 fixed inset-0 overflow-y-auto"
      >
        <div className="flex justify-center items-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative bg-white mx-4 p-6 rounded-lg max-w-sm">
            <Dialog.Title className="font-medium text-gray-900 text-lg">
              Confirm Status Change
            </Dialog.Title>
            <p className="mt-2 text-gray-500 text-sm">
              Are you sure you want to change the status to {pendingStatus}?
            </p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium text-gray-700 text-sm focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-sm text-white focus:outline-none"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}