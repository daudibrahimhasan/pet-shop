import { redirect } from "next/navigation";
import { updateOrderStatus } from "@/app/admin/actions";
import { getAdmin } from "@/lib/admin";
import { readLocalOrders, type LocalOrder } from "@/lib/local-store";

const statuses = ["Pending", "Confirmed", "Out for Delivery", "Delivered", "Cancelled"];

export default async function AdminOrdersPage() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  let orders: LocalOrder[] = [];
  if (admin.mode === "local") {
    orders = await readLocalOrders();
  } else {
    const { data } = await admin.supabase.from("orders").select("id,order_number,customer_name,phone,delivery_address,total,status,created_at").order("created_at", { ascending: false });
    orders = (data || []) as LocalOrder[];
  }

  return (
    <>
      <div className="mb-8">
        <p className="text-sm font-bold text-papaya">Cash on Delivery</p>
        <h1 className="font-display mt-1 text-4xl font-bold md:text-5xl">Orders</h1>
      </div>
      <div className="grid gap-4">
        {orders.map((order) => (
          <article key={order.id} className="grid gap-4 rounded-2xl bg-white p-5 md:grid-cols-[1fr_1.3fr_auto]">
            <div><strong>{order.order_number}</strong><p className="mt-1 text-sm text-muted">{new Date(order.created_at).toLocaleString("en-BD")}</p><p className="mt-3 text-lg font-black">BDT {order.total.toLocaleString("en-BD")}</p></div>
            <div className="text-sm leading-6"><strong>{order.customer_name}</strong><p>{order.phone}</p><p className="text-muted">{order.delivery_address}</p></div>
            <form action={updateOrderStatus} className="self-center">
              <input type="hidden" name="id" value={order.id} />
              <label className="field">Order status<select name="status" defaultValue={order.status}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
              <button className="mt-2 min-h-11 w-full rounded-xl bg-cocoa px-4 text-sm font-black text-white">Update status</button>
            </form>
          </article>
        ))}
        {!orders.length && <div className="rounded-2xl bg-white p-12 text-center text-muted">No orders yet. Local COD orders will appear here.</div>}
      </div>
    </>
  );
}
