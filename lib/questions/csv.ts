import { QuestionInput } from "./validation";

/**
 * Robust RFC 4180 CSV parser handling multiline, quotes, and commas
 */
export function parseCsv(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentField);
        currentField = "";
      } else if (char === "\r") {
        if (nextChar === "\n") i++;
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
      } else if (char === "\n") {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = "";
      } else {
        currentField += char;
      }
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows.filter((r) => r.length > 0 && r.some((f) => f.trim().length > 0));
}

/**
 * Escape and quote a single CSV field
 */
export function escapeCsvField(field: unknown): string {
  if (field === null || field === undefined) return "";
  const str = String(field);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Format questions into standard CSV string
 */
export function exportQuestionsToCsv(questions: QuestionInput[]): string {
  const headers = [
    "external_id",
    "category",
    "subtopic",
    "stem",
    "image_path",
    "option_a_text",
    "option_a_points",
    "option_b_text",
    "option_b_points",
    "option_c_text",
    "option_c_points",
    "option_d_text",
    "option_d_points",
    "option_e_text",
    "option_e_points",
    "explanation",
    "difficulty",
    "source_note",
    "source_reference",
    "review_status",
    "review_note",
  ];

  const lines = [headers.join(",")];

  for (const q of questions) {
    const optA = q.options.find((o) => o.label === "A") || { text: "", points: 0 };
    const optB = q.options.find((o) => o.label === "B") || { text: "", points: 0 };
    const optC = q.options.find((o) => o.label === "C") || { text: "", points: 0 };
    const optD = q.options.find((o) => o.label === "D") || { text: "", points: 0 };
    const optE = q.options.find((o) => o.label === "E") || { text: "", points: 0 };

    const row = [
      escapeCsvField(q.externalId || ""),
      escapeCsvField(q.category),
      escapeCsvField(q.subtopic),
      escapeCsvField(q.stem),
      escapeCsvField(q.imagePath || ""),
      escapeCsvField(optA.text),
      escapeCsvField(optA.points),
      escapeCsvField(optB.text),
      escapeCsvField(optB.points),
      escapeCsvField(optC.text),
      escapeCsvField(optC.points),
      escapeCsvField(optD.text),
      escapeCsvField(optD.points),
      escapeCsvField(optE.text),
      escapeCsvField(optE.points),
      escapeCsvField(q.explanation),
      escapeCsvField(q.difficulty),
      escapeCsvField(q.sourceNote),
      escapeCsvField(q.sourceReference || ""),
      escapeCsvField(q.reviewStatus),
      escapeCsvField(q.reviewNote || ""),
    ];
    lines.push(row.join(","));
  }

  return lines.join("\r\n");
}
