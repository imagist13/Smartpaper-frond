// 扩展动画效果库

// 基础滑动动画
export const SlideUp = (delay) => {
  return {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
};

export const SlideDown = (delay) => {
  return {
    initial: {
      y: -50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
};

export const SlideLeft = (delay) => {
  return {
    initial: {
      x: 50,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
};

export const SlideRight = (delay) => {
  return {
    initial: {
      x: -50,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
};

// 渐变出现动画
export const FadeIn = (delay) => {
  return {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay,
      },
    },
  };
};

// 缩放动画
export const ScaleUp = (delay) => {
  return {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
};

// 弹跳动画
export const BounceIn = (delay) => {
  return {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay,
      },
    },
  };
};

// 旋转动画
export const RotateIn = (delay) => {
  return {
    initial: {
      rotate: -10,
      opacity: 0,
    },
    animate: {
      rotate: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay,
      },
    },
  };
};

// 交错动画（用于列表项）
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// 悬停效果
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

export const hoverRotate = {
  rotate: 3,
  scale: 1.02,
  transition: { duration: 0.3 },
};

// 渐变背景动画
export const gradientAnimation = {
  initial: {
    backgroundPosition: "0% 50%",
  },
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      repeat: Infinity,
      duration: 15,
      ease: "linear",
    },
  },
};