package com.financial.overview.servlet;

import com.financial.overview.service.MockDataService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/dashboard")
public class DashboardServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("financialOverview", MockDataService.getFinancialOverview());
        req.setAttribute("stocks", MockDataService.getStocks());
        render(req, resp, "dashboard.jsp");
    }
}
