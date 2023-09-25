import { useEffect } from "react";

const Intersection = ({ children }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains("hiddenLeft")) {
            entry.target.classList.add("showLeft");
          } else if (entry.target.classList.contains("hiddenRight")) {
            entry.target.classList.add("showRight");
          } else if (entry.target.classList.contains("hiddenTop")) {
            entry.target.classList.add("showTop");
          } else if (entry.target.classList.contains("hiddenBottom")) {
            entry.target.classList.add("showBottom");
          } else if (entry.target.classList.contains("hiddenAnimation")) {
            entry.target.classList.add("showAnimation");
          } else if (entry.target.classList.contains("hidden")) {
            entry.target.classList.add("show");
          }
        }
      });
    });

    const hiddenElements = document.querySelectorAll(
      ".hidden, .hiddenLeft, .hiddenRight, .hiddenTop, .hiddenBottom, .hiddenAnimation"
    );

    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return <>{children}</>;
};

export default Intersection;
