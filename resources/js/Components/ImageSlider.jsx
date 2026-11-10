import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { URL as conn_URL } from "../connection.js";
import styles from "../../css/Components/ImageSlider.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ImageSlider({ images }) {

  return (
    <div className={styles.container}>
        <Swiper className={styles.swiper}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1} 
            autoplay= {{ delay: 7000,}}
            navigation={true} 
            pagination={{clickable: true}}
            loop={true}>

        {images.map((image) => (
            <SwiperSlide key={image.id} 
                className={styles.swiperSlide}>
                <img src={conn_URL + "uploads/" + image.image_url}
                    alt="slider-image"/>
            </SwiperSlide>
        ))}
        </Swiper>
    </div>
  );
}

export default ImageSlider;
