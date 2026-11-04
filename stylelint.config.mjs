export default {
  extends: ["stylelint-config-standard"],
  rules: {
    // The existing HTML uses camelCase IDs such as loginDiv.
    "selector-id-pattern": "^[a-z][a-zA-Z0-9-]*$"
  }
};
