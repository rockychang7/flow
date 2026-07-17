// 本地追加一条想法到 src/content/thoughts.json
// 用法:
//   npm run say -- "内容"      简单单行(PowerShell 下含引号/多行请用交互模式)
//   npm run say                交互式多行输入,单独一行 . 结束,Ctrl+C 取消
import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline";
import dayjs from "dayjs";

const FILE = new URL("../src/content/thoughts.json", import.meta.url);

async function readContent() {
    const fromArgs = process.argv.slice(2).join(" ").trim();
    if (fromArgs) return fromArgs;

    if (!process.stdin.isTTY) {
        let piped = "";
        for await (const chunk of process.stdin) piped += chunk;
        return piped.trim();
    }

    console.log("输入想法内容(支持多行,单独一行 . 结束,Ctrl+C 取消):");
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const lines = [];
    for await (const line of rl) {
        if (line === ".") break;
        lines.push(line);
    }
    rl.close();
    return lines.join("\n").trim();
}

const content = await readContent();
if (!content) {
    console.error("内容为空,已取消。");
    process.exit(1);
}

const thoughts = JSON.parse(readFileSync(FILE, "utf8"));
const nextId = thoughts.length ? Math.max(...thoughts.map((t) => t.id)) + 1 : 1;
// 与 src/constant/constants.ts 的 DATETIME_FORMAT 保持一致
const created_at = dayjs().format("YYYY-MM-DD HH:mm:ss");

thoughts.push({ id: nextId, content, created_at });
// 格式契约:2 空格缩进 + 末尾换行,与 /say 页写回格式一致
writeFileSync(FILE, JSON.stringify(thoughts, null, 2) + "\n", "utf8");

console.log(`已追加想法 #${nextId} (${created_at})`);
console.log("发布: git pull --rebase && git commit -am \"thought: " + created_at + "\" && git push");
