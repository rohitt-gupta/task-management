'use client';
import React, { useEffect, useState } from 'react'
import StatusTabs from './StatusTabs';
import TaskTable from './TaskTable';
import { Task, TaskStatus } from '@/types/task';
import { addComment as addCommentOnDb, updateTaskStatus as updateTaskStatusOnDb } from '@/services/api';
import { TaskModalComponent } from './task-modal';
const HomePage = ({ initialData, getData, counts }: { initialData: { tasks: Task[] }, getData: (status: TaskStatus) => Promise<{ tasks: Task[] }>, counts: { open: number, in_progress: number, closed: number } }) => {
  const [tasks, setTasks] = useState<Task[]>(initialData.tasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>('open');
  const [loading, setLoading] = useState(false);

  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(t =>
      t.id === taskId ? { ...t, status: newStatus } : t
    ));
    await updateTaskStatusOnDb(taskId, newStatus);
  };

  const addComment = async (taskId: string, content: string, author: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? {
        ...task,
        comments: [...task.comments, {
          id: Date.now().toString(),
          content,
          author,
          createdAt: new Date(),
          taskId
        }]
      } : task
    ));
    await addCommentOnDb(taskId, content, author);
  };

  useEffect(() => {
    setLoading(true);
    getData(currentStatus).then(data => {
      setTasks(data.tasks);
      setLoading(false);
    });
  }, [currentStatus]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto sm:px-6 lg:px-8 py-6 max-w-7xl">
        <div className="px-4 sm:px-0 py-6">
          <StatusTabs
            tasks={tasks}
            currentStatus={currentStatus}
            setCurrentStatus={setCurrentStatus}
            counts={counts}
          />
          <div className="mt-4">
            {loading ? <div>Loading...</div> : (
              <TaskTable
                tasks={tasks}
                currentStatus={currentStatus}
                setSelectedTaskId={setSelectedTaskId}
                selectedTaskId={selectedTaskId}
              />
            )}
          </div>
          {selectedTaskId && (
            <TaskModalComponent
              tasks={tasks}
              selectedTaskId={selectedTaskId}
              setSelectedTaskId={setSelectedTaskId}
              updateTaskStatus={updateTaskStatus}
              addComment={addComment}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage