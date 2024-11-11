import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Task, TaskPriority } from "@/types/task";
import { addTask } from "@/services/api";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTaskAdded: (task: Task) => void;
}

export function AddTaskDialog({ open, onOpenChange, onTaskAdded }: AddTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [priority, setPriority] = useState<TaskPriority>("low");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const newTask = await addTask({
        name: title,
        description,
        priority,
        assignee: "John Doe",
      });
      onTaskAdded(newTask);
      onOpenChange(false);
      setTitle("");
      setDescription("");
      setPriority("low");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-20"
              required
            />
          </div>
          <div>
            <Textarea
              placeholder="Task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 