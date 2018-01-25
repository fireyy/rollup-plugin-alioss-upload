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
    aliossUpload({
      configFile: ".alioss.config.json",
      prefix: "/"
    })
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
