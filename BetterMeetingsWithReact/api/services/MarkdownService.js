module.exports = {

  /**
   * @param mdString   a simple url as string
   *
   * Aufruf im Controller: var htmlString = MarkdownService.parseMarkdown(mdString);
   * */
  parseMarkdown: function (mdString) {
    var mdParser = require("node-markdown").Markdown;

    return mdParser(mdString);
  }
};
