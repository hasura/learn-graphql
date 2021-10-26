module.exports = {
  stylesheet: [
    "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css",
  ],
  css: `.page-break { page-break-after: always; }
  .markdown-body { font-size: 11px; }
  .markdown-body pre > code { white-space: pre-wrap; }`,
  body_class: "markdown-body",
  marked_options: {
    headerIds: false,
    smartypants: true,
  },
  /*
  pdf_options: {
    format: "A5",
    margin: "20mm",
    printBackground: true
  },
  */
  pdf_options: {
    printBackground: true,
    margin: "30mm 20mm",
    headerTemplate: `
      <style>
        section {
          margin: 0 auto;
          font-family: system-ui;
          font-size: 11px;
        }
      </style>
      <section>
        <span class="title"></span>
      </section>`,
    footerTemplate: `
      <section>
        <div>
        </div>
      </section>`
  },
  stylesheet_encoding: "utf-8",
};
