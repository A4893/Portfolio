import BBG from '../src/assets/BBG.jfif';
import ux from '../src/assets/ux.png';
import web from '../src/assets/web.png';
import app from '../src/assets/app.png';
import hire from '../src/assets/hire.jpg';
import { Link } from 'react-router-dom';
import '../src/index.css'
import '../src/about.css'
export default function About() {
     return <>
     
     <section id="skill">
         
          <span className="skillTitle">What I do</span>
          <span className="skillDesc">I am a skilled and passionate web designer with experience in creating
        visually appealing and user-friendly websites. I have a strong
        understanding of design and a keen eye for detail. I am proficient in
        HTML, CSS, and JavaScript, as well as design software such as Adobe
        Photoshop and Illustrator.</span> 
          <div className="skillBar">
               <img src={ux} alt="UIDesign" className="skillBarImg" />
               <div className="skillBarText">
               <h2>UI/UX Design</h2>
               <p>Medium Profecient in UI/UX desgin</p>
               </div>

          </div>
          
          <div className="skillBar">
               <img src={web} alt="WebDesign" className="skillBarImg" />
               <div className="skillBarText">
               <h2>Web Design</h2>
               <p>Able to make exceptional Web Design.</p>
               </div>

          </div>

          <div className="skillBar">
               <img src={app} alt="AppDesign" className="skillBarImg" />
               <div className="skillBarText">
               <h2>App Design</h2>
               <p>Skilled in building enterprise level Mobile apps</p>
               </div>

          </div>
          
                  
     </section>
    

     </>
    }
    