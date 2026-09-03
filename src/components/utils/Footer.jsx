import React from "react";
import Lanyard from "./Lanyard";

const Footer = () => {
  return (
    <footer className="footer absolute inset-0 bg-secondary text-primary z-10 px-8 md:px-14 pt-16 pb-8">
      <div className="container mx-auto h-full flex flex-col justify-between">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 border-b border-primary/20 pb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <h2 className="text-3xl font-semibold mb-3">Sara Isaac</h2>
            <p className="text-primary/70 text-sm leading-relaxed">
              Capturing people, places, and light — one frame at a time.
              Available for portrait, natural scene, and freelance sessions.
            </p>
          </div>

          {/* Nav */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-primary/50 mb-4">
                Connect
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.instagram.com/saramisaac"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary/70 transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:saramisaac@hotmail.com"
                    className="hover:text-primary/70 transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Center block — big statement to fill the extra vertical space */}
        <div className="flex-1 flex items-center justify-center">
          <h2 className="text-[8vw] md:text-[6vw] font-semibold text-center leading-none">
            Let's create something.
          </h2>
        </div>{" "}
        <Lanyard
          position={[0, 0, 24]}
          gravity={[0, -40, 0]}
          frontImage="/sara.jpg"
          backImage="/sara.jpg"
          imageFit="cover"
          lanyardImage="/image-3.jpeg"
          lanyardWidth={0.2}
        ></Lanyard>
        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 text-xs text-primary/50">
          <p>
            &copy; {new Date().getFullYear()} Sara Isaac. All rights reserved.
          </p>
          <p className="camera flex items-center gap-2">
            Shot, edited, and built with care in Cairo.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
