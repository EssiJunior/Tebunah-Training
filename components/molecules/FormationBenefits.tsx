// components/FormationBenefits.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import {
  LayoutDashboard, Briefcase, Globe2, Users,
  LayoutGrid, Building2, TableProperties, BarChart3,
  LineChart, Code2, Monitor, TrendingUp, Braces,
  AppWindow, Globe, Store, Layers, Smartphone,
  TabletSmartphone, Bot, Zap, Rocket, MessageSquareCode,
  Wand2, Trophy, Palette, Megaphone, Terminal,
  FolderCode, BrainCircuit, Database, PieChart,
  FileSpreadsheet, ChevronDown,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  LayoutDashboard, Briefcase, Globe2, Users, LayoutGrid,
  Building2, TableProperties, BarChart3, LineChart, Code2,
  Monitor, TrendingUp, Braces, AppWindow, Globe, Store,
  Layers, Smartphone, TabletSmartphone, Bot, Zap, Rocket,
  MessageSquareCode, Wand2, Trophy, Palette, Megaphone,
  Terminal, FolderCode, BrainCircuit, Database, PieChart,
  FileSpreadsheet,
};

const COLOR_MAP: Record<number, { icon: string; check: string }> = {
  0: { icon: "bg-violet-200 text-violet-800", check: "bg-violet-200 text-violet-700" },
  1: { icon: "bg-emerald-200 text-emerald-800", check: "bg-emerald-200 text-emerald-700" },
  2: { icon: "bg-blue-200 text-blue-800", check: "bg-blue-200 text-blue-700" },
  3: { icon: "bg-amber-200 text-amber-800", check: "bg-amber-200 text-amber-700" },
};

type FormationBenefit = {
  icon: string
  itemCount: number
}

type Props = {
  formationId: string
  benefits: FormationBenefit[]
}

const FormationBenefits = ({ formationId, benefits }: Props) => {
  const tData = useTranslations('formations')
  const t = useTranslations('Formations')

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="py-4">
      <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase mb-2">
        {t('benefits.eyebrow')}
      </p>
      <h2 className="text-accent">{t('benefits.heading')}</h2>
      <p className="text-[12px] text-white/45 mb-8">
        {t('benefits.subheading')}
      </p>

      <div className="flex flex-col gap-2">
        {benefits.map((benefit, i) => {
          const Icon = ICON_MAP[benefit.icon] ?? Users;
          const colors = COLOR_MAP[i % 4];
          const isOpen = openIndex === i;

          const title = tData(`${formationId}.benefits.${i}.title`)
          const items = Array.from(
            { length: benefit.itemCount },
            (_, ii) => tData(`${formationId}.benefits.${i}.items.${ii}`)
          )

          return (
            <div
              key={i}
              className="border border-white/6 bg-surface rounded overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${isOpen ? "bg-muted/40" : "hover:bg-muted/30"
                  }`}
              >
                <span className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${colors.icon}`}>
                  <Icon size={16} />
                </span>

                <span className="flex-1 text-sm font-medium">
                  {title}
                </span>

                <span className="text-xs mr-2 shrink-0">
                  {benefit.itemCount} {t('benefits.points')}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="shrink-0"
                >
                  <ChevronDown size={16} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <ul className="border-t border-white/6 divide-y divide-white/6 px-4 pb-3 pt-1">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 py-2 first:pt-2 last:pb-0"
                        >
                          <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${colors.check}`}>
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                              <path
                                d="M1.5 4.5L3.5 6.5L7.5 2.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="text-sm text-muted-foreground leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default FormationBenefits