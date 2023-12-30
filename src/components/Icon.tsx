import icons from '../assets/sprite.svg';

export type IconProps = {
    name: string;
}

export default function Icon({ name }: IconProps) {
    return <svg><use xlinkHref={`${icons}#${name}`}></use></svg>;
}