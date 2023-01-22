import React, { useEffect, useState } from "react";
import css from "./Home.module.css";
import hero from "../img/profile.jpg";
import client from "../client";
import Footer from "./Footer";
import "../App.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
      title,
      url,
      slug,
      body,
      mainImage {
        asset -> {
          _id,
          url
        },
        alt
      }
    }`
      )
      .then((data) => setPosts(data))
      .catch(console.error);
  }, []);
  console.log(posts);
  return (
    <div className={css.container}>
      <section className={css.hero}>
        <div className={css.heroDesc}>
          <span>
            <span>I am</span>
            <ul>
              <li>Sai Aung Moe Oo</li>
              <li>Web Developer</li>
              <li>React Developer</li>
            </ul>
          </span>
        </div>
        <div className={css.profile}>
          <img src={hero} alt="Profile" />
        </div>
      </section>
      <section className={css.about}>
        <h1>About Me</h1>
        <p>
          I have two years of expertise developing web applications that are
          effective and responsive. I am a experienced and driven MERN stack
          developer. I have a solid expertise in the newest web development
          technologies, including JavaScript, React, Node.js, and MongoDB, and I
          am knowledgeable about industry best practises.
          <br />
          As a MERN stack developer, I am thrilled to advance in my career and
          am looking forward to taking on new and lucrative projects. If you
          need a talented and committed developer,please get in touch with me at
          aungmoeoofreelancer@gmail.com.
        </p>
      </section>
      <section className={css.projects}>
        <h1>Projects</h1>
        <div className={css.projectCards}>
          {posts.map((post) => (
            <div key={post.slug.current} className={css.card}>
              <img src={post.mainImage?.asset?.url} alt={post.title} />
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                Preview
              </a>
              <p>{post.body[0].children[0].text}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
