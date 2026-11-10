import React, { useState } from "react";
import {
  CheckSquare,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search,
  User,
  Building2,
  AlertTriangle,
  ArrowRight,
  Filter
} from "lucide-react";
import { TASK_PRIORITIES, TASK_STATUSES } from "../../data/taskManagementData";

export default function TaskManagementView({
  tasks = [],
  project,
  onOpenCreateTaskModal,
  onToggleTaskStatus
}) {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      selectedStatus === "all" || task.status === selectedStatus;
    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;
    const matchesSearch =
      searchQuery === "" ||
      task.taskName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedPerson?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.remarks?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress" || t.status === "Pending").length;
  const highPriorityTasks = tasks.filter((t) => t.priority === "High").length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "High":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Medium":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "In Progress":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Pending":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Overdue":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                BFRD Section 24
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                Activity Governance Matrix
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Task & Follow-up Execution Console
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Every activity has an assigned person, due date, priority rating, and statutory completion record.
            </p>
          </div>

          <button
            onClick={onOpenCreateTaskModal}
            className="apple-button px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Task</span>
          </button>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Project Tasks
            </span>
            <span className="text-lg font-bold text-slate-900 font-mono mt-0.5 block">
              {totalTasks} Activities
            </span>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
              100% activity mapped
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
            <span className="block text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
              Completed Tasks
            </span>
            <span className="text-lg font-bold text-emerald-900 font-mono mt-0.5 block">
              {completedTasks} / {totalTasks} ({completionPercentage}%)
            </span>
            <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
              Verified & signed off
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80">
            <span className="block text-[11px] font-semibold text-indigo-800 uppercase tracking-wider">
              Active / In Progress
            </span>
            <span className="text-lg font-bold text-indigo-900 font-mono mt-0.5 block">
              {inProgressTasks} Tasks
            </span>
            <span className="text-[10px] text-indigo-700 font-medium mt-0.5 block">
              Under execution
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80">
            <span className="block text-[11px] font-semibold text-rose-800 uppercase tracking-wider">
              High Priority Tasks
            </span>
            <span className="text-lg font-bold text-rose-900 font-mono mt-0.5 block">
              {highPriorityTasks} Critical
            </span>
            <span className="text-[10px] text-rose-700 font-medium mt-0.5 block">
              Milestone gating
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TASK_STATUSES.map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStatus(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === st.id
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, assignee, team..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Task List Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Project Tasks & Execution Roster
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 font-mono">
              {filteredTasks.length} Tasks
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Click task status to toggle completion
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredTasks.map((task) => {
            const isDone = task.status === "Completed";
            return (
              <div
                key={task.id}
                className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                    <button
                      onClick={() => onToggleTaskStatus?.(task.id)}
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        isDone
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-300 hover:border-blue-500 text-transparent"
                      }`}
                      title={isDone ? "Click to mark In Progress" : "Click to mark Completed"}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </button>

                    <span className="font-mono text-[11px] text-slate-400">
                      {task.id}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border font-mono ${getPriorityBadge(
                        task.priority
                      )}`}
                    >
                      {task.priority} Priority
                    </span>

                    <button
                      onClick={() => onToggleTaskStatus?.(task.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border font-mono transition-opacity hover:opacity-80 ${getStatusBadge(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </button>
                  </div>

                  <h4
                    className={`text-sm font-bold ${
                      isDone ? "text-slate-500 line-through" : "text-slate-900"
                    }`}
                  >
                    {task.taskName}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {task.remarks}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono pt-1">
                    <div className="flex items-center space-x-1.5 text-slate-700 font-sans">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold">{task.assignedPerson}</span>
                      <span className="text-slate-400">({task.department})</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Assigned: {task.assignedDate}</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-semibold text-slate-900">Due: {task.dueDate}</span>
                    </div>

                    {task.completionDate && (
                      <div className="flex items-center space-x-1.5 text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-bold">Completed: {task.completionDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => onToggleTaskStatus?.(task.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                      isDone
                        ? "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 shadow-2xs"
                    }`}
                  >
                    {isDone ? "Reopen Task" : "Mark Done ✓"}
                  </button>
                </div>
              </div>
            );
          })}

          {filteredTasks.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-xs">
              No tasks found matching the selected filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
