import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- Matrix Background ---
export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01SHOCKTRAPSYSTEMSECURITYWARNINGDENYTRACE';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 26, 26, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px 'JetBrains Mono'`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-[-1] opacity-30 pointer-events-none" />;
};

// --- Glass Card ---
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  isAlert?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', isAlert = false, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`glass-panel p-4 rounded-xl text-sm border-l-4 ${
        isAlert ? 'border-l-[#FF6B6B] alert-glow bg-[#FF6B6B]/10' : 'border-l-[#00FF41]'
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- Cyber Button ---
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost';
  isLoading?: boolean;
  block?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  block = false,
  ...props 
}) => {
  const baseStyles = "relative overflow-hidden font-mono font-bold py-3 px-6 rounded transition-all duration-200 uppercase tracking-wider text-sm flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41] hover:bg-[#00FF41] hover:text-[#051A1A]",
    danger: "bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white",
    ghost: "bg-transparent text-[#00FF41]/70 hover:text-[#00FF41]",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variants[variant]} ${block ? 'w-full' : ''} ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
      ) : null}
      {children}
    </motion.button>
  );
};

// --- Section Header ---
export const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
    <div className="mb-6">
        <h2 className="text-xl font-bold text-[#00FF41] uppercase tracking-widest font-mono border-b border-[#00FF41]/30 pb-2 inline-block">
            {title}
        </h2>
        {subtitle && <p className="text-xs text-gray-400 mt-1 font-mono">{subtitle}</p>}
    </div>
);
