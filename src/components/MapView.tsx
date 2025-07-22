import { useEffect } from "react";
import type { Company } from "@/types/company";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface IconDefault extends L.Icon.Default {
  _getIconUrl?: () => string;
}

delete (L.Icon.Default.prototype as IconDefault)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapViewProps {
  companies: Company[];
  focusedCompany?: Company | null;
  onCompanyClick?: (company: Company) => void;
}

// Component to control map view from inside the map
const MapController = ({
  focusedCompany,
}: {
  focusedCompany: Company | null;
}) => {
  const map = useMap();

  useEffect(() => {
    if (focusedCompany) {
      const position: LatLngExpression = [
        focusedCompany.latitude,
        focusedCompany.longitude,
      ];
      map.setView(position, 15, { animate: true });
    }
  }, [focusedCompany, map]);

  return null;
};

export default function MapView({
  companies,
  focusedCompany,
  onCompanyClick,
}: MapViewProps) {
  // Center of Australia as default
  const australiaCenter: LatLngExpression = [-25.2744, 133.7751];

  return (
    <>
      <h3 className="text-xl font-bold mb-1">Job Locations Map</h3>
      <p className="text-sm">
        {companies.length} {companies.length === 1 ? "location" : "locations"} •
        Click markers for details
      </p>

      <div className="h-96 md:h-[600px]">
        <MapContainer
          center={australiaCenter}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <MapController focusedCompany={focusedCompany || null} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {companies.map((company) => {
            const position: LatLngExpression = [
              company.latitude,
              company.longitude,
            ];

            return (
              <Marker
                key={company.companyId}
                position={position}
                eventHandlers={{
                  click: () => {
                    if (onCompanyClick) {
                      onCompanyClick(company);
                    }
                  },
                }}
              >
                <Popup>
                  <div className="min-w-64">
                    <h4 className="font-semibold text-lg mb-2">
                      {company.companyName}
                    </h4>
                    <p className="text-sm mb-1">
                      <strong>Contact:</strong> {company.firstName}{" "}
                      {company.lastName}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Industry:</strong> {company.industry}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Location:</strong> {company.state}
                    </p>
                    <p className="text-sm mb-2">{company.address}</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <strong>Email:</strong>
                        <a
                          href={`mailto:${company.email}`}
                          className="text-blue-600 hover:underline ml-1"
                        >
                          {company.email}
                        </a>
                      </p>
                      <p className="text-sm">
                        <strong>Phone:</strong>
                        <a
                          href={`tel:${company.phoneNumber}`}
                          className="text-blue-600 hover:underline ml-1"
                        >
                          {company.phoneNumber}
                        </a>
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}
