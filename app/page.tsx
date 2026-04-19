"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useMemo, useState } from "react";

type SectionId = "top" | "benefit" | "katalog" | "harga" | "gallery" | "cara-kerja";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.02 3.2c-7.05 0-12.77 5.72-12.77 12.77 0 2.26.6 4.47 1.73 6.41L3.2 28.8l6.57-1.73a12.7 12.7 0 0 0 6.25 1.69h.01c7.05 0 12.78-5.72 12.78-12.77A12.8 12.8 0 0 0 16.02 3.2Zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.03 1.04-3.8-.25-.4a10.56 10.56 0 1 1 8.91 4.88Zm5.81-7.94c-.32-.16-1.88-.93-2.18-1.03-.29-.1-.5-.16-.7.16-.21.32-.8 1.03-.98 1.25-.18.21-.37.24-.68.08a8.55 8.55 0 0 1-2.53-1.56 9.45 9.45 0 0 1-1.75-2.17c-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.15-.18.2-.32.3-.53.1-.21.05-.4-.03-.56-.08-.16-.7-1.7-.97-2.33-.25-.6-.5-.52-.7-.53h-.6c-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.69 0 1.58 1.15 3.1 1.3 3.31.16.21 2.26 3.45 5.48 4.84.77.34 1.38.54 1.85.69.78.25 1.48.21 2.03.13.62-.1 1.88-.77 2.15-1.52.27-.74.27-1.39.19-1.52-.08-.14-.29-.22-.61-.38Z" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={className}>
      <path d="M12 19V5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m5 12 7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={className}>
      <path d="M4 7h16" strokeLinecap="round" />
      <path d="M4 12h16" strokeLinecap="round" />
      <path d="M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={className}>
      <path d="M18 6 6 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m6 6 12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("top");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const whatsappNumber = "6281287440836";
  const whatsappMessage = encodeURIComponent(
    "Halo, saya ingin konsultasi dan pesan hewan qurban. Mohon info stok, harga, dan jadwal pengantaran."
  );
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const formatRupiah = (value: number) =>
    `Rp${Math.trunc(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;

  const reasons = [
    {
      title: "Hewan terpilih",
      description:
        "Pilihan domba, kambing, dan sapi qurban dengan kondisi sehat, terawat, dan siap disesuaikan kebutuhan.",
    },
    {
      title: "Dokumentasi jelas",
      description:
        "Proses penyembelihan, penyaluran, dan laporan dikemas rapi agar pelanggan merasa tenang.",
    },
    {
      title: "Bisa konsultasi cepat",
      description:
        "Cocok untuk pembeli pertama maupun pembelian kolektif. Tinggal chat, kami bantu rekomendasi.",
    },
  ];

  const packages = [
    {
      name: "Domba",
      badge: "Perorangan",
      description: "Cocok untuk qurban keluarga dengan hewan yang sehat dan layak.",
      points: ["Konsultasi kebutuhan", "Dokumentasi proses", "Pengantaran area tertentu"],
      images: [
        { src: "/Domba%20Garut.png", alt: "Domba Garut" },
      ],
    },
    {
      name: "Kambing",
      badge: "Perorangan",
      description: "Untuk Anda yang ingin hewan qurban dengan tampilan lebih premium dan terawat.",
      points: ["Seleksi kondisi hewan", "Update status cepat", "Opsi pesan lebih awal"],
      images: [
        { src: "/Kambing%20Etawa.png", alt: "Kambing Etawa" },
        { src: "/Kambing%20Kacang.png", alt: "Kambing Kacang" },
      ],
    },
    {
      name: "Sapi",
      badge: "Perorangan / Kolektif",
      description: "Ideal untuk grup keluarga, kantor, atau komunitas yang ingin qurban bersama.",
      points: ["Pembagian patungan jelas", "Pendampingan admin", "Jadwal fleksibel"],
      images: [
        { src: "/Sapi%20Bali.png", alt: "Sapi Bali" },
        { src: "/Sapi%20Limosine.png", alt: "Sapi Limosine" },
      ],
    },
  ];

  const galleryItems = [
    { title: "Domba Garut", type: "Domba", src: "/Domba%20Garut.png" },
    { title: "Kambing Etawa", type: "Kambing", src: "/Kambing%20Etawa.png" },
    { title: "Kambing Kacang", type: "Kambing", src: "/Kambing%20Kacang.png" },
    { title: "Sapi Bali", type: "Sapi", src: "/Sapi%20Bali.png" },
    { title: "Sapi Limosine", type: "Sapi", src: "/Sapi%20Limosine.png" },
    { title: "Sapi PO", type: "Sapi", src: "/Sapi%20PO.png" },
  ];

  const navItems = useMemo(
    () => [
      { id: "benefit" as SectionId, label: "Benefit" },
      { id: "katalog" as SectionId, label: "Paket Hewan" },
      { id: "harga" as SectionId, label: "Harga" },
      { id: "gallery" as SectionId, label: "Gallery" },
      { id: "cara-kerja" as SectionId, label: "Cara Order" },
    ],
    []
  );

  const catalogSmallRuminants = [
    { tipe: "A", berat: "20 kg", harga: 2750000 },
    { tipe: "B", berat: "25 kg", harga: 3250000 },
    { tipe: "C", berat: "30 kg", harga: 3650000 },
    { tipe: "D", berat: "35 kg", harga: 4150000 },
    { tipe: "E", berat: "40 kg", harga: 4450000 },
    { tipe: "F", berat: "45 kg", harga: 5150000 },
    { tipe: "G", berat: "50 kg", harga: 6150000 },
  ];

  const catalogCattle = [
    { tipe: "A", berat: "200 - 250 kg", hargaMulai: 21500000, hargaSampai: 23500000 },
    { tipe: "B", berat: "251 - 300 kg", hargaMulai: 25500000, hargaSampai: 27500000 },
    { tipe: "C", berat: "301 - 350 kg", hargaMulai: 28500000, hargaSampai: 30500000 },
    { tipe: "D", berat: "351 - 400 kg", hargaMulai: 31500000, hargaSampai: 33500000 },
    { tipe: "E", berat: "401 - 450 kg", hargaMulai: 34500000, hargaSampai: 37500000 },
    { tipe: "F", berat: "451 - 500 kg", hargaMulai: 39500000, hargaSampai: 43500000 },
  ];

  const salesTermsSmallRuminants = [
    "DP wajib 50% atau minimal Rp500.000.",
    "Pelunasan dilakukan sebelum pengiriman.",
    "Setelah hewan sampai lokasi, tanggung jawab ada pada customer.",
    "Pembatalan order: DP hangus.",
    "Harga bisa berubah sewaktu-waktu.",
    "Free ongkir area JaBoDeTaBek.",
    "Berat pada katalog adalah estimasi, bukan timbangan real.",
  ];

  const salesTermsCattle = [
    "DP wajib 50% atau minimal Rp1.000.000.",
    "Pelunasan dilakukan sebelum pengiriman.",
    "Setelah hewan sampai lokasi, tanggung jawab ada pada customer.",
    "Pembatalan order: DP hangus.",
    "Harga bisa berubah sewaktu-waktu.",
    "Free ongkir area JaBoDeTaBek.",
    "Berat pada katalog adalah estimasi, bukan timbangan real.",
  ];

  const steps = [
    {
      title: "Pilih hewan",
      description: "Konsultasikan kebutuhan, budget, dan lokasi agar rekomendasi tepat.",
    },
    {
      title: "Pemesanan",
      description: "Konfirmasi pesanan dengan cepat tanpa formulir yang rumit.",
    },
    {
      title: "Pengiriman & laporan",
      description: "Hewan dikirim sesuai jadwal, lalu Anda menerima update prosesnya.",
    },
  ];

  const getHeaderOffset = () => {
    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height ?? 0;

    if (window.innerWidth < 640) return headerHeight + 12;
    if (window.innerWidth < 1024) return headerHeight + 16;
    return headerHeight + 20;
  };

  useEffect(() => {
    const sections = ["top", ...navItems.map((item) => item.id)] as SectionId[];
    const lastSection: SectionId = "cara-kerja";

    const updateActiveSection = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (window.scrollY <= 8) {
        setActiveSection("top");
        return;
      }

      if (docHeight - scrollBottom <= 8) {
        setActiveSection(lastSection);
        return;
      }

      const marker =
        window.scrollY +
        getHeaderOffset() +
        (window.innerWidth < 640 ? 12 : window.innerWidth < 1024 ? 22 : 34);

      let current: SectionId = "top";

      for (const id of sections) {
        const element = document.getElementById(id);
        if (!element) continue;

        if (marker >= element.offsetTop) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [navItems]);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setShowBackToTop(false);
        return;
      }

      setShowBackToTop(window.scrollY > scrollable / 2);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (sectionId: SectionId) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerOffset = getHeaderOffset();
    const top =
      sectionId === "top"
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (sectionId: SectionId, event?: MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    setActiveSection(sectionId);
    setIsMobileNavOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(to_bottom,_#ffffff,_#f8fafc_42%,_#ecfeff_100%)]">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#top"
            aria-label="AAF Qurban"
            title="AAF Qurban"
            className="inline-flex items-center gap-3"
            onClick={(event) => handleNavClick("top", event)}
          >
            <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-emerald-200 bg-white shadow-sm sm:h-14 sm:w-14">
              <Image src="/Logo.png" alt="Logo AAF Qurban" width={56} height={56} className="h-full w-full object-cover" priority />
            </span>
            <span className="text-2xl font-semibold tracking-tight text-slate-900">
              <span className="text-emerald-600">AAF</span> Qurban
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-4 py-2 transition ${activeSection === item.id ? "bg-emerald-100 font-semibold text-emerald-800" : "text-slate-600 hover:text-slate-900"}`}
                onClick={(event) => handleNavClick(item.id, event)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 md:hidden"
            aria-label="Buka navigasi"
            onClick={() => setIsMobileNavOpen((value) => !value)}
          >
            {isMobileNavOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={`overflow-hidden border-t border-slate-200/80 px-4 transition-[max-height,opacity,padding] duration-300 md:hidden ${
            isMobileNavOpen ? "max-h-80 py-3 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className={`${isMobileNavOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
            <nav className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 text-sm shadow-sm">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`rounded-xl px-4 py-3 transition ${activeSection === item.id ? "bg-emerald-600 font-semibold text-white" : "text-slate-700 hover:bg-slate-100"}`}
                  onClick={(event) => handleNavClick(item.id, event)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main id="top" className="pb-28 md:pb-0">
        <section className="w-full scroll-mt-20 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="animate-fade-up mx-auto w-full max-w-[1440px] rounded-[2rem] border border-emerald-100 bg-white/85 p-6 shadow-sm backdrop-blur sm:p-10 lg:p-14">
            <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Pesan <span className="text-emerald-600">hewan qurban berkualitas</span> dengan proses yang cepat dan aman.
              </h1>

              <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-500 sm:w-auto"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Order via WhatsApp
                </a>
                <a
                  href="#katalog"
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
                >
                  Lihat Paket
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="benefit" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Kenapa kami</p>
          </div>

          <div className="stagger-fade mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((item) => (
              <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 h-12 w-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="katalog" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Paket hewan</p>
          </div>

          <div className="stagger-fade mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((item) => (
              <div key={item.name} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mb-5 grid grid-cols-2 gap-2">
                  {item.images.map((image) => (
                    <div key={image.src} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <Image src={image.src} alt={image.alt} width={280} height={200} className="h-24 w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-slate-950">{item.name}</h3>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="harga" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Katalog harga</p>
            </div>
          </div>

          <div className="stagger-fade mt-10 grid items-stretch gap-6 xl:grid-cols-2">
            <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="flex min-h-[130px] flex-col border-b border-slate-100 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Domba & Kambing</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950">Jenis: Domba Garut, Kambing Etawa, Kambing Kacang</h3>
              </div>

              <div className="overflow-x-auto px-4 py-4 sm:px-6">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-slate-500">
                      <th className="py-3 pr-4 font-medium">Tipe</th>
                      <th className="py-3 pr-4 font-medium">Berat</th>
                      <th className="py-3 font-medium">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogSmallRuminants.map((item) => (
                      <tr key={item.tipe} className="border-b border-slate-100/80 last:border-b-0">
                        <td className="py-3 pr-4 font-semibold text-slate-900">{item.tipe}</td>
                        <td className="py-3 pr-4 text-slate-700">{item.berat}</td>
                        <td className="py-3 font-semibold text-emerald-700">{formatRupiah(item.harga)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-auto min-h-[240px] space-y-2 border-t border-slate-100 bg-slate-50 px-6 py-5 text-sm text-slate-600">
                {salesTermsSmallRuminants.map((term) => (
                  <p key={term}>• {term}</p>
                ))}
              </div>
            </article>

            <article className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="flex min-h-[130px] flex-col border-b border-slate-100 px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">Sapi</p>
                <h3 className="mt-2 text-2xl font-semibold text-slate-950">Jenis: Sapi Bali, Sapi Limosine, Sapi PO (Peranakan Ongole)</h3>
              </div>

              <div className="overflow-x-auto px-4 py-4 sm:px-6">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-slate-500">
                      <th className="py-3 pr-4 font-medium">Tipe</th>
                      <th className="py-3 pr-4 font-medium">Berat</th>
                      <th className="py-3 font-medium">Rentang Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogCattle.map((item) => (
                      <tr key={item.tipe} className="border-b border-slate-100/80 last:border-b-0">
                        <td className="py-3 pr-4 font-semibold text-slate-900">{item.tipe}</td>
                        <td className="py-3 pr-4 text-slate-700">{item.berat}</td>
                        <td className="py-3 font-semibold text-emerald-700">
                          {formatRupiah(item.hargaMulai)} - {formatRupiah(item.hargaSampai)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-auto min-h-[240px] space-y-2 border-t border-slate-100 bg-slate-50 px-6 py-5 text-sm text-slate-600">
                {salesTermsCattle.map((term) => (
                  <p key={term}>• {term}</p>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="gallery" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Gallery</p>
            </div>
          </div>

          <div className="stagger-fade mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="relative h-56 w-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="px-5 py-4">
                  <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{item.type}</span>
                  <h3 className="mt-3 text-base font-semibold text-slate-950">{item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="cara-kerja" className="mx-auto w-full max-w-[1440px] scroll-mt-20 px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Cara order</p>
          </div>

          <div className="stagger-fade mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-semibold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 AAF Qurban. Semua hak dilindungi.</p>
        </div>
      </footer>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="float-attention fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white shadow-lg shadow-emerald-600/30 transition hover:scale-105 md:h-14 md:w-14"
        aria-label="Chat WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      {showBackToTop && (
        <a
          href="#top"
          className="fixed bottom-20 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-lg transition hover:-translate-y-0.5 hover:text-slate-900 md:bottom-24 md:right-6"
          aria-label="Kembali ke atas"
          onClick={(event) => handleNavClick("top", event)}
        >
          <ArrowUpIcon className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
