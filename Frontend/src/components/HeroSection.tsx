import Container from "./Container";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

function HeroSection() {
  const words = [
    {
      text: "Optimize",
    },
    {
      text: "Your",
    },
    {
      text: "Emailbox",
    },
    {
      text: "with",
    },
    {
      text: "Maileyo",
      className:
        "text-indigo-600 scroll-m-20 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight",
    },
  ];

  return (
    <Container>
      <section className="pt-8 sm:pt-16 md:pt-24 lg:pt-32 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center">
          
          {/* Maileyo Logo - Elegant floating placement above typewriter */}
          <div className="flex justify-center mb-8 sm:mb-12 md:mb-16">
            <div className="relative">
              <img 
                src="LogoSVG.svg" 
                alt="Maileyo Logo" 
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto drop-shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              {/* Optional subtle glow effect */}
              <div className="absolute inset-0 bg-indigo-600/10 rounded-full blur-xl scale-150 -z-10"></div>
            </div>
          </div>
          
          <h1 className="max-w-4xl mx-auto text-center font-manrope font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-5 leading-tight sm:leading-[40px] md:leading-[50px] lg:leading-[60px]">
            <TypewriterEffectSmooth words={words} />
          </h1>

          <p className="max-w-sm sm:max-w-md md:max-w-lg mx-auto text-center text-sm sm:text-base font-normal leading-6 sm:leading-7 text-gray-500 mb-6 sm:mb-8 md:mb-9 px-4 sm:px-0">
            The AI-powered tool for seamless email management. Search, organize,
            and prioritize your emails.
          </p>

          <div className="flex justify-center px-4 sm:px-6 md:px-8">
            <video
              className="rounded-t-3xl shadow-[0_20px_50px_rgba(8,_12,_184,_0.9)] w-full max-w-4xl h-auto"
              muted
              controls
              autoPlay
              loop
            >
              <source
                src="https://pagedone.io/asset/uploads/1705298724.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default HeroSection;