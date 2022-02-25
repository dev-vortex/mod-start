import meow from 'meow'
// import { Package, UpdateNotifier } from 'update-notifier'

import { ModStartArgsOptions, Runner /* , validateName */ } from './utils'

export async function checkArgs(): Promise<ModStartArgsOptions> {
    const options = {
        flags: {
            // appveyor: {
            //     default: false,
            //     type: 'boolean',
            // },
            // circleci: {
            //     default: true,
            //     type: 'boolean',
            // },
            // cspell: {
            //     default: true,
            //     type: 'boolean',
            // },
            description: {
                alias: 'd',
                default: 'a @dev-vortex/mod-start project',
                type: 'string',
            },
            // dom: {
            //     default: false,
            //     type: 'boolean',
            // },
            // editorconfig: {
            //     default: true,
            //     type: 'boolean',
            // },
            // functional: {
            //     default: true,
            //     type: 'boolean',
            // },
            install: {
                default: true,
                type: 'boolean',
            },
            // node: {
            //     default: false,
            //     type: 'boolean',
            // },
            // strict: {
            //     default: false,
            //     type: 'boolean',
            // },
            // travis: {
            //     default: false,
            //     type: 'boolean',
            // },
            // vscode: {
            //     default: true,
            //     type: 'boolean',
            // },
            npm: {
                default: false,
                type: 'boolean',
            },
        },
    } as const

    const cli = meow(
        `
	Usage
	  $ npx @dev-vortex/mod-start
  Non-Interactive Usage
    $ npx @dev-vortex/mod-start <project-name> [options]
	Options
    --appveyor          include Appveyor for Windows CI ### TO REMOVE ###
    --description, -d   package.json description
    --dom               include DOM type definitions ### TO REMOVE ###
    --node              include node.js type definitions ### TO CHECK ###
    --strict            enable stricter type-checking ### TO REMOVE ###
    --no-strict         disable stricter type-checking
    --travis            include Travis CI configuration ### TO REMOVE ###
    --npm               use npm (default: yarn)
    --no-circleci       don't include CircleCI
    --no-cspell         don't include cspell ### TO REMOVE ###
    --no-editorconfig   don't include .editorconfig
    --no-functional     don't enable eslint-plugin-functional
    --no-install        skip yarn/npm install
    --no-vscode         don't include VS Code debugging config ### TO REMOVE ###
    Non-Interactive Example
	  $ npx @dev-vortex/mod-start my-library -d 'do something, better'
    `,
        options,
    )

    // const info = await new UpdateNotifier({
    //     pkg: cli.pkg as Package,
    // }).fetchInfo()
    // if (info.type !== 'latest') {
    //     throw new Error(`
    //   Your version of @dev-vortex/mod-start is outdated.
    //   Consider using 'npx @dev-vortex/mod-start' to always get the latest version.
    //   `)
    // }

    const version = cli.pkg.version as string

    const input = cli.input[0]
    if (!input) {
        /**
         * No project-name provided, return to collect options in interactive mode.
         * Note: we always return `install`, so --no-install always works
         * (important for test performance).
         */
        return {
            install: cli.flags.install,
            starterVersion: version,
        }
    }
    const validOrMsg = true
    // const validOrMsg = validateName(input)
    if (typeof validOrMsg === 'string') {
        throw new Error(validOrMsg)
    }

    return {
        // appveyor: cli.flags.appveyor,
        // circleci: cli.flags.circleci,
        // cspell: cli.flags.cspell,
        description: cli.flags.description,
        // domDefinitions: cli.flags.dom,
        // editorconfig: cli.flags.editorconfig,
        // functional: cli.flags.functional,
        install: cli.flags.install,
        // nodeDefinitions: cli.flags.node,
        projectName: input,
        runner: cli.flags.npm ? Runner.Npm : Runner.Yarn,
        starterVersion: version,
        // strict: cli.flags.strict,
        // travis: cli.flags.travis,
        // vscode: cli.flags.vscode,
    }
}
