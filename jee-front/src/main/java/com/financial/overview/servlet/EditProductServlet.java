package com.financial.overview.servlet;

import com.financial.overview.model.Product;
import com.financial.overview.service.MockDataService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/edit-product")
public class EditProductServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        int id = parseInt(req.getParameter("id"), 1);
        req.setAttribute("product", MockDataService.getProduct(id));
        render(req, resp, "edit-product.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        int id = parseInt(req.getParameter("id"), 1);
        Product existing = MockDataService.getProduct(id);
        if (existing != null) {
            existing.setName(req.getParameter("name"));
            existing.setDescription(req.getParameter("description"));
            existing.setPrice(parseDouble(req.getParameter("price"), existing.getPrice()));
            existing.setStock(parseInt(req.getParameter("stock"), existing.getStock()));
            MockDataService.updateProduct(existing);
        }
        resp.sendRedirect(req.getContextPath() + "/test");
    }

    private int parseInt(String value, int fallback) {
        try { return Integer.parseInt(value); } catch (Exception e) { return fallback; }
    }

    private double parseDouble(String value, double fallback) {
        try { return Double.parseDouble(value); } catch (Exception e) { return fallback; }
    }
}
