"use client";

import Image from "next/image";
import { type MouseEvent, type PointerEvent, type TouchEvent, type WheelEvent, useEffect, useRef, useState } from "react";

type GalleryItem = {
  title: string;
  file: string;
};

type Testimonial = {
  title: string;
  quote: string;
  name: string;
  region: string;
  file: string;
};

type LightboxImage = {
  src: string;
  title: string;
};

type TouchPointList = {
  length: number;
  [index: number]: {
    clientX: number;
    clientY: number;
  };
};

type Point = {
  x: number;
  y: number;
};

const whatsappNumber = "6281287440836";
const whatsappMessage = encodeURIComponent(
  "Assalamualaikum, saya ingin konsultasi dan pesan hewan qurban. Mohon info paket dan jadwal pengiriman."
);
const whatsappHref = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const INTERACTION_PRESETS = {
  smoothLembut: {
    dragResistance: 0.45,
    snapKickPx: 10,
    snapDurationMs: 260,
    slideTransitionMs: 700,
  },
  lebihResponsif: {
    dragResistance: 0.35,
    snapKickPx: 14,
    snapDurationMs: 260,
    slideTransitionMs: 700,
  },
  snappyCepat: {
    dragResistance: 0.4,
    snapKickPx: 12,
    snapDurationMs: 220,
    slideTransitionMs: 560,
  },
} as const;

const ACTIVE_INTERACTION_PRESET: keyof typeof INTERACTION_PRESETS = "smoothLembut";
const ACTIVE_INTERACTION = INTERACTION_PRESETS[ACTIVE_INTERACTION_PRESET];

const AUTOPLAY_INTERVAL_MS = 4000;
const DRAG_RESISTANCE = ACTIVE_INTERACTION.dragResistance;
const MIN_SWIPE_THRESHOLD_PX = 50;
const SWIPE_THRESHOLD_RATIO = 0.12;
const SNAP_BACK_MIN_DRAG_PX = 10;
const SNAP_KICK_PX = ACTIVE_INTERACTION.snapKickPx;
const SNAP_DURATION_MS = ACTIVE_INTERACTION.snapDurationMs;
const SLIDE_TRANSITION_MS = ACTIVE_INTERACTION.slideTransitionMs;
const MIN_LIGHTBOX_ZOOM = 1;
const MAX_LIGHTBOX_ZOOM = 4;
const LIGHTBOX_WHEEL_STEP = 0.18;
const LIGHTBOX_WHEEL_PRECISION_STEP = 0.06;
const QUICK_TOGGLE_ZOOM = 2;
const DOUBLE_TAP_DELAY_MS = 280;
const LIGHTBOX_ZOOM_TRANSITION_MS = 280;
const LIGHTBOX_ZOOM_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const MOBILE_SCROLL_TOP_THRESHOLD = 0.25;

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M4 7h16" strokeLinecap="round" />
      <path d="M4 12h16" strokeLinecap="round" />
      <path d="M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M18 6 6 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m6 6 12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M12 19V5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m5 12 7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const menuItems = [
  { label: "Harga", href: "#harga" },
  { label: "Program", href: "#program" },
  { label: "Galeri", href: "#galeri" },
  { label: "Testimoni", href: "#testimoni" },
];

const pricingBanners: GalleryItem[] = [
  { title: "Daftar Harga Qurban", file: "Daftar Harga Qurban.JPG" },
  { title: "Ukuran Domba", file: "Ukuran Domba.jpg" },
  { title: "Ukuran Kambing", file: "Ukuran Kambing.jpg" },
];

