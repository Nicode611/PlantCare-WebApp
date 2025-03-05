
export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <header className=" w-full flex justify-end">
            <span className="p-2">Login</span>
            <span className="p-2">Sign up</span>
        </header>
        
        <h1 className="text-[2.5rem] m-2">Landing page</h1>

        <div className="w-full flex mb-28">
            <a className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href="/dashboard" rel="noopener noreferrer"> Dashboard </a>
            <a className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href="/settings" rel="noopener noreferrer"> Settings </a>
            <a className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44" href="/api" rel="noopener noreferrer"> Test API </a>
        </div>

        

        <div>
            <h2>IN THIS PAGE</h2>
            <span>Explenations about the application and call to action button to sign in. Have to use google account</span>
        </div>
    </div>
  );
}
