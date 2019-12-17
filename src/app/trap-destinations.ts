export interface Trapdestinations {
    id,
    destinationName;
    ipAddress;
    portNumber;
    status,
    community,
    version,
    engine?: string,
    v3user?: string,
    authenticationPassphrase?: string,
    authenticationProtocol?: string,
    privacyPassphrase?: string,
    privacyProtocol?: string
}