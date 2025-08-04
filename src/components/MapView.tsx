import { useEffect, memo, useMemo } from 'react';
import type { Company } from '@/types/company';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { APP_CONFIG } from '@/config/constants';

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
const MapController = memo(({
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
      map.setView(position, APP_CONFIG.MAP.FOCUSED_ZOOM, { animate: true });
    }
  }, [focusedCompany, map]);

  return null;
});

MapController.displayName = 'MapController';

const MapView = memo<MapViewProps>(({
  companies,
  focusedCompany,
  onCompanyClick,
}) => {
  // Memoize markers to prevent unnecessary re-renders
  const markers = useMemo(() => {
    return companies.map((company) => {
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
                    aria-label={`Send email to ${company.email}`}
                  >
                    {company.email}
                  </a>
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong>
                  <a
                    href={`tel:${company.phoneNumber}`}
                    className="text-blue-600 hover:underline ml-1"
                    aria-label={`Call ${company.phoneNumber}`}
                  >
                    {company.phoneNumber}
                  </a>
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      );
    });
  }, [companies, onCompanyClick]);

  return (
    <>
      <h3 className="text-xl font-bold mb-1">Job Locations Map</h3>
      <p className="text-sm" aria-live="polite">
        {companies.length} {companies.length === 1 ? "location" : "locations"} •
        Click markers for details
      </p>

      <div className="h-96 md:h-[600px]" role="application" aria-label="Interactive map showing job locations">
        <MapContainer
          center={APP_CONFIG.MAP.DEFAULT_CENTER}
          zoom={APP_CONFIG.MAP.DEFAULT_ZOOM}
          scrollWheelZoom={true}
          maxBounds={APP_CONFIG.MAP.BOUNDS}
          maxBoundsViscosity={1.0}
          minZoom={APP_CONFIG.MAP.MIN_ZOOM}
          maxZoom={APP_CONFIG.MAP.MAX_ZOOM}
          style={{ height: "100%", width: "100%" }}
        >
          <MapController focusedCompany={focusedCompany || null} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {markers}
        </MapContainer>
      </div>
    </>
  );
});

MapView.displayName = 'MapView';

export default MapView;
