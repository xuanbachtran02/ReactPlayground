import React from 'react';
import cat_pic from '../images/cat_pic.png'
import { SocialItems } from './components/SocialItems'

const cat_src = cat_pic

// first character of function name must be capitalized
function Socials_link(props) {
    return <a href= {props.url} target="_blank" title={props.title}>
        <img src={props.src} width="40px" height="40px" />
    </a>
}

const Home = () => {
  return (
    <div>
      <h1>Home</h1>

      <article className='content_container'>
      
        <figure id="cat_pic_about_me" >
          <img src={cat_src} 
            title="cuteness overflow"
            alt="a sleepy cat"/>
        </figure>

        <div className='self-info'>
          <h3>About me </h3> 
          <p className="self_intro">  My name is Peter and I'm 19 years old. Currently, I'm
          in my second-year at De Anza College. In my free time, I enjoy coding,
          exploring programming stuff (like this webiste), watching and playing sports.
          <br /> I'm also a guitar-player! </p>

          <h3>Socials</h3>
        <div class="socials"> 
          <p>
            {SocialItems.map((item, index) => {
                return (
                <Socials_link url={item.url} title={item.title} src={item.src}/>
                )
                  })}
          </p>

          </div>

        </div>

      </article>

    </div>



  );
};
  
export default Home;


 