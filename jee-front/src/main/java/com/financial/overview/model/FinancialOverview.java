package com.financial.overview.model;

public class FinancialOverview {
    private final double totalRevenue;
    private final double netProfit;
    private final double expenses;
    private final double savings;

    public FinancialOverview(double totalRevenue, double netProfit, double expenses, double savings) {
        this.totalRevenue = totalRevenue;
        this.netProfit = netProfit;
        this.expenses = expenses;
        this.savings = savings;
    }

    public double getTotalRevenue() { return totalRevenue; }
    public double getNetProfit() { return netProfit; }
    public double getExpenses() { return expenses; }
    public double getSavings() { return savings; }
}
