// dsh-emoji — Emoji 工具（DeepSeek Harness）。纯 Node。
import { defineTool } from "@deepseek-ai/dsh-tools";

const name = "Emoji";
const inject = ["tools"];

const EMOJI = {
  smile: "😄", laugh: "😂", cry: "😢", angry: "😠", heart: "❤️", broken_heart: "💔",
  thumbs_up: "👍", thumbs_down: "👎", clap: "👏", ok: "👌", fist: "✊", pray: "🙏",
  fire: "🔥", star: "⭐", sparkles: "✨", boom: "💥", rocket: "🚀", check: "✅",
  cross: "❌", warning: "⚠️", question: "❓", bulb: "💡", lock: "🔒", key: "🔑",
  coffee: "☕", beer: "🍺", cake: "🎂", gift: "🎁", trophy: "🏆", medal: "🥇",
  bug: "🐛", whale: "🐳", cat: "🐱", dog: "🐶", panda: "🐼", unicorn: "🦄",
};

async function apply(ctx, _config) {
  ctx.tools.register(defineTool({
    name: "emoji_lookup",
    description: "按关键词查 Emoji（smile/laugh/fire/rocket/check 等常用词）。`keyword` 传关键词。",
    parameters: { keyword: { type: "string", required: true, description: "关键词。" } },
    output: { schema: { type: "object", additionalProperties: false, properties: { emoji: { type: "string", required: true }, found: { type: "boolean", required: true } } }, render: (_a, v) => [{ type: "text", text: v.found ? v.emoji : "未找到" }] },
    execute: async (args) => {
      const e = EMOJI[String(args.keyword).toLowerCase()];
      return { emoji: e || "", found: !!e };
    },
  }));

  ctx.tools.register(defineTool({
    name: "emoji_list",
    description: "列出所有内置 Emoji（关键词 → 符号）。",
    parameters: {},
    output: { schema: { type: "object", additionalProperties: false, properties: { list: { type: "array", required: true, items: { type: "string" } } } }, render: (_a, v) => [{ type: "text", text: v.list.join("  ") }] },
    execute: async () => ({ list: Object.entries(EMOJI).map(([k, e]) => `${k}: ${e}`) }),
  }));
}

export { apply, inject, name };
