package com.financial.overview.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.financial.overview.model.NewsItem;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class BackendApiService {
    private static final String DEFAULT_STOCK_API_BASE_URL = "http://127.0.0.1:8000";
    private static final String DEFAULT_CHAT_API_BASE_URL = "http://127.0.0.1:8081";

    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private final String stockApiBaseUrl;
    private final String chatApiBaseUrl;

    public BackendApiService() {
        this.httpClient = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build();
        this.objectMapper = new ObjectMapper();
        this.stockApiBaseUrl = resolveUrl("stock.api.base-url", "STOCK_API_BASE_URL", DEFAULT_STOCK_API_BASE_URL);
        this.chatApiBaseUrl = resolveUrl("chat.api.base-url", "CHAT_API_BASE_URL", DEFAULT_CHAT_API_BASE_URL);
    }

    public List<NewsItem> getGeneralNews() throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(stockApiBaseUrl + "/general-stock-news"))
                .timeout(Duration.ofSeconds(10))
                .GET()
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IOException("News API returned status " + response.statusCode());
        }

        JsonNode root = objectMapper.readTree(response.body());
        List<NewsItem> news = new ArrayList<>();
        if (root.isArray()) {
            for (JsonNode node : root) {
                news.add(new NewsItem(
                        text(node, "title"),
                        text(node, "description"),
                        text(node, "url"),
                        text(node, "urlToImage"),
                        text(node, "publishedAt")
                ));
            }
        }
        return news;
    }

    public String chat(String query, int userId, String pictureDescription) throws IOException, InterruptedException {
        JsonNode payload = objectMapper.createObjectNode()
                .put("query", query)
                .put("user_id", userId)
                .put("PictureDescription", pictureDescription == null ? "" : pictureDescription);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(chatApiBaseUrl + "/chat"))
                .timeout(Duration.ofSeconds(60))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(objectMapper.writeValueAsString(payload)))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IOException("Chat API returned status " + response.statusCode());
        }

        JsonNode root = objectMapper.readTree(response.body());
        String reply = text(root, "response");
        return reply.isBlank() ? "No response returned by chat service." : reply;
    }

    public String uploadImage(byte[] fileContent, String fileName, String contentType) throws IOException, InterruptedException {
        String boundary = "----JavaBoundary" + UUID.randomUUID();
        byte[] requestBody = buildMultipartBody(boundary, fileContent, fileName, contentType);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(chatApiBaseUrl + "/upload/"))
                .timeout(Duration.ofSeconds(60))
                .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                .POST(HttpRequest.BodyPublishers.ofByteArray(requestBody))
                .build();

        HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() < 200 || response.statusCode() >= 300) {
            throw new IOException("Upload API returned status " + response.statusCode());
        }

        JsonNode root = objectMapper.readTree(response.body());
        return text(root, "analysis_result");
    }

    private static String resolveUrl(String systemProperty, String envVar, String defaultValue) {
        String systemValue = System.getProperty(systemProperty);
        if (systemValue != null && !systemValue.isBlank()) {
            return systemValue;
        }
        String envValue = System.getenv(envVar);
        if (envValue != null && !envValue.isBlank()) {
            return envValue;
        }
        return defaultValue;
    }

    private static String text(JsonNode node, String key) {
        JsonNode value = node.get(key);
        return value == null || value.isNull() ? "" : value.asText("");
    }

    private static byte[] buildMultipartBody(String boundary, byte[] fileContent, String fileName, String contentType) throws IOException {
        String normalizedType = (contentType == null || contentType.isBlank()) ? "application/octet-stream" : contentType;
        String normalizedName = (fileName == null || fileName.isBlank()) ? "upload.bin" : fileName;

        ByteArrayOutputStream output = new ByteArrayOutputStream();
        output.write(("--" + boundary + "\r\n").getBytes(StandardCharsets.UTF_8));
        output.write(("Content-Disposition: form-data; name=\"file\"; filename=\"" + normalizedName + "\"\r\n").getBytes(StandardCharsets.UTF_8));
        output.write(("Content-Type: " + normalizedType + "\r\n\r\n").getBytes(StandardCharsets.UTF_8));
        output.write(fileContent);
        output.write("\r\n".getBytes(StandardCharsets.UTF_8));
        output.write(("--" + boundary + "--\r\n").getBytes(StandardCharsets.UTF_8));
        return output.toByteArray();
    }
}
