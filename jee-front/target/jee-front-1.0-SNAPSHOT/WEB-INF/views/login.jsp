<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow">
                <div class="card-body">
                    <div class="text-center mb-3">
                        <img src="${pageContext.request.contextPath}/assets/company.jpg" alt="Company" style="width:120px;"/>
                    </div>
                    <h3 class="text-center text-primary mb-4">Login</h3>
                    <form method="post" action="${pageContext.request.contextPath}/login">
                        <div class="mb-3">
                            <label for="name" class="form-label">Username</label>
                            <input id="name" name="name" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input id="password" name="password" type="password" class="form-control" required>
                        </div>
                        <% if (request.getAttribute("errorMessage") != null) { %>
                            <div class="alert alert-danger"><%= request.getAttribute("errorMessage") %></div>
                        <% } %>
                        <button class="btn btn-primary w-100" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
