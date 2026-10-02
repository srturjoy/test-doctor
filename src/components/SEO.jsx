import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";

/**
 * SEO Component
 * Dynamically updates document.title and meta description
 */
export default function SEO({ title, description }) {
  const { lang } = useLanguage();

  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      }
      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute("content", description);
      }
    }
  }, [title, description, lang]);

  return null;
}
