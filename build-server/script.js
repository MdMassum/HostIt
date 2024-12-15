const {exec} = require('child_process')
const path = require('path')
const fs = require('fs')  // file system for reading files content
const { PutObjectCommand, S3Client } = require('@aws-sdk/client-s3')
const mime = require('mime-type') // it tells us type of file by the help of pathname

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESSKEY,
    }
})

const PROJECT_ID = process.env.PROJECT_ID

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

        const distFolderPath = path.join(__dirname, 'output', 'dist')   // this will get the path of dist folder of build project
        const distFolderContent = fs.readdirSync(distFolderPath,{recursive:true})  // it has all contents of dist folder eg. .html, .css , .js file

        for(const file of distFolderContent){
            const filePath = path.join(__dirname,distFolderPath,file)
            if(fs.lstatSync(filePath).isDirectory()) continue;  // if it is a folder file let it go

            console.log("uploading ",filePath)
            const command = new PutObjectCommand({
                Bucket:'',
                key:`__outputs/${PROJECT_ID}/${file}`,
                body: fs.createReadStream(filePath),
                content: mime.lookup(filePath)
            })

            await s3Client.send(command)  // will upload all files into s3 storage
            console.log("uploaded ",filePath)
        }
        console.log("Done...")
    })
}