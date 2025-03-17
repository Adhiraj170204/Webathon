import * as React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="flex flex-col w-full">
      {/* Top Section */}
      <div className="flex flex-col items-center bg-white">
        <div className="flex relative justify-center items-center px-18 w-full h-[93px] max-md:px-10 max-sm:px-5">
          {/* Logo */}
          <div className="flex gap-4 items-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c17601f656833fb5ccdc67c1c3feb8268ee839e"
              alt="plant 1"
              className="w-[32px] h-[32px]"
            />
            <div className="text-3xl font-medium tracking-tighter leading-10 text-zinc-900">
              IITMART
            </div>
          </div>

          {/* Search Bar and Icons */}
          <div className="flex gap-4 items-center ml-auto">
            {/* Search Bar */}
            <div className="flex h-[42px] w-[497px] max-md:hidden">
              <div className="flex gap-3 items-center p-3 rounded-sm bg-zinc-100 w-[455px]">
                <div className="flex gap-px items-center">
                  <div className="text-sm font-semibold text-slate-700">
                    All Categories
                  </div>
                  <div>
                    <svg
                      width="19"
                      height="18"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[18px] h-[18px]"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.46967 6.21967C4.76256 5.92678 5.23744 5.92678 5.53033 6.21967L9.5 10.1893L13.4697 6.21967C13.7626 5.92678 14.2374 5.92678 14.5303 6.21967C14.8232 6.51256 14.8232 6.98744 14.5303 7.28033L10.0303 11.7803C9.73744 12.0732 9.26256 12.0732 8.96967 11.7803L4.46967 7.28033C4.17678 6.98744 4.17678 6.51256 4.46967 6.21967Z"
                        fill="#253D4E"
                      />
                    </svg>
                  </div>
                </div>
                <div className="ml-3 text-sm font-medium text-zinc-400 flex-1">
                  <input
                    className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none focus:border-green-600"
                    type="text"
                    placeholder="Search for items..."
                  />
                </div>
              </div>
              <button>
                <div className="flex justify-center items-center bg-green-600 rounded-sm h-[42px] w-[55px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[24px] h-[24px]"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M15.9429 15.9429C16.3334 15.5524 16.9666 15.5524 17.3571 15.9429L21.7071 20.2929C22.0977 20.6834 22.0977 21.3166 21.7071 21.7071C21.3166 22.0976 20.6834 22.0976 20.2929 21.7071L15.9429 17.3571C15.5524 16.9666 15.5524 16.3334 15.9429 15.9429Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </button>
            </div>

            {/* Icons */}
          </div>
          <div className="flex gap-4 items-center ml-auto">
            <Link to={'/wishlist'}>
              <button>
                <svg
                  width="33"
                  height="32"
                  viewBox="0 0 33 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[32px] h-[32px]"
                >
                  <path
                    d="M16.4995 28.0722C-10.1667 13.3333 8.49999 -2.66666 16.4995 7.45075C24.5 -2.66666 43.1666 13.3333 16.4995 28.0722Z"
                    stroke="#1A1A1A"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </Link>
            <div className="w-px h-6 bg-stone-300" />
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f3c34996f6f63a6e3e554f4aac11e4df20a3880"
              alt=""
              className="w-[32px] h-[32px]"
            />
            <div className="w-px h-6 bg-stone-300" />
            <div className="relative">
              <button>
                <svg
                  width="35"
                  height="34"
                  viewBox="0 0 35 34"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[34px] h-[34px]"
                >
                  <path
                    d="M11.8333 14.1667H7.58333L4.75 29.75H30.25L27.4167 14.1667H23.1667M11.8333 14.1667V9.91667C11.8333 6.78705 14.3704 4.25 17.5 4.25V4.25C20.6296 4.25 23.1667 6.78705 23.1667 9.91667V14.1667M11.8333 14.1667H23.1667M11.8333 14.1667V18.4167M23.1667 14.1667V18.4167"
                    stroke="#1A1A1A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="absolute -top-0.5 text-xs font-medium leading-3 text-center text-white bg-green-800 rounded-2xl border border-white h-[18px] left-[18px] w-[18px]">
                  2
                </div>
              </button>
            </div>
            <div className="w-px h-6 bg-stone-300" />
            <button>
              <svg
                width="22"
                height="26"
                viewBox="0 0 22 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[18.773px] h-[24px]"
              >
                <path
                  d="M10.887 11.6667C13.8325 11.6667 16.2203 9.27888 16.2203 6.33336C16.2203 3.38784 13.8325 1.00002 10.887 1.00002C7.94149 1.00002 5.55367 3.38784 5.55367 6.33336C5.55367 9.27888 7.94149 11.6667 10.887 11.6667Z"
                  stroke="#1A1A1A"
                  strokeWidth="1.5"
                />
                <path
                  d="M14.887 15.6666H6.88702C3.20436 15.6666 -0.0929748 19.0666 2.32969 21.8386C3.97769 23.724 6.70303 25 10.887 25C15.071 25 17.795 23.724 19.443 21.8386C21.867 19.0653 18.5684 15.6666 14.887 15.6666Z"
                  stroke="#1A1A1A"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Navigation */}
      <div className="flex justify-between items-center px-18 py-4 w-full bg-zinc-800 max-md:px-10 max-sm:px-5">
        <div className="flex gap-8 items-center max-sm:hidden">
          <div className="flex gap-1 items-center group">
            <button className="text-xl font-medium leading-8 text-white group-hover:text-white">
              Home
            </button>
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[16px] h-[16px] group-hover:stroke-white"
            >
              <path
                d="M3.83333 5.66667L8.5 10.3333L13.1667 5.66667"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <Link to={"/shop"}>
            <button className="group">
              <div className="flex gap-1 items-center">
                <div className="text-xl font-medium leading-8 text-neutral-400 group-hover:text-white">
                  Shop
                </div>
              </div>
            </button>
          </Link>
          <button className="flex gap-1.5 items-center p-2.5 group">
            <svg
              width="21"
              height="23"
              viewBox="0 0 21 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[22px] group-hover:stroke-white"
            >
              <g clipPath="url(#clip0_2002_1062)">
                <path
                  d="M14.1667 4.5967C13.1667 3.70885 12.1367 2.78781 11.0942 1.69917L10.5 1.08107L9.91666 1.70004C8.03999 3.67131 7.15332 6.69805 6.76832 8.51393C6.47363 8.03543 6.25496 7.51004 6.12082 6.95822L5.76832 5.53257L4.74332 6.54179C2.94749 8.3079 1.74999 10.06 1.74999 12.8659C1.73322 14.8898 2.36242 16.8615 3.53767 18.4679C4.71291 20.0742 6.3668 21.2233 8.23666 21.7323C8.80005 21.8758 9.37508 21.9635 9.95416 21.9942C10.1352 22.0182 10.3175 22.0307 10.5 22.0317C10.5958 22.0317 10.6892 22.023 10.7825 22.0168C13.0526 21.9453 15.2068 20.9498 16.7877 19.2416C18.3686 17.5333 19.2519 15.2469 19.25 12.8677C19.25 9.11893 16.8942 7.02369 14.1667 4.5967ZM10.6667 20.2709C10.5833 20.2709 10.5 20.2796 10.4117 20.2787C9.66159 20.2546 8.94981 19.9261 8.4267 19.3625C7.9036 18.7989 7.61013 18.0442 7.60832 17.258C7.60832 16.1511 8.17499 15.5993 9.45749 14.4556C9.78082 14.1676 10.1325 13.8542 10.5025 13.4954C10.8267 13.8035 11.1417 14.0829 11.4325 14.3422C12.7208 15.4876 13.3933 16.138 13.3933 17.2554C13.3919 18.0276 13.1088 18.7701 12.6019 19.3306C12.0949 19.8912 11.4026 20.2276 10.6667 20.2709ZM14.85 18.7247L14.8333 18.737C14.9829 18.2596 15.0594 17.7605 15.06 17.258C15.06 15.2806 13.8217 14.179 12.5117 13.0135C12.0475 12.6014 11.5683 12.1754 11.09 11.6742L10.5 11.0571L9.91082 11.6742C9.37082 12.2391 8.84249 12.7105 8.37665 13.1261C7.06999 14.2906 5.94082 15.2973 5.94082 17.258C5.9426 17.782 6.02707 18.3021 6.19082 18.7972C5.32337 18.0994 4.62163 17.2009 4.1404 16.1721C3.65917 15.1432 3.41147 14.0117 3.41666 12.8659C3.40295 11.334 3.96894 9.85865 4.99082 8.76274C5.16684 9.13684 5.37551 9.4931 5.61416 9.82694C5.78846 10.0733 6.02777 10.2609 6.3026 10.3666C6.57743 10.4722 6.87576 10.4913 7.16082 10.4215C7.45081 10.3538 7.71607 10.2001 7.92488 9.97874C8.1337 9.75735 8.27723 9.47764 8.33832 9.17305C8.68725 7.16656 9.44192 5.26148 10.5517 3.58575C11.4308 4.45876 12.3017 5.23138 13.0875 5.93067C15.6975 8.2529 17.5875 9.93084 17.5875 12.8711C17.5895 14.0014 17.3437 15.117 16.8689 16.1319C16.3941 17.1469 15.7031 18.0339 14.8492 18.7247H14.85Z"
                  fill="#999999"
                />
              </g>
            </svg>
            <div className="text-xl font-medium text-neutral-400 group-hover:text-white">
              Hot deals
            </div>
          </button>
          <button className="flex gap-1.5 items-center p-2.5 group">
            <svg
              width="22"
              height="26"
              viewBox="0 0 22 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[21px] h-[25px] group-hover:stroke-white"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.4045 5.9207C19.6222 6.11768 19.75 6.42449 19.75 6.75V19.25C19.75 19.566 19.6295 19.8648 19.4225 20.0625C19.2155 20.2603 18.9443 20.3354 18.6852 20.2669L2.93519 16.1002C2.53484 15.9943 2.25 15.5716 2.25 15.0833V11.9583C2.25 11.4904 2.51209 11.0799 2.89081 10.9547L18.6408 5.74634C18.9043 5.65922 19.1868 5.72372 19.4045 5.9207ZM4 12.7501V14.2477L18 17.9514V8.12046L4 12.7501Z"
                fill="#999999"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.80769 15.3292C6.27354 15.4822 6.54701 16.0558 6.4185 16.6103C6.35713 16.8752 6.34018 17.1518 6.36862 17.4244C6.39705 17.6971 6.47031 17.9604 6.58422 18.1993C6.69813 18.4382 6.85046 18.6481 7.0325 18.8169C7.21454 18.9858 7.42273 19.1103 7.64519 19.1833C7.86766 19.2564 8.10002 19.2766 8.32904 19.2427C8.55805 19.2089 8.77921 19.1217 8.97991 18.986C9.18061 18.8504 9.3569 18.6691 9.49873 18.4524C9.64056 18.2357 9.74514 17.9878 9.80651 17.723C9.93502 17.1684 10.4168 16.8428 10.8827 16.9958C11.3485 17.1488 11.622 17.7224 11.4935 18.277C11.371 18.8056 11.1623 19.3002 10.8792 19.7328C10.5961 20.1653 10.2443 20.5272 9.84372 20.7979C9.44316 21.0685 9.00174 21.2426 8.54467 21.3102C8.08759 21.3777 7.62382 21.3375 7.17982 21.1917C6.73582 21.0458 6.32029 20.7973 5.95696 20.4604C5.59364 20.1234 5.28962 19.7045 5.06227 19.2276C4.83493 18.7508 4.6887 18.2253 4.63195 17.6811C4.5752 17.137 4.60903 16.5849 4.73151 16.0563C4.86002 15.5017 5.34185 15.1762 5.80769 15.3292Z"
                fill="#999999"
              />
            </svg>
            <div className="text-xl font-medium text-neutral-400 group-hover:text-white">
              New products
            </div>
          </button>
          <button className="text-xl font-medium leading-8 text-neutral-400 hover:text-white">
            About Us
          </button>
          <button className="text-xl font-medium leading-8 text-neutral-400 hover:text-white">
            Contact Us
          </button>
        </div>

        {/* Browse All Categories Button */}
        <Link to={"/allCategories"}>
          <button className="flex gap-2.5 items-center p-3.5 bg-green-600 rounded-sm w-[218px] max-sm:w-full hover:bg-green-500">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[24px] h-[24px]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 3C2.5 2.44772 2.94772 2 3.5 2H10.5C11.0523 2 11.5 2.44772 11.5 3V10C11.5 10.5523 11.0523 11 10.5 11H3.5C2.94772 11 2.5 10.5523 2.5 10V3ZM4.5 4V9H9.5V4H4.5Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5 3C13.5 2.44772 13.9477 2 14.5 2H21.5C22.0523 2 22.5 2.44772 22.5 3V10C22.5 10.5523 22.0523 11 21.5 11H14.5C13.9477 11 13.5 10.5523 13.5 10V3ZM15.5 4V9H20.5V4H15.5Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.5 14C13.5 13.4477 13.9477 13 14.5 13H21.5C22.0523 13 22.5 13.4477 22.5 14V21C22.5 21.5523 22.0523 22 21.5 22H14.5C13.9477 22 13.5 21.5523 13.5 21V14ZM15.5 15V20H20.5V15H15.5Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.5 14C2.5 13.4477 2.94772 13 3.5 13H10.5C11.0523 13 11.5 13.4477 11.5 14V21C11.5 21.5523 11.0523 22 10.5 22H3.5C2.94772 22 2.5 21.5523 2.5 21V14ZM4.5 15V20H9.5V15H4.5Z"
                fill="white"
              />
            </svg>
            <div className="text-base font-semibold text-white">
              Browse Categories
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
