import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/NewsCarousel.css";

// Import images
import news1 from "../assets/news1.png";
import news2 from "../assets/news2.png";
import news3 from "../assets/news3.png";
import news4 from "../assets/news4.png";

const NewsCarousel = () => {
  return (
    <Carousel indicators={false} fade interval={3000} className="news-carousel">
      <Carousel.Item>
        <img className="carouselImg" src={news1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carouselImg" src={news2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carouselImg" src={news3} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="carouselImg" src={news4} alt="Fourth slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default NewsCarousel;
