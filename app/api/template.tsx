'use client'

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
    const path = usePathname();
    return (
        <motion.div
            initial={{ x: path.startsWith('/api/home/') ? 0 : 50, opacity: 0 }}
            exit={{ x: path.startsWith('/api/home/') ? 0 : 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.25}}
        >
            {children}
        </motion.div>
    )
}