import sys
from tensorflow.keras.models import load_model
import cv2
import numpy as np 
import json
import os
import logging
import warnings
warnings.filterwarnings('ignore', category=UserWarning)
script_dir = os.path.dirname(os.path.realpath(__file__))
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
logging.getLogger('absl').setLevel(logging.ERROR)
model_path = os.path.join(script_dir,'Brest_CNN_2.h5')
model=load_model(model_path)

def prediction(img_path):
    img= cv2.imread(img_path,cv2.IMREAD_COLOR)
    img_height,img_width,_=img.shape
    for x in range(0,img_height,50):
        for y in range(0,img_width,50):
            patch=img[x:x+50,y:y+50]
            if patch.shape[0]!=50 or patch.shape[1]!=50:
                patch=cv2.resize(patch,(50,50),interpolation=cv2.INTER_LINEAR)
            array=np.expand_dims(np.array(patch),axis=0)
            pred=model.predict(array,verbose=0)[0].argmax()
            if pred==1:
                return 1
    return 0

if __name__=='__main__':
    img=sys.argv[1]
    cancer=prediction(img)
    print(cancer)