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
    sgot_match = re.search(r'(SGOT|AST[\s\S]*SGOT)[\s:]*([\d\.]+)', text, re.IGNORECASE)
    sgot = float(sgot_match.group(2).strip()) if sgot_match else None
    
    sgpt_match = re.search(r'(SGPT|ALT[\s\S]*SGPT)[\s:]*([\d\.]+)', text, re.IGNORECASE)
    sgpt = float(sgpt_match.group(2).strip()) if sgpt_match else None
    
    ggtp_match = re.search(r'GGTP[\s:]*([\d\.]+)', text, re.IGNORECASE)
    ggtp = float(ggtp_match.group(1).strip()) if ggtp_match else None
    
    total_protein_match = re.search(r'Total Protein[\s:]*([\d\.]+)', text, re.IGNORECASE)
    total_protein = float(total_protein_match.group(1).strip()) if total_protein_match else None
    
    albumin_match = re.search(r'Albumin[\s:]*([\d\.]+)', text, re.IGNORECASE)
    albumin = float(albumin_match.group(1).strip()) if albumin_match else None
    
    globulin_match = re.search(r'Globulin[\s:]*([\d\.]+)', text, re.IGNORECASE)
    globulin = float(globulin_match.group(1).strip()) if globulin_match else None
    
    a_g_ratio_match = re.search(r'A[\s:]*G[\s:]*Ratio[\s:]*([\d\.]+)', text, re.IGNORECASE)
    a_g_ratio = float(a_g_ratio_match.group(1).strip()) if a_g_ratio_match else None
    date_match = re.search(r'(\d{2}/\d{2}/\d{4})', text)
    date = date_match.group(1) if date_match else "Date not found"
    data={
        "SGOT":sgot,
        "SGPT":sgpt,
        "GGTP":ggtp,
        "Protein":total_protein,
        "Albumin":albumin,
        "Globulin":globulin,
        "date":date
    }
    return data
if __name__ == "__main__":
    img_path = sys.argv[1]

    extracted_data = readreport(img_path)

    # Convert extracted data to JSON string
    print(json.dumps(extracted_data))
