"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {

  const tasks = useQuery(api.tasks.get);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Inicio</h1>
      <p className="text-lg text-foreground/80 mb-8">
        Bienvenido a Zebra CMS
      </p>

      {tasks?.map((task) => (
        <div key={task._id}
          className="text-2xl font-bold"
        >{task.text}
          <Checkbox
            checked={task.isCompleted}
            className="ml-2 border-2 border-gray-300 rounded-md"
          />
        </div>
      ))}

      <Button>Click me</Button>
    </div>
  );
}
