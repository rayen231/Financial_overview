<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>News</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<jsp:include page="header.jsp"/>
<div class="container my-4">
    <h1 class="text-center text-primary mb-4">Latest Stock News</h1>
    <div class="row">
        <c:forEach var="newsItem" items="${stockNews}">
            <div class="col-md-4 mb-4">
                <a href="${newsItem.url}" target="_blank" class="text-decoration-none text-dark">
                    <div class="card h-100">
                        <img src="${newsItem.urlToImage}" class="card-img-top" alt="news"/>
                        <div class="card-body">
                            <h5>${newsItem.title}</h5>
                            <p>${newsItem.description}</p>
                            <small>${newsItem.publishedAt}</small>
                        </div>
                    </div>
                </a>
            </div>
        </c:forEach>
    </div>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>
