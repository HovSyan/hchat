import icons from '../../assets/sprite.svg';

export type IconProps = {
    name: string;
    size?: number;
}

const IconDefaultProps = {
    size: 24
};

export default function Icon({ name, size }: IconProps) {
    const style = { 
        width: size ?? IconDefaultProps.size,
        height: size ?? IconDefaultProps.size
    };
    return <svg style={style} viewBox='0 0 24 24'><use xlinkHref={`${icons}#${name}`}></use></svg>;
}