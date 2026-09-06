import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import DomeGallery from "../components/utils/DomeGallery";
import Services from "../components/utils/Services";

CustomEase.create("hop", "0.9,0,0.1,1");
CustomEase.create("glide", "0.8,0,0.2,1");

gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);
const HomePage = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    const loaderImgs = gsap.utils.toArray(".loader-img");

    const split1 = new SplitText(".main-text", {
      type: "chars",
      mask: "chars",
    });
    const split2 = new SplitText(".side-text", {
      type: "lines",
      mask: "lines",
    });

    loaderImgs.forEach((img) => {
      gsap.set(img, {
        rotate: gsap.utils.random(-20, 20),
      });
    });

    split1.chars.forEach((char, i) => {
      char.addEventListener("mouseenter", () => {
        gsap.to(char, {
          scale: 0.8,
          rotate: gsap.utils.random(-10, 10),
        });
      });
      char.addEventListener("mouseleave", () => {
        gsap.to(char, {
          scale: 1,
        });
      });

      return () => {
        char.removeEventListener("mouseenter", () => {
          gsap.to(char, {
            scale: 1,
            color: "white",
            ease: "power2.out",
          });
        });
        char.removeEventListener("mouseleave", () => {
          gsap.to(char, {
            scale: 1,
            color: "white",
            ease: "power2.out",
          });
        });
      };
    });

    tl.to(".loader-img", {
      scale: 1,
      stagger: 0.15,
    });

    tl.to(".loader-img:not(.mid-img)", {
      yPercent: 250,
      stagger: {
        each: 0.15,
        from: "random",
      },
      ease: "power1.inOut",
    });

    tl.to(".mid-img", {
      width: "100vw",
      height: "100vh",
      rotate: 0,
      duration: 0.8,
      ease: "glide",
      onComplete: () => {
        gsap.set(".hidden-text", { display: "block" });
      },
    });

    tl.from(
      split1.chars,
      {
        yPercent: 100,
        stagger: 0.05,
      },
      "<0.38",
    );
    tl.from(
      ".main-text-bar",
      {
        scaleX: 0,
        ease: "power3.out",
      },
      "<0.1",
    );
    tl.from(
      split2.lines,
      {
        yPercent: 100,
        stagger: 0.1,
      },
      "<0.05",
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".first-part",
          start: "top top",
          end: "bottom top",
          pin: true,
          scrub: 1,
        },
      })
      .to(".first-part", {
        xPercent: 150,
        onComplete: () => {
          gsap.set(".first-part", { display: "none" });
        },
      });

    const split3 = new SplitText(".main-scroll-text", {
      type: "chars",
    });

    gsap.set(".main-scroll-text", { xPercent: 100 });

    split3.chars.forEach((char) => {
      gsap.set(char, {
        rotate: gsap.utils.random(20, -20),
        y: gsap.utils.random(200, -200),
      });
    });

    const split4 = new SplitText(".globe-text", {
      type: "chars",
      mask: "chars",
    });

    ScrollTrigger.create({
      trigger: ".globe-part",
      start: "top 60%",
      end: "+=40%",
      scrub: 1,
      animation: gsap.from(split4.chars, {
        y: 180,
        stagger: 0.1,
      }),
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".second-part",
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      })
      .from(".second-part", {
        xPercent: -65,
        duration: 2,
      })
      .to(
        ".main-scroll-text",
        {
          xPercent: -100,
          duration: 10,
          ease: "none",
        },
        "<1",
      )
      .to(
        split3.chars,
        {
          y: 0,
          rotate: 0,
          stagger: {
            each: 0.15,
          },
        },
        "<1.8",
      );
  });
  return (
    <>
      <div className="absolute border-b-18 border-white top-0 right-0 w-full h-screen bg-[#b98c58] p-4 text-primary">
        <h2 className="text-[10vw] hidden-text hidden leading-none font-bold uppercase sticky top-0">
          Photo <br /> graphy
        </h2>
      </div>
      <div className="absolute top-full right-0 w-full h-screen bg-[#e6cfad] p-4 text-primary">
        <h2 className="text-[10vw] leading-none font-bold uppercase sticky top-0">
          is my <br /> passion
        </h2>
      </div>
      <div className="absolute top-[200%] right-0 w-full h-screen bg-[#d0ae7e] p-4 text-primary">
        <h2 className="text-[8vw] text-right leading-none font-bold uppercase sticky top-0">
          Let&apos;s create <br /> magic
        </h2>
      </div>
      <div className="absolute top-[300%] right-0 w-full h-screen">
        <img
          src="/opt/lg/image-5.webp"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="first-part relative h-screen overflow-hidden">
        {" "}
        <div className="loader-parent h-full w-full relative flex justify-center items-center">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={`loader-img scale-0 absolute w-[250px] h-[250px] ${i === 4 ? "mid-img" : ""}`}
            >
              <img
                src={
                  i === 4
                    ? `/opt/lg/image-${i + 1}.webp`
                    : `/opt/sm/image-${i + 1}.webp`
                }
                alt=""
                className="w-full h-full object-cover"
              />
              {i === 4 && <div className="absolute inset-0 bg-black/60"></div>}
            </div>
          ))}
        </div>{" "}
        <div className="main-part p-6 md:p-12 font-semibold text-6xl absolute inset-0 h-full w-full bg-transparent">
          <h1 className="main-text text-[100px] md:text-[15vw] uppercase text-primary leading-none hover:cursor-default">
            <span className="whitespace-nowrap">
              <span className="text-secondary">S</span>ara
            </span>{" "}
            <span className="whitespace-nowrap">
              <span className="text-secondary">i</span>saac
            </span>
            <div className="h-1.5 w-[88%] origin-left bg-secondary main-text-bar"></div>
          </h1>
        </div>
        <div className="side-part absolute bottom-20 left-12 text-primary">
          <p className="side-text text-lg font-semibold max-w-[500px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus animi
            necessitatibus adipisci, recusandae, porro non dolorum delectus
            quisquam voluptatum sapiente earum eaque consequatur temporibus
            veniam autem quos ipsam consequuntur dolore.
          </p>
        </div>
      </div>
      <div className="second-part flex justify-center items-center relative bg-secondary h-screen z-5">
        <h2 className="main-scroll-text text-[12vw] whitespace-nowrap text-primary font-bold uppercase">
          i dont take photos i craft experiences
        </h2>
      </div>
      <div style={{ width: "100vw", height: "150vh" }} className="globe-part">
        <h2 className="globe-text leading-[0.9] text-[10vw] pb-20 font-bold text-center p-6">
          Welcome to
          <span className="whitespace-nowrap"> my world</span>
        </h2>
        <DomeGallery
          fit={0.8}
          minRadius={600}
          maxVerticalRotationDeg={20}
          segments={34}
          dragDampening={2}
          grayscale={false}
        />
      </div>
      <Services />
    </>
  );
};

export default HomePage;
