<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Stock Details</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<jsp:include page="header.jsp"/>
<div class="container mt-5">
    <div class="card shadow-lg rounded-4">
        <div class="card-header text-center bg-primary text-white">
            <h1 class="display-6">${details.symbol}</h1>
        </div>
        <div class="card-body">
            <h3 class="text-primary">Current Price: <span class="fs-2">$${details.currentPrice}</span></h3>
            <h4 class="mt-4">Price History (simulated)</h4>
            <ul>
                <c:forEach var="point" items="${details.priceHistory}"><li>$${point}</li></c:forEach>
            </ul>
        </div>
    </div>

    <div class="mt-5">
        <h3>Latest News</h3>
        <div class="row">
            <c:forEach var="news" items="${details.stockNews}">
                <div class="col-md-4 mb-3">
                    <a href="${news.url}" target="_blank" class="text-decoration-none text-dark">
                        <div class="card h-100">
                            <img src="${news.urlToImage}" class="card-img-top" alt="news">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text">${news.description}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </c:forEach>
        </div>
    </div>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>
