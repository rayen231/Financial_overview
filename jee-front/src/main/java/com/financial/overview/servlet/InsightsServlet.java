package com.financial.overview.servlet;

import com.financial.overview.service.BackendApiService;
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
    private static final long MAX_UPLOAD_BYTES = 5L * 1024L * 1024L;
    private final BackendApiService backendApiService = new BackendApiService();

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
        String query = Optional.ofNullable(req.getParameter("userQuery")).orElse("").trim();
        int userId = resolveUserId(req);

        Part filePart = null;
        try { filePart = req.getPart("file"); } catch (Exception ignored) {}

        String pictureDescription = "";
        try {
            if (filePart != null && filePart.getSize() > 0) {
                if (filePart.getSize() > MAX_UPLOAD_BYTES) {
                    req.setAttribute("errorMessage", "Uploaded file is too large. Maximum size is 5MB.");
                } else {
                    pictureDescription = backendApiService.uploadImage(
                            filePart.getInputStream().readAllBytes(),
                            filePart.getSubmittedFileName(),
                            filePart.getContentType()
                    );
                }
            }

            if (!query.isBlank()) {
                messages.add(message("user", query));
                messages.add(message("bot", backendApiService.chat(query, userId, pictureDescription)));
            } else if (!pictureDescription.isBlank()) {
                messages.add(message("bot", pictureDescription));
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            req.setAttribute("errorMessage", "Chat service request was interrupted.");
        } catch (Exception e) {
            req.setAttribute("errorMessage", "Unable to reach chatbot backend service.");
        }

        req.setAttribute("chatMessages", messages);
        render(req, resp, "insights.jsp");
    }

    private int resolveUserId(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) {
            return 1;
        }
        Object value = session.getAttribute("userId");
        if (value instanceof Number number) {
            return number.intValue();
        }
        if (value instanceof String text) {
            try {
                return Integer.parseInt(text);
            } catch (NumberFormatException ignored) {}
        }
        return 1;
    }

    private Map<String, String> message(String role, String text) {
        Map<String, String> map = new HashMap<>();
        map.put("role", role);
        map.put("text", text);
        map.put("time", LocalTime.now().withNano(0).toString());
        return map;
    }
}
