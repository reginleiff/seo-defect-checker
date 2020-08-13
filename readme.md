# SEO Defect Checker
Detect Search Engine Optimisation (SEO) defects within HTML code.

## Installation
```shell
$ npm i @reginleiff/seo-defect-checker
```

## Usage

### Creating and using your own rules
Create your own rules file to detect desired SEO defects.

```javascript
// myrules.js
import { ParentContainsTagRule } from '@reginleiff/seo-defect-checker';

const ShouldContainMetaNameRobots = new ParentContainsTagRule('meta', ['name'], ['robots']);

export default {
  ShouldContainMetaNameRobots
}
```
Utilise your rules with the CLI tool or the `check` API.

```shell
$ seocheck -i target-file.html -r myrules.js -o report.txt
```

### Using the CLI Tool
- `-i` - **Input file path** for html file
- `-r` - **Rule set export** (see `lib/sample-rules.js` as an example)
- `-o` - **Output file path** (optional - `console` will be used otherwise)

```shell
$ seocheck -i examples/sample.html -r ./lib/sample-rules.js -o ./examples/sample-out.txt
```
See [`examples/sample-out.txt`](examples/sample-out.txt) for the result report.

### Using the `check` API
```javascript
import { check, PredefinedRules } from '@reginleiff/seo-defect-checker';

await check('./test.html', [
  PredefinedRules.ReportNumberImgTagsWithoutRelAttribute,
  PredefinedRules.HeaderShouldContainsTitle,
  PredefinedRules.ReportIfNotMoreThan15Strong
], console);
```
