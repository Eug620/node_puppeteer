/* 
 * @Author       : Eug
 * @Date         : 2021-07-22 20:49:19
 * @LastEditTime : 2021-07-22 21:57:02
 * @LastEditors  : Eug
 * @Descripttion : Descripttion
 * @FilePath     : /Eug/testJueJin/index.js
 */
const puppeteer = require("puppeteer");
(async () =>{
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage({});
    await page.goto('https://juejin.cn/', {
      waitUntil: "networkidle0", // 不再有网络连接时触发（至少500毫秒后）
    });
    let list = await page.$$('a.title')
    console.log(list.length);
    let titles = []
    for (let index = 0; index < list.length; index++) {
      let _title = await list[index].$('.text-highlight')
      if (_title) {
        titles.push(_title)
      }
    }
    console.log(titles.length);
    let tags = []
    for (let index = 0; index < titles.length; index++) {
      const item = await titles[index].getProperty('innerText')
      if (!item._remoteObject) break
      if (!item._remoteObject.value) break
      let value = item._remoteObject.value
      if (value) {
        tags.push(value)
      }
    }
    console.log(tags, tags.length);
    

    console.log('<---------------!--------------->')
    let imgList = await page.$$('img')
    console.log(imgList.length);
    
    let srcList = []
    for (let index = 0; index < imgList.length; index++) {
      const item = await imgList[index].getProperty('src')
      if (!item._remoteObject) break
      if (!item._remoteObject.value) break
      let value = item._remoteObject.value
      if (value) {
        srcList.push(value)
      }
    }
    console.log(srcList);
    await page.close()
    await browser.close()
  } catch (error) {
    console.log(error);
  }
})()