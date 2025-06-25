
import React from 'react';
import './TestimonialCard.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const testimonials = [
    {
        name: 'John Fang',
        website: 'wordfaang.com',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        content: 'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.',
    },
    {
        name: 'Jane Doe',
        website: 'janedoe.com',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        content: 'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.',
    },
    {
        name: 'Jim Ferry',
        website: 'jimjimf.com',
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        content: 'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.',
    },
];

const TestimonialCard = () => {
    return (
        <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="testimonial-swiper"
        >
            {testimonials.map((item, idx) => (
                <SwiperSlide key={idx}>
                    <div className="testimonial-card">
                        <img className="testimonial-avatar" src={item.avatar} alt={item.name} />
                        <div className="testimonial-info">
                            <div className="testimonial-name">{item.name}</div>
                            <a className="testimonial-website" href={`https://${item.website}`} target="_blank" rel="noopener noreferrer">{item.website}</a>
                            <div className="testimonial-content">{item.content}</div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default TestimonialCard;
