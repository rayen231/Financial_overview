package com.financial.overview.model;

public class Stock {
    private final String symbol;
    private final String name;
    private final double price;
    private final double change;

    public Stock(String symbol, String name, double price, double change) {
        this.symbol = symbol;
        this.name = name;
        this.price = price;
        this.change = change;
    }

    public String getSymbol() { return symbol; }
    public String getName() { return name; }
    public double getPrice() { return price; }
    public double getChange() { return change; }
}
