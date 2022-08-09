// from https://projects.lukehaas.me/css-loaders/

import styled from 'styled-components'

export const Loader = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  -webkit-animation: load1 1.5s infinite ease-in-out;
  animation: load1 1.5s infinite ease-in-out;
  width: 1em;
  height: 2em;
  color: ${(props) => props.color};
  text-indent: -9999em;
  margin: 20px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
  border-radius: 100px;

  &::before,
  &::after {
    background: ${(props) => props.color};
    -webkit-animation: load1 1.5s infinite ease-in-out;
    animation: load1 1.5s infinite ease-in-out;
    width: 1em;
    height: 2em;
    position: absolute;
    top: 0;
    border-radius: 100px;
    content: '';
  }

  &::before {
    left: -1.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  &::after {
    left: 1.5em;
  }

  @-webkit-keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 1em;
    }
    40% {
      box-shadow: 0 -1em;
      height: 2em;
    }
  }

  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 1em;
    }
    40% {
      box-shadow: 0 -1em;
      height: 2em;
    }
  }
`
