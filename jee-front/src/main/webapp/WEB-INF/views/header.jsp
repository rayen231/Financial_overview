<%@ page contentType="text/html;charset=UTF-8" %>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container-fluid">
        <a class="navbar-brand" href="${pageContext.request.contextPath}/dashboard">Financial Insights</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item"><a class="nav-link" href="${pageContext.request.contextPath}/dashboard">Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="${pageContext.request.contextPath}/insights">Insights</a></li>
                <li class="nav-item"><a class="nav-link" href="${pageContext.request.contextPath}/news">News</a></li>
                <li class="nav-item"><a class="nav-link" href="${pageContext.request.contextPath}/stocks-view">Stocks</a></li>
                <li class="nav-item"><a class="nav-link" href="${pageContext.request.contextPath}/test">Products</a></li>
            </ul>
            <form method="post" action="${pageContext.request.contextPath}/logout" class="ms-auto">
                <button class="btn btn-outline-light" type="submit">Logout</button>
            </form>
        </div>
    </div>
</nav>
