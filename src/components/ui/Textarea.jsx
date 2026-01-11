import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from '../ui/Input.module.css'; // Reusing Input styles

const Textarea = ({ name, label, placeholder, required, rows = 3 }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        {...register(name, { required: required ? "This field is required" : false })}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};

export default Textarea;
