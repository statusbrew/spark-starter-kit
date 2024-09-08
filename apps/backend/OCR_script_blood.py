import pytesseract 
import sys
import re 
from PIL import Image
import json
import os
def readreport(img_path):
    if os.path.isdir(img_path):
        raise ValueError(f"Provided path is a directory: {img_path}")
    img=Image.open(img_path)
    text=pytesseract.image_to_string(img)
    hemoglobin_match = re.search(r'Hemoglobin\s+([\d.]+)', text, re.IGNORECASE)
    hemoglobin = float(hemoglobin_match.group(1).strip()) if hemoglobin_match else None

    # Packed Cell Volume (PCV)
    pcv_match = re.search(r'Packed\s*Cell\s*Volume\s*\(PCV\)\s+([\d.]+)', text, re.IGNORECASE)
    pcv = float(pcv_match.group(1).strip()) if pcv_match else None

    # RBC Count
    rbc_match = re.search(r'RBC\s*Count\s+([\d.]+)', text, re.IGNORECASE)
    rbc = float(rbc_match.group(1).strip()) if rbc_match else None

    # MCV
    mcv_match = re.search(r'MCV\s+([\d.]+)', text, re.IGNORECASE)
    mcv = float(mcv_match.group(1).strip()) if mcv_match else None

    # Red Cell Distribution Width (RDW)
    rdw_match = re.search(r'Red\s*Cell\s*Distribution\s*Width\s+\(RDW\)\s+([\d.]+)', text, re.IGNORECASE)
    rdw = float(rdw_match.group(1).strip()) if rdw_match else None

    # Total Leukocyte Count (TLC)
    tlc_match = re.search(r'Total\s*Leukocyte\s*Count\s*\(TLC\)\s+([\d.]+)', text, re.IGNORECASE)
    tlc = float(tlc_match.group(1).strip()) if tlc_match else None

    # Lymphocytes (differential)
    lymphodiff_match = re.search(r'Lymphocytes\s+([\d.]+)\s*%', text, re.IGNORECASE)
    lymphodiff = float(lymphodiff_match.group(1).strip()) if lymphodiff_match else None

    # Absolute Lymphocytes
    abs_lymphocytes_match = re.search(r'Lymphocytes\s+([\d.]+)\s*thou/mm3', text, re.IGNORECASE)
    abs_lymphocytes = float(abs_lymphocytes_match.group(1).strip()) if abs_lymphocytes_match else None
    date_match = re.search(r'(\d{2}/\d{1,2}/\d{4})', text)
    date = date_match.group(1) if date_match else None

    extracted_data = {
        "hemoglobin": hemoglobin,
        "packedCellVolume": pcv,
        "rbcCount": rbc,
        "mcv": mcv,
        "lymphocytesDiff": lymphodiff,
        "lymphocytes": abs_lymphocytes,
        "date":date
    }
    return extracted_data
if __name__ == "__main__":
    img_path = sys.argv[1]
    extracted_data = readreport(img_path)
    print(json.dumps(extracted_data))
