# SEO Defect Checker
Detect Search Engine Optimisation (SEO) defects within HTML code.

## Installation
```shell
$ npm i @reginleiff/seo-defect-checker
```

## Usage

### Using it as a CLI Tool
- `-i` - **Input file path** for html file
- `-r` - **Rule set export** (see `lib/sample-rules.js`)
- `-o` - **Output file path** (optional - `console` will be used otherwise)
```shell
$ npm run check -- -i ./examples/sample.html -r ./lib/sample-rules.js -o ./examples/sample-out.txt
```

### Using the `check` API
```javascript
const { check, PredefinedRules } = require('@reginleiff/seo-defect-checker');

await check('./test.html', [
  PredefinedRules.NumberImgTagsWithoutRelAttribute,
  PredefinedRules.HeaderContainsTitle,
  PredefinedRules.NotMoreThan15Strong
], console);
```

### Creating your own rules

```javascript
// rules.js
import { ParentContainsTagRule } from '@reginleiff/seo-defect-checker';

const ShouldContainMetaNameRobots = new ParentContainsTagRule('meta', ['name'], ['robots']);

export default {
  ShouldContainMetaNameRobots
}
```