const programBanners: GalleryItem[] = [
  { title: "Tebar Qurban Berbagi 1", file: "Tebar Qurban Berbagi (1).JPG" },
  { title: "Tebar Qurban Berbagi 2", file: "Tebar Qurban Berbagi (2).JPG" },
  { title: "Tebar Qurban Berbagi 3", file: "Tebar Qurban Berbagi (3).JPG" },
  { title: "Tebar Qurban Berbagi 4", file: "Tebar Qurban Berbagi (4).JPG" },
  { title: "Tebar Qurban Berbagi 5", file: "Tebar Qurban Berbagi (5).jpg" },
  { title: "Qurban Masak", file: "Qurban Masak.JPG" },
  { title: "Qurban Siap Bagi", file: "Qurban Siap Bagi.JPG" },
];

const galleryBanners: GalleryItem[] = [
  { title: "Galeri Program 1", file: "Poster (2).JPG" },
  { title: "Galeri Program 2", file: "Poster (3).JPG" },
];

const testimonials: Testimonial[] = [
  {
    title: "Distribusi Tepat Sasaran",
    quote:
      "Alhamdulillah prosesnya rapi dari awal sampai laporan. Tim cepat respon, hewan sesuai ekspektasi, dan dokumentasinya lengkap.",
    name: "Bapak Dedi",
    region: "Tangerang Selatan",
    file: "Tebar Qurban Berbagi (1).JPG",
  },
  {
    title: "Layanan Cepat dan Amanah",
    quote:
      "Kami order untuk keluarga besar. Mulai konsultasi, pembayaran, sampai pengiriman semua jelas. Sangat membantu untuk yang ingin praktis.",
    name: "Ibu Rina",
    region: "Depok",
    file: "Tebar Qurban Berbagi (3).JPG",
  },
  {
    title: "Rekomendasi untuk Qurban Kolektif",
    quote:
      "Untuk patungan kantor, adminnya komunikatif dan terstruktur. Progress update konsisten, jadi semua peserta merasa tenang.",
    name: "Mas Farhan",
    region: "Jakarta",
    file: "Tebar Qurban Berbagi (4).JPG",
  },
];

function toPublicSrc(fileName: string) {
  return `/ketentuan/${encodeURIComponent(fileName)}`;
}

