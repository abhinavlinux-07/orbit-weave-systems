import { motion } from "framer-motion";
import tandonLogo from "@/assets/tandon-logo.png";


const links = [
  { label: "Infrastructure", href: "#infra" },
  { label: "Telecom", href: "#telecom" },
  { label: "Security", href: "#security" },
  { label: "IT", href: "#it" },
  { label: "AV", href: "#av" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-full glass px-5 py-3 md:px-7">
        <a href="#top" className="flex items-center gap-2">
          <img
            src={tandonLogo}
            alt="Tandon Electronics"
            width={1536}
            height={1024}
            className="h-8 w-auto md:h-9"
          />
        </a>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, var(--brand), var(--brand-accent))" }}
        >
          Talk to us
        </a>
      </div>
    </motion.header>
  );
}
