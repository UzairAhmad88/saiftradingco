"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Search,
  ExternalLink,
  Loader2,
  AlertCircle,
  Check,
  CheckCircle2,
  Clock,
  Archive,
  Trash2,
  Eye,
  X,
  Gem,
  Phone,
} from "lucide-react";
import type { AdminInquiryRow, AdminInquiriesResult } from "@/lib/data/gemstones-admin";
import type { InquiryStatus } from "@/types/database";
import {
  updateInquiryStatusAction,
  deleteInquiryAction,
} from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";

export interface InquiriesListManagerProps {
  initialData: AdminInquiriesResult;
  currentStatus?: string;
  currentSearch?: string;
}

export function InquiriesListManager({
  initialData,
  currentStatus = "all",
  currentSearch = "",
}: InquiriesListManagerProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<AdminInquiryRow[]>(initialData.inquiries);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Search input state
  const [searchVal, setSearchVal] = useState(currentSearch);
  const [selectedInquiry, setSelectedInquiry] = useState<AdminInquiryRow | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminInquiryRow | null>(null);

  const handleFilterStatus = (newStatus: string) => {
    const params = new URLSearchParams(window.location.search);
    if (newStatus === "all") {
      params.delete("status");
    } else {
      params.set("status", newStatus);
    }
    params.delete("page");
    router.push(`/admin/inquiries?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (searchVal.trim() === "") {
      params.delete("search");
    } else {
      params.set("search", searchVal.trim());
    }
    params.delete("page");
    router.push(`/admin/inquiries?${params.toString()}`);
  };

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    startTransition(async () => {
      const res = await updateInquiryStatusAction(id, newStatus);
      if (res.success) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        setFeedback({
          type: "success",
          message: `Inquiry status updated to ${newStatus.replace("_", " ")}.`,
        });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to update inquiry status.",
        });
      }
    });
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const targetId = deleteTarget.id;
    startTransition(async () => {
      const res = await deleteInquiryAction(targetId);
      if (res.success) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== targetId));
        setDeleteTarget(null);
        if (selectedInquiry?.id === targetId) {
          setSelectedInquiry(null);
        }
        setFeedback({
          type: "success",
          message: "Trade inquiry removed successfully.",
        });
      } else {
        setFeedback({
          type: "error",
          message: res.error || "Failed to delete inquiry.",
        });
        setDeleteTarget(null);
      }
    });
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#9CCB63] bg-[#9CCB63]/10 border border-[#9CCB63]/30 rounded-[4px] px-2 py-0.5">
            <Clock className="w-3 h-3" />
            <span>New</span>
          </span>
        );
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#B7D98B] bg-[#B7D98B]/10 border border-[#B7D98B]/30 rounded-[4px] px-2 py-0.5">
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>In Progress</span>
          </span>
        );
      case "resolved":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#9A9A94] bg-[#262626] border border-[#333333] rounded-[4px] px-2 py-0.5">
            <CheckCircle2 className="w-3 h-3 text-[#9CCB63]" />
            <span>Resolved</span>
          </span>
        );
      case "archived":
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#737373] bg-[#171717] border border-[#262626] rounded-[4px] px-2 py-0.5">
            <Archive className="w-3 h-3" />
            <span>Archived</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Feedback */}
      {feedback && (
        <div
          role="status"
          className={`p-4 text-xs border rounded-[4px] flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-[#9CCB63]/10 border-[#9CCB63]/30 text-[#9CCB63]"
              : "bg-red-950/20 border-red-800/40 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <Check className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-[10px] uppercase tracking-wider underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#111111] border border-[#262626] rounded-[4px] p-4 space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#262626] pb-3">
          {[
            { key: "all", label: "All Inquiries", count: initialData.total },
            { key: "new", label: "New", count: initialData.newCount },
            { key: "in_progress", label: "In Progress", count: initialData.inProgressCount },
            { key: "resolved", label: "Resolved", count: initialData.resolvedCount },
            { key: "archived", label: "Archived", count: initialData.archivedCount },
          ].map((tab) => {
            const isActive = currentStatus === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleFilterStatus(tab.key)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-[4px] transition-colors ${
                  isActive
                    ? "bg-[#9CCB63] text-[#050505] font-semibold"
                    : "text-[#9A9A94] hover:text-[#F5F5F0] hover:bg-[#1A1A1A] border border-[#262626]"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-[#050505]/20 text-[#050505]" : "bg-[#262626] text-[#A5A5A0]"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search by customer name, email, gemstone, or inquiry message..."
              className="w-full bg-[#0A0A0A] border border-[#262626] rounded-[4px] pl-9 pr-3 py-2 text-xs text-[#F5F5F0] placeholder-[#525252] focus:outline-none focus:border-[#9CCB63] focus:ring-1 focus:ring-[#9CCB63]"
            />
          </div>
          <Button type="submit" size="sm" variant="secondary" className="text-xs">
            Search
          </Button>
          {(currentSearch || currentStatus !== "all") && (
            <Link href="/admin/inquiries">
              <Button size="sm" variant="secondary" className="text-xs">
                Reset
              </Button>
            </Link>
          )}
        </form>
      </div>

      {/* Inquiries Table */}
      {inquiries.length === 0 ? (
        <div className="bg-[#111111] border border-[#262626] rounded-[4px] p-12 text-center space-y-3">
          <Mail className="w-8 h-8 mx-auto text-[#737373]" />
          <h2 className="text-base font-serif text-[#F5F5F0]">No Inquiries Found</h2>
          <p className="text-xs text-[#9A9A94] max-w-sm mx-auto font-light">
            {currentSearch || currentStatus !== "all"
              ? "No trade inquiries match your active search or filter criteria."
              : "When customers submit trade inquiries or request specimen documentation from public gemstone pages, their inquiries will appear here."}
          </p>
        </div>
      ) : (
        <div className="bg-[#111111] border border-[#262626] rounded-[4px] overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-label="Trade inquiries table">
            <thead>
              <tr className="border-b border-[#262626] bg-[#0A0A0A] text-[10px] font-mono uppercase tracking-[0.16em] text-[#9A9A94]">
                <th scope="col" className="py-3 px-4">Customer</th>
                <th scope="col" className="py-3 px-4">Subject / Specimen</th>
                <th scope="col" className="py-3 px-4">Message Snippet</th>
                <th scope="col" className="py-3 px-4">Status</th>
                <th scope="col" className="py-3 px-4">Received</th>
                <th scope="col" className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F1F1F] text-xs">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-[#141414] transition-colors group">
                  {/* Customer details */}
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="font-medium text-[#F5F5F0] block">{inq.name}</span>
                      <a
                        href={`mailto:${inq.email}`}
                        className="text-[11px] text-[#9A9A94] hover:text-[#9CCB63] transition-colors font-mono block mt-0.5"
                      >
                        {inq.email}
                      </a>
                      {inq.phone && (
                        <span className="text-[10px] text-[#737373] font-mono flex items-center gap-1 mt-0.5">
                          <Phone className="w-2.5 h-2.5" />
                          {inq.phone}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Subject / Gemstone Link */}
                  <td className="py-3.5 px-4">
                    <div>
                      <span className="text-[11px] text-[#F5F5F0] capitalize font-medium block">
                        {inq.inquiry_type.replace(/_/g, " ")}
                      </span>
                      {inq.gemstone_name ? (
                        <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#9CCB63]">
                          <Gem className="w-3 h-3 shrink-0" />
                          {inq.gemstone_slug ? (
                            <Link
                              href={`/gemstones/${inq.gemstone_slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline flex items-center gap-1 line-clamp-1"
                            >
                              <span>{inq.gemstone_name}</span>
                              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                            </Link>
                          ) : (
                            <span>{inq.gemstone_name}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10px] text-[#525252] italic mt-0.5 block">
                          General Trade Inquiry
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Message Preview */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <p className="text-[#9A9A94] text-xs line-clamp-2 leading-relaxed">
                      {inq.message}
                    </p>
                  </td>

                  {/* Status & Fast Status Dropdown */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="space-y-1.5">
                      <div>{getStatusBadge(inq.status)}</div>
                      <select
                        value={inq.status}
                        disabled={isPending}
                        onChange={(e) =>
                          handleStatusChange(inq.id, e.target.value as InquiryStatus)
                        }
                        className="bg-[#0A0A0A] border border-[#262626] rounded-[4px] text-[10px] text-[#F5F5F0] py-0.5 px-1.5 focus:outline-none focus:border-[#9CCB63]"
                        aria-label={`Update status for inquiry from ${inq.name}`}
                      >
                        <option value="new">Mark New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#737373] whitespace-nowrap">
                    {new Date(inq.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedInquiry(inq)}
                      title="View complete inquiry"
                      className="p-1.5 text-[#9A9A94] hover:text-[#9CCB63] hover:bg-[#1A1A1A] border border-transparent hover:border-[#262626] rounded-[4px] transition-colors"
                      aria-label="View inquiry details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(inq)}
                      title="Delete inquiry"
                      className="p-1.5 text-[#737373] hover:text-red-400 hover:bg-[#1A1A1A] border border-transparent hover:border-red-900/40 rounded-[4px] transition-colors"
                      aria-label="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-[#111111] border border-[#262626] rounded-[4px] max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#262626] pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#9CCB63] font-mono">
                  Inquiry Details
                </span>
                <h3 className="text-lg font-serif text-[#F5F5F0] mt-0.5">
                  {selectedInquiry.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 text-[#737373] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px]"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inquiry Meta Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-[#0A0A0A] p-3.5 border border-[#262626] rounded-[4px]">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#737373] block">Email</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="text-[#9CCB63] hover:underline font-mono break-all"
                >
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#737373] block">Phone</span>
                <span className="text-[#F5F5F0] font-mono">
                  {selectedInquiry.phone || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#737373] block">Inquiry Type</span>
                <span className="text-[#F5F5F0] capitalize">
                  {selectedInquiry.inquiry_type.replace(/_/g, " ")}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono text-[#737373] block">Status</span>
                <div className="mt-1">{getStatusBadge(selectedInquiry.status)}</div>
              </div>
            </div>

            {/* Referenced Gemstone */}
            {selectedInquiry.gemstone_name && (
              <div className="p-3 bg-[#0D0D0D] border border-[#262626] rounded-[4px] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-[#9CCB63]" />
                  <div>
                    <span className="text-[10px] font-mono text-[#737373] uppercase block">
                      Target Specimen
                    </span>
                    <span className="text-xs text-[#F5F5F0] font-medium">
                      {selectedInquiry.gemstone_name}
                    </span>
                  </div>
                </div>
                {selectedInquiry.gemstone_slug && (
                  <Link
                    href={`/gemstones/${selectedInquiry.gemstone_slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#9CCB63] hover:underline font-mono"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            )}

            {/* Full Message */}
            <div>
              <span className="text-[10px] uppercase font-mono text-[#737373] block mb-1">
                Full Message
              </span>
              <div className="p-3.5 bg-[#0A0A0A] border border-[#262626] rounded-[4px] text-xs text-[#F5F5F0] font-light leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Quick Status Toggles & Reply Action */}
            <div className="pt-3 border-t border-[#262626] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                {(["new", "in_progress", "resolved", "archived"] as InquiryStatus[]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={isPending || selectedInquiry.status === st}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className={`text-[10px] uppercase font-mono px-2 py-1 rounded-[4px] border transition-colors ${
                      selectedInquiry.status === st
                        ? "bg-[#9CCB63] text-[#050505] border-[#9CCB63] font-bold"
                        : "bg-[#171717] text-[#9A9A94] border-[#262626] hover:text-[#F5F5F0]"
                    }`}
                  >
                    {st.replace("_", " ")}
                  </button>
                ))}
              </div>

              <a
                href={`mailto:${selectedInquiry.email}?subject=Saif Trading Co Trade Inquiry Response&body=Dear ${encodeURIComponent(selectedInquiry.name)},%0D%0A%0D%0AThank you for contacting Saif Trading Co regarding your inquiry.`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#9CCB63] text-[#050505] text-xs uppercase font-semibold tracking-wider rounded-[4px] hover:bg-[#A3C73A] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Reply by Email</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="bg-[#111111] border border-red-900/40 rounded-[4px] max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-red-950/40 border border-red-800/50 flex items-center justify-center text-red-400 mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-base font-serif text-[#F5F5F0]">
                Delete Trade Inquiry?
              </h3>
              <p className="text-xs text-[#9A9A94] leading-relaxed">
                Are you sure you want to delete the inquiry from{" "}
                <strong className="text-[#F5F5F0]">{deleteTarget.name}</strong>?
                This action cannot be undone. Consider archiving instead if you wish to keep records.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 text-xs text-[#9A9A94] hover:text-[#F5F5F0] border border-[#262626] rounded-[4px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending}
                className="px-4 py-2 text-xs bg-red-700 hover:bg-red-600 text-white font-medium rounded-[4px] transition-colors flex items-center gap-1.5"
              >
                {isPending && <Loader2 className="w-3 h-3 animate-spin" />}
                <span>Confirm Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
