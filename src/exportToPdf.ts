import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportContainerToPdf(containerId = 'report-root') {
    const node = document.getElementById(containerId);
    if (!node) return;
    const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 16;
    const w = pageWidth - margin * 2;
    const h = pageHeight - margin * 2;
    pdf.addImage(imgData, 'PNG', margin, margin, w, h);
    pdf.save('plan-fact-report.pdf');
}