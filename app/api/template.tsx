"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Template({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <motion.div
            transition={{ ease: 'easeInOut', duration: 0.25 }}
        >
            {children}
        </motion.div>
    )
}
