package com.financial.overview.servlet;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;

@WebServlet("/login")
public class LoginServlet extends BaseServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        render(req, resp, "login.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        String username = req.getParameter("name");
        String password = req.getParameter("password");

        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            req.setAttribute("errorMessage", "Username and password are required.");
            render(req, resp, "login.jsp");
            return;
        }

        HttpSession session = req.getSession(true);
        session.setAttribute("userId", 1);
        session.setAttribute("userName", username);
        resp.sendRedirect(req.getContextPath() + "/dashboard");
    }
}
