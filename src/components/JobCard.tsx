import React, { useState } from "react";
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

interface Company {
  companyId: string;
  email: string;
  state: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName: string;
  address: string;
  latitude: number;
  longitude: number;
  industry: string;
}

interface JobCardProps {
  companies: Company[];
  onViewLocation: (company: Company) => void;
}

const JobCard: React.FC<JobCardProps> = ({ companies, onViewLocation }) => {
  const [contactedCompanies, setContactedCompanies] = useState<Set<string>>(
    new Set()
  );
  const [selectedJob, setSelectedJob] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleContacted = (companyId: string) => {
    setContactedCompanies((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(companyId)) {
        newSet.delete(companyId);
      } else {
        newSet.add(companyId);
      }
      return newSet;
    });
  };

  const openJobModal = (job: Company) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <>
      {/* Card Info */}
      <h3 className="text-xl font-bold mb-1">
        {companies.length} Job{" "}
        {companies.length === 1 ? "Opportunity" : "Opportunities"} Found
      </h3>
      <p className=" text-sm">Click "View Location" to see job on map</p>

      <div className="space-y-4  max-h-[600px] overflow-y-auto">
        {companies.length === 0 ? (
          <div className="text-gray-500 text-center p-8">
            No companies match your search criteria.
          </div>
        ) : (
          companies.map((job) => {
            const isContacted = contactedCompanies.has(job.companyId);
            return (
              <div
                key={job.companyId}
                className={`group relative bg-white border rounded-xl p-6 transition-all duration-200 hover:shadow-md ${
                  isContacted
                    ? "border-green-400 bg-green-50"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
                }`}
              >
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-900">
                      {job.companyName}
                    </h2>

                    {/* Mark as Contacted Button */}
                    <button
                      onClick={() => toggleContacted(job.companyId)}
                      data-tooltip-id={`contact-tooltip-${job.companyId}`}
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
                      id={`contact-tooltip-${job.companyId}`}
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
                      {job.firstName} {job.lastName}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {job.industry}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a
                      href={`mailto:${job.email}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {job.email}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a
                      href={`tel:${job.phoneNumber}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {job.phoneNumber}
                    </a>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-600 text-sm">{job.address}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {job.state}, Australia
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 flex- items-center pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openJobModal(job)}
                    className="inline-flex items-center px-3 py-2 bg-yellow-400 cursor-pointer rounded-lg text-sm font-medium hover:bg-yellow-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Job
                  </button>

                  <button
                    onClick={() => onViewLocation(job)}
                    className="hidden md:inline-flex items-center px-3 py-2 bg-blue-500 cursor-pointer text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    View Location
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Job Details Modal */}
      <JobModal
        isOpen={isModalOpen}
        job={selectedJob}
        isContacted={
          selectedJob ? contactedCompanies.has(selectedJob.companyId) : false
        }
        onClose={closeJobModal}
      />
    </>
  );
};

export default JobCard;
