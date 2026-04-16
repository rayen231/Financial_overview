<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Products</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<jsp:include page="header.jsp"/>
<div class="container">
    <h2 class="mb-3">Products (Simulation)</h2>
    <table class="table table-striped">
        <thead><tr><th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Stock</th><th></th></tr></thead>
        <tbody>
        <c:forEach var="p" items="${products}">
            <tr>
                <td>${p.id}</td><td>${p.name}</td><td>${p.description}</td><td>$${p.price}</td><td>${p.stock}</td>
                <td><a class="btn btn-sm btn-primary" href="${pageContext.request.contextPath}/edit-product?id=${p.id}">Edit</a></td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>
