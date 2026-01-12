import pandas as pd
import json
import os

excel_file = "2024 FC School  Registration (2).xlsx"
output_file = "src/data/schools.json"

if not os.path.exists(excel_file):
    print(f"Error: {excel_file} not found")
    exit(1)

try:
    df = pd.read_excel(excel_file)
    df = df.fillna('')
    
    schools = []
    for _, row in df.iterrows():
        address_parts = [
            str(row.get('Street Address', '')).strip(),
            str(row.get('City', '')).strip(),
            str(row.get('Postal / Zip Code', '')).strip()
        ]
        # Filter out empty strings
        address_parts = [p for p in address_parts if p and p.lower() != 'nan']
        full_address = ', '.join(address_parts)
        
        schools.append({
            'label': str(row.get('Name of the Institution/NGO/Trust/Person', '')).strip(),
            'value': str(row.get('Name of the Institution/NGO/Trust/Person', '')).strip(),
            'address': full_address,
            'contactName': str(row.get('Contact Person', '')).strip(),
            'contactNumber': str(row.get('Contact Number', '')).strip(),
            'email': str(row.get('Email', '')).strip()
        })
        
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(schools, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully wrote {len(schools)} schools to {output_file}")

except Exception as e:
    print(f"Error processing excel: {e}")
