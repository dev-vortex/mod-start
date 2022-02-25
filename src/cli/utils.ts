import { existsSync } from 'fs'
import { normalize } from 'path'

import chalk from 'chalk'
import gradient from 'gradient-string'
import validateNpmPackageName from 'validate-npm-package-name'
export enum Runner {
    Npm = 'npm',
    Yarn = 'yarn',
}

export type ModStartCLIOptions = {
    readonly appveyor: boolean
    readonly circleci: boolean
    readonly cspell: boolean
    readonly description: string
    readonly domDefinitions: boolean
    readonly editorconfig: boolean
    readonly functional: boolean
    readonly install: boolean
    readonly nodeDefinitions: boolean
    readonly projectName: string
    readonly runner: Runner
    readonly strict: boolean
    readonly travis: boolean
    readonly vscode: boolean
}

export type ModStartRequiredConfig = {
    readonly starterVersion: string
    readonly install: boolean
}

export type ModStartUserOptions = ModStartCLIOptions & ModStartRequiredConfig

export type ModStartArgsOptions = ModStartUserOptions | ModStartRequiredConfig

export type ModStartInferredOptions = {
    readonly githubUsername: string
    readonly fullName: string
    readonly email: string
    readonly repoInfo: {
        readonly repo: string
        readonly branch: string
    }
    readonly workingDirectory: string
}

export type ModStartOptions = ModStartCLIOptions &
    ModStartInferredOptions & {
        // readonly starterVersion?: string;
    }

export function hasCLIOptions(
    opts: ModStartArgsOptions,
): opts is ModStartUserOptions {
    return (opts as ModStartUserOptions).projectName !== undefined
}

export function validateName(input: string): true | string {
    return !validateNpmPackageName(input).validForNewPackages
        ? 'Name should be in-kebab-case (for npm)'
        : existsSync(input)
        ? `The "${input}" path already exists in this directory.`
        : true
}

export function getIntro(columns: number | undefined): string {
    const ascii = `
                     _           _             _   
 _ __ ___   ___   __| |      ___| |_ __ _ _ __| |_ 
| '_ \` _ \\ / _ \\ / _\` |_____/ __| __/ _\` | '__| __|
| | | | | | (_) | (_| |_____\\__ \\ || (_| | |  | |_ 
|_| |_| |_|\\___/ \\__,_|     |___/\\__\\__,_|_|   \\__|
                                     by dev-vortex
`

    const asciiSmaller = `
               _        _            _   
 _ __  ___  __| |___ __| |_ __ _ _ _| |_ 
| '  \\/ _ \\/ _\` |___(_-<  _/ _\` | '_|  _|
|_|_|_\\___/\\__,_|   /__/\\__\\__,_|_|  \\__|
                           by dev-vortex
`

    const asciiSmallest = `
      ╔╗    ╔═╦╗     ╔╗
╔══╦═╦╝║╔══╗║═╣╚╦═╗╔╦╣╚╗
║║║║╬║╬║╚══╝╠═║╔╣╬╚╣╔╣╔╣
╚╩╩╩═╩═╝    ╚═╩═╩══╩╝╚═╝
          by dev-vortex
`

    const playinText = `
ᴍᴏᴅ-sᴛᴀʀᴛ
ᵇʸ ᵈᵉᵛ⁻ᵛᵒʳᵗᵉˣ
`
    return columns && columns >= 57
        ? chalk.bold(gradient.morning(ascii))
        : columns && columns >= 47
        ? chalk.bold(gradient.morning(asciiSmaller))
        : columns && columns >= 25
        ? chalk.bold(gradient.morning(asciiSmallest))
        : chalk.bold(gradient.morning(playinText))
}

/**
 * On Windows, normalize returns "\\" as the path separator.
 * This method normalizes with POSIX.
 */
export const normalizePath = (path: string): string =>
    normalize(path).replace(/\\/g, '/')
