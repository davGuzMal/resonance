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
                width: "100%",
                maxWidth: "1000px",
                aspectRatio: "3 / 2",
                margin: "0 auto",
                // position : "absolute",                              
                // right : "20px"
            },
            }}
        />
    
  )
}
