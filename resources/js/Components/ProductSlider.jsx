import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import styles from "../../css/Components/ProductSlider.module.css";
import "swiper/css";
import "swiper/css/navigation";
import ProductItem2 from "./ProductItem2.jsx";

function ProductSlider({ products, project, theme }) {
  return (
    <div className={styles.container}>
        <Swiper
            className={styles.swiper}
            modules={[Navigation]}
            spaceBetween={20}
            navigation={true}
            loop={true}
            breakpoints={{
            0: {slidesPerView: 1, 
            },480: {slidesPerView: 2, 
            },768: {slidesPerView: 3,
            },1024: {slidesPerView: 4, },
            }}>

        {products.map((product) => 
            product.enabled ? 
            (<SwiperSlide className={styles.swiperSlide} key={product.id}>
                <ProductItem2 product={product} project={project} theme={theme} />
            </SwiperSlide>)
            : (<div key={product.id} hidden></div>)
        )}
        </Swiper>
    </div>
  );
}

export default ProductSlider;
