export function Footer() {
  return (
    <footer className="bg-slate-800/50 border-t border-slate-600/30 px-4 sm:px-6 py-3 mt-8">
      <div className="flex flex-col gap-1 items-center justify-center">
        <p className="text-xs sm:text-sm text-slate-400">
          © {new Date().getFullYear()} NexusDesk - IT Support Management System
        </p>
        <p className="text-sm text-slate-400">
          Made with ❤️ by{" "}
          <a href="https://narayankhanal.vercel.app" target="_blank">
            Narayan Khanal
          </a>
        </p>
      </div>
    </footer>
  );
}
