import chalk from 'chalk'

import { checkArgs } from './args'
import { inquire } from './inquire'
import { modStart } from './mod-start'
import { addInferredOptions, LiveTasks } from './tasks'
import { getIntro, hasCLIOptions, ModStartUserOptions } from './utils'
;(async () => {
    const argInfo = await checkArgs()
    const userOptions: ModStartUserOptions = hasCLIOptions(argInfo)
        ? argInfo
        : {
              ...(await (async () => {
                  //   console.log(getIntro(process.stdout.columns))
                  return inquire()
              })()),
              ...argInfo,
          }
    const options = await addInferredOptions(userOptions)
    return modStart(options, LiveTasks)
})().catch((err: Error) => {
    console.error(`
  ${chalk.red(err.message)}
`)
    process.exit(1)
})
