import React, { createContext, useContext, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageModal from "../components/ImageModal";

const ImageModalContext = createContext(null);

/**
 * ImageModalProvider
 * 
 * Manages full-screen image lightbox state synchronized with the Browser History API.
 * 
 * Flow:
 * 1. User clicks an image -> openImage() pushes a state to History API.
 * 2. Address path & query stay intact (/specialists), but location.state.imageModal is set.
 * 3. User presses Browser/Device BACK -> history pops, location.state.imageModal is cleared, modal closes smoothly.
 * 4. User presses BACK again -> moves to the previous page (e.g. /).
 * 5. User clicks X / ESC / backdrop -> closeImage() calls navigate(-1) so history entry is popped cleanly without leaving duplicates.
 * 6. User presses FORWARD -> moves forward into the image modal state, reopening it smoothly.
 */
export function ImageModalProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract active modal payload from current location state
  const currentModal = location.state?.imageModal || null;
  const isOpen = Boolean(currentModal && currentModal.src);

  const openImage = useCallback(
    (imageData) => {
      if (!imageData || !imageData.src) return;

      const payload = {
        src: imageData.src,
        alt: imageData.alt || "MINDSET Image",
        title: imageData.title || "",
        subtitle: imageData.subtitle || "",
        category: imageData.category || "",
      };

      // If an image modal is already open, replace the current history state
      // rather than pushing another entry to prevent back-button loops
      const shouldReplace = Boolean(location.state?.imageModal);

      navigate(location.pathname + location.search, {
        replace: shouldReplace,
        state: {
          ...location.state,
          imageModal: payload,
        },
      });
    },
    [location.pathname, location.search, location.state, navigate]
  );

  const closeImage = useCallback(() => {
    // If the modal was opened via history state, step back in browser history
    if (location.state?.imageModal) {
      if (
        window.history.state &&
        typeof window.history.state.idx === "number" &&
        window.history.state.idx > 0
      ) {
        navigate(-1);
      } else {
        // Fallback for direct page load or root history index
        navigate(location.pathname + location.search, {
          replace: true,
          state: {
            ...location.state,
            imageModal: null,
          },
        });
      }
    }
  }, [location.pathname, location.search, location.state, navigate]);

  return (
    <ImageModalContext.Provider
      value={{
        openImage,
        closeImage,
        isOpen,
        currentModal,
      }}
    >
      {children}
      {/* Universal Reusable Lightbox Component */}
      <ImageModal
        isOpen={isOpen}
        imageData={currentModal}
        onClose={closeImage}
      />
    </ImageModalContext.Provider>
  );
}

/**
 * Custom hook for triggering image lightbox from any component
 */
export function useImageModal() {
  const context = useContext(ImageModalContext);
  if (!context) {
    throw new Error("useImageModal must be used within an ImageModalProvider");
  }
  return context;
}
