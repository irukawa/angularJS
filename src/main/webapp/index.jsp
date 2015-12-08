<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en" ng-controller="appMain">
    <head>
        <meta charset="utf-8" />
        <title>Application</title>

        <link rel="stylesheet" href="assets/css/app.css" />
        <link rel="icon" href="assets/img/favicon.png" />
    </head>
    <body>
        <div ng-cloak layout></div>

        <script type="text/javascript"
            src="bower_components/pace/pace.js"
            data-pace-options='{ "ajax": true, "restartOnRequestAfter":true }'>
        </script>
        <script type="text/javascript"
            src="bower_components/requirejs/require.js"
            data-main="app/main.js">
        </script>
    </body>
</html>
