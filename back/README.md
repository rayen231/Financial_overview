# Backend Setup Instructions

## Prerequisites
- Python 3.8 or higher
- `pip` (Python package installer)
- `virtualenv` (optional but recommended for managing dependencies)

## Steps to Run the Backend

### 1. Navigate to the Backend Directory
```bash
cd back
```

### 2. Install Dependencies
It is recommended to use a virtual environment to isolate your dependencies:
```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```
Then, install the required packages:
```bash
pip install -r requirements.txt
```

### 3. Set Up Environment Variables
Create an `.env` file in the `back` directory and add your API keys and other required configurations. Below is an example structure for the `.env` file:
```
# Example .env file
API_KEY_YAHOO=your_yahoo_api_key
API_KEY_GOOGLE=your_google_api_key
LLAMA_MODEL_PATH=/path/to/llama3/model
DATABASE_URL=your_database_url
```

### 4. Run Each Microservice
Each microservice contains a `main.py` file. To start a service, navigate to its directory and run the `main.py` file:

#### Example Commands:
1. For the **Stock Service**:
   ```bash
   python services/stock_service/main.py
   ```

2. For the **Financial Expert Chat Service**:
   ```bash
   python services/financial_chat_service/main.py
   ```

4. For the **News Fetching Service**:
   ```bash
   python services/news_service/main.py
   ```

### 5. Verify the Services
Once all the services are running, you can use tools like Postman, Curl, or your frontend application to interact with the backend.

Each microservice will expose its API endpoint. Check the logs for the service to find the exact port and URL.

---

Feel free to reach out if you face any issues during the setup!
