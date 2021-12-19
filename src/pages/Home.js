import React from 'react';
import cat_pic from '../images/cat_pic.png'
import { SocialItems } from './components/SocialItems'

// first character of function name must be capitalized
function Socials_link(props) {
    return <a href= {props.url} target="_blank" title={props.title}>
        <img src={props.src} width="40px" height="40px" />
    </a>
}


const Home = () => {
  return (
    <div>
      <h1>Homepage</h1>

      <article className='content_container'>
      
        <figure id="cat_pic_about_me" >
          <img src={cat_pic} 
            title="cuteness overflow"
            alt="a sleepy cat"
            width="600"
            height="400"/>
        </figure>

        <h2>About me </h2> 
        <p className="self_intro">  My name is Peter and I'm 19 years old. 
        I'm a second-year student at De Anza College. In my free time, I enjoy coding,
        exploring programming stuff <br />(like this webiste), watching and playing sports.
        <br /> I'm also a guitar-player! </p>

        <h2>Socials</h2>
      <div class="socials"> 
        <p>
          {SocialItems.map((item, index) => {
              return (
              <Socials_link url={item.url} title={item.title} src={item.src}/>
              )
                })}
        </p>

        </div>

      </article>
        

      <article>

          

      <figure className='tobar_video'>
          <iframe width="512" height="288" src="https://www.youtube.com/embed/BzUhNJMb7Hg" title="YouTube video player" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen="allowfullscreen"></iframe>

          </figure>

          <h2 id="mg_h2">About us</h2>

          <p className="our_story">"It was in high school when I found them, a group of friends that everyone 
          wishes they had, though not all do. Together, we went through one of the most precious and beautiful
          period in one's lifetime. We laughed, we cried, we fought, we made up, we did them all. No matter what we 
          dealt with, we always had one another. Fastforward to high school graduation, and then future aspirations 
          separate our path. Now our distances are calculated by thousands miles, but we all know we are never apart, 
          as long as we always think about each another"</p>

      </article>

    </div>



  );
};
  
export default Home;


 