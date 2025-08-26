import React, { useState } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholder-and-vanish-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,

  DialogHeader,
  DialogTitle,

} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function Dashboard() {
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <>
      <main id="content">
        <div className="relative h-screen">
          <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto mt-20">
            <div className="text-center">
              <img
                src="LogoSVG.svg"
                alt="logo"
                className="w-20 h-20 mx-auto"
              ></img>

              <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                Ask anything to Maileyo
              </h1>
              <p className="mt-3 text-gray-600 dark:text-neutral-400">
                Your AI-powered copilot for the mails
              </p>
            </div>

            <ul className="mt-16 space-y-5">
              <li className="flex gap-x-2 sm:gap-x-4">
                <img
                  src="LogoSVG.svg"
                  alt=""
                  className="shrink-0   w-[38px] h-[38px]"
                />

                <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                  <h2 className="font-medium text-gray-800 dark:text-white">
                    How can we help?
                  </h2>
                  <div className="space-y-1.5">
                    <p className="mb-1.5 text-sm text-gray-800 dark:text-white">
                      You can ask questions like:
                    </p>
                    <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                      <li className="text-sm text-gray-800 dark:text-white">
                        What's Preline UI?
                      </li>

                      <li className="text-sm text-gray-800 dark:text-white">
                        How many Starter Pages &amp; Examples are there?
                      </li>

                      <li className="text-sm text-gray-800 dark:text-white">
                        Is there a PRO version?
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li className="max-w-2xl ms-auto flex justify-end gap-x-2 sm:gap-x-4">
                <div className="grow text-end space-y-3">
                  <div className="inline-block bg-indigo-600 rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-white">what's preline ui?</p>
                  </div>
                </div>

                <span className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                  <span className="text-sm font-medium text-white leading-none">
                    AZ
                  </span>
                </span>
              </li>

              <li className="flex gap-x-2 sm:gap-x-4">
                <img
                  src="LogoSVG.svg"
                  alt=""
                  className="shrink-0   w-[38px] h-[38px]"
                />
                <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3 dark:bg-neutral-900 dark:border-neutral-700">
                    <p className="text-sm text-gray-800 dark:text-white">
                      Hold on a sec...
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                    <div className="-m-1.5 overflow-x-auto">
                      <div className="p-1.5 min-w-full inline-block align-middle">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                          <thead className="bg-gray-50 dark:bg-neutral-800">
                            <tr className="hover:bg-muted/50">
                              <th scope="col" className="px-6 py-3 text-start">
                                <div className="flex items-center gap-x-2">
                                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                    Name
                                  </span>
                                </div>
                              </th>

                              <th scope="col" className="px-6 py-3 text-start">
                                <div className="flex items-center gap-x-2">
                                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                    Status
                                  </span>
                                </div>
                              </th>

                              <th scope="col" className="px-6 py-3 text-start">
                                <div className="flex items-center gap-x-2">
                                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                    Created
                                  </span>
                                </div>
                              </th>
                            </tr>
                          </thead>

                          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            <tr
                              onClick={openDialog}
                              className="hover:bg-muted/50 hover:cursor-pointer"
                            >
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <img
                                      className="inline-block size-[38px] rounded-full"
                                      src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                      alt="Avatar"
                                    />
                                    <div className="grow">
                                      <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                        Christina Bersh
                                      </span>
                                      <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                        christina@site.com
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <svg
                                      className="size-2.5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                    your industr is Lorem ipsum dolor sit
                                  </span>
                                </div>
                              </td>

                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-500 dark:text-neutral-500">
                                    28 Dec, 12:12
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    <div className="flex">
                                      <div>
                                        <img
                                          className="inline-block size-[38px] rounded-full mr-5"
                                          src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                          alt="Avatar"
                                        />
                                      </div>
                                      <div>
                                        <span className="block text-sm font-semibold text-black dark:text-neutral-200">
                                          Christina Bersh
                                        </span>
                                        <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                          christina@site.com
                                        </span>
                                      </div>
                                    </div>
                                  </DialogTitle>
                                  <DialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                  </DialogDescription>
                                </DialogHeader>
                                <Separator />
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ex rem voluptates recusandae
                                aperiam unde harum cupiditate quidem, ea
                                mollitia nihil, vero, consequatur et! Et, facere
                                vero recusandae exercitationem facilis ducimus.
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ut excepturi officia sed
                                quaerat eius similique maxime dignissimos quas
                                rerum! Nulla aliquam eum reiciendis, at aliquid
                                cupiditate culpa autem cum iste! Dolorum, ipsa!
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Facilis reprehenderit
                                accusamus eveniet, quos laborum in. Eaque
                                doloremque sit sapiente, nemo rem quidem
                                voluptatibus maiores vel minus veniam
                                dignissimos necessitatibus ut.
                                <div className="flex w-full max-w-lg items-center space-x-4">
                                  <Input
                                    type="email"
                                    placeholder="send reply"
                                  />
                                  <Button type="submit">Send</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="sm:flex sm:justify-between">
                      <div>
                        <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                          <button
                            type="button"
                            className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
                          >
                            <svg
                              className="shrink-0 size-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M7 10v12" />
                              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:z-10 focus:outline-none focus:bg-blue-100 focus:text-blue-800 dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200 dark:focus:bg-blue-900 dark:focus:text-blue-200"
                          >
                            <svg
                              className="shrink-0 size-4"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M17 14V2" />
                              <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                          </button>
                        </div>
                        <button
                          type="button"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          <svg
                            className="shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
                          </svg>
                          Copy
                        </button>
                        <button
                          type="button"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          <svg
                            className="shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                            <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                          </svg>
                          Share
                        </button>
                      </div>

                      <div className="mt-1 sm:mt-0">
                        <button
                          type="button"
                          className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          <svg
                            className="size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                            />
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                          </svg>
                          New answer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="max-w-4xl mx-auto sticky bottom-0 z-10 bg-white border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-neutral-900 dark:border-neutral-700">
            <PlaceholdersAndVanishInput
              placeholders={placeholders}
              onChange={handleChange}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </main>

      <div className="fixed bottom-2 sm:bottom-4 end-2 sm:end-4 ms-2 z-[70] bg-neutral-900 border border-neutral-800 rounded-lg dark:bg-neutral-800">
        <div className="flex items-center gap-px">
          <div className="hs-tooltip inline-block">
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-neutral-900 text-xs text-white rounded-lg whitespace-nowrap dark:bg-neutral-800"
              role="tooltip"
            >
              This is the Preline UI template preview mode.
            </span>
          </div>

          <div className="hs-dropdown relative inline-flex [--strategy:absolute] [--placement:bottom-right] before:absolute before:top-1/2 before:-start-px before:z-10 before:w-px before:h-4 before:bg-white/20 before:-translate-y-1/2 first:before:hidden">
            <div
              className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-48 transition-[opacity,margin] duration opacity-0 hidden z-10 overflow-hidden border border-neutral-800 bg-neutral-900 rounded-lg shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-800"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-preview"
            >
              <div className="max-h-[30rem] overflow-y-auto relative z-20 after:sticky after:inset-x-0 after:bottom-0 after:z-10 after:block after:w-full after:rounded-b-lg after:pointer-events-none after:bg-gradient-to-t after:from-neutral-900 after:via-neutral-900/95 dark:after:from-neutral-800 dark:after:via-neutral-800/95 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className="p-1 space-y-0.5">
                  <span className="block p-2 pb-1 text-[11px] uppercase text-neutral-400 dark:text-neutral-400">
                    Main Pages
                  </span>

                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../index.html"
                  >
                    Preline UI
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../docs/index.html"
                  >
                    Components (595+)
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../examples.html"
                  >
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../templates.html"
                  >
                    Templates (5)
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../plugins.html"
                  >
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../figma.html"
                  >
                    Figma
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>

                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../pro/index.html"
                  >
                    Preline Pro
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>

                  <div className="border-b border-neutral-800 dark:border-neutral-700 pt-1"></div>
                  <span className="block p-2 pb-1 text-[11px] uppercase text-neutral-400 dark:text-neutral-400">
                    Template Previews
                  </span>

                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../templates/agency/index.html"
                  >
                    Agency
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../templates/personal/index.html"
                  >
                    Personal
                    <span className="text-green-400">New</span>
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../templates/creative-agency/index.html"
                  >
                    Creative Agency
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700  "
                    href="../../templates/admin/index.html"
                  >
                    Admin
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                  <a
                    className="group flex items-center gap-x-1.5 py-1.5 px-2 rounded-md text-[13px] text-gray-200 hover:bg-neutral-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 bg-neutral-800 dark:bg-neutral-700 "
                    href="../../templates/ai-prompt/ai-with-sidebar.html"
                  >
                    AI Prompt
                    <svg
                      className="shrink-0 size-3.5 ms-auto opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
