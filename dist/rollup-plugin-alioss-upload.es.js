/* eslint-disable */
import oss from 'ali-oss';
import { readFile, readdir } from 'fs';
import { basename } from 'path';
import { promisify } from 'util';
import co from 'co';

const readFile$1 = promisify(readFile);
const readDir = promisify(readdir);
let store = null;
let config = {};
let prefixPath = "/";
let uploadIndex = 0;

async function upload(configFile, bundle) {
	if (configFile === undefined)
		return;
	try
	{
    config = await readFile$1(configFile, "utf-8").then(data => JSON.parse(data));
    store = oss(config);

		await uploadFile(basename(bundle.file), bundle.bundle.code).then(
      result => {
        if (uploadIndex++ === 0) {
          console.log("\n\n OSS 上传中......");
        }
        console.log(`上传成功: ${bundle.file}`);
        // Promise.resolve('上传成功')
      }
    ).catch(err => {
      console.log("\n");
      console.log(
        `OSS 上传出错:::: ${err.name}-${err.code}: ${err.message}`
      );
    });
	}
	catch(err)
	{
		console.log(`alioss-upload: failed -- ${err.stack}`, configFile);
	}
}

function uploadFile (name, source) {
  let retryTimes = 2;
  const uploadStore = () => {
    return co(function*() {
      const uploadName = `${prefixPath}${name}`;
      return yield store.put(uploadName, Buffer.from(source));
    }).catch(e => {
      if (retryTimes <= 0) {
        return Promise.reject(e);
      }
      retryTimes--;
      return uploadStore();
    });
  };
  return uploadStore();
}

function aliossUpload({ configFile=".alioss.config.json", prefix="/" }) {
	return {
		name: "alioss-upload",

		onwrite(bundle) {
      prefixPath = prefix.endsWith("/") ? prefix : `${prefix}/`;
			Promise.resolve(upload(configFile, bundle));
		}
	};
}

export default aliossUpload;
//# sourceMappingURL=rollup-plugin-alioss-upload.es.js.map
