# video-conferencing-ui

Video Conferencing UI built with React/Typescript/Tailwind.

[Demo](https://palerdot.in/video-conferencing-ui/)

### Running Locally

```shell
# install packages
pnpm install

# run locally
pnpm dev
```

### About

This repo contains an example video conferencing UI for providing optimum video/call display layout for up to 49 participants.

- The main helper module for calculating optimal grid dimension is at [utils.ts](./src/utils.ts). It calculates the grid dimension based on three inputs - video/call screen dimension, total number of participants and aspect ratio (`4:3`, `16:9`). Tests for this module is at [utils.test.ts](./src/utils.test.ts). The test primarily covers scenario for 3 participants as screen size calculation is more relevant for this particular number of participants (as participants increase, layout mostly tend to move towards square fit, 1, 4, 9 etc)
- [Resize Observer](https://web.dev/articles/resize-observer) is used to calculate changing call screen dimensions as this is the recommended efficient way to watch for dimension changes of any html element.
- [react-window](https://github.com/bvaughn/react-window) is used for rendering large offscreen lists like participant details.
- [useTransition](https://react.dev/reference/react/useTransition) is used for non blocking state updates when main screen dimension changes. 

#### Miscellaneous

- `faker` is used for generating call participants data.
- The app is bootstrapped with `vite`, `react-ts` template.
- App is currently deployed to github pages as a static client side app.
