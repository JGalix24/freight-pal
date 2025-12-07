import { jsPDF } from "jspdf";

interface PdfData {
  title: string;
  type: string;
  currency: string;
  date: string;
  inputs: { label: string; value: string }[];
  results: { label: string; value: string }[];
  transitTime?: string;
}

export const exportToPdf = (data: PdfData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(30, 41, 59); // slate-800
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Freight-Calculator", pageWidth / 2, 18, { align: "center" });
  
  doc.setFontSize(14);
  doc.text(data.title, pageWidth / 2, 30, { align: "center" });
  
  // Date
  doc.setTextColor(100, 116, 139); // slate-500
  doc.setFontSize(10);
  doc.text(`Généré le: ${data.date}`, pageWidth / 2, 50, { align: "center" });
  
  // Inputs section
  let yPos = 65;
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.text("Paramètres", 20, yPos);
  
  yPos += 8;
  doc.setDrawColor(226, 232, 240);
  doc.line(20, yPos, pageWidth - 20, yPos);
  
  yPos += 10;
  doc.setFontSize(11);
  
  data.inputs.forEach((input) => {
    doc.setTextColor(100, 116, 139);
    doc.text(input.label + ":", 20, yPos);
    doc.setTextColor(30, 41, 59);
    doc.text(input.value, 90, yPos);
    yPos += 8;
  });
  
  // Results section
  yPos += 10;
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text("Résultats", 20, yPos);
  
  yPos += 8;
  doc.line(20, yPos, pageWidth - 20, yPos);
  
  yPos += 10;
  doc.setFontSize(12);
  
  data.results.forEach((result) => {
    doc.setTextColor(100, 116, 139);
    doc.text(result.label + ":", 20, yPos);
    doc.setTextColor(16, 185, 129); // emerald-500
    doc.setFont(undefined, "bold");
    doc.text(result.value, 90, yPos);
    doc.setFont(undefined, "normal");
    yPos += 10;
  });
  
  // Transit time
  if (data.transitTime) {
    yPos += 5;
    doc.setTextColor(100, 116, 139);
    doc.setFontSize(11);
    doc.text("Délai de livraison estimé:", 20, yPos);
    doc.setTextColor(59, 130, 246); // blue-500
    doc.text(data.transitTime, 90, yPos);
  }
  
  // Footer
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.text("By Mr.G", pageWidth / 2, 280, { align: "center" });
  
  // Save
  const fileName = `freight-${data.type}-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
};
