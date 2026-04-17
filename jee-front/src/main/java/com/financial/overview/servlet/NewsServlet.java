package com.financial.overview.servlet;

import com.financial.overview.service.BackendApiService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Collections;

@WebServlet("/news")
public class NewsServlet extends BaseServlet {
    private final BackendApiService backendApiService = BackendApiService.getInstance();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setAttribute("stockNews", backendApiService.getGeneralNews());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            req.setAttribute("errorMessage", "News service request was interrupted.");
            req.setAttribute("stockNews", Collections.emptyList());
        } catch (Exception e) {
            req.setAttribute("errorMessage", "Unable to fetch news from backend service.");
            req.setAttribute("stockNews", Collections.emptyList());
        }
        render(req, resp, "news.jsp");
    }
}
