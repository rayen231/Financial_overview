<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Edit Product</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<jsp:include page="header.jsp"/>
<div class="container mt-3">
    <h2>Edit Product</h2>
    <form method="post" action="${pageContext.request.contextPath}/edit-product">
        <input type="hidden" name="id" value="${product.id}"/>
        <div class="mb-3"><label class="form-label">Name</label><input class="form-control" name="name" value="${product.name}" required/></div>
        <div class="mb-3"><label class="form-label">Description</label><input class="form-control" name="description" value="${product.description}" required/></div>
        <div class="mb-3"><label class="form-label">Price</label><input class="form-control" name="price" type="number" step="0.01" value="${product.price}" required/></div>
        <div class="mb-3"><label class="form-label">Stock</label><input class="form-control" name="stock" type="number" value="${product.stock}" required/></div>
        <button type="submit" class="btn btn-primary">Save Changes</button>
    </form>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>
