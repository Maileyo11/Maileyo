function AboutUs() {
  return (
    <div>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            {/* Images Section */}
            <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <img
                  className="rounded-xl"
                  src="https://img.freepik.com/free-vector/artificial-intelligence-email-marketing_23-2149152496.jpg"
                  alt="AI email illustration"
                />
              </div>
              <img
                className="sm:ml-0 ml-auto rounded-xl"
                src="https://img.freepik.com/free-vector/ai-powered-smart-email-concept_23-2149152448.jpg"
                alt="AI mail assistant"
              />
            </div>

            {/* Text Section */}
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-gray-900 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Smarter Email with Maileyo
                  </h2>
                  <p className="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Maileyo is an AI-powered email client designed to simplify
                    your inbox. From summarizing long threads to drafting smart
                    replies and organizing emails automatically, Maileyo helps
                    you focus on what truly matters.
                  </p>
                </div>
              </div>

              {/* Learn More Button */}
              <a
                href="/#how"
                className="sm:w-fit w-full px-3.5 py-2 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex"
              >
                <span className="px-1.5 text-white text-sm font-medium leading-6">
                  Learn More
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
