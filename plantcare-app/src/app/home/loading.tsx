'use client';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#F5F5F5]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-[#87b57d] border-solid rounded-full border-t-transparent animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-[#3e663a]">Chargement...</p>
      </div>
    </div>
  );
}
