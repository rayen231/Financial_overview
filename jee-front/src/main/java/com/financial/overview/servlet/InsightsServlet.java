package com.financial.overview.servlet;

import com.financial.overview.service.MockDataService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.time.LocalTime;
import java.util.*;

@WebServlet("/insights")
@MultipartConfig
public class InsightsServlet extends BaseServlet {
    @SuppressWarnings("unchecked")
    private List<Map<String, String>> history(HttpServletRequest req) {
        HttpSession session = req.getSession(true);
        Object value = session.getAttribute("chatMessages");
        if (value instanceof List<?>) {
            return (List<Map<String, String>>) value;
        }
        List<Map<String, String>> history = new ArrayList<>();
        session.setAttribute("chatMessages", history);
        return history;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setAttribute("chatMessages", history(req));
        render(req, resp, "insights.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<Map<String, String>> messages = history(req);
        String query = req.getParameter("userQuery");

        Part filePart = null;
        try { filePart = req.getPart("file"); } catch (Exception ignored) {}

        if (query != null && !query.isBlank()) {
            messages.add(message("user", query));
            messages.add(message("bot", MockDataService.chat(query)));
        }

        if (filePart != null && filePart.getSize() > 0) {
            messages.add(message("bot", "[Simulated upload] File received: " + filePart.getSubmittedFileName()));
        }

        req.setAttribute("chatMessages", messages);
        render(req, resp, "insights.jsp");
    }

    private Map<String, String> message(String role, String text) {
        Map<String, String> map = new HashMap<>();
        map.put("role", role);
        map.put("text", text);
        map.put("time", LocalTime.now().withNano(0).toString());
        return map;
    }
}
