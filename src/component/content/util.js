import { qs } from "../../util/util.js";

export const changeToMd = (md) => {
  md = md.replace(/^\s-\n\*/gm, "<ul>\n*");
  md = md.replace(/^(\-.+)\s*\n([^\*])/gm, "$1\n</ul>\n\n$2");
  md = md.replace(/^\-(.+)/gm, "<li>$1</li>");

  //blockquote
  md = md.replace(/^\>(.+)/gm, "<blockquote>$1</blockquote>");

  //h
  md = md.replace(/[\#]{6}(.+)/g, '<h6 style="margin: 0;">$1</h6>');
  md = md.replace(/[\#]{5}(.+)/g, '<h5 style="margin: 0;">$1</h5>');
  md = md.replace(/[\#]{4}(.+)/g, '<h4 style="margin: 0;">$1</h4>');
  md = md.replace(/[\#]{3}(.+)/g, '<h3 style="margin: 0;">$1</h3>');
  md = md.replace(/[\#]{2}(.+)/g, '<h2 style="margin: 0;">$1</h2>');
  md = md.replace(/[\#]{1}(.+)/g, '<h1 style="margin: 0;">$1</h1>');

  //code
  md = md.replace(/[\`]{3}([^\`]+)[\`]{3}/g, '<code style="margin: 0;">$1</code>');

  //p
  md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
    return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p style="margin: 0;">' + m + "</p>";
  });

  return md;
};
