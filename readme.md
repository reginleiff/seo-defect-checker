# SEO Defect Checker
Detect Search Engine Optimisation (SEO) defects within HTML code.

## Usage

### Using the checker
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
  ContainsMetaNameRobots
}
```


