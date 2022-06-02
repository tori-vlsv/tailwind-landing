import fs from "fs-extra";
import markdown from "./markdown.mjs";
import html2pug from "html2pug";
import meta from "markdown-it-meta";

(async function () {
  const docsPath = './src/markdown/docs/';
  const compiledPath = './src/views/pages/blog/';
  fs.mkdir(compiledPath);
  fs.readdir(docsPath, (err: any, files: any) => {
    files.forEach((file: any) => {
      let content = fs.readFileSync(docsPath + file, "utf8");
      markdown.use(meta)
      let renderedHtml = markdown.render(content);
      let renderedPug = html2pug(renderedHtml, { fragment: true });
      let renderedFile =
        `extends ../../layouts/master.pug

block basicSeo
  meta(name='description' content="${markdown.meta.description ? markdown.meta.description : "Blog postpage"}")
  meta(name='keywords', content="${markdown.meta.keywords ? markdown.meta.keywords : "blog, page, post"}")

block manifestBrowserconfigFiles
  link(href='../../manifest.json', rel='manifest')
  meta(name='msapplication-config' content='../../browserconfig.xml')

block title
    title ${markdown.meta.title ? markdown.meta.title : "Страница без названия"}

block content

  +header('${markdown.meta.name}')

  .barba(data-barba="wrapper")
    main(data-barba="container" data-barba-namespace="${markdown.meta.name}")
      section
        .wrapper`
        + '\n' + renderedPug.split('\n').map((x: any) => '          ' + x).join('\n');
      let newFileName = file.replace('.md', '.pug');
      fs.writeFileSync(compiledPath + newFileName, renderedFile, "utf8");
      return {
        document: renderedHtml,
        meta: markdown.meta
      }
    });
  });
})();

export { }
