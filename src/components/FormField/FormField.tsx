import { useState } from 'react';
import styles from './FormField.module.css';

interface Option {
  value: string;
  label: string;
}

interface FormFieldProps {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  options?: Option[];
}

const FormField = ({
  label,
  id,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  options = [],
}: FormFieldProps) => {
  const [focused, setFocused] = useState(false);
  
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  
  return (
    <div className={styles.formField}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`${styles.input} ${styles.textarea}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          className={styles.select}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
    </div>
  );
};

export default FormField;
