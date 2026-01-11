import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import successStyles from './Success.module.css';

const Success = ({ id }) => {
  useEffect(() => {
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0d9488', '#0f766e', '#ccfbf1']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
         colors: ['#0d9488', '#0f766e', '#ccfbf1']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className={successStyles.container}>
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <CheckCircle size={80} color="var(--success-color)" />
      </motion.div>
      <h2>Registration Successful!</h2>
      {id && <div className={successStyles.regId}>Registration ID: <span>{id}</span></div>}
      <p>Thank you for registering. Please save your ID for future reference. <br/> A confirmation email has been sent to you.</p>
      <button onClick={() => window.location.reload()}>Register Another</button>
    </div>
  );
};

export default Success;
