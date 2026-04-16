package com.financial.overview.model;

public class NewsItem {
    private final String title;
    private final String description;
    private final String url;
    private final String urlToImage;
    private final String publishedAt;

    public NewsItem(String title, String description, String url, String urlToImage, String publishedAt) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.urlToImage = urlToImage;
        this.publishedAt = publishedAt;
    }

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getUrl() { return url; }
    public String getUrlToImage() { return urlToImage; }
    public String getPublishedAt() { return publishedAt; }
}
