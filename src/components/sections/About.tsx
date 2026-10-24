import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const titleWords = "Uma ideia que se tornou um propósito.".split(" ");

const companyLead =
    "A Zone Connection nasceu para aproximar empresas da tecnologia e transformar ideias em soluções reais.";
const companyBody =
    "Desenvolvemos sites, landing pages e sistemas web que ajudam negócios a fortalecer sua presença digital, atrair clientes e otimizar processos. Também criamos soluções próprias, como nosso CRM para imobiliárias, pensado para centralizar informações, organizar atendimentos e facilitar a gestão comercial. Unimos desenvolvimento e visão de negócio para criar ferramentas que fazem sentido na prática e acompanham o crescimento de cada empresa.";

const services = [
    { name: "Sites e landing pages", note: "Presença digital forte, para atrair clientes" },
    { name: "Sistemas web", note: "Processos mais simples e otimizados" },
    { name: "CRM para imobiliárias", note: "Atendimentos, informações e gestão comercial num só lugar" },
];

const foundersLead =
    "Por trás da Zone Connection estão Priscilla Marinho Falcão e Eduardo Alves, dois desenvolvedores que decidiram unir suas habilidades para construir algo próprio.";
const foundersBody =
    "Compartilhando ideias, enfrentando desafios e aprendendo a cada projeto, encontramos na tecnologia uma oportunidade de criar soluções e tirar planos do papel. Hoje, dividimos a responsabilidade de desenvolver nossos projetos e fazer a empresa crescer, transformando nossa parceria em algo que vai além do código.";

function Lead({ text }: { text: string }) {
    return (
        <p
            data-lead
            className="m-0 font-serif text-[clamp(1.7rem,2.9vw,2.5rem)] leading-[1.12] tracking-[-0.02em]"
        >
            {text.split(" ").map((word, i) => (
                <span key={i} data-scrub className="inline-block pr-[0.26em]">
                    {word}
                </span>
            ))}
        </p>
    );
}

