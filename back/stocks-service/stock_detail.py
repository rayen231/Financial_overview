from yahoo_fin import stock_info
import pandas as pd
from datetime import datetime, timedelta
import json

def get_stock_details(symbol: str):
    # Fetch current stock price
    price = stock_info.get_live_price(symbol)
    print(f"Current price for {symbol}: {price}")

    # Get the date for 1 year ago
    one_year_ago = (datetime.now() - timedelta(days=365)).date()
    one_year_ago = str(one_year_ago)

    # Fetch historical data for 1 year (daily data)
    history = stock_info.get_data(symbol, start_date=one_year_ago, interval="1d")
    
    # Check if we got any data
    if history is not None and not history.empty:
        # Convert DataFrame to dictionary
        price_history = history.to_dict('records')
        return price, price_history
    else:
        return(f"No historical data found for {symbol}")
    

# Test the function with MSFT (Microsoft)
symbol = "MSFT"
get_stock_details(symbol)
