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
const usage = cmd => `Install shell plugin

\tplugin install <plugin-name>`

const doInstall = (_a, _b, fullArgv, _1, rawCommandString, _2, argvWithoutOptions, dashOptions) => {
    argvWithoutOptions = argvWithoutOptions.slice(argvWithoutOptions.indexOf('install') + 1)

    const name = argvWithoutOptions.shift()
    if (!name)
        throw new modules.errors.usage(usage)

    const { exec } = require('child_process')
    const path = require('path')
    const fs = require('fs-extra')
    const { app } = require('electron').remote
    const pluginHome = path.join(app.getPath('userData'), 'plugins', name)
    fs.mkdirpSync(pluginHome)
    debug(`install plugin ${name} in ${pluginHome}`)

    return new Promise((resolve, reject) => {
        exec(`npm install ${name} --prod --no-save --no-shrinkwrap`, { cwd: pluginHome }, (error, stdout, stderr) => {
            if (error) {
                fs.removeSync(pluginHome)
                return reject(error)
            }

            // run compile.js
            const compilejsHome = path.join(__dirname, '..', '..', '..', '..', 'dist')
            exec(`./compile.js -d ${pluginHome}/node_modules/${name}`, { cwd: compilejsHome }, (error, stdout, stderr) => {
                if (error) {
                    fs.removeSync(pluginHome)
                    return reject(error)
                }

                // TODO: ask to reload

                resolve(true)
            })
        })
    })
}

module.exports = (commandTree, prequire) => {
    commandTree.listen('/plugin/install', doInstall, { docs: 'Install shell plugin' })
}
