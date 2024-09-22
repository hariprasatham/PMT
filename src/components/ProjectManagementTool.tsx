import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, List, Users, Settings, PlusCircle } from 'lucide-react'

type Task = {
  id: number
  title: string
  description: string
  status: 'To Do' | 'In Progress' | 'Done'
  assignee: string
}

export default function ProjectManagementTool() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design UI', description: 'Create wireframes', status: 'In Progress', assignee: 'Alice' },
    { id: 2, title: 'Develop Backend', description: 'Set up API endpoints', status: 'To Do', assignee: 'Bob' },
    { id: 3, title: 'Write Tests', description: 'Create unit tests', status: 'Done', assignee: 'Charlie' },
  ])

  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    title: '',
    description: '',
    status: 'To Do',
    assignee: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value })
  }

  const handleStatusChange = (value: 'To Do' | 'In Progress' | 'Done') => {
    setNewTask({ ...newTask, status: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }])
    setNewTask({ title: '', description: '', status: 'To Do', assignee: '' })
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <nav className="mt-5 px-2">
          <a href="#" className="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-900 bg-gray-100">
            <Home className="mr-4 h-6 w-6" />
            Dashboard
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <List className="mr-4 h-6 w-6" />
            Tasks
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Users className="mr-4 h-6 w-6" />
            Team
          </a>
          <a href="#" className="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Settings className="mr-4 h-6 w-6" />
            Settings
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Project Tasks</h1>
          
          {/* Data Grid */}
          <div className="mt-6">
            <ScrollArea className="h-[calc(100vh-300px)] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assignee</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.description}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>{task.assignee}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={handleStatusChange} value={newTask.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="assignee">Assignee</Label>
              <Input
                id="assignee"
                name="assignee"
                value={newTask.assignee}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}