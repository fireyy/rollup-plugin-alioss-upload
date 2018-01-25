# rollup-plugin-alioss-upload

Will upload rollup bundle output and all js files to Ali OSS.

### Usage

Add to rollup config:

``` js
import aliossUpload from "./rollup/rollup-plugin-alioss-upload";

export default {
	plugins:
	[
        aliossUpload(),
        // also accepts config file name as a parameter
        // aliossUpload({ configFile: ".alioss.config.json" })
        // this overrides cmd line option
	],
};

```

Create configuration file:

```json
{
    "accessKeyId": "Your accessKeyId",
    "accessKeySecret": "Your accessKeySecret",
    "region": "Your region",
    "bucket": "Your bucket"
}
```

Run the build

```
rollup -c rollup.config.js --alioss .alioss.config.json
```

