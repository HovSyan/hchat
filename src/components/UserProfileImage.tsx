import { useFetch } from "../hooks/use-fetch.hook";
import { IUser } from "../models/user.model"
import userService from "../services/user.service";
import blanProfileImage from '../assets/images/blank-profile-picture.webp';
import { useCallback } from "react";

export type UserProfileImageProps = {
    userId: IUser['id'];
}

export default function UserProfileImage({ userId }: UserProfileImageProps) {
    const getUserFn = useCallback(() => userService.getUser(userId), [userId])
    const [user] = useFetch(getUserFn);

    if(user && !user.profile_img) {
        return <span>{user.nickname.slice(0, 1)}</span>
    }

    const src = user?.profile_img ? user.profile_img : blanProfileImage; 
    const alt = user ? user.nickname : 'Profile image';
    return <img src={src} alt={alt}/>
}