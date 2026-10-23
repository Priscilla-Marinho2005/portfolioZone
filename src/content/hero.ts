import assistek from "../assets/assistekassistencia.vercel.app-Assistek Clima e Refrigeração-cvscreenshot.jpeg";
import openhaus from "../assets/openhaus-delta.vercel.app-OpenHaus Negócios Imobiliários-cvscreenshot.jpeg";
import jonathas from "../assets/jonathascorretor.com.br-Jonathas Luz Corretor de Imóveis-cvscreenshot.jpeg";
import alexandre from "../assets/alexandrecorretordeimoveis.com.br-Alexandre Arruda Corretor de Imóveis-cvscreenshot.jpeg";
import zone from "../assets/zoneconnection.com.br-Zone Connection CRM IA no WhatsApp e Sites para Imobiliárias-cvscreenshot.jpeg";
import debora from "../assets/corretoradebora.com.br-Débora Silva Corretora de Imóveis-cvscreenshot.jpeg";

export type HeroProject = {
  id: string;
  title: string;
  category: string;
  src: string;
};

export const heroContent = {
  eyebrow: "Priscilla & Eduardo",
  title: "Transformamos ideias em experiências digitais.",
  highlight: "Sites, landing pages e sistemas web.",
  support:
    "Desenvolvemos soluções digitais que unem design, tecnologia e funcionalidade para transformar ideias em projetos reais.",
  primary: { label: "Explorar projetos", href: "#projetos" },
  secondary: { label: "Conheça nossa história", href: "#historia" },
  company: "Fundadores da Zone Connection",
};

export const heroProjects: HeroProject[] = [
  { id: "zone", title: "Zone Connection", category: "Site", src: zone },
  { id: "openhaus", title: "OpenHaus", category: "Site institucional", src: openhaus },
  { id: "assistek", title: "Assistek", category: "Site", src: assistek },
  { id: "jonathas", title: "Jonathas Luz", category: "Landing page", src: jonathas },
  { id: "alexandre", title: "Alexandre Arruda", category: "Landing page", src: alexandre },
  { id: "debora", title: "Débora Silva", category: "Landing page", src: debora },
];
