import React from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './Input.module.css';

const Input = ({ name, label, type = "text", placeholder, required, validation = {} }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = errors[name];

  return (
    <div className={styles.inputGroup}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${styles.input} ${error ? styles.errorInput : ''}`}
        {...register(name, { required: required ? "This field is required" : false, ...validation })}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  );
};

export default Input;
