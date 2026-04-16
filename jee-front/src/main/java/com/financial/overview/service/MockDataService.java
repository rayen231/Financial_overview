package com.financial.overview.service;

import com.financial.overview.model.*;

import java.util.*;

public final class MockDataService {
    private static final List<Stock> STOCKS = List.of(
            new Stock("AAPL", "Apple Inc.", 192.43, 1.5),
            new Stock("MSFT", "Microsoft", 417.22, -0.4),
            new Stock("GOOGL", "Alphabet", 164.93, 0.8),
            new Stock("AMZN", "Amazon", 182.10, 1.1),
            new Stock("TSLA", "Tesla", 174.90, -2.0)
    );

    private static final List<NewsItem> NEWS = List.of(
            new NewsItem("Markets open higher", "Tech stocks lead gains.", "https://example.com/news/1", "https://picsum.photos/800/400?1", "2026-04-16"),
            new NewsItem("AI in finance rises", "Firms scale AI workflows.", "https://example.com/news/2", "https://picsum.photos/800/400?2", "2026-04-15"),
            new NewsItem("Fed watch", "Investors await policy signals.", "https://example.com/news/3", "https://picsum.photos/800/400?3", "2026-04-14")
    );

    private static final Map<Integer, Product> PRODUCTS = new LinkedHashMap<>();

    static {
        PRODUCTS.put(1, new Product(1, "Premium Data Feed", "Realtime price package", 99.0, 50));
        PRODUCTS.put(2, new Product(2, "Insights Bundle", "AI driven recommendations", 149.0, 20));
        PRODUCTS.put(3, new Product(3, "Starter Plan", "Entry level plan", 19.0, 200));
    }

    private MockDataService() {}

    public static FinancialOverview getFinancialOverview() {
        return new FinancialOverview(120000, 48000, 52000, 20000);
    }

    public static List<Stock> getStocks() {
        return STOCKS;
    }

    public static Stock findStock(String symbol) {
        if (symbol == null) return null;
        return STOCKS.stream().filter(s -> s.getSymbol().equalsIgnoreCase(symbol)).findFirst().orElse(null);
    }

    public static List<NewsItem> getGeneralNews() {
        return NEWS;
    }

    public static StockDetails getStockDetails(String symbol) {
        Stock stock = findStock(symbol);
        String resolvedSymbol = stock != null ? stock.getSymbol() : (symbol == null ? "AAPL" : symbol.toUpperCase(Locale.ROOT));
        double currentPrice = stock != null ? stock.getPrice() : 100.0;
        return new StockDetails(
                resolvedSymbol,
                currentPrice,
                List.of(currentPrice - 4, currentPrice - 2, currentPrice - 1, currentPrice + 1, currentPrice),
                getGeneralNews()
        );
    }

    public static List<Product> getProducts() {
        return new ArrayList<>(PRODUCTS.values());
    }

    public static Product getProduct(int id) {
        return PRODUCTS.get(id);
    }

    public static void updateProduct(Product product) {
        PRODUCTS.put(product.getId(), product);
    }

    public static String chat(String query) {
        return "[Simulated external AI] Answer for: " + query;
    }
}
