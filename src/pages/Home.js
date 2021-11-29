import React from 'react';
import cat_pic from '../images/cat_pic.png'
import fb_svg from '../images/socials_icon/facebook.svg'
  
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
          <a href= {"https://www.facebook.com/profile.php?id=100004543248099"} target="_blank"
            title="Facebook">
            <img src={fb_svg} width="40px" height="40px" />
          </a>

        </p>
        </div>
      </article>


    </div>



  );
};
  
export default Home;
