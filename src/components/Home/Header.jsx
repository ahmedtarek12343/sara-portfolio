import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef } from "react";
import { Link } from "react-router";
import SplitText from "gsap/SplitText";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const menuTimeline = useRef(null);
  const containerRef = useRef(null);
  const colorArr = [
    "#f5eadb",
    "#e6cfad",
    "#d0ae7e",
    "#b98c58",
    "#986c31",
    "#6b481f",
  ];

  const { contextSafe } = useGSAP(
    () => {
      const navbars = gsap.utils.toArray(".navbar");
      const splitNavLinks = new SplitText(".nav-item", {
        type: "lines",
        mask: "lines",
      });

      menuTimeline.current = gsap.timeline({ paused: true });

      menuTimeline.current
        .to(navbars, {
          xPercent: -100,
          stagger: 0.1,
          ease: "power1.inOut",
        })
        .from(
          splitNavLinks.lines,
          {
            yPercent: 100,
            ease: "hop",
            stagger: 0.15,
          },
          "-=0.45",
        );
    },
    { scope: containerRef },
  );

  useGSAP(() => {
    if (!menuTimeline.current) return;

    if (isMenuOpen) {
      menuTimeline.current.play();
    } else {
      menuTimeline.current.reverse();
    }
  }, [isMenuOpen]);

  const handleEnter = contextSafe(() => {
    const fullWidth = contentRef.current.offsetWidth;
    gsap.to(buttonRef.current, {
      width: fullWidth + 24, // + horizontal padding
      duration: 0.4,
      ease: "power3.out",
    });
  });

  const handleLeave = contextSafe(() => {
    gsap.to(buttonRef.current, {
      width: 40,
      duration: 0.35,
      ease: "power3.inOut",
    });
  });

  return (
    <div ref={containerRef} className="relative z-60">
      {" "}
      <div
        className="overlay bg-black/60 fixed inset-0"
        style={{
          opacity: isMenuOpen ? 1 : 0,
          transition: "opacity 0.2s ease-in-out",
        }}
        onClick={() => setIsMenuOpen(false)}
      />
      <div className="fixed p-6 bg-secondary text-primary top-0 right-0 h-dvh w-[min(100%,700px)] translate-x-full">
        {colorArr.map((color, i) => (
          <div
            key={i}
            className={`navbar absolute inset-0`}
            style={{ backgroundColor: color }}
          ></div>
        ))}
        <div className="navbar p-4 absolute inset-0 z-10">
          <div className="relative z-20 h-full">
            <ul className="absolute top-4 right-10 text-[clamp(38px,7vw,3rem)]  font-semibold space-y-2">
              <li className="nav-item overflow-hidden">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item overflow-hidden">
                <Link to="/about">About</Link>
              </li>
              <li className="nav-item overflow-hidden">
                <Link to="/services">Services</Link>
              </li>
              <li className="nav-item overflow-hidden">
                <Link to="/gallery">Gallery</Link>
              </li>
              <li className="nav-item overflow-hidden">
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <div className="absolute bottom-6 left-3">
              <div className="flex flex-col gap-2 text-md">
                <a
                  href="https://www.instagram.com/saramisaac"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a href="mailto:saramisaac@hotmail.com">Email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 right-5 flex items-center gap-4">
        <button
          ref={buttonRef}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="bg-secondary hover:cursor-pointer text-primary border border-primary rounded-full h-10 overflow-hidden flex items-center justify-start px-2"
          style={{ width: 40 }} // initial icon-only width
        >
          <div
            ref={contentRef}
            className={`camera flex items-center gap-2 ${isMenuOpen ? "flash-on" : ""}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <span className="say-cheese whitespace-nowrap">Say Cheese!</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Header;
