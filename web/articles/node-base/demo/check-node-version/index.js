
const check = require("check-node-version")
const packageConfig = require('./package.json')

check({
  node: packageConfig.engines.node
},(error, results) => {
  if (error) {
    console.error(error);
    return;
  }

  if (results.isSatisfied) {
    console.log("All is well.");
  }
  else {
    console.log("You must upgrade node to " + packageConfig.engines.node + "to use");
  }
})
