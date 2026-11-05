import React from "react";
import { X, Printer, Download, CheckCircle2, ShieldCheck, Building2, IndianRupee, FileText, ArrowDownToLine } from "lucide-react";

export default function PaymentReceiptModal({ isOpen, onClose, payment, project }) {
  if (!isOpen || !payment) return null;

  // Convert number to Indian words
  const numberToWordsIndian = (num) => {
    if (!num) return "Zero Rupees Only";
    const a = [
      "", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ",
      "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    const inWords = (n) => {
      let str = "";
      if (n > 19) {
        str += b[Math.floor(n / 10)] + " " + a[n % 10];
      } else {
        str += a[n];
      }
      return str;
    };

    let n = Math.floor(num);
    let output = "";
    const crore = Math.floor(n / 10000000);
    n %= 10000000;
    const lakh = Math.floor(n / 100000);
    n %= 100000;
    const thousand = Math.floor(n / 1000);
    n %= 1000;
    const hundred = Math.floor(n / 100);
    const rest = n % 100;

    if (crore > 0) output += inWords(crore) + "Crore ";
    if (lakh > 0) output += inWords(lakh) + "Lakh ";
    if (thousand > 0) output += inWords(thousand) + "Thousand ";
    if (hundred > 0) output += inWords(hundred) + "Hundred ";
    if (rest > 0) output += inWords(rest);

    return output.trim() + " Rupees Only";
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none">
        {/* Modal Toolbar (hidden in print) */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Official Tax Receipt
            </span>
            <span className="text-xs font-mono text-slate-500">
              Receipt No: {payment.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                alert(`Simulating download of ${payment.receiptFileName || 'payment_receipt.pdf'}`);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg shadow-sm transition-colors"
            >
              <ArrowDownToLine className="w-3.5 h-3.5" />
              <span>Download Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1 bg-white text-slate-900 font-sans">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  N
                </div>
                <h2 className="text-lg font-black tracking-tight text-slate-900">
                  NIRT SOLAR EPC PRIVATE LIMITED
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Turnkey Solar EPC & Rooftop Power Generation Solutions
              </p>
              <p className="text-[11px] text-slate-500">
                HQ: 142/3 Meyyanur Bypass Road, Salem - 636004, Tamil Nadu
              </p>
              <div className="text-[11px] text-slate-600 font-mono mt-0.5">
                GSTIN: <strong className="text-slate-800">33AABCN1234F1Z8</strong> • CIN: U40106TZ2020PTC034567
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                PAYMENT RECEIPT
              </span>
              <div className="text-base font-black font-mono text-blue-700 mt-0.5">
                {payment.id}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Date: <strong>{payment.paymentDate}</strong>
              </div>
              <div className="text-xs text-slate-500">
                Time: <strong>{payment.paymentTime || "11:30 IST"}</strong>
              </div>
            </div>
          </div>

          {/* Customer & Project Binding Bar */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Details</span>
              <div className="font-bold text-slate-900 text-sm mt-0.5">
                {payment.customerName || project?.customerName || "K. Sengottaiyan"}
              </div>
              <div className="text-slate-600 mt-0.5">
                Consumer No: <strong className="font-mono text-slate-800">{project?.consumerNumber || "04-219-002-1482"}</strong>
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Site: {project?.siteAddress || "14/A Fairlands 2nd Cross, Salem - 636016"}
              </div>
            </div>

            <div className="border-l border-slate-200 pl-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Project & Invoice Binding</span>
              <div className="flex justify-between">
                <span className="text-slate-500">Project ID:</span>
                <strong className="font-mono text-blue-700">{payment.projectId}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Invoice Ref:</span>
                <strong className="font-mono text-slate-800">{payment.invoiceNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Milestone:</span>
                <span className="font-medium text-slate-800">{payment.milestoneTag || "Advance Payment"}</span>
              </div>
            </div>
          </div>

          {/* Payment Breakdown Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-center">HSN/SAC</th>
                  <th className="p-3 text-right">Taxable Value</th>
                  <th className="p-3 text-right">CGST (9%)</th>
                  <th className="p-3 text-right">SGST (9%)</th>
                  <th className="p-3 text-right">Total Realized</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">
                      Rooftop Solar PV Installation Advance
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Mode: <strong className="text-slate-700">{payment.paymentMode}</strong> • Ref/UTR: <strong className="font-mono text-slate-700">{payment.referenceNumber}</strong>
                    </div>
                  </td>
                  <td className="p-3.5 text-center font-mono text-slate-600">
                    {payment.gstDetails?.hsnSacCode || "995461"}
                  </td>
                  <td className="p-3.5 text-right font-mono text-slate-700">
                    ₹{Number(payment.gstDetails?.taxableAmount || (payment.amount / 1.18)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3.5 text-right font-mono text-slate-700">
                    ₹{Number(payment.gstDetails?.cgst || ((payment.amount - (payment.amount / 1.18)) / 2)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3.5 text-right font-mono text-slate-700">
                    ₹{Number(payment.gstDetails?.sgst || ((payment.amount - (payment.amount / 1.18)) / 2)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="p-3.5 text-right font-mono font-bold text-emerald-700 text-sm">
                    ₹{Number(payment.amount).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Amount in Words */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Amount In Words:</span>
            <div className="font-bold text-slate-800 text-xs mt-0.5">
              {numberToWordsIndian(payment.amount)}
            </div>
          </div>

          {/* Banking Details & Automatic Balance Calculation */}
          <div className="grid grid-cols-2 gap-4">
            {/* Bank details */}
            <div className="p-3.5 rounded-xl border border-slate-200 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Banking Remittance Details
              </span>
              <div className="flex justify-between">
                <span className="text-slate-500">Bank Name:</span>
                <span className="font-semibold text-slate-800">{payment.bankDetails?.bankName || "ICICI Bank"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Branch:</span>
                <span className="text-slate-700">{payment.bankDetails?.branch || "Salem Main"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">IFSC Code:</span>
                <span className="font-mono text-slate-700">{payment.bankDetails?.ifsc || "ICIC0000042"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">UTR / Ref:</span>
                <span className="font-mono font-bold text-blue-700">{payment.referenceNumber}</span>
              </div>
            </div>

            {/* Auto Balance Calculation */}
            <div className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                Automatic Balance Calculation (Section 10)
              </span>
              <div className="flex justify-between">
                <span className="text-slate-600">Total Contract Value:</span>
                <span className="font-mono font-semibold text-slate-900">₹{Number(payment.totalProjectValue || 215000).toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Amount Received in this Slip:</span>
                <span className="font-mono">- ₹{Number(payment.amount).toLocaleString("en-IN")}</span>
              </div>
              <div className="pt-1.5 border-t border-blue-200 flex justify-between text-sm font-bold">
                <span className="text-blue-900">Remaining Balance Due:</span>
                <span className="font-mono text-blue-700">₹{Number(payment.balanceAmount).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Verification Badge & Footer Sign-offs */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-[11px]">RECONCILED & DIGITALLY VERIFIED</div>
                <div className="text-[10px] text-emerald-600">Bank counterfoil validated by Accounts Desk</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs font-bold text-slate-800">
                {payment.recordedBy || "A. Lakshmi (Accounts Manager)"}
              </div>
              <div className="text-[10px] text-slate-400">Authorized Finance Officer, NIRT Solar</div>
            </div>
          </div>

          {/* Attached Document File Pill */}
          {payment.receiptFileName && (
            <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-slate-700">Archived Bank Receipt:</span>
                <span className="font-semibold text-slate-900">{payment.receiptFileName}</span>
                <span className="text-slate-400 text-[11px]">({payment.receiptFileSize || "1.2 MB"})</span>
              </div>
              <button
                onClick={() => alert(`Opening archived bank slip ${payment.receiptFileName}`)}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                View Attachment
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer (hidden in print) */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-400">
            Section 10 • Automatic Statutory Tax Receipt
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
