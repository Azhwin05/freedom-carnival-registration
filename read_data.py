import pandas as pd
try:
    df = pd.read_excel("2024 FC School  Registration (2).xlsx")
    with open("excel_output.txt", "w", encoding="utf-8") as f:
        f.write("COLUMNS:\n")
        for col in df.columns:
            f.write(f"- {col}\n")
        f.write("\nSAMPLE DATA (First 3 rows):\n")
        f.write(df.head(3).to_string())
        f.write(f"\n\nTotal Rows: {len(df)}")
except Exception as e:
    print(f"Error: {e}")
