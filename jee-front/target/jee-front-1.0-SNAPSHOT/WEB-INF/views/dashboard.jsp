<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<jsp:include page="header.jsp"/>
<div class="container my-4">
    <h2>Financial Overview</h2>
    <div class="row">
        <div class="col-md-3"><div class="card text-white bg-primary mb-3"><div class="card-body"><h5>Total Revenue</h5><p>$${financialOverview.totalRevenue}</p></div></div></div>
        <div class="col-md-3"><div class="card text-white bg-success mb-3"><div class="card-body"><h5>Net Profit</h5><p>$${financialOverview.netProfit}</p></div></div></div>
        <div class="col-md-3"><div class="card text-white bg-danger mb-3"><div class="card-body"><h5>Expenses</h5><p>$${financialOverview.expenses}</p></div></div></div>
        <div class="col-md-3"><div class="card text-white bg-warning mb-3"><div class="card-body"><h5>Savings</h5><p>$${financialOverview.savings}</p></div></div></div>
    </div>
</div>
<div class="container my-4">
    <h2>Stocks</h2>
    <div class="row">
        <c:forEach var="stock" items="${stocks}">
            <div class="col-md-4">
                <a class="text-decoration-none" href="${pageContext.request.contextPath}/stock-details?symbol=${stock.symbol}">
                    <div class="card mb-3"><div class="card-body">
                        <h5>${stock.name} (${stock.symbol})</h5>
                        <p>Price: $${stock.price}</p>
                        <p class="${stock.change >= 0 ? 'text-success' : 'text-danger'}">Change: ${stock.change}%</p>
                    </div></div>
                </a>
            </div>
        </c:forEach>
    </div>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>
