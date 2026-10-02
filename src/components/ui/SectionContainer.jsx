import React from "react";

/**
 * SectionContainer
 * Consistent responsive container adhering to padding and container guidelines.
 * - Mobile: 16px horizontal padding
 * - Tablet/Desktop: max-w-7xl mx-auto px-6 lg:px-8
 * - Optional psychology ambient glow
 */
export default function SectionContainer({
  children,
  className = "",
  id,
  ambient = false,
  ...props
}) {
  return (
    <section
      id={id}
      className={`relative w-full py-8 sm:py-12 lg:py-16 ${className}`}
      {...props}
    >
      {ambient && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl" />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
}
