import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return <footer className="mt-20 bg-ink text-[#f9eadc]">
    <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_.7fr_1fr]">
      <div><p className="display text-3xl text-white">DHALI&apos;s Unique Collection</p><p className="mt-3 max-w-sm text-sm leading-7 text-[#d9c7b8]">Food, treats and everyday essentials for the dogs and cats in your family.</p></div>
      <div><p className="mb-4 text-xs font-black text-turmeric">Quick links</p><div className="grid gap-3 text-sm"><Link href="/shop">Shop all</Link><Link href="/about">About us</Link><Link href="/delivery">Delivery & COD</Link><Link href="/privacy">Privacy</Link><Link href="/admin/login" className="text-[#bda997]">Admin</Link></div></div>
      <address className="not-italic"><p className="mb-4 text-xs font-black uppercase tracking-[.18em] text-amber">Visit or call</p><div className="grid gap-4 text-sm leading-6"><p className="flex gap-3"><MapPin className="mt-1 shrink-0" size={18}/>G-1,2,3, D.N.C.C Market,<br/>Gulshan-2, Dhaka-1212</p><a href="tel:+8801618500629" className="flex items-center gap-3"><Phone size={18}/>01618-500629</a><a href="mailto:dhalisuniquecollection@gmail.com" className="flex items-start gap-3 break-all"><Mail className="mt-1 shrink-0" size={18}/>dhalisuniquecollection@gmail.com</a></div></address>
    </div>
    <div className="border-t border-white/10 py-5 text-center text-xs text-[#bda997]">© {new Date().getFullYear()} DHALI&apos;s Unique Collection / Cash on Delivery only / Built by <a href="mailto:dauduibrahimhasan@gmail.com" className="font-bold text-white hover:text-amber">Nexasity</a></div>
  </footer>;
}