export default function About() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const scope = root.current;
            if (!scope) return;

            const blocks = gsap.utils.toArray<HTMLElement>("[data-block]", scope);
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(scope.querySelectorAll("[data-word]"), { y: 0 });
                gsap.set(scope.querySelectorAll("[data-reveal]"), { autoAlpha: 1, y: 0 });
                gsap.set(scope.querySelectorAll("[data-photo]"), { clipPath: "inset(0% 0% 0% 0%)" });
                gsap.set(scope.querySelectorAll("[data-frame]"), { autoAlpha: 1, x: 0, y: 0 });
            });

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const tweens: gsap.core.Animation[] = [];

                blocks.forEach((block) => {
                    const words = block.querySelectorAll<HTMLElement>("[data-word]");
                    const reveal = block.querySelectorAll<HTMLElement>("[data-reveal]");
                    const photo = block.querySelector<HTMLElement>("[data-photo]");
                    const photoImg = block.querySelector<HTMLElement>("[data-photo-img]");
                    const frame = block.querySelector<HTMLElement>("[data-frame]");

                    const tl = gsap.timeline({
                        defaults: { ease: "power3.out" },
                        scrollTrigger: { trigger: block, start: "top 78%", once: true },
                    });

                    if (photo) {
                        tl.fromTo(
                            photo,
                            { clipPath: "inset(0% 0% 100% 0%)" },
                            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.inOut" },
                        );
                        if (photoImg) tl.fromTo(photoImg, { scale: 1.15 }, { scale: 1, duration: 1.4 }, 0);
                        if (frame) tl.fromTo(frame, { autoAlpha: 0, x: -16, y: -16 }, { autoAlpha: 1, x: 0, y: 0, duration: 0.8 }, 0.7);
                    }

                    if (words.length) tl.to(words, { y: 0, duration: 0.85, stagger: 0.05 }, 0.2);
                    if (reveal.length) {
                        tl.fromTo(
                            reveal,
                            { autoAlpha: 0, y: 14 },
                            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.09 },
                            0.6,
                        );
                    }
                    tweens.push(tl);

                    // O texto de destaque "acende" palavra por palavra conforme a rolagem
                    block.querySelectorAll<HTMLElement>("[data-lead]").forEach((lead) => {
                        tweens.push(
                            gsap.fromTo(
                                lead.querySelectorAll("[data-scrub]"),
                                { opacity: 0.16 },
                                {
                                    opacity: 1,
                                    ease: "none",
                                    stagger: 0.12,
                                    scrollTrigger: {
                                        trigger: lead,
                                        start: "top 82%",
                                        end: "bottom 48%",
                                        scrub: true,
                                    },
                                },
                            ),
                        );
                    });
                });

                return () => {
                    tweens.forEach((t) => {
                        t.scrollTrigger?.kill();
                        t.kill();
                    });
                };
            });
        },
        { scope: root },
    );

    return (
        <section
            ref={root}
            id="sobre"
            aria-labelledby="about-title"
            className="relative overflow-hidden bg-paper px-8 md:py-20 text-ink "
        >
            <div className="mx-auto flex max-w-7xl flex-col gap-24 max-md:gap-16">
                {/* Título */}
                <div data-block>
                    <h2
                        id="about-title"
                        className="m-0 max-w-[16ch] font-serif text-[clamp(3rem,8vw,7.2rem)] leading-[0.9] font-normal tracking-[-0.04em]"
                    >
                        {titleWords.map((word, i) => (
                            <span key={i} className="mr-[0.2em] inline-block overflow-hidden align-bottom">
                                <span data-word className="inline-block translate-y-[110%] motion-reduce:translate-y-0">
                                    {word}
                                </span>
                            </span>
                        ))}
                    </h2>
                </div>

                {/* Bloco 1: logo à esquerda, empresa à direita */}
                <div
                    data-block
                    className="grid grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] items-start gap-20 max-lg:gap-10 max-md:grid-cols-1"
                >
                    <div className="relative max-md:mr-4">
                        <div
                            data-frame
                            aria-hidden="true"
                            className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg border border-ink opacity-0 motion-reduce:opacity-100"
                        />
                        <div
                            data-photo
                            className="relative overflow-hidden rounded-lg bg-paper shadow-[0_18px_40px_rgba(18,17,15,0.08)] [clip-path:inset(0%_0%_100%_0%)] motion-reduce:[clip-path:none]"
                        >
                            <img
                                data-photo-img
                                src="/LogoComFundo.png"
                                alt="Logo da Zone Connection"
                                loading="lazy"
                                className="block aspect-square h-auto w-full object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <Lead text={companyLead} />

                        <p
                            data-reveal
                            className="mt-8 mb-0 max-w-[58ch] text-[1.02rem] leading-[1.7] text-muted opacity-0 motion-reduce:opacity-100"
                        >
                            {companyBody}
                        </p>

                        <ul className="mt-10 mb-0 list-none p-0">
                            {services.map((s) => (
                                <li
                                    key={s.name}
                                    data-reveal
                                    className="flex items-baseline justify-between gap-6 border-t border-ink/20 py-4 opacity-0 last:border-b max-sm:flex-col max-sm:gap-1 motion-reduce:opacity-100"
                                >
                                    <span className="text-[1.05rem] font-semibold tracking-[-0.02em]">{s.name}</span>
                                    <span className="max-w-[30ch] text-right text-[0.85rem] leading-snug text-muted max-sm:max-w-none max-sm:text-left">
                                        {s.note}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bloco 2: fundadores à esquerda, foto à direita */}
                <div
                    data-block
                    className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] items-center gap-20 max-lg:gap-10 max-md:grid-cols-1"
                >
                    <div className="max-md:order-2">
                        <Lead text={foundersLead} />
                        <p
                            data-reveal
                            className="mt-8 mb-0 max-w-[58ch] text-[1.02rem] leading-[1.7] text-muted opacity-0 motion-reduce:opacity-100"
                        >
                            {foundersBody}
                        </p>
                    </div>

                    <figure className="relative m-0 max-md:order-1 max-md:mr-4">
                        <div
                            data-frame
                            aria-hidden="true"
                            className="absolute inset-0 translate-x-4 translate-y-4 rounded-lg border border-ink opacity-0 motion-reduce:opacity-100"
                        />
                        <div
                            data-photo
                            className="relative overflow-hidden rounded-lg shadow-[0_18px_40px_rgba(18,17,15,0.08)] [clip-path:inset(0%_0%_100%_0%)] motion-reduce:[clip-path:none]"
                        >
                            <img
                                data-photo-img
                                src="/foto.JPG"
                                alt="Priscilla Marinho Falcão e Eduardo Alves, fundadores da Zone Connection"
                                loading="lazy"
                                className="block aspect-4/5 h-auto w-full object-cover"
                            />
                        </div>
                    </figure>
                </div>
            </div>
        </section>
    );
}