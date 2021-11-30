import React from 'react';
import cat_pic from '../images/cat_pic.png'

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

      <article className='about_me'>

        <img id="cat_pic_about_me" src={cat_pic} 
        title="cuteness overflow"
        alt="a sleepy cat"
        width="600"
        height="400"/>

        <h2>About me </h2> 
        <p>My name is Peter and I'm 19 years old. I'm a second-year student at De Anza College. In my free time, I enjoy coding,
        exploring programming stuff (like this webiste), watching and playing sports. I'm also a guitar-player! </p>

        <h2>Socials</h2>
      <div class="socials"> 
        <p>
          <Socials_link url="https://www.facebook.com/profile.php?id=100004543248099" title='Facebook' src={require('../images/socials_icon/facebook.svg').default}/>
          <Socials_link url="https://www.instagram.com/petertran02/?hl=en" title='Instagram' src={require('../images/socials_icon/instagram.svg').default}/>
          <Socials_link url="https://github.com/xuanbachtran02" title='GitHub' src={require('../images/socials_icon/github.svg').default}/>
          <Socials_link url="https://open.spotify.com/user/hh2rj0p5m4hqm1g8d5wije1r6?si=381bacd5be8a4c6b" title='Spotify'src={require('../images/socials_icon/spotify.svg').default}/>
          <Socials_link url="https://discord.com/users/761308808823570453" title='Discord' src={require('../images/socials_icon/discord.svg').default}/>
        </p>
        </div>
      </article>


    </div>



  );
};
  
export default Home;


 