import React from 'react';
import Input from '../ui/Input';
// MapPicker removed as per request
import SchoolAutocomplete from '../ui/SchoolAutocomplete';
import styles from './Steps.module.css';

const SchoolInfo = () => {
  return (
    <div className={styles.stepContainer}>
      <SchoolAutocomplete 
        name="schoolName" 
        label="School / Institution Name" 
        placeholder="Start typing to search..." 
        required 
      />
      
      <Input 
        name="schoolAddress" 
        label="School Address" 
        placeholder="Full address with pin code" 
        required 
      />

      <Input 
        name="locationPin" 
        label="Location" 
        placeholder="e.g. Near Bus Stand, Main Road" 
        required={false}
      />

      <Input 
        name="pickupLocationUrl" 
        label="Location for Pick Up & Drop (Google Map Link)" 
        placeholder="https://maps.google.com/..." 
        required={false}
      />
    </div>
  );
};

export default SchoolInfo;
