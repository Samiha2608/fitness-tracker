import { motion } from "framer-motion";

const AnimatedWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default AnimatedWrapper;
