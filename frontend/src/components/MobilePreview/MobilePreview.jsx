// src/components/MobilePreview/MobilePreview.jsx
import React from "react";
import { useAppContext } from "../../context/AppContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MobilePreview.module.css";

const MobilePreview = () => {
  const { carouselImages, textSections } = useAppContext();

  const isSingleSlide = carouselImages.length <= 1;
  const carouselSettings = {
    dots: true,
    infinite: !isSingleSlide,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.previewContainer}>
      <div className={styles.phone}>
        {/* Carousel top area */}
        <div className={styles.carouselContainer}>
          {carouselImages && carouselImages.length > 0 ? (
            <Slider {...carouselSettings} className={styles.slickContainer}>
              {carouselImages.map((url, index) => (
                <div key={index} className={styles.slide}>
                  <img
                    src={url}
                    alt={`Carousel ${index}`}
                    className={styles.image}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <p>No valid images yet.</p>
          )}
        </div>

        {/* Text Sections below carousel */}
        <div className={styles.bottomSection}>
          {textSections.map((section, index) => (
            <div key={index} className={styles.textBlock}>
              <h3 style={{ color: section.titleColor }}>{section.title}</h3>
              <p style={{ color: section.descriptionColor }}>
                {section.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
