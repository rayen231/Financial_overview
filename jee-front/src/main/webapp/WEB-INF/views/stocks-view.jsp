<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Stocks</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<jsp:include page="header.jsp"/>
<div class="container">
    <h1 class="text-center">Search for Stock</h1>
    <form method="get" action="${pageContext.request.contextPath}/stocks-view" class="mb-4">
        <input type="text" name="q" value="${query}" class="form-control" placeholder="Enter stock symbol"/>
        <button class="btn btn-primary mt-2" type="submit">Search</button>
    </form>

    <c:if test="${not empty query and stock == null}"><div class="alert alert-danger">Stock not found.</div></c:if>

    <c:if test="${stock != null}">
        <div class="card mb-4">
            <div class="card-body">
                <h3>${stock.name} (${stock.symbol})</h3>
                <p><strong>Price:</strong> $${stock.price}</p>
                <p class="${stock.change >= 0 ? 'text-success' : 'text-danger'}"><strong>Change:</strong> ${stock.change}%</p>
                <a href="${pageContext.request.contextPath}/stock-details?symbol=${stock.symbol}" class="btn btn-outline-primary">Open details</a>
            </div>
        </div>
    </c:if>

    <h2 class="text-center">Famous Stocks</h2>
    <div class="row">
        <c:forEach var="famousStock" items="${famousStocks}">
            <div class="col-md-4 mb-3">
                <a class="text-decoration-none" href="${pageContext.request.contextPath}/stock-details?symbol=${famousStock.symbol}">
                    <div class="card"><div class="card-body">
                        <h5>${famousStock.name} (${famousStock.symbol})</h5>
                        <p><strong>Price:</strong> $${famousStock.price}</p>
                        <p class="${famousStock.change >= 0 ? 'text-success' : 'text-danger'}"><strong>Change:</strong> ${famousStock.change}%</p>
                    </div></div>
                </a>
            </div>
        </c:forEach>
    </div>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>
