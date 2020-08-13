# SEO Defect Checker
Detect Search Engine Optimisation (SEO) defects within HTML code.

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
const check = require('./lib/checker.js');
const Rules = require('./lib/sample-rules.js');

await check('./test.html', [
  Rules.NumberImgTagsWithoutRelAttribute,
  Rules.HeaderContainsTitle,
  Rules.NotMoreThan15Strong
], console);
```

### Creating your own rules

```javascript
// rules.js
import { ParentContainsTagRule } from './lib/rules';

const ShouldContainMetaNameRobots = new ParentContainsTagRule('meta', ['name'], ['robots']);

export default {
  ShouldContainMetaNameRobots
}
```


