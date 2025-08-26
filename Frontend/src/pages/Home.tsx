import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { FeaturesSectionDemo2 } from "@/components/ui/feature2sec";
import HowItWorksSection from "@/components/HowItWorks";
import HeroSection from "@/components/HeroSection";
import Cta from "@/components/Cta";
function Home() {
  return (
    <div>
      <HeroSection />

      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold text-black dark:text-white mb-10 mt-40">
              Streamline Your Inbox Experience with <br />
                <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-indigo-600">
                Maileyo
                </span>
              </h1>
            </>
          }
        >
          <img src="ui_image.png" alt="" />
        </ContainerScroll>
      </div>
      <div className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20">
          <div className="mb-10 lg:mb-16 flex justify-center items-center flex-col gap-x-0 gap-y-6 lg:gap-y-0 lg:flex-row lg:justify-between max-md:max-w-lg max-md:mx-auto">
            <div className="relative w-full text-center lg:text-left lg:w-2/4">
              <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] lg:mb-6 mx-auto max-w-max lg:max-w-md lg:mx-0">
              Unlock the Full Potential of Your Inbox with These Powerful {" "}
                <span className="text-indigo-600">Features</span>{" "}
              </h2>
            </div>
            <div className="relative w-full text-center  lg:text-left lg:w-2/4">
              <p className="text-lg font-normal text-gray-500 mb-5">
              We deliver all the tools you need to simplify and optimize your email management, without any unnecessary complexity.
              </p>
            </div>
          </div>
        </div>
        <FeaturesSectionDemo2  />
        <HowItWorksSection />
        <Cta />
      </div>
    </div>
  );
}

export default Home;
