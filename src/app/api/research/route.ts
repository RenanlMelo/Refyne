import { NextRequest, NextResponse } from "next/server";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScSCpKopYfFnLcTxqeZn_FTJ4qBjg-ytmGk0jdEdcJCL1wgWw/formResponse";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const formData = new URLSearchParams();

  if (body.variant === "startup") {
    formData.append("entry.674133546", "Sou Startup/Fundador");
    formData.append("entry.1063195008", String(body.startupName || ""));
    formData.append("entry.1826531633", String(body.stage || ""));
    formData.append("entry.1857820988", String(body.hoursLost || ""));
    formData.append("entry.2048331819", String(body.offersEquity || ""));
    formData.append("entry.1963623074", String(body.hardestSkill || ""));
    formData.append("entry.1679052394", String(body.email || ""));
    formData.append("entry.920917370", "Consinto com a retenção e o processamento das informações fornecidas neste formulário exclusivamente para fins de inteligência de mercado, pesquisas educacionais e desenvolvimento da plataforma REFYNE.");
    formData.append("pageHistory", "0,1");
  } else if (body.variant === "candidate") {
    formData.append("entry.674133546", "Sou Profissional/Talento");
    formData.append("entry.2032158949", String(body.fullName || ""));
    formData.append("entry.680297435", String(body.area || ""));
    formData.append("entry.437815874", String(body.seniority || ""));
    formData.append("entry.608216783", String(body.equityInterest || ""));
    formData.append("entry.1083790831", String(body.frustration || ""));
    formData.append("entry.1914326342", String(body.email || ""));
    formData.append("entry.950771049", "Consinto com a retenção e o processamento das informações fornecidas neste formulário exclusivamente para fins de inteligência de mercado, pesquisas educacionais e desenvolvimento da plataforma REFYNE.");
    formData.append("pageHistory", "0,2");
  } else {
    return NextResponse.json({ error: "Unknown variant" }, { status: 400 });
  }

  try {
    const response = await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!response.ok) {
      console.error("[waitlist] Form submit error:", response.status, response.statusText);
      return NextResponse.json(
        { error: "Failed to submit to Google Forms." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[waitlist] fetch error:", err);
    return NextResponse.json(
      { error: "Could not reach Google Forms." },
      { status: 502 }
    );
  }
}
