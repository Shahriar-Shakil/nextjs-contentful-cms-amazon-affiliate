export const fadeIn = (direction = 'up') => {
  return {
    initial: {
      y: direction === 'up' ? 20 : -60,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'linear',
        delay: 0.25,
        ease: 'easeInOut'
      }
    },
    exit: { opacity: 0, x: 0, y: 15 }
  }
}
export const staggerContainer = delayIncrement => {
  return {
    initial: {
      opacity: 0,
      x: -70
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0
    },
    whileInView: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: delayIncrement * 0.2,
        type: 'linear'
      }
    }
  }
}
