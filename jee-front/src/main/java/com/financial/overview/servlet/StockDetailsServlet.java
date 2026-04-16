package com.financial.overview.servlet;

import com.financial.overview.service.MockDataService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/stock-details")
public class StockDetailsServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String symbol = req.getParameter("symbol");
        req.setAttribute("details", MockDataService.getStockDetails(symbol));
        render(req, resp, "stock-details.jsp");
    }
}
