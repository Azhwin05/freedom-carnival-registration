import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, MapPin } from 'lucide-react';
import styles from './RegistrationClosed.module.css';

const RegistrationClosed = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backgroundElements}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
      </div>

      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img 
          src="/assets/ooruni-logo.png" 
          alt="Ooruni Foundation" 
          className={styles.logo}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        />
        
        <h1 className={styles.title}>FREEDOM CARNIVAL <span className={styles.year}>2026</span></h1>
        
        <div className={styles.statusBadge}>
            Registration Full
        </div>

        <p className={styles.message}>
          Thank you for the overwhelming love and support! ❤️<br/>
          We have reached our maximum capacity for this year's event.
        </p>

        <p className={styles.subMessage}>
          To ensure a safe and joyful experience for all our special children, 
          we are closing registrations. We can't wait to celebrate with everyone who has registered!
        </p>

        <div className={styles.divider}></div>

        <div className={styles.eventDetails}>
            <div className={styles.detailItem}>
                <Calendar size={20} className={styles.icon} />
                <span>See you onto the Event Day!</span>
            </div>
        </div>
      </motion.div>

      <footer className={styles.footer}>
        © 2026 Ooruni Foundation.
      </footer>
    </div>
  );
};

export default RegistrationClosed;
