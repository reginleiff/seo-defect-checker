const test = `<!DOCTYPE html>
<head>
	<title></title>
</head>
<body>
	<h1>Title 1</h1>
	<h1>Title 2</h1>
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
  ReportNumberImgTagsWithoutAltAttribute,
  ReportNumberATagsWithoutRelAtrribute,
  HeaderShouldContainTitle,
  ReportIfMoreThan15Strong,
  ReportIfMoreThan1H1,
  HeaderShouldContainMetaNameDescriptions,
  HeaderShouldContainMetaNameKeywords,
} = require('./lib/sample-rules');

(async () => {
  await check(test, [
    ReportNumberImgTagsWithoutAltAttribute,
    ReportNumberATagsWithoutRelAtrribute,
    ReportIfMoreThan15Strong,
    ReportIfMoreThan1H1,
    HeaderShouldContainTitle,
    HeaderShouldContainMetaNameDescriptions,
    HeaderShouldContainMetaNameKeywords,
  ], console);
})();
