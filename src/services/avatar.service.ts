class AvatarService {
    fileFromSrc(src: string): Promise<File | null> {
        return fetch(src)
            .then(response => response.blob())
            .then(blob => new File([blob], 'robohash.png'))
            .catch(() => null);
    }
}

export default new AvatarService();