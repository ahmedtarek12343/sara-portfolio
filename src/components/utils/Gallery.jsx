import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import gsap from "gsap";
import { useState, useRef } from "react";
import invert from "../../lib/util";

gsap.registerPlugin(ScrollTrigger);

const images = Array.from({ length: 25 }, (_, i) => `/image-${i + 1}.jpeg`);
export const galleryData = [
  { color: "#1a2b3c", text: "City Lights" },
  { color: "#2d4a5e", text: "Old Streets" },
  { color: "#6b5744", text: "Stone Facades" },
  { color: "#4a3f35", text: "Golden Hour" },
  { color: "#8b7355", text: "Desert Trails" },
  { color: "#3e4a3a", text: "Wild Savanna" },
  { color: "#5c6b4f", text: "Open Plains" },
  { color: "#c9a876", text: "Dune Shadows" },
  { color: "#7a8471", text: "Mountain Air" },
  { color: "#d4a373", text: "Sunset Ridge" },
  { color: "#6f7d5c", text: "Grazing Fields" },
  { color: "#4f5d4a", text: "Untamed Land" },
  { color: "#8fa89e", text: "Highland Fog" },
  { color: "#556b6f", text: "Ancient Ruins" },
  { color: "#7c8a8d", text: "Coastal Towers" },
  { color: "#a3c1c9", text: "Ocean Breeze" },
  { color: "#6d8a96", text: "Blue Horizon" },
  { color: "#3f5d6b", text: "Deep Waters" },
  { color: "#8a7568", text: "Warm Sands" },
  { color: "#d9b48f", text: "Coastal Glow" },
  { color: "#a8c4d4", text: "Island Skies" },
  { color: "#7fa8c9", text: "Turquoise Bay" },
  { color: "#5a7d9a", text: "Distant Shores" },
  { color: "#3d5a73", text: "Map & Memory" },
  { color: "#2c3e50", text: "Journey's End" },
];

export default function Gallery() {
  const [countGallery, setCountGallery] = useState(0);
  const mainImgRef = useRef(null);
  const thumbsRef = useRef([]);

  // Scroll-driven counter
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".gallery",
      start: "top top",
      end: "+=350%",
      pin: true,
      scrub: 1,
      onUpdate: ({ progress }) => {
        const newCount = Math.floor(progress * (images.length - 1));
        setCountGallery(newCount);
      },
    });
  }, []);

  // Animation that fires every time countGallery changes
  useGSAP(() => {
    if (!mainImgRef.current) return;

    // Main image: clip-path reveal + subtle scale settle
    gsap.fromTo(
      mainImgRef.current,
      {
        opacity: 0,
        scale: 1.08,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      },
    );

    gsap.to(".gallery", {
      backgroundColor: galleryData[countGallery].color,
      color: invert(galleryData[countGallery].color),
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.fromTo(
      ".gallery-text",
      {
        scaleX: 0,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      },
    );

    // Thumbnails: highlight the active one, dim the rest
    thumbsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === countGallery ? 1 : 0.35,
        scale: i === countGallery ? 1.1 : 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [countGallery]);

  return (
    <section className="relative gallery w-full px-14 py-10 h-screen">
      <div className="flex justify-center flex-wrap container mx-auto px-5 w-full">
        {images.map((src, index) => (
          <div
            key={src}
            ref={(el) => (thumbsRef.current[index] = el)}
            className="img-wrapper w-[50px] h-[50px] aspect-video relative overflow-hidden"
          >
            <img
              src={src}
              alt=""
              className="gallery-img h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse md:flex-row w-full justify-between items-center">
        <h2 className="font-semibold text-4xl gallery-text mt-15 md:mt-0">
          {galleryData[countGallery].text}
        </h2>
        <div className="mt-20 aspect-video w-full md:basis-[70%] overflow-hidden shadow-2xl border-white border-4 rounded-3xl">
          <img
            ref={mainImgRef}
            src={`/image-${countGallery + 1}.jpeg`}
            alt=""
            className="main-gallery-img h-full w-full object-cover"
          />
        </div>{" "}
        <p className="font-semibold text-2xl absolute md:top-5 md:right-5 top-[95%] right-[85%]">
          {countGallery + 1}/{images.length}
        </p>
      </div>
    </section>
  );
}
