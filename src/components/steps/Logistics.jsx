import React from 'react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import styles from './Steps.module.css';

const Logistics = () => {
  return (
    <div className={styles.stepContainer}>
       <Input 
        name="infrastructureDetails" 
        label="School's Infrastructure Details" 
        placeholder="e.g., wheelchair accessibility, medical facilities" 
        required 
      />

      <div style={{display: 'flex', gap: '20px', margin: '10px 0'}}>
        {/* Simple radio implementation or stick to inputs for now, let's use Select native for simplicity if needed, or just text for flexibility as per prompt "needed / not needed" */}
        <Input 
            name="transportNeeded" 
            label="Transport Needed?" 
            placeholder="Yes / No" 
            required 
        />
        <Input 
            name="foodRequired" 
            label="Food Required?" 
            placeholder="Yes / No" 
            required 
        />
      </div>

      <Textarea 
        name="additionalSupport" 
        label="Any Additional Support Needed" 
        placeholder="e.g., caregiver assistance, special dietary needs..." 
        rows={3}
      />
    </div>
  );
};

export default Logistics;
