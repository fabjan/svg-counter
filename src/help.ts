export const helpHTML = (baseURL: string) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
</head>
<body>
    <h1>SVG Counter</h1>
    <p>
       This worker manages counters and serves images presenting them. You can
       use it for a classic 90's visitor (well, page view) counter.
    </p>
    <p>
       Just create an <code>img</code> tag referencing the path
       <code>/count/$NAME</code> in this worker, where <code>$NAME</code>. is
       the key for your counter.
    </p>
    <p>
        E.g. <code>&lt;img src="https://${baseURL}/count/home" /&gt;</code>
    </p>
    <p>
        A browser getting that URL will increment the count and the response is
        an SVG showing the updated number.
    </p>
    <p>
        If you want to monitor your counters on e.g. some dashboard, you can
        use the prefix <code>/show</code> instead of <code>count</code> and you
        will just be served the image without incrementing.
    </p>
    <p>
        The image is somewhat themeable, you can choose the colors using query
        parameters "on", "off", "bg", "gaps". Use the <code>/test</code> prefix
        and include the "text" parameter to see how different numbers look
        without using a real counter.
    </p>
    <p>
        views: <img style="height: 1em" src="https://${baseURL}/count/home?on=red&bg=white" />
    </p>
</body>

</html>
`;
