function HowItWorks() {
  return (
    <div>
      <section id="how" className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
          <div className="w-full flex-col justify-start items-center lg:gap-12 gap-10 inline-flex">
            <div className="w-full flex-col justify-start items-center gap-3 flex">
              <h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
                How It <span className="text-indigo-600"> Works </span>
              </h2>
              <p className="w-full text-center text-gray-500 text-base font-normal leading-relaxed">
              Maileyo makes managing your emails easy and stress-free. Simply connect your email account, and our platform will organize your messages, highlight what's important, and help you respond quickly. Whether you're looking for a specific email or just trying to keep things tidy, Maileyo does the heavy lifting for you. It's like having a personal assistant for your inbox, so you can focus on what really matters.
              </p>
            </div>
            <div className="w-full justify-start items-center gap-4 flex md:flex-row flex-col">
              <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                  <h3 className="self-stretch text-center text-indigo-600 text-4xl font-extrabold font-manrope leading-normal">
                    1
                  </h3>
                  <h4 className="self-stretch text-center text-gray-900 text-xl font-semibold leading-8">
                    Connect your gmail account
                  </h4>
                </div>
                <p className="self-stretch text-center text-gray-400 text-base font-normal leading-relaxed">
                  Outline the website's purpose, target audience, and features.
                  Create wireframes and design mockups to visualize the layout
                  and...
                </p>
              </div>
              <svg
                className="md:flex hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004"
                  stroke="#4F46E5"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                  <h3 className="self-stretch text-center text-indigo-600 text-4xl font-extrabold font-manrope leading-normal">
                    2
                  </h3>
                  <h4 className="self-stretch text-center text-gray-900 text-xl font-semibold leading-8">
                    See your fresh unread mails
                  </h4>
                </div>
                <p className="self-stretch text-center text-gray-400 text-base font-normal leading-relaxed">
                  Convert the design into a functional website using HTML, CSS,
                  and JavaScript. Ensure the site is responsive and works on
                  various...
                </p>
              </div>
              <svg
                className="md:flex hidden"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5.50159 6L11.5018 12.0002L5.49805 18.004M12.5016 6L18.5018 12.0002L12.498 18.004"
                  stroke="#4F46E5"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="grow shrink basis-0 flex-col justify-start items-center gap-2.5 inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-0.5 flex">
                  <h3 className="self-stretch text-center text-indigo-600 text-4xl font-extrabold font-manrope leading-normal">
                    3
                  </h3>
                  <h4 className="self-stretch text-center text-gray-900 text-xl font-semibold leading-8">
                    Done! Now you can search your mails
                  </h4>
                </div>
                <p className="self-stretch text-center text-gray-400 text-base font-normal leading-relaxed">
                  Test the website for issues like broken links and bugs. After
                  making necessary adjustments, deploy it to a web server and
                  conduct...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowItWorks;
