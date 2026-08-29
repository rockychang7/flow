/**
 * 构建期把 Obsidian/GitHub 风格的 callout 引用块渲染成 aside:
 *
 *   > [!tip] 可选自定义标题
 *   > 正文……
 *
 * → <aside class="callout callout-tip"><p class="callout-title">提示</p>…</aside>
 *
 * 十四种来源类型收敛为四个视觉变体(note/tip/warning/danger),只换图标与措辞,
 * 不引入彩色;样式在 globals.css 的 .prose .callout 段。
 * 在 mdast 层改写(内容仍是 markdown 节点),块内的加粗/链接/行内代码照常渲染。
 */

// 未列出的类型回落 note 变体(与 Obsidian 对未知类型的行为一致),不会把 [!xxx] 裸漏到页面
const VARIANT_BY_TYPE = {
    note: "note", info: "note", summary: "note", abstract: "note", tldr: "note",
    faq: "note", question: "note", help: "note", example: "note", quote: "note",
    cite: "note", todo: "note",
    tip: "tip", hint: "tip", important: "tip", check: "tip", success: "tip", done: "tip",
    warning: "warning", caution: "warning", attention: "warning",
    danger: "danger", error: "danger", bug: "danger", failure: "danger", fail: "danger",
    missing: "danger",
};

const LABEL_BY_VARIANT = { note: "备注", tip: "提示", warning: "注意", danger: "警告" };

const MARKER = /^\[!([a-zA-Z]+)\][+-]?[ \t]*/;

export default function remarkCallouts() {
    return (tree) => transform(tree);
}

function transform(node) {
    if (!node.children) return;
    node.children.forEach(transform);

    if (node.type !== "blockquote") return;
    const [paragraph, ...rest] = node.children;
    if (paragraph?.type !== "paragraph") return;
    const [firstText, ...inlineRest] = paragraph.children ?? [];
    if (firstText?.type !== "text") return;

    const match = MARKER.exec(firstText.value);
    if (!match) return;
    const variant = VARIANT_BY_TYPE[match[1].toLowerCase()] ?? "note";

    // 标题 = 标记之后的第一行(可含加粗/链接等行内节点);
    // 第一个换行之后的内容与其余节点回落成正文段
    const afterMarker = firstText.value.slice(match[0].length);
    const titleChildren = [];
    const bodyParagraphChildren = [];
    let split = false;
    for (const child of [{ type: "text", value: afterMarker }, ...inlineRest]) {
        if (split) {
            bodyParagraphChildren.push(child);
        } else if (child.type === "text" && child.value.includes("\n")) {
            const idx = child.value.indexOf("\n");
            const before = child.value.slice(0, idx);
            const after = child.value.slice(idx + 1);
            if (before.trim()) titleChildren.push({ type: "text", value: before });
            if (after) bodyParagraphChildren.push({ type: "text", value: after });
            split = true;
        } else if (!(child.type === "text" && child.value.trim() === "")) {
            titleChildren.push(child);
        }
    }
    const hasCustomTitle = titleChildren.some(
        (c) => c.type !== "text" || c.value.trim() !== ""
    );

    const bodyChildren = [];
    if (bodyParagraphChildren.length > 0) {
        bodyChildren.push({ type: "paragraph", children: bodyParagraphChildren });
    }
    bodyChildren.push(...rest);

    node.data = {
        hName: "aside",
        hProperties: { className: ["callout", `callout-${variant}`] },
    };
    node.children = [
        {
            type: "paragraph",
            data: { hProperties: { className: ["callout-title"] } },
            children: hasCustomTitle
                ? titleChildren
                : [{ type: "text", value: LABEL_BY_VARIANT[variant] }],
        },
        ...bodyChildren,
    ];
}