function ImageGrid({
  items,
  columns = "md:grid-cols-2",
  onImageClick,
}: {
  items: GalleryItem[];
  columns?: string;
  onImageClick: (image: LightboxImage) => void;
}) {
  return (
    <div className={`mt-8 grid gap-5 ${columns}`}>
      {items.map((item) => (
        <article
          key={`${item.file}-${item.title}`}
          className="group overflow-hidden rounded-2xl border border-white/70 bg-white shadow-[0_20px_45px_rgba(123,28,24,0.12)]"
        >
          <button
            type="button"
            aria-label={`Perbesar foto ${item.title}`}
            className="relative h-[300px] w-full bg-[#fff6ea] sm:h-[360px] lg:h-[380px]"
            onClick={() => onImageClick({ src: toPublicSrc(item.file), title: item.title })}
          >
            <Image
              src={toPublicSrc(item.file)}
              alt={item.title}
              fill
              sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
              className="object-contain p-2 transition duration-300 group-hover:scale-[1.01]"
            />
          </button>
          <div className="border-t border-red-100 px-4 py-3">
            <p className="text-sm font-semibold text-red-900">{item.title}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileTopButton, setShowMobileTopButton] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [snapKick, setSnapKick] = useState(0);
  const [isSnapBack, setIsSnapBack] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);
  const [lightboxZoom, setLightboxZoom] = useState(MIN_LIGHTBOX_ZOOM);
  const [lightboxPan, setLightboxPan] = useState({ x: 0, y: 0 });
  const [isLightboxPanning, setIsLightboxPanning] = useState(false);
  const sliderViewportRef = useRef<HTMLDivElement | null>(null);
  const lightboxViewportRef = useRef<HTMLDivElement | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const snapBackTimerRef = useRef<number | null>(null);
  const pinchStartDistanceRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef(MIN_LIGHTBOX_ZOOM);
  const pinchStartCenterRef = useRef<Point | null>(null);
  const lightboxPointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const lightboxPanStartRef = useRef({ x: 0, y: 0 });
  const lastTapTimeRef = useRef(0);
  const pinchWasActiveRef = useRef(false);

  const getHeaderOffset = () => {
    const header = document.querySelector("header");
    const headerHeight = header?.getBoundingClientRect().height ?? 0;

    if (window.innerWidth < 640) return headerHeight + 12;
    if (window.innerWidth < 1024) return headerHeight + 16;
    return headerHeight + 20;
  };

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const top =
      sectionId === "top"
        ? 0
        : target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (sectionId: string, event?: MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault();
    setIsMobileMenuOpen(false);
    window.requestAnimationFrame(() => {
      scrollToSection(sectionId);
    });
  };

  const clampZoom = (value: number) => {
    return Math.min(MAX_LIGHTBOX_ZOOM, Math.max(MIN_LIGHTBOX_ZOOM, value));
  };

  const clampPan = (x: number, y: number, zoom = lightboxZoom) => {
    if (zoom <= MIN_LIGHTBOX_ZOOM) {
      return { x: 0, y: 0 };
    }

    const viewportWidth = lightboxViewportRef.current?.clientWidth ?? 0;
    const viewportHeight = lightboxViewportRef.current?.clientHeight ?? 0;
    const maxX = (viewportWidth * (zoom - 1)) / 2;
    const maxY = (viewportHeight * (zoom - 1)) / 2;

    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  };

  const setZoomWithPan = (nextZoom: number, focalPoint?: Point | null) => {
    const zoom = clampZoom(nextZoom);
    setLightboxZoom(zoom);

    if (focalPoint && lightboxZoom > 0) {
      const zoomRatio = zoom / lightboxZoom;
      const nextX = focalPoint.x - (focalPoint.x - lightboxPan.x) * zoomRatio;
      const nextY = focalPoint.y - (focalPoint.y - lightboxPan.y) * zoomRatio;
      setLightboxPan(clampPan(nextX, nextY, zoom));
    } else {
      setLightboxPan((current) => clampPan(current.x, current.y, zoom));
    }

    if (zoom <= MIN_LIGHTBOX_ZOOM) {
      setIsLightboxPanning(false);
      lightboxPointerStartRef.current = null;
    }
  };

  const getTouchDistance = (touches: TouchPointList) => {
    if (touches.length < 2) return 0;
    const touchA = touches[0];
    const touchB = touches[1];
    return Math.hypot(touchA.clientX - touchB.clientX, touchA.clientY - touchB.clientY);
  };

  const getTouchCenter = (touches: TouchPointList): Point | null => {
    if (touches.length < 2) return null;
    const touchA = touches[0];
    const touchB = touches[1];
    return {
      x: (touchA.clientX + touchB.clientX) / 2,
      y: (touchA.clientY + touchB.clientY) / 2,
    };
  };

  const getRelativeFocalPoint = (clientX: number, clientY: number): Point | null => {
    const rect = lightboxViewportRef.current?.getBoundingClientRect();
    if (!rect) return null;

    return {
      x: clientX - (rect.left + rect.width / 2),
      y: clientY - (rect.top + rect.height / 2),
    };
  };

  const handleZoomIn = () => {
    setZoomWithPan(lightboxZoom + LIGHTBOX_WHEEL_STEP);
  };

  const handleZoomOut = () => {
    setZoomWithPan(lightboxZoom - LIGHTBOX_WHEEL_STEP);
  };

  const handleZoomReset = () => {
    setZoomWithPan(MIN_LIGHTBOX_ZOOM);
    setLightboxPan({ x: 0, y: 0 });
  };

  const toggleQuickZoom = (focalPoint?: Point | null) => {
    if (lightboxZoom > MIN_LIGHTBOX_ZOOM) {
      handleZoomReset();
      return;
    }

    setZoomWithPan(QUICK_TOGGLE_ZOOM, focalPoint);
  };

  const openLightbox = (image: LightboxImage) => {
    setLightboxZoom(MIN_LIGHTBOX_ZOOM);
    setLightboxPan({ x: 0, y: 0 });
    setIsLightboxPanning(false);
    lightboxPointerStartRef.current = null;
    pinchStartDistanceRef.current = null;
    pinchStartCenterRef.current = null;
    setLightboxImage(image);
  };

  const handleLightboxWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const step = event.shiftKey ? LIGHTBOX_WHEEL_PRECISION_STEP : LIGHTBOX_WHEEL_STEP;
    const delta = event.deltaY < 0 ? step : -step;
    const focalPoint = getRelativeFocalPoint(event.clientX, event.clientY);
    setZoomWithPan(lightboxZoom + delta, focalPoint);
  };

  const handleLightboxTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2) return;

    pinchWasActiveRef.current = true;
    setIsLightboxPanning(false);
    lightboxPointerStartRef.current = null;
    pinchStartDistanceRef.current = getTouchDistance(event.touches);
    pinchStartCenterRef.current = getTouchCenter(event.touches);
    pinchStartZoomRef.current = lightboxZoom;
  };

  const handleLightboxTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2 || pinchStartDistanceRef.current === null) return;

    event.preventDefault();
    const currentDistance = getTouchDistance(event.touches);
    if (currentDistance <= 0) return;

    const ratio = currentDistance / pinchStartDistanceRef.current;
    const center = getTouchCenter(event.touches);
    const focalPoint = center ? getRelativeFocalPoint(center.x, center.y) : pinchStartCenterRef.current;
    setZoomWithPan(pinchStartZoomRef.current * ratio, focalPoint);
  };

  const handleLightboxTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length < 2) {
      pinchStartDistanceRef.current = null;
      pinchStartCenterRef.current = null;
    }

    if (event.touches.length !== 0 || event.changedTouches.length !== 1) return;
    if (pinchWasActiveRef.current) {
      pinchWasActiveRef.current = false;
      return;
    }

    const now = Date.now();
    if (now - lastTapTimeRef.current <= DOUBLE_TAP_DELAY_MS) {
      const touch = event.changedTouches[0];
      const focalPoint = touch ? getRelativeFocalPoint(touch.clientX, touch.clientY) : null;
      toggleQuickZoom(focalPoint);
      lastTapTimeRef.current = 0;
      return;
    }

    lastTapTimeRef.current = now;
  };

  const handleLightboxPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (lightboxZoom <= MIN_LIGHTBOX_ZOOM) return;

    lightboxPointerStartRef.current = { x: event.clientX, y: event.clientY };
    lightboxPanStartRef.current = lightboxPan;
    setIsLightboxPanning(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleLightboxPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pinchStartDistanceRef.current !== null) return;
    if (!isLightboxPanning || lightboxPointerStartRef.current === null) return;

    const deltaX = event.clientX - lightboxPointerStartRef.current.x;
    const deltaY = event.clientY - lightboxPointerStartRef.current.y;
    const nextPan = clampPan(lightboxPanStartRef.current.x + deltaX, lightboxPanStartRef.current.y + deltaY);
    setLightboxPan(nextPan);
  };

  const stopLightboxPan = () => {
    lightboxPointerStartRef.current = null;
    setIsLightboxPanning(false);
  };

  const handleLightboxPointerUp = () => {
    stopLightboxPan();
  };

  const handleLightboxPointerCancel = () => {
    stopLightboxPan();
  };

  const goToNextSlide = () => {
    setActiveSlide((current) => (current + 1) % testimonials.length);
  };

  const goToPrevSlide = () => {
    setActiveSlide((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStartX.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || pointerStartX.current === null) return;

    const rawDeltaX = event.clientX - pointerStartX.current;
    const isAtFirstSlide = activeSlide === 0;
    const isAtLastSlide = activeSlide === testimonials.length - 1;
    const isPullingPastStart = isAtFirstSlide && rawDeltaX > 0;
    const isPullingPastEnd = isAtLastSlide && rawDeltaX < 0;

    if (isPullingPastStart || isPullingPastEnd) {
      // Add boundary resistance so drag feels heavier at carousel edges.
      setDragOffset(rawDeltaX * DRAG_RESISTANCE);
      return;
    }

    setDragOffset(rawDeltaX);
  };

  const triggerSnapBack = (direction: -1 | 1) => {
    if (snapBackTimerRef.current !== null) {
      window.clearTimeout(snapBackTimerRef.current);
    }

    setIsSnapBack(true);
    setSnapKick(direction * SNAP_KICK_PX);

    window.requestAnimationFrame(() => {
      setSnapKick(0);
    });

    snapBackTimerRef.current = window.setTimeout(() => {
      setIsSnapBack(false);
      snapBackTimerRef.current = null;
    }, SNAP_DURATION_MS);
  };

  const finishPointerDrag = () => {
    if (pointerStartX.current === null) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }

    const sliderWidth = sliderViewportRef.current?.clientWidth ?? 0;
    const swipeThreshold = Math.max(MIN_SWIPE_THRESHOLD_PX, sliderWidth * SWIPE_THRESHOLD_RATIO);
    const isAtFirstSlide = activeSlide === 0;
    const isAtLastSlide = activeSlide === testimonials.length - 1;
    const hitBoundary = (isAtFirstSlide && dragOffset > 0) || (isAtLastSlide && dragOffset < 0);

    if (Math.abs(dragOffset) > swipeThreshold) {
      if (dragOffset < 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    } else if (hitBoundary && Math.abs(dragOffset) > SNAP_BACK_MIN_DRAG_PX) {
      triggerSnapBack(dragOffset > 0 ? -1 : 1);
    }

    pointerStartX.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handlePointerUp = () => {
    finishPointerDrag();
  };

  const handlePointerCancel = () => {
    finishPointerDrag();
  };

  useEffect(() => {
    if (isDragging) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [isDragging]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth >= 768) {
        setShowMobileTopButton(false);
        return;
      }

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setShowMobileTopButton(false);
        return;
      }

      const progress = window.scrollY / scrollable;
      setShowMobileTopButton(progress >= MOBILE_SCROLL_TOP_THRESHOLD);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (snapBackTimerRef.current !== null) {
        window.clearTimeout(snapBackTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!lightboxImage) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
    };
  }, [lightboxImage]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff7eb_0%,#fff3dd_42%,#ffe9ce_100%)] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-red-200/70 bg-[#fff6e8]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="inline-flex min-w-0 items-center gap-2 sm:gap-3" onClick={(event) => handleNavClick("top", event)}>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-red-200 bg-white sm:h-12 sm:w-12">
              <Image src="/Logo.png" alt="Logo Qurban" width={46} height={46} className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-xl leading-none tracking-wide text-red-950 sm:text-2xl lg:text-3xl">AAF mitra Juragan Kambing</span>
          </a>

          <nav className="hidden items-center gap-2 md:flex">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-red-900 transition hover:bg-red-100"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 bg-white text-red-900 md:hidden"
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
            onClick={() => setIsMobileMenuOpen((value) => !value)}
          >
            {isMobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={`overflow-hidden border-t border-red-200/80 px-4 transition-[max-height,opacity,padding] duration-300 md:hidden ${
            isMobileMenuOpen ? "max-h-96 py-3 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className={`${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
            <nav className="mx-auto flex w-full max-w-7xl flex-col gap-2 rounded-2xl border border-red-200 bg-white p-2 text-sm shadow-sm">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-3 font-semibold text-red-900 transition hover:bg-red-50"
                  onClick={(event) => handleNavClick(item.href.replace("#", ""), event)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-80">
            <div className="absolute left-[-12%] top-[-18%] h-72 w-72 rounded-full bg-orange-300/35 blur-3xl" />
            <div className="absolute right-[-14%] top-[18%] h-72 w-72 rounded-full bg-red-300/30 blur-3xl" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 pb-10 pt-10 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24 lg:pt-24">
            <div className="hero-enter">
              <p className="inline-flex rounded-full border border-red-300 bg-red-100 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-red-900">
                Qurban 2026
              </p>
              <h1 className="mt-6 font-display text-5xl leading-[0.95] text-red-950 sm:text-6xl lg:text-7xl">
                Layanan Qurban Amanah,
                <span className="text-[#b34700]"> Cepat, dan Jelas Harganya</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
                Pilih domba, kambing, atau sapi qurban dengan proses transparan dari konsultasi sampai distribusi. Cocok untuk keluarga, komunitas, sampai qurban kolektif kantor.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-red-800 px-6 py-3 text-sm font-bold text-white shadow-[0_18px_30px_rgba(127,29,29,0.28)] transition hover:-translate-y-0.5 hover:bg-red-700"
                >
                  Konsultasi Sekarang
                </a>
                <a
                  href="#harga"
                  className="rounded-full border border-red-300 bg-white px-6 py-3 text-sm font-bold text-red-900 transition hover:bg-red-50"
                >
                  Lihat Daftar Harga
                </a>
              </div>
            </div>

            <div className="hero-enter-delay relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-[conic-gradient(from_150deg_at_50%_50%,rgba(255,190,92,0.25),rgba(255,140,80,0.1),rgba(255,190,92,0.25))] blur-xl" />
              <article className="overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_28px_55px_rgba(107,33,17,0.18)]">
                <button
                  type="button"
                  aria-label="Perbesar foto poster daftar harga qurban"
                  className="relative aspect-[4/3] w-full bg-[#fff6ea]"
                  onClick={() =>
                    openLightbox({
                      src: toPublicSrc("Daftar Harga Qurban.JPG"),
                      title: "Poster Daftar Harga Qurban",
                    })
                  }
                >
                  <Image src={toPublicSrc("Daftar Harga Qurban.JPG")} alt="Poster Daftar Harga Qurban" fill className="object-contain p-2" priority />
                </button>
                <div className="border-t border-red-100 px-5 py-4">
                  <p className="text-sm font-semibold text-red-900">Daftar Harga Qurban Terbaru</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="harga" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="section-label">Daftar Harga</div>
          <h2 className="section-title">Pilihan Paket dan Rentang Harga Favorit</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Semua harga ditampilkan terbuka agar kamu bisa hitung budget lebih cepat. Tinggal pilih ukuran hewan, lalu tim kami bantu rekomendasi paket yang paling pas.
          </p>
          <ImageGrid items={pricingBanners} columns="md:grid-cols-3" onImageClick={openLightbox} />
        </section>

        <section id="program" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="section-label">Program</div>
          <h2 className="section-title">Program Tebar Qurban Berbagi Tepat Sasaran</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Kami bantu distribusi hewan qurban ke wilayah prioritas agar manfaatnya lebih terasa. Setiap tahap didokumentasikan agar kamu bisa memantau prosesnya.
          </p>
          <ImageGrid items={programBanners} columns="md:grid-cols-2 xl:grid-cols-3" onImageClick={openLightbox} />
        </section>

        <section id="galeri" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="section-label">Galeri</div>
          <h2 className="section-title">Galeri Kualitas Hewan dan Aktivitas Lapangan</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-700 sm:text-base">
            Lihat langsung dokumentasi campaign, promo, dan pelaksanaan program kami. Visual ini jadi bukti komitmen pelayanan dari pra-order sampai hari H.
          </p>
          <ImageGrid items={galleryBanners} columns="md:grid-cols-2 xl:grid-cols-3" onImageClick={openLightbox} />
        </section>

        <section id="testimoni" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="section-label">Testimoni</div>
          <h2 className="section-title">Cerita Nyata Pelanggan Kami</h2>

          <div
            ref={sliderViewportRef}
            className="relative mt-8 overflow-hidden rounded-3xl border border-red-200 bg-white shadow-[0_20px_45px_rgba(123,28,24,0.12)]"
          >
            <div
              className={`flex touch-pan-y select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              style={{
                transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset + snapKick}px))`,
                transition: isDragging
                  ? "none"
                  : isSnapBack
                    ? `transform ${SNAP_DURATION_MS}ms cubic-bezier(0.34,1.56,0.64,1)`
                    : `transform ${SLIDE_TRANSITION_MS}ms ease-out`,
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onDragStart={(event) => event.preventDefault()}
            >
              {testimonials.map((item) => (
                <article key={item.title} className="grid w-full shrink-0 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative min-h-[270px] sm:min-h-[320px] lg:min-h-[520px]">
                    <Image
                      src={toPublicSrc(item.file)}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1023px) 100vw, 58vw"
                      className="object-contain bg-[#fff6ea] p-2"
                    />
                  </div>

                  <div className="flex min-h-[250px] flex-col justify-between gap-4 bg-[linear-gradient(150deg,#7f1d1d,#9f2d12)] p-6 text-white sm:p-8 lg:min-h-[520px]">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-orange-200">Testimoni Pelanggan</p>
                      <h3 className="mt-4 font-display text-4xl leading-none tracking-wide text-white sm:text-5xl">{item.title}</h3>
                      <p className="mt-6 text-sm leading-7 text-orange-100 sm:text-base">&quot;{item.quote}&quot;</p>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <p className="text-base font-bold">{item.name}</p>
                      <p className="text-sm text-orange-100">{item.region}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 border-t border-red-100 bg-[#fff8ed] px-4 py-4">
              {testimonials.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Lihat testimoni ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeSlide ? "w-8 bg-red-800" : "w-2.5 bg-red-300 hover:bg-red-500"
                  }`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-red-200 bg-[linear-gradient(135deg,#7f1d1d,#9a3412)] px-6 py-10 text-center text-white sm:px-10">
            <h3 className="font-display text-4xl tracking-wide sm:text-5xl">Siap Pesan Hewan Qurban?</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-orange-100 sm:text-base">
              Tim admin siap bantu hitung budget, cek stok, dan rekomendasikan hewan terbaik sesuai kebutuhanmu. Pesan sekarang sebelum kuota pengiriman penuh.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-white px-7 py-3 text-sm font-black uppercase tracking-[0.08em] text-red-900 transition hover:bg-orange-100"
            >
              Hubungi WhatsApp Admin
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-red-200 bg-[#fff4e1]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-red-900 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>Copyright 2026 AAF mitra Juragan Kambing. Semua hak dilindungi.</p>
        </div>
      </footer>

      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto"
          className="fixed inset-0 z-[90] bg-black/85 p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          <div className="absolute right-4 top-4 z-10 flex items-center gap-2" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="rounded-full border border-white/50 bg-white/10 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/20"
              aria-label="Perkecil"
              onClick={handleZoomOut}
            >
              -
            </button>
            <button
              type="button"
              className="rounded-full border border-white/50 bg-white/10 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/20"
              aria-label="Reset zoom"
              onClick={handleZoomReset}
            >
              {Math.round(lightboxZoom * 100)}%
            </button>
            <button
              type="button"
              className="rounded-full border border-white/50 bg-white/10 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/20"
              aria-label="Perbesar"
              onClick={handleZoomIn}
            >
              +
            </button>
            <button
              type="button"
              className="rounded-full border border-white/50 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              onClick={() => setLightboxImage(null)}
            >
              Tutup
            </button>
          </div>
          <div
            className="relative mx-auto h-full w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
            onWheel={handleLightboxWheel}
            onTouchStart={handleLightboxTouchStart}
            onTouchMove={handleLightboxTouchMove}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <div
              ref={lightboxViewportRef}
              className={`relative h-full w-full overflow-hidden ${
                lightboxZoom > MIN_LIGHTBOX_ZOOM
                  ? isLightboxPanning
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-default"
              }`}
              style={{ touchAction: lightboxZoom > MIN_LIGHTBOX_ZOOM ? "none" : "auto" }}
              onPointerDown={handleLightboxPointerDown}
              onPointerMove={handleLightboxPointerMove}
              onPointerUp={handleLightboxPointerUp}
              onPointerCancel={handleLightboxPointerCancel}
              onDoubleClick={(event) => {
                event.stopPropagation();
                const focalPoint = getRelativeFocalPoint(event.clientX, event.clientY);
                toggleQuickZoom(focalPoint);
              }}
            >
              <Image
                src={lightboxImage.src}
                alt={lightboxImage.title}
                fill
                sizes="100vw"
                className="object-contain"
                style={{
                  transform: `translate(${lightboxPan.x}px, ${lightboxPan.y}px) scale(${lightboxZoom})`,
                  transformOrigin: "center center",
                  transition: isLightboxPanning
                    ? "none"
                    : `transform ${LIGHTBOX_ZOOM_TRANSITION_MS}ms ${LIGHTBOX_ZOOM_EASING}`,
                }}
                priority
              />
            </div>
            <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-xs font-medium text-white sm:text-sm">
              {lightboxImage.title} - Zoom {Math.round(lightboxZoom * 100)}%
            </p>
          </div>
        </div>
      )}

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat WhatsApp"
            className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_18px_34px_rgba(37,211,102,0.45)] transition hover:-translate-y-1 hover:scale-105 max-[359px]:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] max-[359px]:right-3 sm:bottom-24 sm:right-6 sm:h-14 sm:w-14 md:bottom-6 md:right-6 md:inline-flex"
          >
        <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className="h-7 w-7 sm:h-8 sm:w-8">
          <path d="M16.02 3.2c-7.05 0-12.77 5.72-12.77 12.77 0 2.26.6 4.47 1.73 6.41L3.2 28.8l6.57-1.73a12.7 12.7 0 0 0 6.25 1.69h.01c7.05 0 12.78-5.72 12.78-12.77A12.8 12.8 0 0 0 16.02 3.2Zm0 23.36h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.03 1.04-3.8-.25-.4a10.56 10.56 0 1 1 8.91 4.88Zm5.81-7.94c-.32-.16-1.88-.93-2.18-1.03-.29-.1-.5-.16-.7.16-.21.32-.8 1.03-.98 1.25-.18.21-.37.24-.68.08a8.55 8.55 0 0 1-2.53-1.56 9.45 9.45 0 0 1-1.75-2.17c-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.15-.18.2-.32.3-.53.1-.21.05-.4-.03-.56-.08-.16-.7-1.7-.97-2.33-.25-.6-.5-.52-.7-.53h-.6c-.21 0-.56.08-.86.4-.29.32-1.12 1.1-1.12 2.69 0 1.58 1.15 3.1 1.3 3.31.16.21 2.26 3.45 5.48 4.84.77.34 1.38.54 1.85.69.78.25 1.48.21 2.03.13.62-.1 1.88-.77 2.15-1.52.27-.74.27-1.39.19-1.52-.08-.14-.29-.22-.61-.38Z" />
        </svg>
      </a>

      {showMobileTopButton && (
        <button
          type="button"
          aria-label="Kembali ke atas"
          className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-4 z-[70] inline-flex h-11 w-11 items-center justify-center rounded-full border border-red-200 bg-white text-red-900 shadow-[0_10px_26px_rgba(127,29,29,0.18)] transition hover:-translate-y-0.5 max-[359px]:bottom-[calc(6.25rem+env(safe-area-inset-bottom))] max-[359px]:right-3 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12 md:hidden"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
  );
}
