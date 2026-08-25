create extension if not exists pgcrypto;
create type public.order_status as enum ('Pending','Confirmed','Out for Delivery','Delivered','Cancelled');

create table public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade, created_at timestamptz not null default now());
create table public.categories (id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null, description text not null default '', accent text not null default '#DDEEE4', active boolean not null default true, sort_order integer not null default 0, created_at timestamptz not null default now());
create table public.products (id uuid primary key default gen_random_uuid(), category_id uuid not null references public.categories(id), name text not null, slug text unique not null, description text not null default '', price integer not null check(price>=0), compare_at_price integer check(compare_at_price is null or compare_at_price>=price), stock integer not null default 0 check(stock>=0), weight text not null default '', badge text, image_path text, active boolean not null default true, featured boolean not null default false, best_seller boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.orders (id uuid primary key default gen_random_uuid(), order_number text unique not null, customer_name text not null, phone text not null, delivery_address text not null, notes text, status public.order_status not null default 'Pending', subtotal integer not null check(subtotal>=0), total integer not null check(total>=0), created_at timestamptz not null default now(), updated_at timestamptz not null default now());
create table public.order_items (id uuid primary key default gen_random_uuid(), order_id uuid not null references public.orders(id) on delete cascade, product_id uuid references public.products(id) on delete set null, product_name text not null, unit_price integer not null, quantity integer not null check(quantity between 1 and 20), line_total integer not null);
create index products_category_idx on public.products(category_id) where active=true;
create index orders_status_idx on public.orders(status,created_at desc);

create function public.is_admin() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.admin_users where user_id=auth.uid()); $$;
revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon,authenticated;

create function public.place_cod_order(customer_details jsonb, cart_items jsonb) returns text language plpgsql security definer set search_path='' as $$
declare item jsonb; product_row public.products%rowtype; quantity_value integer; subtotal_value integer:=0; order_id_value uuid; order_number_value text;
begin
  if coalesce(length(trim(customer_details->>'name')),0)<2 then raise exception 'Invalid name'; end if;
  if (customer_details->>'phone') !~ '^(\+?88)?01[3-9][0-9]{8}$' then raise exception 'Invalid phone'; end if;
  if coalesce(length(trim(customer_details->>'address')),0)<10 then raise exception 'Invalid address'; end if;
  if jsonb_array_length(cart_items)<1 or jsonb_array_length(cart_items)>30 then raise exception 'Invalid cart'; end if;
  for item in select * from jsonb_array_elements(cart_items) loop
    quantity_value:=(item->>'quantity')::integer;
    select * into product_row from public.products where id=(item->>'productId')::uuid and active=true for update;
    if not found or quantity_value<1 or quantity_value>20 or product_row.stock<quantity_value then raise exception 'Product unavailable'; end if;
    subtotal_value:=subtotal_value+(product_row.price*quantity_value);
  end loop;
  order_number_value:='DUC-'||to_char(now(),'YYYY')||'-'||upper(substr(encode(gen_random_bytes(4),'hex'),1,8));
  insert into public.orders(order_number,customer_name,phone,delivery_address,notes,subtotal,total) values(order_number_value,trim(customer_details->>'name'),customer_details->>'phone',trim(customer_details->>'address'),nullif(trim(customer_details->>'notes'),''),subtotal_value,subtotal_value) returning id into order_id_value;
  for item in select * from jsonb_array_elements(cart_items) loop
    quantity_value:=(item->>'quantity')::integer; select * into product_row from public.products where id=(item->>'productId')::uuid for update;
    insert into public.order_items(order_id,product_id,product_name,unit_price,quantity,line_total) values(order_id_value,product_row.id,product_row.name,product_row.price,quantity_value,product_row.price*quantity_value);
    update public.products set stock=stock-quantity_value,updated_at=now() where id=product_row.id;
  end loop;
  return order_number_value;
end; $$;
revoke execute on function public.place_cod_order(jsonb,jsonb) from public;
grant execute on function public.place_cod_order(jsonb,jsonb) to anon,authenticated;

alter table public.admin_users enable row level security; alter table public.categories enable row level security; alter table public.products enable row level security; alter table public.orders enable row level security; alter table public.order_items enable row level security;
create policy "Public reads active categories" on public.categories for select using(active or public.is_admin());
create policy "Public reads active products" on public.products for select using(active or public.is_admin());
create policy "Admins manage categories" on public.categories for all using(public.is_admin()) with check(public.is_admin());
create policy "Admins manage products" on public.products for all using(public.is_admin()) with check(public.is_admin());
create policy "Admins read orders" on public.orders for select using(public.is_admin());
create policy "Admins update order status" on public.orders for update using(public.is_admin()) with check(public.is_admin());
create policy "Admins read order items" on public.order_items for select using(public.is_admin());

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('product-images','product-images',true,5000000,array['image/jpeg','image/png','image/webp','image/avif']) on conflict(id) do nothing;
create policy "Public reads product images" on storage.objects for select using(bucket_id='product-images');
create policy "Admins upload product images" on storage.objects for insert to authenticated with check(bucket_id='product-images' and public.is_admin());
create policy "Admins update product images" on storage.objects for update to authenticated using(bucket_id='product-images' and public.is_admin()) with check(bucket_id='product-images' and public.is_admin());
create policy "Admins delete product images" on storage.objects for delete to authenticated using(bucket_id='product-images' and public.is_admin());

insert into public.categories(name,slug,description,accent,sort_order) values ('Cat Food','cat-food','Dry, wet and treats for cats.','#F2B84B',1),('Dog Food','dog-food','Food and treats for dogs.','#DDEEE4',2),('Treats','treats','Small rewards for good pets.','#F6D4C6',3),('Accessories','accessories','Bowls, litter and daily essentials.','#D7E3F0',4) on conflict(slug) do nothing;

-- Create the owner in Supabase Authentication, then grant admin access:
-- insert into public.admin_users(user_id) values('AUTH_USER_UUID');
