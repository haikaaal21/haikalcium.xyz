const {exec} = require("child_process");

const inputFiles = [
    {inputPath: './src/index.js'},
    {inputPath: './res/scripts/contactScript.js'},
    {inputPath: './res/scripts/mobPho.js'},
    {inputPath: './res/scripts/script.js'},
    {inputPath: './src/mobile/mobile_index.js'},
    {inputPath: './src/mobile/mobile-scripts/aboutMe.js'},
    {inputPath: './src/mobile/mobile-scripts/archive.js'},
    {inputPath: './src/mobile/mobile-scripts/homePage.js'},
];

function uglifyTheBuild(inputFiles) {
    exec(`uglifyjs ${inputFiles} -o ${inputFiles} --compress --mangle`, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        }
        console.log(stdout);
        console.log(stderr);
    });
}

inputFiles.forEach((file) => {
    uglifyTheBuild(file.inputPath);
});