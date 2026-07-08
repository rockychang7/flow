import { generateSearchData } from "@/lib/generateSearchData";

export async function GET() {
    const searchData = await generateSearchData();
    return new Response(JSON.stringify(searchData), {
        headers: { "Content-Type": "application/json" },
    });
}
