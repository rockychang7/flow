export const DATE_FORMAT = "YYYY-MM-DD";
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

export const SITE = {
    title: "Rocky Chang",
    description: "an indie hacker writing about AI, Programming and stuff",
    author: "Rocky Chang",
};

/** 想法数据文件所在仓库(/say 发布页通过 GitHub Contents API 写回) */
export const THOUGHTS_GITHUB = {
    owner: "rockychang7",
    repo: "flow",
    branch: "master",
    path: "src/content/thoughts.json",
} as const;
