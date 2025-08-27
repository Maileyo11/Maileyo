import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { FeaturesSectionDemo2 } from "@/components/ui/feature2sec";
import HowItWorksSection from "@/components/HowItWorks";
import HeroSection from "@/components/HeroSection";
import Cta from "@/components/Cta";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />

      {/* Container Scroll Section with improved mobile responsiveness */}
      <div className="flex flex-col overflow-hidden bg-gradient-to-b from-white to-gray-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black dark:text-white mb-8 sm:mb-10 md:mb-12 lg:mb-16 mt-20 sm:mt-28 md:mt-32 lg:mt-40 text-center leading-tight">
                  Streamline Your Inbox Experience with <br className="hidden sm:block" />
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mt-1 sm:mt-2 leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 inline-block">
                    Maileyo
                  </span>
                </h1>
              </>
            }
          >
            {/* Improved image container with better mobile responsiveness */}
            <div className="relative w-full h-auto overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/50">
              <img 
                src="ui_image.png" 
                alt="Maileyo Dashboard Interface" 
                className="w-full h-auto object-cover object-top min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
                style={{
                  aspectRatio: '16/10',
                }}
              />
              {/* Gradient overlay for better visual hierarchy */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </ContainerScroll>
        </div>
      </div>

      {/* Features Section with improved spacing and design */}
      <div className="w-full bg-white relative">
        <section id="feature">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/30"></div>
          <div className="relative z-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-22">
              <div className="mb-10 sm:mb-12 md:mb-16 lg:mb-20 text-center">
                {/* Left side - Heading */}
                <div className="relative w-full max-w-2xl mx-auto">
                  <div className="inline-block mb-3 px-4 py-2 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full">
                    ✨ Powerful Features
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
                    Unlock the Full Potential of Your Inbox with These{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                      Powerful Features
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          {/* Features Component */}
          <FeaturesSectionDemo2 />
        </section>
        
        {/* How It Works Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <HowItWorksSection />
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <Cta />
        </div>
      </div>
    </div>
  );
}

export default Home;