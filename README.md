# Full stack app built with Nextjs 13 as a personal educational project

Built during workshop

# Bootstraped with

```
npx create-next-app@latest --experimental-app
```

# Additional Dev dependancies

```
npm i --save-dev prisma tailwindcss ts-node tsconfig-paths
```

# Additional dependancies

```
npm i @prisma/client bcrypt @types/bcrypt class-variance-authority clsx cookie css-reset-and-normalize react-feather jose
```

# Prisma initialized with

```
npx prisma init
```

HOSTING POSTGRE ON <https://railway.app> OR <https://render.com> 

SYNCING OUR DB WITH A SCHEMA, AND CLIENT GENERTION DONE WITH

```
npx prisma migrate dev
```

GUI FOR DB CAN BE STARTED WITH

```
npx prisma studio
```

I ADDED SEEDING SCRIPT FOR THE SEEDING

AND I ADDED NEW TYPSCRIPT CONFIG JUST FOR SEEDING (ONLY BECAUSE "module" SETTING)

SEEDING WILL HAPPEN ON EVERY MIGRATION (I HAD PROBLEEMS WITH THIS BECAUSE SEED SCRIPT WASN;T EXECUTED AFTER MIGRATION)

ALSO THERE IS SEDDING COMMAND

```
npx prisma db seed
```