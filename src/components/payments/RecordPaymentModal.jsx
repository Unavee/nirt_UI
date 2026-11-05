import React, { useState } from "react";
import { X, IndianRupee, UploadCloud, CheckCircle2, AlertCircle, Building, FileText, ArrowRight } from "lucide-react";
import { PAYMENT_MODES, PAYMENT_STATUSES } from "../../data/paymentsData";

export default function RecordPaymentModal({
  isOpen,
  onClose,
  onSubmitPayment,
  project,
  totalReceived = 150000
}) {
  const totalProjectValue = project?.totalValue || 215000;
  const currentBalance = totalProjectValue - totalReceived;

  const [invoiceNumber, setInvoiceNumber] = useState(`INV-2026-${project?.id?.replace("NIRT-26-", "") || "0042"}-${Math.floor(10 + Math.random() * 90)}`);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [amount, setAmount] = useState("");
  const [paymentMode, setPaymentMode] = useState("RTGS / NEFT");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [bankName, setBankName] = useState("ICICI Bank Ltd");
  const [branch, setBranch] = useState("Salem Main Branch");
  const [ifsc, setIfsc] = useState("ICIC0000042");
  const [gstin, setGstin] = useState(project?.gstin || "33AABCN1234F1Z8");
  const [isGstApplicable, setIsGstApplicable] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("Reconciled");
  const [milestoneTag, setMilestoneTag] = useState("Advance Payment");
  const [receiptFileName, setReceiptFileName] = useState("");
  const [receiptFileSize, setReceiptFileSize] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Numeric amount
  const numericAmount = parseFloat(amount) || 0;
  // Dynamic Balance calculation: Total Project Value - Total Received - New Amount
  const newCalculatedBalance = Math.max(0, currentBalance - numericAmount);

  // 18% GST Calculations
  const taxableAmount = isGstApplicable && numericAmount > 0 ? (numericAmount / 1.18).toFixed(2) : numericAmount.toFixed(2);
  const totalGst = isGstApplicable && numericAmount > 0 ? (numericAmount - parseFloat(taxableAmount)).toFixed(2) : "0.00";
  const cgst = (parseFloat(totalGst) / 2).toFixed(2);
  const sgst = (parseFloat(totalGst) / 2).toFixed(2);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setReceiptFileSize(`${sizeMb > 0 ? sizeMb : "0.5"} MB`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid payment amount.");
      return;
    }
    if (!referenceNumber.trim()) {
      setError("Please enter the Transaction / UTR / Reference Number.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " IST";

      const newPayment = {
        id: `REC-SLM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        projectId: project?.id || "NIRT-26-0042",
        customerName: project?.customerName || "K. Sengottaiyan",
        customerCode: project?.customerCode || "CUST-SLM-0089",
        invoiceNumber: invoiceNumber,
        paymentDate: paymentDate,
        paymentTime: timeStr,
        amount: numericAmount,
        paymentMode: paymentMode,
        referenceNumber: referenceNumber,
        bankDetails: {
          bankName: bankName,
          branch: branch,
          accountNumber: "XXXX-XXXX-4091",
          ifsc: ifsc
        },
        gstDetails: {
          isGstApplicable: isGstApplicable,
          gstin: gstin,
          rate: 18,
          taxableAmount: parseFloat(taxableAmount),
          cgst: parseFloat(cgst),
          sgst: parseFloat(sgst),
          hsnSacCode: "995461"
        },
        totalProjectValue: totalProjectValue,
        balanceAmount: newCalculatedBalance,
        paymentStatus: paymentStatus,
        receiptFileName: receiptFileName || `Bank_Receipt_${referenceNumber}.pdf`,
        receiptFileSize: receiptFileSize || "1.2 MB",
        receiptUploadedAt: `${paymentDate}, ${timeStr}`,
        recordedBy: "A. Lakshmi (Accounts Manager)",
        milestoneTag: milestoneTag,
        notes: notes || "Payment recorded into project ledger."
      };

      onSubmitPayment(newPayment);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Section 10
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Project: {project?.id || "NIRT-26-0042"}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Record Customer Advance Payment
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Balance Calculation Header Banner */}
        <div className="bg-blue-50/70 border-b border-blue-100 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Contract Value</span>
            <strong className="text-slate-900 font-mono text-sm">₹{totalProjectValue.toLocaleString("en-IN")}</strong>
          </div>
          <div className="text-slate-400">&minus;</div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Realized to Date</span>
            <strong className="text-emerald-700 font-mono text-sm">₹{totalReceived.toLocaleString("en-IN")}</strong>
          </div>
          <div className="text-slate-400">&minus;</div>
          <div>
            <span className="text-blue-700 block text-[10px] uppercase font-bold">This Payment</span>
            <strong className="text-blue-700 font-mono text-sm">₹{numericAmount.toLocaleString("en-IN")}</strong>
          </div>
          <div className="text-slate-400">=</div>
          <div className="p-1.5 px-3 rounded-lg bg-white border border-blue-200">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">New Balance Due</span>
            <strong className="text-indigo-900 font-mono text-sm font-black">₹{newCalculatedBalance.toLocaleString("en-IN")}</strong>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Row 1: Invoice # & Payment Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Invoice Number *
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="e.g. INV-2026-0042-01"
                className="w-full text-xs font-mono font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Payment Date *
              </label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Row 2: Amount & Milestone Tag */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Amount Received (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 150000"
                  className="w-full pl-7 pr-3 py-2 text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Milestone Allocation
              </label>
              <select
                value={milestoneTag}
                onChange={(e) => setMilestoneTag(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="80% Upfront Booking Advance">1. 80% Upfront Booking Advance</option>
                <option value="10% Material Dispatch Advance">2. 10% Material Dispatch Advance</option>
                <option value="10% Net-Meter Sync Final Settlement">3. 10% Net-Meter Sync Final Settlement</option>
                <option value="Ad-hoc Supplementary Payment">4. Ad-hoc Supplementary Payment</option>
              </select>
            </div>
          </div>

          {/* Row 3: Payment Mode & Transaction / Reference (UTR) */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Payment Mode *
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PAYMENT_MODES.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                UTR / Reference Number *
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="e.g. ICIC202610190042 / Cheque No"
                className="w-full text-xs font-mono font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Bank Details Group */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-600" />
              <span>Remittance Bank Details</span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="e.g. ICICI Bank Ltd"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Branch</label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="e.g. Salem Main"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={ifsc}
                  onChange={(e) => setIfsc(e.target.value)}
                  placeholder="e.g. ICIC0000042"
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* GST Details Group */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                GST Breakdown (18% Statutory Rate)
              </div>
              <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGstApplicable}
                  onChange={(e) => setIsGstApplicable(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>Applicable</span>
              </label>
            </div>

            {isGstApplicable && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Customer / EPC GSTIN</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="e.g. 33AABCN1234F1Z8"
                      className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">HSN / SAC Code</label>
                    <input
                      type="text"
                      defaultValue="995461 (Solar Installation)"
                      disabled
                      className="w-full text-xs bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-white border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Taxable Base</span>
                    <strong className="font-mono text-slate-800">₹{parseFloat(taxableAmount).toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">CGST (9%)</span>
                    <strong className="font-mono text-slate-800">₹{parseFloat(cgst).toLocaleString("en-IN")}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">SGST (9%)</span>
                    <strong className="font-mono text-slate-800">₹{parseFloat(sgst).toLocaleString("en-IN")}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Receipt File Upload Dropzone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Upload Bank Payment Receipt / Counterfoil (Section 10)
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-4 text-center transition-colors bg-slate-50/50 hover:bg-blue-50/20">
              <input
                type="file"
                id="payment-receipt-upload"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg"
              />
              <label
                htmlFor="payment-receipt-upload"
                className="cursor-pointer flex flex-col items-center justify-center space-y-1"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  {receiptFileName ? receiptFileName : "Click to attach bank slip or RTGS counterfoil"}
                </span>
                <span className="text-[11px] text-slate-400">
                  PDF, PNG, JPG up to 10 MB (Permanent Document Storage)
                </span>
              </label>
            </div>
          </div>

          {/* Payment Status Dropdown */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-700">Payment Reconciliation Status</div>
              <div className="text-[11px] text-slate-500">Recorded by Accounts Desk</div>
            </div>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              {PAYMENT_STATUSES.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Reconciling...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Post Payment to Ledger</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
