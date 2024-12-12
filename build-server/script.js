const {exec} = require('child_process')
const path = require('path')

async function init(){
    console.log("Executing...")

    const outDirPath = path.join(__dirname,'output')  // this will get the path of uploaded project

    const p = exec(`cd ${outDirPath} && npm install && npm run build`)  // this will install the project and run build command

    p.stdout.on('data', function (data) { // this prints all the logs while building
        console.log(data.toString())
    })

    p.stdout.on('error', function (data) {  // this prints all the error logs while building
        console.log('Error', data.toString())
    })

    p.on('close', async function () {
        console.log("Build Complete")
    })
}