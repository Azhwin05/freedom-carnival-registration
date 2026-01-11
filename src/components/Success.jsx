import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
// Actually, let's make a new module for Success to keep it clean.
import successStyles from './Success.module.css';

const Success = ({ id }) => {
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
