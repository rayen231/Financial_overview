package com.financial.overview.model;

import java.util.List;

public class StockDetails {
    private final String symbol;
    private final double currentPrice;
    private final List<Double> priceHistory;
    private final List<NewsItem> stockNews;

    public StockDetails(String symbol, double currentPrice, List<Double> priceHistory, List<NewsItem> stockNews) {
        this.symbol = symbol;
        this.currentPrice = currentPrice;
        this.priceHistory = priceHistory;
        this.stockNews = stockNews;
    }

    public String getSymbol() { return symbol; }
    public double getCurrentPrice() { return currentPrice; }
    public List<Double> getPriceHistory() { return priceHistory; }
    public List<NewsItem> getStockNews() { return stockNews; }
}
