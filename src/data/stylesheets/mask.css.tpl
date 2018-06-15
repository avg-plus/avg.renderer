
.iris-in {
  mask: url($MASK_IMAGE_SPRITE_IRIS_IN);
  mask-size: 2300% 100%;
  animation: mask-play steps(22) forwards;
  animation-duration: 1.4s;
}

.iris-out {
  mask: url($MASK_IMAGE_SPRITE_IRIS_OUT);
  mask-size: 7100% 100%;
  animation: mask-play steps(70) forwards;
  animation-duration: 1.4s;
}

.wipe {
  mask: url($MASK_IMAGE_SPRITE_WIPE);
  mask-size: 7500% 100%;
  animation: mask-play steps(74) forwards;
  animation-duration: 1.4s;
}

.window-shades {
  mask: url($MASK_IMAGE_SPRITE_WINDOW_SHADES);
  mask-size: 8400% 100%;
  animation: mask-play steps(83) forwards;
  animation-duration: 1.4s;
}

.brush {
  mask: url($MASK_IMAGE_SPRITE_BRUSH);
  mask-size: 3000% 100%;
  animation: mask-play steps(29) forwards;
  animation-duration: 1.4s;
}

.brush-down {
  mask: url($MASK_IMAGE_SPRITE_BRUSH_DOWN);
  mask-size: 7400% 100%;
  animation: mask-play steps(73) forwards;
  animation-duration: 1.4s;
}

.crossfade {
  animation: mask-play-opacity forwards;
  animation-duration: 1.4s;
}