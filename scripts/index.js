/*eslint-disable*/
const { rm, cp, mkdir, exec, echo, exit } = require('shelljs');
const fs = require("fs")
const chalk = require('chalk');
const projectList = ['frontautopublish', 'frontboss', 'fronth5', 'frontlibrary', 'frontmobile', 'frontmonitor', 'frontmonitorsdk', 'frontodin', 'frontquickapp', 'frontrec', 'frontrn', 'frontwechatapp', 'frontwww', 'ttpaicdn'];

// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
// });

let param = process.argv[2];
console.log(chalk.green(`接收的参数为: ${process.argv[2]}`));
if (!projectList.some(ele => ele.indexOf(param) > -1)) {
    console.log(chalk.red(`====参数错误，请检查参数：${param}=====`));
    exit();
}

//强制删除配置文件
exec(`rm -f conf/${param}-conf.json`);
//创建空的配置文件
exec(`touch conf/${param}-conf.json`);

//读取配置模板
let data = fs.readFileSync('./conf.json', 'utf8'),
    //读取项目配置
    key = fs.readFileSync('./key.json', 'utf8'),
    //内容转换成字符串
    jsonConf = JSON.parse(data.toString()),

    jsonKey = JSON.parse(key.toString());

//修改文件内容 
//修改待生成doc 的js文件或者目录
jsonConf["source"] = jsonKey[param]['source'];
//修改生成doc输出目录
jsonConf["opts"]["destination"] = `doc/${param}`;
//写入项目配置文件
fs.writeFileSync(`./conf/${param}-conf.json`, JSON.stringify(jsonConf));


let cmdDoc = ` jsdoc -c ./conf/${param}-conf.json `;
console.log(chalk.red('====执行命令====='));
console.log(chalk.red(cmdDoc));
exec(cmdDoc);