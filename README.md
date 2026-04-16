# 🏦 Financial Insights Platform  

A cutting-edge **AI-powered financial insights platform** designed to empower users with in-depth analysis and personalized recommendations. This project combines the power of **Angular**, **FastAPI**, and state-of-the-art AI technologies to deliver actionable insights into stock markets, financial news, and personalized portfolio management.

---

## 🌐 **Frontend**  
The frontend is developed with **Angular**, providing an intuitive and dynamic user interface. It features:  
- **Interactive dashboards** for stock analysis and news visualization.  
- **Real-time updates** on market trends and portfolio performance.  
- **Chatbot interface** for seamless interaction with the Financial Expert AI.  

---

## 🖥️ **Backend**  

### **Microservices Architecture**  
The backend is powered by **FastAPI** and designed with a microservices approach for modularity and scalability. Key components include:  

#### **Financial Expert Chatbot**  
- **LangChain**: Enhances reasoning and ensures context-aware responses.  
- **CrewAI**: Manages task delegation and ensures robust multi-agent coordination for query processing.  
- **Yahoo News & Google Search API**: Fetches the latest market news and updates for real-time insights.  
- **LLAMA 3**:  
  - Handles natural language processing for accurate and conversational responses.  
  - Acts as an **OCR engine**, capable of extracting insights from financial reports, charts, and images.  

---

## 📊 **Features**  

### **1. Financial Expert AI**  
- **Stock Insights**: Analyze stock trends and market performance.  
- **News-Based Recommendations**: Combines real-time news analysis with historical data to provide actionable advice.  
- **Portfolio Optimization**: Offers suggestions tailored to user preferences and risk tolerance.  

### **2. OCR & Image Processing**  
- Extracts data from scanned documents, charts, and financial statements using **LLAMA 3**.  

### **3. Intelligent Query Analysis**  
- **Observer Chatbot**: Identifies user intent and extracts stock symbols and news relevance using **CrewAI**.  
- Outputs structured JSON responses for better query handling.  

---

## 🚀 **How It Works**  

1. **Frontend**: Users interact with a clean, responsive UI built with Angular.  
2. **Backend Microservices**: Each service handles a specific task, ensuring high performance and scalability.  
3. **AI Models**: LLMs like **LLAMA 3** process natural language queries, while APIs fetch and synthesize real-world data.  

---

## 🛠️ **Technologies Used**  
- **Frontend**: Angular (Latest version), Bootstrap.  
- **Backend**: FastAPI, Python.  
- **APIs**: Yahoo News, groq key , alphavantage.  
- **AI Models**: LangChain, CrewAI, LLAMA 3.  

---

## 🌟 **Future Enhancements**  
- **User Customization**: Advanced user settings for personalized recommendations.  
- **Extended OCR Capabilities**: Enhanced document analysis for legal and tax-related insights.  
- **Predictive Models**: Incorporating machine learning to forecast stock trends.  

---

## 📂 **Getting Started**  

1. Clone the repository.  
   ```bash
   git clone https://github.com/rayen231/Financial_insights.git
   ```
2. Navigate to the project directory and follow the setup instructions for both frontend and backend services.
3. Run the platform locally or deploy it to the cloud for production.  

---

## ☕ **JEE Frontend (JSP/Servlet - Tomcat 10.1)**  

A new Maven web module is available under `jee-front/` to mirror the Angular frontend using JSP + Servlet architecture while keeping AI/business logic isolated for external Python services.

### Build
```bash
cd jee-front
mvn clean package
```

### Run on Tomcat 10.1
1. Import `jee-front` as a Maven project in IntelliJ.
2. Configure a Tomcat 10.1 run configuration.
3. Deploy `jee-front/target/jee-front-1.0-SNAPSHOT.war`.
4. Open:
   - `http://localhost:8080/jee-front/login`

---

Contributions are welcome! Feel free to open an issue or submit a pull request. Let’s build the future of financial insights together! 💡
