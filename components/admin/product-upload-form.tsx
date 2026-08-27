"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { ImagePlus, LoaderCircle, UploadCloud, X } from "lucide-react";
import { createProduct, type ProductActionState } from "@/app/admin/actions";

type Category = { id: string; name: string };
const initialState: ProductActionState = {};

export function ProductUploadForm({ categories }: { categories: Category[] }) {
  const [state, action, pending] = useActionState(createProduct, initialState);
  const [preview, setPreview] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setPreview("");
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={action}
      className="grid gap-6 border border-[#E5E7EB] bg-white p-6 shadow-xs"
    >
      <div className="border-b border-[#E5E7EB] pb-3">
        <h2 className="text-lg font-black uppercase tracking-tight text-[#111827]">
          Upload a Product
        </h2>
        <p className="mt-1 text-xs text-[#6B7280]">
          Add product information, image, category, and inventory stock to publish to the shop catalogue.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Image Upload Box */}
        <div>
          <label className="group relative grid aspect-square cursor-pointer place-items-center overflow-hidden border border-dashed border-[#D1D5DB] bg-[#F9FAFB] text-center hover:border-[#55387D] transition-colors">
            <input
              name="image"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  if (preview) URL.revokeObjectURL(preview);
                  setPreview(URL.createObjectURL(file));
                }
              }}
            />
            {preview ? (
              <Image
                src={preview}
                alt="Selected product preview"
                fill
                className="object-contain p-3"
                unoptimized
              />
            ) : (
              <span className="px-5">
                <ImagePlus className="mx-auto text-[#55387D]" size={32} strokeWidth={2} />
                <strong className="mt-3 block text-xs font-black uppercase text-[#111827]">
                  Choose Image
                </strong>
                <small className="mt-1 block text-[10.5px] text-[#6B7280]">
                  JPG, PNG, WebP (max 5 MB)
                </small>
              </span>
            )}
          </label>
          {preview && (
            <button
              type="button"
              onClick={() => setPreview("")}
              className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#D91E18] hover:underline"
            >
              <X size={14} strokeWidth={2.2} />
              <span>Remove preview</span>
            </button>
          )}
        </div>

        {/* Input Fields */}
        <div className="grid gap-4">
          <label className="block text-xs font-bold text-[#111827]">
            <span>Product Name <span className="text-[#D91E18]">*</span></span>
            <input
              name="name"
              required
              minLength={2}
              placeholder="e.g. SmartHeart Adult Cat Food Chicken & Tuna 1.2kg"
              className="mt-1 w-full border border-[#D1D5DB] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-bold text-[#111827]">
              <span>Category <span className="text-[#D91E18]">*</span></span>
              <select
                name="categoryId"
                required
                defaultValue=""
                className="mt-1 w-full border border-[#D1D5DB] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D] cursor-pointer"
              >
                <option value="" disabled>Select category</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-xs font-bold text-[#111827]">
              <span>Weight or Size <span className="text-[#D91E18]">*</span></span>
              <input
                name="weight"
                required
                placeholder="e.g. 1.2 kg or 70g"
                className="mt-1 w-full border border-[#D1D5DB] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D]"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block text-xs font-bold text-[#111827]">
              <span>Selling Price (BDT) <span className="text-[#D91E18]">*</span></span>
              <input
                name="price"
                required
                min="1"
                type="number"
                inputMode="numeric"
                placeholder="e.g. 650"
                className="mt-1 w-full border border-[#D1D5DB] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D]"
              />
            </label>

            <label className="block text-xs font-bold text-[#111827]">
              <span>Old Price (BDT) <span className="font-normal text-[#6B7280]">(Optional)</span></span>
              <input
                name="compareAt"
                min="0"
                type="number"
                inputMode="numeric"
                placeholder="e.g. 700"
                className="mt-1 w-full border border-[#D1D5DB] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D]"
              />
            </label>

            <label className="block text-xs font-bold text-[#111827]">
              <span>Stock Quantity <span className="text-[#D91E18]">*</span></span>
              <input
                name="stock"
                required
                min="0"
                type="number"
                inputMode="numeric"
                placeholder="e.g. 24"
                className="mt-1 w-full border border-[#D1D5DB] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D]"
              />
            </label>
          </div>

          <label className="block text-xs font-bold text-[#111827]">
            <span>Product Description <span className="text-[#D91E18]">*</span></span>
            <textarea
              name="description"
              required
              minLength={10}
              rows={3}
              placeholder="Detailed nutritional value, ingredients, and feeding guide..."
              className="mt-1 w-full border border-[#D1D5DB] bg-white p-3 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D]"
            />
          </label>

          <label className="block text-xs font-bold text-[#111827]">
            <span>Badge Text <span className="font-normal text-[#6B7280]">(e.g. - ৳15, 5% OFF, Newly Added)</span></span>
            <input
              name="badge"
              maxLength={30}
              placeholder="e.g. - ৳50"
              className="mt-1 w-full border border-[#D1D5DB] bg-white px-3.5 py-2 text-xs sm:text-sm text-[#111827] outline-none focus:border-[#55387D]"
            />
          </label>

          <div className="flex flex-wrap gap-5 pt-1">
            <label className="flex items-center gap-2 text-xs font-bold text-[#111827] cursor-pointer">
              <input name="featured" type="checkbox" className="h-4 w-4 accent-[#55387D]" />
              <span>Mark as Featured Product</span>
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-[#111827] cursor-pointer">
              <input name="bestSeller" type="checkbox" className="h-4 w-4 accent-[#55387D]" />
              <span>Mark as Best Seller</span>
            </label>
          </div>
        </div>
      </div>

      {state.error && (
        <div role="alert" className="border border-red-300 bg-red-50 px-4 py-3 text-xs font-bold text-red-800">
          {state.error}
        </div>
      )}

      {state.success && (
        <div role="status" className="border border-green-300 bg-[#ECFFEC] px-4 py-3 text-xs font-bold text-green-900">
          {state.success}
        </div>
      )}

      <button
        disabled={pending || !categories.length}
        type="submit"
        className="inline-flex items-center gap-2 bg-[#55387D] hover:bg-[#432B64] px-7 py-3 text-xs font-black uppercase tracking-wider text-white shadow-xs transition-colors disabled:cursor-not-allowed disabled:opacity-60 self-start"
      >
        {pending ? (
          <>
            <LoaderCircle className="animate-spin" size={16} />
            <span>Saving Product...</span>
          </>
        ) : (
          <>
            <UploadCloud size={16} strokeWidth={2.2} />
            <span>Publish Product</span>
          </>
        )}
      </button>
    </form>
  );
}
