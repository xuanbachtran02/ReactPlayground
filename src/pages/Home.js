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

        <h2 >About me </h2> 
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

        <h2>About my group</h2>
        <figure className='tobar_video'>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/4iRdjA2cDns" title="YouTube video player" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen></iframe>
        </figure>
        
        <p className="our_story">It was in high school when I found them, a group of friends that everyone 
        wishes they had, though not all do. Together, we went through one of the most precious and beautiful
        period in one's lifetime. We laughed, we cried, we fought, we made up, we did it all. After high school
        graduation, future aspirations separate us, but we all know that we will never be apart, as long as 
        we always think about one another.</p>

      </article>

      {/* <div>
        It was in high school when I found them, a group of friends that everyone 
        wishes they had, though not all do. Together, we went through one of the most precious and beautiful
        period in one's lifetime. We laughed, we cried, we fought, we made up, we did it all. After high school
        graduation, future aspirations separate us, but we all know that we will never be apart, as long as 
        we always think about one another
      </div>

      <figure>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/4iRdjA2cDns" title="YouTube video player" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen></iframe>
        </figure> */}


    </div>



  );
};
  
export default Home;


 