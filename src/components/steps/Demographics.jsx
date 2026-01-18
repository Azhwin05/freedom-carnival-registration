import React from 'react';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import styles from './Steps.module.css';

const Demographics = () => {
  return (
    <div className={styles.stepContainer}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px'}}>
        <Input 
            name="studentCount" 
            label="Total Students" 
            placeholder="0" 
            type="number"
            required 
        />
        <Input 
            name="staffCount" 
            label="Staff/Caregivers" 
            placeholder="0" 
            type="number"
            required 
        />
        <Input 
            name="parentsCount" 
            label="Parents Count" 
            placeholder="0" 
            type="number"
            required 
        />
      </div>

      <Input 
        name="ageGroup" 
        label="Students' Age Group" 
        placeholder="e.g., 6-12, 13-18" 
        required 
      />

      <Input 
        name="specialNeedsType" 
        label="Type of Special Needs" 
        placeholder="e.g., Autism, ADHD, Physical Disability" 
        required 
      />

      <Textarea 
        name="specificRequirements" 
        label="Specific Requirements / Accommodations" 
        placeholder="e.g., wheelchair accessibility, sign language interpreter..." 
        rows={4}
      />
    </div>
  );
};

export default Demographics;
