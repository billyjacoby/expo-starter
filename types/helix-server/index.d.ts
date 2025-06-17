import * as hono_hono_base from 'hono/hono-base';
import * as _prisma_client from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { StatusCode } from 'hono/utils/http-status';
import { Env } from 'hono';

interface AppContext extends Env {
    Variables: {
        prisma: PrismaClient;
        userAddress?: string;
    };
}

declare const routes: hono_hono_base.HonoBase<AppContext, {
    "/api/turnkey": {
        $get: {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/turnkey/init-email-auth": {
        $post: {
            input: {
                json: {
                    email: string;
                    suborgID?: string | undefined;
                };
            };
            output: {
                otpId?: string | undefined;
                organizationId?: string | undefined;
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/turnkey/verify-email-auth": {
        $post: {
            input: {
                json: {
                    otpCode: string;
                    otpId: string;
                    targetPublicKey: string;
                    suborgID: string;
                    sessionLengthSeconds?: number | undefined;
                };
            };
            output: never;
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/turnkey/oauth-login": {
        $post: {
            input: {
                json: {
                    targetPublicKey: string;
                    oidcToken: string;
                    providerName: string;
                    expirationSeconds?: number | undefined;
                };
            };
            output: {
                credentialBundle: null;
                message: string;
            } | {
                credentialBundle: string;
                userId: string;
                message: string;
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
} & {
    "/api/magic": {
        $get: {
            input: {};
            output: {
                email: string;
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/magic/account": {
        $delete: {
            input: {};
            output: {
                error: string;
            };
            outputFormat: "json";
            status: StatusCode;
        } | {
            input: {};
            output: {
                message: string;
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
} & {
    "/api/helix-connect/desktop": {
        $post: {
            input: {
                json: {
                    desktopAddress: string;
                };
            };
            output: {
                result: {
                    success: boolean;
                };
                message: string;
            };
            outputFormat: "json";
            status: StatusCode;
        } | {
            input: {
                json: {
                    desktopAddress: string;
                };
            };
            output: {
                success: boolean;
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
    "/api/helix-connect/desktop/:desktopAddress": {
        $get: {
            input: {
                param: {
                    desktopAddress: string;
                };
            };
            output: {
                message: string;
                mobileAddress: string | null;
            };
            outputFormat: "json";
            status: StatusCode;
        } | {
            input: {
                param: {
                    desktopAddress: string;
                };
            };
            output: {
                success: boolean;
                message: string;
            };
            outputFormat: "json";
            status: 500;
        };
    };
    "/api/helix-connect/mobile": {
        $post: {
            input: {
                json: {
                    mobileAddress: string;
                    desktopAddress: string;
                };
            };
            output: {
                message: string;
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
} & {
    "/api/notifications/status": {
        $get: {
            input: {};
            output: {
                id: string;
                createdAt: string;
                address: string;
                deviceAddress: string;
                exponentToken: string;
                notifications: _prisma_client.$Enums.NotificationType[];
            } | null;
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/notifications/history": {
        $get: {
            input: {};
            output: {
                error: string;
                data: null;
            };
            outputFormat: "json";
            status: StatusCode;
        } | {
            input: {};
            output: {
                data: {
                    id: string;
                    type: _prisma_client.$Enums.NotificationType;
                    marketId: string;
                    createdAt: string;
                    address: string;
                    title: string;
                    body: string;
                    data: string | number | boolean | {
                        [x: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null | undefined;
                    } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
                    subtitle: string | null;
                    badge: number | null;
                    identifier: string;
                    exponentTokens: string[];
                    status: _prisma_client.$Enums.NotificationStatus;
                }[];
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/notifications/history/v2": {
        $get: {
            input: {
                query?: {
                    skip?: string | string[] | undefined;
                    limit?: string | string[] | undefined;
                } | undefined;
            };
            output: {
                error: string;
                data: null;
            };
            outputFormat: "json";
            status: StatusCode;
        } | {
            input: {
                query?: {
                    skip?: string | string[] | undefined;
                    limit?: string | string[] | undefined;
                } | undefined;
            };
            output: {
                data: {
                    notifications: {
                        id: string;
                        type: _prisma_client.$Enums.NotificationType;
                        marketId: string;
                        createdAt: string;
                        address: string;
                        title: string;
                        body: string;
                        data: string | number | boolean | {
                            [x: string]: string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null | undefined;
                        } | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | (string | number | boolean | any | any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
                        subtitle: string | null;
                        badge: number | null;
                        identifier: string;
                        exponentTokens: string[];
                        status: _prisma_client.$Enums.NotificationStatus;
                    }[];
                    pagination: {
                        to: number;
                        from: number;
                        total: number;
                    };
                };
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/notifications/history/device": {
        $get: {
            input: {};
            output: {
                [x: string]: {
                    unreadCount: number;
                };
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/notifications/unread/device": {
        $get: {
            input: {};
            output: {
                [x: string]: {
                    unreadCount: number;
                };
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/notifications/test": {
        $post: {
            input: {};
            output: {
                result: string;
            };
            outputFormat: "json";
            status: StatusCode;
        } | {
            input: {};
            output: {
                error: string;
            };
            outputFormat: "json";
            status: 400;
        };
    };
    "/api/notifications/update": {
        $post: {
            input: {
                json: {
                    notifications: ("filled" | "liquidated" | "test")[];
                };
            };
            output: {
                error: string;
            };
            outputFormat: "json";
            status: StatusCode;
        } | {
            input: {
                json: {
                    notifications: ("filled" | "liquidated" | "test")[];
                };
            };
            output: {
                id: string;
                createdAt: string;
                address: string;
                deviceAddress: string;
                exponentToken: string;
                notifications: _prisma_client.$Enums.NotificationType[];
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/notifications/read": {
        $put: {
            input: {
                json: {
                    notificationIds: string[];
                };
            };
            output: {
                notificationUpdated: {
                    count: number;
                };
                badgeCount: number;
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
    "/api/notifications/read/all": {
        $put: {
            input: {};
            output: {
                count: number;
            };
            outputFormat: "json";
            status: StatusCode;
        };
    };
} & {
    "/api/status": {
        $get: {
            input: {};
            output: {
                healthy: boolean;
            };
            outputFormat: "json";
            status: 200;
        };
    };
}, "/api">;
type AppType = typeof routes;

declare function startServer(): Promise<void>;

export { type AppType, startServer };
