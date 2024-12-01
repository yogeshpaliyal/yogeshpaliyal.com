import { visit, CONTINUE } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Element } from "hast";

/* eslint-disable  @typescript-eslint/no-explicit-any */
const visitor = (node: any) => {
  const dataLanguageMermaid = "mermaid";
  const typeElement = "element";
  const tagNamePre = "pre";
  const classMermaid = dataLanguageMermaid;

  /* eslint-disable  no-constant-binary-expression, valid-typeof */
  const isPreElement = (node: any) =>
    typeof node.type !== undefined &&
    node.type === typeElement &&
    node.tagName !== undefined &&
    node.tagName === tagNamePre &&
    node.properties !== undefined &&
    node.properties.dataLanguage === dataLanguageMermaid;

  if (!isPreElement(node)) {
    return CONTINUE;
  }

  const element = node as Element;
  const properties = element.properties;
  const className = properties.className as Array<string>;
  properties.className = [...className, classMermaid];

  return CONTINUE;
};

export const addMermaidClass: Plugin<void[], Root> = () => (ast: Root) =>
  visit(ast, visitor);

export default addMermaidClass;
