"use client"

import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { X, Check, ChevronDown } from 'lucide-react'
import { Task, TaskStatus } from '../types/task'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface TaskModalProps {
  tasks: Task[]
  selectedTaskId: string
  setSelectedTaskId: (id: string | null) => void
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => Promise<void>
  addComment: (taskId: string, content: string, author: string) => Promise<void>
  updatingTask: boolean
}

export function TaskModalComponent({
  tasks,
  selectedTaskId,
  setSelectedTaskId,
  updateTaskStatus,
  addComment,
  updatingTask
}: TaskModalProps) {
  const [newComment, setNewComment] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<TaskStatus | null>(null)

  const task = tasks.find((t) => t.id === selectedTaskId)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!task) return

      if (['1', '2', '3'].includes(e.key)) {
        e.preventDefault()
        const statusMap: Record<string, TaskStatus> = {
          '1': 'open',
          '2': 'in_progress',
          '3': 'closed',
        }
        const newStatus = statusMap[e.key]
        handleStatusChange(newStatus)
      }

      if (e.key === "Enter") {
        e.preventDefault()
        confirmStatusChange()
      }

      if (!showConfirmation && ['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        const currentTasks = tasks.filter((t: Task) => t.status === task.status)
        const currentIndex = currentTasks.findIndex((t: Task) => t.id === selectedTaskId)

        if (e.key === "ArrowLeft" && currentIndex > 0) {
          setSelectedTaskId(currentTasks[currentIndex - 1].id)
        } else if (e.key === "ArrowRight" && currentIndex < currentTasks.length - 1) {
          setSelectedTaskId(currentTasks[currentIndex + 1].id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [task, tasks, selectedTaskId, setSelectedTaskId, updateTaskStatus])

  if (!task) return null

  const handleStatusChange = (status: TaskStatus) => {
    setPendingStatus(status)
    setShowConfirmation(true)
  }

  const confirmStatusChange = async () => {
    if (pendingStatus) {
      await updateTaskStatus(task.id, pendingStatus)
      setShowConfirmation(false)
    }
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      addComment(task.id, newComment, task.assignee)
      setNewComment('')
    }
  }

  return (
    <>
      <Dialog open={!!selectedTaskId} onOpenChange={() => setSelectedTaskId(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{task.name}</DialogTitle>
            <p className="text-muted-foreground text-sm">ID: {task.id}</p>
          </DialogHeader>
          <div className="gap-4 grid py-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Status</h3>
              <Select
                value={task.status}
                onValueChange={(value: TaskStatus) => handleStatusChange(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Description</h3>
              <p className="text-muted-foreground text-sm">{task.description}</p>
            </div>
            <div className="gap-4 grid grid-cols-2">
              <div>
                <h3 className="mb-1 font-medium">Due Date</h3>
                <p className="text-muted-foreground text-sm">{format(task.dueDate, 'PPP')}</p>
              </div>
              <div>
                <h3 className="mb-1 font-medium">Created</h3>
                <p className="text-muted-foreground text-sm">{format(task.createdAt, 'PPP')}</p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 font-medium">Comments</h3>
              <div className="space-y-2">
                {task && task?.comments && task?.comments.map((comment: any) => (
                  <div key={comment.id} className="bg-muted p-2 rounded-md">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-muted-foreground">
                        {format(comment.createdAt, 'PPP')}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="mb-2"
                />
                <Button type="submit">Add Comment</Button>
              </form>
            </div>
            <div className="mt-4 text-muted-foreground text-xs">
              Use Arrow Left and Arrow Right keys to navigate between tasks.
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Status Change</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to change the status to {pendingStatus}?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmStatusChange} disabled={updatingTask}>{updatingTask ? "Updating..." : "Confirm"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}