export type FrontmatterResult = {
  data: Record<string, string>;
  content: string;
};

const stripBom = (source: string) => {
  return source.charCodeAt(0) === 0xfeff ? source.slice(1) : source;
};

const stripQuotes = (value: string) => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

export const parseFrontmatter = (source: string): FrontmatterResult => {
  const text = stripBom(source);

  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(text);
  if (!match) {
    return { data: {}, content: source };
  }

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const keyValue = /^\s*([^:#\s][^:]*?)\s*:\s*(.+?)\s*$/.exec(line);
    if (keyValue) {
      data[keyValue[1].trim()] = stripQuotes(keyValue[2]);
    }
  }

  return { data, content: text.slice(match[0].length) };
};
