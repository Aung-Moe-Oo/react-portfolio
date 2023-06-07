import React, { useEffect, useState } from "react";
import css from "./Home.module.css";
import hero from "../img/profile.jpg";
import client from "../client";
import Footer from "./Footer";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [cat, setCat] = useState("");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] | order(_updatedAt asc) {
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

  useEffect(() => {
    cat.length > 0
      ? client
          .fetch(
            `*[_type == "post" && $cat in categories[]->title] {
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
            }`,
            { cat: cat }
          )
          .then((data) => setFilteredPosts(data))
          .catch(console.error)
      : setFilteredPosts(posts);
  }, [cat, posts]);

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
          technologies, including JavaScript, Typescript, React.js, Next.js,
          Node.js, Express.js , Nest.js, and I am knowledgeable about industry
          best practises.
          <br />
          As a MERN stack developer, I am thrilled to advance in my career and
          am looking forward to taking on new and lucrative projects. If you
          need a talented and committed developer,please get in touch with me at
          saiaungmoeoo.lk@gmail.com.
        </p>
      </section>
      <section className={css.projects}>
        <div className={css.titleWrapper}>
          <h1>Projects</h1>
          <select
            id="cat"
            value={cat}
            onChange={(event) => setCat(event.target.value)}
            className={css.categories}
          >
            <option value="">Select an option</option>
            <option className={css.cat} value="">
              All
            </option>
            <option className={css.cat} value="React">
              React Projects
            </option>
            <option className={css.cat} value="Next">
              Next Projects
            </option>
            <option className={css.cat} value="MERN">
              MERN stack Projects
            </option>
            <option className={css.cat} value="Frontend">
              Frontend Projects
            </option>
          </select>
        </div>

        <div className={css.projectCards}>
          {filteredPosts.map((post) => {
            return (
              <div key={post.slug.current} className={css.card}>
                <img
                  src={post.mainImage?.asset?.url}
                  alt={post.title}
                  className={css.cardImg}
                />
                <div className={css.desc}>
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    Preview
                  </a>
                  <p>{post.body[0].children[0].text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
