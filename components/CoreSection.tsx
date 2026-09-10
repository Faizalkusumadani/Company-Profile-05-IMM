"use client";

import { motion } from "framer-motion";

interface CoreValueItem {
  id: string;
  accentColor: string;
  title: string;
  description: string;
}

export default function CoreValuesList({ items }: { items: CoreValueItem[] }) {
  return (
    <div className="space-y-10 md:space-y-12">
      {items.map(({ id, accentColor, title, description }, idx) => {
        const firstLetter = title.charAt(0);
        const restOfTitle = title.slice(1);

        return (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: idx * 0.06, ease: "easeOut" }}
            className="group"
          >
            <h3 className="flex items-baseline  font-extrabold leading-none tracking-tight ">
              <span className={`${accentColor} mr-2 text-3xl md:text-[63px]`}>
                {firstLetter}
              </span>
              <span className="text-base text-blue-900 transition-colors duration-300 group-hover:text-imm-blue">
                {restOfTitle}
              </span>
            </h3>
            <p className="mt-2.5 max-w-3xl text-base leading-relaxed text-gray-600 md:text-base">
              {description}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
