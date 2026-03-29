import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, need, locale, source = "chatbot", conversation } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { error } = await supabase.from("leads").insert({
      name: name || null,
      email,
      company: company || null,
      need: need || null,
      locale: locale || "sr",
      source,
      conversation: conversation || null,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
