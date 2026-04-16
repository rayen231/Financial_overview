package com.financial.overview.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public abstract class BaseServlet extends HttpServlet {
    protected void render(HttpServletRequest req, HttpServletResponse resp, String viewPath) throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/views/" + viewPath).forward(req, resp);
    }
}
