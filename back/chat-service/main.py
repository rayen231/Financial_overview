from fastapi import FastAPI, HTTPException ,UploadFile, File
from pydantic import BaseModel
from finance_expert import chat_with_stocks
from chat_controll import controll
import requests
from vision import PictureAnalyser
from fastapi.responses import JSONResponse
from finance_expert_with_picture import chat_with_picture
from fastapi.middleware.cors import CORSMiddleware
import shutil

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#Models
class ChatRequest(BaseModel):
    query: str
    user_id: int
    PictureDescription: str

BASE_URL = "http://localhost:8000"

def get_wallet_info(user_id):
    url = f"{BASE_URL}/walet-info/{user_id}"
    try:
        response = requests.get(url)
        # Check if the request was successful
        if response.status_code == 200:
            wallet_info = response.json()
            print("Wallet Info:", wallet_info)
            return wallet_info
        elif response.status_code == 404:
            print("Error: Wallet not found")
        else:
            print(f"Error: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print("Request failed:", e)


@app.post("/chat")
def chat(request: ChatRequest):
    # Check if PictureDescription is empty
    if not request.PictureDescription:
            #get user wallet info
        portfolio_info =get_wallet_info(user_id=request.user_id)
        #get controll response
        controll_response=controll(query=request.query)
        #get chat response
        response = chat_with_stocks(portfolio_info=portfolio_info, query=request.query, market_data=controll_response["stock_symbols"])
        return {"response": response}
    else:
        #get user wallet info
        portfolio_info =get_wallet_info(user_id=request.user_id)
        #get controll response
        controll_response=controll(query=request.query)
        #get chat response
        response = chat_with_picture(portfolio_info=portfolio_info, query=request.query, market_data=controll_response["stock_symbols"],PictureDescription=request.PictureDescription)
        return {"response": response}
        

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    # Define the path to save the file as 'temp.jpg'
    file_path = "temp.jpg"
    
    # Save the file as 'temp.jpg'
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)  # More efficient file saving method

    # Analyze the picture
    analysis_result = PictureAnalyser(image_path=file_path)
    print("Analysis Result:", analysis_result)
    start_index = analysis_result.find("content=")  # Find the starting index of "conent="
    extracted_string = analysis_result[start_index:]  # Extract from "conent=" to the end

    print("extracted Analysis Result:", extracted_string)

    return {"analysis_result": extracted_string}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
