function getRejectPrimise() {
    return Promise.reject('这里是错误信息');
}

function getResolvePrimise() {
    return Promise.resolve('参数:resolve');
}

async function t1() {
    try {
        const t = await getRejectPrimise();
        console.log(t);
    }
    catch(e) {
        console.log('这里就直接输出错误信息了');
    }
}

async function t2() {
    const t = await getResolvePrimise();
    console.log(t);
}

t1();
// 输出结果 -> 这里就直接输出错误信息了

t2();
// 输出结果 -> 参数:resolve
