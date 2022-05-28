export function helpHTML(baseURL: string) {
    const now = new Date();
    const month = `${now.getFullYear}-${now.getMonth() + 1}`;
    const date = `${month}-${now.getDate()}`;
    return `
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
    E.g. <code>&lt;img height="24px" src="https://${baseURL}/count/home" /&gt;</code>
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
    View the source of this page for more examples below:
</p>
<p>
    views today: <img style="height: 1em" src="https://${baseURL}/count/${date}?on=red&bg=white" />
</p>
<p>
    this month: <img style="height: 1em" src="https://${baseURL}/count/${month}?on=lime&bg=darkslategray" />
</p>
<p>
    total views: <img style="height: 1em" src="https://${baseURL}/count/total" />
</p>
`;
}
