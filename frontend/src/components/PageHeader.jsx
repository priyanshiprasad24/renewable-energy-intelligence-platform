import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function PageHeader({ title, subtitle }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-slate-600 hover:text-green-600 font-medium transition"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-slate-800">
        {title}
      </h1>

      <p className="text-slate-500 mt-2 text-lg">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default PageHeader;