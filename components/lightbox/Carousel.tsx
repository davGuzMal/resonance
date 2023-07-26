import React, { useState } from 'react'
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import slides from "./slides";
import "yet-another-react-lightbox/styles.css";

export const Carousel = () => {

    const [index, setIndex] = useState(0);
    const [open, setOpen] = React.useState(false);
    const toggleOpen = (state: boolean) => () => setOpen(state);

    const updateIndex = ({ index: current }: { index: number }) => setIndex(current);

  return (
    <div className='flex space-between rounded-lg'>      
            <div className='font-EduSA bg-gradient-to-r from-blue-100 via-gray-100 w-1/2 h-[65vh] p-4 m-4'>
                <p className='text-6xl mt-32'>"The all is mind; the  
                <span className='text-purple-800'> Universe</span> is mental"</p>
                <h1 className='text-xl mt-8 text-right mr-8'>First Hermetic Principle</h1>
            </div>
            

            <Lightbox             
                styles={{ container: { backgroundColor: "transparent" } }}         
                index={index}
                slides={slides}
                plugins={[Inline, Slideshow]}                
                on={{
                view: updateIndex,          
                }}
                carousel={{
                padding: 12,
                spacing: 0,
                imageFit: "cover",
                }}
                slideshow={{
                    autoplay: true,
                    delay : 5000
                }}
                inline={{
                style: {
                    width: "50%",
                    maxWidth: "900px",
                    aspectRatio: "3 / 2",
                    margin: "0 auto",
                    // position : "absolute",                              
                    // right : "20px"
                },
                }}
            />       
            
        
    </div>
  )
}
