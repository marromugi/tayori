import React from 'react'
import { motion } from 'framer-motion'

export const FramerBox = (props: { children: React.ReactNode }) => {
  return (
    <motion.div
      style={{ width: '100%', height: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5
      }}
    >
      {props.children}
    </motion.div>
  )
}
