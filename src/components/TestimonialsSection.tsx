import React from "react";
import styles from "../app/page.module.css";

type Testimonial = {
  name: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "امین وطن پرست",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  },
  {
    name: "اشکان محمدی",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  },
  {
    name: "صالح بهرامی",
    text: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
  },
];

const TestimonialsSection: React.FC = () => (
  <section className={styles.testimonials}>
    <h2>نظرات مشتریان</h2>
    <div className={styles.testimonialGrid}>
      {testimonials.map((testimonial, index) => (
        <div key={index} className={styles.testimonialCard}>
          <div className={styles.stars}>★★★★★</div>
          <p>{testimonial.text}</p>
          <h4>{testimonial.name}</h4>
        </div>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
