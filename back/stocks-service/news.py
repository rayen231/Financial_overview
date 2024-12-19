import httpx
from typing import List
from fastapi import HTTPException
import os
def config():
    NEWS_API_KEY =os.getenv("NEWS_API_KEY") # Replace with your News API key
    NEWS_API_URL = "https://newsapi.org/v2/everything"
    return NEWS_API_KEY,NEWS_API_URL

# Function to fetch stock-specific news
def fetch_stock_news(stock_symbol: str) -> List[dict]:
    NEWS_API_KEY,NEWS_API_URL=config()
    query_params = {
        'q': stock_symbol,  # The stock symbol, e.g., 'AAPL' for Apple
        'apiKey': NEWS_API_KEY,
        'language': 'en',
        'pageSize': 9  # Limit to 5 latest articles
    }
    response = httpx.get(NEWS_API_URL, params=query_params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch news")
    
    try:
        news_data = response.json()
        print(news_data)
        # Filter out articles with '[Removed]' data
        articles = [article for article in news_data.get('articles', []) if '[Removed]' not in article['title']]
        return articles
    except ValueError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse response: {str(e)}")


# Function to fetch general stock news
def fetch_general_stock_news() -> List[dict]:
    NEWS_API_KEY,NEWS_API_URL=config()
    query_params = {
        'q': 'stocks',
        'apiKey': NEWS_API_KEY,
        'language': 'en',
        'pageSize': 9  # Limit to 5 latest articles
    }
    response = httpx.get(NEWS_API_URL, params=query_params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Failed to fetch news")
    news_data = response.json()
    return news_data.get('articles', [])
#print(fetch_stock_news("META"))
#print(fetch_general_stock_news())