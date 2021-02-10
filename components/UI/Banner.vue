<!--
  - Developed by Artu, https://github.com/ArtuGit
  - Copyleft 2020-2021.
  -->

<template>
  <div id="hero">
    <video playsinline autoplay muted loop poster="@/static/images/banner.jpg">
      <source :src="require('@/static/videos/banner.mp4')" type="video/mp4" />
    </video>
  </div>
</template>

<style>
video {
  object-fit: cover;
  width: 100vw;
  height: 35rem;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
