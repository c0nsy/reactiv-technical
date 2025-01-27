import React from "react";
import Slider from "react-slick";
import { useAppContext } from "../../context/AppContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./MobilePreview.module.css";

const MobilePreview = () => {
  const { carouselImages } = useAppContext();

  const isSingleSlide = carouselImages.length <= 1;

  // React Slick settings
  const settings = {
    dots: true,
    infinite: !isSingleSlide,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.previewContainer}>
      <div className={styles.phone}>
        <div className={styles.carouselContainer}>
          {carouselImages && carouselImages.length > 0 ? (
            <Slider {...settings} className={styles.slickContainer}>
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
            <p className={styles.noImages}>No valid images yet.</p>
          )}
        </div>
        <div className={styles.bottomSection}>
          {/* Other content like TextArea preview or Call To Action preview can go here */}
          <h3>Additional Sections Go Here</h3>
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
