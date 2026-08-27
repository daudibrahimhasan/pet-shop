"use client";

import { useFormStatus } from "react-dom";
import { Trash2 } from "lucide-react";
import { removeProduct } from "@/app/admin/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-1.5 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 text-xs font-bold text-red-800 transition-colors disabled:opacity-50"
    >
      <Trash2 size={13} strokeWidth={2} />
      <span>{pending ? "Removing..." : "Remove"}</span>
    </button>
  );
}

export function RemoveProductButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={removeProduct}
      onSubmit={(event) => {
        if (!window.confirm(`Remove “${name}” from the catalogue? It will disappear from the storefront.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton />
    </form>
  );
}
