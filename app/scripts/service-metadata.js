"use strict";
import { join, relative, parse } from "path";
import { startCase } from "lodash";
import fs from "fs";

(async () => {
  let exporting = `{ `;
  fs.writeFileSync(join(__dirname, "..", "services", "index.js"), "");
  function getFile(path) {
    return fs.readdirSync(path).filter((dir) => !dir.match(/(^\.)|index/i));
  }
  function getModules() {
    return getFile(join(__dirname, "..", "modules"));
  }
  function getServicesByModule(module) {
    return getFile(join(__dirname, "..", "modules", module, "services"));
  }
  function loadService(module, service) {
    const path = join(__dirname, "..", "modules", module, "services", service);
    const name = startCase(parse(service).name)
      .split(" ")
      .join("");
    exporting = exporting + `${name}, `;
    return `import ${name} from "${relative(__dirname, path).replace(
      /\\/g,
      "/"
    )}";\n`;
  }
  function writeLineToFile(path, content) {
    fs.appendFileSync(path, content);
  }
  const modules = getModules();
  const path = join(__dirname, "..", "services", "index.js");
  for (let module of modules) {
    const services = getServicesByModule(module);

    for (let service of services) {
      const data = loadService(module, service);
      writeLineToFile(path, data);
    }
    
    
  }
  exporting = exporting + ` }`
  writeLineToFile(path, `export ${exporting}`)
})();
