
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/api"
            rel="noopener noreferrer"
          >
            Test API
          </a>
          <div>
            <h2>IN THIS PAGE</h2>
            <span>Home</span>
            <span>Login</span>
            <span>Sign up</span>
          </div>
          <div>
            <h2>TO</h2>
            <a href="/dashboard">Dashboard</a>
          </div>
    </div>
  );
}
