import { gsap, useGSAP } from "../lib/gsap";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { socials } from "../constants";
import TextZoo from "../components/TextZoo";
import ResumeCard from "../components/ResumeCard";

const Contact = () => {
  const text = `Got a question, an idea, or a project?
    We’d love to hear from you and discuss further!`;
  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });

    gsap.from(".resume-card", {
      y: 60,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".resume-card",
        start: "top 92%",
      },
    });
  }, []);
  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen rounded-t-4xl bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />
        <div className="grid gap-14 px-10 pb-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="flex w-full flex-col gap-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                info@mzahran.tech
              </p>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="text-xl lowercase md:text-2xl lg:text-3xl">
                +20 109 208 8922
              </p>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social) => (
                  <div key={social.name} className="flex items-center gap-2">
                    <a
                      href={social.href}
                      className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                    >
                      <TextZoo text={social.name} />
                    </a>
                    <div className="w-1 h-1 bg-white rounded-full mb-3 "></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ResumeCard />
        </div>
      </div>
    </section>
  );
};

export default Contact;
