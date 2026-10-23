export default function Nav() {
  return (
    <header className="relative z-3 grid grid-cols-[1fr_auto] items-center gap-4 px-6 py-5 text-[0.78rem] tracking-[0.08em] text-ink uppercase">
      <p className="m-0 font-[650]">Zone Connection</p>
      <a
        className="justify-self-end rounded-full border border-ink px-3.5 py-2 font-semibold tracking-[0.06em] text-inherit no-underline hover:bg-ink hover:text-paper"
        href="#contato"
      >
        Contato
      </a>
    </header>
  );
}
