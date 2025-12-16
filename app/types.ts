export interface JWTPayload {
    exp: number,
    iss: string,
    aud: string
};

export const isJWTPayload = (candidate: any): candidate is JWTPayload => {
    if (candidate?.exp !== undefined && candidate?.iss !== undefined && candidate?.aud !== undefined)
        if (typeof candidate.exp === 'number' && !isNaN(candidate.exp))
            if (typeof candidate.iss === 'string')
                if (typeof candidate.aud === 'string')
                    return true;
    return false;
}

export interface VideoInfo {
    id: number,
    title: string,
    introduction: string,
    youtubePage: string,
    niconicoPage: string,
    bilibiliPage: string,
    authorID: number,
    authorizedPerVideo: boolean,
    uploadDate: Date,
    statusTranslation: number,
    statusScripting: number,
    statusHardSubbing: number,
    additionalRequirement: string,
    finishedProductLink: string
}

export const isVideoInfo = (candidate: any): candidate is VideoInfo => {
    // TODO give a proper validation
    return true;
}
