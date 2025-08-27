function AboutUs() {
  return (
    <div>
      <section className="py-24 relative bg-white dark:bg-gray-900">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
            {/* Images Section */}
            <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
              <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                <img
                  className="rounded-xl shadow-md"
                  src="https://img.freepik.com/free-vector/ai-email-assistant-concept-illustration_335657-4534.jpg"
                  alt="AI managing inbox"
                />
              </div>
              <img
                className="sm:ml-0 ml-auto rounded-xl shadow-md"
                src="https://img.freepik.com/free-vector/email-messaging-service-smart-ai-assistant_335657-5503.jpg"
                alt="Smart AI email assistant"
              />
            </div>

            {/* Text Section */}
            <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
              <div className="w-full flex-col justify-center items-start gap-8 flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 className="text-gray-900 dark:text-white text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    Meet Maileyo – Your AI Email Companion
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-relaxed lg:text-start text-center">
                    Maileyo transforms the way you experience email. 
                    Built with AI at its core, it organizes your inbox into a clean, 
                    chat-like interface where finding, understanding, and responding 
                    to emails becomes effortless. From generating summaries and drafting replies 
                    to answering natural language queries, Maileyo helps you focus on conversations, 
                    not clutter — all while keeping your privacy first.
                  </p>
                </div>
              </div>

              {/* Learn More Button */}
              <a
                href="/#how"
                className="sm:w-fit w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 rounded-lg shadow-md justify-center items-center flex"
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
