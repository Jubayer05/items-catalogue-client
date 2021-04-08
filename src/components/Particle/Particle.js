import React from 'react';
import Particles from 'react-particles-js';
import './Particle.css';

const Particle = () => {
  return (
    <div className="particleComp">
      <Particles
        params={{
          particles: {
            number: {
              value: 100,
              density: {
                enable: false,
              },
            },
            size: {
              value: 6,
              random: true,
              anim: {
                speed: 4,
                size_min: 2,
              },
            },
            line_linked: {
              enable: true,
            },
            move: {
              random: true,
              speed: 2.5,
              out_mode: 'out',
            },
          },
          interactivity: {
            modes: {
              bubble: {
                distance: 550,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Particle;
