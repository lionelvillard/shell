/*
 * Copyright 2017 IBM Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const debug = require('debug')('plugins')

/**
 * Format usage message
 *
 */
const usage = cmd => `Remove installed shell plugin

\tplugin remove <plugin-name>`

const doRemove = (_a, _b, fullArgv, _1, rawCommandString, _2, argvWithoutOptions, dashOptions) => {
    argvWithoutOptions = argvWithoutOptions.slice(argvWithoutOptions.indexOf('install') + 1)

    const name = argvWithoutOptions.shift()
    if (!name)
        throw new modules.errors.usage(usage)

    const path = require('path')
    const fs = require('fs-extra')
    const { app } = require('electron').remote
    const pluginHome = path.join(app.getPath('userData'), 'plugins', name)

    debug(`remove plugin ${name} in ${pluginHome}`)

    fs.removeSync(pluginHome)

    // TODO: run compile again?

    return true
}

module.exports = (commandTree, prequire) => {
    commandTree.listen('/plugin/remove', doRemove, { docs: 'Remove installed shell plugin' })
}
