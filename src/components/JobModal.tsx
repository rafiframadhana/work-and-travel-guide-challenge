import React from "react";
import type { Company } from "@/types/company";
import { X, User, Mail, Phone, MapPin, Send, Check } from "lucide-react";

interface JobModalProps {
  isOpen: boolean;
  job: Company | null;
  isContacted: boolean;
  onClose: () => void;
}

const JobModal: React.FC<JobModalProps> = ({
  isOpen,
  job,
  isContacted,
  onClose,
}) => {
  if (!isOpen || !job) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-[9999]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200 scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-900">Job Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Company Info */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {job.companyName}
                </h3>
                <div className="flex items-center space-x-3 text-gray-600 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {job.industry}
                  </span>
                  <span className="text-sm">{job.state}, Australia</span>
                </div>
              </div>
              {isContacted && (
                <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Already Contacted</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Contact Person</span>
                </div>
                <p className="text-gray-700">
                  {job.firstName} {job.lastName}
                </p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Email</span>
                </div>
                <a
                  href={`mailto:${job.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {job.email}
                </a>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Phone</span>
                </div>
                <a
                  href={`tel:${job.phoneNumber}`}
                  className="text-blue-600 hover:underline"
                >
                  {job.phoneNumber}
                </a>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">Address</span>
                </div>
                <p className="text-gray-700">{job.address}</p>
              </div>
            </div>
          </div>

          {/* Job Description (Template) */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Job Description
            </h4>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
              <h5 className="font-semibold text-gray-900 mb-2">
                Key Responsibilities:
              </h5>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                </li>
                <li>Accusantium doloremque laudantium, totam rem aperiam</li>
                <li>
                  Eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto
                </li>
                <li>Beatae vitae dicta sunt explicabo nemo enim ipsam</li>
              </ul>
              <h5 className="font-semibold text-gray-900 mb-2">
                Requirements:
              </h5>
              <ul className="list-disc list-inside mb-4 space-y-1">
                <li>At vero eos et accusamus et iusto odio dignissimos</li>
                <li>Ducimus qui blanditiis praesentium voluptatum deleniti</li>
                <li>Atque corrupti quos dolores et quas molestias excepturi</li>
                <li>Sint occaecati cupiditate non provident</li>
              </ul>
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button className="flex-1 inline-flex items-center justify-center px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              <Send className="w-5 h-5 mr-2" />
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
