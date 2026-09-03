import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/src/ScrollTrigger";
import gsap from "gsap";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Portrait & Model",
    desc: "Editorial and studio shoots that bring out presence and character.",
  },
  {
    title: "Natural Scenes",
    desc: "Landscapes, light, and moments captured as they happen — unposed and honest.",
  },
  {
    title: "Freelance Sessions",
    desc: "Flexible bookings for events, brands, and personal projects, on your terms.",
  },
];

const Services = () => {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".services",
      scrub: 1,
      start: "top top",
      end: "+=250%",
      pin: true,

      animation: gsap
        .timeline()
        .from(".service-text", {
          opacity: 0,
          z: -1500,
        })
        .to(".service-text", {
          opacity: 0,
          z: 500,
        })
        .to(
          ".services-overlay",
          {
            opacity: 0,
          },
          "<",
        )
        .to(".card-2", {
          rotate: -45,
        })
        .to(".card-1", {
          rotate: 45,
        })
        .from(".footer", {
          xPercent: -100,
        }),
    });
  });

  return (
    <div className="relative services py-10 h-dvh overflow-hidden bg-[#886641] flex justify-center items-center">
      <div className="services-overlay absolute perspective-midrange inset-0 w-full h-full bg-[#986c31] z-10 flex justify-center items-center">
        <h2 className="service-text transform-3d text-[clamp(2rem,5vw,3rem)] font-bold text-primary">
          What do i offer ?
        </h2>
      </div>
      <div className="main-services relative service-card w-[400px] h-[750px] bg-secondary rounded-3xl flex flex-col justify-start p-10">
        <h3 className="text-primary text-3xl font-semibold mb-3">
          {services[0].title}
        </h3>
        <p className="text-primary/80 text-sm leading-relaxed">
          {services[0].desc}
        </p>

        <div className="card-1 absolute inset-0 w-full h-full bg-[#c9a876] rounded-3xl origin-bottom-left flex flex-col justify-start p-10">
          <h3 className="text-secondary text-3xl font-semibold mb-3">
            {services[1].title}
          </h3>
          <p className="text-secondary/80 text-sm leading-relaxed">
            {services[1].desc}
          </p>
        </div>

        <div className="card-2 absolute inset-0 w-full h-full bg-primary rounded-3xl origin-bottom-right flex flex-col justify-start p-10">
          <h3 className="text-secondary text-3xl font-semibold mb-3">
            {services[2].title}
          </h3>
          <p className="text-secondary/80 text-sm leading-relaxed">
            {services[2].desc}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
