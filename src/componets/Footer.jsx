import React from "react";

export default function Footer(props) {
  return (
    <footer class="bg-slate-950 dark:bg-gray-900 mt-5">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
            <a href="/" class="flex items-center">
              <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-white">Newsportal</span>
              <a href="/" title="save icons"></a>
            </a>
          </div>
          <div class="grid grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-4">
            <div>
              <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Categories</h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="">
                  <a onClick={()=>props.setMenu("sport")} class="hover:underline">Sport</a>
                </li>
                <li>
                  <a onClick={()=>props.setMenu("Technology")} class="hover:underline">Technology</a>
                </li>
                <li>
                  <a onClick={()=>props.setMenu("health")} class="hover:underline">Health </a>
                </li>
                <li>
                  <a onClick={()=>props.setMenu("Science")} class="hover:underline">Science </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-white uppercase dark:text-white">Resources</h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="/" class="hover:underline">Home</a>
                </li>
                <li>
                  <a href="/" class="hover:underline">News</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white text-white">Follow us</h2>
              
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="https://github.com" class="hover:underline">Github</a>
                </li>
                <li>
                  <a href="" class="hover:underline">Discord</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white text-white">Legal</h2>
              <ul class="text-gray-500 dark:text-gray-400 font-medium">
                <li class="mb-4">
                  <a href="#" class="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" class="hover:underline">Terms &amp; Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" class="hover:underline">newsportal™</a>. All Rights Reserved.
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
            <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
              </svg>
              <span class="sr-only">Facebook page</span>
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
              </svg>
              <span class="sr-only">Discord community</span>
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.29 16.5c7.547 0 11.675-6.124 11.675-11.443 0-.174-.006-.348-.015-.52A8.24 8.24 0 0 0 20 1.892Z" clip-rule="evenodd"/>
              </svg>
              <span class="sr-only">Twitter page</span>
            </a>
            <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0a10 10 0 1 0 0 20A10 10 0 0 0 10 0Zm3.594 6.472a2.613 2.613 0 0 0-1.824-.748h-.03a2.68 2.68 0 0 0-2.283 1.247 4.958 4.958 0 0 0-.287.551c-.053-.065-.119-.127-.188-.193a4.126 4.126 0 0 0-.783-.6 4.08 4.08 0 0 0-1.344-.434H6.8a.341.341 0 0 0-.326.186.35.35 0 0 0-.021.288c.03.082.29.817.317.892.015.046.03.093.045.143a.255.255 0 0 0 .173.173c.045.015.094.03.14.045l.099.03c.12.03.246.064.376.099.165.045.335.096.51.156.306.105.576.22.81.345.213.112.396.232.55.36.174.15.328.308.464.475a2.09 2.09 0 0 1 .317.548c.075.174.128.345.157.51.052.315.02.6-.098.855a1.93 1.93 0 0 1-.326.485 2.67 2.67 0 0 1-.485.428c-.202.143-.429.258-.683.347-.254.09-.514.135-.784.135a3.25 3.25 0 0 1-.84-.112 4.063 4.063 0 0 1-.742-.288c-.345-.172-.66-.382-.943-.63a4.546 4.546 0 0 1-.645-.712 5.204 5.204 0 0 1-.584-.86c-.142-.258-.267-.524-.375-.8a2.69 2.69 0 0 1-.177-.612 1.06 1.06 0 0 1-.01-.288c.015-.12.075-.21.173-.26a.505.505 0 0 1 .283-.04l.307.05c.225.037.45.08.675.129.27.052.524.102.76.147a2.9 2.9 0 0 0-.362-.65 2.683 2.683 0 0 0-.497-.53 3.64 3.64 0 0 0-.648-.455 4.096 4.096 0 0 0-.828-.345 5.524 5.524 0 0 0-1.003-.17 1.205 1.205 0 0 0-.53.066.728.728 0 0 0-.396.352 1.023 1.023 0 0 0-.084.63c.03.218.097.456.201.712a5.01 5.01 0 0 0 .404.783c.187.304.408.606.663.907.254.301.528.576.823.823.293.247.602.47.927.663.323.194.658.36 1.003.498.344.137.688.241 1.03.312.34.075.67.115.99.115.444 0 .856-.06 1.235-.184.38-.12.72-.293 1.021-.519a3.84 3.84 0 0 0 .77-.728c.208-.258.374-.548.5-.867.127-.318.191-.654.191-1.007a3.195 3.195 0 0 0-.164-1.03 2.804 2.804 0 0 0-.472-.869 3.807 3.807 0 0 0-.66-.708 4.623 4.623 0 0 0-.892-.632 4.892 4.892 0 0 0-.991-.43 5.452 5.452 0 0 1 .57-.618c.188-.188.39-.353.61-.495.218-.142.45-.258.694-.347a2.474 2.474 0 0 1 .826-.142 2.13 2.13 0 0 1 1.499.618 2.062 2.062 0 0 1 .342.426c.12.172.197.278.234.317.097.113.233.166.405.158a.315.315 0 0 0 .24-.094.365.365 0 0 0 .096-.237v-2.013a.373.373 0 0 0-.113-.278.402.402 0 0 0-.283-.112Z" clip-rule="evenodd"/>
              </svg>
              <span class="sr-only">Dribbble account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
