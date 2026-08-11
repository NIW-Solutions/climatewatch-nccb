"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Tooltip,
  useMap,
  ZoomControl,
} from "react-leaflet";

type GeographicContext = {
  id: string;
  number: string;
  name: string;
  region: string;
  lens: string;
  position: [number, number];
  zoom: number;
};

const geographicContexts: GeographicContext[] =
  [
    {
      id: "gilgit-baltistan",
      number: "01",
      name: "Gilgit-Baltistan",
      region: "Northern Pakistan",
      lens:
        "Cryosphere and mountain climate risk",
      position: [
        35.85,
        74.65,
      ],
      zoom: 7,
    },

    {
      id: "chitral",
      number: "02",
      name: "Chitral",
      region:
        "Khyber Pakhtunkhwa",
      lens:
        "Mountain communities and climate education",
      position: [
        35.84,
        71.78,
      ],
      zoom: 7.5,
    },

    {
      id: "sindh",
      number: "03",
      name: "Sindh flood plains",
      region: "Southern Pakistan",
      lens:
        "Flood vulnerability and community representation",
      position: [
        25.7,
        68.45,
      ],
      zoom: 6.5,
    },
  ];

export function HomeCoverageMap() {
  const [selectedId, setSelectedId] =
    useState(
      geographicContexts[0].id,
    );

  const selected = useMemo(
    () =>
      geographicContexts.find(
        (location) =>
          location.id ===
          selectedId,
      ) ??
      geographicContexts[0],
    [selectedId],
  );

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* =====================================
          MAP
          ===================================== */}

      <MapContainer
        center={[30.6, 70.6]}
        zoom={5}
        minZoom={5}
        maxZoom={10}
        zoomSnap={0.25}
        zoomDelta={0.5}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl
        className="climate-map h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        <MapFocusController
          selected={selected}
        />

        {geographicContexts.map(
          (location) => {
            const active =
              selectedId ===
              location.id;

            return (
              <LocationMarker
                key={location.id}
                location={location}
                active={active}
                onSelect={() =>
                  setSelectedId(
                    location.id,
                  )
                }
              />
            );
          },
        )}
      </MapContainer>

      {/* =====================================
          DESKTOP LOCATION INDEX
          ===================================== */}

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[500] hidden w-[22rem] lg:flex lg:items-end">
        <div className="pointer-events-auto m-6 w-full border border-white/20 bg-primary-dark/95 text-white shadow-[0_24px_70px_rgba(8,29,25,0.22)] backdrop-blur-md xl:m-8">
          <div className="border-b border-white/15 px-6 py-5">
            <p className="text-[0.55rem] font-bold uppercase tracking-[0.12em] text-white/45">
              Geographic lens
            </p>

            <p className="mt-2 text-sm font-semibold text-white">
              Select a climate context
            </p>
          </div>

          <div>
            {geographicContexts.map(
              (location) => {
                const active =
                  location.id ===
                  selectedId;

                return (
                  <button
                    key={location.id}
                    type="button"
                    onClick={() =>
                      setSelectedId(
                        location.id,
                      )
                    }
                    className={[
                      "group grid w-full grid-cols-[2.4rem_minmax(0,1fr)] gap-3 border-b border-white/12 px-6 py-5 text-left transition-colors last:border-b-0",
                      active
                        ? "!bg-white !text-primary"
                        : "!bg-transparent !text-white hover:!bg-white/[0.07] hover:!text-white",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "pt-0.5 text-[0.55rem] font-bold tracking-[0.1em]",
                        active
                          ? "text-secondary"
                          : "text-white/35",
                      ].join(" ")}
                    >
                      {location.number}
                    </span>

                    <span>
                      <span
                        className={[
                          "block font-editorial text-[1.35rem] font-medium leading-[1.1] tracking-[-0.025em]",
                          active
                            ? "!text-primary"
                            : "!text-white",
                        ].join(" ")}
                      >
                        {location.name}
                      </span>

                      <span
                        className={[
                          "mt-2 block text-[0.57rem] font-bold uppercase leading-5 tracking-[0.1em]",
                          active
                            ? "text-primary/50"
                            : "text-white/40",
                        ].join(" ")}
                      >
                        {location.region}
                      </span>
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>

      {/* =====================================
          SELECTED CONTEXT
          DESKTOP
          ===================================== */}

      <div className="pointer-events-none absolute right-6 top-6 z-[500] hidden max-w-[19rem] border border-border bg-surface/95 px-6 py-5 shadow-[0_18px_60px_rgba(8,29,25,0.12)] backdrop-blur-md md:block lg:right-8 lg:top-8">
        <div className="flex items-start justify-between gap-6">
          <p className="text-[0.53rem] font-bold uppercase tracking-[0.11em] text-muted-light">
            Current lens
          </p>

          <span className="text-[0.53rem] font-bold tracking-[0.1em] text-secondary">
            {selected.number}
          </span>
        </div>

        <p className="mt-4 font-editorial text-[1.45rem] font-medium leading-[1.08] tracking-[-0.03em] text-primary">
          {selected.name}
        </p>

        <p className="mt-3 text-xs leading-6 text-muted">
          {selected.lens}
        </p>
      </div>

      {/* =====================================
          MAP COORDINATE ACCENTS
          ===================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-[400] h-px bg-primary/[0.06]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-[400] w-px bg-primary/[0.06]"
      />

      {/* =====================================
          MOBILE LOCATION SELECTOR
          ===================================== */}

      <div className="absolute inset-x-3 bottom-3 z-[500] border border-border bg-surface/96 backdrop-blur-md lg:hidden sm:inset-x-5 sm:bottom-5">
        <div className="grid grid-cols-3">
          {geographicContexts.map(
            (location) => {
              const active =
                location.id ===
                selectedId;

              return (
                <button
                  key={location.id}
                  type="button"
                  onClick={() =>
                    setSelectedId(
                      location.id,
                    )
                  }
                  aria-label={`Focus map on ${location.name}`}
                  className={[
                    "min-w-0 border-r border-border px-3 py-4 text-left last:border-r-0 sm:px-4",
                    active
                      ? "!bg-primary !text-white"
                      : "!bg-surface !text-primary",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "block text-[0.52rem] font-bold tracking-[0.1em]",
                      active
                        ? "text-white/50"
                        : "text-muted-light",
                    ].join(" ")}
                  >
                    {location.number}
                  </span>

                  <span
                    className={[
                      "mt-2 block truncate text-[0.68rem] font-semibold",
                      active
                        ? "!text-white"
                        : "!text-primary",
                    ].join(" ")}
                  >
                    {location.name}
                  </span>
                </button>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================
   LOCATION MARKER
   ========================================== */

function LocationMarker({
  location,
  active,
  onSelect,
}: Readonly<{
  location: GeographicContext;
  active: boolean;
  onSelect: () => void;
}>) {
  return (
    <>
      {/* Selected outer ring */}

      {active ? (
        <CircleMarker
          center={location.position}
          radius={20}
          interactive={false}
          pathOptions={{
            color: "#cb1f0e",
            fillColor: "#cb1f0e",
            fillOpacity: 0.08,
            opacity: 0.35,
            weight: 1,
          }}
        />
      ) : null}

      {/* Main point */}

      <CircleMarker
        center={location.position}
        radius={active ? 8 : 6}
        eventHandlers={{
          click: onSelect,
        }}
        pathOptions={{
          color:
            active
              ? "#cb1f0e"
              : "#103a6d",

          fillColor:
            active
              ? "#cb1f0e"
              : "#103a6d",

          fillOpacity: 1,

          opacity: 1,

          weight: 3,
        }}
      >
        <Tooltip
          direction="top"
          offset={[0, -10]}
          opacity={1}
          className="climate-map-tooltip"
        >
          <span className="climate-map-tooltip-inner">
            <span className="climate-map-tooltip-index">
              {location.number}
            </span>

            <span>
              <strong>
                {location.name}
              </strong>

              <small>
                {location.region}
              </small>
            </span>
          </span>
        </Tooltip>
      </CircleMarker>
    </>
  );
}

/* ==========================================
   MAP CAMERA
   ========================================== */

function MapFocusController({
  selected,
}: Readonly<{
  selected: GeographicContext;
}>) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(
      selected.position,
      selected.zoom,
      {
        animate: true,
        duration: 0.85,
      },
    );
  }, [map, selected]);

  return null;
}