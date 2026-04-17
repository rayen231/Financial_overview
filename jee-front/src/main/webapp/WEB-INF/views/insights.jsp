<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!DOCTYPE html>
<html>
<head>
    <title>Insights Chat</title>
    <meta charset="UTF-8">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<jsp:include page="header.jsp"/>
<div class="container">
    <h2 class="mb-3">Chat</h2>
    <c:if test="${not empty errorMessage}">
        <div class="alert alert-warning">${errorMessage}</div>
    </c:if>
    <div class="border rounded p-3 mb-3" style="height: 350px; overflow-y: auto;">
        <c:forEach var="msg" items="${chatMessages}">
            <div class="mb-2 text-${msg.role == 'user' ? 'end' : 'start'}">
                <span class="badge bg-${msg.role == 'user' ? 'primary' : 'secondary'}">${msg.role}</span>
                <div>${msg.text}</div>
                <small class="text-muted">${msg.time}</small>
            </div>
        </c:forEach>
    </div>

    <form method="post" enctype="multipart/form-data" action="${pageContext.request.contextPath}/insights">
        <div class="mb-3">
            <input class="form-control" type="text" name="userQuery" placeholder="Type your message here"/>
        </div>
        <div class="mb-3">
            <input class="form-control" type="file" name="file"/>
        </div>
        <button class="btn btn-primary" type="submit">Send</button>
    </form>
</div>
<jsp:include page="footer.jsp"/>
</body>
</html>
