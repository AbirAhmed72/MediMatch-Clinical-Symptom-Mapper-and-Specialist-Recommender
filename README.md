## How to run Backend model

1. Run `backend/models/identify-symptoms-using-huggingface-transformer.ipynb`, it'll create a fine-tuned-model folder that will contain the model details

2. Then simply run the backend `uvicorn main:app --reload` and navigate to Sweeger UI

3. Test the `get_symptoms` api to extract symptoms from natural language.

## Resources

Doctors Image: https://drive.google.com/drive/folders/19drVDiuWjgQXLOfSosXugfibPXGQ0yVH?usp=drive_link

## TODO:

Currently we are using Huggingface Transformer to extract symptoms from text which is supervised learning method.

**Next if possible we can try to do some semi-supervised learning for achieveing better accuracy**
