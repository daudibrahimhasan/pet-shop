"use client";

import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";
import { removeProduct } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm font-bold text-red-700 hover:bg-red-50 disabled:opacity-50">
      <Trash2 size={16} />
      {pending ? "Removing..." : "Remove"}
    </button>
  );
}

export function RemoveProductButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={removeProduct}
      onSubmit={(event) => {
        if (!window.confirm(`Remove “${name}” from the catalogue? It will disappear from the storefront.`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton />
    </form>
  );
}
