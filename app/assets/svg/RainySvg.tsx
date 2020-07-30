import React from 'react'
import Svg, {
    G,
    Path,
} from 'react-native-svg';

type RainySvgProps = {
    color?: string
    width?: number
    height?: number
    opacity?: number
}

export default function RainySvg(props: RainySvgProps) {
    let { color, width, height, opacity } = props

    color = color || "#fff"
    width = width || 144.258
    height = height || 144.152
    opacity = opacity || 1
    return (
        <Svg width={width} height={height} viewBox="0 0 144.258 144.152">
            <G transform="translate(5.073 5.007)" opacity={opacity}>
                <Path d="M24,19.5V67.19" transform="translate(66.946 53.534)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="13" />
                <Path d="M12,19.5V67.19" transform="translate(31.257 53.534)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="13" />
                <Path d="M18,22.5V70.19" transform="translate(49.102 62.456)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="13" />
                <Path d="M114.791,94.375a29.806,29.806,0,0,0-11.922-57.108H95.358a47.69,47.69,0,1,0-75.946,49.18" transform="translate(0 0)" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="13" />
            </G>
        </Svg>
    );
}