import { useState } from "react";
import type { Company } from "@/types/company";
import JobModal from "./JobModal";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Check,
  Eye,
  Navigation,
} from "lucide-react";
import { Tooltip } from "react-tooltip";

interface JobCardProps {
  company: Company;
  onViewLocation: (company: Company) => void;
  variant?: 'card' | 'list';
}

export default function JobCard({ company, onViewLocation, variant = 'card' }: JobCardProps) {
  const [isContacted, setIsContacted] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleContacted = () => {
    setIsContacted(!isContacted);
  };

  const openJobModal = (job: Company) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  // List view
  if (variant === 'list') {
    return (
      <>
        <div
          className={`group relative bg-white border rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${
            isContacted
              ? "border-green-400 bg-green-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          {/* Header: company info and address only */}
          <div className="flex items-start justify-between mb-3 ">
            <div className="flex-1 min-w-0">
              <button
                onClick={() => openJobModal(company)}
                className="text-left group-hover:text-blue-600 transition-colors cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-600">
                  {company.companyName}
                </h3>
                <div className="flex md:items-center mt-1">
                  <MapPin className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0 mt-1 md:mt-0" />
                  <p className="text-sm text-gray-600">
                    {company.address}, {company.state}
                  </p>
                </div>
              </button>
            </div>

            {/* Mark as Contacted Button */}
            <button
              onClick={toggleContacted}
              data-tooltip-id={`contact-tooltip-list-${company.companyId}`}
              data-tooltip-content={
                isContacted
                  ? "Remove from contacted"
                  : "Mark as contacted"
              }
              className={`ml-4 inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer flex-shrink-0 ${
                isContacted
                  ? "bg-green-500 text-white hover:bg-green-600 shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              <Check className="w-4 h-4" />
            </button>
            <Tooltip
              id={`contact-tooltip-list-${company.companyId}`}
              place="bottom"
              style={{
                backgroundColor: "#374151",
                color: "#ffffff",
                borderRadius: "8px",
                fontSize: "12px",
                padding: "6px 12px",
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
            <button
              onClick={() => openJobModal(company)}
              className="inline-flex items-center px-2 py-1.5 bg-yellow-400 cursor-pointer rounded-md text-xs md:text-sm font-medium hover:bg-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Eye className="w-3 h-3 mr-1" />
              View
            </button>

            <button
              onClick={() => onViewLocation(company)}
              className="inline-flex items-center px-2 py-1.5 bg-blue-500 cursor-pointer text-white rounded-md text-xs md:text-sm font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Navigation className="w-3 h-3 mr-1" />
              Location
            </button>
          </div>
        </div>

        {/* Job Details Modal */}
        <JobModal
          isOpen={isModalOpen}
          job={selectedJob}
          isContacted={isContacted}
          onClose={closeJobModal}
        />
      </>
    );
  }

  // Card View
  return (
    <>
      <div
        className={`group relative bg-white border rounded-xl p-6 transition-all duration-200 hover:shadow-md ${
          isContacted
            ? "border-green-400 bg-green-50"
            : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
        }`}
      >
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <button
              onClick={() => openJobModal(company)}
              className="text-left cursor-pointer"
            >
              <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                {company.companyName}
              </h2>
            </button>

            {/* Mark as Contacted Button */}
            <button
              onClick={toggleContacted}
              data-tooltip-id={`contact-tooltip-${company.companyId}`}
              data-tooltip-content={
                isContacted
                  ? "Remove from contacted"
                  : "Mark as contacted"
              }
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                isContacted
                  ? "bg-green-500 text-white hover:bg-green-600 shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              <Check className="w-5 h-5" />
            </button>
            <Tooltip
              id={`contact-tooltip-${company.companyId}`}
              place="bottom"
              style={{
                backgroundColor: "#374151",
                color: "#ffffff",
                borderRadius: "8px",
                fontSize: "12px",
                padding: "6px 12px",
              }}
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
            <User className="w-4 h-4" />
            <span>
              {company.firstName} {company.lastName}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {company.industry}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <a
              href={`mailto:${company.email}`}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {company.email}
            </a>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <a
              href={`tel:${company.phoneNumber}`}
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              {company.phoneNumber}
            </a>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div>
              <p className="text-gray-600 text-sm">{company.address}</p>
              <p className="text-gray-500 text-xs mt-1">
                {company.state}, Australia
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 flex- items-center pt-4 border-t border-gray-100">
          <button
            onClick={() => openJobModal(company)}
            className="inline-flex items-center px-3 py-2 bg-yellow-400 cursor-pointer rounded-lg text-sm font-medium hover:bg-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Job
          </button>

          <button
            onClick={() => onViewLocation(company)}
            className="hidden md:inline-flex items-center px-3 py-2 bg-blue-500 cursor-pointer text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Navigation className="w-4 h-4 mr-2" />
            View Location
          </button>
        </div>
      </div>

      {/* Job Details Modal */}
      <JobModal
        isOpen={isModalOpen}
        job={selectedJob}
        isContacted={isContacted}
        onClose={closeJobModal}
      />
    </>
  );
}
