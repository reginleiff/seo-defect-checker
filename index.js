const test = `<!DOCTYPE html>
<head>
	<title></title>
	<meta name="descriptions"></meta>
	<meta name="keywords"></meta>
</head>
<body>
	<h1>This is seo friendly fixture</h1>
	<h1>This is seo friendly fixture</h1>
	<img alt="an image"></img>
	<img></img>
	<img src=""></img>
	<p></p>
	<p></p>
	<p></p>
	<a rel="dsfsdf"></a>
	<a></a>
	<a bobo="bb"></a>
	<a alt="hey"></a>

	<strong></strong>
	<strong></strong>
	<strong></strong>
	<strong></strong>
	<strong></strong>
	<strong></strong>

	<ul>
		<li>First item</li>
		<li>Second item</li>
		<li>Third item</li>
	</ul>

	<ul></ul>
</body>`;

const check = require('./lib/checker');
const {
  NumberImgTagsWithoutAltAttribute,
  NumberATagsWithoutRelAtrribute,
  HeaderContainsTitle,
  MoreThan15Strong,
  MoreThan1H1,
  HeaderContainsMetaDescriptions,
  HeaderContainsMetaKeywords,
} = require('./lib/sample-rules');

(async () => {
  await check(test, console, [
    NumberImgTagsWithoutAltAttribute,
    NumberATagsWithoutRelAtrribute,
    MoreThan15Strong,
    MoreThan1H1,
    HeaderContainsTitle,
    HeaderContainsMetaDescriptions,
    HeaderContainsMetaKeywords,
  ]);
})();
