import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface Props {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  side?: "left" | "right";
  dark?: boolean;
  children?: ReactNode;
}

export function Section({ id, eyebrow, title, copy, side = "left", dark, children }: Props) {
  return (
    <section
      id={id}
      className={`relative flex min-h-screen items-center overflow-hidden py-24 ${dark ? "section-dark" : ""}`}
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:gap-20">
        <div className={side === "right" ? "md:order-2" : ""}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            {eyebrow && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em]"
                style={{ borderColor: "color-mix(in oklch, var(--brand-accent) 40%, transparent)", color: "var(--brand-accent)" }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-accent)" }} />
                {eyebrow}
              </div>
            )}
            <h2 className="text-balance text-4xl font-bold leading-[1.05] md:text-6xl">{title}</h2>
            {copy && <p className="mt-6 text-lg leading-relaxed opacity-80">{copy}</p>}
            {children && <div className="mt-8">{children}</div>}
          </motion.div>
        </div>
        {/* Empty spacer — orb floats over this side */}
        <div aria-hidden />
      </div>
    </section>
  );
}
