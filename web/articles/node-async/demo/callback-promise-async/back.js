
// 当使用这种方式时是把异步当成了同步来执行
// async function exists() {
//     let exists;
//     await fsExtra.access(path).then(() => {
//         exists = true;
//     }, err => {
//         exists = false;
//     });

//     return exists;
// }

// const nodeModulesExists = exists();
// if (nodeModulesExists) {
//     console.log('async:文件存在');
// }
// else {
//     console.log('async:文件不存在');
// }

// 实验重复调用两次
// function test() {
//     async function exists() {
//         let exists;
//         const aa = await new Promise((resolve, reject) => {
//             setTimeout(function () {
//                 resolve(true);
//                 // reject(false);
//             }, 5000);
//         });
//         aa = exists;
//         console.log('aa:', aa);
//         // aa.then(() => {
//         //     exists = true;
//         // }, err => {
//         //     exists = false;
//         // });

//         return exists;
//     }

//     const nodeModulesExists = exists();
//     if (nodeModulesExists) {
//         console.log('async:文件存在');
//     }
//     else {
//         console.log('async:文件不存在');
//     }

// }
// console.log('test-1');
// test();
// console.log('test-2');
// test();

// 手动封装一个 async 函数
// async function aa() {
//     await new Promise((resolve, reject) => {
//         setTimeout(function () {
//             // resolve(true);
//             reject(false);
//         }, 5000);
//     });
//     // return p;
// }
// const bb = aa();
// if (bb) {
//     console.log(bb, 'async:文件存在');
// }
// else {
//     console.log('async:文件不存在');
// }
// 手动封装的比较失败
// Promise { <pending> } 'async:文件存在'
// --last code line--
// fs:文件存在
// fsExtra:文件存在


// const asyncPath = __dirname + '/async-hello';
// async function task() {
//     try {
//         if (await fs.exists(asyncPath)) {
//             console.log('async: 文件夹 hello 存在');
//         }
//         else {
//             console.log('async: hello 文件夹不存在，新建一个');
//             await fs.mkdir(asyncPath);
//             console.log('async: 文件 world.md 添加完成');
//         }
//     }
//     catch (e) {
//         console.log('async: 任务失败');
//     }
// }