import React, { useState, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { Search } from 'lucide-react';
import styles from './Input.module.css';
import autoStyles from './SchoolAutocomplete.module.css';

// Hardcoded for reliability
const PRELOADED_SCHOOLS = [
    { "name": "Government Higher Secondary School, Saidapet", "type": "Government", "ward": 135, "address": "Saidapet, Chennai - 600015" },
    { "name": "Chennai Corporation Boys Higher Secondary School, Egmore", "type": "Government", "ward": 107, "address": "Egmore, Chennai - 600008" },
    { "name": "GHSS Velachery", "type": "Government Higher Secondary", "ward": 152, "address": "Velachery Main Road, Chennai" },
    { "name": "Government Girls Higher Secondary School, Perambur", "type": "Government", "ward": 89, "address": "Perambur High Road, Chennai - 600011" },
    { "name": "CPS Chinnandikuppam", "type": "Government Primary", "ward": 2, "address": "George Town, Chennai - 600001" },
    { "name": "GHSS Anna Nagar", "type": "Government Higher Secondary", "ward": 164, "address": "2nd Avenue, Anna Nagar West, Chennai" },
    { "name": "St. Joseph's Anglo Indian Higher Secondary School", "type": "Private Aided", "ward": 119, "address": "Vepery, Chennai - 600007" },
    { "name": "Don Bosco Higher Secondary School", "type": "Private", "ward": 141, "address": "Egmore, Chennai - 600008" },
    { "name": "Santhome Higher Secondary School", "type": "Private Aided", "ward": 145, "address": "Santhome High Road, Chennai - 600004" },
    { "name": "Little Flower Higher Secondary School", "type": "Private", "ward": 93, "address": "Vadapalani, Chennai - 600026" },
    { "name": "Chennai Corporation Girls Higher Secondary School, T. Nagar", "type": "Government", "ward": 124, "address": "T. Nagar, Chennai - 600017" },
    { "name": "GHSS Thiruvanmiyur", "type": "Government Higher Secondary", "ward": 200, "address": "L.B. Road, Thiruvanmiyur, Chennai" },
    { "name": "Padma Subrahmaniam Kalyanasundaram Corporation Girls Higher Secondary School", "type": "Government", "ward": 112, "address": "Nungambakkam, Chennai - 600034" },
    { "name": "HLC International School", "type": "Private", "ward": 174, "address": "Kalmandapam, Besant Nagar, Chennai" },
    { "name": "SBOA School & Junior College", "type": "Private", "ward": 166, "address": "Anna Nagar West, Chennai - 600040" },
    { "name": "GHSS Ambattur", "type": "Government Higher Secondary", "ward": 109, "address": "Ambattur, Chennai - 600053" },
    { "name": "Government High School, Kodungaiyur", "type": "Government", "ward": 94, "address": "Kodungaiyur, Chennai - 600118" },
    { "name": "DAV Boys Higher Secondary School", "type": "Private", "ward": 128, "address": "Gopalapuram, Chennai - 600086" },
    { "name": "Justice Basheer Ahmed Sayeed Higher Secondary School for Girls", "type": "Private Aided", "ward": 133, "address": "Teynampet, Chennai - 600018" },
    { "name": "Chennai Higher Secondary School", "type": "Private", "ward": 118, "address": "Nungambakkam, Chennai - 600034" }
];

const SchoolAutocomplete = ({ name, label, placeholder, required }) => {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const wrapperRef = useRef(null);
  
  // Use watch to get the value for search directly
  const inputValue = watch(name);
  
  // Get RHF registration props
  const { onChange, onBlur, name: fieldName, ref } = register(name, { required: required ? "This field is required" : false });

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  useEffect(() => {
    if (!inputValue) {
        setSuggestions([]);
        setNoResults(false);
        return;
    }

    const timer = setTimeout(async () => {
      if (showDropdown) {
        setIsLoading(true);
        setNoResults(false);
        
        try {
            const lowerValue = inputValue.toLowerCase();
            
            // 1. Local Search
            let localResults = PRELOADED_SCHOOLS.filter(school => {
                const sName = school.name.toLowerCase();
                const sType = school.type.toLowerCase();
                
                // If user types 'government' or 'govt', match type OR name
                if (lowerValue.includes('government') || lowerValue.includes('govt')) {
                    return sName.includes('government') || sType.includes('government');
                }
                
                return sName.includes(lowerValue);
            });

            const formattedLocal = localResults.map(s => ({
                name: s.name,
                address: s.address + (s.ward ? `, Ward ${s.ward}` : ''),
                lat: null,
                lon: null,
                source: 'local'
            }));

            // 2. API Search Fallback
            // Only search API if local results are few AND query > 3 chars
            let formattedApi = [];
            if (formattedLocal.length < 5 && inputValue.length > 3) {
                try {
                     let query = inputValue;
                    if (!query.toLowerCase().includes('tamil nadu') && !query.toLowerCase().includes('chennai')) {
                        query += ' Tamil Nadu';
                    }
                    
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&amenity=school&countrycodes=in&limit=5`
                    );
                    
                    if (response.ok) {
                        const data = await response.json();
                        formattedApi = data.map(s => ({
                            name: s.name || s.display_name.split(',')[0],
                            address: s.display_name,
                            lat: s.lat,
                            lon: s.lon,
                            source: 'api'
                        }));
                    }
                } catch (e) { console.warn("API Error", e); }
            }

            const combined = [...formattedLocal, ...formattedApi].filter((v,i,a)=>a.findIndex(v2=>(v2.name===v.name))===i);
            
            setSuggestions(combined);
            setNoResults(combined.length === 0);

        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, showDropdown]);

  const handleSelect = (school) => {
      setValue(name, school.name, { shouldValidate: true }); // Validate on selection
      if (school.address) setValue('schoolAddress', school.address);
      if (school.lat && school.lon) setValue('locationPin', { lat: parseFloat(school.lat), lng: parseFloat(school.lon) });
      
      setShowDropdown(false);
  };

  return (
    <div className={styles.inputGroup} ref={wrapperRef}>
      <label htmlFor={name} className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      <div className={autoStyles.inputWrapper}>
        <input
            id={name}
            name={fieldName}
            ref={ref}
            type="text"
            placeholder={placeholder}
            className={`${styles.input} ${errors[name] ? styles.errorInput : ''}`}
            autoComplete="off"
            onBlur={onBlur}
            onChange={(e) => {
                onChange(e);
                setShowDropdown(true);
            }}
            onFocus={() => {
                if(inputValue) setShowDropdown(true);
            }}
        />
        <Search className={autoStyles.searchIcon} size={18} />
      
        {showDropdown && (
            <div className={autoStyles.dropdown}>
                {isLoading && <div className={autoStyles.loading}>Searching...</div>}
                
                {!isLoading && suggestions.length > 0 && (
                    <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                        {suggestions.map((school, index) => (
                            <li key={index} onClick={() => handleSelect(school)} className={autoStyles.item}>
                                <div className={autoStyles.schoolName}>{school.name}</div>
                                <div className={autoStyles.schoolAddress}>{school.address}</div>
                                {school.source === 'local' && <span style={{fontSize: '0.7em', color: 'green', fontWeight:'bold'}}>✓ Verified List</span>}
                            </li>
                        ))}
                    </ul>
                )}

                {!isLoading && noResults && (
                    <div className={autoStyles.loading}>No suggestions found. You can continue typing.</div>
                )}
            </div>
        )}
      </div>

      {errors[name] && <span className={styles.errorMessage}>{errors[name].message}</span>}
    </div>
  );
};

export default SchoolAutocomplete;
