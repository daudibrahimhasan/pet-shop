import { redirect } from "next/navigation";
import { Clock, MapPin, Phone, ShoppingBag, Truck } from "lucide-react";
import { updateOrderStatus } from "@/app/admin/actions";
import { getAdmin } from "@/lib/admin";
import { readLocalOrders, type LocalOrder } from "@/lib/local-store";
import { formatPrice } from "@/lib/data";

const statuses = ["Pending", "Confirmed", "Out for Delivery", "Delivered", "Cancelled"];

export default async function AdminOrdersPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  let orders: LocalOrder[] = [];
  if (admin.mode === "local") {
    orders = await readLocalOrders();
  } else {
    const { data } = await admin.supabase
      .from("orders")
      .select("id,order_number,customer_name,phone,delivery_address,total,status,created_at")
      .order("created_at", { ascending: false });
    orders = (data || []) as LocalOrder[];
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] bg-white p-6 shadow-xs">
        <span className="inline-block bg-[#F3EEF9] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#55387D] border border-[#55387D]/20">
          Order Management
        </span>
        <h1 className="mt-2 text-2xl font-black uppercase tracking-tight text-[#111827] sm:text-3xl">
          Cash on Delivery Orders
        </h1>
        <p className="mt-1 text-xs text-[#6B7280]">
          Review incoming COD orders, call customers for confirmation, and update delivery states.
        </p>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {orders.map((order) => (
          <article
            key={order.id}
            className="grid gap-6 border border-[#E5E7EB] bg-white p-6 shadow-xs md:grid-cols-[1.1fr_1.3fr_auto]"
          >
            {/* Column 1: Order Ref & Total */}
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#6B7280]">
                Reference:
              </span>
              <strong className="block text-base font-black text-[#55387D]">
                {order.order_number}
              </strong>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-[#6B7280]">
                <Clock size={13} strokeWidth={2} />
                <span>
                  {new Date(order.created_at).toLocaleString("en-BD", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
              <p className="mt-3 text-lg font-black text-[#111827] tabular-nums">
                {formatPrice(order.total)}
              </p>
            </div>

            {/* Column 2: Customer Details */}
            <div className="space-y-1.5 text-xs text-[#4B5563]">
              <strong className="block text-sm font-black text-[#111827]">
                {order.customer_name}
              </strong>
              <p className="flex items-center gap-1.5 font-bold text-[#111827]">
                <Phone size={13} strokeWidth={2.2} className="text-[#55387D]" />
                <a href={`tel:${order.phone}`} className="hover:underline">{order.phone}</a>
              </p>
              <p className="flex items-start gap-1.5 text-[#6B7280]">
                <MapPin size={13} strokeWidth={2.2} className="mt-0.5 shrink-0 text-[#55387D]" />
                <span>{order.delivery_address}</span>
              </p>
            </div>

            {/* Column 3: Status Update Form */}
            <form action={updateOrderStatus} className="self-center">
              <input type="hidden" name="id" value={order.id} />
              <label className="block text-xs font-bold text-[#111827]">
                <span>Status</span>
                <select
                  name="status"
                  defaultValue={order.status}
                  className="mt-1 w-full border border-[#D1D5DB] bg-[#F9FAFB] px-3 py-2 text-xs font-bold outline-none focus:border-[#55387D] cursor-pointer"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="mt-2 w-full bg-[#55387D] hover:bg-[#432B64] py-2 px-4 text-xs font-black uppercase tracking-wider text-white shadow-xs transition-colors"
              >
                Update Status
              </button>
            </form>
          </article>
        ))}

        {!orders.length && (
          <div className="border border-dashed border-[#D1D5DB] bg-white p-12 text-center shadow-xs">
            <div className="mx-auto grid h-14 w-14 place-items-center bg-[#F3EEF9] text-[#55387D] border border-[#55387D]/20">
              <ShoppingBag size={24} strokeWidth={2.2} />
            </div>
            <h3 className="mt-3 text-base font-black uppercase text-[#111827]">
              No Orders Found
            </h3>
            <p className="mt-1 text-xs text-[#6B7280]">
              Customer Cash on Delivery orders placed on the storefront will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
