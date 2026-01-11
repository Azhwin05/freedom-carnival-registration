import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import SchoolInfo from './steps/SchoolInfo';
import ContactInfo from './steps/ContactInfo';
import Demographics from './steps/Demographics';
import Logistics from './steps/Logistics';
import Review from './steps/Review';
import Success from './Success';
import { supabase } from '../supabaseClient';
import styles from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const methods = useForm({
    mode: 'onTouched'
  });

  // Auto-Save: Load draft on mount
  useEffect(() => {
      const savedData = localStorage.getItem('ooruni_registration_draft');
      if (savedData) {
          try {
              const parsed = JSON.parse(savedData);
              methods.reset(parsed); // Restore form values
          } catch (e) {
              console.error("Failed to load draft", e);
          }
      }
  }, [methods]);

  // Auto-Save: Save on change (using watch)
  useEffect(() => {
      const subscription = methods.watch((value) => {
          localStorage.setItem('ooruni_registration_draft', JSON.stringify(value));
      });
      return () => subscription.unsubscribe();
  }, [methods.watch]);

  const steps = [
    "School Info", "Contact", "Demographics", "Logistics", "Review"
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <SchoolInfo />;
      case 1: return <ContactInfo />;
      case 2: return <Demographics />;
      case 3: return <Logistics />;
      case 4: return <Review />;
      default: return <div>Step not implemented</div>;
    }
  };

  const handleNext = async () => {
    if (currentStep === steps.length - 1) {
        // Prevent duplicate submissions
        if (isSubmitting) return;

        // Submit logic
        setIsSubmitting(true);
        const values = methods.getValues();
        
        try {
            const { data, error } = await supabase
              .from('registrations')
              .insert([
                { 
                    school_name: values.schoolName,
                    school_address: values.schoolAddress,
                    location_pin: values.locationPin,
                    pickup_link: values.pickupLocationUrl,
                    contact_name: values.contactName,
                    contact_number: values.contactNumber,
                    alternate_number: values.alternateNumber,
                    email: values.email,
                    emergency_contact: values.emergencyContact,
                    student_count: parseInt(values.studentCount) || 0,
                    staff_count: parseInt(values.staffCount) || 0,
                    age_group: values.ageGroup,
                    special_needs_type: values.specialNeedsType,
                    specific_requirements: values.specificRequirements,
                    infrastructure_details: values.infrastructureDetails,
                    transport_needed: values.transportNeeded,
                    food_required: values.foodRequired,
                    additional_support: values.additionalSupport
                },
              ])
              .select() // Return the inserted row to get the ID
              .single();

            if (error) throw error;

            // Generate Registration ID: FC + ID padded to 4 digits (e.g., FC0001)
            // If id is 1, code is FC0001. If id is 123, code is FC0123.
            const newId = data ? data.id : 0;
            const regCode = `FC${String(newId).padStart(4, '0')}`;

            // Add code to values for Google Sheet
            const finalValues = { ...values, registrationCode: regCode };

            // 2. Submit to Google Sheets (Fire and Forget / No-CORS)
            const googleSheetUrl = "https://script.google.com/macros/s/AKfycbxk7Z5k_5haYxaG6uQ3MsMGtem1pkmHvZ3W1P7jAfoU85o__mFLwA8q5tTaXL2uoioxBw/exec";
            
            await fetch(googleSheetUrl, {
                method: "POST",
                mode: "no-cors", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalValues)
            });

            setRegistrationId(regCode); // Store for Success page
            localStorage.removeItem('ooruni_registration_draft'); // Clear draft
            setIsSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Submission Error: ${error.message || JSON.stringify(error)}`);
            setIsSubmitting(false); // Re-enable button on error
        }
        return;
    }
    // Validate current step fields before moving
    // We can define field groups per step
    const stepFields = [
        ['schoolName', 'schoolAddress'], // Step 0
        ['contactName', 'contactNumber', 'email', 'emergencyContact'], // Step 1
        ['studentCount', 'staffCount', 'ageGroup', 'specialNeedsType'], // Step 2
        ['infrastructureDetails', 'transportNeeded', 'foodRequired'] // Step 3
    ];

    const currentFields = stepFields[currentStep] || [];
    const isValid = await methods.trigger(currentFields);

    if (isValid) {
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  return (
    <>
    {isSubmitted ? (
        <Success />
    ) : (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/assets/ooruni-logo.png" alt="Ooruni Foundation" className={styles.logo} />
        <h1>Freedom Carnival Registration</h1>
      </div>
      
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
      </div>

      <div className={styles.formCard}>
        <h2>{steps[currentStep]}</h2>
        
        <FormProvider {...methods}>
          <form className={styles.formContent}>
            {renderStep()}
          </form>
        </FormProvider>

        <div className={styles.navigation}>
           <button type="button" disabled={currentStep === 0} onClick={() => setCurrentStep(prev => prev - 1)}>Back</button>
           <button 
             type="button" 
             onClick={handleNext}
             disabled={isSubmitting}
             style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
           >
             {currentStep === steps.length - 1 ? (isSubmitting ? 'Submitting...' : 'Submit') : 'Next'}
           </button>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default RegistrationForm;
