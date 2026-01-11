import React from 'react';
import Input from '../ui/Input';
import styles from './Steps.module.css';
import { isValidPhoneNumber } from 'libphonenumber-js';

const ContactInfo = () => {
  return (
    <div className={styles.stepContainer}>
      <Input 
        name="contactName" 
        label="Contact Person's Name" 
        placeholder="Full Name" 
        required 
      />
      
      <Input 
        name="contactNumber" 
        label="Contact Number" 
        placeholder="+91 98765 43210" 
        type="tel"
        required 
        validation={{ 
            validate: (value) => isValidPhoneNumber(value, 'IN') || "Invalid Indian mobile number"
        }}
      />

       <Input 
        name="alternateNumber" 
        label="Alternate Number" 
        placeholder="Optional" 
        type="tel"
        required={false} 
        validation={{ 
            validate: (value) => !value || isValidPhoneNumber(value, 'IN') || "Invalid Indian mobile number"
        }}
      />

      <Input 
        name="email" 
        label="Email Address" 
        placeholder="school@example.com" 
        type="email"
        required 
        validation={{ pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } }}
      />
      
      <Input 
        name="emergencyContact" 
        label="Emergency Contact Details" 
        placeholder="Name, Number, Relationship" 
        required 
      />
    </div>
  );
};

export default ContactInfo;
