import React from 'react'
import Svg, {
    Path,
} from 'react-native-svg';

type MistySvgProps = {
    color?: string
    width?: number
    height?: number
    opacity?: number
}

export default function MistySvg(props: MistySvgProps) {
    let { color, width, height, opacity } = props

    color = color || "#fff"
    width = width || 143.801
    height = height || 107.851
    opacity = opacity || 1
    return (
        <Svg width={width} height={height} viewBox="0 0 143.801 107.851" opacity={opacity}>
            <Path d="M12.009,59.709a22.722,22.722,0,0,1-.45-4.494,22.431,22.431,0,0,1,31.018-20.76,35.678,35.678,0,0,1,63.784,0,22.451,22.451,0,0,1,30.567,25.254h8.988a29.974,29.974,0,0,0,.456-4.494,31.5,31.5,0,0,0-31.456-31.456,31.165,31.165,0,0,0-4.435.316,44.59,44.59,0,0,0-72.017,0,31.165,31.165,0,0,0-4.435-.316A31.5,31.5,0,0,0,2.571,55.216a30.766,30.766,0,0,0,.456,4.494ZM141.878,68.7H7.064a4.494,4.494,0,1,0,0,8.988H141.878a4.494,4.494,0,0,0,0-8.988Zm0,17.975H7.064a4.494,4.494,0,1,0,0,8.988H141.878a4.494,4.494,0,1,0,0-8.988Zm0,17.975H7.064a4.494,4.494,0,1,0,0,8.988H141.878a4.494,4.494,0,1,0,0-8.988Z" transform="translate(-2.571 -5.784)" fill={color} />
        </Svg>
    );
}