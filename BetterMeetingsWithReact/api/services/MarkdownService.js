module.exports = {

  /**
   * @param mdString   a simple url as string
   *
   * Bsp: var htmlString = MarkdownService.parseMarkdown("# Dies ist ein H1\n**bold** *italic* [link](http://localhost:1337/)\n\n`code block`\n\n* foo\n* bar");
   * Aufruf im Controller: var htmlString = MarkdownService.parseMarkdown(mdString);
   * */
  parseMarkdown: function (mdString) {
    var mdParser = require("node-markdown").Markdown;

    return mdParser(mdString);
  }
};
