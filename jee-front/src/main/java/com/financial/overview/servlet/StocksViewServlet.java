package com.financial.overview.servlet;

import com.financial.overview.service.MockDataService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/stocks-view")
public class StocksViewServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String query = req.getParameter("q");
        req.setAttribute("query", query == null ? "" : query);
        req.setAttribute("stock", MockDataService.findStock(query));
        req.setAttribute("famousStocks", MockDataService.getStocks());
        render(req, resp, "stocks-view.jsp");
    }
}
