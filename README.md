# meeshkan-prisma-graphql-schema-release-task
Build task for Meeshkan Prisma GraphQL Schema.

This deploys the prisma API to an endpoint (should be production), bumps the version using semantic versioning and publishes to NPM to be consumed by other projects.

## To create
```
tfx build tasks create
```

## To update
```
tfx build tasks upload --task-path ./
```