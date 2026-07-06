"use client";

import { useState } from "react";
import { FormRenderer } from "@/components/form-system/FormRenderer";
import { DemoValues, demoSchema } from "./schema";

export default function FormDemoPage() {
  const [submitted, setSubmitted] = useState<DemoValues | null>(null);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-10">
      <div className="mb-8 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-6">
        <FormRenderer
          schema={demoSchema}
          onSubmit={(values) => {
            setSubmitted(values);
          }}
        />
      </div>

      <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-primary)] p-6">
        <div className="mb-2 text-sm font-semibold">提交结果</div>
        <pre className="overflow-auto rounded-lg bg-black/80 p-4 text-xs text-white">
          {JSON.stringify(submitted, null, 2)}
        </pre>
      </div>
    </div>
  );
}

