export enum Roles {
    ADMIN = 'admin',
    SUPER_ADMIN = 'super-admin',
}

export const initialRoles = [
    {
        role: Roles.SUPER_ADMIN,
        description:
            'Super admins have access to the full set of admin features as well as security settings for the entire organization',
    },
    {
        role: Roles.ADMIN,
        description:
            'Admins have access to user and team management features as well as security settings for individual users',
    },

];
