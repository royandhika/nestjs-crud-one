import { serial, pgTable, uuid, timestamp, varchar, date, smallint } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

const timestamps = {
    // createdAt: timestamp({ withTimezone: true }).defaultNow(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
    deletedAt: timestamp({ withTimezone: true }),
};

export const users = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    username: varchar({ length: 20 }).unique().notNull(),
    password: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 30 }).unique().notNull(),
    isVerifiedEmail: smallint().notNull().default(0),
    phone: varchar({ length: 15 }).unique(),
    isVerifiedPhone: smallint().notNull().default(0),
    ...timestamps,
});

export const userProfiles = pgTable('user_profiles', {
    id: serial().primaryKey(),
    userId: uuid()
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    fullName: varchar({ length: 50 }),
    avatar: varchar({ length: 300 }),
    birthDate: date(),
    gender: varchar({ enum: ['Male', 'Female'] }),
    ...timestamps,
});

// export const userAddresses = pgTable('user_addresses', {
//     id: serial().primaryKey(),
//     userId: uuid()
//         .notNull()
//         .references(() => users.id, { onDelete: 'cascade' }),
//     address: varchar({ length: 200 }).notNull(),
//     isDefault: smallint().notNull().default(0),
//     district: varchar({ length: 100 }).notNull(),
//     city: varchar({ length: 100 }).notNull(),
//     province: varchar({ length: 100 }).notNull(),
//     postalCode: varchar({ length: 5 }).notNull(),
//     notes: text(),
//     ...timestamps,
// });

export const sessions = pgTable('sessions', {
    id: serial().primaryKey(),
    userId: uuid()
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    refreshToken: varchar().notNull(),
    userAgent: varchar({ length: 50 }).notNull(),
    ipAddress: varchar({ length: 20 }).notNull(),
    isActive: smallint().notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    ...timestamps,
});

export const usersRelations = relations(users, ({ one, many }) => ({
    userProfiles: one(userProfiles, {
        fields: [users.id],
        references: [userProfiles.id],
    }),
    sessions: many(sessions),
}));

export const userProfilesRelations = relations(userProfiles, ({ one }) => ({
    users: one(users, {
        fields: [userProfiles.userId],
        references: [users.id],
    }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    users: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));
