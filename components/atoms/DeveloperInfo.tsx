import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const DeveloperInfo = ({ className }: { className?: string }) => {
  const t = useTranslations('DeveloperInfo');

  return (
    <motion.p
      className={"text-sm text-gray-400 flex items-center justify-center gap-1" + " " + className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      {t('madeWith')}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 animate-pulse">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#E53E3E"
          stroke="#9B2C2C"
          strokeWidth="0.5"
          strokeLinejoin="round" />
      </svg>
      {t('by')}
      <Link href="https://essijunior.com" target="_blank" className="text-accent hover:underline">Essi Junior</Link>
    </motion.p>
  );
};

export default DeveloperInfo;
