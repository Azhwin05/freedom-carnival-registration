import React from 'react';
import { useFormContext } from 'react-hook-form';
import { School, User, Users, Truck, CheckCircle } from 'lucide-react';
import styles from './Review.module.css';

const SectionCard = ({ title, icon: Icon, data }) => {
    // Filter out empty values for cleaner display
    const entries = Object.entries(data).filter(([_, v]) => v !== null && v !== undefined && v !== '');
    
    if (entries.length === 0) return null;

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}><Icon size={20} /></div>
                <h3>{title}</h3>
            </div>
            <div className={styles.grid}>
                {entries.map(([key, value]) => (
                    <div key={key} className={styles.item}>
                        <span className={styles.label}>{key}</span>
                        <span className={styles.value}>{value.toString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Review = () => {
    const { getValues } = useFormContext();
    const values = getValues();

    return (
        <div className={styles.reviewContainer}>
            <p className={styles.introText}>Please verify your details below.</p>

            <SectionCard 
                title="School Information" 
                icon={School}
                data={{
                    "Institution Name": values.schoolName,
                    "Address": values.schoolAddress,
                    "Pickup Location": values.pickupLocationUrl || "Not provided"
                }}
            />

            <SectionCard 
                title="Contact Details" 
                icon={User}
                data={{
                    "Contact Person": values.contactName,
                    "Primary Number": values.contactNumber,
                    "Alternate Number": values.alternateNumber || "N/A",
                    "Email Address": values.email,
                    "Emergency Contact": values.emergencyContact
                }}
            />

            <SectionCard 
                title="Demographics" 
                icon={Users}
                data={{
                    "Number of Students": values.studentCount,
                    "Number of Staff": values.staffCount,
                    "Age Group": values.ageGroup,
                    "Special Needs Category": values.specialNeedsType,
                    "Specific Requirements": values.specificRequirements || "None"
                }}
            />

            <SectionCard 
                title="Logistics & Support" 
                icon={Truck}
                data={{
                    "Infrastructure": values.infrastructureDetails,
                    "Transport Needed?": values.transportNeeded,
                    "Food Required?": values.foodRequired,
                    "Additional Support": values.additionalSupport || "None"
                }}
            />
        </div>
    );
};

export default Review;
