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
