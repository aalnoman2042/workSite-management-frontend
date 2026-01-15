"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { ISite } from "@/types/site.interface";
import { IWorker } from "@/types/worker.interface";
import { getallSites } from "@/services/siteServices/siteManagement";
import { getWorkers } from "@/services/workerServices/workerManagement";
import { serverFetch } from "@/lib/server-fetch";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

export default function TaskAssignForm() {
  const [sites, setSites] = useState<ISite[]>([]);
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    siteId: "",
    workerId: "",
    dueDate: "",  // ISO string
    workdate: "", // ISO string (optional)
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch sites & workers on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const sitesRes = await getallSites();
        setSites(Array.isArray(sitesRes) ? sitesRes : []);

        const workersRes = await getWorkers();
        setWorkers(Array.isArray(workersRes.data) ? workersRes.data : workersRes.data.data || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load sites or workers");
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCalendarChange = (name: "workdate" | "dueDate", date: Date) => {
    setForm(prev => ({ ...prev, [name]: date.toISOString() }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.siteId || !form.workerId) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: {
        title: string;
        description: string;
        siteId: string;
        workerId: string;
        dueDate?: string;
        workdate?: string;
      } = {
        title: form.title,
        description: form.description,
        siteId: form.siteId,
        workerId: form.workerId,
      };

      if (form.dueDate) payload.dueDate = new Date(form.dueDate).toISOString();
      if (form.workdate) payload.workdate = new Date(form.workdate).toISOString();

      const response = await serverFetch.post("/work-assignment/create", {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message || "Failed to assign task");
        return;
      }

      toast.success("Task assigned successfully!");
      setForm({
        title: "",
        description: "",
        siteId: "",
        workerId: "",
        dueDate: "",
        workdate: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-md shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold">Assign Task</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Task Title */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="title">Task Title</Label>
          <Input id="title" name="title" value={form.title} onChange={handleChange} required />
        </div>

        {/* Task Description */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="description">Task Description</Label>
          <Textarea id="description" name="description" value={form.description} onChange={handleChange} required />
        </div>

        {/* Site Select */}
        <div className="flex flex-col space-y-1">
          <Label>Select Site</Label>
          <Select value={form.siteId} onValueChange={(v) => handleSelectChange("siteId", v)}>
            <SelectTrigger>
              <SelectValue placeholder="-- Select Site --" />
            </SelectTrigger>
            <SelectContent>
              {sites.map(site => (
                <SelectItem key={site.id} value={site.id}>{site.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Worker Select */}
        <div className="flex flex-col space-y-1">
          <Label>Select Worker</Label>
          <Select value={form.workerId} onValueChange={(v) => handleSelectChange("workerId", v)}>
            <SelectTrigger>
              <SelectValue placeholder="-- Select Worker --" />
            </SelectTrigger>
            <SelectContent>
              {workers.map(worker => (
                <SelectItem key={worker.id} value={worker.id}>{worker.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Work Date */}
        <div className="flex flex-col space-y-1">
          <Label>Work Date (optional)</Label>
          <div className="w-full md:w-[300px]">
            <Calendar
              mode="single"
              selected={form.workdate ? new Date(form.workdate) : undefined}
              onSelect={(date) => date && handleCalendarChange("workdate", date)}
            />
          </div>
        </div>

        {/* Due Date */}
        <div className="flex flex-col space-y-1">
          <Label>Due Date (optional)</Label>
          <div className="w-full md:w-[300px]">
            <Calendar
              mode="single"
              selected={form.dueDate ? new Date(form.dueDate) : undefined}
              onSelect={(date) => date && handleCalendarChange("dueDate", date)}
            />
          </div>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Assigning..." : "Assign Task"}
      </Button>
    </form>
  );
}
