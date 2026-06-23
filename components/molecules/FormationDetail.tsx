"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CATEGORY_COLORS } from "@/data/formations";
import RegistrationForm from "./RegistrationForm";
import FormationBenefits from "./FormationBenefits";
import { useTranslations } from "next-intl";

// ─── helpers ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  bureautique: "Bureautique",
  dev: "Web & Mobile",
  ia: "Intelligence Artificielle",
  data: "Data & SQL",
};

// ─── main page component ─────────────────────────────────────────────────────

export default function FormationDetail({
  formation,
}: {
  formation: Formation;
}) {
  const t = useTranslations("Formation");
  const tData = useTranslations("formations");
  const catColor = CATEGORY_COLORS[formation.category];

  const META_ITEMS = [
    { label: "Durée", value: tData(`${formation.id}.duration`) },
    { label: "Volume horaire", value: tData(`${formation.id}.hoursTotal`) },
    { label: "Public cible", value: tData(`${formation.id}.target`) },
    { label: "Prérequis", value: tData(`${formation.id}.prereq`) },
  ];

  return (
    <main className="px-6 md:px-10 py-16 max-w-3xl mx-auto">
      {/* Back */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link
          href="/#formations"
          className="inline-flex items-center gap-2 font-mono text-[11px] text-white/30 hover:text-white/60 transition-colors mb-8"
        >
          ← {t("back")}
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.05,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="flex flex-col gap-3 mb-10"
      >
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className="font-mono text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-px"
            style={{ color: catColor, border: `0.5px solid ${catColor}30` }}
          >
            {CATEGORY_LABELS[formation.category] ?? formation.category}
          </span>

          {formation.availableNow ? (
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-px border border-green-500/30 text-green-400">
              ● Disponible
            </span>
          ) : (
            <span className="font-mono text-[10px] px-2.5 py-1 rounded-px border border-white/10 text-white/30">
              Bientôt disponible
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          className="font-display text-[28px] md:text-[34px] font-extrabold leading-none!"
          style={{ color: CATEGORY_COLORS[formation.category] }}
        >
          {tData(`${formation.id}.title`)}
        </h1>

        {/* Description */}
        <p className="text-[13px] text-white/45 leading-[1.85] max-w-xl">
          {tData(`${formation.id}.description`)}
        </p>
      </motion.div>

      {/* Meta grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mb-10"
      >
        <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-4">
          {t("details")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/4 border border-white/4 rounded overflow-hidden">
          {META_ITEMS.map(({ label, value }) => (
            <div key={label} className="bg-surface p-4 flex flex-col gap-1">
              <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">
                {label}
              </span>
              <span className="text-[12px] text-white/60 leading-snug">
                {value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Pricing */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="mb-12"
      >
        <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-4">
          {t("prices")}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                mode: "Présentiel",
                label: formation.priceOnsiteLabel,
                note: t("onsite"),
              },
              {
                mode: "En ligne",
                label: formation.priceOnlineLabel,
                note: t("online"),
              },
            ] as const
          ).map(({ mode, label, note }) => (
            <div
              key={mode}
              className={[
                "p-5 rounded flex flex-col gap-1 border border-white/6 bg-surface",
              ].join(" ")}
            >
              <span className="font-mono text-[10px] text-white/25 tracking-widest uppercase">
                {mode}
              </span>
              <span
                className={[
                  "text-[22px] font-extrabold text-white/70",
                ].join(" ")}
              >
                {label}
              </span>
              <span className="font-mono text-[10px] text-white/20">
                {note}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <FormationBenefits formationId={formation.id} benefits={formation.benefits} />

      {/* Divider */}
      <div className="border-t border-white/6 mb-12" />

      {/* Registration form */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <div className="mb-6">
          <h2 className="font-display text-[20px] font-bold text-ink mb-1">
            {t("preenrole")}
          </h2>
          <p className="font-mono text-[12px] text-white/30 leading-relaxed">
            {t("form")}
          </p>
        </div>

        <RegistrationForm formation={formation} />
      </motion.div>
    </main>
  );
}
