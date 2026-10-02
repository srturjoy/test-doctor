import React, { createContext, useContext, useCallback } from "react";
import { cmdData, doctorsData } from "../data/doctors";

const DoctorPhotosContext = createContext(null);

// Dynamically generated mappings from doctors.js - Single Source of Truth
export const DOCTOR_ID_MAPPINGS = [
  {
    id: cmdData.id,
    nameEn: cmdData.name.en,
    nameBn: cmdData.name.bn,
    roleEn: cmdData.title.en,
    roleBn: cmdData.title.bn,
    defaultImage: cmdData.image,
    category: "cmd",
  },
  ...doctorsData.filter((doc) => doc.id !== cmdData.id).map((doc) => ({
    id: doc.id,
    nameEn: doc.name.en,
    nameBn: doc.name.bn,
    roleEn: doc.designation.en,
    roleBn: doc.designation.bn,
    defaultImage: doc.image,
    category: "doctor",
  })),
];

export function DoctorPhotosProvider({ children }) {
  // Pure static photo lookup - dynamically checks doctors.js & cmdData
  const getDoctorPhoto = useCallback((doctorId, defaultPath) => {
    if (defaultPath) return defaultPath;
    if (doctorId === cmdData.id) return cmdData.image;
    const found = doctorsData.find((d) => d.id === doctorId);
    return found ? found.image : "/logo.png";
  }, []);

  const openUploader = useCallback(() => {}, []);
  const closeUploader = useCallback(() => {}, []);

  return (
    <DoctorPhotosContext.Provider
      value={{
        DOCTOR_ID_MAPPINGS,
        getDoctorPhoto,
        openUploader,
        closeUploader,
        isUploaderOpen: false,
        activeDoctorForUpload: null,
      }}
    >
      {children}
    </DoctorPhotosContext.Provider>
  );
}

export function useDoctorPhotos() {
  const context = useContext(DoctorPhotosContext);
  if (!context) {
    throw new Error("useDoctorPhotos must be used within DoctorPhotosProvider");
  }
  return context;
}


