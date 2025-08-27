import Container from "./Container";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

function HeroSection() {
  const words = [
    {
      text: "Optimize",
      className: "text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight",
    },
    {
      text: "Your",
      className: "text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight",
    },
    {
      text: "Emailbox",
      className: "text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight",
    },
    {
      text: "with",
      className: "text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight",
    },
    {
      text: "Maileyo",
      className: "text-indigo-600 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight drop-shadow-sm",
    },
  ];

  return (
    <Container>
      <section className="pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 pb-8 sm:pb-12 md:pb-16 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover opacity-30"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center z-10">
          {/* Main heading with typewriter effect - centered for all screens */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 flex justify-center items-center w-full">
            <h1 className="max-w-5xl mx-auto text-center font-manrope leading-tight">
              <TypewriterEffectSmooth words={words} />
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <p className="max-w-xl mx-auto text-center text-base sm:text-lg md:text-xl font-medium leading-7 sm:leading-8 text-gray-600 px-4 sm:px-0">
              The AI-powered tool for seamless email management. Search, organize, and prioritize your emails with intelligence.
            </p>
          </div>

          {/* Video showcase with improved styling */}
          <div className="flex justify-center px-4 sm:px-6 md:px-8">
            <div className="relative w-full max-w-5xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl blur opacity-20"></div>
              <video
                className="relative rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto border border-white/20"
                muted
                controls
                autoPlay
                loop
                poster="https://via.placeholder.com/1200x675/6366f1/ffffff?text=Maileyo+Demo"
              >
                <source src="https://pagedone.io/asset/uploads/1705298724.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {/* Play button overlay for better UX */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default HeroSection;