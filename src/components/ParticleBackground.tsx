import React, { useCallback } from 'react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { useTheme } from '@/contexts/ThemeContext';

interface ParticleBackgroundProps {
  variant?: 'hero' | 'about' | 'projects' | 'contact' | 'default';
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ variant = 'default' }) => {
  const { theme } = useTheme();

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    // Particles loaded callback
  }, []);

  const getParticleConfig = () => {
    const baseConfig = {
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'push',
          },
          onHover: {
            enable: true,
            mode: 'repulse',
          },
          resize: true,
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: variant === 'hero' ? '#a855f7' : variant === 'about' ? '#06b6d4' : variant === 'projects' ? '#ec4899' : '#a855f7',
        },
        links: {
          color: theme === 'dark' ? '#ffffff' : '#000000',
          distance: 150,
          enable: true,
          opacity: 0.2,
          width: 1,
        },
        move: {
          direction: 'none' as const,
          enable: true,
          outModes: {
            default: 'bounce' as const,
          },
          random: false,
          speed: variant === 'hero' ? 2 : 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: variant === 'hero' ? 100 : 60,
        },
        opacity: {
          value: theme === 'dark' ? 0.3 : 0.5,
        },
        shape: {
          type: variant === 'projects' ? 'triangle' : 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    };

    return baseConfig;
  };

  return (
    <Particles
      id={`particles-${variant}`}
      init={particlesInit}
      loaded={particlesLoaded}
      options={getParticleConfig()}
      className="absolute inset-0 -z-10"
    />
  );
};