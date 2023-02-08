import animationData from './lottie-hello.json'
import Lottie from 'react-lottie'



export default function HelloIcon(props) {
  return (
    <Lottie
      options={{
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      }}
      width={150}
      height={150}
      {...props}
    />
  )
}
