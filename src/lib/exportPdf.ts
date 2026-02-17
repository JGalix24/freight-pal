import { jsPDF } from "jspdf";

interface PdfData {
  title: string;
  type: string;
  currency: string;
  date: string;
  inputs: { label: string; value: string }[];
  results: { label: string; value: string }[];
  transitTime?: string;
  arrivalMessage?: string;
}

export const exportToPdf = (data: PdfData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // Header
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Freight-Calculator", pageWidth / 2, 18, { align: "center" });

  doc.setFontSize(14);
  doc.text(data.title, pageWidth / 2, 30, { align: "center" });

  // Date
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(10);
  doc.text(data.date, pageWidth / 2, 50, { align: "center" });

  // --- Inputs section ---
  let yPos = 65;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(margin, yPos - 6, contentWidth, data.inputs.length * 12 + 20, 4, 4, "F");

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(13);
  doc.setFont(undefined as any, "bold");
  doc.text("📦  Paramètres", margin + 8, yPos + 4);
  doc.setFont(undefined as any, "normal");

  yPos += 16;
  doc.setFontSize(11);

  data.inputs.forEach((input) => {
    doc.setTextColor(100, 116, 139);
    doc.text(input.label, margin + 8, yPos);
    doc.setTextColor(30, 41, 59);
    doc.setFont(undefined as any, "bold");
    doc.text(input.value, pageWidth - margin - 8, yPos, { align: "right" });
    doc.setFont(undefined as any, "normal");
    yPos += 12;
  });

  // --- Results section ---
  yPos += 12;
  const resultsBoxHeight = data.results.length * 14 + 20;
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.roundedRect(margin, yPos - 6, contentWidth, resultsBoxHeight, 4, 4, "F");

  doc.setTextColor(5, 150, 105); // emerald-600
  doc.setFontSize(13);
  doc.setFont(undefined as any, "bold");
  doc.text("✅  Résultats", margin + 8, yPos + 4);
  doc.setFont(undefined as any, "normal");

  yPos += 16;
  doc.setFontSize(12);

  data.results.forEach((result) => {
    doc.setTextColor(100, 116, 139);
    doc.text(result.label, margin + 8, yPos);
    doc.setTextColor(5, 150, 105);
    doc.setFont(undefined as any, "bold");
    doc.text(result.value, pageWidth - margin - 8, yPos, { align: "right" });
    doc.setFont(undefined as any, "normal");
    yPos += 14;
  });

  // --- Delivery info ---
  if (data.arrivalMessage) {
    yPos += 14;
    doc.setFillColor(239, 246, 255); // blue-50
    doc.roundedRect(margin, yPos - 6, contentWidth, 24, 4, 4, "F");

    doc.setTextColor(37, 99, 235); // blue-600
    doc.setFontSize(11);
    doc.setFont(undefined as any, "bold");
    doc.text("🚚  " + data.arrivalMessage, pageWidth / 2, yPos + 6, { align: "center" });
    doc.setFont(undefined as any, "normal");
  }

  // Footer
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.text("By Mr.G", pageWidth / 2, 280, { align: "center" });

  // Save
  const fileName = `freight-${data.type}-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
};
