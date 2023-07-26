
const breakpoints = [4320, 2160, 1080, 640, 384, 256, 128];



const unsplashPhotos = [  
  {
    id: "2",
    path : '/img/qe.png',
    width: 1080,
    height: 1426,
  },
  {
    id: "3",
    path : '/img/st.png',
    width: 1080,
    height: 1440,
  },
  {
    id: "4",
    path : '/img/a.png',
    width: 1080,
    height: 1440,
  },
  {
    id: "5",
    path : '/img/CreativeBrain.png',
    width: 1080,
    height: 1440,
  },
  
];

const slides = unsplashPhotos.map((photo) => {
  const width = photo.width * 4;
  const height = photo.height * 4;
  return {
    src: photo.path,
    width,
    height,
    srcSet: breakpoints.map((breakpoint) => {
      const breakpointHeight = Math.round((height / width) * breakpoint);
      return {
        src: photo.path,
        width: breakpoint,
        height: breakpointHeight,
      };
    }),
  };
});

export default slides;