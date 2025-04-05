import LandingBg from "../../images/landing-page-bg.webp"

export default function TestApi() {

  return (
    <div className={`min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`} 
    style={{ backgroundImage: `url(${LandingBg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <header className=" w-full flex justify-end">
        </header>

        <h1 className="font-fancy font-extrabold text-[2.5rem] m-2">Test API</h1>

        <div className="w-full flex mb-28">
            <a className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href="../dashboard" rel="noopener noreferrer"> Dashboard </a>
            <a className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href="../" rel="noopener noreferrer"> Home </a>
        </div>

        <div>
            <h2>IN THIS PAGE</h2>
            <span>Test API</span>
        </div>
    </div>
  );
}
